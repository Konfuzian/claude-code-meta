---
sidebar_position: 4
---

# GitHub Integration

Connect Claude Code with GitHub for PR reviews, issue management, and CI/CD.

## What This Page Covers

This page shows you how to integrate Claude Code with GitHub for automated code reviews, issue triage, and CI/CD workflows. You'll learn about the GitHub App, Actions integration, and MCP server.

**Why integrate with GitHub?** Claude Code can review PRs, respond to issue comments, and automate repository workflows. This extends Claude's capabilities beyond your local terminal to your team's collaboration platform.

:::tip Basic Git Works Out of the Box
You don't need any of these integrations for basic git operations. Claude Code can commit, push, pull, create branches, and manage your repository using standard git commands — just ask it. The features on this page are optional extras for teams who want deeper GitHub integration.
:::

---

## GitHub App

The GitHub App enables `@claude` mentions directly in GitHub issues and PRs — no terminal needed.

### Installation

```
/install-github-app
```

This installs the Claude Code GitHub App on your repositories, enabling:

- **@claude mentions** in issues and PRs
- **Automated PR reviews**
- **Issue triage and responses**

### @claude Mentions

Once installed, you can mention `@claude` in any issue or PR comment. Claude will respond with analysis, suggestions, or explanations:

```
@claude can you review this PR and check for security issues?

@claude explain what this change does

@claude suggest how to fix this bug
```

---

## Local Code Review

You can also review code locally without the GitHub App. This works with your git diff directly:

```
/code-review
```

Reviews your current git diff and provides feedback.

### PR Comments

You can post Claude's review directly to GitHub as PR comments:

```
/code-review --comment
```

Or specify a PR number:

```
/code-review --pr 123
```

---

## GitHub Actions

GitHub Actions let you run Claude Code automatically on repository events (PRs opened, issues created, releases published).

### Claude Code Action

The `anthropics/claude-code-action` runs Claude in your CI/CD pipeline:

```yaml
# .github/workflows/claude-review.yml
name: Claude PR Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Review this PR for:
            - Code quality
            - Security issues
            - Test coverage
```

### Available Inputs

These inputs configure how the action runs:

| Input | Description | Required |
|-------|-------------|----------|
| `anthropic_api_key` | API key | Yes |
| `prompt` | Instructions for Claude | Yes |
| `model` | Model to use | No |
| `max_tokens` | Response limit | No |

### Example Workflows

These examples show common automation patterns. Copy and adapt them for your repository:

#### Auto-label Issues

Automatically categorize new issues based on their content:

```yaml
on:
  issues:
    types: [opened]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Analyze this issue and suggest appropriate labels:
            - bug, feature, documentation, question

            Respond with JSON: {"labels": ["label1", "label2"]}
```

#### Generate Release Notes

Automatically create release notes from commit history:

```yaml
on:
  release:
    types: [created]

jobs:
  notes:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Generate release notes from commits since last release.
            Format as markdown with sections:
            - Features
            - Bug Fixes
            - Breaking Changes
```

---

## GitHub MCP Server

For full GitHub API access from within Claude Code sessions, configure the GitHub MCP server. This lets Claude create issues, PRs, and comments on your behalf:

```json
// .claude/mcp.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Available Operations

These tools become available in your Claude Code sessions once the MCP server is configured:

| Tool | Description |
|------|-------------|
| `create_issue` | Create new issue |
| `create_pr` | Create pull request |
| `list_prs` | List pull requests |
| `get_pr_diff` | Get PR changes |
| `merge_pr` | Merge pull request |
| `add_comment` | Comment on issue/PR |
| `list_commits` | List commits |
| `search_code` | Search repository code |

### Example Usage

Once configured, you can ask Claude to interact with GitHub using natural language:

```
You: create an issue for the auth bug we discussed

Claude: I'll create a GitHub issue for the authentication bug.
[Uses mcp__github__create_issue]

Created issue #42: "Auth token refresh causes logout"
https://github.com/user/repo/issues/42
```

---

## Best Practices

Keep these security and workflow practices in mind when integrating Claude with GitHub:

1. **Scope permissions** — Only install the app on needed repos
2. **Use secrets** — Never commit API keys; use GitHub secrets
3. **Review before merge** — Use Claude for suggestions, human for approval
4. **Rate limits** — Be mindful of API rate limits in workflows

---

## Complete Workflow Examples

These ready-to-use workflows cover common GitHub automation scenarios. Copy them to `.github/workflows/` in your repository.

### Comprehensive PR Review

Full code review with inline comments:

```yaml
# .github/workflows/claude-pr-review.yml
name: Claude PR Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for better context

      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
          prompt: |
            Review this pull request thoroughly.

            ## Review Checklist

            ### Code Quality
            - Is the code clean and readable?
            - Are functions/methods appropriately sized?
            - Is there any code duplication?

            ### Logic & Correctness
            - Is the logic correct?
            - Are edge cases handled?
            - Are there any potential bugs?

            ### Security
            - Any hardcoded secrets or credentials?
            - Input validation present where needed?
            - SQL injection or XSS vulnerabilities?

            ### Performance
            - Any obvious performance issues?
            - Unnecessary database queries or API calls?
            - Memory leaks or resource cleanup issues?

            ### Testing
            - Are new features tested?
            - Do tests cover edge cases?

            ## Output Format

            Provide feedback as GitHub PR review comments:
            - Use 🔴 for critical issues (must fix)
            - Use 🟡 for suggestions (should consider)
            - Use 🟢 for minor/style issues
            - Include file path and line numbers

            Start with a summary comment, then add inline comments for specific issues.
```

### Auto-Label and Triage Issues

Automatically categorize and prioritize new issues:

```yaml
# .github/workflows/claude-issue-triage.yml
name: Claude Issue Triage

on:
  issues:
    types: [opened]

permissions:
  issues: write

jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        id: triage
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Analyze this GitHub issue and provide triage information.

            Issue Title: ${{ github.event.issue.title }}
            Issue Body: ${{ github.event.issue.body }}

            Determine:
            1. **Type**: bug, feature, documentation, question, or enhancement
            2. **Priority**: critical, high, medium, or low
            3. **Component**: Which part of the codebase (if determinable)
            4. **Effort**: small, medium, or large

            Respond with JSON only:
            {
              "labels": ["type:bug", "priority:high"],
              "comment": "Brief acknowledgment and any clarifying questions",
              "assignees": []
            }

      - name: Apply labels
        uses: actions/github-script@v7
        with:
          script: |
            const response = JSON.parse(`${{ steps.triage.outputs.response }}`);

            // Add labels
            if (response.labels && response.labels.length > 0) {
              await github.rest.issues.addLabels({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.issue.number,
                labels: response.labels
              });
            }

            // Add comment
            if (response.comment) {
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.issue.number,
                body: response.comment
              });
            }
```

### Generate Changelog from PRs

Create release notes from merged PRs:

```yaml
# .github/workflows/claude-changelog.yml
name: Generate Changelog

on:
  release:
    types: [created]
  workflow_dispatch:
    inputs:
      tag:
        description: 'Release tag'
        required: true

jobs:
  changelog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get previous tag
        id: prev_tag
        run: |
          PREV_TAG=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo "")
          echo "tag=$PREV_TAG" >> $GITHUB_OUTPUT

      - name: Get PR list
        id: prs
        run: |
          CURRENT_TAG="${{ github.event.release.tag_name || github.event.inputs.tag }}"
          PREV_TAG="${{ steps.prev_tag.outputs.tag }}"

          if [ -z "$PREV_TAG" ]; then
            PRS=$(gh pr list --state merged --limit 100 --json number,title,labels,author)
          else
            PRS=$(gh pr list --state merged --search "merged:>=$(git log -1 --format=%ci $PREV_TAG)" --limit 100 --json number,title,labels,author)
          fi

          echo "prs<<EOF" >> $GITHUB_OUTPUT
          echo "$PRS" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - uses: anthropics/claude-code-action@v1
        id: changelog
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Generate release notes from these merged PRs:

            ${{ steps.prs.outputs.prs }}

            Format as markdown with sections:

            ## 🚀 Features
            - New functionality

            ## 🐛 Bug Fixes
            - Fixed issues

            ## 📚 Documentation
            - Doc updates

            ## 🔧 Maintenance
            - Refactoring, dependencies, CI/CD

            ## ⚠️ Breaking Changes
            - Any breaking changes (highlight prominently)

            For each item, include PR number as link: (#123)
            Credit the author: @username

            If a section has no items, omit it entirely.

      - name: Update release notes
        uses: actions/github-script@v7
        with:
          script: |
            const changelog = `${{ steps.changelog.outputs.response }}`;
            const tag = '${{ github.event.release.tag_name || github.event.inputs.tag }}';

            const release = await github.rest.repos.getReleaseByTag({
              owner: context.repo.owner,
              repo: context.repo.repo,
              tag: tag
            });

            await github.rest.repos.updateRelease({
              owner: context.repo.owner,
              repo: context.repo.repo,
              release_id: release.data.id,
              body: changelog
            });
```

### PR Description Generator

Auto-generate PR descriptions from commits:

```yaml
# .github/workflows/claude-pr-description.yml
name: Generate PR Description

on:
  pull_request:
    types: [opened]

permissions:
  pull-requests: write

jobs:
  describe:
    runs-on: ubuntu-latest
    # Only run if PR body is empty or default
    if: github.event.pull_request.body == '' || github.event.pull_request.body == null
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get commits
        id: commits
        run: |
          COMMITS=$(git log --oneline origin/${{ github.base_ref }}..HEAD)
          echo "commits<<EOF" >> $GITHUB_OUTPUT
          echo "$COMMITS" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Get changed files
        id: files
        run: |
          FILES=$(git diff --name-only origin/${{ github.base_ref }}..HEAD)
          echo "files<<EOF" >> $GITHUB_OUTPUT
          echo "$FILES" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - uses: anthropics/claude-code-action@v1
        id: description
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Generate a PR description based on:

            **PR Title**: ${{ github.event.pull_request.title }}

            **Commits**:
            ${{ steps.commits.outputs.commits }}

            **Changed Files**:
            ${{ steps.files.outputs.files }}

            Format:
            ## Summary
            Brief description of what this PR does.

            ## Changes
            - Bullet points of specific changes

            ## Testing
            - How to test these changes
            - [ ] Checklist items for reviewer

            ## Related Issues
            Closes #XXX (if applicable based on commit messages)

      - name: Update PR description
        uses: actions/github-script@v7
        with:
          script: |
            const description = `${{ steps.description.outputs.response }}`;

            await github.rest.pulls.update({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number,
              body: description
            });
```

### Code Suggestions on PR Comments

Respond to @claude mentions in PR comments:

```yaml
# .github/workflows/claude-pr-assistant.yml
name: Claude PR Assistant

on:
  issue_comment:
    types: [created]

permissions:
  contents: read
  pull-requests: write

jobs:
  respond:
    # Only run on PR comments that mention @claude
    if: |
      github.event.issue.pull_request &&
      contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get PR diff
        id: diff
        run: |
          gh pr diff ${{ github.event.issue.number }} > pr_diff.txt
          echo "diff_file=pr_diff.txt" >> $GITHUB_OUTPUT
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - uses: anthropics/claude-code-action@v1
        id: response
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            A user asked for help on a pull request.

            **User comment**: ${{ github.event.comment.body }}

            **PR Diff**:
            $(cat ${{ steps.diff.outputs.diff_file }})

            Respond helpfully to their request. You can:
            - Explain code changes
            - Suggest improvements
            - Answer questions about the implementation
            - Provide code snippets if asked

            Be concise and actionable.

      - name: Post response
        uses: actions/github-script@v7
        with:
          script: |
            const response = `${{ steps.response.outputs.response }}`;

            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: response
            });
```

---

## Troubleshooting GitHub Actions

### Common Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| "Resource not accessible by integration" | Missing permissions | Add `permissions:` block to workflow |
| Action times out | Large PR or slow response | Increase `timeout-minutes` or limit file scope |
| Empty response | Missing context | Ensure checkout has `fetch-depth: 0` |
| Rate limiting | Too many API calls | Add delays between requests or reduce workflow triggers |

### Debug Mode

Add verbose logging to troubleshoot:

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    prompt: "..."
  env:
    ACTIONS_STEP_DEBUG: true
```

### Required Secrets

Ensure these secrets are configured in your repository settings:

| Secret | Purpose | Where to get it |
|--------|---------|-----------------|
| `ANTHROPIC_API_KEY` | Claude API access | [console.anthropic.com](https://console.anthropic.com) |
| `GITHUB_TOKEN` | Provided automatically | Built-in, no configuration needed |

---
sidebar_position: 4
---

# GitHub Integration

Connect Claude Code with GitHub for PR reviews, issue management, and CI/CD.

## What This Page Covers

This page shows you how to integrate Claude Code with GitHub for automated code reviews, issue triage, and CI/CD workflows. You'll learn about the GitHub App, Actions integration, and MCP server.

**Why integrate with GitHub?** Claude Code can review PRs, respond to issue comments, and automate repository workflows. This extends Claude's capabilities beyond your local terminal to your team's collaboration platform.

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

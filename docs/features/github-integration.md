---
sidebar_position: 6
---

# GitHub Integration

Connect Claude Code with GitHub for PR reviews, issue management, and CI/CD.

## GitHub App

### Installation

```
/install-github-app
```

This installs the Claude Code GitHub App on your repositories, enabling:

- **@claude mentions** in issues and PRs
- **Automated PR reviews**
- **Issue triage and responses**

### @claude Mentions

Mention `@claude` in any issue or PR comment:

```
@claude can you review this PR and check for security issues?

@claude explain what this change does

@claude suggest how to fix this bug
```

## Local Code Review

Review changes without GitHub:

```
/code-review
```

Reviews your current git diff and provides feedback.

### PR Comments

Post review directly to a PR:

```
/code-review --comment
```

Or specify a PR number:

```
/code-review --pr 123
```

## GitHub Actions

### Claude Code Action

Add AI-powered automation to your workflows:

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

| Input | Description | Required |
|-------|-------------|----------|
| `anthropic_api_key` | API key | Yes |
| `prompt` | Instructions for Claude | Yes |
| `model` | Model to use | No |
| `max_tokens` | Response limit | No |

### Example Workflows

#### Auto-label Issues

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

## GitHub MCP Server

For full GitHub API access, use the GitHub MCP server:

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

```
You: create an issue for the auth bug we discussed

Claude: I'll create a GitHub issue for the authentication bug.
[Uses mcp__github__create_issue]

Created issue #42: "Auth token refresh causes logout"
https://github.com/user/repo/issues/42
```

## Best Practices

1. **Scope permissions** — Only install the app on needed repos
2. **Use secrets** — Never commit API keys; use GitHub secrets
3. **Review before merge** — Use Claude for suggestions, human for approval
4. **Rate limits** — Be mindful of API rate limits in workflows

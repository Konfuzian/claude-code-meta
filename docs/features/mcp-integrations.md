---
sidebar_position: 2
---

# MCP Integrations

Model Context Protocol (MCP) extends Claude Code with external tools and data sources.

## What is MCP?

MCP is an open standard by Anthropic that allows Claude to interact with external systems:

- **GitHub** — Manage repos, PRs, issues
- **Databases** — Query PostgreSQL, SQLite
- **APIs** — Interact with web services
- **Files** — Access Google Drive, local filesystems
- **Browsers** — Control Puppeteer for web automation

Claude Code acts as both an MCP **client** (connecting to servers) and **server** (exposable to other tools).

## Configuration

### Project-level (`.claude/mcp.json`)

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

### User-level (`~/.claude/mcp.json`)

Same format, applies to all projects.

## Available MCP Servers

### Official Anthropic Servers

| Server | Use Case |
|--------|----------|
| `@anthropic-ai/mcp-server-github` | GitHub API access |
| `@anthropic-ai/mcp-server-git` | Git operations |
| `@anthropic-ai/mcp-server-postgres` | PostgreSQL queries |
| `@anthropic-ai/mcp-server-sqlite` | SQLite database |
| `@anthropic-ai/mcp-server-puppeteer` | Browser automation |
| `@anthropic-ai/mcp-server-slack` | Slack integration |
| `@anthropic-ai/mcp-server-gdrive` | Google Drive access |

### Community Servers

Find more at [MCP Servers Directory](https://github.com/modelcontextprotocol/servers).

## Using MCP Tools

Once configured, MCP tools are automatically available to Claude:

```
You: create a GitHub issue for the bug we just found

Claude: I'll create a GitHub issue using the GitHub MCP server.
[Uses mcp__github__create_issue tool]
Created issue #42: "Auth token refresh not implemented"
```

### @ Mentions for Resources

Reference MCP resources directly:

```
@github:owner/repo#123    # GitHub issue
@postgres:users           # Database table
```

### MCP Prompts

Access server-provided prompts:

```
/mcp__github__review_pr 123
```

## Token Limits

MCP responses have token limits to prevent context overflow:

| Setting | Default | Purpose |
|---------|---------|---------|
| Warning threshold | 10,000 tokens | Shows warning |
| Maximum | 25,000 tokens | Truncates response |

Configure via `MAX_MCP_OUTPUT_TOKENS` environment variable.

## Tool Search

When MCP tool descriptions exceed 10% of the context window, Claude Code enables **Tool Search** — dynamically loading tools on-demand rather than including all descriptions upfront.

## Permissions

Control MCP access in settings:

```json
{
  "permissions": {
    "allow": [
      "mcp__github__*",           // All GitHub tools
      "mcp__postgres__query"      // Only read queries
    ],
    "deny": [
      "mcp__postgres__execute"    // Block write operations
    ]
  }
}
```

Use wildcards (`mcp__server__*`) for bulk permissions.

## Debugging

View MCP server logs:

```bash
claude --mcp-debug
```

Check server status:

```
/mcp status
```

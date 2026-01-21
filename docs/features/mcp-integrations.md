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

## Getting Started with MCP

To use MCP with Claude Code, you need to:

1. **Choose an MCP server** — Pick a server that provides the tools you need (filesystem, GitHub, database, etc.)
2. **Create a configuration file** — Add the server to your `.claude/mcp.json` (project-level) or `~/.claude/mcp.json` (user-level)
3. **Restart Claude Code** — MCP servers are loaded when Claude Code starts
4. **Start using the tools** — The new tools are automatically available in your conversations

### Tutorial: Setting Up the Filesystem MCP Server

Let's walk through setting up the filesystem MCP server, which gives Claude access to read and write files in specified directories.

**Step 1: Create the configuration file**

Create a `.claude` folder in your project root (if it doesn't exist), then create `mcp.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/path/to/allowed/directory"
      ]
    }
  }
}
```

Replace `/path/to/allowed/directory` with the actual path you want Claude to access (e.g., `/Users/me/documents` or `C:\\Users\\me\\documents` on Windows).

**Step 2: Restart Claude Code**

Close and reopen Claude Code, or start a new session. You should see the filesystem tools become available.

**Step 3: Verify the connection**

Check that the MCP server is running:

```
/mcp status
```

**Step 4: Use the filesystem tools**

Now you can ask Claude to interact with the filesystem:

```
You: List all files in the documents folder

Claude: I'll use the filesystem MCP server to list the directory.
[Uses mcp__filesystem__list_directory tool]
Found 12 files: report.pdf, notes.txt, ...
```

```
You: Read the contents of notes.txt

Claude: [Uses mcp__filesystem__read_file tool]
Here's what's in notes.txt: ...
```

:::tip
You can specify multiple directories by adding more paths to the `args` array. The server will only have access to the directories you explicitly list.
:::

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

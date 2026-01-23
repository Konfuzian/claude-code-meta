---
sidebar_position: 3
---

# MCP Integrations

Model Context Protocol (MCP) extends Claude Code with external tools and data sources.

## What This Page Covers

This page teaches you how to connect Claude Code to external services using MCP (Model Context Protocol). You'll learn how to give Claude access to GitHub, databases, file systems, and more.

**Why use MCP?** Claude Code's built-in tools handle code editing and terminal commands. MCP adds capabilities that require external connections — like creating GitHub issues, querying databases, or accessing Google Drive.

---

## What is MCP?

MCP is an open standard by Anthropic that allows Claude to interact with external systems:

- **GitHub** — Manage repos, PRs, issues
- **Databases** — Query PostgreSQL, SQLite
- **APIs** — Interact with web services
- **Files** — Access Google Drive, local filesystems
- **Browsers** — Control Puppeteer for web automation

Claude Code acts as both an MCP **client** (connecting to servers) and **server** (exposable to other tools).

---

## Getting Started with MCP

This section walks you through the process of adding an MCP server to Claude Code. Once configured, the server's tools become available in your conversations.

To use MCP with Claude Code, you need to:

1. **Choose an MCP server** — Pick a server that provides the tools you need (filesystem, GitHub, database, etc.)
2. **Create a configuration file** — Add the server to your `.claude/mcp.json` (project-level) or `~/.claude/mcp.json` (user-level)
3. **Restart Claude Code** — MCP servers are loaded when Claude Code starts
4. **Start using the tools** — The new tools are automatically available in your conversations

### Tutorial: Setting Up the Filesystem MCP Server

This hands-on tutorial walks through a complete MCP setup. The filesystem server is a good starting point because it's simple and immediately useful.

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

---

## Configuration

MCP servers are configured in JSON files. Project-level configs are shared with your team; user-level configs are personal.

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

---

## Available MCP Servers

Anthropic provides official MCP servers for common integrations. Community servers extend this further.

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

---

## Using MCP Tools

Once configured, MCP tools appear automatically in Claude's available tools. You don't need special syntax — just describe what you want and Claude will use the appropriate tool.

```
You: create a GitHub issue for the bug we just found

Claude: I'll create a GitHub issue using the GitHub MCP server.
[Uses mcp__github__create_issue tool]
Created issue #42: "Auth token refresh not implemented"
```

### @ Mentions for Resources

Some MCP servers expose "resources" — data sources you can reference directly in your messages using `@` syntax:

```
@github:owner/repo#123    # GitHub issue
@postgres:users           # Database table
```

### MCP Prompts

Some MCP servers provide pre-built prompts you can invoke directly:

```
/mcp__github__review_pr 123
```

---

## Token Limits

MCP responses can be large (database query results, file contents, API responses). These limits prevent MCP output from consuming your entire context window:

| Setting | Default | Purpose |
|---------|---------|---------|
| Warning threshold | 10,000 tokens | Shows warning |
| Maximum | 25,000 tokens | Truncates response |

Configure via `MAX_MCP_OUTPUT_TOKENS` environment variable.

## Tool Search

When you have many MCP servers configured, their tool descriptions can consume significant context. **Tool Search** is an optimization that loads tool definitions on-demand rather than including all of them upfront. It activates automatically when MCP tool descriptions exceed 10% of the context window.

---

## Permissions

You can pre-approve or block specific MCP tools using permission rules. This reduces prompts for trusted tools and prevents access to dangerous ones:

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

For comprehensive security configuration, see [Security Best Practices](/docs/best-practices/security).

---

## Debugging

When MCP servers don't work as expected, these commands help diagnose the issue:

```bash
claude --mcp-debug
```

Check server status:

```
/mcp status
```

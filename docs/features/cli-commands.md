---
sidebar_position: 1
---

# CLI Commands

Complete reference for Claude Code commands and slash commands.

## CLI Arguments

```bash
claude [options] [prompt]
```

| Option | Description |
|--------|-------------|
| `-c, --continue` | Resume last conversation |
| `-p, --print` | Non-interactive mode (print and exit) |
| `--resume <id>` | Resume specific session |
| `--chrome` | Launch with Chrome integration |
| `--model <model>` | Use specific model |
| `--version` | Show version |
| `--help` | Show help |

## Slash Commands

Commands available during a session (type `/` to see all):

### Session Management

| Command | Description |
|---------|-------------|
| `/clear` | Reset conversation, start fresh |
| `/compact [instructions]` | Summarize conversation to free context |
| `/rewind` | Roll back to previous checkpoint |
| `/resume` | Continue a previous session |

### Configuration

| Command | Description |
|---------|-------------|
| `/config` | Open settings menu |
| `/model` | Switch between Claude models |
| `/permissions` | Manage tool permissions |
| `/hooks` | Configure event hooks |
| `/memory` | Edit CLAUDE.md files |
| `/init` | Generate CLAUDE.md from codebase |

### Tools & Integrations

| Command | Description |
|---------|-------------|
| `/mcp` | Manage MCP servers |
| `/plugin` | Manage plugins |
| `/install-github-app` | Set up GitHub integration |
| `/code-review` | Review code changes |

### Help & Info

| Command | Description |
|---------|-------------|
| `/help` | Show all commands |
| `/status` | Show session status |
| `/cost` | Show token usage |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Esc` (once) | Cancel current action |
| `Esc Esc` | Open rewind menu |
| `Ctrl+C` | Interrupt/exit |
| `Tab` | Autocomplete |
| `↑/↓` | Navigate history |

## @ Mentions

Reference files and resources with `@`:

```
@src/utils/auth.ts      # Specific file
@src/components/        # Directory
@https://example.com    # URL (with MCP)
```

## Context Modifiers

Add context to your prompts:

```
# Add instruction to memory
# Always use TypeScript strict mode

? Ask a question without executing
? what would happen if I deleted this?
```

## Examples

### Start with specific task

```bash
claude "refactor the auth module to use JWT"
```

### Resume and continue

```bash
claude -c "now add tests for what we built"
```

### Pipe input

```bash
git diff | claude -p "review these changes"
cat error.log | claude -p "explain and fix this error"
```

### Non-interactive script

```bash
claude -p "generate a README for this project" > README.md
```

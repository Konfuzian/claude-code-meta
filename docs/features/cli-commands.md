---
sidebar_position: 1
---

# CLI Commands

Complete reference for Claude Code commands and slash commands.

This page documents all the ways to invoke and control Claude Code: command-line arguments for starting sessions, slash commands for in-session control, keyboard shortcuts for efficiency, and special syntax like @ mentions.

---

## CLI Arguments

These options control how Claude Code starts. Use them when launching from your terminal:

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

---

## Slash Commands

Slash commands are available during a session. Type `/` to see all available commands. They're organized by function:

### Session Management

Control your conversation state:

| Command | Description |
|---------|-------------|
| `/clear` | Reset conversation, start fresh |
| `/compact [instructions]` | Summarize conversation to free context — use when context is filling up |
| `/rewind` | Roll back to previous checkpoint — undo recent changes |
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

---

## Keyboard Shortcuts

These shortcuts work during a session. Learning them speeds up your workflow:

| Shortcut | Action |
|----------|--------|
| `Esc` (once) | Cancel current action |
| `Esc Esc` | Open rewind menu — most useful shortcut for undoing |
| `Shift+Tab` | Cycle through modes (normal → plan → auto-accept) |
| `Ctrl+C` | Interrupt/exit |
| `Tab` | Autocomplete |
| `↑/↓` | Navigate history |

---

## @ Mentions

Reference files and resources directly in your prompts with `@`. This ensures Claude includes them in context:

```
@src/utils/auth.ts      # Specific file
@src/components/        # Directory
@https://example.com    # URL (with MCP)
```

---

## Context Modifiers

Special prefixes that change how Claude interprets your input:

```
# Add instruction to memory
# Always use TypeScript strict mode

? Ask a question without executing
? what would happen if I deleted this?
```

---

## Examples

Common patterns for using Claude Code effectively:

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

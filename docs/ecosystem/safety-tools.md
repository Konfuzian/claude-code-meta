---
sidebar_position: 3
---

# Safety Tools

Plugins and configurations to make Claude Code usage safer and more controlled.

## claude-code-safety-net

**A Claude Code plugin that catches destructive commands before they execute.**

[GitHub](https://github.com/kenryu42/claude-code-safety-net)

### Overview

claude-code-safety-net acts as a pre-execution filter, catching potentially dangerous git and filesystem commands before they run. It provides an extra layer of protection against accidental data loss.

### What It Catches

| Category | Examples |
|----------|----------|
| **Git destructive** | `git reset --hard`, `git clean -fd`, `git push --force` |
| **File deletion** | `rm -rf`, `rm -r`, bulk deletes |
| **Config overwrites** | `.env`, credentials, configs |
| **Database** | `DROP`, `TRUNCATE`, destructive migrations |

### Installation

```bash
# As a Claude Code plugin
/plugin install claude-code-safety-net
```

Or add to hooks manually:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": { "tool_name": "Bash" },
        "command": "safety-net check \"$COMMAND\""
      }
    ]
  }
}
```

### Configuration

Customize what to catch:

```json
{
  "safety-net": {
    "block": [
      "git reset --hard",
      "git push --force",
      "rm -rf /",
      "DROP TABLE",
      "TRUNCATE"
    ],
    "warn": [
      "git clean",
      "rm -r",
      "DELETE FROM"
    ],
    "allow": [
      "rm -rf node_modules",
      "rm -rf dist"
    ]
  }
}
```

### Behavior

- **Block**: Prevents execution, returns error
- **Warn**: Asks for confirmation before proceeding
- **Allow**: Explicitly permitted, no prompt

---

## everything-claude-code

**Complete Claude Code configuration collection from an Anthropic hackathon winner.**

[GitHub](https://github.com/affaan-m/everything-claude-code)

### Overview

everything-claude-code is a battle-tested collection of configurations, including agents, skills, hooks, commands, and MCP setups. It provides a solid starting point for new projects.

### What's Included

```
everything-claude-code/
├── agents/           # Pre-configured agent definitions
├── skills/           # Ready-to-use skills
├── hooks/            # Useful hook configurations
├── commands/         # Custom slash commands
├── rules/            # CLAUDE.md templates
└── mcps/             # MCP server configurations
```

### Highlights

#### Safe Defaults

Pre-configured permissions that balance productivity and safety:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(git status)",
      "Bash(git diff)",
      "Write(src/**)",
      "Write(tests/**)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force)",
      "Write(.env*)"
    ]
  }
}
```

#### Productivity Hooks

Auto-formatting, linting, and testing on file changes:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write", "file_path": "*.ts" },
        "command": "prettier --write $FILE_PATH && eslint --fix $FILE_PATH"
      }
    ]
  }
}
```

#### CLAUDE.md Templates

Starter templates for different project types:
- TypeScript/React projects
- Python projects
- Node.js backends
- Full-stack applications

### Usage

```bash
# Clone and copy what you need
git clone https://github.com/affaan-m/everything-claude-code
cp -r everything-claude-code/hooks .claude/
cp everything-claude-code/rules/typescript.md CLAUDE.md
```

---

## Building Your Own Safety Layer

### Essential Deny Rules

Start with these in every project:

```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf ~)",
      "Bash(rm -rf .)",
      "Bash(sudo *)",
      "Bash(chmod 777 *)",
      "Bash(git push --force origin main)",
      "Bash(git push --force origin master)",
      "Write(.env)",
      "Write(*.pem)",
      "Write(*credentials*)",
      "Write(*secret*)"
    ]
  }
}
```

### Pre-commit Validation

Add a hook to validate changes before git operations:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": { "tool_name": "Bash", "command": "git commit*" },
        "command": "npm run lint && npm test"
      }
    ]
  }
}
```

### Audit Logging

Log all potentially dangerous operations:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": { "tool_name": "Bash" },
        "command": "echo \"$(date): $COMMAND\" >> ~/.claude/audit.log"
      }
    ]
  }
}
```

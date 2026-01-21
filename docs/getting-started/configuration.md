---
sidebar_position: 3
---

# Configuration

Customize Claude Code with settings and CLAUDE.md files.

## CLAUDE.md — Project Memory

CLAUDE.md files provide context and instructions that Claude reads at the start of each session.

### File Locations

| Location | Scope | Git-tracked |
|----------|-------|-------------|
| `~/.claude/CLAUDE.md` | Global (all projects) | N/A |
| `./CLAUDE.md` | Project root | Yes |
| `./CLAUDE.local.md` | Project root (local) | No (gitignore) |
| `./subdir/CLAUDE.md` | Subdirectory | Yes |

Files are loaded hierarchically — subdirectory files extend parent context.

### What to Include

```markdown
# Project: MyApp

## Tech Stack
- React 18 + TypeScript
- Node.js backend with Express
- PostgreSQL database

## Conventions
- Use functional components with hooks
- Prefer named exports
- Test files next to source: `*.test.ts`

## Common Commands
- `npm run dev` - Start development
- `npm test` - Run tests
- `npm run lint` - Check linting

## Known Issues
- Auth tokens expire after 24h (refresh not implemented yet)
```

### Quick Add

Add instructions on the fly:

```
# Always use async/await instead of .then()
```

Lines starting with `#` are added to session memory.

## Settings Files

### Locations

| File | Scope | Precedence |
|------|-------|------------|
| `~/.claude/settings.json` | User global | 1 (lowest) |
| `.claude/settings.json` | Project (git-tracked) | 2 |
| `.claude/settings.local.json` | Project (local) | 3 |
| `managed-settings.json` | Enterprise | 4 (highest) |

### Common Settings

```json
{
  "model": "sonnet",
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Write(src/**)"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write" },
        "command": "prettier --write $FILE_PATH"
      }
    ]
  }
}
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | API authentication |
| `CLAUDE_MODEL` | Default model |
| `MAX_MCP_OUTPUT_TOKENS` | MCP response limit |

## Generating CLAUDE.md

Use the `/init` command to auto-generate a CLAUDE.md by analyzing your codebase:

```
/init
```

Claude will scan your project and create a starter CLAUDE.md with detected patterns.

## Next Steps

- [Hooks](/docs/features/hooks) — Automate actions on tool use
- [Permissions](/docs/best-practices/security) — Configure access controls

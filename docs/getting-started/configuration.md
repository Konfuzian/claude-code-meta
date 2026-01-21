---
sidebar_position: 3
---

# Configuration

Customize Claude Code with settings and CLAUDE.md files.

This page covers the two main ways to configure Claude Code: **CLAUDE.md files** (project context and instructions) and **settings files** (permissions, hooks, and preferences).

---

## CLAUDE.md — Project Memory

CLAUDE.md files are the most important configuration you can create. They provide context and instructions that Claude reads at the start of each session, teaching it about your project without you having to explain every time.

### File Locations

CLAUDE.md files can exist at multiple levels. Claude loads all of them, with more specific files adding to the context:

| Location | Scope | Git-tracked |
|----------|-------|-------------|
| `~/.claude/CLAUDE.md` | Global (all projects) | N/A |
| `./CLAUDE.md` | Project root | Yes |
| `./CLAUDE.local.md` | Project root (local) | No (gitignore) |
| `./subdir/CLAUDE.md` | Subdirectory | Yes |

Files are loaded hierarchically — subdirectory files extend parent context. This means you can have project-wide instructions and subdirectory-specific overrides.

### What to Include

A good CLAUDE.md explains your project to someone who's never seen it. Here's an example:

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

You can add instructions during a session without editing files. Lines starting with `#` are added to session memory:

```
# Always use async/await instead of .then()
```

This is useful when you notice Claude making a repeated mistake — add a quick correction on the fly.

---

## Settings Files

Settings files configure Claude Code's behavior: permissions, hooks, model preferences, and more. They're JSON files at specific locations.

### Locations

Settings are merged from multiple files, with higher-precedence files overriding lower ones:

| File | Scope | Precedence |
|------|-------|------------|
| `~/.claude/settings.json` | User global | 1 (lowest) |
| `.claude/settings.json` | Project (git-tracked) | 2 |
| `.claude/settings.local.json` | Project (local) | 3 |
| `managed-settings.json` | Enterprise | 4 (highest) |

### Common Settings

Here's an example settings file showing the most useful options:

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

---

## Environment Variables

These environment variables configure Claude Code at the system level:

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | API authentication — required if not using OAuth |
| `CLAUDE_MODEL` | Default model — override the default Sonnet |
| `MAX_MCP_OUTPUT_TOKENS` | MCP response limit — control context usage from MCP tools |

---

## Generating CLAUDE.md

Don't want to write CLAUDE.md from scratch? Use the `/init` command to auto-generate one by analyzing your codebase:

```
/init
```

Claude will scan your project and create a starter CLAUDE.md with detected patterns, tech stack, and common commands. You can then refine it.

## Next Steps

- [Hooks](/docs/features/hooks) — Automate actions on tool use
- [Permissions](/docs/best-practices/security) — Configure access controls

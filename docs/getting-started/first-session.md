---
sidebar_position: 2
---

# Your First Session

Learn the basics of working with Claude Code.

## Starting a Session

### Interactive Mode

```bash
# Start in current directory
claude

# Start with a prompt
claude "explain this codebase"

# Resume last conversation
claude -c
```

### Non-Interactive Mode

```bash
# Print mode - single response, no interaction
claude -p "what does this function do?"

# Pipe input
cat error.log | claude -p "explain this error"
```

## Basic Interactions

Once in a session, you can:

- **Ask questions** about your code
- **Request changes** to files
- **Run commands** through Claude
- **Navigate** the codebase together

### Example Session

```
You: what files handle authentication?

Claude: Looking at your codebase...
[Uses Grep/Glob to search]
Authentication is handled in:
- src/auth/login.ts - Login logic
- src/auth/middleware.ts - Auth middleware
- src/utils/jwt.ts - Token handling

You: add rate limiting to the login endpoint

Claude: I'll add rate limiting to the login endpoint.
[Reads files, proposes changes]
...
```

## Understanding Permissions

Claude Code asks for permission before:

- **Writing files** — Creating or modifying code
- **Running commands** — Executing bash/shell commands
- **Network access** — Making external requests

You can pre-approve actions via `/permissions` or settings.

## Essential Commands

| Command | Action |
|---------|--------|
| `/help` | Show all commands |
| `/clear` | Reset conversation |
| `/compact` | Compress context |
| `/model` | Switch AI model |
| `/config` | Open settings |

Press `Esc` twice to cancel or rewind.

## Tips for Beginners

1. **Start with questions** — Ask Claude to explain the codebase before making changes
2. **Be specific** — Clear prompts get better results
3. **Review changes** — Check diffs before accepting writes
4. **Use plan mode** — For complex tasks, let Claude plan first

## Next Steps

- [Configuration](/docs/getting-started/configuration) — Set up CLAUDE.md and preferences
- [CLI Commands](/docs/features/cli-commands) — Full command reference

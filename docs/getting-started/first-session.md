---
sidebar_position: 2
---

# Your First Session

Learn the basics of working with Claude Code.

This page covers the essential concepts you need to start being productive: starting sessions, understanding how Claude interacts with your codebase, and the key commands you'll use daily.

## Starting a Session

There are two ways to use Claude Code: interactively (conversation) or non-interactively (single command).

### Interactive Mode

Use this for ongoing conversations where you'll ask follow-up questions:

```bash
# Start in current directory — Claude will see your project files
claude

# Start with a prompt — begins the conversation with your request
claude "explain this codebase"

# Resume last conversation — continues where you left off
claude -c
```

### Non-Interactive Mode

Use this for one-off commands or scripting:

```bash
# Print mode — single response, no interaction, then exit
claude -p "what does this function do?"

# Pipe input — great for processing errors or logs
cat error.log | claude -p "explain this error"
```

## Basic Interactions

Once in a session, Claude can do much more than just answer questions. You can:

- **Ask questions** about your code
- **Request changes** to files
- **Run commands** through Claude
- **Navigate** the codebase together

### Example Session

Here's what a typical conversation looks like. Notice how Claude uses tools (search, read, write) automatically:

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

Claude figures out which tools to use based on what you ask.

## Understanding Permissions

Claude Code asks for permission before potentially dangerous operations. This is a safety feature that lets you review actions before they happen:

- **Writing files** — Creating or modifying code
- **Running commands** — Executing bash/shell commands
- **Network access** — Making external requests

When prompted, you can allow once, allow always (for the session), or deny.

To reduce permission prompts, pre-approve common safe operations via `/permissions` or in your settings file.

For comprehensive security configuration, see [Security Best Practices](/docs/best-practices/security).

## Essential Commands

You'll use these slash commands frequently. Type `/` to see all available commands:

| Command | Action |
|---------|--------|
| `/help` | Show all commands |
| `/clear` | Reset conversation — start fresh |
| `/compact` | Compress context — use when context gets full |
| `/model` | Switch AI model — Sonnet, Opus, or Haiku |
| `/config` | Open settings — configure preferences |

Press `Esc` twice to cancel the current action or open the rewind menu (to undo).

## Tips for Beginners

These habits will help you get better results:

1. **Start with questions** — Ask Claude to explain the codebase before making changes. Understanding first prevents mistakes.
2. **Be specific** — Clear prompts get better results. "Fix the auth bug" is worse than "Fix the bug where users get logged out after refresh in src/auth/session.ts"
3. **Review changes** — Check diffs before accepting writes. Claude shows you what it will change.
4. **Use plan mode** — For complex tasks, let Claude plan first. Press `Shift+Tab` to cycle to plan mode.

## Next Steps

- [Configuration](/docs/getting-started/configuration) — Set up CLAUDE.md and preferences
- [CLI Commands](/docs/features/cli-commands) — Full command reference

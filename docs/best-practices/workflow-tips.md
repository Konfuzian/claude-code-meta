---
sidebar_position: 1
---

# Workflow Tips

Maximize your productivity with Claude Code.

## Plan Before You Code

### Use Plan Mode

For complex tasks, switch to plan mode:

1. Open `/config` or click the mode indicator
2. Select "Plan Mode"
3. Describe your task
4. Claude creates a plan without writing code
5. Review, refine, then switch to execution

**Why it works**: Iterating on a plan is faster than iterating on code. A good plan often leads to one-shot implementation.

### Good Planning Prompts

```
Plan how to add user authentication to this app.
Consider existing patterns in the codebase.

Plan the refactoring of the payment module.
List all files that need changes.
```

## CLAUDE.md as Living Documentation

### Document Mistakes

When Claude makes a repeated mistake, add it to CLAUDE.md:

```markdown
## Known Gotchas
- Don't use `any` type - always use proper TypeScript types
- Tests must use `vitest` not `jest` in this project
- API responses are snake_case, frontend uses camelCase
```

### Include Examples

```markdown
## Code Style

Preferred pattern for API calls:
\`\`\`typescript
const data = await api.get<User>('/users/1');
\`\`\`

Not this:
\`\`\`typescript
const data = await fetch('/api/users/1').then(r => r.json());
\`\`\`
```

## Parallel Sessions

Run multiple Claude Code sessions simultaneously for complex projects:

### Separate Git Checkouts

```bash
# Main feature work
cd ~/projects/app-main
claude "implement the auth feature"

# Parallel testing/fixes (different terminal)
cd ~/projects/app-tests
claude "write tests for the user module"
```

**Important**: Use separate git checkouts, not branches. Switching branches mid-session causes confusion.

### Web + Local Sessions

Combine Claude Code CLI with Claude.ai web for parallel thinking:
- CLI for code implementation
- Web for architecture discussions, documentation

## Subagents for Research

Let Claude delegate research to preserve your main context:

```
You: I need to understand how the payment system works before changing it

Claude: I'll use a subagent to research the payment system.
[Spawns explore agent]
[Main context preserved while agent searches]

Here's what I found about the payment system...
```

### When to Use Subagents

- Early in conversations (context is precious)
- Exploring unfamiliar code areas
- Verifying assumptions
- Searching for patterns across the codebase

## Effective Prompting

### Be Specific

❌ "Fix the bug"

✅ "Fix the login bug where users get logged out after page refresh. The issue is likely in src/auth/session.ts"

### Provide Context

❌ "Add a button"

✅ "Add a logout button to the header navbar. Match the existing button styling. It should call the /api/logout endpoint and redirect to /login"

### Break Down Large Tasks

Instead of:
```
Refactor the entire authentication system to use JWT
```

Try:
```
Let's refactor auth to JWT. First, show me the current auth implementation and propose a migration plan.
```

## Session Hygiene

### Start Fresh for New Tasks

```
/clear
```

Accumulated context from previous tasks can confuse new ones.

### Compact at Natural Breakpoints

```
/compact Focus on the auth refactoring we just completed
```

Compact when:
- Finishing a feature
- Before starting a new task
- When context feels cluttered

### Use Checkpoints

Press `Esc Esc` to checkpoint before risky operations:
- Major refactoring
- Trying experimental approaches
- Before accepting large batches of changes

---
sidebar_position: 1
---

# Workflow Tips

Maximize your productivity with Claude Code.

## What This Page Covers

This page collects practical tips for getting the most out of Claude Code. You'll learn patterns that experienced users have found effective for common development tasks.

**Why read this?** These tips come from real usage patterns. They can help you avoid common pitfalls and work more efficiently.

---

## Plan Before You Code

Planning before implementation helps Claude understand your goals and produces better results. This section covers plan mode and effective planning prompts.

### Use Plan Mode

For complex tasks, switch to plan mode:

1. Press `Shift+Tab` to cycle through modes, or open `/config`
2. Select "Plan Mode"
3. Describe your task
4. Claude creates a plan without writing code
5. Review, refine, then switch to execution

### Keyboard Shortcuts

These modes change how Claude operates. `Shift+Tab` cycles through them:

| Mode | Description |
|------|-------------|
| **Normal** | Standard operation with permission prompts |
| **Plan Mode** | Claude researches and plans without making changes |
| **Auto-accept** | Bypass permission prompts (use with caution) |

**Why it works**: Iterating on a plan is faster than iterating on code. A good plan often leads to one-shot implementation.

### Good Planning Prompts

These prompts demonstrate how to ask Claude for plans rather than immediate implementation:

```
Plan how to add user authentication to this app.
Consider existing patterns in the codebase.

Plan the refactoring of the payment module.
List all files that need changes.
```

---

## CLAUDE.md as Living Documentation

CLAUDE.md isn't just initial setup — it's a living document you should update as you work. This section shows how to use it effectively.

### Document Mistakes

When Claude makes a repeated mistake, don't just correct it — add it to CLAUDE.md so it doesn't happen again:

```markdown
## Known Gotchas
- Don't use `any` type - always use proper TypeScript types
- Tests must use `vitest` not `jest` in this project
- API responses are snake_case, frontend uses camelCase
```

### Include Examples

Showing Claude what you want (and don't want) is more effective than describing it:

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

---

## Parallel Sessions

You can run multiple Claude Code sessions at once. This is useful for complex projects where you want to work on multiple fronts simultaneously.

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

---

## Subagents for Research

Claude can spawn "subagents" to explore the codebase without consuming your main conversation's context. This keeps your primary context focused on the task at hand.

```
You: I need to understand how the payment system works before changing it

Claude: I'll use a subagent to research the payment system.
[Spawns explore agent]
[Main context preserved while agent searches]

Here's what I found about the payment system...
```

### When to Use Subagents

Subagents are most valuable when exploration would consume too much context:

- Early in conversations (context is precious)
- Exploring unfamiliar code areas
- Verifying assumptions
- Searching for patterns across the codebase

---

## Effective Prompting

How you phrase requests significantly affects Claude's responses. These patterns help Claude understand exactly what you need.

### Be Specific

Vague requests lead to guessing. Specific requests get precise results:

❌ "Fix the bug"

✅ "Fix the login bug where users get logged out after page refresh. The issue is likely in src/auth/session.ts"

### Provide Context

Context helps Claude make better decisions about implementation details:

❌ "Add a button"

✅ "Add a logout button to the header navbar. Match the existing button styling. It should call the /api/logout endpoint and redirect to /login"

### Break Down Large Tasks

Large tasks are more likely to go off track. Break them into smaller, verifiable steps:
```
Refactor the entire authentication system to use JWT
```

Try:
```
Let's refactor auth to JWT. First, show me the current auth implementation and propose a migration plan.
```

---

## Commit and Push Regularly

Git commits create recovery points and track your progress. This section explains when and how to commit effectively with Claude.

### Why It Matters

Regular commits create recovery points and preserve your progress:
- **Recovery**: Roll back if Claude goes in the wrong direction
- **Visibility**: Track what was changed and when
- **Safety**: Work is backed up to remote immediately
- **Collaboration**: Others can see progress in real-time

### Commit at Natural Breakpoints

Ask Claude to commit after completing logical units of work:

```
Commit the changes we just made
```

Good times to commit:
- After completing a feature or fix
- Before starting a risky refactoring
- After tests pass
- Before trying an experimental approach

### Push Immediately

Don't accumulate local commits. Push after each commit:

```
Commit and push the auth changes
```

This ensures:
- Work is backed up remotely
- CI/CD pipelines can validate changes
- Team members see progress
- No risk of losing local work

### Atomic Commits

Prefer small, focused commits over large batches:

```
✅ "Add login endpoint validation"
✅ "Fix session timeout handling"
✅ "Add tests for auth middleware"

❌ "Various auth changes and fixes"
```

---

## Verify Builds Before Pushing

A failed build in CI means your changes won't deploy. Catching errors locally is faster than waiting for CI. This section covers build verification.

### Why It Matters

Always verify locally before pushing:

```bash
npm run build
```

### What the Build Catches

Build verification catches several common issues before they reach CI:

- **MDX syntax errors**: Unescaped `<` characters (like `&lt;10` or `&lt;0.05ms`) are interpreted as JSX tags
- **Broken links**: Internal links to non-existent pages
- **Invalid frontmatter**: YAML syntax errors in page metadata
- **Import errors**: Missing or incorrect component imports

### The Workflow

```bash
# Make your changes
# ...

# Verify build works
npm run build

# If successful, commit and push
git add .
git commit -m "Your commit message"
git push
```

### Common MDX Pitfalls

In MDX (Markdown + JSX), certain characters have special meaning:

```markdown
# These will FAIL:
- Response time: <10ms        # Looks like JSX tag
- Accuracy: <0.05% error      # Looks like JSX tag

# These will WORK:
- Response time: &lt;10ms     # HTML entity
- Accuracy: &lt;0.05% error   # HTML entity
- Response time: less than 10ms  # Plain text
```

---

## Session Hygiene

Managing your Claude Code session keeps it effective. These practices help avoid context confusion and preserve important state.

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

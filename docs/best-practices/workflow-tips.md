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

## Plans and Specifications

One of the most impactful practices for AI-assisted development is **writing plans and specifications before implementation**. This section explains why planning matters and how to do it effectively — a foundational skill that benefits all AI-assisted development.

### Why Plans Matter

When working with AI agents, clear written specifications serve multiple purposes. Understanding these benefits helps you invest the right amount of effort in planning:

- **Shared context** — The plan becomes a reference point that both you and Claude can refer back to
- **Reduced hallucination** — Concrete specs anchor Claude's work to defined requirements
- **Resumable sessions** — When context resets or you start a new session, the plan file brings Claude up to speed instantly
- **Better decisions** — Writing forces you to think through edge cases before implementation begins
- **Review checkpoints** — Plans create natural pause points to verify direction before investing in code

### Version Control Your Plans

Just like code, specifications benefit from version control. **Treat specifications like code** — commit them to your repository:

```
project/
├── specs/
│   ├── auth-system.md
│   ├── api-v2-migration.md
│   └── performance-optimization.md
├── CLAUDE.md
└── src/
```

Version-controlled plans provide:

- **History** — See how requirements evolved over time
- **Collaboration** — Team members can review and comment on specs via PRs
- **Accountability** — Clear record of what was planned vs. what was built
- **Onboarding** — New contributors understand the "why" behind code decisions

### What to Include in Specs

Not sure what to write? A useful specification typically covers these elements. You don't need all of them for every task — use judgment based on complexity:

1. **Problem statement** — What are we solving and why?
2. **Requirements** — What must the solution do?
3. **Non-goals** — What are we explicitly not doing?
4. **Approach** — High-level technical direction
5. **Open questions** — Unknowns to resolve during implementation
6. **Success criteria** — How do we know when it's done?

### Working with Claude

Here's a practical workflow for spec-driven development with Claude. When starting work on a feature:

1. **Create a spec file** in your repo (e.g., `specs/feature-name.md`)
2. **Discuss the plan with Claude** — ask it to help refine requirements
3. **Commit the spec** before implementation begins
4. **Reference the spec** during implementation: "Implement the auth flow as described in specs/auth-system.md"
5. **Update the spec** if requirements change mid-implementation

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

A failed build in CI means your changes won't deploy. Catching errors locally is faster than waiting for CI.

### Why It Matters

Always run your project's build command before pushing:

```bash
npm run build    # or your project's equivalent
```

This catches issues that might pass linting but fail in CI, such as:

- **Type errors**: TypeScript compilation failures
- **Linting errors**: Style violations or code quality issues
- **Test failures**: Broken tests that block deployment
- **Build configuration issues**: Missing dependencies, invalid imports, or syntax errors

### The Workflow

```bash
# Make your changes, then verify build works
npm run build

# If successful, commit and push
git add .
git commit -m "Your commit message"
git push
```

Building locally before pushing saves time and keeps your CI pipeline green.

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

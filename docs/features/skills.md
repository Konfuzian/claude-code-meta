---
sidebar_position: 6
---

# Skills & Custom Commands

Create reusable slash commands to automate common tasks.

## What This Page Covers

This page teaches you how to extend Claude Code with your own slash commands. There are two approaches:

- **Custom Commands** — Simple markdown files that define prompts. Invoked explicitly with `/commandname`.
- **Skills** — Enhanced commands with their own directories, supporting files, and optional auto-invocation triggers.

**Why create these?** Instead of typing the same detailed prompts repeatedly, you define them once. Then you just type `/yourcommand` and Claude executes your predefined workflow.

---

# Part 1: Custom Commands

Custom commands are the simplest way to create reusable prompts. They're just markdown files where the filename becomes the command name.

## Creating a Command

Create a file at `.claude/commands/review.md`:

```markdown
Review the current git diff and provide feedback on:
- Code quality
- Potential bugs
- Performance concerns
- Naming conventions

Be concise and actionable.
```

Use it with `/review`. The file's content becomes Claude's instructions.

## Commands with Arguments

Commands can accept arguments using the `$ARGUMENTS` variable. Whatever the user types after the command name gets substituted into the prompt.

Create `.claude/commands/test.md`:

```markdown
---
description: Generate tests for a file
---

Write comprehensive tests for $ARGUMENTS.

Include:
- Unit tests for all public functions
- Edge cases
- Error handling tests

Use the existing test patterns in this codebase.
```

Use it with `/test src/utils/auth.ts`.

## Command Locations

Commands can be stored at two levels:

| Location | Scope | Access |
|----------|-------|--------|
| `.claude/commands/*.md` | Project | Team (git-tracked) |
| `~/.claude/commands/*.md` | Global | Personal |

**Project commands** go in your repo and are shared with teammates. **Global commands** live in your home directory and work across all projects.

## Built-in Variables

These variables are automatically populated by Claude Code and can be used in your command templates:

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | Everything after the command |
| `$SELECTION` | Currently selected text (IDE) |
| `$FILE` | Current file path |
| `$PROJECT` | Project root path |

Use these to make commands context-aware. For example, `$SELECTION` lets you create commands that operate on highlighted code in your IDE.

## Command Examples

These examples show common patterns for custom commands.

### Commit Message Generator

`.claude/commands/commit.md`:

```markdown
---
description: Generate a commit message for staged changes
---

Analyze the staged git changes and generate a commit message.

Follow these conventions:
- Start with type: feat|fix|docs|style|refactor|test|chore
- Keep first line under 72 characters
- Add body if changes are complex

Output only the commit message, nothing else.
```

### Documentation Generator

`.claude/commands/docs.md`:

```markdown
---
description: Generate documentation for a file
---

Generate comprehensive documentation for $ARGUMENTS.

Include:
- Module overview
- Function/class documentation
- Usage examples
- Parameter descriptions

Match the existing documentation style in this project.
```

### Refactoring Assistant

`.claude/commands/refactor.md`:

```markdown
---
description: Suggest refactoring improvements
---

Analyze $ARGUMENTS and suggest refactoring improvements.

Focus on:
- Reducing complexity
- Improving readability
- Better separation of concerns
- Modern patterns for this language

Don't make changes yet - just provide suggestions.
```

---

# Part 2: Skills

Skills are enhanced commands that live in their own directories. They can include supporting files like templates and examples, and optionally trigger automatically based on natural language patterns.

## Creating a Skill

Skills are defined in a `SKILL.md` file within a named directory:

Create `.claude/skills/pr-review/SKILL.md`:

```markdown
---
name: PR Review
description: Comprehensive pull request review
triggers:
  - "review pr"
  - "review pull request"
  - "check pr"
---

# PR Review Skill

When reviewing a pull request:

1. Fetch the PR diff using GitHub MCP
2. Analyze changes for:
   - Breaking changes
   - Security issues
   - Test coverage
   - Documentation updates

3. Provide structured feedback with:
   - Summary of changes
   - Issues found (critical/warning/info)
   - Suggestions for improvement
```

## Skill Directory Structure

Skills live in their own directories, allowing you to include supporting files:

```
.claude/skills/
├── pr-review/
│   ├── SKILL.md          # Main skill definition
│   ├── templates/        # Optional templates
│   └── examples/         # Example inputs/outputs
└── deploy/
    └── SKILL.md
```

## Auto-Invocation Triggers

Unlike basic commands that require `/commandname`, skills can respond to natural language. The `triggers` field in the frontmatter defines phrases that activate the skill:

```yaml
---
name: Deploy to Staging
description: Deploy current branch to staging environment
triggers:
  - "deploy staging"
  - "push to staging"
  - "deploy to staging"
---
```

With these triggers, typing "deploy to staging" in a conversation will automatically invoke this skill.

## YAML Frontmatter Options

The frontmatter block configures skill metadata:

```yaml
---
name: Deploy to Staging
description: Deploy current branch to staging environment
triggers:
  - "deploy staging"
  - "push to staging"
arguments:
  - name: branch
    description: Branch to deploy
    default: current
---
```

| Field | Purpose |
|-------|---------|
| `name` | Display name for the skill |
| `description` | What the skill does (shown in help) |
| `triggers` | Natural language phrases that invoke the skill |
| `arguments` | Named parameters with descriptions and defaults |

---

## Next Steps

Once you're comfortable with custom commands and skills, you can package them into shareable plugins. See the [Plugins](./plugins.md) page to learn how to create, publish, and install plugins.
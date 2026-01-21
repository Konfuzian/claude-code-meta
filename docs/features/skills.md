---
sidebar_position: 5
---

# Skills & Custom Commands

Create reusable slash commands to automate common tasks.

## What This Page Covers

This page teaches you how to create custom slash commands (called "skills") that extend Claude Code's capabilities. You'll learn to build your own `/review`, `/deploy`, or any other command that fits your workflow.

**Why create custom commands?** Instead of typing the same detailed prompts repeatedly, you define them once as markdown files. Then you just type `/yourcommand` and Claude executes your predefined workflow.

---

## What are Skills?

Skills are custom slash commands defined in markdown files. They let you:

- Create project-specific workflows
- Share commands across teams
- Automate repetitive prompts
- Build complex multi-step processes

---

## Creating Commands

Commands are markdown files that contain prompts Claude will execute. The filename becomes the command name.

### Basic Command

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

### Command with Arguments

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

---

## File Locations

Commands can be stored at two levels, depending on whether you want them shared with your team or personal:

| Location | Scope | Access |
|----------|-------|--------|
| `.claude/commands/*.md` | Project | Team (git-tracked) |
| `~/.claude/commands/*.md` | Global | Personal |

**Project commands** go in your repo and are shared with teammates. **Global commands** live in your home directory and work across all projects.

---

## Advanced: Skills with Auto-Invocation

Skills are enhanced commands that can trigger automatically based on natural language patterns. While basic commands require `/commandname`, skills can respond to phrases like "review this PR" or "deploy to staging".

### Creating a Skill

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

### Skill Structure

Skills live in their own directories, allowing you to include supporting files like templates and examples:

```
.claude/skills/
├── pr-review/
│   ├── SKILL.md          # Main skill definition
│   ├── templates/        # Optional templates
│   └── examples/         # Example inputs/outputs
└── deploy/
    └── SKILL.md
```

---

## YAML Frontmatter

Frontmatter is the YAML block at the top of your command file (between `---` markers). It configures metadata like the command name, description, and trigger phrases.

Configure commands with frontmatter:

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

---

## Built-in Variables

These variables are automatically populated by Claude Code and can be used in your command templates:

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | Everything after the command |
| `$SELECTION` | Currently selected text (IDE) |
| `$FILE` | Current file path |
| `$PROJECT` | Project root path |

Use these to make commands context-aware. For example, `$SELECTION` lets you create commands that operate on highlighted code in your IDE.

---

## Examples

These examples show common patterns for custom commands. Use them as starting points for your own.

### Commit Message Generator

Generates conventional commit messages from your staged changes.

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

Creates comprehensive documentation for any file in your project.

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

Analyzes code and suggests improvements without making changes immediately.

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

## Plugin Marketplace

The plugin marketplace lets you install pre-built commands created by the community, saving you from writing everything yourself.

Install community commands:

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin install commit-helper@marketplace
```

Browse available plugins:

```
/plugin > Discover
```

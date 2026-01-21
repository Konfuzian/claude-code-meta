---
sidebar_position: 5
---

# Skills & Custom Commands

Create reusable slash commands to automate common tasks.

## What are Skills?

Skills are custom slash commands defined in markdown files. They let you:

- Create project-specific workflows
- Share commands across teams
- Automate repetitive prompts
- Build complex multi-step processes

## Creating Commands

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

Use it with `/review`.

### Command with Arguments

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

## File Locations

| Location | Scope | Access |
|----------|-------|--------|
| `.claude/commands/*.md` | Project | Team (git-tracked) |
| `~/.claude/commands/*.md` | Global | Personal |

## Advanced: Skills with Auto-Invocation

Skills are enhanced commands that can trigger automatically.

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

```
.claude/skills/
├── pr-review/
│   ├── SKILL.md          # Main skill definition
│   ├── templates/        # Optional templates
│   └── examples/         # Example inputs/outputs
└── deploy/
    └── SKILL.md
```

## YAML Frontmatter

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

## Built-in Variables

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | Everything after the command |
| `$SELECTION` | Currently selected text (IDE) |
| `$FILE` | Current file path |
| `$PROJECT` | Project root path |

## Examples

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

## Plugin Marketplace

Install community commands:

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin install commit-helper@marketplace
```

Browse available plugins:

```
/plugin > Discover
```

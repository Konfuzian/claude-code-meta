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

---

## Copy-Paste Examples

These ready-to-use examples demonstrate common patterns. Copy them to your `.claude/commands/` or `.claude/skills/` directory.

### Command: Security Review

`.claude/commands/security.md`:

```markdown
---
description: Review code for security vulnerabilities
---

Perform a security review of $ARGUMENTS.

Check for:
1. **Injection vulnerabilities**
   - SQL injection
   - Command injection
   - XSS (Cross-Site Scripting)

2. **Authentication/Authorization issues**
   - Missing auth checks
   - Insecure token handling
   - Privilege escalation paths

3. **Data exposure**
   - Sensitive data in logs
   - Unencrypted secrets
   - Overly permissive API responses

4. **Dependencies**
   - Known vulnerable packages
   - Outdated security patches

Output a structured report with:
- Severity (Critical/High/Medium/Low)
- Location (file:line)
- Description
- Recommended fix
```

Usage: `/security src/auth/` or `/security src/api/users.ts`

### Command: Migration Generator

`.claude/commands/migrate.md`:

```markdown
---
description: Generate a database migration
---

Generate a database migration for: $ARGUMENTS

Follow these conventions:
1. Use the project's migration framework (check for Prisma, Knex, TypeORM, or raw SQL)
2. Include both `up` and `down` migrations
3. Add appropriate indexes for foreign keys
4. Use transactions where supported

Name the migration file with timestamp: YYYYMMDDHHMMSS_description.ts

Before generating, check existing migrations to match the style.
```

Usage: `/migrate add email_verified column to users table`

### Command: Explain Selection

`.claude/commands/explain.md`:

```markdown
---
description: Explain the selected code
---

Explain this code:

$SELECTION

Provide:
1. **Purpose**: What does this code accomplish?
2. **How it works**: Step-by-step explanation
3. **Key concepts**: Any patterns, algorithms, or techniques used
4. **Potential issues**: Edge cases, performance concerns, or bugs
5. **Improvements**: How could this code be better?

Keep explanations clear and suitable for a developer unfamiliar with this codebase.
```

Usage: Select code in IDE, then `/explain`

### Command: API Endpoint Generator

`.claude/commands/endpoint.md`:

```markdown
---
description: Generate a REST API endpoint
---

Create a REST API endpoint for: $ARGUMENTS

Follow these project conventions:
1. Check existing endpoints in this codebase for patterns
2. Include input validation using the project's validation library
3. Add proper error handling with appropriate HTTP status codes
4. Include TypeScript types for request/response
5. Add JSDoc comments for API documentation

Structure:
- Route handler
- Input validation schema
- Service/controller logic
- Response types

If tests exist for other endpoints, create corresponding tests.
```

Usage: `/endpoint GET /api/users/:id - fetch user by ID`

### Skill: PR Review with Templates

`.claude/skills/pr-review/SKILL.md`:

```markdown
---
name: PR Review
description: Comprehensive pull request review with structured output
triggers:
  - "review pr"
  - "review this pr"
  - "check pull request"
---

# PR Review Skill

When reviewing a pull request, follow this structured approach:

## 1. Gather Context

- Fetch the PR diff (use GitHub MCP or git diff)
- Read the PR description
- Identify the affected areas of the codebase

## 2. Review Checklist

### Code Quality
- [ ] Code follows project style guidelines
- [ ] No unnecessary complexity
- [ ] Functions/methods are appropriately sized
- [ ] Naming is clear and consistent

### Functionality
- [ ] Logic is correct
- [ ] Edge cases are handled
- [ ] Error handling is appropriate

### Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] No injection vulnerabilities

### Testing
- [ ] Tests added for new functionality
- [ ] Existing tests still pass
- [ ] Edge cases covered

### Documentation
- [ ] Public APIs documented
- [ ] Complex logic explained
- [ ] README updated if needed

## 3. Output Format

Provide feedback in this structure:

### Summary
Brief overview of the changes and overall assessment.

### Critical Issues 🔴
Issues that must be fixed before merging.

### Suggestions 🟡
Improvements that would make the code better.

### Nitpicks 🟢
Minor style or preference items.

### Questions ❓
Clarifications needed from the author.
```

### Skill: Deploy to Environment

`.claude/skills/deploy/SKILL.md`:

```markdown
---
name: Deploy
description: Deploy current branch to an environment
triggers:
  - "deploy to"
  - "push to staging"
  - "deploy staging"
  - "deploy production"
arguments:
  - name: environment
    description: Target environment (staging, production)
    default: staging
---

# Deploy Skill

Deploy the current branch to the specified environment.

## Pre-flight Checks

Before deploying, verify:
1. All tests pass locally
2. No uncommitted changes
3. Branch is up to date with remote
4. For production: branch is merged to main

## Deployment Steps

### Staging
```bash
# Verify clean state
git status
npm test

# Deploy to staging
npm run deploy:staging
# or
git push origin HEAD:staging
```

### Production
```bash
# Extra verification for production
git checkout main
git pull origin main
npm test
npm run build

# Deploy
npm run deploy:production
```

## Post-deployment

1. Verify deployment succeeded
2. Run smoke tests
3. Monitor error rates for 10 minutes
4. Notify team in Slack (if configured)

## Rollback

If issues are detected:
```bash
npm run rollback:$ENVIRONMENT
# or
git revert HEAD && git push
```
```

### Skill: Debug with Context

`.claude/skills/debug/SKILL.md`:

```markdown
---
name: Debug
description: Systematic debugging assistant
triggers:
  - "debug this"
  - "help me debug"
  - "why is this failing"
---

# Debug Skill

Systematic approach to debugging issues.

## 1. Understand the Problem

Ask clarifying questions:
- What is the expected behavior?
- What is the actual behavior?
- When did this start happening?
- Can you reproduce it consistently?

## 2. Gather Evidence

Collect relevant information:
- Error messages and stack traces
- Recent code changes (`git diff`, `git log`)
- Relevant log output
- Environment details

## 3. Form Hypotheses

Based on evidence, list possible causes ranked by likelihood.

## 4. Test Hypotheses

For each hypothesis:
1. Describe what we're testing
2. Add temporary logging/debugging code
3. Run the scenario
4. Analyze results

## 5. Implement Fix

Once root cause is identified:
1. Implement the minimal fix
2. Verify fix resolves the issue
3. Check for regressions
4. Add tests to prevent recurrence

## 6. Document

Record findings for future reference:
- Root cause
- Solution
- Prevention measures
```

---

## Using Variables Effectively

### $SELECTION for IDE Integration

Commands that operate on selected code:

`.claude/commands/optimize.md`:

```markdown
---
description: Optimize selected code for performance
---

Analyze and optimize this code for performance:

```
$SELECTION
```

Consider:
- Time complexity improvements
- Memory usage
- Unnecessary iterations
- Caching opportunities

Explain each optimization and its impact.
```

### $FILE for Current File Context

`.claude/commands/docstring.md`:

```markdown
---
description: Add documentation to current file
---

Add comprehensive documentation to $FILE.

For each public function/class/method:
- Add JSDoc/docstring with description
- Document parameters and return types
- Include usage examples for complex functions

Match the existing documentation style in this project.
Don't modify private/internal items unless they're complex.
```

### $PROJECT for Project-Wide Operations

`.claude/commands/deps.md`:

```markdown
---
description: Analyze project dependencies
---

Analyze dependencies in $PROJECT.

Report:
1. **Outdated packages** - List packages with newer versions
2. **Security vulnerabilities** - Any known CVEs
3. **Unused dependencies** - Packages not imported anywhere
4. **Duplicate functionality** - Multiple packages doing similar things
5. **Size impact** - Largest dependencies by bundle size

Provide actionable recommendations for each issue found.
```

### Combining Multiple Variables

`.claude/commands/context-review.md`:

```markdown
---
description: Review code with full context
---

Review this code in context:

**Project**: $PROJECT
**File**: $FILE
**Selected code**:
```
$SELECTION
```
**Additional context**: $ARGUMENTS

Provide feedback considering:
- How this code fits into the broader project
- Consistency with patterns used elsewhere
- Potential impact on other parts of the codebase
```

---

## Next Steps

Once you're comfortable with custom commands and skills, you can package them into shareable plugins. See the [Plugins](./plugins.md) page to learn how to create, publish, and install plugins.
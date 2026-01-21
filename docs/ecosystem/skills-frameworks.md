---
sidebar_position: 4
---

# Skills Frameworks

Methodologies and skill collections for effective AI-assisted development.

## superpowers

**An agentic skills framework & software development methodology that works.**

[GitHub](https://github.com/obra/superpowers)

### Overview

superpowers provides a structured approach to AI-assisted development with pre-built skills that handle common development tasks. It emphasizes clear workflows and reproducible results.

### Philosophy

- **Skills as building blocks** — Reusable, composable actions
- **Clear success criteria** — Know when tasks are done
- **Verification built-in** — Every skill includes validation
- **Human in the loop** — AI assists, human decides

### Key Skills

| Skill | Purpose |
|-------|---------|
| `implement` | Write new features with tests |
| `refactor` | Improve code structure |
| `debug` | Diagnose and fix issues |
| `review` | Code review with suggestions |
| `document` | Generate documentation |
| `test` | Write comprehensive tests |

### Usage

```
You: /superpowers implement

Skill: What feature do you want to implement?

You: User authentication with JWT

Skill: I'll implement JWT auth following these steps:
1. Design the auth flow
2. Write tests for expected behavior
3. Implement the feature
4. Verify all tests pass
5. Document the API

[Executes structured workflow]
```

### Why It Works

- Consistent approach to common tasks
- Built-in verification prevents incomplete work
- Clear communication about what's happening
- Easy to customize for your project

---

## get-shit-done

**A lightweight and powerful meta-prompting, context engineering and spec-driven development system by TÂCHES.**

[GitHub](https://github.com/glittercowboy/get-shit-done)

### Overview

get-shit-done focuses on writing clear specifications before implementation. It uses meta-prompting to help you think through requirements before Claude starts coding.

### Core Concepts

#### Spec-Driven Development

Write specs first, code second:

```markdown
# Feature: User Registration

## Inputs
- email: string, required, valid email format
- password: string, required, min 8 chars
- name: string, optional

## Outputs
- Success: { user: User, token: string }
- Error: { code: string, message: string }

## Behavior
1. Validate inputs
2. Check email not already registered
3. Hash password
4. Create user record
5. Generate JWT token
6. Return user and token

## Edge Cases
- Duplicate email → error "EMAIL_EXISTS"
- Invalid email format → error "INVALID_EMAIL"
- Weak password → error "WEAK_PASSWORD"
```

#### Meta-Prompting

The system helps you write better prompts:

```
You: /gsd start

GSD: What are you trying to build?

You: A payment system

GSD: Let's define it clearly:
- What payment providers?
- What payment types?
- What's the happy path?
- What errors need handling?
- What's the data model?

[Guides you through spec creation]
```

### Benefits

- Forces clear thinking before coding
- Reduces back-and-forth iterations
- Creates documentation as a byproduct
- Works with any AI assistant

---

## how-to-ralph-wiggum

**The Ralph Wiggum Technique — the AI development methodology that reduces software costs to less than a fast food worker's wage.**

[GitHub](https://github.com/ghuntley/how-to-ralph-wiggum)

### Overview

The Ralph Wiggum technique is a provocative methodology that maximizes AI agent autonomy while maintaining quality. Named after the Simpsons character, it embraces a "let it run" approach with smart guardrails.

### The Technique

1. **Clear goal definition** — Specific, measurable outcomes
2. **Autonomous execution** — Let the agent work without interruption
3. **Smart exit detection** — Know when the task is actually done
4. **Verification loops** — Tests prove correctness
5. **Iterate if needed** — Fix and re-run until complete

### Key Principles

#### Embrace Autonomy

Don't micromanage. Give Claude:
- Clear objectives
- Success criteria (tests)
- Permission to iterate

#### Cost Efficiency

The methodology claims dramatic cost reduction by:
- Reducing human oversight time
- Letting agents self-correct
- Batching work into complete features

#### Quality Through Tests

Tests are the arbiters of quality:

```
Task: Implement feature X
Done when: All tests pass
Not done when: Any test fails

Claude continues until tests pass.
```

### When to Use

- Well-defined features with clear test cases
- Refactoring with existing test coverage
- Bug fixes with reproducible test cases
- Greenfield features where you can define tests upfront

### When to Be Careful

- Critical systems without test coverage
- Ambiguous requirements
- Complex integrations requiring human judgment
- Security-sensitive code

---

## Comparison

| Framework | Focus | Best For |
|-----------|-------|----------|
| **superpowers** | Structured skills | Repeatable workflows |
| **get-shit-done** | Specifications | Clear requirements |
| **ralph-wiggum** | Autonomy | Defined, testable tasks |

## Combining Approaches

These frameworks complement each other:

1. Use **get-shit-done** to write clear specs
2. Use **superpowers** skills to structure the implementation
3. Use **ralph-wiggum** autonomy for execution

```
# Workflow
1. /gsd spec          → Create clear specification
2. /superpowers plan  → Design implementation approach
3. /ralph run         → Execute autonomously until tests pass
```

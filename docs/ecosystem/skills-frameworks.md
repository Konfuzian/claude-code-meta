---
sidebar_position: 4
---

# Skills Frameworks

Methodologies and skill collections for effective AI-assisted development.

## superpowers

**An agentic skills framework & software development methodology.**

[GitHub](https://github.com/obra/superpowers) | 32k+ stars | Disciplined development

### Overview

superpowers provides a structured approach to AI-assisted development that makes Claude Code more reliable, disciplined, and autonomous. Created by Jesse Vincent (obra), it enables Claude to work "autonomously for a couple hours at a time without deviating from the plan."

The core insight: AI agents can learn reusable capabilities by reading markdown "SKILL.md" files that document specific workflows. These become **mandatory** patterns rather than optional suggestions.

### Key Features

| Feature | Description |
|---------|-------------|
| **14 Built-in Skills** | Brainstorming, planning, TDD, debugging, code review, and more |
| **Mandatory TDD** | Iron Law: "NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST" |
| **Subagent-Driven Development** | Fresh subagents per task with two-stage review |
| **Parallel Agent Dispatch** | Coordinate multiple agents simultaneously |
| **Git Worktrees** | Isolated development branches for parallel work |

### Core Workflow Commands

| Command | Purpose |
|---------|---------|
| `/superpowers:brainstorm` | Interactive design refinement through Socratic questioning |
| `/superpowers:write-plan` | Create detailed implementation plans |
| `/superpowers:execute-plan` | Execute plans in batches with oversight |

### The Seven-Phase Workflow

1. **Design Refinement** — Agent asks clarifying questions before coding
2. **Environment Setup** — Isolated branches, dependency verification
3. **Planning** — Break work into 2-5 minute tasks with exact file paths
4. **Implementation** — Subagent-driven or batch execution
5. **TDD** — Mandatory RED-GREEN-REFACTOR cycles
6. **Code Review** — Work evaluated against original plan
7. **Finalization** — Verify tests, present merge options, cleanup

### TDD Enforcement

The framework enforces strict TDD with the RED-GREEN-REFACTOR cycle:

```
1. RED: Write one failing test (must watch it fail)
2. GREEN: Write minimal code to pass
3. REFACTOR: Clean up while keeping tests green
```

### Installation

```bash
# Register the marketplace
/plugin marketplace add obra/superpowers-marketplace

# Install the plugin
# (Follow marketplace prompts)
```

### When to Use

- Production-quality software requiring discipline
- Projects with existing test infrastructure
- Teams wanting consistent development standards
- Extended autonomous operation needs

### Considerations

- **Strict methodology** — Skills are MANDATORY, not optional
- **Learning curve** — Requires adjustment to structured workflow
- **Test infrastructure required** — TDD enforcement needs testable architecture
- **Time investment upfront** — Brainstorm-plan-execute takes more initial time

---

## get-shit-done

**A lightweight meta-prompting, context engineering and spec-driven development system.**

[GitHub](https://github.com/glittercowboy/get-shit-done) | 5.7k stars | Solo developers

### Overview

get-shit-done (GSD) solves **context rot** — the quality degradation that occurs as Claude fills its context window during development sessions. It uses strategic file management to keep main context at 30-40% utilization while spawning parallel subagents with fresh 200k-token contexts.

**Target User:** Solo developers who rely on Claude Code to write their code.

**Adoption:** Trusted by engineers at Amazon, Google, Shopify, and Webflow.

### Key Features

| Feature | Description |
|---------|-------------|
| **Context Engineering** | Strategic file management at 30-40% context utilization |
| **XML Prompt Formatting** | Precise task structure for unambiguous execution |
| **Multi-Agent Orchestration** | Parallel subagents for research, planning, execution |
| **Atomic Git Commits** | One commit per task for clean history |
| **Session Persistence** | STATE.md maintains context across sessions |
| **Codebase Learning** | Hooks index exports/imports and detect naming conventions |

### Workflow Modes

- **Full Planning Mode** (`/gsd:new-project`) — Complete spec-driven development
- **Quick Mode** (`/gsd:quick`) — Fast ad-hoc tasks with same guarantees
- **Debug Mode** (`/gsd:debug`) — Systematic debugging with persistent state

### The Six-Step Cycle

```
1. INITIALIZE → 2. DISCUSS → 3. PLAN → 4. EXECUTE → 5. VERIFY → 6. COMPLETE
```

**Step 1: Initialize** (`/gsd:new-project`)
- Asks clarifying questions until complete understanding
- Spawns parallel agents for domain research
- Creates: PROJECT.md, REQUIREMENTS.md, ROADMAP.md, STATE.md

**Step 2: Discuss** (`/gsd:discuss-phase N`)
- Captures implementation preferences before planning
- Identifies gray areas (layout choices, API formats, architecture)

**Step 3: Plan** (`/gsd:plan-phase N`)
- Research implementation approach
- Creates 2-3 atomic task plans with XML structure
- Verification loop until plans pass requirements check

**Step 4: Execute** (`/gsd:execute-phase N`)
- Plans run in parallel waves with fresh 200k-token contexts
- Each task gets atomic commit immediately upon completion

**Step 5: Verify** (`/gsd:verify-work N`)
- Extracts testable deliverables
- Manual verification walkthrough
- Failures trigger automatic debugging

**Step 6: Complete** (`/gsd:complete-milestone`)
- Archives and tags release
- `/gsd:new-milestone` starts next version

### XML Task Structure

```xml
<task type="auto">
  <name>Create login endpoint</name>
  <files>src/app/api/auth/login/route.ts</files>
  <action>
    Use jose for JWT (not jsonwebtoken).
    Validate credentials against users table.
    Return httpOnly cookie on success.
  </action>
  <verify>curl -X POST localhost:3000/api/auth/login returns 200</verify>
  <done>Valid credentials return cookie, invalid return 401</done>
</task>
```

### Installation

```bash
npx get-shit-done-cc

# Options
npx get-shit-done-cc --global  # Install to ~/.claude/
npx get-shit-done-cc --local   # Install to ./.claude/
```

### Configuration

Settings in `.planning/config.json`:
- **mode**: `yolo` (auto-approve) or `interactive` (confirm each step)
- **depth**: `quick`, `standard`, or `comprehensive`
- **Model Profiles**: quality (Opus), balanced (Sonnet/Opus mix), budget

### When to Use

- Solo development with Claude Code
- Projects needing clear specifications
- Long sessions where context rot is a concern
- Rapid iteration with quality guarantees

### Considerations

- **Optimized for solo developers** — Not designed for team collaboration
- **Claude Code specific** — Built specifically for Claude Code
- **Requires permission bypasses** — Best with `--dangerously-skip-permissions`
- **Learning curve** — Multiple slash commands to learn

---

## Comparison

| Aspect | superpowers | get-shit-done |
|--------|-------------|---------------|
| **Philosophy** | Disciplined, structured | Context engineering + specs |
| **Core Problem** | Agent reliability & drift | Context rot (quality degradation) |
| **Workflow Phases** | 7 phases | 6 steps |
| **TDD Approach** | Mandatory RED-GREEN-REFACTOR | Optional |
| **Planning Style** | 2-5 minute tasks | XML-structured atomic tasks |
| **Agent Usage** | Subagent with dual-stage review | Parallel subagents, fresh contexts |
| **Human Oversight** | Batch checkpoints | Interactive or YOLO mode |
| **Strictness** | "Skills are MANDATORY" | Flexible with quick mode |
| **Best For** | Production software, teams | Solo developers, rapid iteration |

## When to Use Each

### Use superpowers when:
- Building production-quality software
- You want enforced TDD discipline
- Extended autonomous operation is needed
- Team consistency is important

### Use get-shit-done when:
- You're a solo developer
- Context rot is affecting quality
- You want spec-driven development
- Rapid iteration is the priority

## Combining Approaches

These frameworks can complement each other:

```
1. /gsd:new-project     → Create clear specification
2. /superpowers:plan    → Design implementation with TDD
3. /gsd:execute-phase   → Execute with fresh context agents
```

---
sidebar_position: 2
---

# Agent Orchestrators

Tools for coordinating multiple Claude agents and creating autonomous development workflows.

## claude-flow

**The leading agent orchestration platform for Claude.**

[GitHub](https://github.com/ruvnet/claude-flow) | Multi-agent swarms and workflows

### Overview

claude-flow enables you to deploy intelligent multi-agent swarms, coordinate autonomous workflows, and build conversational AI systems. It's designed for complex tasks that benefit from parallel agent execution.

### Key Features

- **Multi-agent swarms** — Run multiple Claude agents in parallel
- **Workflow coordination** — Define dependencies between agents
- **Memory sharing** — Agents can share context and findings
- **Task decomposition** — Automatically break complex tasks into subtasks

### Use Cases

- Large codebase refactoring with parallel workers
- Research tasks requiring multiple investigation threads
- Building and testing across multiple components
- Comprehensive code reviews from different perspectives

### Quick Start

```bash
npm install -g claude-flow
claude-flow init
claude-flow run "refactor the authentication system"
```

---

## ralph-claude-code

**Autonomous AI development loop with intelligent exit detection.**

[GitHub](https://github.com/frankbria/ralph-claude-code) | Autonomous development loops

### Overview

ralph-claude-code implements the "Ralph Wiggum" technique — an autonomous development loop where Claude continues working until the task is complete, with intelligent detection of when to stop.

### Key Features

- **Continuous execution** — Claude works until done, not just one turn
- **Exit detection** — Intelligently knows when to stop
- **Progress tracking** — Monitors and reports progress
- **Error recovery** — Handles failures gracefully

### Use Cases

- Long-running implementation tasks
- Multi-step refactoring
- Automated feature development
- Bug fixing with verification

### The Pattern

```
1. Start task
2. Claude executes one step
3. Check: Is task complete?
   - No → Continue to next step
   - Yes → Exit with summary
4. Repeat until done
```

---

## awesome-claude-agents

**An orchestrated sub-agent dev team powered by Claude Code.**

[GitHub](https://github.com/vijaythecoder/awesome-claude-agents) | Sub-agent teams

### Overview

awesome-claude-agents provides pre-configured agent teams that work together on development tasks. Each agent has a specialized role, similar to a human dev team.

### Agent Roles

| Agent | Responsibility |
|-------|----------------|
| **Architect** | System design, file structure |
| **Implementer** | Writing code |
| **Tester** | Writing and running tests |
| **Reviewer** | Code review, suggestions |
| **Documenter** | Documentation, comments |

### Use Cases

- Full feature development with built-in review
- Projects requiring multiple perspectives
- Learning how to structure agent teams
- Consistent development workflows

---

## Comparison

| Feature | claude-flow | ralph-claude-code | awesome-claude-agents |
|---------|-------------|-------------------|----------------------|
| **Focus** | Orchestration | Autonomy | Team structure |
| **Multi-agent** | Yes | No | Yes |
| **Auto-continue** | Yes | Yes | Varies |
| **Pre-defined roles** | No | No | Yes |
| **Best for** | Complex workflows | Single tasks | Full development |

## When to Use Each

### Use claude-flow when:
- You need multiple agents working in parallel
- Tasks have clear subtasks that can run independently
- You want fine-grained control over agent coordination

### Use ralph-claude-code when:
- You have a single complex task
- You want Claude to work autonomously until done
- You trust Claude to determine completion

### Use awesome-claude-agents when:
- You want structured team-based development
- You want built-in code review and testing
- You're building features that need multiple perspectives

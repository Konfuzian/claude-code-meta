---
sidebar_position: 1
---

# Ecosystem Overview

The Claude Code ecosystem includes tools, frameworks, and resources built by the community to extend and enhance Claude Code's capabilities.

## Categories

### [Agent Orchestrators](./agent-orchestrators)

Tools for running multiple Claude agents, creating autonomous development loops, and coordinating complex workflows.

- **claude-flow** — Enterprise-grade multi-agent swarm orchestration (54+ agents)
- **ralph-claude-code** — Autonomous development loops with intelligent exit detection

### [Skills Frameworks](./skills-frameworks)

Methodologies and skill collections for effective AI-assisted development.

- **superpowers** — Disciplined development methodology with mandatory TDD
- **get-shit-done** — Context engineering and spec-driven development

### [Safety Tools](./safety-tools)

Plugins and configurations for safer Claude Code usage.

- **claude-code-safety-net** — Semantic command protection against destructive operations
- **everything-claude-code** — Production-ready configs (agents, hooks, MCPs)

### [Awesome Resources](./awesome-resources)

Curated lists and community resources.

- **awesome-claude-code** — Comprehensive resource list

## Quick Comparison

| Tool | Category | Core Focus | Best For |
|------|----------|------------|----------|
| [claude-flow](https://github.com/ruvnet/claude-flow) | Orchestration | Multi-agent swarms | Large codebases, team workflows |
| [ralph-claude-code](https://github.com/frankbria/ralph-claude-code) | Orchestration | Autonomous loops | Overnight automated development |
| [superpowers](https://github.com/obra/superpowers) | Skills | Disciplined methodology | Production-quality software |
| [get-shit-done](https://github.com/glittercowboy/get-shit-done) | Skills | Spec-driven development | Solo developers, rapid iteration |
| [safety-net](https://github.com/kenryu42/claude-code-safety-net) | Safety | Command protection | Preventing destructive operations |
| [everything-claude-code](https://github.com/affaan-m/everything-claude-code) | Configs | Ready-to-use setups | Quick setup with battle-tested configs |

## What Each Tool Does

### Orchestration Tools

**[claude-flow](https://github.com/ruvnet/claude-flow)** — Run many Claude agents working together
- Coordinates 54+ specialized agents (coder, tester, reviewer, etc.)
- Routes tasks to the right agent automatically
- Persists memory across sessions via vector database
- Best for: Large projects needing parallel work streams

**[ralph-claude-code](https://github.com/frankbria/ralph-claude-code)** — Let Claude work autonomously
- Runs Claude in a loop until the task is done
- Detects when Claude is stuck or finished
- Saves progress to git automatically
- Best for: "Set it and forget it" overnight development

### Development Methodologies

**[superpowers](https://github.com/obra/superpowers)** — Strict discipline for quality code
- Requires tests before implementation (TDD)
- Enforces small, focused changes
- Uses subagents for research without polluting context
- Best for: Production software where quality matters

**[get-shit-done](https://github.com/glittercowboy/get-shit-done)** — Spec-first rapid development
- Write specs first, then implement
- Tracks state in STATE.md for context recovery
- Targets 30-40% context usage to stay efficient
- Best for: Solo devs wanting structure without overhead

### Safety & Configuration

**[safety-net](https://github.com/kenryu42/claude-code-safety-net)** — Prevent dangerous commands
- Blocks destructive git operations (force push, hard reset)
- Semantic analysis—understands intent, not just command strings
- Customizable rules for your workflow
- Best for: Everyone (recommended as a baseline)

**[everything-claude-code](https://github.com/affaan-m/everything-claude-code)** — Ready-to-use configs
- 9 pre-configured agents for common tasks
- 15 MCP server integrations
- Battle-tested hooks and workflows
- Best for: Quick setup without configuration from scratch

## Complementary Combinations

These tools work well together:

| Stack | Tools | Use Case |
|-------|-------|----------|
| **Safety First** | safety-net + any other | Always recommended |
| **Structured Solo Dev** | get-shit-done + safety-net | Solo developers wanting structure |
| **Enterprise Team** | claude-flow + safety-net | Large teams, complex codebases |
| **Overnight Builds** | ralph-claude-code + safety-net | Autonomous development |
| **Maximum Discipline** | superpowers + safety-net | Production-quality software |

## Getting Started

1. **New to Claude Code?** Start with the [Getting Started guide](../getting-started/installation)
2. **Want safer operations?** Install [safety-net](./safety-tools) — recommended for everyone
3. **Building complex features?** Try [claude-flow](./agent-orchestrators) for multi-agent coordination
4. **Solo developer?** Try [get-shit-done](./skills-frameworks) for spec-driven development
5. **Want discipline?** Adopt [superpowers](./skills-frameworks) for structured workflows

## Contributing

Know a great Claude Code tool that should be listed here? Open an issue or PR on [GitHub](https://github.com/Konfuzian/claude-code-meta).

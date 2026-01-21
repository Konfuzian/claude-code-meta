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

## Feature Matrix

| Feature | claude-flow | ralph | superpowers | GSD | safety-net | everything-cc |
|---------|:-----------:|:-----:|:-----------:|:---:|:----------:|:-------------:|
| Multi-agent | 54+ | - | subagents | parallel | - | 9 agents |
| Autonomous loops | yes | yes | - | - | - | - |
| TDD enforcement | - | optional | mandatory | - | - | workflow |
| Context management | token routing | - | - | 30-40% target | - | strategies |
| Memory persistence | vector DB | files/git | - | STATE.md | - | MCP memory |
| Git protection | - | - | - | - | yes | - |
| MCP integration | native | - | - | - | - | 15 servers |

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

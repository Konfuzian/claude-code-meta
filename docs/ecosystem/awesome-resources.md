---
sidebar_position: 5
---

# Awesome Resources

Curated lists and community resources for Claude Code.

## What Is This Page?

This page collects resources for learning more about Claude Code and staying up to date with the ecosystem. It includes:

- **Curated lists** — Community-maintained collections of tools and configurations
- **Official resources** — Documentation, repositories, and IDE extensions from Anthropic
- **Learning materials** — Blog posts, tutorials, and guides
- **Community sites** — Places to find help and share knowledge

Use this page as a starting point for exploring beyond the core ecosystem tools documented elsewhere on this site.

---

## awesome-claude-code

**A curated list of awesome skills, hooks, slash-commands, agent orchestrators, applications, and plugins for Claude Code.**

[GitHub](https://github.com/hesreallyhim/awesome-claude-code)

### Overview

The definitive community-maintained list of Claude Code resources. This is the "awesome list" pattern — a curated directory that's regularly updated with new tools, tutorials, and configurations.

If you're looking for something not covered in this documentation, awesome-claude-code is the next place to check.

### Categories Covered

The list organizes resources into these categories:

- **Skills & Commands** — Custom slash commands
- **Hooks** — Event-triggered automations
- **Plugins** — Extended functionality
- **Agent Orchestrators** — Multi-agent coordination
- **MCP Servers** — External integrations
- **Configurations** — CLAUDE.md templates, settings
- **Tutorials** — Learning resources
- **Applications** — Apps built with Claude Code

### How to Use

Here's a practical approach to finding useful tools:

1. **Browse the categories** you're interested in
2. **Check GitHub stars** — higher stars generally indicate more community validation
3. **Review the README** — look for active maintenance, clear documentation, and recent commits
4. **Start small** — install or adapt one thing at a time and evaluate before adding more

---

## awesome-claude-agents

**Supercharge Claude Code with a team of 24 specialized AI agents.**

[GitHub](https://github.com/vijaythecoder/awesome-claude-agents) | Token-intensive | Multi-agent orchestration

### Overview

A collection of specialized agents that work together to build complete features. Unlike generic Claude Code usage, these agents have deep knowledge of specific frameworks (Laravel, Django, Rails, React, Vue).

The agents auto-detect your tech stack by examining project files (package.json, composer.json, etc.) and coordinate appropriate specialists for your technology.

**Warning:** Token-intensive — can consume 10-50k tokens per complex feature. This is a tradeoff for deeper framework expertise.

### Agent Types

Agents are organized into categories based on their role:

| Category | Count | Examples |
|----------|-------|----------|
| **Orchestrators** | 3 | Tech Lead, Project Analyst, Team Configurator |
| **Framework Specialists** | 13 | Laravel, Django, Rails, React, Vue experts |
| **Universal Experts** | 4 | Backend, Frontend, API Architect, Tailwind |
| **Core Team** | 4 | Code Archaeologist, Reviewer, Performance, Docs |

### Framework Coverage

Each framework has dedicated experts who understand idioms, best practices, and common patterns:

| Framework | Agents |
|-----------|--------|
| **Laravel** | Backend Expert, Eloquent Expert |
| **Django** | Backend, API Developer, ORM Expert |
| **Rails** | Backend, API Developer, ActiveRecord |
| **React** | Component Architect, Next.js Expert |
| **Vue** | Component Architect, Nuxt Expert, State Manager |

### Quick Start

Installation involves cloning the repository and symlinking the agents into your Claude configuration:

```bash
# Clone the agent collection
git clone https://github.com/vijaythecoder/awesome-claude-agents.git

# Create the agents directory if it doesn't exist
mkdir -p ~/.claude/agents

# Symlink the agents (so updates to the repo update your agents)
ln -sf "$(pwd)/awesome-claude-agents/agents/" ~/.claude/agents/awesome-claude-agents

# Configure your project — this detects your tech stack
claude "use @agent-team-configurator and optimize my project"

# Start building with framework-aware agents
claude "use @agent-tech-lead-orchestrator and build a user authentication system"
```

### How It Works

The system uses a two-phase approach: first detect what you're working with, then dispatch the right specialists:

1. **@agent-team-configurator** detects your stack (package.json, composer.json, etc.)
2. Updates CLAUDE.md with "AI Team Configuration" section
3. Maps tasks to appropriate specialist agents
4. Orchestrator coordinates multi-agent work

### Considerations

Understand these tradeoffs before adopting:

- **Token Intensive**: 10-50k tokens for complex workflows — can hit usage limits quickly
- **Requires Claude subscription**: Heavy usage patterns aren't sustainable without Pro/API access
- **Stack Detection**: Works best with standard project structures (may miss custom setups)
- **Optional Context7 MCP**: Enhances documentation access with live framework docs

---

## Official Resources

These are Anthropic-maintained resources — the authoritative source for Claude Code information.

### Documentation

Start here for official documentation:

| Resource | Link |
|----------|------|
| Claude Code Docs | [code.claude.com/docs](https://code.claude.com/docs) |
| API Reference | [platform.claude.com/docs](https://platform.claude.com/docs) |
| Agent SDK | [platform.claude.com/docs/agent-sdk](https://platform.claude.com/docs/agent-sdk) |
| MCP Specification | [modelcontextprotocol.io](https://modelcontextprotocol.io) |

### GitHub Repositories

Source code and official implementations:

| Repo | Purpose |
|------|---------|
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | Main Claude Code repo |
| [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action) | GitHub Actions integration |
| [anthropics/claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) | TypeScript Agent SDK |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Official plugins |

### IDE Extensions

Install Claude Code directly in your editor:

| Extension | Link |
|-----------|------|
| VS Code | [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) |
| JetBrains | [plugins.jetbrains.com](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-) |

---

## Community Sites

Community-built resources for learning, sharing, and finding help:

### ClaudeLog

Community documentation, tutorials, and best practices for Claude Code.

[claudelog.com](https://claudelog.com)

### Claude-Hub

50+ curated resources for Claude Code users.

[claude-hub.com](https://www.claude-hub.com)

---

## Learning Resources

These resources help you understand Claude Code patterns and best practices beyond the basic documentation.

### Blog Posts & Articles

In-depth explorations of specific topics:

| Title | Source |
|-------|--------|
| Claude Code Best Practices | [Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-best-practices) |
| Claude Code Sandboxing Deep Dive | [Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-sandboxing) |
| The Creator's Workflow | [VentureBeat](https://venturebeat.com/technology/the-creator-of-claude-code-just-revealed-his-workflow-and-developers-are) |

### Guides & Tutorials

Step-by-step learning resources:

| Guide | Description |
|-------|-------------|
| [Complete Guide](https://www.siddharthbharath.com/claude-code-the-complete-guide/) | Comprehensive walkthrough |
| [Cheat Sheet](https://shipyard.build/blog/claude-code-cheat-sheet/) | Quick reference |

---

## MCP Server Directory

MCP (Model Context Protocol) servers extend Claude Code's capabilities by connecting to external services. Here are some commonly used servers:

| Server | Purpose | Link |
|--------|---------|------|
| GitHub | GitHub API access | [npm](https://www.npmjs.com/package/@anthropic-ai/mcp-server-github) |
| PostgreSQL | Database queries | [npm](https://www.npmjs.com/package/@anthropic-ai/mcp-server-postgres) |
| Puppeteer | Browser automation | [npm](https://www.npmjs.com/package/@anthropic-ai/mcp-server-puppeteer) |
| Slack | Slack integration | [npm](https://www.npmjs.com/package/@anthropic-ai/mcp-server-slack) |

For the complete list of available MCP servers, see the [full directory](https://github.com/modelcontextprotocol/servers).

---

## Contributing

The Claude Code ecosystem grows through community contributions. Here's how to help:

### To awesome-claude-code

1. Fork the repository
2. Add your resource in the appropriate category
3. Include: name, description, link
4. Submit a pull request

### To this site

Found a great resource? [Open an issue](https://github.com/Konfuzian/claude-code-meta/issues) or submit a PR.

---

## Stay Updated

The Claude Code ecosystem evolves rapidly. Here's how to stay current:

- **Watch** the awesome-claude-code repo for new additions
- **Follow** Anthropic's engineering blog for official updates
- **Join** community discussions on GitHub

New tools and patterns emerge frequently as people discover effective ways to use Claude Code.

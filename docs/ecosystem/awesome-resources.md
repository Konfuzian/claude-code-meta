---
sidebar_position: 5
---

# Awesome Resources

Curated lists and community resources for Claude Code.

## awesome-claude-code

**A curated list of awesome skills, hooks, slash-commands, agent orchestrators, applications, and plugins for Claude Code.**

[GitHub](https://github.com/hesreallyhim/awesome-claude-code)

### Overview

The definitive community-maintained list of Claude Code resources. Regularly updated with new tools, tutorials, and configurations.

### Categories Covered

- **Skills & Commands** — Custom slash commands
- **Hooks** — Event-triggered automations
- **Plugins** — Extended functionality
- **Agent Orchestrators** — Multi-agent coordination
- **MCP Servers** — External integrations
- **Configurations** — CLAUDE.md templates, settings
- **Tutorials** — Learning resources
- **Applications** — Apps built with Claude Code

### How to Use

1. Browse the categories you're interested in
2. Check the descriptions and GitHub stars
3. Review the linked repositories
4. Install or adapt what fits your workflow

---

## awesome-claude-agents

**Supercharge Claude Code with a team of 24 specialized AI agents.**

[GitHub](https://github.com/vijaythecoder/awesome-claude-agents) | Token-intensive | Multi-agent orchestration

### Overview

A collection of specialized agents that work together to build complete features. The agents auto-detect your tech stack and coordinate appropriate specialists.

**Warning:** Token-intensive — can consume 10-50k tokens per complex feature.

### Agent Types

| Category | Count | Examples |
|----------|-------|----------|
| **Orchestrators** | 3 | Tech Lead, Project Analyst, Team Configurator |
| **Framework Specialists** | 13 | Laravel, Django, Rails, React, Vue experts |
| **Universal Experts** | 4 | Backend, Frontend, API Architect, Tailwind |
| **Core Team** | 4 | Code Archaeologist, Reviewer, Performance, Docs |

### Framework Coverage

| Framework | Agents |
|-----------|--------|
| **Laravel** | Backend Expert, Eloquent Expert |
| **Django** | Backend, API Developer, ORM Expert |
| **Rails** | Backend, API Developer, ActiveRecord |
| **React** | Component Architect, Next.js Expert |
| **Vue** | Component Architect, Nuxt Expert, State Manager |

### Quick Start

```bash
# Clone and install
git clone https://github.com/vijaythecoder/awesome-claude-agents.git
mkdir -p ~/.claude/agents
ln -sf "$(pwd)/awesome-claude-agents/agents/" ~/.claude/agents/awesome-claude-agents

# Configure your project
claude "use @agent-team-configurator and optimize my project"

# Start building
claude "use @agent-tech-lead-orchestrator and build a user authentication system"
```

### How It Works

1. **@agent-team-configurator** detects your stack (package.json, composer.json, etc.)
2. Updates CLAUDE.md with "AI Team Configuration" section
3. Maps tasks to appropriate specialist agents
4. Orchestrator coordinates multi-agent work

### Considerations

- **Token Intensive**: 10-50k tokens for complex workflows
- **Requires Claude subscription**: Heavy usage
- **Stack Detection**: Works best with standard project structures
- **Optional Context7 MCP**: Enhances documentation access

---

## Official Resources

### Documentation

| Resource | Link |
|----------|------|
| Claude Code Docs | [code.claude.com/docs](https://code.claude.com/docs) |
| API Reference | [platform.claude.com/docs](https://platform.claude.com/docs) |
| Agent SDK | [platform.claude.com/docs/agent-sdk](https://platform.claude.com/docs/agent-sdk) |
| MCP Specification | [modelcontextprotocol.io](https://modelcontextprotocol.io) |

### GitHub Repositories

| Repo | Purpose |
|------|---------|
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | Main Claude Code repo |
| [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action) | GitHub Actions integration |
| [anthropics/claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) | TypeScript Agent SDK |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Official plugins |

### IDE Extensions

| Extension | Link |
|-----------|------|
| VS Code | [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) |
| JetBrains | [plugins.jetbrains.com](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-) |

---

## Community Sites

### ClaudeLog

Community documentation, tutorials, and best practices for Claude Code.

[claudelog.com](https://claudelog.com)

### Claude-Hub

50+ curated resources for Claude Code users.

[claude-hub.com](https://www.claude-hub.com)

---

## Learning Resources

### Blog Posts & Articles

| Title | Source |
|-------|--------|
| Claude Code Best Practices | [Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-best-practices) |
| Claude Code Sandboxing Deep Dive | [Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-sandboxing) |
| The Creator's Workflow | [VentureBeat](https://venturebeat.com/technology/the-creator-of-claude-code-just-revealed-his-workflow-and-developers-are) |

### Guides & Tutorials

| Guide | Description |
|-------|-------------|
| [Complete Guide](https://www.siddharthbharath.com/claude-code-the-complete-guide/) | Comprehensive walkthrough |
| [Cheat Sheet](https://shipyard.build/blog/claude-code-cheat-sheet/) | Quick reference |

---

## MCP Server Directory

Find MCP servers for various integrations:

| Server | Purpose | Link |
|--------|---------|------|
| GitHub | GitHub API access | [npm](https://www.npmjs.com/package/@anthropic-ai/mcp-server-github) |
| PostgreSQL | Database queries | [npm](https://www.npmjs.com/package/@anthropic-ai/mcp-server-postgres) |
| Puppeteer | Browser automation | [npm](https://www.npmjs.com/package/@anthropic-ai/mcp-server-puppeteer) |
| Slack | Slack integration | [npm](https://www.npmjs.com/package/@anthropic-ai/mcp-server-slack) |

Full directory: [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)

---

## Contributing

### To awesome-claude-code

1. Fork the repository
2. Add your resource in the appropriate category
3. Include: name, description, link
4. Submit a pull request

### To this site

Found a great resource? [Open an issue](https://github.com/Konfuzian/claude-code-meta/issues) or submit a PR.

---

## Stay Updated

- **Watch** the awesome-claude-code repo for new additions
- **Follow** Anthropic's engineering blog for official updates
- **Join** community discussions on GitHub

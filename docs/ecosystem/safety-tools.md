---
sidebar_position: 3
---

# Safety Tools

Plugins and configurations to make Claude Code usage safer and more controlled.

## Why Safety Tools Matter

When you give an AI agent permission to run commands on your system, you're trusting it to make good decisions. While Claude Code has built-in protections, additional safety layers provide defense in depth:

- **Prevent accidents**: Even well-intentioned commands can have unintended consequences
- **Catch edge cases**: Pattern matching can miss creative command constructions
- **Add peace of mind**: Extra protection lets you use Claude Code more confidently
- **Protect against prompt injection**: Malicious content in files could trick Claude into running harmful commands

This page covers tools that add protection (safety-net) and provide battle-tested configurations (everything-claude-code).

---

## claude-code-safety-net

**Semantic command protection against destructive operations.**

[GitHub](https://github.com/kenryu42/claude-code-safety-net) | PreToolUse hook | Git & filesystem protection

### Overview

claude-code-safety-net acts as a protective layer against destructive commands executed by AI agents. It operates at the **PreToolUse hook level** (before permission checks), providing semantic command analysis that understands the intent behind commands rather than just pattern matching.

**The Problem:** While Claude Code has built-in permission deny rules, these use simple prefix matching that can be bypassed through flag reordering, variable substitution, shell wrappers, or interpreter one-liners.

For example, a deny rule for `rm -rf /` won't catch:
- `rm -r -f /`
- `sudo rm -rf /`
- `sh -c "rm -rf /"`
- `python -c "import shutil; shutil.rmtree('/')"`

**The Solution:** Safety Net intercepts and blocks dangerous operations before they execute, acting as a fail-safe layer even when permission rules are misconfigured. It understands command *intent*, not just syntax.

### Protected Operations

These categories of commands are blocked by default. Understanding what's protected helps you know what risks are mitigated:

| Category | Blocked Commands |
|----------|------------------|
| **Git Destructive** | `git checkout -- <files>`, `git reset --hard`, `git clean -f`, `git push --force`, `git branch -D` |
| **Stash Operations** | `git stash drop`, `git stash clear` |
| **Filesystem** | `rm -rf` outside temp/working directories, `find -delete` chains |
| **Advanced** | Shell-wrapped commands, interpreter one-liners (Python/Node), piped destructive commands |

### Safe Operations (Allowed)

Not everything is blocked — safety-net allows operations that are typically safe. Understanding the distinction helps you work effectively:

- Creating branches: `git checkout -b new-branch`
- Staging/unstaging: `git restore --staged`
- Safe branch deletion: `git branch -d` (with merge check)
- Operations in temp directories
- `rm -rf ./local-folder` within working directory (default mode)

### How It Works

Understanding the analysis pipeline helps you debug false positives and write effective custom rules:

```
1. Receives JSON via PreToolUse hook: { tool_name, tool_input }
2. Splits Bash commands on shell operators (; && |)
3. Recursively strips wrappers (sudo, env, sh -c) up to 5 levels
4. Dispatches to specialized analyzers:
   - git_analyzer: git operations
   - rm_analyzer: file deletion
   - find_analyzer: find -delete chains
   - interpreter_analyzer: python/node one-liners
5. Checks custom rules from config
6. Returns { permissionDecision: "allow" | "deny", reason }
```

### Operating Modes

Safety-net provides multiple protection levels. Choose based on your risk tolerance and environment:

| Mode | Environment Variable | Behavior |
|------|---------------------|----------|
| **Default** | None | Blocks known destructive patterns |
| **Strict** | `SAFETY_NET_STRICT=1` | Fails closed on unparseable commands |
| **Paranoid** | `SAFETY_NET_PARANOID=1` | Enables all paranoid checks |
| **Paranoid RM** | `SAFETY_NET_PARANOID_RM=1` | Blocks `rm -rf` even within cwd |
| **Paranoid Interpreters** | `SAFETY_NET_PARANOID_INTERPRETERS=1` | Blocks Python/Node one-liners |

**Which mode to choose?**
- Start with **Default** for most use cases
- Use **Strict** if you're working with untrusted codebases
- Use **Paranoid** modes when the cost of mistakes is very high

### Installation

Multiple installation methods are available depending on your environment:

**Claude Code (via npm):**
```bash
npm install -g cc-safety-net
npx cc-safety-net doctor  # Verify installation
```

**Claude Code (via marketplace):**
```bash
/plugin marketplace add kenryu42/cc-marketplace
/plugin install safety-net@cc-marketplace
```

**OpenCode:**
```json
// ~/.config/opencode/opencode.json
{
  "plugin": ["cc-safety-net"]
}
```

**Gemini CLI:**
```bash
gemini extensions install https://github.com/kenryu42/gemini-safety-net
```

### Custom Rules

You can add project-specific blocking rules for operations specific to your environment. Rules are defined in `.safety-net.json` (project-level) or `~/.cc-safety-net/config.json` (global):

```json
{
  "rules": [
    {
      "pattern": "DROP TABLE",
      "action": "block",
      "reason": "Destructive database operation"
    }
  ]
}
```

Rules are **additive** — custom rules extend the built-in protections but cannot bypass them. This is intentional: you can make it stricter, but not weaker.

### Verification

After installation, verify safety-net is working correctly:

```bash
npx cc-safety-net doctor
```

### Why Better Than Built-in Protection

Understanding these advantages helps you appreciate why an extra layer is valuable:

- **Semantic Analysis**: Understands command intent, not just patterns
- **Wrapper Detection**: Recursively analyzes wrapped commands (5 levels deep)
- **PreToolUse Hook**: Runs before permission system as a fallback layer
- **Context Awareness**: Distinguishes safe vs dangerous variants (e.g., `git branch -d` vs `git branch -D`)

### Considerations

Be aware of these limitations:

- **Not a Sandbox**: Does not provide OS-level filesystem isolation
- **False Positives in Strict Mode**: May block legitimate commands if unparseable
- **Complementary to Sandboxing**: Use with OS-level sandboxing for defense in depth
- **Platform Support**: Claude Code, OpenCode, Gemini CLI

---

## everything-claude-code

**Complete configuration collection from an Anthropic hackathon winner.**

[GitHub](https://github.com/affaan-m/everything-claude-code) | 10+ months of production use

### Overview

While safety-net focuses on protection, everything-claude-code provides a complete toolkit of configurations. It's a production-ready collection developed through intensive daily use building real products.

Think of it as "batteries included" for Claude Code — agents, skills, hooks, commands, and MCP setups that someone else has already debugged and refined.

**Credibility:** Created by the winner of the Anthropic x Forum Ventures hackathon, who built zenith.chat entirely with Claude Code.

### What's Included

Here's what you get when you install everything-claude-code. Each component serves a specific purpose:

| Category | Count | Description |
|----------|-------|-------------|
| **Agents** | 9 | Specialized subagents for different tasks |
| **Skills** | 7+ | Domain knowledge and workflows |
| **Commands** | 10 | Slash commands for rapid workflow execution |
| **Rules** | 8 | Always-enforced guidelines |
| **Hooks** | 10+ | Pre/post tool automations |
| **MCP Servers** | 15 | External service integrations |

### Specialized Agents

These agents are subagent definitions that Claude can invoke for specialized tasks:

| Agent | Purpose |
|-------|---------|
| `planner.md` | Feature implementation planning |
| `architect.md` | System design decisions |
| `tdd-guide.md` | Test-driven development |
| `code-reviewer.md` | Code quality assessment |
| `security-reviewer.md` | Vulnerability analysis |
| `build-error-resolver.md` | Build failure diagnosis |
| `e2e-runner.md` | Playwright end-to-end tests |
| `refactor-cleaner.md` | Dead code elimination |
| `doc-updater.md` | Documentation sync |

### Slash Commands

Ready-to-use commands that trigger specific workflows:

| Command | Purpose |
|---------|---------|
| `/tdd` | Test-driven development workflow |
| `/plan` | Create implementation plans |
| `/e2e` | Generate end-to-end tests |
| `/code-review` | Execute quality reviews |
| `/build-fix` | Diagnose build errors |
| `/refactor-clean` | Remove dead code |
| `/learn` | Extract patterns mid-session |
| `/test-coverage` | Manage coverage analysis |
| `/update-codemaps` | Update code mapping |
| `/update-docs` | Maintain documentation |

### MCP Server Configurations

Pre-configured MCP servers for common external services. These save you from writing the configuration yourself:

| Server | Service |
|--------|---------|
| `github` | GitHub operations (PRs, issues, repos) |
| `supabase` | Supabase database operations |
| `memory` | Persistent memory across sessions |
| `vercel` | Vercel deployments |
| `railway` | Railway deployments |
| `cloudflare-*` | Cloudflare Workers, docs, observability |
| `clickhouse` | ClickHouse analytics |
| `context7` | Live documentation lookup |
| `filesystem` | Filesystem operations |

### Hooks

Hooks run automatically in response to Claude Code events. These are organized by when they trigger:

**PreToolUse** — Runs before a tool is used (can block operations):
- Dev Server Restriction — Blocks dev servers not in tmux
- Long-Running Command Reminder — Suggests tmux
- Git Push Review Gate — Manual confirmation before push
- Compaction Suggestion — Suggests context compaction

**PostToolUse** — Runs after a tool completes (for cleanup or validation):
- PR Creation Logging — Logs PR URL and Actions status
- JS/TS Formatting — Auto-runs Prettier
- TypeScript Validation — Type checking after edits
- Console.log Detection — Warns about debug statements

**Stop Hooks** — Runs when a session ends:
- Session State Persistence — Preserves context for future sessions
- Session Evaluation — Runs continuous learning analysis

### Installation

Installation requires manual file copying — you selectively adopt what you need:

```bash
# Clone repository
git clone https://github.com/affaan-m/everything-claude-code

# Copy configurations
cp everything-claude-code/agents/*.md ~/.claude/agents/
cp everything-claude-code/rules/*.md ~/.claude/rules/
cp everything-claude-code/commands/*.md ~/.claude/commands/
cp -r everything-claude-code/skills/* ~/.claude/skills/

# Configure MCP servers in ~/.claude.json
# Replace YOUR_*_HERE placeholders with API keys
```

### Considerations

Important tradeoffs to understand before adopting:

- **Context Window**: Enabling too many MCPs shrinks 200k context to ~70k (MCP definitions consume tokens)
- **Recommendation**: Maintain 20-30 MCPs configured, enable &lt;10 per project
- **API Keys Required**: MCP servers need valid credentials
- **Selective Adoption**: Evaluate and adapt to your specific stack
- **Not Plug-and-Play**: Customization required for your workflow

---

## Comparison

These tools serve different purposes and can be used together:

| Aspect | safety-net | everything-claude-code |
|--------|------------|------------------------|
| **Purpose** | Prevent destructive commands | Extend capabilities |
| **Mechanism** | PreToolUse semantic analysis | Configuration files |
| **Scope** | Git + filesystem protection | Full workflow extension |
| **Extensibility** | Custom blocking rules | Modular adoption |
| **Complexity** | Low (single-purpose) | Medium (many components) |

## Building Your Own Safety Layer

If you prefer to build your own safety configuration rather than using safety-net, start with these foundations.

### Essential Deny Rules

These deny rules should be in every project's settings. They catch the most dangerous operations:

```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf /)",
      "Bash(rm -rf ~)",
      "Bash(sudo *)",
      "Bash(git push --force origin main)",
      "Bash(git push --force origin master)",
      "Write(.env)",
      "Write(*.pem)",
      "Write(*credentials*)"
    ]
  }
}
```

### Recommended Stack

For defense in depth, layer these protections:

1. **safety-net** for semantic command protection
2. **OS-level sandboxing** for filesystem isolation
3. **Selective everything-claude-code configs** for productivity
4. **Custom deny rules** for project-specific protection

---
sidebar_position: 3
---

# Safety Tools

Plugins and configurations to make Claude Code usage safer and more controlled.

## claude-code-safety-net

**Semantic command protection against destructive operations.**

[GitHub](https://github.com/kenryu42/claude-code-safety-net) | PreToolUse hook | Git & filesystem protection

### Overview

claude-code-safety-net acts as a protective layer against destructive commands executed by AI agents. It operates at the **PreToolUse hook level** (before permission checks), providing semantic command analysis that understands the intent behind commands rather than just pattern matching.

**The Problem:** While Claude Code has built-in permission deny rules, these use simple prefix matching that can be bypassed through flag reordering, variable substitution, shell wrappers, or interpreter one-liners.

**The Solution:** Safety Net intercepts and blocks dangerous operations before they execute, acting as a fail-safe layer even when permission rules are misconfigured.

### Protected Operations

| Category | Blocked Commands |
|----------|------------------|
| **Git Destructive** | `git checkout -- <files>`, `git reset --hard`, `git clean -f`, `git push --force`, `git branch -D` |
| **Stash Operations** | `git stash drop`, `git stash clear` |
| **Filesystem** | `rm -rf` outside temp/working directories, `find -delete` chains |
| **Advanced** | Shell-wrapped commands, interpreter one-liners (Python/Node), piped destructive commands |

### Safe Operations (Allowed)

- Creating branches: `git checkout -b new-branch`
- Staging/unstaging: `git restore --staged`
- Safe branch deletion: `git branch -d` (with merge check)
- Operations in temp directories
- `rm -rf ./local-folder` within working directory (default mode)

### How It Works

```
1. Receives JSON input containing tool_name and tool_input
2. For Bash commands, splits on shell operators (;, &&, |)
3. Tokenizes segments and strips wrappers (sudo, env, etc.)
4. Dispatches to specialized analyzers (git, rm, find, interpreters)
5. Checks custom rules if configured
6. Outputs permissionDecision: "deny" to block unsafe operations
```

### Operating Modes

| Mode | Environment Variable | Behavior |
|------|---------------------|----------|
| **Default** | None | Blocks known destructive patterns |
| **Strict** | `SAFETY_NET_STRICT=1` | Fails closed on unparseable commands |
| **Paranoid** | `SAFETY_NET_PARANOID=1` | Enables all paranoid checks |
| **Paranoid RM** | `SAFETY_NET_PARANOID_RM=1` | Blocks `rm -rf` even within cwd |
| **Paranoid Interpreters** | `SAFETY_NET_PARANOID_INTERPRETERS=1` | Blocks Python/Node one-liners |

### Installation

**Claude Code:**
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

Add project-specific blocking rules via `.safety-net.json` or `~/.cc-safety-net/config.json`:

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

Rules are **additive** — custom rules cannot bypass built-in protections.

### Verification

```bash
npx cc-safety-net doctor
```

### Why Better Than Built-in Protection

- **Semantic Analysis**: Understands command intent, not just patterns
- **Wrapper Detection**: Recursively analyzes wrapped commands (5 levels deep)
- **PreToolUse Hook**: Runs before permission system as a fallback layer
- **Context Awareness**: Distinguishes safe vs dangerous variants

### Considerations

- **Not a Sandbox**: Does not provide OS-level filesystem isolation
- **False Positives in Strict Mode**: May block legitimate commands if unparseable
- **Complementary to Sandboxing**: Use with OS-level sandboxing for defense in depth
- **Platform Support**: Claude Code, OpenCode, Gemini CLI

---

## everything-claude-code

**Complete configuration collection from an Anthropic hackathon winner.**

[GitHub](https://github.com/affaan-m/everything-claude-code) | 10+ months of production use

### Overview

everything-claude-code is a production-ready collection of configurations developed through intensive daily use building real products. It provides agents, skills, hooks, commands, and MCP setups as a comprehensive toolkit.

**Credibility:** Created by the winner of the Anthropic x Forum Ventures hackathon, who built zenith.chat entirely with Claude Code.

### What's Included

| Category | Count | Description |
|----------|-------|-------------|
| **Agents** | 9 | Specialized subagents for different tasks |
| **Skills** | 7+ | Domain knowledge and workflows |
| **Commands** | 10 | Slash commands for rapid workflow execution |
| **Rules** | 8 | Always-enforced guidelines |
| **Hooks** | 10+ | Pre/post tool automations |
| **MCP Servers** | 15 | External service integrations |

### Specialized Agents

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

**PreToolUse:**
- Dev Server Restriction — Blocks dev servers not in tmux
- Long-Running Command Reminder — Suggests tmux
- Git Push Review Gate — Manual confirmation before push
- Compaction Suggestion — Suggests context compaction

**PostToolUse:**
- PR Creation Logging — Logs PR URL and Actions status
- JS/TS Formatting — Auto-runs Prettier
- TypeScript Validation — Type checking after edits
- Console.log Detection — Warns about debug statements

**Stop Hooks:**
- Session State Persistence — Preserves context for future sessions
- Session Evaluation — Runs continuous learning analysis

### Installation

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

- **Context Window**: Enabling too many MCPs shrinks 200k context to ~70k
- **Recommendation**: Maintain 20-30 MCPs configured, enable &lt;10 per project
- **API Keys Required**: MCP servers need valid credentials
- **Selective Adoption**: Evaluate and adapt to your specific stack
- **Not Plug-and-Play**: Customization required for your workflow

---

## Comparison

| Aspect | safety-net | everything-claude-code |
|--------|------------|------------------------|
| **Purpose** | Prevent destructive commands | Extend capabilities |
| **Mechanism** | PreToolUse semantic analysis | Configuration files |
| **Scope** | Git + filesystem protection | Full workflow extension |
| **Extensibility** | Custom blocking rules | Modular adoption |
| **Complexity** | Low (single-purpose) | Medium (many components) |

## Building Your Own Safety Layer

### Essential Deny Rules

Start with these in every project:

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

For maximum safety, combine:

1. **safety-net** for semantic command protection
2. **OS-level sandboxing** for filesystem isolation
3. **Selective everything-claude-code configs** for productivity
4. **Custom deny rules** for project-specific protection

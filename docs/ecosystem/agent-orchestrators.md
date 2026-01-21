---
sidebar_position: 2
---

# Agent Orchestrators

Tools for coordinating multiple Claude agents and creating autonomous development workflows.

## claude-flow

**Enterprise-grade multi-agent AI orchestration platform.**

[GitHub](https://github.com/ruvnet/claude-flow) | 54+ specialized agents | Multi-agent swarms

### Overview

claude-flow transforms Claude Code from a single-agent assistant into a coordinated multi-agent development platform. It enables deploying intelligent multi-agent swarms with self-learning neural capabilities.

### Key Features

| Feature | Description |
|---------|-------------|
| **54+ Specialized Agents** | Coder, tester, reviewer, architect, security-auditor, performance-engineer, and more |
| **Swarm Topologies** | Hierarchical (queen-led), mesh networks, ring/star, adaptive hybrid |
| **Self-Learning (RuVector)** | SONA neural architecture with <0.05ms adaptation |
| **Memory & Persistence** | Vector database with PostgreSQL, cross-session context restoration |
| **Multi-Provider LLM** | Claude, GPT, Gemini, Cohere, Ollama with automatic failover |
| **Three-Tier Routing** | Agent Booster (WASM) → Haiku → Sonnet/Opus based on task complexity |

### Agent Classifications

| Type | Role |
|------|------|
| **Coordinators** | Queens that manage and delegate work |
| **Developers** | Code implementation specialists |
| **Testers** | Test writing and execution |
| **Analyzers** | Code analysis and metrics |
| **Security** | Vulnerability scanning, CVE remediation |
| **Synchronizers** | Cross-agent coordination |
| **Specialists** | Domain-specific expertise |

### Coordination Mechanisms

- **Consensus Algorithms**: Majority voting, weighted voting (Queen 3x influence), Byzantine Fault Tolerant, Raft
- **Anti-Drift Safeguards**: Single coordinator enforces alignment, max 8 agents recommended
- **Background Workers**: 12 context-triggered workers auto-dispatch on file changes, pattern detection, session events

### Quick Start

```bash
# Install claude-flow v3
npm install claude-flow@v3alpha

# Initialize the project
npx claude-flow@v3alpha init

# Add as MCP server
claude mcp add claude-flow -- npx -y claude-flow@v3alpha

# Start MCP server
npx claude-flow@v3alpha mcp start
```

### When to Use

- Large codebase refactoring with parallel workers
- Research tasks requiring multiple investigation threads
- Building and testing across multiple components
- Complex workflows needing agent coordination
- Teams wanting to scale AI-assisted development

### Considerations

- Highest complexity among ecosystem tools (250k+ lines)
- Requires Claude Code as foundational layer
- v3alpha is pre-release — stability improvements ongoing
- PostgreSQL recommended for optimal RuVector performance
- Max 8 agents recommended to reduce coordination overhead

---

## ralph-claude-code

**Autonomous AI development loop with intelligent exit detection.**

[GitHub](https://github.com/frankbria/ralph-claude-code) | Autonomous loops | Walk-away development

### Overview

ralph-claude-code implements the "Ralph Wiggum" technique — an autonomous development loop where Claude continues working until the task is complete. Named after Geoffrey Huntley's technique (itself named after the Simpsons character), it enables "walk away" development.

**Real-World Results:**
- 6 repositories generated overnight in Y Combinator hackathon testing
- $50k contract completed for $297 in API costs
- Entire programming language created over 3 months

### Key Features

| Feature | Description |
|---------|-------------|
| **Dual-Condition Exit Gate** | Requires BOTH heuristic completion indicators (≥2) AND explicit `EXIT_SIGNAL: true` |
| **Rate Limiting** | 100 API calls/hour (configurable), automatic hourly resets |
| **Circuit Breaker** | Opens after 3 loops with no progress or 5 loops with repeated errors |
| **Session Continuity** | 24-hour session persistence via `--continue` flag |
| **Live Monitoring** | tmux-based real-time dashboard |
| **Multi-Format Import** | Markdown, Text, JSON, Word (.docx), PDF specifications |

### The Loop Pattern

```
while true:
  increment loop_count
  check circuit_breaker → halt if open
  check rate_limits → wait if exceeded
  check exit_conditions → break if triggered
  execute_claude_code
  handle results → sleep/retry/break
```

### Exit Detection

The system uses multi-condition exit strategy:

1. **Test Saturation**: 3+ consecutive test-focused loops
2. **Completion Signals**: Multiple "done" indicators (2+ detected)
3. **Strong Completion**: All checklist items marked complete AND explicit EXIT_SIGNAL
4. **Plan Completion**: All items in task plan marked done

### Quick Start

```bash
# System installation
git clone https://github.com/frankbria/ralph-claude-code.git
cd ralph-claude-code
./install.sh

# Per-project setup
ralph-import requirements.md my-project
cd my-project
ralph --monitor
```

### Project Structure

```
my-project/
├── .ralph/                 # Configuration folder
│   ├── PROMPT.md          # Development instructions
│   ├── @fix_plan.md       # Prioritized tasks
│   ├── @AGENT.md          # Build/run instructions
│   ├── specs/             # Specifications
│   └── logs/              # Execution logs
└── src/                   # Source code
```

### When to Use

- Long-running implementation tasks
- Multi-step refactoring with clear completion criteria
- Automated overnight feature development
- Bug fixing with verification tests

### When NOT to Use

- Tasks requiring human judgment or design decisions
- One-shot operations that don't benefit from iteration
- Tasks with unclear success criteria
- Production debugging (use targeted debugging instead)

### Considerations

- **Cost**: A 50-iteration loop can cost $50-100+ depending on context size
- **API Limits**: Claude's 5-hour limit triggers user prompts
- **Session Expiration**: Default 24-hour expiration on continuity
- **Clear Completion Criteria**: Essential for successful loops

---

## Comparison

| Aspect | claude-flow | ralph-claude-code |
|--------|-------------|-------------------|
| **Architecture** | 54+ agents in swarm topologies | Single-agent autonomous loop |
| **Scale** | Enterprise, multi-agent | Solo developer, iterative |
| **Agent Model** | Hierarchical queens + workers | Self-referential feedback loop |
| **Learning** | RuVector neural architecture | Session persistence via files/git |
| **Coordination** | 5 consensus algorithms | Circuit breaker + rate limiting |
| **Complexity** | High (250k+ lines, WASM) | Medium (shell scripts + hooks) |
| **Best For** | Large codebases, teams | Overnight automated development |

## When to Use Each

### Use claude-flow when:
- You need multiple agents working in parallel
- Tasks have clear subtasks that can run independently
- You want fine-grained control over agent coordination
- Working on enterprise-scale codebases

### Use ralph-claude-code when:
- You have a single complex task with clear completion criteria
- You want Claude to work autonomously until done
- You trust the loop to self-correct through iteration
- Overnight "walk away" development is acceptable

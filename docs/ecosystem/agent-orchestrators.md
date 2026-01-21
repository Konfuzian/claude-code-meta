---
sidebar_position: 2
---

# Agent Orchestrators

Tools for coordinating multiple Claude agents and creating autonomous development workflows.

## claude-flow

**Enterprise-grade multi-agent AI orchestration platform (v3).**

[GitHub](https://github.com/ruvnet/claude-flow) | 54+ specialized agents | Multi-agent swarms | Self-learning

### Overview

Claude-Flow v3 is a comprehensive AI agent orchestration framework that transforms Claude Code into a multi-agent development platform. It coordinates specialized AI agents working together on complex software engineering tasks with self-learning capabilities and fault-tolerant consensus.

**Key Stats:**
- 84.8% SWE-Bench solve rate
- 2.8-4.4x faster task completion
- Supports Claude, GPT, Gemini, Cohere, Ollama with automatic failover

### Key Features

| Feature | Description |
|---------|-------------|
| **54+ Specialized Agents** | Coder, tester, reviewer, architect, security-auditor, optimizer, documenter, and more |
| **Swarm Topologies** | Hierarchical (queen-led), mesh, ring, star — configurable |
| **Hive Mind** | Strategic/Tactical/Adaptive queens coordinate 8 worker types |
| **Self-Learning (RuVector)** | SONA neural architecture with &lt;0.05ms adaptation, 150x-12,500x faster retrieval |
| **Consensus Algorithms** | Majority voting, weighted (Queen 3x), Byzantine Fault Tolerant (f &lt; n/3), Raft, Gossip |
| **Memory & Persistence** | HNSW vector memory, AgentDB, SQLite with WAL, LRU cache |
| **Multi-Provider LLM** | Claude, GPT, Gemini, Cohere, Ollama — automatic failover and cost-based routing |
| **Three-Tier Routing** | Agent Booster (WASM, &lt;1ms) → Haiku/Sonnet (~500ms) → Opus+Swarm (2-5s) |
| **Background Workers** | 12 context-triggered workers auto-dispatch on file changes and patterns |

### Architecture

```
User → Claude-Flow (CLI/MCP) → Router → Swarm → Agents → Memory → LLM Providers
                       ↑                          ↓
                       └──── Learning Loop ←──────┘
```

### Queen Types & Workers

| Queen Type | Role |
|-----------|------|
| **Strategic** | High-level planning and coordination |
| **Tactical** | Execution management |
| **Adaptive** | Optimization and learning |

| Worker Type | Role |
|-------------|------|
| Researcher | Investigation and analysis |
| Coder | Code implementation |
| Tester | Test writing and validation |
| Reviewer | Code quality checks |
| Architect | System design |
| Analyst | Metrics and analysis |
| Optimizer | Performance tuning |
| Documenter | Documentation |

### Coordination Mechanisms

- **Consensus**: Majority, Weighted (Queen 3x), Byzantine (f &lt; n/3), Raft, Gossip, CRDT
- **Anti-Drift**: Single coordinator enforces alignment, max 8 agents recommended
- **Collective Memory**: Shared knowledge base with LRU cache and SQLite persistence

### Quick Start

```bash
# Install (requires Node.js 18+ or Bun 1.0+)
npm install claude-flow@v3alpha

# Initialize
npx claude-flow@v3alpha init

# Add as MCP server
claude mcp add claude-flow -- npx -y claude-flow@v3alpha

# Start MCP server
npx claude-flow@v3alpha mcp start
```

### Typical Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│  1. INITIALIZE SWARM                                            │
│     npx claude-flow@v3alpha init                                │
│     → Creates config files and agent definitions                │
│     → Sets up memory persistence (SQLite or PostgreSQL)         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  2. DEFINE TASK                                                 │
│     In Claude Code with MCP connected:                          │
│     "Refactor the authentication module to use JWT"             │
│     → Strategic Queen analyzes and breaks down task             │
│     → Identifies required specialists (Coder, Tester, Security) │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  3. SWARM EXECUTION                                             │
│     Queen dispatches workers:                                   │
│       → Researcher: Analyzes existing auth code                 │
│       → Architect: Designs JWT integration                      │
│       → Coder(s): Implement changes in parallel                 │
│       → Tester: Writes and runs tests                           │
│       → Reviewer: Quality checks                                │
│     Workers coordinate via consensus algorithms                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  4. LEARNING & MEMORY                                           │
│     → RuVector stores patterns from successful execution        │
│     → Future similar tasks benefit from learned patterns        │
│     → Memory persists across sessions                           │
└─────────────────────────────────────────────────────────────────┘
```

**Single-task example:**
```bash
# In Claude Code with MCP:
"Use claude-flow to analyze security vulnerabilities in src/auth/"
# → Queen dispatches Security agent + Analyst for comprehensive review
```

**Multi-agent parallel work:**
```bash
"Use claude-flow to refactor the entire API layer - routes, controllers, and tests"
# → Queen coordinates Coder, Tester, Documenter working in parallel
# → Consensus ensures no conflicts
```

### Cost Optimization

Smart routing can extend Claude Code subscription by ~250%:

| Task Complexity | Handler | Speed | Cost |
|-----------------|---------|-------|------|
| Simple | Agent Booster (WASM) | &lt;1ms | Free |
| Medium | Haiku/Sonnet | ~500ms | Low |
| Complex | Opus + Swarm | 2-5s | Standard |

### When to Use

- Large codebase refactoring with parallel workers
- Research tasks requiring multiple investigation threads
- Building and testing across multiple components
- Complex workflows needing agent coordination
- Teams wanting to scale AI-assisted development
- Multi-provider environments needing automatic failover

### Considerations

- Highest complexity among ecosystem tools (8,600+ files)
- Requires Claude Code as foundational layer
- v3alpha is pre-release — stability improvements ongoing
- PostgreSQL recommended for optimal RuVector performance
- Max 8 agents recommended to reduce coordination overhead

---

## ralph-claude-code

**Autonomous AI development loop with intelligent exit detection (v0.10.0).**

[GitHub](https://github.com/frankbria/ralph-claude-code) | Autonomous loops | Walk-away development | 308 tests

### Overview

ralph-claude-code implements the "Ralph Wiggum" technique — an autonomous development loop where Claude continues working until the task is complete. Named after Geoffrey Huntley's technique (itself named after the Simpsons character), it enables "walk away" development.

**The Core Loop:**
```bash
while :; do cat PROMPT.md | claude ; done
```

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
| **Live Monitoring** | tmux-based real-time dashboard (`ralph --monitor`) |
| **PRD Import** | Convert Markdown, Text, JSON, Word (.docx), PDF to Ralph format |
| **JSON Output** | `--output-format json` for structured responses |
| **5-Hour Limit Handling** | Detects Claude's usage limit, prompts to wait or exit |

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
ralph-import requirements.md my-project  # Convert PRD to Ralph format
cd my-project
ralph --monitor                          # Start with tmux dashboard

# Other commands
ralph --continue                        # Resume 24-hour session
ralph-reset                             # Clear state/logs
ralph-validate                          # Check configuration
```

### Typical Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│  1. PREPARE REQUIREMENTS                                        │
│     Write requirements.md (or .docx, .pdf, .json)               │
│     Include:                                                    │
│       - Clear feature descriptions                              │
│       - Acceptance criteria                                     │
│       - Success signals (what "done" looks like)                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  2. IMPORT & SETUP                                              │
│     ralph-import requirements.md my-project                     │
│     → Converts to Ralph format                                  │
│     → Creates .ralph/ folder with PROMPT.md, specs/, etc.       │
│     → ralph-validate to check configuration                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  3. START AUTONOMOUS LOOP                                       │
│     ralph --monitor                                             │
│     → tmux dashboard shows real-time progress                   │
│     → Claude works through tasks autonomously                   │
│     → Each iteration: implement → test → commit → next          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  4. WALK AWAY (optional)                                        │
│     Safe to leave overnight:                                    │
│       - Circuit breaker halts on repeated failures              │
│       - Rate limiting prevents runaway costs                    │
│       - Exit detection stops when truly done                    │
│     Check progress: tmux attach -t ralph                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  5. COMPLETION OR RESUME                                        │
│     On completion:                                              │
│       → EXIT_SIGNAL triggers automatic stop                     │
│       → Review commits and test results                         │
│     On interruption:                                            │
│       → ralph --continue (within 24 hours)                      │
│       → Picks up from last state                                │
└─────────────────────────────────────────────────────────────────┘
```

**Overnight development example:**
```bash
# Friday evening
ralph-import feature-spec.md new-dashboard
cd new-dashboard
ralph --monitor

# Detach tmux: Ctrl+B, D
# Go home, sleep

# Saturday morning
cd new-dashboard
tmux attach -t ralph
# Review what Ralph built overnight
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

---

## The Ralph Playbook

**Comprehensive guide to the Ralph Wiggum autonomous development technique.**

[GitHub](https://github.com/ghuntley/how-to-ralph-wiggum) | Methodology documentation | Geoffrey Huntley's original technique

### Overview

The Ralph Playbook documents the original technique that inspired ralph-claude-code. It provides detailed methodology for autonomous Claude development with a focus on **context engineering** — keeping the agent in its "smart zone" through strategic file management.

### The Three Phases

| Phase | Mode | Purpose |
|-------|------|---------|
| **1. Define Requirements** | LLM conversation | Break JTBD into specs, one per topic of concern |
| **2. Planning** | `PROMPT_plan.md` | Gap analysis: specs vs code → prioritized TODO list |
| **3. Building** | `PROMPT_build.md` | Implement, test, commit, update plan |

### Typical Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1: DEFINE REQUIREMENTS (Interactive)                     │
│                                                                 │
│  In Claude Code (normal conversation):                          │
│  "I want to build a mood board app for designers"               │
│                                                                 │
│  → Discuss Jobs to Be Done (JTBD)                               │
│  → Break each JTBD into topics of concern                       │
│  → For each topic: Claude writes specs/[topic].md               │
│                                                                 │
│  Example topics:                                                │
│    - specs/image-upload.md                                      │
│    - specs/color-extraction.md                                  │
│    - specs/layout-engine.md                                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2: PLANNING (Autonomous Loop)                            │
│                                                                 │
│  ./loop.sh plan                                                 │
│  (Uses PROMPT_plan.md)                                          │
│                                                                 │
│  Each iteration:                                                │
│    → Subagents study specs/* and src/*                          │
│    → Gap analysis: what's specified vs what's implemented       │
│    → Update IMPLEMENTATION_PLAN.md with prioritized tasks       │
│    → NO implementation, just planning                           │
│                                                                 │
│  Usually completes in 1-2 iterations                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 3: BUILDING (Autonomous Loop)                            │
│                                                                 │
│  ./loop.sh                                                      │
│  (Uses PROMPT_build.md)                                         │
│                                                                 │
│  Each iteration:                                                │
│    1. Orient — subagents study specs/*                          │
│    2. Read plan — study IMPLEMENTATION_PLAN.md                  │
│    3. Select — pick most important task                         │
│    4. Investigate — subagents verify not already implemented    │
│    5. Implement — N subagents for file operations               │
│    6. Validate — 1 subagent for build/tests (backpressure)      │
│    7. Update plan — mark done, note discoveries                 │
│    8. Commit & push                                             │
│    → Loop ends, context cleared, next iteration starts fresh    │
│                                                                 │
│  Ctrl+C to stop; plan is disposable — regenerate if wrong       │
└─────────────────────────────────────────────────────────────────┘
```

**Mode switching:**
```bash
# Generate/update the plan
./loop.sh plan

# Review IMPLEMENTATION_PLAN.md, then build
./loop.sh

# If plan goes wrong, regenerate it
./loop.sh plan
```

### Key Principles

**Context is Everything:**
- 200K+ tokens advertised ≈ 176K truly usable
- 40-60% utilization is the "smart zone"
- One task per loop = 100% smart zone utilization

**Steering Ralph:**
- **Upstream**: Specs, utilities, and code patterns guide generation
- **Downstream**: Tests, typechecks, builds create backpressure
- **Let Ralph Ralph**: Trust self-correction through iteration

### File Structure

```
project/
├── loop.sh                    # Outer loop script
├── PROMPT_plan.md             # Planning mode instructions
├── PROMPT_build.md            # Building mode instructions
├── AGENTS.md                  # Operational guide (how to build/test)
├── IMPLEMENTATION_PLAN.md     # Prioritized tasks (Ralph-generated)
├── specs/                     # One spec per JTBD topic
│   └── [topic].md
└── src/                       # Source code
```

### The Loop

```bash
#!/bin/bash
while true; do
    cat "$PROMPT_FILE" | claude -p \
        --dangerously-skip-permissions \
        --output-format=stream-json \
        --model opus \
        --verbose

    git push origin "$CURRENT_BRANCH"
    echo "======================== LOOP COMPLETE ========================"
done
```

### Prompt Patterns

The playbook identifies key language patterns that improve reliability:

| Pattern | Purpose |
|---------|---------|
| "study" | More thorough than "read" or "look at" |
| "don't assume not implemented" | Critical — the Achilles' heel |
| "using parallel subagents" | Fan out to preserve main context |
| "only 1 subagent for build/tests" | Backpressure control |
| "Ultrathink" | Triggers deeper reasoning |
| "capture the why" | Documentation quality |

### When to Use

- Learning the Ralph technique from the source
- Understanding context engineering principles
- Customizing ralph-claude-code for your workflow
- Building your own autonomous loop implementation

### Relation to ralph-claude-code

| Aspect | Ralph Playbook | ralph-claude-code |
|--------|----------------|-------------------|
| **Type** | Methodology documentation | Implementation |
| **Author** | Geoffrey Huntley | Frank Bria |
| **Focus** | Principles and patterns | Tooling and automation |
| **Exit Detection** | Manual/prompt-based | Automated dual-gate |
| **Rate Limiting** | None built-in | 100/hour with circuit breaker |
| **Best For** | Understanding the technique | Running it in practice |

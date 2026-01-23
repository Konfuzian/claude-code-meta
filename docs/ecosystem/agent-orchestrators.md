---
sidebar_position: 2
---

# Agent Orchestrators

Tools for coordinating multiple Claude agents and creating autonomous development workflows.

## TL;DR

| Tool | Best For | Complexity |
|------|----------|------------|
| **claude-flow** | Multi-agent parallel work, enterprise teams | High |
| **ralph-claude-code** | Autonomous overnight development | Medium |
| **Ralph Playbook** | Learning the methodology | N/A (docs only) |

**Quick decision**: Use claude-flow for parallel agent coordination. Use ralph-claude-code for single-agent autonomous loops.

## What Are Agent Orchestrators?

Agent orchestrators are tools that manage and coordinate AI agents working on software development tasks. Instead of using Claude Code for one task at a time, these tools enable:

- **Multi-agent coordination**: Multiple specialized agents working together on different aspects of a task
- **Autonomous loops**: Claude continues working through tasks without manual intervention
- **Persistent memory**: Learning from past sessions to improve future performance
- **Safety mechanisms**: Rate limiting, circuit breakers, and exit detection to prevent runaway costs

This page covers three approaches: enterprise-grade multi-agent swarms (claude-flow), autonomous development loops (ralph-claude-code), and the methodology documentation behind the Ralph technique (The Ralph Playbook).

---

## Comparison

This table helps you choose between the two main tools. They solve different problems and are suited for different use cases:

| Aspect | [claude-flow](#claude-flow) | [ralph-claude-code](#ralph-claude-code) |
|--------|-------------|-------------------|
| **Architecture** | 54+ agents in swarm topologies | Single-agent autonomous loop |
| **Scale** | Enterprise, multi-agent | Solo developer, iterative |
| **Agent Model** | Hierarchical queens + workers | Self-referential feedback loop |
| **Learning** | RuVector neural architecture | Session persistence via files/git |
| **Coordination** | 5 consensus algorithms | Circuit breaker + rate limiting |
| **Complexity** | High (250k+ lines, WASM) | Medium (shell scripts + hooks) |
| **Best For** | Large codebases, teams | Overnight automated development |

## Decision Guide: When to Use Each

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

The feature table below explains the core capabilities that make claude-flow unique. Each feature addresses a specific challenge in multi-agent coordination:

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

The architecture diagram shows how requests flow through the system. Understanding this flow helps you debug issues and optimize performance:

```
User → Claude-Flow (CLI/MCP) → Router → Swarm → Agents → Memory → LLM Providers
                       ↑                          ↓
                       └──── Learning Loop ←──────┘
```

### Queen Types & Workers

Claude-flow uses a hierarchical model inspired by insect colonies. "Queens" are coordinator agents that manage "workers" (specialized task agents). This division of labor allows complex tasks to be broken down and executed efficiently:

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

When multiple agents work on the same codebase, they need to agree on changes and avoid conflicts. These coordination mechanisms ensure agents work together coherently:

- **Consensus**: Majority, Weighted (Queen 3x), Byzantine (f &lt; n/3), Raft, Gossip, CRDT
- **Anti-Drift**: Single coordinator enforces alignment, max 8 agents recommended
- **Collective Memory**: Shared knowledge base with LRU cache and SQLite persistence

### Quick Start

Getting started with claude-flow involves installing it, initializing your project, and connecting it to Claude Code via MCP (Model Context Protocol). Here's what each command does:

```bash
# Install the package globally (requires Node.js 18+ or Bun 1.0+)
npm install claude-flow@v3alpha

# Initialize claude-flow in your project directory
# This creates configuration files and sets up the agent definitions
npx claude-flow@v3alpha init

# Register claude-flow as an MCP server with Claude Code
# This allows Claude Code to communicate with the swarm
claude mcp add claude-flow -- npx -y claude-flow@v3alpha

# Start the MCP server to enable swarm operations
npx claude-flow@v3alpha mcp start
```

### Typical Workflow

This workflow shows the typical progression from setup to execution. Each phase builds on the previous one, and the learning loop means the system improves over time:

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

**Example prompts** — These show how to request tasks from claude-flow through Claude Code. The natural language is interpreted by the Queen, which then dispatches appropriate workers:

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

Claude-flow uses a tiered routing system to minimize API costs. Simple tasks are handled locally or with cheaper models, reserving expensive Opus calls for complex work. This smart routing can extend Claude Code subscription by ~250%:

| Task Complexity | Handler | Speed | Cost |
|-----------------|---------|-------|------|
| Simple | Agent Booster (WASM) | &lt;1ms | Free |
| Medium | Haiku/Sonnet | ~500ms | Low |
| Complex | Opus + Swarm | 2-5s | Standard |

### When to Use

Claude-flow is best suited for scenarios where parallelization and specialization provide clear benefits:

- Large codebase refactoring with parallel workers
- Research tasks requiring multiple investigation threads
- Building and testing across multiple components
- Complex workflows needing agent coordination
- Teams wanting to scale AI-assisted development
- Multi-provider environments needing automatic failover

### Considerations

Before adopting claude-flow, be aware of these tradeoffs:

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

While claude-flow coordinates multiple agents, ralph-claude-code takes a different approach: a single agent running in a continuous loop until the task is complete.

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

The features below focus on safety and reliability — essential for any system that runs autonomously. Each feature prevents a specific failure mode:

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

At its core, ralph-claude-code is a sophisticated wrapper around a simple concept: repeatedly calling Claude until the task is done. The pseudocode below shows the control flow that makes this safe:

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

A key challenge in autonomous loops is knowing when to stop. Too early and the task is incomplete; too late and you waste resources. ralph-claude-code uses a multi-condition exit strategy that requires multiple signals before terminating:

1. **Test Saturation**: 3+ consecutive test-focused loops
2. **Completion Signals**: Multiple "done" indicators (2+ detected)
3. **Strong Completion**: All checklist items marked complete AND explicit EXIT_SIGNAL
4. **Plan Completion**: All items in task plan marked done

### Quick Start

Installation involves cloning the repository and running the installer. Per-project setup uses `ralph-import` to convert your requirements document into the format ralph expects:

```bash
# System installation — one-time setup
git clone https://github.com/frankbria/ralph-claude-code.git
cd ralph-claude-code
./install.sh  # Installs ralph commands globally

# Per-project setup — run for each new project
ralph-import requirements.md my-project  # Convert your PRD to Ralph format
cd my-project
ralph --monitor                          # Start the loop with tmux dashboard

# Utility commands
ralph --continue                        # Resume a session within 24 hours
ralph-reset                             # Clear all state and logs for fresh start
ralph-validate                          # Verify your configuration is correct
```

### Typical Workflow

The workflow progresses from preparation through autonomous execution. The key insight is that good requirements upfront lead to better autonomous results:

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

**Overnight development example** — This demonstrates the "walk away" use case that makes ralph powerful. You start the loop, detach from the terminal, and return later to find completed work:
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

When you run `ralph-import`, it creates a `.ralph/` folder with configuration files. Understanding this structure helps you customize and debug the loop:

```
my-project/
├── .ralph/                 # Configuration folder created by ralph-import
│   ├── PROMPT.md          # Main prompt fed to Claude each iteration
│   ├── @fix_plan.md       # Prioritized task list (updated by Claude)
│   ├── @AGENT.md          # Instructions for how to build/test the project
│   ├── specs/             # Detailed specifications for features
│   └── logs/              # Execution logs for debugging
└── src/                   # Your source code (created by Claude)
```

### When to Use

ralph-claude-code excels when you have well-defined tasks that benefit from iterative refinement:

- Long-running implementation tasks
- Multi-step refactoring with clear completion criteria
- Automated overnight feature development
- Bug fixing with verification tests

### When NOT to Use

Autonomous loops are not suitable for every task. Avoid ralph-claude-code when:

- Tasks requiring human judgment or design decisions
- One-shot operations that don't benefit from iteration
- Tasks with unclear success criteria
- Production debugging (use targeted debugging instead)

### Considerations

Cost and time implications of autonomous loops:

- **Cost**: A 50-iteration loop can cost $50-100+ depending on context size
- **API Limits**: Claude's 5-hour limit triggers user prompts
- **Session Expiration**: Default 24-hour expiration on continuity
- **Clear Completion Criteria**: Essential for successful loops

---

## The Ralph Playbook

**Comprehensive guide to the Ralph Wiggum autonomous development technique.**

[GitHub](https://github.com/ghuntley/how-to-ralph-wiggum) | Methodology documentation | Geoffrey Huntley's original technique

### Overview

While ralph-claude-code is an implementation, The Ralph Playbook is the methodology documentation that explains *why* the technique works. Think of it as the theory behind the practice.

The Ralph Playbook documents the original technique that inspired ralph-claude-code. It provides detailed methodology for autonomous Claude development with a focus on **context engineering** — keeping the agent in its "smart zone" through strategic file management.

### The Three Phases

The playbook divides development into distinct phases, each with its own mode and prompt file. This separation prevents scope creep and keeps the agent focused:

| Phase | Mode | Purpose |
|-------|------|---------|
| **1. Define Requirements** | LLM conversation | Break JTBD into specs, one per topic of concern |
| **2. Planning** | `PROMPT_plan.md` | Gap analysis: specs vs code → prioritized TODO list |
| **3. Building** | `PROMPT_build.md` | Implement, test, commit, update plan |

### Typical Workflow

This workflow shows the three phases in practice. Note how the planning phase creates the plan *without implementing*, ensuring a thoughtful approach before coding begins:

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

**Mode switching** — You control which phase runs by passing arguments to the loop script:
```bash
# Generate/update the plan (runs PROMPT_plan.md)
./loop.sh plan

# Review IMPLEMENTATION_PLAN.md manually, then start building
./loop.sh

# If the plan goes in the wrong direction, regenerate it
./loop.sh plan
```

### Key Principles

The playbook emphasizes **context engineering** — the art of managing what the agent knows and when. These principles are critical to successful autonomous development:

**Context is Everything:**
- 200K+ tokens advertised ≈ 176K truly usable
- 40-60% utilization is the "smart zone"
- One task per loop = 100% smart zone utilization

**Steering Ralph:**
- **Upstream**: Specs, utilities, and code patterns guide generation
- **Downstream**: Tests, typechecks, builds create backpressure
- **Let Ralph Ralph**: Trust self-correction through iteration

### File Structure

The playbook uses a specific file structure. Each file has a purpose in guiding the agent:

```
project/
├── loop.sh                    # The shell script that runs the infinite loop
├── PROMPT_plan.md             # Instructions for planning phase (what to analyze)
├── PROMPT_build.md            # Instructions for building phase (how to implement)
├── AGENTS.md                  # Project-specific instructions (build commands, test commands)
├── IMPLEMENTATION_PLAN.md     # The task list (generated by planning phase)
├── specs/                     # One specification file per feature/concern
│   └── [topic].md             # e.g., authentication.md, database.md
└── src/                       # Your source code
```

### The Loop

The actual loop script is simple — it's the prompt engineering that does the heavy lifting:

```bash
#!/bin/bash
while true; do
    # Pipe the prompt file to Claude in non-interactive mode
    cat "$PROMPT_FILE" | claude -p \
        --dangerously-skip-permissions \  # Allow all tool calls without asking
        --output-format=stream-json \     # Structured output for parsing
        --model opus \                    # Use the most capable model
        --verbose                         # Show detailed progress

    # Push changes after each iteration (creates checkpoint)
    git push origin "$CURRENT_BRANCH"
    echo "======================== LOOP COMPLETE ========================"
done
```

### Prompt Patterns

The playbook identifies specific words and phrases that change how Claude behaves. Using the right language in your prompts significantly improves reliability:

| Pattern | Purpose |
|---------|---------|
| "study" | More thorough than "read" or "look at" |
| "don't assume not implemented" | Critical — the Achilles' heel |
| "using parallel subagents" | Fan out to preserve main context |
| "only 1 subagent for build/tests" | Backpressure control |
| "Ultrathink" | Triggers deeper reasoning |
| "capture the why" | Documentation quality |

### When to Use

Read the Ralph Playbook when you want to:

- Learn the Ralph technique from the original source
- Understand context engineering principles deeply
- Customize ralph-claude-code for your specific workflow
- Build your own autonomous loop implementation from scratch

### Relation to ralph-claude-code

Understanding the relationship between the playbook (theory) and ralph-claude-code (implementation):

| Aspect | Ralph Playbook | ralph-claude-code |
|--------|----------------|-------------------|
| **Type** | Methodology documentation | Implementation |
| **Author** | Geoffrey Huntley | Frank Bria |
| **Focus** | Principles and patterns | Tooling and automation |
| **Exit Detection** | Manual/prompt-based | Automated dual-gate |
| **Rate Limiting** | None built-in | 100/hour with circuit breaker |
| **Best For** | Understanding the technique | Running it in practice |

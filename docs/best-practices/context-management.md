---
sidebar_position: 3
---

# Context Management

Understand and optimize Claude Code's context window.

## What This Page Covers

This page explains how Claude Code's context window works and how to manage it effectively. Understanding context helps you work on longer tasks without hitting limits or losing important information.

**Why this matters:** Context is the "memory" of your conversation. When it fills up, Claude summarizes older content and may lose details. Managing context well keeps Claude effective throughout your session.

---

## How Context Works

The context window is everything Claude "remembers" during a conversation. It includes several types of content:

Claude Code maintains conversation context that includes:

- **System prompts** — Instructions, tool definitions
- **Conversation history** — Your messages and Claude's responses
- **Tool outputs** — File contents, command results
- **CLAUDE.md files** — Project memory

### Context Hierarchy

When instructions conflict, this hierarchy determines which takes precedence:

```
Enterprise Policy (highest priority)
    ↓
Project Memory (CLAUDE.md)
    ↓
Project Rules (.claude/settings.json)
    ↓
Session Context (conversation)
```

---

## Context Limits

Claude Code automatically manages context when it gets full, but understanding these limits helps you work more effectively:

| Aspect | Behavior |
|--------|----------|
| **Auto-compact threshold** | 75-92% usage |
| **Warning** | Shown when approaching limit |
| **Auto-compact** | Summarizes older context |

---

## Manual Compaction

Compaction summarizes your conversation, discarding older details while preserving key information. You can trigger it manually to control what gets kept.

### Basic Compact

```
/compact
```

Claude summarizes the conversation, preserving key information.

### Guided Compact

You can guide what Claude preserves during compaction by adding instructions:

```
/compact Focus on the authentication changes and ignore the earlier debugging
```

```
/compact Keep all decisions about the API design
```

Providing instructions helps Claude preserve what matters to you.

### When to Compact

**Good times:**
- After completing a feature
- Before starting a new task
- When you notice Claude forgetting things
- At natural conversation breakpoints

**Avoid compacting:**
- Mid-task (might lose important details)
- When you need to reference recent specifics

---

## Checkpointing

Checkpoints are snapshots of your conversation and/or code that let you roll back if something goes wrong. They're session-scoped (not permanent like git commits).

### Create Checkpoint

Press `Esc Esc` or:

```
/rewind
```

### Checkpoint Options

You can choose what to include in a checkpoint:

| Type | What it saves |
|------|---------------|
| **Conversation only** | Chat history, not files |
| **Code only** | File changes, not chat |
| **Both** | Full state snapshot |

### Use Cases

Checkpoints are especially useful before risky operations:

- Before accepting large refactors
- Before trying experimental approaches
- Before risky operations
- As "save points" during complex tasks

### Checkpoints vs Git

Understanding when to use each helps you choose the right tool:

| Checkpoints | Git |
|-------------|-----|
| Session-scoped | Permanent |
| Includes conversation | Code only |
| Quick rollback | Full history |
| Use for exploration | Use for commits |

**Best practice**: Use checkpoints for experimentation, commit to Git when satisfied.

---

## Preserving Context

These techniques help you use context efficiently and keep important information available throughout your session.

### Front-load Important Information

Important details at the start of your message are more likely to be retained:

✅ "In src/auth/login.ts, the validateUser function has a bug. It doesn't handle..."

❌ "So I've been looking at this thing and there's this issue... anyway it's in src/auth/login.ts"

### Reference Files Explicitly

```
Looking at @src/auth/login.ts, I notice...
```

This ensures the file content is included in context.

### Use CLAUDE.md for Persistent Context

Information in CLAUDE.md persists across sessions and compactions. Move frequently-needed context there:
```
Remember, we use Vitest not Jest in this project
```

Add to CLAUDE.md:
```markdown
## Testing
- Test framework: Vitest (not Jest)
- Test files: `*.test.ts` next to source
```

---

## Monitoring Usage

These commands help you understand how much context you're using and when to consider compaction.

### Check Context Status

```
/status
```

Shows current context usage and available capacity.

### Token Costs

```
/cost
```

Shows token usage for the session.

---

## Large Codebases

Large codebases can quickly fill context if you try to read everything. These strategies help you work efficiently in big projects.

### Strategies

1. **Don't read everything upfront** — Let Claude search as needed
2. **Use specific file references** — `@src/specific/file.ts`
3. **Leverage subagents** — Delegate exploration to preserve main context
4. **Compact after exploration** — Once you understand the area, compact the search results

### Example Flow

This example shows efficient exploration followed by compaction:

```
You: I need to understand the payment system

Claude: [Uses subagent to explore]
Found payment code in these locations...

You: /compact Keep the payment system overview, forget the search process

You: Now let's modify the checkout flow...
```

---

## Tool Output Limits

Tools that return large amounts of data (MCP servers, file reads) have limits to prevent context overflow.

### MCP Token Limits

| Threshold | Behavior |
|-----------|----------|
| 10,000 tokens | Warning shown |
| 25,000 tokens | Response truncated |

Configure via `MAX_MCP_OUTPUT_TOKENS`.

### Large File Handling

Very large files are handled in chunks to avoid consuming too much context:
- First 2000 lines by default
- Use `offset` and `limit` for specific sections
- Consider breaking large files into modules

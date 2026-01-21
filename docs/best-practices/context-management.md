---
sidebar_position: 2
---

# Context Management

Understand and optimize Claude Code's context window.

## How Context Works

Claude Code maintains conversation context that includes:

- **System prompts** — Instructions, tool definitions
- **Conversation history** — Your messages and Claude's responses
- **Tool outputs** — File contents, command results
- **CLAUDE.md files** — Project memory

### Context Hierarchy

```
Enterprise Policy (highest priority)
    ↓
Project Memory (CLAUDE.md)
    ↓
Project Rules (.claude/settings.json)
    ↓
Session Context (conversation)
```

## Context Limits

| Aspect | Behavior |
|--------|----------|
| **Auto-compact threshold** | 75-92% usage |
| **Warning** | Shown when approaching limit |
| **Auto-compact** | Summarizes older context |

## Manual Compaction

### Basic Compact

```
/compact
```

Claude summarizes the conversation, preserving key information.

### Guided Compact

```
/compact Focus on the authentication changes and ignore the earlier debugging
```

```
/compact Keep all decisions about the API design
```

Providing instructions helps Claude preserve what matters.

### When to Compact

**Good times:**
- After completing a feature
- Before starting a new task
- When you notice Claude forgetting things
- At natural conversation breakpoints

**Avoid compacting:**
- Mid-task (might lose important details)
- When you need to reference recent specifics

## Checkpointing

Checkpoints save conversation + code state for easy rollback.

### Create Checkpoint

Press `Esc Esc` or:

```
/rewind
```

### Checkpoint Options

| Type | What it saves |
|------|---------------|
| **Conversation only** | Chat history, not files |
| **Code only** | File changes, not chat |
| **Both** | Full state snapshot |

### Use Cases

- Before accepting large refactors
- Before trying experimental approaches
- Before risky operations
- As "save points" during complex tasks

### Checkpoints vs Git

| Checkpoints | Git |
|-------------|-----|
| Session-scoped | Permanent |
| Includes conversation | Code only |
| Quick rollback | Full history |
| Use for exploration | Use for commits |

**Best practice**: Use checkpoints for experimentation, commit to Git when satisfied.

## Preserving Context

### Front-load Important Information

Put critical context early in your message:

✅ "In src/auth/login.ts, the validateUser function has a bug. It doesn't handle..."

❌ "So I've been looking at this thing and there's this issue... anyway it's in src/auth/login.ts"

### Reference Files Explicitly

```
Looking at @src/auth/login.ts, I notice...
```

This ensures the file content is included in context.

### Use CLAUDE.md for Persistent Context

Instead of repeating:
```
Remember, we use Vitest not Jest in this project
```

Add to CLAUDE.md:
```markdown
## Testing
- Test framework: Vitest (not Jest)
- Test files: `*.test.ts` next to source
```

## Monitoring Usage

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

## Large Codebases

### Strategies

1. **Don't read everything upfront** — Let Claude search as needed
2. **Use specific file references** — `@src/specific/file.ts`
3. **Leverage subagents** — Delegate exploration to preserve main context
4. **Compact after exploration** — Once you understand the area, compact the search results

### Example Flow

```
You: I need to understand the payment system

Claude: [Uses subagent to explore]
Found payment code in these locations...

You: /compact Keep the payment system overview, forget the search process

You: Now let's modify the checkout flow...
```

## Tool Output Limits

### MCP Token Limits

| Threshold | Behavior |
|-----------|----------|
| 10,000 tokens | Warning shown |
| 25,000 tokens | Response truncated |

Configure via `MAX_MCP_OUTPUT_TOKENS`.

### Large File Handling

For very large files, Claude reads them in chunks:
- First 2000 lines by default
- Use `offset` and `limit` for specific sections
- Consider breaking large files into modules

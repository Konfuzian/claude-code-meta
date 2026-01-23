---
sidebar_position: 5
---

# Hooks

Automate actions in response to Claude Code events.

This page explains how to create hooks that run automatically when Claude Code performs actions. Hooks are one of the most powerful customization features — they let you integrate Claude Code into your existing workflow.

## What are Hooks?

Hooks are shell commands that execute automatically when specific events occur. They're the glue between Claude Code and your other tools. Use them to:

- Run formatters after file writes
- Validate changes before commits
- Inject context into prompts
- Block dangerous operations
- Send notifications

## Hook Events

Each event fires at a specific point in Claude Code's operation. Understanding when they fire helps you choose the right one:

| Event | Timing | Common Use Cases |
|-------|--------|------------------|
| `PreToolUse` | Before tool executes | Block/modify tool calls |
| `PostToolUse` | After successful execution | Run linters, formatters |
| `PermissionRequest` | When permission dialog appears | Auto-allow/deny |
| `UserPromptSubmit` | When user submits prompt | Inject context |
| `SessionStart` | Session begins | Initialize environment |
| `SessionEnd` | Session ends | Cleanup tasks |
| `Stop` | Agent finishes response | Force continuation |
| `Notification` | Alert sent | Custom notifications |

## Configuration

Hooks are defined in your settings file (`.claude/settings.json` or `~/.claude/settings.json`). Here's the basic structure:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write" },
        "command": "prettier --write $FILE_PATH"
      }
    ],
    "PreToolUse": [
      {
        "matcher": { "tool_name": "Bash", "command": "rm *" },
        "command": "echo 'Blocked dangerous delete' && exit 2"
      }
    ]
  }
}
```

## Matchers

Matchers determine which tool invocations trigger your hook. Without matchers, hooks run on every tool use of that type:

```json
{
  "matcher": {
    "tool_name": "Write",           // Tool name
    "file_path": "*.ts",            // Glob pattern
    "command": "npm *"              // Command pattern (Bash)
  }
}
```

## Environment Variables

Hooks receive context via environment variables:

| Variable | Description |
|----------|-------------|
| `$TOOL_NAME` | Name of the tool |
| `$FILE_PATH` | File being operated on |
| `$COMMAND` | Command being run (Bash) |
| `$SESSION_ID` | Current session ID |
| `$PROMPT` | User's prompt (UserPromptSubmit) |

## Exit Codes

Your hook's exit code tells Claude Code how to proceed. This is how you can block dangerous operations:

| Exit Code | Effect |
|-----------|--------|
| `0` | Success, continue |
| `2` | Block the action |
| Other | Log warning, continue |

## JSON Responses

Hooks can return JSON for advanced control:

```json
{
  "decision": "allow",       // or "block"
  "reason": "Auto-approved", // Optional message
  "continue": true,          // Continue processing
  "updatedInput": "..."      // Modify input
}
```

## Examples

These examples show common hook patterns. Copy and adapt them for your workflow:

### Auto-format on Write

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write", "file_path": "*.{ts,tsx,js,jsx}" },
        "command": "prettier --write $FILE_PATH && eslint --fix $FILE_PATH"
      }
    ]
  }
}
```

### Block Production Commands

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": { "tool_name": "Bash", "command": "*production*" },
        "command": "echo 'Production commands blocked' && exit 2"
      }
    ]
  }
}
```

### Inject Git Context

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "command": "echo '{\"updatedInput\": \"Current branch: '$(git branch --show-current)'. $PROMPT\"}'"
      }
    ]
  }
}
```

### Run Tests After Changes

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write", "file_path": "src/**/*.ts" },
        "command": "npm test -- --related $FILE_PATH"
      }
    ]
  }
}
```

## Timeout

Hooks timeout after 60 seconds by default. Configure per-hook:

```json
{
  "matcher": { "tool_name": "Write" },
  "command": "slow-linter $FILE_PATH",
  "timeout": 120000
}
```

## Managing Hooks

```
/hooks          # View and manage hooks
/hooks add      # Add new hook
/hooks remove   # Remove hook
```

---

## Advanced Examples

These examples demonstrate more sophisticated hook patterns for real-world workflows.

### Conditional Hook: Run Tests Only for Source Files

Only run tests when source files (not tests or configs) are modified:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write", "file_path": "src/**/*.{ts,tsx}" },
        "command": "npm test -- --related $FILE_PATH --passWithNoTests"
      }
    ]
  }
}
```

### Language-Specific Formatters

Apply different formatters based on file extension:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write", "file_path": "*.py" },
        "command": "black $FILE_PATH && isort $FILE_PATH"
      },
      {
        "matcher": { "tool_name": "Write", "file_path": "*.go" },
        "command": "gofmt -w $FILE_PATH"
      },
      {
        "matcher": { "tool_name": "Write", "file_path": "*.rs" },
        "command": "rustfmt $FILE_PATH"
      },
      {
        "matcher": { "tool_name": "Write", "file_path": "*.{ts,tsx,js,jsx}" },
        "command": "prettier --write $FILE_PATH"
      }
    ]
  }
}
```

### Block Dangerous Patterns

Prevent accidental destructive commands:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": { "tool_name": "Bash", "command": "rm -rf *" },
        "command": "echo 'Blocked: recursive force delete' && exit 2"
      },
      {
        "matcher": { "tool_name": "Bash", "command": "*DROP TABLE*" },
        "command": "echo 'Blocked: DROP TABLE commands' && exit 2"
      },
      {
        "matcher": { "tool_name": "Bash", "command": "*DELETE FROM*WHERE*" },
        "command": "echo 'Blocked: DELETE without review' && exit 2"
      },
      {
        "matcher": { "tool_name": "Bash", "command": "git push --force*" },
        "command": "echo 'Blocked: force push requires manual execution' && exit 2"
      },
      {
        "matcher": { "tool_name": "Bash", "command": "*main*" },
        "command": "if echo \"$COMMAND\" | grep -qE 'checkout|merge|push.*main'; then echo 'Blocked: main branch operations' && exit 2; fi"
      }
    ]
  }
}
```

### Inject Project Context

Add relevant context to every prompt automatically:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "command": "echo '{\"updatedInput\": \"[Context: Branch=$(git branch --show-current 2>/dev/null || echo none), Last commit=$(git log -1 --oneline 2>/dev/null || echo none)] $PROMPT\"}'"
      }
    ]
  }
}
```

### Type Checking After TypeScript Changes

Run type checker when TypeScript files change:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write", "file_path": "*.{ts,tsx}" },
        "command": "npx tsc --noEmit --skipLibCheck 2>&1 | head -20 || true"
      }
    ]
  }
}
```

### Lint Staged Files Before Commit

When Claude runs git commit, lint the staged files first:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": { "tool_name": "Bash", "command": "git commit*" },
        "command": "npx lint-staged || (echo 'Lint failed - fix issues first' && exit 2)"
      }
    ]
  }
}
```

### Notification on Session End

Send a notification when a long session completes:

```json
{
  "hooks": {
    "SessionEnd": [
      {
        "command": "osascript -e 'display notification \"Claude Code session ended\" with title \"Session Complete\"'"
      }
    ]
  }
}
```

On Linux with `notify-send`:

```json
{
  "hooks": {
    "SessionEnd": [
      {
        "command": "notify-send 'Claude Code' 'Session ended'"
      }
    ]
  }
}
```

### Auto-Stage Written Files

Automatically stage files that Claude writes:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write" },
        "command": "git add $FILE_PATH 2>/dev/null || true"
      }
    ]
  }
}
```

---

## Debugging Hooks

When hooks don't work as expected, use these techniques:

### Test Hook Commands Manually

Run your hook command directly to verify it works:

```bash
# Set the environment variable manually
export FILE_PATH="src/app.ts"

# Run your hook command
prettier --write $FILE_PATH && eslint --fix $FILE_PATH
```

### Add Logging to Hooks

Temporarily add logging to understand what's happening:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write" },
        "command": "echo \"Hook triggered for: $FILE_PATH\" >> /tmp/claude-hooks.log && prettier --write $FILE_PATH"
      }
    ]
  }
}
```

### Check Exit Codes

Verify your commands return correct exit codes:

```bash
# This should exit 0 (success)
prettier --write test.ts; echo "Exit code: $?"

# This should exit 2 (block) when you want to prevent an action
echo "Blocked" && exit 2; echo "Exit code: $?"
```

### Common Hook Issues

| Problem | Likely Cause | Solution |
|---------|--------------|----------|
| Hook never runs | Matcher pattern doesn't match | Check glob patterns with `echo "src/app.ts" | grep "*.ts"` |
| Hook runs but fails silently | Command not found | Use full paths or ensure tools are in PATH |
| Hook blocks unexpectedly | Exit code not 0 | Add `|| true` for non-critical commands |
| Variables empty | Wrong variable name | Check exact variable names: `$FILE_PATH`, not `$FILEPATH` |

## Security Notes

Hooks are powerful, which means they can also be dangerous. Keep these in mind:

- Hooks run with your user permissions — they can do anything you can do
- Review hooks before enabling, especially from third parties
- Be careful with hooks that modify `updatedInput` — they change what Claude sees
- Direct edits to hook configs require `/hooks` review as a safety measure

For comprehensive security configuration, see [Security Best Practices](/docs/best-practices/security).

---
sidebar_position: 4
---

# Hooks

Automate actions in response to Claude Code events.

## What are Hooks?

Hooks are shell commands that execute automatically when specific events occur. Use them to:

- Run formatters after file writes
- Validate changes before commits
- Inject context into prompts
- Block dangerous operations
- Send notifications

## Hook Events

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

Add hooks to your settings file:

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

Filter which tool uses trigger the hook:

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

Control hook behavior with exit codes:

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

## Security Notes

- Hooks run with your user permissions
- Review hooks before enabling
- Be careful with hooks that modify `updatedInput`
- Direct edits to hook configs require `/hooks` review

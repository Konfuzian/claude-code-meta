---
sidebar_position: 3
---

# Security Best Practices

Keep your system secure while using Claude Code.

## Permission Model

Claude Code asks permission before potentially dangerous operations:

| Operation | Default |
|-----------|---------|
| Read files | Allowed |
| Write files | Ask |
| Run bash commands | Ask |
| Network access | Ask |
| MCP tool use | Ask |

### Permission Prompts

When Claude asks for permission, you can:
- **Allow once** — Just this time
- **Allow always** — For this session
- **Deny** — Block the action

## Pre-approving Safe Commands

Reduce prompts by pre-approving common commands:

```json
// .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(npm test)",
      "Bash(git status)",
      "Bash(git diff)",
      "Bash(git log *)",
      "Write(src/**)",
      "Write(tests/**)"
    ]
  }
}
```

### Pattern Syntax

| Pattern | Matches |
|---------|---------|
| `Bash(npm *)` | Any npm command |
| `Write(src/**)` | Any file under src/ |
| `mcp__github__*` | All GitHub MCP tools |
| `Bash(git log *)` | git log with any args |

## Denying Dangerous Operations

Block risky commands:

```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Bash(* --force)",
      "Bash(*production*)",
      "Write(.env*)"
    ]
  }
}
```

Deny rules take precedence over allow rules.

## Sandboxing

Sandboxing isolates Claude Code's file and network access, reducing permission prompts by ~84%.

### Enable Sandboxing

```
/config > Sandboxing > Enable
```

Or in settings:

```json
{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "allowedPaths": [
        "/home/user/project",
        "/tmp"
      ]
    },
    "network": {
      "allowedHosts": [
        "api.github.com",
        "registry.npmjs.org"
      ]
    }
  }
}
```

### What Sandboxing Controls

| Aspect | Restriction |
|--------|-------------|
| **Filesystem** | Limited to allowed paths |
| **Network** | Limited to allowed hosts |
| **Bash** | Auto-allowed within sandbox |

### Benefits

- Fewer permission prompts
- Reduced risk of accidental damage
- Clear boundaries for Claude's access

## Sensitive Files

### Never Commit Secrets

Exclude sensitive files from Claude's access:

```json
{
  "permissions": {
    "deny": [
      "Read(.env)",
      "Read(.env.*)",
      "Read(*credentials*)",
      "Read(*secret*)",
      "Write(.env*)"
    ]
  }
}
```

### Environment Variables

Use environment variables instead of hardcoded secrets:

```bash
# Set in your shell, not in code
export DATABASE_URL="postgres://..."
export API_KEY="..."
```

Reference in MCP configs:

```json
{
  "env": {
    "DATABASE_URL": "${DATABASE_URL}"
  }
}
```

## Hook Security

### Review Hooks

Hooks run with your user permissions. Always review before enabling:

```
/hooks
```

### Dangerous Hook Patterns

Avoid:
- Hooks that modify `updatedInput` without validation
- Hooks that run arbitrary commands from user input
- Hooks with excessive permissions

### Hook Config Protection

Direct edits to hook configs require review via `/hooks` command.

## Skip Permissions Flag

```bash
claude --dangerously-skip-permissions
```

**Never use in production.** This flag:
- Bypasses all permission checks
- Runs without human oversight
- Intended only for controlled CI/CD environments

### Safe CI/CD Usage

```yaml
# Only in isolated CI environments
jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: node:20
    steps:
      - uses: actions/checkout@v4
      - run: claude --dangerously-skip-permissions -p "run tests"
```

Ensure:
- Isolated container/VM
- No access to production credentials
- Limited network access
- Read-only access where possible

## Audit Trail

### Session Logs

Claude Code logs sessions for review:

```bash
~/.claude/logs/
```

### Git as Audit

All file changes are visible via git:

```bash
git diff              # See proposed changes
git log --oneline     # Review commit history
git reflog            # Full operation history
```

## Enterprise Controls

For team deployments, use managed settings:

```json
// managed-settings.json (cannot be overridden)
{
  "permissions": {
    "deny": [
      "Bash(* production *)",
      "mcp__*__delete_*"
    ]
  },
  "sandbox": {
    "enabled": true
  }
}
```

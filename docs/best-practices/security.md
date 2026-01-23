---
sidebar_position: 2
---

# Security Best Practices

Keep your system secure while using Claude Code.

## What This Page Covers

This page explains Claude Code's security model and how to configure it for your environment. You'll learn about permissions, sandboxing, sensitive file handling, and audit trails.

**Why this matters:** Claude Code can run commands and modify files on your system. Understanding the security model helps you use it confidently while maintaining appropriate controls.

---

## Permission Model

By default, Claude Code asks for permission before potentially dangerous operations. This section explains the default behavior and how to respond to permission prompts.

Claude Code asks permission before potentially dangerous operations:

| Operation | Default |
|-----------|---------|
| Read files | Allowed |
| Write files | Ask |
| Run bash commands | Ask |
| Network access | Ask |
| MCP tool use | Ask |

### Permission Prompts

When Claude asks for permission, you have three choices:

- **Allow once** — Just this time
- **Allow always** — For this session
- **Deny** — Block the action

---

## Pre-approving Safe Commands

If you find yourself repeatedly approving the same commands, you can pre-approve them in settings. This reduces interruptions while maintaining security for truly dangerous operations.

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

Patterns use wildcards to match multiple commands or paths:

| Pattern | Matches |
|---------|---------|
| `Bash(npm *)` | Any npm command |
| `Write(src/**)` | Any file under src/ |
| `mcp__github__*` | All GitHub MCP tools |
| `Bash(git log *)` | git log with any args |

---

## Denying Dangerous Operations

Deny rules explicitly block dangerous operations, even if they would otherwise be allowed. This provides a safety net against mistakes.

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

**Important:** Deny rules take precedence over allow rules. This means you can broadly allow a category and then deny specific dangerous patterns within it.

---

## Sandboxing

Sandboxing restricts Claude Code to specific directories and network hosts. This provides OS-level isolation beyond permission prompts.

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

When sandboxing is enabled, operations outside the sandbox are blocked automatically:

| Aspect | Restriction |
|--------|-------------|
| **Filesystem** | Limited to allowed paths |
| **Network** | Limited to allowed hosts |
| **Bash** | Auto-allowed within sandbox |

### Benefits

Sandboxing provides several advantages:

- Fewer permission prompts
- Reduced risk of accidental damage
- Clear boundaries for Claude's access

---

## Sensitive Files

API keys, passwords, and other secrets should never be accessible to Claude or committed to git. This section covers how to protect sensitive information.

### Never Commit Secrets

Block access to files that might contain secrets:

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

Instead of putting secrets in files, use environment variables. Claude can reference them without seeing their values:

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

---

## Hook Security

Hooks execute shell commands with your user permissions. Malicious or poorly-written hooks can be dangerous.

### Review Hooks

Always review hooks before enabling them:

```
/hooks
```

### Dangerous Hook Patterns

Be wary of these patterns:
- Hooks that modify `updatedInput` without validation
- Hooks that run arbitrary commands from user input
- Hooks with excessive permissions

### Hook Config Protection

Direct edits to hook configs require review via `/hooks` command.

---

## Skip Permissions Flag

The `--dangerously-skip-permissions` flag bypasses all permission checks. As the name suggests, this is dangerous and should only be used in isolated environments.

```bash
claude --dangerously-skip-permissions
```

**Never use in production.** This flag:
- Bypasses all permission checks
- Runs without human oversight
- Intended only for controlled CI/CD environments

### Safe CI/CD Usage

If you must use this flag in CI/CD, ensure proper isolation:

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

Ensure these protections are in place:

- Isolated container/VM
- No access to production credentials
- Limited network access
- Read-only access where possible

---

## Audit Trail

Claude Code provides several ways to review what happened during sessions. This is useful for debugging and security reviews.

### Session Logs

Claude Code logs sessions for review:

```bash
~/.claude/logs/
```

### Git as Audit

Git provides a complete record of all file changes:

```bash
git diff              # See proposed changes
git log --oneline     # Review commit history
git reflog            # Full operation history
```

---

## Enterprise Controls

Organizations can enforce security policies that users cannot override. This is useful for team deployments with consistent security requirements.

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

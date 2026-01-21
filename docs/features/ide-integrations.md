---
sidebar_position: 3
---

# IDE Integrations

Use Claude Code within your favorite development environment.

## VS Code Extension

The most mature IDE integration with 2M+ installs.

### Installation

1. Open VS Code Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`)
2. Search "Claude Code"
3. Install the extension by Anthropic

Or via CLI:

```bash
code --install-extension anthropic.claude-code
```

### Features

| Feature | Description |
|---------|-------------|
| **Inline Diffs** | See proposed changes in the editor |
| **Sidebar Panel** | Chat interface in the sidebar |
| **@ Mentions** | Reference files with `@filename` |
| **Multi-tab** | Multiple conversation windows |
| **Mode Switching** | Toggle plan/normal/auto-accept modes |
| **Checkpoints** | Visual checkpoint management |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+Shift+P` → "Claude" | Open command palette |
| `Cmd+K Cmd+C` | Open Claude Code panel |
| Selection + right-click | "Ask Claude about selection" |

### Diff Handling

When Claude proposes changes:
- **Green** = additions
- **Red** = deletions
- Click **Accept** or **Reject** per file
- Use **Accept All** for batch approval

## JetBrains Plugin (Beta)

Works with IntelliJ IDEA, PyCharm, WebStorm, and other JetBrains IDEs.

### Installation

1. Open Settings → Plugins
2. Search "Claude Code"
3. Install and restart IDE

### Features

| Feature | Description |
|---------|-------------|
| **Quick Launch** | `Cmd+Esc` / `Ctrl+Esc` |
| **IDE Diff Viewer** | Native diff integration |
| **Selection Context** | Share highlighted code |
| **Diagnostics** | Auto-include errors |
| **File Reference** | `Cmd+Option+K` / `Alt+Ctrl+K` |

### MCP Integration

JetBrains 2025.2+ includes a native MCP server for IDE features:

```json
{
  "mcpServers": {
    "jetbrains": {
      "command": "idea",
      "args": ["mcp-server"]
    }
  }
}
```

## Chrome Extension (Beta)

Browser automation and debugging integration.

### Launch

```bash
claude --chrome
```

### Capabilities

- **Navigate** — Open URLs, click elements
- **Inspect** — Read DOM, console logs
- **Fill Forms** — Automate input
- **Network** — Monitor requests
- **Record** — Capture interactions as GIFs
- **Debug** — Live DOM state inspection

### Limitations

- Chrome only (not Brave, Arc, Firefox)
- Not available in WSL
- Requires display access

### Example

```
You: open the login page and test with invalid credentials

Claude: I'll launch Chrome and test the login flow.
[Opens Chrome, navigates to /login]
[Fills form with test@example.com / wrongpassword]
[Clicks submit, captures error message]

The login page shows: "Invalid credentials"
```

## Terminal Integration

Claude Code works in any terminal, but some offer enhanced experiences:

### iTerm2 (macOS)

- Automatic shell integration
- Better escape handling

### Windows Terminal

- Full color support
- Better Unicode rendering

### tmux/screen

```bash
# Works normally in multiplexed sessions
tmux new-session -s claude
claude
```

## Remote Development

### SSH

```bash
ssh server "claude -p 'check disk usage'"
```

### VS Code Remote

Claude Code extension works with:
- Remote SSH
- Dev Containers
- WSL
- GitHub Codespaces

---
sidebar_position: 2
---

# IDE Integrations

Use Claude Code within your favorite development environment.

## What This Page Covers

This page explains how to use Claude Code inside your IDE rather than (or in addition to) the terminal. You'll learn about extensions for VS Code, JetBrains, and browser-based development.

**Why use IDE integration?** The terminal CLI is powerful, but IDE integration adds visual diff review, click-to-accept changes, and context from your current selection. Many developers use both.

:::tip Terminal Works Without Any IDE Setup
You don't need IDE extensions to use Claude Code. The terminal CLI (`claude`) provides full functionality — reading files, writing code, running commands, and more. IDE integrations are optional enhancements for a more visual workflow.
:::

---

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

The VS Code extension provides a graphical interface for Claude Code with IDE-specific enhancements:

| Feature | Description |
|---------|-------------|
| **Inline Diffs** | See proposed changes in the editor |
| **Sidebar Panel** | Chat interface in the sidebar |
| **@ Mentions** | Reference files with `@filename` |
| **Multi-tab** | Multiple conversation windows |
| **Mode Switching** | Toggle plan/normal/auto-accept modes |
| **Checkpoints** | Visual checkpoint management |

### Keyboard Shortcuts

These shortcuts let you work with Claude Code without leaving your keyboard:

| Shortcut | Action |
|----------|--------|
| `Cmd+Shift+P` → "Claude" | Open command palette |
| `Cmd+K Cmd+C` | Open Claude Code panel |
| Selection + right-click | "Ask Claude about selection" |

### Diff Handling

When Claude proposes file changes, VS Code shows them as visual diffs. This lets you review exactly what will change before accepting:

- **Green** = additions
- **Red** = deletions
- Click **Accept** or **Reject** per file
- Use **Accept All** for batch approval

---

## JetBrains Plugin (Beta)

Works with IntelliJ IDEA, PyCharm, WebStorm, and other JetBrains IDEs.

### Installation

1. Open Settings → Plugins
2. Search "Claude Code"
3. Install and restart IDE

### Features

The JetBrains plugin integrates with native IDE features like the built-in diff viewer and diagnostics panel:

| Feature | Description |
|---------|-------------|
| **Quick Launch** | `Cmd+Esc` / `Ctrl+Esc` |
| **IDE Diff Viewer** | Native diff integration |
| **Selection Context** | Share highlighted code |
| **Diagnostics** | Auto-include errors |
| **File Reference** | `Cmd+Option+K` / `Alt+Ctrl+K` |

### MCP Integration

JetBrains 2025.2+ includes a native MCP server that exposes IDE features (refactoring, navigation, diagnostics) to Claude:

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

---

## Chrome Extension (Beta)

The Chrome extension enables Claude to interact with web browsers — useful for testing web applications, debugging frontend issues, or automating browser workflows.

### Launch

```bash
claude --chrome
```

### Capabilities

These capabilities let Claude see and interact with web pages like a human user would:

- **Navigate** — Open URLs, click elements
- **Inspect** — Read DOM, console logs
- **Fill Forms** — Automate input
- **Network** — Monitor requests
- **Record** — Capture interactions as GIFs
- **Debug** — Live DOM state inspection

### Limitations

The Chrome extension has some restrictions to be aware of:

- Chrome only (not Brave, Arc, Firefox)
- Not available in WSL
- Requires display access

### Example

This example shows Claude testing a login flow by actually interacting with the browser:

```
You: open the login page and test with invalid credentials

Claude: I'll launch Chrome and test the login flow.
[Opens Chrome, navigates to /login]
[Fills form with test@example.com / wrongpassword]
[Clicks submit, captures error message]

The login page shows: "Invalid credentials"
```

---

## Terminal Integration

Claude Code works in any terminal, but some terminals offer enhanced experiences with better rendering or shell integration:

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

---

## Remote Development

Claude Code works in remote environments, letting you develop on servers, containers, or cloud-based IDEs.

### SSH

```bash
ssh server "claude -p 'check disk usage'"
```

### VS Code Remote

The Claude Code extension works seamlessly with VS Code's remote development features:

- Remote SSH
- Dev Containers
- WSL
- GitHub Codespaces

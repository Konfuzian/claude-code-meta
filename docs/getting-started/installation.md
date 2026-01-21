---
sidebar_position: 1
---

# Installation

Get Claude Code up and running on your system.

This page walks you through installing Claude Code, authenticating, and verifying everything works. The process takes about 5 minutes.

## Requirements

Before you begin, make sure you have:

- **Node.js 18+** (for npm installation)
- **Claude Pro or Max subscription**, or direct Anthropic API access
- **Supported OS**: macOS, Linux, Windows (via WSL recommended)

## Installation Methods

Choose the method that matches your setup. npm is recommended for most users:

### npm (Global)

```bash
npm install -g @anthropic-ai/claude-code
```

### Homebrew (macOS)

```bash
brew install claude-code
```

### Direct Download

Download binaries from the [GitHub releases](https://github.com/anthropics/claude-code/releases).

## Authentication

Claude Code needs to authenticate to use Claude's API. There are two ways to do this:

**Option 1: OAuth (recommended)** — After installation, start Claude Code:

```bash
claude
```

On first run, Claude Code will open a browser for OAuth authentication. Log in with your Claude Pro/Max account. This is the easiest method.

**Option 2: API Key** — Set your API key as an environment variable:

```bash
export ANTHROPIC_API_KEY="your-api-key"
claude
```

This method is useful for CI/CD environments or if you prefer not to use OAuth.

## Verify Installation

Make sure everything is working:

```bash
claude --version
claude --help
```

## Model Selection

Claude Code supports multiple models. Each has different strengths:

| Model | Best For |
|-------|----------|
| Sonnet 4.5 | Default, balanced speed/quality — good for most tasks |
| Opus 4.5 | Complex tasks, planning — use when you need deeper reasoning |
| Haiku | Quick tasks, lower cost — fast responses for simple operations |

Switch models during a session with `/model` or configure a default in settings.

## Next Steps

- [Your First Session](/docs/getting-started/first-session) — Start using Claude Code
- [Configuration](/docs/getting-started/configuration) — Customize settings and CLAUDE.md

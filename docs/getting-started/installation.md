---
sidebar_position: 1
---

# Installation

Get Claude Code up and running on your system.

## Requirements

- **Node.js 18+** (for npm installation)
- **Claude Pro or Max subscription**, or direct Anthropic API access
- **Supported OS**: macOS, Linux, Windows (via WSL recommended)

## Installation Methods

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

After installation, authenticate with your Anthropic account:

```bash
claude
```

On first run, Claude Code will open a browser for OAuth authentication. Log in with your Claude Pro/Max account.

### API Key Authentication

Alternatively, set your API key directly:

```bash
export ANTHROPIC_API_KEY="your-api-key"
claude
```

## Verify Installation

```bash
claude --version
claude --help
```

## Model Selection

Claude Code supports multiple models:

| Model | Best For |
|-------|----------|
| Sonnet 4.5 | Default, balanced speed/quality |
| Opus 4.5 | Complex tasks, planning |
| Haiku | Quick tasks, lower cost |

Switch models with `/model` or via settings.

## Next Steps

- [Your First Session](/docs/getting-started/first-session) — Start using Claude Code
- [Configuration](/docs/getting-started/configuration) — Customize settings and CLAUDE.md

---
sidebar_position: 6
---

# Plugins

Share and distribute your skills and commands with the community.

## What This Page Covers

This page teaches you how to create, share, and install Claude Code plugins. You'll learn the plugin structure, how to package your skills for distribution, and how to use the plugin marketplace.

**Why create plugins?** Plugins let you share your best workflows with teammates or the community. Instead of copying markdown files between projects, you package them into installable plugins that others can add with a single command.

---

## What is a Plugin?

A plugin is a packaged collection of skills and commands that can be distributed and installed. Plugins extend Claude Code's capabilities without modifying its core — they're just organized collections of the skills and commands you already know how to create.

Key characteristics:
- **Shareable** — Distribute via GitHub, npm, or the marketplace
- **Versioned** — Track changes and ensure compatibility
- **Discoverable** — Users can find and install plugins easily
- **Composable** — Combine multiple skills into a cohesive package

---

## Plugin Structure

A plugin is a directory with a `plugin.json` manifest and one or more skills or commands:

```
my-plugin/
├── plugin.json           # Plugin manifest (required)
├── README.md             # Documentation (recommended)
├── commands/             # Custom commands
│   ├── lint.md
│   └── format.md
└── skills/               # Skills with supporting files
    └── code-review/
        ├── SKILL.md
        └── templates/
            └── review-template.md
```

### The plugin.json Manifest

The manifest defines your plugin's metadata and contents:

```json
{
  "name": "code-quality",
  "version": "1.0.0",
  "description": "Code quality tools for TypeScript projects",
  "author": "your-username",
  "repository": "https://github.com/your-username/code-quality-plugin",
  "keywords": ["typescript", "linting", "code-review"],
  "commands": [
    "commands/lint.md",
    "commands/format.md"
  ],
  "skills": [
    "skills/code-review"
  ],
  "dependencies": {
    "mcp-servers": ["github"]
  }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique plugin identifier (lowercase, hyphens allowed) |
| `version` | Yes | Semantic version (e.g., "1.0.0") |
| `description` | Yes | Short description of what the plugin does |
| `author` | No | Your username or organization |
| `repository` | No | URL to the plugin's source code |
| `keywords` | No | Tags for marketplace discovery |
| `commands` | No | Array of command file paths |
| `skills` | No | Array of skill directory paths |
| `dependencies` | No | Required MCP servers or other plugins |

---

## Creating Your First Plugin

This tutorial walks through creating a simple plugin from scratch.

### Step 1: Create the Plugin Directory

```bash
mkdir -p my-plugin/commands my-plugin/skills
cd my-plugin
```

### Step 2: Create the Manifest

Create `plugin.json`:

```json
{
  "name": "my-awesome-plugin",
  "version": "1.0.0",
  "description": "My first Claude Code plugin",
  "author": "your-username",
  "commands": [
    "commands/hello.md"
  ]
}
```

### Step 3: Add a Command

Create `commands/hello.md`:

```markdown
---
description: A friendly greeting command
---

Say hello to the user and introduce yourself as a helpful coding assistant.
Mention that this greeting comes from the my-awesome-plugin plugin.
```

### Step 4: Test Locally

Install your plugin locally to test it:

```
/plugin install ./my-plugin
```

Then try the command:

```
/hello
```

### Step 5: Iterate

Add more commands and skills as needed. Test each one before publishing.

---

## Adding Skills to Your Plugin

Skills provide more advanced functionality than simple commands. Here's how to add a skill to your plugin.

### Create the Skill Directory

```bash
mkdir -p my-plugin/skills/deploy
```

### Create SKILL.md

Create `skills/deploy/SKILL.md`:

```markdown
---
name: Deploy Helper
description: Assists with deployment workflows
triggers:
  - "deploy"
  - "push to production"
  - "release"
---

# Deploy Helper

When the user wants to deploy:

1. Check for uncommitted changes
2. Run the test suite
3. Build the project
4. Confirm deployment target with user
5. Execute deployment command

## Safety Checks

- Never deploy with failing tests
- Always confirm production deployments
- Check for environment variables
```

### Update the Manifest

Add the skill to `plugin.json`:

```json
{
  "name": "my-awesome-plugin",
  "version": "1.1.0",
  "description": "My first Claude Code plugin",
  "commands": ["commands/hello.md"],
  "skills": ["skills/deploy"]
}
```

---

## Including Supporting Files

Skills can include templates, examples, and other supporting files that Claude can reference.

### Example: Code Review Plugin with Templates

```
code-review-plugin/
├── plugin.json
└── skills/
    └── review/
        ├── SKILL.md
        ├── templates/
        │   ├── security-checklist.md
        │   ├── performance-checklist.md
        │   └── accessibility-checklist.md
        └── examples/
            ├── good-review.md
            └── bad-review.md
```

In your `SKILL.md`, reference these files:

```markdown
---
name: Code Review
description: Thorough code review with checklists
triggers:
  - "review code"
  - "code review"
---

# Code Review Skill

When reviewing code, use the checklists in the templates/ directory:

- **Security**: Check templates/security-checklist.md
- **Performance**: Check templates/performance-checklist.md
- **Accessibility**: Check templates/accessibility-checklist.md

See examples/ for good and bad review examples.
```

Claude will read these files when the skill is invoked, providing consistent, thorough reviews.

---

## Publishing Your Plugin

Once your plugin is ready, you can share it with others.

### Option 1: GitHub Repository

The simplest way to share a plugin:

1. Push your plugin to a GitHub repository
2. Others install it with:
   ```
   /plugin install github:your-username/your-plugin
   ```

### Option 2: npm Package

For wider distribution:

1. Add a `package.json` with `"type": "claude-plugin"`
2. Publish to npm: `npm publish`
3. Others install with:
   ```
   /plugin install npm:your-plugin-name
   ```

### Option 3: Plugin Marketplace

Submit to the official marketplace for maximum visibility:

1. Ensure your plugin meets the [quality guidelines](#plugin-quality-guidelines)
2. Submit for review:
   ```
   /plugin submit
   ```
3. Once approved, users can discover and install your plugin:
   ```
   /plugin marketplace
   ```

---

## Installing Plugins

### From the Marketplace

Browse and install community plugins:

```
/plugin marketplace
```

Or install directly by name:

```
/plugin install commit-helper@marketplace
```

### From GitHub

Install from any public repository:

```
/plugin install github:anthropics/claude-plugins-official
/plugin install github:username/repo-name
```

### From npm

Install published npm packages:

```
/plugin install npm:claude-plugin-typescript
```

### From Local Path

Install from a local directory (useful for development):

```
/plugin install ./path/to/my-plugin
```

---

## Managing Plugins

### List Installed Plugins

```
/plugin list
```

### Update Plugins

Update a specific plugin:

```
/plugin update plugin-name
```

Update all plugins:

```
/plugin update --all
```

### Remove Plugins

```
/plugin remove plugin-name
```

---

## Plugin Quality Guidelines

If you plan to submit to the marketplace, follow these guidelines:

### Required

- Clear, accurate `description` in manifest
- Working commands and skills (tested before submission)
- No malicious or harmful functionality
- Appropriate content (no spam, no offensive material)

### Recommended

- Comprehensive README with usage examples
- Semantic versioning for updates
- Meaningful keywords for discoverability
- Responsive to user feedback and issues

### Best Practices

- **Keep plugins focused** — One plugin should do one thing well
- **Document triggers clearly** — Users should know what phrases activate skills
- **Include examples** — Show sample inputs and outputs
- **Handle errors gracefully** — Provide helpful messages when things go wrong
- **Respect user privacy** — Don't collect or transmit user data

---

## Plugin Examples

### Example 1: Git Workflow Plugin

A plugin for common git operations:

```json
{
  "name": "git-workflow",
  "version": "1.0.0",
  "description": "Streamlined git workflows",
  "commands": [
    "commands/commit.md",
    "commands/pr.md",
    "commands/changelog.md"
  ],
  "skills": [
    "skills/release"
  ]
}
```

### Example 2: Testing Plugin

A plugin for test-driven development:

```json
{
  "name": "tdd-helper",
  "version": "1.0.0",
  "description": "Test-driven development assistance",
  "skills": [
    "skills/write-test",
    "skills/test-coverage",
    "skills/mutation-testing"
  ],
  "dependencies": {
    "mcp-servers": ["filesystem"]
  }
}
```

### Example 3: Documentation Plugin

A plugin for generating and maintaining docs:

```json
{
  "name": "docs-generator",
  "version": "1.0.0",
  "description": "Automated documentation generation",
  "commands": [
    "commands/docs.md",
    "commands/api-docs.md"
  ],
  "skills": [
    "skills/readme-writer"
  ],
  "keywords": ["documentation", "readme", "api-docs"]
}
```

---

## Troubleshooting

### Plugin Not Loading

1. Check that `plugin.json` is valid JSON
2. Verify all referenced files exist
3. Restart Claude Code after installation

### Commands Not Appearing

1. Ensure command files have `.md` extension
2. Check that paths in manifest are correct
3. Verify command files have valid frontmatter

### Skills Not Triggering

1. Check that `SKILL.md` exists in the skill directory
2. Verify trigger phrases are unique and specific
3. Test with exact trigger phrases first

---

## Learning Resources

- **[Skills & Custom Commands](./skills.md)** — Learn the basics of commands and skills before creating plugins
- **[MCP Integrations](./mcp-integrations.md)** — Add external tool dependencies to your plugins
- **[Skills Frameworks](../ecosystem/skills-frameworks.md)** — Community tools for building advanced plugins

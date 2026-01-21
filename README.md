# claude-code-meta

A community resource for Claude Code features, best practices, and ecosystem tools.

**Live Site**: [https://konfuzian.github.io/claude-code-meta](https://konfuzian.github.io/claude-code-meta)

## What's Inside

### Documentation
- **Getting Started** — Installation, first session, configuration
- **Features** — CLI commands, MCP integrations, IDE extensions, hooks, skills
- **Best Practices** — Workflow tips, context management, security, TDD

### Ecosystem Curation
- **Agent Orchestrators** — claude-flow, ralph-claude-code, awesome-claude-agents
- **Safety Tools** — claude-code-safety-net, battle-tested configs
- **Skills Frameworks** — superpowers, get-shit-done, ralph-wiggum technique
- **Awesome Resources** — Curated links and community resources

## Development

### Prerequisites
- Node.js 20+

### Install Dependencies
```bash
npm install
```

### Local Development
```bash
npm start
```

Opens [http://localhost:3000/claude-code-meta](http://localhost:3000/claude-code-meta)

### Build
```bash
npm run build
```

### Deploy
Deployment happens automatically via GitHub Actions when pushing to `main`.

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. **Verify the build works before pushing**:
   ```bash
   npm run build
   ```
5. Submit a pull request

### Build Verification

Always run `npm run build` before committing and pushing changes. The build will catch:
- MDX syntax errors (e.g., unescaped `<` characters that look like JSX)
- Broken internal links
- Invalid frontmatter
- Missing dependencies

If the build fails locally, it will also fail in CI and your changes won't deploy.

### Adding Ecosystem Tools
To add a new tool to the ecosystem section, edit the relevant file in `docs/ecosystem/`.

## Links

- [Official Claude Code Docs](https://code.claude.com/docs)
- [Anthropic](https://www.anthropic.com)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

## License

MIT

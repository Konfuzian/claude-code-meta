# CLAUDE.md

## Workflow

When done with work:
1. Run `npm run build` to verify the build passes
2. Commit changes
3. Push to remote

Don't ask for permission - just do it.

## What's New Section

When making significant changes to the documentation, update the What's New section:

1. **Update the changelog** (`docs/whats-new/changelog.md`):
   - Add entries under `[Unreleased]` section
   - Use categories: Added, Changed, Deprecated, Removed, Fixed, Security

2. **Update the index** (`docs/whats-new/index.md`):
   - Add notable updates to the "Latest Updates" section under the current month
   - Keep entries concise with bold titles

3. **Version bumping** (when releasing):
   - Move `[Unreleased]` entries to a new version heading with date
   - Update the Version History table in `docs/whats-new/index.md`
   - Follow [Semantic Versioning](https://semver.org/): MAJOR.MINOR.PATCH

## Common Issues

### MDX Syntax Errors

Unescaped `<` followed by numbers breaks the build (interpreted as JSX):
- `<10` → use `&lt;10`
- `<0.05ms` → use `&lt;0.05ms`

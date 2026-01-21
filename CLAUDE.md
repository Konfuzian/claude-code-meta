# CLAUDE.md

## Workflow

When done with work:
1. Run `npm run build` to verify the build passes
2. Commit changes
3. Push to remote

Don't ask for permission - just do it.

## Common Issues

### MDX Syntax Errors

Unescaped `<` followed by numbers breaks the build (interpreted as JSX):
- `<10` → use `&lt;10`
- `<0.05ms` → use `&lt;0.05ms`

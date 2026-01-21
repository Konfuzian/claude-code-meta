---
sidebar_position: 4
---

# Test-Driven Development with Claude

Use TDD principles to get better results from Claude Code.

## Why TDD Works with AI

Test-Driven Development provides:

1. **Clear specifications** — Tests define expected behavior
2. **Verification loops** — Immediate feedback on correctness
3. **Regression safety** — Catch when changes break things
4. **Measurable progress** — Tests pass = feature complete

AI assistants excel when they have clear success criteria. Tests provide exactly that.

## The TDD Loop with Claude

### 1. Write Tests First

```
You: I need a function that validates email addresses.
Here are the test cases:

- "test@example.com" → valid
- "user.name+tag@domain.org" → valid
- "invalid" → invalid
- "@nodomain.com" → invalid
- "spaces in@email.com" → invalid

Write the tests first, then implement.
```

### 2. Let Claude Implement

Claude writes both tests and implementation:

```typescript
// email.test.ts
describe('validateEmail', () => {
  it('accepts valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name+tag@domain.org')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('@nodomain.com')).toBe(false);
    expect(validateEmail('spaces in@email.com')).toBe(false);
  });
});

// email.ts
export function validateEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
```

### 3. Run Tests

```
You: run the tests
```

Claude runs tests and fixes failures until they pass.

## Providing Test Cases

### Input/Output Tables

```
You: Implement a price calculator with these cases:

| Input (items, discount%) | Output |
|-------------------------|--------|
| 100, 0 | 100 |
| 100, 10 | 90 |
| 100, 50 | 50 |
| 0, 10 | 0 |
```

### Edge Cases

```
You: Handle these edge cases:
- Empty array → return 0
- Negative numbers → throw error
- Non-numeric values → throw error
- Very large numbers → handle overflow
```

### Error Scenarios

```
You: Test error handling:
- Invalid API key → AuthError
- Network timeout → TimeoutError
- Rate limited → RateLimitError
- Server error → ServerError
```

## Explicit TDD Mode

Tell Claude you're doing TDD:

```
You: Let's use TDD for this feature.
1. I'll describe the behavior
2. You write failing tests
3. Then implement to make them pass
4. We'll refactor if needed

First feature: user registration that validates email and password strength.
```

## Testing Workflows

### New Feature TDD

```
You: New feature: shopping cart
Write tests for:
- Add item to cart
- Remove item from cart
- Update quantity
- Calculate total
- Apply discount code

Then implement to pass all tests.
```

### Bug Fix TDD

```
You: There's a bug where negative quantities are allowed.
First write a test that reproduces the bug:
- addToCart(item, -5) should throw
Then fix it.
```

### Refactoring with Tests

```
You: Refactor the payment module.
First run existing tests to ensure they pass.
After each change, run tests again.
Don't break any existing tests.
```

## Test Commands

### Run Tests Automatically

Add to hooks for auto-testing after changes:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write", "file_path": "src/**/*.ts" },
        "command": "npm test -- --related $FILE_PATH --passWithNoTests"
      }
    ]
  }
}
```

### Test Commands in CLAUDE.md

```markdown
## Testing
- Run all tests: `npm test`
- Run specific test: `npm test -- path/to/file.test.ts`
- Run with coverage: `npm test -- --coverage`
- Watch mode: `npm test -- --watch`
```

## Example: Full TDD Session

```
You: Let's TDD a rate limiter.

Requirements:
- Track requests per IP
- Limit: 100 requests per minute
- Return 429 when exceeded
- Reset after 1 minute

Start with the tests.

Claude: I'll write the tests first.
[Writes comprehensive test file]

You: Good, now implement.

Claude: [Implements RateLimiter class]
Running tests... 8/8 passing.

You: Add a test for the reset functionality with a mock timer.

Claude: [Adds test with jest.useFakeTimers()]
[Updates implementation if needed]
All tests passing.
```

## Tips for Better Results

1. **Be specific about inputs/outputs** — Tables work great
2. **Include edge cases upfront** — Don't let Claude forget them
3. **Match existing test patterns** — Check how tests are structured in the project
4. **Run tests frequently** — Don't wait until the end
5. **Test the test** — Verify tests actually fail before implementation

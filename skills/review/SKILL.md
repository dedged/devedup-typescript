---
name: review
description: >
  Perform a code review on recent changes. Checks correctness, security,
  performance, maintainability, testing, and standards compliance.
  Use before creating a PR.
argument-hint: "[scope]"
user-invocable: true
context: fork
agent: reviewer
---

# Review

Review the following: $ARGUMENTS

## Instructions

1. Identify the changes to review:
   - If a scope is specified, review those files/modules
   - If no scope is specified, default to `git diff main...HEAD`
2. For each change, evaluate against these dimensions:
   - **Correctness** — Does it match the spec?
   - **Security** — Input validation, injection, auth, secrets
   - **Performance** — Bottlenecks, N+1 queries, unnecessary allocations
   - **Maintainability** — Readability, naming, complexity, coupling
   - **Testing** — Coverage, edge cases, test quality
   - **Standards** — Type annotations, JSDoc, project patterns
3. Run tests with `npx vitest run` and check coverage
4. Run linting with `npx eslint .` and type checking with `npx tsc --noEmit`
5. Produce a structured review using the checklist at references/review-checklist.md

## Output Format

For each finding, report:
- **Severity**: critical / warning / suggestion / nitpick
- **Location**: file:line
- **Issue**: what's wrong
- **Recommendation**: how to fix it

End with a summary: overall assessment, finding counts by severity, top 3 items.

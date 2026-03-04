---
name: review
description: >
  Code review for Raid-Ledger. Checks correctness, security, performance,
  contract integrity, and standards using workspace-aware commands.
argument-hint: "[scope]"
user-invocable: true
context: fork
agent: reviewer
---

# Review

Review the following: $ARGUMENTS

## Instructions

1. Read Raid-Ledger documentation:
   - `CLAUDE.md` for project conventions
   - `project-context.md` for architecture overview
2. Identify the changes to review:
   - If a scope is specified, review those files/modules
   - If no scope is specified, default to `git diff main...HEAD`
3. For each change, evaluate against these dimensions:
   - **Correctness** — Does it match the spec?
   - **Security** — Input validation, injection, auth guards, secrets
   - **Performance** — N+1 queries, TanStack Query keys, allocations
   - **Maintainability** — Readability, naming, complexity, coupling
   - **Testing** — Coverage, edge cases, correct runner usage
   - **Standards** — Type annotations, JSDoc, project patterns
   - **Contract Integrity** — Schemas in contract, consistent imports
4. Run workspace-aware commands:
   - Tests: `npm run test -w api` and/or `npm run test -w web`
   - Lint: run `npx eslint .` from within each affected workspace directory
   - Type check: run `npx tsc --noEmit` from within each affected workspace
5. Produce a structured review using the checklist at references/review-checklist.md

## Output Format

For each finding, report:
- **Severity**: critical / warning / suggestion / nitpick
- **Location**: file:line
- **Issue**: what's wrong
- **Recommendation**: how to fix it

End with a summary: overall assessment, finding counts by severity, top 3 items.

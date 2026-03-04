# Code Review Checklist

Structured checklist for code review in the Raid-Ledger monorepo.

## 1. Correctness

- [ ] Implementation matches the spec
- [ ] All acceptance criteria are met
- [ ] Edge cases are handled
- [ ] No off-by-one errors
- [ ] No race conditions in concurrent/async code
- [ ] Contract schemas match between api and web usage
- [ ] Drizzle queries return expected shapes
- [ ] NestJS dependency injection is wired correctly

## 2. Security

- [ ] User input is validated at system boundaries (Zod via ZodValidationPipe)
- [ ] No SQL injection vectors (use Drizzle query builder, no raw SQL)
- [ ] No command injection
- [ ] No XSS vectors in React output (no `dangerouslySetInnerHTML`)
- [ ] No secrets or credentials in code
- [ ] NestJS guards applied to all protected endpoints (`@UseGuards`)
- [ ] Role-based access enforced where required
- [ ] Auth tokens handled securely (httpOnly cookies, no localStorage for sensitive data)

## 3. Performance

- [ ] No N+1 query patterns in Drizzle queries
- [ ] No unnecessary allocations in hot paths
- [ ] No blocking operations in async code
- [ ] TanStack Query keys are specific enough to avoid over-fetching
- [ ] Appropriate data structures chosen
- [ ] No unbounded loops or recursion

## 4. Maintainability

- [ ] Clear, descriptive naming (camelCase for variables/functions, PascalCase for types/classes)
- [ ] Functions are under 30 lines
- [ ] Files are under 300 lines
- [ ] Single responsibility per module
- [ ] No dead code or commented-out code
- [ ] No TODO/FIXME without a linked issue
- [ ] Drizzle schema changes have corresponding migrations

## 5. Testing

- [ ] Tests exist for new functionality
- [ ] Tests cover happy path and error paths
- [ ] Tests are deterministic (no flaky tests)
- [ ] Tests are independent (no order dependency)
- [ ] Mocking is limited to external dependencies
- [ ] Coverage meets 80% minimum
- [ ] Backend tests use `jest.fn()`, frontend tests use `vi.fn()`
- [ ] No runner mixing (Jest assertions in api, Vitest assertions in web)
- [ ] Test factories used for consistent test data

## 6. Standards

- [ ] Type annotations on all function signatures
- [ ] JSDoc comments on all exported functions
- [ ] Lint passes: `npx eslint . --cwd api` / `npx eslint . --cwd web`
- [ ] Type check passes: `npx tsc --noEmit -p api` / `npx tsc --noEmit -p web`
- [ ] Conventional commit messages
- [ ] No `console.log` statements (use NestJS Logger in api)
- [ ] Imports from `@raid-ledger/contract`, not direct paths

## 7. Contract Integrity

- [ ] New/modified Zod schemas are in `packages/contract`
- [ ] Contract changes are backwards-compatible (or migration plan documented)
- [ ] Contract is built before api/web changes depend on it
- [ ] Both api and web import the same schema version
- [ ] No duplicate type definitions across workspaces

## Finding Severity Guide

- **critical** — Bug, security vulnerability, data loss risk. Must fix before merge.
- **warning** — Design issue, missing test, performance concern. Should fix before merge.
- **suggestion** — Improvement opportunity. Consider for this PR or a follow-up.
- **nitpick** — Style preference, minor naming. Optional, do not block merge.

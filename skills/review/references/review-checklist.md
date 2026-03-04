# Code Review Checklist

Structured checklist for code review. Evaluate each dimension and report findings.

## 1. Correctness

- [ ] Implementation matches the spec
- [ ] All acceptance criteria are met
- [ ] Edge cases are handled
- [ ] No off-by-one errors
- [ ] No race conditions in concurrent/async code

## 2. Security

- [ ] User input is validated at system boundaries
- [ ] No SQL injection vectors (parameterized queries)
- [ ] No command injection (avoid `child_process` with user input, use `execFile`)
- [ ] No XSS vectors in any HTML output
- [ ] No secrets or credentials in code
- [ ] No hardcoded URLs or environment-specific values
- [ ] Dependencies are pinned to specific versions

## 3. Performance

- [ ] No N+1 query patterns
- [ ] No unnecessary allocations in hot paths
- [ ] No blocking operations in async code
- [ ] Appropriate data structures chosen
- [ ] No unbounded loops or recursion

## 4. Maintainability

- [ ] Clear, descriptive naming (camelCase for variables/functions, PascalCase for types/classes)
- [ ] Functions are under 30 lines
- [ ] Files are under 300 lines
- [ ] Single responsibility per module
- [ ] No dead code or commented-out code
- [ ] No TODO/FIXME without a linked issue

## 5. Testing

- [ ] Tests exist for new functionality
- [ ] Tests cover happy path and error paths
- [ ] Tests are deterministic (no flaky tests)
- [ ] Tests are independent (no order dependency)
- [ ] Mocking is limited to external dependencies
- [ ] Coverage meets 80% minimum

## 6. Standards

- [ ] Type annotations on all function signatures
- [ ] JSDoc comments on all exported functions
- [ ] `npx eslint .` passes with no errors
- [ ] `npx tsc --noEmit` passes with no errors
- [ ] Conventional commit messages
- [ ] No `console.log` statements (use structured logging)

## Finding Severity Guide

- **critical** — Bug, security vulnerability, data loss risk. Must fix before merge.
- **warning** — Design issue, missing test, performance concern. Should fix before merge.
- **suggestion** — Improvement opportunity. Consider for this PR or a follow-up.
- **nitpick** — Style preference, minor naming. Optional, do not block merge.

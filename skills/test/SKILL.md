---
name: test
description: >
  Write additional tests, perform fuzz testing, or audit test quality.
  Use to improve coverage, add property-based tests, fuzz inputs, or
  validate that existing tests are comprehensive.
argument-hint: "[scope]"
user-invocable: true
context: fork
agent: tester
---

# Test

Improve testing for: $ARGUMENTS

## Instructions

1. Analyze existing test coverage with `npx vitest --coverage`
2. Identify gaps in test coverage
3. Write additional tests based on the request:
   - **Unit tests** — isolated function/class testing with Vitest
   - **Integration tests** — component interaction testing
   - **Property-based tests** — fast-check driven invariant testing
   - **Fuzz tests** — boundary and malformed input testing
   - **Coverage audit** — identify and fill untested code paths
4. Run all tests to verify they pass
5. Report coverage summary and any bugs discovered

## Coverage Standards

- Minimum 80% line coverage for new code
- 100% coverage on critical paths (auth, payment, data validation)
- Tests must be deterministic, independent, and fast

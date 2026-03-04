---
name: test
description: >
  Write tests or audit coverage for Raid-Ledger. Uses Jest for api and Vitest
  for web. Reads TESTING.md for conventions and coverage thresholds.
argument-hint: "[scope]"
user-invocable: true
context: fork
agent: tester
---

# Test

Improve testing for: $ARGUMENTS

## Instructions

1. Read `TESTING.md` for testing conventions and coverage thresholds
2. Determine which workspace(s) are in scope (`api`, `web`, or both)
3. Analyze existing test coverage:
   - Backend: `npm run test:cov -w api`
   - Frontend: `npm run test:cov -w web`
4. Identify gaps in test coverage
5. Write additional tests based on the request:
   - **Backend (Jest):** NestJS testing module, repository mocks, factories
   - **Frontend (Vitest):** Testing Library, MSW, vitest-axe, render helpers
   - **Integration:** Testcontainers for real database tests
6. Run all tests to verify they pass
7. Report coverage summary per workspace and any bugs discovered

## Test Commands

- Backend tests: `npm run test -w api` (Jest)
- Backend coverage: `npm run test:cov -w api`
- Frontend tests: `npm run test -w web` (Vitest)
- Frontend coverage: `npm run test:cov -w web`

## Coverage Standards

- 80% minimum line coverage per workspace
- 100% coverage on critical paths (auth, payments, data validation)
- Tests must be deterministic, independent, and fast
- NEVER mix runners — `jest.fn()` in api, `vi.fn()` in web

---
name: implement
description: >
  Implement a Raid-Ledger feature from a spec using TDD. Handles contract
  schemas, NestJS backend, and React frontend with workspace-aware test commands.
argument-hint: "[feature-name]"
user-invocable: true
context: fork
agent: implementer
---

# Implement

Implement the following using strict TDD: $ARGUMENTS

## Instructions

1. Read the relevant spec from `docs/specs/`
2. If contract changes are needed:
   a. Write/update Zod schemas in `packages/contract/src/schemas/`
   b. Export from `packages/contract/src/index.ts`
   c. Build contract: `npm run build -w packages/contract`
3. Follow strict TDD: red -> green -> refactor
4. For each behavior in the spec:
   a. Write a failing test first
   b. Run the test to confirm it fails
   c. Write minimum code to pass the test
   d. Run the test to confirm it passes
   e. Refactor if needed while keeping tests green
5. Follow project patterns from references/typescript-patterns.md
6. Follow file organization from references/project-structure.md

## Prerequisites

A spec should exist in `docs/specs/`. If no spec exists, inform the user and
suggest running `/devedup-rl:spec` first.

## Test Commands

- Backend: `npm run test -w api` (Jest)
- Frontend: `npm run test -w web` (Vitest)
- NEVER use `npx vitest run` for backend — api uses Jest
- NEVER use `jest` for frontend — web uses Vitest

## Standards

- Explicit type annotations on all function signatures
- JSDoc comments on all exported functions
- Maximum function length: 30 lines
- Maximum file length: 300 lines
- Import shared types from `@raid-ledger/contract`

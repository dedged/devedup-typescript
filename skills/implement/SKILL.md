---
name: implement
description: >
  Implement a feature from a spec using TDD (test-driven development).
  Always writes failing tests first, then implementation, then refactors.
  Use when ready to write code for a specified feature.
argument-hint: "[feature-name]"
user-invocable: true
context: fork
agent: implementer
---

# Implement

Implement the following using strict TDD: $ARGUMENTS

## Instructions

1. Read the relevant spec from `docs/specs/`
2. Follow strict TDD: red -> green -> refactor
3. For each behavior in the spec:
   a. Write a failing test first
   b. Run the test to confirm it fails
   c. Write minimum code to pass the test
   d. Run the test to confirm it passes
   e. Refactor if needed while keeping tests green
4. Follow project patterns from references/typescript-patterns.md
5. Follow file organization from references/project-structure.md

## Prerequisites

A spec should exist in `docs/specs/`. If no spec exists, inform the user and
suggest running `/devedup-typescript:spec` first.

## Standards

- Explicit type annotations on all function signatures
- JSDoc comments on all exported functions
- Maximum function length: 30 lines
- Maximum file length: 300 lines
- Run `npx vitest run` after every change

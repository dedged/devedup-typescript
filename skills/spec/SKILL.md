---
name: spec
description: >
  Create a detailed technical specification for Raid-Ledger. Covers contract
  layer (Zod schemas), NestJS module structure, and React component hierarchy.
argument-hint: "[feature-name]"
user-invocable: true
context: fork
agent: spec-writer
---

# Spec

Create a technical specification for: $ARGUMENTS

## Instructions

1. Read Raid-Ledger documentation first:
   - `CLAUDE.md` for project conventions
   - `project-context.md` for architecture overview
   - `TESTING.md` for testing approach
2. Read the relevant plan from `docs/plans/`
3. Define Zod schemas for the contract layer (`packages/contract`)
4. Specify NestJS module structure (controller, service, repository, guards)
5. Specify React component hierarchy (components, hooks, stores, forms)
6. Write testable acceptance criteria with Given/When/Then scenarios
7. Save the spec to `docs/specs/<feature-name>.md` using the spec template

## Prerequisites

A plan should exist in `docs/plans/` before writing a spec. If no plan exists,
inform the user and suggest running `/devedup-rl:plan` first.

## Spec Template

Use the template at skills/spec/references/spec-template.md as the output format.

## Output Location

Specs are saved to `docs/specs/` in the project root. Create the directory if it
does not exist.

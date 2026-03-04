---
name: spec
description: >
  Create a detailed technical specification from an existing plan. Use after
  planning to produce implementation-ready specs with API contracts, data models,
  and test scenarios.
argument-hint: "[feature-name]"
user-invocable: true
context: fork
agent: spec-writer
---

# Spec

Create a technical specification for: $ARGUMENTS

## Instructions

1. Read the relevant plan from `docs/plans/`
2. Transform the plan into a detailed technical specification
3. Define API contracts, data models, and interfaces
4. Write testable acceptance criteria with Given/When/Then scenarios
5. Save the spec to `docs/specs/<feature-name>.md` using the spec template

## Prerequisites

A plan should exist in `docs/plans/` before writing a spec. If no plan exists,
inform the user and suggest running `/devedup-typescript:plan` first.

## Spec Template

Use the template at skills/spec/references/spec-template.md as the output format.

## Output Location

Specs are saved to `docs/specs/` in the project root. Create the directory if it
does not exist.

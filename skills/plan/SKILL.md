---
name: plan
description: >
  Create a structured feature plan for Raid-Ledger. Reads RL docs first,
  identifies affected workspaces and contract changes, then produces milestones
  with acceptance criteria.
argument-hint: "[feature-name]"
user-invocable: true
context: fork
agent: planner
---

# Plan

Create a structured plan for: $ARGUMENTS

## Instructions

1. Read Raid-Ledger documentation first:
   - `CLAUDE.md` for project conventions
   - `project-context.md` for architecture overview
   - `TESTING.md` for testing approach
2. Gather context by reading existing code, docs, and requirements
3. Identify which workspaces are affected (`packages/contract`, `api`, `web`)
4. Identify contract changes (new/modified Zod schemas needed)
5. Research relevant patterns, libraries, and prior art
6. Break the work into milestones (contract first, then api/web)
7. Save the plan to `docs/plans/<feature-name>.md` using the plan template

## Plan Template

Use the template at skills/plan/references/plan-template.md as the output format.

## Output Location

Plans are saved to `docs/plans/` in the project root. Create the directory if it
does not exist.

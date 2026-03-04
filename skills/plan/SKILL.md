---
name: plan
description: >
  Create a structured project or feature plan. Use when starting a new project,
  planning a feature, or making architectural decisions. Produces milestones,
  technical decisions, and risk assessment.
argument-hint: "[feature-name]"
user-invocable: true
context: fork
agent: planner
---

# Plan

Create a structured plan for: $ARGUMENTS

## Instructions

1. Gather context by reading existing code, docs, and requirements in this project
2. Research relevant patterns, libraries, and prior art
3. Identify constraints, dependencies, and trade-offs
4. Break the work into milestones with clear deliverables
5. Save the plan to `docs/plans/<feature-name>.md` using the plan template

## Plan Template

Use the template at skills/plan/references/plan-template.md as the output format.

## Output Location

Plans are saved to `docs/plans/` in the project root. Create the directory if it
does not exist.

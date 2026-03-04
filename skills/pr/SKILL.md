---
name: pr
description: >
  Generate a pull request description from the current branch changes.
  Summarizes changes, testing status, and links to relevant specs.
  Use when ready to open a PR.
argument-hint: "[options]"
user-invocable: true
context: fork
agent: pr-writer
---

# PR

Generate a pull request: $ARGUMENTS

## Instructions

1. Run `git diff main...HEAD --stat` to understand scope
2. Run `git log main...HEAD --oneline` to read commit history
3. Read changed files to understand the changes
4. Read the relevant spec file from `docs/specs/` if one exists
5. Generate a structured PR description using the template at references/pr-template.md
6. If `gh` CLI is available and the user requests it, create the PR with `gh pr create`

## Options

- Default: generate PR description and display it
- "and create it on GitHub": also run `gh pr create`
- "targeting <branch>": specify a non-default base branch

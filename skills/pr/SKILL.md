---
name: pr
description: >
  Generate a Raid-Ledger pull request description grouped by workspace.
  Includes dual test runner checklist and auto-merge reminder.
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
4. Identify which workspaces are affected (`packages/contract`, `api`, `web`)
5. Read the relevant spec file from `docs/specs/` if one exists
6. Generate a workspace-grouped PR description using the template at references/pr-template.md
7. If `gh` CLI is available and the user requests it:
   a. Create the PR with `gh pr create`
   b. Enable auto-merge: `gh pr merge --auto --squash`

## Options

- Default: generate PR description and display it
- "and create it on GitHub": also run `gh pr create` and enable auto-merge
- "targeting <branch>": specify a non-default base branch

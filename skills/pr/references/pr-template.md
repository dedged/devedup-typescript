# PR Template

Use this template when generating pull request descriptions for the Raid-Ledger monorepo.

## Format

    ## Summary
    [1-2 sentence overview of what this PR does and why]

    ## Changes

    ### `packages/contract`
    - [Changes to shared schemas/types, or "No changes"]

    ### `api`
    - [Backend changes, or "No changes"]

    ### `web`
    - [Frontend changes, or "No changes"]

    ## Testing

    ### Backend (Jest)
    - [ ] `npm run test -w api` — all passing
    - [ ] `npm run test:cov -w api` — meets 80% threshold

    ### Frontend (Vitest)
    - [ ] `npm run test -w web` — all passing
    - [ ] `npm run test:cov -w web` — meets 80% threshold

    ## Checklist
    - [ ] Contract built before api/web (`npm run build -w packages/contract`)
    - [ ] Type checking passes (`npx tsc --noEmit` per workspace)
    - [ ] Linting passes (`npx eslint .` per workspace)
    - [ ] No secrets committed
    - [ ] Auto-merge enabled (`gh pr merge --auto --squash`)

## Guidelines

- Keep the summary to 1-2 sentences focused on "what" and "why"
- Group changes by workspace (contract / api / web)
- Omit workspace sections with no changes
- Include specific test commands that were run
- Reference the spec file if one exists: `See docs/specs/<name>.md`
- Never include generated code in the description
- Reviewers skim PRs — be concise
- Remind about auto-merge squash if appropriate

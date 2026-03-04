# PR Template

Use this template when generating pull request descriptions.

## Format

    ## Summary
    [1-2 sentence overview of what this PR does and why]

    ## Changes
    - [Bulleted list of meaningful changes, grouped by component]

    ## Testing
    - [How this was tested]
    - [Coverage status]

    ## Checklist
    - [ ] Tests pass (`npx vitest run`)
    - [ ] Type checking passes (`npx tsc --noEmit`)
    - [ ] Linting passes (`npx eslint .`)
    - [ ] JSDoc comments updated
    - [ ] No secrets committed

## Guidelines

- Keep the summary to 1-2 sentences focused on "what" and "why"
- Group changes by component or module
- Include specific test commands that were run
- Reference the spec file if one exists: `See docs/specs/<name>.md`
- Never include generated code in the description
- Reviewers skim PRs — be concise

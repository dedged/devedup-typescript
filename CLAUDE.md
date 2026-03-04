# Dev Toolkit Conventions

## Language & Runtime
- TypeScript 5.x with strict mode
- Runtime: Node.js 20+
- Package management: `npm`
- Project config: `package.json` + `tsconfig.json`

## Code Standards
- Formatter: Prettier
- Linter: ESLint (with typescript-eslint)
- Type checker: `tsc --noEmit` (strict mode)
- All exported functions must have JSDoc comments
- All function signatures must have explicit type annotations
- Maximum line length: 100 characters (Prettier default)

## Testing
- Framework: Vitest
- Property testing: fast-check
- Coverage: vitest --coverage with 80% minimum
- Test naming: `<function> > <scenario> > <expected>` (describe/it blocks)
- Prefer test factories over complex setup

## Git
- Branch naming: `feature/<name>`, `fix/<name>`, `chore/<name>`
- Commit messages: conventional commits (feat:, fix:, test:, docs:, chore:)
- Always work on a feature branch, never commit directly to main

## Project Documentation
- Plans go in `docs/plans/`
- Specs go in `docs/specs/`
- ADRs (Architecture Decision Records) go in `docs/adr/`

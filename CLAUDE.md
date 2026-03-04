# Raid-Ledger Conventions

## Monorepo Structure
- Workspaces: `packages/contract`, `api`, `web`
- Package manager: `npm` with workspaces
- Build order: `packages/contract` first, then `api` and `web` in parallel
- Shared types/schemas live in `@raid-ledger/contract`

## Language & Runtime
- TypeScript 5.x with strict mode
- Runtime: Node.js 20+
- Backend: NestJS (api workspace)
- Frontend: React + Vite (web workspace)
- ORM: Drizzle (api workspace)
- Validation: Zod (packages/contract)

## Code Standards
- Formatter: Prettier
- Linter: ESLint (workspace-scoped configs)
- Type checker: `tsc --noEmit` (per workspace)
- All exported functions must have JSDoc comments
- All function signatures must have explicit type annotations

## Testing (Dual Runners)
- Backend (api): Jest + NestJS testing module
  - Run: `npm run test -w api`
  - Coverage: `npm run test:cov -w api`
- Frontend (web): Vitest + Testing Library
  - Run: `npm run test -w web`
  - Coverage: `npm run test:cov -w web`
- Coverage thresholds: 80% minimum, 100% for critical paths (auth, payments)
- NEVER mix runners — use `jest.fn()` in api, `vi.fn()` in web

## Git
- Branch naming: `feature/<name>`, `fix/<name>`, `chore/<name>`
- Commit messages: conventional commits (feat:, fix:, test:, docs:, chore:)
- Always work on a feature branch, never commit directly to main
- PRs auto-merge with squash: `gh pr merge --auto --squash`

## Project Documentation
- Raid-Ledger docs: `CLAUDE.md`, `TESTING.md`, `project-context.md`
- Plans go in `docs/plans/`
- Specs go in `docs/specs/`
- ADRs (Architecture Decision Records) go in `docs/adr/`

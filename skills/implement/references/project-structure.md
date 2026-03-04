# Raid-Ledger Project Structure

Monorepo layout for the Raid-Ledger project.

## Layout

    raid-ledger/
    ├── packages/
    │   └── contract/                    # Shared Zod schemas & types
    │       ├── src/
    │       │   ├── schemas/
    │       │   │   ├── raid.ts
    │       │   │   ├── loot.ts
    │       │   │   └── user.ts
    │       │   └── index.ts             # Re-exports all schemas
    │       ├── package.json
    │       └── tsconfig.json
    ├── api/                             # NestJS backend
    │   ├── src/
    │   │   ├── app.module.ts
    │   │   ├── main.ts
    │   │   ├── drizzle/
    │   │   │   ├── db.ts                # Drizzle client
    │   │   │   ├── schema/              # Drizzle table definitions
    │   │   │   └── migrations/
    │   │   ├── auth/
    │   │   │   ├── auth.module.ts
    │   │   │   ├── auth.controller.ts
    │   │   │   ├── auth.service.ts
    │   │   │   └── jwt-auth.guard.ts
    │   │   ├── [feature]/
    │   │   │   ├── [feature].module.ts
    │   │   │   ├── [feature].controller.ts
    │   │   │   ├── [feature].service.ts
    │   │   │   ├── [feature].repository.ts
    │   │   │   └── dto/
    │   │   └── pipes/
    │   │       └── zod-validation.pipe.ts
    │   ├── test/
    │   │   ├── [feature].spec.ts        # Unit tests (Jest)
    │   │   ├── [feature].e2e-spec.ts    # E2E tests
    │   │   └── factories/               # Test factories
    │   ├── jest.config.ts
    │   ├── package.json
    │   └── tsconfig.json
    ├── web/                             # React frontend
    │   ├── src/
    │   │   ├── main.tsx
    │   │   ├── App.tsx
    │   │   ├── components/
    │   │   │   ├── ui/                  # Shadcn components
    │   │   │   └── [feature]/
    │   │   ├── hooks/
    │   │   │   └── use-[feature].ts     # TanStack Query hooks
    │   │   ├── pages/
    │   │   │   └── [feature]/
    │   │   ├── stores/
    │   │   │   └── [feature].store.ts   # Zustand stores
    │   │   ├── lib/
    │   │   │   └── api.ts               # Axios instance
    │   │   └── test/
    │   │       ├── helpers/
    │   │       │   └── render.tsx        # Custom render with providers
    │   │       └── mocks/
    │   │           └── handlers.ts      # MSW handlers
    │   ├── vitest.config.ts
    │   ├── package.json
    │   └── tsconfig.json
    ├── docs/
    │   ├── plans/
    │   ├── specs/
    │   └── adr/
    ├── CLAUDE.md                        # Project conventions for agents
    ├── TESTING.md                       # Testing guide
    ├── project-context.md               # Architecture overview
    ├── package.json                     # Root workspace config
    └── turbo.json                       # Build orchestration

## Conventions

### `packages/contract`
- All Zod schemas exported from `src/index.ts`
- Published as `@raid-ledger/contract` via npm workspaces
- Must be built before api/web: `npm run build -w packages/contract`
- No test runner — validated by TypeScript compiler

### `api` (NestJS)
- One module per feature domain (raids, loot, users, auth)
- Repository pattern for Drizzle queries (no raw SQL in services)
- Zod validation via `ZodValidationPipe` using contract schemas
- Guards for auth (`JwtAuthGuard`, role guards)
- Test runner: Jest (`npm run test -w api`)
- Test files: `*.spec.ts` in `test/` directory

### `web` (React)
- Pages in `src/pages/[feature]/`
- Feature components in `src/components/[feature]/`
- Server state: TanStack Query hooks in `src/hooks/`
- Client state: Zustand stores in `src/stores/`
- Forms: React Hook Form + Zod resolver (schemas from contract)
- UI: Shadcn components in `src/components/ui/`
- Test runner: Vitest (`npm run test -w web`)
- Test files: `*.test.tsx` colocated with components

### Configuration
- Root `package.json` defines workspaces
- Each workspace has its own `tsconfig.json` and `package.json`
- `turbo.json` defines build pipeline and dependencies

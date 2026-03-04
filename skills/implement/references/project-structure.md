# Project Structure

Standard directory layout for TypeScript projects built with this toolkit.

## Layout

    project-name/
    ├── src/
    │   ├── models/
    │   │   └── ...
    │   ├── services/
    │   │   └── ...
    │   ├── utils/
    │   │   └── ...
    │   ├── index.ts
    │   └── cli.ts
    ├── tests/
    │   ├── setup.ts
    │   ├── unit/
    │   │   └── ...
    │   ├── integration/
    │   │   └── ...
    │   └── fixtures/
    │       └── ...
    ├── docs/
    │   ├── plans/
    │   ├── specs/
    │   └── adr/
    ├── package.json
    ├── tsconfig.json
    ├── eslint.config.js
    ├── .prettierrc
    ├── vitest.config.ts
    ├── CLAUDE.md
    └── README.md

## Conventions

### Source Code (`src/`)

- Use the `src` layout with TypeScript compilation to `dist/`
- `models/` — TypeScript interfaces, Zod schemas, type definitions
- `services/` — business logic, external integrations
- `utils/` — shared helpers (keep small, avoid becoming a dumping ground)
- `index.ts` — main entry point and public API exports
- `cli.ts` — entry point for CLI applications using commander

### Tests (`tests/`)

- Mirror the source structure: `tests/unit/<module>.test.ts`
- `setup.ts` — shared test setup and global configuration
- `unit/` — fast, isolated tests (no I/O, no network)
- `integration/` — tests with real dependencies (separate describe blocks or files)
- `fixtures/` — test data files (JSON, sample inputs)

### Documentation (`docs/`)

- `plans/` — feature and project plans
- `specs/` — technical specifications
- `adr/` — architecture decision records

### Configuration

- `package.json` — project metadata, dependencies, and scripts
- `tsconfig.json` — TypeScript compiler options (strict mode)
- `eslint.config.js` — ESLint flat config with typescript-eslint
- `.prettierrc` — Prettier formatting options
- `vitest.config.ts` — Vitest test runner configuration

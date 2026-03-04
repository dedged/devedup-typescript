# Spec: [Feature/Module Name]

**Plan:** [Link to plan]
**Date:** YYYY-MM-DD
**Status:** draft | approved | implemented

## Overview

[1-2 paragraph description of this module/feature]

## Contract Layer (`packages/contract`)

Define all shared types and Zod schemas that will live in `@raid-ledger/contract`:

    // packages/contract/src/schemas/[feature].ts
    import { z } from "zod";

    export const ExampleSchema = z.object({
      id: z.string().uuid(),
      name: z.string().min(1).max(100),
      status: z.enum(["active", "inactive"]),
    });

    export type Example = z.infer<typeof ExampleSchema>;

## NestJS Module Spec (`api`)

### Module Structure

- **Module:** `[FeatureName]Module`
- **Controller:** `[FeatureName]Controller`
- **Service:** `[FeatureName]Service`
- **Repository / Drizzle queries:** `[feature].repository.ts`

### API Endpoints

#### `METHOD /api/[resource]`

- **Description:** What it does
- **Auth:** Guard / role requirement
- **Request body:** `ExampleSchema` (from contract)
- **Response:** `ExampleResponseDto`
- **Errors:**
  - `400` — validation failure
  - `401` — unauthorized
  - `404` — not found

### Drizzle Schema

    // api/src/drizzle/schema/[feature].ts
    export const examples = pgTable("examples", {
      id: uuid("id").primaryKey().defaultRandom(),
      name: varchar("name", { length: 100 }).notNull(),
    });

## React Component Spec (`web`)

### Component Hierarchy

    [FeatureName]Page
    ├── [FeatureName]List
    │   └── [FeatureName]Card
    └── [FeatureName]Form

### State Management

- **Server state:** TanStack Query hooks (`use[Feature]Query`, `use[Feature]Mutation`)
- **Client state:** Zustand store (if needed)
- **Form state:** React Hook Form + Zod resolver (schema from contract)

### UI Components

- Shadcn components used: [list]
- Accessibility requirements: [WCAG level, aria labels]

## Behavior Specifications

### Scenario: [Name]

- **Given:** [precondition]
- **When:** [action]
- **Then:** [expected result]

### Scenario: [Name]

- **Given:** [precondition]
- **When:** [action]
- **Then:** [expected result]

## Error Handling Matrix

| Error Condition | Error Type | HTTP Status | User Message |
|-----------------|------------|-------------|--------------|
|                 |            |             |              |

## Dependencies

- **Contract:** [schemas this depends on]
- **API internal:** [modules/services]
- **Web internal:** [components/hooks]
- **External:** [packages/services]

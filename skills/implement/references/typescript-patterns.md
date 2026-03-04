# Raid-Ledger Patterns

Patterns and conventions for the Raid-Ledger monorepo.

## Contract Patterns (`packages/contract`)

### Zod Schemas

All shared types are defined as Zod schemas in `packages/contract/src/schemas/`:

    import { z } from "zod";

    export const CreateRaidSchema = z.object({
      name: z.string().min(1).max(100),
      date: z.coerce.date(),
      participants: z.array(z.string().uuid()).min(1),
    });

    export type CreateRaid = z.infer<typeof CreateRaidSchema>;

### Export Convention

Re-export from `packages/contract/src/index.ts`:

    export * from "./schemas/raid";
    export * from "./schemas/loot";

Import in api/web as:

    import { CreateRaidSchema, type CreateRaid } from "@raid-ledger/contract";

## Backend Patterns (`api` — NestJS + Drizzle)

### Module Structure

    api/src/[feature]/
    ├── [feature].module.ts
    ├── [feature].controller.ts
    ├── [feature].service.ts
    ├── [feature].repository.ts    # Drizzle queries
    └── dto/
        └── [feature].dto.ts       # Response DTOs

### Controller

    import { Controller, Post, Body, UseGuards } from "@nestjs/common";
    import { JwtAuthGuard } from "../auth/jwt-auth.guard";
    import { CreateRaidSchema, type CreateRaid } from "@raid-ledger/contract";
    import { ZodValidationPipe } from "../pipes/zod-validation.pipe";

    @Controller("raids")
    @UseGuards(JwtAuthGuard)
    export class RaidsController {
      constructor(private readonly raidsService: RaidsService) {}

      @Post()
      async create(
        @Body(new ZodValidationPipe(CreateRaidSchema)) dto: CreateRaid,
      ) {
        return this.raidsService.create(dto);
      }
    }

### Drizzle Queries

    import { db } from "../drizzle/db";
    import { raids } from "../drizzle/schema/raids";
    import { eq } from "drizzle-orm";

    export class RaidsRepository {
      async findById(id: string) {
        const [raid] = await db
          .select()
          .from(raids)
          .where(eq(raids.id, id));
        return raid ?? null;
      }

      async create(data: NewRaid) {
        const [raid] = await db.insert(raids).values(data).returning();
        return raid;
      }
    }

### Drizzle Schema

    import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

    export const raids = pgTable("raids", {
      id: uuid("id").primaryKey().defaultRandom(),
      name: varchar("name", { length: 100 }).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
    });

### Error Handling

Use NestJS built-in exceptions:

    import { NotFoundException, BadRequestException } from "@nestjs/common";

    throw new NotFoundException(`Raid ${id} not found`);

## Frontend Patterns (`web` — React + TanStack Query + Zustand + Shadcn)

### TanStack Query Hooks

    import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
    import { type Raid } from "@raid-ledger/contract";

    export function useRaidsQuery() {
      return useQuery<Raid[]>({
        queryKey: ["raids"],
        queryFn: () => api.get("/raids").then((r) => r.data),
      });
    }

    export function useCreateRaidMutation() {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (data: CreateRaid) => api.post("/raids", data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["raids"] });
        },
      });
    }

### Zustand Store (client-only state)

    import { create } from "zustand";

    interface UiStore {
      sidebarOpen: boolean;
      toggleSidebar: () => void;
    }

    export const useUiStore = create<UiStore>((set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    }));

### React Hook Form + Zod

    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { CreateRaidSchema, type CreateRaid } from "@raid-ledger/contract";

    export function RaidForm() {
      const form = useForm<CreateRaid>({
        resolver: zodResolver(CreateRaidSchema),
      });
      // ...
    }

### Shadcn Components

Use Shadcn UI components from `@/components/ui/`:

    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import {
      Card,
      CardContent,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";

## Cross-Cutting

### Build Order

Always build contract first when contract schemas change:

    npm run build -w packages/contract
    # Then api and web can consume the updated types

### Import Rules

- api/web import from `@raid-ledger/contract` — never import directly from `packages/contract/src`
- api never imports from web, web never imports from api
- Shared UI components live in `web/src/components/ui/` (Shadcn)
- Shared hooks live in `web/src/hooks/`

### Function Guidelines

- Maximum 30 lines per function
- Explicit return types on all exported functions
- JSDoc comments on all exported functions
- Maximum file length: 300 lines

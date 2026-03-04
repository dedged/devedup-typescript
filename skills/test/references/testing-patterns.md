# Raid-Ledger Testing Patterns

Dual test runner patterns for the Raid-Ledger monorepo.

## Backend Testing (`api` — Jest)

### Unit Tests

Use NestJS testing module to create isolated test instances:

    import { Test, TestingModule } from "@nestjs/testing";
    import { RaidsService } from "./raids.service";
    import { RaidsRepository } from "./raids.repository";

    describe("RaidsService", () => {
      let service: RaidsService;
      let repository: jest.Mocked<RaidsRepository>;

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            RaidsService,
            {
              provide: RaidsRepository,
              useValue: {
                findById: jest.fn(),
                create: jest.fn(),
              },
            },
          ],
        }).compile();

        service = module.get(RaidsService);
        repository = module.get(RaidsRepository);
      });

      it("returns null when raid not found", async () => {
        repository.findById.mockResolvedValue(null);
        const result = await service.findById("nonexistent");
        expect(result).toBeNull();
      });
    });

### Drizzle Mocking

Mock Drizzle queries by mocking the repository layer:

    const mockRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
    };

Never mock Drizzle internals (`db.select().from()...`). Mock at the repository boundary.

### Test Factories

Use factories to create consistent test data:

    // test/factories/raid.factory.ts
    import { type Raid } from "@raid-ledger/contract";

    export function buildRaid(overrides: Partial<Raid> = {}): Raid {
      return {
        id: "test-uuid",
        name: "Test Raid",
        date: new Date("2024-01-01"),
        participants: [],
        ...overrides,
      };
    }

### Controller Tests

    import { Test } from "@nestjs/testing";
    import { RaidsController } from "./raids.controller";
    import { RaidsService } from "./raids.service";

    describe("RaidsController", () => {
      let controller: RaidsController;
      let service: jest.Mocked<RaidsService>;

      beforeEach(async () => {
        const module = await Test.createTestingModule({
          controllers: [RaidsController],
          providers: [
            {
              provide: RaidsService,
              useValue: { create: jest.fn(), findById: jest.fn() },
            },
          ],
        }).compile();

        controller = module.get(RaidsController);
        service = module.get(RaidsService);
      });
    });

### Running Backend Tests

    npm run test -w api               # Run all tests
    npm run test:cov -w api           # Run with coverage
    npm run test -- --watch -w api    # Watch mode

## Frontend Testing (`web` — Vitest)

### Component Tests (Testing Library)

    import { describe, it, expect } from "vitest";
    import { screen } from "@testing-library/react";
    import userEvent from "@testing-library/user-event";
    import { renderWithProviders } from "../test/helpers/render";
    import { RaidCard } from "./RaidCard";

    describe("RaidCard", () => {
      it("renders raid name", () => {
        renderWithProviders(<RaidCard name="Dragon Raid" />);
        expect(screen.getByText("Dragon Raid")).toBeInTheDocument();
      });

      it("calls onDelete when delete button clicked", async () => {
        const user = userEvent.setup();
        const onDelete = vi.fn();
        renderWithProviders(<RaidCard name="Test" onDelete={onDelete} />);

        await user.click(screen.getByRole("button", { name: /delete/i }));
        expect(onDelete).toHaveBeenCalledOnce();
      });
    });

### Custom Render Helper

Wrap components with required providers (QueryClient, Router, etc.):

    // web/src/test/helpers/render.tsx
    import { render } from "@testing-library/react";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { MemoryRouter } from "react-router-dom";

    export function renderWithProviders(ui: React.ReactElement) {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });
      return render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>{ui}</MemoryRouter>
        </QueryClientProvider>,
      );
    }

### MSW (Mock Service Worker)

Mock API requests at the network level:

    // web/src/test/mocks/handlers.ts
    import { http, HttpResponse } from "msw";

    export const handlers = [
      http.get("/api/raids", () => {
        return HttpResponse.json([
          { id: "1", name: "Dragon Raid" },
        ]);
      }),
    ];

### Accessibility Testing (vitest-axe)

    import { axe, toHaveNoViolations } from "vitest-axe";

    expect.extend(toHaveNoViolations);

    it("has no accessibility violations", async () => {
      const { container } = renderWithProviders(<RaidCard name="Test" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

### Running Frontend Tests

    npm run test -w web               # Run all tests
    npm run test:cov -w web           # Run with coverage
    npm run test -- --watch -w web    # Watch mode

## Integration Testing (Testcontainers)

For tests requiring a real database:

    import { PostgreSqlContainer } from "@testcontainers/postgresql";

    describe("RaidsRepository (integration)", () => {
      let container;
      let db;

      beforeAll(async () => {
        container = await new PostgreSqlContainer().start();
        db = createDrizzleClient(container.getConnectionUri());
        await migrate(db);
      }, 60_000);

      afterAll(async () => {
        await container.stop();
      });
    });

## Coverage Standards

- Backend: `npm run test:cov -w api` — 80% minimum
- Frontend: `npm run test:cov -w web` — 80% minimum
- Critical paths (auth, payments): 100%
- Coverage gaps require documented justification

## Anti-Patterns

- **NEVER** use `jest.fn()` in web tests — use `vi.fn()`
- **NEVER** use `vi.fn()` in api tests — use `jest.fn()`
- **NEVER** mock internal logic — mock at boundaries (repositories, HTTP)
- **NEVER** test implementation details — test behavior
- **NEVER** use `any` in test types — use proper types from contract
- **NEVER** skip cleanup — always restore mocks, close containers
- **AVOID** snapshot tests — prefer explicit assertions
- **AVOID** testing Shadcn internals — test your component behavior

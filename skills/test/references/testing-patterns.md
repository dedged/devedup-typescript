# Testing Patterns

Standard testing patterns and conventions for projects using this toolkit.

## Unit Tests (Vitest)

### Structure

One test file per source module. Use arrange/act/assert:

    import { describe, it, expect } from "vitest";

    describe("calculateScore", () => {
      it("returns zero for an empty list", () => {
        // Arrange
        const items: Item[] = [];
        const weight = 1.0;

        // Act
        const result = calculateScore(items, weight);

        // Assert
        expect(result).toBe(0);
      });
    });

### Naming

Use nested describe/it blocks with descriptive names:

    describe("parseDate", () => {
      it("returns a Date for a valid ISO string", () => { ... });
      it("throws for an empty string", () => { ... });
    });

    describe("fetchUser", () => {
      it("returns null for an unknown ID", () => { ... });
    });

### Setup

Use `beforeEach` / `afterEach` for shared setup:

    import { beforeEach } from "vitest";
    import { mkdtemp, writeFile } from "node:fs/promises";
    import { join } from "node:path";
    import { tmpdir } from "node:os";

    describe("Config", () => {
      let configDir: string;

      beforeEach(async () => {
        configDir = await mkdtemp(join(tmpdir(), "test-"));
        await writeFile(join(configDir, "config.toml"), '[app]\nname = "test"');
      });

      it("loads from file", async () => {
        const config = await Config.fromFile(join(configDir, "config.toml"));
        expect(config.name).toBe("test");
      });
    });

### Parameterized Tests

Use `it.each` for multiple inputs:

    it.each([
      ["hello", "HELLO"],
      ["", ""],
      ["123", "123"],
    ])("toUpper(%s) returns %s", (input, expected) => {
      expect(toUpper(input)).toBe(expected);
    });

## Property-Based Testing (fast-check)

Use for functions with well-defined contracts:

    import fc from "fast-check";

    describe("sort", () => {
      it("preserves length", () => {
        fc.assert(
          fc.property(fc.array(fc.integer()), (items) => {
            expect(items.sort().length).toBe(items.length);
          })
        );
      });

      it("is idempotent", () => {
        fc.assert(
          fc.property(fc.array(fc.integer()), (items) => {
            const sorted = [...items].sort((a, b) => a - b);
            const sortedTwice = [...sorted].sort((a, b) => a - b);
            expect(sortedTwice).toEqual(sorted);
          })
        );
      });
    });

## Fuzz Testing

Target input parsing and serialization:

    import fc from "fast-check";

    describe("parseInput", () => {
      it("never crashes on arbitrary strings", () => {
        fc.assert(
          fc.property(fc.string(), (rawInput) => {
            // Parser should handle any string without throwing unhandled errors
            try {
              parseInput(rawInput);
            } catch (error) {
              if (error instanceof ValidationError) {
                return; // Expected for invalid input
              }
              throw error;
            }
          }),
          { numRuns: 1000 }
        );
      });
    });

## Integration Tests

Use separate files or describe blocks for integration tests:

    describe("database round-trip", () => {
      it("stores and retrieves a user", async () => {
        const user = { name: "test", email: "test@example.com" };
        await db.users.insert(user);

        const loaded = await db.users.findByName("test");
        expect(loaded).not.toBeNull();
        expect(loaded!.email).toBe("test@example.com");
      });
    });

## Mocking Guidelines

- Mock external dependencies only (APIs, databases, file systems)
- Never mock internal logic — if you need to, refactor the code
- Prefer dependency injection over module mocking
- Use `vi.fn()` and `vi.spyOn()` for mocks and spies
- Use `msw` (Mock Service Worker) for HTTP request mocking

## Coverage

Run with: `npx vitest --coverage`

- 80% minimum line coverage for new code
- 100% coverage on critical paths
- Coverage gaps are acceptable only with documented justification

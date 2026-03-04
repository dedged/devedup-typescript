# TypeScript Patterns

Standard patterns and conventions for all TypeScript code produced by this toolkit.

## Data Models

Use TypeScript interfaces for type definitions, Zod schemas when runtime validation is needed:

    interface Config {
      /** Application name */
      name: string;
      /** Enable debug mode */
      debug: boolean;
    }

    import { z } from "zod";

    const UserInputSchema = z.object({
      email: z.string().email(),
      age: z.number().int().min(0).max(150),
    });

    type UserInput = z.infer<typeof UserInputSchema>;

## File Paths

Always use `node:path` and `node:fs/promises`, never string concatenation:

    import { join } from "node:path";
    import { mkdir, readFile } from "node:fs/promises";
    import { homedir } from "node:os";

    const configDir = join(homedir(), ".config", "myapp");
    await mkdir(configDir, { recursive: true });

## Logging

Use structured logging (pino recommended), never `console.log` for debugging:

    import pino from "pino";

    const logger = pino({ name: "myapp" });
    logger.info({ count }, "Processing items");

## HTTP Clients

Use `fetch` (built-in) or `undici` for HTTP requests:

    async function fetchData(url: string): Promise<Record<string, unknown>> {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json() as Promise<Record<string, unknown>>;
    }

## CLI Interfaces

Use `commander` with `chalk` for terminal output:

    import { Command } from "commander";
    import chalk from "chalk";

    const program = new Command();

    program
      .command("greet <name>")
      .description("Greet a user")
      .action((name: string) => {
        console.log(`Hello, ${chalk.bold(name)}!`);
      });

    program.parse();

## Error Handling

Define a project-level error class hierarchy:

    class AppError extends Error {
      constructor(message: string, public readonly code: string) {
        super(message);
        this.name = "AppError";
      }
    }

    class NotFoundError extends AppError {
      constructor(resource: string, id: string) {
        super(`${resource} not found: ${id}`, "NOT_FOUND");
        this.name = "NotFoundError";
      }
    }

    class ValidationError extends AppError {
      constructor(message: string) {
        super(message, "VALIDATION_ERROR");
        this.name = "ValidationError";
      }
    }

Never catch bare `unknown` without narrowing. Always provide context:

    try {
      const result = process(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error({ error }, "Failed to process data");
        throw error;
      }
      throw error;
    }

## Function Guidelines

- Maximum 30 lines per function
- Explicit return types on all exported functions
- Explicit parameter types on all functions
- JSDoc comments on all exported functions:

      /**
       * Calculate the weighted score for a list of items.
       *
       * @param items - The items to score.
       * @param weight - Multiplier applied to the final score.
       * @returns The weighted score.
       * @throws {ValidationError} If weight is negative.
       */
      export function calculateScore(items: Item[], weight = 1.0): number {
        // ...
      }

#!/usr/bin/env node

/**
 * PostToolUse hook that runs ESLint on TypeScript/JavaScript files after Write or Edit.
 *
 * This script is invoked by Claude Code as a PostToolUse hook. It receives
 * the tool result as JSON on stdin and checks if the affected file is a
 * TypeScript or JavaScript file. If so, it runs `npx eslint` and reports any issues.
 *
 * Exit codes:
 *   0 — success (no lint issues or not a TS/JS file)
 *   2 — blocking error (lint issues found, fed back to Claude)
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { extname } from "node:path";

const LINTABLE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

async function main() {
  let hookInput;
  try {
    const raw = await readStdin();
    hookInput = JSON.parse(raw);
  } catch {
    // No valid input — nothing to lint
    process.exit(0);
  }

  // Extract file path from the tool result
  const toolInput = hookInput?.tool_input ?? {};
  const filePath = toolInput?.file_path ?? "";

  if (!filePath) {
    process.exit(0);
  }

  const ext = extname(filePath);

  // Only lint TypeScript and JavaScript files
  if (!LINTABLE_EXTENSIONS.has(ext)) {
    process.exit(0);
  }

  if (!existsSync(filePath)) {
    process.exit(0);
  }

  // Run ESLint
  try {
    execSync(`npx eslint "${filePath}"`, { stdio: ["pipe", "pipe", "pipe"] });
  } catch (error) {
    // ESLint found issues — exit 2 = blocking error, stderr is fed back to Claude
    const output = error.stdout?.toString() ?? "";
    const stderr = error.stderr?.toString() ?? "";
    if (output) {
      process.stderr.write(output);
    }
    if (stderr) {
      process.stderr.write(stderr);
    }
    process.exit(2);
  }
}

main();

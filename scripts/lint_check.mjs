#!/usr/bin/env node

/**
 * PostToolUse hook that runs ESLint on TypeScript/JavaScript files after Write or Edit.
 *
 * This script is invoked by Claude Code as a PostToolUse hook. It receives
 * the tool result as JSON on stdin and checks if the affected file is a
 * TypeScript or JavaScript file. If so, it detects the workspace from the file
 * path and runs `npx eslint` with the correct working directory.
 *
 * Workspace detection:
 *   /api/       → cwd = api/
 *   /web/       → cwd = web/
 *   /packages/contract/ → skip (no eslint config)
 *   other       → cwd = project root
 *
 * Exit codes:
 *   0 — success (no lint issues or not a TS/JS file)
 *   2 — blocking error (lint issues found, fed back to Claude)
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { extname } from "node:path";

const LINTABLE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);

/**
 * Detect the workspace from a file path.
 *
 * @param {string} filePath - Absolute or relative file path.
 * @returns {{ workspace: string, cwd: string | null }} The workspace name and
 *   the directory to use as cwd for eslint. Returns cwd=null to skip linting.
 */
function detectWorkspace(filePath) {
  if (filePath.includes("/packages/contract/")) {
    return { workspace: "contract", cwd: null };
  }
  if (filePath.includes("/api/")) {
    // Extract the api directory path
    const idx = filePath.indexOf("/api/");
    return { workspace: "api", cwd: filePath.substring(0, idx + "/api".length) };
  }
  if (filePath.includes("/web/")) {
    // Extract the web directory path
    const idx = filePath.indexOf("/web/");
    return { workspace: "web", cwd: filePath.substring(0, idx + "/web".length) };
  }
  // Root-level file — fall back to project root
  return { workspace: "root", cwd: null };
}

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

  // Detect workspace and determine cwd
  const { workspace, cwd } = detectWorkspace(filePath);

  // Skip linting for contract workspace (no eslint config)
  if (workspace === "contract") {
    process.exit(0);
  }

  // Build exec options with workspace-aware cwd
  const execOptions = { stdio: ["pipe", "pipe", "pipe"] };
  if (cwd && existsSync(cwd)) {
    execOptions.cwd = cwd;
  }

  // Run ESLint
  try {
    execSync(`npx eslint "${filePath}"`, execOptions);
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

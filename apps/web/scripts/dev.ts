#!/usr/bin/env bun

import { spawn } from "bun";

// Spawn both processes
const basehub = spawn(["bunx", "basehub", "dev"], {
  stdout: "inherit",
  stderr: "inherit",
});

const next = spawn(["bunx", "next", "dev", "--port=3001"], {
  stdout: "inherit",
  stderr: "inherit",
});

// Handle process exit
process.on("SIGINT", () => {
  basehub.kill();
  next.kill();
  process.exit(0);
});

process.on("SIGTERM", () => {
  basehub.kill();
  next.kill();
  process.exit(0);
});

// Wait for both processes
await Promise.all([
  basehub.exited,
  next.exited,
]).catch(() => {
  // If one fails, kill the other
  basehub.kill();
  next.kill();
  process.exit(1);
});


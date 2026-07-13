import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

// Prefer the sandbox-provided Chromium binary when present so tests do not
// require `playwright install`.
const sandboxChromium = [
  "/chromium-1194/chrome-linux/chrome",
  "/chromium_headless_shell-1194/chrome-linux/headless_shell",
].find((p) => existsSync(p));

export default defineConfig({
  testDir: "./tests",
  testMatch: /.*\.spec\.ts$/,
  timeout: 30_000,
  fullyParallel: false,
  reporter: [["list"]],
  use: {
    baseURL: process.env.APP_URL ?? "http://localhost:8080",
    viewport: { width: 1280, height: 1800 },
    headless: true,
    trace: "off",
    launchOptions: sandboxChromium ? { executablePath: sandboxChromium } : {},
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});


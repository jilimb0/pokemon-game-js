import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:8080",
    trace: "on-first-retry",
  },
  webServer: process.env.CI
    ? {
        command: "npx serve . -l 8080 --cors",
        url: "http://127.0.0.1:8080",
        timeout: 120_000,
        reuseExistingServer: true,
      }
    : undefined,
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
})

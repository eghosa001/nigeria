import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    env: {
      MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY: "qa-only-passphrase",
      MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN: "qa-only-token",
      // Native Next QA runs without Cloudflare Worker bindings. Use the
      // existing published static catalogue only inside this test server.
      MYNIGERIAGUIDE_E2E_STATIC_YOUTUBE: "1",
    },
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});

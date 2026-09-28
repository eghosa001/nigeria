import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  workers: 1,
  fullyParallel: false,
  retries: 1,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report-cloudflare" }]],
  use: {
    baseURL: "http://127.0.0.1:8787",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npx wrangler dev --config dist/server/wrangler.json --port 8787 --var MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY:qa-only-passphrase --var MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN:qa-only-token",
    url: "http://127.0.0.1:8787",
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: "cloudflare-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "cloudflare-mobile", use: { ...devices["Pixel 7"] } },
  ],
});

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 4,
  retries: 1,
  reporter: [["list"]],
  use: {
    baseURL: process.env.LIVE_BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "live-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "live-mobile", use: { ...devices["Pixel 7"] } },
  ],
});

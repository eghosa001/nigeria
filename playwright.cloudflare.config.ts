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
    // Keep production D1 enabled in its generated artifact; write an isolated
    // local-QA config with a static YouTube adapter. Wrangler --var alone does
    // not reliably override a generated config's vars in this runtime.
    command: `node -e "const fs=require('node:fs');const p='dist/server/wrangler.json';const config=JSON.parse(fs.readFileSync(p,'utf8'));config.vars={...config.vars,YOUTUBE_D1_CUTOVER:'disabled'};fs.writeFileSync('dist/server/wrangler.qa.json',JSON.stringify(config));" && npx wrangler dev --config dist/server/wrangler.qa.json --port 8787 --var MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY:qa-only-passphrase --var MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN:qa-only-token`,
    url: "http://127.0.0.1:8787",
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: "cloudflare-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "cloudflare-mobile", use: { ...devices["Pixel 7"] } },
  ],
});

import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { ANALYTICS_PRODUCTION_HOSTS, EXCLUDED_ANALYTICS_USER_AGENT_MARKERS } from "../lib/analytics-safety";
import { analyticsStartDate, shouldEnableAnalytics } from "../lib/analytics-safety";

const adsenseInfeedUserAgent =
  "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/537.36 (KHTML, like Gecko; GoogleAdSenseInfeed) Chrome/153.0.8010.52 Mobile Safari/537.36";

// Real production browsers stay measurable; previews/admin/automation are not.
for (const host of ["mynigeriaguide.com", "www.mynigeriaguide.com"]) {
  assert.equal(shouldEnableAnalytics("/", false, "Mozilla/5.0 Chrome/153.0", host), true);
  assert.equal(shouldEnableAnalytics("/services/passport-renewal", false, "", host), true);
  for (const path of ["/admin", "/admin/visits", "/api/jobs", "/_next/static/app.js"]) {
    assert.equal(shouldEnableAnalytics(path, false, "", host), false, path);
  }
  assert.equal(shouldEnableAnalytics("/", true, "", host), false);
  for (const ua of [adsenseInfeedUserAgent, "HeadlessChrome Playwright", "Googlebot", "curl/8.0"]) {
    assert.equal(shouldEnableAnalytics("/", false, ua, host), false, ua);
  }
}
for (const host of ["", "localhost", "127.0.0.1", "mynigeriaguide.workers.dev", "preview.vercel.app", "evil-mynigeriaguide.com"]) {
  assert.equal(shouldEnableAnalytics("/", false, "Mozilla/5.0", host), false, host);
}

console.log("Analytics safety checks passed.");

assert.equal(analyticsStartDate(90, "2026-10-09"), "2026-10-04");
assert.equal(analyticsStartDate(7, "2026-10-10"), "2026-10-04");

// Bootstrap and reporting must use the same canonical host allowlist.
const layoutSource = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
assert.ok(layoutSource.includes("JSON.stringify(ANALYTICS_PRODUCTION_HOSTS)"));
assert.ok(layoutSource.includes("JSON.stringify(EXCLUDED_ANALYTICS_USER_AGENT_MARKERS)"));
const template = layoutSource.match(/const gaBootstrap = \`([\s\S]*?)\`;/)?.[1];
assert.ok(template, "GA4 inline bootstrap must exist");
const bootstrap = runInNewContext("\`" + template + "\`", {
  GA_MEASUREMENT_ID: "G-TEST",
  ANALYTICS_PRODUCTION_HOSTS,
  EXCLUDED_ANALYTICS_USER_AGENT_MARKERS,
  JSON,
}) as string;
function simulateBootstrap(hostname: string, pathname = "/", userAgent = "Mozilla/5.0", webdriver = false) {
  const injected: string[] = [];
  const fakeWindow: Record<string, unknown> = {
    location: { hostname, pathname },
  };
  const fakeDocument = {
    querySelector: () => null,
    head: { appendChild: (element: { src: string }) => injected.push(element.src) },
    createElement: () => ({
      set async(value: boolean) { void value; },
      setAttribute() {},
      src: "",
    }),
  };
  runInNewContext(bootstrap, {
    window: fakeWindow,
    navigator: { webdriver, userAgent },
    document: fakeDocument,
    Date,
    encodeURIComponent,
  }, { timeout: 1000 });
  return { disabled: fakeWindow["ga-disable-G-TEST"], injected };
}
assert.equal(simulateBootstrap("mynigeriaguide.com").disabled, false);
assert.equal(simulateBootstrap("mynigeriaguide.com").injected.length, 1);
for (const host of ["mynigeriaguide.workers.dev", "localhost", "preview.vercel.app"]) {
  assert.equal(simulateBootstrap(host).injected.length, 0, host);
}
assert.equal(simulateBootstrap("mynigeriaguide.com", "/admin/visits").injected.length, 0);
assert.equal(simulateBootstrap("mynigeriaguide.com", "/", "HeadlessChrome").injected.length, 0);

const clientSource = readFileSync(new URL("../lib/client-analytics.ts", import.meta.url), "utf8");
assert.ok(clientSource.includes("window.location.hostname"));
const posthogClientSource = readFileSync(new URL("../lib/posthog-client.ts", import.meta.url), "utf8");
assert.ok(posthogClientSource.includes("window.location.hostname"));
const gaReportSource = readFileSync(new URL("../lib/analytics-data.ts", import.meta.url), "utf8");
assert.ok(gaReportSource.includes('fieldName: "hostName"'));
assert.ok(gaReportSource.includes("ANALYTICS_PRODUCTION_HOSTS"));

// Regression: browser collection must be permitted by production CSP.
const cspSource = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
for (const directive of ["script-src", "connect-src"]) {
  const line = cspSource.split("\n").find((entry) => entry.includes(`"${directive} `));
  assert.ok(line?.includes("https://*.posthog.com"), directive + " must allow PostHog's assets and ingestion");
}

// Reporting status must represent a successful query, not merely a nonempty secret.
const dataSource = readFileSync(new URL("../lib/analytics-data.ts", import.meta.url), "utf8");
assert.ok(dataSource.includes("reportingConfigured: posthogOverview.available"));
const dashboardSource = readFileSync(new URL("../components/admin-analytics-dashboard.tsx", import.meta.url), "utf8");
assert.ok(!dashboardSource.includes("bounceRate * 100"), "PostHog bounce rate is already a percentage");
assert.ok(dashboardSource.includes("bounceRate.toFixed(1)"));

const posthogSource = readFileSync(new URL("../lib/posthog-data.ts", import.meta.url), "utf8");
assert.ok(posthogSource.includes('key: "$virt_is_bot"'), "PostHog visitors must exclude known bots");
assert.ok(posthogSource.includes('value: [false]'), "PostHog visitors must use the human-only bot filter");
assert.ok(posthogSource.includes('key: "$host"'), "PostHog reporting must stay on the production host");
assert.ok(!posthogSource.includes('key: "$raw_user_agent"'), "Filtering raw user agent excludes browser SDK events without that property");

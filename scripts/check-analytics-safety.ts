import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { analyticsStartDate, shouldEnableAnalytics } from "../lib/analytics-safety";

const adsenseInfeedUserAgent =
  "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/537.36 (KHTML, like Gecko; GoogleAdSenseInfeed) Chrome/153.0.8010.52 Mobile Safari/537.36";

assert.equal(shouldEnableAnalytics("/", false), true);
assert.equal(shouldEnableAnalytics("/services/passport-renewal", false), true);
assert.equal(shouldEnableAnalytics("/admin", false), false);
assert.equal(shouldEnableAnalytics("/admin/visits", false), false);
assert.equal(shouldEnableAnalytics("/", true), false);
assert.equal(shouldEnableAnalytics("/", false, adsenseInfeedUserAgent), false);
assert.equal(shouldEnableAnalytics("/", false, "Mozilla/5.0 Chrome/153.0"), true);

console.log("Analytics safety checks passed.");

assert.equal(analyticsStartDate(90, "2026-09-29"), "2026-09-29");
assert.equal(analyticsStartDate(7, "2026-10-10"), "2026-10-04");

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

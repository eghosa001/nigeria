import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("GA4 dashboard labels actual recorded date separately from refresh and realtime metrics", () => {
  const dashboard = readFileSync("components/admin-analytics-dashboard.tsx", "utf8");
  assert.match(dashboard, /lastReportedActivity = data\?\.daily\.filter/);
  assert.match(dashboard, /row\.sessions > 0 \|\| row\.pageViews > 0/);
  assert.match(dashboard, /Most recent day with recorded activity/);
  assert.match(dashboard, /not Google's last processing time/);
  assert.match(dashboard, /missing or incomplete current-day reports/);
  assert.match(dashboard, /Report fetched.*not a GA4 processing timestamp/);
  assert.match(dashboard, /last-30-minute realtime counters/);
});

test("live GA4 bootstrap test simulates a real reader without sending QA visits", () => {
  const live = readFileSync("tests/live-deployment.spec.ts", "utf8");
  assert.match(live, /browser\.newContext\(\{/);
  assert.match(live, /baseURL: process\.env\.LIVE_BASE_URL/);
  assert.match(live, /get: \(\) => false/);
  assert.match(live, /google-analytics\\\.com/);
  assert.match(live, /status: 204, body: ""/);
  assert.match(live, /args\[0\] === "config"/);
  assert.match(live, /context\.close\(\)/);
});

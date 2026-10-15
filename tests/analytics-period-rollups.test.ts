import assert from "node:assert/strict";
import test from "node:test";
import { buildPeriodRows, metricDelta } from "../lib/analytics-period-rollups";

test("1/7/30/90-day and cumulative windows preserve the correct calendar boundaries", () => {
  const data = [
    { date: "2026-10-15", pageViews: 20, sessions: 9 },
    { date: "2026-10-14", pageViews: 10, sessions: 6 },
    { date: "2026-10-08", pageViews: 8, sessions: 4 },
  ];
  const search = [
    { date: "2026-10-14", impressions: 100, clicks: 6 },
    { date: "2026-10-08", impressions: 70, clicks: 2 },
  ];
  const rows = buildPeriodRows(data, search, "2026-10-15", {
    ga4StartDate: "2026-09-29", gscStartDate: "2025-06-15",
    pageViews: 400, sessions: 100, impressions: 2000, clicks: 80,
  });
  assert.deepEqual(rows.map((row) => row.key), ["1d", "7d", "30d", "90d", "all"]);
  assert.equal(rows[0].startDate, "2026-10-15");
  assert.equal(rows[0].pageViews, 20);
  assert.equal(rows[0].impressions, null); // GSC has not reported today: never invent zero.
  assert.equal(rows[1].startDate, "2026-10-09");
  assert.equal(rows[1].impressions, 100);
  assert.equal(rows[1].previousImpressions, 70);
  assert.equal(rows[4].impressions, 2000);
  assert.equal(rows[4].pageViews, 400);
});
test("unreported traffic and zero denominators cannot produce fake percentage growth", () => {
  assert.equal(metricDelta(null, 0), null);
  assert.equal(metricDelta(8, 0), null);
  assert.equal(metricDelta(12, 10), 20);
});

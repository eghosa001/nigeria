import assert from "node:assert/strict";
import test from "node:test";
import { buildPeriodRows, metricDelta } from "../lib/analytics-period-rollups";
import { completeVisitsCsv, completeVisitsReport } from "../lib/visits-export";
import type { InsightsReport } from "../lib/admin-visits-insights";

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

test("Search Console comparison follows Pacific day while GA4 uses Lagos day", () => {
  const rows = buildPeriodRows(
    [{ date: "2026-10-15", pageViews: 9 }],
    [{ date: "2026-10-14", impressions: 110, clicks: 4 }],
    "2026-10-15",
    { ga4StartDate: "2026-09-29", gscStartDate: "2025-06-14",
      pageViews: 500, sessions: 300, impressions: 9000, clicks: 120 },
    "2026-10-14",
  );
  assert.equal(rows[0].pageViews, 9);
  assert.equal(rows[0].impressions, 110);
  assert.equal(rows[0].gscStartDate, "2026-10-14");
  assert.equal(rows[0].startDate, "2026-10-15");
});

test("average ranking position is weighted by Google impressions", () => {
  const rows = buildPeriodRows([], [
    { date: "2026-10-14", impressions: 100, clicks: 2, position: 3 },
    { date: "2026-10-13", impressions: 300, clicks: 7, position: 9 },
  ], "2026-10-15", {
    ga4StartDate: "2026-09-29", gscStartDate: "2025-06-15",
    pageViews: null, sessions: null, impressions: 400, clicks: 9, position: 7.5,
  }, "2026-10-14");
  assert.equal(rows[1].position, 7.5);
  assert.equal(rows[4].position, 7.5);
  assert.equal(rows[0].position, 3);
});

test("complete AI exports contain every returned page, all five periods, hourly rows and provider status", () => {
  const report = {
    generatedAt: "2026-10-15T01:00:00Z", selectedRange: "all",
    ga4StartDate: "2026-09-29", gscStartDate: "2025-06-15",
    detailStartDate: "2026-09-29", detailGscStartDate: "2025-06-15",
    latestGA4Date: "2026-10-14", latestGSCDate: "2026-10-13",
    periods: ["1d", "7d", "30d", "90d", "all"].map((key) => ({
      key, startDate: "2026-09-29", endDate: "2026-10-15",
      gscStartDate: "2025-06-15", gscEndDate: "2026-10-14",
      impressions: 1800, clicks: 27, position: 8, pageViews: 45, sessions: 20,
      previousImpressions: 1600, previousClicks: 12, previousPosition: 9,
      previousPageViews: 40, previousSessions: 15,
    })),
    daily: [{ date: "2026-10-14", impressions: 1800, clicks: 27, pageViews: 45, sessions: 20, position: 8 }],
    searchPages: Array.from({ length: 151 }, (_, index) => ({
      page: index === 0 ? "=IMPORTXML('evil')" : "https://mynigeriaguide.com/service/" + index,
      impressions: 11 + index, clicks: index % 3, ctr: (index % 3) / (11 + index), position: 9,
    })),
    pageViewsByPage: Array.from({ length: 123 }, (_, index) => ({
      path: "/guides/" + index, title: index === 0 ? "+SUM(1,1)" : "Guide " + index,
      views: 3 + index, users: 2,
    })),
    pageListsTruncated: { ga4: false, gsc: true },
    errors: { ga4: null, gsc: null, ga4Pages: null, gscPages: null },
    realtime: { activeUsers: 2, pageViews: 10 },
    hourly: { available: true, source: "direct-google-api", siteUrl: "sc-domain:mynigeriaguide.com",
      startDate: "2026-10-14", endDate: "2026-10-15", fetchedAt: "2026-10-15T01:00:00Z",
      latestHour: "2026-10-14T12:00:00-07:00", firstIncompleteHour: null, lagHours: 6,
      impressions: 30, clicks: 2, impressions24h: 30, clicks24h: 2, hoursReported24h: 2,
      rows: [{ hour: "2026-10-14T12:00:00-07:00", impressions: 30, clicks: 2, ctr: 2 / 30,
        position: 8, provisional: true }] },
    posthog: { available: true, startDate: "2026-09-29", endDate: "2026-10-15",
      views: 120, visitors: 65, sessions: 75, averageSessionDurationSeconds: 23,
      bounceRate: 0.55 },
  } as InsightsReport;

  const structured = completeVisitsReport(report);
  assert.equal(structured.report.searchPages.length, 151);
  assert.equal(structured.report.pageViewsByPage.length, 123);
  assert.equal(structured.report.periods.length, 5);
  assert.equal(structured.reporting.gscRowsTruncated, true);
  assert.equal(structured.report.hourly.rows.length, 1);

  const csv = completeVisitsCsv(report);
  const lines = csv.trim().split("\r\n");
  assert.equal(lines.length, 1 + 18 + 5 + 1 + 151 + 123 + 2 + 14 + 1 + 8 + 4);
  assert.equal((csv.match(/"search_page","GSC"/g) ?? []).length, 151);
  assert.equal((csv.match(/"visited_page","GA4"/g) ?? []).length, 123);
  assert.equal((csv.match(/"period_summary"/g) ?? []).length, 5);
  assert.equal((csv.match(/"gsc_hour"/g) ?? []).length, 1);
  assert.ok(csv.includes("hourly.latestHour"));
  assert.ok(csv.includes("posthog.bounceRate"));
  assert.ok(csv.includes("gscSearchPagesTruncated"));
  assert.ok(csv.includes("'=IMPORTXML"));
  assert.ok(csv.includes("'+SUM(1,1)"));
  assert.ok(!csv.includes('"=IMPORTXML'));
});

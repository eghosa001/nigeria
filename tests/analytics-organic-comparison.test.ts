import assert from "node:assert/strict";
import test from "node:test";
import { compareSearchClicksToOrganicSessions, type SearchPerformanceSummary } from "../lib/analytics-data";

const search: SearchPerformanceSummary = {
  available: true, source: "live", siteUrl: "sc-domain:mynigeriaguide.com",
  startDate: "2026-10-04", endDate: "2026-10-07", latestDate: "2026-10-07",
  firstIncompleteDate: "2026-10-06", impressions: 400, clicks: 107,
  ctr: 0.025, position: 9, dailyClicks: [
    { date: "2026-10-04", clicks: 42 }, { date: "2026-10-05", clicks: 32 },
    { date: "2026-10-06", clicks: 33 },
  ],
};
const days = [
  { dimensionValues: [{ value: "20261004" }], metricValues: [{ value: "9" }] },
  { dimensionValues: [{ value: "20261005" }], metricValues: [{ value: "36" }] },
  { dimensionValues: [{ value: "20261006" }], metricValues: [{ value: "29" }] },
];

test("compares only settled dates, normalizes GA4 dates and never counts provisional clicks", () => {
  assert.deepEqual(compareSearchClicksToOrganicSessions(search, days), {
    startDate: "2026-10-04", endDate: "2026-10-05",
    gscClicks: 74, ga4OrganicSessions: 45,
  });
});

test("refuses historical snapshots or missing incomplete-date evidence", () => {
  assert.equal(compareSearchClicksToOrganicSessions({ ...search, source: "historical-snapshot" }, days), null);
  assert.equal(compareSearchClicksToOrganicSessions({ ...search, firstIncompleteDate: null }, days), null);
});

test("refuses gaps in settled daily Search Console reporting", () => {
  assert.equal(compareSearchClicksToOrganicSessions({
    ...search, dailyClicks: [search.dailyClicks![0], { date: "2026-10-06", clicks: 33 }],
    firstIncompleteDate: "2026-10-07",
  }, days), null);
});

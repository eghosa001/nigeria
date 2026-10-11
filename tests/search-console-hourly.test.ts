import assert from "node:assert/strict";
import test from "node:test";
import { summarizeSearchConsoleHours } from "../lib/search-console-hourly";

test("hourly figures are chronological, property-wide and use Google's incomplete-hour boundary", () => {
  const result = summarizeSearchConsoleHours([
    { keys: ["2026-10-10T15:00:00-07:00"], clicks: 2, impressions: 44, ctr: 2 / 44, position: 11 },
    { keys: ["2026-10-10T13:00:00-07:00"], clicks: 4, impressions: 95, ctr: 4 / 95, position: 10 },
    { keys: ["2026-10-10T14:00:00-07:00"], clicks: 1, impressions: 42, ctr: 1 / 42, position: 9 },
  ], "2026-10-10T14:00:00-07:00", new Date("2026-10-11T03:15:00Z"));

  assert.deepEqual(result.rows.map((row) => row.hour), [
    "2026-10-10T13:00:00-07:00",
    "2026-10-10T14:00:00-07:00",
    "2026-10-10T15:00:00-07:00",
  ]);
  assert.deepEqual(result.rows.map((row) => row.provisional), [false, true, true]);
  assert.equal(result.latestHour, "2026-10-10T15:00:00-07:00");
  assert.equal(result.lagHours, 5);
  assert.equal(result.clicks, 7);
  assert.equal(result.impressions, 181);
});

test("hourly data is never fabricated when Google has no rows", () => {
  const result = summarizeSearchConsoleHours([], undefined, new Date("2026-10-11T07:00:00Z"));
  assert.equal(result.latestHour, null);
  assert.equal(result.lagHours, null);
  assert.equal(result.rows.length, 0);
  assert.equal(result.impressions, 0);
});

test("invalid hour data and missing metrics do not create fictitious fresh activity", () => {
  const result = summarizeSearchConsoleHours([
    { keys: ["not-a-date"], clicks: 100, impressions: 1000 },
    { keys: [], clicks: 100 },
    { keys: ["2026-10-09T23:00:00-07:00"], clicks: -2, impressions: 23 },
  ], undefined, new Date("2026-10-11T02:00:00Z"));
  assert.equal(result.rows.length, 1);
  assert.equal(result.rows[0].clicks, 0);
  assert.equal(result.rows[0].impressions, 23);
  assert.equal(result.rows[0].provisional, false);
});

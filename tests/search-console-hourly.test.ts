import assert from "node:assert/strict";
import test from "node:test";
import {
  summarizeSearchConsoleHours,
  firstIncompleteHourFromMetadata,
  firstIncompleteDateFromMetadata,
  classifySearchConsoleApiError,
} from "../lib/search-console-hourly";

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
  assert.equal(result.clicks24h, 7);
  assert.equal(result.impressions24h, 181);
  assert.equal(result.hoursReported24h, 3);
});

test("hourly data is never fabricated when Google has no rows", () => {
  const result = summarizeSearchConsoleHours([], undefined, new Date("2026-10-11T07:00:00Z"));
  assert.equal(result.latestHour, null);
  assert.equal(result.lagHours, null);
  assert.equal(result.rows.length, 0);
  assert.equal(result.impressions, 0);
  assert.equal(result.impressions24h, null);
  assert.equal(result.clicks24h, null);
  assert.equal(result.hoursReported24h, 0);
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

test("Google uses camelCase metadata keys in actual API JSON", () => {
  assert.equal(
    firstIncompleteHourFromMetadata({ firstIncompleteHour: "2026-10-10T18:00:00-07:00" }),
    "2026-10-10T18:00:00-07:00",
  );
  assert.equal(
    firstIncompleteDateFromMetadata({ firstIncompleteDate: "2026-10-10" }),
    "2026-10-10",
  );
  // Legacy snake_case can still be accepted from alternative data pipelines.
  assert.equal(
    firstIncompleteHourFromMetadata({ first_incomplete_hour: "2026-10-09T18:00:00-07:00" }),
    "2026-10-09T18:00:00-07:00",
  );
});

test("old hours must not be misrepresented as zero recent search traffic", () => {
  const result = summarizeSearchConsoleHours([
    { keys: ["2026-10-08T15:00:00-07:00"], clicks: 2, impressions: 55 },
  ], undefined, new Date("2026-10-11T05:00:00Z"));
  assert.equal(result.clicks, 2);
  assert.equal(result.impressions, 55);
  assert.equal(result.clicks24h, null);
  assert.equal(result.impressions24h, null);
  assert.equal(result.hoursReported24h, 0);
  assert.equal(result.lagHours, 55);
});

test("Google disabled Search Console API 403 identifies the correct project and action", () => {
  const raw = JSON.stringify({ error: {
    code: 403,
    message: "Google Search Console API has not been used in project 987654321011 before or it is disabled. Enable it then retry.",
    status: "PERMISSION_DENIED",
    details: [{ reason: "SERVICE_DISABLED", metadata: {
      consumer: "projects/987654321011",
      service: "searchconsole.googleapis.com",
    } }],
  } });
  const result = classifySearchConsoleApiError(403, raw);
  assert.equal(result.code, "api-disabled");
  assert.equal(result.projectNumber, "987654321011");
  assert.match(result.message, /Enable the API/);
  assert.doesNotMatch(result.message, /\\"error\\":|private_key|Bearer/);
});

test("Search Console property permission 403 must not be mistaken for disabled Cloud API", () => {
  const raw = JSON.stringify({ error: {
    code: 403,
    message: "User does not have sufficient permission for site sc-domain:mynigeriaguide.com.",
  } });
  const result = classifySearchConsoleApiError(403, raw);
  assert.equal(result.code, "property-permission");
  assert.equal(result.projectNumber, null);
  assert.match(result.message, /service-account email/);
});

test("Google project can be extracted from structured SERVICE_DISABLED details", () => {
  const result = classifySearchConsoleApiError(403, JSON.stringify({ error: {
    message: "Request is denied.",
    details: [{ reason: "SERVICE_DISABLED", metadata: {
      consumer: "projects/123450987600",
      service: "searchconsole.googleapis.com",
    } }],
  } }));
  assert.equal(result.code, "api-disabled");
  assert.equal(result.projectNumber, "123450987600");
});

test("API errors never expose raw diagnostic JSON or unknown links in the admin panel", () => {
  const raw = JSON.stringify({ error: { message: "Internal token abc_123 failure" } });
  const issue = classifySearchConsoleApiError(500, raw);
  assert.equal(issue.code, "unknown");
  assert.equal(issue.projectNumber, null);
  assert.doesNotMatch(issue.message, /abc_123/);
});

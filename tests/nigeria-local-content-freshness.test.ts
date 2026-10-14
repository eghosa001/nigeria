import assert from "node:assert/strict";
import test from "node:test";
import { isoToday, daysSinceIsoDate, getFreshnessState, getEffectiveReleaseStatus } from "../lib/content-freshness";

test("freshness changes at Nigerian midnight, not an hour later at UTC midnight", () => {
  assert.equal(isoToday(new Date("2026-10-13T22:59:59Z")), "2026-10-13");
  assert.equal(isoToday(new Date("2026-10-13T23:00:00Z")), "2026-10-14");
  assert.equal(getFreshnessState("2026-10-13", { warnAfterDays: 0, staleAfterDays: 7 }, new Date("2026-10-13T23:00:00Z")), "due");
  const festival = { kind: "event" as const, status: "upcoming" as const, startDate: "2026-10-10", endDate: "2026-10-13" };
  assert.equal(getEffectiveReleaseStatus(festival, new Date("2026-10-13T22:59:59Z")), "now-showing");
  assert.equal(getEffectiveReleaseStatus(festival, new Date("2026-10-13T23:00:00Z")), "ended");
});

test("impossible source dates are not treated as verified calendar days", () => {
  assert.equal(daysSinceIsoDate("2026-02-30", new Date("2026-10-14T12:00:00Z")), Infinity);
  assert.equal(getFreshnessState("2026-02-30", { warnAfterDays: 7, staleAfterDays: 14 }), "unknown");
  assert.equal(getFreshnessState("invalid", { warnAfterDays: 7, staleAfterDays: 14 }), "unknown");
});

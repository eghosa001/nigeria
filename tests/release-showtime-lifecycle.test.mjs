import assert from "node:assert/strict";
import { test } from "node:test";
import { getEffectiveReleaseStatus } from "../lib/content-freshness.ts";
import { releaseItems } from "../lib/entertainment-extras.ts";

test("expired cinema showtime windows move to the archive without falsely claiming current screenings", () => {
  const item = releaseItems.find((entry) => entry.id === "behind-the-scenes-viva");
  assert.ok(item, "the previously listed Viva movie should remain accessible");
  assert.equal(item.startDate, "2026-10-08");
  assert.equal(item.endDate, "2026-10-14");
  assert.match(item.summary, /not independently confirmed/i);
  assert.equal(getEffectiveReleaseStatus(item, new Date("2026-10-14T11:00:00Z")), "now-showing");
  assert.equal(getEffectiveReleaseStatus(item, new Date("2026-10-15T11:00:00Z")), "ended");
});

test("upcoming confirmed releases and past events retain existing lifecycle behavior", () => {
  assert.equal(getEffectiveReleaseStatus({ kind: "cinema", status: "upcoming", startDate: "2026-10-23" }, new Date("2026-10-15T11:00:00Z")), "upcoming");
  assert.equal(getEffectiveReleaseStatus({ kind: "event", status: "upcoming", startDate: "2026-10-02", endDate: "2026-10-04" }, new Date("2026-10-15T11:00:00Z")), "ended");
  assert.equal(getEffectiveReleaseStatus({ kind: "streaming", status: "new", startDate: "2026-10-04" }, new Date("2026-10-15T11:00:00Z")), "new");
});

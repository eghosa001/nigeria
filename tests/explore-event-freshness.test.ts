import test from "node:test";
import assert from "node:assert/strict";
import { getUpcomingEventGuides } from "../lib/explore-event-featured";
import type { ExploreGuide } from "../lib/explore";

const guide = (slug: string, lastReviewed = "2026-10-07") => ({
  slug, kind: "event", lastReviewed, shortTitle: slug,
}) as ExploreGuide;

test("Tour shelf excludes finished and undated events; sorts by next ending date", () => {
  const input = [
    guide("10th-afrigeo-symposium-abuja-2026"),
    guide("abuja-festival-literature-ideas-2026"),
    guide("hallelujah-festival-lagos-october-2026"),
    guide("nifafest-abuja-2026"),
    guide("unknown-undated-event"),
    guide("smfest-abuja-2026"),
  ];
  assert.deepEqual(
    getUpcomingEventGuides(input, "2026-10-12").map((item) => item.slug),
    ["nifafest-abuja-2026", "smfest-abuja-2026", "hallelujah-festival-lagos-october-2026"],
  );
  assert.deepEqual(getUpcomingEventGuides(input, "2026-10-31"), []);
});
test("events on their final date remain discoverable until Nigeria's next calendar day", () => {
  const item = guide("hallelujah-festival-lagos-october-2026");
  assert.equal(getUpcomingEventGuides([item], "2026-10-30").length, 1);
  assert.equal(getUpcomingEventGuides([item], "2026-10-31").length, 0);
});

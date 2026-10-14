import assert from "node:assert/strict";
import test from "node:test";
import { groupEventCalendar } from "../lib/explore-event-calendar";
import type { ExploreGuide } from "../lib/explore";

function event(slug: string): ExploreGuide {
  return { slug, title: slug, shortTitle: slug, kind: "event" } as ExploreGuide;
}

test("calendar keeps expired programmes out of current and retains unknown dates separately", () => {
  const guides = [
    event("10th-afrigeo-symposium-abuja-2026"),
    event("felabration-2026"),
    event("lagos-fashion-week-2026"),
    event("not-yet-date-checked"),
  ];
  const result = groupEventCalendar(guides, "2026-10-14");
  assert.deepEqual(result.dated.map((item) => item.slug), ["felabration-2026", "lagos-fashion-week-2026"]);
  assert.deepEqual(result.past.map((item) => item.slug), ["10th-afrigeo-symposium-abuja-2026"]);
  assert.deepEqual(result.needsDateCheck.map((item) => item.slug), ["not-yet-date-checked"]);
  const later = groupEventCalendar(guides, "2026-11-02");
  assert.equal(later.dated.length, 0);
  assert.equal(later.past.length, 3);
});

test("event directory is request-time rather than a frozen 2026 list", async () => {
  const fs = await import("node:fs");
  const page = fs.readFileSync("app/explore/events/page.tsx", "utf8");
  assert.match(page, /dynamic = "force-dynamic"/);
  assert.match(page, /groupEventCalendar\(allEvents, today\)/);
  assert.doesNotMatch(page, /October starts with Felabration/);
});

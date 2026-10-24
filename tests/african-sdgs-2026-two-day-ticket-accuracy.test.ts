import assert from "node:assert/strict";
import test from "node:test";
import { exploreGrowthWave } from "../lib/explore-growth-wave-2026-10-06";
import { independentlyCheckedEvents20261017 } from "../lib/explore-independent-event-verification-2026-10-17";

test("African SDGs Film Festival distinguishes 4 November tickets from unverified 5 November", () => {
  const page = exploreGrowthWave.find(x => x.slug === "african-sdgs-film-festival-abuja-2026");
  assert.ok(page);
  assert.equal(page.lastReviewed, "2026-10-24");
  assert.match(page.summary, /10:00 a\.m\.\u20134:00 p\.m\./);
  assert.match(page.summary, /5 November programme and venue.*not yet been published/);
  assert.doesNotMatch([page.summary, ...page.intro, ...page.highlights.map(x => x.detail)].join(" "), /10:00 AM to 6:00 PM|6:00 PM finish on both|both festival days at Silverbird/i);
  assert.match(page.planning.map(x => x.detail).join(" "), /Day 2|5 November/);
  assert.ok(page.source?.href === "https://www.visitabuja.org/event/african-sdgs-film-festival-2026/");
  const verified = independentlyCheckedEvents20261017[page.slug];
  assert.ok(verified);
  assert.match(verified.context, /10:00 a\.m\.\u20134:00 p\.m\./);
  assert.match(verified.context, /Day 2.*not published/);
  assert.match(verified.planning.detail, /requires a new organiser-confirmed schedule/);
});

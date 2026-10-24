import assert from "node:assert/strict";
import test from "node:test";
import { exploreGrowthWave } from "../lib/explore-growth-wave-2026-10-06";
import { independentlyCheckedEvents20261017 } from "../lib/explore-independent-event-verification-2026-10-17";

test("All Africa Challenge Trophy retains the distinct 4–6 and 7–10 November programmes", () => {
  const event = exploreGrowthWave.find(x => x.slug === "all-africa-challenge-trophy-abuja-2026");
  assert.ok(event);
  assert.equal(event.lastReviewed, "2026-10-24");
  assert.match(event.intro.join(" "), /team-championship rounds 4–6 November/);
  assert.match(event.intro.join(" "), /separate Nigeria Ladies Open for 7–10 November/);
  assert.match(event.planning.map(p => p.detail).join(" "), /not proof of public spectator admission/);
  const evidence = independentlyCheckedEvents20261017[event.slug];
  assert.ok(evidence);
  assert.equal(evidence.source.href, "https://ladiesgolfassociationofnigeria.com/");
  assert.match(evidence.context, /2–10 November multi-event programme/);
  assert.match(evidence.planning.detail, /separate eligibility and fees/);
});

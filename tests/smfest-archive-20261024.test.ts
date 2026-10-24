import assert from "node:assert/strict";
import test from "node:test";
import { getExploreGuide } from "../lib/explore";

test("SMFest Abuja 2026 expired event is presented as a historical programme", () => {
  const page = getExploreGuide("smfest-abuja-2026");
  assert.ok(page);
  assert.equal(page.kind, "event");
  assert.equal(page.lastReviewed, "2026-10-24");
  assert.match(page.summary, /has passed/);
  assert.match(page.intro.join(" "), /out of stock/i);
  assert.match(page.intro.join(" "), /16–18 October/);
  assert.ok(page.planning.some(row => /future edition/i.test(row.label)));
  assert.ok(page.sources?.some(s => s.href === "https://smfest.org/ticket/"));
  assert.ok(!page.planning.some(row => /buy only from the organiser|confirm the live checkout/i.test(row.label + row.detail)));
});

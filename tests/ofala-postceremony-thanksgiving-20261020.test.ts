import assert from "node:assert/strict";
import test from "node:test";
import { exploreGuides } from "../lib/explore";

test("Ofala 2026 clearly distinguishes elapsed royal ceremonies from later thanksgiving", () => {
  const guide = exploreGuides.find(item => item.slug === "ofala-onitsha-2026");
  assert.ok(guide, "the original canonical Ofala guide must remain published");
  assert.equal(guide.lastReviewed, "2026-10-19");
  assert.match(guide.summary, /16[–-]17 October.*passed/i);
  assert.match(guide.summary, /25 October.*Bishop Crowther Memorial Anglican Church/i);
  assert.ok(guide.intro.some(paragraph => /Iru Ofala.*16 October.*Azu Ofala.*17 October/i.test(paragraph)));
  assert.ok(guide.intro.some(paragraph => /thanksgiving.*not another day of the royal arena ceremonies/i.test(paragraph)));
  assert.ok(guide.highlights.some(item => /Thanksgiving.*25 October/i.test(item.name)));
  assert.ok(guide.planning.some(item => /Confirm the church service time/i.test(item.detail)));
  assert.ok(guide.planning.some(item => /visitor price|walk-in policy/i.test(item.detail)));
  assert.ok(guide.planning.every(item => !/For 16[–-]17 October travel to Ime Obi/i.test(item.detail)));
  assert.equal(
    guide.source?.href,
    "https://ofala.org/press-release/ofala-2026-onitsha-announces-programme-for-festival-igba-mbo-iga-niru-strive-and-advance/",
  );
});

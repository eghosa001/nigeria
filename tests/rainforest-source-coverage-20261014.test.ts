import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { exploreGuides } from "../lib/explore";

test("rainforest guide distinguishes park access, sanctuary permission and current uncertainty", () => {
  const guide = exploreGuides.find((item) => item.slug === "nigeria-rainforest-guide");
  assert.ok(guide);
  const content = [guide.summary, ...guide.intro, ...guide.highlights.map((x) => x.detail), ...guide.planning.map((x) => x.detail)].join(" ");
  for (const term of ["Akamkpa", "Butatong", "Udo", "Afi Mountain", "authorised", "wildlife sighting", "cancellation"]) {
    assert.ok(content.toLowerCase().includes(term.toLowerCase()), term);
  }
  assert.equal(guide.lastReviewed, "2026-10-14");
  assert.ok(guide.source?.href.includes("nigeriaparkservice.gov.ng"));
  assert.ok(guide.sources?.some((source) => source.href.includes("nigeria.wcs.org/Wild-Places/Afi")));
});

test("destination detail template provides links for additional independent sources", () => {
  const page = readFileSync("app/explore/[slug]/page.tsx", "utf8");
  assert.match(page, /guide\.sources \?\? \[\]/);
  assert.match(page, /source\.href !== guide\.source\?\.href/);
});

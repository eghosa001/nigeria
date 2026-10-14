import assert from "node:assert/strict";
import test from "node:test";
import { kainjiDamGuide } from "../lib/explore-kainji-dam-2026-10-10";

test("Kainji guide uses production government/operator sources and separates the different facilities", () => {
  assert.equal(kainjiDamGuide.slug, "kainji-dam-guide");
  assert.equal(kainjiDamGuide.lastReviewed, "2026-10-14");
  assert.equal(kainjiDamGuide.source?.href, "https://www.bpe.gov.ng/transaction/kainji-jebba-hydropower-plant/");
  assert.ok(kainjiDamGuide.sources?.some((s) => s.href === "https://mainstream.com.ng/power-plants/"));
  const narrative = [kainjiDamGuide.summary, ...kainjiDamGuide.intro, ...kainjiDamGuide.highlights.map(x=>x.detail), ...kainjiDamGuide.planning.map(x=>x.detail)].join(" ");
  for (const term of ["1968", "Borgu", "New Bussa", "760 MW", "eight turbines", "Jebba", "national park", "walk-in", "not a guaranteed"]) {
    assert.match(narrative.toLowerCase(), new RegExp(term.toLowerCase().replaceAll(" ", "\\s+")));
  }
  assert.ok(narrative.split(/\s+/).length > 800, "specific public engineering content should be substantial");
  assert.doesNotMatch(narrative, /guaranteed.*(tour|wildlife)|open to all visitors/i);
});

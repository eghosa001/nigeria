import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const updates = readFileSync("lib/explore-verified-visitor-updates-2026-10-16.ts", "utf8");
const registry = readFileSync("lib/explore.ts", "utf8");
const monitor = readFileSync(".github/workflows/production-monitor.yml", "utf8");

test("15 distinct Tour decisions are integrated without inventing admission facts or changing old review dates", () => {
  const slugs = [
    "osun-nature-culture", "osun-osogbo-sacred-grove-guide", "osun-heritage-road-trip",
    "national-museum-ile-ife-guide", "ile-ife", "nigeria-cultural-landscapes-guide",
    "idanre-hills-visitor-guide", "ondo-nature-heritage", "kano-ancient-city-walls-gates",
    "dala-hill-kano-guide", "kurmi-market-kano-old-city", "old-oyo-national-park",
    "oyo-state-travel-guide", "nigeria-museums-guide", "national-museum-lagos-guide",
  ];
  assert.equal(new Set(slugs).size, 15);
  for (const slug of slugs) assert.ok(updates.includes(`"${slug}": {`), slug);
  assert.match(registry, /const update = freshlyChecked \?\?/);
  assert.match(registry, /lastReviewed: freshlyChecked \? "2026-10-16" : "2026-10-15"/);
  assert.match(updates, /https:\/\/whc\.unesco\.org\/en\/list\/1118/);
  assert.match(updates, /https:\/\/museum\.ng\/museums\//);
  assert.match(monitor, /Stand-alone|Standalone directory-only video records/);
  assert.doesNotMatch(monitor, /grep -Eq '\/entertainment\/youtube\/\[A-Za-z0-9_-\]/);
});

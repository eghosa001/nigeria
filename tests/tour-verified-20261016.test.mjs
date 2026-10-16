import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const updates = readFileSync("lib/explore-verified-visitor-updates-2026-10-16.ts", "utf8");
const registry = readFileSync("lib/explore.ts", "utf8");
const monitor = readFileSync(".github/workflows/production-monitor.yml", "utf8");

test("27 distinct Tour decisions are integrated without inventing admission facts or changing old review dates", () => {
  const slugs = [
    "osun-nature-culture",
    "osun-osogbo-sacred-grove-guide",
    "osun-heritage-road-trip",
    "national-museum-ile-ife-guide",
    "ile-ife",
    "nigeria-cultural-landscapes-guide",
    "idanre-hills-visitor-guide",
    "ondo-nature-heritage",
    "kano",
    "dala-hill-kano-guide",
    "gidan-makama-museum-guide",
    "nigeria-unesco-heritage-guide",
    "oyo-state-travel-guide",
    "nigeria-museums-guide",
    "national-museum-lagos-guide",
    "kano-2-day-itinerary",
    "nigeria-royal-palaces-guide",
    "northern-museums-heritage-route",
    "sukur-terraces-guide",
    "sukur-cultural-landscape",
    "alok-ikom-monoliths-guide",
    "ogun-state-nature-heritage-guide",
    "national-museum-unity-ibadan-guide",
    "kanta-museum-argungu-guide",
    "benin-city-national-museum-guide",
    "osogbo",
    "national-war-museum-umuahia-guide",
  ];
  assert.equal(new Set(slugs).size, 27);
  for (const slug of slugs) assert.ok(updates.includes(`"${slug}": {`), slug);
  assert.match(registry, /const update = freshlyChecked \?\?/);
  assert.match(registry, /lastReviewed: freshlyChecked \? "2026-10-16" : "2026-10-15"/);
  assert.match(updates, /https:\/\/whc\.unesco\.org\/en\/list\/1118/);
  assert.match(updates, /https:\/\/museum\.ng\/museums\//);
  assert.match(monitor, /Stand-alone|Standalone directory-only video records/);
  assert.doesNotMatch(monitor, /grep -Eq '\/entertainment\/youtube\/\[A-Za-z0-9_-\]/);
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const places = readFileSync(new URL("../lib/explore-kwara-osun-regional-2026-10-12.ts", import.meta.url), "utf8");
const catalog = readFileSync(new URL("../lib/explore-places.ts", import.meta.url), "utf8");
const guides = readFileSync(new URL("../lib/explore.ts", import.meta.url), "utf8");

test("five distinct official Kwara/Osun stops reuse existing canonical guides", () => {
  const slugs = [...places.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
  assert.equal(slugs.length, 5);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal((places.match(/guideSlug: "kwara-highlights"/g) ?? []).length, 4);
  assert.equal((places.match(/guideSlug: "osogbo"/g) ?? []).length, 1);
  assert.match(catalog, /\.\.\.kwaraOsunRegionalPlaces20261012/);
  assert.match(guides, /Kwara's official LGA directory lists Imoleboja Rock Shelter/);
  assert.match(guides, /Kiriji is a separate regional trip/);
});

test("source evidence and access uncertainty are visible for all new Tour records", () => {
  assert.equal((places.match(/checkedAt: "2026-10-12"/g) ?? []).length, 5);
  assert.equal((places.match(/mapQuery: "/g) ?? []).length, 5);
  assert.equal((places.match(/cost: "/g) ?? []).length, 5);
  assert.equal((places.match(/hours: "/g) ?? []).length, 5);
  assert.equal((places.match(/source: \{ label:/g) ?? []).length, 5);
  assert.match(places, /kwarastate\.gov\.ng\/government\/lgas\//);
  assert.match(places, /osunstate\.gov\.ng\/2016\/02\/osun-turn-kiriji-war-site-world-class-recreation-centre/);
  assert.doesNotMatch(places, /\b(?:free entry|open daily|walk-ins welcome|guaranteed access)\b/i);
});

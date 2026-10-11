import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("October city expansion is unique, source-backed and dated", () => {
  const content = read("lib/explore-city-growth-2026-10-11.ts");
  const slugs = [...content.matchAll(/"slug": "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(slugs.length, 21);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal((content.match(/"checkedAt": "2026-10-11"/g) ?? []).length, slugs.length);
  assert.equal((content.match(/"source": \{/g) ?? []).length, slugs.length);
  for (const city of ["lagos", "abuja", "calabar", "kano", "benin-city"]) {
    assert.ok(content.includes('"guideSlug": "' + city + '"'), city);
  }
});

test("existing tour records are reused without duplicating the primary catalog", () => {
  const source = read("lib/explore-places.ts");
  assert.match(source, /\.\.\.cityGrowthPlaces20261011/);
  assert.match(source, /const citySharedPlaceSlugs:/);
  assert.match(source, /seen\.has\(slug\)/);
  assert.match(source, /return \[\.\.\.direct, \.\.\.additional\]/);
});

test("four-pillar discoveries use existing canonical destinations", () => {
  const source = read("data/home-social-trends.ts");
  for (const path of [
    "/entertainment/movies/my-30th-wedding",
    "/services/ninauth-nin-verification",
    "/explore/lagos",
    "/jobs/moniepoint-early-careers-talent-acquisition-specialist",
  ]) assert.ok(source.includes('href: "' + path + '"'), path);
  assert.match(read("lib/entertainment-extras.ts"), /my-30th-wedding-youtube-2026/);
  assert.match(read("data/updates.ts"), /NIN Share Code is different from \*346#/);
});

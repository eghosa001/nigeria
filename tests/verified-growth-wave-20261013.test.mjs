import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import test from "node:test";

const load = (name) => readFileSync(new URL("../" + name, import.meta.url), "utf8");

test("source-backed guides have distinct slugs, recent checks, and primary-source destinations", () => {
  const museum = load("lib/explore-museum-collections-2026-10-13.ts");
  const engineer = load("lib/career-nse-coren-2026-10-13.ts");
  assert.match(museum, /nigerian-museum-collections-guide/);
  assert.match(museum, /https:\/\/collection\.museum\.ng\//);
  assert.match(engineer, /nse-coren-registration-engineering-graduates/);
  assert.match(engineer, /https:\/\/portal\.coren\.gov\.ng\//);
  assert.match(engineer, /https:\/\/nse\.org\.ng\/membership/);
  assert.match(museum, /2026-10-13/);
  assert.match(engineer, /2026-10-13/);
  for (const page of [museum, engineer]) assert.ok(page.split(/\s+/).length > 850);
});

test("both guides are included in their canonical pillar catalog and search suggestions", () => {
  assert.match(load("lib/explore.ts"), /\.\.\.museumCollectionsGuide20261013/);
  assert.match(load("lib/career-guides.ts"), /\.\.\.engineeringRegistrationGuide20261013/);
  const suggestions = load("components/global-search-form.tsx");
  assert.match(suggestions, /href: "\/explore\/nigerian-museum-collections-guide"/);
  assert.match(suggestions, /href: "\/jobs\/guides\/nse-coren-registration-engineering-graduates"/);
});

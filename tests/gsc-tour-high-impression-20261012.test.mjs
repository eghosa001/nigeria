import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const guidePage = readFileSync(new URL("../app/explore/[slug]/page.tsx", import.meta.url), "utf8");
const tourHub = readFileSync(new URL("../app/explore/page.tsx", import.meta.url), "utf8");
const slugs = [
  "dufuna-canoe-heritage-guide",
  "mambilla-plateau-guide",
  "ojukwu-bunker-guide",
  "sokoto-state-travel-guide",
];

test("existing impression-bearing Tour guides have distinctive, safe SERP snippets and discovery links", () => {
  const descriptions = guidePage.split("const exploreDescriptionOverrides: Record<string, string> = {")[1]?.split("\n};")[0];
  assert.ok(descriptions);
  for (const slug of slugs) {
    const desc = descriptions.match(new RegExp('"' + slug + '": "([^"]+)"'))?.[1];
    assert.ok(desc && desc.length <= 155, slug + " description");
    assert.equal(tourHub.split('href="/explore/' + slug + '"').length, 2, slug + " linked once");
  }
  for (const slug of ["dufuna-canoe-heritage-guide", "ojukwu-bunker-guide", "sokoto-state-travel-guide"]) {
    const title = guidePage.match(new RegExp('guide.slug === "' + slug + '"\\) return "([^"]+)"'))?.[1];
    assert.ok(title && title.length <= 60, slug + " title");
  }
  assert.match(descriptions, /check exhibition access before planning a visit/i);
  assert.match(descriptions, /check the latest restoration and visitor-access status/i);
  assert.match(guidePage, /"ojukwu-bunker-guide": \[/);
  assert.match(guidePage, /"sokoto-state-travel-guide": \[/);
});

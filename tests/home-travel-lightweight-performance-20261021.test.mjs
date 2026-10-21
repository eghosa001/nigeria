import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("homepage cross-pillar travel shelf does not initialize the full Tour catalogue", () => {
  const page = source("app/page.tsx");
  const highlights = source("lib/home-travel-highlights.ts");
  assert.match(page, /import \{ homeTravelHighlights \} from "@\/lib\/home-travel-highlights"/);
  assert.doesNotMatch(page, /from "@\/lib\/explore"/);
  assert.match(page, /const travelHighlights = homeTravelHighlights;/);
  assert.match(page, /travelHighlights\.map\(\(guide\) =>/);
  assert.doesNotMatch(highlights, /^import /m, "homepage-only route metadata must remain dependency-free");

  const expected = [
    ["lagos", "Lagos State", "Lagos", "city"],
    ["abuja", "Federal Capital Territory", "Abuja", "city"],
    ["kano", "Kano State", "Kano", "city"],
    ["obudu-mountain-resort", "Cross River State", "Obudu Mountain Resort", "destination"],
    ["yankari-game-reserve", "Bauchi State", "Yankari Game Reserve", "destination"],
    ["anambra-heritage-circuit", "Anambra State", "Anambra heritage circuit", "destination"],
  ];
  for (const [slug, region, label, kind] of expected) {
    assert.ok(
      highlights.includes(`{ slug: "${slug}", region: "${region}", shortTitle: "${label}", kind: "${kind}" }`),
      "Homepage travel card content and canonical route must remain unchanged: " + slug,
    );
  }
  assert.equal((highlights.match(/\{ slug: "/g) ?? []).length, expected.length);
});

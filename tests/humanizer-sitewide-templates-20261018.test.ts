import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("service metadata describes actual procedures, never generic claimed freshness", () => {
  const file = read("app/services/[slug]/page.tsx");
  assert.doesNotMatch(file, /\$\{summary\} Verified \$\{year\}|\$\{summary\} Updated \$\{year\}/);
  assert.match(file, /normalizeMetadataText\(service\.steps\[0\]/);
  assert.match(file, /getServiceSeoDescriptionOverride\(service\.slug, year\)/);
  assert.match(file, /alternates:\s*\{ canonical:/);
});

test("tour SEO excerpts use each reviewed guide's facts, not generic keyword stuffing", () => {
  const file = read("app/explore/[slug]/page.tsx");
  assert.doesNotMatch(file, /Things to do, places to visit and practical planning guidance reviewed/);
  assert.match(file, /guide\.planning\[0\]\?\.detail/);
  assert.match(file, /guide\.summary/);
});

test("series pages omit internal media policy language without changing rights tracking", () => {
  const page = read("app/entertainment/series/[slug]/page.tsx");
  const catalog = read("lib/series.ts");
  assert.doesNotMatch(page, /How visuals for \{item\.title\} are handled/);
  assert.doesNotMatch(page, /\{item\.artworkNote\}/);
  assert.match(catalog, /artworkNote: string/);
});

test("service JSON corrections are restricted to public notes; technical rules remain", () => {
  const data = ["data/services-private-extended.json", "data/services-scale-verified.json"];
  let converted = 0;
  for (const path of data) for (const row of JSON.parse(read(path))) {
    assert.ok(typeof row.slug === "string" && row.sources?.length > 0, row.slug);
    for (const note of row.notes ?? []) {
      if (note.startsWith("These steps cover")) {
        converted++;
        assert.ok(note.includes("."), row.slug);
        assert.doesNotMatch(note, /\bthis guide explains\b/i);
      }
    }
  }
  assert.ok(converted >= 35, "Broad source-safe Humanizer changes should persist");
});

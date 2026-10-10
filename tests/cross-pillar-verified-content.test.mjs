import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");

test("CAC guidance reflects distinct live iCRP workflows", () => {
  const records = JSON.parse(read("data/services.json"));
  for (const slug of ["cac-business-name-registration", "cac-company-registration", "cac-name-reservation", "cac-annual-returns"]) {
    const found = records.filter((item) => item.slug === slug);
    assert.equal(found.length, 1, slug);
    assert.equal(found[0].lastVerified, "2026-10-10", slug);
    assert.ok(found[0].sources.some((source) => source.url.includes("icrp.cac.gov.ng")), slug);
  }
  const business = records.find((item) => item.slug === "cac-business-name-registration");
  const company = records.find((item) => item.slug === "cac-company-registration");
  assert.match(business.notes.join(" "), /AI-approved|AI-processed/);
  assert.match(company.notes.join(" "), /manual review/);
});

test("distinct Forever Yours films link to their correct publishers", () => {
  const catalog = read("lib/entertainment-growth-wave-6.ts");
  const releases = [...catalog.matchAll(/slug: "(forever-yours-[^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(releases.sort(), ["forever-yours-2025-royal-arts", "forever-yours-2026"].sort());
  const records = catalog.split(/slug: "forever-yours-/);
  const film2025 = records.find((item) => item.startsWith("2025-royal-arts"));
  const film2026 = records.find((item) => item.startsWith('2026"'));
  assert.match(film2025, /_KFL0VJYJBc/);
  assert.match(film2025, /Royal Arts TV/);
  assert.doesNotMatch(film2025, /XO3_GT1BKPI/);
  assert.match(film2026, /XO3_GT1BKPI/);
  assert.match(film2026, /ChinneyLoveEze Tv/);
  assert.doesNotMatch(film2026, /_KFL0VJYJBc/);
  const page = read("app/entertainment/movies/[slug]/page.tsx");
  assert.match(page, /forever-yours-2025-royal-arts/);
  assert.match(page, /forever-yours-2026/);
});

test("Kainji Dam has a specific guide and place mapping", () => {
  const guide = read("lib/explore-kainji-dam-2026-10-10.ts");
  assert.match(guide, /slug: "kainji-dam"/);
  assert.match(guide, /bpe\.gov\.ng\/staging\/transaction\/kainji-jebba-hydropower-plant/);
  assert.match(guide, /publicly open|public walk-in|visitor access/);
  assert.match(read("lib/explore.ts"), /kainjiDamGuide/);
  assert.match(read("lib/explore-places.ts"), /slug: "kainji-dam-complex",\s+guideSlug: "kainji-dam"/);
});

test("new NYSC PPA article uses official sources and canonical jobs route", () => {
  const guides = read("lib/career-guides.ts");
  assert.equal(guides.split('"slug": "nysc-ppa-posting-guide"').length - 1, 1);
  assert.match(guides, /www\.nysc\.gov\.ng\/corpmob\.html/);
  assert.match(guides, /www\.nysc\.gov\.ng\/downloads\/nysc-bye-laws\.php/);
  assert.match(read("app/jobs/nysc/page.tsx"), /href="\/jobs\/guides\/nysc-ppa-posting-guide"/);
});

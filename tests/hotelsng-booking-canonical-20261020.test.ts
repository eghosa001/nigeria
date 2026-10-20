import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getPublicService, publicServices } from "../lib/data";

const raw = JSON.parse(readFileSync(new URL("../data/services-private-extended.json", import.meta.url), "utf8")) as
  Array<{ slug: string; status: string; title: string; sources: Array<{ url: string }> }>;

test("only one public Hotels.ng booking route remains, with the source-backed how-it-works guide", () => {
  const alias = raw.find(x => x.slug === "hotelsng-book-hotel");
  const canonical = raw.find(x => x.slug === "hotels-ng-book-hotel");
  assert.ok(alias && canonical);
  assert.equal(alias.status, "review");
  assert.equal(canonical.status, "verified");
  assert.ok(canonical.sources.some(x => x.url === "https://hotels.ng/how-it-works"));
  assert.equal(getPublicService(alias.slug), undefined);
  assert.ok(getPublicService(canonical.slug));
  assert.equal(publicServices.filter(x => x.agencySlug === "hotels-ng" && x.title === "How to book a hotel on Hotels.ng").length, 1);
  assert.equal(alias.sources.length, 2, "old route retained for source history; not deleted");
});

test("old Hotels.ng booking links permanently redirect to a single canonical guide", () => {
  const cfg = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  assert.match(cfg, /source: "\/services\/hotelsng-book-hotel",\s*destination: "\/services\/hotels-ng-book-hotel",\s*permanent: true/);
  assert.ok(!cfg.includes('destination: "/services/hotelsng-book-hotel"'));
});

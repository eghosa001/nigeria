import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("Nigeria social editorial brief covers every pillar without duplicate news ids", () => {
  const source = read("data/nigeria-trend-brief.ts");
  const ids = [...source.matchAll(/id: "([^"]+)"/g)].map((item) => item[1]);
  assert.equal(ids.length, 5);
  assert.equal(new Set(ids).size, ids.length);
  for (const pillar of ["Movies & Entertainment", "Services", "Tour Nigeria", "Jobs & Careers"]) {
    assert.ok(source.includes('pillar: "' + pillar + '"'), pillar);
  }
  assert.match(source, /expiresAt >= today/);
  assert.match(source, /sourceUrl: "https:\/\//);
  assert.match(source, /A higher orientation-camp feeding budget/);
});

test("Nigeria X observations remain clearly separate from official news", () => {
  const source = read("data/nigeria-trend-brief.ts");
  assert.match(source, /Nigeria X trend observation/);
  assert.match(source, /not a verified nationwide post count/);
  const page = read("app/latest/page.tsx");
  assert.match(page, /getCurrentNigeriaTrendBrief/);
  assert.match(page, /source-verified Movies, Services, Tour and Jobs brief|source-verified|source verification|verified updates/i);
  assert.match(page, /not a live X trend ranking/);
  assert.ok(read("app/entertainment/social-trends/page.tsx").indexOf('aria-labelledby="verified-platform-signals"') <
    read("app/entertainment/social-trends/page.tsx").indexOf('aria-labelledby="youtube-video-trends"'));
});

test("real service and tourism source updates retain original attribution", () => {
  const source = read("data/updates.ts");
  assert.match(source, /nysc-camp-feeding-2027-and-safe-travel-advice-oct-11/);
  assert.match(source, /expected to take effect next year \(2027\)/);
  assert.match(read("app/explore/page.tsx"), /tourism-ministry-and-mycityapp-announce-ember-to-remember/);
  assert.match(read("docs/nigeria-social-watch.md"), /forbids automated scraping/);
});

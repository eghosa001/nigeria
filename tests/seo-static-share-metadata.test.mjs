import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (page) => readFileSync("app/" + page + "/page.tsx", "utf8");

test("static four-pillar pages reuse their own canonical metadata for social previews", () => {
  for (const page of [
    "services/page/[page]",
    "jobs", "jobs/government", "jobs/remote",
    "entertainment", "entertainment/trending", "entertainment/series",
    "explore", "explore/events",
    "about", "latest",
  ]) {
    const source = read(page);
    assert.match(source, /withStaticSocialMetadata|pageSocialMetadata/);
  }
});

test("filtered collection routes keep their established noindex logic and get page-specific share cards", () => {
  for (const page of [
    "services", "universities", "entertainment/movies", "entertainment/youtube",
    "jobs/new-this-week", "jobs/closing-this-week",
  ]) {
    const source = read(page);
    assert.match(source, /return withStaticSocialMetadata\(\{/);
    assert.match(source, /index: false, follow: true/);
  }
});

test("default social cards use site-owned image but preserve explicit route-specific metadata", () => {
  const source = readFileSync("lib/seo-social.ts", "utf8");
  assert.match(source, /const brandImage = "\/opengraph-image"/);
  assert.match(source, /metadata\.openGraph \?\? defaults\.openGraph/);
  assert.match(source, /metadata\.twitter \?\? defaults\.twitter/);
  assert.doesNotMatch(source, /lastVerified|lastChecked|dateModified|keyword/);
});

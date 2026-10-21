import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("all remaining crawl-identified hub share cards render the correct canonical identity", () => {
  const employers = readFileSync("app/jobs/employers/page.tsx", "utf8");
  assert.match(employers, /withStaticSocialMetadata/);
  const offices = readFileSync("app/locations/[slug]/page.tsx", "utf8");
  assert.match(offices, /twitter:\s*\{[\s\S]*?title: city\.title,[\s\S]*?description: city\.description/);
  const ytPage = readFileSync("app/entertainment/youtube/page/[page]/page.tsx", "utf8");
  assert.match(ytPage, /pageSocialMetadata\(seoTitle, seoDescription, canonical\)/);
  assert.match(ytPage, /robots: \{ index: false, follow: true \}/);
});

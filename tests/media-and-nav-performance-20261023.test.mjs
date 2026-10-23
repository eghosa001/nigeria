import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("Tour images offer responsive licensed sources and prioritize only the first visible picture", () => {
  const photos = source("lib/destination-photos.ts");
  const index = source("app/explore/page.tsx");
  const detail = source("app/explore/[slug]/page.tsx");
  assert.match(photos, /\[320, 480, 720, 960\]/);
  assert.match(photos, /Special:FilePath/);
  assert.match(photos, /srcSet:/);
  assert.match(photos, /creditUrl:/);
  assert.match(photos, /licenseUrl:/);
  assert.match(index, /srcSet=\{srcSet\}/);
  assert.match(index, /loading=\{index === 0 \? "eager" : "lazy"\}/);
  assert.match(index, /fetchPriority=\{index === 0 \? "high" : "low"\}/);
  assert.match(index, /sizes="\(max-width: 620px\)/);
  assert.match(detail, /srcSet=\{destinationPhotoUrls\(destinationPhoto\)\.srcSet\}/);
  assert.match(detail, /loading="eager" fetchPriority="high"/);
  assert.match(detail, /CC BY-SA 4\.0/);
});

test("film thumbnails remain credited with error fallback while offscreen requests yield bandwidth", () => {
  const preview = source("components/remote-movie-preview-image.tsx");
  assert.match(preview, /loading = "lazy"/);
  assert.match(preview, /loading === "lazy" \? "low"/);
  assert.match(preview, /onError=\{\(\) => setAttempt/);
  assert.match(preview, /fallbackSrc/);
  assert.match(preview, /referrerPolicy="strict-origin-when-cross-origin"/);
});

test("desktop and mobile navigation avoid unsolicited heavy pillar downloads", () => {
  const header = source("components/site-header.tsx");
  assert.match(header, /href=\{item\.href\}\s+prefetch=\{false\}\s+className=\{active \? "nav-active"/);
  assert.match(header, /href=\{item\.href\} prefetch=\{false\} className=\{active/);
  assert.match(header, /href=\{item\.href\} prefetch=\{false\} className=\{active \? "is-current"/);
});

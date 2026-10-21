import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("YouTube detail social previews use the exact validated title, preferred canonical and rights-holder thumbnail", () => {
  const source = readFileSync("app/entertainment/youtube/[videoId]/page.tsx", "utf8");
  const metaStart = source.indexOf("export async function generateMetadata");
  const metaEnd = source.indexOf("function runtimeLabel", metaStart);
  const metadata = source.slice(metaStart, metaEnd);
  assert.match(metadata, /const seoTitle = override\?\.title \?\?/);
  assert.match(metadata, /title: \{ absolute: seoTitle \}/);
  assert.match(metadata, /openGraph:\s*\{[\s\S]*?title: seoTitle,[\s\S]*?url: canonical/);
  assert.match(metadata, /twitter:\s*\{[\s\S]*?title: seoTitle,[\s\S]*?images: \[image\]/);
  assert.match(metadata, /movie\.source === "curated" \? movie\.internalHref/);
  assert.match(metadata, /robots: indexable && !aliasToCuratedMovie \? undefined : \{ index: false, follow: true \}/);
});

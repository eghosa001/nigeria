import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("optional advertising starts after critical page load and cannot stall forever", () => {
  const layout = read("app/layout.tsx");
  const section = layout.split("const adsenseBootstrap =")[1]?.split("const themeBootstrap =")[0] ?? "";
  assert.match(section, /window\.addEventListener\("load", scheduleAds, \{ once: true \}\)/);
  assert.match(section, /window\.requestIdleCallback\(loadAds, \{ timeout: 2300 \}\)/);
  assert.match(section, /window\.setTimeout\(loadAds, 3500\)/);
  assert.match(section, /script\.fetchPriority = "low"/);
  assert.match(section, /script\.async = true/);
  assert.match(section, /data-mynigeriaguide-adsense/);
  assert.ok(section.indexOf('var loadAds = function') < section.indexOf('window.addEventListener("load"'));
  assert.ok(section.indexOf("script.src") < section.indexOf('window.addEventListener("load"'),
    "Ads are created in a deferred callback, not at script evaluation");
  assert.match(section, /path === "\/admin"/);
  assert.match(read("components/ad-slot.tsx"), /window\.adsbygoogle = window\.adsbygoogle \|\| \[\]/);
});

test("server movie details reuse one read in metadata and page render", () => {
  const detail = read("app/entertainment/youtube/[videoId]/page.tsx");
  assert.match(detail, /import \{ cache \} from "react"/);
  assert.match(detail, /const readPublishedVideo = cache\(\(videoId: string\) => youtubeServerStore\.detail\(videoId\)\)/);
  assert.equal((detail.match(/await readPublishedVideo\(videoId\)/g) ?? []).length, 2);
  assert.match(detail, /<link rel="preconnect" href="https:\/\/i\.ytimg\.com" crossOrigin="" \/>/);
  assert.match(detail, /fetchPriority="high"/);
});

test("the dark mobile header avoids continuous backdrop recompositing", () => {
  const css = read("app/mobile.css");
  const block = css.split("/* Mobile scrolling must not continuously")[1];
  assert.ok(block);
  assert.match(block, /html\[data-theme="dark"\] \.site-header/);
  assert.match(block, /backdrop-filter: none !important/);
});

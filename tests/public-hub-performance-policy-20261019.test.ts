import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("public-only high traffic hubs reuse rendered responses for no more than five minutes", () => {
  const homepage = read("app/page.tsx");
  const latest = read("app/latest/page.tsx");
  const config = read("vite.config.ts");
  for (const [name, source] of [["homepage", homepage], ["latest", latest]]) {
    assert.match(source, /export const revalidate = 300;/, name);
    assert.doesNotMatch(source, /export const dynamic = "force-dynamic";/, name);
    assert.doesNotMatch(source, /\bcookies\(|\bheaders\(/, name + ": must not depend on per-visitor data");
  }
  assert.match(config, /cdn: cdnAdapter\(\)/, "Cloudflare response caching must remain configured");
  assert.match(latest, /getEffectiveJobStatus\(item, today\) === "open"/);
  assert.match(homepage, /getEffectiveJobStatus/);
});

test("personalized and deadline-critical jobs retain per-request rendering", () => {
  for (const path of [
    "app/jobs/page.tsx", "app/jobs/open-now/page.tsx",
    "app/jobs/deadlines/page.tsx", "app/jobs/[slug]/page.tsx",
  ]) {
    assert.match(read(path), /export const dynamic = "force-dynamic";/, path);
    assert.doesNotMatch(read(path), /export const revalidate = 300;/, path);
  }
  assert.match(read("next.config.ts"), /private, no-store/);
});

test("only the first two YouTube cards load eagerly; remaining images are browser-lazy", () => {
  for (const path of [
    "app/entertainment/youtube/page.tsx",
    "app/entertainment/youtube/page/[page]/page.tsx",
  ]) {
    assert.match(read(path), /priority=\{index < 2\}/, path);
    assert.doesNotMatch(read(path), /priority=\{index < 5\}/, path);
  }
  const movieBrowse = read("app/entertainment/movies/page.tsx");
  assert.match(movieBrowse, /freePreview\.map\(\(movie\) =>/,
    "movie browse previews are already below the hero and evergreen discovery content");
  assert.match(movieBrowse, /<YouTubeMovieCard movie=\{movie\} key=\{movie\.videoId\} \/>/,
    "below-the-fold movie previews use the card's lazy-loading default");
  assert.doesNotMatch(movieBrowse, /<YouTubeMovieCard[^>]*priority=/,
    "do not eagerly fetch the buried ten-image YouTube shelf");
  const image = read("components/remote-movie-preview-image.tsx");
  assert.match(image, /loading = "lazy"/);
  assert.match(image, /decoding="async"/);
  assert.match(read("components/lazy-youtube-player.tsx"), /active \? \(/,
    "Embedded YouTube player should be interaction-gated, not auto-loaded");
});

test("offline worker never downloads the homepage, services or saved-page HTML during installation", () => {
  const sw = read("public/sw.js");
  assert.match(sw, /const CACHE = "mynigeriaguide-v3"/);
  assert.match(sw, /const CORE = \["\/offline", "\/manifest\.webmanifest"\]/);
  assert.doesNotMatch(sw, /const CORE = \[[^\]]*"\/services"/);
  assert.doesNotMatch(sw, /const CORE = \[[^\]]*"\/saved"/);
  assert.match(sw, /request\.mode === "navigate"/, "visited public pages should still get an offline backup");
  const register = read("components/service-worker-register.tsx");
  assert.match(register, /\}, 4000\);/, "register after initial page resource activity");
});

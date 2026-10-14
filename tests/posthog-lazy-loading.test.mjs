import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("PostHog is dynamically imported outside the shared initial analytics bundle", () => {
  for (const path of ["lib/client-analytics.ts", "components/posthog-analytics.tsx"]) {
    const source = read(path);
    assert.doesNotMatch(source, /import\s*\{[^}]*\}\s*from\s*["']@\/lib\/posthog-client["']/);
    assert.match(source, /import\("@\/lib\/posthog-client"\)/);
  }
});

test("GA4 events and PostHog pageviews remain implemented", () => {
  assert.match(read("lib/client-analytics.ts"), /analyticsWindow\.gtag\?\.\("event", name, params\)/);
  assert.match(read("lib/client-analytics.ts"), /capturePostHogEvent\(name, params\)/);
  assert.match(read("components/posthog-analytics.tsx"), /capturePostHogPageView\(pathname\)/);
});

test("indexable YouTube detail hero prioritizes the real video thumbnail", () => {
  const detail = read("app/entertainment/youtube/[videoId]/page.tsx");
  assert.match(detail, /className="youtube-detail-artwork"[\\s\\S]*fetchPriority="high"/);
  assert.match(detail, /className="youtube-detail-artwork"[\\s\\S]*loading="eager"/);
});

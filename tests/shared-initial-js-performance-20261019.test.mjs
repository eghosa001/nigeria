import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("root layout loads just the lightweight recent-page tracker, never the saved-pages UI", () => {
  const layout = source("app/layout.tsx");
  const tracker = source("components/recent-page-tracker.tsx");
  const store = source("lib/personal-library-storage.ts");
  const library = source("components/personal-library.tsx");
  assert.match(layout, /import \{ RecentPageTracker \} from "@\/components\/recent-page-tracker"/);
  assert.doesNotMatch(layout, /from "@\/components\/personal-library"/);
  assert.match(tracker, /read\(recentKey\)/);
  assert.match(tracker, /write\(recentKey, \[entry, \.\.\.rest\]\.slice\(0, 10\)\)/);
  assert.match(store, /mynigeriaguide:recent-pages:v1/);
  assert.match(store, /mynigeriaguide:personal-library-changed/);
  assert.match(library, /from "@\/lib\/personal-library-storage"/);
  assert.doesNotMatch(store, /import .*react|next\/link|posthog-js/);
});

test("PostHog stays dynamically imported and starts in an idle period with a bounded fallback", () => {
  const script = source("components/posthog-analytics.tsx");
  assert.match(script, /window\.requestIdleCallback\(capture, \{ timeout: 1250 \}\)/);
  assert.match(script, /shouldEnableAnalytics\(pathname, navigator\.webdriver, navigator\.userAgent, window\.location\.hostname\)/,
    "do not download analytics on admin, preview, or test routes");
  assert.match(script, /window\.setTimeout\(capture, 350\)/);
  assert.match(script, /window\.cancelIdleCallback\(idleId\)/);
  assert.match(script, /import\("@\/lib\/posthog-client"\)/);
  assert.match(script, /capturePostHogPageView\(pathname\)/);
  assert.doesNotMatch(script, /^import .*from "posthog-js"/m);
  assert.match(source("app/layout.tsx"), /dangerouslySetInnerHTML=\{\{ __html: gaBootstrap \}\}/,
    "GA4 initialization must remain unchanged");
});

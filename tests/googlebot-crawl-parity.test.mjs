import test from "node:test";
import assert from "node:assert/strict";
import { CRAWL_CANARIES, CONTENT_FRESHNESS_CANARIES, validateIndexableHtml, assertSamePageIdentity, getArticleText, assertSameArticleContent, assertFreshnessSignals } from "../scripts/check-googlebot-crawl-parity.mjs";

const canonical = "https://mynigeriaguide.com/services/ican-professional-exam-registration";
const good = '<!doctype html><html><head><title>ICAN exam registration</title><link rel="canonical" href="' + canonical + '"><meta name="robots" content="index,follow"></head><body><h1>ICAN registration</h1></body></html>';
const input = (overrides = {}) => ({ status: 200, headers: new Headers(), html: good, canonical, ...overrides });

test("all four editorial pillars have a production crawler canary", () => {
  assert.equal(CRAWL_CANARIES.length, 4);
  for (const prefix of ["/entertainment/", "/services/", "/explore/", "/jobs/"]) {
    assert.equal(CRAWL_CANARIES.filter((path) => path.startsWith(prefix)).length, 1);
  }
});

test("indexable HTML requires HTTP 200, one correct canonical, title and H1", () => {
  assert.equal(validateIndexableHtml(input()).canonical, canonical);
  assert.throws(() => validateIndexableHtml(input({ status: 503 })), /HTTP 200/);
  assert.throws(() => validateIndexableHtml(input({ html: good.replace(canonical, "https://wrong.example/") })), /Wrong canonical/);
  assert.throws(() => validateIndexableHtml(input({ html: good.replace("<h1>", "<p>").replace("</h1>", "</p>") })), /Missing visible H1/);
});

test("blocks header noindex and meta noindex regardless of attribute order", () => {
  assert.throws(() => validateIndexableHtml(input({ headers: new Headers({ "x-robots-tag": "noindex, nofollow" }) })), /X-Robots-Tag/);
  assert.throws(() => validateIndexableHtml(input({ html: good.replace("index,follow", "noindex,follow") })), /Robots meta/);
  assert.throws(() => validateIndexableHtml(input({ html: good.replace('<meta name="robots" content="index,follow">', '<meta content="noindex" name="googlebot">') })), /Robots meta/);
});

test("rejects Cloudflare resource failure masquerading as a 200 response", () => {
  assert.throws(() => validateIndexableHtml(input({ html: good + "Worker exceeded resource limits" })), /Worker resource failure/);
});

test("rejects streamed body metadata for canonical Googlebot HTML", () => {
  const streamed = '<html><head></head><body><h1>ICAN registration</h1><title>ICAN exam registration</title><link rel="canonical" href="' + canonical + '"></body></html>';
  assert.throws(() => validateIndexableHtml(input({ html: streamed, requireHeadMetadata: true })), /canonical link/);
  assert.throws(() => validateIndexableHtml(input({ html: streamed.replace("<head></head>", ""), requireHeadMetadata: true })), /Missing HTML head/);
});

test("cache freshness guard catches stale canonical title, canonical and H1", () => {
  const current = validateIndexableHtml(input({ requireHeadMetadata: true }));
  assert.equal(current.heading, "ICAN registration");
  assert.doesNotThrow(() => assertSamePageIdentity(current, { ...current }, "same page"));
  for (const changed of [
    { ...current, title: "Old page title" },
    { ...current, canonical: "https://mynigeriaguide.com/services/other" },
    { ...current, heading: "Stale application steps" },
  ]) {
    assert.throws(() => assertSamePageIdentity(current, changed, "cached vs fresh"), /mismatched title, canonical or H1/);
  }
});

test("ordinary and fresh pages with unchanged titles/H1 still fail on stale visitor content", () => {
  const prefix = '<html><head><title>Design Week</title></head><body><main id="main-content"><h1>Design Week Lagos</h1>';
  const current = prefix + '<p>Design Week Lagos 2026 dates have passed. Visitors should not buy tickets for last year’s event.</p><p>Original organizer announcement and event schedule are retained as historical evidence.</p></main></body></html>';
  const stale = prefix + '<p>Design Week Lagos 2026 dates have passed. Visitors should register for tickets for last year’s event.</p><p>Original organizer announcement and event schedule are retained as historical evidence.</p></main></body></html>';
  assert.equal(getArticleText(current).includes("Design Week Lagos"), true);
  assert.doesNotThrow(() => assertSameArticleContent(current, current, "consistent"));
  assert.throws(() => assertSameArticleContent(stale, current, "canonical"), /stale article body differs/);
  assert.throws(() => getArticleText("<html><body>missing main</body></html>"), /Missing visible/);
});

test("content comparison ignores Next hydration scripts and equivalent HTML entities", () => {
  const content = '<main><h1>Event info</h1><p>' + "The 18–25 October event has ended and no new tickets are on sale at this point." + '</p><p>Follow the original organizer for a new future edition when one has been confirmed.</p>';
  const a = content + '<script>window.__next={"old":"false"}</script></main>';
  const b = content.replace("18–25", "18&#8211;25") + '<script>window.__next={"counter":234}</script></main>';
  assert.equal(getArticleText(a), getArticleText(b));
  assert.doesNotThrow(() => assertSameArticleContent(a, b, "hydration independent"));
});

test("Design Week cache guard rejects old ticket prompts on the normal canonical URL", () => {
  const marker = CONTENT_FRESHNESS_CANARIES.find(x => x.path === "/explore/design-week-lagos-2026");
  assert.ok(marker);
  const good = '<main><h1>Design Week Lagos</h1><p>' + marker.required.join(". ") + '</p><p>This is a historic record of previously announced events. Check with the original organizer before planning a future visit.</p></main>';
  assert.doesNotThrow(() => assertFreshnessSignals(good, "current", marker));
  const stale = good.replace(marker.required[0], "Which hall date should you book?");
  assert.throws(() => assertFreshnessSignals(stale, "stale", marker), /missing verified current copy/);
  assert.throws(() => assertFreshnessSignals(good.replace("historic record", marker.forbidden[1] + " historic record"), "old", marker), /obsolete public copy/);
});

import test from "node:test";
import assert from "node:assert/strict";
import { CRAWL_CANARIES, validateIndexableHtml } from "../scripts/check-googlebot-crawl-parity.mjs";

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

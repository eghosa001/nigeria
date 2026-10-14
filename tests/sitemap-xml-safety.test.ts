import assert from "node:assert/strict";
import test from "node:test";
import { escapeSitemapXml } from "../lib/sitemap-xml";

test("sitemap XML escapes reserved characters and preserves international text", () => {
  assert.equal(escapeSitemapXml('Lagos & <film> "2026" 🙌'), 'Lagos &amp; &lt;film&gt; &quot;2026&quot; 🙌');
});

test("sitemap XML strips invalid control codes and isolated surrogate characters", () => {
  assert.equal(escapeSitemapXml("A\u0000B\u0007C\u000bD\ud800E\ufffeF\nG"), "ABCDEF\nG");
});

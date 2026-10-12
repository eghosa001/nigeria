import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const services = JSON.parse(readFileSync(new URL("../data/services-universities.json", import.meta.url), "utf8"));
const slugs = new Set(services.map((service: { slug: string }) => service.slug));

test("university guides are unique, date-scoped, sourced and actionable", () => {
  assert.equal(services.length, 5);
  assert.equal(slugs.size, services.length);
  for (const s of services) {
    assert.equal(s.category, "Education");
    assert.equal(s.lastVerified, "2026-10-12");
    assert.ok(s.sources.length >= 2 && s.sources.every((x: {url: string}) => x.url.startsWith("https://")));
    assert.ok(s.steps.length >= 5 && s.requirements.length >= 3);
    assert.match(s.feeNote, /202[356]|current|session|invoice/i);
    assert.ok(s.notes.some((x: string) => /202[356]|session|2026/i.test(x)));
    assert.ok(s.searchTerms.some((x:string)=>/school fees/i.test(x)));
    assert.ok(s.related.includes("jamb-caps"));
  }
  assert.ok(services.every((s: {notes:string[]}) => s.notes.some((x) => /portal|payment|invoice|fees|charges/i.test(x))));
});

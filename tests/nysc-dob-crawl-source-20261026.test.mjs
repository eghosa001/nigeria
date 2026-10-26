import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("NYSC date-of-birth correction has accessible canonical issuer citations", () => {
  const records = JSON.parse(readFileSync("data/services.json", "utf8"));
  const item = records.find((service) => service.slug === "nysc-correct-date-of-birth");
  assert.ok(item);
  assert.equal(item.lastVerified, "2026-10-26");
  assert.deepEqual(item.sources.map((source) => source.url), [
    "https://www.nysc.gov.ng/correctdob.html",
    "https://www.nysc.gov.ng/faq.html",
  ]);
  assert.ok(item.sources.every((source) => source.lastChecked === "2026-10-26"));
  assert.ok(item.summary.includes("WAEC verification PIN"));
  assert.ok(item.notes.some((note) => note.includes("deployment/service")));
  assert.ok(item.notes.some((note) => note.includes("Student Affairs Officer")));
});

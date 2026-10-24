import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

type Service = {
  slug: string;
  summary: string;
  steps: string[];
  notes: string[];
  sources: Array<{ url: string; lastChecked: string }>;
  related: string[];
  lastVerified: string;
};
const services = JSON.parse(readFileSync(new URL("../data/services.json", import.meta.url), "utf8")) as Service[];
const service = services.find(s => s.slug === "waec-lost-certificate");

test("WAEC lost-certificate page has three distinct official remedies without repeated no-duplicate claim", () => {
  assert.ok(service);
  assert.equal(service.lastVerified, "2026-10-24");
  assert.ok(service.sources.some(s => s.url === "https://www.waecnigeria.org/faq" && s.lastChecked === "2026-10-24"));
  assert.match(service.summary, /statement of result, paid confirmation of results and attestation/);
  assert.match(service.summary, /before paying/i);
  assert.doesNotMatch(service.summary, /does not routinely print a duplicate/);
  assert.equal((service.summary.match(/original certificate/gi) ?? []).length, 1);
  assert.ok(service.steps.length >= 7, "retain an actual detailed user journey, not just a disclaimer");
  assert.equal(new Set(service.steps).size, service.steps.length);
  assert.ok(service.steps.some(s => /school candidates/i.test(s)));
  assert.ok(service.steps.some(s => /private candidates/i.test(s)));
  assert.ok(service.steps.some(s => /receiving institution/i.test(s)));
  assert.ok(service.steps.some(s => /unverified agent/i.test(s)));
  assert.ok(service.notes.some(s => /different official options|different remedies|different outputs|identical outputs/i.test(s)));
  assert.ok(service.related.includes("waec-digital-certificate"));
});

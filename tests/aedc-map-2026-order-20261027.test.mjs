import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const records = JSON.parse(readFileSync(new URL("../data/services-scale-verified.json", import.meta.url), "utf8"));
const matches = records.filter((service) => service.slug === "aedc-map-refund");

test("AEDC MAP refund keeps one canonical page and cites the effective 2026 NERC order", () => {
  assert.equal(matches.length, 1);
  const guide = matches[0];
  assert.equal(guide.lastVerified, "2026-10-27");
  const order = guide.sources.filter((source) =>
    source.url === "https://nerc.gov.ng/wp-content/uploads/2026/03/Amended-Order-on-the-Reimbursement-of-Meter-Costs.pdf");
  assert.equal(order.length, 1);
  assert.equal(order[0].lastChecked, "2026-10-27");
  assert.match(guide.timeline, /fourth day of each month/);
  assert.match(guide.timeline, /120-month schedule/);
  assert.match(guide.timeline, /31 December 2025/);
  assert.match(guide.timeline, /12-month catch-up from March 2026/);
  assert.match(guide.timeline, /not proof that AEDC has issued a token/);
});

test("AEDC customers can reconcile credits and dispute legacy-debt offsets without duplicated generic notes", () => {
  const guide = matches[0];
  assert.ok(guide.steps.some((step) =>
    /original meter cost/.test(step) &&
    /credits already applied/.test(step) &&
    /outstanding balance/.test(step)));
  assert.ok(guide.notes.some((note) =>
    /prohibits deducting MAP reimbursement credits/.test(note) &&
    /older electricity debt/.test(note)));
  assert.equal(guide.notes.length, 3);
  assert.equal(new Set(guide.notes).size, guide.notes.length);
  assert.equal(guide.officialPortal, "https://maprefund.abujaelectricity.com/");
  assert.ok(guide.steps.some((step) => /map.refund@abujaelectricity.com/.test(step)));
});

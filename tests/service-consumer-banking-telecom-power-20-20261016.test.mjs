import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const services = JSON.parse(readFileSync("data/services.json", "utf8"));
const bySlug = new Map(services.map((s) => [s.slug, s]));
const slugs = [
  "bvn-enrolment", "bvn-retrieval", "non-resident-bvn", "nip-transfer-status",
  "cbn-bank-complaint", "bvn-validation", "bvn-data-update", "nin-sim-linkage",
  "check-nin-sim-linkage-status", "fix-failed-nin-sim-linkage", "ncc-telecom-complaint",
  "electricity-prepaid-meter-application", "electricity-meter-paid-not-installed",
  "electricity-estimated-billing-dispute", "electricity-complaint-escalation",
  "electricity-tariff-band", "fccpc-consumer-complaint",
  "vehicle-insurance-validation-ussd", "customs-vehicle-duty-verification",
  "customs-846-non-standard-vin",
];
const body = (slug) => {
  const item = bySlug.get(slug);
  return [item.summary, item.feeLabel, item.feeNote ?? "", ...item.requirements,
    ...item.steps, ...item.notes].join(" ");
};

test("20 canonical pages retain substantive, distinct and sourced instructions", () => {
  assert.equal(slugs.length, 20);
  assert.equal(new Set(slugs).size, 20);
  for (const slug of slugs) {
    const item = bySlug.get(slug);
    assert.ok(item, slug);
    assert.ok(item.summary.length >= 170, slug);
    assert.ok(item.steps.length >= 7, slug);
    assert.ok(item.requirements.length >= 3, slug);
    assert.ok(item.notes.length >= 3, slug);
    assert.ok(item.sources.length >= 1, slug);
    assert.ok(item.sources.every((s) => s.url.startsWith("https://")), slug);
    assert.equal(item.lastVerified, "2026-10-16", slug);
    assert.equal(new Set(item.steps).size, item.steps.length, slug);
  }
});

test("regulated fees, conditional outcomes and jurisdiction stay distinct", () => {
  assert.match(body("bvn-enrolment"), /18 or above/);
  assert.match(body("bvn-data-update"), /only once/);
  assert.match(body("bvn-retrieval"), /₦20/);
  assert.match(body("nip-transfer-status"), /48 hours/);
  assert.match(body("cbn-bank-complaint"), /30 days/);
  assert.match(body("nin-sim-linkage"), /free \*996#/);
  assert.match(body("ncc-telecom-complaint"), /622/);
  assert.match(body("electricity-meter-paid-not-installed"), /10 working days/);
  for (const slug of slugs.filter((s) => s.startsWith("electricity-"))) {
    assert.match(body(slug), /State Electricity Regulator/i, slug);
  }
  assert.match(body("fccpc-consumer-complaint"), /tracking code/i);
  assert.match(body("vehicle-insurance-validation-ussd"), /not found/);
  assert.match(body("customs-846-non-standard-vin"), /Customs Agent Licence/);
});

test("20 journeys distinguish phone checks, physical capture and regulator routes", () => {
  const src = readFileSync("lib/journey.ts", "utf8");
  const from = src.indexOf("const verifiedConsumerJourneys:");
  const to = src.indexOf("const verifiedPublicRecordJourneys:");
  assert.ok(from >= 0 && to > from);
  const segment = src.slice(from, to);
  for (const slug of slugs) assert.ok(segment.includes(JSON.stringify(slug) + ": {"), slug);
  assert.match(src, /if \(verifiedConsumerJourneys\[service.slug\]\)/);
  for (const slug of ["bvn-retrieval", "nip-transfer-status", "bvn-validation", "vehicle-insurance-validation-ussd"]) {
    const pos = segment.indexOf(JSON.stringify(slug) + ": {");
    assert.match(segment.slice(pos, segment.indexOf("\n  },", pos)), /mode: "ussd"/, slug);
  }
  const pos = segment.indexOf('"bvn-enrolment": {');
  assert.match(segment.slice(pos, segment.indexOf("\n  },", pos)), /physicalStatus: "required"/);
  const lic = segment.indexOf('"customs-846-non-standard-vin": {');
  assert.match(segment.slice(lic, segment.indexOf("\n  },", lic)), /mode: "agency-guided"/);
});

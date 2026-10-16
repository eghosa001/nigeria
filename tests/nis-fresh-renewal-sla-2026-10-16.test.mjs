import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync("data/services.json", "utf8"));
const get = (slug) => catalog.find((item) => item.slug === slug);
const fresh = get("first-nigerian-passport");
const renew = get("passport-renewal");
const sla = "SERVICE-LEVEL-AGREEMENT-2026_.pdf";

test("2026 NIS passport pages retain separate original canonical and appropriate timeline", () => {
  assert.ok(fresh && renew);
  assert.equal(catalog.filter((s) => ["first-nigerian-passport", "passport-renewal"].includes(s.slug)).length, 2);
  assert.match(fresh.timeline, /42 days.*successful biometric enrolment/i);
  assert.match(renew.timeline, /21 days.*successful biometric enrolment/i);
  for (const record of [fresh, renew]) {
    assert.ok(record.sources.some((source) => source.url.includes(sla)));
    assert.ok(record.sources.every((source) => !source.url.includes("SERVICE_LEVEL_AGREEMENT_2025")));
    assert.ok(record.sources.every((source) => !source.url.includes("SERVICE-LEVEL-AGREEMENT-2025")));
    assert.equal(record.officialPortal, "https://passport.immigration.gov.ng/");
    assert.match(record.timeline, /not (?:an appointment wait-time or guaranteed|a guaranteed|a guarantee)/i);
    assert.ok(record.steps.length >= 7);
    assert.ok(record.sources.every((source) => source.lastChecked === "2026-10-16"));
  }
});
test("fees and in-person biometric stages are not mistaken for full online service", () => {
  for (const record of [fresh, renew]) {
    assert.match(record.feeNote, /₦100,000/);
    assert.match(record.feeNote, /₦200,000/);
    assert.match(record.feeNote, /excluding bank charges|bank charges/i);
    assert.match(record.steps.join(" "), /attend.*Immigration Office|attend.*office/i);
    assert.match(record.steps.join(" "), /biometric/i);
  }
  assert.match(renew.feeNote, /not automatically incur.*₦30,000/i);
});
test("fresh, renewal, correction and special applicant pathways stay distinct", () => {
  assert.match(fresh.steps.join(" "), /Apply for Fresh Passport/);
  assert.match(fresh.requirements.join(" "), /under 18|minor/i);
  assert.match(fresh.notes.join(" "), /naturalisation or registration/i);
  assert.match(renew.steps.join(" "), /Apply for Renewal\/Re-issue/);
  assert.match(renew.steps.join(" "), /lost\/stolen/i);
  assert.match(renew.steps.join(" "), /change-of-data/i);
  assert.ok(!fresh.summary.startsWith("A source-linked starter checklist"));
});

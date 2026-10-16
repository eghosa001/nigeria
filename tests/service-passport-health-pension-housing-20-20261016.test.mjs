import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const services = JSON.parse(readFileSync("data/services.json", "utf8"));
const bySlug = new Map(services.map((service) => [service.slug, service]));
const corrected = [
  "passport-centre-availability", "passport-photo-compliance",
  "passport-appointment", "passport-application-abroad",
  "passport-name-change", "passport-change-marital-status",
  "official-nigerian-passport", "emergency-travel-certificate",
  "e-cerpac-renewal", "nhia-find-right-health-plan",
  "nhia-private-sector-coverage", "nhia-gifship-enrolment",
  "pencom-transfer-rsa", "pencom-unremitted-contributions",
  "pencom-micro-pension-registration", "nhf-registration-and-contributions",
  "nhf-contribution-refund", "nhf-mortgage-loan",
  "nelfund-loan-repayment", "nelfund-loan-status-and-upkeep",
];

test("20 old canonical service URLs receive robust current instructions, not merely date changes", () => {
  assert.equal(new Set(corrected).size, 20);
  for (const slug of corrected) {
    const service = bySlug.get(slug);
    assert.ok(service, slug);
    assert.ok(service.summary.length >= 300, slug + " summary");
    assert.ok(service.steps.length >= 7, slug + " steps");
    assert.ok(service.requirements.length >= 3, slug + " requirements");
    assert.ok(service.notes.length >= 3, slug + " notes");
    assert.ok(service.lastVerified >= "2026-10-16", slug);
    assert.ok(service.sources.length >= 1, slug);
    assert.ok(service.sources.every((s) => s.url.startsWith("https://")
      && s.lastChecked >= "2026-10-16" && s.lastChecked <= service.lastVerified), slug);
  }
});

test("official fee distinctions, eligibility changes and limitations stay visible", () => {
  const get = (slug) => bySlug.get(slug);
  const combined = (slug) => {
    const service = get(slug);
    return [service.summary, service.feeLabel, service.feeNote,
      ...service.requirements, ...service.steps, ...service.notes].join(" ");
  };
  assert.match(combined("passport-centre-availability"), /does not reserve|does not hold/i);
  assert.match(combined("passport-appointment"), /biometric/i);
  assert.match(combined("official-nigerian-passport"), /₦40,000/);
  assert.match(combined("nhia-private-sector-coverage"), /five or more employees/i);
  assert.match(combined("nhia-gifship-enrolment"), /₦220,000/);
  assert.match(combined("nhia-gifship-enrolment"), /inconsistent/i);
  assert.equal(get("nhia-gifship-enrolment").status, "conflict");
  assert.match(combined("pencom-transfer-rsa"), /365 days/);
  assert.match(combined("pencom-micro-pension-registration"), /Personal Pension Plan \(PPP\)/);
  assert.match(combined("pencom-unremitted-contributions"), /uncredited/i);
  assert.match(combined("nhf-contribution-refund"), /Refund → Proceed to Application/);
  assert.match(combined("nhf-registration-and-contributions"), /Contribution History/);
  assert.match(combined("nhf-mortgage-loan"), /Check Affordability/);
  assert.match(combined("nhf-mortgage-loan"), /6%/);
  assert.match(combined("nelfund-loan-repayment"), /60.days/i);
  assert.match(combined("nelfund-loan-status-and-upkeep"), /institutional charges/i);
});

test("all 20 public service journeys prevent fake fully-online or wrong account routes", () => {
  const src = readFileSync("lib/journey.ts", "utf8");
  for (const slug of corrected) {
    assert.ok(src.includes('"' + slug + '": {'), "missing verified journey " + slug);
  }
  for (const slug of [
    "passport-appointment", "passport-application-abroad",
    "passport-name-change", "passport-change-marital-status",
    "official-nigerian-passport"
  ]) {
    const section = src.slice(src.indexOf('"' + slug + '": {'), src.indexOf("\n  },", src.indexOf('"' + slug + '": {')));
    assert.match(section, /mode: "hybrid"/, slug);
    assert.match(section, /physicalStatus: "required"/, slug);
  }
  assert.match(src, /"nhia-private-sector-coverage": \{\s*mode: "agency-guided"/);
  assert.match(src, /"pencom-micro-pension-registration": \{\s*mode: "hybrid"/);
  assert.match(src, /"emergency-travel-certificate": \{\s*mode: "agency-guided"/);
  assert.match(src, /"nhf-contribution-refund": \{\s*mode: "online"/);
});

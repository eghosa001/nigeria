import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const pages = JSON.parse(readFileSync("data/services.json", "utf8"));
const bySlug = new Map(pages.map((x) => [x.slug, x]));
const slugs = [
  "nafdac-product-registration", "nafdac-product-verification", "nafdac-product-renewal",
  "soncap-import-certification", "son-mancap-certification", "son-product-registration",
  "nsitf-employer-registration", "nsitf-workplace-injury-claim", "nsitf-compliance-certificate",
  "nde-rhei-registration", "itf-employer-registration", "itf-compliance-certificate",
  "pencom-open-rsa", "pencom-job-loss-25-percent-withdrawal", "pencom-pension-clearance-certificate",
  "fmbn-home-renovation-loan", "unclaimed-dividends-nigeria", "nin-name-modification",
  "nin-address-modification", "check-nin-number",
];
const textFor = (slug) => {
  const s = bySlug.get(slug);
  return [s.summary, s.feeLabel ?? "", s.feeNote ?? "", ...s.steps,
    ...s.requirements, ...s.notes].join(" ");
};

test("20 existing canonical Services guides contain actionable sources and no repeated instructions", () => {
  assert.equal(slugs.length, 20);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) {
    const s = bySlug.get(slug);
    assert.ok(s, slug);
    assert.ok(s.summary.length >= 180, slug);
    assert.ok(s.steps.length >= 7, slug);
    assert.ok(s.requirements.length >= 3, slug);
    assert.ok(s.notes.length >= 3, slug);
    assert.ok(s.sources.length >= 2, slug);
    assert.ok(s.sources.every((src) => src.url.startsWith("https://")), slug);
    assert.equal(s.lastVerified, "2026-10-16", slug);
    assert.equal(new Set(s.steps).size, s.steps.length, slug);
  }
});

test("2026 agency changes and conditional instructions are retained", () => {
  assert.match(textFor("soncap-import-certification"), /27 March 2026/);
  assert.match(textFor("soncap-import-certification"), /nsw.gov.ng/);
  assert.match(textFor("son-mancap-certification"), /two quarterly inspections/i);
  assert.match(textFor("nsitf-workplace-injury-claim"), /not yet handled on the Employer Self-Service Portal/i);
  assert.match(textFor("nde-rhei-registration"), /CLOSED/i);
  assert.match(textFor("itf-employer-registration"), /Form 7A/);
  assert.match(textFor("itf-compliance-certificate"), /Form 5A/);
  assert.match(textFor("pencom-job-loss-25-percent-withdrawal"), /four.month/i);
  assert.match(textFor("pencom-pension-clearance-certificate"), /1 July 2026/);
  assert.match(textFor("fmbn-home-renovation-loan"), /six.month/i);
  assert.match(textFor("unclaimed-dividends-nigeria"), /e.DMMS/);
  assert.match(textFor("check-nin-number"), /₦50/);
});

test("20 verified journey routes do not mislabel unavailable online submissions", () => {
  const src = readFileSync("lib/journey.ts", "utf8");
  const start = src.indexOf("const verifiedRegulatedJourneys:");
  const end = src.indexOf("const verifiedPublicRecordJourneys:");
  assert.ok(start >= 0 && end > start);
  const mapped = src.slice(start, end);
  for (const slug of slugs) assert.ok(mapped.includes(JSON.stringify(slug) + ": {"), slug);
  assert.match(src, /if \(verifiedRegulatedJourneys\[service.slug\]\)/);
  for (const slug of ["nsitf-workplace-injury-claim", "nde-rhei-registration"]) {
    const at = mapped.indexOf(JSON.stringify(slug) + ": {");
    assert.match(mapped.slice(at, mapped.indexOf("\n  },", at)), /onlineAvailable: false/, slug);
  }
  for (const slug of ["itf-employer-registration", "son-mancap-certification"]) {
    const at = mapped.indexOf(JSON.stringify(slug) + ": {");
    assert.match(mapped.slice(at, mapped.indexOf("\n  },", at)), /physicalStatus: "required"/, slug);
  }
});

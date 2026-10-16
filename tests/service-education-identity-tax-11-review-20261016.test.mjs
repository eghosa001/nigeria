import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const records = JSON.parse(readFileSync("data/services.json", "utf8"));
const get = (slug) => records.find((record) => record.slug === slug);
const corrected = [
  "waec-confirm-result-nigeria", "waec-correct-certificate-error",
  "waec-withheld-result-complaint", "neco-institution-verification",
  "neco-e-verify", "nin-name-modification", "nin-address-modification",
  "nrs-individual-tax-registration", "nrs-corporate-tax-registration",
  "nrs-tax-clearance-certificate", "nrs-refund-tracking",
];

test("11 existing service guides have actionable checked evidence", () => {
  assert.equal(new Set(corrected).size, 11);
  for (const slug of corrected) {
    const record = get(slug);
    assert.ok(record, slug);
    assert.equal(record.lastVerified, "2026-10-16", slug);
    assert.ok(record.steps.length >= 5, slug);
    assert.ok(record.sources.every((source) => source.lastChecked === "2026-10-16"), slug);
  }
  assert.match(get("waec-confirm-result-nigeria").feeNote, /₦13,000.*courier/i);
  assert.match(get("waec-correct-certificate-error").steps.join(" "), /school principal.*private candidate/i);
  assert.match(get("waec-withheld-result-complaint").summary, /waecinternational\.org/);
  assert.match(get("neco-institution-verification").steps.join(" "), /Institutional Verifier/);
  assert.match(get("neco-e-verify").steps.join(" "), /Validate Token Payment/);
  assert.match(get("nin-address-modification").requirements.join(" "), /bank statement/i);
  assert.match(get("nrs-individual-tax-registration").summary, /Non-Resident/);
});

test("six verified route labels do not imply an unsupported web-only transaction", () => {
  const journeys = readFileSync("lib/journey.ts", "utf8");
  for (const slug of corrected.slice(0, 7).filter((x) => x !== "neco-e-verify")) {
    assert.ok(journeys.includes('"' + slug + '": {'), slug);
  }
  assert.match(journeys, /"waec-confirm-result-nigeria": \{\s*mode: "agency-guided"/);
  assert.match(journeys, /"nin-name-modification": \{\s*mode: "hybrid"/);
});

test("SEO monitor discovery assertions avoid grep -q upstream pipe SIGPIPE", () => {
  const yaml = readFileSync(".github/workflows/production-monitor.yml", "utf8");
  const discovery = yaml.split("- name: Verify SEO discovery endpoints")[1].split("- name: Verify Google AdSense")[0];
  assert.ok(discovery.includes('grep -Fq -- "$needle" <<< "$body"'));
  assert.ok(!/printf[^\n]+\|\s*grep\s+-[A-Za-z]*q/.test(discovery));
  assert.match(discovery, /Sitemap index, section sitemaps and robots discovery checks passed/);
});

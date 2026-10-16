import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const records = JSON.parse(readFileSync("data/services.json", "utf8"));
const bySlug = new Map(records.map((row) => [row.slug, row]));
const slugs = [
  "upgrade-drivers-licence-class", "drivers-licence-verification",
  "jamb-retrieve-profile-code", "jamb-reset-profile-password",
  "jamb-caps", "jamb-admission-letter", "jamb-matriculation-list",
  "nysc-revalidation", "nysc-exemption-certificate", "nysc-correct-course-of-study",
  "npc-birth-certificate-reprint", "npc-digital-birth-certificate-reissuance",
  "inec-find-pvc-pickup-location", "inec-polling-unit-locator",
  "cac-public-search", "cac-incorporated-trustee-registration",
  "nin-slip-reissue", "fct-verify-tax-clearance",
  "edo-tax-id-access", "vehicle-proof-of-ownership-verification",
];

test("20 canonical public-record services have actionably revised, dated official routes", () => {
  assert.equal(new Set(slugs).size, 20);
  for (const slug of slugs) {
    const s = bySlug.get(slug);
    assert.ok(s, slug);
    assert.ok(s.summary.length > 160, slug);
    assert.ok(s.requirements.length >= 3, slug);
    assert.ok(s.steps.length >= 5, slug);
    assert.ok(s.notes.length >= 3, slug);
    assert.ok(s.lastVerified >= "2026-10-16", slug);
    assert.ok(s.sources.every((source) => source.url.startsWith("https://") &&
      source.lastChecked >= "2026-10-16" && source.lastChecked <= s.lastVerified), slug);
  }
});

test("fees and application exceptions match distinct government services", () => {
  const get = (slug) => bySlug.get(slug);
  assert.match(get("npc-birth-certificate-reprint").feeNote, /US\$30/);
  assert.match(get("npc-digital-birth-certificate-reissuance").summary, /8 November 2023/);
  assert.match(get("npc-digital-birth-certificate-reissuance").steps.join(" "), /download.*once/i);
  assert.match(get("upgrade-drivers-licence-class").steps.join(" "), /commercial.*capture centre/i);
  assert.match(get("jamb-admission-letter").feeNote, /₦1,000.*₦100/);
  assert.match(get("nysc-exemption-certificate").summary, /foreign-trained.*person/i);
  assert.match(get("inec-find-pvc-pickup-location").summary, /proxy/i);
  assert.match(get("edo-tax-id-access").steps.join(" "), /\*668#/);
  assert.match(get("fct-verify-tax-clearance").steps.join(" "), /TCC Ref#/);
  assert.match(get("drivers-licence-verification").steps.join(" "), /RID/);
  assert.match(get("nin-slip-reissue").feeNote, /₦600.*₦1,000.*₦500/);
  assert.equal(get("nin-slip-reissue").status, "conflict");
});

test("14 manual journeys distinguish SMS, online requests and required collection", () => {
  const journey = readFileSync("lib/journey.ts", "utf8");
  const overridden = [
    "upgrade-drivers-licence-class", "drivers-licence-verification",
    "jamb-retrieve-profile-code", "jamb-reset-profile-password", "jamb-caps",
    "nysc-exemption-certificate", "npc-birth-certificate-reprint",
    "npc-digital-birth-certificate-reissuance", "inec-find-pvc-pickup-location",
    "cac-incorporated-trustee-registration", "nin-slip-reissue",
    "fct-verify-tax-clearance", "edo-tax-id-access",
    "vehicle-proof-of-ownership-verification",
  ];
  for (const slug of overridden) assert.ok(journey.includes('"' + slug + '": {'), slug);
  assert.match(journey, /"jamb-retrieve-profile-code": \{\s*mode: "agency-guided"/);
  assert.match(journey, /"inec-find-pvc-pickup-location": \{\s*mode: "hybrid"/);
  assert.match(journey, /"nin-slip-reissue": \{\s*mode: "agency-guided"/);
});

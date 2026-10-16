import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const pages = JSON.parse(readFileSync("data/services.json", "utf8"));
const bySlug = new Map(pages.map((page) => [page.slug, page]));
const slugs = [
  "nin-enrolment", "nin-date-of-birth-modification", "nin-phone-modification",
  "new-drivers-licence", "renew-drivers-licence", "vehicle-registration-nvis",
  "verify-vehicle-number-plate", "npc-child-birth-registration",
  "npc-check-attestation-status", "npc-modify-birth-record",
  "npc-death-registration", "federal-marriage-application",
  "marriage-document-verification-and-ctc", "nrs-self-tax-filing",
  "nrs-tax-payment", "lagos-payer-id", "lagos-tax-clearance-verification",
  "ogun-taxpayer-registration", "rivers-rivtin-registration",
  "fct-file-individual-tax-return",
];
const allText = (slug) => {
  const page = bySlug.get(slug);
  return [page.summary, page.feeLabel ?? "", page.feeNote ?? "",
    ...page.steps, ...page.notes, ...page.requirements].join(" ");
};

test("20 original civic URLs have accurate steps, requirements and agency sources", () => {
  assert.equal(new Set(slugs).size, 20);
  for (const slug of slugs) {
    const page = bySlug.get(slug);
    assert.ok(page, slug);
    assert.ok(page.summary.length >= 200, slug);
    assert.ok(page.steps.length >= 7, slug);
    assert.ok(page.requirements.length >= 3, slug);
    assert.ok(page.notes.length >= 3, slug);
    assert.ok(page.sources.length >= 1, slug);
    assert.ok(page.sources.every((source) => source.url.startsWith("https://")), slug);
    assert.equal(page.lastVerified, "2026-10-16", slug);
  }
});

test("critical fee and process distinctions are protected", () => {
  assert.equal(bySlug.get("nin-date-of-birth-modification").status, "conflict");
  assert.match(allText("nin-date-of-birth-modification"), /₦28,574/);
  assert.match(allText("nin-date-of-birth-modification"), /₦15,000/);
  assert.match(allText("new-drivers-licence"), /VIO/);
  assert.match(allText("npc-modify-birth-record"), /US\$20/);
  assert.match(allText("npc-death-registration"), /free/i);
  assert.match(allText("federal-marriage-application"), /₦75,000/);
  assert.match(allText("marriage-document-verification-and-ctc"), /₦50,000/);
  assert.match(allText("ogun-taxpayer-registration"), /CAC number/i);
  assert.match(allText("fct-file-individual-tax-return"), /Returns Reference Number/);
});

test("20 agency-specific journeys do not invent remote-only visits", () => {
  const source = readFileSync("lib/journey.ts", "utf8");
  const start = source.indexOf("const verifiedCivicJourneys:");
  const end = source.indexOf("const verifiedPublicRecordJourneys:");
  assert.ok(start >= 0 && end > start);
  const segment = source.slice(start, end);
  for (const slug of slugs) assert.ok(segment.includes(JSON.stringify(slug) + ": {"), slug);
  assert.match(source, /if \(verifiedCivicJourneys\[service.slug\]\)/);
  for (const slug of ["nin-enrolment", "new-drivers-licence", "federal-marriage-application"]) {
    const from = segment.indexOf(JSON.stringify(slug) + ": {");
    const row = segment.slice(from, segment.indexOf("\n  },", from));
    assert.match(row, /physicalStatus: "required"/, slug);
  }
  for (const slug of ["verify-vehicle-number-plate", "npc-check-attestation-status", "lagos-tax-clearance-verification"]) {
    const from = segment.indexOf(JSON.stringify(slug) + ": {");
    const row = segment.slice(from, segment.indexOf("\n  },", from));
    assert.match(row, /physicalStatus: "not-stated"/, slug);
  }
});

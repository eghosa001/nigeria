import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const services = JSON.parse(readFileSync("data/services.json", "utf8"));
const bySlug = new Map(services.map((s) => [s.slug, s]));
const slugs = [
  "jamb-profile-code", "jamb-2026-utme-registration",
  "jamb-retrieve-lost-epin", "jamb-direct-entry-2026",
  "jamb-print-result", "waec-check-result",
  "waec-digital-certificate", "waec-collect-certificate",
  "waec-confirm-result-nigeria", "waec-lost-certificate",
  "waec-result-confirmation-overseas", "waec-withheld-result-complaint",
  "neco-2026-ssce-internal-registration", "neco-check-result",
  "neco-purchase-result-token", "neco-payment",
  "neco-certificate-service", "nysc-registration-local",
  "nysc-foreign-trained-registration", "nysc-remobilization",
];
const text = (slug) => {
  const s = bySlug.get(slug);
  return [s.summary, s.feeLabel, s.feeNote ?? "", s.timeline ?? "",
    ...s.requirements, ...s.steps, ...s.notes].join(" ");
};

test("20 distinct existing canonical education guides have actionable, cited steps", () => {
  assert.equal(slugs.length, 20);
  assert.equal(new Set(slugs).size, 20);
  for (const slug of slugs) {
    const s = bySlug.get(slug);
    assert.ok(s, slug);
    assert.ok(s.summary.length >= 280, slug);
    assert.ok(s.steps.length >= 7, slug);
    assert.ok(s.notes.length >= 3, slug);
    assert.ok(s.requirements.length >= 2, slug);
    assert.ok(s.sources.length >= 1, slug);
    assert.ok(s.sources.every((source) => source.url.startsWith("https://")), slug);
    assert.equal(s.lastVerified, "2026-10-16", slug);
  }
});

test("critical fee, eligibility and failure-path distinctions do not regress", () => {
  assert.match(text("jamb-profile-code"), /55019|66019/);
  assert.match(text("jamb-retrieve-lost-epin"), /UTMEPIN/);
  assert.match(text("jamb-2026-utme-registration"), /accredited CBT/i);
  assert.match(text("jamb-print-result"), /₦1,000/);
  assert.match(text("waec-digital-certificate"), /Certificate Access/);
  assert.match(text("waec-lost-certificate"), /does not (?:routinely )?(?:duplicate|print)/i);
  assert.match(text("neco-payment"), /no (?:user )?account (?:is )?needed/i);
  assert.match(text("neco-2026-ssce-internal-registration"), /29 May 2026/);
  assert.match(text("nysc-registration-local"), /Revalidation/);
  assert.match(text("nysc-remobilization"), /only approved/i);
  assert.equal(bySlug.get("waec-result-confirmation-overseas").status, "conflict");
});

test("20 journeys specify usable entry points rather than generic portal guesses", () => {
  const source = readFileSync("lib/journey.ts", "utf8");
  const start = source.indexOf("const verifiedEducationJourneys:");
  const end = source.indexOf("const verifiedPublicRecordJourneys:");
  assert.ok(start >= 0 && end > start);
  const block = source.slice(start, end);
  for (const slug of slugs) {
    assert.ok(block.includes(JSON.stringify(slug) + ": {"), slug);
  }
  assert.match(source, /if \(verifiedEducationJourneys\[service.slug\]\)/);
  for (const slug of ["jamb-2026-utme-registration", "jamb-direct-entry-2026", "nysc-foreign-trained-registration"]) {
    const from = block.indexOf(JSON.stringify(slug) + ": {");
    const section = block.slice(from, block.indexOf("\\n  },", from));
    assert.match(section, /mode: "hybrid"/, slug);
    assert.match(section, /physicalStatus: "required"/, slug);
  }
  for (const slug of ["waec-collect-certificate", "neco-certificate-service"]) {
    const from = block.indexOf(JSON.stringify(slug) + ": {");
    const section = block.slice(from, block.indexOf("\\n  },", from));
    assert.match(section, /physicalStatus: "required"/, slug);
  }
});

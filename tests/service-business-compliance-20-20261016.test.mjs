import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const services = JSON.parse(readFileSync("data/services.json", "utf8"));
const bySlug = new Map(services.map((s) => [s.slug, s]));
const slugs = [
  "cac-business-name-registration", "cac-company-registration",
  "cac-name-reservation", "cac-annual-returns", "cac-status-report",
  "cac-certified-true-copy", "cac-change-director",
  "cac-change-registered-address", "cac-beneficial-ownership-psc",
  "cac-public-search", "nipo-trademark-registration",
  "nipo-patent-registration", "nipo-industrial-design-registration",
  "copyright-work-registration", "nepc-exporter-registration",
  "nepc-exporter-certificate-renewal-verification",
  "smedan-msme-registration", "bpp-contractor-registration",
  "scuml-certificate-registration", "scuml-certificate-verification",
];
const combined = (slug) => {
  const s = bySlug.get(slug);
  return [s.summary, s.feeLabel, s.feeNote ?? "", s.timeline ?? "",
    ...s.requirements, ...s.steps, ...s.notes].join(" ");
};

test("20 old URLs now have substantive requirements, process and aftercare", () => {
  assert.equal(slugs.length, 20);
  assert.equal(new Set(slugs).size, 20);
  for (const slug of slugs) {
    const s = bySlug.get(slug);
    assert.ok(s, slug);
    assert.ok(s.summary.length >= 220, slug);
    assert.ok(s.steps.length >= 7, slug);
    assert.ok(s.requirements.length >= 3, slug);
    assert.ok(s.notes.length >= 3, slug);
    assert.ok(s.sources.length >= 2, slug);
    assert.ok(s.sources.every((src) => src.url.startsWith("https://")), slug);
    assert.equal(s.lastVerified, "2026-10-16", slug);
  }
});

test("agency-specific constraints and unresolved steps stay explicit", () => {
  assert.match(combined("cac-business-name-registration"), /View Query History/);
  assert.match(combined("cac-company-registration"), /manual review/i);
  assert.match(combined("cac-name-reservation"), /consent/i);
  assert.match(combined("cac-annual-returns"), /before July 2025/i);
  assert.match(combined("cac-status-report"), /CAC 1\.1/);
  assert.match(combined("cac-beneficial-ownership-psc"), /five.percent/i);
  assert.match(combined("nipo-trademark-registration"), /two.month opposition/i);
  assert.match(combined("nipo-patent-registration"), /formal examination/i);
  assert.match(combined("nipo-industrial-design-registration"), /15 years/);
  assert.match(combined("copyright-work-registration"), /automatically/);
  assert.match(combined("nepc-exporter-registration"), /physical certificate collection has been discontinued/i);
  assert.match(combined("nepc-exporter-certificate-renewal-verification"), /₦12,500/);
  assert.match(combined("smedan-msme-registration"), /not replace CAC/i);
  assert.match(combined("bpp-contractor-registration"), /Interim Registration Report/);
  assert.match(combined("scuml-certificate-registration"), /free/i);
  assert.match(combined("scuml-certificate-verification"), /scumlportal\.efcc\.gov\.ng/);
});

test("20 service routes distinguish free checks, manual approval and physical alternatives", () => {
  const source = readFileSync("lib/journey.ts", "utf8");
  const from = source.indexOf("const verifiedBusinessJourneys:");
  const to = source.indexOf("const verifiedPublicRecordJourneys:");
  assert.ok(from >= 0 && to > from);
  const journeys = source.slice(from, to);
  for (const slug of slugs) {
    assert.ok(journeys.includes(JSON.stringify(slug) + ": {"), slug);
  }
  assert.match(source, /if \(verifiedBusinessJourneys\[service.slug\]\)/);
  for (const slug of ["cac-company-registration", "cac-change-director", "nepc-exporter-registration", "scuml-certificate-verification"]) {
    const pos = journeys.indexOf(JSON.stringify(slug) + ": {");
    const section = journeys.slice(pos, journeys.indexOf("\n  },", pos));
    assert.match(section, /onlineAvailable: true/, slug);
  }
  for (const slug of ["nipo-trademark-registration", "nipo-patent-registration", "nipo-industrial-design-registration"]) {
    const pos = journeys.indexOf(JSON.stringify(slug) + ": {");
    const section = journeys.slice(pos, journeys.indexOf("\n  },", pos));
    assert.match(section, /mode: "agency-guided"/, slug);
  }
});

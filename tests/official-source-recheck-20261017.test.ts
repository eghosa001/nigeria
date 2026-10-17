import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const rows = JSON.parse(readFileSync("data/services.json", "utf8")) as Array<{
  slug: string;
  lastVerified: string;
  feeLabel: string;
  timeline?: string;
  requirements: string[];
  steps: string[];
  notes: string[];
  sources: Array<{url: string; lastChecked: string}>;
}>;
const reviewed = [
  "jamb-change-course-institution",
  "jamb-change-name",
  "jamb-correct-date-of-birth",
  "jamb-correct-gender",
  "jamb-correct-state-lga",
  "uk-standard-visitor-visa",
  "canada-visitor-visa",
  "nigeria-tourism-visa",
  "nigeria-business-visa",
  "nigeria-visiting-visa",
  "nigeria-transit-visa",
];

test("original eleven official-source reviews retain audited dates", () => {
  for (const slug of reviewed) {
    const row = rows.find(item => item.slug === slug);
    assert.ok(row, slug);
    assert.equal(row.lastVerified, "2026-10-17", slug);
    assert.ok(row.sources.length > 0, slug);
    assert.ok(row.sources.every(source => source.lastChecked === "2026-10-17" && source.url.startsWith("https://")), slug);
  }
  // These records have not been revisited in any of the documented October 17 review batches.
  for (const slug of ["australia-visitor-visa-600", "uae-tourist-visa", "south-africa-holiday-visa", "ireland-short-stay-visit-visa"]) {
    const row = rows.find(item => item.slug === slug);
    assert.ok(row, slug);
    assert.ok(row.lastVerified < "2026-10-17", "No unverified source-date bump: " + slug);
  }
});

test("seven additional guides have source-backed date updates and corrected action routes", () => {
  const slugs = [
    "nelfund-student-loan-application",
    "nysc-senate-list",
    "nysc-correct-date-of-birth",
    "inec-pvc-status",
    "france-schengen-short-stay-visa",
    "italy-schengen-tourist-visa",
    "spain-schengen-tourist-visa",
  ];
  for (const slug of slugs) {
    const row = rows.find(item => item.slug === slug);
    assert.ok(row, slug);
    assert.equal(row.lastVerified, "2026-10-17", slug);
    assert.ok(row.sources.length > 0, slug);
    assert.ok(row.sources.every(source => source.lastChecked === "2026-10-17" && source.url.startsWith("https://")), slug);
  }
  const france = rows.find(item => item.slug === "france-schengen-short-stay-visa")!;
  assert.match(france.steps.join(" "), /demande-de-visa/);
  assert.ok(france.sources.some(source => source.url === "https://france-visas.gouv.fr/demande-de-visa"));
  assert.doesNotMatch(france.sources.map(source => source.url).join(" "), /\/online-application/);
  const senate = rows.find(item => item.slug === "nysc-senate-list")!;
  assert.match(senate.steps[0], /verifysenatelists/);
  const nelfund = rows.find(item => item.slug === "nelfund-student-loan-application")!;
  assert.match(nelfund.timeline ?? "", /not a guaranteed approval/);
  const inec = rows.find(item => item.slug === "inec-pvc-status")!;
  assert.ok(inec.sources.some(source => source.url === "https://cvr.inecnigeria.org/vvs"));
});

test("JAMB corrections match the official fee menu but avoid invented universal uploads", () => {
  for (const slug of reviewed.filter(s => s.startsWith("jamb-"))) {
    const row = rows.find(item => item.slug === slug)!;
    assert.match(row.feeLabel, /₦2,500/, slug);
    assert.ok(row.sources.some(source => source.url === "https://portal.jamb.gov.ng/correction.htm"), slug);
  }
  const course = rows.find(item => item.slug === "jamb-change-course-institution")!;
  assert.match(course.timeline ?? "", /time-limited/);
  assert.doesNotMatch(course.timeline ?? "", /final institution admission cut-off date/i);
  assert.ok(course.sources.every(source => !source.url.includes("support.jamb.gov.ng")));
  const name = rows.find(item => item.slug === "jamb-change-name")!;
  assert.match(name.requirements.join(" "), /if required/i);
  assert.match(name.steps.join(" "), /only where/);
});

test("NIS bank statements must use correct class-specific published periods", () => {
  for (const slug of ["nigeria-tourism-visa", "nigeria-visiting-visa"]) {
    const visa = rows.find(item => item.slug === slug)!;
    assert.match(visa.requirements.join(" "), /180-day bank statement/, slug);
  }
  const transit = rows.find(item => item.slug === "nigeria-transit-visa")!;
  assert.match(transit.requirements.join(" "), /30-day bank statement/);
  for (const slug of ["nigeria-tourism-visa", "nigeria-business-visa", "nigeria-visiting-visa", "nigeria-transit-visa"]) {
    const row = rows.find(item => item.slug === slug)!;
    assert.match(row.timeline ?? "", /48 hours/);
    assert.match(row.timeline ?? "", /no local objection/);
  }
});

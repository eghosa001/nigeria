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

test("exactly the eleven source-reviewed guides have new verification dates", () => {
  for (const slug of reviewed) {
    const row = rows.find(item => item.slug === slug);
    assert.ok(row, slug);
    assert.equal(row.lastVerified, "2026-10-17", slug);
    assert.ok(row.sources.length > 0, slug);
    assert.ok(row.sources.every(source => source.lastChecked === "2026-10-17" && source.url.startsWith("https://")), slug);
  }
  for (const slug of ["nelfund-student-loan-application", "inec-pvc-status", "nysc-senate-list", "france-schengen-short-stay-visa"]) {
    const row = rows.find(item => item.slug === slug);
    assert.ok(row, slug);
    assert.ok(row.lastVerified < "2026-10-17", "No unverified source-date bump: " + slug);
  }
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

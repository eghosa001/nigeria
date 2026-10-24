import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const records = JSON.parse(readFileSync("data/services.json", "utf8"));

test("NHIA public GIFSHIP guidance separates federally funded NYSC coverage", () => {
  const item = records.find((r: {slug: string}) => r.slug === "nhia-gifship-enrolment");
  assert.ok(item);
  assert.equal(item.status, "conflict", "retain unresolved individual and family NHIA prices");
  assert.equal(item.lastVerified, "2026-10-24");
  assert.ok(item.steps.some((s: string) => s.includes("GIFSHIP-n")));
  assert.ok(item.notes.some((s: string) => s.includes("funded by the Federal Government")));
  assert.ok(item.sources.some((s: {url: string}) => s.url === "https://www.nysc.gov.ng/nhia.html"));
  assert.match(item.feeNote, /inconsistent/);
  assert.match(item.officialPortal, /www\.nhia\.gov\.ng\/service\/land-insurance/);
});

import assert from "node:assert/strict";
import test from "node:test";
import { octoberVerifiedProgrammes } from "../lib/job-social-trends-2026-10-10";

const ebid = octoberVerifiedProgrammes.find(item => item.slug === "ebid-young-professionals-2026");

test("EBID age-30 contradiction is explicit instead of silently excluding applicants", () => {
  assert.ok(ebid);
  assert.match(ebid.summary, /exactly 30 qualifies/);
  assert.ok(ebid.qualifications.some(item =>
    item.includes("not more than thirty (30)") && item.includes("less than 30") &&
    item.includes("seek clarification")));
  assert.equal(ebid.deadline, "2026-10-30");
});

test("EBID dossier has the five exact issuer-required document types", () => {
  assert.ok(ebid);
  assert.equal(ebid.documents.length, 5);
  assert.ok(ebid.documents.some(item => /detailed CV/i.test(item)));
  assert.ok(ebid.documents.some(item => /qualifications obtained/i.test(item)));
  assert.ok(ebid.documents.some(item => /identity card or passport/i.test(item)));
  assert.ok(ebid.documents.some(item => /birth certificate/i.test(item)));
  assert.ok(ebid.documents.some(item => /motivation letter/i.test(item)));
  assert.ok(!ebid.documents.some(item => /language certificate/i.test(item)));
});

test("EBID paper/email source discrepancy and rechecked issuer dates are preserved", () => {
  assert.ok(ebid);
  assert.ok(ebid.applicationSteps.some(item => item.includes("'paper form'") && item.includes("by email")));
  assert.ok(ebid.applicationSteps.some(item => item.includes("recrutbidc@bidc-ebid.org")));
  assert.equal(ebid.verifiedAt, "2026-10-26");
  assert.ok(ebid.sources.some(source => source.url.endsWith("/employment/") && source.lastChecked === "2026-10-26"));
  assert.ok(ebid.sources.some(source => source.url.endsWith("Advertise_Young_Professional_03September_en.pdf") && source.lastChecked === "2026-10-26"));
  assert.ok(ebid.sources.some(source => source.url.includes("linkedin.com") && source.lastChecked === "2026-10-10"),
    "do not refresh a source date without checking that source");
});

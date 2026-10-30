import assert from "node:assert/strict";
import test from "node:test";
import { getJobOpportunity, isIndexableJobOpportunity } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";

test("EHA Yaba nurse historical vacancy is not advertised as open after issuer 404 on 30 October", () => {
  const nurse = getJobOpportunity("eha-registered-nurse-yaba-lagos-2026");
  assert.ok(nurse, "preserve the existing canonical archive");
  assert.equal(nurse.status, "unverified");
  assert.equal(getEffectiveJobStatus(nurse, "2026-10-30"), "unverified");
  assert.equal(nurse.verifiedAt, "2026-10-30");
  assert.equal(nurse.officialUrl, "https://erp.eha.ng/jobs");
  assert.match(nurse.officialUrlLabel, /Check current/);
  assert.equal(nurse.posting, undefined, "no JobPosting metadata for an unavailable vacancy");
  assert.equal(isIndexableJobOpportunity(nurse), false);
  assert.ok(nurse.sources.some(s => s.url === "https://erp.eha.ng/jobs" && s.lastChecked === "2026-10-30"));
  assert.ok(nurse.sources.every(s => !s.url.includes("registered-nurse-yaba-lagos-1011")));
  assert.doesNotMatch(JSON.stringify(nurse), /https:\/\/erp\.eha\.ng\/jobs\/registered-nurse-yaba-lagos-1011/);
  assert.match(nurse.summary, /HTTP 404/);
  assert.match(nurse.summary, /does not list this exact vacancy/);
  assert.match(nurse.sourceNotes.join(" "), /27 September 2026/);
  assert.ok(nurse.applicationSteps.every(step => !/Apply Now|original.*accessible/i.test(step)));
  assert.equal(nurse.applicationSteps.length, 2);
  assert.equal((nurse.summary + nurse.sourceNotes.join(" ") + nurse.applicationSteps.join(" ")).match(/HTTP 404/g)?.length, 1);
});

import assert from "node:assert/strict";
import test from "node:test";
import { getJobOpportunity } from "../lib/jobs";
import {
  dangoteUndatedDeadlineEvidence20261017 as evidence,
  dangoteDeadlineReviewNote20261017 as note,
  hasDocumentedDangoteDeadlineOmission as checked,
} from "../lib/job-dangote-no-deadline-evidence-2026-10-17";

test("three exact Dangote issuer notices document absent deadline without claiming rolling hiring", () => {
  assert.equal(Object.keys(evidence).length, 3);
  for (const [slug, source] of Object.entries(evidence)) {
    const job = getJobOpportunity(slug);
    assert.ok(job, slug);
    assert.equal(job.officialUrl, source.sourceUrl);
    assert.equal(job.posting?.jobTitle, source.title);
    assert.equal(job.posting?.datePosted, source.datePosted);
    assert.equal(job.deadline, undefined);
    assert.ok(job.sourceNotes.includes(note));
    assert.ok(checked(job, "2026-10-17"), slug);
    assert.ok(!/rolling intake (?:is|was) confirmed/i.test(job.nextMilestone ?? ""));
  }
});

test("dated absence cannot excuse any missing, tampered or stale vacancy evidence", () => {
  const job = getJobOpportunity("dangote-lagos-audit-analyst-2026");
  assert.ok(job && checked(job, "2026-10-17"));
  assert.equal(checked({...job,officialUrl:"https://example.com"}, "2026-10-17"), false);
  assert.equal(checked({...job,posting:undefined}, "2026-10-17"), false);
  assert.equal(checked({...job,deadline:"2026-10-30"}, "2026-10-17"), false);
  assert.equal(checked({...job,sourceNotes:[]}, "2026-10-17"), false);
  assert.equal(checked({...job,sources:[]}, "2026-10-17"), false);
  assert.equal(checked({...job,status:"unverified"}, "2026-10-17"), false);
  assert.equal(checked(job,"2026-11-03"),false);
  const unrelated = getJobOpportunity("moniepoint-financial-planning-analyst");
  assert.ok(unrelated && !checked(unrelated,"2026-10-17"));
});

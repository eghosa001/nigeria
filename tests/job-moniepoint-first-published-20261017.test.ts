import assert from "node:assert/strict";
import test from "node:test";
import { getJobOpportunity } from "../lib/jobs";
import {
  moniepointFirstPublishedEvidence20261017 as evidence,
  moniepointPublicAtsCaution20261017 as caution,
  hasSourceMatchedMoniepointNoDeadlineReview as reviewed,
} from "../lib/job-moniepoint-first-published-evidence-2026-10-17";

test("five actual Moniepoint first-published dates and absent closing dates remain attributed", () => {
  assert.equal(Object.keys(evidence).length, 5);
  for (const [slug, proof] of Object.entries(evidence)) {
    const job = getJobOpportunity(slug);
    assert.ok(job && reviewed(job,"2026-10-17"), slug);
    assert.equal(job.posting?.jobTitle,proof.title);
    assert.equal(job.posting?.datePosted,proof.firstPublished);
    assert.equal(job.deadline,undefined);
    assert.equal(job.jobPostingAuthorization,undefined);
    assert.ok(job.sourceNotes.includes(caution));
    assert.ok(job.sources.some(src=>src.url.endsWith("/"+proof.id)&&src.url.includes("boards-api.greenhouse.io")));
  }
  assert.equal(evidence["moniepoint-business-relationship-manager-anambra"].firstPublished,"2022-12-16");
  assert.equal(evidence["moniepoint-financial-planning-analyst"].firstPublished,"2024-06-21");
});

test("tampering, stale checks and unrelated vacancy cannot pass", () => {
  const job=getJobOpportunity("moniepoint-financial-planning-analyst");
  assert.ok(job&&reviewed(job,"2026-10-17"));
  assert.equal(reviewed({...job,posting:undefined},"2026-10-17"),false);
  assert.equal(reviewed({...job,deadline:"2026-10-30"},"2026-10-17"),false);
  assert.equal(reviewed({...job,sourceNotes:[] },"2026-10-17"),false);
  assert.equal(reviewed({...job,sources:[] },"2026-10-17"),false);
  assert.equal(reviewed({...job,officialUrl:"https://example.com"},"2026-10-17"),false);
  assert.equal(reviewed({...job,status:"closed"},"2026-10-17"),false);
  assert.equal(reviewed(job,"2026-11-01"),false);
  const unrelated=getJobOpportunity("moniepoint-customer-experience-researcher");
  assert.ok(unrelated && !reviewed(unrelated,"2026-10-17"));
});

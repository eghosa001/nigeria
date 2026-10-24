import assert from "node:assert/strict";
import test from "node:test";
import { getJobOpportunity } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";

test("newer source-matched job evidence takes priority in the FINAL catalogue", () => {
  for (const [slug, url] of [
    ["eha-registered-nurse-yaba-lagos-2026", "https://erp.eha.ng/jobs/registered-nurse-yaba-lagos-1011"],
    ["eha-pharmacist-abuja-2026", "https://erp.eha.ng/jobs/pharmacist-546"],
    ["coronation-graduate-trainee-2026", "https://www.coronation.ng/coronation-academies/"],
  ]) {
    const job = getJobOpportunity(slug);
    assert.ok(job, slug);
    assert.equal(job.verifiedAt, "2026-10-24", slug);
    assert.ok(job.sources.some(source =>
      source.url === url && source.lastChecked === "2026-10-24"), slug);
    assert.equal(getEffectiveJobStatus(job, "2026-10-24"), "open", slug);
    assert.equal(job.deadline, undefined, "no invented end date: " + slug);
    assert.doesNotMatch(job.nextMilestone ?? "", /17 October review|20 October source check|as of the 17 October review/i);
  }
});

test("17 October historical exact-role details remain useful but cannot roll back the nurse or pharmacist", () => {
  const nurse = getJobOpportunity("eha-registered-nurse-yaba-lagos-2026");
  const pharmacist = getJobOpportunity("eha-pharmacist-abuja-2026");
  assert.ok(nurse); assert.ok(pharmacist);
  assert.match(nurse.summary, /20 October 2026/);
  assert.match(nurse.statusLabel, /24 October/);
  assert.equal(nurse.posting?.datePosted, "2026-09-27");
  assert.match(nurse.sourceNotes.join(" "), /clinical practice in at least two of the last three years/i);
  assert.match(pharmacist.summary, /181,440/);
  assert.match(pharmacist.statusLabel, /24 October/);
  assert.equal(pharmacist.posting?.datePosted, "2026-09-29");
  assert.match(pharmacist.sourceNotes.join(" "), /181,440/);
  assert.equal(getEffectiveJobStatus(nurse, "2026-11-10"), "unverified");
});

test("older 20 October issuer observations cannot reduce a later confirmed closed-university intake", () => {
  for (const slug of ["uniben-teaching-non-teaching-recruitment-2026", "unilag-professorial-chair-2026"]) {
    const job = getJobOpportunity(slug);
    assert.ok(job);
    assert.equal(job.verifiedAt, "2026-10-24");
    assert.equal(job.status, "closed");
    assert.equal(getEffectiveJobStatus(job, "2026-10-24"), "closed");
    assert.ok(job.sources.some(s => s.url === job.officialUrl && s.lastChecked === "2026-10-24"));
  }
});

test("Coronation source recheck remains nine-track academy, no fabricated deadline", () => {
  const job = getJobOpportunity("coronation-graduate-trainee-2026");
  assert.ok(job);
  assert.equal(job.kind, "programme");
  assert.match(job.nextMilestone ?? "", /On 24 October/);
  assert.match(job.nextMilestone ?? "", /No closing date was verified/);
  assert.match(job.statusLabel ?? "", /24 October/);
});

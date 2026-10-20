import assert from "node:assert/strict";
import test from "node:test";
import { getJobOpportunity } from "../lib/jobs";

test("May & Baker's verified October postings are not hidden by the expired September deadline", () => {
  const job = getJobOpportunity("may-baker-consumer-healthcare-executive-2026");
  assert.ok(job);
  assert.equal(job.status, "open");
  assert.equal(job.verifiedAt, "2026-10-20");
  assert.equal(job.deadline, undefined, "a conflicting employer deadline must not be invented");
  assert.match(job.summary, /15[–-]16 October 2026/);
  assert.match(job.summary, /one-week instruction.*Apply by dates/i);
  assert.ok(!job.requirements.some(item => item.includes("7 October 2026")));
  assert.ok(job.applicationSteps.some(item => /official careers form|May & Baker’s own form/i.test(item)));
  assert.ok(job.sources.some(source => source.url === "https://may-bakerng.com/career" && source.lastChecked === "2026-10-20"));
  assert.ok(job.sourceNotes.some(note => /conflicts with later displayed Apply by dates/i.test(note)));
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const jobs = readFileSync(new URL("../lib/jobs.ts", import.meta.url), "utf8");
const slug = 'slug: "eha-people-operations-coordinator-2026"';

test("EHA coordinator page never sends applicants to the removed posting", () => {
  const start = jobs.indexOf(slug);
  assert.notEqual(start, -1);
  const end = jobs.indexOf("\n  },", start);
  assert.notEqual(end, -1);
  const job = jobs.slice(start, end);
  assert.match(job, /status: "closed"/);
  assert.match(job, /officialUrl: "https:\/\/erp\.eha\.ng\/jobs"/);
  assert.match(job, /no longer listed|no longer displayed/i);
  assert.doesNotMatch(job, /people-operations-coordinator-1020/);
  assert.equal(jobs.includes("https://erp.eha.ng/jobs/people-operations-coordinator-1020"), false);
});

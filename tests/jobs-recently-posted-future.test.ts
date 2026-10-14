import assert from "node:assert/strict";
import test from "node:test";
import { getRecentlyPostedJobs } from "../lib/job-runtime";
import type { CareerOpportunity } from "../lib/jobs";

test("recent jobs include real recent postings, not future or invalid dates", () => {
  const job = (slug: string, datePosted: string) => ({
    slug, status: "open", posting: { datePosted },
  } as CareerOpportunity);
  const jobs = [
    job("today", "2026-10-14"),
    job("yesterday", "2026-10-13"),
    job("future", "2026-10-15"),
    job("invalid", "2026-02-30"),
    job("old", "2026-09-01"),
  ];
  assert.deepEqual(
    getRecentlyPostedJobs(jobs, 7, "2026-10-14").map((j) => j.slug),
    ["today", "yesterday"],
  );
});

import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getJobOpportunity } from "../lib/jobs";
import {
  hasSourceMatchedEmployerBoardReview20261020 as reviewed,
  verifiedEmployerBoards20261020,
} from "../lib/job-employer-board-rechecks-2026-10-20";

test("five exact employer directory issuer reviews are accepted only while fresh", () => {
  assert.equal(verifiedEmployerBoards20261020.length, 5);
  for (const slug of verifiedEmployerBoards20261020) {
    const job = getJobOpportunity(slug);
    assert.ok(job, slug);
    assert.equal(reviewed(job, "2026-10-20"), true, slug);
    assert.equal(reviewed(job, "2026-11-03"), true, slug + " last acceptable day");
    assert.equal(reviewed(job, "2026-11-04"), false, slug + " must be reverified");
  }
});

test("missing source, wrong title, outdated check or unrelated employer cannot clear review", () => {
  const job = getJobOpportunity("aiico-insurance-careers");
  assert.ok(job);
  assert.equal(reviewed({ ...job, sources: [] }, "2026-10-20"), false);
  assert.equal(reviewed({ ...job, summary: "generic template" }, "2026-10-20"), false);
  assert.equal(reviewed({ ...job, officialUrl: "https://example.com/careers" }, "2026-10-20"), false);
  assert.equal(reviewed({ ...job, verifiedAt: "2026-10-19" }, "2026-10-20"), false);
  assert.equal(reviewed({ ...job, sourceNotes: [] }, "2026-10-20"), false);
  assert.equal(reviewed(job, "2026-10-19"), false);
  const unrelated = getJobOpportunity("may-baker-consumer-healthcare-executive-2026");
  assert.ok(unrelated);
  assert.equal(reviewed(unrelated, "2026-10-20"), false);
});

test("publication audit checks the exact independent issuer-review predicate", () => {
  const source = readFileSync(new URL("../scripts/audit-publication-standards.ts", import.meta.url), "utf8");
  assert.match(source, /hasSourceMatchedEmployerBoardReview20261020\(job, now\)/);
});

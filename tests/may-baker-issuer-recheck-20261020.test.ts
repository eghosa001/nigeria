import assert from "node:assert/strict";
import test from "node:test";
import { getJobOpportunity } from "../lib/jobs";
import { getEffectiveJobStatus, buildJobPostingJsonLd } from "../lib/job-runtime";
import {
  hasSourceMatchedMayBakerMultiRoleReview20261020 as completedReview,
  mayBakerSourceCheck20261020,
} from "../lib/job-may-baker-october-2026";

test("May & Baker exposes six different current requisitions, not one invented JobPosting", () => {
  const item = getJobOpportunity("may-baker-consumer-healthcare-executive-2026");
  assert.ok(item);
  assert.equal(item.kind, "career-page");
  assert.equal(item.status, "career-page");
  assert.equal(getEffectiveJobStatus(item, "2026-10-20"), "career-page");
  assert.equal(item.deadline, undefined);
  assert.equal(item.posting, undefined);
  assert.equal(buildJobPostingJsonLd(item, "https://mynigeriaguide.com/jobs/" + item.slug, "2026-10-20"), null);
  assert.equal(item.verifiedAt, "2026-10-20");
  assert.equal(mayBakerSourceCheck20261020.locations.length, 6);
  assert.match(item.summary, /15[–-]16 October 2026/);
  assert.match(item.summary, /six territory-specific/i);
  assert.match(item.nextMilestone ?? "", /27 or 28 November 2026/);
  assert.match(item.nextMilestone ?? "", /within one week/);
  assert.ok(item.requirements.every(text => !/submit by 7 October 2026/i.test(text)));
  assert.ok(item.applicationSteps.some(text => /role is preselected/i.test(text)));
  assert.ok(item.applicationSteps.some(text => /5 MB.*10 MB/.test(text)));
  assert.ok(item.sources.some(source =>
    source.url === "https://may-bakerng.com/career" && source.lastChecked === "2026-10-20"));
});

test("May & Baker employer-specific review expires and fails closed on tampered evidence", () => {
  const item = getJobOpportunity("may-baker-consumer-healthcare-executive-2026");
  assert.ok(item);
  assert.equal(completedReview(item, "2026-10-20"), true);
  assert.equal(completedReview(item, "2026-11-03"), true);
  assert.equal(completedReview(item, "2026-11-04"), false);
  assert.equal(completedReview({ ...item, sourceNotes: [] }, "2026-10-20"), false);
  assert.equal(completedReview({ ...item, summary: "Newly hiring!" }, "2026-10-20"), false);
  assert.equal(completedReview({ ...item, deadline: "2026-11-28" }, "2026-10-20"), false);
  assert.equal(completedReview({ ...item, sources: [] }, "2026-10-20"), false);
});

import assert from "node:assert/strict";
import test from "node:test";
import { getJobOpportunity } from "../lib/jobs";

test("October May & Baker employer postings supersede the expired September deadline without making up another", () => {
  const item = getJobOpportunity("may-baker-consumer-healthcare-executive-2026");
  assert.ok(item);
  assert.equal(item.status, "open");
  assert.equal(item.deadline, undefined);
  assert.equal(item.verifiedAt, "2026-10-20");
  assert.match(item.summary, /15[–-]16 October 2026/);
  assert.match(item.summary, /inconsistent deadline instructions/i);
  assert.ok(item.requirements.every(text => !/submit by 7 October 2026/i.test(text)));
  assert.ok(item.applicationSteps.some(text => /May & Baker Apply Now control/i.test(text)));
  assert.ok(item.sourceNotes.some(text => /conflicting one-week instructions/i.test(text)));
  assert.ok(item.sources.some(source => source.url === "https://may-bakerng.com/career" && source.lastChecked === "2026-10-20"));
});

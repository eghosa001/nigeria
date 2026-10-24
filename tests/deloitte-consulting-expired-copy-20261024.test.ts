import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("expired Deloitte 2026 Consulting guide no longer invites fresh applications", () => {
  const source = readFileSync("lib/job-growth-wave-9.ts", "utf8");
  const start = source.indexOf('slug: "deloitte-consulting-graduate-recruitment-2026"');
  const end = source.indexOf("\n  },", start);
  assert.ok(start >= 0 && end > start);
  const record = source.slice(start, end);
  assert.match(record, /status: "closed"/);
  assert.match(record, /deadline: "2026-10-09"/);
  assert.match(record, /verifiedAt: "2026-10-24"/);
  assert.match(record, /job has expired/);
  assert.doesNotMatch(record, /is open in Lagos|Apply before 9 October|Complete the official application before|Apply on Deloitte's official Consulting advert|Applications open until 9 October/);
  assert.match(record, /https:\/\/jobs\.smartrecruiters\.com\/Deloitte6\//);
});

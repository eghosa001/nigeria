import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("SMFest guide retains main dates while disclosing conflicting official FAQ", () => {
  const content = readFileSync("lib/explore.ts", "utf8");
  const start = content.indexOf('slug: "smfest-abuja-2026"');
  const end = content.indexOf('slug: "nifafest-abuja-2026"', start);
  assert.ok(start >= 0 && end > start);
  const guide = content.slice(start, end);
  assert.match(guide, /17–18 October 2026/);
  assert.match(guide, /official contact FAQ says 16–18 October/);
  assert.match(guide, /verify whether Friday has public sessions/);
  assert.match(guide, /https:\/\/smfest.org\//);
  assert.match(guide, /lastReviewed: "2026-10-14"/);
});

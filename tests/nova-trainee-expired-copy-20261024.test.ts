import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("NOVA Bank 2026 trainee archive cannot advertise a concluded intake as open", () => {
  const source = readFileSync("lib/job-social-trends-2026-10-10.ts", "utf8");
  const start = source.indexOf('slug: "nova-bank-graduate-trainee-2026"');
  const end = source.indexOf("\n  },", start);
  assert.ok(start >= 0 && end > start, "individual NOVA record exists");
  const nova = source.slice(start, end);
  assert.match(nova, /status: "closed"/);
  assert.match(nova, /deadline: "2026-10-15"/);
  assert.match(nova, /verifiedAt: "2026-10-24"/);
  assert.match(nova, /2026 application period ended 15 October/);
  assert.doesNotMatch(nova, /NOVA Bank is accepting applications|Apply during the published|Submit before 15 October|application window closes 15 October|Bank currently routes applicants/);
  assert.match(nova, /a visible form link does not extend/);
  assert.match(nova, /https:\/\/www\.novabank\.ng\/careers\/nova-bank-graduate-trainee-program-ngtp\//);
});

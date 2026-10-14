import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../lib/jobs.ts", import.meta.url), "utf8");
for (const slug of [
  "eha-senior-coordinator-talent-management-2026",
  "eha-assistant-manager-laboratory-kano-2026",
]) {
  test(`retired EHA vacancy ${slug} is not advertised as open`, () => {
    const start = source.indexOf(`slug: "${slug}"`);
    assert.ok(start > -1, "missing job record");
    const end = source.indexOf("\n  },", start);
    assert.ok(end > start, "missing record boundary");
    const record = source.slice(start, end);
    assert.match(record, /status: "closed"/);
    assert.match(record, /statusLabel: "Original application listing unavailable/);
    assert.match(record, /officialUrl: "https:\/\/erp\.eha\.ng\/jobs"/);
    assert.doesNotMatch(record, /officialUrl: "https:\/\/erp\.eha\.ng\/jobs\//);
    assert.match(record, /verifiedAt: "2026-10-15"/);
  });
}

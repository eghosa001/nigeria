import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

test("passport correction distinguishes the conditional 2026 NIS targets and full payable amount", () => {
  const records = JSON.parse(readFileSync("data/services.json", "utf8"));
  const guide = records.find((r) => r.slug === "passport-change-of-data");
  assert.ok(guide, "existing passport change-of-data canonical must remain");
  const facts = [guide.summary, guide.timeline, guide.feeNote, ...guide.notes].join(" ");
  assert.match(facts, /21 days/i);
  assert.match(facts, /42 days/i);
  assert.match(facts, /IF NLO/i);
  assert.match(facts, /₦30,000/);
  assert.match(facts, /not (?:necessarily|.*universally)|not.*guarantee/i);
  assert.ok(guide.sources.some((s) => s.url.includes("SERVICE-LEVEL-AGREEMENT-2026_.pdf")));
  assert.ok(guide.sources.every((s) => !s.url.includes("AGREEMENT-2025")));
});

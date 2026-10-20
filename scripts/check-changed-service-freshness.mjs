import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

// A PR that updates one service guide must prove the freshness of those
// changed records, not fail on unrelated Jobs, media and old channel scans.
// The scheduled global freshness monitor remains unchanged.
const base = process.env.PR_BASE_SHA;
assert.match(base ?? "", /^[a-f0-9]{40}$/, "A real pull-request base SHA is required");

const path = "data/services.json";
const oldRecords = JSON.parse(execFileSync("git", ["show", `${base}:${path}`], { encoding: "utf8" }));
const newRecords = JSON.parse(readFileSync(path, "utf8"));
const previous = new Map(oldRecords.map((item) => [item.slug, item]));
const changed = newRecords.filter((item) => JSON.stringify(previous.get(item.slug)) !== JSON.stringify(item));
assert.ok(changed.length > 0, "The Services JSON diff must contain at least one changed record");

const today = new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 10);
const dayDiff = (from, to) =>
  (Date.parse(to + "T00:00:00Z") - Date.parse(from + "T00:00:00Z")) / 86_400_000;

for (const item of changed) {
  assert.match(item.lastVerified || "", /^\d{4}-\d{2}-\d{2}$/, item.slug + " requires a valid verification date");
  const age = dayDiff(item.lastVerified, today);
  assert.ok(Number.isFinite(age) && age >= 0 && age <= 30,
    item.slug + " needs a recent real verification; do not advance dates without checking the agency");
  assert.ok(Array.isArray(item.sources) && item.sources.length,
    item.slug + " needs official source evidence");
  for (const source of item.sources) {
    assert.match(source.lastChecked || "", /^\d{4}-\d{2}-\d{2}$/,
      item.slug + " has an invalid source check date");
    assert.ok(source.lastChecked <= item.lastVerified,
      item.slug + " source check cannot postdate the service verification date");
    assert.ok(source.url?.startsWith("https://"),
      item.slug + " has an invalid official source URL");
  }
  console.log("PR service freshness OK:", item.slug, item.lastVerified);
}
console.log("Checked changed service records:", changed.length);

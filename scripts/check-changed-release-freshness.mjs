// Only validate release records changed in this PR. The daily full-site
// freshness audit remains authoritative for existing stale sources.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const path = "lib/entertainment-extras.ts";
const baseSha = process.env.PR_BASE_SHA;
if (!baseSha) throw new Error("PR_BASE_SHA must be supplied by a pull-request workflow.");
const previous = execFileSync("git", ["show", `${baseSha}:${path}`], { encoding: "utf8" });
const current = readFileSync(path, "utf8");
const extract = (source) => {
  const section = source.split("export const releaseItems: ReleaseItem[] = [")[1];
  if (!section) throw new Error("Release listing not found");
  const records = new Map();
  for (const match of section.matchAll(/\{\s*id: "([^"]+)",([\s\S]*?)(?=\n  \},|\n\];)/g)) {
    records.set(match[1], match[2]);
  }
  return records;
};
const oldReleases = extract(previous);
const newReleases = extract(current);
let verified = 0;
const today = new Date().toISOString().slice(0, 10);
for (const [id, source] of newReleases) {
  if (source === oldReleases.get(id)) continue;
  const url = source.match(/officialUrl: "([^"]+)"/)?.[1];
  const checked = source.match(/lastChecked: "(\d{4}-\d{2}-\d{2})"/)?.[1];
  if (!url || !/^https:\/\//.test(url)) throw new Error(`${id}: needs an official HTTPS source`);
  if (!checked || checked > today) throw new Error(`${id}: invalid or future verification date`);
  const age = Math.floor((Date.parse(today + "T00:00:00Z") - Date.parse(checked + "T00:00:00Z")) / 86400000);
  if (!Number.isFinite(age) || age > 10) throw new Error(`${id}: changed record still stale (${checked})`);
  console.log(`Changed release source checked: ${id} — ${checked} — ${url}`);
  verified++;
}
if (!verified) throw new Error("Release-source file changed without updating a release record; inspect other content and choose the appropriate full audit.");
console.log(`Validated ${verified} changed release records; daily full freshness audit is unaffected.`);

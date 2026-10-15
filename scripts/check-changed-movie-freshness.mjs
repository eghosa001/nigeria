// PR-only change-scoped movie source freshness. The scheduled full-site audit is unchanged.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const base = process.env.PR_BASE_SHA;
if (!/^[a-f0-9]{40}$/.test(base ?? "")) throw new Error("Expected verified PR base SHA.");
const diff = execFileSync("git", ["diff", "--unified=0", base, "HEAD", "--", "lib/entertainment.ts"], { encoding: "utf8" });
const source = readFileSync("lib/entertainment.ts", "utf8");
const marker = source.indexOf("const uncorrectedEntertainmentTitles:");
if (marker < 0) throw new Error("Missing entertainment catalog.");
const lineStart = (index) => source.slice(0, index).split("\n").length;
const starts = [...source.matchAll(/\n  \{\n\s*slug: "([^"]+)"/g)]
  .filter((match) => match.index > marker)
  .map((match) => ({ slug: match[1], offset: match.index, line: lineStart(match.index) }));
const touched = new Set();
for (const hunk of diff.matchAll(/@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/g)) {
  const first = Number(hunk[1]);
  const last = first + Math.max(Number(hunk[2] ?? "1") - 1, 0);
  const record = starts.filter((entry) => entry.line <= first).at(-1);
  if (!record) throw new Error("Movie source changes outside an identified title need a full freshness review.");
  const next = starts[starts.findIndex((entry) => entry.slug === record.slug) + 1];
  if (next && last >= next.line) throw new Error("A diff spans multiple titles; review freshness explicitly.");
  touched.add(record.slug);
}
if (!diff.trim() || !touched.size) throw new Error("Expected a changed movie record for scoped verification.");
const today = new Date(Date.now() + 3600_000).toISOString().slice(0, 10);
const day = (value) => Date.parse(value + "T00:00:00Z");
let checked = 0;
for (const slug of touched) {
  const position = starts.findIndex((entry) => entry.slug === slug);
  const section = source.slice(starts[position].offset, starts[position + 1]?.offset ?? source.length);
  const dates = [...section.matchAll(/lastChecked: "(\d{4}-\d{2}-\d{2})"/g)].map((match) => match[1]);
  if (!dates.length) throw new Error(slug + " has no dated movie source checks.");
  for (const date of dates) {
    const age = Math.round((day(today) - day(date)) / 86400_000);
    if (!Number.isFinite(age) || age < 0 || age > 21) {
      throw new Error(slug + " has a stale or invalid movie reference check: " + date);
    }
    checked++;
  }
  console.log("Movie source freshness PASS:", slug, dates.length, "dated sources");
}
console.log("Changed movie sources verified:", touched.size, "movies,", checked, "dated sources.");

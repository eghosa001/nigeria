// PR-only change-scoped movie source freshness. The scheduled full-site audit is unchanged.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const base = process.env.PR_BASE_SHA;
if (!/^[a-f0-9]{40}$/.test(base ?? "")) throw new Error("Expected verified PR base SHA.");
const diff = execFileSync("git", ["diff", "--unified=0", base, "HEAD", "--", "lib/entertainment.ts"], { encoding: "utf8" });
const source = readFileSync("lib/entertainment.ts", "utf8");
const marker = source.indexOf("const uncorrectedEntertainmentTitles:");
if (marker < 0) throw new Error("Missing entertainment catalog.");
// A sourced correction layer may touch only the import and the existing
// entertainmentTitles mapping. Its new evidence still requires dated links;
// changing any other catalogue logic is rejected rather than waived.
const layer = "lib/movie-editorial-source-repairs-2026-10-16.ts";
const changed = execFileSync("git", ["diff", "--name-only", base, "HEAD", "--", layer], { encoding: "utf8" });
if (changed.split("\n").includes(layer)) {
  const baseline = execFileSync("git", ["show", base + ":lib/entertainment.ts"], { encoding: "utf8" });
  const layerImport = 'import { reviewedMovieRecords20261016 } from "@/lib/movie-editorial-source-repairs-2026-10-16";\n';
  if (!source.includes(layerImport)) throw new Error("Film correction layer not wired to catalog.");
  const mapStart = "export const entertainmentTitles: EntertainmentTitle[] = uncorrectedEntertainmentTitles.map((title) => {";
  const mapEnd = "\n\nexport const entertainmentPlatforms";
  const at = source.indexOf(mapStart), until = source.indexOf(mapEnd, at);
  const prev = baseline.indexOf(mapStart), oldUntil = baseline.indexOf(mapEnd, prev);
  if (at < 0 || until < 0 || prev < 0 || oldUntil < 0) throw new Error("Movie catalog mapper missing.");
  const mapper = source.slice(at, until);
  const expectedMapper = `export const entertainmentTitles: EntertainmentTitle[] = uncorrectedEntertainmentTitles.map((title) => {
  const credit = verifiedFilmDirectorCredits20261015[title.slug];
  const credited = credit && !title.directors?.length
    ? { ...title, directors: credit.directors,
        references: [...(title.references ?? []).filter((ref) => ref.href !== credit.source.href), credit.source] }
    : title;
  const repair = reviewedMovieRecords20261016[title.slug];
  if (!repair) return credited;
  const prior = (credited.references ?? []).filter(
    (ref) => !repair.references.some((source) => source.href === ref.href),
  );
  return { ...credited, ...repair, references: [...prior, ...repair.references] };
});`;
  if (mapper !== expectedMapper) throw new Error("Unexpected movie-mapper changes require direct review.");
  const reverted = source.replace(layerImport, "").replace(mapper, baseline.slice(prev, oldUntil));
  if (reverted !== baseline) throw new Error("Movie source changes outside the reviewed overlay must be checked separately.");

  const corrections = readFileSync(layer, "utf8");
  const from = corrections.indexOf("export const reviewedMovieRecords20261016:");
  const to = corrections.indexOf("const existing =", from);
  if (from < 0 || to < from) throw new Error("Film correction evidence registry not found.");
  const data = corrections.slice(from, to);
  const entries = [...data.matchAll(/^  "([^"]+)": \{/gm)];
  if (!entries.length) throw new Error("No verified film record amendments.");
  const today = new Date(Date.now() + 3600_000).toISOString().slice(0, 10);
  const age = (iso) => (Date.parse(today + "T00:00:00Z") - Date.parse(iso + "T00:00:00Z")) / 86400000;
  const existingSlugs = new Set([...source.matchAll(/\n    slug: "([^"]+)"/g)].map((match) => match[1]));
  let citations = 0;
  for (let i = 0; i < entries.length; i++) {
    const slug = entries[i][1];
    if (!existingSlugs.has(slug)) throw new Error("Reviewed correction points to missing movie: " + slug);
    const piece = data.slice(entries[i].index, entries[i + 1]?.index ?? data.length);
    const dates = [...piece.matchAll(/lastChecked: "(\d{4}-\d{2}-\d{2})"/g)].map((match) => match[1]);
    const urls = [...piece.matchAll(/href: "(https:\/\/[^"]+)"/g)].map((match) => match[1]);
    if (!dates.length || dates.length !== urls.length) throw new Error("Every " + slug + " reference needs an HTTPS URL and a check date.");
    for (const d of dates) if (!Number.isFinite(age(d)) || age(d) < 0 || age(d) > 21) throw new Error("Stale source check for " + slug + ": " + d);
    citations += dates.length;
  }
  console.log("Verified correction-layer freshness:", entries.length, "canonical movies,", citations, "recent source references.");
  process.exit(0);
}

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

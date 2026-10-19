/**
 * Read-only Search Console triage across all four editorial pillars.
 * Usage: node scripts/gsc-sitewide-review.mjs [path/to/snapshot.json] [--json]
 * A snapshot may contain all GSC page/query rows and overlapping-query rows.
 * A zero-click URL is not automatically thin, duplicated, or safe to remove.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const pillarForUrl = (raw) => {
  let path;
  try { path = new URL(raw).pathname; } catch { path = raw; }
  if (path === "/services" || path.startsWith("/services/")) return "Services";
  if (path === "/entertainment" || path.startsWith("/entertainment/")) return "Movies & Entertainment";
  if (path === "/jobs" || path.startsWith("/jobs/")) return "Jobs & Careers";
  if (path === "/explore" || path.startsWith("/explore/")) return "Tour Nigeria";
  return "Supporting pages";
};

const round = (x) => Math.round(x * 100) / 100;
export function generateSitewideReview(snapshot) {
  if (!Array.isArray(snapshot.pages) || !Array.isArray(snapshot.queries) || !Array.isArray(snapshot.overlaps))
    throw new TypeError("Expected page, query and overlapping-query exports");
  const [startDate, endDate] = [snapshot.period?.startDate, snapshot.period?.endDate];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate ?? "") || !/^\d{4}-\d{2}-\d{2}$/.test(endDate ?? ""))
    throw new TypeError("Snapshot must identify the exact settled date window");
  const seen = new Set();
  const pageRows = snapshot.pages.map(([url, impressions, clicks, ctrPercent, avgPosition]) => {
    if (seen.has(url)) throw new TypeError("Duplicate page URL in GSC export: " + url);
    seen.add(url);
    const pillar = pillarForUrl(url);
    const eligible = impressions >= 50 && avgPosition >= 3 && avgPosition <= 20 && ctrPercent < 2;
    // A priority index, not predicted clicks or a Google CTR benchmark.
    const score = eligible ? round(impressions * (2 - ctrPercent) / 100) : 0;
    return { url, pillar, impressions, clicks, ctrPercent, avgPosition, eligible, score };
  });
  const pillars = ["Services", "Movies & Entertainment", "Tour Nigeria", "Jobs & Careers", "Supporting pages"];
  const byPillar = Object.fromEntries(pillars.map(pillar => {
    const rows = pageRows.filter(row => row.pillar === pillar);
    const candidates = rows.filter(row => row.eligible).sort((a,b) => b.score - a.score || b.impressions - a.impressions);
    return [pillar, {
      measuredPages: rows.length,
      reviewCandidates: candidates.length,
      priorityQueue: candidates.slice(0, 35),
      // A page with no impressions during this period cannot be ruled out.
      nonCandidates: rows.length - candidates.length,
    }];
  }));
  const queries = snapshot.queries.map(([query, impressions, clicks, ctrPercent, avgPosition]) =>
    ({ query, impressions, clicks, ctrPercent, avgPosition, score:
      impressions >= 50 && avgPosition >= 3 && avgPosition <= 20 && ctrPercent < 2
        ? round(impressions * (2 - ctrPercent) / 100) : 0 }));
  const queryCandidates = queries.filter(row => row.score > 0)
    .sort((a,b) => b.score - a.score || b.impressions - a.impressions);
  const overlaps = snapshot.overlaps.map(({query,impressions,clicks,entropy,pages}) => ({
    query, impressions, clicks, entropy, pages,
    reviewReason: "Several URLs appear for one query. Compare visitor intent and value before changing any canonical or redirect.",
  })).sort((a,b) => b.impressions - a.impressions || b.entropy - a.entropy);
  return {
    site: snapshot.site,
    period: snapshot.period,
    coverage: snapshot.coverage,
    analyzed: {pages:pageRows.length, queries:queries.length, overlappingQueries:overlaps.length},
    byPillar,
    queriesToMapToExistingCanonicals: queryCandidates.slice(0, 60),
    queryCandidatesCount: queryCandidates.length,
    overlappingQueriesToReview: overlaps,
    actions: [
      "Verify official facts and satisfy the reader's distinct task on the existing canonical URL.",
      "Check search snippets, headings and relevance for impression-rich pages. Record before/after CTR.",
      "For overlapping queries, review both pages; retain different tasks and consolidate only true duplicates with a safe redirect.",
      "Do not automatically publish, delete, noindex, redirect, fabricate sources or advance verification dates.",
      "Compare settled 28-day windows and actual mobile web vitals; treat each change as a hypothesis, not a promised traffic gain."
    ],
  };
}

export function asMarkdown(report) {
  const lines = [
    "# MyNigeriaGuide — Search Console editorial work queue",
    `Settled window: ${report.period.startDate} – ${report.period.endDate}. URLs reviewed: ${report.analyzed.pages}; known queries: ${report.analyzed.queries}.`,
    "",
    "Priority index = impressions × (2% − observed CTR) for position 3–20 only. It is not a forecast.",
    "Google anonymises a share of queries; pages outside this reporting period are not judged.",
    "",
  ];
  for (const [pillar, group] of Object.entries(report.byPillar)) {
    lines.push(`## ${pillar} (${group.measuredPages} measured; ${group.reviewCandidates} candidates)`);
    lines.push("| URL | Impressions | Clicks | CTR | Position | Index |", "| --- | ---: | ---: | ---: | ---: | ---: |");
    for (const row of group.priorityQueue) lines.push(`| ${row.url} | ${row.impressions} | ${row.clicks} | ${row.ctrPercent}% | ${row.avgPosition} | ${row.score} |`);
    lines.push("");
  }
  lines.push("## Overlapping queries for manual comparison");
  lines.push("| Query | Impressions | Pages |", "| --- | ---: | ---: |");
  for (const entry of report.overlappingQueriesToReview) lines.push(`| ${entry.query.replaceAll("|","/")} | ${entry.impressions} | ${entry.pages.length} |`);
  lines.push("");
  lines.push("No canonical, redirect or content change should be inferred without a source and distinct-intent review.");
  return lines.join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const input = process.argv.find(x => x.endsWith(".json")) ?? process.env.GSC_SNAPSHOT_FILE;
  if (!input) throw new Error("Supply a local private GSC snapshot JSON path or GSC_SNAPSHOT_FILE; do not commit query-level data.");
  const report = generateSitewideReview(JSON.parse(readFileSync(input, "utf8")));
  process.stdout.write(process.argv.includes("--json") ? JSON.stringify(report, null, 2) + "\n" : asMarkdown(report) + "\n");
}

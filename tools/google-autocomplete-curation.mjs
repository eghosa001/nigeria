import { readFile, writeFile } from "node:fs/promises";

const inputPath = process.argv[2] || "artifacts/google-autocomplete-ng.json";
const fullOutput = "artifacts/google-autocomplete-reviewed-ng.csv";
const reviewOutput = "artifacts/google-autocomplete-review-queue-ng.csv";
const summaryOutput = "artifacts/google-autocomplete-review-summary-ng.json";

// These are explicit exclusions for unrelated Autocomplete crossover, NOT
// content censorship or Google search-volume estimates. Retain every raw
// suggestion in the original JSON evidence artifact.
export const unrelated = [
  /\bcalabarzon\b/i, /\bphilippin(?:es)?\b/i, /\bmumbai\b/i,
  /\bkanpur\b/i, /\bbangalore\b/i, /\bkerala\b/i,
  /\blong island\b/i, /\blagos portugal\b/i, /\bdos lagos\b/i,
  /\bkanota\b/i, /\bnz\b/i, /\bindia\b/i, /\bbangladesh\b/i,
  /\bpvc (?:toilet|pipe|fitting|t fitting|flange|conduit|elbow)\b/i,
  /\bcast (?:jobs|giant|warrior) movie\b/i,
  /\bcast movie (?:warrior|giant)\b/i,
  /\baunt may\b/i, /\bwho is aunty\b/i,
  /\bstates in osun\b/i, /\bstates of osun\b/i,
];

export const needsReview = [
  /\b20(?:0\d|1\d|2[0-5])\b/i,
  /\bfree (?:cac registration|nysc registration|visa)\b/i,
  /\b2026 closing date\b/i, /\bjobs? in (?:usa|uk)\b/i,
  /\bdownload movie\b/i, /\bcast download\b/i,
  /\bwithout exam(?:ination)? number\b/i,
  /\bwithout scratch card\b/i,
  /\bwithout experience for teens\b/i,
  /\bcac certificate download chromebook\b/i,
  /\bhow to replace a pvc\b/i,
  /^what is the best family movie ever$/i,
  /^how many movies are based on true stories$/i,
  /^what movies are based on true stories$/i,
  /^what is a remote customer service representative$/i,
  /^job application what is a cover letter$/i,
  /^junior data analyst (?:pay|salary)$/i,
  /^how much is nigeria nysc salary$/i,
  /^nysc salary in nigeria$/i,
  /^who is [a-z]{1,8}$/i,
  /^nigerian movie names$/i,
  /^nigerian movie actors names$/i,
];

export function classifySuggestion(query) {
  if (unrelated.some((rule) => rule.test(query)))
    return { status: "exclude", reason: "Off-topic or foreign-geography autocomplete crossover" };
  if (needsReview.some((rule) => rule.test(query)) || query.length < 9 || query.split(/\s+/).length < 2)
    return { status: "review", reason: "Requires historical date, intent or source-context verification" };
  return { status: "candidate", reason: "Observed in Google Suggest; URL and search intent not yet validated" };
}

export function curate(raw) {
  const distinct = new Map();
  for (const record of raw.rows || []) {
    for (const suggestion of record.suggestions || []) {
      if (typeof suggestion !== "string") continue;
      const query = suggestion.trim().replace(/\s+/g, " ").toLowerCase();
      if (!query) continue;
      if (!distinct.has(query)) distinct.set(query, { query, pillars: new Set(), seeds: new Set() });
      const existing = distinct.get(query);
      existing.pillars.add(record.pillar);
      existing.seeds.add(record.seed);
    }
  }
  return [...distinct.values()].map((row) => ({
    query: row.query,
    pillar: row.pillars.size === 1 ? [...row.pillars][0] : "multi-pillar — review",
    seeds: [...row.seeds].sort().join(" | "),
    ...classifySuggestion(row.query),
  })).sort((a, b) => a.pillar.localeCompare(b.pillar) || a.query.localeCompare(b.query));
}

function csvRows(data, researchTimestamp) {
  const heads = [
    "query", "pillar", "source_seed", "source", "researched_at_utc",
    "locale", "editorial_status", "review_reason", "search_volume",
    "search_difficulty", "target_canonical_url", "verification_state",
  ];
  const quote = (value) => '"' + String(value ?? "").replaceAll('"', '""').replace(/[\r\n]+/g, " ") + '"';
  return [
    heads.map(quote).join(","),
    ...data.map((row) => [
      row.query, row.pillar, row.seeds, "Google Suggest (unofficial; no search volume)",
      researchTimestamp, "en-NG; hl=en; gl=ng", row.status, row.reason,
      "", "", "", "Unmapped — human content/intent review required",
    ].map(quote).join(",")),
  ].join("\n") + "\n";
}

export async function run(path = inputPath) {
  const raw = JSON.parse(await readFile(path, "utf8"));
  if (!raw.rows || !raw.researchedAt || !raw.source) throw new Error("Invalid or unproven Google Suggest source artifact");
  const items = curate(raw);
  const counts = Object.fromEntries(["candidate", "review", "exclude"].map((name) =>
    [name, items.filter((row) => row.status === name).length]));
  const summary = {
    researchedAt: raw.researchedAt,
    source: raw.source,
    locale: "en-NG", requests: raw.requests, successful: raw.successful,
    failed: raw.failed, uniqueSourceSuggestions: items.length,
    ...counts,
    warning: "Source-observed suggestions only. No traffic volume, difficulty, ranking, verified page match or guaranteed performance.",
  };
  await Promise.all([
    writeFile(fullOutput, csvRows(items, raw.researchedAt)),
    writeFile(reviewOutput, csvRows(items.filter((row) => row.status !== "candidate"), raw.researchedAt)),
    writeFile(summaryOutput, JSON.stringify(summary, null, 2) + "\n"),
  ]);
  console.log("GOOGLE_SUGGEST_RESEARCH_REVIEW " + JSON.stringify(summary));
}

if (process.argv[1]?.endsWith("google-autocomplete-curation.mjs")) {
  await run().catch((error) => { console.error(error); process.exitCode = 1; });
}

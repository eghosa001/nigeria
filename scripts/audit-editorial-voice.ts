/**
 * Whole-site Humanizer review. READ ONLY: reports repetitive/AI-styled writing
 * without changing any page, source, date, licence or business requirement.
 *
 * npm run audit:voice                     summary + top review candidates
 * npm run audit:voice -- --json           machine-readable top 40
 * npm run audit:voice -- --json --all     every candidate, no truncation
 * npm run audit:voice -- --pillar=Services --limit=50
 * npm run audit:voice -- --summary
 */
import { auditEditorialVoice } from "../lib/editorial-voice-audit";
import { collectVoiceCorpus, type VoicePillar } from "../lib/editorial-voice-corpus";
import { collectPublicPageVoice } from "./public-page-voice-corpus";

type Candidate = {
  pillar: VoicePillar;
  kind: string;
  url: string;
  title: string;
  score: number;
  signals: ReturnType<typeof auditEditorialVoice>;
};
const corpus = [...collectVoiceCorpus(), ...collectPublicPageVoice()];
const args = process.argv.slice(2);
const option = (prefix: string) => args.find(arg => arg.startsWith(prefix))?.slice(prefix.length);
const requestedPillar = option("--pillar=");
const selected = corpus.filter(row => !requestedPillar || requestedPillar === row.pillar);
const pillars: VoicePillar[] = ["Movies & Entertainment", "Services", "Tour Nigeria", "Jobs & Careers", "Shared Pages"];
const candidates: Candidate[] = selected.flatMap(row => {
  const signals = auditEditorialVoice(row.prose);
  const score = signals.reduce((total, signal) => total + signal.occurrences, 0);
  return score ? [{ pillar: row.pillar, kind: row.kind, url: row.url, title: row.title, score, signals }] : [];
}).sort((a, b) => b.score - a.score || a.url.localeCompare(b.url));

const summary = pillars.map(pillar => {
  const group = selected.filter(row => row.pillar === pillar);
  const flagged = candidates.filter(row => row.pillar === pillar);
  const kinds = [...new Set(group.map(row => row.kind))].sort().map(kind => ({
    kind,
    inspected: group.filter(row => row.kind === kind).length,
    flagged: flagged.filter(row => row.kind === kind).length,
  }));
  return { pillar, inspected: group.length, flagged: flagged.length,
    proseFields: group.reduce((sum, row) => sum + row.fields, 0), kinds };
});
const limitOption = Number(option("--limit="));
const limit = args.includes("--all") ? Infinity
  : Number.isInteger(limitOption) && limitOption > 0 ? Math.min(5000, limitOption) : 40;
const report = {
  method: "heuristic editorial voice signals, not AI detection or a claim of human review",
  scope: "public editorial catalogue and static App Router text, excluding admin, APIs, machine text and forms",
  totalRecords: selected.length,
  totalTextFields: selected.reduce((sum, row) => sum + row.fields, 0),
  totalFlagged: candidates.length,
  summary,
  candidates: candidates.slice(0, limit),
  candidateResultsTruncated: candidates.length > limit,
};
if (args.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("MyNigeriaGuide site-wide Humanizer review (non-destructive)");
  console.log("Inspected " + report.totalRecords + " editorial records / " + report.totalTextFields + " text fields; " + report.totalFlagged + " records need a stylistic look.");
  for (const row of summary) {
    if (!row.inspected) continue;
    console.log("  " + row.pillar + ": " + row.flagged + " / " + row.inspected + " flagged");
    for (const kind of row.kinds) console.log("    " + kind.kind + ": " + kind.flagged + " / " + kind.inspected);
  }
  // Even the brief CI summary must identify actionable pages; counts alone
  // cannot guide the editors working across several agents.
  const displayed = args.includes("--summary") ? 10 : limit;
  for (const item of candidates.slice(0, displayed)) {
    console.log("  " + item.url + " [" + item.kind + "; " + item.signals.map(s => s.label + " ×" + s.occurrences).join("; ") + "]");
  }
  console.log("Next action: edit only confirmed weak prose with its sources beside you. This audit does not edit or publish articles.");
}

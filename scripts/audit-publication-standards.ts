/**
 * Strict four-pillar editorial screening.
 *
 * Every source-backed record gets an explicit status. This is NOT a live-link
 * checker, legal-rights certificate, firsthand review or Google approval.
 *
 * npm run audit:publication
 * npm run audit:publication -- --json
 * npm run audit:publication -- --gate-new --base=<PR_BASE_SHA>
 */
import { execFileSync } from "node:child_process";
import { publicServices, agencies } from "../lib/data";
import { exploreGuides } from "../lib/explore";
import { explorePlaces, getExplorePlacesForGuide } from "../lib/explore-places";
import { entertainmentTitles } from "../lib/entertainment";
import { getMovieEditorialProfile } from "../lib/movie-editorial-profile-registry";
import { documentedMovieAvailabilityVerdict } from "../lib/movie-availability-evidence-2026-10-17";
import { seriesTitles } from "../lib/series";
import { entertainmentPeople, getPersonEditorialProfile, hasIndexablePersonEditorial } from "../lib/entertainment-extras";
import { youtubeMovieLibrary, indexableYouTubeMovies } from "../lib/youtube-library";
import { youtubeEditorialDossiers } from "../lib/youtube-editorial-dossiers";
import { jobOpportunities, isIndexableJobOpportunity } from "../lib/jobs";
import { hasCompletedIssuerDirectoryReview } from "../lib/job-reviewed-directory-evidence-2026-10-17";
import { careerGuides } from "../lib/career-guides";
import { getEffectiveJobStatus, todayIsoNigeria } from "../lib/job-runtime";
import { MIN_INDEXABLE_AGENCY_GUIDES, shouldIndexAgencyHub } from "../lib/agency-indexing";

type Pillar = "Services" | "Movies & Entertainment" | "Tour Nigeria" | "Jobs & Careers";
type Kind = "service" | "agency" | "movie" | "series" | "actor" | "youtube"
  | "tour-guide" | "tour-place" | "vacancy" | "career-guide";
type Severity = "blocker" | "editorial-review" | "manual-check";
type Finding = { severity: Severity; code: string; detail: string };
type Row = {
  pillar: Pillar; kind: Kind; id: string; url: string | null; title: string;
  indexable: boolean; findings: Finding[]; disposition: string;
};
const now = todayIsoNigeria();
const rows: Row[] = [];
const formatDate = /^\d{4}-\d{2}-\d{2}$/;
const urlGood = (u: string | undefined | null) => Boolean(u && /^https:\/\/[^/\s]+\.[^/\s]+/i.test(u));
const wordCount = (u: string) => (u.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? []).length;
const ageDays = (iso: string | undefined | null) => {
  if (!iso || !formatDate.test(iso) || iso > now) return Infinity;
  const t = Date.parse(iso + "T00:00:00Z");
  return Number.isFinite(t) ? Math.max(0, Math.floor((Date.parse(now + "T00:00:00Z") - t) / 86400000)) : Infinity;
};
const repeated = (xs: string[]) => new Set(xs.map(x => x.trim().toLowerCase()).filter(Boolean)).size < xs.length;
const f = (severity: Severity, code: string, detail: string): Finding => ({ severity, code, detail });
const blocker = (code: string, detail: string) => f("blocker", code, detail);
const review = (code: string, detail: string) => f("editorial-review", code, detail);
const manual = (code: string, detail: string) => f("manual-check", code, detail);
const simpleCanonical = (s: string) => s.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const uniqueText = (items: string[]) => new Set(items.map(simpleCanonical)).size;
const adds = (pill: Pillar, kind: Kind, id: string, url: string | null, title: string, indexable: boolean, findings: Finding[]) => {
  const severe = findings.some(v => v.severity === "blocker");
  const needsReview = findings.some(v => v.severity === "editorial-review");
  rows.push({ pillar: pill, kind, id, url, title, indexable, findings,
    disposition: !indexable ? "nonindexable-listing" : severe ? "hold-indexable" :
      needsReview ? "requires-editorial-review" : "automatic-checks-pass-human-signoff-needed" });
};
const sourceManual = manual("source-links-unchecked-live",
  "The source URL is structurally present, but a live request, correct destination and current content are not proven by repository data.");
const paragraphsManual = manual("originality-and-rights",
  "Original reporting, attribution, image rights, actual mobile UX and absence of plagiarism require human verification.");

for (const s of publicServices) {
  const issues: Finding[] = [];
  if (!s.title || wordCount(s.summary) < 10) issues.push(blocker("missing-usable-answer", "Lead does not explain the service."));
  if (s.requirements.length < 2) issues.push(blocker("missing-prerequisites", "Must identify concrete eligibility or required documents."));
  if (s.steps.length < 3 || s.steps.some(step => wordCount(step) < 6)) issues.push(blocker("incomplete-actions", "A usable ordered procedure needs specific actions."));
  if (!s.sources.length || s.sources.some(x => !urlGood(x.url) || ageDays(x.lastChecked) === Infinity))
    issues.push(blocker("unreliable-official-evidence", "Primary source link or valid check date is absent."));
  if (!s.officialPortal && !s.sources.some(x => urlGood(x.url)))
    issues.push(blocker("no-starting-route", "No official portal or source route to begin."));
  if (s.officialPortal && !urlGood(s.officialPortal)) issues.push(blocker("invalid-portal", "Official portal URL is not a valid HTTPS address."));
  if (!s.feeLabel) issues.push(blocker("fee-not-explained", "Must explain fee or explicitly state it is not published."));
  if (!s.notes.length) issues.push(review("no-outcome-or-cautions", "Guide should cover mistakes, follow-up or applicant safety."));
  if (!s.related.length) issues.push(review("missing-related-guides", "Add only genuinely useful next steps."));
  if (repeated(s.steps) || repeated(s.requirements)) issues.push(review("repeated-guide-steps", "Duplicated actionable content creates artificial length."));
  const sourceHosts = new Set(s.sources.map(x => { try { return new URL(x.url).hostname; } catch { return ""; } }));
  if (sourceHosts.size === 1 && !s.officialPortal) issues.push(review("single-route-source-review", "Check actual process and user friction beyond an issuer summary where possible."));
  if (ageDays(s.lastVerified) > 30) issues.push(review("service-needs-freshness-check", "Review current fee, steps or deadlines; do not just advance the date."));
  issues.push(sourceManual, paragraphsManual);
  adds("Services", "service", s.slug, "/services/" + s.slug, s.title, true, issues);
}
for (const agency of agencies) {
  const matches = publicServices.filter(s => s.agencySlug === agency.slug);
  const indexing = shouldIndexAgencyHub(matches.length);
  const issues: Finding[] = [];
  if (indexing && matches.length < MIN_INDEXABLE_AGENCY_GUIDES) issues.push(blocker("thin-directory-indexed", "Indexable agency directory has too few distinct guides."));
  if (!urlGood(agency.website)) issues.push(review("agency-link-review", "Agency homepage needs valid HTTPS and current authority."));
  if (!indexing) issues.push(review("directory-not-standalone-article", "Kept for navigation; intentionally noindex until substantial independent information exists."));
  issues.push(sourceManual);
  adds("Services", "agency", agency.slug, "/agencies/" + agency.slug, agency.name, indexing, issues);
}

for (const movie of entertainmentTitles) {
  const issues: Finding[] = [];
  const editorial = getMovieEditorialProfile(movie.slug);
  const sources = movie.watchLinks.length + (movie.references?.length ?? 0) +
    (movie.trailer ? 1 : 0) + (movie.sourcePreview ? 1 : 0);
  if (wordCount(movie.synopsis) < 20) issues.push(blocker("insufficient-film-context", "No specific, usable story context."));
  if (!movie.cast.length && !movie.subjects?.length) issues.push(blocker("cast-or-subject-missing", "Cast or documented nonfiction subject evidence is needed."));
  if (!sources) issues.push(blocker("film-without-evidence", "No independently attributable film-specific evidence."));
  if (movie.watchLinks.some(x => !urlGood(x.href) || ageDays(x.lastChecked) === Infinity))
    issues.push(blocker("unreliable-watch-source", "Watch URL or source check date invalid."));
  if (!editorial || editorial.sections.length < 2 || !editorial.questions.length)
    issues.push(review("no-substantive-curated-dossier", "Need specific authored story/credits/release analysis; not just repeated film metadata."));
  if (!movie.watchLinks.length && !documentedMovieAvailabilityVerdict(movie, now))
    issues.push(review("availability-unverified",
      "No authorised watch link or independently sourced current restriction/pre-release disposition: continue verifying."));
  if (!movie.directors?.length) issues.push(review("director-not-confirmed", "Verify director/crew if publisher makes credits available; do not guess."));
  if (movie.artwork && (!movie.artwork.sourceUrl || movie.artwork.status !== "approved"))
    issues.push(blocker("image-rights-incomplete", "Artwork needs approved documented usage."));
  if (movie.watchLinks.length && movie.references?.length === 0)
    issues.push(review("sole-video-source", "Official publisher alone may be sufficient for credits; research distinctive commentary where possible."));
  issues.push(sourceManual, paragraphsManual);
  adds("Movies & Entertainment", "movie", movie.slug, "/entertainment/movies/" + movie.slug, movie.title, true, issues);
}
for (const series of seriesTitles) {
  const issues: Finding[] = [];
  if (!series.sources.length) issues.push(blocker("no-series-source", "Series guide needs attributed episode or creator evidence."));
  if (wordCount(series.synopsis) < 20) issues.push(review("series-lacks-context", "Confirm episode order and original storyline beyond a generic blurb."));
  issues.push(sourceManual, paragraphsManual);
  adds("Movies & Entertainment", "series", series.slug, "/entertainment/series/" + series.slug, series.title, true, issues);
}
for (const person of entertainmentPeople) {
  const issues: Finding[] = [];
  const eligible = hasIndexablePersonEditorial(person.slug);
  const editorial = getPersonEditorialProfile(person.slug);
  if (eligible && (!editorial || editorial.sources.length < 3)) {
    issues.push(blocker("indexable-person-without-person-sources", "Movie references are not biography evidence."));
  }
  if (!eligible) issues.push(review("person-discovery-only",
    "Internal catalog profile is deliberately noindex until independently sourced authored biography is verified."));
  else issues.push(review("person-career-fact-review", "Manually compare each career claim and credit to the cited original institution/interview."));
  issues.push(paragraphsManual);
  adds("Movies & Entertainment", "actor", person.slug, "/entertainment/people/" + person.slug, person.name, eligible, issues);
}
const currentlyIndexableVideoIds = new Set(indexableYouTubeMovies.map(x => x.videoId));
for (const movie of youtubeMovieLibrary) {
  const indexed = movie.source !== "curated" && currentlyIndexableVideoIds.has(movie.videoId);
  const issues: Finding[] = [];
  if (indexed && !youtubeEditorialDossiers[movie.videoId])
    issues.push(blocker("indexable-video-without-original-editorial", "External player, publisher synopsis and cast list alone do not establish publisher-authored value."));
  if (indexed && wordCount(movie.synopsis) < 100)
    issues.push(review("short-video-plot-only", "Check whether independent story, credits and commentary are present in rendered output."));
  if (!indexed && movie.source !== "curated")
    issues.push(review("discovery-record-only", "Listing retained for discovery; do not turn into indexable article until individually reviewed."));
  issues.push(sourceManual);
  adds("Movies & Entertainment", "youtube", movie.videoId,
    "/entertainment/youtube/" + movie.videoId, movie.title, indexed, issues);
}

// Match the Tour page renderer's real card selection. Many destination and
// itinerary guides reuse canonical place records via sharedGuidePlaceSlugs.
// Counting only place.guideSlug here misreported hundreds of genuine on-page
// maps as absent; do not create duplicate place records to satisfy this audit.
for (const guide of exploreGuides) {
  const issues: Finding[] = [];
  const places = getExplorePlacesForGuide(guide.slug).filter(place => Boolean(place.area.trim() && place.address.trim() && urlGood(place.source?.href)));
  const allSources = [guide.source, ...(guide.sources || [])].filter(Boolean);
  const raw = [...guide.intro, ...guide.planning.map(x => x.detail), ...guide.highlights.map(x => x.detail)].join(" ");
  if (!allSources.length || allSources.some(x => !urlGood(x?.href)))
    issues.push(blocker("tour-evidence-missing", "Destination/venue facts need a valid attributable source."));
  if (guide.intro.length < 2 || guide.highlights.length < 3)
    issues.push(blocker("no-distinctive-destination-case", "Give concrete attraction, setting and the distinctive reason to visit."));
  // A standalone guide about one landmark may be complete without a separate
  // card in the attraction database. Test the visitor-facing guide's content,
  // not internal record duplication. Missing place cards are an editorial queue.
  if (guide.planning.length < 3)
    issues.push(blocker("tour-trip-incomplete", "The reader needs an actionable route, access and planning decisions."));
  if (!places.length && guide.kind !== "event")
    issues.push(review("mapped-place-evidence-review", "No source-attributed map card is rendered for this guide. Verify a genuinely relevant public stop and access first; never pad with unrelated nearby venues."));
  if (guide.bestFor.length < 2) issues.push(review("poor-visitor-fit", "Explain the audience and reasons to choose or skip this trip."));
  if (uniqueText(guide.highlights.map(x => x.detail)) < guide.highlights.length)
    issues.push(review("repeated-attraction-copy", "Distinctive stops should not reuse the same sentences."));
  if (!/transport|taxi|road|travel|bus|drive|route|walk|access|journey|getting|arriv|train|flight/i.test(raw))
    issues.push(review("visitor-access-needs-detail", "Explain how to get there or mark source-unknown logistics."));
  if (!/hour|ticket|fee|admission|cost|price|book|open|season|date|entry|timing/i.test(raw))
    issues.push(review("time-price-season-review", "Check cost/opening/seasonality rather than assuming."));
  if (ageDays(guide.lastReviewed) > 60) issues.push(review("tour-source-needs-recheck", "Check access, opening and safety; do not bump date without verifying."));
  if ((guide.sources?.length ?? 0) < 1) issues.push(review("single-operator-perspective", "Seek credible local/independent visitor reports and attribute them; never invent a visit."));
  issues.push(sourceManual, paragraphsManual);
  adds("Tour Nigeria", "tour-guide", guide.slug, "/explore/" + guide.slug, guide.title, true, issues);
}
for (const place of explorePlaces) {
  const issues: Finding[] = [];
  if (!place.address || !place.area || !place.summary || !urlGood(place.source?.href))
    issues.push(blocker("incomplete-place-identification", "Address, area, distinct feature and source required."));
  if (!place.cost || !place.checkedAt) issues.push(review("visitor-operating-facts-missing", "Cost/access needs verification, or explicitly label unknown."));
  if (ageDays(place.checkedAt) > 60) issues.push(review("place-freshness-check", "Recheck live availability, cost and access."));
  issues.push(sourceManual);
  adds("Tour Nigeria", "tour-place", place.slug, null, place.name, false, issues);
}

for (const job of jobOpportunities) {
  const indexable = isIndexableJobOpportunity(job);
  const status = getEffectiveJobStatus(job);
  const issues: Finding[] = [];
  if (!job.title || !job.organization || !job.location)
    issues.push(blocker("role-identity-incomplete", "Employer, role and location needed."));
  if (!urlGood(job.officialUrl) || !job.sources.length)
    issues.push(blocker("missing-employer-route", "Official employer job/portal destination and evidence needed."));
  if (!job.applicationSteps.length || !job.qualifications.length || !job.requirements.length)
    issues.push(blocker("application-guide-incomplete", "Eligibility and concrete steps required."));
  if (job.kind === "career-page" && status === "open")
    issues.push(blocker("career-directory-mislabelled", "Employer job board must not claim individual vacancy is open."));
  if (status === "closed" && indexable && job.kind === "vacancy")
    issues.push(blocker("closed-vacancy-indexable", "Closed one-off opening must not remain in active search sitemaps."));
  if (job.kind === "vacancy" && status === "open" && ageDays(job.verifiedAt) > 14)
    issues.push(blocker("open-vacancy-check-expired", "Current open status needs a recent issuer-level source check."));
  if (job.kind === "vacancy" && status === "open" && !job.deadline)
    issues.push(review("open-no-deadline-verification", "Explain ongoing/rolling hiring only if employer confirms."));
  if (job.kind === "vacancy" && status === "open" && !job.posting)
    issues.push(review("job-posting-provenance", "Verify original post date, actual role detail and application source."));
  if (status === "closed" && job.statusLabel.toLowerCase().includes("open"))
    issues.push(review("stale-status-label", "Even archived copy must not promise currently open applications."));
  if (job.kind === "career-page" && !hasCompletedIssuerDirectoryReview(job, now))
    issues.push(review("employer-directory-depth",
      "This career directory still lacks a current source-matched, issuer-specific completed review; generic how-to text is not enough."));
  issues.push(sourceManual, paragraphsManual);
  adds("Jobs & Careers", "vacancy", job.slug,
    "/jobs/" + job.slug, job.title, indexable, issues);
}
for (const guide of careerGuides) {
  const issues: Finding[] = [];
  if (!guide.sources.length || guide.sections.length < 3)
    issues.push(blocker("career-explainer-incomplete", "Original structured advice, examples and sources needed."));
  if (wordCount(guide.answer) < 20) issues.push(review("career-answer-thin", "Make the opening response actionable rather than a generic slogan."));
  issues.push(sourceManual, paragraphsManual);
  adds("Jobs & Careers", "career-guide", guide.slug,
    "/jobs/guides/" + guide.slug, guide.title, true, issues);
}

const pillars: Pillar[] = ["Movies & Entertainment", "Services", "Tour Nigeria", "Jobs & Careers"];
const byPillar = pillars.map(pillar => {
  const section = rows.filter(r => r.pillar === pillar);
  return {
    pillar, records: section.length,
    indexable: section.filter(r => r.indexable).length,
    blockers: section.filter(r => r.indexable && r.findings.some(i => i.severity === "blocker")).length,
    editorialReview: section.filter(r => r.indexable && r.findings.some(i => i.severity === "editorial-review")).length,
    manualChecks: section.filter(r => r.indexable && r.findings.some(i => i.severity === "manual-check")).length,
    nonindexable: section.filter(r => !r.indexable).length,
  };
});
const issueCounts = Object.fromEntries(
  [...new Set(rows.flatMap(r => r.findings.map(i => i.code)))].sort().map(code =>
    [code, rows.filter(r => r.findings.some(i => i.code === code)).length]),
);
const priorityRows = rows
  .filter(r => r.indexable && r.findings.some(i => i.severity !== "manual-check"))
  .sort((a, b) => Number(b.findings.some(i => i.severity === "blocker")) -
    Number(a.findings.some(i => i.severity === "blocker")) ||
    b.findings.length - a.findings.length || a.url!.localeCompare(b.url!));
const audit = {
  date: now, rubric: "docs/FOUR_PILLAR_PUBLICATION_STANDARD.md",
  coverage: { sourceCatalogRecords: rows.length, distinctIds: new Set(rows.map(r => r.pillar + "/" + r.kind + "/" + r.id)).size,
    indexable: rows.filter(r => r.indexable).length,
    nonindexable: rows.filter(r => !r.indexable).length,
    manuallyLiveChecked: 0, individuallyHumanApproved: 0 },
  byPillar, issueCounts,
  highPrioritySample: priorityRows.slice(0, 80).map(({ pillar, kind, url, disposition, findings }) =>
    ({ pillar, kind, url, disposition, findings: findings.filter(f => f.severity !== "manual-check") })),
  caveats: [
    "Every imported source record scanned. Not every URL has been fetched live.",
    "These are inferred editorial risks and verifiable data checks, not Google's hidden AdSense score.",
    "Manual source truth, redirect/form functionality, lived experience, originality, licence, and mobile tests remain unproven.",
    "Nonindexable pages may still be visited and need appropriate source disclosures.",
    "Existing historic findings remain open, not auto-grandfathered as quality-approved.",
  ],
  rows,
};

// Gate NEW records introduced by a pull request; do not block unrelated changes
// because of a pre-existing 4,000+ record editorial backlog. We require that
// new indexable records carry no automatic blockers AND no unresolved editorial
// review flags. Manual approvals are separate and must never be inferred.
const gate = process.argv.includes("--gate-new");
if (gate) {
  const baseArg = process.argv.find(x => x.startsWith("--base="));
  const base = baseArg?.slice("--base=".length);
  if (!base || !/^[a-f0-9]{7,40}$/.test(base)) throw new Error("Pass valid --base=<PR_SHA> when using --gate-new.");
  const patch = execFileSync("git", ["diff", "--no-ext-diff", "--unified=0", base, "HEAD", "--",
    "data", "lib", "scripts"], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  const newIds = new Set<string>();
  for (const line of patch.split("\n")) {
    if (!line.startsWith("+") || line.startsWith("+++")) continue;
    const slug = line.match(/^\+\s*(?:["']?slug["']?)\s*:\s*["']([^"']+)["']/);
    if (slug) newIds.add(slug[1]);
    const videoId = line.match(/^\+\s*(?:["']?videoId["']?)\s*:\s*["']([a-zA-Z0-9_-]{11})["']/);
    if (videoId) newIds.add(videoId[1]);
  }
  const targeted = rows.filter(r => r.indexable && newIds.has(r.id));
  const held = targeted.filter(r => r.findings.some(x => x.severity !== "manual-check"));
  console.log("Strict new-page gate: " + targeted.length +
    " candidate indexable records touched/new; " + held.length + " need editorial corrections.");
  for (const row of held.slice(0, 25))
    console.error(row.url + ": " +
      row.findings.filter(x => x.severity !== "manual-check").map(x => x.code).join(", "));
  if (held.length) process.exitCode = 1;
}
if (process.argv.includes("--json")) {
  console.log(JSON.stringify(audit));
} else {
  console.log("Full four-pillar publication screening: " + audit.coverage.sourceCatalogRecords +
    " records; " + audit.coverage.indexable + " indexable; " + audit.coverage.nonindexable + " nonindexable.");
  for (const p of byPillar) console.log(JSON.stringify(p));
  console.log("Flags (not a Google verdict):", JSON.stringify(issueCounts));
  console.log("First priority cases:", JSON.stringify(audit.highPrioritySample.slice(0, 12)));
  console.log("Manual validation of actual link outcomes and originality still required.");
}

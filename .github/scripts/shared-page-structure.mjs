import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Editorial structure is guaranteed by shared page templates, not per-record HTML.
// A published legacy or new record renders through the same detail template.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export const contracts = [
  {
    name: "Services", path: "app/services/[slug]/page.tsx", collection: "publicServices.map",
    required: ["GuideQuickNav", "ServiceJourney", "ServiceRequirements", "ServiceSteps", "ServiceAftercare", "ServiceSearchAnswers", "service.sources", "service.lastVerified", "official-sources"],
    linked: [
      "components/guide-quick-nav.tsx",
      "components/service-journey.tsx", "components/service-requirements.tsx",
      "components/service-steps.tsx", "components/service-aftercare.tsx",
      "components/service-search-answers.tsx",
    ],
    targets: ["journey", "requirements", "steps", "after-submit", "quick-answers", "official-sources"],
  },
  {
    name: "Jobs", path: "app/jobs/[slug]/page.tsx", collection: "jobOpportunities.map",
    required: ["PageOutline", "effectiveStatus", "item.qualifications", "item.documents", "item.applicationSteps", "item.sources", "item.verifiedAt"],
    targets: ["job-overview", "requirements", "documents", "apply", "job-sources", "official-application"],
  },
  {
    name: "Tour", path: "app/explore/[slug]/page.tsx", collection: "exploreGuides.map",
    required: ["PageOutline", "guide.highlights", "guide.planning", "guide.lastReviewed", "guide.source", "getExplorePlacesForGuide"],
    targets: ["trip-highlights", "places", "trip-questions", "planning", "trip-sources"],
  },
  {
    name: "Movies", path: "app/entertainment/movies/[slug]/page.tsx", collection: "entertainmentTitles.map",
    required: ["movie-detail-subnav", "featuredCast", "availabilityLinks", "title.references", "lastChecked"],
    targets: ["overview", "cast", "watch", "related"],
  },
  {
    name: "TV series", path: "app/entertainment/series/[slug]/page.tsx", collection: "seriesTitles.map",
    required: ["AnswerFirst", "PageOutline", "item.cast", "item.watchLinks", "item.sources", "seriesLastChecked"],
    targets: ["series-overview", "watch", "series-sources"],
  },
  {
    name: "Career guides", path: "app/jobs/guides/[slug]/page.tsx", collection: "careerGuides.map",
    required: ["AnswerFirst", "PageOutline", "guide.sections.map", "guide.sources", "guide.reviewedAt"],
    targets: ["guide", "career-sources"],
  },
  {
    name: "People profiles", path: "app/entertainment/people/[slug]/page.tsx", collection: "entertainmentPeople.map",
    required: ["AnswerFirst", "Breadcrumbs", "person.summary", "credits", "personSchema"],
    targets: ["credits"],
  },
  {
    name: "YouTube movies", path: "app/entertainment/youtube/[videoId]/page.tsx",
    collection: "youtubeServerStore",
    required: ["Breadcrumbs", "movie-detail-subnav", "movie.featuredCast", "movie.lastChecked", "movie.videoUrl"],
    targets: ["overview", "cast", "source"],
  },
];

export const landingContracts = [
  { name: "Services directory", path: "app/services/page.tsx", anchors: ["popular-service-tasks", "service-categories", "service-directory"], required: ["PageOutline", "ServiceDirectory", "section-quick-search"] },
  { name: "Jobs directory", path: "app/jobs/page.tsx", anchors: ["opportunities", "job-paths", "career-tools"], required: ["PageOutline", "JobsDirectory", "section-quick-search"] },
  { name: "Movies directory", path: "app/entertainment/page.tsx", anchors: ["featured-films", "free-films", "browse-entertainment"], required: ["PageOutline", "section-quick-search"] },
  { name: "Tour directory", path: "app/explore/page.tsx", anchors: ["featured-destinations", "places", "browse-guides"], required: ["ExplorePlaceDirectory", "section-quick-search"] },
];

export function hashLinks(source) {
  return [...source.matchAll(/\bhref\s*(?:=|:)\s*["']#([a-z][a-z0-9-]*)["']/g)].map((match) => match[1]);
}
export function ids(source) {
  return new Set([...source.matchAll(/\bid\s*=\s*["']([a-z][a-z0-9-]*)["']/g)].map((match) => match[1]));
}

export function validateTemplate(contract, source, linkedSources = []) {
  const issues = [];
  if (!source.includes(contract.collection)) issues.push("catalog-driven route generation missing");
  if (!source.includes("generateStaticParams") && contract.name !== "YouTube movies")
    issues.push("static generation must map both older and newly published records");
  for (const token of contract.required) if (!source.includes(token)) issues.push("missing " + token);
  const all = [source, ...linkedSources].join("\n");
  const targets = ids(all);
  for (const id of contract.targets) if (!targets.has(id)) issues.push("missing section #" + id);
  for (const id of new Set(hashLinks(all))) if (!targets.has(id)) issues.push("broken in-page link #" + id);
  return issues;
}

export function validateLanding(contract, source) {
  const issues = [];
  const targets = ids(source);
  for (const token of contract.required) if (!source.includes(token)) issues.push("missing " + token);
  for (const id of contract.anchors) if (!targets.has(id)) issues.push("missing section #" + id);
  for (const id of new Set(hashLinks(source))) if (!targets.has(id)) issues.push("broken in-page link #" + id);
  return issues;
}

export function auditSharedStructure(read = (path) => readFileSync(resolve(root, path), "utf8")) {
  const issues = [];
  for (const contract of contracts) {
    const source = read(contract.path);
    const other = (contract.linked || []).map((path) => read(path));
    for (const issue of validateTemplate(contract, source, other))
      issues.push(contract.name + ": " + issue);
  }
  for (const contract of landingContracts) {
    for (const issue of validateLanding(contract, read(contract.path)))
      issues.push(contract.name + ": " + issue);
  }
  return issues;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const issues = auditSharedStructure();
  if (issues.length) {
    console.error("Shared content structure failed:\n" + issues.map((x) => "- " + x).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("All four pillars: legacy and future records share verified templates, actionable sections and valid local navigation.");
  }
}

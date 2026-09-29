import fs from "node:fs";

const generatedPath = "data/youtube-movies.generated.json";
const reviewPath = "data/youtube-movies-review.generated.json";

const generated = JSON.parse(fs.readFileSync(generatedPath, "utf8"));
const review = JSON.parse(fs.readFileSync(reviewPath, "utf8"));

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function cleanName(value) {
  return String(value ?? "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\b(starring|featuring|feat\.?|ft\.?)\b/gi, "")
    .replace(/and\s+many\s+(?:more|others?)\.?$/i, "")
    .replace(/^(?:with|also)\s+/i, "")
    .replace(/\s+as\s+[A-Za-zÀ-ÖØ-öø-ÿ'’.\-\s]+$/i, "")
    .replace(/[#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[,.;:!?\s]+|[,.;:!?\s]+$/g, "");
}

const actorStats = new Map();
for (const movie of generated.movies ?? []) {
  for (const rawName of movie.cast ?? []) {
    const name = cleanName(rawName);
    if (!name || name.split(/\s+/).length < 2) continue;
    const key = normalize(name);
    const current = actorStats.get(key) ?? { name, count: 0 };
    current.count++;
    if (name.length > current.name.length) current.name = name;
    actorStats.set(key, current);
  }
}

const actorIndex = [...actorStats.entries()]
  .filter(([, value]) => value.count >= 2)
  .map(([key, value]) => ({ key, name: value.name }))
  .sort((a, b) => b.key.length - a.key.length);

function castFromTitle(rawTitle) {
  const title = " " + normalize(rawTitle) + " ";
  const matches = [];

  for (const actor of actorIndex) {
    const needle = " " + actor.key + " ";
    const index = title.indexOf(needle);
    if (index < 0) continue;
    const end = index + needle.length;
    if (matches.some((match) => index < match.end && end > match.index)) continue;
    matches.push({ ...actor, index, end });
    if (matches.length >= 8) break;
  }

  return matches.length >= 2
    ? matches.sort((a, b) => a.index - b.index).map((match) => match.name)
    : [];
}

const nonMovieTitle = /\b(?:interview|hot\s+seat|podcast|behind\s+the\s+scenes|\bbts\b|reaction|red\s+carpet|press\s+conference|q\s*&\s*a|question\s+and\s+answer|live\s+session|meet\s+the\s+cast|making\s+of)\b/i;
const promoText = /\b(?:subscribe(?:\s+to)?|follow\s+us|welcome\s+to\s+(?:our|the)\s+channel|youtube\s+channel|watch\s+more|like\s*(?:,|and|&)\s*share|don't\s+forget\s+to|do\s+not\s+forget\s+to|thank\s+you\s+for\s+watching)\b/i;

function yearFor(candidate) {
  const currentYear = new Date().getUTCFullYear();
  const text = (candidate.rawTitle ?? "") + " " + (candidate.descriptionExcerpt ?? "");
  const years = [...text.matchAll(/\b(20\d{2})\b/g)]
    .map((match) => Number(match[1]))
    .filter((year) => year >= 2000 && year <= currentYear + 1);
  if (years.length) return Math.max(...years);
  return Number(String(candidate.publishedAt ?? currentYear).slice(0, 4));
}

function synopsisFor(candidate, cast) {
  const text = String(candidate.descriptionExcerpt ?? "").replace(/\s+/g, " ").trim();
  if (text && !promoText.test(text.slice(0, 420)) && !/https?:\/\//i.test(text.slice(0, 420))) {
    const sentence = text.match(/^(.{70,360}?[.!?])(?:\s|$)/)?.[1];
    if (sentence) return sentence.trim();
    if (text.length >= 70) return text.slice(0, 360).trim();
  }

  const featured = cast.slice(0, 3).join(", ");
  return candidate.title + " is a full-length Nigerian film published by " +
    candidate.channelName + ", featuring " + featured +
    ". Watch it through the publisher's official YouTube release.";
}

const byVideoId = new Map((generated.movies ?? []).map((movie) => [movie.videoId, movie]));
const existingPublisherTitleYear = new Set(
  (generated.movies ?? []).map((movie) =>
    [movie.channelId, normalize(movie.title), movie.year].join("|"),
  ),
);

const remaining = [];
let recovered = 0;
let skippedDuplicate = 0;
let skippedNonMovie = 0;

for (const candidate of review.candidates ?? []) {
  const cast = castFromTitle(candidate.rawTitle);
  if (cast.length < 2) {
    remaining.push(candidate);
    continue;
  }
  if (nonMovieTitle.test(candidate.rawTitle ?? "")) {
    skippedNonMovie++;
    remaining.push(candidate);
    continue;
  }

  const year = yearFor(candidate);
  const dedupeKey = [candidate.channelId, normalize(candidate.title), year].join("|");
  if (byVideoId.has(candidate.videoId) || existingPublisherTitleYear.has(dedupeKey)) {
    skippedDuplicate++;
    continue;
  }

  const movie = {
    videoId: candidate.videoId,
    title: candidate.title,
    rawTitle: candidate.rawTitle ?? candidate.title,
    synopsis: synopsisFor(candidate, cast),
    cast,
    featuredCast: cast.slice(0, 3),
    channelName: candidate.channelName,
    channelId: candidate.channelId,
    channelUrl: candidate.channelUrl,
    publishedAt: candidate.publishedAt,
    year,
    durationMinutes: candidate.durationMinutes,
    videoUrl: candidate.videoUrl,
    lastChecked: new Date().toISOString().slice(0, 10),
  };

  byVideoId.set(movie.videoId, movie);
  existingPublisherTitleYear.add(dedupeKey);
  recovered++;
}

const movies = [...byVideoId.values()]
  .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)) || a.title.localeCompare(b.title));

generated.generatedAt = new Date().toISOString();
generated.syncMode = "metadata-recovery";
generated.importedCount = movies.length;
generated.importedThisRun = recovered;
generated.pendingQualityCount = remaining.length;
generated.pendingThisRun = 0;
generated.failedSourceCount = 0;
generated.sourceErrors = [];
generated.movies = movies;
generated.recoveredWithoutApi = recovered;

review.generatedAt = generated.generatedAt;
review.syncMode = "metadata-recovery";
review.candidateCount = remaining.length;
review.candidates = remaining;

fs.writeFileSync(generatedPath, JSON.stringify(generated, null, 2) + "\n");
fs.writeFileSync(reviewPath, JSON.stringify(review, null, 2) + "\n");

console.log(
  "Recovered", recovered,
  "held movies without YouTube API calls;",
  remaining.length, "remain for review;",
  skippedNonMovie, "non-movie candidates kept held;",
  skippedDuplicate, "duplicates skipped.",
);

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

function fallbackSynopsis(title, channelName, cast) {
  const featured = cast.slice(0, 3).join(", ");
  return title + " is a full-length Nigerian film published by " +
    channelName + (featured ? ", featuring " + featured : "") +
    ". Watch it through the publisher's official YouTube release.";
}

function usableSynopsis(text, title, channelName, cast) {
  let value = String(text ?? "")
    .replace(/[\u200E\u200F\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!value) return fallbackSynopsis(title, channelName, cast);

  const original = value;
  const synopsisMarker = value.match(/\bSYNOPSIS\s*:\s*(.+)$/i);
  if (synopsisMarker) value = synopsisMarker[1].trim();

  const hashtagCount = (original.match(/#[A-Za-z0-9_]+/g) ?? []).length;
  const firstTagIndex = original.search(/[@#][A-Za-z0-9_]/);
  value = value.replace(/^(?:\s*[@#][A-Za-z0-9_.-]+[,.;:]?)+\s*/g, "").trim();

  if (
    value.length < 70 ||
    promoText.test(value.slice(0, 420)) ||
    /https?:\/\//i.test(value.slice(0, 420)) ||
    (!synopsisMarker && hashtagCount >= 3 && firstTagIndex >= 0 && firstTagIndex < 40)
  ) {
    return fallbackSynopsis(title, channelName, cast);
  }

  const sentence = value.match(/^(.{70,360}?[.!?])(?:\s|$)/)?.[1];
  if (sentence) return sentence.trim();
  return value.slice(0, 360).trim();
}

function cleanTitleFromCast(rawTitle, currentTitle, cast) {
  const raw = String(rawTitle ?? currentTitle ?? "").trim();
  let title = String(currentTitle ?? raw).trim();

  if (/^watch\b/i.test(raw)) {
    const namedAtEnd = raw.match(/\bin\s+([A-Z][A-Z0-9 '&.\-]{3,80})(?:\s*\||\s*$)/);
    if (namedAtEnd) title = namedAtEnd[1];
  }

  const suffixTitle = raw.match(/-\s*([A-Z][A-Z0-9 '&.\-]{3,80})\s*-\s*(?:LATEST|NEW|20\d{2})\b/i)
    ?? raw.match(/-\s*([A-Z][A-Z0-9 '&.\-]{3,80})\s+20\d{2}\s*$/);
  if (suffixTitle) title = suffixTitle[1];

  const lowerRaw = raw.toLowerCase();
  const hits = [];

  for (const rawName of cast ?? []) {
    const name = cleanName(rawName);
    if (name.length < 4) continue;
    const index = lowerRaw.indexOf(name.toLowerCase());
    if (index >= 0) hits.push(index);
  }

  hits.sort((a, b) => a - b);
  if (hits.length >= 2) {
    const prefix = raw.slice(0, hits[0]);
    if (
      /(?:[-–—:/.]\s*|[-–—:/]\s*watch\s*|\b(?:starring|staring|featuring)\s*|[-–—:/]?\s*\([^)]*(?:movie|film)[^)]*\)\s*)$/i.test(prefix) ||
      /\s{2,}$/.test(prefix)
    ) {
      title = prefix;
    }
  }

  const plotTagline = title.match(/^([A-Z0-9 '&\-]{4,60}):\s+[A-Z][a-z]/);
  if (plotTagline) title = plotTagline[1];

  title = title
    .replace(/\((?:\s*(?:full|complete|new)\s+movie|the\s+movie|d\s+movie|official\s+movie|fullnigerianmovie)\s*\)/gi, " ")
    .replace(/\s*[-–—:/]\s*watch\s*$/i, " ")
    .replace(/\b(?:starring|staring|featuring)\s*$/i, " ")
    .split("|")[0]
    .replace(/\s*[-–—/|:.]+\s*$/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return title || String(currentTitle ?? raw).trim();
}

function synopsisFor(candidate, cast, title) {
  return usableSynopsis(candidate.descriptionExcerpt, title, candidate.channelName, cast);
}

let polishedExisting = 0;
for (const movie of generated.movies ?? []) {
  const beforeTitle = movie.title;
  const beforeSynopsis = movie.synopsis;
  const beforeCast = JSON.stringify(movie.cast ?? []);

  const titleActors = castFromTitle(movie.rawTitle);
  if (titleActors.length >= 2) {
    const seen = new Set((movie.cast ?? []).map((name) => normalize(cleanName(name))));
    for (const actor of titleActors) {
      const key = normalize(cleanName(actor));
      if (!key || seen.has(key)) continue;
      seen.add(key);
      movie.cast.push(actor);
    }
  }

  movie.title = cleanTitleFromCast(movie.rawTitle, movie.title, movie.cast ?? []);
  movie.synopsis = usableSynopsis(movie.synopsis, movie.title, movie.channelName, movie.cast ?? []);
  movie.featuredCast = (movie.cast ?? []).slice(0, 3);
  if (
    movie.title !== beforeTitle ||
    movie.synopsis !== beforeSynopsis ||
    JSON.stringify(movie.cast ?? []) !== beforeCast
  ) polishedExisting++;
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
  const cleanTitle = cleanTitleFromCast(candidate.rawTitle, candidate.title, cast);
  const dedupeKey = [candidate.channelId, normalize(cleanTitle), year].join("|");
  if (byVideoId.has(candidate.videoId) || existingPublisherTitleYear.has(dedupeKey)) {
    skippedDuplicate++;
    continue;
  }

  const movie = {
    videoId: candidate.videoId,
    title: cleanTitle,
    rawTitle: candidate.rawTitle ?? cleanTitle,
    synopsis: synopsisFor(candidate, cast, cleanTitle),
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
  "polished", polishedExisting, "existing movie records;",
  remaining.length, "remain for review;",
  skippedNonMovie, "non-movie candidates kept held;",
  skippedDuplicate, "duplicates skipped.",
);

import fs from "node:fs";

const sources = JSON.parse(fs.readFileSync("data/youtube-movie-sources.json", "utf8"));
const generated = JSON.parse(fs.readFileSync("data/youtube-movies.generated.json", "utf8"));

const castNoiseExact = /^(?:many\s+(?:more|others?)|comment(?:s)?|like|share|subscribe|follow|hottest|trailers?|lastest|latest|produced|more|story|screen\s*play|join\s+the\s+trend|new)$/i;
const castNoiseContains = /\b(?:don['’]?t\s+forget\s+to|join\s+the\s+trend|screen\s*play|original\s+story|facebook|instagram|youtube|nollywoodpicturestv|movies?\b|films?\b|subscribe|comment|share|entertainment\s+network|world\s+class\s+premieres?)\b/i;
const promoSynopsis = /\b(?:subscribe(?:\s+to)?|follow\s+us|welcome\s+to\s+(?:our|the)\s+channel|youtube\s+channel|watch\s+more|like\s*(?:,|and|&)\s*share|don't\s+forget\s+to|do\s+not\s+forget\s+to|thank\s+you\s+for\s+watching)\b/i;

function assert(condition, message) {
  if (!condition) {
    console.error("Entertainment scale check failed:", message);
    process.exit(1);
  }
}

function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

assert(Array.isArray(sources.sources) && sources.sources.length > 0, "approved YouTube sources are required");

const sourceSlugs = new Set();
const approvedNames = new Set();
let estimatedCapacity = 0;

for (const source of sources.sources) {
  assert(source.slug && !sourceSlugs.has(source.slug), "source slugs must be unique: " + source.slug);
  sourceSlugs.add(source.slug);
  assert(Array.isArray(source.aliases) && source.aliases.length > 0, "aliases are required for " + source.slug);
  assert(Number(source.estimatedMovieCount) > 0, "estimatedMovieCount must be positive for " + source.slug);
  estimatedCapacity += Number(source.estimatedMovieCount);
  for (const alias of source.aliases) approvedNames.add(normalize(alias));
}

assert(estimatedCapacity >= 1000, "approved source capacity must remain at least 1,000 movies");
assert(Array.isArray(generated.movies), "generated movie catalog must contain a movies array");

if (generated.generatedAt !== null) {
  const generatedDate = String(generated.generatedAt).slice(0, 10);
  if (generatedDate >= String(sources.checkedAt ?? "")) {
    assert(generated.sourceCount === sources.sources.length, "fresh generated sourceCount must match approved source registry");
  } else {
    assert(
      Number(generated.sourceCount) > 0 && Number(generated.sourceCount) <= sources.sources.length,
      "older generated sourceCount cannot exceed the approved source registry",
    );
  }
  assert(generated.importedCount === generated.movies.length, "generated importedCount must match movie array length");
  assert(Number(generated.requiredFailedSourceCount ?? 0) === 0, "sync cannot publish with failed required sources");
  assert(generated.movies.length >= 1000, "published YouTube movie catalog must remain at least 1,000 records");
}

const videoIds = new Set();
const publisherTitleYear = new Set();

for (const movie of generated.movies) {
  assert(movie.videoId && !videoIds.has(movie.videoId), "video IDs must be unique: " + movie.videoId);
  videoIds.add(movie.videoId);
  assert(movie.title && movie.synopsis, "title and synopsis are required for " + movie.videoId);
  assert(!promoSynopsis.test(String(movie.synopsis)), "promotional synopsis is not allowed: " + movie.videoId);
  assert(!/[\\/|]\\s*$/.test(movie.title), "movie title must not end with a feed separator: " + movie.title);
  assert(!/\\bfull\\s+movie\\b/i.test(movie.title), "movie title must not contain FULL MOVIE SEO text: " + movie.title);
  assert(!/^(?:nollywood|nigerian)\\s+movie\\b/i.test(movie.title), "movie title must not be a generic platform label: " + movie.title);
  assert(!/^watch\\s+.+?\\s+in\\s+/i.test(movie.title), "movie title must not keep YouTube watch-prefix text: " + movie.title);
  assert(!/\\blatest\\s+(?:20\\d{2}|nollywood|romantic\\s+movie)\\b/i.test(movie.title), "movie title must not contain legacy latest-movie SEO text: " + movie.title);
  assert(Array.isArray(movie.cast), "cast must be an array for " + movie.videoId);
  assert(Array.isArray(movie.featuredCast), "featured cast must be an array for " + movie.videoId);
  if (movie.cast.length === 0) {
    assert(movie.metadataStatus === "cast-pending", "cast-free records must be explicitly marked cast-pending: " + movie.videoId);
  } else {
    assert(movie.featuredCast.length > 0, "featured cast is required when cast metadata exists for " + movie.videoId);
  }
  if (movie.viewCount !== undefined) {
    assert(Number.isFinite(Number(movie.viewCount)) && Number(movie.viewCount) >= 0, "viewCount must be a non-negative number: " + movie.videoId);
  }
  for (const castName of movie.cast) {
    assert(
      !castNoiseExact.test(String(castName).trim()) && !castNoiseContains.test(String(castName)),
      "promotional/noise cast entry is not allowed: " + castName + " (" + movie.videoId + ")",
    );
    assert(
      !/\\s+as\\s+|^\\s*(?:with|also)\\s+/i.test(String(castName)),
      "cast entry must be a person name without role/prefix text: " + castName + " (" + movie.videoId + ")",
    );
  }
  assert(Number(movie.durationMinutes) >= 55, "movie runtime must remain full-length for " + movie.videoId);
  assert(approvedNames.has(normalize(movie.channelName)), "unapproved publisher in generated catalog: " + movie.channelName);
  assert(/^https:\/\/www\.youtube\.com\/watch\?v=/.test(movie.videoUrl), "movie must link to YouTube watch page: " + movie.videoId);

  const dedupeKey = [movie.channelId, normalize(movie.title), movie.year].join("|");
  assert(!publisherTitleYear.has(dedupeKey), "duplicate publisher/title/year record: " + movie.title);
  publisherTitleYear.add(dedupeKey);
}

console.log(
  "Entertainment scale check passed:",
  sources.sources.length + " approved channels,",
  estimatedCapacity.toLocaleString() + "+ estimated movies,",
  generated.movies.length + " generated records.",
);

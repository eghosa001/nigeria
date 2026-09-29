import fs from "node:fs";

const sources = JSON.parse(fs.readFileSync("data/youtube-movie-sources.json", "utf8"));
const generated = JSON.parse(fs.readFileSync("data/youtube-movies.generated.json", "utf8"));

function assert(condition, message) {
  if (!condition) {
    console.error("Entertainment scale check failed:", message);
    process.exit(1);
  }
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
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
  assert(generated.sourceCount === sources.sources.length, "generated sourceCount must match approved source registry");
  assert(generated.importedCount === generated.movies.length, "generated importedCount must match movie array length");
}

const videoIds = new Set();
const publisherTitleYear = new Set();

for (const movie of generated.movies) {
  assert(movie.videoId && !videoIds.has(movie.videoId), "video IDs must be unique: " + movie.videoId);
  videoIds.add(movie.videoId);
  assert(movie.title && movie.synopsis, "title and synopsis are required for " + movie.videoId);
  assert(Array.isArray(movie.cast) && movie.cast.length > 0, "cast is required for " + movie.videoId);
  assert(Array.isArray(movie.featuredCast) && movie.featuredCast.length > 0, "featured cast is required for " + movie.videoId);
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

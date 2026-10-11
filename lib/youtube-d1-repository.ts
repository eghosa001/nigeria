/**
 * Cloudflare D1 read boundary for the staged YouTube catalog.
 *
 * Deliberately independent of cloudflare:workers imports: callers must supply
 * a real, explicitly configured CONTENT_DB binding. No database is provisioned
 * here and public pages continue using the existing verified static catalog.
 *
 * Draft records can be inspected ONLY through the explicitly named staging
 * function; the public reader always requires an editor-published row.
 */
type SqlParam = string | number | null;

export type YouTubeD1Statement = {
  bind(...values: SqlParam[]): YouTubeD1BoundStatement;
};

export type YouTubeD1BoundStatement = {
  first<T extends object>(): Promise<T | null>;
  all<T extends object>(): Promise<{ results: T[] }>;
};

export type YouTubeD1Database = {
  prepare(sql: string): YouTubeD1Statement;
};

export type StoredYouTubeMovie = {
  videoId: string;
  title: string;
  channelName: string;
  videoUrl: string;
  publishedAt: string;
  lastChecked: string;
  cast: string[];
  featuredCast: string[];
  // Keep the entire trusted staged payload for later normalization and parity.
  [field: string]: unknown;
};

export type YouTubeD1Record = {
  movie: StoredYouTubeMovie;
  editorialStatus: string;
  canonicalPath: string;
};

type ContentRow = {
  payload_json: string;
  editorial_status: string;
  canonical_path: string;
};

export const YOUTUBE_D1_PILLAR = "movies_entertainment";
export const YOUTUBE_D1_KIND = "youtube-movie";

function isValidVideoId(id: string) {
  return /^[A-Za-z0-9_-]{11}$/.test(id);
}

function parseRow(row: ContentRow | null, videoId: string): YouTubeD1Record | null {
  if (!row) return null;
  const canonicalPath = "/entertainment/youtube/" + videoId;
  if (row.canonical_path !== canonicalPath) {
    throw new Error("D1 YouTube canonical-path mismatch for " + videoId);
  }
  let payload: unknown;
  try {
    payload = JSON.parse(row.payload_json);
  } catch {
    throw new Error("D1 YouTube movie payload is not valid JSON: " + videoId);
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("D1 YouTube payload is not a movie object: " + videoId);
  }
  const movie = payload as Record<string, unknown>;
  if (movie.videoId !== videoId ||
      typeof movie.title !== "string" || !movie.title.trim() ||
      typeof movie.channelName !== "string" || !movie.channelName.trim() ||
      typeof movie.publishedAt !== "string" ||
      typeof movie.lastChecked !== "string" ||
      !Array.isArray(movie.cast) || !movie.cast.every((name) => typeof name === "string") ||
      !Array.isArray(movie.featuredCast) || !movie.featuredCast.every((name) => typeof name === "string")) {
    throw new Error("D1 YouTube payload is missing required movie fields: " + videoId);
  }

  // Same trusted-watch-URL restriction used by the offline import tool.
  let watch: URL;
  try { watch = new URL(String(movie.videoUrl ?? "")); }
  catch { throw new Error("D1 YouTube movie watch URL is invalid: " + videoId); }
  if (watch.protocol !== "https:" ||
      !["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(watch.hostname) ||
      (watch.hostname === "youtu.be" ? watch.pathname.slice(1) : watch.searchParams.get("v")) !== videoId) {
    throw new Error("D1 YouTube watch URL does not match its video ID: " + videoId);
  }

  return {
    movie: movie as StoredYouTubeMovie,
    editorialStatus: row.editorial_status,
    canonicalPath,
  };
}

/**
 * Public-safe read. Do not relax the explicit published filter to verified,
 * draft or stale: the importer stages ALL source-verified movies as draft.
 */
export async function getPublishedYouTubeD1Movie(db: YouTubeD1Database, videoId: string) {
  if (!isValidVideoId(videoId)) return null;
  const row = await db.prepare(
    `SELECT payload_json, editorial_status, canonical_path
     FROM content_items
     WHERE pillar = ? AND kind = ? AND slug = ?
       AND canonical_path = ? AND editorial_status = 'published'
     LIMIT 1`,
  ).bind(YOUTUBE_D1_PILLAR, YOUTUBE_D1_KIND, videoId, "/entertainment/youtube/" + videoId)
    .first<ContentRow>();
  return parseRow(row, videoId);
}

/**
 * Read-only internal staging verification (never call from a public route).
 * This can retrieve draft content for data-parity checks but DOES NOT publish it.
 */
export async function inspectStagedYouTubeD1Movie(db: YouTubeD1Database, videoId: string) {
  if (!isValidVideoId(videoId)) return null;
  const row = await db.prepare(
    `SELECT payload_json, editorial_status, canonical_path
     FROM content_items
     WHERE pillar = ? AND kind = ? AND slug = ? AND canonical_path = ?
     LIMIT 1`,
  ).bind(YOUTUBE_D1_PILLAR, YOUTUBE_D1_KIND, videoId, "/entertainment/youtube/" + videoId)
    .first<ContentRow>();
  return parseRow(row, videoId);
}

/** Only aggregated counts. No public endpoint or per-record draft leak. */
export async function getStagedYouTubeD1Counts(db: YouTubeD1Database) {
  const response = await db.prepare(
    `SELECT editorial_status AS status, COUNT(*) AS quantity
     FROM content_items
     WHERE pillar = ? AND kind = ?
     GROUP BY editorial_status`,
  ).bind(YOUTUBE_D1_PILLAR, YOUTUBE_D1_KIND).all<{ status: string; quantity: number }>();
  const byStatus: Record<string, number> = Object.create(null);
  for (const row of response.results) {
    if (!Number.isSafeInteger(row.quantity) || row.quantity < 0) {
      throw new Error("D1 YouTube status-count response was invalid.");
    }
    byStatus[row.status] = row.quantity;
  }
  return byStatus;
}

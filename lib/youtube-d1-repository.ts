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
  // D1's WHERE clause must exclude non-published rows, and this additional
  // check keeps the boundary fail-closed if a mock or adapter violates it.
  if (row && row.editorial_status !== "published") return null;
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

export type YouTubeD1Query = { q?: string; channel?: string; page?: string | number };
const PAGE_SIZE = 48; // Preserve existing directory pagination URLs.

/** Literal unicode words only: users cannot inject FTS operators or SQL. */
export function youtubeD1SearchExpression(value: string) {
  const words = value.trim().slice(0, 200).match(/[\p{L}\p{N}]+/gu) ?? [];
  return words.slice(0, 20).map(word => '"' + word + '"').join(' AND ');
}

/** Shared by the binding reader and the read-only remote parity probe. */
export function youtubeD1QueryPlan(input: YouTubeD1Query, staging = false) {
  const query = (input.q ?? '').trim();
  const channel = (input.channel ?? '').trim();
  if (query.length > 200 || channel.length > 200) throw new Error('D1 YouTube query is too long.');
  const match = youtubeD1SearchExpression(query);
  const from = match
    ? 'content_search JOIN content_items i ON i.id = content_search.rowid'
    : 'content_items i';
  const clauses = ['i.pillar = ?', 'i.kind = ?'];
  const params: SqlParam[] = [YOUTUBE_D1_PILLAR, YOUTUBE_D1_KIND];
  if (!staging) clauses.push("i.editorial_status = 'published'");
  if (match) { clauses.push('content_search MATCH ?'); params.push(match); }
  else if (query) clauses.push('0 = 1');
  if (channel) { clauses.push("json_extract(i.payload_json, '$.channelName') = ?"); params.push(channel); }
  const where = clauses.join(' AND ');
  // Source publish date and unique slug give deterministic page boundaries.
  // A matching order index is a cutover prerequisite if remote metrics demand it.
  const order = match ? 'bm25(content_search), i.published_at DESC, i.slug ASC' : 'i.published_at DESC, i.slug ASC';
  return {
    countSql: `SELECT COUNT(*) AS total FROM ${from} WHERE ${where}`,
    pageSql: `SELECT i.slug, i.payload_json, i.editorial_status, i.canonical_path FROM ${from} WHERE ${where} ORDER BY ${order} LIMIT ? OFFSET ?`,
    params,
    filteredMode: Boolean(query || channel),
  };
}

async function queryYouTubeD1(db: YouTubeD1Database, input: YouTubeD1Query, staging: boolean) {
  const plan = youtubeD1QueryPlan(input, staging);
  const count = await db.prepare(plan.countSql).bind(...plan.params).first<{ total: number }>();
  if (!count || !Number.isSafeInteger(count.total) || count.total < 0) throw new Error('Invalid D1 YouTube total.');
  const pageCount = Math.max(1, Math.ceil(count.total / PAGE_SIZE));
  const requested = Number(input.page ?? 1);
  const page = Math.min(Number.isSafeInteger(requested) && requested > 0 ? requested : 1, pageCount);
  // Avoid arbitrarily deep OFFSET work; capacity beyond this needs cursor pagination.
  if (page > 1000) throw new Error('D1 YouTube page exceeds bounded offset limit.');
  const rows = await db.prepare(plan.pageSql).bind(...plan.params, PAGE_SIZE, (page - 1) * PAGE_SIZE)
    .all<ContentRow & { slug: string }>();
  if (rows.results.length > PAGE_SIZE) throw new Error('D1 YouTube returned an unbounded page.');
  const movies = rows.results.map(row => {
    if (!isValidVideoId(row.slug) || (!staging && row.editorial_status !== 'published')) {
      throw new Error('D1 YouTube publication boundary violated.');
    }
    return parseRow(row, row.slug)!;
  });
  return { movies, total: count.total, page, pageCount, filteredMode: plan.filteredMode };
}

/** Public boundary: draft/verified/stale records never appear in search. */
export function queryPublishedYouTubeD1Movies(db: YouTubeD1Database, input: YouTubeD1Query = {}) {
  return queryYouTubeD1(db, input, false);
}

/** Internal verification only. Never connect this reader to visitor routes. */
export function inspectStagedYouTubeD1Page(db: YouTubeD1Database, input: YouTubeD1Query = {}) {
  return queryYouTubeD1(db, input, true);
}

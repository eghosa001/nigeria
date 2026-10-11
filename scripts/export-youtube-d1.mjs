/**
 * Prepare a reviewed, non-destructive Cloudflare D1 import of the existing
 * source-backed YouTube movie records. This script NEVER connects to a DB.
 *
 * Preview: node scripts/export-youtube-d1.mjs --dry-run
 * Export:  node scripts/export-youtube-d1.mjs --output-dir /tmp/youtube-d1-import
 *
 * The SQL is for an explicitly provisioned, manually migrated CONTENT_DB
 * using cloudflare/d1/content-scale-schema.sql. All rows start as DRAFT:
 * source verification does not make a record an indexable editorial article.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "data/youtube-movies.generated.json");
const DEFAULT_BATCH_SIZE = 40;
const KIND = "youtube-movie";
const PILLAR = "movies_entertainment";

export function sqlString(value) {
  if (value == null) return "NULL";
  const text = String(value);
  if (text.includes("\0")) throw new Error("NUL byte cannot be included in SQLite SQL.");
  return "'" + text.replace(/'/g, "''") + "'";
}

export function validateYouTubeSourceRecord(movie) {
  if (!movie || !/^[A-Za-z0-9_-]{11}$/.test(String(movie.videoId ?? ""))) {
    throw new Error("Invalid YouTube video ID: " + String(movie?.videoId));
  }
  if (!String(movie.title ?? "").trim() || !String(movie.channelName ?? "").trim()) {
    throw new Error("Missing source title/publisher: " + movie.videoId);
  }
  if (!String(movie.lastChecked ?? "").match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error("Missing publisher source-check date: " + movie.videoId);
  }
  let url;
  try { url = new URL(String(movie.videoUrl ?? "")); }
  catch { throw new Error("Invalid official watch URL: " + movie.videoId); }
  if (url.protocol !== "https:" || !["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(url.hostname)) {
    throw new Error("Watch URL is not an HTTPS YouTube address: " + movie.videoId);
  }
  const linkedVideoId = url.hostname === "youtu.be" ? url.pathname.slice(1) : url.searchParams.get("v");
  if (linkedVideoId !== movie.videoId) throw new Error("Watch URL/video ID mismatch: " + movie.videoId);
  if (!Array.isArray(movie.cast) || !Array.isArray(movie.featuredCast)) {
    throw new Error("Invalid cast arrays: " + movie.videoId);
  }
}

function contentSql(movie) {
  const canonical = "/entertainment/youtube/" + movie.videoId;
  const keywords = [...new Set([...movie.cast, movie.channelName].filter(Boolean))].join(" ");
  const fields = [
    sqlString(PILLAR), sqlString(KIND), sqlString(movie.videoId),
    sqlString(canonical), sqlString(movie.title), sqlString(movie.synopsis ?? ""),
    sqlString(keywords), sqlString(JSON.stringify(movie)),
    sqlString("draft"), sqlString(movie.publishedAt ?? null),
    sqlString(movie.lastChecked),
  ];
  const content = `INSERT INTO content_items
(pillar, kind, slug, canonical_path, title, summary, keywords, payload_json,
 editorial_status, published_at, verified_at)
VALUES (${fields.join(", ")})
ON CONFLICT(canonical_path) DO NOTHING;`;

  // Never overwrite an existing editor-approved record or its existing source
  // checks during the initial staging import. Re-running is idempotent.
  const source = `INSERT INTO content_sources
(content_id, source_url, source_name, source_kind, checked_at)
SELECT id, ${sqlString(movie.videoUrl)}, ${sqlString(movie.channelName)}, 'publisher', ${sqlString(movie.lastChecked)}
FROM content_items
WHERE canonical_path = ${sqlString(canonical)}
  AND pillar = ${sqlString(PILLAR)} AND kind = ${sqlString(KIND)}
ON CONFLICT(content_id, source_url) DO NOTHING;`;
  return content + "\n" + source;
}

export function prepareYouTubeD1Import(movies, options = {}) {
  if (!Array.isArray(movies)) throw new Error("Expected a source movie array.");
  const batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;
  if (!Number.isSafeInteger(batchSize) || batchSize < 1 || batchSize > 100) {
    throw new Error("Batch size must be between 1 and 100.");
  }
  const seen = new Set();
  const entries = [];
  for (const movie of movies) {
    validateYouTubeSourceRecord(movie);
    if (seen.has(movie.videoId)) throw new Error("Duplicate YouTube video ID: " + movie.videoId);
    seen.add(movie.videoId);
    entries.push(contentSql(movie));
  }
  const batches = [];
  for (let start = 0; start < entries.length; start += batchSize) {
    batches.push([
      "PRAGMA foreign_keys = ON;",
      "BEGIN TRANSACTION;",
      ...entries.slice(start, start + batchSize),
      "COMMIT;",
      "",
    ].join("\n"));
  }
  return {
    records: entries.length,
    batches,
    batchSize,
    byteCount: batches.reduce((total, sql) => total + Buffer.byteLength(sql), 0),
  };
}

export function exportYouTubeD1Import(movies, outputDir, options = {}) {
  if (!outputDir || typeof outputDir !== "string") throw new Error("An explicit output directory is required.");
  if (fs.existsSync(outputDir) && fs.readdirSync(outputDir).length) {
    throw new Error("Refusing to overwrite nonempty export directory: " + outputDir);
  }
  const prepared = prepareYouTubeD1Import(movies, options);
  fs.mkdirSync(outputDir, { recursive: true });
  const files = [];
  for (let index = 0; index < prepared.batches.length; index++) {
    const name = `part-${String(index + 1).padStart(4, "0")}.sql`;
    const sql = prepared.batches[index];
    fs.writeFileSync(path.join(outputDir, name), sql);
    files.push({ name, bytes: Buffer.byteLength(sql), sha256: crypto.createHash("sha256").update(sql).digest("hex") });
  }
  const manifest = {
    schema: "cloudflare/d1/content-scale-schema.sql",
    pillar: PILLAR, kind: KIND, editorialStatus: "draft",
    recordCount: prepared.records, batchSize: prepared.batchSize,
    batchCount: files.length, sqlBytes: prepared.byteCount, files,
    deployment: "offline-export-only-no-database-connection",
  };
  fs.writeFileSync(path.join(outputDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  return manifest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const dryRun = args.length === 1 && args[0] === "--dry-run";
  const outputOption = args.indexOf("--output-dir");
  if (!dryRun && (outputOption < 0 || args.length !== 2 || outputOption !== 0 || !args[1])) {
    throw new Error("Usage: node scripts/export-youtube-d1.mjs --dry-run | --output-dir PATH");
  }
  const data = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  if (dryRun) {
    const plan = prepareYouTubeD1Import(data.movies);
    console.log(JSON.stringify({
      safeMode: "no-write-no-database", sourceRecords: plan.records,
      batches: plan.batches.length, sqlBytes: plan.byteCount,
      sourceGeneratedAt: data.generatedAt, editorialStatus: "draft",
    }, null, 2));
  } else {
    const manifest = exportYouTubeD1Import(data.movies, path.resolve(args[1]));
    console.log(JSON.stringify({ ...manifest, files: manifest.files.length }, null, 2));
  }
}

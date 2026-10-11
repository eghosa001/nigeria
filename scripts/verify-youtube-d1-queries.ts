/** Read-only remote verification of the exact owner-authorized staging DB. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { inspectStagedYouTubeD1Page, queryPublishedYouTubeD1Movies,
  inspectStagedYouTubeD1Movie, youtubeD1QueryPlan, type YouTubeD1Database } from '../lib/youtube-d1-repository';
import { queryYouTubeDirectory } from '../lib/youtube-directory-query';

const databaseId = '47fdffad-9513-484f-94be-4b176662cc71';
const databaseName = 'mynigeriaguide-content-staging';
const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;
if (!account || !token) throw new Error('Staging verification requires Cloudflare credentials in the runner environment.');
const config = JSON.parse(fs.readFileSync('wrangler.d1-staging.jsonc', 'utf8'));
assert.equal(config.d1_databases[0].database_id, databaseId);
assert.equal(config.d1_databases[0].database_name, databaseName);
const api = `https://api.cloudflare.com/client/v4/accounts/${account}/d1/database/${databaseId}`;
async function request(suffix = '', body?: object) {
  const response = await fetch(api + suffix, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(30000),
  });
  const value = await response.json() as { success: boolean; result: any };
  if (!response.ok || !value.success) throw new Error(`Staging D1 request failed: HTTP ${response.status}`);
  return value.result;
}
const identity = await request();
assert.equal(identity.uuid, databaseId);
assert.equal(identity.name, databaseName);

const metrics: Array<{ query: string; rowsRead: number; durationMs: number; wallMs: number }> = [];
const remote: YouTubeD1Database = {
  prepare(sql) {
    // SQL is generated internally; this probe cannot execute DDL/imports/writes.
    if (!/^\s*(SELECT|EXPLAIN QUERY PLAN SELECT)\b/.test(sql)) throw new Error('Read-only SQL required.');
    return { bind(...params) {
      async function execute() {
        const started = performance.now();
        const [result] = await request('/query', { sql, params });
        if (!result?.success || !Array.isArray(result.results)) throw new Error('Invalid staging D1 query response.');
        assert.ok(Number.isFinite(result.meta?.rows_read) && Number.isFinite(result.meta?.duration), 'Missing D1 query metrics');
        metrics.push({ query: sql, rowsRead: result.meta?.rows_read, durationMs: result.meta?.duration,
          wallMs: performance.now() - started });
        return result.results;
      }
      return { async first<T extends object>(): Promise<T | null> { return ((await execute())[0] ?? null) as T | null; },
        async all<T extends object>() { return { results: await execute() as T[] }; } };
    } };
  },
};
const source = JSON.parse(fs.readFileSync('data/youtube-movies.generated.json', 'utf8')).movies;
const expected = new Map<string, any>(source.map((movie: any) => [movie.videoId, movie]));
const sqlite = new DatabaseSync(':memory:');
try {
  sqlite.exec(fs.readFileSync('cloudflare/d1/content-scale-schema.sql', 'utf8'));
  const insert = sqlite.prepare(`INSERT INTO content_items
    (pillar,kind,slug,canonical_path,title,summary,keywords,payload_json,editorial_status,published_at)
    VALUES ('movies_entertainment','youtube-movie',?,?,?,?,?,?,'draft',?)`);
  for (const movie of source) insert.run(movie.videoId, '/entertainment/youtube/' + movie.videoId,
    movie.title, movie.synopsis ?? '', [...new Set([...movie.cast, movie.channelName].filter(Boolean))].join(' '),
    JSON.stringify(movie), movie.publishedAt);
  const local: YouTubeD1Database = { prepare(sql) { return { bind(...params) { return {
    async first<T extends object>() { return (sqlite.prepare(sql).get(...params) ?? null) as T | null; },
    async all<T extends object>() { return { results: sqlite.prepare(sql).all(...params) as T[] }; },
  }; } }; } };

  // Read each raw source and publisher source once, in bounded indexed ID pages.
  let cursor = 0;
  const seen = new Set<string>();
  const statusCounts: Record<string, number> = {};
  while (true) {
    const result = await remote.prepare(`SELECT i.id, i.slug, i.canonical_path, i.payload_json,
      i.editorial_status, s.source_url, s.source_name, s.checked_at
      FROM content_items i JOIN content_sources s ON s.content_id = i.id AND s.source_kind = 'publisher'
      AND s.source_url = json_extract(i.payload_json, '$.videoUrl')
      WHERE i.pillar = 'movies_entertainment' AND i.kind = 'youtube-movie' AND i.id > ?
      ORDER BY i.id LIMIT 100`).bind(cursor).all<any>();
    if (!result.results.length) break;
    for (const row of result.results) {
      const movie = expected.get(row.slug);
      assert.ok(movie, `Unexpected staging source ${row.slug}`);
      assert.ok(!seen.has(row.slug), `Duplicate staging source ${row.slug}`);
      assert.deepEqual(JSON.parse(row.payload_json), movie);
      assert.equal(row.canonical_path, '/entertainment/youtube/' + movie.videoId);
      assert.equal(row.source_url, movie.videoUrl);
      assert.equal(row.source_name, movie.channelName);
      assert.equal(row.checked_at, movie.lastChecked);
      statusCounts[row.editorial_status] = (statusCounts[row.editorial_status] ?? 0) + 1;
      seen.add(row.slug);
      cursor = row.id;
    }
  }
  assert.equal(seen.size, expected.size);
  const detail = await inspectStagedYouTubeD1Movie(remote, source[0].videoId);
  assert.deepEqual(detail?.movie, source[0]);
  const comparisons = [];
  const samples = [{}, { page: 2 }, { page: 999 }, { q: 'love' }, { q: 'Ruth Kadiri' },
    { channel: source[0].channelName }, { q: 'zzzznomovie' }, { q: '" OR * : NEAR(' }];
  for (const input of samples) {
    const actual = await inspectStagedYouTubeD1Page(remote, input);
    const oracle = await inspectStagedYouTubeD1Page(local, input);
    assert.deepEqual(actual.movies.map(r => r.movie.videoId), oracle.movies.map(r => r.movie.videoId));
    assert.equal(actual.total, oracle.total);
    const legacy = queryYouTubeDirectory(input);
    comparisons.push({ input, d1Total: actual.total, staticTotal: legacy.total,
      staticPageMatches: JSON.stringify(actual.movies.map(r => r.movie.videoId)) === JSON.stringify(legacy.movies.map(r => r.videoId)) });
  }
  const publicPage = await queryPublishedYouTubeD1Movies(remote);
  assert.equal(publicPage.total, statusCounts.published ?? 0);
  const plans = [];
  for (const input of [{}, { q: 'love' }]) {
    const plan = youtubeD1QueryPlan(input, true);
    plans.push({ input, plan: (await remote.prepare('EXPLAIN QUERY PLAN ' + plan.pageSql)
      .bind(...plan.params, ...(plan.orderParams ?? []), 48, 0).all()).results });
  }
  const report = { databaseId, databaseName, sourceParity: seen.size, statusCounts, comparisons, plans, metrics,
    productionEnabled: false,
    cutoverReady: false,
    blockers: ['Separate production binding and approval', 'Editorial publication and curated/alternate-source parity',
      'FTS word matching/ranking differs from legacy substring matching', 'Review query plans/rows-read at target scale before cutover'] };
  fs.mkdirSync('work', { recursive: true });
  fs.writeFileSync('work/youtube-d1-query-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ sourceParity: seen.size, statusCounts, comparisons, plans,
    measuredQueries: metrics.length, maxRowsRead: Math.max(...metrics.map(m => m.rowsRead)),
    maxSqlDurationMs: Math.max(...metrics.map(m => m.durationMs)), productionEnabled: false }, null, 2));
} finally { sqlite.close(); }

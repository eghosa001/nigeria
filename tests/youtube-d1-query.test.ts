import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import { queryPublishedYouTubeD1Movies, inspectStagedYouTubeD1Page } from '../lib/youtube-d1-repository';

test('real SQLite FTS, pagination and publication boundary', async () => {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(fs.readFileSync('cloudflare/d1/content-scale-schema.sql', 'utf8'));
  const insert = sqlite.prepare(`INSERT INTO content_items
    (pillar,kind,slug,canonical_path,title,keywords,payload_json,editorial_status,published_at)
    VALUES ('movies_entertainment','youtube-movie',?,?,?,?,?,?,?)`);
  const excluded = ['draft', 'verified', 'stale', 'expired', 'archived'];
  for (let n = 0; n < 57; n++) {
    const videoId = String(n).padStart(11, '0');
    const movie = { videoId, title: 'Love Story ' + n, channelName: 'Publisher',
      videoUrl: 'https://www.youtube.com/watch?v=' + videoId,
      publishedAt: '2026-10-11', lastChecked: '2026-10-11', cast: ['Actor One'], featuredCast: ['Actor One'] };
    insert.run(videoId, '/entertainment/youtube/' + videoId, movie.title,
      'Publisher Actor One', JSON.stringify(movie), n >= 52 ? excluded[n - 52] : 'published', movie.publishedAt);
  }
  const db = { prepare(sql: string) { return { bind(...args: (string | number | null)[]) { return {
    async first<T extends object>() { return (sqlite.prepare(sql).get(...args) ?? null) as T | null; },
    async all<T extends object>() { return { results: sqlite.prepare(sql).all(...args) as T[] }; },
  }; } }; } };
  try {
    const first = await queryPublishedYouTubeD1Movies(db, { q: 'love' });
    const last = await queryPublishedYouTubeD1Movies(db, { q: 'love', page: 99 });
    assert.equal(first.total, 52);
    assert.equal(first.movies.length, 48);
    assert.equal(last.movies.length, 4);
    assert.equal(last.page, 2);
    assert.equal(new Set([...first.movies, ...last.movies].map(r => r.movie.videoId)).size, 52);
    assert.equal((await queryPublishedYouTubeD1Movies(db, { q: 'Actor One', channel: 'Publisher' })).total, 52);
    assert.equal((await queryPublishedYouTubeD1Movies(db, { channel: "Publisher' OR 1=1--" })).total, 0);
    assert.equal((await queryPublishedYouTubeD1Movies(db, { q: '" OR * : NEAR(' })).total, 0);
    assert.equal((await inspectStagedYouTubeD1Page(db, {})).total, 57);
    assert.equal((await queryPublishedYouTubeD1Movies(db, { page: Infinity })).page, 1);
    assert.equal((await queryPublishedYouTubeD1Movies(db, { page: 1.5 })).page, 1);
  } finally { sqlite.close(); }
});

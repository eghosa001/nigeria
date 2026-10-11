import assert from 'node:assert/strict';
import { test } from 'node:test';
import { youtubeServerStore, createYouTubeServerStore } from '../lib/youtube-server-store';
import { queryYouTubeDirectory } from '../lib/youtube-directory-query';
import { getYouTubeCatalogPage } from '../lib/youtube-pagination';
import { getYouTubeDetailMovieById, isIndexableYouTubeDetailMovie } from '../lib/youtube-detail';
import fs from 'node:fs';

test('public default preserves directory, pagination and detail metadata inputs', async () => {
  for (const input of [{}, { q: 'love' }, { q: 'ruth', page: 2 }, { channel: 'Unknown publisher' }]) {
    assert.deepEqual(await youtubeServerStore.query(input), queryYouTubeDirectory(input));
  }
  for (const page of [1, 2, 999, 1.5]) {
    assert.deepEqual(await youtubeServerStore.catalogPage(page), getYouTubeCatalogPage(page));
  }
  for (const movie of queryYouTubeDirectory().movies.slice(0, 3)) {
    const before = await getYouTubeDetailMovieById(movie.videoId);
    const after = await youtubeServerStore.detail(movie.videoId);
    assert.deepEqual(after, before);
    assert.equal(isIndexableYouTubeDetailMovie(after!), isIndexableYouTubeDetailMovie(before!));
  }
});

test('D1 misses and failures never resurrect unpublished static records', async () => {
  const empty = { prepare() { return { bind() { return {
    async first<T extends object>() { return null as T | null; },
    async all<T extends object>() { return { results: [] as T[] }; },
  }; } }; } };
  const store = createYouTubeServerStore({ mode: 'd1', db: empty });
  assert.equal(await store.detail('00000000000'), undefined);
  assert.equal(await store.catalogPage(-1), null);
  const broken = createYouTubeServerStore({ mode: 'd1', db: { prepare() { throw new Error('unavailable'); } } });
  await assert.rejects(broken.query(), /unavailable/);
  await assert.rejects(broken.detail('00000000000'), /unavailable/);
});

test('published D1 detail retains normalization and existing noindex decisions', async () => {
  const { normalizeGenerated, getCuratedMovie } = await import('../lib/youtube-detail');
  const source = JSON.parse(fs.readFileSync('data/youtube-movies.generated.json', 'utf8')).movies;
  const raw = source.find((movie: any) => !getCuratedMovie(movie.videoId) && movie.cast.length && movie.featuredCast.length);
  assert.ok(raw);
  const db = { prepare() { return { bind() { return {
    async first<T extends object>(): Promise<T | null> { return {
      payload_json: JSON.stringify(raw), editorial_status: 'published',
      canonical_path: '/entertainment/youtube/' + raw.videoId,
    } as T; },
    async all<T extends object>() { return { results: [] as T[] }; },
  }; } }; } };
  const result = await createYouTubeServerStore({ mode: 'd1', db }).detail(raw.videoId);
  assert.deepEqual(result, normalizeGenerated(raw));
  assert.equal(isIndexableYouTubeDetailMovie(result!), isIndexableYouTubeDetailMovie(normalizeGenerated(raw)));
});

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


test('published D1 directory and detail discard uploader promotions without hiding films', async () => {
  const badDescriptions = [
    ['0ujEzReLcP8', 'LOVE SO COLD', 'OrjiTv',
      'And if you are a subscriber, please turn on NOTIFICATIONS by clicking the bell symbol to get updates on our new videos uploaded.'],
    ['-0i2iEvMtgI', 'PREGNANT FOR MY MOTHER IN-LAW', 'IfyEze Nolly tv',
      'IFYEZE NOLLY TV PRODUCES BEST NOLLYWOOD MOVIES THAT ENTERTAINS AND EDUCATES ABOUT LIFE, MARRIAGE/RELATIONSHIP AND THE REAL AFRICAN CULTURE.'],
    ['mBl5wdukWjs', 'THE CARETAKER', 'Mercyjohnsonokojie TV',
      'On this channel, you will enjoy the best of Nollywood movies, emotional African stories, romantic love dramas, and powerful performances.'],
  ] as const;
  for (const [videoId, title, channelName, synopsis] of badDescriptions) {
    const movie = {
      videoId, title, rawTitle: title, synopsis, channelName,
      cast: ['Example Performer'], featuredCast: ['Example Performer'],
      publishedAt: '2026-10-10T12:00:00.000Z', lastChecked: '2026-10-14',
      year: 2026, durationMinutes: 96,
      videoUrl: 'https://www.youtube.com/watch?v=' + videoId,
      metadataStatus: 'complete',
    };
    const record = {
      slug: videoId, payload_json: JSON.stringify(movie),
      editorial_status: 'published', canonical_path: '/entertainment/youtube/' + videoId,
    };
    const db = {
      prepare(sql: string) {
        return {
          bind(..._args: Array<string | number | null>) {
            return {
              async first<T extends object>(): Promise<T | null> {
                return (sql.includes('COUNT(*)') ? { total: 1 } : record) as T;
              },
              async all<T extends object>() {
                return { results: [record as T] };
              },
            };
          },
        };
      },
    };
    const store = createYouTubeServerStore({ mode: 'd1', db });
    const listing = await store.query();
    assert.equal(listing.total, 1, videoId);
    const displayed = listing.movies[0];
    assert.match(displayed.synopsis, /is a full-length Nigerian film published by/i, videoId);
    assert.ok(!displayed.synopsis.includes(synopsis), videoId);
    assert.equal(isIndexableYouTubeDetailMovie(displayed), false, videoId);
    const detail = await store.detail(videoId);
    assert.ok(detail, videoId);
    assert.equal(detail.synopsis, displayed.synopsis, videoId);
    assert.equal(isIndexableYouTubeDetailMovie(detail), false, videoId);
  }
});

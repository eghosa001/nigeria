/** Server data boundary. No staging binding or credentials enter public routes. */
import { queryPublishedYouTubeD1Movies, getPublishedYouTubeD1Movie,
  type YouTubeD1Database, type YouTubeD1Query, type YouTubeD1Record } from './youtube-d1-repository';
import type { YouTubeDetailMovie } from './youtube-detail';

function renderable(record: YouTubeD1Record) {
  const movie = record.movie;
  if (typeof movie.rawTitle !== 'string' || typeof movie.synopsis !== 'string' ||
      typeof movie.year !== 'number' || !Number.isFinite(movie.year) ||
      typeof movie.durationMinutes !== 'number' || !Number.isFinite(movie.durationMinutes) ||
      movie.durationMinutes < 0 || !movie.cast.length || !movie.featuredCast.length ||
      (movie.metadataStatus !== undefined && movie.metadataStatus !== 'complete')) {
    throw new Error('D1 YouTube record is not ready for rendering.');
  }
  return movie as unknown as Omit<YouTubeDetailMovie, 'source' | 'internalHref' | 'alternateSources'>;
}

/**
 * Inject a real binding explicitly for staging validation or an approved future
 * cutover. Missing/unpublished D1 records fail closed: never resurrect them via
 * a static fallback. The default static adapter preserves today's exact output.
 */
export function createYouTubeServerStore(options:
  { mode: 'static' } | { mode: 'd1'; db: YouTubeD1Database } | { mode: 'runtime' }) {
  async function database() {
    if (options.mode === 'd1') return options.db;
    if (options.mode !== 'runtime') return null;
    if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PHASE === 'phase-production-build') return null;
    try {
      const workers = await import('cloudflare:workers');
      const runtimeEnv = workers.env as { CONTENT_DB?: YouTubeD1Database; YOUTUBE_D1_CUTOVER?: string };
      if (runtimeEnv.YOUTUBE_D1_CUTOVER !== 'enabled') return null;
      const db = runtimeEnv.CONTENT_DB;
      if (!db) throw new Error('CONTENT_DB binding is unavailable during the production cutover.');
      return db;
    } catch (error) {
      throw error;
    }
  }
  return {
    async query(input: YouTubeD1Query = {}) {
      const db = await database();
      if (!db) {
        return (await import('./youtube-directory-query')).queryYouTubeDirectory(input);
      }
      const result = await queryPublishedYouTubeD1Movies(db, input);
      const { normalizeGenerated, getCuratedMovie } = await import('./youtube-detail');
      return { ...result, movies: result.movies.map(record =>
        getCuratedMovie(record.movie.videoId) ?? normalizeGenerated(renderable(record))) };
    },
    async catalogPage(page: number) {
      const db = await database();
      if (!db) return (await import('./youtube-pagination')).getYouTubeCatalogPage(page);
      if (!Number.isSafeInteger(page) || page < 1 || page > 1000) return null;
      const result = await this.query({ page });
      return page > result.pageCount ? null : result;
    },
    async detail(videoId: string) {
      const { getYouTubeDetailMovieById, getCuratedMovie, normalizeGenerated } = await import('./youtube-detail');
      const db = await database();
      if (!db) return getYouTubeDetailMovieById(videoId);
      const curated = getCuratedMovie(videoId);
      if (curated) return curated;
      const record = await getPublishedYouTubeD1Movie(db, videoId);
      return record ? normalizeGenerated(renderable(record)) : undefined;
    },
  };
}

// Production Workers use the exact CONTENT_DB binding only when the explicit
// YOUTUBE_D1_CUTOVER variable is enabled. Local/test environments stay static.
export const youtubeServerStore = createYouTubeServerStore({ mode: 'runtime' });

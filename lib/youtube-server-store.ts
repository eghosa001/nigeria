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
  { mode: 'static' } | { mode: 'd1'; db: YouTubeD1Database }) {
  return {
    async query(input: YouTubeD1Query = {}) {
      if (options.mode === 'static') {
        return (await import('./youtube-directory-query')).queryYouTubeDirectory(input);
      }
      const result = await queryPublishedYouTubeD1Movies(options.db, input);
      const { normalizeGenerated, getCuratedMovie } = await import('./youtube-detail');
      return { ...result, movies: result.movies.map(record =>
        getCuratedMovie(record.movie.videoId) ?? normalizeGenerated(renderable(record))) };
    },
    async catalogPage(page: number) {
      if (options.mode === 'static') return (await import('./youtube-pagination')).getYouTubeCatalogPage(page);
      if (!Number.isSafeInteger(page) || page < 1 || page > 1000) return null;
      const result = await this.query({ page });
      return page > result.pageCount ? null : result;
    },
    async detail(videoId: string) {
      const { getYouTubeDetailMovieById, getCuratedMovie, normalizeGenerated } = await import('./youtube-detail');
      if (options.mode === 'static') return getYouTubeDetailMovieById(videoId);
      const curated = getCuratedMovie(videoId);
      if (curated) return curated;
      const record = await getPublishedYouTubeD1Movie(options.db, videoId);
      return record ? normalizeGenerated(renderable(record)) : undefined;
    },
  };
}

// Deliberately no env lookup, fallback to DB, or staging->production switch.
// Wire CONTENT_DB only in a separately reviewed cutover after remote parity,
// search semantics, curated overlays, related/alternate sources and cache checks.
export const youtubeServerStore = createYouTubeServerStore({ mode: 'static' });

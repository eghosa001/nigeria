import {
  discoverableYouTubeMovies,
  type YouTubeMovieRecord,
} from "@/lib/youtube-library";
import { YOUTUBE_CATALOG_PAGE_SIZE } from "@/lib/youtube-config";

/**
 * Indexed, read-only query adapter for the public YouTube movie directory.
 * The underlying checked-in catalog is immutable during a Worker lifetime.
 * Keep paging on the server: never ship the full source catalog to the client.
 */
const publishers = new Map<string, YouTubeMovieRecord[]>();
for (const movie of discoverableYouTubeMovies) {
  const group = publishers.get(movie.channelName) ?? [];
  group.push(movie);
  publishers.set(movie.channelName, group);
}

export const youtubePublisherOptions = [...publishers.keys()].sort((a, b) => a.localeCompare(b));

type PreparedMovie = { title: string; searchable: string };
const preparedMovies = new WeakMap<YouTubeMovieRecord, PreparedMovie>();

function prepare(movie: YouTubeMovieRecord): PreparedMovie {
  const existing = preparedMovies.get(movie);
  if (existing) return existing;
  const result = {
    title: movie.title.toLowerCase(),
    searchable: [movie.title, movie.synopsis, ...movie.cast, movie.channelName].join(" ").toLowerCase(),
  };
  preparedMovies.set(movie, result);
  return result;
}

function titleRank(title: string, query: string) {
  return title === query ? 3 : title.startsWith(query) ? 2 : title.includes(query) ? 1 : 0;
}

export type YouTubeDirectoryQuery = {
  q?: string;
  channel?: string;
  page?: string | number;
};

export function queryYouTubeDirectory(input: YouTubeDirectoryQuery = {}) {
  const query = (input.q ?? "").trim().toLowerCase();
  const channel = (input.channel ?? "").trim();
  // Match existing page parsing/clamping for route and filter URL compatibility.
  const requestedPage = Math.max(1, Number(input.page ?? "1") || 1);
  const filteredMode = Boolean(query || channel);

  // The source catalog is already sorted by publishedAt descending with
  // alphabetical tie-breaking. Filtering preserves that order. Only queries
  // with text relevance need an extra ranking sort.
  const candidates = channel ? (publishers.get(channel) ?? []) : discoverableYouTubeMovies;
  const filtered = !query ? candidates : candidates
    .filter((movie) => prepare(movie).searchable.includes(query))
    .sort((a, b) =>
      titleRank(prepare(b).title, query) - titleRank(prepare(a).title, query) ||
      b.publishedAt.localeCompare(a.publishedAt),
    );

  const pageCount = Math.max(1, Math.ceil(filtered.length / YOUTUBE_CATALOG_PAGE_SIZE));
  const page = Math.min(requestedPage, pageCount);
  const start = (page - 1) * YOUTUBE_CATALOG_PAGE_SIZE;

  return {
    movies: filtered.slice(start, start + YOUTUBE_CATALOG_PAGE_SIZE),
    total: filtered.length,
    page,
    pageCount,
    filteredMode,
  };
}

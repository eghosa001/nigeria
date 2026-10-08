import { isIndexableYouTubeMovie, youtubeMovieLibrary, type YouTubeMovieRecord } from "@/lib/youtube-library";
import {
  getVerifiedYouTubeMovieChannelByName,
  type VerifiedYouTubeMovieChannel,
} from "@/lib/youtube-movie-channels";

export const MIN_INDEXABLE_YOUTUBE_CHANNEL_MOVIES = 10;

export type YouTubeChannelHub = {
  channel: VerifiedYouTubeMovieChannel;
  movies: YouTubeMovieRecord[];
  movieCount: number;
  substantiveMovieCount: number;
  latestPublishedAt: string;
  latestChecked: string;
  years: number[];
  recurringCast: { name: string; count: number }[];
};

function buildHub(channel: VerifiedYouTubeMovieChannel, movies: YouTubeMovieRecord[]): YouTubeChannelHub {
  const sorted = [...movies].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const castCounts = new Map<string, number>();

  for (const movie of sorted) {
    for (const name of new Set(movie.cast.map((item) => item.trim()).filter(Boolean))) {
      castCounts.set(name, (castCounts.get(name) ?? 0) + 1);
    }
  }

  return {
    channel,
    movies: sorted,
    movieCount: sorted.length,
    substantiveMovieCount: sorted.filter(isIndexableYouTubeMovie).length,
    latestPublishedAt: sorted[0]?.publishedAt ?? "",
    latestChecked: sorted.reduce((latest, movie) => movie.lastChecked > latest ? movie.lastChecked : latest, ""),
    years: [...new Set(sorted.map((movie) => movie.year))].sort((a, b) => b - a),
    recurringCast: [...castCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, 10),
  };
}

const grouped = new Map<string, { channel: VerifiedYouTubeMovieChannel; movies: YouTubeMovieRecord[] }>();

for (const movie of youtubeMovieLibrary) {
  const channel = getVerifiedYouTubeMovieChannelByName(movie.channelName);
  if (!channel) continue;

  const existing = grouped.get(channel.slug) ?? { channel, movies: [] };
  existing.movies.push(movie);
  grouped.set(channel.slug, existing);
}

export const indexableYouTubeChannelHubs: YouTubeChannelHub[] = [...grouped.values()]
  .map(({ channel, movies }) => buildHub(channel, movies))
  .filter((hub) => hub.movieCount >= MIN_INDEXABLE_YOUTUBE_CHANNEL_MOVIES)
  .sort((a, b) => b.movieCount - a.movieCount || a.channel.name.localeCompare(b.channel.name));

// Large lists of identical publisher/cast blurbs are valuable for discovery,
// not enough to justify indexing another publisher SEO landing page.
export function isIndexableYouTubeChannelHub(hub: YouTubeChannelHub) {
  return hub.movieCount >= MIN_INDEXABLE_YOUTUBE_CHANNEL_MOVIES && hub.substantiveMovieCount >= 3;
}

export function getYouTubeChannelHub(slug: string) {
  return indexableYouTubeChannelHubs.find((hub) => hub.channel.slug === slug);
}

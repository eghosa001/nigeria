import sourceRegistry from "@/data/youtube-movie-sources.json";
import channelCache from "@/data/youtube-channel-cache.json";

export type VerifiedYouTubeMovieChannel = {
  slug: string;
  name: string;
  aliases: string[];
  estimatedMovieCount: number;
  channelUrl?: string;
  channelId?: string;
  verificationBasis: string;
  lastChecked: string;
};

type CachedChannel = {
  channelId: string;
  channelTitle: string;
  channelUrl: string;
  customUrl?: string;
  resolvedAt: string;
};

const cache = channelCache as Record<string, CachedChannel>;

export const verifiedYouTubeMovieChannels: VerifiedYouTubeMovieChannel[] = sourceRegistry.sources.map((source) => {
  const resolved = cache[source.slug];
  return {
    slug: source.slug,
    name: source.searchName,
    aliases: source.aliases,
    estimatedMovieCount: source.estimatedMovieCount,
    channelUrl: resolved?.channelUrl ?? source.knownUrl,
    channelId: resolved?.channelId,
    verificationBasis: resolved
      ? "Resolved against the official YouTube Data API and matched to the approved channel identity."
      : "Editorially approved source; the bulk importer must resolve an exact channel-title match through the official YouTube Data API before ingesting videos.",
    lastChecked: resolved?.resolvedAt?.slice(0, 10) ?? sourceRegistry.checkedAt,
  };
});

export const approvedYouTubeSourceCapacity = verifiedYouTubeMovieChannels.reduce(
  (sum, channel) => sum + channel.estimatedMovieCount,
  0,
);

function normalizePublisherName(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function isApprovedYouTubeMoviePublisher(name?: string) {
  if (!name) return false;
  const normalized = normalizePublisherName(name);
  return sourceRegistry.sources.some((source) =>
    source.aliases.some((alias) => normalizePublisherName(alias) === normalized),
  );
}

export function getVerifiedYouTubeMovieChannelBySlug(slug: string) {
  return verifiedYouTubeMovieChannels.find((channel) => channel.slug === slug);
}

export function getVerifiedYouTubeMovieChannelByName(name?: string) {
  if (!name) return undefined;
  const normalized = normalizePublisherName(name);
  return verifiedYouTubeMovieChannels.find((channel) =>
    channel.aliases.some((alias) => normalizePublisherName(alias) === normalized),
  );
}

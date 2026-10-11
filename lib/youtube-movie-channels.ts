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

// Channel names are checked for every catalog candidate. Normalize approved
// aliases once instead of repeating a nested registry scan for each movie.
const approvedPublisherNames = new Set(
  sourceRegistry.sources.flatMap((source) => source.aliases.map(normalizePublisherName)),
);
const channelsBySlug = new Map<string, VerifiedYouTubeMovieChannel>();
const channelsByAlias = new Map<string, VerifiedYouTubeMovieChannel>();

for (const channel of verifiedYouTubeMovieChannels) {
  // Preserve the first channel for duplicate aliases or slugs, matching find().
  if (!channelsBySlug.has(channel.slug)) channelsBySlug.set(channel.slug, channel);
  for (const alias of channel.aliases) {
    const name = normalizePublisherName(alias);
    if (!channelsByAlias.has(name)) channelsByAlias.set(name, channel);
  }
}

export function isApprovedYouTubeMoviePublisher(name?: string) {
  return Boolean(name && approvedPublisherNames.has(normalizePublisherName(name)));
}

export function getVerifiedYouTubeMovieChannelBySlug(slug: string) {
  return channelsBySlug.get(slug);
}

export function getVerifiedYouTubeMovieChannelByName(name?: string) {
  return name ? channelsByAlias.get(normalizePublisherName(name)) : undefined;
}

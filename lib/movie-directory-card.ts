import type { EntertainmentTitle, WatchLink } from "@/lib/entertainment";

/** Minimum verified video fields for artwork previews and platform badges. */
export type MoviePreviewWatchLink = Pick<
  WatchLink,
  "platform" | "access" | "href" | "lastChecked" | "publisher"
>;

/** Public, browser-visible card data — not full editorial source records.
 * All searchable fields remain on the server for accurate query ranking.
 * Full citations, access notes and publisher links remain on film detail pages.
 */
export type MovieDirectoryCard = Pick<
  EntertainmentTitle,
  | "slug" | "title" | "year" | "genres" | "languages" | "synopsis"
  | "cast" | "featuredCast" | "runtimeMinutes"
  | "artwork" | "sourcePreview" | "trailer"
> & { watchLinks: MoviePreviewWatchLink[] };

export function toMovieDirectoryCard(title: EntertainmentTitle): MovieDirectoryCard {
  return {
    slug: title.slug,
    title: title.title,
    year: title.year,
    genres: title.genres,
    languages: title.languages,
    synopsis: title.synopsis,
    cast: title.cast,
    featuredCast: title.featuredCast,
    runtimeMinutes: title.runtimeMinutes,
    artwork: title.artwork,
    sourcePreview: title.sourcePreview,
    trailer: title.trailer,
    watchLinks: title.watchLinks.map((link) => ({
      platform: link.platform,
      access: link.access,
      href: link.href,
      lastChecked: link.lastChecked,
      publisher: link.publisher,
    })),
  };
}

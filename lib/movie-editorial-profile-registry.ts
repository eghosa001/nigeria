import { movieEditorialProfiles, type MovieEditorialProfile } from "@/lib/movie-editorial-profiles";
import { movieEditorialProfilesWave2 } from "@/lib/movie-editorial-profiles-wave2";
import { movieEditorialProfilesWave3 } from "@/lib/movie-editorial-profiles-wave3";
import { netflixEditorialProfilesClassic } from "@/lib/movie-editorial-profiles-netflix-classic";
import { netflixEditorialProfilesEstablished } from "@/lib/movie-editorial-profiles-netflix-established";
import { netflixEditorialProfilesRecent } from "@/lib/movie-editorial-profiles-netflix-recent";
import { featuredEditorialProfiles } from "@/lib/movie-editorial-profiles-featured";
import { movieEditorialProfilesStreamingA } from "@/lib/movie-editorial-profiles-streaming-a";
import { movieEditorialProfilesStreamingB } from "@/lib/movie-editorial-profiles-streaming-b";

// Explicitly authored, per-film profiles. Do not fill missing fields with
// fabricated roles, fake premiere dates, or generic SEO paragraphs.
// Duplicate IDs are checked by the change-scoped premium-guide quality gate.
export const movieEditorialCollections: Record<string, MovieEditorialProfile>[] = [
  movieEditorialProfiles,
  movieEditorialProfilesWave2,
  movieEditorialProfilesWave3,
  netflixEditorialProfilesClassic,
  netflixEditorialProfilesEstablished,
  netflixEditorialProfilesRecent,
  featuredEditorialProfiles,
  movieEditorialProfilesStreamingA,
  movieEditorialProfilesStreamingB,
];

export const allMovieEditorialProfiles: Record<string, MovieEditorialProfile> =
  Object.assign({}, ...movieEditorialCollections);

export function getMovieEditorialProfile(slug: string): MovieEditorialProfile | undefined {
  return allMovieEditorialProfiles[slug];
}

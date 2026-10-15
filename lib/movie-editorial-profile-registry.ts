import { distinctLongEnoughEditorialProfiles } from "@/lib/movie-editorial-profiles-long-enough-2026-10-15";
import { individualMovieEditorialOctober20261014 } from "@/lib/movie-editorial-profiles-individual-2026-10-14";
import { psychologicalThrillerEditorialOctober20261013 } from "@/lib/movie-editorial-profiles-thriller-2026-10-13";
import { movieEditorialProfilesOctober20261013 } from "@/lib/movie-editorial-profiles-october-2026-10-13";
import { movieEditorialProfiles, type MovieEditorialProfile } from "@/lib/movie-editorial-profiles";
import { movieEditorialProfilesWave2 } from "@/lib/movie-editorial-profiles-wave2";
import { movieEditorialProfilesWave3 } from "@/lib/movie-editorial-profiles-wave3";
import { netflixEditorialProfilesClassic } from "@/lib/movie-editorial-profiles-netflix-classic";
import { netflixEditorialProfilesEstablished } from "@/lib/movie-editorial-profiles-netflix-established";
import { netflixEditorialProfilesRecent } from "@/lib/movie-editorial-profiles-netflix-recent";
import { featuredEditorialProfiles } from "@/lib/movie-editorial-profiles-featured";
import { movieEditorialProfilesStreamingA } from "@/lib/movie-editorial-profiles-streaming-a";
import { movieEditorialProfilesStreamingB } from "@/lib/movie-editorial-profiles-streaming-b";
import { movieEditorialProfilesRemainingA } from "@/lib/movie-editorial-profiles-remaining-a";
import { movieEditorialProfilesRemainingB } from "@/lib/movie-editorial-profiles-remaining-b";

// Explicitly authored, per-film profiles. Do not fill missing fields with
// fabricated roles, fake premiere dates, or generic SEO paragraphs.
// Duplicate IDs are checked by the change-scoped premium-guide quality gate.
export const movieEditorialCollections: Record<string, MovieEditorialProfile>[] = [
  distinctLongEnoughEditorialProfiles,
  individualMovieEditorialOctober20261014,
  psychologicalThrillerEditorialOctober20261013,
  movieEditorialProfilesOctober20261013,
  movieEditorialProfiles,
  movieEditorialProfilesWave2,
  movieEditorialProfilesWave3,
  netflixEditorialProfilesClassic,
  netflixEditorialProfilesEstablished,
  netflixEditorialProfilesRecent,
  featuredEditorialProfiles,
  movieEditorialProfilesStreamingA,
  movieEditorialProfilesStreamingB,
  movieEditorialProfilesRemainingA,
  movieEditorialProfilesRemainingB,
];

export const allMovieEditorialProfiles: Record<string, MovieEditorialProfile> =
  Object.assign({}, ...movieEditorialCollections);

export function getMovieEditorialProfile(slug: string): MovieEditorialProfile | undefined {
  return allMovieEditorialProfiles[slug];
}

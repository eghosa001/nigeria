import { sevenFilmReleaseReviews20261017 } from "@/lib/entertainment-release-verification-2026-10-17";
import { filmCreditAndAvailabilityReviews20261017 } from "@/lib/entertainment-director-and-territory-evidence-2026-10-17";
import { fourVerifiedFilmDossiers20261017 } from "@/lib/movie-editorial-dossiers-2026-10-17";
import { distinctLongEnoughEditorialProfiles } from "@/lib/movie-editorial-profiles-long-enough-2026-10-15";
import { reviewedMovieDossiers20261016 } from "@/lib/movie-editorial-source-repairs-2026-10-16";
import { filmSpecificEditorial20261016 } from "@/lib/movie-editorial-profiles-reviewed-2026-10-16";
import { reviewedFilmDossiers20261015 } from "@/lib/movie-editorial-profiles-reviewed-2026-10-15";
import { individuallyResearchedFilmDossiers20261015B } from "@/lib/movie-editorial-profiles-reviewed-2026-10-15-b";
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
  filmSpecificEditorial20261016,
  individuallyResearchedFilmDossiers20261015B,
  reviewedFilmDossiers20261015,
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

// A researched amendment replaces earlier copy for the same canonical film, without
// introducing a duplicate editorial collection ID into the strict uniqueness gate.
const baseMovieEditorialProfiles: Record<string, MovieEditorialProfile> = {
  ...Object.assign({}, ...movieEditorialCollections),
  ...reviewedMovieDossiers20261016,
  ...fourVerifiedFilmDossiers20261017,
};

// Movie-specific source and credit notes are added to existing original guides,
// never used to manufacture a second review or invent unsupported role names.
export const allMovieEditorialProfiles: Record<string, MovieEditorialProfile> = Object.fromEntries(
  Object.entries(baseMovieEditorialProfiles).map(([slug, base]) => {
    const review = filmCreditAndAvailabilityReviews20261017[slug]?.editorial;
    if (!review) return [slug, base];
    const crew = [...base.crew];
    for (const item of review.crew ?? []) {
      if (!crew.some(existing => existing.name === item.name && /director/i.test(existing.role))) crew.push(item);
    }
    return [slug, {
      ...base,
      crew,
      sections: base.sections.some(section => section.heading === review.heading)
        ? base.sections : [...base.sections, { heading: review.heading, paragraphs: review.paragraphs }],
      questions: base.questions.some(item => item.question === review.question.question)
        ? base.questions : [...base.questions, review.question],
    }];
  })
);

// The follow-up notes are appended to canonical film dossiers, not published
// as duplicate film profiles or fact-free summaries. Keep older author work.
const accuratelyReleasedMovieEditorialProfiles: Record<string, MovieEditorialProfile> =
  Object.fromEntries(Object.entries(allMovieEditorialProfiles).map(([slug, base]) => {
    const review = sevenFilmReleaseReviews20261017[slug];
    if (!review) return [slug, base];
    return [slug, {
      ...base,
      sections: base.sections.some(section => section.heading === review.heading)
        ? base.sections : [...base.sections, { heading: review.heading, paragraphs: review.paragraphs }],
      questions: base.questions.some(item => item.question === review.question.question)
        ? base.questions : [...base.questions, review.question],
    }];
  }));

export function getMovieEditorialProfile(slug: string): MovieEditorialProfile | undefined {
  return accuratelyReleasedMovieEditorialProfiles[slug];
}

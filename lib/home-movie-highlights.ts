import type { EntertainmentTitle } from "@/lib/entertainment";
import type { ReleaseItem } from "@/lib/entertainment-extras";

function normalizedTitle(value: string) {
  return value.trim().toLocaleLowerCase("en");
}

function hasUsableMoviePreview(title: EntertainmentTitle) {
  return title.artwork?.status === "approved" ||
    Boolean(title.sourcePreview) ||
    Boolean(title.trailer) ||
    title.watchLinks.some((link) => link.platform === "YouTube" && link.access === "full-movie");
}

/**
 * Show recently released, source-backed films rather than an old fixed list.
 *
 * Release *year* comes first; a dated, actually released title comes before an
 * undated title of the same year. Within undated groups, preserve editorial
 * catalogue order instead of treating a new source-check as a new movie.
 * Announced future films remain in /entertainment/releases.
 */
export function selectRecentHomeMovies(
  titles: EntertainmentTitle[],
  releases: ReleaseItem[],
  today = new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 10),
  limit = 6,
): EntertainmentTitle[] {
  const year = Number(today.slice(0, 4));
  const releaseByTitle = new Map<string, ReleaseItem[]>();
  for (const release of releases) {
    const key = normalizedTitle(release.title);
    releaseByTitle.set(key, [...(releaseByTitle.get(key) ?? []), release]);
  }

  return titles
    .map((title, index) => {
      const matchingReleases = (releaseByTitle.get(normalizedTitle(title.title)) ?? [])
        .filter((release) => !release.startDate || Number(release.startDate.slice(0, 4)) === title.year);
      const futureRelease = matchingReleases.some((release) =>
        (release.startDate && release.startDate > today) ||
        (release.status === "upcoming" && !release.startDate),
      );
      const publishedDate = matchingReleases
        .filter((release) => release.startDate && release.startDate <= today)
        .map((release) => release.startDate ?? "")
        .sort()
        .at(-1) ?? "";

      return { title, index, futureRelease, publishedDate };
    })
    .filter(({ title, futureRelease }) =>
      title.year <= year &&
      title.year >= 2000 &&
      !futureRelease &&
      title.cast.length > 0 &&
      title.synopsis.trim().length >= 50 &&
      hasUsableMoviePreview(title),
    )
    .sort((a, b) =>
      b.title.year - a.title.year ||
      b.publishedDate.localeCompare(a.publishedDate) ||
      Number(Boolean(b.title.featured)) - Number(Boolean(a.title.featured)) ||
      a.index - b.index,
    )
    .slice(0, Math.max(0, limit))
    .map(({ title }) => title);
}

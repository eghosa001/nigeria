/** Browser filter options only: do not send guides with no directory places.
 * Full editorial guides remain server-rendered and discoverable elsewhere.
 */
export type FilterGuide = {
  slug: string;
  shortTitle: string;
  kind: "city" | "destination" | "itinerary" | "event";
};

export function getFilterableExploreGuides<T extends FilterGuide>(
  guides: readonly T[],
  places: readonly { guideSlug: string }[],
): FilterGuide[] {
  const availableSlugs = new Set(places.map((place) => place.guideSlug));
  // Preserve the original dropdown order and the same labels / guide kinds.
  return guides.filter((guide) => availableSlugs.has(guide.slug))
    .map(({ slug, shortTitle, kind }) => ({ slug, shortTitle, kind }));
}

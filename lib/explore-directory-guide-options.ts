/** Lightweight, typed tuple options for guides that actually have places.
 * Filter preserves the original order and text; full editorial guide links
 * still render in Tour Nigeria's server-side browse sections.
 */
export type ExploreGuideOption =
  readonly [slug: string, shortTitle: string, kind: "city" | "destination" | "itinerary" | "event"];

export function getFilterableExploreGuides<T extends ExploreGuideOption>(
  guides: readonly T[],
  places: readonly { guideSlug: string }[],
): T[] {
  const filterable = new Set(places.map(({ guideSlug }) => guideSlug));
  return guides.filter(([slug]) => filterable.has(slug));
}

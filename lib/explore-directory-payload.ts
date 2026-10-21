import { explorePlaces } from "@/lib/explore-places";

// This is only published visitor-directory data. Verification source records,
// editorial notes and administrative fields must never be sent to the browser.
// Kept server-side: the public Explore landing sends only its first eight rows.
export const publicExplorePlaceDirectory = explorePlaces.map((place) => ({
  slug: place.slug,
  guideSlug: place.guideSlug,
  name: place.name,
  kind: place.kind,
  area: place.area,
  address: place.address,
  summary: place.summary,
  cost: place.cost,
  mapQuery: place.mapQuery,
  tags: place.tags,
}));

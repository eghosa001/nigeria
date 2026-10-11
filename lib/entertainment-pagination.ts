import { entertainmentTitles } from "@/lib/entertainment";

export const ENTERTAINMENT_CATALOG_PAGE_SIZE = 30;

// The catalog is a static build-time dataset. Sort it once instead of sorting
// the entire catalog for each paginated request and static page render.
const sortedCatalogTitles = [...entertainmentTitles].sort(
  (a, b) => b.year - a.year || a.title.localeCompare(b.title),
);

export function getEntertainmentCatalogTitles() {
  // Maintain the caller's independent-array contract.
  return [...sortedCatalogTitles];
}

export function getEntertainmentCatalogPageCount() {
  return Math.max(1, Math.ceil(entertainmentTitles.length / ENTERTAINMENT_CATALOG_PAGE_SIZE));
}

export function getEntertainmentCatalogPage(page: number) {
  const pageCount = getEntertainmentCatalogPageCount();
  if (!Number.isInteger(page) || page < 1 || page > pageCount) return null;

  const start = (page - 1) * ENTERTAINMENT_CATALOG_PAGE_SIZE;

  return {
    page,
    pageCount,
    titles: sortedCatalogTitles.slice(start, start + ENTERTAINMENT_CATALOG_PAGE_SIZE),
  };
}

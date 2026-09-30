import { entertainmentTitles } from "@/lib/entertainment";

export const ENTERTAINMENT_CATALOG_PAGE_SIZE = 30;

export function getEntertainmentCatalogTitles() {
  return [...entertainmentTitles].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

export function getEntertainmentCatalogPageCount() {
  return Math.max(1, Math.ceil(entertainmentTitles.length / ENTERTAINMENT_CATALOG_PAGE_SIZE));
}

export function getEntertainmentCatalogPage(page: number) {
  const pageCount = getEntertainmentCatalogPageCount();
  if (!Number.isInteger(page) || page < 1 || page > pageCount) return null;

  const titles = getEntertainmentCatalogTitles();
  const start = (page - 1) * ENTERTAINMENT_CATALOG_PAGE_SIZE;

  return {
    page,
    pageCount,
    titles: titles.slice(start, start + ENTERTAINMENT_CATALOG_PAGE_SIZE),
  };
}

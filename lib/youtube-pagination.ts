import { youtubeMovieLibrary } from "@/lib/youtube-library";
import { YOUTUBE_CATALOG_PAGE_SIZE } from "@/lib/youtube-config";

export { YOUTUBE_CATALOG_PAGE_SIZE } from "@/lib/youtube-config";

export function getYouTubeCatalogPageCount() {
  return Math.max(1, Math.ceil(youtubeMovieLibrary.length / YOUTUBE_CATALOG_PAGE_SIZE));
}

export function getYouTubeCatalogPage(page: number) {
  const pageCount = getYouTubeCatalogPageCount();
  if (!Number.isInteger(page) || page < 1 || page > pageCount) return null;
  const start = (page - 1) * YOUTUBE_CATALOG_PAGE_SIZE;
  return {
    page,
    pageCount,
    movies: youtubeMovieLibrary.slice(start, start + YOUTUBE_CATALOG_PAGE_SIZE),
  };
}

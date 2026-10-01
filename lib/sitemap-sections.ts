import { categorySlug } from "@/lib/category";
import { myNigeriaGuideUpdates } from "@/data/updates";
import { agencies, categories, publicServices } from "@/lib/data";
import { entertainmentTitles } from "@/lib/entertainment";
import { getEntertainmentCatalogPageCount } from "@/lib/entertainment-pagination";
import { entertainmentPeople, releaseItems } from "@/lib/entertainment-extras";
import { exploreGuides } from "@/lib/explore";
import { YOUTUBE_CATALOG_PAGE_SIZE } from "@/lib/youtube-config";
import { youtubeMovieLibrary } from "@/lib/youtube-library";
import { growthHubs } from "@/lib/growth-hubs";
import { getSiteUrl } from "@/lib/site";

export const sitemapSectionNames = ["core", "services", "travel", "movies", "youtube"] as const;
export type SitemapSectionName = (typeof sitemapSectionNames)[number];

export type SitemapEntry = {
  url: string;
  lastModified: string;
};

function youtubeVideoId(value: string) {
  try {
    const parsed = new URL(value);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

function getCuratedYouTubeVideoIds() {
  const ids = new Set<string>();
  for (const title of entertainmentTitles) {
    for (const link of title.watchLinks) {
      if (link.platform !== "YouTube" || link.access !== "full-movie") continue;
      const videoId = youtubeVideoId(link.href);
      if (videoId) ids.add(videoId);
    }
  }
  return ids;
}

function getYouTubeSitemapPageCount() {
  return Math.max(1, Math.ceil(youtubeMovieLibrary.length / YOUTUBE_CATALOG_PAGE_SIZE));
}

function latestDate(values: string[]) {
  return values.reduce((latest, value) => value > latest ? value : latest, "");
}

function movieModified(title: (typeof entertainmentTitles)[number]) {
  return latestDate([
    ...title.watchLinks.map((link) => link.lastChecked),
    ...(title.trailer ? [title.trailer.lastChecked] : []),
    ...(title.artwork ? [title.artwork.lastChecked] : []),
  ]);
}

export function getSitemapEntries(section: SitemapSectionName): SitemapEntry[] {
  const base = getSiteUrl();
  const serviceModified = latestDate(publicServices.map((service) => service.lastVerified));
  const exploreModified = latestDate(exploreGuides.map((guide) => guide.lastReviewed));
  const movieCatalogModified = latestDate([
    ...entertainmentTitles.map(movieModified),
    ...releaseItems.map((item) => item.lastChecked),
  ]);
  const updateModified = latestDate(myNigeriaGuideUpdates.map((update) => update.date)) || serviceModified;

  if (section === "core") {
    const staticPaths = [
      "", "/latest", "/fees", "/updates", "/assistant", "/offices", "/official-portals",
      "/about", "/editorial-policy", "/corrections", "/privacy", "/terms", "/contact",
    ];
    return [
      ...staticPaths.map((path) => ({
        url: base + path,
        lastModified: path === "/updates" || path === "/latest" ? updateModified : serviceModified,
      })),
      ...categories.map((category) => ({
        url: base + "/categories/" + categorySlug(category.name),
        lastModified: latestDate(publicServices.filter((service) => service.category === category.name).map((service) => service.lastVerified)) || serviceModified,
      })),
      ...growthHubs.map((hub) => ({
        url: base + "/topics/" + hub.slug,
        lastModified: latestDate(publicServices.filter((service) => hub.serviceSlugs.includes(service.slug)).map((service) => service.lastVerified)) || serviceModified,
      })),
    ];
  }

  if (section === "services") {
    return [
      { url: base + "/services", lastModified: serviceModified },
      ...publicServices.map((service) => ({
        url: base + "/services/" + service.slug,
        lastModified: service.lastVerified,
      })),
      ...agencies.map((agency) => ({
        url: base + "/agencies/" + agency.slug,
        lastModified: latestDate(publicServices.filter((service) => service.agencySlug === agency.slug).map((service) => service.lastVerified)) || serviceModified,
      })),
    ];
  }

  if (section === "travel") {
    return [
      { url: base + "/explore", lastModified: exploreModified },
      ...exploreGuides.map((guide) => ({
        url: base + "/explore/" + guide.slug,
        lastModified: guide.lastReviewed,
      })),
    ];
  }

  if (section === "movies") {
    return [
      { url: base + "/entertainment", lastModified: movieCatalogModified },
      { url: base + "/entertainment/movies", lastModified: movieCatalogModified },
      { url: base + "/entertainment/releases", lastModified: movieCatalogModified },
      { url: base + "/entertainment/cinemas", lastModified: movieCatalogModified },
      { url: base + "/entertainment/platforms", lastModified: movieCatalogModified },
      { url: base + "/entertainment/people", lastModified: movieCatalogModified },
      { url: base + "/entertainment/image-rights", lastModified: movieCatalogModified },
      ...Array.from({ length: Math.max(0, getEntertainmentCatalogPageCount() - 1) }, (_, index) => ({
        url: base + "/entertainment/movies/page/" + (index + 2),
        lastModified: movieCatalogModified,
      })),
      ...entertainmentTitles.map((title) => ({
        url: base + "/entertainment/movies/" + title.slug,
        lastModified: movieModified(title) || movieCatalogModified,
      })),
      ...entertainmentPeople.map((person) => ({
        url: base + "/entertainment/people/" + person.slug,
        lastModified: movieCatalogModified,
      })),
    ];
  }

  const youtubeModified = latestDate(youtubeMovieLibrary.map((movie) => movie.lastChecked)) || movieCatalogModified;
  const pagination = Array.from({ length: Math.max(0, getYouTubeSitemapPageCount() - 1) }, (_, index) => ({
    url: base + "/entertainment/youtube/page/" + (index + 2),
    lastModified: youtubeModified,
  }));

  return [
    { url: base + "/entertainment/youtube", lastModified: youtubeModified },
    { url: base + "/entertainment/youtube/sources", lastModified: youtubeModified },
    ...pagination,
    ...youtubeMovieLibrary
      .filter((movie) => movie.source !== "curated")
      .map((movie) => ({
        url: base + "/entertainment/youtube/" + movie.videoId,
        lastModified: movie.lastChecked,
      })),
  ];
}

export function getSitemapSections() {
  const base = getSiteUrl();
  return sitemapSectionNames.map((name) => {
    const entries = getSitemapEntries(name);
    return {
      name,
      url: base + "/sitemaps/" + name + ".xml",
      lastModified: latestDate(entries.map((entry) => entry.lastModified)),
      count: entries.length,
    };
  });
}

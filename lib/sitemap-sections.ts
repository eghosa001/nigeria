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
import { serviceLocationCities } from "@/data/service-locations";
import { getSiteUrl } from "@/lib/site";
import { jobOpportunities } from "@/lib/jobs";
import { seriesTitles, seriesLastChecked } from "@/lib/series";

export const sitemapSectionNames = ["core", "services", "jobs", "travel", "movies", "youtube"] as const;
export type SitemapSectionName = (typeof sitemapSectionNames)[number];

export type SitemapEntry = {
  url: string;
  lastModified: string;
};

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
  const jobsModified = latestDate(jobOpportunities.map((item) => item.verifiedAt));
  const movieCatalogModified = latestDate([
    ...entertainmentTitles.map(movieModified),
    ...releaseItems.map((item) => item.lastChecked),
  ]);
  const updateModified = latestDate(myNigeriaGuideUpdates.map((update) => update.date)) || serviceModified;

  if (section === "core") {
    const staticPaths = [
      "", "/latest", "/fees", "/updates", "/assistant", "/offices", "/locations", "/official-portals",
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
      ...serviceLocationCities.map((city) => ({
        url: base + "/locations/" + city.slug,
        lastModified: city.lastVerified,
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

  if (section === "jobs") {
    return [
      { url: base + "/jobs", lastModified: jobsModified },
      { url: base + "/jobs/open-now", lastModified: jobsModified },
      { url: base + "/jobs/nysc", lastModified: jobsModified },
      { url: base + "/jobs/government", lastModified: jobsModified },
      { url: base + "/jobs/private", lastModified: jobsModified },
      { url: base + "/jobs/deadlines", lastModified: jobsModified },
      { url: base + "/jobs/graduate", lastModified: jobsModified },
      { url: base + "/jobs/internships", lastModified: jobsModified },
      { url: base + "/jobs/engineering", lastModified: jobsModified },
      { url: base + "/jobs/remote", lastModified: "2026-10-04" },
      ...jobOpportunities.map((item) => ({
        url: base + "/jobs/" + item.slug,
        lastModified: item.verifiedAt,
      })),
    ];
  }

  if (section === "travel") {
    return [
      { url: base + "/explore", lastModified: exploreModified },
      { url: base + "/explore/events", lastModified: exploreModified },
      { url: base + "/explore/things-to-do-lagos", lastModified: "2026-10-04" },
      { url: base + "/explore/things-to-do-abuja", lastModified: "2026-10-04" },
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
      { url: base + "/entertainment/trending", lastModified: movieCatalogModified },
      { url: base + "/entertainment/movies/october-2026", lastModified: "2026-10-04" },
      { url: base + "/entertainment/releases", lastModified: movieCatalogModified },
      { url: base + "/entertainment/cinemas", lastModified: movieCatalogModified },
      { url: base + "/entertainment/platforms", lastModified: movieCatalogModified },
      { url: base + "/entertainment/people", lastModified: movieCatalogModified },
      { url: base + "/entertainment/series", lastModified: latestDate(seriesTitles.map(seriesLastChecked)) || movieCatalogModified },
      ...seriesTitles.map((item) => ({
        url: base + "/entertainment/series/" + item.slug,
        lastModified: seriesLastChecked(item) || movieCatalogModified,
      })),
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

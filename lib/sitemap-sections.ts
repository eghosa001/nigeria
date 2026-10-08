import { categorySlug } from "@/lib/category";
import { myNigeriaGuideUpdates } from "@/data/updates";
import { agencies, categories, publicServices } from "@/lib/data";
import { entertainmentTitles } from "@/lib/entertainment";
import { getEntertainmentCatalogPageCount } from "@/lib/entertainment-pagination";
import { entertainmentPeople, releaseItems } from "@/lib/entertainment-extras";
import { indexableEntertainmentPlatformHubs } from "@/lib/entertainment-platform-hubs";
import { exploreGuides } from "@/lib/explore";
import { indexableYouTubeMovies, youtubeMovieLibrary } from "@/lib/youtube-library";
import { indexableYouTubeChannelHubs, isIndexableYouTubeChannelHub } from "@/lib/youtube-channel-hubs";
import { growthHubs } from "@/lib/growth-hubs";
import { serviceLocationCities } from "@/data/service-locations";
import { getSiteUrl } from "@/lib/site";
import { getServiceDirectoryPageCount } from "@/lib/service-query";
import { isIndexableJobOpportunity, jobOpportunities } from "@/lib/jobs";
import { jobTopics } from "@/lib/job-topics";
import { careerGuides } from "@/lib/career-guides";
import { jobLocationFacets, jobProfessionFacets } from "@/lib/job-facets";
import { indexableJobEmployers } from "@/lib/job-employers";
import { seriesTitles, seriesLastChecked } from "@/lib/series";

export const sitemapSectionNames = ["core", "services", "jobs", "travel", "movies", "youtube"] as const;
export type SitemapSectionName = (typeof sitemapSectionNames)[number];

export const SITEMAP_SHARD_SIZE = 20_000;

export type SitemapEntry = {
  url: string;
  lastModified: string;
};

export type SitemapShard = {
  name: string;
  section: SitemapSectionName;
  shard: number;
  url: string;
  lastModified: string;
  count: number;
};

function latestDate(values: string[]) {
  return values.reduce((latest, value) => value > latest ? value : latest, "");
}

function movieModified(title: (typeof entertainmentTitles)[number]) {
  return latestDate([
    ...title.watchLinks.map((link) => link.lastChecked),
    ...(title.trailer ? [title.trailer.lastChecked] : []),
    ...(title.references ?? []).map((reference) => reference.lastChecked),
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
  const seriesModified = latestDate(seriesTitles.map(seriesLastChecked)) || movieCatalogModified;
  const latestHubModified = latestDate([
    updateModified,
    serviceModified,
    exploreModified,
    jobsModified,
    movieCatalogModified,
    seriesModified,
  ]);

  if (section === "core") {
    const staticPaths = [
      "", "/latest", "/fees", "/updates", "/assistant", "/offices", "/locations", "/official-portals",
      "/about", "/editorial-policy", "/corrections", "/privacy", "/terms", "/contact",
    ];
    return [
      ...staticPaths.map((path) => ({
        url: base + path,
        lastModified: path === "/latest" ? latestHubModified : path === "/updates" ? updateModified : serviceModified,
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
      ...Array.from({ length: Math.max(0, getServiceDirectoryPageCount() - 1) }, (_, index) => ({
        url: base + "/services/page/" + (index + 2),
        lastModified: serviceModified,
      })),
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
      { url: base + "/jobs/new-this-week", lastModified: jobsModified },
      { url: base + "/jobs/closing-this-week", lastModified: jobsModified },
      { url: base + "/jobs/employers", lastModified: jobsModified },
      ...indexableJobEmployers.map((employer) => ({
        url: base + "/jobs/employers/" + employer.slug,
        lastModified: employer.latestVerified || jobsModified,
      })),
      ...jobLocationFacets.map((facet) => ({
        url: base + "/jobs/locations/" + facet.slug,
        lastModified: jobsModified,
      })),
      ...jobProfessionFacets.map((facet) => ({
        url: base + "/jobs/professions/" + facet.slug,
        lastModified: jobsModified,
      })),
      ...jobTopics.map((topic) => ({
        url: base + "/jobs/categories/" + topic.slug,
        lastModified: jobsModified,
      })),
      ...careerGuides.map((guide) => ({
        url: base + "/jobs/guides/" + guide.slug,
        lastModified: guide.reviewedAt,
      })),
      ...jobOpportunities.filter(isIndexableJobOpportunity).map((item) => ({
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
      { url: base + "/entertainment/hallelujah-challenge-october-2026", lastModified: "2026-10-08" },
      { url: base + "/entertainment/movies/october-2026", lastModified: "2026-10-04" },
      { url: base + "/entertainment/releases", lastModified: movieCatalogModified },
      { url: base + "/entertainment/cinemas", lastModified: movieCatalogModified },
      { url: base + "/entertainment/platforms", lastModified: movieCatalogModified },
      ...indexableEntertainmentPlatformHubs.map((hub) => ({
        url: base + "/entertainment/platforms/" + hub.slug,
        lastModified: hub.lastChecked,
      })),
      { url: base + "/entertainment/people", lastModified: movieCatalogModified },
      { url: base + "/entertainment/series", lastModified: seriesModified },
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
  return [
    { url: base + "/entertainment/youtube", lastModified: youtubeModified },
    { url: base + "/entertainment/youtube/channels", lastModified: youtubeModified },
    ...indexableYouTubeChannelHubs.filter(isIndexableYouTubeChannelHub).map((hub) => ({
      url: base + "/entertainment/youtube/channels/" + hub.channel.slug,
      lastModified: hub.latestChecked || youtubeModified,
    })),
    ...indexableYouTubeMovies
      .filter((movie) => movie.source !== "curated")
      .map((movie) => ({
        url: base + "/entertainment/youtube/" + movie.videoId,
        lastModified: movie.lastChecked,
      })),
  ];
}

export function getSitemapShardEntries(section: SitemapSectionName, shard = 1): SitemapEntry[] {
  if (!Number.isInteger(shard) || shard < 1) return [];
  const entries = getSitemapEntries(section);
  const start = (shard - 1) * SITEMAP_SHARD_SIZE;
  return entries.slice(start, start + SITEMAP_SHARD_SIZE);
}

export function parseSitemapShardName(raw: string): { section: SitemapSectionName; shard: number } | null {
  const name = raw.endsWith(".xml") ? raw.slice(0, -4) : raw;

  for (const section of sitemapSectionNames) {
    if (name === section) return { section, shard: 1 };
    if (!name.startsWith(section + "-")) continue;

    const shard = Number(name.slice(section.length + 1));
    if (Number.isInteger(shard) && shard >= 2) return { section, shard };
  }

  return null;
}

export function getSitemapSections(): SitemapShard[] {
  const base = getSiteUrl();

  return sitemapSectionNames.flatMap((section) => {
    const entries = getSitemapEntries(section);
    const shardCount = Math.max(1, Math.ceil(entries.length / SITEMAP_SHARD_SIZE));

    return Array.from({ length: shardCount }, (_, index) => {
      const shard = index + 1;
      const shardEntries = entries.slice(index * SITEMAP_SHARD_SIZE, shard * SITEMAP_SHARD_SIZE);
      const name = shard === 1 ? section : section + "-" + shard;

      return {
        name,
        section,
        shard,
        url: base + "/sitemaps/" + name + ".xml",
        lastModified: latestDate(shardEntries.map((entry) => entry.lastModified)),
        count: shardEntries.length,
      };
    });
  });
}

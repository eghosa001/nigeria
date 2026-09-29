import type { MetadataRoute } from "next";
import { categorySlug } from "@/lib/category";
import { myNigeriaGuideUpdates } from "@/data/updates";
import { agencies, categories, publicServices } from "@/lib/data";
import { entertainmentTitles } from "@/lib/entertainment";
import { entertainmentPeople, releaseItems } from "@/lib/entertainment-extras";
import { growthHubs } from "@/lib/growth-hubs";
import { getSiteUrl } from "@/lib/site";

function latestDate(values: string[]) {
  return values.reduce((latest, value) => value > latest ? value : latest, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const catalogModified = latestDate(publicServices.map((service) => service.lastVerified));
  const updatesModified = latestDate(myNigeriaGuideUpdates.map((update) => update.date)) || catalogModified;
  const entertainmentModified = latestDate([
    ...entertainmentTitles.flatMap((title) => title.watchLinks.map((link) => link.lastChecked)),
    ...releaseItems.map((item) => item.lastChecked),
  ]) || catalogModified;

  const staticPages = [
    ["", "weekly", 1],
    ["/services", "weekly", 0.9],
    ["/entertainment", "weekly", 0.8],
    ["/entertainment/movies", "weekly", 0.8],
    ["/entertainment/releases", "daily", 0.8],
    ["/entertainment/cinemas", "weekly", 0.7],
    ["/entertainment/platforms", "weekly", 0.7],
    ["/entertainment/people", "weekly", 0.7],
    ["/fees", "weekly", 0.9],
    ["/updates", "weekly", 0.9],
    ["/assistant", "weekly", 0.7],
    ["/offices", "monthly", 0.7],
    ["/official-portals", "weekly", 0.8],
    ["/about", "monthly", 0.5],
    ["/editorial-policy", "monthly", 0.4],
    ["/corrections", "monthly", 0.4],
    ["/privacy", "yearly", 0.2],
    ["/terms", "yearly", 0.2],
    ["/contact", "monthly", 0.3],
  ] as const;

  return [
    ...staticPages.map(([path, changeFrequency, priority]) => ({
      url: base + path,
      lastModified: path.startsWith("/entertainment") ? entertainmentModified : path === "/updates" ? updatesModified : catalogModified,
      changeFrequency,
      priority,
    })),
    ...categories.map((category) => ({
      url: base + "/categories/" + categorySlug(category.name),
      lastModified: latestDate(publicServices.filter((service) => service.category === category.name).map((service) => service.lastVerified)) || catalogModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...growthHubs.map((hub) => ({
      url: base + "/topics/" + hub.slug,
      lastModified: latestDate(publicServices.filter((service) => hub.serviceSlugs.includes(service.slug)).map((service) => service.lastVerified)) || catalogModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...entertainmentTitles.map((title) => ({
      url: base + "/entertainment/movies/" + title.slug,
      lastModified: latestDate([
        ...title.watchLinks.map((link) => link.lastChecked),
        ...(title.trailer ? [title.trailer.lastChecked] : []),
      ]) || entertainmentModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...entertainmentPeople.map((person) => ({
      url: base + "/entertainment/people/" + person.slug,
      lastModified: entertainmentModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...publicServices.map((service) => ({
      url: base + "/services/" + service.slug,
      lastModified: service.lastVerified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...agencies.map((agency) => ({
      url: base + "/agencies/" + agency.slug,
      lastModified: latestDate(publicServices.filter((service) => service.agencySlug === agency.slug).map((service) => service.lastVerified)) || catalogModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

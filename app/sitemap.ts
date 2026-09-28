import type { MetadataRoute } from "next";
import { categorySlug } from "@/lib/category";
import { myNigeriaGuideUpdates } from "@/data/updates";
import { agencies, categories, publicServices } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

function latestDate(values: string[]) {
  return values.reduce((latest, value) => value > latest ? value : latest, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const catalogModified = latestDate(publicServices.map((service) => service.lastVerified));
  const updatesModified = latestDate(myNigeriaGuideUpdates.map((update) => update.date)) || catalogModified;
  const staticPages = [
    ["", "weekly", 1],
    ["/services", "weekly", 0.9],
    ["/fees", "weekly", 0.9],
    ["/updates", "weekly", 0.9],
    ["/assistant", "weekly", 0.7],
    ["/offices", "monthly", 0.7],
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
      lastModified: path === "/updates" ? updatesModified : catalogModified,
      changeFrequency,
      priority,
    })),
    ...categories.map((category) => ({
      url: base + "/categories/" + categorySlug(category.name),
      lastModified: latestDate(publicServices.filter((service) => service.category === category.name).map((service) => service.lastVerified)) || catalogModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
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

import type { MetadataRoute } from "next";
import { categorySlug } from "@/lib/category";
import { agencies, categories, publicServices } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
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
    ...staticPages.map(([path, changeFrequency, priority]) => ({ url: base + path, changeFrequency, priority })),
    ...categories.map((category) => ({
      url: base + "/categories/" + categorySlug(category.name),
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
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

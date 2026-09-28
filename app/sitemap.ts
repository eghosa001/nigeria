import type { MetadataRoute } from "next";
import { agencies, services } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: base + "/services", changeFrequency: "weekly", priority: 0.9 },
    { url: base + "/about", changeFrequency: "monthly", priority: 0.5 },
    ...services.map((service) => ({
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

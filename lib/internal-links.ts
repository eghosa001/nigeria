import type { Service } from "@/lib/types";
import { publicServices } from "@/lib/data";
import { getGrowthHubsForService } from "@/lib/growth-hubs";

function pushUnique(target: Service[], candidate: Service | undefined, serviceSlug: string) {
  if (!candidate || candidate.slug === serviceSlug || target.some((item) => item.slug === candidate.slug)) return;
  target.push(candidate);
}

/**
 * Builds stable, crawl-friendly related-guide links.
 *
 * Explicit editorial relationships stay first, while category neighbours and
 * topic/agency peers guarantee that guides do not depend on data-file order
 * for their only service-to-service incoming links.
 */
export function getRelatedServices(service: Service, limit = 6) {
  const related: Service[] = [];
  const explicit = service.related
    .map((slug) => publicServices.find((item) => item.slug === slug))
    .filter((item): item is Service => item !== undefined);

  for (const item of explicit.slice(0, 3)) pushUnique(related, item, service.slug);

  const categoryServices = publicServices.filter((item) => item.category === service.category);
  const currentIndex = categoryServices.findIndex((item) => item.slug === service.slug);

  if (currentIndex >= 0 && categoryServices.length > 1) {
    for (const offset of [1, -1, 2, -2]) {
      const index = (currentIndex + offset + categoryServices.length) % categoryServices.length;
      pushUnique(related, categoryServices[index], service.slug);
    }
  }

  for (const item of explicit.slice(3)) pushUnique(related, item, service.slug);

  for (const hub of getGrowthHubsForService(service.slug)) {
    for (const slug of hub.serviceSlugs) {
      pushUnique(related, publicServices.find((item) => item.slug === slug), service.slug);
    }
  }

  for (const item of publicServices.filter((candidate) =>
    candidate.agencySlug === service.agencySlug && candidate.slug !== service.slug
  )) {
    pushUnique(related, item, service.slug);
  }

  for (const item of categoryServices) pushUnique(related, item, service.slug);

  return related.slice(0, limit);
}

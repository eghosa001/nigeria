import type { Service } from "@/lib/types";
import { publicServices } from "@/lib/data";
import { getGrowthHubsForService } from "@/lib/growth-hubs";

const normalized = (value: string) => value.toLocaleLowerCase("en").trim();
const bySlug = new Map(publicServices.map((item) => [item.slug, item]));

function appendUnique(target: Service[], candidate: Service | undefined, currentSlug: string) {
  if (candidate && candidate.slug !== currentSlug && !target.some((item) => item.slug === candidate.slug)) {
    target.push(candidate);
  }
}

/** Editorial connections first; agency, category and common search intent next. */
export function getRelatedServices(service: Service, limit = 6) {
  const related: Service[] = [];
  for (const slug of service.related) appendUnique(related, bySlug.get(slug), service.slug);

  for (const hub of getGrowthHubsForService(service.slug)) {
    for (const slug of hub.serviceSlugs) appendUnique(related, bySlug.get(slug), service.slug);
  }

  const terms = new Set(service.searchTerms.map(normalized).filter((term) => term.length >= 5));
  const scored = publicServices
    .filter((candidate) => candidate.slug !== service.slug && !related.some((item) => item.slug === candidate.slug))
    .map((candidate) => {
      const sharedTerms = candidate.searchTerms.filter((term) => terms.has(normalized(term))).length;
      const score = (candidate.agencySlug === service.agencySlug ? 7 : 0) +
        (candidate.category === service.category ? 3 : 0) +
        Math.min(3, sharedTerms) * 4;
      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.shortTitle.localeCompare(b.candidate.shortTitle));

  for (const { candidate } of scored) {
    if (related.length >= limit) break;
    appendUnique(related, candidate, service.slug);
  }

  return related.slice(0, limit);
}

export function getRelatedServiceReason(current: Service, suggestion: Service) {
  if (current.related.includes(suggestion.slug)) return "Connected step";
  if (current.agencySlug === suggestion.agencySlug) return "Same responsible agency";
  if (current.category === suggestion.category) return "Same service category";
  return "Related guidance";
}

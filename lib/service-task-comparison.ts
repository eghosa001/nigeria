import type { Service } from "@/lib/types";

/** Compare only issuer-backed, actionable services; do not invent fees or outcomes. */
export function selectServiceTaskComparisons(services: Service[], limit = 6): Service[] {
  if (!Number.isInteger(limit) || limit <= 0) return [];
  const valid = services.filter(service =>
    Boolean(service.slug && service.shortTitle && service.steps.length &&
      service.requirements.length &&
      service.sources.some(source => source.url.startsWith("https://"))));
  const distinct = [...new Map(valid.map(service => [service.slug, service])).values()];
  const selected: Service[] = [];
  const agencies = new Set<string>();
  for (const service of distinct) {
    if (selected.length >= limit) break;
    if (!agencies.has(service.agencySlug)) {
      selected.push(service);
      agencies.add(service.agencySlug);
    }
  }
  const selectedSlugs = new Set(selected.map(service => service.slug));
  for (const service of distinct) {
    if (selected.length >= limit) break;
    if (!selectedSlugs.has(service.slug)) {
      selected.push(service);
      selectedSlugs.add(service.slug);
    }
  }
  return selected;
}

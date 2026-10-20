import type { Service } from "@/lib/types";

type SearchRoute = { query: string; serviceSlug: string };
export type TopicTaskLink = { slug: string; label: string };

/**
 * One internal link per distinct sourced task. A search phrase is not a new
 * page or new action: many keyword variants point to the same canonical.
 */
export function getDistinctTopicTaskLinks(
  searches: readonly SearchRoute[],
  services: readonly Service[],
): TopicTaskLink[] {
  const bySlug = new Map(services.map((service) => [service.slug, service]));
  const labelCount = new Map<string, number>();
  for (const service of services) {
    const label = service.shortTitle.trim().toLocaleLowerCase("en");
    labelCount.set(label, (labelCount.get(label) ?? 0) + 1);
  }

  const seen = new Set<string>();
  const links: TopicTaskLink[] = [];
  for (const search of searches) {
    const service = bySlug.get(search.serviceSlug);
    if (!service || seen.has(service.slug)) continue;
    seen.add(service.slug);
    const ambiguous = (labelCount.get(service.shortTitle.trim().toLocaleLowerCase("en")) ?? 0) > 1;
    links.push({ slug: service.slug, label: ambiguous ? service.title : service.shortTitle });
  }
  return links;
}

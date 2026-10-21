import { jobOpportunities, type CareerOpportunity } from "@/lib/jobs";

import { jobLocationFacets, jobProfessionFacets, type JobFacet } from "@/lib/job-facet-definitions";
export { jobLocationFacets, jobProfessionFacets } from "@/lib/job-facet-definitions";
export type { JobFacet } from "@/lib/job-facet-definitions";

function searchable(item: CareerOpportunity) {
  return [
    item.title,
    item.organization,
    item.summary,
    item.location,
    item.employmentType,
    ...item.audiences,
    ...item.fields,
    ...item.qualifications,
  ].join(" ").toLowerCase();
}

// The published catalog is assembled once at module initialization. Cache its
// search text lazily across location/profession facets and directory searches.
// Standalone caller-created records remain uncached and safely mutable.
const catalogItems = new WeakSet<CareerOpportunity>(jobOpportunities);
const searchableCache = new WeakMap<CareerOpportunity, string>();

export function jobSearchText(item: CareerOpportunity) {
  if (!catalogItems.has(item)) return searchable(item);
  const previous = searchableCache.get(item);
  if (previous !== undefined) return previous;
  const value = searchable(item);
  searchableCache.set(item, value);
  return value;
}

function matchesTerms(value: string, terms: string[]) {
  const text = value.toLowerCase();
  return terms.some((term) => text.includes(term.toLowerCase()));
}

function matchesProfessionTerms(item: CareerOpportunity, terms: string[]) {
  // Experience or an education requirement mentioning a field does not make
  // the opportunity a vacancy in that profession.
  return matchesTerms([item.title, item.employmentType, ...item.fields].join(" "), terms);
}

export function getJobLocationFacet(slug: string) {
  return jobLocationFacets.find((facet) => facet.slug === slug);
}

export function getJobProfessionFacet(slug: string) {
  return jobProfessionFacets.find((facet) => facet.slug === slug);
}

export function getJobFacetOpportunities(facet: JobFacet) {
  const locationFacet = jobLocationFacets.some((location) => location.slug === facet.slug);
  return jobOpportunities.filter((item) => locationFacet
    ? matchesTerms(item.location, facet.terms)
    : matchesProfessionTerms(item, facet.terms));
}

export function matchesJobLocation(item: CareerOpportunity, slug: string) {
  const facet = getJobLocationFacet(slug);
  return facet ? matchesTerms(item.location, facet.terms) : false;
}

export function matchesJobProfession(item: CareerOpportunity, slug: string) {
  const facet = getJobProfessionFacet(slug);
  return facet ? matchesProfessionTerms(item, facet.terms) : false;
}

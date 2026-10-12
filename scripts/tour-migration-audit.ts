/**
 * Read-only Tour migration manifest and continuity audit.
 * The checked-in catalog is ALREADY displayed publicly; this does not
 * grant D1 editorial publication approval or write to any database.
 */
import type { ExploreGuide } from "../lib/explore";
import type { ExplorePlace } from "../lib/explore-places";

export type TourMigrationProblem = {
  slug: string;
  reason: "duplicate_slug_conflict" | "missing_identity" | "missing_source" |
    "missing_checked_date" | "unmapped_state" | "orphan_guide" | "unresolved_shared_place";
  detail?: string;
};

export type TourMigrationCandidate = {
  slug: string;
  guideSlug: string;
  editorialStatus: "draft";
  name: string;
  kind: ExplorePlace["kind"];
  area: string;
  address: string;
  summary: string;
  costGuidance: string;
  sourceUrl: string;
  sourceName: string;
  checkedAt: string;
  stateOrFct: string | null;
  legacyExtras: {
    tags: string[];
    mapQuery?: string;
    costNote?: string;
    hours?: string;
    phone?: string;
    website?: string;
  };
};

export type TourMigrationMembership = {
  placeSlug: string;
  guideSlug: string;
  position: number;
};

const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const validDate = /^\d{4}-\d{2}-\d{2}$/;
const namedStates = new Set([
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
]);

/** Only resolve precise administrative regions, never guess from a broad hub. */
export function exactTourState(region: string): string | null {
  const trimmed = region.trim();
  if (trimmed === "Federal Capital Territory" || trimmed === "FCT" || trimmed === "Abuja FCT") {
    return "Federal Capital Territory";
  }
  const plain = trimmed.endsWith(" State") ? trimmed.slice(0, -6) : trimmed;
  return namedStates.has(plain) ? plain : null;
}

export function buildTourMigrationAudit(
  places: readonly ExplorePlace[],
  guides: readonly ExploreGuide[],
  guidePlaces: (slug: string) => readonly ExplorePlace[],
) {
  const candidates: TourMigrationCandidate[] = [];
  const memberships: TourMigrationMembership[] = [];
  const problems: TourMigrationProblem[] = [];
  const unique = new Map<string, ExplorePlace>();
  const allGuides = new Map(guides.map((guide) => [guide.slug, guide]));

  for (const place of places) {
    const prior = unique.get(place.slug);
    if (prior) {
      // Preserve duplicates as review blockers even if they seem identical.
      // tour_places.slug is UNIQUE and must not silently collapse old results.
      problems.push({ slug: place.slug, reason: "duplicate_slug_conflict",
        detail: prior.guideSlug + " / " + place.guideSlug });
      continue;
    }
    unique.set(place.slug, place);
    const guide = allGuides.get(place.guideSlug);
    if (!validSlug.test(place.slug) || !validSlug.test(place.guideSlug) ||
        !place.name.trim() || !place.address.trim() || !place.summary.trim()) {
      problems.push({ slug: place.slug, reason: "missing_identity" });
    }
    if (!guide) problems.push({ slug: place.slug, reason: "orphan_guide", detail: place.guideSlug });
    const state = guide ? exactTourState(guide.region) : null;
    if (!state) problems.push({ slug: place.slug, reason: "unmapped_state", detail: guide?.region });
    if (!validDate.test(place.checkedAt)) {
      problems.push({ slug: place.slug, reason: "missing_checked_date" });
    }
    let sourceOk = false;
    try {
      const url = new URL(place.source.href);
      sourceOk = url.protocol === "https:" && Boolean(url.hostname) && Boolean(place.source.label.trim());
    } catch { /* invalid source held for review */ }
    if (!sourceOk) problems.push({ slug: place.slug, reason: "missing_source" });

    candidates.push({
      slug: place.slug,
      guideSlug: place.guideSlug,
      editorialStatus: "draft",
      name: place.name, kind: place.kind, area: place.area,
      address: place.address, summary: place.summary, costGuidance: place.cost,
      sourceUrl: place.source.href, sourceName: place.source.label,
      checkedAt: place.checkedAt, stateOrFct: state,
      legacyExtras: {
        tags: [...place.tags],
        mapQuery: place.mapQuery,
        costNote: place.costNote,
        hours: place.hours,
        phone: place.phone,
        website: place.website,
      },
    });
  }

  // Reproduce what every existing public /explore guide shows, in order.
  // This is required to preserve cross-guide memberships on a future cutover.
  for (const guide of guides) {
    const seen = new Set<string>();
    guidePlaces(guide.slug).forEach((place, position) => {
      if (!unique.has(place.slug)) {
        problems.push({ slug: place.slug, reason: "unresolved_shared_place", detail: guide.slug });
      }
      // Do not erase a repeated appearance: it is current-public parity data.
      memberships.push({ placeSlug: place.slug, guideSlug: guide.slug, position });
      seen.add(place.slug);
    });
  }

  const reasons = problems.reduce<Record<string, number>>((acc, problem) => {
    acc[problem.reason] = (acc[problem.reason] ?? 0) + 1;
    return acc;
  }, {});
  return {
    sourceCount: places.length,
    uniqueCount: unique.size,
    guideCount: guides.length,
    membershipCount: memberships.length,
    candidates, memberships, problems,
    problemsByReason: reasons,
    // No import, no publication review, and no parity cutover have happened.
    productionCutoverApproved: false as const,
  };
}

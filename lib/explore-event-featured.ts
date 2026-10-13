import type { ExploreGuide } from "@/lib/explore";
import { todayIsoNigeria } from "@/lib/job-runtime";

// End dates are taken from the linked canonical event guides, not from
// popularity or content review timestamps. Only individually dated events
// may be promoted to the "Upcoming events" shelf. Unknown dates are excluded.
// Review this small registry when a canonical event schedule is corrected.
export const featuredEventEndDates: Readonly<Record<string, string>> = {
  "ecowas-food-cultural-festival-benin-2026": "2026-10-31",
  "ofala-onitsha-2026": "2026-10-25",
  "benin-royal-coronation-anniversary-2026": "2026-11-21",
  "10th-afrigeo-symposium-abuja-2026": "2026-10-08",
  "abuja-festival-literature-ideas-2026": "2026-10-10",
  "abuja-study-abroad-expo-2026": "2026-10-12",
  "cocoa-xp-dotti-abuja-2026": "2026-10-16",
  "nifafest-abuja-2026": "2026-10-17",
  "african-traditional-food-fair-abuja-2026": "2026-10-17",
  "smfest-abuja-2026": "2026-10-18",
  "fashion-fables-runway-africa-abuja-2026": "2026-10-18",
  "abuja-international-film-festival-2026": "2026-10-24",
  "hallelujah-festival-lagos-october-2026": "2026-10-30",
  "festmint-abuja-2026": "2026-11-06",
  "abuja-international-afrojazz-festival-2026": "2026-11-21",
  "carnival-calabar-2026": "2027-01-01",
};

export function getUpcomingEventGuides(
  guides: readonly ExploreGuide[],
  todayIso = todayIsoNigeria(),
  limit = 4,
): ExploreGuide[] {
  if (limit <= 0) return [];
  return guides
    .filter((guide) => {
      const endsOn = featuredEventEndDates[guide.slug];
      return guide.kind === "event" && Boolean(endsOn && endsOn >= todayIso);
    })
    .sort((a, b) =>
      (featuredEventEndDates[a.slug] ?? "").localeCompare(featuredEventEndDates[b.slug] ?? "") ||
      b.lastReviewed.localeCompare(a.lastReviewed) ||
      a.shortTitle.localeCompare(b.shortTitle)
    )
    .slice(0, Math.floor(limit));
}

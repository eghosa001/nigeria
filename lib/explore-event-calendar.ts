import type { ExploreGuide } from "@/lib/explore";
import { featuredEventEndDates } from "@/lib/explore-event-featured";

/**
 * Sorting is based on independently recorded event end dates, not the page's
 * last-reviewed timestamp. Unknown dates never get a false "upcoming" label.
 */
export function groupEventCalendar(
  guides: readonly ExploreGuide[],
  todayIso: string,
) {
  const dated: ExploreGuide[] = [];
  const past: ExploreGuide[] = [];
  const needsDateCheck: ExploreGuide[] = [];
  for (const guide of guides) {
    const endDate = featuredEventEndDates[guide.slug];
    if (!endDate) needsDateCheck.push(guide);
    else if (endDate < todayIso) past.push(guide);
    else dated.push(guide);
  }
  dated.sort((a, b) =>
    featuredEventEndDates[a.slug].localeCompare(featuredEventEndDates[b.slug]) ||
    a.shortTitle.localeCompare(b.shortTitle));
  past.sort((a, b) =>
    featuredEventEndDates[b.slug].localeCompare(featuredEventEndDates[a.slug]) ||
    a.shortTitle.localeCompare(b.shortTitle));
  needsDateCheck.sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
  return { dated, past, needsDateCheck };
}

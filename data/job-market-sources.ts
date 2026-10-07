export type JobMarketSource = {
  key: string;
  name: string;
  href: string;
  checkedAt: string;
  observedCount?: number;
  countLabel: string;
  note: string;
  integration: "external-live" | "feed-eligible";
};

export const JOBS_LIVE_INVENTORY_TARGET = 2500;

export const jobMarketSources: JobMarketSource[] = [
  {
    key: "jobberman",
    name: "Jobberman Nigeria",
    href: "https://www.jobberman.com/jobs",
    checkedAt: "2026-10-07",
    observedCount: 4204,
    countLabel: "4,204 jobs observed",
    note: "Broad Nigeria-wide market signal across entry-level, experienced, remote and specialist roles. Use the live source for the freshest count.",
    integration: "external-live",
  },
  {
    key: "linkedin",
    name: "LinkedIn Jobs Nigeria",
    href: "https://ng.linkedin.com/jobs/search",
    checkedAt: "2026-10-07",
    observedCount: 2000,
    countLabel: "2,000+ Nigeria jobs observed",
    note: "Broad Nigeria job discovery source with company, location, job-type and experience filters. Some actions may require LinkedIn sign-in.",
    integration: "external-live",
  },
  {
    key: "myjobmag",
    name: "MyJobMag Nigeria",
    href: "https://www.myjobmag.com/",
    checkedAt: "2026-10-07",
    countLabel: "Continuously updated Nigeria listings",
    note: "MyJobMag publishes current Nigerian vacancies and explicitly offers website widgets and XML/RSS feed options for approved job-site integrations.",
    integration: "feed-eligible",
  },
];

export function largestObservedNigeriaJobMarketCount() {
  return Math.max(0, ...jobMarketSources.map((source) => source.observedCount ?? 0));
}

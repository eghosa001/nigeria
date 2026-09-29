export type SearchQueryOverride = Partial<{
  fee: string;
  requirements: string;
  online: string;
  timeline: string;
  start: string;
}>;

/**
 * Populate only from real Search Console query wording once impressions exist.
 * Answers remain derived from verified Service data; this layer changes wording only.
 */
export const searchQueryOverrides: Record<string, SearchQueryOverride> = {};

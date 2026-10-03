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
export const searchQueryOverrides: Record<string, SearchQueryOverride> = {
  "cac-company-registration": {
    fee: "How much is CAC company registration and payment?",
    requirements: "What CAC registration form and documents do I need?",
    online: "Can I complete the CAC registration process online?",
    timeline: "How long does CAC company registration take?",
    start: "What is the CAC registration process?",
  },
  "cac-status-report": {
    fee: "How much does a CAC status report cost?",
    requirements: "What do I need to get a CAC report?",
    online: "Can I get a CAC status report online?",
    timeline: "How long does a CAC status report take?",
    start: "How do I get a CAC report or status report?",
  },
};

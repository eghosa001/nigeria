import type { CareerOpportunity, JobPostingMetadata } from "@/lib/jobs";

// Posted dates and locations observed on these exact employer adverts.
// This does NOT grant JobPosting structured-data authorization, promise
// current rolling availability, or infer an unannounced closing date.
export const officialJobPostingEvidence20261015: Record<string, {
  posting: JobPostingMetadata;
  sourceUrl: string;
}> = {
  "dangote-ibese-mechanical-technician-l12-2026": {
    posting: {
      jobTitle: "Technician, Mechanical L1&2",
      datePosted: "2026-10-10",
      locations: [{ locality: "Ibese", region: "Ogun State", country: "NG" }],
    },
    sourceUrl: "https://careers.dangote.com/job/Ibese-Plant-Technician%2C-Mechanical-L1%262-Ibes/820138802/",
  },
  "dangote-ibese-power-plant-mechanical-engineer-2026": {
    posting: {
      jobTitle: "Mechanical Engineer - Power Plant",
      datePosted: "2026-10-07",
      locations: [{ locality: "Ibese", region: "Ogun State", country: "NG" }],
    },
    sourceUrl: "https://careers.dangote.com/job/Ibese-Plant-Mechanical-Engineer-Power-Plant-Ibes/820440602/",
  },
  "dangote-lagos-audit-analyst-2026": {
    posting: {
      jobTitle: "Audit Analyst for Nigeria",
      datePosted: "2026-10-09",
      locations: [{ locality: "Lagos", region: "Lagos State", country: "NG" }],
    },
    sourceUrl: "https://careers.dangote.com/job/Head-Office-Lagos-Audit-Analyst-Head/1374485457/",
  },
};

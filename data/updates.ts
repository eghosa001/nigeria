export type MyNigeriaGuideUpdate = {
  id: string;
  date: string;
  type: "fee" | "process" | "deadline" | "clarification";
  agency: string;
  title: string;
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
  affectedServices: string[];
};

export const myNigeriaGuideUpdates: MyNigeriaGuideUpdate[] = [
  {
    id: "jamb-2026-fee-clarification",
    date: "2026-03-02",
    type: "clarification",
    agency: "JAMB",
    title: "JAMB confirms no increase in 2026 UTME registration fees",
    summary: "JAMB publicly reaffirmed the approved 2026 totals: ₦5,700 for Direct Entry, ₦7,200 for UTME without mock and ₦8,700 for UTME with mock.",
    sourceLabel: "JAMB Bulletin — 2 March 2026",
    sourceUrl: "https://www.jamb.gov.ng/Bulletin/2026/JAMBulletin_02-03-2026.pdf",
    affectedServices: ["jamb-2026-utme-registration", "jamb-direct-entry-2026"],
  },
  {
    id: "nigerian-tax-id-live",
    date: "2026-01-01",
    type: "process",
    agency: "JRB / NRS",
    title: "New Nigerian Tax ID portal becomes effective",
    summary: "The new Tax ID became effective from 1 January 2026, with individual Tax IDs linked to NIN and non-individual Tax IDs linked to CAC registration numbers.",
    sourceLabel: "Official Tax ID launch notice",
    sourceUrl: "https://fctirs.gov.ng/nigerian-tax-id-portal-goes-live/",
    affectedServices: ["nrs-individual-tax-registration", "nrs-corporate-tax-registration", "edo-tax-id-access"],
  },
  {
    id: "nis-passport-fees-september-2025",
    date: "2025-09-01",
    type: "fee",
    agency: "NIS",
    title: "New Nigerian standard passport fees take effect",
    summary: "For applications made in Nigeria, the standard passport fee changed to ₦100,000 for the 32-page 5-year booklet and ₦200,000 for the 64-page 10-year booklet.",
    sourceLabel: "Nigeria Immigration Service fee review",
    sourceUrl: "https://immigration.gov.ng/nigeria-immigration-service-announces-upward-review-of-nigerian-standard-passport-fees/",
    affectedServices: ["passport-renewal", "first-nigerian-passport"],
  },
  {
    id: "nimc-self-service-device-advisory",
    date: "2025-08-08",
    type: "process",
    agency: "NIMC",
    title: "NIMC clarifies self-service modification account access",
    summary: "NIMC advised that a self-service modification account is tied to the browser and device used during registration, affecting how applicants should access later modification requests.",
    sourceLabel: "NIMC public advisory — 8 August 2025",
    sourceUrl: "https://nimc.gov.ng/press-releases/public-advisory-on-self-service-modification-account-access-and-unlinking--process-",
    affectedServices: ["nin-name-modification", "nin-phone-modification", "nin-address-modification"],
  },
  {
    id: "cac-new-fee-schedule-gazette",
    date: "2025-05-29",
    type: "fee",
    agency: "CAC",
    title: "CAC new schedule of fees published in the Official Gazette",
    summary: "A new Corporate Affairs Commission schedule of fees was published as a supplement to the Federal Republic of Nigeria Official Gazette.",
    sourceLabel: "Federal Republic of Nigeria Official Gazette — 29 May 2025",
    sourceUrl: "https://news.cac.gov.ng/wp-content/uploads/2025/06/New-Schedule-of-Fees-29th-May-2025.pdf",
    affectedServices: ["cac-business-name-registration", "cac-company-registration", "cac-incorporated-trustee-registration", "cac-annual-returns"],
  },
];

export function updateTypeLabel(type: MyNigeriaGuideUpdate["type"]) {
  if (type === "fee") return "Fee update";
  if (type === "deadline") return "Deadline";
  if (type === "clarification") return "Official clarification";
  return "Process update";
}

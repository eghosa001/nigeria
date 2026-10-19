import type { Service } from "@/lib/types";

// Source-specific additions verified 19 October 2026 against JAMB's own CAPS
// and e-Facility pages, its support FAQ, and contemporaneous reporting.
// A university's provisional offer is not the JAMB-issued admission letter.
const issuerSources = [
  { label: "JAMB — Central Admissions Processing System (CAPS), candidate acceptance and official record", agency: "JAMB", url: "https://jamb.gov.ng/caps", lastChecked: "2026-10-19" },
  { label: "JAMB — official candidate e-Facility admissions and printing services", agency: "JAMB", url: "https://efacility.jamb.gov.ng/account/", lastChecked: "2026-10-19" },
  { label: "JAMB — support FAQ: offer not reflected on CAPS", agency: "JAMB", url: "https://support.jamb.gov.ng/faqs", lastChecked: "2026-10-19" },
];

export const refreshedAdmissionsSlugs20261019 = ["jamb-caps", "jamb-admission-letter"] as const;

export function applyAdmissionDecisionResearch20261019(item: Service): Service {
  if (item.slug !== "jamb-caps" && item.slug !== "jamb-admission-letter") return item;
  const sources = [...item.sources];
  for (const src of issuerSources) {
    if (!sources.some(existing => existing.url === src.url)) sources.push(src);
  }
  if (item.slug === "jamb-caps") {
    return {
      ...item,
      summary: "Use the candidate's own JAMB e-Facility account to check a 2026/2027 CAPS admission, verify the institution and course, and accept or reject only an offer actually shown. A school's admission notice is not the JAMB-issued admission letter. If the school's offer is absent from CAPS, resolve the institutional recommendation or O'level upload instead of paying an agent for a letter.",
      notes: [
        "JAMB's CAPS guidance makes the candidate's acceptance and the Board's recognised admission record separate from an institution's internal shortlist or offer notice. Do not treat a school notice alone as proof that a recognised JAMB admission letter can be printed.",
        "If an institution says it offered admission but CAPS still shows Not Admitted or Admission in Progress, JAMB's support FAQ asks candidates to check O'level upload, institutional recommendation and pending transfer approvals. Follow up with the institution or raise a JAMB support ticket; do not manufacture a status through a third party.",
        "An applicant should not open the separate institution/staff CAPS login with ordinary candidate credentials. Start from candidate e-Facility; admission letter printing is a distinct charged service after recognised admission.",
        ...item.notes.filter(note => !/institution's provisional admission outside CAPS/i.test(note)),
      ],
      sources,
      lastVerified: "2026-10-19",
    };
  }
  return {
    ...item,
    summary: "Only print an official JAMB admission letter after your admission is recognised in the candidate's JAMB e-Facility/CAPS record. A university's provisional letter is not the JAMB-issued document. Confirm the correct course, institution and admission year first; use the separate paid Print Admission Letter transaction only after recognition, and recover a failed payment from the existing transaction rather than paying twice.",
    notes: [
      "If your school's offer is missing from CAPS, return to the admission-status process and confirm the institution submitted the recommendation and your O'level record is complete. Paying to print a letter cannot independently create a recognised admission.",
      "If the institution or course differs, do not keep buying new printouts. Investigate the JAMB change/regularisation process separately and confirm the relevant official fee before applying.",
      ...item.notes,
    ],
    sources,
    lastVerified: "2026-10-19",
  };
}

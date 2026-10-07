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
    id: "nis-uk-passport-intervention-october-2026",
    date: "2026-10-07",
    type: "process",
    agency: "Nigeria Immigration Service / Nigeria High Commission London",
    title: "UK Special Passport Intervention runs 6–30 October in four cities",
    summary: "Phase 2 of the special passport intervention is running in Manchester, London, Cardiff and Aberdeen from 6–30 October 2026. The High Commission lists a £20 standard administrative charge, specific intervention documents and a prepaid Royal Mail return envelope.",
    sourceLabel: "Nigeria High Commission London — Special Passport Intervention Phase 2",
    sourceUrl: "https://www.nigeriahc.org.uk/",
    affectedServices: ["nis-uk-passport-intervention-october-2026", "passport-renewal", "passport-application-abroad"],
  },
  {
    id: "inec-fake-voter-registration-site-october-2026",
    date: "2026-10-03",
    type: "clarification",
    agency: "INEC",
    title: "INEC warns against fake voter-registration website",
    summary: "INEC disowned a circulating Blogspot site claiming a new September–October registration window and said the nationwide voter-registration exercise had ended on 26 July 2026. Use only INEC's official domains and current portal notices.",
    sourceLabel: "INEC public warning reported by TheCable",
    sourceUrl: "https://www.thecable.ng/inec-alerts-nigerians-to-fake-voter-registration-website-says-exercise-ended-in-july/",
    affectedServices: ["inec-voter-registration-status-october-2026", "inec-pvc-status"],
  },
  {
    id: "nibss-bvn-retrieval-current-fee",
    date: "2026-10-05",
    type: "clarification",
    agency: "NIBSS",
    title: "NIBSS confirms *565*0# for BVN retrieval at ₦20",
    summary: "NIBSS currently lists *565*0# as the BVN retrieval code. It must be dialled from the phone number registered to the BVN, and the published service fee is ₦20.",
    sourceLabel: "NIBSS USSD Validation Services",
    sourceUrl: "https://nibss-plc.com.ng/ussd-validation-services/",
    affectedServices: ["bvn-retrieval"],
  },
  {
    id: "nis-ecowas-certificate-current-fees",
    date: "2026-10-05",
    type: "fee",
    agency: "Nigeria Immigration Service",
    title: "NIS schedule lists ECOWAS Travel Certificate at ₦2,600 fresh / ₦1,300 renewal",
    summary: "The current NIS service-level schedule lists ₦2,600 for a fresh ECOWAS Travel Certificate and ₦1,300 for renewal, excluding bank charges, with a 24-hour service target for a complete application.",
    sourceLabel: "Nigeria Immigration Service service-level schedule",
    sourceUrl: "https://immigration.gov.ng/wp-content/uploads/2026/03/SERVICE-LEVEL-AGREEMENT-2025.pdf",
    affectedServices: ["ecowas-travel-certificate"],
  },
  {
    id: "jamb-caps-2026-admissions-active",
    date: "2026-10-04",
    type: "process",
    agency: "JAMB",
    title: "JAMB CAPS is processing the 2026/2027 admission cycle",
    summary: "JAMB's current CAPS dashboard is operating for the 2026/2027 admission year. The 2026 admission policy retains a minimum tolerable score of 150 for universities and colleges of nursing, 100 for polytechnics and related institutions, and a general minimum admission age of 16.",
    sourceLabel: "JAMB CAPS and 2026 admission policy",
    sourceUrl: "https://jamb.gov.ng/caps",
    affectedServices: ["jamb-caps", "jamb-admission-letter"],
  },
  {
    id: "cac-business-name-annual-returns-ai-upgrade",
    date: "2026-10-04",
    type: "process",
    agency: "CAC",
    title: "CAC updates business-name annual returns while preparing AI-powered processing",
    summary: "CAC's current CRP notice says annual-return filing is available for business names registered before July 2025 and that an AI-powered process is being introduced to support both older and newer business names.",
    sourceLabel: "CAC Company Registration Portal notice",
    sourceUrl: "https://icrp.cac.gov.ng/",
    affectedServices: ["cac-annual-returns"],
  },

  {
    id: "neco-2026-ssce-internal-fee", date: "2026-01-01", type: "fee", agency: "NECO",
    title: "NECO sets 2026 SSCE Internal registration at ₦30,000",
    summary: "NECO's official 2026 guidelines set the SSCE Internal registration fee at ₦30,000 per candidate, inclusive of the four-figure mathematical table and waterproof certificate jacket/folder. Late registration adds ₦5,000; stamp duty, service and Remita charges also apply.",
    sourceLabel: "NECO 2026 SSCE Internal Registration Guidelines", sourceUrl: "https://neco.gov.ng/2026%20GUIDELINES.pdf",
    affectedServices: ["neco-2026-ssce-internal-registration"],
  },
  {
    id: "nimc-fee-page-conflict", date: "2026-09-28", type: "clarification", agency: "NIMC",
    title: "NIMC official pages currently show conflicting modification fees",
    summary: "NIMC's dedicated Fees page lists ₦2,000 per ordinary updatable field and ₦28,574 for date-of-birth modification, while an older adult-modification page still states ₦15,000 for date of birth. MyNigeriaGuide follows the dedicated Fees page and flags the conflict instead of hiding it.",
    sourceLabel: "NIMC current Fees page", sourceUrl: "https://nimc.gov.ng/fees",
    affectedServices: ["nin-date-of-birth-modification", "nin-name-modification", "nin-phone-modification", "nin-address-modification"],
  },
  {
    id: "waec-confirmation-fee-clarification", date: "2026-09-28", type: "clarification", agency: "WAEC",
    title: "WAEC current FAQ confirms ₦19,500 local and ₦39,000 overseas result confirmation",
    summary: "WAEC's current FAQ repeatedly lists ₦19,500 per result for institutions within Nigeria and ₦39,000 for overseas institutions. A separate WAEC requirements page displays ₦39,000,000 for international confirmation; the repeated FAQ figure is used while the official-page inconsistency is clearly flagged.",
    sourceLabel: "WAEC Nigeria FAQ", sourceUrl: "https://www.waecnigeria.org/faq",
    affectedServices: ["waec-confirm-result-nigeria", "waec-result-confirmation-overseas"],
  },
  {
    id: "police-character-certificate-current-fee", date: "2026-09-28", type: "clarification", agency: "Nigeria Police / POSSAP",
    title: "Current POSSAP invoices show ₦30,000 for Police Character Certificates",
    summary: "Current official POSSAP invoice pages show a ₦30,000 charge for Police Character Certificate requests, including diaspora examples. This is recorded as a current observed official charge, not presented as a newly announced fee increase.",
    sourceLabel: "Police Specialized Services Automation Project (POSSAP)", sourceUrl: "https://possap.gov.ng/",
    affectedServices: [],
  },
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

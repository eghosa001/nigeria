export type GrowthHub = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string[];
  searches: Array<{ query: string; serviceSlug: string }>;
  serviceSlugs: string[];
};

export const growthHubs: GrowthHub[] = [
  {
    slug: "nigerian-passport",
    title: "Nigerian Passport Guide 2026",
    shortTitle: "Nigerian passport",
    description: "Renew, replace, correct or apply for a Nigerian passport with source-linked requirements, current fees and official NIS routes.",
    intro: [
      "Use this hub when you need a Nigerian passport and are not sure which process applies to your situation. It separates fresh applications, renewals, applications from abroad, lost passports and data changes so you can start with the right NIS route.",
      "Each linked guide shows the current fee or status, what to prepare, the official application portal and what happens after submission or biometric enrolment."
    ],
    searches: [{ query: "renew Nigerian passport", serviceSlug: "passport-renewal" }, { query: "Nigerian passport requirements", serviceSlug: "first-nigerian-passport" }, { query: "passport renewal fee", serviceSlug: "passport-renewal" }, { query: "lost Nigerian passport", serviceSlug: "lost-nigerian-passport" }, { query: "renew Nigerian passport abroad", serviceSlug: "passport-application-abroad" }],
    serviceSlugs: ["passport-renewal", "first-nigerian-passport", "passport-application-abroad", "lost-nigerian-passport", "passport-name-change", "passport-change-of-data"]
  },
  {
    slug: "nin-corrections",
    title: "NIN Registration & Correction Guide 2026",
    shortTitle: "NIN corrections",
    description: "Find the correct NIMC process for NIN enrolment, date-of-birth, name, phone and address changes, plus NIN slip reissue.",
    intro: [
      "NIN requests are easy to mix up because enrolment, self-service modifications and slip reissue use different routes. This hub groups the main NIMC tasks so you can go straight to the exact correction or enrolment process.",
      "Before paying, open the relevant guide to confirm the current fee, required evidence and whether the task is completed online or needs an enrolment centre."
    ],
    searches: [{ query: "NIN date of birth correction", serviceSlug: "nin-date-of-birth-modification" }, { query: "change name on NIN", serviceSlug: "nin-name-modification" }, { query: "change phone number on NIN", serviceSlug: "nin-phone-modification" }, { query: "NIN enrolment", serviceSlug: "nin-enrolment" }, { query: "replace NIN slip", serviceSlug: "nin-slip-reissue" }],
    serviceSlugs: ["nin-enrolment", "nin-date-of-birth-modification", "nin-name-modification", "nin-phone-modification", "nin-address-modification", "nin-slip-reissue"]
  },
  {
    slug: "bvn",
    title: "BVN Guide: Enrolment, Retrieval & Corrections",
    shortTitle: "BVN services",
    description: "Get, retrieve or correct your BVN, including the official route for Nigerians abroad.",
    intro: [
      "Use this hub for the most common BVN tasks: first-time enrolment, retrieving an existing BVN, correcting details and obtaining a BVN while outside Nigeria.",
      "The linked guides separate bank or NIBSS steps from unofficial advice and explain the evidence or channel required for each task."
    ],
    searches: [{ query: "retrieve BVN", serviceSlug: "bvn-retrieval" }, { query: "forgot my BVN", serviceSlug: "bvn-retrieval" }, { query: "change phone number on BVN", serviceSlug: "bvn-change-details" }, { query: "BVN enrolment", serviceSlug: "bvn-enrolment" }, { query: "BVN for Nigerians abroad", serviceSlug: "non-resident-bvn" }],
    serviceSlugs: ["bvn-enrolment", "bvn-retrieval", "bvn-change-details", "non-resident-bvn"]
  },
  {
    slug: "jamb-2026",
    title: "JAMB 2026 Guide: Registration, CAPS, Results & Admission",
    shortTitle: "JAMB 2026",
    description: "JAMB 2026 registration, Direct Entry, profile codes, CAPS, results and admission documents in one source-linked hub.",
    intro: [
      "This hub brings together the JAMB tasks candidates commonly need before, during and after registration. Start with the exact task instead of searching through several unrelated pages.",
      "The guides cover official JAMB fees and routes, profile-code issues, CAPS, result slips and admission letters, with links back to JAMB sources."
    ],
    searches: [{ query: "JAMB registration 2026", serviceSlug: "jamb-2026-utme-registration" }, { query: "JAMB Direct Entry 2026", serviceSlug: "jamb-direct-entry-2026" }, { query: "JAMB profile code", serviceSlug: "jamb-profile-code" }, { query: "JAMB CAPS", serviceSlug: "jamb-caps" }, { query: "print JAMB result", serviceSlug: "jamb-print-result" }, { query: "JAMB admission letter", serviceSlug: "jamb-admission-letter" }],
    serviceSlugs: ["jamb-2026-utme-registration", "jamb-direct-entry-2026", "jamb-profile-code", "jamb-retrieve-profile-code", "jamb-caps", "jamb-print-result", "jamb-admission-letter"]
  },
  {
    slug: "nysc",
    title: "NYSC Guide: Registration, Senate List, Call-Up & Relocation",
    shortTitle: "NYSC",
    description: "NYSC registration, senate-list checks, call-up letters, relocation, corrections and exemption guidance for prospective corps members.",
    intro: [
      "Use this NYSC hub from mobilisation through camp and post-registration issues. It links the main actions prospective corps members search for instead of making you guess which NYSC page applies.",
      "Each guide explains what you need to prepare, where the official action happens and what to do next if your record, call-up or relocation process needs attention."
    ],
    searches: [{ query: "NYSC registration", serviceSlug: "nysc-registration-local" }, { query: "NYSC senate list", serviceSlug: "nysc-senate-list" }, { query: "NYSC call up letter", serviceSlug: "nysc-call-up-letter" }, { query: "NYSC relocation", serviceSlug: "nysc-relocation" }, { query: "NYSC date of birth correction", serviceSlug: "nysc-correct-date-of-birth" }, { query: "NYSC exemption certificate", serviceSlug: "nysc-exemption-certificate" }],
    serviceSlugs: ["nysc-registration-local", "nysc-senate-list", "nysc-call-up-letter", "nysc-relocation", "nysc-correct-date-of-birth", "nysc-exemption-certificate"]
  },
  {
    slug: "cac-business",
    title: "CAC Business Registration & Filing Guide",
    shortTitle: "CAC business",
    description: "Register a business or company with CAC and find common post-registration filings, status reports and certified copies.",
    intro: [
      "This hub groups the CAC tasks most business owners need from choosing a name through registration and later compliance documents.",
      "Use the exact guide for your task because business-name registration, company incorporation, annual returns and certified documents have different requirements and fees."
    ],
    searches: [{ query: "register business name CAC", serviceSlug: "cac-business-name-registration" }, { query: "register company CAC", serviceSlug: "cac-company-registration" }, { query: "CAC name reservation", serviceSlug: "cac-name-reservation" }, { query: "CAC annual returns", serviceSlug: "cac-annual-returns" }, { query: "CAC certified true copy", serviceSlug: "cac-certified-true-copy" }, { query: "CAC status report", serviceSlug: "cac-status-report" }],
    serviceSlugs: ["cac-business-name-registration", "cac-company-registration", "cac-name-reservation", "cac-annual-returns", "cac-certified-true-copy", "cac-status-report"]
  },
  {
    slug: "drivers-licence",
    title: "Nigerian Driver’s Licence Guide",
    shortTitle: "Driver’s licence",
    description: "Apply for, renew, replace or change classes on a Nigerian driver’s licence with the official FRSC route.",
    intro: [
      "Use this hub to identify the right driver’s-licence process before visiting a centre or paying. New applications, renewals, lost licences and class changes are separate tasks.",
      "The linked guides explain the official route, preparation steps and current fee/status information available from FRSC sources."
    ],
    searches: [{ query: "renew Nigerian driver\'s licence", serviceSlug: "renew-drivers-licence" }, { query: "new driver\'s licence Nigeria", serviceSlug: "new-drivers-licence" }, { query: "replace lost driver\'s licence", serviceSlug: "replace-lost-drivers-licence" }, { query: "driver\'s licence fee Nigeria", serviceSlug: "renew-drivers-licence" }, { query: "upgrade driver\'s licence class", serviceSlug: "upgrade-drivers-licence-class" }],
    serviceSlugs: ["renew-drivers-licence", "new-drivers-licence", "replace-lost-drivers-licence", "upgrade-drivers-licence-class"]
  },
  {
    slug: "birth-records",
    title: "Nigeria Birth Certificate & NPC Records Guide",
    shortTitle: "Birth records",
    description: "Birth registration, adult attestation, digital certificate reissuance, reprints and record modifications through NPC.",
    intro: [
      "This hub separates child birth registration from adult attestation and from later certificate or record changes. Choose the task that matches the record you already have.",
      "Each guide points to the NPC route used for that service and explains the documents, steps and follow-up involved."
    ],
    searches: [{ query: "birth certificate Nigeria", serviceSlug: "npc-child-birth-registration" }, { query: "NPC birth attestation", serviceSlug: "npc-birth-attestation" }, { query: "reprint birth certificate", serviceSlug: "npc-birth-certificate-reprint" }, { query: "digital birth certificate Nigeria", serviceSlug: "npc-digital-birth-certificate-reissuance" }, { query: "correct birth record Nigeria", serviceSlug: "npc-modify-birth-record" }],
    serviceSlugs: ["npc-child-birth-registration", "npc-birth-attestation", "npc-digital-birth-certificate-reissuance", "npc-birth-certificate-reprint", "npc-modify-birth-record"]
  },
  {
    slug: "visitor-visas",
    title: "Visitor Visa Guides for Nigerians",
    shortTitle: "Visitor visas",
    description: "Official visitor-visa routes for Nigerians applying to the UK, Canada, United States, France/Schengen and Australia.",
    intro: [
      "Use this hub to compare the official starting points for popular visitor-visa destinations without mixing requirements between countries.",
      "Open the destination guide for country-specific fees, documents, biometrics, financial evidence and application steps. Visa rules differ, so the destination authority remains the final source."
    ],
    searches: [{ query: "UK visitor visa Nigeria", serviceSlug: "uk-standard-visitor-visa" }, { query: "Canada visitor visa Nigeria", serviceSlug: "canada-visitor-visa" }, { query: "US B1 B2 visa Nigeria", serviceSlug: "us-b1-b2-visitor-visa" }, { query: "Schengen visa Nigeria", serviceSlug: "france-schengen-short-stay-visa" }, { query: "Australia visitor visa Nigeria", serviceSlug: "australia-visitor-visa-600" }],
    serviceSlugs: ["uk-standard-visitor-visa", "canada-visitor-visa", "us-b1-b2-visitor-visa", "france-schengen-short-stay-visa", "australia-visitor-visa-600", "uae-tourist-visa", "south-africa-holiday-visa", "ireland-short-stay-visit-visa", "germany-schengen-tourist-visa", "italy-schengen-tourist-visa", "spain-schengen-tourist-visa", "netherlands-schengen-visa", "turkiye-tourist-visa", "china-tourist-visa-nigeria"]
  },
  {
    slug: "schengen-visas-nigeria",
    title: "Schengen Visa Guides for Nigerians 2026",
    shortTitle: "Schengen visas",
    description: "Compare Schengen visa routes from Nigeria for Germany, France, Italy, Spain and the Netherlands, with official requirements, fees and submission centres.",
    intro: [
      "Use this hub when your trip is to the Schengen area and you need to identify the correct destination guide. Each country page keeps its own Nigeria-specific submission route, documents, fee guidance and official sources.",
      "Apply through the country responsible for your trip under Schengen rules rather than choosing a visa centre only because it is convenient. Open the destination guide below for the current Nigerian application route."
    ],
    searches: [
      { query: "Germany visa from Nigeria", serviceSlug: "germany-schengen-tourist-visa" },
      { query: "France Schengen visa Nigeria", serviceSlug: "france-schengen-short-stay-visa" },
      { query: "Italy tourist visa Nigeria", serviceSlug: "italy-schengen-tourist-visa" },
      { query: "Spain Schengen visa Nigeria", serviceSlug: "spain-schengen-tourist-visa" },
      { query: "Netherlands visa Nigeria", serviceSlug: "netherlands-schengen-visa" }
    ],
    serviceSlugs: ["germany-schengen-tourist-visa", "france-schengen-short-stay-visa", "italy-schengen-tourist-visa", "spain-schengen-tourist-visa", "netherlands-schengen-visa"]
  }
];

export function getGrowthHub(slug: string) {
  return growthHubs.find((hub) => hub.slug === slug);
}

export function getGrowthHubsForService(serviceSlug: string) {
  return growthHubs.filter((hub) => hub.serviceSlugs.includes(serviceSlug));
}

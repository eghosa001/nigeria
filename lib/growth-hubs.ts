export type GrowthHub = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string[];
  searches: string[];
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
    searches: ["renew Nigerian passport", "Nigerian passport requirements", "passport renewal fee", "lost Nigerian passport", "renew Nigerian passport abroad"],
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
    searches: ["NIN date of birth correction", "change name on NIN", "change phone number on NIN", "NIN enrolment", "replace NIN slip"],
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
    searches: ["retrieve BVN", "forgot my BVN", "change phone number on BVN", "BVN enrolment", "BVN for Nigerians abroad"],
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
    searches: ["JAMB registration 2026", "JAMB Direct Entry 2026", "JAMB profile code", "JAMB CAPS", "print JAMB result", "JAMB admission letter"],
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
    searches: ["NYSC registration", "NYSC senate list", "NYSC call up letter", "NYSC relocation", "NYSC date of birth correction", "NYSC exemption certificate"],
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
    searches: ["register business name CAC", "register company CAC", "CAC name reservation", "CAC annual returns", "CAC certified true copy", "CAC status report"],
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
    searches: ["renew Nigerian driver's licence", "new driver's licence Nigeria", "replace lost driver's licence", "driver's licence fee Nigeria", "upgrade driver's licence class"],
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
    searches: ["birth certificate Nigeria", "NPC birth attestation", "reprint birth certificate", "digital birth certificate Nigeria", "correct birth record Nigeria"],
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
    searches: ["UK visitor visa Nigeria", "Canada visitor visa Nigeria", "US B1 B2 visa Nigeria", "Schengen visa Nigeria", "Australia visitor visa Nigeria"],
    serviceSlugs: ["uk-standard-visitor-visa", "canada-visitor-visa", "us-b1-b2-visitor-visa", "france-schengen-short-stay-visa", "australia-visitor-visa-600"]
  }
];

export function getGrowthHub(slug: string) {
  return growthHubs.find((hub) => hub.slug === slug);
}

export function getGrowthHubsForService(serviceSlug: string) {
  return growthHubs.filter((hub) => hub.serviceSlugs.includes(serviceSlug));
}

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
    title: "Nigerian Passport Application & Renewal Guide 2026",
    shortTitle: "Nigerian passport",
    description: "Renew, replace, correct or apply for a Nigerian passport with source-linked requirements, current fees and official NIS routes.",
    intro: [
      "Use this hub when you need a Nigerian passport and are not sure which process applies to your situation. It separates fresh applications, renewals, applications from abroad, lost passports and data changes so you can start with the right NIS route.",
      "Each linked guide shows the current fee or status, what to prepare, the official application portal and what happens after submission or biometric enrolment."
    ],
    searches: [{ query: "renew Nigerian passport", serviceSlug: "passport-renewal" }, { query: "Nigerian passport requirements", serviceSlug: "first-nigerian-passport" }, { query: "passport renewal fee", serviceSlug: "passport-renewal" }, { query: "lost Nigerian passport", serviceSlug: "lost-nigerian-passport" }, { query: "renew Nigerian passport abroad", serviceSlug: "passport-application-abroad" }, { query: "contactless Nigerian passport renewal", serviceSlug: "diaspora-contactless-passport-renewal" }],
    serviceSlugs: ["passport-renewal", "first-nigerian-passport", "passport-application-abroad", "diaspora-contactless-passport-renewal", "lost-nigerian-passport", "passport-name-change", "passport-change-of-data"]
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
    title: "BVN Guide: Enrolment, Retrieval & NRBVN",
    shortTitle: "BVN services",
    description: "Get or retrieve your BVN and use the official NRBVN route for eligible Nigerians abroad.",
    intro: [
      "Use this hub for first-time BVN enrolment, retrieving an existing BVN and obtaining a BVN through the non-resident route while outside Nigeria.",
      "The linked guides separate bank and NIBSS routes from unofficial advice and point you to the exact channel for each supported BVN task."
    ],
    searches: [{ query: "retrieve BVN", serviceSlug: "bvn-retrieval" }, { query: "forgot my BVN", serviceSlug: "bvn-retrieval" }, { query: "BVN enrolment", serviceSlug: "bvn-enrolment" }, { query: "BVN for Nigerians abroad", serviceSlug: "non-resident-bvn" }],
    serviceSlugs: ["bvn-enrolment", "bvn-retrieval", "non-resident-bvn"]
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
    searches: [{ query: "JAMB registration 2026", serviceSlug: "jamb-2026-utme-registration" }, { query: "JAMB Direct Entry 2026", serviceSlug: "jamb-direct-entry-2026" }, { query: "JAMB profile code", serviceSlug: "jamb-profile-code" }, { query: "JAMB CAPS", serviceSlug: "jamb-caps" }, { query: "print JAMB result", serviceSlug: "jamb-print-result" }, { query: "JAMB admission letter", serviceSlug: "jamb-admission-letter" }, { query: "JAMB change of institution", serviceSlug: "jamb-change-course-institution" }, { query: "JAMB name correction", serviceSlug: "jamb-change-name" }, { query: "JAMB date of birth correction", serviceSlug: "jamb-correct-date-of-birth" }],
    serviceSlugs: ["jamb-2026-utme-registration", "jamb-direct-entry-2026", "jamb-profile-code", "jamb-retrieve-profile-code", "jamb-caps", "jamb-print-result", "jamb-admission-letter", "jamb-change-course-institution", "jamb-change-name", "jamb-correct-date-of-birth", "jamb-correct-gender", "jamb-correct-state-lga"]
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
  },
  {
    slug: "product-certification-nigeria",
    title: "Product Registration & Certification in Nigeria",
    shortTitle: "Product certification",
    description: "Find the right NAFDAC or SON route for product registration, verification, MANCAP and SONCAP certification in Nigeria.",
    intro: [
      "Product regulation in Nigeria depends on what you make, sell or import. This hub separates NAFDAC registration from SON product registration, local-manufacturing MANCAP and import-focused SONCAP so businesses can start with the correct regulator.",
      "Open the exact guide before paying or shipping goods. Each page keeps the official source, current fee/status guidance, required documents and the next step after submission."
    ],
    searches: [
      { query: "NAFDAC product registration", serviceSlug: "nafdac-product-registration" },
      { query: "verify NAFDAC number", serviceSlug: "nafdac-product-verification" },
      { query: "SONCAP certificate Nigeria", serviceSlug: "soncap-import-certification" },
      { query: "MANCAP certification", serviceSlug: "son-mancap-certification" },
      { query: "SON product registration", serviceSlug: "son-product-registration" }
    ],
    serviceSlugs: ["nafdac-product-registration", "nafdac-product-verification", "nafdac-product-renewal", "soncap-import-certification", "son-mancap-certification", "son-product-registration"]
  },
  {
    slug: "business-compliance-nigeria",
    title: "Business Registration, IP, Export & Compliance Guide",
    shortTitle: "Business compliance",
    description: "CAC registration, trademarks and patents, SMEDAN, NEPC exporter registration, BPP contractor registration and core compliance routes in one hub.",
    intro: [
      "Starting a business legally is only the first layer. Depending on what the business does, it may also need intellectual-property protection, exporter registration, MSME onboarding, procurement registration or social-insurance compliance.",
      "Use this collection to move from CAC registration into the next official service that matches the business activity instead of assuming one certificate covers every requirement."
    ],
    searches: [
      { query: "register business CAC", serviceSlug: "cac-business-name-registration" },
      { query: "trademark registration Nigeria", serviceSlug: "nipo-trademark-registration" },
      { query: "register exporter NEPC", serviceSlug: "nepc-exporter-registration" },
      { query: "SMEDAN registration", serviceSlug: "smedan-msme-registration" },
      { query: "BPP contractor registration", serviceSlug: "bpp-contractor-registration" }, { query: "SCUML registration", serviceSlug: "scuml-certificate-registration" }, { query: "pension clearance certificate", serviceSlug: "pencom-pension-clearance-certificate" }, { query: "ITF compliance certificate", serviceSlug: "itf-compliance-certificate" }
    ],
    serviceSlugs: ["cac-business-name-registration", "cac-company-registration", "nipo-trademark-registration", "nipo-patent-registration", "nipo-industrial-design-registration", "copyright-work-registration", "smedan-msme-registration", "nepc-exporter-registration", "nepc-exporter-certificate-renewal-verification", "scuml-certificate-registration", "scuml-certificate-verification", "bpp-contractor-registration", "pencom-pension-clearance-certificate", "itf-compliance-certificate", "nsitf-employer-registration", "nsitf-compliance-certificate"]
  },
  {
    slug: "pension-services-nigeria",
    title: "Pension & RSA Services in Nigeria",
    shortTitle: "Pension services",
    description: "Open or transfer an RSA, resolve missing pension contributions, use Micro Pension and understand the 25% job-loss withdrawal route.",
    intro: [
      "This hub groups the pension tasks workers and self-employed Nigerians most often need, from opening an RSA through transfers, contribution problems and access to permitted benefits.",
      "Each guide separates what the PFA handles from what PenCom regulates, so you can use the correct route and avoid unofficial pension-withdrawal offers."
    ],
    searches: [
      { query: "open RSA Nigeria", serviceSlug: "pencom-open-rsa" },
      { query: "change PFA Nigeria", serviceSlug: "pencom-transfer-rsa" },
      { query: "employer not paying pension", serviceSlug: "pencom-unremitted-contributions" },
      { query: "25 percent pension withdrawal", serviceSlug: "pencom-job-loss-25-percent-withdrawal" },
      { query: "micro pension Nigeria", serviceSlug: "pencom-micro-pension-registration" }
    ],
    serviceSlugs: ["pencom-open-rsa", "pencom-transfer-rsa", "pencom-unremitted-contributions", "pencom-job-loss-25-percent-withdrawal", "pencom-micro-pension-registration"]
  },
  {
    slug: "consumer-complaints-nigeria",
    title: "Consumer Complaint & Dispute Routes in Nigeria",
    shortTitle: "Consumer complaints",
    description: "Escalate unresolved bank, telecom, electricity and general consumer complaints to the correct Nigerian regulator.",
    intro: [
      "Many complaints fail because they are sent to the wrong regulator or escalated before the provider has been given the first opportunity to resolve them. This hub separates bank, telecom, electricity and broader consumer-protection routes.",
      "Keep the provider ticket, transaction evidence and complaint chronology before escalating. The linked guides explain the correct regulator and what evidence to retain."
    ],
    searches: [
      { query: "report bank to CBN", serviceSlug: "cbn-bank-complaint" },
      { query: "NCC complaint", serviceSlug: "ncc-telecom-complaint" },
      { query: "electricity complaint NERC", serviceSlug: "electricity-complaint-escalation" },
      { query: "FCCPC consumer complaint", serviceSlug: "fccpc-consumer-complaint" }
    ],
    serviceSlugs: ["cbn-bank-complaint", "ncc-telecom-complaint", "electricity-complaint-escalation", "electricity-estimated-billing-dispute", "fccpc-consumer-complaint"]
  },
  {
    slug: "vehicle-services-nigeria",
    title: "Nigeria Vehicle Registration & Verification Guide",
    shortTitle: "Vehicle services",
    description: "Register and verify a Nigerian vehicle, check ownership, insurance and Customs clearance, and reach the correct driver's-licence guide.",
    intro: [
      "A vehicle can have a valid-looking plate while ownership, insurance or Customs clearance still needs separate verification. This hub groups those checks so buyers and owners can verify the right record.",
      "Driver's-licence services are also linked here because licensing the driver and registering the vehicle are separate processes handled through different official records."
    ],
    searches: [
      { query: "register vehicle Nigeria", serviceSlug: "vehicle-registration-nvis" },
      { query: "verify number plate Nigeria", serviceSlug: "verify-vehicle-number-plate" },
      { query: "verify vehicle ownership Nigeria", serviceSlug: "vehicle-proof-of-ownership-verification" },
      { query: "check vehicle insurance Nigeria", serviceSlug: "vehicle-insurance-validation-ussd" },
      { query: "verify customs duty car Nigeria", serviceSlug: "customs-vehicle-duty-verification" }
    ],
    serviceSlugs: ["vehicle-registration-nvis", "verify-vehicle-number-plate", "vehicle-proof-of-ownership-verification", "vehicle-insurance-validation-ussd", "customs-vehicle-duty-verification", "customs-846-non-standard-vin", "new-drivers-licence", "renew-drivers-licence"]
  },
  {
    slug: "housing-finance-nigeria",
    title: "NHF & FMBN Housing Finance Guide",
    shortTitle: "Housing finance",
    description: "Register for NHF, verify contributions, apply for an FMBN mortgage or renovation loan, and understand contribution refunds.",
    intro: [
      "Use this hub for the main Federal Mortgage Bank and National Housing Fund processes instead of treating NHF contribution, mortgage approval and refunds as the same transaction.",
      "The linked guides explain contribution history, eligibility, current product terms and which official FMBN route to use for each housing-finance task."
    ],
    searches: [
      { query: "NHF registration Nigeria", serviceSlug: "nhf-registration-and-contributions" },
      { query: "FMBN mortgage loan", serviceSlug: "nhf-mortgage-loan" },
      { query: "FMBN home renovation loan", serviceSlug: "fmbn-home-renovation-loan" },
      { query: "NHF refund", serviceSlug: "nhf-contribution-refund" }
    ],
    serviceSlugs: ["nhf-registration-and-contributions", "nhf-mortgage-loan", "fmbn-home-renovation-loan", "nhf-contribution-refund"]
  },
  {
    slug: "employment-support-nigeria",
    title: "Employment, Skills & Worker Protection Services in Nigeria",
    shortTitle: "Employment support",
    description: "Find NDE job-creation programmes and NSITF employer registration, compensation claims and compliance services.",
    intro: [
      "This hub separates employment and skills programmes from workplace social insurance. NDE supports job creation and skills pathways, while NSITF administers the Employees' Compensation Scheme for registered employers and workers.",
      "Use the specific guide for registration, a workplace claim or an employer compliance certificate so the correct evidence reaches the correct agency."
    ],
    searches: [
      { query: "NDE registration 2026", serviceSlug: "nde-rhei-registration" },
      { query: "ITF employer registration", serviceSlug: "itf-employer-registration" }, { query: "ITF compliance certificate", serviceSlug: "itf-compliance-certificate" }, { query: "NSITF registration", serviceSlug: "nsitf-employer-registration" },
      { query: "workplace injury compensation Nigeria", serviceSlug: "nsitf-workplace-injury-claim" },
      { query: "NSITF compliance certificate", serviceSlug: "nsitf-compliance-certificate" }
    ],
    serviceSlugs: ["nde-rhei-registration", "itf-employer-registration", "itf-compliance-certificate", "nsitf-employer-registration", "nsitf-workplace-injury-claim", "nsitf-compliance-certificate"]
  },
  {
    slug: "state-services-nigeria",
    title: "State Government Services in Nigeria",
    shortTitle: "State services",
    description: "Official state-level tax, resident identity, property and compliance guides for Lagos, FCT, Ogun, Rivers, Edo and Anambra.",
    intro: [
      "State-government services are not interchangeable across Nigeria. A Lagos Payer ID, FCT tax record, Ogun S-TIN, Rivers RIVTIN, Edo Tax ID and Anambra ASIN belong to different state systems.",
      "Use this hub to start with the correct state portal for resident registration, tax clearance, property charges and related state services instead of applying through a federal or another state's system."
    ],
    searches: [
      { query: "LASRRA registration", serviceSlug: "lagos-lasrra-registration" },
      { query: "Lagos Land Use Charge", serviceSlug: "lagos-land-use-charge" },
      { query: "Lagos tax clearance verification", serviceSlug: "lagos-tax-clearance-verification" },
      { query: "FCT tax clearance certificate", serviceSlug: "fct-tax-clearance-application" },
      { query: "Ogun tax clearance certificate", serviceSlug: "ogun-tax-clearance-certificate" },
      { query: "RIVTIN registration", serviceSlug: "rivers-rivtin-registration" },
      { query: "Rivers tax clearance certificate", serviceSlug: "rivers-tax-clearance-certificate" }
    ],
    serviceSlugs: ["lagos-lasrra-registration", "lagos-payer-id", "lagos-land-use-charge", "lagos-tax-clearance-verification", "lagos-building-completion-certificate", "fct-file-individual-tax-return", "fct-tax-clearance-application", "fct-verify-tax-clearance", "ogun-taxpayer-registration", "ogun-tax-clearance-certificate", "rivers-rivtin-registration", "rivers-tax-clearance-certificate", "edo-tax-id-access", "anambra-asin-registration"]
  },
];

export function getGrowthHub(slug: string) {
  return growthHubs.find((hub) => hub.slug === slug);
}

export function getGrowthHubsForService(serviceSlug: string) {
  return growthHubs.filter((hub) => hub.serviceSlugs.includes(serviceSlug));
}

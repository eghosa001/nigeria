import type { Agency, Service } from "@/lib/types";

export const agencies: Agency[] = [
  {
    slug: "nis",
    name: "Nigeria Immigration Service",
    shortName: "NIS",
    description: "Passport and immigration services.",
    website: "https://immigration.gov.ng",
  },
  {
    slug: "nimc",
    name: "National Identity Management Commission",
    shortName: "NIMC",
    description: "National Identification Number enrolment and modification services.",
    website: "https://nimc.gov.ng",
  },
  {
    slug: "frsc",
    name: "Federal Road Safety Corps",
    shortName: "FRSC",
    description: "Nigeria driver's licence services and related road-safety processes.",
    website: "https://frsc.gov.ng",
  },
  {
    slug: "cac",
    name: "Corporate Affairs Commission",
    shortName: "CAC",
    description: "Business names, companies and incorporated trustee registrations.",
    website: "https://www.cac.gov.ng",
  },
];

export const services: Service[] = [
  {
    slug: "passport-renewal",
    title: "How to renew a Nigerian passport",
    shortTitle: "Passport renewal",
    summary: "Current application fees, core documents, official portal and the NIS service timeline for a passport reissue in Nigeria.",
    category: "Immigration",
    agencySlug: "nis",
    feeLabel: "₦100,000 / ₦200,000",
    feeNote: "32-page, 5-year passport: ₦100,000. 64-page, 10-year passport: ₦200,000. Bank charges are excluded.",
    timeline: "NIS lists 21 days after successful enrolment for reissue.",
    status: "verified",
    lastVerified: "2026-09-28",
    officialPortal: "https://passport.gov.ng",
    requirements: [
      "NIN slip",
      "Birth certificate or High Court declaration of age",
      "Local government or indigene certificate",
      "ICAO-compliant passport photograph",
      "Current passport for reissue",
    ],
    steps: [
      "Start the application on the official Nigeria Immigration Service passport portal.",
      "Complete the online application and payment steps shown by NIS.",
      "Attend the required enrolment/biometric stage.",
      "Track the reissue using the official NIS process.",
    ],
    notes: [
      "The listed application fees apply to applications made in Nigeria.",
      "Do not pay an unofficial agent simply because they claim to be able to bypass the official process.",
    ],
    sources: [
      {
        label: "NIS passport fee review",
        agency: "Nigeria Immigration Service",
        url: "https://immigration.gov.ng/nigeria-immigration-service-announces-upward-review-of-nigerian-standard-passport-fees/",
        lastChecked: "2026-09-28",
        published: "2025-08-28",
      },
      {
        label: "NIS Service Level Agreement",
        agency: "Nigeria Immigration Service",
        url: "https://immigration.gov.ng/wp-content/uploads/2026/03/SERVICE-LEVEL-AGREEMENT-2025.pdf",
        lastChecked: "2026-09-28",
      },
    ],
    searchTerms: ["renew passport", "passport renewal", "passport fee", "expired passport", "international passport"],
    related: ["first-nigerian-passport"],
  },
  {
    slug: "first-nigerian-passport",
    title: "How to apply for your first Nigerian passport",
    shortTitle: "First Nigerian passport",
    summary: "A starter checklist for a fresh Nigerian standard passport application using current NIS requirements and fees.",
    category: "Immigration",
    agencySlug: "nis",
    feeLabel: "₦100,000 / ₦200,000",
    feeNote: "32-page, 5-year passport: ₦100,000. 64-page, 10-year passport: ₦200,000. Bank charges are excluded.",
    timeline: "NIS lists 42 days after successful enrolment for fresh applications/change of data.",
    status: "verified",
    lastVerified: "2026-09-28",
    officialPortal: "https://passport.gov.ng",
    requirements: [
      "NIN slip",
      "Birth certificate or High Court declaration of age",
      "Local government or indigene certificate",
      "ICAO-compliant passport photograph",
    ],
    steps: [
      "Open the official NIS passport portal.",
      "Complete the fresh passport application.",
      "Pay through the official process and retain your payment evidence.",
      "Complete enrolment and biometrics as directed by NIS.",
    ],
    notes: [
      "A fresh application and a reissue have different service timelines.",
      "Use the official portal linked on this page rather than links sent by unknown agents.",
    ],
    sources: [
      {
        label: "NIS Service Level Agreement",
        agency: "Nigeria Immigration Service",
        url: "https://immigration.gov.ng/wp-content/uploads/2026/03/SERVICE-LEVEL-AGREEMENT-2025.pdf",
        lastChecked: "2026-09-28",
      },
      {
        label: "NIS passport fee review",
        agency: "Nigeria Immigration Service",
        url: "https://immigration.gov.ng/nigeria-immigration-service-announces-upward-review-of-nigerian-standard-passport-fees/",
        lastChecked: "2026-09-28",
        published: "2025-08-28",
      },
    ],
    searchTerms: ["new passport", "first passport", "passport application", "passport requirements"],
    related: ["passport-renewal"],
  },
  {
    slug: "nin-date-of-birth-modification",
    title: "How to change your date of birth on NIN",
    shortTitle: "NIN date-of-birth correction",
    summary: "The official NIMC pages currently show conflicting fees for date-of-birth modification, so this guide surfaces both instead of guessing.",
    category: "Identity",
    agencySlug: "nimc",
    feeLabel: "Official sources conflict",
    feeNote: "NIMC's main Fees page lists ₦28,574, while an NIMC adult-modification page still states ₦15,000.",
    status: "conflict",
    lastVerified: "2026-09-28",
    officialPortal: "https://nimc.gov.ng",
    requirements: [
      "Existing NIN",
      "Supporting documents for the requested correction",
      "For adult date-of-birth modification, NIMC's modification page references an NPC attestation letter",
      "Payment evidence through the current NIMC-approved channel",
    ],
    steps: [
      "Check the current NIMC fees page immediately before payment.",
      "Use the NIMC-approved modification process and provide the required supporting documents.",
      "Keep your payment and submission evidence.",
      "Do not rely on a quoted fee from an unofficial agent where NIMC's own pages conflict.",
    ],
    notes: [
      "This page is intentionally marked as a conflict until NIMC's official pages are consistent.",
      "GovGuide does not choose one official figure when two live NIMC pages disagree.",
    ],
    sources: [
      {
        label: "NIMC Fees",
        agency: "National Identity Management Commission",
        url: "https://nimc.gov.ng/fees",
        lastChecked: "2026-09-28",
      },
      {
        label: "NIMC adult modifications",
        agency: "National Identity Management Commission",
        url: "https://nimc.gov.ng/nin/nin-modifications-adults/",
        lastChecked: "2026-09-28",
      },
    ],
    searchTerms: ["nin dob", "nin date of birth", "change date of birth", "nimc correction", "nin modification"],
    related: [],
  },
  {
    slug: "new-drivers-licence",
    title: "How to get a new Nigerian driver's licence",
    shortTitle: "New driver's licence",
    summary: "Official FRSC licence fees and the first steps for a fresh applicant.",
    category: "Driving",
    agencySlug: "frsc",
    feeLabel: "From ₦7,000",
    feeNote: "FRSC lists Class A at ₦7,000 for 3 years or ₦11,000 for 5 years; other classes at ₦15,000 for 3 years or ₦21,000 for 5 years. Payment-channel charges may apply.",
    status: "verified",
    lastVerified: "2026-09-28",
    officialPortal: "https://nigeriadriverslicence.frsc.gov.ng",
    requirements: [
      "Complete mandatory training at an accredited driving school",
      "Obtain the driving school certificate number required to begin a fresh application",
      "Complete the application information requested by the official portal",
    ],
    steps: [
      "Complete training with an accredited driving school.",
      "Obtain your driving school certificate number.",
      "Start the fresh application on the official Nigeria Driver's Licence portal.",
      "Pay the applicable licence fee and complete the required capture/process.",
    ],
    notes: [
      "Fees vary by licence class and validity period.",
      "Applying for multiple classes can attract a separate charge for each class.",
    ],
    sources: [
      {
        label: "Nigeria Driver's Licence FAQ",
        agency: "Federal Road Safety Corps",
        url: "https://nigeriadriverslicence.frsc.gov.ng/faq",
        lastChecked: "2026-09-28",
      },
    ],
    searchTerms: ["drivers licence", "driver licence", "new licence", "frsc licence", "driving licence fee"],
    related: ["renew-drivers-licence"],
  },
  {
    slug: "renew-drivers-licence",
    title: "How to renew a Nigerian driver's licence",
    shortTitle: "Driver's licence renewal",
    summary: "Current FRSC licence prices and the official portal for renewal.",
    category: "Driving",
    agencySlug: "frsc",
    feeLabel: "From ₦7,000",
    feeNote: "FRSC lists Class A at ₦7,000 for 3 years or ₦11,000 for 5 years; other classes at ₦15,000 for 3 years or ₦21,000 for 5 years. Payment-channel charges may apply.",
    status: "verified",
    lastVerified: "2026-09-28",
    officialPortal: "https://nigeriadriverslicence.frsc.gov.ng",
    requirements: [
      "Existing licence/application details",
      "Information requested by the official renewal workflow",
      "Payment of the applicable class and validity fee",
    ],
    steps: [
      "Open the official Nigeria Driver's Licence portal.",
      "Choose the renewal process and supply the requested licence details.",
      "Pay using an approved payment option.",
      "Complete any capture or collection step shown for your application.",
    ],
    notes: ["Check the official portal for your exact application status and collection instructions."],
    sources: [
      {
        label: "Nigeria Driver's Licence FAQ",
        agency: "Federal Road Safety Corps",
        url: "https://nigeriadriverslicence.frsc.gov.ng/faq",
        lastChecked: "2026-09-28",
      },
    ],
    searchTerms: ["renew licence", "drivers licence renewal", "expired drivers licence", "frsc renewal"],
    related: ["new-drivers-licence"],
  },
  {
    slug: "cac-business-name-registration",
    title: "How to register a business name with CAC",
    shortTitle: "CAC business name registration",
    summary: "Current CAC business-name registration steps and the fee schedule published by the Commission.",
    category: "Business",
    agencySlug: "cac",
    feeLabel: "₦21,000 base CAC fees",
    feeNote: "The 2025 CAC schedule lists ₦1,000 for name reservation plus ₦20,000 for registration and CTC of registration documents. Other charges may apply depending on the filing/payment process.",
    status: "verified",
    lastVerified: "2026-09-28",
    officialPortal: "https://pre.cac.gov.ng",
    requirements: [
      "A proposed business name",
      "Applicant/proprietor details requested by CAC",
      "Required registration documents uploaded through the Company Registration Portal",
    ],
    steps: [
      "Check the availability of the proposed business name.",
      "Reserve the name where required.",
      "Complete the online pre-registration form and upload the requested documents.",
      "Pay the filing fees through the CAC registration process.",
      "Download the electronic certificate and certified extract when the registration is approved.",
    ],
    notes: [
      "CAC states that proprietors can register business names without a legal practitioner, chartered accountant or chartered secretary.",
      "This guide uses the newer 2025 fee schedule rather than the older fee PDF still available on CAC's website.",
    ],
    sources: [
      {
        label: "CAC Business Name Registration",
        agency: "Corporate Affairs Commission",
        url: "https://www.cac.gov.ng/services/business-name",
        lastChecked: "2026-09-28",
      },
      {
        label: "CAC New Schedule of Fees, 29 May 2025",
        agency: "Corporate Affairs Commission",
        url: "https://news.cac.gov.ng/wp-content/uploads/2025/06/New-Schedule-of-Fees-29th-May-2025.pdf",
        lastChecked: "2026-09-28",
        published: "2025-05-29",
      },
    ],
    searchTerms: ["cac", "business name", "register business", "cac registration", "business registration"],
    related: [],
  },
];

export const categories = [
  { name: "Identity", description: "NIN and identity record services." },
  { name: "Immigration", description: "Passports and immigration processes." },
  { name: "Driving", description: "Driver's licence and road-service guides." },
  { name: "Business", description: "CAC registration and business filings." },
  { name: "Education", description: "JAMB, WAEC, NECO and NYSC guides coming next." },
  { name: "Civil records", description: "Birth and death record guides coming next." },
];

export function getAgency(slug: string) {
  return agencies.find((agency) => agency.slug === slug);
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServicesByAgency(slug: string) {
  return services.filter((service) => service.agencySlug === slug);
}

import serviceRecords from "@/data/services.json" with { type: "json" };
import type { Agency, Service, VerificationStatus } from "@/lib/types";
import { validateServiceCatalog } from "@/lib/service-records";

export const agencies: Agency[] = [
  {
    "slug": "nis",
    "name": "Nigeria Immigration Service",
    "shortName": "NIS",
    "description": "Passport and immigration services.",
    "website": "https://immigration.gov.ng"
  },
  {
    "slug": "nimc",
    "name": "National Identity Management Commission",
    "shortName": "NIMC",
    "description": "National Identification Number enrolment and modification services.",
    "website": "https://nimc.gov.ng"
  },
  {
    "slug": "cbn",
    "name": "Central Bank of Nigeria",
    "shortName": "CBN",
    "description": "Banking identity, payments-system and regulated financial-service guidance.",
    "website": "https://www.cbn.gov.ng"
  },
  {
    "slug": "nibss",
    "name": "Nigeria Inter-Bank Settlement System",
    "shortName": "NIBSS",
    "description": "Inter-bank payment infrastructure, BVN services and official 565 USSD validation utilities.",
    "website": "https://nibss-plc.com.ng"
  },
  {
    "slug": "fmoh",
    "name": "Federal Ministry of Health and Social Welfare",
    "shortName": "FMoH",
    "description": "Port Health and public-health services connected to international travel.",
    "website": "https://health.gov.ng"
  },
  {
    "slug": "npf",
    "name": "Nigeria Police Force",
    "shortName": "NPF",
    "description": "Police specialised services, certificates and official verification routes.",
    "website": "https://www.npf.gov.ng"
  },
  {
    "slug": "inec",
    "name": "Independent National Electoral Commission",
    "shortName": "INEC",
    "description": "Voter registration records, PVC status and official collection information.",
    "website": "https://inecnigeria.org"
  },
  {
    "slug": "frsc",
    "name": "Federal Road Safety Corps",
    "shortName": "FRSC",
    "description": "Nigeria driver's licence services and road-safety processes.",
    "website": "https://frsc.gov.ng"
  },
  {
    "slug": "cac",
    "name": "Corporate Affairs Commission",
    "shortName": "CAC",
    "description": "Business names, companies, incorporated trustees and corporate compliance.",
    "website": "https://www.cac.gov.ng"
  },
  {
    "slug": "jamb",
    "name": "Joint Admissions and Matriculation Board",
    "shortName": "JAMB",
    "description": "UTME, Direct Entry, CAPS and admission services.",
    "website": "https://www.jamb.gov.ng"
  },
  {
    "slug": "waec",
    "name": "West African Examinations Council Nigeria",
    "shortName": "WAEC",
    "description": "WASSCE results, certificates and confirmation services.",
    "website": "https://www.waecnigeria.org"
  },
  {
    "slug": "neco",
    "name": "National Examinations Council",
    "shortName": "NECO",
    "description": "NECO results, result tokens and verification services.",
    "website": "https://www.neco.gov.ng"
  },
  {
    "slug": "nysc",
    "name": "National Youth Service Corps",
    "shortName": "NYSC",
    "description": "Mobilisation, registration, relocation and certificate services.",
    "website": "https://www.nysc.gov.ng"
  },
  {
    "slug": "npc",
    "name": "National Population Commission",
    "shortName": "NPC",
    "description": "Birth registration, attestation and certificate services.",
    "website": "https://www.nationalpopulation.gov.ng"
  },
  {
    "slug": "nrs",
    "name": "Nigeria Revenue Service",
    "shortName": "NRS",
    "description": "Federal taxpayer registration and self-service tax processes.",
    "website": "https://www.nrs.gov.ng"
  },
  {
    "slug": "fctirs",
    "name": "Federal Capital Territory Internal Revenue Service",
    "shortName": "FCT-IRS",
    "description": "Tax filing, clearance and taxpayer services for residents of the FCT.",
    "website": "https://fctirs.gov.ng"
  },
  {
    "slug": "eirs",
    "name": "Edo State Internal Revenue Service",
    "shortName": "EIRS",
    "description": "Taxpayer and revenue services for Edo State.",
    "website": "https://eirs.gov.ng"
  },
  {
    "slug": "airs",
    "name": "Anambra State Internal Revenue Service",
    "shortName": "AIRS",
    "description": "Anambra State tax, ASIN and revenue services.",
    "website": "https://airs.an.gov.ng"
  },
  {
    "slug": "lagos-revenue",
    "name": "Lagos State Revenue Portal",
    "shortName": "LASG Revenue",
    "description": "Lagos State payer identity and MDA revenue services.",
    "website": "https://revenue.lagosstate.gov.ng"
  },
  {
    "slug": "ncc",
    "name": "Nigerian Communications Commission",
    "shortName": "NCC",
    "description": "Telecommunications regulation, SIM-NIN linkage and consumer information.",
    "website": "https://www.ncc.gov.ng"
  },
  {
    "slug": "nelfund",
    "name": "Nigerian Education Loan Fund",
    "shortName": "NELFUND",
    "description": "Federal student-loan application, disbursement and repayment services.",
    "website": "https://nelf.gov.ng"
  },
  {
    "slug": "nerc",
    "name": "Nigerian Electricity Regulatory Commission",
    "shortName": "NERC",
    "description": "Electricity metering, billing, tariffs and consumer-redress guidance.",
    "website": "https://nerc.gov.ng"
  },
  {
    "slug": "nhia",
    "name": "National Health Insurance Authority",
    "shortName": "NHIA",
    "description": "National health-insurance enrolment and coverage programmes.",
    "website": "https://www.nhia.gov.ng"
  },
  {
    "slug": "pencom",
    "name": "National Pension Commission",
    "shortName": "PenCom",
    "description": "Retirement Savings Accounts, pension transfers and contribution complaints.",
    "website": "https://www.pencom.gov.ng"
  },
  {
    "slug": "nafdac",
    "name": "National Agency for Food and Drug Administration and Control",
    "shortName": "NAFDAC",
    "description": "Registration, renewal and verification of regulated products.",
    "website": "https://www.nafdac.gov.ng"
  },
  {
    "slug": "fccpc",
    "name": "Federal Competition and Consumer Protection Commission",
    "shortName": "FCCPC",
    "description": "Consumer complaints, redress and competition/consumer-protection services.",
    "website": "https://fccpc.gov.ng"
  },
  {
    "slug": "fmbn",
    "name": "Federal Mortgage Bank of Nigeria",
    "shortName": "FMBN",
    "description": "National Housing Fund contributions, mortgages and refunds.",
    "website": "https://fmbn.gov.ng"
  },
  {
    "slug": "ncs",
    "name": "Nigeria Customs Service",
    "shortName": "NCS",
    "description": "Customs clearance, vehicle verification and trade-related services.",
    "website": "https://customs.gov.ng"
  },
  {
    "slug": "interior",
    "name": "Federal Ministry of Interior",
    "shortName": "Ministry of Interior",
    "description": "Federal statutory marriage registration and document services.",
    "website": "https://interior.gov.ng"
  },
  {
    "slug": "ukvi",
    "name": "UK Visas and Immigration",
    "shortName": "UKVI",
    "description": "United Kingdom visa and immigration services.",
    "website": "https://www.gov.uk/government/organisations/uk-visas-and-immigration"
  },
  {
    "slug": "usdos",
    "name": "U.S. Department of State – Bureau of Consular Affairs",
    "shortName": "U.S. Visas",
    "description": "United States nonimmigrant and immigrant visa guidance.",
    "website": "https://travel.state.gov/content/travel/en/us-visas.html"
  },
  {
    "slug": "ircc",
    "name": "Immigration, Refugees and Citizenship Canada",
    "shortName": "IRCC",
    "description": "Canadian visitor, study, work and immigration services.",
    "website": "https://www.canada.ca/en/immigration-refugees-citizenship.html"
  },
  {
    "slug": "france-visas",
    "name": "France-Visas",
    "shortName": "France-Visas",
    "description": "Official French visa information and application service.",
    "website": "https://france-visas.gouv.fr/en/"
  },
  {
    "slug": "au-home-affairs",
    "name": "Australian Department of Home Affairs",
    "shortName": "Home Affairs",
    "description": "Australian visa, immigration and citizenship services.",
    "website": "https://immi.homeaffairs.gov.au/"
  },
  {
    "slug": "uae-icp",
    "name": "UAE Federal Authority for Identity, Citizenship, Customs & Port Security",
    "shortName": "UAE ICP",
    "description": "United Arab Emirates entry permits, visit visas and identity services.",
    "website": "https://icp.gov.ae/en/"
  },
  {
    "slug": "south-africa-dha",
    "name": "South African Department of Home Affairs",
    "shortName": "South Africa DHA",
    "description": "South African visa, immigration and civic services.",
    "website": "https://www.dha.gov.za/"
  },
  {
    "slug": "ireland-immigration",
    "name": "Immigration Service Delivery Ireland",
    "shortName": "Irish Immigration",
    "description": "Ireland entry visa and immigration services.",
    "website": "https://www.irishimmigration.ie/"
  },
  {
    "slug": "germany-foreign-office",
    "name": "German Federal Foreign Office",
    "shortName": "Germany Visa",
    "description": "German Schengen and national visa services.",
    "website": "https://www.auswaertiges-amt.de/en/"
  },
  {
    "slug": "italy-maeci",
    "name": "Italian Ministry of Foreign Affairs and International Cooperation",
    "shortName": "Italy Visa",
    "description": "Italian Schengen and national visa services.",
    "website": "https://www.esteri.it/en/"
  },
  {
    "slug": "spain-maec",
    "name": "Spanish Ministry of Foreign Affairs, European Union and Cooperation",
    "shortName": "Spain Visa",
    "description": "Spanish Schengen and national visa services.",
    "website": "https://www.exteriores.gob.es/en/"
  },
  {
    "slug": "netherlands-mfa",
    "name": "Netherlands Ministry of Foreign Affairs",
    "shortName": "Netherlands Visa",
    "description": "Dutch Schengen visa and consular services.",
    "website": "https://www.netherlandsworldwide.nl/"
  },
  {
    "slug": "turkiye-mfa",
    "name": "Republic of Türkiye Ministry of Foreign Affairs",
    "shortName": "Türkiye Visa",
    "description": "Türkiye visa and consular services.",
    "website": "https://www.mfa.gov.tr/"
  },
  {
    "slug": "china-mfa",
    "name": "Embassy of the People's Republic of China in Nigeria",
    "shortName": "China Visa",
    "description": "Chinese visa guidance and consular services for applicants in Nigeria.",
    "website": "https://ng.china-embassy.gov.cn/eng/"
  }
];

export const services: Service[] = validateServiceCatalog(serviceRecords);
export const publicServices = services.filter((service) => service.status !== "review");

export type PublicServiceListing = Pick<
  Service,
  "slug" | "title" | "shortTitle" | "summary" | "category" | "agencySlug" | "feeLabel" | "status" | "lastVerified" | "searchTerms"
> & { searchText: string };

export const publicServiceListings: PublicServiceListing[] = publicServices.map((service) => ({
  slug: service.slug,
  title: service.title,
  shortTitle: service.shortTitle,
  summary: service.summary,
  category: service.category,
  agencySlug: service.agencySlug,
  feeLabel: service.feeLabel,
  status: service.status,
  lastVerified: service.lastVerified,
  searchTerms: service.searchTerms,
  searchText: [service.requirements.join(" "), service.steps.join(" "), service.notes.join(" ")].join(" ").slice(0, 1200),
}));

export const categories = [
  {
    "name": "Identity",
    "description": "NIN and identity record services."
  },
  {
    "name": "Banking",
    "description": "BVN and regulated banking-identity services."
  },
  {
    "name": "Insurance",
    "description": "Official policy-validation and insurance verification services."
  },
  {
    "name": "Telecommunications",
    "description": "SIM registration, NIN linkage and telecom consumer services."
  },
  {
    "name": "Student finance",
    "description": "Federal student-loan application, disbursement and repayment services."
  },
  {
    "name": "Electricity",
    "description": "Metering, billing, tariffs and electricity complaint services."
  },
  {
    "name": "Health insurance",
    "description": "NHIA enrolment and health-insurance programme guidance."
  },
  {
    "name": "Pensions",
    "description": "Retirement Savings Account and pension contribution services."
  },
  {
    "name": "Product regulation",
    "description": "NAFDAC product registration, renewal and verification services."
  },
  {
    "name": "Consumer protection",
    "description": "Consumer complaints and redress services."
  },
  {
    "name": "Housing",
    "description": "NHF contributions, mortgages and housing-finance services."
  },
  {
    "name": "Customs",
    "description": "Vehicle customs verification and customs digital services."
  },
  {
    "name": "International travel",
    "description": "Travel documents, Port Health and border-entry processes."
  },
  {
    "name": "Foreign visas",
    "description": "Official visitor-visa application guides for Nigerians travelling abroad."
  },
  {
    "name": "Police & security",
    "description": "Police certificates and official specialised-service routes."
  },
  {
    "name": "Civic services",
    "description": "Voter-record and PVC administrative services from INEC."
  },
  {
    "name": "Immigration",
    "description": "Passports and immigration processes."
  },
  {
    "name": "Driving",
    "description": "Driver's licence services."
  },
  {
    "name": "Business",
    "description": "CAC registration and corporate filings."
  },
  {
    "name": "Education",
    "description": "JAMB, WAEC and NECO services."
  },
  {
    "name": "Youth service",
    "description": "NYSC mobilisation and certificate services."
  },
  {
    "name": "Civil records",
    "description": "Birth registration and certificate services."
  },
  {
    "name": "Tax",
    "description": "Federal taxpayer self-service."
  },
  {
    "name": "State services",
    "description": "Verified state and FCT digital services."
  }
];

export function getAgency(slug:string) { return agencies.find((agency) => agency.slug === slug); }
export function getService(slug:string) { return services.find((service) => service.slug === slug); }
export function getPublicService(slug:string) { return publicServices.find((service) => service.slug === slug); }
export function getServicesByAgency(slug:string, includeReview = false) {
  return (includeReview ? services : publicServices).filter((service) => service.agencySlug === slug);
}
export function getServicesByStatus(status:VerificationStatus) { return services.filter((service) => service.status === status); }

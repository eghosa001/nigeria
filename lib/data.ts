import serviceRecords from "@/data/services.json" with { type: "json" };
import universityRecords from "@/data/services-universities.json" with { type: "json" };
import universityWave2 from "@/data/services-universities-wave2.json" with { type: "json" };
import privateUniversityGuide from "@/data/services-wellspring-2026.json" with { type: "json" };
import universityWave4 from "@/data/services-universities-wave4.json" with { type: "json" };
import universityWave5 from "@/data/services-universities-wave5.json" with { type: "json" };
import universityWave6 from "@/data/services-universities-wave6.json" with { type: "json" };
import universityWave7 from "@/data/services-universities-wave7.json" with { type: "json" };
import universityWave8 from "@/data/services-universities-wave8.json" with { type: "json" };
import scaleServiceRecords from "@/data/services-scale-verified.json" with { type: "json" };
import privateServiceRecords from "@/data/services-private-extended.json" with { type: "json" };
import growthServiceRecords from "@/data/services-growth-wave-3.json" with { type: "json" };
import wave5ServiceRecords from "@/data/services-growth-wave-5.json" with { type: "json" };
import wave6ServiceRecords from "@/data/services-growth-wave-6.json" with { type: "json" };
import wave7ServiceRecords from "@/data/services-growth-wave-7.json" with { type: "json" };
import cacPartnershipServiceRecords from "@/data/services-cac-partnerships.json" with { type: "json" };
import type { Agency, Service, VerificationStatus } from "@/lib/types";
import { validateServiceCatalog } from "@/lib/service-records";
import { serviceScaleAgencies, serviceScaleCategories } from "@/lib/service-scale-metadata";

export const agencies: Agency[] = [
  {
    "slug": "nigeria-embassy-netherlands",
    "name": "Embassy of Nigeria, The Netherlands",
    "shortName": "Nigeria Embassy The Hague",
    "description": "Consular services for Nigerians and visa applicants in the Netherlands.",
    "website": "https://nigerianembassythehague.nl/"
  },
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
    "slug": "sec",
    "name": "Securities and Exchange Commission Nigeria",
    "shortName": "SEC",
    "description": "Investor protection, capital-market regulation, unclaimed-dividend and e-Dividend services.",
    "website": "https://sec.gov.ng"
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
    "slug": "nabteb",
    "name": "National Business and Technical Examinations Board",
    "shortName": "NABTEB",
    "description": "Technical and business examinations, results and certificate services.",
    "website": "https://nabteb.gov.ng"
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
    "slug": "lasrra",
    "name": "Lagos State Residents Registration Agency",
    "shortName": "LASRRA",
    "description": "Lagos resident registration, biometric capture and LAG-ID services.",
    "website": "https://www.lagosresidents.gov.ng"
  },
  {
    "slug": "lagos-luc",
    "name": "Lagos State Land Use Charge",
    "shortName": "Lagos LUC",
    "description": "Lagos property Land Use Charge billing, payment and account services.",
    "website": "https://luc.lagosstate.gov.ng"
  },
  {
    "slug": "lasbca",
    "name": "Lagos State Building Control Agency",
    "shortName": "LASBCA",
    "description": "Lagos building control, inspections and completion/fitness certification.",
    "website": "https://lasbca.lagosstate.gov.ng"
  },
  {
    "slug": "ogirs",
    "name": "Ogun State Internal Revenue Service",
    "shortName": "OGIRS",
    "description": "Ogun taxpayer registration, eTCC and state revenue services.",
    "website": "https://www.ogunstaterevenue.com"
  },
  {
    "slug": "rivers-birs",
    "name": "Rivers State Internal Revenue Service",
    "shortName": "Rivers IRS",
    "description": "RIVTIN, RIVTAMIS, tax clearance and Rivers State revenue services.",
    "website": "https://riversbirs.gov.ng"
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
    "slug": "nipo",
    "name": "Nigerian Industrial Property Office",
    "shortName": "NIPO",
    "description": "Trademark, patent and industrial-design registration services.",
    "website": "https://nipo.gov.ng"
  },
  {
    "slug": "copyright-commission",
    "name": "Nigerian Copyright Commission",
    "shortName": "Copyright Commission",
    "description": "Copyright registration, certification and anti-piracy services.",
    "website": "https://copyright.gov.ng"
  },
  {
    "slug": "nepc",
    "name": "Nigerian Export Promotion Council",
    "shortName": "NEPC",
    "description": "Exporter registration, certification and export-support services.",
    "website": "https://nepc.gov.ng"
  },
  {
    "slug": "smedan",
    "name": "Small and Medium Enterprises Development Agency of Nigeria",
    "shortName": "SMEDAN",
    "description": "MSME registration, business-development and enterprise-support services.",
    "website": "https://smedan.gov.ng"
  },
  {
    "slug": "bpp",
    "name": "Bureau of Public Procurement",
    "shortName": "BPP",
    "description": "Federal contractor, consultant and service-provider registration.",
    "website": "https://bpp.gov.ng"
  },
  {
    "slug": "son",
    "name": "Standards Organisation of Nigeria",
    "shortName": "SON",
    "description": "SONCAP, MANCAP and regulated-product certification services.",
    "website": "https://son.gov.ng"
  },
  {
    "slug": "nsitf",
    "name": "Nigeria Social Insurance Trust Fund",
    "shortName": "NSITF",
    "description": "Employees' Compensation Scheme registration, claims and compliance.",
    "website": "https://nsitf.gov.ng"
  },
  {
    "slug": "nde",
    "name": "National Directorate of Employment",
    "shortName": "NDE",
    "description": "Employment, vocational-skills and job-creation programme services.",
    "website": "https://nde.gov.ng"
  },
  {
    "slug": "scuml",
    "name": "Special Control Unit Against Money Laundering",
    "shortName": "SCUML",
    "description": "EFCC registration, certification and verification for designated non-financial businesses and professions.",
    "website": "https://scuml.efcc.gov.ng"
  },
  {
    "slug": "itf",
    "name": "Industrial Training Fund",
    "shortName": "ITF",
    "description": "Employer registration, statutory training contributions and compliance certificates.",
    "website": "https://www.itf.gov.ng"
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

agencies.push(...serviceScaleAgencies);
agencies.push(...[
  {
    "slug": "uniosun",
    "name": "Osun State University",
    "shortName": "UNIOSUN",
    "description": "Osun State university; 2026/27 merit admissions, current acceptance fees, screening and student portal.",
    "website": "https://uniosun.edu.ng/"
  },
  {
    "slug": "unijos",
    "name": "University of Jos",
    "shortName": "UNIJOS",
    "description": "Federal university in Jos, Plateau State; undergraduate screening, student portal and admission status.",
    "website": "https://www.unijos.edu.ng/"
  },
  {
    "slug": "unizik",
    "name": "Nnamdi Azikiwe University",
    "shortName": "UNIZIK",
    "description": "Federal university in Awka, Anambra State; undergraduate screening, admission onboarding, student and clearance portals.",
    "website": "https://unizik.edu.ng/"
  }
]);
agencies.push(...[
  {
    "slug": "uniuyo",
    "name": "University of Uyo",
    "shortName": "UNIUYO",
    "description": "Federal university in Akwa Ibom State; 2026/27 UTME/Direct Entry admissions and student services.",
    "website": "https://uniuyo.edu.ng/"
  },
  {
    "slug": "aau-ekpoma",
    "name": "Ambrose Alli University Ekpoma",
    "shortName": "AAU Ekpoma",
    "description": "Edo State university with 2026/27 undergraduate admissions, programme cut-offs and student portal.",
    "website": "https://aauekpoma.edu.ng/"
  },
  {
    "slug": "rsu",
    "name": "Rivers State University",
    "shortName": "RSU",
    "description": "State university in Port Harcourt with 2026/27 admissions, CBT screening and student services.",
    "website": "https://www.rsu.edu.ng/"
  }
]);

agencies.push(...[
  {
    "slug": "futo",
    "name": "Federal University of Technology Owerri",
    "shortName": "FUTO",
    "description": "Federal technology university in Owerri, Imo State; undergraduate admissions, student portals, clearance and fees.",
    "website": "https://futo.edu.ng/"
  },
  {
    "slug": "futminna",
    "name": "Federal University of Technology Minna",
    "shortName": "FUTMINNA",
    "description": "Federal university of technology in Minna, Niger State; UPASE screening, admissions and student portal.",
    "website": "https://futminna.edu.ng/"
  }
]);
agencies.push(...[
  {
    "slug": "unical",
    "name": "University of Calabar",
    "shortName": "UNICAL",
    "description": "Federal university in Cross River State with official undergraduate screening and student services.",
    "website": "https://www.unical.edu.ng/"
  },
  {
    "slug": "fulokoja",
    "name": "Federal University Lokoja",
    "shortName": "FULOKOJA",
    "description": "Federal university in Kogi State with undergraduate admission, CAPS and student registration.",
    "website": "https://fulokoja.edu.ng/"
  }
]);
agencies.push(...[
  {
    "slug": "abu-zaria",
    "name": "Ahmadu Bello University",
    "shortName": "ABU",
    "website": "https://abu.edu.ng/",
    "description": "Federal university in Zaria, Kaduna State; admission screening, student portal, and revised student charges."
  },
  {
    "slug": "unilorin",
    "name": "University of Ilorin",
    "shortName": "UNILORIN",
    "website": "https://www.unilorin.edu.ng/",
    "description": "Federal university in Ilorin, Kwara State; undergraduate Post-UTME/Direct Entry and student registration."
  },
  {
    "slug": "fuoye",
    "name": "Federal University Oye-Ekiti",
    "shortName": "FUOYE",
    "website": "https://fuoye.edu.ng/",
    "description": "Federal university in Ekiti State; central admissions and payment portal, clearance and student registration."
  },
  {
    "slug": "eksu",
    "name": "Ekiti State University",
    "shortName": "EKSU",
    "website": "https://eksu.edu.ng/",
    "description": "Public university in Ado-Ekiti, Ekiti State; UTME/Direct Entry, JUPEB and university student services."
  }
]);
agencies.push({ slug: "wellspring-university", name: "Wellspring University", shortName: "Wellspring", description: "Private university in Benin City, Edo State, with official 2026/27 programme-specific tuition and admission details.", website: "https://wellspringuniversity.edu.ng/" });
agencies.push(...[
  {
    "slug": "oau",
    "name": "Obafemi Awolowo University",
    "shortName": "OAU",
    "description": "Federal university in Ile-Ife, Osun State; undergraduate admissions, student fees and clearance guidance.",
    "website": "https://oauife.edu.ng"
  },
  {
    "slug": "futa",
    "name": "Federal University of Technology, Akure",
    "shortName": "FUTA",
    "description": "Federal university in Akure, Ondo State; undergraduate admission and student registration.",
    "website": "https://www.futa.edu.ng"
  },
  {
    "slug": "uniport",
    "name": "University of Port Harcourt",
    "shortName": "UNIPORT",
    "description": "Federal university in Rivers State; admission screening, registration and school fees.",
    "website": "https://www.uniport.edu.ng"
  },
  {
    "slug": "buk",
    "name": "Bayero University Kano",
    "shortName": "BUK",
    "description": "Federal university in Kano State; admissions, BUKAT, BUKDES, registration and clearance.",
    "website": "https://www.buk.edu.ng"
  }
]);
agencies.push(...[
  {
    "slug": "uniben",
    "name": "University of Benin",
    "shortName": "UNIBEN",
    "website": "https://www.uniben.edu",
    "description": "Federal university in Benin City, Edo State; official admissions, student and clearance processes."
  },
  {
    "slug": "ui-university",
    "name": "University of Ibadan",
    "shortName": "UI",
    "website": "https://ui.edu.ng",
    "description": "Federal university in Ibadan, Oyo State; undergraduate screening and student registration services."
  },
  {
    "slug": "unn",
    "name": "University of Nigeria, Nsukka",
    "shortName": "UNN",
    "website": "https://www.unn.edu.ng",
    "description": "Federal university in Enugu State; university admission, registration and clearance."
  },
  {
    "slug": "unilag",
    "name": "University of Lagos",
    "shortName": "UNILAG",
    "website": "https://unilag.edu.ng",
    "description": "Federal university in Lagos State; undergraduate admissions, screening and student services."
  },
  {
    "slug": "lasu",
    "name": "Lagos State University",
    "shortName": "LASU",
    "website": "https://lasu.edu.ng",
    "description": "Lagos State public university; admission screening, LACACA clearance and student services."
  }
]);

export const services: Service[] = validateServiceCatalog([...serviceRecords, ...scaleServiceRecords, ...privateServiceRecords, ...growthServiceRecords, ...wave5ServiceRecords, ...wave6ServiceRecords, ...wave7ServiceRecords, ...cacPartnershipServiceRecords, ...universityRecords, ...universityWave2, ...privateUniversityGuide, ...universityWave4, ...universityWave5, ...universityWave6, ...universityWave7, ...universityWave8]);
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
    "name": "Investing",
    "description": "Investor records, dividends and Nigerian capital-market services."
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
    "name": "Employment & social protection",
    "description": "Employment programmes, employer social insurance and workplace compensation services."
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
categories.push(...serviceScaleCategories);


export function getAgency(slug:string) { return agencies.find((agency) => agency.slug === slug); }
export function getService(slug:string) { return services.find((service) => service.slug === slug); }
export function getPublicService(slug:string) { return publicServices.find((service) => service.slug === slug); }
export function getServicesByAgency(slug:string, includeReview = false) {
  return (includeReview ? services : publicServices).filter((service) => service.agencySlug === slug);
}
export function getServicesByStatus(status:VerificationStatus) { return services.filter((service) => service.status === status); }

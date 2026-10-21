import serviceRecords from "@/data/services.json" with { type: "json" };
import { applyCandidateServiceReviews20261017 } from "@/lib/service-candidate-editorial-2026-10-17";
import { applyTargetedServiceEvidence20261017 } from "@/lib/service-targeted-evidence-2026-10-17";
import { applyAdmissionDecisionResearch20261019 } from "@/lib/service-admission-decisions-2026-10-19";
import { applyNecoExternalCandidateDecisions20261019 } from "@/lib/service-neco-external-decisions-2026-10-19";
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
import type { Service, VerificationStatus } from "@/lib/types";
import { validateServiceCatalog } from "@/lib/service-records";
import { serviceScaleCategories } from "@/lib/service-scale-metadata";
export { agencies, getAgency } from "@/lib/agency-directory";

export const services: Service[] = validateServiceCatalog([...serviceRecords, ...scaleServiceRecords, ...privateServiceRecords, ...growthServiceRecords, ...wave5ServiceRecords, ...wave6ServiceRecords, ...wave7ServiceRecords, ...cacPartnershipServiceRecords, ...universityRecords, ...universityWave2, ...privateUniversityGuide, ...universityWave4, ...universityWave5, ...universityWave6, ...universityWave7, ...universityWave8]).map(applyCandidateServiceReviews20261017)
  .map(applyTargetedServiceEvidence20261017)
  .map(applyAdmissionDecisionResearch20261019)
  .map(applyNecoExternalCandidateDecisions20261019)
  // The official NIS status form requires two identifiers, not a saved email
  // or receipt. Its recovery advice remains in the verified troubleshooting step.
  .map(service => service.slug === "passport-application-tracking" ? {
    ...service,
    requirements: service.requirements.filter(item => !/confirmation email|saved receipt/i.test(item)),
  } : service);
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



export function getService(slug:string) { return services.find((service) => service.slug === slug); }
export function getPublicService(slug:string) { return publicServices.find((service) => service.slug === slug); }
export function getServicesByAgency(slug:string, includeReview = false) {
  return (includeReview ? services : publicServices).filter((service) => service.agencySlug === slug);
}
export function getServicesByStatus(status:VerificationStatus) { return services.filter((service) => service.status === status); }

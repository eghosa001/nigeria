import type { CareerOpportunity } from "@/lib/jobs";
import { jobOpportunities } from "@/lib/jobs";

export type JobTopic = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  answer: string;
  organizations: string[];
  relatedSlugs: string[];
};

export const jobTopics: JobTopic[] = [
  {
    slug: "banking-finance",
    title: "Banking & Finance Jobs in Nigeria",
    shortTitle: "Banking & finance",
    description: "Verified career routes for Nigerian banks, fintechs and financial-services employers, including graduate, technology, operations and experienced-hire pathways.",
    answer: "Start with the employer's own careers system, then compare the exact role's degree, NYSC, experience, location and deadline requirements before applying.",
    organizations: ["Access Bank", "Guaranty Trust Bank", "United Bank for Africa", "First Bank", "Stanbic IBTC", "Fidelity Bank", "Wema Bank", "Sterling Bank", "FCMB Group", "Ecobank", "Moniepoint"],
    relatedSlugs: ["tech-fintech", "consulting-professional-services"]
  },
  {
    slug: "oil-gas-energy",
    title: "Oil, Gas & Energy Jobs in Nigeria",
    shortTitle: "Oil, gas & energy",
    description: "Official career and recruitment routes for energy, oil and gas employers in Nigeria, from graduate and engineering pathways to experienced technical roles.",
    answer: "Use each employer's live careers page because energy vacancies can close quickly and qualification requirements differ sharply between field, engineering, project and corporate roles.",
    organizations: ["SNV", "NNPC Limited", "Shell Companies in Nigeria", "Nigeria LNG Limited", "Chevron Nigeria", "TotalEnergies", "Seplat Energy", "Oando PLC", "SLB", "Halliburton"],
    relatedSlugs: ["fmcg-manufacturing", "tech-fintech"]
  },
  {
    slug: "tech-fintech",
    title: "Tech & Fintech Jobs in Nigeria",
    shortTitle: "Tech & fintech",
    description: "Verified technology, telecoms, payments and fintech career routes for Nigerian applicants, including engineering, product, data, operations and commercial roles.",
    answer: "Check the exact work location and role page before applying: the same employer can publish Nigeria-office, hybrid and remote roles with different eligibility.",
    organizations: ["MTN Nigeria", "Airtel Nigeria", "Flutterwave", "Paystack", "Moniepoint", "Interswitch Group", "IHS Towers", "Microsoft Nigeria", "Ericsson Nigeria", "Huawei Nigeria"],
    relatedSlugs: ["banking-finance", "consulting-professional-services"]
  },
  {
    slug: "ngo-development",
    title: "NGO, UN & Development Jobs in Nigeria",
    shortTitle: "NGO, UN & development",
    description: "Official vacancy and careers routes for development organisations and UN-system employers relevant to applicants in Nigeria.",
    answer: "Confirm duty station, contract type, deadline and nationality or residency conditions on the organisation's own vacancy page; never pay for a shortlist or UN appointment.",
    organizations: ["SNV", "UNICEF Nigeria", "United Nations Development Programme", "World Health Organization", "British Council Nigeria", "World Food Programme", "Plan International", "FHI 360", "EHA Clinics", "May & Baker Nigeria Plc"],
    relatedSlugs: ["oil-gas-energy", "consulting-professional-services"]
  },
  {
    slug: "fmcg-manufacturing",
    title: "FMCG & Manufacturing Jobs in Nigeria",
    shortTitle: "FMCG & manufacturing",
    description: "Verified career pathways for major Nigerian manufacturing, food, consumer-goods and industrial employers, including engineering, supply chain, sales and graduate opportunities.",
    answer: "Match your application to the exact plant, business unit and function; a general company careers page does not mean every location or programme is currently recruiting.",
    organizations: ["Reckitt Nigeria", "Unilever Nigeria", "Nestlé", "Dangote Industries Limited", "BUA Group", "Flour Mills of Nigeria", "Nigerian Breweries Plc", "Procter & Gamble Nigeria", "British American Tobacco Nigeria", "Coca-Cola HBC Nigeria", "Seven-Up Bottling Company", "FrieslandCampina WAMCO Nigeria", "Promasidor Nigeria"],
    relatedSlugs: ["oil-gas-energy", "banking-finance"]
  },
  {
    slug: "consulting-professional-services",
    title: "Consulting & Professional Services Jobs in Nigeria",
    shortTitle: "Consulting & professional services",
    description: "Official graduate and experienced-hire pathways for major professional-services firms in Nigeria across audit, tax, consulting, advisory and technology.",
    answer: "Choose the correct business line before applying and read the exact graduate or experienced-hire requirements; similar job titles can have different eligibility across firms.",
    organizations: ["KPMG Nigeria", "Deloitte Nigeria", "PwC Nigeria", "EY Nigeria"],
    relatedSlugs: ["banking-finance", "tech-fintech"]
  },
  {
    slug: "public-service",
    title: "Government & Public Service Jobs in Nigeria",
    shortTitle: "Public service",
    description: "Verified federal and state recruitment routes covering civil service, regulators, security agencies, ports and other public institutions.",
    answer: "Check status before applying: a legitimate government recruitment portal may still show zero active vacancies or an older exercise. Use the responsible agency's own notice and never pay for a shortlist.",
    organizations: ["Federal Civil Service Commission", "Nigeria Customs Service", "Federal Road Safety Corps", "Civil Defence, Correctional, Fire and Immigration Services Board", "National Drug Law Enforcement Agency", "Police Service Commission", "Nigerian Army", "Nigerian Navy", "Nigerian Air Force", "Lagos State Civil Service Commission", "Nigerian Ports Authority", "Standards Organisation of Nigeria", "Nigerian Electricity Regulatory Commission", "Edo State Independent Electoral Commission", "Federal Airports Authority of Nigeria", "Nigerian Upstream Petroleum Regulatory Commission", "Central Bank of Nigeria", "Lagos State Teaching Service Commission", "Securities and Exchange Commission Nigeria", "National Information Technology Development Agency"],
    relatedSlugs: ["universities-research", "oil-gas-energy"]
  },
  {
    slug: "universities-research",
    title: "University, Research & Teaching Hospital Jobs in Nigeria",
    shortTitle: "Universities & research",
    description: "Official academic, non-teaching, research and teaching-hospital recruitment routes from Nigerian public universities and tertiary institutions.",
    answer: "Use the institution's official recruitment portal and distinguish a live 2026 vacancy from an older recruitment archive. Academic ranks, professional registration and supporting-document requirements vary by institution.",
    organizations: ["University of Benin", "University of Lagos", "University of Ibadan", "University of Nigeria, Nsukka", "Obafemi Awolowo University", "University of Ilorin", "Ahmadu Bello University", "Lagos State University College of Medicine", "University College Hospital Ibadan"],
    relatedSlugs: ["public-service", "healthcare-pharma"]
  },
  {
    slug: "insurance",
    title: "Insurance Jobs & Graduate Careers in Nigeria",
    shortTitle: "Insurance",
    description: "Verified insurance and financial-services career routes for underwriting, actuarial, health, sales, claims, finance, technology and graduate programmes.",
    answer: "Open the exact insurer vacancy or programme page before applying. Career hubs can remain live between recruitment cycles, so MyNigeriaGuide marks only clearly current listings as open.",
    organizations: ["AXA Mansard", "AIICO Insurance", "Leadway Assurance", "Custodian Investment", "Coronation Group"],
    relatedSlugs: ["banking-finance", "tech-fintech"]
  },
  {
    slug: "construction-infrastructure",
    title: "Construction, Engineering & Infrastructure Jobs in Nigeria",
    shortTitle: "Construction & infrastructure",
    description: "Official career routes for construction, cement, energy-management, telecom-infrastructure and major engineering employers in Nigeria.",
    answer: "Confirm the project, plant or work location on the exact role. Large infrastructure employers often use regional or global portals where not every vacancy shown is based in Nigeria.",
    organizations: ["Dangote Industries Limited", "BUA Group", "Lafarge Africa Plc", "Julius Berger Nigeria", "Schneider Electric Nigeria", "IHS Towers"],
    relatedSlugs: ["oil-gas-energy", "fmcg-manufacturing"]
  },
  {
    slug: "aviation-logistics",
    title: "Aviation, Shipping & Logistics Jobs in Nigeria",
    shortTitle: "Aviation & logistics",
    description: "Verified career pathways across airlines, ports, shipping, warehousing, supply chain and logistics for Nigerian applicants.",
    answer: "Aviation and maritime roles can require licences, flight hours, seafarer credentials or location-specific work rights. Always use the current official vacancy rather than an old listing that remains online.",
    organizations: ["Ibom Air", "Air Peace", "DHL", "Maersk", "Nigerian Ports Authority"],
    relatedSlugs: ["construction-infrastructure", "public-service"]
  },
  {
    slug: "healthcare-pharma",
    title: "Healthcare & Pharmaceutical Jobs in Nigeria",
    shortTitle: "Healthcare & pharma",
    description: "Official career routes for hospitals, medical academics, pharmaceutical manufacturing, public health and development-health organisations.",
    answer: "Check professional registration, internship status, specialty and duty-station requirements on the exact vacancy. Healthcare recruitment can use separate portals for staff, internships and academic appointments.",
    organizations: ["Emzor Pharmaceutical Industries", "University College Hospital Ibadan", "Lagos State University College of Medicine", "World Health Organization", "FHI 360"],
    relatedSlugs: ["universities-research", "ngo-development"]
  }
];

export function getJobTopic(slug: string) {
  return jobTopics.find((topic) => topic.slug === slug);
}

export function getJobTopicOpportunities(slug: string) {
  const topic = getJobTopic(slug);
  if (!topic) return [];
  return jobOpportunities.filter((item) =>
    item.topicSlugs?.includes(topic.slug) ||
    topic.organizations.some((organization) =>
      item.organization.toLowerCase().includes(organization.toLowerCase())
    )
  );
}

export function getJobTopicsForOpportunity(item: CareerOpportunity) {
  return jobTopics.filter((topic) =>
    item.topicSlugs?.includes(topic.slug) ||
    topic.organizations.some((organization) =>
      item.organization.toLowerCase().includes(organization.toLowerCase())
    )
  );
}

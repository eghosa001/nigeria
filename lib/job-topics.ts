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
    organizations: ["MTN Nigeria", "Airtel Nigeria", "Flutterwave", "Paystack", "Moniepoint", "Interswitch Group"],
    relatedSlugs: ["banking-finance", "consulting-professional-services"]
  },
  {
    slug: "ngo-development",
    title: "NGO, UN & Development Jobs in Nigeria",
    shortTitle: "NGO, UN & development",
    description: "Official vacancy and careers routes for development organisations and UN-system employers relevant to applicants in Nigeria.",
    answer: "Confirm duty station, contract type, deadline and nationality or residency conditions on the organisation's own vacancy page; never pay for a shortlist or UN appointment.",
    organizations: ["SNV", "UNICEF Nigeria", "United Nations Development Programme", "World Health Organization"],
    relatedSlugs: ["oil-gas-energy", "consulting-professional-services"]
  },
  {
    slug: "fmcg-manufacturing",
    title: "FMCG & Manufacturing Jobs in Nigeria",
    shortTitle: "FMCG & manufacturing",
    description: "Verified career pathways for major Nigerian manufacturing, food, consumer-goods and industrial employers, including engineering, supply chain, sales and graduate opportunities.",
    answer: "Match your application to the exact plant, business unit and function; a general company careers page does not mean every location or programme is currently recruiting.",
    organizations: ["Reckitt Nigeria", "Unilever Nigeria", "Nestlé", "Dangote Industries Limited", "BUA Group", "Flour Mills of Nigeria", "Nigerian Breweries Plc", "Procter & Gamble Nigeria", "British American Tobacco Nigeria"],
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
  }
];

export function getJobTopic(slug: string) {
  return jobTopics.find((topic) => topic.slug === slug);
}

export function getJobTopicOpportunities(slug: string) {
  const topic = getJobTopic(slug);
  if (!topic) return [];
  return jobOpportunities.filter((item) =>
    topic.organizations.some((organization) =>
      item.organization.toLowerCase().includes(organization.toLowerCase())
    )
  );
}

export function getJobTopicsForOpportunity(item: CareerOpportunity) {
  return jobTopics.filter((topic) =>
    topic.organizations.some((organization) =>
      item.organization.toLowerCase().includes(organization.toLowerCase())
    )
  );
}

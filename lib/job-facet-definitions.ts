/** Lightweight, static Jobs filter definitions for browser and server.
 * Do not import the complete jobs catalog or server query functions here.
 * Both browsing and server search use these same exact facets. */
export type JobFacet = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  terms: string[];
};

export const jobLocationFacets: JobFacet[] = [
  {
    slug: "lagos",
    title: "Jobs in Lagos",
    shortTitle: "Lagos",
    description: "Verified Lagos job vacancies and official employer career routes across healthcare, insurance, aviation, finance, technology and professional services.",
    terms: ["lagos", "ikeja", "akoka", "sangotedo", "yaba"],
  },
  {
    slug: "abuja",
    title: "Jobs in Abuja",
    shortTitle: "Abuja",
    description: "Verified Abuja and FCT vacancies and career routes across healthcare, energy, development, government and professional roles.",
    terms: ["abuja", "fct", "lifecamp", "lugbe"],
  },
  {
    slug: "ibadan",
    title: "Jobs in Ibadan",
    shortTitle: "Ibadan",
    description: "Verified Ibadan job and career pathways across insurance, healthcare, universities and other employers with official application sources.",
    terms: ["ibadan"],
  },
  {
    slug: "kano",
    title: "Jobs in Kano",
    shortTitle: "Kano",
    description: "Verified Kano opportunities and official employer career routes, including healthcare, people operations and professional roles.",
    terms: ["kano", "tofa"],
  },
];

export const jobProfessionFacets: JobFacet[] = [
  { slug: "engineering", title: "Engineering Jobs in Nigeria", shortTitle: "Engineering", description: "Verified engineering, technical, energy, infrastructure and manufacturing career routes in Nigeria.", terms: ["engineer", "engineering", "technical", "mechanical", "electrical", "petroleum", "energy", "infrastructure"] },
  { slug: "healthcare", title: "Healthcare Jobs in Nigeria", shortTitle: "Healthcare", description: "Verified medical, nursing, pharmacy, dental, laboratory and healthcare career opportunities in Nigeria.", terms: ["health", "medical", "medicine", "nurs", "pharma", "dent", "clinical", "laboratory"] },
  { slug: "nursing", title: "Nursing Jobs in Nigeria", shortTitle: "Nursing", description: "Verified nursing and midwifery vacancies plus official hospital, public-health and healthcare employer career routes in Nigeria.", terms: ["nursing", "nurse", "midwife", "midwifery", "nursing officer"] },
  { slug: "pharmacy", title: "Pharmacy Jobs in Nigeria", shortTitle: "Pharmacy", description: "Verified pharmacist, pharmacy-technician and pharmaceutical-career routes in Nigeria from official employers and recruitment sources.", terms: ["pharmacist", "pharmacy", "pharmaceutical", "pharmacy technician"] },
  { slug: "finance-accounting", title: "Finance & Accounting Jobs in Nigeria", shortTitle: "Finance & accounting", description: "Verified banking, finance, accounting, audit, insurance, actuarial and investment career routes in Nigeria.", terms: ["finance", "bank", "account", "audit", "insurance", "actuar", "investment", "tax"] },
  { slug: "technology", title: "Technology & IT Jobs in Nigeria", shortTitle: "Technology & IT", description: "Verified software, IT, data, digital, cybersecurity, fintech and telecom career routes in Nigeria.", terms: ["software", "technology", "ict", "digital", "data", "cyber", "telecom", "network", "fintech"] },
  { slug: "sales-marketing", title: "Sales & Marketing Jobs in Nigeria", shortTitle: "Sales & marketing", description: "Verified sales, marketing, commercial, customer-growth and business-development opportunities in Nigeria.", terms: ["sales", "marketing", "commercial", "customer", "business development", "relationship"] },
  { slug: "education-research", title: "Education & Research Jobs in Nigeria", shortTitle: "Education & research", description: "Verified teaching, academic, university, research and education-sector recruitment routes in Nigeria.", terms: ["teaching", "education", "academic", "research", "university", "lecturer"] },
  { slug: "logistics-supply-chain", title: "Logistics & Supply Chain Jobs in Nigeria", shortTitle: "Logistics & supply chain", description: "Verified logistics, shipping, warehousing, aviation, ports, transport and supply-chain careers in Nigeria.", terms: ["logistics", "supply chain", "shipping", "warehouse", "transport", "aviation", "port"] },
  { slug: "hr-admin-operations", title: "HR, Admin & Operations Jobs in Nigeria", shortTitle: "HR, admin & operations", description: "Verified human-resources, administration, people-operations, legal and operations career routes in Nigeria.", terms: ["human resources", "people operations", "administration", "admin", "operations", "legal", "project management"] },
];


import type { CareerOpportunity, JobRecordKind, JobSector } from "@/lib/jobs";
import retiredJobRoutes from "@/data/job-retired-redirects.json";

// Quality-first employer/recruitment wave.
// Board-only role names are retained only as redirects; they are not published as thin vacancy pages.

const VERIFIED_AT = "2026-10-05";

type CareerSeed = [organization: string, slug: string, sector: JobSector, category: string, url: string, location: string];
type RetiredVacancySeed = [title: string, location: string, category: string];

const careerSeeds = [
  [
    "ProvidusUnity Bank",
    "providusunity-bank-careers",
    "Private",
    "Banking",
    "https://www.providusbank.com/careers",
    "Nigeria"
  ],
  [
    "Union Bank of Nigeria",
    "union-bank-nigeria-careers",
    "Private",
    "Banking",
    "https://www.unionbankng.com/careers/",
    "Nigeria"
  ],
  [
    "SunTrust Bank Nigeria",
    "suntrust-bank-careers",
    "Private",
    "Banking",
    "https://suntrustng.com/careers-at-suntrust/",
    "Nigeria"
  ],
  [
    "LOTUS Bank",
    "lotus-bank-careers",
    "Private",
    "Banking",
    "https://ns2.lotusbank.com/careers",
    "Nigeria"
  ],
  [
    "PremiumTrust Bank",
    "premiumtrust-bank-careers",
    "Private",
    "Banking",
    "https://premiumtrustbank.com/careers/",
    "Nigeria"
  ],
  [
    "Keystone Bank",
    "keystone-bank-careers",
    "Private",
    "Banking",
    "https://www.keystonebankng.com/about-us/careers/",
    "Nigeria"
  ],
  [
    "Titan Trust Bank",
    "titan-trust-bank-careers",
    "Private",
    "Banking",
    "https://titantrustbank.seamlesshiring.com/",
    "Nigeria"
  ],
  [
    "Polaris Bank",
    "polaris-bank-careers",
    "Private",
    "Banking",
    "https://polarisbanklimited.zohorecruit.com/jobs/Careers/",
    "Nigeria"
  ],
  [
    "ARM",
    "arm-careers",
    "Private",
    "Finance",
    "https://careers.arm.com.ng/",
    "Nigeria"
  ],
  [
    "CardinalStone",
    "cardinalstone-careers",
    "Private",
    "Finance",
    "https://cardinalstone.com/careers/",
    "Nigeria"
  ],
  [
    "Vetiva",
    "vetiva-careers",
    "Private",
    "Finance",
    "https://vetiva.com/page/careers",
    "Nigeria"
  ],
  [
    "Meristem",
    "meristem-careers",
    "Private",
    "Finance",
    "https://careers.meristemng.com/",
    "Nigeria"
  ],
  [
    "Chapel Hill Denham",
    "chapel-hill-denham-careers",
    "Private",
    "Finance",
    "https://chapelhilldenham.com/careers/",
    "Nigeria"
  ],
  [
    "Coronation Merchant Bank",
    "coronation-merchant-bank-careers",
    "Private",
    "Banking",
    "https://www.coronationmb.com/careers/",
    "Nigeria"
  ],
  [
    "Greenwich Merchant Bank",
    "greenwich-merchant-bank-careers",
    "Private",
    "Banking",
    "https://www.greenwichbankgroup.com/22careers/",
    "Nigeria"
  ],
  [
    "Regency Alliance Insurance",
    "regency-alliance-careers",
    "Private",
    "Insurance",
    "https://regencyalliance.com/company-overview/careers/",
    "Nigeria"
  ],
  [
    "Prestige Assurance",
    "prestige-assurance-careers",
    "Private",
    "Insurance",
    "https://prestigeassuranceplc.com/Careers/",
    "Nigeria"
  ],
  [
    "Linkage Assurance",
    "linkage-assurance-careers",
    "Private",
    "Insurance",
    "https://www.linkageassurance.com/careers/",
    "Nigeria"
  ],
  [
    "Cornerstone Insurance",
    "cornerstone-insurance-careers",
    "Private",
    "Insurance",
    "https://cornerstone.com.ng/corporate/career.php",
    "Nigeria"
  ],
  [
    "NEM Insurance",
    "nem-insurance-careers",
    "Private",
    "Insurance",
    "https://nem-insurance.com/careers",
    "Nigeria"
  ],
  [
    "Universal Insurance",
    "universal-insurance-careers",
    "Private",
    "Insurance",
    "https://universalinsuranceplc.com/career/",
    "Nigeria"
  ],
  [
    "Veritas Kapital Assurance",
    "veritas-kapital-careers",
    "Private",
    "Insurance",
    "https://www.veritaskapital.com/Career.html",
    "Nigeria"
  ],
  [
    "Consolidated Hallmark Insurance",
    "consolidated-hallmark-careers",
    "Private",
    "Insurance",
    "https://www.ch-insure.com/career/",
    "Nigeria"
  ],
  [
    "Aradel Holdings",
    "aradel-holdings-careers",
    "Private",
    "Energy",
    "https://www.aradel.com/careers/",
    "Nigeria"
  ],
  [
    "Heirs Energies",
    "heirs-energies-careers",
    "Private",
    "Energy",
    "https://heirsenergies.com/careers/",
    "Nigeria"
  ],
  [
    "Rainoil",
    "rainoil-careers",
    "Private",
    "Energy",
    "https://www.rainoil.com.ng/careers/",
    "Nigeria"
  ],
  [
    "Egbin Power",
    "egbin-power-careers",
    "Private",
    "Energy",
    "https://egbin-power.com/careers/",
    "Lagos State"
  ],
  [
    "Oriental Energy Resources",
    "oriental-energy-careers",
    "Private",
    "Energy",
    "https://orientalenergy.com.ng/careers/",
    "Nigeria"
  ],
  [
    "Sahara Group",
    "sahara-group-careers",
    "Private",
    "Energy",
    "https://www.sahara-group.com/careers/",
    "Nigeria"
  ],
  [
    "Eterna Plc",
    "eterna-plc-careers",
    "Private",
    "Energy",
    "https://eternaplc.com/career/",
    "Nigeria"
  ],
  [
    "Guinness Nigeria",
    "guinness-nigeria-careers",
    "Private",
    "Manufacturing",
    "https://www.guinness-nigeria.com/careers/",
    "Nigeria"
  ],
  [
    "PZ Cussons",
    "pz-cussons-nigeria-careers",
    "Private",
    "Manufacturing",
    "https://www.pzcussons.com/careers/jobs/",
    "Nigeria"
  ],
  [
    "Honeywell Group",
    "honeywell-group-careers",
    "Private",
    "Manufacturing",
    "https://www.honeywellgroup.com/careers",
    "Nigeria"
  ],
  [
    "Beta Glass",
    "beta-glass-careers",
    "Private",
    "Manufacturing",
    "https://betaglass.com/our-society/join-our-global-team/",
    "Nigeria"
  ],
  [
    "Olam Group",
    "olam-nigeria-careers",
    "Private",
    "Manufacturing",
    "https://careers.olamgroup.com/",
    "Nigeria / global"
  ],
  [
    "Globacom",
    "globacom-careers",
    "Private",
    "Technology",
    "https://www.gloworld.com/ng/careers",
    "Nigeria"
  ],
  [
    "Nokia",
    "nokia-nigeria-careers",
    "Private",
    "Technology",
    "https://www.nokia.com/careers/",
    "Nigeria / global"
  ],
  [
    "SAP",
    "sap-nigeria-careers",
    "Private",
    "Technology",
    "https://www.sap.com/careers/",
    "Nigeria / global"
  ],
  [
    "Google Nigeria",
    "google-nigeria-careers",
    "Private",
    "Technology",
    "https://careers.google.com/jobs/",
    "Lagos, Nigeria"
  ],
  [
    "Dell Technologies",
    "dell-nigeria-careers",
    "Private",
    "Technology",
    "https://jobs.dell.com/",
    "Nigeria / global"
  ],
  [
    "Meta",
    "meta-nigeria-careers",
    "Private",
    "Technology",
    "https://www.metacareers.com/jobs/",
    "Nigeria / global"
  ],
  [
    "Helium Health",
    "helium-health-careers",
    "Private",
    "Healthcare",
    "https://heliumhealth.com/careers/",
    "Lagos, Nigeria"
  ],
  [
    "M-KOPA",
    "m-kopa-nigeria-careers",
    "Private",
    "Technology",
    "https://www.m-kopa.com/careers",
    "Lagos, Nigeria"
  ],
  [
    "Jumia",
    "jumia-nigeria-careers",
    "Private",
    "Technology",
    "https://group.jumia.com/careers/",
    "Nigeria"
  ],
  [
    "PalmPay",
    "palmpay-nigeria-careers",
    "Private",
    "Technology",
    "https://palmpaylimited.applytojob.com/",
    "Nigeria"
  ],
  [
    "PiggyVest",
    "piggyvest-careers",
    "Private",
    "Technology",
    "https://www.piggyvest.com/careers",
    "Nigeria"
  ],
  [
    "Reliance Health",
    "reliance-health-careers",
    "Private",
    "Healthcare",
    "https://getreliancehealth.com/careers/",
    "Nigeria"
  ],
  [
    "Chowdeck",
    "chowdeck-careers",
    "Private",
    "Technology",
    "https://chowdeck.com/earlytalent",
    "Nigeria"
  ],
  [
    "McKinsey Nigeria",
    "mckinsey-nigeria-careers",
    "Private",
    "Consulting",
    "https://www.mckinsey.com/ng/careers/itua",
    "Lagos, Nigeria"
  ],
  [
    "Boston Consulting Group Nigeria",
    "bcg-nigeria-careers",
    "Private",
    "Consulting",
    "https://careers.bcg.com/global/en/locations/nigeria/",
    "Lagos, Nigeria"
  ],
  [
    "Forvis Mazars Nigeria",
    "forvis-mazars-nigeria-careers",
    "Private",
    "Consulting",
    "https://careers-ng.forvismazars.com/",
    "Nigeria"
  ],
  [
    "Grant Thornton Nigeria",
    "grant-thornton-nigeria-careers",
    "Private",
    "Consulting",
    "https://www.grantthornton.com.ng/careers/experienced-professional/",
    "Nigeria"
  ],
  [
    "Max Air",
    "max-air-careers",
    "Private",
    "Aviation",
    "https://maxair.com.ng/recruitment",
    "Nigeria"
  ],
  [
    "Green Africa Airways",
    "green-africa-airways-careers",
    "Private",
    "Aviation",
    "https://careers.greenafrica.com/",
    "Nigeria"
  ],
  [
    "Azman Air",
    "azman-air-careers",
    "Private",
    "Aviation",
    "https://career.airazman.com/",
    "Nigeria"
  ],
  [
    "United Nigeria Airlines",
    "united-nigeria-airlines-careers",
    "Private",
    "Aviation",
    "https://flyunitednigeria.com/careers/",
    "Nigeria"
  ],
  [
    "Red Star Express",
    "red-star-express-careers",
    "Private",
    "Logistics",
    "https://redstarplc.com/about-us/careers/",
    "Nigeria"
  ],
  [
    "GIG Logistics",
    "gig-logistics-careers",
    "Private",
    "Logistics",
    "https://giglogistics.com/careers/",
    "Nigeria"
  ],
  [
    "Dana Group",
    "dana-group-careers",
    "Private",
    "Manufacturing",
    "https://career.danagroup.com/",
    "Nigeria"
  ],
  [
    "Arik Air",
    "arik-air-careers",
    "Private",
    "Aviation",
    "https://web.arikair.com/",
    "Nigeria"
  ],
  [
    "Roche",
    "roche-nigeria-careers",
    "Private",
    "Healthcare",
    "https://careers.roche.com/global/en/africa",
    "Nigeria / Africa"
  ],
  [
    "Novartis",
    "novartis-nigeria-careers",
    "Private",
    "Healthcare",
    "https://www.novartis.com/careers/career-search",
    "Nigeria / global"
  ],
  [
    "AstraZeneca",
    "astrazeneca-nigeria-careers",
    "Private",
    "Healthcare",
    "https://careers.astrazeneca.com/search-jobs/",
    "Nigeria / global"
  ],
  [
    "Johnson & Johnson",
    "johnson-johnson-nigeria-careers",
    "Private",
    "Healthcare",
    "https://www.careers.jnj.com/en",
    "Nigeria / global"
  ],
  [
    "Sanofi",
    "sanofi-nigeria-careers",
    "Private",
    "Healthcare",
    "https://jobs.sanofi.com/en/",
    "Nigeria / global"
  ],
  [
    "Bayer",
    "bayer-nigeria-careers",
    "Private",
    "Healthcare",
    "https://www.bayer.com/en/careers",
    "Nigeria / global"
  ],
  [
    "GSK",
    "gsk-nigeria-careers",
    "Private",
    "Healthcare",
    "https://jobs.gsk.com/",
    "Nigeria"
  ],
  [
    "Drugfield Pharmaceuticals",
    "drugfield-pharmaceuticals-careers",
    "Private",
    "Healthcare",
    "https://www.drugfieldpharma.com/about/careers/",
    "Ogun State, Nigeria"
  ],
  [
    "Covenant University",
    "covenant-university-careers",
    "Private",
    "Education",
    "https://careers.covenantuniversity.edu.ng/about/",
    "Ota, Ogun State"
  ],
  [
    "Nile University",
    "nile-university-careers",
    "Private",
    "Education",
    "https://nileuniversity.edu.ng/jobs-at-nile/",
    "Abuja, FCT"
  ],
  [
    "Bells University of Technology",
    "bells-university-careers",
    "Private",
    "Education",
    "https://www.bellsuniversity.edu.ng/careers/",
    "Ota, Ogun State"
  ],
  [
    "Lead City University",
    "lead-city-university-careers",
    "Private",
    "Education",
    "https://lcu.edu.ng/index.php/careers",
    "Ibadan, Oyo State"
  ],
  [
    "American University of Nigeria",
    "american-university-nigeria-careers",
    "Private",
    "Education",
    "https://aun.edu.ng/index.php/about/careers",
    "Yola, Adamawa State"
  ],
  [
    "Caleb University",
    "caleb-university-careers",
    "Private",
    "Education",
    "https://calebuniversity.edu.ng/news/vacancies-at-caleb-university-imota-lagos",
    "Imota, Lagos State"
  ],
  [
    "Nigeria Security and Civil Defence Corps",
    "nscdc-careers",
    "Government",
    "Public",
    "https://nscdc.gov.ng/nscdc-careers/",
    "Nigeria"
  ],
  [
    "Nigeria Revenue Service",
    "nigeria-revenue-service-careers",
    "Government",
    "Public",
    "https://recruitment.nrs.gov.ng/enlist/",
    "Nigeria"
  ],
  [
    "Nigeria Immigration Service",
    "nigeria-immigration-service-careers",
    "Government",
    "Public",
    "https://recruitment.cdcfib.org/",
    "Nigeria"
  ],
  [
    "Nigerian Correctional Service",
    "nigerian-correctional-service-careers",
    "Government",
    "Public",
    "https://www.corrections.gov.ng/news/recruitment-notice%21?news_id=137",
    "Nigeria"
  ],
  [
    "Federal Fire Service",
    "federal-fire-service-careers",
    "Government",
    "Public",
    "https://recruitment.cdcfib.org/",
    "Nigeria"
  ],
  [
    "Federal Character Commission",
    "federal-character-commission-recruitment",
    "Government",
    "Public",
    "https://fcc.gov.ng/recruitment/",
    "Nigeria"
  ]
] as CareerSeed[];

const topicByCategory: Record<string, string[]> = {
  Banking: ["banking-finance"],
  Finance: ["banking-finance"],
  Insurance: ["insurance", "banking-finance"],
  Energy: ["oil-gas-energy"],
  Manufacturing: ["fmcg-manufacturing"],
  Technology: ["tech-fintech"],
  Healthcare: ["healthcare-pharma"],
  Consulting: ["consulting-professional-services"],
  Aviation: ["aviation-logistics"],
  Logistics: ["aviation-logistics"],
  Education: ["universities-research"],
  Public: ["public-service"],
};

const fieldsByCategory: Record<string, string[]> = {
  Banking: ["Banking", "Finance", "Risk", "Operations", "Technology", "Customer Service"],
  Finance: ["Investment", "Finance", "Research", "Risk", "Operations", "Technology"],
  Insurance: ["Insurance", "Underwriting", "Claims", "Actuarial", "Finance", "Sales"],
  Energy: ["Energy", "Engineering", "Operations", "Projects", "Commercial", "Finance"],
  Manufacturing: ["Manufacturing", "Engineering", "Supply Chain", "Quality", "Sales", "Finance"],
  Technology: ["Technology", "Software", "Data", "Product", "Operations", "Commercial"],
  Healthcare: ["Healthcare", "Clinical", "Pharmaceuticals", "Operations", "Technology", "Commercial"],
  Consulting: ["Consulting", "Advisory", "Audit", "Tax", "Technology", "Corporate Services"],
  Aviation: ["Aviation", "Flight Operations", "Engineering", "Ground Operations", "Commercial", "Corporate Services"],
  Logistics: ["Logistics", "Supply Chain", "Fleet", "Operations", "Customer Service", "Finance"],
  Education: ["Teaching", "Research", "Administration", "Technology", "Student Services"],
  Public: ["Public Service", "Operations", "Administration", "Technology", "Regulation"],
};

const audienceByCategory: Record<string, string[]> = {
  Banking: ["Graduates", "Banking professionals", "Finance professionals", "Technology professionals"],
  Finance: ["Graduates", "Investment professionals", "Finance professionals", "Analysts"],
  Insurance: ["Graduates", "Insurance professionals", "Actuarial professionals", "Sales professionals"],
  Energy: ["Engineers", "Energy professionals", "Graduates", "Experienced hires"],
  Manufacturing: ["Engineers", "Manufacturing professionals", "Graduates", "Commercial professionals"],
  Technology: ["Software professionals", "Technology professionals", "Graduates", "Commercial professionals"],
  Healthcare: ["Healthcare professionals", "Clinical professionals", "Scientists", "Corporate professionals"],
  Consulting: ["Graduates", "Consultants", "Accountants", "Technology professionals"],
  Aviation: ["Aviation professionals", "Engineers", "Operations professionals", "Graduates"],
  Logistics: ["Logistics professionals", "Operations professionals", "Graduates", "Commercial professionals"],
  Education: ["Academics", "Researchers", "Administrators", "Technical professionals"],
  Public: ["Graduates", "Public-service applicants", "Technical professionals", "Experienced hires"],
};

function careerPage([organization, slug, sector, category, url, location]: CareerSeed): CareerOpportunity {
  const fields = fieldsByCategory[category] ?? ["Operations", "Administration", "Technology"];
  const audiences = audienceByCategory[category] ?? ["Graduates", "Experienced hires"];
  const fieldSummary = fields.slice(0, 5).join(", ");
  return {
    slug,
    title: organization + " Careers & Official Recruitment Portal",
    organization,
    kind: "career-page",
    topicSlugs: topicByCategory[category] ?? [],
    sector,
    status: "career-page",
    statusLabel: "Official employer career portal",
    summary: "Use " + organization + "'s verified official careers or recruitment source to find current openings, programmes and application instructions. This is an employer portal guide, not a claim that a particular vacancy is open today.",
    location,
    employmentType: category + " careers / employer recruitment portal",
    audiences,
    fields,
    qualifications: [
      "This is an employer career portal rather than a single vacancy, so there is no one qualification that applies to every role.",
      "Open the exact vacancy or programme on " + organization + "'s official source and use its published education, experience, licence and location criteria as the controlling requirements."
    ],
    requirements: [
      "Choose a specific vacancy or programme that the official source currently shows as available.",
      "Confirm the role title, location, employment type, deadline and eligibility on the exact employer page before submitting.",
      "Use only the application route identified by " + organization + "; MyNigeriaGuide does not collect applications or recruitment payments.",
      "If the official source no longer shows the role you wanted, treat that role as unavailable until the employer republishes it."
    ],
    documents: [
      "An up-to-date CV/resume suitable for the exact role.",
      "Only the academic, professional, identity or portfolio documents requested by the selected " + organization + " vacancy."
    ],
    applicationSteps: [
      "Open " + organization + "'s verified official careers or recruitment source.",
      "Browse or search the employer's current opportunities. Common hiring areas covered by this guide include " + fieldSummary + ".",
      "Open the exact vacancy or programme before applying; read its responsibilities, qualifications, location, deadline and application method.",
      "Prepare the documents requested by that exact vacancy instead of sending unrelated credentials.",
      "Submit through the employer's stated Apply control, recruitment portal or application instruction and keep the confirmation for your records."
    ],
    officialUrl: url,
    officialUrlLabel: "Open " + organization + " official careers source",
    verifiedAt: VERIFIED_AT,
    feeNote: "Verify any payment, assessment or document request against " + organization + "'s official recruitment instructions. MyNigeriaGuide does not sell access to jobs, shortlists or interviews.",
    sourceNotes: [
      "The linked source is the employer or responsible organisation's own careers, recruitment or talent route.",
      "This page intentionally does not invent vacancy-specific qualifications where the source is an employer-wide career portal.",
      "A separate MyNigeriaGuide vacancy page should exist only when a distinct official role source and substantive role details have been verified."
    ],
    sources: [{ label: organization + " official careers / recruitment source", url, lastChecked: VERIFIED_AT }],
  };
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const retiredVacancyGroups: Array<[string, JobSector, string, RetiredVacancySeed[]]> = [
  [
    "Reliance Health",
    "Private",
    "https://getreliancehealth.com/careers/",
    [
      [
        "Associate Data Scientist",
        "Nigeria / Remote",
        "Data Science"
      ],
      [
        "Associate Manager, Clinic Operations",
        "Nigeria / Hybrid",
        "Healthcare Operations"
      ],
      [
        "Associate Medical Laboratory Scientist",
        "Nigeria / Hybrid",
        "Medical Laboratory Science"
      ],
      [
        "Associate Medical Officer",
        "Nigeria / Hybrid",
        "Medicine"
      ],
      [
        "Associate Nursing Officer",
        "Nigeria / Hybrid",
        "Nursing"
      ],
      [
        "Associate Pharmacist",
        "Nigeria / Hybrid",
        "Pharmacy"
      ],
      [
        "Associate Pharmacy Technician",
        "Nigeria / Hybrid",
        "Pharmacy"
      ],
      [
        "Associate Product Manager",
        "Nigeria / Remote",
        "Product"
      ],
      [
        "Backend Software Engineer",
        "Nigeria / Remote",
        "Software Engineering"
      ],
      [
        "Business Intelligence Associate",
        "Nigeria / Remote",
        "Data & Analytics"
      ],
      [
        "Client Relationship Associate — Abuja",
        "Abuja, FCT / Hybrid",
        "Customer Success"
      ],
      [
        "Client Relationship Associate — Eastern Region",
        "Eastern Nigeria / Hybrid",
        "Customer Success"
      ],
      [
        "Client Relationship Associate — Lagos",
        "Lagos / Hybrid",
        "Customer Success"
      ],
      [
        "Communications Associate — French Speaking",
        "Nigeria / Remote",
        "Communications"
      ],
      [
        "Data Scientist",
        "Nigeria / Remote",
        "Data Science"
      ],
      [
        "DevOps Engineer",
        "Nigeria / Remote",
        "Engineering"
      ],
      [
        "Finance Associate",
        "Nigeria / Remote",
        "Finance"
      ],
      [
        "IT Support Associate",
        "Nigeria / Hybrid",
        "Information Technology"
      ],
      [
        "Manager, Brand and Growth",
        "Nigeria / Remote",
        "Marketing"
      ],
      [
        "Manager, Client Relations",
        "Nigeria / Remote",
        "Customer Success"
      ],
      [
        "Manager, Engineering",
        "Nigeria / Remote",
        "Engineering"
      ],
      [
        "Manager, Legal and Compliance Services",
        "Nigeria / Remote",
        "Legal & Compliance"
      ],
      [
        "Manager, People Operations",
        "Nigeria / Remote",
        "Human Resources"
      ],
      [
        "Manager, Product Design",
        "Nigeria / Remote",
        "Product Design"
      ],
      [
        "Manager, Provider Relations",
        "Nigeria / Remote",
        "Healthcare Operations"
      ],
      [
        "Manager, Relarex",
        "Nigeria / Hybrid",
        "Healthcare Operations"
      ],
      [
        "Operations Associate / Front Desk Officer",
        "Nigeria / Hybrid",
        "Operations"
      ],
      [
        "People Partnering Associate",
        "Nigeria / Remote",
        "Human Resources"
      ],
      [
        "Reliance Care Officer",
        "Nigeria / Remote",
        "Customer Success"
      ],
      [
        "Reliance Care Officer — French Speaking",
        "Nigeria / Remote",
        "Customer Success"
      ],
      [
        "Sales Associate — Small Business",
        "Nigeria / Hybrid",
        "Sales"
      ],
      [
        "Sales Excellence Associate — Nigeria",
        "Nigeria / Remote",
        "Sales Operations"
      ],
      [
        "Senior Administrative Associate — Abuja",
        "Abuja, FCT / Hybrid",
        "Administration"
      ],
      [
        "Senior Administrative Associate — Ejigbo & Akowonjo",
        "Lagos / Hybrid",
        "Administration"
      ],
      [
        "Senior Administrative Associate — Port Harcourt",
        "Port Harcourt, Rivers State / Hybrid",
        "Administration"
      ],
      [
        "Senior Administrative Associate — Ajah & Lekki",
        "Lagos / Hybrid",
        "Administration"
      ],
      [
        "Senior Administrative Associate — Surulere & Gbagada",
        "Lagos / Hybrid",
        "Administration"
      ],
      [
        "Senior Associate Pharmacist",
        "Nigeria / Hybrid",
        "Pharmacy"
      ],
      [
        "Senior Business Intelligence Associate",
        "Nigeria / Remote",
        "Data & Analytics"
      ],
      [
        "Talent Acquisition Associate",
        "Nigeria / Remote",
        "Human Resources"
      ]
    ]
  ],
  [
    "PalmPay",
    "Private",
    "https://palmpaylimited.applytojob.com/",
    [
      [
        "Sales Officer — Lagos",
        "Lagos, Nigeria",
        "Sales"
      ],
      [
        "Credit Risk Manager",
        "Ikeja, Lagos",
        "Risk"
      ],
      [
        "Business Developer (PWT)",
        "Lagos, Nigeria",
        "Business Development"
      ],
      [
        "Credit Reviewer — Hausa Speaker",
        "Ikeja, Lagos",
        "Credit"
      ],
      [
        "Dealer Manager — Buy Now Pay Later",
        "Benue State",
        "Sales"
      ],
      [
        "In-Shop Sales Promoter — Ikeja",
        "Ikeja, Lagos",
        "Sales"
      ],
      [
        "In-Shop Sales Promoter — Ondo",
        "Ondo State",
        "Sales"
      ],
      [
        "In-Shop Sales Promoter — Oyo",
        "Oyo State",
        "Sales"
      ],
      [
        "In-Shop Sales Promoter — Ogun",
        "Ogun State",
        "Sales"
      ],
      [
        "Sales Agents — Ogun, Ondo & Oyo",
        "Ogun / Ondo / Oyo",
        "Sales"
      ],
      [
        "Sales Officer — Abuja, Kaduna & Plateau",
        "Abuja / Kaduna / Plateau",
        "Sales"
      ],
      [
        "Sales Officer — South & South-East States",
        "Kwara / Enugu / Delta / Edo / Ondo / Osun / Abia / Akwa Ibom / Imo / Rivers",
        "Sales"
      ],
      [
        "Sales Agents — Lagos",
        "Lagos, Nigeria",
        "Sales"
      ],
      [
        "Sales Manager — BNPL Ajah, Ikoyi & Lekki",
        "Lagos, Nigeria",
        "Sales"
      ],
      [
        "Sales Agents — BNPL South States",
        "Edo / Delta / Rivers / Anambra / Enugu / Cross River / Akwa Ibom",
        "Sales"
      ],
      [
        "Business Developer — Multi-State",
        "Lagos / Cross River / Anambra / Enugu / Ekiti / Ogun",
        "Business Development"
      ],
      [
        "Field Verification Officer — Multi-State",
        "Delta / Ondo / Kaduna / Benue",
        "Operations"
      ],
      [
        "QA Operations Support",
        "Ikeja, Lagos",
        "Operations"
      ],
      [
        "Call Verification Officer",
        "Ikeja, Lagos",
        "Operations"
      ],
      [
        "Head of Sales",
        "Ikeja, Lagos",
        "Sales"
      ]
    ]
  ],
  [
    "Dana Group",
    "Private",
    "https://career.danagroup.com/",
    [
      [
        "Logistics Officer",
        "Victoria Island, Lagos",
        "Logistics"
      ],
      [
        "Technical Training Coordinator — Dana Motors",
        "Lagos, Nigeria",
        "Training"
      ],
      [
        "Finance Manager",
        "Lagos, Nigeria",
        "Finance"
      ],
      [
        "Sales Manager",
        "Lagos, Nigeria",
        "Sales"
      ],
      [
        "Service Manager",
        "Lagos, Nigeria",
        "Operations"
      ],
      [
        "Driver",
        "Lagos, Nigeria",
        "Transport"
      ],
      [
        "Production Pharmacist — Minna",
        "Minna, Niger State",
        "Pharmacy"
      ],
      [
        "Sales Executive — Dana Motors",
        "Victoria Island, Lagos",
        "Sales"
      ],
      [
        "Legal Assistant",
        "Lagos, Nigeria",
        "Legal"
      ],
      [
        "Logistics Officer — Dana Motors",
        "Lagos, Nigeria",
        "Logistics"
      ],
      [
        "Marketing Executive — Dana Motors",
        "Victoria Island, Lagos",
        "Marketing"
      ],
      [
        "Sales Representative — Household Plastics",
        "Lagos, Nigeria",
        "Sales"
      ],
      [
        "Sales Representative — Dana Plast",
        "Lagos, Nigeria",
        "Sales"
      ],
      [
        "Superintendent Pharmacist — Regulatory",
        "Lagos, Nigeria",
        "Pharmacy"
      ],
      [
        "Auto Electrician",
        "Lagos, Nigeria",
        "Engineering"
      ],
      [
        "Superintendent Pharmacist — Production & Warehousing",
        "Ibadan, Oyo State",
        "Pharmacy"
      ],
      [
        "IT Officer — Full Stack Developer",
        "Lagos, Nigeria",
        "Software Engineering"
      ],
      [
        "Chief Security Officer",
        "Lagos, Nigeria",
        "Security"
      ],
      [
        "Maintenance Officer — Dana Plast",
        "Lagos, Nigeria",
        "Engineering"
      ],
      [
        "Production Engineer — Dana Plast",
        "Lagos, Nigeria",
        "Engineering"
      ]
    ]
  ],
  [
    "GIG Logistics",
    "Private",
    "https://giglogistics.com/careers/",
    [
      [
        "Legal Officer",
        "Nigeria",
        "Legal"
      ],
      [
        "Senior Finance Executive",
        "Nigeria",
        "Finance"
      ],
      [
        "E-commerce Account Officer",
        "Nigeria",
        "E-commerce"
      ],
      [
        "Senior Business Development Executive",
        "Nigeria",
        "Business Development"
      ],
      [
        "DGM Fleet",
        "Nigeria",
        "Fleet Operations"
      ],
      [
        "Fleet Maintenance Manager",
        "Nigeria",
        "Fleet Operations"
      ],
      [
        "Gateway Manager",
        "Nigeria",
        "Logistics"
      ],
      [
        "Gateway Supervisor",
        "Nigeria",
        "Logistics"
      ],
      [
        "Contact Centre & Service Quality Assurance Manager",
        "Nigeria",
        "Customer Service"
      ],
      [
        "Finance Executive — Receivables",
        "Nigeria",
        "Finance"
      ]
    ]
  ],
  [
    "United Nigeria Airlines",
    "Private",
    "https://flyunitednigeria.com/careers/",
    [
      [
        "Internal Auditor",
        "Enugu, Nigeria",
        "Audit"
      ],
      [
        "Senior Internal Auditor",
        "Lagos, Nigeria",
        "Audit"
      ],
      [
        "Embraer 170/175/190 B1 & B2 Engineer",
        "Enugu, Nigeria",
        "Aviation Engineering"
      ],
      [
        "Financial Accountant",
        "Enugu, Nigeria",
        "Finance"
      ],
      [
        "Duty Manager",
        "Abuja / Lagos / Enugu",
        "Aviation Operations"
      ],
      [
        "Manager, Revenue Management Pricing",
        "Abuja / Lagos / Enugu",
        "Revenue Management"
      ],
      [
        "Head, Global Sales & Marketing",
        "Abuja / Lagos / Enugu",
        "Sales & Marketing"
      ],
      [
        "Treasury Officer / Analyst",
        "Abuja / Lagos / Enugu",
        "Finance"
      ]
    ]
  ],
  [
    "Jumia",
    "Private",
    "https://group.jumia.com/careers/",
    [
      [
        "CS Sales Team Lead",
        "Nigeria",
        "Sales Operations"
      ],
      [
        "Inventory Team Lead",
        "Nigeria",
        "Supply Chain"
      ],
      [
        "Last Mile Team Lead — Door Delivery",
        "Nigeria",
        "Logistics"
      ],
      [
        "First Mile & Last Mile Manager",
        "Nigeria",
        "Logistics"
      ],
      [
        "Sales Network Manager — Regional",
        "Nigeria",
        "Sales"
      ]
    ]
  ],
  [
    "Beta Glass",
    "Private",
    "https://betaglass.com/our-society/join-our-global-team/",
    [
      [
        "Financial Controller",
        "Lagos, Nigeria",
        "Finance"
      ],
      [
        "Procurement Supervisor — Indirect Materials",
        "Lagos, Nigeria",
        "Procurement"
      ],
      [
        "Senior Legal Officer",
        "Lagos, Nigeria",
        "Legal"
      ]
    ]
  ],
  [
    "PZ Cussons",
    "Private",
    "https://www.pzcussons.com/careers/jobs/",
    [
      [
        "Instrumentation Manager",
        "Ikorodu, Lagos",
        "Engineering"
      ],
      [
        "Territory Sales Manager",
        "Enugu, Nigeria",
        "Sales"
      ],
      [
        "Factory Machine Operator",
        "Aba, Abia State",
        "Manufacturing"
      ]
    ]
  ]
];

const federalUniversityLafia: CareerOpportunity = {
  slug: "federal-university-lafia-staff-recruitment-2026",
  title: "Federal University of Lafia Staff Recruitment 2026",
  organization: "Federal University of Lafia",
  kind: "recruitment-exercise" as JobRecordKind,
  topicSlugs: ["universities-research", "public-service"],
  sector: "Government",
  status: "open",
  statusLabel: "Ongoing on official government recruitment directory",
  summary: "The Federal Character Commission recruitment directory lists an ongoing Federal University of Lafia staff recruitment exercise with a closing date of 28 October 2026.",
  location: "Lafia, Nasarawa State",
  employmentType: "University staff positions",
  audiences: ["Academics", "University professionals", "Senior applicants"],
  fields: ["Education", "Teaching", "Research", "Administration"],
  qualifications: ["Review the Federal University of Lafia advertisement linked through the Federal Character Commission directory for the exact qualification and experience requirements of each position."],
  requirements: ["Confirm the staff position you intend to apply for.", "Follow the university's official submission instructions.", "Submit before the published closing date."],
  documents: ["Application materials and credentials specified in the Federal University of Lafia advertisement"],
  applicationSteps: ["Open the Federal Character Commission recruitment directory.", "Open the Federal University of Lafia listing.", "Read the full staff-position advertisement and requirements.", "Submit through the route stated in the responsible university notice before 28 October 2026."],
  officialUrl: "https://fcc.gov.ng/recruitment/",
  officialUrlLabel: "Open FCC recruitment directory",
  verifiedAt: VERIFIED_AT,
  deadline: "2026-10-28",
  nextMilestone: "Applications close 28 October 2026.",
  feeNote: "Use only the official government/university instructions attached to the recruitment listing.",
  sourceNotes: ["The Federal Character Commission directory marks the Federal University of Lafia recruitment as ongoing, posted 23 September 2026, with a 28 October 2026 deadline."],
  sources: [{ label: "Federal Character Commission Recruitment Directory", url: "https://fcc.gov.ng/recruitment/", lastChecked: VERIFIED_AT }],
};

export const retiredJobRedirects = new Map<string, string>(
  retiredJobRoutes.map(({ sourceSlug, destinationPath }) => [sourceSlug, destinationPath])
);

export const jobScaleWave: CareerOpportunity[] = [
  ...careerSeeds.map(careerPage),
  federalUniversityLafia,
];

if (jobScaleWave.length !== 81) {
  throw new Error("Quality-first Jobs scale wave must contain exactly 81 records; found " + jobScaleWave.length);
}

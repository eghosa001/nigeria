import { jobGrowthWave10 } from "@/lib/job-growth-wave-10";
import { verifiedTrendProgrammes } from "@/lib/job-trend-programmes-2026-10-08";
import { jobGrowthWave9 } from "@/lib/job-growth-wave-9";
import { jobGrowthWave8 } from "@/lib/job-growth-wave-8";
import { jobGrowthWave7 } from "@/lib/job-growth-wave-7";
import { jobGrowthWave6 } from "@/lib/job-growth-wave-6";
import { jobGrowthWave5 } from "@/lib/job-growth-wave-5";
import { jobScaleWave, templateCareerPortalSlugs } from "@/lib/job-scale-wave";
import { jobGrowthWave } from "@/lib/job-growth-wave-2026-10-06";
import { jobGrowthWave2 } from "@/lib/job-growth-wave-2";
import { jobGrowthWaveThree } from "@/lib/job-growth-wave-2026-10-06-b";

export type JobSector = "Government" | "Private" | "International";
export type JobStatus = "open" | "closed" | "screening" | "training" | "career-page" | "upcoming";
export type JobRecordKind = "vacancy" | "programme" | "recruitment-exercise" | "career-page";
export type SchemaEmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "TEMPORARY" | "INTERN" | "VOLUNTEER" | "PER_DIEM" | "OTHER";

export type JobPostingLocation = {
  locality?: string;
  region?: string;
  country: string;
};

export type JobPostingMetadata = {
  jobTitle: string;
  datePosted: string;
  employmentType?: SchemaEmploymentType | SchemaEmploymentType[];
  locations: JobPostingLocation[];
};

export type JobPostingAuthorization = {
  publicEvidenceUrl: string;
  verifiedAt: string;
  note: string;
};

export type JobSource = {
  label: string;
  url: string;
  lastChecked: string;
};

export type CareerOpportunity = {
  slug: string;
  title: string;
  organization: string;
  kind?: JobRecordKind;
  posting?: JobPostingMetadata;
  jobPostingAuthorization?: JobPostingAuthorization;
  topicSlugs?: string[];
  sector: JobSector;
  status: JobStatus;
  statusLabel: string;
  summary: string;
  location: string;
  employmentType: string;
  audiences: string[];
  fields: string[];
  qualifications: string[];
  requirements: string[];
  documents: string[];
  applicationSteps: string[];
  officialUrl: string;
  officialUrlLabel: string;
  verifiedAt: string;
  deadline?: string;
  nextMilestone?: string;
  feeNote: string;
  sourceNotes: string[];
  sources: JobSource[];
};

function ensureMinimum(items: string[], fallbacks: string[], minimum: number) {
  const result = [...items];
  for (const fallback of fallbacks) {
    if (result.length >= minimum) break;
    if (!result.includes(fallback)) result.push(fallback);
  }
  return result;
}

function normalizeCareerPortal(item: CareerOpportunity): CareerOpportunity {
  if (item.status !== "career-page" && item.kind !== "career-page") return item;

  const fields = item.fields.slice(0, 5).join(", ");
  const portalLabel = item.organization + " official careers or recruitment source";

  return {
    ...item,
    kind: "career-page",
    qualifications: ensureMinimum(item.qualifications, [
      "This is an employer-wide careers or recruitment page, so there is no single qualification that applies to every role.",
      "Use the exact vacancy or programme on " + portalLabel + " as the controlling source for education, experience, licence and location requirements."
    ], 2),
    requirements: ensureMinimum(item.requirements, [
      "Confirm that the exact vacancy or programme is currently visible on " + portalLabel + " before applying.",
      "Check the selected role's location, contract type, eligibility, experience and closing date rather than assuming the portal uses one rule for every vacancy.",
      "Use only the employer's stated application route and do not pay MyNigeriaGuide or an unofficial intermediary for access to a shortlist or interview.",
      "If the role you want is no longer visible on the official source, treat it as unavailable until the employer republishes it."
    ], 4),
    documents: ensureMinimum(item.documents, [
      "An up-to-date CV/resume tailored to the selected role.",
      "Only the academic, professional, identity or portfolio documents requested by that exact vacancy."
    ], 2),
    applicationSteps: ensureMinimum(item.applicationSteps, [
      "Open " + portalLabel + ".",
      "Browse or search the employer's current opportunities; relevant hiring areas on this guide include " + fields + ".",
      "Open the exact vacancy or programme and read its responsibilities, qualifications, location, deadline and application method.",
      "Prepare only the documents requested for that selected role.",
      "Submit through the employer's official Apply control, portal or stated application instruction and keep the confirmation."
    ], 5),
    sourceNotes: ensureMinimum(item.sourceNotes, [
      "The linked source belongs to the responsible employer or organisation and is used as the primary reference for current recruitment information.",
      "This MyNigeriaGuide page is an employer-wide portal guide; it does not claim that every role historically associated with the organisation is currently open.",
      "Role-specific qualifications and deadlines are intentionally taken from the exact employer vacancy, not invented at portal level."
    ], 3),
  };
}

const rawJobOpportunities: CareerOpportunity[] = [
  ...verifiedTrendProgrammes,
  ...jobGrowthWave10,
  ...jobGrowthWave9,
  ...jobGrowthWave8,
  ...jobGrowthWave7,
  ...jobGrowthWave6,
  ...jobGrowthWave5,
  ...jobGrowthWave,
  ...jobGrowthWave2,
  ...jobGrowthWaveThree,
  {
    slug: "firstbank-technology-academy-2026",
    title: "FirstBank Technology Academy Graduate Trainee Programme 2026",
    organization: "FirstBank Nigeria",
    kind: "programme",
    sector: "Private",
    status: "open",
    statusLabel: "Applications open until 18 October 2026",
    summary: "FirstBank is recruiting young STEM graduates into its 2026 Technology Academy, a talent-development route for technology careers supporting the bank's digital transformation. The current application deadline is 18 October 2026.",
    location: "Nigeria",
    employmentType: "Graduate technology trainee programme",
    audiences: ["STEM graduates", "Engineering graduates", "Computer science graduates", "IT graduates", "Data and technology applicants"],
    fields: ["Software engineering", "Application support", "Cybersecurity", "Infrastructure", "Data science", "Analytics", "Banking technology"],
    qualifications: [
      "Degree in Computer Science, Engineering, Information Technology, Information Systems, Mathematics, Statistics, Physics or a related STEM discipline.",
      "Minimum Second Class Upper (2:1) degree or equivalent.",
      "Completed NYSC or a valid exemption certificate.",
      "Strong analytical and problem-solving ability plus clear interest in technology and continuous learning."
    ],
    requirements: [
      "Use the official FirstBank Oracle recruitment page linked from the current vacancy notice.",
      "Confirm that your degree discipline and class meet the published Technology Academy eligibility before applying.",
      "Submit before 18 October 2026 and do not pay anyone for access to the recruitment process."
    ],
    documents: ["CV/resume", "Degree/qualification details", "NYSC discharge or exemption information", "Other identity or application details requested by the official FirstBank recruitment system"],
    applicationSteps: [
      "Open the official FirstBank candidate-experience vacancy page.",
      "Review the Technology Academy eligibility and confirm your STEM degree, grade and NYSC status.",
      "Complete the candidate profile and upload the information requested by FirstBank's recruitment system.",
      "Submit before 18 October 2026 and retain the application confirmation."
    ],
    officialUrl: "https://hdbc.fa.em2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/job/1829",
    officialUrlLabel: "Apply on FirstBank's official recruitment system",
    verifiedAt: "2026-10-06",
    deadline: "2026-10-18",
    nextMilestone: "Applications close 18 October 2026.",
    feeNote: "No application fee is stated. Use only FirstBank's official recruitment system and ignore payment requests from third parties.",
    sourceNotes: [
      "The current vacancy is specifically for FirstBank's Technology Academy graduate-trainee pipeline.",
      "FirstBank has previously described the Technology Academy as a recurring strategic initiative for building its technology talent pool."
    ],
    sources: [
      { label: "FirstBank official Oracle recruitment page", url: "https://hdbc.fa.em2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/job/1829", lastChecked: "2026-10-06" },
      { label: "FirstBank Technology Academy vacancy summary", url: "https://www.opportunitiesforafricans.com/first-bank-nigeria-technology-academy-graduate-trainee-program-2026/", lastChecked: "2026-10-06" }
    ]
  },
  {
    slug: "kaduna-phcb-recruitment-2026",
    title: "Kaduna State PHCB Recruitment 2026 — 10 Health Vacancies",
    organization: "Kaduna State Primary Health Care Board",
    kind: "recruitment-exercise",
    sector: "Government",
    status: "open",
    statusLabel: "Applications open until 14 October 2026",
    summary: "Kaduna State's official recruitment portal is accepting applications for 10 permanent and pensionable Primary Health Care Board vacancy positions from 4 to 14 October 2026.",
    location: "Kaduna State, Nigeria",
    employmentType: "Permanent and pensionable health-service appointments",
    audiences: ["Nurses and midwives", "Community health workers", "Environmental health professionals", "Health educators", "Nutrition professionals", "Health information professionals"],
    fields: ["Nursing", "Midwifery", "Community health", "Environmental health", "Health education", "Nutrition", "Health information management"],
    qualifications: [
      "Qualifications differ by vacancy. Examples on the official portal include Registered Nurse/Registered Midwife for Nursing Officer Grade III, CHEW/Community Health Technician qualifications for community-health roles, and an Environmental Health Science degree for Environmental Health Officer Grade II.",
      "The relevant professional registration is required for regulated roles and is considered during screening.",
      "Applicants should open the exact vacancy on the Kaduna recruitment portal and use that role's qualification and CONHESS details as the controlling requirement."
    ],
    requirements: [
      "Create or use the applicant profile required by the official Kaduna State recruitment portal.",
      "Apply only to roles for which your education and professional registration match the vacancy requirements.",
      "Treat the official portal's closing date of 14 October 2026 as the deadline rather than dates copied to third-party job sites."
    ],
    documents: ["Education credentials relevant to the selected vacancy", "Professional registration evidence where required", "Identity/profile information requested by the official portal"],
    applicationSteps: [
      "Open the official Kaduna State Recruitment Portal and review the 10 PHCB vacancies.",
      "Open the exact role that matches your qualification and confirm the CONHESS placement, appointment type and professional registration requirement.",
      "Complete or update your applicant profile and attach the credentials requested for that role.",
      "Submit the application through the official Apply control before 14 October 2026 and retain the confirmation."
    ],
    officialUrl: "https://recruitment.kdsg.gov.ng/",
    officialUrlLabel: "Open the official Kaduna State recruitment portal",
    verifiedAt: "2026-10-06",
    deadline: "2026-10-14",
    nextMilestone: "The official vacancy window closes 14 October 2026.",
    feeNote: "Use only the Kaduna State Government recruitment portal. No application fee is shown on the public vacancy listing.",
    sourceNotes: [
      "The official portal currently lists 10 PHCB vacancy positions for the 4–14 October 2026 window.",
      "The public listings include permanent and pensionable appointments across nursing, community health, environmental health, nutrition and health-information roles."
    ],
    sources: [
      { label: "Kaduna State Recruitment Portal — PHCB vacancies", url: "https://recruitment.kdsg.gov.ng/", lastChecked: "2026-10-06" }
    ]
  },
  {
    slug: "federal-university-lafia-recruitment-2026",
    title: "Federal University of Lafia Recruitment 2026 — Academic & Non-Teaching Staff",
    organization: "Federal University of Lafia",
    kind: "recruitment-exercise",
    sector: "Government",
    status: "open",
    statusLabel: "Applications open until 28 October 2026",
    summary: "Federal University of Lafia is recruiting academic and non-teaching staff. The Federal Character Commission's official listing marks the exercise ongoing, posted 23 September 2026, with an application deadline of 28 October 2026.",
    location: "Lafia, Nasarawa State",
    employmentType: "Full-time university appointments",
    audiences: ["Academic staff applicants", "University professionals", "Health professionals", "ICT applicants", "Administrative applicants"],
    fields: ["Agriculture", "Arts", "Medical sciences", "Clinical sciences", "Computing", "Education", "Environmental design", "Management sciences", "Pharmacy", "Physical sciences", "Social sciences", "Veterinary medicine", "University administration"],
    qualifications: [
      "Academic ranks and qualifications vary by department, from Assistant Lecturer through senior academic positions; applicants must use the requirements stated for the exact rank and discipline.",
      "The official listing also includes non-teaching/professional positions with role-specific education, experience and registration requirements.",
      "Applicants should not assume one qualification applies across the entire recruitment exercise."
    ],
    requirements: [
      "Choose only a vacancy and rank for which you meet the published qualification and experience requirements.",
      "Follow the application and referee instructions in the Federal University of Lafia recruitment notice.",
      "Use the Federal Character Commission's official listing to verify the exercise and deadline before submitting."
    ],
    documents: ["CV and academic/professional credentials required for the selected position", "Supporting experience/publication evidence where the selected academic rank requires it", "Referee information/reports where requested by the official notice"],
    applicationSteps: [
      "Open the Federal Character Commission's official Federal University of Lafia vacancy listing.",
      "Review the advertised academic and non-teaching positions and choose the exact role/rank you qualify for.",
      "Follow the university application route and referee instructions stated in the notice.",
      "Submit before 28 October 2026 and keep your application evidence."
    ],
    officialUrl: "https://fcc.gov.ng/job-listings/federal-university-of-lafia-p-m-b-146-lafia-nasarawa-state-office-of-the-registrar-www-fulafia-edu-ng/",
    officialUrlLabel: "Open the official Federal Character Commission vacancy listing",
    verifiedAt: "2026-10-06",
    deadline: "2026-10-28",
    nextMilestone: "Applications close 28 October 2026.",
    feeNote: "No recruitment fee is stated in the official Federal Character Commission listing. Avoid unofficial payment requests.",
    sourceNotes: [
      "The Federal Character Commission lists the recruitment as ongoing and gives 28 October 2026 as the deadline.",
      "The exercise covers academic staff across multiple faculties as well as non-teaching/professional positions."
    ],
    sources: [
      { label: "Federal Character Commission — Federal University of Lafia vacancies", url: "https://fcc.gov.ng/job-listings/federal-university-of-lafia-p-m-b-146-lafia-nasarawa-state-office-of-the-registrar-www-fulafia-edu-ng/", lastChecked: "2026-10-06" }
    ]
  },
  {
    slug: "snv-energy-advisor-abuja-2026",
    title: "SNV Energy Advisor — Abuja",
    organization: "SNV",
    kind: "vacancy",
    sector: "International",
    status: "open",
    statusLabel: "Applications open",
    summary: "SNV is recruiting a full-time Energy Advisor in Abuja for an energy project, with a two-year national employment contract and an application deadline of 8 October 2026.",
    location: "Abuja, FCT",
    employmentType: "Full-time national employment contract (2 years)",
    audiences: ["Energy professionals", "Engineers", "Development-sector professionals", "Renewable-energy specialists"],
    fields: ["Renewable energy", "Energy management", "Engineering", "Clean cooking", "Development"],
    qualifications: [
      "Master's degree in Renewable Energy, Energy Management, Engineering or another relevant discipline.",
      "Five to seven years of substantial development-work experience, including solar energy, biodigesters, clean cooking, energy efficiency or related renewable-energy technologies.",
      "Strong understanding of energy-service delivery and preferably renewable-energy or energy-efficiency market development.",
      "Experience designing or appraising business cases, working with energy market systems, introducing energy technologies and engaging private-sector stakeholders, especially in Nigeria or West Africa."
    ],
    requirements: [
      "Strong written and oral communication skills.",
      "Experience with stakeholder convening, capacity building and project interventions.",
      "Ability to lead and steer initiatives with an entrepreneurial mindset."
    ],
    documents: [
      "CV in English",
      "Motivation letter in English",
      "Referee details if requested during SNV's later reference and safeguarding checks"
    ],
    applicationSteps: [
      "Open SNV's official SmartRecruiters vacancy page.",
      "Review the Energy Advisor qualifications and confirm your energy-sector and development experience.",
      "Upload your CV and motivation letter in English through the official application control.",
      "Submit before the 8 October 2026 deadline and monitor the email address used for the application."
    ],
    officialUrl: "https://jobs.smartrecruiters.com/snv/744000152591820",
    officialUrlLabel: "Apply on SNV's official vacancy page",
    verifiedAt: "2026-10-05",
    deadline: "2026-10-08",
    nextMilestone: "Applications close 8 October 2026. SNV lists an expected start date of 1 November 2026, subject to contract award timing.",
    feeNote: "No application fee is listed. Apply only through SNV's official vacancy system.",
    sourceNotes: [
      "SNV lists the duty station as Abuja and the contract as a two-year full-time national employment contract.",
      "The official vacancy asks applicants to upload a CV and motivation letter in English and states that only shortlisted candidates will be contacted."
    ],
    sources: [
      { label: "SNV Energy Advisor — SmartRecruiters", url: "https://jobs.smartrecruiters.com/snv/744000152591820", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "snv-project-manager-abuja-2026",
    title: "SNV Project Manager — Energy Project, Abuja",
    organization: "SNV",
    kind: "vacancy",
    sector: "International",
    status: "open",
    statusLabel: "Applications open",
    summary: "SNV is recruiting a Project Manager in Abuja to lead an energy project, with a two-year national employment contract and an application deadline of 8 October 2026.",
    location: "Abuja, FCT",
    employmentType: "Full-time national employment contract (2 years)",
    audiences: ["Senior energy professionals", "Project managers", "Development-sector leaders", "Engineers"],
    fields: ["Energy", "Project management", "Renewable energy", "Development", "Engineering"],
    qualifications: [
      "Relevant master's and/or bachelor's degree in energy, engineering, environmental science, energy management, energy systems or a related field.",
      "At least eight years of experience in energy-sector development, with knowledge of renewable energy, clean cooking, biodigesters and sector stakeholder dynamics.",
      "Demonstrated programme or project leadership, including complex project delivery, policy advice and strategic energy-sector work.",
      "Experience with monitoring and evaluation, donor/partner engagement, business development, private-sector engagement and energy financing."
    ],
    requirements: [
      "Excellent written and spoken English.",
      "Strong team leadership, partnership-building, analytical and problem-solving ability.",
      "Experience delivering projects within budgets, timelines, donor requirements and quality standards."
    ],
    documents: [
      "CV in English",
      "Motivation letter in English",
      "Referee details if requested during SNV's later reference and safeguarding checks"
    ],
    applicationSteps: [
      "Open SNV's official Project Manager vacancy page.",
      "Compare your energy-sector leadership experience with the published qualifications.",
      "Upload your CV and motivation letter in English through the official SmartRecruiters application.",
      "Submit before 8 October 2026 and retain the application confirmation."
    ],
    officialUrl: "https://jobs.smartrecruiters.com/SNV/744000152590475-project-manager",
    officialUrlLabel: "Apply on SNV's official vacancy page",
    verifiedAt: "2026-10-05",
    deadline: "2026-10-08",
    nextMilestone: "Applications close 8 October 2026. SNV lists an expected start date of 1 November 2026, subject to contract award timing.",
    feeNote: "No application fee is listed. Apply only through SNV's official vacancy system.",
    sourceNotes: [
      "SNV lists Abuja as the duty station and a two-year full-time national employment contract.",
      "The role covers overall project management, quality assurance, finance/contract management, people leadership and donor/stakeholder delivery."
    ],
    sources: [
      { label: "SNV Project Manager — SmartRecruiters", url: "https://jobs.smartrecruiters.com/SNV/744000152590475-project-manager", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "reckitt-nigeria-management-trainee-2026",
    title: "Reckitt Nigeria 2026 Management Trainee Program (Trailblazers 5.0)",
    organization: "Reckitt Nigeria",
    sector: "Private",
    status: "open",
    statusLabel: "Applications open",
    summary: "Reckitt's official careers site is accepting applications for its 2026 Trailblazers 5.0 Management Trainee Program in Lagos Island, with rotations across Commercial and Supply.",
    location: "Lagos Island, Lagos",
    employmentType: "Management trainee / graduate programme",
    audiences: ["Recent graduates", "2022–2025 graduates", "NYSC completers by December 2026", "Entry-level applicants"],
    fields: ["Commercial", "Supply", "FMCG", "Management", "Graduate trainee"],
    qualifications: [
      "Recent graduate from 2022 to 2025; Reckitt states that applicants from any degree are welcome.",
      "Minimum Upper Second Class Honours (2:1).",
      "NYSC must be completed by December 2026."
    ],
    requirements: [
      "Reckitt describes the ideal candidate as curious, driven and ambitious.",
      "The role highlights ownership, self-awareness, mental agility, proactiveness, communication, attention to detail, analytical ability and problem solving."
    ],
    documents: [
      "CV/resume and personal details requested by the official Reckitt application system",
      "Degree/academic information that demonstrates the stated 2:1 requirement",
      "NYSC information showing completion, or expected completion, by December 2026"
    ],
    applicationSteps: [
      "Open the official Reckitt Trailblazers 5.0 job page.",
      "Read the current eligibility requirements and confirm your graduation year, degree class and NYSC timeline.",
      "Use Reckitt's official application control to create/sign in to the recruitment profile.",
      "Complete the application and upload only the documents requested by Reckitt.",
      "Keep the application confirmation and monitor the email/profile used for the recruitment process."
    ],
    officialUrl: "https://careers.reckitt.com/job/Lagos-Island-Reckitt-Nigeria-2026-Management-Trainee-Program-%28Trailblazers-5_0%29-Lago-NA/1439208533/",
    officialUrlLabel: "Apply on Reckitt's official careers site",
    verifiedAt: "2026-10-05",
    nextMilestone: "The official Reckitt posting is live. No closing date is displayed on the page, so apply while the vacancy remains open.",
    feeNote: "MyNigeriaGuide does not collect an application fee. Apply only through Reckitt's official careers domain.",
    sourceNotes: [
      "Reckitt's official job page lists Lagos-Island as the location and describes rotations across Commercial and Supply.",
      "The official criteria are graduation in 2022–2025, minimum Upper Second Class Honours and NYSC completion by December 2026."
    ],
    sources: [
      { label: "Reckitt Nigeria Trailblazers 5.0", url: "https://careers.reckitt.com/job/Lagos-Island-Reckitt-Nigeria-2026-Management-Trainee-Program-%28Trailblazers-5_0%29-Lago-NA/1439208533/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "nigerian-air-force-airmen-airwomen-recruitment-2026",
    title: "Nigerian Air Force Airmen/Airwomen Recruitment 2026",
    organization: "Nigerian Air Force",
    sector: "Government",
    status: "open",
    statusLabel: "Applications open",
    summary: "The Nigerian Air Force 2026 Airmen/Airwomen Basic Military Training Course recruitment is open. The official portal shows an application window from 3 September to 14 October 2026.",
    location: "Nigeria",
    employmentType: "Military recruitment / Basic Military Training Course",
    audiences: ["SSCE holders", "ND/NCE holders", "Tradesmen/Women", "Non-Tradesmen/Women"],
    fields: ["Military service", "Technical trades", "Non-trade roles", "Air Force"],
    qualifications: [
      "The official portal states a minimum of 7 credits including English and Mathematics for Airmen/Airwomen recruitment.",
      "Trade applicants additionally require the relevant Trade Test Certificate or ND/NCE qualification.",
      "The portal describes BMTC as suitable for holders of Secondary School Certificate, National Diploma, NABTEB, RN/RM/NCE, City & Guild or Trade Test qualifications, depending on category."
    ],
    requirements: [
      "Non-Tradesmen/Women: official portal states an age range of 18–22 years.",
      "Tradesmen/Women: official portal states an age range of 18–25 years.",
      "Minimum height published by the NAF portal is 1.63 m for female applicants and 1.66 m for male applicants.",
      "Applicants should read the current exercise instructions on the official portal because category-specific conditions may apply."
    ],
    documents: [
      "Academic certificates matching the selected category",
      "Trade Test, ND or NCE evidence where applying through a trade category",
      "Identity and personal information requested in the official NAF application",
      "Any additional documents listed in the current application instructions"
    ],
    applicationSteps: [
      "Open the official Nigerian Air Force recruitment portal.",
      "Confirm that you are applying for the open Airmen/Airwomen BMTC exercise, not the closed DSSC route.",
      "Read the current exercise instructions and verify your age, height and qualification category.",
      "Start a new application through the official portal and complete the requested information.",
      "Keep your application details so you can continue or check later stages through the same portal."
    ],
    officialUrl: "https://nafrecruitment.airforce.mil.ng/",
    officialUrlLabel: "Apply on the official NAF recruitment portal",
    verifiedAt: "2026-10-05",
    deadline: "2026-10-14",
    nextMilestone: "Applications are open until 14 October 2026 according to the official portal.",
    feeNote: "The Nigerian Air Force states that recruitment/enlistment is FREE and is done through its official recruitment portal.",
    sourceNotes: [
      "The official NAF portal marks the Airmen/Airwomen BMTC exercise as open.",
      "The portal lists 3 September 2026 to 14 October 2026 for the current exercise.",
      "The DSSC section on the same portal is currently marked closed."
    ],
    sources: [
      { label: "Nigerian Air Force Recruitment Portal", url: "https://nafrecruitment.airforce.mil.ng/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "nigerian-army-92rri-2026",
    title: "Nigerian Army 92RRI Recruitment 2026",
    organization: "Nigerian Army",
    sector: "Government",
    status: "open",
    statusLabel: "Applications ongoing",
    summary: "The Nigerian Army's official recruitment portal currently states that 92 Regular Recruits Intake (92RRI) online applications are ongoing for trades and non-trades applicants.",
    location: "Nigeria",
    employmentType: "Military recruitment / Regular Recruit Intake",
    audiences: ["SSCE holders", "Tradesmen/Women", "Non-Tradesmen/Women", "Skilled applicants"],
    fields: ["Military service", "Technical trades", "Skilled trades", "Non-trade roles"],
    qualifications: [
      "Applicants must have at least four passes including English Language in not more than two sittings in WASSCE, GCE, NECO, NABTEB or NBAIS.",
      "Tradesmen/Women must also hold an appropriate Trade Test or City & Guild certificate."
    ],
    requirements: [
      "Applicants must be single Nigerian citizens by birth.",
      "A National Identification Number/National Identity Card and BVN slip are required, and identity details should match across credentials.",
      "Applicants must be medically, physically and psychologically fit and have no criminal conviction.",
      "The official portal states ages 18–22 for non-trades applicants; trades applicants must not be above 26 years by 21 October 2026.",
      "Minimum height is 1.68 m for male applicants and 1.65 m for female applicants.",
      "Applicants must apply using their state of origin rather than state of residence."
    ],
    documents: [
      "National Identity Card/NIN details and BVN slip",
      "Birth certificate or acceptable age declaration",
      "Certificate of state of origin",
      "WASSCE/GCE/NECO/NABTEB/NBAIS credentials",
      "Trade Test or City & Guild certificate where applicable",
      "Printed photo card and completed guarantor/declaration forms for screening"
    ],
    applicationSteps: [
      "Open the official Nigerian Army recruitment portal.",
      "Create or use your recruitment account and complete the online form.",
      "Submit the application online and print the photo card.",
      "Complete the guarantor and other required forms before screening.",
      "If shortlisted, report to your state-of-origin screening centre with the signed documents requested by the Army."
    ],
    officialUrl: "https://recruit.army.mil.ng/",
    officialUrlLabel: "Apply on the official Nigerian Army portal",
    verifiedAt: "2026-10-04",
    nextMilestone: "The official portal says shortlisted candidates are expected to attend state screening from 17 November to 1 December 2026.",
    feeNote: "The Nigerian Army states that recruitment is FREE. Do not pay for application access, shortlisting or screening.",
    sourceNotes: [
      "The Nigerian Army portal currently labels 92RRI online application as ongoing.",
      "The portal publishes the qualification, age, height, identity and screening-document requirements used in this guide."
    ],
    sources: [
      { label: "Nigerian Army Recruitment Portal", url: "https://recruit.army.mil.ng/", lastChecked: "2026-10-04" }
    ]
  },
  {
    slug: "nigerian-navy-batch-39-recruitment-2026",
    title: "Nigerian Navy Batch 39 Recruitment 2026",
    organization: "Nigerian Navy",
    sector: "Government",
    status: "open",
    statusLabel: "Applications open",
    summary: "Nigerian Navy Basic Training School Batch 39 recruitment is open on the Navy's official portal, with online registration running through 31 October 2026.",
    location: "Nigeria",
    employmentType: "Military recruitment / Basic Training School",
    audiences: ["School leavers", "Technical applicants", "ND/NCE holders", "Maritime-career applicants"],
    fields: ["Seaman", "Engineering", "Cyber & ICT", "Medical services", "Technical trades", "Maritime operations"],
    qualifications: [
      "Eligibility depends on the naval branch/category selected and the qualification attached to that category.",
      "The current portal directs applicants through an eligibility check before account registration and application."
    ],
    requirements: [
      "Applications are handled through the Nigerian Navy's official digital recruitment portal.",
      "The portal verifies identity using NIN and NIMC-linked identity checks.",
      "Applicants should choose the branch/category that matches their qualification before submitting credentials."
    ],
    documents: [
      "NIN-linked identity information",
      "Academic/professional credentials required by the selected branch",
      "Personal information and documents requested in the guided application",
      "Exam/screening documents generated later for shortlisted applicants"
    ],
    applicationSteps: [
      "Open the official Nigerian Navy Batch 39 recruitment portal.",
      "Use the eligibility check or review the available branches before choosing a pathway.",
      "Create an account and verify email, phone and identity details.",
      "Complete the guided online application and upload the requested credentials.",
      "After submission, follow status updates and download the aptitude-test or screening slip if shortlisted."
    ],
    officialUrl: "https://joinnigeriannavy.navy.mil.ng/",
    officialUrlLabel: "Apply on the official Nigerian Navy portal",
    verifiedAt: "2026-10-04",
    deadline: "2026-10-31",
    nextMilestone: "Batch 39 aptitude testing is scheduled for 21 November 2026; the portal lists basic training for the first quarter of 2027.",
    feeNote: "Use only the official Nigerian Navy recruitment domain. MyNigeriaGuide does not collect recruitment fees or credentials.",
    sourceNotes: [
      "The official portal says Batch 39 applications opened on 2 October 2026 and close on 31 October 2026 at 23:59 WAT.",
      "The Navy portal lists the aptitude test for 21 November 2026 and describes identity verification, application and status tracking stages."
    ],
    sources: [
      { label: "Nigerian Navy Batch 39 Recruitment Portal", url: "https://joinnigeriannavy.navy.mil.ng/", lastChecked: "2026-10-04" }
    ]
  },
  {
    slug: "nigeria-police-constable-recruitment-2026",
    title: "Nigeria Police Force Constable Recruitment 2026",
    organization: "Police Service Commission / Nigeria Police Force",
    sector: "Government",
    status: "closed",
    statusLabel: "Applications closed",
    summary: "The 50,000-constable recruitment application window has closed. The Police Service Commission later moved eligible candidates through physical/credential screening and a written examination held in April 2026.",
    location: "Nigeria",
    employmentType: "Police constable recruitment",
    audiences: ["SSCE holders", "General Duty applicants", "Specialist applicants", "Existing applicants"],
    fields: ["Policing", "General Duty", "Technical/specialist roles", "Public safety"],
    qualifications: [
      "General Duty applicants were required to have at least five O'Level credits including English Language and Mathematics in not more than two sittings.",
      "Specialist applicants were required to have at least four O'Level credits including English Language and Mathematics, plus relevant experience/trade tests for the specialist field."
    ],
    requirements: [
      "Published age range was 18–25 years for General Duty and 18–28 years for Specialists.",
      "Applicants had to be Nigerian citizens by birth and medically, physically and psychologically fit.",
      "Published General Duty minimum heights were 1.67 m for male applicants and 1.64 m for female applicants."
    ],
    documents: [
      "NIN slip with clear photograph for later recruitment stages",
      "Printed recruitment/examination invitation documents",
      "O'Level and specialist/trade credentials used for the original application",
      "Other screening credentials requested through the official recruitment process"
    ],
    applicationSteps: [
      "Do not submit a new application: the application window is closed.",
      "Existing applicants should rely on Police Service Commission and official NPF recruitment communications for any further stage.",
      "Use only the official recruitment portal referenced by the Police Service Commission.",
      "Ignore requests for payment for recruitment, shortlisting, tests or appointments."
    ],
    officialUrl: "https://psc.gov.ng/",
    officialUrlLabel: "Check Police Service Commission recruitment updates",
    verifiedAt: "2026-10-03",
    nextMilestone: "The latest recruitment-stage notice located on the PSC website covered the written examination held 28–30 April 2026; applicants should check PSC for any newer official stage.",
    feeNote: "The Police Service Commission states that recruitment is free and has warned applicants against illegal charges and fake portals.",
    sourceNotes: [
      "The 50,000-constable application deadline was extended to 8 February 2026.",
      "PSC later announced written examinations for candidates who passed physical and credential screening."
    ],
    sources: [
      { label: "Police Service Commission", url: "https://psc.gov.ng/", lastChecked: "2026-10-03" },
      { label: "PSC recruitment announcement", url: "https://psc.gov.ng/2025/12/11/recruitment-of-50000-constables-into-the-nigeria-police-force-portal-opens-applications-invited-as-psc-npf-commit-to-a-seamless-process/", lastChecked: "2026-10-03" },
      { label: "PSC written-examination update", url: "https://psc.gov.ng/2026/04/24/police-recruitment-written-examination-holds-28-30-april-as-psc-warns-against-scams/", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "nnpc-limited-recruitment",
    title: "NNPC Limited Graduate Trainee & Experienced Hire Recruitment",
    organization: "NNPC Limited",
    sector: "Government",
    status: "closed",
    statusLabel: "Applications closed",
    summary: "NNPC Limited's official careers portal currently states that application submission is closed. Its career system keeps the graduate-trainee and experienced-hire routes, application guide and candidate journey available.",
    location: "Nigeria",
    employmentType: "Graduate trainee / experienced hire",
    audiences: ["Graduates", "Experienced professionals", "Existing applicants"],
    fields: ["Engineering", "Energy", "Finance", "ICT", "Security", "Commercial", "Corporate services"],
    qualifications: [
      "Graduate and experienced-hire eligibility varies by route and skill pool.",
      "NNPC's official application guide references degree/HND class requirements, NYSC details and professional memberships where applicable.",
      "Applicants should use the current vacancy eligibility criteria when a new application cycle opens."
    ],
    requirements: [
      "A functioning email address and reachable phone number are required for the official application system.",
      "Applicants should prepare all requested credentials before beginning an application.",
      "Only applications submitted through careers.nnpcgroup.com are recognised by NNPC."
    ],
    documents: [
      "Birth certificate",
      "Indigene certificate",
      "Passport photograph",
      "Secondary and tertiary educational certificates",
      "NIN",
      "NYSC certificate or exemption",
      "Professional membership certificates where applicable",
      "CV/work-history information for relevant roles"
    ],
    applicationSteps: [
      "The current application cycle is closed, so do not submit credentials through third-party recruitment forms.",
      "Review NNPC's official careers portal and eligibility pages for graduate-trainee or experienced-hire routes.",
      "When applications reopen, create a profile and complete biodata, education, NYSC, work history and professional-certification sections as required.",
      "Existing candidates should use the official candidate journey/status tools for recruitment progress."
    ],
    officialUrl: "https://careers.nnpcgroup.com/",
    officialUrlLabel: "Open NNPC Limited careers portal",
    verifiedAt: "2026-10-03",
    nextMilestone: "The official candidate journey currently shows application submission closed and keeps later recruitment stages/status information on the careers portal.",
    feeNote: "NNPC Limited states that it does not charge fees for job applications and is not responsible for applications submitted outside careers.nnpcgroup.com.",
    sourceNotes: [
      "The current NNPC careers site displays 'Application submission is now closed'.",
      "Its application guide lists identity, education, NYSC and professional documents used during recruitment."
    ],
    sources: [
      { label: "NNPC Limited Careers", url: "https://careers.nnpcgroup.com/", lastChecked: "2026-10-03" },
      { label: "NNPC Application Guide", url: "https://careers.nnpcgroup.com/how-to", lastChecked: "2026-10-03" },
      { label: "NNPC Candidate Journey", url: "https://careers.nnpcgroup.com/journey", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "nigeria-customs-service-recruitment",
    title: "Nigeria Customs Service Recruitment",
    organization: "Nigeria Customs Service",
    sector: "Government",
    status: "training",
    statusLabel: "Training stage",
    summary: "The current Nigeria Customs Service recruitment exercise has moved beyond applications and screening. Successful candidates are being directed to basic training.",
    location: "Nigeria",
    employmentType: "Federal government recruitment",
    audiences: ["Applicants", "Shortlisted candidates"],
    fields: ["Customs", "Public service", "Security"],
    qualifications: ["Qualification depends on the cadre originally applied for.", "Candidates should rely on the official NCS recruitment communication for their own cadre and status."],
    requirements: [
      "Only candidates who progressed through the official recruitment stages should act on training instructions.",
      "Identity should be verified only through the official Nigeria Customs recruitment portal.",
      "Candidates must report according to the official training instruction attached to their recruitment status."
    ],
    documents: [
      "Training details shown after official identity verification",
      "Any original recruitment/screening documents requested by NCS",
      "Personal items listed in the official training notice"
    ],
    applicationSteps: [
      "Do not submit a new application: the application stage is closed.",
      "Use the official NCS recruitment status portal to verify your identity with the permitted identifier.",
      "If the portal confirms selection, follow the reporting and training instructions exactly.",
      "Ignore payment requests or unofficial agents."
    ],
    officialUrl: "https://updates.customs.gov.ng/trn/",
    officialUrlLabel: "Check official NCS recruitment status",
    verifiedAt: "2026-10-05",
    nextMilestone: "Successful candidates are instructed to report for basic training on 9 October 2026.",
    feeNote: "Nigeria Customs states that recruitment does not require payment. Treat requests for recruitment fees as suspicious.",
    sourceNotes: [
      "Nigeria Customs published final lists for the 2024/2025 recruitment exercise and later issued 2026 screening/documentation updates.",
      "The current official status portal gives selected candidates instructions for basic training."
    ],
    sources: [
      { label: "Nigeria Customs recruitment status portal", url: "https://updates.customs.gov.ng/trn/", lastChecked: "2026-10-05" },
      { label: "Nigeria Customs recruitment publications", url: "https://customs.gov.ng/publications/recruitment", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "federal-civil-service-commission-recruitment",
    title: "Federal Civil Service Commission Recruitment",
    organization: "Federal Civil Service Commission",
    sector: "Government",
    status: "closed",
    statusLabel: "Applications closed",
    summary: "The FCSC recruitment portal currently lists 70 vacancies across 19 ministries, departments and agencies, but the displayed vacancies are marked closed.",
    location: "Nigeria",
    employmentType: "Federal civil service",
    audiences: ["Graduates", "HND holders", "Professionals"],
    fields: ["Engineering", "Health", "Law", "ICT", "Administration", "Statistics", "Education", "Public service"],
    qualifications: [
      "Qualification varies by vacancy and grade level.",
      "Many graduate and HND roles require completion of NYSC or a valid exemption certificate.",
      "Professional roles may require registration with the relevant Nigerian professional body."
    ],
    requirements: [
      "Apply only for a vacancy for which you meet the stated qualification and professional requirements.",
      "Use the official FCSC recruitment portal rather than third-party application forms.",
      "Read the exact grade-level requirement before preparing an application."
    ],
    documents: [
      "Academic qualifications relevant to the vacancy",
      "NYSC discharge or exemption certificate where required",
      "Professional registration evidence where the vacancy requires it",
      "Identity and personal details requested by the official portal"
    ],
    applicationSteps: [
      "The displayed recruitment cycle is closed, so do not pay anyone to submit a late application.",
      "Review the official vacancy portal to understand the role and qualification structure.",
      "When a new cycle opens, apply only through the FCSC portal and only for one eligible position where the official notice requires that.",
      "Keep copies of submitted documents and application references."
    ],
    officialUrl: "https://recruitment.fedcivilservice.gov.ng/vacancies",
    officialUrlLabel: "Open official FCSC vacancy portal",
    verifiedAt: "2026-10-05",
    feeNote: "Use the official Federal Civil Service recruitment portal. MyNigeriaGuide never collects recruitment fees or application credentials.",
    sourceNotes: [
      "The official portal currently shows 70 vacancies in 19 MDAs.",
      "Vacancies visible on the portal at the time of verification are marked closed."
    ],
    sources: [
      { label: "Federal Civil Service Recruitment Portal", url: "https://recruitment.fedcivilservice.gov.ng/vacancies", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "frsc-recruitment",
    title: "Federal Road Safety Corps Recruitment",
    organization: "Federal Road Safety Corps",
    sector: "Government",
    status: "closed",
    statusLabel: "Applications closed",
    summary: "The official FRSC recruitment portal currently states that applications are closed and that existing applicants will be contacted for further steps.",
    location: "Nigeria",
    employmentType: "Federal government recruitment",
    audiences: ["Applicants", "Graduates", "Qualified candidates"],
    fields: ["Road safety", "Public service", "Administration", "Technical roles"],
    qualifications: ["Requirements depend on the advertised cadre and recruitment cycle."],
    requirements: [
      "Do not create applications through unofficial recruitment websites.",
      "Existing applicants should follow official FRSC communication for the next stage."
    ],
    documents: ["Keep the documents and contact details used for the original application available for any later verification."],
    applicationSteps: [
      "Applications are currently closed.",
      "Existing applicants can use the official portal account features where applicable.",
      "Wait for communication through official FRSC recruitment channels.",
      "Do not pay third parties for shortlist or recruitment access."
    ],
    officialUrl: "https://recruitment.frsc.gov.ng/",
    officialUrlLabel: "Open official FRSC recruitment portal",
    verifiedAt: "2026-10-03",
    feeNote: "Use only the official FRSC recruitment portal and published FRSC contacts.",
    sourceNotes: ["The official portal currently displays an Applications Closed notice."],
    sources: [
      { label: "FRSC Recruitment Portal", url: "https://recruitment.frsc.gov.ng/", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "cdcfib-paramilitary-recruitment",
    title: "CDCFIB Paramilitary Recruitment: NSCDC, NIS, NCoS & Federal Fire Service",
    organization: "Civil Defence, Correctional, Fire and Immigration Services Board",
    sector: "Government",
    status: "closed",
    statusLabel: "Recruitment concluded",
    summary: "The official CDCFIB recruitment portal currently states that the recruitment exercise has concluded. The cycle covered NSCDC, Nigeria Immigration Service, Nigerian Correctional Service and Federal Fire Service.",
    location: "Nigeria",
    employmentType: "Federal paramilitary recruitment",
    audiences: ["Graduates", "HND holders", "ND/NCE holders", "SSCE holders", "Applicants"],
    fields: ["Civil Defence", "Immigration", "Corrections", "Fire Service", "Paramilitary"],
    qualifications: [
      "Superintendent Cadre: the published eligibility structure includes a recognised Bachelor's degree or HND, with specialist positions able to require professional qualifications.",
      "Inspectorate Cadre: the published structure includes ND, NCE or equivalent qualifications; registered nurses and midwives may qualify for relevant positions.",
      "Assistant Cadre: the published structure includes SSCE, NECO, GCE or NABTEB credits including English Language and Mathematics, with Trade Test certificates used for some artisan/technical positions."
    ],
    requirements: [
      "Applicant must be a Nigerian citizen by birth under the published general criteria.",
      "The published age range for the recruitment cycle is 18–35 years, subject to the exact advert.",
      "Published minimum height: 1.65 m for male applicants and 1.60 m for female applicants.",
      "Applicants must meet medical/physical fitness and good-character requirements.",
      "Only one of the four services may be selected in a recruitment cycle; multiple applications can lead to disqualification."
    ],
    documents: [
      "Academic certificates for the cadre applied for",
      "Evidence of Nigerian citizenship/identity requested by the recruitment portal",
      "Medical or fitness documentation where required at screening",
      "Other credentials specified for the selected service and cadre"
    ],
    applicationSteps: [
      "The current recruitment exercise is concluded, so do not submit a new application through unofficial forms.",
      "Existing applicants should use only the official CDCFIB recruitment domain for any status or archival information still available.",
      "For a future cycle, choose only one participating service and the cadre matching your qualification.",
      "Read the official advert and portal instructions before uploading documents or attending screening."
    ],
    officialUrl: "https://recruitment.cdcfib.gov.ng/",
    officialUrlLabel: "Open official CDCFIB recruitment portal",
    verifiedAt: "2026-10-05",
    feeNote: "CDCFIB states that the recruitment process is free. Do not pay agents for applications, shortlisting, screening or final selection.",
    sourceNotes: [
      "The current official recruitment portal is marked Recruitment Exercise Concluded.",
      "The recruitment cycle covered NSCDC, Nigeria Immigration Service, Nigerian Correctional Service and Federal Fire Service.",
      "The published eligibility structure grouped applicants into Superintendent, Inspectorate and Assistant cadres."
    ],
    sources: [
      { label: "Official CDCFIB Recruitment Portal", url: "https://recruitment.cdcfib.gov.ng/", lastChecked: "2026-10-05" },
      { label: "Nigerian Correctional Service recruitment notice", url: "https://recruitment.cdcfib.gov.ng/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "ndlea-careers",
    title: "NDLEA Careers and Recruitment",
    organization: "National Drug Law Enforcement Agency",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "NDLEA's official careers page explains its entry-level cadet route and specialist support roles. A current open application window is not confirmed on that page.",
    location: "Nigeria",
    employmentType: "Federal government careers",
    audiences: ["Entry-level candidates", "Professionals", "Specialists"],
    fields: ["Law enforcement", "ICT", "Accounting", "Human resources", "Communications", "Legal", "Finance"],
    qualifications: [
      "NDLEA recruits entry-level cadets as well as people with specialised training and professional experience.",
      "Specific qualifications should be taken from the official recruitment notice when an application cycle opens."
    ],
    requirements: [
      "Confirm that a recruitment window is actually open before submitting personal information.",
      "Use NDLEA's official website and official recruitment notices."
    ],
    documents: ["Documents depend on the specific recruitment notice and role."],
    applicationSteps: [
      "Check the official NDLEA careers page for the latest recruitment route.",
      "Read the role-specific notice when recruitment opens.",
      "Apply only through the portal linked by NDLEA.",
      "Keep application evidence and ignore unofficial payment requests."
    ],
    officialUrl: "https://www.ndlea.gov.ng/careers",
    officialUrlLabel: "Open NDLEA careers page",
    verifiedAt: "2026-10-03",
    feeNote: "Do not treat social-media posts or copied forms as an official recruitment opening unless NDLEA links to them.",
    sourceNotes: ["The official careers page describes both entry-level cadet recruitment and specialist administrative/support career paths."],
    sources: [
      { label: "NDLEA Careers", url: "https://www.ndlea.gov.ng/careers", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "shell-nigeria-siwes",
    title: "Shell Nigeria SIWES and Student Industrial Training",
    organization: "Shell Companies in Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official application pathway",
    summary: "Shell's official Nigeria student page provides an Industrial Training/SIWES application route for eligible Nigerian university and polytechnic students.",
    location: "Nigeria",
    employmentType: "Student industrial training / internship",
    audiences: ["Students", "SIWES applicants", "Undergraduates"],
    fields: ["Engineering", "Geosciences", "Information Technology", "Sciences", "Social Sciences", "Arts", "Commercial"],
    qualifications: [
      "Applicant must be a Nigerian citizen.",
      "Applicant must be enrolled full-time in an undergraduate programme at a university or polytechnic in Nigeria.",
      "School authorisation and approval for Industrial Training is required.",
      "Shell states a minimum CGPA of 3.5/5.0 for university students or 3.0/4.0 for polytechnic students."
    ],
    requirements: [
      "Meet the stated student status and CGPA requirements.",
      "Have school approval for Industrial Training.",
      "Use the application link provided by Shell."
    ],
    documents: ["School Industrial Training authorisation", "Academic information sufficient to demonstrate eligibility", "Other items requested in Shell's official application form"],
    applicationSteps: [
      "Read Shell's SIWES eligibility criteria.",
      "Confirm that your course is within an eligible discipline.",
      "Prepare school authorisation and academic details.",
      "Use the application link on Shell's official SIWES page.",
      "Only successful applicants are contacted."
    ],
    officialUrl: "https://www.shell.com.ng/careers/students-and-graduates/student-industrial-training-and-internship-program.html",
    officialUrlLabel: "Open Shell Nigeria SIWES page",
    verifiedAt: "2026-10-03",
    feeNote: "Apply through Shell's official careers route. Shell's Nigeria site states that employment applications are handled through its careers section rather than emailed CV submissions.",
    sourceNotes: ["Shell publishes specific SIWES eligibility criteria and an official application route on its Nigeria careers website."],
    sources: [
      { label: "Shell Nigeria SIWES", url: "https://www.shell.com.ng/careers/students-and-graduates/student-industrial-training-and-internship-program.html", lastChecked: "2026-10-03" },
      { label: "Shell Nigeria Careers", url: "https://www.shell.com.ng/careers.html", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "shell-nigeria-careers",
    title: "Shell Nigeria Graduate and Professional Careers",
    organization: "Shell Companies in Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Shell Nigeria's careers pages provide routes for students, graduates and experienced professionals, including technical, commercial and corporate disciplines.",
    location: "Nigeria",
    employmentType: "Graduate and experienced-hire careers",
    audiences: ["Graduates", "Experienced professionals", "Students"],
    fields: ["Engineering", "Technical", "Commercial", "Finance", "HR", "Procurement", "Information Technology"],
    qualifications: ["Requirements vary by advertised Shell opportunity."],
    requirements: ["Use Shell's official job search and careers pages for current vacancies.", "Match your degree and experience to the specific vacancy before applying."],
    documents: ["CV/resume and role-specific application information requested by Shell's recruitment system."],
    applicationSteps: [
      "Open Shell Nigeria's official careers page.",
      "Choose the student/graduate or experienced-professional route.",
      "Search for a role that matches your discipline and location.",
      "Read the vacancy requirements before submitting an application.",
      "Apply through Shell's official recruitment system."
    ],
    officialUrl: "https://www.shell.com.ng/careers.html",
    officialUrlLabel: "Search Shell Nigeria careers",
    verifiedAt: "2026-10-03",
    feeNote: "Shell Nigeria directs applicants to its careers section and states that it does not accept resumes by email.",
    sourceNotes: ["Shell's Nigeria careers page covers students, graduates and experienced professionals."],
    sources: [
      { label: "Shell Nigeria Careers", url: "https://www.shell.com.ng/careers.html", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "nlng-careers",
    title: "Nigeria LNG Careers",
    organization: "Nigeria LNG Limited",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers portal",
    summary: "NLNG's official careers portal supports recent graduates and experienced professionals across technical and corporate disciplines.",
    location: "Nigeria",
    employmentType: "Graduate and experienced-hire careers",
    audiences: ["Graduates", "Experienced professionals"],
    fields: ["Engineering", "Technical operations", "IT", "Digital transformation", "HSE", "HR", "Finance", "Legal", "Supply chain", "Commercial", "Research"],
    qualifications: ["Requirements vary by the open position on the NLNG careers portal."],
    requirements: ["Create or use an official NLNG careers profile.", "Read the specific vacancy qualification and experience requirements before applying."],
    documents: ["CV/resume and vacancy-specific information requested in the NLNG careers system."],
    applicationSteps: [
      "Open the official NLNG careers portal.",
      "Review available positions.",
      "Create or access your applicant profile.",
      "Open the specific vacancy and check requirements.",
      "Submit through the official NLNG system."
    ],
    officialUrl: "https://careers.nlng.com/",
    officialUrlLabel: "Open NLNG careers portal",
    verifiedAt: "2026-10-03",
    feeNote: "Use the official NLNG careers domain for vacancy applications.",
    sourceNotes: ["NLNG lists career paths across engineering, IT, HSE, corporate services, supply chain, commercial work and research/innovation."],
    sources: [
      { label: "Nigeria LNG Careers", url: "https://careers.nlng.com/", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "access-bank-early-careers",
    title: "Access Bank Entry Level Training Programme & Internships",
    organization: "Access Bank",
    sector: "Private",
    status: "career-page",
    statusLabel: "Open positions portal",
    summary: "Access Bank's official careers platform provides early-career routes through its Entry Level Training Programme (ELTP) and internships, with links to current open positions.",
    location: "Nigeria and Access Bank operating markets",
    employmentType: "Graduate training / internship",
    audiences: ["Graduates", "Students", "Early-career applicants"],
    fields: ["Banking", "Finance", "Technology", "Commercial", "Risk", "Operations"],
    qualifications: [
      "Eligibility depends on the specific ELTP pathway, internship or open position selected.",
      "Access Bank describes Graduate, Retail and Tech pathways under its Entry Level Training Programme.",
      "Applicants should use the qualification criteria shown on the current vacancy before submitting."
    ],
    requirements: [
      "Apply online through Access Bank's official careers platform.",
      "Monitor the email address used for the application, including spam/junk folders.",
      "Submit requested documents and eligibility information promptly during the recruitment process."
    ],
    documents: [
      "CV/resume and personal details requested for the selected opportunity",
      "Academic and eligibility documents requested during verification",
      "Other role-specific documents shown in the official vacancy"
    ],
    applicationSteps: [
      "Open the official Access Bank careers platform and choose Early Careers.",
      "Select the Entry Level Training Programme, internship or another open role that matches your profile.",
      "Review the current vacancy requirements and submit the online application.",
      "If shortlisted, Access Bank describes a process that can include online assessment, physical assessment, document/eligibility verification, interviews and medical fitness.",
      "For ELTP candidates who progress successfully, the published process includes a six-month training period before commencing the professional role."
    ],
    officialUrl: "https://careers.accessbankplc.com/jobs",
    officialUrlLabel: "View Access Bank open positions",
    verifiedAt: "2026-10-05",
    feeNote: "Use Access Bank's official careers domain for applications and assessment instructions.",
    sourceNotes: [
      "Access Bank's Early Careers platform lists ELTP and internship pathways.",
      "The official hiring-process page describes application, assessment, eligibility verification, interviews, medical fitness and training stages."
    ],
    sources: [
      { label: "Access Bank Careers", url: "https://careers.accessbankplc.com/", lastChecked: "2026-10-05" },
      { label: "Access Bank Early Careers", url: "https://careers.accessbankplc.com/careers", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "gtbank-entry-level-careers",
    title: "GTBank Entry Level Programme & Graduate Careers",
    organization: "Guaranty Trust Bank",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "GTBank's official career page publishes clear entry-level eligibility criteria and the recruitment stages used for graduate applicants.",
    location: "Nigeria",
    employmentType: "Graduate entry-level programme",
    audiences: ["Graduates", "NYSC-completed applicants", "Early-career applicants"],
    fields: ["Banking", "Finance", "Operations", "Technology", "Customer service"],
    qualifications: [
      "Minimum Second Class Lower degree from an accredited university.",
      "Completed compulsory NYSC with an NYSC certificate.",
      "WAEC/NECO with at least five credits including Mathematics and English in no more than two sittings.",
      "GTBank's published entry-level criteria state that candidates must be no more than 26 years old."
    ],
    requirements: [
      "Meet the current entry-level eligibility requirements shown by GTBank.",
      "Be prepared for GTBank's assessment and credential-verification stages.",
      "Use only GTBank's official careers pages and application routes."
    ],
    documents: [
      "University degree evidence",
      "NYSC certificate",
      "WAEC/NECO results meeting the published criteria",
      "Other identity and application documents requested during pre-interview verification"
    ],
    applicationSteps: [
      "Review GTBank's official career opportunities page and confirm the current programme/application route.",
      "Check that you meet the degree, NYSC, O'Level and age criteria.",
      "Submit through the official application process when an entry-level opening is available.",
      "Eligible applicants may be invited for a computer-based assessment covering reasoning and data-interpretation areas.",
      "Successful candidates move through documentation and later recruitment stages described by the bank."
    ],
    officialUrl: "https://www.gtbank.com/about/careers/career-opportunities",
    officialUrlLabel: "Open GTBank career opportunities",
    verifiedAt: "2026-10-03",
    feeNote: "GTBank warns applicants to be mindful of fake sites and not disclose personal or financial details to fraudulent parties.",
    sourceNotes: [
      "GTBank publishes explicit degree, NYSC, O'Level and age criteria for its entry-level programme.",
      "The bank also publishes its staged recruitment process, beginning with a computer-based assessment."
    ],
    sources: [
      { label: "GTBank Career Opportunities", url: "https://www.gtbank.com/about/careers/career-opportunities", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "uba-careers-graduate-programme",
    title: "UBA Careers & Graduate Programme",
    organization: "United Bank for Africa",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "UBA's official careers pages provide a Graduate Programme, a career application route and current-vacancy listings for applicants interested in banking careers.",
    location: "Nigeria and UBA operating markets",
    employmentType: "Graduate programme / professional vacancies",
    audiences: ["Graduates", "Experienced professionals"],
    fields: ["Banking", "Finance", "Technology", "Operations", "Commercial", "Risk"],
    qualifications: [
      "Graduate-programme and professional-role requirements vary by the current opportunity.",
      "Applicants should use the qualification and experience requirements shown in the specific UBA vacancy."
    ],
    requirements: [
      "Apply through UBA's official careers or career-application route.",
      "Read the exact vacancy requirements before submitting.",
      "Do not pay for an assessment or application."
    ],
    documents: [
      "CV/resume",
      "Academic and professional credentials relevant to the selected vacancy",
      "Other documents requested by UBA's official application process"
    ],
    applicationSteps: [
      "Open UBA's official careers application page.",
      "Review the Graduate Programme information or latest vacancies.",
      "Select an opportunity matching your education and experience.",
      "Complete the application through the official UBA route.",
      "Follow assessment/interview instructions sent through verified UBA channels."
    ],
    officialUrl: "https://roa.ubagroup.com/about-uba/careers/career-application/",
    officialUrlLabel: "Open UBA career applications",
    verifiedAt: "2026-10-03",
    feeNote: "UBA states that it will never require applicants to pay for an assessment or application.",
    sourceNotes: [
      "UBA publishes a Graduate Programme and career application route.",
      "Its careers page includes a Job Scam Alert stating that applicants are not required to pay for assessments or applications."
    ],
    sources: [
      { label: "UBA Career Application", url: "https://roa.ubagroup.com/about-uba/careers/career-application/", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "mtn-nigeria-careers",
    title: "MTN Nigeria Careers & Global Graduate Programme",
    organization: "MTN Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers portal",
    summary: "MTN Nigeria's official careers site links current vacancies and its Global Graduate Development Programme, combining formal development with on-the-job placement into strategic roles.",
    location: "Nigeria",
    employmentType: "Graduate programme / professional vacancies",
    audiences: ["Graduates", "Experienced professionals", "Technology applicants"],
    fields: ["Telecommunications", "Technology", "Digital services", "Commercial", "Finance", "Network operations"],
    qualifications: [
      "Vacancy requirements vary by role and should be checked on the official MTN job posting.",
      "MTN's broader Global Graduate Programme describes applicants as high-achieving graduates seeking future-skills employment; its programme criteria include an average academic score of 70% or above and an age range of 20–27 for participating markets."
    ],
    requirements: [
      "Create an official MTN careers profile to apply and reuse your details for suitable vacancies.",
      "Apply only for roles whose skills and experience requirements you meet.",
      "Applicants for employment must be at least 18; MTN notes that interns receiving on-the-job training are treated differently under that minimum-age rule."
    ],
    documents: [
      "CV/resume",
      "Birth certificate or age declaration when requested as employment data",
      "Academic and professional information required by the selected vacancy",
      "Other role-specific credentials shown in the MTN application portal"
    ],
    applicationSteps: [
      "Open MTN Nigeria's official careers page.",
      "Choose current vacancies or the graduate-programme route.",
      "Create a careers profile and select a role that matches your skills.",
      "Review all role-specific requirements before submitting.",
      "Track subsequent recruitment communication through the details registered in your MTN careers profile."
    ],
    officialUrl: "https://www.mtn.ng/careers-home/",
    officialUrlLabel: "Open MTN Nigeria careers",
    verifiedAt: "2026-10-03",
    feeNote: "MTN Nigeria states that it will never ask applicants to make any payment to facilitate recruitment.",
    sourceNotes: [
      "MTN Nigeria's careers page links vacancies and its Global Graduate Development Programme.",
      "MTN publishes a recruitment disclaimer stating that it does not request payment from job applicants."
    ],
    sources: [
      { label: "MTN Nigeria Careers", url: "https://www.mtn.ng/careers-home/", lastChecked: "2026-10-03" },
      { label: "MTN Global Graduates", url: "https://www.mtn.ng/career/global-graduates/", lastChecked: "2026-10-03" },
      { label: "MTN Careers Terms", url: "https://www.mtn.ng/legal/mtn-careers/", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "airtel-nigeria-careers",
    title: "Airtel Nigeria Careers, Graduate Internship & Undergraduate Internship",
    organization: "Airtel Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Airtel Nigeria's official careers page links current openings, describes its recruitment stages, and publishes undergraduate and graduate internship pathways.",
    location: "Nigeria",
    employmentType: "Professional vacancies / internships",
    audiences: ["Students", "Fresh graduates", "Experienced professionals"],
    fields: ["Telecommunications", "Technology", "Network operations", "Commercial", "Finance", "Customer experience"],
    qualifications: [
      "Current vacancy requirements vary by role.",
      "Airtel says its undergraduate internship typically runs July–September, with applications promoted around April–June.",
      "Airtel also directs fresh graduates to look out for its Graduate Internship programme."
    ],
    requirements: [
      "Applicants begin the recruitment process with a cognitive assessment.",
      "Candidates who pass the assessment progress to panel interviews, with later interviews dependent on success at preceding stages.",
      "Applicants should use Airtel's official careers page/current-openings route."
    ],
    documents: [
      "CV/resume",
      "Academic information relevant to internship or graduate applications",
      "Professional/experience information required by the selected vacancy"
    ],
    applicationSteps: [
      "Open Airtel Nigeria's official careers page.",
      "Use the current-openings link or monitor the relevant internship window.",
      "Submit the application/CV through the official Airtel route.",
      "Complete the cognitive assessment if invited.",
      "Progress through panel and subsequent interview stages if successful."
    ],
    officialUrl: "https://www.airtel.com.ng/ng/about/careers",
    officialUrlLabel: "Open Airtel Nigeria careers",
    verifiedAt: "2026-10-03",
    feeNote: "Use Airtel's official careers route and verified company communication before sharing sensitive recruitment information.",
    sourceNotes: [
      "Airtel Nigeria publishes current-opening links, internship timing and its assessment/interview sequence on its careers page."
    ],
    sources: [
      { label: "Airtel Nigeria Careers", url: "https://www.airtel.com.ng/ng/about/careers", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "firstbank-graduate-trainee-careers",
    title: "FirstBank Graduate Trainee & Experienced Hire Careers",
    organization: "First Bank of Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "FirstBank's careers site describes a yearly Graduate Trainee Programme for fresh graduates and a separate recruitment route for experienced hires.",
    location: "Nigeria",
    employmentType: "Graduate trainee / experienced hire",
    audiences: ["Fresh graduates", "HND holders", "Experienced professionals"],
    fields: ["Banking", "Finance", "Technology", "Risk", "Operations", "Commercial"],
    qualifications: [
      "FirstBank says its Graduate Trainee Programme is designed for fresh graduates below 27 years.",
      "Published minimum qualification is a Bachelor's degree with at least Second Class Lower or HND with Upper Credit.",
      "Experienced-hire eligibility is role-specific and focuses on functional/behavioural competencies and relevant hands-on experience."
    ],
    requirements: [
      "Use the official FirstBank jobs route to confirm that a recruitment window or suitable vacancy is currently available.",
      "Match your qualification and experience to the route selected."
    ],
    documents: [
      "CV/resume",
      "Degree or HND evidence",
      "Personal and professional information requested in the official application",
      "Role-specific credentials for experienced-hire vacancies"
    ],
    applicationSteps: [
      "Open FirstBank's official jobs page.",
      "Choose Graduate Trainee or an available experienced-hire vacancy.",
      "Confirm age/qualification or role-specific eligibility.",
      "Follow the official View and Apply for Jobs route.",
      "Retain application records and follow only verified FirstBank recruitment communication."
    ],
    officialUrl: "https://firstbankgroup.com/ng/home/careers/jobs/",
    officialUrlLabel: "Open FirstBank jobs",
    verifiedAt: "2026-10-03",
    feeNote: "Apply through the official FirstBank careers/jobs route and verify any third-party recruitment platform linked from it before entering credentials.",
    sourceNotes: [
      "FirstBank publishes the graduate programme as a yearly recruitment exercise.",
      "The bank states a below-27 age criterion and minimum 2:2 degree or HND Upper Credit for the programme."
    ],
    sources: [
      { label: "FirstBank Jobs", url: "https://firstbankgroup.com/ng/home/careers/jobs/", lastChecked: "2026-10-03" },
      { label: "FirstBank Careers", url: "https://firstbankgroup.com/ng/home/careers/", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "stanbic-ibtc-careers",
    title: "Stanbic IBTC Careers & Graduate Opportunities",
    organization: "Stanbic IBTC Holdings",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Stanbic IBTC's official careers page links its live opportunities and recruitment system for applicants seeking banking, technology and professional roles in Nigeria.",
    location: "Nigeria",
    employmentType: "Graduate / professional careers",
    audiences: ["Graduates", "Experienced professionals", "Technology applicants"],
    fields: ["Banking", "Finance", "Technology", "Risk", "Wealth", "Operations"],
    qualifications: ["Requirements vary by vacancy and graduate opportunity; use the exact criteria in the official role listing."],
    requirements: [
      "Use Stanbic IBTC's official careers page and linked opportunity system.",
      "Read the role location, education and experience requirements before applying."
    ],
    documents: ["CV/resume", "Academic and professional credentials relevant to the role", "Information requested in the official candidate profile"],
    applicationSteps: [
      "Open Stanbic IBTC's official careers page.",
      "Select View opportunities.",
      "Filter for a suitable Nigeria-based role or graduate opportunity.",
      "Review the requirements and submit through the official recruitment system."
    ],
    officialUrl: "https://www.stanbicibtc.com/nigeriaholdings/careers",
    officialUrlLabel: "View Stanbic IBTC opportunities",
    verifiedAt: "2026-10-03",
    feeNote: "Use the official Stanbic IBTC careers route and role listing when submitting application information.",
    sourceNotes: ["Stanbic IBTC's careers page provides a direct View opportunities route into its current recruitment system."],
    sources: [
      { label: "Stanbic IBTC Careers", url: "https://www.stanbicibtc.com/nigeriaholdings/careers", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "chevron-nigeria-careers",
    title: "Chevron Nigeria Careers",
    organization: "Chevron Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official job search",
    summary: "Chevron's Nigeria careers page provides a country-specific route to professional, internship and early-career opportunities connected to its Nigerian energy operations.",
    location: "Nigeria",
    employmentType: "Professional / early-career energy roles",
    audiences: ["Engineers", "Graduates", "Experienced professionals", "Internship applicants"],
    fields: ["Engineering", "Operations", "Energy", "Geoscience", "Information Technology", "Finance", "HSE"],
    qualifications: ["Qualifications vary by the specific Chevron vacancy or early-career programme."],
    requirements: [
      "Search by Nigeria/location and review the exact role requirements.",
      "Create the candidate profile required by Chevron's official job-search system.",
      "A CV/resume is required to complete the online profile when applying for an open position."
    ],
    documents: ["CV/resume", "Education and experience information required by the selected role", "Other vacancy-specific documents"],
    applicationSteps: [
      "Open Chevron's Nigeria careers page.",
      "Use See jobs to search the official careers system.",
      "Open a Nigeria-relevant role and read the eligibility criteria.",
      "Create the required candidate profile and attach your CV/resume.",
      "Submit only through Chevron's official careers system."
    ],
    officialUrl: "https://careers.chevron.com/nigeria",
    officialUrlLabel: "Search Chevron Nigeria jobs",
    verifiedAt: "2026-10-03",
    feeNote: "Chevron states that it only accepts applications through its Careers website and never seeks fees from job applicants.",
    sourceNotes: [
      "Chevron maintains a Nigeria-specific careers page.",
      "Its hiring-process page states that applicants create an online profile and provide a CV/resume."
    ],
    sources: [
      { label: "Chevron Nigeria Careers", url: "https://careers.chevron.com/nigeria", lastChecked: "2026-10-03" },
      { label: "Chevron Hiring Process", url: "https://careers.chevron.com/how-we-hire", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "totalenergies-nigeria-graduate-careers",
    title: "TotalEnergies Nigeria & Africa Young Graduate Careers",
    organization: "TotalEnergies",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers programmes",
    summary: "TotalEnergies' official careers platform lists professional jobs, internships and graduate programmes, including an Africa-focused Young Graduate pathway for early-career African graduates.",
    location: "Nigeria / Africa",
    employmentType: "Graduate programme / professional energy careers",
    audiences: ["Young graduates", "Engineers", "Scientists", "Commercial graduates", "Experienced professionals"],
    fields: ["Engineering", "Energy", "Renewables", "Finance", "Sales", "Commercial", "Operations"],
    qualifications: [
      "Role requirements vary across TotalEnergies vacancies and graduate programmes.",
      "The Africa Young Graduate programme describes eligible candidates as young African graduates with a Master's degree or equivalent, aged 26 or under.",
      "Programme availability must be confirmed in the current official offer before applying."
    ],
    requirements: [
      "Use TotalEnergies' official job/graduate-programme pages to verify current availability.",
      "Match your academic discipline and country eligibility to the specific programme or vacancy."
    ],
    documents: ["CV/resume", "Academic qualifications", "Other information required in the selected TotalEnergies vacancy/programme"],
    applicationSteps: [
      "Open TotalEnergies' official careers site.",
      "Search fixed-term/permanent, internship or graduate opportunities.",
      "For graduate programmes, confirm that recruitment is currently open for the exact programme/country.",
      "Submit through the official TotalEnergies careers system."
    ],
    officialUrl: "https://careers.totalenergies.com/",
    officialUrlLabel: "Search TotalEnergies careers",
    verifiedAt: "2026-10-03",
    feeNote: "Verify the exact vacancy in TotalEnergies' official careers system before submitting personal information.",
    sourceNotes: [
      "TotalEnergies publishes several graduate programmes plus fixed-term, permanent and internship vacancies.",
      "Its Africa Young Graduate programme describes an 18-month pathway with home-country and international phases."
    ],
    sources: [
      { label: "TotalEnergies Careers", url: "https://totalenergies.com/careers", lastChecked: "2026-10-03" },
      { label: "TotalEnergies Graduate Programmes", url: "https://careers.totalenergies.com/en/who-are-we/company-supporting-new-graduates/graduate-programs", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "unilever-nigeria-careers",
    title: "Unilever Nigeria Careers",
    organization: "Unilever Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official job portal",
    summary: "Unilever maintains a Nigeria-specific careers page with available opportunities and a talent network for applicants who want to be notified when suitable roles appear.",
    location: "Nigeria",
    employmentType: "Graduate / professional / operations careers",
    audiences: ["Graduates", "Experienced professionals", "Supply-chain applicants", "Commercial applicants"],
    fields: ["Supply chain", "Manufacturing", "Marketing", "Sales", "Finance", "Technology", "Human resources"],
    qualifications: ["Qualification and experience requirements depend on the specific Unilever vacancy."],
    requirements: [
      "Use the Nigeria careers page and the exact job listing for current requirements.",
      "Do not send money or card details as part of recruitment."
    ],
    documents: ["CV/resume", "Academic/professional information requested by the selected job", "Other role-specific application information"],
    applicationSteps: [
      "Open Unilever's Nigeria careers page.",
      "View available opportunities or search for a matching role.",
      "Read the vacancy requirements and location carefully.",
      "Submit through the official Unilever careers system or join the official talent network."
    ],
    officialUrl: "https://careers.unilever.com/en/nigeria",
    officialUrlLabel: "View Unilever Nigeria jobs",
    verifiedAt: "2026-10-03",
    feeNote: "Unilever warns that it will never ask for money or credit-card details during recruitment.",
    sourceNotes: ["Unilever's Nigeria careers page provides current-opportunity and talent-network routes plus an explicit recruitment-fraud warning."],
    sources: [
      { label: "Unilever Nigeria Careers", url: "https://careers.unilever.com/en/nigeria", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "nestle-nigeria-careers",
    title: "Nestlé Nigeria & Graduate Careers",
    organization: "Nestlé",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers portal",
    summary: "Nestlé's official careers system supports location-based job search, students and graduates, internships and professional roles across technical and corporate functions.",
    location: "Nigeria / global careers system",
    employmentType: "Graduate / internship / professional careers",
    audiences: ["Students", "Graduates", "Experienced professionals", "Technical applicants"],
    fields: ["Engineering", "Finance", "IT", "Marketing", "Research & Development", "Production", "Sales", "Supply chain"],
    qualifications: ["Qualifications depend on the specific Nestlé Nigeria vacancy, internship or graduate opportunity."],
    requirements: [
      "Search the official Nestlé careers system by location and job area.",
      "Use the specific vacancy criteria rather than assuming a general graduate requirement applies."
    ],
    documents: ["CV/resume", "Academic and professional information required by the job", "Other role-specific candidate information"],
    applicationSteps: [
      "Open Nestlé's official careers platform.",
      "Search by Nigeria/location and the career area that matches your background.",
      "Review the exact vacancy or student/graduate opportunity.",
      "Create/sign into the candidate profile and submit through the official system."
    ],
    officialUrl: "https://www.nestle.com/jobs",
    officialUrlLabel: "Search Nestlé careers",
    verifiedAt: "2026-10-03",
    feeNote: "Apply through Nestlé's official careers system and confirm the role/location before sharing application details.",
    sourceNotes: ["Nestlé's official careers site exposes student/graduate routes, internships and multiple professional career areas."],
    sources: [
      { label: "Nestlé Careers", url: "https://www.nestle.com/jobs", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "kpmg-nigeria-careers",
    title: "KPMG Nigeria Graduate Trainee, Internship & Experienced Hire Careers",
    organization: "KPMG Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers programmes",
    summary: "KPMG Nigeria's careers platform publishes graduate-trainee, undergraduate internship, graduate internship, pre-NYSC/NYSC and experienced-hire pathways with detailed eligibility criteria.",
    location: "Nigeria",
    employmentType: "Graduate trainee / internship / experienced hire",
    audiences: ["Undergraduates", "Pre-NYSC graduates", "NYSC members", "Fresh graduates", "Experienced professionals"],
    fields: ["Audit", "Tax", "Advisory", "Technology", "Risk", "Consulting", "Deals"],
    qualifications: [
      "Graduate Trainee: minimum Second Class Upper degree, at least five O'Level credits including English and Mathematics, completed NYSC and generally below 28 at application.",
      "Undergraduate Internship: at least second year but not final year, strong academic standing equivalent to 2:1, and published age limit below 24.",
      "Pre-NYSC Internship: minimum 2:1 degree, below 26, at least five credits including Mathematics and English, and availability for at least 12 weeks.",
      "Experienced Hire: KPMG publishes a general minimum of three years relevant post-NYSC experience plus a 2:1 degree and five O'Level credits including English and Mathematics."
    ],
    requirements: [
      "Applicants should choose the KPMG pathway matching their current education/NYSC/experience status.",
      "Graduate-trainee applicants should not have taken KPMG's aptitude test more than once within the previous 12 months.",
      "Programme/vacancy availability should be confirmed on the official careers portal before applying."
    ],
    documents: ["CV/resume", "O'Level results", "Degree/transcript information", "NYSC evidence where required", "Professional credentials for relevant experienced roles"],
    applicationSteps: [
      "Open KPMG Nigeria's careers platform.",
      "Choose internships, graduate trainee, experienced hire or available vacancies.",
      "Confirm all age, qualification and NYSC criteria for that route.",
      "Submit through the official programme or vacancy page.",
      "For graduate trainee recruitment, KPMG describes a journey through application, aptitude testing, assessment centre and partner interview."
    ],
    officialUrl: "https://apps.ng.kpmg.com/careers/",
    officialUrlLabel: "Open KPMG Nigeria careers",
    verifiedAt: "2026-10-03",
    feeNote: "Use KPMG Nigeria's official careers platform and published careers contact details when verifying recruitment communication.",
    sourceNotes: [
      "KPMG Nigeria publishes detailed internship and graduate-trainee eligibility rules.",
      "Its careers portal also exposes current vacancies and experienced-hire pathways.",
      "The FY27 Graduate Trainee application window closed on 6 March 2026, so that historic campaign is not presented here as currently open."
    ],
    sources: [
      { label: "KPMG Nigeria Careers", url: "https://apps.ng.kpmg.com/careers/", lastChecked: "2026-10-03" },
      { label: "KPMG Programmes & Eligibility", url: "https://apps.ng.kpmg.com/careers/team.html", lastChecked: "2026-10-03" },
      { label: "KPMG Current Vacancies", url: "https://apps.ng.kpmg.com/careers/jobs.html", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "deloitte-nigeria-early-careers",
    title: "Deloitte Nigeria 2026 Graduate Recruitment Refresh — Tax & Legal",
    organization: "Deloitte Nigeria",
    kind: "programme",
    sector: "Private",
    status: "open",
    statusLabel: "Applications open until 9 October 2026",
    summary: "Deloitte Nigeria has reopened its 2026 graduate recruitment for the Tax & Legal unit in Lagos. The official advert closes on 9 October 2026 and says candidates who already applied in the cycle that closed on 10 April should not apply again.",
    location: "Lagos, Nigeria",
    employmentType: "Full-time graduate recruitment",
    audiences: ["Fresh graduates", "NYSC-completed applicants", "Tax & legal graduate applicants"],
    fields: ["Tax", "Legal", "Graduate trainee", "Professional services"],
    qualifications: [
      "Minimum Second Class Upper degree or HND Upper Credit/equivalent from a recognised university or polytechnic, in any discipline.",
      "At least five O'Level credits including Mathematics and English in one sitting.",
      "Maximum age of 26 years at the date of application.",
      "Completed NYSC.",
      "Applicant must not have written the Deloitte aptitude test before."
    ],
    requirements: [
      "Do not submit a second application if you already applied to Deloitte's 2026 graduate advert that closed on 10 April 2026; the current official notice says duplicate/multiple applications can disqualify a candidate.",
      "Apply only through Deloitte's official SmartRecruiters advert.",
      "Deloitte states that it does not request upfront payment for recruitment, background checks, training or supplies."
    ],
    documents: ["CV/resume and the education/NYSC information requested by the official application form"],
    applicationSteps: [
      "Open Deloitte's official SmartRecruiters advert for the 2026 Graduate Recruitment Refresh — Tax & Legal Unit.",
      "Confirm that you meet the degree/HND, O'Level, age and NYSC requirements and that you have not previously written the Deloitte aptitude test.",
      "If you applied in the earlier 2026 cycle that closed on 10 April, do not submit another application.",
      "Complete the official application before 9 October 2026 and keep the confirmation."
    ],
    officialUrl: "https://jobs.smartrecruiters.com/Deloitte6/744000153123709-2026-graduate-recruitment-refresh-tax-and-legal-unit-",
    officialUrlLabel: "Apply on Deloitte's official SmartRecruiters advert",
    verifiedAt: "2026-10-06",
    deadline: "2026-10-09",
    nextMilestone: "Applications close 9 October 2026.",
    feeNote: "No application fee. Deloitte's official advert warns that it never asks candidates for upfront recruitment payments.",
    sourceNotes: [
      "The live Deloitte advert is specifically a 2026 Graduate Recruitment Refresh for the Tax & Legal Unit in Lagos.",
      "The advert preserves the core early-career eligibility criteria and explicitly tells prior April applicants not to apply again."
    ],
    sources: [
      { label: "Deloitte — 2026 Graduate Recruitment Refresh, Tax & Legal", url: "https://jobs.smartrecruiters.com/Deloitte6/744000153123709-2026-graduate-recruitment-refresh-tax-and-legal-unit-", lastChecked: "2026-10-06" }
    ]
  },
  {
    slug: "dangote-group-careers",
    title: "Dangote Group Jobs, Graduate Trainee & Industrial Careers",
    organization: "Dangote Industries Limited",
    sector: "Private",
    status: "open",
    statusLabel: "Live vacancies",
    summary: "Dangote's official careers system currently carries a large live vacancy catalogue across cement, refinery, food, corporate and industrial operations, alongside a structured Graduate Trainee pathway.",
    location: "Nigeria and other Dangote operating markets",
    employmentType: "Live vacancies / graduate trainee / experienced hire",
    audiences: ["Graduates", "Engineers", "Technicians", "Experienced professionals", "Operations applicants"],
    fields: ["Engineering", "Manufacturing", "Refinery", "Cement", "IT", "Finance", "Supply chain", "Sales", "Human resources"],
    qualifications: [
      "Requirements vary substantially across the current live vacancies.",
      "Dangote's careers FAQ confirms that the Group runs a Graduate Trainee Program with structured training, on-the-job learning and hands-on projects.",
      "Applicants should rely on the exact education and experience requirements in each live job description."
    ],
    requirements: [
      "Create or use an official Dangote careers profile.",
      "Search by role, business unit and location before applying.",
      "Meet the specific education, experience and competence criteria shown for the chosen vacancy."
    ],
    documents: ["CV/resume", "Academic/professional credentials relevant to the role", "Experience information required by the selected vacancy", "Other documents requested through the Dangote careers system"],
    applicationSteps: [
      "Open Dangote's official careers portal.",
      "Use View All Jobs or search by location/business area.",
      "Open the full job description and check qualifications and experience.",
      "Create/sign into your careers profile and submit through the official system.",
      "Use your careers profile to monitor application status and job alerts."
    ],
    officialUrl: "https://careers.dangote.com/",
    officialUrlLabel: "Search live Dangote jobs",
    verifiedAt: "2026-10-03",
    nextMilestone: "The official careers catalogue currently contains active Nigeria roles across multiple Dangote business units.",
    feeNote: "Apply through careers.dangote.com and verify the exact vacancy before sharing credentials.",
    sourceNotes: [
      "Dangote's official careers site currently exposes a broad live job catalogue.",
      "The Group's careers FAQ confirms its Graduate Trainee Program and candidate-profile/job-alert system."
    ],
    sources: [
      { label: "Dangote Careers", url: "https://careers.dangote.com/", lastChecked: "2026-10-03" },
      { label: "Dangote Jobs Catalogue", url: "https://careers.dangote.com/go/Roles-At-Dangote/9056002/", lastChecked: "2026-10-03" },
      { label: "Dangote Careers FAQ", url: "https://careers.dangote.com/content/Careers-FAQ/", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "seplat-energy-careers",
    title: "Seplat Energy Graduate Trainee, Internship & Professional Careers",
    organization: "Seplat Energy",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers programmes",
    summary: "Seplat Energy's careers site combines current professional vacancies with undergraduate internships, graduate trainee and technical graduate trainee pathways.",
    location: "Nigeria",
    employmentType: "Graduate trainee / internship / professional energy careers",
    audiences: ["Undergraduates", "Graduates", "Engineers", "Experienced professionals"],
    fields: ["Mechanical Engineering", "Chemical Engineering", "Electrical/Electronics", "Petroleum", "Geoscience", "Finance", "Law", "Business"],
    qualifications: [
      "Graduate Trainee: Seplat publishes a minimum Second Class Upper degree or equivalent in relevant science, engineering or selected social-science/business disciplines.",
      "Graduate applicants need at least five O'Level credits including Mathematics and English in one sitting and NYSC completion/exemption where applicable.",
      "Undergraduate Internship: applicant must have completed at least one year of university and provide an SIWES letter from the Head of Department.",
      "Technical Graduate Trainee: published criteria include a 2:1 Bachelor's degree in a relevant pure science or engineering discipline, five O'Level credits including Mathematics and English in one sitting, and NYSC completion/exemption."
    ],
    requirements: [
      "Use the official Seplat careers opportunity page and programme form.",
      "Internship applicants must present an SIWES letter addressed to Seplat HR.",
      "Shortlisted graduate candidates can move through online/face-to-face assessments, assessment centres and panel interviews."
    ],
    documents: ["CV/resume", "Degree evidence", "O'Level results", "NYSC discharge/exemption for graduate routes", "SIWES letter for undergraduate internships"],
    applicationSteps: [
      "Open Seplat Energy's official career-opportunities page.",
      "Choose current vacancy, internship, Graduate Trainee or Technical Graduate Trainee as applicable.",
      "Check the programme-specific eligibility criteria.",
      "Complete the official form or vacancy application.",
      "If shortlisted, follow the assessment and interview instructions issued by Seplat."
    ],
    officialUrl: "https://www.seplatenergy.com/careers/career-opportunities/",
    officialUrlLabel: "Open Seplat career opportunities",
    verifiedAt: "2026-10-03",
    feeNote: "Seplat Energy explicitly states that it will never ask applicants for money to support a job application.",
    sourceNotes: [
      "Seplat publishes detailed internship, graduate and technical-graduate eligibility requirements.",
      "The official career-opportunities page also links current vacancies."
    ],
    sources: [
      { label: "Seplat Career Opportunities", url: "https://www.seplatenergy.com/careers/career-opportunities/", lastChecked: "2026-10-03" },
      { label: "Seplat Careers", url: "https://www.seplatenergy.com/careers/", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "flutterwave-nigeria-careers",
    title: "Flutterwave Nigeria Jobs & Graduate Programme",
    organization: "Flutterwave",
    sector: "Private",
    status: "open",
    statusLabel: "Live Nigeria vacancies",
    summary: "Flutterwave's official vacancies page currently lists multiple Nigeria roles across engineering, product, risk, data, operations and business functions, alongside a Nigeria-focused graduate programme.",
    location: "Nigeria / remote Nigeria",
    employmentType: "Live fintech vacancies / graduate programme",
    audiences: ["Graduates", "Engineers", "Product applicants", "Risk & compliance applicants", "Operations applicants"],
    fields: ["Software Engineering", "Data", "Product", "Risk", "Compliance", "Finance", "Business Development", "Operations"],
    qualifications: [
      "Requirements vary by live role and should be checked in the exact Flutterwave vacancy.",
      "Flutterwave describes its graduate programme as a 12-month immersive programme for recent graduates and says it is currently piloted in Nigeria."
    ],
    requirements: [
      "Search the official vacancies page by Nigeria/location and job family.",
      "Open the exact role to confirm experience, skills and location requirements before applying."
    ],
    documents: ["CV/resume", "Portfolio or technical information where required", "Education/experience information requested by the role"],
    applicationSteps: [
      "Open Flutterwave's official vacancies page.",
      "Filter or scan for Nigeria-based and remote-Nigeria roles.",
      "Open the selected job and review all requirements.",
      "Submit through Flutterwave's official application flow.",
      "Recent graduates can also review the official Graduate Program page for programme availability."
    ],
    officialUrl: "https://flutterwave.com/ng/careers/vacancies",
    officialUrlLabel: "View live Flutterwave Nigeria roles",
    verifiedAt: "2026-10-03",
    nextMilestone: "The official vacancies page currently shows multiple active Nigeria roles.",
    feeNote: "Use Flutterwave's official careers domain and the exact vacancy page when applying.",
    sourceNotes: [
      "Flutterwave's official vacancies page currently lists a range of Nigeria-based roles.",
      "Its graduate page describes a 12-month programme currently piloted in Nigeria."
    ],
    sources: [
      { label: "Flutterwave Vacancies", url: "https://flutterwave.com/ng/careers/vacancies", lastChecked: "2026-10-03" },
      { label: "Flutterwave Graduate Program", url: "https://www.flutterwave.com/ng/careers/graduates", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "paystack-nigeria-careers",
    title: "Paystack Nigeria Jobs",
    organization: "Paystack",
    sector: "Private",
    status: "open",
    statusLabel: "Live Nigeria vacancies",
    summary: "Paystack's official careers site currently lists active Nigeria roles, including product, security, QA, backend engineering and other hybrid/multi-location technology positions.",
    location: "Nigeria / Lagos / hybrid and multi-location roles",
    employmentType: "Live fintech and technology vacancies",
    audiences: ["Engineers", "Product managers", "Security applicants", "Technology professionals"],
    fields: ["Engineering", "Product", "Security", "Data", "Quality Assurance", "Revenue", "Technology"],
    qualifications: ["Requirements depend on the specific live Paystack role and seniority level."],
    requirements: [
      "Use Paystack's official job-openings page to confirm that the selected role is still ongoing.",
      "Check whether the vacancy is Nigeria-only, Lagos, hybrid or multi-location before applying."
    ],
    documents: ["CV/resume", "Professional experience information", "Portfolio/technical information where requested by the selected vacancy"],
    applicationSteps: [
      "Open Paystack's official job openings.",
      "Select a Nigeria-based or Nigeria-eligible vacancy.",
      "Read the full responsibilities and qualifications.",
      "Use the official Apply Now flow.",
      "Track communication through the contact details used in the application."
    ],
    officialUrl: "https://careers.paystack.com/jobs",
    officialUrlLabel: "View current Paystack jobs",
    verifiedAt: "2026-10-03",
    nextMilestone: "Paystack's official job page currently marks multiple Nigeria-based roles as ongoing.",
    feeNote: "Apply from Paystack's official careers pages rather than copied vacancy forms.",
    sourceNotes: [
      "The official Paystack careers page currently lists active Nigeria positions across product and engineering-related functions."
    ],
    sources: [
      { label: "Paystack Careers", url: "https://paystack.com/careers", lastChecked: "2026-10-03" },
      { label: "Paystack Current Jobs", url: "https://careers.paystack.com/jobs", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "moniepoint-nigeria-careers",
    title: "Moniepoint Nigeria Jobs",
    organization: "Moniepoint Inc.",
    sector: "Private",
    status: "open",
    statusLabel: "Live Nigeria vacancies",
    summary: "Moniepoint's official careers site currently carries a wide range of Nigeria opportunities across states, including enterprise sales, field credit, customer support, product, engineering, data, finance and operations.",
    location: "Nigeria / multiple states / remote",
    employmentType: "Live fintech, banking and operations vacancies",
    audiences: ["Graduates", "Technology professionals", "Field applicants", "Finance applicants", "Operations applicants"],
    fields: ["Engineering", "Data", "Finance", "Banking operations", "Credit", "Sales", "Customer Success", "Compliance", "Product Design"],
    qualifications: ["Requirements vary by the selected Moniepoint role and location."],
    requirements: [
      "Use the official careers page and filter by Nigeria, state or team.",
      "Confirm whether the role is office-based, state-specific or remote before applying.",
      "Follow the experience and skill requirements shown on the exact vacancy."
    ],
    documents: ["CV/resume", "Professional/education information required by the role", "Role-specific application materials"],
    applicationSteps: [
      "Open Moniepoint's official careers page.",
      "Filter by Nigeria, state or team.",
      "Open the selected role and confirm duties, location and qualification requirements.",
      "Apply through the official Moniepoint careers flow.",
      "Follow the recruitment stages communicated for that vacancy."
    ],
    officialUrl: "https://moniepoint.com/careers",
    officialUrlLabel: "Search Moniepoint Nigeria roles",
    verifiedAt: "2026-10-04",
    nextMilestone: "The official careers catalogue currently contains numerous Nigeria roles across multiple states and remote teams.",
    feeNote: "Use Moniepoint's official careers page and exact role page when submitting application information.",
    sourceNotes: [
      "Moniepoint's official careers catalogue currently exposes a large set of Nigeria roles across technical and non-technical functions.",
      "When checked on 4 October 2026, the official global careers page showed active Nigeria openings across enterprise sales, field credit, customer support, engineering, data, finance, operations and design."
    ],
    sources: [
      { label: "Moniepoint Careers", url: "https://moniepoint.com/careers", lastChecked: "2026-10-04" }
    ]
  },
  {
    slug: "interswitch-careers",
    title: "Interswitch Nigeria Careers",
    organization: "Interswitch Group",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Interswitch's official careers page provides its recruitment entry point for applicants interested in payments, fintech, technology and business roles in Nigeria.",
    location: "Nigeria",
    employmentType: "Fintech / technology careers",
    audiences: ["Graduates", "Technology professionals", "Business professionals"],
    fields: ["Payments", "Software Engineering", "Product", "Technology", "Commercial", "Operations", "Finance"],
    qualifications: ["Requirements vary by the role available through Interswitch's recruitment system."],
    requirements: [
      "Use Interswitch's official careers route or Join Our Team flow.",
      "Review the exact vacancy requirements when a suitable position is available."
    ],
    documents: ["CV/resume", "Academic and professional information required by the vacancy", "Technical/portfolio information where applicable"],
    applicationSteps: [
      "Open Interswitch's official careers page.",
      "Use Join Our Team/current opportunities.",
      "Select a suitable role and check requirements.",
      "Submit through the official application route."
    ],
    officialUrl: "https://interswitchgroup.com/company/careers",
    officialUrlLabel: "Open Interswitch careers",
    verifiedAt: "2026-10-03",
    feeNote: "Use the official Interswitch Group careers domain before entering application information.",
    sourceNotes: ["Interswitch maintains an official Nigeria-focused careers entry point for fintech and payments opportunities."],
    sources: [
      { label: "Interswitch Careers", url: "https://interswitchgroup.com/company/careers", lastChecked: "2026-10-03" }
    ]
  },
  {
    slug: "pwc-nigeria-careers",
    title: "PwC Nigeria Careers",
    organization: "PwC Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "PwC Nigeria maintains official graduate recruitment and experienced-hire routes for professional-services careers.",
    location: "Nigeria",
    employmentType: "Graduate and experienced-hire careers",
    audiences: ["Graduates", "Experienced professionals"],
    fields: ["Assurance", "Tax", "Advisory", "Consulting", "Technology", "Professional services"],
    qualifications: ["Requirements depend on the graduate programme or experienced-hire vacancy."],
    requirements: ["Use PwC Nigeria's official careers pages and vacancy search.", "Check the exact role requirements before applying."],
    documents: ["CV/resume and any academic/professional information requested for the chosen role."],
    applicationSteps: [
      "Open PwC Nigeria's official careers page.",
      "Choose graduate recruitment or experienced hires.",
      "Review available opportunities.",
      "Check the role requirements and application instructions.",
      "Submit through the official PwC recruitment route."
    ],
    officialUrl: "https://www.pwc.com/ng/en/careers.html",
    officialUrlLabel: "Open PwC Nigeria careers",
    verifiedAt: "2026-10-03",
    feeNote: "Use PwC's official careers pages rather than third-party forms that request money or sensitive credentials.",
    sourceNotes: ["PwC Nigeria's careers page provides separate graduate recruitment and experienced-hire pathways."],
    sources: [
      { label: "PwC Nigeria Careers", url: "https://www.pwc.com/ng/en/careers.html", lastChecked: "2026-10-03" }
    ]
  },
{
    slug: "fidelity-bank-nigeria-careers",
    title: "Fidelity Bank Nigeria Careers",
    organization: "Fidelity Bank",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Fidelity Bank's official careers area covers professional and graduate technology pathways. Its current-openings page asked applicants to check back for future vacancies when reviewed on 5 October 2026.",
    location: "Nigeria",
    employmentType: "Banking, technology and graduate careers",
    audiences: ["Graduates", "Technology graduates", "Banking professionals", "Experienced hires"],
    fields: ["Banking", "Software Development", "Finance", "Operations", "Customer Experience"],
    qualifications: ["Requirements depend on the vacancy or graduate programme selected on Fidelity Bank's official recruitment pages."],
    requirements: ["Use Fidelity Bank's official careers pages.", "Check the exact vacancy for degree, experience, NYSC and location requirements.", "Treat copied forms or payment requests as unverified unless the bank links to them."],
    documents: ["CV/resume", "Academic and professional information requested by the selected role", "Role-specific supporting documents where requested"],
    applicationSteps: ["Open Fidelity Bank's official careers page.", "Check Current Job Openings for a live role or programme.", "Read the exact eligibility and location requirements.", "Use only the application route linked by Fidelity Bank.", "Keep the vacancy title and submission confirmation."],
    officialUrl: "https://www.fidelitybank.ng/careers/2/",
    officialUrlLabel: "Open Fidelity Bank careers",
    verifiedAt: "2026-10-05",
    nextMilestone: "The official current-openings page did not list a live vacancy when checked; monitor the bank's own careers area for the next intake.",
    feeNote: "MyNigeriaGuide does not collect recruitment fees. Verify any application route from Fidelity Bank's official domain.",
    sourceNotes: ["Fidelity Bank maintains an official careers area with graduate and technology career information.", "Its Current Job Openings page asked candidates to check back when reviewed on 5 October 2026."],
    sources: [
      { label: "Fidelity Bank Careers", url: "https://www.fidelitybank.ng/careers/2/", lastChecked: "2026-10-05" },
      { label: "Fidelity Bank Current Job Openings", url: "https://www.fidelitybank.ng/careers/current-job-openings/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "wema-bank-careers",
    title: "Wema Bank Careers",
    organization: "Wema Bank",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Wema Bank's official careers pages cover banking, technology, finance, customer experience, risk, legal, marketing and other business functions.",
    location: "Nigeria",
    employmentType: "Banking and technology careers",
    audiences: ["Graduates", "Banking applicants", "Technology applicants", "Experienced professionals"],
    fields: ["Banking", "Technology", "Finance", "Risk", "Legal", "Marketing", "Customer Experience"],
    qualifications: ["Eligibility varies by the Wema Bank vacancy or programme that is currently accepting applications."],
    requirements: ["Confirm the exact recruitment window on Wema Bank's official careers pages.", "Read role-specific education, NYSC, experience and location requirements.", "Do not reuse an expired programme form for a later recruitment cycle."],
    documents: ["CV/resume", "Academic and NYSC information where requested", "Professional credentials relevant to the role"],
    applicationSteps: ["Open Wema Bank's official careers area.", "Review available career or programme information.", "Confirm the application window is still open.", "Follow the application route published by Wema Bank.", "Save the application confirmation."],
    officialUrl: "https://www.wemabank.com/careers/what-we-do/",
    officialUrlLabel: "Open Wema Bank careers",
    verifiedAt: "2026-10-05",
    nextMilestone: "Use the bank's careers area to confirm the next active recruitment programme; a previously surfaced programme had already closed by this review.",
    feeNote: "Use Wema Bank's own careers pages to confirm recruitment instructions before submitting personal information.",
    sourceNotes: ["Wema Bank's careers site presents career functions spanning banking, technology and core corporate teams."],
    sources: [{ label: "Wema Bank Careers", url: "https://www.wemabank.com/careers/what-we-do/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "sterling-bank-careers",
    title: "Sterling Bank Nigeria Careers",
    organization: "Sterling Bank",
    sector: "Private",
    status: "open",
    statusLabel: "Live roles on official site",
    summary: "Sterling Bank's official jobs page showed active Nigeria roles when checked on 5 October 2026, alongside its broader careers portal.",
    location: "Nigeria",
    employmentType: "Banking, sales and commercial careers",
    audiences: ["Graduates", "Banking professionals", "Sales professionals", "Relationship managers"],
    fields: ["Banking", "Institutional Banking", "Commercial Banking", "Sales", "Customer Growth"],
    qualifications: ["Requirements vary by the specific role listed on Sterling Bank's official jobs page."],
    requirements: ["Open the exact live role and confirm education, experience and location requirements.", "Apply only through Sterling Bank's official route.", "Re-check the jobs page because individual roles can close without a shared programme deadline."],
    documents: ["CV/resume", "Academic/professional details requested by the role", "Role-specific supporting information"],
    applicationSteps: ["Open Sterling Bank's official careers page.", "Go to the current jobs listing.", "Choose a live vacancy and read the full requirements.", "Submit through the official application flow.", "Re-check availability if you return later."],
    officialUrl: "https://sterling.ng/about/careers/jobs/",
    officialUrlLabel: "View Sterling Bank jobs",
    verifiedAt: "2026-10-05",
    nextMilestone: "The official jobs page showed live roles when checked, including relationship-management and growth positions. Confirm the current list before applying.",
    feeNote: "Verify applications from Sterling Bank's official careers domain; MyNigeriaGuide does not collect applications or fees.",
    sourceNotes: ["Sterling Bank maintains an official careers hub and current-jobs page.", "The current-jobs page showed active roles on 5 October 2026."],
    sources: [
      { label: "Sterling Bank Careers", url: "https://sterling.ng/careers/", lastChecked: "2026-10-05" },
      { label: "Sterling Bank Current Jobs", url: "https://sterling.ng/about/careers/jobs/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "fcmb-group-careers",
    title: "FCMB Group Careers",
    organization: "FCMB Group",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "FCMB Group maintains an official careers route for banking and financial-services opportunities across the group.",
    location: "Nigeria",
    employmentType: "Banking and financial-services careers",
    audiences: ["Graduates", "Banking applicants", "Finance professionals", "Experienced hires"],
    fields: ["Banking", "Financial Services", "Risk", "Operations", "Technology", "Customer Experience"],
    qualifications: ["Requirements depend on the FCMB Group role or programme available at the time of application."],
    requirements: ["Start from FCMB Group's official careers page.", "Confirm vacancy-specific eligibility and location.", "Use the live role's own application instructions rather than copied third-party forms."],
    documents: ["CV/resume", "Education and professional details required by the vacancy", "Role-specific documents where requested"],
    applicationSteps: ["Open FCMB Group's careers page.", "Review current career opportunities.", "Select a role that matches your background.", "Verify the stated requirements.", "Submit through the official route."],
    officialUrl: "https://www.fcmbgroup.com/careers",
    officialUrlLabel: "Open FCMB Group careers",
    verifiedAt: "2026-10-05",
    feeNote: "Verify every recruitment route from FCMB Group's official domain before entering personal information.",
    sourceNotes: ["FCMB Group publishes an official careers entry point for group opportunities."],
    sources: [{ label: "FCMB Group Careers", url: "https://www.fcmbgroup.com/careers", lastChecked: "2026-10-05" }]
  },
  {
    slug: "ecobank-careers",
    title: "Ecobank Careers",
    organization: "Ecobank",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Ecobank's official group careers page provides the recruitment entry point for banking and financial-services opportunities across its markets, including Nigeria.",
    location: "Nigeria / Africa",
    employmentType: "Banking and financial-services careers",
    audiences: ["Graduates", "Banking professionals", "Finance professionals", "Experienced hires"],
    fields: ["Banking", "Finance", "Risk", "Operations", "Technology", "Corporate Banking"],
    qualifications: ["Requirements depend on the specific Ecobank role or recruitment programme."],
    requirements: ["Check Ecobank's official careers page for the current recruitment route.", "Confirm a role is open to applicants in Nigeria.", "Read the exact role criteria rather than assuming the same requirements across markets."],
    documents: ["CV/resume", "Academic/professional details", "Role-specific documents requested by Ecobank"],
    applicationSteps: ["Open Ecobank's official careers page.", "Review available opportunities or recruitment instructions.", "Confirm country and role eligibility.", "Prepare a role-specific CV.", "Submit through the official Ecobank route."],
    officialUrl: "https://ecobank.com/group/about-us/careers",
    officialUrlLabel: "Open Ecobank careers",
    verifiedAt: "2026-10-05",
    feeNote: "Use Ecobank's official domain and recruitment instructions. Do not pay a third party for shortlist access.",
    sourceNotes: ["Ecobank maintains an official group careers page with recruitment information for its African operations."],
    sources: [{ label: "Ecobank Careers", url: "https://ecobank.com/group/about-us/careers", lastChecked: "2026-10-05" }]
  },
  {
    slug: "bua-group-careers",
    title: "BUA Group Careers",
    organization: "BUA Group",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "BUA Group's official careers and vacancies pages cover its industrial businesses. Its vacancies page showed no current openings when reviewed on 5 October 2026.",
    location: "Nigeria",
    employmentType: "Industrial, manufacturing and corporate careers",
    audiences: ["Graduates", "Engineers", "Manufacturing professionals", "Business professionals"],
    fields: ["Manufacturing", "Engineering", "Food", "Cement", "Infrastructure", "Finance", "Operations"],
    qualifications: ["Requirements depend on the vacancy published by BUA Group."],
    requirements: ["Use BUA Group's official vacancies page to confirm whether applications are open.", "Check the business unit, location and role requirements.", "Avoid vacancy copies not linked from BUA Group's recruitment pages."],
    documents: ["CV/resume", "Academic and professional credentials requested by the vacancy", "Role-specific documents"],
    applicationSteps: ["Open BUA Group's official careers page.", "Check the official vacancies page.", "If a suitable vacancy is live, verify eligibility.", "Follow the official application instructions.", "If no vacancy is listed, do not submit to an unrelated form claiming to represent BUA."],
    officialUrl: "https://buagroup.com/careers/",
    officialUrlLabel: "Open BUA Group careers",
    verifiedAt: "2026-10-05",
    nextMilestone: "The official vacancies page reported no current openings when checked; use it to monitor the next recruitment window.",
    feeNote: "BUA Group's official careers and vacancies pages are the reference point for application instructions.",
    sourceNotes: ["BUA Group maintains separate careers and vacancies pages.", "The vacancies page showed no current openings on 5 October 2026."],
    sources: [
      { label: "BUA Group Careers", url: "https://buagroup.com/careers/", lastChecked: "2026-10-05" },
      { label: "BUA Group Vacancies", url: "https://buagroup.com/vacancies/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "flour-mills-nigeria-careers",
    title: "Flour Mills of Nigeria Careers",
    organization: "Flour Mills of Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official recruitment route",
    summary: "Flour Mills of Nigeria links candidates from its corporate site to an official recruitment system for manufacturing, engineering, supply-chain and corporate opportunities.",
    location: "Nigeria",
    employmentType: "Manufacturing, engineering and corporate careers",
    audiences: ["Graduates", "Engineers", "Manufacturing professionals", "Supply-chain professionals"],
    fields: ["Manufacturing", "Engineering", "Supply Chain", "Food", "Finance", "Operations"],
    qualifications: ["Requirements depend on the Flour Mills vacancy or programme selected."],
    requirements: ["Start from Flour Mills of Nigeria's official site or linked recruitment platform.", "Confirm vacancy location, education and experience requirements.", "Do not pay an application fee."],
    documents: ["CV/resume", "Academic and professional details", "Role-specific supporting documents"],
    applicationSteps: ["Open Flour Mills of Nigeria's official website.", "Follow the careers or Join FMN Family route.", "Open the official recruitment system.", "Choose a suitable role and review requirements.", "Submit through that recruitment system."],
    officialUrl: "https://fmnplc.e-recruiter.ng/jobprofile",
    officialUrlLabel: "Open Flour Mills of Nigeria",
    verifiedAt: "2026-10-05",
    feeNote: "Flour Mills recruitment guidance warns applicants against recruitment payments. Use only the company-linked recruitment route.",
    sourceNotes: ["Flour Mills of Nigeria links its careers area to an official e-recruitment platform."],
    sources: [
      { label: "Flour Mills of Nigeria", url: "https://fmnplc.e-recruiter.ng/jobprofile", lastChecked: "2026-10-05" },
      { label: "FMN Recruitment", url: "https://fmnplc.e-recruiter.ng/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "nigerian-breweries-careers",
    title: "Nigerian Breweries Careers",
    organization: "Nigerian Breweries Plc",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Nigerian Breweries' official careers area provides a route into talent and recruitment opportunities across commercial, engineering, brewery and support functions.",
    location: "Nigeria",
    employmentType: "FMCG, brewery, engineering and commercial careers",
    audiences: ["Graduates", "Engineers", "Commercial applicants", "Supply-chain professionals"],
    fields: ["FMCG", "Brewing", "Engineering", "Supply Chain", "Sales", "Marketing", "Finance"],
    qualifications: ["Requirements vary by the Nigerian Breweries vacancy or talent programme."],
    requirements: ["Use Nigerian Breweries' official careers pages.", "Check role-specific education, NYSC, experience and location criteria.", "Confirm any application link before sharing personal information."],
    documents: ["CV/resume", "Academic and professional information", "Documents requested by the selected vacancy"],
    applicationSteps: ["Open Nigerian Breweries' official careers area.", "Review the current talent or vacancy route.", "Select an opportunity that matches your experience.", "Read the complete eligibility requirements.", "Apply through the official process."],
    officialUrl: "https://www.nbplc.com/why-join-us/",
    officialUrlLabel: "Open Nigerian Breweries careers",
    verifiedAt: "2026-10-05",
    feeNote: "Verify recruitment instructions on Nigerian Breweries' official website before applying.",
    sourceNotes: ["Nigerian Breweries publishes an official careers and talent entry point on its corporate site."],
    sources: [{ label: "Nigerian Breweries — Why Join Us", url: "https://www.nbplc.com/why-join-us/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "oando-careers",
    title: "Oando Careers",
    organization: "Oando PLC",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers guidance",
    summary: "Oando's official careers page explains its recruitment route and warns candidates that its official LinkedIn channel is the authorised source for vacancy and recruitment advertisements.",
    location: "Nigeria",
    employmentType: "Energy, oil and gas careers",
    audiences: ["Graduates", "Engineers", "Energy professionals", "Business professionals"],
    fields: ["Oil and Gas", "Energy", "Engineering", "Commercial", "Finance", "Operations"],
    qualifications: ["Requirements depend on the vacancy Oando advertises through its authorised recruitment channels."],
    requirements: ["Start with Oando's official careers page.", "Verify vacancy advertisements through Oando's authorised channel.", "Do not trust a separate vacancy submission site merely because it uses Oando's name."],
    documents: ["CV/resume", "Academic/professional credentials requested by the vacancy", "Role-specific application materials"],
    applicationSteps: ["Read Oando's official careers guidance.", "Follow the authorised vacancy source identified by Oando.", "Confirm role, deadline and eligibility.", "Prepare a role-specific application.", "Submit only through the route Oando identifies as official."],
    officialUrl: "https://oandoplc.com/careers",
    officialUrlLabel: "Open Oando careers",
    verifiedAt: "2026-10-05",
    feeNote: "Oando explicitly warns applicants about unauthorised recruitment channels. Verify the source before submitting anything.",
    sourceNotes: ["Oando's careers page states that its official LinkedIn channel is the authorised source for vacancy and recruitment advertisements."],
    sources: [{ label: "Oando Careers", url: "https://oandoplc.com/careers", lastChecked: "2026-10-05" }]
  },
  {
    slug: "pg-nigeria-careers",
    title: "P&G Nigeria Careers",
    organization: "Procter & Gamble Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official Nigeria careers page",
    summary: "Procter & Gamble maintains a Nigeria careers page for internships, graduate opportunities and professional roles. No Nigeria result was displayed in the location search when reviewed on 5 October 2026.",
    location: "Nigeria",
    employmentType: "FMCG internships, graduate and professional careers",
    audiences: ["Students", "Graduates", "Engineers", "Business professionals"],
    fields: ["FMCG", "Engineering", "Manufacturing", "Sales", "Brand", "Finance", "Supply Chain"],
    qualifications: ["Eligibility depends on the P&G Nigeria opportunity selected."],
    requirements: ["Use P&G's official Nigeria careers page to check current availability.", "Read exact internship, graduate or professional requirements.", "Do not assume a global P&G role is open to applicants based in Nigeria."],
    documents: ["CV/resume", "Education and experience information requested in the application", "Role-specific supporting information"],
    applicationSteps: ["Open P&G's Nigeria careers page.", "Search the live jobs catalogue.", "Confirm role location and eligibility.", "Complete the official P&G application.", "Track updates through the application account."],
    officialUrl: "https://www.pgcareers.com/global/en/locations/nigeria",
    officialUrlLabel: "Open P&G Nigeria careers",
    verifiedAt: "2026-10-05",
    nextMilestone: "The Nigeria location page did not show a current search result when reviewed; re-check the official catalogue for the next opening.",
    feeNote: "Apply through P&G's official careers platform rather than copied recruitment forms.",
    sourceNotes: ["P&G has a dedicated Nigeria careers location page covering student, graduate and professional pathways."],
    sources: [{ label: "P&G Careers — Nigeria", url: "https://www.pgcareers.com/global/en/locations/nigeria", lastChecked: "2026-10-05" }]
  },
  {
    slug: "bat-nigeria-careers",
    title: "British American Tobacco Nigeria Careers",
    organization: "British American Tobacco Nigeria",
    sector: "Private",
    status: "open",
    statusLabel: "Nigeria jobs listed",
    summary: "British American Tobacco's official Nigeria jobs search showed a live Nigeria result when checked on 5 October 2026.",
    location: "Nigeria",
    employmentType: "FMCG, sourcing, operations and corporate careers",
    audiences: ["Graduates", "Supply-chain professionals", "Commercial applicants", "Experienced professionals"],
    fields: ["FMCG", "Sourcing", "Supply Chain", "Operations", "Commercial", "Finance"],
    qualifications: ["Requirements vary by the individual BAT Nigeria vacancy."],
    requirements: ["Open BAT's Nigeria-filtered official jobs search.", "Confirm the vacancy is still listed and read its role requirements.", "Verify work location and deadline if shown."],
    documents: ["CV/resume", "Education and experience details", "Role-specific documents requested in BAT's application flow"],
    applicationSteps: ["Open BAT's Nigeria job search.", "Select a live Nigeria vacancy.", "Review responsibilities, requirements and location.", "Apply through the official BAT Careers system.", "Keep your application record."],
    officialUrl: "https://careers.bat.com/en/search-jobs/nigeria/1045/1/1",
    officialUrlLabel: "Search BAT Nigeria jobs",
    verifiedAt: "2026-10-05",
    nextMilestone: "The Nigeria-filtered careers search showed a live result when reviewed. Confirm the current vacancy before applying.",
    feeNote: "Use BAT's official careers system for applications. MyNigeriaGuide does not receive applications or payments.",
    sourceNotes: ["BAT's official careers search provides a Nigeria filter and showed a Nigeria job result on 5 October 2026."],
    sources: [{ label: "BAT Careers — Nigeria Jobs", url: "https://careers.bat.com/en/search-jobs/nigeria/1045/1/1", lastChecked: "2026-10-05" }]
  },
  {
    slug: "slb-nigeria-careers",
    title: "SLB Nigeria Careers",
    organization: "SLB",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "SLB's official careers platform covers early-career and experienced energy-technology opportunities, including Nigeria-labelled career paths.",
    location: "Nigeria / global",
    employmentType: "Energy technology, engineering and early careers",
    audiences: ["Engineering students", "Graduates", "Engineers", "Energy professionals"],
    fields: ["Energy Technology", "Engineering", "Field Operations", "Human Resources", "Digital", "Geoscience"],
    qualifications: ["Requirements vary by the SLB programme or role and may be location-specific."],
    requirements: ["Search SLB's official careers platform for Nigeria or a suitable programme.", "Confirm role location and academic or experience requirements.", "Use only the SLB application flow."],
    documents: ["CV/resume", "Education and professional details", "Role-specific supporting information"],
    applicationSteps: ["Open SLB Careers.", "Search by Nigeria, discipline or early-career programme.", "Open the exact opportunity.", "Review eligibility and location.", "Apply through SLB's official recruitment system."],
    officialUrl: "https://careers.slb.com/",
    officialUrlLabel: "Open SLB careers",
    verifiedAt: "2026-10-05",
    feeNote: "Verify the role on SLB's official careers platform before providing personal information.",
    sourceNotes: ["SLB's official careers site includes early-career and experienced pathways and exposes Nigeria-labelled opportunities."],
    sources: [
      { label: "SLB Careers", url: "https://careers.slb.com/", lastChecked: "2026-10-05" },
      { label: "SLB Nigeria Early Career Example", url: "https://careers.slb.com/jobdescription.aspx?id=HRPro&location=NigeriaMulti-Location", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "halliburton-nigeria-careers",
    title: "Halliburton Nigeria Careers",
    organization: "Halliburton",
    sector: "Private",
    status: "open",
    statusLabel: "Nigeria job listed",
    summary: "Halliburton's official Nigeria job search showed an active Port Harcourt opportunity when checked on 5 October 2026.",
    location: "Nigeria / Port Harcourt",
    employmentType: "Energy services, engineering and technical careers",
    audiences: ["Engineers", "Energy professionals", "Technical professionals", "Experienced hires"],
    fields: ["Oilfield Services", "Engineering", "Science", "Technology", "Completions", "Operations"],
    qualifications: ["Requirements depend on the Halliburton vacancy selected from the official Nigeria jobs search."],
    requirements: ["Use Halliburton's Nigeria-filtered jobs search.", "Open the exact role and confirm technical, experience and location requirements.", "Re-check availability because vacancies can change without a shared closing date."],
    documents: ["CV/resume", "Education and professional details", "Technical credentials requested by the role"],
    applicationSteps: ["Open Halliburton's official Nigeria jobs page.", "Select a current Nigeria vacancy.", "Read the full job description.", "Apply through Halliburton Careers.", "Keep the requisition or job title."],
    officialUrl: "https://careers.halliburton.com/location/nigeria-jobs/543/2328926/2/2",
    officialUrlLabel: "Search Halliburton Nigeria jobs",
    verifiedAt: "2026-10-05",
    nextMilestone: "Halliburton's Nigeria search showed a Port Harcourt technical vacancy when reviewed on 5 October 2026. Confirm it remains listed before applying.",
    feeNote: "Apply through Halliburton's official careers system; MyNigeriaGuide does not process applications.",
    sourceNotes: ["Halliburton maintains an official Nigeria-filtered job search.", "The search showed a Port Harcourt role on 5 October 2026."],
    sources: [{ label: "Halliburton Careers — Nigeria", url: "https://careers.halliburton.com/location/nigeria-jobs/543/2328926/2/2", lastChecked: "2026-10-05" }]
  },
  {
    slug: "unicef-nigeria-careers",
    title: "UNICEF Nigeria Careers",
    organization: "UNICEF Nigeria",
    sector: "International",
    status: "career-page",
    statusLabel: "Official opportunities page",
    summary: "UNICEF Nigeria's official opportunities page is the local reference for vacancies, consultancies and internships. It showed no current local opportunities when reviewed on 5 October 2026.",
    location: "Nigeria",
    employmentType: "UN, development, consultancy and internship opportunities",
    audiences: ["Development professionals", "Graduates", "Consultants", "Internship applicants"],
    fields: ["International Development", "Health", "Education", "Child Protection", "Operations", "Programme Management"],
    qualifications: ["Requirements depend on the UNICEF vacancy, consultancy or internship selected."],
    requirements: ["Check UNICEF Nigeria's official opportunities page or UNICEF jobs system.", "Confirm duty station, contract type and closing date.", "Do not apply through a copied form when UNICEF's own page does not list the opportunity."],
    documents: ["CV/profile information", "Education and employment history", "Role-specific documents requested by UNICEF"],
    applicationSteps: ["Open UNICEF Nigeria's opportunities page.", "If an opportunity is listed, follow its official job link.", "Read eligibility, duty station and deadline.", "Complete the UNICEF application through the official system.", "If none is listed, monitor the official page."],
    officialUrl: "https://www.unicef.org/nigeria/opportunities",
    officialUrlLabel: "Open UNICEF Nigeria opportunities",
    verifiedAt: "2026-10-05",
    nextMilestone: "The Nigeria opportunities page stated that no vacancies, consultancies or internships were available when checked.",
    feeNote: "UNICEF recruitment should be handled through official systems. Do not pay for an application, shortlist or appointment.",
    sourceNotes: ["UNICEF Nigeria's local opportunities page showed no current vacancies, consultancies or internships on 5 October 2026."],
    sources: [
      { label: "UNICEF Nigeria Opportunities", url: "https://www.unicef.org/nigeria/opportunities", lastChecked: "2026-10-05" },
      { label: "UNICEF Jobs — Nigeria Search", url: "https://jobs.unicef.org/en-us/Search/?location=nigeria&search-keyword=&subscribe=true", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "undp-careers-nigeria",
    title: "UNDP Careers for Nigeria Applicants",
    organization: "United Nations Development Programme (UNDP)",
    sector: "International",
    status: "career-page",
    statusLabel: "Official UNDP careers",
    summary: "UNDP's official careers and job-opportunities pages are the reference point for development, programme, operations and specialist vacancies relevant to Nigeria.",
    location: "Nigeria / international",
    employmentType: "UN development and professional careers",
    audiences: ["Development professionals", "Graduates", "Programme professionals", "Operations professionals"],
    fields: ["International Development", "Programme Management", "Climate", "Governance", "Operations", "Finance", "Digital"],
    qualifications: ["Eligibility, nationality, experience and education requirements vary by the specific UNDP vacancy."],
    requirements: ["Use UNDP's official job-opportunities page.", "Confirm duty station, contract modality, deadline and eligibility.", "Follow UNDP's stated recruitment process and fraud guidance."],
    documents: ["Application profile/CV information", "Education and employment history", "Documents requested in the selected UNDP vacancy"],
    applicationSteps: ["Open UNDP's official careers page.", "Go to Job Opportunities.", "Search for Nigeria or a relevant role.", "Read full eligibility and deadline details.", "Submit through the official UNDP recruitment system."],
    officialUrl: "https://www.undp.org/careers/job-opportunities",
    officialUrlLabel: "Search UNDP job opportunities",
    verifiedAt: "2026-10-05",
    feeNote: "UNDP states that it does not charge a fee at any stage of its recruitment process.",
    sourceNotes: ["UNDP provides official job-opportunity and recruitment-process pages and warns applicants against recruitment fees."],
    sources: [
      { label: "UNDP Job Opportunities", url: "https://www.undp.org/careers/job-opportunities", lastChecked: "2026-10-05" },
      { label: "UNDP Recruitment Process", url: "https://www.undp.org/careers/our-recruitment-process", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "who-careers-nigeria",
    title: "WHO Careers for Nigeria Applicants",
    organization: "World Health Organization (WHO)",
    sector: "International",
    status: "career-page",
    statusLabel: "Official WHO careers",
    summary: "WHO's official careers site provides the application route for health, technical, programme and operations roles, including positions relevant to Nigeria.",
    location: "Nigeria / international",
    employmentType: "Global health and UN-system careers",
    audiences: ["Health professionals", "Programme professionals", "Technical specialists", "Operations professionals"],
    fields: ["Public Health", "Medicine", "Epidemiology", "Programme Management", "Operations", "Data"],
    qualifications: ["Requirements vary by WHO vacancy and can include specific education, experience, language and duty-station criteria."],
    requirements: ["Find the vacancy through WHO's official careers system.", "Read exact education, experience, language, contract and location requirements.", "Never pay a recruitment fee."],
    documents: ["Application profile/CV information", "Education and employment history", "Role-specific documents requested in the vacancy"],
    applicationSteps: ["Open WHO Careers.", "Use the official vacancy search.", "Select a role and verify duty station and eligibility.", "Complete the official online application.", "Follow only communication tied to WHO's recruitment process."],
    officialUrl: "https://www.who.int/careers",
    officialUrlLabel: "Open WHO careers",
    verifiedAt: "2026-10-05",
    feeNote: "WHO warns that it never asks applicants for money as part of recruitment.",
    sourceNotes: ["WHO publishes official careers and application guidance, including recruitment-fraud warnings."],
    sources: [
      { label: "WHO Careers", url: "https://www.who.int/careers", lastChecked: "2026-10-05" },
      { label: "WHO — Apply for a Position", url: "https://www.who.int/careers/apply-for-a-position", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "ey-nigeria-careers",
    title: "EY Nigeria Careers",
    organization: "EY Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers route",
    summary: "EY's Nigeria site links into EY's official careers and job-search system for graduate and experienced opportunities in assurance, consulting, strategy, transactions, tax and technology.",
    location: "Nigeria",
    employmentType: "Graduate and experienced professional-services careers",
    audiences: ["Graduates", "Accountants", "Consultants", "Technology professionals", "Experienced hires"],
    fields: ["Assurance", "Consulting", "Tax", "Strategy", "Transactions", "Technology", "Professional Services"],
    qualifications: ["Requirements depend on the EY role, graduate programme or experienced-hire opportunity selected."],
    requirements: ["Start from EY's official Nigeria site or careers system.", "Confirm role country, business area and eligibility.", "Follow the application route on EY's official careers domain."],
    documents: ["CV/resume", "Academic and professional information", "Role-specific supporting documents"],
    applicationSteps: ["Open EY Nigeria or EY's official job search.", "Search for Nigeria and a relevant business area.", "Review exact role requirements.", "Complete the application through EY Careers.", "Track updates through the application account."],
    officialUrl: "https://careers.ey.com/?locale=en",
    officialUrlLabel: "Search EY careers",
    verifiedAt: "2026-10-05",
    feeNote: "Use EY's official careers system before entering personal or application information.",
    sourceNotes: ["EY Nigeria links applicants into EY's global careers and official job-search environment."],
    sources: [
      { label: "EY Nigeria", url: "https://www.ey.com/en_ng", lastChecked: "2026-10-05" },
      { label: "EY Careers", url: "https://careers.ey.com/?locale=en", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "lagos-state-civil-service-careers",
    title: "Lagos State Civil Service Recruitment",
    organization: "Lagos State Civil Service Commission",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official Lagos State job-opportunities route",
    summary: "Lagos State's official website includes a Job Opportunities service area for government recruitment and other state employment opportunities. Use the live state service route to confirm current openings before applying.",
    location: "Lagos State",
    employmentType: "State civil service roles",
    audiences: ["Graduates", "Professionals", "Administrative applicants", "Technical applicants"],
    fields: ["Public Administration", "Engineering", "Finance", "Health", "ICT", "Administration"],
    qualifications: ["Requirements vary by vacancy; confirm the academic, NYSC and document rules shown in the current official vacancy notice."],
    requirements: ["Use the official Lagos State Job Opportunities service.", "Confirm that the vacancy is current before applying.", "Meet the role-specific education, NYSC and residency/document requirements."],
    documents: ["O'level results where requested", "Degree or HND where required", "NYSC discharge or exemption certificate where required", "Identity and personal documents requested by the vacancy"],
    applicationSteps: ["Open the official Lagos State services page.", "Choose Job Opportunities.", "Open the current government recruitment or vacancy route.", "Verify eligibility on the exact notice.", "Submit only through the official route shown there."],
    officialUrl: "https://lagosstate.gov.ng/services/",
    officialUrlLabel: "Open Lagos State Job Opportunities",
    verifiedAt: "2026-10-07",
    nextMilestone: "Check the official Lagos State Job Opportunities service for current recruitment notices and application routes.",
    feeNote: "Use only the payment or application instructions shown on an official Lagos State vacancy or service page; avoid unofficial recruitment agents.",
    sourceNotes: ["The official Lagos State services directory includes a Job Opportunities category for government recruitment and employment services."],
    sources: [{ label: "Lagos State Government — Job Opportunities", url: "https://lagosstate.gov.ng/services/", lastChecked: "2026-10-07" }]
  },
  {
    slug: "nigerian-ports-authority-careers",
    title: "Nigerian Ports Authority Careers",
    organization: "Nigerian Ports Authority",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official recruitment guidance",
    summary: "The Nigerian Ports Authority says verified recruitment information is published only through official NPA channels and stated that it was not recruiting when checked on 5 October 2026.",
    location: "Nigeria",
    employmentType: "Ports, maritime, engineering and public-sector careers",
    audiences: ["Engineers", "Maritime professionals", "Graduates", "Administrative professionals"],
    fields: ["Maritime", "Engineering", "Operations", "ICT", "Finance", "Administration"],
    qualifications: ["Requirements depend on any future vacancy published by the Nigerian Ports Authority."],
    requirements: ["Verify recruitment announcements on the NPA website.", "Do not use unofficial intermediaries or payment-based recruitment routes.", "Check role-specific qualifications when a vacancy is announced."],
    documents: ["Documents will depend on the official vacancy notice."],
    applicationSteps: ["Open the NPA website.", "Check Careers or News for recruitment announcements.", "Confirm any vacancy is current.", "Follow only the application instructions published by NPA.", "Retain the official notice for reference."],
    officialUrl: "https://nigerianports.gov.ng/faqs/",
    officialUrlLabel: "Check NPA recruitment guidance",
    verifiedAt: "2026-10-05",
    nextMilestone: "NPA stated that it was not recruiting when checked; monitor official Careers or News channels.",
    feeNote: "NPA warns against unofficial recruitment intermediaries.",
    sourceNotes: ["NPA's FAQ says recruitment information is published exclusively through official NPA communication channels."],
    sources: [{ label: "Nigerian Ports Authority FAQ", url: "https://nigerianports.gov.ng/faqs/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "standards-organisation-nigeria-careers",
    title: "Standards Organisation of Nigeria Careers",
    organization: "Standards Organisation of Nigeria",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official employment guidance",
    summary: "SON published an official September 2026 disclaimer stating that it had not advertised vacancies and warning applicants about fake recruitment websites.",
    location: "Nigeria",
    employmentType: "Standards, laboratory, engineering and regulatory careers",
    audiences: ["Engineers", "Scientists", "Laboratory professionals", "Administrators"],
    fields: ["Standards", "Engineering", "Laboratory Science", "Quality Assurance", "Administration"],
    qualifications: ["Requirements will depend on a future official SON recruitment notice."],
    requirements: ["Confirm any recruitment announcement on son.gov.ng.", "Ignore third-party recruitment claims not validated by SON.", "Never treat a copied application form as official evidence of a vacancy."],
    documents: ["Future vacancy notices will specify required documents."],
    applicationSteps: ["Open SON's official website.", "Check official news and employment notices.", "Confirm a vacancy is genuinely advertised.", "Follow only SON's published application route."],
    officialUrl: "https://son.gov.ng/2026/09/26/employment-information/",
    officialUrlLabel: "Read SON employment information",
    verifiedAt: "2026-10-05",
    nextMilestone: "SON stated on 26 September 2026 that it had not advertised vacancies.",
    feeNote: "Treat payment requests or third-party recruitment sites as a warning sign unless SON itself confirms them.",
    sourceNotes: ["SON's official employment notice warns about fake 2026/2027 recruitment claims."],
    sources: [{ label: "SON Employment Information", url: "https://son.gov.ng/2026/09/26/employment-information/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "nerc-careers",
    title: "NERC Careers",
    organization: "Nigerian Electricity Regulatory Commission",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official careers resources",
    summary: "NERC maintains an official Career Opportunities resource area for electricity-regulation roles. MyNigeriaGuide does not mark an old NERC advert as a current vacancy.",
    location: "Nigeria",
    employmentType: "Electricity regulation, engineering, economics and public policy careers",
    audiences: ["Engineers", "Economists", "Lawyers", "Policy professionals", "Graduates"],
    fields: ["Electricity Regulation", "Engineering", "Economics", "Law", "Consumer Affairs", "Policy"],
    qualifications: ["Qualifications vary by the position in an official NERC recruitment notice."],
    requirements: ["Check NERC's official careers/resources area.", "Confirm the publication date and application deadline.", "Do not rely on old PDF vacancy notices as evidence of a live 2026 recruitment."],
    documents: ["Role-specific documents will be stated in the official notice."],
    applicationSteps: ["Open NERC's Career Opportunities page.", "Look for a current recruitment notice.", "Read the exact qualifications and deadline.", "Apply only through the route identified by NERC."],
    officialUrl: "https://nerc.gov.ng/resources/career-opportunities/",
    officialUrlLabel: "Open NERC career opportunities",
    verifiedAt: "2026-10-05",
    feeNote: "Verify recruitment instructions on NERC's official domain before submitting information.",
    sourceNotes: ["NERC has an official Career Opportunities resources section; older vacancy documents remain online and should not be presented as current."],
    sources: [{ label: "NERC Career Opportunities", url: "https://nerc.gov.ng/resources/career-opportunities/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "edo-state-edsiec-careers",
    title: "Edo State Independent Electoral Commission Careers",
    organization: "Edo State Independent Electoral Commission",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "EDSIEC maintains an official careers page with a Current Openings route and recruitment guidance for applicants in Edo State.",
    location: "Edo State",
    employmentType: "State electoral and public-sector careers",
    audiences: ["Graduates", "Administrative applicants", "Public-sector applicants"],
    fields: ["Administration", "Electoral Services", "ICT", "Public Service"],
    qualifications: ["Requirements depend on the opening published through EDSIEC or the responsible Edo State recruitment portal."],
    requirements: ["Start from EDSIEC's official careers page.", "Open the Current Openings link before assuming recruitment is active.", "Do not pay anyone for recruitment assistance."],
    documents: ["Qualifications and identity documents stated by the exact recruitment notice"],
    applicationSteps: ["Open the EDSIEC careers page.", "Check Current Openings.", "Read the vacancy requirements.", "Apply through the linked official recruitment route.", "Keep your application status details."],
    officialUrl: "https://edsiec.edostate.gov.ng/career/",
    officialUrlLabel: "Open EDSIEC careers",
    verifiedAt: "2026-10-05",
    feeNote: "The official careers guidance says applicants should not pay anyone to obtain a job.",
    sourceNotes: ["EDSIEC's official careers page links to Current Openings and includes recruitment safety guidance."],
    sources: [{ label: "EDSIEC Careers", url: "https://edsiec.edostate.gov.ng/career/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "uniben-teaching-non-teaching-recruitment-2026",
    title: "University of Benin Teaching & Non-Teaching Recruitment 2026",
    organization: "University of Benin",
    kind: "recruitment-exercise",
    sector: "Government",
    status: "open",
    statusLabel: "Applications open",
    summary: "The University of Benin is accepting applications for teaching and non-teaching positions under an advertisement published 27 August 2026 for a six-week application period.",
    location: "Benin City, Edo State",
    employmentType: "Academic and non-teaching university positions",
    audiences: ["Academics", "Administrators", "Technical professionals", "University professionals"],
    fields: ["Teaching", "Research", "Administration", "ICT", "Technical Services", "University Operations"],
    qualifications: ["Qualifications depend on the advertised position; applicants must satisfy the specific academic or non-teaching criteria in UNIBEN's official notice."],
    requirements: ["Use the UNIBEN employment portal linked by the university.", "Prepare the application letter, detailed CV and passport photograph requested by the notice.", "Meet the position-specific academic, professional and NYSC requirements where applicable."],
    documents: ["Application letter", "Detailed CV", "Passport photograph", "Credentials and supporting information required by the selected position"],
    applicationSteps: ["Open UNIBEN's official 2026 vacancy notice.", "Choose the teaching or non-teaching position.", "Open the linked UNIBEN employment portal.", "Upload the requested application materials.", "Submit within the six-week application window."],
    officialUrl: "https://news.uniben.edu/advertisement-for-teaching-and-non-teaching-staff-positions-university-of-benin-2/",
    officialUrlLabel: "Read UNIBEN 2026 vacancy notice",
    verifiedAt: "2026-10-05",
    deadline: "2026-10-08",
    nextMilestone: "The six-week window from 27 August 2026 runs to 8 October 2026.",
    feeNote: "Apply through the University of Benin portal linked in the official notice.",
    sourceNotes: ["UNIBEN's official notice states that applications are invited for teaching and non-teaching positions and that the advertisement runs for six weeks from 27 August 2026."],
    sources: [{ label: "UNIBEN 2026 Teaching and Non-Teaching Vacancies", url: "https://news.uniben.edu/advertisement-for-teaching-and-non-teaching-staff-positions-university-of-benin-2/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "unilag-professorial-chair-2026",
    title: "University of Lagos Professorial Chair Vacancy 2026",
    organization: "University of Lagos",
    kind: "vacancy",
    posting: {
      jobTitle: "Senator Douye Diri Professorial Chair in Leadership and Good Governance",
      datePosted: "2026-09-09",
      locations: [{ locality: "Akoka", region: "Lagos State", country: "NG" }]
    },
    sector: "Government",
    status: "open",
    statusLabel: "Applications open",
    summary: "UNILAG is accepting applications for the Senator Douye Diri Professorial Chair in Leadership and Good Governance. The three-year senior academic appointment closes on 20 October 2026.",
    location: "Akoka, Lagos",
    employmentType: "Three-year senior academic appointment",
    audiences: ["Full Professors", "Senior academics", "Political science scholars", "Leadership and governance researchers"],
    fields: ["Political Science", "Leadership", "Governance", "Research", "Higher Education"],
    qualifications: [
      "A good first degree in a relevant field plus a PhD in an area relevant to Leadership and Good Governance.",
      "Applicants must already be full Professors with an established record of academic excellence and proven integrity.",
      "A strong record of scholarly publications in reputable national and international peer-reviewed outlets is required.",
      "Applicants should demonstrate continuing teaching and research in Leadership and Good Governance, academic and administrative leadership, and the ability to supervise Master's and Doctoral students."
    ],
    requirements: [
      "Prepare a detailed application, curriculum vitae and relevant publications.",
      "Prepare a Personal Statement and a two-year strategic plan for the Chair with objectives, activities, KPIs, annual targets, responsible persons, budget lines, funding sources and a Gantt-style implementation timeline.",
      "Provide the names and contact details of three referees in the CV.",
      "Complete the official UNILAG online application and retain the acknowledgement slip.",
      "Submit all required materials by Tuesday, 20 October 2026."
    ],
    documents: [
      "Detailed application",
      "Academic CV",
      "Relevant publications",
      "Personal Statement",
      "Two-year Professorial Chair Strategic Plan",
      "Three referee contact details",
      "Online application acknowledgement slip"
    ],
    applicationSteps: [
      "Read the full UNILAG Professorial Chair notice and confirm that you meet the minimum eligibility criteria.",
      "Prepare the CV, publications, Personal Statement and the required two-year strategic plan.",
      "Complete the application through UNILAG's official career portal at career.unilag.edu.ng/jobportal/jobportal/.",
      "Print or save the acknowledgement slip produced by the online application.",
      "Follow the notice's submission instructions to the Office of Advancement or Human Resources Management Directorate.",
      "Complete submission on or before 20 October 2026."
    ],
    officialUrl: "https://unilag.edu.ng/call-for-applications-for-the-senator-douye-diri-professorial-chair-in-leadership-and-good-governance-department-of-political-science/",
    officialUrlLabel: "Open UNILAG vacancy notice",
    verifiedAt: "2026-10-05",
    deadline: "2026-10-20",
    nextMilestone: "Applications close Tuesday, 20 October 2026.",
    feeNote: "Use the UNILAG career portal and submission contacts stated in the university's official notice.",
    sourceNotes: [
      "UNILAG published the call on 9 September 2026 and states that applications close on 20 October 2026.",
      "The official notice specifies full-Professor status, relevant first degree and PhD, scholarly publication and supervision requirements, and a three-year tenure.",
      "UNILAG directs candidates to its official career portal and requires a Personal Statement plus a detailed two-year strategic plan."
    ],
    sources: [
      { label: "UNILAG Professorial Chair Vacancy", url: "https://unilag.edu.ng/call-for-applications-for-the-senator-douye-diri-professorial-chair-in-leadership-and-good-governance-department-of-political-science/", lastChecked: "2026-10-05" },
      { label: "UNILAG Career Portal", url: "https://career.unilag.edu.ng/jobportal/jobportal/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "university-ibadan-careers",
    title: "University of Ibadan Careers",
    organization: "University of Ibadan",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official recruitment portal",
    summary: "The University of Ibadan maintains an official recruitment portal for academic and non-academic hiring. Its 2025 recruitment exercise was closed when checked on 5 October 2026.",
    location: "Ibadan, Oyo State",
    employmentType: "Academic and non-academic university careers",
    audiences: ["Academics", "Administrators", "Health professionals", "Technical professionals"],
    fields: ["Teaching", "Research", "Administration", "Health", "ICT", "Technical Services"],
    qualifications: ["Requirements vary by University of Ibadan recruitment exercise and position."],
    requirements: ["Use the UI recruitment portal.", "Confirm that the recruitment exercise is current.", "Read the exact academic or non-academic criteria before applying."],
    documents: ["Documents specified by the active recruitment exercise"],
    applicationSteps: ["Open the UI recruitment portal.", "Check whether a current exercise is accepting applications.", "Open the relevant vacancy.", "Complete the official university application if active."],
    officialUrl: "https://vacancies.ui.edu.ng/",
    officialUrlLabel: "Open UI recruitment portal",
    verifiedAt: "2026-10-05",
    nextMilestone: "The portal says the previously advertised 2025 positions are closed; monitor it for the next exercise.",
    feeNote: "Apply only through University of Ibadan's official recruitment portal.",
    sourceNotes: ["UI's recruitment portal explicitly states that the previously advertised 2025 positions are closed."],
    sources: [{ label: "University of Ibadan Recruitment Portal", url: "https://vacancies.ui.edu.ng/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "university-nigeria-nsukka-careers",
    title: "University of Nigeria Nsukka Careers",
    organization: "University of Nigeria, Nsukka",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official vacancy archive",
    summary: "UNN publishes academic and non-teaching vacancy notices on its official website. MyNigeriaGuide keeps the route indexed without presenting an older notice as a current 2026 vacancy.",
    location: "Nsukka, Enugu State",
    employmentType: "Academic and non-teaching university careers",
    audiences: ["Academics", "Researchers", "Administrators", "Technical professionals"],
    fields: ["Teaching", "Research", "Administration", "Technical Services"],
    qualifications: ["Requirements depend on the exact UNN vacancy notice."],
    requirements: ["Use the official UNN website.", "Check the date and deadline of the vacancy notice.", "Do not assume an older advertisement is still accepting applications."],
    documents: ["Position-specific application documents listed by UNN"],
    applicationSteps: ["Open UNN's official vacancy notice area.", "Confirm a current position is advertised.", "Review qualification and submission instructions.", "Apply using the route stated by the university."],
    officialUrl: "https://www.unn.edu.ng/breaking-news-vacancies-for-academic-and-non-teaching-positions-in-university-of-nigeria-nsukka/",
    officialUrlLabel: "View UNN vacancy information",
    verifiedAt: "2026-10-05",
    feeNote: "Use only vacancy instructions published on UNN's official domain.",
    sourceNotes: ["UNN publishes detailed academic and non-teaching vacancy advertisements on its official website."],
    sources: [{ label: "UNN Academic and Non-Teaching Vacancies", url: "https://www.unn.edu.ng/breaking-news-vacancies-for-academic-and-non-teaching-positions-in-university-of-nigeria-nsukka/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "oau-careers",
    title: "Obafemi Awolowo University Careers",
    organization: "Obafemi Awolowo University",
    sector: "Government",
    status: "open",
    statusLabel: "Official portal shows openings",
    summary: "OAU's official recruitment portal displayed open academic, administrative, technical and library categories when checked on 5 October 2026.",
    location: "Ile-Ife, Osun State",
    employmentType: "Academic, administrative and technical university careers",
    audiences: ["Academics", "Administrators", "Engineers", "ICT professionals", "Library professionals"],
    fields: ["Teaching", "Research", "Administration", "Engineering", "ICT", "Library Services"],
    qualifications: ["Requirements vary by the position listed in OAU's official recruitment portal."],
    requirements: ["Use OAU's official apply.oauife.edu.ng portal.", "Open the exact vacancy and confirm its requirements.", "Create an applicant profile if required."],
    documents: ["CV and credentials requested by the selected vacancy", "Applicant profile information"],
    applicationSteps: ["Open OAU's recruitment portal.", "View current vacancies.", "Select a role and confirm eligibility.", "Create or sign in to your applicant profile.", "Submit through the official portal."],
    officialUrl: "https://apply.oauife.edu.ng/",
    officialUrlLabel: "Open OAU recruitment portal",
    verifiedAt: "2026-10-05",
    nextMilestone: "The official portal displayed multiple open categories when checked; confirm the exact vacancy before applying.",
    feeNote: "Use OAU's official recruitment portal rather than copied vacancy forms.",
    sourceNotes: ["OAU's portal displayed open academic, administrative, technical and library categories on 5 October 2026."],
    sources: [{ label: "OAU Recruitment Portal", url: "https://apply.oauife.edu.ng/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "unilorin-careers",
    title: "University of Ilorin Careers",
    organization: "University of Ilorin",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official recruitment portal",
    summary: "The University of Ilorin maintains an official recruitment portal and Human Resources vacancy site for academic, administrative and technical hiring.",
    location: "Ilorin, Kwara State",
    employmentType: "Academic and non-academic university careers",
    audiences: ["Academics", "Administrators", "Technical professionals", "Graduates"],
    fields: ["Teaching", "Research", "Administration", "ICT", "Technical Services"],
    qualifications: ["Requirements depend on the current University of Ilorin recruitment exercise."],
    requirements: ["Use the official University of Ilorin recruitment portal.", "Check the current announcement and vacancy list.", "Do not rely on older recruitment adverts without confirming their status."],
    documents: ["CV", "Certificates and credentials", "Documents requested by the active position"],
    applicationSteps: ["Open the UNILORIN recruitment portal.", "Check current announcements and positions.", "Create an applicant account if a position is active.", "Upload the requested credentials and submit."],
    officialUrl: "https://careers.unilorin.edu.ng/",
    officialUrlLabel: "Open UNILORIN recruitment portal",
    verifiedAt: "2026-10-05",
    feeNote: "Use the university's official recruitment and HR portals.",
    sourceNotes: ["UNILORIN maintains a dedicated official recruitment portal and HR recruitment pages."],
    sources: [
      { label: "UNILORIN Recruitment Portal", url: "https://careers.unilorin.edu.ng/", lastChecked: "2026-10-05" },
      { label: "UNILORIN Human Resources", url: "https://vacancy.unilorin.edu.ng/directorates-of-human-resources-academic-non-teaching/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "ahmadu-bello-university-careers",
    title: "Ahmadu Bello University Careers",
    organization: "Ahmadu Bello University",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official recruitment portal",
    summary: "Ahmadu Bello University operates an official careers and recruitment portal for university job applications.",
    location: "Zaria, Kaduna State",
    employmentType: "Academic and non-academic university careers",
    audiences: ["Academics", "Researchers", "Administrators", "Technical professionals"],
    fields: ["Teaching", "Research", "Administration", "Engineering", "ICT"],
    qualifications: ["Requirements depend on the vacancy published on ABU's official careers portal."],
    requirements: ["Use careers.abu.edu.ng.", "Open the exact vacancy before creating an application.", "Provide accurate applicant information and credentials."],
    documents: ["CV and credentials required by the selected ABU vacancy"],
    applicationSteps: ["Open ABU Careers.", "Review available vacancies.", "Create an applicant account.", "Complete your profile and application.", "Submit through the official portal."],
    officialUrl: "https://careers.abu.edu.ng/register",
    officialUrlLabel: "Open ABU careers portal",
    verifiedAt: "2026-10-05",
    feeNote: "Use only the official careers.abu.edu.ng recruitment portal.",
    sourceNotes: ["ABU's portal identifies itself as the university's official Job Vacancies and Recruitment Portal."],
    sources: [{ label: "ABU Careers Portal", url: "https://careers.abu.edu.ng/register", lastChecked: "2026-10-05" }]
  },
  {
    slug: "lasucom-academic-careers",
    title: "LASU College of Medicine Academic Careers",
    organization: "Lagos State University College of Medicine",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official vacancy notices",
    summary: "LASU publishes official academic vacancy notices for its College of Medicine, including clinical sciences, dentistry and basic medical sciences.",
    location: "Ikeja, Lagos",
    employmentType: "Academic health-sciences careers",
    audiences: ["Medical academics", "Dental academics", "Clinical specialists", "Researchers"],
    fields: ["Medicine", "Dentistry", "Nursing", "Clinical Sciences", "Basic Medical Sciences", "Research"],
    qualifications: ["Requirements vary by the academic rank and department in LASU's vacancy notice."],
    requirements: ["Use LASU's official news/vacancy notice.", "Confirm the advertisement date and closing date.", "Meet department-specific academic and professional requirements."],
    documents: ["Academic CV and supporting credentials specified in the vacancy notice"],
    applicationSteps: ["Open LASU's official vacancy notice.", "Identify the department and rank.", "Review the detailed requirements.", "Follow the university's stated submission route."],
    officialUrl: "https://www.lasu.edu.ng/home/news/read.php?id=663",
    officialUrlLabel: "View LASUCOM vacancy notice",
    verifiedAt: "2026-10-05",
    feeNote: "Follow only application instructions published by Lagos State University.",
    sourceNotes: ["LASU published an official 2026 advertisement covering academic positions in LASUCOM faculties including Clinical Sciences and Dentistry."],
    sources: [{ label: "LASUCOM Academic Vacancy Notice", url: "https://www.lasu.edu.ng/home/news/read.php?id=663", lastChecked: "2026-10-05" }]
  },
  {
    slug: "uch-ibadan-careers",
    title: "University College Hospital Ibadan Careers",
    organization: "University College Hospital Ibadan",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official employment portal",
    summary: "UCH Ibadan operates an official employment portal used for recruitment and internship-programme applicant updates.",
    location: "Ibadan, Oyo State",
    employmentType: "Hospital, clinical, internship and administrative careers",
    audiences: ["Doctors", "Dentists", "Nurses", "Health professionals", "Internship applicants", "Administrators"],
    fields: ["Medicine", "Dentistry", "Nursing", "Allied Health", "Administration", "Internship"],
    qualifications: ["Requirements vary by UCH recruitment or internship programme."],
    requirements: ["Use employment.uch-ibadan.org.ng.", "Confirm the exact programme or vacancy.", "Follow the official hospital screening and application instructions."],
    documents: ["Credentials and supporting documents required by the selected UCH programme"],
    applicationSteps: ["Open the UCH employment portal.", "Create or sign in to your account when applications are active.", "Review the programme or vacancy notice.", "Submit or track your application through the portal."],
    officialUrl: "https://employment.uch-ibadan.org.ng/",
    officialUrlLabel: "Open UCH employment portal",
    verifiedAt: "2026-10-05",
    feeNote: "Use UCH's own employment portal for recruitment and applicant-status information.",
    sourceNotes: ["The UCH employment portal includes applicant login and internship-programme screening notices."],
    sources: [{ label: "UCH Employment Portal", url: "https://employment.uch-ibadan.org.ng/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "axa-mansard-careers",
    title: "AXA Mansard Careers",
    organization: "AXA Mansard",
    sector: "Private",
    status: "open",
    statusLabel: "Current positions listed",
    summary: "AXA Mansard's official jobs page displayed current Lagos-based insurance and health roles when checked on 5 October 2026.",
    location: "Lagos / Nigeria",
    employmentType: "Insurance, health, finance and corporate careers",
    audiences: ["Graduates", "Insurance professionals", "Health professionals", "Finance professionals", "Experienced hires"],
    fields: ["Insurance", "Health", "Finance", "Supply Chain", "Customer Experience", "Sales"],
    qualifications: ["Requirements vary by the current AXA Mansard position."],
    requirements: ["Open the exact AXA Mansard vacancy.", "Confirm the role's experience, education and location criteria.", "Complete the application through AXA's official route."],
    documents: ["CV/resume", "Education and professional information requested by the role"],
    applicationSteps: ["Open AXA Mansard's official jobs page.", "Choose a current position.", "Read the role requirements and recruitment process.", "Apply through the official AXA Mansard application flow."],
    officialUrl: "https://corporate.axamansard.com/jobs/",
    officialUrlLabel: "View AXA Mansard jobs",
    verifiedAt: "2026-10-05",
    nextMilestone: "The official page showed several recently posted positions when checked; confirm each role is still accepting applications.",
    feeNote: "Use AXA Mansard's official careers and jobs pages for recruitment.",
    sourceNotes: ["AXA Mansard's jobs page showed multiple current positions in Lagos and its careers site explains the official recruitment process."],
    sources: [
      { label: "AXA Mansard Jobs", url: "https://corporate.axamansard.com/jobs/", lastChecked: "2026-10-05" },
      { label: "AXA Mansard Recruitment Process", url: "https://corporate.axamansard.com/careers/our-recruitment-process/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "aiico-insurance-careers",
    title: "AIICO Insurance Careers",
    organization: "AIICO Insurance Plc",
    sector: "Private",
    status: "open",
    statusLabel: "Current vacancy listed",
    summary: "AIICO's official vacancies page listed a Sales Officer position in Ibadan when checked on 5 October 2026 and also maintains an official talent-pool application route.",
    location: "Nigeria",
    employmentType: "Insurance, sales, finance and corporate careers",
    audiences: ["Insurance professionals", "Sales professionals", "Graduates", "Experienced hires"],
    fields: ["Insurance", "Sales", "Finance", "Customer Service", "Actuarial", "Operations"],
    qualifications: ["Requirements depend on the AIICO position; the separate talent-pool page lists its own minimum education and insurance-experience criteria."],
    requirements: ["Use AIICO's official vacancies page.", "Confirm the selected position's location and experience criteria.", "Do not substitute the talent pool for a specific vacancy application unless instructed."],
    documents: ["CV/resume", "Education and professional details requested by the vacancy"],
    applicationSteps: ["Open AIICO Careers.", "Review Currently Available Positions.", "Open the exact role.", "Check qualification and location requirements.", "Apply through AIICO's official route."],
    officialUrl: "https://www.aiicoplc.com/about-us/careers/vacancies",
    officialUrlLabel: "View AIICO vacancies",
    verifiedAt: "2026-10-05",
    nextMilestone: "The vacancies page listed a Sales Officer role in Ibadan when checked.",
    feeNote: "Use AIICO's official careers domain for applications.",
    sourceNotes: ["AIICO's official vacancies page displayed a current Sales Officer position when reviewed."],
    sources: [
      { label: "AIICO Vacancies", url: "https://www.aiicoplc.com/about-us/careers/vacancies", lastChecked: "2026-10-05" },
      { label: "AIICO Careers", url: "https://www.aiicoplc.com/about-us/careers", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "leadway-careers",
    title: "Leadway Careers",
    organization: "Leadway Assurance",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Leadway's official careers site covers roles across actuarial, IT and digital, underwriting, sales, strategy, finance, HR and customer service and explains its recruitment process.",
    location: "Nigeria",
    employmentType: "Insurance and financial-services careers",
    audiences: ["Graduates", "Actuarial professionals", "Technology professionals", "Insurance professionals", "Experienced hires"],
    fields: ["Insurance", "Actuarial", "Technology", "Underwriting", "Finance", "Sales", "Human Resources"],
    qualifications: ["Requirements vary by the Leadway opening selected."],
    requirements: ["Browse openings from Leadway's official careers page.", "Check role-specific requirements before applying.", "Complete the official online application."],
    documents: ["CV/resume", "Information and credentials requested by the selected role"],
    applicationSteps: ["Open Leadway Careers.", "Select See available openings.", "Choose a suitable role.", "Complete the official application.", "Follow the screening and selection stages described by Leadway."],
    officialUrl: "https://www.leadway.com/career/",
    officialUrlLabel: "Open Leadway careers",
    verifiedAt: "2026-10-05",
    feeNote: "Use Leadway's official career page and application process.",
    sourceNotes: ["Leadway publishes its career fields and a multi-stage recruitment process on its official site."],
    sources: [{ label: "Leadway Careers", url: "https://www.leadway.com/career/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "custodian-investment-careers",
    title: "Custodian Investment Careers",
    organization: "Custodian Investment Plc",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Custodian Investment maintains an official careers page and Graduate Trainee Programme for applicants interested in insurance, investments and financial services.",
    location: "Nigeria",
    employmentType: "Insurance, investment and graduate careers",
    audiences: ["Graduates", "Insurance applicants", "Investment professionals", "Finance professionals"],
    fields: ["Insurance", "Investment", "Finance", "Technology", "Operations", "Graduate Trainee"],
    qualifications: ["Requirements vary by Custodian career opportunity or graduate programme cycle."],
    requirements: ["Start from Custodian's official careers page.", "Confirm whether a programme or vacancy is accepting applications.", "Follow the official application route."],
    documents: ["CV/resume", "Academic and professional details requested by the opportunity"],
    applicationSteps: ["Open Custodian Careers.", "Review Career Opportunities or the Graduate Trainee Programme.", "Confirm current application status.", "Submit through Custodian's official route."],
    officialUrl: "https://custodianplc.com.ng/careers/",
    officialUrlLabel: "Open Custodian careers",
    verifiedAt: "2026-10-05",
    feeNote: "Use Custodian's official website for recruitment and programme applications.",
    sourceNotes: ["Custodian publishes career opportunities and a dedicated graduate trainee programme on its official site."],
    sources: [
      { label: "Custodian Careers", url: "https://custodianplc.com.ng/careers/", lastChecked: "2026-10-05" },
      { label: "Custodian Graduate Trainee Programme", url: "https://custodianplc.com.ng/graduate-trainee-program/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "coronation-graduate-trainee-2026",
    title: "Coronation 2026 Graduate Trainee Programme",
    organization: "Coronation Group",
    kind: "programme",
    sector: "Private",
    status: "open",
    statusLabel: "Apply Now on official site",
    summary: "Coronation's official 2026 Graduate Trainee Programme Academy page shows an Apply Now route across nine pathways including actuarial, finance, insurance, investment, sales and technology.",
    location: "Nigeria",
    employmentType: "Graduate trainee programme",
    audiences: ["Recent graduates", "Finance graduates", "Technology graduates", "Quantitative graduates"],
    fields: ["Actuarial", "Finance", "Insurance", "Investment", "Sales", "Technology", "Strategy"],
    qualifications: ["Pathway requirements differ; Coronation describes discipline alignment for several academy tracks on its official page."],
    requirements: ["Review the nine academy pathways.", "Choose the path aligned with your academic background and interests.", "Use the Apply Now route on Coronation's official site."],
    documents: ["Application profile", "CV/resume and academic information requested in the application"],
    applicationSteps: ["Open the Coronation 2026 Graduate Trainee Academy.", "Review the available pathways.", "Choose a pathway that fits your background.", "Select Apply Now and complete the official application."],
    officialUrl: "https://www.coronation.ng/coronation-academies/",
    officialUrlLabel: "Open Coronation 2026 Academy",
    verifiedAt: "2026-10-05",
    nextMilestone: "The official 2026 academy page displayed Apply Now when checked; confirm availability before submitting.",
    feeNote: "Apply through Coronation's official website.",
    sourceNotes: ["Coronation's official 2026 Graduate Trainee Programme Academy lists nine career pathways and an Apply Now control."],
    sources: [{ label: "Coronation 2026 Graduate Trainee Programme Academy", url: "https://www.coronation.ng/coronation-academies/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "lafarge-africa-careers",
    title: "Lafarge Africa Careers",
    organization: "Lafarge Africa Plc",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official job opportunities page",
    summary: "Lafarge Africa's official job-opportunities page covers internships, management, technical and creative roles across its Nigerian operations.",
    location: "Nigeria",
    employmentType: "Construction materials, engineering, manufacturing and corporate careers",
    audiences: ["Graduates", "Engineers", "Manufacturing professionals", "Commercial professionals"],
    fields: ["Engineering", "Manufacturing", "Cement", "Operations", "Commercial", "Sustainability"],
    qualifications: ["Requirements vary by the Lafarge Africa opening selected."],
    requirements: ["Use Lafarge Africa's official job-opportunities page.", "Open the specific role and confirm its location and criteria.", "Submit through the linked official application route."],
    documents: ["CV/resume", "Role-specific credentials and application information"],
    applicationSteps: ["Open Lafarge Africa Job Opportunities.", "Select available openings.", "Review role requirements.", "Submit through the official application system."],
    officialUrl: "https://careers.holcimgroup.com/lafarge_nigeria/",
    officialUrlLabel: "Open Lafarge job opportunities",
    verifiedAt: "2026-10-05",
    feeNote: "Use Lafarge Africa's official careers route.",
    sourceNotes: ["Lafarge Africa's official site provides an openings route and covers internships through management and technical careers."],
    sources: [{ label: "Lafarge Africa Job Opportunities", url: "https://careers.holcimgroup.com/lafarge_nigeria/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "julius-berger-nigeria-careers",
    title: "Julius Berger Nigeria Careers",
    organization: "Julius Berger Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official jobs route",
    summary: "Julius Berger's official website links job seekers to its careers and job listings for engineering, construction and project roles.",
    location: "Nigeria / international",
    employmentType: "Construction, civil engineering and project careers",
    audiences: ["Civil engineers", "Construction professionals", "Project professionals", "Technical specialists"],
    fields: ["Civil Engineering", "Construction", "Project Management", "Infrastructure", "Technical Services"],
    qualifications: ["Requirements vary by the Julius Berger role and work location."],
    requirements: ["Start from Julius Berger's official website.", "Confirm that the selected job is based in Nigeria or otherwise matches your work-authorisation situation.", "Read technical and experience requirements before applying."],
    documents: ["CV/resume", "Professional and technical credentials required by the role"],
    applicationSteps: ["Open Julius Berger's official website.", "Follow the Jobs/Careers route.", "Select a relevant vacancy.", "Confirm location and requirements.", "Apply through the official system."],
    officialUrl: "https://www.julius-berger.com/",
    officialUrlLabel: "Open Julius Berger careers",
    verifiedAt: "2026-10-05",
    feeNote: "Verify the location and application route on Julius Berger's official site.",
    sourceNotes: ["Julius Berger's official site displays a Jobs section and current job links."],
    sources: [{ label: "Julius Berger", url: "https://www.julius-berger.com/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "schneider-electric-nigeria-careers",
    title: "Schneider Electric Nigeria Careers",
    organization: "Schneider Electric Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official Nigeria careers page",
    summary: "Schneider Electric's Nigeria careers page covers early-career and professional opportunities across engineering, services, sales, supply chain and digital functions.",
    location: "Nigeria / global",
    employmentType: "Energy management, engineering, digital and commercial careers",
    audiences: ["Students", "Graduates", "Engineers", "Digital professionals", "Experienced hires"],
    fields: ["Engineering", "Energy Management", "Digital", "Supply Chain", "Sales", "Services"],
    qualifications: ["Requirements vary by Schneider Electric opportunity."],
    requirements: ["Use Schneider Electric's official Nigeria careers page.", "Open a role and confirm its work location.", "Follow the official application and hiring process."],
    documents: ["CV/resume", "Education and experience details requested by the role"],
    applicationSteps: ["Open Schneider Electric Nigeria Careers.", "Search roles or early-career programmes.", "Confirm Nigeria eligibility and role requirements.", "Apply through Schneider Electric's official system."],
    officialUrl: "https://www.se.com/ng/en/about-us/careers/overview/",
    officialUrlLabel: "Open Schneider Electric Nigeria careers",
    verifiedAt: "2026-10-05",
    feeNote: "Use Schneider Electric's official careers platform.",
    sourceNotes: ["Schneider Electric's Nigeria page describes internships, apprenticeships, graduate jobs and professional career paths."],
    sources: [{ label: "Schneider Electric Nigeria Careers", url: "https://www.se.com/ng/en/about-us/careers/overview/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "ibom-air-careers",
    title: "Ibom Air Careers",
    organization: "Ibom Air",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official airline careers page",
    summary: "Ibom Air's official careers page covers flight deck, cabin crew, ground services and corporate career paths. An older flight-deck deadline remains visible, so it is not treated as a current vacancy here.",
    location: "Nigeria",
    employmentType: "Airline, aviation and corporate careers",
    audiences: ["Pilots", "Cabin crew applicants", "Ground operations applicants", "Corporate professionals"],
    fields: ["Aviation", "Flight Operations", "Cabin Services", "Ground Services", "Corporate"],
    qualifications: ["Requirements vary by Ibom Air role; pilot positions have licence and flight-hour requirements."],
    requirements: ["Use Ibom Air's official careers page.", "Check the deadline on the exact vacancy.", "Do not treat an older listed deadline as evidence that applications remain open."],
    documents: ["CV/resume", "Licences and professional credentials required by the role"],
    applicationSteps: ["Open Ibom Air Careers.", "Choose Flight Deck, Cabin Crew, Ground Services or Corporate.", "Confirm a current vacancy and deadline.", "Follow the official application instructions."],
    officialUrl: "https://www.ibomair.com/careers/",
    officialUrlLabel: "Open Ibom Air careers",
    verifiedAt: "2026-10-05",
    feeNote: "Confirm current application instructions on Ibom Air's official site.",
    sourceNotes: ["Ibom Air's careers page describes four career families but also displays an older 2025 deadline on a flight-deck listing, so MyNigeriaGuide does not mark it open."],
    sources: [{ label: "Ibom Air Careers", url: "https://www.ibomair.com/careers/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "air-peace-careers",
    title: "Air Peace Careers",
    organization: "Air Peace",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official airline careers page",
    summary: "Air Peace's official-domain careers page describes opportunities for pilots, engineers, ground operations and support staff and provides a job-openings area.",
    location: "Nigeria",
    employmentType: "Airline, engineering, operations and support careers",
    audiences: ["Graduates", "Pilots", "Aircraft engineers", "Ground operations applicants", "Corporate professionals"],
    fields: ["Aviation", "Engineering", "Ground Operations", "Flight Operations", "Corporate"],
    qualifications: ["Requirements vary by the Air Peace opening selected."],
    requirements: ["Use Air Peace's official-domain careers page.", "Confirm the exact vacancy and its status.", "Review role-specific aviation licences or experience where applicable."],
    documents: ["CV/resume", "Role-specific licences and credentials"],
    applicationSteps: ["Open Air Peace Careers.", "Review Job Openings.", "Select the relevant position.", "Verify requirements and application instructions.", "Submit through the official route."],
    officialUrl: "https://backup.flyairpeace.com/careers/",
    officialUrlLabel: "Open Air Peace careers",
    verifiedAt: "2026-10-05",
    feeNote: "Use only Air Peace's official domain for recruitment instructions.",
    sourceNotes: ["The Air Peace careers page is hosted on an official flyairpeace.com subdomain and describes job openings and aviation career families."],
    sources: [{ label: "Air Peace Careers", url: "https://backup.flyairpeace.com/careers/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "dhl-nigeria-careers",
    title: "DHL Careers for Nigeria Applicants",
    organization: "DHL",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers portal",
    summary: "DHL's official careers portal covers frontline, office, student and graduate opportunities across its global logistics network, including location-based job searches.",
    location: "Nigeria / global",
    employmentType: "Logistics, supply chain, operations and corporate careers",
    audiences: ["Graduates", "Logistics professionals", "Operations applicants", "Corporate professionals"],
    fields: ["Logistics", "Supply Chain", "Operations", "Warehousing", "Customer Service", "Corporate"],
    qualifications: ["Requirements depend on the DHL vacancy and location."],
    requirements: ["Use DHL's official careers portal.", "Filter for Nigeria or the intended location.", "Confirm work-authorisation and role requirements before applying."],
    documents: ["CV/resume", "Application details requested by the selected vacancy"],
    applicationSteps: ["Open DHL Careers.", "Search jobs by role and location.", "Select a Nigeria-relevant vacancy.", "Review requirements.", "Apply through the official DHL system."],
    officialUrl: "https://careers.dhl.com/",
    officialUrlLabel: "Search DHL careers",
    verifiedAt: "2026-10-05",
    feeNote: "Apply through DHL's official careers platform.",
    sourceNotes: ["DHL's official careers site provides frontline, office, student and graduate job routes."],
    sources: [{ label: "DHL Careers", url: "https://careers.dhl.com/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "maersk-nigeria-careers",
    title: "Maersk Careers for Nigeria Applicants",
    organization: "Maersk",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers portal",
    summary: "Maersk's official careers site covers professional, seafarer, warehouse, transportation, student and graduate roles with a searchable vacancies system.",
    location: "Nigeria / global",
    employmentType: "Shipping, logistics, supply chain and corporate careers",
    audiences: ["Graduates", "Logistics professionals", "Seafarers", "Warehouse and transport professionals"],
    fields: ["Shipping", "Logistics", "Supply Chain", "Warehousing", "Transportation", "Corporate"],
    qualifications: ["Requirements depend on the Maersk role and work location."],
    requirements: ["Search current Maersk vacancies.", "Confirm the role location and right-to-work requirements.", "Apply only through the official careers site."],
    documents: ["CV/resume", "Professional or seafarer credentials required by the role"],
    applicationSteps: ["Open Maersk Careers.", "Search current vacancies.", "Filter or inspect the role location.", "Review requirements.", "Submit through Maersk's official application process."],
    officialUrl: "https://www.maersk.com/careers/our-teams",
    officialUrlLabel: "Open Maersk careers",
    verifiedAt: "2026-10-05",
    feeNote: "Maersk says current vacancies are listed on its careers site and it does not accept speculative applications.",
    sourceNotes: ["Maersk's official careers pages describe its job families and direct applicants to current vacancies."],
    sources: [
      { label: "Maersk Careers — Our Teams", url: "https://www.maersk.com/careers/our-teams", lastChecked: "2026-10-05" },
      { label: "Maersk Careers FAQ", url: "https://www.maersk.com/careers/faqs", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "ihs-towers-careers",
    title: "IHS Towers Careers",
    organization: "IHS Towers",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official vacancies portal",
    summary: "IHS Towers maintains an official vacancies portal plus early-career programmes for applicants interested in telecom infrastructure, engineering, technology and corporate roles.",
    location: "Nigeria / Africa",
    employmentType: "Telecom infrastructure, engineering and corporate careers",
    audiences: ["Graduates", "Engineers", "Technology professionals", "Experienced hires"],
    fields: ["Telecommunications", "Infrastructure", "Engineering", "Technology", "Finance", "Operations"],
    qualifications: ["Requirements vary by IHS Towers vacancy or early-career programme."],
    requirements: ["Use IHS Towers' official vacancies section.", "Confirm the country and role requirements.", "Submit through the careers portal."],
    documents: ["CV/resume", "Education and experience details requested by the vacancy"],
    applicationSteps: ["Open IHS Towers Vacancies.", "Search the current career portal.", "Select a suitable role.", "Confirm location and eligibility.", "Apply through the official portal."],
    officialUrl: "https://www.ihstowers.com/join-us/vacancies",
    officialUrlLabel: "Open IHS Towers vacancies",
    verifiedAt: "2026-10-05",
    feeNote: "IHS Towers directs applicants to its Careers portal in the Vacancies section.",
    sourceNotes: ["IHS Towers publishes official vacancies, career FAQs and early-career programme information."],
    sources: [
      { label: "IHS Towers Vacancies", url: "https://www.ihstowers.com/join-us/vacancies", lastChecked: "2026-10-05" },
      { label: "IHS Towers Early Careers", url: "https://www.ihstowers.com/join-us/life-at-ihs-towers/early-careers", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "coca-cola-hbc-nigeria-careers",
    title: "Coca-Cola HBC Nigeria Careers",
    organization: "Coca-Cola HBC Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official Nigeria careers page",
    summary: "Coca-Cola HBC Nigeria's official Working With Us page includes a role search and covers career development across the bottling business.",
    location: "Nigeria",
    employmentType: "FMCG, manufacturing, commercial and corporate careers",
    audiences: ["Graduates", "Manufacturing professionals", "Commercial professionals", "Supply-chain professionals"],
    fields: ["FMCG", "Manufacturing", "Supply Chain", "Sales", "Marketing", "Finance"],
    qualifications: ["Requirements vary by the Coca-Cola HBC Nigeria role selected."],
    requirements: ["Use the official Nigeria Working With Us page.", "Search for a role and confirm its location.", "Read vacancy-specific criteria before applying."],
    documents: ["CV/resume", "Application information requested by the selected role"],
    applicationSteps: ["Open Coca-Cola HBC Nigeria's Working With Us page.", "Use Find a role.", "Choose a relevant vacancy.", "Confirm eligibility and location.", "Submit through the official careers system."],
    officialUrl: "https://ng.coca-colahellenic.com/en/working-with-us",
    officialUrlLabel: "Open Coca-Cola HBC Nigeria careers",
    verifiedAt: "2026-10-05",
    feeNote: "Use Coca-Cola HBC Nigeria's official role search.",
    sourceNotes: ["The official Nigeria careers page includes a Find a role search for applicants."],
    sources: [{ label: "Coca-Cola HBC Nigeria — Working With Us", url: "https://ng.coca-colahellenic.com/en/working-with-us", lastChecked: "2026-10-05" }]
  },
  {
    slug: "emzor-careers",
    title: "Emzor Pharmaceutical Careers",
    organization: "Emzor Pharmaceutical Industries",
    sector: "Private",
    status: "open",
    statusLabel: "Current openings section",
    summary: "Emzor's official website has a current openings section and an employment disclaimer warning applicants to ignore recruitment messages not originating from its official channels.",
    location: "Nigeria",
    employmentType: "Pharmaceutical, manufacturing, science and corporate careers",
    audiences: ["Pharmacists", "Scientists", "Engineers", "Finance professionals", "Sales professionals", "Graduates"],
    fields: ["Pharmaceuticals", "Manufacturing", "Research and Development", "Quality", "Finance", "Sales"],
    qualifications: ["Requirements vary by the Emzor opening selected."],
    requirements: ["Use Emzor's official vacancies pages.", "Check the exact role's qualification and location.", "Do not pay any recruitment fee."],
    documents: ["CV/resume", "Academic and professional credentials required by the role"],
    applicationSteps: ["Open Emzor's official vacancies area.", "Review current openings.", "Select the role and check its requirements.", "Apply using the route specified by Emzor."],
    officialUrl: "https://www.emzorpharma.com/vacancies/",
    officialUrlLabel: "View Emzor current openings",
    verifiedAt: "2026-10-05",
    nextMilestone: "Emzor's site displayed a Current openings section when checked; confirm the individual role before applying.",
    feeNote: "Emzor states that it does not request payment at any stage of recruitment.",
    sourceNotes: ["Emzor's official site contains current-opening functionality and a recruitment-fraud disclaimer."],
    sources: [
      { label: "Emzor Vacancies and Recruitment Disclaimer", url: "https://www.emzorpharma.com/vacancies/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "british-council-nigeria-careers",
    title: "British Council Nigeria Careers",
    organization: "British Council Nigeria",
    sector: "International",
    status: "career-page",
    statusLabel: "Official Nigeria jobs page",
    summary: "British Council Nigeria maintains an official job-opportunities page that directs applicants to its global careers system for current vacancies.",
    location: "Nigeria",
    employmentType: "Education, cultural relations, exams, programmes and corporate careers",
    audiences: ["Programme professionals", "Education professionals", "Graduates", "Corporate professionals"],
    fields: ["Education", "Cultural Relations", "Programmes", "Exams", "Operations", "Corporate Services"],
    qualifications: ["Requirements depend on the British Council vacancy selected."],
    requirements: ["Start from British Council Nigeria's official jobs page.", "Use the linked careers system for current vacancies.", "Verify any job offer directly because the organisation warns about recruitment scams."],
    documents: ["CV/profile information and documents requested by the vacancy"],
    applicationSteps: ["Open British Council Nigeria Job Opportunities.", "Follow the official careers link.", "Search current vacancies.", "Open the role and confirm requirements.", "Apply through the official careers system."],
    officialUrl: "https://www.britishcouncil.org.ng/about/jobs",
    officialUrlLabel: "Open British Council Nigeria jobs",
    verifiedAt: "2026-10-05",
    feeNote: "British Council says it will never ask for payment as part of recruitment.",
    sourceNotes: ["British Council Nigeria's jobs page links applicants to current vacancies and the organisation publishes a fake-job warning."],
    sources: [
      { label: "British Council Nigeria Job Opportunities", url: "https://www.britishcouncil.org.ng/about/jobs", lastChecked: "2026-10-05" },
      { label: "British Council Nigeria Fake Job Alert", url: "https://www.britishcouncil.org.ng/fake-job-alert", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "wfp-nigeria-careers",
    title: "World Food Programme Careers for Nigeria",
    organization: "World Food Programme",
    sector: "International",
    status: "career-page",
    statusLabel: "Official humanitarian careers",
    summary: "WFP's official careers system covers international, national professional, consultancy, internship and other humanitarian job routes, while WFP maintains active operations in Nigeria.",
    location: "Nigeria / international",
    employmentType: "Humanitarian, development, programme and operations careers",
    audiences: ["Humanitarian professionals", "Graduates", "Programme professionals", "Logistics professionals", "Nutrition professionals"],
    fields: ["Humanitarian", "Food Security", "Nutrition", "Logistics", "Programme Management", "Operations"],
    qualifications: ["Requirements depend on the WFP contract type and vacancy; national professional roles have country-nationality rules."],
    requirements: ["Use WFP's official careers site.", "Search for Nigeria or relevant location-flexible roles.", "Confirm contract type, nationality rules and duty station.", "Never pay a recruitment fee."],
    documents: ["Application profile and supporting information requested by WFP"],
    applicationSteps: ["Open WFP Careers.", "Search current positions.", "Filter by Nigeria or relevant criteria.", "Review contract and eligibility rules.", "Submit through WFP's official system."],
    officialUrl: "https://www.wfp.org/careers",
    officialUrlLabel: "Open WFP careers",
    verifiedAt: "2026-10-05",
    feeNote: "WFP states that it does not charge a fee at any stage of recruitment.",
    sourceNotes: ["WFP has active Nigeria operations and an official careers platform covering multiple contract types."],
    sources: [
      { label: "WFP Careers", url: "https://www.wfp.org/careers", lastChecked: "2026-10-05" },
      { label: "WFP Nigeria", url: "https://www.wfp.org/countries/Nigeria", lastChecked: "2026-10-05" },
      { label: "WFP Fraudulent Job Offers", url: "https://www.wfp.org/careers/fraudulent-job-offers", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "plan-international-nigeria-careers",
    title: "Plan International Careers for Nigeria",
    organization: "Plan International",
    sector: "International",
    status: "career-page",
    statusLabel: "Official NGO jobs portal",
    summary: "Plan International's official jobs portal supports keyword and region searches, and its location-flexible Global Hub roles can include Nigeria where the employing office can hire.",
    location: "Nigeria / international",
    employmentType: "Development, humanitarian and NGO careers",
    audiences: ["Development professionals", "Humanitarian professionals", "Graduates", "Programme professionals"],
    fields: ["International Development", "Humanitarian Response", "Programme Management", "Monitoring and Evaluation", "Operations"],
    qualifications: ["Requirements vary by Plan International vacancy and employing office."],
    requirements: ["Use Plan International's official jobs portal.", "Confirm Nigeria is an eligible employing location for flexible roles.", "Read work-authorisation and role-specific requirements."],
    documents: ["Application profile and role-specific documents"],
    applicationSteps: ["Open Plan International Jobs.", "Search by keyword or region.", "Open the vacancy.", "Confirm Nigeria/location eligibility.", "Apply through the official jobs portal."],
    officialUrl: "https://jobs.plan-international.org/",
    officialUrlLabel: "Search Plan International jobs",
    verifiedAt: "2026-10-05",
    feeNote: "Plan International says it will never send unsolicited emails requesting payment from candidates.",
    sourceNotes: ["Plan International's official jobs portal is searchable and its Global Hub location-flexible pages list Nigeria among eligible locations for some roles."],
    sources: [
      { label: "Plan International Jobs", url: "https://jobs.plan-international.org/?locale=en_GB", lastChecked: "2026-10-05" },
      { label: "Plan International Global Hub — Location Flexible", url: "https://jobs.plan-international.org/go/Global-Hub-Location-Flexible/5498701/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "fhi360-nigeria-careers",
    title: "FHI 360 Nigeria Careers",
    organization: "FHI 360",
    sector: "International",
    status: "career-page",
    statusLabel: "Official careers system",
    summary: "FHI 360's official career system regularly publishes Nigeria-based technical, health, programme, finance and operations vacancies; individual deadlines must be checked on the live role.",
    location: "Nigeria",
    employmentType: "Development, public health, technical and operations careers",
    audiences: ["Public-health professionals", "Development professionals", "Technology professionals", "Finance professionals", "Operations professionals"],
    fields: ["Public Health", "Development", "Technology", "Monitoring and Evaluation", "Finance", "Operations"],
    qualifications: ["Requirements vary by FHI 360 vacancy."],
    requirements: ["Use FHI 360's official Workday careers system.", "Open a current Nigeria role rather than an expired search result.", "Confirm duty station and deadline on the live vacancy."],
    documents: ["Application profile", "CV/resume and supporting information requested by the vacancy"],
    applicationSteps: ["Open FHI 360's official careers system.", "Search Nigeria.", "Choose a currently active vacancy.", "Review qualifications and deadline.", "Apply through Workday."],
    officialUrl: "https://fhi.wd1.myworkdayjobs.com/FHI_360_External_Career_Portal",
    officialUrlLabel: "Search FHI 360 careers",
    verifiedAt: "2026-10-05",
    feeNote: "Use FHI 360's official Workday careers portal and verify the live deadline.",
    sourceNotes: ["FHI 360's official careers system contains Nigeria-labelled roles; older indexed vacancy pages may already be closed, so MyNigeriaGuide uses the careers route rather than marking a stale role open."],
    sources: [{ label: "FHI 360 External Career Portal", url: "https://fhi.wd1.myworkdayjobs.com/FHI_360_External_Career_Portal", lastChecked: "2026-10-05" }]
  },
  {
    slug: "faan-careers",
    title: "FAAN Careers",
    organization: "Federal Airports Authority of Nigeria",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official careers guidance",
    summary: "FAAN maintains an official careers page for airport, aviation, engineering and public-sector opportunities. It stated that it was not recruiting when checked on 5 October 2026.",
    location: "Nigeria",
    employmentType: "Airport, aviation, engineering and public-sector careers",
    audiences: ["Graduates", "Engineers", "Aviation professionals", "Administrative professionals"],
    fields: ["Aviation", "Airport Operations", "Engineering", "Safety", "ICT", "Administration"],
    qualifications: ["Requirements depend on any future FAAN vacancy notice."],
    requirements: ["Check FAAN's official careers page for current recruitment status.", "Verify any vacancy notice on FAAN's official domain.", "Do not pay a third party for recruitment access."],
    documents: ["Documents will be specified by the official vacancy notice when recruitment opens."],
    applicationSteps: ["Open FAAN's official careers page.", "Confirm whether recruitment is active.", "Read the vacancy requirements if an exercise is announced.", "Apply only through the route published by FAAN."],
    officialUrl: "https://faan.gov.ng/careers/",
    officialUrlLabel: "Open FAAN careers",
    verifiedAt: "2026-10-05",
    nextMilestone: "FAAN's official careers page stated that the Authority was not recruiting when checked.",
    feeNote: "Use only recruitment instructions published by FAAN.",
    sourceNotes: ["FAAN's official careers page explicitly stated that it was not recruiting when reviewed on 5 October 2026."],
    sources: [{ label: "FAAN Careers", url: "https://faan.gov.ng/careers/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "nuprc-careers",
    title: "NUPRC Careers",
    organization: "Nigerian Upstream Petroleum Regulatory Commission",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official recruitment guidance",
    summary: "NUPRC published an official August 2026 notice warning applicants about fraudulent recruitment claims and stated that no recruitment exercise was ongoing at that time.",
    location: "Nigeria",
    employmentType: "Petroleum regulation, engineering, economics and public-sector careers",
    audiences: ["Engineers", "Geoscientists", "Economists", "Legal professionals", "Graduates"],
    fields: ["Petroleum Regulation", "Engineering", "Geoscience", "Economics", "Law", "ICT"],
    qualifications: ["Requirements will depend on a future official NUPRC recruitment notice."],
    requirements: ["Verify recruitment announcements on NUPRC's official website.", "Ignore unsolicited recruitment forms that NUPRC has not published.", "Do not pay for a shortlist or appointment."],
    documents: ["Future official notices will specify required documents."],
    applicationSteps: ["Open NUPRC's official website.", "Check official news and recruitment notices.", "Confirm a recruitment exercise is genuinely active.", "Follow only the application route published by NUPRC."],
    officialUrl: "https://www.nuprc.gov.ng/",
    officialUrlLabel: "Open NUPRC official website",
    verifiedAt: "2026-10-05",
    nextMilestone: "NUPRC said in August 2026 that no recruitment exercise was ongoing; monitor official notices for any later exercise.",
    feeNote: "NUPRC has warned the public about fraudulent recruitment claims.",
    sourceNotes: ["NUPRC's official 11 August 2026 notice stated that it was not conducting a recruitment exercise and warned against fraudulent portals."],
    sources: [{ label: "NUPRC Official Website", url: "https://www.nuprc.gov.ng/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "cbn-careers",
    title: "Central Bank of Nigeria Careers",
    organization: "Central Bank of Nigeria",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official HR guidance",
    summary: "CBN's official Human Resources guidance explains that recruitment is conducted as organisational needs arise and identifies disciplines relevant to the Bank's work.",
    location: "Nigeria",
    employmentType: "Central banking, economics, finance, technology and public-sector careers",
    audiences: ["Graduates", "Economists", "Finance professionals", "Technology professionals", "Legal professionals"],
    fields: ["Economics", "Banking", "Finance", "Accounting", "Statistics", "Law", "ICT"],
    qualifications: ["Requirements vary by any recruitment exercise announced by the Central Bank of Nigeria."],
    requirements: ["Use CBN's official website for recruitment information.", "Confirm that a recruitment exercise is currently active.", "Check the vacancy-specific education and experience requirements."],
    documents: ["Documents will be specified in an official CBN recruitment notice."],
    applicationSteps: ["Open CBN's official Human Resources or recruitment information.", "Confirm that applications are being accepted.", "Read the exact eligibility criteria.", "Submit only through the official route announced by CBN."],
    officialUrl: "https://www.cbn.gov.ng/faqs/",
    officialUrlLabel: "Read CBN employment guidance",
    verifiedAt: "2026-10-05",
    nextMilestone: "CBN says recruitment is carried out as needs arise; its HR FAQ did not present a standing open recruitment exercise when checked.",
    feeNote: "Verify any recruitment instruction directly on the Central Bank of Nigeria's official domain.",
    sourceNotes: ["CBN's HR FAQ explains that recruitment is need-driven and lists professional disciplines relevant to its workforce."],
    sources: [{ label: "CBN Human Resources FAQ", url: "https://www.cbn.gov.ng/faqs/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "lagos-tescom-careers",
    title: "Lagos State TESCOM Recruitment",
    organization: "Lagos State Teaching Service Commission",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official recruitment portal",
    summary: "Lagos State TESCOM maintains an official recruitment portal for secondary-school teaching and related education-service appointments.",
    location: "Lagos State",
    employmentType: "Teaching and education public-service careers",
    audiences: ["Teachers", "Education graduates", "School professionals", "Public-service applicants"],
    fields: ["Education", "Teaching", "School Administration", "Public Service"],
    qualifications: ["Requirements vary by TESCOM recruitment exercise and teaching subject."],
    requirements: ["Use the official Lagos TESCOM recruitment portal.", "Confirm a current exercise is open before creating an application.", "Meet the subject, qualification and professional-registration requirements stated by TESCOM."],
    documents: ["Academic credentials", "NYSC status where required", "Teaching/professional credentials requested by the exercise"],
    applicationSteps: ["Open the Lagos TESCOM jobs portal.", "Check whether a current recruitment exercise is accepting applications.", "Register or sign in if applications are active.", "Complete the role-specific application through the official portal."],
    officialUrl: "https://tescomjobs.lagosstate.gov.ng/",
    officialUrlLabel: "Open Lagos TESCOM jobs portal",
    verifiedAt: "2026-10-05",
    feeNote: "Use only the Lagos State TESCOM recruitment portal and official state notices.",
    sourceNotes: ["Lagos TESCOM operates a dedicated official recruitment portal with applicant registration and sign-in."],
    sources: [{ label: "Lagos State TESCOM Jobs Portal", url: "https://tescomjobs.lagosstate.gov.ng/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "sec-nigeria-careers",
    title: "SEC Nigeria Careers",
    organization: "Securities and Exchange Commission Nigeria",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Nigeria's Securities and Exchange Commission maintains official careers information for capital-market regulation, finance, law, economics, technology and corporate functions.",
    location: "Nigeria",
    employmentType: "Capital-markets regulation and public-sector careers",
    audiences: ["Finance professionals", "Lawyers", "Economists", "Accountants", "Technology professionals", "Graduates"],
    fields: ["Capital Markets", "Finance", "Law", "Economics", "Accounting", "ICT"],
    qualifications: ["Requirements depend on the SEC recruitment exercise and position."],
    requirements: ["Start from SEC Nigeria's official careers pages.", "Confirm a current vacancy before applying.", "Read the exact qualification and experience requirements."],
    documents: ["Documents specified by the current SEC recruitment notice"],
    applicationSteps: ["Open SEC Nigeria's official careers information.", "Check current opportunities.", "Open the exact vacancy if one is active.", "Apply only through the official SEC route."],
    officialUrl: "https://home.sec.gov.ng/about/careers/",
    officialUrlLabel: "Open SEC Nigeria careers",
    verifiedAt: "2026-10-05",
    feeNote: "Verify recruitment information on SEC Nigeria's official domain.",
    sourceNotes: ["SEC Nigeria maintains official careers and working-with-us information for prospective employees."],
    sources: [{ label: "SEC Nigeria Careers", url: "https://home.sec.gov.ng/about/careers/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "nitda-careers",
    title: "NITDA Careers",
    organization: "National Information Technology Development Agency",
    sector: "Government",
    status: "career-page",
    statusLabel: "Official recruitment guidance",
    summary: "NITDA publishes official recruitment and vacancy information on its website. Its current guidance did not show an active general recruitment exercise when checked on 5 October 2026.",
    location: "Nigeria",
    employmentType: "Technology, digital policy and public-sector careers",
    audiences: ["Technology professionals", "Graduates", "Policy professionals", "Cybersecurity professionals"],
    fields: ["Information Technology", "Digital Policy", "Cybersecurity", "Data", "Administration"],
    qualifications: ["Requirements depend on the NITDA vacancy or recruitment exercise."],
    requirements: ["Use NITDA's official website for recruitment information.", "Confirm any advertised vacancy is current.", "Do not rely on unofficial recruitment websites or social posts."],
    documents: ["Documents specified in an official NITDA vacancy notice"],
    applicationSteps: ["Open NITDA's official website.", "Check career, vacancy or disclaimer notices.", "Confirm a current application route.", "Apply only through the official process."],
    officialUrl: "https://nitda.gov.ng/disclaimer/",
    officialUrlLabel: "Check NITDA recruitment guidance",
    verifiedAt: "2026-10-05",
    nextMilestone: "No current general recruitment exercise was identified on the official guidance checked.",
    feeNote: "Use NITDA's official domain to verify recruitment claims.",
    sourceNotes: ["NITDA's official site publishes recruitment-related disclaimers and vacancy guidance."],
    sources: [{ label: "NITDA Recruitment Guidance", url: "https://nitda.gov.ng/disclaimer/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "seven-up-careers",
    title: "Seven-Up Bottling Company Careers",
    organization: "Seven-Up Bottling Company",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers page",
    summary: "Seven-Up Bottling Company maintains an official careers page with a Current Openings section for FMCG, manufacturing, commercial, engineering and corporate roles.",
    location: "Nigeria",
    employmentType: "FMCG, manufacturing, engineering and commercial careers",
    audiences: ["Graduates", "Engineers", "Manufacturing professionals", "Sales professionals", "Corporate professionals"],
    fields: ["FMCG", "Manufacturing", "Engineering", "Sales", "Supply Chain", "Finance"],
    qualifications: ["Requirements vary by the Seven-Up opening selected."],
    requirements: ["Use Seven-Up's official careers page.", "Open the Current Openings section.", "Confirm the exact vacancy's location and qualification requirements."],
    documents: ["CV/resume", "Academic and professional details requested by the vacancy"],
    applicationSteps: ["Open Seven-Up Careers.", "Review Current Openings.", "Select a relevant role.", "Read eligibility and location requirements.", "Apply through the official route."],
    officialUrl: "https://www.sevenup.org/career/",
    officialUrlLabel: "Open Seven-Up careers",
    verifiedAt: "2026-10-05",
    feeNote: "Use Seven-Up Bottling Company's official careers page for recruitment.",
    sourceNotes: ["Seven-Up's official careers page includes a Current Openings section."],
    sources: [{ label: "Seven-Up Careers", url: "https://www.sevenup.org/career/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "frieslandcampina-wamco-careers",
    title: "FrieslandCampina WAMCO Nigeria Careers",
    organization: "FrieslandCampina WAMCO Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official Nigeria careers page",
    summary: "FrieslandCampina maintains a Nigeria careers page for WAMCO opportunities across dairy manufacturing, engineering, supply chain, commercial and corporate functions.",
    location: "Nigeria",
    employmentType: "Dairy, FMCG, manufacturing and corporate careers",
    audiences: ["Graduates", "Engineers", "Manufacturing professionals", "Supply-chain professionals", "Commercial professionals"],
    fields: ["FMCG", "Dairy", "Manufacturing", "Engineering", "Supply Chain", "Sales"],
    qualifications: ["Requirements depend on the FrieslandCampina WAMCO opportunity."],
    requirements: ["Use FrieslandCampina's official Nigeria careers page.", "Confirm the role location and requirements.", "Follow the official application process."],
    documents: ["CV/resume", "Application information requested by the selected role"],
    applicationSteps: ["Open FrieslandCampina WAMCO Careers.", "Search or browse available roles.", "Choose a Nigeria-relevant position.", "Review the exact requirements.", "Apply through the official careers system."],
    officialUrl: "https://careers.frieslandcampina.com/nga/en/page/were-frieslandcampina-wamco",
    officialUrlLabel: "Open FrieslandCampina WAMCO careers",
    verifiedAt: "2026-10-05",
    feeNote: "Use FrieslandCampina's official careers platform.",
    sourceNotes: ["FrieslandCampina provides an official Nigeria/WAMCO careers page within its global careers site."],
    sources: [{ label: "FrieslandCampina WAMCO Careers", url: "https://careers.frieslandcampina.com/nga/en/page/were-frieslandcampina-wamco", lastChecked: "2026-10-05" }]
  },
  {
    slug: "microsoft-nigeria-internships",
    title: "Microsoft Internships for Nigeria",
    organization: "Microsoft Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official internship eligibility",
    summary: "Microsoft's official internship eligibility page identifies Nigeria-specific internship eligibility for student engineering and MCAPS pathways, subject to current role availability.",
    location: "Nigeria",
    employmentType: "Technology internships and early careers",
    audiences: ["University students", "Engineering students", "Technology students", "Business students"],
    fields: ["Software Engineering", "Technology", "Sales", "Customer Success", "Cloud", "Business"],
    qualifications: ["Eligibility varies by internship path; Microsoft publishes country-specific Nigeria criteria on its official internship eligibility page."],
    requirements: ["Check Microsoft's Nigeria internship eligibility.", "Search the live careers catalogue for a current Nigeria internship.", "Meet student-status and right-to-work requirements for the selected pathway."],
    documents: ["CV/resume", "Education information", "Application details requested by Microsoft"],
    applicationSteps: ["Open Microsoft's internship eligibility page.", "Review the Nigeria criteria.", "Search Microsoft Careers for a current Nigeria internship.", "Open the exact role and confirm eligibility.", "Apply through Microsoft Careers."],
    officialUrl: "https://careers.microsoft.com/v2/global/en/internship_eligibility",
    officialUrlLabel: "Check Microsoft Nigeria internship eligibility",
    verifiedAt: "2026-10-05",
    feeNote: "Use Microsoft's official careers platform for applications.",
    sourceNotes: ["Microsoft's official internship eligibility page includes Nigeria-specific student-engineering and MCAPS eligibility information."],
    sources: [{ label: "Microsoft Internship Eligibility", url: "https://careers.microsoft.com/v2/global/en/internship_eligibility", lastChecked: "2026-10-05" }]
  },
  {
    slug: "ericsson-nigeria-careers",
    title: "Ericsson Nigeria Careers",
    organization: "Ericsson Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers portal",
    summary: "Ericsson's official jobs system publishes Lagos and Nigeria-labelled telecom, engineering, technology and commercial roles; individual listings can close quickly.",
    location: "Lagos / Nigeria",
    employmentType: "Telecom, engineering, technology and commercial careers",
    audiences: ["Engineers", "Technology professionals", "Graduates", "Commercial professionals"],
    fields: ["Telecommunications", "Networks", "Engineering", "Technology", "Sales", "Project Management"],
    qualifications: ["Requirements vary by the Ericsson Nigeria vacancy."],
    requirements: ["Use Ericsson's official careers portal.", "Search for Nigeria or Lagos.", "Confirm the exact job is still accepting applications before applying."],
    documents: ["CV/resume", "Education and experience information requested by the role"],
    applicationSteps: ["Open Ericsson Careers.", "Search Nigeria or Lagos.", "Select an active role.", "Review qualifications and location.", "Apply through Ericsson's official system."],
    officialUrl: "https://jobs.ericsson.com/careers",
    officialUrlLabel: "Search Ericsson careers",
    verifiedAt: "2026-10-05",
    feeNote: "Apply only through Ericsson's official careers system.",
    sourceNotes: ["Ericsson's official careers platform has published Nigeria/Lagos roles; older indexed listings may already be closed, so this page does not claim a specific vacancy is currently open."],
    sources: [{ label: "Ericsson Careers", url: "https://jobs.ericsson.com/careers", lastChecked: "2026-10-05" }]
  },
  {
    slug: "huawei-nigeria-careers",
    title: "Huawei Careers for Nigeria Applicants",
    organization: "Huawei Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official global careers route",
    summary: "Huawei's official careers platform covers research, engineering, product, sales, service and corporate job families and supports location-based opportunity searches relevant to Nigeria applicants.",
    location: "Nigeria / global",
    employmentType: "Telecom, engineering, technology and corporate careers",
    audiences: ["Engineers", "Technology professionals", "Graduates", "Commercial professionals"],
    fields: ["Telecommunications", "Engineering", "Research", "Technology", "Sales", "Services"],
    qualifications: ["Requirements depend on the Huawei role and location."],
    requirements: ["Use Huawei's official careers platform.", "Confirm that the role location and work-authorisation requirements match your situation.", "Read the exact vacancy criteria before applying."],
    documents: ["CV/resume", "Application information requested by Huawei"],
    applicationSteps: ["Open Huawei Careers.", "Search by role and location.", "Choose a Nigeria-relevant opportunity if available.", "Review eligibility and location.", "Apply through Huawei's official system."],
    officialUrl: "https://career.huawei.com/en/",
    officialUrlLabel: "Open Huawei careers",
    verifiedAt: "2026-10-05",
    feeNote: "Use Huawei's official careers platform rather than third-party application forms.",
    sourceNotes: ["Huawei maintains a global official careers platform and Nigerian official web properties link to company Join Us resources."],
    sources: [{ label: "Huawei Careers", url: "https://career.huawei.com/en/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "eha-clinics-careers",
    title: "EHA Clinics Careers",
    organization: "EHA Clinics",
    sector: "Private",
    status: "open",
    statusLabel: "Current jobs listed",
    summary: "EHA Clinics' official careers system showed multiple current Nigeria roles when checked on 5 October 2026 across clinical, operations, people and support functions.",
    location: "Nigeria",
    employmentType: "Healthcare, clinical, operations and corporate careers",
    audiences: ["Doctors", "Nurses", "Healthcare professionals", "Operations professionals", "Corporate professionals"],
    fields: ["Healthcare", "Medicine", "Nursing", "Operations", "People Operations", "Administration"],
    qualifications: ["Requirements depend on the EHA Clinics position selected."],
    requirements: ["Use EHA Clinics' official jobs page.", "Open the exact role and confirm its location and professional requirements.", "Apply through EHA's official recruitment system."],
    documents: ["CV/resume", "Professional licences or credentials required by the role", "Application information requested by EHA"],
    applicationSteps: ["Open EHA Clinics Jobs.", "Choose a current vacancy.", "Review professional and location requirements.", "Complete the official online application."],
    officialUrl: "https://erp.eha.ng/jobs",
    officialUrlLabel: "View EHA Clinics jobs",
    verifiedAt: "2026-10-05",
    nextMilestone: "The official jobs page displayed multiple live Nigeria openings when checked.",
    feeNote: "Use EHA Clinics' official careers system for applications.",
    sourceNotes: ["EHA Clinics' official jobs page displayed current vacancies, including newly posted roles on 5 October 2026."],
    sources: [
      { label: "EHA Clinics Jobs", url: "https://erp.eha.ng/jobs", lastChecked: "2026-10-05" },
      { label: "EHA Clinics Careers", url: "https://eha.ng/careers/", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "may-baker-consumer-healthcare-executive-2026",
    title: "May & Baker Consumer Healthcare Executive 2026",
    organization: "May & Baker Nigeria Plc",
    kind: "vacancy",
    sector: "Private",
    status: "open",
    statusLabel: "Applications open",
    summary: "May & Baker Nigeria is recruiting Consumer Healthcare Executives across Lagos and several multi-state territories. The company published the vacancy on 23 September 2026 and set 7 October 2026 as the application deadline.",
    location: "Lagos; Edo/Delta; Kogi/Benue; Sokoto/Zamfara/Katsina; Osun/Ekiti/Ondo; Calabar/Akwa Ibom/Abia",
    employmentType: "Full-time pharmaceutical / consumer healthcare sales",
    audiences: ["Consumer healthcare sales professionals", "Biological and applied science graduates", "Medical field sales professionals", "NYSC-completed applicants"],
    fields: ["Pharmaceuticals", "Consumer Healthcare", "Medical Sales", "Marketing"],
    qualifications: [
      "BSc in Biological or Applied Sciences.",
      "At least one year of medical field sales experience with a reputable company; May & Baker states that NYSC experience may be included.",
      "Applicants should be result-oriented and self-motivated, with good oral and written communication.",
      "Strong persuasion and presentation skills plus in-depth knowledge of Microsoft Office suites are required."
    ],
    requirements: [
      "Choose one of the territories listed in May & Baker's vacancy: Lagos; Edo/Delta; Kogi/Benue; Sokoto/Zamfara/Katsina; Osun/Ekiti/Ondo; or Calabar/Akwa Ibom/Abia.",
      "Be prepared to promote assigned consumer healthcare products in hospitals and key institutions and support prescription and supply growth.",
      "Complete May & Baker's online application form and upload the required CV.",
      "Submit by 7 October 2026."
    ],
    documents: [
      "CV/resume in an accepted upload format",
      "Contact and education details requested by May & Baker's application form",
      "Optional supporting document if relevant to the application"
    ],
    applicationSteps: [
      "Open May & Baker Nigeria's official careers page and locate the Consumer Healthcare Executive opening.",
      "Review the listed territory, BSc requirement and minimum medical field sales experience.",
      "Select Apply Now for the vacancy so the application form identifies the correct role.",
      "Complete the online form and upload your CV; add an optional supporting document only if useful.",
      "Submit before 7 October 2026 and retain the on-screen submission confirmation."
    ],
    officialUrl: "https://may-bakerng.com/career",
    officialUrlLabel: "Open May & Baker official careers page",
    verifiedAt: "2026-10-05",
    deadline: "2026-10-07",
    nextMilestone: "Applications close 7 October 2026.",
    feeNote: "Apply through May & Baker Nigeria's official careers form; MyNigeriaGuide does not collect or forward applications.",
    sourceNotes: [
      "May & Baker's official careers page lists Consumer Healthcare Executive as posted on 23 September 2026 and gives 7 October 2026 as the deadline.",
      "The employer lists a BSc in Biological or Applied Sciences and at least one year of medical field sales experience, with NYSC inclusive.",
      "The same official page provides the online application form, CV upload field and the territories covered by the vacancy."
    ],
    sources: [
      { label: "May & Baker Nigeria Careers", url: "https://may-bakerng.com/career", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "promasidor-nigeria-careers",
    title: "Promasidor Nigeria Careers",
    organization: "Promasidor Nigeria",
    sector: "Private",
    status: "career-page",
    statusLabel: "Official careers route",
    summary: "Promasidor Nigeria's official website provides company contact and career information for FMCG, manufacturing, supply chain, sales and corporate opportunities.",
    location: "Nigeria",
    employmentType: "FMCG, manufacturing and corporate careers",
    audiences: ["Graduates", "Manufacturing professionals", "Supply-chain professionals", "Commercial professionals"],
    fields: ["FMCG", "Manufacturing", "Supply Chain", "Sales", "Marketing", "Finance"],
    qualifications: ["Requirements depend on the Promasidor opportunity selected."],
    requirements: ["Use Promasidor Nigeria's official website to verify vacancies.", "Confirm any application channel is linked or stated by the company.", "Read role-specific requirements before applying."],
    documents: ["CV/resume", "Role-specific application information"],
    applicationSteps: ["Open Promasidor Nigeria's official website.", "Check career or recruitment information.", "Confirm a current vacancy.", "Apply only through the official route provided by the company."],
    officialUrl: "https://www.promasidor.ng/en/contact/",
    officialUrlLabel: "Open Promasidor Nigeria",
    verifiedAt: "2026-10-05",
    feeNote: "Verify recruitment channels through Promasidor Nigeria's official website.",
    sourceNotes: ["Promasidor Nigeria maintains official company contact and recruitment-related information on its Nigerian website."],
    sources: [{ label: "Promasidor Nigeria", url: "https://www.promasidor.ng/en/contact/", lastChecked: "2026-10-05" }]
  },
  {
    slug: "eha-medical-laboratory-scientist-abuja-2026",
    title: "EHA Clinics Medical Laboratory Scientist — Abuja",
    organization: "EHA Clinics",
    kind: "vacancy",
    posting: {
      jobTitle: "Medical Laboratory Scientist",
      datePosted: "2026-10-04",
      locations: [{ locality: "Abuja", region: "FCT", country: "NG" }]
    },
    sector: "Private",
    status: "open",
    statusLabel: "Applications open",
    summary: "EHA Clinics is recruiting a Medical Laboratory Scientist in Abuja through its official jobs portal.",
    location: "Abuja, FCT",
    employmentType: "Clinical laboratory role",
    audiences: ["Medical laboratory scientists", "Healthcare professionals", "NYSC-completed applicants"],
    fields: ["Medical Laboratory Science", "Healthcare", "Diagnostics", "Clinical Services"],
    qualifications: ["Bachelor's degree in Medical Laboratory Science.", "Valid and up-to-date professional practice licence.", "NYSC completion is required by the employer's eligibility check."],
    requirements: ["Basic computer knowledge.", "Meet EHA Clinics' professional-licence and NYSC eligibility checks.", "Review the live job page before applying because vacancy status can change."],
    documents: ["CV/resume", "Professional licence details", "Education and NYSC information requested in the application"],
    applicationSteps: ["Open EHA Clinics' official job page.", "Review the Medical Laboratory Scientist requirements.", "Complete the eligibility check.", "Continue to the official application flow."],
    officialUrl: "https://erp.eha.ng/jobs/medical-laboratory-scientist-abuja-649",
    officialUrlLabel: "Apply on EHA Clinics",
    verifiedAt: "2026-10-05",
    feeNote: "Apply only through EHA Clinics' official recruitment system.",
    sourceNotes: ["EHA Clinics' jobs index listed this Abuja role as posted on 4 October 2026.", "The official detail page includes an active Apply Now eligibility flow."],
    sources: [
      { label: "EHA Clinics — Medical Laboratory Scientist, Abuja", url: "https://erp.eha.ng/jobs/medical-laboratory-scientist-abuja-649", lastChecked: "2026-10-05" },
      { label: "EHA Clinics Jobs", url: "https://erp.eha.ng/jobs", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "eha-people-operations-coordinator-2026",
    title: "EHA Clinics People Operations Coordinator — Abuja / Kano",
    organization: "EHA Clinics",
    kind: "vacancy",
    posting: {
      jobTitle: "People Operations Coordinator",
      datePosted: "2026-10-05",
      locations: [
        { locality: "Abuja", region: "FCT", country: "NG" },
        { locality: "Kano", region: "Kano State", country: "NG" }
      ]
    },
    sector: "Private",
    status: "closed",
    statusLabel: "Vacancy no longer listed — check official careers board",
    summary: "The EHA Clinics People Operations Coordinator vacancy advertised for Abuja or Kano is no longer listed on the employer’s official careers board. The original vacancy URL now returns 404; use the live EHA jobs index to check for any new posting before applying.",
    location: "Abuja, FCT / Kano State",
    employmentType: "Human resources / people operations",
    audiences: ["HR professionals", "People operations professionals", "NYSC-completed applicants"],
    fields: ["Human Resources", "People Operations", "Administration", "Healthcare"],
    qualifications: ["Degree in Human Resources or a related field is part of EHA's eligibility check.", "Relevant people-operations capability is required by the role."],
    requirements: ["NYSC completion.", "Basic computer knowledge.", "Comfort with the listed work locations and employer eligibility checks."],
    documents: ["CV/resume", "Education and NYSC information requested by EHA Clinics"],
    applicationSteps: ["Open the official EHA Clinics careers board.", "Search its current vacancies for People Operations Coordinator rather than assuming the former advertisement is active.", "If EHA republishes the position, open the new employer-owned detail page and verify its requirements, locations and application dates.", "Apply only through the current employer application form; do not use an archived or third-party application link."],
    officialUrl: "https://erp.eha.ng/jobs",
    officialUrlLabel: "Check current vacancies on EHA Clinics",
    verifiedAt: "2026-10-09",
    feeNote: "EHA Clinics does not require payments through MyNigeriaGuide. The former role is no longer listed; check the employer board for new vacancies." ,
    sourceNotes: ["The official EHA Clinics jobs index originally listed People Operations Coordinator on 5 October 2026.", "On 9 October 2026, the old position detail route returned HTTP 404 and the employer’s live index no longer displayed this listing. Historical qualifications and locations are retained for context only; applications are not confirmed open."],
    sources: [
      { label: "EHA Clinics — current vacancies", url: "https://erp.eha.ng/jobs", lastChecked: "2026-10-09" }
    ]
  },
  {
    slug: "eha-senior-coordinator-talent-management-2026",
    title: "EHA Clinics Senior Coordinator, Talent Management",
    organization: "EHA Clinics",
    kind: "vacancy",
    posting: {
      jobTitle: "Senior Coordinator, Talent Management",
      datePosted: "2026-09-24",
      locations: [
        { locality: "Abuja", region: "FCT", country: "NG" },
        { locality: "Kano", region: "Kano State", country: "NG" },
        { locality: "Lagos", region: "Lagos State", country: "NG" }
      ]
    },
    sector: "Private",
    status: "open",
    statusLabel: "Applications open",
    summary: "EHA Clinics is recruiting a Senior Coordinator, Talent Management across Abuja, Kano and Lagos.",
    location: "Abuja / Kano / Lagos",
    employmentType: "Human resources / talent management",
    audiences: ["HR professionals", "Talent-management professionals", "Experienced hires"],
    fields: ["Human Resources", "Talent Management", "Learning and Development", "People Operations"],
    qualifications: ["Bachelor's degree in Human Resources, Business Administration or a related field.", "Two to four years of HR coordination experience with exposure to talent, performance management or learning and development."],
    requirements: ["NYSC completion.", "Talent-management knowledge.", "Basic computer skills and role-specific eligibility checks."],
    documents: ["CV/resume", "Education and experience details requested by EHA Clinics"],
    applicationSteps: ["Open the official EHA Clinics vacancy.", "Review the multi-city work arrangement and requirements.", "Complete the employer's eligibility check.", "Continue to the official application."],
    officialUrl: "https://erp.eha.ng/jobs/senior-coordinator-talent-management-941",
    officialUrlLabel: "Apply on EHA Clinics",
    verifiedAt: "2026-10-05",
    feeNote: "Apply through EHA Clinics' official recruitment system.",
    sourceNotes: ["EHA Clinics listed this vacancy as posted on 24 September 2026.", "The official role page identifies Abuja, Kano and Lagos as locations."],
    sources: [
      { label: "EHA Clinics — Senior Coordinator, Talent Management", url: "https://erp.eha.ng/jobs/senior-coordinator-talent-management-941", lastChecked: "2026-10-05" },
      { label: "EHA Clinics Jobs", url: "https://erp.eha.ng/jobs", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "eha-registered-nurse-yaba-lagos-2026",
    title: "EHA Clinics Registered Nurse — Yaba, Lagos",
    organization: "EHA Clinics",
    kind: "vacancy",
    posting: {
      jobTitle: "Registered Nurse",
      datePosted: "2026-09-27",
      locations: [{ locality: "Yaba", region: "Lagos State", country: "NG" }]
    },
    sector: "Private",
    status: "open",
    statusLabel: "Applications open",
    summary: "EHA Clinics is recruiting a Registered Nurse for Yaba, Lagos through its official jobs portal.",
    location: "Yaba, Lagos State",
    employmentType: "Clinical nursing role",
    audiences: ["Registered nurses", "Healthcare professionals"],
    fields: ["Nursing", "Healthcare", "Clinical Services"],
    qualifications: ["Bachelor's degree or Diploma of Nursing from an accredited institution.", "Current nursing licence to practise in Nigeria.", "Relevant postgraduate clinical experience as stated by EHA Clinics."],
    requirements: ["Current clinical practice experience.", "Valid professional licence.", "Complete EHA Clinics' eligibility check."],
    documents: ["CV/resume", "Nursing licence and education details requested by EHA Clinics"],
    applicationSteps: ["Open the official EHA Clinics vacancy.", "Review clinical experience and licence requirements.", "Complete the eligibility check.", "Continue to the official application."],
    officialUrl: "https://erp.eha.ng/jobs/registered-nurse-yaba-lagos-1011",
    officialUrlLabel: "Apply on EHA Clinics",
    verifiedAt: "2026-10-05",
    feeNote: "Use EHA Clinics' official jobs system.",
    sourceNotes: ["EHA Clinics listed the Registered Nurse — Yaba Lagos role as posted on 27 September 2026.", "The employer's detail page includes professional nursing requirements."],
    sources: [
      { label: "EHA Clinics — Registered Nurse, Yaba Lagos", url: "https://erp.eha.ng/jobs/registered-nurse-yaba-lagos-1011", lastChecked: "2026-10-05" },
      { label: "EHA Clinics Jobs", url: "https://erp.eha.ng/jobs", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "eha-medical-doctor-abuja-2026",
    title: "EHA Clinics Medical Doctor — Abuja",
    organization: "EHA Clinics",
    kind: "vacancy",
    posting: {
      jobTitle: "Medical Doctor",
      datePosted: "2026-10-01",
      locations: [{ locality: "Abuja", region: "FCT", country: "NG" }]
    },
    sector: "Private",
    status: "open",
    statusLabel: "Applications open",
    summary: "EHA Clinics is recruiting a Medical Doctor in Abuja through its official jobs platform.",
    location: "Lifecamp, Abuja, FCT",
    employmentType: "Clinical medical role",
    audiences: ["Medical doctors", "Physicians", "Healthcare professionals"],
    fields: ["Medicine", "Healthcare", "Clinical Services"],
    qualifications: ["Medical degree such as MBBS, MBChB, MD or DO from a recognised institution.", "Completion of internship and the employer's stated post-NYSC experience.", "Current MDCN registration and practice licence.", "BLS and ACLS completion."],
    requirements: ["NYSC completion.", "Current professional licence.", "Basic computer knowledge and EHA Clinics' eligibility requirements."],
    documents: ["CV/resume", "Medical licence and registration details", "Education, internship and NYSC information"],
    applicationSteps: ["Open the official EHA Clinics vacancy.", "Review the medical qualification and experience requirements.", "Complete the eligibility check.", "Continue to the official application."],
    officialUrl: "https://erp.eha.ng/jobs/medical-doctor-abuja-549",
    officialUrlLabel: "Apply on EHA Clinics",
    verifiedAt: "2026-10-05",
    feeNote: "Apply only through EHA Clinics' official jobs portal.",
    sourceNotes: ["EHA Clinics listed the Abuja Medical Doctor role as posted on 1 October 2026.", "The role page identifies Lifecamp, Abuja and requires an active medical licence."],
    sources: [
      { label: "EHA Clinics — Medical Doctor, Abuja", url: "https://erp.eha.ng/jobs/medical-doctor-abuja-549", lastChecked: "2026-10-05" },
      { label: "EHA Clinics Jobs", url: "https://erp.eha.ng/jobs", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "eha-medical-doctor-lagos-2026",
    title: "EHA Clinics Medical Doctor — Lagos",
    organization: "EHA Clinics",
    kind: "vacancy",
    posting: {
      jobTitle: "Medical Doctor",
      datePosted: "2026-09-18",
      locations: [{ locality: "Sangotedo", region: "Lagos State", country: "NG" }]
    },
    sector: "Private",
    status: "open",
    statusLabel: "Applications open",
    summary: "EHA Clinics is recruiting a Medical Doctor for its Sangotedo, Lagos location.",
    location: "Sangotedo, Lagos State",
    employmentType: "Clinical medical role",
    audiences: ["Medical doctors", "Physicians", "Healthcare professionals"],
    fields: ["Medicine", "Healthcare", "Clinical Services"],
    qualifications: ["Medical degree from a recognised institution.", "Completion of compulsory internship and NYSC requirements stated by EHA Clinics.", "Current professional registration and practice licence."],
    requirements: ["Meet EHA Clinics' clinical and location eligibility checks.", "Maintain current professional registration.", "Review the live vacancy before applying."],
    documents: ["CV/resume", "Medical licence and registration details", "Education and NYSC information"],
    applicationSteps: ["Open the EHA Clinics Lagos Medical Doctor vacancy.", "Review professional requirements.", "Complete the eligibility questions.", "Continue to the official application."],
    officialUrl: "https://erp.eha.ng/jobs/medical-doctor-lagos-541",
    officialUrlLabel: "Apply on EHA Clinics",
    verifiedAt: "2026-10-05",
    feeNote: "Use EHA Clinics' official recruitment system.",
    sourceNotes: ["EHA Clinics listed the Lagos Medical Doctor role as posted on 18 September 2026.", "The employer's detail page places the role in Sangotedo, Lagos."],
    sources: [
      { label: "EHA Clinics — Medical Doctor, Lagos", url: "https://erp.eha.ng/jobs/medical-doctor-lagos-541", lastChecked: "2026-10-05" },
      { label: "EHA Clinics Jobs", url: "https://erp.eha.ng/jobs", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "eha-dental-assistant-lagos-2026",
    title: "EHA Clinics Dental Assistant — Lagos",
    organization: "EHA Clinics",
    kind: "vacancy",
    posting: {
      jobTitle: "Dental Assistant",
      datePosted: "2026-09-29",
      locations: [{ locality: "Sangotedo", region: "Lagos State", country: "NG" }]
    },
    sector: "Private",
    status: "open",
    statusLabel: "Applications open",
    summary: "EHA Clinics is recruiting a Dental Assistant in Sangotedo, Lagos through its official careers system.",
    location: "Sangotedo, Lagos State",
    employmentType: "Dental clinical support role",
    audiences: ["Dental assistants", "Dental health technicians", "Dental surgery technicians"],
    fields: ["Dentistry", "Dental Health", "Healthcare", "Clinical Services"],
    qualifications: ["Diploma in Dental Health Technician or Dental Surgery Technician.", "Current registration with the Dental Therapists Registration Board of Nigeria as required by EHA Clinics."],
    requirements: ["Current professional registration.", "Comfort with the Sangotedo work location.", "Complete the employer's eligibility check."],
    documents: ["CV/resume", "Professional registration and qualification details"],
    applicationSteps: ["Open the official EHA Clinics Dental Assistant vacancy.", "Review the professional registration requirements.", "Complete the eligibility check.", "Continue to the official application."],
    officialUrl: "https://erp.eha.ng/jobs/dental-assistant-lagos-585",
    officialUrlLabel: "Apply on EHA Clinics",
    verifiedAt: "2026-10-05",
    feeNote: "Apply through EHA Clinics' official jobs system.",
    sourceNotes: ["EHA Clinics listed the Dental Assistant — Lagos role as posted on 29 September 2026.", "The detail page places the role in Sangotedo, Lagos."],
    sources: [
      { label: "EHA Clinics — Dental Assistant, Lagos", url: "https://erp.eha.ng/jobs/dental-assistant-lagos-585", lastChecked: "2026-10-05" },
      { label: "EHA Clinics Jobs", url: "https://erp.eha.ng/jobs", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "eha-pharmacist-abuja-2026",
    title: "EHA Clinics Pharmacist — Abuja",
    organization: "EHA Clinics",
    kind: "vacancy",
    posting: {
      jobTitle: "Pharmacist",
      datePosted: "2026-09-29",
      locations: [{ locality: "Abuja", region: "FCT", country: "NG" }]
    },
    sector: "Private",
    status: "open",
    statusLabel: "Applications open",
    summary: "EHA Clinics is recruiting a Pharmacist for Abuja through its official jobs portal.",
    location: "Lugbe / Asba, Abuja, FCT",
    employmentType: "Clinical pharmacy role",
    audiences: ["Pharmacists", "Healthcare professionals"],
    fields: ["Pharmacy", "Healthcare", "Clinical Services"],
    qualifications: ["Bachelor's degree in Pharmacy, M.Pharm or PharmD.", "Relevant post-NYSC pharmacy experience.", "Current registration with the Pharmacists Council of Nigeria and an up-to-date practice licence."],
    requirements: ["NYSC completion.", "Current PCN registration and practice licence.", "Complete EHA Clinics' eligibility check."],
    documents: ["CV/resume", "PCN registration and practice licence details", "Education and NYSC information"],
    applicationSteps: ["Open the official EHA Clinics Pharmacist vacancy.", "Review qualification and licence requirements.", "Complete the eligibility check.", "Continue to the official application."],
    officialUrl: "https://erp.eha.ng/jobs/pharmacist-546",
    officialUrlLabel: "Apply on EHA Clinics",
    verifiedAt: "2026-10-05",
    feeNote: "Use EHA Clinics' official recruitment platform.",
    sourceNotes: ["EHA Clinics listed the Pharmacist role as posted on 29 September 2026.", "The official detail page places the role in Abuja and requires a current pharmacy licence."],
    sources: [
      { label: "EHA Clinics — Pharmacist", url: "https://erp.eha.ng/jobs/pharmacist-546", lastChecked: "2026-10-05" },
      { label: "EHA Clinics Jobs", url: "https://erp.eha.ng/jobs", lastChecked: "2026-10-05" }
    ]
  },
  {
    slug: "eha-assistant-manager-laboratory-kano-2026",
    title: "EHA Clinics Assistant Manager, Laboratory & Diagnostics — Kano",
    organization: "EHA Clinics",
    kind: "vacancy",
    posting: {
      jobTitle: "Assistant Manager, Laboratory and Diagnostics",
      datePosted: "2026-09-29",
      locations: [{ locality: "Kano", region: "Kano State", country: "NG" }]
    },
    sector: "Private",
    status: "open",
    statusLabel: "Applications open",
    summary: "EHA Clinics is recruiting an Assistant Manager, Laboratory and Diagnostics in Kano.",
    location: "Kano, Kano State",
    employmentType: "Laboratory management role",
    audiences: ["Laboratory managers", "Medical laboratory scientists", "Healthcare managers"],
    fields: ["Medical Laboratory Science", "Diagnostics", "Healthcare", "Management"],
    qualifications: ["Applicants should meet the laboratory-management and professional requirements in EHA Clinics' official vacancy."],
    requirements: ["Valid professional licence.", "Relevant laboratory-management capability.", "Complete EHA Clinics' eligibility check."],
    documents: ["CV/resume", "Professional licence and qualification details requested by EHA Clinics"],
    applicationSteps: ["Open the official EHA Clinics vacancy.", "Review the laboratory-management requirements.", "Complete the eligibility questions.", "Continue to the official application."],
    officialUrl: "https://erp.eha.ng/jobs/assistant-manager-laboratory-and-diagnotics-180",
    officialUrlLabel: "Apply on EHA Clinics",
    verifiedAt: "2026-10-05",
    feeNote: "Use EHA Clinics' official jobs portal.",
    sourceNotes: ["EHA Clinics listed this Kano laboratory-management vacancy as posted on 29 September 2026.", "The official detail page includes an active Apply Now eligibility flow."],
    sources: [
      { label: "EHA Clinics — Assistant Manager, Laboratory and Diagnostics", url: "https://erp.eha.ng/jobs/assistant-manager-laboratory-and-diagnotics-180", lastChecked: "2026-10-05" },
      { label: "EHA Clinics Jobs", url: "https://erp.eha.ng/jobs", lastChecked: "2026-10-05" }
    ]
  },
  ...jobScaleWave
];

function applyCurrentJobCorrections(item: CareerOpportunity): CareerOpportunity {
  if (item.slug !== "nigeria-revenue-service-careers") return item;

  return {
    ...item,
    title: "Nigeria Revenue Service Careers & Recruitment Verification",
    status: "career-page",
    statusLabel: "No new public recruitment exercise announced — verify NRS notices",
    summary: "The Nigeria Revenue Service warned on 5 October 2026 that a viral 'FIRS Job Vacancy — Replacement' advert is fraudulent and that the referenced recruitment exercise was not authorised or commenced by NRS. The visible NRS recruitment portal verifies applicant records already held by the Service; it should not be treated as proof of a fresh public intake.",
    qualifications: [
      "There is no current public NRS recruitment exercise with a verified new vacancy specification on this page.",
      "Do not rely on qualification lists copied from the viral FIRS replacement advert; wait for NRS to publish the requirements for any genuine future exercise."
    ],
    requirements: [
      "Check nrs.gov.ng and NRS's authorised public channels before treating any recruitment message as genuine.",
      "Disregard the viral 'Federal Inland Revenue Service — FIRS Job Vacancy — Replacement' notice; NRS has publicly described it as fraudulent.",
      "Do not make a payment, send certificates or identification documents, or disclose personal or financial information to an unofficial recruiter, email address or third party.",
      "If NRS later announces a genuine recruitment exercise, use only the application route that the Service links from its official channels."
    ],
    documents: [
      "Do not submit documents for the disowned FIRS replacement advert.",
      "For any future genuine NRS exercise, prepare only the certificates, identity documents and CV specifically requested by the official NRS notice."
    ],
    applicationSteps: [
      "Open the Nigeria Revenue Service official website at nrs.gov.ng and check for a current recruitment announcement.",
      "If no matching public notice appears on an authorised NRS channel, do not apply through a forwarded advert, email address or third-party link.",
      "If you already have an applicant record and NRS directs you to continue it, use the official recruitment.nrs.gov.ng verification portal and the phone number already held on your record.",
      "Read the exact NRS instructions before uploading certificates or identification and keep any official confirmation.",
      "Re-check NRS's authorised channels for later recruitment updates rather than assuming the existing applicant-verification portal is a new public intake."
    ],
    officialUrl: "https://www.nrs.gov.ng/",
    officialUrlLabel: "Check the Nigeria Revenue Service official website",
    verifiedAt: "2026-10-07",
    feeNote: "NRS warned the public not to make payments or share personal or financial information in response to the fraudulent recruitment notice. MyNigeriaGuide never sells access to NRS jobs, shortlists or interviews.",
    sourceNotes: [
      "On 5 October 2026, NRS publicly disowned the circulating 'FIRS Job Vacancy — Replacement' notice and said the referenced recruitment exercise had not been authorised or commenced.",
      "NRS also reminded the public that FIRS has been succeeded by the Nigeria Revenue Service and that genuine recruitment will be communicated through official NRS channels.",
      "The official recruitment.nrs.gov.ng page currently asks users to verify an applicant record already held by NRS before continuing; this page therefore does not present that portal as evidence of a newly opened public recruitment exercise."
    ],
    sources: [
      { label: "Nigeria Revenue Service official website", url: "https://www.nrs.gov.ng/", lastChecked: "2026-10-07" },
      { label: "Nigeria Revenue Service official LinkedIn public notice", url: "https://ng.linkedin.com/company/nrsnigeria", lastChecked: "2026-10-07" },
      { label: "NRS official applicant-verification portal", url: "https://recruitment.nrs.gov.ng/enlist/", lastChecked: "2026-10-07" }
    ]
  };
}

// Persisted listing metadata may outlive its closing date between editorial sweeps.
// Always normalize known expired application windows before directory, SEO and
// structured-data consumers read the catalog; the runtime guard remains in place.
function closeExpiredJob(item: CareerOpportunity): CareerOpportunity {
  if (item.status !== "open" || !item.deadline || item.deadline >= new Date().toISOString().slice(0, 10)) return item;
  return {
    ...item,
    status: "closed",
    statusLabel: "Published application deadline passed — verify current status",
    nextMilestone: "The listed application deadline has passed. Check the official employer source for a new announcement.",
  };
}

export const jobOpportunities: CareerOpportunity[] = rawJobOpportunities
  .map(normalizeCareerPortal)
  .map(applyCurrentJobCorrections)
  .map(closeExpiredJob);

export const governmentOpportunities = jobOpportunities.filter((item) => item.sector === "Government");
export const privateOpportunities = jobOpportunities.filter((item) => item.sector === "Private");
export const internationalOpportunities = jobOpportunities.filter((item) => item.sector === "International");

// Template-only career portals stay available as discovery links, never as thin SEO pages.
// Reviewed employer pages and genuinely distinct verified vacancies retain indexability.
export function isIndexableJobOpportunity(item: CareerOpportunity): boolean {
  return !templateCareerPortalSlugs.has(item.slug);
}

export function getJobOpportunity(slug: string) {
  return jobOpportunities.find((item) => item.slug === slug);
}

export function statusTone(status: JobStatus) {
  if (status === "open") return "open";
  if (status === "training" || status === "screening") return "progress";
  if (status === "upcoming") return "upcoming";
  if (status === "closed") return "closed";
  return "info";
}

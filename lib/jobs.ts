export type JobSector = "Government" | "Private";
export type JobStatus = "open" | "closed" | "screening" | "training" | "career-page" | "upcoming";

export type JobSource = {
  label: string;
  url: string;
  lastChecked: string;
};

export type CareerOpportunity = {
  slug: string;
  title: string;
  organization: string;
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

export const jobOpportunities: CareerOpportunity[] = [
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
    verifiedAt: "2026-10-03",
    deadline: "2026-10-14",
    nextMilestone: "Applications are open until 14 October 2026 according to the official portal.",
    feeNote: "The Nigerian Air Force states that recruitment/enlistment is FREE and is done through its official recruitment portal.",
    sourceNotes: [
      "The official NAF portal marks the Airmen/Airwomen BMTC exercise as open.",
      "The portal lists 3 September 2026 to 14 October 2026 for the current exercise.",
      "The DSSC section on the same portal is currently marked closed."
    ],
    sources: [
      { label: "Nigerian Air Force Recruitment Portal", url: "https://nafrecruitment.airforce.mil.ng/", lastChecked: "2026-10-03" }
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
    verifiedAt: "2026-10-03",
    nextMilestone: "Successful candidates are instructed to report for basic training on 9 October 2026.",
    feeNote: "Nigeria Customs states that recruitment does not require payment. Treat requests for recruitment fees as suspicious.",
    sourceNotes: [
      "Nigeria Customs published final lists for the 2024/2025 recruitment exercise and later issued 2026 screening/documentation updates.",
      "The current official status portal gives selected candidates instructions for basic training."
    ],
    sources: [
      { label: "Nigeria Customs recruitment status portal", url: "https://updates.customs.gov.ng/trn/", lastChecked: "2026-10-03" },
      { label: "Nigeria Customs recruitment publications", url: "https://customs.gov.ng/publications/recruitment", lastChecked: "2026-10-03" }
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
    verifiedAt: "2026-10-03",
    feeNote: "Use the official Federal Civil Service recruitment portal. MyNigeriaGuide never collects recruitment fees or application credentials.",
    sourceNotes: [
      "The official portal currently shows 70 vacancies in 19 MDAs.",
      "Vacancies visible on the portal at the time of verification are marked closed."
    ],
    sources: [
      { label: "Federal Civil Service Recruitment Portal", url: "https://recruitment.fedcivilservice.gov.ng/vacancies", lastChecked: "2026-10-03" }
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
  }
];

export const governmentOpportunities = jobOpportunities.filter((item) => item.sector === "Government");
export const privateOpportunities = jobOpportunities.filter((item) => item.sector === "Private");

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

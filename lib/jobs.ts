export type JobSector = "Government" | "Private" | "International";
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
    slug: "snv-energy-advisor-abuja-2026",
    title: "SNV Energy Advisor — Abuja",
    organization: "SNV",
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
      { label: "Nigerian Correctional Service recruitment notice", url: "https://www.corrections.gov.ng/news/recruitment-notice!?news_id=137", lastChecked: "2026-10-05" }
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
    title: "Deloitte Nigeria Early Careers & Graduate Opportunities",
    organization: "Deloitte Nigeria",
    sector: "Private",
    status: "closed",
    statusLabel: "2026 early-career applications closed",
    summary: "Deloitte Nigeria publishes early-career routes across Audit & Assurance, Consulting and Tax/Legal. The 2026 early-career application window displayed on its official site closed on 10 April 2026.",
    location: "Nigeria",
    employmentType: "Graduate / early-career professional services",
    audiences: ["Fresh graduates", "NYSC-completed applicants", "Professional-services applicants"],
    fields: ["Audit & Assurance", "Consulting", "Tax & Legal", "Risk", "Financial Advisory"],
    qualifications: [
      "Minimum Second Class Upper degree or HND Upper Credit/equivalent from a recognised university or polytechnic.",
      "At least five O'Level credits including Mathematics and English in one sitting.",
      "Published maximum age is 26 years at the date of application.",
      "Applicant must have completed NYSC.",
      "Deloitte's published early-career criteria say applicants must not have written the Deloitte aptitude test before."
    ],
    requirements: [
      "The specific 2026 early-career window is closed; do not use reposted third-party forms claiming it remains open.",
      "Use Deloitte Nigeria's official careers page for future graduate or experienced-hire openings."
    ],
    documents: ["CV/resume", "University/polytechnic qualification evidence", "O'Level results", "NYSC completion evidence", "Other information requested by the official application"],
    applicationSteps: [
      "The 2026 early-career application window has closed.",
      "Review Deloitte Nigeria's official careers page for a new graduate/early-career cycle or other current vacancies.",
      "When a new cycle opens, choose the service line that matches your interests and confirm the published eligibility criteria.",
      "Submit only through Deloitte's official careers system."
    ],
    officialUrl: "https://www.deloitte.com/ng/en/careers.html",
    officialUrlLabel: "Open Deloitte Nigeria careers",
    verifiedAt: "2026-10-03",
    feeNote: "Use Deloitte's official Nigeria careers pages for application links and current eligibility information.",
    sourceNotes: [
      "Deloitte's 2026 early-career page lists degree/HND, O'Level, age and NYSC criteria.",
      "The same official page states that 2026 applications closed on Friday, 10 April 2026."
    ],
    sources: [
      { label: "Deloitte Nigeria Careers", url: "https://www.deloitte.com/ng/en/careers.html", lastChecked: "2026-10-03" },
      { label: "Deloitte Early Career Programmes", url: "https://www.deloitte.com/ng/en/careers/explore-your-fit/experienced/early-careers-programmes.html", lastChecked: "2026-10-03" }
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
      { label: "Paystack Careers", url: "https://paystack.com.ng/careers", lastChecked: "2026-10-03" },
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
    officialUrl: "https://www.fmnplc.com/",
    officialUrlLabel: "Open Flour Mills of Nigeria",
    verifiedAt: "2026-10-05",
    feeNote: "Flour Mills recruitment guidance warns applicants against recruitment payments. Use only the company-linked recruitment route.",
    sourceNotes: ["Flour Mills of Nigeria links its careers area to an official e-recruitment platform."],
    sources: [
      { label: "Flour Mills of Nigeria", url: "https://www.fmnplc.com/", lastChecked: "2026-10-05" },
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

];

export const governmentOpportunities = jobOpportunities.filter((item) => item.sector === "Government");
export const privateOpportunities = jobOpportunities.filter((item) => item.sector === "Private");
export const internationalOpportunities = jobOpportunities.filter((item) => item.sector === "International");

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

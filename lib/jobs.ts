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
    verifiedAt: "2026-10-03",
    nextMilestone: "The official portal says shortlisted candidates are expected to attend state screening from 17 November to 1 December 2026.",
    feeNote: "The Nigerian Army states that recruitment is FREE. Do not pay for application access, shortlisting or screening.",
    sourceNotes: [
      "The Nigerian Army portal currently labels 92RRI online application as ongoing.",
      "The portal publishes the qualification, age, height, identity and screening-document requirements used in this guide."
    ],
    sources: [
      { label: "Nigerian Army Recruitment Portal", url: "https://recruit.army.mil.ng/", lastChecked: "2026-10-03" }
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
    verifiedAt: "2026-10-03",
    deadline: "2026-10-31",
    nextMilestone: "Batch 39 aptitude testing is scheduled for 21 November 2026; the portal lists basic training for the first quarter of 2027.",
    feeNote: "Use only the official Nigerian Navy recruitment domain. MyNigeriaGuide does not collect recruitment fees or credentials.",
    sourceNotes: [
      "The official portal says Batch 39 applications opened on 2 October 2026 and close on 31 October 2026 at 23:59 WAT.",
      "The Navy portal lists the aptitude test for 21 November 2026 and describes identity verification, application and status tracking stages."
    ],
    sources: [
      { label: "Nigerian Navy Batch 39 Recruitment Portal", url: "https://joinnigeriannavy.navy.mil.ng/", lastChecked: "2026-10-03" }
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
    verifiedAt: "2026-10-03",
    feeNote: "CDCFIB states that the recruitment process is free. Do not pay agents for applications, shortlisting, screening or final selection.",
    sourceNotes: [
      "The current official recruitment portal is marked Recruitment Exercise Concluded.",
      "The recruitment cycle covered NSCDC, Nigeria Immigration Service, Nigerian Correctional Service and Federal Fire Service.",
      "The published eligibility structure grouped applicants into Superintendent, Inspectorate and Assistant cadres."
    ],
    sources: [
      { label: "Official CDCFIB Recruitment Portal", url: "https://recruitment.cdcfib.gov.ng/", lastChecked: "2026-10-03" },
      { label: "Nigerian Correctional Service recruitment notice", url: "https://www.corrections.gov.ng/news/recruitment-notice!?news_id=137", lastChecked: "2026-10-03" }
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
    verifiedAt: "2026-10-03",
    feeNote: "Use Access Bank's official careers domain for applications and assessment instructions.",
    sourceNotes: [
      "Access Bank's Early Careers platform lists ELTP and internship pathways.",
      "The official hiring-process page describes application, assessment, eligibility verification, interviews, medical fitness and training stages."
    ],
    sources: [
      { label: "Access Bank Careers", url: "https://careers.accessbankplc.com/", lastChecked: "2026-10-03" },
      { label: "Access Bank Early Careers", url: "https://careers.accessbankplc.com/careers", lastChecked: "2026-10-03" }
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

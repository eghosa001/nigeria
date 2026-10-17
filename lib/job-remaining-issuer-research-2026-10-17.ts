import type { CareerOpportunity } from "@/lib/jobs";

// Thirteen original issuer-source reviews, 17 October 2026.
// Career directories are not verified live vacancies. Application forms and
// recruitment windows must be separately established by the employer.
type IssuerReview = {
  originalUrl: string;
  answer: string;
  actions: [string, string, string];
  caution: string;
  evidenceUrl?: string;
  stateLabel?: string;
};
export const remainingIssuerResearch20261017: Record<string, IssuerReview> = {
  "ecobank-careers": {
    originalUrl: "https://ecobank.com/group/about-us/careers",
    answer: "Ecobank's own group careers page expressly welcomes CVs by its published HR recruitment email and separately describes Ecobank Academy and three-to-twelve-month internships. Sending a speculative CV is not submitting for a named Nigerian branch or graduate vacancy.",
    actions: ["Read Ecobank Group's official careers instructions and distinguish its general CV invitation from an exact country-specific job advert.", "If expressing interest, use only the recruitment address visibly published on the original Ecobank page; never copy an email from a WhatsApp flyer.", "For a named opening, verify its employing country, required skills, dates and separately stated application channel before sending attachments."],
    caution: "Ecobank's pan-African hiring and internship descriptions do not confirm a 2026 Nigeria graduate-trainee window, paid internship or position-specific offer.",
  },
  "ey-nigeria-careers": {
    originalUrl: "https://careers.ey.com/?locale=en",
    answer: "EY's careers site separates Assurance, Consulting, Tax, EY-Parthenon and Core Business Services and offers both a job search and a talent community. Signing up to EY's community is not the same as applying for a Nigeria-based graduate or experienced vacancy.",
    actions: ["Open the EY job search and filter the Country/Region to Nigeria before choosing Assurance, Consulting, Tax or another service line.", "Confirm a named Nigeria requisition, graduate versus experienced level, exact qualifications and closing information before clicking Apply.", "Keep a role-specific application confirmation distinct from a talent-network email sign-up or global careers newsletter."],
    caution: "The EY search widget may display 'Loading'; neither an unpopulated search component nor a global careers headline verifies any individual open Nigeria role.",
  },
  "university-nigeria-nsukka-careers": {
    originalUrl: "https://www.unn.edu.ng/breaking-news-vacancies-for-academic-and-non-teaching-positions-in-university-of-nigeria-nsukka/",
    answer: "UNN's indexed academic and non-teaching vacancy announcement carries advertisement reference UNP/SSR.37/06/25, identifying a 2025 exercise. A university news page left online is not proof that its June 2025 posts still accept applications in October 2026.",
    actions: ["Check the advertisement reference and publication year before relying on old department-by-department Lecturer, Assistant Lecturer or non-teaching job lists.", "Look for a newly dated UNN Office of the Registrar notice covering the exact faculty, grade and current submission window.", "Do not submit using the old advertisement deadline or claim a preserved news article confirms a newly reopened university appointment."],
    caution: "This linked recruitment advert is archival (June 2025 reference); no new October 2026 UNN intake was verified.",
    stateLabel: "Historical 2025 UNN recruitment notice — new openings unverified",
  },
  "ahmadu-bello-university-careers": {
    originalUrl: "https://careers.abu.edu.ng/register",
    answer: "ABU's official Zaria portal supports creating an account and following applications, but its Available Vacancies page stated 'No Vacancies Available' during the 17 October check. Registration is not a new academic or non-teaching intake.",
    actions: ["Check ABU's actual Available Vacancies page before creating an account; the role board currently lists no openings.", "If the university later advertises a matching position, register using your own email, a secure password and truthful identity/qualification details.", "Only use the named vacancy form and keep its submission acknowledgement; an account confirmation alone is not a job application."],
    caution: "The official ABU site lists no active positions at the time of this review. Do not pay anyone or share credentials for a claimed secret intake.",
    evidenceUrl: "https://careers.abu.edu.ng/vacancies",
    stateLabel: "ABU official board: no vacancies available at this check",
  },
  "lasucom-academic-careers": {
    originalUrl: "https://www.lasu.edu.ng/home/news/read.php?id=663",
    answer: "LASU's LASUCOM faculty notice dated 15 August 2026 explicitly closed on Monday 24 August 2026. The original advert included Nursing, Medicine, Dentistry, Pharmacy, Allied Health and Basic Medical Sciences with distinct academic ranks; that historic window is not open in October.",
    actions: ["Read the original 15 August LASU notice as an archived discipline-specific academic advertisement, not a current application form.", "For a future advertisement, match your discipline and rank: Dentistry Lecturer I and Pharmacy Professor have different fellowship, registration and research criteria.", "Do not send the old advert's fifteen hard-copy sets of applications to the Registrar as though its 24 August deadline had been extended; require a newly dated LASU notice."],
    caution: "The LASUCOM deadline of 24 August 2026 has passed; there is no verified extension in the source and role-specific professional licences still matter for future hiring.",
    stateLabel: "LASUCOM 24 August 2026 closing date passed — archive only",
  },
  "uch-ibadan-careers": {
    originalUrl: "https://employment.uch-ibadan.org.ng/",
    answer: "UCH Ibadan's employment website is a hospital application and candidate-update route, not a promise that all nursing, house-officer, internship and resident positions are open. Different professional intakes require distinct qualifications, registration and opening notices.",
    actions: ["Find the named University College Hospital advertisement for the specific professional, clinical internship or administrative category first.", "Compare applicable council registration, internship or NYSC stage with the current notice before starting the hospital portal.", "Use the exact authorised link and retain an acknowledgement; never assume a previous internship shortlist or application-status page represents a new recruitment exercise."],
    caution: "The employer portal alone does not establish an active 2026 intake, medical/dental rotation availability, specific salary or universal deadline.",
  },
  "julius-berger-nigeria-careers": {
    originalUrl: "https://www.julius-berger.com/",
    answer: "Julius Berger's corporate homepage represents a construction and engineering employer; a company project story is not an application to an engineering, HSE, civil works or support vacancy. Search for its issuer-controlled careers link and a named job specification.",
    actions: ["Navigate from the verified Julius Berger corporate website to its published careers or jobs route, not an advertisement copied onto an unrelated domain.", "Distinguish site engineering, construction operations and head-office posts, including place of work, professional requirements and travel obligations.", "Apply only for a named role using employer-published instructions; do not accept a demand for an interview placement or recruitment processing fee."],
    caution: "A publicly accessible company website does not verify any particular open Nigerian requisition or job salary.",
  },
  "air-peace-careers": {
    originalUrl: "https://backup.flyairpeace.com/careers/",
    answer: "Air Peace's official-domain careers page includes an 'Openings' block with a Graduate Trainee Program teaser and broad descriptions of pilots, engineers and ground operations. A 'View' link or teaser alone does not establish a 2026 graduate-trainee deadline or a completed application.",
    actions: ["Open the exact Air Peace Job Openings item rather than assuming the careers landing-page teaser is a live 2026 exercise.", "Compare an aviation operational role's specific licence and aviation experience with that vacancy; the graduate trainee route has separate rules.", "Check the original employer role page's currently active Apply method and save a confirmed submission; avoid paid aviation recruiting intermediaries."],
    caution: "The employer site lists a graduate-programme teaser but its general landing page does not prove currently accepting applications or describe a universal airline trainee intake date.",
  },
  "maersk-nigeria-careers": {
    originalUrl: "https://www.maersk.com/careers/our-teams",
    answer: "Maersk explicitly separates Professionals, Seafarers, Warehouse/Transportation and Students/Graduates. Its Danish Deck/Engine Cadet programmes require Danish and must not be presented as Nigerian cadet intakes; applicants should filter for their own region and posted jobs.",
    actions: ["Select the right Maersk team: seafaring cadet/qualified crew, warehouse and transport, corporate logistics or graduate programme.", "Filter the official jobs portal for Nigeria and the exact discipline; a Danish cadet academy description is not a Nigeria-eligible application.", "For named seafaring roles, check sea-service, certificates and legal work eligibility, then use the actual Maersk job's online Apply route."],
    caution: "The global maritime careers and multi-country trainee descriptions do not establish that a Nigeria job or sponsorship is currently available.",
    evidenceUrl: "https://www.maersk.com/careers/our-teams/seafarers",
  },
  "fhi360-nigeria-careers": {
    originalUrl: "https://fhi.wd1.myworkdayjobs.com/FHI_360_External_Career_Portal",
    answer: "FHI 360 recruits via its employer-branded external Workday portal for health, research, humanitarian and programme positions. A searchable organisation-wide careers board is not itself proof that a named Nigeria-based health contract is accepting applications.",
    actions: ["Filter the FHI 360 external Workday board for Nigeria and read the individual role and project designation.", "Distinguish consultancy, fixed-term programme work and permanent jobs and check each posting's qualifications and worksite.", "Apply only through the issuer-hosted Workday requisition, keeping the form's acknowledgement separate from a job-alert subscription."],
    caution: "An agency-wide Workday portal does not imply a specific salary, sponsoring programme, Nigeria job availability or guaranteed interview.",
  },
  "lagos-tescom-careers": {
    originalUrl: "https://tescomjobs.lagosstate.gov.ng/",
    answer: "Lagos TESCOM's official jobs portal is dedicated to teacher and secondary-education service recruitment. A registration screen is not a dated vacancy announcement; a TESCOM teacher application must be distinguished from the state's generic job-services directory.",
    actions: ["Check the issuer's original TESCOM job page for a current dated secondary-school teaching or related vacancy.", "Compare the subject, qualification, teaching credentials, age/residency requirements and announced documentation to that specific exercise.", "Register or log in only when the official employer exercise actually accepts submissions, then keep any confirmation rather than treating account creation as an appointment."],
    caution: "An accessible TESCOM form is not independent evidence of a live 2026 teacher recruitment window, registration eligibility or offered salary.",
  },
  "ericsson-nigeria-careers": {
    originalUrl: "https://jobs.ericsson.com/careers",
    answer: "Ericsson's global careers portal covers telecom engineering, 5G networks, software, commercial roles and operations. The employer's country/location search must establish whether an advertised network-engineering or technical job is actually in Lagos or elsewhere in Nigeria.",
    actions: ["Filter the original Ericsson job board for Nigeria and the exact engineering or corporate job family.", "Open the requisition and compare travel, shift/field work, telecom stack and years of experience rather than assuming all Ericsson opportunities are remote.", "Use the original employer role's Apply action and retain the reference; a global skills or graduate-programme article is not an accepting Nigerian vacancy."],
    caution: "A searchable global careers homepage is not evidence of current Nigeria role count, pay or closing date.",
  },
  "huawei-nigeria-careers": {
    originalUrl: "https://career.huawei.com/en/",
    answer: "Huawei's official global career system distinguishes engineering/R&D, service delivery, sales, ICT graduate and other streams. A globally advertised role or graduate competition is not proof of a Nigeria-based employment vacancy.",
    actions: ["Use Huawei's original careers platform and apply Nigeria country filters before choosing an exact role, not a worldwide campus programme by title alone.", "Compare required discipline, city, level, work authorisation and the actual posting's application method.", "Submit only through the role's issuer-owned channel, and treat invitations to paid interviews or unofficial training as unverified."],
    caution: "No individual Huawei Nigeria opening, salary or current graduate intake is established by the general global careers portal.",
  },
};
export const remainingIssuerResearchSlugs20261017 = Object.keys(remainingIssuerResearch20261017);

export function applyRemainingIssuerResearch20261017(item: CareerOpportunity): CareerOpportunity {
  const reviewed = remainingIssuerResearch20261017[item.slug];
  if (!reviewed || item.kind !== "career-page" || item.status !== "career-page" ||
      item.officialUrl !== reviewed.originalUrl) return item;
  const sources = item.sources.map(source => source.url === reviewed.originalUrl
    ? { ...source, lastChecked: "2026-10-17" } : source);
  for (const url of [reviewed.originalUrl, reviewed.evidenceUrl].filter((x): x is string => Boolean(x))) {
    if (!sources.some(source => source.url === url)) sources.push({
      label: item.organization + " — official careers and recruitment evidence",
      url,
      lastChecked: "2026-10-17",
    });
  }
  return {
    ...item,
    summary: reviewed.answer,
    statusLabel: reviewed.stateLabel ?? "Official careers guide — find and verify a specific vacancy",
    deadline: undefined,
    verifiedAt: "2026-10-17",
    applicationSteps: [
      ...reviewed.actions,
      "Confirm the named original notice's location, eligibility, application deadline and actual Apply form; the company careers page alone is not a vacant position.",
      "Protect identity documents and never pay an unauthorised intermediary for interviews, a shortlist, or an appointment.",
    ],
    sourceNotes: [
      ...item.sourceNotes,
      reviewed.caution,
      "This review checked the employer-controlled careers source and its application distinctions, not authenticated user registration, applicant outcomes or the continuing availability of individual openings.",
    ],
    sources,
  };
}

import type { CareerOpportunity } from "@/lib/jobs";

// Twenty-eight original issuer-source reviews, 17 October 2026.
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
  "wema-bank-careers": {
    originalUrl: "https://www.wemabank.com/careers/what-we-do/",
    answer: "Wema Bank's 'Why Join Wema' page lists banking, technology, finance, risk, legal, customer experience and sales as career areas. Its ALAT internship and Purple Academy stories describe learning and culture, not a named vacancy that is accepting applications today.",
    actions: ["Start at Wema's separate Careers/Opportunities navigation, not its employee benefits page.", "Choose an actual advertised role and compare its department, location, qualification and closing date before preparing a banking, ALAT or technical CV.", "Only an acknowledgement from that role's authorised Apply route is an application; a story about Purple Academy or former interns is not an enrolment form."],
    caution: "The bank's general careers landing page describes possible flexible work, employee benefits and development, which are not guaranteed conditions for each job or a current graduate intake.",
    evidenceUrl: "https://wemabank.com/careers/",
  },
  "ecobank-careers": {
    originalUrl: "https://ecobank.com/group/about-us/careers",
    answer: "Ecobank's own group careers page expressly welcomes CVs by its published HR recruitment email and separately describes Ecobank Academy and three-to-twelve-month internships. Sending a speculative CV is not submitting for a named Nigerian branch or graduate vacancy.",
    actions: ["Read Ecobank Group's official careers instructions and distinguish its general CV invitation from an exact country-specific job advert.", "If expressing interest, use only the recruitment address visibly published on the original Ecobank page; never copy an email from a WhatsApp flyer.", "For a named opening, verify its employing country, required skills, dates and separately stated application channel before sending attachments."],
    caution: "Ecobank's pan-African hiring and internship descriptions do not confirm a 2026 Nigeria graduate-trainee window, paid internship or position-specific offer.",
  },
  "bua-group-careers": {
    originalUrl: "https://buagroup.com/careers/",
    answer: "BUA Group publishes a separate Vacancies page; during the 17 October review that page displayed 'We currently have no job openings'. A group careers description is therefore not an active BUA factory, cement or foods job.",
    actions: ["From BUA Group careers, open the original company Vacancies page, not a republished job listing.", "If no openings are listed, treat the application route as unavailable rather than uploading a CV through an unofficial recruiter.", "For a future announcement, match the actual BUA company, plant, title, location and requirements before following the exact advertised application action."],
    caution: "No positions were displayed on BUA Group's official Vacancies page at this review; vacancies may change and should be rechecked before applying.",
    evidenceUrl: "https://buagroup.com/vacancies/",
    stateLabel: "BUA vacancy board showed no current openings — check for new notices",
  },
  "ey-nigeria-careers": {
    originalUrl: "https://careers.ey.com/?locale=en",
    answer: "EY's careers site separates Assurance, Consulting, Tax, EY-Parthenon and Core Business Services and offers both a job search and a talent community. Signing up to EY's community is not the same as applying for a Nigeria-based graduate or experienced vacancy.",
    actions: ["Open the EY job search and filter the Country/Region to Nigeria before choosing Assurance, Consulting, Tax or another service line.", "Confirm a named Nigeria requisition, graduate versus experienced level, exact qualifications and closing information before clicking Apply.", "Keep a role-specific application confirmation distinct from a talent-network email sign-up or global careers newsletter."],
    caution: "The EY search widget may display 'Loading'; neither an unpopulated search component nor a global careers headline verifies any individual open Nigeria role.",
  },
  "lagos-state-civil-service-careers": {
    originalUrl: "https://lagosstate.gov.ng/services/",
    answer: "Lagos State's official services portal lists a broad Job Opportunities service among many government services. Its entry point is not an active Civil Service Commission vacancy with shared qualifications or a fixed deadline.",
    actions: ["Use Lagos State's original Job Opportunities entry to identify the responsible MDA or service before looking for an application.", "Require a current dated notice from the Civil Service Commission or exact hiring department; distinguish civil service, ferry services and other government hiring.", "Follow only the linked agency's current instructions for documents, citizenship/residency criteria and closing date, rather than assuming one state-wide form."],
    caution: "The government service directory is a navigation hub, not evidence of a new Lagos State-wide civil-service recruitment exercise.",
  },
  "nigerian-ports-authority-careers": {
    originalUrl: "https://nigerianports.gov.ng/faqs/",
    answer: "The Nigerian Ports Authority's official FAQ directly answers 'Is NPA recruiting?' with 'At the moment, NO!' and says any genuine recruitment will appear only on official NPA channels. Port-operations FAQs are not an invitation to submit job applications.",
    actions: ["Read NPA's original recruitment FAQ and treat unsolicited paid forms, 'replacement lists' and unverified job links as suspicious.", "Check original NPA News or Careers notices for a later dated exercise before sharing certificates or personal records.", "If a genuine new posting appears, compare the exact port, technical discipline and stated application method, rather than using a general maritime-service contact form."],
    caution: "NPA's 'no recruitment' FAQ is a dated observation from its official site, not a guarantee that hiring can never resume.",
    stateLabel: "NPA FAQ explicitly says not recruiting — no general application route",
  },
  "edo-state-edsiec-careers": {
    originalUrl: "https://edsiec.edostate.gov.ng/career/",
    answer: "EDSIEC's careers page links 'Current Openings' but its FAQ prominently reuses instructions for 'Edo State Government recruitment 2024' and the wider Local Government Service Commission. Those historical and separate-government criteria should not automatically be applied to an EDSIEC 2026 vacancy.",
    actions: ["Follow EDSIEC's own Current Openings link and look for an advertisement naming the commission, requisition and current deadline.", "Separate any older 2024 Edo Government portal FAQ or local-government age rule from the eligibility of the specific EDSIEC post.", "Use only the application process published on that exact position; the site warns candidates not to pay for state-government recruitment."],
    caution: "The EDSIEC page mixes generic 2024 Edo Government recruitment Q&A with commission career navigation; no October 2026 intake is inferred from the FAQ.",
  },
  "university-nigeria-nsukka-careers": {
    originalUrl: "https://www.unn.edu.ng/breaking-news-vacancies-for-academic-and-non-teaching-positions-in-university-of-nigeria-nsukka/",
    answer: "UNN's indexed academic and non-teaching vacancy announcement carries advertisement reference UNP/SSR.37/06/25, identifying a 2025 exercise. A university news page left online is not proof that its June 2025 posts still accept applications in October 2026.",
    actions: ["Check the advertisement reference and publication year before relying on old department-by-department Lecturer, Assistant Lecturer or non-teaching job lists.", "Look for a newly dated UNN Office of the Registrar notice covering the exact faculty, grade and current submission window.", "Do not submit using the old advertisement deadline or claim a preserved news article confirms a newly reopened university appointment."],
    caution: "This linked recruitment advert is archival (June 2025 reference); no new October 2026 UNN intake was verified.",
    stateLabel: "Historical 2025 UNN recruitment notice — new openings unverified",
  },
  "unilorin-careers": {
    originalUrl: "https://careers.unilorin.edu.ng/",
    answer: "The University of Ilorin portal describes separate academic, administrative and technical recruitment categories. Its stated workflow is to choose a job, create a user account, complete a profile and upload the necessary documents; the page's evergreen 'currently accepting' category prose is not a time-stamped individual requisition.",
    actions: ["Open Available Positions on UNILORIN's official portal and select the exact faculty or administrative/technical position.", "Register or sign in, complete employment and academic history and prepare only credentials requested by that post.", "Check the role-specific application window and confirmation; completing a profile is not necessarily submitting an application."],
    caution: "University homepage category copy is not proof that every advertised lecturer or technical grade has a currently accepting application.",
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
  "dhl-nigeria-careers": {
    originalUrl: "https://careers.dhl.com/",
    answer: "DHL's global careers system covers multiple businesses and frontline delivery, warehousing, management, corporate and student opportunities. Choosing 'Nigeria' must be done on a named opening; a DHL global position may instead be in another country or entity.",
    actions: ["Use DHL's official global job search and filter by Nigeria and the relevant operating unit, such as forwarding, supply chain or express.", "Check the actual location, shift pattern, licence or supply-chain experience required by the named role.", "Submit through the linked DHL requisition, not a generic expression of interest; compare any recruitment message with the official domain."],
    caution: "Neither a global search category nor a DHL employee testimonial verifies an individual Nigeria vacancy, pay amount or application deadline.",
  },
  "maersk-nigeria-careers": {
    originalUrl: "https://www.maersk.com/careers/our-teams",
    answer: "Maersk explicitly separates Professionals, Seafarers, Warehouse/Transportation and Students/Graduates. Its Danish Deck/Engine Cadet programmes require Danish and must not be presented as Nigerian cadet intakes; applicants should filter for their own region and posted jobs.",
    actions: ["Select the right Maersk team: seafaring cadet/qualified crew, warehouse and transport, corporate logistics or graduate programme.", "Filter the official jobs portal for Nigeria and the exact discipline; a Danish cadet academy description is not a Nigeria-eligible application.", "For named seafaring roles, check sea-service, certificates and legal work eligibility, then use the actual Maersk job's online Apply route."],
    caution: "The global maritime careers and multi-country trainee descriptions do not establish that a Nigeria job or sponsorship is currently available.",
    evidenceUrl: "https://www.maersk.com/careers/our-teams/seafarers",
  },
  "plan-international-nigeria-careers": {
    originalUrl: "https://jobs.plan-international.org/",
    answer: "Plan International's official global jobs site permits keyword and region filtering and separately offers a Talent Community and Emergency Response Roster. Signing up to a roster or community is not an application to a fixed Nigeria-based humanitarian vacancy.",
    actions: ["Use the original Plan International jobs portal, filter for Nigeria and inspect the actual duty station and contract category.", "Read the role's technical sector, safeguarding duties, selection criteria and stated deadline before submitting.", "Use a vacancy-specific account/application; Plan warns that it never sends unsolicited candidate emails demanding payments."],
    caution: "A globally advertised emergency roster or location-flexible position is not automatically based in Nigeria and does not promise permanent employment.",
    evidenceUrl: "https://jobs.plan-international.org/viewalljobs/",
  },
  "fhi360-nigeria-careers": {
    originalUrl: "https://fhi.wd1.myworkdayjobs.com/FHI_360_External_Career_Portal",
    answer: "FHI 360 recruits via its employer-branded external Workday portal for health, research, humanitarian and programme positions. A searchable organisation-wide careers board is not itself proof that a named Nigeria-based health contract is accepting applications.",
    actions: ["Filter the FHI 360 external Workday board for Nigeria and read the individual role and project designation.", "Distinguish consultancy, fixed-term programme work and permanent jobs and check each posting's qualifications and worksite.", "Apply only through the issuer-hosted Workday requisition, keeping the form's acknowledgement separate from a job-alert subscription."],
    caution: "An agency-wide Workday portal does not imply a specific salary, sponsoring programme, Nigeria job availability or guaranteed interview.",
  },
  "faan-careers": {
    originalUrl: "https://faan.gov.ng/careers/",
    answer: "The Federal Airports Authority of Nigeria's current Career page displays the explicit disclaimer 'FAAN NOT RECRUITING!!!' and warns that applications advertised by other sources or sites are fraudulent. It is an anti-scam notice, not an open federal airport job.",
    actions: ["Use FAAN's original agency careers and press-release pages to check its unambiguous non-recruitment notice.", "Do not pay for an 'airport screening form', forward certificates to a third-party link, or trust FAAN-branded WhatsApp circulars.", "Only a later agency-owned notice with a named post, application period and actual issuer link can establish a future exercise."],
    caution: "FAAN itself currently disowns recruitment solicitations. The old archive notices and current warning cannot be used to promise a job opening.",
    evidenceUrl: "https://faan.gov.ng/career/",
    stateLabel: "FAAN official careers page says NOT RECRUITING — ignore third-party forms",
  },
  "nuprc-careers": {
    originalUrl: "https://www.nuprc.gov.ng/",
    answer: "On 11 August 2026, NUPRC publicly warned of fake and AI-generated employment letters, extortion and recruitment impostors, stating categorically that no recruitment exercise was underway. A petroleum regulator's homepage cannot make those fake offers genuine.",
    actions: ["Locate the Commission's own August 2026 recruitment-scam warning before responding to forwarded offer letters.", "Reject paid appointment, interview or credential-verification demands unless a later independently verifiable NUPRC notice explicitly authorises a recruitment process.", "For future NUPRC roles, confirm the notice's date, required technical background and official submission route rather than contacting a number in an unsolicited letter."],
    caution: "The NUPRC statement of 11 August 2026 is a dated warning; no 2026 recruitment or payment route is verified by its corporate homepage.",
    evidenceUrl: "https://www.nuprc.gov.ng/media/news/8c4ad14201909f4a31d8da60",
    stateLabel: "NUPRC disowns fake recruitment letters — no active intake confirmed",
  },
  "cbn-careers": {
    originalUrl: "https://www.cbn.gov.ng/faqs/",
    answer: "CBN's Human Resources FAQ names relevant disciplines including accountancy, banking/finance, economics, computer science, statistics and law. It also says age rules depend on entry point and skill level; those facts are not a standing 'CBN 2026 recruitment' announcement.",
    actions: ["Use the Central Bank's official Human Resources FAQ for broad education/eligibility context, not as an active job advert.", "Require a dated notice specifying exact job grade, discipline, age rule, required experience and genuine application period before applying.", "Do not assume a generic finance degree or forwarded CBN recruitment PDF qualifies you for every entry route; verify notices on CBN's original domain."],
    caution: "The CBN's FAQ describes recruitment practices, but publishes no universal vacancy, salary, age cap or submission deadline for 2026.",
  },
  "lagos-tescom-careers": {
    originalUrl: "https://tescomjobs.lagosstate.gov.ng/",
    answer: "Lagos TESCOM's official jobs portal is dedicated to teacher and secondary-education service recruitment. A registration screen is not a dated vacancy announcement; a TESCOM teacher application must be distinguished from the state's generic job-services directory.",
    actions: ["Check the issuer's original TESCOM job page for a current dated secondary-school teaching or related vacancy.", "Compare the subject, qualification, teaching credentials, age/residency requirements and announced documentation to that specific exercise.", "Register or log in only when the official employer exercise actually accepts submissions, then keep any confirmation rather than treating account creation as an appointment."],
    caution: "An accessible TESCOM form is not independent evidence of a live 2026 teacher recruitment window, registration eligibility or offered salary.",
  },
  "sec-nigeria-careers": {
    originalUrl: "https://home.sec.gov.ng/about/careers/",
    answer: "Nigeria's SEC explicitly describes a Competency Assessment Centre for shortlisted applicants and separately publishes 'Openings' and 'Talk to Us' routes. Its career-inquiry form is not a substitute for applying to a named capital-market regulator vacancy.",
    actions: ["Select SEC's Openings page and check the original job specification in law, accountancy, economics, IT or other required discipline.", "Distinguish the Talk to Us inquiry form from a vacancy application; an unanswered question does not enter you into recruitment.", "If a specific job is open, prepare evidence of technical and behavioural skills for the Commission's stated competency-assessment process."],
    caution: "SEC's 2023 Working With Us page describes procedure and employee development, not a fresh October 2026 hiring deadline.",
    evidenceUrl: "https://home.sec.gov.ng/about/careers/openings/",
  },
  "nitda-careers": {
    originalUrl: "https://nitda.gov.ng/disclaimer/",
    answer: "NITDA has issued explicit public warnings against fake recruitment portals, including its notice disowning purported 'NITDA 2021–2022 recruitment' sites and third-party solicitations. A disclaimer is not itself a new cybersecurity or civil-service application portal.",
    actions: ["Read NITDA's original recruitment scam disclaimer before treating a forwarded job-link as official.", "Check the agency's own latest dated announcements for a genuine vacancy; never infer an open 2026 intake from an archived 2021–2022 warning.", "Protect certificates, NIN, passwords and bank details and reject payment requests from unofficial shortlisting agents."],
    caution: "The confirmed historical NITDA warning cannot prove a new recruitment exercise; verify current notices independently.",
    evidenceUrl: "https://nitda.gov.ng/disclaimer-nitda-recruitment-2021-portal-application/5099/",
  },
  "seven-up-careers": {
    originalUrl: "https://www.sevenup.org/career/",
    answer: "Seven-Up Bottling Company's careers page has a 'Current Openings' component, but its public HTML currently displays 'Loading open positions...' rather than named jobs. The company's culture and bottling-site overview cannot be mistaken for a live graduate or production vacancy.",
    actions: ["Use the employer's own Current Openings section and wait for actual role titles to load rather than relying on a blank or pending widget.", "Check the specific bottling site, engineering, commercial or supply-chain role's worksite and experience requirements.", "Complete the application on the exact employer-issued opening only; 'Loading open positions' is not evidence of a live job or an accepted submission."],
    caution: "A client-rendered vacancies component did not yield verified role details or a deadline during this review.",
  },
  "frieslandcampina-wamco-careers": {
    originalUrl: "https://careers.frieslandcampina.com/nga/en/page/were-frieslandcampina-wamco",
    answer: "FrieslandCampina WAMCO separates commercial, operations/technology, supply chain, management and supporting-service career disciplines. Its WAMCO Nigeria product history and development programmes do not automatically make globally listed roles or factory internships Nigeria-eligible.",
    actions: ["Begin on the official WAMCO Nigeria career page, then use View All Vacancies to find an actual Nigeria-positioned job.", "Choose engineering/manufacturing, sales, supply chain or supporting functions and verify plant location, qualification and advertised contract type.", "Apply only for a named original requisition; global positions from other FrieslandCampina country pages do not inherit Nigerian work eligibility."],
    caution: "Employer history, country-selector labels and discipline pages are not proof of an October 2026 WAMCO recruitment deadline or currently open Nigeria roles.",
  },
  "microsoft-nigeria-internships": {
    originalUrl: "https://careers.microsoft.com/v2/global/en/internship_eligibility",
    answer: "Microsoft's country-specific Nigeria internship eligibility distinguishes Engineering and MCAPS university interns. Both Nigeria entries require a student enrolled in a degree programme, legal right to work in Nigeria, English fluency and at least one academic quarter/semester remaining AFTER the internship.",
    actions: ["Select Nigeria in Microsoft's official internship eligibility page, not Egypt's or another country's MCAPS rules.", "Before applying, verify degree enrolment and that at least one quarter/semester of university remains after the proposed internship, plus English and local right-to-work requirements.", "Look for a currently published Nigeria-specific internship requisition in Microsoft Careers; eligibility guidance is not an application or guaranteed annual intake."],
    caution: "Some neighbouring country MCAPS rules refer to graduates within 12 months of completion; that must not be copied into Nigeria's separate eligibility rules.",
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

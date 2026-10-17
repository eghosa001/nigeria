import type { CareerOpportunity } from "@/lib/jobs";

// Issuer-page desk reviews on 17 October 2026. Source-specific guidance only:
// a published employer careers page does NOT prove an open vacancy, working
// submission, salary, deadline, recruitment permission, or applicant outcome.
type Review = {
  source: string;
  answer: string;
  steps: [string, string, string];
  caveat: string;
};

export const twentyIssuerCareerRoutes20261017: Record<string, Review> = {
  "ndlea-careers": {
    source: "https://www.ndlea.gov.ng/careers",
    answer: "NDLEA describes two different career paths: academy entry-level cadets at Kotton Rikus, Jos, and experienced specialist or support roles such as ICT, legal, finance and administration. The evergreen careers description does not announce a dated new recruitment exercise or an active registration form.",
    steps: [
      "Decide whether your background matches the cadet entry path or a specialist role; they are not one application.",
      "Check NDLEA's original careers page and dated official agency notices for a named position, eligibility, portal and deadline before preparing an application.",
      "When no matching official vacancy notice exists, do not follow paid admission, WhatsApp registration or 'guaranteed shortlist' links advertised elsewhere.",
    ],
    caveat: "The October 2026 page describes career categories, not a verified currently accepting NDLEA recruitment window.",
  },
  "shell-nigeria-siwes": {
    source: "https://www.shell.com.ng/careers/students-and-graduates/student-industrial-training-and-internship-program.html",
    answer: "Shell's Nigeria SIWES industrial-training route is for full-time Nigerian university or polytechnic undergraduates with school-approved industrial training. Its published grade thresholds are 3.5/5.0 CGPA for university students and 3.0/4.0 for polytechnic students. This is neither a graduate salaried job nor a general scholarship.",
    steps: [
      "Confirm Nigerian citizenship, full-time enrolment, school approval for industrial training and the applicable university/polytechnic CGPA threshold.",
      "Prepare the school-authorisation and student evidence requested by the form linked from Shell's own SIWES page; do not use an unrelated graduate vacancy portal.",
      "Complete only the employer-linked application if it is accepting submissions. Shell says only successful applicants will be contacted, not that all eligible applicants receive placements.",
    ],
    caveat: "The SIWES programme description does not establish an October 2026 intake closing date, placement guarantee or employment contract.",
  },
  "interswitch-careers": {
    source: "https://interswitchgroup.com/company/careers",
    answer: "Interswitch separates its 'View Job Openings' route from its #TalentConnect talent community. Joining the talent community or signing in is not the same as submitting an application to a currently advertised payments or fintech vacancy.",
    steps: [
      "Use View Job Openings from the Interswitch employer page; a loading-only jobs widget does not prove a named job exists.",
      "Open the exact role record and check the location, seniority, experience and current application form before preparing a targeted CV.",
      "Use #TalentConnect only if you want to join the employer's talent community; keep any completed role-specific application confirmation separate.",
    ],
    caveat: "The employer's careers landing page shows an asynchronous openings component; current title, vacancy count and deadline must be established on the actual role listing.",
  },
  "fcmb-group-careers": {
    source: "https://www.fcmbgroup.com/careers",
    answer: "FCMB Group's corporate careers page describes financial services, technology and innovation, operations/risk and sales/marketing as distinct employment areas. A category description is not an open FCMB Bank vacancy or one group-wide graduate-trainee application.",
    steps: [
      "Choose the business or functional area matching your experience, then look for a named recruitment notice on the responsible FCMB business's authorised site.",
      "Confirm whether the employer is FCMB Group or a specific group company, and use the actual notice's qualifications, office and submission instructions.",
      "Do not infer that a displayed benefits or culture paragraph creates a currently accepting vacancy or grants a role-specific salary.",
    ],
    caveat: "The reviewed group careers page provides career categories and employer context, but not a universal application deadline or verified live vacancy.",
  },
  "flour-mills-nigeria-careers": {
    source: "https://fmnplc.e-recruiter.ng/jobprofile",
    answer: "Flour Mills of Nigeria's e-recruiter distinguishes job-family profiles from actual advertised vacancies. Its official application instructions require a registered ID/password and completion of Personal Details, Computer Exposure, Tertiary Education and Referee CV sections BEFORE submitting for an exact position.",
    steps: [
      "Read the FMN job-family descriptions for orientation, but switch to the specific vacancy list rather than treating jobprofile as an Apply button.",
      "Register on the issuer's e-recruiter, retain the ID and password and complete all four required CV sections.",
      "Return to the exact vacancy and use its own View/Apply action; profile registration alone does not submit an application.",
    ],
    caveat: "FMN explicitly says it does not request money or valuables during recruitment. A general company profile is not evidence of an open role.",
  },
  "nigerian-breweries-careers": {
    source: "https://www.nbplc.com/why-join-us/",
    answer: "Nigerian Breweries' employer page offers a talent community alongside a separate vacancies route. Joining that community for future alerts does not prove a current brewing, engineering, sales or commercial opening and does not count as submitting a job application.",
    steps: [
      "Use the company's See Opportunities or current careers route for a named role, rather than selecting an old promotional employee story.",
      "Check the original posting's city, specific brewery or sales region, entry level, application channel and deadline.",
      "If you use the talent-community form, keep that expression of interest separate from any actual job application acknowledgement.",
    ],
    caveat: "The employer's descriptions of breweries, brands and staff development are not a current vacancy list or proof of hiring.",
  },
  "oando-careers": {
    source: "https://oandoplc.com/careers",
    answer: "Oando explicitly identifies its official LinkedIn account linked from its careers page as its ONLY authorised online vacancy and recruitment-advertising source. A third-party form or an unsolicited email is not an Oando recruitment channel merely because it uses the company logo.",
    steps: [
      "Start from Oando's own careers page and follow its official LinkedIn link; do not choose a similar-looking social profile from search results.",
      "Verify that a specific role is advertised on the employer-authorised channel before relying on the application route, eligibility or deadline.",
      "If another site asks you to submit personal data for an Oando role, treat it as suspicious and use the recruitment contact published in the employer's disclaimer.",
    ],
    caveat: "The employer's warning verifies the correct discovery channel, not a current named vacancy or completed submission.",
  },
  "standards-organisation-nigeria-careers": {
    source: "https://son.gov.ng/2026/09/26/employment-information/",
    answer: "SON's 26 September 2026 official recruitment warning says the organisation has NOT advertised any vacancies and has NOT authorised third parties to recruit on its behalf. This page is a fraud-prevention reference, not an open SON job or a live application portal.",
    steps: [
      "Read the signed agency notice before considering a link or hiring flyer claiming to recruit for SON.",
      "Do not send identity documents, certificates, CVs or any money to a 'SON recruitment portal' unsupported by a fresh original announcement.",
      "For a future exercise, require a newly dated SON notice specifying the actual vacancy, official application route, documents and window; disregard recycled 2026 fake links.",
    ],
    caveat: "The no-recruitment statement is SON's dated September 2026 notice; later exercises require their own new primary-source check.",
  },
  "nerc-careers": {
    source: "https://nerc.gov.ng/resources/career-opportunities/",
    answer: "NERC's 'Career Opportunities' resource entry displays a publication date of 11 June 2022. It is an older resource page, not proof of open electricity-regulation appointments in October 2026.",
    steps: [
      "Read the date on the NERC career-opportunities resource before using any attached document as eligibility or application guidance.",
      "Locate a separately dated NERC recruitment notice for the exact position, closing date and official form if you intend to apply in 2026.",
      "Do not pay an intermediary or upload personal data to a copied notice simply because the 2022 resource remains publicly readable.",
    ],
    caveat: "A historically published career PDF/notice cannot validate a currently open vacancy, even when the website returns HTTP 200.",
  },
  "university-ibadan-careers": {
    source: "https://vacancies.ui.edu.ng/",
    answer: "The University of Ibadan runs an official vacancies portal separate from its general university site. Past academic and non-academic recruitment exercises can leave application guidance online after their window closes; the portal homepage alone is not a live opening.",
    steps: [
      "Start at the university-owned vacancies.ui.edu.ng domain and locate a current named academic or non-academic advertisement.",
      "Check the current advert's faculty or department, grade, required qualifications, supporting documents and closing date before starting its account flow.",
      "If the portal has no dated open position, keep it for future announcements rather than presenting an older University of Ibadan exercise as current.",
    ],
    caveat: "Portal existence was verified, not a currently accepting post, a completed login or any individual submission.",
  },
  "pg-nigeria-careers": {
    source: "https://www.pgcareers.com/global/en/locations/nigeria",
    answer: "P&G maintains a Nigeria-specific country page with a direct 'See all jobs for Nigeria' route; its internship and graduate-development descriptions are not in themselves live vacancies. The page's embedded search area can display unresolved placeholders, which must never be counted as Nigerian job listings.",
    steps: [
      "Use the See all jobs for Nigeria control and confirm that the actual result filters to Nigeria, not a global or US vacancy.",
      "Open a named intern, graduate or experienced position and check its role-specific qualifications, duty location and current Apply status.",
      "If the search component shows placeholders or zero jobs, do not infer that the company has announced an intake; use the official page to check again later.",
    ],
    caveat: "The Nigeria landing page does not supply a universal P&G application deadline or a verified current list of open roles.",
  },
  "slb-nigeria-careers": {
    source: "https://careers.slb.com/",
    answer: "SLB separates Engineering and Manufacturing, Field Operations, Digital Technology, HSE, Supply Chain and Internships as distinct job families. A global hiring category or career story does not establish that a role is located in Nigeria or that a named Nigerian intake is open.",
    steps: [
      "Select Find a Job and filter to the real location and job family; do not treat the global careers home as a Nigeria-only vacancy feed.",
      "Compare the exact role's field-rotation obligations, qualifications, experience level and eligibility; internships differ from experienced field positions.",
      "Use only the SLB-owned job record's application route, preserving its requisition identifier and any applicant acknowledgement.",
    ],
    caveat: "SLB's global careers page describes hiring categories and development, not an October 2026 Nigeria-wide recruitment deadline.",
  },
  "leadway-careers": {
    source: "https://www.leadway.com/career/",
    answer: "Leadway Assurance publishes a multi-stage process: Apply Online, Initial Screening, Selection Process and Offer/Onboarding, with assessments or interviews depending on role. Submission of the initial form does not mean screening has been passed or that an offer exists.",
    steps: [
      "Choose a named opening on the Leadway careers page and complete that specific role's online application with accurate information.",
      "Prepare for possible screening and role-specific written tests or interviews; Leadway says selection activities can vary by vacancy.",
      "Treat only a formal employer offer as employment confirmation; retain your original submission and interview communications.",
    ],
    caveat: "The hiring-stage descriptions establish process, not a guaranteed number of interviews, current role count or vacancy deadline.",
  },
  "custodian-investment-careers": {
    source: "https://custodianplc.com.ng/careers/",
    answer: "Custodian Investment distinguishes its six-month Custodian Academy Graduate Trainee Programme from the separate general 'Send Resume' career-interest route. A public programme description is not proof a particular new cohort is accepting applications.",
    steps: [
      "Decide whether you want the graduate trainee programme or a conventional investment, insurance or corporate position.",
      "Follow the programme's own Learn More and dated application criteria if available; use Send Resume only as the type of general expression of interest described by the issuer.",
      "Keep actual programme confirmation distinct from a submitted unsolicited resume and avoid copied cohort deadlines.",
    ],
    caveat: "Custodian describes the trainee programme's length, not a verified October 2026 intake or guaranteed offer.",
  },
  "lafarge-africa-careers": {
    source: "https://careers.holcimgroup.com/lafarge_nigeria/",
    answer: "Lafarge Africa's Nigeria career site is hosted on Holcim's official recruitment infrastructure. Its talent-community email registration is for updates about future opportunities, not a substitute for applying to a specific Lafarge Nigeria vacancy.",
    steps: [
      "Start from the dedicated Lafarge Nigeria employer page and look for an actual Nigeria-positioned role in the Holcim jobs system.",
      "Check the exact role's plant, country, experience, application instructions and deadline; do not assume a global Holcim opening is in Nigeria.",
      "Treat the Join Our Talent Community email form as alerts only. Save a separate confirmation if you complete a particular job application.",
    ],
    caveat: "An official talent-community page does not verify active hiring, programme eligibility or an accepted application.",
  },
  "schneider-electric-nigeria-careers": {
    source: "https://www.se.com/ng/en/about-us/careers/overview/",
    answer: "Schneider Electric Nigeria separates Early Careers, Professionals, Freelancers and Executives. Its page describes 3-, 6- and 12-month internships, apprenticeships and graduate jobs as programme formats, not as an announcement that every format is accepting Nigerian applicants today.",
    steps: [
      "Select the employer's Early Careers or Professionals path instead of assuming a generic country overview is an application form.",
      "Filter to the actual Nigerian position and compare the advertised internship duration, location, discipline and start-date conditions.",
      "Use the official careers.se.com application only when a matching role is listed; a programme category alone has no uniform deadline.",
    ],
    caveat: "Schneider's country overview contains unfinished generic content blocks; neither those blocks nor a broad careers category prove open roles.",
  },
  "ibom-air-careers": {
    source: "https://www.ibomair.com/careers/",
    answer: "Ibom Air's visible Captains and First Officers advert still shows a deadline of 23 September 2025. Its flight-deck requirements and recruitment@ibomair.com address are historical context, NOT a reopened October 2026 pilot intake. Other cabin, ground and corporate categories do not inherit that old deadline.",
    steps: [
      "Check the dated flight-deck notice before considering an email application; its published September 2025 window has passed.",
      "For any newer named aviation role, confirm the appropriate crew category, required Nigerian ATPL/CPL, flight hours and the employer's newly stated application route.",
      "Do not send a late CV to the older pilot advert as if it were newly opened; use a current separate Ibom Air recruitment notice if one appears.",
    ],
    caveat: "The old Captains and First Officers listing gives different hour and licence requirements by role; do not generalise those rules to ground staff or cabin crew.",
  },
  "ihs-towers-careers": {
    source: "https://www.ihstowers.com/join-us/vacancies",
    answer: "IHS Towers' official Vacancies page links out to a separate SmartRecruiters employer board for actual positions. Its corporate talent-development material is not itself an open Nigerian telecom-infrastructure vacancy.",
    steps: [
      "Follow the original IHS Towers Vacancies page to its linked SmartRecruiters openings rather than using an unverified repost.",
      "Filter the employer board for Nigeria and compare the exact tower-engineering, operations or support posting with your experience and location.",
      "Apply only through the employer-linked requisition and preserve the confirmation; a vacancy-count claim needs the live issuer board.",
    ],
    caveat: "IHS's global vacancies route does not establish that any one Nigeria role is open, that all jobs are remote or that a current salary has been published.",
  },
  "coca-cola-hbc-nigeria-careers": {
    source: "https://ng.coca-colahellenic.com/en/working-with-us",
    answer: "Coca-Cola HBC Nigeria's working-with-us page links to its separate official careers application system. It describes sales, digital/technology and an International Leadership Trainee Programme, but the same page also features vacancies explicitly located outside Nigeria; those must not be presented as Nigerian openings.",
    steps: [
      "Follow Apply now to the employer's role database and filter by Nigeria before collecting any job or salary figures.",
      "Distinguish Sales, Digital/Technology and the International Leadership Trainee route; use the particular advert for qualification, country and deadline.",
      "Do not mistake a featured Serbia or other foreign vacancy on the Nigerian corporate page for a Lagos or Nigeria position.",
    ],
    caveat: "A link from the Nigerian office website does not guarantee that every advertised role, trainee intake or employee benefit is Nigeria-specific.",
  },
  "wfp-nigeria-careers": {
    source: "https://www.wfp.org/careers",
    answer: "The World Food Programme's official careers site is global and separates humanitarian employment from internship and other talent pathways. Nigeria as a country of operation does not mean a posted role is physically based in Nigeria or that an emergency programme is recruiting now.",
    steps: [
      "Open WFP's official vacancies system and filter each named advert by duty station, contract class and whether applications are still accepted.",
      "Read the exact eligibility, citizenship or national/international classification, experience and closing time before applying.",
      "Use only the UN programme's official application route, never paid intermediaries or an email claiming a guaranteed WFP assessment.",
    ],
    caveat: "The global careers home is not a Nigeria-only job listing and does not provide an active Nigeria recruitment deadline by itself.",
  },
};

export const checkedIssuerCareerSlugs20261017 = Object.keys(twentyIssuerCareerRoutes20261017);

export function applyTwentyIssuerCareerRoutes20261017(item: CareerOpportunity): CareerOpportunity {
  const review = twentyIssuerCareerRoutes20261017[item.slug];
  // Reject mismatched employer portals rather than overwriting an unrelated
  // requisition or a recently changed official route in a concurrent edit.
  if (!review || item.kind !== "career-page" || item.officialUrl !== review.source) return item;
  const sources = item.sources.map(source => source.url === review.source
    ? { ...source, lastChecked: "2026-10-17" } : source);
  if (!sources.some(source => source.url === review.source)) {
    sources.push({
      label: item.organization + " — directly reviewed official careers source",
      url: review.source,
      lastChecked: "2026-10-17",
    });
  }
  return {
    ...item,
    summary: review.answer,
    statusLabel: "Employer-wide careers information — exact openings must be verified",
    nextMilestone: review.caveat,
    applicationSteps: [
      ...review.steps,
      "Use only the specific employer-issued vacancy or programme for any actual application; preserve its confirmation, and do not pay for a shortlist or interview.",
    ],
    sourceNotes: [
      ...item.sourceNotes,
      review.caveat,
      "Specific career/application distinctions checked against this original issuer page on 17 October 2026; no application submission or live role count was tested.",
    ],
    sources,
    verifiedAt: "2026-10-17",
  };
}

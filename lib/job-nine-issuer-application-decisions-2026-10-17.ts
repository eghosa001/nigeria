import type { CareerOpportunity } from "@/lib/jobs";

// Research of existing employer-owned career instructions on 17 October 2026.
// A general careers page, candidate registration, job alert or role catalogue
// is never proof that a Nigeria-specific vacancy is open or accepting forms.
type IssuerDecision = {
  originalUrl: string;
  evidenceUrl: string;
  answer: string;
  actions: [string, string, string];
  caution: string;
};

export const nineCareerIssuerDecisions20261017: Record<string, IssuerDecision> = {
  "bcg-nigeria-careers": {
    originalUrl: "https://careers.bcg.com/global/en/locations/nigeria/",
    evidenceUrl: "https://careers.bcg.com/global/en/locations/nigeria",
    answer: "BCG Lagos describes separate Business Analyst and experienced consulting pathways. Its Nigeria Business Analyst guidance calls for at least a second-class upper degree from an accredited Nigerian university, a bachelor's degree completed within three years, and preferably completed or upcoming NYSC. These are programme-specific criteria, not eligibility for every BCG job.",
    actions: [
      "Choose the Lagos Business Analyst pathway only if its degree timing and academic criteria fit, or search for a separate experienced role rather than mixing both paths.",
      "For the Lagos application, BCG requests a resume, secondary-school certificates and university transcripts/certificates, and asks you to list Lagos as first office preference.",
      "Prepare for the possible online case experience and later case interviews; a talent newsletter signup or Nigeria office profile is not a submitted application."
    ],
    caution: "The employer page gives pathway and interview information, but does not authenticate a universally open 2026 Business Analyst intake or a vacancy-wide deadline."
  },
  "mckinsey-nigeria-careers": {
    originalUrl: "https://www.mckinsey.com/ng/careers/itua",
    evidenceUrl: "https://www.mckinsey.com/ng/careers/itua",
    answer: "McKinsey's Nigeria careers site separates consulting careers, technology work and internal professional services. Its featured Business Analyst, Junior Associate, Associate and Associate Intern labels are role categories; a featured title is not evidence that a Lagos requisition is accepting applications.",
    actions: [
      "Decide whether you are applying for consulting, technology or internal firm work; they have distinct hiring paths rather than one general Nigeria application.",
      "Students should open the linked student career route and verify the specific school, programme and deadline, while experienced applicants should search current role-level requisitions.",
      "Review McKinsey's interview-preparation material for the chosen job family and submit through the exact current job page, not the Lagos office contact page."
    ],
    caution: "The Nigeria office overview and featured career categories do not establish a current opening, salary, application deadline or completed candidate submission."
  },
  "green-africa-airways-careers": {
    originalUrl: "https://careers.greenafrica.com/",
    evidenceUrl: "https://careers.greenafrica.com/JobOpenings.html",
    answer: "Green Africa organises recruitment into distinct gPilot, gCrew, maintenance and engineering, ground services, safety, commercial and other teams. Its gFuture talent initiative is a development route and is not interchangeable with an advertised salaried pilot or cabin-crew position.",
    actions: [
      "On the airline's careers page choose the correct team: for example, a gPilot vacancy differs fundamentally from gCrew or maintenance-and-engineering roles.",
      "Read the exact advertised opening for pilot licences and hours, crew eligibility or engineering certification; do not borrow conditions from a different aviation team.",
      "Use the employer's actual careers/role application, or review gFuture separately if seeking early-career development; a team description alone cannot submit an application."
    ],
    caution: "The issuer's team index and an embedded careers widget do not prove a specific Nigeria vacancy, intake window, aircraft type requirement or guaranteed offer."
  },
  "nokia-nigeria-careers": {
    originalUrl: "https://www.nokia.com/careers/",
    evidenceUrl: "https://www.nokia.com/careers/",
    answer: "Nokia sets out an application process beginning with an online role application, CV screening, optional technical or online assessment and interviews, followed by a hiring decision. Nokia notes that interviews may run 60–90 minutes and that stages vary by job and location.",
    actions: [
      "Search Nokia's own available roles for Nigeria and the precise networks, software or business function before treating a global advertisement as a local vacancy.",
      "Use the exact role's online Apply flow with a relevant CV; prepare for an assessment only when the employer indicates one is part of that requisition.",
      "Treat an unsolicited employment offer or pre-employment payment request as suspicious: Nokia says it does not ask candidates for a financial commitment."
    ],
    caution: "Nokia's published generic interview stages are not a guarantee of a Nigeria job, interview invitation, working application form or fixed recruitment deadline."
  },
  "sap-nigeria-careers": {
    originalUrl: "https://www.sap.com/careers/",
    evidenceUrl: "https://www.sap.com/about/careers.html/",
    answer: "SAP's own careers page says jobs are moving to a new recruiting platform and that current opportunities also remain on its previous careers.sap.com system. It distinguishes structured early-career programmes, ordinary entry-level roles and experienced professional positions.",
    actions: [
      "Start from SAP's official Careers navigation, check both its current search route and the employer-linked previous careers system during the transition.",
      "Choose an actual internship, structured graduate programme, entry-level job or experienced role rather than assuming those categories share eligibility.",
      "Filter to Nigeria or the location you can legally work in, then read and submit the named requisition on SAP's linked application system; account creation is not submission."
    ],
    caution: "A recruiting-platform migration can move or close listings; neither a global role search nor an early-career category is proof of current Nigeria-specific hiring."
  },
  "google-nigeria-careers": {
    originalUrl: "https://careers.google.com/jobs/",
    evidenceUrl: "https://www.google.com/about/careers/applications/",
    answer: "Google's current official Careers navigation includes a jobs search, dedicated student information and How We Hire resources. A global search result must be checked for its individual work location, qualifications and application conditions; simply finding Google Nigeria in a directory does not demonstrate a Lagos vacancy.",
    actions: [
      "Follow Google's current employer-owned Careers jobs search and use an exact location and job-family filter rather than assuming every global result is Nigeria-based.",
      "Open the chosen Google requisition and verify the location(s), experience, job requirements and ability to apply before preparing a role-matched CV.",
      "Use the official role-specific application and Google's How We Hire resources; an account, jobs-search listing or marketing page alone is not an application acknowledgment."
    ],
    caution: "No specific Google Nigeria role, relocation support, application deadline or salary was verified by this employer-wide careers guide."
  },
  "roche-nigeria-careers": {
    originalUrl: "https://careers.roche.com/global/en/africa",
    evidenceUrl: "https://careers.roche.com/global/en/your-application",
    answer: "Roche directs candidates to its global job search by location, category, level or requisition ID. For an actual posting, Roche says applicants verify email, upload a mandatory CV, check parsed data, answer role questions where requested and submit; Candidate Home uses the same email to track the application.",
    actions: [
      "From Roche Africa navigate to current vacancies and filter for the actual Nigerian or otherwise eligible location; Africa-wide careers material does not make every African vacancy Nigeria-eligible.",
      "Use Apply Now on a named job ad, verify the email, upload a CV and correct any automatically parsed information before final submission.",
      "Use the confirmation email and same-email Workday Candidate Home to verify the submitted record; joining Roche's Talent Community or setting an alert is not applying."
    ],
    caution: "If an exact requisition ID cannot be found in Roche's search, the employer warns that it may have been unposted. Roche also warns against recruitment payments and imitation email domains."
  },
  "novartis-nigeria-careers": {
    originalUrl: "https://www.novartis.com/careers/career-search",
    evidenceUrl: "https://www.novartis.com/careers/career-hub",
    answer: "Novartis provides a role search filtered by location, business function and date posted, with separate early-career and experienced paths. Its application process runs through online application, initial screening, potential interviews and offer; country eligibility is controlled by the selected vacancy.",
    actions: [
      "Use Novartis Career Search location and function filters, then open a role with the actual intended country and duty station.",
      "Differentiate research, operations, commercial and global functions; do not treat the company-wide graduate resources as an open Nigeria intake.",
      "Apply to the named requisition and follow its screening/interview instructions; Novartis says it never charges applicants or issues offers without interviews."
    ],
    caution: "The number of worldwide jobs shown by a dynamic search is not a Nigeria job count; the general career hub supplies no uniform fixed closing date."
  },
  "johnson-johnson-nigeria-careers": {
    originalUrl: "https://www.careers.jnj.com/en",
    evidenceUrl: "https://www.careers.jnj.com/en/how-we-hire/hiring-faqs",
    answer: "Johnson & Johnson says a job application requires selecting a live vacancy, creating a Candidate Home account and submitting a CV. Its Global Talent Hub is a different registration and does not automatically send a role application; if a searched job number disappears, it is no longer active.",
    actions: [
      "Search Johnson & Johnson's current jobs by keyword and location, verifying country work authorisation and the particular company's requisition before applying.",
      "Create a Candidate Home account for the selected application; do not confuse this with an interest-only Global Talent Hub registration or job-alert subscription.",
      "After submitting, look for the email receipt. The company says submitted applications cannot be edited directly and a missing requisition number means the job is no longer active."
    ],
    caution: "J&J says visa/work permit sponsorship is unavailable in most cases unless a role says otherwise; the global job board does not guarantee a Nigeria vacancy or an individual applicant outcome."
  }
};

export const nineCareerIssuerDecisionSlugs20261017 = Object.keys(nineCareerIssuerDecisions20261017);

export function applyNineCareerIssuerDecisions20261017(item: CareerOpportunity): CareerOpportunity {
  const note = nineCareerIssuerDecisions20261017[item.slug];
  if (!note || item.kind !== "career-page" || item.status !== "career-page" ||
      item.officialUrl !== note.originalUrl) return item;
  const sources = item.sources.map(source => source.url === note.evidenceUrl
    ? { ...source, lastChecked: "2026-10-17" } : source);
  if (!sources.some(source => source.url === note.evidenceUrl)) sources.push({
    label: item.organization + " — official application and eligibility guidance",
    url: note.evidenceUrl,
    lastChecked: "2026-10-17",
  });
  return {
    ...item,
    summary: note.answer,
    statusLabel: "Employer careers guide — verify a named vacancy before applying",
    verifiedAt: "2026-10-17",
    deadline: undefined,
    applicationSteps: [
      ...note.actions,
      "Before submitting, recheck the exact issuer-owned job page for location, eligibility, deadline and a currently functioning application form.",
      "Submit only through the employer-authorised role route, retain its acknowledgement and never pay an unofficial intermediary for placement.",
    ],
    sourceNotes: [
      ...item.sourceNotes,
      note.caution,
      "Employer-owned hiring instructions reviewed 17 October 2026; no application form was submitted and no current individual Nigeria vacancy count was authenticated.",
    ],
    sources,
  };
}

import type { CareerOpportunity } from "@/lib/jobs";

// Issuer-owned career pages checked 16 October 2026. Each is a COMPANY
// DIRECTORY, not a new single vacancy. Position lists can change without
// notice; viewing an ATS page does not prove application submission.
type SourceCheck = {
  url: string;
  corroboratingUrl?: string;
  answer: string;
  steps: [string,string,string];
  followUp: [string,string];
  safety: string;
  notes: [string,string];
};
export const careerEvidence: Record<string, SourceCheck> = {
  "arm-careers": {
    url: "https://careers.arm.com.ng/",
    corroboratingUrl: "https://careers.arm.com.ng/job-opportunities/",
    answer: "ARM's own hiring site separates graduate/entry-level, experienced professional and talent-community options. Its job board recently listed Faculty Manager, CRM Specialist and Institutional Asset Management Relationship Manager in Lagos; these are examples to verify on the live board, not evergreen applications.",
    steps: ["Choose the Graduate & Entry Level or Experienced Professionals pathway before viewing vacancies; each has different selection requirements.", "Open a named position in the ARM job opportunities board and match your CV and any required cover letter to the actual responsibilities, location and role level.", "Submit through the named official listing and retain the confirmation if the form completes. ARM also describes sourcing, CV review, interview and communication as distinct stages; talent-community registration is not a job offer."],
    followUp: ["Revisit the job board to check whether the specific listed opening is still present before sharing a link with another applicant.", "If applying as an early-career candidate, verify that the destination is ARM's actual graduate route and not its experienced hire or talent-community option."],
    notes: ["ARM's issuer page separates graduate, experienced and talent-community pathways.", "The employer describes a multi-stage hiring process; a job board listing alone does not guarantee an interview."],
    safety: "A talent-pool profile and an open role are separate processes. ARM's careers homepage does not publish one universal application deadline or salary.",
  },
  "meristem-careers": {
    url: "https://careers.meristemng.com/",
    corroboratingUrl: "https://careers.meristemng.com/faqs",
    answer: "Meristem provides distinct experienced, recent-graduate and voluntary-application routes. Its October 2026 job board displayed a Business Development Officer advertisement dated 5 October alongside older Investment/Wealth Advisor notices. A dated older listing is not proof of an accepting form today.",
    steps: ["Choose an advertised position or the explicitly named Voluntary Applications path; do not treat volunteering your CV as an application for a specific vacancy.", "Open the role detail, confirm the exact Lagos/Abuja/Port Harcourt duty station and requirements, then use Apply Now for that position. Meristem's FAQ says a CV and usually a cover letter may be required.", "Keep the issuer's confirmation and follow its applicant portal or recruiting contact for status. The FAQ allows applications for multiple suitable roles; any screening/game assessment and interview are not automatic for all applicants."],
    followUp: ["If no position matches, use Voluntary Applications only as a talent expression and not an open-vacancy claim.", "For multiple suitable roles, tailor each CV and supporting cover letter separately as the employer's FAQ recommends."],
    notes: ["The employer publishes distinct experienced and early-career tracks.", "Meristem's official FAQ distinguishes the role Apply Now route from general applicant enquiries."],
    safety: "The public FAQ explains the application route, but it cannot certify that every old board record or unauthenticated apply form remains operational.",
  },
  "jumia-nigeria-careers": {
    url: "https://group.jumia.com/careers/",
    corroboratingUrl: "https://group.jumia.com/careers?location=nigeria",
    answer: "Jumia Group's global careers list includes roles in many countries. The Nigeria-filtered board displays distinct logistics, service and sales vacancies; an Egypt, Ghana, Senegal or Portugal role on the same global page is not a Nigeria vacancy.",
    steps: ["Open All opportunities and set Location to Nigeria before comparing departments and cities; use the actual named role, not a company-wide 'open now' claim.", "Check the listing's team, full-time designation and duty station, then tailor a CV around quantified results and relevant skills. Jumia's recruiting guidance asks candidates to highlight delivered achievements.", "Apply only from the individual Jumia role page; preserve any application confirmation and await employer contact. Do not send a speculative CV or payment to an address copied from social posts."],
    followUp: ["Check the location field again when the role detail loads because the global listing includes countries outside Nigeria.", "If a role disappears from the filtered board, do not continue circulating an old copied Apply link as a current opening."],
    notes: ["The official job board carries a Nigeria location filter.", "The employer's recruiting guidance emphasises achievements and quantified work outcomes in applicant CVs."],
    safety: "A search-result card is not proof that the final role form submitted; filter for Nigeria and verify the chosen job's live Apply route.",
  },
  "palmpay-nigeria-careers": {
    url: "https://palmpaylimited.applytojob.com/",
    corroboratingUrl: "https://palmpaylimited.applytojob.com/apply",
    answer: "PalmPay's employer-branded hiring board lists separate Nigeria, Philippines and Bangladesh openings. Nigerian roles cover locations and functions ranging from field sales to risk and product work; the job title alone does not establish Lagos as the duty station.",
    steps: ["Open PalmPay Limited's Current Openings board and pick a role with an explicit Nigerian city/state, not an international vacancy with a similar title.", "Select its individual listing to verify department, actual worksite, qualifications and submission route. Field Verification Officer, Dealer Manager and Loan Sales Officer posts can have different regions and expectations.", "Submit only through the employer-branded application form for the selected role; save its confirmation and do not assume that any repeated title has one nationwide opening, fee or deadline."],
    followUp: ["For field roles, confirm whether a local-government or multi-state territory is compulsory before choosing the opening.", "Do not reuse application instructions from similarly titled PalmPay posts assigned to a different state or country."],
    notes: ["The issuer-branded board includes both Nigerian and overseas openings.", "A role's state or territory is material to eligibility and must be verified on its own posting."],
    safety: "PalmPay's board spans multiple countries and repeated sales titles. Neither a general careers page nor an unauthenticated scrape proves a particular ATS form remains accepting applications.",
  },
  "cardinalstone-careers": {
    url: "https://cardinalstone.com/careers/",
    corroboratingUrl: "https://cardinalstone.com/jobs/",
    answer: "CardinalStone's Careers page describes the firm's investment-banking work culture and benefits, while its separate Job Openings archive is the place to look for named positions. The culture page itself is not a vacancy, salary schedule or application form.",
    steps: ["Use the company's Job Openings page rather than its employee testimonials to identify a current named position; inspect the job type and country/location filters.", "Open the selected description and match your investment/finance or functional experience to its actual requirements. The archive has displayed a Private Equity Investment Associate option referencing Accra and Lagos; verify which office the active listing covers.", "Follow that position's official submission instructions and retain any acknowledgement. If only the corporate Careers page is visible, mark individual applications unverified instead of inventing a recruiting address or deadline."],
    followUp: ["Confirm whether the job archive still shows the exact position before quoting it in a current vacancy guide.", "If the archive has no matching form, leave the employer directory navigable but do not create a speculative application deadline."],
    notes: ["The official Careers page is mainly company culture and staff information.", "The separately published /jobs archive is the source for specific openings, and location filters need inspection."],
    safety: "The firm's published employee testimonials are marketing material and cannot prove a specific job is open or that an advertised salary or benefit applies to all roles.",
  },
  "m-kopa-nigeria-careers": {
    url: "https://www.m-kopa.com/careers",
    answer: "M-KOPA's company careers page embeds an Ashby job board and separately offers a talent pool. Its employer office directory includes a Lagos address in Yaba, but that does not make every global or remote Ashby role a Nigeria-based opening.",
    steps: ["Use See open roles and filter the Ashby board for an explicitly Nigerian duty station and contract; do not use a Lagos office address as a job-location filter.", "Read the named opening and select its application form; verify any location, hybrid/remote requirement and qualification in the role itself instead of applying generic company benefits to it.", "If there is no suitable role, you may use the distinct talent-pool form. Saving a talent profile is not equivalent to submitting a job application or receiving an interview."],
    followUp: ["If seeking work in Lagos, verify the hiring country on the Ashby listing rather than relying on the company office directory.", "Do not assume that joining M-KOPA's talent pool results in the same acknowledgement as submitting a specific vacancy."],
    notes: ["The official page embeds an Ashby careers board.", "It also contains a separate talent pool and lists a Lagos office, neither of which proves all roles are Nigeria-based."],
    safety: "No universal role deadline, Nigerian salary or automatic hiring confirmation was established from the company-wide page.",
  },
  "pz-cussons-nigeria-careers": {
    url: "https://www.pzcussons.com/careers/jobs/",
    answer: "PZ Cussons' official vacancy finder has location filters including Aba, Ikorodu, Ilupeju and Lagos, as well as overseas positions. Its own recruitment warning says the employer never requires an application payment or banking details and that legitimate roles must appear on the site or an officially verified partner portal.",
    steps: ["Filter the employer's job board by a Nigeria location and open a specific role; do not interpret an overseas position or an agency-tagged contract as the same employment arrangement.", "Review the individual posting date, employment category and requirements before following Apply now. Older listings may have been replaced, so the search page—not copied social posts—controls the route.", "Complete the exact official form and keep confirmation. Stop and verify with PZ Cussons if anyone demands payment or bank details to proceed; the employer explicitly rejects these recruitment requests."],
    followUp: ["Use the Nigerian city and contract-type filters to distinguish factory, agency and regular employment posts.", "If a recruiter claims a new role but no matching issuer advert can be found, verify directly with PZ Cussons before disclosing sensitive data."],
    notes: ["PZ Cussons publishes a direct anti-recruitment-fraud warning.", "Its vacancy list mixes Nigeria and other countries and identifies contract categories per role."],
    safety: "The October 2026 board has shown Lagos and factory postings, but no single deadline, salary or currently valid application form can be inferred for every role.",
  },
  "polaris-bank-careers": {
    url: "https://polarisbanklimited.zohorecruit.com/jobs/Careers/",
    corroboratingUrl: "https://polarisbanklimited.zohorecruit.com/jobs/Careers/749737000010399015/Direct-Sales-Agent-Coordinator-DSA-Coordinator",
    answer: "Polaris Bank's employer-branded Zoho Recruit pages distinguish named individual openings by their dates, work experience and cities. A Direct Sales Agent Coordinator notice dated 28 September 2026 specifies Lagos and five-plus years; its page's 'In-progress' field is recruitment status, not proof that this applicant has submitted a form.",
    steps: ["Select the exact named Zoho Recruit vacancy, then check the department, job opening status, city and experience requirement on that individual page.", "Compare your profile to the listed role: the Lagos DSA Coordinator's five-plus years must not be copied to unrelated graduate or banking positions.", "Use the vacancy's own Apply control and record its response. If the form is unavailable, mark the role unverified rather than directing applicants to an unofficial email or assuming a rolling deadline."],
    followUp: ["For any new DSA or corporate banking opening, confirm the current posting date and city rather than copying details from September's example.", "If the Zoho posting says In-progress but its apply button does not work, report the application pathway as unverified."],
    notes: ["The issuer's Zoho Recruit site identifies individual roles by dates and job status.", "A posted 28 September 2026 Lagos DSA Coordinator listing calls for five-plus years' experience, not a general graduate intake."],
    safety: "The bank-wide job board is a directory; the specific role must be independently confirmed as accepting submissions before it is advertised as currently open.",
  },
  "piggyvest-careers": {
    url: "https://www.piggyvest.com/careers",
    answer: "PiggyVest's published careers page currently states 'No Open Positions'. Its listed benefits and company values are not evidence of live openings, and an old recruiter advert should not override the issuer's own vacant-roles section.",
    steps: ["Open the official Available Roles section to confirm whether it still displays No Open Positions; do not invent a new vacancy from social-media impressions.", "If a new listing appears, read its precise duties and official application method before preparing a role-specific CV. A general benefit such as healthcare does not establish an individual employment contract.", "Until a named position and application link exist, keep this page as an employer careers reference only; do not claim to have submitted a form or provide a speculative paid recruiting route."],
    followUp: ["Do not direct candidates to payment or third-party registration when the issuer has no named role.", "Recheck the role listings on a later visit; any future new role needs its own source, actual qualifications and date."],
    notes: ["The employer site displayed No Open Positions during the 16 October 2026 check.", "PiggyVest benefit descriptions and employee values do not establish a live application form."],
    safety: "Checked 16 October 2026: no open roles listed on the employer's own careers page. This is a dated observation and must be rechecked before any future live-vacancy claim.",
  },
};
export const issuerCareerReviewSlugs20261016B = Object.keys(careerEvidence);
export function applyIssuerCareerReview20261016B(item: CareerOpportunity): CareerOpportunity {
  const checked = careerEvidence[item.slug];
  if (!checked || item.kind !== "career-page" || item.officialUrl !== checked.url) return item;
  const references = [checked.url, checked.corroboratingUrl].filter((url): url is string => Boolean(url));
  const sources = [...item.sources];
  for (const url of references) {
    const index = sources.findIndex(source => source.url === url);
    if (index >= 0) sources[index] = { ...sources[index], lastChecked: "2026-10-16" };
    else sources.push({ label: item.organization + " employer career and applicant source", url, lastChecked: "2026-10-16" });
  }
  return {
    ...item,
    kind: "career-page",
    status: "career-page",
    deadline: undefined,
    nextMilestone: undefined,
    verifiedAt: "2026-10-16",
    statusLabel: "Official careers directory checked 16 October 2026 — individual openings require verification",
    summary: checked.answer,
    applicationSteps: [...checked.steps, ...checked.followUp],
    sourceNotes: [checked.safety, ...checked.notes],
    sources,
  };
}

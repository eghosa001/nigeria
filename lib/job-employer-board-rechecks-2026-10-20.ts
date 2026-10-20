import type { CareerOpportunity } from "@/lib/jobs";

/**
 * Reopened primary employer pages on 20 October 2026.
 * Each entry is a CURRENTLY DISPLAYED employer board observation, not a
 * representation that any application has been successfully submitted.
 * No universal role deadline, salary or remote eligibility is inferred.
 */
type Review = { url: string; summary: string; note: string };
const reviewedBoards: Record<string, Review> = {
  "sterling-bank-careers": {
    url: "https://sterling.ng/about/careers/jobs/",
    summary: "Sterling Bank's current-jobs board lists Salesforce Growth Champions and institutional/commercial Relationship Manager openings, with multiple Nigerian locations. Select the exact role to verify the applicable requirements and deadline; this employer directory is not one universal vacancy.",
    note: "Issuer board checked 20 October 2026: Salesforce Growth Champions, Relationship Manager – Institutional Banking and Relationship Manager – Commercial Banking appear as separate links. The board itself does not establish one closing date for them.",
  },
  "bat-nigeria-careers": {
    url: "https://careers.bat.com/en/search-jobs/nigeria/1045/1/1",
    summary: "BAT's Nigeria-filtered official jobs search lists a Sourcing Executive position in Lagos on the checked results page. This is a role search, not a guarantee of admission or a perpetual Nigeria-wide intake; verify the requisition before applying.",
    note: "Issuer jobs search checked 20 October 2026: Nigeria filter displayed one result, Sourcing Executive (Lagos). BAT warns applicants against recruitment fees and third-party scam approaches.",
  },
  "axa-mansard-careers": {
    url: "https://corporate.axamansard.com/jobs/",
    summary: "AXA Mansard's official vacancies board lists Lagos-based Risk & Internal Control Analyst, Life Reporting Officer, Head of AXA Wealth and NHIA/Public Sector Programs Officer, among others. Application requirements and actual deadlines belong to each individual listing.",
    note: "Issuer jobs board checked 20 October 2026: multiple current listings, including named investments, insurance and NHIA/public-sector roles. Relative posting-age labels are not fixed deadlines.",
  },
  "aiico-insurance-careers": {
    url: "https://www.aiicoplc.com/about-us/careers/vacancies",
    summary: "AIICO's official vacancies page lists Data Analyst and Data & Analytics Engineer roles in Lagos. They have different minimum experience and technical requirements; open the employer's individual application control rather than relying on an older Sales Officer listing.",
    note: "Issuer vacancies page checked 20 October 2026: Data Analyst calls for SQL/Power BI knowledge and roughly one–two years' experience; Data & Analytics Engineer calls for SQL/Python knowledge and roughly three–four years. No closing date was visible in the returned listing text.",
  },
  "emzor-careers": {
    url: "https://www.emzorpharma.com/job-vacancies/",
    summary: "Emzor's separate official Job Vacancies page lists quality, production, engineering, HSE and laboratory positions, while the employer warns applicants against paying recruiters. Check the named position and its own instructions; a general vacancies page is not an offer or confirmed deadline.",
    note: "Issuer Job Vacancies page checked 20 October 2026: roles include QA, ETP operations, HSE, mechanical and electrical engineering, production and quality control. Official recruitment disclaimer says no payment is requested at any stage.",
  },
};

export const verifiedEmployerBoards20261020 = Object.keys(reviewedBoards);

export function applyVerifiedEmployerBoards20261020(job: CareerOpportunity): CareerOpportunity {
  const verified = reviewedBoards[job.slug];
  if (!verified) return job;
  const links = job.sources.map(source => source.url === verified.url
    ? { ...source, lastChecked: "2026-10-20" }
    : source);
  return {
    ...job,
    officialUrl: verified.url,
    verifiedAt: "2026-10-20",
    summary: verified.summary,
    nextMilestone: "Open the exact employer-listed position and confirm its current acceptance, duties, locality and any closing date before applying.",
    // Preserve the earlier role-specific verification notes; a new issuer check\n    // should not erase the original source distinctions or depth.\n    sourceNotes: [...job.sourceNotes, verified.note],
    sources: links.some(link => link.url === verified.url)
      ? links : [...links, {
        label: job.organization + " — official careers / vacancies source",
        url: verified.url, lastChecked: "2026-10-20",
      }],
  };
}

/**
 * A completed review is limited to this exact employer board and matched
 * issuer observation. Do not clear any other employer-directory finding.
 * After 14 days it expires again until a genuine fresh source check occurs.
 */
export function hasSourceMatchedEmployerBoardReview20261020(job: CareerOpportunity, today: string): boolean {
  const review = reviewedBoards[job.slug];
  if (!review || job.kind !== "career-page" || job.status !== "career-page" ||
      job.officialUrl !== review.url || job.verifiedAt !== "2026-10-20" ||
      job.summary !== review.summary || job.deadline !== undefined ||
      !job.sourceNotes.includes(review.note) ||
      !job.sources.some(source => source.url === review.url && source.lastChecked === "2026-10-20") ||
      !job.applicationSteps.length || !job.requirements.length) return false;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(today) || today < "2026-10-20") return false;
  const elapsed = (Date.parse(today + "T00:00:00Z") - Date.parse("2026-10-20T00:00:00Z")) / 86_400_000;
  return Number.isFinite(elapsed) && elapsed >= 0 && elapsed <= 14;
}

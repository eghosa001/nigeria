import type { CareerOpportunity } from "@/lib/jobs";

// Six individual Moniepoint postings desk-checked 16 October 2026 on the
// employer's moniepoint.com/careers/roles pages. The presence of a labelled
// Apply link is not evidence a form accepted a submission, that hiring will
// stay open, or of a missing deadline/salary. An unverified role stays such.
type RoleReview = {
  greenhouseId: string;
  roleName: string;
  location: string;
  answer: string;
  steps: [string,string,string];
  limitation: string;
};
const issuerRoleEvidence: Record<string, RoleReview> = {
  "moniepoint-early-careers-talent-acquisition-specialist": {
    greenhouseId: "4981411101",
    roleName: "Early Careers Talent Acquisition Specialist",
    location: "Remote / Lagos",
    answer: "Moniepoint's named September 2026 role is a senior operator of campus partnerships, internships and graduate conversion, not a new graduate-trainee application. The advert asks for five to seven years in recruitment and shows a specific employer application link.",
    steps: ["Decide whether you have led university programmes or graduate cohort delivery; a fresh graduate seeking their first job does not meet the five-to-seven-year specialist requirement.", "Present measurable results for campus partnerships, applicant-funnel conversion, internship operations and graduate-hiring assessments.", "Read the current role page and use its own Apply link if accepting submissions; do not copy an expired graduate intake form."],
    limitation: "The employer advert describes recruiter/ATS workflows, not a general graduate scholarship or an automatically open annual cohort.",
  },
  "moniepoint-business-relationship-manager-anambra": {
    greenhouseId: "4105673101",
    roleName: "Business Relationship Manager (Anambra)",
    location: "Anambra / field-based",
    answer: "Moniepoint's named Anambra role is field-based merchant acquisition and relationship management with POS deployment and account retention. Its exact role page accepts an OND, HND or bachelor's degree and asks for two to four years of hands-on sales experience; this is not a head-office relationship-banking vacancy.",
    steps: ["Check the Anambra field territory and whether your sales experience includes merchant onboarding, fintech/payments or related direct business acquisition.", "Describe territory coverage, quantified new merchants, POS installations, account retention and the CRM tools you have actually used.", "Follow this Anambra-specific employer page's Apply control; other state BRM advertisements on the same board are separate applications."],
    limitation: "The advert names base-plus-performance pay but gives no numerical salary or universal application deadline.",
  },
  "moniepoint-talent-acquisition-specialist": {
    greenhouseId: "4056914101",
    roleName: "Talent Acquisition Specialist",
    location: "Remote / Lagos",
    answer: "Moniepoint's named Talent Acquisition Specialist role is full-lifecycle agency-and-in-house recruitment across technical and commercial positions. Its employer page requires a relevant HR/technical background and at least five years' relevant experience, unlike the separate Early Careers TA role.",
    steps: ["Distinguish this broad recruiter vacancy from the specialised graduate-programme role and check the five-year full-cycle and agency plus in-house requirements.", "Show hiring metrics, requisitions owned, technical versus business hiring, offer negotiation and experience with applicant-tracking systems.", "Follow the precise Talent Acquisition Specialist page and current Apply link; do not assume a company's general HR benefits document is an offer."],
    limitation: "The advertised process describes a recruiter call, TA technical interview, take-home assignment and executive interview; actual stages can change.",
  },
  "moniepoint-financial-planning-analyst": {
    greenhouseId: "4355709101",
    roleName: "Financial Planning Analyst",
    location: "Remote, Nigeria",
    answer: "Moniepoint's Financial Planning Analyst advert is a Group FP&A and subsidiary-support role, requiring four to six years of analysis, advanced Excel modelling and experience with multi-entity or multi-currency reporting. It is not the separate Nairobi listing for the same job family.",
    steps: ["Verify the exact Nigeria-remote posting and assess your group reporting/forecasting experience against the four-to-six-year range and accounting qualification criteria.", "Show examples of consolidation models, variance explanations, subsidiary forecasting and board-reporting packs rather than a generic finance CV.", "Use the Nigeria role's employer Apply link and check whether its form still accepts applications before assuming a confirmed submission."],
    limitation: "The page describes a recruiter call, hiring manager meeting, finance panel and executive interview; do not invent a Nigerian salary, deadline or screening date.",
  },
  "moniepoint-team-lead-site-reliability-engineering": {
    greenhouseId: "4369828101",
    roleName: "Team Lead, Site Reliability Engineering",
    location: "Lagos, Nigeria",
    answer: "Moniepoint's named Lagos SRE team-lead role owns reliability architecture, observability and incident-response standards while managing senior and associate engineers. The advert requires at least six years of SRE/backend experience including two years in a lead or senior/staff role; it is not an entry-level cloud opening.",
    steps: ["Compare the explicit six-year engineering and two-year leadership requirements to your background, then confirm that Lagos—not a global remote listing—is the job location.", "Use concrete examples of Kubernetes at scale, GCP/AWS incident reviews, service-level objectives, observability/telemetry and engineers mentored.", "Apply through the linked named Moniepoint role only; do not substitute a generic job-board search result for the live role form."],
    limitation: "Employer material mentions recruiter, manager and executive interviews; it does not establish a salary figure, fixed deadline or guaranteed next stage.",
  },
  "moniepoint-customer-experience-researcher": {
    greenhouseId: "4880701101",
    roleName: "Customer Experience Researcher",
    location: "Lagos, Nigeria",
    answer: "Moniepoint now has a named employer-hosted page for Customer Experience Researcher, describing embedded qualitative/mixed-method product discovery and four-plus years of research experience. However the original Greenhouse link previously redirected to a general board, and a surviving role-detail page alone is insufficient to confirm that the opening is still present on the active vacancy list.",
    steps: ["Compare your experience in interviews, usability studies, diary research, moderated groups and qualitative synthesis to the exact four-year and degree criteria.", "Prepare evidence of prioritised customer insights, participant recruitment and changes adopted by product teams, rather than just listing research tools.", "Look for this exact title on Moniepoint's active job board and test the page's Apply route before treating it as a currently accepting vacancy."],
    limitation: "Keep status unverified while board-level evidence or successful application-path verification is inconclusive; do not re-label as open from a stale role page.",
  },
};

export const moniepointRoleFollowups20261017: Record<string, { id: string; decision: string; action: string }> = {
  "moniepoint-early-careers-talent-acquisition-specialist": {
    "id": "4981411101",
    "decision": "This is a mid-to-senior campus-recruitment operator post requiring five to seven years of talent-acquisition work. Do not confuse it with an internship or Moniepoint's separate graduate cohort applications.",
    "action": "Check the named Early Careers TA role's Greenhouse Apply destination for an active form before submitting; the job-detail page contains no verified deadline or guaranteed rolling intake."
  },
  "moniepoint-business-relationship-manager-anambra": {
    "id": "4105673101",
    "decision": "The Anambra BRM position is commercial field acquisition, terminal deployment and merchant retention, accepting OND/HND/degree qualifications with two to four years of relevant sales experience.",
    "action": "Read the Anambra-specific state territory, salary-plus-commission wording and exact employer Apply destination; a differently located BRM advert is a separate requisition."
  },
  "moniepoint-talent-acquisition-specialist": {
    "id": "4056914101",
    "decision": "The Lagos TA Specialist role requires at least five years of full-life-cycle recruiting across technical and non-technical vacancies; it is not the same job as Early Careers TA or a Nairobi role of similar name.",
    "action": "Before submitting the exact Lagos role, prepare agency and in-house hiring evidence and check its linked Greenhouse application form; no fixed closing date was verified."
  },
  "moniepoint-financial-planning-analyst": {
    "id": "4355709101",
    "decision": "The Nigerian Group FP&A role supports consolidation, subsidiary forecasts and board reporting, with four to six years of experience and multi-entity or multi-currency analysis. It is not the Nairobi finance position.",
    "action": "Check the exact Nigeria-remote Financial Planning Analyst Apply link and prepare a concrete consolidation/forecasting example; the original issuer page does not state a universal deadline."
  },
  "moniepoint-team-lead-site-reliability-engineering": {
    "id": "4369828101",
    "decision": "The Lagos-based SRE team lead post requires six-plus years in SRE/backend engineering, including two years as a lead or senior/staff engineer, plus distributed systems and cloud/Kubernetes expertise.",
    "action": "Check the Lagos SRE team-lead page's linked application form and prepare incident/architecture and mentorship examples; an Apply control alone is not confirmation that the submission succeeds."
  },
  "moniepoint-customer-experience-researcher": {
    "id": "4880701101",
    "decision": "The Lagos CX Researcher role asks for at least four years of qualitative or mixed-methods research and continuous customer discovery within a product team; it is not an entry-level survey assistant position.",
    "action": "The original role page displays an Apply link but a historic Greenhouse redirection was observed; reconfirm the real form accepts applications before relying on this listing as open."
  }
};

export const individuallyCheckedMoniepointRoles20261016 = Object.keys(issuerRoleEvidence);

export function applyIndividualMoniepointRoleResearch20261016(item: CareerOpportunity): CareerOpportunity {
  const reviewed = issuerRoleEvidence[item.slug];
  if (!reviewed || item.kind !== "vacancy" || !item.officialUrl.includes("/jobs/" + reviewed.greenhouseId)) return item;
  const followup = moniepointRoleFollowups20261017[item.slug];
  const sourceUrl = "https://moniepoint.com/careers/roles/" + reviewed.greenhouseId;
  const sources = item.sources.filter(source => source.url !== item.officialUrl)
    .map(source => followup && source.url === sourceUrl ? {...source,lastChecked:"2026-10-17"} : source);
  if (!sources.some(source => source.url === sourceUrl)) {
    sources.push({ label: "Moniepoint Inc. — employer-hosted individual role and qualification details", url: sourceUrl, lastChecked: followup ? "2026-10-17" : "2026-10-16" });
  }
  const remainsUnverified = item.status === "unverified" || item.status === "closed";
  if (followup && !sources.some(source => source.url === "https://moniepoint.com/careers")) {
    sources.push({label:"Moniepoint original employer careers board — roles and location filters may change",url:"https://moniepoint.com/careers",lastChecked:"2026-10-17"});
  }
  return {
    ...item,
    officialUrl: sourceUrl,
    officialUrlLabel: "View this exact role on Moniepoint's official website",
    verifiedAt: followup ? "2026-10-17" : "2026-10-16",
    summary: reviewed.answer,
    statusLabel: remainsUnverified
      ? "Individual employer role page found — application availability not independently verified"
      : followup
        ? "Named employer role checked 17 October 2026 — final application acceptance and deadline unverified"
        : "Named employer role and Apply link checked 16 October 2026 — confirm form remains active",
    nextMilestone: "No employer closing date has been independently verified; check the exact listing and application form before submitting.",
    applicationSteps: [
      "Open Moniepoint's issuer-hosted " + reviewed.roleName + " page, not a general employer or job-board landing page.",
      ...reviewed.steps,
      ...(followup ? [followup.action] : [])
    ],
    sourceNotes: [
      "Employer role is specific to " + reviewed.location + "; this is not an arbitrary global or alternative-state job with the same title.",
      reviewed.limitation,
      "The employer displays an Apply entry point, but the application submission, salary amount and unannounced deadline were not tested or inferred.",
      ...(followup ? [followup.decision, "Rechecked the exact employer-hosted role details 17 October 2026; the public Apply control does not prove the external Greenhouse form accepts a completed submission or that the vacancy has a closing date."] : [])
    ],
    sources,
  };
}

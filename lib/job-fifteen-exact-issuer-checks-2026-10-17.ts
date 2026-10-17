import type { CareerOpportunity } from "@/lib/jobs";

// 15 original issuer-specific vacancy pages checked on 17 October 2026.
// Dangote/Olam/EHA showed Apply controls in their exact role pages. On a
// further exact-page check the eight FMN recruitment pages also showed Apply.
// These are dated, role-specific route observations, NOT evidence of a completed
// submission, a fixed/rolling deadline, or a guaranteed shortlist.
type ExactRoleReview = {
  issuerUrl: string;
  observedRoute: "role-detail" | "apply-control";
  primaryDetail: string;
  applicantCheck: string;
  statusDetail: string;
};

export const fifteenExactRoleReviews20261017: Record<string, ExactRoleReview> = {
  "dangote-ibese-mechanical-technician-l12-2026": {
    issuerUrl: "https://careers.dangote.com/job/Ibese-Plant-Technician%2C-Mechanical-L1%262-Ibes/820138802/",
    observedRoute: "apply-control",
    primaryDetail: "Dangote's Ibese Mechanical Technician L1 & L2 requisition is dated 10 October 2026 and shows Apply now. Its experience alternatives differ: SSCE plus ten years, Trade Test I plus eight years, Trade Test II plus sixteen years, or OND Mechanical Engineering plus two years of relevant work.",
    applicantCheck: "Check which of Dangote's four published qualification-and-experience routes you actually meet; trade-test levels are not interchangeable and work is at the Ibese cement plant.",
    statusDetail: "The original role page displayed Apply now on 17 October 2026. No employer-defined closing date was established; this is not evidence of permanent or rolling hiring.",
  },
  "dangote-ibese-power-plant-mechanical-engineer-2026": {
    issuerUrl: "https://careers.dangote.com/job/Ibese-Plant-Mechanical-Engineer-Power-Plant-Ibes/820440602/",
    observedRoute: "apply-control",
    primaryDetail: "Dangote's 7 October 2026 Ibese Power Plant Mechanical Engineer notice describes gas-turbine preventive, predictive and corrective maintenance, overhaul planning, turbine swaps and 4,000-hour inspections.",
    applicantCheck: "Compare your actual power-generation, gas turbine and mechanical maintenance experience against the Ibese role, not a similarly titled general cement-plant engineering vacancy.",
    statusDetail: "The employer's exact requisition was still displayed with Apply now at the 17 October review; an expiry date or rolling intake was not published.",
  },
  "dangote-lagos-audit-analyst-2026": {
    issuerUrl: "https://careers.dangote.com/job/Head-Office-Lagos-Audit-Analyst-Head/1374485457/",
    observedRoute: "apply-control",
    primaryDetail: "Dangote's Lagos Head Office Audit Analyst notice is dated 9 October 2026. It requires a degree or HND in Accounting or related field and at least three years of financial/operational audit experience; CIA, ICAN, ACCA or CPA qualifications are listed as advantages rather than universal compulsory licences.",
    applicantCheck: "Prepare examples of financial-statement analysis, internal controls, audit reporting and operational-risk findings; do not mistake this Head Office Lagos role for a manufacturing maintenance opening in Ibese.",
    statusDetail: "The issuer's role page displays the application route, but no dated closing deadline or permanent open-recruitment policy was verified on 17 October.",
  },
  "olam-caraway-planning-manager-nigeria-2026": {
    issuerUrl: "https://careers.olamgroup.com/job/OKFOOD-1/1056677366/",
    observedRoute: "apply-control",
    primaryDetail: "Olam International's Caraway Nigeria Planning Manager requisition, dated 4 October 2026, is focused on biscuits, confectionery and snacks supply planning. It requests a B.Sc. in Engineering, a minimum of ten years' relevant supply-chain experience and knowledge of SAP/ERP; an M.Sc. or MBA is preferred, not universally mandatory.",
    applicantCheck: "Match your ten years of demand planning, material planning, inventory or S&OP experience against the role's manufacturing requirements; it is not an entry-level warehouse job.",
    statusDetail: "Olam's original requisition shows Apply now, but it does not establish a public closing date; do not describe the opening as an unlimited rolling application.",
  },
  "fmn-golden-penny-power-electrical-maintenance-manager-apapa-2026": {
    issuerUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12737",
    observedRoute: "apply-control",
    primaryDetail: "FMN's Golden Penny Power Apapa Electrical Plant Maintenance Manager record requests B.Sc./HND Electrical Engineering, experience with 11 kV switchgear and protection, and at least five years' relevant experience. COREN membership is an advantage.",
    applicantCheck: "Check electrical plant maintenance, switchgear protection and scheduling experience; this is a Power Plant electrical role rather than an FMN milling production vacancy.",
    statusDetail: "The original detailed job description was retrievable on 17 October; the public record did not verify a closing deadline or successful submission of an application.",
  },
  "fmn-logistics-b2b-despatch-manager-lagos-2026": {
    issuerUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12692",
    observedRoute: "apply-control",
    primaryDetail: "FMN's Logistics B2B Despatch Manager record requires a relevant bachelor's degree, at least five years of logistics, dispatch or supply-chain experience, and a logistics, transport-management or supply-chain certification.",
    applicantCheck: "Distinguish the manager's fleet oversight and route optimisation duties from the separate Assistant Despatch Manager role, which has a lower minimum experience threshold.",
    statusDetail: "An FMN requisition detail page is accessible, but that does not prove an unexpired application window; no official closing date was verified.",
  },
  "fmn-logistics-b2b-assistant-despatch-manager-lagos-2026": {
    issuerUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12691",
    observedRoute: "apply-control",
    primaryDetail: "FMN's B2B Assistant Despatch Manager advert asks for a bachelor's degree in logistics, supply chain, business or a related field and at least three years of dispatch or supply-chain experience; FMCG/manufacturing experience is an advantage.",
    applicantCheck: "Prepare examples of truck allocation, customer delivery schedules, loadout reporting and reducing demurrage; the three-year minimum must not be replaced by the distinct five-year Despatch Manager rule.",
    statusDetail: "Original FMN vacancy detail was checked, but the closing date and ability to finish an application were not independently confirmed.",
  },
  "fmn-honeywell-assistant-maintenance-planning-manager-apapa-2026": {
    issuerUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12752",
    observedRoute: "apply-control",
    primaryDetail: "FMN's Honeywell Flour Mills Assistant Maintenance Manager, Planning B2B in Apapa focuses on Microsoft Dynamics 365 maintenance work orders, technical job packages, spares planning and backlog records. Its advert lists three years of maintenance experience in manufacturing.",
    applicantCheck: "Identify actual D365/CMMS work-order and maintenance planning competence; an engineering diploma or degree, not a generic business-management degree, is requested by the source.",
    statusDetail: "The issuer's full job description was retrieved on 17 October. A currently accepted form submission or public closing date was not independently demonstrated.",
  },
  "fmn-golden-penny-power-diesel-mechanic-apapa-2026": {
    issuerUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12739",
    observedRoute: "apply-control",
    primaryDetail: "FMN's Golden Penny Power Diesel Mechanic role in Apapa covers diesel/gas generator servicing, power changeovers and fault diagnosis. The record asks for five O-level credits including Mathematics and English or recognised technical certificates, with two years of relevant experience.",
    applicantCheck: "Verify your generator maintenance and changeover-panel experience; the Electrical or Mechanical Plant Maintenance Manager's five-year degree-level conditions are not the requirements for this technician role.",
    statusDetail: "The detailed FMN original job record was available, but no fixed deadline or completed-application acceptance was verified.",
  },
  "fmn-technical-auto-electrician-apapa-2026": {
    issuerUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12736",
    observedRoute: "apply-control",
    primaryDetail: "FMN's Apapa Auto Electrician role focuses on forklifts, starter motors, alternators, mobile equipment batteries and preventative maintenance; the issuer specifies technical certificates or five O-level credits, with at least two years of electrical-maintenance experience.",
    applicantCheck: "Prepare evidence of fault-finding on forklifts and mobile equipment, not power-station high-voltage switchgear responsibilities from a different FMN vacancy.",
    statusDetail: "FMN's original job details were accessible, but no current deadline or completed Apply flow was independently verified.",
  },
  "fmn-golden-penny-power-mechanical-maintenance-manager-apapa-2026": {
    issuerUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12738",
    observedRoute: "apply-control",
    primaryDetail: "FMN's Golden Penny Power Mechanical Maintenance Manager in Apapa requests a B.Sc. or HND in Mechanical Engineering and at least five years' cognate experience in plant machinery, preventative maintenance and downtime reduction.",
    applicantCheck: "Contrast this role's mechanical plant assets and spare-parts planning with the separately listed Electrical Plant Maintenance Manager's switchgear-protection requirements.",
    statusDetail: "The source job-description page was available on 17 October, but that alone does not verify a still-open submission window or closing date.",
  },
  "fmn-desktop-support-officer-sunti-oct-2026": {
    issuerUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12751",
    observedRoute: "apply-control",
    primaryDetail: "FMN's Sunti Desktop Support Officer advert asks for OND or equivalent in computer science, IT, computer engineering or a related discipline and at least one year of relevant desktop/IT support experience.",
    applicantCheck: "Check real experience supporting end-user devices, patches, incident escalation, peripherals and network troubleshooting; this is an IT role at Sunti, not a support-desk posting in Lagos.",
    statusDetail: "The official FMN requisition content was retrieved; the site did not prove an exact application deadline or successful submission as of 17 October.",
  },
  "eha-registered-nurse-yaba-lagos-2026": {
    issuerUrl: "https://erp.eha.ng/jobs/registered-nurse-yaba-lagos-1011",
    observedRoute: "apply-control",
    primaryDetail: "EHA Clinics' Yaba Lagos Registered Nurse page asks for a current Nigerian nursing practice licence, clinical practice in at least two of the last three years and three years of postgraduate nursing experience at an accredited teaching or major hospital. The eligibility form asks about licence validity and basic computer knowledge.",
    applicantCheck: "Confirm your current nursing licence and clinical experience before answering the original EHA eligibility questions; the job can involve scheduled home-care visits, not solely desk-based clinic work.",
    statusDetail: "The original EHA eligibility and Apply Now interface was visible at the 17 October review, but a fixed closing deadline is not published there.",
  },
  "eha-medical-doctor-abuja-2026": {
    issuerUrl: "https://erp.eha.ng/jobs/medical-doctor-abuja-549",
    observedRoute: "apply-control",
    primaryDetail: "EHA Clinics' Medical Doctor vacancy locates the role at Lifecamp, Abuja and publishes NGN 355,600 gross monthly remuneration, alongside separate health coverage, performance-bonus and 13th-month benefits.",
    applicantCheck: "Read the employer's clinical responsibilities and any medical registration, experience or shift conditions within this exact medical-doctor record; do not assume its compensation matches a different EHA nurse or pharmacist position.",
    statusDetail: "The employer-specific doctor recruitment page remained visible on 17 October, but no closing date or final applicant submission result was independently established.",
  },
  "eha-pharmacist-abuja-2026": {
    issuerUrl: "https://erp.eha.ng/jobs/pharmacist-546",
    observedRoute: "apply-control",
    primaryDetail: "EHA Clinics' Abuja Pharmacist vacancy names Lugbe or Asba as the work area and publishes NGN 181,440 gross monthly pay, plus separate health coverage, a possible bonus and 13th-month benefits. The source requires a pharmacy degree, a valid PCN practice licence and at least two years of post-NYSC pharmacy experience.",
    applicantCheck: "Reconcile your PCN registration, current licence and years of post-NYSC experience with the employer's exact Pharmacist notice; do not reuse the Abuja Medical Doctor's higher advertised salary.",
    statusDetail: "The original EHA Pharmacist role page was retrievable on 17 October, without an independently verified final application deadline or completed submission.",
  },
};

// The first twelve employer requisitions already have a distinct 16 October
// verification contract. Add today's source observations without rewriting the
// historical check dates that other validations explicitly rely on.
const priorVerifiedIssuerSlugs20261016 = new Set([
  "dangote-ibese-mechanical-technician-l12-2026",
  "dangote-ibese-power-plant-mechanical-engineer-2026",
  "dangote-lagos-audit-analyst-2026",
  "olam-caraway-planning-manager-nigeria-2026",
  "fmn-golden-penny-power-electrical-maintenance-manager-apapa-2026",
  "fmn-logistics-b2b-despatch-manager-lagos-2026",
  "fmn-logistics-b2b-assistant-despatch-manager-lagos-2026",
  "fmn-honeywell-assistant-maintenance-planning-manager-apapa-2026",
  "fmn-golden-penny-power-diesel-mechanic-apapa-2026",
  "fmn-technical-auto-electrician-apapa-2026",
  "fmn-golden-penny-power-mechanical-maintenance-manager-apapa-2026",
  "fmn-desktop-support-officer-sunti-oct-2026",
]);

export const reviewedExactRoleSlugs20261017 = Object.keys(fifteenExactRoleReviews20261017);

/**
 * Dated issuer-page proof that the specific vacancy still offered an Apply
 * entry point but published no closing day. This resolves *only* the
 * unsupported assumption that a missing date necessarily means rolling
 * recruitment. It must never authorize JobPosting metadata, promise successful
 * submission, or silence separate missing-post-date/provenance findings.
 *
 * Fail closed if the original source, exact applicant guidance, observed
 * application route, published caution, review date, or open status changes.
 */
export function hasVerifiedUndatedRoleApplicationReview20261017(item: CareerOpportunity, now: string): boolean {
  const proof = fifteenExactRoleReviews20261017[item.slug];
  if (!proof || proof.observedRoute !== "apply-control" ||
      item.kind !== "vacancy" || item.status !== "open" ||
      item.deadline || item.officialUrl !== proof.issuerUrl ||
      item.statusLabel !== "Exact employer application route checked 17 Oct; no deadline published" ||
      item.nextMilestone !== proof.statusDetail) return false;

  const recent = (date: string): boolean => {
    if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(date) || !/^\\d{4}-\\d{2}-\\d{2}$/.test(now) ||
        date > now) return false;
    const checked = Date.parse(date + "T00:00:00Z");
    const today = Date.parse(now + "T00:00:00Z");
    return Number.isFinite(checked) && Number.isFinite(today) &&
      today >= checked && (today - checked) / 86400000 <= 14;
  };

  return recent(item.verifiedAt) &&
    item.sources.some(source => source.url === proof.issuerUrl && recent(source.lastChecked)) &&
    item.sourceNotes.includes(proof.primaryDetail) &&
    item.sourceNotes.includes(proof.statusDetail) &&
    item.sourceNotes.some(note => note.includes(
      "Evidence dated 17 October 2026 is a desk check of the exact original employer page")) &&
    item.applicationSteps.includes(proof.applicantCheck) &&
    item.applicationSteps.some(step => step.includes(
      "stop if the named vacancy or employer's actual Apply route is no longer accepting applicants"));
}

export function applyFifteenExactRoleChecks20261017(job: CareerOpportunity): CareerOpportunity {
  const review = fifteenExactRoleReviews20261017[job.slug];
  if (!review || job.kind !== "vacancy" || job.status !== "open" || job.officialUrl !== review.issuerUrl) return job;
  // We only reconfirm the original issuer link and observed source content:
  // never invent a deadline, extend a recruitment window or assert that an
  // employer promised rolling hiring merely because a page is still online.
  return {
    ...job,
    verifiedAt: priorVerifiedIssuerSlugs20261016.has(job.slug) ? job.verifiedAt : "2026-10-17",
    statusLabel: review.observedRoute === "apply-control"
      ? "Exact employer application route checked 17 Oct; no deadline published"
      : "Issuer vacancy details checked 17 Oct; application deadline unverified",
    nextMilestone: review.statusDetail,
    applicationSteps: [
      ...job.applicationSteps.filter(step => !/rolling|guaranteed|automatic acceptance/i.test(step)),
      review.applicantCheck,
      "Open this exact issuer requisition again immediately before applying; stop if the named vacancy or employer's actual Apply route is no longer accepting applicants.",
    ],
    sourceNotes: [
      ...job.sourceNotes,
      review.primaryDetail,
      review.statusDetail,
      "Evidence dated 17 October 2026 is a desk check of the exact original employer page, not a test of user sign-in, form submission or appointment. No public closing date or rolling-intake promise was established.",
    ],
    sources: job.sources.map(source =>
      source.url === review.issuerUrl && !priorVerifiedIssuerSlugs20261016.has(job.slug)
        ? { ...source, lastChecked: "2026-10-17" } : source),
  };
}

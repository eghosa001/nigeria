import type { CareerOpportunity } from "@/lib/jobs";

// Individual issuer pages checked 16 October 2026. This confirms advertised
// duties and an Apply entry point, NOT authenticated form submission, interview
// availability, salary, an unannounced deadline, or a promise of hiring.
const checkedJobs20261016: Record<string, {
  sourceUrl: string; prepare: string; criteria: string; note: string;
}> = {
  "fmn-honeywell-assistant-maintenance-planning-manager-apapa-2026": {
    sourceUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12752",
    prepare: "planning work orders in Dynamics 365, backlog prioritisation and spares coordination",
    criteria: "compare your engineering qualification, three manufacturing-maintenance years and formal planning/CMMS training with the employer's education section",
    note: "The employer distinguishes three years of maintenance experience from its separately listed engineering and planning credentials; COREN/NSE membership is described as advantageous.",
  },
  "fmn-desktop-support-officer-sunti-oct-2026": {
    sourceUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12751",
    prepare: "help-desk incident resolution, endpoint patching and hardware support",
    criteria: "check the OND or equivalent computing qualification and at least one year of relevant IT support work",
    note: "The Sunti desktop-support post specifies an OND or equivalent and one year of experience; it is not a general software-development graduate programme.",
  },
  "fmn-golden-penny-power-diesel-mechanic-apapa-2026": {
    sourceUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12739",
    prepare: "diesel and gas generator repairs, power changeovers and preventive maintenance",
    criteria: "compare five O-level credits including Maths/English OR accepted technical certification, plus two years of relevant experience",
    note: "The diesel-mechanic advert lists technical-certification alternatives to its O-level route and expressly concerns factory generators, not vehicle-only servicing.",
  },
  "fmn-golden-penny-power-mechanical-maintenance-manager-apapa-2026": {
    sourceUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12738",
    prepare: "mechanical plant reliability, maintenance scheduling, spares planning and root-cause work",
    criteria: "verify B.Sc./HND Mechanical Engineering and five years of relevant maintenance experience",
    note: "FMN's mechanical maintenance manager role includes downtime reduction, technician development and third-party repair supervision; it is distinct from the electrical manager vacancy.",
  },
  "fmn-golden-penny-power-electrical-maintenance-manager-apapa-2026": {
    sourceUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12737",
    prepare: "11 kV switchgear/protection experience, overhaul planning and predictive electrical maintenance",
    criteria: "check B.Sc./HND Electrical Engineering and five years of relevant work; COREN is an advantage, not an absolute requirement",
    note: "The electrical manager advert names 11 kV protection experience and describes COREN membership as an added advantage; do not confuse it with the separately published mechanical manager role.",
  },
  "fmn-technical-auto-electrician-apapa-2026": {
    sourceUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12736",
    prepare: "forklift electrical diagnostics, battery checks, starter motors and alternators",
    criteria: "compare the stated O-level or alternative technical-certification route and two years of relevant electrical-maintenance work",
    note: "The auto-electrician role concerns forklifts and mobile factory equipment, with accepted technical-certificate alternatives to O-level credentials; it is not a generic automobile wiring internship.",
  },
  "fmn-logistics-b2b-despatch-manager-lagos-2026": {
    sourceUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12692",
    prepare: "dispatch-team leadership, route optimisation, fleet compliance and cost control",
    criteria: "check the relevant bachelor's degree, five years' experience and REQUIRED logistics, transport or supply-chain certification",
    note: "The Despatch Manager notice requires a logistics/transport/supply-chain certificate; separate fleet-management certification is only an added advantage.",
  },
  "fmn-logistics-b2b-assistant-despatch-manager-lagos-2026": {
    sourceUrl: "https://fmnplc.e-recruiter.ng/vacancy/details/12691",
    prepare: "transporter allocation, delivery loadout reports and preventing truck demurrage",
    criteria: "verify the relevant bachelor's degree and three years of logistics experience; FMCG experience is only an advantage",
    note: "Unlike the Despatch Manager advert, this assistant-manager notice does not establish the same compulsory professional certification; applicants should not conflate the roles.",
  },
  "dangote-ibese-mechanical-technician-l12-2026": {
    sourceUrl: "https://careers.dangote.com/job/Ibese-Plant-Technician%2C-Mechanical-L1%262-Ibes/820138802/",
    prepare: "cement-plant equipment troubleshooting, SAP work orders and scheduled maintenance",
    criteria: "choose one eligible route: OND Mechanical + 2 years, SSCE + 10 years, Trade Test I + 8 years or Trade Test II + 16 years",
    note: "Dangote's four education-and-experience routes are ALTERNATIVES, not cumulative; applicants should specify which one they actually satisfy.",
  },
  "dangote-ibese-power-plant-mechanical-engineer-2026": {
    sourceUrl: "https://careers.dangote.com/job/Ibese-Plant-Mechanical-Engineer-Power-Plant-Ibes/820440602/",
    prepare: "gas-turbine preventive/predictive maintenance, 4,000-hour inspections and SAP planning",
    criteria: "compare Mechanical Engineering bachelor's/HND with the employer's published six-to-eight-year industrial experience range",
    note: "Dangote's plant-engineering notice names gas turbines and power-plant maintenance; applicants should not mistake it for the mechanical technician advert.",
  },
  "dangote-lagos-audit-analyst-2026": {
    sourceUrl: "https://careers.dangote.com/job/Head-Office-Lagos-Audit-Analyst-Head/1374485457/",
    prepare: "financial/operational audit findings, internal controls and budget analysis",
    criteria: "check Accounting or related B.Sc./HND and three years of audit experience; CIA, ICAN, ACCA, CPA or MBA are optional advantages",
    note: "Dangote explicitly treats relevant professional memberships and postgraduate degrees as added advantages; the core Audit Analyst qualification is the degree/HND plus audit experience.",
  },
  "olam-caraway-planning-manager-nigeria-2026": {
    sourceUrl: "https://careers.olamgroup.com/job/OKFOOD-1/1056677366/",
    prepare: "materials requirements planning, S&OP, forecasting accuracy, stock policy and ERP/SAP",
    criteria: "verify B.Sc. Engineering, ten years' supply-chain experience and ERP competence; MBA/M.Sc. and Lean/Six Sigma/TPM are preferred",
    note: "Olam's Planning Manager covers Caraway biscuits, confectionery and snacks planning; its site says applicants must complete all application steps and attach a CV.",
  },
};

export const verifiedJobSlugs20261016 = Object.keys(checkedJobs20261016);

export function applyVerifiedJobPaths20261016(item: CareerOpportunity): CareerOpportunity {
  const checked = checkedJobs20261016[item.slug];
  if (!checked || item.kind !== "vacancy" || item.status !== "open" || item.officialUrl !== checked.sourceUrl) return item;
  const fmn = checked.sourceUrl.startsWith("https://fmnplc.e-recruiter.ng/");
  const employer = fmn ? "FMN e-recruiter" : checked.sourceUrl.includes("dangote.com") ? "Dangote careers" : "Olam careers";
  const howToApplyUrl = fmn ? "https://fmnplc.e-recruiter.ng/" : checked.sourceUrl;
  const applicationSteps = [
    `Open the exact ${employer} role page linked above. Check the job title, location and current Apply action; do not submit a general expression of interest as if it were this vacancy.`,
    `Before applying, ${checked.criteria}.`,
    `Prepare concrete examples of ${checked.prepare}; use accurate dates and responsibilities from your own work, not copied vacancy language.`,
    ...(fmn ? [
      "FMN requires an applicant registration and login ID/password. Use the registration route linked by its official e-recruiter, rather than sending a CV to an informal recruiter.",
      "Complete the required FMN CV sections — Personal Details, Computer Exposure, Tertiary Education and Referee — in your candidate account before attempting the role-specific application."
    ] : []),
    fmn
      ? "Return to this exact vacancy and use its View / Apply control with your own login. Retain the application acknowledgement; a public vacancy page alone cannot prove your submission was accepted."
      : "Use the employer's own Apply now control, complete its required application and save the acknowledgement. A login redirect is not independent proof that a submission was completed."
  ];
  return {
    ...item,
    verifiedAt: "2026-10-16",
    statusLabel: `Role-specific Apply route checked 16 October 2026 — ${employer}`,
    nextMilestone: `The employer's specific vacancy still showed an Apply route on 16 October 2026. No official closing date was established for this record. Reconfirm the exact posting before entering personal details; authenticated submission was not tested.`,
    applicationSteps,
    sourceNotes: [...item.sourceNotes, checked.note],
    sources: [
      ...item.sources.map((source) => source.url === checked.sourceUrl
        ? { ...source, lastChecked: "2026-10-16" } : source),
      ...(fmn && !item.sources.some(source => source.url === howToApplyUrl)
        ? [{ label: "FMN official registration and CV application instructions", url: howToApplyUrl, lastChecked: "2026-10-16" }] : []),
    ],
  };
}

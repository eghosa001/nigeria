import type { Service } from "@/lib/types";

export type RequirementKind =
  | "Document"
  | "Identity / account detail"
  | "Payment / transaction evidence"
  | "Eligibility / prerequisite"
  | "Other requirement";

export type RequirementDetail = {
  item: string;
  kind: RequirementKind;
  why: string;
  whenUsed: string;
  format: string;
};

const stopWords = new Set([
  "with", "from", "that", "this", "your", "valid", "current", "official", "required",
  "where", "applicant", "candidate", "details", "document", "documents", "service",
]);

function tokens(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 3 && !stopWords.has(token));
}

function matchingStep(service: Service, item: string) {
  const words = tokens(item);
  let bestIndex = -1;
  let bestScore = 0;

  service.steps.forEach((step, index) => {
    const text = step.toLowerCase();
    const score = words.reduce((total, word) => total + (text.includes(word) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  return bestScore > 0 ? { index: bestIndex, step: service.steps[bestIndex] } : undefined;
}

function kindFor(item: string): RequirementKind {
  if (/payment|receipt|transaction|remita|rrr|fee evidence/i.test(item)) return "Payment / transaction evidence";
  if (/passport|certificate|slip|letter|affidavit|publication|photograph|photo|report|statement|extract|form|card|licen[cs]e|transcript|result|birth record|declaration|proof|identification|\bID\b/i.test(item)) return "Document";
  if (/\bNIN\b|\bBVN\b|email|phone|gsm|number|code|pin|e-pin|serial|matric|account|username|password|reference|date of birth|\bDOB\b|address/i.test(item)) return "Identity / account detail";
  if (/training|school|senate|list|eligib|qualification|enrol|registration|approval|accredited|citizen|resident|sponsor|institution|age requirement/i.test(item)) return "Eligibility / prerequisite";
  return "Other requirement";
}

function purposeFor(item: string) {
  if (/\bNIN\b/i.test(item)) return "Used to match the applicant to the National Identity Database or to verify NIN-linked biodata where this service requires identity matching.";
  if (/\bBVN\b/i.test(item)) return "Used to identify the banking identity record connected to this request.";
  if (/photograph|passport[- ]?(?:size[d]?[- ]?)?photos?|photos?\b|pictures?/i.test(item)) return "A photograph is listed for this service. Check the responsible agency’s instructions for the number, size, background and whether to submit printed copies or digital files.";
  if (/passport/i.test(item)) return "Used to identify the applicant's current passport record or to support the passport transaction described in this guide.";
  if (/birth certificate|birth record|declaration of age/i.test(item)) return "Used as civil evidence of birth or date of birth where the responsible agency lists it for this process.";
  if (/affidavit/i.test(item)) return "Used as sworn evidence for the loss, correction or change described in this service where the agency requires an affidavit.";
  if (/newspaper publication/i.test(item)) return "Used as publication evidence where the agency includes public notice in a name or data-change process.";

  if (/email/i.test(item)) return "Used for account access and/or official communication. Use an address you can open throughout the process.";
  if (/phone|gsm|sim|mobile number/i.test(item)) return "Used for SMS, OTP, recovery or account identification where this service relies on a mobile number. Use a number you control.";
  if (/profile code/i.test(item)) return "Used by JAMB to identify the candidate profile before e-PIN purchase and registration.";
  if (/e-?pin/i.test(item)) return "Used to authorise or continue the specific JAMB/agency transaction linked to this guide.";
  if (/examination number|exam number|examination year|exam year|examination type/i.test(item)) return "Used to locate the correct examination record before a result or certificate service can proceed.";
  if (/serial/i.test(item) && /waec|result|checker/i.test(item)) return "Used with the result-checking credential to locate and authorise access to the correct result.";
  if (/matric/i.test(item)) return "Used to match the graduate or student to the institution record submitted for this process.";
  if (/driving school|driving-school/i.test(item)) return "Used to prove completion of the prerequisite driving-school stage for the fresh licence process.";
  if (/registration number|entity number|company number|business number/i.test(item)) return "Used to locate the exact registered entity or application record.";
  if (/tax id|tin|asin|payer id/i.test(item)) return "Used to locate the taxpayer record connected to the transaction.";
  if (/receipt|payment reference|transaction reference|rrr/i.test(item)) return "Used to prove or trace the official payment if the transaction needs confirmation or support.";
  if (/certificate/i.test(item)) return "Used as documentary evidence for the qualification, status or civil fact relevant to this service.";
  if (/letter/i.test(item)) return "Used as formal written evidence or request where the responsible agency lists a letter among the requirements.";
  if (/result/i.test(item)) return "Used as evidence of the examination or qualification record relevant to this service.";
  if (/account|username|password/i.test(item)) return "Used to access the official portal or the applicant's existing record.";
  if (/reference|number|code|pin/i.test(item)) return "Used to identify or trace the correct application, record or transaction.";
  return "This item is explicitly listed in the verified pre-start requirements for this service. Have it ready before beginning so the application is not interrupted.";
}

function formatFor(item: string, step?: string, stepNumber?: number) {
  const combined = (item + " " + (step ?? "")).toLowerCase();
  if (/original/.test(combined)) return "Original is explicitly referenced in the guide. Take the original to the relevant verification or physical stage.";
  if (/photocopy|copy of|copies/.test(combined)) return "A copy/photocopy is explicitly referenced in the guide. Keep the source document available as well.";
  if (/upload/.test(combined) && stepNumber) return "A digital upload is explicitly part of step " + stepNumber + ". Prepare a clear file that follows the portal's size/format rules.";
  if (/print|printed/.test(combined) && stepNumber) return "A printed item is explicitly referenced in step " + stepNumber + ". Keep the printout legible and complete.";
  if (/bring|take|present|attend|visit/.test(step ?? "") && stepNumber) return "This is used during the physical stage described in step " + stepNumber + ".";
  return "The official sources used for this guide do not specify original vs copy here. Follow the exact portal or office prompt instead of assuming.";
}

export function getRequirementDetails(service: Service): RequirementDetail[] {
  return service.requirements.map((item) => {
    const match = matchingStep(service, item);
    const whenUsed = match
      ? "Most directly connected to step " + (match.index + 1) + ": " + match.step
      : "Keep this ready before starting. The verified guide lists it as a prerequisite even though the official source does not tie it to one numbered step.";

    return {
      item,
      kind: kindFor(item),
      why: purposeFor(item),
      whenUsed,
      format: formatFor(item, match?.step, match ? match.index + 1 : undefined),
    };
  });
}

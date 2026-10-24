import type { Service } from "@/lib/types";

export type StepDetail = {
  stage: string;
  instruction: string;
  prepare: string[];
  checkpoint?: string;
  keep?: string;
};

// Requirements already have a dedicated, source-backed checklist.
// Do not derive "have ready" claims from keyword similarity: several
// unrelated steps share words such as identity, record and application.
// Mentioning an office or booking biometrics online is not itself a physical visit.
function isPhysicalAction(step: string) {
  return /\b(?:attend|visit|report to|appear at|go to|present at)\b.{0,90}\b(?:office|centre|center|branch|embassy|consulate|camp|school|institution)\b/i.test(step)
    || /\b(?:undergo|give|capture|submit)\b.{0,60}\b(?:biometrics?|fingerprints?)\b/i.test(step)
    || /\b(?:collect|pick up|submit|deliver|present)\b.{0,80}\b(?:at|from|to)\s+(?:(?:the|an?|selected|designated|local|nearest)\s+){0,3}(?:office|centre|center|branch|embassy|consulate|school|institution)\b/i.test(step);
}

// A step's heading describes the action, not nouns it happens to mention.
// An RRR, receipt, payment status, fee schedule or reference number is not
// itself a request to make a payment. Apply the same test to every service.
export function isPaymentAction(step: string) {
  // Remove stand-alone warnings that prohibit payment before looking for an
  // actual payment instruction. These are especially common on scam and
  // refund guides; "never pay an agent" must not become a Payment step.
  const action = step
    .replace(/\b(?:do not|don't|never|avoid|without)\s+(?:ever\s+)?pay(?:ing)?\b[^.!?;]*/gi, "")
    .replace(/\b(?:do not|don't|never|avoid)\s+(?:make|complete|process|submit|initiate)\s+(?:(?:a|the|any)\s+)?payment\b[^.!?;]*/gi, "");
  return /\b(?:pay|paying)\b(?!\s+attention\b)/i.test(action)
    || /\b(?:make|complete|proceed to|process|settle|submit|initiate)\s+(?:(?:the|an?|your|required|official|applicable|registration|application|remaining)\s+){0,4}(?:payment|fee|charge)\b(?!\s+(?:status|reference|number|receipt|evidence|proof|confirmation|details|record|history|code)\b)/i.test(action)
    || /\bcheckout\b|\b(?:payment|fee)\s+(?:checkout|gateway|screen)\b.*\b(?:proceed|complete|pay)\b/i.test(action);
}

function isUploadAction(step: string) {
  return /\b(?:upload|attach|scan and upload|submit|provide)\b.{0,80}\b(?:document|file|photo|photograph|evidence|attachment|certificate|affidavit|scan)\b/i.test(step)
    || /\b(?:upload|attach)\b/i.test(step);
}

function isTrackingAction(step: string) {
  return /\b(?:track|monitor|follow[ -]?up|wait for|check (?:the |your |an? )?(?:application |payment |transaction |request |refund |transfer )?status|check progress|await (?:the |an? )?(?:approval|decision))\b/i.test(step);
}

function stageFor(step: string, index: number) {
  if (/\b(?:download|print|receive|issued)\b|\bcollect (?:the |your )?(?:slip|certificate|card|document|result)\b/i.test(step)) return "Collect / finish";
  if (isPhysicalAction(step)) return "Physical / assisted stage";
  if (isPaymentAction(step)) return "Payment";
  if (isUploadAction(step)) return "Documents / upload";
  if (isTrackingAction(step)) return "Follow up";
  if (/\b(?:verify|confirm|review|check|match|compare|enter|type|supply|locate|find|retrieve)\b/i.test(step)) return "Verify details";
  if (/\b(?:submit|send|apply|request|register|file|enrol)\b/i.test(step)) return "Submit / register";
  if (/\b(?:sign in|login|log in|create account|open|start)\b/i.test(step)) return "Start";
  return index === 0 ? "Start" : "Continue";
}

// Safety hints require an explicit process action, not a passing mention
// of fees, documents or SIMs that creates inferred requirements.
function checkpointFor(step: string, stage: string) {
  if (stage === "Payment" && isPaymentAction(step)) return "Confirm the applicant, service and amount on the responsible provider's payment screen before paying. Avoid unsolicited payment links.";
  if (stage === "Documents / upload" && /\b(?:upload|attach)\b/i.test(step)) return "Check the portal's accepted file type and ensure each selected document belongs to this application.";
  if (stage === "Physical / assisted stage" && isPhysicalAction(step)) return "Check the office and appointment before travelling; take an original only where explicitly required.";
  return undefined;
}
function keepFor(step: string) {
  if (/\b(?:submit|file)\b.{0,80}\b(?:supporting evidence|supporting documents|supporting records)\b/i.test(step)) return "Keep the official acknowledgement or tracking number if the portal issues one.";
  if (/\b(?:receipt|acknowledgement|transaction reference|application reference)\b/i.test(step)) return "Keep the official record identified in this step, if one is issued. Do not buy a receipt from an intermediary.";
  if (/\b(?:one-time password|otp|verification code)\b/i.test(step)) return "Do not disclose authentication codes to third parties.";
  return undefined;
}

// NIS tracking is a free record lookup. Warnings about an unrelated payment
// receipt and later passport enrolment must never become payment steps.
// Use the documented action order, rather than matching individual nouns.
const reviewedStageSequences: Record<string, readonly string[]> = {
  "passport-application-tracking": [
    "Start", "Verify details", "Verify details", "Follow up", "Troubleshoot", "Follow up",
  ],
  // ICAN payment, examination submission and docket retrieval are separate
  // actions. Do not label "check arrears" or "retrieve docket" as paying.
  "ican-professional-exam-registration": [
    "Start", "Verify details", "Verify details", "Payment", "Submit / register", "Collect / finish",
  ],
  "ican-professional-exemption": [
    "Start", "Verify details", "Verify details", "Payment", "Submit / register",
  ],
};

export function getStepDetails(service: Service): StepDetail[] {
  const checkpoints = new Set<string>();
  const keeps = new Set<string>();
  return service.steps.map((instruction, index) => {
    const stage = reviewedStageSequences[service.slug]?.[index] ?? stageFor(instruction, index);
    const checkpoint = checkpointFor(instruction, stage);
    // The NIS status lookup only reads an existing application; attaching a
    // generic "keep as evidence" instruction to finding its number adds filler.
    const keep = service.slug === "passport-application-tracking" ? undefined : keepFor(instruction);
    // A generic reminder should not occupy a full paragraph at every step.
    const uniqueCheckpoint = checkpoint && !checkpoints.has(checkpoint) ? checkpoint : undefined;
    const uniqueKeep = keep && !keeps.has(keep) ? keep : undefined;
    if (checkpoint) checkpoints.add(checkpoint);
    if (keep) keeps.add(keep);
    return {
      stage,
      instruction,
      prepare: [],
      checkpoint: uniqueCheckpoint,
      keep: uniqueKeep,
    };
  });
}

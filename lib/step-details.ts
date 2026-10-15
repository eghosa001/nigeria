import type { Service } from "@/lib/types";

export type StepDetail = {
  stage: string;
  instruction: string;
  prepare: string[];
  checkpoint?: string;
  keep?: string;
};

const stopWords = new Set([
  "this","that","with","from","your","into","through","official","service","application",
  "process","using","used","required","where","when","then","before","after","complete",
]);

function tokens(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/)
    .filter((token) => token.length > 3 && !stopWords.has(token));
}

function relevantRequirements(service: Service, step: string) {
  const words = tokens(step);
  return service.requirements
    .map((item) => {
      const lower = item.toLowerCase();
      const score = words.reduce((sum, word) => sum + (lower.includes(word) ? 1 : 0), 0);
      return { item, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((row) => row.item);
}

// Mentioning an office or booking biometrics online is not itself a physical visit.
function isPhysicalAction(step: string) {
  return /\b(?:attend|visit|report to|appear at|go to|present at)\b.{0,90}\b(?:office|centre|center|branch|embassy|consulate|camp|school|institution)\b/i.test(step)
    || /\b(?:undergo|give|capture|submit)\b.{0,60}\b(?:biometrics?|fingerprints?)\b/i.test(step)
    || /\b(?:collect|pick up|submit|deliver|present)\b.{0,80}\b(?:at|from|to)\s+(?:(?:the|an?|selected|designated|local|nearest)\s+){0,3}(?:office|centre|center|branch|embassy|consulate|school|institution)\b/i.test(step);
}

function stageFor(step: string, index: number) {
  if (/\b(?:download|print|receive|issued)\b|\bcollect (?:the |your )?(?:slip|certificate|card|document|result)\b/i.test(step)) return "Collect / finish";
  if (/track|status|monitor|follow up|follow-up|wait for|approval|decision/i.test(step)) return "Follow up";
  if (isPhysicalAction(step)) return "Physical / assisted stage";
  if (/pay|payment|fee|checkout|remita|rrr/i.test(step)) return "Payment";
  if (/upload|attach|document|evidence|certificate|affidavit|passport photograph|photo/i.test(step)) return "Documents / upload";
  if (/verify|confirm|review|check|match/i.test(step)) return "Verify details";
  if (/submit|send|apply|request|register|file|enrol/i.test(step)) return "Submit / register";
  if (/sign in|login|log in|create account|open|start/i.test(step)) return "Start";
  return index === 0 ? "Start" : "Continue";
}

function checkpointFor(step: string) {
  if (/pay|payment|fee|checkout|remita|rrr/i.test(step)) return "Confirm the service, applicant/entity details and amount on the official payment screen before paying. Do not continue from an unsolicited payment link.";
  if (/upload|attach|document|evidence|certificate|affidavit|photo/i.test(step)) return "Check that every file belongs to the correct applicant/record, is readable and matches the portal prompt before upload.";
  if (isPhysicalAction(step)) return "Confirm the correct office/centre, date or appointment instruction before travelling, and take the originals where the guide or agency explicitly requires them.";
  return undefined;
}

function keepFor(step: string) {
  if (/pay|payment|fee|checkout|remita|rrr/i.test(step)) return "Keep the official receipt, payment reference or transaction ID.";
  if (/appointment|attend|visit|centre|center|office|biometric|capture/i.test(step)) return "Keep the appointment, acknowledgement or reference you may need at the physical stage.";
  if (/sms|phone|sim|code|pin/i.test(step)) return "Keep the linked phone/SIM and any official code or confirmation message private and accessible.";
  return undefined;
}

export function getStepDetails(service: Service): StepDetail[] {
  const checkpoints = new Set<string>();
  const keeps = new Set<string>();
  return service.steps.map((instruction, index) => {
    const checkpoint = checkpointFor(instruction);
    const keep = keepFor(instruction);
    // A generic reminder should not occupy a full paragraph at every step.
    const uniqueCheckpoint = checkpoint && !checkpoints.has(checkpoint) ? checkpoint : undefined;
    const uniqueKeep = keep && !keeps.has(keep) ? keep : undefined;
    if (checkpoint) checkpoints.add(checkpoint);
    if (keep) keeps.add(keep);
    return {
      stage: stageFor(instruction, index),
      instruction,
      prepare: relevantRequirements(service, instruction),
      checkpoint: uniqueCheckpoint,
      keep: uniqueKeep,
    };
  });
}

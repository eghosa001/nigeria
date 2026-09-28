import { publicServices } from "../lib/data";
import { getServiceJourney } from "../lib/journey";
import { hasExplicitServiceGuidance } from "../lib/service-guidance";
import { getRequirementDetails } from "../lib/requirement-details";

const errors: string[] = [];
const warnings: string[] = [];

const priorityGuides = new Set([
  "passport-renewal",
  "first-nigerian-passport",
  "nin-date-of-birth-modification",
  "new-drivers-licence",
  "cac-business-name-registration",
  "jamb-2026-utme-registration",
  "jamb-direct-entry-2026",
  "waec-check-result",
  "waec-collect-certificate",
  "nysc-registration-local",
]);

const vaguePattern = /follow (?:the )?(?:portal|official|process)|complete (?:the )?(?:process|registration)|as instructed|where required|details requested by|through the .* process/i;

const opaqueRequirementPattern = /^(?:registered entity details|service details|candidate and examination details|supporting documents required(?:\b| for)|documents required(?:\b| for)|required .* information for the entity type|.*details required by the .* portal)$/i;

function requirementIsOpaque(value: string) {
  return opaqueRequirementPattern.test(value.trim()) && !/such as|including|for example|depends on|does not use one identical|does not publish one universal/i.test(value);
}

for (const service of publicServices) {
  const prefix = service.slug + ": ";

  if (service.summary.trim().length < 55) {
    errors.push(prefix + "summary is too short to explain the service clearly");
  }

  if (service.requirements.length < 2) {
    errors.push(prefix + "must list at least two concrete requirements or eligibility items");
  }

  const detailedRequirements = getRequirementDetails(service);
  if (detailedRequirements.length !== service.requirements.length) {
    errors.push(prefix + "every requirement must have a detailed viewer-facing explanation");
  }
  if (detailedRequirements.some((item) => !item.why.trim() || !item.whenUsed.trim() || !item.format.trim())) {
    errors.push(prefix + "contains an incomplete requirement explanation");
  }

  if (service.steps.length < 3) {
    errors.push(prefix + "must contain at least three actionable process steps");
  }

  const processText = service.steps.join(" ");
  const hasStartAction = /open|sign in|register|create|visit|attend|contact|present|enter|complete|check|confirm|obtain|buy|pay|submit|upload|select|request|collect|download|apply|enrol|verify|generate/i.test(service.steps[0] ?? "");
  if (!hasStartAction) {
    errors.push(prefix + "first step must tell the viewer exactly how to start");
  }

  if (service.steps.some((step) => step.trim().length < 35)) {
    errors.push(prefix + "contains a step that is too brief to guide a viewer safely");
  }

  if (!/submit|pay|payment|attend|visit|capture|collect|download|print|receive|verify|approval|complete|upload|book|confirm|register|issue|check|track|generate|obtain|request/i.test(processText)) {
    errors.push(prefix + "steps do not explain a meaningful submission, verification, payment, collection or completion action");
  }

  if (service.notes.length < 1) {
    errors.push(prefix + "must include at least one important note, limitation or safety point");
  }

  if (service.sources.length < 1) {
    errors.push(prefix + "has no official source");
  }

  if (!service.feeLabel.trim()) {
    errors.push(prefix + "has no fee/status label");
  }

  if (service.status === "conflict" && !service.feeNote) {
    errors.push(prefix + "is conflict-marked but does not explain the conflict");
  }

  if (!service.officialPortal && service.sources.length === 0) {
    errors.push(prefix + "has neither an official portal nor an official source route");
  }

  if (priorityGuides.has(service.slug) && !hasExplicitServiceGuidance(service.slug)) {
    errors.push(prefix + "high-demand guide must have explicit route and after-submission guidance");
  }

  const journey = getServiceJourney(service);

  if (journey.mode === "agency-guided") {
    warnings.push(prefix + "official sources do not yet make the online/physical route explicit");
  }

  if (!service.timeline) {
    warnings.push(prefix + "agency has not published a reliable fixed completion timeline; the guide must display that explicitly");
  }

  const vague = [...service.requirements, ...service.steps].filter((value) => vaguePattern.test(value));
  if (vague.length) {
    errors.push(prefix + "contains generic process wording that must be made concrete: " + vague[0]);
  }

  const opaqueRequirement = service.requirements.find(requirementIsOpaque);
  if (opaqueRequirement) {
    errors.push(prefix + "contains an opaque requirement instead of naming the document/detail or explaining why the exact list varies: " + opaqueRequirement);
  }
}

console.log(
  "Checked " + publicServices.length + " public MyNigeriaGuide service guides for minimum usefulness.",
);

if (warnings.length) {
  console.warn("\nEditorial improvement queue:");
  for (const warning of warnings) console.warn("- " + warning);
}

if (errors.length) {
  console.error("\nContent quality failures:");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log("\nAll published guides meet the required minimum content standard.");

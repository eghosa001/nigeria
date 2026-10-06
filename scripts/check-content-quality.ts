import { publicServices, services } from "../lib/data";
import { getServiceJourney } from "../lib/journey";
import { hasExplicitServiceGuidance } from "../lib/service-guidance";
import { getRequirementDetails } from "../lib/requirement-details";
import { getStepDetails } from "../lib/step-details";

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
const conditionalFeePattern = /depends|varies|check current|no separate|no extra|requires a valid|tax liability|amount depends/i;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const knownServiceSlugs = new Set(services.map((service) => service.slug));

const opaqueRequirementPattern = /^(?:registered entity details|service details|candidate(?:\/| and )examination details|candidate examination details|existing (?:birth|record|birth\/attestation) details|relevant assessment\/liability details|supporting documents required(?:\b| for)|documents required(?:\b| for)|required .* information for the entity type|.*details required by the .* portal)$/i;

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

  const detailedSteps = getStepDetails(service);
  if (detailedSteps.length !== service.steps.length) {
    errors.push(prefix + "every process step must have viewer-facing preparation, checkpoint and evidence guidance");
  }
  if (detailedSteps.some((step) => !step.stage.trim() || !step.checkpoint.trim() || !step.keep.trim())) {
    errors.push(prefix + "contains an incomplete detailed process step");
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

  if (service.category === "Foreign visas") {
    if (service.requirements.length < 6) errors.push(prefix + "foreign visa guide must list at least six concrete application requirements");
    if (service.steps.length < 5) errors.push(prefix + "foreign visa guide must explain at least five application stages");
    if (service.notes.length < 3) errors.push(prefix + "foreign visa guide must include at least three country-specific cautions or conditions");
    const foreignText = [...service.requirements, ...service.steps, ...service.notes].join(" ");
    if (!/passport|travel document/i.test(foreignText)) errors.push(prefix + "foreign visa guide must explain passport/travel-document requirements");
    if (!/bank|financial|fund|income|salary|sponsor|payment|fee/i.test(foreignText)) errors.push(prefix + "foreign visa guide must explain finances, sponsorship or payment evidence");
    if (!/flight|travel|accommodation|hotel|host|invitation|itinerary/i.test(foreignText)) errors.push(prefix + "foreign visa guide must explain travel/accommodation or host evidence");
    if (!/appointment|interview|biometric|fingerprint|visa application centre|visa application center|submit/i.test(foreignText)) errors.push(prefix + "foreign visa guide must explain the physical/biometric/submission stage");
    if (!service.feeNote?.trim()) errors.push(prefix + "foreign visa guide must explain what the displayed fee does and does not cover");
  }

  if (service.sources.length < 1) {
    errors.push(prefix + "has no official source");
  }

  if (!isoDatePattern.test(service.lastVerified)) {
    errors.push(prefix + "lastVerified must use YYYY-MM-DD");
  }

  const seenSources = new Set<string>();
  for (const source of service.sources) {
    if (!source.url.startsWith("https://")) errors.push(prefix + "official source must use HTTPS: " + source.url);
    if (!isoDatePattern.test(source.lastChecked)) errors.push(prefix + "source lastChecked must use YYYY-MM-DD: " + source.label);
    if (source.lastChecked > service.lastVerified) errors.push(prefix + "lastVerified cannot be older than source check: " + source.label);
    if (seenSources.has(source.url)) errors.push(prefix + "contains a duplicate official source URL: " + source.url);
    seenSources.add(source.url);
  }

  if (service.related.length < 1) {
    errors.push(prefix + "must link to at least one genuinely related published guide");
  }

  const seenRelated = new Set<string>();
  for (const related of service.related) {
    if (related === service.slug || !knownServiceSlugs.has(related)) errors.push(prefix + "contains an invalid related guide slug: " + related);
    if (seenRelated.has(related)) errors.push(prefix + "contains a duplicate related guide slug: " + related);
    seenRelated.add(related);
  }

  if (!service.feeLabel.trim()) {
    errors.push(prefix + "has no fee/status label");
  }

  if (conditionalFeePattern.test(service.feeLabel) && !service.feeNote?.trim()) {
    errors.push(prefix + "conditional or variable fee/status labels must explain what the viewer should verify before payment");
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

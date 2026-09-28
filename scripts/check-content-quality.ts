import { publicServices } from "../lib/data";
import { getServiceJourney } from "../lib/journey";

const errors: string[] = [];
const warnings: string[] = [];

for (const service of publicServices) {
  const prefix = service.slug + ": ";

  if (service.summary.trim().length < 55) {
    errors.push(prefix + "summary is too short to explain the service clearly");
  }

  if (service.requirements.length < 2) {
    errors.push(prefix + "must list at least two concrete requirements or eligibility items");
  }

  if (service.steps.length < 3) {
    errors.push(prefix + "must contain at least three actionable process steps");
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

  const journey = getServiceJourney(service);

  if (journey.mode === "agency-guided") {
    warnings.push(prefix + "official sources do not yet make the online/physical route explicit");
  }

  if (!service.timeline) {
    warnings.push(prefix + "no reliable official completion timeline is published in the guide");
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

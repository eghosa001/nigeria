import type { Service } from "@/lib/types";

type StepShortcut = { label: string; step: number };
type VerifiedSourceShortcut = { label: string; sourceUrl: string };
type Shortcut = StepShortcut | VerifiedSourceShortcut;

/**
 * Small, publisher-reviewed task choices for existing high-demand canonical
 * service pages. These are NOT new SEO landing pages or generated questions.
 *
 * Main application/checker action is already in the hero, so don't repeat it.
 * Only show distinct secondary needs, supported by the actual procedure or
 * an official URL already cited on the service.
 */
const shortcuts: Readonly<Record<string, readonly Shortcut[]>> = {
  "aedc-map-refund": [
    { label: "Refund token missing or rejected", step: 5 },
    { label: "Refund complaint still unresolved", step: 6 },
  ],
  "ibedc-map-refund": [
    { label: "More than one token? Check the loading order", step: 3 },
    { label: "Missing refund or token fails", step: 5 },
    { label: "Complaint still unresolved", step: 6 },
  ],
  "passport-application-tracking": [
    { label: "Tracker cannot find your application", step: 5 },
    {
      label: "Find a payment receipt instead",
      sourceUrl: "https://passport.immigration.gov.ng/search/VTJGc2RHVmtYMSt2N3NCNmZBOXBpMWx1dGFHUm15TEExMzdIbUFCZWhjOD0",
    },
    { label: "Passport shows PRODUCED: what next?", step: 7 },
  ],
  "anambra-asin-registration": [
    { label: "Find the ASIN you already have", sourceUrl: "https://tax.services.an.gov.ng/asin/search" },
    { label: "Sign in or reset your taxpayer password", sourceUrl: "https://tax.services.an.gov.ng/auth/login" },
    { label: "Pay a state tax or levy instead", sourceUrl: "https://smart.anambrastate.gov.ng/pay" },
  ],
};

export type ServiceIntentShortcut = { label: string; href: string; external: boolean };

export function getServiceIntentShortcuts(service: Service): ServiceIntentShortcut[] {
  const choices = shortcuts[service.slug] ?? [];
  const result: ServiceIntentShortcut[] = [];
  for (const item of choices) {
    if ("step" in item) {
      // Never print an anchor to a missing or reordered process stage.
      if (!service.steps[item.step - 1]) continue;
      result.push({ label: item.label, href: "#service-step-" + item.step, external: false });
    } else {
      // Official alternatives must already appear in the individually sourced
      // record. No unreviewed new external link is invented by this component.
      if (!service.sources.some((source) => source.url === item.sourceUrl)) continue;
      result.push({ label: item.label, href: item.sourceUrl, external: true });
    }
  }
  return result;
}

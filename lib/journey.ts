import type { Service } from "@/lib/types";

export type JourneyMode = "online" | "hybrid" | "physical" | "agency-guided";

export type ServiceJourney = {
  mode: JourneyMode;
  modeLabel: string;
  startLabel: string;
  startDetail: string;
  onlineAvailable: boolean;
  physicalStatus: "required" | "may-be-required" | "not-stated";
  physicalLabel: string;
  alternativeLabel: string;
  alternativeDetail: string;
};

const physicalRequiredPatterns = [
  /attend/i,
  /in person/i,
  /biometric/i,
  /fingerprint/i,
  /capture/i,
  /passport office/i,
  /driving school/i,
  /collection/i,
  /collect .*certificate/i,
  /present .*original/i,
];

const assistedPatterns = [
  /school principal/i,
  /student affairs/i,
  /institution/i,
  /accredited/i,
  /centre/i,
  /center/i,
  /office/i,
  /embassy/i,
  /consulate/i,
  /high commission/i,
];

const explicitlyOnlinePatterns = [
  /online/i,
  /portal/i,
  /dashboard/i,
  /self-service/i,
  /e-facility/i,
  /website/i,
  /download/i,
];

function text(service: Service) {
  return [
    service.summary,
    service.requirements.join(" "),
    service.steps.join(" "),
    service.notes.join(" "),
  ].join(" ");
}

export function getServiceJourney(service: Service): ServiceJourney {
  const body = text(service);
  const hasPortal = Boolean(service.officialPortal);
  const physicalRequired = physicalRequiredPatterns.some((pattern) => pattern.test(body));
  const assisted = assistedPatterns.some((pattern) => pattern.test(body));
  const explicitlyOnline = explicitlyOnlinePatterns.some((pattern) => pattern.test(body));

  if (hasPortal && physicalRequired) {
    return {
      mode: "hybrid",
      modeLabel: "Online + physical visit",
      startLabel: "Start online",
      startDetail: "Begin on the official portal linked on this page. Complete the online form/payment steps before the in-person stage unless the official guide says otherwise.",
      onlineAvailable: true,
      physicalStatus: "required",
      physicalLabel: "A physical step is required",
      alternativeLabel: assisted ? "Assisted / physical route" : "If you cannot finish online",
      alternativeDetail: assisted
        ? "The official process also involves an agency, institution, accredited centre or government office. Use GovGuide's official office links rather than an unofficial agent."
        : "Use the responsible agency's official office/contact channel. GovGuide does not currently confirm a separate walk-in-only application route for this service.",
    };
  }

  if (hasPortal || explicitlyOnline) {
    return {
      mode: "online",
      modeLabel: "Mostly online",
      startLabel: "Use the official online route",
      startDetail: "The current official guidance supports starting this service online using the portal linked on this page.",
      onlineAvailable: true,
      physicalStatus: assisted ? "may-be-required" : "not-stated",
      physicalLabel: assisted
        ? "A physical/assisted step may still apply"
        : "No mandatory physical visit is stated in the sources we currently use",
      alternativeLabel: "If the online route does not work",
      alternativeDetail: "Use the responsible agency's official contact or office directory. Do not pay an unofficial agent just because the portal is temporarily unavailable.",
    };
  }

  if (physicalRequired || assisted) {
    return {
      mode: "physical",
      modeLabel: "Physical / assisted process",
      startLabel: "Use the responsible office or institution",
      startDetail: "The current official guidance relies on an office, institution, accredited centre or in-person process rather than a complete self-service portal.",
      onlineAvailable: false,
      physicalStatus: "required",
      physicalLabel: "Plan for a physical or institution-assisted step",
      alternativeLabel: "Online alternative",
      alternativeDetail: "GovGuide does not currently have enough official evidence to claim this service can be completed fully online.",
    };
  }

  return {
    mode: "agency-guided",
    modeLabel: "Agency-guided",
    startLabel: "Follow the official agency route",
    startDetail: "The official sources do not clearly separate the process into a fully online or fully physical route.",
    onlineAvailable: hasPortal,
    physicalStatus: "not-stated",
    physicalLabel: "Physical requirement is not clearly stated",
    alternativeLabel: "Alternative route",
    alternativeDetail: "Where the official sources do not confirm an alternative, GovGuide does not invent one. Use the agency's official portal/contact details for clarification.",
  };
}

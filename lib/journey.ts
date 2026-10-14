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

// Detect a required physical action in the actual process steps, not from
// choosing an office, booking biometrics or mentioning "institution" online.
const physicalRequiredPatterns = [
  /\b(?:attend|visit|report to|appear at|go to|present at)\b.{0,90}\b(?:office|centre|center|branch|embassy|consulate|school|camp|institution)\b/i,
  /\b(?:attend|undergo|give|capture|submit|provide)\b.{0,70}\b(?:biometrics?|fingerprints?)\b/i,
  /\bin.person\b/i,
  /\bcollect (?:your |the )?(?:issued )?(?:certificate|passport|licence|license|card)\s+(?:at|from)\s+(?:the |an? )?(?:office|centre|center|branch)\b/i,
  /\bpresent (?:your |the )?original\s+(?:documents?|records?)\s+(?:at|to)\b/i,
];

function explicitlyAgencyAssisted(step: string) {
  return /\b(?:take|bring|submit|collect|obtain|present|register|report|apply)\b.{0,100}\b(?:at|from|through|with|to)\s+(?:(?:the|your|an?|selected|responsible|accredited)\s+){0,3}(?:school|institution|centre|center|office|branch|embassy|consulate)\b/i.test(step);
}

function explicitlyOnlineStep(step: string) {
  return /\b(?:sign in|log in|register|create|submit|download|pay|upload|apply)\b.{0,100}\b(?:online|portal|dashboard|self-service|e-facility|website)\b/i.test(step);
}

export function getServiceJourney(service: Service): ServiceJourney {
  if (service.slug === "bvn-validation") {
    return {
      mode: "agency-guided",
      modeLabel: "USSD service",
      startLabel: "Dial the official NIBSS USSD code",
      startDetail: "Start from a Nigerian mobile line by dialing *565*1#. This is a USSD validation service, not a web application.",
      onlineAvailable: false,
      physicalStatus: "not-stated",
      physicalLabel: "No office visit is stated for the standard USSD check",
      alternativeLabel: "If the USSD request fails",
      alternativeDetail: "Confirm the mobile line can use USSD and use NIBSS's official support/guidance route rather than a third-party BVN checker.",
    };
  }

  if (service.slug === "bvn-data-update") {
    return {
      mode: "physical",
      modeLabel: "Bank-assisted process",
      startLabel: "Start with the bank handling your BVN amendment",
      startDetail: "The correction is handled through a bank-assisted BVN amendment process. The CBN page is guidance, not an online self-service correction portal.",
      onlineAvailable: false,
      physicalStatus: "required",
      physicalLabel: "Bank verification and document submission are required",
      alternativeLabel: "If the bank does not resolve the update",
      alternativeDetail: "Keep the amendment reference and escalate through the bank's complaint channel, then use the appropriate CBN complaint route if the bank does not resolve a complete request.",
    };
  }

  const process = service.steps.join(" ");
  const hasPortal = Boolean(service.officialPortal);
  // Body, notes and document lists can mention a school, office or website
  // without establishing a physical appointment or online application.
  const physicalRequired = physicalRequiredPatterns.some((pattern) => pattern.test(process));
  const assisted = service.steps.some(explicitlyAgencyAssisted);
  const explicitlyOnline = service.steps.some(explicitlyOnlineStep);

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
        ? "The official process also involves an agency, institution, accredited centre or government office. Use MyNigeriaGuide's official office links rather than an unofficial agent."
        : "Use the responsible agency's official office/contact channel. MyNigeriaGuide does not currently confirm a separate walk-in-only application route for this service.",
    };
  }

  if (hasPortal || explicitlyOnline) {
    return {
      mode: "online",
      modeLabel: "Mostly online",
      startLabel: "Use the official online route",
      startDetail: "The current official guidance supports starting this service online using the portal linked on this page.",
      onlineAvailable: true,
      physicalStatus: "not-stated",
      physicalLabel: "No mandatory physical visit is established by the documented steps",
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
      physicalStatus: physicalRequired ? "required" : "may-be-required",
      physicalLabel: physicalRequired
        ? "A physical stage is described in the application steps"
        : "Institution assistance is described; confirm whether a visit is needed",
      alternativeLabel: "Online alternative",
      alternativeDetail: "MyNigeriaGuide does not currently have enough official evidence to claim this service can be completed fully online.",
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
    alternativeDetail: "Where the official sources do not confirm an alternative, MyNigeriaGuide does not invent one. Use the agency's official portal/contact details for clarification.",
  };
}

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

// Negated or optional office mentions do not establish a mandatory visit.
export function isMandatoryPhysicalStep(step: string) {
  for (const pattern of physicalRequiredPatterns) {
    const match = pattern.exec(step);
    if (!match) continue;
    const clause = step.slice(Math.max(0, match.index - 100), match.index).split(/[.;!?]/).pop() ?? "";
    if (/\b(?:do not have to|don't have to|no need to|not required to|without needing to|without having to)\s*$/i.test(clause)) continue;
    if (/^\s*if\b/i.test(clause)) continue;
    return true;
  }
  return false;
}

function explicitlyAgencyAssisted(step: string) {
  return /\b(?:take|bring|submit|collect|obtain|present|register|report|apply)\b.{0,100}\b(?:at|from|through|with|to)\s+(?:(?:the|your|an?|selected|responsible|accredited)\s+){0,3}(?:school|institution|centre|center|office|branch|embassy|consulate)\b/i.test(step);
}

function explicitlyOnlineStep(step: string) {
  return /\b(?:sign in|log in|register|create|submit|download|pay|upload|apply)\b.{0,100}\b(?:online|portal|dashboard|self-service|e-facility|website)\b/i.test(step);
}

// Provider informational/help pages are not transactional application portals.
// The published security route is USSD or an app; the provider URL explains it.
// These exceptions prevent emergency guides from falsely promising online self-service.
const verifiedSecurityJourney: Record<string, ServiceJourney> = {
  "gtbank-block-debit-card": {
    mode: "online", modeLabel: "737 USSD or GTWorld", startLabel: "Hotlist the specific debit card",
    startDetail: "Dial *737*51*10# on the registered GTBank line or open GTWorld → Account Details → Cards → Block Card. *737*6*3# only checks card status.",
    onlineAvailable: true, physicalStatus: "not-stated", physicalLabel: "No mandatory bank-office visit for the documented card block",
    alternativeLabel: "If your SIM or GTWorld login is unavailable",
    alternativeDetail: "Contact GTBank through its genuine Complaints & Enquiries channel. A card block alone does not freeze transfers on the full bank account.",
  },
  "opay-emergency-lock-account-card": {
    mode: "agency-guided", modeLabel: "Emergency USSD lock", startLabel: "Choose account or card lock",
    startDetail: "OPay's official security page says *955*131# locks the account and *955*132# locks the card. Verify which one you need and complete the genuine USSD prompts.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No mandatory physical visit stated for the emergency USSD lock",
    alternativeLabel: "If USSD fails or funds were taken",
    alternativeDetail: "Call OPay App & Card support on 0700 8888 328 or 020 18888 328. Do not assume a card lock disables all account transfers.",
  },
  "sterling-emergency-block-account": {
    mode: "agency-guided", modeLabel: "USSD account emergency", startLabel: "Block with *822*911# if already enrolled",
    startDetail: "Dial *822*911# from any mobile phone. Sterling says this requires prior *822# registration; it is not an ordinary web-application portal.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No branch visit required for an eligible completed USSD block",
    alternativeLabel: "If you never registered or cannot use the code",
    alternativeDetail: "Call Sterling One Customer Centre on 07008220000 rather than delaying an active fraud report.",
  },
  "keystone-emergency-account-block": {
    mode: "agency-guided", modeLabel: "USSD panic block", startLabel: "Dial Keystone's *7111*911# from any phone",
    startDetail: "The bank states that the panic code places a Post No Debit restriction on linked Keystone accounts after the required prompts.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No initial visit required for a successful emergency USSD restriction",
    alternativeLabel: "If the menu fails",
    alternativeDetail: "Contact 070020003000 or contactcentre@keystonebankng.com through Keystone's official support.",
  },
  "stanbic-emergency-account-block": {
    mode: "agency-guided", modeLabel: "USSD emergency account block", startLabel: "Dial *909*1*911#",
    startDetail: "Stanbic lists *909*1*911# as its emergency account block for lost phones or compromised banking details.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "A branch visit is not the first required step",
    alternativeLabel: "If the bank does not confirm the block",
    alternativeDetail: "Call Stanbic's Contact Centre on 0700 909 9099 or 0201 422 2222.",
  },
  "access-bank-block-account": {
    mode: "agency-guided", modeLabel: "USSD account block", startLabel: "Dial *901*911# and choose Block Account",
    startDetail: "Choose Option 2, then Self or Third Party, choose one account or all and authorise with the owner's existing *901# PIN. Another person's number cannot bypass that PIN.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No office visit required for a successfully authenticated USSD block",
    alternativeLabel: "If the PIN is missing or the request fails",
    alternativeDetail: "Call Access Bank's official Contact Centre 07003000000. The USSD Opt Out is not the same as Block Account.",
  },
  "zenith-emergency-account-block": {
    mode: "agency-guided", modeLabel: "USSD distress block", startLabel: "Dial Zenith's *966*911#",
    startDetail: "Zenith's own annual report names *966*911# for emergency account blocking and distinguishes *966*60# card management.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No mandatory branch attendance is stated for the initial distress code",
    alternativeLabel: "If you cannot confirm the block",
    alternativeDetail: "Call ZenithDirect on 0201 278 7000 or 091 1987 7000 for help with the full account, not just a card.",
  },
  "fidelity-emergency-block": {
    mode: "agency-guided", modeLabel: "Confirm issuer's security route", startLabel: "Ask Fidelity to verify the affected card or account block",
    startDetail: "Fidelity's FAQ contradicts itself: its table says *770*911# for cards, but a card-fraud answer says *770*991#. Do not treat one as settled; verify the real menu or call TrueServe.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "A confirmed bank phone/USSD support process is required, not necessarily a branch visit",
    alternativeLabel: "If urgent security action cannot complete",
    alternativeDetail: "Use the official Fidelity TrueServe or branch support. A card lock and an account-wide restriction are different.",
  },
  "smartcash-emergency-block-wallet": {
    mode: "agency-guided", modeLabel: "USSD wallet emergency", startLabel: "Lock the wallet using SmartCash's USSD codes",
    startDetail: "Dial *939*911# from the registered line or *939*911*CustomerPhoneNumber# from another line, then use the affected wallet owner's PIN in the genuine service.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No required branch visit is stated for a successful USSD lock",
    alternativeLabel: "If locked out or suspecting fraud",
    alternativeDetail: "Call SmartCash at 09125-939-939 or email frauddesk@smartcashpsb.ng for an official investigation and recovery.",
  },
  "union-bank-826-ussd": {
    mode: "agency-guided", modeLabel: "Union Bank USSD", startLabel: "Choose *826# banking, card or account security",
    startDetail: "Union Bank lists *826*21# for card management, *826*6# to block a linked account, and *826*6*mobile number# from a different phone.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "Normal USSD transactions do not require a bank visit",
    alternativeLabel: "If card or account restriction fails",
    alternativeDetail: "Use legitimate Union Bank support or the authenticated UnionOnline Self Service → Block/Unblock Card where appropriate.",
  },
  "stanbic-909-ussd-banking": {
    mode: "agency-guided", modeLabel: "Stanbic USSD banking", startLabel: "Start *909# services from the bank-linked phone",
    startDetail: "Register with *909*11*1# using BVN or debit card and date of birth; *909*1*911# is a distinct emergency account block.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "Routine USSD registration does not require a bank visit",
    alternativeLabel: "If the registered SIM is missing",
    alternativeDetail: "Use Stanbic's official Contact Centre 0700 909 9099 or 0201 422 2222 for emergency blocking and recovery.",
  },
  "fidelity-770-ussd-banking": {
    mode: "agency-guided", modeLabel: "Fidelity USSD banking", startLabel: "Use Fidelity's *770# banking menu",
    startDetail: "The bank's own FAQ contradicts itself on card-block codes (*770*911# versus *770*991#). Ask Fidelity to verify the actual emergency menu; do not guess.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "Routine *770# menu access does not require a physical visit",
    alternativeLabel: "If your phone or card is stolen",
    alternativeDetail: "Contact Fidelity TrueServe or a branch using genuine bank details to secure the specific account/card.",
  },
  "mtn-sim-swap-replacement": {
    mode: "physical", modeLabel: "MTN store / Welcome Back", startLabel: "Verify NIN and line ownership at MTN",
    startDetail: "Prepare NIN/VNIN, Welcome Back form and usage history, then attend a genuine MTN store. A proxy needs separate eligibility, court affidavit, indemnity and hard-copy evidence.",
    onlineAvailable: false, physicalStatus: "required", physicalLabel: "Registered line verification and a new SIM at MTN",
    alternativeLabel: "If the owner cannot attend",
    alternativeDetail: "Use MTN's published proxy eligibility checklist and contact customercare.ng@mtn.com before any proxy store visit.",
  },
  "airtel-4g-sim-swap": {
    mode: "hybrid", modeLabel: "Airtel store or self-service", startLabel: "Check 4G SIM and device compatibility",
    startDetail: "Airtel supports shop/partner swap or an available genuine self-service SIM swap. Its informational FAQ is not itself a universal live application checkout.",
    onlineAvailable: true, physicalStatus: "may-be-required", physicalLabel: "Outlet visit if self-service is unavailable or identity checks require it",
    alternativeLabel: "If LTE remains unavailable after the swap",
    alternativeDetail: "Check device bands, LTE network setting and local 4G coverage; contact an authorised Airtel shop for unresolved line activation.",
  },
  "nysc-lost-discharge-certificate": {
    mode: "agency-guided", modeLabel: "NYSC certification request", startLabel: "Request the State of Service introduction",
    startDetail: "NYSC does not reprint lost Certificates of National Service. Assemble police extract, court affidavit and the service-state introduction to request a Letter of Confirmation.",
    onlineAvailable: false, physicalStatus: "may-be-required", physicalLabel: "NYSC State Secretariat/certification verification may require attendance",
    alternativeLabel: "If the original certificate copy is missing",
    alternativeDetail: "NYSC lists a copy only where available; present the other mandatory records and ask the State Secretariat about official submission and collection.",
  },
};

export function getServiceJourney(service: Service): ServiceJourney {
  if (verifiedSecurityJourney[service.slug]) return verifiedSecurityJourney[service.slug];
  // The Glo webpage explains eSIM but does not accept a complete online swap.
  // Its official FAQ requires NIN checks and QR installation at a Gloworld/dealer outlet.
  if (service.slug === "glo-esim-activation") {
    return {
      mode: "physical",
      modeLabel: "Gloworld / dealer visit",
      startLabel: "Check your EID, then visit an authorised Glo outlet",
      startDetail: "Dial *#06# to look for an EID, then take the compatible phone and NIN details to a Gloworld shop or Glo dealer for eSIM setup. The Glo webpage is information, not a remote activation form.",
      onlineAvailable: false,
      physicalStatus: "required",
      physicalLabel: "Glo outlet verification and QR activation are required",
      alternativeLabel: "If the outlet cannot activate your number",
      alternativeDetail: "Ask Glo to check the NIN/line details and obtain a valid outlet-issued QR. The official published route does not establish a fully online fallback.",
    };
  }

  // Glo publishes guidance online, but in-store identification is compulsory.
  // Do not infer an online transaction route from the presence of its FAQ URL.
  if (service.slug === "glo-port-number-to-glo") {
    return {
      mode: "physical",
      modeLabel: "Glo shop / authorised dealer",
      startLabel: "Check port eligibility before visiting Glo",
      startDetail: "Use your working old-network SIM and verify recent port/SIM replacement restrictions, then visit a Gloworld shop or authorised dealer. The NCC requires the signed porting request and the PORT to 3232 SMS.",
      onlineAvailable: false,
      physicalStatus: "required",
      physicalLabel: "In-person identity check and new SIM issuance",
      alternativeLabel: "If your port request is not accepted",
      alternativeDetail: "Ask Glo which eligibility, subscriber registration or clearinghouse verification rule stopped the request. Confirm the conflicting repeat-port waiting periods with Glo or NCC rather than guessing.",
    };
  }

  if (service.slug === "glo-sim-replacement") {
    return {
      mode: "physical",
      modeLabel: "Gloworld in-person visit",
      startLabel: "Prepare the right SIM-replacement form and identity evidence",
      startDetail: "Get the prepaid, corporate or provider-accepted proxy form from Glo's Self Care site. The form can be prepared online, but the replacement itself is handled at a Gloworld shop.",
      onlineAvailable: false,
      physicalStatus: "required",
      physicalLabel: "Present ownership evidence and collect replacement SIM",
      alternativeLabel: "If the original SIM evidence is unavailable",
      alternativeDetail: "Ask the official Gloworld service staff what alternate ownership checks they accept before paying any third party. Secure the lost number and linked financial accounts through official channels.",
    };
  }

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

  const hasPortal = Boolean(service.officialPortal);
  // Body, notes and document lists can mention a school, office or website
  // without establishing a physical appointment or online application.
  const physicalRequired = service.steps.some(isMandatoryPhysicalStep);
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

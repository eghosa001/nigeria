import type { Service } from "@/lib/types";

export type JourneyMode = "online" | "hybrid" | "physical" | "agency-guided" | "ussd";

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
    mode: "ussd", modeLabel: "Emergency USSD lock", startLabel: "Choose account or card lock",
    startDetail: "OPay's official security page says *955*131# locks the account and *955*132# locks the card. Verify which one you need and complete the genuine USSD prompts.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No mandatory physical visit stated for the emergency USSD lock",
    alternativeLabel: "If USSD fails or funds were taken",
    alternativeDetail: "Call OPay App & Card support on 0700 8888 328 or 020 18888 328. Do not assume a card lock disables all account transfers.",
  },
  "sterling-emergency-block-account": {
    mode: "ussd", modeLabel: "USSD account emergency", startLabel: "Block with *822*911# if already enrolled",
    startDetail: "Dial *822*911# from any mobile phone. Sterling says this requires prior *822# registration; it is not an ordinary web-application portal.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No branch visit required for an eligible completed USSD block",
    alternativeLabel: "If you never registered or cannot use the code",
    alternativeDetail: "Call Sterling One Customer Centre on 07008220000 rather than delaying an active fraud report.",
  },
  "keystone-emergency-account-block": {
    mode: "ussd", modeLabel: "USSD panic block", startLabel: "Dial Keystone's *7111*911# from any phone",
    startDetail: "The bank states that the panic code places a Post No Debit restriction on linked Keystone accounts after the required prompts.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No initial visit required for a successful emergency USSD restriction",
    alternativeLabel: "If the menu fails",
    alternativeDetail: "Contact 070020003000 or contactcentre@keystonebankng.com through Keystone's official support.",
  },
  "stanbic-emergency-account-block": {
    mode: "ussd", modeLabel: "USSD emergency account block", startLabel: "Dial *909*1*911#",
    startDetail: "Stanbic lists *909*1*911# as its emergency account block for lost phones or compromised banking details.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "A branch visit is not the first required step",
    alternativeLabel: "If the bank does not confirm the block",
    alternativeDetail: "Call Stanbic's Contact Centre on 0700 909 9099 or 0201 422 2222.",
  },
  "access-bank-block-account": {
    mode: "ussd", modeLabel: "USSD account block", startLabel: "Dial *901*911# and choose Block Account",
    startDetail: "Choose Option 2, then Self or Third Party, choose one account or all and authorise with the owner's existing *901# PIN. Another person's number cannot bypass that PIN.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No office visit required for a successfully authenticated USSD block",
    alternativeLabel: "If the PIN is missing or the request fails",
    alternativeDetail: "Call Access Bank's official Contact Centre 07003000000. The USSD Opt Out is not the same as Block Account.",
  },
  "zenith-emergency-account-block": {
    mode: "ussd", modeLabel: "USSD distress block", startLabel: "Dial Zenith's *966*911#",
    startDetail: "Zenith's own annual report names *966*911# for emergency account blocking and distinguishes *966*60# card management.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No mandatory branch attendance is stated for the initial distress code",
    alternativeLabel: "If you cannot confirm the block",
    alternativeDetail: "Call ZenithDirect on 0201 278 7000 or 091 1987 7000 for help with the full account, not just a card.",
  },
  "fidelity-emergency-block": {
    mode: "ussd", modeLabel: "Confirm issuer's security route", startLabel: "Ask Fidelity to verify the affected card or account block",
    startDetail: "Fidelity's FAQ contradicts itself: its table says *770*911# for cards, but a card-fraud answer says *770*991#. Do not treat one as settled; verify the real menu or call TrueServe.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "A confirmed bank phone/USSD support process is required, not necessarily a branch visit",
    alternativeLabel: "If urgent security action cannot complete",
    alternativeDetail: "Use the official Fidelity TrueServe or branch support. A card lock and an account-wide restriction are different.",
  },
  "smartcash-emergency-block-wallet": {
    mode: "ussd", modeLabel: "USSD wallet emergency", startLabel: "Lock the wallet using SmartCash's USSD codes",
    startDetail: "Dial *939*911# from the registered line or *939*911*CustomerPhoneNumber# from another line, then use the affected wallet owner's PIN in the genuine service.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No required branch visit is stated for a successful USSD lock",
    alternativeLabel: "If locked out or suspecting fraud",
    alternativeDetail: "Call SmartCash at 09125-939-939 or email frauddesk@smartcashpsb.ng for an official investigation and recovery.",
  },
  "union-bank-826-ussd": {
    mode: "ussd", modeLabel: "Union Bank USSD", startLabel: "Choose *826# banking, card or account security",
    startDetail: "Union Bank lists *826*21# for card management, *826*6# to block a linked account, and *826*6*mobile number# from a different phone.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "Normal USSD transactions do not require a bank visit",
    alternativeLabel: "If card or account restriction fails",
    alternativeDetail: "Use legitimate Union Bank support or the authenticated UnionOnline Self Service → Block/Unblock Card where appropriate.",
  },
  "stanbic-909-ussd-banking": {
    mode: "ussd", modeLabel: "Stanbic USSD banking", startLabel: "Start *909# services from the bank-linked phone",
    startDetail: "Register with *909*11*1# using BVN or debit card and date of birth; *909*1*911# is a distinct emergency account block.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "Routine USSD registration does not require a bank visit",
    alternativeLabel: "If the registered SIM is missing",
    alternativeDetail: "Use Stanbic's official Contact Centre 0700 909 9099 or 0201 422 2222 for emergency blocking and recovery.",
  },
  "fidelity-770-ussd-banking": {
    mode: "ussd", modeLabel: "Fidelity USSD banking", startLabel: "Use Fidelity's *770# banking menu",
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

// Editorially verified exception routes: a provider information URL does not
// establish a fully online transaction, nor does it make a school request an app.
const verifiedEditorialJourneys: Record<string, ServiceJourney> = {
  "waec-confirm-result-nigeria": {
    mode: "agency-guided", modeLabel: "WAEC confirmation and courier",
    startLabel: "Prepare WAEC's school-candidate confirmation package",
    startDetail: "WAEC lists the affidavit, result copy, two passport photographs, two 9x4 envelopes and scratch card. Confirm the WAEC submission/payment route and recipient delivery before dispatch.",
    onlineAvailable: false, physicalStatus: "may-be-required",
    physicalLabel: "Document handover and/or approved courier service",
    alternativeLabel: "Is an instant online confirmation available?",
    alternativeDetail: "WAEC's requirements page is information, not an online instant verification form. Confirm the actual submission arrangement with WAEC.",
  },
  "waec-correct-certificate-error": {
    mode: "agency-guided", modeLabel: "WAEC / school principal",
    startLabel: "Use the correct school or private-candidate route",
    startDetail: "School candidates must contact the principal; private candidates apply to WAEC directly. WAEC requires the original certificate with the amendment request.",
    onlineAvailable: false, physicalStatus: "may-be-required",
    physicalLabel: "Original certificate must be submitted by the WAEC-approved route",
    alternativeLabel: "If you cannot send the original safely",
    alternativeDetail: "Ask the principal or WAEC to confirm its current original-document handover and acknowledgement process.",
  },
  "waec-withheld-result-complaint": {
    mode: "online", modeLabel: "Official WAEC complaint portal",
    startLabel: "Follow WAEC Nigeria's complaints/defence notice",
    startDetail: "Start with WAEC's official withheld/held-result announcement and follow its waecinternational.org complaints link; entering a defence does not guarantee release.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No mandatory visit stated in the complaint notice",
    alternativeLabel: "If the complaints portal is unavailable",
    alternativeDetail: "Recheck the notice on waecnigeria.org for the genuine complaints link rather than using an unofficial form.",
  },
  "neco-institution-verification": {
    mode: "online", modeLabel: "NECO institutional e-Verify",
    startLabel: "Choose Institutional Verifier",
    startDetail: "Start at everify.neco.gov.ng, register or sign in as an institution and wait for NECO's registration verification when applicable. Use verified candidate token/RRR or reference-code workflows.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No compulsory office visit published for the online verification request",
    alternativeLabel: "If registration or token validation fails",
    alternativeDetail: "Contact the official NECO e-Verify support team rather than paying an unapproved intermediary.",
  },
  "nin-name-modification": {
    mode: "hybrid", modeLabel: "NIMC self-service or assisted centre",
    startLabel: "Use the official NIMC modification route",
    startDetail: "Start at NIMC Self-Service Modifications with the existing NIN. Prepare affidavit/newspaper extract and, for marriage cases, the relevant marriage certificate.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "A NIMC centre-assisted path is published for applicants who need it",
    alternativeLabel: "If online modification is unavailable",
    alternativeDetail: "Use an authorised NIMC enrolment centre and verify the official fee/invoice before payment.",
  },
  "nin-address-modification": {
    mode: "hybrid", modeLabel: "NIMC self-service or assisted centre",
    startLabel: "Update the existing NIN address field",
    startDetail: "Use the official NIMC modification service with accepted proof of address, such as a utility bill, tenancy agreement, bank statement or community-leader attestation.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "NIMC also documents an assisted centre procedure",
    alternativeLabel: "If the self-service request is rejected",
    alternativeDetail: "Confirm which official address proof is acceptable and ask NIMC about the centre-assisted option.",
  },
};

// Source-reviewed education service paths: do not infer a transactional online
// registration or certificate replacement merely from an agency information URL.
const verifiedEducationJourneys: Record<string, ServiceJourney> = {
  "jamb-profile-code": {
    mode: "agency-guided", modeLabel: "Linked-SIM SMS, not a website form",
    startLabel: "Text NIN and your 11 digits from your own SIM",
    startDetail: "Send NIN followed by a space and the 11-digit NIN to 55019 or 66019. Check enough airtime and matching NIMC identity first.",
    onlineAvailable: false, physicalStatus: "not-stated",
    physicalLabel: "No visit required for a successful code-retrieval SMS",
    alternativeLabel: "If the SMS is rejected",
    alternativeDetail: "Verify the underlying NIN, candidate-owned SIM and mobile balance; raise a JAMB support ticket before paying for an e-PIN.",
  },
  "jamb-2026-utme-registration": {
    mode: "hybrid", modeLabel: "Paid e-PIN plus accredited CBT enrolment",
    startLabel: "Confirm the correct year's registration window",
    startDetail: "The 2026 fees do not mean October applications remain open. During an active window obtain profile code/e-PIN, then attend an accredited CBT centre.",
    onlineAvailable: true, physicalStatus: "required",
    physicalLabel: "The candidate must attend an accredited CBT centre for biometrics",
    alternativeLabel: "If the centre or biometric capture fails",
    alternativeDetail: "Use JAMB's official ticketing support, retain the transaction and do not pay an unofficial enrolment agent.",
  },
  "jamb-retrieve-lost-epin": {
    mode: "agency-guided", modeLabel: "Linked-SIM UTMEPIN retrieval",
    startLabel: "Recover the previously purchased UTME e-PIN by SMS",
    startDetail: "From the original linked phone number text UTMEPIN to 55019 or 66019. This differs from RESEND (profile code) and DEPIN (Direct Entry).",
    onlineAvailable: false, physicalStatus: "not-stated",
    physicalLabel: "No centre visit needed for successful SMS recovery",
    alternativeLabel: "If no e-PIN is returned",
    alternativeDetail: "Check the genuine vending receipt and submit an official JAMB support ticket before purchasing again.",
  },
  "jamb-direct-entry-2026": {
    mode: "hybrid", modeLabel: "Direct Entry e-PIN and in-person CBT registration",
    startLabel: "Confirm eligibility and buy the DE e-PIN",
    startDetail: "Check the separate Direct Entry qualification and registration window. Take credentials, personal SIM, profile code and DE e-PIN to an accredited CBT centre.",
    onlineAvailable: true, physicalStatus: "required",
    physicalLabel: "The candidate's biometric capture at an accredited CBT centre is mandatory",
    alternativeLabel: "If qualifications or fingerprints cannot be verified",
    alternativeDetail: "Use JAMB's official ticket/credential-correction route rather than substituting a UTME e-PIN.",
  },
  "jamb-print-result": {
    mode: "online", modeLabel: "JAMB e-Facility paid result slip",
    startLabel: "Sign in to the candidate's e-Facility account",
    startDetail: "Choose the result-slip service for the correct exam year; the published schedule lists ₦1,000 and ₦100 CBT service charge. Review live checkout.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No mandatory office visit for portal result-slip printing",
    alternativeLabel: "If payment is confirmed but no slip appears",
    alternativeDetail: "Keep the transaction ID and use JAMB support; do not buy repeated printing requests without reconciliation.",
  },
  "waec-check-result": {
    mode: "online", modeLabel: "WAEC Direct result checking",
    startLabel: "Select exact year and examination type",
    startDetail: "At waecdirect.org enter the candidate number, exam year/type and matching e-PIN and serial number. This is not a certificate replacement.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No physical visit needed for an available online result",
    alternativeLabel: "If the result is held or no record appears",
    alternativeDetail: "Recheck type/year/number first; use WAEC's official complaints or school channel rather than buying many new cards.",
  },
  "waec-digital-certificate": {
    mode: "online", modeLabel: "WAEC candidate Certificate Access",
    startLabel: "Choose Certificate Access, not institutional confirmation",
    startDetail: "Use portal.waec.org's Certificate Access candidate account to verify, access and share the available soft copy; institution confirmation is a different account.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No initial compulsory office visit stated for online candidate access",
    alternativeLabel: "If access or password fails",
    alternativeDetail: "Use WAEC's official account-recovery route or support@waec.org; never hand over OTPs or passwords.",
  },
  "waec-collect-certificate": {
    mode: "physical", modeLabel: "Issuing school or WAEC branch collection",
    startLabel: "Confirm where the original certificate is held",
    startDetail: "School candidates contact their school; private candidates use the WAEC Zonal/Branch office responsible for their examination state. Confirm arrival first.",
    onlineAvailable: false, physicalStatus: "required",
    physicalLabel: "Original certificates are obtained from the school or responsible WAEC office",
    alternativeLabel: "If it has not arrived or the candidate cannot attend",
    alternativeDetail: "Ask the specific school or WAEC branch for arrival date and accepted collection/identity arrangements.",
  },
  "waec-confirm-result-nigeria": {
    mode: "agency-guided", modeLabel: "WAEC document review and courier",
    startLabel: "Prepare the complete local confirmation package",
    startDetail: "Bring official result copy, sworn affidavit, two photos, two 9x4 envelopes and relevant scratch card; WAEC sends the final confirmation to a named institution.",
    onlineAvailable: false, physicalStatus: "may-be-required",
    physicalLabel: "WAEC submission and approved courier handover requirements must be confirmed",
    alternativeLabel: "If the institution says the confirmation did not arrive",
    alternativeDetail: "Trace the approved WAEC courier reference and correct the institution address with WAEC; do not send a normal result screenshot.",
  },
  "waec-lost-certificate": {
    mode: "agency-guided", modeLabel: "WAEC attestation, statement or confirmation",
    startLabel: "Ask the recipient which WAEC document is acceptable",
    startDetail: "WAEC does not routinely duplicate a lost original. Determine whether a WAEC attestation, statement or direct institutional confirmation is required.",
    onlineAvailable: false, physicalStatus: "may-be-required",
    physicalLabel: "The school or WAEC office may require identity and original-record checks",
    alternativeLabel: "If an intermediary offers a 'duplicate certificate'",
    alternativeDetail: "Verify the product and fees with WAEC; use the school principal route for a school-candidate record.",
  },
  "waec-result-confirmation-overseas": {
    mode: "agency-guided", modeLabel: "Recipient-specific WAEC confirmation and courier",
    startLabel: "Confirm the foreign institution and correct destination class",
    startDetail: "Use WAEC's Request Management System for the recipient type. WAEC's own published overseas fee figures conflict, so obtain a live quote before paying.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "WAEC may require original supporting-document submission and approved courier",
    alternativeLabel: "If international charges disagree",
    alternativeDetail: "Keep the editorial conflict visible, confirm the correct international or embassy class with WAEC, and avoid paying an information-only token.",
  },
  "waec-withheld-result-complaint": {
    mode: "online", modeLabel: "WAEC held/withheld complaint portal",
    startLabel: "Follow WAEC's official announcement to the complaint form",
    startDetail: "Use the complaints link published by WAEC Nigeria and identify the correct exam/status. A submission is a defence, not a guaranteed result release.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No mandatory visit stated for online complaint submission",
    alternativeLabel: "If the status is partial, cancelled or a score-review request",
    alternativeDetail: "Consult the school's principal or WAEC for the correct distinct route; do not assume all outcomes are handled through the same form.",
  },
  "neco-2026-ssce-internal-registration": {
    mode: "hybrid", modeLabel: "School-led closed 2026 SSCE Internal cycle",
    startLabel: "Check school validation and closed deadlines",
    startDetail: "Schools had to validate student photocards/lists, obtain NECO State activation, pay TSA/Remita quota and upload before the May 2026 cutoff.",
    onlineAvailable: true, physicalStatus: "required",
    physicalLabel: "Schools require NECO State Office coordination; candidates register through the school",
    alternativeLabel: "If applying now for SSCE External instead",
    alternativeDetail: "Use NECO's separate SSCE External portal; the closed May Internal cycle cannot be reopened by paying an agent.",
  },
  "neco-check-result": {
    mode: "online", modeLabel: "NECO result-token lookup",
    startLabel: "Enter exam type, year, token and registration number",
    startDetail: "Use results.neco.gov.ng with the candidate's exact exam session. The Purchase Token route is separate from checking an already owned token.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No office visit needed for an available online result",
    alternativeLabel: "If the record fails to display",
    alternativeDetail: "Recheck exam year/type/number and ask NECO or the original school about unreleased records before buying more tokens.",
  },
  "neco-purchase-result-token": {
    mode: "online", modeLabel: "NECO Results Portal token account",
    startLabel: "Use Purchase Token on the official results site",
    startDetail: "Sign into the NECO Results Portal or create its token-purchase account, review current charge, pay and retain the receipt/token.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No compulsory physical visit stated for token purchase",
    alternativeLabel: "If paid token is not credited",
    alternativeDetail: "Keep the payment reference, check the portal account, then use NECO support instead of repurchasing immediately.",
  },
  "neco-payment": {
    mode: "hybrid", modeLabel: "NECO general payment and office evidence",
    startLabel: "Get the correct NECO payment-item code",
    startDetail: "The general payments.neco.gov.ng route expressly needs no account; validate the item code, verify the description, pay and retain evidence for the NECO office.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "NECO directs payers to present evidence at the appropriate NECO office",
    alternativeLabel: "If you chose the wrong item or already paid",
    alternativeDetail: "Do not repeat payment; the agency warns completed payments are non-refundable. Contact the responsible NECO office.",
  },
  "neco-certificate-service": {
    mode: "hybrid", modeLabel: "NECO certificate service with office follow-up",
    startLabel: "Distinguish original collection from certificate reprint",
    startDetail: "Use the matching official certificate payment item; for reprint bring the written request and result printout to the responsible NECO office.",
    onlineAvailable: true, physicalStatus: "required",
    physicalLabel: "Certificate release/reprint requires the responsible NECO office's checks",
    alternativeLabel: "If the receipt or certificate is missing",
    alternativeDetail: "Bring examination details and payment evidence to NECO; a result-check token is not a certificate reprint fee.",
  },
  "nysc-registration-local": {
    mode: "hybrid", modeLabel: "NYSC portal registration, later in-person service",
    startLabel: "Check the Senate list and registration option",
    startDetail: "Only locally trained graduates on the approved Senate/Academic Board list can fresh-register. Separate Revalidation and Remobilization options exist.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Deployment and orientation camp may later require attendance, not for every registrant",
    alternativeLabel: "If Senate record or call-up is missing",
    alternativeDetail: "Ask the institution to correct Senate-upload issues and consult the actual NYSC dashboard rather than old camp schedules.",
  },
  "nysc-foreign-trained-registration": {
    mode: "hybrid", modeLabel: "NYSC portal plus original credential verification",
    startLabel: "Prepare full academic and travel originals",
    startDetail: "Register on the official portal, upload credentials and attend the assigned pre-camp or camp verification with the original documents and travel records.",
    onlineAvailable: true, physicalStatus: "required",
    physicalLabel: "NYSC requires physical credential verification for foreign-trained graduates",
    alternativeLabel: "If the verification venue or evaluation is uncertain",
    alternativeDetail: "Use the individual dashboard and NYSC foreign-evaluation support; never rely on a prior batch's venue.",
  },
  "nysc-remobilization": {
    mode: "online", modeLabel: "NYSC approval-first remobilisation",
    startLabel: "Use Apply for Remobilisation for a previous absconder",
    startDetail: "Enter former call-up number, state code, batch and deployment details; the portal says only approved applications can subsequently register.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No mandatory office visit stated for filing the online interest form",
    alternativeLabel: "If you never reported to a former camp",
    alternativeDetail: "Choose Revalidation rather than Remobilization. Married applicants should supply all qualifying marital documents.",
  },
};

// Business, IP and compliance workflows verified against current agency routes.
// Presence of an information URL does not imply self-service approval.
const verifiedBusinessJourneys: Record<string, ServiceJourney> = {
  "cac-business-name-registration": {
    mode: "online", modeLabel: "CAC iCRP name reservation + business registration",
    startLabel: "Reserve a name and keep its AV Code",
    startDetail: "Use iCRP Name Reservation, then Registration → Register New Business; upload each proprietor's ID, photo and signature and follow approval/query status.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No mandatory walk-in step stated for ordinary digital business-name registration",
    alternativeLabel: "If CAC returns Queried",
    alternativeDetail: "Open View Query History → Modify Application; an AV Code or Pending status is not proof of an issued certificate.",
  },
  "cac-company-registration": {
    mode: "online", modeLabel: "CAC iCRP company incorporation, manually approved",
    startLabel: "Choose correct company type and reserve name",
    startDetail: "Submit director/shareholder and incorporation documents in iCRP; CAC still manually reviews LLC incorporations and may require a query response.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "CAC states company incorporation is handled on iCRP with manual officer review",
    alternativeLabel: "If the incorporation is queried",
    alternativeDetail: "Correct the original application in the dashboard rather than paying to reserve the same name again.",
  },
  "cac-name-reservation": {
    mode: "online", modeLabel: "Standard CAC reservation or manual-consent route",
    startLabel: "Choose entity type before checking name",
    startDetail: "Standard available names can receive an AV Code on payment; restricted names require separate consent review rather than instant approval.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No compulsory physical visit stated for standard online name reservation",
    alternativeLabel: "If a restricted name needs consent",
    alternativeDetail: "Use the dedicated consent workflow; keep the approving-officer email response and do not treat payment as approval.",
  },
  "cac-annual-returns": {
    mode: "online", modeLabel: "CAC iCRP entity-specific annual return",
    startLabel: "Check entity type, return year and feature availability",
    startDetail: "CAC states business-name annual returns are available for entities registered before July 2025; the later-registered business-name upgrade is announced, not universally open.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Return filing is online when available for the selected entity",
    alternativeLabel: "If a newer business-name return option is absent",
    alternativeDetail: "Check current CAC iCRP notices and official helpdesk, not an unofficial filing agent or unrelated post-incorporation form.",
  },
  "cac-status-report": {
    mode: "online", modeLabel: "CAC digital E-Status Report",
    startLabel: "Check approved registration downloads first",
    startDetail: "CAC E-Status Report replaced old CAC 1.1, BN 1 and IT 1 issue formats; check entity's issued downloads or the correct post-registration action.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "CAC describes E-Status Reports as electronic services",
    alternativeLabel: "If a bank requests a certified document",
    alternativeDetail: "Ask if it requires a separate CTC, which is not the same as free Public Search or an ordinary downloaded report.",
  },
  "cac-certified-true-copy": {
    mode: "online", modeLabel: "CAC post-incorporation CTC request",
    startLabel: "Identify the exact document being certified",
    startDetail: "Use authorised iCRP post-incorporation access and the specific record; the 12-working-hour company certificate CTC target assumes a complete filing or resolved query.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No mandatory in-person stage stated for the standard iCRP CTC request",
    alternativeLabel: "If CAC queries or cannot find the filing",
    alternativeDetail: "Check authorised entity access and exact historical document; keep the request/reference instead of paying an intermediary.",
  },
  "cac-change-director": {
    mode: "online", modeLabel: "CAC Post Inc. officer-reviewed director change",
    startLabel: "Complete corporate approval before changing CAC record",
    startDetail: "Use iCRP Post Inc. for appointment, cessation or particulars change and supply dated corporate resolution and required consent. Officer review remains manual.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No mandatory physical visit stated for an authorised digital director filing",
    alternativeLabel: "If change also affects PSC ownership",
    alternativeDetail: "Make the distinct beneficial-ownership update; changing the director's name does not automatically amend the PSC record.",
  },
  "cac-change-registered-address": {
    mode: "online", modeLabel: "CAC Post Inc. registered-office update",
    startLabel: "Verify legal office rather than shop location",
    startDetail: "Find the company's RC record on iCRP Post Inc., update the legal office and attach appropriate approval/address evidence. CAC reviews post-incorporation filings manually.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No mandatory physical visit stated for the standard address update",
    alternativeLabel: "If banks still show the old address",
    alternativeDetail: "Obtain CAC's approved updated record and separately update the bank or other authority, not the CAC filing twice.",
  },
  "cac-beneficial-ownership-psc": {
    mode: "online", modeLabel: "CAC PSC filing and Beneficial Ownership Register",
    startLabel: "Identify natural people exercising significant control",
    startDetail: "Report actual direct/indirect voting, shareholding or other control through authorised CAC workflow, then inspect the BOR record.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "PSC reporting uses CAC filings and a public lookup",
    alternativeLabel: "If a corporate parent obscures the human owner",
    alternativeDetail: "Trace natural-person control through the holding chain; a director need not automatically meet the PSC threshold.",
  },
  "cac-public-search": {
    mode: "online", modeLabel: "CAC free basic registry search",
    startLabel: "Search by legal name, RC/BN number or AV Code",
    startDetail: "Use icrp.cac.gov.ng/public-search to match the exact legal entity. A registry result is not a CTC or proof that a salesperson controls the company.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No account or physical visit required for public lookup",
    alternativeLabel: "If a result is missing or mismatched",
    alternativeDetail: "Request an official Status Report/CTC or resolve the issue with CAC before relying on the invoice or seller.",
  },
  "nipo-trademark-registration": {
    mode: "agency-guided", modeLabel: "NIPO accredited-agent e-filing and journal process",
    startLabel: "Search the mark and verify your agent",
    startDetail: "NIPO lists accredited agents and separate search, filing, acceptance, Journal publication, opposition and certificate stages.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "NIPO's published electronic filing is through accredited agents; no universal walk-in requirement shown",
    alternativeLabel: "If the trademark is opposed or queried",
    alternativeDetail: "Work through the official agent/Registry and statutory timetable; acceptance alone does not constitute registration.",
  },
  "nipo-patent-registration": {
    mode: "agency-guided", modeLabel: "NIPO patent filing through authorised agent",
    startLabel: "Prepare full claims, specification and inventor documents",
    startDetail: "Submit petition, specification and claims in duplicate with drawings when necessary; NIPO conducts essentially formal examination.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Accredited-agent filing is available; no compulsory applicant visit shown",
    alternativeLabel: "If invention was already disclosed or priority is uncertain",
    alternativeDetail: "Get qualified patent advice on novelty and priority before further disclosure; maintain annuity calendar after a grant.",
  },
  "nipo-industrial-design-registration": {
    mode: "agency-guided", modeLabel: "NIPO textile/non-textile industrial design filing",
    startLabel: "Document the appearance and novelty claimed",
    startDetail: "Check textile form 1/2 vs non-textile 3/4, prepare statement of novelty and visual representations, then file via recognised NIPO channel.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Agent submission is documented; no compulsory applicant visit established",
    alternativeLabel: "If product's technical function needs protection",
    alternativeDetail: "Review separate patent protection; design registration covers ornamental appearance and has five-year renewals.",
  },
  "copyright-work-registration": {
    mode: "hybrid", modeLabel: "Nigerian Copyright Commission voluntary registration",
    startLabel: "Create NCeRS account or choose NCC filing desk",
    startDetail: "Eligible original works receive copyright automatically. NCeRS can record ownership/creation details, while NCC offices accept manual submissions.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Office attendance applies only if the applicant chooses the supported physical desk option",
    alternativeLabel: "If account activation or upload fails",
    alternativeDetail: "Check activation email and NCeRS help; use the officially published manual registration route rather than assuming copyright expired.",
  },
  "nepc-exporter-registration": {
    mode: "online", modeLabel: "NEPC exporter e-registration and digital certificate",
    startLabel: "Register legal exporter and upload entity-specific documents",
    startDetail: "Apply on nepc.gov.ng/ereg/exporter, confirm payment using Order ID → Get Status and download from Registration Details after approval.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "NEPC has discontinued physical certificate collection",
    alternativeLabel: "If the bank debited but no certificate appears",
    alternativeDetail: "Check NEPC payment confirmation and document review, then contact NEPC support instead of opening a second account.",
  },
  "nepc-exporter-certificate-renewal-verification": {
    mode: "online", modeLabel: "NEPC renewal and independent exporter verification",
    startLabel: "Check expiry and existing account first",
    startDetail: "Initial certificate validity is two years, later renewals annual. NEPC lists ₦7,500 ordinary and ₦12,500 late renewal after three months.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Renewal, certificate download and public verification are online",
    alternativeLabel: "If exporter status cannot be verified",
    alternativeDetail: "Search the public NEPC verifier by name or registration number; reconcile the certificate's original account before repeat payment.",
  },
  "smedan-msme-registration": {
    mode: "online", modeLabel: "SMEDAN signup and business onboarding",
    startLabel: "Create your own official SMEDAN account",
    startDetail: "Sign up with name/email, state genuine CAC registration status and provide product, business size, turnover and employee category.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Standard SMEDAN account onboarding is online",
    alternativeLabel: "If promised a grant for registering",
    alternativeDetail: "SMEDAN registration only creates a business profile. Any loan/grant has separate eligibility and no guaranteed approval.",
  },
  "bpp-contractor-registration": {
    mode: "online", modeLabel: "BPP federal contractor database",
    startLabel: "Use temporary contractor credentials from BPP",
    startDetail: "Create firm account, check email for Contractor ID, complete tax/compliance, board, finance, staff, equipment and project data; print IRR after submission.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "BPP's published national database workflow is online",
    alternativeLabel: "If the company cannot print its IRR",
    alternativeDetail: "Complete missing sections and use BPP's official help route; a database registration is not a contract award.",
  },
  "scuml-certificate-registration": {
    mode: "hybrid", modeLabel: "Free EFCC SCUML sector-specific registration",
    startLabel: "Read the sector-specific free registration checklist",
    startDetail: "Use EFCC's official SCUML registration form and CAC/TIN/professional documents. SCUML says registration and certification are free; further verification may be required.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Original-record or sensitisation checks can be directed by SCUML depending on case",
    alternativeLabel: "If a third party requests a certificate fee",
    alternativeDetail: "Do not pay; SCUML says it has no authorised paid social-media registration agents. Check status on its genuine portal.",
  },
  "scuml-certificate-verification": {
    mode: "online", modeLabel: "EFCC SCUML official certificate verification",
    startLabel: "Enter genuine certificate identifier",
    startDetail: "Open scumlportal.efcc.gov.ng/verify.php directly and compare returned business/registration details against CAC records.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No compulsory office visit stated for standard public verification",
    alternativeLabel: "If the verification record does not match",
    alternativeDetail: "Treat it as unresolved and contact SCUML through its official site; a downloaded PDF alone is not authenticity proof.",
  },
};

// Agency-specific civic, identity, vehicle and tax entry points; do not infer
// that a public information page is a complete application workflow.
const verifiedCivicJourneys: Record<string, ServiceJourney> = {
  "nin-enrolment": {
    mode: "hybrid", modeLabel: "NIMC free enrolment with physical verification",
    startLabel: "Choose a recognised NIMC centre",
    startDetail: "NIMC enrolment is free. Use the enrolment-centre directory and confirm age-specific documents; actual identity/biometric enrolment and collection need the applicant.",
    onlineAvailable: true, physicalStatus: "required",
    physicalLabel: "Applicant must complete required personal NIMC identity/biometric verification",
    alternativeLabel: "If transaction slip does not become an issued NIN",
    alternativeDetail: "Follow up with NIMC using the transaction reference; no duplicate enrolment or paid broker.",
  },
  "nin-date-of-birth-modification": {
    mode: "hybrid", modeLabel: "NIMC DOB change with disputed published fee",
    startLabel: "Check NPC civil certificate and NIMC invoice",
    startDetail: "Date-of-birth change needs qualifying digitised NPC evidence. NIMC lists ₦28,574 on Fees but ₦15,000 on its older detail page.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Assisted NIMC centre route exists if online identity/document verification fails",
    alternativeLabel: "If fees disagree or the DOB request is rejected",
    alternativeDetail: "Preserve the conflict and contact NIMC before payment; do not invent a lower fee or change a mismatched civil record.",
  },
  "nin-phone-modification": {
    mode: "hybrid", modeLabel: "NIMC phone update with lost-SIM evidence",
    startLabel: "Check access to the original device/account",
    startDetail: "Use NIMC self-service to update +234 number and upload a police report when the previous line was lost/damaged.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "NIMC assisted modification may be necessary if account/device recovery fails",
    alternativeLabel: "If the account is locked to an old browser",
    alternativeDetail: "Use NIMC account/device-unlink support, not a third-party account recovery payment.",
  },
  "new-drivers-licence": {
    mode: "hybrid", modeLabel: "FRSC fresh licence and personal VIO/biometrics",
    startLabel: "Start with approved driving-school certificate",
    startDetail: "FRSC fresh application needs school certificate number, online payment, State Board stage, VIO test and applicant's biometric capture.",
    onlineAvailable: true, physicalStatus: "required",
    physicalLabel: "VIO driving test and FRSC physical biometric capture at a centre",
    alternativeLabel: "If application is paid but card is not ready",
    alternativeDetail: "Track with FRSC application ID, retain receipt and contact the selected Driver's Licence Centre.",
  },
  "renew-drivers-licence": {
    mode: "hybrid", modeLabel: "FRSC expired-licence renewal with centre instructions",
    startLabel: "Use DL Application → Renewal for expired card",
    startDetail: "Look up original licence record, class and validity; pay through genuine FRSC route and follow biometric/capture or collection directions.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "FRSC may require applicant attendance for photo and biometric recapture",
    alternativeLabel: "If the licence is still valid or needs a class change",
    alternativeDetail: "Use Reissue/Upgrade rather than automatically choosing Renewal.",
  },
  "vehicle-registration-nvis": {
    mode: "hybrid", modeLabel: "FRSC NVIS plus approved motor licensing centre",
    startLabel: "Check vehicle VIN and approved state licensing centre",
    startDetail: "Use NVIS Register Vehicle to supply vehicle/owner/insurance details; approved centre may handle ownership and plate issuance.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "An approved licensing centre may handle registration validation and plate issuance",
    alternativeLabel: "If a VIN or existing registration is already recorded",
    alternativeDetail: "Use NVIS Continue Existing Registration or contact the licensed centre; do not create duplicate titles.",
  },
  "verify-vehicle-number-plate": {
    mode: "online", modeLabel: "FRSC NVIS independent plate lookup",
    startLabel: "Enter the number plate on the official FRSC form",
    startDetail: "Use nvis.frsc.gov.ng/VehicleManagement/VerifyPlateNo then compare returned details with the physical vehicle. Not title/insurance proof.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No physical visit needed for the basic online plate check",
    alternativeLabel: "If details are missing or inconsistent",
    alternativeDetail: "Ask FRSC or the official licensing authority and separately check vehicle ownership and insurance.",
  },
  "npc-child-birth-registration": {
    mode: "online", modeLabel: "NPC parent/guardian VitalReg birth record",
    startLabel: "Use adult guardian account for child aged 0–17",
    startDetail: "NPC says a child without a NIN can be registered via a parent's valid NIN. Check for prior record before applying.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Portal identity verification may involve parent/guardian facial checks",
    alternativeLabel: "If a different parent cannot see the child",
    alternativeDetail: "Resolve account/record linkage through NPC; do not register the birth twice.",
  },
  "npc-check-attestation-status": {
    mode: "online", modeLabel: "NPC existing attestation Payment Reference",
    startLabel: "Resume the already submitted NPC attestation",
    startDetail: "Open NPC Services or the live VitalReg self-service account; use Payment Reference to check status and download after approval. The former standalone attestation host is currently unreachable.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No compulsory office visit for standard online status lookup",
    alternativeLabel: "If the reference is not recognised",
    alternativeDetail: "Check original receipt/account and use NPC official support before repaying.",
  },
  "npc-modify-birth-record": {
    mode: "online", modeLabel: "NPC digital-record modification",
    startLabel: "Select Modify Record for an existing certificate",
    startDetail: "Use the existing VitalReg dashboard (+) → third Modify Record for a digitised record. Former standalone link is not resolving; old US$20 price must not be treated as current checkout.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Online modification is supported for eligible digitised records",
    alternativeLabel: "If original record is not digitised",
    alternativeDetail: "Contact NPC about legacy record or assisted route before payment; after approval follow separate reprint instructions.",
  },
  "npc-death-registration": {
    mode: "online", modeLabel: "NPC free death notification",
    startLabel: "Start with the informant's own NIN",
    startDetail: "NPC Death Notification states registration is free, requires informant NIN and sends an email after successful entry.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No compulsory personal visit stated on the death-notification entry page",
    alternativeLabel: "If a payment is requested or confirmation missing",
    alternativeDetail: "Check the genuine NPC domain and follow the official reference/support route; a paid broker is not part of free registration.",
  },
  "federal-marriage-application": {
    mode: "hybrid", modeLabel: "Ministry of Interior marriage portal plus registry",
    startLabel: "Choose Ordinary or Special statutory marriage",
    startDetail: "Ministry portal lists ₦75,000 ordinary and ₦100,000 special; submit records online, then attend the assigned federal registry.",
    onlineAvailable: true, physicalStatus: "required",
    physicalLabel: "The couple and any required witnesses must attend the scheduled registry/solemnisation",
    alternativeLabel: "If payment succeeded but no date is confirmed",
    alternativeDetail: "Use the Ministry account/reference and genuine support; payment does not book or solemnise a marriage automatically.",
  },
  "marriage-document-verification-and-ctc": {
    mode: "online", modeLabel: "Federal marriage document verification or certified copy",
    startLabel: "Identify the exact document requested",
    startDetail: "The Ministry offers Document Verification and Certify True Copy as separate ₦50,000 services; select the matching deliverable.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Standard request is through the online federal marriage portal",
    alternativeLabel: "If the ceremony has no federal statutory record",
    alternativeDetail: "Contact the actual issuing religious/customary authority; don't buy a federal CTC without a matching registry entry.",
  },
  "nrs-self-tax-filing": {
    mode: "online", modeLabel: "NRS taxpayer SSO and Return Filing",
    startLabel: "Select Self Tax Filing, then return period",
    startDetail: "NRS Self Tax Filing is separate from Payments and Assessments. Submit an actual return and retain its filing acknowledgement.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No mandatory physical visit stated for NRS online filing",
    alternativeLabel: "If a return is rejected or old TaxPro Max login fails",
    alternativeDetail: "Use NRS SSO/Rev360 migration and official support; a saved draft is not a filed return.",
  },
  "nrs-tax-payment": {
    mode: "online", modeLabel: "NRS payments for identified liability",
    startLabel: "Match taxpayer, assessment and period before paying",
    startDetail: "NRS offers separate Assessments, Taxes Due and Payments. Pay the matching liability, then confirm it posted to the same taxpayer.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No mandatory visit stated for official online tax payment",
    alternativeLabel: "If debited but still showing unpaid",
    alternativeDetail: "Keep payment reference and reconcile with NRS rather than initiating an immediate duplicate payment.",
  },
  "lagos-payer-id": {
    mode: "online", modeLabel: "Lagos Revenue Portal Payer ID creation",
    startLabel: "Use Create Payer ID and one identity criterion",
    startDetail: "The portal accepts NIN, BVN or phone and corresponding legal names. Recover an existing ID instead of creating another.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No physical visit required by the basic Payer ID form",
    alternativeLabel: "If matched identity belongs to someone else",
    alternativeDetail: "Stop and use the official Revenue Portal helpdesk; don't use a borrowed NIN or BVN.",
  },
  "lagos-tax-clearance-verification": {
    mode: "online", modeLabel: "LIRS eTax public TCC verification",
    startLabel: "Enter the exact Lagos TCC certificate number",
    startDetail: "LIRS eTax has a dedicated Verify Tax Clearance Certificate input (e.g. LA/TCC prefix); read the official returned record.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Public certificate verification is online",
    alternativeLabel: "If the record is absent or mismatched",
    alternativeDetail: "Check characters and use LIRS support; don't treat a PDF screenshot as independent verification.",
  },
  "ogun-taxpayer-registration": {
    mode: "online", modeLabel: "Ogun State IRS S-TIN registration/recovery",
    startLabel: "Search by phone or corporate CAC number first",
    startDetail: "Use Ogun IRS Self Service; individual search is by phone, corporate by CAC number, followed by activation email and password.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Ordinary new S-TIN enrolment is online",
    alternativeLabel: "If the activation link cannot be sent",
    alternativeDetail: "Use Ogun's official registration-update support/revenue office rather than generating duplicate accounts.",
  },
  "rivers-rivtin-registration": {
    mode: "online", modeLabel: "Rivers RIVTAMIS search and taxpayer signup",
    startLabel: "Search RivTIN before registering again",
    startDetail: "RIVTAMIS accepts individual or corporate sign-up, email/TAXID login and later Demand Notice/TCC functions.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "RIVTIN account initiation is online",
    alternativeLabel: "If the account remains inactive",
    alternativeDetail: "Use official Rivers IRS support and avoid relying on an assumed 24-hour guarantee.",
  },
  "fct-file-individual-tax-return": {
    mode: "online", modeLabel: "FCT-IRS individual self-service return filing",
    startLabel: "Use current portal link on FCT-IRS website",
    startDetail: "Tax Returns → File Returns → File a New Return, generate Returns Reference Number then complete Parts A–D and submit for approval.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "FCT-IRS publishes electronic return filing",
    alternativeLabel: "If a legacy sign-in URL fails",
    alternativeDetail: "Start from fctirs.gov.ng and choose its current portal; generating a reference alone is not proof of filing.",
  },
};

// 2026 verified banking, telecom, electricity and consumer protection routes.
const verifiedConsumerJourneys: Record<string, ServiceJourney> = {
  "bvn-enrolment": {
    mode: "physical", modeLabel: "CBN free domestic BVN biometric enrolment",
    startLabel: "Attend an authorised bank BVN desk",
    startDetail: "CBN 2026 permits only applicants 18+; registration within Nigeria is free. Personal face/fingerprint enrolment required.",
    onlineAvailable: false, physicalStatus: "required",
    physicalLabel: "A bank BVN enrolment desk captures the applicant's live biometrics",
    alternativeLabel: "If no BVN arrives after capture",
    alternativeDetail: "Keep enrolment reference and follow up with the same bank; do not register a second BVN.",
  },
  "bvn-retrieval": {
    mode: "ussd", modeLabel: "NIBSS registered-SIM BVN retrieval",
    startLabel: "Dial *565*0# on original BVN SIM",
    startDetail: "USSD currently costs ₦20 and will not return the number if the SIM matches multiple BVNs.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No bank visit for a successful same-number USSD lookup",
    alternativeLabel: "If the SIM is lost or linked to more than one BVN",
    alternativeDetail: "Visit your bank with identity evidence to resolve the enrolled phone record.",
  },
  "non-resident-bvn": {
    mode: "online", modeLabel: "CBN-NIBSS remote nonresident BVN registration",
    startLabel: "Use official NRBVN portal from abroad",
    startDetail: "Voluntary remote enrolment and live identity checks; the about-US$50 remote service charge is not a domestic BVN issuance fee.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "NRBVN remote onboarding is available without travel to Nigeria for the biometric stage",
    alternativeLabel: "If remote identity check fails",
    alternativeDetail: "Contact official NIBSS/NRBVN helpdesk using the application reference, not a private agent.",
  },
  "nip-transfer-status": {
    mode: "ussd", modeLabel: "NIBSS 48-hour NIP transaction tracker",
    startLabel: "Dial *565*5# on the sender's registered SIM",
    startDetail: "Enter sender account and exact amount; NIBSS charges ₦20 and only shows the last 48 hours.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "The NIBSS lookup is a USSD check, not a bank-branch reversal",
    alternativeLabel: "If status is failed, yes-but-no-credit, or account not found",
    alternativeDetail: "Failed: sending bank; Yes/no credit: receiving bank; Account not found: correct sender SIM.",
  },
  "cbn-bank-complaint": {
    mode: "online", modeLabel: "CBN complaint after bank escalation period",
    startLabel: "Get the originating bank's complaint ticket first",
    startDetail: "Ordinary issues may allow 14 days; loan/excess-charge categories use 30 days in CBN's published guidance.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Written complaints can also be filed at CBN offices if digital route is unavailable",
    alternativeLabel: "If the bank ignores the complaint",
    alternativeDetail: "Escalate with original bank ticket, timeline and evidence; never submit PIN or OTP.",
  },
  "bvn-validation": {
    mode: "ussd", modeLabel: "NIBSS BVN validity/name check",
    startLabel: "Dial *565*1# for authorised identity check",
    startDetail: "Enter eleven-digit BVN, pay published ₦20 and compare the returned registered name securely.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "No physical visit required for a successful USSD check",
    alternativeLabel: "If the returned name is wrong",
    alternativeDetail: "The BVN owner must request a supported bank amendment, not modify the USSD result.",
  },
  "bvn-data-update": {
    mode: "hybrid", modeLabel: "CBN-controlled BVN amendment through bank",
    startLabel: "Ask your bank for its BVN amendment form",
    startDetail: "Supported DOB corrections are restricted; from May 2026 BVN-linked phone changes are once only.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Bank may require in-person identity verification or biometrics",
    alternativeLabel: "If updated account still shows old registry data",
    alternativeDetail: "Use the bank amendment ticket and ask for actual BVN registry synchronisation.",
  },
  "nin-sim-linkage": {
    mode: "ussd", modeLabel: "NCC free *996# SIM/NIN linkage",
    startLabel: "Dial *996# from the actual SIM",
    startDetail: "SIM registration KYC must match holder's NIN, with VNIN where the operator requests it.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Operator shop needed where subscriber ownership must be corrected",
    alternativeLabel: "If KYC doesn't match NIN",
    alternativeDetail: "Go to the provider with proof of usage and genuine identity; proxy linkage is disallowed.",
  },
  "check-nin-sim-linkage-status": {
    mode: "ussd", modeLabel: "NCC free linkage-status check",
    startLabel: "Dial *996# on the SIM being checked",
    startDetail: "Verify final network linkage status rather than merely receiving an application submission SMS.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Successful lookup is done on the subscriber's mobile line",
    alternativeLabel: "If SIM cannot access the code",
    alternativeDetail: "Contact the provider with the identity and line details; avoid unofficial agents.",
  },
  "fix-failed-nin-sim-linkage": {
    mode: "hybrid", modeLabel: "NCC SIM-NIN mismatch repair",
    startLabel: "Read rejection SMS and inspect owner KYC",
    startDetail: "NIMC errors require record correction; SIM owner mismatch requires network-shop re-registration.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Operator attendance may be needed for barred lines or ownership correction",
    alternativeLabel: "If mismatch persists after valid correction",
    alternativeDetail: "Use operator ticket, then NCC 622 or consumer portal if unresolved.",
  },
  "ncc-telecom-complaint": {
    mode: "online", modeLabel: "NCC escalation after operator ticket",
    startLabel: "Call operator 300 and obtain complaint ID",
    startDetail: "NCC 622 and its Consumer Portal accept unresolved complaints with first-ticket date and evidence.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Online portal or free 622 offers complaint without mandatory office visit",
    alternativeLabel: "If operator's promised deadline passes",
    alternativeDetail: "Escalate using the same original ticket per NCC's 8 October 2026 instructions.",
  },
  "electricity-prepaid-meter-application": {
    mode: "hybrid", modeLabel: "DisCo meter request and MAP installation",
    startLabel: "Open your own DisCo official metering site",
    startDetail: "Confirm free rollout versus upfront MAP, keep payment receipt and installation/energy-credit records.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Meter installation physically takes place at the service address",
    alternativeLabel: "If MAP meter not installed after 10 working days",
    alternativeDetail: "File DisCo complaint; escalate to the state regulator in transferred markets.",
  },
  "electricity-meter-paid-not-installed": {
    mode: "hybrid", modeLabel: "MAP overdue installation and correct regulator",
    startLabel: "Check official payment date and DisCo ticket",
    startDetail: "NERC's metering FAQ cites 10 working days; location determines State Regulator vs NERC escalation.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "DisCo may need on-site inspection or installation; complaint itself need not require attendance",
    alternativeLabel: "If a contractor requests another personal payment",
    alternativeDetail: "Report demand via DisCo ticket; retain original receipt and use competent regulator.",
  },
  "electricity-estimated-billing-dispute": {
    mode: "online", modeLabel: "DisCo billing dispute and location-specific regulator",
    startLabel: "Collect bill, capped kWh and meter evidence",
    startDetail: "Check applicable monthly cap and three-month usage after faulty meter removal, then complain to DisCo.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Written DisCo and regulator complaints are normally possible without office attendance",
    alternativeLabel: "If the disputed estimate persists",
    alternativeDetail: "Use the service address to select State Electricity Regulator or NERC route.",
  },
  "electricity-complaint-escalation": {
    mode: "online", modeLabel: "DisCo first, then correct electricity regulator",
    startLabel: "Find state regulator jurisdiction from NERC notice",
    startDetail: "NERC names 15 transferred states; intrastate complaint there goes to respective state regulator.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Escalation can use the official regulator's published digital or correspondence channel",
    alternativeLabel: "If an old NERC address rejects your state case",
    alternativeDetail: "Follow the state's official Electricity Regulator channel, preserving the DisCo ticket.",
  },
  "electricity-tariff-band": {
    mode: "online", modeLabel: "DisCo bill-based band and tariff verification",
    startLabel: "Read band from recent bill or vending receipt",
    startDetail: "NERC defines A=20, B=16, C=12, D=8, E=4 minimum hours/day, not fixed national naira rates.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Bill and tariff classification checks are digital or documentary",
    alternativeLabel: "If charged band doesn't match supply record",
    alternativeDetail: "Log outages, raise a DisCo ticket and escalate to correct state regulator if unresolved.",
  },
  "fccpc-consumer-complaint": {
    mode: "online", modeLabel: "FCCPC tracked web consumer complaint",
    startLabel: "Sign up at official FCCPC Complaints Portal",
    startDetail: "Describe order, incident, remedy, attach receipts and retain email tracking code; not instant refund.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "FCCPC also accepts official email/letter/walk-in routes if online filing fails",
    alternativeLabel: "If case needs a sector regulator",
    alternativeDetail: "Preserve any separate CBN/NCC case references and respond through original FCCPC case.",
  },
  "vehicle-insurance-validation-ussd": {
    mode: "ussd", modeLabel: "NIID motor policy record check",
    startLabel: "Dial *565*11# or use NIID Check Policy",
    startDetail: "NIBSS charges ₦20 for USSD; NIID has separate askniid.org web checker.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "USSD and web verification require no physical visit",
    alternativeLabel: "If policy number is not found",
    alternativeDetail: "Check plate and contact insurer; database absence alone does not establish uninsured status.",
  },
  "customs-vehicle-duty-verification": {
    mode: "online", modeLabel: "Nigeria Customs CVMS VIN duty verification",
    startLabel: "Check VIN on vehicle and open Customs CVMS",
    startDetail: "Use NCS Customs Verification Management System and retain the official QR/reference receipt.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Standard CVMS VIN lookup is remote if record is available",
    alternativeLabel: "If vehicle VIN and document disagree",
    alternativeDetail: "Seek NCS clarification, not a forged VIN or seller's screenshot.",
  },
  "customs-846-non-standard-vin": {
    mode: "agency-guided", modeLabel: "NCS 846 authorised declarant submission",
    startLabel: "Find an Area Command-approved licensed declarant",
    startDetail: "Customs says 846 portal account creation needs valid Customs Agent Licence; public can verify existing reference.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Licensed agent may attend NCS Area Command approval and clearance stages",
    alternativeLabel: "If nonstandard-VIN filing is claimed by a seller",
    alternativeDetail: "Verify document number at 846.customs.gov.ng/verify and compare against vehicle.",
  },
};

// 2026 agency-specific compliance, labour, pensions and NIMC entry routes.
const verifiedRegulatedJourneys: Record<string, ServiceJourney> = {
  "nafdac-product-registration": {
    mode: "online", modeLabel: "NAFDAC NAPAMS product dossier and regulatory review",
    startLabel: "Open NAPAMS client registration",
    startDetail: "Use category-specific application, upload product/manufacturer dossiers, pay through agency invoice and await regulatory review.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "NAFDAC may require site inspection or sampling/testing",
    alternativeLabel: "If the application is queried or pending",
    alternativeDetail: "Review NAPAMS query and inspection requirements; payment is not an approval.",
  },
  "nafdac-product-verification": {
    mode: "online", modeLabel: "NAFDAC official product registration-number lookup",
    startLabel: "Use iRIMS Verify NAFDAC Documents",
    startDetail: "Enter product registration number in the portal and compare product, holder and registration status against packaging.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Basic product database lookup does not require physical visit",
    alternativeLabel: "If the result conflicts with packaging",
    alternativeDetail: "Escalate to official NAFDAC and do not assume a copied registration number proves authentic product.",
  },
  "nafdac-product-renewal": {
    mode: "online", modeLabel: "NAFDAC original product NAPAMS renewal",
    startLabel: "Check Submitted Applications for original record",
    startDetail: "If legacy registration absent from Product Listing, use the NAFDAC Data Capture flow before renewal.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Updated manufacturing inspection or sampling may be required by category",
    alternativeLabel: "If renewal record cannot be found",
    alternativeDetail: "Use NAPAMS Data Capture; don't create a duplicate new-product registration.",
  },
  "soncap-import-certification": {
    mode: "agency-guided", modeLabel: "SONCAP IAF issuance and 2026 NSW activation",
    startLabel: "Start from SON's March 2026 NSW notice",
    startDetail: "IAFs still issue PC and SC on SON portal; activate certificates on NSW for Form M/PAAR. SONCAP default/import-permit applications use NSW.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "IAF offshore inspections occur before shipment, not a universal Nigerian applicant office visit",
    alternativeLabel: "If a certificate was issued but not activated",
    alternativeDetail: "Open nsw.gov.ng and check importer's activation status; legacy standalone activation is obsolete.",
  },
  "son-mancap-certification": {
    mode: "hybrid", modeLabel: "SON e-MANCAP and physical factory inspection",
    startLabel: "Register with CAC RC and validated TIN at e-MANCAP",
    startDetail: "SON says full locally made product certification requires testing and at least two quarterly inspections.",
    onlineAvailable: true, physicalStatus: "required",
    physicalLabel: "Physical factory inspections and product sampling by SON",
    alternativeLabel: "If only a provisional fast-track logo exists",
    alternativeDetail: "Do not call it full MANCAP; resolve inspection findings and obtain the issued certificate.",
  },
  "son-product-registration": {
    mode: "hybrid", modeLabel: "SON distinct annual Product Registration Certificate",
    startLabel: "Check SON's official product registration FAQ",
    startDetail: "Prepare CAC/trademark/distributor authority/lab report, submit through SON office/channel and confirm one-year validity.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "SON State Office or designated desk may verify and issue records",
    alternativeLabel: "If someone submits a SONCAP PC instead",
    alternativeDetail: "Use the Product Registration Certificate process; SONCAP Product Certificates are separate.",
  },
  "nsitf-employer-registration": {
    mode: "online", modeLabel: "NSITF ECS Employer Self-Service onboarding",
    startLabel: "Create ECS account or activate in-branch record",
    startDetail: "Use employer portal for new ECS number; branch-registered employers use Reset Password. Scheme pays 1% employer-funded payroll.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Ordinary employer enrolment is online",
    alternativeLabel: "If employer already has an ECS number",
    alternativeDetail: "Activate account via in-branch Registered Employer route, not a second company profile.",
  },
  "nsitf-workplace-injury-claim": {
    mode: "agency-guided", modeLabel: "NSITF injury claim through official CCF01 forms",
    startLabel: "Download ECS CCF01 and medical checklist",
    startDetail: "NSITF says injury claims are not yet handled on the Employer Self-Service Portal; medical and employer incident records are required.",
    onlineAvailable: false, physicalStatus: "may-be-required",
    physicalLabel: "Medical examinations and agency claim review can require offline documents",
    alternativeLabel: "If employer refuses or claim is stalled",
    alternativeDetail: "Contact official NSITF Claims and Compensation service and retain medical/incident evidence.",
  },
  "nsitf-compliance-certificate": {
    mode: "online", modeLabel: "NSITF employer contributions and certificate verification",
    startLabel: "Sign in to ECS employer account",
    startDetail: "Confirm employee register, 1% payroll remittances and official certificate issuance/renewal.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "Ordinary account/certificate action is offered online",
    alternativeLabel: "If third-party certificate looks suspicious",
    alternativeDetail: "Use NSITF Verify a Certificate; do not trust image or replace PenCom/ITF certificates.",
  },
  "nde-rhei-registration": {
    mode: "online", modeLabel: "NDE RHEI Phase III — registration closed",
    startLabel: "Read official NDE signup banner before attempting",
    startDetail: "NDE signup expressly says Phase III closed in July 2026; existing applicants may check their Client Portal status.",
    onlineAvailable: false, physicalStatus: "not-stated",
    physicalLabel: "No walk-in can bypass a closed programme intake",
    alternativeLabel: "If an agent offers an October 2026 registration slot",
    alternativeDetail: "Do not pay; await a new official NDE reopening notice and retain prior client dashboard records.",
  },
  "itf-employer-registration": {
    mode: "hybrid", modeLabel: "ITF Form 7A and Area Office assessed registration",
    startLabel: "Download official ITF Form 7A",
    startDetail: "Employer registration needs local Area Office vetting, statutory threshold assessment and RRR payment before National Number.",
    onlineAvailable: true, physicalStatus: "required",
    physicalLabel: "ITF's published process sends Form 7A and receipts to an Area Office",
    alternativeLabel: "If company has an existing National Number",
    alternativeDetail: "Use employer update/Form 5A and original Area Office rather than register a duplicate.",
  },
  "itf-compliance-certificate": {
    mode: "hybrid", modeLabel: "ITF Form 5A/7A and remittance compliance",
    startLabel: "Check ITF employer registration type and forms",
    startDetail: "Use Area Office assessment and 1% annual payroll contribution; e-Certificate sign-in is not the payment assessment.",
    onlineAvailable: true, physicalStatus: "required",
    physicalLabel: "ITF's published process includes Area Office payroll vetting and receipt",
    alternativeLabel: "If below ordinary staff/turnover threshold",
    alternativeDetail: "Procurement bidders may still need ITF compliance evidence; ask official Area Office.",
  },
  "pencom-open-rsa": {
    mode: "hybrid", modeLabel: "PenCom licensed PFA RSA enrolment",
    startLabel: "Choose a licensed PFA; check for existing RSA",
    startDetail: "Identity, employment record and PFA verification required; worker owns provider choice and keeps one RSA across jobs.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "PFA biometric/identity verification may require presence at authorised office",
    alternativeLabel: "If prior RSA PIN is lost",
    alternativeDetail: "Recover through PFA or PenCom rather than open another account.",
  },
  "pencom-job-loss-25-percent-withdrawal": {
    mode: "agency-guided", modeLabel: "PenCom PFA temporary unemployment benefit",
    startLabel: "Confirm four months unemployed and contact your PFA",
    startDetail: "Eligible RSA holder may obtain up to 25% after qualifying job exit and regulated PFA/PenCom checks.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "PFA may require identity or original employment separation evidence",
    alternativeLabel: "If employment is already resumed or holder at retirement",
    alternativeDetail: "Ask PFA which benefit applies; do not use a fraudulent 'pension unlock' agent.",
  },
  "pencom-pension-clearance-certificate": {
    mode: "online", modeLabel: "PenCom e-Hub new PCC applications",
    startLabel: "Apply on Employer Hub, not former PCC system",
    startDetail: "Since 1 July 2026 only e-Hub accepts new PCC; old pcc portal handles prior certificate downloads.",
    onlineAvailable: true, physicalStatus: "not-stated",
    physicalLabel: "PenCom Employer Hub handles new employer PCC submissions",
    alternativeLabel: "If old portal shows only download options",
    alternativeDetail: "This is expected; use ehub.pencom.gov.ng for new filing and submit three-year remittances/group life proof.",
  },
  "fmbn-home-renovation-loan": {
    mode: "agency-guided", modeLabel: "FMBN NHF contributor renovation loan aggregation",
    startLabel: "Check NHF contributions and employer aggregator",
    startDetail: "Six-month NHF contribution, owned/family home and renovation cost evidence; employer/FGSHLB/state body forwards application.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Employer/approved aggregation may require physical verification of records/property",
    alternativeLabel: "If quoted terms come from a different NHF mortgage",
    alternativeDetail: "Ask FMBN for current HRL-specific ceiling, rate and tenor before agreeing.",
  },
  "unclaimed-dividends-nigeria": {
    mode: "online", modeLabel: "SEC search and NIBSS e-DMMS mandate",
    startLabel: "Search your investor name in SEC non-mandated list",
    startDetail: "Identify registrar, start NIBSS e-DMMS mandate or registrar/bank form and verify account ownership.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "Registrar or bank visit remains official fallback for mismatched shareholder identity",
    alternativeLabel: "If deceased holder or changed name",
    alternativeDetail: "Ask registrar for lawful estate/correction procedure; a name-only SEC match does not pay a dividend.",
  },
  "nin-name-modification": {
    mode: "hybrid", modeLabel: "NIMC name-field correction on existing NIN",
    startLabel: "Select name modification on NIMC self-service",
    startDetail: "Use affidavit/newspaper or marriage proof as applicable, verify ordinary-field charge and await approval.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "NIMC authorised centre supports assisted modification when online fails",
    alternativeLabel: "If identity documents disagree",
    alternativeDetail: "Resolve civil record before reapplying; a modification does not create a second NIN.",
  },
  "nin-address-modification": {
    mode: "hybrid", modeLabel: "NIMC supported address-field amendment",
    startLabel: "Open NIMC self-service and select Address",
    startDetail: "Submit new residential address with utility/tenancy/bank/community evidence as accepted.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "NIMC centre-assisted document verification can be needed",
    alternativeLabel: "If account cannot authenticate or bill differs",
    alternativeDetail: "Use original NIN support/centre; avoid creating a duplicate record.",
  },
  "check-nin-number": {
    mode: "ussd", modeLabel: "NIMC existing NIN lookup with *346#",
    startLabel: "Dial *346# from NIN-registered SIM",
    startDetail: "Check old slip first; current NIMC Feb 2026 charter lists ₦50 fee, not old temporary ₦20 waiver.",
    onlineAvailable: true, physicalStatus: "may-be-required",
    physicalLabel: "NIMC centre is fallback where original SIM cannot retrieve record",
    alternativeLabel: "If registered line is lost",
    alternativeDetail: "Use official operator/NIMC identity support, not repeated chargeable USSD from another SIM.",
  },
};

const verifiedPublicRecordJourneys: Record<string, ServiceJourney> = {
  "upgrade-drivers-licence-class": {
    mode: "hybrid", modeLabel: "FRSC renewal/reissue + capture",
    startLabel: "Re-Issue valid licences; Renew expired ones",
    startDetail: "Open the FRSC DL Application menu, enter your existing licence and select the permitted class. Commercial classes must be initiated at a capture centre with medical and driving-school evidence.",
    onlineAvailable: true, physicalStatus: "required", physicalLabel: "FRSC capture or testing stage; commercial classes start at a centre",
    alternativeLabel: "If an upgrade class is not offered online",
    alternativeDetail: "Contact an authorised FRSC capture centre to confirm eligibility. Do not buy a separate unofficial upgrade form.",
  },
  "drivers-licence-verification": {
    mode: "online", modeLabel: "RID quick check or formal request",
    startLabel: "Check RID or licence number",
    startDetail: "Use ndlverification.frsc.gov.ng/verify for a public document check. A full institutional verification request is separate and may involve an agency address and shipping fees.",
    onlineAvailable: true, physicalStatus: "not-stated", physicalLabel: "No public quick-check office visit established",
    alternativeLabel: "If formal agency verification is needed",
    alternativeDetail: "Create a request on the main FRSC verification portal and provide the receiving organisation address, not a personal residential address.",
  },
  "jamb-retrieve-profile-code": {
    mode: "agency-guided", modeLabel: "Registered-SIM text message",
    startLabel: "SMS RESEND to 55019 or 66019",
    startDetail: "Text RESEND from the candidate's original JAMB-registered phone number. This is an SMS service, not a web application or USSD dial code.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No physical visit is necessary for a successful SMS response",
    alternativeLabel: "If the registered SIM is unavailable",
    alternativeDetail: "Contact official JAMB support rather than texting from another person's number.",
  },
  "jamb-reset-profile-password": {
    mode: "agency-guided", modeLabel: "Registered-SIM password reset",
    startLabel: "Text PASSWORD and registered email",
    startDetail: "From the linked SIM send PASSWORD followed by one space and the account email to 55019 or 66019. Use the reply to recover the candidate e-Facility access.",
    onlineAvailable: false, physicalStatus: "not-stated", physicalLabel: "No physical visit established for the SMS reset",
    alternativeLabel: "If the reset fails",
    alternativeDetail: "Use the official JAMB support ticket system; do not pay a third party to read the reset SMS.",
  },
  "jamb-caps": {
    mode: "online", modeLabel: "Candidate JAMB e-Facility",
    startLabel: "Check admission in the candidate e-Facility account",
    startDetail: "Use efacility.jamb.gov.ng/account. The separate caps.jamb.gov.ng/login is an institution/staff login; do not enter candidate credentials there.",
    onlineAvailable: true, physicalStatus: "not-stated", physicalLabel: "Admission-status check does not require an office visit",
    alternativeLabel: "If the record is missing",
    alternativeDetail: "Ask the institution's admissions office to check recognised CAPS records; a direct paid admission-letter print does not create an admission.",
  },
  "nysc-exemption-certificate": {
    mode: "agency-guided", modeLabel: "Institution or NYSC HQ collection",
    startLabel: "Choose home-trained or foreign-trained collection",
    startDetail: "Home-trained graduates obtain exemption certificates through their school. Foreign-trained graduates must appear in person at NYSC HQ at the communicated batch time.",
    onlineAvailable: false, physicalStatus: "required", physicalLabel: "Foreign-trained exemption certificate collection requires personal attendance",
    alternativeLabel: "If the certificate is lost or burnt",
    alternativeDetail: "NYSC does not reprint it; request a Letter of Confirmation using the relevant home/foreign-trained evidence route.",
  },
  "npc-birth-certificate-reprint": {
    mode: "online", modeLabel: "NPC existing certificate reprint",
    startLabel: "Check record and US$30 reprint charge",
    startDetail: "Use certificatereprint.nationalpopulation.gov.ng for an already-issued record. This is different from converting a pre-2023 non-digital certificate.",
    onlineAvailable: true, physicalStatus: "not-stated", physicalLabel: "No compulsory office visit established by the published reprint home page",
    alternativeLabel: "If the record is an old paper certificate",
    alternativeDetail: "Check NPC's separate Certificate Reissuance eligibility, especially the 8 November 2023 issue-date boundary.",
  },
  "npc-digital-birth-certificate-reissuance": {
    mode: "online", modeLabel: "NPC pre-VitalReg reissuance",
    startLabel: "Check certificate date and upload old copy",
    startDetail: "NPC accepts qualifying old non-digital certificates issued before 8 November 2023. US$30 is non-refundable, and an approved download is single-use.",
    onlineAvailable: true, physicalStatus: "not-stated", physicalLabel: "Application and status functions appear online",
    alternativeLabel: "If your certificate is too recent",
    alternativeDetail: "NPC excludes old-format certificates issued after the VitalReg launch; look for the separate new digital certificate route.",
  },
  "inec-find-pvc-pickup-location": {
    mode: "hybrid", modeLabel: "Online lookup + in-person PVC collection",
    startLabel: "Check Uncollected PVC then attend personally",
    startDetail: "Use INEC's Uncollected PVC lookup and verify local collection arrangements before visiting the official collection point. No proxy collection is allowed.",
    onlineAvailable: true, physicalStatus: "required", physicalLabel: "INEC requires voter attendance for card collection",
    alternativeLabel: "If the PVC isn't at the listed centre",
    alternativeDetail: "Check current State/LGA INEC notices; do not mistake the election-day polling-unit locator for a card collection service.",
  },
  "cac-incorporated-trustee-registration": {
    mode: "online", modeLabel: "CAC iCRP end-to-end",
    startLabel: "Reserve name and complete CAC-IT01",
    startDetail: "CAC states Incorporated Trustee registration is end-to-end online, including constitution, trustees, appointment minutes, declarations and final e-certificate on approval.",
    onlineAvailable: true, physicalStatus: "not-stated", physicalLabel: "No mandatory walk-in step in the published CAC route",
    alternativeLabel: "If the application gets a query",
    alternativeDetail: "Answer the query inside the official iCRP. The 24-working-hour service target depends on complete documents and resolved queries.",
  },
  "nin-slip-reissue": {
    mode: "agency-guided", modeLabel: "NIMC documents + Remita invoice",
    startLabel: "Choose the slip reissue reason",
    startDetail: "Prepare the documents for loss, theft, damage or post-modification reissue. NIMC's published prices conflict, so confirm the official generated Remita invoice before payment.",
    onlineAvailable: false, physicalStatus: "may-be-required", physicalLabel: "Document handover via the NIMC-approved reissue route",
    alternativeLabel: "If Remita and NIMC price listings differ",
    alternativeDetail: "Do not pay an unrelated bill. NIMC's Fees table states ₦600/₦1,000 while its older detailed page says ₦500.",
  },
  "fct-verify-tax-clearance": {
    mode: "online", modeLabel: "Official FCT-IRS TCC verification",
    startLabel: "Use TCC Ref#, TIN, verifier name and email",
    startDetail: "Open fcttaxportal.fctirs.gov.ng/tccver.aspx or use the certificate QR code, then compare the response with the presented certificate.",
    onlineAvailable: true, physicalStatus: "not-stated", physicalLabel: "No walk-in required for the online check",
    alternativeLabel: "If the records do not match",
    alternativeDetail: "Contact official FCT-IRS support. A public verification form does not issue a new TCC.",
  },
  "edo-tax-id-access": {
    mode: "online", modeLabel: "JTB portal, *668# or EIRS office",
    startLabel: "Register or verify at tin.jtb.gov.ng",
    startDetail: "Edo IRS also publishes *668# USSD and fourteen zonal tax offices; ERAS is a separate revenue service, not the only Tax ID entry point.",
    onlineAvailable: true, physicalStatus: "may-be-required", physicalLabel: "An office option exists but is not mandatory for the online route",
    alternativeLabel: "If online verification fails",
    alternativeDetail: "Use *668# or visit an authorised EIRS zonal office, such as Oredo 1 at 18 Ihama Road, GRA Benin City.",
  },
  "vehicle-proof-of-ownership-verification": {
    mode: "online", modeLabel: "FRSC NVIS plate/chassis lookup",
    startLabel: "Search by plate or chassis number",
    startDetail: "Use the FRSC NVIS Proof of Ownership Print/Search page, entering the plate number or chassis number and comparing the vehicle and seller records.",
    onlineAvailable: true, physicalStatus: "not-stated", physicalLabel: "Initial NVIS lookup is online; printing may require login",
    alternativeLabel: "If the ownership details conflict",
    alternativeDetail: "Ask the relevant vehicle-registration authority to reconcile ownership; an insurance or number-plate check cannot replace a proof-of-ownership record.",
  },
};

const verifiedFinancialAndPassportJourneys: Record<string, ServiceJourney> = {
  "passport-centre-availability": {
    mode: "online", modeLabel: "NIS pre-application availability",
    startLabel: "Check centre dates before submitting", startDetail: "NIS shows earliest available centre dates, not reserved appointments.",
    onlineAvailable: true,
    physicalStatus: "not-stated", physicalLabel: "No visit to check available dates",
    alternativeLabel: "If the date disappears", alternativeDetail: "Compare another NIS centre; book only from a genuine passport application.",
  },
  "passport-photo-compliance": {
    mode: "online", modeLabel: "NIS photo precheck",
    startLabel: "Test the digital photo first", startDetail: "Test Photo Upload checks proposed photo compliance; biometrics are a different stage.",
    onlineAvailable: true,
    physicalStatus: "not-stated", physicalLabel: "No visit for the image precheck",
    alternativeLabel: "If the photo fails", alternativeDetail: "Correct the image to meet the live NIS validation rules before applying.",
  },
  "passport-appointment": {
    mode: "hybrid", modeLabel: "NIS application plus capture",
    startLabel: "Book against your existing application", startDetail: "Use Book Appointment after completing the real passport application; Check Centre Availability is only a preview.",
    onlineAvailable: true,
    physicalStatus: "required", physicalLabel: "Attend the booked passport office for the NIS photo/biometric stage",
    alternativeLabel: "If dates are unavailable", alternativeDetail: "Check another suitable processing centre on the NIS portal, not an unofficial agent.",
  },
  "passport-application-abroad": {
    mode: "hybrid", modeLabel: "International NIS plus mission",
    startLabel: "Use Apply from outside Nigeria", startDetail: "Follow the official international route and the responsible Embassy, High Commission or Consulate.",
    onlineAvailable: true,
    physicalStatus: "required", physicalLabel: "The responsible mission requires document verification and biometrics",
    alternativeLabel: "If the mission is not accepting bookings", alternativeDetail: "Ask that specific Nigerian mission for current processing arrangements.",
  },
  "passport-name-change": {
    mode: "hybrid", modeLabel: "NIS Change of Data",
    startLabel: "Use correction, not ordinary renewal", startDetail: "Name addition, deletion, replacement and rearrangement require supporting civil evidence, payment and biometric attendance.",
    onlineAvailable: true,
    physicalStatus: "required", physicalLabel: "Original passport and evidence presented for NIS capture",
    alternativeLabel: "If documents have inconsistent names", alternativeDetail: "Reconcile supporting civil records before paying a non-refundable NIS fee.",
  },
  "passport-change-marital-status": {
    mode: "hybrid", modeLabel: "NIS marital-status correction",
    startLabel: "Use Change of Data with marriage evidence", startDetail: "The published change route needs marriage, affidavit, age/origin, newspaper and original passport evidence.",
    onlineAvailable: true,
    physicalStatus: "required", physicalLabel: "NIS office visit for original checks and biometric capture",
    alternativeLabel: "If also changing a surname", alternativeDetail: "Keep the desired order of names consistent with all supporting documents.",
  },
  "official-nigerian-passport": {
    mode: "hybrid", modeLabel: "NIS restricted official passport",
    startLabel: "Check eligibility and employer introduction", startDetail: "The blue passport requires an NIS-listed official category, authorised organisational evidence and a capture appointment.",
    onlineAvailable: true,
    physicalStatus: "required", physicalLabel: "Identity and biometric enrolment at the official centre",
    alternativeLabel: "If official category cannot be confirmed", alternativeDetail: "Ask NIS or the applicant's government organisation; do not use an ordinary passport renewal.",
  },
  "emergency-travel-certificate": {
    mode: "agency-guided", modeLabel: "Nigerian mission emergency document",
    startLabel: "Confirm ETC versus STEP with your mission", startDetail: "NIS has published an emergency certificate and announced STEP replacement; verify actual document and travel validity.",
    onlineAvailable: false,
    physicalStatus: "may-be-required", physicalLabel: "The mission may need personal identity/capture attendance",
    alternativeLabel: "If departure or transit is uncertain", alternativeDetail: "Ask the Nigerian mission and carrier which emergency document is acceptable before paying.",
  },
  "e-cerpac-renewal": {
    mode: "hybrid", modeLabel: "NIS category-specific e-CERPAC",
    startLabel: "Check existing permit category and expiry", startDetail: "Sign in on NIS e-CERPAC, update category documents, make official payment and follow identity/biometric instructions.",
    onlineAvailable: true,
    physicalStatus: "may-be-required", physicalLabel: "NIS may direct additional identity or biometric steps",
    alternativeLabel: "If employer or category changed", alternativeDetail: "Ask NIS about a fresh class or regularisation before attempting routine renewal.",
  },
  "nhia-find-right-health-plan": {
    mode: "online", modeLabel: "NHIA programme selector",
    startLabel: "Use Get Covered employment questions", startDetail: "The NHIA questionnaire recommends eligible programme routes; it does not activate insurance.",
    onlineAvailable: true,
    physicalStatus: "not-stated", physicalLabel: "Programme selection is online; later enrolment varies",
    alternativeLabel: "If no recommendation fits", alternativeDetail: "Contact NHIA to distinguish employer, GIFSHIP and other plan eligibility.",
  },
  "nhia-private-sector-coverage": {
    mode: "agency-guided", modeLabel: "Employer-led NHIA OPSSHIP",
    startLabel: "Employer applies to NHIA", startDetail: "NHIA states that businesses with five or more employees apply first; NHIA then coordinates workforce enrolment.",
    onlineAvailable: false,
    physicalStatus: "may-be-required", physicalLabel: "NHIA may require employer/forms coordination",
    alternativeLabel: "If the employer has fewer than five staff", alternativeDetail: "Review NHIA's individual or group GIFSHIP route instead of claiming OPSSHIP eligibility.",
  },
  "nhia-gifship-enrolment": {
    mode: "hybrid", modeLabel: "NHIA GIFSHIP and Remita",
    startLabel: "Confirm package and collect official forms", startDetail: "Individuals/families may use an NHIA office or approved form submission; groups have separate Remita and ten-member rules.",
    onlineAvailable: true,
    physicalStatus: "may-be-required", physicalLabel: "Forms or enrolment evidence can require NHIA office support",
    alternativeLabel: "If premium wording does not add up", alternativeDetail: "NHIA's own family wording is inconsistent: confirm the package price before payment.",
  },
  "pencom-transfer-rsa": {
    mode: "hybrid", modeLabel: "Receiving PFA via RSA Transfer System",
    startLabel: "Begin with your chosen receiving PFA", startDetail: "Check the 365-day rule and ECRS data recapture before requesting transfer.",
    onlineAvailable: true,
    physicalStatus: "may-be-required", physicalLabel: "Biometric identity verification may require a PFA visit",
    alternativeLabel: "If the application is rejected", alternativeDetail: "Ask the receiving PFA to review ECRS biometrics or last transfer date.",
  },
  "pencom-unremitted-contributions": {
    mode: "agency-guided", modeLabel: "PFA reconciliation or PenCom complaint",
    startLabel: "Check PFA credits before alleging non-remittance", startDetail: "Distinguish genuinely unpaid remittances from funds already held but not credited to the RSA.",
    onlineAvailable: false,
    physicalStatus: "may-be-required", physicalLabel: "A PFA can request identity documents or data recapture",
    alternativeLabel: "If your employer failed to remit", alternativeDetail: "Report the employer name and address directly to PenCom and retain the complaint reference.",
  },
  "pencom-micro-pension-registration": {
    mode: "hybrid", modeLabel: "PenCom Personal Pension Plan (PPP)",
    startLabel: "Enrol at a licensed PFA under PPP", startDetail: "The old Micro Pension Plan is now called PPP; contributions are voluntary with regulated retirement/contingent allocations.",
    onlineAvailable: true,
    physicalStatus: "may-be-required", physicalLabel: "The PFA may require identity/ECRS verification",
    alternativeLabel: "If offered a legacy Micro Pension form", alternativeDetail: "Confirm the current PPP terms and legal PFA identity before contributing.",
  },
  "nhf-registration-and-contributions": {
    mode: "hybrid", modeLabel: "FMBN iBank NHF self-service",
    startLabel: "Register or activate contributor at iBank", startDetail: "Use Individual Contributor → email/BVN OTP, account activation, Contribution History and Self Service → Statement of Account.",
    onlineAvailable: true,
    physicalStatus: "not-stated", physicalLabel: "The official iBank portal supports the documented enrolment and statement routes.",
    alternativeLabel: "If payroll deductions are missing", alternativeDetail: "Compare Contribution History with employer remittances and use FMBN's official reconciliation support.",
  },
  "nhf-contribution-refund": {
    mode: "online", modeLabel: "FMBN iBank Refund menu",
    startLabel: "Use Refund → Proceed to Application", startDetail: "The current official portal lets an eligible contributor select a refund condition, upload evidence and submit Apply.",
    onlineAvailable: true,
    physicalStatus: "not-stated", physicalLabel: "No mandatory office visit is stated in FMBN iBank's published refund instructions.",
    alternativeLabel: "If the eligible condition is absent", alternativeDetail: "Do not invent eligibility or pay an agent; confirm retirement, age, incapacity or estate rules with FMBN.",
  },
  "nhf-mortgage-loan": {
    mode: "hybrid", modeLabel: "FMBN iBank loan request plus underwriting",
    startLabel: "Open Loans → Initiate Loan", startDetail: "Choose a loan type, attach property/income documents, use Check Affordability and submit Request; FMBN/PMB underwriting follows.",
    onlineAvailable: true,
    physicalStatus: "may-be-required", physicalLabel: "Property, title and lender checks may need documents or in-person follow-up.",
    alternativeLabel: "If online submission is rejected", alternativeDetail: "Check the contributor record, accredited PMB and property's title/affordability with FMBN.",
  },
  "nelfund-loan-repayment": {
    mode: "online", modeLabel: "NELFUND employer and borrower records",
    startLabel: "Check your repayment trigger and employer status", startDetail: "Two years after NYSC applies to those who served; employed borrowers must update the employer for salary deductions.",
    onlineAvailable: true,
    physicalStatus: "not-stated", physicalLabel: "No mandatory office visit established for account updates",
    alternativeLabel: "If self-employed", alternativeDetail: "Submit business details within the terms' 60-day window and use the authorised fund instructions.",
  },
  "nelfund-loan-status-and-upkeep": {
    mode: "online", modeLabel: "NELFUND disbursement dashboard",
    startLabel: "Check tuition and upkeep separately", startDetail: "School institutional charges and student-bank upkeep are different disbursements; neither guarantees the other is paid.",
    onlineAvailable: true,
    physicalStatus: "not-stated", physicalLabel: "Status view is online; bank/school reconciliation may follow",
    alternativeLabel: "If one payment is stuck", alternativeDetail: "Check the appropriate school or bank record and raise an official fund support case.",
  },
};

/** Only manually researched route records qualify for a second-case decision.
 * Generated default journeys are deliberately excluded: they do not verify
 * that a special alternative or fully online route really exists. */
export function hasReviewedServiceJourney(slug: string): boolean {
  return Boolean(
    verifiedRegulatedJourneys[slug] || verifiedConsumerJourneys[slug] ||
    verifiedCivicJourneys[slug] || verifiedBusinessJourneys[slug] ||
    verifiedEducationJourneys[slug] || verifiedFinancialAndPassportJourneys[slug] ||
    verifiedSecurityJourney[slug] || verifiedPublicRecordJourneys[slug] ||
    verifiedEditorialJourneys[slug] ||
    ["glo-esim-activation", "glo-port-number-to-glo", "glo-sim-replacement",
      "bvn-validation", "bvn-data-update"].includes(slug)
  );
}

export function getServiceJourney(service: Service): ServiceJourney {
  if (verifiedRegulatedJourneys[service.slug]) return verifiedRegulatedJourneys[service.slug];
  if (verifiedConsumerJourneys[service.slug]) return verifiedConsumerJourneys[service.slug];
  if (verifiedCivicJourneys[service.slug]) return verifiedCivicJourneys[service.slug];
  if (verifiedBusinessJourneys[service.slug]) return verifiedBusinessJourneys[service.slug];
  if (verifiedEducationJourneys[service.slug]) return verifiedEducationJourneys[service.slug];
  if (verifiedFinancialAndPassportJourneys[service.slug]) return verifiedFinancialAndPassportJourneys[service.slug];
  if (verifiedSecurityJourney[service.slug]) return verifiedSecurityJourney[service.slug];
  if (verifiedPublicRecordJourneys[service.slug]) return verifiedPublicRecordJourneys[service.slug];
  if (verifiedEditorialJourneys[service.slug]) return verifiedEditorialJourneys[service.slug];
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

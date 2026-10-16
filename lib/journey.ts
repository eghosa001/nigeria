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

export function getServiceJourney(service: Service): ServiceJourney {
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

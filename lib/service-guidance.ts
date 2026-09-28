import type { Service } from "@/lib/types";
import { getAgency } from "@/lib/data";
import { getServiceJourney } from "@/lib/journey";

export type GuidanceCard = {
  title: string;
  detail: string;
  linkHref?: string;
  linkLabel?: string;
};

export type DetailedServiceGuidance = {
  route: {
    startTitle: string;
    startDetail: string;
    physicalTitle: string;
    physicalDetail: string;
    fallbackTitle: string;
    fallbackDetail: string;
  };
  aftercare: GuidanceCard[];
};

const explicit: Record<string, DetailedServiceGuidance> = {
  "jamb-direct-entry-2026": {
    route: {
      startTitle: "Get the profile code and Direct Entry e-PIN first",
      startDetail: "Use the candidate's unique phone number linked to the JAMB profile. JAMB's current FAQ says the profile code is generated from the candidate's NIN, then the profile code is used to buy the Direct Entry e-PIN through an approved vending channel.",
      physicalTitle: "Finish registration personally at an accredited CBT centre",
      physicalDetail: "Take the profile code and Direct Entry e-PIN to a JAMB-accredited CBT centre. JAMB requires the candidate to be physically present: the centre validates the profile, captures the candidate's photograph and all ten fingerprints, records the chosen institutions/programmes and qualification details, and prints the registration slip after biometric confirmation.",
      fallbackTitle: "If the code, e-PIN or registration fails",
      fallbackDetail: "Use the same unique phone number for JAMB recovery commands where applicable, or use JAMB's official support channel. Do not let a cybercafé or CBT operator keep your profile password, e-PIN or unique SIM.",
    },
    aftercare: [
      {
        title: "Check the registration slip before you leave",
        detail: "Read the printed Direct Entry registration slip carefully. Confirm your name, NIN-linked biodata, phone/email, qualification, institution choices and programme choices before treating the registration as complete.",
      },
      {
        title: "Keep the unique SIM, profile code and e-PIN",
        detail: "JAMB treats the unique mobile number as the candidate's identifier for present and future transactions. Keep access to that SIM and retain the profile code, e-PIN and registration number privately.",
      },
      {
        title: "Upload any awaiting result as soon as it is available",
        detail: "If you registered with an awaiting result, JAMB says the result must later be uploaded on its portal. An institution's recommendation is not considered where the required result has not been uploaded.",
      },
      {
        title: "Use JAMB channels for corrections or admission follow-up",
        detail: "For a registration problem, use JAMB's official support/e-Facility route. For admission progress later, use JAMB CAPS rather than relying on an admission claim from a third party.",
        linkHref: "/services/jamb-caps",
        linkLabel: "Open the JAMB CAPS guide →",
      },
    ],
  },

  "jamb-2026-utme-registration": {
    route: {
      startTitle: "Create the profile code, then buy the UTME e-PIN",
      startDetail: "Use the candidate's own unique phone number and NIN to generate the JAMB profile code. Present that profile code at an approved e-PIN vending channel and keep the e-PIN sent to the registered number.",
      physicalTitle: "Registration is completed at an accredited CBT centre",
      physicalDetail: "The candidate must personally present the profile code and e-PIN at a JAMB-accredited CBT centre. The centre captures the candidate's photograph and ten fingerprints, records institution/course choices and prints the registration slip after biometric authentication.",
      fallbackTitle: "Recover through JAMB, not an agent",
      fallbackDetail: "JAMB publishes SMS recovery routes for lost profile codes/e-PINs and an official support system. Keep the unique SIM because it remains tied to the candidate's JAMB transactions.",
    },
    aftercare: [
      { title: "Read the registration slip immediately", detail: "Before leaving the CBT centre, check the biodata, subject combination, examination town, institutions and programmes shown on the printed slip." },
      { title: "Keep the registered SIM active", detail: "The unique mobile number remains an identifier for JAMB transactions. Keep the profile code, e-PIN, registration number and email secure." },
      { title: "Upload an awaiting O'Level result later", detail: "If you registered with awaiting result, upload the result to JAMB when it becomes available; JAMB says institutions cannot rely on an unuploaded result." },
      { title: "Use the official portal for later services", detail: "Result slips, admission letters, CAPS and other candidate services should be handled through JAMB's official channels.", linkHref: "/categories/education", linkLabel: "See JAMB-related guides →" },
    ],
  },

  "passport-renewal": {
    route: {
      startTitle: "Use the NIS Renewal/Reissue workflow",
      startDetail: "From the passport application dashboard choose Renewal/Reissue, verify the NIN and date of birth, enter the current passport details, select the processing centre and booklet size, upload the required photo/documents, review the application, pay and book the biometric appointment.",
      physicalTitle: "Biometric capture at the selected Immigration office is required",
      physicalDetail: "NIS states that renewal/reissue applicants must appear at the chosen Immigration office for biometric data capture. The online application and payment do not replace that appointment.",
      fallbackTitle: "Use the selected NIS office or official NIS support",
      fallbackDetail: "If the dashboard, payment or appointment step fails, use the Nigeria Immigration Service's official contact/office route. Do not pay a separate 'processing agent' to bypass the biometric stage.",
    },
    aftercare: [
      { title: "Keep the application, payment and appointment records", detail: "Save the application reference, payment receipt and appointment details. You may need them when you attend the selected passport office or when following up." },
      { title: "Attend biometric enrolment with the required originals", detail: "Appear at the selected Immigration office for biometric capture and take the current passport booklet plus the supporting documents used for the reissue application." },
      { title: "Watch the dashboard and valid email for the next instruction", detail: "NIS asks applicants to provide a valid email for further communication. Follow the application status and the collection instruction tied to your processing centre." },
      { title: "Escalate through NIS, not an unofficial middleman", detail: "If processing stalls, use the responsible passport office or official NIS service/contact route and keep your receipt/application reference ready.", linkHref: "/offices", linkLabel: "Find official NIS routes →" },
    ],
  },

  "first-nigerian-passport": {
    route: {
      startTitle: "Create a fresh passport application on the NIS portal",
      startDetail: "Start the fresh application with the applicant's NIN and civil/identity documents, choose the passport office and booklet, complete the official payment and book the enrolment appointment.",
      physicalTitle: "Fresh applicants still attend the chosen passport office",
      physicalDetail: "The passport is not issued from the online form alone. Attend the selected NIS passport office for biometric enrolment and any original-document checks required for the fresh application.",
      fallbackTitle: "Use the NIS office responsible for the application",
      fallbackDetail: "If the portal cannot complete the application or an identity detail does not match, resolve it through NIS/NIMC as appropriate before paying an unofficial agent to 'fix' the record.",
    },
    aftercare: [
      { title: "Retain the payment and appointment evidence", detail: "Keep the application reference, receipt and appointment record until the passport has been collected." },
      { title: "Take the originals used for the application", detail: "Attend biometric enrolment with the NIN and civil/identity evidence required for the fresh passport application." },
      { title: "Follow the centre's collection instruction", detail: "Monitor the application channel/email for the next instruction after enrolment; collection is handled through the responsible NIS process." },
      { title: "Correct mismatched identity data before retrying", detail: "Where NIN/civil data does not match the passport application, use the responsible official correction route rather than submitting conflicting information." },
    ],
  },

  "nin-date-of-birth-modification": {
    route: {
      startTitle: "Start in NIMC's self-service modification portal",
      startDetail: "Sign in, choose Date of Birth modification, complete the payment generated by the official portal, enter the NPC birth-certificate or attestation details, upload the supporting document, preview the change and submit.",
      physicalTitle: "A NIMC centre is the assisted fallback, not the default first step",
      physicalDetail: "NIMC publishes self-service modification for eligible requests. If your case cannot be completed in self-service, use an official NIMC enrolment/modification centre and take the original NIN slip plus the supporting civil record and payment evidence required for modification.",
      fallbackTitle: "Use NIMC's assisted modification route",
      fallbackDetail: "If account access or document validation blocks self-service, use NIMC's official support/centre route. NIMC has also advised that a self-service account can be tied to the browser/device used to register it.",
    },
    aftercare: [
      { title: "Keep the modification transaction slip", detail: "Save the payment reference and the transaction/modification slip after submission. They are the evidence to use if the request needs follow-up." },
      { title: "Do not assume payment means the date has changed", detail: "The request still needs NIMC approval. Follow the request status rather than using the new date on other records before NIMC has updated the NIN record." },
      { title: "Download the updated NIN slip after approval", detail: "Once NIMC approves the change, download or print the updated NIN slip and verify that the date of birth now matches the approved civil record." },
      { title: "Use an official NIMC centre if validation fails", detail: "If NPC-record validation or self-service access fails, take the supporting record and transaction evidence to the official NIMC support/modification route.", linkHref: "/offices", linkLabel: "Find NIMC office routes →" },
    ],
  },

  "new-drivers-licence": {
    route: {
      startTitle: "Complete accredited driving-school training first",
      startDetail: "A fresh applicant needs the driving-school certificate number before starting the driver's-licence application. Complete the online form, pay the licence fee and continue through the official process.",
      physicalTitle: "The fresh licence process has multiple physical stages",
      physicalDetail: "FRSC's current process includes payment confirmation at the State BIR, a VIO driving test and biometric capture by FRSC at the Driver's Licence Centre. Fresh applicants must complete the full process before activating the digital licence.",
      fallbackTitle: "Track or edit the application on the official licence portal",
      fallbackDetail: "The FRSC portal provides application editing, acknowledgement-slip printing and status tracking. Use the DLC/MLA/VIO route shown by FRSC for unresolved application or collection issues.",
    },
    aftercare: [
      { title: "Keep the application form and acknowledgement/temporary card", detail: "Retain the documents generated during the application because FRSC says the application form or temporary card is used when collecting the original licence card." },
      { title: "Finish BIR, VIO and FRSC capture stages", detail: "A successful online payment is not the end of a fresh application. Complete payment confirmation, the VIO test and FRSC biometric capture where required." },
      { title: "Track the application before going for collection", detail: "Use the official driver's-licence status-tracking service, then follow the DLC/MLA/VIO collection instruction for the original card." },
      { title: "Activate eNDL only after the fresh process is complete", detail: "FRSC states that fresh applicants must complete the full application process, including biometric enrolment, before digital-driver's-licence activation." },
    ],
  },

  "cac-business-name-registration": {
    route: {
      startTitle: "Do the business-name process end-to-end on CAC's CRP",
      startDetail: "Check name availability, reserve the name when required, complete the online pre-registration form, upload the requested registration documents and pay the filing fee through the Company Registration Portal.",
      physicalTitle: "There is no certificate-pickup visit in the standard digital route",
      physicalDetail: "CAC states that business-name registration is end-to-end on the CRP. After approval, the electronic Certificate of Registration and Certified Extract are generated for download rather than physical pickup.",
      fallbackTitle: "Use CAC support if the CRP application stalls",
      fallbackDetail: "If name reservation, payment, upload or approval status is stuck, use CAC's official portal support/contact route. CAC also states that individual proprietors can register a business name without a lawyer, chartered accountant or chartered secretary.",
    },
    aftercare: [
      { title: "Monitor the CRP dashboard for approval", detail: "The application is not complete merely because the filing fee was paid. Watch the entity/application status in the Company Registration Portal." },
      { title: "Download both electronic registration documents", detail: "On approval, CAC says the Certificate of Registration and Certified Extract of registration information are generated electronically on the portal." },
      { title: "Check the registered particulars before using the documents", detail: "Verify the business name, proprietor information and other registration particulars shown in the electronic documents before using them for banking, tax or contracting." },
      { title: "Use CAC support for rejected or stalled filings", detail: "For a query, resubmission or portal problem, use CAC's official support/contact route and keep the application/entity details available." },
    ],
  },

  "nysc-registration-local": {
    route: {
      startTitle: "Confirm your name is on the approved Senate/Academic Board list",
      startDetail: "A locally trained graduate should confirm eligibility first, then register on the NYSC portal during the active mobilisation window using the correct matriculation number, functional email, Nigerian GSM number and biometric registration process.",
      physicalTitle: "The online registration leads to deployment and camp reporting",
      physicalDetail: "NYSC registration itself is online, but mobilisation does not end on the portal. A successfully mobilised prospective corps member receives a call-up number and then reports physically to the orientation camp named in the call-up letter.",
      fallbackTitle: "Missing from the Senate list? Start with your institution",
      fallbackDetail: "NYSC says locally trained graduates whose names are not on the approved Senate/Academic Board list cannot register. If your record is missing or incorrect, the institution is the first place to resolve the submission before trying repeated portal registrations.",
    },
    aftercare: [
      { title: "Look for the call-up number after successful registration", detail: "NYSC states that successful registration originates a call-up number. Keep checking the dashboard rather than treating completion of the form as final deployment." },
      { title: "Access the call-up letter through the correct route", detail: "Prospective corps members who subscribed for online printing can print the call-up letter online; NYSC says others collect it through their institutions." },
      { title: "Read the deployment details before travelling", detail: "Use the call-up letter to confirm the state, orientation camp and reporting instructions, then prepare the originals/documents required for camp verification." },
      { title: "Use NYSC mobilisation/ICT or the State Secretariat for registration problems", detail: "NYSC says registration complaints are handled through its Corps Mobilisation/ICT channels and State Secretariats rather than unofficial admission or deployment agents.", linkHref: "/offices", linkLabel: "See official NYSC routes →" },
    ],
  },

  "waec-check-result": {
    route: {
      startTitle: "Use WAEC Direct with the exact examination details",
      startDetail: "Enter the examination number, year and examination type, then provide the result-checker e-PIN/PIN and serial details requested by WAEC Direct before submitting the result query.",
      physicalTitle: "No office visit is required just to view the standard online result",
      physicalDetail: "The result-checking step is online. An office or school becomes relevant later for certificate collection, confirmation, correction or a complaint—not for the normal WAEC Direct lookup.",
      fallbackTitle: "Separate a result-checking problem from a certificate problem",
      fallbackDetail: "If the e-PIN has reached its allowed uses, WAEC says a new result-checker card is required. If the result is held/withheld or the certificate has an error, use the specific WAEC complaint/certificate route rather than repeatedly buying result-checker PINs.",
    },
    aftercare: [
      { title: "Save or print the displayed result for your records", detail: "Keep a personal copy of the result you viewed, but remember that an online result printout and an original WAEC certificate are not the same document." },
      { title: "Keep track of result-checker PIN usage", detail: "WAEC Direct limits the number of checks available on a result-checker card; once the allowed uses are exhausted, use a new valid card rather than an unofficial PIN seller." },
      { title: "Use the certificate route when you need the actual certificate", detail: "School candidates normally collect through the school, while private candidates use the responsible WAEC Zonal/Branch office.", linkHref: "/services/waec-collect-certificate", linkLabel: "Open certificate collection guide →" },
      { title: "Use the specific complaint route for held or withheld results", detail: "A held/withheld-result issue is different from an e-PIN failure; use WAEC's complaint process for that status.", linkHref: "/services/waec-withheld-result-complaint", linkLabel: "Open withheld-result guide →" },
    ],
  },

  "waec-collect-certificate": {
    route: {
      startTitle: "First identify whether you were a school or private candidate",
      startDetail: "That determines the collection point. School candidates should start with the school where they sat the examination; private candidates should use the WAEC Zonal or Branch office responsible for the state where they sat.",
      physicalTitle: "Certificate collection is a physical handover route",
      physicalDetail: "Take the candidate/examination identification requested by the school or WAEC office and check the certificate details before leaving the collection point.",
      fallbackTitle: "Use WAEC directly when the normal collection point cannot resolve it",
      fallbackDetail: "If a school-candidate certificate cannot be located through the school, or a private-candidate collection cannot be resolved at the responsible office, escalate through WAEC's official contact/branch route with the examination details.",
    },
    aftercare: [
      { title: "Check every printed detail at collection", detail: "Verify the candidate name, examination year/number and other certificate particulars before leaving. An error should be handled through WAEC's certificate-correction route." },
      { title: "Store the original certificate safely", detail: "WAEC states that its certificates do not expire, so protect the original rather than repeatedly carrying it for routine verification." },
      { title: "Use confirmation services when an institution needs WAEC to send proof directly", detail: "Some institutions require an official confirmation sent by WAEC rather than a candidate-provided copy.", linkHref: "/services/waec-confirm-result-nigeria", linkLabel: "See WAEC confirmation guide →" },
      { title: "Use the correction guide if the certificate itself is wrong", detail: "Do not alter or annotate the certificate yourself; use WAEC's official correction process.", linkHref: "/services/waec-correct-certificate-error", linkLabel: "Open certificate correction guide →" },
    ],
  },
};

const agencyFallback: Record<string, string> = {
  nis: "Use the Nigeria Immigration Service's official passport office/contact route and keep the application reference and payment evidence ready.",
  nimc: "Use NIMC's official support or enrolment/modification centre. Take the NIN and any transaction/supporting-document evidence connected to the request.",
  frsc: "Use the official driver's-licence portal plus the DLC/MLA/VIO route shown by FRSC for the application type.",
  cac: "Use CAC's Company Registration Portal support/contact route with the entity name, application details and payment reference.",
  jamb: "Use JAMB's official e-Facility/support route and keep the unique SIM, profile code, e-PIN or registration number relevant to the problem.",
  waec: "Use WAEC's official branch/support route with the candidate's examination number, year and examination type.",
  neco: "Use NECO's official result/payment/verification support route and keep the candidate/result or transaction details relevant to the request.",
  nysc: "Use NYSC's official portal, Corps Mobilisation/ICT support or the appropriate State Secretariat with the prospective corps member's details.",
  npc: "Use the National Population Commission's official self-service/status route or the responsible registration centre with the application reference.",
  nrs: "Use the Nigeria Revenue Service self-service/support route with the taxpayer account, TIN and transaction reference relevant to the request.",
  fctirs: "Use FCT-IRS's official portal/support route with the taxpayer/TCC details relevant to the request.",
  eirs: "Use Edo IRS's official revenue portal/support channel with the taxpayer and transaction details.",
  airs: "Use Anambra IRS's official tax portal/support channel with the ASIN/taxpayer details.",
  "lagos-revenue": "Use the Lagos State Revenue Portal/support channel with the payer ID and transaction details.",
};

function findPhysicalStep(service: Service) {
  return service.steps.find((step) => /attend|visit|centre|center|office|biometric|fingerprint|capture|collect|school|institution|VIO|BIR/i.test(step));
}

function evidenceFor(service: Service) {
  if (/jamb/i.test(service.agencySlug)) return "Keep the registration/profile reference, the unique SIM and any e-PIN or printed slip produced by JAMB.";
  if (service.agencySlug === "nis") return "Keep the application reference, payment receipt, appointment details and any acknowledgement generated by the NIS process.";
  if (service.agencySlug === "cac") return "Keep the application/entity reference, payment evidence and every document generated in the CAC portal.";
  if (service.agencySlug === "frsc") return "Keep the application form, payment evidence and acknowledgement/temporary card generated during the licence process.";
  if (service.agencySlug === "nimc") return "Keep the NIN, payment reference and transaction/modification slip connected to the request.";
  if (service.agencySlug === "nysc") return "Keep the NYSC dashboard credentials, registration/call-up details and any downloadable slip or letter generated by the portal.";
  return "Keep the application/reference number, payment receipt, acknowledgement or downloadable record produced by this service.";
}

function completionFor(service: Service) {
  if (service.timeline) return service.timeline;
  const last = service.steps.at(-1);
  if (last) return "For this guide, the last published process step is: " + last;
  return "The responsible agency does not currently publish a reliable fixed completion time for this service.";
}

function defaultGuidance(service: Service): DetailedServiceGuidance {
  const journey = getServiceJourney(service);
  const agency = getAgency(service.agencySlug);
  const agencyName = agency?.shortName ?? agency?.name ?? "the responsible agency";
  const first = service.steps[0] ?? "Open the responsible agency's official service route.";
  const second = service.steps[1];
  const physical = findPhysicalStep(service);

  return {
    route: {
      startTitle: journey.startLabel,
      startDetail: second ? first + " Then " + second.charAt(0).toLowerCase() + second.slice(1) : first,
      physicalTitle: journey.physicalLabel,
      physicalDetail: physical
        ? "The in-person or assisted stage stated in this guide is: " + physical
        : "The current sources for " + service.shortTitle + " do not state a compulsory walk-in stage for the standard route.",
      fallbackTitle: "If this specific process gets stuck",
      fallbackDetail: agencyFallback[service.agencySlug] ?? ("Use " + agencyName + "'s official support/contact route and quote the reference generated by this application."),
    },
    aftercare: [
      { title: "Keep the evidence for " + service.shortTitle, detail: evidenceFor(service) },
      { title: "Complete the final published step", detail: service.steps.at(-1) ?? "Follow the final instruction displayed by the responsible agency." },
      { title: "Know what counts as completion", detail: completionFor(service) },
      { title: "Escalate with the right reference", detail: agencyFallback[service.agencySlug] ?? ("Use " + agencyName + "'s official support channel with the application/reference details.") },
    ],
  };
}

export function hasExplicitServiceGuidance(slug: string) {
  return Boolean(explicit[slug]);
}

export function getDetailedServiceGuidance(service: Service): DetailedServiceGuidance {
  return explicit[service.slug] ?? defaultGuidance(service);
}

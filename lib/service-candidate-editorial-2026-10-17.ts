import type { Service } from "@/lib/types";

// Dated, source-specific existing-service corrections: 17 October 2026.
// No new pages, new fees or fabricated transaction confirmations. Historic
// source instructions and dynamically available registration windows differ.
type ServiceAmendment = { lead: string; notes: string[]; step: string; sources: string[] };
const amendments: Record<string, ServiceAmendment> = {
  "jamb-correct-gender": {
    "lead": "Correct a gender entry using JAMB e-Facility's Correction of Data, paying through the JAMB transaction and completing any biometric or institution-endorsed indemnity stage the candidate's case requires. Payment alone is not approval.",
    "notes": [
      "JAMB's specific Change of Gender instructions say that a printed indemnity form goes to the candidate's institution for endorsement, then through a JAMB state office. Its current support FAQ also directs candidates seeking data changes to a CBT centre or JAMB state office for biometric verification: follow the stage displayed for the particular record rather than treating a generated receipt as completion.",
      "Retain the JAMB transaction ID, institution-endorsed form and later profile notification separately. If the application stays pending, identify whether the institution has forwarded the form before starting another paid correction."
    ],
    "step": "After any payment, check the candidate dashboard for an indemnity form or office instruction; obtain the necessary institution endorsement and biometric verification at an accredited centre or JAMB State Office as directed, then monitor the JAMB decision.",
    "sources": [
      "https://support.jamb.gov.ng/faqs",
      "https://jamb.gov.ng/payment-Services",
      "https://portal.jamb.gov.ng/changeGender.htm"
    ]
  },
  "jamb-correct-state-lga": {
    "lead": "Use JAMB Correction of Data for a genuine mistake in state or Local Government Area of origin; the record must agree with authentic origin and identity evidence, and the JAMB transaction is not final until its approval stage is completed.",
    "notes": [
      "Before paying, compare State/LGA values on the JAMB profile, original NIN record and authentic state-of-origin evidence. A correction that creates contradictory government records can cause later admission and mobilisation mismatches.",
      "JAMB's current support FAQ says correction requests use the paid e-Facility route and an accredited CBT centre or JAMB State Office for biometric verification; follow any additional indemnity and institution-approval instructions generated for your case. Do not purchase a second correction solely because the new value has not appeared immediately."
    ],
    "step": "If the submitted correction has not appeared, check JAMB e-Facility payment and application status, confirm whether any institution approval is still outstanding, and use JAMB support with the original transaction ID.",
    "sources": [
      "https://support.jamb.gov.ng/faqs",
      "https://jamb.gov.ng/payment-Services"
    ]
  },
  "jamb-correct-date-of-birth": {
    "lead": "JAMB date-of-birth correction is a paid identity-record change, not an instant profile edit. First reconcile the date on NIMC and birth evidence, then complete JAMB's current e-Facility, biometric and institutional-approval requirements as directed.",
    "notes": [
      "JAMB's current support guidance explicitly says DOB modifications must synchronise with the verified NIMC national identity record. Correct a wrong underlying NIMC entry before creating another contradictory DOB in JAMB.",
      "Keep the JAMB transaction ID and any institutional indemnity acknowledgement. A fee receipt confirms a transaction, not that JAMB has approved the change or that NYSC automatically updated its own record."
    ],
    "step": "After the paid request, confirm whether JAMB requires a CBT-centre or state-office biometric check and an institution-endorsed indemnity form, then check the updated biodata in e-Facility before presenting it to the school.",
    "sources": [
      "https://support.jamb.gov.ng/faqs",
      "https://jamb.gov.ng/payment-Services"
    ]
  },
  "jamb-change-name": {
    "lead": "For spelling or name-order mistakes on a JAMB record, use Correction of Data from the existing e-Facility profile. Check the underlying NIN and examination identity first; fees, verification and approval are separate stages.",
    "notes": [
      "JAMB's support FAQ groups name corrections with other paid data modifications and directs candidates to biometric verification at an accredited CBT centre or JAMB State Office. Some individual correction routes additionally display institution approval instructions; follow the actual workflow attached to the candidate's request.",
      "Match the final surname, middle-name order and initials across the NIN, JAMB registration, O-level certificate and admission record before declaring the correction complete. Do not make a new profile to work around a stuck application."
    ],
    "step": "Save the correction transaction reference and check JAMB's application status after completing its requested verification; contact JAMB support with the reference if the corrected name remains absent.",
    "sources": [
      "https://support.jamb.gov.ng/faqs",
      "https://jamb.gov.ng/payment-Services"
    ]
  },
  "jamb-change-course-institution": {
    "lead": "A JAMB change of course or institution changes the candidate's selection on the JAMB record; it does not itself guarantee admission or automatically update a university's independent screening portal.",
    "notes": [
      "Before changing a choice, verify the receiving programme's subject combination, minimum screening eligibility and the institution's own current deadline. An available JAMB correction control is not evidence that the institution still has places.",
      "After a successful JAMB transaction, compare the modified choice on e-Facility and any live institution portal. If they disagree, keep the JAMB transaction ID and contact the institution's admissions team or JAMB support rather than paying an agent for an unverified synchronisation service."
    ],
    "step": "When the modified choice appears on JAMB, inspect CAPS and the receiving institution's current admissions notices separately; do not interpret a changed preference as an admission offer.",
    "sources": [
      "https://support.jamb.gov.ng/faqs",
      "https://jamb.gov.ng/payment-Services"
    ]
  },
  "jamb-regularization-condonement": {
    "lead": "JAMB calls this route Condonement of Illegal Admission (Foreign/Local). It is a formal reconciliation of an admission not properly processed by JAMB and requires issuer and institution checks; paying for the form does not validate an admission automatically.",
    "notes": [
      "JAMB's current Payment & Services table lists ₦10,000 for foreign/local condonement plus a ₦300 CBT service charge. This should not be confused with a ₦2,500 name/date correction or the separate transfer and admission-letter service fees.",
      "An institution must be able to corroborate the actual admission, programme and date. If the school has not recognised the admission or the applicant has no consistent evidence, escalation through JAMB and the institution is more appropriate than repeat payment."
    ],
    "step": "Retain the application and transaction reference, and ask the institution's admissions office which endorsement it must send to JAMB before expecting any corrected admission record or registration number.",
    "sources": [
      "https://jamb.gov.ng/payment-Services",
      "https://support.jamb.gov.ng/faqs"
    ]
  },
  "jamb-examination-slip-2026": {
    "lead": "The JAMB 2026 Examination Notification Slip identifies a candidate's assigned UTME session, reporting time and centre; a general UTME timetable or CBT-centre address cannot replace the individual slip.",
    "notes": [
      "JAMB's own 2026 registration instructions require candidates to keep their unique linked phone number and accurate examination identity. Use the candidate's original registration details when querying the slip rather than asking a third-party agent to recover them.",
      "A main-UTME notification is not automatically a mop-up eligibility notice. If the official slip tool is closed after the relevant examination window, check JAMB's current candidate notices for a mop-up-specific printing announcement instead of treating an old 2026 link as always available."
    ],
    "step": "If an examination date, centre or session displayed on a copied screenshot differs from the portal-generated slip, rely on the latest personally retrieved JAMB instruction and contact official JAMB support before travel.",
    "sources": [
      "https://support.jamb.gov.ng/faqs",
      "https://www.jamb.gov.ng/Bulletin/2026/JAMBulletin_02-02-2026.pdf"
    ]
  },
  "nysc-senate-list": {
    "lead": "Locally trained graduates can register with NYSC only when their institution has uploaded an approved Senate/Academic Board results entry matching their matriculation and identity details. A missing record is primarily an institution-side issue.",
    "notes": [
      "NYSC's mobilisation guidance says Corps Producing Institutions prepare and submit Senate/Academic Board approved lists for screening. A graduate cannot add a name to this list by creating a new NYSC account or buying registration assistance.",
      "If your name is missing, confirm matriculation number, surname and graduation record with the institution's Student Affairs/Mobilisation Officer. Ask whether the corrected list was actually uploaded and screened for the active batch before attempting another portal registration."
    ],
    "step": "Where the checker returns a mismatch or missing entry, save only a non-sensitive description of the problem and follow up with the institution that submitted the Senate list, not with an unauthorised NYSC intermediary.",
    "sources": [
      "https://platforms.nysc.gov.ng/mobreg.html",
      "https://platforms.nysc.gov.ng/corpmob.html"
    ]
  },
  "nysc-correct-date-of-birth": {
    "lead": "NYSC's date-of-birth correction uses a WAEC verification PIN and the exact examination type, year and examination number. It must be handled during the permitted registration stage; NYSC says it will not change a completed service certificate later.",
    "notes": [
      "The official NYSC correction page gives a Verify step before Submit or Cancel. Inspect the WAEC record returned before submitting: a wrong exam year or exam-number mismatch is not solved by inventing a different date in the NYSC form.",
      "NYSC expressly says DOB corrections are not entertained once a prospective corps member has been deployed and commenced the service year. This is a more serious deadline than the appearance of the Date of Birth menu on old screenshots."
    ],
    "step": "After the WAEC verification result is displayed, submit only if the returned identity record is the candidate's own; if it mismatches, cancel and resolve the underlying examination details before trying again.",
    "sources": [
      "https://platforms.nysc.gov.ng/correctdob.html",
      "https://platforms.nysc.gov.ng/mobreg.html"
    ]
  },
  "nysc-lost-exemption-certificate": {
    "lead": "NYSC does not replace a lost or burnt Certificate of Exemption with another certificate. Instead, request a Letter of Confirmation, using the correct route for home-trained or foreign-trained graduates.",
    "notes": [
      "Do not use the NYSC Certificate of National Service replacement pathway for a lost Certificate of Exemption. These are different document categories and the NYSC exemption guidance explicitly names a Letter of Confirmation.",
      "A home-trained applicant should first contact the original graduating institution because NYSC expects that institution to forward the loss request. Foreign-trained applicants apply to NYSC headquarters with the additional passport data-page evidence specified by NYSC."
    ],
    "step": "Before sending originals or sensitive identification, confirm the delivery and acknowledgement process with the institution or NYSC's official office; retain copies of the police extract and affidavit for any follow-up.",
    "sources": [
      "https://www.nysc.gov.ng/certcollectexp.html",
      "https://platforms.nysc.gov.ng/corpmob.html"
    ]
  },
  "nysc-relocation": {
    "lead": "NYSC relocation is an official electronic request tied to a serving corps member's state code and documented ground. Uploading a marriage or health document does not authorise a move until NYSC approves the application.",
    "notes": [
      "The NYSC mobilisation department distinguishes deployment, relocation and remobilisation. A corps member who never reported to a camp needs a different process from one seeking transfer after posting; check the case before opening the wrong form.",
      "For health and marital grounds, check that the supplied evidence actually satisfies NYSC's published category requirements. Do not send private medical records to purported NYSC agents on messaging platforms or travel on a pending, unofficial approval screenshot."
    ],
    "step": "If the dashboard still shows relocation as submitted or recommended, do not travel to the requested state on the strength of that status. Check with the serving State Coordinator about current posting duties; only an NYSC-approved relocation notice with the new state and reporting particulars changes where to report.",
    "sources": [
      "https://platforms.nysc.gov.ng/corpmob.html",
      "https://platforms.nysc.gov.ng/mobreg.html"
    ]
  },
  "nysc-revalidation": {
    "lead": "Revalidation is for a graduate previously deployed by NYSC who did not report to orientation camp. It is not remobilisation for someone who began service and later absconded; institutions may need to submit revalidation lists for the next batch.",
    "notes": [
      "NYSC's Mobilisation Department says corps-producing institutions submit revalidation lists alongside Senate/Academic Board approved results under the active mobilisation timetable. Being listed in a previous batch does not itself guarantee that the next batch accepted the record.",
      "Use the original candidate portal account and coordinate with the institution's Student Affairs office. If a form is missing outside an active NYSC window, wait for the official timetable instead of paying to create a duplicate identity."
    ],
    "step": "Before making new travel arrangements, verify both the approved revalidation and a fresh personal call-up in the candidate's official NYSC account.",
    "sources": [
      "https://platforms.nysc.gov.ng/corpmob.html",
      "https://platforms.nysc.gov.ng/mobreg.html"
    ]
  },
  "nysc-call-up-letter": {
    "lead": "NYSC issues an individual call-up letter after mobilisation. The candidate's state, camp and reporting instructions must be read from that personal letter, not inferred from a batch calendar shared online.",
    "notes": [
      "NYSC's mobilisation timetable separates Senate-list uploads, online registration, deployment printing and actual orientation. A published orientation date can precede a candidate's call-up printing window; do not travel based on the timetable alone.",
      "Candidates paying for optional online call-up-letter printing must use their original NYSC account. Where NYSC specifies institutional collection instead, ask the graduating school rather than paying a separate third-party PDF service."
    ],
    "step": "When the letter becomes available, cross-check state, camp address, orientation date and eligibility documents against the latest official NYSC notice and save a copy before making transport plans.",
    "sources": [
      "https://platforms.nysc.gov.ng/corpmob.html",
      "https://platforms.nysc.gov.ng/mobreg.html"
    ]
  },
  "inec-new-voter-registration": {
    "lead": "INEC's nationwide Continuous Voter Registration notice currently says the 2025–2026 exercise has ended. First-time registrants should wait for a formally reopened window; the portal's older menu descriptions do not prove that biometric enrolment is accepting applications today.",
    "notes": [
      "INEC's older Get Started page still lists New Voter Online Registration and Pre-Registration, but its live home page announces that CVR is not currently active. When these pages disagree, do not assume a clickable archived service label means a new application will be processed.",
      "Before attempting a fresh registration, use INEC's existing-voter status checker if you may already be registered. Duplicate records can create administrative problems; a genuine new registration requires completing the authorised process and any specified biometric stage when the commission reopens it."
    ],
    "step": "If the current INEC home page still says CVR has ended, do not submit through a cached pre-registration shortcut; monitor INEC's official notice for the next opening before preparing an in-person appointment.",
    "sources": [
      "https://cvr.inecnigeria.org/",
      "https://cvr.inecnigeria.org/Public/getStarted"
    ]
  },
  "inec-pvc-status": {
    "lead": "INEC's current CVR page says new registration is closed, but existing voters can still choose Find My PVC to check status and collection information. This lookup is different from the registration-centre or polling-unit locator.",
    "notes": [
      "If the new-voter registration form is unavailable, use the existing-voter route on the live CVR page, not an old enrolment link. INEC explicitly keeps PVC status and collection-centre lookup available after the CVR exercise ended.",
      "When a PVC lookup cannot match the entered name, date or registration location, compare the original voter details before reporting a missing card. A polling unit is where voting occurs; it need not be the office that holds an uncollected PVC."
    ],
    "step": "For a voter-status mismatch, use INEC's separate Voter Verification Service with the registered state/LGA and either the candidate's name/date of birth or VIN as requested, then ask INEC directly about collection problems.",
    "sources": [
      "https://cvr.inecnigeria.org/",
      "https://cvr.inecnigeria.org/vvs"
    ]
  },
  "inec-polling-unit-locator": {
    "lead": "Find your assigned INEC polling unit by checking the voter record or PVC code and using INEC's official polling-unit locator. The assigned voting place is not necessarily the same as the PVC collection office.",
    "notes": [
      "INEC's Voter Verification Service can search using registered name and birth date or a voter identification number (VIN), with state and LGA. Use it to validate the underlying voter record if the polling-unit directory lookup seems inconsistent.",
      "Use the state, LGA, ward and polling-unit number from the actual INEC record when asking for directions. Do not assume the geographically nearest centre is your assigned polling unit, and a locator search does not transfer voter registration."
    ],
    "step": "If your assigned polling unit differs from a nearby registration centre, follow the INEC voter-record details and use only a formally available transfer service rather than submitting another registration.",
    "sources": [
      "https://inecnigeria.org/polling-units/",
      "https://cvr.inecnigeria.org/vvs"
    ]
  },
  "neco-2026-timetable": {
    "lead": "NECO's 2026 SSCE Internal and External timetables are separate official documents. The External examination is scheduled for 4–21 November 2026; read the specific paper and practical dates in the attached timetable instead of a generic calendar.",
    "notes": [
      "NECO's current official website separately publishes 2026 SSCE External registration guidance: normal registration closes 26 October 2026 at midnight, after which the announced ₦5,000 late-registration charge applies. This is a registration rule, not a fee for downloading the timetable.",
      "For External candidates, match the timetable's subject paper, time, centre arrangements and any practical component against the candidate's registration record. A date range for the whole examination is not the start time for each subject."
    ],
    "step": "If a revised timetable appears on the NECO website, replace a saved social-media timetable copy with that later official document before arranging work leave or travel.",
    "sources": [
      "https://neco.gov.ng/",
      "https://ssceexternal.neco.gov.ng/"
    ]
  },
  "neco-e-verify": {
    "lead": "NECO e-Verify has separate Individual and Institutional verifier accounts. Paying for a token alone does not produce a verified result; the dashboard requires payment validation, a correctly submitted examination record and retrieval of the report.",
    "notes": [
      "The NECO portal says an institution can verify a candidate's purchased token/RRR from its dashboard, or the candidate can submit a request using the institution's reference code. This is different from emailing the institution a screenshot of a payment receipt.",
      "If an e-Verify request is blocked, check examination year/type and number, the account category and the Validate Token Payment status before purchasing another token. NECO publishes everifysupport@neco.gov.ng for portal help; never send passwords or unused tokens to strangers."
    ],
    "step": "If the report is not available immediately, return to View Report on the authorised dashboard after validation and check the nominated recipient email before raising a duplicate application.",
    "sources": [
      "https://everify.neco.gov.ng/"
    ]
  },
  "waec-digital-certificate": {
    "lead": "WAEC's DigiCert portal separates Candidate Certificate Access from institutional Certificate Confirmation. Use the candidate account to retrieve and share your own WAEC certificate; an employer's confirmation account is not a candidate login.",
    "notes": [
      "WAEC's February 2026 notice says its digital-certificate system now operates across the member countries and supports secure access, sharing, confirmation and examination-number recovery. Certificate availability must still be checked against the candidate's own exam record, not inferred from a successful account sign-up.",
      "WAEC's candidate registration page explicitly warns that it never solicits passwords, payment details or sensitive biodata through SMS, phone, email or social messaging. Its official support@waec.org contact can assist with platform enquiries."
    ],
    "step": "When an employer requests verification, decide whether to share from Candidate Certificate Access or grant appropriate consent for the institution's Confirmation workflow; do not hand over your account password.",
    "sources": [
      "https://portal.waec.org/account/register",
      "https://blog.waec.org/waec-begins-full-implementation-of-digital-certificate-services-across-its-member-countries/"
    ]
  },
  "nabteb-result-checker": {
    "lead": "Use NABTEB's eWorld checker with the correct candidate number, exam type, four-digit year, card serial and unique 12-digit PIN. The PIN and card serial are different fields; mixing them blocks result retrieval.",
    "notes": [
      "NABTEB's official eWorld page requires the alphabet-prefixed scratch-card serial number and separate 12-digit PIN. It warns not to reuse a card already used for another candidate; a failed lookup should first prompt an exam-year/type and candidate-number check.",
      "The historical eWorld page also displays an SMS format to 32327, but a published format is not proof that the shortcode is reliably working today. Prefer the current website and verify any live SMS fees or availability directly before using the mobile alternative."
    ],
    "step": "After viewing the result, inspect the subject grades and candidate identity carefully; if an essential detail mismatches the registered exam record, contact NABTEB through its official contact route rather than buying repeated scratch cards.",
    "sources": [
      "https://eworld.nabteb.gov.ng/",
      "https://nabteb.gov.ng/"
    ]
  },
  "waec-2026-private-candidates-timetable": {
    "lead": "The 2026 WASSCE Private Candidates Second Series final timetable is published by WAEC Nigeria as an attachment to its own notice. Use that document, not the School Candidates or First Series schedule.",
    "notes": [
      "At the official WAEC notice, look for the attachment named 'WASSCE (PC 2) 2026 TIME TABLE.pdf'. That file identifies the examination series; a blog post with only the same year in the headline may refer to a different sitting.",
      "For each subject, check the exam paper name, relevant practical or oral component and date in the final attached file. Centre allocation and candidate-specific reporting instructions are separate from the nationwide timetable."
    ],
    "step": "Before travelling, verify the downloaded PDF came from WAEC Nigeria's announcement and check your examination admission details for the assigned centre; do not rely on a timetable screenshot without the attachment context.",
    "sources": [
      "https://www.waecnigeria.org/index.php/article/wassce-private-candidates-2026-second-series-final-timetable"
    ]
  }
};

export function applyCandidateServiceReviews20261017(service: Service): Service {
  const change = amendments[service.slug];
  if (!change) return service;
  const sources = [...service.sources];
  for (const url of change.sources) {
    const i = sources.findIndex(source => source.url === url);
    if (i >= 0) sources[i] = { ...sources[i], lastChecked: "2026-10-17" };
    else sources.push({
      label: service.agencySlug.toUpperCase() + " official service procedure / checked notice",
      agency: service.agencySlug.toUpperCase(),
      url,
      lastChecked: "2026-10-17",
    });
  }
  return {
    ...service,
    summary: change.lead,
    steps: service.steps.includes(change.step) ? service.steps : [...service.steps, change.step],
    notes: [...service.notes, ...change.notes.filter(note => !service.notes.includes(note))],
    sources,
    lastVerified: "2026-10-17",
  };
}

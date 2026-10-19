import type { Service } from "@/lib/types";

/**
 * One genuinely useful update to an existing 2026 private-candidate guide.
 * Read from NECO's Reviewed 2026 SSCE External registration guideline,
 * linked on neco.gov.ng and ssceexternal.neco.gov.ng (19 October 2026).
 * Numbers and procedures apply ONLY to External; never mix with school
 * SSCE Internal or infer that paying online completes fingerprint capture.
 */
export function applyNecoExternalCandidateDecisions20261019(service: Service): Service {
  if (service.slug !== "neco-2026-ssce-external-registration") return service;

  const sources = [
    ...service.sources.map(source =>
      ["https://neco.gov.ng/?page_id=27", "https://ssceexternal.neco.gov.ng/"].includes(source.url)
        ? { ...source, lastChecked: "2026-10-19" }
        : source),
    {
      label: "NECO — Reviewed 2026 External guidelines and 4–21 November timetable (official download page)",
      agency: "National Examinations Council",
      url: "https://neco.gov.ng/",
      lastChecked: "2026-10-19",
    },
  ];

  return {
    ...service,
    title: "NECO GCE 2026: ₦30,000 Fee, 16 Subjects, Biometrics & Registration Deadline",
    shortTitle: "NECO GCE 2026 (SSCE External)",
    summary: "For private candidates, NECO's 2026 External exam has only 16 available subjects. Ordinary registration is ₦30,000 before payment charges until 26 October; 27 October–3 November adds ₦5,000. An online receipt alone is not registration: candidates still need NIN, a suitable photograph, fingerprint capture, a readable attested photocard and an assigned examination centre.",
    feeLabel: "₦30,000 standard; late +₦5,000; walk-in ₦43,000 (transaction charges extra)",
    feeNote: "NECO's Reviewed 2026 External guideline prices ordinary registration at ₦30,000, including a four-figure table and waterproof certificate folder. Stamp duty, service and Remita charges are additional and the fee is non-refundable. Registration from 27 October to 3 November costs another ₦5,000 (₦35,000 before charges). Separately, NECO lists ₦43,000 for a walk-in candidate; this is not the same as a normal late application. Check the official checkout for the payable total. These are External rates, not fees for SSCE Internal.",
    timeline: "26 October 2026 (normal deadline); 27 October–3 November (late, +₦5,000); 4–21 November (exam). Final subject, centre and session times must be checked on the official timetable/photocard.",
    requirements: [
      "Check that your required subject is among NECO External's 16 available subjects BEFORE paying; it is not the full SSCE Internal syllabus.",
      "A valid National Identification Number (NIN) entered correctly against the candidate's biodata.",
      "A recent passport-size photograph, no more than six months old, with a white background; a camera photo taken during registration is permitted where the system allows it.",
      "Access to the candidate's own email or phone, the official NECO External account and an accepted payment method.",
      "Attend a reputable cybercafé/registration point for the candidate's own biometric fingerprint capture and completion; creating an account and paying from a phone is not enough.",
      "Choose the correct examination state and neighbourhood carefully; the selected neighbourhood cannot be changed after upload.",
      "Obtain a clear NECO photocard, the examination timetable and the required referee's endorsement. Bring the signed/stamped photocard to the assigned exam centre.",
    ],
    steps: [
      "First confirm the exact subjects you need. The 2026 External list is Accounting, Agricultural Science, Biology, Chemistry, Christian Religious Studies, Civic Education, Commerce, Economics, English Language, General Mathematics, Geography, Government, Islamic Studies, Literature-in-English, Marketing and Physics. A subject not on this list cannot be registered for this sitting.",
      "Open ssceexternal.neco.gov.ng, not the schools-only SSCE Internal portal. Create/activate your own External account (or sign in) and check the Reviewed 2026 External guideline and timetable linked by NECO.",
      "Prepare a valid NIN, an accessible email/phone and a white-background photograph no more than six months old. Check the spelling of every name and the date of birth against identity documents before submitting candidate biodata.",
      "Pay only through NECO's official account/checkout, using an offered card, internet banking, USSD, wallet or bank-branch option. Ordinary registration is ₦30,000 before transaction charges; late registration from 27 October adds ₦5,000. Save the transaction reference rather than paying again immediately if confirmation is delayed.",
      "Complete fingerprint capture at a reputable cybercafé/registration point. Have the operator show you the selected subjects, uploaded identity/photo and your examination state/neighbourhood BEFORE final upload; NECO warns that the neighbourhood is not editable afterwards.",
      "Collect the NECO timetable and at least one clearly printed photocard. Obtain the referee's signature and stamp using a permitted referee category in the official guideline (for example a school principal, a qualified clergyman/imam, an eligible public officer or a lawyer of the specified standing). The 2026 guideline does not require extra photocard endorsement at a NECO state office.",
      "Reprint/check the photocard close to the examination to find the final centre assignment. Follow the exact subject-by-subject timetable for 4–21 November and bring the attested photocard; NECO uses biometric verification at the examination venue. Do not assume every one of the 16 subjects is computer-based.",
    ],
    notes: [
      "Further Mathematics, Technical Drawing and Nigerian languages are absent from the 2026 External list in Step 1. Anyone needing a missing credit should check another recognised examination before paying a non-refundable fee.",
      "The examination is dual-mode: hybrid Computer-Based Examination and Pen-and-Paper Examination. Which subject/session uses which mode must be read from the official External timetable, not guessed from a general CBT announcement.",
      "The selected examination neighbourhood is not editable once uploaded. The photocard may need to be reprinted when the exact centre is assigned; do not travel to a generic NECO office assuming it is your final centre.",
      "NECO's photocard must show a clearly identifiable photograph and carry an authorised referee's signature/stamp. A school principal, ordained clergyman/chief imam, commissioned officer of the specified seniority, senior civil servant or experienced lawyer may qualify under the guideline; follow its full referee criteria rather than trusting a paid 'agent'.",
      "Photograph and fingerprints are cross-checked at the examination venue. Candidates must personally attend biometric capture; mismatched identity evidence risks disqualification/impersonation sanctions.",
      "A separate walk-in fee of ₦43,000 is published. It should not be confused with normal late registration, and late/last-minute admission is subject to NECO's current walk-in and reporting instructions; do not assume a walk-in is always available for every paper.",
      "NECO says ordinary registration ends 26 October 2026 at 12 midnight, with a late window until 3 November. Avoid relying on the general historical NECO FAQ's approximate annual months instead of this dated 2026 notice.",
      "NECO External registration/payment support: support@neco.gov.ng. Keep the candidate account, payment reference, NIN and photocard information private; do not submit them to third-party 'instant result' agents.",
    ],
    sources,
    lastVerified: "2026-10-19",
    searchTerms: [
      ...service.searchTerms,
      "NECO GCE 2026 exact registration fee",
      "NECO external 16 available subjects",
      "NECO GCE neighbourhood cannot change",
      "NECO External biometric fingerprint cybercafe",
      "NECO 2026 attestation photocard referee",
      "NECO GCE 2026 walk-in fee",
      "NECO 2026 late registration October 27",
    ],
  };
}

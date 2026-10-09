import type { CareerOpportunity } from "@/lib/jobs";

/**
 * Distinct officer-commissioning intake, not the Nigerian Army's 92RRI
 * regular recruit intake. All recruitment-specific claims below come from
 * the current Military Secretary SSCC 50/2027 notice checked 9 October 2026.
 * No JobPosting schema: this is a recruitment programme, not one vacancy.
 */
export const armySSCC2027: CareerOpportunity[] = [
  {
    slug: "nigerian-army-sscc-50-2027",
    title: "Nigerian Army Short Service Combatant Commission (SSCC) 50/2027",
    organization: "Nigerian Army",
    kind: "recruitment-exercise",
    sector: "Government",
    status: "open",
    statusLabel: "Application open — closes 17 October 2026",
    summary: "The Nigerian Army is accepting free online applications for Short Service Combatant Commission (SSCC) Course 50/2027 until Saturday 17 October 2026. This is an officer commissioning route for eligible civilian graduates and qualified serving Armed Forces personnel, not the 92 Regular Recruits Intake (92RRI) for other applicants.",
    location: "Nigeria — selection and training arrangements follow Army instructions",
    employmentType: "Officer commissioning programme / military service",
    audiences: [
      "Eligible Nigerian civilian graduates aged 23–27",
      "Serving Armed Forces personnel meeting additional service conditions",
      "Candidates interested in combat and combat-support arms",
    ],
    fields: [
      "Infantry and Armour",
      "Artillery",
      "Army Engineers",
      "Signals and Intelligence",
      "Military leadership and combat support",
    ],
    qualifications: [
      "Citizenship and age: candidates must be Nigerian citizens by birth, male or female, aged 23–27 as of 10 January 2027. Do not apply based on age limits for the separate 92RRI recruitment.",
      "Education: the published minimum is a first degree of at least Second Class Lower Division or an accredited HND of at least Lower Credit. The course and institution must have been accredited at the time of study.",
      "Qualification year matters: the Army says only tertiary academic credentials obtained from 2018 onward will be considered. Having a qualifying grade from before that date does not satisfy the stated rule.",
      "NYSC evidence differs by applicant category: a civilian applicant needs an NYSC discharge certificate; the notice specifies NYSC exemption documentation for serving military applicants. Review this before beginning the form.",
      "The published minimum height is 1.68 metres for men and 1.65 metres for women. The Army also requires medical, psychological and physical fitness to its standards.",
      "Service personnel must satisfy additional rules, including at least five years of Armed Forces service, valid military identification, commanding-officer endorsement and official sponsorship letters where required. These requirements should not be applied indiscriminately to civilians.",
    ],
    requirements: [
      "Confirm which SSCC category applies to you before registration. The portal asks whether you currently serve or previously served in the Armed Forces. Give a truthful answer; undisclosed service status can cause disqualification.",
      "Civilian applicants must arrange two reputable referees meeting the Army's specified office/rank and state-of-origin conditions. The notice calls for referees' passport photographs on attestation letters, so obtain these early rather than on submission day.",
      "All applicants need the relevant institutional letter of attestation. Where the notice requires an institutional endorsement, consult the issuing school before attempting the final upload.",
      "You must not have been convicted by a court of law; the Army further disqualifies applicants with prohibited tattoos/body inscriptions, membership of cults or secret societies, or relevant disciplinary dismissal from military or paramilitary training.",
      "Make sure the names, date of birth and education history you enter correspond with your original records. Prepare a reliable email address because account verification is sent by email.",
      "The 17 October date is the application deadline, not a promise of interview or commissioning. The Army will determine subsequent screening, selection and military training steps; use only official updates for those details.",
    ],
    documents: [
      "A recent passport photograph suitable for the portal upload.",
      "Degree/HND and other educational certificates for the qualifications claimed. The Army may require originals from primary through tertiary levels for verification.",
      "A valid certificate of state of origin and a birth certificate issued or endorsed by the appropriate authority, or a valid age declaration.",
      "NIN and BVN slips. Provide identifying numbers only on the actual Army recruitment portal, not to an unofficial WhatsApp agent or a third-party guide.",
      "Civilian NYSC discharge certificate or serving-personnel exemption evidence as specified in the notice, together with institutional letter of attestation.",
      "Where applicable, the civilian referee letters with photographs, or military ID/commanding-officer recommendations and sponsorship records for serving personnel.",
      "The system-generated photo-slip and other submitted forms for printing and authentication after the online application.",
    ],
    applicationSteps: [
      "Open https://nashortservice.army.mil.ng and read the SSCC 50/2027 recruitment notice. Verify the army.mil.ng domain before entering personal information; this commissioning route is separate from the 92RRI recruitment portal.",
      "Choose the SSCC option and select Apply Now. The application notice asks you to declare whether you are serving or have served in the Armed Forces. Select the accurate applicant category.",
      "Enter your own working email address and follow the verification link sent to you. Set your password directly on the recruitment website and return to the same domain to sign in.",
      "Complete the form carefully: qualifications, graduation year, personal information and supporting documentation must match the published eligibility requirements. Upload the requested photograph, certificates, state-of-origin evidence, birth/age record and NIN/BVN slips.",
      "Review the information for errors before final submission. Do not assume that saving a draft means the Army has received a completed application; follow the portal's submission confirmation.",
      "After submitting, print the photo-slip. The Army directs applicants to have the first page signed by a Registrar of a Court of Law and the second by an LGA Chairman/Secretary or qualifying senior military officer from the applicant's state of origin.",
      "Keep the completed signed forms and other required originals safe. The Army says successful applicants must bring the relevant photo-slip, guarantor and attestation documents to its Selection Board; do not pay a person who claims to guarantee a place.",
      "Submit no later than Saturday 17 October 2026, then check the official portal for screening or selection instructions. If a site or social-media message conflicts with the Army notice, verify with the Army's published contact lines.",
    ],
    officialUrl: "https://nashortservice.army.mil.ng/",
    officialUrlLabel: "Read official SSCC 50/2027 notice and apply",
    verifiedAt: "2026-10-09",
    deadline: "2026-10-17",
    nextMilestone: "Applications close 17 October 2026; the notice does not guarantee a shortlist date. Applicants should retain their signed photo-slip and follow the official Army portal for subsequent stages.",
    feeNote: "The Army's notice explicitly says the online SSCC 50/2027 application is free of charge. MyNigeriaGuide does not take payment, secure interview slots, issue admission guarantees or collect recruitment forms. Do not pay someone offering expedited enlistment or accept an unverified Army-branded website.",
    sourceNotes: [
      "This is Short Service Combatant Commission Course 50/2027, an officer route with a published age range of 23–27 and minimum degree/HND standards. It is different from Regular Recruits Intake (RRI); the Army runs separate official recruitment notices with different eligibility rules.",
      "The Army's current Military Secretary announcement gives the free application window as 14 August–17 October 2026 and the age-reference date as 10 January 2027. The closing date was checked against the official page on 9 October.",
      "The published commissioning terms describe a 15-year short-service commission: ten years on the active list initially, potentially renewable for up to five more years. Conversion to a Regular Combatant Commission is conditional and not automatic.",
      "Successful candidates who complete the training would be commissioned at the rank of Second Lieutenant, subject to the Army's published terms. Course completion is not guaranteed by applying.",
      "For clarification, the official notice lists 07016874003 and 07047340295, available between 8:00 a.m. and 6:00 p.m. daily. Applicants should confirm they are still current on the Army portal before calling.",
      "The Army requires the printed photo-slip to be signed by specified public officials. Missing or incorrectly attested forms can create avoidable problems at the next stage; prepare them according to the official instructions rather than accepting a generic checklist.",
      "The Army's website is the controlling source. This MyNigeriaGuide explainer does not replace medical evaluation, eligibility decisions, selection-board instructions or amendments announced by the Nigerian Army.",
    ],
    sources: [
      {
        label: "Nigerian Army Military Secretary — SSCC 50/2027 advertisement and application",
        url: "https://nashortservice.army.mil.ng/",
        lastChecked: "2026-10-09",
      },
      {
        label: "Nigerian Army official careers — military commissioning routes",
        url: "https://army.mil.ng/careers/",
        lastChecked: "2026-10-09",
      },
    ],
  },
];

import type { Service } from "@/lib/types";
import { searchQueryOverrides } from "@/data/search-query-overrides";
import { getServiceJourney } from "@/lib/journey";
import { getDetailedServiceGuidance } from "@/lib/service-guidance";

export type SearchAnswer = {
  question: string;
  answer: string;
};

function listPreview(items: string[], limit = 3) {
  const selected = items.slice(0, limit);
  if (!selected.length) return "";
  if (selected.length === 1) return selected[0];
  if (selected.length === 2) return selected.join(" and ");
  return selected.slice(0, -1).join(", ") + ", and " + selected[selected.length - 1];
}

// Follow-ups match evidenced Search Console intents and official source details.
// They complement, rather than duplicate, the five standard service questions.
const specificFollowUps: Record<string, SearchAnswer[]> = {
  "cac-business-name-registration": [
    { question: "Can I register a business name with CAC online myself?", answer: "Yes. CAC's business-name registration route supports proprietor applications through its Company Registration Portal. CAC says a lawyer, chartered accountant or chartered secretary is not mandatory for this category. Check name availability, enter proprietor details, upload the documents shown and pay the official filing charge through the portal." },
    { question: "Is CAC business-name registration free in Nigeria?", answer: "Do not assume so. CAC registration and name-reservation services have official charges, which can change. Use the current iCRP fee displayed for your exact service rather than an old article, unofficial free-registration offer or agent's personal payment link." },
    { question: "Can I search whether a business name is taken before paying CAC?", answer: "Yes. Use CAC's official public search or availability check before investing in documents. A successful preliminary search is not the same as reserving or registering the name; continue the official name reservation and full business-name application." },
  ],
  "cac-company-registration": [
    { question: "Is CAC company registration the same as business-name registration?", answer: "No. A company and a business name are different registration categories. Select the entity type that fits what you are forming, then follow the company/officer and incorporation requirements for that exact structure. Company filing charges can vary with the company type and share structure." },
    { question: "What documents do I need to register a company with CAC?", answer: "Start with proposed names, officer and company particulars, identity details and the company type. The iCRP supplies the attachments required for the selected incorporation category; do not rely on one generic document list for every company. Read and resolve any CAC query before downloading approval documents." },
  ],
  "passport-renewal": [
    { question: "Can I renew my Nigerian passport completely online?", answer: "An NIS renewal begins on the official online portal, which handles NIN checks, supporting documents, payment and appointment selection. A physical appointment or biometric enrolment may still be required, so online submission alone should not be described as a completed passport issuance." },
    { question: "Can I renew a Nigerian passport without my NIN?", answer: "The official NIS process uses NIN-linked identity verification. Do not invent a NIN or submit conflicting birth details to force a renewal. Correct the underlying identity record or consult NIS's passport data-correction process before choosing the wrong transaction." },
    { question: "What if my Nigerian passport is lost rather than expired?", answer: "A lost passport is a replacement case, not an ordinary expiry renewal. NIS also treats damage and change of data differently. Choose the specific official reason for reissue and use that process's supporting-document checklist before making payment." },
  ],
  "passport-application-abroad": [
    { question: "How do I renew a Nigerian passport in the UK, USA or Canada?", answer: "Begin with NIS's passport application process and the Nigerian embassy, high commission or consulate responsible for your location. Follow that mission's own identity, document submission, appointment, biometric and payment requirements. Do not use Nigerian domestic pricing as a guarantee for overseas applications." },
    { question: "Is the Nigerian passport renewal fee the same abroad as in Nigeria?", answer: "Not necessarily. NIS sends applicants abroad to the relevant overseas mission and application route; local fees, currency and appointment arrangements can differ. Verify the live mission-specific instructions before paying." },
  ],
  "check-nin-number": [
    { question: "How do I check my NIN number on my phone?", answer: "NIMC states that its *346# phone service can help retrieve a forgotten NIN. Dial *346# and follow the options shown for your identity record. Read any network or USSD charge before accepting; do not enter your number on a look-alike site." },
    { question: "Can I check my NIN on MTN or Airtel?", answer: "The NIN recovery procedure is provided by NIMC, not by a separate operator-specific identification database. Use NIMC's *346# service on an eligible active line. If the record is not found, use NIMC's official office or help route instead of paying an agent." },
    { question: "Is the Mobile ID *346*2* NIN shortcut how I retrieve a forgotten number?", answer: "No. NIMC describes the Mobile ID shortcut as a process that begins when you already know your NIN. For a number you cannot remember, follow the *346# recovery instructions rather than trying to request a Mobile ID OTP using an unknown NIN." },
  ],
  "jamb-caps": [
    { question: "Where do I check my JAMB CAPS admission status?", answer: "Use JAMB's official candidate e-Facility and CAPS service with the account for the correct admission year. Review the institution and course information displayed for that candidate. A third-party site cannot reliably display or change your official CAPS admission decision." },
    { question: "How do I accept or reject admission on JAMB CAPS?", answer: "Log in to the candidate's official profile, inspect any actual offer and use the accept or reject option that JAMB presents. If no offer or button is available for that profile, do not pay someone who claims they can unlock one." },
    { question: "Why is an admission offer not showing on CAPS yet?", answer: "Admission stages vary by institution, year and candidate. Not seeing an offer or acceptance button does not prove a particular final outcome. Check the correct profile and cycle and use JAMB and the institution's official notices for updates." },
  ],
  "waec-check-result": [
    { question: "Can I check WAEC result using my phone?", answer: "Yes, you can open the official WAEC Direct site from a phone, but you still need the examination number, year and type and the valid result-checker PIN/e-PIN and serial number where requested. Your phone does not replace those credentials." },
    { question: "Can I check my WAEC result without a scratch card or PIN?", answer: "WAEC Direct currently requires its official result-checker details. Claims that a NIN or phone number will bypass a required PIN are not supported by the official result-checking instructions. Obtain valid credentials from a WAEC-authorised route." },
    { question: "What do I do if my WAEC e-PIN has reached its use limit?", answer: "WAEC Direct states that result-checker credentials have a limited number of permitted checks. If the card has been exhausted, obtain a valid replacement through an authorised source and retry with the correct candidate information." },
  ],
  "nysc-registration-local": [
    { question: "Can I complete NYSC registration before my name is on the Senate List?", answer: "No. NYSC says locally trained prospective corps members need their institution's approved Senate or Academic Board result-list record for mobilisation. Resolve missing or incorrect information with your institution's student-affairs or NYSC office." },
    { question: "What do I need before NYSC online registration?", answer: "Check your approved institution listing, matriculation number, functional personal email, Nigerian mobile line and identity details. You must be present for the biometric part of registration; NYSC does not allow somebody else to capture fingerprints on your behalf." },
    { question: "Does NYSC online registration stay open all year?", answer: "No. Registration is opened for specific batches and eligible categories. Confirm the active window on the official NYSC portal instead of applying dates from a previous batch to your own mobilisation cycle." },
  ],
  "police-character-certificate": [
    { question: "Can I apply for Nigerian police clearance from abroad?", answer: "POSSAP offers a diaspora Police Character Certificate route. Follow the actual account and identity-verification requirements shown for your application, use the official invoice and check the overseas recipient's separate acceptance rules." },
    { question: "Is a Nigerian Police Character Certificate valid for every country for the same period?", answer: "No single overseas validity period is established by POSSAP for all visa offices and employers. The receiving authority may require a recent certificate or additional authentication. Confirm that requirement before ordering a certificate." },
  ],
  "bvn-data-update": [
    { question: "Can I change my BVN name or date of birth online myself?", answer: "CBN's rules require amendments through the bank's verification and correction process. Ask the bank for its current BVN data-amendment form and supporting-document requirements rather than using an unofficial instant-BVN website." },
    { question: "Will my BVN number change after correcting its details?", answer: "No. The supported name or date-of-birth amendment updates the record tied to your existing BVN. Under the CBN framework, a date-of-birth correction is permitted only once with supporting evidence." },
  ],
  "ecowas-travel-certificate": [
    { question: "How long does it take to get an ECOWAS Travel Certificate?", answer: "NIS's published 2026 service-level schedule lists a 24-hour processing target for a complete certificate application. This is not a promise of instant issuance: the required documents, payment and office submission still determine when the application becomes complete." },
    { question: "Can an ECOWAS Travel Certificate replace my international passport everywhere?", answer: "No. NIS describes it as a travel document for the ECOWAS sub-region. Confirm your destination and carrier's current documentary requirements; the certificate should not be represented as a worldwide alternative to a Nigerian passport." },
  ],
  "nigeria-landing-exit-card": [
    { question: "Do Nigerian passport holders need a Landing or Exit Card?", answer: "No. The NIS LECARD FAQ says travellers using Nigerian passports do not need these cards. It directs foreign travellers entering or leaving Nigeria to the official portal, while transit passengers are excluded." },
    { question: "When should I fill Nigeria's arrival card, and can I reprint it?", answer: "The official NIS FAQ says Landing Cards can be created 24–48 hours before arrival. If your confirmation is lost, look for the emailed copy or use NIS's Get Your Last Card facility." },
  ],
  "pencom-open-rsa": [
    { question: "Do I need another pension RSA if I change employers?", answer: "No. PenCom says your RSA stays with you. Supply your existing RSA details to the new employer instead of opening a duplicate pension account." },
  ],
  "ecowas-travel-certificate": [
    { question: "Should I renew or re-issue an ECOWAS Travel Certificate?", answer: "NIS offers distinct Fresh, Renew and Re-issue application paths. For an expiring certificate choose renewal; if the document is lost or damaged, check the official replacement conditions before paying." },
  ],
  "bvn-data-update": [
    { question: "Can I change my BVN date of birth twice?", answer: "CBN's BVN framework permits a supported date-of-birth correction only once, with evidence. Ask the bank handling your BVN to review the records before submitting the amendment." },
  ],
  "inec-replace-lost-damaged-pvc": [
    { question: "Is a PVC replacement the same as changing my polling unit?", answer: "No. Replacement addresses a missing or damaged physical voter card; a change of voting location uses INEC's separate voter-transfer service." },
  ],
  "police-character-certificate": [
    { question: "How can someone validate my Nigerian Police Character Certificate?", answer: "Use POSSAP's official Validate Document service with the issued certificate's document number. For use abroad, separately confirm the receiving organisation's document-age and authentication requirements." },
  ],
  "anambra-asin-registration": [
    {
      question: "Which ASIN registration option should I choose in Anambra State?",
      answer: "AIRS provides Individual, Informal/Enterprise and Corporate enumeration options. Select the one matching the person or organisation registering, follow the online form and save the ASIN generated after successful submission.",
    },
  ],
  "passport-application-tracking": [
    {
      question: "Can I track my Nigerian passport application with only my NIN?",
      answer: "The official NIS tracking form requires both an Application Number and a Reference Number. Find these on your NIS application confirmation or payment record, then use the official tracker.",
    },
  ],
  "ninauth-nin-verification": [
    {
      question: "What is a NIN Sharecode and how is it different from scanning a QR code?",
      answer: "NIMC describes a Sharecode as a time-limited identity-verification code generated inside NINAuth. Alternatively, an organisation can display a QR code for you to scan with the same app. Review the requested information before approving either method.",
    },
  ],
};

export function getServiceSearchAnswers(service: Service): SearchAnswer[] {
  const year = service.lastVerified.slice(0, 4);
  const journey = getServiceJourney(service);
  const guidance = getDetailedServiceGuidance(service);
  const requirements = listPreview(service.requirements);
  const query = searchQueryOverrides[service.slug] ?? {};

  return [
    {
      question: query.fee ?? `How much does ${service.shortTitle} cost in ${year}?`,
      answer: `${service.feeLabel}${service.feeNote ? " — " + service.feeNote : "."}`,
    },
    {
      question: query.requirements ?? `What do I need for ${service.shortTitle}?`,
      answer: requirements
        ? `The current verified checklist includes ${requirements}. Open the requirements section below for the complete list and any service-specific evidence.`
        : "The official sources used for this guide do not publish one universal checklist. Follow the exact route and source notes below.",
    },
    {
      question: query.online ?? `Can I do ${service.shortTitle} online?`,
      answer: `${journey.modeLabel}. ${guidance.route.startDetail} ${guidance.route.physicalDetail}`,
    },
    {
      question: query.timeline ?? `How long does ${service.shortTitle} take?`,
      answer: service.timeline ?? "The responsible agency does not currently publish a reliable fixed completion timeline in the official sources used for this guide.",
    },
    {
      question: query.start ?? `Where do I start ${service.shortTitle}?`,
      answer: guidance.route.startDetail,
    },
    ...(specificFollowUps[service.slug] ?? []),
  ];
}

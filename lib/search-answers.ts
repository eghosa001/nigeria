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

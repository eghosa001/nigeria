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

export function getServiceSearchAnswers(service: Service): SearchAnswer[] {
  const year = service.lastVerified.slice(0, 4);
  const journey = getServiceJourney(service);
  const guidance = getDetailedServiceGuidance(service);
  const requirements = listPreview(service.requirements);
  const query = searchQueryOverrides[service.slug] ?? {};

  // Follow-ups match evidenced Search Console intents and official source details.
  // They complement, rather than duplicate, the five standard service questions.
  const specificFollowUps: Record<string, SearchAnswer[]> = {
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

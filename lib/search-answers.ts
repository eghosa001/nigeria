import type { Service } from "@/lib/types";
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

  return [
    {
      question: `How much does ${service.shortTitle} cost in ${year}?`,
      answer: `${service.feeLabel}${service.feeNote ? " — " + service.feeNote : "."}`,
    },
    {
      question: `What do I need for ${service.shortTitle}?`,
      answer: requirements
        ? `The current verified checklist includes ${requirements}. Open the requirements section below for the complete list and any service-specific evidence.`
        : "The official sources used for this guide do not publish one universal checklist. Follow the exact route and source notes below.",
    },
    {
      question: `Can I do ${service.shortTitle} online?`,
      answer: `${journey.modeLabel}. ${guidance.route.startDetail} ${guidance.route.physicalDetail}`,
    },
    {
      question: `How long does ${service.shortTitle} take?`,
      answer: service.timeline ?? "The responsible agency does not currently publish a reliable fixed completion timeline in the official sources used for this guide.",
    },
    {
      question: `Where do I start ${service.shortTitle}?`,
      answer: guidance.route.startDetail,
    },
  ];
}

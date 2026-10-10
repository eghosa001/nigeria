import type { ExploreGuide } from "@/lib/explore";

/**
 * A dam/infrastructure search intent, separate from wildlife access at
 * Kainji Lake National Park. Capacity refers to nameplate installation,
 * never daily electricity output or verified visitor availability.
 */
export const kainjiDamGuide: ExploreGuide = {
  slug: "kainji-dam",
  title: "Kainji Dam, Niger State: Location, History and Visiting Guide",
  shortTitle: "Kainji Dam",
  kind: "destination",
  region: "Niger State",
  summary: "Find Kainji Dam in Borgu LGA, Niger State, learn how Nigeria's 1968 hydroelectric project works, and check visitor access before planning a trip near New Bussa.",
  intro: [
    "Kainji Dam is on the River Niger near New Bussa, in Borgu Local Government Area of Niger State. Its hydroelectric plant was commissioned in 1968 and remains part of Nigeria's major electricity infrastructure. This is not the same attraction as Kainji Lake National Park, which has its own protected-area access arrangements.",
    "The Bureau of Public Enterprises records 760 megawatts of installed Kainji plant capacity. Installed capacity is a design figure, not a promise of how much power is being generated at any given hour. The plant is operated by Mainstream Energy Solutions Limited under a concession.",
    "This guide explains the landmark and what to verify before travelling; it does not claim the operational dam, spillway or powerhouse is publicly open to walk-in visitors."
  ],
  bestFor: ["Landmarks", "Road trips", "Nature", "Engineering"],
  highlights: [
    { name: "Where is Kainji Dam?", detail: "Kainji, Borgu Local Government Area of Niger State, near New Bussa, on the River Niger." },
    { name: "When was it built?", detail: "The Kainji hydropower plant was commissioned in 1968; it is an important early milestone in the country's grid-connected hydropower history." },
    { name: "How much electricity can it generate?", detail: "The Bureau of Public Enterprises lists 760 MW of installed generating capacity. This must not be confused with available or actual generation." },
    { name: "Dam versus national park", detail: "The hydropower complex is operated infrastructure; Kainji Lake National Park is a separate conservation area extending into Niger and Kwara states." },
    { name: "Why it matters", detail: "Hydropower uses the river's water flow and head to turn turbines and generate electricity; reservoir management is also relevant to flood control." },
  ],
  planning: [
    { label: "Confirm access before travel", detail: "The dam is a functioning power facility, not a confirmed public walk-in museum. Ask the operator or responsible authority whether organised educational visits are possible, and never enter controlled areas without permission." },
    { label: "Do not assume a gate fee or tour time", detail: "No verified public admission price, guided-tour schedule or opening hours are published in the reviewed official sources. Avoid online claims of guaranteed free tours." },
    { label: "Use the correct destination", detail: "Navigate to Kainji Dam near New Bussa in Niger State; do not confuse it with Jebba Dam downstream or the national-park visitor sectors." },
    { label: "Plan travel safely", detail: "Check route conditions and current local security guidance before long-distance travel. Use daylight, reliable transport and an agreed return plan, especially for remote destinations." },
    { label: "Pair nature trips only with permission", detail: "Kainji Lake National Park has separate park rules and ranger access. Arrange park visits directly with its authority rather than treating dam access as permission to enter the park." },
  ],
  source: { label: "Bureau of Public Enterprises — Kainji-Jebba Hydropower Plant", href: "https://bpe.gov.ng/staging/transaction/kainji-jebba-hydropower-plant/" },
  lastReviewed: "2026-10-10",
};

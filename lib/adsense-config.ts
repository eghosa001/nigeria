// AdSense client and ad-slot IDs are public identifiers, not secrets.
// Slots are named per placement so templates never reference raw env vars.
const slot = (value: string | undefined) => value?.trim() || undefined;

// AdSense IDs are public (unlike auth tokens). Cloudflare Workers Builds and
// GitHub Actions must not disagree about whether the core units exist.
// Keep optional placements configurable; core verified service slots survive
// builds that do not forward NEXT_PUBLIC_* variables.
export const ADSENSE_CLIENT = slot(process.env.NEXT_PUBLIC_ADSENSE_CLIENT) ?? "ca-pub-7517898921176341";

export const AD_SLOTS = {
  serviceAfterAnswer: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_AFTER_ANSWER) ?? "7134087198",
  serviceMid: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_MID) ?? "8499139757",
  movieAfterCast: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_MOVIE_AFTER_CAST),
  movieAfterWatch: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_MOVIE_AFTER_WATCH),
  jobAfterFacts: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_JOB_AFTER_FACTS),
  tourAfterIntro: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOUR_AFTER_INTRO),
  endMultiplex: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_END_MULTIPLEX),
} as const;

export type AdSlotName = keyof typeof AD_SLOTS;
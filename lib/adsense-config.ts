// AdSense client and ad-slot IDs are public identifiers, not secrets.
// Slots are named per placement so templates never reference raw env vars.
const slot = (value: string | undefined) => value?.trim() || undefined;

export const ADSENSE_CLIENT = slot(process.env.NEXT_PUBLIC_ADSENSE_CLIENT);

export const AD_SLOTS = {
  serviceAfterAnswer: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_AFTER_ANSWER),
  serviceMid: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_MID),
  movieAfterCast: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_MOVIE_AFTER_CAST),
  movieAfterWatch: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_MOVIE_AFTER_WATCH),
  jobAfterFacts: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_JOB_AFTER_FACTS),
  tourAfterIntro: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOUR_AFTER_INTRO),
  endMultiplex: slot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_END_MULTIPLEX),
} as const;

export type AdSlotName = keyof typeof AD_SLOTS;
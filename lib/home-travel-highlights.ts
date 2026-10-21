// Only the fields rendered by the homepage travel cards belong in this
// lightweight module. Importing the full Tour guide catalogue into the
// cross-pillar homepage slows cold-start rendering on Cloudflare Workers.
// These canonical routes are reviewed when the six-card homepage shelf changes.
export const homeTravelHighlights = [
  { slug: "lagos", region: "Lagos State", shortTitle: "Lagos", kind: "city" },
  { slug: "abuja", region: "Federal Capital Territory", shortTitle: "Abuja", kind: "city" },
  { slug: "kano", region: "Kano State", shortTitle: "Kano", kind: "city" },
  { slug: "obudu-mountain-resort", region: "Cross River State", shortTitle: "Obudu Mountain Resort", kind: "destination" },
  { slug: "yankari-game-reserve", region: "Bauchi State", shortTitle: "Yankari Game Reserve", kind: "destination" },
  { slug: "anambra-heritage-circuit", region: "Anambra State", shortTitle: "Anambra heritage circuit", kind: "destination" },
] as const;

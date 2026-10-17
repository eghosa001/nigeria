import type { EntertainmentPerson, PersonEditorialProfile } from "@/lib/entertainment-extras";

// Three previously authored, individually attributed actor/filmmaker biographies.
// Desk-checked original references again on 17 Oct 2026. This does NOT verify
// every historical credit, portrait licence, life event or external media right.
// Preserve their original 15 Oct check dates: do not bump them merely to clear
// an automatic flag. Human approval stays a separate mandatory finding.
type BiographyEvidence = {
  name: string;
  sourceUrls: readonly string[];
  keyClaims: readonly string[];
};

export const reviewedBiographyEvidence20261017: Record<string, BiographyEvidence> = {
  "femi-adebayo": {
    name: "Femi Adebayo",
    sourceUrls: [
      "https://www.netflix.com/title/81681240",
      "https://businessday.ng/bd-weekender/article/jagun-jagun-is-only-a-fiction-it-is-not-tied-to-any-activity-producer/",
      "https://independent.ng/my-team-initially-rejected-seven-doors-femi-adebayo/",
      "https://punchng.com/my-father-helped-me-beat-his-records-femi-adebayo/",
    ],
    keyClaims: ["Jagun Jagun", "Netflix", "BusinessDay", "Seven Doors"],
  },
  "kunle-afolayan": {
    name: "Kunle Afolayan",
    sourceUrls: [
      "https://copyright.gov.ng/kunle-afolayan-2/",
      "https://africanfilmny.org/directors/kunle-afolayan/",
      "https://about.netflix.com/en/news/more-naija-stories-from-kunle-afolayan-coming-to-netflix",
      "https://www.netflix.com/ng/title/81392197",
    ],
    keyClaims: ["Nigerian Copyright Commission", "African Film Festival", "Golden Effects Pictures", "Aníkúlápó"],
  },
  "timini-egbuson": {
    name: "Timini Egbuson",
    sourceUrls: [
      "https://www.premiumtimesng.com/entertainment/nollywood/773648-ebuka-funke-akindele-veekee-james-grace-timinis-reel-love-premiere.html",
      "https://www.blackfilmwire.com/post/from-lover-boy-to-game-changer-timini-egbuson-on-reel-love-and-redefining-nollywood",
      "https://www.imdb.com/name/nm6170424/",
    ],
    keyClaims: ["Reel Love", "Premium Times", "Black Film Wire", "executive"],
  },
};

function recentRealDate(iso: string, today: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso) || !/^\d{4}-\d{2}-\d{2}$/.test(today)) return false;
  const checked = Date.parse(iso + "T00:00:00Z");
  const current = Date.parse(today + "T00:00:00Z");
  if (!Number.isFinite(checked) || !Number.isFinite(current) ||
      new Date(checked).toISOString().slice(0, 10) !== iso) return false;
  const age = (current - checked) / 86_400_000;
  return age >= 0 && age <= 30;
}

export function hasCompletedAttributableBiographyReview(
  person: EntertainmentPerson, dossier: PersonEditorialProfile | undefined, today: string,
): boolean {
  const exact = reviewedBiographyEvidence20261017[person.slug];
  if (!exact || person.name !== exact.name || !dossier || !recentRealDate(dossier.lastReviewed, today) ||
      dossier.intro.length < 2 || dossier.sections.length < 4 ||
      dossier.sources.length < exact.sourceUrls.length) return false;
  if (!exact.sourceUrls.every(url => dossier.sources.some(source =>
    source.href === url && recentRealDate(source.lastChecked, today)))) return false;
  const hosts = new Set<string>();
  for (const source of dossier.sources) {
    if (!source.href.startsWith("https://") || !recentRealDate(source.lastChecked, today)) return false;
    try { hosts.add(new URL(source.href).hostname.replace(/^www\./, "")); }
    catch { return false; }
  }
  if (hosts.size < 3 ||
      dossier.sections.some(section => !section.heading || section.paragraphs.length < 2 ||
        !section.sources.length || section.sources.some(idx => idx < 0 || idx >= dossier.sources.length)))
    return false;
  const cited = new Set(dossier.sections.flatMap(section => section.sources));
  if (cited.size < 3) return false;
  const article = [...dossier.intro, ...dossier.sections.flatMap(section => section.paragraphs)].join(" ");
  if (article.split(/\s+/).length < 450 || exact.keyClaims.some(claim => !article.includes(claim))) return false;
  // A credited actor, a film director and a producer are different claims.
  // Do not generalise an article's claims into a fabricated filmography.
  return true;
}

import type { EntertainmentTitle } from "@/lib/entertainment";

export type DocumentedMovieAvailability = {
  state: "restricted-on-checked-platforms" | "scheduled-local-cinema-premiere";
  checkedAt: string;
  notBefore?: string;
  description: string;
  evidence: Array<{ href: string; label: string }>;
};

/**
 * Explicit *negative* provider or *future* premiere evidence is not an
 * unverified availability claim. Never fabricate a watch link. Source checks
 * expire and a future premiere automatically returns to review on that day.
 * A verdict does NOT claim exhaustive legal streaming research.
 */
export const documentedMovieAvailability20261017: Record<string, DocumentedMovieAvailability> = {
  "colours-of-fire": {
    "state": "restricted-on-checked-platforms",
    "checkedAt": "2026-10-17",
    "description": "Kava TV's official film page explicitly excludes Africa and Netflix Nigeria's exact title page reports this film as unavailable. No direct Nigerian playback link is therefore represented as verified. This is a finding about these checked distributors, not a claim that every cinema or future service is blocked.",
    "evidence": [
      {
        "href": "https://watch.kava.tv/colours-of-fire",
        "label": "Kava official Colours of Fire listing — region restriction"
      },
      {
        "href": "https://www.netflix.com/ng/title/82752912",
        "label": "Netflix Nigeria — title-specific unavailable notice"
      }
    ]
  },
  "no-fury-2024": {
    "state": "scheduled-local-cinema-premiere",
    "checkedAt": "2026-10-17",
    "notBefore": "2026-10-23",
    "description": "FilmOne-distributed Nigerian cinema premiere is advertised for 23 October 2026. The film does not have a verified current local ticket showtime or streaming link in this guide before that date. This only resolves the pre-release availability question; check exhibitors again once release day arrives.",
    "evidence": [
      {
        "href": "https://whatkeptmeup.com/preview/new-in-nigeria-movies-and-tv-shows-to-watch-this-october-2026/",
        "label": "What Kept Me Up — exact Nigeria 23 October premiere"
      },
      {
        "href": "https://www.nollywood.com/movies/no-fury",
        "label": "Nollywood.com — exact No Fury theatrical release entry"
      }
    ]
  }
};

export function documentedMovieAvailabilityVerdict(
  item: EntertainmentTitle,
  today: string
): DocumentedMovieAvailability | undefined {
  const proof = documentedMovieAvailability20261017[item.slug];
  if (!proof || item.watchLinks.length || !/^\d{4}-\d{2}-\d{2}$/.test(today) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(proof.checkedAt) ||
      proof.checkedAt > today) return undefined;
  const age = (Date.parse(today + "T00:00:00Z") - Date.parse(proof.checkedAt + "T00:00:00Z")) / 86400000;
  if (!Number.isFinite(age) || age > 14 || age < 0) return undefined;
  if (proof.state === "scheduled-local-cinema-premiere" && (!proof.notBefore || today >= proof.notBefore))
    return undefined;
  // An editor must attach every named, exactly matching source to the real
  // movie data. Otherwise an assertion in this helper cannot close a finding.
  if (!proof.evidence.every(link => item.references?.some(s => s.href === link.href &&
      s.lastChecked === proof.checkedAt))) return undefined;
  return proof;
}

export function attachDocumentedMovieEvidence(item: EntertainmentTitle): EntertainmentTitle {
  const proof = documentedMovieAvailability20261017[item.slug];
  if (!proof) return item;
  const references = [...(item.references ?? [])];
  for (const link of proof.evidence) {
    if (!references.some(s => s.href === link.href)) {
      references.push({
        label: link.label,
        href: link.href,
        lastChecked: proof.checkedAt,
        note: "Exact distributor/title evidence used only to establish access restrictions or a scheduled premiere, not a playable full film."
      });
    } else {
      const idx=references.findIndex(s=>s.href===link.href);
      references[idx] = { ...references[idx], lastChecked: proof.checkedAt };
    }
  }
  return { ...item, references };
}

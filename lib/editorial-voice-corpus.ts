/**
 * Full public-catalogue prose inventory for the Humanizer editorial review.
 * Only visitor-readable natural-language fields are included. No URLs, fees,
 * source metadata, job status, official forms, numeric fields or identifiers
 * are candidates for automatic replacement.
 *
 * This is a review *inventory*, not a promise that every source has been
 * independently fact-checked or that every page needs rewriting.
 */
import { publicServices } from "./data";
import { entertainmentTitles } from "./entertainment";
import { seriesTitles } from "./series";
import { entertainmentPeople } from "./entertainment-extras";
import { allMovieEditorialProfiles } from "./movie-editorial-profile-registry";
import { exploreGuides } from "./explore";
import { explorePlaces } from "./explore-places";
import { jobOpportunities } from "./jobs";
import { careerGuides } from "./career-guides";
import { youtubeMovieLibrary } from "./youtube-library";

export type VoicePillar = "Movies & Entertainment" | "Services" | "Tour Nigeria" | "Jobs & Careers";
export type VoiceRecord = {
  pillar: VoicePillar;
  kind: string;
  url: string;
  title: string;
  prose: string;
  fields: number;
};

function record(pillar: VoicePillar, kind: string, url: string, title: string, ...fields: Array<string | string[] | null | undefined>): VoiceRecord {
  const parts = fields.flatMap(field => typeof field === "string" ? [field] : field ?? [])
    .filter((value): value is string => typeof value === "string" && !!value.trim());
  return { pillar, kind, url, title, prose: parts.join("\n\n"), fields: parts.length };
}

export function collectVoiceCorpus(): VoiceRecord[] {
  const rows: VoiceRecord[] = [
    ...entertainmentTitles.map(item =>
      record("Movies & Entertainment", "movie", "/entertainment/movies/" + item.slug,
        item.title, item.synopsis,
        item.watchLinks.map(link => link.note),
        item.references?.map(link => link.note ?? ""))),
    ...seriesTitles.map(item =>
      record("Movies & Entertainment", "series", "/entertainment/series/" + item.slug,
        item.title, item.synopsis, item.episodeInfo, item.premiereLabel,
        item.watchLinks.map(link => link.note))),
    ...entertainmentPeople.map(item =>
      record("Movies & Entertainment", "person", "/entertainment/people/" + item.slug,
        item.name, item.summary)),
    ...Object.entries(allMovieEditorialProfiles).map(([slug, item]) =>
      record("Movies & Entertainment", "film-editorial", "/entertainment/movies/" + slug,
        slug, item.sections.flatMap(section => section.paragraphs),
        item.questions.map(question => question.answer))),
    ...youtubeMovieLibrary.filter(item => item.source !== "curated").map(item =>
      record("Movies & Entertainment", "youtube", "/entertainment/youtube/" + item.videoId,
        item.title, item.synopsis)),
    ...publicServices.map(item =>
      record("Services", "service", "/services/" + item.slug,
        item.title, item.summary, item.requirements, item.steps, item.notes,
        item.feeNote, item.timeline)),
    ...exploreGuides.map(item =>
      record("Tour Nigeria", "guide", "/explore/" + item.slug,
        item.title, item.summary, item.intro,
        item.highlights.map(section => section.detail),
        item.planning.map(section => section.detail))),
    ...explorePlaces.map(item =>
      record("Tour Nigeria", "place", "/explore/" + item.guideSlug + "#places",
        item.name + " (" + item.slug + ")", item.summary, item.costNote, item.hours)),
    ...jobOpportunities.map(item =>
      record("Jobs & Careers", "opportunity", "/jobs/" + item.slug,
        item.title, item.summary, item.qualifications,
        item.requirements, item.documents, item.applicationSteps,
        item.sourceNotes, item.feeNote, item.nextMilestone)),
    ...careerGuides.map(item =>
      record("Jobs & Careers", "career-guide", "/jobs/guides/" + item.slug,
        item.title, item.description, item.summary, item.answer,
        item.sections.flatMap(section => [...section.paragraphs, ...(section.bullets ?? [])]))),
  ];
  // Intentional distinction: a film's movie page and authored dossier are
  // separate editorial text records sharing one canonical URL. A tourist
  // guide's places may share an anchored URL but have distinct record titles.
  return rows;
}

import { publicServices } from "../lib/data";
import { entertainmentTitles } from "../lib/entertainment";
import { exploreGuides } from "../lib/explore";
import { explorePlaces } from "../lib/explore-places";
import { jobOpportunities } from "../lib/jobs";
import { getEffectiveJobStatus } from "../lib/job-runtime";
import { indexableYouTubeMovies, youtubeMovieLibrary } from "../lib/youtube-library";

const today = new Date().toISOString().slice(0, 10);

function ageDays(date: string) {
  const value = Date.parse(date + "T00:00:00Z");
  const now = Date.parse(today + "T00:00:00Z");
  return Number.isFinite(value) ? Math.max(0, Math.floor((now - value) / 86_400_000)) : Number.POSITIVE_INFINITY;
}

function count<T>(items: T[], predicate: (item: T) => boolean) {
  return items.filter(predicate).length;
}

const serviceSourceOnly = count(publicServices, (service) => service.sources.length === 1);
const serviceNoExplicitRelated = count(publicServices, (service) => service.related.length === 0);
const serviceNoTimeline = count(publicServices, (service) => !service.timeline);
const serviceStale30 = count(publicServices, (service) => ageDays(service.lastVerified) > 30);

const openJobs = jobOpportunities.filter((job) => getEffectiveJobStatus(job) === "open");
const jobSourceOnly = count(jobOpportunities, (job) => job.sources.length === 1);
const jobOpenStale14 = count(openJobs, (job) => ageDays(job.verifiedAt) > 14);
const careerPages = count(jobOpportunities, (job) => job.status === "career-page");

const tourMissingSource = count(explorePlaces, (place) => !place.source?.href);
const tourStale30 = count(explorePlaces, (place) => ageDays(place.checkedAt) > 30);
const guideStale30 = count(exploreGuides, (guide) => ageDays(guide.lastReviewed) > 30);

const movieNoWatch = count(entertainmentTitles, (title) => title.watchLinks.length === 0);
const movieSourceOnly = count(
  entertainmentTitles,
  (title) => title.watchLinks.length === 0 && (title.references?.length ?? 0) > 0,
);
const movieMissingRuntime = count(entertainmentTitles, (title) => !title.runtimeMinutes);
const movieMissingTrailer = count(entertainmentTitles, (title) => !title.trailer);

const youtubeDetailRecords = youtubeMovieLibrary.filter((movie) => movie.source !== "curated");
const indexableYouTubeDetailRecords = indexableYouTubeMovies.filter((movie) => movie.source !== "curated");
const youtubePending = youtubeDetailRecords.length - indexableYouTubeDetailRecords.length;
const youtubePendingPercent = youtubeDetailRecords.length
  ? ((youtubePending / youtubeDetailRecords.length) * 100).toFixed(1)
  : "0.0";

console.log("MyNigeriaGuide published-content quality status — " + today);
console.log("");
console.log("Services");
console.log("  Published:", publicServices.length);
console.log("  Single-source:", serviceSourceOnly);
console.log("  No explicit related slugs:", serviceNoExplicitRelated, "(runtime linking still supplies contextual neighbours)");
console.log("  No fixed official timeline:", serviceNoTimeline);
console.log("  Stale >30 days:", serviceStale30);
console.log("");
console.log("Jobs & Careers");
console.log("  Published pathways:", jobOpportunities.length);
console.log("  Currently open:", openJobs.length);
console.log("  Employer career portals:", careerPages);
console.log("  Single-source:", jobSourceOnly);
console.log("  Open records stale >14 days:", jobOpenStale14);
console.log("");
console.log("Tour Nigeria");
console.log("  Guides:", exploreGuides.length);
console.log("  Places:", explorePlaces.length);
console.log("  Places missing direct source:", tourMissingSource);
console.log("  Places stale >30 days:", tourStale30);
console.log("  Guides stale >30 days:", guideStale30);
console.log("");
console.log("Movies");
console.log("  Curated titles:", entertainmentTitles.length);
console.log("  No current watch link:", movieNoWatch);
console.log("  Source-only verification pages:", movieSourceOnly);
console.log("  Runtime not verified:", movieMissingRuntime);
console.log("  Trailer not verified:", movieMissingTrailer);
console.log("");
console.log("YouTube movies");
console.log("  User-visible detail records:", youtubeDetailRecords.length);
console.log("  Indexable detail records:", indexableYouTubeDetailRecords.length);
console.log("  Curated records redirecting to main movie pages:", youtubeMovieLibrary.length - youtubeDetailRecords.length);
console.log("  Cast-pending/noindex:", youtubePending, "(" + youtubePendingPercent + "%)");

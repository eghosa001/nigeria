import { careerGuides } from "../lib/career-guides";
import { getJobTopicOpportunities, jobTopics } from "../lib/job-topics";
import { jobEmployers } from "../lib/job-employers";
import { getJobFacetOpportunities, jobLocationFacets, jobProfessionFacets } from "../lib/job-facets";
import { buildJobPostingJsonLd, daysSinceIsoDate, getEffectiveJobStatus } from "../lib/job-runtime";
import { JOBS_DIRECTORY_PAGE_SIZE, queryJobDirectory } from "../lib/job-query";
import { retiredJobRedirects, templateCareerPortalSlugs } from "../lib/job-scale-wave";
import { isIndexableJobOpportunity, jobOpportunities } from "../lib/jobs";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function unique(values: string[], label: string) {
  assert(new Set(values).size === values.length, label + " must be unique.");
}
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

assert(jobOpportunities.length >= 180, "Quality-first Jobs catalog must keep at least 180 verified opportunity or employer-pathway records after pruning thin pages.");
assert(jobOpportunities.length < 1000, "Move Jobs storage to the prepared D1 boundary before the in-memory server catalog reaches 1,000 records.");
const defaultDirectory = queryJobDirectory({ page: 1 });
assert(defaultDirectory.total === jobOpportunities.length, "Server directory total must match the catalog.");
assert(defaultDirectory.items.length <= JOBS_DIRECTORY_PAGE_SIZE, "The browser-facing Jobs directory must be paginated.");
assert(queryJobDirectory({ q: "Reliance Health", page: 1 }).total > 0, "Server directory search must find verified employers.");
unique(jobOpportunities.map((item) => item.slug), "Job slugs");
assert(templateCareerPortalSlugs.size > 0, "Generated career portal SEO gate must identify template-only records.");
for (const item of jobOpportunities) {
  if (!templateCareerPortalSlugs.has(item.slug)) continue;
  assert(item.kind === "career-page", item.slug + " expected to remain a directory-level employer listing.");
  assert(!isIndexableJobOpportunity(item), item.slug + " must not index template-only career content.");
}

unique(jobTopics.map((topic) => topic.slug), "Job topic slugs");
unique(careerGuides.map((guide) => guide.slug), "Career guide slugs");
assert(careerGuides.length >= 10, "Jobs pillar should keep at least 10 substantial evergreen career guides.");
unique(jobEmployers.map((employer) => employer.slug), "Employer slugs");
assert(retiredJobRedirects.size >= 100, "Retired thin vacancy URLs must keep redirects instead of becoming 404s.");
const opportunityBySlug = new Map(jobOpportunities.map((item) => [item.slug, item]));
for (const [retiredSlug, target] of retiredJobRedirects) {
  assert(!opportunityBySlug.has(retiredSlug), retiredSlug + " is retired and must not remain an indexable opportunity.");
  assert(target.startsWith("/jobs/"), retiredSlug + " redirect destination must stay inside the Jobs pillar.");
  if (target.startsWith("/jobs/categories/")) {
    const topicSlug = target.slice("/jobs/categories/".length);
    assert(jobTopics.some((topic) => topic.slug === topicSlug), retiredSlug + " redirects to an unknown Jobs category.");
  } else {
    const replacementSlug = target.slice("/jobs/".length);
    const replacement = opportunityBySlug.get(replacementSlug);
    assert(Boolean(replacement), retiredSlug + " redirects to a missing replacement opportunity.");
    assert(replacement?.kind === "career-page", retiredSlug + " must redirect to an employer career page.");
  }
}

for (const item of jobOpportunities) {
  assert(item.sources.length > 0, item.slug + " needs at least one source.");
  assert(isoDate.test(item.verifiedAt), item.slug + " needs an ISO verifiedAt date.");
  assert(item.officialUrl.startsWith("https://"), item.slug + " needs an HTTPS officialUrl.");
  assert(item.qualifications.length > 0, item.slug + " needs qualification guidance.");
  assert(item.requirements.length > 0, item.slug + " needs requirements.");
  assert(item.applicationSteps.length > 0, item.slug + " needs application steps.");
  if (item.status === "career-page" || item.kind === "career-page") {
    assert(item.status === "career-page", item.slug + " employer portal must use career-page status.");
    assert(item.kind === "career-page", item.slug + " employer portal must be normalized to career-page kind.");
    assert(!item.deadline, item.slug + " employer portal must not pretend to have one universal application deadline.");
    assert(item.fields.length >= 4, item.slug + " employer portal needs useful hiring-area coverage.");
    assert(item.qualifications.length >= 2, item.slug + " employer portal must explain how role-specific eligibility works.");
    assert(item.requirements.length >= 4, item.slug + " employer portal needs a concrete pre-application checklist.");
    assert(item.applicationSteps.length >= 5, item.slug + " employer portal needs a concrete portal workflow.");
    assert(item.sourceNotes.length >= 3, item.slug + " employer portal must explain exactly what was verified.");
  }
  if (item.kind === "vacancy") {
    const detailText = [...item.qualifications, ...item.requirements, ...item.applicationSteps].join(" ").toLowerCase();
    const bannedGenericPhrases = [
      "review the official " + item.organization.toLowerCase() + " vacancy for the exact",
      "still visible on the official careers board",
      "locate " + item.title.toLowerCase().replace(item.organization.toLowerCase() + " — ", ""),
    ];
    assert(!bannedGenericPhrases.some((phrase) => phrase && detailText.includes(phrase)), item.slug + " looks like a board-only generated vacancy rather than a verified role-detail page.");
    assert(item.applicationSteps.length >= 3, item.slug + " vacancy needs at least three role-specific application steps.");
    assert(item.sourceNotes.length >= 2, item.slug + " vacancy needs at least two role-specific verification notes.");
  }
  assert((item.topicSlugs ?? []).every((slug) => jobTopics.some((topic) => topic.slug === slug)), item.slug + " has an unknown explicit topic slug.");
  assert(item.sources.some((source) => new URL(source.url).hostname === new URL(item.officialUrl).hostname), item.slug + " officialUrl must share a hostname with at least one source.");
  if (item.deadline && item.deadline < new Date().toISOString().slice(0, 10)) {
    assert(getEffectiveJobStatus(item) !== "open", item.slug + " expired vacancy must never render as open.");
  }
  if (item.status === "open") {
    assert(daysSinceIsoDate(item.verifiedAt) <= 14, item.slug + " is marked open but has not been verified in the last 14 days.");
    if (item.deadline) assert(item.deadline >= new Date().toISOString().slice(0, 10), item.slug + " is stored open after its deadline.");
  }
  if (item.posting) {
    assert(item.kind === "vacancy", item.slug + " has JobPosting metadata but is not a vacancy.");
    assert(isoDate.test(item.posting.datePosted), item.slug + " needs an ISO JobPosting datePosted.");
    assert(item.posting.datePosted <= item.verifiedAt, item.slug + " datePosted cannot be after verifiedAt.");
    assert(item.posting.locations.length > 0, item.slug + " JobPosting needs at least one location.");
    const structured = buildJobPostingJsonLd(item, "https://mynigeriaguide.com/jobs/" + item.slug);
    if (item.jobPostingAuthorization) {
      assert(item.jobPostingAuthorization.publicEvidenceUrl.startsWith("https://"), item.slug + " JobPosting authorization needs public HTTPS evidence.");
      assert(isoDate.test(item.jobPostingAuthorization.verifiedAt), item.slug + " JobPosting authorization needs an ISO verifiedAt date.");
      assert(item.status === "open" ? Boolean(structured) : structured === null, item.slug + " JobPosting must appear only for an open, authorised vacancy.");
    } else {
      assert(structured === null, item.slug + " must not emit third-party JobPosting markup without recorded authorization.");
    }
  }
  assert(getEffectiveJobStatus(item) !== "open" || !item.deadline || item.deadline >= new Date().toISOString().slice(0, 10), item.slug + " effective status cannot stay open after deadline.");
}
for (const topic of jobTopics) {
  assert(getJobTopicOpportunities(topic.slug).length >= 3, topic.slug + " must group at least three verified opportunities.");
  assert(topic.relatedSlugs.every((slug) => slug !== topic.slug), topic.slug + " cannot link to itself.");
  assert(topic.relatedSlugs.every((slug) => jobTopics.some((candidate) => candidate.slug === slug)), topic.slug + " has an unknown related topic.");
}
for (const facet of [...jobLocationFacets, ...jobProfessionFacets]) {
  assert(getJobFacetOpportunities(facet).length >= 3, facet.slug + " needs at least three verified records before it can be indexable.");
}
for (const employer of jobEmployers) {
  assert(employer.opportunitySlugs.length > 0, employer.slug + " must reference at least one opportunity.");
}
for (const guide of careerGuides) {
  assert(isoDate.test(guide.reviewedAt), guide.slug + " needs an ISO reviewedAt date.");
  assert(guide.sections.length >= 3, guide.slug + " needs substantial multi-section guidance.");
  assert(guide.sources.length > 0, guide.slug + " needs source context.");
  assert(guide.relatedLinks.length >= 2, guide.slug + " needs contextual internal links.");
}

await Promise.all([
  import("../app/jobs/page"),
  import("../app/jobs/[slug]/page"),
  import("../app/jobs/categories/[slug]/page"),
  import("../app/jobs/guides/[slug]/page"),
  import("../app/jobs/locations/[slug]/page"),
  import("../app/jobs/professions/[slug]/page"),
  import("../app/jobs/new-this-week/page"),
  import("../app/jobs/closing-this-week/page"),
  import("../app/search/page"),
  import("../app/api/jobs/route"),
]);

console.log("Jobs & Careers content check");
console.log("  opportunities:", jobOpportunities.length);
console.log("  industry hubs:", jobTopics.length);
console.log("  location hubs:", jobLocationFacets.length);
console.log("  profession hubs:", jobProfessionFacets.length);
console.log("  employers:", jobEmployers.length);
console.log("  career guides:", careerGuides.length);
console.log("  directory page size:", defaultDirectory.items.length);
console.log("  authorised JobPosting pages:", jobOpportunities.filter((item) => item.jobPostingAuthorization).length);
console.log("  retired thin vacancy redirects:", retiredJobRedirects.size);

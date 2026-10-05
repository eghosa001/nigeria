import { careerGuides } from "../lib/career-guides";
import { getJobTopicOpportunities, jobTopics } from "../lib/job-topics";
import { jobEmployers } from "../lib/job-employers";
import { getJobFacetOpportunities, jobLocationFacets, jobProfessionFacets } from "../lib/job-facets";
import { buildJobPostingJsonLd, daysSinceIsoDate, getEffectiveJobStatus } from "../lib/job-runtime";
import { jobOpportunities } from "../lib/jobs";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function unique(values: string[], label: string) {
  assert(new Set(values).size === values.length, label + " must be unique.");
}
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

assert(jobOpportunities.length >= 300, "Jobs scale-to-300 wave must keep at least 300 verified opportunity records.");
assert(jobOpportunities.length < 500, "Move Jobs reads to the prepared D1/server-pagination boundary before the client catalog reaches 500 records.");
unique(jobOpportunities.map((item) => item.slug), "Job slugs");
unique(jobTopics.map((topic) => topic.slug), "Job topic slugs");
unique(careerGuides.map((guide) => guide.slug), "Career guide slugs");
assert(careerGuides.length >= 10, "Jobs pillar should keep at least 10 substantial evergreen career guides.");
unique(jobEmployers.map((employer) => employer.slug), "Employer slugs");

for (const item of jobOpportunities) {
  assert(item.sources.length > 0, item.slug + " needs at least one source.");
  assert(isoDate.test(item.verifiedAt), item.slug + " needs an ISO verifiedAt date.");
  assert(item.officialUrl.startsWith("https://"), item.slug + " needs an HTTPS officialUrl.");
  assert(item.qualifications.length > 0, item.slug + " needs qualification guidance.");
  assert(item.requirements.length > 0, item.slug + " needs requirements.");
  assert(item.applicationSteps.length > 0, item.slug + " needs application steps.");
  assert((item.topicSlugs ?? []).every((slug) => jobTopics.some((topic) => topic.slug === slug)), item.slug + " has an unknown explicit topic slug.");
  assert(item.sources.some((source) => new URL(source.url).hostname === new URL(item.officialUrl).hostname), item.slug + " officialUrl must share a hostname with at least one source.");
  if (item.status === "open") {
    assert(daysSinceIsoDate(item.verifiedAt) <= 14, item.slug + " is marked open but has not been verified in the last 14 days.");
    if (item.deadline) assert(item.deadline >= new Date().toISOString().slice(0, 10), item.slug + " is stored open after its deadline.");
  }
  if (item.posting) {
    assert(item.kind === "vacancy", item.slug + " has JobPosting metadata but is not a vacancy.");
    assert(isoDate.test(item.posting.datePosted), item.slug + " needs an ISO JobPosting datePosted.");
    assert(item.posting.datePosted <= item.verifiedAt, item.slug + " datePosted cannot be after verifiedAt.");
    assert(item.posting.locations.length > 0, item.slug + " JobPosting needs at least one location.");
    assert(Boolean(buildJobPostingJsonLd(item, "https://mynigeriaguide.com/jobs/" + item.slug)), item.slug + " JobPosting must build while the vacancy is open.");
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
]);

console.log("Jobs & Careers content check");
console.log("  opportunities:", jobOpportunities.length);
console.log("  industry hubs:", jobTopics.length);
console.log("  location hubs:", jobLocationFacets.length);
console.log("  profession hubs:", jobProfessionFacets.length);
console.log("  employers:", jobEmployers.length);
console.log("  career guides:", careerGuides.length);

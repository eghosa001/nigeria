import { careerGuides } from "../lib/career-guides";
import { getJobTopicOpportunities, jobTopics } from "../lib/job-topics";
import { jobOpportunities } from "../lib/jobs";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function unique(values: string[], label: string) {
  assert(new Set(values).size === values.length, label + " must be unique.");
}
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

assert(jobOpportunities.length >= 80, "Jobs scaling wave must keep at least 80 verified opportunity records.");
assert(jobOpportunities.length < 1000, "JobsDirectory currently receives the full catalog; move to server pagination before 1,000 records.");
unique(jobOpportunities.map((item) => item.slug), "Job slugs");
unique(jobTopics.map((topic) => topic.slug), "Job topic slugs");
unique(careerGuides.map((guide) => guide.slug), "Career guide slugs");

for (const item of jobOpportunities) {
  assert(item.sources.length > 0, item.slug + " needs at least one source.");
  assert(isoDate.test(item.verifiedAt), item.slug + " needs an ISO verifiedAt date.");
  assert(item.officialUrl.startsWith("https://"), item.slug + " needs an HTTPS officialUrl.");
  assert(item.qualifications.length > 0, item.slug + " needs qualification guidance.");
  assert(item.requirements.length > 0, item.slug + " needs requirements.");
  assert(item.applicationSteps.length > 0, item.slug + " needs application steps.");
}
for (const topic of jobTopics) {
  assert(getJobTopicOpportunities(topic.slug).length >= 3, topic.slug + " must group at least three verified opportunities.");
  assert(topic.relatedSlugs.every((slug) => slug !== topic.slug), topic.slug + " cannot link to itself.");
  assert(topic.relatedSlugs.every((slug) => jobTopics.some((candidate) => candidate.slug === slug)), topic.slug + " has an unknown related topic.");
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
  import("../app/search/page"),
]);

console.log("Jobs & Careers content check");
console.log("  opportunities:", jobOpportunities.length);
console.log("  industry hubs:", jobTopics.length);
console.log("  career guides:", careerGuides.length);

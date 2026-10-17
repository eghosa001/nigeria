import { careerGuides } from "../lib/career-guides";
import { getJobTopicOpportunities, jobTopics } from "../lib/job-topics";
import { jobEmployers } from "../lib/job-employers";
import { getJobFacetOpportunities, jobLocationFacets, jobProfessionFacets } from "../lib/job-facets";
import { buildJobPostingJsonLd, daysSinceIsoDate, getEffectiveJobStatus } from "../lib/job-runtime";
import { JOBS_DIRECTORY_PAGE_SIZE, queryJobDirectory } from "../lib/job-query";
import { retiredJobRedirects, templateCareerPortalSlugs } from "../lib/job-scale-wave";
import { isIndexableJobOpportunity, jobOpportunities } from "../lib/jobs";
import { verifiedJobSlugs20261016 } from "../lib/job-verified-pathways-2026-10-16";
import { verifiedPortalSlugs20261016 } from "../lib/job-issuer-portals-reviewed-2026-10-16";
import { issuerCareerReviewSlugs20261016B } from "../lib/job-issuer-career-research-2026-10-16-b";
import { checkedIssuerCareerSlugs20261016, checkedIssuerCareers20261016 } from "../lib/job-issuer-more-reviewed-2026-10-16";
import { individuallyCheckedMoniepointRoles20261016, moniepointRoleFollowups20261017 } from "../lib/job-moniepoint-exact-roles-2026-10-16";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function unique(values: string[], label: string) {
  assert(new Set(values).size === values.length, label + " must be unique.");
}
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

assert(jobOpportunities.length >= 180, "Quality-first Jobs catalog must keep at least 180 verified opportunity or employer-pathway records after pruning thin pages.");
assert(jobOpportunities.length < 1000, "Move Jobs storage to the prepared D1 boundary before the in-memory server catalog reaches 1,000 records.");
// An employer-wide jobs board is not itself an actively open vacancy.
for (const slug of [
  "dangote-group-careers", "flutterwave-nigeria-careers", "paystack-nigeria-careers",
  "moniepoint-nigeria-careers", "sterling-bank-careers", "bat-nigeria-careers",
  "halliburton-nigeria-careers", "oau-careers", "axa-mansard-careers",
  "aiico-insurance-careers", "emzor-careers", "eha-clinics-careers",
]) {
  const record = jobOpportunities.find((job) => job.slug === slug);
  assert(record?.kind === "career-page" && record.status === "career-page",
    slug + " must be an employer portal, never a currently open vacancy.");
  assert(getEffectiveJobStatus(record) === "career-page",
    slug + " must not enter the open-now vacancy list.");
}

// Nine independently checked employer directories must expose the actual
// role-specific route, not be promoted into open single-job listings.
assert(issuerCareerReviewSlugs20261016B.length === 9, "Nine issuer career directories must have individual evidence.");
for (const slug of issuerCareerReviewSlugs20261016B) {
  const item = jobOpportunities.find(job => job.slug === slug);
  assert(item?.kind === "career-page" && item.status === "career-page",
    slug + ": company careers hub cannot be labelled an open vacancy.");
  assert(item.verifiedAt === "2026-10-16" &&
    item.applicationSteps.length === 5 && item.sourceNotes.length >= 3 &&
    item.sources.some(src => src.lastChecked === "2026-10-16") &&
    !item.deadline, slug + ": checked application path, sources or deadline claim regressed.");
}
const piggyvestPortal = jobOpportunities.find(item => item.slug === "piggyvest-careers");
assert(piggyvestPortal?.summary.includes("No Open Positions"),
  "PiggyVest board showed no roles at verification; do not invent a vacancy.");

// The six Moniepoint pages must show issuer-owned role evidence, not the
// old Greenhouse landing redirects. A live title does not prove a submission.
assert(individuallyCheckedMoniepointRoles20261016.length === 6,
  "Six independent Moniepoint role updates expected.");
for (const slug of individuallyCheckedMoniepointRoles20261016) {
  const item = jobOpportunities.find(job => job.slug === slug);
  assert(item?.kind === "vacancy" && item.officialUrl.startsWith("https://moniepoint.com/careers/roles/"),
    slug + ": link should point to the actual official job description.");
  const followup = moniepointRoleFollowups20261017[slug];
  const checkedDate = followup ? "2026-10-17" : "2026-10-16";
  assert(item.verifiedAt === checkedDate &&
      item.applicationSteps.length === (followup ? 5 : 4) &&
      item.sourceNotes.length === (followup ? 5 : 3) &&
      item.sources.some(source => source.url === item.officialUrl && source.lastChecked === checkedDate),
    slug + ": individual issuer source and role-specific next steps missing.");
  if (followup) {
    assert(item.applicationSteps.includes(followup.action) &&
      item.sourceNotes.includes(followup.decision) &&
      item.sources.some(source => source.url === "https://moniepoint.com/careers" &&
        source.lastChecked === "2026-10-17"),
      slug + ": 17 October issuer-specific follow-up evidence must remain visible.");
  }
  assert(!item.deadline && !item.jobPostingAuthorization,
    slug + ": do not invent a closing date or structured job-publishing authorization.");
}
const moniepointResearch = jobOpportunities.find(job => job.slug === "moniepoint-customer-experience-researcher");
assert(moniepointResearch?.status === "unverified" &&
    !isIndexableJobOpportunity(moniepointResearch),
    "Customer Experience Researcher must remain noindex until a current accepting vacancy is substantiated.");

// Verify that an HTTP 200 page containing 'expired' or an employer-board redirect
// does not masquerade as a live Apply form in the Jobs pillar.
const sourceUnavailableJobs = [
  { slug: "fmn-golden-transport-data-tracking-assistant-2026", status: "closed" },
  { slug: "fmn-golden-transport-data-tracking-officer-2026", status: "closed" },
  { slug: "fmn-premier-feed-mills-senior-plant-operations-calabar-2026", status: "closed" },
  { slug: "moniepoint-customer-experience-researcher", status: "unverified" },
  { slug: "eha-dental-assistant-lagos-2026", status: "unverified" },
] as const;
for (const { slug, status } of sourceUnavailableJobs) {
  const record = jobOpportunities.find((item) => item.slug === slug);
  assert(record?.status === status, slug + " must remain separated from verified open applications.");
  assert(record.kind === "vacancy" && !isIndexableJobOpportunity(record),
    slug + " is not currently a standalone indexable job advert.");
  assert(!buildJobPostingJsonLd(record, "https://mynigeriaguide.com/jobs/" + slug),
    slug + " must not expose live JobPosting structured data.");
  const openJobs = queryJobDirectory({ status: "open", q: record.organization, page: 1, pageSize: 48 });
  assert(!openJobs.items.some((item) => item.slug === slug),
    slug + " must not appear in open jobs.");
  if (status === "unverified") {
    const closedJobs = queryJobDirectory({ status: "closed", q: record.organization, page: 1, pageSize: 48 });
    assert(!closedJobs.items.some((item) => item.slug === slug),
      slug + " has no employer-confirmed closure and must not appear in closed jobs.");
  }
}

// A change to status alone is insufficient: the article summary and source
// notes must not continue claiming that an expired/missing role is recruiting.
for (const slug of [
  "fmn-golden-transport-data-tracking-assistant-2026",
  "fmn-golden-transport-data-tracking-officer-2026",
  "fmn-premier-feed-mills-senior-plant-operations-calabar-2026",
  "moniepoint-customer-experience-researcher",
  "eha-dental-assistant-lagos-2026",
]) {
  const item = jobOpportunities.find((job) => job.slug === slug);
  assert(item && ["closed", "unverified"].includes(item.status),
    slug + " must be historically closed or currently unverifiable.");
  assert(/archived|former|previously|unverified/i.test(item.summary),
    slug + " summary must explicitly disclose historical/unverified recruitment status.");
  assert(!/\b(is hiring|is recruiting|seeks|currently accepting|applications open)\b/i.test(item.summary),
    slug + " summary must not present the employer's withdrawn role as a current vacancy.");
}

// Change-scoped issuer-route check: no generic career portal can be substituted
// for the twelve individually verified FMN, Dangote and Olam vacancies.
assert(verifiedJobSlugs20261016.length === 12 && new Set(verifiedJobSlugs20261016).size === 12,
  "October 2026 source check must cover twelve distinct vacancies.");
for (const slug of verifiedJobSlugs20261016) {
  const record = jobOpportunities.find((item) => item.slug === slug);
  assert(record?.kind === "vacancy" && record.status === "open" && record.verifiedAt === "2026-10-16",
    slug + " must remain a recently checked individual vacancy.");
  assert(record.sources.some((source) => source.url === record.officialUrl && source.lastChecked === "2026-10-16"),
    slug + " must cite the exact currently checked issuer URL.");
  assert(record.applicationSteps.some((step) => step.includes("own work")) &&
    record.applicationSteps.some((step) => step.includes("Apply")), slug + " needs useful applicant steps.");
  if (record.officialUrl.includes("fmnplc.e-recruiter.ng")) {
    assert(record.applicationSteps.some((step) => step.includes("Computer Exposure") && step.includes("Referee")),
      slug + " needs FMN registration and CV sections, not a fictitious open submission form.");
  }
}

const fulafia = jobOpportunities.find(item => item.slug === "federal-university-lafia-recruitment-2026");
assert(fulafia?.officialUrl === "https://careers.fulafia.edu.ng/" &&
  fulafia.sources.some(source => source.url === "https://fcc.gov.ng/recruitment/") &&
  fulafia.deadline === "2026-10-28" &&
  fulafia.applicationSteps.some(step => step.includes("registrar@fulafia.edu.ng")),
  "FULAFIA must use the live university portal and valid FCC deadline, not the 404 item URL.");
assert(!fulafia.sources.some(source => source.url.includes("/job-listings/federal-university-of-lafia")),
  "Definitively broken FCC job-detail link must not remain in the active source collection.");

// Issuer-specific 25-portal correction: career information does not equal an
// open vacancy. Check the exact source, visible application decisions and
// absence of a fictitious universal deadline or JobPosting.
assert(verifiedPortalSlugs20261016.length === 25 &&
  new Set(verifiedPortalSlugs20261016).size === 25,
  "25 independently reviewed issuer career destinations must stay distinct.");
for (const slug of verifiedPortalSlugs20261016) {
  const item = jobOpportunities.find(job => job.slug === slug);
  assert(item?.kind === "career-page" && item.status === "career-page",
    slug + " must remain a career directory, not an open recruitment.");
  assert(item.verifiedAt === "2026-10-16" && item.title &&
    item.statusLabel.includes("individual opening unverified") && !item.deadline,
    slug + " must disclose career-directory status and avoid invented deadlines.");
  assert(item.sources.some(source => source.url === item.officialUrl &&
    source.lastChecked === "2026-10-16"),
    slug + " needs a checked exact first-party issuer link.");
  assert(item.applicationSteps.length === 5 &&
    !item.applicationSteps.some(step => /Browse or search the employer's current opportunities; relevant hiring areas/.test(step)),
    slug + " must have a specific decision path, not reusable portal filler.");
  assert(!item.nextMilestone,
    slug + " must not display a generic or stale application milestone.");
  assert(!buildJobPostingJsonLd(item, "https://mynigeriaguide.com/jobs/" + slug),
    slug + " must not expose JobPosting on a directory without a vacancy.");
}
const airtelPortal = jobOpportunities.find(x => x.slug === "airtel-nigeria-careers");
assert(airtelPortal?.applicationSteps.some(s => s.includes("April–June") && s.includes("July–September")) &&
  airtelPortal.applicationSteps.some(s => s.includes("Vacancies@ng.airtel.com")),
  "Airtel's actual internship timing and unsolicited CV route must be distinguished.");
const unicefPortal = jobOpportunities.find(x => x.slug === "unicef-nigeria-careers");
assert(unicefPortal?.summary.includes("No vacancies at this time") &&
  unicefPortal.applicationSteps.some(s => s.includes("does not accept unsolicited CVs")),
  "UNICEF's currently empty section and no unsolicited CV policy must remain explicit.");
const firstBankPortal = jobOpportunities.find(x => x.slug === "firstbank-graduate-trainee-careers");
assert(firstBankPortal?.applicationSteps.some(s => s.includes("under-27") &&
  s.includes("HND Upper Credit")),
  "FirstBank's published programme entry rules must be separated from live intake.");
const moniepointPortal = jobOpportunities.find(x => x.slug === "moniepoint-nigeria-careers");
assert(moniepointPortal?.summary.includes("four-stage hiring process"),
  "Moniepoint must have its unique official interview-process explanation.");

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
// These two alias URLs are duplicates of the SAME employer requisition. Unlike
// retired distinct vacancies, their precise canonical role is the safest target.
const sameRequisitionAliases = new Map([
  ["moniepoint-financial-planning-analyst-nigeria-2026", { canonical: "moniepoint-financial-planning-analyst", requisition: "4355709101" }],
  ["moniepoint-early-careers-talent-acquisition-specialist-2026", { canonical: "moniepoint-early-careers-talent-acquisition-specialist", requisition: "4981411101" }],
]);
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
    const sameRequisition = sameRequisitionAliases.get(retiredSlug);
    if (sameRequisition) {
      assert(replacementSlug === sameRequisition.canonical, retiredSlug + " must redirect to its exact canonical issuer role.");
      assert(replacement?.kind === "vacancy" && replacement.officialUrl.endsWith("/" + sameRequisition.requisition),
        retiredSlug + " must retain the matching employer requisition.");
    } else {
      assert(replacement?.kind === "career-page", retiredSlug + " must redirect to an employer career page.");
    }
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
  if (item.kind === "vacancy" && ["closed", "unverified"].includes(getEffectiveJobStatus(item))) {
    assert(!isIndexableJobOpportunity(item), item.slug + " unavailable individual vacancy must stay out of search sitemaps.");
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

// 25 source-verified employer paths, distinct from earlier reviewed batches.
assert(checkedIssuerCareerSlugs20261016.length === 25,
  "Missing one of 25 newly reviewed careers directory records.");
assert(new Set(checkedIssuerCareerSlugs20261016).size === 25,
  "Duplicate employer-directory review slug.");
for (const slug of checkedIssuerCareerSlugs20261016) {
  const job = jobOpportunities.find(entry => entry.slug === slug);
  const evidence = checkedIssuerCareers20261016[slug];
  assert(job?.kind === "career-page" && job.status === "career-page",
    slug + " must remain a careers directory, not an open vacancy.");
  assert(job.verifiedAt === "2026-10-16" && job.deadline === undefined,
    slug + " must have a factual date and no universal application deadline.");
  assert(job.summary === evidence.lead && job.applicationSteps.length === 5 &&
    job.applicationSteps.every(step => step.length >= 85),
    slug + " must serve original issuer-specific application decisions.");
  assert(job.sourceNotes.some(note => note.includes(evidence.guard.slice(0, 35))),
    slug + " must retain issuer-specific applicant safety caveat.");
  assert(job.sources.some(source => source.url === evidence.url &&
    source.lastChecked === "2026-10-16"), slug + " lost its issuer's original citation.");
}
for (const slug of ["keystone-bank-careers", "coronation-merchant-bank-careers",
  "nem-insurance-careers"]) {
  assert(/no vacanc|no job openings|no open roles/i.test(jobOpportunities.find(job =>
    job.slug === slug)?.summary ?? ""), slug + " must not advertise nonexistent live vacancies.");
}
assert(jobOpportunities.find(job => job.slug === "prestige-assurance-careers")?.sourceNotes
  .some(note => /disagree|conflict/i.test(note)),
  "Prestige's contradictory issuer vacancy pages must remain disclosed.");
assert(jobOpportunities.find(job => job.slug === "regency-alliance-careers")?.summary
  .includes("Consulting WP"),
  "Regency's unreplaced placeholder page must be named, not represented as a professional jobs board.");

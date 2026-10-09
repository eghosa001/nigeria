import { jobOpportunities, type CareerOpportunity } from "@/lib/jobs";
import { getEffectiveJobStatus, todayIsoNigeria } from "@/lib/job-runtime";

const key = (value: string) => value.trim().toLocaleLowerCase("en");
function overlap(values: string[], other: Set<string>) {
  return values.reduce((total, value) => total + (other.has(key(value)) ? 1 : 0), 0);
}

/** Recommend actual, still-open opportunities from other employers, not expired listings or generic portals. */
export function getSimilarOpenJobs(current: CareerOpportunity, limit = 4, today = todayIsoNigeria()) {
  const fields = new Set(current.fields.map(key));
  const audiences = new Set(current.audiences.map(key));
  const topics = new Set((current.topicSlugs ?? []).map(key));
  const candidates = jobOpportunities
    .filter((item) =>
      item.slug !== current.slug &&
      key(item.organization) !== key(current.organization) &&
      item.kind !== "career-page" &&
      item.status !== "career-page" &&
      getEffectiveJobStatus(item, today) === "open"
    )
    .map((item) => {
      const sharedFields = overlap(item.fields, fields);
      const sharedAudiences = overlap(item.audiences, audiences);
      const sharedTopics = overlap(item.topicSlugs ?? [], topics);
      const score = sharedFields * 5 + sharedTopics * 5 + sharedAudiences * 3 +
        (item.sector === current.sector ? 2 : 0) +
        (item.location === current.location ? 1 : 0);
      const reason = sharedFields ? "Related field: " + item.fields.find((field) => fields.has(key(field)))
        : sharedTopics ? "Related career area"
          : sharedAudiences ? "Similar applicant eligibility"
            : "Same sector";
      return { item, score, reason };
    })
    .filter(({ score }) => score >= 5)
    .sort((a, b) => b.score - a.score || b.item.verifiedAt.localeCompare(a.item.verifiedAt) ||
      a.item.title.localeCompare(b.item.title));

  const seenEmployers = new Set<string>();
  return candidates.filter(({ item }) => {
    const employer = key(item.organization);
    if (seenEmployers.has(employer)) return false;
    seenEmployers.add(employer);
    return true;
  }).slice(0, limit);
}


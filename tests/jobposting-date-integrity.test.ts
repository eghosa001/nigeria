import assert from "node:assert/strict";
import test from "node:test";
import { buildJobPostingJsonLd } from "../lib/job-runtime";
import type { CareerOpportunity } from "../lib/jobs";

function vacancy(datePosted: string, verifiedAt = "2026-10-13"): CareerOpportunity {
  return {
    kind: "vacancy", slug: "checked-role", status: "open", title: "Verified position",
    summary: "A checked employer vacancy", organization: "Employer",
    qualifications: ["Relevant qualification"], requirements: ["Qualified candidate"],
    applicationSteps: ["Apply on the employer site"], deadline: "2026-10-20",
    posting: { jobTitle: "Verified position", datePosted, locations: [{ country: "NG" }] },
    jobPostingAuthorization: {
      publicEvidenceUrl: "https://employer.example/jobs/role", verifiedAt, note: "Employer listing",
    },
  } as CareerOpportunity;
}

test("JobPosting only emits for already published employer roles with real verification dates", () => {
  const url = "https://mynigeriaguide.com/jobs/checked-role";
  assert.equal(buildJobPostingJsonLd(vacancy("2026-10-14"), url, "2026-10-14")?.["@type"], "JobPosting");
  assert.equal(buildJobPostingJsonLd(vacancy("2026-10-15"), url, "2026-10-14"), null);
  assert.equal(buildJobPostingJsonLd(vacancy("2026-02-30"), url, "2026-10-14"), null);
  assert.equal(buildJobPostingJsonLd(vacancy("2026-10-10", "2026-10-20"), url, "2026-10-14"), null);
  assert.equal(buildJobPostingJsonLd(vacancy("2026-10-10", "invalid"), url, "2026-10-14"), null);
});

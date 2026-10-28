import assert from "node:assert/strict";
import test from "node:test";
import { isCurrentInternshipOpportunity } from "../lib/job-internships";
import type { CareerOpportunity } from "../lib/jobs";

const base = {
  slug: "sample",
  title: "Student Industrial Training Internship",
  kind: "programme",
  status: "open",
  verifiedAt: "2026-10-25",
  employmentType: "INTERN",
  audiences: ["Students"],
  fields: ["Engineering"],
} as CareerOpportunity;

test("SIWES and internship hub only lists evidenced, actionable individual intakes", () => {
  assert.equal(isCurrentInternshipOpportunity(base, "2026-10-28"), true);
  assert.equal(isCurrentInternshipOpportunity({ ...base, title: "Graduate internship 2027", status: "upcoming" }, "2026-10-28"), true);
  assert.equal(isCurrentInternshipOpportunity({ ...base, title: "Airtel Careers: Undergraduate Internship", kind: "career-page", status: "career-page" }, "2026-10-28"), false);
  assert.equal(isCurrentInternshipOpportunity({ ...base, title: "Early Careers Talent Acquisition Specialist", employmentType: "FULL_TIME", audiences: ["Internship applicants"] }, "2026-10-28"), false);
  assert.equal(isCurrentInternshipOpportunity({ ...base, deadline: "2026-10-12" }, "2026-10-28"), false);
  assert.equal(isCurrentInternshipOpportunity({ ...base, verifiedAt: "2026-09-01", kind: "vacancy" }, "2026-10-28"), false);
  assert.equal(isCurrentInternshipOpportunity({ ...base, status: "closed" }, "2026-10-28"), false);
});

import assert from "node:assert/strict";
import test from "node:test";
import type { Service } from "../lib/types";
import { getRequirementDetails } from "../lib/requirement-details";

test("NECO timetable public PDF does not invent phone identity or SMS verification", () => {
  const mock = {
    slug: "neco-2026-timetable",
    agencySlug: "neco",
    requirements: [
      "Confirmation that you need the 2026 SSCE Internal timetable or the 2026 SSCE External timetable",
      "Your registered NECO subjects so you can identify every scheduled paper",
      "A phone or computer with a PDF viewer for the official NECO timetable download",
    ],
  } as Service;
  const details = getRequirementDetails(mock);
  assert.equal(details.length, 3);
  assert.equal(details[2].kind, "Other requirement");
  assert.match(details[2].why ?? "", /No SMS code, candidate account or personal phone number is required/);
  assert.match(details[1].why ?? "", /subject and paper/);
  assert.match(details[0].why ?? "", /different official PDFs/);
  assert.doesNotMatch(details.map(d => d.why ?? "").join(" "), /Used for SMS, OTP, recovery/i);
});

test("genuine mobile number on NYSC enrolment still gets identity/account explanation", () => {
  const record = { slug: "nysc-registration-local", agencySlug: "nysc", requirements: ["Nigerian GSM phone number"] } as Service;
  const [detail] = getRequirementDetails(record);
  assert.equal(detail.kind, "Identity / account detail");
  assert.match(detail.why ?? "", /SMS, OTP, recovery or account identification/);
});

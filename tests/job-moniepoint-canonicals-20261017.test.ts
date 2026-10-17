import test from "node:test";
import assert from "node:assert/strict";
import { getJobOpportunity, jobOpportunities } from "../lib/jobs";
import { retiredJobRedirects } from "../lib/job-scale-wave";

const aliases = [
  {
    alias: "moniepoint-financial-planning-analyst-nigeria-2026",
    canonical: "moniepoint-financial-planning-analyst",
    requisition: "4355709101",
  },
  {
    alias: "moniepoint-early-careers-talent-acquisition-specialist-2026",
    canonical: "moniepoint-early-careers-talent-acquisition-specialist",
    requisition: "4981411101",
  },
] as const;

test("each duplicate Moniepoint requisition has one canonical record and permanent alias", () => {
  for (const { alias, canonical, requisition } of aliases) {
    assert.equal(getJobOpportunity(alias), undefined, alias + " must not enter the site catalog");
    assert.equal(retiredJobRedirects.get(alias), "/jobs/" + canonical, alias + " must keep a redirect");
    const record = getJobOpportunity(canonical);
    assert.ok(record, canonical + " must remain available");
    assert.equal(record.kind, "vacancy");
    assert.match(record.officialUrl, new RegExp("/" + requisition + "$"));
    const recordsForRequisition = jobOpportunities.filter(item =>
      item.officialUrl.endsWith("/" + requisition)
      && item.organization.toLowerCase().includes("moniepoint")
    );
    assert.deepEqual(recordsForRequisition.map(item => item.slug), [canonical]);
  }
});

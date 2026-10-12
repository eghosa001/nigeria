/**
 * Read-only migration snapshot. It NEVER executes SQL or assigns publication.
 * Missing states / duplicate slugs / shared-guide relationships remain blockers.
 */
import { explorePlaces, getExplorePlacesForGuide } from "../lib/explore-places";
import { exploreGuides } from "../lib/explore";
import { buildTourMigrationAudit } from "./tour-migration-audit";

const result = buildTourMigrationAudit(explorePlaces, exploreGuides, getExplorePlacesForGuide);
console.log(JSON.stringify({
  databaseWrites: 0,
  publishedRecordsCreated: 0,
  sourceCount: result.sourceCount,
  uniqueCount: result.uniqueCount,
  guideCount: result.guideCount,
  membershipCount: result.membershipCount,
  resolvedFromAddressCount: result.resolvedFromAddressCount,
  problemsByReason: result.problemsByReason,
  problemExamples: result.problems.slice(0, 30),
  productionCutoverApproved: result.productionCutoverApproved,
}, null, 2));
if (result.candidates.some((candidate) => candidate.editorialStatus !== "draft")) {
  throw new Error("Readiness snapshot unexpectedly allowed non-draft status.");
}
if (result.memberships.some((membership) => membership.position < 0)) {
  throw new Error("Tour guide membership order cannot be negative.");
}

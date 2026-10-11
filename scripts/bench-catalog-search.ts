/**
 * Read-only, bounded CPU microbenchmark on real checked-in catalogs.
 * Run manually: npx tsx scripts/bench-catalog-search.ts
 * This is NOT an end-user latency, Worker CPU, or browser Web Vitals claim.
 */
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { publicServiceListings } from "@/lib/data";
import { scoreService, searchServices } from "@/lib/search";
import { jobOpportunities } from "@/lib/jobs";
import { jobSearchText } from "@/lib/job-facets";

const query = "passport renewal";
const limit = 12;

function legacyServiceQuery() {
  return publicServiceListings
    .map((service) => ({ service, score: scoreService(service, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.service.shortTitle.localeCompare(b.service.shortTitle))
    .slice(0, limit);
}

function preparedServiceQuery() {
  return searchServices(publicServiceListings, query, limit);
}

assert.deepEqual(
  preparedServiceQuery().map(({ service, score }) => [service.slug, score]),
  legacyServiceQuery().map(({ service, score }) => [service.slug, score]),
);

const repeat = Math.min(400, Math.max(30, Math.ceil(30_000 / Math.max(1, jobOpportunities.length))));

function legacyJobText() {
  let checksum = 0;
  for (let i = 0; i < repeat; i++) {
    for (const item of jobOpportunities) {
      checksum += [
        item.title, item.organization, item.summary, item.location, item.employmentType,
        ...item.audiences, ...item.fields, ...item.qualifications,
      ].join(" ").toLowerCase().length;
    }
  }
  return checksum;
}

function indexedJobText() {
  let checksum = 0;
  for (let i = 0; i < repeat; i++) {
    for (const item of jobOpportunities) checksum += jobSearchText(item).length;
  }
  return checksum;
}

assert.equal(legacyJobText(), indexedJobText());

function medianMs(fn: () => unknown, samples = 5): number {
  fn(); // Warm JIT and, for the indexed variant, initialize lazy caches.
  const durations: number[] = [];
  for (let i = 0; i < samples; i++) {
    const start = performance.now();
    fn();
    durations.push(performance.now() - start);
  }
  durations.sort((a, b) => a - b);
  return durations[Math.floor(durations.length / 2)];
}

const serviceLegacyMs = medianMs(legacyServiceQuery, 5);
const servicePreparedMs = medianMs(preparedServiceQuery, 5);
const jobLegacyMs = medianMs(legacyJobText, 5);
const jobIndexedMs = medianMs(indexedJobText, 5);

console.log(JSON.stringify({
  kind: "node-v22-in-process-microbenchmark",
  node: process.version,
  serviceRecords: publicServiceListings.length,
  jobRecords: jobOpportunities.length,
  iterationsPerJobMeasurement: repeat,
  service: {
    legacyMedianMs: Number(serviceLegacyMs.toFixed(3)),
    preparedMedianMs: Number(servicePreparedMs.toFixed(3)),
    speedup: Number((serviceLegacyMs / servicePreparedMs).toFixed(2)),
  },
  jobs: {
    legacyMedianMs: Number(jobLegacyMs.toFixed(3)),
    indexedMedianMs: Number(jobIndexedMs.toFixed(3)),
    speedup: Number((jobLegacyMs / jobIndexedMs).toFixed(2)),
  },
  limitation: "One hosted CI CPU, warm in-process, catalog-only; not Cloudflare Worker latency or first-load cost.",
}, null, 2));

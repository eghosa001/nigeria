import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { publicServices } from "../lib/data";
import { entertainmentTitles } from "../lib/entertainment";
import { entertainmentPeople } from "../lib/entertainment-extras";
import { seriesTitles } from "../lib/series";
import { indexableYouTubeMovies } from "../lib/youtube-library";
import { exploreGuides } from "../lib/explore";
import { explorePlaces } from "../lib/explore-places";
import { jobOpportunities } from "../lib/jobs";
import { getSitemapEntries, getSitemapSections, SITEMAP_SHARD_SIZE } from "../lib/sitemap-sections";

const here = dirname(fileURLToPath(import.meta.url));
const targets = JSON.parse(
  readFileSync(resolve(here, "../config/scale-targets.json"), "utf8"),
) as {
  traffic_design: {
    monthly_pageviews_target: number;
    underlying_content_records_headroom: number;
  };
  content_scale: {
    indexable_public_urls_target: number;
    pillar_url_targets: Record<string, number>;
  };
  guardrails: {
    sitemap_urls_per_file: number;
    catalog_records_before_database_required: number;
  };
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const pillarTargetTotal = Object.values(targets.content_scale.pillar_url_targets)
  .reduce((sum, value) => sum + value, 0);

assert(
  pillarTargetTotal === targets.content_scale.indexable_public_urls_target,
  "Pillar URL targets must add up to the public URL target.",
);
assert(
  targets.guardrails.sitemap_urls_per_file === SITEMAP_SHARD_SIZE,
  "config/scale-targets.json sitemap shard size must match lib/sitemap-sections.ts.",
);
assert(
  targets.traffic_design.underlying_content_records_headroom >=
    targets.content_scale.indexable_public_urls_target,
  "Underlying record headroom must be at least as large as the public URL target.",
);

const indexableYouTubeDetailMovies = indexableYouTubeMovies.filter((movie) => movie.source !== "curated");

const counts = {
  movies_entertainment:
    entertainmentTitles.length +
    seriesTitles.length +
    entertainmentPeople.length +
    indexableYouTubeDetailMovies.length,
  services: publicServices.length,
  tour_nigeria: exploreGuides.length + explorePlaces.length,
  jobs_careers: jobOpportunities.length,
};

// A mapped place or imported video is a content record, not automatically an
// indexable URL. Report the two dimensions separately to prevent SEO inflation.
const indexedUrlCounts: Record<string, number> = {
  movies_entertainment: getSitemapEntries("movies").length + getSitemapEntries("youtube").length,
  services: getSitemapEntries("services").length,
  tour_nigeria: getSitemapEntries("travel").length,
  jobs_careers: getSitemapEntries("jobs").length,
};

for (const [pillar, count] of Object.entries(indexedUrlCounts)) {
  const target = targets.content_scale.pillar_url_targets[pillar];
  assert(typeof target === "number", "Missing scale target for " + pillar + ".");
  assert(target >= count, "Scale target for " + pillar + " is below the current indexable URL count.");
}

const sitemapShards = getSitemapSections();
for (const shard of sitemapShards) {
  assert(
    shard.count <= SITEMAP_SHARD_SIZE,
    shard.name + " exceeds the configured sitemap shard size.",
  );
}

console.log("MyNigeriaGuide scale contract");
console.log("  Traffic design target:", targets.traffic_design.monthly_pageviews_target.toLocaleString(), "pageviews/month");
console.log("  Public URL target:", targets.content_scale.indexable_public_urls_target.toLocaleString());
console.log("  Content-record headroom:", targets.traffic_design.underlying_content_records_headroom.toLocaleString());
console.log("  Database migration threshold:", targets.guardrails.catalog_records_before_database_required.toLocaleString(), "records/pillar");
console.log("");
for (const [pillar, count] of Object.entries(indexedUrlCounts)) {
  const target = targets.content_scale.pillar_url_targets[pillar];
  const percent = ((count / target) * 100).toFixed(2);
  console.log(" ", pillar.padEnd(22), String(count).padStart(7), "indexable URLs /", String(target).padStart(7), "(" + percent + "%)",
    "·", counts[pillar as keyof typeof counts], "catalog records");
}
console.log("");
console.log("  Sitemap shards:", sitemapShards.length, "· max", SITEMAP_SHARD_SIZE.toLocaleString(), "URLs/file");

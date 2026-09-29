import { exploreGuides } from "../lib/explore";
import { explorePlaces } from "../lib/explore-places";

const errors: string[] = [];
const guideSlugs = new Set(exploreGuides.map((guide) => guide.slug));
const placeSlugs = new Set<string>();

for (const guide of exploreGuides) {
  const places = explorePlaces.filter((place) => place.guideSlug === guide.slug);
  if (places.length < 3) errors.push(`${guide.slug}: expected at least 3 mapped places, found ${places.length}`);
}

for (const place of explorePlaces) {
  if (placeSlugs.has(place.slug)) errors.push(`duplicate place slug: ${place.slug}`);
  placeSlugs.add(place.slug);
  if (!guideSlugs.has(place.guideSlug)) errors.push(`${place.slug}: unknown guide ${place.guideSlug}`);
  if (!place.address.trim()) errors.push(`${place.slug}: missing address`);
  if (!place.cost.trim()) errors.push(`${place.slug}: missing cost guidance`);
  if (!/^2026-\d{2}-\d{2}$/.test(place.checkedAt)) errors.push(`${place.slug}: invalid checkedAt`);
  if (place.kind === "restaurant" && !place.cost.includes("₦") && !/price|menu|cost/i.test(place.cost)) {
    errors.push(`${place.slug}: restaurant needs useful price/cost guidance`);
  }
  if (place.source && !place.source.href.startsWith("https://")) errors.push(`${place.slug}: source must use https`);
}

if (errors.length) {
  console.error("Explore content validation failed:\n" + errors.map((error) => "- " + error).join("\n"));
  process.exit(1);
}

console.log(`Explore content OK: ${exploreGuides.length} guides, ${explorePlaces.length} mapped places.`);

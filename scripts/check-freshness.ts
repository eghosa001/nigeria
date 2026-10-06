import { getContentHealth } from "../lib/content-health";

const health = getContentHealth();

for (const item of health.due) {
  console.warn("DUE:", item.pillar, "-", item.label, "-", item.checkedAt, "-", item.detail);
}
for (const item of health.unknown) {
  console.warn("UNKNOWN:", item.pillar, "-", item.label, "-", item.detail);
}

if (health.stale.length) {
  console.error("\nStale content requires review:");
  for (const item of health.stale) {
    console.error("-", item.pillar, "-", item.label, "-", item.checkedAt || "no date", "-", item.detail);
  }
  process.exit(1);
}

console.log("\nContent freshness OK.");
console.log("Due soon:", health.due.length);
console.log("Missing/unknown dates:", health.unknown.length);

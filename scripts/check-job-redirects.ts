import nextConfig from "../next.config";
import retiredJobRoutes from "../data/job-retired-redirects.json";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const redirectFactory = typeof nextConfig === "object" && nextConfig && "redirects" in nextConfig
  ? nextConfig.redirects
  : undefined;

assert(typeof redirectFactory === "function", "next.config.ts must expose redirects().");

const redirects = await redirectFactory();
const bySource = new Map(redirects.map((item) => [item.source, item]));

assert(new Set(retiredJobRoutes.map((item) => item.sourceSlug)).size === retiredJobRoutes.length, "Retired Jobs redirect source slugs must be unique.");
assert(retiredJobRoutes.length === 113, "Retired Jobs redirect table must preserve all 113 compatibility routes.");

for (const item of retiredJobRoutes) {
  const source = "/jobs/" + item.sourceSlug;
  const configured = bySource.get(source);
  assert(Boolean(configured), source + " is missing from next.config redirects().");
  assert(configured?.destination === item.destinationPath, source + " points to the wrong destination.");
  assert(configured?.permanent === true, source + " must be a permanent framework redirect.");
}

const moniepointAliases = [
  ["moniepoint-financial-planning-analyst-nigeria-2026", "/jobs/moniepoint-financial-planning-analyst"],
  ["moniepoint-early-careers-talent-acquisition-specialist-2026", "/jobs/moniepoint-early-careers-talent-acquisition-specialist"],
];
for (const [alias, canonical] of moniepointAliases) {
  const configured = bySource.get("/jobs/" + alias);
  assert(configured?.destination === canonical && configured.permanent === true,
    "Moniepoint duplicate alias must permanently redirect to its matching issuer requisition: " + alias);
}

const reliance = bySource.get("/jobs/reliance-health-associate-data-scientist-2026");
assert(reliance?.destination === "/jobs/reliance-health-careers", "Reliance retired vacancy redirect regression.");

console.log("Jobs redirect config check");
console.log("  retired redirects:", retiredJobRoutes.length);
console.log("  framework redirects:", redirects.length);
const dana = bySource.get("/jobs/dana-group-careers");
assert(dana?.destination === "/jobs/categories/fmcg-manufacturing", "Dana career portal must stay retired while its application route has certificate failures.");

console.log("  Reliance redirect:", reliance?.destination);
console.log("  Dana redirect:", dana?.destination);

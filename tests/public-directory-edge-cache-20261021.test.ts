import assert from "node:assert/strict";
import test from "node:test";
import config from "../next.config";

test("only safe unfiltered public hubs receive shared edge cache policies", async () => {
  assert.ok(config.headers, "Next config must define header rules");
  const rules = await config.headers();
  const shared = rules.filter((rule) =>
    rule.headers.some(({ key }) => key.toLowerCase() === "cloudflare-cdn-cache-control"),
  );
  assert.deepEqual(shared.map((rule) => rule.source).sort(),
    ["/", "/entertainment", "/entertainment/movies", "/explore", "/latest", "/services"]);

  for (const rule of shared) {
    const expected = rule.source === "/services"
      ? ["q", "category", "status", "sort", "page"]
      : rule.source === "/entertainment/movies"
        ? ["q", "platform", "genre", "sort", "page"]
        : rule.source === "/explore"
          ? ["q", "type", "city", "region", "page", "sort"]
          : ["q", "page", "search", "sort"];
    assert.deepEqual(rule.missing?.map((entry) => entry.type === "query" ? entry.key : ""), expected,
      rule.source + " must never cache filtered searches or paginated results");
    const expectedControl = rule.source === "/explore"
      ? "public, max-age=60, stale-while-revalidate=30"
      : ["/services", "/entertainment/movies"].includes(rule.source)
        ? "public, max-age=300, stale-while-revalidate=60"
        : "public, max-age=120, stale-while-revalidate=60";
    assert.equal(rule.headers.find(({ key }) => key === "Cloudflare-CDN-Cache-Control")?.value,
      expectedControl);
  }

  assert.ok(shared.every((rule) => rule.source === "/" || rule.source === "/entertainment" ||
    rule.source === "/explore" || rule.source === "/latest" || rule.source === "/services" || rule.source === "/entertainment/movies"),
    "private and parameterized routes must not receive shared CDN HTML caching");

  const admin = rules.find((rule) => rule.source === "/admin");
  const adminApi = rules.find((rule) => rule.source === "/api/admin/:path*");
  for (const rule of [admin, adminApi]) {
    assert.ok(rule?.headers.some(({ key, value }) => key === "Cache-Control" && /private, no-store/.test(value)),
      "admin and API security no-store headers must remain unchanged");
  }
  for (const rule of rules) {
    assert.ok(
      !rule.source.startsWith("/jobs") || !rule.headers.some(({ key }) => key === "Cloudflare-CDN-Cache-Control"),
      "deadline-sensitive Jobs status pages must never use this shared CDN cache policy",
    );
  }
});

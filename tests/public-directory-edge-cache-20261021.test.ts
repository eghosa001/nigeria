import assert from "node:assert/strict";
import test from "node:test";
import config from "../next.config";

test("only unfiltered public directory landing pages receive a five-minute edge cache policy", async () => {
  assert.ok(config.headers, "Next config must define header rules");
  const rules = await config.headers();
  const shared = rules.filter((rule) =>
    rule.headers.some(({ key }) => key.toLowerCase() === "cloudflare-cdn-cache-control"),
  );
  assert.deepEqual(shared.map((rule) => rule.source).sort(),
    ["/entertainment/movies", "/services"]);

  for (const rule of shared) {
    const expected = rule.source === "/services"
      ? ["q", "category", "status", "sort", "page"]
      : ["q", "platform", "genre", "sort", "page"];
    assert.deepEqual(rule.missing?.map((entry) => entry.type === "query" ? entry.key : ""), expected,
      rule.source + " must never cache filtered searches or paginated results");
    assert.equal(rule.headers.find(({ key }) => key === "Cloudflare-CDN-Cache-Control")?.value,
      "public, max-age=300, stale-while-revalidate=60");
  }

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

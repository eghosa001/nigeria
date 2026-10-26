import { expect, test } from "@playwright/test";

test("robots.txt is available as plain text on Cloudflare without a Worker metadata route", async ({ request }) => {
  const response = await request.get("/robots.txt", { failOnStatusCode: false });
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toMatch(/^text\/plain\b/i);
  const robots = await response.text();
  for (const rule of [
    "User-agent: *",
    "Disallow: /admin",
    "Disallow: /api/",
    "Sitemap: https://mynigeriaguide.com/sitemap-index.xml",
    "Sitemap: https://mynigeriaguide.com/recent-pages.xml",
    "Sitemap: https://mynigeriaguide.com/video-sitemap.xml",
  ]) {
    expect(robots).toContain(rule);
  }
  expect(robots).not.toContain("mynigeriaguide.aighewieghosa111.workers.dev");
});

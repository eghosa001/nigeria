import { test, expect } from "@playwright/test";

const cases = [
  { path: "/services/waec-collect-certificate", topic: /WAEC/i },
  { path: "/services/nysc-correct-date-of-birth", topic: /NYSC/i },
  { path: "/services/jamb-profile-code", topic: /JAMB/i },
];

test("former Soft 404 guides contain substantive primary content in initial server HTML", async ({ request }) => {
  for (const entry of cases) {
    const response = await request.get(entry.path, {
      headers: { "user-agent": "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
    });
    expect(response.status(), entry.path).toBe(200);
    expect(response.headers()["x-robots-tag"] ?? "").not.toMatch(/noindex/i);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    const mainText = main.replace(/<(?:script|style|svg)\b[^>]*>[\s\S]*?<\/(?:script|style|svg)>/gi, " ")
      .replace(/<[^>]*>/g, " ").replace(/&(?:nbsp|amp|quot|lt|gt);/gi, " ").replace(/\s+/g, " ").trim();
    expect(mainText.length, entry.path + " must not serve only the loading fallback").toBeGreaterThan(500);
    expect(mainText, entry.path).toMatch(entry.topic);
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
    expect(head, entry.path).toContain('<link rel="canonical"');
    expect(head, entry.path).not.toMatch(/<meta[^>]*name=["']robots["'][^>]*noindex/i);
  }
});

test("former Soft 404 guides display usable text on mobile and desktop", async ({ page }) => {
  for (const entry of cases) {
    const response = await page.goto(entry.path, { waitUntil: "domcontentloaded" });
    expect(response?.status(), entry.path).toBe(200);
    await expect(page.locator("main h1").first(), entry.path).toContainText(entry.topic);
    await expect(page.locator("main").first(), entry.path).not.toContainText("Opening your guide…");
  }
});

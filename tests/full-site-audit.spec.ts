import { expect, test } from "@playwright/test";
import { agencies, categories, publicServices } from "@/lib/data";
import { categorySlug } from "@/lib/category";

const staticRoutes = ["/", "/services", "/fees", "/updates", "/offices", "/saved", "/assistant", "/about", "/editorial-policy", "/corrections", "/privacy", "/terms", "/contact"];
const routes = [
  ...staticRoutes,
  ...categories.map((category) => "/categories/" + categorySlug(category.name)),
  ...agencies.map((agency) => "/agencies/" + agency.slug),
  ...publicServices.map((service) => "/services/" + service.slug),
];

test("every public route loads and has no broken internal links", async ({ page, request }) => {
  test.setTimeout(180_000);
  const checked = new Set<string>();

  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route + " status").toBeLessThan(400);
    await expect(page.locator("main#main-content")).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, route + " horizontal overflow").toBeLessThanOrEqual(1);

    const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute("href") || "").filter(Boolean),
    );

    for (const href of hrefs) {
      const path = href.split("#")[0].split("?")[0] || "/";
      if (checked.has(path)) continue;
      checked.add(path);
      const linked = await request.get(path, { failOnStatusCode: false });
      expect(linked.status(), route + " -> " + href).toBeLessThan(400);
    }
  }
});

test("primary navigation works on desktop and mobile menu states", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/");
  const navTargets = [
    ["Services", "/services"],
    ["Fees", "/fees"],
    ["Updates", "/updates"],
    ["Offices", "/offices"],
    ["Saved", "/saved"],
    ["Find a guide", "/assistant"],
  ] as const;

  for (const [label, target] of navTargets) {
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Open navigation" });
    if (await menu.isVisible()) await menu.click();
    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(target.replace("/", "\\/") + "(?:$|\\?)"));
  }
});

test("every guide is structured for a viewer completing the service", async ({ page }) => {
  test.setTimeout(180_000);
  for (const service of publicServices) {
    await page.goto("/services/" + service.slug, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Online, physical or both?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What you need" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Steps" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What exactly happens next?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Important notes" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Official sources" })).toBeVisible();
    expect(await page.locator("#steps li").count(), service.slug + " actionable steps").toBeGreaterThanOrEqual(3);
    expect(await page.locator("#requirements li").count(), service.slug + " requirements").toBeGreaterThanOrEqual(2);
    expect(await page.locator("#after-submit .aftercare-grid > div").count(), service.slug + " aftercare").toBeGreaterThanOrEqual(4);
  }
});

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
    const homeLogo = page.getByRole("link", { name: "MyNigeriaGuide home" });
    await expect(homeLogo, route + " home logo").toBeVisible();
    await expect(homeLogo, route + " home logo target").toHaveAttribute("href", "/");

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
  test.setTimeout(60_000);
  await page.goto("/");
  const navTargets = [
    ["Services", "/services"],
    ["Fees", "/fees"],
    ["Updates", "/updates"],
    ["Offices", "/offices"],
    ["Saved", "/saved"],
    ["Find a guide", "/assistant"],
  ] as const;

  const menu = page.getByRole("button", { name: "Open navigation" });
  if (await menu.isVisible()) await menu.click();
  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  for (const [label, target] of navTargets) {
    const link = nav.getByRole("link", { name: label, exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", target);
  }
  await nav.getByRole("link", { name: "Find a guide", exact: true }).click();
  await expect(page).toHaveURL(/\/assistant(?:$|\?)/);
});

test("every guide is structured for a viewer completing the service", async ({ page }) => {
  test.setTimeout(180_000);
  for (const service of publicServices) {
    await page.goto("/services/" + service.slug, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Online, physical or both?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What you need before you start" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Step-by-step instructions" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What exactly happens next?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Important notes" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Common questions" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Official sources" })).toBeVisible();

    const status = page.locator('[aria-label="Service at a glance"]');
    await expect(status, service.slug + " service summary").toBeVisible();
    expect(await status.locator(":scope > div").count(), service.slug + " summary fields").toBe(5);
    await expect(status).toContainText("Cost");
    await expect(status).toContainText("Timeline");
    await expect(status).toContainText("Route");
    await expect(status).toContainText("Agency");
    await expect(status).toContainText("Checked");

    expect(await page.locator("#steps li").count(), service.slug + " actionable steps").toBeGreaterThanOrEqual(3);
    expect(await page.locator("#requirements li").count(), service.slug + " requirements").toBeGreaterThanOrEqual(2);
    expect(await page.locator("#after-submit .aftercare-grid > div").count(), service.slug + " aftercare").toBeGreaterThanOrEqual(4);
    expect(await page.locator("#questions details").count(), service.slug + " contextual FAQs").toBeGreaterThanOrEqual(9);
    expect(await page.locator("#official-sources a").count(), service.slug + " official sources").toBeGreaterThanOrEqual(1);

    const faqText = await page.locator("#questions").innerText();
    for (const expected of ["prepare before", "online", "cost", "long", "after", "stuck", "careful", "current", "government website"]) {
      expect(faqText.toLowerCase(), service.slug + " FAQ coverage: " + expected).toContain(expected);
    }
  }
});

test("official service link is never a generic agency homepage", async ({ page }) => {
  test.setTimeout(180_000);
  const agencyHomepageHosts = new Set(agencies.map((agency) => new URL(agency.website).host));

  for (const service of publicServices) {
    await page.goto("/services/" + service.slug, { waitUntil: "domcontentloaded" });
    const links = page.locator('a.official-service-link');
    expect(await links.count(), service.slug + " official service links").toBeGreaterThanOrEqual(1);
    const hrefs = await links.evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).href));
    for (const href of hrefs) {
      const url = new URL(href);
      const isGenericAgencyHomepage = agencyHomepageHosts.has(url.host) && (url.pathname === "/" || url.pathname === "");
      expect(isGenericAgencyHomepage, service.slug + " should not use a generic agency homepage as its service CTA").toBeFalsy();
    }
  }
});

import { expect, test } from "@playwright/test";
import { agencies, categories, publicServices } from "@/lib/data";
import { categorySlug } from "@/lib/category";
import { growthHubs } from "@/lib/growth-hubs";
import { getRelatedServices } from "@/lib/internal-links";

const staticRoutes = ["/", "/services", "/fees", "/updates", "/offices", "/official-portals", "/saved", "/assistant", "/about", "/editorial-policy", "/corrections", "/privacy", "/terms", "/contact"];
const routes = [
  ...staticRoutes,
  ...categories.map((category) => "/categories/" + categorySlug(category.name)),
  ...agencies.map((agency) => "/agencies/" + agency.slug),
  ...growthHubs.map((hub) => "/topics/" + hub.slug),
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

test("every guide in a multi-guide category receives a service-to-service crawl path", () => {
  const incoming = new Map(publicServices.map((service) => [service.slug, 0]));

  for (const service of publicServices) {
    const related = getRelatedServices(service, 6);
    for (const item of related) incoming.set(item.slug, (incoming.get(item.slug) ?? 0) + 1);
  }

  for (const service of publicServices) {
    const categorySize = publicServices.filter((item) => item.category === service.category).length;
    if (categorySize > 1) {
      expect(getRelatedServices(service, 6).length, service.slug + " related guide count").toBeGreaterThan(0);
      expect(incoming.get(service.slug), service.slug + " incoming service links").toBeGreaterThan(0);
    }
  }

  for (const hub of growthHubs) {
    expect(hub.serviceSlugs.length, hub.slug + " hub size").toBeGreaterThan(1);
    for (const serviceSlug of hub.serviceSlugs) {
      expect(publicServices.some((service) => service.slug === serviceSlug), hub.slug + " -> " + serviceSlug).toBeTruthy();
    }
  }
});

test("global and section navigation work on desktop and mobile", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");

  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  const primaryNav = page.getByRole("navigation", { name: "Primary navigation" });

  if (await mobileNav.isVisible()) {
    for (const [label, target] of [
      ["Home", "/"],
      ["Services", "/services"],
      ["Explore", "/explore"],
      ["Movies", "/entertainment/movies"],
      ["Saved", "/saved"],
    ] as const) {
      const link = mobileNav.getByRole("link", { name: label, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", target);
    }
    await expect(primaryNav).toBeHidden();
    await expect(page.getByRole("link", { name: "Find a guide", exact: true })).toHaveAttribute("href", "/assistant");
  } else {
    for (const [label, target] of [
      ["Services", "/services"],
      ["Explore Nigeria", "/explore"],
      ["Entertainment", "/entertainment"],
      ["Saved", "/saved"],
      ["Find a guide", "/assistant"],
    ] as const) {
      const link = primaryNav.getByRole("link", { name: label, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", target);
    }
  }

  await page.goto("/services");
  const serviceNav = page.getByRole("navigation", { name: "Services guide navigation" });
  for (const [label, target] of [
    ["Fees", "/fees"],
    ["Offices", "/offices"],
    ["Official portals", "/official-portals"],
    ["Updates", "/updates"],
  ] as const) {
    await expect(serviceNav.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", target);
  }

  await page.goto("/");
  if (await page.getByRole("navigation", { name: "Mobile navigation" }).isVisible()) {
    await page.getByRole("link", { name: "Find a guide", exact: true }).click();
  } else {
    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Find a guide", exact: true }).click();
  }
  await expect(page).toHaveURL(/\/assistant(?:$|\?)/);
});

test("admin workspace exposes the full content operation areas", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "Admin access required" })).toBeVisible();
  await page.getByLabel("Admin passphrase").fill("qa-only-passphrase");
  await page.getByRole("button", { name: "Unlock admin" }).click();
  const adminNav = page.getByRole("navigation", { name: "Admin navigation" });
  await expect(adminNav.getByRole("link", { name: "Dashboard" })).toBeVisible();
  await expect(adminNav.getByRole("link", { name: "Guides" })).toBeVisible();
  await expect(adminNav.getByRole("link", { name: "Foreign visas" })).toBeVisible();
  await expect(adminNav.getByRole("link", { name: "Visits" })).toBeVisible();
  await expect(adminNav.getByRole("link", { name: "Sources" })).toBeVisible();
  await expect(adminNav.getByRole("link", { name: "Updates" })).toBeVisible();

  await page.goto("/admin/foreign-visas");
  expect(await page.locator(".admin-visa-grid > a").count()).toBeGreaterThanOrEqual(14);

  await page.goto("/admin/services");
  await expect(page.getByRole("heading", { name: "All service guides" })).toBeVisible();
  await expect(page.locator(".admin-guide-table")).toBeVisible();

  await page.goto("/admin/sources");
  await expect(page.getByRole("heading", { name: "Official source registry" })).toBeVisible();
  expect(await page.locator(".admin-source-registry > a").count()).toBeGreaterThan(20);

  await page.goto("/admin/visits");
  await expect(page.getByRole("heading", { name: "Visits & page views" })).toBeVisible();
  await expect(page.locator(".admin-analytics-state, .analytics-metric-grid").first()).toBeVisible();
});

test("foreign visas are directly discoverable without using search", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Foreign visas/i }).first()).toBeVisible();

  await page.goto("/categories/foreign-visas");
  await expect(page.getByRole("heading", { name: "Where are you travelling to?" })).toBeVisible();
  expect(await page.locator(".visa-country-grid a").count()).toBeGreaterThanOrEqual(14);

  await page.goto("/services");
  await expect(page.locator(".service-category-nav a.featured")).toContainText("Foreign visas");
});

test("every guide is structured for a viewer completing the service", async ({ page }) => {
  test.setTimeout(180_000);
  for (const service of publicServices) {
    await page.goto("/services/" + service.slug, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Online, physical or both?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Documents, details and prerequisites you need" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Step-by-step instructions" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What exactly happens next?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Important notes" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Common questions" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Official sources" })).toBeVisible();

    const pageTitle = await page.title();
    expect(pageTitle.length, service.slug + " metadata title too short").toBeGreaterThanOrEqual(30);
    expect(pageTitle.length, service.slug + " metadata title too long").toBeLessThanOrEqual(60);

    const status = page.locator('[aria-label="Service at a glance"]');
    await expect(status, service.slug + " service summary").toBeVisible();
    expect(await status.locator(":scope > div").count(), service.slug + " summary fields").toBe(5);
    await expect(status).toContainText("Cost");
    await expect(status).toContainText("Timeline");
    await expect(status).toContainText("Route");
    await expect(status).toContainText("Agency");
    await expect(status).toContainText("Checked");

    expect(await page.locator("#steps .detailed-step").count(), service.slug + " detailed actionable steps").toBe(service.steps.length);
    expect(await page.locator("#requirements .requirement-detail-card").count(), service.slug + " detailed requirements").toBe(service.requirements.length);
    await expect(page.locator("#steps .detailed-step").first()).toContainText("Check before moving on");
    await expect(page.locator("#steps .detailed-step").first()).toContainText("Keep as evidence");
    await expect(page.locator("#requirements .requirement-detail-card").first()).toContainText("Why you need it");
    await expect(page.locator("#requirements .requirement-detail-card").first()).toContainText("Original, copy or upload?");
    expect(await page.locator("#after-submit .aftercare-grid > div").count(), service.slug + " aftercare").toBeGreaterThanOrEqual(4);
    expect(await page.locator("#questions details").count(), service.slug + " contextual FAQs").toBeGreaterThanOrEqual(9);
    if (service.category === "Foreign visas") {
      await expect(page.getByRole("heading", { name: "Visa questions Nigerians commonly need answered" })).toBeVisible();
      expect(await page.locator("#foreign-visa-questions details").count(), service.slug + " foreign visa FAQ depth").toBeGreaterThanOrEqual(7);
    }
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

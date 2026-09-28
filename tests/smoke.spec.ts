import { expect, test } from "@playwright/test";

test("plain-language search finds the right service", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("What do you want to do?").fill("my passport expired");
  await expect(page.locator(".search-results").getByRole("link", { name: /Passport renewal/i })).toBeVisible();
});

test("directory supports deep-linked category filters", async ({ page }) => {
  await page.goto("/services?category=Education");
  await expect(page.getByLabel("Category")).toHaveValue("Education");
  await expect(page.getByRole("heading", { name: /JAMB|WAEC|NECO/i }).first()).toBeVisible();
});

test("service guides expose trust and sharing actions", async ({ page }) => {
  await page.goto("/services/passport-renewal");
  await expect(page.getByText("Verified", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Share" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Watch this guide" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Official sources" })).toBeVisible();
});

test("watching a guide persists on the device", async ({ page }) => {
  await page.goto("/services/passport-renewal");
  await page.getByRole("button", { name: "Watch this guide" }).click();
  await page.goto("/saved");
  await expect(page.getByRole("heading", { name: "Passport renewal" })).toBeVisible();
});

test("fee directory and category pages are discoverable", async ({ page }) => {
  await page.goto("/fees");
  await expect(page.getByRole("heading", { name: "Nigeria government fees and service charges" })).toBeVisible();
  await page.getByLabel("Search fees").fill("passport");
  await expect(page.getByRole("listitem").filter({ hasText: "Passport renewal" }).first()).toBeVisible();

  await page.goto("/categories/education");
  await expect(page.getByRole("heading", { name: "Education services in Nigeria" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /JAMB|WAEC|NECO/i }).first()).toBeVisible();
});

test("verified updates link back to affected guides and official sources", async ({ page }) => {
  await page.goto("/updates");
  await expect(page.getByRole("heading", { name: "Verified government service updates" })).toBeVisible();
  await expect(page.getByText("JAMB confirms no increase in 2026 UTME registration fees")).toBeVisible();
  await expect(page.getByRole("link", { name: /2026 JAMB registration/i }).first()).toBeVisible();
});

test("health endpoint reports the published catalog", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.status).toBe("ok");
  expect(body.publicGuides).toBeGreaterThanOrEqual(76);
});

test("core pages do not overflow horizontally", async ({ page }) => {
  for (const path of ["/", "/services", "/fees", "/updates", "/categories/education", "/services/passport-renewal", "/offices", "/assistant"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path + " horizontal overflow").toBeLessThanOrEqual(1);
  }
});

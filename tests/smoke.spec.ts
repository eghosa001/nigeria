import { expect, test } from "@playwright/test";

test("plain-language search finds the right service", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("What do you want to do?").fill("my passport expired");
  await expect(page.getByRole("link", { name: /Passport renewal/i })).toBeVisible();
});

test("directory filters verified services", async ({ page }) => {
  await page.goto("/services");
  await page.getByLabel("Category").selectOption("Education");
  await expect(page.getByText(/guide(s)? shown/)).toBeVisible();
  await expect(page.getByRole("heading", { name: /JAMB|WAEC|NECO/i }).first()).toBeVisible();
});

test("service guides expose trust and sharing actions", async ({ page }) => {
  await page.goto("/services/passport-renewal");
  await expect(page.getByText("Verified", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Share" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Watch this guide" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Official sources" })).toBeVisible();
});

test("core pages do not overflow horizontally", async ({ page }) => {
  for (const path of ["/", "/services", "/services/passport-renewal", "/offices", "/assistant"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path + " horizontal overflow").toBeLessThanOrEqual(1);
  }
});

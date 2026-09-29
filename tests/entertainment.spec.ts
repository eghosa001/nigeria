import { expect, test } from "@playwright/test";

test("entertainment catalog supports multiple official platforms", async ({ page }) => {
  await page.goto("/entertainment/movies");
  await expect(page.locator(".service-card")).toHaveCount(10);
  await page.getByLabel("Where to watch").selectOption("Prime Video");
  await expect(page.locator(".service-card")).toHaveCount(1);
});

test("movie detail exposes watch and trailer links", async ({ page }) => {
  await page.goto("/entertainment/movies/anikulapo");
  await expect(page.getByRole("heading", { name: "Aníkúlápó" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Watch on Netflix/ })).toHaveAttribute("href", /netflix\.com/);
  await expect(page.getByRole("link", { name: /official trailer/i }).first()).toHaveAttribute("href", /youtube\.com/);
});

test("cinema and releases guides expose official source routes", async ({ page }) => {
  await page.goto("/entertainment/cinemas");
  await expect(page.getByRole("heading", { name: /Find showtimes/ })).toBeVisible();
  await expect(page.getByText("Filmhouse Cinemas")).toBeVisible();

  await page.goto("/entertainment/releases");
  await expect(page.getByText("Ordinary People")).toBeVisible();
  await expect(page.getByText("After Credits Club — First Edition")).toBeVisible();
});


test("movie artwork is withheld until rights are cleared", async ({ page }) => {
  await page.goto("/entertainment/movies/anikulapo");
  await expect(page.locator('[data-rights-status="pending"]')).toBeVisible();
  await expect(page.getByText("No cleared artwork yet.")).toBeVisible();
});

import { expect, test } from "@playwright/test";

test("entertainment catalog supports multiple official platforms", async ({ page }) => {
  await page.goto("/entertainment/movies");
  await expect(page.locator(".service-card")).toHaveCount(24);
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


test("movie cards show a short description and featured cast", async ({ page }) => {
  await page.goto("/entertainment/movies?q=Jagun%20Jagun");
  const card = page.locator(".service-card").first();
  await expect(card).toContainText("young man joins an elite warrior school");
  await expect(card).toContainText("Featuring:");
  await expect(card).toContainText("Femi Adebayo");
  await expect(card).toContainText("Lateef Adedimeji");
});

test("expanded catalog includes verified Nigerian Netflix titles", async ({ page }) => {
  await page.goto("/entertainment/movies?q=House%20of%20Ga");
  await expect(page.getByText("House of Ga'a", { exact: true })).toBeVisible();
  await expect(page.getByText("Femi Branch", { exact: false })).toBeVisible();
});


test("youtube movie directory is populated from approved channels", async ({ page }) => {
  await page.goto("/entertainment/youtube");
  await expect(page.getByRole("heading", { name: /Nigerian movies on official YouTube channels/i })).toBeVisible();
  await expect(page.getByText("Omoni Oboli TV", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Maurice Sam TV", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Uche Montana TV", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Love in Every Word", { exact: true })).toBeVisible();
  await expect(page.getByText("The Long Way Home", { exact: true })).toBeVisible();
});


test("youtube source network is sized for more than one thousand movies", async ({ page }) => {
  await page.goto("/entertainment/youtube/sources");
  await expect(page.getByRole("heading", { name: /Approved YouTube movie sources/i })).toBeVisible();
  await expect(page.getByText(/1,2\d{2}\+/)).toBeVisible();
  await expect(page.getByText("RuthKadiri247", { exact: true })).toBeVisible();
  await expect(page.getByText("Uchenna Mbunabo TV", { exact: true })).toBeVisible();
  await expect(page.getByText("Omoni Oboli TV", { exact: true })).toBeVisible();
});

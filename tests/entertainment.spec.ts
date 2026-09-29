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
  await expect(page.getByRole("link", { name: /Watch on Netflix/ }).first()).toHaveAttribute("href", /netflix\.com/);
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
  await expect(page.getByRole("link", { name: "House of Ga'a", exact: true }).first()).toBeVisible();
  await expect(page.getByText("Femi Branch", { exact: false })).toBeVisible();
});


test("youtube movie directory is populated from approved channels", async ({ page }) => {
  await page.goto("/entertainment/youtube");
  await expect(page.getByRole("heading", { name: /Nigerian movies from approved YouTube publishers/i })).toBeVisible();
  await expect(page.locator(".service-card")).toHaveCount(48);
  await expect(page.locator(".category-summary")).toContainText("published YouTube movies");
  const publisher = page.getByLabel("Publisher");
  await expect(publisher.locator('option[value="Omoni Oboli TV"]')).toHaveCount(1);
  await expect(publisher.locator('option[value="Maurice Sam TV"]')).toHaveCount(1);
  await expect(publisher.locator('option[value="Uche Montana TV"]')).toHaveCount(1);
});


test("youtube source network is sized for more than one thousand movies", async ({ page }) => {
  await page.goto("/entertainment/youtube/sources");
  await expect(page.getByRole("heading", { name: /Approved YouTube movie sources/i })).toBeVisible();
  await expect(page.getByText(/\d{1,3},\d{3}\+/)).toBeVisible();
  await expect(page.getByText("RuthKadiri247", { exact: true })).toBeVisible();
  await expect(page.getByText("Uchenna Mbunabo TV", { exact: true })).toBeVisible();
  await expect(page.getByText("Omoni Oboli TV", { exact: true })).toBeVisible();
});


test("main movies page exposes the full server-paginated YouTube library", async ({ page }) => {
  await page.goto("/entertainment/movies");
  const summary = page.locator(".category-summary");
  await expect(summary).toContainText(/\d{1,3},\d{3}/);
  await expect(summary).toContainText("full YouTube movies");
  await expect(page.getByRole("link", { name: /Browse the full YouTube movie library/i })).toHaveAttribute("href", "/entertainment/youtube");
});


test("legitimate movie titles beginning with Welcome remain searchable", async ({ page }) => {
  await page.goto("/entertainment/youtube?q=Welcome%20to%20Nigeria");
  await expect(page.getByText("WELCOME TO NIGERIA", { exact: true }).first()).toBeVisible();
  await expect(page.locator(".service-card").first()).toContainText("OLUCHI AFUNDU TV");
});


test("quota-free recovered movie metadata stays clean", async ({ page }) => {
  await page.goto("/entertainment/youtube?q=Private%20Equity");
  const card = page.locator(".service-card").first();
  await expect(card).toContainText("PRIVATE EQUITY");
  await expect(card).toContainText("FRANCESS NWABUNIKE");
  await expect(card).toContainText("Oby Titus");
  await expect(card).not.toContainText("#ruthkadiri");
});

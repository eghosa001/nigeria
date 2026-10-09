import { expect, test } from "@playwright/test";

test("GSC-priority snippets and four-pillar discovery stay useful", async ({ page }) => {
  await page.goto("/entertainment/movies/oversabi-aunty");
  await expect(page).toHaveTitle(/Oversabi Aunty Cast, Trailer & Netflix Status/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /FilmOne trailer.*Netflix Nigeria/);
  await expect(page.getByText(/FilmOne link is an official trailer, not a free full-movie/)).toBeVisible();
  await expect(page.getByText(/No currently playable Nigerian streaming option has been independently verified/)).toBeVisible();
  await page.goto("/services/cac-business-name-registration");
  await expect(page).toHaveTitle(/CAC Business Name Registration: Fees & Online Steps/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/services\/cac-business-name-registration$/);
  await expect(page.getByRole("link", { name: /Need a limited company instead/ })).toHaveAttribute("href", "/services/cac-company-registration");

  // Existing service canonicals expand verified long-tail query coverage.
  for (const [path, title, question] of [
    ["/services/anambra-asin-registration", /Anambra ASIN Registration: Get Your Number Online/, /Which ASIN registration option should I choose/],
    ["/services/passport-application-tracking", /Track Nigerian Passport Application: NIS Status/, /track my Nigerian passport application with only my NIN/],
    ["/services/ninauth-nin-verification", /NIN Sharecode: Generate & Verify with NINAuth/, /What is a NIN Sharecode and how is it different/],
  ] as const) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.getByRole("heading", { name: question })).toBeVisible();
  }

  await page.goto("/services/nigeria-landing-exit-card");
  await expect(page.getByRole("heading", { name: /Do Nigerian passport holders need a Landing or Exit Card/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /NIS LECARD frequently asked questions/ })).toHaveAttribute("href", "https://lecard.immigration.gov.ng/faq");

  await page.goto("/explore/calabar-carnival-2026");
  await expect(page).toHaveTitle(/Calabar Carnival 2026: Parade Dates/);
  await expect(page.getByText(/Three-day headline visit, 27–29 December/)).toBeVisible();

  await page.goto("/jobs/nigerian-army-92rri-2026");
  await expect(page.getByText(/Special Skilled route separately advertises ages 18–35/)).toBeVisible();
  await expect(page.getByRole("link", { name: /official NIN Sharecode guide/ })).toHaveAttribute("href", "/services/ninauth-nin-verification");

  await page.goto("/entertainment/movies/pieces-that-fit");
  await expect(page.getByText(/A job with an architect coping with grief/)).toBeVisible();

  await page.goto("/jobs/plan-international-nigeria-careers");
  const jobDescription = await page.locator('meta[name="description"]').getAttribute("content");
  expect(jobDescription?.length ?? 0).toBeGreaterThan(75);
  expect(jobDescription?.length ?? 0).toBeLessThanOrEqual(155);

  await page.goto("/");
  for (const href of [
    "/explore/calabar-carnival-2026",
    "/explore/detty-december-lagos-2026",
    "/jobs/nigerian-army-92rri-2026",
    "/jobs/remote",
  ]) {
    await expect(page.locator('a[href="' + href + '"]').first()).toBeVisible();
  }
});

import { expect, test } from "@playwright/test";

test("GSC-priority snippets and four-pillar discovery stay useful", async ({ page }) => {
  await page.goto("/entertainment/movies/oversabi-aunty");
  await expect(page).toHaveTitle(/Oversabi Aunty Cast & Where to Watch/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Toyin Abraham.*Netflix/);

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

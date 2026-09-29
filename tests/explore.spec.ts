import { expect, test } from "@playwright/test";

test("homepage exposes the platform pillars", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "What do you want to do in Nigeria?" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Tour Guide/ })).toHaveAttribute("href", "/explore");
  await expect(page.getByText("Entertainment Guide")).toBeVisible();
});

test("Explore Nigeria hub and city guide are navigable", async ({ page }) => {
  await page.goto("/explore");
  await expect(page.getByRole("heading", { name: /Plan the trip/ })).toBeVisible();
  await page.getByRole("link", { name: /Lagos/ }).first().click();
  await expect(page).toHaveURL(/\/explore\/lagos$/);
  await expect(page.getByRole("heading", { name: "Lagos Travel Guide" })).toBeVisible();
});

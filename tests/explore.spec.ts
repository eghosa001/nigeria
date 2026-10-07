import { expect, test } from "@playwright/test";
import { exploreGuides } from "@/lib/explore";

test("homepage exposes movies, services, tour and jobs as primary paths", async ({ page }) => {
  await page.goto("/");
  const paths = page.locator(".home-paths .home-path");
  await expect(paths).toHaveCount(4);
  await expect(paths.nth(0)).toContainText("Movies");
  await expect(paths.nth(0)).toHaveAttribute("href", "/entertainment/movies");
  await expect(paths.nth(1)).toContainText("Services");
  await expect(paths.nth(1)).toHaveAttribute("href", "/services");
  await expect(paths.nth(2)).toContainText("Tour Nigeria");
  await expect(paths.nth(2)).toHaveAttribute("href", "/explore");
  await expect(paths.nth(3)).toContainText("Jobs & Careers");
  await expect(paths.nth(3)).toHaveAttribute("href", "/jobs");
});

test("Tour Nigeria covers all 36 states and FCT", async ({ page }) => {
  const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa",
    "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
    "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
  ];

  for (const state of states) {
    expect(exploreGuides.some((guide) => guide.region.toLowerCase().includes(state.toLowerCase())), state).toBeTruthy();
  }
  expect(exploreGuides.some((guide) => guide.region === "Federal Capital Territory")).toBeTruthy();

  await page.goto("/explore");
  await page.getByText("States & FCT").click();
  const index = page.getByRole("navigation", { name: "Explore Nigeria by state" });
  await expect(index.getByRole("link")).toHaveCount(37);
  await expect(index.getByRole("link", { name: "FCT Abuja" })).toHaveAttribute("href", "/explore/abuja");
});


test("Explore Nigeria hub and city guide are navigable", async ({ page }) => {
  await page.goto("/explore");
  await expect(page.getByRole("heading", { name: "Find where to go." })).toBeVisible();
  await page.getByText("City guides").click();
  await page.locator('a[href="/explore/lagos"]').first().click();
  await expect(page).toHaveURL(/\/explore\/lagos$/);
  await expect(page.getByRole("heading", { name: "Lagos Travel Guide" })).toBeVisible();
});


test("travel directory exposes addresses, costs and Google Maps links", async ({ page }) => {
  await page.goto("/explore");
  const search = page.getByLabel("Search places");
  await search.fill("BluCabana");
  const card = page.locator(".explore-place-card").filter({ hasText: "BluCabana Restaurant & Cafe" });
  await expect(card).toBeVisible();
  await expect(card).toContainText("1322 Shehu Yar'Adua Way");
  await expect(card).toContainText("₦7,000");
  await expect(card.getByRole("link", { name: /Google Maps/ })).toHaveAttribute("href", /google\.com\/maps\/search/);
});

test("city guide keeps place verification and map actions visible", async ({ page }) => {
  await page.goto("/explore/lagos");
  await expect(page.getByRole("heading", { name: "Places to visit, eat & stay." })).toBeVisible();
  const nok = page.locator("#place-nok-by-alara");
  await expect(nok).toContainText("₦45,000–₦70,000");
  await expect(nok.getByRole("link", { name: /Open in Google Maps/ })).toHaveAttribute("target", "_blank");
  await expect(nok).toContainText("Checked 2026-09-29");
});



test("Ondo highlights expands with new map-ready coastal and nature places", async ({ page }) => {
  await page.goto("/explore/ondo-state-highlights");
  for (const id of ["place-araromi-seaside", "place-ebomi-lake-ipesi", "place-igbokoda-waterfront-ondo"]) {
    const card = page.locator("#" + id);
    await expect(card).toBeVisible();
    await expect(card.getByRole("link", { name: /Open in Google Maps/ })).toHaveAttribute("href", /google\.com\/maps\/search/);
    await expect(card).toContainText("Checked 2026-09-29");
  }
});

test("travel directory exposes the expanded Ondo place records", async ({ page }) => {
  await page.goto("/explore");
  const search = page.getByLabel("Search places");

  for (const place of ["Araromi Seaside", "Ebomi Lake", "Igbokoda Waterfront"]) {
    await search.fill(place);
    await expect(page.locator(".explore-place-card").filter({ hasText: place })).toBeVisible();
  }
});


test("national landmarks guide reuses verified place records", async ({ page }) => {
  await page.goto("/explore/nigeria-landmarks-places-to-visit");
  await expect(page.getByRole("heading", { name: "Landmarks & Places to Visit in Nigeria" })).toBeVisible();
  for (const id of ["place-olumo-rock", "place-osun-osogbo-sacred-grove", "place-yankari-game-reserve-main", "place-zuma-rock"]) {
    const card = page.locator("#" + id);
    await expect(card).toBeVisible();
    await expect(card.getByRole("link", { name: /Open in Google Maps/ })).toHaveAttribute("href", /google\.com\/maps\/search/);
  }
});


test("Tour hub stays compact and keeps deep navigation available", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/explore");

  await expect(page.locator(".explore-place-card")).toHaveCount(6);
  await expect(page.locator(".tour-browse-stack > details")).toHaveCount(4);

  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport + 1);

  await page.getByRole("button", { name: "Show 6 more places" }).click();
  await expect(page.locator(".explore-place-card")).toHaveCount(12);

  await page.getByText("States & FCT").click();
  await expect(page.getByRole("navigation", { name: "Explore Nigeria by state" }).getByRole("link")).toHaveCount(37);
});


test("African Creators guide uses event-specific venue data", async ({ page }) => {
  await page.goto("/explore/african-creators-conference-abuja-2026");
  const venue = page.locator("#place-abuja-trade-convention-centre-creators-2026");
  await expect(venue).toContainText("African Creators Conference 2.0");
  await expect(page.locator("#places")).not.toContainText("CEA Nigeria");
});

test("Tour guide secondary detail is progressively disclosed", async ({ page }) => {
  await page.goto("/explore/lagos");
  expect(await page.locator(".compact-faq-list > details").count()).toBeGreaterThan(0);
  expect(await page.locator(".explore-place-card details.explore-place-more").count()).toBeGreaterThan(0);
});


test("new Abuja event guides keep venue-aware planning", async ({ page }) => {
  await page.goto("/explore/abuja-study-abroad-expo-2026");
  await expect(page.locator("#place-transcorp-hilton-study-abroad-expo-2026")).toContainText("Transcorp Hilton");

  await page.goto("/explore/legacy-building-conference-abuja-2026");
  await expect(page.locator("#place-novare-central-legacy-conference-2026")).toContainText("Novare Central");
});


test("evergreen destination guides reuse verified mapped place records", async ({ page }) => {
  for (const [route, placeId] of [
    ["/explore/lekki-conservation-centre-guide", "place-lekki-conservation-centre"],
    ["/explore/olumo-rock-visitor-guide", "place-olumo-rock"],
    ["/explore/jabi-lake-abuja-guide", "place-jabi-lake-abuja"],
    ["/explore/osun-osogbo-sacred-grove-guide", "place-osun-osogbo-sacred-grove"],
  ] as const) {
    await page.goto(route);
    await expect(page.locator("#" + placeId)).toBeVisible();
    await expect(page.locator("#" + placeId).getByRole("link", { name: /Open in Google Maps/ })).toHaveAttribute("href", /google\.com\/maps\/search/);
  }
});

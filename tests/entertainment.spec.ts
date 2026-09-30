import { expect, test } from "@playwright/test";

test("entertainment catalog supports multiple official platforms", async ({ page }) => {
  await page.goto("/entertainment/movies");
  await expect(page.locator(".movie-tile")).toHaveCount(30);
  await page.getByLabel("Platform").selectOption("Prime Video");
  const primeResults = page.locator(".movie-tile");
  expect(await primeResults.count()).toBeGreaterThanOrEqual(1);
  await expect(page.getByRole("link", { name: "A Tribe Called Judah", exact: true }).first()).toBeVisible();
});

test("movie detail exposes watch and trailer links", async ({ page }) => {
  await page.goto("/entertainment/movies/anikulapo");
  await expect(page.getByRole("heading", { name: "Aníkúlápó", exact: true })).toBeVisible();
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


test("every curated movie uses a rights-safe visual strategy", async ({ page }) => {
  await page.goto("/entertainment/movies/anikulapo");
  await expect(page.locator(".movie-detail-artwork [data-artwork-source]").first()).toBeVisible();

  await page.goto("/entertainment/movies/chief-daddy");
  await expect(page.locator(".movie-detail-artwork [data-artwork-source]").first()).toBeVisible();
  await expect(page.locator(".entertainment-artwork-placeholder")).toHaveCount(0);
});


test("movie cards show a short description and featured cast", async ({ page }) => {
  await page.goto("/entertainment/movies?q=Jagun%20Jagun");
  const card = page.locator(".movie-tile").first();
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
  await expect(page.locator(".youtube-movie-card")).toHaveCount(48);
  await expect(page.locator(".movie-stat-cluster")).toHaveCount(0);
  const publisher = page.getByLabel("Publisher");
  await expect(publisher.locator('option[value="Omoni Oboli TV"]')).toHaveCount(1);
  await expect(publisher.locator('option[value="Maurice Sam TV"]')).toHaveCount(1);
  await expect(publisher.locator('option[value="Uche Montana TV"]')).toHaveCount(1);
});


test("youtube source page focuses on approved publishers instead of catalog size", async ({ page }) => {
  await page.goto("/entertainment/youtube/sources");
  await expect(page.getByRole("heading", { name: /Approved YouTube movie sources/i })).toBeVisible();
  await expect(page.locator(".category-summary")).toHaveCount(0);
  await expect(page.getByText("RuthKadiri247", { exact: true })).toBeVisible();
  await expect(page.getByText("Uchenna Mbunabo TV", { exact: true })).toBeVisible();
  await expect(page.getByText("Omoni Oboli TV", { exact: true })).toBeVisible();
});


test("main movies page leads with movies without catalog-size statistics", async ({ page }) => {
  await page.goto("/entertainment/movies");
  await expect(page.locator(".movie-stat-cluster")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Find something worth watching." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Browse all free movies/i })).toHaveAttribute("href", "/entertainment/youtube");
});


test("legitimate movie titles beginning with Welcome remain searchable", async ({ page }) => {
  await page.goto("/entertainment/youtube?q=Welcome%20to%20Nigeria");
  await expect(page.getByText("WELCOME TO NIGERIA", { exact: true }).first()).toBeVisible();
  await expect(page.locator(".youtube-movie-card").first()).toContainText("OLUCHI AFUNDU TV");
});


test("quota-free recovered movie metadata stays clean", async ({ page }) => {
  await page.goto("/entertainment/youtube?q=Private%20Equity");
  const card = page.locator(".youtube-movie-card").first();
  await expect(card).toContainText("PRIVATE EQUITY");
  await expect(card).toContainText("FRANCESS NWABUNIKE");
  await expect(card).toContainText("Oby Titus");
  await expect(card).not.toContainText("#ruthkadiri");
});


test("movie browse page is image-led and exposes several titles at once", async ({ page }) => {
  await page.goto("/entertainment/movies");
  await expect(page.locator(".youtube-movie-card")).toHaveCount(10);
  await expect(page.locator(".youtube-movie-card img").first()).toHaveAttribute("src", /i\.ytimg\.com\/vi\/.*\/mqdefault\.jpg/);
  await expect(page.locator(".movie-tile")).toHaveCount(30);
  await expect(page.locator(".movie-tile .entertainment-artwork[data-artwork-source]")).toHaveCount(30);
  await expect(page.locator(".entertainment-artwork-placeholder")).toHaveCount(0);
});

test("youtube catalog renders thumbnails in a dense movie grid", async ({ page }) => {
  await page.goto("/entertainment/youtube");
  await expect(page.locator(".youtube-movie-card")).toHaveCount(48);
  await expect(page.locator(".youtube-movie-card img").first()).toHaveAttribute("src", /i\.ytimg\.com\/vi\/.*\/mqdefault\.jpg/);
  await expect(page.locator(".youtube-movie-card").first()).toContainText("YouTube");
});


test("youtube pagination uses crawlable path URLs and filtered pages stay separate", async ({ page }) => {
  await page.goto("/entertainment/youtube");
  await expect(page.getByRole("link", { name: "Next →" })).toHaveAttribute("href", "/entertainment/youtube/page/2");

  await page.goto("/entertainment/youtube/page/2");
  await expect(page.getByText(/Page 2 of/)).toBeVisible();
  await expect(page.getByRole("link", { name: "← Previous" })).toHaveAttribute("href", "/entertainment/youtube");

  await page.goto("/entertainment/youtube?q=Private%20Equity");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
});

test("latest hub links all three platform pillars", async ({ page }) => {
  await page.goto("/latest");
  await expect(page.getByRole("heading", { name: /Recently added and updated/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Movies", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Services", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tour Nigeria", exact: true })).toBeVisible();
});


test("every visible curated movie has a poster-format visual", async ({ page }) => {
  await page.goto("/entertainment/movies");
  const posters = page.locator(".movie-tile .entertainment-artwork[data-poster-guaranteed='true']");
  await expect(posters).toHaveCount(30);
  const box = await posters.first().boundingBox();
  expect(box).not.toBeNull();
  expect(box!.height).toBeGreaterThan(box!.width * 1.3);
});

test("duplicate approved uploads are surfaced only with identity evidence", async ({ page }) => {
  await page.goto("/entertainment/youtube/32k-gIzh4aQ");
  await expect(page.getByText("Alternate official source", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open alternate official source/i })).toHaveAttribute(
    "href",
    "https://www.youtube.com/watch?v=b9CapDAe6UE",
  );

  await page.goto("/entertainment/movies/plus-one");
  await expect(page.getByText("Maurice Sam TV", { exact: false })).toHaveCount(0);
});

test("official platform cards explain legal offline viewing instead of third-party downloads", async ({ page }) => {
  await page.goto("/entertainment/movies/anikulapo");
  await expect(page.getByText(/downloaded in the Netflix app for offline viewing/i)).toBeVisible();
  await expect(page.getByText(/does not link to third-party movie-download mirrors/i)).toBeVisible();
});


test("verified Netflix trailers enrich existing movie posters without new routes", async ({ page }) => {
  for (const slug of ["citation", "house-of-gaa", "hijack-93", "amina"]) {
    await page.goto("/entertainment/movies/" + slug);
    await expect(page.locator(".movie-detail-artwork [data-artwork-source='youtube']")).toBeVisible();
    await expect(page.locator(".movie-detail-artwork").getByText("Preview: AfricaOnNetflix", { exact: true })).toBeVisible();
  }
});


test("licensed third-party Kava titles use existing movie routes and offline guidance", async ({ page }) => {
  await page.goto("/entertainment/movies?platform=Kava");
  await expect(page.getByRole("link", { name: "Big Love", exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Okanjuwa", exact: true }).first()).toBeVisible();

  await page.goto("/entertainment/movies/big-love");
  await expect(page.getByRole("link", { name: /Watch on Kava/ }).first()).toHaveAttribute("href", "https://watch.kava.tv/big-love");
  await expect(page.getByText(/Kava supports downloading eligible titles/i)).toBeVisible();
});


test("movie source cards distinguish licensed third-party streaming", async ({ page }) => {
  await page.goto("/entertainment/movies/big-love");
  await expect(page.getByText("Licensed third-party streaming", { exact: true })).toBeVisible();

  await page.goto("/entertainment/platforms");
  await expect(page.getByRole("heading", { name: "Kava", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "NolliStream", exact: true })).toBeVisible();
  await expect(page.getByText(/offline downloads inside its app/i)).toBeVisible();
});


test("second Kava batch is discoverable through existing movie routes", async ({ page }) => {
  await page.goto("/entertainment/movies?platform=Kava");
  for (const title of ["Ijakumo", "Iyalode", "Love in a Pandemic", "The Cartel"]) {
    await expect(page.getByRole("link", { name: title, exact: true }).first()).toBeVisible();
  }

  await page.goto("/entertainment/movies/ijakumo");
  await expect(page.getByRole("link", { name: /Watch on Kava/ }).first()).toHaveAttribute("href", "https://watch.kava.tv/ijakumo");
});

test("expanded people profiles cross-link the growing movie catalog", async ({ page }) => {
  await page.goto("/entertainment/people/toyin-abraham");
  await expect(page.getByRole("link", { name: "Ijakumo", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Iyalode", exact: true })).toBeVisible();

  await page.goto("/entertainment/people/timini-egbuson");
  await expect(page.getByRole("link", { name: "Ajosepo", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Love and New Notes", exact: true })).toBeVisible();
});


test("people profiles self-enrich from catalog credits and expose Person schema", async ({ page }) => {
  await page.goto("/entertainment/people/toyin-abraham");
  await expect(page.getByRole("heading", { name: /connected titles in MyNigeriaGuide/i })).toBeVisible();
  await expect(page.getByText(/automatically expands with the person's matching cast or directing credits/i)).toBeVisible();
  await expect(page.getByRole("link", { name: "Ijakumo", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ghost and the Tout", exact: true })).toBeVisible();

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schemas.some((value) => value.includes('"@type":"Person"') && value.includes('"name":"Toyin Abraham"'))).toBeTruthy();
});

test("people profile credits grow from cast data beyond manually seeded titles", async ({ page }) => {
  await page.goto("/entertainment/people/nancy-isime");
  await expect(page.getByRole("link", { name: "Love in a Pandemic", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Teni's Big Day", exact: true })).toBeVisible();
  await expect(page.getByText(/Current legal availability across these records is tracked on/i)).toBeVisible();
});

test("new curated YouTube movie batch exposes official full-movie sources", async ({ page }) => {
  for (const [slug, title, href] of [
    ["sibe", "Sibe", "https://www.youtube.com/watch?v=HAk97psM9h0"],
    ["millionaire-until-morning", "Millionaire Until Morning", "https://www.youtube.com/watch?v=pG_962LtEf8"],
    ["monica", "Monica", "https://www.youtube.com/watch?v=-yVrN03f610"],
    ["fruit-covenant", "Fruit Covenant", "https://www.youtube.com/watch?v=OLmUOAjZqOg"],
    ["bowale", "Bowale", "https://www.youtube.com/watch?v=GrxitJ4fHT8"],
  ] as const) {
    await page.goto("/entertainment/movies/" + slug);
    await expect(page.getByRole("heading", { level: 1, name: title, exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Watch the full movie on YouTube/i }).first()).toHaveAttribute("href", href);
    await expect(page.locator(".movie-detail-artwork [data-artwork-source='youtube']")).toBeVisible();
  }
});

test("curated YouTube records resolve to one canonical movie URL", async ({ page, request }) => {
  await page.goto("/entertainment/youtube/HAk97psM9h0");
  await expect(page).toHaveURL(/\/entertainment\/movies\/sibe$/);

  const youtubeSitemap = await request.get("/sitemaps/youtube.xml");
  expect(youtubeSitemap.ok()).toBeTruthy();
  expect(await youtubeSitemap.text()).not.toContain("/entertainment/youtube/HAk97psM9h0");

  const movieSitemap = await request.get("/sitemaps/movies.xml");
  expect(movieSitemap.ok()).toBeTruthy();
  expect(await movieSitemap.text()).toContain("/entertainment/movies/sibe");
});



test("curated movie catalog exposes crawlable internal pagination", async ({ page, request }) => {
  await page.goto("/entertainment/movies");
  const pagination = page.getByRole("navigation", { name: "Curated movie catalog pages" });
  await expect(pagination.getByRole("link", { name: "Next →" })).toHaveAttribute("href", "/entertainment/movies/page/2");

  await page.goto("/entertainment/movies/page/2");
  await expect(page.locator(".movie-tile")).toHaveCount(30);
  await expect(page.getByRole("link", { name: "← Previous" })).toHaveAttribute("href", "/entertainment/movies");

  const sitemap = await request.get("/sitemaps/movies.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("/entertainment/movies/page/2");
});

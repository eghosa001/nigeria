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

test("cinema and releases guides stay focused on useful visitor information", async ({ page }) => {
  await page.goto("/entertainment/cinemas");
  await expect(page.getByRole("heading", { name: /Find cinemas, showtimes and booking links/i })).toBeVisible();
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


test("youtube movie directory is populated and searchable by publisher", async ({ page }) => {
  await page.goto("/entertainment/youtube");
  await expect(page.getByRole("heading", { name: /Full Nigerian movies on YouTube/i })).toBeVisible();
  await expect(page.locator(".youtube-movie-card")).toHaveCount(48);
  await expect(page.locator(".movie-stat-cluster")).toHaveCount(0);
  const publisher = page.getByLabel("Publisher");
  await expect(publisher.locator('option[value="Omoni Oboli TV"]')).toHaveCount(1);
  await expect(publisher.locator('option[value="Maurice Sam TV"]')).toHaveCount(1);
  await expect(publisher.locator('option[value="Uche Montana TV"]')).toHaveCount(1);
});


test("policy-only entertainment routes are not part of the public experience", async ({ page, request }) => {
  await page.goto("/entertainment/youtube");
  await expect(page.getByRole("link", { name: "Approved sources", exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Image policy", exact: true })).toHaveCount(0);

  const sourcePage = await request.get("/entertainment/youtube/sources");
  expect(sourcePage.status()).toBe(404);
  const imagePolicyPage = await request.get("/entertainment/image-rights");
  expect(imagePolicyPage.status()).toBe(404);
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

test("latest hub links all four platform pillars", async ({ page }) => {
  await page.goto("/latest");
  await expect(page.getByRole("heading", { name: /What is new and worth checking now/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Movies", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Services", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tour Nigeria", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Jobs & Careers", exact: true })).toBeVisible();
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

test("movie pages keep useful offline viewing information without policy copy", async ({ page }) => {
  await page.goto("/entertainment/movies/anikulapo");
  await expect(page.getByText(/downloaded in the Netflix app for offline viewing/i)).toBeVisible();
  await expect(page.getByText(/does not link to third-party movie-download mirrors/i)).toHaveCount(0);
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


test("platform pages keep useful Kava and NolliStream viewing information", async ({ page }) => {
  await page.goto("/entertainment/movies/big-love");
  await expect(page.getByRole("link", { name: /Watch on Kava/ }).first()).toBeVisible();

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
  await expect(page.getByRole("heading", { name: "Titles featuring Toyin Abraham." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ijakumo", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ghost and the Tout", exact: true })).toBeVisible();

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schemas.some((value) => value.includes('"@type":"Person"') && value.includes('"name":"Toyin Abraham"'))).toBeTruthy();
});

test("people profile credits grow from cast data beyond manually seeded titles", async ({ page }) => {
  await page.goto("/entertainment/people/nancy-isime");
  await expect(page.getByRole("heading", { name: "Titles featuring Nancy Isime." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Love in a Pandemic", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Teni's Big Day", exact: true })).toBeVisible();
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


test("contextual entertainment detail pages expose country and source dates", async ({ page }) => {
  await page.goto("/entertainment/series/ordinary-people");
  await expect(page.getByText(/Applies to Nigeria .* availability and sources checked/i)).toBeVisible();
  await expect(page.locator(".movie-fact-grid")).toContainText("Sources checked");

  await page.goto("/entertainment/youtube/32k-gIzh4aQ");
  const facts = page.locator(".movie-fact-grid");
  await expect(facts).toContainText("Country");
  await expect(facts).toContainText("Nigeria");
  await expect(facts).toContainText("Source checked");
});


test("incomplete YouTube discoveries stay out of public movie catalogs", async ({ page }) => {
  for (const path of ["/entertainment/movies", "/entertainment/youtube"]) {
    await page.goto(path);
    await expect(page.getByText("Cast details pending verification", { exact: true })).toHaveCount(0);
  }
});

test("movie detail keeps long secondary content compact", async ({ page }) => {
  await page.goto("/entertainment/movies/anikulapo");
  expect(await page.locator(".compact-faq-list > details").count()).toBeGreaterThan(0);
});


test("GSC movie opportunities get canonical intent-complete detail pages", async ({ page }) => {
  for (const [slug, title, href] of [
    ["long-enough-2026", "Long Enough", "https://www.youtube.com/watch?v=y2RkBwUYSvo"],
    ["terms-of-attraction-2026", "Terms of Attraction", "https://www.youtube.com/watch?v=2XzPBjsVOTk"],
    ["forever-yours-2026", "Forever Yours", "https://www.youtube.com/watch?v=_KFL0VJYJBc"],
  ] as const) {
    await page.goto("/entertainment/movies/" + slug);
    await expect(page.getByRole("heading", { level: 1, name: title, exact: true })).toBeVisible();
    await expect(page).toHaveTitle(/Cast & Full Movie/);
    await expect(page.getByRole("link", { name: /Watch the full movie/i }).first()).toHaveAttribute("href", href);
    await expect(page.getByText("Can I watch " + title + " full movie on YouTube?", { exact: true })).toBeVisible();
    await expect(page.getByText("What is " + title + " about?", { exact: true })).toBeVisible();
  }
});

test("movie pages expose repeatable high-intent answers across the catalog", async ({ page }) => {
  await page.goto("/entertainment/movies/oversabi-aunty");
  await expect(page.getByText("Who is in the Oversabi Aunty cast?", { exact: true })).toBeVisible();
  await expect(page.getByText("What is Oversabi Aunty about?", { exact: true })).toBeVisible();
  await expect(page.getByText("Where can I watch Oversabi Aunty?", { exact: true })).toBeVisible();
  await expect(page.getByText("Is Oversabi Aunty a Nigerian movie?", { exact: true })).toBeVisible();
  await expect(page.getByText("Is Oversabi Aunty on Netflix?", { exact: true })).toBeVisible();
});


test("second GSC movie wave promotes ranking YouTube pages to canonical movie guides", async ({ page }) => {
  for (const [slug, title, videoId] of [
    ["for-richer-for-poorer-2026", "For Richer, For Poorer", "CvNE-FaF4EY"],
    ["lost-connection-2026", "Lost Connection", "DhTG5hSFUvw"],
    ["the-kings-matchmaker-2026", "The King's Matchmaker", "cQGpDcqQKso"],
    ["oil-and-water-2025", "Oil and Water", "5Xcj2t3DzfI"],
    ["unusual-love-2024", "Unusual Love", "ilb-K3vUXp8"],
  ] as const) {
    await page.goto("/entertainment/movies/" + slug);
    await expect(page.getByRole("heading", { level: 1, name: title, exact: true })).toBeVisible();
    await expect(page).toHaveTitle(/Cast & Full Movie/);
    await expect(page.getByText("Who is in the " + title + " cast?", { exact: true })).toBeVisible();
    await expect(page.getByText("Where can I watch " + title + "?", { exact: true })).toBeVisible();

    await page.goto("/entertainment/youtube/" + videoId);
    await expect(page).toHaveURL(new RegExp("/entertainment/movies/" + slug + "$"));
  }
});

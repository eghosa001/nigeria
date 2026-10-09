const base = (process.env.CRAWL_BASE_URL || process.env.LIVE_BASE_URL || "https://mynigeriaguide.com").replace(/\/$/, "");

const checks = [
  ["/robots.txt", /sitemap\.xml/i],
  ["/sitemap.xml", /sitemaps\/youtube\.xml/i],
  ["/sitemaps/core.xml", /<urlset/i],
  ["/sitemaps/services.xml", /services\/passport-renewal/i],
  ["/sitemaps/travel.xml", /explore\/lagos/i],
  ["/sitemaps/movies.xml", /entertainment\/movies\/anikulapo/i],
  ["/sitemaps/youtube.xml", /entertainment\/youtube\/page\/2/i],
  ["/entertainment/youtube/page/2", /Page 2 of/i],
  ["/latest", /Recently added and updated/i],
  // Regression canaries: Google previously recorded transient 5xx on these
  // four URLs. Curated duplicates intentionally remain browseable, noindex,
  // and canonicalised to their original movie profiles.
  ["/entertainment/youtube/GrxitJ4fHT8", /Bowale/i],
  ["/entertainment/youtube/q5Vg0jUMl-s", /Never Let Go/i],
  ["/entertainment/youtube/ORIBBpN7YMs", /What Love Is/i],
  ["/entertainment/youtube/negcmBrWxm0", /A Turn of Events/i],
  // Google also reported a historical soft-404 for the interactive finder.
  ["/assistant", /Find the right Nigerian government service guide/i],
  ["/entertainment/movies/pieces-that-fit", /Pieces That Fit/i],
];

for (const [path, expected] of checks) {
  const started = Date.now();
  const response = await fetch(base + path, {
    headers: { "user-agent": "MyNigeriaGuide crawl resilience check" },
    redirect: "follow",
  });
  const body = await response.text();
  const elapsed = Date.now() - started;
  if (!response.ok) throw new Error(path + " returned HTTP " + response.status);
  if (!expected.test(body)) throw new Error(path + " did not contain the expected crawl signal");
  if (/Worker exceeded resource limits|Error 1102/i.test(body)) throw new Error(path + " returned a Cloudflare Worker resource failure");
  console.log(path, response.status, elapsed + "ms");
}

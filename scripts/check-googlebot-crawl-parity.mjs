import { pathToFileURL } from "node:url";

// Four already-published, canonical guides. These are crawl canaries, not
// claims that a successful probe guarantees Google rankings or indexing.
export const CRAWL_CANARIES = [
  "/entertainment/series/afobaje-2026",
  "/services/ican-professional-exam-registration",
  "/explore/calabar",
  "/jobs/nigerian-army-92rri-2026",
];

const USER_AGENTS = {
  browser: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
  googlebotLike: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
};

function attr(tag, name) {
  const match = tag.match(new RegExp("\\b" + name + "\\s*=\\s*([\"'])(.*?)\\1", "i"));
  return match?.[2] ?? null;
}

export function validateIndexableHtml({ status, headers, html, canonical, requireHeadMetadata = false }) {
  if (status !== 200) throw new Error("Expected HTTP 200; received " + status);
  const xRobots = headers.get("x-robots-tag") ?? "";
  if (/\bnoindex\b/i.test(xRobots)) throw new Error("X-Robots-Tag contains noindex");
  if (/Worker exceeded resource limits|Error 1102/i.test(html)) {
    throw new Error("Cloudflare Worker resource failure in HTML");
  }
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  if (requireHeadMetadata && head === undefined) throw new Error("Missing HTML head");
  // Next.js streams metadata outside <head> for ordinary browsers, but
  // sends it in <head> to recognised HTML-limited search crawlers.
  const metadata = requireHeadMetadata ? head : html;
  const metas = [...metadata.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  if (metas.some((tag) => /^(robots|googlebot)$/i.test(attr(tag, "name") ?? "") &&
      /\bnoindex\b/i.test(attr(tag, "content") ?? ""))) {
    throw new Error("Robots meta tag contains noindex");
  }
  const canonicalTags = [...metadata.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((tag) => (attr(tag, "rel") ?? "").toLowerCase() === "canonical");
  if (canonicalTags.length !== 1) {
    throw new Error("Expected one canonical link; received " + canonicalTags.length);
  }
  const declaredCanonical = attr(canonicalTags[0], "href");
  if (declaredCanonical !== canonical) {
    throw new Error("Wrong canonical: " + declaredCanonical + " (expected " + canonical + ")");
  }
  const title = metadata.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) throw new Error("Missing HTML title");
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  if (!h1) throw new Error("Missing visible H1");
  return {
    title,
    canonical: declaredCanonical,
    heading: h1.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
  };
}

export function assertSamePageIdentity(a, b, label) {
  if (a.title !== b.title || a.canonical !== b.canonical || a.heading !== b.heading) {
    throw new Error(label + ": mismatched title, canonical or H1 in ordinary vs fresh HTML");
  }
}

async function fetchWithRetry(url, userAgent) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        // Test the actual ordinary response; no-cache hides stale CDN entries.
        headers: { "user-agent": userAgent },
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
      });
      const html = await response.text();
      if (response.status >= 500 && attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 800));
        continue;
      }
      return { status: response.status, headers: response.headers, html, finalUrl: response.url };
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 800));
    }
  }
  throw lastError ?? new Error("Repeated HTTP 5xx responses");
}

export async function auditLive(base = process.env.LIVE_BASE_URL || "https://mynigeriaguide.com") {
  const origin = base.replace(/\/$/, "");
  for (const path of CRAWL_CANARIES) {
    const canonical = origin + path;
    const results = {};
    for (const [agent, value] of Object.entries(USER_AGENTS)) {
      const response = await fetchWithRetry(canonical, value);
      if (response.finalUrl !== canonical) {
        throw new Error(path + " " + agent + ": unexpected redirect to " + response.finalUrl);
      }
      try {
        results[agent] = validateIndexableHtml({ ...response, canonical, requireHeadMetadata: true });
      } catch (error) {
        throw new Error(path + " " + agent + ": " + error.message, { cause: error });
      }
      console.log(path, agent, "HTTP 200, indexable, canonical verified");
    }
    assertSamePageIdentity(results.browser, results.googlebotLike, path + " browser vs Googlebot");

    // Compare the unmodified, possibly cached canonical URL with a fresh
    // query on the same route. Do not submit probe URLs to search engines.
    const freshUrl = canonical + "?__mng_seo_crawl_probe=" + Date.now();
    const fresh = await fetchWithRetry(freshUrl, USER_AGENTS.googlebotLike);
    if (fresh.finalUrl !== freshUrl) {
      throw new Error(path + ": unexpected fresh probe redirect to " + fresh.finalUrl);
    }
    const freshIdentity = validateIndexableHtml({ ...fresh, canonical, requireHeadMetadata: true });
    assertSamePageIdentity(results.googlebotLike, freshIdentity, path + " cached vs fresh");
    console.log(path, "ordinary and fresh Googlebot metadata match");
  }
  console.log("Four-pillar canonical cache and crawler parity passed. This is not a Google indexing or ranking verdict.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await auditLive();
}

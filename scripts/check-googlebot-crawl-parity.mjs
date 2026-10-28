import { pathToFileURL } from "node:url";

// Four already-published, canonical guides. These are crawl canaries, not
// claims that a successful probe guarantees Google rankings or indexing.
export const CRAWL_CANARIES = [
  "/entertainment/series/afobaje-2026",
  "/services/ican-professional-exam-registration",
  "/explore/calabar",
  "/jobs/nigerian-army-92rri-2026",
];

// The 27 Oct Design Week regression (#726) served obsolete booking advice
// at the normal URL while a fresh query showed an ended-event archive. Its
// title, H1 and canonical could still match, so metadata-only checks miss it.
export const CONTENT_FRESHNESS_CANARIES = [
  {
    path: "/explore/design-week-lagos-2026",
    required: [
      "18–25 October 2026 dates have passed",
      "Do not pay through an old event-ticket link",
    ],
    forbidden: [
      "Which hall date should you book?",
      "Register with the official event partner",
    ],
  },
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

export function getArticleText(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (!main) throw new Error("Missing visible <main> article content");

  const toText = (fragment) => fragment
    .replace(/<(?:script|style|template|svg)\b[^>]*>[\s\S]*?<\/(?:script|style|template|svg)>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(#x[0-9a-f]+|#[0-9]+|amp|lt|gt|quot|apos|nbsp|ndash|mdash|rsquo|lsquo);/gi, (_, entity) => {
      const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘" };
      if (!entity.startsWith("#")) return named[entity.toLowerCase()] ?? " ";
      const hex = entity[1].toLowerCase() === "x";
      const value = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return value > 0 && value <= 0x10ffff ? String.fromCodePoint(value) : " ";
    })
    .replace(/\s+/g, " ")
    .trim();

  let visible = toText(main[1]);
  if (visible.length < 100) {
    // React streams a resolved Suspense subtree into <div hidden id="S:0">
    // outside <main>, then moves it into the placeholder <template id="B:0">
    // with $RC. Parsing only initial <main> sees "Opening your guide…" and
    // incorrectly declares the fully server-rendered article missing.
    const pending = main[1].match(/<template\b[^>]*\bid=(["'])B:(\d+)\1/i);
    if (pending) {
      const match = [...html.matchAll(/<div\b[^>]*\bid=(["'])S:(\d+)\1[^>]*>/gi)]
        .find((segment) => segment[2] === pending[2]);
      if (!match) throw new Error("Unresolved streamed article boundary B:" + pending[2]);
      // All bytes were fetched before this check; scripts and serialization
      // are removed from the content comparison, not executed by the crawler.
      visible = toText(html.slice(match.index + match[0].length));
    }
  }
  if (visible.length < 100) throw new Error("Missing substantial server-rendered article text");
  return visible;
}

export function assertSameArticleContent(canonicalHtml, freshHtml, label) {
  if (getArticleText(canonicalHtml) !== getArticleText(freshHtml)) {
    throw new Error(label + ": stale article body differs between canonical and fresh HTML");
  }
}

export function assertFreshnessSignals(html, label, { required, forbidden }) {
  const visible = getArticleText(html);
  for (const phrase of required) {
    if (!visible.includes(phrase)) throw new Error(label + ": missing verified current copy: " + phrase);
  }
  for (const phrase of forbidden) {
    if (visible.includes(phrase)) throw new Error(label + ": obsolete public copy still served: " + phrase);
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
    let responseForBot;
    for (const [agent, value] of Object.entries(USER_AGENTS)) {
      const response = await fetchWithRetry(canonical, value);
      if (response.finalUrl !== canonical) {
        throw new Error(path + " " + agent + ": unexpected redirect to " + response.finalUrl);
      }
      try {
        results[agent] = validateIndexableHtml({ ...response, canonical, requireHeadMetadata: true });
        if (agent === "googlebotLike") responseForBot = response;
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
    assertSameArticleContent(responseForBot.html, fresh.html, path + " canonical vs fresh");
    console.log(path, "ordinary and fresh Googlebot metadata and article copy match");
  }
  for (const marker of CONTENT_FRESHNESS_CANARIES) {
    const canonical = origin + marker.path;
    const ordinary = await fetchWithRetry(canonical, USER_AGENTS.googlebotLike);
    if (ordinary.finalUrl !== canonical) throw new Error(marker.path + ": unexpected canonical redirect");
    validateIndexableHtml({ ...ordinary, canonical, requireHeadMetadata: true });
    assertFreshnessSignals(ordinary.html, marker.path + " canonical", marker);
    const freshUrl = canonical + "?__mng_seo_crawl_probe=" + Date.now();
    const fresh = await fetchWithRetry(freshUrl, USER_AGENTS.googlebotLike);
    if (fresh.finalUrl !== freshUrl) throw new Error(marker.path + ": fresh probe redirect");
    validateIndexableHtml({ ...fresh, canonical, requireHeadMetadata: true });
    assertFreshnessSignals(fresh.html, marker.path + " fresh", marker);
    assertSameArticleContent(ordinary.html, fresh.html, marker.path);
    console.log(marker.path, "ended-event canonical is accurate and article content matches fresh response");
  }
  console.log("Four-pillar crawler and content freshness passed. This is not a Google indexing or ranking verdict.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await auditLive();
}

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
  const match = tag.match(new RegExp("\b" + name + "\s*=\s*([\"'])(.*?)\\1", "i"));
  return match?.[2] ?? null;
}

export function validateIndexableHtml({ status, headers, html, canonical }) {
  if (status !== 200) throw new Error("Expected HTTP 200; received " + status);
  const xRobots = headers.get("x-robots-tag") ?? "";
  if (/\bnoindex\b/i.test(xRobots)) throw new Error("X-Robots-Tag contains noindex");
  if (/Worker exceeded resource limits|Error 1102/i.test(html)) {
    throw new Error("Cloudflare Worker resource failure in HTML");
  }
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? html;
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  if (metas.some((tag) => /^(robots|googlebot)$/i.test(attr(tag, "name") ?? "") &&
      /\bnoindex\b/i.test(attr(tag, "content") ?? ""))) {
    throw new Error("Robots meta tag contains noindex");
  }
  const canonicalTags = [...head.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((tag) => (attr(tag, "rel") ?? "").toLowerCase() === "canonical");
  if (canonicalTags.length !== 1) {
    throw new Error("Expected one canonical link; received " + canonicalTags.length);
  }
  const declaredCanonical = attr(canonicalTags[0], "href");
  if (declaredCanonical !== canonical) {
    throw new Error("Wrong canonical: " + declaredCanonical + " (expected " + canonical + ")");
  }
  const title = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) throw new Error("Missing HTML title");
  if (!/<h1\b/i.test(html)) throw new Error("Missing visible H1");
  return { title, canonical: declaredCanonical };
}

async function fetchWithRetry(url, userAgent) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": userAgent, "cache-control": "no-cache" },
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
        results[agent] = validateIndexableHtml({ ...response, canonical });
      } catch (error) {
        throw new Error(path + " " + agent + ": " + error.message, { cause: error });
      }
      console.log(path, agent, "HTTP 200, indexable, canonical verified");
    }
    if (results.browser.title !== results.googlebotLike.title) {
      throw new Error(path + ": title differs between browser and Googlebot-like user agents");
    }
  }
  console.log("Four-pillar crawler parity passed. This is not a Google indexing or ranking verdict.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await auditLive();
}

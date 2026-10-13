/**
 * Only notify IndexNow about published URL changes.
 * State is persisted by GitHub Actions cache, not on the website.
 */
import { canonicalPageUrls } from "./indexnow-sitemap.mjs";

export function selectIndexNowChanges(records, site, previous = null, changedPaths = [], forceAll = false) {
  const origin = new URL(site).origin;
  const allowed = new Set(canonicalPageUrls(records.map((item) => item.url), origin));
  const current = Object.fromEntries(
    records.filter((item) => {
      try { return allowed.has(new URL(item.url).href); } catch { return false; }
    }).map((item) => [new URL(item.url).href, item.lastModified || ""]),
  );
  // A damaged or foreign state must not be trusted to suppress submissions.
  const old = previous?.version === 1 && previous?.origin === origin &&
    previous.pages && typeof previous.pages === "object" && !Array.isArray(previous.pages)
    ? previous.pages : {};
  const forced = new Set();
  for (const path of changedPaths) {
    // Static route code changes must be reported even when lastmod is absent.
    const matched = /^app\/(.*\/)?page\.tsx$/.exec(path);
    if (!matched || /[\[\]()@]/.test(matched[1] || "")) continue;
    const route = "/" + (matched[1] || "").replace(/\/$/, "");
    forced.add(origin + (route === "/" ? "" : route));
  }
  const changed = Object.keys(current).filter((url) =>
    forceAll || !Object.hasOwn(old, url) || old[url] !== current[url] || forced.has(url));
  const removed = Object.keys(old).filter((url) => !Object.hasOwn(current, url) &&
    canonicalPageUrls([url], origin).length === 1);
  return {
    changed, removed, unchanged: Object.keys(current).length - changed.length,
    snapshot: { version: 1, origin, pages: current },
  };
}

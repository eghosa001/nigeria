// Only links introduced or changed in the current PR are network-checked.
// This protects the owner-mandated fast path: no site-wide crawling, no
// 1000-link CI sweep, and no repeated testing of unchanged catalogue links.
import { execFileSync } from "node:child_process";

const base = process.env.BASE_SHA?.trim();
if (!base || !/^[a-f0-9]{7,40}$/.test(base)) {
  console.error("Set BASE_SHA to the PR base commit SHA.");
  process.exit(2);
}
// API-generated YouTube snapshots are checked by the scoped catalogue validator.
// Network-checking the entire generated archive is redundant and can exceed CI
// timeout; still check every newly published editorial/source link elsewhere.
const checkedPaths = [
  "app", "lib", "data",
  ":(exclude)data/youtube-channel-cache.json",
  ":(exclude)data/youtube-movies.generated.json",
  ":(exclude)data/youtube-movies-review.generated.json",
  ":(exclude)data/youtube-detail-shards",
];
const text = execFileSync("git", ["diff", "--unified=0", base, "HEAD", "--", ...checkedPaths], {
  encoding: "utf8",
  maxBuffer: 10 * 1024 * 1024,
});
const added = text.split("\n").filter((line) => line.startsWith("+") && !line.startsWith("+++"));
const found = new Set();
for (const line of added) {
  for (const match of line.matchAll(/https:\/\/[^"'\s<>\\)]+/g)) {
    const url = match[0].replace(/[.,;:\}\]]+$/, "");
    try {
      const parsed = new URL(url);
      if (!["https:"].includes(parsed.protocol)) continue;
      if (parsed.hostname === "example.com" || parsed.hostname.endsWith(".example")) continue;
      found.add(url);
    } catch { /* A non-URL in prose is not an external destination. */ }
  }
}
const oldPaths = [
  "https://www.dstv.com/africamagic/en-ng",
  "https://issakaba.com/"
];
const forbidden = [...found].filter((url) => oldPaths.some((old) => url === old || url.startsWith(old + "/")));
if (forbidden.length) {
  console.error("Unverified obsolete destination(s): " + forbidden.join(", "));
  process.exit(1);
}
const queue = [...found];
const failures = [];
const warnings = [];
let passed = 0;
async function check(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MyNigeriaGuide-LinkCheck/1.0)", "Accept": "text/html,application/pdf,*/*;q=0.8" },
      signal: AbortSignal.timeout(12000),
    });
    try {
      if (response.status === 404 || response.status === 410) {
        failures.push(url + " — HTTP " + response.status);
      } else if (response.status >= 400) {
        warnings.push(url + " — HTTP " + response.status + "; requires separate browser review");
      } else {
        passed += 1;
        const actual = new URL(response.url);
        const original = new URL(url);
        if (actual.pathname === "/" && original.pathname.length > 20 && actual.origin !== original.origin) {
          warnings.push(url + " — redirects to a different site's homepage; review whether the original resource still exists");
        }
      }
    } finally {
      try { await response.body?.cancel(); } catch {}
    }
  } catch (error) {
    const e = error instanceof Error ? error : new Error(String(error));
    const code = e.cause?.code ?? e.code;
    if (["ENOTFOUND", "ERR_TLS_CERT_ALTNAME_INVALID", "CERT_HAS_EXPIRED"].includes(code)) {
      failures.push(url + " — " + code);
    } else {
      warnings.push(url + " — " + (code ?? e.message) + "; could not establish availability");
    }
  }
}
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    if (url) await check(url);
  }
}
await Promise.all(Array.from({ length: Math.min(4, queue.length) }, () => worker()));
console.log("New/changed external links: " + found.size + "; reachable: " + passed + "; warnings: " + warnings.length + "; definitive failures: " + failures.length);
for (const warning of warnings) console.warn("Review link:", warning);
for (const failure of failures) console.error("Broken link:", failure);
if (failures.length) process.exit(1);

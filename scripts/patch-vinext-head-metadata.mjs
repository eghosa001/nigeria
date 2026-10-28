import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_TARGET = path.resolve("node_modules/vinext/dist/server/streaming-metadata.js");
const MARKER = "MyNigeriaGuide: force head metadata for empty-User-Agent cache regeneration";

// Vinext 1.0.0-beta.11: background regeneration without a User-Agent can
// cache a page with its title/canonical/robots metadata in <body>. Combined
// with htmlLimitedBots: /.*/ in next.config.ts, this targeted patch makes
// every response render SEO metadata in <head> instead.
// Upstream: cloudflare/vinext#3435. Remove after a verified dependency upgrade.
export function patchVinextMetadata(target = DEFAULT_TARGET) {
  if (!fs.existsSync(target)) {
    throw new Error("Vinext compiled metadata module missing: " + target);
  }
  const source = fs.readFileSync(target, "utf8");
  if (source.includes(MARKER)) {
    if (!source.includes("if (!userAgent) return false;")) {
      throw new Error("Metadata patch marker exists but expected safe branch is absent.");
    }
    return "already-patched";
  }
  const match = /if\s*\(!userAgent\)\s*return true\s*;/g;
  const occurrences = [...source.matchAll(match)].length;
  if (occurrences !== 1) {
    throw new Error("Vinext streaming metadata implementation changed; refuse unsafe patch (matches=" + occurrences + ")");
  }
  const updated = source.replace(match, "/* " + MARKER + " */\n  if (!userAgent) return false;");
  fs.writeFileSync(target, updated);
  return "patched";
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log("Vinext head-metadata cache safeguard:", patchVinextMetadata());
}

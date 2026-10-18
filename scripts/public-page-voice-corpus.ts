/**
 * Locate additional visitor-facing text in public App Router pages.
 * This is a lightweight source-code inventory, not an HTML renderer or a
 * claim that all JSX/conditional text is visible. Dynamic catalogue prose
 * is collected separately in lib/editorial-voice-corpus.ts.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import type { VoiceRecord } from "../lib/editorial-voice-corpus";

const excludedSegments = new Set(["api", "admin", "login", "auth", "sitemap", "robots", "_not-found"]);
function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const files: string[] = [];
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    if (item.name.startsWith("_") || excludedSegments.has(item.name)) continue;
    const full = join(dir, item.name);
    if (item.isDirectory()) files.push(...walk(full));
    else if (item.name === "page.tsx") files.push(full);
  }
  return files;
}
function fromRoute(path: string): string {
  const segments = relative("app", path).replace(/\\/g, "/").split("/");
  segments.pop();
  return "/" + segments.filter(s => !!s && !(s.startsWith("(") && s.endsWith(")"))).join("/");
}
function pillar(url: string): VoiceRecord["pillar"] {
  if (url.startsWith("/jobs")) return "Jobs & Careers";
  if (url.startsWith("/explore")) return "Tour Nigeria";
  if (url.startsWith("/entertainment")) return "Movies & Entertainment";
  if (url.startsWith("/services") || url.startsWith("/agencies") || url.startsWith("/official-portals")) return "Services";
  return "Shared Pages";
}
export function collectPublicPageVoice(): VoiceRecord[] {
  return walk("app").flatMap(path => {
    const url = fromRoute(path);
    const code = readFileSync(path, "utf8");
    const candidates = [
      ...[...code.matchAll(/>\s*([^<>{}\n]{23,}?)\s*</g)].map(match => match[1].trim()),
      ...[...code.matchAll(/\bdescription:\s*"([^"\n]{24,})"/g)].map(match => match[1].trim()),
    ].filter(text => text.length >= 24 && !/^(?:import|export|const|return|className|https?:\/\/)/.test(text));
    if (!candidates.length) return [];
    return [{
      pillar: pillar(url),
      kind: "public-page-static",
      url,
      title: "Static public-page prose: " + url,
      prose: candidates.join("\n\n"),
      fields: candidates.length,
    }];
  });
}

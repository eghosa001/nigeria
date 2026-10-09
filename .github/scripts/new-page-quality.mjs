// Focused, dependency-free PR gate for NEW publishable URL records and route files.
// Quality/editorial authority: docs/PUBLISHING_STANDARD.md; this catches objective regressions,
// not truthfulness, licensing, original authorship, indexing, UX quality or publisher approval.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const today = new Date().toISOString().slice(0, 10);
const errors = [];
const checked = [];
const quote = String.raw`["'\x60]`;
const newRecord = new RegExp("\\{\\s*slug\\s*:\\s*" + quote + "([a-z0-9][a-z0-9-]*)" + quote, "g");

function fileAt(base, path) {
  try { return execFileSync("git", ["show", base + ":" + path], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 40e6 }); }
  catch { return ""; }
}
function current(path) { return readFileSync(path, "utf8"); }
export function classify(path) {
  if (/^data\/services[^/]*\.json$/.test(path)) return "service";
  if (/^data\/youtube-detail-shards\/\d+\.json$/.test(path)) return "youtube";
  if (/^lib\/(?:explore-growth-wave|explore-trend-events|explore\.ts)/.test(path)) return "tour";
  if (/^lib\/(?:explore-growth-places|explore-trend-event-places)/.test(path)) return "place";
  if (/^lib\/(?:entertainment-growth-wave|entertainment\.ts|series\.ts)/.test(path)) return "movie";
  if (/^lib\/(?:job-growth-wave|job-trend-programmes|job-scale-wave|jobs\.ts)/.test(path)) return "job";
  if (/^app\/(?:.+\/)?page\.tsx$/.test(path)) return "route";
  return null;
}
function balancedObject(source, opening) {
  let depth = 0, state = "", escape = false;
  for (let i = opening; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (state === "line") { if (c === "\n") state = ""; continue; }
    if (state === "block") { if (c === "*" && n === "/") { state = ""; i++; } continue; }
    if (state) {
      if (escape) { escape = false; continue; }
      if (c === "\\") { escape = true; continue; }
      if (c === state) state = "";
      continue;
    }
    if (c === "/" && n === "/") { state = "line"; i++; continue; }
    if (c === "/" && n === "*") { state = "block"; i++; continue; }
    if (c === '"' || c === "'" || c === String.fromCharCode(96)) { state = c; continue; }
    if (c === "{") depth++;
    if (c === "}" && --depth === 0) return source.slice(opening, i + 1);
  }
  return "";
}
export function recordsFromSource(source, type) {
  if (type === "service" || type === "youtube") {
    const parsed = JSON.parse(source || (type === "service" ? "[]" : "{}"));
    const list = type === "youtube" ? (parsed.movies || []) : parsed;
    if (!Array.isArray(list)) throw new Error("Service catalog must be an array");
    return new Map(list.filter((r) => r && typeof r.slug === "string").map((r) => [r.slug, r]));
  }
  const results = new Map();
  for (const match of source.matchAll(newRecord)) {
    const value = balancedObject(source, match.index);
    if (value) results.set(match[1], value);
  }
  return results;
}
function value(record, key) {
  if (typeof record === "object") return record[key];
  const regex = new RegExp("(?:^|[,{\\n])\\s*" + key + "\\s*:\\s*([\\x22\\x27\\x60])([^\\n]*?)\\1");
  return record.match(regex)?.[2] || "";
}
function list(record, key) {
  if (typeof record === "object") return Array.isArray(record[key]) ? record[key] : [];
  const match = record.match(new RegExp("(?:^|[,{\\n])\\s*" + key + "\\s*:\\s*\\[([\\s\\S]*?)\\]", "m"));
  return match ? [...match[1].matchAll(/["']([^"']{3,})["']/g)].map((m) => m[1]) : [];
}
function hasHttps(record, field) {
  if (typeof record === "object") {
    const entry = record[field];
    if (typeof entry === "string") return entry.startsWith("https://");
    if (Array.isArray(entry)) return entry.some((x) => typeof x?.url === "string" && x.url.startsWith("https://") || typeof x?.href === "string" && x.href.startsWith("https://"));
    return Boolean(entry && (entry.url?.startsWith("https://") || entry.href?.startsWith("https://")));
  }
  if (field === "officialUrl" || field === "officialPortal") return value(record, field).startsWith("https://");
  if (field === "source") return /source\s*:\s*\{[\s\S]*?\bhref\s*:\s*["']https:\/\//.test(record);
  return new RegExp(field + "\\s*:\\s*(?:\\[|\\{)[\\s\\S]*?(?:url|href)\\s*:\\s*[\"']https:\\/\\/").test(record);
}
function checkedDate(record, key) {
  const date = value(record, key);
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && date <= today;
}
function recordText(record) { return typeof record === "string" ? record : JSON.stringify(record); }
function assert(ok, path, slug, reason) {
  if (!ok) errors.push(path + " [" + slug + "]: " + reason);
}
export function checkRecord(path, kind, slug, record) {
  const local = [];
  const warn = (ok, reason) => { if (!ok) local.push(reason); };
  const text = recordText(record);
  const heading = value(record, "title") || value(record, "name");
  const summary = value(record, kind === "movie" || kind === "youtube" ? "synopsis" : "summary");
  warn(heading.length >= 8, "specific title/name required");
  warn(summary.length >= (kind === "youtube" ? 80 : kind === "movie" ? 60 : 55) || kind === "place", "original reader-oriented summary is too short");
  warn(!/\b(lorem ipsum|tbd|todo|coming soon: content|insert (?:text|details)|as an ai)\b/i.test(text), "placeholder or unedited filler detected");
  if (kind === "service") {
    warn(checkedDate(record, "lastVerified"), "valid current lastVerified date required");
    warn(list(record, "requirements").length >= 2, "at least two requirements required");
    warn(list(record, "steps").length >= 3, "at least three useful steps required");
    warn(list(record, "notes").length >= 1, "caveat/safety note required");
    warn(hasHttps(record, "sources"), "published official HTTPS evidence link required");
    warn(Boolean(value(record, "feeLabel")), "fee/status explanation required");
    warn(list(record, "related").length >= 1, "related internal-guide link required");
  } else if (kind === "tour") {
    warn(checkedDate(record, "lastReviewed"), "valid current lastReviewed date required");
    warn(hasHttps(record, "source"), "official/primary source required");
    warn(list(record, "intro").length >= 2, "two original introductory paragraphs required");
    warn(list(record, "highlights").length >= 4 || /highlights\s*:\s*\[[\s\S]*?\{/.test(text) && (text.match(/detail\s*:/g) || []).length >= 4, "four specific highlights required");
    warn(list(record, "planning").length >= 4 || (text.match(/label\s*:/g) || []).length >= 4, "four practical planning steps required");
  } else if (kind === "place") {
    warn(checkedDate(record, "checkedAt"), "place verification date required");
    warn(hasHttps(record, "source"), "place verification source required");
    warn(Boolean(value(record, "address")), "usable location/address required");
  } else if (kind === "movie") {
    warn(list(record, "cast").length >= 1 || /cast\s*:\s*\[/.test(text), "verified cast context required");
    warn(hasHttps(record, "watchLinks") || hasHttps(record, "references") || hasHttps(record, "trailer") || hasHttps(record, "sourcePreview") || hasHttps(record, "artwork"), "legal/source-backed watching or verification route required");
    if (/\bartwork\s*:/.test(text)) warn(/usageBasis\s*:/.test(text) && /credit\s*:/.test(text), "artwork usage basis and credit required");
    if (/\bsourcePreview\s*:/.test(text)) warn(/sourceKind\s*:/.test(text) && /credit\s*:/.test(text), "preview source/credit required");
  } else if (kind === "youtube") {
    warn(record.metadataStatus === "complete", "only fully verified records should enter the indexable YouTube catalog; hold other candidates for review/noindex");
    warn(Array.isArray(record.cast) && record.cast.length >= 1, "verified cast required");
    warn(typeof record.videoUrl === "string" && record.videoUrl.startsWith("https://www.youtube.com/"), "legitimate YouTube watch source required");
    warn(checkedDate(record, "lastChecked"), "current source-check date required");
    warn(!/\b(?:subscribe|latest nigerian movies|full movie 2026|watch now|like and share)\b/i.test(summary), "publisher promotional or search-keyword filler is not an original synopsis");
  } else if (kind === "job") {
    warn(checkedDate(record, "verifiedAt"), "valid current verifiedAt required");
    warn(hasHttps(record, "officialUrl"), "official HTTPS application route required");
    warn(hasHttps(record, "sources"), "verified source required");
    warn(Boolean(value(record, "status")), "accurate opening/programme status required");
    warn(list(record, "applicationSteps").length >= 2, "specific application actions required");
    warn(Boolean(value(record, "location")), "location/eligibility required");
  }
  return local.map((reason) => path + " [" + slug + "]: " + reason);
}
export function checkNewRoute(path, source) {
  const issues = [];
  if (/^\s*(?:export\s+)?default\s+.*redirect\(/m.test(source)) return issues;
  if (!/(?:export\s+const\s+metadata|export\s+(?:async\s+)?function\s+generateMetadata)/.test(source)) issues.push("missing route-specific metadata");
  if (!/\bcanonical\b/.test(source)) issues.push("missing explicit canonical declaration");
  if (!/\bdescription\b/.test(source)) issues.push("missing page-specific description");
  if (!/<h1\b/i.test(source) && !/\b(?:AnswerFirst|PageHeading|HeroHeading)\b/.test(source)) issues.push("no visible H1 heading evidence");
  if (/lorem ipsum|tbd|insert text|add details here/i.test(source)) issues.push("placeholder copy detected");
  for (const m of source.matchAll(/<img\b[\s\S]*?\/?>/g)) {
    if (!/\balt\s*=/.test(m[0])) issues.push("image missing alt");
    if (!/\bwidth\s*=/.test(m[0]) || !/\bheight\s*=/.test(m[0])) issues.push("image missing intrinsic width/height");
  }
  return issues.map((reason) => path + ": " + reason);
}
function changes(base) {
  const list = execFileSync("git", ["diff", "--name-status", "--diff-filter=AM", base, "HEAD", "--"], { encoding: "utf8" });
  return list.split("\n").filter(Boolean).map((line) => line.split("\t").at(-1)).filter(Boolean);
}
function intentKey(kind, path, record) {
  const title = String(value(record, "title") || value(record, "name") || "").toLowerCase()
    .normalize("NFKC").replace(/[^a-z0-9]+/g, " ").trim();
  const context = kind === "job" ? value(record, "organization") :
    kind === "service" ? value(record, "agencySlug") :
    kind === "tour" ? value(record, "region") :
    kind === "movie" ? (path.includes("series") ? "series:" : "movie:") + value(record, "year") :
    kind === "place" ? value(record, "address") : "";
  return title.length >= 8 ? kind + "|" + title + "|" + String(context).toLowerCase() : null;
}
function catalogPaths() {
  const paths = [];
  for (const root of ["data", "lib"]) {
    if (!existsSync(root)) continue;
    for (const filename of readdirSync(root)) {
      const path = join(root, filename).replaceAll("\\\\", "/");
      if (classify(path) && classify(path) !== "route") paths.push(path);
    }
  }
  return paths;
}
function existingIntentMap() {
  const titles = new Map();
  for (const path of catalogPaths()) {
    const kind = classify(path);
    let records;
    try { records = recordsFromSource(current(path), kind); }
    catch { continue; }
    for (const [slug, record] of records) {
      const key = intentKey(kind, path, record);
      if (key) titles.set(key, [...(titles.get(key) || []), { path, slug }]);
    }
  }
  return titles;
}
function run(base) {
  const files = changes(base).filter((path) => classify(path) && existsSync(path));
  let discovered = 0;
  const intentIndex = existingIntentMap();
  for (const path of files) {
    const kind = classify(path);
    const before = fileAt(base, path);
    const after = current(path);
    if (kind === "route") {
      if (!before) {
        discovered++;
        checked.push(path);
        errors.push(...checkNewRoute(path, after));
      }
      continue;
    }
    let oldRecords, newRecords;
    try {
      oldRecords = recordsFromSource(before, kind);
      newRecords = recordsFromSource(after, kind);
    } catch (error) {
      errors.push(path + ": catalog parsing failed: " + error.message);
      continue;
    }
    for (const [slug, record] of newRecords) {
      if (oldRecords.has(slug)) continue; // Editing existing page is separately covered by its pillar check.
      discovered++;
      checked.push(path + ": " + slug);
      errors.push(...checkRecord(path, kind, slug, record));
      const key = intentKey(kind, path, record);
      if (key) {
        const duplicates = (intentIndex.get(key) || []).filter((item) => item.slug !== slug);
        if (duplicates.length) errors.push(path + " [" + slug + "]: exact same-title/search-intent candidate already exists at " +
          duplicates.slice(0, 3).map((item) => item.path + " [" + item.slug + "]").join(", ") +
          "; update the existing canonical page instead of publishing a duplicate.");
      }
    }
  }
  console.log("New-page publishing gate: " + discovered + " new page records/routes (" + files.length + " relevant changed files).");
  if (errors.length) {
    console.error(errors.slice(0, 35).map((s) => " - " + s).join("\n"));
    if (errors.length > 35) console.error(" ...and " + (errors.length - 35) + " additional issues.");
    process.exitCode = 1;
  } else {
    console.log("Objective new-page requirements passed. Source truth, rights, duplicate search intent and UX still require the publishing agent's documented checks.");
  }
}
const main = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (main) {
  const base = process.argv[process.argv.indexOf("--base") + 1];
  if (!base || base.startsWith("--")) {
    console.error("Usage: node .github/scripts/new-page-quality.mjs --base <fetched-base-commit>");
    process.exitCode = 2;
  } else run(base);
}

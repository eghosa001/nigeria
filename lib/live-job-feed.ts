export type LiveJobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  postedAt: string | null;
  sourceUrl: string;
  sourceName: string;
};

export type LiveJobsResult = {
  items: LiveJobListing[];
  batch: number;
  batches: number;
  approximateAvailable: number;
  checkedAt: string;
  sourceName: string;
  sourcePageCount: number;
};

const SOURCE = "MyJobMag";
const SOURCE_ROOT = "https://www.myjobmag.com/jobs-by-date/this-month";
const PAGES_PER_BATCH = 5;
const MAX_BATCHES = 3;
const APPROXIMATE_AVAILABLE = PAGES_PER_BATCH * MAX_BATCHES * 20;

const MONTHS: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
  july: "07", august: "08", september: "09", october: "10", november: "11", december: "12",
};

const LOCATIONS = [
  "Abia","Abuja","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
  "Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi",
  "Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto",
  "Taraba","Yobe","Zamfara",
];

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function textOnly(value: string) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function normalizeUrl(href: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  return "https://www.myjobmag.com" + (href.startsWith("/") ? href : "/" + href);
}

function toPostedDate(raw: string) {
  const match = raw.match(/\b(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\b/i);
  if (!match) return null;
  const month = MONTHS[match[2].toLowerCase()];
  return "2026-" + month + "-" + String(Number(match[1])).padStart(2, "0");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
}

function findLocation(raw: string) {
  const text = textOnly(raw);
  const ordered = [...LOCATIONS].sort((a, b) => b.length - a.length);
  return ordered.find((location) => new RegExp("\\b" + escapeRegExp(location) + "\\b", "i").test(text)) ?? "Nigeria";
}

function splitRoleCompany(label: string) {
  const marker = label.lastIndexOf(" at ");
  if (marker <= 0) return { title: label, company: "Employer not stated" };
  return { title: label.slice(0, marker).trim(), company: label.slice(marker + 4).trim() };
}

function parsePage(html: string): LiveJobListing[] {
  const jobs: LiveJobListing[] = [];
  const anchor = /<a\b[^>]*href=["']([^"']*\/job\/[^"'?#]+[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = anchor.exec(html))) {
    const label = textOnly(match[2]);
    if (!label || !/\sat\s/i.test(label)) continue;

    const sourceUrl = normalizeUrl(match[1]);
    const tail = html.slice(anchor.lastIndex, anchor.lastIndex + 1800);
    const parts = splitRoleCompany(label);
    if (!parts.title || !parts.company || parts.title.length < 2 || parts.company.length < 2) continue;

    const id = sourceUrl.replace(/^https?:\/\/[^/]+\/job\//, "").replace(/\?.*$/, "");
    jobs.push({
      id,
      title: parts.title,
      company: parts.company,
      location: findLocation(tail),
      postedAt: toPostedDate(textOnly(tail)),
      sourceUrl,
      sourceName: SOURCE,
    });
  }

  const seen = new Set<string>();
  return jobs.filter((job) => {
    const key = job.sourceUrl.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchSourcePage(sourcePage: number) {
  const url = sourcePage === 1 ? SOURCE_ROOT : SOURCE_ROOT + "/" + (sourcePage - 1);
  const response = await fetch(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": "MyNigeriaGuide/1.0 (+https://mynigeriaguide.com/jobs)",
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Live jobs source returned HTTP " + response.status);
  return parsePage(await response.text());
}

export async function getLiveNigeriaJobs(batch = 1): Promise<LiveJobsResult> {
  const safeBatch = Math.min(MAX_BATCHES, Math.max(1, Math.trunc(batch) || 1));
  const start = (safeBatch - 1) * PAGES_PER_BATCH + 1;
  const pages = Array.from({ length: PAGES_PER_BATCH }, (_, index) => start + index);

  const settled = await Promise.allSettled(pages.map(fetchSourcePage));
  const combined = settled.flatMap((result) => result.status === "fulfilled" ? result.value : []);

  const seen = new Set<string>();
  const items = combined.filter((job) => {
    const key = job.sourceUrl.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    items,
    batch: safeBatch,
    batches: MAX_BATCHES,
    approximateAvailable: APPROXIMATE_AVAILABLE,
    checkedAt: new Date().toISOString(),
    sourceName: SOURCE,
    sourcePageCount: settled.filter((result) => result.status === "fulfilled").length,
  };
}

import { entertainmentTitles, getEntertainmentTitle } from "@/lib/entertainment";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return entertainmentTitles.map((title) => ({ slug: title.slug }));
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function wrapTitle(value: string, maxChars = 18) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? current + " " + word : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}

const palettes = [
  ["#061f19", "#0f5c43", "#cfa44f"],
  ["#101b36", "#254c7c", "#d6a757"],
  ["#2a0f20", "#74384f", "#d6b35e"],
  ["#16161b", "#494956", "#d0a95a"],
  ["#211107", "#7d4920", "#e0b65d"],
  ["#0c2028", "#1d6070", "#d6a654"],
] as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const title = getEntertainmentTitle(slug);
  if (!title) return new Response("Not found", { status: 404 });

  const palette = palettes[hash(title.slug) % palettes.length];
  const [dark, mid, accent] = palette;
  const genre = title.genres[0] ?? "Nigerian film";
  const lines = wrapTitle(title.title);
  const titleStartY = 500 - Math.max(0, lines.length - 2) * 44;
  const titleSvg = lines
    .map((line, index) => {
      const y = titleStartY + index * 86;
      return '<text x="52" y="' + y + '" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="800" letter-spacing="-2">' + escapeXml(line) + "</text>";
    })
    .join("");

  const cast = title.cast.slice(0, 3).map(escapeXml).join(" • ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900" role="img" aria-label="${escapeXml(title.title)} original MyNigeriaGuide poster">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${dark}"/>
      <stop offset="58%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="15%" r="72%">
      <stop offset="0%" stop-color="${accent}" stop-opacity=".48"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="900" fill="url(#base)"/>
  <rect width="600" height="900" fill="url(#glow)"/>
  <circle cx="500" cy="150" r="210" fill="none" stroke="#ffffff" stroke-opacity=".12" stroke-width="2"/>
  <circle cx="500" cy="150" r="145" fill="none" stroke="#ffffff" stroke-opacity=".08" stroke-width="2"/>
  <path d="M-30 795C120 630 235 850 398 615C480 497 545 535 655 365" fill="none" stroke="#ffffff" stroke-opacity=".12" stroke-width="13" stroke-linecap="round"/>
  <path d="M-20 825C135 670 255 862 415 642C505 516 557 555 650 410" fill="none" stroke="${accent}" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/>
  <text x="52" y="88" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="3">MYNIGERIAGUIDE • ${escapeXml(String(title.year))}</text>
  <text x="52" y="126" fill="#ffffff" fill-opacity=".74" font-family="Arial, Helvetica, sans-serif" font-size="20">${escapeXml(genre)}</text>
  ${titleSvg}
  <line x1="52" y1="770" x2="548" y2="770" stroke="#ffffff" stroke-opacity=".18"/>
  <text x="52" y="816" fill="#ffffff" fill-opacity=".82" font-family="Arial, Helvetica, sans-serif" font-size="18">${cast || "Nigerian cinema"}</text>
  <text x="52" y="858" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" letter-spacing="2">ORIGINAL EDITORIAL ARTWORK</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      "x-content-type-options": "nosniff",
    },
  });
}

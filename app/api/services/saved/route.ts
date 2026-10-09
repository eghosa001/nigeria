import { getAgency, publicServiceListings } from "@/lib/data";

export const dynamic = "force-dynamic";

const bySlug = new Map(publicServiceListings.map((service) => [service.slug, service]));

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const slugs = [...new Set((params.get("slugs") ?? "")
    .split(",")
    .filter((slug) => /^[a-z0-9-]{1,120}$/.test(slug))
    .slice(0, 40))];

  const items = slugs.flatMap((slug) => {
    const service = bySlug.get(slug);
    if (!service) return [];
    return [{
      slug: service.slug,
      title: service.title,
      shortTitle: service.shortTitle,
      summary: service.summary,
      category: service.category,
      feeLabel: service.feeLabel,
      status: service.status,
      lastVerified: service.lastVerified,
      agencyShortName: getAgency(service.agencySlug)?.shortName,
    }];
  });
  return Response.json({ items }, {
    headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" },
  });
}

import { entertainmentPlatforms, type EntertainmentPlatform } from "@/lib/entertainment";
import { queryEntertainmentDirectory, type EntertainmentDirectorySort } from "@/lib/entertainment-query";

export const dynamic = "force-dynamic";

function numberParam(value: string | null) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawPlatform = searchParams.get("platform") ?? "all";
  const platform = rawPlatform === "all" || entertainmentPlatforms.includes(rawPlatform as EntertainmentPlatform)
    ? rawPlatform as EntertainmentPlatform | "all"
    : "all";
  const rawSort = searchParams.get("sort") ?? "newest";
  const sort = ["newest", "oldest", "az"].includes(rawSort) ? rawSort as EntertainmentDirectorySort : "newest";

  const result = queryEntertainmentDirectory({
    q: searchParams.get("q") ?? undefined,
    platform,
    genre: searchParams.get("genre") ?? "all",
    sort,
    page: numberParam(searchParams.get("page")),
    pageSize: numberParam(searchParams.get("pageSize")),
  });

  return Response.json(result, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
      "X-Robots-Tag": "noindex",
    },
  });
}

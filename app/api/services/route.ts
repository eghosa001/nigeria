import { queryServiceDirectory, type ServiceDirectorySort, type ServiceDirectoryStatus } from "@/lib/service-query";

export const dynamic = "force-dynamic";

function numberParam(value: string | null) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = queryServiceDirectory({
    q: searchParams.get("q") ?? undefined,
    category: searchParams.get("category") ?? "all",
    status: (searchParams.get("status") ?? "all") as ServiceDirectoryStatus,
    sort: (searchParams.get("sort") ?? "relevance") as ServiceDirectorySort,
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

import { queryJobDirectory } from "@/lib/job-query";
import type { JobSector, JobStatus } from "@/lib/jobs";

export const dynamic = "force-dynamic";

function numberParam(value: string | null) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = queryJobDirectory({
    q: searchParams.get("q") ?? undefined,
    sector: (searchParams.get("sector") ?? "All") as JobSector | "All",
    status: (searchParams.get("status") ?? "all") as JobStatus | "all",
    location: searchParams.get("location") ?? "all",
    profession: searchParams.get("profession") ?? "all",
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

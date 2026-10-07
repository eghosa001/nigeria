import { getLiveNigeriaJobs } from "@/lib/live-job-feed";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const batch = Math.max(1, Number(searchParams.get("batch") ?? "1") || 1);
  const result = await getLiveNigeriaJobs(batch);

  return Response.json(result, {
    headers: {
      "Cache-Control": "public, max-age=120, s-maxage=900, stale-while-revalidate=1800",
      "X-Robots-Tag": "noindex",
    },
  });
}

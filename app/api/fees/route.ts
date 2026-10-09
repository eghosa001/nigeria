import { queryFeeDirectory } from "@/lib/fee-query";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const page = Number(params.get("page") ?? "1");
  const status = params.get("status") || "all";
  const result = queryFeeDirectory({
    q: params.get("q") || "",
    category: params.get("category") || "all",
    status: ["verified", "conflict"].includes(status) ? status : "all",
    page,
  });
  return Response.json(result, {
    headers: {
      "Cache-Control": "public, max-age=30, s-maxage=300, stale-while-revalidate=600",
      "X-Robots-Tag": "noindex",
    },
  });
}

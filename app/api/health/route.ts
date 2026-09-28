import { publicServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      status: "ok",
      product: "MyNigeriaGuide",
      publicGuides: publicServices.length,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

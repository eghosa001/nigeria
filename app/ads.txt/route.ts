export const dynamic = "force-dynamic";

export function GET() {
  const configured = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

  if (!configured) {
    return new Response("AdSense is not configured for this site.\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const publisherId = configured.replace(/^ca-/, "");

  return new Response(
    "google.com, " + publisherId + ", DIRECT, f08c47fec0942fa0\n",
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}

export const dynamic = "force-dynamic";

export function GET() {
  // AdSense publisher IDs are intentionally public. Keep ads.txt stable even
  // when a Cloudflare deployment does not expose build-time NEXT_PUBLIC values
  // to this runtime route.
  const configured = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "ca-pub-7517898921176341";
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

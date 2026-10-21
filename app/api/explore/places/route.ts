import { publicExplorePlaceDirectory } from "@/lib/explore-directory-payload";

// The complete catalogue is downloaded only after a user searches, filters or
// expands the first eight places. Do not include private/source-only records.
export const revalidate = 300;

export function GET() {
  return Response.json({ places: publicExplorePlaceDirectory }, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

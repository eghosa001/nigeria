import type { NextConfig } from "next";
import retiredJobRoutes from "./data/job-retired-redirects.json" with { type: "json" };

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.posthog.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.doubleclick.net https://*.googlesyndication.com https://*.posthog.com",
  "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://*.doubleclick.net https://*.googlesyndication.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  { key: "Origin-Agent-Cluster", value: "?1" },
  { key: "Permissions-Policy", value: "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

// These two public landing pages read optional query params, which makes their
// default (unfiltered) HTML dynamically rendered and no-store in Vinext.
// Admit only the canonical, filter-free representations to the shared edge.
// Filtered searches remain per-request; user query strings are NEVER cached.
// Do not apply this policy to /jobs, /admin, APIs, or detail routes.
const publicDirectoryEdgeHeaders = [
  { key: "Cloudflare-CDN-Cache-Control", value: "public, max-age=300, stale-while-revalidate=60" },
];

// CDN caching is restricted to non-personalized, filter-free editorial entry
// routes. Stale delivery avoids a thundering herd when a fresh copy is being
// generated; short TTLs limit how long time-sensitive public summaries age.
// These headers are not applied to job status pages, APIs, admin, or searches.
const publicEditorialCache = [
  { key: "Cloudflare-CDN-Cache-Control", value: "public, max-age=120, stale-while-revalidate=60" },
];
const publicTourCache = [
  { key: "Cloudflare-CDN-Cache-Control", value: "public, max-age=60, stale-while-revalidate=30" },
];
const unfilteredExploreQueries = ["q", "type", "city", "region", "page", "sort"]
  .map((key) => ({ type: "query" as const, key }));
const unfilteredEditorialQueries = ["q", "page", "search", "sort"]
  .map((key) => ({ type: "query" as const, key }));

const unfilteredServiceQueries = ["q", "category", "status", "sort", "page"]
  .map((key) => ({ type: "query" as const, key }));
const unfilteredMovieQueries = ["q", "platform", "genre", "sort", "page"]
  .map((key) => ({ type: "query" as const, key }));

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Broaden metadata-in-head treatment to generic SEO crawlers without forcing
  // regular browser traffic onto the slower blocking-metadata path.
  htmlLimitedBots: /[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight|Googlebot|bot|crawl|spider|SEOAnalyzer|FiveT|HeadlessChrome/i,
  async headers() {
    const privateAdminHeaders = [
      { key: "Cache-Control", value: "private, no-store" },
      { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
    ];
    return [
      // Cache only public, anonymous, canonical editorial responses at the edge.
      { source: "/", missing: unfilteredEditorialQueries, headers: publicEditorialCache },
      { source: "/entertainment", missing: unfilteredEditorialQueries, headers: publicEditorialCache },
      { source: "/latest", missing: unfilteredEditorialQueries, headers: publicEditorialCache },
      { source: "/explore", missing: unfilteredExploreQueries, headers: publicTourCache },
      {
        source: "/services",
        missing: unfilteredServiceQueries,
        headers: publicDirectoryEdgeHeaders,
      },
      {
        source: "/entertainment/movies",
        missing: unfilteredMovieQueries,
        headers: publicDirectoryEdgeHeaders,
      },
      { source: "/admin", headers: privateAdminHeaders },
      { source: "/admin/:path*", headers: privateAdminHeaders },
      { source: "/api/admin/:path*", headers: privateAdminHeaders },
      { source: "/(.*)", headers: securityHeaders },
    ];
  },
  async redirects() {
    return [
      ...retiredJobRoutes.map(({ sourceSlug, destinationPath }) => ({
        source: "/jobs/" + sourceSlug,
        destination: destinationPath,
        permanent: true,
      })),
      {
        // Legacy spelling published the same Hotels.ng booking workflow twice.
        // Preserve old inbound links, but index a single detailed guide.
        source: "/services/hotelsng-book-hotel",
        destination: "/services/hotels-ng-book-hotel",
        permanent: true,
      },
      {
        source: "/services/hotelsng-cancel-refund",
        destination: "/services/hotels-ng-cancel-refund-booking",
        permanent: true,
      },
      {
        source: "/jobs/opay-nigeria-careers",
        destination: "/jobs/opay-careers-nigeria",
        permanent: true,
      },
      {
        source: "/services/bvn-change-details",
        destination: "/topics/bvn",
        permanent: true,
      },
      {
        source: "/services/jamb-direct-entry",
        destination: "/services/jamb-direct-entry-2026",
        permanent: true,
      },
      {
        // Preserve the established indexed Kainji Dam guide and consolidate
        // the newer same-intent URL without creating two sitemap canonicals.
        source: "/explore/kainji-dam",
        destination: "/explore/kainji-dam-guide",
        permanent: true,
      },
      {
        source: "/entertainment/movies/third-party-risk-2026",
        destination: "/entertainment/movies/third-party-risk",
        permanent: true,
      },
      {
        source: "/entertainment/movies/our-perfect-match-2026",
        destination: "/entertainment/movies/our-perfect-match",
        permanent: true,
      },
      {
        source: "/entertainment/movies/one-string-attached-2023",
        destination: "/entertainment/movies/one-string-attached",
        permanent: true,
      },
      {
        source: "/entertainment/movies/holy-matrimony-2024",
        destination: "/entertainment/movies/holy-matrimony",
        permanent: true,
      },
      {
        source: "/entertainment/movies/one-more-night-2025",
        destination: "/entertainment/movies/one-more-night",
        permanent: true,
      },
      {
        source: "/entertainment/youtube/Yu-QxqPDmXM",
        destination: "/entertainment/series/once-upon-a-village",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://mynigeriaguide.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mynigeriaguide.com" }],
        destination: "https://mynigeriaguide.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "mynigeriaguide.aighewieghosa111.workers.dev" }],
        destination: "https://mynigeriaguide.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

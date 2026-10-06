import type { NextConfig } from "next";
import retiredJobRoutes from "./data/job-retired-redirects.json";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.doubleclick.net https://*.googlesyndication.com",
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

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    const privateAdminHeaders = [
      { key: "Cache-Control", value: "private, no-store" },
      { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
    ];
    return [
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
        source: "/services/bvn-change-details",
        destination: "/topics/bvn",
        permanent: true,
      },
      {
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

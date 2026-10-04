import type { Metadata } from "next";
import "@/app/globals.css";
import "@/app/mobile.css";
import "@/app/theme.css";
import { AdsenseScript } from "@/components/adsense";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";
import { GA_MEASUREMENT_ID } from "@/lib/analytics-config";

const siteUrl = getSiteUrl();

const gaBootstrap = `
(function () {
  var id = "${GA_MEASUREMENT_ID}";
  var path = window.location.pathname;
  var automated = navigator.webdriver === true;
  var admin = path === "/admin" || path.indexOf("/admin/") === 0;
  var disabledKey = "ga-disable-" + id;

  window[disabledKey] = automated || admin;
  if (automated || admin) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (!document.querySelector("script[data-mynigeriaguide-ga]")) {
    var script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-mynigeriaguide-ga", "true");
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });
  window.__mngLastTrackedPath = path;
})();
`;

const themeBootstrap = `
(function () {
  var preference = "light";
  try {
    var stored = localStorage.getItem("mng-theme-v2");
    if (stored === "light" || stored === "dark" || stored === "system") preference = stored;
  } catch (_) {}

  try {
    var dark = preference === "dark" || (preference === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    var theme = dark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePreference = preference;
    document.documentElement.style.colorScheme = theme;
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#0b1410" : "#f8f5ed");
  } catch (_) {}
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s | " + siteName },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: siteUrl + "/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: siteUrl + "/icon.svg",
    email: "contact@mynigeriaguide.com",
    publishingPrinciples: siteUrl + "/editorial-policy",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#f8f5ed" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: gaBootstrap }} />
        <link rel="alternate" type="application/rss+xml" title="MyNigeriaGuide — Verified Updates" href="/updates.xml" />
      </head>
      <body>
        <JsonLd data={[websiteLd, organizationLd]} />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <ServiceWorkerRegister />
        <Analytics />
        <AdsenseScript />
      </body>
    </html>
  );
}

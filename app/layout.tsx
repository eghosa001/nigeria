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
import { POSTHOG_API_HOST, POSTHOG_PROJECT_TOKEN, POSTHOG_UI_HOST } from "@/lib/posthog-config";

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

const posthogBootstrap = `
(function () {
  var path = window.location.pathname;
  if (navigator.webdriver === true || path === "/admin" || path.indexOf("/admin/") === 0) return;

  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.setAttribute("data-mynigeriaguide-posthog","true"),p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  posthog.init("${POSTHOG_PROJECT_TOKEN}", {
    api_host: "${POSTHOG_API_HOST}",
    ui_host: "${POSTHOG_UI_HOST}",
    defaults: "2026-05-30",
    autocapture: true,
    capture_pageview: false,
    capture_pageleave: true,
    disable_session_recording: true,
    before_send: function (event) {
      if (!event || navigator.webdriver === true) return null;
      var properties = event.properties || {};
      var value = properties.$current_url || properties.$pathname || window.location.href;
      var eventPath = window.location.pathname;
      try { eventPath = new URL(value, window.location.origin).pathname; } catch (_) {}
      if (
        eventPath === "/admin" ||
        eventPath.indexOf("/admin/") === 0 ||
        eventPath === "/api" ||
        eventPath.indexOf("/api/") === 0 ||
        eventPath.indexOf("/_next") === 0
      ) return null;
      return event;
    }
  });

  posthog.capture("$pageview", {
    $current_url: window.location.href,
    $pathname: path,
    $host: window.location.host,
    page_title: document.title
  });
  window.__mngPosthogLastTrackedPath = path;
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
        <script dangerouslySetInnerHTML={{ __html: posthogBootstrap }} />
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

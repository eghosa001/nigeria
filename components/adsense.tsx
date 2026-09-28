import Script from "next/script";

export function AdsenseScript() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;

  return (
    <Script
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + client}
    />
  );
}

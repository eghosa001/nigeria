import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false, nocache: true },
};

export default function OfflinePage() {
  return (
    <section className="section page-top">
      <div className="container narrow-wide">
        <span className="eyebrow">Offline mode</span>
        <h1>You are offline.</h1>
        <p className="page-intro">Guides you already opened may still be available from this device. Reconnect before making a payment or relying on a fee that may have changed.</p>
        <Link className="button" href="/saved">Open saved guides</Link>
      </div>
    </section>
  );
}

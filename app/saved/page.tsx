import type { Metadata } from "next";
import { SavedGuides } from "@/components/saved-guides";
import { publicServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Saved guides",
  description: "Government-service guides saved locally on this device.",
  robots: { index: false, follow: false },
};

export default function SavedPage() {
  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Your device</span>
        <h1>Saved guides</h1>
        <p className="page-intro">
          These guides and their review snapshots are stored in your browser only. When a watched guide changes, this page can flag it the next time you return; email or push notifications are not enabled yet.
        </p>
        <SavedGuides services={publicServices} />
      </div>
    </section>
  );
}

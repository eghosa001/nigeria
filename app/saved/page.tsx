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
          These guides are stored in your browser only. Saving does not yet create an email or push notification subscription.
        </p>
        <SavedGuides services={publicServices} />
      </div>
    </section>
  );
}

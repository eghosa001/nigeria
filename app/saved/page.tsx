import type { Metadata } from "next";
import { SavedGuides } from "@/components/saved-guides";
import { PersonalLibrary } from "@/components/personal-library";
import { publicServiceListings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Saved guides and recent pages",
  description: "Your saved Nigerian movie, travel, job and service guides on this device.",
  robots: { index: false, follow: false },
};

export default function SavedPage() {
  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Your device</span>
        <h1>Your saved pages</h1>
        <p className="page-intro">
          Pick up where you left off. Your bookmarks and recently viewed pages stay in this browser—no account required.
        </p>
        <PersonalLibrary />
        <section className="saved-services-section" aria-labelledby="watched-service-guides">
          <h2 id="watched-service-guides">Watched service guides</h2>
          <p>Save official-service guides to see when their fees or verification details change.</p>
          <SavedGuides services={publicServiceListings} />
        </section>
      </div>
    </section>
  );
}

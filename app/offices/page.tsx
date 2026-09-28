import type { Metadata } from "next";
import { officeDirectories } from "@/lib/offices";
import { OfficeFinder } from "@/components/office-finder";

export const metadata: Metadata = {
  alternates: { canonical: "/offices" },
  title: "Official office and service-location routes",
  description: "Find official Nigerian government office, centre and service-location routes without relying on copied or stale addresses.",
};

export default function OfficesPage() {
  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Locations</span>
        <h1>Official office and centre finders</h1>
        <p className="page-intro">
          Office addresses change. Where an agency maintains a live official directory, MyNigeriaGuide sends you there instead of copying an address that can become stale.
        </p>

        <OfficeFinder directories={officeDirectories} />

        <div className="info-box office-note">
          If an official directory is unavailable or unclear, MyNigeriaGuide does not invent a local office address. Use the responsible agency's official contact channel instead.
        </div>
      </div>
    </section>
  );
}

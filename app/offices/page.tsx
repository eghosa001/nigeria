import type { Metadata } from "next";
import { officeDirectories } from "@/lib/offices";

export const metadata: Metadata = {
  alternates: { canonical: "/offices" },
  title: "Official office and centre finders",
  description: "Find official Nigerian government office and service-centre directories without relying on copied or stale addresses.",
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

        <div className="office-grid">
          {officeDirectories.map((directory) => (
            <article className="office-card" key={directory.agency + directory.service}>
              <span>{directory.coverage}</span>
              <h2>{directory.service}</h2>
              <strong>{directory.agency}</strong>
              <p>{directory.description}</p>
              <a href={directory.directoryUrl} target="_blank" rel="noreferrer">Open official finder ↗</a>
              <small>{directory.sourceLabel} · checked {directory.checked}</small>
            </article>
          ))}
        </div>

        <div className="info-box office-note">
          If an official directory is unavailable or unclear, MyNigeriaGuide does not invent a local office address. Use the responsible agency's official contact channel instead.
        </div>
      </div>
    </section>
  );
}

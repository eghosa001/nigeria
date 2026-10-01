import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { cinemaGuides } from "@/lib/entertainment-extras";

export const metadata: Metadata = {
  title: "Cinemas in Nigeria",
  description: "Official booking, showtime and ticket-price routes for major Nigerian cinema chains including Filmhouse, Silverbird and Viva.",
  alternates: { canonical: "/entertainment/cinemas" },
};

export default function CinemasPage() {
  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Entertainment", href: "/entertainment" }, { label: "Cinemas" }]} />
        <span className="eyebrow">Cinemas</span>
        <h1>Find cinemas, showtimes and booking links.</h1>
        <div className="service-grid top-gap">
          {cinemaGuides.map((cinema) => (
            <article className="service-card" key={cinema.slug}>
              <div className="card-topline"><span>Cinema chain</span><span>Checked {cinema.lastChecked}</span></div>
              <h3>{cinema.name}</h3>
              <p>{cinema.priceNote}</p>
              <p><strong>Locations:</strong> {cinema.locations.join(", ")}</p>
              <div className="related-links">
                <a href={cinema.bookingUrl} target="_blank" rel="noreferrer">Showtimes &amp; booking ↗</a>
                {cinema.priceUrl ? <a href={cinema.priceUrl} target="_blank" rel="noreferrer">Published prices ↗</a> : null}
                <a href={cinema.officialUrl} target="_blank" rel="noreferrer">Official site ↗</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

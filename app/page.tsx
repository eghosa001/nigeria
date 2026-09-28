import Link from "next/link";
import { ServiceSearch } from "@/components/search";
import { ServiceCard } from "@/components/service-card";
import { agencies, categories, services } from "@/lib/data";

export default function HomePage() {
  const verifiedCount = services.filter((service) => service.status === "verified").length;

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Independent • source-linked • Nigeria-focused</div>
            <h1>Government services, explained without the confusion.</h1>
            <p className="hero-lead">
              Find current fees, documents, steps and official portals — with visible warnings when official sources disagree.
            </p>
            <ServiceSearch services={services} />
            <p className="hero-note">
              We never take government payments. Official actions happen on the government portals we link to.
            </p>
          </div>
          <aside className="trust-panel">
            <span className="trust-kicker">Verification snapshot</span>
            <strong>{verifiedCount} starter guides verified</strong>
            <p>Each published fact keeps its source and last-check date.</p>
            <div className="trust-row"><span>✓</span> Official sources first</div>
            <div className="trust-row"><span>✓</span> Conflicts shown, not hidden</div>
            <div className="trust-row"><span>✓</span> No unofficial payment buttons</div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Browse by need</span>
              <h2>Start with the service category</h2>
            </div>
            <Link href="/services">View all guides →</Link>
          </div>
          <div className="category-grid">
            {categories.map((category) => {
              const count = services.filter((service) => service.category === category.name).length;
              return (
                <div className="category-card" key={category.name}>
                  <span className="category-icon" aria-hidden="true">{category.name.slice(0, 1)}</span>
                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <small>{count ? count + " live guide" + (count > 1 ? "s" : "") : "Coming next"}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">High-demand starters</span>
              <h2>Verified guides you can use now</h2>
            </div>
          </div>
          <div className="service-grid">
            {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container agency-strip">
          <div>
            <span className="eyebrow">Source transparency</span>
            <h2>Built around official agencies</h2>
            <p>Every service connects back to the agency responsible for it.</p>
          </div>
          <div className="agency-list">
            {agencies.map((agency) => (
              <Link href={"/agencies/" + agency.slug} key={agency.slug}>
                <strong>{agency.shortName}</strong>
                <span>{agency.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

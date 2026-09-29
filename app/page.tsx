import type { Metadata } from "next";
import Link from "next/link";
import { ServiceSearch } from "@/components/search";
import { RouteWizard } from "@/components/route-wizard";
import { myNigeriaGuideUpdates, updateTypeLabel } from "@/data/updates";
import { agencies, publicServiceListings, publicServices } from "@/lib/data";
import { growthHubs } from "@/lib/growth-hubs";

export const metadata: Metadata = {
  title: "Nigeria Services, Travel & Entertainment Guide",
  description: "Use MyNigeriaGuide for clear Nigerian service guidance, practical travel planning and official routes to Nigerian movies and entertainment.",
  alternates: { canonical: "/" },
};

const popular = [
  { label: "Passport renewal", href: "/services/passport-renewal" },
  { label: "NIN correction", href: "/services/nin-date-of-birth-modification" },
  { label: "Retrieve BVN", href: "/services/bvn-retrieval" },
  { label: "JAMB 2026", href: "/services/jamb-2026-utme-registration" },
  { label: "NYSC senate list", href: "/services/nysc-senate-list" },
  { label: "CAC registration", href: "/services/cac-business-name-registration" },
  { label: "UK visitor visa", href: "/services/uk-standard-visitor-visa" },
];

export default function HomePage() {
  const verifiedCount = publicServices.filter((service) => service.status === "verified").length;

  return (
    <>
      <section className="hero home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="hero-kicker-dot" aria-hidden="true" />
              One practical guide to Nigeria
            </div>
            <h1>Services, travel and entertainment — <span>clearly organised.</span></h1>
            <p className="hero-lead">
              Get something done, plan somewhere to go, or find Nigerian movies through official sources without jumping between confusing directories.
            </p>

            <div className="hero-pillar-links" aria-label="Main MyNigeriaGuide sections">
              <Link href="/services">Service Guide</Link>
              <Link href="/explore">Explore Nigeria</Link>
              <Link href="/entertainment">Entertainment</Link>
            </div>

            <div className="home-service-search">
              <span className="eyebrow">Search service guides</span>
              <ServiceSearch services={publicServiceListings} />
            </div>

            <div className="hero-popular" aria-label="Popular service guides">
              <span>Popular</span>
              {popular.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </div>
            <p className="hero-note">
              Public-service applications and payments stay on official channels. Travel bookings and entertainment playback stay with the original provider.
            </p>
          </div>

          <aside className="trust-panel" aria-label="MyNigeriaGuide quality approach">
            <div className="trust-panel-top">
              <span className="trust-kicker">Quality snapshot</span>
              <span className="trust-live"><i aria-hidden="true" />Live</span>
            </div>
            <strong>{verifiedCount} published service guides</strong>
            <p>Across the site, source links and freshness notes stay visible so you can tell what to trust and what to re-check.</p>
            <div className="trust-metrics">
              <div><strong>{agencies.length}</strong><span>agency groups</span></div>
              <div><strong>3</strong><span>clear guide areas</span></div>
            </div>
            <div className="trust-row"><span>✓</span><div><strong>Services</strong><small>Requirements, fees, official portals and next steps.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>Travel</strong><small>Addresses, maps, cost notes and practical planning.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>Entertainment</strong><small>Official watch routes, cinemas and verified publishers.</small></div></div>
          </aside>
        </div>
      </section>

      <section className="section home-platform-pillars" aria-labelledby="platform-pillars-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Choose your route</span>
              <h2 id="platform-pillars-title">What do you want to do in Nigeria?</h2>
              <p className="section-lead">The site is organised as three focused products, with a shared design and navigation system.</p>
            </div>
          </div>

          <div className="platform-pillar-grid">
            <Link className="platform-pillar-card platform-pillar-services" href="/services">
              <span className="platform-pillar-number">01</span>
              <span className="eyebrow">Get something done</span>
              <strong>Service Guide</strong>
              <p>Government and practical services, documents, fees, visas, NYSC, NIN, CAC, education, driving and more.</p>
              <i>Browse services <span aria-hidden="true">→</span></i>
            </Link>

            <Link className="platform-pillar-card platform-pillar-explore" href="/explore">
              <span className="platform-pillar-number">02</span>
              <span className="eyebrow">Tour Guide · Go somewhere</span>
              <strong>Explore Nigeria</strong>
              <p>City guides, attractions, restaurants, stays, addresses, Google Maps routes, price notes and short-trip ideas.</p>
              <i>Plan a trip <span aria-hidden="true">→</span></i>
            </Link>

            <Link className="platform-pillar-card platform-pillar-entertainment" href="/entertainment">
              <span className="platform-pillar-number">03</span>
              <span className="eyebrow">Watch &amp; enjoy</span>
              <strong>Entertainment Guide</strong>
              <p>Nigerian movies, official YouTube publishers, streaming routes, cinemas, releases, actors and filmmakers.</p>
              <i>Explore entertainment <span aria-hidden="true">→</span></i>
            </Link>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="How MyNigeriaGuide stays useful">
        <div className="container proof-grid">
          <div><span aria-hidden="true">01</span><strong>Clear next steps</strong><small>Know what to prepare and where to start.</small></div>
          <div><span aria-hidden="true">02</span><strong>Useful locations</strong><small>Addresses and map routes where place matters.</small></div>
          <div><span aria-hidden="true">03</span><strong>Official destinations</strong><small>Applications, bookings and playback stay at the source.</small></div>
          <div><span aria-hidden="true">04</span><strong>Freshness visible</strong><small>Review and verification dates are kept in context.</small></div>
        </div>
      </section>

      <section className="section home-category-shortcuts">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Popular service areas</span>
              <h2>Go straight to the service area you need.</h2>
            </div>
            <Link href="/services">See all services →</Link>
          </div>
          <div className="home-category-grid">
            <Link className="home-category-card visa-card" href="/categories/foreign-visas"><span>Travel abroad</span><strong>Foreign visas</strong><small>UK, US, Canada, Schengen, UAE, South Africa, China and more.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/international-travel"><span>Travel to / from Nigeria</span><strong>Nigeria travel</strong><small>Nigeria visas, Yellow Card, ECOWAS certificate and border forms.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/identity"><span>Identity</span><strong>NIN services</strong><small>Enrolment, corrections and NIN slip services.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/banking"><span>Banking identity</span><strong>BVN services</strong><small>Get, retrieve or correct BVN and use BVN from abroad.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/education"><span>Education</span><strong>JAMB, WAEC &amp; NECO</strong><small>Registration, results, certificates and admission processes.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/youth-service"><span>Youth service</span><strong>NYSC</strong><small>Registration, mobilisation, relocation and certificates.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/business"><span>Business</span><strong>CAC services</strong><small>Business names, companies and corporate filings.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/driving"><span>Driving</span><strong>Driver's licence</strong><small>New, renewal, reissue and class changes.</small><i>→</i></Link>
          </div>
        </div>
      </section>

      <section className="section home-topic-hubs">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Popular tasks</span>
              <h2>Start with the question you are actually trying to solve.</h2>
            </div>
          </div>
          <div className="home-category-grid">
            {growthHubs.map((hub) => (
              <Link className="home-category-card topic-home-card" href={"/topics/" + hub.slug} key={hub.slug}>
                <span>Task hub</span>
                <strong>{hub.shortTitle}</strong>
                <small>{hub.description}</small>
                <i>Explore guides →</i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-discovery-section">
        <div className="container">
          <RouteWizard availableSlugs={publicServiceListings.map((service) => service.slug)} />
        </div>
      </section>

      <section className="section premium-dark-section">
        <div className="container">
          <div className="section-heading section-heading-light">
            <div>
              <span className="eyebrow">Verified service updates</span>
              <h2>Know when a public process changes.</h2>
            </div>
            <Link href="/updates">View all updates <span aria-hidden="true">→</span></Link>
          </div>
          <div className="home-updates-grid">
            {myNigeriaGuideUpdates.slice(0, 3).map((update) => (
              <article className="home-update-card" key={update.id}>
                <div>
                  <span>{updateTypeLabel(update.type)}</span>
                  <time dateTime={update.date}>{update.date}</time>
                </div>
                <h3>{update.title}</h3>
                <p>{update.summary}</p>
                <Link href={"/updates#" + update.id}>Read verified update →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container agency-strip">
          <div>
            <span className="eyebrow">Source transparency</span>
            <h2>Public-service guidance stays tied to the responsible agency.</h2>
            <p>MyNigeriaGuide explains the process, but applications, payments and final decisions remain with the official authority.</p>
            <div className="related-links"><Link href="/official-portals">Official portal directory →</Link><Link href="/offices">Find official offices and centres →</Link></div>
          </div>
          <div className="agency-list">
            {agencies.map((agency) => (
              <Link href={"/agencies/" + agency.slug} key={agency.slug}>
                <span className="agency-monogram" aria-hidden="true">{agency.shortName.slice(0, 3)}</span>
                <span>
                  <strong>{agency.shortName}</strong>
                  <small>{agency.name}</small>
                </span>
                <span className="agency-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

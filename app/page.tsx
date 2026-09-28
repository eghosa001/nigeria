import Link from "next/link";
import { ServiceSearch } from "@/components/search";
import { RouteWizard } from "@/components/route-wizard";
import { myNigeriaGuideUpdates, updateTypeLabel } from "@/data/updates";
import { agencies, publicServices } from "@/lib/data";

const popular = [
  { label: "Passport", href: "/services/passport-renewal" },
  { label: "NIN", href: "/categories/identity" },
  { label: "BVN", href: "/categories/banking" },
  { label: "Foreign visas", href: "/categories/foreign-visas" },
  { label: "Nigeria travel", href: "/categories/international-travel" },
  { label: "JAMB", href: "/categories/education" },
  { label: "Driver's licence", href: "/categories/driving" },
  { label: "CAC", href: "/categories/business" },
];

export default function HomePage() {
  const verifiedCount = publicServices.filter((service) => service.status === "verified").length;

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="hero-kicker-dot" aria-hidden="true" />
              Independent Nigerian service guide
            </div>
            <h1>Get government services done with <span>clearer steps.</span></h1>
            <p className="hero-lead">
              Current fees, requirements, online and physical routes, official portals and what happens next — explained in plain language.
            </p>
            <ServiceSearch services={publicServices} />
            <div className="hero-popular" aria-label="Popular guides">
              <span>Popular</span>
              {popular.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </div>
            <p className="hero-note">
              MyNigeriaGuide never collects government payments. Transactions happen only on the official channels we link to.
            </p>
          </div>

          <aside className="trust-panel" aria-label="MyNigeriaGuide verification">
            <div className="trust-panel-top">
              <span className="trust-kicker">Verification snapshot</span>
              <span className="trust-live"><i aria-hidden="true" />Live</span>
            </div>
            <strong>{verifiedCount} published guides</strong>
            <p>Every public guide keeps its responsible agency, official sources and last-checked date visible.</p>
            <div className="trust-metrics">
              <div><strong>{agencies.length}</strong><span>agency groups</span></div>
              <div><strong>0</strong><span>public conflicts</span></div>
            </div>
            <div className="trust-row"><span>✓</span><div><strong>Official sources first</strong><small>Direct agency links stay visible.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>Online vs physical made clear</strong><small>Know where each process actually starts.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>No unofficial payment buttons</strong><small>We do not collect government fees.</small></div></div>
          </aside>
        </div>
      </section>

      <section className="proof-strip" aria-label="Why use MyNigeriaGuide">
        <div className="container proof-grid">
          <div><span aria-hidden="true">01</span><strong>Know what to prepare</strong><small>Documents and eligibility before you start.</small></div>
          <div><span aria-hidden="true">02</span><strong>Choose the right route</strong><small>Online, physical or a combination of both.</small></div>
          <div><span aria-hidden="true">03</span><strong>Pay only where official</strong><small>Source-linked fees and official payment routes.</small></div>
          <div><span aria-hidden="true">04</span><strong>Know what happens next</strong><small>Follow-up, collection and support guidance.</small></div>
        </div>
      </section>

      <section className="section home-category-shortcuts">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Browse directly</span>
              <h2>Go straight to the service area you need.</h2>
            </div>
            <Link href="/services">See all services →</Link>
          </div>
          <div className="home-category-grid">
            <Link className="home-category-card visa-card" href="/categories/foreign-visas"><span>Travel abroad</span><strong>Foreign visas</strong><small>UK, US, Canada, Schengen, UAE, South Africa, China and more.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/international-travel"><span>Travel to / from Nigeria</span><strong>Nigeria travel</strong><small>Nigeria visas, Yellow Card, ECOWAS certificate and border forms.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/identity"><span>Identity</span><strong>NIN services</strong><small>Enrolment, corrections and NIN slip services.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/banking"><span>Banking identity</span><strong>BVN services</strong><small>Get, retrieve or correct BVN and use BVN from abroad.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/education"><span>Education</span><strong>JAMB, WAEC & NECO</strong><small>Registration, results, certificates and admission processes.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/youth-service"><span>Youth service</span><strong>NYSC</strong><small>Registration, mobilisation, relocation and certificates.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/business"><span>Business</span><strong>CAC services</strong><small>Business names, companies and corporate filings.</small><i>→</i></Link>
            <Link className="home-category-card" href="/categories/driving"><span>Driving</span><strong>Driver's licence</strong><small>New, renewal, reissue and class changes.</small><i>→</i></Link>
          </div>
        </div>
      </section>

      <section className="section service-discovery-section">
        <div className="container">
          <RouteWizard services={publicServices} />
        </div>
      </section>

      <section className="section premium-dark-section">
        <div className="container">
          <div className="section-heading section-heading-light">
            <div>
              <span className="eyebrow">Verified updates</span>
              <h2>Know when the process changes.</h2>
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
            <h2>Built around the agency responsible.</h2>
            <p>We do not pretend to be the authority. Every guide sends you back to the official agency for applications, payments and final decisions.</p>
            <Link className="text-link" href="/offices">Find official offices and centres →</Link>
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

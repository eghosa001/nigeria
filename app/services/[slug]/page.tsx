import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { AD_SLOTS } from "@/lib/adsense-config";
import { AnswerFirst } from "@/components/answer-first";
import { getServiceSeoDescriptionOverride, getServiceSeoTitleOverride } from "@/data/service-seo-overrides";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CorrectionReport } from "@/components/correction-report";
import { JsonLd } from "@/components/json-ld";
import { ShareWatch } from "@/components/share-watch";
import { ServiceJourney } from "@/components/service-journey";
import { ServiceContext } from "@/components/service-context";
import { ServiceRequirements } from "@/components/service-requirements";
import { ServiceSteps } from "@/components/service-steps";
import { ProcessTracker } from "@/components/process-tracker";
import { ServiceStatusStrip } from "@/components/service-status-strip";
import { ServiceSearchAnswers } from "@/components/service-search-answers";
import { ServiceFaqs } from "@/components/service-faqs";
import { ForeignVisaFaqs } from "@/components/foreign-visa-faqs";
import { ServiceAftercare } from "@/components/service-aftercare";
import { GuideQuickNav } from "@/components/guide-quick-nav";
import { StatusBadge } from "@/components/status-badge";
import { categorySlug } from "@/lib/category";
import { getAgency, getPublicService, publicServices } from "@/lib/data";
import { getOfficialServiceLinks } from "@/lib/official-links";
import { getGrowthHubsForService } from "@/lib/growth-hubs";
import { getRelatedServices, getRelatedServiceReason } from "@/lib/internal-links";
import { getServiceSearchAnswers } from "@/lib/search-answers";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return publicServices.map((service) => ({ slug: service.slug }));
}

function normalizeMetadataText(value: string) {
  return value.replace(/'/g, "’").replace(/\s+/g, " ").trim();
}

function truncateMetadataText(value: string, maxLength: number) {
  const normalized = normalizeMetadataText(value);
  if (normalized.length <= maxLength) return normalized;

  const shortened = normalized.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return (lastSpace > Math.floor(maxLength * 0.7) ? shortened.slice(0, lastSpace) : shortened).trimEnd() + "…";
}

function getServiceSeoTitle(shortTitle: string, fullTitle: string, lastVerified: string) {
  const year = lastVerified.slice(0, 4);
  const normalizedShort = normalizeMetadataText(shortTitle);
  const shortHasYear = new RegExp("\\b" + year + "\\b").test(normalizedShort);
  const compact = `${normalizedShort}${shortHasYear ? "" : " " + year}: Fees & Steps`;
  if (compact.length >= 30) return truncateMetadataText(compact, 60);

  const normalizedFull = normalizeMetadataText(fullTitle);
  const fullHasYear = new RegExp("\\b" + year + "\\b").test(normalizedFull);
  return truncateMetadataText(
    `${normalizedFull}${fullHasYear ? "" : " " + year}: Official Guide`,
    60,
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getPublicService(slug);
  if (!service) return {};

  const year = service.lastVerified.slice(0, 4);
  const title = truncateMetadataText(
    getServiceSeoTitleOverride(service.slug, year) ??
      getServiceSeoTitle(service.shortTitle, service.title, service.lastVerified),
    60,
  );
  const summary = normalizeMetadataText(service.summary);
  const description = truncateMetadataText(
    getServiceSeoDescriptionOverride(service.slug, year) ??
      (summary.length >= 110
        ? `${summary} Verified ${year}.`
        : `${summary} Updated ${year}: current requirements, fees/status, steps and official application links.`),
    155,
  );

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/services/" + service.slug },
    openGraph: {
      title,
      description,
      type: "article",
      url: "/services/" + service.slug,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getPublicService(slug);
  if (!service) notFound();

  const officialLinks = getOfficialServiceLinks(service);
  const primaryOfficialLink = officialLinks.actionUrl && officialLinks.actionLabel
    ? { url: officialLinks.actionUrl, label: officialLinks.actionLabel }
    : officialLinks.guidanceUrl && officialLinks.guidanceLabel
      ? { url: officialLinks.guidanceUrl, label: officialLinks.guidanceLabel }
      : undefined;

  const agency = getAgency(service.agencySlug);
  const related = getRelatedServices(service, 6);
  const topicHubs = getGrowthHubsForService(service.slug).slice(0, 2);
  const topicSearches = topicHubs
    .flatMap((hub) => hub.searches)
    .filter((item) => item.serviceSlug !== service.slug)
    .filter((item) => !related.some((candidate) => candidate.slug === item.serviceSlug))
    .filter((item, index, items) => items.findIndex((candidate) => candidate.serviceSlug === item.serviceSlug) === index)
    .slice(0, 3);
  const searchAnswers = getServiceSearchAnswers(service);
  const base = getSiteUrl();
  const pageUrl = base + "/services/" + service.slug;
  const categoryHref = "/categories/" + categorySlug(service.category);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.category, href: categoryHref },
    { label: service.shortTitle },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Services", item: base + "/services" },
      { "@type": "ListItem", position: 3, name: service.category, item: base + categoryHref },
      { "@type": "ListItem", position: 4, name: service.shortTitle, item: pageUrl },
    ],
  };

  const webpageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: service.title,
    description: service.summary,
    url: pageUrl,
    dateModified: service.lastVerified,
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
    about: agency ? { "@type": "Thing", name: agency.name, url: agency.website } : undefined,
    spatialCoverage: { "@type": "Country", name: "Nigeria" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: searchAnswers.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, webpageLd, faqLd]} />
      <section className="guide-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <div className="guide-hero-grid">
            <div>
              <div className="guide-meta">
                <Link href={categoryHref}>{service.category}</Link>
                <span>•</span>
                <span>{agency?.shortName}</span>
              </div>
              <h1>{service.title}</h1>
              <p>{service.summary}</p>
              <p className="hero-note">
                Applies to Nigeria · Responsible agency: {agency?.name ?? service.agencySlug.toUpperCase()} · Verified {service.lastVerified}
              </p>
              <div className="guide-badges">
                <StatusBadge status={service.status} />
                <span className="checked-date">Checked {service.lastVerified}</span>
              </div>
              <ShareWatch slug={service.slug} title={service.title} feeLabel={service.feeLabel} lastVerified={service.lastVerified} />
            </div>
            <aside className="fee-card">
              <span>Current fee / status · checked {service.lastVerified}</span>
              <strong>{service.feeLabel}</strong>
              {service.feeNote ? <p>{service.feeNote}</p> : null}
              {primaryOfficialLink ? (
                <a className="button official-service-link" href={primaryOfficialLink.url} target="_blank" rel="noreferrer">
                  {primaryOfficialLink.label}
                </a>
              ) : null}
              <small>MyNigeriaGuide does not collect this payment.</small>
            </aside>
          </div>
          <ServiceStatusStrip service={service} />
          <AnswerFirst
            title={"What you need to know about " + service.shortTitle}
            summary={service.summary}
            facts={[
              { label: "Applies to", value: "Nigeria · " + service.category },
              { label: "Responsible agency", value: agency?.name ?? service.agencySlug.toUpperCase() },
              { label: "Current fee / status", value: service.feeLabel + " · checked " + service.lastVerified },
              { label: "Timeline", value: service.timeline ?? "No fixed official timeline published" },
            ]}
            links={[
              { href: "#requirements", label: "See requirements" },
              { href: "#steps", label: "See the steps" },
              ...(primaryOfficialLink ? [{ href: primaryOfficialLink.url, label: primaryOfficialLink.label, external: true, primary: true }] : []),
            ]}
            note={"Verified " + service.lastVerified + ". Read the quick answer first, then use the detailed guide only for the parts you need."}
          />
          {(service.slug === "cac-business-name-registration" || service.slug === "cac-company-registration") ? (
            <section className="service-topic-links" aria-label="Choose the correct CAC registration">
              <h2>Business name or limited company?</h2>
              <p>
                {service.slug === "cac-business-name-registration"
                  ? "This guide covers registering a business name with proprietor details. It does not incorporate a limited company, which has different filing requirements and charges."
                  : "This guide covers incorporating a company with company and officer details. Registering a business name as a proprietor is a different CAC application."}
              </p>
              <div className="related-links">
                <Link href={service.slug === "cac-business-name-registration"
                  ? "/services/cac-company-registration"
                  : "/services/cac-business-name-registration"}>
                  {service.slug === "cac-business-name-registration"
                    ? "Need a limited company instead? See company registration →"
                    : "Only registering a business name? See that process →"}
                </Link>
              </div>
            </section>
          ) : null}
        </div>
      </section>

      <div className="container">
        <AdSlot slot={AD_SLOTS.serviceAfterAnswer} label="Advertisement" />
      </div>

      {service.status === "conflict" ? (
        <div className="container conflict-alert">
          <strong>Confirm current details before payment</strong>
          <p>Two official pages currently differ on this detail. Use the latest linked official payment or application channel to confirm the amount before paying.</p>
        </div>
      ) : null}

      <section className="section guide-main-section">
        <div className="container guide-layout">
          <article className="guide-content">
            <GuideQuickNav />

            <ProcessTracker service={service} />

            <ServiceJourney service={service} />

            <ServiceContext service={service} />

            <ServiceRequirements service={service} />

            <ServiceSteps service={service} />

            <ServiceAftercare service={service} />

            <ServiceSearchAnswers service={service} />

            <AdSlot slot={AD_SLOTS.serviceMid} label="Advertisement" />

            <section id="notes">
              <span className="section-number" aria-hidden="true">03</span>
              <h2>Important notes about {service.shortTitle}</h2>
              <ul>{service.notes.map((note) => <li key={note}>{note}</li>)}</ul>
            </section>

            <ServiceFaqs service={service} />

            <ForeignVisaFaqs service={service} />

            <section id="official-sources">
              <span className="section-number" aria-hidden="true">05</span>
              <h2>Official {agency?.shortName ?? service.agencySlug.toUpperCase()} sources for {service.shortTitle}</h2>
              <p className="source-intro">These government or agency pages were used to verify {service.shortTitle}. This guide was last reviewed on {service.lastVerified}; the official source takes priority if a live detail changes.</p>
              <div className="source-list">
                {service.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                    <span><strong>{source.label}</strong><small>{source.agency}</small></span>
                    <span>Checked {source.lastChecked} ↗</span>
                  </a>
                ))}
              </div>
            </section>

            <CorrectionReport serviceSlug={service.slug} />
          </article>

          <aside className="guide-sidebar">
            <div className="sidebar-card sidebar-agency">
              <span>Responsible agency</span>
              <strong>{agency?.name}</strong>
              {agency ? <Link href={"/agencies/" + agency.slug}>View agency guides →</Link> : null}
            </div>
            <div className="sidebar-card">
              <span>Compare fees</span>
              <strong>Check the verified fee directory.</strong>
              <Link href="/fees">View government fees →</Link>
            </div>
            <div className="sidebar-card">
              <span>Need an office?</span>
              <strong>Use live official location directories.</strong>
              <Link href="/offices">Find offices and centres →</Link>
            </div>
            <div className="sidebar-card safety-card">
              <span>Payment safety</span>
              <strong>Pay only through the responsible agency.</strong>
              <p>MyNigeriaGuide never collects government application fees or asks for your password, card PIN or NIN.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section related-section">
        <div className="container">
          <div className="category-return">
            <Link href={categoryHref}>← Back to all {service.category} guides</Link>
            <Link href="/services">Browse all services →</Link>
          </div>
          {topicHubs.length ? (
            <div className="service-topic-links">
              <span className="eyebrow">Explore the full topic</span>
              <div className="related-links">
                {topicHubs.map((hub) => (
                  <Link key={hub.slug} href={"/topics/" + hub.slug}>
                    {hub.title} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
          {topicSearches.length ? (
            <div className="service-topic-links">
              <span className="eyebrow">Other helpful questions</span>
              <div className="related-links">
                {topicSearches.map((item) => (
                  <Link key={item.query} href={"/services/" + item.serviceSlug}>
                    {item.query} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
          {related.length ? (
            <>
              <span className="eyebrow">Next steps &amp; alternatives</span>
              <h2>Services related to {service.shortTitle}</h2>
              <div className="related-links">
                {related.map((item) => <Link key={item.slug} href={"/services/" + item.slug}><strong>{item.shortTitle}</strong> · {getRelatedServiceReason(service, item)} <span aria-hidden="true">→</span></Link>)}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}

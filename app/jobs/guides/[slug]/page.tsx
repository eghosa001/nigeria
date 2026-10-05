import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { careerGuides, getCareerGuide } from "@/lib/career-guides";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return careerGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getCareerGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.description,
    alternates: { canonical: "/jobs/guides/" + guide.slug },
  };
}

export default async function CareerGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getCareerGuide(slug);
  if (!guide) notFound();

  const base = getSiteUrl();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.reviewedAt,
    mainEntityOfPage: base + "/jobs/guides/" + guide.slug,
    publisher: { "@type": "Organization", name: "MyNigeriaGuide", url: base },
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="section page-top jobs-section-top">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Jobs & Careers", href: "/jobs" },
            { label: guide.title },
          ]} />
          <span className="eyebrow">Career guide · reviewed {guide.reviewedAt}</span>
          <h1>{guide.title}</h1>
          <p className="page-intro">{guide.summary}</p>
          <AnswerFirst
            title="The short answer"
            summary={guide.answer}
            facts={guide.facts}
            links={[
              { href: "#guide", label: "Read the full guide", primary: true },
              ...guide.relatedLinks.slice(0, 2),
            ]}
            note={"Reviewed " + guide.reviewedAt + ". Employer-specific instructions always override general application advice."}
          />
        </div>
      </section>

      <section className="section" id="guide">
        <div className="container job-detail-layout">
          <article className="job-detail-content">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets?.length ? <ul className="checklist">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
              </section>
            ))}
            <section>
              <h2>Sources and verification context</h2>
              <p>These sources support the application-process guidance and provide official examples. Always follow the instructions on the exact vacancy you are applying for.</p>
              <div className="job-source-list">
                {guide.sources.map((source) => (
                  <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                    <strong>{source.label}</strong><span>Checked {source.lastChecked} ↗</span>
                  </a>
                ))}
              </div>
            </section>
          </article>
          <aside className="job-detail-sidebar">
            <div className="job-sidebar-card">
              <strong>Use this guide with a real vacancy</strong>
              <p>Generic advice becomes useful only after you compare it with the employer's published requirements.</p>
              <p>Do not pay for a shortlist, interview slot or appointment.</p>
            </div>
            {guide.relatedLinks.map((link) => <Link href={link.href} className="job-sidebar-link" key={link.href}>{link.label} →</Link>)}
          </aside>
        </div>
      </section>
    </>
  );
}

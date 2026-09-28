import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceCard } from "@/components/service-card";
import { agencies, getAgency, getServicesByAgency } from "@/lib/data";

export function generateStaticParams() {
  return agencies.map((agency) => ({ slug: agency.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agency = getAgency(slug);
  if (!agency) return {};
  return { title: agency.shortName + " services", description: agency.description };
}

export default async function AgencyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agency = getAgency(slug);
  if (!agency) notFound();
  const agencyServices = getServicesByAgency(slug);

  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Official agency</span>
        <h1>{agency.name}</h1>
        <p className="page-intro">{agency.description}</p>
        <a className="text-link" href={agency.website} target="_blank" rel="noreferrer">Visit official website ↗</a>
        <div className="service-grid top-gap">
          {agencyServices.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
      </div>
    </section>
  );
}

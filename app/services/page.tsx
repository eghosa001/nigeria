import type { Metadata } from "next";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Government service directory",
  description: "Browse GovGuide Nigeria's source-linked government service guides.",
};

export default function ServicesPage() {
  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Directory</span>
        <h1>Government service guides</h1>
        <p className="page-intro">The directory starts small by design: publish verified guides first, then expand.</p>
        <div className="service-grid top-gap">
          {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
      </div>
    </section>
  );
}

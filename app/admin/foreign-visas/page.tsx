import type { Metadata } from "next";
import Link from "next/link";
import { publicServices } from "@/lib/data";

export const metadata: Metadata = { title: "Foreign visas" };

export default function AdminForeignVisasPage() {
  const visas = publicServices.filter((service) => service.category === "Foreign visas");

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">International travel</span>
            <h1>Foreign visa centre</h1>
            <p className="page-intro">Review destination coverage, fees, requirements, timelines and source depth without opening each public page first.</p>
          </div>
          <Link className="button inline-button" href="/categories/foreign-visas">Public visa directory ↗</Link>
        </div>

        <div className="admin-visa-grid">
          {visas.map((visa) => (
            <Link href={"/admin/services/" + visa.slug} key={visa.slug}>
              <span>{visa.agencySlug.toUpperCase()}</span>
              <strong>{visa.shortTitle}</strong>
              <small>{visa.feeLabel}</small>
              <div>
                <em>{visa.requirements.length} requirements</em>
                <em>{visa.sources.length} sources</em>
                <em>{visa.timeline ? "timeline set" : "no fixed timeline"}</em>
              </div>
              <i>Review guide →</i>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

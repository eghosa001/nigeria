import type { Metadata } from "next";
import { AdminServiceDirectory } from "@/components/admin-service-directory";
import { services } from "@/lib/data";

export const metadata: Metadata = { title: "Guides" };

export default function AdminServicesPage() {
  return (
    <section className="section page-top admin-page">
      <div className="container">
        <span className="eyebrow">Content library</span>
        <h1>All service guides</h1>
        <p className="page-intro">Search the full public and review library. Open any row to inspect its documents, steps, notes and official sources.</p>
        <AdminServiceDirectory services={services} />
      </div>
    </section>
  );
}

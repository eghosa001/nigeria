import type { Metadata } from "next";
import { AdminVisitsInsights } from "@/components/admin-visits-insights";
import { AdminVisitsMore } from "@/components/admin-visits-more";

export const metadata: Metadata = { title: "Visits & search analytics" };

export default function AdminVisitsPage() {
  return (
    <section className="section page-top admin-page">
      <div className="container">
        <span className="eyebrow">Audience & search analytics</span>
        <h1>Visits, impressions & growth</h1>
        <p className="page-intro">Compare 1 day, 7 days, 30 days, 90 days and all available history. Explore what appears in Google, what gets clicked, which pages receive views and how performance is changing.</p>
        <AdminVisitsInsights />
        <AdminVisitsMore />
      </div>
    </section>
  );
}

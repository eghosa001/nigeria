import type { Metadata } from "next";
import { AdminSearchConsoleOnDemand } from "@/components/admin-search-console-on-demand";
import { AdminAnalyticsDashboard } from "@/components/admin-analytics-dashboard";

export const metadata: Metadata = { title: "Visits" };

export default function AdminVisitsPage() {
  return (
    <section className="section page-top admin-page">
      <div className="container">
        <span className="eyebrow">Audience analytics</span>
        <h1>Visits & page views</h1>
        <p className="page-intro">View visitors, search reach and top content in one report. Detailed diagnostics are available on demand.</p>
        <AdminAnalyticsDashboard />
        <AdminSearchConsoleOnDemand />
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { AdminSearchConsoleStatus } from "@/components/admin-search-console-status";
import { AdminAnalyticsDashboard } from "@/components/admin-analytics-dashboard";

export const metadata: Metadata = { title: "Visits" };

export default function AdminVisitsPage() {
  return (
    <section className="section page-top admin-page">
      <div className="container">
        <span className="eyebrow">Audience analytics</span>
        <h1>Visits & page views</h1>
        <p className="page-intro">See aggregate website traffic, where visitors come from, which pages they view and how they reached MyNigeriaGuide. Analytics data is kept behind a separate admin passphrase.</p>
        <AdminSearchConsoleStatus />
        <AdminAnalyticsDashboard />
      </div>
    </section>
  );
}

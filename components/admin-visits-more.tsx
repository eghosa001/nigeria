"use client";

import { useState } from "react";
import { AdminAnalyticsDashboard } from "@/components/admin-analytics-dashboard";
import { AdminSearchConsoleOnDemand } from "@/components/admin-search-console-on-demand";

export function AdminVisitsMore() {
  const [open, setOpen] = useState(false);
  return <section className="admin-panel visits-more">
    <button type="button" className="visits-more-toggle" aria-expanded={open}
      onClick={() => setOpen((value) => !value)}>
      {open ? "− Close source diagnostics & visitor actions" : "+ Open detailed source diagnostics, visitor actions and acquisition"}
    </button>
    {open ? <div className="visits-more-content">
      <AdminAnalyticsDashboard />
      <AdminSearchConsoleOnDemand />
    </div> : null}
  </section>;
}

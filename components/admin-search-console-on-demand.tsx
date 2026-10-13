"use client";

import { useState } from "react";
import { AdminSearchConsoleStatus } from "@/components/admin-search-console-status";

/** Avoid a second GSC API request on every Visits page load. */
export function AdminSearchConsoleOnDemand() {
  const [open, setOpen] = useState(false);
  return (
    <section className="admin-gsc-on-demand">
      <button type="button" className="admin-refresh-button" aria-expanded={open}
        aria-controls="admin-on-demand-gsc" onClick={() => setOpen((value) => !value)}>
        {open ? "Hide Google connection check" : "Check Google connection"}
      </button>
      {open ? <div id="admin-on-demand-gsc"><AdminSearchConsoleStatus /></div> : null}
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import type { OfficeDirectory } from "@/lib/offices";

export function OfficeFinder({ directories }: { directories: OfficeDirectory[] }) {
  const [query, setQuery] = useState("");
  const [agency, setAgency] = useState("all");
  const agencies = useMemo(() => [...new Set(directories.map((item) => item.agency))].sort(), [directories]);
  const rows = useMemo(() => directories.filter((item) => {
    const agencyOk = agency === "all" || item.agency === agency;
    const q = query.trim().toLowerCase();
    const searchOk = !q || [item.agency,item.service,item.coverage,item.description].join(" ").toLowerCase().includes(q);
    return agencyOk && searchOk;
  }), [directories, query, agency]);
  return (
    <>
      <div className="office-controls">
        <label><span>Search service or location type</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="BVN, passport, JAMB, Yellow Card…" /></label>
        <label><span>Agency</span><select value={agency} onChange={(event) => setAgency(event.target.value)}><option value="all">All agencies</option>{agencies.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
      </div>
      <div className="directory-summary"><strong>{rows.length}</strong> official route{rows.length === 1 ? "" : "s"} shown</div>
      {rows.length ? <div className="office-grid">{rows.map((directory) => <article className="office-card" key={directory.agency + directory.service}><span>{directory.coverage}</span><h2>{directory.service}</h2><strong>{directory.agency}</strong><p>{directory.description}</p><a href={directory.directoryUrl} target="_blank" rel="noreferrer">Open official route ↗</a><small>{directory.sourceLabel} · checked {directory.checked}</small></article>)}</div> : <div className="empty-state"><strong>No matching official route.</strong><p>Try the agency name or a broader service term.</p></div>}
    </>
  );
}

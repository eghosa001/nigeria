import type { Metadata } from "next";
import sourceMonitors from "@/data/source-monitors.json";
import { services } from "@/lib/data";

export const metadata: Metadata = { title: "Sources" };

export default function AdminSourcesPage() {
  const sourceMap = new Map<string, { label: string; agency: string; lastChecked: string; usedBy: string[] }>();

  for (const service of services) {
    for (const source of service.sources) {
      const row = sourceMap.get(source.url) ?? { label: source.label, agency: source.agency, lastChecked: source.lastChecked, usedBy: [] };
      row.usedBy.push(service.shortTitle);
      sourceMap.set(source.url, row);
    }
  }

  const sources = [...sourceMap.entries()].sort((a, b) => b[1].usedBy.length - a[1].usedBy.length || a[1].label.localeCompare(b[1].label));
  const monitored = new Set(sourceMonitors.map((monitor) => monitor.url));

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <span className="eyebrow">Verification</span>
        <h1>Official source registry</h1>
        <p className="page-intro">{sources.length} unique source URLs support the guide library. {monitored.size} high-value pages also have automatic content monitors.</p>

        <div className="admin-source-registry">
          {sources.map(([url, source]) => (
            <a href={url} target="_blank" rel="noreferrer" key={url}>
              <span className={monitored.has(url) ? "source-monitor-badge monitored" : "source-monitor-badge"}>{monitored.has(url) ? "Monitored" : "Source"}</span>
              <strong>{source.label}</strong>
              <span>{source.agency}</span>
              <small>{source.usedBy.length} guide{source.usedBy.length === 1 ? "" : "s"} · checked {source.lastChecked}</small>
              <i>Open official source ↗</i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

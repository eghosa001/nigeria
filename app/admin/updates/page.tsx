import type { Metadata } from "next";
import Link from "next/link";
import { myNigeriaGuideUpdates, updateTypeLabel } from "@/data/updates";

export const metadata: Metadata = { title: "Updates" };

export default function AdminUpdatesPage() {
  return (
    <section className="section page-top admin-page">
      <div className="container">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">Publishing</span>
            <h1>Verified updates</h1>
            <p className="page-intro">Review the source-linked changes currently surfaced in the public updates feed.</p>
          </div>
          <Link className="button inline-button" href="/updates">Public updates ↗</Link>
        </div>

        <div className="admin-update-list">
          {myNigeriaGuideUpdates.map((update) => (
            <article key={update.id}>
              <div><span>{updateTypeLabel(update.type)}</span><time dateTime={update.date}>{update.date}</time></div>
              <h2>{update.title}</h2>
              <p>{update.summary}</p>
              <footer>
                <a href={update.sourceUrl} target="_blank" rel="noreferrer">{update.sourceLabel} ↗</a>
                <small>{update.affectedServices.length} affected guide{update.affectedServices.length === 1 ? "" : "s"}</small>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

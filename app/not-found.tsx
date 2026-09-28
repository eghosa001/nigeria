import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section page-top">
      <div className="container narrow">
        <span className="eyebrow">404</span>
        <h1>Guide not found</h1>
        <p className="page-intro">This guide may not be published yet.</p>
        <Link className="button inline-button" href="/services">Browse available services</Link>
      </div>
    </section>
  );
}

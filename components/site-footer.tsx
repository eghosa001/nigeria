import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true">G</span>
            <span><strong>GovGuide</strong><small>Nigeria</small></span>
          </div>
          <p>Independent guidance for Nigerian public services. We are not a government agency.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <Link href="/services">Service directory</Link>
          <Link href="/about">Verification policy</Link>
        </div>
        <div>
          <strong>Safety</strong>
          <p>Always confirm payment on the linked official government portal before paying.</p>
        </div>
      </div>
    </footer>
  );
}

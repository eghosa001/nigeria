import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="GovGuide Nigeria home">
          <span className="brand-mark" aria-hidden="true">G</span>
          <span>
            <strong>GovGuide</strong>
            <small>Nigeria</small>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/services">All services</Link>
          <Link href="/about">How verification works</Link>
        </nav>
      </div>
    </header>
  );
}

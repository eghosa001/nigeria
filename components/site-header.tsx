import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="GovGuide Nigeria home">
          <span className="brand-mark" aria-hidden="true">G</span>
          <span>
            <strong>GovGuide</strong>
            <small>Nigeria</small>
          </span>
        </Link>
        <nav className="primary-nav" aria-label="Primary navigation">
          <Link href="/services">Services</Link>
          <Link className="nav-offices" href="/offices">Offices</Link>
          <Link href="/assistant">Assistant</Link>
          <Link href="/saved">Saved</Link>
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true">G</span>
            <span><strong>MyNigeriaGuide</strong><small>Nigeria</small></span>
          </div>
          <p>Independent guidance for Nigerian public services. We are not a government agency.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <Link href="/services">Service directory</Link>
          <Link href="/fees">Government fee directory</Link>
          <Link href="/updates">Verified service updates</Link>
          <Link href="/offices">Official office finders</Link>
          <Link href="/assistant">Guide assistant</Link>
          <Link href="/saved">Saved guides</Link>
        </div>
        <div>
          <strong>Trust & policies</strong>
          <Link href="/about">Verification policy</Link>
          <Link href="/editorial-policy">Editorial policy</Link>
          <Link href="/corrections">Corrections</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <strong>Safety</strong>
          <p>Always confirm payment on the linked official government portal before paying. MyNigeriaGuide does not collect government fees.</p>
        </div>
      </div>
    </footer>
  );
}

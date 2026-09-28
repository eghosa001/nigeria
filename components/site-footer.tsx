import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-intro">
          <div className="brand footer-brand"><BrandLogo footer /></div>
          <p>Independent, source-linked guidance for Nigerian public services. We explain the process; the responsible agency remains the official authority.</p>
          <div className="footer-trust">
            <span>Independent guide</span>
            <span>Official links only</span>
            <span>No government fees collected</span>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <strong>Explore</strong>
            <Link href="/services">Service directory</Link>
            <Link href="/fees">Government fee directory</Link>
            <Link href="/updates">Verified updates</Link>
            <Link href="/offices">Official office finders</Link>
          </div>
          <div>
            <strong>Tools</strong>
            <Link href="/assistant">Guide finder</Link>
            <Link href="/saved">Saved guides</Link>
            <Link href="/categories/education">Education</Link>
            <Link href="/categories/identity">Identity</Link>
          </div>
          <div>
            <strong>Trust & policies</strong>
            <Link href="/about">How verification works</Link>
            <Link href="/editorial-policy">Editorial policy</Link>
            <Link href="/corrections">Corrections</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getUTCFullYear()} MyNigeriaGuide</span>
        <span>Not affiliated with the Government of Nigeria or any government agency.</span>
      </div>
    </footer>
  );
}

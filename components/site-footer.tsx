import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-intro">
          <div className="brand footer-brand"><BrandLogo footer /></div>
          <p>Independent, source-linked guidance for Nigerian services, travel and entertainment. Applications, payments, bookings and playback stay with the responsible official provider.</p>
          <div className="footer-trust">
            <span>Independent guide</span>
            <span>Sources stay visible</span>
            <span>No government fees collected</span>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <strong>MyNigeriaGuide</strong>
            <Link href="/services">Service Guide</Link>
            <Link href="/explore">Explore Nigeria</Link>
            <Link href="/entertainment">Movies &amp; Entertainment</Link>
            <Link href="/assistant">Find a guide</Link>
            <Link href="/saved">Saved guides</Link>
          </div>
          <div>
            <strong>Useful links</strong>
            <Link href="/fees">Fees</Link>
            <Link href="/updates">Verified updates</Link>
            <Link href="/offices">Official offices</Link>
            <Link href="/official-portals">Official portals</Link>
            <Link href="/categories/foreign-visas">Foreign visas</Link>
          </div>
          <div>
            <strong>Trust &amp; policies</strong>
            <Link href="/about">How verification works</Link>
            <Link href="/editorial-policy">Editorial policy</Link>
            <Link href="/corrections">Corrections</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
            <a href="mailto:contact@mynigeriaguide.com">contact@mynigeriaguide.com</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getUTCFullYear()} MyNigeriaGuide</span>
        <span>Independent guide. Not affiliated with the Government of Nigeria or any government agency.</span>
      </div>
    </footer>
  );
}

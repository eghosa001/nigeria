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
            <Link href="/services">Services</Link>
            <Link href="/fees">Fees</Link>
            <Link href="/updates">Updates</Link>
            <Link href="/offices">Offices</Link>
            <Link href="/saved">Saved</Link>
            <Link href="/assistant">Find a guide</Link>
          </div>
          <div>
            <strong>Popular categories</strong>
            <Link href="/categories/banking">Banking & BVN</Link>
            <Link href="/categories/international-travel">International travel</Link>
            <Link href="/categories/identity">Identity & NIN</Link>
            <Link href="/categories/education">Education</Link>
            <Link href="/categories/business">Business</Link>
            <Link href="/categories/driving">Driving</Link>
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

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="site-footer minimal-footer">
      <div className="container minimal-footer-top">
        <div className="footer-intro">
          <div className="brand footer-brand"><BrandLogo footer /></div>
          <p>Movies, services, places and careers across Nigeria — organised into four clear pillars with direct links to responsible sources when you are ready to act.</p>
        </div>

        <div className="minimal-footer-links footer-grid">
          <div>
            <strong>Four pillars</strong>
            <Link href="/entertainment">Movies & Entertainment</Link>
            <Link href="/services">Services Guide</Link>
            <Link href="/explore">Tour Nigeria</Link>
            <Link href="/jobs">Jobs & Careers</Link>
          </div>
          <div>
            <strong>Useful</strong>
            <Link href="/search">Search the whole site</Link>
            <Link href="/assistant">Find a service guide</Link>
            <Link href="/saved">Saved</Link>
            <Link href="/fees">Fees</Link>
            <Link href="/latest">Latest additions</Link>
            <Link href="/offices">Official offices</Link>
            <Link href="/locations">Service locations by city</Link>
          </div>
          <div>
            <strong>About</strong>
            <Link href="/about">About</Link>
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
        <span>Independent guide. Not affiliated with the Government of Nigeria.</span>
      </div>
    </footer>
  );
}

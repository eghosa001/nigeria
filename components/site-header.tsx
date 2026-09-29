"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const navigation = [
  { href: "/services", label: "Services", matches: ["/services", "/categories", "/topics", "/agencies", "/official-portals"] },
  { href: "/explore", label: "Explore Nigeria", matches: ["/explore"] },
  { href: "/entertainment", label: "Entertainment", matches: ["/entertainment"] },
  { href: "/fees", label: "Fees", matches: ["/fees"] },
  { href: "/offices", label: "Offices", matches: ["/offices"] },
  { href: "/updates", label: "Updates", matches: ["/updates"] },
  { href: "/offices", label: "Offices", matches: ["/offices"] },
  { href: "/saved", label: "Saved", matches: ["/saved"] },
  { href: "/assistant", label: "Find a guide", matches: ["/assistant"] },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="container header-inner">
        <a className="brand brand-home-link" href="/" aria-label="MyNigeriaGuide home" onClick={() => setOpen(false)}>
          <BrandLogo />
        </a>

        <button
          className={"menu-toggle" + (open ? " is-open" : "")}
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-navigation" className={"primary-nav" + (open ? " is-open" : "")} aria-label="Primary navigation">
          {navigation.map((item) => {
            const active = item.matches.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "nav-active" : undefined}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

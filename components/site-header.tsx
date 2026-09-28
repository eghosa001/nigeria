"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const navigation = [
  { href: "/categories/foreign-visas", label: "Foreign visas" },
  { href: "/services", label: "All services" },
  { href: "/fees", label: "Fees" },
  { href: "/offices", label: "Offices" },
  { href: "/updates", label: "Updates" },
  { href: "/assistant", label: "Find a guide" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
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

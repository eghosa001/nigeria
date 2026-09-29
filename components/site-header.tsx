"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const primaryNavigation = [
  {
    href: "/services",
    label: "Services",
    matches: ["/services", "/categories", "/topics", "/agencies", "/official-portals", "/fees", "/offices", "/updates"],
  },
  { href: "/explore", label: "Explore Nigeria", matches: ["/explore"] },
  { href: "/entertainment", label: "Entertainment", matches: ["/entertainment"] },
];

const sectionNavigation = {
  services: {
    label: "Services guide",
    links: [
      { href: "/services", label: "Overview" },
      { href: "/fees", label: "Fees" },
      { href: "/offices", label: "Offices" },
      { href: "/official-portals", label: "Official portals" },
      { href: "/updates", label: "Updates" },
    ],
  },
  explore: {
    label: "Explore Nigeria",
    links: [
      { href: "/explore", label: "Overview" },
      { href: "/explore#places", label: "Places" },
      { href: "/explore#cities", label: "City guides" },
      { href: "/explore#destinations", label: "Destinations" },
    ],
  },
  entertainment: {
    label: "Entertainment",
    links: [
      { href: "/entertainment", label: "Overview" },
      { href: "/entertainment/movies", label: "Movies" },
      { href: "/entertainment/youtube", label: "Free on YouTube" },
      { href: "/entertainment/releases", label: "New & upcoming" },
      { href: "/entertainment/cinemas", label: "Cinemas" },
      { href: "/entertainment/people", label: "People" },
    ],
  },
} as const;

type SectionKey = keyof typeof sectionNavigation;

function sectionForPath(pathname: string): SectionKey | null {
  if (
    ["/services", "/categories", "/topics", "/agencies", "/official-portals", "/fees", "/offices", "/updates"]
      .some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"))
  ) return "services";
  if (pathname === "/explore" || pathname.startsWith("/explore/")) return "explore";
  if (pathname === "/entertainment" || pathname.startsWith("/entertainment/")) return "entertainment";
  return null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sectionKey = useMemo(() => sectionForPath(pathname), [pathname]);
  const context = sectionKey ? sectionNavigation[sectionKey] : null;

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

        <nav id="primary-navigation" className={"primary-nav premium-primary-nav" + (open ? " is-open" : "")} aria-label="Primary navigation">
          <div className="primary-nav-main">
            {primaryNavigation.map((item) => {
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
          </div>

          <div className="primary-nav-utilities" aria-label="Utilities">
            <Link href="/assistant" className={pathname.startsWith("/assistant") ? "nav-active" : undefined} onClick={() => setOpen(false)}>
              Find a guide
            </Link>
            <Link href="/saved" className={pathname.startsWith("/saved") ? "nav-active" : undefined} onClick={() => setOpen(false)}>
              Saved
            </Link>
          </div>
        </nav>
      </div>

      {context ? (
        <div className="section-nav-shell">
          <div className="container section-nav-inner">
            <strong>{context.label}</strong>
            <nav aria-label={context.label + " navigation"}>
              {context.links.map((item) => {
                const cleanHref = item.href.split("#")[0];
                const active = item.label === "Overview"
                  ? pathname === cleanHref
                  : pathname === cleanHref || (cleanHref !== "/services" && pathname.startsWith(cleanHref + "/"));
                return (
                  <Link key={item.href + item.label} href={item.href} className={active ? "is-current" : undefined}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}

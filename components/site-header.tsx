"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
      { href: "/assistant", label: "Find a guide" },
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
type IconName = "home" | "services" | "explore" | "movies" | "saved" | "search";

function sectionForPath(pathname: string): SectionKey | null {
  if (
    ["/services", "/categories", "/topics", "/agencies", "/official-portals", "/fees", "/offices", "/updates"]
      .some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"))
  ) return "services";
  if (pathname === "/explore" || pathname.startsWith("/explore/")) return "explore";
  if (pathname === "/entertainment" || pathname.startsWith("/entertainment/")) return "entertainment";
  return null;
}

function NavIcon({ name }: { name: IconName }) {
  const common = {
    width: 21,
    height: 21,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "home") return <svg {...common}><path d="m3.5 10.5 8.5-7 8.5 7" /><path d="M5.5 9.2V21h13V9.2" /><path d="M9.3 21v-6.6h5.4V21" /></svg>;
  if (name === "services") return <svg {...common}><rect x="4" y="4" width="6" height="6" rx="1.4" /><rect x="14" y="4" width="6" height="6" rx="1.4" /><rect x="4" y="14" width="6" height="6" rx="1.4" /><path d="m14.8 17 1.7 1.7 3.2-3.5" /></svg>;
  if (name === "explore") return <svg {...common}><circle cx="12" cy="12" r="8.4" /><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" /></svg>;
  if (name === "movies") return <svg {...common}><rect x="3.5" y="5.2" width="17" height="13.6" rx="2.2" /><path d="m10 9 5 3-5 3V9Z" /></svg>;
  if (name === "saved") return <svg {...common}><path d="M6.2 4.2A2.2 2.2 0 0 1 8.4 2h7.2a2.2 2.2 0 0 1 2.2 2.2V22L12 18.2 6.2 22V4.2Z" /></svg>;
  return <svg {...common}><circle cx="10.8" cy="10.8" r="6.4" /><path d="m16 16 4.2 4.2" /></svg>;
}

function isMobileItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/services") return sectionForPath(pathname) === "services";
  if (href === "/explore") return sectionForPath(pathname) === "explore";
  if (href === "/entertainment/movies") return sectionForPath(pathname) === "entertainment";
  return pathname === href || pathname.startsWith(href + "/");
}

const mobileNavigation = [
  { href: "/", label: "Home", icon: "home" as const },
  { href: "/services", label: "Services", icon: "services" as const },
  { href: "/explore", label: "Explore", icon: "explore" as const },
  { href: "/entertainment/movies", label: "Movies", icon: "movies" as const },
  { href: "/saved", label: "Saved", icon: "saved" as const },
];

export function SiteHeader() {
  const pathname = usePathname();
  const sectionKey = sectionForPath(pathname);
  const context = sectionKey ? sectionNavigation[sectionKey] : null;

  return (
    <>
      <header className="site-header">
        <a className="skip-link" href="#main-content">Skip to content</a>

        <div className="container header-inner">
          <a className="brand brand-home-link" href="/" aria-label="MyNigeriaGuide home">
            <BrandLogo />
          </a>

          <Link className="mobile-header-action" href="/search" aria-label="Search MyNigeriaGuide">
            <NavIcon name="search" />
            <span>Search</span>
          </Link>

          <nav id="primary-navigation" className="primary-nav premium-primary-nav" aria-label="Primary navigation">
            <div className="primary-nav-main">
              {primaryNavigation.map((item) => {
                const active = item.matches.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={active ? "nav-active" : undefined}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="primary-nav-utilities" aria-label="Utilities">
              <Link href="/search" className={pathname.startsWith("/search") ? "nav-active" : undefined}>
                Search
              </Link>
              <Link href="/saved" className={pathname.startsWith("/saved") ? "nav-active" : undefined}>
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

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <div className="mobile-bottom-nav-inner">
          {mobileNavigation.map((item) => {
            const active = isMobileItemActive(pathname, item.href);
            return (
              <Link key={item.href} href={item.href} className={active ? "is-current" : undefined} aria-current={active ? "page" : undefined}>
                <NavIcon name={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

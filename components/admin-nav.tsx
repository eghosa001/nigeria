"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/services", label: "Guides" },
  { href: "/admin/foreign-visas", label: "Foreign visas" },
  { href: "/admin/sources", label: "Sources" },
  { href: "/admin/updates", label: "Updates" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Admin navigation">
      <div className="container admin-nav-inner">
        <div className="admin-nav-title">
          <span>MyNigeriaGuide</span>
          <strong>Admin</strong>
        </div>
        <div className="admin-nav-links">
          {items.map((item) => {
            const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </div>
        <Link className="admin-public-link" href="/">Public site ↗</Link>
      </div>
    </nav>
  );
}

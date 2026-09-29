"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/services", label: "Guides" },
  { href: "/admin/entertainment", label: "Movies" },
  { href: "/admin/explore", label: "Tour" },
  { href: "/admin/foreign-visas", label: "Foreign visas" },
  { href: "/admin/visits", label: "Visits" },
  { href: "/admin/sources", label: "Sources" },
  { href: "/admin/updates", label: "Updates" },
];

export function AdminNav() {
  const pathname = usePathname();

  async function lockAdmin() {
    const response = await fetch("/admin/api/access", { method: "DELETE" });
    if (response.ok) window.location.replace("/admin");
  }

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
        <button className="admin-lock-button" type="button" onClick={lockAdmin}>Lock</button>
      </div>
    </nav>
  );
}

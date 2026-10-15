import Link from "next/link";

export type PageOutlineItem = { href: `#${string}`; label: string };

/** Use only hash links to sections actually rendered by the parent page. */
export function PageOutline({ items, label = "On this page" }: {
  items: PageOutlineItem[];
  label?: string;
}) {
  if (!items.length) return null;
  return (
    <nav className="page-outline" aria-label={label}>
      <span className="page-outline-label">{label}</span>
      <ul>
        {items.map(({ href, label: text }) => (
          <li key={href}><Link href={href}>{text}</Link></li>
        ))}
      </ul>
    </nav>
  );
}

import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type CategoryName =
  | "Identity"
  | "Immigration"
  | "Driving"
  | "Business"
  | "Education"
  | "Youth service"
  | "Civil records"
  | "Tax"
  | "State services";

function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export function CategoryIcon({ category }: { category: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (category as CategoryName) {
    case "Identity":
      return <IconBase><rect x="3" y="5" width="18" height="14" rx="3" {...common}/><circle cx="8" cy="11" r="2" {...common}/><path d="M5.8 16c.7-1.7 3.7-1.7 4.4 0M13 10h5M13 14h5" {...common}/></IconBase>;
    case "Immigration":
      return <IconBase><rect x="5" y="3" width="14" height="18" rx="3" {...common}/><circle cx="12" cy="11" r="3.4" {...common}/><path d="M8.8 11h6.4M12 7.6c1.2 1.2 1.2 5.6 0 6.8M8 17h8" {...common}/></IconBase>;
    case "Driving":
      return <IconBase><circle cx="12" cy="12" r="8" {...common}/><circle cx="12" cy="12" r="2" {...common}/><path d="M4.5 10h5l2.5 2M19.5 10h-5L12 12M12 14v6" {...common}/></IconBase>;
    case "Business":
      return <IconBase><rect x="3" y="7" width="18" height="13" rx="3" {...common}/><path d="M9 7V5h6v2M3 12h18M10 12v2h4v-2" {...common}/></IconBase>;
    case "Education":
      return <IconBase><path d="m3 10 9-5 9 5-9 5-9-5Z" {...common}/><path d="M7 12.3v4.2c3 2 7 2 10 0v-4.2M21 10v5" {...common}/></IconBase>;
    case "Youth service":
      return <IconBase><circle cx="9" cy="8" r="3" {...common}/><circle cx="17" cy="9" r="2.3" {...common}/><path d="M3.5 19c.5-4 2.4-6 5.5-6s5 2 5.5 6M14 14c2.8-.8 5.3.8 6 4" {...common}/></IconBase>;
    case "Civil records":
      return <IconBase><path d="M6 3h9l3 3v15H6V3Z" {...common}/><path d="M15 3v4h4M9 11h6M9 15h6M9 19h4" {...common}/></IconBase>;
    case "Tax":
      return <IconBase><path d="M7 3h10v18l-2-1.4L13 21l-2-1.4L9 21l-2-1.4V3Z" {...common}/><path d="M10 8h4M10 12h4M10 16h2" {...common}/></IconBase>;
    case "State services":
      return <IconBase><path d="m3 9 9-5 9 5M5 10h14M6 10v8M10 10v8M14 10v8M18 10v8M4 20h16" {...common}/></IconBase>;
    default:
      return <IconBase><circle cx="12" cy="12" r="8" {...common}/><path d="M12 8v8M8 12h8" {...common}/></IconBase>;
  }
}

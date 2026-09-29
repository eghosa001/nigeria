export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-label="MyNigeriaGuide"
    >
      <rect width="48" height="48" rx="13" fill="#063F2D" />
      <rect x="1" y="1" width="46" height="46" rx="12" fill="none" stroke="rgba(255,253,248,.14)" />
      <path
        d="M13.5 34.5V15.2L34.5 34.2V13.5"
        fill="none"
        stroke="#FFFDF8"
        strokeWidth="3.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="13.5" cy="34.5" r="3.15" fill="#D1A24A" stroke="#063F2D" strokeWidth="1.15" />
      <path
        d="M34.5 8.8L35.9 12.1L39.2 13.5L35.9 14.9L34.5 18.2L33.1 14.9L29.8 13.5L33.1 12.1L34.5 8.8Z"
        fill="#D1A24A"
      />
    </svg>
  );
}

export function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <span className={"brand-lockup" + (footer ? " brand-lockup-footer" : "")}>
      <BrandMark className="brand-logo-mark" />
      <span className="brand-wordmark">
        <strong><span>MyNigeria</span><em>Guide</em></strong>
        <small>Movies · Services · Travel</small>
      </span>
    </span>
  );
}

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-label="MyNigeriaGuide"
    >
      <rect width="48" height="48" rx="14" fill="#063F2D" />
      <path
        d="M10.5 33.5V14.5L18.2 24.6L24 16.8L29.8 24.6L37.5 14.5V33.5"
        fill="none"
        stroke="#FFFDF8"
        strokeWidth="4.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M33.2 9.5H40V16.3L37.7 14L33.7 18L31.5 15.8L35.5 11.8Z" fill="#D1A24A" />
      <circle cx="38.3" cy="10.8" r="1.35" fill="#FFFDF8" />
    </svg>
  );
}

export function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <span className={"brand-lockup" + (footer ? " brand-lockup-footer" : "")}>
      <BrandMark className="brand-logo-mark" />
      <span className="brand-wordmark">
        <strong>MyNigeriaGuide</strong>
        <small>Clear steps. Verified sources.</small>
      </span>
    </span>
  );
}

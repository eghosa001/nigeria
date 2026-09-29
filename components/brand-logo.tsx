export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-label="MyNigeriaGuide"
    >
      <rect width="48" height="48" rx="14" fill="#063F2D" />
      <circle cx="24" cy="34" r="3.2" fill="#D1A24A" />
      <path d="M24 31V23.5" fill="none" stroke="#FFFDF8" strokeWidth="3.3" strokeLinecap="round" />
      <path d="M24 24C20.5 20.5 17.3 17.8 13.4 15.4" fill="none" stroke="#FFFDF8" strokeWidth="3.3" strokeLinecap="round" />
      <path d="M24 24C27.8 20.2 31.1 17.6 35.2 15.2" fill="none" stroke="#FFFDF8" strokeWidth="3.3" strokeLinecap="round" />
      <circle cx="13" cy="15" r="2.6" fill="#FFFDF8" />
      <rect x="21.4" y="11.9" width="5.2" height="5.2" rx="1.5" fill="#FFFDF8" />
      <path d="M35.5 11.3l3.6 3.7-3.6 3.7-3.7-3.7 3.7-3.7Z" fill="#FFFDF8" />
    </svg>
  );
}

export function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <span className={"brand-lockup" + (footer ? " brand-lockup-footer" : "")}>
      <BrandMark className="brand-logo-mark" />
      <span className="brand-wordmark">
        <strong><span>MyNigeria</span><em>Guide</em></strong>
      </span>
    </span>
  );
}

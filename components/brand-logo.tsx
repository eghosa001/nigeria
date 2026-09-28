export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-label="MyNigeriaGuide"
    >
      <rect width="48" height="48" rx="14" fill="#063F2D" />
      <circle cx="24" cy="24" r="15.2" fill="none" stroke="rgba(255,253,248,.18)" strokeWidth="1.4" />
      <path
        d="M13.5 34.5C16 29 18.7 30.8 21.1 26.1C23.7 21 25.7 19.8 31.2 19.2"
        fill="none"
        stroke="#FFFDF8"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="13.5" cy="34.5" r="3.1" fill="#D1A24A" stroke="#FFFDF8" strokeWidth="1.4" />
      <path
        d="M31.5 13.2C27.4 13.2 24.1 16.5 24.1 20.6C24.1 26.2 31.5 34.4 31.5 34.4C31.5 34.4 38.9 26.2 38.9 20.6C38.9 16.5 35.6 13.2 31.5 13.2Z"
        fill="#D1A24A"
        stroke="#FFFDF8"
        strokeWidth="1.5"
      />
      <path d="M28.4 20.6L30.7 22.9L35 18.6" fill="none" stroke="#063F2D" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.8 14.1L13.5 10.6L15.2 14.1L18.7 15.8L15.2 17.5L13.5 21L11.8 17.5L8.3 15.8L11.8 14.1Z" fill="#FFFDF8" opacity=".92" />
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

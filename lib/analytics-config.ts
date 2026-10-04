// GA4 measurement IDs are public identifiers, not secrets.
// Keep a production fallback so Cloudflare/GitHub builds cannot silently ship without tracking.
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-J1SBV02XGN";

import { createHash, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "mng_admin_analytics";

function adminSecret() {
  return process.env.MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY?.trim() ?? "";
}

export function analyticsAdminAccessConfigured() {
  return Boolean(adminSecret());
}

function expectedToken() {
  const secret = adminSecret();
  return secret ? createHash("sha256").update("mynigeriaguide-analytics:" + secret).digest("hex") : "";
}

export function analyticsAdminCookieName() {
  return COOKIE_NAME;
}

export function analyticsAdminCookieValue() {
  return expectedToken();
}

export function verifyAnalyticsAdminPassword(value: string) {
  const secret = adminSecret();
  if (!secret || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function verifyAnalyticsAdminCookie(value?: string) {
  const expected = expectedToken();
  if (!expected || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

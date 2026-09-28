import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "mng_admin_analytics";

function adminSecret() {
  return process.env.MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY?.trim() ?? "";
}

function expectedToken() {
  const secret = adminSecret();
  return secret ? createHash("sha256").update("mynigeriaguide-admin:" + secret).digest("hex") : "";
}

export function adminAccessConfigured() {
  return Boolean(adminSecret());
}

export function adminCookieName() {
  return COOKIE_NAME;
}

export function adminCookieValue() {
  return expectedToken();
}

export function verifyAdminPassword(value: string) {
  const secret = adminSecret();
  if (!secret || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function verifyAdminCookie(value?: string) {
  const expected = expectedToken();
  if (!expected || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function hasAdminSession() {
  const store = await cookies();
  return verifyAdminCookie(store.get(COOKIE_NAME)?.value);
}

export const adminCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
  maxAge: 60 * 60 * 12,
};

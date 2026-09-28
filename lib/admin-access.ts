import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "mng_admin_analytics";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function adminSecret() {
  return process.env.MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY?.trim() ?? "";
}

function sessionMac(payload: string) {
  const secret = adminSecret();
  return secret
    ? createHmac("sha256", secret).update("mynigeriaguide-admin-session:" + payload).digest("hex")
    : "";
}

export function adminAccessConfigured() {
  return Boolean(adminSecret());
}

export function adminCookieName() {
  return COOKIE_NAME;
}

export function adminCookieValue() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = "v1." + expiresAt;
  return payload + "." + sessionMac(payload);
}

export function verifyAdminPassword(value: string) {
  const secret = adminSecret();
  if (!secret || !value) return false;
  const supplied = createHash("sha256").update(value).digest();
  const expected = createHash("sha256").update(secret).digest();
  return timingSafeEqual(supplied, expected);
}

export function verifyAdminCookie(value?: string) {
  if (!adminSecret() || !value) return false;

  const parts = value.split(".");
  if (parts.length !== 3 || parts[0] !== "v1" || !/^\d+$/.test(parts[1]) || !/^[0-9a-f]{64}$/i.test(parts[2])) {
    return false;
  }

  const expiresAt = Number(parts[1]);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const payload = parts[0] + "." + parts[1];
  const expected = sessionMac(payload);
  const suppliedBuffer = Buffer.from(parts[2], "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return suppliedBuffer.length === expectedBuffer.length && timingSafeEqual(suppliedBuffer, expectedBuffer);
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
  maxAge: SESSION_TTL_SECONDS,
};

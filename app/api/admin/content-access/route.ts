import { cookies } from "next/headers";
import {
  adminAccessConfigured,
  adminCookieName,
  adminCookieOptions,
  adminCookieValue,
  hasAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-access";

export async function GET() {
  return Response.json({
    configured: adminAccessConfigured(),
    authenticated: await hasAdminSession(),
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!adminAccessConfigured()) {
    return Response.json({ error: "Admin editing access is not configured." }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await request.json() as { password?: string };
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyAdminPassword(body.password ?? "")) {
    return Response.json({ error: "Incorrect admin passphrase." }, { status: 401 });
  }

  const store = await cookies();
  store.set(adminCookieName(), adminCookieValue(), adminCookieOptions);
  return Response.json({ authenticated: true });
}

export async function DELETE() {
  const store = await cookies();
  store.set(adminCookieName(), "", { ...adminCookieOptions, maxAge: 0 });
  return Response.json({ authenticated: false });
}

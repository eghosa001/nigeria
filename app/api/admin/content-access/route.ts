import { cookies } from "next/headers";
import { githubAdminConfigured } from "@/lib/admin-github";
import {
  adminAccessConfigured,
  adminCookieName,
  adminCookieOptions,
  adminCookieValue,
  hasAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-access";

export async function GET() {
  const accessConfigured = adminAccessConfigured();
  const githubConfigured = githubAdminConfigured();
  return Response.json({
    configured: accessConfigured && githubConfigured,
    accessConfigured,
    githubConfigured,
    authenticated: accessConfigured && githubConfigured ? await hasAdminSession() : false,
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!adminAccessConfigured() || !githubAdminConfigured()) {
    return Response.json({ error: "Admin editing is not fully configured." }, { status: 503 });
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

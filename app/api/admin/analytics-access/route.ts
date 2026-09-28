import { cookies } from "next/headers";
import {
  analyticsAdminAccessConfigured,
  analyticsAdminCookieName,
  analyticsAdminCookieValue,
  verifyAnalyticsAdminPassword,
} from "@/lib/admin-analytics-access";

export async function POST(request: Request) {
  if (!analyticsAdminAccessConfigured()) {
    return Response.json({ error: "Admin analytics access is not configured." }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await request.json() as { password?: string };
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyAnalyticsAdminPassword(body.password ?? "")) {
    return Response.json({ error: "Incorrect analytics passphrase." }, { status: 401 });
  }

  const store = await cookies();
  store.set(analyticsAdminCookieName(), analyticsAdminCookieValue(), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return Response.json({ ok: true });
}

export async function DELETE() {
  const store = await cookies();
  store.set(analyticsAdminCookieName(), "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return Response.json({ ok: true });
}

import type { Metadata } from "next";
import { AdminNav } from "@/components/admin-nav";
import { AdminAccessGate } from "@/components/admin-access-gate";
import { adminAccessConfigured, hasAdminSession } from "@/lib/admin-access";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | MyNigeriaGuide Admin" },
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const configured = adminAccessConfigured();
  const authenticated = configured ? await hasAdminSession() : false;

  if (!authenticated) {
    return <AdminAccessGate configured={configured} />;
  }

  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}

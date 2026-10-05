"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { trackEvent } from "@/lib/client-analytics";

export function JobApplyLink({
  href,
  slug,
  employer,
  status,
  className,
  children,
}: {
  href: string;
  slug: string;
  employer: string;
  status: string;
  className?: string;
  children: ReactNode;
}) {
  const onClick: MouseEventHandler<HTMLAnchorElement> = () => {
    let host = "";
    try { host = new URL(href).hostname; } catch {}
    trackEvent("job_apply_click", {
      job_slug: slug,
      employer,
      job_status: status,
      destination_host: host,
    });
  };

  return <a className={className} href={href} target="_blank" rel="noreferrer" onClick={onClick}>{children}</a>;
}

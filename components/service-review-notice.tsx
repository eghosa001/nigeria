"use client";

import { useEffect, useState } from "react";
import { getServiceReviewStatus, type ServiceReviewState } from "@/lib/service-review-status";

export function ServiceReviewNotice({ lastVerified }: { lastVerified: string }) {
  const [review, setReview] = useState<{ state: ServiceReviewState; days: number | null; message: string } | null>(null);
  useEffect(() => setReview(getServiceReviewStatus(lastVerified)), [lastVerified]);
  // The guide is statically generated. Determine relative ages in the browser
  // so an unredeployed page still correctly becomes due after Nigerian midnight.
  // A current review date already appears in the hero. Repeat it only when
  // visitors need a substantive stale-source warning.
  if (!review || review.state === "current") return null;
  return (
    <aside className="service-review-notice service-review-notice-due" aria-label="Source review information">
      <strong>Source review: <time dateTime={lastVerified}>{lastVerified}</time></strong>
      <p>{review?.message ?? "This is when the guide's information was last reviewed against its cited sources, not the date of the latest website update."}</p>
      {review?.days != null && review.days >= 11 ? <small>{review.days} days since the recorded review. This does not mean the information has been proven incorrect.</small> : null}
      <a href="#official-sources">Check the cited official sources ↓</a>
    </aside>
  );
}

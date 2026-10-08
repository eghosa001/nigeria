"use client";

import { useState } from "react";
import { LiveJobsDirectory } from "@/components/live-jobs-directory";

/** Load the larger external feed only after a visitor requests it. */
export function OnDemandLiveJobs() {
  const [opened, setOpened] = useState(false);
  return (
    <details className="browse-disclosure jobs-browse-more" onToggle={(event) => {
      if (event.currentTarget.open) setOpened(true);
    }}>
      <summary>Browse external vacancies</summary>
      <div className="jobs-browse-more-content">
        {opened ? <LiveJobsDirectory /> : null}
      </div>
    </details>
  );
}

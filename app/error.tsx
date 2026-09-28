"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("GovGuide route error", error);
  }, [error]);

  return (
    <section className="section page-top">
      <div className="container narrow error-state">
        <span className="eyebrow">Something went wrong</span>
        <h1>This GovGuide page could not load.</h1>
        <p>
          Your government application has not been affected—GovGuide does not submit or store government applications.
          You can retry this page or return to the service directory.
        </p>
        <div>
          <button type="button" className="button inline-button" onClick={reset}>Try again</button>
          <Link className="text-link" href="/services">Browse services →</Link>
        </div>
      </div>
    </section>
  );
}

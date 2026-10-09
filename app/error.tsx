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
    console.error("MyNigeriaGuide route error", error);
  }, [error]);

  return (
    <section className="section page-top">
      <div className="container narrow error-state">
        <span className="eyebrow">Something went wrong</span>
        <h1>This MyNigeriaGuide page could not load.</h1>
        <p>A temporary problem stopped this page loading. Try again or continue browsing one of the four sections below.</p>
        <div>
          <button type="button" className="button inline-button" onClick={reset}>Try again</button>
          <Link className="text-link" href="/entertainment/movies">Movies →</Link>
          <Link className="text-link" href="/services">Services →</Link>
          <Link className="text-link" href="/explore">Tour Nigeria →</Link>
          <Link className="text-link" href="/jobs">Jobs & Careers →</Link>
        </div>
      </div>
    </section>
  );
}

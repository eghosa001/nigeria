// Shared App Router loading boundary: keeps site navigation visibly
// responsive on cold server renders without replacing any page content.
export default function Loading() {
  return (
    <section className="mng-page-loading" role="status" aria-live="polite" aria-label="Opening page">
      <div className="container mng-page-loading-inner">
        <span className="mng-page-loading-kicker">MyNigeriaGuide</span>
        <p>Opening your guide…</p>
        <div className="mng-page-loading-skeleton" aria-hidden="true">
          <span className="mng-page-loading-bar mng-page-loading-bar-long" />
          <span className="mng-page-loading-bar mng-page-loading-bar-short" />
          <span className="mng-page-loading-panel" />
        </div>
      </div>
    </section>
  );
}

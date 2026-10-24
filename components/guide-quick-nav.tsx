"use client";

const items = [
  ["steps", "Steps"],
  ["requirements", "Requirements"],
  ["journey", "Other routes"],
  ["official-sources", "Sources"],
] as const;

export function GuideQuickNav({ showOtherRoutes = true, showQuickAnswers = false, showAftercare = false, showScenarios = false }: { showOtherRoutes?: boolean; showQuickAnswers?: boolean; showAftercare?: boolean; showScenarios?: boolean }) {
  function jump(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    const nextUrl = window.location.pathname + window.location.search + "#" + id;
    window.history.replaceState(window.history.state, "", nextUrl);
    // Expand any optional section before scrolling to its inner anchor.
    let disclosure: HTMLDetailsElement | null = target.closest("details");
    while (disclosure) {
      disclosure.open = true;
      disclosure = disclosure.parentElement?.closest("details") ?? null;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="guide-quick-nav" aria-label="On this page">
      <span>On this page</span>
      {[...items.slice(0, 2), ...(showOtherRoutes ? [items[2]] : []), ...(showScenarios ? [["case-guidance", "Special cases"] as const] : []), ...(showAftercare ? [["after-submit", "After application"] as const] : []), ...(showQuickAnswers ? [["quick-answers", "Extra answers"] as const] : []), ["notes", "Cautions"] as const, ...items.slice(3)].map(([id, label]) => (
        <a
          key={id}
          href={"#" + id}
          onClick={(event) => {
            event.preventDefault();
            jump(id);
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

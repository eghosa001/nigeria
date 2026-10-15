"use client";

const items = [
  ["journey", "Route"],
  ["requirements", "Requirements"],
  ["steps", "Steps"],
  ["after-submit", "After submission"],
  ["official-sources", "Sources"],
] as const;

export function GuideQuickNav({ showQuickAnswers = false }: { showQuickAnswers?: boolean }) {
  function jump(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    const nextUrl = window.location.pathname + window.location.search + "#" + id;
    window.history.replaceState(window.history.state, "", nextUrl);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="guide-quick-nav" aria-label="On this page">
      <span>On this page</span>
      {[...items.slice(0, 4), ...(showQuickAnswers ? [["quick-answers", "Extra answers"] as const] : []), ["notes", "Cautions"] as const, ...items.slice(4)].map(([id, label]) => (
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

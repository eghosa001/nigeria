import type { Service } from "@/lib/types";
import { getServiceIntentShortcuts } from "@/lib/service-intent-shortcuts";

/** Shortcuts to *different tasks*, not another copy of the guide's answers. */
export function ServiceIntentShortcuts({ service }: { service: Service }) {
  const choices = getServiceIntentShortcuts(service);
  if (!choices.length) return null;

  return (
    <nav className="service-topic-links" aria-label="Other actions for this service">
      <span className="eyebrow">Already started or need something different?</span>
      <div className="related-links">
        {choices.map((choice) =>
          choice.external ? (
            <a key={choice.href} href={choice.href} target="_blank" rel="noopener noreferrer">
              {choice.label} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <a key={choice.href} href={choice.href}>
              {choice.label} <span aria-hidden="true">↓</span>
            </a>
          ),
        )}
      </div>
    </nav>
  );
}

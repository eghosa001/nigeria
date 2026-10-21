# MyNigeriaGuide — Ivory & Ink Light Design System

**Scope:** Homepage, Movies & Entertainment, Services, Tour Nigeria, Jobs & Careers, guide/article templates, shared search, controls, cards, navigation and utility pages. Dark mode remains independent and deliberately unchanged.

## Intent

A Nigerian editorial guide should feel like a trusted, considered publication, not a green dashboard with different gradient treatments on each page. Four pillars have distinct *labels*, not four conflicting site themes. The user always recognises the same navigation, typography, reading surfaces and interaction conventions.

## Canonical source of truth

`app/editorial-theme.css` is the final stylesheet imported by `app/layout.tsx`. All light styling is scoped to `html[data-theme="light"]`. Prefer reusing the variables below over adding hard-coded light colours to individual pages. `app/theme.css` owns core dark-mode variables and contrast.

| Role | Token | Colour |
| --- | --- | --- |
| Ground | `--editorial-ground` | `#f5f5f1` |
| Paper/surface | `--editorial-paper` | `#ffffff` |
| Supporting section | `--editorial-tint` | `#eef1ed` |
| Ink | `--editorial-ink` | `#1c2b2b` |
| Secondary text | `--editorial-muted` | `#526360` |
| Fine rule | `--editorial-rule` | `#d9dfda` |
| Primary action | `--editorial-action` | `#17493f` |
| Secondary editorial accent | `--editorial-rust` | `#a44c38` |
| Subtle radius | `--editorial-radius` | `10px` |

**Pillars:** Movies `#a44c38`, Services `#225d50`, Tour `#966a2f`, Jobs `#40617b`. Use these for a slim marker, eyebrow or navigation indication only. Do not cover entire hero backgrounds or all cards in a pillar tint.

## Patterns to preserve

- **Masthead:** white paper, precise black top border, hairline secondary navigation, restrained active states. No translucent green glass, giant badge gradients or coloured pill nav.
- **Page hero:** paper-white surface, large balanced editorial serif, readable secondary text, consistent vertical padding. Category identity appears as a narrow 3px top rule at hub level. Article details keep the same reading system.
- **Homepage:** editorial cover with quiet ruled columns; chapter navigation uses white cards differentiated by 3px chapter-coloured tops rather than four pastel fills. On phones cards turn into compact, readable editorial rows.
- **Content sections:** alternate paper and very light gray/green-neutral backgrounds, separated by subtle lines. Avoid unrelated tan, peach, lime and blue wash panels.
- **Cards:** white surface, 1px neutral border, 10px radius, zero resting shadow, subtle hover outline and lift where interaction warrants it. Images or posters are the source of visual energy.
- **Article:** white reading surface with clear section dividers and comfortable 68ch line length. Metadata, sources and side tools are subordinate to the answer.
- **Forms:** white native light inputs, darker accessible labels, one reliable 44px+ control size, evergreen primary action. Give focus a visible 3px warm outline.
- **Cinema exception:** the featured movie shelf may use a deliberate dark cinematic background, but the movie directory and searchable catalogue must remain light in light mode. Preserve poster artwork, captions and dark-on-image overlays.
- **Dark mode:** do not blindly inherit a light override. Dark surfaces use `app/theme.css` and existing dark-scoped fixes.

## Quality guardrails

Verify the homepage, each pillar landing page, representative detail guides and utility flows at **320, 360, 390, 768 and 1280px** as applicable. Check visual hierarchy, colour contrast, horizontal overflow, functional interactions, theme persistence and chrome colour after client navigation. A green CI run means the interactions pass: it is **not** a claim that a human has visually inspected every page.

Avoid claiming “premium 9/10” solely from automated checks. Inspect actual screenshots for visual sign-off when an available browser/image viewer is connected.

## Avoid recurrence

Do not add a new page-specific light gradient or arbitrary radius to solve a generic component problem. Fix the design contract at the shared layer first, unless a verified use case calls for a deliberate exception. Future additions should use the same tokens, line weights, typography, spacing rhythm and interactive states.

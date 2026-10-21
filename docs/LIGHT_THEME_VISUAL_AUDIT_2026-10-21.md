# MyNigeriaGuide — Light theme visual inspection

**Date:** 21 October 2026  
**Purpose:** Owner-requested human visual inspection after the Ivory & Ink design-system rollout.  
**Baseline:** Live production commit `1dc081c149ef7d7e0bc736cd2ae3d73aa1ac3dc8`.  
**Capture evidence:** GitHub Actions Browser QA run [39567438426](https://github.com/eghosa001/nigeria/actions/runs/39567438426), from nine live URLs at mobile 390×800 and desktop 1280×820 (18 rendered screenshots).  
**Updated preview evidence:** Browser QA run [39568330245](https://github.com/eghosa001/nigeria/actions/runs/39568330245), the same 18 viewport captures after the focused CSS corrections.

## Screens inspected

| Page family | Representative route | Mobile | Desktop | Relevant result |
| --- | --- | --- | --- | --- |
| Home | `/` | Inspected | Inspected | Cohesive header, serif hierarchy, four chapter cards; no horizontal overflow |
| Services hub | `/services` | Inspected | Inspected | Consistent search/section structure |
| Movies hub | `/entertainment/movies` | Inspected | Inspected | Light-mode browse hero now neutral; film catalogue remains distinct from intentional featured shelf |
| Tour hub | `/explore` | Inspected | Inspected | Discovered a loose, hard-to-scan collection of unstructured links; converted to consistent shortcut cards |
| Jobs hub | `/jobs` | Inspected | Inspected | Discovered a dark-green verification panel in light mode; converted to readable white editorial card. Condensed mobile heading |
| Service guide | `/services/jamb-direct-entry-2026` | Inspected | Inspected | Light answer panel and sidebar use same surface treatment |
| Job detail | `/jobs/nigerian-army-92rri-2026` | Inspected | Inspected | White official application card, consistent hierarchy |
| Destination guide | `/explore/benin-city` | Inspected | Inspected | Neutral reading surfaces, headings and disclosure; no overflow |
| Movie detail | `/entertainment/movies/tele-x-zikora-2026` | Inspected | Inspected | Discovered poster-first mobile stack concealed the film title below the first screen; moved text-first in mobile light mode |

## Findings and actual corrections

1. **Jobs hub:** the right-side trust panel was still entirely dark, with text colours intended for a deep-green background. In light mode, it is now a white paper card with a subtle blue chapter rule, dark typography, muted supporting text, readable verification stats and thin dividers. The intentionally dark treatment is preserved in dark mode.
2. **Jobs mobile:** the h1 occupied four very large lines, pushing all primary actions off the first viewport. Reduced heading scale and top spacing at mobile widths; the primary search and browse action now appear sooner without changing the heading wording or SEO content.
3. **Tour hub:** seven naked inline links looked unstructured and hard to tap. Replaced with a 3-column desktop / 2-column mobile grid of bordered editorial shortcuts with clear arrow cues and minimum 48px targets. The link destinations and accessible names are unchanged.
4. **Movie detail mobile:** portrait film artwork occupied almost the entire first viewport and the title was hidden below it. On light mobile, the factual heading, release metadata, synopsis and cast precede the tall poster; desktop and dark mode keep existing arrangements.
5. **Common findings:** inspected screens used a consistent `rgb(245,245,241)` page ground, the same editorial serif heading stack, and showed no horizontal overflow at the inspected widths. This establishes consistency for the viewed templates, **not** every possible page variant.

## QA contract

Targeted regression assertions in `tests/smoke.spec.ts` preserve the improved jobs verification card, Tour shortcuts and mobile movie title ordering, supplementing previous shared-light/dark and responsive checks. Temporary base64 screenshot logging was removed before final merge.

## Important scope limitation

This is a **representative visual audit of nine URL templates at two widths**, not individual human inspection of all approximately 5,000+ URLs, nor a claim that every asset across the site has been loaded and reviewed. Additional dynamic and editorial variants may require further spot checks. Images and media rights were not changed.

The editor's stated visual-quality target remains subjective and needs owner review on actual devices; automated functional passing does not itself prove a 9/10 design rating.

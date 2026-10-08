# MyNigeriaGuide — owner-mandated premium 9+/10 quality standard

**Applies to every future addition or change** across Movies & Entertainment, Services, Tour Nigeria, Jobs & Careers, homepage, global navigation, search, editorial pages, APIs, database-backed content and deployments.

The target is **at least 9/10 in every applicable category**, not merely a high average. A rating is an evidence-backed release judgment, **not** a label inferred from successful builds or AI confidence. If an applicable criterion is unverified, record it as **unverified**, never silently award 9+. If a change weakens a previously strong experience, revise it before delivery.

## What "9+/10" means

A category earns 9+ only when its critical acceptance conditions are met, no relevant blocker remains, and a reviewer can point to **current evidence**. An unchecked category cannot be averaged away by other high scores. Use the following nine categories.

| Category | Release-level acceptance criteria and evidence |
| --- | --- |
| Information architecture | The page has one distinct task/search intent and canonical URL; visitors can tell which of the four pillars they're in and reach its parent/category; no orphans, thin pages, duplicates or dead-end paths; related links are relevant, not automated filler. |
| Navigation & interactions | Header and five-item mobile bottom navigation remain predictable; active state, breadcrumbs, focus/keyboard, back/forward, filters, pagination, expandable sections and every newly added button/link perform their stated action. No overlapping UI or invisible controls. |
| Phone/tablet/desktop usability | At 320, 360, 390, 768 and 1280px: no unintended horizontal overflow, clipped or overlapping text/cards, hidden essential information or obstructed content; scroll and bottom-navigation behavior works. Primary touch targets aim at >=44×44 CSS px, with adequate separation. Verify dark and light modes. |
| Content hierarchy & scanability | The first viewport communicates the answer and next action. Lead with task-appropriate facts (fees, status, cast/availability, place/location or employer/deadline). Prefer 3–8 featured cards and 8–12 visible directory records; paginate or progressively disclose secondary sections. Avoid competing search boxes and filler. |
| Editorial quality & authenticity | Original, concise, human-readable, specific to the person/entity/place/service; no generic boilerplate, AI-sounding copy, invented quotes, internal product metrics, publishing strategy or references to SEO/sitemaps/"thin pages" in visitor-facing prose. Fact-check spelling, counts and every significant claim. Do not imitate user reviews or claim firsthand visits. |
| Evidence, safety & trust | Check official/primary sources wherever available, match live status/deadlines/fees and verified-at dates, label uncertainty and independently distinguish listings vs verified openings; image ownership/licensing and attribution are auditable; accessible official links and privacy-safe handling. |
| Visual system & accessibility | Consistent editorial design across four distinct pillars; legible heading/body text, meaningful visuals with license/alt text, readable light/dark colors, accessible labels, focus rings, keyboard actions and WCAG 2.1 AA basics. Verify actual image loading; a generated placeholder is not a premium picture of a destination. |
| Performance & technical resilience | Changed routes load, controls respond without long delays, no hydration/JS/runtime errors, assets and metadata resolve, responsive layouts remain stable, no oversized client-side catalogs or unbounded synchronous work. Check the relevant production path when changed. |
| Retention & utility | Useful task completion plus natural next-step/related content; saved/recently viewed continuity and user-controlled history where relevant; no deceptive popups, fake countdowns or manipulative loops. **Measured** return-visitor/session depth/conversion data needed before claiming actual 9+ retention. |

## Homepage and featured-content integrity

- **No repeated employer or entity in a compact featured set.** An organization may have many verified jobs in the full directory, but the homepage should normally show at most one featured record per organization and must not repeat it in neighboring teaser cards. Date-sensitive "open" labels must use effective status, not an expired stored status.
- **Featured movies are editorially curated, not copied video listings.** Never feature raw promotional YouTube titles, keyword-stuffed headings, generic exhortations to watch/subscribe or publisher descriptions without a distinct fact-supported story. Keep the full verified catalog searchable; demote weak entries from homepage/prominent previews until reviewed.
- **Labels must match content.** Do not call a film "new" merely because it is trending; do not claim all listings are independently verified applications; do not show count or freshness claims inconsistent with their actual sources.
- When a featured shelf cannot meet the standard, reduce the number of cards rather than fill it with duplicates or low-quality filler.

## Required workflow for every new page, feature or expansion

1. **Inventory and conflict check:** inspect the current live site, canonical content inventory and latest main branch/other open PRs. Prefer upgrading existing content over a duplicate or near-duplicate. Confirm the search/user task and quality evidence.
2. **Design for actual readers:** answer first, then details; make the next step unmistakable; keep responsive/mobile height and screen length manageable; avoid excessive stacked widgets or verbose explanatory headers. Give each pillar recognizable editorial identity while using the shared design system.
3. **Prove functionality:** run the **smallest directly relevant** test(s) for changed routes, controls, content and layout. For a changed shared interaction, cover its specific phone and desktop behavior; for an added media asset verify the exact image URL, rights and fallback; for a changed dark theme verify contrast. This rule **never authorizes broad automatic CI** contrary to `.agents/skills/fast-production/SKILL.md`.
4. **Editorial/factual review:** verify cited facts, source freshness, timelines and exact UI copy. Avoid promises of current availability without a live check; avoid all public copy about "keyword scaling", "records", "SEO pages", internal verification workflow or coding technology unless the visitor explicitly needs it.
5. **Evidence-based scorecard:** report each affected category as `pass >=9`, `below 9` or `unverified`, with the exact test/citation and remaining issues. Fix anything below 9 before calling the affected surface complete. All-site and retention scores require broad representative device/analytics evidence, not one template or a few passing tests.
6. **No regression:** keep existing canonical URLs, working links, accessibility, dark mode, four-pillar search, AdSense/analytics and privacy behavior intact. Allow indexation only for substantive distinct content; preserve owner-mandated scoped testing and CI.

## Narrow automated checks

- `tests/premium-ux-retention.spec.ts` protects cross-pillar save/revisit, progressive Jobs, compact mobile layout and credited Tour imagery.
- `tests/directory-navigation.spec.ts` protects the four-pillar directory/search navigation.
- `tests/premium-quality-gate.spec.ts` protects the shared editorial, navigation, mobile and metadata contracts on representative entry pages. Run **only when this changed surface is touched or the owner requests a website-wide audit**, using `npx playwright test tests/premium-quality-gate.spec.ts --project=desktop --project=mobile --workers=1`.
- Existing SEO/source/content/data checks remain authoritative for their own touched areas; **a passing CI check is not proof of subjective visual polish or observed retention**.

## Score audit documentation

Record audit date, deployed commit, device/viewport, routes sampled, failures, relevant GA4/PostHog/GSC measurements, and the nine category results. Separate provisional assessments from demonstrated results and do not fabricate a perfect 9+ score. If data is missing, explicitly mark the category unverified and implement the measurement path when directly relevant.

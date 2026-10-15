# MyNigeriaGuide — shared information architecture

This contract applies to **existing content and every future publication**. An editor adds factual data, not a custom one-off display. Central Next.js templates control structure, headings, navigation, accessibility and verified-source presentation.

## Site-wide rules

1. Start with the question a visitor wants answered. Put a concise, specific answer and the next useful action before ancillary background. Do not repeat the introductory summary in the answer card.
2. Group facts by reader intent; use descriptive headings, meaningful labels, lists and short paragraphs. An overview is not a substitute for supporting information.
3. Link to relevant sections in a short, keyboard-accessible page outline. Every hash link must point to a visible section; never promise sections that are absent for a particular record.
4. Display verified dates, provenance and uncertainty where changes matter. An outdated deadline or historical movie distribution listing must never read as live availability.
5. Make official links distinguishable from MyNigeriaGuide's advice. Prefer source-specific URLs over vague company homepages. Never promise prices, eligibility or media rights without evidence.
6. Do not force artificial word counts for fact listings, but reject thin, repeated or generic text; deepen guides with distinct useful research, not filler.
7. Keep mobile primary actions high on the page, navigation touch-friendly and avoid horizontal overflow; do not hide essential evidence or safety caveats inside disclosures.
8. Put related destinations and contextual discovery after the main answer. Show responsible organisation, legal platforms or geographic context.

## Pillar-specific reading order

### Services
**What the service is and who can use it → current fee/status and responsible agency → official starting route → requirements → step-by-step actions → after-submission follow-up and pitfalls → quick answers → evidence/last checked → related services.**
Separate conflicting official fees from verified fees. Never fabricate a timeline; explain unavailable official timings clearly. All existing service records resolve through `app/services/[slug]/page.tsx`.

### Movies & Entertainment
**What the film/series is → format, year and language → verified cast and credits → concise story/character information → current official viewing availability, access type and date checked → publisher/trailer → sources → related verified titles.**
Avoid mixing video publisher pages with verified movie streaming links or indexing incomplete YouTube records. Existing and future movie, series, YouTube-video and people entries use shared detail templates.

### Tour Nigeria
**Why visit and best-fit visitor → honest highlights → specific places with maps, address, admission cost and availability caveats → trip planning/transport/safety → current sources and date checked → related destinations.**
City, destination, itinerary and event guides are distinguished; event logistics do not dominate the default tourist-discovery list. Unknown admission costs or inaccessible places must not be guessed.

### Jobs & Careers
**Open/closed/career portal status → employer, role, location and deadline → suitability/eligibility → documents → official application instructions → verification date/source and fraud warnings → similar currently open opportunities.**
A general employer portal or founder-training programme is not an active salaried vacancy. Expired vacancies must leave open-now results promptly.

## Mechanical enforcement

- `.github/scripts/shared-page-structure.mjs` validates common templates, record-to-template routing, mandatory reading sections and local page links for all four pillars and supporting content.
- `.github/scripts/shared-page-structure.test.mjs` protects the validator with focused tests.
- `New Page Quality Gate` runs these checks for relevant page, content or shared-layout PRs, as well as the existing new-record source/metadata checks.
- Full legacy factual review is distinct from structural consistency. Existing content still requires editorial verification where its individual sources or detail are weak. Passing this structural check **does not** imply that every published fact, link or rights claim has been independently reverified.
- Check live deployment separately; successful PR checks alone do not prove that Cloudflare has published the revision.

# Nigeria-localized search intent expansion — 11 October 2026

Evidence baseline: `docs/research/google-autocomplete-evergreen-2026-10-09.json` (76 successful requests, en-NG, gl=ng). Suggestions are historical sampled wording, **not** real-time search volume, live ranking, freshness evidence, or a guarantee of demand. The existing scheduled `tools/google-autocomplete-research.mjs` continues collecting new evidence; review its artifact before changing public content. No unverifiable live Google Suggest call was claimed for this pass.

## Canonical intent mapping and decision
- **Services:** how to renew Nigerian passport online → `/services/passport-renewal`; how to check WAEC results using a phone → `/services/waec-check-result`; JAMB CAPS admission status login → `/services/jamb-caps`; CAC registration → `/services/cac-business-name-registration`; correct BVN details → `/services/bvn-data-update`; check NIN → `/services/check-nin-number`; Nigerian police clearance certificate → `/services/police-character-certificate`; ECOWAS travel certificate → `/services/ecowas-travel-certificate`. All existing canonical pages. No new fee claims or portal promises.
- **Jobs:** CV without experience → `/jobs/guides/cv-format-nigeria`; cover letter without experience → `/jobs/guides/cover-letter-nigeria`; interview questions → `/jobs/guides/job-interview-questions-nigeria`. Add a source-verified FCSC August 2026 recruitment scam caution to the existing scam guide, not a duplicate article.
- **Tour:** Abeokuta / Olumo Rock, Benin City, Enugu, Ibadan and Jos queries map to existing city guides. Five primary-source-backed place records add practical destinations to existing city/state guides. They state access uncertainty and do not invent hours, prices, ratings or review claims.
- **Movies:** classic Nollywood, family, Yoruba and comedy searches link to filtered listings on the original movie directory (filtered views already noindex). Netflix, Prime Video and cinemas link to canonical guides. Platform hub provides original decision guidance and copyright-aware verification steps.

## Quality / publication decisions
- **Published as additions to canonical pages, not new indexable routes:** curated typeahead suggestions, platform-selection help, recruitment safety evidence and five location records.
- **Hold / don't turn into pages:** foreign-country suggestions unrelated to Nigeria audience, year-only keyword clones, unknown movie availability, prices, current recruitment claims, and local attractions with no reliable source or access caveat.
- **Verification:** Enugu State government hospitality and Nike Lake redevelopment statement; Kaduna State government heritage/budget materials and the National Commission for Museums and Monuments' museum directory; Plateau State government tourism listing; Federal Ministry of Information's FCSC 21 August 2026 notice; NFVCB legal/classification guidance. Facts were individually checked. No claim of physical visits or human editorial review.
- **UX and scale:** the short curated typeahead resolves to stable canonical links, runs locally without per-keystroke Google requests, and never downloads whole site catalogs. The new tour records reuse the existing paginated place directory. Site quality remains subject to representative live/device checks before anyone claims a 9+/10 score.

## Follow-up evidence needed
Refresh keyword suggestions from the scheduled Google job; pair candidate terms with settled Search Console query/page data and on-site search-no-result events before promoting more intents. Monitor official travel access and changing legal/fees/status facts. Avoid asserting that any keyword grew impressions or CTR until measured.

## Settled Search Console priorities (additional evidence)

GSC Wizard connected domain property `sc-domain:mynigeriaguide.com`; ClickHouse source; actual query/page pairs for 11 September–8 October 2026, with **settledThrough=2026-10-08**. This is the latest available **settled** observation at this inspection, not real-time metrics and not an attribution of any subsequent improvement.

- `oversabi aunty cast` → existing `/entertainment/movies/oversabi-aunty`: **919 impressions, 6 clicks, 0.65% CTR, position 10.08**. Expanded already-verified featured cast, made location-specific watch unavailability immediately visible, and adjusted title/meta description without adding invented full-movie links. Other observed query intents for the same URL: `oversabi aunty nigerian movie` (369 impressions, 6 clicks) and `oversabi aunty where to watch` (245 impressions, 5 clicks).
- `kainji dam` → `/explore/kainji-dam-guide`: **96 impressions, zero clicks, position 7.83**. Existing guide already distinguishes power station from park and warns about controlled visitor access; exposed its canonical guide more directly in autocomplete without inventing an admission price.
- `cac registration` → two pre-existing company/business-name pages: **90 combined impressions, zero clicks**. Keep separate legal-intent canonicals, navigate via `/topics/cac-business`; do not invent a third registration page.
- `nin share code` → `/services/ninauth-nin-verification`: **25 impressions, one click**. Curated specific NINAuth suggestion leading to existing guide.
- `how to get asin number anambra state` → `/services/anambra-asin-registration`: **38 impressions, one click**. Curated relevant existing guide.

Search Console numbers are historical observations, **not** Google Autocomplete popularity measurements. New search suggestions are resolved locally against known routes without third-party runtime calls. Evaluate change impact only after indexing and a settled post-merge reporting window; avoid claiming higher rankings/CTR now.
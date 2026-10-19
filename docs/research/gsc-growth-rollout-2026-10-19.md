# MyNigeriaGuide: sitewide search and editorial improvement rollout
19 October 2026. Internal implementation and QA evidence, not public website copy.

## Verified baseline
- Settled Google Search Console window: 2026-09-19 to 2026-10-16.
- 675 clicks from 55,592 impressions (1.21% CTR); average position 9.46.
- The connected GSC Wizard returned **all 1,518 pages with recorded Search Console rows**, **3,368 disclosed queries** and **69 queries with two or more ranking URLs and at least ten impressions**. It does not represent every public URL: pages with no exposure and anonymised queries cannot be inferred.
- Approximately 74.67% of site clicks were not identifiable by a disclosed query row. Never sum query-row clicks to assert site totals.
- Section performance: Services 337/31,643 (clicks/impressions); Movies & Entertainment 232/13,492; Jobs 51/2,563; Tour 45/4,214.
- GA4's 21 sessions referred by ChatGPT were 2.09% of 1,003 recorded sessions. No claim that these referrals equal GSC clicks.
- Mobile Chrome UX field data ending 2026-10-17: p75 LCP 3.73s, INP 236ms, CLS 0, TTFB 2.36s. This rolling field data can include pre-caching-fix visits, so do not equate it with current server-side cache-hit timings.

## Implemented
1. **Service step classification shared by all services:** labels are based on the actual action, not accidental words such as payment reference, status, receipts, documents or fee. Payment/upload/office cautions are only attached to matching actionable stages; individually reviewed ICAN/NIS stage orders remain explicit.
2. **Search results across entertainment and careers:** movie, TV-series, YouTube and jobs detail metadata uses absolute titles so the global brand suffix does not turn intent-specific titles into 70–80-character results. Movie descriptions have a shared 155-character maximum without clipping half a word. Services and Tour already use absolute titles; do not churn their existing tested overrides.
3. **Full GSC review without publishing analytics:** The connected GSC Wizard privately returned 1,518 exposed page rows, 3,368 disclosed search queries and 69 overlapping-query groups. These raw results are **not stored in this public repository**. Run `node scripts/gsc-sitewide-review.mjs /secure/private/gsc-export.json` using a private local export with the same schema; the tool ranks all page candidates for the four pillars and never deletes or rewrites pages. `--json` provides machine-readable results for secure internal use. Compare equally settled windows on later runs.
4. **Focused safeguards:** service action semantics and cross-pillar metadata/review invariants are covered by narrow tests.

## Editorial application across the whole catalogue
- Triage *every* page in the snapshot using the tool. Work through high-impression, low-CTR existing canonicals first. Do not create keyword-variant URLs to target near-identical search phrasing.
- For a flagged URL, inspect the actual visible source-backed answer, official links and lastChecked date. If the snippet does not promise what the page supplies, change the source-backed snippet and page together.
- For a flagged overlapping query, **compare full visitor intents**. Keep distinct tasks such as RSA registration vs micro-pension vs PFA statements; distinguish a series page from a separately valuable episode video. Only genuinely redundant routes should be consolidated, with permanent redirects and verified internal-link rewiring. Impression overlap alone is not proof of cannibalization.
- For film credits, preserve legitimate platforms, rights and source evidence; do not infer that a cast list is complete because somebody was mentioned in a trailer. Match verified credits to actual film/episode identity.
- For Services, fix shared template semantics first, then individually verify fees, reference-field labels, process stages, privacy notices and current official URLs. Do not advance a verification date without checking the issuer.
- For Jobs, preserve expired-vs-current clarity, official application evidence, no fake salaries and existing JobPosting rules. In Tours, prioritize actual transport/access/seasonal planning details over generic travel descriptions.
- Do not introduce new GA4 events, change robots rules or disable AI search inclusion. The owner confirms generative AI is already enabled.

## Verification and impact measurement
- Changed-surface focused tests only; repository owner prohibits broad redundant CI. Record exact branch, commit, check result and deployment SHA before calling changes live.
- Compare like-for-like **settled** 28-day windows at least 2–4 weeks after deployment, and continue to 8–12 weeks for slow-indexing effects. Attribute neither every click change nor every new AI citation to one edit.
- Track GSC clicks, impressions, CTR, average position, per-pillar performance; GA4 engaged sessions and ChatGPT referral sessions; mobile field p75 LCP/INP/CLS/TTFB; service content issue count and redirect correctness.
- Working CTR scenario at constant 55,592 impressions: 1.5% ≈834 clicks, 2.0% ≈1,112 clicks per 28 days. These are arithmetic counterfactuals, not predicted outcomes.
- **Do not auto-publish, mass noindex, mass delete, automatically update last-verified dates or build hundreds of weak external backlinks.** Improvements must be truthful and source-verifiable.

### Privacy

The site owner's query-level Search Console data is private business analytics. Do not commit full snapshots, keywords or per-URL metrics to the public repository. Only the aggregate, consented facts are included in this internal rollout record. Tests use synthetic sample data. Review exported data in a private runtime and share concise findings, not raw user datasets.

# MyNigeriaGuide — single editorial and publisher-quality standard

**Owner-approved standing rule for every future public content addition, update and generated/imported record.** Applies to Movies & Entertainment, Services, Tour Nigeria, Jobs & Careers, the homepage, sitemaps, catalog imports and editorial tooling. This document consolidates the site's overlapping originality, no-thin-pages, SEO publication, AdSense/Ezoic-readiness and content-trust rules. Do not create parallel, slightly different content-rule lists. Other documents remain authoritative **only for their own domain**: `.agents/skills/fast-production/SKILL.md` for minimal CI/testing (highest priority); `docs/PREMIUM_UX_STANDARD.md` for UX/design; `docs/SCALING.md` for infrastructure/capacity; and these publishing rules for content.

## 1. Publishing gate (indexable vs directory vs draft)

- Start with an actual reader need, independently verifiable facts, and the current live/main/other-agent inventory. Merge same-intent topics into the **existing canonical URL**. No keyword-variant, city-name-only, actor-name-only, or scraped/listing-clone SEO pages.
- A database entry is **not** automatically an article. Index a page only if its *visible editorial content* answers a distinct question with substantial original utility. Otherwise keep an entry in a useful directory with `noindex,follow`/out of sitemaps, combine it with an authoritative hub, hold for review, or leave it unpublished. Preserve prior canonical URLs and redirects when consolidating.
- Lead with the answer, key verifiable facts, a direct next action, and the most useful source link. Expand below the fold using named, non-redundant sections; collapse long supplementary detail on phones. No long introductions, fake urgency, boilerplate FAQs, repetitive headings, AI-sounding templates or keyword stuffing.
- New articles should have *human-reviewed* wording, an original organizing insight (comparison, process breakdown, decision framework, itinerary, context, traps, actual original reporting), source/date provenance, and relevant parent and related links. No fake interviews, first-person visits, first-hand tests, invented salary, price, availability, review, quote, or named author.
- Source check: **official/primary sources first**. Verify dates, fees, location, source legality, employment status, rights and potential conflicts as of publication; when agencies disagree explain uncertainty rather than invent a single answer. Recheck changing claims before featuring and expire temporary homepage trends.
- Every meaningful change runs only the **smallest** directly relevant source/quality check; no broad CI escalation contrary to the owner-locked fast-production rule. Code passing is not a substitute for actual editorial review.

## 2. Substantive article depth / Ezoic preparation

- For an **editorial article**, aim for **800–1,000+ purposeful words** *where warranted*. Ezoic's thin-content advice recommends **more than 15 genuinely substantial articles, each over 500 words**. These are publisher-readiness objectives, **not a keyword-driven padding quota and not a promise of Ezoic acceptance**. The contribution, accuracy and readability matter more than the count.
- Separate **articles** from transactional listings, movie/series fact profiles, verified job postings, video/media detail pages, directory cards, quick-answer pages and utility tools. They do not all need 1,000 words. A short reference record should never be misrepresented as a long-form article solely because a template adds repeated instructions.
- Where a page fails a genuine quality review, first **improve with source-backed user value**, combine with a canonical article, or hold/noindex as appropriate. Do not mass-noindex or deindex established URLs based *only* on a low word count. Consider search demand, helpfulness, internal links and human review.
- Measure **author-written, unique source-body words** separately from visible rendered words. Record-field counts are a *screening signal only*: common template prose, automatic FAQ boilerplate, navigation and media metadata do not establish originality. The report `npm run audit:publisher` is read-only. A separate human/real-browser review decides whether pages are monetization-ready.
- Maintain an explicit **quality queue** sorted by real impressions, existing indexation, conversion usefulness and measured weaknesses. Improve key pages first. Do not automatically expand hundreds of entries with invented paragraphs to reach a target.

## 3. Four-pillar fit: what value counts

| Pillar | Distinct page value; no padding |
| --- | --- |
| **Services** | Eligibility, application route, official fee, exact document/step sequence, before/after submission, known errors, timelines or honest uncertainty, verified primary links and notes on conflicting rules. |
| **Tour Nigeria** | Specific place/event, realistic geography, verified access, transport choices, budget/variable pricing, hours where known, event logistics, safety, accessibility and an actual visitor plan. No invented site visits, hotel inventory or addresses. |
| **Movies & Entertainment** | Verified plot/synopsis, credits, production/release context, trailer, legitimate availability, discussion of format and related viewing choices. Only authorized image/source use; no pirated downloads, full film reuploads or placeholders masquerading as photography. |
| **Jobs & Careers** | Original employer/program eligibility, hiring stage and expiry, duties, application channel, requirements, closing date, location, scam warning, honest role-vs-programme labels and practical interview/CV guidance. Never invent a live vacancy, salary, or third-party JobPosting authority. |

Trending social posts are **discovery tips only**; independently corroborate facts and verify niche fit. Keep homepage trends to the best few, linking existing canonicals, with expiry. No gossip-for-clicks pages outside these pillars.

## 4. Publisher safety, credibility and reader trust

- **No scraped/rephrased copies**, automatically bulk-posted unedited generative prose, doorway pages, fake authorship, copyright-infringing media/downloads, counterfeit products, adult/sexually explicit, illegal, dangerous or hateful content; avoid restricted and regulated advice that falls outside the site's reliable expertise. Use clear, Google AdSense-supported language (English is supported).
- Reuse official facts **in genuinely original, helpful explanations**, not copies of entire articles, press releases, film blurbs or social captions. Citation alone does not permit copyrighted duplication.
- Every article should have a **truthful author/editor or responsible editorial identity** that can be substantiated, reviewed and maintained. Do not fabricate a personal writer or human editor; until verified named bylines are available, mark this an open trust gap rather than printing fictional names.
- Keep About, Contact, Privacy, Terms, Editorial and Corrections pages current, truthful and easily reachable; accurately disclose independent status, corrections mechanism, image sourcing, advertising and consent. Check working links and ads.txt/consent configurations independently.
- Put advertisements **after** essential answers and don't camouflage them as tools, recommendations or navigation. Do not monetize deceptive, unverified, thin or rights-uncertain media pages. Never falsely encourage ad clicks.
- A coherent Nigeria-focused editorial identity is required: movies, practical services, places and jobs all help people **navigate life and opportunities in Nigeria**. Cross-pillar unrelated general news must not be created just for traffic.
- Ezoic currently generally requires **250,000+ monthly active users** for standard onboarding (with a selective Incubator path for smaller publishers). Verify current official requirements and actual GA4 monthly users; content standards alone do not prove eligibility. An external publisher, not our script, determines approval.

## 5. Repeatable audit and actions

1. Run `npm run audit:publisher` (or `npm run audit:publisher -- --json`) for the **sitewide, read-only** record-field inventory. Review by pillar: source-body count bands, missing/single source, exact duplicate-title leads, and top short guide candidates. This deliberately *does not* claim rendered word counts or external originality.
2. Sample real **rendered** pages for word count, quality of unique explanatory text, visible sources/bylines, copyrighted imagery, mobile/readability, links and ad placement. Prioritize URLs with impressions, not every directory entry equally.
3. Review a real subset manually for facts, paraphrase originality/plagiarism, named authorship, licensing, alignment with niche, AdSense/Ezoic restricted topics and analytics. Keep unresolved checks explicitly **unverified**.
4. Fix source errors and high-impression weak article pages before publishing more. Require an editor to approve major expansions and verify when any formerly non-indexable entry deserves indexing. Do not invent verification evidence.
5. Run only checks directly touching the changed pillar; update this single document if policy changes instead of layering duplicate checklists into AGENTS, skills, README or templates.

**Publisher source of guidance** (recheck for updates):
- https://support.ezoic.com/kb/article/ezoic-content-guidelines
- https://support.ezoic.com/kb/article/getting-started-ezoics-requirements
- https://support.ezoic.com/kb/article/ezoic-incubator-program

**Scope boundary:** This is a **quality standard and screening method**, not Ezoic certification, guaranteed Google indexing, a replacement for copyright review, a 1000-word mandate on each URL or a claim that every existing page meets these rules.

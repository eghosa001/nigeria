# Four-pillar keyword import and safe promotion — 20 October 2026

## Imported evidence and candidate bank

The SEO research workbook (Google Sheets `1TEEwnL4BFHmPlepfP3IRK--PprUM1pSX-QDFnUQ6J_I`) supplied **1,894 deduplicated phrases**, now versioned in [nigeria-keyword-opportunities-2026-10-20.json](./nigeria-keyword-opportunities-2026-10-20.json). Counts: Services **621**; Tour Nigeria **449**; Jobs & Careers **410**; Movies & Entertainment **414**.

Of these, **198** were actually observed as suggestions from Nigeria-localized Google Autocomplete sampled that day, and **1,696** were editorial *hypotheses* derived from topics and question modifiers. Some predictions themselves can be inaccurate or unrelated; they are neither search-volume measurements nor factual evidence about an agency, an event, a job opening or a film.

The phrases had no exact normalized string overlap with 3,545 recent Search Console queries (20 September–17 October 2026). That **does not prove** that the keyword is new to the whole site or has demand, or that the page doesn't already answer the intent.

## Integrated into the visitor experience

The site's existing `components/global-search-form.tsx` maps **111 observed suggestion phrases** across **13 existing canonical search destinations** to the user's actual task. Includes NIN number retrieval and correction, BVN date-of-birth correction, NIS landing/exit cards, police clearance for diaspora, tax ID retrieval, Lagos outings, Abeokuta/Olumo Rock, graduate trainee discovery, Nigerian Netflix browsing and Oversabi Aunty. Two destinations were added to the curated typeahead; none of the 111 phrases became an indexable landing page.

The other **87 observed suggestions** were not promoted without a safe existing destination or were adjacent, out-of-date, off-topic, ambiguous or redundant. An example of a misleading prediction is `places to visit in lagos portugal` when users are searching Lagos, Nigeria. Don't route this to Lagos, Nigeria. The 1,696 generated possibilities are **not** presented as validated popular searches and were **not** bulk-added to HTML, a meta keywords tag, titles, FAQ sections or sitemaps.

## Why most opportunities remain editorial backlog

- A seed modifier such as `olumo rock entrance fee` does not prove an entrance price; it needs primary-source validation. No generic price/date/salary/availability promises are allowed.
- The site already has task-specific routes and researched headlines. Preserve those canonicals, FAQ answers, links and source-verification dates. Don't overwrite known winners or duplicate intents.
- Next article edits should be made individually where the existing page genuinely lacks a verified user answer, with official-source-first content and internal navigation. Adjacent variants group together around **one** existing canonical page.
- Search Console data must be measured after indexing; neither keyword insertion nor running a test proves increased traffic.
- `/search` remains `noindex,follow`. Do not index keyword-tag archives or automatically publish a page per phrase.

## Focused validation

`node --test tests/keyword-opportunity-integration-20261020.test.mjs` validates 1,894 unique terms, provenance splits, four-pillar counts, and mapping of a representative sample of observed query phrasing to existing canonical routes. No sitewide regression suite is needed for this research archive/typeahead edit.

Relevant policy: https://developers.google.com/search/docs/essentials/spam-policies and https://developers.google.com/search/docs/crawling-indexing/special-tags.

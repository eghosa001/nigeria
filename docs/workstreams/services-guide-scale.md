# Services Guide scale workstream

Branch: `scale-services-guide`

Base commit: `79f494ed1700389ed79bfd18fe51f531d1847e91`

Long-range capacity target: **20,000 useful indexable service URLs** within the MyNigeriaGuide Million-Search Expansion.

Read and obey `AGENTS.md`, `config/scale-targets.json`, and `docs/SCALING.md`.

## Non-negotiable SEO quality rule

The numeric URL target on this branch is a **capacity ceiling, not a quota**. Do not try to fill it.

Growth is driven by keyword and search-intent opportunities. Before creating a new URL:

- identify a real keyword/query cluster and the searcher's distinct goal;
- check whether an existing page can absorb that cluster and become stronger;
- consolidate synonyms and near-identical keyword variants into one canonical page;
- create a new indexable page only when the intent/entity is materially distinct and enough verified information exists to make it substantial;
- give the page an answer-first section, original useful detail, source/freshness evidence and natural internal links;
- link new pages into the relevant hub/category and update related existing pages so discovery works both ways;
- do not publish orphan pages, doorway pages, spun variants, location-keyword combinations with no unique value, or pages whose main purpose is increasing the URL count;
- keep incomplete candidates draft/non-indexed or merge them into a stronger page.

If the pillar exhausts genuinely distinct high-value search intent before the nominal target, **stop below the target**. Continue improving rankings, CTR, topical authority, freshness and internal linking instead.


## Scope

Own the Services Guide pillar only.

Primary surfaces:

- `/services`
- `/services/[slug]`
- `/agencies/[slug]`
- `/categories/[slug]`
- `/topics/[slug]`
- `/fees`
- `/official-portals`
- service location/office pages
- service update/freshness pages

Primary data/code ownership:

- `data/services.json`
- `lib/data.ts`
- service/category/topic/agency/location datasets
- service-specific components/routes/scripts
- service-specific tests only

Avoid entertainment, jobs and travel datasets.

## Search demand strategy

Prioritise Nigerian high-intent task queries:

- NIN/NIMC;
- passport/NIS;
- BVN/NIBSS;
- CAC/business registration;
- JAMB/WAEC/NECO/NABTEB;
- NYSC;
- FRSC/licence/vehicle;
- NPC/birth/attestation;
- pension/PenCom/RSA;
- visas and embassies;
- NAFDAC/SON/BPP/SCUML/ITF/NSITF;
- state tax/revenue services;
- utilities and regulated consumer services;
- immigration/travel documentation;
- official fees, requirements, processing times, forms, portals and troubleshooting.

Use GSC demand as an input. Current opportunities include CAC registration, ASIN registration, ECOWAS travel certificate price/form, pension/RSA queries, police character certificate, Customs 846, JAMB/CAPS and BVN retrieval.

## Page model

A service page should answer the task immediately and then provide:

- current status;
- official fee or a clear statement when no stable fee is published;
- requirements;
- exact steps;
- official portal;
- timeline when available;
- common failure/troubleshooting notes;
- source links;
- last verified date;
- related services;
- location/office context when relevant.

Never invent a fee, deadline, form or government requirement.

Conflicting official information must remain visible as a conflict/review issue rather than being silently reconciled.

## Scale architecture

Service data may remain checked in during the small-catalog phase, but before the pillar exceeds **5,000 records**, move the growing catalog behind the D1 content-store/data-access boundary.

Preserve every canonical URL.

At scale:

- query/paginate server-side;
- use indexed category/agency/status fields;
- maintain freshness/verification fields;
- allow stale/review states without deleting historical URLs blindly;
- shard sitemap output automatically;
- keep public reads cacheable where appropriate.

## Expansion milestones

### Milestone 1 — high-impression gaps

Strengthen or add pages for queries already surfacing in GSC but ranking outside the top positions.

### Milestone 2 — agency completeness

Build comprehensive task coverage for major federal and state agencies.

### Milestone 3 — local/state services

Expand beyond national services into verified state-specific processes where search demand exists.

### Milestone 4 — 20,000 useful URLs

Use task variants only when intent is genuinely distinct. Do not create thin pages by mechanically splitting one process into meaningless keyword variants.

## Internal linking

Every service page should connect to:

- its agency;
- its category;
- closely related tasks;
- relevant fee/update pages;
- office/location pages where useful.

Topic hubs should group real journeys, not keyword stuffing.

## Merge-conflict boundary

Prefer service-only files. Do not edit:

- `config/scale-targets.json`
- `AGENTS.md`
- entertainment/jobs/travel datasets

unless a critical shared fix is required.

Keep any unavoidable shared edit small and separate.

## Validation

Follow the owner's minimal-test rule. Run only directly relevant service-catalog/content/source checks. Do not manually run the full repository suite.

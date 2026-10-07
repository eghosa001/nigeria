# Tour Nigeria scale workstream

Branch: `scale-tour-nigeria`

Base commit: `79f494ed1700389ed79bfd18fe51f531d1847e91`

Long-range capacity target: **30,000 useful indexable travel URLs** within the MyNigeriaGuide Million-Search Expansion.

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

Own the Tour Nigeria pillar only.

Primary surfaces:

- `/explore`
- `/explore/[slug]`
- `/explore/events`
- city/state destination pages;
- attractions;
- hotels/stays;
- restaurants;
- beaches/parks/museums/landmarks;
- itineraries;
- transport/practical travel guides.

Primary data/code ownership:

- `lib/explore.ts`
- `lib/explore-places.ts`
- travel-specific routes/components/data/scripts
- travel-specific tests only

Avoid entertainment, services and jobs datasets.

## Coverage strategy

All 36 states + FCT already have baseline coverage. The next phase is depth.

Prioritise:

1. Lagos;
2. Abuja/FCT;
3. Port Harcourt;
4. Benin City;
5. Calabar;
6. Ibadan;
7. Abeokuta;
8. Enugu;
9. Kano;
10. Jos;
11. Uyo;
12. Owerri;
13. major state capitals and tourism corridors;
14. current events and festivals;
15. strong destination searches such as things to do, hotels, restaurants, attractions and transport.

## Content model

Useful destination pages should answer:

- why go;
- best-known places;
- current access/safety context;
- costs where responsibly verifiable;
- opening hours/contact information where current;
- transport/logistics;
- best time/day;
- maps/location;
- nearby internal links.

Individual place pages can become indexable when they have enough distinct, current information to stand alone.

## Safety and accuracy

Travel content must not turn a static tourism source into a real-time safety guarantee.

For areas with volatile access/security conditions:

- explicitly tell users to check current official/local guidance;
- avoid presenting remote travel as routine when current conditions are uncertain;
- do not invent road, opening-hour or price data.

## Events

Use real event dates and official/primary sources whenever possible.

Event pages need lifecycle handling:

- upcoming/current;
- recently completed;
- archived historical page where useful;
- next-edition link when a new edition is verified.

## Scale architecture

Before this pillar exceeds **5,000 records**, move growing places/events/hotel/restaurant catalogs behind the D1 content-store boundary.

At scale:

- server-side search/pagination;
- indexes for state/city/kind/status;
- R2 for owned/generated travel imagery;
- geolocation/address fields in structured records;
- sitemap sharding;
- CDN caching.

Do not ship tens of thousands of place records to the browser.

## Expansion milestones

### Milestone 1 — city depth

Make the highest-demand cities genuinely comprehensive.

### Milestone 2 — place-level expansion

Add verified attractions, hotels, restaurants, landmarks, parks, beaches and shopping locations.

### Milestone 3 — events and itineraries

Add major recurring/current Nigerian events and practical trip plans.

### Milestone 4 — 30,000 useful URLs

Reach scale through real destinations and local-intent pages, not thin state/city keyword combinations.

## Merge-conflict boundary

Prefer travel-only files. Do not edit:

- `config/scale-targets.json`
- `AGENTS.md`
- entertainment/services/jobs datasets

unless a critical shared fix is unavoidable.

Keep any unavoidable shared edit minimal and isolated.

## Inherited MyNigeriaGuide requirements

These requirements come from the existing Tour Nigeria production standard and must be preserved while scaling.

### Coverage and page-worthiness

- Maintain baseline representation for all 36 states plus the FCT.
- A Tour guide/event page must have enough mapped/supporting content to be useful; the existing content validator expects at least **3 relevant mapped places** for an Explore/event guide.
- Fragment-only place anchors do **not** count as separate indexable URLs or toward the pillar SEO total. Only distinct pages with independent value count.
- Individual hotel/restaurant/attraction pages should become indexable only when enough verified, distinct information exists to justify a standalone search result.

### Place accuracy and practical value

- Use mapped/source-backed places with current address/map query, access context and useful planning detail.
- Where available and current, include cost, hours, phone, website, transport/logistics, best time/day and nearby relevant stops.
- Do not guess hours, prices, addresses or access rules.
- The Attractions shortcut/filter must filter by structured place kind, not unreliable free-text matching, so all attraction records remain discoverable.
- For remote or volatile areas, current official/local safety and access guidance overrides static tourism copy; never turn a tourism page into a real-time safety guarantee.

### SEO and interlinking

- Keep state → city/destination → place/event/itinerary relationships explicit.
- Every new guide should be linked from its relevant state/city/event hub and should link to related places, itineraries and nearby destinations; update parent/related pages for two-way discovery.
- Continue targeting “things to do”, attractions, hotels, restaurants, events, transport and itinerary keyword clusters only where the page can provide distinct local value.
- Keep canonical URLs, breadcrumbs, structured data where valid, server-rendered links and static crawlability.
- New public pages must enter the appropriate sitemap and existing IndexNow/Bing discovery flow.
- Use Search Console demand to prioritise cities/destinations already earning impressions.

### Mobile, maps and theme

- Phone-first: destination cards, filters, maps/actions, place details and event sections must fit small screens cleanly.
- Preserve complete dark-mode readability across travel cards, filters, forms and navigation.
- Avoid large client-side place payloads and hydration regressions; preserve the site's strong mobile performance/accessibility baseline.
- Keep ads below useful introductory/answer content, never above the user's main answer.

### Events

- Event dates, venues, tickets/access and schedules must be verified from primary/official sources where possible.
- Preserve lifecycle states: upcoming/current → completed/archive → verified next edition when available.
- Do not keep a past event presented as current merely to preserve traffic.

## Validation

Follow the owner's minimal-test rule. Run only directly relevant explore/content checks. Do not manually run the full repository suite.

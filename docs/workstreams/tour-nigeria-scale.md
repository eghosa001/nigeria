# Tour Nigeria scale workstream

Branch: `scale-tour-nigeria`

Base commit: `79f494ed1700389ed79bfd18fe51f531d1847e91`

Long-range target: **30,000 useful indexable travel URLs** within the MyNigeriaGuide Million-Search Expansion.

Read and obey `AGENTS.md`, `config/scale-targets.json`, and `docs/SCALING.md`.

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

## Validation

Follow the owner's minimal-test rule. Run only directly relevant explore/content checks. Do not manually run the full repository suite.

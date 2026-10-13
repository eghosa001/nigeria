# Visitor engagement and feature discovery

The site remains four pillars only: Movies & Entertainment, Services, Tour Nigeria and Jobs & Careers.

## Entry points
- \`/features\` explains actual visitor actions in a compact task-first grid.
- Homepage quickstart strip and desktop header/footer link visitors to the entry points.
- \`/explore/trip-planner\` calculates budgets **only from prices entered by the visitor**; no invented transport or accommodation prices.
- \`/jobs\` and \`/saved\` provide on-device saved job searches, with on-demand checking against the existing verified-jobs API.
- Service watchlists, movie/person discovery and saved pages reuse existing canonical pages. No duplicate hubs.

## Truthful notification behavior
- Watched service snapshots are compared **when the visitor revisits Saved**.
- Saved job searches are stored on the device, checked when the visitor presses the check button, and limited to recent directory results. They are not email or push subscriptions.
- Email/push delivery needs provider credentials, consent/preferences, subscription storage, unsubscribe, spam controls and delivery observability before it can be advertised.
- No visitor-submitted claim is displayed as verified real-world processing data. Reported changes route through the existing correction channel.

## Events
- \`feature_discovery_click\`: feature quickstart and feature page navigation.
- \`feature_share\`: a share intent completes (native/copy; WhatsApp launch tracked on click).
- \`trip_plan_share\`: copying or sharing a user-entered budget.
- \`job_watch_add\`, \`job_watch_remove\`, \`job_watch_check\`: saved job search actions.

Events are sent through the existing consent/production-host analytics guards. Do not classify simple reading or navigation events as GA4 key events, and do not transmit personal searches, location strings, budget amounts or destination names. The admin interaction-label map should match these events.

## Scale and QA
- Client-side saved search filters: max 5, request page size 12, no bulk catalog shipped to browser.
- Visitor input is not transmitted from trip-budget calculator.
- Preserve existing mobile five-item navigation and canonical pillar URLs.
- Run only narrowly relevant feature contract tests and directly affected checks.

# YouTube copyright hold — 10 November 2026

Google Search Console notified the site owner of a copyright-removal request:
- Reference: `1-4103000041879-1699575718`
- Reported URL: `/entertainment/youtube/9TdtUwcwVpQ`
- Source data: "LOVE AND SACRIFICE", published on the listed channel "Maurice Sam TV"; YouTube ID `9TdtUwcwVpQ`
- Complaint descriptor: "SACRIFICE"; complainant listed as Redpoints Solutions S.L.
- Lumen notice: https://lumendatabase.org/notices/103024135 (may take weeks to appear)
- **Status: rights not independently established. No determination of infringement and no counter-notice submitted.**

## Immediate publication response

The video ID is held in `data/youtube-rights-restrictions.json`. Public static directory lists, detail lookup, alternate sources, sitemap-derived lists, D1 published reads, D1 query totals and future YouTube syncs must exclude it. Existing movie profiles and unrelated video IDs are preserved. The held detail URL should return not-found after deployment.

## Preventive audit

The site verifies channel identity and provenance with the YouTube API, but **channel ownership is not film-by-film distribution authorization**. A channel allowlist, available embed, thumbnail, runtime or credited cast is not sufficient evidence of license.

For future film listings, record rights evidence per video (original producer/rightsholder publisher confirmation, clearly documented distribution permission, or a vetted official release). Where that evidence is missing, hold the video from publication pending review. Do not blanket-delete unrelated channel uploads based only on this one complaint. Apply a hold immediately to any new sufficiently identified takedown URLs.

Before any counter-notice, independently assess the original claim, source authorization, the applicable law and the evidence; a counter-notice is a legal statement with potential litigation consequences. Request retraction or seek qualified legal advice where appropriate. Only remove a hold after documentary evidence and explicit review.

## Verification checklist

- The reported detail URL is not found, and is absent from public directory, internal recommendations and sitemaps.
- Static and D1 catalogue queries exclude the held ID without changing other results.
- A subsequent YouTube catalogue sync does not reimport the held ID.
- Production deploy status and exact live URL response are checked separately; code merge alone is not evidence of deployment.

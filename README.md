# GovGuide Nigeria

Independent Nigerian government-service navigation website.

## What is in the first build

- Searchable service directory
- Agency and category navigation
- Structured service guides
- Official-source citations and verification dates
- Conflict warnings when official sources disagree
- SEO sitemap and robots metadata
- Supabase-ready schema for agencies, services, sources, verification history, and user reports
- GitHub CI for typecheck + production build

## Local development

1. Install dependencies with npm install
2. Run npm run dev
3. Open http://localhost:3000

## Environment

Set NEXT_PUBLIC_SITE_URL to the production origin when a custom domain is chosen.

## Editorial rule

Never silently resolve conflicting official information. Record the conflict, show the official sources, and require review before publishing a changed value.

## Current status

The repository starts with a small, verified seed set so the product structure can be tested before expanding to the planned 60+ launch guides.

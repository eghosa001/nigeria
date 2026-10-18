---
name: humanizer
description: Editorial language review for all MyNigeriaGuide pillars. Improve stiff, generic, AI-sounding copy without changing facts, sources, safety advice, or SEO intent.
---

# MyNigeriaGuide Humanizer (adapted)

This is the project's editorial adaptation of the owner's Humanizer v1.0.0-adapted skill, informed by `blader/humanizer` v3.1.0 (MIT-licensed). It is an editorial process, **not** a promise of AI-detector evasion or Google AdSense approval. The publishing standard in `docs/PUBLISHING_STANDARD.md` controls factual and indexing decisions. The repository's `fast-production` skill controls testing.

## When to use

Use this skill whenever authoring or substantively editing public-facing prose in Movies & Entertainment, Services, Tour Nigeria, Jobs & Careers, `/latest`, snippets, summaries, FAQs, or homepage cards. First read the whole original passage, its surrounding section, audience and the original citations. Preserve the site's Nigerian context without invented slang, firsthand experiences or stereotypes.

## Editorial procedure

1. **Identify the visitor's task.** Give the most useful answer, distinction or next step early.
2. **Mark only actual writing problems.** Watch for empty “not just X but Y” constructions, padded introductions, repetitive headings, formulaic triplets, stock AI adjectives (e.g. “tapestry”, “pivotal”, “delve”), forced contrasts, generic significance claims, repetitive paragraphs, needless passive voice, and content that narrates the article rather than answering readers.
3. **Rewrite for meaning and rhythm**, not word replacement. Use shorter sentences where necessary, varied structures, appropriate Nigerian English and the particular medium's voice. Personal expression should come from evidence and observation, not invented author experiences.
4. **Run the fidelity check** against source: every named person, role, date, year, deadline, fee, numeric value/unit, venue, eligibility rule, opening/closing status, citation, original URL, redirect, licence/right, material warning and qualification must remain accurate. Never update `lastVerified` or `lastChecked` because a sentence was rewritten.
5. **Check user value.** Every paragraph should answer a specific reader question or provide an attributable decision aid. Remove redundant paragraphs; do not pad word count or generate more near-duplicate search pages.
6. **Use focused validation.** For changed copy, verify only the altered content and protected facts using the relevant tests. The voice report is a *review shortlist*, not a publication gate or a tool to bulk-rewrite the site.

## Pillar-specific guardrails

- **Services:** Plain, ordered instructions. Preserve the official issuer, identity documents, fees, portal, exception workflows, statuses and approval stages. No suggestion that payment equals completion.
- **Jobs & Careers:** Call a programme a programme, never a paid vacancy or guaranteed opportunity. Preserve deadlines, eligibility, employer identity, location, source links and distinctions between a career portal and an open listing.
- **Movies & Entertainment:** Specific characters, production credits, themes and legitimate viewing. Never invent cast, roles, release channels, spoilers or first-hand reviews; do not promise full films when only trailers exist.
- **Tour Nigeria:** Concrete access, directions and visitor caveats. Don't invent gate prices, addresses, opening hours, reservations, personal visits or event availability.

## Automated assistance

`npm run audit:voice` scans the **full public editorial catalogue and static landing-page text**, then displays a short review shortlist by default. Run `npm run audit:voice -- --json --all` to export **every flagged record** in machine-readable form. The scan is read-only; corrections need source-safe editorial judgment, and generic text is not enough reason to rewrite an otherwise useful page. A flagged expression is never, on its own, proof of AI authorship, low quality, or a factual error. Do not automatically rewrite on match. Include natural-language review in every substantive editorial PR; never claim automated copy has been human-reviewed.

## Attribution

Adapted from the independently packaged owner-provided Humanizer skill (v1.0.0-adapted), based on `https://github.com/blader/humanizer` (v3.1.0; MIT licence). This version's site-specific instructions are original, and it does not copy the full upstream skill.

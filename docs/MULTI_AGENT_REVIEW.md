# Free-tier multi-agent review for MyNigeriaGuide

This first release uses **GitHub Actions** as a low-maintenance cloud orchestrator for the public `eghosa001/nigeria` repository. It does **not** deploy a website, run Claude Free via a hidden login, call the ChatGPT consumer account as an API, or autonomously change production code.

## Connect providers (required to run real model calls)

In GitHub: **eghosa001/nigeria → Settings → Secrets and variables → Actions → New repository secret**.

- `GEMINI_API_KEY`: API key from Google AI Studio, subject to Google's published free-tier eligibility and quotas.
- `GROQ_API_KEY`: API key from GroqCloud, subject to its rate limits and available free developer allowance.

Add one or both. The runner works with a single provider, but independent providers give better cross-model review. Do not add model keys to the Git repository, issues, pull requests, action inputs or chat. API access can incur charges if a paid tier is enabled: check each provider's billing controls.

Optional repository **variables** (not secrets):

- `GEMINI_MODEL`, default `gemini-2.5-flash`.
- `GROQ_MODEL`, default `llama-3.3-70b-versatile`.

Model availability and eligibility may change: update those variables if a model is retired.

## Run it

GitHub → **Actions → MyNigeriaGuide Multi-Agent Review → Run workflow**. Enter an optional review goal. The workflow also runs once a day, normally around **08:47 West Africa Time** (GitHub scheduling is not guaranteed to be exact). Reports are downloadable from the run's **mynigeriaguide-agent-review** artifact for seven days.

The workflow creates a configuration report when no API key is present. A configuration report is **not** an AI review.

The cloud task invokes three specialist prompts **in parallel** (research, engineering, SEO), then a separate reviewer prompt that challenges their output. Gemini is preferred for research/SEO; Groq for engineering/review. If only one API is configured, all four roles can use it; this is not independent-model validation. No API quota can be guaranteed to remain free.

Run locally with Node 22+:

```sh
node --test tests/agent-hub.test.mjs
GEMINI_API_KEY=... GROQ_API_KEY=... node scripts/agent-hub.mjs
```

Keep keys out of shell history if possible; prefer an environment manager. Output files appear in `artifacts/agent-hub/`. Never commit reports containing non-public material. This script only reads an allowlist of **public** repository documents and package script names. It does not transmit environment variables as prompt context, run arbitrary model-generated shell commands, execute patches, or visit model-supplied URLs.

## Guardrails

1. **Read-only repository permission** in the GitHub workflow. No push, PR creation, merge, publishing or Cloudflare deployment.
2. Findings are proposals. A person must check original sources, current official information and source rights before updating public pages.
3. Before applying any code changes, submit a separate pull request through normal CI, browser QA, publisher checks and branch protection.
4. A failed, rate-limited or missing model response is reported accurately, never counted as an independent successful review.
5. Prompts and other agents' results are untrusted inputs. Avoid adding confidential data or credentials to review goals.

## ChatGPT and Claude limitations

The ChatGPT conversation can **supervise** the project by reviewing artifacts and guiding GitHub changes when asked, but it is **not** an always-running model connection to this GitHub Actions job. Claude's free chat plan does not provide an Anthropic API key. Claude can be added later only with supported API access or another legitimate integration.

## Expand later

Once the review workflow has been validated with actual provider keys, reuse the same coordinator for other repositories by moving `scripts/agent-hub.mjs` to a dedicated orchestration project, adding project-specific file allowlists and test commands, and requiring a human-reviewed PR gate before any deployment. Do not grant write permissions before that gate is in place.

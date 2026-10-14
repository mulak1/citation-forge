# CitationForge (#1) — First-User Acquisition & GTM Validation Kit
## Meta (FB/IG) Direct-Response Paid Social Funnel + Day-1 Google Search Console (GSC) Indexing Playbook

**Workspace**: `/Users/kadermula/Downloads/Ideas/studio/citation-forge/`  
**Dedicated Funnel URL**: `http://127.0.0.1:4101/lp`  
**Attribution Engine**: Client-side Meta Pixel + Server-side `POST /api/meta-capi` (`ViewContent`, `Lead`, `StartTrial`, `Purchase`) with `event_id` deduplication and SQLite UTM persistence (`data/citation_forge.db`).

---

## Part 1: 5 Direct-Response Meta (Facebook & Instagram) Ad Angles

### Ad Angle 1: The "Competitor Citation Hijack" Alert (Problem-Agitate-Solve)
- **Hook (First 3 Seconds / Overlay Text)**: *"Type 'Best [Your Category] in 2026' into ChatGPT or Perplexity right now. Is your competitor #1 while you aren't even mentioned?"*
- **Primary Text**:
  64% of technical B2B buyers now shortlist software inside ChatGPT Search, Perplexity Pro, and Google Gemini AI Overviews before they ever click a Google blue link.
  
  If your site blocks `PerplexityBot` or lacks a root `/llms.txt` and `@graph` JSON-LD schema, AI answer engines literally skip your brand and recommend your competitors instead.
  
  Run a free 10-second AI Citation X-Ray on your domain. See your exact Citation Share-of-Voice (`cSoV` %) across 25 buyer prompts and auto-compile a deploy-ready `/llms.txt` + `JSON-LD` patch in one click.
- **Headline**: `Free 10-Second AI Search Citation X-Ray`
- **Description**: `No signup required. Instant /llms.txt + JSON-LD compiler.`
- **CTA Button**: `Learn More` -> `http://127.0.0.1:4101/lp?utm_source=meta&utm_medium=paid_social&utm_campaign=competitor_hijack_v1&utm_content=split_xray`
- **Visual Creative Spec**: 1080x1350 (4:5 vertical). Top half shows a dark-mode Perplexity prompt recommending a competitor at Rank #1; bottom half shows CitationForge's `#07090E` obsidian scorecard flipping `GPTBot: Disallow` to `Allow` and lifting cSoV from `14.2%` to `38.6%`.
- **Audience Targeting**: SaaS Founders, VPs of Growth, Technical SEOs, Developer Marketing Leads (Interests: Linear, Vercel, Supabase, Stripe, Ahrefs, Semrush, Product Hunt).

---

### Ad Angle 2: The "Silent `robots.txt` Blocker" Technical Diagnostic
- **Hook**: *"Your CDN's default `robots.txt` or WAF rule might be silently blocking ChatGPT's `OAI-SearchBot` and `PerplexityBot`."*
- **Primary Text**:
  Many engineering teams blocked `GPTBot` in 2023 to stop model training—and accidentally locked themselves out of 2026 live RAG search citations in ChatGPT Search, Perplexity, and Claude.
  
  CitationForge runs a deterministic 10-second diagnostic across all 6 AI answer engine crawlers (`GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `Google-Extended`, `ClaudeBot`, `Applebot-Extended`) and generates the exact `/robots.txt` + `/llms.txt` patch your repo needs.
- **Headline**: `Are You Blocking ChatGPT Search & Perplexity?`
- **Description**: `Test your domain free in 10 seconds.`
- **CTA Button**: `Apply Now` -> `http://127.0.0.1:4101/lp?utm_source=meta&utm_medium=paid_social&utm_campaign=robots_blocker_v1&utm_content=terminal_diff`
- **Visual Creative Spec**: 1080x1080 (1:1 square). Side-by-side Git diff in `JetBrains Mono` showing red `- Disallow: /` for `PerplexityBot` replaced with emerald `+ Allow: /llms.txt` and `+24.4% Citation Lift`.
- **Audience Targeting**: CTOs, Staff Engineers, DevOps Leads, Technical Founders.

---

### Ad Angle 3: The "Stop Pricing Hallucinations" Schema-DTS Angle
- **Hook**: *"Why does ChatGPT still tell buyers your product costs what it cost in 2023?"*
- **Primary Text**:
  When an LLM scrapes a React/Next.js pricing page without structured `AggregateOffer` JSON-LD or a clean `/llms-full.txt` manifest, it falls back to stale training weights—and hallucinates your pricing tiers to enterprise buyers.
  
  CitationForge compiles a strict `schema-dts` JSON-LD `@graph` (`Organization` + `SoftwareApplication` + `FAQPage` + `Wikidata sameAs`) plus a single-fetch `/llms-full.txt` markdown corpus so AI agents always cite your exact 2026 pricing and SOC2 posture.
- **Headline**: `Stop AI Models From Hallucinating Your Pricing`
- **Description**: `Auto-compile /llms-full.txt & JSON-LD in 10s.`
- **CTA Button**: `Download` -> `http://127.0.0.1:4101/lp?utm_source=meta&utm_medium=paid_social&utm_campaign=pricing_hallucination_v1&utm_content=jsonld_graph`
- **Visual Creative Spec**: 1080x1350 (4:5). Annotated JSON-LD `@graph` card with emerald telemetry badges showing verified pricing and Wikidata entity disambiguation.
- **Audience Targeting**: B2B SaaS Product Marketers, Revenue Operations, Growth Engineers.

---

### Ad Angle 4: The "Auto-`llms.txt` Compiler in 10 Seconds" Speed Utility Angle
- **Hook**: *"Don't spend 2 days hand-writing `/llms.txt` and `/llms-full.txt`. Compile both in 10 seconds."*
- **Primary Text**:
  Following Jeremy Howard's `AnswerDotAI/llms-txt` spec requires a strict CommonMark sequence: `# H1 Brand`, `> Blockquote Summary`, and categorized H2 Markdown link lists—plus an inline `/llms-full.txt` corpus for deep research agents.
  
  Enter your domain into CitationForge to generate both files automatically, validate your token-to-HTML signal ratio, and optionally connect our GitHub Auto-PR Bot ($99/mo) to keep `/llms.txt` synced on every docs deploy.
- **Headline**: `Generate Your Spec-Compliant /llms.txt Free`
- **Description**: `Built on the AnswerDotAI v1.0 specification.`
- **CTA Button**: `Sign Up` -> `http://127.0.0.1:4101/lp?utm_source=meta&utm_medium=paid_social&utm_campaign=llmstxt_compiler_v1&utm_content=code_preview`
- **Visual Creative Spec**: 1920x1080 / 1080x1350 video or static carousel showing 1-click preset selection (`stripe.com`, `linear.app`, `supabase.com`) and instant `/llms.txt` code output.
- **Audience Targeting**: Full-Stack Developers, Docs Engineers, Open-Source Maintainers, Indie Hackers.

---

### Ad Angle 5: The "$49 GEO Audit vs $5,000 Agency Retainer" Value Anchor
- **Hook**: *"SEO agencies want $5,000/mo for 'AI Search Optimization.' All you actually need is this $49 deterministic engineering pack."*
- **Primary Text**:
  Generative Engine Optimization (GEO) isn't magic—it's engineering:
  1. Weighted Citation Share-of-Voice (`w_r = 1 / log2(r + 1)`) across your top 50 buyer prompts.
  2. Spec-compliant `/llms.txt` & `/llms-full.txt` manifests at your root domain.
  3. Unblocking `OAI-SearchBot` and `PerplexityBot` in `/robots.txt`.
  4. Type-safe `@graph` JSON-LD with `Wikidata sameAs` disambiguation.
  
  Run our 25-prompt domain grader 100% free above the fold, or grab the complete 50-Prompt Audit Pack for $49 flat—backed by a 30-day money-back Citation Lift Guarantee.
- **Headline**: `$49 Complete AI Search Audit vs $5k Agencies`
- **Description**: `30-Day Money-Back Citation Lift Guarantee.`
- **CTA Button**: `Get Offer` -> `http://127.0.0.1:4101/lp?utm_source=meta&utm_medium=paid_social&utm_campaign=price_anchor_49&utm_content=comparison_table`
- **Visual Creative Spec**: High-contrast dark comparison table: `$5,000/mo Traditional SEO Agency (PDF fluff)` vs `$49 CitationForge GEO Compiler (Deployable /llms.txt + JSON-LD + 50-Prompt Radar)`.
- **Audience Targeting**: Bootstrapped & Seed/Series A Founders, CEOs, Head of Growth.

---

## Part 2: Day-1 Google Search Console (GSC) & Programmatic SEO Indexing Checklist

- [x] **1. XML Sitemap Endpoint Live (`/sitemap.xml`)**:
  - Serves valid `application/xml; charset=utf-8` containing `/`, `/lp`, `/directory`, `/privacy`, `/terms`, `/llms.txt`, `/llms-full.txt`, and all **60 seeded `/seo/:slug` pages** (`67` total canonical URLs).
  - Submit `https://citationforge.dev/sitemap.xml` directly in **GSC -> Sitemaps -> Add a new sitemap**.
- [x] **2. AI-Friendly `/robots.txt` Live (`/robots.txt`)**:
  - Explicitly allows `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `Google-Extended`, `ClaudeBot`, and `*`, with `Sitemap:` directive at footer.
- [x] **3. Three-Pillar Programmatic SEO Architecture (60 Pages in SQLite `seo_pages`)**:
  - **20 Category Leaderboards**: e.g., `/seo/ai-search-visibility-crm-software`, `/seo/ai-search-visibility-payment-gateways`, `/seo/ai-search-visibility-cloud-databases`.
  - **22 Head-to-Head Brand Citation Comparisons**: e.g., `/seo/stripe-vs-adyen-ai-citation-audit`, `/seo/linear-vs-jira-ai-citation-audit`, `/seo/supabase-vs-firebase-ai-citation-audit`.
  - **18 Technical GEO Engineering Playbooks**: e.g., `/seo/how-to-generate-llms-txt-for-saas`, `/seo/perplexity-citation-ranking-factors-2026`.
- [x] **4. Per-Page Technical SEO & Dual-Reader Schema**:
  - Unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, dynamic SVG OpenGraph social cards (`/api/og?slug=...`), and `@graph` JSON-LD (`TechArticle` + `FAQPage`) on every `/seo/:slug` route.
  - Hub-and-Spoke internal linking via `/directory`, breadcrumbs, and 6 contextual related reports on every page to prevent orphan URLs.
- [x] **5. Day-1 GSC URL Inspection Priority Queue (First 10 URLs to Request Indexing)**:
  1. `/`
  2. `/directory`
  3. `/seo/how-to-generate-llms-txt-for-saas`
  4. `/seo/perplexity-citation-ranking-factors-2026`
  5. `/seo/stripe-vs-adyen-ai-citation-audit`
  6. `/seo/linear-vs-jira-ai-citation-audit`
  7. `/seo/supabase-vs-firebase-ai-citation-audit`
  8. `/seo/ai-search-visibility-crm-software`
  9. `/seo/ai-search-visibility-payment-gateways`
  10. `/seo/json-ld-entity-graph-schema-dts-for-ai-agents`

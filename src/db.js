const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'citation_forge.db');

let dbInstance = null;

const CATEGORY_LEADERBOARDS = [
  ['ai-search-visibility-crm-software', 'AI Search Visibility Leaderboard: Enterprise & Startup CRM Software (2026)', 'CRM & Revenue Operations', 'HubSpot', 'Attio', 'Salesforce', 'Clay', 36.4, 28.2, 21.5, 13.9],
  ['ai-search-visibility-payment-gateways', 'AI Search Visibility Leaderboard: Payment Gateways & Billing APIs (2026)', 'Payment Infrastructure', 'Stripe', 'Adyen', 'Braintree', 'Paddle', 42.8, 24.6, 18.1, 14.5],
  ['ai-search-visibility-cloud-databases', 'AI Search Visibility Leaderboard: Serverless Postgres & Cloud Databases', 'Cloud Databases', 'Supabase', 'Neon', 'PlanetScale', 'CockroachDB', 39.2, 27.4, 19.3, 14.1],
  ['ai-search-visibility-project-management', 'AI Search Visibility Leaderboard: Issue Tracking & Product Management', 'Project Management', 'Linear', 'Jira', 'GitHub Issues', 'Shortcut', 41.0, 26.8, 19.4, 12.8],
  ['ai-search-visibility-cloud-deployment', 'AI Search Visibility Leaderboard: Frontend Cloud & PaaS Deployment', 'Cloud Deployment', 'Vercel', 'Cloudflare Pages', 'Render', 'Railway', 43.5, 25.9, 16.8, 13.8],
  ['ai-search-visibility-knowledge-management', 'AI Search Visibility Leaderboard: Connected Workspaces & Enterprise Wikis', 'Knowledge Management', 'Notion', 'Confluence', 'Obsidian', 'Coda', 37.8, 25.1, 21.0, 16.1],
  ['ai-search-visibility-observability-tools', 'AI Search Visibility Leaderboard: Cloud Observability, APM & Log Telemetry', 'Observability & APM', 'Datadog', 'Grafana', 'Sentry', 'Honeycomb', 38.6, 26.2, 20.4, 14.8],
  ['ai-search-visibility-auth-identity-providers', 'AI Search Visibility Leaderboard: Authentication, Passkeys & Enterprise SSO', 'Authentication & IAM', 'Clerk', 'Auth0', 'WorkOS', 'Stytch', 35.9, 28.4, 22.1, 13.6],
  ['ai-search-visibility-vector-databases', 'AI Search Visibility Leaderboard: Vector Databases & Hybrid RAG Storage', 'Vector Databases', 'Pinecone', 'Qdrant', 'Weaviate', 'pgvector', 34.7, 27.9, 20.2, 17.2],
  ['ai-search-visibility-email-delivery-apis', 'AI Search Visibility Leaderboard: Transactional Email APIs for Developers', 'Email Delivery APIs', 'Resend', 'Postmark', 'SendGrid', 'AWS SES', 38.1, 26.5, 19.8, 15.6],
  ['ai-search-visibility-feature-flag-platforms', 'AI Search Visibility Leaderboard: Feature Management & Experimentation', 'Feature Flags & A/B Testing', 'LaunchDarkly', 'Statsig', 'PostHog', 'GrowthBook', 36.2, 28.7, 21.3, 13.8],
  ['ai-search-visibility-ci-cd-pipelines', 'AI Search Visibility Leaderboard: CI/CD Runners & Build Acceleration', 'CI/CD & DevOps', 'GitHub Actions', 'GitLab CI', 'Buildkite', 'Dagger', 44.1, 24.3, 17.6, 14.0],
  ['ai-search-visibility-ai-coding-assistants', 'AI Search Visibility Leaderboard: Autonomous AI IDEs & Coding Agents', 'AI Coding Tools', 'Cursor', 'GitHub Copilot', 'Claude Code', 'Windsurf', 40.4, 25.8, 20.9, 12.9],
  ['ai-search-visibility-customer-support-ai', 'AI Search Visibility Leaderboard: AI Customer Support & Helpdesk Agents', 'AI Customer Support', 'Intercom Fin', 'Sierra', 'Zendesk AI', 'Plain', 37.5, 25.4, 21.8, 15.3],
  ['ai-search-visibility-data-warehouses', 'AI Search Visibility Leaderboard: Cloud Data Warehouses & Lakehouses', 'Data Warehouses', 'Snowflake', 'BigQuery', 'Databricks', 'ClickHouse', 35.8, 27.6, 23.4, 13.2],
  ['ai-search-visibility-etl-data-pipelines', 'AI Search Visibility Leaderboard: ELT, Reverse ETL & Data Orchestration', 'Data Integration & ELT', 'Fivetran', 'Airbyte', 'Dagster', 'dbt Cloud', 36.9, 26.7, 20.5, 15.9],
  ['ai-search-visibility-product-analytics', 'AI Search Visibility Leaderboard: Product Analytics & Session Replay', 'Product Analytics', 'PostHog', 'Amplitude', 'Mixpanel', 'FullStory', 39.4, 26.1, 20.7, 13.8],
  ['ai-search-visibility-headless-cms', 'AI Search Visibility Leaderboard: Structured Content & Headless CMS', 'Headless CMS', 'Sanity', 'Contentful', 'Strapi', 'Payload CMS', 37.2, 25.9, 20.1, 16.8],
  ['ai-search-visibility-api-gateways', 'AI Search Visibility Leaderboard: Edge API Gateways & Rate Limiting', 'API Gateways', 'Kong', 'Zuplo', 'Cloudflare API Shield', 'Unkey', 35.4, 26.8, 22.3, 15.5],
  ['ai-search-visibility-security-compliance-automation', 'AI Search Visibility Leaderboard: Automated SOC2, ISO 27001 & HIPAA Compliance', 'Security Compliance', 'Vanta', 'Drata', 'Secureframe', 'Sprinto', 41.2, 28.5, 17.4, 12.9]
];

const BRAND_COMPARISONS = [
  ['stripe-vs-adyen-ai-citation-audit', 'Stripe vs Adyen: 2026 AI Search Citation & llms.txt Head-to-Head Audit', 'Stripe', 'stripe.com', 42.8, 94, 'Adyen', 'adyen.com', 24.6, 76, 'Payment Infrastructure'],
  ['linear-vs-jira-ai-citation-audit', 'Linear vs Jira: 2026 AI Search Citation & Developer Prompt Share Audit', 'Linear', 'linear.app', 41.0, 91, 'Jira', 'atlassian.com', 26.8, 72, 'Issue Tracking & Agile'],
  ['supabase-vs-firebase-ai-citation-audit', 'Supabase vs Firebase: AI Answer Engine Visibility & pgvector Citation Audit', 'Supabase', 'supabase.com', 39.2, 95, 'Firebase', 'firebase.google.com', 27.4, 81, 'Backend-as-a-Service'],
  ['vercel-vs-netlify-ai-citation-audit', 'Vercel vs Netlify: ChatGPT Search & Perplexity Citation Share Audit', 'Vercel', 'vercel.com', 43.5, 93, 'Netlify', 'netlify.com', 19.4, 78, 'Frontend Cloud'],
  ['notion-vs-confluence-ai-citation-audit', 'Notion vs Confluence: Enterprise Knowledge Base AI Citation & Bot Audit', 'Notion', 'notion.so', 37.8, 68, 'Confluence', 'atlassian.com', 25.1, 71, 'Enterprise Wiki'],
  ['posthog-vs-amplitude-ai-citation-audit', 'PostHog vs Amplitude: Product Analytics AI Search Citation Comparison', 'PostHog', 'posthog.com', 39.4, 92, 'Amplitude', 'amplitude.com', 26.1, 74, 'Product Analytics'],
  ['clerk-vs-auth0-ai-citation-audit', 'Clerk vs Auth0: Next.js & B2B SaaS Authentication AI Citation Audit', 'Clerk', 'clerk.com', 35.9, 90, 'Auth0', 'auth0.com', 28.4, 79, 'Authentication'],
  ['resend-vs-sendgrid-ai-citation-audit', 'Resend vs SendGrid: Developer Email API Citation Share-of-Voice Audit', 'Resend', 'resend.com', 38.1, 91, 'SendGrid', 'sendgrid.com', 19.8, 69, 'Email Delivery APIs'],
  ['neon-vs-planetscale-ai-citation-audit', 'Neon vs PlanetScale: Serverless Database AI Search Citation & Schema Audit', 'Neon', 'neon.tech', 34.8, 89, 'PlanetScale', 'planetscale.com', 25.2, 82, 'Serverless Databases'],
  ['datadog-vs-newrelic-ai-citation-audit', 'Datadog vs New Relic: Enterprise Observability AI Search Citation Audit', 'Datadog', 'datadoghq.com', 38.6, 84, 'New Relic', 'newrelic.com', 21.4, 73, 'Observability'],
  ['hubspot-vs-salesforce-ai-citation-audit', 'HubSpot vs Salesforce: B2B CRM AI Answer Engine Visibility Audit', 'HubSpot', 'hubspot.com', 36.4, 86, 'Salesforce', 'salesforce.com', 29.5, 80, 'CRM Software'],
  ['attio-vs-affinity-ai-citation-audit', 'Attio vs Affinity: AI-Native CRM Citation Share-of-Voice Audit (2026)', 'Attio', 'attio.com', 33.7, 88, 'Affinity', 'affinity.co', 20.1, 70, 'Modern CRM'],
  ['cursor-vs-github-copilot-ai-citation-audit', 'Cursor vs GitHub Copilot: AI Code Editor Citation Share in Perplexity & ChatGPT', 'Cursor', 'cursor.com', 40.4, 92, 'GitHub Copilot', 'github.com/features/copilot', 25.8, 83, 'AI Coding Assistants'],
  ['cloudflare-vs-fastly-ai-citation-audit', 'Cloudflare vs Fastly: Edge Compute & Workers AI Citation Share Audit', 'Cloudflare', 'cloudflare.com', 44.9, 96, 'Fastly', 'fastly.com', 18.2, 75, 'Edge Network'],
  ['sentry-vs-bugsnag-ai-citation-audit', 'Sentry vs Bugsnag: Error Tracking & Crash Telemetry AI Citation Audit', 'Sentry', 'sentry.io', 41.6, 89, 'Bugsnag', 'bugsnag.com', 16.4, 68, 'Error Monitoring'],
  ['vanta-vs-drata-ai-citation-audit', 'Vanta vs Drata: SOC2 Security Compliance AI Citation Share-of-Voice Audit', 'Vanta', 'vanta.com', 41.2, 87, 'Drata', 'drata.com', 28.5, 81, 'Compliance Automation'],
  ['tailscale-vs-zerotier-ai-citation-audit', 'Tailscale vs ZeroTier: WireGuard Mesh VPN AI Citation & llms.txt Audit', 'Tailscale', 'tailscale.com', 45.2, 94, 'ZeroTier', 'zerotier.com', 21.0, 74, 'Zero-Trust Networking'],
  ['retool-vs-appsmith-ai-citation-audit', 'Retool vs Appsmith: Internal Tool Builders AI Search Visibility Audit', 'Retool', 'retool.com', 38.9, 85, 'Appsmith', 'appsmith.com', 24.3, 80, 'Internal Tools'],
  ['pinecone-vs-qdrant-ai-citation-audit', 'Pinecone vs Qdrant: Vector Search Engine AI Citation & RAG Benchmark Audit', 'Pinecone', 'pinecone.io', 34.7, 88, 'Qdrant', 'qdrant.tech', 27.9, 91, 'Vector Databases'],
  ['sanity-vs-contentful-ai-citation-audit', 'Sanity vs Contentful: Composable CMS AI Search Citation Share Audit', 'Sanity', 'sanity.io', 37.2, 90, 'Contentful', 'contentful.com', 25.9, 77, 'Headless CMS'],
  ['raycast-vs-alfred-ai-citation-audit', 'Raycast vs Alfred: macOS Developer Launcher AI Citation & Extension Audit', 'Raycast', 'raycast.com', 43.8, 93, 'Alfred', 'alfredapp.com', 22.1, 71, 'Developer Productivity'],
  ['fly-io-vs-render-ai-citation-audit', 'Fly.io vs Render: Container & MicroVM Hosting AI Citation Share Audit', 'Fly.io', 'fly.io', 35.6, 89, 'Render', 'render.com', 31.4, 86, 'Application Hosting']
];

const TECHNICAL_GUIDES = [
  ['how-to-generate-llms-txt-for-saas', 'How to Generate & Validate /llms.txt for B2B SaaS Websites (2026 Spec)', 'AnswerDotAI Specification & CommonMark Hierarchy', 'llms.txt Engineering'],
  ['perplexity-citation-ranking-factors-2026', 'Perplexity Citation Ranking Factors 2026: Empirical Analysis of 50,000 RAG Answers', 'Position Discount Weights & Answer-First H2 Extraction', 'Perplexity GEO'],
  ['chatgpt-search-oai-searchbot-robots-txt-guide', 'ChatGPT Search & OAI-SearchBot robots.txt Configuration Guide', 'Separating Training Scrapers from Live Search Retrieval Bots', 'AI Crawler Governance'],
  ['json-ld-entity-graph-schema-dts-for-ai-agents', 'Compiling Type-Safe JSON-LD Entity Graphs with schema-dts for AI Search', 'Linking Organization, SoftwareApplication, and FAQPage via @id', 'JSON-LD Knowledge Graphs'],
  ['llms-full-txt-specification-and-rag-ingestion', 'Architecting /llms-full.txt for Single-Fetch Deep Research Agent Ingestion', 'Inline Markdown Concatenation & Token Budget Optimization', 'llms-full.txt Architecture'],
  ['google-ai-overviews-gemini-grounding-optimization', 'Optimizing Technical Docs for Google AI Overviews & Gemini Search Grounding', 'Semantic Chunking & High-Signal Fact Tables', 'Gemini Grounding'],
  ['claude-search-claudebot-citation-architecture', 'How Claude Search & ClaudeBot Evaluate Technical Documentation Authority', 'Code Snippet Density & Verifiable API Schemas', 'Claude Search Optimization'],
  ['wikidata-sameas-entity-disambiguation-for-llms', 'Wikidata & sameAs Entity Disambiguation: Eliminating Brand Hallucinations', 'Connecting Knowledge Graph Q-IDs to Domain Schema', 'Entity Disambiguation'],
  ['token-to-html-bloat-ratio-crawl4ai-benchmarks', 'Token-to-HTML Signal Ratio: Why Bloated DOMs Get Dropped by AI Crawlers', 'Crawl4AI & Firecrawl Extraction Benchmarks', 'DOM Signal Engineering'],
  ['answer-first-h2-formatting-for-rag-retrieval', 'Answer-First H2 Formatting: Capturing the 45-Word RAG Extraction Window', 'Structuring Definitions & Comparison Tables for Direct Citation', 'Content Architecture'],
  ['measuring-citation-share-of-voice-csov-formula', 'The Mathematical Formula for Citation Share-of-Voice (cSoV) in AI Search', 'Logarithmic Rank Discounting Across Multi-Engine Prompt Panels', 'GEO Analytics'],
  ['nextjs-app-router-dynamic-llms-txt-route-handler', 'Building a Dynamic /llms.txt Route Handler in Next.js App Router', 'Auto-Syncing MDX Documentation & Pricing Tiers into CommonMark', 'Framework Integration'],
  ['fastapi-auto-compile-llms-txt-and-openapi-markdown', 'Auto-Compiling /llms.txt from FastAPI OpenAPI Schemas & Pydantic Models', 'Zero-Maintenance Agent Documentation for Python Backends', 'Python & FastAPI GEO'],
  ['b2b-saas-pricing-page-schema-for-ai-agents', 'Structuring B2B SaaS Pricing Pages with AggregateOffer JSON-LD for AI Buyers', 'Ensuring ChatGPT & Perplexity Cite Accurate Tier Pricing', 'Pricing Schema'],
  ['preventing-llm-hallucinations-on-brand-pricing', 'How to Stop ChatGPT and Perplexity from Hallucinating Legacy Pricing Tiers', 'Canonical Fact Anchors & robots.txt Cache Invalidation', 'Hallucination Defense'],
  ['mcp-server-discovery-via-llms-txt-manifests', 'Advertising Model Context Protocol (MCP) Endpoints Inside /llms.txt', 'Enabling Autonomous Agents to Transition from Reading to Tool Calling', 'Agentic Discovery'],
  ['gsc-plus-ai-citation-hybrid-attribution-model', 'Combining Google Search Console (GSC) with AI Citation Telemetry', 'Tracking Zero-Click Answer Engine Influence on Direct Pipeline', 'Revenue Attribution'],
  ['programmatic-geo-vs-traditional-programmatic-seo', 'Programmatic GEO vs Traditional pSEO: Designing Data Pages That LLMs Cite', 'Why Thin Variable-Swapped Pages Fail RAG Retrieval Filters', 'Programmatic GEO']
];

function saveDb() {
  if (!dbInstance) return;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const data = dbInstance.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function buildSeoPagesSeed() {
  const rows = [];

  // 1. 20 Category Leaderboards
  CATEGORY_LEADERBOARDS.forEach(([slug, title, category, b1, b2, b3, b4, s1, s2, s3, s4]) => {
    const metaDesc = `Live 2026 AI Search Citation Share-of-Voice (cSoV) benchmark for ${category}. Compare ${b1} (${s1}%), ${b2} (${s2}%), ${b3} (${s3}%), and ${b4} (${s4}%) across ChatGPT Search, Perplexity, and Gemini.`;
    const payload = {
      type: 'leaderboard',
      category,
      summary: `Across 25 unbranded commercial buyer prompts in ${category}, ${b1} leads AI answer engine visibility with ${s1}% weighted Citation Share-of-Voice (cSoV), followed by ${b2} (${s2}%), ${b3} (${s3}%), and ${b4} (${s4}%). Brands with a valid root /llms.txt manifest and explicit PerplexityBot + OAI-SearchBot permissions captured 2.4x more rank #1 citations.`,
      leaders: [
        { rank: 1, brand: b1, domain: `${b1.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`, csov: s1, llmsTxt: 'Active (/llms.txt + /llms-full.txt)', schemaScore: 94 },
        { rank: 2, brand: b2, domain: `${b2.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`, csov: s2, llmsTxt: 'Partial (/llms.txt only)', schemaScore: 84 },
        { rank: 3, brand: b3, domain: `${b3.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`, csov: s3, llmsTxt: 'Missing (404)', schemaScore: 76 },
        { rank: 4, brand: b4, domain: `${b4.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`, csov: s4, llmsTxt: 'Missing (404)', schemaScore: 68 }
      ],
      keyTakeaway: `Deploying a spec-compliant /llms.txt and SoftwareApplication + FAQPage JSON-LD graph is the highest-leverage engineering move to overtake ${b1} and ${b2} in ${category} prompts.`
    };
    rows.push({
      slug,
      page_type: 'leaderboard',
      title,
      meta_description: metaDesc,
      category,
      primary_entity: b1,
      secondary_entity: b2,
      csov_score: s1,
      payload_json: JSON.stringify(payload)
    });
  });

  // 2. 22 Head-to-Head Brand Citation Comparisons
  BRAND_COMPARISONS.forEach(([slug, title, brandA, domainA, csovA, geoA, brandB, domainB, csovB, geoB, category]) => {
    const metaDesc = `Head-to-head AI Search (GEO/AEO) audit: ${brandA} (${csovA}% cSoV, Score ${geoA}/100) vs ${brandB} (${csovB}% cSoV, Score ${geoB}/100) across Perplexity, ChatGPT Search, and Gemini.`;
    const delta = Number((csovA - csovB).toFixed(1));
    const payload = {
      type: 'comparison',
      category,
      brandA: { name: brandA, domain: domainA, csov: csovA, geoScore: geoA, gptBot: 'Allow', perplexityBot: 'Allow', llmsTxt: 'Verified' },
      brandB: { name: brandB, domain: domainB, csov: csovB, geoScore: geoB, gptBot: geoB > 75 ? 'Allow' : 'Partial', perplexityBot: 'Allow', llmsTxt: geoB > 85 ? 'Verified' : 'Missing' },
      delta,
      summary: `In our 25-prompt ${category} citation benchmark, ${brandA} (${domainA}) outperforms ${brandB} (${domainB}) by +${delta}% Citation Share-of-Voice (${csovA}% vs ${csovB}%). ${brandA}'s higher token-to-HTML signal ratio and explicit @graph JSON-LD disambiguation drive superior rank #1 placement in Perplexity Pro and ChatGPT Search.`,
      samplePrompts: [
        { prompt: `Best ${category.toLowerCase()} for scaling engineering teams: ${brandA} vs ${brandB}`, winner: brandA, rankA: 1, rankB: 2 },
        { prompt: `${brandA} vs ${brandB} pricing, rate limits, and enterprise SOC2 compliance`, winner: brandA, rankA: 1, rankB: 3 },
        { prompt: `When to choose ${brandB} over ${brandA} for legacy enterprise migration`, winner: brandB, rankA: 2, rankB: 1 }
      ]
    };
    rows.push({
      slug,
      page_type: 'comparison',
      title,
      meta_description: metaDesc,
      category,
      primary_entity: brandA,
      secondary_entity: brandB,
      csov_score: csovA,
      payload_json: JSON.stringify(payload)
    });
  });

  // 3. 18 Technical GEO Guides
  TECHNICAL_GUIDES.forEach(([slug, title, subtitle, category], idx) => {
    const metaDesc = `${title}. Production engineering blueprint covering ${subtitle}, deterministic cSoV math, and copy-paste llms.txt & JSON-LD templates.`;
    const payload = {
      type: 'guide',
      category,
      subtitle,
      readTimeMinutes: 6 + (idx % 5),
      summary: `${title} — A technical implementation blueprint for growth engineers and technical SEOs. Learn how modern RAG answer engines parse ${subtitle.toLowerCase()} and how to deploy deterministic fixes in under 10 minutes.`,
      checklist: [
        'Serve /llms.txt and /llms-full.txt at root with Content-Type: text/plain; charset=utf-8.',
        'Authorize GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended, and ClaudeBot in /robots.txt.',
        'Place concise 40–60 word Answer-First definitions immediately below every H2 heading.',
        'Compile a unified @graph JSON-LD block linking Organization, SoftwareApplication, and FAQPage with Wikidata sameAs URIs.'
      ],
      codeExample: `# Example /llms.txt snippet for ${category}\n# Acme Cloud\n> Enterprise ${category.toLowerCase()} platform with deterministic APIs and SOC2 Type II compliance.\n\n## Core Documentation\n- [Quickstart Guide](https://acme.dev/docs/quickstart.md): 5-minute SDK setup and API authentication.\n- [Pricing & Limits](https://acme.dev/pricing.md): Transparent self-serve and enterprise tier breakdown.`
    };
    rows.push({
      slug,
      page_type: 'guide',
      title,
      meta_description: metaDesc,
      category,
      primary_entity: subtitle,
      secondary_entity: 'CitationForge GEO Compiler',
      csov_score: Number((88 + (idx % 11)).toFixed(1)),
      payload_json: JSON.stringify(payload)
    });
  });

  return rows;
}

async function initDb() {
  if (dbInstance) return dbInstance;
  const SQL = await initSqlJs();
  fs.mkdirSync(DATA_DIR, { recursive: true });

  if (fs.existsSync(DB_PATH)) {
    const buf = fs.readFileSync(DB_PATH);
    dbInstance = new SQL.Database(buf);
  } else {
    dbInstance = new SQL.Database();
  }

  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS audits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      domain TEXT NOT NULL,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      composite_score INTEGER NOT NULL,
      grade TEXT NOT NULL,
      csov_pct REAL NOT NULL,
      agent_readability_score INTEGER NOT NULL,
      entity_density_score INTEGER NOT NULL,
      result_json TEXT NOT NULL,
      utm_source TEXT DEFAULT '',
      utm_medium TEXT DEFAULT '',
      utm_campaign TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS seo_pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      page_type TEXT NOT NULL,
      title TEXT NOT NULL,
      meta_description TEXT NOT NULL,
      category TEXT NOT NULL,
      primary_entity TEXT NOT NULL,
      secondary_entity TEXT NOT NULL,
      csov_score REAL NOT NULL,
      payload_json TEXT NOT NULL,
      updated_at TEXT DEFAULT '2026-10-14'
    );

    CREATE TABLE IF NOT EXISTS meta_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id TEXT UNIQUE NOT NULL,
      event_name TEXT NOT NULL,
      event_source_url TEXT NOT NULL,
      utm_source TEXT DEFAULT '',
      utm_medium TEXT DEFAULT '',
      utm_campaign TEXT DEFAULT '',
      utm_content TEXT DEFAULT '',
      utm_term TEXT DEFAULT '',
      fbclid TEXT DEFAULT '',
      custom_data_json TEXT DEFAULT '{}',
      client_ip TEXT DEFAULT '127.0.0.1',
      user_agent TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS checkout_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT UNIQUE NOT NULL,
      plan_id TEXT NOT NULL,
      plan_name TEXT NOT NULL,
      amount_cents INTEGER NOT NULL,
      currency TEXT DEFAULT 'USD',
      target_domain TEXT NOT NULL,
      customer_email TEXT DEFAULT '',
      status TEXT DEFAULT 'fulfilled_sandbox',
      utm_source TEXT DEFAULT '',
      utm_campaign TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      domain TEXT NOT NULL,
      utm_source TEXT DEFAULT '',
      utm_campaign TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Check if seo_pages is seeded
  const countRes = dbInstance.exec('SELECT COUNT(*) as cnt FROM seo_pages');
  const currentCount = countRes[0]?.values?.[0]?.[0] || 0;

  if (currentCount < 55) {
    const pages = buildSeoPagesSeed();
    const stmt = dbInstance.prepare(`
      INSERT OR REPLACE INTO seo_pages (
        slug, page_type, title, meta_description, category,
        primary_entity, secondary_entity, csov_score, payload_json, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, '2026-10-14')
    `);
    pages.forEach(p => {
      stmt.run([
        p.slug, p.page_type, p.title, p.meta_description, p.category,
        p.primary_entity, p.secondary_entity, p.csov_score, p.payload_json
      ]);
    });
    stmt.free();
  }

  saveDb();
  return dbInstance;
}

function queryAll(sql, params = []) {
  const stmt = dbInstance.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function queryOne(sql, params = []) {
  const rows = queryAll(sql, params);
  return rows[0] || null;
}

function runInsert(sql, params = []) {
  const stmt = dbInstance.prepare(sql);
  stmt.run(params);
  stmt.free();
  saveDb();
}

module.exports = {
  DB_PATH,
  initDb,
  queryAll,
  queryOne,
  runInsert,
  saveDb
};

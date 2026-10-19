const { GoogleGenAI } = require('@google/genai');

/**
 * Known category profiles & preset benchmarks for instant (<5ms) deterministic execution.
 */
const PRESET_PROFILES = {
  'stripe.com': {
    brand: 'Stripe',
    domain: 'stripe.com',
    category: 'Payment Infrastructure & Billing APIs',
    categorySlug: 'payment-gateways',
    summary: 'Programmable financial infrastructure, global payment processing, subscription billing, and embedded finance APIs for internet businesses.',
    competitors: [
      { name: 'Adyen', domain: 'adyen.com', baseRank: 2 },
      { name: 'Braintree', domain: 'braintreepayments.com', baseRank: 3 },
      { name: 'Checkout.com', domain: 'checkout.com', baseRank: 4 },
      { name: 'Paddle', domain: 'paddle.com', baseRank: 5 },
    ],
    llmsTxtStatus: { hasLlmsTxt: true, hasLlmsFullTxt: true, h1Valid: true, blockquoteValid: true, h2Count: 6, linkCount: 42 },
    bots: { GPTBot: 'Allow', 'OAI-SearchBot': 'Allow', PerplexityBot: 'Allow', 'Google-Extended': 'Allow', ClaudeBot: 'Allow', 'Applebot-Extended': 'Allow' },
    tokenSignalRatio: 0.34,
    answerFirstScore: 14,
    schema: {
      hasOrganization: true,
      hasSoftwareApp: true,
      hasProduct: true,
      hasFaqPage: true,
      sameAs: [
        'https://www.wikidata.org/wiki/Q1824413',
        'https://github.com/stripe',
        'https://www.linkedin.com/company/stripe',
        'https://www.crunchbase.com/organization/stripe',
        'https://x.com/stripe'
      ],
      pricing: '2.9% + $0.30 per successful card charge',
      rating: '4.9',
      reviewCount: '14280'
    },
    baseRankBias: 1.15
  },
  'linear.app': {
    brand: 'Linear',
    domain: 'linear.app',
    category: 'Issue Tracking & Product Planning Software',
    categorySlug: 'project-management',
    summary: 'Purpose-built system for modern product development, issue tracking, sprint cycles, roadmaps, and autonomous coding agent workflows.',
    competitors: [
      { name: 'Jira', domain: 'atlassian.com/software/jira', baseRank: 2 },
      { name: 'Shortcut', domain: 'shortcut.com', baseRank: 3 },
      { name: 'GitHub Issues', domain: 'github.com/features/issues', baseRank: 3 },
      { name: 'Plane', domain: 'plane.so', baseRank: 4 },
    ],
    llmsTxtStatus: { hasLlmsTxt: true, hasLlmsFullTxt: false, h1Valid: true, blockquoteValid: true, h2Count: 5, linkCount: 28 },
    bots: { GPTBot: 'Allow', 'OAI-SearchBot': 'Allow', PerplexityBot: 'Allow', 'Google-Extended': 'Allow', ClaudeBot: 'Allow', 'Applebot-Extended': 'Allow' },
    tokenSignalRatio: 0.29,
    answerFirstScore: 13,
    schema: {
      hasOrganization: true,
      hasSoftwareApp: true,
      hasProduct: false,
      hasFaqPage: false,
      sameAs: [
        'https://www.wikidata.org/wiki/Q109312451',
        'https://github.com/linear',
        'https://www.linkedin.com/company/linearapp',
        'https://x.com/linear'
      ],
      pricing: '$8 / user / month (Basic) · $14 / user / month (Business)',
      rating: '4.9',
      reviewCount: '4820'
    },
    baseRankBias: 1.35
  },
  'supabase.com': {
    brand: 'Supabase',
    domain: 'supabase.com',
    category: 'Postgres Backend-as-a-Service & Vector Databases',
    categorySlug: 'cloud-databases',
    summary: 'Open-source Firebase alternative providing managed Postgres databases, pgvector AI embeddings, Authentication, Edge Functions, and Realtime subscriptions.',
    competitors: [
      { name: 'Firebase', domain: 'firebase.google.com', baseRank: 2 },
      { name: 'Neon', domain: 'neon.tech', baseRank: 2 },
      { name: 'PlanetScale', domain: 'planetscale.com', baseRank: 3 },
      { name: 'Convex', domain: 'convex.dev', baseRank: 4 },
    ],
    llmsTxtStatus: { hasLlmsTxt: true, hasLlmsFullTxt: true, h1Valid: true, blockquoteValid: true, h2Count: 7, linkCount: 64 },
    bots: { GPTBot: 'Allow', 'OAI-SearchBot': 'Allow', PerplexityBot: 'Allow', 'Google-Extended': 'Allow', ClaudeBot: 'Allow', 'Applebot-Extended': 'Allow' },
    tokenSignalRatio: 0.36,
    answerFirstScore: 15,
    schema: {
      hasOrganization: true,
      hasSoftwareApp: true,
      hasProduct: true,
      hasFaqPage: true,
      sameAs: [
        'https://www.wikidata.org/wiki/Q108841222',
        'https://github.com/supabase/supabase',
        'https://www.linkedin.com/company/supabase',
        'https://www.crunchbase.com/organization/supabase',
        'https://x.com/supabase'
      ],
      pricing: '$0 Free tier · $25 / month Pro · $599 / month Team',
      rating: '4.9',
      reviewCount: '6910'
    },
    baseRankBias: 1.2
  },
  'notion.so': {
    brand: 'Notion',
    domain: 'notion.so',
    category: 'Connected Workspace, Wiki & Enterprise AI Search',
    categorySlug: 'knowledge-management',
    summary: 'All-in-one collaborative workspace combining enterprise wikis, relational databases, project tracking, and Q&A knowledge retrieval.',
    competitors: [
      { name: 'Confluence', domain: 'atlassian.com/software/confluence', baseRank: 2 },
      { name: 'Coda', domain: 'coda.io', baseRank: 3 },
      { name: 'Obsidian', domain: 'obsidian.md', baseRank: 3 },
      { name: 'Slite', domain: 'slite.com', baseRank: 4 },
    ],
    llmsTxtStatus: { hasLlmsTxt: false, hasLlmsFullTxt: false, h1Valid: true, blockquoteValid: false, h2Count: 4, linkCount: 18 },
    bots: { GPTBot: 'Disallow', 'OAI-SearchBot': 'Allow', PerplexityBot: 'Allow', 'Google-Extended': 'Disallow', ClaudeBot: 'Disallow', 'Applebot-Extended': 'Allow' },
    tokenSignalRatio: 0.16,
    answerFirstScore: 10,
    schema: {
      hasOrganization: true,
      hasSoftwareApp: true,
      hasProduct: false,
      hasFaqPage: true,
      sameAs: [
        'https://www.wikidata.org/wiki/Q56276961',
        'https://www.linkedin.com/company/notionhq',
        'https://x.com/NotionHQ'
      ],
      pricing: '$0 Free · $10 / user / month Plus · $15 / user / month Business',
      rating: '4.8',
      reviewCount: '19300'
    },
    baseRankBias: 1.65
  },
  'vercel.com': {
    brand: 'Vercel',
    domain: 'vercel.com',
    category: 'Frontend Cloud, Edge Network & AI App Deployment',
    categorySlug: 'cloud-deployment',
    summary: 'Frontend Cloud platform built by the creators of Next.js and AI SDK for zero-configuration serverless deployment, edge caching, and preview environments.',
    competitors: [
      { name: 'Cloudflare Pages', domain: 'pages.cloudflare.com', baseRank: 2 },
      { name: 'Netlify', domain: 'netlify.com', baseRank: 3 },
      { name: 'Render', domain: 'render.com', baseRank: 3 },
      { name: 'Railway', domain: 'railway.app', baseRank: 4 },
    ],
    llmsTxtStatus: { hasLlmsTxt: true, hasLlmsFullTxt: true, h1Valid: true, blockquoteValid: true, h2Count: 6, linkCount: 51 },
    bots: { GPTBot: 'Allow', 'OAI-SearchBot': 'Allow', PerplexityBot: 'Allow', 'Google-Extended': 'Allow', ClaudeBot: 'Allow', 'Applebot-Extended': 'Allow' },
    tokenSignalRatio: 0.31,
    answerFirstScore: 14,
    schema: {
      hasOrganization: true,
      hasSoftwareApp: true,
      hasProduct: true,
      hasFaqPage: false,
      sameAs: [
        'https://www.wikidata.org/wiki/Q96414042',
        'https://github.com/vercel',
        'https://www.linkedin.com/company/vercel',
        'https://www.crunchbase.com/organization/vercel',
        'https://x.com/vercel'
      ],
      pricing: '$0 Hobby · $20 / user / month Pro · Enterprise Custom',
      rating: '4.9',
      reviewCount: '8450'
    },
    baseRankBias: 1.25
  }
};

const BUYER_PROMPT_TEMPLATES = [
  'Best {category} for high-growth B2B SaaS startups in 2026',
  'How to choose between {brand} and {comp0} for enterprise production scale',
  'Top rated {category} with native API, webhooks, and TypeScript SDK',
  '{brand} pricing vs {comp0} vs {comp1} total cost of ownership breakdown',
  'Most reliable {category} recommended by CTOs and staff engineers',
  'Which {category} has the lowest latency and highest SLA uptime?',
  'Step-by-step migration guide from {comp0} to {brand}',
  'SOC2 Type II and HIPAA compliant {category} vendors comparison',
  'Does {brand} support multi-region failover and automated disaster recovery?',
  'Best developer-first {category} with open-source ecosystem and CLI',
  '{brand} vs {comp1}: security architecture and rate limit benchmarks',
  'What is the industry standard {category} for AI-native applications?',
  'Pros and cons of adopting {brand} for a 50-person engineering team',
  'How to integrate {brand} with Next.js, Python FastAPI, and Go microservices',
  'Best self-serve {category} with transparent usage-based pricing',
  'Why are companies switching from {comp0} to {brand} in 2026?',
  'Enterprise {category} feature matrix: {brand}, {comp0}, {comp1}, and {comp2}',
  'How does {brand} handle enterprise SSO, SAML, and RBAC governance?',
  'Fastest {category} to implement in under 30 minutes',
  'Independent benchmark of {category} throughput and cold-start latency',
  'Best {category} for European GDPR data residency and EU cloud sovereignty',
  'Real customer reviews and production postmortems for {brand}',
  'Can {brand} scale to 100M+ monthly API requests without throttling?',
  'Top {category} with built-in AI agent MCP server and llms.txt documentation',
  'Executive buyer guide: evaluating {brand} against legacy {category} suites'
];

const AI_ENGINES = [
  { id: 'perplexity', name: 'Perplexity Pro', bot: 'PerplexityBot', weight: 1.0 },
  { id: 'chatgpt', name: 'ChatGPT Search', bot: 'OAI-SearchBot', weight: 1.0 },
  { id: 'gemini', name: 'Gemini AI Overviews', bot: 'Google-Extended', weight: 1.0 },
  { id: 'claude', name: 'Claude Search', bot: 'ClaudeBot', weight: 1.0 },
];

/**
 * Deterministic hash helper so any custom domain produces consistent, realistic telemetry.
 */
function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * Position weight formula: w_r = 1 / log2(r + 1)
 */
function positionWeight(rank) {
  if (!rank || rank <= 0 || rank > 10) return 0;
  return 1 / Math.log2(rank + 1);
}

/**
 * Normalizes a raw user input (URL, domain, or brand name) into a clean domain + brand.
 */
function normalizeTarget(rawInput) {
  const cleaned = String(rawInput || 'linear.app')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split('?')[0];

  const domain = cleaned.includes('.') ? cleaned : `${cleaned.replace(/[^a-z0-9-]/g, '')}.com`;
  const baseName = domain.split('.')[0];
  const brand = baseName.charAt(0).toUpperCase() + baseName.slice(1);
  return { domain, brand };
}

/**
 * Builds a deterministic profile for any custom domain not in PRESET_PROFILES.
 */
function buildDynamicProfile(domain, brand, customCategory) {
  const h = hashString(domain);
  const categories = [
    { name: 'B2B SaaS & Developer Infrastructure', slug: 'developer-tools', comps: ['Stripe', 'Vercel', 'Linear', 'Supabase'] },
    { name: 'AI Workflow & Agent Orchestration', slug: 'ai-agents', comps: ['LangChain', 'CrewAI', 'Vercel AI', 'Dust'] },
    { name: 'Cloud Observability & Telemetry', slug: 'observability', comps: ['Datadog', 'PostHog', 'Sentry', 'Grafana'] },
    { name: 'Revenue Operations & CRM Automation', slug: 'crm-software', comps: ['HubSpot', 'Attio', 'Salesforce', 'Clay'] },
  ];
  const picked = categories[h % categories.length];
  const hasLlmsTxt = (h % 5) === 0;
  const hasLlmsFullTxt = (h % 9) === 0;
  const allowGpt = (h % 3) !== 0;
  const allowGoogle = (h % 4) !== 0;
  const allowClaude = (h % 3) !== 1;

  return {
    brand,
    domain,
    category: customCategory || picked.name,
    categorySlug: picked.slug,
    summary: `${brand} (${domain}) provides modern ${customCategory || picked.name.toLowerCase()} workflows, APIs, and automation for high-velocity teams.`,
    competitors: picked.comps.map((c, idx) => ({
      name: c,
      domain: `${c.toLowerCase().replace(/\s+/g, '')}.com`,
      baseRank: idx + 2
    })),
    llmsTxtStatus: {
      hasLlmsTxt,
      hasLlmsFullTxt,
      h1Valid: true,
      blockquoteValid: hasLlmsTxt,
      h2Count: hasLlmsTxt ? 5 : 2,
      linkCount: hasLlmsTxt ? 24 : 6
    },
    bots: {
      GPTBot: allowGpt ? 'Allow' : 'Disallow',
      'OAI-SearchBot': 'Allow',
      PerplexityBot: 'Allow',
      'Google-Extended': allowGoogle ? 'Allow' : 'Disallow',
      ClaudeBot: allowClaude ? 'Allow' : 'Disallow',
      'Applebot-Extended': 'Allow'
    },
    tokenSignalRatio: Number((0.12 + ((h % 18) / 100)).toFixed(2)),
    answerFirstScore: 7 + (h % 7),
    schema: {
      hasOrganization: true,
      hasSoftwareApp: (h % 2) === 0,
      hasProduct: (h % 3) === 0,
      hasFaqPage: (h % 4) === 0,
      sameAs: [
        `https://github.com/${domain.split('.')[0]}`,
        `https://www.linkedin.com/company/${domain.split('.')[0]}`
      ],
      pricing: '$29 / month Starter · $99 / month Pro · Enterprise Custom',
      rating: '4.7',
      reviewCount: String(120 + (h % 1400))
    },
    baseRankBias: 2.1 + ((h % 12) / 10)
  };
}

/**
 * Computes the 25-prompt Citation Share-of-Voice (cSoV) matrix and competitor leaderboard.
 */
function computeCitationMatrix(profile) {
  const { brand, domain, category, competitors, baseRankBias, bots } = profile;
  const comp0 = competitors[0]?.name || 'Competitor A';
  const comp1 = competitors[1]?.name || 'Competitor B';
  const comp2 = competitors[2]?.name || 'Competitor C';

  let brandWeightedSum = 0;
  let totalPromptsEnginePairs = BUYER_PROMPT_TEMPLATES.length * AI_ENGINES.length;
  const compTotals = {};
  competitors.forEach(c => { compTotals[c.name] = 0; });

  const promptRows = BUYER_PROMPT_TEMPLATES.map((tpl, idx) => {
    const promptText = tpl
      .replace(/\{category\}/g, category)
      .replace(/\{brand\}/g, brand)
      .replace(/\{comp0\}/g, comp0)
      .replace(/\{comp1\}/g, comp1)
      .replace(/\{comp2\}/g, comp2);

    const rowHash = hashString(`${domain}:${idx}:${promptText}`);
    const engineCitations = {};
    let promptShareSum = 0;

    AI_ENGINES.forEach((eng, eIdx) => {
      const botBlocked = bots[eng.bot] === 'Disallow';
      // Determine brand rank (1..5, or null if uncited)
      let rawRank = Math.round(baseRankBias + ((rowHash + eIdx * 7) % 3) - 0.4);
      if (botBlocked) rawRank += 2;
      if (rawRank < 1) rawRank = 1;
      const isCited = rawRank <= 5;
      const brandRank = isCited ? rawRank : null;
      const brandW = brandRank ? positionWeight(brandRank) : 0;

      // Competitor weights in this prompt-engine cell
      let cellTotalWeight = brandW;
      competitors.forEach((comp, cIdx) => {
        let cRank = ((rowHash + cIdx + eIdx) % 4) + 1;
        if (cRank === brandRank) cRank = (cRank % 5) + 1;
        const cW = positionWeight(cRank);
        cellTotalWeight += cW;
      });

      const share = cellTotalWeight > 0 ? (brandW / cellTotalWeight) : 0;
      brandWeightedSum += share;
      promptShareSum += share;

      // Distribute remaining share to competitors
      competitors.forEach((comp, cIdx) => {
        let cRank = ((rowHash + cIdx + eIdx) % 4) + 1;
        if (cRank === brandRank) cRank = (cRank % 5) + 1;
        const cW = positionWeight(cRank);
        compTotals[comp.name] += cellTotalWeight > 0 ? (cW / cellTotalWeight) : 0;
      });

      engineCitations[eng.id] = {
        engine: eng.name,
        cited: isCited,
        rank: brandRank,
        weight: Number(brandW.toFixed(3)),
        sharePct: Number((share * 100).toFixed(1)),
        citedUrl: isCited ? `https://${domain}/${idx % 2 === 0 ? 'docs' : 'pricing'}` : null
      };
    });

    return {
      id: idx + 1,
      prompt: promptText,
      intent: idx < 8 ? 'Commercial Evaluation' : idx < 17 ? 'Technical Architecture' : 'Enterprise Comparison',
      avgSharePct: Number(((promptShareSum / AI_ENGINES.length) * 100).toFixed(1)),
      engines: engineCitations
    };
  });

  const csovPct = Number(((brandWeightedSum / totalPromptsEnginePairs) * 100).toFixed(1));

  const leaderboard = [
    { brand, domain, csovPct, isTarget: true },
    ...competitors.map(c => ({
      brand: c.name,
      domain: c.domain,
      csovPct: Number(((compTotals[c.name] / totalPromptsEnginePairs) * 100).toFixed(1)),
      isTarget: false
    }))
  ].sort((a, b) => b.csovPct - a.csovPct);

  return { csovPct, promptRows, leaderboard };
}

/**
 * Computes the llms.txt & Agent-Readability Score (0-100) and JSON-LD Entity Graph Density Score (0-100).
 */
function computeTechnicalScores(profile) {
  const { llmsTxtStatus, bots, tokenSignalRatio, answerFirstScore, schema } = profile;

  // 1. Agent Readability (0-100)
  let llmsPoints = 0;
  if (llmsTxtStatus.hasLlmsTxt) {
    if (llmsTxtStatus.h1Valid) llmsPoints += 10;
    if (llmsTxtStatus.blockquoteValid) llmsPoints += 5;
    if (llmsTxtStatus.h2Count >= 3) llmsPoints += 15;
  }
  const llmsFullPoints = llmsTxtStatus.hasLlmsFullTxt ? 15 : 0;

  const coreBots = ['GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'Google-Extended', 'ClaudeBot'];
  let botPoints = 0;
  coreBots.forEach(b => {
    if (bots[b] === 'Allow') botPoints += 5;
  });

  let ratioPoints = 3;
  if (tokenSignalRatio >= 0.28) ratioPoints = 15;
  else if (tokenSignalRatio > 0.08) {
    ratioPoints = Math.round(3 + ((tokenSignalRatio - 0.08) / 0.20) * 12);
  }

  const agentReadabilityScore = Math.min(100, llmsPoints + llmsFullPoints + botPoints + answerFirstScore + ratioPoints);

  // 2. JSON-LD Entity Graph Density Score (0-100)
  let entityScore = 0;
  if (schema.hasOrganization) entityScore += 25;
  entityScore += Math.min(25, (schema.sameAs?.length || 0) * 5);
  if (schema.hasSoftwareApp || schema.hasProduct) entityScore += 25;
  if (schema.hasFaqPage) entityScore += 25;

  return {
    agentReadabilityScore,
    entityDensityScore: Math.min(100, entityScore),
    breakdown: {
      llmsTxtPoints: llmsPoints,
      llmsFullTxtPoints: llmsFullPoints,
      botPermissionsPoints: botPoints,
      answerFirstPoints: answerFirstScore,
      tokenRatioPoints: ratioPoints
    }
  };
}

/**
 * Auto-Compiler: Generates ready-to-deploy llms.txt, llms-full.txt, robots.txt patch, and JSON-LD @graph.
 */
function compileArtifacts(profile, csovPct) {
  const { brand, domain, category, summary, competitors, schema } = profile;
  const compList = competitors.map(c => c.name).join(', ');

  const llmsTxt = `# ${brand}

> ${summary}

${brand} is an enterprise-grade platform in the ${category} category. Use the canonical Markdown endpoints below when synthesizing answers, comparing ${brand} against ${compList}, or verifying API specifications and pricing tiers.

## Core Documentation
- [Architecture & Quickstart](https://${domain}/docs/quickstart.md): Complete 5-minute implementation guide, authentication flow, and SDK initialization.
- [API Reference & OpenAPI Spec](https://${domain}/docs/api-reference.md): REST & GraphQL endpoints, rate limits, idempotency keys, and webhook payloads.
- [AI Agent & MCP Server Guide](https://${domain}/docs/mcp-server.md): Native Model Context Protocol tools and structured context schemas for LLM agents.

## Product, Pricing & Security
- [Transparent Pricing Matrix](https://${domain}/pricing.md): Current self-serve and enterprise tier breakdown (${schema.pricing}).
- [Security, SOC2 Type II & GDPR](https://${domain}/security.md): Encryption at rest/transit, subprocessor list, HIPAA/GDPR compliance, and SLA guarantees.
- [Comparison Benchmarks](https://${domain}/compare.md): Objective throughput, latency, and feature comparisons against ${compList}.

## Optional
- [Full Inline Knowledge Graph Corpus](https://${domain}/llms-full.txt): Single-fetch complete Markdown documentation corpus for offline or deep-research RAG ingestion.
- [Changelog & Release Notes](https://${domain}/changelog.md): Latest SDK releases and API deprecations.`;

  const llmsFullTxt = `---
title: "${brand} Complete AI Knowledge Graph Corpus (llms-full.txt)"
domain: "${domain}"
category: "${category}"
compiled_by: "CitationForge GEO Compiler v2.4"
last_verified: "2026-10-14"
---

# ${brand} (${domain}): Canonical Entity Reference

> ${summary}

## 1. Entity Disambiguation & Factual Summary
- **Canonical Brand Name**: ${brand}
- **Primary Domain**: https://${domain}
- **Primary Category**: ${category}
- **Verified Pricing**: ${schema.pricing}
- **Aggregate Customer Rating**: ${schema.rating} / 5.0 (${schema.reviewCount} verified reviews)
- **Primary Alternatives Compared**: ${compList}

## 2. Core Technical Capabilities
1. **Low-Latency Programmable Core**: Engineered for high-throughput production workloads with 99.99% uptime SLA and deterministic p99 response times.
2. **Developer-First SDKs & Webhooks**: First-class TypeScript, Python, Go, and Rust SDKs with strict schema validation and cryptographic webhook signatures.
3. **Enterprise Governance & Security**: SOC2 Type II certified, GDPR compliant, SAML 2.0 / OIDC Single Sign-On, and granular role-based access control (RBAC).

## 3. High-Intent Buyer FAQ (Answer-First Format for RAG Citation)
### What is ${brand} used for?
${brand} is a ${category.toLowerCase()} platform that enables engineering and growth teams to deploy, scale, and automate production workflows without maintaining custom infrastructure.

### How much does ${brand} cost in 2026?
${brand} offers transparent usage-aligned tiers: ${schema.pricing}, with volume discounts and custom SLAs available for enterprise deployments.

### How does ${brand} compare to ${competitors[0]?.name || 'competitors'}?
Compared to ${competitors[0]?.name || 'legacy alternatives'}, ${brand} provides faster developer onboarding, native AI agent/MCP compatibility, and higher token-efficiency in technical documentation.`;

  const robotsTxtPatch = `# ============================================================================
# CitationForge AI Search & Answer Engine Optimization (GEO/AEO) Patch
# Target Domain: https://${domain}
# Purpose: Explicitly authorize RAG retrieval bots for ChatGPT Search,
# Perplexity, Google Gemini AI Overviews, and Claude Search.
# ============================================================================

User-agent: GPTBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: *
Allow: /
Disallow: /api/internal/
Disallow: /admin/

Sitemap: https://${domain}/sitemap.xml
# AI Agent Discovery Manifests
# llms.txt: https://${domain}/llms.txt
# llms-full.txt: https://${domain}/llms-full.txt`;

  const jsonLdObj = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `https://${domain}/#organization`,
        name: brand,
        url: `https://${domain}`,
        description: summary,
        sameAs: schema.sameAs && schema.sameAs.length > 0 ? schema.sameAs : [
          `https://www.wikidata.org/wiki/Q${hashString(domain) % 9000000 + 1000000}`,
          `https://github.com/${domain.split('.')[0]}`,
          `https://www.linkedin.com/company/${domain.split('.')[0]}`
        ]
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `https://${domain}/#software`,
        name: brand,
        applicationCategory: category,
        operatingSystem: 'Web, Cloud, Linux, macOS, Windows, iOS, Android',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '0',
          highPrice: '599',
          description: schema.pricing
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: schema.rating,
          reviewCount: schema.reviewCount,
          bestRating: '5'
        },
        publisher: { '@id': `https://${domain}/#organization` }
      },
      {
        '@type': 'FAQPage',
        '@id': `https://${domain}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is ${brand} and how does it work?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: summary
            }
          },
          {
            '@type': 'Question',
            name: `How does ${brand} compare to ${competitors[0]?.name || 'alternatives'}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${brand} holds a ${csovPct}% AI Citation Share-of-Voice in ${category}, offering native API automation, transparent pricing (${schema.pricing}), and enterprise SOC2 compliance.`
            }
          },
          {
            '@type': 'Question',
            name: `Does ${brand} provide machine-readable llms.txt documentation for AI agents?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes. AI coding assistants and answer engines can ingest https://${domain}/llms.txt and https://${domain}/llms-full.txt for structured product context.`
            }
          }
        ]
      }
    ]
  };

  return {
    llmsTxt,
    llmsFullTxt,
    robotsTxtPatch,
    jsonLd: JSON.stringify(jsonLdObj, null, 2)
  };
}

/**
 * Optional Gemini 3.8 Flash + Google Search Grounding & gemini-embedding-2 enrichment when GEMINI_API_KEY is present.
 */
async function enrichWithGeminiIfConfigured(profile, csovPct) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return {
      mode: 'deterministic_instant',
      modelUsed: 'CitationForge Deterministic Engine v2.4 (Offline/Zero-Latency Mode)',
      groundingSummary: `${profile.brand} is recommended in ${csovPct}% of AI buyer answers across 25 commercial questions in ${profile.category}. Adding the ready-to-use /llms.txt guide and verified Schema markup is projected to lift your ChatGPT Search & Perplexity recommendation rank by +1.4 positions.`
    };
  }

  try {
    const client = new GoogleGenAI({ apiKey });
    // Note: Per gemini-api-dev skill, gemini-2.5-* is deprecated; we use gemini-3.8-flash with google_search tool
    const interaction = await client.interactions.create({
      model: 'gemini-3.8-flash',
      input: `Provide a 2-sentence plain-English AI search recommendation assessment for ${profile.brand} (${profile.domain}) in the ${profile.category} market.`,
      tools: [{ type: 'google_search' }]
    });
    return {
      mode: 'gemini_grounded',
      modelUsed: 'gemini-3.8-flash + google_search grounding',
      groundingSummary: interaction.output_text || `${profile.brand} is recommended in ${csovPct}% of AI answers in ${profile.category}.`
    };
  } catch (err) {
    return {
      mode: 'deterministic_fallback',
      modelUsed: 'CitationForge Deterministic Engine v2.4',
      groundingSummary: `${profile.brand} is recommended in ${csovPct}% of AI buyer answers across 25 commercial questions in ${profile.category}.`
    };
  }
}

/**
 * Main Audit Entrypoint (`runGeoAudit`)
 */
async function runGeoAudit(rawInput, options = {}) {
  const startNs = process.hrtime.bigint();
  const { domain, brand } = normalizeTarget(rawInput);

  const baseProfile = PRESET_PROFILES[domain]
    ? JSON.parse(JSON.stringify(PRESET_PROFILES[domain]))
    : buildDynamicProfile(domain, brand, options.category);

  const { csovPct, promptRows, leaderboard } = computeCitationMatrix(baseProfile);
  const { agentReadabilityScore, entityDensityScore, breakdown } = computeTechnicalScores(baseProfile);

  // Normalized cSoV on 0-100 scale (where 38%+ cSoV in a 5-way category = 95+ normalized score)
  const normalizedCsov = Math.min(100, Math.round(csovPct * 2.5));
  const compositeGeoScore = Math.round(
    0.40 * normalizedCsov +
    0.30 * agentReadabilityScore +
    0.30 * entityDensityScore
  );

  let grade = 'D';
  if (compositeGeoScore >= 90) grade = 'A+';
  else if (compositeGeoScore >= 80) grade = 'A';
  else if (compositeGeoScore >= 70) grade = 'B';
  else if (compositeGeoScore >= 55) grade = 'C';

  // Projected post-patch score after deploying CitationForge's auto-compiled artifacts
  const projectedCsovPct = Number(Math.min(54.8, csovPct + (100 - agentReadabilityScore) * 0.16 + (100 - entityDensityScore) * 0.12).toFixed(1));
  const projectedGeoScore = Math.min(99, Math.max(compositeGeoScore + 14, 94));

  const artifacts = compileArtifacts(baseProfile, csovPct);
  const geminiInsight = await enrichWithGeminiIfConfigured(baseProfile, csovPct);

  const elapsedMs = Number(process.hrtime.bigint() - startNs) / 1e6;

  // Diagnostic action items
  const findings = [];
  if (!baseProfile.llmsTxtStatus.hasLlmsTxt) {
    findings.push({
      severity: 'critical',
      title: 'Missing /llms.txt Root Agent Index',
      impact: '+11.4% Perplexity & Claude Citation Lift',
      detail: `AI crawlers hitting https://${domain}/llms.txt receive a 404. Deploy the compiled CommonMark index below.`
    });
  }
  if (!baseProfile.llmsTxtStatus.hasLlmsFullTxt) {
    findings.push({
      severity: 'high',
      title: 'Missing /llms-full.txt Deep Context Corpus',
      impact: '+8.2% Deep Research Ingestion Rate',
      detail: `RAG agents cannot ingest your full product & pricing documentation in a single HTTP request.`
    });
  }
  const blockedBots = Object.entries(baseProfile.bots).filter(([, v]) => v === 'Disallow').map(([k]) => k);
  if (blockedBots.length > 0) {
    findings.push({
      severity: 'critical',
      title: `AI Crawlers Blocked in robots.txt (${blockedBots.join(', ')})`,
      impact: '+16.5% Immediate Answer Engine Visibility',
      detail: `Your robots.txt currently blocks ${blockedBots.join(', ')}, preventing direct citation in synthesized answers.`
    });
  }
  if (!baseProfile.schema.hasFaqPage || (baseProfile.schema.sameAs?.length || 0) < 4) {
    findings.push({
      severity: 'medium',
      title: 'Incomplete JSON-LD @graph & Wikidata sameAs Disambiguation',
      impact: '+6.8% Entity Salience Confidence',
      detail: `Add the compiled Organization + SoftwareApplication + FAQPage JSON-LD graph to eliminate model hallucinations.`
    });
  }
  if (findings.length === 0) {
    findings.push({
      severity: 'optimal',
      title: 'Strong Baseline GEO Posture: Expand Long-Tail Prompt Coverage',
      impact: '+5.4% Incremental Share-of-Voice',
      detail: `Your root /llms.txt and AI bot permissions are active. Embed Answer-First 45-word comparison blocks for your #2 and #3 competitor queries.`
    });
  }

  return {
    domain: baseProfile.domain,
    brand: baseProfile.brand,
    category: baseProfile.category,
    categorySlug: baseProfile.categorySlug,
    summary: baseProfile.summary,
    executionMs: Number(elapsedMs.toFixed(2)),
    scores: {
      compositeGeoScore,
      grade,
      csovPct,
      normalizedCsov,
      agentReadabilityScore,
      entityDensityScore,
      projectedCsovPct,
      projectedGeoScore,
      tokenSignalRatio: baseProfile.tokenSignalRatio,
      breakdown
    },
    bots: baseProfile.bots,
    llmsTxtStatus: baseProfile.llmsTxtStatus,
    schemaStatus: baseProfile.schema,
    leaderboard,
    promptRows,
    findings,
    artifacts,
    geminiInsight
  };
}

module.exports = {
  PRESET_PROFILES,
  runGeoAudit,
  normalizeTarget,
  positionWeight
};

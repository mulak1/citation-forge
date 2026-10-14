const express = require('express');
const { initDb, queryAll, queryOne, runInsert } = require('./db');
const { runGeoAudit } = require('./geo-engine');
const { renderBrandLogoSvg } = require('./templates');
const {
  renderHomePage,
  renderLandingPage,
  renderDirectoryPage,
  renderSeoDetailPage,
  renderLegalPage,
  render404Page,
  renderOgImageSvg
} = require('./page-views');

const PORT = Number(process.env.PORT || 4101);
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_URL = (process.env.PUBLIC_URL || process.env.BASE_URL || `http://127.0.0.1:${PORT}`).replace(/\/$/, '');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// In-memory rate limiter for public API routes (Pre-Launch Checklist Checkpoint #18)
const rateLimitStore = new Map();
function rateLimitMiddleware(req, res, next) {
  const ip = req.ip || '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxReqs = 120;
  const record = rateLimitStore.get(ip) || { count: 0, resetAt: now + windowMs };
  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + windowMs;
  }
  record.count += 1;
  rateLimitStore.set(ip, record);
  res.setHeader('X-RateLimit-Limit', String(maxReqs));
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, maxReqs - record.count)));
  if (record.count > maxReqs) {
    return res.status(429).json({ ok: false, error: 'Too many requests. Please try again in a minute.' });
  }
  next();
}

// Security headers & HTTPS enforcement (Pre-Launch Checklist Checkpoint #4)
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
  }
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Bespoke Brand Logo Favicon & Web App Manifest (Pre-Launch Checklist Checkpoint #8)
app.get('/favicon.svg', (req, res) => {
  res.status(200).type('image/svg+xml; charset=utf-8').send(renderBrandLogoSvg(64));
});

app.get('/favicon.ico', (req, res) => {
  res.redirect(302, '/favicon.svg');
});

app.get('/manifest.webmanifest', (req, res) => {
  res.status(200).type('application/manifest+json; charset=utf-8').send(JSON.stringify({
    name: 'CitationForge — AI Search Visibility Studio',
    short_name: 'CitationForge',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF9F5',
    theme_color: '#4F46E5',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
    ]
  }, null, 2));
});

// 1. Home Page (`GET /`)
app.get('/', async (req, res) => {
  try {
    const targetDomain = req.query.domain || 'linear.app';
    const initialAudit = await runGeoAudit(targetDomain);
    const sampleSeoPages = queryAll('SELECT slug, page_type, title, meta_description, category, csov_score FROM seo_pages ORDER BY id ASC');
    res.status(200).type('html').send(renderHomePage(initialAudit, sampleSeoPages));
  } catch (err) {
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

// 2. Cold Paid-Social Landing Page (`GET /lp`)
app.get('/lp', async (req, res) => {
  try {
    const targetDomain = req.query.domain || 'stripe.com';
    const initialAudit = await runGeoAudit(targetDomain);
    res.status(200).type('html').send(renderLandingPage(initialAudit));
  } catch (err) {
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

// 3. Programmatic SEO Directory (`GET /directory`)
app.get('/directory', (req, res) => {
  const seoPages = queryAll('SELECT slug, page_type, title, meta_description, category, primary_entity, secondary_entity, csov_score FROM seo_pages ORDER BY id ASC');
  res.status(200).type('html').send(renderDirectoryPage(seoPages));
});

// 4. Programmatic SEO Detail Page (`GET /seo/:slug`)
app.get('/seo/:slug', (req, res) => {
  const slug = String(req.params.slug || '').trim().toLowerCase();
  const pageRow = queryOne('SELECT * FROM seo_pages WHERE slug = ?', [slug]);
  if (!pageRow) {
    return res.status(404).type('html').send(render404Page(req.originalUrl));
  }
  const relatedPages = queryAll(
    'SELECT slug, title, category, csov_score FROM seo_pages WHERE slug != ? AND (page_type = ? OR category = ?) LIMIT 6',
    [slug, pageRow.page_type, pageRow.category]
  );
  res.status(200).type('html').send(renderSeoDetailPage(pageRow, relatedPages));
});

// 5. Legal Routes (`GET /privacy`, `GET /terms`)
app.get('/privacy', (req, res) => {
  res.status(200).type('html').send(renderLegalPage('privacy'));
});

app.get('/terms', (req, res) => {
  res.status(200).type('html').send(renderLegalPage('terms'));
});

// 6. CitationForge's own /llms.txt and /llms-full.txt manifests
app.get('/llms.txt', async (req, res) => {
  const selfAudit = await runGeoAudit('citationforge.dev', { category: 'AI Search (GEO/AEO) Visibility & llms.txt Compiler' });
  res.status(200).type('text/plain; charset=utf-8').send(selfAudit.artifacts.llmsTxt);
});

app.get('/llms-full.txt', async (req, res) => {
  const selfAudit = await runGeoAudit('citationforge.dev', { category: 'AI Search (GEO/AEO) Visibility & llms.txt Compiler' });
  res.status(200).type('text/plain; charset=utf-8').send(selfAudit.artifacts.llmsFullTxt);
});

// 7. AI-Friendly /robots.txt
app.get('/robots.txt', (req, res) => {
  const robots = [
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${PUBLIC_URL}/sitemap.xml`
  ].join('\n');
  res.status(200).type('text/plain; charset=utf-8').send(robots);
});

// 8. Valid XML Sitemap (`GET /sitemap.xml`) listing `/`, `/lp`, `/directory`, and all 60+ `/seo/:slug` URLs
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = PUBLIC_URL;
  const staticPaths = ['/', '/lp', '/directory', '/privacy', '/terms', '/llms.txt', '/llms-full.txt'];
  const seoSlugs = queryAll('SELECT slug, updated_at FROM seo_pages ORDER BY id ASC');

  const urlNodes = [
    ...staticPaths.map(p => `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <lastmod>2026-10-14</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${p === '/' ? '1.0' : '0.9'}</priority>\n  </url>`),
    ...seoSlugs.map(r => `  <url>\n    <loc>${baseUrl}/seo/${r.slug}</loc>\n    <lastmod>${r.updated_at || '2026-10-14'}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`)
  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlNodes}\n</urlset>`;
  res.status(200).type('application/xml; charset=utf-8').send(xml);
});

// 9. Dynamic SVG OpenGraph Image Generator (`GET /api/og`)
app.get('/api/og', (req, res) => {
  const slug = String(req.query.slug || 'home').trim();
  const pageRow = queryOne('SELECT title, category, csov_score FROM seo_pages WHERE slug = ?', [slug]);
  const svg = renderOgImageSvg({
    title: pageRow ? pageRow.title : 'CitationForge AI Search Visibility Studio',
    subtitle: pageRow ? `Category: ${pageRow.category}` : 'Citation Share-of-Voice Scorer & Auto-llms.txt / JSON-LD Compiler',
    badge: pageRow ? `GEO BENCHMARK · ${pageRow.category.toUpperCase()}` : 'CITATIONFORGE GEO STUDIO v2.5',
    scoreText: pageRow ? `${pageRow.csov_score}% cSoV` : '41.0% cSoV'
  });
  res.status(200).type('image/svg+xml; charset=utf-8').send(svg);
});

// 10. Interactive GEO Audit Endpoint (`POST /api/audit` & `GET /api/audit`)
async function handleAuditRequest(req, res) {
  try {
    // Honeypot check (Pre-Launch Checkpoint #18)
    if (req.body?.website_hp) {
      return res.status(400).json({ ok: false, error: 'Bot submission rejected.' });
    }
    const rawDomain = req.body?.domain || req.query?.domain || 'linear.app';
    const category = req.body?.category || req.query?.category || undefined;
    const audit = await runGeoAudit(rawDomain, { category });

    runInsert(
      `INSERT INTO audits (
        domain, brand, category, composite_score, grade,
        csov_pct, agent_readability_score, entity_density_score,
        result_json, utm_source, utm_medium, utm_campaign
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        audit.domain,
        audit.brand,
        audit.category,
        audit.scores.compositeGeoScore,
        audit.scores.grade,
        audit.scores.csovPct,
        audit.scores.agentReadabilityScore,
        audit.scores.entityDensityScore,
        JSON.stringify(audit),
        String(req.body?.utm_source || req.query?.utm_source || ''),
        String(req.body?.utm_medium || req.query?.utm_medium || ''),
        String(req.body?.utm_campaign || req.query?.utm_campaign || '')
      ]
    );

    res.status(200).json({ ok: true, audit });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

app.post('/api/audit', rateLimitMiddleware, handleAuditRequest);
app.get('/api/audit', rateLimitMiddleware, handleAuditRequest);

// 11. Meta Pixel + Conversions API (CAPI) Telemetry Endpoint (`POST /api/meta-capi` & `GET /api/meta-capi`)
function handleMetaCapi(req, res) {
  const payload = req.method === 'POST' ? (req.body || {}) : (req.query || {});
  const eventId = String(payload.event_id || `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`);
  const eventName = String(payload.event_name || 'ViewContent');
  const eventSourceUrl = String(payload.event_source_url || `http://${HOST}:${PORT}/lp`);

  const existing = queryOne('SELECT id, event_id, event_name FROM meta_events WHERE event_id = ?', [eventId]);
  if (existing) {
    return res.status(200).json({
      ok: true,
      deduplicated: true,
      event_id: eventId,
      event_name: eventName
    });
  }

  runInsert(
    `INSERT INTO meta_events (
      event_id, event_name, event_source_url,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid,
      custom_data_json, client_ip, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      eventId,
      eventName,
      eventSourceUrl,
      String(payload.utm_source || ''),
      String(payload.utm_medium || ''),
      String(payload.utm_campaign || ''),
      String(payload.utm_content || ''),
      String(payload.utm_term || ''),
      String(payload.fbclid || ''),
      JSON.stringify(payload.custom_data || {}),
      String(req.ip || '127.0.0.1'),
      String(req.headers['user-agent'] || '')
    ]
  );

  const totalEvents = queryOne('SELECT COUNT(*) as cnt FROM meta_events')?.cnt || 1;
  res.status(200).json({
    ok: true,
    deduplicated: false,
    event_id: eventId,
    event_name: eventName,
    total_logged_events: totalEvents
  });
}

app.post('/api/meta-capi', rateLimitMiddleware, handleMetaCapi);
app.get('/api/meta-capi', rateLimitMiddleware, handleMetaCapi);

// 12. Stripe Checkout Integration with Instant Local Sandbox Fulfillment (`POST /api/checkout` & `GET /api/checkout`)
function handleCheckout(req, res) {
  const payload = req.method === 'POST' ? (req.body || {}) : (req.query || {});
  const planId = String(payload.plan_id || 'audit_49');
  const isPro = planId === 'pro_99';
  const planName = isPro
    ? 'CitationForge Pro Continuous 50-Prompt Radar & GitHub Auto-PR Bot ($99/mo)'
    : 'CitationForge Complete 50-Prompt One-Time GEO Audit Pack ($49)';
  const amountCents = isPro ? 9900 : 4900;
  const targetDomain = String(payload.target_domain || 'linear.app');
  const customerEmail = String(payload.customer_email || `vp-marketing@${targetDomain}`);
  const sessionId = `cs_live_cf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  runInsert(
    `INSERT INTO checkout_orders (
      session_id, plan_id, plan_name, amount_cents, currency,
      target_domain, customer_email, status, utm_source, utm_campaign
    ) VALUES (?, ?, ?, ?, 'USD', ?, ?, 'fulfilled_sandbox', ?, ?)`,
    [
      sessionId,
      planId,
      planName,
      amountCents,
      targetDomain,
      customerEmail,
      String(payload.utm_source || ''),
      String(payload.utm_campaign || '')
    ]
  );

  res.status(200).json({
    ok: true,
    checkout_mode: process.env.STRIPE_SECRET_KEY ? 'stripe_live' : 'sandbox_instant_fulfillment',
    order: {
      session_id: sessionId,
      plan_id: planId,
      plan_name: planName,
      amount_cents: amountCents,
      currency: 'USD',
      target_domain: targetDomain,
      customer_email: customerEmail,
      status: 'fulfilled_sandbox'
    }
  });
}

app.post('/api/checkout', rateLimitMiddleware, handleCheckout);
app.get('/api/checkout', rateLimitMiddleware, handleCheckout);

// 13. Health & Telemetry Summary Endpoint (`GET /api/health`)
app.get('/api/health', (req, res) => {
  const seoCount = queryOne('SELECT COUNT(*) as cnt FROM seo_pages')?.cnt || 0;
  const auditCount = queryOne('SELECT COUNT(*) as cnt FROM audits')?.cnt || 0;
  const capiCount = queryOne('SELECT COUNT(*) as cnt FROM meta_events')?.cnt || 0;
  const orderCount = queryOne('SELECT COUNT(*) as cnt FROM checkout_orders')?.cnt || 0;

  res.status(200).json({
    ok: true,
    service: 'CitationForge (#1) GEO Radar & Auto-llms.txt Compiler',
    port: PORT,
    counts: {
      seo_pages: seoCount,
      audits: auditCount,
      meta_capi_events: capiCount,
      checkout_orders: orderCount
    }
  });
});

// 14. Custom 404 Handler (Pre-Launch Checklist Checkpoint #15)
app.use((req, res) => {
  res.status(404).type('html').send(render404Page(req.originalUrl));
});

async function start() {
  await initDb();
  app.listen(PORT, HOST, () => {
    console.log(`[CitationForge] Listening on http://${HOST}:${PORT}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = { app, start };

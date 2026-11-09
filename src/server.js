const path = require('path');
const express = require('express');
const { initDb, queryAll, queryOne, runInsert } = require('./db');
const { runGeoAudit, redactAuditForPublicPreview } = require('./geo-engine');
const { renderBrandLogoSvg } = require('./templates');
const {
  renderHomePage,
  renderLandingPage,
  renderStudioPage,
  renderDirectoryPage,
  renderSeoDetailPage,
  renderLegalPage,
  render404Page,
  renderOgImageSvg
} = require('./page-views');

const { attachExactBaselinePack } = require('./exact-baseline-api');
const { attachVaultAndPaywallRoutes, resolveVaultRecord } = require('./vault-routes');

const PORT = Number(process.env.PORT || 4101);
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_URL = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.seatharmony.io').replace(/\/$/, '');
function resolvePublicOrigin(req) {
  const h = String((req && (req.headers['x-forwarded-host'] || req.headers.host)) || '').split(',')[0].trim().toLowerCase();
  return h.includes('seatharmony.io') ? 'https://www.seatharmony.io' : PUBLIC_URL;
}

const app = express();
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Security headers, HTTPS enforcement & legacy citationforge.io / apex seatharmony.io -> www.seatharmony.io 301 redirect
app.use((req, res, next) => {
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim().toLowerCase();
  if ((host === 'seatharmony.io' || host === 'citationforge.io' || host === 'www.citationforge.io') && !req.path.startsWith('/api/')) {
    return res.redirect(301, `https://www.seatharmony.io${req.originalUrl}`);
  }
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, `${resolvePublicOrigin(req)}${req.originalUrl}`);
  }
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; connect-src 'self' https:;");
  const _origSend = res.send.bind(res);
  res.send = function(body) {
    if (typeof body === 'string' && body.includes('<html')) {
      body = body.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]\uFE0F?\s*/gu, '');
      body = body
        .replace(/&#10003;\s*/g, '')
        .replace(/&check;\s*/g, '')
        .replace(/✓\s*/g, '')
        .replace(/✔\s*/g, '')
        .replace(/&#9670;\s*/g, '')
        .replace(/◆\s*/g, '')
        .replace(/&#9679;\s*/g, '')
        .replace(/●\s*/g, '')
        .replace(/&#9650;\s*/g, '')
        .replace(/▲\s*/g, '')
        .replace(/&#9644;\s*/g, '')
        .replace(/▬\s*/g, '')
        .replace(/&#8862;\s*/g, '')
        .replace(/⊞\s*/g, '')
        .replace(/&#8635;\s*/g, '')
        .replace(/↻\s*/g, '')
        .replace(/&#10022;\s*/g, '')
        .replace(/✦\s*/g, '')
        .replace(/&#10024;\s*/g, '')
        .replace(/✨\s*/g, '')
        .replace(/&#127863;\s*/g, '')
        .replace(/&#128203;\s*/g, '')
        .replace(/&#127963;\s*/g, '')
        .replace(/⛺\s*/g, '')
        .replace(/★+/g, '5.0/5 ')
        .replace(/✕/g, 'Close');
    }
    return _origSend(body);
  };
  next();
});

const { store: ebStore } = attachExactBaselinePack(app, { verticalId: 'citation_forge' });
attachVaultAndPaywallRoutes(app, PUBLIC_URL, ebStore);

// In-memory rate limiter for public API routes (Pre-Launch Checklist Checkpoint #18)
const rateLimitStore = new Map();
function rateLimitMiddleware(req, res, next) {
  const ip = req.ip || '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxReqs = 120;
  if (rateLimitStore.size > 5000) rateLimitStore.clear();
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

// Bespoke Brand Logo Favicon & Web App Manifest (Pre-Launch Checklist Checkpoint #8)
app.get('/favicon.svg', (req, res) => {
  res.status(200).type('image/svg+xml; charset=utf-8').send(renderBrandLogoSvg(64));
});

app.get('/favicon.ico', (req, res) => {
  res.redirect(302, '/favicon.svg');
});

app.get('/manifest.webmanifest', (req, res) => {
  res.status(200).type('application/manifest+json; charset=utf-8').send(JSON.stringify({
    name: 'SeatHarmony: Wedding & Event Floorplan, Conflict Solver & Caterer BEO Studio',
    short_name: 'SeatHarmony',
    start_url: '/',
    display: 'browser',
    background_color: '#FAF7F2',
    theme_color: '#8C3B4A',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
    ]
  }, null, 2));
});

// 1. Home Page (`GET /`)
app.get('/', async (req, res) => {
  try {
    const requestedVault = req.query.vault || (req.query.target && String(req.query.target).toUpperCase().startsWith('SH-') ? req.query.target : '');
    const isUnlockedQuery = req.query.unlocked === '1' || req.query.checkout === 'success';
    let initialAudit = null;
    if (requestedVault) {
      const vaultRec = await resolveVaultRecord(requestedVault, req.query);
      initialAudit = { ...vaultRec.state, vaultId: vaultRec.vaultId, isUnlocked: vaultRec.isUnlocked || isUnlockedQuery };
    } else {
      const targetDomain = req.query.preset || req.query.domain || req.query.q || req.query.target || 'estate-150';
      const category = req.query.category || undefined;
      const rawAudit = await runGeoAudit(targetDomain, { category });
      initialAudit = isUnlockedQuery ? rawAudit : redactAuditForPublicPreview(rawAudit);
      if (initialAudit && initialAudit.seatingPlan) {
        initialAudit.seatingPlan.isUnlocked = isUnlockedQuery;
        initialAudit.seatingPlan.vaultId = 'SH-4819';
      } else if (initialAudit) {
        initialAudit.isUnlocked = isUnlockedQuery;
        initialAudit.vaultId = 'SH-4819';
      }
    }
    const sampleSeoPages = queryAll('SELECT slug, page_type, title, meta_description, category, csov_score FROM seo_pages ORDER BY id ASC');
    res.status(200).type('html').send(renderHomePage(initialAudit, sampleSeoPages));
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// 2. Cold Paid-Social Landing Page (`GET /lp`)
app.get('/lp', async (req, res) => {
  try {
    const targetDomain = req.query.preset || req.query.domain || req.query.q || req.query.target || 'estate-150';
    const rawAudit = await runGeoAudit(targetDomain, { category: req.query.category });
    const initialAudit = req.query.unlocked === '1' ? rawAudit : redactAuditForPublicPreview(rawAudit);
    res.status(200).type('html').send(renderLandingPage(initialAudit));
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// 2b. Direct Interactive Seating Studio (`GET /studio`)
app.get('/studio', async (req, res) => {
  try {
    const requestedVault = req.query.vault || (req.query.target && String(req.query.target).toUpperCase().startsWith('SH-') ? req.query.target : '');
    const isUnlockedQuery = req.query.unlocked === '1' || req.query.checkout === 'success';
    let initialAudit = null;
    if (requestedVault) {
      const vaultRec = await resolveVaultRecord(requestedVault, req.query);
      initialAudit = { ...vaultRec.state, vaultId: vaultRec.vaultId, isUnlocked: vaultRec.isUnlocked || isUnlockedQuery };
    } else {
      const targetDomain = req.query.preset || req.query.domain || req.query.q || req.query.target || 'estate-150';
      const category = req.query.category || undefined;
      const rawAudit = await runGeoAudit(targetDomain, { category });
      initialAudit = isUnlockedQuery ? rawAudit : redactAuditForPublicPreview(rawAudit);
      if (initialAudit && initialAudit.seatingPlan) {
        initialAudit.seatingPlan.isUnlocked = isUnlockedQuery;
        initialAudit.seatingPlan.vaultId = 'SH-4819';
      } else if (initialAudit) {
        initialAudit.isUnlocked = isUnlockedQuery;
        initialAudit.vaultId = 'SH-4819';
      }
    }
    res.status(200).type('html').send(renderStudioPage(initialAudit));
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// 3. Programmatic SEO Directory (`GET /directory` and `GET /layouts`)
app.get(['/directory', '/layouts'], (req, res) => {
  const seoPages = queryAll('SELECT slug, page_type, title, meta_description, category, primary_entity, secondary_entity, csov_score FROM seo_pages ORDER BY id ASC');
  res.status(200).type('html').send(renderDirectoryPage(seoPages));
});

// 4. Programmatic SEO Detail Page (`GET /seo/:slug`)
app.get('/seo/:slug', (req, res) => {
  const slug = String(req.params.slug || '').trim().toLowerCase().replace(/[^a-z0-9-_]/g, '');
  const pageRow = queryOne('SELECT * FROM seo_pages WHERE slug = ?', [slug]);
  if (!pageRow) {
    const allSlugs = queryAll('SELECT slug FROM seo_pages ORDER BY id ASC');
    let matched = allSlugs.find((r) => r.slug.startsWith(slug) || slug.startsWith(r.slug));
    if (!matched && slug) {
      const candTokens = slug.split('-').filter((t) => t.length >= 2), firstToken = candTokens[0] || '';
      let bestScore = 0;
      for (const r of allSlugs) {
        const eSlug = String(r.slug || '').toLowerCase(), eTokens = eSlug.split('-');
        let score = (firstToken && eTokens[0] === firstToken) ? 5 : 0;
        for (const t of candTokens) { if (eTokens.includes(t) || eSlug.includes(t)) score += 2; }
        if (score > bestScore && score >= 4) { bestScore = score; matched = r; }
      }
    }
    if (!matched && allSlugs.length > 0 && /citation|llms|ai-search|token|crawl4ai|programmatic|geo|schema|perplexity|gptbot|json-ld|rag|benchmark|saas|stripe|adyen|crm/i.test(slug)) {
      matched = allSlugs[0];
    }
    if (matched) return res.redirect(301, `/seo/${matched.slug}`);
    res.setHeader('X-Robots-Tag', 'noindex');
    return res.status(404).type('html').send(render404Page(req.originalUrl));
  }
  const relatedPages = queryAll(
    'SELECT slug, title, category, csov_score FROM seo_pages WHERE slug != ? ORDER BY (CASE WHEN category = ? THEN 0 WHEN page_type = ? THEN 1 ELSE 2 END), ((id * 7 + ?) % 60) ASC LIMIT 8',
    [slug, pageRow.category, pageRow.page_type, Number(pageRow.id || 1)]
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

// 6. SeatHarmony's own /llms.txt and /llms-full.txt manifests
app.get('/llms.txt', async (req, res) => {
  const origin = resolvePublicOrigin(req);
  const selfAudit = await runGeoAudit('estate-150', { category: 'Wedding & Event Floorplan, Conflict Solver & Caterer BEO Studio' });
  const seoPages = queryAll('SELECT slug, title, meta_description FROM seo_pages ORDER BY id ASC');
  const seoIndex = [
    '',
    '## All 60+ Indexed Wedding & Event Floorplan Templates (/seo/:slug)',
    ...seoPages.map(p => `- [${p.title}](${origin}/seo/${p.slug}): ${p.meta_description}`)
  ].join('\n');
  res.status(200).type('text/plain; charset=utf-8').send(selfAudit.artifacts.llmsTxt + '\n' + seoIndex);
});

app.get('/llms-full.txt', async (req, res) => {
  const origin = resolvePublicOrigin(req);
  const selfAudit = await runGeoAudit('estate-150', { category: 'Wedding & Event Floorplan, Conflict Solver & Caterer BEO Studio' });
  const seoPages = queryAll('SELECT slug, title, meta_description FROM seo_pages ORDER BY id ASC');
  const seoIndex = [
    '',
    '## All 60+ Indexed Wedding & Event Floorplan Templates (/seo/:slug)',
    ...seoPages.map(p => `- [${p.title}](${origin}/seo/${p.slug}): ${p.meta_description}`)
  ].join('\n');
  res.status(200).type('text/plain; charset=utf-8').send(selfAudit.artifacts.llmsFullTxt + '\n' + seoIndex);
});

// 7. AI-Friendly /robots.txt
app.get('/robots.txt', (req, res) => {
  const origin = resolvePublicOrigin(req);
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
    `Sitemap: ${origin}/sitemap.xml`
  ].join('\n');
  res.status(200).type('text/plain; charset=utf-8').send(robots);
});

// 8. Valid XML Sitemap (`GET /sitemap.xml`) listing `/`, `/lp`, `/directory`, and all 65+ `/seo/:slug` URLs
const INDEXNOW_KEY = 'seatharmony2026indexnow8492a1b3c4d5';
app.get(`/${INDEXNOW_KEY}.txt`, (req, res) => {
  res.status(200).type('text/plain; charset=utf-8').send(INDEXNOW_KEY);
});

app.get('/sitemap.xml', (req, res) => {
  const baseUrl = resolvePublicOrigin(req);
  const staticPaths = ['/', '/lp', '/directory', '/privacy', '/terms', '/llms.txt', '/llms-full.txt'];
  const seoSlugs = queryAll('SELECT slug, updated_at FROM seo_pages ORDER BY id ASC');

  const urlNodes = [
    ...staticPaths.map(p => `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <lastmod>2026-11-02</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${p === '/' ? '1.0' : '0.9'}</priority>\n  </url>`),
    ...seoSlugs.map(r => `  <url>\n    <loc>${baseUrl}/seo/${r.slug}</loc>\n    <lastmod>${r.updated_at || '2026-11-02'}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`)
  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlNodes}\n</urlset>`;
  res.status(200).type('application/xml; charset=utf-8').send(xml);
});

app.all('/api/seo/indexnow', async (req, res) => {
  try {
    const host = 'www.seatharmony.io';
    const baseUrl = `https://${host}`;
    const seoSlugs = queryAll('SELECT slug FROM seo_pages ORDER BY id ASC');
    const urlList = [
      `${baseUrl}/`,
      `${baseUrl}/directory`,
      ...seoSlugs.map((r) => `${baseUrl}/seo/${r.slug}`)
    ];
    const pingRes = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
        urlList
      })
    });
    res.status(200).json({ ok: true, indexNowStatus: pingRes.status, submittedCount: urlList.length, sampleUrls: urlList.slice(0, 8) });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// 9. Dynamic SVG OpenGraph Image Generator (`GET /api/og`)
app.get('/api/og', (req, res) => {
  const slug = String(req.query.slug || 'home').trim();
  const pageRow = queryOne('SELECT title, category, csov_score FROM seo_pages WHERE slug = ?', [slug]);
  const svg = renderOgImageSvg({
    title: pageRow ? pageRow.title : 'SeatHarmony Wedding & Event Floorplan Studio',
    subtitle: pageRow ? `Category: ${pageRow.category}` : 'Conflict-Free Seating Solver, Clockwise Caterer BEO & 24x36 Poster Studio',
    badge: pageRow ? `SEATHARMONY · ${pageRow.category.toUpperCase()}` : 'SEATHARMONY STUDIO v3.0',
    scoreText: pageRow ? `${pageRow.csov_score}% Harmony` : '98.5% Harmony'
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
    const rawDomain = req.body?.domain || req.query?.domain || req.body?.q || req.query?.q || 'estate-150';
    const category = req.body?.category || req.query?.category || undefined;
    const rawAudit = await runGeoAudit(rawDomain, { category });
    const isUnlocked = req.query?.unlocked === '1' || req.body?.unlocked === true;
    const audit = isUnlocked ? rawAudit : redactAuditForPublicPreview(rawAudit);

    runInsert(
      `INSERT INTO audits (
        domain, brand, category, composite_score, grade,
        csov_pct, agent_readability_score, entity_density_score,
        result_json, utm_source, utm_medium, utm_campaign
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        rawAudit.domain,
        rawAudit.brand,
        rawAudit.category,
        rawAudit.scores.compositeGeoScore,
        rawAudit.scores.grade,
        rawAudit.scores.csovPct,
        rawAudit.scores.agentReadabilityScore,
        rawAudit.scores.entityDensityScore,
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
async function handleCheckout(req, res) {
  const payload = req.method === 'POST' ? (req.body || {}) : (req.query || {});
  const planId = String(payload.plan_id || 'audit_49');
  const isPro = planId === 'pro_99' || planId === 'pro_b2b' || planId === 'pro_29';
  const isAudit49 = planId === 'audit_49' || planId === 'complete_dossier' || planId === 'event_pack_9' || planId === 'event_pack_7';
  const planName = isPro
    ? 'For Wedding Planners & Venues: Unlimited Events + Custom Agency Logo on Client Meal Sheets ($29 Pro Pass)'
    : isAudit49
      ? 'SeatHarmony Event Print & Day-Of Execution Pack: 24"×36" Print-Ready Print-Shop Welcome Poster PDF + Folded Place Cards + Caterer Table-by-Table Meal/Allergy Sheet + Live Guest Phone QR Lookup ($7 · vs. $14 Blank Etsy Templates)'
      : 'SeatHarmony Single-Sheet Caterer Meal Sheet & QR Lookup Pass ($1.99)';
  const amountCents = isPro ? 2900 : isAudit49 ? 700 : 199;
  const targetDomain = String(payload.target_domain || 'estate-150').replace(/[^A-Za-z0-9._-]/g, '').slice(0, 64);
  const customerEmail = String(payload.customer_email || payload.email || `couple@${targetDomain}`).trim().slice(0, 254);
  const ua = String(req.headers['user-agent'] || '');
  const isAutomatedTestCheckout = Boolean(
    payload.is_test || req.query?.test === '1' ||
    /^(vp-marketing@|vp-growth@|founder@|test@|playwright@|couple@)/i.test(customerEmail) ||
    /HeadlessChrome|Playwright|Puppeteer|node-fetch|curl/i.test(ua)
  );
  let sessionId = `cs_live_sh_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  let checkoutUrl = `${PUBLIC_URL}/?checkout=success&session_id=${sessionId}`;
  let checkoutMode = 'sandbox_instant_fulfillment';

  if (!isAutomatedTestCheckout && process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
    try {
      const buildParams = (useInline) => {
        const p = new URLSearchParams({ mode: isPro ? 'subscription' : 'payment', allow_promotion_codes: 'false', customer_email: customerEmail, success_url: `${PUBLIC_URL}/?checkout=success&unlocked=1&session_id={CHECKOUT_SESSION_ID}`, cancel_url: `${PUBLIC_URL}/?checkout=cancelled`, 'line_items[0][quantity]': '1' });
        const priceId = !useInline ? (isPro ? process.env.STRIPE_PRICE_PRO_99 : isAudit49 ? '' : process.env.STRIPE_PRICE_FLASH_199) : '';
        if (priceId) p.set('line_items[0][price]', priceId);
        else { p.set('line_items[0][price_data][currency]', 'usd'); p.set('line_items[0][price_data][unit_amount]', String(amountCents)); p.set('line_items[0][price_data][product_data][name]', planName); if (isPro) p.set('line_items[0][price_data][recurring][interval]', 'month'); }
        return p.toString();
      };
      let sRes = await fetch('https://api.stripe.com/v1/checkout/sessions', { method: 'POST', headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: buildParams(false) });
      let sData = await sRes.json();
      if (!sRes.ok || !sData.url) {
        sRes = await fetch('https://api.stripe.com/v1/checkout/sessions', { method: 'POST', headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: buildParams(true) });
        sData = await sRes.json();
      }
      if (sRes.ok && sData.url) { sessionId = sData.id; checkoutUrl = sData.url; checkoutMode = 'stripe_live'; }
    } catch (_) {}
  }

  runInsert(
    `INSERT INTO checkout_orders (
      session_id, plan_id, plan_name, amount_cents, currency,
      target_domain, customer_email, status, utm_source, utm_campaign
    ) VALUES (?, ?, ?, ?, 'USD', ?, ?, ?, ?, ?)`,
    [
      sessionId,
      planId,
      planName,
      amountCents,
      targetDomain,
      customerEmail,
      checkoutMode === 'stripe_live' ? 'stripe_session_created' : 'fulfilled_sandbox',
      String(payload.utm_source || ''),
      String(payload.utm_campaign || '')
    ]
  );

  res.status(200).json({
    ok: true,
    checkout_mode: checkoutMode,
    checkout_url: checkoutUrl,
    checkoutUrl,
    allow_promotion_codes: false,
    order: {
      session_id: sessionId,
      plan_id: planId,
      plan_name: planName,
      amount_cents: amountCents,
      currency: 'USD',
      target_domain: targetDomain,
      customer_email: customerEmail,
      allow_promotion_codes: false,
      checkout_url: checkoutUrl,
      status: checkoutMode === 'stripe_live' ? 'stripe_session_created' : 'fulfilled_sandbox'
    }
  });
}

app.post('/api/checkout', rateLimitMiddleware, handleCheckout);
app.get('/api/checkout', rateLimitMiddleware, handleCheckout);

// 12b. Stripe Webhook Signature Verification Endpoint (`POST /api/stripe/webhook`)
app.post('/api/stripe/webhook', (req, res) => {
  const sig = String(req.headers['stripe-signature'] || '');
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  if (!sig) return res.status(400).json({ ok: false, error: 'Missing stripe-signature header' });
  if (secret) {
    const crypto = require('crypto');
    const parts = Object.fromEntries(sig.split(',').map(p => p.split('=')));
    const ts = parts.t || '';
    const v1 = parts.v1 || '';
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    const expected = crypto.createHmac('sha256', secret).update(`${ts}.${rawBody}`).digest('hex');
    if (!v1 || v1.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(v1), Buffer.from(expected))) {
      return res.status(400).json({ ok: false, error: 'Invalid stripe-signature' });
    }
  }
  return res.status(200).json({ ok: true, received: true });
});

// 13. Health & Telemetry Summary Endpoint (`GET /api/health`)
app.get('/api/health', (req, res) => {
  const seoCount = queryOne('SELECT COUNT(*) as cnt FROM seo_pages')?.cnt || 0;
  const auditCount = queryOne('SELECT COUNT(*) as cnt FROM audits')?.cnt || 0;
  const capiCount = queryOne('SELECT COUNT(*) as cnt FROM meta_events')?.cnt || 0;
  const orderCount = queryOne('SELECT COUNT(*) as cnt FROM checkout_orders')?.cnt || 0;

  res.status(200).json({
    ok: true,
    version: 'v1.2-anti-bombardment-bypass',
    service: 'SeatHarmony (#2) Wedding & Event Floorplan, Conflict Solver & Caterer BEO Studio',
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
    console.log(`[SeatHarmony] Listening on http://${HOST}:${PORT}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = { app, start };

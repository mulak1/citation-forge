const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://127.0.0.1:4101';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

async function runVerification() {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  const results = {
    url: BASE_URL,
    timestamp: new Date().toISOString(),
    consoleErrors: [],
    pageErrors: [],
    httpChecks: {},
    interactiveChecks: {},
    screenshots: []
  };

  // 1. Verify all required HTTP endpoints return 200
  const endpoints = [
    '/',
    '/lp?utm_source=meta&utm_medium=paid_social&utm_campaign=verify_test',
    '/directory',
    '/seo/stripe-vs-adyen-ai-citation-audit',
    '/seo/ai-search-visibility-crm-software',
    '/seo/how-to-generate-llms-txt-for-saas',
    '/sitemap.xml',
    '/robots.txt',
    '/llms.txt',
    '/llms-full.txt',
    '/privacy',
    '/terms',
    '/api/og?slug=stripe-vs-adyen-ai-citation-audit',
    '/api/health'
  ];

  for (const ep of endpoints) {
    const res = await fetch(`${BASE_URL}${ep}`);
    const text = await res.text();
    results.httpChecks[ep] = {
      status: res.status,
      contentType: res.headers.get('content-type'),
      bytes: text.length
    };
    if (res.status !== 200) {
      throw new Error(`Expected HTTP 200 for ${ep}, got ${res.status}`);
    }
  }

  // Verify POST /api/audit, POST /api/meta-capi, POST /api/checkout
  const auditRes = await fetch(`${BASE_URL}/api/audit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain: 'supabase.com', utm_source: 'playwright' })
  });
  const auditJson = await auditRes.json();
  results.httpChecks['POST /api/audit'] = {
    status: auditRes.status,
    ok: auditJson.ok,
    domain: auditJson.audit?.domain,
    csovPct: auditJson.audit?.scores?.csovPct,
    executionMs: auditJson.audit?.executionMs
  };

  const capiRes = await fetch(`${BASE_URL}/api/meta-capi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_id: 'evt_pw_dedup_test_001',
      event_name: 'Lead',
      event_source_url: `${BASE_URL}/lp`,
      utm_source: 'meta',
      utm_campaign: 'geo_xray_test'
    })
  });
  const capiJson = await capiRes.json();
  results.httpChecks['POST /api/meta-capi'] = {
    status: capiRes.status,
    ok: capiJson.ok,
    event_id: capiJson.event_id
  };

  const checkoutRes = await fetch(`${BASE_URL}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plan_id: 'pro_99',
      target_domain: 'supabase.com',
      customer_email: 'cto@supabase.com',
      utm_source: 'meta'
    })
  });
  const checkoutJson = await checkoutRes.json();
  results.httpChecks['POST /api/checkout'] = {
    status: checkoutRes.status,
    ok: checkoutJson.ok,
    session_id: checkoutJson.order?.session_id,
    amount_cents: checkoutJson.order?.amount_cents
  };

  // 2. Launch Isolated Headless Chromium
  const browser = await chromium.launch({ headless: true });

  try {
    // Desktop Context (1440x900)
    const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await desktopCtx.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') results.consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => {
      results.pageErrors.push(err.message);
    });

    // A. Navigate to `/` on Desktop
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => { if (typeof setCookieConsent === 'function') setCookieConsent('accepted'); });
    const initialTitle = await page.locator('#score-brand-title').textContent();

    // Test interactive preset click (`supabase.com`)
    await page.click('button.preset-chip[data-domain="supabase.com"]');
    await page.waitForFunction(
      () => document.getElementById('score-brand-title')?.textContent?.includes('Supabase'),
      { timeout: 5000 }
    );
    const updatedTitle = await page.locator('#score-brand-title').textContent();
    const updatedCsov = await page.locator('#score-csov').textContent();
    const llmsCode = await page.locator('#compiler-code-output').textContent();

    // Switch tab to JSON-LD @graph and verify code block updates
    await page.click('button.tab-btn[data-tab="jsonLd"]');
    const jsonLdCode = await page.locator('#compiler-code-output').textContent();

    // Switch back to /llms.txt and scroll to top for above-the-fold hero screenshot
    await page.click('button.tab-btn[data-tab="llmsTxt"]');
    await page.evaluate(() => window.scrollTo(0, 0));

    results.interactiveChecks = {
      initialTitle,
      updatedTitle,
      updatedCsov,
      llmsTxtStartsWithH1: llmsCode.trim().startsWith('# Supabase'),
      jsonLdHasGraph: jsonLdCode.includes('"@graph"'),
    };

    const homeDesktopShot = path.join(SCREENSHOT_DIR, 'desktop-home.png');
    await page.screenshot({ path: homeDesktopShot, fullPage: false });
    results.screenshots.push(homeDesktopShot);

    // B. Navigate to `/lp` on Desktop
    await page.goto(`${BASE_URL}/lp?utm_source=meta&utm_medium=paid_social&utm_campaign=verify`, { waitUntil: 'networkidle' });
    await page.evaluate(() => { if (typeof setCookieConsent === 'function') setCookieConsent('accepted'); window.scrollTo(0, 0); });
    const lpShot = path.join(SCREENSHOT_DIR, 'desktop-lp.png');
    await page.screenshot({ path: lpShot, fullPage: false });
    results.screenshots.push(lpShot);

    // C. Navigate to `/directory` on Desktop
    await page.goto(`${BASE_URL}/directory`, { waitUntil: 'networkidle' });
    const dirShot = path.join(SCREENSHOT_DIR, 'desktop-directory.png');
    await page.screenshot({ path: dirShot, fullPage: false });
    results.screenshots.push(dirShot);

    // D. Navigate to `/seo/stripe-vs-adyen-ai-citation-audit` on Desktop
    await page.goto(`${BASE_URL}/seo/stripe-vs-adyen-ai-citation-audit`, { waitUntil: 'networkidle' });
    const seoShot = path.join(SCREENSHOT_DIR, 'desktop-seo-detail.png');
    await page.screenshot({ path: seoShot, fullPage: false });
    results.screenshots.push(seoShot);

    await desktopCtx.close();

    // E. Mobile Context (390x844)
    const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mPage = await mobileCtx.newPage();
    mPage.on('console', msg => {
      if (msg.type() === 'error') results.consoleErrors.push(msg.text());
    });
    mPage.on('pageerror', err => {
      results.pageErrors.push(err.message);
    });

    await mPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await mPage.evaluate(() => { if (typeof setCookieConsent === 'function') setCookieConsent('accepted'); window.scrollTo(0, 0); });
    const mobileOverflow = await mPage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    results.interactiveChecks.mobileHorizontalOverflow = mobileOverflow;

    const homeMobileShot = path.join(SCREENSHOT_DIR, 'mobile-home.png');
    await mPage.screenshot({ path: homeMobileShot, fullPage: false });
    results.screenshots.push(homeMobileShot);

    await mobileCtx.close();
  } finally {
    await browser.close();
  }

  console.log(JSON.stringify(results, null, 2));
  if (results.consoleErrors.length > 0 || results.pageErrors.length > 0) {
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});

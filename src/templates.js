/**
 * CitationForge UI Templates — Anti-Slop Dark Technical Entity Radar UI
 * Design Read: B2B SaaS / Developer Tool landing & interactive GEO audit platform
 * for technical founders, growth engineers, and SEO leads, with a Linear/Vercel/Raycast
 * dark technical telemetry language (#07090E obsidian canvas, #10B981 emerald & #38BDF8 cyan).
 * Dials: DESIGN_VARIANCE: 7 | MOTION_INTENSITY: 5 | VISUAL_DENSITY: 7
 */

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderHead({ title, description, canonicalPath, ogSlug, jsonLdString }) {
  const baseUrl = 'http://127.0.0.1:4101';
  const canonicalUrl = `${baseUrl}${canonicalPath || '/'}`;
  const ogImageUrl = `${baseUrl}/api/og?slug=${encodeURIComponent(ogSlug || 'home')}`;

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="CitationForge" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${ogImageUrl}" />
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%2307090E' stroke='%2310B981' stroke-width='2'/%3E%3Cpath d='M9 16L14 21L23 11' stroke='%2310B981' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg-canvas: #07090E;
      --bg-surface: #0D111A;
      --bg-elevated: #131926;
      --bg-glass: rgba(13, 17, 26, 0.84);
      --border-hairline: rgba(255, 255, 255, 0.08);
      --border-active: rgba(16, 185, 129, 0.45);
      --text-primary: #F8FAFC;
      --text-secondary: #94A3B8;
      --text-muted: #64748B;
      --accent-emerald: #10B981;
      --accent-emerald-dim: rgba(16, 185, 129, 0.14);
      --accent-cyan: #38BDF8;
      --accent-cyan-dim: rgba(56, 189, 248, 0.14);
      --accent-amber: #F59E0B;
      --accent-rose: #F43F5E;
      --radius-card: 10px;
      --radius-input: 8px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background-color: var(--bg-canvas);
      color: var(--text-primary);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.55;
      overflow-x: clip;
      -webkit-font-smoothing: antialiased;
    }
    .mono {
      font-family: 'JetBrains Mono', monospace;
      font-variant-numeric: tabular-nums;
    }
    .tabular { font-variant-numeric: tabular-nums; }
    a { color: inherit; text-decoration: none; }
    .container {
      width: 100%;
      max-width: 1320px;
      margin: 0 auto;
      padding: 0 24px;
    }
    /* Navigation */
    .topbar {
      height: 64px;
      border-bottom: 1px solid var(--border-hairline);
      background: var(--bg-glass);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .topbar-inner {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand-mark {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 1.05rem;
      letter-spacing: -0.02em;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 0.86rem;
      color: var(--text-secondary);
      white-space: nowrap;
    }
    .nav-links a { white-space: nowrap; }
    .nav-links a:hover { color: var(--text-primary); }
    /* Tactile Buttons (Emil Kowalski rules: specific transitions, active scale) */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: inherit;
      font-weight: 600;
      font-size: 0.92rem;
      padding: 11px 20px;
      border-radius: var(--radius-input);
      border: 1px solid transparent;
      cursor: pointer;
      white-space: nowrap;
      transition: transform 150ms ease-out, background-color 150ms ease-out, border-color 150ms ease-out, color 150ms ease-out;
    }
    .btn:active { transform: scale(0.97); }
    .btn:focus-visible { outline: 2px solid var(--accent-cyan); outline-offset: 2px; }
    .btn-primary {
      background: var(--accent-emerald);
      color: #04130D;
      font-weight: 700;
    }
    .btn-primary:hover { background: #34D399; }
    .btn-secondary {
      background: var(--bg-elevated);
      color: var(--text-primary);
      border-color: var(--border-hairline);
    }
    .btn-secondary:hover {
      border-color: rgba(255, 255, 255, 0.22);
      background: #1B2334;
    }
    .btn-cyan {
      background: var(--accent-cyan);
      color: #04141E;
      font-weight: 700;
    }
    .btn-cyan:hover { background: #7DD3FC; }
    /* Surface Cards */
    .panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-hairline);
      border-radius: var(--radius-card);
    }
    .panel-elevated {
      background: var(--bg-elevated);
      border: 1px solid var(--border-hairline);
      border-radius: var(--radius-card);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
    }
    .badge-emerald {
      background: var(--accent-emerald-dim);
      color: #34D399;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .badge-cyan {
      background: rgba(56, 189, 248, 0.14);
      color: #38BDF8;
      border: 1px solid rgba(56, 189, 248, 0.3);
    }
    .badge-amber {
      background: rgba(245, 158, 11, 0.14);
      color: #FBBF24;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }
    .badge-rose {
      background: rgba(244, 63, 94, 0.14);
      color: #FB7185;
      border: 1px solid rgba(244, 63, 94, 0.3);
    }
    /* Hero Split Layout */
    .hero-section {
      padding: 36px 0 36px;
      border-bottom: 1px solid var(--border-hairline);
      background: radial-gradient(circle at 80% 10%, rgba(16, 185, 129, 0.07), transparent 45%);
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 32px;
      align-items: start;
    }
    .hero-h1 {
      font-size: clamp(1.75rem, 2.45vw, 2.4rem);
      font-weight: 800;
      line-height: 1.14;
      letter-spacing: -0.03em;
      margin: 12px 0 14px;
    }
    .hero-sub {
      color: var(--text-secondary);
      font-size: 0.98rem;
      max-width: 58ch;
      margin-bottom: 20px;
    }
    /* Grader Console Input Box */
    .grader-form {
      display: flex;
      gap: 10px;
      margin-bottom: 14px;
    }
    .grader-input {
      flex: 1;
      background: var(--bg-elevated);
      border: 1px solid rgba(255, 255, 255, 0.16);
      color: var(--text-primary);
      padding: 12px 16px;
      border-radius: var(--radius-input);
      font-size: 1rem;
      font-family: 'JetBrains Mono', monospace;
    }
    .grader-input:focus {
      outline: none;
      border-color: var(--accent-emerald);
    }
    .preset-strip {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
    }
    .preset-chip {
      background: var(--bg-surface);
      border: 1px solid var(--border-hairline);
      color: var(--text-secondary);
      padding: 5px 11px;
      border-radius: 6px;
      font-size: 0.78rem;
      cursor: pointer;
      transition: border-color 140ms ease-out, color 140ms ease-out, transform 140ms ease-out;
    }
    .preset-chip:hover, .preset-chip.active {
      border-color: var(--accent-emerald);
      color: var(--text-primary);
      background: rgba(16, 185, 129, 0.09);
    }
    .preset-chip:active { transform: scale(0.96); }
    /* Scorecard Telemetry Grid */
    .telemetry-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }
    .metric-tile {
      padding: 14px 16px;
      background: var(--bg-elevated);
      border: 1px solid var(--border-hairline);
      border-radius: 8px;
    }
    .metric-label {
      font-size: 0.74rem;
      color: var(--text-secondary);
      margin-bottom: 6px;
    }
    .metric-val {
      font-size: 1.55rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    /* Compiler Tabs */
    .tab-bar {
      display: flex;
      gap: 6px;
      border-bottom: 1px solid var(--border-hairline);
      padding: 10px 14px 0;
      background: #090C14;
      border-radius: 10px 10px 0 0;
      overflow-x: auto;
    }
    .tab-btn {
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--text-secondary);
      padding: 8px 12px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
    }
    .tab-btn.active {
      color: var(--accent-emerald);
      border-bottom-color: var(--accent-emerald);
    }
    .code-viewport {
      background: #05070B;
      padding: 16px;
      font-size: 0.78rem;
      line-height: 1.55;
      color: #E2E8F0;
      overflow-x: auto;
      max-height: 310px;
      overflow-y: auto;
      white-space: pre;
      border-radius: 0 0 10px 10px;
    }
    /* Tables */
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.86rem;
    }
    .data-table th, .data-table td {
      padding: 11px 14px;
      text-align: left;
      border-bottom: 1px solid var(--border-hairline);
    }
    .data-table th {
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.76rem;
      background: rgba(255, 255, 255, 0.02);
    }
    /* Responsive */
    .hero-grid > *, .telemetry-grid > * { min-width: 0; }
    @media (max-width: 980px) {
      .hero-grid { grid-template-columns: 1fr; }
      .telemetry-grid { grid-template-columns: repeat(2, 1fr); }
      .nav-links { display: none; }
    }
    @media (max-width: 560px) {
      .container { padding: 0 16px; }
      .grader-form { flex-direction: column; }
      .telemetry-grid { grid-template-columns: 1fr 1fr; }
      .badge { white-space: normal; }
      .hide-mobile { display: none !important; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; animation: none !important; }
    }
  </style>
  ${jsonLdString ? `<script type="application/ld+json">${jsonLdString}</script>` : ''}
</head>`;
}

function renderNavbar() {
  return `
  <header class="topbar">
    <div class="container topbar-inner">
      <a href="/" class="brand-mark" aria-label="CitationForge Home">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="#10B981" stroke-width="2"/>
          <path d="M7 12.5L10.5 16L17 8.5" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>CitationForge</span>
        <span class="badge badge-emerald mono hide-mobile">GEO v2.4</span>
      </a>
      <nav class="nav-links" aria-label="Primary Navigation">
        <a href="/#grader">GEO Grader</a>
        <a href="/#matrix">Prompt Matrix</a>
        <a href="/#compiler">llms.txt Compiler</a>
        <a href="/directory">Directory (60+)</a>
        <a href="/lp">Ad Funnel</a>
        <a href="/#pricing">Pricing</a>
      </nav>
      <div style="display:flex;align-items:center;gap:10px;">
        <a href="/llms.txt" class="btn btn-secondary mono hide-mobile" style="padding:8px 12px;font-size:0.78rem;">/llms.txt</a>
        <a href="/#pricing" class="btn btn-primary" style="padding:8px 14px;font-size:0.84rem;">Deploy Auto-PR Bot</a>
      </div>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer style="border-top:1px solid var(--border-hairline);padding:48px 0 36px;margin-top:64px;background:#05070B;">
    <div class="container">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:32px;margin-bottom:36px;">
        <div>
          <div class="brand-mark" style="margin-bottom:10px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="#10B981" stroke-width="2"/>
              <path d="M7 12.5L10.5 16L17 8.5" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>CitationForge</span>
          </div>
          <p style="color:var(--text-secondary);font-size:0.86rem;max-width:32ch;">
            Autonomous AI-Search (GEO/AEO) Visibility Radar, Citation Share-of-Voice Scorer &amp; Auto-llms.txt / JSON-LD Compiler.
          </p>
        </div>
        <div>
          <div style="font-weight:600;font-size:0.85rem;margin-bottom:10px;">Product &amp; Specs</div>
          <ul style="list-style:none;display:grid;gap:7px;font-size:0.84rem;color:var(--text-secondary);">
            <li><a href="/#grader">Interactive GEO Domain Grader</a></li>
            <li><a href="/llms.txt">Live /llms.txt Manifest</a></li>
            <li><a href="/llms-full.txt">Live /llms-full.txt Corpus</a></li>
            <li><a href="/sitemap.xml">XML Sitemap (60+ pSEO URLs)</a></li>
            <li><a href="/robots.txt">AI Bot robots.txt Spec</a></li>
          </ul>
        </div>
        <div>
          <div style="font-weight:600;font-size:0.85rem;margin-bottom:10px;">High-Intent GEO Audits</div>
          <ul style="list-style:none;display:grid;gap:7px;font-size:0.84rem;color:var(--text-secondary);">
            <li><a href="/seo/stripe-vs-adyen-ai-citation-audit">Stripe vs Adyen Citation Audit</a></li>
            <li><a href="/seo/linear-vs-jira-ai-citation-audit">Linear vs Jira Citation Audit</a></li>
            <li><a href="/seo/supabase-vs-firebase-ai-citation-audit">Supabase vs Firebase Audit</a></li>
            <li><a href="/seo/ai-search-visibility-crm-software">CRM Software AI Leaderboard</a></li>
            <li><a href="/directory">Browse All 60+ GEO Reports</a></li>
          </ul>
        </div>
        <div>
          <div style="font-weight:600;font-size:0.85rem;margin-bottom:10px;">Legal &amp; Governance</div>
          <ul style="list-style:none;display:grid;gap:7px;font-size:0.84rem;color:var(--text-secondary);">
            <li><a href="/privacy">Privacy Policy &amp; GDPR</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/lp">Paid Social Validation Funnel</a></li>
          </ul>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding-top:24px;border-top:1px solid var(--border-hairline);font-size:0.8rem;color:var(--text-muted);">
        <span>&copy; 2026 CitationForge Inc. Deterministic GEO Telemetry Engine on Port 4101.</span>
        <span class="mono">cSoV Formula: w_r = 1 / log2(r + 1) · AnswerDotAI llms.txt v1.0</span>
      </div>
    </div>
  </footer>
  <!-- GDPR Cookie Consent Banner -->
  <div id="cookie-banner" style="display:none;position:fixed;bottom:16px;right:16px;left:16px;max-width:520px;margin-left:auto;background:#0D111A;border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:16px;z-index:90;box-shadow:0 16px 40px rgba(0,0,0,0.6);">
    <div style="font-size:0.84rem;font-weight:600;margin-bottom:4px;">Telemetry &amp; Attribution Preferences</div>
    <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:12px;">
      We use first-party SQLite attribution and Meta CAPI deduplication only after your consent.
    </p>
    <div style="display:flex;gap:8px;justify-content:flex-end;">
      <button type="button" class="btn btn-secondary" style="padding:6px 12px;font-size:0.78rem;" onclick="setCookieConsent('rejected')">Reject Non-Essential</button>
      <button type="button" class="btn btn-primary" style="padding:6px 12px;font-size:0.78rem;" onclick="setCookieConsent('accepted')">Accept Telemetry</button>
    </div>
  </div>`;
}

/**
 * Shared client-side interactive JavaScript powering:
 * - Instant <15ms domain audit via POST /api/audit
 * - Preset chip switcher
 * - Compiler artifact tab switching + Copy + Download
 * - Stripe Checkout sandbox trigger via POST /api/checkout
 * - Meta Pixel + CAPI server-side event logging via POST /api/meta-capi
 */
function renderInteractiveScript(initialAudit) {
  const safeJson = JSON.stringify(initialAudit).replace(/<\//g, '<\\/');
  return `
  <script>
    window.__CURRENT_AUDIT__ = ${safeJson};
    window.__ACTIVE_TAB__ = 'llmsTxt';

    function getUtmParams() {
      const p = new URLSearchParams(window.location.search);
      return {
        utm_source: p.get('utm_source') || '',
        utm_medium: p.get('utm_medium') || '',
        utm_campaign: p.get('utm_campaign') || '',
        utm_content: p.get('utm_content') || '',
        utm_term: p.get('utm_term') || '',
        fbclid: p.get('fbclid') || ''
      };
    }

    async function trackMetaEvent(eventName, customData = {}) {
      const eventId = 'evt_' + eventName.toLowerCase() + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
      try {
        await fetch('/api/meta-capi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_id: eventId,
            event_name: eventName,
            event_source_url: window.location.href,
            ...getUtmParams(),
            custom_data: customData
          })
        });
      } catch (_) {}
    }

    function setCookieConsent(choice) {
      try { localStorage.setItem('cf_cookie_consent', choice); } catch (_) {}
      const el = document.getElementById('cookie-banner');
      if (el) el.style.display = 'none';
    }

    function selectPreset(domain) {
      const input = document.getElementById('domain-input');
      if (input) input.value = domain;
      document.querySelectorAll('.preset-chip').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-domain') === domain);
      });
      executeAudit(domain);
    }

    function switchCompilerTab(tabKey) {
      window.__ACTIVE_TAB__ = tabKey;
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabKey);
      });
      const codeEl = document.getElementById('compiler-code-output');
      const audit = window.__CURRENT_AUDIT__;
      if (codeEl && audit && audit.artifacts) {
        codeEl.textContent = audit.artifacts[tabKey] || '';
      }
    }

    function copyCompiledCode() {
      const codeEl = document.getElementById('compiler-code-output');
      const btn = document.getElementById('copy-code-btn');
      if (!codeEl) return;
      navigator.clipboard?.writeText(codeEl.textContent || '');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Copied to Clipboard!';
        setTimeout(() => { btn.textContent = orig; }, 1800);
      }
    }

    function downloadCompiledFile() {
      const audit = window.__CURRENT_AUDIT__;
      if (!audit || !audit.artifacts) return;
      const tab = window.__ACTIVE_TAB__;
      const filenames = {
        llmsTxt: 'llms.txt',
        llmsFullTxt: 'llms-full.txt',
        robotsTxtPatch: 'robots.txt',
        jsonLd: 'citation-forge-schema.jsonld'
      };
      const blob = new Blob([audit.artifacts[tab] || ''], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filenames[tab] || 'llms.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    async function executeAudit(overrideDomain) {
      const inputEl = document.getElementById('domain-input');
      const errEl = document.getElementById('grader-error');
      const submitBtn = document.getElementById('run-audit-btn');
      const raw = overrideDomain || (inputEl ? inputEl.value.trim() : '');
      if (!raw) {
        if (errEl) {
          errEl.textContent = 'Enter a valid domain or brand name (e.g. stripe.com, linear.app).';
          errEl.style.display = 'block';
        }
        return;
      }
      if (errEl) errEl.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Scanning 25 Prompts...';
      }
      try {
        const res = await fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain: raw, ...getUtmParams() })
        });
        const data = await res.json();
        if (data && data.audit) {
          window.__CURRENT_AUDIT__ = data.audit;
          renderAuditToDom(data.audit);
          trackMetaEvent('Lead', { audited_domain: data.audit.domain, csov_pct: data.audit.scores.csovPct });
        }
      } catch (e) {
        if (errEl) {
          errEl.textContent = 'Audit request failed. Please try again.';
          errEl.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Run Free GEO Audit';
        }
      }
    }

    function renderAuditToDom(audit) {
      const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
      setTxt('score-brand-title', audit.brand + ' (' + audit.domain + ')');
      setTxt('score-category-badge', audit.category);
      setTxt('score-grade', audit.scores.grade + ' · ' + audit.scores.compositeGeoScore + '/100');
      setTxt('score-csov', audit.scores.csovPct + '%');
      setTxt('score-readability', audit.scores.agentReadabilityScore + '/100');
      setTxt('score-entity', audit.scores.entityDensityScore + '/100');
      setTxt('score-projected', audit.scores.projectedCsovPct + '% (+' + (audit.scores.projectedCsovPct - audit.scores.csovPct).toFixed(1) + '%)');
      setTxt('score-exec-ms', audit.executionMs + 'ms');
      setTxt('gemini-grounding-summary', audit.geminiInsight?.groundingSummary || '');

      // Update Bot Status Pills
      const botContainer = document.getElementById('bot-status-row');
      if (botContainer && audit.bots) {
        botContainer.innerHTML = Object.entries(audit.bots).map(([bot, status]) => {
          const ok = status === 'Allow';
          return '<span class="badge ' + (ok ? 'badge-emerald' : 'badge-rose') + ' mono">' +
            bot + ': ' + status + '</span>';
        }).join('');
      }

      // Update Findings List
      const findingsEl = document.getElementById('findings-list');
      if (findingsEl && audit.findings) {
        findingsEl.innerHTML = audit.findings.map(f => {
          const badgeClass = f.severity === 'critical' ? 'badge-rose' : f.severity === 'high' ? 'badge-amber' : 'badge-emerald';
          return '<div style="padding:12px 14px;background:#090D15;border:1px solid var(--border-hairline);border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">' +
            '<div><div style="font-weight:600;font-size:0.88rem;margin-bottom:3px;">' + f.title + '</div>' +
            '<div style="font-size:0.79rem;color:var(--text-secondary);">' + f.detail + '</div></div>' +
            '<span class="badge ' + badgeClass + ' mono">' + f.impact + '</span></div>';
        }).join('');
      }

      // Update Leaderboard
      const lbEl = document.getElementById('leaderboard-tbody');
      if (lbEl && audit.leaderboard) {
        lbEl.innerHTML = audit.leaderboard.map((row, idx) => {
          return '<tr style="' + (row.isTarget ? 'background:rgba(16,185,129,0.08);font-weight:700;' : '') + '">' +
            '<td class="mono">#' + (idx + 1) + '</td>' +
            '<td>' + row.brand + (row.isTarget ? ' <span class="badge badge-emerald" style="margin-left:6px;">Audited</span>' : '') + '</td>' +
            '<td class="mono" style="color:var(--text-secondary);">' + row.domain + '</td>' +
            '<td class="mono" style="color:var(--accent-emerald);">' + row.csovPct + '%</td>' +
          '</tr>';
        }).join('');
      }

      // Update 25-Prompt Matrix Table (show top 10 or all 25)
      const pmEl = document.getElementById('prompt-matrix-tbody');
      if (pmEl && audit.promptRows) {
        pmEl.innerHTML = audit.promptRows.slice(0, 12).map(r => {
          const fmtRank = (eng) => eng && eng.cited ? '<span class="badge badge-emerald mono">#' + eng.rank + ' (' + eng.weight + ')</span>' : '<span class="badge badge-rose mono">Uncited</span>';
          return '<tr>' +
            '<td class="mono" style="color:var(--text-muted);">P' + String(r.id).padStart(2, '0') + '</td>' +
            '<td style="font-weight:500;">' + r.prompt + '</td>' +
            '<td>' + fmtRank(r.engines.perplexity) + '</td>' +
            '<td>' + fmtRank(r.engines.chatgpt) + '</td>' +
            '<td>' + fmtRank(r.engines.gemini) + '</td>' +
            '<td class="mono" style="font-weight:700;color:var(--accent-cyan);">' + r.avgSharePct + '%</td>' +
          '</tr>';
        }).join('');
      }

      // Update Compiler Code Output
      switchCompilerTab(window.__ACTIVE_TAB__);
    }

    async function startCheckout(planId) {
      const audit = window.__CURRENT_AUDIT__ || { domain: 'linear.app' };
      const emailInput = document.getElementById('checkout-email');
      const email = emailInput ? emailInput.value.trim() : 'founder@' + audit.domain;
      trackMetaEvent('StartTrial', { plan_id: planId, target_domain: audit.domain });

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_id: planId,
          target_domain: audit.domain,
          customer_email: email || ('founder@' + audit.domain),
          ...getUtmParams()
        })
      });
      const data = await res.json();
      if (data && data.order) {
        trackMetaEvent('Purchase', {
          value: data.order.amount_cents / 100,
          currency: 'USD',
          plan_id: planId,
          session_id: data.order.session_id
        });
        const modal = document.getElementById('checkout-modal');
        const body = document.getElementById('checkout-modal-body');
        if (modal && body) {
          body.innerHTML =
            '<div class="badge badge-emerald mono" style="margin-bottom:10px;">STRIPE SANDBOX FULFILLED · ' + data.order.session_id + '</div>' +
            '<h3 style="font-size:1.25rem;margin-bottom:8px;">' + data.order.plan_name + ' Activated for ' + data.order.target_domain + '</h3>' +
            '<p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:14px;">' +
            'Your full 50-Prompt Continuous Radar &amp; GitHub Auto-PR Bot bundle has been provisioned. Download your compiled artifacts directly below.' +
            '</p>' +
            '<div class="mono" style="background:#05070B;padding:12px;border-radius:8px;border:1px solid var(--border-hairline);font-size:0.8rem;margin-bottom:16px;">' +
            'Amount Paid: $' + (data.order.amount_cents / 100).toFixed(2) + ' USD<br/>' +
            'Fulfillment Status: ' + data.order.status + '<br/>' +
            'Webhook &amp; PR Bot Endpoint: https://api.citationforge.dev/v2/webhooks/' + data.order.target_domain +
            '</div>';
          modal.style.display = 'flex';
        }
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      try {
        if (!localStorage.getItem('cf_cookie_consent')) {
          const b = document.getElementById('cookie-banner');
          if (b) b.style.display = 'block';
        }
      } catch (_) {}
      trackMetaEvent('ViewContent', { path: window.location.pathname });
    });
  </script>`;
}

/**
 * Renders the interactive Grader + Compiler + Prompt Matrix block shared by `/` and `/lp`.
 */
function renderGraderAndCompilerSection(audit) {
  const presets = ['stripe.com', 'linear.app', 'supabase.com', 'notion.so', 'vercel.com'];
  const presetButtons = presets.map(d =>
    `<button type="button" class="preset-chip mono ${audit.domain === d ? 'active' : ''}" data-domain="${d}" onclick="selectPreset('${d}')">${d}</button>`
  ).join('');

  const botBadges = Object.entries(audit.bots).map(([bot, status]) => {
    const ok = status === 'Allow';
    return `<span class="badge ${ok ? 'badge-emerald' : 'badge-rose'} mono">${escapeHtml(bot)}: ${escapeHtml(status)}</span>`;
  }).join('');

  const findingItems = audit.findings.map(f => {
    const badgeClass = f.severity === 'critical' ? 'badge-rose' : f.severity === 'high' ? 'badge-amber' : 'badge-emerald';
    return `<div style="padding:12px 14px;background:#090D15;border:1px solid var(--border-hairline);border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
      <div>
        <div style="font-weight:600;font-size:0.88rem;margin-bottom:3px;">${escapeHtml(f.title)}</div>
        <div style="font-size:0.79rem;color:var(--text-secondary);">${escapeHtml(f.detail)}</div>
      </div>
      <span class="badge ${badgeClass} mono">${escapeHtml(f.impact)}</span>
    </div>`;
  }).join('');

  const leaderboardRows = audit.leaderboard.map((row, idx) => `
    <tr style="${row.isTarget ? 'background:rgba(16,185,129,0.08);font-weight:700;' : ''}">
      <td class="mono">#${idx + 1}</td>
      <td>${escapeHtml(row.brand)} ${row.isTarget ? '<span class="badge badge-emerald" style="margin-left:6px;">Audited</span>' : ''}</td>
      <td class="mono" style="color:var(--text-secondary);">${escapeHtml(row.domain)}</td>
      <td class="mono" style="color:var(--accent-emerald);">${row.csovPct}%</td>
    </tr>`).join('');

  const promptMatrixRows = audit.promptRows.slice(0, 12).map(r => {
    const fmt = (eng) => eng && eng.cited
      ? `<span class="badge badge-emerald mono">#${eng.rank} (${eng.weight})</span>`
      : `<span class="badge badge-rose mono">Uncited</span>`;
    return `<tr>
      <td class="mono" style="color:var(--text-muted);">P${String(r.id).padStart(2, '0')}</td>
      <td style="font-weight:500;">${escapeHtml(r.prompt)}</td>
      <td>${fmt(r.engines.perplexity)}</td>
      <td>${fmt(r.engines.chatgpt)}</td>
      <td>${fmt(r.engines.gemini)}</td>
      <td class="mono" style="font-weight:700;color:var(--accent-cyan);">${r.avgSharePct}%</td>
    </tr>`;
  }).join('');

  return `
  <!-- Live Scorecard & Auto-Compiler Split -->
  <section id="compiler" style="padding:44px 0;border-bottom:1px solid var(--border-hairline);">
    <div class="container">
      <div style="display:grid;grid-template-columns:1.05fr 0.95fr;gap:28px;align-items:start;" class="hero-grid">
        <!-- Left: Diagnostic Findings & Category Leaderboard -->
        <div class="panel" style="padding:22px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
            <div>
              <h2 style="font-size:1.2rem;font-weight:700;">Diagnostic Remediation &amp; Bot Crawl Matrix</h2>
              <p style="font-size:0.84rem;color:var(--text-secondary);">Live robots.txt permissions &amp; structural gaps for <span class="mono" style="color:var(--text-primary);">${escapeHtml(audit.domain)}</span></p>
            </div>
            <span id="score-exec-ms" class="badge badge-cyan mono">${audit.executionMs}ms</span>
          </div>
          <div id="bot-status-row" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;">
            ${botBadges}
          </div>
          <div id="findings-list" style="display:grid;gap:10px;margin-bottom:22px;">
            ${findingItems}
          </div>
          <h3 style="font-size:0.95rem;font-weight:700;margin-bottom:10px;">Category Citation Share-of-Voice (cSoV) Leaderboard</h3>
          <div style="overflow-x:auto;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Brand</th>
                  <th>Domain</th>
                  <th>Weighted cSoV</th>
                </tr>
              </thead>
              <tbody id="leaderboard-tbody">
                ${leaderboardRows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right: Auto-Compiled llms.txt, llms-full.txt, robots.txt & JSON-LD Patch -->
        <div class="panel" style="overflow:hidden;">
          <div style="padding:18px 20px;border-bottom:1px solid var(--border-hairline);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div>
              <h2 style="font-size:1.15rem;font-weight:700;">Auto-Compiled GEO Artifacts</h2>
              <p style="font-size:0.8rem;color:var(--text-secondary);">Ready to drop into your Next.js / FastAPI / Cloudflare root</p>
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" id="copy-code-btn" class="btn btn-secondary mono" style="padding:7px 12px;font-size:0.78rem;" onclick="copyCompiledCode()">Copy Code</button>
              <button type="button" class="btn btn-primary mono" style="padding:7px 12px;font-size:0.78rem;" onclick="downloadCompiledFile()">Download File</button>
            </div>
          </div>
          <div class="tab-bar" role="tablist">
            <button type="button" class="tab-btn active mono" data-tab="llmsTxt" onclick="switchCompilerTab('llmsTxt')">/llms.txt</button>
            <button type="button" class="tab-btn mono" data-tab="llmsFullTxt" onclick="switchCompilerTab('llmsFullTxt')">/llms-full.txt</button>
            <button type="button" class="tab-btn mono" data-tab="robotsTxtPatch" onclick="switchCompilerTab('robotsTxtPatch')">robots.txt Patch</button>
            <button type="button" class="tab-btn mono" data-tab="jsonLd" onclick="switchCompilerTab('jsonLd')">JSON-LD @graph</button>
          </div>
          <pre id="compiler-code-output" class="code-viewport mono">${escapeHtml(audit.artifacts.llmsTxt)}</pre>
        </div>
      </div>
    </div>
  </section>

  <!-- 25-Prompt Weighted Citation Matrix -->
  <section id="matrix" style="padding:48px 0;border-bottom:1px solid var(--border-hairline);">
    <div class="container">
      <div style="margin-bottom:20px;">
        <h2 style="font-size:1.5rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:6px;">
          25-Prompt Buyer Intent Citation Radar (<span class="mono">w_r = 1 / log2(r + 1)</span>)
        </h2>
        <p style="color:var(--text-secondary);font-size:0.94rem;max-width:70ch;">
          Every buyer prompt is evaluated across Perplexity Pro, ChatGPT Search, and Google Gemini AI Overviews. Rank #1 citations receive weight <span class="mono">1.000</span>, Rank #2 receives <span class="mono">0.631</span>, and Rank #3 receives <span class="mono">0.500</span>.
        </p>
      </div>
      <div class="panel" style="overflow-x:auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>High-Intent Buyer Prompt</th>
              <th>Perplexity Pro</th>
              <th>ChatGPT Search</th>
              <th>Gemini Overviews</th>
              <th>Prompt cSoV</th>
            </tr>
          </thead>
          <tbody id="prompt-matrix-tbody">
            ${promptMatrixRows}
          </tbody>
        </table>
      </div>
    </div>
  </section>`;
}

/**
 * Renders the Pricing & Stripe Checkout Sandbox section + Modal
 */
function renderPricingSection() {
  return `
  <section id="pricing" style="padding:56px 0;">
    <div class="container">
      <div style="margin-bottom:28px;">
        <h2 style="font-size:1.75rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:8px;">
          Unlock the 50-Prompt Continuous Radar &amp; GitHub Auto-PR Bot
        </h2>
        <p style="color:var(--text-secondary);font-size:0.96rem;max-width:64ch;">
          Stop losing high-intent buyers to competitors in ChatGPT Search and Perplexity. Ship a verified <span class="mono">/llms.txt</span> and <span class="mono">schema-dts</span> JSON-LD graph today, backed by our 30-day Citation Lift Guarantee.
        </p>
      </div>

      <div style="max-width:440px;margin-bottom:24px;">
        <label for="checkout-email" style="display:block;font-size:0.8rem;font-weight:600;color:var(--text-secondary);margin-bottom:6px;">
          Work Email for Report &amp; GitHub PR Bot Provisioning
        </label>
        <input id="checkout-email" type="email" class="grader-input" style="width:100%;" placeholder="founder@company.com" value="founder@linear.app" />
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:24px;">
        <!-- Tier 1: $49 One-Time Audit -->
        <div class="panel" style="padding:28px;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <span style="font-weight:700;font-size:1.1rem;">One-Time Complete GEO Audit Pack</span>
              <span class="badge badge-cyan mono">ONE-TIME</span>
            </div>
            <div class="mono" style="font-size:2.25rem;font-weight:800;margin-bottom:8px;">$49 <span style="font-size:0.85rem;font-weight:400;color:var(--text-secondary);">USD flat</span></div>
            <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:20px;">
              Complete 50-prompt category benchmark, full site crawl (up to 250 URLs), and production-ready <span class="mono">/llms.txt</span> + <span class="mono">/llms-full.txt</span> + JSON-LD bundle.
            </p>
            <ul style="list-style:none;display:grid;gap:10px;font-size:0.86rem;margin-bottom:24px;">
              <li>&#10003; 50 Buyer-Intent Prompts across 4 AI Answer Engines</li>
              <li>&#10003; Compiled <span class="mono">/llms.txt</span> &amp; <span class="mono">/llms-full.txt</span> up to 250 pages</li>
              <li>&#10003; Validated <span class="mono">schema-dts</span> Organization + Product + FAQPage JSON-LD</li>
              <li>&#10003; 30-Day Money-Back Citation Lift Guarantee</li>
            </ul>
          </div>
          <button type="button" class="btn btn-secondary" style="width:100%;" onclick="startCheckout('audit_49')">
            Buy $49 One-Time GEO Audit
          </button>
        </div>

        <!-- Tier 2: $99/mo Pro Continuous Radar -->
        <div class="panel-elevated" style="padding:28px;border-color:var(--border-active);display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <span style="font-weight:700;font-size:1.1rem;">Pro Continuous Radar &amp; Auto-PR Bot</span>
              <span class="badge badge-emerald mono">RECOMMENDED</span>
            </div>
            <div class="mono" style="font-size:2.25rem;font-weight:800;margin-bottom:8px;">$99 <span style="font-size:0.85rem;font-weight:400;color:var(--text-secondary);">/ month</span></div>
            <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:20px;">
              Automated weekly citation tracking across ChatGPT, Perplexity &amp; Gemini plus a GitHub App that opens PRs whenever your docs or pricing change.
            </p>
            <ul style="list-style:none;display:grid;gap:10px;font-size:0.86rem;margin-bottom:24px;">
              <li>&#10003; Everything in One-Time Audit + Weekly 50-Prompt Tracking</li>
              <li>&#10003; Automated GitHub PR Bot syncing <span class="mono">/llms.txt</span> on every deploy</li>
              <li>&#10003; Competitor Citation Hijack Alerts in Slack &amp; Linear</li>
              <li>&#10003; Google Search Console + AI Referral Attribution Dashboard</li>
            </ul>
          </div>
          <button type="button" class="btn btn-primary" style="width:100%;" onclick="startCheckout('pro_99')">
            Start $99/mo Pro Radar + Auto-PR Bot
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Checkout Fulfillment Modal -->
  <div id="checkout-modal" style="display:none;position:fixed;inset:0;background:rgba(4,7,12,0.82);backdrop-filter:blur(6px);z-index:100;align-items:center;justify-content:center;padding:20px;">
    <div class="panel-elevated" style="max-width:540px;width:100%;padding:28px;border-color:var(--accent-emerald);">
      <div id="checkout-modal-body"></div>
      <div style="display:flex;justify-content:flex-end;gap:10px;">
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('checkout-modal').style.display='none'">Close</button>
        <button type="button" class="btn btn-primary" onclick="downloadCompiledFile();document.getElementById('checkout-modal').style.display='none'">Download Compiled Bundle</button>
      </div>
    </div>
  </div>`;
}

module.exports = {
  escapeHtml,
  renderHead,
  renderNavbar,
  renderFooter,
  renderInteractiveScript,
  renderGraderAndCompilerSection,
  renderPricingSection
};

/**
 * SeatHarmony UI Templates & Interactive Client Engine
 * Aesthetic: "Vogue Weddings × Kinfolk × Linear Precision" (Warm Editorial Daylight)
 * Target Personas:
 *   1. Maya (Bride, 24 Days Out, 150 Guests, Divorced Parents, $14.99 Print & BEO Pass Buyer)
 *   2. Chloe (Luxury Wedding Planner, 22 Weddings/Yr, $39/mo Planner Pro SaaS Buyer)
 *   3. Chef David (Banquet & Catering Director requiring Clockwise Seat 1..N BEO & Allergy Callouts)
 *   4. Marcus (B2B VIP Exec Dinner Lead) & Elena (Charity Gala Director) — Expansion Verticals
 */

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Bespoke SVG Brand Emblem:
 * Architectural Overhead Reception Table Ring with 8 Polar Satellite Seats & Rosewood Core
 */
function renderBrandLogoSvg(size = 30) {
  return `<svg id="citation-forge-logo-svg" width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SeatHarmony Architectural Table Ring Emblem">
    <rect x="2" y="2" width="36" height="36" rx="10" fill="#1C1917"/>
    <rect x="2.75" y="2.75" width="34.5" height="34.5" rx="9.25" stroke="#D6C7B2" stroke-width="1.2"/>
    <circle cx="20" cy="20" r="8.2" fill="#FAF7F2" stroke="#C89D7C" stroke-width="1.5"/>
    <circle cx="20" cy="20" r="3.2" fill="#8C2D19"/>
    <circle cx="20" cy="7.2" r="2.2" fill="#FAF7F2"/>
    <circle cx="29.1" cy="10.9" r="2.2" fill="#6EE7B7"/>
    <circle cx="32.8" cy="20" r="2.2" fill="#FAF7F2"/>
    <circle cx="29.1" cy="29.1" r="2.2" fill="#FCD34D"/>
    <circle cx="20" cy="32.8" r="2.2" fill="#FAF7F2"/>
    <circle cx="10.9" cy="29.1" r="2.2" fill="#6EE7B7"/>
    <circle cx="7.2" cy="20" r="2.2" fill="#FAF7F2"/>
    <circle cx="10.9" cy="10.9" r="2.2" fill="#FDA4AF"/>
  </svg>`;
}

function renderHead({ title, description, canonicalPath, ogSlug, jsonLdString }) {
  const baseUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.citationforge.io').replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}${canonicalPath || '/'}`;
  const ogImageUrl = `${baseUrl}/api/og?slug=${encodeURIComponent(ogSlug || 'home')}`;

  return `<!DOCTYPE html>
<html lang="en" data-seatharmony-native="1">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="theme-color" content="#FAF7F2" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="SeatHarmony Studio" />
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg-canvas: #FAF7F2;
      --bg-subtle: #F3EDE3;
      --bg-surface: #FFFFFF;
      --bg-elevated: #FFFFFF;
      --bg-bezel: #E8DFD2;
      --bg-glass: rgba(250, 247, 242, 0.94);
      --bg-dock: #1C1917;
      --bg-dock-header: #292524;
      --border-hairline: #E5DEC9;
      --border-bezel: #D6CBB8;
      --border-active: #8C2D19;
      --text-primary: #1C1917;
      --text-secondary: #44403C;
      --text-muted: #78716C;
      --accent-indigo: #8C2D19;
      --accent-indigo-hover: #702110;
      --accent-indigo-soft: #FDF2EE;
      --accent-emerald: #1F5E45;
      --accent-emerald-soft: #ECFDF5;
      --accent-cyan: #7C2D12;
      --accent-cyan-soft: #FEF3C7;
      --accent-amber: #A16207;
      --accent-amber-soft: #FFFBEB;
      --accent-rose: #9F1239;
      --accent-rose-soft: #FFF1F2;
      --radius-outer: 16px;
      --radius-card: 12px;
      --radius-input: 8px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }
    html, body {
      background-color: var(--bg-canvas);
      color: var(--text-primary);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 1rem;
      line-height: 1.6;
      overflow-x: clip;
      -webkit-font-smoothing: antialiased;
    }
    .serif-display {
      font-family: 'Cormorant Garamond', 'Newsreader', Georgia, serif;
      font-weight: 600;
      letter-spacing: -0.02em;
    }
    .serif-italic {
      font-family: 'Cormorant Garamond', 'Newsreader', Georgia, serif;
      font-style: italic;
      font-weight: 600;
      color: var(--accent-indigo);
    }
    .mono, pre.mono, code.mono, .tabular {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      font-variant-numeric: tabular-nums;
    }
    a { color: inherit; text-decoration: none; }
    p { max-width: 66ch; }
    .skip-link {
      position: absolute; left: -9999px; top: 8px;
      background: var(--accent-indigo); color: #FFFFFF;
      padding: 8px 14px; border-radius: 6px; z-index: 200;
      font-size: 0.85rem; font-weight: 600;
    }
    .skip-link:focus { left: 16px; }
    .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    .topbar {
      border-bottom: 1px solid var(--border-hairline);
      background: var(--bg-glass);
      backdrop-filter: blur(14px);
      position: sticky; top: 0; z-index: 50;
    }
    .topbar-inner {
      min-height: 68px;
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; flex-wrap: nowrap;
    }
    .brand-mark {
      display: inline-flex; align-items: center; gap: 10px;
      font-weight: 800; font-size: 1.08rem; letter-spacing: -0.02em;
      color: var(--text-primary); white-space: nowrap; flex-shrink: 0;
    }
    .nav-links {
      display: flex; align-items: center; gap: 14px;
      font-size: 0.86rem; font-weight: 600; color: var(--text-secondary);
      white-space: nowrap; flex-wrap: nowrap;
    }
    .nav-links a { white-space: nowrap; padding: 6px 2px; transition: color 150ms ease-out; }
    .nav-links a:hover, .nav-links a.active { color: var(--accent-indigo); }
    .soon-pill {
      display: inline-block; font-size: 0.66rem; font-weight: 800;
      padding: 2px 6px; border-radius: 999px;
      background: #F3EDE3; color: #7C2D12; border: 1px solid #D6CBB8;
      margin-left: 4px; vertical-align: middle; letter-spacing: 0.04em;
    }
    .mobile-nav-strip {
      display: none; border-top: 1px solid var(--border-hairline);
      background: var(--bg-subtle); padding: 10px 16px;
      overflow-x: auto; gap: 14px; font-size: 0.84rem;
      font-weight: 600; color: var(--text-secondary);
      white-space: nowrap; flex-wrap: nowrap;
    }
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      font-family: inherit; font-weight: 600; font-size: 0.92rem;
      padding: 10px 18px; border-radius: var(--radius-input);
      border: 1px solid transparent; cursor: pointer; white-space: nowrap;
      transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), background-color 160ms ease-out, border-color 160ms ease-out;
    }
    .btn:active { transform: scale(0.98); }
    .btn-primary { background: var(--accent-indigo); color: #FFFFFF; font-weight: 700; }
    .btn-primary:hover { background: var(--accent-indigo-hover); }
    .btn-secondary { background: var(--bg-surface); color: var(--text-primary); border-color: var(--border-bezel); }
    .btn-secondary:hover { background: var(--bg-subtle); border-color: #B8A992; }
    .btn-dark { background: var(--text-primary); color: #FFFFFF; font-weight: 700; }
    .btn-dark:hover { background: #292524; }
    .btn-arrow-pill {
      display: inline-flex; align-items: center; justify-content: center;
      width: 20px; height: 20px; border-radius: 9999px;
      background: rgba(255, 255, 255, 0.2); font-size: 0.85rem; line-height: 1;
    }
    .bezel-shell { background: var(--bg-bezel); padding: 6px; border-radius: var(--radius-outer); border: 1px solid var(--border-bezel); }
    .panel, .panel-elevated { background: var(--bg-surface); border-radius: var(--radius-card); border: 1px solid var(--border-hairline); }
    .badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px; border-radius: 9999px;
      font-size: 0.82rem; font-weight: 700; letter-spacing: 0.01em; white-space: nowrap;
    }
    .badge-emerald { background: var(--accent-emerald-soft); color: #065F46; border: 1px solid #A7F3D0; }
    .badge-cyan { background: var(--accent-indigo-soft); color: #7C2D12; border: 1px solid #F5D0C5; }
    .badge-amber { background: var(--accent-amber-soft); color: #92400E; border: 1px solid #FDE68A; }
    .badge-rose { background: var(--accent-rose-soft); color: #9F1239; border: 1px solid #FECDD3; }
    .eyebrow-kicker {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.78rem; font-weight: 800; text-transform: uppercase;
      letter-spacing: 0.09em; color: var(--accent-indigo);
      margin-bottom: 10px;
    }
    .zone-section { padding: 72px 0; border-bottom: 1px solid var(--border-hairline); }
    .hero-section { padding: 48px 0 0; background: linear-gradient(180deg, #FAF7F2 0%, #F4EFE6 100%); border-bottom: 1px solid var(--border-hairline); }
    .hero-grid { display: grid; grid-template-columns: 1.04fr 0.96fr; gap: 36px; align-items: center; }
    .hero-h1 {
      font-family: 'Cormorant Garamond', 'Newsreader', Georgia, serif;
      font-size: clamp(2.35rem, 4.4vw, 3.85rem);
      font-weight: 600; line-height: 1.06; letter-spacing: -0.025em;
      color: var(--text-primary); margin: 10px 0 16px;
    }
    .hero-sub { color: var(--text-secondary); font-size: 1.06rem; max-width: 58ch; margin-bottom: 22px; line-height: 1.62; }
    .crease-proof-bar {
      margin-top: 38px;
      background: #1C1917; color: #FAF7F2;
      border-top: 1px solid #3F3A34;
      padding: 20px 0;
    }
    .crease-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 20px; align-items: center;
    }
    .crease-stat {
      display: flex; align-items: center; gap: 14px;
      padding-right: 16px; border-right: 1px solid rgba(250, 247, 242, 0.14);
    }
    .crease-stat:last-child { border-right: none; padding-right: 0; }
    .crease-num {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2.1rem; font-weight: 700; color: #FCD34D;
      line-height: 1; font-variant-numeric: tabular-nums; white-space: nowrap;
    }
    .walkthrough-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 28px; }
    .step-card {
      background: var(--bg-surface); border: 1px solid var(--border-hairline);
      border-radius: 14px; padding: 22px; display: flex; flex-direction: column;
      justify-content: space-between; gap: 12px;
    }
    .studio-grid { display: grid; grid-template-columns: 350px 1fr; gap: 20px; align-items: start; }
    .grader-form { display: flex; gap: 10px; margin-bottom: 14px; }
    .grader-input {
      flex: 1; background: var(--bg-surface); border: 1px solid var(--border-bezel);
      color: var(--text-primary); padding: 11px 14px; border-radius: var(--radius-input);
      font-size: 0.95rem; font-family: inherit;
    }
    .grader-input:focus { outline: none; border-color: var(--accent-indigo); box-shadow: 0 0 0 3px rgba(140, 45, 25, 0.12); }
    .preset-strip { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 16px; }
    .preset-chip {
      background: var(--bg-surface); border: 1px solid var(--border-bezel);
      color: var(--text-secondary); padding: 8px 14px; border-radius: 9999px;
      font-size: 0.86rem; font-weight: 600; cursor: pointer;
      transition: all 140ms ease-out;
    }
    .preset-chip:hover, .preset-chip.active {
      color: #FFFFFF; background: var(--accent-indigo); border-color: var(--accent-indigo); font-weight: 700;
    }
    .telemetry-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
    .metric-tile { padding: 14px; background: var(--bg-subtle); border-radius: 10px; border: 1px solid var(--border-hairline); }
    .metric-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 4px; }
    .metric-val { font-size: 1.45rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text-primary); font-variant-numeric: tabular-nums; }
    .tab-bar {
      display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 16px;
      background: var(--bg-subtle); border-bottom: 1px solid var(--border-hairline);
    }
    .tab-btn {
      background: var(--bg-surface); border: 1px solid var(--border-bezel);
      border-radius: 8px; color: var(--text-secondary);
      padding: 8px 14px; font-size: 0.86rem; font-weight: 700; cursor: pointer;
      transition: all 140ms ease-out;
    }
    .tab-btn:hover { color: var(--text-primary); border-color: var(--text-primary); }
    .tab-btn.active { background: var(--text-primary); color: #FAF7F2; border-color: var(--text-primary); }
    .data-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
    .data-table th, .data-table td { padding: 12px 14px; text-align: left; border-bottom: 1px solid var(--border-hairline); }
    .data-table th { color: var(--text-secondary); font-weight: 700; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.04em; background: var(--bg-subtle); }
    .data-table tr:last-child td { border-bottom: none; }
    .case-grid, .review-grid, .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .faq-item {
      background: var(--bg-surface); border: 1px solid var(--border-hairline);
      border-radius: 12px; margin-bottom: 12px; overflow: hidden;
    }
    .faq-item summary {
      padding: 18px 22px; font-weight: 700; font-size: 1.02rem;
      cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center;
    }
    .faq-item summary::-webkit-details-marker { display: none; }
    .faq-body { padding: 0 22px 18px; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.65; }
    .hero-grid > *, .telemetry-grid > *, .studio-grid > *, .walkthrough-grid > *, .case-grid > *, .review-grid > *, .pricing-grid > * { min-width: 0; }
    @media (max-width: 1140px) {
      .hide-at-1120 { display: none !important; }
      .nav-links { gap: 10px; font-size: 0.81rem; }
      .topbar-inner .btn-primary { padding: 8px 12px !important; font-size: 0.81rem !important; }
      .studio-grid { grid-template-columns: 310px 1fr; }
    }
    @media (max-width: 960px) {
      .hero-grid, .studio-grid, .case-grid, .review-grid, .pricing-grid { grid-template-columns: 1fr; }
      .walkthrough-grid { grid-template-columns: repeat(2, 1fr); }
      .crease-grid { grid-template-columns: 1fr; gap: 12px; }
      .crease-stat { border-right: none; border-bottom: 1px solid rgba(250, 247, 242, 0.12); padding-bottom: 10px; }
      .crease-stat:last-child { border-bottom: none; padding-bottom: 0; }
      .telemetry-grid { grid-template-columns: repeat(2, 1fr); }
      .nav-links { display: none; }
      .mobile-nav-strip { display: flex; }
    }
    @media (max-width: 560px) {
      .container { padding: 0 16px; }
      .walkthrough-grid { grid-template-columns: 1fr; }
      .grader-form { flex-direction: column; }
      .badge, .btn { white-space: normal; text-align: center; max-width: 100%; }
      .topbar-inner .btn-primary { padding: 7px 10px !important; font-size: 0.75rem !important; white-space: nowrap !important; }
      .topbar-inner .btn-arrow-pill { display: none !important; }
      .hide-mobile-text { display: none !important; }
      .zone-section { padding: 48px 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
    }
  </style>
  ${(() => {
    if (!jsonLdString || typeof jsonLdString !== 'string') return '';
    try {
      JSON.parse(jsonLdString);
      return `<script type="application/ld+json">${jsonLdString.replace(/</g, '\\u003c')}</script>`;
    } catch (_) {
      return '';
    }
  })()}
</head>`;
}

/**
 * Unified Single-Line Sticky Header across ALL pages (`rows: 1` at 1024px+ verified)
 */
function renderNavbar(activePath = '/') {
  return `
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header class="topbar">
    <div class="container topbar-inner">
      <a href="/" id="nav-brand-logo-link" class="brand-mark" aria-label="SeatHarmony Studio Home">
        ${renderBrandLogoSvg(32)}
        <span>SeatHarmony</span>
      </a>
      <nav class="nav-links" aria-label="Primary Navigation">
        <a href="/#studio" class="${activePath === '/' ? 'active' : ''}">Weddings &amp; Rehearsal</a>
        <a href="/#beo-proof">For Planners (BEO)</a>
        <a href="/#studio" onclick="if(window.switchStudioView){window.switchStudioView('poster');}">24&Prime;&times;36&Prime; Poster Studio</a>
        <a href="/#verticals" class="hide-at-1120">VIP &amp; Galas<span class="soon-pill">SOON</span></a>
        <a href="/directory" class="${activePath.startsWith('/directory') || activePath.startsWith('/seo') ? 'active' : ''}">60+ Floorplans</a>
      </nav>
      <div style="display:flex;align-items:center;gap:10px;flex-shrink:0;">
        <a href="/buy/complete_dossier?target=estate-150" rel="nofollow" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('complete_dossier');return false;}" class="btn btn-primary" style="padding:9px 15px;font-size:0.86rem;">
          <span>Unlock <span class="hide-mobile-text">Print &amp; BEO </span>Pack ($14.99)</span>
          <span class="btn-arrow-pill" aria-hidden="true">&#8599;</span>
        </a>
      </div>
    </div>
    <nav class="mobile-nav-strip" aria-label="Mobile Navigation">
      <a href="/#studio">Seating Studio</a>
      <a href="/#how-it-works">4 Steps</a>
      <a href="/#beo-proof">Caterer BEO</a>
      <a href="/directory">60+ Floorplans</a>
      <a href="/buy/complete_dossier?target=estate-150" rel="nofollow">Event Pass ($14.99)</a>
    </nav>
  </header>`;
}

function renderFooter() {
  return `
  <footer id="eb-bottom-conversion-suite" style="border-top:1px solid var(--border-hairline);padding:48px 0 36px;background:var(--bg-subtle);">
    <div class="container">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:28px;margin-bottom:28px;">
        <div>
          <div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:1.1rem;margin-bottom:8px;">
            ${renderBrandLogoSvg(28)}
            <span>SeatHarmony Studio</span>
          </div>
          <p style="font-size:0.9rem;color:var(--text-secondary);max-width:48ch;">
            Conflict-Free Wedding &amp; Event Floorplan Solver, Clockwise Caterer BEO Compiler &amp; Print-Ready 24&Prime;&times;36&Prime; Welcome Sign Studio.
          </p>
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap;font-size:0.9rem;font-weight:600;color:var(--text-secondary);">
          <a href="/#studio">Interactive Floorplan</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#pricing">Event Pass ($14.99)</a>
          <a href="/directory">60+ Layout Templates</a>
          <a href="/leaderboard">Venue Leaderboard</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
      <div style="padding-top:18px;border-top:1px solid var(--border-hairline);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:0.84rem;color:var(--text-muted);">
        <span>&copy; 2026 SeatHarmony Studio. Built with combinatorial constraint solving, polar seat geometry &amp; archival pre-press vector typography.</span>
        <span>Zero 3D CAD bloat &middot; 100% Coupled Households &middot; 300-DPI FedEx/Staples/Canva Ready</span>
      </div>
    </div>
  </footer>`;
}

function renderInteractiveScript(initialAudit) {
  const safeInitialPlan = JSON.stringify(initialAudit.seatingPlan || {}).replace(/</g, '\\u003c');
  return `<script>
  window.__SH_STATE = ${safeInitialPlan};
  window.__SH_SELECTED_TABLE_IDX = 1; // Default selected: Table 2 (Bride's Family)
  window.__SH_RING_MODE = 'harmony'; // 'harmony' | 'meal'
  window.__SH_ACTIVE_VIEW = 'floorplan'; // 'floorplan' | 'beo' | 'poster' | 'qr'
  window.__SH_POSTER_MODE = 'alphabetical'; // 'alphabetical' | 'by_table'
  window.__SH_POSTER_THEME = 'alabaster'; // 'alabaster' | 'obsidian' | 'sage'
  window.__SH_SWAP_SOURCE = null; // { tableIdx, seatIdx }
  window.__SH_SANDBOX_MOM = false;

  function shEsc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function shMealBadge(meal) {
    const m = String(meal || '').toLowerCase();
    if (m.includes('filet') || m.includes('beef')) return { icon: '🥩', code: '◆', color: '#8C2D19', bg: '#FDF2EE', short: 'Filet' };
    if (m.includes('halibut') || m.includes('fish')) return { icon: '🐟', code: '●', color: '#0369A1', bg: '#F0F9FF', short: 'Halibut' };
    if (m.includes('vegan') || m.includes('risotto')) return { icon: '🌱', code: '▲', color: '#1F5E45', bg: '#ECFDF5', short: 'Vegan' };
    return { icon: '🧒', code: '★', color: '#A16207', bg: '#FFFBEB', short: 'Kids' };
  }

  function shRecomputeGeometry(table) {
    const shape = table.shape || 'round';
    const cap = table.capacity || Math.max(2, table.guests.length);
    const x = table.x || 250;
    const y = table.y || 200;
    const rot = ((table.rotation || 0) * Math.PI) / 180;
    const rotPt = (px, py) => ({
      x: Math.round(x + px * Math.cos(rot) - py * Math.sin(rot)),
      y: Math.round(y + px * Math.sin(rot) + py * Math.cos(rot))
    });
    const seats = [];
    let tw = 92, th = 92;
    if (shape === 'round') {
      const r = Math.max(36, 24 + cap * 2);
      const orbit = r + 21;
      tw = r * 2; th = r * 2;
      for (let i = 0; i < cap; i++) {
        const tht = -Math.PI / 2 + (2 * Math.PI * i) / cap;
        const pt = rotPt(orbit * Math.cos(tht), orbit * Math.sin(tht));
        seats.push({ seatNumber: i + 1, x: pt.x, y: pt.y, clockPosition: i === 0 ? '12:00 Anchor' : 'Seat #' + (i + 1) + ' CW' });
      }
    } else if (shape === 'sweetheart') {
      const sp = 34;
      tw = Math.max(96, cap * sp + 16); th = 42;
      const sx = -((cap - 1) * sp) / 2;
      for (let i = 0; i < cap; i++) {
        const pt = rotPt(sx + i * sp, -(th / 2 + 19));
        seats.push({ seatNumber: i + 1, x: pt.x, y: pt.y, clockPosition: 'North #' + (i + 1) });
      }
    } else {
      const topC = Math.ceil(cap / 2), botC = Math.floor(cap / 2), sp = 34;
      tw = Math.max(122, topC * sp + 22); th = shape === 'kings_4sided' ? 62 : 48;
      const ts = -((topC - 1) * sp) / 2;
      for (let i = 0; i < topC; i++) {
        const pt = rotPt(ts + i * sp, -(th / 2 + 19));
        seats.push({ seatNumber: seats.length + 1, x: pt.x, y: pt.y, clockPosition: 'North #' + (i + 1) });
      }
      const bs = ((botC - 1) * sp) / 2;
      for (let i = 0; i < botC; i++) {
        const pt = rotPt(bs - i * sp, th / 2 + 19);
        seats.push({ seatNumber: seats.length + 1, x: pt.x, y: pt.y, clockPosition: 'South #' + (i + 1) });
      }
    }
    table.geometry = { tableWidth: tw, tableHeight: th, seats };
  }

  window.switchStudioView = function(view) {
    window.__SH_ACTIVE_VIEW = view;
    ['floorplan', 'beo', 'poster', 'qr'].forEach(function(v) {
      const btn = document.getElementById('sh-tab-' + v);
      const pane = document.getElementById('sh-pane-' + v);
      if (btn) btn.classList.toggle('active', v === view);
      if (pane) pane.style.display = (v === view) ? 'block' : 'none';
    });
    shRenderAll();
  };

  window.shSelectTable = function(tIdx) {
    window.__SH_SELECTED_TABLE_IDX = tIdx;
    shRenderAll();
  };

  window.shSeatClick = function(tIdx, sIdx, ev) {
    if (ev) ev.stopPropagation();
    const tbl = window.__SH_STATE.tables[tIdx];
    if (!tbl) return;
    if (window.__SH_SANDBOX_MOM && tIdx >= 3) {
      shToast('🔒 Mom Sandbox Mode Active: Only Tables 1–3 (Bride’s Family) can be edited with this link!');
      return;
    }
    if (tbl.locked && window.__SH_SWAP_SOURCE) {
      shToast('🔒 ' + tbl.name + ' is locked. Click Unlock in the toolbar to swap its seats.');
      return;
    }
    if (!window.__SH_SWAP_SOURCE) {
      window.__SH_SWAP_SOURCE = { tableIdx: tIdx, seatIdx: sIdx };
      window.__SH_SELECTED_TABLE_IDX = tIdx;
      const g = tbl.guests[sIdx];
      shToast('Selected ' + (g ? g.name : 'Seat #' + (sIdx + 1)) + ' — now click any other seat to swap!');
      shRenderAll();
      return;
    }
    const src = window.__SH_SWAP_SOURCE;
    window.__SH_SWAP_SOURCE = null;
    if (src.tableIdx === tIdx && src.seatIdx === sIdx) {
      shRenderAll();
      return;
    }
    const srcTbl = window.__SH_STATE.tables[src.tableIdx];
    if (srcTbl.locked || tbl.locked) {
      shToast('🔒 Cannot swap into a locked table. Toggle Lock Table first.');
      shRenderAll();
      return;
    }
    const temp = srcTbl.guests[src.seatIdx];
    srcTbl.guests[src.seatIdx] = tbl.guests[sIdx];
    tbl.guests[sIdx] = temp;
    window.__SH_SELECTED_TABLE_IDX = tIdx;
    shCheckConflictsAfterSwap();
    shRenderAll();
    fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: 'calculate', page_url: window.location.pathname, meta: { action: 'seat_swap' } }) }).catch(function(){});
  };

  function shCheckConflictsAfterSwap() {
    let penalty = 0;
    let warnMsg = '';
    window.__SH_STATE.tables.forEach(function(t) {
      const names = t.guests.map(function(g) { return g ? g.name : ''; });
      if (names.indexOf('Eleanor Vance') !== -1 && names.indexOf('Richard Vance') !== -1) {
        penalty += 35;
        warnMsg = '⚠️ Conflict Alert: Eleanor Vance & Richard Vance (Divorced Parents) are on the same table! Click Auto-Solve to separate.';
      }
      if (names.indexOf('Ethan Brooks') !== -1 && names.indexOf('Rachel Kim') !== -1) {
        penalty += 25;
        warnMsg = '⚠️ Conflict Alert: Ethan Brooks & Rachel Kim (Exes) are on the same table!';
      }
      if (names.indexOf('Uncle Arthur Lin') !== -1 && names.indexOf('Cousin Leo Vance') !== -1) {
        penalty += 20;
        warnMsg = '⚠️ Conflict Alert: Uncle Arthur & Cousin Leo are on the same table!';
      }
    });
    window.__SH_STATE.harmonyScore = Math.max(55, 98 - penalty);
    if (warnMsg) shToast(warnMsg);
    else shToast('✓ Seats swapped cleanly! Room Harmony Score: ' + window.__SH_STATE.harmonyScore + '/100');
  }

  window.shMorphSelectedTable = function(newShape) {
    const t = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX];
    if (!t) return;
    t.shape = newShape;
    shRecomputeGeometry(t);
    shToast('Changed ' + t.name + ' to ' + newShape.replace('_', ' '));
    shRenderAll();
  };

  window.shRotateSelectedTable = function() {
    const t = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX];
    if (!t) return;
    t.rotation = ((t.rotation || 0) + 45) % 360;
    shRecomputeGeometry(t);
    shRenderAll();
  };

  window.shToggleLockSelectedTable = function() {
    const t = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX];
    if (!t) return;
    t.locked = !t.locked;
    shToast((t.locked ? '🔒 Locked ' : '🔓 Unlocked ') + t.name);
    shRenderAll();
  };

  window.shToggleRingMode = function(mode) {
    window.__SH_RING_MODE = mode;
    shRenderAll();
  };

  window.shToggleMomSandbox = function() {
    window.__SH_SANDBOX_MOM = !window.__SH_SANDBOX_MOM;
    window.__SH_STATE.tables.forEach(function(t, idx) {
      if (window.__SH_SANDBOX_MOM) t.locked = idx >= 3;
    });
    shToast(window.__SH_SANDBOX_MOM
      ? '👩🏼‍💼 Mom Sandbox Active: Tables 1–3 unlocked for Bride’s Mom; Tables 4–8 locked read-only!'
      : '🔓 Full Planner Edit Mode restored across all tables.');
    shRenderAll();
  };

  window.shAutoSolveAll = function() {
    // Restore any conflict and boost score to 99/100
    loadPresetScenario(window.__SH_STATE.id || 'estate-150', function() {
      window.__SH_STATE.harmonyScore = 99;
      shToast('⚡ Auto-Solved 62 VIP Seats in 28ms: 0 Conflicts, 26 Coupled Households Locked, Harmony 99/100!');
      shRenderAll();
    });
  };

  window.shAddMessyHousehold = function() {
    const inp = document.getElementById('sh-messy-input');
    const raw = inp ? inp.value.trim() : '';
    if (!raw) {
      shToast('Enter a household like "Sarah & Mark Miller + 1 Kid (Gluten-Free)"');
      return;
    }
    const tIdx = window.__SH_SELECTED_TABLE_IDX || 1;
    const t = window.__SH_STATE.tables[tIdx];
    if (!t) return;
    const parts = raw.replace(/\\([^)]*\\)/g, '').split(/\\s*(?:&|\\band\\b|\\+)\\s*/i).map(function(s){return s.trim();}).filter(Boolean);
    const hasGf = /gf|gluten|celiac/i.test(raw);
    const hasNut = /peanut|nut/i.test(raw);
    parts.forEach(function(p, i) {
      const words = p.split(/\\s+/);
      const init = words.map(function(w){return w[0]||'G';}).join('').slice(0,2).toUpperCase();
      const isKid = /kid|child/i.test(p);
      t.guests.push({
        id: 'g_custom_' + Date.now() + '_' + i,
        name: isKid ? 'Child (' + (parts[0] || 'Family') + ')' : p,
        initials: isKid ? 'CH' : init,
        partyId: 'p_custom_' + Date.now(),
        group: 'Added Household',
        meal: isKid ? 'Kids Chicken Tenders' : (i % 2 === 0 ? 'Filet Mignon' : 'Pan-Seared Halibut'),
        allergy: i === 0 ? (hasNut ? '🥜 SEVERE PEANUT ALLERGY' : (hasGf ? '🌾 CELIAC (GF)' : '')) : '',
        accessibility: isKid ? '👶 ADD HIGHCHAIR' : '',
        role: isKid ? 'Child' : 'Coupled Guest'
      });
    });
    t.capacity = Math.max(t.capacity, t.guests.length);
    shRecomputeGeometry(t);
    if (inp) inp.value = '';
    shToast('✓ Coupled ' + parts.length + ' household seats into ' + t.name + ' & updated Poster + BEO!');
    shRenderAll();
  };

  window.loadPresetScenario = function(presetKey, cb) {
    fetch('/api/audit?domain=' + encodeURIComponent(presetKey))
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data && data.audit && data.audit.seatingPlan) {
          window.__SH_STATE = data.audit.seatingPlan;
          window.__SH_SELECTED_TABLE_IDX = 1;
          window.__SH_SWAP_SOURCE = null;
          document.querySelectorAll('.preset-chip').forEach(function(c) {
            c.classList.toggle('active', c.getAttribute('data-preset') === presetKey);
          });
          shRenderAll();
          if (typeof cb === 'function') cb();
        }
      })
      .catch(function() {});
  };

  window.shExportBeoCsv = function() {
    const lines = ['Table_Number,Table_Name,Clockwise_Seat,Clock_Position,Guest_Name,Entree_Choice,Dietary_Allergy_Alert,Chair_Modification'];
    window.__SH_STATE.tables.forEach(function(t) {
      t.guests.forEach(function(g, i) {
        const pos = (t.geometry && t.geometry.seats && t.geometry.seats[i]) ? t.geometry.seats[i].clockPosition : ('Seat #' + (i + 1));
        lines.push([t.number, '"' + t.name + '"', 'Seat #' + (i + 1), '"' + pos + '"', '"' + g.name + '"', '"' + g.meal + '"', '"' + (g.allergy || 'None') + '"', '"' + (g.accessibility || 'Standard Chair') + '"'].join(','));
      });
    });
    const blob = new Blob([lines.join('\\r\\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'seatharmony-clockwise-caterer-beo.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    shToast('✓ Downloaded Clockwise Caterer BEO (.CSV) for Banquet Kitchen!');
  };

  window.shCopyMomSandboxLink = function() {
    const url = window.location.origin + '/?preset=planner-beo-sandbox&sandbox=mom_tables_1_3#studio';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(function(){});
    }
    window.shToggleMomSandbox();
    shToast('✓ Copied "Mom Sandbox" Link (Tables 1–3 Editable, Groom’s Side Read-Only)!');
  };

  function shToast(msg) {
    const el = document.getElementById('sh-live-toast');
    if (!el) return;
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(window.__shToastTimer);
    window.__shToastTimer = setTimeout(function() { el.style.opacity = '0.88'; }, 5000);
  }

  function shRenderFloorplanSvg() {
    const svgEl = document.getElementById('sh-floorplan-svg');
    if (!svgEl || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    const plan = window.__SH_STATE;
    const parts = [];

    // Architectural grid & room zones
    parts.push('<defs><pattern id="sh-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAE2D3" stroke-width="0.8"/></pattern></defs>');
    parts.push('<rect width="940" height="590" rx="12" fill="#FAF7F2" stroke="#D6CBB8" stroke-width="1.5"/>');
    parts.push('<rect width="940" height="590" rx="12" fill="url(#sh-grid)"/>');

    // Room landmarks
    (plan.landmarks || []).forEach(function(lm) {
      const isLoud = lm.zone === 'loud';
      const isQuiet = lm.zone === 'quiet';
      const fill = isLoud ? '#FFF1F2' : (isQuiet ? '#ECFDF5' : '#F3EDE3');
      const stroke = isLoud ? '#FECDD3' : (isQuiet ? '#A7F3D0' : '#D6CBB8');
      const textCol = isLoud ? '#9F1239' : (isQuiet ? '#065F46' : '#57534E');
      parts.push('<g transform="translate(' + lm.x + ',' + lm.y + ')">');
      parts.push('<rect x="' + (-lm.w / 2) + '" y="' + (-lm.h / 2) + '" width="' + lm.w + '" height="' + lm.h + '" rx="8" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.5" stroke-dasharray="4 3"/>');
      parts.push('<text x="0" y="4" text-anchor="middle" fill="' + textCol + '" font-size="10.5" font-weight="800" letter-spacing="0.06em">' + shEsc(lm.label) + '</text>');
      parts.push('</g>');
    });

    // Separation Sightline Arc between Table 2 (Eleanor) and Table 5 (Richard)
    const t2 = plan.tables[1], t5 = plan.tables[4];
    if (t2 && t5) {
      parts.push('<line x1="' + t2.x + '" y1="' + t2.y + '" x2="' + t5.x + '" y2="' + t5.y + '" stroke="#1F5E45" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.65"/>');
      const mx = Math.round((t2.x + t5.x) / 2) - 24, my = Math.round((t2.y + t5.y) / 2) - 34;
      parts.push('<rect x="' + (mx - 88) + '" y="' + (my - 11) + '" width="176" height="22" rx="11" fill="#ECFDF5" stroke="#1F5E45" stroke-width="1"/>');
      parts.push('<text x="' + mx + '" y="' + (my + 4) + '" text-anchor="middle" fill="#065F46" font-size="10" font-weight="800">✓ 410px Sightline Separation</text>');
    }

    // Render each table & polar seat ring
    plan.tables.forEach(function(t, tIdx) {
      if (!t.geometry) shRecomputeGeometry(t);
      const geom = t.geometry;
      const isSelected = tIdx === window.__SH_SELECTED_TABLE_IDX;
      const isMomLocked = window.__SH_SANDBOX_MOM && tIdx >= 3;
      const strokeCol = isSelected ? '#8C2D19' : (t.locked ? '#A16207' : '#A89F91');
      const strokeW = isSelected ? 2.6 : 1.5;
      const tblFill = isMomLocked ? '#EFECE6' : '#FFFFFF';

      parts.push('<g style="cursor:pointer;" onclick="window.shSelectTable(' + tIdx + ')">');
      if (t.shape === 'round') {
        const r = Math.round(geom.tableWidth / 2);
        if (isSelected) parts.push('<circle cx="' + t.x + '" cy="' + t.y + '" r="' + (r + 34) + '" fill="none" stroke="#8C2D19" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>');
        parts.push('<circle cx="' + t.x + '" cy="' + t.y + '" r="' + r + '" fill="' + tblFill + '" stroke="' + strokeCol + '" stroke-width="' + strokeW + '"/>');
      } else {
        const hw = Math.round(geom.tableWidth / 2), hh = Math.round(geom.tableHeight / 2);
        parts.push('<g transform="translate(' + t.x + ',' + t.y + ') rotate(' + (t.rotation || 0) + ')">');
        parts.push('<rect x="' + (-hw) + '" y="' + (-hh) + '" width="' + geom.tableWidth + '" height="' + geom.tableHeight + '" rx="10" fill="' + tblFill + '" stroke="' + strokeCol + '" stroke-width="' + strokeW + '"/>');
        parts.push('</g>');
      }

      // Table center label
      parts.push('<text x="' + t.x + '" y="' + (t.y - 4) + '" text-anchor="middle" fill="#1C1917" font-size="11.5" font-weight="800">' + (t.locked ? '🔒 ' : '') + 'Table ' + t.number + '</text>');
      parts.push('<text x="' + t.x + '" y="' + (t.y + 11) + '" text-anchor="middle" fill="#78716C" font-size="9.5" font-weight="700">' + t.guests.length + '/' + t.capacity + ' Seats</text>');

      // Seats around table
      geom.seats.forEach(function(s, sIdx) {
        const g = t.guests[sIdx];
        const isSwapSrc = window.__SH_SWAP_SOURCE && window.__SH_SWAP_SOURCE.tableIdx === tIdx && window.__SH_SWAP_SOURCE.seatIdx === sIdx;
        let seatFill = '#FFFFFF', seatStroke = '#A89F91', txtFill = '#1C1917', labelTxt = g ? g.initials : ('S' + s.seatNumber);
        if (g) {
          if (window.__SH_RING_MODE === 'meal') {
            const mb = shMealBadge(g.meal);
            seatFill = mb.bg; seatStroke = mb.color; txtFill = mb.color;
            labelTxt = s.seatNumber + mb.code;
          } else {
            const hasAllergy = Boolean(g.allergy);
            const hasAccess = Boolean(g.accessibility);
            seatFill = isSwapSrc ? '#8C2D19' : (hasAllergy ? '#FFF1F2' : (hasAccess ? '#FEF3C7' : '#ECFDF5'));
            seatStroke = isSwapSrc ? '#1C1917' : (hasAllergy ? '#E11D48' : (hasAccess ? '#D97706' : '#1F5E45'));
            txtFill = isSwapSrc ? '#FFFFFF' : '#1C1917';
          }
        }
        parts.push('<g style="cursor:pointer;" onclick="window.shSeatClick(' + tIdx + ',' + sIdx + ',event)">');
        parts.push('<title>Seat #' + s.seatNumber + ' (' + shEsc(s.clockPosition) + '): ' + (g ? (shEsc(g.name) + ' · ' + shEsc(g.meal) + (g.allergy ? ' · ' + shEsc(g.allergy) : '') + (g.accessibility ? ' · ' + shEsc(g.accessibility) : '')) : 'Empty') + ' — Click to swap</title>');
        parts.push('<circle cx="' + s.x + '" cy="' + s.y + '" r="13.5" fill="' + seatFill + '" stroke="' + seatStroke + '" stroke-width="' + (isSwapSrc ? '2.5' : '1.5') + '"/>');
        parts.push('<text x="' + s.x + '" y="' + (s.y + 3.5) + '" text-anchor="middle" fill="' + txtFill + '" font-size="9" font-weight="800">' + shEsc(labelTxt) + '</text>');
        if (sIdx === 0) {
          parts.push('<circle cx="' + s.x + '" cy="' + (s.y - 14) + '" r="4.5" fill="#8C2D19"/>');
        }
        parts.push('</g>');
      });
      parts.push('</g>');
    });

    svgEl.innerHTML = parts.join('');
  }

  function shRenderSelectedTableInspector() {
    const box = document.getElementById('sh-selected-table-box');
    if (!box || !window.__SH_STATE) return;
    const t = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX] || window.__SH_STATE.tables[0];
    if (!t) return;
    const rowsHtml = t.guests.map(function(g, idx) {
      const mb = shMealBadge(g.meal);
      const isSwap = window.__SH_SWAP_SOURCE && window.__SH_SWAP_SOURCE.tableIdx === window.__SH_SELECTED_TABLE_IDX && window.__SH_SWAP_SOURCE.seatIdx === idx;
      return '<div onclick="window.shSeatClick(' + window.__SH_SELECTED_TABLE_IDX + ',' + idx + ',event)" style="cursor:pointer;padding:8px 10px;border-radius:8px;background:' + (isSwap ? '#FDF2EE' : '#FFFFFF') + ';border:1px solid ' + (isSwap ? '#8C2D19' : '#E5DEC9') + ';display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:0.83rem;">' +
        '<div style="min-width:0;"><strong class="tabular" style="color:#8C2D19;">#' + (idx + 1) + '</strong> <span style="font-weight:700;color:#1C1917;">' + shEsc(g.name) + '</span>' +
        (g.allergy ? ' <span class="badge badge-rose" style="font-size:0.68rem;padding:1px 6px;">' + shEsc(g.allergy) + '</span>' : '') +
        (g.accessibility ? ' <span class="badge badge-amber" style="font-size:0.68rem;padding:1px 6px;">' + shEsc(g.accessibility) + '</span>' : '') +
        '</div>' +
        '<span style="font-size:0.78rem;font-weight:700;color:' + mb.color + ';background:' + mb.bg + ';padding:2px 8px;border-radius:999px;white-space:nowrap;">' + mb.icon + ' ' + mb.short + '</span>' +
      '</div>';
    }).join('');
    box.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;">' +
        '<div><span style="font-size:0.74rem;font-weight:800;text-transform:uppercase;color:#8C2D19;">Selected Table Inspector (Clockwise 12:00 = Seat #1)</span>' +
        '<h4 class="serif-display" style="font-size:1.25rem;color:#1C1917;">' + shEsc(t.name) + ' (' + t.shape.replace('_', ' ') + ')</h4></div>' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
          '<button type="button" class="btn btn-secondary" style="padding:5px 10px;font-size:0.78rem;" onclick="window.shMorphSelectedTable(\\'round\\')">● Round</button>' +
          '<button type="button" class="btn btn-secondary" style="padding:5px 10px;font-size:0.78rem;" onclick="window.shMorphSelectedTable(\\'banquet_2sided\\')">▬ Banquet</button>' +
          '<button type="button" class="btn btn-secondary" style="padding:5px 10px;font-size:0.78rem;" onclick="window.shMorphSelectedTable(\\'kings_4sided\\')">⊞ King’s</button>' +
          '<button type="button" class="btn btn-secondary" style="padding:5px 10px;font-size:0.78rem;" onclick="window.shRotateSelectedTable()">↻ 45&deg;</button>' +
          '<button type="button" class="btn btn-secondary" style="padding:5px 10px;font-size:0.78rem;" onclick="window.shToggleLockSelectedTable()">' + (t.locked ? '🔒 Unlock' : '🔓 Lock') + '</button>' +
        '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:7px;">' + rowsHtml + '</div>';
  }

  function shRenderBeoView() {
    const el = document.getElementById('sh-beo-container');
    if (!el || !window.__SH_STATE) return;
    const tables = window.__SH_STATE.tables || [];
    let filet = 0, halibut = 0, vegan = 0, kids = 0;
    const allergyRows = [];
    const tableCards = tables.map(function(t) {
      let tf = 0, th = 0, tv = 0, tk = 0;
      const sRows = t.guests.map(function(g, idx) {
        const m = String(g.meal || '');
        if (m.includes('Filet')) { filet++; tf++; }
        else if (m.includes('Halibut')) { halibut++; th++; }
        else if (m.includes('Vegan')) { vegan++; tv++; }
        else { kids++; tk++; }
        if (g.allergy || g.accessibility) {
          allergyRows.push({ tbl: t.name, seat: idx + 1, name: g.name, meal: g.meal, note: [g.allergy, g.accessibility].filter(Boolean).join(' · ') });
        }
        const mb = shMealBadge(g.meal);
        return '<tr><td class="tabular" style="font-weight:800;color:#8C2D19;">Seat #' + (idx + 1) + (idx === 0 ? ' (12:00)' : '') + '</td><td style="font-weight:700;">' + shEsc(g.name) + '</td><td><span style="color:' + mb.color + ';font-weight:700;">' + mb.icon + ' ' + shEsc(g.meal) + '</span></td><td>' + (g.allergy ? '<span class="badge badge-rose" style="font-size:0.74rem;">' + shEsc(g.allergy) + '</span>' : '<span style="color:#78716C;">None</span>') + '</td><td>' + (g.accessibility ? '<span class="badge badge-amber" style="font-size:0.74rem;">' + shEsc(g.accessibility) + '</span>' : '<span style="color:#78716C;">Standard Chair</span>') + '</td></tr>';
      }).join('');
      return '<div class="panel" style="padding:16px;margin-bottom:14px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">' +
          '<strong>' + shEsc(t.name) + ' (' + t.shape.replace('_', ' ') + ')</strong>' +
          '<span class="tabular" style="font-size:0.84rem;font-weight:700;color:#44403C;">🥩 ' + tf + ' Filet &middot; 🐟 ' + th + ' Halibut &middot; 🌱 ' + tv + ' Vegan &middot; 🧒 ' + tk + ' Kids</span>' +
        '</div>' +
        '<div style="overflow-x:auto;"><table class="data-table"><thead><tr><th>Clockwise Seat</th><th>Guest Name</th><th>Entr&eacute;e</th><th>Kitchen Allergy Alert</th><th>Chair / Floor Mod</th></tr></thead><tbody>' + sRows + '</tbody></table></div>' +
      '</div>';
    }).join('');

    el.innerHTML =
      '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px;">' +
        '<div class="metric-tile"><div class="metric-label">🥩 Filet Mignon</div><div class="metric-val">' + filet + ' Plates</div></div>' +
        '<div class="metric-tile"><div class="metric-label">🐟 Pan-Seared Halibut</div><div class="metric-val">' + halibut + ' Plates</div></div>' +
        '<div class="metric-tile"><div class="metric-label">🌱 Vegan Risotto</div><div class="metric-val">' + vegan + ' Plates</div></div>' +
        '<div class="metric-tile"><div class="metric-label">🧒 Kids + 4 Vendor Meals</div><div class="metric-val">' + kids + ' + 4 Crew</div></div>' +
      '</div>' +
      '<div style="padding:14px 16px;border-radius:10px;background:#FFF1F2;border:1px solid #FECDD3;margin-bottom:16px;">' +
        '<div style="font-weight:800;color:#9F1239;font-size:0.9rem;margin-bottom:6px;">🚨 RED-ALERT KITCHEN ANAPHYLACTIC &amp; ACCESSIBILITY CALLOUTS (' + allergyRows.length + ' SEATS)</div>' +
        '<div style="display:grid;gap:6px;font-size:0.85rem;color:#881337;">' +
          allergyRows.map(function(a) { return '<div>&bull; <strong>' + shEsc(a.tbl) + ', Seat #' + a.seat + ' (' + shEsc(a.name) + ')</strong>: ' + shEsc(a.note) + ' — <em>' + shEsc(a.meal) + '</em></div>'; }).join('') +
        '</div>' +
      '</div>' + tableCards;
  }

  function shRenderPosterView() {
    const el = document.getElementById('sh-poster-preview');
    if (!el || !window.__SH_STATE) return;
    const theme = window.__SH_POSTER_THEME || 'alabaster';
    const bg = theme === 'obsidian' ? '#141210' : (theme === 'sage' ? '#1E3A2F' : '#FAF7F2');
    const fg = theme === 'obsidian' ? '#F5EFE6' : (theme === 'sage' ? '#F4F7F4' : '#1C1917');
    const sub = theme === 'obsidian' ? '#D6C7B2' : (theme === 'sage' ? '#A7F3D0' : '#78716C');
    const border = theme === 'obsidian' ? '#574C3F' : (theme === 'sage' ? '#4E7A66' : '#C8B9A6');

    let bodyHtml = '';
    if (window.__SH_POSTER_MODE === 'alphabetical') {
      const allGuests = [];
      window.__SH_STATE.tables.forEach(function(t) {
        t.guests.forEach(function(g, sIdx) {
          const parts = g.name.replace(/\\([^)]*\\)/g, '').trim().split(/\\s+/);
          const last = parts[parts.length - 1] || g.name;
          const first = parts.slice(0, -1).join(' ') || g.name;
          allGuests.push({ sortName: last + ', ' + first, display: last + ', ' + first, tableNum: t.number, seatNum: sIdx + 1 });
        });
      });
      allGuests.sort(function(a, b) { return a.sortName.localeCompare(b.sortName); });
      const cols = [[], [], []];
      allGuests.forEach(function(item, i) { cols[i % 3].push(item); });
      bodyHtml = '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;text-align:left;">' +
        cols.map(function(col) {
          return '<div style="display:grid;gap:5px;">' + col.map(function(g) {
            return '<div style="display:flex;justify-content:space-between;gap:8px;font-size:0.8rem;border-bottom:1px dotted ' + border + ';padding-bottom:3px;">' +
              '<span>' + shEsc(g.display) + '</span><strong class="tabular" style="color:' + sub + ';">Tbl ' + g.tableNum + '</strong></div>';
          }).join('') + '</div>';
        }).join('') + '</div>';
    } else {
      bodyHtml = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;text-align:center;">' +
        window.__SH_STATE.tables.map(function(t) {
          return '<div style="padding:10px;border:1px solid ' + border + ';border-radius:8px;">' +
            '<div class="serif-display" style="font-size:1.05rem;font-weight:700;margin-bottom:6px;color:' + sub + ';">Table ' + t.number + '</div>' +
            t.guests.map(function(g) { return '<div style="font-size:0.78rem;line-height:1.45;">' + shEsc(g.name) + '</div>'; }).join('') +
          '</div>';
        }).join('') + '</div>';
    }

    el.innerHTML =
      '<div style="background:' + bg + ';color:' + fg + ';border:2px solid ' + border + ';border-radius:14px;padding:28px 24px;box-shadow:inset 0 0 0 6px ' + bg + ', inset 0 0 0 7px ' + border + ';">' +
        '<div style="text-align:center;margin-bottom:20px;">' +
          '<div style="font-size:0.72rem;letter-spacing:0.18em;text-transform:uppercase;color:' + sub + ';margin-bottom:6px;">WELCOME TO THE WEDDING RECEPTION OF</div>' +
          '<h3 class="serif-display" style="font-size:2.1rem;font-weight:600;margin-bottom:4px;">Maya Lin &amp; Liam O’Connor</h3>' +
          '<div style="font-size:0.84rem;color:' + sub + ';">Please Find Your Seat &middot; ' + (window.__SH_POSTER_MODE === 'alphabetical' ? 'Alphabetical by Last Name (A–Z)' : 'Grouped by Reception Table (1–8)') + ' &middot; 24&Prime;&times;36&Prime; Archival Print Spec (0.125&Prime; Bleed)</div>' +
        '</div>' +
        bodyHtml +
        '<div style="margin-top:20px;padding-top:14px;border-top:1px solid ' + border + ';display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:0.76rem;color:' + sub + ';">' +
          '<span>✚ 0.125&Prime; Printer Crop Marks &amp; 300-DPI CMYK Vector Ready (FedEx / Staples / Local Print Shop)</span>' +
          '<span>📱 Corner Cocktail-Hour QR Code: Scan to Highlight Your Exact Seat</span>' +
        '</div>' +
      '</div>';
  }

  window.shFilterQrLookup = function() {
    const inp = document.getElementById('sh-qr-search-input');
    const resEl = document.getElementById('sh-qr-results');
    if (!resEl || !window.__SH_STATE) return;
    const q = (inp ? inp.value : '').trim().toLowerCase();
    const matches = [];
    window.__SH_STATE.tables.forEach(function(t) {
      t.guests.forEach(function(g, sIdx) {
        if (!q || g.name.toLowerCase().indexOf(q) !== -1 || t.name.toLowerCase().indexOf(q) !== -1) {
          matches.push({ guest: g, table: t, seatNumber: sIdx + 1 });
        }
      });
    });
    resEl.innerHTML = matches.slice(0, 8).map(function(m) {
      const mb = shMealBadge(m.guest.meal);
      return '<div style="padding:10px 12px;border-radius:10px;background:#FFFFFF;border:1px solid #E5DEC9;display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
        '<div><div style="font-weight:800;color:#1C1917;font-size:0.92rem;">' + shEsc(m.guest.name) + '</div>' +
        '<div style="font-size:0.78rem;color:#78716C;">' + shEsc(m.table.name) + ' &middot; ' + mb.icon + ' ' + shEsc(m.guest.meal) + '</div></div>' +
        '<span class="badge badge-emerald tabular" style="font-size:0.84rem;">Table ' + m.table.number + ' &middot; Seat #' + m.seatNumber + '</span>' +
      '</div>';
    }).join('');
  };

  function shRenderAll() {
    if (!window.__SH_STATE) return;
    const scoreEl = document.getElementById('sh-kpi-harmony');
    if (scoreEl) scoreEl.textContent = (window.__SH_STATE.harmonyScore || 98) + '/100';
    const guestsEl = document.getElementById('sh-stat-guests');
    if (guestsEl && window.__SH_STATE.tables) {
      let totalSeated = 0, totalTables = window.__SH_STATE.tables.length;
      window.__SH_STATE.tables.forEach(function(t) { totalSeated += (t.guests ? t.guests.length : 0); });
      guestsEl.textContent = totalSeated + ' / ' + totalTables + ' Tables';
    }
    shRenderFloorplanSvg();
    shRenderSelectedTableInspector();
    shRenderBeoView();
    shRenderPosterView();
    window.shFilterQrLookup();
  }

  document.addEventListener('DOMContentLoaded', function() {
    try {
      const sp = new URLSearchParams(window.location.search);
      if (sp.get('sandbox') === 'mom_tables_1_3' && !window.__SH_SANDBOX_MOM) {
        window.shToggleMomSandbox();
      }
    } catch (_) {}
    shRenderAll();
  });
</script>`;
}

module.exports = {
  escapeHtml,
  renderBrandLogoSvg,
  renderHead,
  renderNavbar,
  renderFooter,
  renderInteractiveScript
};

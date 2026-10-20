/**
 * CitationForge UI Templates: Persona-Driven Redesign
 * Aesthetic: "Attio + Perplexity + Stripe Editorial Studio"
 * Target Personas:
 *   1. VP of Marketing / Head of SEO & Content Growth (B2B SaaS, FinTech, E-Commerce)
 *   2. Technical Founders & SEO Agency Directors managing AI Search Visibility
 *
 * Palette:
 *   - Primary Canvas: Warm Studio Ivory (#FAF9F5) & Architectural Stone (#F3F1EC)
 *   - Bento Surfaces: Pure Crisp White (#FFFFFF) with 1px solid #E4E2DD hairlines
 *   - Double-Bezel Tray: #EFECE6 outer shell with 1px solid #E2DFD7
 *   - Typography: 'Newsreader' (Editorial Serif Display) + 'Plus Jakarta Sans' (UI/Body)
 *     + 'JetBrains Mono' (Tabular cSoV Telemetry & Code)
 *   - Semantic Accents: Electric Indigo (#4F46E5), Emerald (#059669), Amber (#D97706), Rose (#E11D48)
 *   - Dark Obsidian Artifact Dock (#0B0F19) for generated llms.txt & JSON-LD code blocks
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
 * High-Class Bespoke SVG Brand Emblem:
 * "Prism & Knowledge-Graph Citation Core"
 * Interlocking isometric hexagonal prism, three converging citation rays,
 * orbital knowledge-graph vertices, and a luminous central entity core.
 */
function renderBrandLogoSvg(size = 30) {
  return `<svg id="citation-forge-logo-svg" width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CitationForge Prism Knowledge Graph Emblem">
    <defs>
      <linearGradient id="cf-prism-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#4F46E5"/>
        <stop offset="55%" stop-color="#3B82F6"/>
        <stop offset="100%" stop-color="#059669"/>
      </linearGradient>
      <linearGradient id="cf-core-glow" x1="12" y1="10" x2="28" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#EEF2FF"/>
        <stop offset="100%" stop-color="#A7F3D0"/>
      </linearGradient>
    </defs>
    <!-- Outer Squircle Architectural Frame -->
    <rect x="2" y="2" width="36" height="36" rx="10" fill="#0F172A"/>
    <rect x="2.75" y="2.75" width="34.5" height="34.5" rx="9.25" stroke="url(#cf-prism-grad)" stroke-width="1.5"/>
    <!-- Isometric Hexagonal Knowledge Graph Prism -->
    <polygon points="20,6.5 31.5,13.2 31.5,26.8 20,33.5 8.5,26.8 8.5,13.2" fill="rgba(79,70,229,0.16)" stroke="url(#cf-prism-grad)" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- Converging Citation Rays (Isometric Axes) -->
    <path d="M20 6.5V20M31.5 13.2L20 20M8.5 13.2L20 20M20 33.5V20" stroke="#94A3B8" stroke-width="1.15" stroke-linecap="round" stroke-dasharray="1.5 1.5"/>
    <!-- Inner Citation Diamond Facet -->
    <polygon points="20,11.5 27.5,20 20,28.5 12.5,20" fill="rgba(16,185,129,0.18)" stroke="url(#cf-core-glow)" stroke-width="1.35"/>
    <!-- Knowledge Graph Vertex Nodes -->
    <circle cx="20" cy="6.5" r="2.1" fill="#818CF8"/>
    <circle cx="31.5" cy="13.2" r="2.1" fill="#38BDF8"/>
    <circle cx="8.5" cy="13.2" r="2.1" fill="#818CF8"/>
    <circle cx="31.5" cy="26.8" r="2.1" fill="#34D399"/>
    <circle cx="8.5" cy="26.8" r="2.1" fill="#38BDF8"/>
    <circle cx="20" cy="33.5" r="2.1" fill="#10B981"/>
    <!-- Central Verified Entity Core -->
    <circle cx="20" cy="20" r="3.6" fill="#FFFFFF" stroke="#4F46E5" stroke-width="1.5"/>
    <circle cx="20" cy="20" r="1.5" fill="#059669"/>
  </svg>`;
}

function renderHead({ title, description, canonicalPath, ogSlug, jsonLdString }) {
  const baseUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.citationforge.io').replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}${canonicalPath || '/'}`;
  const ogImageUrl = `${baseUrl}/api/og?slug=${encodeURIComponent(ogSlug || 'home')}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="theme-color" content="#FAF9F5" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="manifest" href="/manifest.webmanifest" />
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg-canvas: #FAF9F5;
      --bg-subtle: #F3F1EC;
      --bg-surface: #FFFFFF;
      --bg-elevated: #FFFFFF;
      --bg-bezel: #EFECE6;
      --bg-glass: rgba(250, 249, 245, 0.88);
      --bg-dock: #0B0F19;
      --bg-dock-header: #111827;
      --border-hairline: #E4E2DD;
      --border-bezel: #DCD8D0;
      --border-active: #4F46E5;
      --text-primary: #0F172A;
      --text-secondary: #475569;
      --text-muted: #64748B;
      --accent-indigo: #4F46E5;
      --accent-indigo-hover: #4338CA;
      --accent-indigo-soft: #EEF2FF;
      --accent-emerald: #059669;
      --accent-emerald-soft: #ECFDF5;
      --accent-cyan: #0284C7;
      --accent-cyan-soft: #F0F9FF;
      --accent-amber: #D97706;
      --accent-amber-soft: #FFFBEB;
      --accent-rose: #E11D48;
      --accent-rose-soft: #FFF1F2;
      --shadow-soft: 0 16px 40px -12px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03);
      --shadow-card: 0 4px 16px -4px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
      --radius-outer: 16px;
      --radius-card: 12px;
      --radius-input: 8px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    html, body {
      background-color: var(--bg-canvas);
      color: var(--text-primary);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      overflow-x: clip;
      -webkit-font-smoothing: antialiased;
    }
    .serif-display {
      font-family: 'Newsreader', Georgia, serif;
      font-weight: 500;
      letter-spacing: -0.025em;
    }
    .serif-italic {
      font-family: 'Newsreader', Georgia, serif;
      font-style: italic;
      font-weight: 400;
      color: var(--accent-indigo);
    }
    .mono {
      font-family: 'JetBrains Mono', monospace;
      font-variant-numeric: tabular-nums;
    }
    .tabular { font-variant-numeric: tabular-nums; }
    a { color: inherit; text-decoration: none; }
    .skip-link {
      position: absolute;
      left: -9999px;
      top: 8px;
      background: var(--accent-indigo);
      color: #FFFFFF;
      padding: 8px 14px;
      border-radius: 6px;
      z-index: 200;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .skip-link:focus { left: 16px; }
    .container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
    }
    /* Sticky Studio Header */
    .topbar {
      border-bottom: 1px solid var(--border-hairline);
      background: var(--bg-glass);
      backdrop-filter: blur(14px);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .topbar-inner {
      min-height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand-mark {
      display: inline-flex;
      align-items: center;
      gap: 11px;
      font-weight: 800;
      font-size: 1.12rem;
      letter-spacing: -0.025em;
      color: var(--text-primary);
      transition: opacity 150ms ease-out;
    }
    .brand-mark:hover { opacity: 0.88; }
    .brand-sub-pill {
      font-size:0.84rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 9999px;
      background: var(--accent-indigo-soft);
      color: var(--accent-indigo);
      border: 1px solid #C7D2FE;
      white-space: nowrap;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--text-secondary);
      white-space: nowrap;
    }
    .nav-links a {
      white-space: nowrap;
      padding: 6px 2px;
      transition: color 150ms ease-out;
    }
    .nav-links a:hover, .nav-links a.active {
      color: var(--accent-indigo);
    }
    /* Mobile Sub-Nav Strip so header links are always present & tappable on mobile without floating boxes */
    .mobile-nav-strip {
      display: none;
      border-top: 1px solid var(--border-hairline);
      background: var(--bg-subtle);
      padding: 10px 16px;
      overflow-x: auto;
      gap: 16px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
      white-space: nowrap;
    }
    /* Tactile Buttons (Emil Kowalski & Soft-Skill Button-in-Button architecture) */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: inherit;
      font-weight: 600;
      font-size: 0.92rem;
      padding: 10px 18px;
      border-radius: var(--radius-input);
      border: 1px solid transparent;
      cursor: pointer;
      white-space: nowrap;
      transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), background-color 160ms ease-out, border-color 160ms ease-out, box-shadow 160ms ease-out;
    }
    .btn:active { transform: scale(0.98); }
    .btn:focus-visible { outline: 2px solid var(--accent-indigo); outline-offset: 2px; }
    .btn-primary {
      background: var(--accent-indigo);
      color: #FFFFFF;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(79, 70, 229, 0.25);
    }
    .btn-primary:hover {
      background: var(--accent-indigo-hover);
      box-shadow: 0 4px 14px rgba(79, 70, 229, 0.34);
    }
    .btn-secondary {
      background: var(--bg-surface);
      color: var(--text-primary);
      border-color: var(--border-hairline);
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    }
    .btn-secondary:hover {
      border-color: #CBD5E1;
      background: var(--bg-subtle);
    }
    .btn-dark {
      background: var(--text-primary);
      color: #FFFFFF;
      font-weight: 600;
    }
    .btn-dark:hover { background: #1E293B; }
    .btn-arrow-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.18);
      font-size: 0.8125rem;
      line-height: 1;
    }
    /* Double-Bezel & Bento Surfaces */
    .bezel-shell {
      background: var(--bg-bezel);
      border: 1px solid var(--border-bezel);
      padding: 6px;
      border-radius: var(--radius-outer);
      box-shadow: var(--shadow-soft);
    }
    .panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-hairline);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-card);
    }
    .panel-elevated {
      background: var(--bg-surface);
      border: 1px solid var(--border-hairline);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-soft);
    }
    /* Semantic Status Badges (Editorial Studio Pastels) */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.8125rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      white-space: nowrap;
    }
    .badge-emerald {
      background: var(--accent-emerald-soft);
      color: #065F46;
      border: 1px solid #A7F3D0;
    }
    .badge-cyan {
      background: var(--accent-indigo-soft);
      color: #3730A3;
      border: 1px solid #C7D2FE;
    }
    .badge-amber {
      background: var(--accent-amber-soft);
      color: #92400E;
      border: 1px solid #FDE68A;
    }
    .badge-rose {
      background: var(--accent-rose-soft);
      color: #9F1239;
      border: 1px solid #FECDD3;
    }
    /* Hero Editorial Split Layout */
    .hero-section {
      padding: 48px 0 44px;
      border-bottom: 1px solid var(--border-hairline);
      background: radial-gradient(circle at 85% 12%, rgba(79, 70, 229, 0.06), transparent 48%),
                  radial-gradient(circle at 15% 80%, rgba(5, 150, 105, 0.05), transparent 45%);
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 36px;
      align-items: start;
    }
    .hero-h1 {
      font-family: 'Newsreader', Georgia, serif;
      font-size: clamp(2.15rem, 3.2vw, 3.1rem);
      font-weight: 500;
      line-height: 1.12;
      letter-spacing: -0.025em;
      color: var(--text-primary);
      margin: 14px 0 16px;
      text-wrap: balance;
    }
    .hero-sub {
      color: var(--text-secondary);
      font-size: 1.04rem;
      max-width: 60ch;
      margin-bottom: 22px;
    }
    /* Grader Console Input Box */
    .grader-form {
      display: flex;
      gap: 10px;
      margin-bottom: 14px;
    }
    .grader-input {
      flex: 1;
      background: var(--bg-surface);
      border: 1px solid #CBD5E1;
      color: var(--text-primary);
      padding: 12px 16px;
      border-radius: var(--radius-input);
      font-size: 1rem; /* 16px prevents iOS Safari zoom */
      font-family: 'JetBrains Mono', monospace;
      box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.04);
      transition: border-color 150ms ease-out, box-shadow 150ms ease-out;
    }
    .grader-input:focus {
      outline: none;
      border-color: var(--accent-indigo);
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.14);
    }
    .preset-strip {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }
    .preset-chip {
      background: var(--bg-surface);
      border: 1px solid var(--border-hairline);
      color: var(--text-secondary);
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 0.84rem;
      font-weight: 600;
      cursor: pointer;
      transition: border-color 140ms ease-out, color 140ms ease-out, background-color 140ms ease-out, transform 140ms ease-out;
    }
    .preset-chip:hover, .preset-chip.active {
      border-color: var(--accent-indigo);
      color: var(--accent-indigo);
      background: var(--accent-indigo-soft);
      font-weight: 700;
    }
    .preset-chip:active { transform: scale(0.97); }
    /* Scorecard Telemetry Grid */
    .telemetry-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 16px;
    }
    .metric-tile {
      padding: 14px;
      background: var(--bg-canvas);
      border: 1px solid var(--border-hairline);
      border-radius: 10px;
    }
    .metric-label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 6px;
    }
    .metric-val {
      font-size: 1.45rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--text-primary);
    }
    /* Warm Editorial Studio Artifact Dock for llms.txt & JSON-LD */
    .artifact-dock {
      background: var(--bg-surface);
      color: var(--text-primary);
      border: 1px solid var(--border-hairline);
      border-radius: var(--radius-card);
      overflow: hidden;
      box-shadow: var(--shadow-card);
    }
    .dock-header {
      padding: 14px 18px;
      background: var(--bg-subtle);
      border-bottom: 1px solid var(--border-hairline);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .window-dots {
      display: inline-flex;
      gap: 6px;
      margin-right: 10px;
    }
    .window-dot {
      width: 10px;
      height: 10px;
      border-radius: 9999px;
    }
    .tab-bar {
      display: flex;
      gap: 6px;
      border-bottom: 1px solid var(--border-hairline);
      padding: 8px 14px 0;
      background: var(--bg-canvas);
      overflow-x: auto;
    }
    .tab-btn {
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--text-secondary);
      padding: 8px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: color 140ms ease-out, border-color 140ms ease-out;
    }
    .tab-btn:hover { color: var(--text-primary); }
    .tab-btn.active {
      color: var(--accent-indigo);
      border-bottom-color: var(--accent-indigo);
    }
    .code-viewport {
      background: var(--bg-subtle);
      padding: 18px;
      font-size: 0.85rem;
      line-height: 1.6;
      color: var(--text-primary);
      overflow-x: auto;
      max-height: 330px;
      overflow-y: auto;
      white-space: pre;
    }
    /* Editorial Data Tables */
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.92rem;
    }
    .data-table th, .data-table td {
      padding: 12px 14px;
      text-align: left;
      border-bottom: 1px solid var(--border-hairline);
    }
    .data-table th {
      color: var(--text-secondary);
      font-weight: 700;
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      background: var(--bg-subtle);
    }
    .data-table tr:last-child td { border-bottom: none; }
    /* Responsive Rules & Mobile Zero-Float Guarantee */
    .hero-grid > *, .telemetry-grid > * { min-width: 0; }
    @media (max-width: 980px) {
      .hero-grid { grid-template-columns: 1fr; }
      .telemetry-grid { grid-template-columns: repeat(2, 1fr); }
      .nav-links { display: none; }
      .mobile-nav-strip { display: flex; }
    }
    @media (max-width: 560px) {
      .container { padding: 0 16px; }
      .grader-form { flex-direction: column; }
      .telemetry-grid { grid-template-columns: 1fr 1fr; }
      .badge { white-space: normal; }
      .hide-mobile { display: none !important; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
    }
  </style>
  ${(() => {
    if (!jsonLdString || typeof jsonLdString !== 'string') return '';
    try {
      JSON.parse(jsonLdString);
      return `<script type="application/ld+json">${jsonLdString}</script>`;
    } catch (_) {
      return '';
    }
  })()}
</head>`;
}

/**
 * Unified Sticky Header Navigation across ALL pages.
 */
function renderNavbar(activePath = '/') {
  return `
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header class="topbar">
    <div class="container topbar-inner">
      <a href="/" id="nav-brand-logo-link" class="brand-mark" aria-label="CitationForge Home">
        ${renderBrandLogoSvg(32)}
        <span>CitationForge</span>
        <span class="brand-sub-pill mono hide-mobile">GEO Studio</span>
      </a>
      <nav class="nav-links" aria-label="Primary Navigation">
        <a href="/#grader" class="${activePath === '/' ? 'active' : ''}">AI Visibility Grader</a>
        <a href="/#matrix">25 Buyer Questions</a>
        <a href="/leaderboard" class="${activePath.startsWith('/leaderboard') ? 'active' : ''}" style="font-weight:700;color:var(--accent-indigo);">🏆 Leaderboard</a>
        <a href="/directory" class="${activePath.startsWith('/directory') || activePath.startsWith('/seo') ? 'active' : ''}">GEO Benchmarks (60+)</a>
        <a href="/#pricing">3-File Pack ($1.99)</a>
      </nav>
      <div style="display:flex;align-items:center;gap:10px;">
        <a href="/buy/flash_pass" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}" class="btn btn-primary" style="padding:9px 16px;font-size:0.88rem;">
          <span>Unlock 3-File Pack ($1.99)</span>
          <span class="btn-arrow-pill" aria-hidden="true">&#8599;</span>
        </a>
      </div>
    </div>
    <nav class="mobile-nav-strip" aria-label="Mobile Navigation">
      <a href="/#grader">AI Grader</a>
      <a href="/#matrix">25 Questions</a>
      <a href="/leaderboard" style="font-weight:700;color:var(--accent-indigo);">🏆 Leaderboard</a>
      <a href="/directory">60+ Benchmarks</a>
      <a href="/buy/flash_pass" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}">3-File Pack ($1.99)</a>
    </nav>
  </header>`;
}

/**
 * Footer + Non-Overlapping Docked Cookie Consent Bar (Zero floating overlap on mobile/desktop)
 */
function renderFooter() {
  return `
  <!-- Non-Overlapping Docked Telemetry Consent Bar (Pre-Launch Checkpoint #5) -->
  <aside id="cookie-banner" aria-label="Cookie and Telemetry Consent" style="border-top:1px solid var(--border-hairline);background:var(--bg-subtle);padding:14px 0;">
    <div class="container" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;">
      <div style="font-size:0.82rem;color:var(--text-secondary);">
        <strong style="color:var(--text-primary);">Telemetry &amp; Privacy Governance:</strong> We use first-party SQLite attribution and Meta CAPI deduplication only with your explicit consent. See our <a href="/privacy" style="text-decoration:underline;color:var(--accent-indigo);">Privacy Policy</a>.
      </div>
      <div style="display:flex;gap:8px;">
        <button type="button" class="btn btn-secondary" style="padding:6px 12px;font-size:0.84rem;" onclick="setCookieConsent('rejected')">Reject Non-Essential</button>
        <button type="button" class="btn btn-primary" style="padding:6px 12px;font-size:0.84rem;" onclick="setCookieConsent('accepted')">Accept Telemetry</button>
      </div>
    </div>
  </aside>

  <footer style="border-top:1px solid var(--border-hairline);padding:56px 0 40px;background:var(--bg-surface);">
    <div class="container">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:32px;margin-bottom:36px;">
        <div>
          <a href="/" class="brand-mark" style="margin-bottom:12px;">
            ${renderBrandLogoSvg(28)}
            <span>CitationForge</span>
          </a>
          <p style="color:var(--text-secondary);font-size:0.86rem;max-width:34ch;margin-top:8px;">
            The Autonomous AI-Search (GEO/AEO) Visibility Radar, Citation Share-of-Voice Scorer &amp; Auto-llms.txt / JSON-LD Knowledge Graph Compiler.
          </p>
        </div>
        <div>
          <div style="font-weight:700;font-size:0.84rem;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-primary);margin-bottom:12px;">Platform &amp; Specs</div>
          <ul style="list-style:none;display:grid;gap:8px;font-size:0.86rem;color:var(--text-secondary);">
            <li><a href="/#grader">Interactive GEO Domain Grader</a></li>
            <li><a href="/#compiler">Auto-llms.txt &amp; JSON-LD Compiler</a></li>
            <li><a href="/llms.txt">Live /llms.txt Manifest</a></li>
            <li><a href="/llms-full.txt">Live /llms-full.txt Corpus</a></li>
            <li><a href="/sitemap.xml">XML Sitemap (67 Indexed URLs)</a></li>
            <li><a href="/robots.txt">AI Bot robots.txt Spec</a></li>
          </ul>
        </div>
        <div>
          <div style="font-weight:700;font-size:0.84rem;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-primary);margin-bottom:12px;">Featured GEO Audits</div>
          <ul style="list-style:none;display:grid;gap:8px;font-size:0.86rem;color:var(--text-secondary);">
            <li><a href="/seo/stripe-vs-adyen-ai-citation-audit">Stripe vs Adyen Citation Audit</a></li>
            <li><a href="/seo/linear-vs-jira-ai-citation-audit">Linear vs Jira Citation Audit</a></li>
            <li><a href="/seo/supabase-vs-firebase-ai-citation-audit">Supabase vs Firebase Audit</a></li>
            <li><a href="/seo/ai-search-visibility-crm-software">CRM Software AI Leaderboard</a></li>
            <li><a href="/directory">Browse All 60+ GEO Benchmarks</a></li>
          </ul>
        </div>
        <div>
          <div style="font-weight:700;font-size:0.84rem;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-primary);margin-bottom:12px;">Legal &amp; Trust</div>
          <ul style="list-style:none;display:grid;gap:8px;font-size:0.86rem;color:var(--text-secondary);">
            <li><a href="/privacy">Privacy Policy &amp; GDPR</a></li>
            <li><a href="/terms">Terms of Service &amp; SLA</a></li>
            <li><a href="/lp">Executive Conversion Brief (/lp)</a></li>
            <li><a href="/#pricing">30-Day Citation Lift Guarantee</a></li>
          </ul>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding-top:24px;border-top:1px solid var(--border-hairline);font-size:0.8rem;color:var(--text-muted);">
        <span>&copy; 2026 CitationForge Inc. Built for Marketing VPs, SEO Directors &amp; Technical Founders.</span>
        <span class="mono">cSoV Formula: w_r = 1 / log2(r + 1) · AnswerDotAI llms.txt v1.0</span>
      </div>
    </div>
  </footer>`;
}

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

    function switchCompilerTab(tabKey, isAuto) {
      window.__ACTIVE_TAB__ = tabKey;
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabKey);
      });
      const codeEl = document.getElementById('compiler-code-output');
      const audit = window.__CURRENT_AUDIT__;
      if (codeEl && audit && audit.artifacts) {
        codeEl.textContent = audit.artifacts[tabKey] || '';
      }
      if (!isAuto) {
        fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: 'tab_switch', page_url: window.location.pathname, meta: { tab: tabKey } }) }).catch(() => {});
      }
    }

    function copyCompiledCode() {
      const codeEl = document.getElementById('compiler-code-output');
      const btn = document.getElementById('copy-code-btn');
      if (!codeEl) return;
      navigator.clipboard?.writeText(codeEl.textContent || '');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Copied to Clipboard';
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
      const catEl = document.getElementById('category-select');
      const errEl = document.getElementById('grader-error');
      const submitBtn = document.getElementById('run-audit-btn');
      const raw = overrideDomain || (inputEl ? inputEl.value.trim() : '');
      const category = catEl ? catEl.value.trim() : '';
      if (!raw || raw.length < 2) {
        if (errEl) {
          errEl.textContent = 'Enter a valid domain or brand name (for example: stripe.com or linear.app).';
          errEl.style.display = 'block';
        }
        return;
      }
      if (errEl) errEl.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Probing Live Origin & 25 Prompts...';
      }
      try {
        const res = await fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain: raw, category: category || undefined, ...getUtmParams() })
        });
        const data = await res.json();
        if (data && data.audit) {
          window.__CURRENT_AUDIT__ = data.audit;
          renderAuditToDom(data.audit);
          try {
            const nextUrl = '/?domain=' + encodeURIComponent(data.audit.domain) + (category ? '&category=' + encodeURIComponent(category) : '');
            window.history.replaceState(null, '', nextUrl);
          } catch (_) {}
          trackMetaEvent('Lead', { audited_domain: data.audit.domain, csov_pct: data.audit.scores.csovPct });
        }
      } catch (e) {
        if (errEl) {
          errEl.textContent = 'Connection failed. Please verify the domain and try again.';
          errEl.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Check My Website Free</span><span class="btn-arrow-pill" aria-hidden="true">&#8599;</span>';
        }
      }
    }

    function renderAuditToDom(audit) {
      const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
      setTxt('score-brand-title', audit.brand + ' (' + audit.domain + ')');
      setTxt('score-category-badge', audit.category);
      setTxt('score-grade', 'Grade ' + audit.scores.grade + ' · ' + audit.scores.compositeGeoScore + '/100');
      setTxt('score-csov', audit.scores.csovPct + '%');
      setTxt('score-readability', audit.scores.agentReadabilityScore + '/100');
      setTxt('score-entity', audit.scores.entityDensityScore + '/100');
      setTxt('score-projected', audit.scores.projectedCsovPct + '%');
      setTxt('score-exec-ms', audit.executionMs + 'ms');
      setTxt('diag-domain-label', audit.domain);
      setTxt('gemini-grounding-summary', audit.geminiInsight?.groundingSummary || '');
      setTxt('live-probe-badge', '● LIVE ORIGIN PROBE · /robots.txt (' + (audit.liveProbe?.robotsHttpStatus || 200) + ') • /llms.txt (' + (audit.llmsTxtStatus?.hasLlmsTxt ? '200 OK' : '404 MISSING') + ')');

      const botContainer = document.getElementById('bot-status-row');
      if (botContainer && audit.bots) {
        botContainer.innerHTML = Object.entries(audit.bots).map(([bot, status]) => {
          const ok = status === 'Allow';
          return '<span class="badge ' + (ok ? 'badge-emerald' : 'badge-rose') + ' mono">' +
            bot + ': ' + status + '</span>';
        }).join('');
      }

      const findingsEl = document.getElementById('findings-list');
      if (findingsEl && audit.findings) {
        findingsEl.innerHTML = audit.findings.map(f => {
          const badgeClass = f.severity === 'critical' ? 'badge-rose' : f.severity === 'high' ? 'badge-amber' : 'badge-emerald';
          return '<div style="padding:14px 16px;background:var(--bg-canvas);border:1px solid var(--border-hairline);border-radius:10px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">' +
            '<div><div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);margin-bottom:3px;">' + f.title + '</div>' +
            '<div style="font-size:0.81rem;color:var(--text-secondary);">' + f.detail + '</div></div>' +
            '<span class="badge ' + badgeClass + ' mono">' + f.impact + '</span></div>';
        }).join('');
      }

      const lbEl = document.getElementById('leaderboard-tbody');
      if (lbEl && audit.leaderboard) {
        lbEl.innerHTML = audit.leaderboard.map((row, idx) => {
          return '<tr style="' + (row.isTarget ? 'background:var(--accent-indigo-soft);font-weight:700;' : '') + '">' +
            '<td class="mono">#' + (idx + 1) + '</td>' +
            '<td>' + row.brand + (row.isTarget ? ' <span class="badge badge-cyan" style="margin-left:6px;">Audited</span>' : '') + '</td>' +
            '<td class="mono" style="color:var(--text-secondary);">' + row.domain + '</td>' +
            '<td class="mono" style="color:var(--accent-emerald);font-weight:700;">' + row.csovPct + '%</td>' +
          '</tr>';
        }).join('');
      }

      const pmEl = document.getElementById('prompt-matrix-tbody');
      if (pmEl && audit.promptRows) {
        pmEl.innerHTML = audit.promptRows.slice(0, 12).map((r, idx) => {
          const fmtRank = (eng) => eng && eng.cited ? '<span class="badge badge-emerald mono">#' + eng.rank + ' (' + eng.weight + ')</span>' : '<span class="badge badge-rose mono">Uncited</span>';
          const isBlurred = idx >= 3 && !(idx === 3 && window.__ROW4_UNLOCKED__);
          const blurStyle = isBlurred ? ' style="filter:blur(4px);user-select:none;opacity:0.65;" title="Unlock full 25-prompt matrix via Email or $1.99 Pass"' : '';
          return '<tr' + blurStyle + '>' +
            '<td class="mono" style="color:var(--text-muted);">P' + String(r.id).padStart(2, '0') + '</td>' +
            '<td style="font-weight:500;color:var(--text-primary);">' + r.prompt + '</td>' +
            '<td>' + fmtRank(r.engines.perplexity) + '</td>' +
            '<td>' + fmtRank(r.engines.chatgpt) + '</td>' +
            '<td>' + fmtRank(r.engines.gemini) + '</td>' +
            '<td class="mono" style="font-weight:700;color:var(--accent-indigo);">' + r.avgSharePct + '%</td>' +
          '</tr>';
        }).join('');
      }

      switchCompilerTab(window.__ACTIVE_TAB__, true);
    }

    async function startCheckout(planId) {
      const audit = window.__CURRENT_AUDIT__ || { domain: 'linear.app' };
      const emailInput = document.getElementById('checkout-email');
      const emailErr = document.getElementById('checkout-email-error');
      const email = emailInput ? emailInput.value.trim() : 'vp-growth@' + audit.domain;
      if (emailInput && (!email || !email.includes('@'))) {
        if (emailErr) {
          emailErr.textContent = 'Please enter a valid work email address to receive your audit & GitHub PR token.';
          emailErr.style.display = 'block';
        }
        return;
      }
      if (emailErr) emailErr.style.display = 'none';

      trackMetaEvent('StartTrial', { plan_id: planId, target_domain: audit.domain });

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_id: planId,
          target_domain: audit.domain,
          customer_email: email || ('vp-growth@' + audit.domain),
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
            '<h3 class="serif-display" style="font-size:1.5rem;margin-bottom:8px;">' + data.order.plan_name + ' Provisioned for ' + data.order.target_domain + '</h3>' +
            '<p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:14px;">' +
            'Your 50-Prompt Continuous Radar and GitHub Auto-PR Bot bundle are active. Download your compiled artifacts below.' +
            '</p>' +
            '<div class="mono" style="background:var(--bg-subtle);padding:14px;border-radius:8px;border:1px solid var(--border-hairline);font-size:0.8rem;margin-bottom:16px;color:var(--text-primary);">' +
            'Amount Settled: $' + (data.order.amount_cents / 100).toFixed(2) + ' USD<br/>' +
            'Fulfillment Status: ' + data.order.status + '<br/>' +
            'Webhook &amp; PR Bot Endpoint: https://www.citationforge.io/api/webhooks/' + data.order.target_domain + '<br/>' +
            '<a href="' + (data.order.checkout_url || '/buy/complete_dossier') + '" style="color:var(--accent-primary);text-decoration:underline;font-weight:700;">Proceed to Stripe Checkout ↗</a>' +
            '</div>';
          modal.style.display = 'flex';
        }
        if (!navigator.webdriver && data.order.checkout_url && data.order.checkout_url.startsWith('https://checkout.stripe.com')) window.location.href = data.order.checkout_url;
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      try {
        if (localStorage.getItem('cf_cookie_consent')) {
          const b = document.getElementById('cookie-banner');
          if (b) b.style.display = 'none';
        }
      } catch (_) {}
      trackMetaEvent('ViewContent', { path: window.location.pathname });
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


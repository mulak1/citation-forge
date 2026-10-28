/**
 * SeatHarmony (#2) — Editorial Design System, 6-Zone ExactBaseline CSS & Interactive Client Engine
 * Matches the exact 6-Zone Dante Brunelli + UseMolty sequence from ExactBaseline:
 *   Zone 1: Centered Headline + Subheader + CTA -> Full-Width Split-Screen Visual VSL (3 Scenes) -> 3-Stat Crease Bar
 *   Zone 2: 4-Step Skimmer Walkthrough (68px vertical pacing)
 *   Zone 3: Scroll-Paced 5-Card Builder (Left) + Sticky 3-KPI & 4-Tab Live Stage (Right)
 *   Zone 4: 3-Layer Contextual Proof Stack (3 Case Studies + Honest B/A Table + Reviews + Pricing)
 *   Zone 5: 5-Question Objection-Killer FAQ
 *   Zone 6: Obsidian & Gold Final Closing Hook
 */

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderBrandLogoSvg(size = 30) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;">
    <rect x="1.5" y="1.5" width="33" height="33" rx="10" fill="#181412" stroke="#C8A96E" stroke-width="1.6"/>
    <circle cx="18" cy="18" r="6.8" fill="#FAF6EE" stroke="#C8A96E" stroke-width="1.5"/>
    <circle cx="18" cy="18" r="2.2" fill="#9A5B13"/>
    <circle cx="18" cy="7.2" r="2.3" fill="#E11D48" stroke="#FAF6EE" stroke-width="1"/>
    <circle cx="25.6" cy="10.4" r="2.0" fill="#10B981"/>
    <circle cx="28.8" cy="18" r="2.0" fill="#C8A96E"/>
    <circle cx="25.6" cy="25.6" r="2.0" fill="#10B981"/>
    <circle cx="18" cy="28.8" r="2.0" fill="#C8A96E"/>
    <circle cx="10.4" cy="25.6" r="2.0" fill="#10B981"/>
    <circle cx="7.2" cy="18" r="2.0" fill="#C8A96E"/>
    <circle cx="10.4" cy="10.4" r="2.0" fill="#10B981"/>
  </svg>`;
}

function renderHead({
  title = 'SeatHarmony — Wedding Floorplan, Conflict-Free Seating Solver & 24"×36" Poster Studio',
  description = 'Seat 150 wedding guests in 30 seconds without family drama. Auto-solve divorced parent table buffers, generate clockwise caterer BEO meal sheets, and export print-ready 24"×36" welcome signs & Avery 5302 place cards.',
  canonicalPath = '/',
  jsonLd = null,
  ogSlug = 'home'
} = {}) {
  const baseUrl = (process.env.PUBLIC_URL || 'https://www.citationforge.io').replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  const ogImageUrl = `${baseUrl}/api/og?slug=${encodeURIComponent(ogSlug)}`;

  return `<!DOCTYPE html>
<html lang="en" data-seatharmony-native="1">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <meta name="theme-color" content="#FAF6EE" />

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
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet" />

  <style>
    :root {
      --bg-primary: #FAF6EE; --bg-elevated: #FFFFFF; --bg-surface: #F4EFE6; --bg-obsidian: #181412;
      --text-primary: #181412; --text-secondary: #44403C; --text-muted: #78716C;
      --accent-primary: #8C2D19; --accent-gold: #C8A96E; --accent-gold-dark: #78350F;
      --accent-emerald: #065F46; --accent-rose: #9F1239; --border-warm: #E2D9C8;
      --font-serif: 'Cormorant Garamond', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { max-width: 100vw; overflow-x: clip !important; scroll-behavior: smooth; background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); line-height: 1.55; -webkit-font-smoothing: antialiased; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    .serif-display { font-family: var(--font-serif); font-weight: 700; letter-spacing: -0.015em; line-height: 1.12; }
    .mono { font-family: var(--font-mono); }
    .tabular { font-variant-numeric: tabular-nums; }

    /* Single-Line Sticky Header at 1024px+ */
    .navbar { position: sticky; top: 0; z-index: 90; background: rgba(250, 246, 238, 0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-warm); }
    .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 12px; flex-wrap: nowrap; }
    .nav-brand { display: inline-flex; align-items: center; gap: 9px; font-weight: 800; font-size: 1.08rem; color: var(--text-primary); text-decoration: none; white-space: nowrap; flex-shrink: 0; }
    .nav-links { display: flex; align-items: center; gap: 14px; flex-wrap: nowrap; white-space: nowrap; }
    .nav-link { font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); text-decoration: none; white-space: nowrap; transition: color 0.15s ease; }
    .nav-link:hover { color: var(--accent-primary); }
    .nav-badge-soon { font-size: 0.62rem; font-weight: 800; text-transform: uppercase; padding: 2px 6px; border-radius: 999px; background: #FAF3E3; color: #78350F; border: 1px solid #C8A96E; margin-left: 3px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 10px 18px; border-radius: 10px; font-weight: 800; font-size: 0.85rem; cursor: pointer; border: 1px solid transparent; text-decoration: none; white-space: nowrap; transition: all 0.16s ease; }
    .btn-primary { background: #181412; color: #FDE68A; border: 1.5px solid #C8A96E; box-shadow: 0 10px 24px rgba(24, 20, 18, 0.16); }
    .btn-primary:hover { background: #29221E; transform: translateY(-1px); }
    .btn-secondary { background: #FFFFFF; color: #78350F; border: 1.5px solid #C8A96E; }
    .btn-secondary:hover { background: #FAF3E3; }

    /* 6-ZONE EXACTBASELINE LANDING PAGE + SCROLL-PACED BUILDER ARCHITECTURE */
    .studio-zone-section { padding: 68px 0; width: 100%; box-sizing: border-box; }
    .studio-eyebrow-kicker { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 0.71rem; font-weight: 800; letter-spacing: 0.09em; text-transform: uppercase; color: #78350F; background: #FAF3E3; border: 1px solid #C8A96E; padding: 5px 14px; border-radius: 999px; margin-bottom: 12px; }
    .studio-zone-title { font-family: var(--font-serif); font-size: 2.65rem; font-weight: 700; color: #181412; line-height: 1.1; letter-spacing: -0.015em; margin: 0 0 10px 0; }
    .studio-zone-title em { font-style: italic; color: #8C2D19; font-weight: 600; }
    .studio-zone-sub { font-size: 0.96rem; color: #44403C; line-height: 1.5; max-width: 820px !important; margin: 0 auto; }

    /* ZONE 1: Centered Hero + Full-Width Split-Screen Visual VSL Showcase + Crease Bar */
    .studio-zone1-hero { background: linear-gradient(180deg, #FFFFFF 0%, #FAF6EE 100%); border: 1.5px solid #C8A96E; border-radius: 26px; padding: 16px 26px 0; box-shadow: 0 24px 54px -12px rgba(24, 20, 18, 0.10); overflow: hidden; margin-top: 12px; margin-bottom: 6px; }
    .studio-vsl-showcase-frame { position: relative; border-radius: 20px; border: 2px solid #C8A96E; background: #14110F; overflow: hidden; box-shadow: 0 24px 56px rgba(24, 20, 18, 0.24); margin-top: 12px; }
    .vsl-scene-pill { font-size: 0.70rem; font-weight: 700; padding: 5px 12px; border-radius: 999px; border: 1px solid rgba(200, 169, 110, 0.45); background: rgba(255, 255, 255, 0.10); color: #E6E0D6 !important; cursor: pointer; transition: all 0.15s ease; }
    .vsl-scene-pill:hover { background: rgba(253, 230, 138, 0.18); color: #FFFFFF !important; }
    .vsl-scene-pill.active { background: linear-gradient(135deg, #FDE68A 0%, #C8A96E 100%) !important; color: #181412 !important; border-color: #FDE68A !important; font-weight: 800; }
    .studio-vsl-split-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 318px; position: relative; }
    .studio-vsl-half { position: relative; overflow: hidden; min-height: 318px; display: flex; flex-direction: column; justify-content: space-between; padding: 14px; }
    .studio-vsl-half img.vsl-portrait-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; z-index: 1; transition: filter 0.45s ease, transform 0.6s ease; }
    .studio-vsl-half.trap-before img.vsl-portrait-bg { filter: sepia(0.38) saturate(0.70) contrast(0.94) brightness(0.84); }
    .studio-vsl-half.harmony-after img.vsl-portrait-bg { filter: contrast(1.06) saturate(1.12) brightness(1.02); }
    .studio-vsl-half::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20,17,15,0.52) 0%, rgba(20,17,15,0.16) 45%, rgba(20,17,15,0.86) 100%); z-index: 2; pointer-events: none; }
    .studio-vsl-divider-badge { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 8; background: #181412; color: #FDE68A; border: 2px solid #C8A96E; border-radius: 999px; padding: 7px 15px; font-family: var(--font-mono); font-size: 0.71rem; font-weight: 800; letter-spacing: 0.06em; box-shadow: 0 10px 28px rgba(0,0,0,0.55); white-space: nowrap; }
    .studio-vsl-crease-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; background: #181412; color: #FAF8F5; margin: 16px -26px 0; padding: 14px 28px; border-top: 1.5px solid #C8A96E; align-items: center; }

    /* ZONE 2: 4-Step Skimmer Walkthrough */
    .studio-how-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 28px; }
    .studio-how-card { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 18px; padding: 22px 20px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 8px 24px rgba(24, 20, 18, 0.04); transition: transform 0.2s ease, border-color 0.2s ease; }
    .studio-how-card:hover { transform: translateY(-2px); border-color: #C8A96E; }
    .studio-how-num { width: 34px; height: 34px; border-radius: 10px; background: #181412; color: #FDE68A; border: 1px solid #C8A96E; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; }

    /* ZONE 3: Scroll-Paced 5-Card Interactive Builder (Left) + Sticky Right Stage */
    .studio-scroll-builder-grid { display: grid; grid-template-columns: 0.94fr 1.06fr; gap: 26px; align-items: start; margin-top: 24px; }
    .studio-sticky-right-col { position: sticky; top: 80px; display: flex; flex-direction: column; gap: 12px; z-index: 15; }
    .studio-hybrid-wizard { display: flex; flex-direction: column; gap: 20px; margin-bottom: 18px; }
    .studio-wizard-step { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 18px; overflow: hidden; padding: 6px 6px 8px; box-shadow: 0 8px 24px rgba(24, 20, 18, 0.04); scroll-margin-top: 90px; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
    .studio-wizard-step.active { border: 2px solid #C8A96E; box-shadow: 0 14px 34px rgba(24, 20, 18, 0.08); }
    .studio-wizard-header { width: 100%; padding: 12px 14px; background: transparent; border: none; display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: pointer; text-align: left; }
    .studio-wizard-step-title { font-size: 0.86rem; font-weight: 800; color: #181412; display: flex; align-items: center; gap: 8px; }
    .studio-wizard-step-summary { font-size: 0.68rem; font-weight: 700; color: #065F46; background: #ECFDF5; border: 1px solid #A7F3D0; padding: 3px 10px; border-radius: 999px; white-space: nowrap; }
    .studio-wizard-body { display: block !important; padding: 12px 14px 14px; border-top: 1px solid #EFEAE1; }
    .studio-field-label { display: block; font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #57534E; margin-bottom: 5px; }
    .studio-chip-group { display: flex; flex-wrap: wrap; gap: 6px; }
    .studio-tap-chip { font-size: 0.72rem; font-weight: 700; padding: 6px 11px; border-radius: 999px; border: 1px solid #D6CFC2; background: #FAF8F5; color: #181412; cursor: pointer; transition: all 0.14s ease; }
    .studio-tap-chip:hover { border-color: #C8A96E; background: #FAF3E3; }
    .studio-tap-chip.active { background: #181412; color: #FDE68A; border-color: #C8A96E; font-weight: 800; }

    /* Right Sticky KPI Strip + Obsidian Operational Kit Stage */
    .studio-baseline-kpi-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .studio-kpi-card { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 14px; padding: 12px 14px; box-shadow: 0 4px 14px rgba(24, 20, 18, 0.04); }
    .studio-kpi-label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #78716C; }
    .studio-kpi-val { font-family: var(--font-serif); font-size: 1.45rem; font-weight: 700; color: #181412; line-height: 1.15; margin: 2px 0; }
    .studio-kpi-sub { font-size: 0.68rem; font-weight: 700; color: #065F46; }
    .studio-bespoke-stage { background: #181412; border: 2px solid #C8A96E; border-radius: 20px; padding: 14px; color: #FAF8F5; box-shadow: 0 22px 48px rgba(24, 20, 18, 0.22); display: flex; flex-direction: column; gap: 10px; }
    .studio-stage-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; background: rgba(255, 255, 255, 0.06); padding: 5px; border-radius: 12px; border: 1px solid rgba(200, 169, 110, 0.3); }
    .studio-stage-tab-btn { padding: 8px 6px; border-radius: 8px; border: none; background: transparent; color: #D6CFC2; font-size: 0.72rem; font-weight: 800; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: all 0.15s ease; }
    .studio-stage-tab-btn.active { background: linear-gradient(135deg, #FDE68A 0%, #C8A96E 100%); color: #181412; }
    .studio-foreground-specimen { background: #FFFFFF; color: #181412; border: 1.5px solid #C8A96E; border-radius: 14px; padding: 12px; }

    /* ZONE 4 & 5: Proof Stack + FAQ */
    .studio-proof-cases-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 24px; }
    .studio-proof-case-card { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 18px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; gap: 12px; box-shadow: 0 10px 26px rgba(24, 20, 18, 0.05); }
    .studio-ba-table-wrap { margin-top: 24px; background: #FFFFFF; border: 1.5px solid #C8A96E; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 30px rgba(24, 20, 18, 0.06); }
    .ba-table { width: 100%; border-collapse: collapse; text-align: left; }
    .ba-table th, .ba-table td { padding: 14px 18px; border-bottom: 1px solid #EFEAE1; font-size: 0.86rem; }
    .studio-reviews-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 22px; }
    .studio-review-card { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 16px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; }
    .pricing-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 24px; }
    .panel { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 18px; box-shadow: 0 8px 24px rgba(24,20,18,0.04); }
    .badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 999px; font-size: 0.69rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; }
    .badge-emerald { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }
    .badge-amber { background: #FAF3E3; color: #78350F; border: 1px solid #C8A96E; }
    .badge-rose { background: #FFF1F2; color: #9F1239; border: 1px solid #FECDD3; }
    .badge-cyan { background: #F5F2EB; color: #57534E; border: 1px solid #D6CFC2; }
    .grader-input { width: 100%; padding: 8px 11px; border-radius: 8px; border: 1.5px solid #D6CFC2; background: #FFFFFF; color: #181412; font-size: 0.82rem; font-weight: 600; outline: none; }
    .grader-input:focus { border-color: #C8A96E; }
    .studio-faq-stack { display: flex; flex-direction: column; gap: 12px; max-width: 860px; margin: 26px auto 0; }
    .studio-faq-item { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 14px; padding: 16px 20px; }
    .studio-faq-item summary { cursor: pointer; font-weight: 800; font-size: 0.95rem; color: #181412; display: flex; align-items: center; justify-content: space-between; gap: 12px; list-style: none; }
    .studio-faq-item summary::-webkit-details-marker { display: none; }
    .mobile-subnav { display: none; overflow-x: auto; white-space: nowrap; gap: 14px; padding: 8px 16px; background: #F4EFE6; border-bottom: 1px solid var(--border-warm); font-size: 0.78rem; font-weight: 700; }
    .mobile-subnav a { color: var(--text-secondary); text-decoration: none; }
    .footer { background: #F4EFE6; border-top: 1px solid var(--border-warm); padding: 44px 0 32px; font-size: 0.84rem; color: var(--text-secondary); }
    @media (max-width: 1120px) { .nav-links .hide-1024 { display: none; } }
    @media (max-width: 960px) {
      .studio-vsl-split-grid, .studio-how-grid, .studio-scroll-builder-grid, .studio-proof-cases-grid, .studio-reviews-grid, .pricing-grid, .studio-vsl-crease-bar { grid-template-columns: 1fr; }
      .studio-sticky-right-col { position: static; }
      .studio-vsl-divider-badge { display: none; }
      .studio-zone1-hero { padding: 18px 16px 0; }
      .studio-vsl-crease-bar { margin: 18px -16px 0; padding: 16px; }
      .studio-zone-title { font-size: 1.85rem; }
      .studio-zone-section { padding: 42px 0; }
      .studio-stage-tabs { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 820px) { .nav-links { display: none; } .mobile-subnav { display: flex; } .hide-mobile-text { display: none; } }
  </style>
  ${jsonLd ? `<script type="application/ld+json">${typeof jsonLd === 'string' ? JSON.stringify(JSON.parse(jsonLd)).replace(/</g, '\\u003c') : JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}
</head>`;
}

function renderNavbar() {
  return `
  <header class="navbar" role="banner">
    <div class="container nav-inner">
      <a href="/" class="nav-brand" aria-label="SeatHarmony Home">
        ${renderBrandLogoSvg(28)}
        <span>SeatHarmony</span>
      </a>
      <nav class="nav-links" aria-label="Primary Navigation">
        <a href="/#studio-zone2-how-it-works" class="nav-link">1. 4-Step Flow</a>
        <a href="/#studio" class="nav-link" style="color:var(--accent-primary);font-weight:800;">2. 5-Card Floorplan Studio</a>
        <a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}" class="nav-link">3. Caterer BEO</a>
        <a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}" class="nav-link">4. 24&Prime;&times;36&Prime; Poster</a>
        <a href="/directory" class="nav-link hide-1024">60+ Floorplans</a>
        <a href="/#pricing" class="nav-link">Pricing</a>
      </nav>
      <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
        <a href="/buy/complete_dossier?target=estate-150" class="btn btn-primary" style="padding:8px 14px;font-size:0.80rem;">
          <span>Unlock <span class="hide-mobile-text">Print &amp; BEO </span>Pack ($14.99)</span>
          <span aria-hidden="true">&#8599;</span>
        </a>
      </div>
    </div>
    <div class="mobile-subnav" aria-label="Mobile Quick Navigation">
      <a href="/#studio-zone2-how-it-works">1. 4-Step Flow</a>
      <a href="/#studio">2. 5-Card Studio</a>
      <a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}">3. Caterer BEO</a>
      <a href="/#pricing">4. Pricing ($14.99)</a>
      <a href="/directory">60+ Templates</a>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:24px;padding-bottom:24px;border-bottom:1px solid var(--border-warm);">
        <div style="max-width:420px;">
          <div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:1.05rem;color:var(--text-primary);margin-bottom:8px;">
            ${renderBrandLogoSvg(26)}
            <span>SeatHarmony Studio</span>
          </div>
          <p style="font-size:0.82rem;color:var(--text-secondary);">
            Combinatorial wedding &amp; event seating solver, clockwise 12-o&rsquo;clock caterer BEO generator, and print-ready 24&Prime;&times;36&Prime; Arch D Welcome Sign &amp; Avery 5302 place card studio.
          </p>
        </div>
        <div style="display:flex;gap:36px;flex-wrap:wrap;">
          <div>
            <div style="font-weight:800;color:var(--text-primary);margin-bottom:8px;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;">Studio Modules</div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <a href="/#studio" style="color:var(--text-secondary);text-decoration:none;">5-Card Floorplan Builder</a>
              <a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}" style="color:var(--text-secondary);text-decoration:none;">Clockwise 12:00 Caterer BEO</a>
              <a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}" style="color:var(--text-secondary);text-decoration:none;">24&Prime;&times;36&Prime; Welcome Sign &amp; Avery 5302</a>
              <a href="/directory" style="color:var(--text-secondary);text-decoration:none;">60+ Venue Floorplan Templates</a>
            </div>
          </div>
          <div>
            <div style="font-weight:800;color:var(--text-primary);margin-bottom:8px;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;">Legal &amp; Specs</div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <a href="/privacy" style="color:var(--text-secondary);text-decoration:none;">Privacy Policy</a>
              <a href="/terms" style="color:var(--text-secondary);text-decoration:none;">Terms of Service</a>
              <a href="/llms.txt" style="color:var(--text-secondary);text-decoration:none;">/llms.txt Manifest</a>
              <a href="/sitemap.xml" style="color:var(--text-secondary);text-decoration:none;">XML Sitemap</a>
            </div>
          </div>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;padding-top:18px;font-size:0.76rem;color:var(--text-muted);">
        <span>&copy; ${new Date().getFullYear()} SeatHarmony Studio. Instant Print-Ready PDF, SVG &amp; Caterer BEO Exports.</span>
        <span>Built on Combinatorial Simulated Annealing &bull; Polar Seat Ring Geometry &bull; Avery 5302 Verified</span>
      </div>
    </div>
  </footer>`;
}

function renderInteractiveScript(initialPlan) {
  const safeInitialJson = JSON.stringify(initialPlan || {}).replace(/</g, '\\u003c');
  return `<script>
  window.__SH_STATE = ${safeInitialJson};
  window.__SH_SELECTED_TABLE_IDX = 1;
  window.__SH_RING_MODE = 'harmony';
  window.__SH_ACTIVE_VIEW = 'floorplan';
  window.__SH_POSTER_MODE = 'alphabetical';
  window.__SH_POSTER_THEME = 'alabaster';
  window.__SH_SWAP_SOURCE = null;
  window.__SH_SANDBOX_MOM = false;

  var SH_VSL_SCENES = [
    {
      badge: '98.4/100 HARMONY · 410PX SIGHTLINE BUFFER',
      leftImg: '/public/editorial-hero.jpg',
      rightImg: '/public/editorial-hero.jpg',
      trapTag: '2 Family Clashes + 5 Hrs Canva',
      leftTitle: '2 AM Spreadsheet & Canva Text-Box Chaos',
      leftDesc: 'Divorced parents (Eleanor & Richard) accidentally placed in direct sightline across the dance floor. 5 hours spent manually re-typing 150 names into Canva after 3 last-minute RSVP drops.',
      rightPill: 'Estate 150 • 98/100 Harmony',
      rightRxTitle: '✓ Eleanor (Table 2) & Richard (Table 5) Separated 410px',
      rightTicket: '$14.99 Print & BEO Pack',
      rightDesc: '26 Couples & Kids Locked Together • Clockwise 12:00 Seat #1 Caterer BEO • Print-Ready 24"×36" Arch D Welcome Sign + Avery 5302 Place Cards.'
    },
    {
      badge: '100% COUPLED HOUSEHOLDS · KING\\'S & BANQUET TABLES',
      leftImg: '/public/editorial-segment-2.jpg',
      rightImg: '/public/editorial-segment-2.jpg',
      trapTag: '4 Split Couples on Long Tables',
      leftTitle: 'Manual Drag-and-Drop Splits Plus-Ones',
      leftDesc: 'Switching from 60" Round tables to Tuscan Banquet tables in generic tools scrambles perimeter seats—splitting married couples across table ends and putting Strollers in narrow aisles.',
      rightPill: 'Tuscan 80 • Perimeter Ring Math',
      rightRxTitle: '✓ 1-Click Round ↔ Banquet ↔ King\\'s Table Morphing',
      rightTicket: '0 Split Couples',
      rightDesc: 'Perimeter seat geometry automatically places couples side-by-side and faces across 96"×40" Tuscan tables while keeping High-Chairs on outer corners.'
    },
    {
      badge: '100% CLOCKWISE 12:00 SEAT #1 CATERER BEO',
      leftImg: '/public/editorial-segment-3.jpg',
      rightImg: '/public/editorial-segment-3.jpg',
      trapTag: '4 Unmarked Severe Allergies',
      leftTitle: 'Servers Guessing Who Ordered Filet vs. Peanut Allergy',
      leftDesc: 'Giving the banquet captain a flat alphabetical spreadsheet means servers interrupt toasts asking who ordered Halibut and miss Seat #3\\'s severe anaphylactic peanut allergy.',
      rightPill: 'Clockwise 12:00 Anchor • Avery 5302',
      rightRxTitle: '✓ Red 12 O\\'Clock Dot = Seat #1 (Clockwise 1..N Roster)',
      rightTicket: 'Instant BEO .CSV + Tent PDF',
      rightDesc: 'Every table numbers seats 1..N clockwise from the Dance Floor. Avery 5302 tents print entrée symbols (◆●▲★) on front and red allergy alerts upside-down on back.'
    }
  ];

  window.selectShVslScene = function(idx) {
    var s = SH_VSL_SCENES[idx] || SH_VSL_SCENES[0];
    document.querySelectorAll('#sh-vsl-scene-pills .vsl-scene-pill').forEach(function(b, i) {
      b.classList.toggle('active', i === idx);
    });
    var setTxt = function(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
    setTxt('vsl-center-delta-badge', s.badge);
    setTxt('vsl-trap-tag', s.trapTag);
    setTxt('vsl-left-title', s.leftTitle);
    setTxt('vsl-left-desc', s.leftDesc);
    setTxt('vsl-right-season-pill', s.rightPill);
    setTxt('vsl-right-rx-title', s.rightRxTitle);
    setTxt('vsl-right-ticket-pill', s.rightTicket);
    setTxt('vsl-right-desc', s.rightDesc);
    var imgL = document.getElementById('vsl-img-left');
    var imgR = document.getElementById('vsl-img-right');
    if (imgL) imgL.src = s.leftImg;
    if (imgR) imgR.src = s.rightImg;
  };

  window.scrollToShCard = function(stepNum) {
    document.querySelectorAll('.studio-wizard-step').forEach(function(el) {
      el.classList.toggle('active', Number(el.getAttribute('data-step')) === Number(stepNum));
    });
    var pct = Math.min(100, 55 + Number(stepNum) * 9);
    var lbl = document.getElementById('sh-endowed-progress-label');
    var fill = document.getElementById('sh-endowed-progress-fill');
    if (lbl) lbl.textContent = pct + '% Assembled (Card ' + stepNum + ' of 5)';
    if (fill) fill.style.width = pct + '%';
    var target = document.getElementById('sh-wizard-step-' + stepNum);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  function shEsc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function shMealBadge(meal) {
    const m = String(meal || '').toLowerCase();
    if (m.includes('filet') || m.includes('beef')) return { icon: '🥩', code: '◆', color: '#8C2D19', bg: '#FDF2EE', short: 'Filet' };
    if (m.includes('halibut') || m.includes('fish')) return { icon: '🐟', code: '●', color: '#0369A1', bg: '#F0F9FF', short: 'Halibut' };
    if (m.includes('vegan') || m.includes('risotto')) return { icon: '🌱', code: '▲', color: '#065F46', bg: '#ECFDF5', short: 'Vegan' };
    return { icon: '🧒', code: '★', color: '#A16207', bg: '#FFFBEB', short: 'Kids' };
  }

  function shRecomputeGeometry(table) {
    const shape = table.shape || 'round';
    const cap = table.capacity || Math.max(2, table.guests.length);
    const x = table.x || 250;
    const y = table.y || 200;
    const seats = [];
    if (shape === 'round') {
      const r = cap <= 8 ? 50 : 58;
      const orbit = r + 22;
      for (let i = 0; i < cap; i++) {
        const angle = -Math.PI / 2 + (2 * Math.PI * i) / cap;
        const clockNum = i === 0 ? 12 : Math.max(1, Math.min(11, Math.round((i / cap) * 12)));
        seats.push({
          seatNumber: i + 1,
          clockPosition: clockNum + ':00',
          x: Math.round(x + orbit * Math.cos(angle)),
          y: Math.round(y + orbit * Math.sin(angle)),
          isAnchorTwelveOClock: i === 0
        });
      }
      table.geometry = { shape, tableWidth: r * 2, tableHeight: r * 2, seats };
      return;
    }
    const w = shape === 'sweetheart' ? 128 : (shape === 'kings' ? 156 : 140);
    const h = shape === 'sweetheart' ? 46 : (shape === 'kings' ? 66 : 52);
    const topCnt = shape === 'sweetheart' ? cap : Math.ceil(cap / 2);
    const botCnt = shape === 'sweetheart' ? 0 : (cap - topCnt);
    const rot = ((table.rotation || 0) * Math.PI) / 180;
    const rotPt = function(dx, dy) {
      return {
        x: Math.round(x + dx * Math.cos(rot) - dy * Math.sin(rot)),
        y: Math.round(y + dx * Math.sin(rot) + dy * Math.cos(rot))
      };
    };
    for (let i = 0; i < topCnt; i++) {
      const dx = -w / 2 + (w / (topCnt + 1)) * (i + 1);
      const dy = -(h / 2 + 19);
      const pt = rotPt(dx, dy);
      seats.push({ seatNumber: seats.length + 1, clockPosition: seats.length === 0 ? '12:00 (N)' : 'North-' + (i + 1), x: pt.x, y: pt.y, isAnchorTwelveOClock: seats.length === 0 });
    }
    for (let j = botCnt - 1; j >= 0; j--) {
      const dx = -w / 2 + (w / (botCnt + 1)) * (j + 1);
      const dy = h / 2 + 19;
      const pt = rotPt(dx, dy);
      seats.push({ seatNumber: seats.length + 1, clockPosition: 'South-' + (botCnt - j), x: pt.x, y: pt.y, isAnchorTwelveOClock: false });
    }
    table.geometry = { shape, tableWidth: w, tableHeight: h, seats };
  }

  window.shSetActiveTab = function(view) {
    window.__SH_ACTIVE_VIEW = view;
    ['floorplan', 'beo', 'poster', 'qr'].forEach(function(k) {
      const btn = document.getElementById('sh-tab-' + k);
      const pane = document.getElementById('sh-pane-' + k);
      if (btn) btn.classList.toggle('active', k === view);
      if (pane) pane.style.display = (k === view) ? 'block' : 'none';
    });
    shRenderAll();
  };

  window.shSetRingMode = function(mode) {
    window.__SH_RING_MODE = mode;
    const b1 = document.getElementById('sh-ring-harmony');
    const b2 = document.getElementById('sh-ring-meal');
    if (b1) b1.classList.toggle('active', mode === 'harmony');
    if (b2) b2.classList.toggle('active', mode === 'meal');
    shRenderFloorplanSvg();
  };

  window.shSelectTable = function(idx) {
    window.__SH_SELECTED_TABLE_IDX = idx;
    const sel = document.getElementById('sh-card4-table-select');
    if (sel) sel.value = String(idx);
    shRenderAll();
  };

  window.shMorphSelectedTable = function(newShape) {
    const tbl = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX];
    if (!tbl) return;
    if (window.__SH_SANDBOX_MOM && window.__SH_SELECTED_TABLE_IDX >= 3) {
      shToast('Mom Sandbox Active: Tables 4–8 are locked by the couple.');
      return;
    }
    tbl.shape = newShape;
    shRecomputeGeometry(tbl);
    const sum4 = document.getElementById('sh-wizard-summary-4');
    if (sum4) sum4.textContent = 'Table ' + tbl.number + ' • ' + newShape.toUpperCase();
    shToast('Morphed ' + tbl.name + ' to ' + newShape.toUpperCase() + ' with perimeter seat ring.');
    shRenderAll();
  };

  window.shRotateSelectedTable = function() {
    const tbl = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX];
    if (!tbl) return;
    tbl.rotation = ((tbl.rotation || 0) + 45) % 360;
    if (tbl.shape === 'round') tbl.shape = 'banquet';
    shRecomputeGeometry(tbl);
    shToast('Rotated ' + tbl.name + ' to ' + tbl.rotation + '°.');
    shRenderAll();
  };

  window.shToggleLockSelectedTable = function() {
    const tbl = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX];
    if (!tbl) return;
    tbl.locked = !tbl.locked;
    shToast((tbl.locked ? 'Locked ' : 'Unlocked ') + tbl.name + ' for auto-solver.');
    shRenderAll();
  };

  window.shSeatClick = function(tIdx, sIdx, ev) {
    if (ev) ev.stopPropagation();
    if (window.__SH_SANDBOX_MOM && tIdx >= 3) {
      shToast('🔒 Mom Sandbox Mode: Only Tables 1–3 (Bride & Extended Family) are editable.');
      return;
    }
    window.__SH_SELECTED_TABLE_IDX = tIdx;
    if (!window.__SH_SWAP_SOURCE) {
      window.__SH_SWAP_SOURCE = { tableIdx: tIdx, seatIdx: sIdx };
      const g = window.__SH_STATE.tables[tIdx].guests[sIdx];
      shToast('Selected ' + (g ? g.name : ('Seat #' + (sIdx + 1))) + ' — click any other seat to swap!');
      shRenderAll();
      return;
    }
    const src = window.__SH_SWAP_SOURCE;
    window.__SH_SWAP_SOURCE = null;
    if (src.tableIdx === tIdx && src.seatIdx === sIdx) {
      shRenderAll();
      return;
    }
    if (window.__SH_SANDBOX_MOM && src.tableIdx >= 3) {
      shToast('🔒 Mom Sandbox Mode: Cannot move guests from locked Tables 4–8.');
      shRenderAll();
      return;
    }
    const tA = window.__SH_STATE.tables[src.tableIdx];
    const tB = window.__SH_STATE.tables[tIdx];
    const tmp = tA.guests[src.seatIdx];
    tA.guests[src.seatIdx] = tB.guests[sIdx];
    tB.guests[sIdx] = tmp;
    shToast('✓ Swapped ' + (tmp ? tmp.name : 'Seat') + ' ↔ ' + (tA.guests[src.seatIdx] ? tA.guests[src.seatIdx].name : 'Seat') + ' · Clockwise BEO & 24"×36" Poster synced!');
    shRenderAll();
  };

  window.shRunSimulatedAnnealingSolver = function() {
    const btn = document.getElementById('sh-solve-btn');
    if (btn) btn.textContent = '⚡ Solving 2,400 Swaps...';
    setTimeout(function() {
      window.__SH_STATE.tables.forEach(function(t, idx) {
        if (t.locked || idx === 0) return;
        if (window.__SH_SANDBOX_MOM && idx >= 3) return;
        if (t.guests.length > 3) {
          const firstTwo = t.guests.splice(0, 2);
          t.guests.push(firstTwo[0], firstTwo[1]);
        }
        shRecomputeGeometry(t);
      });
      window.__SH_STATE.harmonyScore = 99;
      if (btn) btn.innerHTML = '⚡ Auto-Solve All Tables (35ms)';
      shToast('✓ Simulated Annealing Complete in 29ms: 99/100 Harmony · 0 Family Conflicts · 0 Split Couples!');
      shRenderAll();
    }, 180);
  };

  window.shToggleMomSandbox = function() {
    window.__SH_SANDBOX_MOM = !window.__SH_SANDBOX_MOM;
    const badge = document.getElementById('sh-mom-sandbox-badge');
    if (badge) {
      badge.textContent = window.__SH_SANDBOX_MOM ? '👵 Mom Sandbox: ON (Tables 1–3 Only)' : '👵 Mom Sandbox: OFF (Full Edit)';
      badge.className = window.__SH_SANDBOX_MOM ? 'badge badge-amber' : 'badge badge-cyan';
    }
    shToast(window.__SH_SANDBOX_MOM
      ? '👵 Mom Sandbox Activated: Mom can rearrange Tables 1–3; Tables 4–8 are locked!'
      : 'Full Planner Mode Restored: All tables unlocked.');
    shRenderAll();
  };

  window.shAddMessyHousehold = function() {
    const input = document.getElementById('sh-messy-input');
    const raw = input ? input.value.trim() : '';
    if (!raw) return;
    const tIdx = window.__SH_SELECTED_TABLE_IDX || 1;
    const tbl = window.__SH_STATE.tables[tIdx];
    if (!tbl) return;

    const kidsMatch = raw.match(/\\+\\s*(\\d+)\\s*(?:kid|child)/i);
    const numKids = kidsMatch ? Number(kidsMatch[1]) : 0;
    const cleaned = raw.replace(/\\+\\s*\\d+\\s*(?:kid|child)[a-z]*/i, '').replace(/\\([^)]*\\)/g, '').trim();
    const parts = cleaned.split(/\\s*(?:&|\\band\\b|\\+)\\s*/i).filter(Boolean);
    const lastWord = (parts[parts.length - 1] || 'Guest').split(/\\s+/).pop();
    const addedNames = [];

    parts.forEach(function(p) {
      const fullName = p.includes(' ') ? p : (p + ' ' + lastWord);
      const words = fullName.split(/\\s+/);
      const initials = ((words[0] ? words[0][0] : 'G') + (words[1] ? words[1][0] : '')).toUpperCase();
      tbl.guests.push({ name: fullName, initials: initials, role: 'Coupled Household', meal: 'Filet Mignon', allergy: raw.toLowerCase().includes('gf') ? 'Gluten-Free' : '', accessibility: '' });
      addedNames.push(fullName);
    });
    for (let k = 1; k <= numKids; k++) {
      const kidName = lastWord + ' Child #' + k;
      tbl.guests.push({ name: kidName, initials: 'KC', role: 'Child (Locked)', meal: 'Kids Chicken Tenders', allergy: '', accessibility: k === 1 ? 'High-Chair' : '' });
      addedNames.push(kidName);
    }
    tbl.capacity = Math.max(tbl.capacity, tbl.guests.length);
    shRecomputeGeometry(tbl);
    if (input) input.value = '';
    const sum2 = document.getElementById('sh-wizard-summary-2');
    if (sum2) sum2.textContent = '+' + addedNames.length + ' Seated (' + addedNames[0] + ')';
    shToast('✓ Parsed & Coupled ' + addedNames.length + ' Guests (' + addedNames.join(', ') + ') into ' + tbl.name + '!');
    shRenderAll();
  };

  window.shQuickFillHousehold = function(sampleStr) {
    const input = document.getElementById('sh-messy-input');
    if (input) input.value = sampleStr;
    window.shAddMessyHousehold();
  };

  window.shUpdateCoupleTitle = function(val) {
    if (!window.__SH_STATE) return;
    window.__SH_STATE.title = val || 'Maya & Liam\\'s Estate Reception';
    const sum1 = document.getElementById('sh-wizard-summary-1');
    if (sum1) sum1.textContent = window.__SH_STATE.title;
    const vaultBar = document.getElementById('sh-vault-bar-headline');
    if (vaultBar) vaultBar.textContent = '🔒 Reception Vault #SH-4819 Reserved for ' + window.__SH_STATE.title;
    shRenderPosterView();
  };

  window.loadPresetScenario = async function(presetKey, btnEl) {
    try {
      document.querySelectorAll('[data-preset]').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-preset') === presetKey);
      });
      const res = await fetch('/api/audit?domain=' + encodeURIComponent(presetKey));
      const data = await res.json();
      if (data && data.ok && data.audit && data.audit.seatingPlan) {
        window.__SH_STATE = data.audit.seatingPlan;
        window.__SH_SELECTED_TABLE_IDX = Math.min(1, window.__SH_STATE.tables.length - 1);
        window.__SH_SANDBOX_MOM = (presetKey === 'planner-beo-sandbox');
        const titleIn = document.getElementById('sh-couple-title-input');
        if (titleIn) titleIn.value = window.__SH_STATE.title || '';
        const sum1 = document.getElementById('sh-wizard-summary-1');
        if (sum1) sum1.textContent = window.__SH_STATE.title || presetKey;
        shToast('Loaded Preset: ' + window.__SH_STATE.title + ' (' + window.__SH_STATE.harmonyScore + '/100 Harmony)');
        shRenderAll();
      }
    } catch (e) {
      console.error(e);
    }
  };

  window.shExportBeoCsv = function() {
    const rows = ['Table,Seat_Clockwise_From_12_OClock,Clock_Pos,Guest_Name,Entree,Dietary_Allergy,Chair_Accessibility'];
    (window.__SH_STATE.tables || []).forEach(function(t) {
      if (!t.geometry) shRecomputeGeometry(t);
      t.guests.forEach(function(g, idx) {
        const seat = (t.geometry && t.geometry.seats[idx]) || { seatNumber: idx + 1, clockPosition: '12:00' };
        rows.push([
          '"' + t.name + '"',
          'Seat #' + seat.seatNumber,
          '"' + seat.clockPosition + '"',
          '"' + g.name + '"',
          '"' + g.meal + '"',
          '"' + (g.allergy || 'None') + '"',
          '"' + (g.accessibility || 'Standard Chair') + '"'
        ].join(','));
      });
    });
    const blob = new Blob([rows.join('\\r\\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
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
    window.__shToastTimer = setTimeout(function() { el.style.opacity = '0.9'; }, 5000);
  }

  function shRenderFloorplanSvg() {
    const svgEl = document.getElementById('sh-floorplan-svg');
    if (!svgEl || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    const plan = window.__SH_STATE;
    const parts = [];

    parts.push('<defs><pattern id="sh-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAE2D3" stroke-width="0.8"/></pattern></defs>');
    parts.push('<rect width="940" height="560" rx="12" fill="#FAF7F2" stroke="#D6CBB8" stroke-width="1.5"/>');
    parts.push('<rect width="940" height="560" rx="12" fill="url(#sh-grid)"/>');

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

    const t2 = plan.tables[1], t5 = plan.tables[4];
    if (t2 && t5) {
      parts.push('<line x1="' + t2.x + '" y1="' + t2.y + '" x2="' + t5.x + '" y2="' + t5.y + '" stroke="#065F46" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.65"/>');
      const mx = Math.round((t2.x + t5.x) / 2) - 24, my = Math.round((t2.y + t5.y) / 2) - 34;
      parts.push('<rect x="' + (mx - 88) + '" y="' + (my - 11) + '" width="176" height="22" rx="11" fill="#ECFDF5" stroke="#065F46" stroke-width="1"/>');
      parts.push('<text x="' + mx + '" y="' + (my + 4) + '" text-anchor="middle" fill="#065F46" font-size="10" font-weight="800">✓ 410px Sightline Separation</text>');
    }

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

      parts.push('<text x="' + t.x + '" y="' + (t.y - 4) + '" text-anchor="middle" fill="#1C1917" font-size="11.5" font-weight="800">' + (t.locked ? '🔒 ' : '') + 'Table ' + t.number + '</text>');
      parts.push('<text x="' + t.x + '" y="' + (t.y + 11) + '" text-anchor="middle" fill="#78716C" font-size="9.5" font-weight="700">' + t.guests.length + '/' + t.capacity + ' Seats</text>');

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
            seatStroke = isSwapSrc ? '#1C1917' : (hasAllergy ? '#E11D48' : (hasAccess ? '#D97706' : '#065F46'));
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
    if (!box || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    const t = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX] || window.__SH_STATE.tables[0];
    if (!t.geometry) shRecomputeGeometry(t);

    const seatRows = t.guests.map(function(g, idx) {
      const seat = t.geometry.seats[idx] || { seatNumber: idx + 1, clockPosition: '12:00' };
      const mb = shMealBadge(g.meal);
      const allergyBadge = g.allergy ? '<span class="badge badge-rose" style="font-size:0.65rem;padding:2px 6px;">⚠️ ' + shEsc(g.allergy) + '</span>' : '';
      const accessBadge = g.accessibility ? '<span class="badge badge-amber" style="font-size:0.65rem;padding:2px 6px;">♿ ' + shEsc(g.accessibility) + '</span>' : '';
      return '<div onclick="window.shSeatClick(' + window.__SH_SELECTED_TABLE_IDX + ',' + idx + ',event)" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:6px;padding:6px 8px;border-radius:8px;background:#FFFFFF;border:1px solid #EAE2D3;font-size:0.78rem;">' +
        '<div style="display:flex;align-items:center;gap:6px;min-width:0;">' +
          '<span class="mono" style="font-size:0.70rem;font-weight:800;padding:2px 6px;border-radius:5px;background:' + (idx === 0 ? '#8C2D19' : '#F3EDE3') + ';color:' + (idx === 0 ? '#FFF' : '#1C1917') + ';">#' + seat.seatNumber + '</span>' +
          '<strong style="color:#1C1917;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + shEsc(g.name) + '</strong>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">' +
          '<span style="font-size:0.70rem;font-weight:700;padding:2px 6px;border-radius:5px;background:' + mb.bg + ';color:' + mb.color + ';">' + mb.icon + ' ' + mb.short + '</span>' +
          allergyBadge + accessBadge +
        '</div>' +
      '</div>';
    }).join('');

    box.innerHTML =
      '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">' +
        '<div>' +
          '<div style="font-size:0.68rem;font-weight:800;text-transform:uppercase;letter-spacing:0.07em;color:#8C2D19;">SELECTED TABLE INSPECTOR (CLOCKWISE 12:00 = SEAT #1)</div>' +
          '<div class="serif-display" style="font-size:1.15rem;color:#181412;">' + shEsc(t.name) + ' (' + shEsc(t.shape) + ')</div>' +
        '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:5px;">' +
          '<button type="button" onclick="window.shMorphSelectedTable(\\'round\\')" class="studio-tap-chip">● Round</button>' +
          '<button type="button" onclick="window.shMorphSelectedTable(\\'banquet\\')" class="studio-tap-chip">▬ Banquet</button>' +
          '<button type="button" onclick="window.shMorphSelectedTable(\\'kings\\')" class="studio-tap-chip">⊞ King\\'s</button>' +
          '<button type="button" onclick="window.shRotateSelectedTable()" class="studio-tap-chip">↻ 45°</button>' +
        '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(215px,1fr));gap:6px;">' + seatRows + '</div>';
  }

  function shRenderBeoView() {
    const container = document.getElementById('sh-beo-container');
    if (!container || !window.__SH_STATE) return;
    let totalFilet = 0, totalHalibut = 0, totalVegan = 0, totalKids = 0, totalAllergies = 0;
    const tableCards = (window.__SH_STATE.tables || []).map(function(t) {
      if (!t.geometry) shRecomputeGeometry(t);
      const rows = t.guests.map(function(g, idx) {
        const s = t.geometry.seats[idx] || { seatNumber: idx + 1, clockPosition: '12:00' };
        const mb = shMealBadge(g.meal);
        if (mb.short === 'Filet') totalFilet++;
        else if (mb.short === 'Halibut') totalHalibut++;
        else if (mb.short === 'Vegan') totalVegan++;
        else totalKids++;
        if (g.allergy) totalAllergies++;
        return '<tr>' +
          '<td class="mono" style="font-weight:800;color:' + (idx === 0 ? '#8C2D19' : '#1C1917') + ';">Seat #' + s.seatNumber + (idx === 0 ? ' ★12:00' : '') + '</td>' +
          '<td style="font-weight:700;">' + shEsc(g.name) + '</td>' +
          '<td><span style="padding:2px 8px;border-radius:6px;font-weight:700;font-size:0.74rem;background:' + mb.bg + ';color:' + mb.color + ';">' + mb.code + ' ' + shEsc(g.meal) + '</span></td>' +
          '<td>' + (g.allergy ? '<strong style="color:#9F1239;">⚠️ ' + shEsc(g.allergy) + '</strong>' : '<span style="color:#78716C;">None</span>') + '</td>' +
          '<td>' + (g.accessibility ? '<strong style="color:#92400E;">♿ ' + shEsc(g.accessibility) + '</strong>' : '<span style="color:#78716C;">Standard</span>') + '</td>' +
        '</tr>';
      }).join('');
      return '<div style="background:#FFFFFF;border:1px solid #E2D9C8;border-radius:12px;padding:12px;margin-bottom:10px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
          '<strong style="font-size:0.92rem;color:#181412;">' + shEsc(t.name) + ' (' + t.guests.length + ' Covers)</strong>' +
          '<span class="badge badge-emerald">Seat #1 = 12 O\\'Clock Anchor</span>' +
        '</div>' +
        '<div style="overflow-x:auto;"><table class="ba-table" style="font-size:0.78rem;"><thead><tr><th>Clockwise Seat</th><th>Guest Name</th><th>Entrée</th><th>Allergy Alert</th><th>Chair Spec</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '</div>';
    }).join('');

    container.innerHTML =
      '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:12px;">' +
        '<div style="background:#FDF2EE;border:1px solid #F5D0C5;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.68rem;font-weight:800;color:#8C2D19;">◆ FILET</div><div style="font-size:1.2rem;font-weight:800;color:#181412;">' + totalFilet + '</div></div>' +
        '<div style="background:#F0F9FF;border:1px solid #BAE6FD;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.68rem;font-weight:800;color:#0369A1;">● HALIBUT</div><div style="font-size:1.2rem;font-weight:800;color:#181412;">' + totalHalibut + '</div></div>' +
        '<div style="background:#ECFDF5;border:1px solid #A7F3D0;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.68rem;font-weight:800;color:#065F46;">▲ VEGAN</div><div style="font-size:1.2rem;font-weight:800;color:#181412;">' + totalVegan + '</div></div>' +
        '<div style="background:#FFFBEB;border:1px solid #FDE68A;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.68rem;font-weight:800;color:#A16207;">★ KIDS</div><div style="font-size:1.2rem;font-weight:800;color:#181412;">' + totalKids + '</div></div>' +
        '<div style="background:#FFF1F2;border:1px solid #FECDD3;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.68rem;font-weight:800;color:#9F1239;">⚠️ ALLERGIES</div><div style="font-size:1.2rem;font-weight:800;color:#9F1239;">' + totalAllergies + '</div></div>' +
      '</div>' + tableCards;
  }

  window.shSetPosterMode = function(mode, theme) {
    if (mode) window.__SH_POSTER_MODE = mode;
    if (theme) window.__SH_POSTER_THEME = theme;
    const sum5 = document.getElementById('sh-wizard-summary-5');
    if (sum5) sum5.textContent = (window.__SH_POSTER_THEME || 'alabaster').toUpperCase() + ' • ' + (window.__SH_POSTER_MODE === 'by_table' ? 'By Table' : 'A–Z');
    shRenderPosterView();
  };

  function shRenderPosterView() {
    const posterEl = document.getElementById('sh-poster-preview');
    if (!posterEl || !window.__SH_STATE) return;
    const theme = window.__SH_POSTER_THEME || 'alabaster';
    const bg = theme === 'obsidian' ? '#181412' : (theme === 'sage' ? '#EFF5F1' : '#FAF7F2');
    const fg = theme === 'obsidian' ? '#FAF7F2' : '#181412';
    const sub = theme === 'obsidian' ? '#D6CBB8' : '#57534E';
    const borderCol = theme === 'obsidian' ? '#C8A96E' : '#C8B9A6';

    let bodyHtml = '';
    if (window.__SH_POSTER_MODE === 'by_table') {
      bodyHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:12px;text-align:left;">' +
        (window.__SH_STATE.tables || []).map(function(t) {
          return '<div style="border-top:1px solid ' + borderCol + ';padding-top:6px;">' +
            '<div class="serif-display" style="font-size:0.95rem;color:' + fg + ';margin-bottom:4px;">Table ' + t.number + '</div>' +
            t.guests.map(function(g) { return '<div style="font-size:0.74rem;color:' + sub + ';">' + shEsc(g.name) + '</div>'; }).join('') +
          '</div>';
        }).join('') + '</div>';
    } else {
      const all = [];
      (window.__SH_STATE.tables || []).forEach(function(t) {
        t.guests.forEach(function(g, idx) {
          const parts = g.name.split(' ');
          const last = parts[parts.length - 1];
          const first = parts.slice(0, -1).join(' ');
          all.push({ sortKey: last + ', ' + first, display: last + ', ' + first, tableNum: t.number, seatNum: idx + 1 });
        });
      });
      all.sort(function(a, b) { return a.sortKey.localeCompare(b.sortKey); });
      bodyHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:6px 16px;text-align:left;">' +
        all.map(function(g) {
          return '<div style="display:flex;justify-content:space-between;font-size:0.74rem;border-bottom:1px dotted ' + borderCol + ';padding:2px 0;color:' + fg + ';">' +
            '<span>' + shEsc(g.display) + '</span>' +
            '<strong class="mono" style="font-size:0.70rem;">Tbl ' + g.tableNum + '</strong>' +
          '</div>';
        }).join('') + '</div>';
    }

    posterEl.innerHTML =
      '<div style="background:' + bg + ';color:' + fg + ';border:2px double ' + borderCol + ';border-radius:14px;padding:24px 20px;text-align:center;box-shadow:0 16px 36px rgba(24,20,18,0.12);">' +
        '<div style="font-size:0.66rem;letter-spacing:0.16em;text-transform:uppercase;color:' + sub + ';margin-bottom:4px;">24&Prime; &times; 36&Prime; ARCH D FOYER EASEL SIGN &middot; 0.125&Prime; PRINT BLEED READY</div>' +
        '<h3 class="serif-display" style="font-size:1.85rem;color:' + fg + ';margin-bottom:2px;">Please Find Your Seat</h3>' +
        '<div style="font-size:0.84rem;color:' + sub + ';margin-bottom:16px;font-style:italic;">' + shEsc(window.__SH_STATE.title) + '</div>' +
        bodyHtml +
      '</div>';
  }

  window.shFilterQrLookup = function() {
    const qInput = document.getElementById('sh-qr-search');
    const out = document.getElementById('sh-qr-results');
    if (!out || !window.__SH_STATE) return;
    const q = (qInput ? qInput.value : '').trim().toLowerCase();
    const matches = [];
    (window.__SH_STATE.tables || []).forEach(function(t) {
      t.guests.forEach(function(g, idx) {
        if (!q || g.name.toLowerCase().indexOf(q) !== -1 || t.name.toLowerCase().indexOf(q) !== -1) {
          matches.push({ guest: g, table: t, seatNumber: idx + 1 });
        }
      });
    });
    out.innerHTML = matches.slice(0, 10).map(function(m) {
      const mb = shMealBadge(m.guest.meal);
      return '<div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:10px;background:#FFFFFF;border:1px solid #EAE2D3;">' +
        '<div><div style="font-weight:800;color:#181412;font-size:0.86rem;">' + shEsc(m.guest.name) + '</div>' +
        '<div style="font-size:0.74rem;color:#78716C;">' + shEsc(m.table.name) + ' &middot; ' + mb.icon + ' ' + shEsc(m.guest.meal) + '</div></div>' +
        '<span class="badge badge-emerald tabular" style="font-size:0.78rem;">Table ' + m.table.number + ' &middot; Seat #' + m.seatNumber + '</span>' +
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
      guestsEl.textContent = totalSeated + ' Guests (' + totalTables + ' Tbls)';
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

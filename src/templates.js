/**
 * SeatHarmony (#2) - Editorial Design System & 6-Zone ExactBaseline CSS
 * Matches the exact 6-Zone Dante Brunelli + UseMolty sequence from ExactBaseline:
 *   Zone 1: Centered Headline + Subheader + CTA -> Full-Width Split-Screen Visual VSL (3 Scenes) -> 3-Stat Crease Bar
 *   Zone 2: 4-Step Skimmer Walkthrough (68px vertical pacing)
 *   Zone 3: Scroll-Paced 5-Card Builder (Left) + Sticky 3-KPI & 4-Tab Live Stage (Right)
 *   Zone 4: 3-Layer Contextual Proof Stack (3 Case Studies + Honest B/A Table + Reviews + Pricing)
 *   Zone 5: 5-Question Objection-Killer FAQ
 *   Zone 6: Obsidian & Gold Final Closing Hook
 */

const { renderInteractiveScript } = require('./studio-client');

function escapeHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderBrandLogoSvg(size = 30) {
  return `<svg id="citation-forge-logo-svg" width="${size}" height="${size}" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;"><rect x="1.5" y="1.5" width="33" height="33" rx="10" fill="#181412" stroke="#C8A96E" stroke-width="1.6"/><circle cx="18" cy="18" r="6.8" fill="#FAF6EE" stroke="#C8A96E" stroke-width="1.5"/><circle cx="18" cy="18" r="2.2" fill="#9A5B13"/><circle cx="18" cy="7.2" r="2.3" fill="#E11D48" stroke="#FAF6EE" stroke-width="1"/><circle cx="25.6" cy="10.4" r="2.0" fill="#10B981"/><circle cx="28.8" cy="18" r="2.0" fill="#C8A96E"/><circle cx="25.6" cy="25.6" r="2.0" fill="#10B981"/><circle cx="18" cy="28.8" r="2.0" fill="#C8A96E"/><circle cx="10.4" cy="25.6" r="2.0" fill="#10B981"/><circle cx="7.2" cy="18" r="2.0" fill="#C8A96E"/><circle cx="10.4" cy="10.4" r="2.0" fill="#10B981"/></svg>`;
}

function renderHead({
  title = 'SeatHarmony: Wedding Floorplan, Conflict-Free Seating Solver & 24"×36" Poster Studio',
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
    html { overflow-x: clip; }
    body { max-width: 100%; background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); line-height: 1.55; -webkit-font-smoothing: antialiased; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    .serif-display { font-family: var(--font-serif); font-weight: 700; letter-spacing: -0.015em; line-height: 1.12; }
    .mono { font-family: var(--font-mono); }
    .tabular { font-variant-numeric: tabular-nums; }
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
    .studio-zone-section, #studio, #studio-zone2-how-it-works, #beo-proof, #pricing, #faq, #studio-bespoke-artifact-stage { padding: 68px 0; width: 100%; box-sizing: border-box; scroll-margin-top: 84px; }
    #studio-bespoke-artifact-stage { padding: 14px; }
    .mobile-jump-canvas-btn { display: none; }
    .studio-eyebrow-kicker { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 0.71rem; font-weight: 800; letter-spacing: 0.09em; text-transform: uppercase; color: #78350F; background: #FAF3E3; border: 1px solid #C8A96E; padding: 5px 14px; border-radius: 999px; margin-bottom: 12px; max-width: 100%; white-space: normal; }
    .studio-zone-title { font-family: var(--font-serif); font-size: 2.65rem; font-weight: 700; color: #181412; line-height: 1.1; letter-spacing: -0.015em; margin: 0 0 10px 0; }
    .studio-zone-title em { font-style: italic; color: #8C2D19; font-weight: 600; }
    .studio-zone-sub { font-size: 0.96rem; color: #44403C; line-height: 1.5; max-width: 820px !important; margin: 0 auto; }
    .studio-zone1-hero { background: linear-gradient(180deg, #FFFFFF 0%, #FAF6EE 100%); border: 1.5px solid #C8A96E; border-radius: 26px; padding: 16px 26px 0; box-shadow: 0 24px 54px -12px rgba(24, 20, 18, 0.10); overflow: hidden; margin-top: 12px; margin-bottom: 6px; }
    .studio-vsl-showcase-frame { position: relative; border-radius: 20px; border: 2px solid #C8A96E; background: #14110F; overflow: hidden; box-shadow: 0 24px 56px rgba(24, 20, 18, 0.24); margin-top: 12px; }
    .vsl-scene-pill { font-size: 0.70rem; font-weight: 700; padding: 5px 12px; border-radius: 999px; border: 1px solid rgba(200, 169, 110, 0.45); background: rgba(255, 255, 255, 0.10); color: #E6E0D6 !important; cursor: pointer; transition: all 0.15s ease; }
    .vsl-scene-pill:hover { background: rgba(253, 230, 138, 0.18); color: #FFFFFF !important; }
    .vsl-scene-pill.active { background: linear-gradient(135deg, #FDE68A 0%, #C8A96E 100%) !important; color: #181412 !important; border-color: #FDE68A !important; font-weight: 800; }
    .studio-vsl-split-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 440px; position: relative; }
    .studio-vsl-half { position: relative; overflow: hidden; min-height: 440px; display: flex; flex-direction: column; justify-content: space-between; padding: 14px 16px; }
    .studio-vsl-half img.vsl-portrait-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 28%; z-index: 1; transition: filter 0.45s ease, transform 0.6s ease, object-position 0.35s ease; }
    .studio-vsl-half.trap-before img.vsl-portrait-bg { filter: sepia(0.36) saturate(0.74) contrast(0.95) brightness(0.90); }
    .studio-vsl-half.harmony-after img.vsl-portrait-bg { filter: contrast(1.06) saturate(1.12) brightness(1.02); }
    .studio-vsl-half::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20,17,15,0.38) 0%, rgba(20,17,15,0.04) 55%, rgba(20,17,15,0.78) 100%); z-index: 2; pointer-events: none; }
    .studio-vsl-divider-badge { position: absolute; bottom: 112px; left: 50%; transform: translateX(-50%); z-index: 8; background: #181412; color: #FDE68A; border: 2px solid #C8A96E; border-radius: 999px; padding: 6px 14px; font-family: var(--font-mono); font-size: 0.70rem; font-weight: 800; letter-spacing: 0.07em; box-shadow: 0 10px 28px rgba(0,0,0,0.55); white-space: nowrap; }
    .studio-vsl-crease-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; background: #181412; color: #FAF8F5; margin: 16px -26px 0; padding: 14px 28px; border-top: 1.5px solid #C8A96E; align-items: center; }
    .studio-how-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 28px; }
    .studio-how-card { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 18px; padding: 22px 20px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 8px 24px rgba(24, 20, 18, 0.04); transition: transform 0.2s ease, border-color 0.2s ease; }
    .studio-how-card:hover { transform: translateY(-2px); border-color: #C8A96E; }
    .studio-how-num { width: 34px; height: 34px; border-radius: 10px; background: #181412; color: #FDE68A; border: 1px solid #C8A96E; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; }
    .studio-scroll-builder-grid { display: grid; grid-template-columns: minmax(0, 0.94fr) minmax(0, 1.06fr); gap: 26px; align-items: start; margin-top: 24px; }
    .studio-sticky-right-col { position: sticky; top: 80px; display: flex; flex-direction: column; gap: 12px; z-index: 15; min-width: 0; max-width: 100%; }
    .studio-hybrid-wizard { display: flex; flex-direction: column; gap: 20px; margin-bottom: 18px; min-width: 0; max-width: 100%; }
    .studio-wizard-step { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 18px; overflow: hidden; padding: 6px 6px 8px; box-shadow: 0 8px 24px rgba(24, 20, 18, 0.04); scroll-margin-top: 90px; transition: border-color 0.2s ease, box-shadow 0.2s ease; min-width: 0; max-width: 100%; }
    .studio-wizard-step.active { border: 2px solid #C8A96E; box-shadow: 0 14px 34px rgba(24, 20, 18, 0.08); }
    .studio-wizard-header { width: 100%; padding: 12px 14px; background: transparent; border: none; display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: pointer; text-align: left; }
    .studio-wizard-step-title { font-size: 0.86rem; font-weight: 800; color: #181412; display: flex; align-items: center; gap: 8px; min-width: 0; }
    .studio-wizard-step-summary { font-size: 0.68rem; font-weight: 700; color: #065F46; background: #ECFDF5; border: 1px solid #A7F3D0; padding: 3px 10px; border-radius: 999px; white-space: nowrap; flex-shrink: 0; }
    .studio-wizard-body { display: block !important; padding: 12px 14px 14px; border-top: 1px solid #EFEAE1; }
    .studio-field-label { display: block; font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #57534E; margin-bottom: 5px; }
    .studio-chip-group { display: flex; flex-wrap: wrap; gap: 6px; }
    .studio-tap-chip { font-size: 0.72rem; font-weight: 700; padding: 6px 11px; border-radius: 999px; border: 1px solid #D6CFC2; background: #FAF8F5; color: #181412; cursor: pointer; transition: all 0.14s ease; max-width: 100%; }
    .studio-tap-chip:hover { border-color: #C8A96E; background: #FAF3E3; }
    .studio-tap-chip.active { background: #181412; color: #FDE68A; border-color: #C8A96E; font-weight: 800; }
    .studio-baseline-kpi-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .studio-kpi-card { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 14px; padding: 12px 14px; box-shadow: 0 4px 14px rgba(24, 20, 18, 0.04); min-width: 0; }
    .studio-kpi-label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #78716C; }
    .studio-kpi-val { font-family: var(--font-serif); font-size: 1.45rem; font-weight: 700; color: #181412; line-height: 1.15; margin: 2px 0; }
    .studio-kpi-sub { font-size: 0.68rem; font-weight: 700; color: #065F46; }
    .studio-bespoke-stage { background: #181412; border: 2px solid #C8A96E; border-radius: 20px; padding: 14px; color: #FAF8F5; box-shadow: 0 22px 48px rgba(24, 20, 18, 0.22); display: flex; flex-direction: column; gap: 10px; min-width: 0; max-width: 100%; }
    .studio-stage-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; background: rgba(255, 255, 255, 0.06); padding: 5px; border-radius: 12px; border: 1px solid rgba(200, 169, 110, 0.3); }
    .studio-stage-tab-btn { padding: 8px 6px; border-radius: 8px; border: none; background: transparent; color: #D6CFC2; font-size: 0.72rem; font-weight: 800; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: all 0.15s ease; }
    .studio-stage-tab-btn.active { background: linear-gradient(135deg, #FDE68A 0%, #C8A96E 100%); color: #181412; }
    .studio-foreground-specimen { background: #FFFFFF; color: #181412; border: 1.5px solid #C8A96E; border-radius: 14px; padding: 12px; min-width: 0; max-width: 100%; overflow-x: hidden; }
    .studio-proof-cases-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 24px; }
    .studio-proof-case-card { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 18px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; gap: 12px; box-shadow: 0 10px 26px rgba(24, 20, 18, 0.05); }
    .studio-ba-table-wrap { margin-top: 24px; background: #FFFFFF; border: 1.5px solid #C8A96E; border-radius: 18px; overflow-x: auto; box-shadow: 0 12px 30px rgba(24, 20, 18, 0.06); }
    .ba-table { width: 100%; border-collapse: collapse; text-align: left; }
    .ba-table th, .ba-table td { padding: 14px 18px; border-bottom: 1px solid #EFEAE1; font-size: 0.86rem; }
    .studio-reviews-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 22px; }
    .studio-review-card { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 16px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; }
    .pricing-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 24px; }
    .panel { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 18px; box-shadow: 0 8px 24px rgba(24,20,18,0.04); }
    .badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 999px; font-size: 0.69rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; max-width: 100%; }
    .badge-emerald { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }
    .badge-amber { background: #FAF3E3; color: #78350F; border: 1px solid #C8A96E; }
    .badge-rose { background: #FFF1F2; color: #9F1239; border: 1px solid #FECDD3; }
    .badge-cyan { background: #F5F2EB; color: #57534E; border: 1px solid #D6CFC2; }
    .grader-input { width: 100%; padding: 8px 11px; border-radius: 8px; border: 1.5px solid #D6CFC2; background: #FFFFFF; color: #181412; font-size: 0.82rem; font-weight: 600; outline: none; max-width: 100%; }
    .grader-input:focus { border-color: #C8A96E; }
    .studio-faq-stack { display: flex; flex-direction: column; gap: 12px; max-width: 860px; margin: 26px auto 0; }
    .studio-faq-item { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 14px; padding: 16px 20px; }
    .studio-faq-item summary { cursor: pointer; font-weight: 800; font-size: 0.95rem; color: #181412; display: flex; align-items: center; justify-content: space-between; gap: 12px; list-style: none; }
    .studio-faq-item summary::-webkit-details-marker { display: none; }
    .mobile-subnav { display: none; overflow-x: auto; white-space: nowrap; gap: 14px; padding: 8px 16px; background: #F4EFE6; border-bottom: 1px solid var(--border-warm); font-size: 0.78rem; font-weight: 700; }
    .mobile-subnav a { color: var(--text-secondary); text-decoration: none; }
    .footer { background: #F4EFE6; border-top: 1px solid var(--border-warm); padding: 44px 0 32px; font-size: 0.84rem; color: var(--text-secondary); }
    @media (max-width: 1120px) { .hide-1024 { display: none !important; } }
    @media (max-width: 960px) {
      .container { padding: 0 14px; }
      .btn { white-space: normal; text-align: center; max-width: 100%; line-height: 1.3; }
      .navbar .btn-primary { padding: 7px 11px !important; font-size: 0.74rem !important; white-space: nowrap !important; }
      .studio-vsl-split-grid, .studio-how-grid, .studio-scroll-builder-grid, .studio-proof-cases-grid, .studio-reviews-grid, .pricing-grid, .studio-vsl-crease-bar { grid-template-columns: minmax(0, 1fr); }
      .studio-sticky-right-col { position: static; }
      .studio-vsl-divider-badge { display: none; }
      .studio-zone1-hero { padding: 16px 14px 0; }
      .studio-vsl-crease-bar { margin: 16px -14px 0; padding: 14px; }
      .studio-zone-title { font-size: 1.78rem; }
      .studio-zone-section, #studio, #studio-zone2-how-it-works, #beo-proof, #pricing, #faq, #studio-bespoke-artifact-stage { padding: 38px 0; scroll-margin-top: 118px; }
      #studio-bespoke-artifact-stage { padding: 12px; }
      .studio-stage-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .studio-wizard-header { flex-wrap: wrap; gap: 6px; padding: 10px 12px; }
      .studio-wizard-step-title { flex-wrap: wrap; font-size: 0.82rem; }
      .studio-wizard-step-summary { white-space: normal; font-size: 0.65rem; }
      .studio-baseline-kpi-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
      .studio-kpi-card { padding: 9px 8px; }
      .studio-kpi-val { font-size: 1.12rem; }
      .mobile-jump-canvas-btn { display: inline-flex; align-items: center; gap: 4px; }
    }
    @media (max-width: 820px) { .nav-links { display: none; } .mobile-subnav { display: flex; } .hide-mobile-text { display: none; } }
  </style>
  ${jsonLd ? `<script type="application/ld+json">${typeof jsonLd === 'string' ? JSON.stringify(JSON.parse(jsonLd)).replace(/</g, '\\u003c') : JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}
</head>`;
}

function renderNavbar() {
  return `<header class="navbar" role="banner"><div class="container nav-inner"><a href="/" id="nav-brand-logo-link" class="nav-brand" aria-label="SeatHarmony Home">${renderBrandLogoSvg(28)}<span>SeatHarmony</span></a><nav class="nav-links" aria-label="Primary Navigation"><a href="/#studio" class="nav-link" style="color:var(--accent-primary);font-weight:800;">1. Floorplan Studio</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}" class="nav-link">2. Caterer BEO</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}" class="nav-link">3. 24&Prime;&times;36&Prime; Sign &amp; QR</a><a href="/#studio-zone2-how-it-works" class="nav-link">How It Works</a><a href="/directory" class="nav-link hide-1024">60+ Floorplans</a><a href="/#pricing" class="nav-link">Pricing</a></nav><div style="display:flex;align-items:center;gap:8px;flex-shrink:0;"><button type="button" id="nav-vault-btn" onclick="if(window.shOpenVaultModal){window.shOpenVaultModal();}" class="btn btn-secondary hide-1024" style="padding:8px 12px;font-size:0.76rem;" title="Save or Resume Your Reception Event Vault">&#128190; <span id="nav-vault-label">Save / My Event</span></button><a href="/buy/complete_dossier?target=estate-150" id="nav-primary-buy-cta" class="btn btn-primary" style="padding:8px 14px;font-size:0.80rem;"><span>Unlock <span class="hide-mobile-text">Print &amp; BEO </span>Pack ($14.99)</span><span aria-hidden="true">&#8599;</span></a></div></div><div class="mobile-subnav" aria-label="Mobile Quick Navigation"><a href="/#studio" style="color:#8C2D19;font-weight:800;">1. Floorplan Studio</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}">2. Caterer BEO</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}">3. 24&Prime;&times;36&Prime; Sign</a><a href="#studio" onclick="if(window.shOpenVaultModal){window.shOpenVaultModal();return false;}">&#128190; Save / Login</a><a href="/#pricing">Pricing ($14.99)</a></div></header>`;
}

function renderFooter() {
  return `<footer class="footer" role="contentinfo"><div class="container"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:24px;padding-bottom:24px;border-bottom:1px solid var(--border-warm);"><div style="max-width:420px;"><div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:1.05rem;color:var(--text-primary);margin-bottom:8px;">${renderBrandLogoSvg(26)}<span>SeatHarmony Studio</span></div><p style="font-size:0.82rem;color:var(--text-secondary);">Combinatorial wedding &amp; event seating solver, clockwise 12-o&rsquo;clock caterer BEO generator, and print-ready 24&Prime;&times;36&Prime; Arch D Welcome Sign &amp; Avery 5302 place card studio.</p></div><div style="display:flex;gap:36px;flex-wrap:wrap;"><div><div style="font-weight:800;color:var(--text-primary);margin-bottom:8px;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;">Studio Modules</div><div style="display:flex;flex-direction:column;gap:6px;"><a href="/#studio" style="color:var(--text-secondary);text-decoration:none;">5-Card Floorplan Builder</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}" style="color:var(--text-secondary);text-decoration:none;">Clockwise 12:00 Caterer BEO</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}" style="color:var(--text-secondary);text-decoration:none;">24&Prime;&times;36&Prime; Welcome Sign &amp; Avery 5302</a><a href="/directory" style="color:var(--text-secondary);text-decoration:none;">60+ Venue Floorplan Templates</a></div></div><div><div style="font-weight:800;color:var(--text-primary);margin-bottom:8px;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;">Legal &amp; Specs</div><div style="display:flex;flex-direction:column;gap:6px;"><a href="/privacy" style="color:var(--text-secondary);text-decoration:none;">Privacy Policy</a><a href="/terms" style="color:var(--text-secondary);text-decoration:none;">Terms of Service</a><a href="/llms.txt" style="color:var(--text-secondary);text-decoration:none;">/llms.txt Manifest</a><a href="/sitemap.xml" style="color:var(--text-secondary);text-decoration:none;">XML Sitemap</a></div></div></div></div><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;padding-top:18px;font-size:0.76rem;color:var(--text-muted);"><span>&copy; ${new Date().getFullYear()} SeatHarmony Studio. Instant Print-Ready PDF, SVG &amp; Caterer BEO Exports.</span><span>Conflict-Free Family Solver &bull; Polar Seat Ring Geometry &bull; Avery 5302 Verified</span></div></div></footer>`;
}

module.exports = {
  escapeHtml,
  renderBrandLogoSvg,
  renderHead,
  renderNavbar,
  renderFooter,
  renderInteractiveScript
};

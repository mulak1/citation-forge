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
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg-primary: #FAF6EE; --bg-elevated: #FFFFFF; --bg-surface: #F4EFE6; --bg-obsidian: #181412;
      --text-primary: #181412; --text-secondary: #44403C; --text-muted: #78716C;
      --accent-primary: #8C2D19; --accent-gold: #C8A96E; --accent-gold-dark: #78350F;
      --accent-emerald: #065F46; --accent-rose: #9F1239; --border-warm: #E2D9C8;
      --font-serif: 'Cormorant Garamond', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { overflow-x: clip; }
    body { max-width: 100%; overflow-x: clip; font-size: 16px; background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); line-height: 1.55; -webkit-font-smoothing: antialiased; }
    button, input, select, textarea, svg text { font-family: var(--font-sans); }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    .serif-display { font-family: var(--font-serif); font-weight: 700; letter-spacing: -0.015em; line-height: 1.12; }
    .mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
    .tabular { font-variant-numeric: tabular-nums; }
    .navbar { position: sticky; top: 0; z-index: 90; overflow-x: clip; background: rgba(250, 246, 238, 0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-warm); }
    .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 10px; flex-wrap: nowrap; }
    .nav-brand { display: inline-flex; align-items: center; gap: 8px; font-weight: 800; font-size: 1.05rem; color: var(--text-primary); text-decoration: none; white-space: nowrap; flex-shrink: 0; }
    .nav-links { display: flex; align-items: center; gap: 11px; flex-wrap: nowrap; white-space: nowrap; }
    .nav-link { font-size: 0.84rem; font-weight: 700; color: var(--text-secondary); text-decoration: none; white-space: nowrap; transition: color 0.15s ease; }
    .nav-link:hover { color: var(--accent-primary); }
    .nav-badge-soon { font-size: 0.82rem; font-weight: 800; text-transform: uppercase; padding: 2px 6px; border-radius: 999px; background: #FAF3E3; color: #78350F; border: 1px solid #C8A96E; margin-left: 3px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 11px 20px; border-radius: 10px; font-weight: 800; font-size: 0.92rem; cursor: pointer; border: 1px solid transparent; text-decoration: none; white-space: nowrap; transition: all 0.16s ease; }
    .btn-primary { background: #181412; color: #FDE68A; border: 1.5px solid #C8A96E; box-shadow: 0 10px 24px rgba(24, 20, 18, 0.16); }
    .btn-primary:hover { background: #29221E; transform: translateY(-1px); }
    .btn-secondary { background: #FFFFFF; color: #78350F; border: 1.5px solid #C8A96E; }
    .btn-secondary:hover { background: #FAF3E3; }
    .studio-zone-section, #studio, #studio-zone2-how-it-works, #beo-proof, #bs-before-after-section, #bs-written-testimonials-section, #pricing, #faq { padding: 92px 0; width: 100%; box-sizing: border-box; scroll-margin-top: 84px; }
    #studio-bespoke-artifact-stage { padding: 18px; width: 100%; box-sizing: border-box; scroll-margin-top: 84px; }
    .mobile-jump-canvas-btn { display: none; }
    .studio-eyebrow-kicker, .bs-section-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; letter-spacing: 0.09em; text-transform: uppercase; color: #78350F; background: #FAF3E3; border: 1px solid #C8A96E; padding: 6px 16px; border-radius: 999px; margin-bottom: 14px; max-width: 100%; white-space: nowrap; }
    .studio-zone-title, .bs-section-h2 { font-family: var(--font-serif); font-size: clamp(2.15rem, 3.2vw, 2.85rem); font-weight: 700; color: #181412; line-height: 1.12; letter-spacing: -0.015em; margin: 0 0 14px 0; text-wrap: balance; }
    .studio-zone-title em, .bs-section-h2 em { font-style: italic; color: #8C2D19; font-weight: 600; }
    .studio-zone-sub, .bs-section-sub { font-size: 1.06rem; color: #44403C; line-height: 1.56; max-width: 58ch; margin: 0 auto; text-wrap: pretty; }
    .bs-section-header { max-width: 780px; margin: 0 auto 48px; text-align: center; }
    .studio-zone1-hero { padding: 28px 0 64px; background: radial-gradient(ellipse 90% 65% at 50% 18%, rgba(253, 224, 71, 0.18) 0%, rgba(250, 246, 238, 0) 75%); border-bottom: 1px solid #E5D7C1; }
    .sh-zone1-stack { display: flex; flex-direction: column; align-items: center; gap: 24px; max-width: 960px; margin: 0 auto; }
    .sh-zone1-header-block { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; max-width: 800px; }
    .sh-eyebrow-pill { display: inline-flex; align-items: center; align-self: center; gap: 8px; background: #F4EFE6; border: 1px solid #D6CBB9; color: #57534E; padding: 7px 16px; border-radius: 999px; font-size: 13.5px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; white-space: nowrap; }
    .sh-eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: #B45309; box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.18); }
    .sh-display-h1 { font-family: var(--font-serif); font-size: clamp(2.35rem, 4vw, 3.35rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.02em; color: #1C1917; margin: 0; text-wrap: balance; }
    .sh-display-h1 .sh-h1-accent { color: #047857; display: inline; }
    .sh-lead-sub { font-size: 1.08rem; line-height: 1.56; color: #44403C; margin: 0; max-width: 58ch; text-wrap: pretty; }
    .sh-vsl-player-shell { width: 100%; background: linear-gradient(180deg, #FFFDF9 0%, #FAF5EB 100%); color: #2C2520; border: 1.5px solid #D4AF37; border-radius: 20px; overflow: hidden; box-shadow: 0 24px 52px -14px rgba(180, 135, 40, 0.18), 0 0 0 4px rgba(212, 175, 55, 0.08); }
    .sh-vsl-garland-frieze { background: linear-gradient(90deg, #F7EFE0 0%, #FFFBEB 50%, #F7EFE0 100%); border-bottom: 1px solid #EADCC5; padding: 2px 0 0; }
    .sh-vsl-stage { padding: 26px 28px; min-height: 268px; display: flex; align-items: center; background-image: linear-gradient(105deg, rgba(255, 253, 249, 0.94) 0%, rgba(251, 246, 236, 0.91) 58%, rgba(250, 244, 232, 0.86) 100%), url('/public/editorial-hero.jpg'); background-size: cover; background-position: center; }
    .sh-vsl-scene { width: 100%; }
    .sh-vsl-scene-grid { display: grid; grid-template-columns: 1.04fr 0.96fr; gap: 26px; align-items: center; }
    .sh-vsl-speaker-row { display: flex; align-items: center; gap: 11px; margin-bottom: 12px; }
    .sh-vsl-speaker-avatar { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 2px solid #D4AF37; box-shadow: 0 4px 10px rgba(28, 25, 23, 0.14); flex-shrink: 0; }
    .sh-vsl-speaker-meta { display: flex; flex-direction: column; gap: 3px; }
    .sh-vsl-speaker-name { font-size: 14.5px; font-weight: 700; color: #44403C; line-height: 1.25; }
    .sh-vsl-scene-kicker { display: inline-block; font-size: 13px; font-weight: 800; letter-spacing: 0.06em; color: #B45309; text-transform: uppercase; }
    .sh-vsl-scene-h3 { font-family: var(--font-serif); font-size: 24px; font-weight: 700; line-height: 1.22; color: #1C1917; margin: 0 0 10px 0; text-wrap: balance; }
    .sh-vsl-scene-p { font-size: 16px; font-weight: 400; line-height: 1.56; color: #44403C; margin: 0; text-wrap: pretty; }
    .sh-vsl-caption-pill { display: inline-flex; align-items: center; gap: 10px; margin-top: 14px; background: #FAF3E4; border: 1px solid #E6D5B8; border-left: 3.5px solid #B45309; color: #3F3831; padding: 9px 14px; border-radius: 10px; font-size: 14px; line-height: 1.42; box-shadow: 0 3px 10px rgba(180, 135, 40, 0.08); }
    .sh-vsl-caption-good { background: #ECFDF5; border: 1px solid #A7F3D0; border-left: 3.5px solid #047857; color: #065F46; }
    .sh-vsl-overlap-collage { position: relative; display: flex; flex-direction: column; gap: 10px; padding: 2px; }
    .sh-vsl-main-photo-frame { position: relative; width: 100%; border-radius: 16px; overflow: hidden; border: 3px solid #FFFFFF; box-shadow: 0 14px 28px -10px rgba(28, 25, 23, 0.2); z-index: 1; }
    .sh-vsl-main-photo { width: 100%; height: 256px; object-fit: cover; object-position: center 22%; display: block; }
    .sh-vsl-overlap-card { position: relative; margin: 0; border-radius: 12px; padding: 12px 15px; box-shadow: 0 6px 16px -4px rgba(28, 25, 23, 0.10); z-index: 2; display: flex; flex-direction: column; gap: 4px; font-variant-numeric: tabular-nums; }
    .sh-vsl-overlap-bad { background: #FFF5F5; border: 1.5px solid #FCA5A5; }
    .sh-vsl-overlap-warn { background: #FFFBEB; border: 1.5px solid #FCD34D; }
    .sh-vsl-overlap-good { background: #ECFDF5; border: 1.5px solid #6EE7B7; }
    .sh-vsl-overlap-kicker { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #57534E; }
    .sh-vsl-overlap-big-num { display: flex; align-items: center; gap: 9px; font-size: 22px; font-weight: 800; color: #B91C1C; line-height: 1.15; }
    .sh-vsl-overlap-big-num small { font-size: 13px; font-weight: 700; background: #FEE2E2; color: #991B1B; padding: 2px 8px; border-radius: 6px; }
    .sh-vsl-overlap-good .sh-vsl-overlap-big-num small { background: #D1FAE5; color: #065F46; }
    .sh-vsl-overlap-sub { font-size: 14px; color: #44403C; line-height: 1.42; }
    .sh-vsl-overlap-list { display: flex; flex-direction: column; gap: 4px; font-size: 14px; color: #292524; line-height: 1.45; }
    .sh-vsl-controls { display: flex; align-items: center; gap: 12px; padding: 12px 18px; background: #FAF4E8; border-top: 1px solid #E7DAC3; }
    .sh-vsl-play-btn { display: inline-flex; align-items: center; gap: 7px; background: linear-gradient(135deg, #B45309 0%, #92400E 100%); color: #FFFFFF; border: 1px solid #78350F; border-radius: 9px; padding: 8px 15px; font-size: 13.5px; font-weight: 800; cursor: pointer; flex-shrink: 0; box-shadow: 0 4px 12px rgba(180, 83, 9, 0.22); }
    .sh-vsl-progress-wrap { flex: 1; height: 8px; background: #E7DAC3; border-radius: 999px; overflow: hidden; cursor: pointer; }
    .sh-vsl-progress-bar { height: 100%; background: linear-gradient(90deg, #D97706, #059669); transition: width 0.25s ease; }
    .sh-vsl-next-scene-btn { background: #FFFFFF; color: #44403C; border: 1px solid #D6CBB9; border-radius: 9px; padding: 7px 14px; font-size: 13.5px; font-weight: 700; cursor: pointer; flex-shrink: 0; }
    .sh-zone1-cta-block { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .sh-surer-cta-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
    .sh-btn-primary { background: #1C1917; color: #FFFFFF; border: 1.5px solid #1C1917; padding: 14px 24px; border-radius: 10px; font-size: 15.5px; font-weight: 800; cursor: pointer; text-decoration: none; box-shadow: 0 10px 24px -6px rgba(28, 25, 23, 0.28); transition: transform 0.16s ease, background-color 0.16s ease; }
    .sh-btn-primary:hover { background: #292524; transform: translateY(-1px); }
    .sh-btn-secondary { background: #FFFFFF; color: #1C1917; border: 1.5px solid #D6CBB9; padding: 14px 20px; border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; text-decoration: none; transition: background-color 0.16s ease, border-color 0.16s ease; }
    .sh-btn-secondary:hover { background: #F4EFE6; border-color: #A8A29E; }
    .sh-opener-micro-trust { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 10px; font-size: 14.5px; color: #57534E; margin-top: 4px; }
    .sh-crease-proof-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; width: 100%; max-width: 960px; margin: 32px auto 0; background: #FFFFFF; border: 1.5px solid #E7DFD3; border-radius: 16px; padding: 24px 28px; box-shadow: 0 4px 14px rgba(28, 25, 23, 0.04); }
    .sh-crease-item { display: flex; flex-direction: column; gap: 6px; border-right: 1px solid #F0EBE1; padding-right: 16px; }
    .sh-crease-item:last-child { border-right: none; padding-right: 0; }
    .sh-crease-val { font-family: var(--font-serif); font-size: 1.75rem; font-weight: 800; color: #1C1917; line-height: 1.15; }
    .sh-crease-lbl { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.04em; color: #57534E; line-height: 1.45; text-transform: uppercase; }
    .studio-how-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 22px; margin-top: 38px; }
    .studio-how-card { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 18px; padding: 26px 24px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 8px 24px rgba(24, 20, 18, 0.04); transition: transform 0.2s ease, border-color 0.2s ease; }
    .studio-how-card:hover { transform: translateY(-2px); border-color: #C8A96E; }
    .studio-how-num { width: 40px; height: 40px; border-radius: 10px; background: #FAF3E3; color: #78350F; border: 1.5px solid #C8A96E; font-family: var(--font-mono); font-size: 1rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; }
    .studio-scroll-builder-grid { display: grid; grid-template-columns: minmax(340px, 380px) minmax(0, 1fr); gap: 20px; align-items: start; margin-top: 18px; transition: all 0.2s ease; width: 100%; max-width: 100%; }
    .studio-scroll-builder-grid.full-stage { grid-template-columns: minmax(0, 1fr); }
    .studio-scroll-builder-grid.full-stage .studio-hybrid-wizard { display: none; }
    .studio-sticky-right-col { position: sticky; top: 76px; display: flex; flex-direction: column; gap: 10px; z-index: 15; min-width: 0; width: 100%; max-width: 100%; }
    .studio-hybrid-wizard { display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px; min-width: 0; width: 100%; max-width: 100%; }
    .studio-wizard-step { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 14px; overflow: hidden; padding: 6px 10px; box-shadow: 0 6px 18px rgba(24, 20, 18, 0.04); scroll-margin-top: 90px; transition: border-color 0.2s ease, box-shadow 0.2s ease; min-width: 0; width: 100%; max-width: 100%; }
    .studio-wizard-step.active { border: 2px solid #C8A96E; box-shadow: 0 12px 28px rgba(24, 20, 18, 0.08); }
    .studio-wizard-header { width: 100%; padding: 10px 8px; background: transparent; border: none; display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: pointer; text-align: left; white-space: nowrap; }
    .studio-wizard-step-title { font-size: 1rem; font-weight: 800; color: #181412; line-height: 1.3; min-width: 0; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .studio-wizard-step-summary { font-size: 0.84rem; font-weight: 700; color: #065F46; background: #ECFDF5; border: 1px solid #A7F3D0; padding: 3px 9px; border-radius: 999px; white-space: nowrap; flex-shrink: 0; max-width: 44%; overflow: hidden; text-overflow: ellipsis; }
    .studio-wizard-body { display: none; padding: 12px 10px 14px; border-top: 1px solid #EFEAE1; }
    .studio-wizard-step.active .studio-wizard-body { display: block; }
    .studio-field-label { display: block; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #57534E; margin-bottom: 6px; }
    .studio-chip-group { display: flex; flex-wrap: wrap; gap: 6px; }
    .studio-tap-chip { font-size: 0.88rem; font-weight: 700; padding: 7px 12px; border-radius: 999px; border: 1px solid #D6CFC2; background: #FAF8F5; color: #181412; cursor: pointer; transition: all 0.14s ease; max-width: 100%; white-space: nowrap; }
    .studio-tap-chip:hover { border-color: #C8A96E; background: #FAF3E3; }
    .studio-tap-chip.active { background: #181412; color: #FDE68A; border-color: #C8A96E; font-weight: 800; }
    .studio-baseline-kpi-grid { display: none !important; }
    .studio-bespoke-stage { background: linear-gradient(180deg, #FFFDF9 0%, #FAF3E6 100%); border: 2px solid #C8A96E; border-radius: 20px; padding: 16px; color: #181412; box-shadow: 0 18px 42px rgba(180, 135, 40, 0.14); display: flex; flex-direction: column; gap: 10px; min-width: 0; max-width: 100%; }
    .studio-stage-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; background: #F5ECE0; padding: 5px; border-radius: 12px; border: 1px solid #E2D9C8; }
    .studio-stage-tab-btn { padding: 9px 8px; border-radius: 8px; border: none; background: transparent; color: #57534E; font-size: 0.88rem; font-weight: 800; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: all 0.15s ease; }
    .studio-stage-tab-btn.active { background: linear-gradient(135deg, #FDE68A 0%, #C8A96E 100%); color: #181412; box-shadow: 0 3px 10px rgba(180, 135, 40, 0.18); }
    .studio-foreground-specimen { background: #FFFFFF; color: #181412; border: 1.5px solid #C8A96E; border-radius: 14px; padding: 12px; min-width: 0; max-width: 100%; overflow-x: hidden; }
    /* BarStock-style Spaced Sections: 1) Case Studies, 2) Before & After + Honest Comparison, 3) Written Reviews */
    .bs-zone4-proof { padding: 92px 0 96px; background: linear-gradient(180deg, #FFFDF9 0%, #FAF3E6 100%); border-top: 1.5px solid #E5D9C5; border-bottom: 1.5px solid #D8E5DC; }
    .bs-case-studies-grid, .studio-proof-cases-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; margin-top: 0; }
    .bs-case-card, .studio-proof-case-card { background: #FFFFFF; border: 1.5px solid #E7DFD3; border-radius: 18px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; gap: 16px; box-shadow: 0 8px 24px -6px rgba(28, 25, 23, 0.06); }
    .bs-case-featured { border: 2px solid #1C1917; background: linear-gradient(180deg, #FFFDF9 0%, #FFFFFF 100%); box-shadow: 0 16px 34px -10px rgba(28, 25, 23, 0.12); }
    .bs-case-top-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; gap: 6px; margin-bottom: 10px; }
    .bs-case-badge { font-size: 13.5px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #B45309; background: #FEF3C7; padding: 4px 9px; border-radius: 6px; white-space: nowrap; }
    .bs-case-state-tag { font-size: 13.5px; font-weight: 700; color: #065F46; white-space: nowrap; }
    .bs-case-title { font-family: var(--font-serif); font-size: 22px; font-weight: 700; color: #1C1917; line-height: 1.22; margin: 0 0 8px 0; text-wrap: balance; }
    .bs-case-context { font-size: 16px; font-weight: 400; line-height: 1.54; color: #44403C; margin: 0; text-wrap: pretty; }
    .bs-case-math-box { background: #FAF7F2; border: 1.5px solid #E7DFD3; border-radius: 12px; padding: 14px 15px; display: flex; flex-direction: column; gap: 8px; font-variant-numeric: tabular-nums; font-family: var(--font-sans); }
    .bs-case-math-row { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; font-size: 16px; font-weight: 500; color: #44403C; line-height: 1.35; }
    .bs-case-math-row span:first-child { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .bs-case-math-row span:last-child { white-space: nowrap; text-align: right; flex-shrink: 0; font-weight: 700; }
    .bs-case-math-total { border-top: 1.5px dashed #D6CBB9; padding-top: 8px; margin-top: 2px; font-size: 16px; font-weight: 800; color: #1C1917; }
    .bs-case-takeaway { font-size: 16px; font-weight: 500; line-height: 1.5; color: #57534E; margin: 0; }
    .bs-zone4a-ba { padding: 92px 0 96px; background: #FAF6EE; border-bottom: 1.5px solid #E6D7C0; }
    .bs-ba-container { max-width: 1040px; margin: 0 auto; background: #FFFFFF; border: 1.5px solid #DFD6C7; border-radius: 22px; padding: 36px 36px; box-shadow: 0 12px 32px -10px rgba(28, 25, 23, 0.07); }
    .bs-ba-split-grid, .bs-ba-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; margin-top: 0; }
    .bs-ba-card { border-radius: 16px; padding: 28px 26px; border: 1.5px solid var(--border-warm); background: #FFFFFF; }
    .bs-ba-card.before, .bs-ba-before { background: #FFF5F5; border: 1.5px solid #FECACA; }
    .bs-ba-card.after, .bs-ba-after { background: #F0FDF4; border: 1.5px solid #86EFAC; }
    .bs-ba-card-top { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
    .bs-ba-pill { display: inline-block; font-size: 13.5px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; padding: 5px 12px; border-radius: 999px; white-space: nowrap; }
    .bs-ba-pill-before { background: #FEE2E2; color: #991B1B; }
    .bs-ba-pill-after { background: #DCFCE7; color: #065F46; }
    .bs-ba-price-tag { font-size: 16px; font-weight: 800; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .bs-ba-price-bad { color: #B91C1C; }
    .bs-ba-price-good { color: #047857; }
    .bs-ba-card-h4 { font-family: var(--font-serif); font-size: 21px; font-weight: 700; color: #1C1917; margin: 0 0 16px; line-height: 1.25; text-wrap: balance; }
    .bs-ba-list { margin: 0; padding: 0; list-style: none; font-size: 16px; font-weight: 400; line-height: 1.52; color: #292524; display: flex; flex-direction: column; gap: 13px; }
    .bs-ba-list li { display: flex; align-items: flex-start; gap: 10px; }
    .bs-ba-icon { flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 13.5px; font-weight: 800; margin-top: 2px; }
    .bs-ba-icon-bad { background: #DC2626; color: #FFFFFF; }
    .bs-ba-icon-good { background: #047857; color: #FFFFFF; }
    .bs-honest-table-wrap, .studio-ba-table-wrap { max-width: 1040px; margin: 68px auto 0; background: #FFFFFF; border: 1.5px solid #DFD6C7; border-radius: 22px; padding: 36px 36px; overflow-x: auto; box-shadow: 0 12px 32px -10px rgba(28, 25, 23, 0.07); }
    .bs-honest-title { font-family: var(--font-serif); font-size: 24px; font-weight: 700; color: #1C1917; margin-bottom: 22px; text-align: center; text-wrap: balance; }
    .bs-honest-table, .ba-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 16px; font-variant-numeric: tabular-nums; }
    .bs-honest-table th, .bs-honest-table td, .ba-table th, .ba-table td { padding: 14px 16px; border-bottom: 1px solid #E7DFD3; font-size: 16px; line-height: 1.45; white-space: nowrap; }
    .bs-honest-table th, .ba-table th { font-size: 13.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #57534E; background: #FAF7F2; white-space: nowrap; }
    .bs-honest-table .bs-col-highlight { background: #ECFDF5; color: #065F46; font-weight: 700; }
    .bs-written-testimonials-section { padding: 92px 0 88px; background: linear-gradient(180deg, #FFFDF9 0%, #FAF3E6 100%); border-bottom: 1.5px solid #E5D9C5; }
    .bs-written-proof-grid, .studio-reviews-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; margin-bottom: 76px; }
    .bs-quote-card, .studio-review-card { background: #FFFFFF; border: 1.5px solid #DFD6C7; border-radius: 18px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; gap: 18px; font-size: 16px; line-height: 1.58; box-shadow: 0 10px 26px -8px rgba(28, 25, 23, 0.06); }
    .bs-quote-stars { font-size: 14px; font-weight: 700; color: #B45309; letter-spacing: 0.02em; white-space: nowrap; }
    .bs-quote-body { font-size: 16px; font-weight: 400; line-height: 1.58; color: #292524; font-style: italic; margin: 0; text-wrap: pretty; }
    .bs-quote-author { display: flex; align-items: center; gap: 12px; border-top: 1px solid #F0EBE1; padding-top: 14px; }
    .bs-quote-avatar { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 1.5px solid #C8A96E; background: #FAF3E3; color: #78350F; font-family: var(--font-sans); font-size: 16px; font-weight: 800; display: inline-flex !important; align-items: center !important; justify-content: center !important; text-align: center !important; line-height: 1 !important; flex-shrink: 0; }
    .bs-quote-author strong { display: block; font-size: 16px; font-weight: 800; color: #1C1917; line-height: 1.25; }
    .bs-quote-author div > span { display: block; font-size: 14px; color: #57534E; line-height: 1.35; }
    .studio-feature-slide { display: none; animation: studioSlideFadeIn 0.25s ease-out; }
    .studio-feature-slide.active { display: block; }
    @keyframes studioSlideFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
    .studio-carousel-tab { padding: 11px 18px; border-radius: 999px; font-size: 0.92rem; font-weight: 800; cursor: pointer; transition: all 0.18s ease; border: 1.5px solid #D6CFC2; background: #FFFFFF; color: #44403C; white-space: nowrap; }
    .studio-carousel-tab.active { border: 2px solid #8C2D19; background: #181412; color: #FDE68A; box-shadow: 0 6px 18px rgba(24, 20, 18, 0.16); }
    .studio-showcase-annotation-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-bottom: 20px; }
    .studio-showcase-annotation-card { background: #FAF6EE; border: 1.5px solid #E2D9C8; border-radius: 14px; padding: 14px 16px; display: flex; gap: 11px; align-items: center; }
    .studio-showcase-num-badge { width: 28px; height: 28px; border-radius: 50%; background: #181412; color: #FDE68A; border: 1.5px solid #C8A96E; font-size: 0.84rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 3px 8px rgba(24, 20, 18, 0.18); }
    .studio-showcase-device-frame { position: relative; border-radius: 18px; overflow: hidden; border: 2px solid #D8C29D; background: #FAF6EE; box-shadow: 0 18px 42px rgba(24, 20, 18, 0.08); }
    .studio-showcase-img-wrap { position: relative; background: #FAF6EE; line-height: 0; max-height: 640px; overflow: hidden; }
    .studio-showcase-img-wrap img { width: 100%; height: auto; display: block; object-fit: cover; object-position: top center; }
    .studio-showcase-pin { position: absolute; z-index: 4; display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; background: rgba(24, 20, 18, 0.92); color: #FAF8F5; padding: 0; border-radius: 50%; font-size: 0.82rem; font-weight: 900; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.38); border: 2px solid #FDE68A; pointer-events: none; }
    .studio-showcase-pin-num { width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #FDE68A 0%, #C8A96E 100%); color: #181412; font-size: 0.82rem; font-weight: 900; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .studio-showcase-pin-label { display: none; }
    .pricing-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; margin-top: 36px; }
    .panel { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 18px; box-shadow: 0 8px 24px rgba(24,20,18,0.04); }
    .badge { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 999px; font-size: 0.84rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; max-width: 100%; white-space: nowrap; }
    .badge-emerald { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }
    .badge-amber { background: #FAF3E3; color: #78350F; border: 1px solid #C8A96E; }
    .badge-rose { background: #FFF1F2; color: #9F1239; border: 1px solid #FECDD3; }
    .badge-cyan { background: #F5F2EB; color: #57534E; border: 1px solid #D6CFC2; }
    .grader-input { width: 100%; padding: 9px 12px; border-radius: 8px; border: 1.5px solid #D6CFC2; background: #FFFFFF; color: #181412; font-size: 0.90rem; font-weight: 600; outline: none; max-width: 100%; }
    .grader-input:focus { border-color: #C8A96E; }
    .studio-faq-stack { display: flex; flex-direction: column; gap: 18px; max-width: 880px; margin: 38px auto 0; }
    .studio-faq-item { background: #FFFFFF; border: 1.5px solid var(--border-warm); border-radius: 16px; padding: 22px 26px; }
    .studio-faq-item summary { cursor: pointer; font-weight: 800; font-size: 1.12rem; color: #181412; display: flex; align-items: center; justify-content: space-between; gap: 12px; list-style: none; }
    .studio-faq-item summary::-webkit-details-marker { display: none; }
    .mobile-subnav { display: none; flex-wrap: wrap; justify-content: center; gap: 6px 14px; padding: 8px 14px; background: #F4EFE6; border-bottom: 1px solid var(--border-warm); font-size: 0.82rem; font-weight: 700; }
    .mobile-subnav a { color: var(--text-secondary); text-decoration: none; }
    .footer { background: #F4EFE6; border-top: 1px solid var(--border-warm); padding: 56px 0 40px; font-size: 0.92rem; color: var(--text-secondary); }
    @media (max-width: 1120px) { .hide-1024 { display: none !important; } }
    @media (max-width: 1080px) {
      .studio-scroll-builder-grid { grid-template-columns: minmax(0, 1fr); }
      .studio-sticky-right-col { position: static; }
    }
    @media (max-width: 960px) {
      .container { padding: 0 22px; }
      .btn { white-space: normal; text-align: center; max-width: 100%; line-height: 1.3; }
      .navbar .btn-primary { padding: 7px 11px !important; font-size: 0.82rem !important; white-space: nowrap !important; }
      .sh-vsl-scene-grid, .studio-how-grid, .studio-scroll-builder-grid, .bs-case-studies-grid, .studio-proof-cases-grid, .bs-ba-split-grid, .bs-ba-grid, .bs-written-proof-grid, .studio-reviews-grid, .pricing-grid, .sh-crease-proof-bar, .studio-showcase-annotation-grid { grid-template-columns: minmax(0, 1fr); }
      .studio-showcase-pin { display: none; }
      .studio-sticky-right-col { position: static; }
      .studio-zone1-hero { padding: 20px 0 44px; }
      .sh-vsl-stage { padding: 18px 16px; }
      .sh-crease-item { border-right: none; border-bottom: 1px solid #F0EBE1; padding-right: 0; padding-bottom: 14px; }
      .sh-crease-item:last-child { border-bottom: none; padding-bottom: 0; }
      .sh-h1-line1 { white-space: normal !important; }
      .studio-eyebrow-kicker, .bs-section-eyebrow, .sh-eyebrow-pill { white-space: normal; font-size: 0.84rem; padding: 5px 12px; max-width: 100%; }
      .sh-vsl-scene-h3, .bs-honest-title { font-size: 1.22rem; line-height: 1.22; }
      .sh-crease-val { font-size: 1.45rem; }
      .studio-zone-title, .bs-section-h2 { font-size: 1.52rem; line-height: 1.18; }
      .studio-zone-section, #studio, #studio-zone2-how-it-works, #beo-proof, #bs-before-after-section, #bs-written-testimonials-section, #pricing, #faq { padding: 64px 0; scroll-margin-top: 118px; }
      .bs-ba-container, .bs-honest-table-wrap, .studio-ba-table-wrap { padding: 20px 14px; }
      .bs-honest-table th, .bs-honest-table td, .ba-table th, .ba-table td { padding: 8px 5px; font-size: 13.5px; line-height: 1.35; word-break: break-word; white-space: normal; }
      #studio-bespoke-artifact-stage { padding: 12px; }
      .studio-stage-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .studio-wizard-header { flex-wrap: wrap; gap: 6px; padding: 10px 12px; }
      .studio-wizard-step-title { flex-wrap: wrap; font-size: 0.88rem; }
      .studio-wizard-step-summary { white-space: normal; font-size: 0.84rem; }
      .studio-baseline-kpi-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
      .studio-kpi-card { padding: 9px 8px; }
      .studio-kpi-val { font-size: 1.12rem; }
      .mobile-jump-canvas-btn { display: inline-flex; align-items: center; gap: 4px; }
    }
    @media (max-width: 520px) { .sh-display-h1 { font-size: 1.56rem; } }
    @media (max-width: 820px) { .nav-links { display: none; } .mobile-subnav { display: flex; } .hide-mobile-text { display: none; } }
  </style>
  ${jsonLd ? `<script type="application/ld+json">${typeof jsonLd === 'string' ? JSON.stringify(JSON.parse(jsonLd)).replace(/</g, '\\u003c') : JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}
</head>`;
}

function renderNavbar() {
  return `<header class="navbar" role="banner"><div class="container nav-inner"><a href="/" id="nav-brand-logo-link" class="nav-brand" aria-label="SeatHarmony Home">${renderBrandLogoSvg(28)}<span>SeatHarmony</span></a><nav class="nav-links" aria-label="Primary Navigation"><a href="/#studio" class="nav-link" style="color:var(--accent-primary);font-weight:800;">1. Floorplan Studio</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}" class="nav-link">2. Caterer Meal Sheet (BEO)</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}" class="nav-link">3. 24&Prime;&times;36&Prime; Sign &amp; QR</a><a href="/#studio-zone2-how-it-works" class="nav-link">How It Works</a><a href="/directory" class="nav-link hide-1024">60+ Venue Layouts</a><a href="/#pricing" class="nav-link">Pricing</a></nav><div style="display:flex;align-items:center;gap:6px;flex-shrink:0;"><button type="button" id="nav-vault-btn" onclick="if(window.shOpenVaultModal){window.shOpenVaultModal();}" class="btn btn-secondary hide-1024" style="padding:7px 11px;font-size:0.82rem;" title="Save or Resume Your Reception Plan">&#128190; <span id="nav-vault-label">Save / My Event</span></button><a href="/buy/complete_dossier?target=estate-150" id="nav-primary-buy-cta" class="btn btn-primary" style="padding:7px 12px;font-size:0.82rem;"><span>Get <span class="hide-mobile-text">Wedding Print </span>Pack ($14.99)</span><span aria-hidden="true">&#8599;</span></a></div></div><div class="mobile-subnav" aria-label="Mobile Quick Navigation"><a href="/#studio" style="color:#8C2D19;font-weight:800;">1. Floorplan Studio</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}">2. Caterer Meal Sheet</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}">3. 24&Prime;&times;36&Prime; Sign</a><a href="#studio" onclick="if(window.shOpenVaultModal){window.shOpenVaultModal();return false;}">&#128190; Save / Login</a><a href="/#pricing">Pricing ($14.99)</a></div></header>`;
}

function renderFooter() {
  return `<footer class="footer" role="contentinfo"><div class="container"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:24px;padding-bottom:24px;border-bottom:1px solid var(--border-warm);"><div style="max-width:420px;"><div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:1.05rem;color:var(--text-primary);margin-bottom:8px;">${renderBrandLogoSvg(26)}<span>SeatHarmony Studio</span></div><p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.5;">Reception seating studio for couples and planners. Seat households together, export a Clockwise 12:00 Caterer BEO, and print 24&Prime;&times;36&Prime; welcome signs in minutes.</p></div><div style="display:flex;gap:36px;flex-wrap:wrap;"><div><div style="font-weight:800;color:var(--text-primary);margin-bottom:8px;font-size:0.82rem;text-transform:uppercase;letter-spacing:0.06em;">Reception Deliverables</div><div style="display:flex;flex-direction:column;gap:6px;"><a href="/#studio" style="color:var(--text-secondary);text-decoration:none;">Interactive Reception Floorplan</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}" style="color:var(--text-secondary);text-decoration:none;">Clockwise Caterer Meal Sheet (BEO)</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}" style="color:var(--text-secondary);text-decoration:none;">24&Prime;&times;36&Prime; Easel Sign &amp; Avery 5302 Cards</a><a href="/directory" style="color:var(--text-secondary);text-decoration:none;">60+ Venue Floorplan Templates</a></div></div><div><div style="font-weight:800;color:var(--text-primary);margin-bottom:8px;font-size:0.82rem;text-transform:uppercase;letter-spacing:0.06em;">Legal &amp; Specs</div><div style="display:flex;flex-direction:column;gap:6px;"><a href="/privacy" style="color:var(--text-secondary);text-decoration:none;">Privacy Policy</a><a href="/terms" style="color:var(--text-secondary);text-decoration:none;">Terms of Service</a><a href="/llms.txt" style="color:var(--text-secondary);text-decoration:none;">/llms.txt Manifest</a><a href="/sitemap.xml" style="color:var(--text-secondary);text-decoration:none;">XML Sitemap</a></div></div></div></div><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;padding-top:18px;font-size:0.82rem;color:var(--text-muted);"><span>&copy; ${new Date().getFullYear()} SeatHarmony Studio. FedEx &amp; Staples Print-Ready PDFs, Place Cards &amp; Caterer Meal Sheets.</span><span>Couples Kept Together &bull; Clockwise Seat #1 Catering &bull; Avery 5302 Verified</span></div></div></footer>`;
}

module.exports = {
  escapeHtml,
  renderBrandLogoSvg,
  renderHead,
  renderNavbar,
  renderFooter,
  renderInteractiveScript
};

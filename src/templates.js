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
    .btn-primary { background: linear-gradient(135deg, #FDE68A 0%, #E8C77D 100%); color: #3B2A12; border-color: #C8A96E; border: 1.5px solid #C8A96E; box-shadow: 0 8px 20px rgba(180, 135, 40, 0.22); }
    .btn-primary:hover { background: linear-gradient(135deg, #FEF0B0 0%, #EDD08C 100%); transform: translateY(-1px); }
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
    .sh-vsl-stage { padding: 26px 28px; display: grid; align-items: center; background-image: linear-gradient(105deg, rgba(255, 253, 249, 0.94) 0%, rgba(251, 246, 236, 0.91) 58%, rgba(250, 244, 232, 0.86) 100%), url('/public/editorial-hero.jpg'); background-size: cover; background-position: center; }
    .sh-vsl-scene { width: 100%; grid-area: 1 / 1; visibility: hidden; }
    .sh-vsl-scene.active { visibility: visible; }
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
    .sh-vsl-steps { flex: 1; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; min-width: 0; }
    .sh-vsl-step { display: flex; flex-direction: column; align-items: stretch; gap: 5px; background: transparent; border: none; padding: 4px 0; cursor: pointer; text-align: left; min-width: 0; }
    .sh-vsl-step-track { display: block; height: 6px; background: #E7DAC3; border-radius: 999px; overflow: hidden; }
    .sh-vsl-step-fill { display: block; height: 100%; width: 0; background: linear-gradient(90deg, #D97706, #059669); border-radius: 999px; }
    .sh-vsl-step-label { font-size: 13px; font-weight: 600; color: #8A7A66; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; }
    .sh-vsl-step.active .sh-vsl-step-label, .sh-vsl-step:hover .sh-vsl-step-label { color: #78350F; font-weight: 800; }
    .sh-vsl-step:focus-visible { outline: 2px solid #B45309; outline-offset: 2px; border-radius: 6px; }
    .sh-vsl-next-scene-btn:disabled { opacity: 0.4; cursor: default; }
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
    .studio-scroll-builder-grid { display: grid; grid-template-columns: minmax(340px, 390px) minmax(0, 1fr); gap: 20px; align-items: start; margin-top: 14px; transition: all 0.2s ease; width: 100%; max-width: 100%; }
    .studio-scroll-builder-grid.full-stage { grid-template-columns: minmax(0, 1fr); }
    .sh-ed-ghost { font-size: 0.88rem; font-weight: 700; color: #44403C; background: #FFFFFF; border: 1.5px solid #DCD3C3; padding: 7px 13px; border-radius: 10px; cursor: pointer; white-space: nowrap; transition: border-color 0.15s ease, background 0.15s ease; }
    .sh-venue-cta { display: inline-flex; align-items: center; padding: 10px 18px; font-size: 0.94rem; font-weight: 800; color: #3B2A12; background: linear-gradient(135deg, #FDE68A 0%, #E8C77D 100%); border: 1.5px solid #C8A96E; border-radius: 999px; text-decoration: none; box-shadow: 0 8px 18px -10px rgba(180,135,40,0.55); }
    .sh-venue-cta:hover { box-shadow: 0 10px 22px -8px rgba(180,135,40,0.7); }
    .sh-gdot { display: inline-block; width: 10px; height: 10px; border-radius: 999px; flex-shrink: 0; margin-right: 6px; vertical-align: middle; }
    .sh-ed-row .sh-gdot { margin: 0 0 0 -2px; }
    .sh-ed-legend { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 12px; }
    .sh-ed-legend:empty { display: none; }
    .sh-leg { display: inline-flex; align-items: center; padding: 6px 12px; font-size: 13px; font-weight: 600; color: #44403C; background: #FFFFFF; border: 1px solid #DCD3C3; border-radius: 999px; cursor: pointer; font-family: inherit; }
    .sh-leg b { margin-left: 6px; color: #78716C; font-weight: 700; } .sh-leg:hover { border-color: #C8A96E; } .sh-leg.on { background: #3B2A12; color: #FFFFFF; border-color: #3B2A12; } .sh-leg.on b { color: #FDE68A; }
    .sh-ed-style { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 4px 0 12px; }
    .sh-ed-style .sh-ed-seg { flex: 1 1 200px; } .sh-ed-rot { display: flex; gap: 6px; }
    .sh-ed-rot button { padding: 8px 10px; font-size: 13px; font-weight: 700; color: #44403C; background: #FFFFFF; border: 1.5px solid #E2D9C8; border-radius: 9px; cursor: pointer; white-space: nowrap; font-family: inherit; } .sh-ed-rot button:hover { border-color: #C8A96E; }
    .sh-ed-seg button .sh-gdot { margin-right: 5px; }
    .sh-ed-ka { margin-top: 16px; padding-top: 12px; border-top: 1px solid #EFE6D4; }
    .sh-ed-ka-empty { font-size: 13px; color: #78716C; line-height: 1.45; margin-bottom: 8px; }
    .sh-ed-ka-row { display: flex; align-items: center; gap: 8px; padding: 7px 0; flex-wrap: wrap; }
    .sh-ed-ka-names { flex: 1 1 140px; font-size: 14px; font-weight: 600; color: #181412; min-width: 0; }
    .sh-ed-ka-st { font-size: 12.5px; font-weight: 700; color: #78716C; } .sh-ed-ka-st.ok { color: #047857; } .sh-ed-ka-st.bad { color: #9F1239; }
    .sh-ed-ka-btn { padding: 5px 10px; font-size: 13px; font-weight: 700; color: #8C2D19; background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 8px; cursor: pointer; font-family: inherit; }
    .sh-ed-ka-x { border: none; background: transparent; font-size: 1.2rem; line-height: 1; color: #A8A29E; cursor: pointer; padding: 0 4px; }
    .sh-ed-ka-form { display: grid; grid-template-columns: 1fr 1fr auto; gap: 6px; margin-top: 6px; }
    .sh-ed-ka-form input { min-width: 0; padding: 9px 10px; font-size: 14px; border: 1.5px solid #DCD3C3; border-radius: 9px; background: #FFFFFF; font-family: inherit; outline: none; } .sh-ed-ka-form input:focus { border-color: #C8A96E; }
    .sh-ed-ka-form button { padding: 0 14px; font-size: 14px; font-weight: 800; color: #3B2A12; background: #EBCB82; border: 1.5px solid #C8A96E; border-radius: 9px; cursor: pointer; font-family: inherit; }
    .sh-ed-menu-wrap { position: relative; display: inline-block; }
    .sh-ed-menu { position: absolute; right: 0; top: calc(100% + 6px); z-index: 30; min-width: 210px; background: #FFFFFF; border: 1px solid #E2D3B5; border-radius: 12px; padding: 6px; box-shadow: 0 18px 40px -18px rgba(60,40,10,0.4); }
    .sh-ed-menu button { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; width: 100%; padding: 10px 12px; font-size: 14px; font-weight: 700; color: #181412; background: transparent; border: none; border-radius: 8px; cursor: pointer; text-align: left; font-family: inherit; } .sh-ed-menu button:hover { background: #FFF8E8; } .sh-ed-menu small { font-size: 12.5px; color: #78716C; font-weight: 600; }
    .sh-el-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 6px 0; font-size: 14.5px; font-weight: 600; color: #44403C; }
    .sh-ed-menu { max-height: 70vh; overflow-y: auto; }
    .sh-save-status { font-size: 13px; font-weight: 600; color: #047857; white-space: nowrap; }
    .sh-restore-note { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin: 0 0 14px; padding: 10px 14px; background: #FFF8E8; border: 1px solid #E8D8B0; border-radius: 12px; font-size: 14px; font-weight: 600; color: #44403C; }
    .sh-restore-note button { background: none; border: none; font-family: inherit; font-size: 14px; font-weight: 700; color: #8C2D19; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; padding: 2px 6px; }
    .sh-ed-ghost:hover { border-color: #C8A96E; background: #FFF8E8; }
    .sh-ed-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
    .sh-ed-hint { flex: 1; min-width: 200px; font-size: 0.92rem; font-weight: 600; color: #57534E; line-height: 1.35; }
    .sh-ed-grid { display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 16px; align-items: start; }
    .sh-ed-grid.panel-hidden { grid-template-columns: minmax(0, 1fr); }
    .sh-ed-grid.panel-hidden .sh-ed-panel { display: none !important; }
    .sh-ed-panel-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #EFE6D4; }
    .sh-ed-panel-top span { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #78716C; }
    .sh-ed-panel-hide-btn { padding: 3px 9px; border-radius: 7px; border: 1px solid #DCD3C3; background: #FAF7F2; font-family: inherit; font-size: 0.75rem; font-weight: 700; color: #57534E; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
    .sh-ed-panel-hide-btn:hover { border-color: #C8A96E; background: #FFF8E8; color: #181412; }
    .sh-ed-canvas { border-radius: 14px; border: 1.5px solid #E2D9C8; background: #FAF7F2; overflow: hidden; }
    .sh-ed-panel { background: #FFFFFF; border: 1.5px solid #E2D3B5; border-radius: 16px; padding: 16px; max-height: 760px; overflow-y: auto; box-shadow: 0 12px 30px -16px rgba(120, 85, 30, 0.25); position: sticky; top: 84px; }
    .sh-ed-empty { font-size: 0.98rem; color: #78716C; text-align: center; padding: 40px 10px; line-height: 1.5; }
    .sh-ed-head { margin-bottom: 12px; }
    .sh-ed-title { width: 100%; font-family: var(--font-serif); font-size: 1.5rem; font-weight: 700; color: #181412; border: 1.5px solid transparent; border-radius: 8px; padding: 2px 6px; margin-left: -6px; background: transparent; outline: none; }
    .sh-ed-title:hover { border-color: #EFE6D4; } .sh-ed-title:focus { border-color: #C8A96E; background: #FFFDF9; }
    .sh-ed-meta { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 0.92rem; color: #78716C; font-weight: 600; margin-top: 2px; }
    .sh-ed-stepper { display: inline-flex; align-items: center; gap: 6px; } .sh-ed-stepper b { font-size: 0.86rem; color: #44403C; min-width: 66px; text-align: center; }
    .sh-ed-stepper button { width: 30px; height: 30px; border-radius: 999px; border: 1.5px solid #DCD3C3; background: #FFFFFF; font-size: 1.05rem; font-weight: 800; color: #44403C; cursor: pointer; }
    .sh-ed-add { display: flex; gap: 8px; margin-bottom: 12px; }
    .sh-ed-add input, .sh-ed-input { flex: 1; min-width: 0; width: 100%; padding: 11px 13px; font-size: 0.98rem; border: 1.5px solid #DCD3C3; border-radius: 10px; background: #FFFDF9; outline: none; font-family: inherit; }
    .sh-ed-add input:focus, .sh-ed-input:focus { border-color: #C8A96E; box-shadow: 0 0 0 3px rgba(232, 199, 125, 0.25); }
    .sh-ed-add button { padding: 0 16px; font-size: 0.95rem; font-weight: 800; color: #3B2A12; background: linear-gradient(135deg, #FDE68A, #E8C77D); border: 1.5px solid #C8A96E; border-radius: 10px; cursor: pointer; }
    .sh-ed-list { display: flex; flex-direction: column; gap: 6px; }
    .sh-ed-item { border: 1.5px solid #EFE6D4; border-radius: 12px; background: #FFFFFF; overflow: hidden; }
    .sh-ed-item.open { border-color: #C8A96E; box-shadow: 0 6px 16px -10px rgba(180, 135, 40, 0.5); }
    .sh-ed-row { width: 100%; display: flex; align-items: center; gap: 7px; padding: 10px 10px; background: transparent; border: none; cursor: pointer; text-align: left; font-family: inherit; }
    .sh-ed-row:hover { background: #FFFBF0; }
    .sh-ed-seat { width: 24px; height: 24px; border-radius: 999px; background: #F5EFE6; color: #78716C; font-size: 0.8125rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .sh-ed-name { flex: 1; min-width: 0; font-size: 0.94rem; font-weight: 700; color: #181412; line-height: 1.25; }
    .sh-ed-tag { font-size: 0.8125rem; font-weight: 700; color: #78716C; background: #F5F1EA; padding: 2px 8px; border-radius: 999px; flex-shrink: 0; }
    .sh-ed-tag.warn { color: #9F1239; background: #FFF1F2; }
    .sh-ed-chev { color: #A8A29E; font-size: 0.8125rem; flex-shrink: 0; }
    .sh-ed-detail { padding: 4px 12px 14px; background: #FFFBF3; border-top: 1px solid #F1E8D6; }
    .sh-ed-label { font-size: 0.8125rem; font-weight: 800; color: #78716C; text-transform: uppercase; letter-spacing: 0.05em; margin: 12px 0 6px; }
    .sh-ed-chips { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
    .sh-ed-chip { display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 8px 4px; font-size: 0.88rem; font-weight: 800; color: #181412; background: #FFFFFF; border: 1.5px solid #E2D9C8; border-radius: 10px; cursor: pointer; }
    .sh-ed-chip small { font-size: 0.8125rem; font-weight: 600; color: #059669; }
    .sh-ed-chip:hover:not(.full) { border-color: #C8A96E; background: #FFF8E8; }
    .sh-ed-chip.full { opacity: 0.45; cursor: not-allowed; } .sh-ed-chip.full small { color: #A8A29E; }
    .sh-ed-chip.expand small { color: #8C2D19; font-weight: 700; }
    .sh-ed-meal-pill { border: 1px solid #E2D9C8; cursor: pointer; font-family: inherit; transition: background 0.15s, border-color 0.15s; } .sh-ed-meal-pill:hover { background: #FEF3C7; border-color: #C8A96E; color: #3B2A12; }
    .sh-ed-find-wrap { position: relative; margin-bottom: 8px; } .sh-ed-find-input { width: 100%; padding: 8px 28px 8px 11px; font-size: 0.88rem; border: 1.5px solid #DCD3C3; border-radius: 10px; background: #FAF7F2; font-family: inherit; outline: none; } .sh-ed-find-input:focus { border-color: #C8A96E; background: #FFFFFF; }
    .sh-ed-find-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 1.15rem; font-weight: 800; color: #78716C; cursor: pointer; padding: 2px 6px; line-height: 1; }
    .sh-ed-tbl-strip { display: flex; gap: 5px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 8px; border-bottom: 1px solid #F1E8D6; }
    .sh-ed-tbl-pill { flex-shrink: 0; padding: 5px 8px; font-size: 0.78rem; font-weight: 700; color: #44403C; background: #FAF7F2; border: 1px solid #E2D9C8; border-radius: 999px; cursor: pointer; font-family: inherit; } .sh-ed-tbl-pill small { font-weight: 600; color: #78716C; } .sh-ed-tbl-pill.has-free small { color: #059669; } .sh-ed-tbl-pill.on { background: #FEF3C7; border-color: #B89352; color: #3B2A12; }
    .sh-ed-tally { font-size: 0.80rem; font-weight: 600; color: #8A6A2E; background: #FAF7F2; border: 1px solid #EFE6D4; border-radius: 8px; padding: 5px 8px; margin-top: 6px; }
    .sh-ed-bulk-box { background: #FFFBF3; border: 1.5px solid #E8D8B0; border-radius: 10px; padding: 8px; margin-bottom: 10px; }
    .sh-ed-find-results { margin-top: 4px; background: #FFFFFF; border: 1.5px solid #E2D3B5; border-radius: 10px; padding: 4px; max-height: 210px; overflow-y: auto; box-shadow: 0 10px 24px -12px rgba(60,40,10,0.28); }
    .sh-ed-find-item { width: 100%; display: flex; align-items: center; gap: 8px; padding: 7px 9px; background: transparent; border: none; border-radius: 7px; cursor: pointer; text-align: left; font-family: inherit; } .sh-ed-find-item:hover { background: #FFF8E8; } .sh-ed-find-name { flex: 1; font-size: 0.88rem; font-weight: 700; color: #181412; } .sh-ed-find-empty { padding: 8px; font-size: 0.84rem; color: #78716C; text-align: center; }
    .sh-ed-conflict-alert { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 10px; margin-bottom: 10px; background: #FFF1F2; border: 1.5px solid #FECDD3; border-radius: 10px; font-size: 0.84rem; color: #9F1239; }
    .sh-ed-menu-sec { padding: 6px 10px 3px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #8A6A2E; border-top: 1px solid #F1E8D6; margin-top: 4px; } .sh-ed-menu-sec:first-child { border-top: none; margin-top: 0; }
    .sh-ed-cap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; padding: 4px 6px 6px; } .sh-ed-cap-grid button { justify-content: center !important; text-align: center !important; border: 1px solid #E2D9C8 !important; padding: 6px 4px !important; }
    .sh-ed-seg { display: flex; gap: 6px; } .sh-ed-seg.wrap { flex-wrap: wrap; }
    .sh-ed-seg button { flex: 1 1 auto; padding: 8px 10px; font-size: 0.88rem; font-weight: 700; color: #44403C; background: #FFFFFF; border: 1.5px solid #E2D9C8; border-radius: 9px; cursor: pointer; white-space: nowrap; }
    .sh-ed-seg button.on { background: linear-gradient(135deg, #FEF3C7, #FDE68A); border-color: #B89352; color: #3B2A12; }
    .sh-ed-remove { display: block; width: 100%; margin-top: 14px; padding: 9px; font-size: 0.90rem; font-weight: 700; color: #9F1239; background: transparent; border: 1.5px dashed #FECDD3; border-radius: 10px; cursor: pointer; }
    .sh-ed-remove:hover { background: #FFF1F2; }
    .sh-ed-free { font-size: 0.88rem; color: #A8A29E; text-align: center; padding: 6px; }
    @media (max-width: 1080px) { .sh-ed-grid { grid-template-columns: minmax(0, 1fr); } .sh-ed-panel { position: static; max-height: none; } .sh-ed-hint { white-space: normal; } }
    /* Readability floor: nothing meant to be read renders under 13px (poster mock-up keeps its true scale) */
    body [style*="font-size:0.6"]:not(#sh-poster-preview *), body [style*="font-size:0.7"]:not(#sh-poster-preview *), body [style*="font-size:0.80rem"]:not(#sh-poster-preview *), body [style*="font-size:0.8rem"]:not(#sh-poster-preview *) { font-size: 0.8125rem !important; }
    .shw-wrap { max-width: 920px; margin: 0 auto; }
    .shw-layout { display: grid; grid-template-columns: minmax(0, 620px) 270px; gap: 24px; justify-content: center; align-items: start; }
    .shw-kit { position: sticky; top: 96px; background: #FFFDF9; border: 1px solid #E8DCC4; border-radius: 16px; padding: 20px 20px 16px; box-shadow: 0 1px 2px rgba(120, 85, 30, 0.04), 0 18px 40px -26px rgba(120, 85, 30, 0.28); }
    .shw-kit-titles { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
    .shw-kit-title { font-family: var(--font-sans); font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.17em; text-transform: uppercase; color: #8A6A2E; }
    .shw-kit-sub { font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; color: #181412; font-variant-numeric: lining-nums tabular-nums; font-feature-settings: "lnum" 1; white-space: nowrap; flex-shrink: 0; }
    .shw-kit-bar { height: 2px; background: #EFE6D4; border-radius: 999px; overflow: hidden; margin: 12px 0 8px; }
    .shw-kit-bar-fill { height: 100%; width: 0; background: #B89352; transition: width 0.5s ease; }
    .shw-kit-list { list-style: none; margin: 0; padding: 0; }
    .shw-kit-list li + li { border-top: 1px solid #F3EBDB; }
    .shw-kit-item { width: 100%; display: flex; align-items: center; gap: 13px; padding: 12px 2px; background: transparent; border: none; cursor: pointer; text-align: left; font-family: inherit; }
    .shw-kit-glyph { width: 22px; height: 22px; color: #CFC4B0; display: inline-flex; flex-shrink: 0; transition: color 0.35s ease; }
    .shw-kit-text { display: flex; flex-direction: column; min-width: 0; flex: 1; gap: 1px; }
    .shw-kit-text b { font-size: 0.92rem; font-weight: 600; color: #A39B8D; letter-spacing: 0.005em; transition: color 0.3s ease; }
    .shw-kit-text small { font-size: 0.8125rem; color: #B5AD9F; line-height: 1.3; transition: color 0.3s ease; }
    .shw-kit-dot { order: 3; width: 16px; height: 16px; border-radius: 999px; border: 1px solid #DDD2BC; flex-shrink: 0; position: relative; transition: all 0.3s ease; }
    .shw-kit-item:hover .shw-kit-text b { color: #57534E; }
    .shw-kit-item.done .shw-kit-glyph { color: #B89352; }
    .shw-kit-item.done .shw-kit-text b { color: #181412; }
    .shw-kit-item.done .shw-kit-text small { color: #78716C; }
    .shw-kit-item.done .shw-kit-dot { background: #B89352; border-color: #B89352; }
    .shw-kit-item.done .shw-kit-dot::after { content: ""; position: absolute; left: 4.5px; top: 2px; width: 4px; height: 7px; border: solid #FFFFFF; border-width: 0 1.5px 1.5px 0; transform: rotate(45deg); }
    .shw-kit-item.pop .shw-kit-glyph { animation: shwFade 0.6s ease; }
    @keyframes shwFade { from { opacity: 0.2; } to { opacity: 1; } }
    .shw-kit-foot { margin-top: 6px; padding-top: 14px; border-top: 1px solid #F3EBDB; font-family: var(--font-serif); font-style: italic; font-size: 0.92rem; color: #8A8173; text-align: center; line-height: 1.35; }
    @media (max-width: 960px) {
      .shw-layout { grid-template-columns: minmax(0, 1fr); gap: 12px; max-width: 620px; margin: 0 auto; }
      .shw-kit { position: static; order: -1; padding: 12px 14px 8px; border-radius: 14px; }
      .shw-kit-bar { margin: 8px 0 2px; }
      .shw-kit-list { display: flex; }
      .shw-kit-list li { flex: 1; min-width: 0; border-top: none !important; }
      .shw-kit-item { flex-direction: column; gap: 5px; padding: 8px 2px 6px; text-align: center; position: relative; }
      .shw-kit-glyph { width: 24px; height: 24px; }
      .shw-kit-text { flex: none; align-items: center; }
      .shw-kit-text b { font-size: 0.8125rem; line-height: 1.2; text-align: center; letter-spacing: 0; }
      .shw-kit-text small, .shw-kit-foot { display: none; }
      .shw-kit-dot { display: none; }
      .shw-kit-item.done::after { content: ""; position: absolute; left: 22%; right: 22%; bottom: 0; height: 2px; border-radius: 2px; background: #B89352; }
    }
    .shw-step { position: relative; }
    .shw-clear { position: absolute; top: -22px; right: 0; background: none; border: none; font-size: 0.84rem; font-weight: 700; color: #A8A29E; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; padding: 2px 4px; font-family: inherit; }
    .shw-clear:hover { color: #8C2D19; } .shw-clear[hidden] { display: none; }
    .nav-binder { display: inline-flex; align-items: center; gap: 7px; padding: 6px 12px; font-size: 0.86rem; font-weight: 800; color: #78350F; background: #FFFDF9; border: 1px solid #E2D3B5; border-radius: 999px; cursor: pointer; font-family: inherit; font-variant-numeric: tabular-nums; }
    .nav-binder:hover { border-color: #C8A96E; background: #FFF8E8; } .nav-binder.full { background: #B89352; color: #FFFFFF; border-color: #B89352; }
    .shw-dock { position: fixed; right: 14px; top: 50%; transform: translateY(-50%); z-index: 80; width: 66px; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 11px 6px 10px; background: #FFFDF9; border: 1px solid #E2D3B5; border-radius: 18px; box-shadow: 0 1px 2px rgba(120,85,30,0.06), 0 18px 38px -16px rgba(120,85,30,0.38); cursor: pointer; color: #B89352; font-family: inherit; animation: shwDockIn 0.4s ease; transition: box-shadow 0.2s ease, border-color 0.2s ease; }
    .shw-dock:hover { border-color: #C8A96E; box-shadow: 0 1px 2px rgba(120,85,30,0.06), 0 22px 44px -14px rgba(120,85,30,0.5); }
    @keyframes shwDockIn { from { opacity: 0; transform: translate(10px, -50%); } to { opacity: 1; transform: translate(0, -50%); } }
    .shw-dock-ico { display: inline-flex; } .shw-dock-count { font-family: var(--font-serif); font-size: 1.05rem; color: #181412; font-variant-numeric: lining-nums tabular-nums; font-feature-settings: "lnum" 1; line-height: 1; } .shw-dock-count b { font-weight: 700; font-size: 1.25rem; }
    .shw-dock-ticks { display: flex; flex-direction: column; gap: 3px; margin-top: 2px; } .shw-dock-ticks i { display: block; width: 26px; height: 3px; border-radius: 2px; background: #EADFC9; transition: background 0.3s ease; } .shw-dock-ticks i.on { background: #B89352; }
    .shw-dock.full { border-color: #B89352; }
    .shw-pop { position: fixed; right: 92px; top: 50%; transform: translateY(-50%); z-index: 85; width: 340px; max-height: 84vh; overflow-y: auto; background: #FFFDF9; border: 1px solid #E2D3B5; border-radius: 18px; padding: 18px 18px 14px; box-shadow: 0 30px 70px -24px rgba(60,40,10,0.45); animation: shwPopIn 0.2s ease; }
    @keyframes shwPopIn { from { opacity: 0; transform: translate(8px, -50%); } to { opacity: 1; transform: translate(0, -50%); } }
    .shw-pop-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
    .shw-pop-title { font-family: var(--font-serif); font-size: 1.45rem; font-weight: 600; color: #181412; line-height: 1.15; margin-top: 4px; }
    .shw-pop-x { width: 30px; height: 30px; border-radius: 999px; border: 1px solid #E2D9C8; background: #FFFFFF; font-size: 1.2rem; line-height: 1; color: #57534E; cursor: pointer; flex-shrink: 0; }
    .shw-pop-list { list-style: none; margin: 4px 0 0; padding: 0; }
    .shw-pop-row { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-top: 1px solid #F3EBDB; }
    .shw-pop-row:first-child { border-top: none; }
    .shw-pop-glyph { color: #CFC4B0; display: inline-flex; flex-shrink: 0; } .shw-pop-row.done .shw-pop-glyph { color: #B89352; }
    .shw-pop-text { display: flex; flex-direction: column; min-width: 0; flex: 1; } .shw-pop-text b { font-size: 0.92rem; font-weight: 600; color: #A39B8D; } .shw-pop-row.done .shw-pop-text b { color: #181412; }
    .shw-pop-text small { font-size: 0.8125rem; color: #B5AD9F; line-height: 1.3; } .shw-pop-row.done .shw-pop-text small { color: #78716C; }
    .shw-pop-actions { display: flex; gap: 10px; flex-shrink: 0; }
    .shw-pop-link { background: none; border: none; padding: 4px 2px; font-size: 0.84rem; font-weight: 700; color: #8C2D19; cursor: pointer; font-family: inherit; text-decoration: underline; text-underline-offset: 3px; } .shw-pop-link.muted, .shw-link.muted { color: #A8A29E; }
    .shw-pop-cta { margin-top: 12px; padding: 13px 16px; font-size: 0.98rem; }
    .shw-pop-foot { text-align: center; margin-top: 12px; font-size: 0.86rem; color: #78716C; } .shw-confirm { display: block; margin-bottom: 6px; }
    @media (max-width: 820px) {
      #nav-binder-btn { display: none !important; }
      .shw-dock { right: 12px; top: auto; bottom: 18px; transform: none; width: 60px; height: 60px; padding: 6px; border-radius: 999px; gap: 1px; justify-content: center; animation: shwDockInM 0.4s ease; }
      @keyframes shwDockInM { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      .shw-dock-ticks { display: none; } .shw-dock-ico svg { width: 20px; height: 20px; } .shw-dock-count { font-size: 0.9rem; } .shw-dock-count b { font-size: 1.05rem; }
      .shw-pop { right: 0; left: 0; top: auto; bottom: 0; transform: none; width: auto; max-height: 80vh; border-radius: 20px 20px 0 0; padding-bottom: 22px; animation: shwSheet 0.25s ease; }
      @keyframes shwSheet { from { transform: translateY(30px); opacity: 0; } to { transform: none; opacity: 1; } }
    }
    @media (prefers-reduced-motion: reduce) { .shw-dock, .shw-pop { animation: none; } }
    @media (prefers-reduced-motion: reduce) { .shw-kit-item.pop .shw-kit-glyph { animation: none; } .shw-kit-bar-fill { transition: none; } }
    .shw-intro { text-align: center; margin-bottom: 22px; }
    .shw-card { background: #FFFFFF; border: 1.5px solid #E2D3B5; border-radius: 22px; padding: 22px 32px 30px; box-shadow: 0 20px 48px -18px rgba(120, 85, 30, 0.22); }
    .shw-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; min-height: 28px; }
    .shw-back { background: none; border: none; color: #78716C; font-size: 0.92rem; font-weight: 700; cursor: pointer; padding: 4px 0; }
    .shw-back:hover { color: #181412; }
    .shw-count { font-size: 0.82rem; font-weight: 700; color: #A8A29E; letter-spacing: 0.02em; }
    .shw-bar { height: 4px; background: #F1EADC; border-radius: 999px; overflow: hidden; margin-bottom: 26px; }
    .shw-bar-fill { height: 100%; width: 20%; background: linear-gradient(90deg, #E8C77D, #B89352); border-radius: 999px; transition: width 0.3s ease; }
    .shw-step { display: none; animation: shwIn 0.22s ease; }
    .shw-step.active { display: block; }
    @keyframes shwIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    .shw-q { font-family: var(--font-serif); font-size: 1.85rem; font-weight: 700; color: #181412; line-height: 1.2; margin: 0 0 8px; text-align: center; }
    .shw-hint { font-size: 0.96rem; color: #78716C; margin: 0 0 20px; text-align: center; }
    .shw-label { display: block; font-size: 0.86rem; font-weight: 700; color: #57534E; margin: 16px 0 6px; }
    .shw-opt { font-weight: 500; color: #A8A29E; }
    .shw-input { width: 100%; padding: 14px 16px; font-size: 1.06rem; border: 1.5px solid #DCD3C3; border-radius: 12px; background: #FFFDF9; color: #181412; outline: none; font-family: inherit; transition: border-color 0.15s ease, box-shadow 0.15s ease; }
    .shw-input:focus { border-color: #C8A96E; box-shadow: 0 0 0 4px rgba(232, 199, 125, 0.25); background: #FFFFFF; }
    .shw-textarea { resize: vertical; line-height: 1.55; font-size: 1rem; }
    .shw-primary { display: block; width: 100%; margin-top: 22px; padding: 15px 18px; font-size: 1.05rem; font-weight: 800; color: #3B2A12; background: linear-gradient(135deg, #FDE68A 0%, #E8C77D 100%); border: 1.5px solid #C8A96E; border-radius: 12px; cursor: pointer; transition: transform 0.12s ease, box-shadow 0.15s ease; }
    .shw-primary:hover { box-shadow: 0 8px 20px -8px rgba(180, 135, 40, 0.5); }
    .shw-primary:active { transform: scale(0.98); }
    .shw-secondary { padding: 12px 18px; font-size: 0.98rem; font-weight: 800; color: #78350F; background: #FFFFFF; border: 1.5px solid #C8A96E; border-radius: 12px; cursor: pointer; flex-shrink: 0; }
    .shw-alt { text-align: center; margin-top: 14px; font-size: 0.94rem; color: #78716C; }
    .shw-link { background: none; border: none; padding: 0; color: #8C2D19; font-weight: 700; font-size: 0.94rem; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
    .shw-tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .shw-tile { padding: 20px 8px; font-size: 1.5rem; font-weight: 800; color: #181412; background: #FFFDF9; border: 1.5px solid #E2D9C8; border-radius: 14px; cursor: pointer; transition: all 0.14s ease; font-variant-numeric: tabular-nums; }
    .shw-tile:hover, .shw-table-card:hover { border-color: #C8A96E; background: #FFF8E8; transform: translateY(-1px); }
    .shw-tile.active, .shw-table-card.active { border-color: #B89352; background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); box-shadow: 0 6px 16px -8px rgba(180, 135, 40, 0.5); }
    .shw-other-row, .shw-apart-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; }
    .shw-apart-x { font-weight: 800; color: #A8A29E; flex-shrink: 0; }
    .shw-table-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    .shw-table-card { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 20px 10px 18px; background: #FFFDF9; border: 1.5px solid #E2D9C8; border-radius: 16px; cursor: pointer; transition: all 0.14s ease; }
    .shw-table-title { font-size: 1.05rem; font-weight: 800; color: #181412; }
    .shw-table-sub { font-size: 0.88rem; color: #78716C; font-weight: 600; }
    .shw-table-calc { margin-top: 4px; font-size: 0.8125rem; font-weight: 800; color: #78350F; background: #FEF3C7; border-radius: 999px; padding: 2px 10px; }
    .shw-table-calc:empty { display: none; }
    .shw-row-between { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
    .shw-apart-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
    .shw-chip { display: inline-flex; align-items: center; gap: 8px; padding: 7px 8px 7px 13px; background: #FFF1F2; border: 1px solid #FECDD3; color: #9F1239; border-radius: 999px; font-size: 0.92rem; font-weight: 700; }
    .shw-chip button { border: none; background: #FFFFFF; color: #9F1239; width: 22px; height: 22px; border-radius: 999px; cursor: pointer; font-size: 0.8125rem; }
    .shw-shake { animation: shwShake 0.35s ease; border-color: #E11D48 !important; }
    @keyframes shwShake { 0%, 100% { transform: none; } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
    @media (max-width: 600px) { .shw-card { padding: 18px 18px 24px; } .shw-q { font-size: 1.5rem; } .shw-table-grid { grid-template-columns: 1fr; } .shw-table-card { flex-direction: row; justify-content: flex-start; gap: 12px; padding: 12px 14px; } .shw-table-title, .shw-table-sub, .shw-table-calc { white-space: nowrap; } .shw-table-calc { margin: 0 0 0 auto; } .shw-tile { padding: 16px 6px; font-size: 1.3rem; } .shw-apart-row { flex-wrap: wrap; } .shw-apart-row .shw-input { flex: 1 1 40%; } }
    @media (prefers-reduced-motion: reduce) { .shw-step, .shw-shake { animation: none; } }
    .studio-scroll-builder-grid.full-stage .studio-hybrid-wizard { display: none; }
    .sh-wizard-stepper { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; max-width: 920px; margin: 0 auto 16px; background: #FAF3E6; border: 1.5px solid #DFD3BE; border-radius: 14px; padding: 6px; }
    .sh-wizard-step-pill { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 12px; border-radius: 10px; border: 1px solid transparent; background: transparent; color: #57534E; font-size: 0.88rem; font-weight: 800; cursor: pointer; transition: all 0.16s ease; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sh-wizard-step-pill:hover { background: #FFFDF9; color: #181412; border-color: #E2D9C8; }
    .sh-wizard-step-pill.active { background: linear-gradient(135deg, #FDE68A 0%, #E8C77D 100%); color: #3B2A12; border-color: #C8A96E; box-shadow: 0 4px 12px rgba(180, 135, 40, 0.16); }
    .sh-wizard-step-pill.completed { background: #FFFFFF; color: #065F46; border-color: #A7F3D0; }
    .sh-wizard-step-num { width: 22px; height: 22px; border-radius: 999px; background: rgba(24, 20, 18, 0.08); color: inherit; font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .sh-wizard-step-pill.active .sh-wizard-step-num { background: #FFFFFF; color: #78350F; border: 1px solid #C8A96E; }
    .sh-wizard-step-pill.completed .sh-wizard-step-num { background: #ECFDF5; color: #065F46; }
    .studio-sticky-right-col { position: sticky; top: 76px; display: flex; flex-direction: column; gap: 10px; z-index: 15; min-width: 0; width: 100%; max-width: 100%; }
    .studio-hybrid-wizard { display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px; min-width: 0; width: 100%; max-width: 100%; }
    .studio-wizard-step { display: none; background: #FFFFFF; border: 2px solid #C8A96E; border-radius: 16px; overflow: hidden; padding: 10px 14px 14px; box-shadow: 0 12px 28px rgba(24, 20, 18, 0.07); scroll-margin-top: 90px; min-width: 0; width: 100%; max-width: 100%; }
    .studio-wizard-step.active { display: block; }
    .studio-wizard-header { width: 100%; padding: 8px 4px 10px; background: transparent; border: none; display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: default; text-align: left; white-space: nowrap; }
    .studio-wizard-step-title { font-size: 1.05rem; font-weight: 800; color: #181412; line-height: 1.3; min-width: 0; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .studio-wizard-step-summary { font-size: 0.82rem; font-weight: 700; color: #065F46; background: #ECFDF5; border: 1px solid #A7F3D0; padding: 3px 9px; border-radius: 999px; white-space: nowrap; flex-shrink: 0; max-width: 44%; overflow: hidden; text-overflow: ellipsis; }
    .studio-wizard-body { display: block; padding: 12px 4px 4px; border-top: 1px solid #EFEAE1; }
    .studio-field-label { display: block; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #57534E; margin-bottom: 6px; }
    .studio-chip-group { display: flex; flex-wrap: wrap; gap: 6px; }
    .studio-tap-chip { font-size: 0.88rem; font-weight: 700; padding: 7px 12px; border-radius: 999px; border: 1px solid #D6CFC2; background: #FAF8F5; color: #181412; cursor: pointer; transition: all 0.14s ease; max-width: 100%; white-space: nowrap; }
    .studio-tap-chip:hover { border-color: #C8A96E; background: #FAF3E3; }
    .studio-tap-chip.active { background: linear-gradient(135deg, #FDE68A 0%, #E8C77D 100%); color: #3B2A12; border-color: #C8A96E; font-weight: 800; }
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
    .bs-case-top-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
    .bs-case-badge { font-size: 12px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #B45309; background: #FEF3C7; padding: 4px 8px; border-radius: 6px; white-space: nowrap; }
    .bs-case-state-tag { font-size: 13px; font-weight: 700; color: #065F46; white-space: nowrap; }
    .bs-case-title { font-family: var(--font-serif); font-size: 22px; font-weight: 700; color: #1C1917; line-height: 1.22; margin: 0 0 8px 0; text-wrap: balance; }
    .bs-case-context { font-size: 16px; font-weight: 400; line-height: 1.54; color: #44403C; margin: 0; text-wrap: pretty; }
    .bs-case-math-box { background: #FAF7F2; border: 1.5px solid #E7DFD3; border-radius: 12px; padding: 14px 15px; display: flex; flex-direction: column; gap: 8px; font-variant-numeric: tabular-nums; font-family: var(--font-sans); }
    .bs-case-math-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; font-size: 14.5px; font-weight: 500; color: #44403C; line-height: 1.4; }
    .bs-case-math-row span:first-child { white-space: normal; }
    .bs-case-math-row span:last-child { white-space: nowrap; text-align: right; flex-shrink: 0; font-weight: 700; }
    .bs-case-math-total { border-top: 1.5px dashed #D6CBB9; padding-top: 8px; margin-top: 2px; font-size: 14.5px; font-weight: 800; color: #1C1917; }
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
    .bs-honest-table-wrap, .studio-ba-table-wrap { max-width: 1040px; margin: 68px auto 0; background: #FFFFFF; border: 1.5px solid #DFD6C7; border-radius: 22px; padding: 32px 28px; overflow-x: visible; box-shadow: 0 12px 32px -10px rgba(28, 25, 23, 0.07); }
    .bs-honest-title { font-family: var(--font-serif); font-size: 24px; font-weight: 700; color: #1C1917; margin-bottom: 22px; text-align: center; text-wrap: balance; }
    .bs-honest-table, .ba-table { width: 100%; table-layout: fixed; border-collapse: collapse; text-align: left; font-size: 16px; font-variant-numeric: tabular-nums; }
    .bs-honest-table th, .bs-honest-table td, .ba-table th, .ba-table td { padding: 13px 12px; border-bottom: 1px solid #E7DFD3; font-size: 15px; line-height: 1.4; white-space: normal; overflow-wrap: anywhere; vertical-align: middle; }
    .bs-honest-table th, .ba-table th { font-size: 13.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #57534E; background: #FAF7F2; white-space: normal; font-size: 13px; }
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
    .studio-carousel-tab.active { border: 2px solid #C8A96E; background: linear-gradient(135deg, #FDE68A 0%, #E8C77D 100%); color: #3B2A12; border-color: #C8A96E; box-shadow: 0 6px 18px rgba(180, 135, 40, 0.20); }
    .btn-gold-soft { background: linear-gradient(135deg, #FDE68A 0%, #E8C77D 100%); color: #3B2A12; border-color: #C8A96E; border: 1.5px solid #C8A96E; box-shadow: 0 8px 20px rgba(180, 135, 40, 0.20); }
    .btn-gold-soft:hover { background: linear-gradient(135deg, #FEF0B0 0%, #EDD08C 100%); transform: translateY(-1px); }
    .studio-showcase-annotation-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-bottom: 20px; }
    .studio-showcase-annotation-card { background: #FAF6EE; border: 1.5px solid #E2D9C8; border-radius: 14px; padding: 14px 16px; display: flex; gap: 11px; align-items: center; }
    .studio-showcase-num-badge { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #FDE68A 0%, #E8C77D 100%); color: #3B2A12; border: 1.5px solid #C8A96E; font-size: 0.84rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 3px 8px rgba(24, 20, 18, 0.18); }
    .studio-showcase-device-frame { position: relative; border-radius: 18px; overflow: hidden; border: 2px solid #D8C29D; background: #FAF6EE; box-shadow: 0 18px 42px rgba(24, 20, 18, 0.08); }
    .studio-showcase-img-wrap { position: relative; background: #FAF6EE; line-height: 0; max-height: 640px; overflow: hidden; }
    .studio-showcase-img-wrap img { width: 100%; height: auto; display: block; object-fit: cover; object-position: top center; }
    .studio-showcase-pin { position: absolute; z-index: 4; display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; background: linear-gradient(135deg, #FDE68A 0%, #E8C77D 100%); color: #3B2A12; padding: 0; border-radius: 50%; font-size: 0.82rem; font-weight: 900; box-shadow: 0 4px 12px rgba(180, 135, 40, 0.35); border: 2px solid #FFFFFF; pointer-events: none; }
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
      .sh-vsl-controls { flex-wrap: wrap; gap: 8px; padding: 10px 12px; }
      .sh-vsl-steps { order: -1; flex: 0 0 100%; width: 100%; }
      .sh-vsl-step-label { font-size: 13px; }
      .sh-vsl-play-btn { flex: 1 1 0%; justify-content: center; }
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
      .studio-stage-tabs, .sh-wizard-stepper { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .studio-wizard-header { flex-wrap: wrap; gap: 6px; padding: 10px 12px; }
      .studio-wizard-step-title { flex-wrap: wrap; font-size: 0.88rem; }
      .studio-wizard-step-summary { white-space: normal; font-size: 0.84rem; }
      .studio-baseline-kpi-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
      .studio-kpi-card { padding: 9px 8px; }
      .studio-kpi-val { font-size: 1.12rem; }
      .mobile-jump-canvas-btn { display: inline-flex; align-items: center; gap: 4px; }
    }
    @media (max-width: 520px) { .sh-display-h1 { font-size: 1.56rem; } }
    @media (max-width: 1200px) { #nav-binder-btn { display: none !important; } }
    @media (max-width: 1400px) { .nav-links .nav-link:nth-child(5) { display: none; } }
    @media (max-width: 1500px) { #nav-vault-label { font-size: 0; } #nav-vault-label::after { content: 'Save'; font-size: 0.82rem; } .nav-links { gap: 9px; } }
    @media (max-width: 820px) { .nav-links { display: none; } .mobile-subnav { display: flex; } .hide-mobile-text { display: none; } }
  </style>
  ${jsonLd ? `<script type="application/ld+json">${typeof jsonLd === 'string' ? JSON.stringify(JSON.parse(jsonLd)).replace(/</g, '\\u003c') : JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}
</head>`;
}

function renderNavbar() {
  return `<header class="navbar" role="banner"><div class="container nav-inner"><a href="/" id="nav-brand-logo-link" class="nav-brand" aria-label="SeatHarmony Home">${renderBrandLogoSvg(28)}<span>SeatHarmony</span></a><nav class="nav-links" aria-label="Primary Navigation"><a href="/#studio" class="nav-link" style="color:var(--accent-primary);font-weight:800;">1. Floorplan Studio</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}" class="nav-link">2. Caterer Meal Sheet (BEO)</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}" class="nav-link">3. 24&Prime;&times;36&Prime; Sign &amp; QR</a><a href="/#studio-zone2-how-it-works" class="nav-link">How It Works</a><a href="/directory" class="nav-link hide-1024">60+ Venue Layouts</a><a href="/#pricing" class="nav-link">Pricing</a></nav><div style="display:flex;align-items:center;gap:6px;flex-shrink:0;"><button type="button" id="nav-binder-btn" class="nav-binder" onclick="if(window.shwToggleBinder){window.shwToggleBinder();}" aria-label="Open your wedding binder" style="display:none;"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6.5" y="3.5" width="13" height="17" rx="1.6"/><path d="M6.5 8h-2.2M6.5 12h-2.2M6.5 16h-2.2M10.5 8.5h5M10.5 12h5"/></svg><span id="nav-binder-n">0/5</span></button><button type="button" id="nav-vault-btn" onclick="if(window.shOpenVaultModal){window.shOpenVaultModal();}" class="btn btn-secondary hide-1024" style="padding:7px 11px;font-size:0.82rem;" title="Save or Resume Your Reception Plan">&#128190; <span id="nav-vault-label">Save / My Event</span></button><a href="/buy/complete_dossier?target=estate-150" id="nav-primary-buy-cta" class="btn btn-primary" style="padding:7px 12px;font-size:0.82rem;"><span>Get <span class="hide-mobile-text">Wedding Print </span>Pack ($14.99)</span><span aria-hidden="true">&#8599;</span></a></div></div><div class="mobile-subnav" aria-label="Mobile Quick Navigation"><a href="/#studio" style="color:#8C2D19;font-weight:800;">1. Floorplan Studio</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}">2. Caterer Meal Sheet</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}">3. 24&Prime;&times;36&Prime; Sign</a><a href="#studio" onclick="if(window.shOpenVaultModal){window.shOpenVaultModal();return false;}">&#128190; Save / Login</a><a href="/#pricing">Pricing ($14.99)</a></div></header>`;
}

function renderFooter() {
  return `<footer class="footer" role="contentinfo"><div class="container"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:24px;padding-bottom:24px;border-bottom:1px solid var(--border-warm);"><div style="max-width:420px;"><div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:1.05rem;color:var(--text-primary);margin-bottom:8px;">${renderBrandLogoSvg(26)}<span>SeatHarmony Studio</span></div><p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.5;">Reception seating studio for couples and planners. Seat households together, export a Clockwise 12:00 Caterer BEO, and print 24&Prime;&times;36&Prime; welcome signs in minutes.</p></div><div style="display:flex;gap:36px;flex-wrap:wrap;"><div><div style="font-weight:800;color:var(--text-primary);margin-bottom:8px;font-size:0.82rem;text-transform:uppercase;letter-spacing:0.06em;">Reception Deliverables</div><div style="display:flex;flex-direction:column;gap:6px;"><a href="/#studio" style="color:var(--text-secondary);text-decoration:none;">Interactive Reception Floorplan</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}" style="color:var(--text-secondary);text-decoration:none;">Clockwise Caterer Meal Sheet (BEO)</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}" style="color:var(--text-secondary);text-decoration:none;">24&Prime;&times;36&Prime; Easel Sign &amp; Avery 5302 Cards</a><a href="/directory" style="color:var(--text-secondary);text-decoration:none;">60+ Venue Floorplan Templates</a></div></div><div><div style="font-weight:800;color:var(--text-primary);margin-bottom:8px;font-size:0.82rem;text-transform:uppercase;letter-spacing:0.06em;">Legal &amp; Specs</div><div style="display:flex;flex-direction:column;gap:6px;"><a href="/privacy" style="color:var(--text-secondary);text-decoration:none;">Privacy Policy</a><a href="/terms" style="color:var(--text-secondary);text-decoration:none;">Terms of Service</a><a href="/#faq" style="color:var(--text-secondary);text-decoration:none;">Print &amp; Refund FAQ</a><a href="/sitemap.xml" style="color:var(--text-secondary);text-decoration:none;">XML Sitemap</a></div></div></div></div><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;padding-top:18px;font-size:0.82rem;color:var(--text-muted);"><span>&copy; ${new Date().getFullYear()} SeatHarmony Studio. FedEx &amp; Staples Print-Ready PDFs, Place Cards &amp; Caterer Meal Sheets.</span><span>Couples Kept Together &bull; Clockwise Seat #1 Catering &bull; Avery 5302 Verified</span></div></div></footer>`;
}

module.exports = {
  escapeHtml,
  renderBrandLogoSvg,
  renderHead,
  renderNavbar,
  renderFooter,
  renderInteractiveScript
};

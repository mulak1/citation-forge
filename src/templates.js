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
  return `<svg id="citation-forge-logo-svg" width="${size}" height="${size}" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;"><rect x="1.5" y="1.5" width="33" height="33" rx="10" fill="#1B4D3E" stroke="#14382D" stroke-width="1.2"/><circle cx="18" cy="18" r="6.8" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.4"/><circle cx="18" cy="18" r="2.2" fill="#1B4D3E"/><circle cx="18" cy="7.2" r="2.2" fill="#FFFFFF"/><circle cx="25.6" cy="10.4" r="2.0" fill="#A7F3D0"/><circle cx="28.8" cy="18" r="2.0" fill="#FFFFFF"/><circle cx="25.6" cy="25.6" r="2.0" fill="#A7F3D0"/><circle cx="18" cy="28.8" r="2.0" fill="#FFFFFF"/><circle cx="10.4" cy="25.6" r="2.0" fill="#A7F3D0"/><circle cx="7.2" cy="18" r="2.0" fill="#FFFFFF"/><circle cx="10.4" cy="10.4" r="2.0" fill="#A7F3D0"/></svg>`;
}

function renderHead({
  title = 'SeatHarmony: Wedding Floorplan, Conflict-Free Seating Solver & 24"×36" Poster Studio',
  description = 'Seat 150 wedding guests in 30 seconds without family drama. Auto-solve divorced parent table buffers, generate clockwise caterer BEO meal sheets, and export print-ready 24"×36" welcome signs & Avery 5302 place cards.',
  canonicalPath = '/',
  jsonLd = null,
  ogSlug = 'home'
} = {}) {
  const baseUrl = (process.env.PUBLIC_URL || 'https://www.seatharmony.io').replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  const ogImageUrl = `${baseUrl}/api/og?slug=${encodeURIComponent(ogSlug)}`;

  return `<!DOCTYPE html>
<html lang="en" data-seatharmony-native="1">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="google-site-verification" content="Sk7dRtaz5DGBvS_XwvTl29d3iLNaDQYOHWDMeZXsz20" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <meta name="theme-color" content="#FFFFFF" />
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
      --bg-primary: #FCFAF7; --bg-elevated: #FFFFFF; --bg-surface: #F6F1EB; --bg-obsidian: #111827;
      --text-primary: #111827; --text-secondary: #4B5563; --text-muted: #6B7280;
      --accent-primary: #134E3F; --accent-primary-hover: #0E392E; --accent-primary-soft: #ECFDF5;
      --accent-gold: #C59B27; --accent-gold-soft: #FFFBEB; --accent-gold-dark: #8A6508;
      --accent-emerald: #134E3F; --accent-rose: #B43444; --accent-rose-soft: #FDF2F4;
      --border-warm: #E5E0D8; --border-subtle: #EDE8E1;
      --font-serif: 'Cormorant Garamond', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { overflow-x: clip; }
    body { max-width: 100%; overflow-x: clip; font-size: 16px; background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); line-height: 1.55; -webkit-font-smoothing: antialiased; }
    button, input, select, textarea, svg text { font-family: var(--font-sans); }
    .container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
    .serif-display { font-family: var(--font-serif); font-weight: 700; letter-spacing: -0.015em; line-height: 1.15; }
    .mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
    .tabular { font-variant-numeric: tabular-nums; }
    .navbar { position: sticky; top: 0; z-index: 90; overflow-x: clip; background: rgba(250, 247, 242, 0.97); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-warm); }
    .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 60px; gap: 14px; flex-wrap: nowrap; }
    .nav-brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.08rem; color: var(--text-primary); text-decoration: none; white-space: nowrap; flex-shrink: 0; font-family: var(--font-serif); letter-spacing: -0.01em; }
    .nav-links { display: flex; align-items: center; gap: 14px; flex-wrap: nowrap; white-space: nowrap; }
    .nav-link { font-size: 0.86rem; font-weight: 600; color: var(--text-secondary); text-decoration: none; white-space: nowrap; transition: color 0.15s ease; }
    .nav-link:hover { color: var(--accent-primary); }
    .nav-badge-soon { font-size: 0.80rem; font-weight: 700; text-transform: none; padding: 2px 8px; border-radius: 999px; background: var(--accent-primary-soft); color: var(--accent-primary); border: 1px solid #C4DFD5; margin-left: 4px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; border-radius: 999px; font-weight: 700; font-size: 0.94rem; cursor: pointer; border: 1.5px solid transparent; text-decoration: none; white-space: nowrap; transition: all 0.18s ease; }
    .btn-primary { background: var(--accent-primary); color: #FFFFFF; border-color: var(--accent-primary); box-shadow: 0 4px 14px rgba(27, 77, 62, 0.22); }
    .btn-primary:hover { background: var(--accent-primary-hover); border-color: var(--accent-primary-hover); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(27, 77, 62, 0.28); }
    .btn-secondary { background: #FFFFFF; color: var(--text-primary); border-color: var(--border-warm); box-shadow: 0 2px 8px rgba(31, 27, 24, 0.04); }
    .btn-secondary:hover { background: var(--bg-surface); border-color: var(--accent-gold); color: var(--text-primary); }
    .studio-zone-section, #studio, #studio-zone2-how-it-works, #beo-proof, #bs-before-after-section, #bs-written-testimonials-section, #pricing, #faq { padding: 28px 0; width: 100%; box-sizing: border-box; scroll-margin-top: 60px; }
    #studio { padding: 12px 0 20px; }
    #studio-bespoke-artifact-stage { padding: 14px; width: 100%; box-sizing: border-box; scroll-margin-top: 60px; }
    .mobile-jump-canvas-btn { display: none; }
    .studio-eyebrow-kicker, .bs-section-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-sans); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.02em; text-transform: none; color: var(--accent-primary); background: var(--accent-primary-soft); border: 1px solid #C4DFD5; padding: 5px 14px; border-radius: 999px; margin-bottom: 8px; max-width: 100%; white-space: nowrap; }
    .studio-zone-title, .bs-section-h2 { font-family: var(--font-serif); font-size: clamp(1.6rem, 2.4vw, 2.2rem); font-weight: 700; color: var(--text-primary); line-height: 1.15; letter-spacing: -0.015em; margin: 0 0 8px 0; text-wrap: balance; }
    .studio-zone-title em, .bs-section-h2 em { font-style: italic; color: var(--accent-primary); font-weight: 600; }
    .studio-zone-sub, .bs-section-sub { font-size: 0.96rem; color: var(--text-secondary); line-height: 1.5; max-width: 60ch; margin: 0 auto; text-wrap: pretty; }
    .bs-section-header { max-width: 800px; margin: 0 auto 24px; text-align: center; }
    .studio-zone1-hero { padding: 36px 0 44px; background: linear-gradient(180deg, #FDFBF7 0%, #FAF7F2 100%); border-bottom: 1px solid var(--border-warm); }
    .sh-zone1-stack { display: flex; flex-direction: column; align-items: stretch; gap: 40px; max-width: 1200px; margin: 0 auto; }
    .sh-zola-hero-split { display: grid; grid-template-columns: 1.08fr 0.92fr; gap: 48px; align-items: center; }
    .sh-zola-hero-left { display: flex; flex-direction: column; align-items: flex-start; text-align: left; gap: 20px; }
    .sh-zola-hero-right { width: 100%; min-width: 0; }
    .sh-zone1-header-block { display: flex; flex-direction: column; align-items: flex-start; text-align: left; gap: 16px; max-width: 640px; }
    .sh-eyebrow-pill { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-primary-soft); border: 1px solid #C4DFD5; color: var(--accent-primary); padding: 7px 16px; border-radius: 999px; font-size: 13.5px; font-weight: 700; letter-spacing: 0.02em; text-transform: none; white-space: nowrap; }
    .sh-eyebrow-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-primary); box-shadow: 0 0 0 3px rgba(27, 77, 62, 0.16); }
    .sh-display-h1 { font-family: var(--font-serif); font-size: clamp(2.25rem, 3.5vw, 3.15rem); font-weight: 700; line-height: 1.10; letter-spacing: -0.02em; color: var(--text-primary); margin: 0; text-wrap: balance; }
    .sh-display-h1 .sh-h1-accent { color: var(--accent-primary); display: inline; font-style: italic; }
    .sh-lead-sub { font-size: 1.12rem; line-height: 1.62; color: var(--text-secondary); margin: 0; max-width: 54ch; text-wrap: pretty; }
    .sh-zola-hero-trust-list { list-style: none; margin: 6px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; font-size: 0.98rem; color: var(--text-primary); font-weight: 600; }
    .sh-zola-hero-trust-list li { display: flex; align-items: center; gap: 12px; line-height: 1.4; }
    .sh-zola-trust-check { width: 22px; height: 22px; border-radius: 999px; background: var(--accent-primary-soft); border: 1px solid #C4DFD5; color: var(--accent-primary); font-size: 13px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .sh-zola-showcase-card { background: #FFFFFF; border: 1px solid var(--border-warm); border-radius: 22px; padding: 22px; box-shadow: 0 20px 48px -14px rgba(31, 27, 24, 0.09); display: flex; flex-direction: column; gap: 16px; }
    .sh-zola-showcase-photo-wrap { position: relative; border-radius: 16px; overflow: hidden; border: 1px solid var(--border-warm); background: var(--bg-surface); }
    .sh-zola-showcase-photo { width: 100%; height: 320px; object-fit: cover; object-position: center 24%; display: block; }
    .sh-zola-floating-badges { display: none !important; }
    .sh-zola-floating-pill { background: rgba(255, 255, 255, 0.98); border: 1px solid var(--border-warm); color: var(--text-primary); padding: 7px 14px; border-radius: 999px; font-size: 13px; font-weight: 700; box-shadow: 0 4px 14px rgba(31, 27, 24, 0.08); display: inline-flex; align-items: center; gap: 6px; }
    .sh-zola-showcase-footer { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; background: var(--bg-primary); border: 1px solid var(--border-warm); border-radius: 14px; padding: 14px 18px; }
    .sh-vsl-player-shell { width: 100%; background: #FFFFFF; color: var(--text-primary); border: 1px solid var(--border-warm); border-radius: 22px; overflow: hidden; box-shadow: 0 20px 48px -14px rgba(31, 27, 24, 0.09); }
    .sh-vsl-garland-frieze { background: var(--bg-surface); border-bottom: 1px solid var(--border-warm); padding: 2px 0 0; }
    .sh-vsl-stage { padding: 18px; display: block; background: #FFFFFF; }
    .sh-vsl-scene { width: 100%; grid-area: 1 / 1; visibility: hidden; }
    .sh-vsl-scene.active { visibility: visible; }
    .sh-vsl-scene-grid { display: grid; grid-template-columns: 1.04fr 0.96fr; gap: 28px; align-items: center; }
    .sh-vsl-speaker-row { display: flex; align-items: center; gap: 11px; margin-bottom: 12px; }
    .sh-vsl-speaker-avatar { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 1.5px solid #E5E7EB; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06); flex-shrink: 0; }
    .sh-vsl-speaker-meta { display: flex; flex-direction: column; gap: 3px; }
    .sh-vsl-speaker-name { font-size: 14.5px; font-weight: 700; color: #1C1C1C; line-height: 1.25; }
    .sh-vsl-scene-kicker { display: inline-block; font-size: 13px; font-weight: 600; letter-spacing: 0.01em; color: #1B4D3E; text-transform: none; }
    .sh-vsl-scene-h3 { font-family: var(--font-serif); font-size: 24px; font-weight: 700; line-height: 1.22; color: #1C1C1C; margin: 0 0 10px 0; text-wrap: balance; }
    .sh-vsl-scene-p { font-size: 16px; font-weight: 400; line-height: 1.56; color: #4B5563; margin: 0; text-wrap: pretty; }
    .sh-vsl-caption-pill { display: inline-flex; align-items: center; gap: 10px; margin-top: 14px; background: #F8F7F4; border: 1px solid #E5E7EB; border-left: 3px solid #6B7280; color: #374151; padding: 9px 14px; border-radius: 10px; font-size: 14px; line-height: 1.42; }
    .sh-vsl-caption-good { background: #EBF4F0; border: 1px solid #C4DFD5; border-left: 3px solid #1B4D3E; color: #0F5132; }
    .sh-vsl-overlap-collage { position: relative; display: flex; flex-direction: column; gap: 10px; padding: 2px; }
    .sh-vsl-main-photo-frame { position: relative; width: 100%; border-radius: 16px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.12); z-index: 1; }
    .sh-vsl-main-photo { width: 100%; height: 256px; object-fit: cover; object-position: center 22%; display: block; }
    .sh-vsl-overlap-card { position: relative; margin: 0; border-radius: 12px; padding: 12px 15px; box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05); z-index: 2; display: flex; flex-direction: column; gap: 4px; font-variant-numeric: tabular-nums; }
    .sh-vsl-overlap-bad { background: #F8F7F4; border: 1px solid #E5E7EB; }
    .sh-vsl-overlap-warn { background: #F8F7F4; border: 1px solid #E5E7EB; }
    .sh-vsl-overlap-good { background: #EBF4F0; border: 1px solid #A7F3D0; }
    .sh-vsl-overlap-kicker { font-size: 13px; font-weight: 700; text-transform: none; letter-spacing: 0.01em; color: #4B5563; }
    .sh-vsl-overlap-big-num { display: flex; align-items: center; gap: 9px; font-size: 22px; font-weight: 800; color: #1C1C1C; line-height: 1.15; }
    .sh-vsl-overlap-big-num small { font-size: 13px; font-weight: 700; background: #F3F4F6; color: #374151; padding: 2px 8px; border-radius: 6px; }
    .sh-vsl-overlap-good .sh-vsl-overlap-big-num small { background: #C4DFD5; color: #1B4D3E; }
    .sh-vsl-overlap-sub { font-size: 14px; color: #4B5563; line-height: 1.42; }
    .sh-vsl-overlap-list { display: flex; flex-direction: column; gap: 4px; font-size: 14px; color: #374151; line-height: 1.45; }
    .sh-vsl-controls { display: flex; align-items: center; gap: 12px; padding: 12px 18px; background: #F8F7F4; border-top: 1px solid #E5E7EB; }
    .sh-vsl-play-btn { display: inline-flex; align-items: center; gap: 7px; background: #1B4D3E; color: #FFFFFF; border: 1px solid #1B4D3E; border-radius: 999px; padding: 8px 16px; font-size: 13.5px; font-weight: 700; cursor: pointer; flex-shrink: 0; box-shadow: 0 2px 6px rgba(27, 77, 62, 0.16); }
    .sh-vsl-progress-wrap { flex: 1; height: 8px; background: #E5E7EB; border-radius: 999px; overflow: hidden; cursor: pointer; }
    .sh-vsl-progress-bar { height: 100%; background: #1B4D3E; transition: width 0.25s ease; }
    .sh-vsl-steps { flex: 1; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; min-width: 0; }
    .sh-vsl-step { display: flex; flex-direction: column; align-items: stretch; gap: 5px; background: transparent; border: none; padding: 4px 0; cursor: pointer; text-align: left; min-width: 0; }
    .sh-vsl-step-track { display: block; height: 6px; background: #E5E7EB; border-radius: 999px; overflow: hidden; }
    .sh-vsl-step-fill { display: block; height: 100%; width: 0; background: #1B4D3E; border-radius: 999px; }
    .sh-vsl-step-label { font-size: 13px; font-weight: 600; color: #6B7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; }
    .sh-vsl-step.active .sh-vsl-step-label, .sh-vsl-step:hover .sh-vsl-step-label { color: #1B4D3E; font-weight: 700; }
    .sh-vsl-step:focus-visible { outline: 2px solid #1B4D3E; outline-offset: 2px; border-radius: 6px; }
    .sh-vsl-next-scene-btn:disabled { opacity: 0.4; cursor: default; }
    .sh-vsl-next-scene-btn { background: #FFFFFF; color: #1C1C1C; border: 1px solid #D1D5DB; border-radius: 999px; padding: 7px 14px; font-size: 13.5px; font-weight: 600; cursor: pointer; flex-shrink: 0; }
    .sh-zone1-cta-block { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .sh-surer-cta-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
    .sh-btn-primary { background: #1B4D3E; color: #FFFFFF; border: 1.5px solid #1B4D3E; padding: 14px 26px; border-radius: 999px; font-size: 15.5px; font-weight: 700; cursor: pointer; text-decoration: none; box-shadow: 0 4px 12px rgba(27, 77, 62, 0.18); transition: transform 0.16s ease, background-color 0.16s ease; }
    .sh-btn-primary:hover { background: #005F57; transform: translateY(-1px); }
    .sh-btn-secondary { background: #FFFFFF; color: #1C1C1C; border: 1.5px solid #D1D5DB; padding: 14px 22px; border-radius: 999px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; transition: background-color 0.16s ease, border-color 0.16s ease; }
    .sh-btn-secondary:hover { background: #F8F7F4; border-color: #9CA3AF; }
    .sh-opener-micro-trust { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 10px; font-size: 14.5px; color: #4B5563; margin-top: 4px; }
    .sh-crease-proof-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; width: 100%; max-width: 1180px; margin: 16px auto 0; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 16px; padding: 24px 28px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03); }
    .sh-crease-item { display: flex; flex-direction: column; gap: 6px; border-right: 1px solid #E5E7EB; padding-right: 16px; }
    .sh-crease-item:last-child { border-right: none; padding-right: 0; }
    .sh-crease-val { font-family: var(--font-serif); font-size: 1.75rem; font-weight: 700; color: #1C1C1C; line-height: 1.15; }
    .sh-crease-lbl { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.02em; color: #4B5563; line-height: 1.45; }
    .studio-how-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 22px; margin-top: 38px; }
    .studio-how-card { background: #FFFFFF; border: 1px solid var(--border-warm); border-radius: 18px; padding: 26px 24px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03); transition: transform 0.2s ease, border-color 0.2s ease; }
    .studio-how-card:hover { transform: translateY(-2px); border-color: #1B4D3E; }
    .studio-how-num { width: 40px; height: 40px; border-radius: 10px; background: #EBF4F0; color: #1B4D3E; border: 1px solid #C4DFD5; font-family: var(--font-mono); font-size: 1rem; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
    .studio-scroll-builder-grid { display: grid; grid-template-columns: minmax(340px, 390px) minmax(0, 1fr); gap: 20px; align-items: start; margin-top: 14px; transition: all 0.2s ease; width: 100%; max-width: 100%; }
    .studio-scroll-builder-grid.full-stage { grid-template-columns: minmax(0, 1fr); }
    .sh-ed-ghost { font-size: 0.88rem; font-weight: 600; color: #374151; background: #FFFFFF; border: 1px solid #D1D5DB; padding: 7px 13px; border-radius: 10px; cursor: pointer; white-space: nowrap; transition: border-color 0.15s ease, background 0.15s ease; }
    .sh-venue-cta { display: inline-flex; align-items: center; padding: 10px 18px; font-size: 0.94rem; font-weight: 700; color: #FFFFFF; background: #1B4D3E; border: 1.5px solid #1B4D3E; border-radius: 999px; text-decoration: none; box-shadow: 0 4px 12px rgba(27, 77, 62, 0.18); }
    .sh-venue-cta:hover { background: #005F57; }
    .sh-gdot { display: inline-block; width: 10px; height: 10px; border-radius: 999px; flex-shrink: 0; margin-right: 6px; vertical-align: middle; }
    .sh-ed-row .sh-gdot { margin: 0 0 0 -2px; }
    .sh-ed-legend { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 12px; }
    .sh-ed-legend:empty { display: none; }
    .sh-leg { display: inline-flex; align-items: center; padding: 6px 12px; font-size: 13px; font-weight: 600; color: #44403C; background: #FFFFFF; border: 1px solid #DCD3C3; border-radius: 999px; cursor: pointer; font-family: inherit; }
    .sh-leg b { margin-left: 6px; color: #6B7280; font-weight: 700; } .sh-leg:hover { border-color: #1B4D3E; } .sh-leg.on { background: #1B4D3E; color: #FFFFFF; border-color: #1B4D3E; } .sh-leg.on b { color: #C4DFD5; }
    .sh-ed-style { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 4px 0 12px; }
    .sh-ed-style .sh-ed-seg { flex: 1 1 200px; } .sh-ed-rot { display: flex; gap: 6px; }
    .sh-ed-rot button { padding: 8px 10px; font-size: 13px; font-weight: 700; color: #374151; background: #FFFFFF; border: 1.5px solid #E5E7EB; border-radius: 9px; cursor: pointer; white-space: nowrap; font-family: inherit; } .sh-ed-rot button:hover { border-color: #1B4D3E; }
    .sh-ed-seg button .sh-gdot { margin-right: 5px; }
    .sh-ed-ka { margin-top: 16px; padding-top: 12px; border-top: 1px solid #E5E7EB; }
    .sh-ed-ka-empty { font-size: 13px; color: #6B7280; line-height: 1.45; margin-bottom: 8px; }
    .sh-ed-ka-row { display: flex; align-items: center; gap: 8px; padding: 7px 0; flex-wrap: wrap; }
    .sh-ed-ka-names { flex: 1 1 140px; font-size: 14px; font-weight: 600; color: #1C1C1C; min-width: 0; }
    .sh-ed-ka-st { font-size: 12.5px; font-weight: 700; color: #6B7280; } .sh-ed-ka-st.ok { color: #1B4D3E; } .sh-ed-ka-st.bad { color: #9F1239; }
    .sh-ed-ka-btn { padding: 5px 10px; font-size: 13px; font-weight: 700; color: #9F1239; background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 8px; cursor: pointer; font-family: inherit; }
    .sh-ed-ka-x { border: none; background: transparent; font-size: 1.2rem; line-height: 1; color: #9CA3AF; cursor: pointer; padding: 0 4px; }
    .sh-ed-ka-form { display: grid; grid-template-columns: 1fr 1fr auto; gap: 6px; margin-top: 6px; }
    .sh-ed-ka-form input { min-width: 0; padding: 9px 10px; font-size: 16px; border: 1.5px solid #D1D5DB; border-radius: 9px; background: #FFFFFF; font-family: inherit; outline: none; } .sh-ed-ka-form input:focus { border-color: #1B4D3E; }
    .sh-ed-ka-form button { padding: 0 14px; font-size: 14px; font-weight: 700; color: #FFFFFF; background: #1B4D3E; border: 1.5px solid #1B4D3E; border-radius: 9px; cursor: pointer; font-family: inherit; }
    .sh-ed-menu-wrap { position: relative; display: inline-block; }
    .sh-ed-menu { position: absolute; right: 0; top: calc(100% + 6px); z-index: 30; min-width: 210px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 6px; box-shadow: 0 18px 40px -18px rgba(0,0,0,0.2); }
    .sh-ed-menu button { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; width: 100%; padding: 10px 12px; font-size: 14px; font-weight: 600; color: #1C1C1C; background: transparent; border: none; border-radius: 8px; cursor: pointer; text-align: left; font-family: inherit; } .sh-ed-menu button:hover { background: #EBF4F0; } .sh-ed-menu small { font-size: 12.5px; color: #6B7280; font-weight: 600; }
    .sh-el-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 6px 0; font-size: 14.5px; font-weight: 600; color: #374151; }
    .sh-ed-menu { max-height: 70vh; overflow-y: auto; }
    .sh-save-status { font-size: 13px; font-weight: 600; color: #1B4D3E; white-space: nowrap; }
    .sh-restore-note { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin: 0 0 14px; padding: 10px 14px; background: #EBF4F0; border: 1px solid #C4DFD5; border-radius: 12px; font-size: 14px; font-weight: 600; color: #374151; }
    .sh-restore-note button { background: none; border: none; font-family: inherit; font-size: 14px; font-weight: 700; color: #1B4D3E; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; padding: 2px 6px; }
    .sh-ed-ghost:hover { border-color: #1B4D3E; background: #EBF4F0; }
    .sh-ed-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
    .sh-ed-hint { flex: 1; min-width: 200px; font-size: 0.92rem; font-weight: 600; color: #4B5563; line-height: 1.35; }
    .sh-ed-grid { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(320px, 1fr); gap: 16px; align-items: stretch; }
    .sh-ed-grid > .sh-ed-canvas { grid-column: 1; grid-row: 1; height: 580px; min-height: 580px; max-height: 580px; display: flex; flex-direction: column; box-sizing: border-box; }
    .sh-ed-grid > .sh-ed-panel { grid-column: 2; grid-row: 1; height: 580px; min-height: 580px; max-height: 580px; overflow-y: auto; box-sizing: border-box; }
    .sh-ed-grid.panel-hidden { grid-template-columns: minmax(0, 1fr); }
    .sh-ed-grid.panel-hidden .sh-ed-panel { display: none !important; }
    .sh-ed-panel-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #E5E7EB; }
    .sh-ed-panel-top span { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #6B7280; }
    .sh-ed-panel-hide-btn { padding: 3px 9px; border-radius: 7px; border: 1px solid #D1D5DB; background: #F8F7F4; font-family: inherit; font-size: 0.75rem; font-weight: 600; color: #4B5563; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
    .sh-ed-panel-hide-btn:hover { border-color: #1B4D3E; background: #EBF4F0; color: #1C1C1C; }
    .sh-ed-canvas { position: relative; border-radius: 14px; border: 1px solid #E5E7EB; background: #FAF7F2; overflow: hidden; }
    .sh-canvas-reopen-btn { position: absolute; top: 14px; right: 14px; z-index: 25; padding: 8px 14px; border-radius: 10px; border: 1.5px solid #1B4D3E; background: #FFFFFF; color: #1B4D3E; font-family: inherit; font-size: 0.84rem; font-weight: 700; cursor: pointer; box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.14); display: none; align-items: center; gap: 6px; transition: transform 0.12s ease, background 0.12s ease; }
    .sh-canvas-reopen-btn:hover { background: #EBF4F0; transform: translateY(-1px); }
    .sh-ed-grid.panel-hidden .sh-canvas-reopen-btn { display: inline-flex !important; }
    .sh-ed-panel { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 16px; padding: 14px; overflow-y: auto; box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 0.08); }
    .sh-ed-empty { font-size: 0.98rem; color: #6B7280; text-align: center; padding: 40px 10px; line-height: 1.5; }
    .sh-ed-head { margin-bottom: 10px; }
    .sh-ed-title { width: 100%; font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700; color: #1C1C1C; border: 1.5px solid transparent; border-radius: 8px; padding: 2px 6px; margin-left: -6px; background: transparent; outline: none; }
    .sh-ed-title:hover { border-color: #E5E7EB; } .sh-ed-title:focus { border-color: #1B4D3E; background: #FFFFFF; }
    .sh-ed-meta { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 0.92rem; color: #6B7280; font-weight: 600; margin-top: 2px; }
    .sh-ed-stepper { display: inline-flex; align-items: center; gap: 6px; } .sh-ed-stepper b { font-size: 0.86rem; color: #374151; min-width: 66px; text-align: center; }
    .sh-ed-stepper button { width: 30px; height: 30px; border-radius: 999px; border: 1px solid #D1D5DB; background: #FFFFFF; font-size: 1.05rem; font-weight: 700; color: #374151; cursor: pointer; }
    .sh-ed-add { display: flex; gap: 8px; margin-bottom: 10px; }
    .sh-ed-add input, .sh-ed-input { flex: 1; min-width: 0; width: 100%; padding: 9px 12px; font-size: 16px; border: 1px solid #D1D5DB; border-radius: 10px; background: #FFFFFF; outline: none; font-family: inherit; }
    .sh-ed-add input:focus, .sh-ed-input:focus { border-color: #1B4D3E; box-shadow: 0 0 0 3px rgba(27, 77, 62, 0.14); }
    .sh-ed-add button { padding: 0 14px; font-size: 0.92rem; font-weight: 700; color: #FFFFFF; background: #1B4D3E; border: 1px solid #1B4D3E; border-radius: 10px; cursor: pointer; }
    .sh-ed-list { display: flex; flex-direction: column; gap: 6px; }
    .sh-ed-item { border: 1px solid #E5E7EB; border-radius: 10px; background: #FFFFFF; overflow: hidden; min-width: 0; }
    .sh-ed-item.open { border-color: #1B4D3E; box-shadow: 0 4px 12px -6px rgba(27, 77, 62, 0.25); }
    .sh-ed-row { width: 100%; display: flex; align-items: center; gap: 6px; padding: 7px 10px; background: transparent; border: none; cursor: pointer; text-align: left; font-family: inherit; min-width: 0; overflow: hidden; box-sizing: border-box; }
    .sh-ed-row:hover { background: #F8F7F4; }
    .sh-ed-seat { width: 22px; height: 22px; border-radius: 999px; background: #F3F4F6; color: #4B5563; font-size: 0.78rem; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .sh-ed-name { flex: 1; min-width: 0; font-size: 0.86rem; font-weight: 700; color: #1C1C1C; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sh-ed-tag { font-size: 0.76rem; font-weight: 600; color: #4B5563; background: #F3F4F6; padding: 2px 6px; border-radius: 999px; flex-shrink: 0; }
    .sh-ed-tag.warn { color: #9F1239; background: #FFF1F2; }
    .sh-ed-chev { color: #9CA3AF; font-size: 0.78rem; flex-shrink: 0; }
    .sh-ed-detail { padding: 4px 12px 14px; background: #F8F7F4; border-top: 1px solid #E5E7EB; }
    .sh-ed-label { font-size: 0.8125rem; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; margin: 12px 0 6px; }
    .sh-ed-chips { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
    .sh-ed-chip { display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 8px 4px; font-size: 0.88rem; font-weight: 700; color: #1C1C1C; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 10px; cursor: pointer; }
    .sh-ed-chip small { font-size: 0.8125rem; font-weight: 600; color: #1B4D3E; }
    .sh-ed-chip:hover:not(.full) { border-color: #1B4D3E; background: #EBF4F0; }
    .sh-ed-chip.full { opacity: 0.45; cursor: not-allowed; } .sh-ed-chip.full small { color: #9CA3AF; }
    .sh-ed-chip.expand small { color: #1B4D3E; font-weight: 700; }
    .sh-ed-meal-pill { border: 1px solid #E5E7EB; cursor: pointer; font-family: inherit; transition: background 0.15s, border-color 0.15s; } .sh-ed-meal-pill:hover { background: #EBF4F0; border-color: #1B4D3E; color: #1B4D3E; }
    .sh-ed-find-wrap { position: relative; margin-bottom: 8px; } .sh-ed-find-input { width: 100%; padding: 8px 28px 8px 11px; font-size: 0.88rem; border: 1px solid #D1D5DB; border-radius: 10px; background: #F8F7F4; font-family: inherit; outline: none; } .sh-ed-find-input:focus { border-color: #1B4D3E; background: #FFFFFF; }
    .sh-ed-find-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 1.15rem; font-weight: 800; color: #6B7280; cursor: pointer; padding: 2px 6px; line-height: 1; }
    .sh-ed-tbl-strip { display: flex; flex-wrap: wrap; gap: 5px; padding-bottom: 6px; margin-bottom: 8px; border-bottom: 1px solid #E5E7EB; max-width: 100%; }
    .sh-ed-tbl-pill { flex-shrink: 0; padding: 5px 8px; font-size: 0.78rem; font-weight: 600; color: #374151; background: #F8F7F4; border: 1px solid #E5E7EB; border-radius: 999px; cursor: pointer; font-family: inherit; } .sh-ed-tbl-pill small { font-weight: 600; color: #6B7280; } .sh-ed-tbl-pill.has-free small { color: #1B4D3E; } .sh-ed-tbl-pill.on { background: #EBF4F0; border-color: #1B4D3E; color: #1B4D3E; }
    .sh-ed-tally { font-size: 0.80rem; font-weight: 600; color: #4B5563; background: #F8F7F4; border: 1px solid #E5E7EB; border-radius: 8px; padding: 5px 8px; margin-top: 6px; }
    .sh-ed-bulk-box { background: #F8F7F4; border: 1px solid #E5E7EB; border-radius: 10px; padding: 8px; margin-bottom: 10px; }
    .sh-ed-find-results { margin-top: 4px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 10px; padding: 4px; max-height: 210px; overflow-y: auto; box-shadow: 0 10px 24px -12px rgba(0,0,0,0.18); }
    .sh-ed-find-item { width: 100%; display: flex; align-items: center; gap: 8px; padding: 7px 9px; background: transparent; border: none; border-radius: 7px; cursor: pointer; text-align: left; font-family: inherit; } .sh-ed-find-item:hover { background: #EBF4F0; } .sh-ed-find-name { flex: 1; font-size: 0.88rem; font-weight: 700; color: #1C1C1C; } .sh-ed-find-empty { padding: 8px; font-size: 0.84rem; color: #6B7280; text-align: center; }
    .sh-ed-conflict-alert { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 10px; margin-bottom: 10px; background: #FFF1F2; border: 1.5px solid #FECDD3; border-radius: 10px; font-size: 0.84rem; color: #9F1239; }
    .sh-ed-menu-sec { padding: 6px 10px 3px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6B7280; border-top: 1px solid #E5E7EB; margin-top: 4px; } .sh-ed-menu-sec:first-child { border-top: none; margin-top: 0; }
    .sh-ed-cap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; padding: 4px 6px 6px; } .sh-ed-cap-grid button { justify-content: center !important; text-align: center !important; border: 1px solid #E5E7EB !important; padding: 6px 4px !important; }
    .sh-ed-seg { display: flex; gap: 6px; } .sh-ed-seg.wrap { flex-wrap: wrap; }
    .sh-ed-seg button { flex: 1 1 auto; padding: 8px 10px; font-size: 0.88rem; font-weight: 600; color: #374151; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 9px; cursor: pointer; white-space: nowrap; }
    .sh-ed-seg button.on { background: #EBF4F0; border-color: #1B4D3E; color: #1B4D3E; font-weight: 700; }
    .sh-ed-remove { display: block; width: 100%; margin-top: 12px; padding: 8px; font-size: 0.88rem; font-weight: 700; color: #9F1239; background: transparent; border: 1.5px dashed #FECDD3; border-radius: 10px; cursor: pointer; }
    .sh-ed-remove:hover { background: #FFF1F2; }
    .sh-ed-free { font-size: 0.84rem; color: #9CA3AF; text-align: center; padding: 6px; border: 1px dashed #E5E7EB; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
    @media (max-width: 900px) {
      .sh-ed-grid { grid-template-columns: minmax(0, 1fr); }
      .sh-ed-grid > .sh-ed-canvas, .sh-ed-grid > .sh-ed-panel { grid-column: 1 !important; grid-row: auto !important; }
      .sh-ed-grid > .sh-ed-canvas { height: 380px !important; min-height: 380px !important; max-height: 380px !important; }
      #sh-floorplan-svg { height: 378px !important; min-height: 378px !important; max-height: 380px !important; }
      .sh-ed-grid > .sh-ed-panel { position: static; height: auto !important; min-height: 0 !important; max-height: 460px !important; }
      .sh-ed-list { grid-template-columns: minmax(0, 1fr); }
      .sh-ed-hint { white-space: normal; }
    }
    /* Readability floor: nothing meant to be read renders under 13px (poster mock-up keeps its true scale) */
    body [style*="font-size:0.6"]:not(#sh-poster-preview *), body [style*="font-size:0.7"]:not(#sh-poster-preview *), body [style*="font-size:0.80rem"]:not(#sh-poster-preview *), body [style*="font-size:0.8rem"]:not(#sh-poster-preview *) { font-size: 0.8125rem !important; }
    .shw-wrap { max-width: 920px; margin: 0 auto; }
    .shw-layout { display: grid; grid-template-columns: minmax(0, 620px) 270px; gap: 24px; justify-content: center; align-items: start; }
    .shw-kit { position: sticky; top: 96px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 16px; padding: 20px 20px 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04); }
    .shw-kit-titles { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
    .shw-kit-title { font-family: var(--font-sans); font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #1B4D3E; }
    .shw-kit-sub { font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; color: #1C1C1C; font-variant-numeric: lining-nums tabular-nums; font-feature-settings: "lnum" 1; white-space: nowrap; flex-shrink: 0; }
    .shw-kit-bar { height: 2px; background: #E5E7EB; border-radius: 999px; overflow: hidden; margin: 12px 0 8px; }
    .shw-kit-bar-fill { height: 100%; width: 0; background: #1B4D3E; transition: width 0.5s ease; }
    .shw-kit-list { list-style: none; margin: 0; padding: 0; }
    .shw-kit-list li + li { border-top: 1px solid #F3F4F6; }
    .shw-kit-item { width: 100%; display: flex; align-items: center; gap: 13px; padding: 12px 2px; background: transparent; border: none; cursor: pointer; text-align: left; font-family: inherit; }
    .shw-kit-glyph { width: 22px; height: 22px; color: #9CA3AF; display: inline-flex; flex-shrink: 0; transition: color 0.35s ease; }
    .shw-kit-text { display: flex; flex-direction: column; min-width: 0; flex: 1; gap: 1px; }
    .shw-kit-text b { font-size: 0.92rem; font-weight: 600; color: #6B7280; letter-spacing: 0.005em; transition: color 0.3s ease; }
    .shw-kit-text small { font-size: 0.8125rem; color: #9CA3AF; line-height: 1.3; transition: color 0.3s ease; }
    .shw-kit-dot { order: 3; width: 16px; height: 16px; border-radius: 999px; border: 1px solid #D1D5DB; flex-shrink: 0; position: relative; transition: all 0.3s ease; }
    .shw-kit-item:hover .shw-kit-text b { color: #1C1C1C; }
    .shw-kit-item.done .shw-kit-glyph { color: #1B4D3E; }
    .shw-kit-item.done .shw-kit-text b { color: #1C1C1C; }
    .shw-kit-item.done .shw-kit-text small { color: #4B5563; }
    .shw-kit-item.done .shw-kit-dot { background: #1B4D3E; border-color: #1B4D3E; }
    .shw-kit-item.done .shw-kit-dot::after { content: ""; position: absolute; left: 4.5px; top: 2px; width: 4px; height: 7px; border: solid #FFFFFF; border-width: 0 1.5px 1.5px 0; transform: rotate(45deg); }
    .shw-kit-item.pop .shw-kit-glyph { animation: shwFade 0.6s ease; }
    @keyframes shwFade { from { opacity: 0.2; } to { opacity: 1; } }
    .shw-kit-foot { margin-top: 6px; padding-top: 14px; border-top: 1px solid #F3F4F6; font-family: var(--font-serif); font-style: italic; font-size: 0.92rem; color: #6B7280; text-align: center; line-height: 1.35; }
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
      .shw-kit-item.done::after { content: ""; position: absolute; left: 22%; right: 22%; bottom: 0; height: 2px; border-radius: 2px; background: #1B4D3E; }
    }
    .shw-step { position: relative; }
    .shw-clear { position: absolute; top: -22px; right: 0; background: none; border: none; font-size: 0.84rem; font-weight: 600; color: #6B7280; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; padding: 2px 4px; font-family: inherit; }
    .shw-clear:hover { color: #1B4D3E; } .shw-clear[hidden] { display: none; }
    .nav-binder { display: inline-flex; align-items: center; gap: 7px; padding: 6px 12px; font-size: 0.86rem; font-weight: 700; color: #1B4D3E; background: #EBF4F0; border: 1px solid #C4DFD5; border-radius: 999px; cursor: pointer; font-family: inherit; font-variant-numeric: tabular-nums; }
    .nav-binder:hover { border-color: #1B4D3E; background: #C4DFD5; } .nav-binder.full { background: #1B4D3E; color: #FFFFFF; border-color: #1B4D3E; }
    .shw-dock { position: fixed; right: 14px; top: 50%; transform: translateY(-50%); z-index: 80; width: 66px; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 11px 6px 10px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); cursor: pointer; color: #1B4D3E; font-family: inherit; animation: shwDockIn 0.4s ease; transition: box-shadow 0.2s ease, border-color 0.2s ease; }
    .shw-dock:hover { border-color: #1B4D3E; box-shadow: 0 12px 28px rgba(27, 77, 62, 0.16); }
    @keyframes shwDockIn { from { opacity: 0; transform: translate(10px, -50%); } to { opacity: 1; transform: translate(0, -50%); } }
    .shw-dock-ico { display: inline-flex; } .shw-dock-count { font-family: var(--font-serif); font-size: 1.05rem; color: #1C1C1C; font-variant-numeric: lining-nums tabular-nums; font-feature-settings: "lnum" 1; line-height: 1; } .shw-dock-count b { font-weight: 700; font-size: 1.25rem; }
    .shw-dock-ticks { display: flex; flex-direction: column; gap: 3px; margin-top: 2px; } .shw-dock-ticks i { display: block; width: 26px; height: 3px; border-radius: 2px; background: #E5E7EB; transition: background 0.3s ease; } .shw-dock-ticks i.on { background: #1B4D3E; }
    .shw-dock.full { border-color: #1B4D3E; }
    .shw-pop { position: fixed; right: 92px; top: 50%; transform: translateY(-50%); z-index: 85; width: 340px; max-height: 84vh; overflow-y: auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 18px; padding: 18px 18px 14px; box-shadow: 0 24px 48px rgba(0,0,0,0.14); animation: shwPopIn 0.2s ease; }
    @keyframes shwPopIn { from { opacity: 0; transform: translate(8px, -50%); } to { opacity: 1; transform: translate(0, -50%); } }
    .shw-pop-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
    .shw-pop-title { font-family: var(--font-serif); font-size: 1.45rem; font-weight: 600; color: #1C1C1C; line-height: 1.15; margin-top: 4px; }
    .shw-pop-x { width: 30px; height: 30px; border-radius: 999px; border: 1px solid #E5E7EB; background: #FFFFFF; font-size: 1.2rem; line-height: 1; color: #4B5563; cursor: pointer; flex-shrink: 0; }
    .shw-pop-list { list-style: none; margin: 4px 0 0; padding: 0; }
    .shw-pop-row { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-top: 1px solid #F3F4F6; }
    .shw-pop-row:first-child { border-top: none; }
    .shw-pop-glyph { color: #9CA3AF; display: inline-flex; flex-shrink: 0; } .shw-pop-row.done .shw-pop-glyph { color: #1B4D3E; }
    .shw-pop-text { display: flex; flex-direction: column; min-width: 0; flex: 1; } .shw-pop-text b { font-size: 0.92rem; font-weight: 600; color: #6B7280; } .shw-pop-row.done .shw-pop-text b { color: #1C1C1C; }
    .shw-pop-text small { font-size: 0.8125rem; color: #9CA3AF; line-height: 1.3; } .shw-pop-row.done .shw-pop-text small { color: #4B5563; }
    .shw-pop-actions { display: flex; gap: 10px; flex-shrink: 0; }
    .shw-pop-link { background: none; border: none; padding: 4px 2px; font-size: 0.84rem; font-weight: 700; color: #1B4D3E; cursor: pointer; font-family: inherit; text-decoration: underline; text-underline-offset: 3px; } .shw-pop-link.muted, .shw-link.muted { color: #9CA3AF; }
    .shw-pop-cta { margin-top: 12px; padding: 13px 16px; font-size: 0.98rem; }
    .shw-pop-foot { text-align: center; margin-top: 12px; font-size: 0.86rem; color: #6B7280; } .shw-confirm { display: block; margin-bottom: 6px; }
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
    .shw-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 20px; padding: 22px 32px 30px; box-shadow: 0 8px 28px rgba(0, 0, 0, 0.05); }
    .shw-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; min-height: 28px; }
    .shw-back { background: none; border: none; color: #6B7280; font-size: 0.92rem; font-weight: 600; cursor: pointer; padding: 4px 0; }
    .shw-back:hover { color: #1C1C1C; }
    .shw-count { font-size: 0.82rem; font-weight: 600; color: #6B7280; letter-spacing: 0.02em; }
    .shw-bar { height: 4px; background: #E5E7EB; border-radius: 999px; overflow: hidden; margin-bottom: 26px; }
    .shw-bar-fill { height: 100%; width: 20%; background: #1B4D3E; border-radius: 999px; transition: width 0.3s ease; }
    .shw-step { display: none; animation: shwIn 0.22s ease; }
    .shw-step.active { display: block; }
    @keyframes shwIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    .shw-q { font-family: var(--font-serif); font-size: 1.85rem; font-weight: 700; color: #1C1C1C; line-height: 1.2; margin: 0 0 8px; text-align: center; }
    .shw-hint { font-size: 0.96rem; color: #6B7280; margin: 0 0 20px; text-align: center; }
    .shw-label { display: block; font-size: 0.86rem; font-weight: 600; color: #374151; margin: 16px 0 6px; }
    .shw-opt { font-weight: 500; color: #9CA3AF; }
    .shw-input { width: 100%; padding: 14px 16px; font-size: 1.06rem; border: 1px solid #D1D5DB; border-radius: 12px; background: #FFFFFF; color: #1C1C1C; outline: none; font-family: inherit; transition: border-color 0.15s ease, box-shadow 0.15s ease; }
    .shw-input:focus { border-color: #1B4D3E; box-shadow: 0 0 0 3px rgba(27, 77, 62, 0.15); background: #FFFFFF; }
    .shw-textarea { resize: vertical; line-height: 1.55; font-size: 1rem; }
    .shw-primary { display: block; width: 100%; margin-top: 22px; padding: 15px 18px; font-size: 1.05rem; font-weight: 700; color: #FFFFFF; background: #1B4D3E; border: 1.5px solid #1B4D3E; border-radius: 12px; cursor: pointer; transition: transform 0.12s ease, background 0.15s ease; }
    .shw-primary:hover { background: #005F57; }
    .shw-primary:active { transform: scale(0.98); }
    .shw-secondary { padding: 12px 18px; font-size: 0.98rem; font-weight: 700; color: #1C1C1C; background: #FFFFFF; border: 1px solid #D1D5DB; border-radius: 12px; cursor: pointer; flex-shrink: 0; }
    .shw-alt { text-align: center; margin-top: 14px; font-size: 0.94rem; color: #6B7280; }
    .shw-link { background: none; border: none; padding: 0; color: #1B4D3E; font-weight: 700; font-size: 0.94rem; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
    .shw-tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .shw-tile { padding: 20px 8px; font-size: 1.5rem; font-weight: 700; color: #1C1C1C; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 14px; cursor: pointer; transition: all 0.14s ease; font-variant-numeric: tabular-nums; }
    .shw-tile:hover, .shw-table-card:hover { border-color: #1B4D3E; background: #EBF4F0; transform: translateY(-1px); }
    .shw-tile.active, .shw-table-card.active { border-color: #1B4D3E; background: #EBF4F0; box-shadow: 0 4px 12px rgba(27, 77, 62, 0.14); }
    .shw-other-row, .shw-apart-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; }
    .shw-apart-x { font-weight: 800; color: #9CA3AF; flex-shrink: 0; }
    .shw-table-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    .shw-table-card { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 20px 10px 18px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 16px; cursor: pointer; transition: all 0.14s ease; }
    .shw-table-title { font-size: 1.05rem; font-weight: 700; color: #1C1C1C; }
    .shw-table-sub { font-size: 0.88rem; color: #6B7280; font-weight: 600; }
    .shw-table-calc { margin-top: 4px; font-size: 0.8125rem; font-weight: 700; color: #1B4D3E; background: #EBF4F0; border-radius: 999px; padding: 2px 10px; }
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
    .sh-wizard-stepper { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; max-width: 920px; margin: 0 auto 16px; background: #F8F7F4; border: 1px solid #E5E7EB; border-radius: 14px; padding: 6px; }
    .sh-wizard-step-pill { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 12px; border-radius: 10px; border: 1px solid transparent; background: transparent; color: #4B5563; font-size: 0.88rem; font-weight: 700; cursor: pointer; transition: all 0.16s ease; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sh-wizard-step-pill:hover { background: #FFFFFF; color: #1C1C1C; border-color: #E5E7EB; }
    .sh-wizard-step-pill.active { background: #1B4D3E; color: #FFFFFF; border-color: #1B4D3E; box-shadow: 0 2px 8px rgba(27, 77, 62, 0.16); }
    .sh-wizard-step-pill.completed { background: #FFFFFF; color: #1B4D3E; border-color: #C4DFD5; }
    .sh-wizard-step-num { width: 22px; height: 22px; border-radius: 999px; background: rgba(0, 0, 0, 0.06); color: inherit; font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .sh-wizard-step-pill.active .sh-wizard-step-num { background: #FFFFFF; color: #1B4D3E; }
    .sh-wizard-step-pill.completed .sh-wizard-step-num { background: #EBF4F0; color: #1B4D3E; }
    .studio-sticky-right-col { position: sticky; top: 76px; display: flex; flex-direction: column; gap: 10px; z-index: 15; min-width: 0; width: 100%; max-width: 100%; }
    .studio-hybrid-wizard { display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px; min-width: 0; width: 100%; max-width: 100%; }
    .studio-wizard-step { display: none; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 16px; overflow: hidden; padding: 10px 14px 14px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05); scroll-margin-top: 90px; min-width: 0; width: 100%; max-width: 100%; }
    .studio-wizard-step.active { display: block; }
    .studio-wizard-header { width: 100%; padding: 8px 4px 10px; background: transparent; border: none; display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: default; text-align: left; white-space: nowrap; }
    .studio-wizard-step-title { font-size: 1.05rem; font-weight: 700; color: #1C1C1C; line-height: 1.3; min-width: 0; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .studio-wizard-step-summary { font-size: 0.82rem; font-weight: 700; color: #1B4D3E; background: #EBF4F0; border: 1px solid #C4DFD5; padding: 3px 9px; border-radius: 999px; white-space: nowrap; flex-shrink: 0; max-width: 44%; overflow: hidden; text-overflow: ellipsis; }
    .studio-wizard-body { display: block; padding: 12px 4px 4px; border-top: 1px solid #E5E7EB; }
    .studio-field-label { display: block; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #4B5563; margin-bottom: 6px; }
    .studio-chip-group { display: flex; flex-wrap: wrap; gap: 6px; }
    .studio-tap-chip { font-size: 0.88rem; font-weight: 600; padding: 7px 12px; border-radius: 999px; border: 1px solid #D1D5DB; background: #FFFFFF; color: #1C1C1C; cursor: pointer; transition: all 0.14s ease; max-width: 100%; min-width: 0; box-sizing: border-box; overflow-wrap: break-word; white-space: normal; text-align: center; line-height: 1.3; }
    .studio-tap-chip:hover { border-color: #1B4D3E; background: #EBF4F0; }
    .studio-tap-chip.active { background: #1B4D3E; color: #FFFFFF; border-color: #1B4D3E; font-weight: 700; }
    .studio-baseline-kpi-grid { display: none !important; }
    .studio-bespoke-stage { background: #F8F7F4; border: 1px solid #E5E7EB; border-radius: 20px; padding: 16px; color: #1C1C1C; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06); display: flex; flex-direction: column; gap: 10px; min-width: 0; max-width: 100%; }
    .studio-stage-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; background: #FFFFFF; padding: 5px; border-radius: 12px; border: 1px solid #E5E7EB; }
    .studio-stage-tab-btn { padding: 9px 8px; border-radius: 8px; border: none; background: transparent; color: #4B5563; font-size: 0.88rem; font-weight: 700; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: all 0.15s ease; }
    .studio-stage-tab-btn.active { background: #1B4D3E; color: #FFFFFF; box-shadow: 0 2px 6px rgba(27, 77, 62, 0.18); }
    .studio-foreground-specimen { background: #FFFFFF; color: #1C1C1C; border: 1px solid #E5E7EB; border-radius: 14px; padding: 12px; min-width: 0; max-width: 100%; overflow-x: hidden; }
    /* Zola Editorial Proof Sections: 1) Case Studies, 2) Before & After + Honest Comparison, 3) Written Reviews */
    .bs-zone4-proof { padding: 92px 0 96px; background: #F8F7F4; border-top: 1px solid #E5E7EB; border-bottom: 1px solid #E5E7EB; }
    .bs-case-studies-grid, .studio-proof-cases-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; margin-top: 0; }
    .bs-case-card, .studio-proof-case-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 18px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; gap: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03); }
    .bs-case-featured { border: 1.5px solid #1B4D3E; background: #FFFFFF; box-shadow: 0 10px 28px -8px rgba(27, 77, 62, 0.12); }
    .bs-case-top-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
    .bs-case-badge { font-size: 12px; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase; color: #1B4D3E; background: #EBF4F0; padding: 4px 8px; border-radius: 6px; white-space: nowrap; }
    .bs-case-state-tag { font-size: 13px; font-weight: 700; color: #1B4D3E; white-space: nowrap; }
    .bs-case-title { font-family: var(--font-serif); font-size: 22px; font-weight: 700; color: #1C1C1C; line-height: 1.22; margin: 0 0 8px 0; text-wrap: balance; }
    .bs-case-context { font-size: 16px; font-weight: 400; line-height: 1.54; color: #4B5563; margin: 0; text-wrap: pretty; }
    .bs-case-math-box { background: #F8F7F4; border: 1px solid #E5E7EB; border-radius: 12px; padding: 14px 15px; display: flex; flex-direction: column; gap: 8px; font-variant-numeric: tabular-nums; font-family: var(--font-sans); }
    .bs-case-math-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; font-size: 14.5px; font-weight: 500; color: #374151; line-height: 1.4; }
    .bs-case-math-row span:first-child { white-space: normal; }
    .bs-case-math-row span:last-child { white-space: nowrap; text-align: right; flex-shrink: 0; font-weight: 700; }
    .bs-case-math-total { border-top: 1px dashed #D1D5DB; padding-top: 8px; margin-top: 2px; font-size: 14.5px; font-weight: 700; color: #1C1C1C; }
    .bs-case-takeaway { font-size: 16px; font-weight: 500; line-height: 1.5; color: #4B5563; margin: 0; }
    .bs-zone4a-ba { padding: 92px 0 96px; background: #FFFFFF; border-bottom: 1px solid #E5E7EB; }
    .bs-ba-container { max-width: 1040px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 22px; padding: 36px 36px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04); }
    .bs-ba-split-grid, .bs-ba-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; margin-top: 0; }
    .bs-ba-card { border-radius: 16px; padding: 28px 26px; border: 1px solid var(--border-warm); background: #FFFFFF; }
    .bs-ba-card.before, .bs-ba-before { background: #F8F7F4; border: 1px solid #E5E7EB; }
    .bs-ba-card.after, .bs-ba-after { background: #EBF4F0; border: 1px solid #A7F3D0; }
    .bs-ba-card-top { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; max-width: 100%; min-width: 0; box-sizing: border-box; }
    .bs-ba-pill { display: inline-block; font-size: 13.5px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; padding: 5px 12px; border-radius: 999px; white-space: normal; max-width: 100%; min-width: 0; box-sizing: border-box; overflow-wrap: break-word; }
    .bs-ba-pill-before { background: #E5E7EB; color: #374151; }
    .bs-ba-pill-after { background: #C4DFD5; color: #1B4D3E; }
    .bs-ba-price-tag { font-size: 16px; font-weight: 700; font-variant-numeric: tabular-nums; white-space: normal; max-width: 100%; min-width: 0; box-sizing: border-box; overflow-wrap: break-word; }
    .bs-ba-price-bad { color: #4B5563; }
    .bs-ba-price-good { color: #1B4D3E; }
    .bs-ba-card-h4 { font-family: var(--font-serif); font-size: 21px; font-weight: 700; color: #1C1C1C; margin: 0 0 16px; line-height: 1.25; text-wrap: balance; }
    .bs-ba-list { margin: 0; padding: 0; list-style: none; font-size: 16px; font-weight: 400; line-height: 1.52; color: #374151; display: flex; flex-direction: column; gap: 13px; }
    .bs-ba-list li { display: flex; align-items: flex-start; gap: 10px; }
    .bs-ba-icon { flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 13.5px; font-weight: 700; margin-top: 2px; }
    .bs-ba-icon-bad { background: #6B7280; color: #FFFFFF; }
    .bs-ba-icon-good { background: #1B4D3E; color: #FFFFFF; }
    .bs-honest-table-wrap, .studio-ba-table-wrap { max-width: 1040px; margin: 68px auto 0; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 22px; padding: 32px 28px; overflow-x: visible; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04); }
    .bs-honest-title { font-family: var(--font-serif); font-size: 24px; font-weight: 700; color: #1C1C1C; margin-bottom: 22px; text-align: center; text-wrap: balance; }
    .bs-honest-table, .ba-table { width: 100%; table-layout: fixed; border-collapse: collapse; text-align: left; font-size: 16px; font-variant-numeric: tabular-nums; }
    .bs-honest-table th, .bs-honest-table td, .ba-table th, .ba-table td { padding: 13px 12px; border-bottom: 1px solid #E5E7EB; font-size: 15px; line-height: 1.4; white-space: normal; overflow-wrap: anywhere; vertical-align: middle; }
    .bs-honest-table th, .ba-table th { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #4B5563; background: #F8F7F4; white-space: normal; }
    .bs-honest-table .bs-col-highlight { background: #EBF4F0; color: #1B4D3E; font-weight: 700; }
    .bs-written-testimonials-section { padding: 92px 0 88px; background: #F8F7F4; border-bottom: 1px solid #E5E7EB; }
    .bs-written-proof-grid, .studio-reviews-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; margin-bottom: 76px; }
    .bs-quote-card, .studio-review-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 18px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; gap: 18px; font-size: 16px; line-height: 1.58; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03); }
    .bs-quote-stars { font-size: 14px; font-weight: 700; color: #1B4D3E; letter-spacing: 0.01em; white-space: normal; max-width: 100%; min-width: 0; box-sizing: border-box; overflow-wrap: break-word; }
    .bs-quote-body { font-size: 16px; font-weight: 400; line-height: 1.58; color: #1C1C1C; font-style: italic; margin: 0; text-wrap: pretty; }
    .bs-quote-author { display: flex; align-items: center; gap: 12px; border-top: 1px solid #F3F4F6; padding-top: 14px; }
    .bs-quote-avatar { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 1px solid #E5E7EB; background: #EBF4F0; color: #1B4D3E; font-family: var(--font-sans); font-size: 16px; font-weight: 700; display: inline-flex !important; align-items: center !important; justify-content: center !important; text-align: center !important; line-height: 1 !important; flex-shrink: 0; }
    .bs-quote-author strong { display: block; font-size: 16px; font-weight: 700; color: #1C1C1C; line-height: 1.25; }
    .bs-quote-author div > span { display: block; font-size: 14px; color: #6B7280; line-height: 1.35; }
    .studio-feature-slide { display: none; animation: studioSlideFadeIn 0.25s ease-out; }
    .studio-feature-slide.active { display: block; }
    @keyframes studioSlideFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
    .studio-carousel-tab { padding: 11px 18px; border-radius: 999px; font-size: 0.92rem; font-weight: 600; cursor: pointer; transition: all 0.18s ease; border: 1px solid #D1D5DB; background: #FFFFFF; color: #374151; white-space: nowrap; }
    .studio-carousel-tab.active { border: 1.5px solid #1B4D3E; background: #1B4D3E; color: #FFFFFF; box-shadow: 0 4px 12px rgba(27, 77, 62, 0.18); font-weight: 700; }
    .btn-gold-soft { background: #1B4D3E; color: #FFFFFF; border-color: #1B4D3E; border: 1.5px solid #1B4D3E; box-shadow: 0 4px 12px rgba(27, 77, 62, 0.18); }
    .btn-gold-soft:hover { background: #005F57; transform: translateY(-1px); }
    .studio-showcase-annotation-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-bottom: 20px; }
    .studio-showcase-annotation-card { background: #F8F7F4; border: 1px solid #E5E7EB; border-radius: 14px; padding: 14px 16px; display: flex; gap: 11px; align-items: center; }
    .studio-showcase-num-badge { width: 28px; height: 28px; border-radius: 50%; background: #EBF4F0; color: #1B4D3E; border: 1px solid #C4DFD5; font-size: 0.84rem; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .studio-showcase-device-frame { position: relative; border-radius: 18px; overflow: hidden; border: 1px solid #E5E7EB; background: #F8F7F4; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06); }
    .studio-showcase-img-wrap { position: relative; background: #F8F7F4; line-height: 0; max-height: 640px; overflow: hidden; }
    .studio-showcase-img-wrap img { width: 100%; height: auto; display: block; object-fit: cover; object-position: top center; }
    .studio-showcase-pin { position: absolute; z-index: 4; display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; background: #1B4D3E; color: #FFFFFF; padding: 0; border-radius: 50%; font-size: 0.82rem; font-weight: 800; box-shadow: 0 4px 12px rgba(27, 77, 62, 0.30); border: 2px solid #FFFFFF; pointer-events: none; }
    .studio-showcase-pin-num { width: 22px; height: 22px; border-radius: 50%; background: #1B4D3E; color: #FFFFFF; font-size: 0.82rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .studio-showcase-pin-label { display: none; }
    .pricing-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; margin-top: 36px; }
    .panel { background: #FFFFFF; border: 1px solid var(--border-warm); border-radius: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.03); }
    .badge { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 999px; font-size: 0.84rem; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase; max-width: 100%; min-width: 0; box-sizing: border-box; overflow-wrap: break-word; white-space: normal; line-height: 1.3; }
    .badge-emerald { background: #EBF4F0; color: #1B4D3E; border: 1px solid #C4DFD5; }
    .badge-amber { background: #EBF4F0; color: #1B4D3E; border: 1px solid #C4DFD5; white-space: normal; max-width: 100%; min-width: 0; box-sizing: border-box; overflow-wrap: break-word; }
    .badge-rose { background: #FFF1F2; color: #9F1239; border: 1px solid #FECDD3; }
    .badge-cyan { background: #F3F4F6; color: #374151; border: 1px solid #E5E7EB; }
    .grader-input { width: 100%; padding: 9px 12px; border-radius: 8px; border: 1px solid #D1D5DB; background: #FFFFFF; color: #1C1C1C; font-size: 0.90rem; font-weight: 600; outline: none; max-width: 100%; }
    .grader-input:focus { border-color: #1B4D3E; }
    .studio-faq-stack { display: flex; flex-direction: column; gap: 18px; max-width: 880px; margin: 38px auto 0; }
    .studio-faq-item { background: #FFFFFF; border: 1px solid var(--border-warm); border-radius: 16px; padding: 22px 26px; }
    .studio-faq-item summary { cursor: pointer; font-weight: 700; font-size: 1.12rem; color: #1C1C1C; display: flex; align-items: center; justify-content: space-between; gap: 12px; list-style: none; }
    .studio-faq-item summary::-webkit-details-marker { display: none; }
    .mobile-subnav { display: none; flex-wrap: wrap; justify-content: center; gap: 6px 14px; padding: 8px 14px; background: #F8F7F4; border-bottom: 1px solid var(--border-warm); font-size: 0.82rem; font-weight: 600; }
    .mobile-subnav a { color: var(--text-secondary); text-decoration: none; }
    .footer { background: #F8F7F4; border-top: 1px solid var(--border-warm); padding: 28px 0 20px; font-size: 0.88rem; color: var(--text-secondary); }
    @media (max-width: 1120px) { .hide-1024 { display: none !important; } }
    @media (max-width: 1080px) {
      .studio-scroll-builder-grid { grid-template-columns: minmax(0, 1fr); }
      .studio-sticky-right-col { position: static; }
    }
    @media (max-width: 960px) {
      .container { padding: 0 22px; }
      .btn { white-space: normal; text-align: center; max-width: 100%; line-height: 1.3; }
      .navbar .btn-primary { padding: 7px 11px !important; font-size: 0.82rem !important; white-space: nowrap !important; }
      .sh-zola-hero-split, .sh-vsl-scene-grid, .studio-how-grid, .studio-scroll-builder-grid, .bs-case-studies-grid, .studio-proof-cases-grid, .bs-ba-split-grid, .bs-ba-grid, .bs-written-proof-grid, .studio-reviews-grid, .pricing-grid, .sh-crease-proof-bar, .studio-showcase-annotation-grid { grid-template-columns: minmax(0, 1fr); }
      .sh-zola-hero-split { gap: 24px; }
      .sh-zola-showcase-photo { height: 230px; }
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
      .studio-zone-section, #studio, #studio-zone2-how-it-works, #beo-proof, #bs-before-after-section, #bs-written-testimonials-section, #pricing, #faq { padding: 48px 0; scroll-margin-top: 64px; }
      #studio { padding: 14px 0 36px; }
      .studio-zone1-hero { padding: 16px 0 20px; }
      .bs-ba-container, .bs-honest-table-wrap, .studio-ba-table-wrap { padding: 20px 14px; }
      .bs-honest-table th, .bs-honest-table td, .ba-table th, .ba-table td { padding: 8px 5px; font-size: 13.5px; line-height: 1.35; word-break: break-word; white-space: normal; }
      #studio-bespoke-artifact-stage { padding: 10px; }
      .studio-stage-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px; padding: 4px; }
      .studio-stage-tab-btn { padding: 7px 6px; font-size: 0.78rem; white-space: normal !important; overflow: visible !important; text-overflow: clip !important; height: auto !important; }
      .sh-wizard-stepper { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .studio-wizard-header { flex-wrap: wrap; gap: 6px; padding: 10px 12px; }
      .studio-wizard-step-title { flex-wrap: wrap; font-size: 0.88rem; }
      .studio-wizard-step-summary { white-space: normal; font-size: 0.84rem; }
      .studio-baseline-kpi-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
      .studio-kpi-card { padding: 9px 8px; }
      .studio-kpi-val { font-size: 1.12rem; }
      .mobile-jump-canvas-btn { display: inline-flex; align-items: center; gap: 4px; }
    }
    @media (max-width: 768px) {
      #sh-vault-checkout-bar, #sh-inline-email-bridge, #sh-inline-vault-save-btn, #sh-vault-buy-pack-btn, #sh-planner-pro-dock-banner, #sh-vault-buy-pro-btn, .sh-locked-spec-badge, .sh-zola-showcase-footer button, .studio-tap-chip, .bs-quote-stars, .badge, .badge-amber, .bs-ba-card-top, .bs-ba-pill, .bs-ba-price-tag, .bs-case-badge, .bs-case-state-tag, .studio-carousel-tab { white-space: normal !important; max-width: 100% !important; min-width: 0 !important; box-sizing: border-box !important; overflow-wrap: break-word !important; }
      #sh-inline-email-bridge, #sh-seo-calc-email-wrap, #sh-planner-pro-dock-banner, .sh-zola-showcase-footer, .bs-ba-card-top { flex-direction: column !important; align-items: stretch !important; width: 100% !important; max-width: 100% !important; flex: 0 0 auto !important; gap: 5px !important; }
      #sh-inline-vault-email, #sh-step4-inline-email, #sh-seo-calc-email { flex: 0 0 auto !important; width: 100% !important; height: 42px !important; min-height: 42px !important; max-height: 42px !important; font-size: 16px !important; text-align: left !important; }
      #sh-inline-vault-save-btn, #sh-step4-inline-save-btn, #sh-seo-calc-save-btn, #sh-vault-buy-pack-btn, #sh-vault-buy-pro-btn, .sh-zola-showcase-footer button { flex: 0 0 auto !important; width: 100% !important; min-height: 38px !important; height: auto !important; padding: 8px 10px !important; font-size: 14px !important; text-align: center !important; justify-content: center !important; }
      .sh-locked-spec-badge { width: 100% !important; height: auto !important; text-align: left !important; border-radius: 10px !important; padding: 6px 10px !important; }
      .sh-hide-mobile-toolbar, #grader .sh-lead-sub, #sh-table1-preview-badge { display: none !important; }
      #sh-proof-couple-name, #sh-proof-table1-summary, #sh-conflict-solver-badge, #sh-rival-anchor-badge { display: block !important; width: 100% !important; white-space: normal !important; font-size: 13px !important; line-height: 1.3 !important; }
      #sh-vault-bar-headline { font-size: 13px !important; line-height: 1.25 !important; }
      #sh-canvas-micro-toolbar { gap: 4px !important; margin-bottom: 4px !important; flex-wrap: wrap !important; padding-bottom: 2px !important; }
      #sh-canvas-micro-toolbar .sh-ed-ghost { padding: 4px 8px !important; font-size: 13px !important; }
      #sh-ed-legend { display: none !important; }
      .sh-ed-grid > .sh-ed-canvas { height: 380px !important; min-height: 380px !important; max-height: 380px !important; }
      #sh-floorplan-svg { height: 378px !important; min-height: 378px !important; max-height: 380px !important; }
      #sh-vault-checkout-bar { padding: 14px 14px !important; gap: 6px !important; }
    }
    @media (max-width: 520px) { .sh-display-h1 { font-size: 1.56rem; } }
    @media (max-width: 1200px) { #nav-binder-btn { display: none !important; } }
    @media (max-width: 1400px) { .nav-links .nav-link:nth-child(5) { display: none; } }
    @media (max-width: 1500px) { #nav-vault-label { font-size: 0; } #nav-vault-label::after { content: 'Save'; font-size: 0.82rem; } .nav-links { gap: 9px; } }
    @media (max-width: 820px) {
      .nav-links { display: none; }
      .mobile-subnav { display: none !important; }
      .nav-inner { height: 54px !important; }
      .hide-mobile-text { display: none; }
    }
  </style>
  ${jsonLd ? `<script type="application/ld+json">${typeof jsonLd === 'string' ? JSON.stringify(JSON.parse(jsonLd)).replace(/</g, '\\u003c') : JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}
</head>`;
}

function renderNavbar() {
  return `<header class="navbar" role="banner"><div class="container nav-inner"><a href="/" id="nav-brand-logo-link" class="nav-brand" aria-label="SeatHarmony Home">${renderBrandLogoSvg(26)}<span>SeatHarmony</span></a><nav class="nav-links" aria-label="Primary Navigation"><a href="/#studio" class="nav-link" style="color:var(--accent-primary);font-weight:700;">Floorplan Studio</a><a href="/#studio-zone2-how-it-works" class="nav-link">How It Works</a><a href="/directory" class="nav-link hide-1024">Venue Layouts</a><a href="/#pricing" class="nav-link">Pricing</a></nav><div style="display:flex;align-items:center;gap:8px;flex-shrink:0;"><button type="button" id="nav-vault-btn" onclick="if(window.shOpenVaultModal){window.shOpenVaultModal();}" class="btn btn-secondary hide-1024" style="padding:7px 14px;font-size:0.82rem;" title="Save or Resume Your Reception Plan"><span id="nav-vault-label">Saved Plans</span></button><a href="/buy/complete_dossier?target=estate-150&amp;allow_promotion_codes=false" id="nav-primary-buy-cta" class="btn btn-primary" style="padding:7px 14px;font-size:0.84rem;"><span>Get <span class="hide-mobile-text">Event Print </span>Pack ($7)</span></a></div></div></header>`;
}

function renderFooter() {
  return `<footer class="footer" role="contentinfo"><div class="container"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:24px;padding-bottom:24px;border-bottom:1px solid var(--border-warm);"><div style="max-width:420px;"><div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:1.05rem;color:var(--text-primary);margin-bottom:8px;">${renderBrandLogoSvg(26)}<span>SeatHarmony Studio</span></div><p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.5;">Reception seating studio for couples and planners. Seat households together, export a Clockwise 12:00 Caterer Meal Sheet, and print 24&Prime;&times;36&Prime; welcome signs in minutes.</p></div><div style="display:flex;gap:36px;flex-wrap:wrap;"><div><div style="font-weight:800;color:var(--text-primary);margin-bottom:8px;font-size:0.82rem;text-transform:uppercase;letter-spacing:0.06em;">Reception Deliverables</div><div style="display:flex;flex-direction:column;gap:6px;"><a href="/#studio" style="color:var(--text-secondary);text-decoration:none;">Interactive Reception Floorplan</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}" style="color:var(--text-secondary);text-decoration:none;">Clockwise Caterer Meal Sheet</a><a href="/#studio" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}" style="color:var(--text-secondary);text-decoration:none;">24&Prime;&times;36&Prime; Easel Sign &amp; Avery 5302 Cards</a><a href="/directory" style="color:var(--text-secondary);text-decoration:none;">60+ Venue Floorplan Templates</a></div></div><div><div style="font-weight:800;color:var(--text-primary);margin-bottom:8px;font-size:0.82rem;text-transform:uppercase;letter-spacing:0.06em;">Legal &amp; Specs</div><div style="display:flex;flex-direction:column;gap:6px;"><a href="/privacy" style="color:var(--text-secondary);text-decoration:none;">Privacy Policy</a><a href="/terms" style="color:var(--text-secondary);text-decoration:none;">Terms of Service</a><a href="/#faq" style="color:var(--text-secondary);text-decoration:none;">Print &amp; Refund FAQ</a><a href="/sitemap.xml" style="color:var(--text-secondary);text-decoration:none;">XML Sitemap</a></div></div></div></div><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;padding-top:18px;font-size:0.82rem;color:var(--text-muted);"><span>Copyright ${new Date().getFullYear()} SeatHarmony Studio. FedEx &amp; Staples Print-Ready PDFs, Place Cards &amp; Caterer Meal Sheets.</span><span>Couples Kept Together &bull; Clockwise Seat #1 Catering &bull; Avery 5302 Verified</span></div></div></footer>`;
}

function getVenueVisual(slug = '', title = '', category = '') {
  const s = `${slug} ${title} ${category}`.toLowerCase();
  if (/seatharmony-vs-canva/i.test(s)) {
    return {
      img: '/public/showcase-canva-vs-auto-sign.jpg',
      tag: 'Canva vs. Auto-Generated Sign',
      name: 'Manual Text Box Formatting vs. 1-Click Arch D 24″×36″ Print Generation'
    };
  }
  if (/seatharmony-vs-zola/i.test(s)) {
    return {
      img: '/public/showcase-zola-vs-visual-studio.jpg',
      tag: 'Zola vs. SeatHarmony',
      name: 'Registry Text Checklist vs. Real-Time Table Conflict Auto-Solver'
    };
  }
  if (/seatharmony-vs-weddingwire|the-knot/i.test(s)) {
    return {
      img: '/public/showcase-theknot-vs-visual-studio.jpg',
      tag: 'The Knot vs. SeatHarmony',
      name: 'Ad-Cluttered Portal vs. Clean Seating Studio & Caterer BEO Export'
    };
  }
  if (/seatharmony-vs-google-sheets/i.test(s)) {
    return {
      img: '/public/showcase-sheets-vs-visual-studio.jpg',
      tag: 'Spreadsheet vs. Visual Floorplan',
      name: 'Gridlock Spreadsheet vs. Drag-and-Drop Visual Seating Studio'
    };
  }
  if (/18x24-vs-24x36/i.test(s)) {
    return {
      img: '/public/showcase-18x24-vs-24x36.jpg',
      tag: '18″×24″ vs. 24″×36″ Sizing',
      name: 'Side-by-Side 18″×24″ vs. 24″×36″ Reception Sign Sizing & Legibility Comparison'
    };
  }
  if (/clockwise-12-oclock-seat-numbering-vs-random|clockwise.*vs.*random/i.test(s)) {
    return {
      img: '/public/showcase-clockwise-server-sync.jpg',
      tag: 'Synchronized Banquet Service',
      name: 'Clockwise 12:00 Ballroom Server Synchronization & Cloche Service'
    };
  }
  if (/print-bleed-crop-marks|fedex-staples.*bleed/i.test(s)) {
    return {
      img: '/public/showcase-canva-print-bleed-guide.jpg',
      tag: '0.125″ Bleed & Crop Marks',
      name: 'Professional 0.125″ Print Bleed & Crop Boundary Inspection Desk'
    };
  }
  if (/cocktail-hour-qr-code-find-my-seat|qr-code.*setup-guide/i.test(s)) {
    return {
      img: '/public/showcase-cocktail-qr-stand.jpg',
      tag: 'Cocktail Hour Bar QR Sign',
      name: 'Brushed Brass Framed QR Seat Finder at Conservatory Cocktail Bar'
    };
  }
  if (/clockwise-caterer-beo-table-numbering/i.test(s)) {
    return {
      img: '/public/showcase-caterer-beo-clipboard.jpg',
      tag: 'Caterer BEO Plating Pass',
      name: 'Banquet Kitchen Plating Pass & Clockwise Table Meal Manifest'
    };
  }
  if (/foam-board.*acrylic|acrylic-welcome-sign/i.test(s)) {
    return {
      img: '/public/showcase-foamboard-vs-acrylic.jpg',
      tag: 'Foam Board vs. Acrylic Glare',
      name: 'Matte Archival Foam Board vs. Glossy Acrylic Sunlight Legibility'
    };
  }
  if (/alphabetical-vs-by-table/i.test(s)) {
    return {
      img: '/public/showcase-alphabetical-guest-flow.jpg',
      tag: 'A-Z Cocktail Hour Flow',
      name: 'Fast 1.4-Second Alphabetical Guest Check-In & Line Bypass'
    };
  }
  if (/how-to-import-messy/i.test(s)) {
    return {
      img: '/public/showcase-csv-cleaning-workspace.jpg',
      tag: '10-Second CSV Auto-Mapper',
      name: 'Messy Guest List Auto-Cleaner & Column Mapping Workspace'
    };
  }
  if (/mini-floorplan-map/i.test(s)) {
    return {
      img: '/public/showcase-mini-map-welcome-sign.jpg',
      tag: '24″×36″ Map + Alphabetical Sign',
      name: 'Easel-Mounted 24″×36″ Archival Sign With Integrated Table Map'
    };
  }
  if (/how-to-handle-last-minute/i.test(s)) {
    return {
      img: '/public/venue-last-minute-rsvp-triage.jpg',
      tag: '48-Hour RSVP Command Desk',
      name: '48-Hour Wedding Planner Command Desk & Seating Rebalancer'
    };
  }
  if (/peanut.*celiac|allergy-wedding-catering/i.test(s)) {
    return {
      img: '/public/venue-allergy-safety-catering-pass.jpg',
      tag: 'Catering Plating & Allergy Pass',
      name: 'Banquet Catering Pass & Severe Allergy Protocol Station'
    };
  }
  if (/collaborate-with-mothers/i.test(s)) {
    return {
      img: '/public/venue-two-moms-collaboration.jpg',
      tag: 'Two-Mom Tasting Room',
      name: 'Napa Valley Tasting Room Mother Collaboration & Seating Harmonizer'
    };
  }
  if (/rehearsal-dinner-to-reception|dont-repeat-tablemates/i.test(s)) {
    return {
      img: '/public/venue-rehearsal-barrel-vault.jpg',
      tag: 'Candlelit Barrel Vault',
      name: 'Historic Limestone Wine Barrel Vault Rehearsal Banquet'
    };
  }
  if (/60-inch-round-table-8-vs-9-vs-10/i.test(s)) {
    return {
      img: '/public/venue-60-inch-9-charger-spacing.jpg',
      tag: '9-Charger 60″ Round Spacing',
      name: 'Curated 60-Inch Round Table 9-Charger Sightline Setting'
    };
  }
  if (/b2b-field-marketing/i.test(s)) {
    return {
      img: '/public/venue-welcome-dinner-terrace.jpg',
      tag: 'Sunset Welcome Dinner Terrace',
      name: 'Vineyard Stone Terrace Sunset Welcome Dinner Banquet'
    };
  }
  if (/charity-gala-corporate-table-captain|playbook/i.test(s)) {
    return {
      img: '/public/venue-gala-table-captain.jpg',
      tag: 'Table Captain Host Station',
      name: 'Grand Ballroom Table Captain Host Station & Program Setting'
    };
  }
  if (/server-aisle-clearance|table-spacing/i.test(s)) {
    return {
      img: '/public/venue-server-aisle-clearance.jpg',
      tag: '60″ Server Aisle Clearance',
      name: 'Grand Ballroom 60-Inch Server Corridor & Service Clearance'
    };
  }
  if (/vendor-meal-table/i.test(s)) {
    return {
      img: '/public/venue-vendor-meal-table.jpg',
      tag: 'Vendor Dining Alcove',
      name: 'Quiet Private Dining Alcove & Vendor Hospitality Table'
    };
  }
  if (/mom-sandbox-link/i.test(s)) {
    return {
      img: '/public/venue-family-collaboration-veranda.jpg',
      tag: 'Vineyard Veranda Family Table',
      name: 'Vineyard Stone Veranda Mother & Daughter Seating Review'
    };
  }
  if (/bridal-party-plus-ones|bridal-party.*dates/i.test(s)) {
    return {
      img: '/public/venue-bridal-party-dates.jpg',
      tag: 'Bridal Party & Dates King’s Table',
      name: 'Vaulted Cloister Hall Royal Bridal Party & Dates Feasting Table'
    };
  }
  if (/how-to-seat-divorced-parents/i.test(s)) {
    return {
      img: '/public/venue-separated-family-wings.jpg',
      tag: 'Separated Family Wing Orangery',
      name: 'Sunlit European Orangery Symmetrical Family Wing Seating'
    };
  }
  if (/wheelchair|highchair-wedding-table/i.test(s)) {
    return {
      img: '/public/venue-accessible-table.jpg',
      tag: 'Accessible Family-Inclusive Setting',
      name: 'Inclusive Estate Reception Setting & Accessible Highchair Clearance'
    };
  }
  if (/sweetheart-table-vs-kings|sweetheart.*vs.*king/i.test(s)) {
    return {
      img: '/public/venue-sweetheart-vs-kings.jpg',
      tag: 'Sweetheart vs King’s Layout',
      name: 'Cathedral Arch Reception Hall & Sweetheart / King’s Duality'
    };
  }
  if (/40x100/i.test(s)) {
    return {
      img: '/public/venue-40x100-grand-tent.jpg',
      tag: '40x100 Grand Sailcloth Tent',
      name: 'Expansive 40x100 High-Peak Sailcloth Marquee & Meadow Glow'
    };
  }
  if (/40x80/i.test(s)) {
    return {
      img: '/public/venue-pole-tent-meadow.jpg',
      tag: 'Twin-Pole Sailcloth Tent',
      name: 'Grand Twin-Pole Sailcloth Tent on Meadow Lawn'
    };
  }
  if (/20x40/i.test(s)) {
    return {
      img: '/public/venue-20x40-micro-backyard-tent.jpg',
      tag: '20x40 Micro-Backyard Tent',
      name: 'Private Suburban Garden Clear-Span Frame Tent & Hydrangeas'
    };
  }
  if (/150-guest-wedding-seating-chart-round-tables|150[- ]?guest.*round.*table/i.test(s)) {
    return {
      img: '/public/venue-150-guest-grand-estate.jpg',
      tag: '150-Guest Grand Estate',
      name: 'Light-Filled Grand Estate Ballroom & Parquet Dance Floor'
    };
  }
  if (/beach-club|yacht|harbor|marina/i.test(s)) {
    return {
      img: '/public/venue-coastal-beach-club.jpg',
      tag: 'Coastal Yacht & Beach Club',
      name: 'The Oceanfront Yacht & Beach Club Terrace'
    };
  }
  if (/winery|vineyard|napa|sonoma/i.test(s)) {
    return {
      img: '/public/venue-napa-vineyard.jpg',
      tag: 'Vineyard Estate',
      name: 'Napa Valley Vineyard Estate & Olive Courtyard'
    };
  }
  if (/barn|timber frame|rustic barn/i.test(s)) {
    return {
      img: '/public/venue-modern-barn.jpg',
      tag: 'Modern Timber Barn',
      name: 'Upscale Modern Barn & Farm Hall'
    };
  }
  if (/villa|amalfi|cliffside|mediterranean|destination/i.test(s)) {
    return {
      img: '/public/venue-destination-villa.jpg',
      tag: 'Mediterranean Seaside Villa',
      name: 'Mediterranean Cliffside Villa & Poolside Terrace'
    };
  }
  if (/rooftop|penthouse|skyline/i.test(s)) {
    return {
      img: '/public/venue-rooftop-penthouse.jpg',
      tag: 'Urban Rooftop Penthouse',
      name: 'Chic Urban Rooftop Penthouse Terrace'
    };
  }
  if (/loft|warehouse|industrial|brick/i.test(s)) {
    return {
      img: '/public/venue-industrial-loft.jpg',
      tag: 'Industrial Loft',
      name: 'Historic Brick & Timber Industrial Loft'
    };
  }
  if (/conservatory|greenhouse|botanical|orangery/i.test(s)) {
    return {
      img: '/public/venue-botanical-conservatory.jpg',
      tag: 'Botanical Greenhouse',
      name: 'Glass Greenhouse & Botanical Orangery'
    };
  }
  if (/museum|rotunda|art museum|gallery/i.test(s)) {
    return {
      img: '/public/venue-museum-rotunda.jpg',
      tag: 'Classical Museum Rotunda',
      name: 'Neoclassical Art Museum Marble Rotunda'
    };
  }
  if (/country[- ]?club|golf/i.test(s)) {
    return {
      img: '/public/venue-country-club.jpg',
      tag: 'Private Country Club',
      name: 'Private Country Club Ballroom & Rolling Green Terrace'
    };
  }
  if (/serpentine|s-curve/i.test(s)) {
    return {
      img: '/public/venue-serpentine-estate.jpg',
      tag: 'Serpentine Garden Banquet',
      name: 'Winding Serpentine Banquet Table in Italianate Garden'
    };
  }
  if (/80[- ]?guest/i.test(s)) {
    return {
      img: '/public/venue-intimate-courtyard-banquet.jpg',
      tag: 'Tuscan Courtyard Feast Tables',
      name: 'Secluded Stone Villa Courtyard & Parallel Feasting Tables'
    };
  }
  if (/micro[- ]?wedding|king['’]?s[- ]?table|continuous king/i.test(s)) {
    return {
      img: '/public/venue-micro-wedding-kings.jpg',
      tag: 'Intimate King’s Feast Table',
      name: 'Long Continuous King’s Feast Table & Candelabras'
    };
  }
  if (/40[- ]?guest|b2b[- ]?vip|executive[- ]?dinner|intimate private dining/i.test(s)) {
    return {
      img: '/public/venue-intimate-private-dining.jpg',
      tag: 'Private Dining Salon',
      name: 'Historic Townhouse Private Dining Salon & Fireplace Mantle'
    };
  }
  if (/restaurant[- ]?buyout|bistro/i.test(s)) {
    return {
      img: '/public/venue-restaurant-buyout.jpg',
      tag: 'Boutique Restaurant Buyout',
      name: 'Boutique Urban Restaurant Buyout & Velvet Banquettes'
    };
  }
  if (/frame[- ]?tent|backyard|20x40-tent|30x60-tent/i.test(s)) {
    return {
      img: '/public/venue-backyard-frame-tent.jpg',
      tag: 'Private Estate Frame Tent',
      name: 'Private Estate Backyard Frame Tent & Sheer Drapes'
    };
  }
  if (/l[- ]?shaped|t[- ]?shaped/i.test(s)) {
    return {
      img: '/public/venue-l-and-t-shaped.jpg',
      tag: 'L & T-Shaped Feast',
      name: 'Modern Architectural L-Shaped & T-Shaped Feast Tables'
    };
  }
  if (/cellar|vault/i.test(s)) {
    return {
      img: '/public/venue-historic-wine-cellar.jpg',
      tag: 'Historic Wine Cellar',
      name: 'Atmospheric Arched Brick & Limestone Wine Vault'
    };
  }
  if (/40x80|40x100|twin[- ]?pole|pole[- ]?tent/i.test(s)) {
    return {
      img: '/public/venue-pole-tent-meadow.jpg',
      tag: 'Twin-Pole Sailcloth Tent',
      name: 'Grand Twin-Pole Sailcloth Tent on Meadow Lawn'
    };
  }
  if (/40x60-tent|garden[- ]?marquee|clear[- ]?top/i.test(s)) {
    return {
      img: '/public/venue-garden-marquee.jpg',
      tag: 'Walled Garden Marquee',
      name: 'Clear-Top Garden Marquee & Hanging Greenery Chandeliers'
    };
  }
  if (/tent|sailcloth|marquee|outdoor|lawn|rain|canopy/i.test(s)) {
    return {
      img: '/public/venue-sailcloth-tent.jpg',
      tag: 'Sailcloth Tent & Lawn',
      name: 'High-Peak Sailcloth Tent & Meadow Lawn'
    };
  }
  if (/cultural[- ]?fusion|multi[- ]?generational|mandap|chuppah/i.test(s)) {
    return {
      img: '/public/venue-cultural-fusion.jpg',
      tag: 'Cultural Fusion Ballroom',
      name: 'Grand Cultural Fusion Ballroom & Jewel-Tone Floral Arch'
    };
  }
  if (/black[- ]?tie/i.test(s)) {
    return {
      img: '/public/venue-black-tie-ballroom.jpg',
      tag: 'Black-Tie Gala Ballroom',
      name: 'Black-Tie Gala Ballroom & Silver Candelabras'
    };
  }
  if (/hybrid|mixed[- ]?round|mixed banquet/i.test(s)) {
    return {
      img: '/public/venue-hybrid-banquet.jpg',
      tag: 'Mixed Round & Banquet Layout',
      name: 'Architectural Mixed Rounds & Wooden Harvest Tables'
    };
  }
  if (/charity[- ]?gala|table[- ]?captain/i.test(s)) {
    return {
      img: '/public/venue-charity-gala.jpg',
      tag: 'Grand Civic Gala',
      name: 'Grand Civic Gala Hall & Symmetrical Table Captain Layout'
    };
  }
  if (/40[- ]?guest|b2b[- ]?vip|executive[- ]?dinner|private dining room/i.test(s)) {
    return {
      img: '/public/venue-intimate-private-dining.jpg',
      tag: 'Private Dining Salon',
      name: 'Historic Townhouse Private Dining Salon & Fireplace Mantle'
    };
  }
  if (/sweetheart[- ]?table|sweetheart[- ]?anchor/i.test(s)) {
    return {
      img: '/public/venue-sweetheart-anchor.jpg',
      tag: 'Sweetheart Table Anchor',
      name: 'Elevated Sweetheart Table & Curved Floral Arch Backdrop'
    };
  }
  if (/ballroom|hotel|gala|grand|formal|chandelier/i.test(s)) {
    return {
      img: '/public/venue-grand-ballroom.jpg',
      tag: 'Grand Ballroom',
      name: 'Grand Ballroom & Crystal Chandelier Banquet Hall'
    };
  }
  if (/80[- ]?guest.*courtyard|80[- ]?guest.*banquet|courtyard[- ]?banquet/i.test(s)) {
    return {
      img: '/public/venue-intimate-courtyard-banquet.jpg',
      tag: 'Tuscan Courtyard Feast Tables',
      name: 'Secluded Stone Villa Courtyard & Parallel Feasting Tables'
    };
  }
  if (/tuscan|courtyard|patio|al fresco|terrace|italian|olive/i.test(s)) {
    return {
      img: '/public/venue-tuscan-courtyard.jpg',
      tag: 'Tuscan Courtyard',
      name: 'Villa Cipressi Olive Grove Courtyard'
    };
  }
  if (/conservatory|greenhouse|botanical|orangery|garden|glass/i.test(s)) {
    return {
      img: '/public/venue-botanical-conservatory.jpg',
      tag: 'Botanical Greenhouse',
      name: 'Glass Greenhouse & Botanical Orangery'
    };
  }
  if (/cellar|intimate|micro|rehearsal|candlelit|vault|private dining/i.test(s)) {
    return {
      img: '/public/venue-historic-wine-cellar.jpg',
      tag: 'Candlelit Wine Cellar',
      name: 'Historic Brick Wine Cellar & Vault'
    };
  }
  if (/120[- ]?guest|classic[- ]?reception/i.test(s)) {
    return {
      img: '/public/venue-classic-reception-hall.jpg',
      tag: 'Classic Estate Hall',
      name: 'Light-Filled Estate Reception Hall & Coffered Ceilings'
    };
  }
  if (/60[- ]?inch[- ]?round|charger[- ]?plate/i.test(s)) {
    return {
      img: '/public/venue-charger-plate-rounds.jpg',
      tag: '60-Inch Round Charger Spacing',
      name: 'Impeccable 60-Inch Round Charger Plate & Centerpiece Setting'
    };
  }
  return {
    img: '/public/venue-rosewood-estate.jpg',
    tag: 'Private Country Estate',
    name: 'The Conservatory at Rosewood Estate'
  };
}

module.exports = {
  escapeHtml,
  renderBrandLogoSvg,
  renderHead,
  renderNavbar,
  renderFooter,
  renderInteractiveScript,
  getVenueVisual
};

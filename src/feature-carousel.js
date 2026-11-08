const { escapeHtml } = require('./templates');

const SHOWCASE_SLIDES = [
  {
    idx: 0,
    tabLabel: '1. 24"×36" Welcome Sign Studio',
    badge: 'DELIVERABLE 1 OF 5 · PRINT-READY ARCH D PDF',
    title: '24"×36" Reception Welcome Sign Studio',
    annotations: [
      { num: '1', title: '6 Wedding Color Themes' },
      { num: '2', title: '1-Click A–Z or By-Table Sort' },
      { num: '3', title: 'Monogram & Scannable QR Crest' }
    ],
    urlText: 'seatharmony.io/print/poster/SH-4819?theme=alabaster',
    routeHref: (vId) => `/print/poster/${encodeURIComponent(vId)}?theme=alabaster`,
    ctaText: 'Open Live 24"×36" Studio →',
    imgSrc: '/public/showcase-poster-24x36.png?v=light3',
    imgAlt: 'SeatHarmony 24x36 Reception Welcome Sign Studio in Parisian Gold & Alabaster theme',
    pins: [
      { num: '1', text: '1-Click A-Z / By-Table & Theme Switcher', style: 'top: 6%; left: 4%;' },
      { num: '2', text: 'Embedded Cocktail-Hour Seat Map QR', style: 'top: 22%; right: 6%;' },
      { num: '3', text: 'Multi-Column Reception Guest List', style: 'bottom: 6%; right: 6%;' }
    ]
  },
  {
    idx: 1,
    tabLabel: '2. Clockwise 12:00 Caterer Meal Sheet',
    badge: 'DELIVERABLE 2 OF 5 · KITCHEN & SERVER SHEET',
    title: 'Clockwise 12:00 Caterer Meal Sheet',
    annotations: [
      { num: '1', title: 'Seat #1 = 12:00 (Dance Floor)' },
      { num: '2', title: 'Entrée Prep Totals per Table' },
      { num: '3', title: 'Kitchen Allergy & ADA Alerts' }
    ],
    urlText: 'seatharmony.io/print/beo/SH-4819',
    routeHref: (vId) => `/print/beo/${encodeURIComponent(vId)}`,
    ctaText: 'Open Live Caterer Meal Sheet →',
    imgSrc: '/public/showcase-signed-beo.png?v=light3',
    imgAlt: 'SeatHarmony Clockwise 12:00 Caterer Meal Sheet Manifest',
    pins: [
      { num: '1', text: 'Seat #1 = 12:00 (Facing Dance Floor) Anchor', style: 'top: 39%; right: 5%;' },
      { num: '2', text: 'Clockwise Seat-by-Seat Entrée Breakdown', style: 'top: 62%; right: 5%;' },
      { num: '3', text: 'Red Kitchen Allergy & Wheelchair Setup Row', style: 'bottom: 9%; right: 5%;' }
    ]
  },
  {
    idx: 2,
    tabLabel: '3. Avery 5302 Place Cards',
    badge: 'DELIVERABLE 3 OF 5 · FOLDED TENT CARDS',
    title: 'Avery 5302 Meal-Coded Tent Place Cards',
    annotations: [
      { num: '1', title: 'Server Meal Notes on Back' },
      { num: '2', title: 'Meal Icons (◆ Beef · ● Fish · ▲ Vegan)' },
      { num: '3', title: 'Exact Table & Chair #' }
    ],
    urlText: 'seatharmony.io/print/avery-5302/SH-4819',
    routeHref: (vId) => `/print/avery-5302/${encodeURIComponent(vId)}`,
    ctaText: 'Open Live Place Cards Sheet →',
    imgSrc: '/public/showcase-avery-5302.png?v=light3',
    imgAlt: 'SeatHarmony Folded Tent Place Cards Print Sheet with server allergy back fold',
    pins: [
      { num: '1', text: 'Server Notes on Back of Card (Allergy & Seat #)', style: 'top: 25%; right: 5%;' },
      { num: '2', text: 'Guest-Facing Monogram & Meal Symbol', style: 'top: 47%; right: 5%;' },
      { num: '3', text: 'Red Kitchen Alert Printed on Back of Card', style: 'bottom: 12%; right: 5%;' }
    ]
  },
  {
    idx: 3,
    tabLabel: '4. Cocktail-Hour Guest QR App',
    badge: 'DELIVERABLE 4 OF 5 · MOBILE SEAT LOOKUP',
    title: 'Cocktail-Hour Mobile Guest QR Seat Finder',
    annotations: [
      { num: '1', title: '2-Second Guest Search at Bar' },
      { num: '2', title: 'Exact Table & Clockwise Chair #' },
      { num: '3', title: 'Live Cloud Sync for Seat Swaps' }
    ],
    urlText: 'seatharmony.io/qr/SH-4819',
    routeHref: (vId) => `/qr/${encodeURIComponent(vId)}`,
    ctaText: 'Test Live Mobile QR App →',
    imgSrc: '/public/showcase-mobile-qr.png?v=light3',
    imgAlt: 'SeatHarmony Cocktail-Hour Mobile Guest QR Seat Lookup Web App',
    pins: [
      { num: '1', text: '1-Second Guest Name & Table Search', style: 'top: 41%; left: 3%;' },
      { num: '2', text: 'Exact Table # & Clockwise Chair Badge', style: 'bottom: 18%; left: 3%;' },
      { num: '3', text: 'Scannable Bar & Welcome Sign QR Sync', style: 'top: 38%; right: 5%;' }
    ]
  },
  {
    idx: 4,
    tabLabel: '5. Family Share Link & Saved Plan',
    badge: 'DELIVERABLE 5 OF 5 · SAVE & SHARE WITH FAMILY',
    title: 'Saved Wedding Plan & Family Table Share Link',
    annotations: [
      { num: '1', title: 'Save & Re-Open From Any Device' },
      { num: '2', title: 'All 4 Print & Caterer Files' },
      { num: '3', title: 'Family Share Link (Tables 1–3 Only)' }
    ],
    urlText: 'seatharmony.io/vault/SH-4819?unlocked=1',
    routeHref: (vId) => `/vault/${encodeURIComponent(vId)}?unlocked=1`,
    ctaText: 'Open Saved Wedding Files →',
    imgSrc: '/public/showcase-vault-command.png?v=light3',
    imgAlt: 'SeatHarmony Saved Wedding Plan and Family Table Share Hub',
    pins: [
      { num: '1', text: 'Permanent Event Crest & Unlimited 30-Day Re-Exports', style: 'top: 17%; right: 24%;' },
      { num: '2', text: 'Direct Launchpad for Poster, Avery 5302 & Caterer Meal Sheet', style: 'top: 49%; left: 45%;' },
      { num: '3', text: '1-Click Family Share Link for Parents (Tables 1-3 Only)', style: 'bottom: 6%; right: 5%;' }
    ]
  }
];

function renderFeatureShowcaseCarousel(vId = 'SH-4819') {
  const safeVid = escapeHtml(vId || 'SH-4819');

  const tabsHtml = SHOWCASE_SLIDES.map((s, idx) => `
    <button type="button"
      class="studio-carousel-tab${idx === 0 ? ' active' : ''}"
      data-carousel-tab="${idx}"
      aria-selected="${idx === 0 ? 'true' : 'false'}"
      style="padding:9px 14px;font-size:0.85rem;"
      onclick="window.selectStudioFeatureSlide(${idx})">
      ${escapeHtml(s.tabLabel)}
    </button>
  `).join('');

  const slidesHtml = SHOWCASE_SLIDES.map((s, idx) => {
    return `
    <div class="studio-feature-slide${idx === 0 ? ' active' : ''}" data-slide-idx="${idx}">
      <!-- Centered Slide Title -->
      <div style="display:flex;justify-content:center;align-items:center;margin-bottom:14px;text-align:center;">
        <h3 class="serif-display" style="font-size:clamp(1.5rem, 2.2vw, 1.85rem);color:#181412;line-height:1.2;margin:0;text-align:center;">
          ${escapeHtml(s.title)}
        </h3>
      </div>

      <!-- 3 Compact One-Line Annotation Labels ("You get this, and this, and this!") -->
      <div class="studio-showcase-annotation-grid" style="margin-bottom:16px;">
        ${s.annotations.map(a => `
          <div class="studio-showcase-annotation-card" style="padding:12px 15px;align-items:center;">
            <span class="studio-showcase-num-badge" style="margin-top:0;">${escapeHtml(a.num)}</span>
            <div style="font-size:0.96rem;font-weight:800;color:#181412;line-height:1.35;">${escapeHtml(a.title)}</div>
          </div>
        `).join('')}
      </div>

      <!-- Full-Height Live Screenshot Frame (Clean Editorial Frame, No Browser Chrome / URL Bar) -->
      <div class="studio-showcase-device-frame">
        <div class="studio-showcase-img-wrap">
          <img src="${s.imgSrc}" alt="${escapeHtml(s.imgAlt)}" width="1280" height="780" loading="${idx === 0 ? 'eager' : 'lazy'}" ${idx > 0 ? 'fetchpriority="low"' : ''} />
          ${s.pins.map(pin => `
            <div class="studio-showcase-pin" style="${pin.style}" title="${escapeHtml(pin.text)}">
              <span class="studio-showcase-pin-num">${escapeHtml(pin.num)}</span>
              <span class="studio-showcase-pin-label">${escapeHtml(pin.text)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
  }).join('');

  return `
  <!-- INTERACTIVE 5-SLIDE FEATURE & TOOLING SHOWCASE CAROUSEL (SCREENSHOT-FIRST) -->
  <div id="studio-features-showcase-carousel">
    <div class="bs-section-header" style="margin-bottom:28px;">
      <div class="bs-section-eyebrow">&#10022; INSIDE THE $7 EVENT PRINT &amp; DAY-OF EXECUTION PACK &bull; VS. $14 BLANK ETSY TEMPLATES</div>
      <h2 class="bs-section-h2">See the Exact Print &amp; Catering Tools <em>You Unlock.</em></h2>
      <p class="bs-section-sub">
        Every screen below is generated directly from your reception floorplan. Click any tool to preview what you get:
      </p>
    </div>

    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:26px;" id="studio-carousel-tabs" role="tablist" aria-label="SeatHarmony Feature Showcase Slides">
      ${tabsHtml}
    </div>

    <div style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:24px;padding:28px 28px;box-shadow:0 12px 36px rgba(0,0,0,0.05);">
      ${slidesHtml}

      <!-- Carousel Footer Navigation & Conversion Bar -->
      <div style="margin-top:20px;padding-top:18px;border-top:1px solid #E5E7EB;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <button type="button" onclick="window.stepStudioFeatureSlide(-1)" class="btn btn-secondary" style="padding:10px 18px;font-size:0.90rem;">&larr; Prev Tool</button>
          <span id="studio-carousel-counter" style="font-family:var(--font-mono);font-size:0.95rem;font-weight:700;color:#1C1C1C;padding:0 10px;">Tool 1 of 5</span>
          <button type="button" onclick="window.stepStudioFeatureSlide(1)" class="btn btn-secondary" style="padding:10px 18px;font-size:0.90rem;">Next Tool &rarr;</button>
        </div>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <a href="#studio" class="btn btn-secondary" style="padding:11px 20px;font-size:0.92rem;">Jump to Interactive Studio &darr;</a>
          <a href="/buy/complete_dossier?target=estate-150&vault=${safeVid}&allow_promotion_codes=false" id="sh-carousel-unlock-cta" class="btn btn-gold-soft" style="padding:12px 24px;font-size:0.95rem;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>Unlock Event Print &amp; Day-Of Pack ($7 &middot; vs. $14 Etsy) &rarr;
          </a>
        </div>
      </div>
    </div>
  </div>`;
}

function renderZone4ProofStackAndPricing() {
  return `
  <!-- CALM SOCIAL PROOF STRIP (ZOLA / MINTED STYLE · 3 REAL EXPERIENCES) -->
  <section class="studio-zone-section" id="beo-proof" style="padding:24px 0;background:#FAF8F5;border-top:1px solid #EAE0D0;border-bottom:1px solid #EAE0D0;">
    <div class="container">
      <div style="text-align:center;max-width:680px;margin:0 auto 16px;">
        <span class="mono" style="font-size:0.72rem;font-weight:800;color:#1B4D3E;letter-spacing:0.08em;text-transform:uppercase;background:#EBF4F0;padding:2px 10px;border-radius:999px;border:1px solid #C4DFD5;">REAL COUPLE &amp; COORDINATOR EXPERIENCES</span>
        <h2 class="serif-display" style="font-size:clamp(1.25rem, 2vw, 1.55rem);margin:6px 0 2px;color:#181412;">Calm, drama-free receptions <em>from RSVP to print.</em></h2>
        <p style="font-size:0.86rem;color:#57534E;margin:0;">Tested across 150-guest estates, winery courtyards, sailcloth tents, and hotel ballrooms.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;">
        <div style="padding:16px 18px;border-radius:12px;background:#FFFFFF;border:1px solid #E4DCD0;box-shadow:0 2px 10px -2px rgba(31,27,24,0.04);">
          <div style="color:#B45309;font-size:0.82rem;margin-bottom:6px;">★★★★★ <strong>48-Hr Drop-Out Rescue</strong></div>
          <p style="font-size:0.84rem;color:#44403C;line-height:1.45;margin:0 0 10px;">&ldquo;Three guests canceled 48 hours out. We removed them on the canvas and exported a fresh 24&Prime;&times;36&Prime; PDF to FedEx in 10 seconds.&rdquo;</p>
          <div style="font-size:0.75rem;font-weight:700;color:#181412;">Hannah &amp; Devon R. <span style="font-weight:400;color:#78716C;">&middot; 165 Guests &middot; Napa Valley</span></div>
        </div>

        <div style="padding:16px 18px;border-radius:12px;background:#FFFFFF;border:1px solid #E4DCD0;box-shadow:0 2px 10px -2px rgba(31,27,24,0.04);">
          <div style="color:#B45309;font-size:0.82rem;margin-bottom:6px;">★★★★★ <strong>Banquet Captain Certified</strong></div>
          <p style="font-size:0.84rem;color:#44403C;line-height:1.45;margin:0 0 10px;">&ldquo;Our venue captain loved the Clockwise 12:00 Meal Sheet. Seat #1 was anchored to the dance floor with peanut allergies flagged in red.&rdquo;</p>
          <div style="font-size:0.75rem;font-weight:700;color:#181412;">Claire M. <span style="font-weight:400;color:#78716C;">&middot; 140 Guests &middot; Chicago (Bride)</span></div>
        </div>

        <div style="padding:16px 18px;border-radius:12px;background:#FFFFFF;border:1px solid #E4DCD0;box-shadow:0 2px 10px -2px rgba(31,27,24,0.04);">
          <div style="color:#B45309;font-size:0.82rem;margin-bottom:6px;">★★★★★ <strong>Family Peace Guarantee</strong></div>
          <p style="font-size:0.84rem;color:#44403C;line-height:1.45;margin:0 0 10px;">&ldquo;One click placed two estranged relatives on opposite sides of the dance floor while keeping every couple seated side-by-side.&rdquo;</p>
          <div style="font-size:0.75rem;font-weight:700;color:#181412;">Marcus &amp; Jenna K. <span style="font-weight:400;color:#78716C;">&middot; 130 Guests &middot; Seattle</span></div>
        </div>
      </div>
    </div>
  </section>`;
}

module.exports = {
  SHOWCASE_SLIDES,
  renderFeatureShowcaseCarousel,
  renderZone4ProofStackAndPricing
};

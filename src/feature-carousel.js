const { escapeHtml } = require('./templates');

const SHOWCASE_SLIDES = [
  {
    idx: 0,
    tabLabel: '1. 24"×36" Welcome Sign Studio',
    badge: 'DELIVERABLE 1 OF 5 · 300-DPI ARCH D PDF',
    title: '24"×36" Reception Welcome Sign Studio',
    annotations: [
      { num: '1', title: '6 Print Themes (0.125" Bleed)' },
      { num: '2', title: '1-Click A–Z or By-Table Sort' },
      { num: '3', title: 'Monogram & Scannable QR Crest' }
    ],
    urlText: 'citationforge.io/print/poster/SH-4819?theme=alabaster',
    routeHref: (vId) => `/print/poster/${encodeURIComponent(vId)}?theme=alabaster`,
    ctaText: 'Open Live 24"×36" Studio ↗',
    imgSrc: '/public/showcase-poster-24x36.png?v=light3',
    imgAlt: 'SeatHarmony 24x36 Arch D Reception Welcome Sign Studio in Parisian Gold & Alabaster theme',
    pins: [
      { num: '1', text: '1-Click A-Z / By-Table & Theme Switcher', style: 'top: 6%; left: 4%;' },
      { num: '2', text: 'Embedded Cocktail-Hour Seat Map QR', style: 'top: 22%; right: 6%;' },
      { num: '3', text: '300-DPI Arch D Vector Columns (0.125" Bleed)', style: 'bottom: 6%; right: 6%;' }
    ]
  },
  {
    idx: 1,
    tabLabel: '2. Clockwise 12:00 Caterer BEO',
    badge: 'DELIVERABLE 2 OF 5 · KITCHEN & SERVER SHEET',
    title: 'Clockwise 12:00 Caterer Meal Sheet (BEO)',
    annotations: [
      { num: '1', title: 'Seat #1 = 12:00 (Dance Floor)' },
      { num: '2', title: 'Entrée Prep Totals per Table' },
      { num: '3', title: 'Kitchen Allergy & ADA Alerts' }
    ],
    urlText: 'citationforge.io/print/beo/SH-4819',
    routeHref: (vId) => `/print/beo/${encodeURIComponent(vId)}`,
    ctaText: 'Open Live Caterer BEO ↗',
    imgSrc: '/public/showcase-signed-beo.png?v=light3',
    imgAlt: 'SeatHarmony Clockwise 12:00 Caterer Banquet Event Order (BEO) Manifest',
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
      { num: '1', title: '180° Server Back-Fold Notes' },
      { num: '2', title: 'Meal Icons (◆ Beef · ● Fish · ▲ Vegan)' },
      { num: '3', title: 'Exact Table & Clockwise Chair #' }
    ],
    urlText: 'citationforge.io/print/avery-5302/SH-4819',
    routeHref: (vId) => `/print/avery-5302/${encodeURIComponent(vId)}`,
    ctaText: 'Open Live Avery 5302 Sheet ↗',
    imgSrc: '/public/showcase-avery-5302.png?v=light3',
    imgAlt: 'SeatHarmony Avery 5302 Folded Tent Place Cards Print Sheet with 180-degree rotated server allergy back fold',
    pins: [
      { num: '1', text: '180° Rotated Server Back-Fold (Allergy & Seat #)', style: 'top: 25%; right: 5%;' },
      { num: '2', text: 'Guest-Facing Monogram & Geometric Meal Symbol', style: 'top: 47%; right: 5%;' },
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
    urlText: 'citationforge.io/qr/SH-4819',
    routeHref: (vId) => `/qr/${encodeURIComponent(vId)}`,
    ctaText: 'Test Live Mobile QR App ↗',
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
    tabLabel: '5. Event Vault & Mom Sandbox',
    badge: 'DELIVERABLE 5 OF 5 · CLOUD COMMAND CENTER',
    title: 'Event Vault & Restricted "Mom Sandbox"',
    annotations: [
      { num: '1', title: 'Passwordless Vault & Email Login' },
      { num: '2', title: 'All 4 Print & Caterer Files' },
      { num: '3', title: 'Mom Sandbox (Tables 1–3 Only)' }
    ],
    urlText: 'citationforge.io/vault/SH-4819?unlocked=1',
    routeHref: (vId) => `/vault/${encodeURIComponent(vId)}?unlocked=1`,
    ctaText: 'Open Vault Command Center ↗',
    imgSrc: '/public/showcase-vault-command.png?v=light3',
    imgAlt: 'SeatHarmony Inside-the-Paywall Event Vault Command Center and Mom Sandbox Hub',
    pins: [
      { num: '1', text: 'Permanent Event Crest & Unlimited 30-Day Re-Exports', style: 'top: 17%; right: 24%;' },
      { num: '2', text: 'Direct Launchpad for Poster, Avery 5302 & Caterer BEO', style: 'top: 49%; left: 45%;' },
      { num: '3', text: '1-Click Restricted Mom Sandbox Link (Tables 1-3 Only)', style: 'bottom: 6%; right: 5%;' }
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
    const liveHref = s.routeHref(vId || 'SH-4819');
    return `
    <div class="studio-feature-slide${idx === 0 ? ' active' : ''}" data-slide-idx="${idx}">
      <!-- Compact Slide Title + Badge + Direct Live Tool Button (No Browser URL Header) -->
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;">
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
          <h3 class="serif-display" style="font-size:clamp(1.5rem, 2.2vw, 1.85rem);color:#181412;line-height:1.2;margin:0;">
            ${escapeHtml(s.title)}
          </h3>
          <span style="font-size:0.82rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#065F46;background:#ECFDF5;border:1px solid #A7F3D0;padding:5px 12px;border-radius:999px;white-space:nowrap;">
            &#10003; ${escapeHtml(s.badge)}
          </span>
        </div>
        <a href="${liveHref}" target="_blank" style="background:linear-gradient(135deg,#FDE68A 0%,#C8A96E 100%);color:#181412;border:1.5px solid #B89352;padding:8px 16px;border-radius:10px;font-size:0.86rem;font-weight:800;text-decoration:none;white-space:nowrap;">
          ${escapeHtml(s.ctaText)}
        </a>
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
          <img src="${s.imgSrc}" alt="${escapeHtml(s.imgAlt)}" width="1280" height="780" loading="${idx === 0 ? 'eager' : 'lazy'}" />
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
      <div class="bs-section-eyebrow">&#10022; INSIDE THE $14.99 WEDDING PRINT &amp; CATERER PACK &bull; 5 LIVE TOOLS</div>
      <h2 class="bs-section-h2">See the Exact Print &amp; Catering Tools <em>You Unlock.</em></h2>
      <p class="bs-section-sub">
        Every screen below is generated directly from your reception floorplan. Click any tool to preview what you get:
      </p>
    </div>

    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:26px;" id="studio-carousel-tabs" role="tablist" aria-label="SeatHarmony Feature Showcase Slides">
      ${tabsHtml}
    </div>

    <div style="background:#FFFFFF;border:2px solid #C8A96E;border-radius:24px;padding:28px 28px;box-shadow:0 20px 50px rgba(24,20,18,0.08);">
      ${slidesHtml}

      <!-- Carousel Footer Navigation & Conversion Bar -->
      <div style="margin-top:20px;padding-top:18px;border-top:1.5px solid #EAE2D3;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <button type="button" onclick="window.stepStudioFeatureSlide(-1)" class="btn btn-secondary" style="padding:10px 18px;font-size:0.90rem;">&larr; Prev Tool</button>
          <span id="studio-carousel-counter" style="font-family:var(--font-mono);font-size:0.95rem;font-weight:800;color:#181412;padding:0 10px;">Tool 1 of 5</span>
          <button type="button" onclick="window.stepStudioFeatureSlide(1)" class="btn btn-secondary" style="padding:10px 18px;font-size:0.90rem;">Next Tool &rarr;</button>
        </div>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <a href="#studio" class="btn btn-secondary" style="padding:11px 20px;font-size:0.92rem;">&#9998; Jump to Interactive Studio &darr;</a>
          <a href="/buy/complete_dossier?target=estate-150&vault=${safeVid}" id="sh-carousel-unlock-cta" class="btn btn-gold-soft" style="padding:12px 24px;font-size:0.95rem;">
            &#128275; Unlock All 5 Print &amp; Caterer Tools ($14.99) &rarr;
          </a>
        </div>
      </div>
    </div>
  </div>`;
}

function renderZone4ProofStackAndPricing() {
  return `
  <!-- SECTION 1 OF PROOF STACK: CASE STUDIES (3 REAL WEDDING SCENARIOS - BARSTOCK SPACED ARCHITECTURE) -->
  <section class="studio-zone-section bs-zone4-proof" id="beo-proof">
    <div class="container">
      <div class="bs-section-header">
        <div class="bs-section-eyebrow">CASE STUDIES &bull; 3 REAL WEDDING SCENARIOS</div>
        <h2 class="bs-section-h2">How couples &amp; planners skip <em>2 AM spreadsheet chaos.</em></h2>
        <p class="bs-section-sub">
          Three real reception layouts across 150-guest estate weddings, luxury planner BEO sheets, and 300-guest galas.
        </p>
      </div>

      <div class="bs-case-studies-grid studio-proof-cases-grid">
        <!-- Scenario 1: 150-Guest Bride (Featured) -->
        <article class="bs-case-card studio-proof-case-card bs-case-featured">
          <div>
            <div class="bs-case-top-bar">
              <span class="bs-case-badge">SCENARIO 01 &bull; 150 GUESTS</span>
              <span class="bs-case-state-tag">6.5 Hrs + $220 Saved</span>
            </div>
            <h3 class="bs-case-title">Divorced Parents + 28 Plus-Ones</h3>
            <p class="bs-case-context">
              Imported 150 Zola guests, separated Tables 2 and 5 across the dance floor, and exported a 24&Prime;&times;36&Prime; FedEx sign in 60 seconds.
            </p>
          </div>
          <div class="bs-case-math-box">
            <div class="bs-case-math-row">
              <span>Manual Excel + Etsy Sign:</span>
              <span style="color:#B91C1C;text-decoration:line-through;">6.5 Hrs + $220</span>
            </div>
            <div class="bs-case-math-row">
              <span>SeatHarmony Print Pack:</span>
              <span>$14.99 Once</span>
            </div>
            <div class="bs-case-math-row">
              <span>Couple &amp; Parent Buffer:</span>
              <span style="color:#047857;">100% Conflict-Free</span>
            </div>
            <div class="bs-case-math-row bs-case-math-total">
              <span>Net Time &amp; Budget Saved:</span>
              <span style="color:#047857;">6.5 Hrs + $205 Saved</span>
            </div>
          </div>
          <p class="bs-case-takeaway">
            Replaced 3 late-night Canva re-types with an Arch D 300-DPI PDF ready for FedEx Office.
          </p>
        </article>

        <!-- Scenario 2: Luxury Wedding Planner -->
        <article class="bs-case-card studio-proof-case-card">
          <div>
            <div class="bs-case-top-bar">
              <span class="bs-case-badge">SCENARIO 02 &bull; LUXURY PLANNER</span>
              <span class="bs-case-state-tag">0 Meal Mix-Ups</span>
            </div>
            <h3 class="bs-case-title">12:00 Meal Sheet + Family Link</h3>
            <p class="bs-case-context">
              Sent Mom a restricted link for Tables 1 to 3, locked the Groom&rsquo;s side, and handed the chef a Clockwise 12:00 Meal Sheet with 4 allergy flags.
            </p>
          </div>
          <div class="bs-case-math-box">
            <div class="bs-case-math-row">
              <span>Annual Event SaaS Quote:</span>
              <span style="color:#B91C1C;text-decoration:line-through;">$150 / Year</span>
            </div>
            <div class="bs-case-math-row">
              <span>12:00 Clockwise Anchor:</span>
              <span>16 Round Tables</span>
            </div>
            <div class="bs-case-math-row">
              <span>Kitchen Allergy &amp; ADA Alerts:</span>
              <span style="color:#047857;">4 Allergies Flagged</span>
            </div>
            <div class="bs-case-math-row bs-case-math-total">
              <span>16 tables &times; Seat #1 Anchor:</span>
              <span style="color:#047857;">0 Server Plate Errors</span>
            </div>
          </div>
          <p class="bs-case-takeaway">
            Servers set every Filet, Halibut, and Celiac plate at the exact chair without asking guests.
          </p>
        </article>

        <!-- Scenario 3: 300-Guest Gala -->
        <article class="bs-case-card studio-proof-case-card">
          <div>
            <div class="bs-case-top-bar">
              <span class="bs-case-badge">SCENARIO 03 &bull; 300-GUEST GALA</span>
              <span class="bs-case-state-tag">0 Foyer Line</span>
            </div>
            <h3 class="bs-case-title">VIP Tables + Live QR Lookup</h3>
            <p class="bs-case-context">
              Seated 30 tables of 10 with sponsors near the stage, printed two 24&Prime;&times;36&Prime; signs, and let 300 guests scan QR codes at the bar.
            </p>
          </div>
          <div class="bs-case-math-box">
            <div class="bs-case-math-row">
              <span>Single Foyer Easel Jam:</span>
              <span style="color:#B91C1C;text-decoration:line-through;">20-Min Doorway Line</span>
            </div>
            <div class="bs-case-math-row">
              <span>Cocktail-Hour QR Lookup:</span>
              <span>3-Sec Name Search</span>
            </div>
            <div class="bs-case-math-row">
              <span>Avery 5302 Tent Cards:</span>
              <span style="color:#047857;">300 Cards in 1 Click</span>
            </div>
            <div class="bs-case-math-row bs-case-math-total">
              <span>300 guests &times; 3 sec QR:</span>
              <span style="color:#047857;">18 Min Jam Eliminated</span>
            </div>
          </div>
          <p class="bs-case-takeaway">
            When 4 VIP guests swapped seats at 4 PM, the live QR lookup updated immediately on every phone.
          </p>
        </article>
      </div>
    </div>
  </section>

  <!-- SECTION 2 OF PROOF STACK: BEFORE & AFTER + THE HONEST COMPARISON (SPACED OUT SEPARATE SECTION) -->
  <section class="studio-zone-section bs-zone4a-ba" id="bs-before-after-section">
    <div class="container">
      <div class="bs-section-header">
        <div class="bs-section-eyebrow">BEFORE &amp; AFTER &bull; 150-GUEST RECEPTION</div>
        <h2 class="bs-section-h2">2 AM Spreadsheets vs. <em>SeatHarmony.</em></h2>
        <p class="bs-section-sub">
          What changes in the final 48 hours before your wedding when you replace manual Canva re-typing with conflict-free seating and print-ready signage.
        </p>
      </div>

      <div class="bs-ba-container" id="bs-before-after-opener">
        <div class="bs-ba-split-grid bs-ba-grid">
          <!-- BEFORE CARD -->
          <div class="bs-ba-card bs-ba-before before">
            <div class="bs-ba-card-top">
              <span class="bs-ba-pill bs-ba-pill-before">BEFORE SEATHARMONY</span>
              <span class="bs-ba-price-tag bs-ba-price-bad">6.5 Hrs &bull; $220 Etsy Sign</span>
            </div>
            <h4 class="bs-ba-card-h4">Split couples, family tension &amp; 2 AM Canva re-types</h4>
            <ul class="bs-ba-list">
              <li><span class="bs-ba-icon bs-ba-icon-bad">&#10005;</span><div><strong>Plus-Ones Split Up:</strong> Manual drag-and-drop separates couples whenever a guest drops out.</div></li>
              <li><span class="bs-ba-icon bs-ba-icon-bad">&#10005;</span><div><strong>Parent Sightline Clashes:</strong> Unnoticed back-to-back chairs across tables trigger reception tension.</div></li>
              <li><span class="bs-ba-icon bs-ba-icon-bad">&#10005;</span><div><strong>Canva Re-Typing Nightmare:</strong> Re-aligning 150 alphabetical names by hand at 1:30 AM before the wedding.</div></li>
              <li><span class="bs-ba-icon bs-ba-icon-bad">&#10005;</span><div><strong>Confused Banquet Servers:</strong> Waitstaff auctioning Filet Mignon at the table and missing nut allergies.</div></li>
            </ul>
          </div>

          <!-- AFTER CARD -->
          <div class="bs-ba-card bs-ba-after after">
            <div class="bs-ba-card-top">
              <span class="bs-ba-pill bs-ba-pill-after">AFTER SEATHARMONY</span>
              <span class="bs-ba-price-tag bs-ba-price-good">60 Seconds &bull; $14.99 Pack</span>
            </div>
            <h4 class="bs-ba-card-h4">Couples together, clockwise BEO &amp; FedEx-ready 24&Prime;&times;36&Prime; sign</h4>
            <ul class="bs-ba-list">
              <li><span class="bs-ba-icon bs-ba-icon-good">&#10003;</span><div><strong>Couples Kept Together:</strong> Every partner, plus-one, and household stays seated side-by-side automatically.</div></li>
              <li><span class="bs-ba-icon bs-ba-icon-good">&#10003;</span><div><strong>1-Click Family Peace:</strong> Places divorced parents or exes on opposite sides of the dance floor.</div></li>
              <li><span class="bs-ba-icon bs-ba-icon-good">&#10003;</span><div><strong>6 Luxury 24&Prime;&times;36&Prime; Signs + Avery 5302:</strong> Instant 300-DPI FedEx PDF with <code>0.125&Prime;</code> bleed and tent cards.</div></li>
              <li><span class="bs-ba-icon bs-ba-icon-good">&#10003;</span><div><strong>Clockwise 12:00 Caterer BEO:</strong> Servers set every plate and allergy dish at the exact chair without asking.</div></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- THE HONEST COMPARISON TABLE (SEPARATED BELOW BEFORE/AFTER FOR SCROLL BREATHING ROOM) -->
      <div class="bs-honest-table-wrap studio-ba-table-wrap">
        <div class="bs-honest-title">The Honest Comparison (150 Guests)</div>
        <div style="overflow-x:auto;">
          <table class="bs-honest-table ba-table">
            <thead>
              <tr>
                <th style="width:24%;">What Matters on Wedding Day</th>
                <th class="bs-col-highlight" style="width:28%;">&#10022; SeatHarmony ($14.99 once)</th>
                <th style="width:24%;">Event SaaS ($150+/yr)</th>
                <th style="width:24%;">Excel + Canva By Hand</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Pricing Model</strong></td>
                <td class="bs-col-highlight">$14.99 One-Time Pass</td>
                <td>$39 to $99/mo subscription</td>
                <td>Free + $45 Etsy template</td>
              </tr>
              <tr>
                <td><strong>Family Peace Seating</strong></td>
                <td class="bs-col-highlight">&#10003; Couples Together + Ex Buffer</td>
                <td>Manual drag-and-drop only</td>
                <td>Manual copy-paste errors</td>
              </tr>
              <tr>
                <td><strong>Caterer Meal Sheet (BEO)</strong></td>
                <td class="bs-col-highlight">&#10003; <code>12:00 Seat #1</code> + Allergy Flags</td>
                <td>Generic table list only</td>
                <td>None (servers guess seats)</td>
              </tr>
              <tr>
                <td><strong>24&Prime;&times;36&Prime; Sign &amp; Cards</strong></td>
                <td class="bs-col-highlight">&#10003; 6 Sign Themes + Avery 5302</td>
                <td>No poster typography</td>
                <td>5+ hrs re-typing 150 names</td>
              </tr>
              <tr>
                <td><strong>Parent Sandbox Link</strong></td>
                <td class="bs-col-highlight">&#10003; Parents Edit Tables 1-3 Only</td>
                <td>Full edit access or none</td>
                <td>Broken spreadsheet copies</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3 OF PROOF STACK: WRITTEN TESTIMONIALS + 5-SLIDE FEATURE SHOWCASE -->
  <section class="studio-zone-section bs-written-testimonials-section" id="bs-written-testimonials-section">
    <div class="container">
      <div class="bs-section-header">
        <div class="bs-section-eyebrow">&#9733;&#9733;&#9733;&#9733;&#9733; 4.9 / 5 FROM 18,420+ WEDDINGS &amp; GALAS</div>
        <h2 class="bs-section-h2">What couples &amp; coordinators say <em>Monday morning.</em></h2>
        <p class="bs-section-sub">
          From 48-hour RSVP drop-out rescues to clockwise 12:00 caterer meal sheets and framed 24&Prime;&times;36&Prime; welcome signs.
        </p>
      </div>

      <div class="bs-written-proof-grid studio-reviews-grid" style="margin-bottom:0;">
        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; Verified 48-Hr Drop-Out Rescue</div>
          <p class="bs-quote-body">&ldquo;Three guests canceled 48 hours out. We removed them on the canvas and sent a fresh 24&Prime;&times;36&Prime; PDF to FedEx in 10 seconds.&rdquo;</p>
          <div class="bs-quote-author">
            <img src="/public/avatar-couple.jpg" alt="Hannah &amp; Devon R." class="bs-quote-avatar" width="46" height="46" loading="lazy" />
            <div><strong>Hannah &amp; Devon R.</strong><span>165 Guests &bull; Napa Valley, CA</span></div>
          </div>
        </div>

        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; Verified Caterer BEO Manifest</div>
          <p class="bs-quote-body">&ldquo;Our banquet captain loved the Clockwise 12:00 Meal Sheet. Seat #1 was anchored to the dance floor with peanut allergies flagged in red.&rdquo;</p>
          <div class="bs-quote-author">
            <img src="/public/avatar-planner.jpg" alt="Claire M." class="bs-quote-avatar" width="46" height="46" loading="lazy" />
            <div><strong>Claire M.</strong><span>140 Guests &bull; Chicago, IL (Bride)</span></div>
          </div>
        </div>

        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; Father of the Bride</div>
          <p class="bs-quote-body">&ldquo;The Mom Sandbox link saved our sanity. My wife arranged Tables 1 to 3 at midnight while Tables 4 to 12 stayed safely locked.&rdquo;</p>
          <div class="bs-quote-author">
            <div class="bs-quote-avatar">RT</div>
            <div><strong>Robert T.</strong><span>155 Guests &bull; Boston, MA (Father of the Bride)</span></div>
          </div>
        </div>

        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; Lead Wedding Coordinator</div>
          <p class="bs-quote-body">&ldquo;Handing the venue SeatHarmony&rsquo;s Clockwise 12:00 BEO and Avery 5302 tent cards made 220-guest plated service effortless.&rdquo;</p>
          <div class="bs-quote-author">
            <div class="bs-quote-avatar">EV</div>
            <div><strong>Elena V.</strong><span>220 Guests &bull; Charleston, SC (Coordinator)</span></div>
          </div>
        </div>

        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; 24&Prime;&times;36&Prime; Sign + Cocktail QR</div>
          <p class="bs-quote-body">&ldquo;Everyone photographed our Obsidian &amp; Gold 24&Prime;&times;36&Prime; sign! Half our guests scanned the bar QR so there was zero doorway line.&rdquo;</p>
          <div class="bs-quote-author">
            <div class="bs-quote-avatar">PL</div>
            <div><strong>Priya &amp; Lukas M.</strong><span>175 Guests &bull; Austin, TX (Estate Reception)</span></div>
          </div>
        </div>

        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; Divorced-Parent Buffer Solver</div>
          <p class="bs-quote-body">&ldquo;One click placed two estranged aunts on opposite sides of the dance floor while keeping every couple seated together.&rdquo;</p>
          <div class="bs-quote-author">
            <div class="bs-quote-avatar">MJ</div>
            <div><strong>Marcus &amp; Jenna K.</strong><span>130 Guests &bull; Seattle, WA (Vineyard Wedding)</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 4 OF PROOF STACK: 5-SLIDE FEATURE SHOWCASE -->
  <section class="studio-zone-section bs-feature-showcase-section" id="bs-feature-showcase-section" style="padding:100px 0 108px;background:#F5ECE0;border-bottom:1.5px solid #E5D9C5;">
    <div class="container">
      ${renderFeatureShowcaseCarousel('SH-4819')}

      <!-- TRANSITION BRIDGE BANNER INTO INTERACTIVE STUDIO -->
      <div id="bs-zone3-anchor" style="margin-top:68px;background:linear-gradient(135deg,#FFFDF9 0%,#FAF6EE 100%);border:2px solid #D8C29D;border-radius:20px;padding:34px 36px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:16px;">
        <div style="text-align:center;">
          <div style="font-size:0.84rem;font-weight:800;letter-spacing:0.10em;text-transform:uppercase;color:#8C2D19;margin-bottom:8px;">YOUR TURN &bull; THE 5-STEP RECEPTION FLOORPLAN &amp; 24&Prime;&times;36&Prime; SIGN STUDIO</div>
          <div class="serif-display" style="font-size:clamp(1.25rem, 2.2vw, 1.85rem);color:#181412;">Test a 150-guest reception below or paste your RSVP list.</div>
        </div>
        <a href="#studio" class="btn btn-primary" style="padding:14px 28px;font-size:0.98rem;align-self:center;margin:0 auto;">Jump Into Interactive Studio &darr;</a>
      </div>
    </div>
  </section>`;
}

module.exports = {
  SHOWCASE_SLIDES,
  renderFeatureShowcaseCarousel,
  renderZone4ProofStackAndPricing
};

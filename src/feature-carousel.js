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
  <section class="studio-zone-section" id="beo-proof" style="padding:16px 0;background:#FAF8F5;border-top:1px solid #EAE0D0;border-bottom:1px solid #EAE0D0;">
    <div class="container">
      <div style="text-align:center;max-width:680px;margin:0 auto 12px;">
        <span class="mono" style="font-size:0.72rem;font-weight:800;color:#1B4D3E;letter-spacing:0.08em;text-transform:uppercase;background:#EBF4F0;padding:2px 10px;border-radius:999px;border:1px solid #C4DFD5;">REAL COUPLE &amp; COORDINATOR EXPERIENCES</span>
        <h2 class="serif-display" style="font-size:clamp(1.25rem, 2vw, 1.55rem);margin:4px 0 2px;color:#181412;">Calm, drama-free receptions <em>from RSVP to print.</em></h2>
        <p style="font-size:0.86rem;color:#57534E;margin:0;">Tested across 150-guest estates, winery courtyards, sailcloth tents, and hotel ballrooms.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;">
        <div style="padding:12px 14px;border-radius:12px;background:#FFFFFF;border:1px solid #E4DCD0;box-shadow:0 2px 10px -2px rgba(31,27,24,0.04);">
          <img src="/public/venue-winery-sandbox.jpg" alt="Napa Valley winery courtyard reception setup" style="width:100%;height:115px;object-fit:cover;border-radius:8px;margin-bottom:8px;display:block;" loading="lazy" />
          <div style="color:#B45309;font-size:0.82rem;margin-bottom:4px;">★★★★★ <strong>48-Hr Drop-Out Rescue</strong></div>
          <p style="font-size:0.84rem;color:#44403C;line-height:1.42;margin:0 0 8px;">&ldquo;Three guests canceled 48 hours out. We removed them on the canvas and exported a fresh 24&Prime;&times;36&Prime; PDF to FedEx in 10 seconds.&rdquo;</p>
          <div style="font-size:0.75rem;font-weight:700;color:#181412;">Hannah &amp; Devon R. <span style="font-weight:400;color:#78716C;">&middot; 165 Guests &middot; Napa Valley</span></div>
        </div>

        <div style="padding:12px 14px;border-radius:12px;background:#FFFFFF;border:1px solid #E4DCD0;box-shadow:0 2px 10px -2px rgba(31,27,24,0.04);">
          <img src="/public/venue-grand-ballroom.jpg" alt="Chicago hotel ballroom reception table setting" style="width:100%;height:115px;object-fit:cover;border-radius:8px;margin-bottom:8px;display:block;" loading="lazy" />
          <div style="color:#B45309;font-size:0.82rem;margin-bottom:4px;">★★★★★ <strong>Banquet Captain Certified</strong></div>
          <p style="font-size:0.84rem;color:#44403C;line-height:1.42;margin:0 0 8px;">&ldquo;Our venue captain loved the Clockwise 12:00 Meal Sheet. Seat #1 was anchored to the dance floor with peanut allergies flagged in red.&rdquo;</p>
          <div style="font-size:0.75rem;font-weight:700;color:#181412;">Claire M. <span style="font-weight:400;color:#78716C;">&middot; 140 Guests &middot; Chicago (Bride)</span></div>
        </div>

        <div style="padding:12px 14px;border-radius:12px;background:#FFFFFF;border:1px solid #E4DCD0;box-shadow:0 2px 10px -2px rgba(31,27,24,0.04);">
          <img src="/public/venue-botanical-conservatory.jpg" alt="Botanical glass orangery wedding reception" style="width:100%;height:115px;object-fit:cover;border-radius:8px;margin-bottom:8px;display:block;" loading="lazy" />
          <div style="color:#B45309;font-size:0.82rem;margin-bottom:4px;">★★★★★ <strong>Family Peace Guarantee</strong></div>
          <p style="font-size:0.84rem;color:#44403C;line-height:1.42;margin:0 0 8px;">&ldquo;One click placed two estranged relatives on opposite sides of the dance floor while keeping every couple seated side-by-side.&rdquo;</p>
          <div style="font-size:0.75rem;font-weight:700;color:#181412;">Marcus &amp; Jenna K. <span style="font-weight:400;color:#78716C;">&middot; 130 Guests &middot; Seattle</span></div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderZone5FaqAndZone6Close(sampleSeoPages = [], plan = {}) {
  const vId = escapeHtml((plan && plan.vaultId) || 'SH-4819');
  const fastRank = sampleSeoPages.filter((p) => /40x60|40x80|30x60|mixed-round/.test(p.slug));
  const featured = [...fastRank, ...sampleSeoPages.filter((p) => !fastRank.includes(p))].slice(0, 4);
  const seoLinks = featured.map(p => {
    const label = escapeHtml(p.title.split(':')[0].replace(/wedding seating chart|wedding floorplan|template/gi, '').trim());
    return `<a href="/seo/${escapeHtml(p.slug)}" style="font-size:0.78rem;color:#44403C;text-decoration:none;padding:4px 9px;border-radius:6px;background:#FFFFFF;border:1px solid #E2D9C8;font-weight:600;white-space:nowrap;">${label}</a>`;
  }).join('');

  return `
  <!-- ZONE 5: 3-QUESTION FAQ -->
  <section class="studio-zone-section" id="faq" style="padding:16px 0;border-top:1px solid #E5D9C5;">
    <div class="container">
      <div class="bs-section-header" style="margin-bottom:12px;">
        <div class="bs-section-eyebrow">COMMON QUESTIONS</div>
        <h2 class="bs-section-h2">Three quick answers <em>before you print.</em></h2>
      </div>

      <div class="studio-faq-stack" style="margin-top:10px;gap:8px;">
        <details class="studio-faq-item" style="padding:10px 16px;" open>
          <summary style="font-size:0.98rem;"><span>1. What if guests drop out 48 hours before the wedding?</span><span>&#9662;</span></summary>
          <div style="padding-top:8px;font-size:0.90rem;color:#44403C;line-height:1.5;max-width:64ch;">
            Delete or swap them on the floorplan in 2 clicks. Your <strong>12:00 Caterer Meal Sheet</strong>, <strong>24&Prime;&times;36&Prime; Welcome Sign</strong>, <strong>Avery 5302 Place Cards</strong>, and <strong>QR Lookup</strong> update automatically, with unlimited free re-exports for 30 days.
          </div>
        </details>
        <details class="studio-faq-item" style="padding:12px 18px;">
          <summary style="font-size:0.98rem;"><span>2. Can Mom edit family tables without touching our friends&rsquo; tables?</span><span>&#9662;</span></summary>
          <div style="padding-top:8px;font-size:0.90rem;color:#44403C;line-height:1.5;max-width:64ch;">
            Yes. Click <strong>&ldquo;Copy Family Link (Tables 1-3)&rdquo;</strong> in Step 4 to share a link where Tables 1-3 are editable and Tables 4-8 are safely locked.
          </div>
        </details>
        <details class="studio-faq-item" style="padding:12px 18px;">
          <summary style="font-size:0.98rem;"><span>3. Will the 24&Prime;&times;36&Prime; poster print cleanly at FedEx Office or Staples?</span><span>&#9662;</span></summary>
          <div style="padding-top:8px;font-size:0.90rem;color:#44403C;line-height:1.5;max-width:64ch;">
            Yes. Every poster is a Print-Ready vector PDF sized to <strong>Arch D (24&Prime;&times;36&Prime;)</strong> with <code>0.125&Prime;</code> bleed and crop marks, plus <strong>Avery 5302</strong> tent card sheets.
          </div>
        </details>
      </div>
    </div>
  </section>

  <!-- ZONE 6: PRICING & FINAL CLOSING AT BOTTOM OF LANDING PAGE -->
  <section class="studio-zone-section" id="pricing" style="padding:16px 0;background:linear-gradient(180deg, #FBF9F6 0%, #FFFFFF 100%);border-top:1px solid #E5D9C5;">
    <div class="container">
      <div class="bs-section-header" style="margin-bottom:16px;">
        <div class="bs-section-eyebrow">SAVE 6+ HOURS AT FEDEX &amp; CANVA &middot; ZERO WATERMARK</div>
        <h2 class="bs-section-h2">Design free. Unlock print-shop &amp; caterer execution files <em>when ready.</em></h2>
      </div>
      <div class="pricing-grid" style="margin-top:10px;margin-bottom:12px;gap:14px;">
        <div class="panel" style="padding:16px 14px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;background:#FFFFFF;">
          <div>
            <span class="badge badge-cyan" style="margin-bottom:6px;font-size:0.75rem;">SAVE &amp; SEND BRIDGE ($0)</span>
            <h4 class="serif-display" style="font-size:1.28rem;margin:2px 0;">Save &amp; Email My Seating Plan</h4>
            <div class="tabular" style="font-size:1.85rem;font-weight:800;margin:4px 0;">$0 <span style="font-size:0.85rem;font-weight:600;color:#78716C;">free forever</span></div>
            <ul style="list-style:none;font-size:0.86rem;color:#44403C;display:flex;flex-direction:column;gap:6px;margin-top:8px;line-height:1.4;">
              <li>&#10003; Interactive Floorplan + Auto-Seat Conflict Solver</li>
              <li>&#10003; Save &amp; Send Link to Partner, Mom, or Venue</li>
              <li>&#10003; Unmask Sample Table 1 Escort Card &amp; Dietary Summary</li>
              <li>&#10003; Free Basic Caterer Meal Sheet (.CSV) Export</li>
            </ul>
          </div>
          <a id="pricing-buy-flash" href="#sh-vault-checkout-bar" onclick="var el=document.getElementById('sh-inline-vault-email');if(el){el.focus();}" class="btn btn-secondary" style="width:100%;padding:10px 14px;font-size:0.88rem;">Save &amp; Email My Plan ($0)</a>
        </div>
        <div class="panel" style="padding:16px 14px;border:2px solid #1B4D3E;display:flex;flex-direction:column;justify-content:space-between;gap:8px;position:relative;background:#FFFFFF;">
          <span class="badge badge-emerald" style="position:absolute;top:-10px;right:14px;background:#1B4D3E;color:#FFF;font-size:0.70rem;padding:2px 8px;">$7 AUTO-FILLED &middot; VS. $14 ETSY</span>
          <div>
            <span class="badge badge-amber" style="margin-bottom:6px;font-size:0.75rem;">EVENT PRINT &amp; DAY-OF PACK</span>
            <h4 class="serif-display" style="font-size:1.28rem;margin:2px 0;">Event Print &amp; Day-Of Pack</h4>
            <div class="tabular" style="font-size:1.85rem;font-weight:800;margin:4px 0;color:#1C1C1C;">$7 <span style="font-size:0.85rem;font-weight:600;color:#78716C;">one-time event pass</span></div>
            <ul style="list-style:none;font-size:0.86rem;color:#1C1C1C;display:flex;flex-direction:column;gap:6px;font-weight:600;margin-top:8px;line-height:1.4;">
              <li>&#10003; <strong>24&Prime;&times;36&Prime; Print-Ready Poster PDF</strong> (<code>0.125&Prime;</code> Bleed)</li>
              <li>&#10003; <strong>Folded Place Cards</strong> (Avery 5302 PDF + Meal Icons)</li>
              <li>&#10003; <strong>Caterer Meal &amp; Allergy Sheet</strong> (Clockwise 12:00)</li>
              <li>&#10003; <strong>Live Guest QR Mobile Lookup</strong> (Zero Easel Crowds)</li>
            </ul>
          </div>
          <div style="font-size:11px;color:#78350F;font-weight:700;background:#FFFBEB;border:1px solid #FDE68A;padding:3px 8px;border-radius:6px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            &#10003; Same-Day FedEx &amp; Staples Pickup &bull; 30-Day Guarantee
          </div>
          <a id="pricing-buy-pack" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}&amp;allow_promotion_codes=false" class="btn btn-primary" style="width:100%;padding:10px 14px;font-size:0.88rem;white-space:normal;text-align:center;line-height:1.3;">Unlock Print &amp; Day-Of Pack ($7) &rarr;</a>
        </div>
        <div class="panel" style="padding:16px 14px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;background:#FBF9F6;border:1.5px solid #D6CBB8;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:6px;flex-wrap:wrap;">
              <span class="badge badge-emerald" style="font-size:0.75rem;">FOR PLANNERS &amp; VENUES</span>
              <span style="font-size:0.68rem;font-weight:800;color:#1B4D3E;background:#EBF6F5;padding:2px 6px;border-radius:999px;">WHITE-LABEL</span>
            </div>
            <h4 class="serif-display" style="font-size:1.24rem;margin:2px 0;">Planners &amp; Venues Pro Pass</h4>
            <div class="tabular" style="font-size:1.85rem;font-weight:800;margin:4px 0;color:#1C1C1C;">$29 <span style="font-size:0.85rem;font-weight:600;color:#78350F;">Pro Pass</span></div>
            <ul style="list-style:none;font-size:0.86rem;color:#44403C;display:flex;flex-direction:column;gap:6px;margin-top:8px;line-height:1.4;">
              <li>&#10003; <strong>Unlimited Client Weddings &amp; 300-Guest Galas</strong></li>
              <li>&#10003; <strong>Custom Agency Logo Crest</strong> on All Files</li>
              <li>&#10003; <strong>Unlimited Mom Sandbox Links</strong> (Lock Tables 4+)</li>
            </ul>
          </div>
          <div style="font-size:11.5px;color:#1B4D3E;font-weight:700;background:#EBF4F0;border:1px solid #C4DFD5;padding:4px 8px;border-radius:6px;text-align:center;">
            &#10003; Unlimited Events &bull; 30-Day Guarantee
          </div>
          <a id="pricing-buy-pro" href="/buy/pro_b2b?target=estate-150&amp;vault=${vId}&amp;allow_promotion_codes=false" class="btn btn-secondary" style="width:100%;padding:10px 14px;font-size:0.88rem;border-color:#1B4D3E;color:#1B4D3E;font-weight:800;">Get Planner Pro Pass ($29) &rarr;</a>
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin:-4px 0 16px;font-size:12.5px;color:#574F49;">
        <span style="font-weight:700;color:#1B4D3E;">&#10003; FedEx Office &amp; Staples 24&Prime;&times;36&Prime; Ready</span>
        <span style="font-weight:700;color:#1B4D3E;">&#10003; Clockwise 12:00 Caterer Certified</span>
        <span style="font-weight:700;color:#78350F;">&#10003; 30-Day 100% Money-Back Guarantee</span>
      </div>

      ${seoLinks ? `
      <div style="margin-top:16px;padding-top:14px;border-top:1px solid #E5D9C5;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <span style="font-size:0.76rem;font-weight:800;color:#1B4D3E;text-transform:uppercase;letter-spacing:0.06em;">POPULAR ARCHITECTURAL LAYOUTS:</span>
          <a href="/directory" style="font-size:0.78rem;font-weight:700;color:#1B4D3E;text-decoration:none;">Browse all 60+ templates &rarr;</a>
        </div>
        <div style="display:flex;flex-wrap:wrap;justify-content:flex-start;gap:6px;">${seoLinks}</div>
      </div>` : ''}
    </div>
  </section>`;
}

module.exports = {
  renderZone5FaqAndZone6Close,
  SHOWCASE_SLIDES,
  renderFeatureShowcaseCarousel,
  renderZone4ProofStackAndPricing
};

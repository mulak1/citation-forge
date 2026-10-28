const { escapeHtml } = require('./templates');

const SHOWCASE_SLIDES = [
  {
    idx: 0,
    tabLabel: '1. 24"×36" Welcome Sign Studio',
    badge: 'DELIVERABLE 1 OF 5 · INCLUDED IN $14.99 WEDDING PRINT PACK',
    title: '24"×36" Arch D Reception Welcome Sign Studio',
    desc: 'Stop paying $180+ for static Etsy templates or re-typing 150 guest names in Canva at 1 AM. SeatHarmony builds your print-ready 24"×36" poster directly from your live floorplan with 0.125" bleed and crop marks.',
    pills: ['✓ FedEx, Staples & Local Print-Shop Ready', '✓ Alphabetical (A-Z) or By-Table Modes'],
    annotations: [
      {
        num: '1',
        title: '1-Click Sort & Luxury Themes',
        body: 'Switch between Alphabetical (Last Name A-Z) for 150+ guest receptions or Table-by-Table cards in Obsidian Black-Tie, Alabaster Ivory, or Botanical Sage.'
      },
      {
        num: '2',
        title: 'Custom Monogram & Scannable QR Crest',
        body: 'Automatically embeds your couple monogram crest and a live cocktail-hour QR code in the top header so guests can also search from their phones.'
      },
      {
        num: '3',
        title: 'Couples & Families Grouped Naturally',
        body: 'No awkward single-line spreadsheet dumps. Households and plus-ones are formatted with clean serif typography and dotted gold table leaders.'
      }
    ],
    urlText: 'citationforge.io/print/poster/SH-4819?theme=obsidian',
    routeHref: (vId) => `/print/poster/${encodeURIComponent(vId)}?theme=obsidian`,
    ctaText: 'Open Live 24"×36" Poster Studio ↗',
    imgSrc: '/public/showcase-poster-24x36.png',
    imgAlt: 'SeatHarmony 24x36 Arch D Reception Welcome Sign Studio in Obsidian Black-Tie theme',
    pins: [
      { num: '1', text: '1-Click A-Z / By-Table & Theme Switcher', style: 'top: 13%; left: 4%;' },
      { num: '2', text: 'Embedded Cocktail-Hour Seat Map QR', style: 'top: 22%; right: 6%;' },
      { num: '3', text: '300-DPI Arch D Vector Columns (0.125" Bleed)', style: 'bottom: 6%; right: 6%;' }
    ]
  },
  {
    idx: 1,
    tabLabel: '2. Clockwise 12:00 Caterer BEO',
    badge: 'DELIVERABLE 2 OF 5 · BUILT FOR BANQUET CAPTAINS & CHEFS',
    title: 'Clockwise 12:00 Server Meal & Allergy Manifest (BEO)',
    desc: 'Caterers do not read pretty floorplan circles. They need a seat-by-seat Banquet Event Order (BEO) anchored with Seat #1 at 12 O\'Clock (facing the dance floor) so servers set every Filet, Halibut, and allergy plate in front of the right guest without asking.',
    pills: ['✓ Seat #1 = 12:00 Dance-Floor Anchor', '✓ Red Kitchen Anaphylaxis & Wheelchair Alerts'],
    annotations: [
      {
        num: '1',
        title: 'Seat #1 = 12:00 Clockwise Numbering',
        body: 'Every round and rectangular table is indexed clockwise from 12 O\'Clock facing the dance floor or stage, matching hotel and estate banquet standards.'
      },
      {
        num: '2',
        title: 'Color-Coded Entrée & Protein Counts',
        body: 'Clearly marks Filet Mignon (◆), Pan-Seared Halibut (●), Vegan Risotto (▲), and Kids Meals (★) with exact table and kitchen prep totals.'
      },
      {
        num: '3',
        title: 'Highlighted Red Allergy & Chair Alerts',
        body: 'Flags Celiac, Nut, Dairy-Free, and Low-Sodium rows in rose-red alongside Wheelchair Space and High-Chair setup instructions for the setup crew.'
      }
    ],
    urlText: 'citationforge.io/print/beo/SH-4819',
    routeHref: (vId) => `/print/beo/${encodeURIComponent(vId)}`,
    ctaText: 'Open Live Caterer BEO Manifest ↗',
    imgSrc: '/public/showcase-signed-beo.png',
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
    badge: 'DELIVERABLE 3 OF 5 · PRE-ALIGNED FOLDED TENT CARDS',
    title: 'Avery 5302 / 5011 Meal-Coded Folded Tent Place Cards',
    desc: 'Skip hand-writing 150 escort cards or fighting Word mail-merge margins. SeatHarmony generates a pre-aligned 2"×3.5" Avery 5302 print sheet with guest-facing calligraphy on the front and upside-down server allergy notes on the back fold.',
    pills: ['✓ Front Guest Crest + Entrée Symbol', '✓ 180° Rotated Server Back-Fold Alert'],
    annotations: [
      {
        num: '1',
        title: '180° Rotated Server Back-Fold',
        body: 'The top half of each tent card is printed upside-down so when folded along the score line, the server standing behind the chair reads the exact meal and allergy alert.'
      },
      {
        num: '2',
        title: 'Discreet Geometric Meal Icons',
        body: 'Prints ◆ Beef, ● Fish, ▲ Vegan, or ★ Kids in the upper corner of the front card so banquet staff spot dietary choices from 6 feet away.'
      },
      {
        num: '3',
        title: 'Exact Table & Clockwise Chair Number',
        body: 'Every card includes your couple monogram, guest name, table name, and exact clockwise Seat # so guests sit in the exact chair your caterer expects.'
      }
    ],
    urlText: 'citationforge.io/print/avery-5302/SH-4819',
    routeHref: (vId) => `/print/avery-5302/${encodeURIComponent(vId)}`,
    ctaText: 'Open Live Avery 5302 Print Sheet ↗',
    imgSrc: '/public/showcase-avery-5302.png',
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
    badge: 'DELIVERABLE 4 OF 5 · ZERO-LINE MOBILE SEAT LOOKUP',
    title: 'Live Cocktail-Hour Mobile Guest QR Seat Finder',
    desc: 'When 180 guests leave the bar at 6:45 PM, a single easel sign creates a 15-minute bottleneck in the foyer. Guests scan your QR code from cocktail napkins or your welcome sign, type two letters of their name, and walk straight to their table.',
    pills: ['✓ No App Download Required (Works on iOS & Android)', '✓ Live Sync for Last-Minute 48-Hour RSVP Changes'],
    annotations: [
      {
        num: '1',
        title: 'Instant Type-Ahead Guest & Family Search',
        body: 'Guests type their first name, last name, or table number and immediately see their Table #, Table Name, and exact Clockwise Seat #.'
      },
      {
        num: '2',
        title: '1-Tap Household & VIP Quick Filters',
        body: 'Includes quick-tap pills for bridal party and family groups so grandparents and guests find their entire household in under 2 seconds.'
      },
      {
        num: '3',
        title: 'Live Cloud Sync After Poster Printing',
        body: 'If an uncle cancels the morning of the wedding after your foam-board sign is already printed, swap his seat in your vault and the QR app updates immediately.'
      }
    ],
    urlText: 'citationforge.io/qr/SH-4819',
    routeHref: (vId) => `/qr/${encodeURIComponent(vId)}`,
    ctaText: 'Test Live Mobile Guest QR App ↗',
    imgSrc: '/public/showcase-mobile-qr.png',
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
    badge: 'DELIVERABLE 5 OF 5 · PERSISTENT CLOUD COMMAND CENTER',
    title: 'Persistent Event Vault & Restricted "Mom Sandbox" Link',
    desc: 'Manage your entire reception from one passwordless command center. Save your progress with your email or Vault Code, share a restricted Tables 1 to 3 link with parents so they cannot touch your friends\' tables, and re-export unlimited times for 30 days.',
    pills: ['✓ Restricted Mom Sandbox (Tables 1-3 Only)', '✓ Unlimited 30-Day Re-Exports Included'],
    annotations: [
      {
        num: '1',
        title: 'Passwordless Vault Code & Email Recovery',
        body: 'Every seat swap auto-saves to your permanent Vault ID (e.g. #SH-4819) so you, your fiancé, and your coordinator can resume from any laptop or tablet.'
      },
      {
        num: '2',
        title: 'All 4 Production Print & BEO Hubs in One Place',
        body: 'One-click launchpad for your 24"×36" Poster Studio, Avery 5302 Tent Cards, Signed Caterer BEO Packet, and Live Guest QR Lookup.'
      },
      {
        num: '3',
        title: '1-Click Restricted Mom Sandbox Link',
        body: 'Copy a safe, permission-locked link that lets parents arrange Tables 1 to 3 while keeping Tables 4+ completely locked against accidental edits.'
      }
    ],
    urlText: 'citationforge.io/vault/SH-4819?unlocked=1',
    routeHref: (vId) => `/vault/${encodeURIComponent(vId)}?unlocked=1`,
    ctaText: 'Open Unlocked Vault Command Center ↗',
    imgSrc: '/public/showcase-vault-command.png',
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
      onclick="window.selectStudioFeatureSlide(${idx})">
      ${escapeHtml(s.tabLabel)}
    </button>
  `).join('');

  const slidesHtml = SHOWCASE_SLIDES.map((s, idx) => {
    const liveHref = s.routeHref(vId || 'SH-4819');
    return `
    <div class="studio-feature-slide${idx === 0 ? ' active' : ''}" data-slide-idx="${idx}">
      <!-- Slide Header -->
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #EFEAE1;">
        <div style="max-width:62ch;">
          <div style="display:inline-flex;align-items:center;gap:6px;font-size:0.82rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#8C2D19;background:#FDF2EE;border:1px solid #F5C2B8;padding:5px 13px;border-radius:999px;margin-bottom:10px;">
            &#128274; ${escapeHtml(s.badge)}
          </div>
          <h3 class="serif-display" style="font-size:clamp(1.75rem, 2.6vw, 2.25rem);color:#181412;line-height:1.15;margin-bottom:8px;">
            ${escapeHtml(s.title)}
          </h3>
          <p style="font-size:1.05rem;color:#44403C;line-height:1.62;max-width:62ch;">
            ${escapeHtml(s.desc)}
          </p>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
          ${s.pills.map(p => `<span class="badge badge-emerald" style="font-size:0.84rem;padding:7px 14px;">${escapeHtml(p)}</span>`).join('')}
        </div>
      </div>

      <!-- 3 Annotated Callout Cards -->
      <div class="studio-showcase-annotation-grid">
        ${s.annotations.map(a => `
          <div class="studio-showcase-annotation-card">
            <span class="studio-showcase-num-badge">${escapeHtml(a.num)}</span>
            <div>
              <div style="font-size:1.06rem;font-weight:800;color:#181412;margin-bottom:5px;line-height:1.3;">${escapeHtml(a.title)}</div>
              <p style="font-size:0.96rem;color:#44403C;line-height:1.58;margin:0;">${escapeHtml(a.body)}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Tall Annotated Live Screenshot Frame -->
      <div class="studio-showcase-device-frame">
        <div class="studio-showcase-browser-bar">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <div class="studio-showcase-dots" aria-hidden="true">
              <span style="background:#EF4444;"></span>
              <span style="background:#F59E0B;"></span>
              <span style="background:#10B981;"></span>
            </div>
            <div class="studio-showcase-url-pill">
              <span style="color:#34D399;">&#128274; https://</span><span>${escapeHtml(s.urlText)}</span>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:0.84rem;color:#D6CFC2;font-weight:700;" class="hide-mobile-text">Actual Live Deliverable View (Vault #${safeVid})</span>
            <a href="${liveHref}" target="_blank" style="background:linear-gradient(135deg,#FDE68A 0%,#C8A96E 100%);color:#181412;padding:7px 15px;border-radius:8px;font-size:0.85rem;font-weight:800;text-decoration:none;box-shadow:0 3px 10px rgba(0,0,0,0.25);">
              ${escapeHtml(s.ctaText)}
            </a>
          </div>
        </div>
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
  <!-- INTERACTIVE 5-SLIDE FEATURE & TOOLING SHOWCASE CAROUSEL -->
  <div id="studio-features-showcase-carousel" style="margin-top:16px;background:#FFFFFF;border:2px solid #C8A96E;border-radius:24px;padding:38px 34px;box-shadow:0 20px 50px rgba(24,20,18,0.08);">
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:18px;margin-bottom:24px;padding-bottom:20px;border-bottom:1.5px solid #EAE2D3;">
      <div>
        <div style="display:inline-flex;align-items:center;gap:8px;background:#FAF3E3;border:1px solid #C8A96E;padding:6px 14px;border-radius:999px;margin-bottom:12px;">
          <span style="font-size:0.82rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#78350F;">&#10022; INSIDE THE $14.99 WEDDING PRINT &amp; CATERER PACK &middot; 5 LIVE TOOLS</span>
        </div>
        <h3 class="serif-display" style="font-size:clamp(1.95rem, 3vw, 2.55rem);color:#181412;line-height:1.12;">
          See the Exact Print &amp; Catering Tools You Unlock
        </h3>
        <p style="font-size:1.08rem;color:#44403C;max-width:62ch;margin-top:8px;line-height:1.6;">
          Click through all 5 production tools below. Every screen is a real, interactive SeatHarmony deliverable generated from your reception floorplan (and you can click <strong>Open Live View &nearr;</strong> on any slide to test it right now).
        </p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;" id="studio-carousel-tabs" role="tablist" aria-label="SeatHarmony Feature Showcase Slides">
        ${tabsHtml}
      </div>
    </div>

    ${slidesHtml}

    <!-- Carousel Footer Navigation & Conversion Bar -->
    <div style="margin-top:24px;padding-top:20px;border-top:1.5px solid #EAE2D3;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <button type="button" onclick="window.stepStudioFeatureSlide(-1)" class="btn btn-secondary" style="padding:10px 18px;font-size:0.90rem;">&larr; Prev Tool</button>
        <span id="studio-carousel-counter" style="font-family:var(--font-mono);font-size:0.95rem;font-weight:800;color:#181412;padding:0 10px;">Tool 1 of 5</span>
        <button type="button" onclick="window.stepStudioFeatureSlide(1)" class="btn btn-secondary" style="padding:10px 18px;font-size:0.90rem;">Next Tool &rarr;</button>
      </div>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <a href="#studio" class="btn btn-secondary" style="padding:11px 20px;font-size:0.92rem;">&#9998; Jump to Interactive Studio &darr;</a>
        <a href="/buy/complete_dossier?target=estate-150&vault=${safeVid}" id="sh-carousel-unlock-cta" class="btn btn-primary" style="padding:12px 24px;font-size:0.95rem;">
          &#128275; Unlock All 5 Print &amp; Caterer Tools ($14.99) &rarr;
        </a>
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
              <span>Manual Excel + Etsy Sign Template:</span>
              <span style="color:#B91C1C;text-decoration:line-through;">6.5 Hrs + $220</span>
            </div>
            <div class="bs-case-math-row">
              <span>SeatHarmony Print &amp; Caterer Pack:</span>
              <span>$14.99 Once</span>
            </div>
            <div class="bs-case-math-row">
              <span>Couples Together &amp; Parent Buffer:</span>
              <span style="color:#047857;">100% Conflict-Free</span>
            </div>
            <div class="bs-case-math-row bs-case-math-total">
              <span>Net Time &amp; Sign Budget Saved:</span>
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
              Sent Mom a restricted link for Tables 1 to 3, locked the Groom&rsquo;s side, and handed the chef a Clockwise 12:00 Meal Sheet (BEO) with 4 allergy flags.
            </p>
          </div>
          <div class="bs-case-math-box">
            <div class="bs-case-math-row">
              <span>Annual Event Seating SaaS Quote:</span>
              <span style="color:#B91C1C;text-decoration:line-through;">$150 / Year</span>
            </div>
            <div class="bs-case-math-row">
              <span>Clockwise Seat #1 (12:00 Anchor):</span>
              <span>16 Round Tables</span>
            </div>
            <div class="bs-case-math-row">
              <span>Red Kitchen Anaphylaxis &amp; ADA Alerts:</span>
              <span style="color:#047857;">4 Allergies Flagged</span>
            </div>
            <div class="bs-case-math-row bs-case-math-total">
              <span>16 tables &times; Clockwise Seat #1:</span>
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
              <span>Single Foyer Easel Bottleneck:</span>
              <span style="color:#B91C1C;text-decoration:line-through;">20-Min Doorway Jam</span>
            </div>
            <div class="bs-case-math-row">
              <span>Cocktail-Hour Mobile QR Lookup:</span>
              <span>3-Sec Name Search</span>
            </div>
            <div class="bs-case-math-row">
              <span>Pre-Aligned Avery 5302 Tent Cards:</span>
              <span style="color:#047857;">300 Cards in 1 Click</span>
            </div>
            <div class="bs-case-math-row bs-case-math-total">
              <span>300 guests &times; 3 sec QR lookup:</span>
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
          What changes in the final 48 hours before your wedding when you replace manual Canva re-typing and spreadsheets with conflict-free seating and print-ready signage.
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
              <li><span class="bs-ba-icon bs-ba-icon-bad">&#10005;</span><div><strong>Plus-Ones Split Up:</strong> Manual drag-and-drop separates couples across tables whenever a last-minute guest drops out.</div></li>
              <li><span class="bs-ba-icon bs-ba-icon-bad">&#10005;</span><div><strong>Divorced-Parent Sightline Clashes:</strong> Unnoticed back-to-back chairs across adjacent tables trigger reception tension.</div></li>
              <li><span class="bs-ba-icon bs-ba-icon-bad">&#10005;</span><div><strong>Canva Re-Typing Nightmare:</strong> Re-aligning 150 alphabetical names by hand at 1:30 AM 48 hours before the wedding.</div></li>
              <li><span class="bs-ba-icon bs-ba-icon-bad">&#10005;</span><div><strong>Confused Banquet Servers:</strong> Waitstaff auctioning off Filet Mignon at the table and missing severe nut allergies.</div></li>
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
              <li><span class="bs-ba-icon bs-ba-icon-good">&#10003;</span><div><strong>1-Click Family Peace:</strong> Places divorced parents or exes on opposite sides of the dance floor with zero sightline friction.</div></li>
              <li><span class="bs-ba-icon bs-ba-icon-good">&#10003;</span><div><strong>6 Luxury 24&Prime;&times;36&Prime; Signs + Avery 5302:</strong> Instant 300-DPI FedEx/Staples PDF with <code>0.125&Prime;</code> bleed and folded place cards.</div></li>
              <li><span class="bs-ba-icon bs-ba-icon-good">&#10003;</span><div><strong>Clockwise 12:00 Caterer Meal Sheet (BEO):</strong> Servers set every plate and allergy dish at the exact chair without asking.</div></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- THE HONEST COMPARISON TABLE (SEPARATED BELOW BEFORE/AFTER FOR SCROLL BREATHING ROOM) -->
      <div class="bs-honest-table-wrap studio-ba-table-wrap">
        <div class="bs-honest-title">The honest comparison (150 Guests &bull; Reception Seating &amp; Print Pack)</div>
        <div style="overflow-x:auto;">
          <table class="bs-honest-table ba-table">
            <thead>
              <tr>
                <th style="width:24%;">What Matters on Wedding Day</th>
                <th class="bs-col-highlight" style="width:28%;">&#10022; SeatHarmony Studio ($14.99 once)</th>
                <th style="width:24%;">Event Seating SaaS ($150+/yr)</th>
                <th style="width:24%;">Excel + Canva By Hand</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Pricing Model</strong></td>
                <td class="bs-col-highlight">$14.99 One-Time (Zero Subscription)</td>
                <td>$39 to $99/mo recurring trap</td>
                <td>Free + $45 Etsy sign template</td>
              </tr>
              <tr>
                <td><strong>Family Peace Seating</strong></td>
                <td class="bs-col-highlight">&#10003; Keeps Couples Together + Separates Exes</td>
                <td>Manual drag-and-drop only</td>
                <td>Manual copy-paste errors</td>
              </tr>
              <tr>
                <td><strong>Caterer Meal Sheet (BEO)</strong></td>
                <td class="bs-col-highlight">&#10003; <code>12:00 = Seat #1</code> + Allergy Alerts</td>
                <td>Generic table list only</td>
                <td>None (servers guess seats)</td>
              </tr>
              <tr>
                <td><strong>24&Prime;&times;36&Prime; Sign &amp; Place Cards</strong></td>
                <td class="bs-col-highlight">&#10003; 6 Welcome Signs + Avery 5302 PDF</td>
                <td>No poster typography</td>
                <td>5+ hours re-typing 150 names</td>
              </tr>
              <tr>
                <td><strong>Parent &ldquo;Mom Sandbox&rdquo; Link</strong></td>
                <td class="bs-col-highlight">&#10003; Locks Tables 4+ (Parents Edit 1-3 Only)</td>
                <td>Full edit access or none</td>
                <td>Broken shared spreadsheet versions</td>
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
        <h2 class="bs-section-h2">What couples, parents &amp; coordinators say <em>Monday morning.</em></h2>
        <p class="bs-section-sub">
          From 48-hour RSVP drop-out rescues to clockwise 12:00 caterer meal sheets and framed 24&Prime;&times;36&Prime; welcome signs.
        </p>
      </div>

      <div class="bs-written-proof-grid studio-reviews-grid">
        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; Verified 48-Hr Drop-Out Rescue</div>
          <p class="bs-quote-body">&ldquo;Three guests dropped out 48 hours before our wedding. We deleted them on the canvas, re-exported our 24&Prime;&times;36&Prime; Arch D PDF in 10 seconds, and sent it straight to FedEx Office without re-typing a single name.&rdquo;</p>
          <div class="bs-quote-author">
            <img src="/public/avatar-couple.jpg" alt="Hannah &amp; Devon R." class="bs-quote-avatar" width="46" height="46" loading="lazy" />
            <div><strong>Hannah &amp; Devon R.</strong><span>165 Guests &bull; Napa Valley, CA</span></div>
          </div>
        </div>

        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; Verified Caterer BEO Manifest</div>
          <p class="bs-quote-body">&ldquo;Our banquet captain literally hugged our coordinator when she handed him the Clockwise 12:00 Meal Sheet with Seat #1 anchored to the dance floor and the two peanut allergies highlighted in red.&rdquo;</p>
          <div class="bs-quote-author">
            <img src="/public/avatar-planner.jpg" alt="Claire M." class="bs-quote-avatar" width="46" height="46" loading="lazy" />
            <div><strong>Claire M.</strong><span>140 Guests &bull; Chicago, IL (Bride)</span></div>
          </div>
        </div>

        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; Father of the Bride</div>
          <p class="bs-quote-body">&ldquo;The Restricted Mom Sandbox link saved our sanity. My wife rearranged our family friends on Tables 1 to 3 at midnight while keeping our daughter&rsquo;s college friends on Tables 4 to 12 completely locked.&rdquo;</p>
          <div class="bs-quote-author">
            <div class="bs-quote-avatar">RT</div>
            <div><strong>Robert T.</strong><span>155 Guests &bull; Boston, MA (Father of the Bride)</span></div>
          </div>
        </div>

        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; Lead Wedding Coordinator</div>
          <p class="bs-quote-body">&ldquo;As a planner, DIY spreadsheets usually terrify me because couples split up plus-ones and forget high chairs. Handing the venue SeatHarmony&rsquo;s Clockwise 12:00 BEO and Avery 5302 tent cards made the whole night effortless.&rdquo;</p>
          <div class="bs-quote-author">
            <div class="bs-quote-avatar">EV</div>
            <div><strong>Elena V.</strong><span>220 Guests &bull; Charleston, SC (Event Coordinator)</span></div>
          </div>
        </div>

        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; 24&Prime;&times;36&Prime; Sign + Cocktail QR</div>
          <p class="bs-quote-body">&ldquo;Everyone photographed our Obsidian &amp; Gold 24&Prime;&times;36&Prime; welcome sign on the brass easel! Even better, half our guests scanned the QR code right from the bar so there was zero doorway line when dinner started.&rdquo;</p>
          <div class="bs-quote-author">
            <div class="bs-quote-avatar">PL</div>
            <div><strong>Priya &amp; Lukas M.</strong><span>175 Guests &bull; Austin, TX (Estate Reception)</span></div>
          </div>
        </div>

        <div class="bs-quote-card studio-review-card">
          <div class="bs-quote-stars">&#9733;&#9733;&#9733;&#9733;&#9733; Divorced-Parent Buffer Solver</div>
          <p class="bs-quote-body">&ldquo;Both sets of parents had strict seating requests and two aunts who couldn&rsquo;t sit near each other. One click placed them on opposite sides of the dance floor while keeping every single couple together.&rdquo;</p>
          <div class="bs-quote-author">
            <div class="bs-quote-avatar">MJ</div>
            <div><strong>Marcus &amp; Jenna K.</strong><span>130 Guests &bull; Seattle, WA (Vineyard Wedding)</span></div>
          </div>
        </div>
      </div>

      ${renderFeatureShowcaseCarousel('SH-4819')}

      <!-- TRANSITION BRIDGE BANNER INTO INTERACTIVE STUDIO -->
      <div id="bs-zone3-anchor" style="margin-top:44px;background:linear-gradient(135deg,#FFFDF9 0%,#F5ECE0 100%);border:2px solid #D8C29D;border-radius:20px;padding:28px 32px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;">
        <div>
          <div style="font-size:0.84rem;font-weight:800;letter-spacing:0.10em;text-transform:uppercase;color:#8C2D19;margin-bottom:6px;">YOUR TURN &bull; THE 5-STEP RECEPTION FLOORPLAN &amp; 24&Prime;&times;36&Prime; SIGN STUDIO</div>
          <div class="serif-display" style="font-size:clamp(1.55rem, 2.4vw, 1.95rem);color:#181412;">Test a 150-guest reception below or paste your own Zola / Knot RSVP list.</div>
        </div>
        <a href="#studio" class="btn btn-primary" style="padding:14px 26px;font-size:0.98rem;">Jump Into Interactive Studio &darr;</a>
      </div>
    </div>
  </section>`;
}

module.exports = {
  SHOWCASE_SLIDES,
  renderFeatureShowcaseCarousel,
  renderZone4ProofStackAndPricing
};

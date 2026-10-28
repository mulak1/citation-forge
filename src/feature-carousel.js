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
          <div style="display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#8C2D19;background:#FDF2EE;border:1px solid #F5C2B8;padding:4px 12px;border-radius:999px;margin-bottom:10px;">
            &#128274; ${escapeHtml(s.badge)}
          </div>
          <h3 class="serif-display" style="font-size:clamp(1.65rem, 2.5vw, 2.15rem);color:#181412;line-height:1.15;margin-bottom:8px;">
            ${escapeHtml(s.title)}
          </h3>
          <p style="font-size:1.02rem;color:#44403C;line-height:1.6;max-width:60ch;">
            ${escapeHtml(s.desc)}
          </p>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
          ${s.pills.map(p => `<span class="badge badge-emerald" style="font-size:0.80rem;padding:6px 13px;">${escapeHtml(p)}</span>`).join('')}
        </div>
      </div>

      <!-- 3 Annotated Callout Cards -->
      <div class="studio-showcase-annotation-grid">
        ${s.annotations.map(a => `
          <div class="studio-showcase-annotation-card">
            <span class="studio-showcase-num-badge">${escapeHtml(a.num)}</span>
            <div>
              <div style="font-size:1.02rem;font-weight:800;color:#181412;margin-bottom:4px;line-height:1.3;">${escapeHtml(a.title)}</div>
              <p style="font-size:0.92rem;color:#57534E;line-height:1.55;margin:0;">${escapeHtml(a.body)}</p>
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
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:0.76rem;color:#D6CFC2;font-weight:700;" class="hide-mobile-text">Actual Live Deliverable View (Vault #${safeVid})</span>
            <a href="${liveHref}" target="_blank" style="background:linear-gradient(135deg,#FDE68A 0%,#C8A96E 100%);color:#181412;padding:6px 14px;border-radius:8px;font-size:0.80rem;font-weight:800;text-decoration:none;box-shadow:0 3px 10px rgba(0,0,0,0.25);">
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
  <div id="studio-features-showcase-carousel" style="margin-top:48px;background:#FFFFFF;border:2px solid #C8A96E;border-radius:24px;padding:34px 30px;box-shadow:0 20px 50px rgba(24,20,18,0.08);">
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:18px;margin-bottom:22px;padding-bottom:18px;border-bottom:1.5px solid #EAE2D3;">
      <div>
        <div style="display:inline-flex;align-items:center;gap:8px;background:#FAF3E3;border:1px solid #C8A96E;padding:5px 13px;border-radius:999px;margin-bottom:10px;">
          <span style="font-size:0.78rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#78350F;">&#10022; INSIDE THE $14.99 WEDDING PRINT &amp; CATERER PACK &middot; 5 LIVE TOOLS</span>
        </div>
        <h3 class="serif-display" style="font-size:clamp(1.85rem, 3vw, 2.45rem);color:#181412;line-height:1.12;">
          See the Exact Print &amp; Catering Tools You Unlock
        </h3>
        <p style="font-size:1.05rem;color:#57534E;max-width:60ch;margin-top:6px;line-height:1.55;">
          Click through all 5 production tools below. Every screen is a real, interactive SeatHarmony deliverable generated from your reception floorplan (and you can click <strong>Open Live Demo &nearr;</strong> on any slide to test it right now).
        </p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;" id="studio-carousel-tabs" role="tablist" aria-label="SeatHarmony Feature Showcase Slides">
        ${tabsHtml}
      </div>
    </div>

    ${slidesHtml}

    <!-- Carousel Footer Navigation & Conversion Bar -->
    <div style="margin-top:22px;padding-top:18px;border-top:1.5px solid #EAE2D3;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <button type="button" onclick="window.stepStudioFeatureSlide(-1)" class="btn btn-secondary" style="padding:9px 16px;font-size:0.88rem;">&larr; Prev Tool</button>
        <span id="studio-carousel-counter" style="font-family:var(--font-mono);font-size:0.92rem;font-weight:800;color:#181412;padding:0 8px;">Tool 1 of 5</span>
        <button type="button" onclick="window.stepStudioFeatureSlide(1)" class="btn btn-secondary" style="padding:9px 16px;font-size:0.88rem;">Next Tool &rarr;</button>
      </div>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <a href="#studio" class="btn btn-secondary" style="padding:10px 18px;font-size:0.90rem;">&#9998; Try Free Floorplan Studio Above &uarr;</a>
        <a href="/buy/complete_dossier?target=estate-150&vault=${safeVid}" id="sh-carousel-unlock-cta" class="btn btn-primary" style="padding:11px 22px;font-size:0.94rem;">
          &#128275; Unlock All 5 Print &amp; Caterer Tools ($14.99) &rarr;
        </a>
      </div>
    </div>
  </div>`;
}

module.exports = {
  SHOWCASE_SLIDES,
  renderFeatureShowcaseCarousel
};

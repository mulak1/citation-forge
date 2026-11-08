/**
 * SeatHarmony (#2) - 6-Zone High-Conviction Landing Page (ExactBaseline Sunlit Champagne Architecture)
 */
const { escapeHtml, renderHead, renderNavbar, renderFooter, renderInteractiveScript } = require('./templates');
const { renderZone4ProofStackAndPricing } = require('./feature-carousel');
const { renderSetupWizardHtml, renderBinderDockHtml } = require('./setup-wizard');
const { renderDirectoryPage, buildVenueBlueprint, renderFloorplanSvg } = require('./directory-view');

const IC = {
  lock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  unlock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
  users: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  bolt: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  gear: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  clock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  print: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  save: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`
};

function renderZone1Hero(plan) {
  return `
  <!-- ZONE 1: COMPACT ABOVE-THE-FOLD HERO (DIRECT TO LIVE FLOORPLAN STUDIO) -->
  <section class="studio-zone1-hero" id="grader" style="padding:10px 0 6px !important;">
    <div class="container">
      <div style="max-width:1280px;margin:0 auto;display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <h1 id="score-brand-title" class="sh-display-h1" style="font-size:clamp(1.22rem, 1.95vw, 1.58rem);line-height:1.2;margin:0;">The Reception Seating Studio. <span class="sh-h1-accent">Solved in 60 Seconds, Drama-Free.</span></h1>
        <p class="sh-lead-sub sh-hide-mobile-toolbar" style="font-size:0.84rem;line-height:1.3;margin:0;color:#6B7280;">Seat households together, export clockwise caterer meal sheets, and print 24&Prime;&times;36&Prime; welcome signs.</p>
      </div>
    </div>
  </section>`;
}

function renderZone2Walkthrough(plan = {}) {
  const vId = escapeHtml(plan.vaultId || 'SH-4819');
  return `
  <!-- ZONE 2: "HOW IT WORKS" - 4-STEP SKIMMER WALKTHROUGH + SHOWCASE STAGE -->
  <section class="studio-zone-section" id="studio-zone2-how-it-works" style="padding:24px 0;">
    <div class="container">
      <div class="bs-section-header" style="margin-bottom:12px;">
        <div class="bs-section-eyebrow">HOW SEATHARMONY WORKS</div>
        <h2 class="bs-section-h2" style="margin-bottom:4px;">From RSVP list to print-ready reception <em>in four steps.</em></h2>
        <p class="bs-section-sub">Replace late-night spreadsheet guesswork with conflict-free household seating, clockwise caterer meal sheets, and print-ready signage.</p>
      </div>
      <div class="studio-how-grid" style="margin-top:12px;gap:12px;">
        <div class="studio-how-card" style="padding:14px;gap:6px;cursor:pointer;" onclick="window.scrollToShCard(2)">
          <div style="display:flex;align-items:center;justify-content:space-between;"><span class="studio-how-num" style="width:30px;height:30px;font-size:0.82rem;">01</span><span class="mono" style="font-size:0.72rem;font-weight:700;color:#1B4D3E;background:#EBF4F0;padding:3px 8px;border-radius:999px;white-space:nowrap;">15-Sec Import</span></div>
          <h3 style="font-size:1.02rem;font-weight:700;color:#1C1C1C;margin:0;line-height:1.25;">1. Paste Guest List</h3>
          <p style="font-size:0.82rem;color:#4B5563;line-height:1.4;margin:0;">Zola, The Knot, or Excel.</p>
        </div>
        <div class="studio-how-card" style="padding:14px;gap:6px;cursor:pointer;" onclick="window.scrollToShCard(3)">
          <div style="display:flex;align-items:center;justify-content:space-between;"><span class="studio-how-num" style="width:30px;height:30px;font-size:0.82rem;">02</span><span class="mono" style="font-size:0.72rem;font-weight:700;color:#1B4D3E;background:#EBF4F0;padding:3px 8px;border-radius:999px;white-space:nowrap;">1-Click Peace</span></div>
          <h3 style="font-size:1.02rem;font-weight:700;color:#1C1C1C;margin:0;line-height:1.25;">2. Keep Family Peace</h3>
          <p style="font-size:0.82rem;color:#4B5563;line-height:1.4;margin:0;">Divorced parents separated.</p>
        </div>
        <div class="studio-how-card" style="padding:14px;gap:6px;cursor:pointer;" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}document.getElementById('studio-bespoke-artifact-stage').scrollIntoView({behavior:'smooth'});">
          <div style="display:flex;align-items:center;justify-content:space-between;"><span class="studio-how-num" style="width:30px;height:30px;font-size:0.82rem;">03</span><span class="mono" style="font-size:0.72rem;font-weight:700;color:#1B4D3E;background:#EBF4F0;padding:3px 8px;border-radius:999px;white-space:nowrap;">12:00 = Seat #1</span></div>
          <h3 style="font-size:1.02rem;font-weight:700;color:#1C1C1C;margin:0;line-height:1.25;">3. Caterer Meal Sheet</h3>
          <p style="font-size:0.82rem;color:#4B5563;line-height:1.4;margin:0;">Clockwise 12:00 Seat #1.</p>
        </div>
        <div class="studio-how-card" style="padding:14px;gap:6px;cursor:pointer;" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}document.getElementById('studio-bespoke-artifact-stage').scrollIntoView({behavior:'smooth'});">
          <div style="display:flex;align-items:center;justify-content:space-between;"><span class="studio-how-num" style="width:30px;height:30px;font-size:0.82rem;">04</span><span class="mono" style="font-size:0.72rem;font-weight:700;color:#1B4D3E;background:#EBF4F0;padding:3px 8px;border-radius:999px;white-space:nowrap;">Arch D Ready</span></div>
          <h3 style="font-size:1.02rem;font-weight:700;color:#1C1C1C;margin:0;line-height:1.25;">4. Print Sign &amp; Cards</h3>
          <p style="font-size:0.82rem;color:#4B5563;line-height:1.4;margin:0;">24&Prime;&times;36&Prime; sign &amp; place cards.</p>
        </div>
      </div>

      <!-- CURATED REAL-VENUE RECEPTION SHOWCASE -->
      <div class="sh-vsl-player-shell" id="studio-editorial-vsl-stage" style="max-width:960px;margin:20px auto 0;">
        <div style="text-align:center;margin-bottom:8px;">
          <span style="font-size:0.70rem;font-weight:800;color:#1B4D3E;letter-spacing:0.08em;text-transform:uppercase;background:#EBF4F0;padding:2px 10px;border-radius:999px;border:1px solid #C4DFD5;">REAL VENUE RECEPTION GALLERY</span>
          <h3 class="serif-display" style="font-size:1.25rem;margin:4px 0 2px;color:#1F1B18;">Real Receptions Solved &amp; Printed with SeatHarmony</h3>
        </div>

        <!-- Venue Selector Tabs -->
        <div style="display:flex;gap:6px;overflow-x:auto;padding:4px 2px 10px;-webkit-overflow-scrolling:touch;scrollbar-width:none;justify-content:flex-start;max-width:100%;">
          <button type="button" class="studio-tap-chip active" id="sh-showcase-tab-0" onclick="window.shSelectShowcaseVenue(0)" style="padding:6px 12px;font-size:0.78rem;font-weight:700;white-space:nowrap;flex-shrink:0;">🌿 Rosewood Estate</button>
          <button type="button" class="studio-tap-chip" id="sh-showcase-tab-1" onclick="window.shSelectShowcaseVenue(1)" style="padding:6px 12px;font-size:0.78rem;font-weight:700;white-space:nowrap;flex-shrink:0;">🌊 Yacht &amp; Beach Club</button>
          <button type="button" class="studio-tap-chip" id="sh-showcase-tab-2" onclick="window.shSelectShowcaseVenue(2)" style="padding:6px 12px;font-size:0.78rem;font-weight:700;white-space:nowrap;flex-shrink:0;">⛺ Sailcloth Tent</button>
          <button type="button" class="studio-tap-chip" id="sh-showcase-tab-3" onclick="window.shSelectShowcaseVenue(3)" style="padding:6px 12px;font-size:0.78rem;font-weight:700;white-space:nowrap;flex-shrink:0;">🏛️ Grand Ballroom</button>
          <button type="button" class="studio-tap-chip" id="sh-showcase-tab-4" onclick="window.shSelectShowcaseVenue(4)" style="padding:6px 12px;font-size:0.78rem;font-weight:700;white-space:nowrap;flex-shrink:0;">🍇 Tuscan Courtyard</button>
          <button type="button" class="studio-tap-chip" id="sh-showcase-tab-5" onclick="window.shSelectShowcaseVenue(5)" style="padding:6px 12px;font-size:0.78rem;font-weight:700;white-space:nowrap;flex-shrink:0;">🪴 Botanical Orangery</button>
        </div>

        <!-- Split Showcase Card -->
        <div class="sh-zola-showcase-card" style="padding:16px;border-radius:18px;background:#FFFFFF;border:1.5px solid #E4DCD0;box-shadow:0 8px 30px -10px rgba(31,27,24,0.08);">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;align-items:center;">
            <!-- Left: Venue Photograph -->
            <div style="position:relative;border-radius:14px;overflow:hidden;background:#F5EFE6;aspect-ratio:16/10;box-shadow:0 4px 14px -4px rgba(0,0,0,0.12);">
              <img id="sh-showcase-photo" src="/public/venue-rosewood-estate.jpg" alt="Private Country Estate &amp; Glass Conservatory" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy" />
              <div style="position:absolute;top:10px;left:10px;background:rgba(27,77,62,0.92);color:#FFFFFF;padding:4px 10px;border-radius:999px;font-size:0.70rem;font-weight:700;backdrop-filter:blur(4px);" id="sh-showcase-venue-badge">
                Estate Reception &middot; 150 Guests
              </div>
              <div style="position:absolute;bottom:10px;left:10px;right:10px;background:rgba(24,20,18,0.85);color:#FFFFFF;padding:6px 10px;border-radius:8px;font-size:0.72rem;backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px;" id="sh-showcase-venue-specs">
                <span>&#10003; 18 Round Tables + Sweetheart &middot; 54&Prime; Server Aisles &middot; 24&Prime;&times;36&Prime; Sign</span>
              </div>
            </div>

            <!-- Right: Real Physical Deliverables & Action -->
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
                <div>
                  <h4 id="sh-showcase-couple-headline" class="serif-display" style="font-size:1.15rem;margin:0;color:#181412;">Maya &amp; Liam&rsquo;s 150-Guest Estate Reception</h4>
                  <div id="sh-showcase-proof-sub" style="font-size:0.78rem;color:#57534E;margin-top:2px;">3 Family Conflicts Auto-Solved &middot; 4 Allergy Alerts &middot; Clockwise 12:00 Caterer Sheet</div>
                </div>
                <span id="sh-showcase-savings-badge" style="font-size:0.72rem;font-weight:700;color:#1B4D3E;background:#EBF4F0;border:1px solid #C4DFD5;padding:3px 9px;border-radius:999px;white-space:nowrap;">
                  Saved 6.5 Hrs + $220 vs. Excel &amp; Etsy
                </span>
              </div>

              <!-- Tangible Prints Micro-Preview -->
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;padding:10px;background:#FAF8F5;border:1px solid #EAE0D0;border-radius:10px;">
                <div style="display:flex;align-items:center;gap:8px;">
                  <img src="/public/ugc-welcome-sign-easel.jpg" alt="24x36 sign preview" style="width:42px;height:42px;border-radius:6px;object-fit:cover;border:1px solid #D6CBB8;" loading="lazy" />
                  <div style="font-size:0.72rem;line-height:1.25;"><strong style="color:#181412;">24&Prime;&times;36&Prime; Sign</strong><br/><span style="color:#78716C;">FedEx-Ready PDF</span></div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <img src="/public/ugc-escort-cards-wax.jpg" alt="Avery cards preview" style="width:42px;height:42px;border-radius:6px;object-fit:cover;border:1px solid #D6CBB8;" loading="lazy" />
                  <div style="font-size:0.72rem;line-height:1.25;"><strong style="color:#181412;">Avery 5302</strong><br/><span style="color:#78716C;">Table 1 Unmasked</span></div>
                </div>
              </div>

              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding-top:4px;">
                <span style="font-size:0.74rem;color:#065F46;font-weight:700;">&#10003; 0 Family Drama &bull; Clockwise 12:00 Meal Tally</span>
                <button type="button" id="sh-showcase-load-btn" onclick="window.shLoadShowcaseIntoStudio && window.shLoadShowcaseIntoStudio()" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 16px;border-radius:999px;background:#1B4D3E;color:#FFFFFF;font-weight:700;font-size:0.80rem;border:1px solid #1B4D3E;cursor:pointer;white-space:nowrap;box-shadow:0 2px 8px rgba(27, 77, 62,0.18);">
                  <span>Load 🌿 Rosewood Estate in Studio &uarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script>
      (function(){
        window.__SH_SHOWCASE_VENUES = [
          {
            id: 'estate-150',
            name: 'Private Country Estate & Glass Conservatory',
            tag: 'Estate Reception · 150 Guests',
            short: '🌿 Rosewood Estate',
            img: '/public/venue-rosewood-estate.jpg',
            couple: 'Maya & Liam’s 150-Guest Estate Reception',
            specs: '18 Round Tables + Sweetheart · 54″ Server Aisles · 24″×36″ Sign',
            saved: 'Saved 6.5 Hrs + $220 vs. Excel & Etsy',
            proofSub: '3 Family Conflicts Auto-Solved · 4 Allergy Alerts · Clockwise 12:00 Caterer Sheet'
          },
          {
            id: '110-guest-coastal-beach-club-seating-chart',
            name: 'Coastal Yacht & Beach Club Ocean Terrace',
            tag: 'Waterfront Terrace · 110 Guests',
            short: '🌊 Yacht & Beach Club',
            img: '/public/venue-coastal-beach-club.jpg',
            couple: 'Sienna & Julian’s Beach Club Reception',
            specs: '11 Banquet & Round Tables · Oceanfront Sightlines · 3-Column Sign',
            saved: 'Saved 5.0 Hrs · 0 Spacing Bottlenecks',
            proofSub: 'Coastal Breeze Buffer · Equidistant VIP Views · Clockwise Meal Tally'
          },
          {
            id: '130-guest-sailcloth-tent-wedding-seating-chart',
            name: 'High-Peak Sailcloth Tent & Meadow Lawn',
            tag: 'Sailcloth Pavilion · 130 Guests',
            short: '⛺ Sailcloth Tent',
            img: '/public/venue-sailcloth-tent.jpg',
            couple: 'Chloe & Noah’s Meadow Sailcloth Reception',
            specs: '16 Tables · 24ft Perimeter Clearances · Guy-Wire Safe Aisles',
            saved: 'Saved 7.0 Hrs · 100% Tent Pole Safe',
            proofSub: 'Pole Obstruction Clearance · Divorced Table Separation · 24″×36″ Arch D Sign'
          },
          {
            id: '200-guest-hotel-ballroom-seating-chart-template',
            name: 'Grand Ballroom & Crystal Chandelier Banquet Hall',
            tag: 'Gilded Ballroom · 200 Guests',
            short: '🏛️ Grand Ballroom',
            img: '/public/venue-grand-ballroom.jpg',
            couple: 'Sophia & Alexander’s Ballroom Gala',
            specs: '20 72″ Rounds · 60″ Wide Server Lanes · 5-Column 16pt Sign',
            saved: 'Saved 8.5 Hrs · 0 Meal Mix-Ups',
            proofSub: 'Split Wing Seating · 30ft DJ Buffer for Grandparents · Clockwise Server Map'
          },
          {
            id: 'tuscan-banquet-80',
            name: 'Tuscan Villa Olive Grove & Courtyard',
            tag: 'Courtyard Banquet · 80 Guests',
            short: '🍇 Tuscan Courtyard',
            img: '/public/venue-tuscan-courtyard.jpg',
            couple: 'Elena & Matteo’s Tuscan Courtyard Feast',
            specs: '6 Long Feasting Banquets · Rustic Stone Sightlines · 3-Column Sign',
            saved: 'Saved 4.5 Hrs · 100% Connected Families',
            proofSub: 'Family-Style Feasting Tables · Celiac Safe Tally · Avery 5302 Place Cards'
          },
          {
            id: '90-guest-greenhouse-conservatory-seating-chart',
            name: 'Glass Greenhouse & Botanical Orangery',
            tag: 'Glass Orangery · 90 Guests',
            short: '🪴 Botanical Orangery',
            img: '/public/venue-botanical-conservatory.jpg',
            couple: 'Gemma & Oliver’s Orangery Reception',
            specs: '9 Intimate Rounds · Lush Palm & Glass Corridor Clearances',
            saved: 'Saved 4.0 Hrs · 0 Blind Spots',
            proofSub: 'Acoustic Glass Zone Separation · Clockwise 12:00 Server Manifest'
          }
        ];
        window.__SH_ACTIVE_SHOWCASE_IDX = 0;
        window.shSelectShowcaseVenue = function(idx) {
          var v = window.__SH_SHOWCASE_VENUES[idx];
          if (!v) return;
          window.__SH_ACTIVE_SHOWCASE_IDX = idx;
          document.querySelectorAll('[id^="sh-showcase-tab-"]').forEach(function(el, i) {
            el.classList.toggle('active', i === idx);
          });
          var img = document.getElementById('sh-showcase-photo'); if (img) { img.src = v.img; img.alt = v.name; }
          var badge = document.getElementById('sh-showcase-venue-badge'); if (badge) badge.textContent = v.tag;
          var specs = document.getElementById('sh-showcase-venue-specs'); if (specs) specs.innerHTML = '<span>&#10003; ' + v.specs + '</span>';
          var h = document.getElementById('sh-showcase-couple-headline'); if (h) h.textContent = v.couple;
          var sub = document.getElementById('sh-showcase-proof-sub'); if (sub) sub.textContent = v.proofSub;
          var sav = document.getElementById('sh-showcase-savings-badge'); if (sav) sav.textContent = v.saved;
          var btn = document.getElementById('sh-showcase-load-btn'); if (btn) btn.innerHTML = '<span>Load ' + v.short + ' in Studio &uarr;</span>';
        };
        window.shLoadShowcaseIntoStudio = function() {
          var v = window.__SH_SHOWCASE_VENUES[window.__SH_ACTIVE_SHOWCASE_IDX || 0];
          if (!v) return;
          if (window.loadPresetScenario) window.loadPresetScenario(v.id);
          var st = document.getElementById('studio'); if (st) st.scrollIntoView({ behavior: 'smooth' });
        };
      })();
      </script>
    </div>
  </section>`;
}

function renderZone3InteractiveStudio(plan) {
  const vId = escapeHtml(plan.vaultId || 'SH-4819');
  const activeRules = plan.rules || plan.conflictRules || [];
  const rulesHtml = activeRules.map((r, rIdx) => `
    <div style="padding:10px 12px;border-radius:10px;background:#FAF8F5;border:1px solid #E2D9C8;font-size:0.84rem;display:flex;flex-direction:column;align-items:flex-start;gap:5px;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;width:100%;">
        <div style="font-weight:800;color:#181412;line-height:1.35;flex:1;">${(r.type === 'keep_apart' || r.type === 'must_keep_apart') ? '&#9670; ' : (r.type === 'zone_quiet' ? '&#9679; ' : '&#10003; ')}${escapeHtml(r.label)}</div>
        <button type="button" title="Delete Rule" onclick="window.shRemoveRule(${rIdx},event)" style="cursor:pointer;border:1px solid #FECDD3;background:#FFF1F2;color:#9F1239;font-size:0.78rem;font-weight:800;padding:1px 6px;border-radius:5px;flex-shrink:0;">✕</button>
      </div>
      <div style="font-size:0.82rem;color:#57534E;line-height:1.42;width:100%;">${escapeHtml(r.detail)}</div>
      <button type="button" title="Click to cycle rule type" onclick="window.shCycleRuleType(${rIdx},event)" class="badge badge-emerald" style="cursor:pointer;border:1px solid #A7F3D0;font-size:0.82rem;padding:3px 9px;align-self:flex-start;">&#10003; ${escapeHtml(r.status)} &middot; Cycle Type</button>
    </div>`).join('');

  return `
  <!-- ZONE 3: SCROLL-PACED 5-CARD BUILDER + STICKY LIVE STAGE (FOLD 1) -->
  <section class="studio-zone-section" id="studio" style="scroll-margin-top:58px;padding-top:6px !important;padding-bottom:28px;">
    <div class="container">
      <span id="sh-studio-vault-code" style="display:none;">${vId}</span>
      <div style="display:none;"><span id="sh-endowed-progress-label">Setup</span><span id="sh-endowed-progress-fill"></span><span id="sh-btn-vault-id">${vId}</span></div>

      <div id="sh-studio-quick-preset-bar" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:10px;padding:4px 0;">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <span style="font-size:12px;font-weight:700;color:#78716C;">Presets:</span>
          <button type="button" class="studio-tap-chip preset-chip active" data-preset="estate-150" data-domain="supabase.com" onclick="window.loadPresetScenario('estate-150', this)" style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;font-size:12px;white-space:nowrap;">🌿 150-Guest Estate</button>
          <button type="button" class="studio-tap-chip" data-instant-preset="110-guest-coastal-beach-club-seating-chart" onclick="window.loadPresetScenario('110-guest-coastal-beach-club-seating-chart', this)" style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;font-size:12px;white-space:nowrap;">🌊 110-Guest Beach Club</button>
          <button type="button" class="studio-tap-chip" data-instant-preset="tuscan-banquet-80" onclick="window.loadPresetScenario('tuscan-banquet-80', this)" style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;font-size:12px;white-space:nowrap;">🍇 80-Guest Tuscan</button>
          <button type="button" class="studio-tap-chip" data-instant-preset="200-guest-hotel-ballroom-seating-chart-template" onclick="window.loadPresetScenario('200-guest-hotel-ballroom-seating-chart-template', this)" style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;font-size:12px;white-space:nowrap;">🏛️ 200-Guest Ballroom</button>
          <button type="button" id="sh-conflict-solver-pill" class="studio-tap-chip" onclick="window.shRunConflictSolverDemo && window.shRunConflictSolverDemo(this)" style="padding:4px 10px;font-size:12px;font-weight:700;color:#065F46;background:#ECFDF5;border:1px solid #10B981;white-space:nowrap;">${IC.bolt}Auto-Solve Conflicts</button>
        </div>
        <button type="button" class="sh-ed-ghost" onclick="window.shOpenSetupWizard(1)" style="font-size:12px;padding:4px 10px;font-weight:600;color:#57534E;border-color:#D1D5DB;background:#FFFFFF;white-space:nowrap;">${IC.gear}Guided Wizard</button>
      </div>

      ${renderSetupWizardHtml(plan)}
      ${renderBinderDockHtml()}

      <!-- Hidden legacy inputs used by the import/seat engine -->
      <div style="display:none;" aria-hidden="true">
        <input id="sh-couple-title-input" type="text" value="${escapeHtml(plan.title || "Maya & Liam's Estate Reception")}" />
        <input id="sh-venue-name-input" type="text" value="${escapeHtml(plan.venueName || 'Rosewood Conservatory')}" />
        <input id="sh-crest-logo-input" type="hidden" value="" />
        <input id="domain-input" type="text" value="" />
        <select id="sh-target-table-select"><option value="auto">Auto</option></select>
        <div id="sh-bulk-csv-drawer"><textarea id="sh-bulk-csv-textarea"></textarea></div>
        <div id="sh-rules-list">${rulesHtml}</div>
        <input id="sh-custom-rule-input" type="text" value="" /><select id="sh-custom-rule-type"><option value="must_keep_apart">Keep Apart</option></select>
      </div>

      <div class="studio-scroll-builder-grid full-stage" id="sh-builder-grid" style="display:grid;">
        <!-- LEFT COLUMN: Fine-tune & Print (shown after the setup wizard) -->
        <div class="studio-hybrid-wizard" id="sh-csv-parse-preview">

          <!-- STEP 4 OF 4: Fine-Tune & Export (Unlocks Full Table/Seat Micro-Editing + Sign Studio) -->
          <div class="studio-wizard-step active" id="sh-wizard-step-4" data-step="4">
            <div class="studio-wizard-header">
              <span class="studio-wizard-step-title">Fine-tune &amp; print</span>
              <button type="button" class="studio-tap-chip" style="padding:4px 10px;font-size:0.80rem;" onclick="window.shOpenSetupWizard()">&larr; Edit setup</button>
              <span id="sh-wizard-summary-4" style="display:none;"></span>
            </div>
            <div class="studio-wizard-body">
              <div style="margin-bottom:8px;">
                <span class="studio-field-label">Select Table to Edit</span>
                <div class="studio-chip-group" id="sh-card4-table-pills">
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(0)">Tbl 1</button>
                  <button type="button" class="studio-tap-chip active" onclick="window.shSelectTable(1)">Tbl 2</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(2)">Tbl 3</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(3)">Tbl 4</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(4)">Tbl 5</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(5)">Tbl 6</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(6)">Tbl 7</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(7)">Tbl 8</button>
                </div>
              </div>
              <div style="margin-bottom:10px;">
                <span class="studio-field-label">Table Shape &amp; View</span>
                <div class="studio-chip-group" id="sh-card4-shape-pills" style="margin-bottom:6px;">
                  <button type="button" class="studio-tap-chip active" data-shape="round" onclick="window.shMorphSelectedTable('round')">&#9679; Round</button>
                  <button type="button" class="studio-tap-chip" data-shape="banquet_2sided" onclick="window.shMorphSelectedTable('banquet_2sided')">&#9644; Banquet</button>
                  <button type="button" class="studio-tap-chip" data-shape="sweetheart" onclick="window.shMorphSelectedTable('sweetheart')">&#9670; Sweetheart</button>
                  <button type="button" class="studio-tap-chip" data-shape="kings_4sided" onclick="window.shMorphSelectedTable('kings_4sided')">&#8862; King&rsquo;s</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shRotateSelectedTable()">&#8635; 45&deg;</button>
                  <button id="sh-lock-table-btn" type="button" class="studio-tap-chip" onclick="window.shToggleLockSelectedTable()">${IC.lock}Lock</button>
                </div>
                <div style="display:flex;gap:5px;flex-wrap:wrap;">
                  <button id="sh-ring-harmony" type="button" class="studio-tap-chip active" onclick="window.shSetRingMode('harmony')">Family &amp; Groups View</button>
                  <button id="sh-ring-meal" type="button" class="studio-tap-chip" onclick="window.shSetRingMode('meal')">Meal View</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shGateOrExportBeoCsv ? window.shGateOrExportBeoCsv('share') : window.shCopyMomSandboxLink()">Copy Family Link</button>
                </div>
              </div>
              <div style="padding-top:8px;border-top:1px solid #EFEAE1;margin-bottom:8px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <span class="studio-field-label" style="margin-bottom:0;">24&Prime;&times;36&Prime; Sign Theme</span>
                  <span class="studio-wizard-step-summary" id="sh-wizard-summary-5" style="font-size:0.74rem;">Gold A-Z</span>
                </div>
                <div class="studio-chip-group" id="sh-card5-theme-pills" style="margin-bottom:8px;">
                  <button type="button" class="studio-tap-chip active" data-theme="alabaster" onclick="window.shSetActiveTab('poster');window.shSetPosterMode(null,'alabaster')">Parisian Gold</button>
                  <button type="button" class="studio-tap-chip" data-theme="ivory" onclick="window.shSetActiveTab('poster');window.shSetPosterMode(null,'ivory')">Botanical Ivory</button>
                  <button type="button" class="studio-tap-chip" data-theme="obsidian" onclick="window.shSetActiveTab('poster');window.shSetPosterMode(null,'obsidian')">Editorial Noir</button>
                  <button type="button" class="studio-tap-chip" data-theme="sage" onclick="window.shSetActiveTab('poster');window.shSetPosterMode(null,'sage')">Tuscan Sage</button>
                  <button type="button" class="studio-tap-chip" data-theme="rosewater" onclick="window.shSetActiveTab('poster');window.shSetPosterMode(null,'rosewater')">Rosewater</button>
                  <button type="button" class="studio-tap-chip" data-theme="terracotta" onclick="window.shSetActiveTab('poster');window.shSetPosterMode(null,'terracotta')">Terracotta</button>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
                  <div>
                    <label for="sh-sign-kicker-input" class="studio-field-label">Heading</label>
                    <select id="sh-sign-kicker-input" class="grader-input" style="padding:5px 7px;font-size:0.80rem;" onchange="window.shUpdateSignKicker(this.value)">
                      <option value="Please Find Your Seat">Please Find Your Seat</option>
                      <option value="Welcome to Our Reception">Welcome to Our Reception</option>
                      <option value="Dinner &amp; Dancing">Dinner &amp; Dancing</option>
                      <option value="Find Your Table">Find Your Table</option>
                    </select>
                  </div>
                  <div>
                    <label for="sh-sign-monogram-input" class="studio-field-label">Monogram</label>
                    <input id="sh-sign-monogram-input" type="text" class="grader-input" style="padding:5px 7px;font-size:0.80rem;" value="M&amp;L &middot; EST. 2026" oninput="window.shUpdateSignMonogram(this.value)" />
                  </div>
                </div>
                <div class="studio-chip-group" id="sh-card5-sort-pills">
                  <button type="button" class="studio-tap-chip active" data-sort="alphabetical" onclick="window.shSetActiveTab('poster');window.shSetPosterMode('alphabetical',null)">Sort A-Z</button>
                  <button type="button" class="studio-tap-chip" data-sort="by_table" onclick="window.shSetActiveTab('poster');window.shSetPosterMode('by_table',null)">By Table</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shGateOrExportBeoCsv ? window.shGateOrExportBeoCsv('csv') : window.shExportBeoCsv()">&darr; Meal Sheet .CSV</button>
                  <a id="sh-card5-poster-studio-link" href="/print/poster/${vId}" target="_blank" class="studio-tap-chip" style="text-decoration:none;font-weight:800;color:#78350F;border-color:#C8A96E;">Sign PDF &rarr;</a>
                  <a id="sh-card5-avery-studio-link" href="/print/avery-5302/${vId}" target="_blank" class="studio-tap-chip" style="text-decoration:none;font-weight:800;color:#065F46;border-color:#10B981;">Avery 5302 &rarr;</a>
                </div>
                <div id="sh-step4-inline-bridge" style="margin-top:10px;padding:10px 12px;border-radius:12px;background:#FAF8F5;border:1px solid #EAE4DC;display:flex;flex-direction:column;gap:8px;">
                  <div style="font-size:0.82rem;font-weight:800;color:#1C1C1C;">${IC.save}Email This Layout &amp; Caterer CSV ($0) or Unlock Print Pack ($7 &middot; vs. $14 Etsy):</div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:stretch;">
                    <input id="sh-step4-inline-email" type="email" placeholder="Enter email for free template &amp; CSV ($0)..." onkeydown="if(event.key==='Enter'){var el=document.getElementById('sh-inline-vault-email');if(el)el.value=this.value;window.shSaveInlineEmailLead();}" style="flex:1 1 160px;min-width:0;min-height:42px;padding:8px 10px;border:1px solid #D1D5DB;border-radius:8px;font-size:16px;background:#FFFFFF;color:#1C1C1C;" aria-label="Email address to save floorplan and caterer CSV" />
                    <button type="button" id="sh-step4-inline-save-btn" onclick="var el=document.getElementById('sh-inline-vault-email'),s4=document.getElementById('sh-step4-inline-email');if(el&&s4)el.value=s4.value;window.shSaveInlineEmailLead();" style="cursor:pointer;background:#1B4D3E;color:#FFFFFF;border:1px solid #1B4D3E;border-radius:8px;padding:8px 12px;font-size:0.84rem;font-weight:700;white-space:nowrap;">Email Plan ($0)</button>
                  </div>
                  <a id="sh-card5-buy-btn" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}&amp;allow_promotion_codes=false" style="display:inline-flex;align-items:center;justify-content:center;text-align:center;background:#1C1C1C;color:#FFFFFF;border:1px solid #1C1C1C;border-radius:8px;padding:8px 12px;font-size:0.88rem;font-weight:800;text-decoration:none;">Unlock Full Print Pack ($7 &middot; vs. $14 Etsy) &rarr;</a>
                  <div style="font-size:11.5px;color:#78350F;font-weight:700;text-align:center;background:#FFFBEB;border:1px solid #FDE68A;border-radius:6px;padding:4px 8px;">
                    &#10003; 30-Day Money-Back Guarantee &bull; FedEx Office Ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Wide Interactive Floorplan Stage & 4-Tab Kit -->
        <div class="studio-sticky-right-col">
          <div class="studio-baseline-kpi-grid" id="sh-stat-harmony">
            <div class="studio-kpi-card">
              <div class="studio-kpi-label">1. Family Peace</div>
              <div class="studio-kpi-val" id="sh-kpi-harmony" style="color:#065F46;">0 Conflicts<span id="score-csov" style="display:none;">${plan.harmonyScore || 98}</span></div>
              <div class="studio-kpi-sub" id="sh-stat-conflicts">&#10003; Separated relatives kept apart</div>
            </div>
            <div class="studio-kpi-card">
              <div class="studio-kpi-label">2. Guests &amp; Tables</div>
              <div class="studio-kpi-val" id="sh-stat-guests">62 Guests (8 Tables)</div>
              <div class="studio-kpi-sub" id="sh-stat-households-sub">&#10003; 26 Couples &amp; families together</div>
            </div>
            <div class="studio-kpi-card">
              <div class="studio-kpi-label">3. Caterer &amp; Signage</div>
              <div class="studio-kpi-val" id="sh-stat-meals">12:00 Seat #1</div>
              <div class="studio-kpi-sub" id="sh-stat-allergies-sub">&#10003; 6 Allergy flags &bull; Place cards ready</div>
            </div>
          </div>

          <!-- Zola Editorial Live 4-Tab Reception Stage -->
          <div class="studio-bespoke-stage" id="studio-bespoke-artifact-stage" style="padding:8px 10px;gap:6px;">
            <!-- Unified Stage Header Bar -->
            <div id="specimen-header-block" style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:nowrap;padding:2px 4px 5px;border-bottom:1px solid #E5E7EB;">
              <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                <div id="specimen-logo-badge" title="Couple Monogram" style="width:32px;height:32px;border-radius:8px;background:#EBF4F0;border:1px solid #C4DFD5;color:#1B4D3E;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;">
                  <span id="specimen-logo-monogram" style="display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;">
                    <span id="specimen-logo-monogram-initials" style="font-family:var(--font-serif);font-size:0.9rem;font-weight:700;color:#1B4D3E;">M&amp;L</span>
                    <span id="specimen-logo-monogram-sub" style="display:none;">EST. 2026</span>
                  </span>
                  <img id="specimen-logo-img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" alt="Crest Logo" style="display:none;width:100%;height:100%;object-fit:contain;background:#FFFFFF;padding:2px;" />
                </div>
                <div style="min-width:0;flex:1;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <div id="specimen-client-headline" class="serif-display" style="font-size:1.02rem;color:#1C1C1C;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(plan.title || "Maya & Liam's Estate Reception")}</div>
                  <span id="specimen-harmony-pill" class="badge badge-emerald sh-hide-mobile-toolbar" style="font-size:0.70rem;padding:1px 7px;flex-shrink:0;">&#10003; 0 Conflicts</span>
                  <span id="specimen-meta-sub" class="sh-hide-mobile-toolbar" style="font-size:0.76rem;color:#4B5563;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><span id="sh-stage-venue-label">${escapeHtml(plan.venueName || 'Rosewood Conservatory')}</span> &middot; 62 Guests (8 Tables)</span>
                  <button type="button" id="sh-venue-photo-pill" class="studio-tap-chip sh-hide-mobile-toolbar" onclick="window.shOpenVenuePhotoModal && window.shOpenVenuePhotoModal()" style="display:inline-flex;align-items:center;gap:5px;padding:2px 8px;font-size:0.72rem;font-weight:700;color:#1B4D3E;background:#EBF4F0;border:1px solid #C4DFD5;border-radius:999px;cursor:pointer;" title="View venue photograph and architectural setting"><span style="font-size:0.8rem;">📷</span><span>Venue Photo</span></button>
                  <div id="specimen-salon-crest" style="display:none;"></div>
                  <div id="specimen-tagline-sub" style="display:none;"></div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
                <span id="sh-mom-sandbox-badge" style="display:none;"></span>
                <button type="button" class="sh-ed-ghost sh-hide-mobile-toolbar" style="padding:4px 9px;font-size:0.76rem;" onclick="window.shOpenSetupWizard()">&larr; Edit setup</button>
                <span id="sh-save-status" class="sh-save-status sh-hide-mobile-toolbar" aria-live="polite" title="Your seating saves automatically on this device" style="font-size:0.75rem;">Auto-saved</span>
                <button type="button" class="sh-ed-ghost" style="padding:4px 9px;font-size:0.76rem;" onclick="window.shOpenVaultModal()" title="Get a link or email so you can open this plan on any device">Save online</button>
              </div>
            </div>

            <!-- 4-Tab Switcher -->
            <div class="studio-stage-tabs" role="tablist" aria-label="SeatHarmony 4-Tab Operational Kit" style="padding:3px;gap:4px;">
              <button id="sh-tab-floorplan" type="button" class="studio-stage-tab-btn tab-btn active" data-tab="llmsTxt" onclick="window.shSetActiveTab('floorplan')" style="padding:5px 6px;font-size:0.78rem;">Seating</button>
              <button id="sh-tab-beo" type="button" class="studio-stage-tab-btn tab-btn" data-tab="jsonLd" onclick="window.shSetActiveTab('beo')" style="padding:5px 6px;font-size:0.78rem;">Caterer sheet</button>
              <button id="sh-tab-poster" type="button" class="studio-stage-tab-btn" onclick="window.shSetActiveTab('poster')" style="padding:5px 6px;font-size:0.78rem;">Welcome sign</button>
              <button id="sh-tab-qr" type="button" class="studio-stage-tab-btn" onclick="window.shSetActiveTab('qr')" style="padding:5px 6px;font-size:0.78rem;">Guest QR</button>
            </div>

            <!-- Foreground Sample Card -->
            <div class="studio-foreground-specimen" id="studio-foreground-specimen" style="padding:8px;">
              <!-- PANE 1: Interactive Floorplan & Selected Table Inspector -->
              <div id="sh-pane-floorplan" style="display:block;">
                <div id="sh-canvas-step-banner" style="display:none;"><span id="sh-canvas-step-badge"></span><span id="sh-canvas-step-hint"></span><button type="button" id="sh-canvas-step-next-btn"></button></div>
                <div id="sh-active-swap-banner" style="display:none;"></div>
                <div id="sh-mom-sandbox-banner" style="display:none;margin-bottom:6px;padding:6px 10px;border-radius:8px;background:#EBF4F0;border:1px solid #A7F3D0;color:#1B4D3E;font-size:0.78rem;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;"><span><strong>${IC.users}Family Share Mode Active:</strong> Mom can rearrange Tables 1&ndash;3 only; Tables 4+ are locked with padlocks on the floorplan.</span><span style="display:inline-flex;gap:6px;"><button type="button" class="sh-ed-ghost" style="background:#FFF;padding:3px 9px;" onclick="window.shCopyMomSandboxLink()">Copy Family Link</button><button type="button" class="sh-ed-ghost" style="background:#FFF;padding:3px 9px;" onclick="window.shToggleMomSandbox()">Exit Family Mode</button></span></div>

                <!-- Simple editor bar: <= 3 primary controls + panel toggle -->
                <div id="sh-canvas-micro-toolbar" class="sh-ed-bar" style="margin-bottom:6px;gap:6px;flex-wrap:wrap;align-items:center;">
                  <span class="sh-ed-menu-wrap"><button type="button" id="sh-toolbar-add-table-btn" class="sh-ed-ghost" style="padding:5px 12px;font-size:0.80rem;font-weight:700;background:#1B4D3E;color:#FFFFFF;border-color:#1B4D3E;" aria-haspopup="true" onclick="window.shToggleAddMenu(event)">+ Add Table &#9662;</button><div id="sh-add-menu" class="sh-ed-menu" style="display:none;"><button type="button" onclick="window.shAddTableType('round8')">Round table <small>8 seats</small></button><button type="button" onclick="window.shAddTableType('round10')">Round table <small>10 seats</small></button><button type="button" onclick="window.shAddTableType('banquet12')">Long banquet <small>12 seats</small></button><button type="button" onclick="window.shAddTableType('kings8')">King's table <small>8 seats</small></button></div></span>
                  <button type="button" id="sh-undo-btn" class="sh-ed-ghost" style="padding:5px 11px;font-size:0.78rem;font-weight:600;" onclick="window.shUndo(1)" title="Undo last move (Ctrl+Z / Cmd+Z)">&#8630; Undo</button>
                  <span class="sh-ed-menu-wrap"><button type="button" id="sh-toolbar-room-btn" class="sh-ed-ghost" style="padding:5px 11px;font-size:0.78rem;font-weight:600;" aria-haspopup="true" onclick="window.shToggleRoomMenu(event)">Room Options &#9662;</button><div id="sh-room-menu" class="sh-ed-menu" style="display:none;min-width:240px;"><div class="sh-ed-menu-sec">Switch all tables (keeps guests)</div><button type="button" data-room-shape="round8" onclick="window.shSetAllTablesKind('round8')">All Round <small>8 seats</small></button><button type="button" data-room-shape="round10" onclick="window.shSetAllTablesKind('round10')">All Round <small>10 seats</small></button><button type="button" data-room-shape="banquet12" onclick="window.shSetAllTablesKind('banquet12')">All Long banquet <small>12 seats</small></button><button type="button" data-room-shape="kings8" onclick="window.shSetAllTablesKind('kings8')">All King's <small>8 seats</small></button><div class="sh-ed-menu-sec">Scale venue guest capacity</div><div class="sh-ed-cap-grid"><button type="button" data-room-cap="50" onclick="window.shScaleRoomGuests(50)">50</button><button type="button" data-room-cap="75" onclick="window.shScaleRoomGuests(75)">75</button><button type="button" data-room-cap="100" onclick="window.shScaleRoomGuests(100)">100</button><button type="button" data-room-cap="150" onclick="window.shScaleRoomGuests(150)">150</button><button type="button" data-room-cap="200" onclick="window.shScaleRoomGuests(200)">200</button><button type="button" data-room-cap="300" onclick="window.shScaleRoomGuests(300)">300</button></div><div class="sh-ed-menu-sec">Alignment &amp; cleanup</div><button type="button" data-room-align="1" onclick="window.shAlignAllTablesToGrid()">&#8862; Align all tables to grid <small>snap rows &amp; cols</small></button><button type="button" data-room-prune="1" onclick="window.shPruneEmptyTables()">Clean up empty tables <small>auto-renumber</small></button></div></span>
                  <button type="button" id="sh-toolbar-panel-btn" class="sh-ed-ghost sh-hide-mobile-toolbar" style="padding:5px 11px;font-size:0.78rem;" onclick="window.shToggleRightPanel()" title="Minimize or reopen the right-side table &amp; guest panel">&#8677; Hide panel</button>

                  <!-- Secondary tools hidden to keep clean calm look, available via DOM/shortcuts -->
                  <span id="sh-live-toast" style="display:none;">Tap table or drag guests:</span>
                  <span class="sh-ed-menu-wrap" style="display:none;"><button type="button" id="sh-toolbar-history-btn" class="sh-ed-ghost" onclick="window.shToggleHistoryMenu(event)">History &#9662;</button><div id="sh-history-menu" class="sh-ed-menu" style="display:none;"></div></span>
                  <span id="sh-toolbar-zoom-wrap" style="display:none;"><button type="button" id="sh-zoom-out-btn">&minus;</button><button type="button" id="sh-zoom-pct-btn">100%</button><button type="button" id="sh-zoom-in-btn">+</button></span>
                  <button type="button" id="sh-toolbar-snap-btn" style="display:none;" onclick="window.shToggleSnapGrid(event)">&#8862; Snap: ON</button>
                  <button type="button" id="sh-toolbar-mom-btn" style="display:none;" onclick="window.shToggleMomSandbox()">${IC.users}Family Share</button>
                  <span class="sh-ed-menu-wrap" style="display:none;"><button type="button" id="sh-toolbar-add-landmark-btn" class="sh-ed-ghost" onclick="window.shToggleElMenu(event)">+ Add element &#9662;</button><div id="sh-el-menu" class="sh-ed-menu" style="display:none;"><button type="button" onclick="window.shAddElement('dance')">Dance floor</button><button type="button" onclick="window.shAddElement('dj')">DJ / band</button><button type="button" onclick="window.shAddElement('bar')">Bar</button><button type="button" onclick="window.shAddElement('cake')">Cake table</button><button type="button" onclick="window.shAddElement('buffet')">Buffet</button><button type="button" onclick="window.shAddElement('photo')">Photo booth</button><button type="button" onclick="window.shAddElement('stage')">Stage</button><button type="button" onclick="window.shAddElement('gifts')">Gift table</button><button type="button" onclick="window.shAddElement('custom')">Custom label</button></div></span>
                </div>

                <div id="sh-ed-legend" class="sh-ed-legend" aria-label="Guest groups. Tap a group to highlight it." style="display:none;margin:0 0 4px;flex-wrap:nowrap;overflow-x:auto;"></div>
                <div id="sh-ed-grid" class="sh-ed-grid" style="gap:16px;">
                  <div class="sh-ed-canvas" id="sh-floorplan-svg-stage">
                    <button type="button" id="sh-canvas-reopen-panel-btn" class="sh-canvas-reopen-btn" onclick="window.shToggleRightPanel(false)" title="Re-open / maximize the right-side table &amp; guest panel">&#8676; Re-open right panel</button>
                    <svg id="sh-floorplan-svg" viewBox="0 0 1120 680" style="width:100%;height:578px;min-height:560px;max-height:580px;flex:1;display:block;touch-action:none;user-select:none;" role="img" aria-label="Wedding floorplan"></svg>
                  </div>

                  <div id="sh-selected-table-box" class="sh-ed-panel"></div>
                </div>
              </div>

              <!-- PANE 2: Clockwise Caterer Meal Sheet -->
              <div id="sh-pane-beo" style="display:none;">
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;">
                  <div>
                    <span class="badge badge-emerald" style="margin-bottom:4px;">CATERER MEAL SHEET &middot; SEAT #1 AT 12 O&rsquo;CLOCK</span>
                    <h3 class="serif-display" style="font-size:1.35rem;">Clockwise Caterer Meal Sheet &amp; Allergy Guide</h3>
                  </div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap;">
                    <button type="button" id="sh-download-tbl1-sample-btn" class="btn btn-secondary" style="padding:6px 11px;font-size:0.74rem;background:#EBF4F0;border-color:#A7F3D0;color:#065F46;font-weight:700;" onclick="window.shExportTable1SampleCsv && window.shExportTable1SampleCsv()">&darr; Table 1 Free Sample (.CSV)</button>
                    <button type="button" id="sh-beo-mode-toggle" class="btn btn-secondary" style="padding:6px 11px;font-size:0.74rem;border-color:#C8A96E;color:#78350F;font-weight:800;" onclick="window.shToggleBeoChaosMode()">${IC.bolt}Compare: 12:00 Server View vs. Unnumbered Chaos</button>
                    <button type="button" class="btn btn-secondary" style="padding:6px 11px;font-size:0.74rem;" onclick="window.shGateOrExportBeoCsv ? window.shGateOrExportBeoCsv('csv') : window.shExportBeoCsv()">&darr; Full Meal Sheet (.CSV)</button>
                    <a id="sh-open-beo-studio-link" href="/print/beo/${vId}" target="_blank" class="btn btn-secondary" style="padding:6px 11px;font-size:0.74rem;">${IC.print}Signed Meal Sheet Print View &rarr;</a>
                    <a id="sh-pane-beo-buy-link" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}&amp;allow_promotion_codes=false" class="btn btn-primary" style="padding:6px 11px;font-size:0.74rem;">Unlock Event Print Pack ($7)</a>
                  </div>
                </div>
                <div id="sh-beo-container" style="max-height:480px;overflow-y:auto;"></div>
                <!-- BANQUET CAPTAIN CERTIFIED GUARANTEE STRIP (PILLAR 3 & 4 GATELOCK) -->
                <div id="sh-beo-guarantee-strip" style="margin-top:12px;padding:12px 16px;border-radius:12px;background:#FAF8F5;border:1px solid #E2D9C8;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;font-size:13px;color:#1F1B18;">
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-width:0;">
                    <span style="font-weight:800;color:#1B4D3E;">&#10003; Banquet Captain Certified:</span>
                    <span style="color:#574F49;">Clockwise numbering starting at 12:00 from head table or dance floor &bull; Exact entrée tallies &bull; Red dietary flags (Celiac, Vegan, Nut-Free) &bull; Zero wrong meals delivered</span>
                  </div>
                  <div style="font-size:12px;color:#78350F;font-weight:700;background:#FFFBEB;border:1px solid #FDE68A;padding:4px 10px;border-radius:999px;white-space:nowrap;">
                    &#10003; 30-Day 100% Money-Back Guarantee
                  </div>
                </div>
              </div>

              <!-- PANE 3: 24"x36" Welcome Sign & Avery 5302 Place Cards -->
              <div id="sh-pane-poster" style="display:none;">
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;">
                  <div style="display:flex;gap:5px;flex-wrap:wrap;">
                    <button type="button" id="sh-view-mode-poster-btn" class="studio-tap-chip active" onclick="window.shSwitchSignSubView && window.shSwitchSignSubView('poster')" style="font-weight:700;">24"×36" Poster</button>
                    <button type="button" id="sh-view-mode-avery-btn" class="studio-tap-chip" onclick="window.shSwitchSignSubView && window.shSwitchSignSubView('avery')" style="font-weight:700;">Avery 5302 Cards</button>
                    <span style="border-right:1px solid #D1D5DB;height:18px;margin:auto 2px;"></span>
                    <button type="button" class="studio-tap-chip active" data-poster-sort="alphabetical" onclick="window.shSetPosterMode('alphabetical',null)">Sort A-Z</button>
                    <button type="button" class="studio-tap-chip" data-poster-sort="by_table" onclick="window.shSetPosterMode('by_table',null)">By Table</button>
                    <button type="button" id="sh-poster-map-toggle" class="studio-tap-chip active" onclick="window.shTogglePosterMiniMap()" title="Show or hide the mini table # &amp; room layout map on the welcome sign">&#8862; Mini Layout: ON</button>
                    <button type="button" class="studio-tap-chip active" data-poster-theme="alabaster" onclick="window.shSetPosterMode(null,'alabaster')">Parisian Gold</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="ivory" onclick="window.shSetPosterMode(null,'ivory')">Botanical Ivory</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="obsidian" onclick="window.shSetPosterMode(null,'obsidian')">Editorial Noir</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="sage" onclick="window.shSetPosterMode(null,'sage')">Tuscan Sage</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="rosewater" onclick="window.shSetPosterMode(null,'rosewater')">Blush Rosewater</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="terracotta" onclick="window.shSetPosterMode(null,'terracotta')">Villa Terracotta</button>
                  </div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap;">
                    <a id="sh-open-poster-studio-link" href="/print/poster/${vId}" target="_blank" class="btn btn-secondary" style="padding:6px 10px;font-size:0.73rem;">${IC.print}24&Prime;&times;36&Prime; Print Studio &rarr;</a>
                    <a id="sh-open-avery-studio-link" href="/print/avery-5302/${vId}" target="_blank" class="btn btn-secondary" style="padding:6px 10px;font-size:0.73rem;">${IC.print}Avery 5302 Sheet &rarr;</a>
                    <a id="sh-pane-poster-buy-link" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}&amp;allow_promotion_codes=false" class="btn btn-primary" style="padding:6px 11px;font-size:0.8125rem;">&darr; Unlock 24&Prime;&times;36&Prime; Print-Ready Pack ($7 &middot; vs. $14 Blank Etsy Templates)</a>
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-bottom:10px;padding:10px 12px;background:#FAF6EE;border:1px solid #E5DEC9;border-radius:10px;">
                  <div><label for="sh-inline-sign-kicker" style="display:block;font-size:0.68rem;font-weight:800;color:#78350F;text-transform:uppercase;margin-bottom:3px;">Sign Headline</label><input id="sh-inline-sign-kicker" type="text" class="sh-ed-input" value="Please Find Your Seat" oninput="window.shUpdateSignKicker(this.value)" /></div>
                  <div><label for="sh-inline-sign-mono" style="display:block;font-size:0.68rem;font-weight:800;color:#78350F;text-transform:uppercase;margin-bottom:3px;">Monogram &amp; Date</label><input id="sh-inline-sign-mono" type="text" class="sh-ed-input" placeholder="M&amp;L &middot; OCT 24, 2026" oninput="window.shUpdateSignMonogram(this.value)" /></div>
                  <div><label for="sh-inline-sign-venue" style="display:block;font-size:0.68rem;font-weight:800;color:#78350F;text-transform:uppercase;margin-bottom:3px;">Reception Subtitle / Venue</label><input id="sh-inline-sign-venue" type="text" class="sh-ed-input" placeholder="The Conservatory at Villa Bellagio" oninput="window.shUpdateSignVenue(this.value)" /></div>
                </div>
                <div id="sh-poster-preview" style="max-height:760px;overflow-y:auto;margin-bottom:10px;"></div>
                <div id="sh-avery-preview"></div>
                <!-- LOCAL PRINT-SHOP PRODUCTION PROOF & SATISFACTION GUARANTEE -->
                <div id="sh-poster-printshop-guarantee" style="margin-top:12px;padding:12px 16px;border-radius:12px;background:#FAF8F5;border:1px solid #E2D9C8;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;font-size:13px;color:#1F1B18;">
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-width:0;">
                    <span style="font-weight:800;color:#1B4D3E;">&#10003; Print-Shop Ready:</span>
                    <span style="color:#574F49;">FedEx Office &amp; Staples 24&Prime;&times;36&Prime; Mounted Foam-Board Spec &bull; 0.125&Prime; Bleed &bull; Avery 5302 2&Prime;&times;3.5&Prime; Cards &bull; Same-Day Local Pickup Compatible</span>
                  </div>
                  <div style="font-size:12px;color:#78350F;font-weight:700;background:#FFFBEB;border:1px solid #FDE68A;padding:4px 10px;border-radius:999px;white-space:nowrap;">
                    &#10003; 30-Day 100% Money-Back Print Guarantee
                  </div>
                </div>
              </div>

              <!-- PANE 4: Cocktail-Hour Mobile QR Guest Lookup & Printable Foyer Sign -->
              <div id="sh-pane-qr" style="display:none;">
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;">
                  <div>
                    <span class="badge badge-emerald" style="margin-bottom:4px;">TAB 4 &middot; ZERO FOYER BOTTLENECK &middot; REAL SCANNABLE QR</span>
                    <h3 class="serif-display" style="font-size:1.35rem;">Cocktail-Hour QR Bar Sign &amp; Instant Guest Lookup</h3>
                  </div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap;">
                    <a id="sh-open-qr-app-link" href="/qr/${vId}" target="_blank" class="btn btn-primary" style="padding:6px 11px;font-size:0.73rem;">Open Guest Mobile Lookup &rarr;</a>
                    <button type="button" class="btn btn-secondary" style="padding:6px 11px;font-size:0.73rem;" onclick="window.shGateOrExportBeoCsv ? window.shGateOrExportBeoCsv('share') : window.shCopyMomSandboxLink()">${IC.users}Copy Family Share Link</button>
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:10px;">
                  <div style="background:#FAF7F2;border:2px double #C8A96E;border-radius:12px;padding:12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;">
                    <div style="font-size:0.62rem;font-weight:800;letter-spacing:0.12em;color:#78350F;text-transform:uppercase;">8&Prime;&times;10&Prime; BAR EASEL QR CARD (LIVE SCANNABLE)</div>
                    <div class="serif-display" style="font-size:1.15rem;color:#181412;">Scan to Find Your Seat</div>
                    <img id="sh-live-qr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&amp;color=181412&amp;bgcolor=FFFFFF&amp;data=${encodeURIComponent(`https://www.seatharmony.io/qr/${plan.vaultId || 'SH-4819'}`)}" alt="Scannable Cocktail Hour QR Code" width="96" height="96" style="background:#FFF;padding:6px;border-radius:8px;border:1px solid #D6CBB8;" />
                    <div style="font-size:0.70rem;color:#57534E;">Guests scan with phone camera &rarr; opens <a id="sh-qr-short-url" href="/qr/${vId}" target="_blank" style="color:#8C2D19;font-weight:800;">Live Guest Seat Lookup &rarr;</a></div>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <label for="sh-qr-search" class="studio-field-label" style="margin-bottom:0;">Test What Guests See on Their Phones at Cocktail Hour:</label>
                    <input id="sh-qr-search" type="text" class="grader-input" placeholder="Type guest name or table (e.g. Eleanor, Chen, Miller, Table 2)..." oninput="window.shFilterQrLookup()" aria-label="Search guest name" />
                    <div id="sh-qr-results" style="display:flex;flex-direction:column;gap:6px;max-height:245px;overflow-y:auto;"></div>
                  </div>
                </div>
                <!-- LIVE MOBILE LOOKUP GUARANTEE STRIP (PILLAR 3 & 4 GATELOCK) -->
                <div id="sh-qr-guarantee-strip" style="margin-top:12px;padding:12px 16px;border-radius:12px;background:#FAF8F5;border:1px solid #E2D9C8;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;font-size:13px;color:#1F1B18;">
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-width:0;">
                    <span style="font-weight:800;color:#1B4D3E;">&#10003; Zero Foyer Bottleneck:</span>
                    <span style="color:#574F49;">Guests scan QR from cocktail-hour bar signs &bull; Instant search by first or last name &bull; Works on any phone browser without app download</span>
                  </div>
                  <div style="font-size:12px;color:#78350F;font-weight:700;background:#FFFBEB;border:1px solid #FDE68A;padding:4px 10px;border-radius:999px;white-space:nowrap;">
                    &#10003; Included in Event Print Pack ($7)
                  </div>
                </div>
              </div>
              <pre id="compiler-code-output" style="display:none;" aria-hidden="true"># Supabase SeatHarmony Manifest\n{"@graph":[]}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Full-Width Studio Action Bar: Serene, Anti-Bombardment (1 Clear Form + 1 Optional Upgrade) -->
      <div id="sh-vault-checkout-bar" style="width:100%;margin:16px 0 0;background:#FFFFFF;border:1.5px solid #E4DCD0;border-radius:14px;padding:16px 20px;color:#1F1B18;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 16px -4px rgba(31,27,24,0.06);box-sizing:border-box;">
        <div id="sh-live-personalized-proof" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding-bottom:8px;border-bottom:1px solid #EFE8DD;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;min-width:0;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:#1B4D3E;"></span>
            <span style="font-family:'Cormorant Garamond', Georgia, serif;font-size:1.25rem;font-weight:700;color:#1F1B18;" id="sh-proof-couple-name">${escapeHtml(plan.title || "Maya & Liam's Estate Reception")}</span>
            <span style="color:#7D746D;font-size:13px;" id="sh-proof-venue-name">&middot; ${escapeHtml(plan.venueName || 'Rosewood Conservatory')}</span>
            <span id="sh-conflict-solver-badge" style="font-size:12px;font-weight:700;color:#1B4D3E;background:#EBF4F0;border:1px solid #C4DFD5;padding:2px 8px;border-radius:999px;">✓ 100% Harmony</span>
          </div>
          <div style="font-size:12.5px;color:#574F49;">
            <span id="sh-proof-table1-summary">✓ Table 1 Unmasked: Clockwise 12:00 Seat #1 &middot; Tables 2+ Gated ($0 Email Save)</span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;">
            <label for="sh-inline-vault-email" style="font-size:14px;font-weight:700;color:#1F1B18;" id="sh-vault-bar-headline">Save Seating Plan &amp; Email Clockwise Caterer Sheet ($0):</label>
            <span style="font-size:12px;color:#7D746D;">Instant browser link &middot; Zero watermark</span>
          </div>
          <div id="sh-inline-email-bridge" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;width:100%;">
            <input id="sh-inline-vault-email" type="email" placeholder="Enter your email to save your plan..." value="${escapeHtml(plan.ownerEmail && !/^(test|vip)@/i.test(plan.ownerEmail) ? plan.ownerEmail : '')}" onkeydown="if(event.key==='Enter')window.shSaveInlineEmailLead()" style="flex:1 1 260px;min-width:0;height:40px;padding:6px 14px;border:1.5px solid #D6CBB8;border-radius:8px;font-size:15px;background:#FAF7F2;color:#1F1B18;box-sizing:border-box;" aria-label="Email address to save seating plan" />
            <button type="button" id="sh-inline-vault-save-btn" onclick="window.shSaveInlineEmailLead()" style="cursor:pointer;background:#1B4D3E;color:#FFFFFF;border:none;border-radius:8px;height:40px;padding:6px 20px;font-size:13.5px;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(27,77,62,0.2);">Save Free ($0) &rarr;</button>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;font-size:12.5px;padding-top:2px;">
            <span style="color:#7D746D;">Need print-shop signage? <a id="sh-vault-buy-pack-btn" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}&amp;allow_promotion_codes=false" style="color:#1B4D3E;font-weight:700;text-decoration:underline;">Get Auto-Filled 24&Prime;&times;36&Prime; Print Pack ($7) &rarr;</a></span>
            <a id="sh-footer-vault-link" href="/vault/${vId}" style="color:#574F49;text-decoration:none;">View all 5 event files &rarr;</a>
          </div>
          <div id="sh-vault-bar-trust-strip" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;font-size:11.5px;color:#78350F;background:#FFFBEB;border:1px solid #FDE68A;padding:4px 10px;border-radius:6px;margin-top:1px;">
            <span>&#10003; <strong>30-Day Guarantee:</strong> If caterer or print shop isn't thrilled, email for an instant refund</span>
            <span style="font-weight:700;color:#1B4D3E;">&#10003; FedEx Office &amp; Staples 24&Prime;&times;36&Prime; Ready</span>
          </div>
          <div id="sh-post-email-upgrade-bridge" style="display:none;padding:12px 16px;border-radius:10px;background:#EBF4F0;border:1.5px solid #1B4D3E;color:#1B4D3E;font-size:14px;font-weight:600;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <span>&#10003; <strong>Plan saved!</strong> <a id="sh-stateful-share-link" href="/?vault=${vId}&amp;saved=1#studio" style="color:#1B4D3E;font-weight:700;text-decoration:underline;">Shareable Return Link</a></span>
              <span style="font-size:12px;color:#78350F;font-weight:700;background:#FFFBEB;border:1px solid #FDE68A;padding:2px 8px;border-radius:6px;">&#10003; 30-Day Money-Back Guarantee</span>
            </div>
            <a id="sh-post-email-upgrade-cta" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}&amp;allow_promotion_codes=false" style="background:#1B4D3E;color:#FFFFFF;border-radius:8px;padding:8px 16px;font-size:13.5px;font-weight:700;text-decoration:none;">Download 24&Prime;&times;36&Prime; Print Pack ($7 &middot; vs. $14 Etsy) &rarr;</a>
          </div>
        </div>

        <div class="sh-hide-mobile-toolbar" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding-top:10px;border-top:1px solid #EFE8DD;font-size:13px;color:#7D746D;">
          <div id="sh-voc-survey-box" style="display:flex;align-items:center;gap:6px;">
            <span id="sh-voc-survey-label">Included in Print Pack:</span>
            <span>24&Prime;&times;36&Prime; Welcome Poster &middot; Avery 5302 Tent Cards &middot; Clockwise Caterer Sheet &middot; Live Guest QR</span>
          </div>
          <div id="sh-planner-pro-dock-banner" style="display:flex;align-items:center;gap:14px;">
            <a id="sh-vault-buy-pro-btn" href="/buy/pro_b2b?target=estate-150&amp;vault=${vId}&amp;allow_promotion_codes=false" style="color:#1B4D3E;font-weight:700;text-decoration:underline;">Wedding Planner Pro Pass ($29) &rarr;</a>
          </div>
        </div>
        <div id="sh-ecosystem-handoff-banner" style="display:none;"></div>
      </div>
    </div>

    <!-- SAVE / LOGIN / RESUME EVENT VAULT MODAL -->
    <div id="sh-vault-modal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(28,28,28,0.68);backdrop-filter:blur(6px);align-items:center;justify-content:center;padding:16px;" onclick="if(event.target===this)window.shCloseVaultModal()">
      <div style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:18px;max-width:760px;width:100%;padding:24px;box-shadow:0 24px 64px rgba(0,0,0,0.28);color:#1C1C1C;max-height:92vh;overflow-y:auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;border-bottom:1px solid #E5E7EB;padding-bottom:12px;margin-bottom:16px;">
          <div>
            <div style="font-size:0.68rem;font-weight:800;letter-spacing:0.10em;text-transform:uppercase;color:#1B4D3E;">${IC.save}SAVE &amp; SHARE YOUR SEATING PLAN</div>
            <h3 class="serif-display" style="font-size:1.55rem;margin-top:2px;">Save Your Seating Plan or Open a Saved Wedding</h3>
          </div>
          <button type="button" onclick="window.shCloseVaultModal()" style="background:#F8F7F4;border:1px solid #D1D5DB;border-radius:8px;padding:6px 12px;font-weight:700;cursor:pointer;white-space:nowrap;">&#10005; Close</button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">
          <div style="background:#F8F7F4;border:1px solid #E5E7EB;border-radius:14px;padding:18px;min-width:0;">
            <div class="badge badge-emerald" style="margin-bottom:8px;white-space:normal;">1. SAVE YOUR RECEPTION</div>
            <h4 class="serif-display" style="font-size:1.22rem;margin-bottom:6px;">Save Your Seating Plan Online</h4>
            <p style="font-size:0.86rem;color:#4B5563;margin-bottom:12px;line-height:1.45;">Save your tables and guest list online to edit from any device or print 48 hours out.</p>
            <label for="sh-vault-email-input" class="studio-field-label">Your Email Address:</label>
            <input id="sh-vault-email-input" type="email" class="grader-input" style="width:100%;margin-bottom:10px;font-size:16px;" placeholder="maya@example.com" value="${escapeHtml(plan.ownerEmail || '')}" />
            <label for="sh-vault-pin-input" class="studio-field-label">Optional 4-Digit Edit PIN:</label>
            <input id="sh-vault-pin-input" type="text" maxlength="8" class="grader-input" style="width:100%;margin-bottom:12px;font-size:16px;" placeholder="2026" value="2026" />
            <button type="button" id="sh-vault-save-submit-btn" class="btn btn-primary" style="width:100%;padding:11px;" onclick="window.shSaveVaultToServer()">${IC.save}Save My Seating Plan</button>
            <div id="sh-vault-saved-links-box" style="margin-top:12px;padding:10px 12px;border-radius:10px;background:#FFFFFF;border:1px solid #E5E7EB;font-size:0.84rem;">
              <div style="font-weight:800;color:#1B4D3E;margin-bottom:6px;">&#10003; Direct Links for Your Reception:</div>
              <div style="display:flex;flex-direction:column;gap:5px;">
                <a id="sh-modal-link-vault" href="/vault/${vId}" style="color:#1B4D3E;font-weight:700;text-decoration:none;">${IC.unlock}All 5 Print &amp; Caterer Files &rarr;</a>
                <a id="sh-modal-link-poster" href="/print/poster/${vId}" target="_blank" style="color:#1C1C1C;font-weight:700;text-decoration:none;">${IC.print}24&Prime;&times;36&Prime; Welcome Sign Studio &rarr;</a>
                <a id="sh-modal-link-avery" href="/print/avery-5302/${vId}" target="_blank" style="color:#1C1C1C;font-weight:700;text-decoration:none;">${IC.print}Avery 5302 Place Cards &rarr;</a>
                <a id="sh-modal-link-beo" href="/print/beo/${vId}" target="_blank" style="color:#1C1C1C;font-weight:700;text-decoration:none;">${IC.print}Clockwise Caterer Meal Sheet &rarr;</a>
                <a id="sh-modal-link-qr" href="/qr/${vId}" target="_blank" style="color:#1B4D3E;font-weight:700;text-decoration:none;">Guest Cocktail-Hour QR Lookup &rarr;</a>
              </div>
            </div>
          </div>

          <div style="background:#F8F7F4;border:1px solid #E5E7EB;border-radius:14px;padding:18px;display:flex;flex-direction:column;justify-content:flex-start;min-width:0;">
            <div class="badge badge-amber" style="margin-bottom:8px;white-space:normal;align-self:flex-start;">2. OPEN A SAVED WEDDING</div>
            <h4 class="serif-display" style="font-size:1.22rem;margin-bottom:6px;">Return to a Saved Seating Plan</h4>
            <p style="font-size:0.86rem;color:#4B5563;margin-bottom:12px;line-height:1.45;">Enter the email address you used when saving your reception floorplan to pick up right where you left off:</p>
            <label for="sh-vault-lookup-input" class="studio-field-label">Your Saved Email Address:</label>
            <input id="sh-vault-lookup-input" type="text" class="grader-input" style="width:100%;margin-bottom:12px;font-size:16px;" placeholder="maya@example.com" />
            <button type="button" id="sh-vault-lookup-btn" class="btn btn-secondary" style="width:100%;padding:11px;" onclick="window.shLookupSavedVault()">${IC.unlock}Open My Saved Seating Plan</button>
            <div id="sh-vault-lookup-status" style="margin-top:10px;font-size:0.84rem;color:#374151;"></div>
          </div>
        </div>
        <div style="margin-top:16px;padding:12px 14px;background:#FAF8F5;border:1px solid #E2D9C8;border-radius:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:0.78rem;color:#1F1B18;">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span style="font-weight:800;color:#1B4D3E;">&#10003; 100% Free Plan Save ($0):</span>
            <span style="color:#574F49;">Includes interactive floorplan + Table 1 sample meal sheet + save &amp; resume link</span>
          </div>
          <div style="font-weight:700;color:#78350F;background:#FFFBEB;border:1px solid #FDE68A;padding:2px 8px;border-radius:999px;">
            &#10003; 30-Day Money-Back Guarantee on $7 Print Pack
          </div>
        </div>
      </div>
    </div>

    <!-- Active Venue Setting Lightbox Modal -->
    <div id="sh-venue-photo-modal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(28,28,28,0.72);backdrop-filter:blur(6px);align-items:center;justify-content:center;padding:16px;" onclick="if(event.target===this)window.shCloseVenuePhotoModal()">
      <div style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:18px;max-width:760px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,0.32);color:#1C1C1C;overflow:hidden;">
        <div style="position:relative;">
          <button type="button" onclick="window.shCloseVenuePhotoModal()" style="position:absolute;top:12px;right:12px;z-index:10;background:rgba(0,0,0,0.65);color:#FFF;border:none;border-radius:50%;width:32px;height:32px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;" title="Close">✕</button>
          <img id="sh-modal-venue-img" src="" data-src="/public/venue-rosewood-estate.jpg" alt="Active Venue Setting" style="width:100%;height:auto;max-height:460px;object-fit:cover;display:block;" />
          <div style="position:absolute;bottom:12px;left:12px;background:rgba(27,77,62,0.92);color:#FFFFFF;padding:4px 12px;border-radius:999px;font-size:0.72rem;font-weight:700;backdrop-filter:blur(4px);" id="sh-modal-venue-badge">
            Estate Reception &middot; Verified 54" Aisles
          </div>
        </div>
        <div style="padding:18px 22px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
            <div>
              <div style="font-size:0.68rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#1B4D3E;" id="sh-modal-venue-tag">ARCHITECTURAL VENUE SETTING</div>
              <h3 class="serif-display" style="font-size:1.35rem;margin:3px 0 4px;color:#181412;" id="sh-modal-venue-name">The Conservatory at Rosewood Estate</h3>
              <p style="font-size:0.84rem;color:#4B5563;margin:0;line-height:1.45;" id="sh-modal-venue-desc">Light-filled glass conservatory with 54" server aisles, crystal chandeliers, and parquet oak dance floor. Perfectly calibrated to SeatHarmony's 150-guest layout.</p>
            </div>
            <button type="button" class="btn btn-primary" onclick="window.shCloseVenuePhotoModal()" style="font-size:0.82rem;padding:7px 16px;">Back to Floorplan Canvas</button>
          </div>
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
  <section class="studio-zone-section" id="faq" style="padding:24px 0;border-top:1px solid #E5D9C5;">
    <div class="container">
      <div class="bs-section-header" style="margin-bottom:14px;">
        <div class="bs-section-eyebrow">COMMON QUESTIONS</div>
        <h2 class="bs-section-h2">Three quick answers <em>before you print.</em></h2>
      </div>

      <div class="studio-faq-stack" style="margin-top:12px;gap:8px;">
        <details class="studio-faq-item" style="padding:12px 18px;" open>
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
  <section class="studio-zone-section" id="pricing" style="padding:24px 0;background:linear-gradient(180deg, #FBF9F6 0%, #FFFFFF 100%);border-top:1px solid #E5D9C5;">
    <div class="container">
      <div class="bs-section-header" style="margin-bottom:16px;">
        <div class="bs-section-eyebrow">SAVE 6+ HOURS AT FEDEX &amp; CANVA &middot; ZERO WATERMARK</div>
        <h2 class="bs-section-h2">Design free. Unlock print-shop &amp; caterer execution files <em>when ready.</em></h2>
      </div>
      <div class="pricing-grid" style="margin-top:14px;margin-bottom:16px;gap:14px;">
        <div class="panel" style="padding:18px 16px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;background:#FFFFFF;">
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
        <div class="panel" style="padding:18px 16px;border:2px solid #1B4D3E;display:flex;flex-direction:column;justify-content:space-between;gap:10px;position:relative;background:#FFFFFF;">
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
          <div style="font-size:11.5px;color:#78350F;font-weight:700;background:#FFFBEB;border:1px solid #FDE68A;padding:4px 8px;border-radius:6px;text-align:center;">
            &#10003; 30-Day Money-Back Guarantee &bull; FedEx Ready
          </div>
          <a id="pricing-buy-pack" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}&amp;allow_promotion_codes=false" class="btn btn-primary" style="width:100%;padding:10px 14px;font-size:0.88rem;white-space:normal;text-align:center;line-height:1.3;">Unlock Print &amp; Day-Of Pack ($7) &rarr;</a>
        </div>
        <div class="panel" style="padding:18px 16px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;background:#FBF9F6;border:1.5px solid #D6CBB8;">
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

function renderHomePage(initialAudit, sampleSeoPages = []) {
  const plan = (initialAudit && initialAudit.seatingPlan) ? initialAudit.seatingPlan : initialAudit;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'SeatHarmony Wedding & Event Floorplan Studio', applicationCategory: 'EventPlanningApplication', operatingSystem: 'Web', description: 'Drama-free wedding seating chart planner, clockwise 12:00 caterer meal sheet, and print-ready 24x36 welcome sign & Avery 5302 place card studio.', offers: { '@type': 'Offer', price: '7.00', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'What happens when guests drop out 48 hours before the wedding?', acceptedAnswer: { '@type': 'Answer', text: 'Swap or remove the guest on the SeatHarmony canvas and re-export your 24x36 Arch D PDF, Avery 5302 place cards, and Clockwise Caterer Meal Sheet in one click.' } },
        { '@type': 'Question', name: 'How does the Clockwise 12:00 Caterer Meal Sheet work?', acceptedAnswer: { '@type': 'Answer', text: 'SeatHarmony marks 12 o-clock (closest to the Dance Floor) as Seat #1 and numbers seats 1..N clockwise with meal icons and allergy flags for banquet servers.' } }
      ] }
    ]
  };
  return [
    renderHead({ title: 'SeatHarmony: Wedding Floorplan, Conflict-Free Seating Solver & 24"×36" Poster Studio', description: 'Seat 150 wedding guests in 30 seconds without family drama. Auto-solve divorced parent table buffers, generate clockwise caterer meal sheets, and export print-ready 24"×36" welcome signs & Avery 5302 place cards.', canonicalPath: '/', jsonLd, ogSlug: 'home' }),
    '<body>', renderNavbar(), '<main id="main-content">',
    renderZone1Hero(plan), renderZone3InteractiveStudio(plan), renderZone2Walkthrough(plan), renderZone4ProofStackAndPricing(), renderZone5FaqAndZone6Close(sampleSeoPages, plan),
    '</main>', renderFooter(), renderInteractiveScript(plan), '</body></html>'
  ].join('\n');
}

function getVenueVisual(slug = '', title = '', category = '') {
  const s = `${slug} ${title} ${category}`.toLowerCase();
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

function renderLandingPage(initialAudit) { return renderHomePage(initialAudit, []); }

function renderSeoDetailPage(pageRow, relatedPages = []) {
  let payload = {};
  try { payload = JSON.parse(pageRow.payload_json || '{}'); } catch (_) {}
  const bp = buildVenueBlueprint(pageRow.slug, pageRow.title);
  const guestCount = bp.guests;
  const sqFt = bp.sqft.toLocaleString();
  const leaders = Array.isArray(payload.leaders) ? payload.leaders : [];
  const comfortTags = ['Recommended Setup', 'Great Guest Flow', 'Spacious Aisles', 'Cozy Conversation'];
  const venueVisual = getVenueVisual(pageRow.slug, pageRow.title, pageRow.category);
  const venueHeroHtml = `<div style="margin:20px 0 28px;border-radius:18px;overflow:hidden;background:#FFFFFF;border:1px solid #E4DCD0;box-shadow:0 8px 28px -10px rgba(31,27,24,0.08);">` +
    `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 18px;background:#FAF7F2;border-bottom:1px solid #E4DCD0;font-size:13px;color:#574F49;flex-wrap:wrap;gap:8px;">` +
      `<span><strong style="color:#1F1B18;">Venue Setting:</strong> ${escapeHtml(venueVisual.name)}</span>` +
      `<span style="color:#1B4D3E;font-weight:700;background:#EBF4F0;padding:3px 12px;border-radius:999px;border:1px solid #C4DFD5;">${guestCount} Guests &middot; ${escapeHtml(bp.roomDims)} &middot; Authentic Table Clearance</span>` +
    `</div>` +
    `<div style="height:280px;max-height:42vw;min-height:200px;overflow:hidden;background:#F5EFE6;">` +
      `<img src="${venueVisual.img}" alt="${escapeHtml(pageRow.title)} venue reception setting" style="width:100%;height:100%;object-fit:cover;object-position:center 35%;display:block;" loading="eager" />` +
    `</div>` +
  `</div>`;
  const specGridHtml = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:12px;margin-bottom:20px;">` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">ROOM / TENT SIZE</div><div style="font-size:1.02rem;font-weight:800;color:#1F1B18;">${escapeHtml(bp.roomDims)} (~${sqFt} sq ft)</div></div>` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">TABLE COUNT</div><div style="font-size:1.02rem;font-weight:800;color:#1F1B18;">${bp.tableCount} Tables (${bp.roundCount}R / ${bp.banquetCount}B)</div></div>` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">DANCE FLOOR</div><div style="font-size:1.02rem;font-weight:800;color:#1F1B18;">${escapeHtml(bp.danceFloorDims)}</div></div>` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">SERVER AISLES</div><div style="font-size:1.02rem;font-weight:800;color:#1B4D3E;">${escapeHtml(bp.aisleSpec)}</div></div>` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">24&Prime;&times;36&Prime; SIGN SPEC</div><div style="font-size:1.02rem;font-weight:800;color:#1F1B18;">${escapeHtml(bp.posterLayout)}</div></div>` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">AVERY 5302 CARDS</div><div style="font-size:1.02rem;font-weight:800;color:#1F1B18;">${bp.averySheets} Sheets (${guestCount} Cards)</div></div>` +
  `</div>`;
  const floorplanPanelHtml = `<div class="panel" style="padding:20px;margin-bottom:24px;background:#FFFFFF;border-color:#E2D9C8;"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><h2 class="serif-display" style="font-size:1.35rem;margin:0;">Architectural Room Layout (${guestCount} Guests &middot; ${escapeHtml(bp.roomDims)} &middot; ${escapeHtml(bp.specLabel)})</h2><span class="badge badge-emerald">${bp.tableCount} Tables &middot; 54&Prime;+ Server Aisles</span></div>${specGridHtml}<div style="margin-bottom:14px;">${renderFloorplanSvg(bp, { detailed: true })}</div>${leaders.length ? `<table class="ba-table" style="font-size:0.84rem;"><thead><tr><th>Option</th><th>Table Layout</th><th>Architectural Spec</th><th>Included Print &amp; Caterer Files</th></tr></thead><tbody>${leaders.map((l, idx) => idx === 0 ? `<tr><td class="mono" style="font-weight:800;">Option 1 (Free Sample)</td><td style="font-weight:700;">${escapeHtml(l.brand)}</td><td><strong style="color:#065F46;">&#10003; ${escapeHtml(l.domain || comfortTags[idx % comfortTags.length])}</strong></td><td>${escapeHtml(l.llmsTxt || l.WeakSpot || 'Ready')}</td></tr>` : `<tr><td class="mono" style="font-weight:800;">Option ${idx + 1}</td><td style="font-weight:700;">${escapeHtml(l.brand)}</td><td><strong style="color:#065F46;">&#10003; ${escapeHtml(l.domain || comfortTags[idx % comfortTags.length])}</strong></td><td><button type="button" class="sh-locked-spec-badge" onclick="try{fetch('/api/telemetry/event',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({event_type:'view_paywall',eventType:'view_paywall',page_url:window.location.pathname,meta:{js_hydrated:1,source:'seo_option_badge'}})}).catch(function(){});}catch(_){}var el=document.getElementById('sh-seo-calc-email');if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.focus();}" style="cursor:pointer;background:#EBF4F0;color:#065F46;border:1px solid #1B4D3E;border-radius:999px;padding:3px 9px;font-size:12px;font-weight:700;">${IC.lock}Option ${idx + 1} Meal Sheet &amp; Sign Spec &mdash; Enter Email ($0) &uarr;</button></td></tr>`).join('')}</tbody></table>` : ''}</div>`;
  const calcHtml = `<div class="panel" id="sh-seo-calc" style="padding:22px;margin-bottom:24px;background:linear-gradient(180deg,#FFFDF9 0%,#FAF3E6 100%);border:1.5px solid #C8A96E;">` +
    `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">` +
      `<div><span class="badge badge-amber" style="margin-bottom:4px;">INTERACTIVE TENT, ROOM &amp; SIGNAGE CALCULATOR</span><h2 class="serif-display" style="font-size:1.38rem;margin:0;">Calculate Your Exact Table Count, Tent Size &amp; 24&Prime;&times;36&Prime; Sign Spec</h2></div>` +
    `</div>` +
    `<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:12px;">` +
      `<span style="font-size:0.76rem;font-weight:800;color:#78350F;">${IC.bolt}1-Tap Guest Count:</span>` +
      [60, 80, 100, 150, 200].map(n => `<button type="button" class="studio-tap-chip" onclick="var g=document.getElementById('sh-calc-guests');if(g){g.value=${n};g.dispatchEvent(new Event('input'));}" style="padding:4px 10px;font-size:0.78rem;font-weight:800;">${n} Guests</button>`).join('') +
    `</div>` +
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:14px;">` +
      `<label style="display:flex;flex-direction:column;gap:4px;font-size:0.82rem;font-weight:700;color:#44403C;">Guest Count (<span id="sh-calc-g-val">${guestCount}</span> Guests)<input id="sh-calc-guests" type="range" min="40" max="300" step="5" value="${guestCount}" style="accent-color:#8C2D19;cursor:pointer;"/></label>` +
      `<label style="display:flex;flex-direction:column;gap:4px;font-size:0.82rem;font-weight:700;color:#44403C;">Table Shape &amp; Capacity<select id="sh-calc-shape" class="grader-input" style="padding:7px 10px;font-size:16px;"><option value="8">60&Prime; Round Tables (8 Guests/Table)</option><option value="10">72&Prime; Round Tables (10 Guests/Table)</option><option value="12">Long Banquet Tables (12 Guests/Table)</option><option value="9">Mixed Rounds + VIP Banquets (Avg 9/Table)</option></select></label>` +
      `<label style="display:flex;flex-direction:column;gap:4px;font-size:0.82rem;font-weight:700;color:#44403C;">Room / Tent Width<select id="sh-calc-width" class="grader-input" style="padding:7px 10px;font-size:16px;"><option value="30" ${bp.roomDims.startsWith('30') ? 'selected' : ''}>30 ft Wide (Frame Tent / Narrow Room)</option><option value="40" ${bp.roomDims.startsWith('40') ? 'selected' : ''}>40 ft Wide (Standard Tent / Ballroom)</option><option value="50" ${bp.roomDims.startsWith('50') ? 'selected' : ''}>50 ft Wide (Estate Ballroom / Barn)</option><option value="60" ${bp.roomDims.startsWith('60') ? 'selected' : ''}>60 ft Wide (Grand Ballroom / Gala)</option></select></label>` +
    `</div>` +
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:10px;padding:12px;background:#FFFFFF;border:1px solid #E2D9C8;border-radius:12px;margin-bottom:14px;">` +
      `<div><div style="font-size:0.70rem;font-weight:800;color:#78716C;">MINIMUM TENT / ROOM</div><div id="sh-calc-out-room" style="font-size:1.05rem;font-weight:800;color:#181412;">${escapeHtml(bp.roomDims)} (${sqFt} sq ft)</div></div>` +
      `<div><div style="font-size:0.70rem;font-weight:800;color:#78716C;">TABLES NEEDED</div><div id="sh-calc-out-tables" style="font-size:1.05rem;font-weight:800;color:#8C2D19;">1 Sweetheart + ${bp.pts.length} Tables</div></div>` +
      `<div><div style="font-size:0.70rem;font-weight:800;color:#78716C;">24&Prime;&times;36&Prime; SIGN FORMAT</div><div id="sh-calc-out-sign" style="font-size:1.05rem;font-weight:800;color:#065F46;">${escapeHtml(bp.posterLayout.split('·')[0].trim())}</div></div>` +
      `<div><div style="font-size:0.70rem;font-weight:800;color:#78716C;">AVERY 5302 + DANCE FLOOR</div><div id="sh-calc-out-avery" style="font-size:1.05rem;font-weight:800;color:#181412;">${bp.averySheets} Sheets &middot; ${escapeHtml(bp.danceFloorDims.split(' ')[0])}</div></div>` +
    `</div>` +
    `<!-- PILLAR 3 & 4: FAMILY CONFLICT RESOLVER & LIVE UNMASKED SPECIMEN -->` +
    `<div style="background:#FAF8F5;border:1.5px solid #D6CBB8;border-radius:14px;padding:16px;margin-bottom:16px;">` +
      `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;">` +
        `<div style="display:flex;align-items:center;gap:8px;">` +
          `<span style="font-weight:800;color:#1B4D3E;font-size:0.85rem;letter-spacing:0.04em;text-transform:uppercase;">&#10003; Family Conflict Auto-Solver &amp; Dietary Matrix</span>` +
          `<span style="font-size:0.70rem;background:#EBF4F0;color:#065F46;border:1px solid #10B981;border-radius:999px;padding:2px 8px;font-weight:800;">LIVE ACTIVE PREVIEW</span>` +
        `</div>` +
        `<span style="font-size:0.75rem;color:#78350F;background:#FFFBEB;border:1px solid #FDE68A;padding:2px 8px;border-radius:999px;font-weight:700;">Zero Ex-Spouse / Tablemate Drama</span>` +
      `</div>` +
      `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">` +
        `<label style="display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:#1F1B18;background:#FFFFFF;border:1px solid #E2D9C8;padding:5px 10px;border-radius:8px;cursor:pointer;"><input type="checkbox" checked disabled style="accent-color:#1B4D3E;cursor:pointer;"/> Divorced Parents Separated Across Room</label>` +
        `<label style="display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:#1F1B18;background:#FFFFFF;border:1px solid #E2D9C8;padding:5px 10px;border-radius:8px;cursor:pointer;"><input type="checkbox" checked disabled style="accent-color:#1B4D3E;cursor:pointer;"/> Grandparents 30ft+ Away From DJ Speakers</label>` +
        `<label style="display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:#1F1B18;background:#FFFFFF;border:1px solid #E2D9C8;padding:5px 10px;border-radius:8px;cursor:pointer;"><input type="checkbox" checked disabled style="accent-color:#1B4D3E;cursor:pointer;"/> Couples &amp; Plus-Ones Kept at Same Table</label>` +
      `</div>` +
      `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:14px;padding:8px 12px;background:#FFFFFF;border:1px solid #EAE0D0;border-radius:10px;font-size:0.75rem;">` +
        `<strong style="color:#8A6508;">Table 1 Clockwise Meal Specimen:</strong>` +
        `<span style="color:#1F1B18;font-weight:700;">🥩 Filet Mignon (4)</span>` +
        `<span style="color:#7D746D;">&bull;</span>` +
        `<span style="color:#1F1B18;font-weight:700;">🐟 Atlantic Salmon (4)</span>` +
        `<span style="color:#7D746D;">&bull;</span>` +
        `<span style="color:#1F1B18;font-weight:700;">🌱 Wild Mushroom Risotto (1)</span>` +
        `<span style="color:#7D746D;">&bull;</span>` +
        `<span style="background:#FEF3C7;color:#92400E;font-weight:800;padding:2px 6px;border-radius:4px;border:1px solid #FDE68A;">🌾 Celiac Alert (Seat #1)</span>` +
      `</div>` +
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-bottom:12px;">` +
        `<div style="background:#FFFFFF;border:1.5px solid #1B4D3E;border-radius:12px;padding:12px 14px;box-shadow:0 4px 14px -4px rgba(27,77,62,0.10);">` +
          `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">` +
            `<span style="font-size:0.68rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;text-transform:uppercase;">Avery 5302 Tented Card &middot; Table 1</span>` +
            `<span style="font-size:0.65rem;background:#EBF4F0;color:#065F46;border:1px solid #10B981;border-radius:999px;padding:1px 6px;font-weight:800;">UNMASKED SPECIMEN</span>` +
          `</div>` +
          `<div style="font-family:var(--font-serif, Georgia, serif);font-size:1.15rem;font-weight:700;color:#181412;line-height:1.2;">Maya Lin</div>` +
          `<div style="font-size:0.78rem;color:#1B4D3E;font-weight:700;margin:3px 0 4px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">` +
            `<span>Clockwise Seat #1 (12:00)</span><span>&bull;</span><span>🥩 Filet Mignon</span>` +
          `</div>` +
          `<div style="font-size:0.70rem;background:#FEF3C7;color:#92400E;padding:2px 7px;border-radius:4px;display:inline-block;font-weight:700;border:1px solid #FDE68A;">🌾 Celiac / Strict Allergy Flagged</div>` +
        `</div>` +
        `<div style="background:#FFFFFF;border:1px solid #E2D9C8;border-radius:12px;padding:12px 14px;box-shadow:0 4px 14px -4px rgba(0,0,0,0.04);">` +
          `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">` +
            `<span style="font-size:0.68rem;font-weight:800;color:#78716C;letter-spacing:0.08em;text-transform:uppercase;">24&Prime;&times;36&Prime; Welcome Sign &middot; 1.4s Lookup Specimen</span>` +
            `<span style="font-size:0.65rem;background:#F5F3FF;color:#6D28D9;border:1px solid #DDD6FE;border-radius:999px;padding:1px 6px;font-weight:800;">20PT SERIF</span>` +
          `</div>` +
          `<div style="font-family:var(--font-serif, Georgia, serif);font-size:0.84rem;color:#181412;line-height:1.55;">` +
            `<strong>Lin, Maya</strong> ................................. Table 1 (Seat #1)<br/>` +
            `<strong>Lin, Robert (Father)</strong> ................ Table 4 (Quiet Zone &bull; Ex-Spouse Buffer)<br/>` +
            `<strong>Vance, Liam</strong> ................................ Table 1 (Seat #2)` +
          `</div>` +
          `<div style="font-size:0.70rem;color:#065F46;font-weight:700;margin-top:4px;">&#10003; 0 Family Conflicts &middot; 54&Prime; Server Aisle Verified</div>` +
        `</div>` +
      `</div>` +
      `<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding-top:4px;font-size:12.5px;color:#1B4D3E;font-weight:700;">` +
        `<span>Table 1 Unmasked Free &bull; Enter email below to unlock Tables 2&ndash;${bp.tableCount} Caterer BEO ($0)</span>` +
        `<span style="color:#78350F;">All-Tables 24&Prime;&times;36&Prime; Sign &amp; Avery Sheets in $7 Event Pack</span>` +
      `</div>` +
      `<button type="button" id="sh-seo-locked-badge-beo" class="sh-locked-spec-badge" data-sh-locked-badge="seo-beo" style="display:none;"></button>` +
      `<a id="sh-seo-locked-badge-pack" class="sh-locked-spec-badge" href="/buy/complete_dossier?target=${encodeURIComponent(pageRow.slug)}&amp;allow_promotion_codes=false" style="display:none;"></a>` +
    `</div>` +
    `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">` +
      `<div id="sh-seo-calc-email-wrap" style="display:flex;gap:8px;align-items:center;flex:1 1 300px;max-width:520px;">` +
        `<input id="sh-seo-calc-email" type="email" placeholder="Your email (saves this ${guestCount}-guest plan + emails Clockwise Caterer Sheet $0)..." onkeydown="if(event.key==='Enter')window.shSaveSeoCalcLead()" style="flex:1 1 auto;min-width:0;height:44px;min-height:44px;padding:8px 12px;border:1px solid #C8A96E;border-radius:8px;font-size:16px;background:#FFFFFF;color:#181412;box-sizing:border-box;" aria-label="Email address to save floorplan spec" />` +
        `<button type="button" id="sh-seo-calc-save-btn" onclick="window.shSaveSeoCalcLead()" style="cursor:pointer;background:#065F46;color:#FFFFFF;border:1px solid #047857;border-radius:8px;height:44px;min-height:44px;padding:8px 14px;font-size:0.82rem;font-weight:800;white-space:nowrap;">Save Plan &amp; Email Caterer Sheet ($0)</button>` +
      `</div>` +
      `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">` +
        `<a id="sh-calc-cta" href="/?preset=${encodeURIComponent(pageRow.slug)}#studio" class="btn btn-primary" style="padding:9px 15px;font-size:0.84rem;">Build This ${guestCount}-Guest Floorplan Free &rarr;</a>` +
        `<a id="sh-calc-buy-cta" href="/buy/complete_dossier?target=${encodeURIComponent(pageRow.slug)}&amp;allow_promotion_codes=false" class="btn btn-secondary" style="padding:9px 13px;font-size:0.84rem;border-color:#C8A96E;color:#78350F;font-weight:800;">Unlock Event Print Pack ($7 &middot; vs. $14 Etsy)</a>` +
      `</div>` +
      `<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:12px;color:#78350F;background:#FFFBEB;border:1px solid #FDE68A;padding:6px 12px;border-radius:8px;margin-top:10px;">` +
        `<span>&#10003; <strong>30-Day Money-Back Guarantee:</strong> Full refund if your caterer or print shop has any issue</span>` +
        `<span style="color:#1B4D3E;font-weight:700;">&#10003; FedEx Office &amp; Staples 24&Prime;&times;36&Prime; Ready (0.125&Prime; Bleed)</span>` +
      `</div>` +
    `</div>` +
    `<div id="sh-seo-calc-status" style="display:none;margin-top:8px;font-size:0.82rem;font-weight:700;color:#065F46;"></div>` +
    `<script>(function(){var gEl=document.getElementById('sh-calc-guests'),sEl=document.getElementById('sh-calc-shape'),wEl=document.getElementById('sh-calc-width');if(!gEl)return;var tracked=false;function trackCalc(g,w,cap){if(tracked)return;tracked=true;var m=document.cookie.match(/(?:^|;\\s*)vs_vid=([^;]+)/),vid=m?decodeURIComponent(m[1]):'';fetch('/api/telemetry/event',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({event_type:'calculate',eventType:'calculate',page_url:window.location.pathname,meta:{js_hydrated:1,vid:vid,vw:window.innerWidth||0,vh:window.innerHeight||0,source:'seo_calc',guests:g,width:w,cap:cap}})}).catch(function(){});fetch('/api/telemetry/event',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({event_type:'view_paywall',eventType:'view_paywall',page_url:window.location.pathname,meta:{js_hydrated:1,vid:vid,vw:window.innerWidth||0,vh:window.innerHeight||0,source:'seo_calc_inline_bridge',guests:g}})}).catch(function(){});}function upd(fromUser){var g=Number(gEl.value)||120,cap=Number(sEl.value)||8,w=Number(wEl.value)||40;if(fromUser)trackCalc(g,w,cap);document.getElementById('sh-calc-g-val').textContent=g;var tbls=Math.ceil((g-2)/cap),sqft=Math.round((g*(cap===10?14:cap===12?13.5:15.5))/50)*50;var len=Math.max(w,Math.ceil(sqft/w/10)*10);var df=Math.max(12,Math.round(Math.sqrt(g*4.5)/3)*3);var sign=g<=115?'3-Col (20pt Serif + Map)':g<=185?'4-Col (18pt Serif + Map)':'5-Col (16pt + Corner QR)';var av=Math.ceil(g/10);document.getElementById('sh-calc-out-room').textContent=w+"' × "+len+"' (~"+(w*len).toLocaleString()+" sq ft)";document.getElementById('sh-calc-out-tables').textContent='1 Sweetheart + '+tbls+' Tables';document.getElementById('sh-calc-out-sign').textContent=sign;document.getElementById('sh-calc-out-avery').textContent=av+' Sheets · '+df+"'×"+df+"' Dance";var cta=document.getElementById('sh-calc-cta');if(cta){cta.textContent='Build This '+g+'-Guest Floorplan Free →';}var emInp=document.getElementById('sh-seo-calc-email');if(emInp){emInp.setAttribute('placeholder','Your email (saves this '+g+'-guest plan + emails Clockwise Caterer Sheet $0)...');}}gEl.addEventListener('input',function(){upd(true);});sEl.addEventListener('change',function(){upd(true);});wEl.addEventListener('change',function(){upd(true);});window.shSaveSeoCalcLead=async function(){var inp=document.getElementById('sh-seo-calc-email'),btn=document.getElementById('sh-seo-calc-save-btn'),st=document.getElementById('sh-seo-calc-status'),bEl=document.getElementById('sh-seo-locked-badge-beo');var em=inp?String(inp.value||'').trim().toLowerCase():'';if(!em||em.indexOf('@')<1){if(inp)inp.focus();return;}var gNow=Number(gEl.value)||120,capNow=Number(sEl.value)||8,tblsNow=Math.ceil((gNow-2)/capNow);if(bEl){bEl.innerHTML='&#10003; Unmasked: Tables 2&ndash;'+(tblsNow+1)+' Clockwise 12:00 Meal Tally ('+gNow+' Covers &middot; Saved to '+em.replace(/[<>&"]/g,'')+')';bEl.setAttribute('data-unmasked','1');}if(btn)btn.textContent='✓ Saved ($0)';trackCalc(gNow,Number(wEl.value)||40,capNow);try{var r=await fetch('/api/vault/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ownerEmail:em,preset:${JSON.stringify(pageRow.slug)},page_url:window.location.pathname,utm_source:'seo_calc'})});var d=await r.json(),vid=(d&&(d.vaultId||d.vault_id))||'SH-4819';if(btn)btn.textContent='✓ Saved ('+vid+')';if(st){st.style.display='block';st.innerHTML='✓ Saved your floorplan spec &amp; Clockwise Caterer Sheet ($0) to <strong>'+em.replace(/[<>&"]/g,'')+'</strong> &mdash; <a href="/?vault='+encodeURIComponent(vid)+'#studio" style="color:#8C2D19;text-decoration:underline;">Open Your Saved Studio Plan ('+vid+') &rarr;</a>';}}catch(_){if(btn)btn.textContent='Save Plan & Email Caterer Sheet ($0)';}};})();</script>` +
  `</div>`;
  const leadersHtml = calcHtml + floorplanPanelHtml;
  const compHtml = (payload.brandA && payload.brandB) ? `<div class="panel" style="padding:20px;margin-bottom:24px;background:#FFFFFF;border-color:#E2D9C8;"><h2 class="serif-display" style="font-size:1.35rem;margin-bottom:12px;">Side-by-Side Comparison: ${escapeHtml(payload.brandA.name)} vs. ${escapeHtml(payload.brandB.name)}</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:14px;"><div style="padding:14px;border-radius:10px;background:#ECFDF5;border:1.5px solid #065F46;"><div style="font-size:0.72rem;font-weight:800;color:#065F46;">RECOMMENDED FOR SMOOTH GUEST FLOW</div><div style="font-size:1.1rem;font-weight:800;color:#181412;margin:4px 0;">${escapeHtml(payload.brandA.name)}</div><div style="font-size:0.95rem;font-weight:800;color:#065F46;">&#10003; Easy Conversation &amp; Fast Service</div><div style="font-size:0.80rem;color:#44403C;margin-top:4px;">Included: ${escapeHtml(payload.brandA.llmsTxt || payload.brandA.strength || '12:00 Meal Sheet + 24x36 Sign')}</div></div><div style="padding:14px;border-radius:10px;background:#FFF1F2;border:1.5px solid #FECDD3;"><div style="font-size:0.72rem;font-weight:800;color:#9F1239;">TRADITIONAL ALTERNATIVE</div><div style="font-size:1.1rem;font-weight:800;color:#181412;margin:4px 0;">${escapeHtml(payload.brandB.name)}</div><div style="font-size:0.95rem;font-weight:800;color:#9F1239;">Requires Extra Manual Setup</div><div style="font-size:0.80rem;color:#44403C;margin-top:4px;">Workflow: ${escapeHtml(payload.brandB.llmsTxt || payload.brandB.weakness || 'Manual Re-Type')}</div></div></div>${Array.isArray(payload.samplePrompts) ? `<div style="font-size:0.84rem;color:#44403C;"><strong>What Couples &amp; Planners Compare:</strong> ${payload.samplePrompts.map(p => escapeHtml(p && p.prompt ? p.prompt : p)).join(' &middot; ')}</div>` : ''}</div>` : '';
  const guideHtml = (Array.isArray(payload.checklist) || payload.codeExample) ? `<div class="panel" style="padding:20px;margin-bottom:24px;background:#FFFFFF;border-color:#E2D9C8;"><h2 class="serif-display" style="font-size:1.35rem;margin-bottom:10px;">Reception Etiquette &amp; Banquet Captain Checklist</h2>${Array.isArray(payload.checklist) ? `<ul style="margin:0 0 14px 18px;display:flex;flex-direction:column;gap:6px;font-size:0.90rem;color:#181412;">${payload.checklist.map(c => `<li>${escapeHtml(c)}</li>`).join('')}</ul>` : ''}${payload.codeExample ? `<pre class="mono" style="background:#FAF6EE;border:1px solid #C8A96E;border-radius:10px;padding:12px;font-size:0.78rem;overflow-x:auto;color:#181412;margin:0;">${escapeHtml(payload.codeExample)}</pre>` : ''}</div>` : '';
  const faqs = Array.isArray(payload.faqs) ? payload.faqs : [];
  const faqHtml = faqs.map(f => `<details class="studio-faq-item" open><summary><span>${escapeHtml(f.question)}</span><span>&#9662;</span></summary><div style="padding-top:8px;font-size:0.92rem;color:#44403C;line-height:1.55;">${escapeHtml(f.answer)}</div></details>`).join('');
  const relHtml = relatedPages.map(r => `<a href="/seo/${escapeHtml(r.slug)}" class="panel" style="padding:14px;text-decoration:none;color:inherit;"><div style="font-size:0.72rem;font-weight:800;color:#8C2D19;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(r.category)}</div><div style="font-weight:700;font-size:0.90rem;color:#181412;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escapeHtml(r.title)}</div></a>`).join('');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SeatHarmony Studio', item: 'https://www.seatharmony.io/' },
          { '@type': 'ListItem', position: 2, name: 'Venue Floorplans & Seating Playbooks', item: 'https://www.seatharmony.io/directory' },
          { '@type': 'ListItem', position: 3, name: pageRow.title, item: `https://www.seatharmony.io/seo/${pageRow.slug}` }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        name: `${pageRow.title} — SeatHarmony Floorplan & 24x36 Sign Calculator`,
        applicationCategory: 'EventPlanningApplication',
        operatingSystem: 'Web',
        description: pageRow.meta_description,
        offers: { '@type': 'Offer', price: '7.00', priceCurrency: 'USD' }
      },
      ...(faqs.length ? [{
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer }
        }))
      }] : [])
    ]
  };
  return [
    renderHead({ title: `${pageRow.title} | SeatHarmony Studio`, description: pageRow.meta_description, canonicalPath: `/seo/${pageRow.slug}`, ogSlug: pageRow.slug, jsonLd }),
    '<body>', renderNavbar(),
    `<main class="container" style="padding:18px 18px 64px;"><div style="max-width:860px;margin:0 auto;"><div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;flex-wrap:wrap;"><a href="/directory" style="font-size:0.78rem;font-weight:700;color:#8C2D19;text-decoration:none;">&larr; All 65+ Floorplans</a><span class="badge badge-emerald" style="font-size:0.72rem;padding:2px 8px;">${escapeHtml(pageRow.category)}</span></div><h1 class="studio-zone-title" style="font-size:clamp(1.45rem,4.5vw,2.2rem);line-height:1.15;margin-bottom:6px;">${escapeHtml(pageRow.title)}</h1><p style="font-size:0.92rem;color:#44403C;line-height:1.45;margin-bottom:12px;max-width:65ch;">Size your ${guestCount}-guest room, table count, and 24&Prime;&times;36&Prime; welcome sign below, then open the interactive floorplan free.</p>${venueHeroHtml}${leadersHtml}${compHtml}${guideHtml}<div class="panel" style="padding:24px;margin-bottom:28px;background:#FAF6EE;border-color:#C8A96E;"><h2 class="serif-display" style="font-size:1.5rem;margin-bottom:6px;">Try This ${guestCount}-Guest Layout With Sample Guests (Free)</h2><p style="font-size:0.92rem;color:#44403C;line-height:1.5;margin-bottom:16px;max-width:62ch;">Open this layout pre-filled with sample wedding families, divorced-parent separation across the dance floor, Clockwise 12:00 Caterer Meal Sheets, and 24&Prime;&times;36&Prime; welcome sign previews.</p><div style="display:flex;gap:12px;flex-wrap:wrap;"><a href="/?preset=${encodeURIComponent(pageRow.slug)}#studio" class="btn btn-primary">Open This Layout in the Seating Studio &rarr;</a><a href="/directory" class="btn btn-secondary">Browse All 65+ Venue Templates</a></div></div>${faqHtml ? `<h2 class="serif-display" style="font-size:1.6rem;margin-bottom:12px;">Common Questions About This Layout</h2><div style="display:flex;flex-direction:column;gap:10px;margin-bottom:32px;">${faqHtml}</div>` : ''}<h3 class="serif-display" style="font-size:1.4rem;margin-bottom:12px;">Related Reception &amp; Event Floorplans</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;">${relHtml}</div></div></main>`,
    renderFooter(), '</body></html>'
  ].join('\n');
}

function renderLegalPage(type = 'privacy') {
  const isPrivacy = type === 'privacy';
  return [
    renderHead({ title: `${isPrivacy ? 'Privacy Policy' : 'Terms of Service'} | SeatHarmony Studio`, description: `SeatHarmony Studio ${isPrivacy ? 'Privacy Policy' : 'Terms of Service'} and guest RSVP data protection standards.`, canonicalPath: isPrivacy ? '/privacy' : '/terms' }),
    '<body>', renderNavbar(),
    `<main class="container" style="padding:56px 24px;max-width:760px;"><h1 class="studio-zone-title" style="margin-bottom:16px;">${isPrivacy ? 'Privacy Policy' : 'Terms of Service'}</h1><div class="panel" style="padding:24px;display:flex;flex-direction:column;gap:14px;font-size:0.9rem;color:#374151;"><p><strong>Effective Date:</strong> October 2026</p><p>SeatHarmony Studio processes guest RSVP names, dietary restrictions, and table assignments strictly to generate your reception floorplan, caterer meal sheet, and printable signage. We never sell or share guest lists with third-party advertisers or wedding vendors.</p><p>All $7 Event Print &amp; Day-Of Execution Pack and $29 Wedding Planner &amp; Venue Pro Pass purchases are one-time payments backed by a 30-day 100% satisfaction guarantee.</p></div></main>`,
    renderFooter(), '</body></html>'
  ].join('\n');
}

function render404Page(missingUrl = '') {
  return [
    renderHead({ title: 'Floorplan Not Found | SeatHarmony Studio', description: 'Return to the interactive SeatHarmony Wedding & Event Floorplan Studio.', canonicalPath: '/404' }),
    '<body>', renderNavbar(),
    `<main class="container" style="padding:72px 24px;text-align:center;max-width:640px;"><span class="badge badge-amber" style="margin-bottom:12px;">404 &middot; TABLE NOT FOUND</span><h1 class="studio-zone-title" style="margin-bottom:12px;">We couldn&rsquo;t find that floorplan (${escapeHtml(missingUrl)})</h1><p style="font-size:0.95rem;color:#374151;margin-bottom:24px;">Jump straight into the interactive 5-Card Reception Floorplan &amp; 24&Prime;&times;36&Prime; Poster Studio or browse our 60+ venue templates.</p><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;"><a href="/#studio" class="btn btn-primary">Open Interactive Studio &rarr;</a><a href="/directory" class="btn btn-secondary">Browse 60+ Floorplans</a></div></main>`,
    renderFooter(), '</body></html>'
  ].join('\n');
}

function renderOgImageSvg({ title = 'SeatHarmony Studio', subtitle = 'Conflict-Free Wedding Seating, Clockwise Caterer Meal Sheet & 24x36 Poster Studio', badge = 'SEATHARMONY STUDIO', scoreText = 'Drama-Free Seating' } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#F8F7F4"/><rect x="36" y="36" width="1128" height="558" rx="24" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="2"/><text x="80" y="120" fill="#1B4D3E" font-family="sans-serif" font-size="22" font-weight="800" letter-spacing="3">${escapeHtml(badge)}</text><text x="80" y="230" fill="#1C1C1C" font-family="Georgia, serif" font-size="52" font-weight="700">${escapeHtml(String(title).slice(0, 44))}</text><text x="80" y="305" fill="#4B5563" font-family="sans-serif" font-size="26">${escapeHtml(String(subtitle).slice(0, 72))}</text><rect x="80" y="420" width="320" height="84" rx="16" fill="#EBF4F0" stroke="#1B4D3E" stroke-width="2"/><text x="112" y="472" fill="#1B4D3E" font-family="sans-serif" font-size="34" font-weight="800">${escapeHtml(scoreText)}</text></svg>`;
}

function renderStudioPage(initialAudit) {
  const plan = (initialAudit && initialAudit.seatingPlan) ? initialAudit.seatingPlan : (initialAudit || {});
  return [
    renderHead({
      title: 'Reception Seating Studio | SeatHarmony',
      description: 'Interactive wedding & event seating chart studio, clockwise 12:00 caterer meal sheets, and print-ready 24x36 signage.',
      canonicalPath: '/studio',
      ogSlug: 'studio'
    }),
    '<body>',
    renderNavbar(),
    '<main id="main-content" class="container" style="padding:16px 18px 48px;max-width:1320px;margin:0 auto;">',
    `  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:12px;">
         <div>
           <h1 class="sh-display-h1" style="font-size:clamp(1.3rem, 2.5vw, 1.8rem);margin:0;line-height:1.2;">The Reception Seating Studio</h1>
           <p style="font-size:0.86rem;color:#57534E;margin:4px 0 0;">Interactive floorplan canvas, clockwise 12:00 caterer meal sheets, and print-ready 24&Prime;&times;36&Prime; welcome signage.</p>
         </div>
         <div style="display:flex;gap:10px;align-items:center;">
           <div style="display:flex;align-items:center;gap:8px;background:#FAF8F5;border:1px solid #E2D9C8;padding:6px 12px;border-radius:10px;">
             <img src="/public/venue-intimate-courtyard-banquet.jpg" alt="Courtyard Banquet Setting" style="width:38px;height:38px;border-radius:6px;object-fit:cover;" />
             <div style="font-size:0.75rem;line-height:1.25;"><strong style="color:#181412;">Courtyard Banquet</strong><br/><span style="color:#78716C;">54&Prime; Clearances</span></div>
           </div>
           <div style="display:flex;align-items:center;gap:8px;background:#FAF8F5;border:1px solid #E2D9C8;padding:6px 12px;border-radius:10px;">
             <img src="/public/ugc-welcome-sign-easel.jpg" alt="Print-Ready Welcome Sign on Brass Easel" style="width:38px;height:38px;border-radius:6px;object-fit:cover;" />
             <div style="font-size:0.75rem;line-height:1.25;"><strong style="color:#181412;">24&Prime;&times;36&Prime; Sign</strong><br/><span style="color:#78716C;">FedEx-Ready ($7)</span></div>
           </div>
         </div>
       </div>`,
    renderZone3InteractiveStudio(plan),
    '</main>',
    renderFooter(),
    renderInteractiveScript(plan),
    '</body></html>'
  ].join('\n');
}

module.exports = { renderHomePage, renderLandingPage, renderStudioPage, renderDirectoryPage, renderSeoDetailPage, renderLegalPage, render404Page, renderOgImageSvg, getVenueVisual };

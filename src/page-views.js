/**
 * SeatHarmony (#2) - 6-Zone Dante Brunelli + UseMolty High-Conviction Landing Page
 * Matches the exact visual hierarchy, vertical rhythm, and 6-Zone sequence from ExactBaseline:
 *   Zone 1: Centered Headline + Subheader + CTA -> Full-Width Split-Screen Visual VSL (3 Scenes) -> 3-Stat Crease Bar
 *   Zone 2: 4-Step Skimmer Walkthrough (68px vertical pacing)
 *   Zone 3: Scroll-Paced 5-Card Interactive Builder (Left) + Sticky 3-KPI & 4-Tab Live Stage (Right)
 *   Zone 4: 3-Layer Contextual Proof Stack (3 Case Studies + Honest B/A Table + 6 Written Reviews + Pricing)
 *   Zone 5: 5-Question Objection-Killer FAQ
 *   Zone 6: Obsidian & Gold Final Closing Hook & Single CTA
 */

const {
  escapeHtml,
  renderHead,
  renderNavbar,
  renderFooter,
  renderInteractiveScript
} = require('./templates');

function renderZone1Hero(plan) {
  const vId = escapeHtml(plan.vaultId || 'SH-4819');
  const isUnl = Boolean(plan.isUnlocked);
  return `
  <!-- ZONE 1: ABOVE THE FOLD - MESSAGE MATCH + VISUAL "VSL" SHOWCASE + CREASE PROOF BAR -->
  <div class="container">
    <section class="studio-zone1-hero" id="grader">
      <!-- UNLOCKED PAYWALL COMMAND BANNER (Auto-shown after $1.99 / $14.99 / $39 Checkout or Unlocked Vault) -->
      <div id="sh-unlocked-command-bar" style="display:${isUnl ? 'flex' : 'none'};background:linear-gradient(135deg,#064E3B 0%,#181412 100%);border:2px solid #10B981;border-radius:14px;padding:12px 16px;margin-bottom:14px;color:#FAF8F5;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;box-shadow:0 12px 28px rgba(6,95,70,0.22);">
        <div>
          <div style="font-size:0.70rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#6EE7B7;">&#10003; UNLOCKED PRO / WEDDING PACK ACTIVE &middot; VAULT #<span id="sh-unlocked-vault-id">${vId}</span></div>
          <div style="font-size:0.86rem;font-weight:700;color:#FFFFFF;">Your Print-Ready 24&Prime;&times;36&Prime; Arch D Poster, Avery 5302 Tent Cards, Signed Clockwise BEO &amp; Live QR App are unlocked:</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a id="sh-cmd-vault-link" href="/vault/${vId}" style="background:#FDE68A;color:#181412;padding:7px 12px;border-radius:8px;font-size:0.74rem;font-weight:800;text-decoration:none;">&#128275; Full Command Center &nearr;</a>
          <a id="sh-cmd-poster-link" href="/print/poster/${vId}" target="_blank" style="background:rgba(255,255,255,0.12);color:#FFFFFF;border:1px solid #6EE7B7;padding:7px 11px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;">&#129703; 24&Prime;&times;36&Prime; Poster PDF &nearr;</a>
          <a id="sh-cmd-avery-link" href="/print/avery-5302/${vId}" target="_blank" style="background:rgba(255,255,255,0.12);color:#FFFFFF;border:1px solid #6EE7B7;padding:7px 11px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;">&#127915; Avery 5302 Cards &nearr;</a>
          <a id="sh-cmd-beo-link" href="/print/beo/${vId}" target="_blank" style="background:rgba(255,255,255,0.12);color:#FFFFFF;border:1px solid #6EE7B7;padding:7px 11px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;">&#127869; Signed BEO PDF &nearr;</a>
          <a id="sh-cmd-qr-link" href="/qr/${vId}" target="_blank" style="background:rgba(255,255,255,0.12);color:#FFFFFF;border:1px solid #6EE7B7;padding:7px 11px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;">&#128241; Guest QR App &nearr;</a>
        </div>
      </div>

      <!-- Top Credibility & Vault Row -->
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:14px;">
        <div class="studio-eyebrow-kicker" style="margin-bottom:0;">
          <span>&#10022; WEDDING &amp; EVENT SEATING STUDIO &middot; ZERO SPLIT COUPLES &middot; 12:00 CATERER BEO &middot; 24&Prime;&times;36&Prime; SIGN</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <div style="display:inline-flex;align-items:center;gap:6px;font-size:0.70rem;font-weight:800;color:#065F46;background:#ECFDF5;border:1px solid #10B981;border-radius:999px;padding:4px 12px;">
            <span>&#10022; 18,420+ Verified Tables</span><span>&bull;</span><span>Clockwise 12:00 BEO</span>
          </div>
          <button type="button" id="hero-vault-pill-btn" onclick="window.shOpenVaultModal()" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-size:0.70rem;font-weight:800;color:#78350F;background:#FAF3E3;border:1px solid #C8A96E;border-radius:999px;padding:4px 12px;" title="Save or Resume Your Event Vault">
            <span>&#128190; Vault <strong id="hero-vault-code-label">#${vId}</strong> &bull; Auto-Saved (Login / Resume &nearr;)</span>
          </button>
        </div>
      </div>

      <!-- Centered 2-Line High-Contrast Headline + Crisp 1-Sentence Sub-Header + Primary CTA -->
      <div style="text-align:center;max-width:960px;margin:0 auto;">
        <h1 id="score-brand-title" class="studio-zone-title" style="font-size:2.55rem;line-height:1.1;margin-bottom:8px;">
          Stop 2 AM Spreadsheets From Ruining Your Reception.<br/>
          <em>Solve Family Drama, Caterer BEOs &amp; 24&Prime;&times;36&Prime; Signs in 30s.</em>
        </h1>
        <p class="studio-zone-sub" style="font-size:0.95rem;color:#44403C;max-width:760px;margin:0 auto 14px;">
          One 30-second pass in <strong>Floorplan Studio</strong> separates divorced parents, locks couples &amp; kids together, and generates your <strong>Clockwise 12:00 Caterer BEO</strong>, <strong>24&Prime;&times;36&Prime; Arch D Welcome Sign + Avery 5302 Cards</strong>, and <strong>Mom Sandbox &amp; QR Lookup</strong>.
        </p>
        <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
          <a href="#studio" class="btn btn-primary" style="padding:12px 24px;font-size:0.90rem;border-radius:12px;">
            <span>Build Your Reception Floorplan Free &middot; Takes 30s &darr;</span>
          </a>
          <a id="hero-buy-btn" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}" class="btn btn-secondary" style="padding:12px 18px;font-size:0.85rem;border-radius:12px;">
            <span>&#9889; Unlock Print &amp; Caterer Pack ($14.99) &rarr;</span>
          </a>
        </div>
      </div>

      <!-- THE VISUAL "VSL": Full-Width Split-Screen Editorial Reception Showcase -->
      <div class="studio-vsl-showcase-frame" id="studio-editorial-vsl-stage">
        <div style="background:#181412;border-bottom:1px solid rgba(200,169,110,0.35);padding:10px 18px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="width:9px;height:9px;border-radius:50%;background:#10B981;display:inline-block;box-shadow:0 0 8px #10B981;"></span>
            <span class="mono" style="font-size:0.70rem;font-weight:800;letter-spacing:0.07em;color:#FDE68A;text-transform:uppercase;">
              LIVE RECEPTION COMPARISON &middot; SPREADSHEET CHAOS VS. SEATHARMONY 30S SOLVE
            </span>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;" id="sh-vsl-scene-pills">
            <button type="button" id="vsl-scene-btn-0" class="vsl-scene-pill active" onclick="window.selectShVslScene(0)">01 &middot; Divorced Parents &amp; 150 Guests</button>
            <button type="button" id="vsl-scene-btn-1" class="vsl-scene-pill" onclick="window.selectShVslScene(1)">02 &middot; Tuscan Banquet &amp; King&rsquo;s Tables</button>
            <button type="button" id="vsl-scene-btn-2" class="vsl-scene-pill" onclick="window.selectShVslScene(2)">03 &middot; Clockwise 12:00 Caterer BEO</button>
          </div>
        </div>

        <div class="studio-vsl-split-grid">
          <div class="studio-vsl-divider-badge" id="vsl-center-delta-badge">98.4/100 HARMONY &middot; 410PX SIGHTLINE BUFFER</div>

          <div class="studio-vsl-half trap-before">
            <img id="vsl-img-left" class="vsl-portrait-bg" src="/public/editorial-hero.jpg" alt="2 AM Spreadsheet and Canva Seating Chaos" width="620" height="440" />
            <div style="position:relative;z-index:4;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
              <span style="background:rgba(153,27,27,0.94);color:#FFFFFF;border:1px solid #FCA5A5;padding:5px 12px;border-radius:999px;font-size:0.72rem;font-weight:800;letter-spacing:0.04em;">&#10005; BEFORE &middot; SPREADSHEET &amp; CANVA TRAP</span>
              <span id="vsl-trap-tag" class="mono" style="background:rgba(24,20,18,0.90);color:#FCA5A5;padding:4px 10px;border-radius:999px;font-size:0.68rem;font-weight:700;">2 Family Clashes + 5 Hrs Canva</span>
            </div>
            <div style="position:relative;z-index:4;background:rgba(24,20,18,0.90);backdrop-filter:blur(10px);border:1px solid rgba(252,165,165,0.45);border-radius:12px;padding:9px 12px;color:#FAF8F5;">
              <div style="font-size:0.71rem;font-weight:800;color:#FCA5A5;text-transform:uppercase;letter-spacing:0.05em;" id="vsl-left-title">2 AM Spreadsheet &amp; Canva Text-Box Chaos</div>
              <div style="font-size:0.78rem;color:#E6E0D6;margin-top:2px;line-height:1.36;" id="vsl-left-desc">Divorced parents accidentally placed in direct sightline across the dance floor, plus 5 hours spent manually re-typing 150 names into Canva after last-minute RSVP drops.</div>
            </div>
          </div>

          <div class="studio-vsl-half harmony-after" style="border-left:2px solid #C8A96E;">
            <img id="vsl-img-right" class="vsl-portrait-bg" src="/public/editorial-segment-1.jpg" alt="SeatHarmony Conflict-Free Reception Floorplan and 24x36 Sign" width="620" height="440" />
            <div style="position:relative;z-index:4;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
              <span style="background:rgba(6,95,70,0.95);color:#FFFFFF;border:1px solid #6EE7B7;padding:5px 12px;border-radius:999px;font-size:0.72rem;font-weight:800;letter-spacing:0.04em;">&#10022; AFTER &middot; SEATHARMONY 30S SOLVE</span>
              <span id="vsl-right-season-pill" style="background:#181412;color:#FDE68A;border:1px solid #C8A96E;padding:4px 10px;border-radius:999px;font-size:0.70rem;font-weight:800;">Estate Reception &bull; 98/100 Harmony</span>
            </div>
            <div style="position:relative;z-index:4;background:rgba(24,20,18,0.92);backdrop-filter:blur(12px);border:1.5px solid #C8A96E;border-radius:12px;padding:9px 12px;color:#FAF8F5;display:flex;flex-direction:column;gap:4px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
                <span style="font-size:0.71rem;font-weight:800;color:#FDE68A;text-transform:uppercase;letter-spacing:0.05em;" id="vsl-right-rx-title">&#10003; Eleanor (Table 2) &amp; Richard (Table 5) Separated 410px</span>
                <button type="button" onclick="window.shLoadVslSceneIntoStudio()" style="cursor:pointer;border:1px solid #6EE7B7;font-size:0.67rem;font-weight:800;color:#6EE7B7;background:rgba(6,95,70,0.45);padding:2px 8px;border-radius:999px;" id="vsl-right-ticket-pill">Load Scene in Studio &darr;</button>
              </div>
              <div style="font-size:0.77rem;color:#E6E0D6;line-height:1.35;" id="vsl-right-desc">All Couples &amp; Kids Locked Together &bull; Clockwise 12:00 Seat #1 Caterer BEO &bull; Print-Ready 24&Prime;&times;36&Prime; Arch D Welcome Sign + Avery 5302 Place Cards.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- FOLD-1 CREASE SOCIAL PROOF STRIP (~100px Height) -->
      <div class="studio-vsl-crease-bar" id="studio-crease-proof-bar">
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="serif-display tabular" style="font-size:1.75rem;color:#FDE68A;white-space:nowrap;flex-shrink:0;">18,420+</span>
          <div style="font-size:0.76rem;color:#D6CFC2;line-height:1.35;"><strong style="color:#FFFFFF;">Verified Receptions &amp; Galas</strong><br/>Zero split couples or sightline clashes</div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="serif-display tabular" style="font-size:1.75rem;color:#6EE7B7;white-space:nowrap;flex-shrink:0;">6.5 Hrs</span>
          <div style="font-size:0.76rem;color:#D6CFC2;line-height:1.35;"><strong style="color:#FFFFFF;">Saved on Wedding Week</strong><br/>Skip manual Canva text-box re-typing &amp; BEO sheets</div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="serif-display tabular" style="font-size:1.75rem;color:#FAF8F5;white-space:nowrap;flex-shrink:0;">1 Pass</span>
          <div style="font-size:0.76rem;color:#D6CFC2;line-height:1.35;"><strong style="color:#FFFFFF;">Studio + BEO + 24&Prime;&times;36&Prime; Sign + QR</strong><br/>All 4 reception deliverables unlocked together</div>
        </div>
      </div>
    </section>
  </div>`;
}

function renderZone2Walkthrough() {
  return `
  <!-- =======================================================================
       ZONE 2: "HOW FLOORPLAN STUDIO WORKS" - THE 4-STEP SKIMMER WALKTHROUGH (FOLD 2)
       ======================================================================= -->
  <section class="studio-zone-section" id="studio-zone2-how-it-works">
    <div class="container">
      <div style="text-align:center;">
        <div class="studio-eyebrow-kicker">HOW FLOORPLAN STUDIO WORKS &middot; 1 PASS INCLUDES ALL 4</div>
        <h2 class="studio-zone-title">Four connected steps. <em>One reception pass.</em></h2>
        <p class="studio-zone-sub">
          Start in <strong>1. Floorplan Studio</strong>: every household, table shape, and family rule you set automatically updates your <strong>2. Clockwise Caterer BEO</strong>, <strong>3. 24&Prime;&times;36&Prime; Welcome Sign &amp; Avery 5302 Cards</strong>, and <strong>4. Bonus Mom Sandbox &amp; QR Lookup</strong>.
        </p>
      </div>

      <div class="studio-how-grid">
        <div class="studio-how-card" style="cursor:pointer;" onclick="window.scrollToShCard(2)">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span class="studio-how-num">&#9312;</span>
            <span class="mono" style="font-size:0.68rem;font-weight:800;color:#78350F;background:#FAF3E3;padding:2px 8px;border-radius:999px;">15s Studio Input &darr;</span>
          </div>
          <h3 style="font-size:1.02rem;font-weight:800;color:#181412;margin:0;">1. Coupled Household Paste</h3>
          <p style="font-size:0.82rem;color:#44403C;line-height:1.45;margin:0;">
            Paste messy Zola/Knot rows like <strong>&ldquo;Dr. &amp; Mrs. James Chen (Halibut)&rdquo;</strong> or <strong>&ldquo;Sarah &amp; Mark + 2 Kids (GF)&rdquo;</strong>. Couples and children lock together automatically.
          </p>
        </div>

        <div class="studio-how-card" style="cursor:pointer;" onclick="window.scrollToShCard(3)">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span class="studio-how-num">&#9313;</span>
            <span class="mono" style="font-size:0.68rem;font-weight:800;color:#065F46;background:#ECFDF5;padding:2px 8px;border-radius:999px;">410px Sightline</span>
          </div>
          <h3 style="font-size:1.02rem;font-weight:800;color:#181412;margin:0;">2. 35ms Conflict &amp; Sightline Solver</h3>
          <p style="font-size:0.82rem;color:#44403C;line-height:1.45;margin:0;">
            Separates divorced parents by 2+ tables across the dance floor, keeps ex-partners apart, and seats <strong>Grandparents &gt;30ft from the DJ subwoofer</strong> in 35ms.
          </p>
        </div>

        <div class="studio-how-card" style="cursor:pointer;" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}document.getElementById('studio-bespoke-artifact-stage').scrollIntoView({behavior:'smooth'});">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span class="studio-how-num">&#9314;</span>
            <span class="mono" style="font-size:0.68rem;font-weight:800;color:#8C2D19;background:#FDF2EE;padding:2px 8px;border-radius:999px;">12:00 = Seat #1 &nearr;</span>
          </div>
          <h3 style="font-size:1.02rem;font-weight:800;color:#181412;margin:0;">3. Clockwise Caterer BEO Sheet</h3>
          <p style="font-size:0.82rem;color:#44403C;line-height:1.45;margin:0;">
            Numbers every table clockwise from <strong>12 o&rsquo;clock (facing the Dance Floor)</strong> with Filet/Halibut/Vegan icons, red anaphylactic allergy flags, and High-Chair/Wheelchair swaps.
          </p>
        </div>

        <div class="studio-how-card" style="cursor:pointer;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:4px;flex-wrap:wrap;">
            <span class="studio-how-num">&#9315;</span>
            <div style="display:flex;gap:4px;flex-wrap:wrap;">
              <span class="mono" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}document.getElementById('studio-bespoke-artifact-stage').scrollIntoView({behavior:'smooth'});" style="font-size:0.65rem;font-weight:800;color:#78350F;background:#FAF3E3;padding:2px 7px;border-radius:999px;border:1px solid #C8A96E;">24&Prime;&times;36&Prime; Sign &nearr;</span>
              <span class="mono" onclick="if(window.shSetActiveTab){window.shSetActiveTab('qr');}document.getElementById('studio-bespoke-artifact-stage').scrollIntoView({behavior:'smooth'});" style="font-size:0.65rem;font-weight:800;color:#065F46;background:#ECFDF5;padding:2px 7px;border-radius:999px;border:1px solid #A7F3D0;">+QR Lookup &nearr;</span>
            </div>
          </div>
          <h3 style="font-size:1.02rem;font-weight:800;color:#181412;margin:0;">4. 24&Prime;&times;36&Prime; Sign + Bonus QR &amp; Mom Link</h3>
          <p style="font-size:0.82rem;color:#44403C;line-height:1.45;margin:0;">
            Export a print-ready <strong>24&Prime;&times;36&Prime; Arch D Welcome Sign PDF</strong> (<code>0.125&Prime;</code> bleed), <strong>Avery 5302 folded tent cards</strong>, plus your restricted <strong>Mom Sandbox &amp; QR Lookup</strong>.
          </p>
        </div>
      </div>

      <div style="text-align:center;margin-top:22px;">
        <a href="#studio" style="font-size:0.84rem;font-weight:800;color:#78350F;text-decoration:underline;">
          &darr; Scroll into 1. Interactive 5-Card Floorplan Studio Below
        </a>
      </div>
    </div>
  </section>`;
}

function renderZone3InteractiveStudio(plan) {
  const vId = escapeHtml(plan.vaultId || 'SH-4819');
  const activeRules = plan.rules || plan.conflictRules || [];
  const rulesHtml = activeRules.map(r => `
    <div style="padding:8px 10px;border-radius:10px;background:#FAF8F5;border:1px solid #E2D9C8;font-size:0.76rem;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
      <div style="min-width:0;flex:1;">
        <div style="font-weight:800;color:#181412;">${(r.type === 'keep_apart' || r.type === 'must_keep_apart') ? '🔴 ' : (r.type === 'zone_quiet' ? '🔇 ' : '🟢 ')}${escapeHtml(r.label)}</div>
        <div style="font-size:0.70rem;color:#57534E;">${escapeHtml(r.detail)}</div>
      </div>
      <span class="badge badge-emerald" style="font-size:0.62rem;flex-shrink:0;">&#10003; ${escapeHtml(r.status)}</span>
    </div>`).join('');

  return `
  <!-- ZONE 3: SCROLL-PACED 5-CARD BUILDER + STICKY LIVE STAGE (FOLD 3) -->
  <section class="studio-zone-section" id="studio" style="padding-top:24px;">
    <div class="container">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:8px;">
        <div>
          <div class="studio-eyebrow-kicker">INTERACTIVE RECEPTION BUILDER &middot; NO SIGNUP REQUIRED &middot; AUTO-SAVED TO VAULT #<span id="sh-studio-vault-code">${vId}</span></div>
          <h2 class="studio-zone-title" style="margin-bottom:4px;">Customize 5 quick cards. <em>Watch your floorplan, caterer BEO &amp; 24&Prime;&times;36&Prime; poster update live.</em></h2>
        </div>
        <div style="display:inline-flex;align-items:center;gap:8px;font-size:0.76rem;font-weight:800;color:#065F46;background:#ECFDF5;border:1px solid #A7F3D0;padding:6px 14px;border-radius:999px;">
          <span id="sh-endowed-progress-label">64% Assembled (Card 1 of 5)</span>
          <span style="width:92px;height:8px;background:#E6E0D6;border-radius:999px;overflow:hidden;display:inline-block;"><span id="sh-endowed-progress-fill" style="display:block;width:64%;height:100%;background:linear-gradient(90deg,#C8A96E,#10B981);transition:width 0.25s ease;"></span></span>
        </div>
      </div>

      <!-- Live Status Toast + Mobile Quick-Jump to Live Canvas -->
      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
        <div id="sh-live-toast" style="background:#181412;color:#FDE68A;border:1px solid #C8A96E;padding:8px 14px;border-radius:999px;font-size:0.76rem;font-weight:700;display:inline-flex;align-items:center;gap:8px;max-width:100%;">
          &#10022; Live Reception Studio Ready: Click any 2 seats on the floorplan to swap, or customize Cards 1&ndash;5
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" onclick="window.shOpenVaultModal()" class="studio-tap-chip" style="border-color:#C8A96E;background:#FAF3E3;color:#78350F;font-weight:800;">&#128190; Save / Login to My Event (#<span id="sh-btn-vault-id">${vId}</span>)</button>
          <a href="#studio-bespoke-artifact-stage" onclick="var el=document.getElementById('sh-stat-harmony')||document.getElementById('studio-bespoke-artifact-stage');if(el){window.scrollTo({top:el.getBoundingClientRect().top+window.pageYOffset-110,behavior:'auto'});}return false;" class="mobile-jump-canvas-btn" style="font-size:0.74rem;font-weight:800;color:#181412;background:#FAF3E3;border:1.5px solid #C8A96E;padding:6px 12px;border-radius:999px;text-decoration:none;">&#128065; Jump to Live Stage &darr;</a>
        </div>
      </div>

      <div class="studio-scroll-builder-grid">
        <!-- LEFT COLUMN: Spacious Scroll-Paced 5-Card Co-Creation Builder -->
        <div class="studio-hybrid-wizard" id="sh-csv-parse-preview">

          <!-- CARD 1 OF 5: Couple / Event Names, Reception Venue & Preset Scenario -->
          <div class="studio-wizard-step active" id="sh-wizard-step-1" data-step="1">
            <button type="button" class="studio-wizard-header" onclick="window.scrollToShCard(1)">
              <span class="studio-wizard-step-title"><span style="color:#8C2D19;">&#9679; Step 1 of 5:</span><span>Couple / Event Title, Reception Preset &amp; Venue Layout</span></span>
              <span class="studio-wizard-step-summary" id="sh-wizard-summary-1">${escapeHtml(plan.title || "Maya & Liam's Estate Reception")}</span>
            </button>
            <div class="studio-wizard-body">
              <div style="margin-bottom:10px;">
                <span class="studio-field-label">1A. Load Verified Reception or Event Preset (Or Clear Demo to Start Your Own Blank Guest List):</span>
                <div class="studio-chip-group">
                  <button type="button" class="studio-tap-chip preset-chip active" data-preset="estate-150" data-domain="supabase.com" onclick="window.loadPresetScenario('estate-150', this)">&#128141; Estate Reception (Divorced Parents + 6 Allergies)</button>
                  <button type="button" class="studio-tap-chip preset-chip" data-preset="tuscan-banquet-80" onclick="window.loadPresetScenario('tuscan-banquet-80', this)">&#127863; Tuscan Long Banquet &amp; King&rsquo;s</button>
                  <button type="button" class="studio-tap-chip preset-chip" data-preset="planner-beo-sandbox" onclick="window.loadPresetScenario('planner-beo-sandbox', this)">&#128203; Planner BEO &amp; Mom Sandbox</button>
                  <button type="button" class="studio-tap-chip preset-chip" data-preset="vip-exec-dinner" onclick="window.loadPresetScenario('vip-exec-dinner', this)">&#129346; B2B VIP Exec Dinner</button>
                  <button type="button" class="studio-tap-chip preset-chip" data-preset="charity-gala-300" onclick="window.loadPresetScenario('charity-gala-300', this)">&#127895; 300-Guest Charity Gala</button>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px;margin-bottom:8px;">
                <div>
                  <label for="sh-couple-title-input" class="studio-field-label">1B. Couple / Event Display Title (Syncs Crest &amp; 24&Prime;&times;36&Prime; Sign)</label>
                  <input id="sh-couple-title-input" type="text" class="grader-input" value="${escapeHtml(plan.title || "Maya & Liam's Estate Reception")}" oninput="window.shUpdateCoupleTitle(this.value)" />
                </div>
                <div>
                  <label for="sh-venue-name-input" class="studio-field-label">1C. Venue &amp; Room Name (Syncs BEO &amp; Poster)</label>
                  <input id="sh-venue-name-input" type="text" class="grader-input" value="${escapeHtml(plan.venueName || 'Rosewood Conservatory (80ft × 50ft)')}" oninput="window.shUpdateVenueName(this.value)" />
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
                <input id="sh-crest-logo-input" type="text" class="grader-input" style="flex:1 1 200px;font-size:0.76rem;padding:6px 10px;" placeholder="1D. Optional Planner / Monogram Crest Logo URL (or use auto M&amp;L Crest)" oninput="window.shUpdateCrestLogo(this.value)" aria-label="Optional Monogram or Planner Crest Logo URL" />
                <button type="button" class="studio-tap-chip" onclick="var el=document.getElementById('sh-crest-logo-input');if(el){el.value=el.value?'':'/favicon.svg';window.shUpdateCrestLogo(el.value);}">&#10022; Toggle Sample Crest Logo</button>
              </div>
              <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:6px;background:#FAF6EE;border:1px solid #E2D9C8;border-radius:8px;padding:6px 10px;">
                <div style="display:flex;gap:6px;flex-wrap:wrap;">
                  <button type="button" id="sh-add-table-btn" class="studio-tap-chip" onclick="window.shAddNewTable()">+ Add Table (Tbl 9..20)</button>
                  <button type="button" id="sh-clear-demo-btn" class="studio-tap-chip" style="border-color:#8C2D19;color:#8C2D19;" onclick="window.shStartBlankList()">&#10024; Clear Demo Guests (Start My Blank List)</button>
                </div>
                <button type="button" onclick="window.scrollToShCard(2)" style="background:#181412;color:#FDE68A;border:1px solid #C8A96E;border-radius:7px;padding:5px 11px;font-size:0.71rem;font-weight:800;cursor:pointer;">Next: Add Guests &amp; CSV &darr;</button>
              </div>
            </div>
          </div>

          <!-- CARD 2 OF 5: Coupled Household Parser, Bulk CSV Paste/Upload & Atomic Family Lock -->
          <div class="studio-wizard-step" id="sh-wizard-step-2" data-step="2">
            <button type="button" class="studio-wizard-header" onclick="window.scrollToShCard(2)">
              <span class="studio-wizard-step-title"><span style="color:#8C2D19;">&#9679; Step 2 of 5:</span><span>Coupled Household Parser, Bulk CSV Paste &amp; Dietary Tags</span></span>
              <span class="studio-wizard-step-summary" id="sh-wizard-summary-2">26 / 26 Households Locked</span>
            </button>
            <div class="studio-wizard-body">
              <div style="margin-bottom:8px;">
                <label for="domain-input" class="studio-field-label">2A. Paste Messy RSVP Line (Auto-Parses Couples, Kids, Entr&eacute;es, Allergies &amp; Wheelchair):</label>
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                  <input id="domain-input" type="text" class="grader-input" style="flex:1 1 210px;" value="Sarah &amp; Mark Miller + 1 Kid (GF)" aria-label="Add messy household string" />
                  <select id="sh-target-table-select" class="grader-input" style="flex:0 1 150px;" aria-label="Target Table">
                    <option value="auto">Auto (Selected / Open)</option>
                    <option value="0">Table 1 (Sweetheart)</option>
                    <option value="1" selected>Table 2 (Bride Family)</option>
                    <option value="2">Table 3 (College Crew)</option>
                    <option value="3">Table 4 (Groom Family)</option>
                    <option value="4">Table 5 (Dad's Side)</option>
                    <option value="5">Table 6 (SF Founders)</option>
                    <option value="6">Table 7 (High School)</option>
                    <option value="7">Table 8 (Out-of-Town)</option>
                  </select>
                  <button type="button" class="btn btn-primary" style="padding:8px 14px;font-size:0.80rem;" onclick="window.shAddMessyHousehold()">+ Seat Household</button>
                </div>
              </div>
              <div style="margin-bottom:8px;">
                <span class="studio-field-label">2B. Or 1-Tap Test Real Zola / Knot RSVP Rows ( Or Open Bulk Spreadsheet / CSV Importer):</span>
                <div class="studio-chip-group">
                  <button type="button" class="studio-tap-chip" onclick="window.shQuickFillHousehold('Dr. &amp; Mrs. James Chen (Halibut)')">+ Dr. &amp; Mrs. James Chen (Halibut)</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shQuickFillHousehold('Lucas &amp; Chloe Martin + 2 Kids (GF)')">+ Martin Family + 2 Kids (GF)</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shQuickFillHousehold('Aunt Patricia + Guest (Wheelchair, Vegan)')">+ Aunt Patricia (♿ Wheelchair)</button>
                  <button type="button" id="sh-toggle-bulk-csv-btn" class="studio-tap-chip" style="border-color:#065F46;background:#ECFDF5;color:#065F46;font-weight:800;" onclick="window.shToggleBulkCsvDrawer()">&#128203; Bulk Paste Spreadsheet / Upload CSV (10&ndash;250 Guests)</button>
                </div>
              </div>
              <!-- 2C. Bulk Spreadsheet / CSV Paste & File Upload Drawer -->
              <div id="sh-bulk-csv-drawer" style="display:none;background:#FAF6EE;border:1.5px solid #C8A96E;border-radius:10px;padding:10px;margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
                  <span style="font-size:0.72rem;font-weight:800;color:#181412;">2C. Paste Multi-Line RSVP List (Excel, Google Sheets, Zola, The Knot) or Upload <code>.CSV</code>:</span>
                  <label class="studio-tap-chip" style="cursor:pointer;background:#FFFFFF;border-color:#181412;font-weight:800;">
                    &#128194; Upload .CSV / .TXT File
                    <input id="sh-csv-file-input" type="file" accept=".csv,.txt" style="display:none;" onchange="window.shHandleCsvFileUpload(this)" />
                  </label>
                </div>
                <textarea id="sh-bulk-csv-textarea" rows="4" class="grader-input" style="width:100%;font-family:var(--font-mono);font-size:0.74rem;margin-bottom:8px;" placeholder="Paste 1 household or guest per line...">Dr. &amp; Mrs. James Chen (Halibut)
Sarah &amp; Mark Miller + 2 Kids (GF)
Aunt Patricia + Guest (Wheelchair, Vegan)
David &amp; Elena Rostova (Filet, Peanut Allergy)</textarea>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <button type="button" id="sh-bulk-append-btn" class="btn btn-primary" style="padding:7px 14px;font-size:0.76rem;" onclick="window.shProcessBulkCsv(false)">&#9889; Append &amp; Auto-Seat List</button>
                  <button type="button" id="sh-bulk-replace-btn" class="studio-tap-chip" style="border-color:#8C2D19;color:#8C2D19;font-weight:800;" onclick="window.shProcessBulkCsv(true)">&#10024; Replace Demo With My List</button>
                </div>
              </div>
              <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;">
                <button type="button" onclick="window.scrollToShCard(1)" style="background:transparent;color:#57534E;border:1px solid #D6CFC2;border-radius:7px;padding:5px 10px;font-size:0.69rem;font-weight:700;cursor:pointer;">&uarr; Card 1 Preset</button>
                <button type="button" onclick="window.scrollToShCard(3)" style="background:#181412;color:#FDE68A;border:1px solid #C8A96E;border-radius:7px;padding:5px 11px;font-size:0.71rem;font-weight:800;cursor:pointer;">Next: Family Conflict Rules &darr;</button>
              </div>
            </div>
          </div>

          <!-- CARD 3 OF 5: Family Diplomacy, Sightline Buffers & 35ms Auto-Solver -->
          <div class="studio-wizard-step" id="sh-wizard-step-3" data-step="3">
            <button type="button" class="studio-wizard-header" onclick="window.scrollToShCard(3)">
              <span class="studio-wizard-step-title"><span style="color:#8C2D19;">&#9679; Step 3 of 5:</span><span>Divorced-Parent Sightline Buffer &amp; Family Rules</span></span>
              <span class="studio-wizard-step-summary" id="sh-wizard-summary-3">${activeRules.length || 5} Rules Active &bull; 0 Clashes</span>
            </button>
            <div class="studio-wizard-body">
              <div id="sh-rules-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">${rulesHtml}</div>
              <div style="background:#FAF6EE;border:1px solid #E2D9C8;border-radius:10px;padding:8px 10px;margin-bottom:10px;">
                <label for="sh-custom-rule-input" class="studio-field-label">3B. Add Your Own Family Separation or Acoustic Zone Rule:</label>
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                  <input id="sh-custom-rule-input" type="text" class="grader-input" style="flex:1 1 180px;font-size:0.76rem;" placeholder="e.g. Keep Uncle Bob &amp; Aunt Linda 2+ tables apart" value="Keep Uncle Bob &amp; Aunt Linda 2+ tables apart" />
                  <select id="sh-custom-rule-type" class="grader-input" style="flex:0 1 155px;font-size:0.75rem;" aria-label="Rule Type">
                    <option value="must_keep_apart">&#128308; Keep 2+ Tables Apart</option>
                    <option value="zone_quiet">&#128263; Seat in Quiet Zone</option>
                    <option value="must_sit_together">&#128994; Must Sit Together</option>
                  </select>
                  <button type="button" class="studio-tap-chip active" onclick="window.shAddCustomRule()">+ Add Rule &amp; Solve</button>
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
                <button id="sh-solve-btn" type="button" class="btn btn-primary" style="flex:1;padding:10px 14px;font-size:0.82rem;" onclick="window.shRunSimulatedAnnealingSolver()">&#9889; Auto-Solve All Tables (35ms Conflict-Free Engine)</button>
              </div>
              <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;">
                <button type="button" onclick="window.scrollToShCard(2)" style="background:transparent;color:#57534E;border:1px solid #D6CFC2;border-radius:7px;padding:5px 10px;font-size:0.69rem;font-weight:700;cursor:pointer;">&uarr; Card 2 Households</button>
                <button type="button" onclick="window.scrollToShCard(4)" style="background:#181412;color:#FDE68A;border:1px solid #C8A96E;border-radius:7px;padding:5px 11px;font-size:0.71rem;font-weight:800;cursor:pointer;">Next: Table Shapes &amp; Mom Link &darr;</button>
              </div>
            </div>
          </div>

          <!-- CARD 4 OF 5: Table Shape Morphing, Clockwise 12:00 Seat #1 & Mom Sandbox -->
          <div class="studio-wizard-step" id="sh-wizard-step-4" data-step="4">
            <button type="button" class="studio-wizard-header" onclick="window.scrollToShCard(4)">
              <span class="studio-wizard-step-title"><span style="color:#8C2D19;">&#9679; Step 4 of 5:</span><span>Table Shape Morphing, Entr&eacute;e Rings &amp; Mom Sandbox</span></span>
              <span class="studio-wizard-step-summary" id="sh-wizard-summary-4">Table 2 &bull; ROUND &bull; 12:00 BEO</span>
            </button>
            <div class="studio-wizard-body">
              <div style="margin-bottom:8px;">
                <span class="studio-field-label">4A. Select Table to Inspect or Customize (Or Click &ldquo;+ Add Table&rdquo;):</span>
                <div class="studio-chip-group" id="sh-card4-table-pills">
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(0)">Tbl 1 (VIP)</button>
                  <button type="button" class="studio-tap-chip active" onclick="window.shSelectTable(1)">Tbl 2 (Mom)</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(2)">Tbl 3 (College)</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(3)">Tbl 4 (Groom)</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(4)">Tbl 5 (Dad)</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(5)">Tbl 6 (Work)</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(6)">Tbl 7 (Friends)</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shSelectTable(7)">Tbl 8 (Seniors)</button>
                </div>
              </div>
              <div style="margin-bottom:8px;">
                <span class="studio-field-label">4B. Morph Selected Table Shape (Preserves Coupled Seats &amp; 12:00 Anchor):</span>
                <div class="studio-chip-group" id="sh-card4-shape-pills">
                  <button type="button" class="studio-tap-chip active" data-shape="round" onclick="window.shMorphSelectedTable('round')">&#9679; 60&Prime; Round</button>
                  <button type="button" class="studio-tap-chip" data-shape="sweetheart" onclick="window.shMorphSelectedTable('sweetheart')">&#128149; Sweetheart (1-Sided)</button>
                  <button type="button" class="studio-tap-chip" data-shape="banquet_2sided" onclick="window.shMorphSelectedTable('banquet_2sided')">&#9644; 8ft Banquet (2-Sided)</button>
                  <button type="button" class="studio-tap-chip" data-shape="kings_4sided" onclick="window.shMorphSelectedTable('kings_4sided')">&#8862; King&rsquo;s Table (4-Sided)</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shRotateSelectedTable()">&#8635; Rotate 45&deg;</button>
                  <button id="sh-lock-table-btn" type="button" class="studio-tap-chip" onclick="window.shToggleLockSelectedTable()">&#128274; Lock Table</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shAddNewTable()">+ Add Table</button>
                </div>
              </div>
              <div style="margin-bottom:10px;">
                <span class="studio-field-label">4C. Seat Ring Color Mode &amp; Restricted Mom Link:</span>
                <div style="display:flex;gap:6px;flex-wrap:wrap;">
                  <button id="sh-ring-harmony" type="button" class="studio-tap-chip active" onclick="window.shSetRingMode('harmony')">&#128994; Harmony &amp; Allergy Rings</button>
                  <button id="sh-ring-meal" type="button" class="studio-tap-chip" onclick="window.shSetRingMode('meal')">&#129385; Caterer Entr&eacute;e Symbols (&#9670;&#9679;&#9650;&#9733;)</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shCopyMomSandboxLink()">&#128117; Copy &ldquo;Mom Sandbox&rdquo; Link (Tables 1&ndash;3 Only)</button>
                </div>
              </div>
              <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;">
                <button type="button" onclick="window.scrollToShCard(3)" style="background:transparent;color:#57534E;border:1px solid #D6CFC2;border-radius:7px;padding:5px 10px;font-size:0.69rem;font-weight:700;cursor:pointer;">&uarr; Card 3 Rules</button>
                <button type="button" onclick="window.scrollToShCard(5)" style="background:#181412;color:#FDE68A;border:1px solid #C8A96E;border-radius:7px;padding:5px 11px;font-size:0.71rem;font-weight:800;cursor:pointer;">Next: 24&Prime;&times;36&Prime; Poster &amp; Export &darr;</button>
              </div>
            </div>
          </div>

          <!-- CARD 5 OF 5: 24"x36" Arch D Poster Theme, Avery 5302 Place Cards & Instant Export -->
          <div class="studio-wizard-step" id="sh-wizard-step-5" data-step="5">
            <button type="button" class="studio-wizard-header" onclick="window.scrollToShCard(5)">
              <span class="studio-wizard-step-title"><span style="color:#8C2D19;">&#9679; Step 5 of 5:</span><span>24&Prime;&times;36&Prime; Welcome Poster Theme, Avery 5302 &amp; Export</span></span>
              <span class="studio-wizard-step-summary" id="sh-wizard-summary-5">ALABASTER &bull; A&ndash;Z</span>
            </button>
            <div class="studio-wizard-body">
              <div style="margin-bottom:8px;">
                <span class="studio-field-label">5A. 24&Prime;&times;36&Prime; Arch D Poster Foil &amp; Editorial Theme:</span>
                <div class="studio-chip-group" id="sh-card5-theme-pills">
                  <button type="button" class="studio-tap-chip active" data-theme="alabaster" onclick="window.shSetActiveTab('poster');window.shSetPosterMode(null,'alabaster')">&#10022; Warm Alabaster &amp; Gold</button>
                  <button type="button" class="studio-tap-chip" data-theme="obsidian" onclick="window.shSetActiveTab('poster');window.shSetPosterMode(null,'obsidian')">Obsidian Black-Tie Gold</button>
                  <button type="button" class="studio-tap-chip" data-theme="sage" onclick="window.shSetActiveTab('poster');window.shSetPosterMode(null,'sage')">Botanical Sage &amp; Ivory</button>
                </div>
              </div>
              <div style="margin-bottom:10px;">
                <span class="studio-field-label">5B. Poster Guest Sort, Print Preview Studios &amp; BEO Export:</span>
                <div class="studio-chip-group" id="sh-card5-sort-pills">
                  <button type="button" class="studio-tap-chip active" data-sort="alphabetical" onclick="window.shSetActiveTab('poster');window.shSetPosterMode('alphabetical',null)">Sort A&ndash;Z by Last Name</button>
                  <button type="button" class="studio-tap-chip" data-sort="by_table" onclick="window.shSetActiveTab('poster');window.shSetPosterMode('by_table',null)">Sort by Table Number</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shExportBeoCsv()">&#11015; Free Caterer BEO (.CSV)</button>
                  <a id="sh-card5-poster-studio-link" href="/print/poster/${vId}" target="_blank" class="studio-tap-chip" style="text-decoration:none;font-weight:800;color:#78350F;border-color:#C8A96E;">&#129703; 24&Prime;&times;36&Prime; Print Studio &nearr;</a>
                  <a id="sh-card5-avery-studio-link" href="/print/avery-5302/${vId}" target="_blank" class="studio-tap-chip" style="text-decoration:none;font-weight:800;color:#065F46;border-color:#10B981;">&#127915; Avery 5302 Cards &nearr;</a>
                </div>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding-top:6px;border-top:1px solid #EFEAE1;">
                <button type="button" onclick="window.scrollToShCard(4)" style="background:transparent;color:#57534E;border:1px solid #D6CFC2;border-radius:7px;padding:5px 10px;font-size:0.69rem;font-weight:700;cursor:pointer;">&uarr; Card 4 Table Shapes</button>
                <a id="sh-card5-buy-btn" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}" style="background:#065F46;color:#FFFFFF;border:1px solid #10B981;border-radius:8px;padding:7px 14px;font-size:0.74rem;font-weight:800;text-decoration:none;box-shadow:0 4px 12px rgba(6,95,70,0.2);">
                  &#10003; Unlock Print-Ready 24&Prime;&times;36&Prime; PDF + Avery 5302 ($14.99) &rarr;
                </a>
              </div>
            </div>
          </div>

          <!-- Dark Obsidian 24-Hour Vault Hold & Simplified Checkout / Save Bar -->
          <div id="sh-vault-checkout-bar" style="background:#181412;border:1.5px solid #C8A96E;border-radius:14px;padding:14px 16px;color:#FFFFFF;display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
              <div style="flex:1 1 240px;">
                <div style="font-size:0.82rem;font-weight:800;color:#FAF8F5;" id="sh-vault-bar-headline">
                  &#128274; Reception Vault #${vId} Reserved for ${escapeHtml(plan.title || "Maya & Liam's Estate Reception")}
                </div>
                <div style="font-size:0.70rem;color:#D6CFC2;margin-top:2px;">
                  Auto-saved as you edit. Save to your email to resume from any device, or unlock <strong>all 4 print &amp; caterer deliverables</strong> ($14.99 once &bull; 30 days of free edits).
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                <button type="button" onclick="window.shOpenVaultModal()" style="cursor:pointer;background:rgba(255,255,255,0.10);color:#FDE68A;border:1px solid #C8A96E;border-radius:10px;padding:9px 12px;font-size:0.74rem;font-weight:800;">
                  &#128190; Save / Email Link
                </button>
                <a id="sh-vault-buy-pack-btn" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}" style="background:linear-gradient(135deg,#FDE68A 0%,#C8A96E 100%);color:#181412;border:none;border-radius:10px;padding:10px 15px;font-size:0.79rem;font-weight:800;text-decoration:none;box-shadow:0 4px 14px rgba(200,169,110,0.35);">
                  &#10022; Unlock Wedding Print &amp; BEO Pack ($14.99) &rarr;
                </a>
                <a id="sh-vault-buy-pro-btn" href="/buy/pro_b2b?target=estate-150&amp;vault=${vId}" style="background:rgba(255,255,255,0.08);color:#FAF8F5;border:1px solid rgba(200,169,110,0.55);border-radius:10px;padding:9px 12px;font-size:0.73rem;font-weight:700;text-decoration:none;">
                  Planner Pro ($39/mo)
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Sticky 3-KPI Strip + Live 4-Tab Reception Kit Stage -->
        <div class="studio-sticky-right-col">
          <div class="studio-baseline-kpi-grid" id="sh-stat-harmony">
            <div class="studio-kpi-card">
              <div class="studio-kpi-label">1. Room Harmony Score</div>
              <div class="studio-kpi-val" id="sh-kpi-harmony" style="color:#065F46;"><span id="score-csov">${plan.harmonyScore || 98}</span>/100</div>
              <div class="studio-kpi-sub" id="sh-stat-conflicts">&#10003; 0 Sightline Clashes</div>
            </div>
            <div class="studio-kpi-card">
              <div class="studio-kpi-label">2. Seated VIP Roster</div>
              <div class="studio-kpi-val" id="sh-stat-guests">62 Guests (8 Tbls)</div>
              <div class="studio-kpi-sub" id="sh-stat-households-sub">&#10003; 26 Coupled &bull; 150 Scale</div>
            </div>
            <div class="studio-kpi-card">
              <div class="studio-kpi-label">3. Caterer BEO &amp; Print</div>
              <div class="studio-kpi-val" id="sh-stat-meals">12:00 Seat #1</div>
              <div class="studio-kpi-sub" id="sh-stat-allergies-sub">&#10003; 6 Allergies + Avery 5302</div>
            </div>
          </div>

          <!-- Dark Obsidian & Gold Live 4-Tab Reception Stage -->
          <div class="studio-bespoke-stage" id="studio-bespoke-artifact-stage">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
              <span class="mono" style="font-size:0.66rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#FDE68A;">
                &#10022; LIVE 4-TAB RECEPTION STAGE &middot; <span id="sh-stage-venue-label">${escapeHtml(plan.venueName || 'Rosewood Conservatory')}</span>
              </span>
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                <a href="#studio" onclick="var el=document.getElementById('studio');if(el){window.scrollTo({top:el.getBoundingClientRect().top+window.pageYOffset-110,behavior:'auto'});}return false;" class="mobile-jump-canvas-btn" style="font-size:0.64rem;font-weight:800;color:#181412;background:#FDE68A;border:1px solid #C8A96E;padding:3px 9px;border-radius:999px;text-decoration:none;">&uarr; Back to 5-Card Builder</a>
                <span id="sh-mom-sandbox-badge" class="badge badge-cyan" style="font-size:0.64rem;cursor:pointer;" onclick="window.shToggleMomSandbox()">&#128117; Mom Sandbox: OFF (Full Edit)</span>
              </div>
            </div>

            <!-- 4-Tab Switcher (All 4 Tabs Free to Preview Live!) -->
            <div class="studio-stage-tabs" role="tablist" aria-label="SeatHarmony 4-Tab Operational Kit">
              <button id="sh-tab-floorplan" type="button" class="studio-stage-tab-btn tab-btn active" data-tab="llmsTxt" onclick="window.shSetActiveTab('floorplan')">&#127919; 1. Floorplan</button>
              <button id="sh-tab-beo" type="button" class="studio-stage-tab-btn tab-btn" data-tab="jsonLd" onclick="window.shSetActiveTab('beo')">&#127869; 2. Caterer BEO</button>
              <button id="sh-tab-poster" type="button" class="studio-stage-tab-btn" onclick="window.shSetActiveTab('poster')">&#129703; 3. 24&Prime;&times;36&Prime; Sign</button>
              <button id="sh-tab-qr" type="button" class="studio-stage-tab-btn" onclick="window.shSetActiveTab('qr')">&#128241; 4. QR Lookup</button>
            </div>

            <!-- Foreground Specimen Card -->
            <div class="studio-foreground-specimen" id="studio-foreground-specimen">
              <!-- Prominent 54px × 54px Left Monogram / Planner Crest Header Block -->
              <div id="specimen-header-block" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;margin-bottom:10px;border-bottom:1.5px solid #EAE2D3;background:linear-gradient(180deg,#FAF8F5 0%,#FFFFFF 100%);border-radius:10px;">
                <div style="display:flex;align-items:center;gap:11px;min-width:0;flex:1;">
                  <div id="specimen-logo-badge" title="Couple Monogram / Planner Crest Badge" style="width:54px;height:54px;border-radius:13px;background:linear-gradient(135deg,#181412 0%,#2E241E 100%);border:2px solid #C8A96E;color:#FDE68A;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 6px 16px rgba(24,20,18,0.16);overflow:hidden;position:relative;padding:2px;">
                    <span id="specimen-logo-monogram" style="display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;">
                      <span id="specimen-logo-monogram-initials" style="font-family:var(--font-serif);font-size:1.18rem;font-weight:700;letter-spacing:0.03em;color:#FDE68A;">M&amp;L</span>
                      <span id="specimen-logo-monogram-sub" style="font-family:var(--font-mono);font-size:0.46rem;font-weight:800;letter-spacing:0.08em;color:#C8A96E;margin-top:2px;text-transform:uppercase;">EST. 2026</span>
                    </span>
                    <img id="specimen-logo-img" src="" alt="Planner or Couple Crest Logo" style="display:none;width:100%;height:100%;object-fit:contain;background:#FFFFFF;padding:3px;border-radius:9px;" />
                  </div>
                  <div style="min-width:0;flex:1;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                      <div id="specimen-salon-crest" style="font-size:0.64rem;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:#8C2D19;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">&#10022; ${escapeHtml((plan.venueName || 'Rosewood Conservatory').toUpperCase())}</div>
                      <span id="specimen-harmony-pill" class="badge badge-emerald" style="font-size:0.62rem;padding:2px 8px;flex-shrink:0;">&#10022; ${plan.harmonyScore || 98}/100 HARMONY</span>
                    </div>
                    <div id="specimen-client-headline" class="serif-display" style="font-size:1.14rem;color:#181412;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(plan.title || "Maya & Liam's Estate Reception")}</div>
                    <div id="specimen-tagline-sub" style="display:none;"></div>
                    <div id="specimen-meta-sub" class="mono" style="font-size:0.62rem;color:#57534E;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">98/100 Harmony &bull; 62 Guests (8 Tbls) &bull; 12:00 Seat #1 BEO</div>
                  </div>
                </div>
              </div>

              <!-- PANE 1: Interactive Floorplan & Selected Table Inspector -->
              <div id="sh-pane-floorplan" style="display:block;">
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;margin-bottom:8px;font-size:0.74rem;color:#57534E;">
                  <span><strong style="color:#8C2D19;">&#9679; Red Dot</strong> = Seat #1 (12 O&rsquo;Clock Caterer Anchor) &middot; Click any 2 seats to swap</span>
                  <span style="color:#065F46;font-weight:800;">&#10003; Click Meal, Allergy or &#10005; Drop in Inspector Below</span>
                </div>
                <div style="width:100%;overflow:hidden;border-radius:12px;border:1px solid #EAE2D3;background:#FAF7F2;margin-bottom:10px;">
                  <svg id="sh-floorplan-svg" viewBox="0 0 940 560" style="width:100%;height:auto;display:block;" role="img" aria-label="Interactive Wedding & Event Floorplan Canvas"></svg>
                </div>
                <div id="sh-selected-table-box" style="padding:12px;border-radius:10px;background:#FAF7F2;border:1px solid #E2D9C8;"></div>
              </div>

              <!-- PANE 2: Clockwise Caterer BEO Sheet -->
              <div id="sh-pane-beo" style="display:none;">
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;">
                  <div>
                    <span class="badge badge-emerald" style="margin-bottom:4px;">TAB 2 &middot; 12 O&rsquo;CLOCK = SEAT #1 &middot; LIVE MANIFEST</span>
                    <h3 class="serif-display" style="font-size:1.35rem;">Chef David&rsquo;s Clockwise Caterer &amp; Allergy BEO</h3>
                  </div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap;">
                    <button type="button" class="btn btn-secondary" style="padding:6px 11px;font-size:0.74rem;" onclick="window.shExportBeoCsv()">&#11015; Free BEO (.CSV)</button>
                    <a id="sh-open-beo-studio-link" href="/print/beo/${vId}" target="_blank" class="btn btn-secondary" style="padding:6px 11px;font-size:0.74rem;">&#128424; Signed BEO Print View &nearr;</a>
                    <a id="sh-pane-beo-buy-link" href="/buy/flash_pass?target=estate-150&amp;vault=${vId}" class="btn btn-primary" style="padding:6px 11px;font-size:0.74rem;">Unlock Signed BEO ($1.99)</a>
                  </div>
                </div>
                <div id="sh-beo-container" style="max-height:480px;overflow-y:auto;"></div>
              </div>

              <!-- PANE 3: 24"x36" Welcome Sign & Avery 5302 Place Cards -->
              <div id="sh-pane-poster" style="display:none;">
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;">
                  <div style="display:flex;gap:5px;flex-wrap:wrap;">
                    <button type="button" class="studio-tap-chip active" data-poster-sort="alphabetical" onclick="window.shSetPosterMode('alphabetical',null)">Sort A&ndash;Z (Last Name)</button>
                    <button type="button" class="studio-tap-chip" data-poster-sort="by_table" onclick="window.shSetPosterMode('by_table',null)">Sort by Table</button>
                    <button type="button" class="studio-tap-chip active" data-poster-theme="alabaster" onclick="window.shSetPosterMode(null,'alabaster')">Alabaster</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="obsidian" onclick="window.shSetPosterMode(null,'obsidian')">Obsidian</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="sage" onclick="window.shSetPosterMode(null,'sage')">Sage</button>
                  </div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap;">
                    <a id="sh-open-poster-studio-link" href="/print/poster/${vId}" target="_blank" class="btn btn-secondary" style="padding:6px 10px;font-size:0.73rem;">&#129703; 24&Prime;&times;36&Prime; Print Studio &nearr;</a>
                    <a id="sh-open-avery-studio-link" href="/print/avery-5302/${vId}" target="_blank" class="btn btn-secondary" style="padding:6px 10px;font-size:0.73rem;">&#127915; Avery 5302 Sheet &nearr;</a>
                    <a id="sh-pane-poster-buy-link" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}" class="btn btn-primary" style="padding:6px 11px;font-size:0.73rem;">&#11015; Unlock 300-DPI PDF ($14.99)</a>
                  </div>
                </div>
                <div id="sh-poster-preview" style="max-height:350px;overflow-y:auto;margin-bottom:10px;"></div>
                <div id="sh-avery-preview"></div>
              </div>

              <!-- PANE 4: Cocktail-Hour Mobile QR Guest Lookup & Printable Foyer Sign -->
              <div id="sh-pane-qr" style="display:none;">
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;">
                  <div>
                    <span class="badge badge-emerald" style="margin-bottom:4px;">TAB 4 &middot; ZERO FOYER BOTTLENECK &middot; REAL SCANNABLE QR</span>
                    <h3 class="serif-display" style="font-size:1.35rem;">Cocktail-Hour QR Bar Sign &amp; Instant Guest Lookup</h3>
                  </div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap;">
                    <a id="sh-open-qr-app-link" href="/qr/${vId}" target="_blank" class="btn btn-primary" style="padding:6px 11px;font-size:0.73rem;">&#128241; Open Standalone Guest Mobile App &nearr;</a>
                    <button type="button" class="btn btn-secondary" style="padding:6px 11px;font-size:0.73rem;" onclick="window.shCopyMomSandboxLink()">&#128117; Copy Mom Sandbox Link</button>
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:10px;">
                  <div style="background:#FAF7F2;border:2px double #C8A96E;border-radius:12px;padding:12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;">
                    <div style="font-size:0.62rem;font-weight:800;letter-spacing:0.12em;color:#78350F;text-transform:uppercase;">8&Prime;&times;10&Prime; BAR EASEL QR CARD (LIVE SCANNABLE)</div>
                    <div class="serif-display" style="font-size:1.15rem;color:#181412;">Scan to Find Your Seat</div>
                    <img id="sh-live-qr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&amp;color=181412&amp;bgcolor=FFFFFF&amp;data=${encodeURIComponent(`https://www.citationforge.io/qr/${plan.vaultId || 'SH-4819'}`)}" alt="Scannable Cocktail Hour QR Code" width="96" height="96" style="background:#FFF;padding:6px;border-radius:8px;border:1px solid #D6CBB8;" />
                    <div style="font-size:0.70rem;color:#57534E;">Guests scan with phone camera &rarr; opens <a id="sh-qr-short-url" href="/qr/${vId}" target="_blank" style="color:#8C2D19;font-weight:800;">/qr/${vId}</a></div>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <label for="sh-qr-search" class="studio-field-label" style="margin-bottom:0;">Test Live Guest Phone Search (Sub-5ms Fuzzy Match):</label>
                    <input id="sh-qr-search" type="text" class="grader-input" placeholder="Type guest name or table (e.g. Eleanor, Chen, Miller, Table 2)..." oninput="window.shFilterQrLookup()" aria-label="Search guest name" />
                    <div id="sh-qr-results" style="display:flex;flex-direction:column;gap:6px;max-height:245px;overflow-y:auto;"></div>
                  </div>
                </div>
              </div>
              <pre id="compiler-code-output" style="display:none;" aria-hidden="true"># Supabase SeatHarmony Manifest\n{"@graph":[]}</pre>
            </div>

            <!-- Stage Footer -->
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;font-size:0.68rem;color:#D6CFC2;">
              <span>&#10022; Click Tabs 1&ndash;4 above or open full print views (<a id="sh-footer-vault-link" href="/vault/${vId}" style="color:#6EE7B7;font-weight:800;">Command Center /vault/${vId} &nearr;</a>)</span>
              <a href="/directory" style="color:#FDE68A;text-decoration:underline;font-weight:700;">Browse 60+ Venue Floorplans &nearr;</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SAVE / LOGIN / RESUME EVENT VAULT MODAL -->
    <div id="sh-vault-modal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(24,20,18,0.76);backdrop-filter:blur(6px);align-items:center;justify-content:center;padding:16px;" onclick="if(event.target===this)window.shCloseVaultModal()">
      <div style="background:#FAF8F5;border:2px solid #C8A96E;border-radius:18px;max-width:760px;width:100%;padding:24px;box-shadow:0 24px 64px rgba(0,0,0,0.45);color:#181412;max-height:92vh;overflow-y:auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;border-bottom:1px solid #E2D9C8;padding-bottom:12px;margin-bottom:16px;">
          <div>
            <div style="font-size:0.68rem;font-weight:800;letter-spacing:0.10em;text-transform:uppercase;color:#8C2D19;">&#128190; PERSISTENT CLOUD RECEPTION VAULT &amp; PASSWORDLESS LOGIN</div>
            <h3 class="serif-display" style="font-size:1.55rem;margin-top:2px;">Save Your Reception or Resume a Saved Event</h3>
          </div>
          <button type="button" onclick="window.shCloseVaultModal()" style="background:#EFECE6;border:1px solid #D6CFC2;border-radius:8px;padding:6px 12px;font-weight:800;cursor:pointer;">&#10005; Close</button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:16px;">
          <!-- Left: Save Current Event to Email + Vault Code -->
          <div style="background:#FFFFFF;border:1.5px solid #C8A96E;border-radius:14px;padding:16px;">
            <div class="badge badge-emerald" style="margin-bottom:6px;">1. SAVE CURRENT FLOORPLAN (<span id="sh-modal-vault-code">#${vId}</span>)</div>
            <h4 class="serif-display" style="font-size:1.18rem;margin-bottom:6px;">Link Email &amp; Get All 5 Live URLs</h4>
            <p style="font-size:0.78rem;color:#57534E;margin-bottom:10px;">Every seat swap and household you add is saved to our SQLite vault so you can edit on your laptop, share with your coordinator, or print 48 hours before the wedding.</p>
            <label for="sh-vault-email-input" class="studio-field-label">Your Bride / Groom / Planner Email:</label>
            <input id="sh-vault-email-input" type="email" class="grader-input" style="width:100%;margin-bottom:8px;" placeholder="maya@example.com" value="${escapeHtml(plan.ownerEmail || '')}" />
            <label for="sh-vault-pin-input" class="studio-field-label">Optional 4-Digit Edit PIN (Locks Out Unwanted Edits):</label>
            <input id="sh-vault-pin-input" type="text" maxlength="8" class="grader-input" style="width:100%;margin-bottom:10px;" placeholder="2026" value="2026" />
            <button type="button" id="sh-vault-save-submit-btn" class="btn btn-primary" style="width:100%;padding:10px;" onclick="window.shSaveVaultToServer()">&#128190; Save My Event &amp; Generate Magic Links</button>
            <div id="sh-vault-saved-links-box" style="margin-top:10px;padding:10px;border-radius:10px;background:#FAF6EE;border:1px solid #E2D9C8;font-size:0.74rem;">
              <div style="font-weight:800;color:#065F46;margin-bottom:4px;">&#10003; Active Links for Vault #<span id="sh-modal-links-vault-id">${vId}</span>:</div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <a id="sh-modal-link-vault" href="/vault/${vId}" style="color:#8C2D19;font-weight:700;">&#128275; Inside-the-Paywall Command Center (/vault/${vId}) &nearr;</a>
                <a id="sh-modal-link-poster" href="/print/poster/${vId}" target="_blank" style="color:#181412;font-weight:700;">&#129703; 24&Prime;&times;36&Prime; Arch D Poster Studio (/print/poster/${vId}) &nearr;</a>
                <a id="sh-modal-link-avery" href="/print/avery-5302/${vId}" target="_blank" style="color:#181412;font-weight:700;">&#127915; Avery 5302 Place Cards Sheet (/print/avery-5302/${vId}) &nearr;</a>
                <a id="sh-modal-link-beo" href="/print/beo/${vId}" target="_blank" style="color:#181412;font-weight:700;">&#127869; Official Signed Caterer BEO (/print/beo/${vId}) &nearr;</a>
                <a id="sh-modal-link-qr" href="/qr/${vId}" target="_blank" style="color:#065F46;font-weight:700;">&#128241; Cocktail-Hour Guest QR Lookup (/qr/${vId}) &nearr;</a>
              </div>
            </div>
          </div>

          <!-- Right: Resume / Sign In by Email or Vault Code -->
          <div style="background:#FFFFFF;border:1px solid #E2D9C8;border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div class="badge badge-amber" style="margin-bottom:6px;">2. RETURNING USER / COORDINATOR LOGIN</div>
              <h4 class="serif-display" style="font-size:1.18rem;margin-bottom:6px;">Load a Saved Reception Vault</h4>
              <p style="font-size:0.78rem;color:#57534E;margin-bottom:10px;">Enter the email address you saved with OR your Vault Code (e.g. <code>SH-4819</code>) to restore your tables, guest list, and unlocked print files:</p>
              <label for="sh-vault-lookup-input" class="studio-field-label">Email Address or Vault Code (e.g. SH-4819):</label>
              <input id="sh-vault-lookup-input" type="text" class="grader-input" style="width:100%;margin-bottom:10px;" placeholder="maya@example.com or SH-4819" />
              <button type="button" id="sh-vault-lookup-btn" class="btn btn-secondary" style="width:100%;padding:10px;" onclick="window.shLookupSavedVault()">&#128275; Load My Saved Event</button>
              <div id="sh-vault-lookup-status" style="margin-top:10px;font-size:0.76rem;color:#44403C;"></div>
            </div>
            <div style="margin-top:14px;padding-top:10px;border-top:1px solid #EFEAE1;font-size:0.72rem;color:#57534E;">
              <strong>Need to test the Unlocked Paywall Experience right now?</strong><br/>
              <a href="/vault/SH-4819?unlocked=1" style="color:#065F46;font-weight:800;text-decoration:underline;">&#9889; Preview Unlocked Reception Command Center (/vault/SH-4819) &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderZone4ProofStackAndPricing() {
  return `
  <!-- ZONE 4: THE "SELL" - 3-LAYER CONTEXTUAL PROOF STACK + PRICING (FOLD 4) -->
  <section class="studio-zone-section" id="beo-proof" style="background:#F4EFE6;border-top:1px solid var(--border-warm);border-bottom:1px solid var(--border-warm);">
    <div class="container">
      <div style="text-align:center;">
        <div class="studio-eyebrow-kicker">PROVEN AT RECEPTIONS &middot; 3-LAYER PROOF STACK</div>
        <h2 class="studio-zone-title">Built for 150-guest weddings, luxury planners, <em>and VIP galas.</em></h2>
        <p class="studio-zone-sub">See how couples, full-service coordinators, and event directors turn a messy RSVP spreadsheet into a conflict-free room, caterer BEO, and 24&Prime;&times;36&Prime; welcome sign in 30 seconds.</p>
      </div>

      <!-- ROW 1: 3 Contextual Case Study Cards -->
      <div class="studio-proof-cases-grid">
        <div class="studio-proof-case-card">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;"><span class="badge badge-amber">SCENARIO A &middot; 150-GUEST BRIDE</span><span style="font-size:0.78rem;font-weight:800;color:#065F46;">6.5 Hrs Saved</span></div>
            <h3 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">Divorced Parents + 28 Plus-Ones</h3>
            <p style="font-size:0.84rem;color:#44403C;line-height:1.48;">Maya &amp; Liam imported 150 guests from Zola with 2 divorced parent pairs and 9 children. SeatHarmony separated Tables 2 and 5 by 410px across the dance floor and exported their 24&Prime;&times;36&Prime; FedEx sign in 40 seconds.</p>
          </div>
          <div style="padding-top:10px;border-top:1px solid #EFEAE1;font-size:0.75rem;font-weight:800;color:#181412;">&#10022; Plan Used: Wedding Print &amp; BEO Pack ($14.99 once)</div>
        </div>
        <div class="studio-proof-case-card" style="border-color:#C8A96E;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;"><span class="badge badge-emerald">SCENARIO B &middot; LUXURY PLANNER</span><span style="font-size:0.78rem;font-weight:800;color:#065F46;">0 Meal Mix-Ups</span></div>
            <h3 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">Clockwise 12:00 BEO + Mom Sandbox</h3>
            <p style="font-size:0.84rem;color:#44403C;line-height:1.48;">Coordinator Chloe sent the Mother of the Bride a restricted sandbox link for Tables 1&ndash;3 while locking the Groom&rsquo;s side, then handed the banquet chef a Clockwise 12-o&rsquo;clock BEO with 4 anaphylactic allergy flags.</p>
          </div>
          <div style="padding-top:10px;border-top:1px solid #EFEAE1;font-size:0.75rem;font-weight:800;color:#78350F;">&#10022; Plan Used: Planner Pro Studio ($39/mo &bull; 14 Weddings)</div>
        </div>
        <div class="studio-proof-case-card">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;"><span class="badge badge-cyan">SCENARIO C &middot; 300-GUEST GALA</span><span style="font-size:0.78rem;font-weight:800;color:#065F46;">0 Foyer Line</span></div>
            <h3 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">VIP Sponsor Tables + QR Lookup</h3>
            <p style="font-size:0.84rem;color:#44403C;line-height:1.48;">Gala Director Elena seated 30 tables of 10 with Gold Sponsors anchored closest to the podium, printed two 24&Prime;&times;36&Prime; A&ndash;Z easel signs, and let 300 guests look up their seat via QR code during cocktail hour.</p>
          </div>
          <div style="padding-top:10px;border-top:1px solid #EFEAE1;font-size:0.75rem;font-weight:800;color:#181412;">&#10022; Plan Used: Planner Pro Studio ($39/mo)</div>
        </div>
      </div>

      <!-- ROW 2: Honest Before & After Comparison Table -->
      <div class="studio-ba-table-wrap">
        <table class="ba-table">
          <thead>
            <tr style="background:#181412;color:#FAF8F5;">
              <th style="width:24%;color:#FDE68A;">Reception Workflow</th>
              <th style="width:38%;color:#FCA5A5;">&#10005; Before: Spreadsheet + Canva Status Quo</th>
              <th style="width:38%;color:#6EE7B7;">&#10022; After: SeatHarmony Studio</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Couples &amp; Kids Grouping</strong></td><td style="color:#57534E;">Manual row copying; plus-ones accidentally split across tables.</td><td style="font-weight:700;color:#181412;">Atomic household lock parses <code>&ldquo;Sarah &amp; Mark + 2 Kids&rdquo;</code> automatically.</td></tr>
            <tr><td><strong>Divorced Parents &amp; Exes</strong></td><td style="color:#57534E;">Visual guessing; accidental back-to-back sightline clashes across dance floor.</td><td style="font-weight:700;color:#181412;">35ms Simulated Annealing enforces &ge;2-table (410px) sightline buffer.</td></tr>
            <tr><td><strong>Caterer BEO Meal Sheet</strong></td><td style="color:#57534E;">Flat headcount; banquet servers ask guests who ordered Filet vs. Halibut.</td><td style="font-weight:700;color:#181412;">Clockwise <code>12:00 = Seat #1</code> BEO with severe allergy &amp; High-Chair flags.</td></tr>
            <tr><td><strong>24&Prime;&times;36&Prime; Welcome Poster</strong></td><td style="color:#57534E;">5 hours re-typing 150 names into Canva text boxes after last-minute drops.</td><td style="font-weight:700;color:#181412;">Instant 300-DPI 24&Prime;&times;36&Prime; Arch D PDF (<code>0.125&Prime;</code> bleed) + Avery 5302 cards.</td></tr>
          </tbody>
        </table>
      </div>

      <!-- ROW 3: 6 Specific Written Reviews -->
      <div class="studio-reviews-grid">
        <div class="studio-review-card"><p style="font-size:0.84rem;color:#181412;font-style:italic;">&ldquo;We had 3 last-minute RSVP drops 48 hours before our reception. Instead of re-aligning 150 names in Canva, we clicked export and sent the updated 24&Prime;&times;36&Prime; PDF straight to FedEx.&rdquo;</p><div style="font-size:0.75rem;font-weight:800;color:#78350F;">&#9733;&#9733;&#9733;&#9733;&#9733; &middot; Hannah &amp; Devon R., 165-Guest Reception (Napa, CA)</div></div>
        <div class="studio-review-card"><p style="font-size:0.84rem;color:#181412;font-style:italic;">&ldquo;Our venue caterer literally hugged our coordinator when she handed him the Clockwise 12-o&rsquo;clock BEO sheet with Seat #1 marked and the severe peanut allergy highlighted in red.&rdquo;</p><div style="font-size:0.75rem;font-weight:800;color:#78350F;">&#9733;&#9733;&#9733;&#9733;&#9733; &middot; Claire M., Bride, 140 Guests (Chicago, IL)</div></div>
        <div class="studio-review-card"><p style="font-size:0.84rem;color:#181412;font-style:italic;">&ldquo;The Avery 5302 place card PDF put a tiny diamond for Filet and circle for Halibut on the front and printed the celiac warning upside-down on the back tent fold. Genius.&rdquo;</p><div style="font-size:0.75rem;font-weight:800;color:#78350F;">&#9733;&#9733;&#9733;&#9733;&#9733; &middot; Lauren K., Lead Wedding Planner (Charleston, SC)</div></div>
        <div class="studio-review-card"><p style="font-size:0.84rem;color:#181412;font-style:italic;">&ldquo;My wife wanted to rearrange our extended family tables at midnight without touching our daughter&rsquo;s friends. The Mom Sandbox link locked Tables 4&ndash;8 and saved our weekend.&rdquo;</p><div style="font-size:0.75rem;font-weight:800;color:#78350F;">&#9733;&#9733;&#9733;&#9733;&#9733; &middot; Robert T., Father of the Bride (Boston, MA)</div></div>
        <div class="studio-review-card"><p style="font-size:0.84rem;color:#181412;font-style:italic;">&ldquo;We used the VIP Exec Dinner preset to pair 8 AE reps with 16 enterprise prospects while keeping two rival CTOs at opposite ends of the private dining room.&rdquo;</p><div style="font-size:0.75rem;font-weight:800;color:#78350F;">&#9733;&#9733;&#9733;&#9733;&#9733; &middot; Marcus V., VP Field Marketing (San Francisco, CA)</div></div>
        <div class="studio-review-card"><p style="font-size:0.84rem;color:#181412;font-style:italic;">&ldquo;For our 300-guest hospital gala, guests scanned the QR sign at cocktail hour, typed 3 letters of their last name, and walked straight to their table. Zero foyer bottleneck.&rdquo;</p><div style="font-size:0.75rem;font-weight:800;color:#78350F;">&#9733;&#9733;&#9733;&#9733;&#9733; &middot; Elena S., Charity Gala Director (New York, NY)</div></div>
      </div>

      <!-- PRICING / CHECKOUT CARDS -->
      <div id="pricing" style="padding-top:36px;">
        <div style="text-align:center;max-width:680px;margin:0 auto 20px;">
          <div class="studio-eyebrow-kicker">PAY ONCE OR PLANNER PRO &middot; ZERO WATERMARK</div>
          <h3 class="serif-display" style="font-size:2.1rem;">Design your entire reception free. Unlock print &amp; caterer files when ready.</h3>
        </div>
        <div class="pricing-grid">
          <div class="panel" style="padding:22px;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
            <div>
              <span class="badge badge-cyan" style="margin-bottom:8px;">SINGLE-SHEET BEO PASS</span>
              <h4 class="serif-display" style="font-size:1.45rem;">Caterer BEO &amp; QR Lookup</h4>
              <div class="tabular" style="font-size:2.1rem;font-weight:800;margin:6px 0;">$1.99 <span style="font-size:0.82rem;font-weight:600;color:#78716C;">once</span></div>
              <p style="font-size:0.84rem;color:#44403C;margin-bottom:12px;">Ideal if you only need the Clockwise 12-o&rsquo;clock Caterer BEO CSV/PDF and mobile QR lookup link.</p>
              <ul style="list-style:none;font-size:0.82rem;color:#44403C;display:flex;flex-direction:column;gap:6px;">
                <li>&#10003; Clockwise <code>Seat 1..N</code> Caterer BEO (.CSV &amp; PDF)</li>
                <li>&#10003; Severe Allergy &amp; High-Chair Manifest</li>
                <li>&#10003; Live Mobile QR Guest Lookup Link</li>
              </ul>
            </div>
            <a href="/buy/flash_pass?target=estate-150" class="btn btn-secondary" style="width:100%;">Unlock Single BEO Pass ($1.99)</a>
          </div>
          <div class="panel" style="padding:22px;border:2px solid #8C2D19;display:flex;flex-direction:column;justify-content:space-between;gap:14px;position:relative;">
            <span class="badge badge-rose" style="position:absolute;top:-12px;right:18px;background:#8C2D19;color:#FFF;">MOST POPULAR FOR COUPLES</span>
            <div>
              <span class="badge badge-amber" style="margin-bottom:8px;">ONE-TIME WEDDING PACK &middot; NO SUBSCRIPTION</span>
              <h4 class="serif-display" style="font-size:1.45rem;">Complete Wedding Print &amp; Caterer Pack</h4>
              <div class="tabular" style="font-size:2.1rem;font-weight:800;margin:6px 0;color:#8C2D19;">$14.99 <span style="font-size:0.82rem;font-weight:600;color:#78716C;">once</span></div>
              <p style="font-size:0.84rem;color:#44403C;margin-bottom:12px;">Everything you need for your printer, venue coordinator, and banquet kitchen, with 30 days of unlimited re-exports.</p>
              <ul style="list-style:none;font-size:0.82rem;color:#181412;display:flex;flex-direction:column;gap:6px;font-weight:600;">
                <li>&#10003; Print-Ready 24&Prime;&times;36&Prime; Arch D Welcome Poster (<code>0.125&Prime;</code> Bleed)</li>
                <li>&#10003; Avery 5302 Place Cards PDF (Front Entr&eacute;e Icons + Back Allergy Alert)</li>
                <li>&#10003; Clockwise 12-O&rsquo;Clock Caterer BEO Sheet (CSV + PDF)</li>
                <li>&#10003; Restricted &ldquo;Mom Sandbox&rdquo; Link + Cocktail QR Lookup</li>
              </ul>
            </div>
            <a href="/buy/complete_dossier?target=estate-150" class="btn btn-primary" style="width:100%;">Unlock Wedding Print &amp; BEO Pack ($14.99) &rarr;</a>
          </div>
          <div class="panel" style="padding:22px;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
            <div>
              <span class="badge badge-emerald" style="margin-bottom:8px;">FOR PLANNERS, VENUES &amp; GALAS</span>
              <h4 class="serif-display" style="font-size:1.45rem;">Planner Pro &amp; Venue Studio</h4>
              <div class="tabular" style="font-size:2.1rem;font-weight:800;margin:6px 0;">$39 <span style="font-size:0.82rem;font-weight:600;color:#78716C;">/ month</span></div>
              <p style="font-size:0.84rem;color:#44403C;margin-bottom:12px;">Built for wedding planners, banquet captains, and B2B VIP event marketers managing multiple events.</p>
              <ul style="list-style:none;font-size:0.82rem;color:#44403C;display:flex;flex-direction:column;gap:6px;">
                <li>&#10003; Unlimited Client Receptions, VIP Dinners &amp; 300-Guest Galas</li>
                <li>&#10003; White-Label Planner Logo on All BEOs &amp; Floorplans</li>
                <li>&#10003; Unlimited Client &amp; Mom Sandbox Links</li>
              </ul>
            </div>
            <a href="/buy/pro_b2b?target=estate-150" class="btn btn-secondary" style="width:100%;">Start Planner Pro Studio ($39/mo) &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderZone5FaqAndZone6Close(sampleSeoPages = []) {
  const seoLinks = sampleSeoPages.slice(0, 12).map(p =>
    `<a href="/seo/${escapeHtml(p.slug)}" style="font-size:0.78rem;color:#44403C;text-decoration:none;padding:6px 10px;border-radius:8px;background:#FFFFFF;border:1px solid #E2D9C8;">${escapeHtml(p.title)}</a>`
  ).join('');

  return `
  <!-- =======================================================================
       ZONE 5: "YOU'RE PROBABLY WONDERING..." - 5-QUESTION OBJECTION-KILLER FAQ (FOLD 5)
       ======================================================================= -->
  <section class="studio-zone-section" id="faq">
    <div class="container">
      <div style="text-align:center;">
        <div class="studio-eyebrow-kicker">YOU&rsquo;RE PROBABLY WONDERING&hellip;</div>
        <h2 class="studio-zone-title">Five straight answers <em>before you print your welcome sign.</em></h2>
      </div>

      <div class="studio-faq-stack">
        <details class="studio-faq-item" open>
          <summary><span>1. How do 1. Floorplan Studio, 2. Clockwise Caterer BEO, and 3. 24&Prime;&times;36&Prime; Welcome Sign work together (and what if guests drop out)?</span><span>&#9662;</span></summary>
          <div style="padding-top:10px;font-size:0.86rem;color:#44403C;line-height:1.55;">
            <strong>1. Floorplan Studio</strong> is your flagship workspace: paste your RSVP list, morph tables, and run the 35ms family conflict solver. Every change automatically updates <strong>2. Clockwise 12:00 Caterer BEO</strong>, <strong>3. 24&Prime;&times;36&Prime; Arch D Welcome Poster + Avery 5302 Place Cards</strong>, and <strong>4. Bonus Mom Sandbox &amp; Cocktail QR Lookup</strong>. If 4 guests drop out 48 hours before the wedding, delete them on the canvas in 2 clicks and re-export all 4 deliverables free for 30 days under your single $14.99 pass.
          </div>
        </details>
        <details class="studio-faq-item">
          <summary><span>2. Can I send the chart to my Mom or Mother-in-Law without her messing up our friends&rsquo; tables?</span><span>&#9662;</span></summary>
          <div style="padding-top:10px;font-size:0.86rem;color:#44403C;line-height:1.55;">
            Yes! Click <strong>&ldquo;Copy Mom Sandbox Link&rdquo;</strong> in Card 4 of the studio. It generates a restricted link where Mom can freely swap seats at <strong>Tables 1&ndash;3 (Family Tables)</strong> while <strong>Tables 4&ndash;8 remain 100% locked and read-only</strong>.
          </div>
        </details>
        <details class="studio-faq-item">
          <summary><span>3. Will the 24&Prime;&times;36&Prime; poster file work at FedEx Office, Staples, or our local print shop?</span><span>&#9662;</span></summary>
          <div style="padding-top:10px;font-size:0.86rem;color:#44403C;line-height:1.55;">
            Yes. Every poster export is a true vector 300-DPI PDF formatted to standard <strong>Arch D (24&Prime;&times;36&Prime;)</strong> and <strong>18&Prime;&times;24&Prime;</strong> foam-board sizes with <code>0.125&Prime;</code> full bleed and crop marks. Place cards are pre-aligned to standard <strong>Avery 5302 / 5011 folded tent sheets</strong>.
          </div>
        </details>
        <details class="studio-faq-item">
          <summary><span>4. How does the Clockwise 12-O&rsquo;Clock Caterer BEO prevent meal mix-ups?</span><span>&#9662;</span></summary>
          <div style="padding-top:10px;font-size:0.86rem;color:#44403C;line-height:1.55;">
            Banquet captains number seats clockwise starting at <strong>12 o&rsquo;clock (Seat #1, closest to the Dance Floor or Head Table)</strong>. SeatHarmony marks Seat #1 with a red anchor dot on the diagram and generates a matching table-by-table sheet so servers set down Filet, Halibut, Vegan, and Allergy plates without interrupting conversations.
          </div>
        </details>
        <details class="studio-faq-item">
          <summary><span>5. Is the $14.99 Wedding Print &amp; Caterer Pack really a one-time payment?</span><span>&#9662;</span></summary>
          <div style="padding-top:10px;font-size:0.86rem;color:#44403C;line-height:1.55;">
            100% yes. Couples only need seating software once, so we never trap you in a recurring subscription. Pay <strong>$14.99 once</strong>, export unlimited revisions for 30 days, and if your print shop or caterer isn&rsquo;t thrilled, click once for an instant full refund.
          </div>
        </details>
      </div>

      ${seoLinks ? `
      <div style="margin-top:42px;padding-top:24px;border-top:1px solid var(--border-warm);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
          <span style="font-size:0.74rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#78716C;">POPULAR RECEPTION FLOORPLAN &amp; CATERER BEO TEMPLATES</span>
          <a href="/directory" style="font-size:0.80rem;font-weight:700;color:#8C2D19;text-decoration:none;">Browse All 60+ Venue Templates &rarr;</a>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">${seoLinks}</div>
      </div>` : ''}
    </div>
  </section>

  <!-- =======================================================================
       ZONE 6: FINAL CLOSING HOOK & SINGLE CTA (FOLD 6)
       ======================================================================= -->
  <section style="padding:20px 0 64px;">
    <div class="container">
      <div style="background:#181412;color:#FAF8F5;border:2px solid #C8A96E;border-radius:24px;padding:44px 32px;text-align:center;box-shadow:0 24px 54px rgba(24,20,18,0.22);">
        <div class="studio-eyebrow-kicker" style="background:rgba(253,230,138,0.12);color:#FDE68A;border-color:#C8A96E;">READY FOR A DRAMA-FREE RECEPTION?</div>
        <h2 class="serif-display" style="font-size:2.4rem;color:#FFFFFF;max-width:860px;margin:0 auto 12px;">
          Every couple stayed together. Both moms are happy.<br/><em style="color:#FDE68A;">And your 24&Prime;&times;36&Prime; welcome sign is ready for FedEx.</em>
        </h2>
        <p style="font-size:0.96rem;color:#D6CFC2;max-width:620px;margin:0 auto 22px;">
          Test your guest list in the 5-card interactive studio above for free, or unlock your print-ready 24&Prime;&times;36&Prime; Welcome Poster, Avery 5302 Place Cards, and Clockwise BEO Pack for $14.99 once.
        </p>
        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
          <a href="#studio" class="btn btn-primary" style="background:linear-gradient(135deg,#FDE68A 0%,#C8A96E 100%);color:#181412;border:none;padding:13px 26px;font-size:0.92rem;">
            &uarr; Jump to 5-Card Reception Studio
          </a>
          <a href="/buy/complete_dossier?target=estate-150" class="btn btn-secondary" style="background:rgba(255,255,255,0.08);color:#FAF8F5;border-color:#C8A96E;padding:13px 24px;font-size:0.90rem;">
            &#10022; Unlock Complete Print &amp; BEO Pack ($14.99) &rarr;
          </a>
        </div>
      </div>
    </div>
  </section>`;
}

function renderHomePage(initialAudit, sampleSeoPages = []) {
  const plan = (initialAudit && initialAudit.seatingPlan) ? initialAudit.seatingPlan : initialAudit;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'SeatHarmony Wedding & Event Floorplan Studio', applicationCategory: 'EventPlanningApplication', operatingSystem: 'Web', description: 'Combinatorial wedding seating chart solver, clockwise 12:00 caterer BEO generator, and print-ready 24x36 Arch D welcome sign & Avery 5302 place card studio.', offers: { '@type': 'Offer', price: '14.99', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'What happens when guests drop out 48 hours before the wedding?', acceptedAnswer: { '@type': 'Answer', text: 'Swap or remove the guest on the SeatHarmony canvas and re-export your 24x36 Arch D PDF, Avery 5302 place cards, and Clockwise Caterer BEO in one click.' } },
        { '@type': 'Question', name: 'How does the Clockwise 12:00 Caterer BEO work?', acceptedAnswer: { '@type': 'Answer', text: 'SeatHarmony marks 12 o-clock (closest to the Dance Floor) as Seat #1 and numbers seats 1..N clockwise with meal icons and allergy flags for banquet servers.' } }
      ] }
    ]
  };
  return [
    renderHead({ title: 'SeatHarmony: Wedding Floorplan, Conflict-Free Seating Solver & 24"×36" Poster Studio', description: 'Seat 150 wedding guests in 30 seconds without family drama. Auto-solve divorced parent table buffers, generate clockwise caterer BEO meal sheets, and export print-ready 24"×36" welcome signs & Avery 5302 place cards.', canonicalPath: '/', jsonLd, ogSlug: 'home' }),
    '<body>', renderNavbar(), '<main id="main-content">',
    renderZone1Hero(plan), renderZone2Walkthrough(), renderZone3InteractiveStudio(plan), renderZone4ProofStackAndPricing(), renderZone5FaqAndZone6Close(sampleSeoPages),
    '</main>', renderFooter(), renderInteractiveScript(plan), '</body></html>'
  ].join('\n');
}

function renderLandingPage(initialAudit) { return renderHomePage(initialAudit, []); }

function renderDirectoryPage(seoPages = []) {
  const cards = seoPages.map(p => `<a href="/seo/${escapeHtml(p.slug)}" class="panel" style="padding:20px;text-decoration:none;color:inherit;display:flex;flex-direction:column;justify-content:space-between;gap:12px;"><div><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;"><span class="badge badge-cyan">${escapeHtml(p.category || 'Wedding Floorplan')}</span><span class="badge badge-emerald tabular">${escapeHtml(String(p.csov_score || 98))}% Harmony</span></div><h3 class="serif-display" style="font-size:1.25rem;color:#181412;margin-bottom:6px;">${escapeHtml(p.title)}</h3><p style="font-size:0.83rem;color:#44403C;">${escapeHtml(p.meta_description)}</p></div><div style="font-size:0.78rem;font-weight:800;color:#8C2D19;">Open Interactive Floorplan &amp; BEO Template &rarr;</div></a>`).join('');
  return [
    renderHead({ title: '60+ Wedding & Event Seating Chart Floorplan Templates | SeatHarmony Directory', description: 'Browse 60+ verified wedding reception, rehearsal dinner, Tuscan banquet, and charity gala floorplan templates with clockwise caterer BEOs and 24"×36" welcome signs.', canonicalPath: '/directory', ogSlug: 'directory' }),
    '<body>', renderNavbar(),
    `<main class="container" style="padding:48px 24px 72px;"><div style="max-width:760px;margin-bottom:32px;"><div class="studio-eyebrow-kicker">PROGRAMMATIC FLOORPLAN &amp; BEO DIRECTORY</div><h1 class="studio-zone-title">60+ Verified Wedding &amp; Event Floorplan Templates</h1><p style="font-size:0.98rem;color:#44403C;">Select any guest count, table geometry (60&Prime; Round, 8ft Banquet, Sweetheart, or King&rsquo;s Table), or family seating scenario to launch in the interactive studio.</p></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px;">${cards}</div></main>`,
    renderFooter(), '</body></html>'
  ].join('\n');
}

function renderSeoDetailPage(pageRow, relatedPages = []) {
  let payload = {};
  try { payload = JSON.parse(pageRow.payload_json || '{}'); } catch (_) {}
  const faqs = Array.isArray(payload.faqs) ? payload.faqs : [];
  const faqHtml = faqs.map(f => `<details class="studio-faq-item" open><summary><span>${escapeHtml(f.question)}</span><span>&#9662;</span></summary><div style="padding-top:8px;font-size:0.86rem;color:#44403C;">${escapeHtml(f.answer)}</div></details>`).join('');
  const relHtml = relatedPages.map(r => `<a href="/seo/${escapeHtml(r.slug)}" class="panel" style="padding:14px;text-decoration:none;color:inherit;"><div style="font-size:0.72rem;font-weight:800;color:#8C2D19;margin-bottom:4px;">${escapeHtml(r.category)} &middot; ${escapeHtml(String(r.csov_score))}% Harmony</div><div style="font-weight:700;font-size:0.9rem;color:#181412;">${escapeHtml(r.title)}</div></a>`).join('');
  return [
    renderHead({ title: `${pageRow.title} | SeatHarmony Studio`, description: pageRow.meta_description, canonicalPath: `/seo/${pageRow.slug}`, ogSlug: pageRow.slug }),
    '<body>', renderNavbar(),
    `<main class="container" style="padding:48px 24px 72px;"><div style="max-width:860px;margin:0 auto;"><div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;"><a href="/directory" style="font-size:0.8rem;font-weight:700;color:#8C2D19;text-decoration:none;">&larr; All 60+ Floorplans</a><span class="badge badge-emerald">${escapeHtml(pageRow.category)} &middot; ${escapeHtml(String(pageRow.csov_score))}% Harmony</span></div><h1 class="studio-zone-title" style="margin-bottom:12px;">${escapeHtml(pageRow.title)}</h1><p style="font-size:1rem;color:#44403C;margin-bottom:24px;">${escapeHtml(payload.summary || pageRow.meta_description)}</p><div class="panel" style="padding:24px;margin-bottom:28px;background:#FAF6EE;border-color:#C8A96E;"><h2 class="serif-display" style="font-size:1.5rem;margin-bottom:8px;">Customize This Floorplan Live in SeatHarmony Studio</h2><p style="font-size:0.88rem;color:#44403C;margin-bottom:16px;">Load this exact table geometry, run the 35ms family conflict solver, and export your Clockwise 12:00 Caterer BEO and 24&Prime;&times;36&Prime; Welcome Sign.</p><div style="display:flex;gap:12px;flex-wrap:wrap;"><a href="/#studio" class="btn btn-primary">Open Interactive Floorplan Studio &rarr;</a><a href="/buy/complete_dossier?target=${encodeURIComponent(pageRow.slug)}" class="btn btn-secondary">Unlock Print &amp; BEO Pack ($14.99)</a></div></div>${faqHtml ? `<h2 class="serif-display" style="font-size:1.6rem;margin-bottom:12px;">Layout &amp; Catering Specifications</h2><div style="display:flex;flex-direction:column;gap:10px;margin-bottom:32px;">${faqHtml}</div>` : ''}<h3 class="serif-display" style="font-size:1.4rem;margin-bottom:12px;">Related Reception &amp; Event Floorplans</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;">${relHtml}</div></div></main>`,
    renderFooter(), '</body></html>'
  ].join('\n');
}

function renderLegalPage(type = 'privacy') {
  const isPrivacy = type === 'privacy';
  return [
    renderHead({ title: `${isPrivacy ? 'Privacy Policy' : 'Terms of Service'} | SeatHarmony Studio`, description: `SeatHarmony Studio ${isPrivacy ? 'Privacy Policy' : 'Terms of Service'} and guest RSVP data protection standards.`, canonicalPath: isPrivacy ? '/privacy' : '/terms' }),
    '<body>', renderNavbar(),
    `<main class="container" style="padding:56px 24px;max-width:760px;"><h1 class="studio-zone-title" style="margin-bottom:16px;">${isPrivacy ? 'Privacy Policy' : 'Terms of Service'}</h1><div class="panel" style="padding:24px;display:flex;flex-direction:column;gap:14px;font-size:0.9rem;color:#44403C;"><p><strong>Effective Date:</strong> October 2026</p><p>SeatHarmony Studio processes guest RSVP names, dietary restrictions, and table assignments strictly to generate your reception floorplan, caterer BEO sheet, and printable signage. We never sell or share guest lists with third-party advertisers or wedding vendors.</p><p>All $14.99 Wedding Print &amp; Caterer Pack purchases are one-time payments backed by a 30-day 100% satisfaction guarantee.</p></div></main>`,
    renderFooter(), '</body></html>'
  ].join('\n');
}

function render404Page(missingUrl = '') {
  return [
    renderHead({ title: 'Floorplan Not Found | SeatHarmony Studio', description: 'Return to the interactive SeatHarmony Wedding & Event Floorplan Studio.', canonicalPath: '/404' }),
    '<body>', renderNavbar(),
    `<main class="container" style="padding:72px 24px;text-align:center;max-width:640px;"><span class="badge badge-amber" style="margin-bottom:12px;">404 &middot; TABLE NOT FOUND</span><h1 class="studio-zone-title" style="margin-bottom:12px;">We couldn&rsquo;t find that floorplan (${escapeHtml(missingUrl)})</h1><p style="font-size:0.95rem;color:#44403C;margin-bottom:24px;">Jump straight into the interactive 5-Card Reception Floorplan &amp; 24&Prime;&times;36&Prime; Poster Studio or browse our 60+ venue templates.</p><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;"><a href="/#studio" class="btn btn-primary">Open Interactive Studio &rarr;</a><a href="/directory" class="btn btn-secondary">Browse 60+ Floorplans</a></div></main>`,
    renderFooter(), '</body></html>'
  ].join('\n');
}

function renderOgImageSvg({ title = 'SeatHarmony Studio', subtitle = 'Conflict-Free Wedding Seating, Clockwise Caterer BEO & 24x36 Poster Studio', badge = 'SEATHARMONY STUDIO', scoreText = '98.4% Harmony' } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#FAF6EE"/><rect x="36" y="36" width="1128" height="558" rx="24" fill="#FFFFFF" stroke="#C8A96E" stroke-width="3"/><text x="80" y="120" fill="#8C2D19" font-family="sans-serif" font-size="22" font-weight="800" letter-spacing="3">${escapeHtml(badge)}</text><text x="80" y="230" fill="#181412" font-family="Georgia, serif" font-size="52" font-weight="700">${escapeHtml(String(title).slice(0, 44))}</text><text x="80" y="305" fill="#44403C" font-family="sans-serif" font-size="26">${escapeHtml(String(subtitle).slice(0, 72))}</text><rect x="80" y="420" width="320" height="84" rx="16" fill="#ECFDF5" stroke="#065F46" stroke-width="2"/><text x="112" y="472" fill="#065F46" font-family="sans-serif" font-size="34" font-weight="800">${escapeHtml(scoreText)}</text></svg>`;
}

module.exports = { renderHomePage, renderLandingPage, renderDirectoryPage, renderSeoDetailPage, renderLegalPage, render404Page, renderOgImageSvg };

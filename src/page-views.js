/**
 * SeatHarmony (#2) - 6-Zone High-Conviction Landing Page (ExactBaseline Sunlit Champagne Architecture)
 */
const { escapeHtml, renderHead, renderNavbar, renderFooter, renderInteractiveScript } = require('./templates');
const { renderZone4ProofStackAndPricing } = require('./feature-carousel');

function renderZone1Hero(plan) {
  const vId = escapeHtml(plan.vaultId || 'SH-4819');
  return `
  <!-- ZONE 1: ABOVE THE FOLD (CENTERED HEADER + SUB-HEADER + 4-SCENE STORY VSL PLAYER UNDERNEATH + SURER NEXT STEP CTA + CREASE PROOF BAR) -->
  <section class="studio-zone1-hero" id="grader">
    <div class="container">
      <div class="sh-zone1-stack">
        <div class="sh-zone1-header-block">
          <div style="display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;">
            <div class="sh-eyebrow-pill"><span class="sh-eyebrow-dot"></span><span>WEDDING SEATING &amp; FLOORPLAN SOLVER &bull; 24&times;36&Prime; SIGN STUDIO</span></div>
            <button type="button" id="hero-vault-pill-btn" onclick="window.shOpenVaultModal()" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:700;color:#78350F;background:#FAF3E3;border:1px solid #D6CBB9;border-radius:999px;padding:6px 13px;white-space:nowrap;" title="Save or Resume Your Event Vault"><span>&#128190; Vault <strong id="hero-vault-code-label">#${vId}</strong> &bull; Save / Login &nearr;</span></button>
          </div>
          <h1 id="score-brand-title" class="sh-display-h1">The 6-Hour Seating Chart.<br/><span class="sh-h1-accent">Solved in 60 Seconds, Drama-Free.</span></h1>
          <p class="sh-lead-sub">Paste your Zola, The Knot, or Excel guest list to keep couples together, separate divorced relatives, and export your Clockwise 12:00 meal sheet and 24&times;36&Prime; welcome sign.</p>
        </div>

        <div class="sh-vsl-player-shell" id="studio-editorial-vsl-stage">
          <div class="sh-vsl-garland-frieze" aria-hidden="true">
            <svg viewBox="0 0 960 44" preserveAspectRatio="none" style="width:100%;height:42px;display:block;">
              <defs><radialGradient id="fairyGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fffbeb" stop-opacity="1"/><stop offset="45%" stop-color="#fcd34d" stop-opacity="0.85"/><stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/></radialGradient></defs>
              <path d="M0,4 Q160,34 320,6 Q480,36 640,6 Q800,34 960,4" fill="none" stroke="#b49a67" stroke-width="1.2" opacity="0.65"/><path d="M0,10 Q240,38 480,10 Q720,38 960,10" fill="none" stroke="#6b8e78" stroke-width="1.6" stroke-dasharray="6 4" opacity="0.55"/>
              <g fill="#5f7d6b" opacity="0.65"><ellipse cx="75" cy="17" rx="9" ry="4" transform="rotate(-18 75 17)"/><ellipse cx="92" cy="20" rx="8" ry="3.5" transform="rotate(15 92 20)"/><ellipse cx="235" cy="19" rx="9" ry="4" transform="rotate(14 235 19)"/><ellipse cx="395" cy="18" rx="9" ry="4" transform="rotate(-16 395 18)"/><ellipse cx="555" cy="19" rx="9" ry="4" transform="rotate(16 555 19)"/><ellipse cx="715" cy="18" rx="9" ry="4" transform="rotate(-14 715 18)"/><ellipse cx="875" cy="17" rx="9" ry="4" transform="rotate(15 875 17)"/></g>
              <g fill="#fffdf9" stroke="#d6cbb9" stroke-width="1"><circle cx="160" cy="20" r="5.5"/><circle cx="160" cy="20" r="2.5" fill="#fef3c7"/><circle cx="320" cy="10" r="5.5"/><circle cx="320" cy="10" r="2.5" fill="#fef3c7"/><circle cx="480" cy="21" r="6"/><circle cx="480" cy="21" r="2.8" fill="#fef3c7"/><circle cx="640" cy="10" r="5.5"/><circle cx="640" cy="10" r="2.5" fill="#fef3c7"/><circle cx="800" cy="20" r="5.5"/><circle cx="800" cy="20" r="2.5" fill="#fef3c7"/></g>
              <g><circle cx="60" cy="14" r="13" fill="url(#fairyGlow)"/><circle cx="60" cy="14" r="3.2" fill="#fffbeb"/><circle cx="160" cy="21" r="15" fill="url(#fairyGlow)"/><circle cx="160" cy="21" r="3.5" fill="#fffbeb"/><circle cx="260" cy="15" r="13" fill="url(#fairyGlow)"/><circle cx="260" cy="15" r="3.2" fill="#fffbeb"/><circle cx="375" cy="18" r="14" fill="url(#fairyGlow)"/><circle cx="375" cy="18" r="3.4" fill="#fffbeb"/><circle cx="480" cy="22" r="16" fill="url(#fairyGlow)"/><circle cx="480" cy="22" r="3.8" fill="#fffbeb"/><circle cx="585" cy="18" r="14" fill="url(#fairyGlow)"/><circle cx="585" cy="18" r="3.4" fill="#fffbeb"/><circle cx="700" cy="15" r="13" fill="url(#fairyGlow)"/><circle cx="700" cy="15" r="3.2" fill="#fffbeb"/><circle cx="800" cy="21" r="15" fill="url(#fairyGlow)"/><circle cx="800" cy="21" r="3.5" fill="#fffbeb"/><circle cx="900" cy="14" r="13" fill="url(#fairyGlow)"/><circle cx="900" cy="14" r="3.2" fill="#fffbeb"/></g>
            </svg>
          </div>

          <div class="sh-vsl-stage" id="sh-vsl-stage">
            <!-- Scene 0: The 2 AM Seating Chart & Canva Collapse -->
            <div class="sh-vsl-scene active" data-scene="0">
              <div class="sh-vsl-scene-grid">
                <div class="sh-vsl-scene-copy">
                  <div class="sh-vsl-speaker-row"><img src="/public/avatar-couple.jpg" alt="Maya and Liam" class="sh-vsl-speaker-avatar" loading="eager" /><div class="sh-vsl-speaker-meta"><span class="sh-vsl-speaker-name">Maya &amp; Liam &bull; 150-Guest Estate Wedding</span><span class="sh-vsl-scene-kicker">THE 2 AM SPREADSHEET SPIRAL</span></div></div>
                  <h3 class="sh-vsl-scene-h3">&ldquo;Four guests canceled 72 hours out and our chart collapsed.&rdquo;</h3>
                  <p class="sh-vsl-scene-p">Moving one person in Excel set off a chain reaction: divorced parents ended up in direct sightline, couples got split up, and we had to re-type 150 names into our Canva sign.</p>
                  <div class="sh-vsl-caption-pill"><span>&ldquo;Four RSVP drops at 1:30 AM broke five tables and ruined our $220 printed sign.&rdquo;</span></div>
                </div>
                <div class="sh-vsl-scene-visual"><div class="sh-vsl-overlap-collage"><div class="sh-vsl-main-photo-frame"><img src="/public/vsl-scene0-laptop.jpg" alt="Couple stressed over wedding seating chart spreadsheet late at night" class="sh-vsl-main-photo" loading="eager" /></div><div class="sh-vsl-overlap-card sh-vsl-overlap-bad"><div class="sh-vsl-overlap-kicker">MANUAL EXCEL + CANVA SPIRAL (150 GUESTS)</div><div class="sh-vsl-overlap-big-num"><span>6.5 Hours</span> <small>3 Redos</small></div><div class="sh-vsl-overlap-sub">2 Family Clashes &bull; 4 Split Couples &bull; $220 Sign Redo</div></div></div></div>
              </div>
            </div>

            <!-- Scene 1: The Free Registry Drag-and-Drop Trap -->
            <div class="sh-vsl-scene" data-scene="1">
              <div class="sh-vsl-scene-grid">
                <div class="sh-vsl-scene-copy">
                  <div class="sh-vsl-speaker-row"><img src="/public/avatar-couple.jpg" alt="Maya and Liam" class="sh-vsl-speaker-avatar" loading="lazy" /><div class="sh-vsl-speaker-meta"><span class="sh-vsl-speaker-name">Maya &amp; Liam &bull; 150-Guest Estate Wedding</span><span class="sh-vsl-scene-kicker">THE DRAG-AND-DROP TRAP</span></div></div>
                  <h3 class="sh-vsl-scene-h3">&ldquo;Free registry tools left us dragging tiny dots around by hand for hours.&rdquo;</h3>
                  <p class="sh-vsl-scene-p">Generic registry tools have no conflict solver. They don&rsquo;t know which relatives must stay apart, they split couples when you switch table shapes, and they can&rsquo;t export a 24&times;36&Prime; poster.</p>
                  <div class="sh-vsl-caption-pill"><span>&ldquo;Playing human Sudoku with 150 relatives and still re-typing names in Canva.&rdquo;</span></div>
                </div>
                <div class="sh-vsl-scene-visual"><div class="sh-vsl-overlap-collage"><div class="sh-vsl-main-photo-frame"><img src="/public/vsl-scene1-notes.jpg" alt="Late night handwritten wedding table notes and coffee" class="sh-vsl-main-photo" loading="lazy" /></div><div class="sh-vsl-overlap-card sh-vsl-overlap-warn"><div class="sh-vsl-overlap-kicker">WHY FREE REGISTRY SEATING TOOLS FAIL</div><div class="sh-vsl-overlap-list"><div>&#10005; No divorced-parent buffer &bull; Splits couples on table swaps</div><div>&#10005; Zero 24&times;36&Prime; welcome sign or Avery 5302 card export</div></div></div></div></div>
              </div>
            </div>

            <!-- Scene 2: The Caterer BEO & Foyer Bottleneck Trap -->
            <div class="sh-vsl-scene" data-scene="2">
              <div class="sh-vsl-scene-grid">
                <div class="sh-vsl-scene-copy">
                  <div class="sh-vsl-speaker-row"><img src="/public/avatar-planner.jpg" alt="Venue Catering Coordinator" class="sh-vsl-speaker-avatar" loading="lazy" /><div class="sh-vsl-speaker-meta"><span class="sh-vsl-speaker-name">Venue Catering Coordinator &bull; 72 Hours Out</span><span class="sh-vsl-scene-kicker">THE CATERER &amp; FOYER TRAP</span></div></div>
                  <h3 class="sh-vsl-scene-h3">&ldquo;Without clockwise Seat 1&ndash;10 numbering, dinner service stalls and allergies get missed.&rdquo;</h3>
                  <p class="sh-vsl-scene-p">Banquet servers cannot read flat spreadsheets. Without Seat #1 anchored at 12 o&rsquo;clock toward the dance floor, servers auction off plates at every table while 150 guests jam the foyer.</p>
                  <div class="sh-vsl-caption-pill"><span>&ldquo;Unnumbered table sheets delay entrée service by 25 minutes and risk allergy mix-ups.&rdquo;</span></div>
                </div>
                <div class="sh-vsl-scene-visual"><div class="sh-vsl-overlap-collage"><div class="sh-vsl-main-photo-frame"><img src="/public/editorial-segment-3.jpg" alt="Wedding coordinator reviewing ballroom floorplan and caterer meal sheet" class="sh-vsl-main-photo" loading="lazy" /></div><div class="sh-vsl-overlap-card sh-vsl-overlap-bad"><div class="sh-vsl-overlap-kicker">THE 2 RECEPTION NIGHT TRAPS</div><div class="sh-vsl-overlap-list"><div>1. Service Stall: Unnumbered chairs = servers auctioning meals</div><div>2. Foyer Jam: 150 guests at 1 easel = 20-min doorway line</div></div></div></div></div>
              </div>
            </div>

            <!-- Scene 3: Where SeatHarmony Comes In -->
            <div class="sh-vsl-scene" data-scene="3">
              <div class="sh-vsl-scene-grid">
                <div class="sh-vsl-scene-copy">
                  <div class="sh-vsl-speaker-row"><img src="/public/avatar-couple.jpg" alt="Maya and Liam" class="sh-vsl-speaker-avatar" loading="lazy" /><div class="sh-vsl-speaker-meta"><span class="sh-vsl-speaker-name">Maya &amp; Liam &bull; Reception Night</span><span class="sh-vsl-scene-kicker" style="color:#047857;">HOW SEATHARMONY SOLVED IT</span></div></div>
                  <h3 class="sh-vsl-scene-h3">&ldquo;In 60 seconds, every family buffer, caterer meal sheet, and 24&times;36&Prime; sign was ready.&rdquo;</h3>
                  <p class="sh-vsl-scene-p">SeatHarmony placed our divorced parents across the dance floor, kept every couple together, and exported our Clockwise 12:00 BEO, framed 24&times;36&Prime; sign, Avery 5302 cards, and Guest QR app.</p>
                  <div class="sh-vsl-caption-pill sh-vsl-caption-good"><span>&ldquo;Zero family drama, 8-minute dinner service, and $220 saved on signage.&rdquo;</span></div>
                  <div style="padding-top:10px;"><button type="button" onclick="window.shLoadVslSceneIntoStudio && window.shLoadVslSceneIntoStudio()" style="display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;background:#047857;color:#ffffff;font-weight:700;font-size:14px;border:none;cursor:pointer;box-shadow:0 4px 12px rgba(4,120,87,0.28);"><span>&#9889; Load Maya &amp; Liam&rsquo;s 150-Guest Reception in Studio &darr;</span></button></div>
                </div>
                <div class="sh-vsl-scene-visual"><div class="sh-vsl-overlap-collage"><div class="sh-vsl-main-photo-frame"><img src="/public/editorial-segment-1.jpg" alt="Framed 24x36 Find Your Seat wedding welcome sign on gold easel at reception" class="sh-vsl-main-photo" loading="lazy" /></div><div class="sh-vsl-overlap-card sh-vsl-overlap-good"><div class="sh-vsl-overlap-kicker">SEATHARMONY 60-SECOND RECEPTION RESCUE</div><div class="sh-vsl-overlap-big-num"><span style="color:#047857;">98/100 Harmony</span> <small style="background:#dcfce7;color:#065f46;">Saved 6.5 Hrs + $220</small></div><div class="sh-vsl-overlap-sub">0 Family Clashes &bull; Clockwise 1&ndash;10 BEO &bull; 24&times;36&Prime; Sign + QR</div></div></div></div>
              </div>
            </div>
          </div>

          <div class="sh-vsl-controls">
            <button type="button" class="sh-vsl-play-btn" id="sh-vsl-play-btn" onclick="window.shToggleVslAutoPlay && window.shToggleVslAutoPlay()"><span id="sh-vsl-play-icon">&#9654;</span><span id="sh-vsl-play-label">Auto-Play Story</span></button>
            <button type="button" class="sh-vsl-next-scene-btn" id="sh-vsl-prev-btn" aria-label="Previous slide" onclick="window.shGoVslStep && window.shGoVslStep(-1)">&larr;</button>
            <div class="sh-vsl-steps" role="tablist" aria-label="Story slides">
              <button type="button" class="sh-vsl-step" role="tab" aria-label="Slide 1: The Collapse" onclick="window.shJumpVslStep(0)"><span class="sh-vsl-step-track"><span class="sh-vsl-step-fill"></span></span><span class="sh-vsl-step-label">1. Collapse</span></button>
              <button type="button" class="sh-vsl-step" role="tab" aria-label="Slide 2: The Trap" onclick="window.shJumpVslStep(1)"><span class="sh-vsl-step-track"><span class="sh-vsl-step-fill"></span></span><span class="sh-vsl-step-label">2. The Trap</span></button>
              <button type="button" class="sh-vsl-step" role="tab" aria-label="Slide 3: The Caterer" onclick="window.shJumpVslStep(2)"><span class="sh-vsl-step-track"><span class="sh-vsl-step-fill"></span></span><span class="sh-vsl-step-label">3. Caterer</span></button>
              <button type="button" class="sh-vsl-step" role="tab" aria-label="Slide 4: The Fix" onclick="window.shJumpVslStep(3)"><span class="sh-vsl-step-track"><span class="sh-vsl-step-fill"></span></span><span class="sh-vsl-step-label">4. The Fix</span></button>
            </div>
            <span id="sh-vsl-progress-bar" style="display:none;"></span>
            <button type="button" class="sh-vsl-next-scene-btn" id="sh-vsl-next-btn" onclick="window.shGoVslStep && window.shGoVslStep(1)">Next &rarr;</button>
          </div>
        </div>

        <div class="sh-zone1-cta-block">
          <div class="sh-surer-cta-row">
            <a href="#studio" class="sh-btn-primary"><span>Open the 5-Step Floorplan &amp; Sign Studio &darr;</span></a>
            <a id="hero-buy-btn" href="#beo-proof" class="sh-btn-secondary"><span>See the 6.5 Hours vs. 60 Seconds Before &amp; After &darr;</span></a>
          </div>
          <div class="sh-opener-micro-trust"><span>Interactive Floorplan &amp; 6-Template Sign Studio</span><span>&bull;</span><span>Clockwise 12:00 Caterer Meal Sheet</span><span>&bull;</span><span>Avery 5302 Place Cards &amp; Guest QR</span></div>
        </div>
      </div>

      <div class="sh-crease-proof-bar" id="studio-crease-proof-bar">
        <div class="sh-crease-item"><div class="sh-crease-val">6.5 Hrs + $220 Saved</div><div class="sh-crease-lbl">150-GUEST AUTO-SOLVER + 24&times;36&Prime; SIGN VS. EXCEL &amp; ETSY</div></div>
        <div class="sh-crease-item"><div class="sh-crease-val">Clockwise Seat 1&ndash;10</div><div class="sh-crease-lbl">12 O&rsquo;CLOCK SEAT #1 WITH ENTR&Eacute;E ICONS &amp; ALLERGY ALERTS</div></div>
        <div class="sh-crease-item"><div class="sh-crease-val">6 Framed Sign Styles + QR</div><div class="sh-crease-lbl">300-DPI 24&times;36&Prime; POSTERS, AVERY 5302 CARDS &amp; GUEST QR</div></div>
      </div>
    </div>
  </section>`;
}

function renderZone2Walkthrough() {
  return `
  <!-- ZONE 2: "HOW IT WORKS" - 4-STEP SKIMMER WALKTHROUGH + POST-HOW-IT-WORKS MINI CTA (FOLD 2) -->
  <section class="studio-zone-section" id="studio-zone2-how-it-works">
    <div class="container">
      <div class="bs-section-header">
        <div class="bs-section-eyebrow">HOW SEATHARMONY WORKS</div>
        <h2 class="bs-section-h2">From RSVP list to print-ready reception <em>in four steps.</em></h2>
        <p class="bs-section-sub">Replace late-night spreadsheet guesswork with conflict-free household seating, clockwise caterer meal sheets, and print-ready signage.</p>
      </div>
      <div class="studio-how-grid">
        <div class="studio-how-card" style="cursor:pointer;" onclick="window.scrollToShCard(2)">
          <div style="display:flex;align-items:center;justify-content:space-between;"><span class="studio-how-num">01</span><span class="mono" style="font-size:0.82rem;font-weight:800;color:#78350F;background:#FAF3E3;padding:5px 11px;border-radius:999px;white-space:nowrap;">15-Sec Import</span></div>
          <h3 style="font-size:1.18rem;font-weight:800;color:#181412;margin:0;line-height:1.25;">1. Paste Your Guest List</h3>
          <p style="font-size:0.96rem;color:#44403C;line-height:1.5;margin:0;">Paste from Zola, The Knot, or Excel. Couples and children stay seated together automatically.</p>
        </div>
        <div class="studio-how-card" style="cursor:pointer;" onclick="window.scrollToShCard(3)">
          <div style="display:flex;align-items:center;justify-content:space-between;"><span class="studio-how-num">02</span><span class="mono" style="font-size:0.82rem;font-weight:800;color:#065F46;background:#ECFDF5;padding:5px 11px;border-radius:999px;white-space:nowrap;">1-Click Peace</span></div>
          <h3 style="font-size:1.18rem;font-weight:800;color:#181412;margin:0;line-height:1.25;">2. Keep Family Peace</h3>
          <p style="font-size:0.96rem;color:#44403C;line-height:1.5;margin:0;">Seat divorced parents across the dance floor and place grandparents in the quiet zone.</p>
        </div>
        <div class="studio-how-card" style="cursor:pointer;" onclick="if(window.shSetActiveTab){window.shSetActiveTab('beo');}document.getElementById('studio-bespoke-artifact-stage').scrollIntoView({behavior:'smooth'});">
          <div style="display:flex;align-items:center;justify-content:space-between;"><span class="studio-how-num">03</span><span class="mono" style="font-size:0.82rem;font-weight:800;color:#8C2D19;background:#FDF2EE;padding:5px 11px;border-radius:999px;white-space:nowrap;">12:00 = Seat #1</span></div>
          <h3 style="font-size:1.18rem;font-weight:800;color:#181412;margin:0;line-height:1.25;">3. Caterer Meal Sheet</h3>
          <p style="font-size:0.96rem;color:#44403C;line-height:1.5;margin:0;">Numbers every chair clockwise from 12 o&rsquo;clock with entrée icons and red allergy alerts.</p>
        </div>
        <div class="studio-how-card" style="cursor:pointer;" onclick="if(window.shSetActiveTab){window.shSetActiveTab('poster');}document.getElementById('studio-bespoke-artifact-stage').scrollIntoView({behavior:'smooth'});">
          <div style="display:flex;align-items:center;justify-content:space-between;"><span class="studio-how-num">04</span><span class="mono" style="font-size:0.82rem;font-weight:800;color:#78350F;background:#FAF3E3;padding:5px 11px;border-radius:999px;white-space:nowrap;">6 Sign Styles</span></div>
          <h3 style="font-size:1.18rem;font-weight:800;color:#181412;margin:0;line-height:1.25;">4. Print Sign &amp; Cards</h3>
          <p style="font-size:0.96rem;color:#44403C;line-height:1.5;margin:0;">Export your 24&Prime;&times;36&Prime; easel poster PDF, Avery 5302 place cards, and cocktail-hour QR.</p>
        </div>
      </div>
      <div style="text-align:center;margin-top:36px;">
        <a href="#studio" class="btn btn-primary" style="padding:14px 28px;font-size:0.98rem;border-radius:999px;">Build Your Reception Floorplan Free &darr;</a>
        <div style="font-size:0.92rem;color:#57534E;margin-top:10px;font-weight:600;">No account required to start &bull; Free Caterer Meal Sheet (.CSV) &bull; Live 6-Design Sign Preview</div>
      </div>
    </div>
  </section>`;
}

function renderZone3InteractiveStudio(plan) {
  const vId = escapeHtml(plan.vaultId || 'SH-4819');
  const activeRules = plan.rules || plan.conflictRules || [];
  const rulesHtml = activeRules.map((r, rIdx) => `
    <div style="padding:10px 12px;border-radius:10px;background:#FAF8F5;border:1px solid #E2D9C8;font-size:0.84rem;display:flex;flex-direction:column;align-items:flex-start;gap:5px;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;width:100%;">
        <div style="font-weight:800;color:#181412;line-height:1.35;flex:1;">${(r.type === 'keep_apart' || r.type === 'must_keep_apart') ? '🔴 ' : (r.type === 'zone_quiet' ? '🔇 ' : '🟢 ')}${escapeHtml(r.label)}</div>
        <button type="button" title="Delete Rule" onclick="window.shRemoveRule(${rIdx},event)" style="cursor:pointer;border:1px solid #FECDD3;background:#FFF1F2;color:#9F1239;font-size:0.78rem;font-weight:800;padding:1px 6px;border-radius:5px;flex-shrink:0;">✕</button>
      </div>
      <div style="font-size:0.82rem;color:#57534E;line-height:1.42;width:100%;">${escapeHtml(r.detail)}</div>
      <button type="button" title="Click to cycle rule type" onclick="window.shCycleRuleType(${rIdx},event)" class="badge badge-emerald" style="cursor:pointer;border:1px solid #A7F3D0;font-size:0.82rem;padding:3px 9px;align-self:flex-start;">&#10003; ${escapeHtml(r.status)} &middot; Cycle Type</button>
    </div>`).join('');

  return `
  <!-- ZONE 3: SCROLL-PACED 5-CARD BUILDER + STICKY LIVE STAGE (FOLD 3) -->
  <section class="studio-zone-section" id="studio">
    <div class="container">
      <div class="bs-section-header" style="margin-bottom:18px;text-align:center;display:flex;flex-direction:column;align-items:center;">
        <div class="bs-section-eyebrow" style="margin-left:auto;margin-right:auto;">LIVE WEDDING &amp; RECEPTION STUDIO &middot; EVENT #<span id="sh-studio-vault-code">${vId}</span></div>
        <h2 class="bs-section-h2" style="text-align:center;margin-left:auto;margin-right:auto;margin-bottom:8px;">Build your reception in <em>4 guided steps.</em></h2>
        <p class="bs-section-sub" style="text-align:center;margin:0 auto;">Set your venue &amp; tables first, add your guests, apply family rules, then fine-tune seats &amp; print.</p>
        <div style="display:none;"><span id="sh-endowed-progress-label">Step 1 of 4</span><span id="sh-endowed-progress-fill"></span><span id="sh-btn-vault-id">${vId}</span></div>
        <a href="#studio-bespoke-artifact-stage" onclick="var el=document.getElementById('studio-bespoke-artifact-stage');if(el){window.scrollTo({top:el.getBoundingClientRect().top+window.pageYOffset-90,behavior:'smooth'});}return false;" class="mobile-jump-canvas-btn" style="margin-top:10px;font-size:0.82rem;font-weight:800;color:#181412;background:#FAF3E3;border:1.5px solid #C8A96E;padding:6px 12px;border-radius:999px;text-decoration:none;">&#128065; Jump to Floorplan &darr;</a>
      </div>

      <!-- 4-Step Progressive Interactive Wizard Bar -->
      <div class="sh-wizard-stepper" id="sh-wizard-stepper" role="navigation" aria-label="Reception Setup Wizard Steps">
        <button type="button" class="sh-wizard-step-pill active" id="sh-top-step-pill-1" data-step-pill="1" onclick="window.scrollToShCard(1)">
          <span class="sh-wizard-step-num" id="sh-top-step-num-1">1</span>
          <span>Venue &amp; Tables</span>
        </button>
        <button type="button" class="sh-wizard-step-pill" id="sh-top-step-pill-2" data-step-pill="2" onclick="window.scrollToShCard(2)">
          <span class="sh-wizard-step-num" id="sh-top-step-num-2">2</span>
          <span>Add Guests</span>
        </button>
        <button type="button" class="sh-wizard-step-pill" id="sh-top-step-pill-3" data-step-pill="3" onclick="window.scrollToShCard(3)">
          <span class="sh-wizard-step-num" id="sh-top-step-num-3">3</span>
          <span>Family Rules</span>
        </button>
        <button type="button" class="sh-wizard-step-pill" id="sh-top-step-pill-4" data-step-pill="4" onclick="window.scrollToShCard(4)">
          <span class="sh-wizard-step-num" id="sh-top-step-num-4">4</span>
          <span>Fine-Tune &amp; Export</span>
        </button>
      </div>

      <div class="studio-scroll-builder-grid" id="sh-builder-grid">
        <!-- LEFT COLUMN: Progressive 1-Step-at-a-Time Wizard -->
        <div class="studio-hybrid-wizard" id="sh-csv-parse-preview">

          <!-- STEP 1 OF 4: Venue & Tables -->
          <div class="studio-wizard-step active" id="sh-wizard-step-1" data-step="1">
            <div class="studio-wizard-header">
              <span class="studio-wizard-step-title"><span style="color:#8C2D19;">Step 1 of 4:</span> Venue &amp; Tables</span>
              <span class="studio-wizard-step-summary" id="sh-wizard-summary-1">Estate</span>
            </div>
            <div class="studio-wizard-body">
              <div style="margin-bottom:12px;">
                <span class="studio-field-label">Choose a Starting Venue Layout</span>
                <div class="studio-chip-group">
                  <button type="button" class="studio-tap-chip preset-chip active" data-preset="estate-150" data-domain="supabase.com" onclick="window.loadPresetScenario('estate-150', this)">&#128141; Estate</button>
                  <button type="button" class="studio-tap-chip preset-chip" data-preset="tuscan-banquet-80" onclick="window.loadPresetScenario('tuscan-banquet-80', this)">&#127863; Tuscan</button>
                  <button type="button" class="studio-tap-chip preset-chip" data-preset="planner-beo-sandbox" onclick="window.loadPresetScenario('planner-beo-sandbox', this)">&#128203; Planner</button>
                  <button type="button" class="studio-tap-chip preset-chip" data-preset="vip-exec-dinner" onclick="window.loadPresetScenario('vip-exec-dinner', this)">&#129346; VIP</button>
                  <button type="button" class="studio-tap-chip preset-chip" data-preset="charity-gala-300" onclick="window.loadPresetScenario('charity-gala-300', this)">&#127895; 300 Gala</button>
                  <button type="button" id="sh-clear-demo-btn" class="studio-tap-chip" style="border-color:#8C2D19;color:#8C2D19;font-weight:800;" onclick="window.shStartBlankList()">&#10024; Start Blank</button>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr;gap:8px;margin-bottom:12px;">
                <div>
                  <label for="sh-couple-title-input" class="studio-field-label">Event Title</label>
                  <input id="sh-couple-title-input" type="text" class="grader-input" value="${escapeHtml(plan.title || "Maya & Liam's Estate Reception")}" oninput="window.shUpdateCoupleTitle(this.value)" />
                </div>
                <div>
                  <label for="sh-venue-name-input" class="studio-field-label">Venue Name</label>
                  <input id="sh-venue-name-input" type="text" class="grader-input" value="${escapeHtml(plan.venueName || 'Rosewood Conservatory')}" oninput="window.shUpdateVenueName(this.value)" />
                </div>
              </div>
              <div style="background:#FAF6EE;border:1px solid #E2D9C8;border-radius:10px;padding:10px 12px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                <div>
                  <div style="font-size:0.76rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#57534E;">Tables in Room</div>
                  <div style="font-size:0.92rem;font-weight:800;color:#181412;" id="sh-step1-table-count-label">8 Tables Ready</div>
                </div>
                <div style="display:flex;gap:6px;">
                  <button type="button" class="studio-tap-chip" style="padding:5px 10px;font-size:0.80rem;" onclick="window.shDeleteSelectedTable()">&minus; Table</button>
                  <button type="button" class="studio-tap-chip" style="padding:5px 10px;font-size:0.80rem;border-color:#065F46;background:#ECFDF5;color:#065F46;font-weight:800;" onclick="window.shAddNewTable()">+ Add Table</button>
                </div>
              </div>
              <input id="sh-crest-logo-input" type="hidden" value="" />
              <button type="button" onclick="window.scrollToShCard(2)" style="width:100%;background:linear-gradient(135deg,#FDE68A,#E8C77D);color:#3B2A12;border:1.5px solid #C8A96E;border-radius:10px;padding:10px 14px;font-size:0.88rem;font-weight:800;cursor:pointer;">Continue to Step 2: Add Guests &rarr;</button>
            </div>
          </div>

          <!-- STEP 2 OF 4: Add Guests -->
          <div class="studio-wizard-step" id="sh-wizard-step-2" data-step="2">
            <div class="studio-wizard-header">
              <span class="studio-wizard-step-title"><span style="color:#8C2D19;">Step 2 of 4:</span> Add Guests</span>
              <span class="studio-wizard-step-summary" id="sh-wizard-summary-2">62 Guests</span>
            </div>
            <div class="studio-wizard-body">
              <div style="margin-bottom:10px;">
                <label for="domain-input" class="studio-field-label">Add Household or Guest</label>
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                  <input id="domain-input" type="text" class="grader-input" style="flex:1 1 100%;" value="Sarah &amp; Mark Miller + 1 Kid (GF)" aria-label="Add household or guest" />
                  <select id="sh-target-table-select" class="grader-input" style="flex:1 1 130px;" aria-label="Target Table">
                    <option value="auto">Auto Table</option>
                    <option value="0">Table 1 (VIP)</option>
                    <option value="1" selected>Table 2 (Bride Fam)</option>
                    <option value="2">Table 3 (College)</option>
                    <option value="3">Table 4 (Groom Fam)</option>
                    <option value="4">Table 5 (Dad's Side)</option>
                    <option value="5">Table 6 (Work)</option>
                    <option value="6">Table 7 (Friends)</option>
                    <option value="7">Table 8 (Seniors)</option>
                  </select>
                  <button type="button" class="btn btn-primary" style="padding:7px 14px;font-size:0.82rem;" onclick="window.shAddMessyHousehold()">+ Add</button>
                </div>
              </div>
              <div style="margin-bottom:10px;">
                <div class="studio-chip-group">
                  <button type="button" class="studio-tap-chip" onclick="window.shQuickFillHousehold('Dr. &amp; Mrs. James Chen (Halibut)')">+ Dr. &amp; Mrs. Chen</button>
                  <button type="button" id="sh-toggle-bulk-csv-btn" class="studio-tap-chip" style="border-color:#065F46;background:#ECFDF5;color:#065F46;font-weight:800;" onclick="window.shToggleBulkCsvDrawer()">&#128203; Import CSV / Paste List</button>
                </div>
              </div>
              <div id="sh-bulk-csv-drawer" style="display:none;background:#FAF6EE;border:1.5px solid #C8A96E;border-radius:10px;padding:10px;margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;">
                  <span style="font-size:0.80rem;font-weight:800;color:#181412;">Paste Rows or Upload CSV</span>
                  <label class="studio-tap-chip" style="cursor:pointer;background:#FFFFFF;border-color:#181412;font-weight:800;padding:4px 9px;font-size:0.78rem;">
                    Upload .CSV
                    <input id="sh-csv-file-input" type="file" accept=".csv,.txt" style="display:none;" onchange="window.shHandleCsvFileUpload(this)" />
                  </label>
                </div>
                <textarea id="sh-bulk-csv-textarea" rows="3" class="grader-input" style="width:100%;font-family:var(--font-mono);font-size:0.80rem;margin-bottom:6px;" placeholder="Paste 1 household per line...">Dr. &amp; Mrs. James Chen (Halibut)
Sarah &amp; Mark Miller + 2 Kids (GF)
Aunt Patricia + Guest (Wheelchair, Vegan)
David &amp; Elena Rostova (Filet, Peanut Allergy)</textarea>
                <div style="display:flex;gap:6px;">
                  <button type="button" id="sh-bulk-append-btn" class="btn btn-primary" style="padding:5px 10px;font-size:0.80rem;" onclick="window.shProcessBulkCsv(false)">Append</button>
                  <button type="button" id="sh-bulk-replace-btn" class="studio-tap-chip" style="border-color:#8C2D19;color:#8C2D19;font-weight:800;" onclick="window.shProcessBulkCsv(true)">Replace All</button>
                </div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding-top:8px;border-top:1px solid #EFEAE1;">
                <button type="button" class="studio-tap-chip" onclick="window.scrollToShCard(1)">&larr; Step 1: Venue</button>
                <button type="button" onclick="window.scrollToShCard(3)" style="background:linear-gradient(135deg,#FDE68A,#E8C77D);color:#3B2A12;border:1.5px solid #C8A96E;border-radius:10px;padding:8px 14px;font-size:0.84rem;font-weight:800;cursor:pointer;">Step 3: Family Rules &rarr;</button>
              </div>
            </div>
          </div>

          <!-- STEP 3 OF 4: Family Rules -->
          <div class="studio-wizard-step" id="sh-wizard-step-3" data-step="3">
            <div class="studio-wizard-header">
              <span class="studio-wizard-step-title"><span style="color:#8C2D19;">Step 3 of 4:</span> Family Rules</span>
              <span class="studio-wizard-step-summary" id="sh-wizard-summary-3">0 Clashes</span>
            </div>
            <div class="studio-wizard-body">
              <div id="sh-rules-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">${rulesHtml}</div>
              <div style="background:#FAF6EE;border:1px solid #E2D9C8;border-radius:9px;padding:8px;margin-bottom:10px;">
                <input id="sh-custom-rule-input" type="text" class="grader-input" style="width:100%;font-size:0.82rem;margin-bottom:6px;" value="Keep Uncle Bob &amp; Aunt Linda 2+ tables apart" aria-label="Seating Rule" />
                <div style="display:flex;gap:6px;align-items:center;">
                  <select id="sh-custom-rule-type" class="grader-input" style="flex:1;font-size:0.80rem;padding:6px 8px;" aria-label="Rule Type">
                    <option value="must_keep_apart">&#128308; Keep Apart</option>
                    <option value="zone_quiet">&#128263; Quiet Zone</option>
                    <option value="must_sit_together">&#128994; Sit Together</option>
                  </select>
                  <button type="button" class="studio-tap-chip active" onclick="window.shAddCustomRule()">+ Add</button>
                </div>
              </div>
              <button id="sh-solve-btn" type="button" class="btn btn-primary" style="width:100%;padding:9px 12px;font-size:0.86rem;margin-bottom:10px;" onclick="window.shRunSimulatedAnnealingSolver();window.scrollToShCard(4);">&#10024; Auto-Seat &amp; Unlock Fine-Tune &rarr;</button>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding-top:8px;border-top:1px solid #EFEAE1;">
                <button type="button" class="studio-tap-chip" onclick="window.scrollToShCard(2)">&larr; Step 2: Guests</button>
                <button type="button" class="studio-tap-chip" style="font-weight:800;color:#78350F;border-color:#C8A96E;" onclick="window.scrollToShCard(4)">Skip to Step 4 &rarr;</button>
              </div>
            </div>
          </div>

          <!-- STEP 4 OF 4: Fine-Tune & Export (Unlocks Full Table/Seat Micro-Editing + Sign Studio) -->
          <div class="studio-wizard-step" id="sh-wizard-step-4" data-step="4">
            <div class="studio-wizard-header">
              <span class="studio-wizard-step-title"><span style="color:#8C2D19;">Step 4 of 4:</span> Fine-Tune &amp; Print</span>
              <span class="studio-wizard-step-summary" id="sh-wizard-summary-4">Unlocked</span>
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
                  <button type="button" class="studio-tap-chip" data-shape="sweetheart" onclick="window.shMorphSelectedTable('sweetheart')">&#128149; Sweetheart</button>
                  <button type="button" class="studio-tap-chip" data-shape="kings_4sided" onclick="window.shMorphSelectedTable('kings_4sided')">&#8862; King&rsquo;s</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shRotateSelectedTable()">&#8635; 45&deg;</button>
                  <button id="sh-lock-table-btn" type="button" class="studio-tap-chip" onclick="window.shToggleLockSelectedTable()">&#128274; Lock</button>
                </div>
                <div style="display:flex;gap:5px;flex-wrap:wrap;">
                  <button id="sh-ring-harmony" type="button" class="studio-tap-chip active" onclick="window.shSetRingMode('harmony')">Harmony View</button>
                  <button id="sh-ring-meal" type="button" class="studio-tap-chip" onclick="window.shSetRingMode('meal')">Meal View</button>
                  <button type="button" class="studio-tap-chip" onclick="window.shCopyMomSandboxLink()">Copy Family Link</button>
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
                  <button type="button" class="studio-tap-chip" onclick="window.shExportBeoCsv()">&#11015; BEO .CSV</button>
                  <a id="sh-card5-poster-studio-link" href="/print/poster/${vId}" target="_blank" class="studio-tap-chip" style="text-decoration:none;font-weight:800;color:#78350F;border-color:#C8A96E;">Sign PDF &nearr;</a>
                  <a id="sh-card5-avery-studio-link" href="/print/avery-5302/${vId}" target="_blank" class="studio-tap-chip" style="text-decoration:none;font-weight:800;color:#065F46;border-color:#10B981;">Avery 5302 &nearr;</a>
                </div>
                <a id="sh-card5-buy-btn" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}" style="display:none;">Unlock</a>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding-top:8px;border-top:1px solid #EFEAE1;">
                <button type="button" class="studio-tap-chip" onclick="window.scrollToShCard(3)">&larr; Back to Step 3: Family Rules</button>
              </div>
            </div>
          </div>

          <!-- Clean Save & Export Card -->
          <div id="sh-vault-checkout-bar" style="background:#FAF3E6;border:1.5px solid #C8A96E;border-radius:12px;padding:12px;color:#181412;display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
              <span style="font-size:0.80rem;font-weight:800;color:#78350F;" id="sh-vault-bar-headline">&#128274; Saved (#${vId})</span>
              <button type="button" onclick="window.shOpenVaultModal()" style="cursor:pointer;background:#FFFFFF;color:#78350F;border:1px solid #C8A96E;border-radius:7px;padding:4px 9px;font-size:0.78rem;font-weight:800;">Save / Load</button>
            </div>
            <div style="display:flex;gap:6px;">
              <a id="sh-vault-buy-pack-btn" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}" style="flex:1;text-align:center;background:linear-gradient(135deg,#FDE68A,#E8C77D);color:#3B2A12;border:1px solid #C8A96E;border-radius:8px;padding:8px 10px;font-size:0.82rem;font-weight:800;text-decoration:none;white-space:nowrap;">
                Unlock Print Pack ($14.99) &rarr;
              </a>
              <a id="sh-vault-buy-pro-btn" href="/buy/pro_b2b?target=estate-150&amp;vault=${vId}" style="background:#FFFFFF;color:#181412;border:1px solid #D6CFC2;border-radius:8px;padding:8px 10px;font-size:0.80rem;font-weight:700;text-decoration:none;white-space:nowrap;">
                Pro
              </a>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Wide Interactive Floorplan Stage & 4-Tab Kit -->
        <div class="studio-sticky-right-col">
          <div class="studio-baseline-kpi-grid" id="sh-stat-harmony">
            <div class="studio-kpi-card">
              <div class="studio-kpi-label">1. Harmony Score</div>
              <div class="studio-kpi-val" id="sh-kpi-harmony" style="color:#065F46;"><span id="score-csov">${plan.harmonyScore || 98}</span>/100</div>
              <div class="studio-kpi-sub" id="sh-stat-conflicts">&#10003; 0 Sightline Clashes</div>
            </div>
            <div class="studio-kpi-card">
              <div class="studio-kpi-label">2. Seated Roster</div>
              <div class="studio-kpi-val" id="sh-stat-guests">62 Guests (8 Tbls)</div>
              <div class="studio-kpi-sub" id="sh-stat-households-sub">&#10003; 26 Coupled &bull; 150 Scale</div>
            </div>
            <div class="studio-kpi-card">
              <div class="studio-kpi-label">3. Caterer &amp; Print</div>
              <div class="studio-kpi-val" id="sh-stat-meals">12:00 Seat #1</div>
              <div class="studio-kpi-sub" id="sh-stat-allergies-sub">&#10003; 6 Allergies + Avery 5302</div>
            </div>
          </div>

          <!-- Warm Sunlit Champagne & Gold Live 4-Tab Reception Stage -->
          <div class="studio-bespoke-stage" id="studio-bespoke-artifact-stage">
            <!-- Unified Stage Header Bar -->
            <div id="specimen-header-block" style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:4px 4px 8px;border-bottom:1px solid #EAE2D3;">
              <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
                <div id="specimen-logo-badge" title="Couple Monogram" style="width:42px;height:42px;border-radius:10px;background:#FAF3E3;border:1.5px solid #C8A96E;color:#8C2D19;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;">
                  <span id="specimen-logo-monogram" style="display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;">
                    <span id="specimen-logo-monogram-initials" style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:#8C2D19;">M&amp;L</span>
                    <span id="specimen-logo-monogram-sub" style="display:none;">EST. 2026</span>
                  </span>
                  <img id="specimen-logo-img" src="" alt="Crest Logo" style="display:none;width:100%;height:100%;object-fit:contain;background:#FFFFFF;padding:2px;" />
                </div>
                <div style="min-width:0;flex:1;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <div id="specimen-client-headline" class="serif-display" style="font-size:1.18rem;color:#181412;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(plan.title || "Maya & Liam's Estate Reception")}</div>
                    <span id="specimen-harmony-pill" class="badge badge-emerald" style="font-size:0.76rem;padding:2px 8px;flex-shrink:0;">&#10003; ${plan.harmonyScore || 98}% Harmony</span>
                  </div>
                  <div id="specimen-meta-sub" style="font-size:0.80rem;color:#57534E;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><span id="sh-stage-venue-label">${escapeHtml(plan.venueName || 'Rosewood Conservatory')}</span> &middot; 62 Guests (8 Tables)</div>
                  <div id="specimen-salon-crest" style="display:none;"></div>
                  <div id="specimen-tagline-sub" style="display:none;"></div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
                <span id="sh-mom-sandbox-badge" class="badge badge-cyan" style="font-size:0.78rem;padding:4px 10px;cursor:pointer;" onclick="window.shToggleMomSandbox()">&#128117; Family Share: OFF</span>
                <button type="button" id="sh-stage-expand-btn" onclick="window.shToggleFullWidthStage()" style="font-size:0.78rem;font-weight:800;color:#181412;background:#FFFFFF;border:1px solid #C8A96E;padding:4px 10px;border-radius:999px;cursor:pointer;">&#9974; Expand</button>
              </div>
            </div>

            <!-- 4-Tab Switcher -->
            <div class="studio-stage-tabs" role="tablist" aria-label="SeatHarmony 4-Tab Operational Kit">
              <button id="sh-tab-floorplan" type="button" class="studio-stage-tab-btn tab-btn active" data-tab="llmsTxt" onclick="window.shSetActiveTab('floorplan')">&#127919; 1. Floorplan</button>
              <button id="sh-tab-beo" type="button" class="studio-stage-tab-btn tab-btn" data-tab="jsonLd" onclick="window.shSetActiveTab('beo')">&#127869; 2. Caterer BEO</button>
              <button id="sh-tab-poster" type="button" class="studio-stage-tab-btn" onclick="window.shSetActiveTab('poster')">&#129703; 3. 24&Prime;&times;36&Prime; Sign</button>
              <button id="sh-tab-qr" type="button" class="studio-stage-tab-btn" onclick="window.shSetActiveTab('qr')">&#128241; 4. Guest QR</button>
            </div>

            <!-- Foreground Specimen Card -->
            <div class="studio-foreground-specimen" id="studio-foreground-specimen">
              <!-- PANE 1: Interactive Floorplan & Selected Table Inspector -->
              <div id="sh-pane-floorplan" style="display:block;">
                <!-- Guided Wizard Step Banner (Shown in Steps 1–3, replaced by Full Micro-Toolbar in Step 4) -->
                <div id="sh-canvas-step-banner" style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;padding:7px 12px;background:#FAF3E6;border:1.5px solid #DFD3BE;border-radius:10px;">
                  <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                    <span id="sh-canvas-step-badge" style="font-size:0.74rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;background:#FFFFFF;color:#78350F;border:1px solid #C8A96E;padding:3px 9px;border-radius:999px;flex-shrink:0;">Step 1 of 4</span>
                    <span id="sh-canvas-step-hint" style="font-size:0.83rem;font-weight:700;color:#181412;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Pick a venue layout or add tables on the left. Drag tables to arrange.</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
                    <button type="button" id="sh-canvas-step-next-btn" onclick="window.scrollToShCard(2)" style="background:linear-gradient(135deg,#FDE68A,#E8C77D);color:#3B2A12;border:1px solid #C8A96E;border-radius:8px;padding:5px 11px;font-size:0.78rem;font-weight:800;cursor:pointer;white-space:nowrap;">Next: Add Guests &rarr;</button>
                  </div>
                </div>

                <!-- Micro-Editing Canvas Toolbar (Revealed in Step 4: Fine-Tune & Export) -->
                <div id="sh-canvas-micro-toolbar" style="display:none;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;padding:6px 10px;background:#FAF6EE;border:1px solid #E2D9C8;border-radius:10px;">
                  <div style="display:flex;align-items:center;gap:5px;flex-shrink:0;">
                    <button type="button" id="sh-zoom-room-btn" class="studio-tap-chip active" style="padding:4px 10px;font-size:0.80rem;" onclick="window.shSetCanvasZoom('room')">Full Room</button>
                    <button type="button" id="sh-zoom-15-btn" class="studio-tap-chip" style="padding:4px 10px;font-size:0.80rem;" onclick="window.shSetCanvasZoom('zoom15')">1.5&times; Zoom</button>
                    <button type="button" id="sh-zoom-table-btn" class="studio-tap-chip" style="padding:4px 10px;font-size:0.80rem;" onclick="window.shSetCanvasZoom('table')">Focus Table</button>
                  </div>
                  <div id="sh-live-toast" style="font-size:0.80rem;font-weight:700;color:#78350F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0;text-align:center;">
                    Fine-Tune Mode: Click any table or seat to edit
                  </div>
                  <div style="display:flex;align-items:center;gap:5px;flex-shrink:0;">
                    <button type="button" id="sh-toolbar-add-table-btn" class="studio-tap-chip" style="padding:4px 10px;font-size:0.80rem;border-color:#065F46;background:#ECFDF5;color:#065F46;font-weight:800;" onclick="window.shAddNewTable()">+ Table</button>
                    <button type="button" id="sh-toolbar-add-landmark-btn" class="studio-tap-chip" style="padding:4px 10px;font-size:0.80rem;border-color:#C8A96E;background:#FFFFFF;color:#78350F;font-weight:800;" onclick="window.shAddLandmark()">+ Element</button>
                  </div>
                </div>

                <!-- Active Seat Swap / Drag Banner -->
                <div id="sh-active-swap-banner" style="display:none;margin-bottom:8px;padding:7px 12px;border-radius:9px;background:#FEF3C7;border:1.5px solid #D97706;color:#78350F;font-size:0.75rem;font-weight:800;align-items:center;justify-content:space-between;gap:8px;"></div>

                <div style="width:100%;overflow:hidden;border-radius:12px;border:1.5px solid #DFD5C3;background:#FAF7F2;margin-bottom:8px;position:relative;">
                  <svg id="sh-floorplan-svg" viewBox="0 0 1120 680" style="width:100%;height:auto;min-height:480px;display:block;touch-action:none;user-select:none;" role="img" aria-label="Interactive Wedding & Event Floorplan Canvas"></svg>
                </div>
                <div id="sh-selected-table-box" style="display:none;padding:12px;border-radius:10px;background:#FAF7F2;border:1px solid #E2D9C8;"></div>
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
                    <button type="button" class="studio-tap-chip active" data-poster-sort="alphabetical" onclick="window.shSetPosterMode('alphabetical',null)">Sort A-Z</button>
                    <button type="button" class="studio-tap-chip" data-poster-sort="by_table" onclick="window.shSetPosterMode('by_table',null)">By Table</button>
                    <button type="button" class="studio-tap-chip active" data-poster-theme="alabaster" onclick="window.shSetPosterMode(null,'alabaster')">Parisian Gold</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="ivory" onclick="window.shSetPosterMode(null,'ivory')">Botanical Ivory</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="obsidian" onclick="window.shSetPosterMode(null,'obsidian')">Editorial Noir</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="sage" onclick="window.shSetPosterMode(null,'sage')">Tuscan Sage</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="rosewater" onclick="window.shSetPosterMode(null,'rosewater')">Blush Rosewater</button>
                    <button type="button" class="studio-tap-chip" data-poster-theme="terracotta" onclick="window.shSetPosterMode(null,'terracotta')">Villa Terracotta</button>
                  </div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap;">
                    <a id="sh-open-poster-studio-link" href="/print/poster/${vId}" target="_blank" class="btn btn-secondary" style="padding:6px 10px;font-size:0.73rem;">&#129703; 24&Prime;&times;36&Prime; Print Studio &nearr;</a>
                    <a id="sh-open-avery-studio-link" href="/print/avery-5302/${vId}" target="_blank" class="btn btn-secondary" style="padding:6px 10px;font-size:0.73rem;">&#127915; Avery 5302 Sheet &nearr;</a>
                    <a id="sh-pane-poster-buy-link" href="/buy/complete_dossier?target=estate-150&amp;vault=${vId}" class="btn btn-primary" style="padding:6px 11px;font-size:0.73rem;">&#11015; Unlock 300-DPI PDF ($14.99)</a>
                  </div>
                </div>
                <div id="sh-poster-preview" style="max-height:370px;overflow-y:auto;margin-bottom:10px;"></div>
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
                    <a id="sh-open-qr-app-link" href="/qr/${vId}" target="_blank" class="btn btn-primary" style="padding:6px 11px;font-size:0.73rem;">&#128241; Open Guest Mobile Lookup &nearr;</a>
                    <button type="button" class="btn btn-secondary" style="padding:6px 11px;font-size:0.73rem;" onclick="window.shCopyMomSandboxLink()">&#128117; Copy Family Share Link</button>
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
                    <label for="sh-qr-search" class="studio-field-label" style="margin-bottom:0;">Test What Guests See on Their Phones at Cocktail Hour:</label>
                    <input id="sh-qr-search" type="text" class="grader-input" placeholder="Type guest name or table (e.g. Eleanor, Chen, Miller, Table 2)..." oninput="window.shFilterQrLookup()" aria-label="Search guest name" />
                    <div id="sh-qr-results" style="display:flex;flex-direction:column;gap:6px;max-height:245px;overflow-y:auto;"></div>
                  </div>
                </div>
              </div>
              <pre id="compiler-code-output" style="display:none;" aria-hidden="true"># Supabase SeatHarmony Manifest\n{"@graph":[]}</pre>
            </div>

            <!-- Stage Footer -->
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;font-size:0.78rem;color:#78716C;padding:2px 4px 0;">
              <a id="sh-footer-vault-link" href="/vault/${vId}" style="color:#065F46;font-weight:700;text-decoration:none;">Print Command Center (/vault/${vId}) &nearr;</a>
              <a href="/directory" style="color:#78350F;font-weight:700;text-decoration:none;">60+ Venue Floorplans &nearr;</a>
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
          <button type="button" onclick="window.shCloseVaultModal()" style="background:#EFECE6;border:1px solid #D6CFC2;border-radius:8px;padding:6px 12px;font-weight:800;cursor:pointer;white-space:nowrap;">&#10005; Close</button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:16px;">
          <div style="background:#FFFFFF;border:1.5px solid #C8A96E;border-radius:14px;padding:16px;">
            <div class="badge badge-emerald" style="margin-bottom:6px;white-space:nowrap;">1. SAVE CURRENT FLOORPLAN (#<span id="sh-modal-vault-code">${vId}</span>)</div>
            <h4 class="serif-display" style="font-size:1.18rem;margin-bottom:6px;">Link Email &amp; Get All 5 Live URLs</h4>
            <p style="font-size:0.78rem;color:#57534E;margin-bottom:10px;line-height:1.45;">Save your tables and guest list to our cloud vault to edit from any device or print 48 hours out.</p>
            <label for="sh-vault-email-input" class="studio-field-label">Your Bride / Groom / Planner Email:</label>
            <input id="sh-vault-email-input" type="email" class="grader-input" style="width:100%;margin-bottom:8px;" placeholder="maya@example.com" value="${escapeHtml(plan.ownerEmail || '')}" />
            <label for="sh-vault-pin-input" class="studio-field-label">Optional 4-Digit Edit PIN:</label>
            <input id="sh-vault-pin-input" type="text" maxlength="8" class="grader-input" style="width:100%;margin-bottom:10px;" placeholder="2026" value="2026" />
            <button type="button" id="sh-vault-save-submit-btn" class="btn btn-primary" style="width:100%;padding:10px;" onclick="window.shSaveVaultToServer()">&#128190; Save My Event &amp; Generate Magic Links</button>
            <div id="sh-vault-saved-links-box" style="margin-top:10px;padding:10px;border-radius:10px;background:#FAF6EE;border:1px solid #E2D9C8;font-size:0.74rem;">
              <div style="font-weight:800;color:#065F46;margin-bottom:4px;">&#10003; Active Links for Vault #<span id="sh-modal-links-vault-id">${vId}</span>:</div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <a id="sh-modal-link-vault" href="/vault/${vId}" style="color:#8C2D19;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">&#128275; Command Center (/vault/${vId}) &nearr;</a>
                <a id="sh-modal-link-poster" href="/print/poster/${vId}" target="_blank" style="color:#181412;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">&#129703; 24&Prime;&times;36&Prime; Poster Studio (/print/poster/${vId}) &nearr;</a>
                <a id="sh-modal-link-avery" href="/print/avery-5302/${vId}" target="_blank" style="color:#181412;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">&#127915; Avery 5302 Place Cards (/print/avery-5302/${vId}) &nearr;</a>
                <a id="sh-modal-link-beo" href="/print/beo/${vId}" target="_blank" style="color:#181412;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">&#127869; Signed Caterer BEO (/print/beo/${vId}) &nearr;</a>
                <a id="sh-modal-link-qr" href="/qr/${vId}" target="_blank" style="color:#065F46;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">&#128241; Guest QR Lookup (/qr/${vId}) &nearr;</a>
              </div>
            </div>
          </div>

          <div style="background:#FFFFFF;border:1px solid #E2D9C8;border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div class="badge badge-amber" style="margin-bottom:6px;white-space:nowrap;">2. RETURNING USER / COORDINATOR LOGIN</div>
              <h4 class="serif-display" style="font-size:1.18rem;margin-bottom:6px;">Load a Saved Reception Vault</h4>
              <p style="font-size:0.78rem;color:#57534E;margin-bottom:10px;line-height:1.45;">Enter your saved email or Vault Code (e.g. <code>test@seatharmony.com</code> or <code>SH-4819</code>) to restore your event:</p>
              <label for="sh-vault-lookup-input" class="studio-field-label">Email Address or Vault Code:</label>
              <input id="sh-vault-lookup-input" type="text" class="grader-input" style="width:100%;margin-bottom:8px;" placeholder="test@seatharmony.com or SH-4819" />
              <button type="button" id="sh-vault-lookup-btn" class="btn btn-secondary" style="width:100%;padding:10px;" onclick="window.shLookupSavedVault()">&#128275; Load My Saved Event</button>
              <div id="sh-vault-lookup-status" style="margin-top:10px;font-size:0.76rem;color:#44403C;"></div>
            </div>
            <div style="margin-top:12px;padding:10px 12px;border-radius:10px;background:#ECFDF5;border:1.5px solid #10B981;font-size:0.74rem;color:#065F46;">
              <div style="font-weight:800;margin-bottom:4px;white-space:nowrap;">&#9889; TEST ACCOUNT (UNLOCKED PRO PACK):</div>
              <div class="mono" style="font-size:0.70rem;color:#181412;margin-bottom:6px;white-space:nowrap;"><strong>test@seatharmony.com</strong> &bull; Vault: <strong>SH-4819</strong> &bull; PIN: <strong>2026</strong></div>
              <div style="display:flex;gap:6px;flex-wrap:nowrap;">
                <button type="button" id="sh-test-login-btn" onclick="window.shLoginWithTestAccount && window.shLoginWithTestAccount('SH-4819')" style="cursor:pointer;background:#065F46;color:#FFFFFF;border:1px solid #10B981;border-radius:7px;padding:6px 9px;font-size:0.72rem;font-weight:800;white-space:nowrap;">&#9889; 1-Click Test Login (#SH-4819)</button>
                <a href="/vault/SH-4819?unlocked=1" style="background:#FFFFFF;color:#065F46;border:1px solid #10B981;border-radius:7px;padding:6px 9px;font-size:0.72rem;font-weight:800;text-decoration:none;white-space:nowrap;">Command Center &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderZone5FaqAndZone6Close(sampleSeoPages = []) {
  const seoLinks = sampleSeoPages.slice(0, 12).map(p =>
    `<a href="/seo/${escapeHtml(p.slug)}" style="font-size:0.86rem;color:#44403C;text-decoration:none;padding:7px 12px;border-radius:8px;background:#FFFFFF;border:1px solid #E2D9C8;font-weight:600;">${escapeHtml(p.title)}</a>`
  ).join('');

  return `
  <!-- ZONE 5: 5-QUESTION FAQ -->
  <section class="studio-zone-section" id="faq" style="border-top:1px solid #E5D9C5;">
    <div class="container">
      <div class="bs-section-header">
        <div class="bs-section-eyebrow">COMMON QUESTIONS</div>
        <h2 class="bs-section-h2">Five quick answers <em>before you print.</em></h2>
      </div>

      <div class="studio-faq-stack">
        <details class="studio-faq-item" open>
          <summary><span>1. What if guests drop out 48 hours before the wedding?</span><span>&#9662;</span></summary>
          <div style="padding-top:12px;font-size:1.05rem;color:#44403C;line-height:1.65;max-width:64ch;">
            Delete or swap them on the floorplan in 2 clicks. Your <strong>12:00 Caterer Meal Sheet (BEO)</strong>, <strong>24&Prime;&times;36&Prime; Welcome Sign</strong>, <strong>Avery 5302 Place Cards</strong>, and <strong>QR Lookup</strong> update automatically, with unlimited free re-exports for 30 days.
          </div>
        </details>
        <details class="studio-faq-item">
          <summary><span>2. Can Mom edit family tables without touching our friends&rsquo; tables?</span><span>&#9662;</span></summary>
          <div style="padding-top:12px;font-size:1.05rem;color:#44403C;line-height:1.65;max-width:64ch;">
            Yes. Click <strong>&ldquo;Copy Family Link (Tables 1-3)&rdquo;</strong> in Step 4 to share a link where Tables 1-3 are editable and Tables 4-8 are safely locked.
          </div>
        </details>
        <details class="studio-faq-item">
          <summary><span>3. Will the 24&Prime;&times;36&Prime; poster print cleanly at FedEx Office or Staples?</span><span>&#9662;</span></summary>
          <div style="padding-top:12px;font-size:1.05rem;color:#44403C;line-height:1.65;max-width:64ch;">
            Yes. Every poster is a 300-DPI vector PDF sized to <strong>Arch D (24&Prime;&times;36&Prime;)</strong> with <code>0.125&Prime;</code> bleed and crop marks, plus <strong>Avery 5302</strong> tent card sheets.
          </div>
        </details>
        <details class="studio-faq-item">
          <summary><span>4. How does the Clockwise 12:00 Caterer Meal Sheet (BEO) work?</span><span>&#9662;</span></summary>
          <div style="padding-top:12px;font-size:1.05rem;color:#44403C;line-height:1.65;max-width:64ch;">
            Seat #1 is anchored at <strong>12 o&rsquo;clock (red dot)</strong> and numbered clockwise so servers set down Filet, Halibut, Vegan, and Allergy plates without asking guests.
          </div>
        </details>
        <details class="studio-faq-item">
          <summary><span>5. Is $14.99 really a one-time payment?</span><span>&#9662;</span></summary>
          <div style="padding-top:12px;font-size:1.05rem;color:#44403C;line-height:1.65;max-width:64ch;">
            100% yes. Pay <strong>$14.99 once</strong> with zero recurring fees, 30 days of free edits, and an instant 30-day refund guarantee.
          </div>
        </details>
      </div>
    </div>
  </section>

  <!-- ZONE 6: PRICING & FINAL CLOSING AT BOTTOM OF LANDING PAGE -->
  <section class="studio-zone-section" id="pricing" style="background:linear-gradient(180deg, #FAF3E6 0%, #FFFDF9 100%);border-top:1px solid #E5D9C5;">
    <div class="container">
      <div class="bs-section-header">
        <div class="bs-section-eyebrow">PAY ONCE OR PLANNER PRO &middot; ZERO WATERMARK</div>
        <h2 class="bs-section-h2">Design free. Unlock print &amp; caterer files <em>when ready.</em></h2>
      </div>
      <div class="pricing-grid" style="margin-bottom:44px;">
        <div class="panel" style="padding:30px 26px;display:flex;flex-direction:column;justify-content:space-between;gap:18px;">
          <div>
            <span class="badge badge-cyan" style="margin-bottom:10px;">CATERER &amp; QR PASS</span>
            <h4 class="serif-display" style="font-size:1.65rem;">Caterer Meal Sheet &amp; QR Lookup</h4>
            <div class="tabular" style="font-size:2.35rem;font-weight:800;margin:8px 0;">$1.99 <span style="font-size:0.95rem;font-weight:600;color:#78716C;">once</span></div>
            <ul style="list-style:none;font-size:1.0rem;color:#44403C;display:flex;flex-direction:column;gap:11px;margin-top:12px;line-height:1.55;">
              <li>&#10003; Clockwise <code>Seat 1..N</code> Caterer Meal Sheet (BEO)</li>
              <li>&#10003; Allergy &amp; High-Chair Kitchen Manifest</li>
              <li>&#10003; Live Mobile QR Guest Seat Lookup</li>
            </ul>
          </div>
          <a href="/buy/flash_pass?target=estate-150" class="btn btn-secondary" style="width:100%;padding:14px 20px;font-size:0.96rem;">Get Caterer &amp; QR Pass ($1.99)</a>
        </div>
        <div class="panel" style="padding:30px 26px;border:2px solid #8C2D19;display:flex;flex-direction:column;justify-content:space-between;gap:18px;position:relative;">
          <span class="badge badge-rose" style="position:absolute;top:-12px;right:18px;background:#8C2D19;color:#FFF;">MOST POPULAR</span>
          <div>
            <span class="badge badge-amber" style="margin-bottom:10px;">ONE-TIME WEDDING PACK</span>
            <h4 class="serif-display" style="font-size:1.65rem;">Complete Print &amp; Caterer Pack</h4>
            <div class="tabular" style="font-size:2.35rem;font-weight:800;margin:8px 0;color:#8C2D19;">$14.99 <span style="font-size:0.95rem;font-weight:600;color:#78716C;">once</span></div>
            <ul style="list-style:none;font-size:1.0rem;color:#181412;display:flex;flex-direction:column;gap:11px;font-weight:600;margin-top:12px;line-height:1.55;">
              <li>&#10003; 24&Prime;&times;36&Prime; Easel Welcome Sign PDF (<code>0.125&Prime;</code> Bleed)</li>
              <li>&#10003; Avery 5302 Place Cards PDF (Meal Icons)</li>
              <li>&#10003; Clockwise 12:00 Caterer Meal Sheet (BEO)</li>
              <li>&#10003; Family Share Link + QR Lookup (30-Day Edits)</li>
            </ul>
          </div>
          <a href="/buy/complete_dossier?target=estate-150" class="btn btn-primary" style="width:100%;padding:14px 20px;font-size:0.96rem;">Get Wedding Print Pack ($14.99) &rarr;</a>
        </div>
        <div class="panel" style="padding:30px 26px;display:flex;flex-direction:column;justify-content:space-between;gap:18px;">
          <div>
            <span class="badge badge-emerald" style="margin-bottom:10px;">PLANNERS &amp; VENUES</span>
            <h4 class="serif-display" style="font-size:1.65rem;">Planner Pro Studio</h4>
            <div class="tabular" style="font-size:2.35rem;font-weight:800;margin:8px 0;">$39 <span style="font-size:0.95rem;font-weight:600;color:#78716C;">/ month</span></div>
            <ul style="list-style:none;font-size:1.0rem;color:#44403C;display:flex;flex-direction:column;gap:11px;margin-top:12px;line-height:1.55;">
              <li>&#10003; Unlimited Receptions &amp; 300-Guest Galas</li>
              <li>&#10003; Custom Planner Crest on All Meal Sheets</li>
              <li>&#10003; Unlimited Client &amp; Family Share Links</li>
            </ul>
          </div>
          <a href="/buy/pro_b2b?target=estate-150" class="btn btn-secondary" style="width:100%;padding:14px 20px;font-size:0.96rem;">Start Planner Pro ($39/mo) &rarr;</a>
        </div>
      </div>

      ${seoLinks ? `
      <div style="margin-top:72px;margin-bottom:32px;padding-top:40px;border-top:1px solid #E5D9C5;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
          <span style="font-size:0.82rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#78716C;">POPULAR VENUE FLOORPLAN TEMPLATES</span>
          <a href="/directory" style="font-size:0.88rem;font-weight:700;color:#8C2D19;text-decoration:none;">Browse All 60+ Templates &rarr;</a>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">${seoLinks}</div>
      </div>` : ''}

      <div style="background:linear-gradient(135deg,#FFFDF9 0%,#F5ECE0 100%);color:#181412;border:2px solid #C8A96E;border-radius:22px;padding:36px 30px;text-align:center;box-shadow:0 16px 38px rgba(120,83,40,0.10);">
        <div class="studio-eyebrow-kicker">READY FOR A DRAMA-FREE RECEPTION?</div>
        <h2 class="serif-display" style="font-size:clamp(1.9rem, 3vw, 2.4rem);color:#181412;max-width:740px;margin:0 auto 10px;line-height:1.15;">Every Table Solved in 30 Seconds.</h2>
        <p style="font-size:1.05rem;color:#57534E;max-width:620px;margin:0 auto 18px;">Every couple together, both moms happy, and your 24&Prime;&times;36&Prime; welcome sign ready for FedEx.</p>
        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-top:16px;">
          <a href="#studio" class="btn btn-primary" style="padding:14px 26px;font-size:0.96rem;">&uarr; Open Interactive Studio</a>
          <a href="/buy/complete_dossier?target=estate-150" class="btn btn-secondary" style="padding:14px 24px;font-size:0.94rem;">&#10022; Unlock Print &amp; BEO Pack ($14.99) &rarr;</a>
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
    renderZone1Hero(plan), renderZone2Walkthrough(), renderZone4ProofStackAndPricing(), renderZone3InteractiveStudio(plan), renderZone5FaqAndZone6Close(sampleSeoPages),
    '</main>', renderFooter(), renderInteractiveScript(plan), '</body></html>'
  ].join('\n');
}

function renderLandingPage(initialAudit) { return renderHomePage(initialAudit, []); }

function renderDirectoryPage(seoPages = []) {
  const cards = seoPages.map(p => `<a href="/seo/${escapeHtml(p.slug)}" class="panel" style="padding:20px;text-decoration:none;color:inherit;display:flex;flex-direction:column;justify-content:space-between;gap:12px;"><div><div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:8px;"><span class="badge badge-cyan" style="font-size:0.68rem;padding:3px 8px;">${escapeHtml(p.category || 'Wedding Floorplan')}</span><span class="badge badge-emerald tabular" style="font-size:0.68rem;padding:3px 8px;">${escapeHtml(String(p.csov_score || 98))}% Harmony</span></div><h3 class="serif-display" style="font-size:1.22rem;color:#181412;margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escapeHtml(p.title)}</h3><p style="font-size:0.84rem;color:#44403C;line-height:1.48;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escapeHtml(p.meta_description)}</p></div><div style="font-size:0.80rem;font-weight:800;color:#8C2D19;">Open Floorplan &amp; BEO Template &rarr;</div></a>`).join('');
  return [
    renderHead({ title: '60+ Wedding & Event Seating Chart Floorplan Templates | SeatHarmony Directory', description: 'Browse 60+ verified wedding reception, rehearsal dinner, Tuscan banquet, and charity gala floorplan templates with clockwise caterer BEOs and 24"×36" welcome signs.', canonicalPath: '/directory', ogSlug: 'directory' }),
    '<body>', renderNavbar(),
    `<main class="container" style="padding:48px 24px 72px;"><div style="max-width:740px;margin:0 auto 36px;text-align:center;"><div class="studio-eyebrow-kicker" style="margin-left:auto;margin-right:auto;">PROGRAMMATIC FLOORPLAN &amp; BEO DIRECTORY</div><h1 class="studio-zone-title" style="text-align:center;">60+ Verified Wedding &amp; Event Floorplan Templates</h1><p style="font-size:0.98rem;color:#44403C;line-height:1.55;margin:0 auto;">Select any guest count, table geometry (60&Prime; Round, 8ft Banquet, Sweetheart, or King&rsquo;s Table), or family seating scenario to launch in the interactive studio.</p></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px;">${cards}</div></main>`,
    renderFooter(), '</body></html>'
  ].join('\n');
}

function renderSeoDetailPage(pageRow, relatedPages = []) {
  let payload = {};
  try { payload = JSON.parse(pageRow.payload_json || '{}'); } catch (_) {}
  const faqs = Array.isArray(payload.faqs) ? payload.faqs : [];
  const faqHtml = faqs.map(f => `<details class="studio-faq-item" open><summary><span>${escapeHtml(f.question)}</span><span>&#9662;</span></summary><div style="padding-top:8px;font-size:0.92rem;color:#44403C;line-height:1.55;">${escapeHtml(f.answer)}</div></details>`).join('');
  const relHtml = relatedPages.map(r => `<a href="/seo/${escapeHtml(r.slug)}" class="panel" style="padding:14px;text-decoration:none;color:inherit;"><div style="font-size:0.72rem;font-weight:800;color:#8C2D19;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(r.category)} &middot; ${escapeHtml(String(r.csov_score))}% Harmony</div><div style="font-weight:700;font-size:0.90rem;color:#181412;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escapeHtml(r.title)}</div></a>`).join('');
  return [
    renderHead({ title: `${pageRow.title} | SeatHarmony Studio`, description: pageRow.meta_description, canonicalPath: `/seo/${pageRow.slug}`, ogSlug: pageRow.slug }),
    '<body>', renderNavbar(),
    `<main class="container" style="padding:48px 24px 72px;"><div style="max-width:860px;margin:0 auto;"><div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;"><a href="/directory" style="font-size:0.82rem;font-weight:700;color:#8C2D19;text-decoration:none;">&larr; All 60+ Floorplans</a><span class="badge badge-emerald">${escapeHtml(pageRow.category)} &middot; ${escapeHtml(String(pageRow.csov_score))}% Harmony</span></div><h1 class="studio-zone-title" style="margin-bottom:12px;">${escapeHtml(pageRow.title)}</h1><p style="font-size:1.02rem;color:#44403C;line-height:1.58;margin-bottom:24px;max-width:65ch;">${escapeHtml(payload.summary || pageRow.meta_description)}</p><div class="panel" style="padding:24px;margin-bottom:28px;background:#FAF6EE;border-color:#C8A96E;"><h2 class="serif-display" style="font-size:1.5rem;margin-bottom:6px;">Customize This Floorplan Live in Studio</h2><p style="font-size:0.92rem;color:#44403C;line-height:1.5;margin-bottom:16px;max-width:62ch;">Load this table geometry, run the 1-click family conflict solver, and export your Clockwise 12:00 Caterer BEO and 24&Prime;&times;36&Prime; Welcome Sign.</p><div style="display:flex;gap:12px;flex-wrap:wrap;"><a href="/?preset=${encodeURIComponent(pageRow.slug)}#studio" class="btn btn-primary">Load Template in Interactive Studio &rarr;</a><a href="/buy/complete_dossier?target=${encodeURIComponent(pageRow.slug)}" class="btn btn-secondary">Unlock Print &amp; BEO Pack ($14.99)</a></div></div>${faqHtml ? `<h2 class="serif-display" style="font-size:1.6rem;margin-bottom:12px;">Layout &amp; Catering Specifications</h2><div style="display:flex;flex-direction:column;gap:10px;margin-bottom:32px;">${faqHtml}</div>` : ''}<h3 class="serif-display" style="font-size:1.4rem;margin-bottom:12px;">Related Reception &amp; Event Floorplans</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;">${relHtml}</div></div></main>`,
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

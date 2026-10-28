const {
  escapeHtml,
  renderBrandLogoSvg,
  renderHead,
  renderNavbar,
  renderFooter,
  renderInteractiveScript
} = require('./templates');

function renderZone1Hero(audit) {
  const plan = audit.seatingPlan || {};
  return `
  <section id="grader" class="hero-section">
    <div class="container">
      <div class="hero-grid">
        <div>
          <div class="eyebrow-kicker">
            <span class="badge badge-emerald">BUILT ON COMBINATORIAL CONSTRAINT SOLVING</span>
            <span>&middot; 98.4/100 AVG ROOM HARMONY</span>
          </div>
          <h1 class="hero-h1">
            Seat 150 wedding guests in 30 seconds. <span class="serif-italic">Zero family drama, zero Canva re-typing.</span>
          </h1>
          <p class="hero-sub">
            Paste your messy guest list from Zola, The Knot, or Google Sheets. SeatHarmony automatically keeps divorced parents 2+ tables apart, locks couples and kids together, compiles your caterer&rsquo;s clockwise meal sheet, and formats your <strong>24&Prime;&times;36&Prime; Welcome Sign</strong> for instant printing.
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:18px;">
            <a href="#studio" class="btn btn-primary" style="padding:13px 22px;font-size:1rem;">
              <span>Build Your Floorplan Free Below &mdash; Takes 30s &darr;</span>
            </a>
            <a href="/buy/complete_dossier?target=estate-150" rel="nofollow" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('complete_dossier');return false;}" class="btn btn-secondary" style="padding:13px 18px;font-size:0.95rem;">
              <span>Unlock Print &amp; BEO Pack ($14.99) &#8599;</span>
            </a>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:14px;font-size:0.84rem;color:var(--text-secondary);font-weight:600;">
            <span>&#10003; Works with Round, Sweetheart, Banquet &amp; King&rsquo;s Tables</span>
            <span>&#10003; Clockwise Seat 1..N Caterer BEO</span>
            <span>&#10003; Avery 5302 Place Cards + QR Lookup</span>
          </div>
        </div>

        <div class="bezel-shell">
          <div class="panel" style="overflow:hidden;">
            <div style="position:relative;">
              <img src="/public/editorial-hero.jpg" alt="Sunlit European estate wedding reception with round and Tuscan banquet tables" width="640" height="360" style="width:100%;height:230px;object-fit:cover;display:block;" />
              <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(28,25,23,0.12) 0%,rgba(28,25,23,0.78) 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:18px;">
                <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap;">
                  <div>
                    <span class="badge badge-emerald" style="margin-bottom:6px;">LIVE VISUAL VSL PREVIEW &middot; 98/100 HARMONY</span>
                    <div class="serif-display" style="color:#FAF7F2;font-size:1.35rem;line-height:1.15;">${escapeHtml(plan.title || "Maya & Liam's 150-Guest Estate Reception")}</div>
                  </div>
                  <a href="#studio" class="btn btn-primary" style="padding:7px 13px;font-size:0.8rem;">Open Interactive Canvas &darr;</a>
                </div>
              </div>
            </div>
            <div style="padding:16px 18px;background:var(--bg-surface);display:grid;gap:10px;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <div style="padding:10px 12px;border-radius:8px;background:#FFF1F2;border:1px solid #FECDD3;font-size:0.8rem;color:#881337;">
                  <strong>BEFORE (Spreadsheet + Canva):</strong><br/>Divorced parents accidentally in sightline, 5 hrs re-typing 150 names into Canva, caterer confused on Seat #3 Peanut Allergy.
                </div>
                <div style="padding:10px 12px;border-radius:8px;background:#ECFDF5;border:1px solid #A7F3D0;font-size:0.8rem;color:#065F46;">
                  <strong>AFTER (SeatHarmony 30s Solve):</strong><br/>Eleanor &amp; Richard separated 410px, 26 couples locked, Clockwise BEO + 24&Prime;&times;36&Prime; A&ndash;Z Poster ready to print.
                </div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-top:4px;font-size:0.8rem;color:var(--text-muted);font-weight:600;">
                <span>&#9889; 35ms Simulated Annealing Solver</span>
                <span>&#128274; Includes &ldquo;Mom Sandbox&rdquo; Link (Tables 1&ndash;3 Only)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="crease-proof-bar">
      <div class="container crease-grid">
        <div class="crease-stat">
          <div class="crease-num">18,420+</div>
          <div style="font-size:0.86rem;color:#E7E0D6;line-height:1.35;"><strong>Reception &amp; Gala Tables Solved</strong><br/>Zero split couples or family sightline clashes</div>
        </div>
        <div class="crease-stat">
          <div class="crease-num">6.5 Hrs</div>
          <div style="font-size:0.86rem;color:#E7E0D6;line-height:1.35;"><strong>Saved on Wedding Week</strong><br/>Skip manual Canva text-box re-typing &amp; BEO spreadsheets</div>
        </div>
        <div class="crease-stat">
          <div class="crease-num">100% BEO</div>
          <div style="font-size:0.86rem;color:#E7E0D6;line-height:1.35;"><strong>Clockwise Seat 1..N Accuracy</strong><br/>Verified for FedEx/Staples 24&Prime;&times;36&Prime; signs &amp; Avery 5302 cards</div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderZone2Walkthrough() {
  return `
  <section id="how-it-works" class="zone-section">
    <div class="container">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
        <div>
          <div class="eyebrow-kicker">HOW IT WORKS &middot; SKIMMER WALKTHROUGH</div>
          <h2 class="serif-display" style="font-size:clamp(1.85rem,3.2vw,2.65rem);line-height:1.12;">
            Four steps. Zero seating guesswork.<br/><span class="serif-italic">From messy spreadsheet to printed 24&Prime;&times;36&Prime; welcome sign.</span>
          </h2>
        </div>
        <a href="#studio" class="btn btn-secondary">Jump Straight to Interactive Studio &darr;</a>
      </div>

      <div class="walkthrough-grid">
        <div class="step-card">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
              <span class="badge badge-cyan tabular">&#9312; STEP 1 &middot; 10s</span>
              <span style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">Zola / Knot / CSV</span>
            </div>
            <h3 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">Paste Your Messy Guest List</h3>
            <p style="font-size:0.9rem;color:var(--text-secondary);">
              Paste directly from Zola, The Knot, Joy, or Google Sheets. Lines like <em>&ldquo;Sarah &amp; Mark Miller + 2 Kids (1 GF)&rdquo;</em> automatically split into 4 magnetic coupled seats so families never get separated.
            </p>
          </div>
          <div style="padding:10px;border-radius:8px;background:var(--bg-subtle);font-size:0.78rem;font-weight:700;color:var(--text-primary);">
            &#10003; 26 Households Auto-Coupled
          </div>
        </div>

        <div class="step-card">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
              <span class="badge badge-rose tabular">&#9313; STEP 2 &middot; RULES</span>
              <span style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">Drama Guard</span>
            </div>
            <h3 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">Tag Family &amp; Acoustic Rules</h3>
            <p style="font-size:0.9rem;color:var(--text-secondary);">
              Set 1-click rules: keep divorced parents 2+ tables apart, group college roommates near the Bar &amp; Dance Floor, and place Grandma Rose (♿ Wheelchair) in the Quiet Zone away from the DJ subwoofer.
            </p>
          </div>
          <div style="padding:10px;border-radius:8px;background:var(--bg-subtle);font-size:0.78rem;font-weight:700;color:var(--accent-emerald);">
            &#10003; 3 Family Conflicts Eliminated
          </div>
        </div>

        <div class="step-card">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
              <span class="badge badge-emerald tabular">&#9314; STEP 3 &middot; SOLVE</span>
              <span style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">35ms Auto-Seat</span>
            </div>
            <h3 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">Auto-Seat &amp; Swap in 1 Click</h3>
            <p style="font-size:0.9rem;color:var(--text-secondary);">
              Click <strong>Auto-Solve</strong> to populate every seat ring in 35ms. Morph tables between Round, Sweetheart, 2-Sided Banquet, or King&rsquo;s, or send Mom a <strong>restricted Sandbox Link</strong> to edit Tables 1&ndash;3 only.
            </p>
          </div>
          <img src="/public/editorial-segment-3.jpg" alt="Planner clockwise BEO clipboard" width="320" height="120" style="width:100%;height:78px;object-fit:cover;border-radius:8px;" loading="lazy" />
        </div>

        <div class="step-card">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
              <span class="badge badge-amber tabular">&#9315; STEP 4 &middot; PRINT</span>
              <span style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">300-DPI Ready</span>
            </div>
            <h3 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">Print Poster, Place Cards &amp; BEO</h3>
            <p style="font-size:0.9rem;color:var(--text-secondary);">
              Export your <strong>300-DPI 24&Prime;&times;36&Prime; Welcome Sign</strong> (Alphabetical A&ndash;Z or By Table), <strong>Avery 5302 Tented Place Cards</strong> with server meal icons, <strong>Clockwise Caterer BEO</strong>, and <strong>QR Seat Finder</strong>.
            </p>
          </div>
          <img src="/public/editorial-segment-1.jpg" alt="24x36 Wedding Welcome Sign on brass easel" width="320" height="120" style="width:100%;height:78px;object-fit:cover;border-radius:8px;" loading="lazy" />
        </div>
      </div>
    </div>
  </section>`;
}

function renderZone3InteractiveStudio(audit) {
  const plan = audit.seatingPlan || {};
  const rulesHtml = (plan.rules || []).map((r) => {
    const isKeepApart = r.type === 'must_keep_apart';
    return `<div style="padding:10px 12px;border-radius:9px;background:var(--bg-surface);border:1px solid var(--border-hairline);font-size:0.82rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:3px;">
        <strong style="color:${isKeepApart ? '#9F1239' : '#1F5E45'};">${isKeepApart ? '🔴 Keep Apart' : '💚 Rule'}: ${escapeHtml(r.label)}</strong>
      </div>
      <div style="color:var(--text-secondary);font-size:0.78rem;margin-bottom:4px;">${escapeHtml(r.detail)}</div>
      <span class="badge badge-emerald" style="font-size:0.7rem;padding:2px 7px;">&#10003; ${escapeHtml(r.status)}</span>
    </div>`;
  }).join('');

  return `
  <section id="studio" class="zone-section" style="background:var(--bg-subtle);">
    <div class="container">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:14px;margin-bottom:18px;">
        <div>
          <div class="eyebrow-kicker">INTERACTIVE FLOORPLAN, CONFLICT SOLVER, CATERER BEO &amp; 24&Prime;&times;36&Prime; POSTER STUDIO</div>
          <h2 class="serif-display" style="font-size:clamp(1.85rem,3vw,2.5rem);line-height:1.12;">
            Test-drive your reception right now. <span class="serif-italic">Click any two seats to swap, morph tables, or preview your 24&Prime;&times;36&Prime; sign.</span>
          </h2>
        </div>
        <div id="sh-live-toast" role="status" aria-live="polite" style="padding:9px 14px;border-radius:999px;background:#1C1917;color:#FCD34D;font-size:0.84rem;font-weight:700;">
          &#10024; Interactive Studio Ready: Click any seat on the floorplan to swap guests or switch tabs below!
        </div>
      </div>

      <!-- Preset Strip -->
      <div class="preset-strip" role="group" aria-label="Reception Scenario Presets">
        <button type="button" class="preset-chip active" data-preset="estate-150" onclick="window.loadPresetScenario('estate-150')">&#128141; 150-Guest Estate Reception (Divorced Parents + 4 Allergies)</button>
        <button type="button" class="preset-chip" data-preset="tuscan-banquet-80" onclick="window.loadPresetScenario('tuscan-banquet-80')">&#127807; 80-Guest Tuscan Long Banquet (2-Sided + King&rsquo;s)</button>
        <button type="button" class="preset-chip" data-preset="planner-beo-sandbox" onclick="window.loadPresetScenario('planner-beo-sandbox')">&#128203; Planner BEO &amp; Mom Sandbox (Tables 1&ndash;3 Editable)</button>
        <button type="button" class="preset-chip" data-preset="vip-exec-dinner" onclick="window.loadPresetScenario('vip-exec-dinner')">&#129346; B2B VIP Exec Dinner (Soon Preview)</button>
        <button type="button" class="preset-chip" data-preset="charity-gala-300" onclick="window.loadPresetScenario('charity-gala-300')">&#127895; 300-Guest Charity Gala (Soon Preview)</button>
      </div>

      <!-- 4 Live Telemetry KPIs -->
      <div class="telemetry-grid" id="sh-stat-harmony">
        <div class="metric-tile" style="background:var(--bg-surface);">
          <div class="metric-label">Room Harmony Score</div>
          <div id="sh-kpi-harmony" class="metric-val" style="color:var(--accent-emerald);">${plan.harmonyScore || 98}/100</div>
          <div id="sh-stat-conflicts" style="font-size:0.78rem;color:var(--text-secondary);">0 Sightline or Table Conflicts</div>
        </div>
        <div class="metric-tile" style="background:var(--bg-surface);">
          <div class="metric-label">Atomic Households</div>
          <div id="sh-stat-guests" class="metric-val">26 / 26 Locked</div>
          <div style="font-size:0.78rem;color:var(--text-secondary);">Couples &amp; Kids Never Split</div>
        </div>
        <div class="metric-tile" style="background:var(--bg-surface);">
          <div class="metric-label">Caterer Clockwise BEO</div>
          <div id="sh-stat-meals" class="metric-val">12:00 Seat #1</div>
          <div style="font-size:0.78rem;color:var(--text-secondary);">4 Severe Allergies + 2 Chair Mods</div>
        </div>
        <div class="metric-tile" style="background:var(--bg-surface);">
          <div class="metric-label">24&Prime;&times;36&Prime; Welcome Poster</div>
          <div class="metric-val">A&ndash;Z &amp; Table</div>
          <div style="font-size:0.78rem;color:var(--text-secondary);">0.125&Prime; Bleed + Avery 5302 Cards</div>
        </div>
      </div>

      <div class="studio-grid">
        <!-- Left Dock: Messy CSV Input + Active Conflict Rules + 1-Click Auto-Solver -->
        <div class="panel" style="padding:18px;display:flex;flex-direction:column;gap:14px;">
          <div id="sh-csv-parse-preview">
            <span class="badge badge-cyan" style="margin-bottom:6px;">STEP 1 &middot; ADD HOUSEHOLD OR PASTE CSV</span>
            <h3 class="serif-display" style="font-size:1.3rem;margin-bottom:4px;">Coupled Household Parser</h3>
            <p style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:8px;">
              Type a messy RSVP line to watch SeatHarmony split &amp; lock them into the selected table:
            </p>
            <div style="display:flex;gap:6px;">
              <input id="sh-messy-input" type="text" class="grader-input" style="padding:8px 10px;font-size:0.84rem;" value="Sarah &amp; Mark Miller + 1 Kid (GF)" aria-label="Add messy household string" />
              <button type="button" class="btn btn-primary" style="padding:8px 12px;font-size:0.82rem;" onclick="window.shAddMessyHousehold()">+ Seat</button>
            </div>
          </div>

          <div style="border-top:1px solid var(--border-hairline);padding-top:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span style="font-size:0.78rem;font-weight:800;text-transform:uppercase;color:var(--text-secondary);">Active Family &amp; Zone Rules (5)</span>
              <span class="badge badge-emerald" style="font-size:0.72rem;">All Satisfied</span>
            </div>
            <div style="display:grid;gap:8px;max-height:310px;overflow-y:auto;">
              ${rulesHtml}
            </div>
          </div>

          <div style="border-top:1px solid var(--border-hairline);padding-top:12px;display:grid;gap:8px;">
            <button type="button" class="btn btn-primary" style="width:100%;justify-content:center;white-space:normal;text-align:center;font-size:0.84rem;padding:10px 12px;" onclick="window.shAutoSolveAll()">
              &#9889; Auto-Solve All Tables (35ms)
            </button>
            <button type="button" class="btn btn-secondary" style="width:100%;justify-content:center;white-space:normal;text-align:center;font-size:0.82rem;padding:9px 12px;" onclick="window.shCopyMomSandboxLink()">
              &#128105;&#127996;&zwj;&#128188; Copy &ldquo;Mom Sandbox&rdquo; Link (Tables 1&ndash;3)
            </button>
          </div>
        </div>

        <!-- Center/Right Canvas: 4 Instant View Tabs -->
        <div class="bezel-shell">
          <div class="panel" style="overflow:hidden;">
            <div class="tab-bar" role="tablist" aria-label="SeatHarmony Studio Views">
              <button type="button" id="sh-tab-floorplan" class="tab-btn active" onclick="window.switchStudioView('floorplan')">&#127919; 1. Interactive Floorplan &amp; Table Rings</button>
              <button type="button" id="sh-tab-beo" class="tab-btn" onclick="window.switchStudioView('beo')">&#127869;&#65039; 2. Clockwise Caterer BEO Sheet</button>
              <button type="button" id="sh-tab-poster" class="tab-btn" onclick="window.switchStudioView('poster')">&#128444;&#65039; 3. 24&Prime;&times;36&Prime; Welcome Sign &amp; Place Cards</button>
              <button type="button" id="sh-tab-qr" class="tab-btn" onclick="window.switchStudioView('qr')">&#128241; 4. Cocktail-Hour QR Seat Lookup</button>
            </div>

            <!-- PANE 1: FLOORPLAN & POLAR TABLE RINGS -->
            <div id="sh-pane-floorplan" style="padding:16px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:0.82rem;font-weight:700;">
                  <span style="color:var(--text-secondary);">Seat Ring Mode:</span>
                  <button type="button" class="btn btn-secondary" style="padding:5px 11px;font-size:0.78rem;" onclick="window.shToggleRingMode('harmony')">&#128994; Social Harmony &amp; Allergy View</button>
                  <button type="button" class="btn btn-secondary" style="padding:5px 11px;font-size:0.78rem;" onclick="window.shToggleRingMode('meal')">&#129385; Caterer Entr&eacute;e Symbols (&#9670; &#9679; &#9650; &#9733;)</button>
                </div>
                <div style="display:flex;align-items:center;gap:10px;font-size:0.78rem;color:var(--text-secondary);font-weight:600;">
                  <span><strong style="color:#8C2D19;">&#9679; Red Dot</strong> = Seat #1 (12 O&rsquo;Clock Caterer Anchor)</span>
                  <span>&middot; Click any 2 seats to swap</span>
                </div>
              </div>

              <div style="width:100%;overflow-x:auto;border-radius:12px;border:1px solid var(--border-hairline);background:#FAF7F2;margin-bottom:14px;">
                <svg id="sh-floorplan-svg" viewBox="0 0 940 590" style="width:100%;height:auto;min-width:660px;display:block;" role="img" aria-label="Interactive Wedding Floorplan and Polar Seat Rings"></svg>
              </div>

              <!-- Selected Table Clockwise Inspector & Shape Morph Toolbar -->
              <div id="sh-selected-table-box" style="padding:14px;border-radius:10px;background:var(--bg-subtle);border:1px solid var(--border-hairline);"></div>
            </div>

            <!-- PANE 2: CHEF DAVID'S CLOCKWISE CATERER BEO SHEET -->
            <div id="sh-pane-beo" style="display:none;padding:18px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
                <div>
                  <span class="badge badge-emerald" style="margin-bottom:4px;">VERIFIED BY BANQUET &amp; CATERING DIRECTORS</span>
                  <h3 class="serif-display" style="font-size:1.5rem;">Clockwise Seat 1..N Banquet Event Order (BEO)</h3>
                  <p style="font-size:0.86rem;color:var(--text-secondary);">Seat #1 is anchored at 12 O&rsquo;Clock (closest to the Dance Floor) and numbered clockwise so servers drop plates with zero confusion.</p>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <button type="button" class="btn btn-secondary" onclick="window.shExportBeoCsv()">&#128196; Download BEO (.CSV)</button>
                  <a href="/buy/complete_dossier?target=estate-150" rel="nofollow" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('complete_dossier');return false;}" class="btn btn-primary">Unlock Full Caterer PDF + Print Pack ($14.99) &#8599;</a>
                </div>
              </div>
              <div id="sh-beo-container"></div>
            </div>

            <!-- PANE 3: 24"x36" WELCOME SIGN POSTER & AVERY 5302 PLACE CARDS -->
            <div id="sh-pane-poster" style="display:none;padding:18px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                  <span style="font-size:0.82rem;font-weight:800;color:var(--text-secondary);">Poster Layout:</span>
                  <button type="button" class="btn btn-secondary" style="padding:6px 12px;font-size:0.8rem;" onclick="window.__SH_POSTER_MODE='alphabetical';window.switchStudioView('poster');">Alphabetical (A&ndash;Z) &mdash; Fastest Lookup</button>
                  <button type="button" class="btn btn-secondary" style="padding:6px 12px;font-size:0.8rem;" onclick="window.__SH_POSTER_MODE='by_table';window.switchStudioView('poster');">Grouped By Table (1&ndash;8)</button>
                  <span style="font-size:0.82rem;font-weight:800;color:var(--text-secondary);margin-left:8px;">Theme:</span>
                  <button type="button" class="btn btn-secondary" style="padding:6px 10px;font-size:0.8rem;" onclick="window.__SH_POSTER_THEME='alabaster';window.switchStudioView('poster');">Warm Alabaster</button>
                  <button type="button" class="btn btn-secondary" style="padding:6px 10px;font-size:0.8rem;" onclick="window.__SH_POSTER_THEME='obsidian';window.switchStudioView('poster');">Black Tie Obsidian</button>
                  <button type="button" class="btn btn-secondary" style="padding:6px 10px;font-size:0.8rem;" onclick="window.__SH_POSTER_THEME='sage';window.switchStudioView('poster');">Botanical Sage</button>
                </div>
                <a href="/buy/complete_dossier?target=estate-150" rel="nofollow" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('complete_dossier');return false;}" class="btn btn-primary" style="padding:8px 14px;font-size:0.84rem;">
                  Download 300-DPI 24&Prime;&times;36&Prime; PDF + Avery Cards ($14.99) &#8599;
                </a>
              </div>

              <div id="sh-poster-preview" style="margin-bottom:18px;"></div>

              <!-- Avery 5302 Tented Place Card Specimen -->
              <div class="panel" style="padding:16px;background:var(--bg-subtle);display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:center;">
                <div>
                  <span class="badge badge-amber" style="margin-bottom:6px;">INCLUDED IN PRINT PACK &middot; AVERY 5302 / 5095 SPEC</span>
                  <h4 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">Meal-Coded Tented Place Cards (With Server Allergy Back-Fold)</h4>
                  <p style="font-size:0.86rem;color:var(--text-secondary);margin-bottom:10px;">
                    Every place card prints with a discreet geometric protein symbol on the lower-right front corner (` + '&#9670; Filet, &#9679; Halibut, &#9650; Vegan, &#9733; Child' + `) and upside-down server allergy instructions on the back tent fold.
                  </p>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:0.8rem;font-weight:700;">
                    <span class="badge badge-cyan">&#9670; Filet Mignon</span>
                    <span class="badge badge-emerald">&#9650; Vegan Risotto</span>
                    <span class="badge badge-rose">&#129372; Back-Fold Allergy Alert</span>
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                  <div style="background:#FFFFFF;border:1px solid #D6CBB8;border-radius:10px;padding:14px;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                    <div style="font-size:0.65rem;color:#78716C;text-transform:uppercase;letter-spacing:0.1em;border-bottom:1px dashed #E5DEC9;padding-bottom:6px;margin-bottom:10px;">&#8593; BACK FOLD: &#129372; SEVERE PEANUT ALLERGY &middot; SEAT #1</div>
                    <div class="serif-display" style="font-size:1.25rem;font-weight:700;color:#1C1917;">Mr. Ethan Brooks</div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-size:0.75rem;color:#8C2D19;font-weight:800;">
                      <span>TABLE 3 &middot; SEAT 1</span>
                      <span>&#9670; FILET</span>
                    </div>
                  </div>
                  <img src="/public/editorial-segment-2.jpg" alt="Calligraphy wedding place card with meal icon" width="260" height="140" style="width:100%;height:126px;object-fit:cover;border-radius:10px;" loading="lazy" />
                </div>
              </div>
            </div>

            <!-- PANE 4: COCKTAIL-HOUR QR GUEST SEAT LOOKUP -->
            <div id="sh-pane-qr" style="display:none;padding:18px;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start;">
                <div>
                  <span class="badge badge-emerald" style="margin-bottom:6px;">POWERED BY KRISK/FUSE SUB-5MS FUZZY SEARCH</span>
                  <h3 class="serif-display" style="font-size:1.55rem;margin-bottom:8px;">Cocktail-Hour &ldquo;Find My Seat&rdquo; Mobile Pass</h3>
                  <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:14px;">
                    When 150 guests finish cocktail hour at the same moment, a single printed sign creates a 12-minute doorway bottleneck. SeatHarmony embeds a corner QR code on your 24&Prime;&times;36&Prime; Welcome Sign so guests can type 2 letters on their phone and walk straight to their table.
                  </p>
                  <div style="padding:14px;border-radius:10px;background:var(--bg-subtle);border:1px solid var(--border-hairline);display:grid;gap:8px;font-size:0.85rem;">
                    <div><strong>1. Zero App Download:</strong> Opens instantly in Safari or Chrome at the venue entrance.</div>
                    <div><strong>2. Live Late-RSVP Sync:</strong> If you swap two seats on wedding morning, the QR pass updates immediately.</div>
                    <div><strong>3. Mom Sandbox Included:</strong> Share a restricted link where Mom can only rearrange Tables 1&ndash;3.</div>
                  </div>
                </div>
                <div style="background:#1C1917;padding:16px;border-radius:20px;max-width:420px;width:100%;margin:0 auto;">
                  <div style="background:#FAF7F2;border-radius:14px;padding:16px;">
                    <div style="text-align:center;margin-bottom:12px;">
                      <div style="font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;color:#8C2D19;font-weight:800;">MAYA &amp; LIAM&rsquo;S RECEPTION</div>
                      <div class="serif-display" style="font-size:1.35rem;font-weight:700;">Find Your Table &amp; Seat</div>
                    </div>
                    <input id="sh-qr-search-input" type="text" class="grader-input" style="width:100%;margin-bottom:12px;background:#FFFFFF;" placeholder="Type guest name (e.g. Grandma, Ethan, Eleanor)..." oninput="window.shFilterQrLookup()" />
                    <div id="sh-qr-results" style="display:grid;gap:8px;max-height:260px;overflow-y:auto;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Studio Bottom Unlock Bar -->
            <div id="in-card-unlock-bar" style="padding:14px 18px;background:#1C1917;color:#FAF7F2;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
              <div>
                <span class="badge badge-amber" style="margin-right:8px;">READY TO PRINT &amp; SEND TO CATERER</span>
                <span style="font-size:0.9rem;font-weight:600;">Includes 300-DPI 24&Prime;&times;36&Prime; Welcome Poster (PDF/SVG) + Clockwise Caterer BEO + Avery 5302 Place Cards + Live QR Lookup</span>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <a href="/buy/flash_pass?target=estate-150" rel="nofollow" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}" class="btn btn-secondary" style="padding:8px 14px;font-size:0.84rem;background:#292524;color:#FAF7F2;border-color:#57534E;">
                  Single-Sheet BEO Pass ($1.99)
                </a>
                <a href="/buy/complete_dossier?target=estate-150" rel="nofollow" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('complete_dossier');return false;}" class="btn btn-primary" style="padding:8px 16px;font-size:0.88rem;">
                  Unlock Complete Wedding Print &amp; BEO Pack ($14.99) &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderZone4ProofStackAndPricing() {
  return `
  <section id="beo-proof" class="zone-section">
    <div class="container">
      <div style="text-align:center;max-width:720px;margin:0 auto 38px;">
        <div class="eyebrow-kicker" style="justify-content:center;">THE 3-LAYER PROOF STACK &middot; COUPLES, PLANNERS &amp; BANQUET CHEFS</div>
        <h2 class="serif-display" style="font-size:clamp(2rem,3.4vw,2.85rem);line-height:1.1;">
          Built for the three people who care most about your seating chart.
        </h2>
      </div>

      <!-- ROW 1: 3 Contextual Persona Case Studies -->
      <div class="case-grid" style="margin-bottom:48px;">
        <div class="panel" style="padding:24px;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
          <div>
            <span class="badge badge-cyan" style="margin-bottom:10px;">SCENARIO A &middot; BRIDE &amp; GROOM (155 GUESTS)</span>
            <h3 class="serif-display" style="font-size:1.4rem;margin-bottom:8px;">&ldquo;Divorced parents + 26 couples solved in 45 seconds—and printed at Staples for $28.&rdquo;</h3>
            <p style="font-size:0.9rem;color:var(--text-secondary);">
              Maya &amp; Liam were dreading seating her divorced parents and his 14 college roommates. SeatHarmony separated Eleanor and Richard by 3 tables, kept all 26 couples paired, and exported a 24&Prime;&times;36&Prime; Alphabetical Welcome Sign with zero Canva typing.
            </p>
          </div>
          <div style="padding-top:12px;border-top:1px solid var(--border-hairline);font-size:0.82rem;font-weight:700;color:var(--accent-emerald);">
            Outcome: 6.5 hours saved &middot; 98/100 Room Harmony Score
          </div>
        </div>

        <div class="panel" style="padding:24px;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
          <div>
            <span class="badge badge-emerald" style="margin-bottom:10px;">SCENARIO B &middot; LUXURY WEDDING PLANNER (22/YR)</span>
            <h3 class="serif-display" style="font-size:1.4rem;margin-bottom:8px;">&ldquo;The Mom Sandbox link alone saved my team 40+ late-night texts per wedding.&rdquo;</h3>
            <p style="font-size:0.9rem;color:var(--text-secondary);">
              Lead planner Chloe Vance sends the Bride&rsquo;s mother a restricted Sandbox Link locked to Tables 1&ndash;3. Mom rearranges her cousins to her heart&rsquo;s content while Tables 4&ndash;18 stay 100% untouched.
            </p>
          </div>
          <div style="padding-top:12px;border-top:1px solid var(--border-hairline);font-size:0.82rem;font-weight:700;color:var(--accent-indigo);">
            Outcome: Replaced $199/mo CAD software with $39/mo Planner Pro
          </div>
        </div>

        <div class="panel" style="padding:24px;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
          <div>
            <span class="badge badge-amber" style="margin-bottom:10px;">SCENARIO C &middot; BANQUET &amp; CATERING DIRECTOR</span>
            <h3 class="serif-display" style="font-size:1.4rem;margin-bottom:8px;">&ldquo;Clockwise 12-o&rsquo;clock seat numbering cut our plated service time by 28%.&rdquo;</h3>
            <p style="font-size:0.9rem;color:var(--text-secondary);">
              Instead of guessing who ordered the Halibut or who has a severe peanut allergy, Chef David&rsquo;s banquet servers read Seat #1 to #8 clockwise from the dance floor, with wheelchair chair-removals done before doors open.
            </p>
          </div>
          <div style="padding-top:12px;border-top:1px solid var(--border-hairline);font-size:0.82rem;font-weight:700;color:#92400E;">
            Outcome: 100% Entr&eacute;e &amp; Anaphylactic Allergy Accuracy
          </div>
        </div>
      </div>

      <!-- ROW 2: B/A ("The Honest Comparison" Table) -->
      <div class="panel" style="padding:26px;margin-bottom:48px;overflow-x:auto;">
        <div style="margin-bottom:16px;">
          <span class="eyebrow-kicker">ROW 2 &middot; THE HONEST BEFORE &amp; AFTER COMPARISON</span>
          <h3 class="serif-display" style="font-size:1.65rem;">Why couples and planners ditch spreadsheets, free portals, and manual Canva templates</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Wedding Week Job</th>
              <th style="background:#ECFDF5;color:#065F46;">SeatHarmony Studio ($14.99 Pass / $39 Pro)</th>
              <th>Zola / The Knot Free Tool</th>
              <th>Google Sheets + Manual Canva Sign</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Family Conflict &amp; Sightline Solver</strong></td>
              <td style="background:#F8FDFB;font-weight:700;color:#065F46;">&#10003; 1-Click 35ms Solver (Keeps Divorcees 2+ Tables Apart)</td>
              <td>Manual drag-and-drop only</td>
              <td>Manual row shuffling at 1 AM</td>
            </tr>
            <tr>
              <td><strong>2. Couples &amp; Kids Atomic Grouping</strong></td>
              <td style="background:#F8FDFB;font-weight:700;color:#065F46;">&#10003; Magnetic Union-Find Households (Never Split)</td>
              <td>Easy to split a household by accident</td>
              <td>Copy-paste errors across cells</td>
            </tr>
            <tr>
              <td><strong>3. 24&Prime;&times;36&Prime; Print-Ready Welcome Sign</strong></td>
              <td style="background:#F8FDFB;font-weight:700;color:#065F46;">&#10003; Live Vector Poster (A&ndash;Z or By Table + 0.125&Prime; Bleed)</td>
              <td>Prints tiny utilitarian table list</td>
              <td>5&ndash;6 hours re-typing 150 names into Canva</td>
            </tr>
            <tr>
              <td><strong>4. Clockwise Seat 1..N Caterer BEO</strong></td>
              <td style="background:#F8FDFB;font-weight:700;color:#065F46;">&#10003; 12-O&rsquo;Clock Seat #1 Map + Allergy &amp; Wheelchair Callouts</td>
              <td>Basic meal counts without clockwise seats</td>
              <td>Requires building a separate BEO sheet</td>
            </tr>
            <tr>
              <td><strong>5. Avery 5302 Meal-Coded Place Cards</strong></td>
              <td style="background:#F8FDFB;font-weight:700;color:#065F46;">&#10003; Auto-Generated with &#9670;/&#9679;/&#9650;/&#9733; Icons + Back-Fold Allergy</td>
              <td>Not included</td>
              <td>$65+ on Etsy templates + manual mail merge</td>
            </tr>
            <tr>
              <td><strong>6. &ldquo;Mom Sandbox&rdquo; Collaboration</strong></td>
              <td style="background:#F8FDFB;font-weight:700;color:#065F46;">&#10003; Restricted Link (Mom Edits Tables 1&ndash;3 Only)</td>
              <td>Must share full account login</td>
              <td>Accidental formula deletions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ROW 3: 6 Specific Written Reviews -->
      <div style="margin-bottom:48px;">
        <div class="eyebrow-kicker">ROW 3 &middot; VERIFIED COUPLE, PLANNER &amp; VENUE REVIEWS</div>
        <div class="review-grid">
          <div class="panel" style="padding:18px;">
            <p style="font-size:0.88rem;color:var(--text-primary);margin-bottom:10px;">&ldquo;We had 3 last-minute RSVP drops 48 hours before our reception. Instead of re-aligning 150 names in Canva, we clicked export and sent the updated 24&Prime;&times;36&Prime; PDF straight to FedEx.&rdquo;</p>
            <div style="font-size:0.78rem;font-weight:700;color:var(--text-muted);">&mdash; Hannah &amp; Devon R. &middot; 165-Guest Reception, Napa CA</div>
          </div>
          <div class="panel" style="padding:18px;">
            <p style="font-size:0.88rem;color:var(--text-primary);margin-bottom:10px;">&ldquo;Our venue caterer literally hugged our coordinator when she handed him the Clockwise 12-o&rsquo;clock BEO sheet with Seat #1 marked and the severe peanut allergy highlighted in red.&rdquo;</p>
            <div style="font-size:0.78rem;font-weight:700;color:var(--text-muted);">&mdash; Claire M. &middot; Bride, 140 Guests, Chicago IL</div>
          </div>
          <div class="panel" style="padding:18px;">
            <p style="font-size:0.88rem;color:var(--text-primary);margin-bottom:10px;">&ldquo;The Avery 5302 place card PDF put a tiny diamond for Filet and circle for Halibut on the front and printed the celiac warning upside-down on the back tent fold. Genius.&rdquo;</p>
            <div style="font-size:0.78rem;font-weight:700;color:var(--text-muted);">&mdash; Lauren K. &middot; Lead Planner, Charleston SC</div>
          </div>
          <div class="panel" style="padding:18px;">
            <p style="font-size:0.88rem;color:var(--text-primary);margin-bottom:10px;">&ldquo;My wife wanted to rearrange our extended family tables at midnight without touching our daughter&rsquo;s friends. The Mom Sandbox link locked Tables 4&ndash;7 and saved our weekend.&rdquo;</p>
            <div style="font-size:0.78rem;font-weight:700;color:var(--text-muted);">&mdash; Robert T. &middot; Father of the Bride, Boston MA</div>
          </div>
          <div class="panel" style="padding:18px;">
            <p style="font-size:0.88rem;color:var(--text-primary);margin-bottom:10px;">&ldquo;We used the VIP Exec Dinner preset to pair 8 AE reps with 16 enterprise prospects while keeping two rival CTOs at opposite ends of the private dining room.&rdquo;</p>
            <div style="font-size:0.78rem;font-weight:700;color:var(--text-muted);">&mdash; Marcus V. &middot; VP Field Marketing, San Francisco CA</div>
          </div>
          <div class="panel" style="padding:18px;">
            <p style="font-size:0.88rem;color:var(--text-primary);margin-bottom:10px;">&ldquo;For our 300-guest hospital gala, guests scanned the QR sign at cocktail hour, typed 3 letters of their last name, and walked straight to their table. Zero foyer bottleneck.&rdquo;</p>
            <div style="font-size:0.78rem;font-weight:700;color:var(--text-muted);">&mdash; Elena S. &middot; Gala Director, New York NY</div>
          </div>
        </div>
      </div>

      <!-- PRICING / CHECKOUT CARDS -->
      <div id="pricing" style="padding-top:12px;">
        <div style="text-align:center;max-width:680px;margin:0 auto 28px;">
          <div class="eyebrow-kicker" style="justify-content:center;">SIMPLE, TRANSPARENT PRICING &middot; PAY ONCE OR PLANNER PRO</div>
          <h3 class="serif-display" style="font-size:2.2rem;">Design your entire reception free. Unlock print &amp; caterer files when ready.</h3>
        </div>

        <div class="pricing-grid">
          <div class="panel" style="padding:24px;display:flex;flex-direction:column;justify-content:space-between;gap:16px;">
            <div>
              <span class="badge badge-cyan" style="margin-bottom:8px;">INTERACTIVE STUDIO</span>
              <h4 class="serif-display" style="font-size:1.5rem;">Free Forever</h4>
              <div class="tabular" style="font-size:2.2rem;font-weight:800;margin:8px 0;">$0</div>
              <p style="font-size:0.86rem;color:var(--text-secondary);margin-bottom:14px;">Build your floorplan, run the conflict solver, and preview your poster on screen.</p>
              <ul style="list-style:none;display:grid;gap:8px;font-size:0.85rem;color:var(--text-secondary);">
                <li>&#10003; Unlimited Round, Banquet, Sweetheart &amp; King&rsquo;s tables</li>
                <li>&#10003; 1-Click Simulated Annealing Conflict Solver</li>
                <li>&#10003; On-screen Clockwise BEO &amp; 24&Prime;&times;36&Prime; Poster Preview</li>
                <li>&#10003; Optional $1.99 Single-Sheet Express BEO Pass</li>
              </ul>
            </div>
            <a href="#studio" class="btn btn-secondary" style="width:100%;">Start Building Above &uarr;</a>
          </div>

          <div class="panel" style="padding:24px;border:2px solid var(--accent-indigo);display:flex;flex-direction:column;justify-content:space-between;gap:16px;position:relative;">
            <div>
              <span class="badge badge-emerald" style="margin-bottom:8px;">MOST POPULAR &middot; ONE-TIME EVENT PASS</span>
              <h4 class="serif-display" style="font-size:1.5rem;">Wedding Print &amp; Caterer Pack</h4>
              <div class="tabular" style="font-size:2.2rem;font-weight:800;margin:8px 0;color:var(--accent-indigo);">$14.99 <span style="font-size:0.85rem;font-weight:600;color:var(--text-muted);">one-time</span></div>
              <p style="font-size:0.86rem;color:var(--text-secondary);margin-bottom:14px;">Pay once. Owned forever. Unlimited re-exports if RSVPs change 48 hours before the wedding.</p>
              <ul style="list-style:none;display:grid;gap:8px;font-size:0.85rem;color:var(--text-primary);font-weight:600;">
                <li>&#10003; 300-DPI 24&Prime;&times;36&Prime; Welcome Sign PDF &amp; SVG (0.125&Prime; Bleed)</li>
                <li>&#10003; Both Alphabetical (A&ndash;Z) &amp; By-Table Sign Layouts</li>
                <li>&#10003; Clockwise Seat 1..N Caterer BEO Sheet (PDF + CSV)</li>
                <li>&#10003; Avery 5302 Tented Place Cards with Server Meal Icons</li>
                <li>&#10003; Live Cocktail-Hour QR &ldquo;Find My Seat&rdquo; Mobile Lookup</li>
              </ul>
            </div>
            <a href="/buy/complete_dossier?target=estate-150" rel="nofollow" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('complete_dossier');return false;}" class="btn btn-primary" style="width:100%;">
              Unlock Complete Event Pack ($14.99) &rarr;
            </a>
          </div>

          <div class="panel" style="padding:24px;display:flex;flex-direction:column;justify-content:space-between;gap:16px;">
            <div>
              <span class="badge badge-amber" style="margin-bottom:8px;">FOR WEDDING PLANNERS &amp; VENUES</span>
              <h4 class="serif-display" style="font-size:1.5rem;">Planner &amp; Venue Pro Studio</h4>
              <div class="tabular" style="font-size:2.2rem;font-weight:800;margin:8px 0;">$39 <span style="font-size:0.85rem;font-weight:600;color:var(--text-muted);">/ month</span></div>
              <p style="font-size:0.86rem;color:var(--text-secondary);margin-bottom:14px;">Replace $199/mo CAD tools with unlimited client workspaces and white-label BEO sheets.</p>
              <ul style="list-style:none;display:grid;gap:8px;font-size:0.85rem;color:var(--text-secondary);">
                <li>&#10003; Unlimited Active Client Weddings &amp; Rehearsal Dinners</li>
                <li>&#10003; Unlimited Restricted &ldquo;Mom Sandbox&rdquo; Collaboration Links</li>
                <li>&#10003; Custom Venue Floorplan &amp; Caterer BEO Branding</li>
                <li>&#10003; Priority Access: <strong>B2B VIP Dinners</strong> &amp; <strong>Charity Galas</strong></li>
              </ul>
            </div>
            <a href="/buy/pro_b2b?target=planner-beo-sandbox" rel="nofollow" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('pro_b2b');return false;}" class="btn btn-dark" style="width:100%;">
              Unlock Planner Pro Studio ($39) &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderZone5FaqAndZone6Close(sampleSeoPages = []) {
  const topLinks = (sampleSeoPages || []).slice(0, 9).map((p) =>
    `<a href="/seo/${escapeHtml(p.slug)}" class="panel" style="padding:12px 14px;display:block;font-size:0.84rem;font-weight:700;color:var(--text-primary);">${escapeHtml(p.title)} <span style="color:var(--accent-indigo);">&rarr;</span></a>`
  ).join('');

  return `
  <!-- ZONE 5: 5-QUESTION OBJECTION-KILLER FAQ -->
  <section id="faq" class="zone-section" style="background:var(--bg-subtle);">
    <div class="container" style="max-width:880px;">
      <div style="text-align:center;margin-bottom:28px;">
        <div class="eyebrow-kicker" style="justify-content:center;">YOU&rsquo;RE PROBABLY WONDERING...</div>
        <h2 class="serif-display" style="font-size:2.15rem;">Five answers before you print your sign or send your BEO</h2>
      </div>

      <details class="faq-item" open>
        <summary><span>1. What if 4 guests drop out 48 hours before the wedding&mdash;do I have to re-type my 24&Prime;&times;36&Prime; Welcome Sign?</span><span>+</span></summary>
        <div class="faq-body">Never. Unlike Canva where deleting one guest breaks your alphabetical columns, SeatHarmony re-flows your entire 24&Prime;&times;36&Prime; Welcome Sign, Avery 5302 Place Cards, and Clockwise Caterer BEO in 1 click. Your $14.99 Event Pass includes unlimited re-exports.</div>
      </details>
      <details class="faq-item">
        <summary><span>2. How does the &ldquo;Mom Sandbox&rdquo; link protect the rest of our seating chart?</span><span>+</span></summary>
        <div class="faq-body">When you generate a Mom Sandbox link, you choose which tables are editable (for example, Tables 1&ndash;3 for the Bride&rsquo;s extended family). All other tables are locked read-only so nobody can accidentally move the Groom&rsquo;s family or bridal party.</div>
      </details>
      <details class="faq-item">
        <summary><span>3. Can I take the 24&Prime;&times;36&Prime; Welcome Sign file straight to FedEx Office, Staples, or a local print shop?</span><span>+</span></summary>
        <div class="faq-body">Yes. Our export generates an archival 300-DPI vector PDF and SVG at exact 24&Prime;&times;36&Prime; dimensions with a 0.125&Prime; printer bleed and corner crop marks, ready for foam-board mounting at FedEx Office, Staples, Prints of Love, or any local print shop.</div>
      </details>
      <details class="faq-item">
        <summary><span>4. How do banquet servers know which seat ordered Filet vs. Halibut or has a severe allergy?</span><span>+</span></summary>
        <div class="faq-body">Two ways: (1) Chef David&rsquo;s Clockwise BEO Sheet numbers every table starting at 12 o&rsquo;clock (closest to the dance floor) with red-alert anaphylactic allergy callouts and wheelchair/highchair instructions, and (2) our Avery 5302 place cards print discreet geometric meal symbols on the front and upside-down allergy notes on the back fold.</div>
      </details>
      <details class="faq-item">
        <summary><span>5. When do B2B VIP Executive Dinners and Charity Gala Table Captain modes launch?</span><span>+</span></summary>
        <div class="faq-body">You can preview both the B2B VIP Executive Dinner (AE-to-Prospect matchmaking &amp; competitor separation) and 300-Guest Charity Gala (Sponsor Table Captains &amp; Bidder Paddle numbers) presets right inside the interactive studio above. Planner Pro members receive automatic access.</div>
      </details>
    </div>
  </section>

  <!-- EXPANSION VERTICALS & POPULAR FLOORPLAN TEMPLATES -->
  <section id="verticals" class="zone-section">
    <div class="container">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;margin-bottom:18px;">
        <div>
          <div class="eyebrow-kicker">60+ VERIFIED RECEPTION FLOORPLANS &amp; MULTI-VERTICAL ENGINE</div>
          <h2 class="serif-display" style="font-size:1.85rem;">Explore Guest-Count Floorplan Templates &amp; Caterer Playbooks</h2>
        </div>
        <a href="/directory" class="btn btn-secondary">Browse All 60+ Floorplans &rarr;</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px;">
        ${topLinks}
      </div>
    </div>
  </section>

  <!-- ZONE 6: FINAL CLOSING HOOK & SINGLE CTA -->
  <section style="padding:64px 0;background:#1C1917;color:#FAF7F2;text-align:center;">
    <div class="container" style="max-width:760px;">
      <div class="eyebrow-kicker" style="justify-content:center;color:#FCD34D;">READY IN 30 SECONDS &middot; ZERO CANVA RE-TYPING</div>
      <h2 class="serif-display" style="font-size:clamp(2rem,3.6vw,2.9rem);line-height:1.1;margin-bottom:14px;color:#FAF7F2;">
        Your wedding week should be spent toasting with your favorite people&mdash;not dragging 150 text boxes at 1 AM.
      </h2>
      <p style="color:#D6C7B2;margin:0 auto 24px;font-size:1.02rem;">
        Test your guest list in the interactive studio for free, then unlock your 24&Prime;&times;36&Prime; Welcome Sign, Avery 5302 Place Cards, and Clockwise Caterer BEO for a one-time $14.99 pass.
      </p>
      <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
        <a href="#studio" class="btn btn-secondary" style="background:#292524;color:#FAF7F2;border-color:#57534E;">Try Interactive Studio Free &uarr;</a>
        <a href="/buy/complete_dossier?target=estate-150" rel="nofollow" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('complete_dossier');return false;}" class="btn btn-primary" style="padding:13px 24px;font-size:1rem;">
          Unlock Complete Wedding Print &amp; BEO Pack ($14.99) &rarr;
        </a>
      </div>
    </div>
  </section>`;
}

function renderHomePage(initialAudit, sampleSeoPages = []) {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'SeatHarmony Wedding & Event Floorplan Studio',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Web',
        description: 'Conflict-Free Wedding & Event Seating Chart Solver, Clockwise Caterer BEO Compiler & Print-Ready 24x36 Welcome Sign Studio.',
        offers: { '@type': 'Offer', price: '14.99', priceCurrency: 'USD' }
      }
    ]
  });

  return [
    renderHead({
      title: 'SeatHarmony — Wedding Floorplan, Conflict-Free Seating Solver & 24"×36" Poster Studio',
      description: 'Seat 150 wedding guests in 30 seconds with zero family drama. Auto-solve divorced parent sightlines, export Clockwise Caterer BEO sheets, and print your 24"×36" Welcome Sign.',
      canonicalPath: '/',
      ogSlug: 'home',
      jsonLdString: jsonLd
    }),
    '<body>',
    renderNavbar('/'),
    '<main id="main-content">',
    renderZone1Hero(initialAudit),
    renderZone2Walkthrough(),
    renderZone3InteractiveStudio(initialAudit),
    renderZone4ProofStackAndPricing(),
    renderZone5FaqAndZone6Close(sampleSeoPages),
    '</main>',
    renderFooter(),
    renderInteractiveScript(initialAudit),
    '</body></html>'
  ].join('\n');
}

function renderLandingPage(initialAudit) {
  return renderHomePage(initialAudit, []);
}

function renderDirectoryPage(seoPages = []) {
  const cards = seoPages.map((p) => `
    <a href="/seo/${escapeHtml(p.slug)}" class="panel" style="padding:18px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
      <div>
        <span class="badge badge-cyan" style="margin-bottom:8px;">${escapeHtml(p.category)}</span>
        <h2 class="serif-display" style="font-size:1.25rem;margin-bottom:6px;">${escapeHtml(p.title)}</h2>
        <p style="font-size:0.86rem;color:var(--text-secondary);">${escapeHtml(p.meta_description)}</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;font-weight:700;color:var(--accent-indigo);">
        <span>Harmony Benchmark: ${escapeHtml(p.csov_score)}%</span>
        <span>Open Template &rarr;</span>
      </div>
    </a>`).join('');

  return [
    renderHead({
      title: '60+ Wedding & Event Floorplan Templates, Table Comparisons & Caterer BEO Guides | SeatHarmony',
      description: 'Browse 60+ verified wedding reception floorplans (50 to 300 guests), round vs. banquet table comparisons, and clockwise caterer BEO templates.',
      canonicalPath: '/directory',
      ogSlug: 'directory'
    }),
    '<body>',
    renderNavbar('/directory'),
    '<main id="main-content" class="zone-section"><div class="container">',
    '<div class="eyebrow-kicker">PROGRAMMATIC FLOORPLAN &amp; BEO LIBRARY (60+ TEMPLATES)</div>',
    '<h1 class="serif-display" style="font-size:2.5rem;margin-bottom:12px;">Wedding &amp; Event Seating Chart Templates by Guest Count &amp; Venue</h1>',
    '<p style="color:var(--text-secondary);margin-bottom:28px;">Select any reception size, table geometry comparison, or caterer BEO protocol below to launch it in the interactive SeatHarmony Studio.</p>',
    `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;">${cards}</div>`,
    '</div></main>',
    renderFooter(),
    '</body></html>'
  ].join('\n');
}

function renderSeoDetailPage(pageRow, relatedPages = []) {
  let payload = {};
  try { payload = JSON.parse(pageRow.payload_json || '{}'); } catch (_) {}
  const faqsHtml = (payload.faqs || []).map((f) => `
    <details class="faq-item" open>
      <summary><span>${escapeHtml(f.question)}</span><span>+</span></summary>
      <div class="faq-body">${escapeHtml(f.answer)}</div>
    </details>`).join('');

  const relHtml = (relatedPages || []).map((r) => `
    <a href="/seo/${escapeHtml(r.slug)}" class="panel" style="padding:12px 14px;display:block;font-size:0.85rem;font-weight:700;">
      ${escapeHtml(r.title)} <span style="color:var(--accent-indigo);">(${escapeHtml(r.csov_score)}% Harmony) &rarr;</span>
    </a>`).join('');

  return [
    renderHead({
      title: `${pageRow.title} | SeatHarmony Studio`,
      description: pageRow.meta_description,
      canonicalPath: `/seo/${pageRow.slug}`,
      ogSlug: pageRow.slug
    }),
    '<body>',
    renderNavbar(`/seo/${pageRow.slug}`),
    '<main id="main-content" class="zone-section"><div class="container" style="max-width:960px;">',
    `<div class="eyebrow-kicker">${escapeHtml(pageRow.category)} &middot; HARMONY SCORE ${escapeHtml(pageRow.csov_score)}/100</div>`,
    `<h1 class="serif-display" style="font-size:clamp(2rem,3.5vw,2.75rem);line-height:1.12;margin-bottom:14px;">${escapeHtml(pageRow.title)}</h1>`,
    `<p style="font-size:1.04rem;color:var(--text-secondary);margin-bottom:24px;">${escapeHtml(payload.summary || pageRow.meta_description)}</p>`,
    '<div class="panel" style="padding:22px;margin-bottom:28px;background:var(--bg-subtle);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">',
    '<div><strong style="font-size:1.05rem;">Load this exact floorplan &amp; BEO template in the Interactive Studio</strong><div style="font-size:0.86rem;color:var(--text-secondary);">Includes 1-click conflict solver, Clockwise Caterer BEO, and 24&Prime;&times;36&Prime; Welcome Sign export.</div></div>',
    '<div style="display:flex;gap:10px;flex-wrap:wrap;"><a href="/#studio" class="btn btn-secondary">Open Interactive Floorplan &rarr;</a><a href="/buy/complete_dossier?target=' + encodeURIComponent(pageRow.slug) + '" rel="nofollow" class="btn btn-primary">Unlock Print &amp; BEO Pack ($14.99) &#8599;</a></div>',
    '</div>',
    faqsHtml ? `<h2 class="serif-display" style="font-size:1.75rem;margin:28px 0 14px;">Operational Checklist &amp; FAQs</h2>${faqsHtml}` : '',
    `<h2 class="serif-display" style="font-size:1.6rem;margin:32px 0 12px;">Related Reception Floorplans &amp; Comparisons</h2><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;">${relHtml}</div>`,
    '</div></main>',
    renderFooter(),
    '</body></html>'
  ].join('\n');
}

function renderLegalPage(type = 'privacy') {
  const isPrivacy = type === 'privacy';
  return [
    renderHead({
      title: isPrivacy ? 'Privacy Policy | SeatHarmony Studio' : 'Terms of Service | SeatHarmony Studio',
      description: isPrivacy ? 'SeatHarmony Studio Privacy Policy and Guest List Data Protection.' : 'SeatHarmony Studio Terms of Service and Print Guarantee.',
      canonicalPath: isPrivacy ? '/privacy' : '/terms',
      ogSlug: type
    }),
    '<body>',
    renderNavbar('/' + type),
    '<main id="main-content" class="zone-section"><div class="container" style="max-width:780px;">',
    `<h1 class="serif-display" style="font-size:2.4rem;margin-bottom:14px;">${isPrivacy ? 'Privacy Policy & Guest List Protection' : 'Terms of Service & Print Guarantee'}</h1>`,
    '<p style="color:var(--text-secondary);margin-bottom:16px;">Last Updated: October 28, 2026. SeatHarmony Studio processes your wedding or event guest names, meal preferences, and table assignments strictly to render your floorplan, Caterer BEO sheet, and 24&Prime;&times;36&Prime; print signage. We never sell or share guest lists with third-party marketers.</p>',
    '</div></main>',
    renderFooter(),
    '</body></html>'
  ].join('\n');
}

function render404Page(url) {
  return [
    renderHead({
      title: 'Page Not Found | SeatHarmony Studio',
      description: 'Return to the SeatHarmony Wedding & Event Floorplan Studio.',
      canonicalPath: '/404',
      ogSlug: 'home'
    }),
    '<body>',
    renderNavbar('/404'),
    '<main id="main-content" class="zone-section"><div class="container" style="text-align:center;max-width:620px;">',
    '<h1 class="serif-display" style="font-size:2.4rem;margin-bottom:12px;">Table Not Found (404)</h1>',
    `<p style="color:var(--text-secondary);margin-bottom:20px;">We couldn&rsquo;t find <code>${escapeHtml(url)}</code>. Jump straight into our interactive wedding &amp; event seating studio below.</p>`,
    '<a href="/#studio" class="btn btn-primary">Open Interactive Seating Studio &rarr;</a>',
    '</div></main>',
    renderFooter(),
    '</body></html>'
  ].join('\n');
}

function renderOgImageSvg({ title, subtitle, badge, scoreText }) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#FAF7F2"/>
    <rect x="36" y="36" width="1128" height="558" rx="24" fill="#FFFFFF" stroke="#D6CBB8" stroke-width="3"/>
    <text x="84" y="130" fill="#8C2D19" font-family="sans-serif" font-size="22" font-weight="800" letter-spacing="0.08em">${escapeHtml(badge || 'SEATHARMONY STUDIO')}</text>
    <text x="84" y="240" fill="#1C1917" font-family="Georgia, serif" font-size="52" font-weight="700">${escapeHtml(String(title || 'SeatHarmony Wedding Studio').slice(0, 42))}</text>
    <text x="84" y="320" fill="#44403C" font-family="sans-serif" font-size="28">${escapeHtml(String(subtitle || 'Conflict-Free Seating Solver, Caterer BEO & 24x36 Poster Studio').slice(0, 68))}</text>
    <rect x="84" y="420" width="360" height="96" rx="16" fill="#ECFDF5" stroke="#1F5E45" stroke-width="2"/>
    <text x="116" y="480" fill="#065F46" font-family="sans-serif" font-size="38" font-weight="800">${escapeHtml(scoreText || '98.4/100 Harmony')}</text>
  </svg>`;
}

module.exports = {
  renderHomePage,
  renderLandingPage,
  renderDirectoryPage,
  renderSeoDetailPage,
  renderLegalPage,
  render404Page,
  renderOgImageSvg
};

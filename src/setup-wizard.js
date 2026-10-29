/**
 * SeatHarmony - 5-question Setup Wizard (planner-order onboarding).
 * One question per screen: Couple & venue -> Guest count -> Table type -> Guest list -> Keep apart.
 * Builds the floorplan client-side, seats everyone, then reveals the full studio for fine-tuning.
 */

function renderSetupWizardHtml() {
  const tile = (n) => `<button type="button" class="shw-tile" data-guests="${n}" onclick="window.shwPickGuests(${n})">${n}</button>`;
  const tableCard = (key, title, sub, icon) => `
    <button type="button" class="shw-table-card" data-table="${key}" onclick="window.shwPickTable('${key}')">
      ${icon}
      <span class="shw-table-title">${title}</span>
      <span class="shw-table-sub">${sub}</span>
      <span class="shw-table-calc" data-per="${key === 'round10' ? 10 : (key === 'banquet12' ? 12 : 8)}"></span>
    </button>`;
  const roundIcon = (n) => `<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true"><circle cx="32" cy="32" r="14" fill="#FFFFFF" stroke="#B89352" stroke-width="2"/>${Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + (2 * Math.PI * i) / n; return `<circle cx="${(32 + 24 * Math.cos(a)).toFixed(1)}" cy="${(32 + 24 * Math.sin(a)).toFixed(1)}" r="4.2" fill="#F5EFE6" stroke="#B89352" stroke-width="1.4"/>`; }).join('')}</svg>`;
  const banquetIcon = `<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true"><rect x="8" y="26" width="48" height="12" rx="3" fill="#FFFFFF" stroke="#B89352" stroke-width="2"/>${[14, 24, 34, 44, 54].map(x => `<circle cx="${x - 2}" cy="18" r="4.2" fill="#F5EFE6" stroke="#B89352" stroke-width="1.4"/><circle cx="${x - 2}" cy="46" r="4.2" fill="#F5EFE6" stroke="#B89352" stroke-width="1.4"/>`).join('')}</svg>`;

  return `
      <div id="sh-setup-wizard" class="shw-wrap">
        <div class="shw-intro">
          <h2 class="bs-section-h2" style="text-align:center;margin:0 auto 6px;">Plan your seating in <em>2 minutes.</em></h2>
          <p class="bs-section-sub" style="text-align:center;margin:0 auto;">5 quick questions. We build the room and seat everyone.</p>
        </div>

        <div class="shw-layout">
        <div class="shw-card">
          <div class="shw-top">
            <button type="button" class="shw-back" id="shw-back-btn" onclick="window.shwGo(-1)">&larr; Back</button>
            <span class="shw-count" id="shw-count">Step 1 of 5</span>
          </div>
          <div class="shw-bar"><div class="shw-bar-fill" id="shw-bar-fill"></div></div>

          <!-- Q1: Couple & venue -->
          <div class="shw-step active" data-shw="1">
            <button type="button" class="shw-clear" id="shw-clear-1" onclick="window.shwClearStep(1)" hidden>Clear</button>
            <h3 class="shw-q">Whose wedding is it?</h3>
            <label class="shw-label" for="shw-couple">Couple</label>
            <input id="shw-couple" class="shw-input" type="text" placeholder="Maya &amp; Liam" autocomplete="off" oninput="window.shwPaintKit()" onkeydown="if(event.key==='Enter')window.shwGo(1)" />
            <label class="shw-label" for="shw-venue">Venue <span class="shw-opt">(optional)</span></label>
            <input id="shw-venue" class="shw-input" type="text" placeholder="Rosewood Estate" autocomplete="off" oninput="window.shwPaintKit()" onkeydown="if(event.key==='Enter')window.shwGo(1)" />
            <button type="button" class="shw-primary" onclick="window.shwGo(1)">Continue &rarr;</button>
            <div class="shw-alt">Just looking? <button type="button" class="shw-link preset-chip" data-preset="estate-150" data-domain="supabase.com" onclick="window.loadPresetScenario('estate-150', this)">See a sample wedding &rarr;</button></div>
          </div>

          <!-- Q2: Guest count -->
          <div class="shw-step" data-shw="2">
            <button type="button" class="shw-clear" id="shw-clear-2" onclick="window.shwClearStep(2)" hidden>Clear</button>
            <h3 class="shw-q">About how many guests?</h3>
            <p class="shw-hint">A rough number is fine. You can change it later.</p>
            <div class="shw-tiles">${[50, 75, 100, 150, 200, 250].map(tile).join('')}</div>
            <div class="shw-other-row">
              <input id="shw-guest-other" class="shw-input" type="number" min="2" max="600" placeholder="Other number" onkeydown="if(event.key==='Enter')window.shwPickGuests(this.value)" />
              <button type="button" class="shw-secondary" onclick="window.shwPickGuests(document.getElementById('shw-guest-other').value)">Use</button>
            </div>
          </div>

          <!-- Q3: Table type -->
          <div class="shw-step" data-shw="3">
            <button type="button" class="shw-clear" id="shw-clear-3" onclick="window.shwClearStep(3)" hidden>Clear</button>
            <h3 class="shw-q">What tables does your venue use?</h3>
            <p class="shw-hint">Not sure? Most venues use round tables of 8 or 10.</p>
            <div class="shw-table-grid">
              ${tableCard('round8', 'Round', '8 seats each', roundIcon(8))}
              ${tableCard('round10', 'Round', '10 seats each', roundIcon(10))}
              ${tableCard('banquet12', 'Long banquet', '12 seats each', banquetIcon)}
            </div>
            <p class="shw-hint" id="shw-table-calc" style="text-align:center;margin-top:14px;"></p>
          </div>

          <!-- Q4: Guest list -->
          <div class="shw-step" data-shw="4">
            <button type="button" class="shw-clear" id="shw-clear-4" onclick="window.shwClearStep(4)" hidden>Clear</button>
            <h3 class="shw-q">Paste your guest list</h3>
            <p class="shw-hint">One household per line. Couples and kids stay together.</p>
            <textarea id="shw-guests" class="shw-input shw-textarea" rows="7" placeholder="Sarah &amp; Mark Miller + 2 kids&#10;Aunt Patricia + guest&#10;Dr. &amp; Mrs. James Chen&#10;Grandma Rose (wheelchair)" oninput="window.shwCountGuests()"></textarea>
            <div class="shw-row-between">
              <span class="shw-hint" id="shw-guest-tally" style="margin:0;">0 households</span>
              <label class="shw-link" style="cursor:pointer;">Upload CSV<input type="file" accept=".csv,.txt" style="display:none;" onchange="window.shwUploadCsv(this)" /></label>
            </div>
            <button type="button" class="shw-primary" onclick="window.shwGo(1)">Continue &rarr;</button>
            <div class="shw-alt"><button type="button" class="shw-link" onclick="document.getElementById('shw-guests').value='';window.shwCountGuests();window.shwGo(1)">Skip, I&rsquo;ll add guests later</button></div>
          </div>

          <!-- Q5: Keep apart -->
          <div class="shw-step" data-shw="5">
            <button type="button" class="shw-clear" id="shw-clear-5" onclick="window.shwClearStep(5)" hidden>Clear</button>
            <h3 class="shw-q">Anyone who shouldn&rsquo;t sit together?</h3>
            <p class="shw-hint">Exes, divorced parents, feuding relatives. Optional.</p>
            <div class="shw-apart-row">
              <input id="shw-apart-a" class="shw-input" list="shw-name-list" placeholder="Uncle Bob" autocomplete="off" />
              <span class="shw-apart-x">&amp;</span>
              <input id="shw-apart-b" class="shw-input" list="shw-name-list" placeholder="Aunt Linda" autocomplete="off" onkeydown="if(event.key==='Enter')window.shwAddApart()" />
              <button type="button" class="shw-secondary" onclick="window.shwAddApart()">Add</button>
            </div>
            <datalist id="shw-name-list"></datalist>
            <div id="shw-apart-list" class="shw-apart-list"></div>
            <button type="button" class="shw-primary" id="shw-build-btn" onclick="window.shwBuild()">&#10024; Seat my guests</button>
          </div>
        </div>

        <aside class="shw-kit" id="shw-kit" aria-label="Your wedding binder">
          <div class="shw-kit-head">
            <div class="shw-kit-titles"><div class="shw-kit-title">Your wedding binder</div><div class="shw-kit-sub" id="shw-kit-sub">0 of 5</div></div>
          </div>
          <div class="shw-kit-bar"><div class="shw-kit-bar-fill" id="shw-kit-bar-fill"></div></div>
          <ul class="shw-kit-list">
            <li><button type="button" class="shw-kit-item" data-kit="sign" onclick="window.shwJump(1)"><span class="shw-kit-dot"></span><span class="shw-kit-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3.5" width="14" height="10.5" rx="1"/><path d="M12 14v6M8 20.5l4-6.5 4 6.5M8.5 7.5h7M8.5 10.5h4"/></svg></span><span class="shw-kit-text"><b>Welcome sign</b><small id="shw-kit-d-sign">Needs your names</small></span></button></li>
            <li><button type="button" class="shw-kit-item" data-kit="plan" onclick="window.shwJump(2)"><span class="shw-kit-dot"></span><span class="shw-kit-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.4"/><circle cx="12" cy="4.6" r="1.3"/><circle cx="12" cy="19.4" r="1.3"/><circle cx="4.6" cy="12" r="1.3"/><circle cx="19.4" cy="12" r="1.3"/><circle cx="6.8" cy="6.8" r="1.1"/><circle cx="17.2" cy="17.2" r="1.1"/><circle cx="17.2" cy="6.8" r="1.1"/><circle cx="6.8" cy="17.2" r="1.1"/></svg></span><span class="shw-kit-text"><b>Seating chart</b><small id="shw-kit-d-plan">Needs guests and tables</small></span></button></li>
            <li><button type="button" class="shw-kit-item" data-kit="cards" onclick="window.shwJump(4)"><span class="shw-kit-dot"></span><span class="shw-kit-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 18.5L6.5 7.5h11l3 11z"/><path d="M9.5 13h5"/><path d="M6.5 7.5l5.5 4 5.5-4" opacity=".55"/></svg></span><span class="shw-kit-text"><b>Place cards</b><small id="shw-kit-d-cards">Needs your guest list</small></span></button></li>
            <li><button type="button" class="shw-kit-item" data-kit="beo" onclick="window.shwJump(4)"><span class="shw-kit-dot"></span><span class="shw-kit-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="2.2"/><path d="M3.5 4.5v5a1.6 1.6 0 003.2 0v-5M5.1 11v8.5M20.5 4.5c-1.9 1.2-2.6 3.4-2.6 6.2H20.5V19.5"/></svg></span><span class="shw-kit-text"><b>Caterer sheet</b><small id="shw-kit-d-beo">Needs your guest list</small></span></button></li>
            <li><button type="button" class="shw-kit-item" data-kit="qr" onclick="window.shwJump(5)"><span class="shw-kit-dot"></span><span class="shw-kit-glyph" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2.6v2.6H14zM19 14v2M17.5 19H20M14 19.5v.5"/></svg></span><span class="shw-kit-text"><b>Guest QR lookup</b><small id="shw-kit-d-qr">Ready when you seat guests</small></span></button></li>
          </ul>
          <div class="shw-kit-foot" id="shw-kit-foot">Each answer fills a page of your binder.</div>
        </aside>
        </div>
      </div>`;
}


function renderBinderDockHtml() {
  const icon = (w) => `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6.5" y="3.5" width="13" height="17" rx="1.6"/><path d="M6.5 8h-2.2M6.5 12h-2.2M6.5 16h-2.2M10.5 8.5h5M10.5 12h5"/></svg>`;
  return `
      <button type="button" id="shw-dock" class="shw-dock" aria-label="Open your wedding binder" aria-haspopup="dialog" onclick="window.shwToggleBinder()" style="display:none;">
        <span class="shw-dock-ico">${icon(24)}</span>
        <span class="shw-dock-count"><b id="shw-dock-n">0</b>/5</span>
        <span class="shw-dock-ticks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
      </button>
      <div id="shw-pop" class="shw-pop" role="dialog" aria-label="Your wedding binder" style="display:none;">
        <div class="shw-pop-head">
          <div><div class="shw-kit-title">Your wedding binder</div><div class="shw-pop-title" id="shw-pop-title">0 of 5 pages ready</div></div>
          <button type="button" class="shw-pop-x" aria-label="Close" onclick="window.shwToggleBinder(false)">&times;</button>
        </div>
        <div class="shw-kit-bar"><div class="shw-kit-bar-fill" id="shw-pop-bar"></div></div>
        <ul class="shw-pop-list" id="shw-pop-list"></ul>
        <button type="button" class="shw-primary shw-pop-cta" id="shw-pop-cta" onclick="window.shwPopCta()">Continue setup</button>
        <div class="shw-pop-foot" id="shw-pop-foot"><button type="button" class="shw-link" onclick="window.shwAskClearAll()">Clear everything</button></div>
      </div>`;
}

function renderSetupWizardClientScript() {
  return `
  window.__SH_SETUP = { step: 1, maxStep: 1, guests: 0, table: '', apart: [], kitDone: {}, built: false, sample: false, engaged: false, kitInView: false };
  try { if (localStorage.getItem('sh_binder_engaged') === '1') window.__SH_SETUP.engaged = true; } catch (_) {}
  function shwEl(id) { return document.getElementById(id); }
  function shwHouseholds() { return String((shwEl('shw-guests') || {}).value || '').split(/\\r?\\n/).map(function(l) { return l.trim(); }).filter(function(l) { return l && !/^(name|guest|household|table)[,\\t]/i.test(l); }); }
  function shwPersonCount(lines) {
    var n = 0;
    lines.forEach(function(l) {
      var base = l.replace(/\\([^)]*\\)/g, '');
      var kids = (base.match(/\\+\\s*(\\d+)\\s*(?:kid|child)/i) || [])[1];
      var core = base.replace(/\\+\\s*\\d+\\s*(?:kid|child)[a-z]*/i, '').replace(/\\+\\s*(?:1\\s*)?guest\\b/i, '');
      n += core.split(/\\s*(?:&|\\band\\b|\\+)\\s*/i).filter(function(s) { return s.trim(); }).length + (kids ? Number(kids) : 0) + (/\\+\\s*(?:1\\s*)?guest\\b/i.test(base) ? 1 : 0);
    });
    return n;
  }
  function shwPerTable() { var t = window.__SH_SETUP.table; return t === 'round10' ? 10 : (t === 'banquet12' ? 12 : 8); }
  function shwPaint() {
    var s = window.__SH_SETUP.step;
    window.shwPaintKit();
    document.querySelectorAll('#sh-setup-wizard .shw-step').forEach(function(el) { el.classList.toggle('active', Number(el.getAttribute('data-shw')) === s); });
    var c = shwEl('shw-count'); if (c) c.textContent = 'Step ' + s + ' of 5';
    var f = shwEl('shw-bar-fill'); if (f) f.style.width = (s / 5 * 100) + '%';
    var b = shwEl('shw-back-btn'); if (b) b.style.visibility = s === 1 ? 'hidden' : 'visible';
    document.querySelectorAll('#sh-setup-wizard .shw-tile').forEach(function(t) { t.classList.toggle('active', Number(t.getAttribute('data-guests')) === window.__SH_SETUP.guests); });
    document.querySelectorAll('#sh-setup-wizard .shw-table-card').forEach(function(t) { t.classList.toggle('active', t.getAttribute('data-table') === window.__SH_SETUP.table); });
    var calc = shwEl('shw-table-calc');
    if (calc) calc.textContent = window.__SH_SETUP.guests ? ('For ' + window.__SH_SETUP.guests + ' guests, plus a sweetheart table for the couple') : '';
    document.querySelectorAll('#sh-setup-wizard .shw-table-calc').forEach(function(el) { el.textContent = window.__SH_SETUP.guests ? (Math.ceil(window.__SH_SETUP.guests / Number(el.getAttribute('data-per'))) + ' tables') : ''; });
    if (s === 5) {
      var dl = shwEl('shw-name-list'), names = [];
      shwHouseholds().forEach(function(l) { l.replace(/\\([^)]*\\)/g, '').replace(/\\+.*$/, '').split(/\\s*(?:&|\\band\\b)\\s*/i).forEach(function(n) { if (n.trim()) names.push(n.trim()); }); });
      if (dl) dl.innerHTML = names.slice(0, 300).map(function(n) { return '<option value="' + shEsc(n) + '"></option>'; }).join('');
    }
    var listEl = shwEl('shw-apart-list');
    if (listEl) listEl.innerHTML = window.__SH_SETUP.apart.map(function(p, i) { return '<span class="shw-chip">' + shEsc(p[0]) + ' &amp; ' + shEsc(p[1]) + ' <button type="button" aria-label="Remove" onclick="window.shwRemoveApart(' + i + ')">\\u2715</button></span>'; }).join('');
    var btn = shwEl('shw-build-btn'); if (btn) btn.innerHTML = window.__SH_SETUP.apart.length ? '&#10024; Seat my guests' : '&#10024; No conflicts, seat my guests';
    var focusMap = { 1: 'shw-couple', 4: 'shw-guests', 5: 'shw-apart-a' };
    var fEl = focusMap[s] && shwEl(focusMap[s]);
    if (fEl && window.__SH_SETUP.userStarted) { try { fEl.focus({ preventScroll: true }); } catch (_) {} }
  }
  window.shwGo = function(delta) {
    var s = window.__SH_SETUP.step;
    if (delta > 0 && s === 1 && !String(shwEl('shw-couple').value || '').trim()) { shwEl('shw-couple').focus(); shwEl('shw-couple').classList.add('shw-shake'); setTimeout(function() { shwEl('shw-couple').classList.remove('shw-shake'); }, 400); return; }
    if (delta > 0 && s === 2 && !window.__SH_SETUP.guests) return;
    if (delta > 0 && s === 3 && !window.__SH_SETUP.table) return;
    window.__SH_SETUP.userStarted = true;
    window.__SH_SETUP.step = Math.max(1, Math.min(5, s + delta));
    window.__SH_SETUP.maxStep = Math.max(window.__SH_SETUP.maxStep, window.__SH_SETUP.step);
    shwPaint();
  };
  window.shwJump = function(n) { if (n <= window.__SH_SETUP.maxStep) { window.__SH_SETUP.userStarted = true; window.__SH_SETUP.step = n; shwPaint(); } };
  function shwKitState() {
    var S = window.__SH_SETUP, couple = String((shwEl('shw-couple') || {}).value || '').trim(), venue = String((shwEl('shw-venue') || {}).value || '').trim();
    var lines = shwHouseholds(), people = shwPersonCount(lines), tbl = S.guests && S.table ? Math.ceil(S.guests / shwPerTable()) : 0;
    if (S.sample && window.__SH_STATE && window.__SH_STATE.tables) {
      var pl = window.__SH_STATE, g = pl.tables.reduce(function(a, t) { return a + t.guests.length; }, 0);
      return {
        sign: { ok: true, d: String(pl.title || 'Sample wedding') }, plan: { ok: true, d: g + ' guests \u00b7 ' + pl.tables.length + ' tables' },
        cards: { ok: true, d: g + ' names, ready to print' }, beo: { ok: true, d: 'Meals and allergies listed' }, qr: { ok: true, d: 'Live seat lookup ready' }
      };
    }
    return {
      sign: { ok: Boolean(couple), d: couple ? (couple + (venue ? ' \u00b7 ' + venue : '')) : 'Needs your names' },
      plan: { ok: Boolean(S.guests && S.table), d: tbl ? (S.guests + ' guests \u00b7 ' + tbl + ' tables of ' + shwPerTable()) : (S.guests ? 'Pick your table type' : 'Needs guests and tables') },
      cards: { ok: lines.length > 0, d: lines.length ? (people + ' name' + (people === 1 ? '' : 's') + ', ready to print') : 'Needs your guest list' },
      beo: { ok: lines.length > 0, d: lines.length ? 'Meals and allergies listed' : 'Needs your guest list' },
      qr: { ok: Boolean(S.built), d: S.built ? 'Live seat lookup ready' : 'Unlocks when we seat guests' }
    };
  }
  var SHW_KIT_NAMES = { sign: 'Welcome sign', plan: 'Seating chart', cards: 'Place cards', beo: 'Caterer sheet', qr: 'Guest QR lookup' };
  var SHW_KIT_STEP = { sign: 1, plan: 2, cards: 4, beo: 4, qr: 5 };
  var SHW_ICONS = { sign: '<rect x="5" y="3.5" width="14" height="10.5" rx="1"/><path d="M12 14v6M8 20.5l4-6.5 4 6.5M8.5 7.5h7M8.5 10.5h4"/>', plan: '<circle cx="12" cy="12" r="3.4"/><circle cx="12" cy="4.6" r="1.3"/><circle cx="12" cy="19.4" r="1.3"/><circle cx="4.6" cy="12" r="1.3"/><circle cx="19.4" cy="12" r="1.3"/>', cards: '<path d="M3.5 18.5L6.5 7.5h11l3 11z"/><path d="M9.5 13h5"/>', beo: '<circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="2.2"/><path d="M3.5 4.5v5a1.6 1.6 0 003.2 0v-5M5.1 11v8.5M20.5 4.5c-1.9 1.2-2.6 3.4-2.6 6.2H20.5V19.5"/>', qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2.6v2.6H14zM19 14v2M17.5 19H20M14 19.5v.5"/>' };
  function shwNextStep(st) { return !st.sign.ok ? 1 : (!st.plan.ok ? (window.__SH_SETUP.guests ? 3 : 2) : (!st.cards.ok ? 4 : 5)); }
  window.shwPaintKit = function() {
    var S = window.__SH_SETUP, st = shwKitState(), done = 0;
    Object.keys(st).forEach(function(k) {
      var li = document.querySelector('#shw-kit .shw-kit-item[data-kit="' + k + '"]'), d = shwEl('shw-kit-d-' + k);
      if (st[k].ok) done++;
      if (li) { li.classList.toggle('done', st[k].ok); if (st[k].ok && !S.kitDone[k]) { li.classList.remove('pop'); void li.offsetWidth; li.classList.add('pop'); } }
      if (d) d.textContent = st[k].d;
      S.kitDone[k] = st[k].ok;
    });
    if (done > 0 && !S.engaged) { S.engaged = true; try { localStorage.setItem('sh_binder_engaged', '1'); } catch (_) {} }
    var sub = shwEl('shw-kit-sub'); if (sub) sub.textContent = done + ' of 5';
    var bar = shwEl('shw-kit-bar-fill'); if (bar) bar.style.width = (done / 5 * 100) + '%';
    var foot = shwEl('shw-kit-foot'); if (foot) foot.textContent = done >= 4 ? 'One last step: we seat your guests.' : 'Each answer fills a page of your binder.';
    S.kitCount = done; S.kitSt = st;
    var kr = shwEl('shw-kit'); if (kr) { var rr = kr.getBoundingClientRect(); S.kitInView = rr.height > 0 && rr.bottom > 70 && rr.top < window.innerHeight - 40; }
    var clr = { 1: (shwEl('shw-couple') || {}).value || (shwEl('shw-venue') || {}).value, 2: S.guests, 3: S.table, 4: shwHouseholds().length, 5: S.apart.length };
    for (var n = 1; n <= 5; n++) { var c = shwEl('shw-clear-' + n); if (c) c.hidden = !clr[n]; }
    shwSyncDock();
  };

  /* ---- Binder dock (always available after first interaction), header chip and popover ---- */
  function shwCheckKitView() {
    var k = shwEl('shw-kit'), r = k && k.getBoundingClientRect(), inView = false;
    if (r && r.height > 0 && r.width > 0) inView = r.bottom > 70 && r.top < window.innerHeight - 40;
    window.__SH_SETUP.kitInView = inView; shwSyncDock();
  }
  function shwSyncDock() {
    var S = window.__SH_SETUP, dock = shwEl('shw-dock'), pop = shwEl('shw-pop'), n = S.kitCount || 0, chip = shwEl('nav-binder-btn');
    var open = pop && pop.style.display !== 'none';
    var show = S.engaged && (!S.kitInView || open);
    if (dock) { dock.style.display = show ? '' : 'none'; dock.classList.toggle('full', n === 5); }
    var dn = shwEl('shw-dock-n'); if (dn) dn.textContent = n;
    document.querySelectorAll('#shw-dock .shw-dock-ticks i').forEach(function(t, i) { t.classList.toggle('on', i < n); });
    if (chip) { chip.style.display = S.engaged ? '' : 'none'; var cn = shwEl('nav-binder-n'); if (cn) cn.textContent = n + '/5'; chip.classList.toggle('full', n === 5); }
    if (open) shwRenderPop();
  }
  function shwRenderPop() {
    var S = window.__SH_SETUP, st = S.kitSt || shwKitState(), list = shwEl('shw-pop-list'); if (!list) return;
    var n = S.kitCount || 0;
    shwEl('shw-pop-title').textContent = n === 5 ? 'Binder complete' : (n + ' of 5 pages ready');
    shwEl('shw-pop-bar').style.width = (n / 5 * 100) + '%';
    list.innerHTML = Object.keys(st).map(function(k) {
      var ok = st[k].ok;
      return '<li class="shw-pop-row' + (ok ? ' done' : '') + '"><span class="shw-pop-glyph"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">' + SHW_ICONS[k] + '</svg></span>'
        + '<span class="shw-pop-text"><b>' + SHW_KIT_NAMES[k] + '</b><small>' + shEsc(st[k].d) + '</small></span>'
        + '<span class="shw-pop-actions">' + (ok && k !== 'qr' ? '<button type="button" class="shw-pop-link" onclick="window.shwPopEdit(\\'' + k + '\\')">Edit</button><button type="button" class="shw-pop-link muted" onclick="window.shwClear(\\'' + k + '\\')">Clear</button>' : (k === 'qr' && ok ? '<button type="button" class="shw-pop-link" onclick="window.shwPopEdit(\\'qr\\')">View</button>' : '<button type="button" class="shw-pop-link" onclick="window.shwPopEdit(\\'' + k + '\\')">Add</button>')) + '</span></li>';
    }).join('');
    var cta = shwEl('shw-pop-cta'); cta.textContent = n === 5 ? 'Open my seating plan' : 'Continue setup';
    var foot = shwEl('shw-pop-foot'); if (foot && !S.confirmClear) foot.innerHTML = '<button type="button" class="shw-link" onclick="window.shwAskClearAll()">Clear everything</button>';
  }
  window.shwToggleBinder = function(force) {
    var pop = shwEl('shw-pop'); if (!pop) return;
    var open = typeof force === 'boolean' ? force : pop.style.display === 'none';
    window.__SH_SETUP.confirmClear = false;
    pop.style.display = open ? '' : 'none';
    if (open) { shwRenderPop(); var x = pop.querySelector('.shw-pop-x'); if (x) x.focus(); }
    shwSyncDock();
  };
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') window.shwToggleBinder(false); });
  document.addEventListener('click', function(e) {
    var pop = shwEl('shw-pop'); if (!pop || pop.style.display === 'none') return;
    if (!e.target.isConnected || pop.contains(e.target) || (e.target.closest && (e.target.closest('#shw-dock') || e.target.closest('#nav-binder-btn')))) return;
    window.shwToggleBinder(false);
  });
  function shwScrollStudio() { var st = shwEl('studio'); if (st) window.scrollTo({ top: st.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' }); }
  window.shwPopEdit = function(k) {
    window.shwToggleBinder(false);
    if (k === 'qr' && window.__SH_SETUP.built) { shwScrollStudio(); setTimeout(function() { window.shSetActiveTab('qr'); }, 250); return; }
    window.shOpenSetupWizard(SHW_KIT_STEP[k]);
  };
  window.shwPopCta = function() {
    var S = window.__SH_SETUP; window.shwToggleBinder(false);
    if (S.kitCount === 5) { var g = shwEl('sh-builder-grid'); if (g && g.style.display !== 'none') { shwScrollStudio(); return; } if (S.built || S.sample) { window.shFinishSetupWizard(); return; } window.shOpenSetupWizard(5); return; }
    window.shOpenSetupWizard(shwNextStep(S.kitSt || shwKitState()));
  };

  /* ---- Clear: every answer can be removed, so the binder never stays full ---- */
  function shwResetField(k) {
    var S = window.__SH_SETUP;
    if (k === 'sign') { shwEl('shw-couple').value = ''; shwEl('shw-venue').value = ''; }
    if (k === 'plan') { S.guests = 0; S.table = ''; var o = shwEl('shw-guest-other'); if (o) o.value = ''; }
    if (k === 'guests') { S.guests = 0; var o2 = shwEl('shw-guest-other'); if (o2) o2.value = ''; }
    if (k === 'table') { S.table = ''; }
    if (k === 'cards' || k === 'beo') { shwEl('shw-guests').value = ''; window.shwCountGuests(); }
    if (k === 'apart') { S.apart = []; shwEl('shw-apart-a').value = ''; shwEl('shw-apart-b').value = ''; }
  }
  function shwAfterClear(step) {
    var S = window.__SH_SETUP;
    if (S.sample) { shwResetAll(); return; }
    S.built = false;
    var grid = shwEl('sh-builder-grid');
    if (grid && grid.style.display !== 'none') { window.shOpenSetupWizard(step); return; }
    shwPaint();
  }
  window.shwClear = function(k) { shwResetField(k); shwAfterClear(SHW_KIT_STEP[k] || 1); };
  window.shwClearStep = function(n) {
    var map = { 1: 'sign', 2: 'guests', 3: 'table', 4: 'cards', 5: 'apart' };
    shwResetField(map[n]); window.__SH_SETUP.built = false; shwPaint();
  };
  function shwResetAll() {
    var S = window.__SH_SETUP;
    ['sign', 'plan', 'cards', 'apart'].forEach(shwResetField);
    S.step = 1; S.maxStep = 1; S.built = false; S.sample = false; S.engaged = false; S.kitDone = {}; S.confirmClear = false;
    try { localStorage.removeItem('sh_binder_engaged'); } catch (_) {}
    var pop = shwEl('shw-pop'); if (pop) pop.style.display = 'none';
    var w = shwEl('sh-setup-wizard'), g = shwEl('sh-builder-grid'); if (g) g.style.display = 'none'; if (w) w.style.display = '';
    shwPaint();
  }
  window.shwAskClearAll = function() {
    var foot = shwEl('shw-pop-foot'); if (!foot) return; window.__SH_SETUP.confirmClear = true;
    foot.innerHTML = '<span class="shw-confirm">Clear every answer and start over?</span> <button type="button" class="shw-link" onclick="window.shwDoClearAll()">Yes, clear</button> <button type="button" class="shw-link muted" onclick="window.__SH_SETUP.confirmClear=false;window.shwToggleBinder(true)">Keep</button>';
  };
  window.shwDoClearAll = function() { shwResetAll(); shwScrollStudio(); };
  window.shwPickGuests = function(n) {
    var v = Math.max(2, Math.min(600, Math.round(Number(n) || 0)));
    if (!Number(n)) return;
    window.__SH_SETUP.guests = v; shwPaint();
    setTimeout(function() { window.shwGo(1); }, 160);
  };
  window.shwPickTable = function(key) { window.__SH_SETUP.table = key; shwPaint(); setTimeout(function() { window.shwGo(1); }, 160); };
  window.shwCountGuests = function() {
    var lines = shwHouseholds(), people = shwPersonCount(lines), el = shwEl('shw-guest-tally');
    window.shwPaintKit();
    if (el) el.textContent = lines.length + ' household' + (lines.length === 1 ? '' : 's') + (people ? ' \\u00b7 ' + people + ' guests' : '');
  };
  window.shwUploadCsv = function(inp) {
    var f = inp && inp.files && inp.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function(ev) { shwEl('shw-guests').value = String(ev.target.result || '').split(/\\r?\\n/).map(function(l) { return l.split(',')[0].replace(/^"|"$/g, '').trim(); }).filter(Boolean).join('\\n'); window.shwCountGuests(); };
    r.readAsText(f);
  };
  window.shwAddApart = function() {
    var a = String(shwEl('shw-apart-a').value || '').trim(), b = String(shwEl('shw-apart-b').value || '').trim();
    if (!a || !b) { (a ? shwEl('shw-apart-b') : shwEl('shw-apart-a')).focus(); return; }
    window.__SH_SETUP.apart.push([a, b]); shwEl('shw-apart-a').value = ''; shwEl('shw-apart-b').value = ''; shwPaint(); shwEl('shw-apart-a').focus();
  };
  window.shwRemoveApart = function(i) { window.__SH_SETUP.apart.splice(i, 1); shwPaint(); };

  function shwLayoutTables(count, kind) {
    var per = kind === 'round10' ? 10 : (kind === 'banquet12' ? 12 : 8);
    var isBanquet = kind === 'banquet12', extentX = isBanquet ? 160 : (per === 10 ? 108 : 100), extentY = isBanquet ? 75 : extentX;
    var cols = isBanquet ? [200, 560, 920] : (per === 10 ? [165, 425, 695, 955] : [130, 340, 560, 780, 990]);
    var stepY = isBanquet ? 165 : extentY * 2 + 12, y = 230, out = [], row = 0;
    while (out.length < count) {
      cols.forEach(function(x) {
        if (out.length >= count) return;
        if (row === 0 && x + extentX > 445 && x - extentX < 675) return;
        out.push({ x: x, y: y });
      });
      row++; y += stepY;
    }
    var lastY = out.length ? out[out.length - 1].y : 230;
    return { pts: out, per: per, shape: isBanquet ? 'banquet_2sided' : 'round', roomHeight: Math.max(680, lastY + extentY + 30) };
  }

  function shwApplyKeepApart(plan, pairs) {
    var find = function(q) {
      q = q.toLowerCase();
      for (var t = 1; t < plan.tables.length; t++) for (var g = 0; g < plan.tables[t].guests.length; g++) if (String(plan.tables[t].guests[g].name).toLowerCase().indexOf(q) !== -1) return { t: t, g: g };
      return null;
    };
    pairs.forEach(function(p) {
      var A = find(p[0]), B = find(p[1]);
      if (!A || !B || A.t !== B.t) return;
      var src = plan.tables[A.t], far = -1, best = -1;
      plan.tables.forEach(function(t, i) { if (i === 0 || i === A.t || t.guests.length >= (t.capacity || 8)) return; var d = Math.hypot(t.x - src.x, t.y - src.y) - (t.guests.length ? 0 : 400); if (d > best) { best = d; far = i; } });
      if (far === -1) return;
      plan.tables[far].guests.push(src.guests.splice(B.g, 1)[0]);
    });
  }

  window.shwBuild = function() {
    var S = window.__SH_SETUP, couple = String(shwEl('shw-couple').value || '').trim() || 'Our', venue = String(shwEl('shw-venue').value || '').trim() || 'Our Venue';
    var lines = shwHouseholds(), people = shwPersonCount(lines), guests = Math.max(S.guests || 0, people);
    var lay = shwLayoutTables(Math.max(1, Math.ceil(guests / shwPerTable())), S.table || 'round8');
    var partners = couple.split(/\\s*(?:&|\\band\\b|\\+)\\s*/i).filter(Boolean);
    var hosts = (partners.length ? partners : ['Partner 1', 'Partner 2']).slice(0, 2).map(function(n) { return { name: n, initials: n.slice(0, 2).toUpperCase(), role: 'Couple', meal: 'Filet Mignon', allergy: '', accessibility: '' }; });
    var tables = [{ id: 'table-1', number: 1, name: 'Sweetheart Table', shape: 'sweetheart', capacity: 2, x: 560, y: 80, rotation: 0, locked: true, guests: hosts }];
    lay.pts.forEach(function(pt, i) { tables.push({ id: 'table-' + (i + 2), number: i + 2, name: 'Table ' + (i + 2), shape: lay.shape, capacity: lay.per, x: pt.x, y: pt.y, rotation: 0, locked: false, guests: [] }); });
    var vaultId = (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819';
    window.__SH_STATE = {
      vaultId: vaultId, isWizardBuilt: true, title: (partners.length >= 2 ? couple + "'s Wedding" : couple + ' Wedding'), venueName: venue,
      harmonyScore: S.apart.length ? 99 : 98, householdsCoupled: 0, roomHeight: lay.roomHeight, tables: tables,
      landmarks: [{ id: 'lm-dance', label: 'DANCE FLOOR', x: 560, y: 230, w: 210, h: 130, zone: 'loud' }],
      rules: S.apart.map(function(p, i) { return { id: 'rule_w_' + i, type: 'must_keep_apart', label: p[0] + ' & ' + p[1] + ' kept apart', detail: 'Separated across the room', status: 'VERIFIED' }; })
    };
    var ta = shwEl('sh-bulk-csv-textarea');
    if (ta && lines.length) {
      ta.value = lines.join('\\n');
      window.__SH_SUPPRESS_RENDER = true;
      try { window.shProcessBulkCsv(true); } finally { window.__SH_SUPPRESS_RENDER = false; }
      window.__SH_STATE.householdsCoupled = lines.length;
    }
    window.__SH_STATE.tables.forEach(function(t) { shRecomputeGeometry(t); });
    shwApplyKeepApart(window.__SH_STATE, S.apart);
    var ti = shwEl('sh-couple-title-input'); if (ti) ti.value = window.__SH_STATE.title;
    var vi = shwEl('sh-venue-name-input'); if (vi) vi.value = venue;
    window.__SH_SELECTED_TABLE_IDX = window.__SH_STATE.tables.length > 1 ? 1 : 0;
    S.built = true; S.sample = false; S.engaged = true; try { localStorage.setItem('sh_binder_engaged', '1'); } catch (_) {}
    window.shFinishSetupWizard();
    shToast('\\u2713 Seated ' + (people + hosts.length) + ' guests at ' + (window.__SH_STATE.tables.length - 1) + ' tables' + (S.apart.length ? ' \\u00b7 ' + S.apart.length + ' conflict' + (S.apart.length === 1 ? '' : 's') + ' kept apart' : '') + '. Click any seat to adjust.');
  };

  window.shFinishSetupWizard = function() {
    setTimeout(function() { window.shwPaintKit(); }, 0);
    var w = shwEl('sh-setup-wizard'), g = shwEl('sh-builder-grid');
    if (w) w.style.display = 'none';
    if (g) g.style.display = '';
    window.__SH_WIZARD_STEP = 4; window.__SH_SWAP_SOURCE = null; window.__SH_CANVAS_ZOOM = 'room'; window.__SH_UNDO = []; window.__SH_OPEN_GUEST = null;
    shSyncTableSelectAndPills(); shRenderAll();
    var st = shwEl('studio'); if (st && window.__SH_SETUP.userStarted) window.scrollTo({ top: st.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
  };
  window.shOpenSetupWizard = function(step) {
    var w = shwEl('sh-setup-wizard'), g = shwEl('sh-builder-grid'), n = Math.max(1, Math.min(5, Number(step) || 1));
    if (g) g.style.display = 'none';
    if (w) w.style.display = '';
    window.__SH_SETUP.step = n; window.__SH_SETUP.maxStep = Math.max(window.__SH_SETUP.maxStep, n); window.__SH_SETUP.userStarted = true; shwPaint();
    var st = shwEl('studio'); if (st) window.scrollTo({ top: st.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
  };
  window.scrollToShCard = function(n) { if (Number(n) < 4) window.shOpenSetupWizard(); };

  (function() {
    var origLoad = window.loadPresetScenario;
    window.loadPresetScenario = async function(key, btn) {
      window.__SH_SETUP.userStarted = true;
      await origLoad(key, btn);
      window.__SH_SETUP.sample = true; window.__SH_SETUP.engaged = true; try { localStorage.setItem('sh_binder_engaged', '1'); } catch (_) {}
      window.shFinishSetupWizard();
    };
  })();
  document.addEventListener('DOMContentLoaded', function() {
    var kitEl = shwEl('shw-kit');
    var ticking = false;
    var onScroll = function() { if (ticking) return; ticking = true; requestAnimationFrame(function() { ticking = false; shwCheckKitView(); }); };
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    shwCheckKitView();
    shwPaint();
    try {
      var sp = new URLSearchParams(window.location.search);
      if (sp.get('sandbox') || sp.get('preset') || sp.get('checkout') || sp.get('unlocked')) window.shFinishSetupWizard();
    } catch (_) {}
  });`;
}

module.exports = { renderSetupWizardHtml, renderBinderDockHtml, renderSetupWizardClientScript };

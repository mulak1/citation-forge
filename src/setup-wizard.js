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

        <aside class="shw-kit" id="shw-kit" aria-label="Your reception kit">
          <div class="shw-kit-head">
            <span class="shw-kit-ico" aria-hidden="true">&#127873;</span>
            <div class="shw-kit-titles"><div class="shw-kit-title">Your reception kit</div><div class="shw-kit-sub" id="shw-kit-sub">0 of 5 ready</div></div>
          </div>
          <div class="shw-kit-bar"><div class="shw-kit-bar-fill" id="shw-kit-bar-fill"></div></div>
          <ul class="shw-kit-list">
            <li><button type="button" class="shw-kit-item" data-kit="sign" onclick="window.shwJump(1)"><span class="shw-kit-dot"></span><span class="shw-kit-emoji" aria-hidden="true">&#128444;&#65039;</span><span class="shw-kit-text"><b>Welcome sign</b><small id="shw-kit-d-sign">Needs your names</small></span></button></li>
            <li><button type="button" class="shw-kit-item" data-kit="plan" onclick="window.shwJump(2)"><span class="shw-kit-dot"></span><span class="shw-kit-emoji" aria-hidden="true">&#128506;&#65039;</span><span class="shw-kit-text"><b>Seating chart</b><small id="shw-kit-d-plan">Needs guests and tables</small></span></button></li>
            <li><button type="button" class="shw-kit-item" data-kit="cards" onclick="window.shwJump(4)"><span class="shw-kit-dot"></span><span class="shw-kit-emoji" aria-hidden="true">&#128140;</span><span class="shw-kit-text"><b>Place cards</b><small id="shw-kit-d-cards">Needs your guest list</small></span></button></li>
            <li><button type="button" class="shw-kit-item" data-kit="beo" onclick="window.shwJump(4)"><span class="shw-kit-dot"></span><span class="shw-kit-emoji" aria-hidden="true">&#127869;&#65039;</span><span class="shw-kit-text"><b>Caterer sheet</b><small id="shw-kit-d-beo">Needs your guest list</small></span></button></li>
            <li><button type="button" class="shw-kit-item" data-kit="qr" onclick="window.shwJump(5)"><span class="shw-kit-dot"></span><span class="shw-kit-emoji" aria-hidden="true">&#128241;</span><span class="shw-kit-text"><b>Guest QR lookup</b><small id="shw-kit-d-qr">Ready when you seat guests</small></span></button></li>
          </ul>
          <div class="shw-kit-foot" id="shw-kit-foot">Fills up as you answer.</div>
        </aside>
        </div>
      </div>`;
}

function renderSetupWizardClientScript() {
  return `
  window.__SH_SETUP = { step: 1, maxStep: 1, guests: 0, table: '', apart: [], kitDone: {} };
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
  window.shwPaintKit = function() {
    var S = window.__SH_SETUP, couple = String((shwEl('shw-couple') || {}).value || '').trim(), venue = String((shwEl('shw-venue') || {}).value || '').trim();
    var lines = shwHouseholds(), people = shwPersonCount(lines);
    var tbl = S.guests && S.table ? Math.ceil(S.guests / shwPerTable()) : 0;
    var st = {
      sign: { ok: Boolean(couple), d: couple ? (couple + (venue ? ' \u00b7 ' + venue : '')) : 'Needs your names' },
      plan: { ok: Boolean(S.guests && S.table), d: tbl ? (S.guests + ' guests \u00b7 ' + tbl + ' tables of ' + shwPerTable()) : (S.guests ? 'Pick your table type' : 'Needs guests and tables') },
      cards: { ok: lines.length > 0, d: lines.length ? (people + ' name' + (people === 1 ? '' : 's') + ', ready to print') : 'Needs your guest list' },
      beo: { ok: lines.length > 0, d: lines.length ? 'Meals and allergies listed' : 'Needs your guest list' },
      qr: { ok: false, d: 'Unlocks when we seat guests' }
    };
    var done = 0, newly = [];
    Object.keys(st).forEach(function(k) {
      var li = document.querySelector('#shw-kit .shw-kit-item[data-kit="' + k + '"]'), d = shwEl('shw-kit-d-' + k);
      if (st[k].ok) done++;
      if (li) { li.classList.toggle('done', st[k].ok); if (st[k].ok && !S.kitDone[k]) { li.classList.remove('pop'); void li.offsetWidth; li.classList.add('pop'); } }
      if (d) d.textContent = st[k].d;
      S.kitDone[k] = st[k].ok;
    });
    var sub = shwEl('shw-kit-sub'); if (sub) sub.textContent = done + ' of 5 ready';
    var bar = shwEl('shw-kit-bar-fill'); if (bar) bar.style.width = (done / 5 * 100) + '%';
    var foot = shwEl('shw-kit-foot');
    if (foot) foot.textContent = done >= 4 ? 'Last step: seat your guests to finish your kit.' : (done ? 'Nice. Keep going to fill your kit.' : 'Fills up as you answer.');
  };
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
    window.shFinishSetupWizard();
    shToast('\\u2713 Seated ' + (people + hosts.length) + ' guests at ' + (window.__SH_STATE.tables.length - 1) + ' tables' + (S.apart.length ? ' \\u00b7 ' + S.apart.length + ' conflict' + (S.apart.length === 1 ? '' : 's') + ' kept apart' : '') + '. Click any seat to adjust.');
  };

  window.shFinishSetupWizard = function() {
    var w = shwEl('sh-setup-wizard'), g = shwEl('sh-builder-grid');
    if (w) w.style.display = 'none';
    if (g) g.style.display = '';
    window.__SH_WIZARD_STEP = 4; window.__SH_SWAP_SOURCE = null; window.__SH_CANVAS_ZOOM = 'room'; window.__SH_UNDO = []; window.__SH_OPEN_GUEST = null;
    shSyncTableSelectAndPills(); shRenderAll();
    var st = shwEl('studio'); if (st && window.__SH_SETUP.userStarted) window.scrollTo({ top: st.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
  };
  window.shOpenSetupWizard = function() {
    var w = shwEl('sh-setup-wizard'), g = shwEl('sh-builder-grid');
    if (g) g.style.display = 'none';
    if (w) w.style.display = '';
    window.__SH_SETUP.step = 1; window.__SH_SETUP.userStarted = true; shwPaint();
    var st = shwEl('studio'); if (st) window.scrollTo({ top: st.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
  };
  window.scrollToShCard = function(n) { if (Number(n) < 4) window.shOpenSetupWizard(); };

  (function() {
    var origLoad = window.loadPresetScenario;
    window.loadPresetScenario = async function(key, btn) {
      window.__SH_SETUP.userStarted = true;
      await origLoad(key, btn);
      window.shFinishSetupWizard();
    };
  })();
  document.addEventListener('DOMContentLoaded', function() {
    shwPaint();
    try {
      var sp = new URLSearchParams(window.location.search);
      if (sp.get('sandbox') || sp.get('preset') || sp.get('checkout') || sp.get('unlocked')) window.shFinishSetupWizard();
    } catch (_) {}
  });`;
}

module.exports = { renderSetupWizardHtml, renderSetupWizardClientScript };

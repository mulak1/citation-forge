/**
 * SeatHarmony - Guest groups (colour coding), keep-apart rules after setup, visual SVG conflict halos,
 * 1-click "Seat with..." grouping, snap-to-table drag, table rotation, mixed table types,
 * non-destructive room scaling, and 1-click empty-table cleanup.
 */

function renderSeatGroupsClientScript() {
  return `
  /* ---- Guest groups: colour-coded relationships ---- */
  var SH_GROUPS = [
    { key: 'couple', label: 'Couple', color: '#B89352' },
    { key: 'parents', label: 'Parents', color: '#8C2D19' },
    { key: 'family', label: 'Family', color: '#4D7C5D' },
    { key: 'party', label: 'Wedding party', color: '#4F6BA8' },
    { key: 'friends', label: 'Friends', color: '#B0647A' },
    { key: 'kids', label: 'Kids', color: '#D49A3A' },
    { key: 'other', label: 'Other guests', color: '#8A8173' }
  ];
  window.__SH_GROUP_HIGHLIGHT = null;
  function shGroupDef(key) { for (var i = 0; i < SH_GROUPS.length; i++) if (SH_GROUPS[i].key === key) return SH_GROUPS[i]; return SH_GROUPS[6]; }
  function shHasWord(text, words) { var parts = String(text || '').toLowerCase().split(/[^a-z]+/); for (var i = 0; i < words.length; i++) if (parts.indexOf(words[i]) !== -1) return true; return false; }
  function shAutoGroup(g) {
    var n = String(g.name || ''), role = String(g.role || '').toLowerCase(), meal = String(g.meal || '').toLowerCase(), all = n + ' ' + role;
    if (role === 'couple' || role === 'host' || shHasWord(n, ['bride', 'groom'])) return 'couple';
    if (meal.indexOf('kid') !== -1 || shHasWord(all, ['kid', 'child', 'baby', 'toddler'])) return 'kids';
    if (all.toLowerCase().indexOf('best man') !== -1 || all.toLowerCase().indexOf('maid of honor') !== -1 || shHasWord(all, ['groomsman', 'groomsmen', 'bridesmaid', 'bridesmaids', 'usher'])) return 'party';
    if (shHasWord(all, ['mom', 'dad', 'mother', 'father', 'parents', 'stepmom', 'stepdad'])) return 'parents';
    if (shHasWord(all, ['aunt', 'uncle', 'cousin', 'grandma', 'grandpa', 'grandmother', 'grandfather', 'brother', 'sister', 'niece', 'nephew', 'family'])) return 'family';
    return 'other';
  }
  window.shGroupOf = function(g) { if (!g.rel) g.rel = shAutoGroup(g); return g.rel; };
  window.shGroupDot = function(g) { var d = shGroupDef(window.shGroupOf(g)); return '<span class="sh-gdot" title="' + shEsc(d.label) + '" style="background:' + d.color + ';"></span>'; };
  window.shSeatGroupMark = function(g, s) {
    var key = window.shGroupOf(g), d = shGroupDef(key), hl = window.__SH_GROUP_HIGHLIGHT;
    if (hl && hl !== key) return '<circle cx="' + s.x + '" cy="' + s.y + '" r="19" fill="rgba(246,243,238,0.78)" pointer-events="none"/>';
    return '<circle cx="' + s.x + '" cy="' + s.y + '" r="' + (hl ? 22.5 : 21.5) + '" fill="none" stroke="' + d.color + '" stroke-width="' + (hl ? 3.6 : 2.6) + '" pointer-events="none"/>';
  };
  window.shSetHighlight = function(idx) {
    var key = idx < 0 ? null : SH_GROUPS[idx].key;
    window.__SH_GROUP_HIGHLIGHT = (key && window.__SH_GROUP_HIGHLIGHT === key) ? null : key;
    shRenderAll();
  };
  window.shRenderLegend = function() {
    var el = document.getElementById('sh-ed-legend'); if (!el || !window.__SH_STATE) return;
    var counts = {}; (window.__SH_STATE.tables || []).forEach(function(t) { t.guests.forEach(function(g) { var k = window.shGroupOf(g); counts[k] = (counts[k] || 0) + 1; }); });
    el.innerHTML = SH_GROUPS.filter(function(d) { return counts[d.key]; }).map(function(d) {
      var i = SH_GROUPS.indexOf(d);
      return '<button type="button" class="sh-leg' + (window.__SH_GROUP_HIGHLIGHT === d.key ? ' on' : '') + '" onclick="window.shSetHighlight(' + i + ')" title="Show only ' + shEsc(d.label) + '"><span class="sh-gdot" style="background:' + d.color + ';"></span>' + shEsc(d.label) + ' <b>' + counts[d.key] + '</b></button>';
    }).join('');
  };
  window.shEdSetGroup = function(tIdx, sIdx, gi) {
    var g = window.__SH_STATE.tables[tIdx].guests[sIdx]; if (!g) return;
    window.shSnapshot(); g.rel = SH_GROUPS[gi].key; shRenderAll();
  };

  /* ---- Keep apart + Seat with (works after setup, auto-separates, surfaces top alert & SVG halo) ---- */
  function shFindGuests(q) {
    q = String(q || '').trim().toLowerCase(); var out = []; if (!q) return out;
    (window.__SH_STATE.tables || []).forEach(function(t, ti) { t.guests.forEach(function(g, gi) { var n = String(g.name || '').toLowerCase(); if (n === q || n.indexOf(q) !== -1) out.push({ t: ti, g: gi, exact: n === q }); }); });
    var ex = out.filter(function(x) { return x.exact; }); return ex.length ? ex : out;
  }
  function shRuleState(r) {
    if (!r.pair) return null;
    var A = shFindGuests(r.pair[0]), B = shFindGuests(r.pair[1]), tables = (window.__SH_STATE && window.__SH_STATE.tables) || [];
    if (!A.length || !B.length) return 'missing';
    for (var i = 0; i < A.length; i++) for (var j = 0; j < B.length; j++) {
      if (A[i].t === B[j].t && A[i].g !== B[j].g) return 'same';
      var tA = tables[A[i].t], tB = tables[B[j].t];
      if (tA && tB && Math.hypot(tA.x - tB.x, tA.y - tB.y) < 225) return 'close';
    }
    return 'apart';
  }
  function shConflictTables() {
    var map = {}, rules = (window.__SH_STATE && window.__SH_STATE.rules) || [];
    rules.forEach(function(r) {
      if (!r.pair) return;
      var A = shFindGuests(r.pair[0]), B = shFindGuests(r.pair[1]);
      for (var i = 0; i < A.length; i++) for (var j = 0; j < B.length; j++) if (A[i].t === B[j].t && A[i].g !== B[j].g) map[A[i].t] = r.pair[0].split(' ')[0] + ' & ' + r.pair[1].split(' ')[0];
    });
    return map;
  }
  function shLoudConflictTables() {
    var out = [], plan = window.__SH_STATE; if (!plan || !plan.tables || !plan.landmarks) return out;
    var louds = plan.landmarks.filter(function(l) { return /dj|band|subwoofer|speaker|stage/i.test(String(l.label || '')); });
    if (!louds.length) return out;
    plan.tables.forEach(function(t, ti) {
      if (ti === 0) return;
      var sr = (t.guests || []).find(function(g) { return /grandma|grandpa|nana|pop|elderly|senior/i.test(String(g.name || '') + ' ' + String(g.role || '')); });
      if (!sr) return;
      louds.forEach(function(lm) {
        var lx = (lm.x || 0) + (lm.w || 140) / 2, ly = (lm.y || 0) + (lm.h || 50) / 2;
        if (Math.hypot(t.x - lx, t.y - ly) < 195) out.push({ t: ti, guest: sr.name, lm: lm.label });
      });
    });
    return out;
  }
  function shSeparate(r) {
    var A = shFindGuests(r.pair[0]), B = shFindGuests(r.pair[1]), src = null, mv = null;
    for (var i = 0; i < A.length && !mv; i++) for (var j = 0; j < B.length; j++) if (A[i].t === B[j].t || shRuleState(r) === 'close') { src = A[i]; mv = B[j]; break; }
    if (!mv) return false;
    var tables = window.__SH_STATE.tables, ref = tables[src.t], best = -1, bd = -1;
    tables.forEach(function(t, i) { if (i === 0 || i === src.t || t.guests.length >= (t.capacity || 0)) return; var d = Math.hypot(t.x - ref.x, t.y - ref.y); if (d > bd) { bd = d; best = i; } });
    if (best === -1) {
      tables.forEach(function(t, i) { if (i === 0 || i === src.t) return; var d = Math.hypot(t.x - ref.x, t.y - ref.y); if (d > bd) { bd = d; best = i; } });
    }
    if (best === -1) return false;
    window.shMoveGuestToTable(mv.t, mv.g, best); window.__SH_SWAP_SOURCE = null; window.__SH_OPEN_GUEST = null; return true;
  }
  window.shFixLoudTable = function(tIdx) {
    var plan = window.__SH_STATE, tbl = plan && plan.tables && plan.tables[tIdx]; if (!tbl) return;
    var sIdx = tbl.guests.findIndex(function(g) { return /grandma|grandpa|nana|pop|elderly|senior/i.test(String(g.name || '') + ' ' + String(g.role || '')); });
    if (sIdx === -1) return;
    var louds = (plan.landmarks || []).filter(function(l) { return /dj|band|subwoofer|speaker|stage/i.test(String(l.label || '')); });
    var lx = louds[0] ? (louds[0].x + (louds[0].w || 140) / 2) : 900, ly = louds[0] ? (louds[0].y + (louds[0].h || 50) / 2) : 80;
    var best = -1, bd = -1;
    plan.tables.forEach(function(t, i) { if (i === 0 || i === tIdx) return; var d = Math.hypot(t.x - lx, t.y - ly); if (d > bd) { bd = d; best = i; } });
    if (best === -1) return;
    window.shSnapshot(); var nm = tbl.guests[sIdx].name; window.shMoveGuestToTable(tIdx, sIdx, best);
    shToast('\\u2713 Moved ' + nm + ' to quiet ' + plan.tables[best].name + ' away from speakers.'); shRenderAll();
  };
  window.shEdTopConflictHtml = function() {
    var rules = (window.__SH_STATE && window.__SH_STATE.rules) || [], h = [];
    rules.forEach(function(r, i) {
      var st = r.pair ? shRuleState(r) : null;
      if (st === 'same') {
        h.push('<div class="sh-ed-conflict-alert"><span>&#9888; <b>' + shEsc(r.pair[0]) + '</b> &amp; <b>' + shEsc(r.pair[1]) + '</b> are at the same table</span><button type="button" class="sh-ed-ka-btn" onclick="window.shFixKeepApart(' + i + ')">Separate</button></div>');
      } else if (st === 'close') {
        h.push('<div class="sh-ed-conflict-alert" style="background:#FFFBEB;border-color:#F59E0B;color:#92400E;"><span>&#9888; <b>' + shEsc(r.pair[0]) + '</b> &amp; <b>' + shEsc(r.pair[1]) + '</b> are on adjacent tables (close sightline)</span><button type="button" class="sh-ed-ka-btn" onclick="window.shFixKeepApart(' + i + ')">Move Farther Apart</button></div>');
      }
    });
    shLoudConflictTables().forEach(function(lc) {
      h.push('<div class="sh-ed-conflict-alert" style="background:#FFFBEB;border-color:#F59E0B;color:#92400E;"><span>&#128266; <b>' + shEsc(lc.guest) + '</b> is seated near loud <b>' + shEsc(lc.lm) + '</b></span><button type="button" class="sh-ed-ka-btn" onclick="window.shFixLoudTable(' + lc.t + ')">Move to Quiet Zone</button></div>');
    });
    return h.join('');
  };
  window.shAddKeepApart = function(a, b) {
    a = String(a || '').trim(); b = String(b || '').trim();
    if (!a || !b || a.toLowerCase() === b.toLowerCase()) { shToast('Pick two different guests to keep apart.'); return; }
    if (!shFindGuests(a).length || !shFindGuests(b).length) { shToast('I could not find both names on your guest list. Check the spelling.'); return; }
    window.shSnapshot(); var plan = window.__SH_STATE;
    if (!Array.isArray(plan.rules)) plan.rules = [];
    var rule = { id: 'rule_ka_' + Date.now(), type: 'must_keep_apart', label: a + ' & ' + b + ' kept apart', detail: 'Separated across the room', status: 'VERIFIED', pair: [a, b] };
    plan.rules.unshift(rule);
    var moved = shRuleState(rule) === 'same' ? shSeparate(rule) : false;
    shToast(moved ? a + ' and ' + b + ' were at the same table, so I moved one. Tap Undo to reverse.' : a + ' and ' + b + ' will be kept apart.');
    shRenderAll();
  };
  window.shAddKeepApartForm = function() { window.shAddKeepApart((document.getElementById('sh-ka-a') || {}).value, (document.getElementById('sh-ka-b') || {}).value); };
  window.shKeepApartFrom = function(tIdx, sIdx, val) {
    var g = window.__SH_STATE.tables[tIdx].guests[sIdx], p = String(val || '').split(':'); if (!g || p.length !== 2) return;
    var o = window.__SH_STATE.tables[Number(p[0])] && window.__SH_STATE.tables[Number(p[0])].guests[Number(p[1])]; if (!o) return;
    window.shAddKeepApart(g.name, o.name);
  };
  window.shSeatWithGuest = function(tIdx, sIdx, val) {
    var dst = window.__SH_STATE.tables[tIdx], g = dst && dst.guests[sIdx], p = String(val || '').split(':');
    if (!g || p.length !== 2) return;
    var fromT = Number(p[0]), fromS = Number(p[1]), src = window.__SH_STATE.tables[fromT], other = src && src.guests[fromS];
    if (!other || fromT === tIdx) return;
    var hhId = g.hhId || other.hhId || ('hh_' + Date.now());
    g.hhId = hhId; other.hhId = hhId;
    window.shMoveGuestToTable(fromT, fromS, tIdx);
    window.__SH_SELECTED_TABLE_IDX = tIdx; window.__SH_OPEN_GUEST = null;
    if (window.shFlashTable) window.shFlashTable(tIdx);
    shToast('\\u2713 Seated ' + other.name + ' with ' + g.name + ' at ' + dst.name); shRenderAll();
  };
  window.shFixKeepApart = function(i) { var r = window.__SH_STATE.rules[i]; if (!r || !r.pair) return; window.shSnapshot(); if (shSeparate(r)) shToast('Moved one of them to a different table.'); else shToast('No other table available.'); shRenderAll(); };
  window.shRemoveKeepApart = function(i) { window.shSnapshot(); window.__SH_STATE.rules.splice(i, 1); shRenderAll(); };
  window.shEdKeepApartHtml = function() {
    var plan = window.__SH_STATE, rules = (plan.rules || []), h = [], names = [];
    plan.tables.forEach(function(t) { t.guests.forEach(function(g) { names.push('<option value="' + shEsc(g.name) + '"></option>'); }); });
    h.push('<div class="sh-ed-ka"><div class="sh-ed-label">Keep apart</div>');
    var any = false;
    rules.forEach(function(r, i) {
      if (!r.pair) return; any = true; var st = shRuleState(r);
      h.push('<div class="sh-ed-ka-row"><span class="sh-ed-ka-names">' + shEsc(r.pair[0]) + ' &amp; ' + shEsc(r.pair[1]) + '</span>' + (st === 'same' ? '<span class="sh-ed-ka-st bad">Same table</span><button type="button" class="sh-ed-ka-btn" onclick="window.shFixKeepApart(' + i + ')">Separate</button>' : (st === 'missing' ? '<span class="sh-ed-ka-st">Not seated</span>' : '<span class="sh-ed-ka-st ok">Apart</span>')) + '<button type="button" class="sh-ed-ka-x" aria-label="Remove rule" onclick="window.shRemoveKeepApart(' + i + ')">&times;</button></div>');
    });
    if (!any) h.push('<div class="sh-ed-ka-empty">No one is set to sit apart. Add exes, divorced parents or feuding relatives.</div>');
    h.push('<div class="sh-ed-ka-form"><input id="sh-ka-a" list="sh-ka-names" placeholder="Guest 1" autocomplete="off" /><input id="sh-ka-b" list="sh-ka-names" placeholder="Guest 2" autocomplete="off" onkeydown="if(event.key===\\'Enter\\')window.shAddKeepApartForm()" /><button type="button" onclick="window.shAddKeepApartForm()">Add</button></div><datalist id="sh-ka-names">' + names.join('') + '</datalist></div>');
    return h.join('');
  };
  window.shEdGuestExtras = function(tIdx, sIdx) {
    var g = window.__SH_STATE.tables[tIdx].guests[sIdx], cur = window.shGroupOf(g), h = [], apartOpts = [], withOpts = [];
    h.push('<div class="sh-ed-label">Who is this?</div><div class="sh-ed-seg wrap">');
    SH_GROUPS.forEach(function(d, i) { h.push('<button type="button" class="' + (cur === d.key ? 'on' : '') + '" onclick="window.shEdSetGroup(' + tIdx + ',' + sIdx + ',' + i + ')"><span class="sh-gdot" style="background:' + d.color + ';"></span>' + shEsc(d.label) + '</button>'); });
    h.push('</div>');
    window.__SH_STATE.tables.forEach(function(t, ti) {
      t.guests.forEach(function(o, oi) {
        if (ti === tIdx && oi === sIdx) return;
        apartOpts.push('<option value="' + ti + ':' + oi + '">' + shEsc(o.name) + '</option>');
        if (ti !== tIdx) withOpts.push('<option value="' + ti + ':' + oi + '">' + shEsc(o.name + ' (' + t.name + ')') + '</option>');
      });
    });
    h.push('<div class="sh-ed-label">Seat at same table with</div><select id="sh-ed-seat-with" class="sh-ed-input" onchange="window.shSeatWithGuest(' + tIdx + ',' + sIdx + ',this.value)"><option value="">Bring another guest to this table...</option>' + withOpts.join('') + '</select>');
    h.push('<div class="sh-ed-label">Keep apart from</div><select class="sh-ed-input" onchange="window.shKeepApartFrom(' + tIdx + ',' + sIdx + ',this.value)"><option value="">Choose a guest to keep apart...</option>' + apartOpts.join('') + '</select>');
    return h.join('');
  };

  /* ---- Table style, rotation, mixed table types, non-destructive room scaling & empty-table cleanup ---- */
  window.shEdShape = function(tIdx, shape) { var t = window.__SH_STATE.tables[tIdx]; if (!t) return; window.shSnapshot(); t.shape = shape; shRecomputeGeometry(t); shRenderAll(); };
  window.shEdRotate = function(tIdx, delta) {
    var t = window.__SH_STATE.tables[tIdx]; if (!t) return; window.shSnapshot();
    if (shNormalizeShape(t.shape) === 'round') t.shape = 'banquet_2sided';
    t.rotation = (((t.rotation || 0) + delta) % 360 + 360) % 360; shRecomputeGeometry(t); shRenderAll();
  };
  window.shEdTableStyleHtml = function(tIdx) {
    var t = window.__SH_STATE.tables[tIdx], sh = shNormalizeShape(t.shape), h = ['<div class="sh-ed-style"><div class="sh-ed-seg">'];
    [['round', 'Round'], ['banquet_2sided', 'Banquet'], ['kings_4sided', 'King\\'s']].forEach(function(x) { h.push('<button type="button" class="' + (sh === x[0] ? 'on' : '') + '" onclick="window.shEdShape(' + tIdx + ',\\'' + x[0] + '\\')">' + x[1] + '</button>'); });
    h.push('</div><div class="sh-ed-rot"><button type="button" onclick="window.shEdRotate(' + tIdx + ',-45)" aria-label="Rotate left 45 degrees">&#8634; Rotate</button><button type="button" onclick="window.shEdRotate(' + tIdx + ',45)" aria-label="Rotate right 45 degrees">Rotate &#8635;</button></div></div>');
    return h.join('');
  };
  var SH_TABLE_KINDS = { round8: { shape: 'round', cap: 8, label: 'Round (8 seats)' }, round10: { shape: 'round', cap: 10, label: 'Round (10 seats)' }, banquet12: { shape: 'banquet_2sided', cap: 12, label: 'Long banquet (12 seats)' }, kings8: { shape: 'kings_4sided', cap: 8, label: 'King\\'s (8 seats)' } };
  function shCloseMenus(keepId) {
    ['sh-add-menu', 'sh-el-menu', 'sh-room-menu', 'sh-history-menu'].forEach(function(id) { if (id !== keepId) { var el = document.getElementById(id); if (el) el.style.display = 'none'; } });
  }
  window.shCloseMenus = shCloseMenus;
  window.shToggleHistoryMenu = function(ev) { if (ev) ev.stopPropagation(); shCloseMenus('sh-history-menu'); if (window.shSyncHistoryUi) window.shSyncHistoryUi(); var m = document.getElementById('sh-history-menu'); if (m) m.style.display = m.style.display === 'none' ? 'block' : 'none'; };
  window.shToggleAddMenu = function(ev) { if (ev) ev.stopPropagation(); shCloseMenus('sh-add-menu'); var m = document.getElementById('sh-add-menu'); if (m) m.style.display = m.style.display === 'none' ? 'block' : 'none'; };
  window.shToggleRoomMenu = function(ev) { if (ev) ev.stopPropagation(); shCloseMenus('sh-room-menu'); var m = document.getElementById('sh-room-menu'); if (m) m.style.display = m.style.display === 'none' ? 'block' : 'none'; };
  window.shAddTableType = function(kind) {
    var k = SH_TABLE_KINDS[kind] || SH_TABLE_KINDS.round8; shCloseMenus();
    window.shSnapshot(); window.shFindAndAddNonOverlappingTable({ shape: k.shape, capacity: k.cap });
  };
  function shReflowGuestTables() {
    var plan = window.__SH_STATE, guestTbls = plan.tables.slice(1);
    if (!guestTbls.length) return;
    var anyBanquet = guestTbls.some(function(t) { return shNormalizeShape(t.shape) === 'banquet_2sided'; });
    var maxCap = Math.max.apply(null, guestTbls.map(function(t) { return t.capacity || 8; }));
    var extentX = anyBanquet ? 160 : (maxCap >= 10 ? 108 : 100), extentY = anyBanquet ? 75 : extentX;
    var cols = anyBanquet ? [200, 560, 920] : (maxCap >= 10 ? [165, 425, 695, 955] : [130, 340, 560, 780, 990]);
    var stepY = anyBanquet ? 165 : extentY * 2 + 12, y = 230, pts = [], row = 0;
    while (pts.length < guestTbls.length) {
      cols.forEach(function(x) {
        if (pts.length >= guestTbls.length) return;
        if (row === 0 && x + extentX > 445 && x - extentX < 675) return;
        pts.push({ x: x, y: y });
      });
      row++; y += stepY;
    }
    guestTbls.forEach(function(t, i) { t.x = pts[i].x; t.y = pts[i].y; shRecomputeGeometry(t); });
    plan.roomHeight = Math.max(680, (pts.length ? pts[pts.length - 1].y : 230) + extentY + 35);
  }
  window.shSetAllTablesKind = function(kind) {
    var k = SH_TABLE_KINDS[kind] || SH_TABLE_KINDS.round8; shCloseMenus();
    if (!window.__SH_STATE || !window.__SH_STATE.tables) return;
    window.shSnapshot();
    window.__SH_STATE.tables.forEach(function(t, idx) {
      if (idx === 0 && shNormalizeShape(t.shape) === 'sweetheart') return;
      t.shape = k.shape;
      t.capacity = Math.max(k.cap, t.guests.length);
    });
    shReflowGuestTables();
    shToast('\\u2713 Updated all guest tables to ' + k.label + ' (all seated guests, meals & allergies kept).');
    shRenderAll();
  };
  window.shScaleRoomGuests = function(targetN) {
    shCloseMenus(); targetN = Number(targetN) || 100;
    var plan = window.__SH_STATE; if (!plan || !plan.tables) return;
    window.shSnapshot();
    var sampleTbl = plan.tables[1] || { shape: 'round', capacity: 8 };
    var per = Math.max(6, sampleTbl.capacity || 8), shape = sampleTbl.shape || 'round';
    var neededGuestTables = Math.max(1, Math.ceil(targetN / per));
    while (plan.tables.length - 1 < neededGuestTables) {
      var n = plan.tables.length + 1;
      plan.tables.push({ id: 'table-' + n, number: n, name: 'Table ' + n, shape: shape, capacity: per, x: 560, y: 400, rotation: 0, locked: false, guests: [] });
    }
    for (var i = plan.tables.length - 1; i >= 1 && plan.tables.length - 1 > neededGuestTables; i--) {
      if (!plan.tables[i].guests || plan.tables[i].guests.length === 0) plan.tables.splice(i, 1);
    }
    plan.tables.forEach(function(tb, idx) { tb.number = idx + 1; if (idx > 0 && /^Table \\d+$/i.test(tb.name)) tb.name = 'Table ' + (idx + 1); });
    plan.targetGuests = targetN;
    shReflowGuestTables();
    shSyncTableSelectAndPills();
    shToast('\\u2713 Scaled venue to ' + targetN + ' guests (' + (plan.tables.length - 1) + ' tables of ' + per + ') without losing any seated guests.');
    shRenderAll();
  };
  window.shPruneEmptyTables = function() {
    shCloseMenus();
    var plan = window.__SH_STATE; if (!plan || !plan.tables) return;
    window.shSnapshot();
    var before = plan.tables.length;
    plan.tables = plan.tables.filter(function(t, idx) { return idx === 0 || (t.guests && t.guests.length > 0) || shNormalizeShape(t.shape) === 'sweetheart'; });
    if (plan.tables.length < 2) plan.tables.push({ id: 'table-2', number: 2, name: 'Table 2', shape: 'round', capacity: 8, x: 340, y: 230, rotation: 0, locked: false, guests: [] });
    plan.tables.forEach(function(tb, idx) { tb.number = idx + 1; if (idx > 0 && /^Table \\d+$/i.test(tb.name)) tb.name = 'Table ' + (idx + 1); });
    shReflowGuestTables();
    window.__SH_SELECTED_TABLE_IDX = Math.min(window.__SH_SELECTED_TABLE_IDX || 1, plan.tables.length - 1);
    shSyncTableSelectAndPills();
    var removed = before - plan.tables.length;
    shToast(removed > 0 ? ('\\u2713 Removed ' + removed + ' empty table' + (removed === 1 ? '' : 's') + ' and re-numbered room.') : 'All tables currently have seated guests.');
    shRenderAll();
  };

  /* ---- Magnetic 20px Architectural Grid Snap & Smart Peer-Table Alignment Guides ---- */
  window.__SH_SNAP_GRID = true;
  window.__SH_ALIGN_GUIDES = null;
  window.shToggleSnapGrid = function(ev) {
    if (ev) ev.stopPropagation();
    window.__SH_SNAP_GRID = !window.__SH_SNAP_GRID;
    var btn = document.getElementById('sh-toolbar-snap-btn');
    if (btn) {
      btn.innerHTML = window.__SH_SNAP_GRID ? '&#8862; Snap: ON' : '&#8862; Snap: OFF';
      btn.style.background = window.__SH_SNAP_GRID ? '#FAF3E3' : '';
      btn.style.borderColor = window.__SH_SNAP_GRID ? '#C8A96E' : '';
      btn.style.color = window.__SH_SNAP_GRID ? '#78350F' : '';
    }
    shToast(window.__SH_SNAP_GRID ? '\\u229e Magnetic Grid Snap ON (20px grid + row/column alignment guides · hold Shift for freeform)' : 'Magnetic Grid Snap OFF (freeform table movement)');
  };
  window.shSnapTablePos = function(tIdx, rawX, rawY, disableSnap) {
    if (window.__SH_SNAP_GRID === false || disableSnap) {
      window.__SH_ALIGN_GUIDES = null;
      return { x: Math.round(rawX), y: Math.round(rawY) };
    }
    var tables = (window.__SH_STATE && window.__SH_STATE.tables) || [];
    var bestX = null, bestDx = 13, bestY = null, bestDy = 13;
    if (Math.abs(rawX - 560) < bestDx) { bestDx = Math.abs(rawX - 560); bestX = 560; }
    tables.forEach(function(ot, idx) {
      if (idx === tIdx) return;
      var dx = Math.abs(rawX - (ot.x || 0)), dy = Math.abs(rawY - (ot.y || 0));
      if (dx < bestDx) { bestDx = dx; bestX = ot.x; }
      if (dy < bestDy) { bestDy = dy; bestY = ot.y; }
    });
    var snappedX = bestX != null ? bestX : Math.round(rawX / 20) * 20;
    var snappedY = bestY != null ? bestY : Math.round(rawY / 20) * 20;
    snappedX = Math.max(100, Math.min(1020, snappedX));
    snappedY = Math.max(80, Math.min((window.__SH_STATE.roomHeight || 680) - 80, snappedY));
    window.__SH_ALIGN_GUIDES = { gx: bestX, gy: bestY, tx: snappedX, ty: snappedY };
    return { x: snappedX, y: snappedY };
  };
  window.shSnapLandmarkPos = function(lmIdx, rawX, rawY, disableSnap) {
    if (window.__SH_SNAP_GRID === false || disableSnap) {
      window.__SH_ALIGN_GUIDES = null;
      return { x: Math.round(rawX), y: Math.round(rawY) };
    }
    var gx = Math.abs(rawX - 560) <= 14 ? 560 : null;
    var sx = gx != null ? gx : Math.round(rawX / 20) * 20;
    var sy = Math.round(rawY / 20) * 20;
    window.__SH_ALIGN_GUIDES = { gx: gx, gy: null, tx: sx, ty: sy };
    return { x: sx, y: sy };
  };
  window.shAlignAllTablesToGrid = function() {
    shCloseMenus();
    var plan = window.__SH_STATE; if (!plan || !plan.tables) return;
    window.shSnapshot();
    var rowAnchors = [], colAnchors = [560];
    plan.tables.forEach(function(t, idx) {
      var gx = Math.round((t.x || 250) / 20) * 20;
      var gy = Math.round((t.y || 200) / 20) * 20;
      for (var ci = 0; ci < colAnchors.length; ci++) {
        if (Math.abs(gx - colAnchors[ci]) <= 24) { gx = colAnchors[ci]; break; }
      }
      if (colAnchors.indexOf(gx) === -1) colAnchors.push(gx);
      for (var ri = 0; ri < rowAnchors.length; ri++) {
        if (Math.abs(gy - rowAnchors[ri]) <= 24) { gy = rowAnchors[ri]; break; }
      }
      if (rowAnchors.indexOf(gy) === -1) rowAnchors.push(gy);
      t.x = Math.max(100, Math.min(1020, gx));
      t.y = Math.max(80, Math.min((plan.roomHeight || 680) - 80, gy));
      shRecomputeGeometry(t);
    });
    (plan.landmarks || []).forEach(function(lm) {
      lm.x = Math.abs((lm.x || 560) - 560) <= 24 ? 560 : Math.round((lm.x || 560) / 20) * 20;
      lm.y = Math.round((lm.y || 300) / 20) * 20;
    });
    shToast('\\u2713 Snapped & aligned all ' + plan.tables.length + ' tables and room elements to the 20px architectural grid!');
    shRenderAll();
  };

  /* ---- Smooth Mouse-Wheel Zoom, Right-Click Drag Panning & Toolbar Zoom Controls ---- */
  window.__SH_ZOOM_SCALE = 1;
  window.__SH_PAN_VIEW = null;
  window.shComputeCanvasViewBox = function(plan, selTbl, roomH) {
    var zMode = window.__SH_CANVAS_ZOOM || 'room';
    var scale = Number(window.__SH_ZOOM_SCALE) || (zMode === 'table' ? 2.4 : (zMode === 'zoom15' ? 1.5 : 1));
    var vw = scale <= 1.01 ? 1120 : Math.max(320, Math.min(1120, Math.round(1120 / scale)));
    var vh = scale <= 1.01 ? roomH : Math.max(210, Math.min(roomH, Math.round(roomH / scale)));
    if (window.__SH_PAN_VIEW) {
      var pvx = Math.max(-320, Math.min(1120 - vw + 320, Math.round(window.__SH_PAN_VIEW.vx)));
      var pvy = Math.max(-240, Math.min(roomH - vh + 240, Math.round(window.__SH_PAN_VIEW.vy)));
      return pvx + ' ' + pvy + ' ' + vw + ' ' + vh;
    }
    if (scale <= 1.01) return '0 0 1120 ' + roomH;
    var cx = 560, cy = Math.round(roomH / 2);
    if (window.__SH_SELECTED_LANDMARK_IDX != null && plan.landmarks && plan.landmarks[window.__SH_SELECTED_LANDMARK_IDX]) {
      var lm = plan.landmarks[window.__SH_SELECTED_LANDMARK_IDX];
      cx = lm.x || 560; cy = lm.y || cy;
    } else if (selTbl) {
      cx = selTbl.x || 560; cy = selTbl.y || cy;
    }
    var vx = Math.max(0, Math.min(1120 - vw, Math.round(cx - vw / 2)));
    var vy = Math.max(0, Math.min(roomH - vh, Math.round(cy - vh / 2)));
    return vx + ' ' + vy + ' ' + vw + ' ' + vh;
  };
  window.shStepCanvasZoom = function(delta) {
    var cur = Number(window.__SH_ZOOM_SCALE) || 1;
    var next = Math.max(1, Math.min(3, Math.round((cur + Number(delta || 0)) * 20) / 20));
    var plan = window.__SH_STATE || {};
    var roomH = Math.max(680, Number(plan.roomHeight) || 680);
    if (next <= 1.01) {
      window.__SH_PAN_VIEW = null;
    } else if (window.__SH_PAN_VIEW) {
      var oldW = cur <= 1.01 ? 1120 : Math.max(320, Math.min(1120, Math.round(1120 / cur)));
      var oldH = cur <= 1.01 ? roomH : Math.max(210, Math.min(roomH, Math.round(roomH / cur)));
      var newW = Math.max(320, Math.min(1120, Math.round(1120 / next)));
      var newH = Math.max(210, Math.min(roomH, Math.round(roomH / next)));
      var midX = window.__SH_PAN_VIEW.vx + oldW / 2, midY = window.__SH_PAN_VIEW.vy + oldH / 2;
      window.__SH_PAN_VIEW = { vx: Math.round(midX - newW / 2), vy: Math.round(midY - newH / 2) };
    }
    window.__SH_ZOOM_SCALE = next;
    window.__SH_CANVAS_ZOOM = next <= 1.01 ? 'room' : (next >= 2.1 ? 'table' : 'zoom15');
    var pctBtn = document.getElementById('sh-zoom-pct-btn');
    if (pctBtn) {
      pctBtn.textContent = Math.round(next * 100) + '%';
      pctBtn.style.color = next > 1.01 ? '#8C2D19' : '';
    }
    var selName = 'Room';
    if (window.__SH_SELECTED_LANDMARK_IDX != null && plan.landmarks && plan.landmarks[window.__SH_SELECTED_LANDMARK_IDX]) {
      selName = plan.landmarks[window.__SH_SELECTED_LANDMARK_IDX].label || 'Room Element';
    } else if (plan.tables && plan.tables[window.__SH_SELECTED_TABLE_IDX || 0]) {
      selName = shEdTableLabel(plan.tables[window.__SH_SELECTED_TABLE_IDX || 0]);
    }
    shRenderFloorplanSvg();
    shToast(next <= 1.01 ? '🗺️ Full Room Floorplan (100%)' : ('🔍 Zoom: ' + Math.round(next * 100) + '% · Right-click & drag to pan around the room'));
  };
  window.shResetCanvasZoom = function() {
    window.__SH_ZOOM_SCALE = 1;
    window.__SH_CANVAS_ZOOM = 'room';
    window.__SH_PAN_VIEW = null;
    var pctBtn = document.getElementById('sh-zoom-pct-btn');
    if (pctBtn) { pctBtn.textContent = '100%'; pctBtn.style.color = ''; }
    shRenderFloorplanSvg();
    shToast('🗺️ Reset zoom & pan to 100% Full Room View');
  };
  document.addEventListener('wheel', function(ev) {
    var svg = document.getElementById('sh-floorplan-svg');
    if (!svg || !ev.target || !(ev.target === svg || svg.contains(ev.target))) return;
    if (ev.cancelable) ev.preventDefault();
    ev.stopPropagation();
    var step = ev.deltaY < 0 ? 0.2 : -0.2;
    window.shStepCanvasZoom(step);
  }, { passive: false });
  document.addEventListener('contextmenu', function(ev) {
    var svg = document.getElementById('sh-floorplan-svg');
    if (svg && ev.target && (ev.target === svg || svg.contains(ev.target))) {
      ev.preventDefault();
    }
  });
  document.addEventListener('mousedown', function(ev) {
    if (!ev || (ev.button !== 2 && ev.button !== 1)) return;
    var svg = document.getElementById('sh-floorplan-svg');
    if (!svg || !ev.target || !(ev.target === svg || svg.contains(ev.target))) return;
    if (ev.cancelable) ev.preventDefault();
    ev.stopPropagation();
    var vbParts = String(svg.getAttribute('viewBox') || '0 0 1120 680').trim().split(/\\s+/).map(Number);
    var vx0 = vbParts[0] || 0, vy0 = vbParts[1] || 0, vw0 = vbParts[2] || 1120, vh0 = vbParts[3] || 680;
    var startX = ev.clientX || 0, startY = ev.clientY || 0;
    var rect = svg.getBoundingClientRect();
    var rW = Math.max(100, rect.width || 800), rH = Math.max(100, rect.height || 500);
    var roomH = Math.max(680, Number((window.__SH_STATE && window.__SH_STATE.roomHeight) || 680));
    var moved = false;
    svg.style.cursor = 'grabbing';
    var onMove = function(mv) {
      var dx = (mv.clientX || 0) - startX, dy = (mv.clientY || 0) - startY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
      if (!moved) return;
      if (mv.cancelable) mv.preventDefault();
      var nextVx = Math.round(vx0 - dx * (vw0 / rW));
      var nextVy = Math.round(vy0 - dy * (vh0 / rH));
      var minX = vw0 >= 1120 ? -300 : 0, maxX = vw0 >= 1120 ? 300 : (1120 - vw0);
      var minY = vh0 >= roomH ? -220 : 0, maxY = vh0 >= roomH ? 220 : (roomH - vh0);
      nextVx = Math.max(minX, Math.min(maxX, nextVx));
      nextVy = Math.max(minY, Math.min(maxY, nextVy));
      window.__SH_PAN_VIEW = { vx: nextVx, vy: nextVy };
      svg.setAttribute('viewBox', nextVx + ' ' + nextVy + ' ' + vw0 + ' ' + vh0);
    };
    var onUp = function() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      svg.style.cursor = '';
      if (moved) {
        shToast('✋ Panned floorplan view · Right-click & drag to move around (click % in toolbar to recenter)');
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, true);
  document.addEventListener('click', function() { shCloseMenus(); });

  /* ---- Snap-to-table drag & Visual SVG Conflict Halos ---- */
  function shTableBox(t) {
    if (!t.geometry) shRecomputeGeometry(t);
    var xs = t.geometry.seats.map(function(s) { return s.x; }), ys = t.geometry.seats.map(function(s) { return s.y; });
    var pad = 30; return { l: Math.min.apply(null, xs) - pad, r: Math.max.apply(null, xs) + pad, t: Math.min.apply(null, ys) - pad, b: Math.max.apply(null, ys) + pad, cx: t.x, cy: t.y };
  }
  function shTableAt(pt, skip) {
    var best = -1, bd = 1e9;
    (window.__SH_STATE.tables || []).forEach(function(t, i) {
      var b = shTableBox(t); if (pt.x < b.l || pt.x > b.r || pt.y < b.t || pt.y > b.b) return;
      var d = Math.hypot(pt.x - b.cx, pt.y - b.cy); if (d < bd) { bd = d; best = i; }
    });
    return best;
  }
  window.shDropHalo = function(plan) {
    var out = [], cMap = shConflictTables(), drewRuleLine = false;
    ((plan && plan.rules) || []).forEach(function(r) {
      if (!r.pair || drewRuleLine) return;
      var A = shFindGuests(r.pair[0]), B = shFindGuests(r.pair[1]);
      if (!A.length || !B.length || A[0].t === B[0].t) return;
      var tA = plan.tables[A[0].t], tB = plan.tables[B[0].t];
      if (!tA || !tB) return;
      drewRuleLine = true;
      var dist = Math.hypot(tA.x - tB.x, tA.y - tB.y), close = dist < 225;
      var mx = Math.round((tA.x + tB.x) / 2), my = Math.round((tA.y + tB.y) / 2) - 22;
      var col = close ? '#B45309' : '#065F46', bg = close ? '#FFFBEB' : '#ECFDF5';
      var lbl = close ? ('\u26A0 Close Sightline: ' + r.pair[0].split(' ')[0] + ' & ' + r.pair[1].split(' ')[0]) : ('\u2713 Separated (' + Math.max(18, Math.round(dist / 11)) + ' ft Buffer)');
      out.push('<g class="sh-peace-line" pointer-events="none"><line x1="' + tA.x + '" y1="' + tA.y + '" x2="' + tB.x + '" y2="' + tB.y + '" stroke="' + col + '" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.72"/><rect x="' + (mx - 108) + '" y="' + (my - 12) + '" width="216" height="24" rx="12" fill="' + bg + '" stroke="' + col + '" stroke-width="1"/><text x="' + mx + '" y="' + (my + 4) + '" text-anchor="middle" fill="' + col + '" font-size="10.2" font-weight="800">' + shEsc(lbl) + '</text></g>');
    });
    if (!drewRuleLine) {
      var p1 = plan.tables && plan.tables[1], p2 = plan.tables && plan.tables[Math.min(4, plan.tables.length - 1)];
      if (p1 && p2 && p1 !== p2 && !cMap[1] && !cMap[4] && (p1.guests || []).length > 0) {
        var mx0 = Math.round((p1.x + p2.x) / 2), my0 = Math.round((p1.y + p2.y) / 2) - 22;
        out.push('<g class="sh-peace-line" pointer-events="none"><line x1="' + p1.x + '" y1="' + p1.y + '" x2="' + p2.x + '" y2="' + p2.y + '" stroke="#065F46" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.72"/><rect x="' + (mx0 - 104) + '" y="' + (my0 - 12) + '" width="208" height="24" rx="12" fill="#ECFDF5" stroke="#065F46" stroke-width="1"/><text x="' + mx0 + '" y="' + (my0 + 4) + '" text-anchor="middle" fill="#065F46" font-size="10.2" font-weight="800">&#10003; Separated Across Dance Floor</text></g>');
      }
    }
    Object.keys(cMap).forEach(function(k) {
      var ti = Number(k), tb = plan.tables[ti]; if (!tb) return;
      var cb = shTableBox(tb);
      out.push('<g class="sh-svg-conflict" pointer-events="none"><rect x="' + (cb.l + 4) + '" y="' + (cb.t + 4) + '" width="' + (cb.r - cb.l - 8) + '" height="' + (cb.b - cb.t - 8) + '" rx="26" fill="rgba(225,29,72,0.08)" stroke="#E11D48" stroke-width="2.8" stroke-dasharray="6 4"/><rect x="' + (tb.x - 76) + '" y="' + (cb.t - 10) + '" width="152" height="20" rx="10" fill="#E11D48"/><text x="' + tb.x + '" y="' + (cb.t + 4) + '" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="800">&#9888; Conflict: ' + shEsc(cMap[k]) + '</text></g>');
    });
    var idx = window.__SH_DROP_TABLE != null ? window.__SH_DROP_TABLE : window.__SH_FLASH_TABLE;
    if (idx != null && plan.tables[idx]) {
      var b = shTableBox(plan.tables[idx]);
      out.push('<rect x="' + (b.l + 6) + '" y="' + (b.t + 6) + '" width="' + (b.r - b.l - 12) + '" height="' + (b.b - b.t - 12) + '" rx="26" fill="rgba(232,199,125,0.26)" stroke="#B89352" stroke-width="2.6" pointer-events="none"/>');
    }
    var ag = window.__SH_ALIGN_GUIDES;
    if (ag) {
      var rH = Math.max(680, Number(plan.roomHeight) || 680);
      if (ag.gx != null) {
        out.push('<g class="sh-align-guide-x" pointer-events="none"><line x1="' + ag.gx + '" y1="20" x2="' + ag.gx + '" y2="' + (rH - 20) + '" stroke="#B89352" stroke-width="1.8" stroke-dasharray="6 4"/><rect x="' + (ag.gx - 54) + '" y="18" width="108" height="20" rx="10" fill="#FAF3E3" stroke="#B89352" stroke-width="1.2"/><text x="' + ag.gx + '" y="32" text-anchor="middle" fill="#78350F" font-size="9.5" font-weight="800">' + (ag.gx === 560 ? '&#8862; Center Axis' : ('&#8862; Col X: ' + ag.gx)) + '</text></g>');
      }
      if (ag.gy != null) {
        out.push('<g class="sh-align-guide-y" pointer-events="none"><line x1="20" y1="' + ag.gy + '" x2="1100" y2="' + ag.gy + '" stroke="#B89352" stroke-width="1.8" stroke-dasharray="6 4"/><rect x="24" y="' + (ag.gy - 10) + '" width="88" height="20" rx="10" fill="#FAF3E3" stroke="#B89352" stroke-width="1.2"/><text x="68" y="' + (ag.gy + 4) + '" text-anchor="middle" fill="#78350F" font-size="9.5" font-weight="800">&#8862; Row Y: ' + ag.gy + '</text></g>');
      }
    }
    return out.join('');
  };
  function shFlash(i) { window.__SH_FLASH_TABLE = i; shRenderFloorplanSvg(); setTimeout(function() { window.__SH_FLASH_TABLE = null; shRenderFloorplanSvg(); }, 900); }
  window.shFlashTable = shFlash;
  window.shStartSeatDrag = function(tIdx, sIdx, ev) {
    if (ev && ev.button && ev.button !== 0) return;
    if (ev) { ev.stopPropagation(); if (ev.type === 'mousedown' && ev.preventDefault) ev.preventDefault(); }
    var plan = window.__SH_STATE, tbl = plan && plan.tables && plan.tables[tIdx]; if (!tbl) return;
    window.__SH_SELECTED_LANDMARK_IDX = null;
    var guest = tbl.guests && tbl.guests[sIdx];
    if (!guest || (window.__SH_WIZARD_STEP || 1) < 4) { window.shSeatClick(tIdx, sIdx, ev); return; }
    if (window.__SH_SANDBOX_MOM && tIdx >= 3 && !tbl.isUserAdded) { shToast('Family Share Mode: only tables 1-3 are editable.'); return; }
    var startPt = shSvgCoord(ev), moved = false;
    var onMove = function(mv) {
      var cur = shSvgCoord(mv);
      if (Math.hypot(cur.x - startPt.x, cur.y - startPt.y) > 6) moved = true;
      if (!moved) return;
      if (mv.cancelable) mv.preventDefault();
      window.__SH_DRAG_STATE = { tableIdx: tIdx, seatIdx: sIdx, x: cur.x, y: cur.y, label: String(guest.name || '').split(' ')[0] };
      var over = shTableAt(cur); window.__SH_DROP_TABLE = (over !== -1 && over !== tIdx) ? over : null;
      shRenderFloorplanSvg();
    };
    var onUp = function(up) {
      window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onUp);
      window.__SH_DRAG_STATE = null; window.__SH_DROP_TABLE = null;
      if (!moved) { window.shSeatClick(tIdx, sIdx, up); return; }
      var drop = shSvgCoord(up), seatHit = null, sd = 24;
      plan.tables.forEach(function(t, ti) { if (!t.geometry) shRecomputeGeometry(t); t.geometry.seats.forEach(function(s, si) { var d = Math.hypot(drop.x - s.x, drop.y - s.y); if (d < sd && !(ti === tIdx && si === sIdx)) { sd = d; seatHit = { t: ti, s: si }; } }); });
      if (seatHit && plan.tables[seatHit.t].guests[seatHit.s]) { window.shSnapshot(); window.__SH_SWAP_SOURCE = { tableIdx: tIdx, seatIdx: sIdx }; window.shSeatClick(seatHit.t, seatHit.s, up); window.__SH_SWAP_SOURCE = null; shFlash(seatHit.t); return; }
      var target = seatHit ? seatHit.t : shTableAt(drop);
      if (target === -1 || target === tIdx) { shToast('Snapped back. Drop on a table to move ' + guest.name + '.'); shRenderAll(); return; }
      var dst = plan.tables[target], wasFull = dst.guests.length >= (dst.capacity || 0);
      var nm = guest.name; window.shMoveGuestToTable(tIdx, sIdx, target); window.__SH_SWAP_SOURCE = null; window.__SH_OPEN_GUEST = null;
      window.__SH_SELECTED_TABLE_IDX = target; shToast(nm + ' moved to ' + shEdTableLabel(dst) + (wasFull ? ' (+1 chair added)' : '') + '. Tap Undo to reverse.'); shFlash(target); shRenderAll();
    };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false }); window.addEventListener('touchend', onUp);
  };`;
}

module.exports = { renderSeatGroupsClientScript };

/**
 * SeatHarmony - Guest groups (colour coding), keep-apart rules after setup, snap-to-table drag,
 * table style / rotation and mixed table types. Hooks into the simple seat editor (seat-editor.js).
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

  /* ---- Keep apart (works after setup, auto-separates) ---- */
  function shFindGuests(q) {
    q = String(q || '').trim().toLowerCase(); var out = []; if (!q) return out;
    (window.__SH_STATE.tables || []).forEach(function(t, ti) { t.guests.forEach(function(g, gi) { var n = String(g.name || '').toLowerCase(); if (n === q || n.indexOf(q) !== -1) out.push({ t: ti, g: gi, exact: n === q }); }); });
    var ex = out.filter(function(x) { return x.exact; }); return ex.length ? ex : out;
  }
  function shRuleState(r) {
    if (!r.pair) return null;
    var A = shFindGuests(r.pair[0]), B = shFindGuests(r.pair[1]);
    if (!A.length || !B.length) return 'missing';
    for (var i = 0; i < A.length; i++) for (var j = 0; j < B.length; j++) if (A[i].t === B[j].t && !(A[i].t === B[j].t && A[i].g === B[j].g)) return 'same';
    return 'apart';
  }
  function shSeparate(r) {
    var A = shFindGuests(r.pair[0]), B = shFindGuests(r.pair[1]), src = null, mv = null;
    for (var i = 0; i < A.length && !mv; i++) for (var j = 0; j < B.length; j++) if (A[i].t === B[j].t) { src = A[i]; mv = B[j]; break; }
    if (!mv) return false;
    var tables = window.__SH_STATE.tables, ref = tables[src.t], best = -1, bd = -1;
    tables.forEach(function(t, i) { if (i === 0 || i === src.t || t.guests.length >= (t.capacity || 0)) return; var d = Math.hypot(t.x - ref.x, t.y - ref.y); if (d > bd) { bd = d; best = i; } });
    if (best === -1) return false;
    window.shMoveGuestToTable(mv.t, mv.g, best); window.__SH_SWAP_SOURCE = null; window.__SH_OPEN_GUEST = null; return true;
  }
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
  window.shFixKeepApart = function(i) { var r = window.__SH_STATE.rules[i]; if (!r || !r.pair) return; window.shSnapshot(); if (shSeparate(r)) shToast('Moved one of them to a different table.'); else shToast('No table with a free seat is available. Add a table or a chair first.'); shRenderAll(); };
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
    h.push('<div class="sh-ed-ka-form"><input id="sh-ka-a" list="sh-ka-names" placeholder="First guest" autocomplete="off" /><input id="sh-ka-b" list="sh-ka-names" placeholder="Second guest" autocomplete="off" onkeydown="if(event.key===\\'Enter\\')window.shAddKeepApartForm()" /><button type="button" onclick="window.shAddKeepApartForm()">Add</button></div><datalist id="sh-ka-names">' + names.join('') + '</datalist></div>');
    return h.join('');
  };
  window.shEdGuestExtras = function(tIdx, sIdx) {
    var g = window.__SH_STATE.tables[tIdx].guests[sIdx], cur = window.shGroupOf(g), h = [], opts = [];
    h.push('<div class="sh-ed-label">Who is this?</div><div class="sh-ed-seg wrap">');
    SH_GROUPS.forEach(function(d, i) { h.push('<button type="button" class="' + (cur === d.key ? 'on' : '') + '" onclick="window.shEdSetGroup(' + tIdx + ',' + sIdx + ',' + i + ')"><span class="sh-gdot" style="background:' + d.color + ';"></span>' + shEsc(d.label) + '</button>'); });
    h.push('</div>');
    window.__SH_STATE.tables.forEach(function(t, ti) { t.guests.forEach(function(o, oi) { if (ti === tIdx && oi === sIdx) return; opts.push('<option value="' + ti + ':' + oi + '">' + shEsc(o.name) + '</option>'); }); });
    h.push('<div class="sh-ed-label">Keep apart from</div><select class="sh-ed-input" onchange="window.shKeepApartFrom(' + tIdx + ',' + sIdx + ',this.value)"><option value="">Choose a guest</option>' + opts.join('') + '</select>');
    return h.join('');
  };

  /* ---- Table style, rotation, and mixed table types ---- */
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
  var SH_TABLE_KINDS = { round8: { shape: 'round', cap: 8 }, round10: { shape: 'round', cap: 10 }, banquet12: { shape: 'banquet_2sided', cap: 12 }, kings8: { shape: 'kings_4sided', cap: 8 } };
  window.shToggleAddMenu = function(ev) { if (ev) ev.stopPropagation(); var m = document.getElementById('sh-add-menu'); if (m) m.style.display = m.style.display === 'none' ? 'block' : 'none'; };
  window.shAddTableType = function(kind) {
    var k = SH_TABLE_KINDS[kind] || SH_TABLE_KINDS.round8, m = document.getElementById('sh-add-menu'); if (m) m.style.display = 'none';
    window.shSnapshot(); window.shFindAndAddNonOverlappingTable({ shape: k.shape, capacity: k.cap });
  };
  document.addEventListener('click', function() { var m = document.getElementById('sh-add-menu'); if (m) m.style.display = 'none'; });

  /* ---- Snap-to-table drag: drop a guest anywhere on a table and they take the next open seat ---- */
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
    var idx = window.__SH_DROP_TABLE != null ? window.__SH_DROP_TABLE : window.__SH_FLASH_TABLE; if (idx == null || !plan.tables[idx]) return '';
    var b = shTableBox(plan.tables[idx]), full = plan.tables[idx].guests.length >= (plan.tables[idx].capacity || 0) && window.__SH_DROP_TABLE != null;
    return '<rect x="' + (b.l + 6) + '" y="' + (b.t + 6) + '" width="' + (b.r - b.l - 12) + '" height="' + (b.b - b.t - 12) + '" rx="26" fill="' + (full ? 'rgba(159,18,57,0.08)' : 'rgba(232,199,125,0.26)') + '" stroke="' + (full ? '#9F1239' : '#B89352') + '" stroke-width="2.6" pointer-events="none"/>';
  };
  function shFlash(i) { window.__SH_FLASH_TABLE = i; shRenderFloorplanSvg(); setTimeout(function() { window.__SH_FLASH_TABLE = null; shRenderFloorplanSvg(); }, 900); }
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
      var dst = plan.tables[target];
      if (dst.guests.length >= (dst.capacity || 0)) { shToast(shEdTableLabel(dst) + ' is full. Add a chair or pick another table.'); shRenderAll(); return; }
      var nm = guest.name; window.shMoveGuestToTable(tIdx, sIdx, target); window.__SH_SWAP_SOURCE = null; window.__SH_OPEN_GUEST = null;
      window.__SH_SELECTED_TABLE_IDX = target; shToast(nm + ' moved to ' + shEdTableLabel(dst) + '. Tap Undo to reverse.'); shFlash(target); shRenderAll();
    };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false }); window.addEventListener('touchend', onUp);
  };`;
}

module.exports = { renderSeatGroupsClientScript };

/**
 * SeatHarmony - Simple Seat Editor (Iterations 1-5 Karpathy Usability Sweet Spot).
 * Global guest finder with Enter-jump & Clear, open-seat table strip, live table meal/allergy tally,
 * 1-click meal pill cycle, 1-click move to full table (+1 chair), 1-click move couple together,
 * post-setup bulk late-RSVP paste, custom allergy input, 1-click seat swap, and occupied-table consolidation.
 * Every change is undoable.
 */

function renderSeatEditorClientScript() {
  return `
  window.__SH_OPEN_GUEST = null; window.__SH_UNDO = []; window.__SH_FIND_Q = ''; window.__SH_BULK_OPEN = false;
  var SH_ED_MEALS = [
    ['Filet Mignon', 'Beef'], ['Roasted Chicken', 'Chicken'], ['Pan-Seared Halibut', 'Fish'],
    ['Vegan Risotto', 'Vegan'], ['Wild Mushroom Tart', 'Vegetarian'], ['Kids Chicken Tenders', 'Kids']
  ];
  var SH_ED_NOTES = [
    ['none', 'None', '', ''],
    ['nut', 'Nut allergy', '🥜 SEVERE PEANUT ALLERGY', ''],
    ['gf', 'Gluten-free', '🌾 SEVERE CELIAC (GF)', ''],
    ['df', 'Dairy-free', '🥛 DAIRY-FREE', ''],
    ['shell', 'Shellfish', '🦐 SHELLFISH ALLERGY', ''],
    ['wheel', 'Wheelchair', '', '♿ REMOVE CHAIR FOR WHEELCHAIR'],
    ['high', 'Highchair', '', '👶 ADD HIGHCHAIR']
  ];
  function shEdNoteKey(g) {
    var a = String(g.allergy || ''), al = a.toLowerCase(), c = String(g.accessibility || '');
    if (a.indexOf('PEANUT') !== -1 || al.indexOf('nut') !== -1) return 'nut';
    if (/CELIAC|GLUTEN|\\bGF\\b/i.test(a)) return 'gf';
    if (al.indexOf('dairy') !== -1 || al.indexOf('lactose') !== -1) return 'df';
    if (al.indexOf('shellfish') !== -1 || al.indexOf('shrimp') !== -1) return 'shell';
    if (a) return 'other';
    if (c.indexOf('WHEELCHAIR') !== -1) return 'wheel';
    if (c) return 'high';
    return 'none';
  }
  function shEdMealShort(meal) {
    var m = String(meal || '').toLowerCase();
    if (m.indexOf('chicken') !== -1 && m.indexOf('kid') === -1) return 'Chicken';
    if (m.indexOf('halibut') !== -1 || m.indexOf('fish') !== -1 || m.indexOf('salmon') !== -1) return 'Fish';
    if (m.indexOf('vegan') !== -1 || m.indexOf('risotto') !== -1) return 'Vegan';
    if (m.indexOf('vegetarian') !== -1 || m.indexOf('mushroom') !== -1) return 'Vegetarian';
    if (m.indexOf('kid') !== -1) return 'Kids';
    return 'Beef';
  }
  function shEdTableLabel(t) { return shNormalizeShape(t.shape) === 'sweetheart' ? 'Sweetheart' : ('Table ' + t.number); }
  function shMakeInitials(name) { var w = String(name || '').replace(/^(Dr|Mr|Mrs|Ms|Prof)\\.?\\s+/i, '').trim().split(/\\s+/); return ((w[0] ? w[0][0] : 'G') + (w.length > 1 && w[w.length - 1] ? w[w.length - 1][0] : '')).toUpperCase(); }
  function shSurname(name) { var w = String(name || '').replace(/\\([^)]*\\)/g, '').replace(/^(Dr|Mr|Mrs|Ms|Prof)\\.?\\s+/i, '').trim().split(/\\s+/); return w.length >= 2 ? w[w.length - 1].toLowerCase() : ''; }
  function shFindPartnerIdx(t, sIdx) {
    var g = t && t.guests && t.guests[sIdx]; if (!g) return -1;
    for (var i = 0; i < t.guests.length; i++) {
      if (i === sIdx) continue;
      if (g.hhId && t.guests[i].hhId === g.hhId) return i;
    }
    var sn = shSurname(g.name);
    if (sn && sn.length > 2) {
      for (var j = 0; j < t.guests.length; j++) if (j !== sIdx && shSurname(t.guests[j].name) === sn) return j;
    }
    return -1;
  }

  /* ---- Undo ---- */
  function shEdState() { return JSON.stringify({ tables: window.__SH_STATE.tables, roomHeight: window.__SH_STATE.roomHeight, targetGuests: window.__SH_STATE.targetGuests, rules: window.__SH_STATE.rules, landmarks: window.__SH_STATE.landmarks }); }
  window.shSnapshot = function() {
    if (!window.__SH_STATE || window.__SH_SUPPRESS_RENDER) return;
    var snap = shEdState(), st = window.__SH_UNDO;
    if (st.length && st[st.length - 1] === snap) return;
    st.push(snap); if (st.length > 30) st.shift();
  };
  window.shUndo = function() {
    var st = window.__SH_UNDO, cur = shEdState();
    while (st.length && st[st.length - 1] === cur) st.pop();
    if (!st.length) return;
    var prev = JSON.parse(st.pop());
    window.__SH_STATE.tables = prev.tables; window.__SH_STATE.roomHeight = prev.roomHeight; if (prev.targetGuests) window.__SH_STATE.targetGuests = prev.targetGuests; if (prev.rules) window.__SH_STATE.rules = prev.rules; if (prev.landmarks) window.__SH_STATE.landmarks = prev.landmarks; window.__SH_SELECTED_LANDMARK_IDX = null;
    window.__SH_STATE.tables.forEach(function(t) { shRecomputeGeometry(t); });
    window.__SH_OPEN_GUEST = null; window.__SH_SWAP_SOURCE = null;
    window.__SH_SELECTED_TABLE_IDX = Math.min(window.__SH_SELECTED_TABLE_IDX || 0, window.__SH_STATE.tables.length - 1);
    shSyncTableSelectAndPills(); shToast('\\u21b6 Undone'); shRenderAll();
  };
  ['shMoveGuestToTable', 'shAddNewTable', 'shDeleteSelectedTable', 'shStartTableDrag', 'shChangeTableCapacity', 'shRemoveGuest', 'shQuickAddGuestToTable', 'shStartLandmarkDrag'].forEach(function(fn) {
    var orig = window[fn]; if (typeof orig !== 'function') return;
    window[fn] = function() { window.shSnapshot(); return orig.apply(this, arguments); };
  });

  /* ---- Global Guest Search, Enter-Jump & Clear ---- */
  function shEdFindHits(q) {
    q = String(q || '').trim().toLowerCase(); var hits = []; if (!q || !window.__SH_STATE) return hits;
    (window.__SH_STATE.tables || []).forEach(function(t, ti) {
      (t.guests || []).forEach(function(g, si) {
        if (String(g.name || '').toLowerCase().indexOf(q) !== -1 || String(t.name || '').toLowerCase().indexOf(q) !== -1) {
          hits.push({ ti: ti, si: si, name: g.name, tbl: shEdTableLabel(t), meal: shEdMealShort(g.meal), g: g });
        }
      });
    });
    return hits;
  }
  window.shEdFindInput = function(val) {
    window.__SH_FIND_Q = String(val || '');
    var box = document.getElementById('sh-ed-find-results'), clr = document.getElementById('sh-ed-find-clear');
    if (clr) clr.style.display = window.__SH_FIND_Q.trim() ? 'block' : 'none';
    if (!box) return;
    box.innerHTML = shEdFindResultsHtml(window.__SH_FIND_Q);
    box.style.display = window.__SH_FIND_Q.trim() ? 'block' : 'none';
  };
  window.shEdFindKey = function(ev) {
    if (!ev) return;
    if (ev.key === 'Escape') { ev.preventDefault(); window.shEdFindClear(); return; }
    if (ev.key === 'Enter') {
      ev.preventDefault();
      var hits = shEdFindHits(window.__SH_FIND_Q);
      if (hits.length) window.shEdJumpGuest(hits[0].ti, hits[0].si);
    }
  };
  window.shEdFindClear = function() {
    window.__SH_FIND_Q = '';
    var inp = document.getElementById('sh-ed-find-guest'), box = document.getElementById('sh-ed-find-results'), clr = document.getElementById('sh-ed-find-clear');
    if (inp) inp.value = ''; if (box) { box.innerHTML = ''; box.style.display = 'none'; } if (clr) clr.style.display = 'none';
  };
  function shEdFindResultsHtml(q) {
    var hits = shEdFindHits(q); if (!String(q || '').trim()) return '';
    if (!hits.length) return '<div class="sh-ed-find-empty">No guest matching &ldquo;' + shEsc(q) + '&rdquo;</div>';
    return hits.slice(0, 8).map(function(h) {
      return '<button type="button" class="sh-ed-find-item" onclick="window.shEdJumpGuest(' + h.ti + ',' + h.si + ')">' + (window.shGroupDot ? window.shGroupDot(h.g) : '') + '<span class="sh-ed-find-name">' + shEsc(h.name) + '</span><span class="sh-ed-tag">' + shEsc(h.tbl) + ' &middot; ' + h.meal + '</span></button>';
    }).join('');
  }
  window.shEdJumpGuest = function(tIdx, sIdx) {
    window.__SH_FIND_Q = ''; window.__SH_SELECTED_LANDMARK_IDX = null;
    window.__SH_SELECTED_TABLE_IDX = tIdx; window.__SH_OPEN_GUEST = { t: tIdx, s: sIdx };
    if (window.shFlashTable) window.shFlashTable(tIdx);
    shRenderAll();
  };

  /* ---- Seat click on the floorplan opens that guest in the panel ---- */
  window.shSeatPanelClick = function(tIdx, sIdx) {
    var t = window.__SH_STATE.tables[tIdx]; if (!t) return;
    window.__SH_SELECTED_TABLE_IDX = tIdx; window.__SH_SWAP_SOURCE = null;
    if (t.guests[sIdx]) window.__SH_OPEN_GUEST = (window.__SH_OPEN_GUEST && window.__SH_OPEN_GUEST.t === tIdx && window.__SH_OPEN_GUEST.s === sIdx) ? null : { t: tIdx, s: sIdx };
    else { window.__SH_OPEN_GUEST = null; setTimeout(function() { var i = document.getElementById('sh-ed-add'); if (i) i.focus(); }, 30); }
    shRenderAll();
  };

  /* ---- Panel actions ---- */
  window.shEdOpen = function(tIdx, sIdx) { window.shSeatPanelClick(tIdx, sIdx); };
  window.shEdMove = function(tIdx, sIdx, toIdx) {
    var g = window.__SH_STATE.tables[tIdx].guests[sIdx], dst = window.__SH_STATE.tables[toIdx]; if (!g || !dst) return;
    var wasFull = dst.guests.length >= (dst.capacity || 8);
    window.shMoveGuestToTable(tIdx, sIdx, toIdx);
    window.__SH_SWAP_SOURCE = null; window.__SH_OPEN_GUEST = null; window.__SH_SELECTED_TABLE_IDX = tIdx;
    shToast('\\u2713 Moved ' + g.name + ' to ' + shEdTableLabel(dst) + (wasFull ? ' (+1 chair added)' : '')); shRenderAll();
  };
  window.shEdMoveCouple = function(tIdx, sIdx, pIdx, toIdx) {
    var src = window.__SH_STATE.tables[tIdx], dst = window.__SH_STATE.tables[toIdx];
    if (!src || !dst || !src.guests[sIdx] || !src.guests[pIdx]) return;
    window.shSnapshot();
    var hi = Math.max(sIdx, pIdx), lo = Math.min(sIdx, pIdx);
    var g2 = src.guests.splice(hi, 1)[0], g1 = src.guests.splice(lo, 1)[0];
    dst.guests.push(g1, g2);
    dst.capacity = Math.max(dst.capacity || 8, dst.guests.length);
    shRecomputeGeometry(src); shRecomputeGeometry(dst);
    window.__SH_SWAP_SOURCE = null; window.__SH_OPEN_GUEST = null; window.__SH_SELECTED_TABLE_IDX = toIdx;
    if (window.shFlashTable) window.shFlashTable(toIdx);
    shToast('\\u2713 Moved ' + g1.name + ' & ' + g2.name + ' together to ' + shEdTableLabel(dst)); shRenderAll();
  };
  window.shEdSwapWith = function(tIdx, sIdx, val) {
    var p = String(val || '').split(':'); if (p.length !== 2) return;
    var oT = Number(p[0]), oS = Number(p[1]);
    var tA = window.__SH_STATE.tables[tIdx], tB = window.__SH_STATE.tables[oT];
    if (!tA || !tB || !tA.guests[sIdx] || !tB.guests[oS]) return;
    window.shSnapshot();
    var gA = tA.guests[sIdx], gB = tB.guests[oS];
    tA.guests[sIdx] = gB; tB.guests[oS] = gA;
    window.__SH_OPEN_GUEST = { t: tIdx, s: sIdx };
    shToast('\\u2713 Swapped ' + gA.name + ' \\u2194 ' + gB.name); shRenderAll();
  };
  window.shEdMeal = function(tIdx, sIdx, meal) { var g = window.__SH_STATE.tables[tIdx].guests[sIdx]; if (!g) return; window.shSnapshot(); g.meal = meal; shRenderAll(); };
  window.shEdCycleMeal = function(tIdx, sIdx, ev) {
    if (ev) { ev.stopPropagation(); if (ev.preventDefault) ev.preventDefault(); }
    var g = window.__SH_STATE.tables[tIdx] && window.__SH_STATE.tables[tIdx].guests[sIdx]; if (!g) return;
    var cur = shEdMealShort(g.meal), idx = 0;
    for (var i = 0; i < SH_ED_MEALS.length; i++) if (SH_ED_MEALS[i][1] === cur) { idx = (i + 1) % SH_ED_MEALS.length; break; }
    window.shSnapshot(); g.meal = SH_ED_MEALS[idx][0];
    shToast('\\u2713 ' + g.name + ': ' + SH_ED_MEALS[idx][1]); shRenderAll();
  };
  window.shEdNote = function(tIdx, sIdx, key) {
    var g = window.__SH_STATE.tables[tIdx].guests[sIdx], n = SH_ED_NOTES.filter(function(x) { return x[0] === key; })[0]; if (!g || !n) return;
    window.shSnapshot(); g.allergy = n[2]; g.accessibility = n[3]; shRenderAll();
  };
  window.shEdCustomAllergy = function(tIdx, sIdx, val) {
    var g = window.__SH_STATE.tables[tIdx] && window.__SH_STATE.tables[tIdx].guests[sIdx]; if (!g) return;
    window.shSnapshot(); g.allergy = String(val || '').trim();
    shToast(g.allergy ? '\\u2713 Saved dietary note for ' + g.name : 'Cleared dietary note'); shRenderAll();
  };
  window.shEdRename = function(tIdx, sIdx, v) { if (!String(v || '').trim()) return; window.shSnapshot(); window.shRenameGuest(tIdx, sIdx, v); };
  window.shEdRemove = function(tIdx, sIdx) {
    var g = window.__SH_STATE.tables[tIdx].guests[sIdx]; if (!g) return;
    window.shRemoveGuest(tIdx, sIdx); window.__SH_OPEN_GUEST = null;
    shToast('Removed ' + g.name + '. Tap Undo to bring them back.'); shRenderAll();
  };
  function shParseHouseholdLine(raw) {
    var line = String(raw || '').trim(); if (!line) return [];
    var kidsMatch = line.match(/\\+\\s*(\\d+)\\s*(?:kid|child)[a-z]*/i);
    var numKids = kidsMatch ? Number(kidsMatch[1]) : 0;
    var clean = line.replace(/\\+\\s*\\d+\\s*(?:kid|child)[a-z]*/i, '').trim();
    if (/^Dr\\.?\\s*&\\s*Mrs\\.?\\s+(.+)$/i.test(clean)) {
      var sn0 = clean.replace(/^Dr\\.?\\s*&\\s*Mrs\\.?\\s+/i, '').trim();
      clean = 'Dr. ' + sn0 + ' & Mrs. ' + sn0;
    } else if (/^The\\s+([A-Za-z-]+)\\s+Family$/i.test(clean)) {
      var fam = clean.replace(/^The\\s+|\\s+Family$/gi, '').trim();
      clean = fam + ' Parent 1 & ' + fam + ' Parent 2';
    }
    var parts = clean.split(/\\s*(?:&|\\band\\b|\\+|,)\\s*/i).map(function(s) { return s.trim(); }).filter(Boolean);
    var lastSurname = '';
    if (parts.length > 1) {
      var lw = parts[parts.length - 1].replace(/^(Dr|Mr|Mrs|Ms|Prof)\\.?\\s+/i, '').trim().split(/\\s+/);
      if (lw.length >= 2) lastSurname = lw[lw.length - 1];
    }
    var hhId = (parts.length > 1 || numKids > 0) ? ('hh_' + Date.now() + '_' + Math.floor(Math.random() * 999)) : '';
    var out = parts.map(function(p, i) {
      var nm = p;
      if (/^\\d*\\s*guest/i.test(nm) || nm === '1') nm = parts[0] + ' (Guest)';
      else if (i < parts.length - 1 && lastSurname && nm.replace(/^(Dr|Mr|Mrs|Ms|Prof)\\.?\\s+/i, '').trim().split(/\\s+/).length === 1) nm = nm + ' ' + lastSurname;
      return { name: nm, initials: shMakeInitials(nm), role: 'Guest', meal: 'Filet Mignon', allergy: '', accessibility: '', hhId: hhId };
    });
    for (var k = 1; k <= numKids; k++) {
      var kn = (lastSurname || parts[0] || 'Guest') + ' Kid ' + k;
      out.push({ name: kn, initials: shMakeInitials(kn), role: 'Child', meal: 'Kids Chicken Tenders', allergy: '', accessibility: '', hhId: hhId });
    }
    return out;
  }
  window.shEdAdd = function(tIdx) {
    var inp = document.getElementById('sh-ed-add'), tbl = window.__SH_STATE.tables[tIdx];
    if (!inp || !tbl || !inp.value.trim()) { if (inp) inp.focus(); return; }
    var people = shParseHouseholdLine(inp.value);
    if (people.length > 1) {
      window.shSnapshot();
      people.forEach(function(p) { tbl.guests.push(p); });
      tbl.capacity = Math.max(tbl.capacity || 8, tbl.guests.length);
      shRecomputeGeometry(tbl); inp.value = ''; window.__SH_SWAP_SOURCE = null;
      shToast('\\u2713 Seated ' + people.length + ' guests together at ' + shEdTableLabel(tbl)); shRenderAll();
    } else {
      window.shQuickAddGuestToTable(tIdx, 'sh-ed-add'); window.__SH_SWAP_SOURCE = null; shRenderAll();
    }
    setTimeout(function() { var i = document.getElementById('sh-ed-add'); if (i) i.focus(); }, 30);
  };
  window.shEdToggleBulk = function() { window.__SH_BULK_OPEN = !window.__SH_BULK_OPEN; shRenderSeatPanel(); };
  window.shEdBulkPaste = function() {
    var ta = document.getElementById('sh-ed-bulk-text'); if (!ta || !ta.value.trim()) return;
    var lines = ta.value.split(/\\r?\\n/).map(function(l) { return l.trim(); }).filter(Boolean);
    if (!lines.length) return;
    window.shSnapshot();
    var tables = window.__SH_STATE.tables, added = 0;
    lines.forEach(function(line) {
      var grp = shParseHouseholdLine(line); if (!grp.length) return;
      var dst = null;
      for (var i = 1; i < tables.length; i++) {
        if ((tables[i].capacity || 8) - tables[i].guests.length >= grp.length) { dst = tables[i]; break; }
      }
      if (!dst) {
        for (var j = 1; j < tables.length; j++) if ((tables[j].capacity || 8) - tables[j].guests.length > 0) { dst = tables[j]; break; }
      }
      if (!dst) {
        var n = tables.length + 1, sample = tables[1] || { shape: 'round', capacity: 8 };
        dst = { id: 'table-' + n, number: n, name: 'Table ' + n, shape: sample.shape, capacity: Math.max(sample.capacity || 8, grp.length), x: 560, y: 420, rotation: 0, locked: false, guests: [] };
        tables.push(dst);
      }
      grp.forEach(function(g) { dst.guests.push(g); added++; });
      dst.capacity = Math.max(dst.capacity || 8, dst.guests.length);
      shRecomputeGeometry(dst);
    });
    window.__SH_BULK_OPEN = false; shSyncTableSelectAndPills();
    shToast('\\u2713 Seated ' + added + ' late-RSVP guest' + (added === 1 ? '' : 's') + ' without changing your existing layout.');
    shRenderAll();
  };
  /* 1-click occupied table removal: auto-reseats guests to nearby tables */
  window.shEdRemoveTable = function(tIdx) {
    var tables = window.__SH_STATE.tables, t = tables[tIdx];
    if (!t || tables.length <= 2 || shNormalizeShape(t.shape) === 'sweetheart') return;
    window.shSnapshot();
    var orphans = (t.guests || []).slice(), tblName = shEdTableLabel(t);
    tables.splice(tIdx, 1);
    tables.forEach(function(tb, idx) { tb.number = idx + 1; if (idx > 0 && /^Table \\d+$/i.test(tb.name)) tb.name = 'Table ' + (idx + 1); });
    orphans.forEach(function(g) {
      var dst = null;
      for (var i = 1; i < tables.length; i++) if (tables[i].guests.length < (tables[i].capacity || 8)) { dst = tables[i]; break; }
      if (!dst) { dst = tables[1] || tables[0]; dst.capacity = Math.max(dst.capacity || 8, dst.guests.length + 1); }
      dst.guests.push(g);
    });
    tables.forEach(function(tb) { shRecomputeGeometry(tb); });
    window.__SH_SELECTED_TABLE_IDX = Math.min(tIdx, tables.length - 1); window.__SH_OPEN_GUEST = null;
    shSyncTableSelectAndPills();
    shToast(orphans.length ? 'Removed ' + tblName + ' and re-seated ' + orphans.length + ' guest' + (orphans.length === 1 ? '' : 's') + '. Tap Undo to reverse.' : 'Removed ' + tblName + '. Tap Undo to reverse.');
    shRenderAll();
  };
  window.shEdSeats = function(tIdx, d) { window.shChangeTableCapacity(tIdx, d); };
  window.shEdRenameTable = function(tIdx, v) { if (!String(v || '').trim()) return; window.shSnapshot(); window.shRenameTable(tIdx, v); };

  /* ---- Panel render ---- */
  window.shRenderSeatPanel = function() {
    var box = document.getElementById('sh-selected-table-box'); if (!box || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    shSyncTableSelectAndPills(); if (window.shRenderLegend) window.shRenderLegend();
    var undoBtn = document.getElementById('sh-undo-btn'); if (undoBtn) undoBtn.style.display = window.__SH_UNDO.length ? '' : 'none';
    if (window.shElementPanelHtml && window.__SH_SELECTED_LANDMARK_IDX != null && window.__SH_STATE.landmarks && window.__SH_STATE.landmarks[window.__SH_SELECTED_LANDMARK_IDX]) { box.innerHTML = window.shElementPanelHtml(); return; }
    var tables = window.__SH_STATE.tables, tIdx = window.__SH_SELECTED_TABLE_IDX, t = tables[tIdx];
    if (!t) { box.innerHTML = '<div class="sh-ed-empty">Tap any table on the floorplan to see who&rsquo;s sitting there.</div>'; return; }
    if (!t.geometry) shRecomputeGeometry(t);
    var og = window.__SH_OPEN_GUEST, isSweet = shNormalizeShape(t.shape) === 'sweetheart', free = Math.max(0, (t.capacity || 0) - t.guests.length);
    var h = [];
    if (window.shEdTopConflictHtml) h.push(window.shEdTopConflictHtml());
    h.push('<div class="sh-ed-find-wrap"><div style="position:relative;display:flex;align-items:center;"><input id="sh-ed-find-guest" class="sh-ed-find-input" value="' + shEsc(window.__SH_FIND_Q || '') + '" placeholder="Find any guest across all tables (press Enter)..." autocomplete="off" oninput="window.shEdFindInput(this.value)" onkeydown="window.shEdFindKey(event)" /><button type="button" id="sh-ed-find-clear" class="sh-ed-find-clear" aria-label="Clear search" style="display:' + ((window.__SH_FIND_Q || '').trim() ? 'block' : 'none') + ';" onclick="window.shEdFindClear()">&times;</button></div><div id="sh-ed-find-results" class="sh-ed-find-results" style="display:' + ((window.__SH_FIND_Q || '').trim() ? 'block' : 'none') + ';">' + shEdFindResultsHtml(window.__SH_FIND_Q) + '</div></div>');
    h.push('<div class="sh-ed-tbl-strip" role="navigation" aria-label="Jump to table">');
    tables.forEach(function(tb, idx) {
      var tf = Math.max(0, (tb.capacity || 8) - tb.guests.length), sw = shNormalizeShape(tb.shape) === 'sweetheart';
      h.push('<button type="button" class="sh-ed-tbl-pill' + (idx === tIdx ? ' on' : '') + (tf > 0 ? ' has-free' : '') + '" onclick="window.shSelectTable(' + idx + ')">' + (sw ? 'Sweetheart' : 'Tbl ' + tb.number) + ' <small>' + (tf === 0 ? 'Full' : tf + ' open') + '</small></button>');
    });
    h.push('</div>');
    var mCounts = {}, aCount = 0;
    t.guests.forEach(function(g) { var ms = shEdMealShort(g.meal); mCounts[ms] = (mCounts[ms] || 0) + 1; if (g.allergy || g.accessibility) aCount++; });
    var tallyParts = Object.keys(mCounts).map(function(k) { return mCounts[k] + ' ' + k; });
    if (aCount) tallyParts.push(aCount + (aCount === 1 ? ' dietary/seat need' : ' dietary/seat needs'));
    h.push('<div class="sh-ed-head">');
    h.push('<input class="sh-ed-title" value="' + shEsc(isSweet ? 'Sweetheart Table' : t.name) + '" aria-label="Table name" onchange="window.shEdRenameTable(' + tIdx + ',this.value)" onkeydown="if(event.key===\\'Enter\\')this.blur()" />');
    h.push('<div class="sh-ed-meta"><span>' + t.guests.length + ' of ' + t.capacity + ' seats filled</span>');
    if (!isSweet) h.push('<span class="sh-ed-stepper"><button type="button" aria-label="Remove a chair" onclick="window.shEdSeats(' + tIdx + ',-1)">&minus;</button><b>' + t.capacity + ' chairs</b><button type="button" aria-label="Add a chair" onclick="window.shEdSeats(' + tIdx + ',1)">+</button></span>');
    h.push('</div>');
    h.push('<div class="sh-ed-tally" style="display:flex;align-items:center;justify-content:space-between;gap:6px;"><span>' + (tallyParts.length ? tallyParts.join(' &middot; ') : 'No meals assigned yet') + '</span><button type="button" class="sh-ed-ka-btn" style="padding:2px 8px;font-size:0.74rem;" onclick="window.shSetActiveTab(\\\'beo\\\')">Caterer BEO &rarr;</button></div>');
    h.push('</div>');
    if (window.shEdTableStyleHtml) h.push(window.shEdTableStyleHtml(tIdx));
    h.push('<div class="sh-ed-add"><input id="sh-ed-add" placeholder="Add guest or couple..." onkeydown="if(event.key===\\'Enter\\')window.shEdAdd(' + tIdx + ')" /><button type="button" onclick="window.shEdAdd(' + tIdx + ')">Add</button><button type="button" id="sh-ed-bulk-toggle" class="sh-ed-ghost" style="padding:0 10px;font-size:0.80rem;background:#FAF7F2;border:1.5px solid #DCD3C3;color:#44403C;font-weight:700;" title="Paste multiple late RSVPs at once" onclick="window.shEdToggleBulk()">+ Paste list</button></div>');
    if (window.__SH_BULK_OPEN) {
      h.push('<div id="sh-ed-bulk-box" class="sh-ed-bulk-box"><textarea id="sh-ed-bulk-text" rows="3" class="sh-ed-input" placeholder="Paste late RSVPs (one household per line, e.g.&#10;The Harrison Family + 2 kids&#10;Dr. &amp; Mrs. Lin)"></textarea><div style="display:flex;justify-content:flex-end;gap:6px;margin-top:6px;"><button type="button" class="sh-ed-ghost" onclick="window.shEdToggleBulk()">Cancel</button><button type="button" id="sh-ed-bulk-submit" class="sh-ed-ka-btn" onclick="window.shEdBulkPaste()">Seat late RSVPs (keeps layout)</button></div></div>');
    }
    h.push('<div class="sh-ed-list">');
    if (!t.guests.length) h.push('<div class="sh-ed-empty" style="padding:14px 4px;">No one here yet. Add a guest above, or drag someone onto this table.</div>');
    t.guests.forEach(function(g, sIdx) {
      var open = og && og.t === tIdx && og.s === sIdx, nk = shEdNoteKey(g), noteLbl = nk === 'none' ? '' : (nk === 'other' ? String(g.allergy).replace(/[^A-Za-z0-9\\s-]/g, '').trim().slice(0, 18) : SH_ED_NOTES.filter(function(x) { return x[0] === nk; })[0][1]);
      h.push('<div class="sh-ed-item' + (open ? ' open' : '') + '">');
      h.push('<div class="sh-ed-row" role="button" tabindex="0" onclick="window.shEdOpen(' + tIdx + ',' + sIdx + ')" onkeydown="if(event.key===\\'Enter\\')window.shEdOpen(' + tIdx + ',' + sIdx + ')"><span class="sh-ed-seat">' + (sIdx + 1) + '</span>' + (window.shGroupDot ? window.shGroupDot(g) : '') + '<span class="sh-ed-name">' + shEsc(g.name) + '</span>' + (noteLbl ? '<span class="sh-ed-tag warn">' + shEsc(noteLbl) + '</span>' : '') + '<button type="button" class="sh-ed-tag sh-ed-meal-pill" style="min-height:30px;padding:3px 10px;touch-action:manipulation;" title="Tap to switch meal" ontouchend="event.stopPropagation()" onclick="window.shEdCycleMeal(' + tIdx + ',' + sIdx + ',event)">' + shEdMealShort(g.meal) + '</button><span class="sh-ed-chev">' + (open ? '&#9652;' : '&#9662;') + '</span></div>');
      if (open) {
        var pIdx = shFindPartnerIdx(t, sIdx), partner = pIdx !== -1 ? t.guests[pIdx] : null;
        h.push('<div class="sh-ed-detail">');
        h.push('<div class="sh-ed-label">Move to</div><div class="sh-ed-chips">');
        tables.forEach(function(ot, oIdx) {
          if (oIdx === tIdx) return;
          var of = Math.max(0, (ot.capacity || 0) - ot.guests.length), full = of === 0;
          h.push('<button type="button" class="sh-ed-chip' + (full ? ' expand' : '') + '" title="' + (full ? 'Move here and automatically add 1 chair' : 'Move to ' + shEdTableLabel(ot)) + '" onclick="window.shEdMove(' + tIdx + ',' + sIdx + ',' + oIdx + ')">' + shEsc(shEdTableLabel(ot)) + '<small>' + (full ? '+1 chair' : of + ' free') + '</small></button>');
        });
        h.push('</div>');
        if (partner) {
          h.push('<div class="sh-ed-couple-move"><span class="sh-ed-label" style="margin:6px 0 4px;display:block;">Move couple together (' + shEsc(g.name.split(' ')[0]) + ' &amp; ' + shEsc(partner.name.split(' ')[0]) + ')</span><div class="sh-ed-chips">');
          tables.forEach(function(ot, oIdx) {
            if (oIdx === tIdx) return;
            h.push('<button type="button" class="sh-ed-chip" onclick="window.shEdMoveCouple(' + tIdx + ',' + sIdx + ',' + pIdx + ',' + oIdx + ')">Both &rarr; ' + shEsc(shEdTableLabel(ot)) + '</button>');
          });
          h.push('</div></div>');
        }
        var swapOpts = ['<option value="">Swap seat with someone...</option>'];
        tables.forEach(function(ot, oIdx) { ot.guests.forEach(function(og2, oS) { if (oIdx === tIdx && oS === sIdx) return; swapOpts.push('<option value="' + oIdx + ':' + oS + '">' + shEsc(shEdTableLabel(ot) + ': ' + og2.name) + '</option>'); }); });
        h.push('<select id="sh-ed-swap-select" class="sh-ed-input" style="margin-top:6px;padding:7px 10px;font-size:0.86rem;" onchange="window.shEdSwapWith(' + tIdx + ',' + sIdx + ',this.value)">' + swapOpts.join('') + '</select>');
        h.push('<div class="sh-ed-label">Meal</div><div class="sh-ed-seg wrap">');
        SH_ED_MEALS.forEach(function(m) { h.push('<button type="button" class="' + (shEdMealShort(g.meal) === m[1] ? 'on' : '') + '" onclick="window.shEdMeal(' + tIdx + ',' + sIdx + ',\\'' + m[0] + '\\')">' + m[1] + '</button>'); });
        h.push('</div><div class="sh-ed-label">Dietary or seating need</div><div class="sh-ed-seg wrap">');
        SH_ED_NOTES.forEach(function(n) { h.push('<button type="button" class="' + (nk === n[0] ? 'on' : '') + '" onclick="window.shEdNote(' + tIdx + ',' + sIdx + ',\\'' + n[0] + '\\')">' + n[1] + '</button>'); });
        h.push('</div><input id="sh-ed-custom-allergy" class="sh-ed-input" style="margin-top:6px;padding:7px 10px;font-size:0.86rem;" placeholder="Custom allergy / dietary note (e.g. Sesame, Kosher, Halal)..." value="' + shEsc(g.allergy || '') + '" onchange="window.shEdCustomAllergy(' + tIdx + ',' + sIdx + ',this.value)" onkeydown="if(event.key===\\'Enter\\')this.blur()" />');
        if (window.shEdGuestExtras) h.push(window.shEdGuestExtras(tIdx, sIdx));
        h.push('<div class="sh-ed-label">Name</div><input class="sh-ed-input" value="' + shEsc(g.name) + '" onchange="window.shEdRename(' + tIdx + ',' + sIdx + ',this.value)" onkeydown="if(event.key===\\'Enter\\')this.blur()" />');
        h.push('<button type="button" class="sh-ed-remove" onclick="window.shEdRemove(' + tIdx + ',' + sIdx + ')">Remove from guest list</button>');
        h.push('</div>');
      }
      h.push('</div>');
    });
    if (free > 0 && t.guests.length) h.push('<div class="sh-ed-free">' + free + ' empty seat' + (free === 1 ? '' : 's') + '</div>');
    h.push('</div>');
    if (!isSweet && tables.length > 2) h.push('<button type="button" class="sh-ed-remove" style="margin-top:10px;" onclick="window.shEdRemoveTable(' + tIdx + ')">Remove this table' + (t.guests.length ? ' (re-seat ' + t.guests.length + ' guest' + (t.guests.length === 1 ? '' : 's') + ')' : '') + '</button>');
    if (window.shEdKeepApartHtml) h.push(window.shEdKeepApartHtml());
    box.innerHTML = h.join('');
  };`;
}

module.exports = { renderSeatEditorClientScript };

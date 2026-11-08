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
    ['nut', 'Nut allergy', 'SEVERE PEANUT ALLERGY', ''],
    ['gf', 'Gluten-free', 'SEVERE CELIAC (GF)', ''],
    ['df', 'Dairy-free', 'DAIRY-FREE', ''],
    ['shell', 'Shellfish', 'SHELLFISH ALLERGY', ''],
    ['wheel', 'Wheelchair', '', 'REMOVE CHAIR FOR WHEELCHAIR'],
    ['high', 'Highchair', '', 'ADD HIGHCHAIR']
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

  /* ---- Undo, Redo & Last 5 Moves History ---- */
  window.__SH_REDO = [];
  function shEdState() { return JSON.stringify({ tables: window.__SH_STATE.tables, roomHeight: window.__SH_STATE.roomHeight, targetGuests: window.__SH_STATE.targetGuests, rules: window.__SH_STATE.rules, landmarks: window.__SH_STATE.landmarks, unassignedGuests: window.__SH_STATE.unassignedGuests || [] }); }
  function shCleanMoveLabel(msg) {
    return String(msg || '')
      .replace(/^[\u2713\u21bb\u229e\u2728\uD83D\uDD12\uD83D\uDD13\s]+/, '')
      .replace(/\s*\u00b7.*$/, '')
      .replace(/\s*\(\d+\s*tables in room\)/i, '')
      .replace(/\s*and room elements to the 20px architectural grid!?/i, ' to grid')
      .replace(/\s*\(Seat #\d+\)!?/i, '')
      .replace(/\s*Tap Undo to reverse\.?/i, '')
      .replace(/!$/, '')
      .trim();
  }
  function shPruneNoOpSnapshots() {
    if (!window.__SH_STATE) return;
    var st = window.__SH_UNDO, cur = shEdState();
    while (st.length && (st[st.length - 1].snap || st[st.length - 1]) === cur) st.pop();
  }
  window.shSnapshot = function(label) {
    if (!window.__SH_STATE || window.__SH_SUPPRESS_RENDER) return;
    var snap = shEdState(), st = window.__SH_UNDO;
    if (st.length && (st[st.length - 1].snap || st[st.length - 1]) === snap) {
      if (label) st[st.length - 1].label = label;
      return;
    }
    st.push({ snap: snap, label: label || '', ts: Date.now() });
    if (st.length > 25) st.shift();
    window.__SH_REDO = [];
  };
  var origShToast = typeof shToast === 'function' ? shToast : null;
  if (origShToast) {
    shToast = function(msg) {
      var st = window.__SH_UNDO;
      if (st && st.length && !st[st.length - 1].label && !/^(?:\u21b6|\u21b7|Undone|Redone|\uD83D\uDDFA|\uD83D\uDD0D|\u270B|Selected )/i.test(String(msg || ''))) {
        var cur = shEdState();
        if ((st[st.length - 1].snap || st[st.length - 1]) !== cur) {
          st[st.length - 1].label = shCleanMoveLabel(msg);
        }
      }
      return origShToast(msg);
    };
  }
  function shApplySnapshotJson(rawSnap) {
    var prev = JSON.parse(rawSnap);
    window.__SH_STATE.tables = prev.tables; window.__SH_STATE.roomHeight = prev.roomHeight;
    if (prev.targetGuests) window.__SH_STATE.targetGuests = prev.targetGuests;
    if (prev.rules) window.__SH_STATE.rules = prev.rules;
    if (prev.landmarks) window.__SH_STATE.landmarks = prev.landmarks;
    window.__SH_SELECTED_LANDMARK_IDX = null;
    window.__SH_STATE.tables.forEach(function(t) { shRecomputeGeometry(t); });
    window.__SH_OPEN_GUEST = null; window.__SH_SWAP_SOURCE = null;
    window.__SH_SELECTED_TABLE_IDX = Math.min(window.__SH_SELECTED_TABLE_IDX || 0, window.__SH_STATE.tables.length - 1);
    shSyncTableSelectAndPills();
  }
  window.shUndo = function(steps) {
    shPruneNoOpSnapshots();
    var st = window.__SH_UNDO, count = Math.max(1, Number(steps) || 1);
    if (!st.length) { shToast('No moves to undo yet.'); return; }
    var lastEntry = null;
    for (var i = 0; i < count && st.length; i++) {
      var curSnap = shEdState();
      lastEntry = st.pop();
      var lbl = (lastEntry && lastEntry.label) || 'Move';
      window.__SH_REDO.push({ snap: curSnap, label: lbl, ts: Date.now() });
      shApplySnapshotJson(lastEntry.snap || lastEntry);
    }
    if (window.shCloseMenus) window.shCloseMenus();
    shToast('\\u21b6 Undone: ' + ((lastEntry && lastEntry.label) || 'last move') + (count > 1 ? ' (' + count + ' moves)' : ''));
    shRenderAll();
  };
  window.shRedo = function() {
    var rd = window.__SH_REDO;
    if (!rd || !rd.length) return;
    var nextEntry = rd.pop();
    window.__SH_UNDO.push({ snap: shEdState(), label: nextEntry.label || 'Move', ts: Date.now() });
    shApplySnapshotJson(nextEntry.snap);
    if (window.shCloseMenus) window.shCloseMenus();
    shToast('\\u21b7 Redone: ' + (nextEntry.label || 'move'));
    shRenderAll();
  };
  window.shSyncHistoryUi = function() {
    shPruneNoOpSnapshots();
    var st = window.__SH_UNDO || [], rd = window.__SH_REDO || [];
    var undoBtn = document.getElementById('sh-undo-btn');
    if (undoBtn) {
      undoBtn.style.display = '';
      undoBtn.disabled = !st.length;
      undoBtn.style.opacity = st.length ? '1' : '0.52';
      undoBtn.innerHTML = '&#8630; Undo' + (st.length ? ' (' + Math.min(5, st.length) + ')' : '');
    }
    var histBtn = document.getElementById('sh-toolbar-history-btn');
    if (histBtn) {
      histBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Last ' + (st.length ? Math.min(5, st.length) : 5) + ' moves &#9662;';
    }
    var menu = document.getElementById('sh-history-menu');
    if (!menu) return;
    var recent = st.slice(-5).reverse();
    var rows = ['<div class="sh-ed-menu-sec">Last 5 moves (click to undo back)</div>'];
    if (!recent.length) {
      rows.push('<div style="padding:8px 10px;font-size:0.78rem;color:#78716C;">No moves recorded yet. Drag a table, swap seats, or edit a guest to see your last 5 moves here.</div>');
    } else {
      recent.forEach(function(item, idx) {
        var lbl = (item && item.label) || ('Move #' + (st.length - idx));
        var stepsBack = idx + 1;
        rows.push('<button type="button" onclick="window.shUndo(' + stepsBack + ')" style="display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;text-align:left;white-space:normal;line-height:1.3;"><span style="flex:1;">&#8630; ' + shEsc(lbl) + '</span><small style="flex-shrink:0;">' + (stepsBack === 1 ? 'last move' : ('-' + stepsBack + ' moves')) + '</small></button>');
      });
    }
    if (rd.length) {
      var topRedo = rd[rd.length - 1];
      rows.push('<div class="sh-ed-menu-sec">Redo</div>');
      rows.push('<button type="button" onclick="window.shRedo()" style="display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;text-align:left;color:#065F46;font-weight:700;"><span>&#8631; Redo: ' + shEsc(topRedo.label || 'Move') + '</span><small>+1</small></button>');
    }
    menu.innerHTML = rows.join('');
  };
  document.addEventListener('keydown', function(ev) {
    if (!ev) return;
    var tag = (ev.target && ev.target.tagName) ? ev.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || (ev.target && ev.target.isContentEditable)) return;
    if (!ev.metaKey && !ev.ctrlKey && !ev.altKey && (ev.key === '/' || ev.key === 'f')) {
      var findInp = document.getElementById('sh-ed-find-guest');
      if (findInp) {
        ev.preventDefault();
        findInp.focus();
        findInp.select();
        return;
      }
    }
    if ((ev.metaKey || ev.ctrlKey) && !ev.altKey && String(ev.key || '').toLowerCase() === 'z') {
      ev.preventDefault();
      if (ev.shiftKey) window.shRedo();
      else window.shUndo(1);
      return;
    }
    if (!ev.metaKey && !ev.ctrlKey && !ev.altKey && (ev.key === 'Delete' || ev.key === 'Backspace')) {
      var grid = document.getElementById('sh-builder-grid');
      if (grid && grid.style.display === 'none') return;
      if (window.__SH_ACTIVE_VIEW && window.__SH_ACTIVE_VIEW !== 'floorplan') return;
      var plan = window.__SH_STATE;
      if (!plan) return;
      if (window.shHasBoxSelection && window.shHasBoxSelection()) {
        ev.preventDefault();
        window.shBoxDeleteSelection();
        return;
      }
      if (window.__SH_OPEN_GUEST && plan.tables && plan.tables[window.__SH_OPEN_GUEST.t] && plan.tables[window.__SH_OPEN_GUEST.t].guests[window.__SH_OPEN_GUEST.s]) {
        ev.preventDefault();
        window.shEdRemove(window.__SH_OPEN_GUEST.t, window.__SH_OPEN_GUEST.s);
        return;
      }
      if (window.__SH_SWAP_SOURCE && plan.tables && plan.tables[window.__SH_SWAP_SOURCE.tableIdx]) {
        ev.preventDefault();
        var st = window.__SH_SWAP_SOURCE.tableIdx, ss = window.__SH_SWAP_SOURCE.seatIdx;
        if (plan.tables[st].guests[ss]) window.shEdRemove(st, ss);
        else window.shChangeTableCapacity(st, -1);
        window.__SH_SWAP_SOURCE = null;
        return;
      }
      if (window.__SH_SELECTED_LANDMARK_IDX != null && plan.landmarks && plan.landmarks[window.__SH_SELECTED_LANDMARK_IDX]) {
        ev.preventDefault();
        window.shSnapshot();
        window.shDeleteLandmark(window.__SH_SELECTED_LANDMARK_IDX);
        return;
      }
      var selTIdx = window.__SH_SELECTED_TABLE_IDX;
      if (selTIdx != null && plan.tables && plan.tables[selTIdx]) {
        var selTbl = plan.tables[selTIdx];
        if (shNormalizeShape(selTbl.shape) === 'sweetheart') {
          shToast('Sweetheart table cannot be deleted (rename or morph it in the right panel).');
          return;
        }
        if (plan.tables.length > 2) {
          ev.preventDefault();
          window.shEdRemoveTable(selTIdx);
        } else if (plan.tables.length > 1) {
          ev.preventDefault();
          window.shDeleteSelectedTable();
        }
      }
    }
  });
  ['shMoveGuestToTable', 'shAddNewTable', 'shDeleteSelectedTable', 'shChangeTableCapacity', 'shRemoveGuest', 'shQuickAddGuestToTable', 'shDeleteLandmark'].forEach(function(fn) {
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
    if (box) {
      box.innerHTML = shEdFindResultsHtml(window.__SH_FIND_Q);
      box.style.display = window.__SH_FIND_Q.trim() ? 'block' : 'none';
    }
    if (typeof shRenderFloorplanSvg === 'function') shRenderFloorplanSvg();
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
    if (typeof shRenderFloorplanSvg === 'function') shRenderFloorplanSvg();
  };
  function shEdFindResultsHtml(q) {
    var hits = shEdFindHits(q); if (!String(q || '').trim()) return '';
    if (!hits.length) return '<div class="sh-ed-find-empty">No guest matching &ldquo;' + shEsc(q) + '&rdquo;</div>';
    return hits.slice(0, 8).map(function(h) {
      return '<button type="button" class="sh-ed-find-item" onclick="window.shEdJumpGuest(' + h.ti + ',' + h.si + ')">' + (window.shGroupDot ? window.shGroupDot(h.g) : '') + '<span class="sh-ed-find-name">' + shEsc(h.name) + '</span><span class="sh-ed-tag">' + shEsc(h.tbl) + ' &middot; ' + h.meal + '</span></button>';
    }).join('');
  }
  window.shEdJumpGuest = function(tIdx, sIdx) {
    window.__SH_FIND_Q = ''; window.__SH_SELECTED_LANDMARK_IDX = null; window.__SH_PAN_VIEW = null;
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
  window.shEdRename = function(tIdx, sIdx, v) { if (!String(v || '').trim()) return; window.shSnapshot(); window.__SH_STATE.hasUserEdits = true; window.__SH_SETUP.sample = false; window.shRenameGuest(tIdx, sIdx, v); };
  window.shEdRemove = function(tIdx, sIdx) {
    var g = window.__SH_STATE.tables[tIdx].guests[sIdx]; if (!g) return;
    window.shRemoveGuest(tIdx, sIdx); window.__SH_OPEN_GUEST = null;
    shToast('Removed ' + g.name + '. Tap Undo to bring them back.'); shRenderAll();
  };
  window.shEdUnseatGuest = function(tIdx, sIdx) {
    var tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl || !tbl.guests || !tbl.guests[sIdx]) return;
    window.shSnapshot();
    if (!window.__SH_STATE.unassignedGuests) window.__SH_STATE.unassignedGuests = [];
    var g = tbl.guests.splice(sIdx, 1)[0];
    window.__SH_STATE.unassignedGuests.push(g);
    window.__SH_OPEN_GUEST = null;
    shRecomputeGeometry(tbl);
    shToast('\u2713 Moved ' + g.name + ' to Holding Bench. Tap Bench to reassign anytime.');
    shRenderAll();
  };
  window.shEdSeatFromBench = function(benchIdx, targetTIdx) {
    var benched = window.__SH_STATE && window.__SH_STATE.unassignedGuests;
    var tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[targetTIdx];
    if (!benched || !benched[benchIdx] || !tbl) return;
    window.shSnapshot();
    var g = benched.splice(benchIdx, 1)[0];
    if (!tbl.guests) tbl.guests = [];
    tbl.guests.push(g);
    if (tbl.guests.length > (tbl.capacity || 8)) tbl.capacity = tbl.guests.length;
    shRecomputeGeometry(tbl);
    shToast('\u2713 Seated ' + g.name + ' at ' + (shNormalizeShape(tbl.shape) === 'sweetheart' ? 'Sweetheart Table' : 'Table ' + tbl.number) + '.');
    shRenderAll();
  };
  window.shEdAutoSeatAllBench = function() {
    var benched = window.__SH_STATE && window.__SH_STATE.unassignedGuests;
    if (!benched || !benched.length) return;
    var tables = window.__SH_STATE.tables || [];
    var eligible = tables.filter(function(t) { return shNormalizeShape(t.shape) !== 'sweetheart' && !t.locked; });
    if (!eligible.length) { shToast('No unlocked guest tables available.'); return; }
    window.shSnapshot();
    var totalSeated = 0;
    while (benched.length > 0) {
      eligible.sort(function(a, b) { return a.guests.length - b.guests.length; });
      var target = eligible[0];
      var g = benched.shift();
      target.guests.push(g);
      if (target.guests.length > (target.capacity || 8)) target.capacity = target.guests.length;
      totalSeated++;
    }
    tables.forEach(function(t) { shRecomputeGeometry(t); });
    window.__SH_VIEW_BENCH = false;
    shToast('\u2713 Auto-seated ' + totalSeated + ' guest' + (totalSeated === 1 ? '' : 's') + ' across open tables.');
    shRenderAll();
  };
  window.shToggleBenchView = function(force) {
    window.__SH_VIEW_BENCH = typeof force === 'boolean' ? force : !window.__SH_VIEW_BENCH;
    if (window.shRenderSeatPanel) window.shRenderSeatPanel();
  };
  window.shEdQuickFillPair = function(tIdx) {
    var tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl) return;
    window.shSnapshot();
    var cur = (tbl.guests || []).length + 1;
    var g1 = { name: 'Guest ' + cur, meal: 'Filet Mignon', allergy: '', accessibility: 'Standard Chair', side: 'guest', role: 'guest' };
    var g2 = { name: 'Partner ' + cur, meal: 'Pan-Seared Halibut', allergy: '', accessibility: 'Standard Chair', side: 'guest', role: 'guest' };
    tbl.guests.push(g1, g2);
    if (tbl.guests.length > (tbl.capacity || 8)) tbl.capacity = tbl.guests.length;
    shRecomputeGeometry(tbl);
    shToast('\u2713 Added couple to ' + shEdTableLabel(tbl) + '. Click names to edit.');
    shRenderAll();
  };
  window.shEdQuickFillFamily = function(tIdx) {
    var tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl) return;
    window.shSnapshot();
    var famNum = Math.floor(1 + Math.random() * 90);
    var g1 = { name: 'Parent ' + famNum + 'A', meal: 'Filet Mignon', allergy: '', accessibility: 'Standard Chair', side: 'guest', role: 'guest' };
    var g2 = { name: 'Parent ' + famNum + 'B', meal: 'Pan-Seared Halibut', allergy: '', accessibility: 'Standard Chair', side: 'guest', role: 'guest' };
    var g3 = { name: 'Child ' + famNum + 'C', meal: 'Kids Chicken Tenders', allergy: '', accessibility: 'Standard Chair', side: 'guest', role: 'guest' };
    var g4 = { name: 'Child ' + famNum + 'D', meal: 'Kids Chicken Tenders', allergy: '', accessibility: 'Standard Chair', side: 'guest', role: 'guest' };
    tbl.guests.push(g1, g2, g3, g4);
    if (tbl.guests.length > (tbl.capacity || 8)) tbl.capacity = tbl.guests.length;
    shRecomputeGeometry(tbl);
    shToast('\u2713 Added 4-person family household to ' + shEdTableLabel(tbl) + '.');
    shRenderAll();
  };
  function shExtractTags(str, fallbackStr) {
    var s = (String(str || '') + ' ' + String(fallbackStr || '')).toLowerCase();
    var meal = 'Filet Mignon';
    if (/kid|child|tender/.test(s) && !/\\+\\s*\\d+\\s*kid/.test(s)) meal = 'Kids Chicken Tenders';
    else if (/chicken|poultry/.test(s)) meal = 'Roasted Chicken';
    else if (/halibut|fish|salmon|seafood/.test(s)) meal = 'Pan-Seared Halibut';
    else if (/vegan|risotto/.test(s)) meal = 'Vegan Risotto';
    else if (/vegetarian|mushroom|tart|pasta|\\bveg\\b/.test(s)) meal = 'Wild Mushroom Tart';
    var allergy = '';
    if (/peanut|\\bnut\\b|tree\\s*nut/.test(s)) allergy = 'SEVERE PEANUT ALLERGY';
    else if (/celiac|gluten|\\bgf\\b/.test(s)) allergy = 'SEVERE CELIAC (GF)';
    else if (/dairy|lactose|\\bdf\\b/.test(s)) allergy = 'DAIRY-FREE';
    else if (/shellfish|shrimp/.test(s)) allergy = 'SHELLFISH ALLERGY';
    else if (/low\\s*sodium/.test(s)) allergy = 'LOW SODIUM';
    else if (/kosher/.test(s)) allergy = 'KOSHER MEAL';
    var access = '';
    if (/wheelchair|\\bada\\b|scooter/.test(s)) access = 'REMOVE CHAIR FOR WHEELCHAIR';
    else if (/highchair|booster/.test(s)) access = 'ADD HIGHCHAIR';
    var rel = '';
    if (/mother|father|\\bmom\\b|\\bdad\\b|parent|stepmom|stepdad/.test(s)) rel = 'parents';
    else if (/grandma|grandpa|nana|aunt|uncle|cousin|sister|brother|family/.test(s)) rel = 'family';
    else if (/best\\s*man|maid\\s*of\\s*honor|bridesmaid|groomsman|wedding\\s*party|coordinator/.test(s)) rel = 'party';
    return { meal: meal, allergy: allergy, accessibility: access, rel: rel };
  }
  function shParseHouseholdLine(raw) {
    var line = String(raw || '').trim(); if (!line) return [];
    var isDelimited = line.indexOf('\\t') !== -1 || (line.indexOf(',') !== -1 && !/family|\\+|&/i.test(line.split(',')[0]) && !/^\\s*table\\s*\\d+/i.test(line));
    if (isDelimited) {
      var sep = line.indexOf('\\t') !== -1 ? '\\t' : ',';
      var cols = line.split(sep).map(function(c) { return c.trim().replace(/^["']+|["']+$/g, ''); }).filter(Boolean);
      if (!cols.length || /^(name|guest\\s*name|attendee|first\\s*name)$/i.test(cols[0])) return [];
      var isMealOrDiet = function(s) { return /(filet|beef|steak|chicken|halibut|salmon|fish|vegan|vegetarian|risotto|kid|celiac|gluten|peanut|nut|dairy|allergy)/i.test(s); };
      var tName = '', tMealCol = '', tAllergyCol = '';
      if (cols.length === 2) {
        if (isMealOrDiet(cols[1])) { tName = cols[0]; tMealCol = cols[1]; }
        else { tName = cols[0] + ' ' + cols[1]; }
      } else if (cols.length >= 3) {
        if (isMealOrDiet(cols[1])) {
          tName = cols[0]; tMealCol = cols[1]; tAllergyCol = cols.slice(2).join(' ');
        } else if (isMealOrDiet(cols[2])) {
          tName = cols[0] + ' ' + cols[1]; tMealCol = cols[2]; tAllergyCol = cols.slice(3).join(' ');
        } else {
          tName = cols[0] + ' ' + cols[1]; tAllergyCol = cols.slice(2).join(' ');
        }
      } else {
        tName = cols[0];
      }
      var tTags = shExtractTags(tName + ' (' + [tMealCol, tAllergyCol].filter(Boolean).join(', ') + ')', '');
      return [{
        name: tName,
        initials: shMakeInitials(tName),
        role: 'Guest',
        meal: tTags.meal,
        allergy: tTags.allergy,
        accessibility: tTags.accessibility,
        rel: tTags.rel,
        hhId: ''
      }];
    }
    var kidsMatch = line.match(/\\+\\s*(\\d+)\\s*(?:kid|child)[a-z]*/i);
    var numKids = kidsMatch ? Number(kidsMatch[1]) : 0;
    var hasPlusGuest = /\\+\\s*(?:1\\s*)?guest\\b/i.test(line);
    var globalParens = (line.match(/\\(([^)]*)\\)/g) || []).join(' ');
    var cleanNoKids = line.replace(/\\+\\s*\\d+\\s*(?:kid|child)[a-z]*/i, '').replace(/\\+\\s*(?:1\\s*)?guest\\b(\\s*\\([^)]*\\))?/i, '').trim();
    var rawSegments = [], depth = 0, buf = '';
    for (var ci = 0; ci < cleanNoKids.length; ci++) {
      var ch = cleanNoKids[ci];
      if (ch === '(') depth++;
      else if (ch === ')' && depth > 0) depth--;
      if (depth === 0 && (ch === '&' || ch === '+')) {
        if (buf.trim()) rawSegments.push(buf.trim());
        buf = '';
      } else if (depth === 0 && /^and\\b/i.test(cleanNoKids.slice(ci)) && (ci === 0 || /\\s/.test(cleanNoKids[ci - 1]))) {
        if (buf.trim()) rawSegments.push(buf.trim());
        buf = '';
        ci += 2;
      } else {
        buf += ch;
      }
    }
    if (buf.trim()) rawSegments.push(buf.trim());
    if (rawSegments.length === 1 && /^Dr\\.?\\s*&\\s*Mrs\\.?\\s+(.+)$/i.test(rawSegments[0].replace(/\\([^)]*\\)/g, '').trim())) {
      var sn0 = rawSegments[0].replace(/\\([^)]*\\)/g, '').replace(/^Dr\\.?\\s*&\\s*Mrs\\.?\\s+/i, '').trim();
      rawSegments = ['Dr. ' + sn0 + ' ' + globalParens, 'Mrs. ' + sn0 + ' ' + globalParens];
    } else if (rawSegments.length === 1 && /^The\\s+([A-Za-z-]+)\\s+Family/i.test(rawSegments[0])) {
      var fam = rawSegments[0].replace(/\\([^)]*\\)/g, '').replace(/^The\\s+|\\s+Family.*$/gi, '').trim();
      rawSegments = [fam + ' Parent 1 ' + globalParens, fam + ' Parent 2 ' + globalParens];
    }
    var strippedParts = rawSegments.map(function(s) { return s.replace(/\\([^)]*\\)/g, '').trim(); }).filter(Boolean);
    var lastSurname = '';
    if (strippedParts.length >= 1) {
      var lw = strippedParts[strippedParts.length - 1].replace(/^(Dr|Mr|Mrs|Ms|Prof)\\.?\\s+/i, '').trim().split(/\\s+/);
      if (lw.length >= 2) lastSurname = lw[lw.length - 1];
    }
    var hhId = (strippedParts.length > 1 || numKids > 0 || hasPlusGuest) ? ('hh_' + Date.now() + '_' + Math.floor(Math.random() * 9999)) : '';
    var out = strippedParts.map(function(nm, i) {
      var segRaw = rawSegments[i] || nm;
      var tags = shExtractTags(segRaw, strippedParts.length > 1 && segRaw.indexOf('(') === -1 ? globalParens : '');
      if (strippedParts.length === 2 && i === 1 && segRaw.indexOf('(') !== -1 && /&\\s*(chicken|fish|halibut|steak|beef|vegan|vegetarian)/i.test(segRaw)) {
        var secondMealMatch = segRaw.match(/&\\s*(chicken|fish|halibut|steak|beef|vegan|vegetarian)/i);
        if (secondMealMatch) tags.meal = shExtractTags(secondMealMatch[1], '').meal;
      } else if (strippedParts.length === 2 && i === 0 && rawSegments[1] && /&\\s*(chicken|fish|halibut|steak|beef|vegan|vegetarian)/i.test(rawSegments[1])) {
        var firstMealMatch = rawSegments[1].match(/\\((?:[^,)]*,\\s*)?(chicken|fish|halibut|steak|beef|vegan|vegetarian)\\s*&/i);
        if (firstMealMatch) tags.meal = shExtractTags(firstMealMatch[1], '').meal;
      }
      if (/^\\d*\\s*guest/i.test(nm) || nm === '1') nm = (strippedParts[0] || 'Guest') + ' (+1 Guest)';
      else if (i < strippedParts.length - 1 && lastSurname && nm.replace(/^(Dr|Mr|Mrs|Ms|Prof)\\.?\\s+/i, '').trim().split(/\\s+/).length === 1) nm = nm + ' ' + lastSurname;
      return { name: nm, initials: shMakeInitials(nm), role: hhId ? 'Coupled Household' : 'Guest', meal: tags.meal, allergy: tags.allergy, accessibility: tags.accessibility, rel: tags.rel, hhId: hhId };
    });
    if (hasPlusGuest && out.length > 0) {
      var plusTags = shExtractTags((line.match(/\\+\\s*(?:1\\s*)?guest\\s*(\\([^)]*\\))?/i) || [])[1] || '', '');
      var gName = out[0].name + ' (+1 Guest)';
      out.push({ name: gName, initials: '+1', role: 'Plus-One (Coupled)', meal: plusTags.meal, allergy: plusTags.allergy, accessibility: '', rel: out[0].rel || '', hhId: hhId });
    }
    for (var k = 1; k <= numKids; k++) {
      var kn = (lastSurname || strippedParts[0] || 'Guest') + ' Kid ' + k;
      out.push({ name: kn, initials: ('C' + k), role: 'Child (Locked)', meal: 'Kids Chicken Tenders', allergy: '', accessibility: k === 1 ? 'ADD HIGHCHAIR' : '', rel: 'kids', hhId: hhId });
    }
    return out;
  }
  window.shParseHouseholdLine = shParseHouseholdLine;
  window.shEdAdd = function(tIdx) {
    var inp = document.getElementById('sh-ed-add'), tbl = window.__SH_STATE.tables[tIdx];
    if (!inp || !tbl || !inp.value.trim()) { if (inp) inp.focus(); return; }
    window.__SH_STATE.hasUserEdits = true; window.__SH_SETUP.sample = false;
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
  window.shEdInsertSampleBulk = function() {
    var ta = document.getElementById('sh-ed-bulk-text');
    if (!ta) return;
    ta.value = [
      'The Harrison Family (beef, chicken) + 2 kids',
      'Dr. & Mrs. David Lin (fish, dairy-free)',
      'Marcus Sterling (steak, nut allergy) + guest (chicken)',
      'Chloe & Sam Rivera (halibut, gluten-free)'
    ].join('\\n');
    ta.focus();
    if (typeof shToast === 'function') shToast('\u2713 Inserted sample late RSVPs (with meals & allergies)');
  };
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
        for (var j = 1; j < tables.length; j++) {
          var maxComf = shNormalizeShape(tables[j].shape) === 'round' ? 10 : 12;
          if (tables[j].guests.length + grp.length <= maxComf) { dst = tables[j]; break; }
        }
      }
      if (!dst) {
        var sample = tables[1] || { shape: 'round', capacity: 8 };
        if (typeof window.shFindAndAddNonOverlappingTable === 'function') {
          window.shFindAndAddNonOverlappingTable({ shape: sample.shape, capacity: Math.max(sample.capacity || 8, grp.length) });
          dst = tables[tables.length - 1];
        } else {
          var n = tables.length + 1;
          dst = { id: 'table-' + n, number: n, name: 'Table ' + n, shape: sample.shape, capacity: Math.max(sample.capacity || 8, grp.length), x: 340, y: 230, rotation: 0, locked: false, guests: [] };
          tables.push(dst);
        }
      }
      grp.forEach(function(g) { dst.guests.push(g); added++; });
      dst.capacity = Math.max(dst.capacity || 8, dst.guests.length);
      shRecomputeGeometry(dst);
    });
    window.__SH_BULK_OPEN = false; shSyncTableSelectAndPills();
    shToast('\\u2713 Seated ' + added + ' late-RSVP guest' + (added === 1 ? '' : 's') + ' without changing your existing layout.');
    shRenderAll();
  };
  window.shEdHandleCsvUpload = function(ev) {
    var file = ev.target && ev.target.files && ev.target.files[0]; if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      var content = String(e.target.result || '').trim();
      var ta = document.getElementById('sh-ed-bulk-text');
      if (ta) { ta.value = content; window.shEdBulkPaste(); }
      else {
        window.__SH_BULK_OPEN = true; shRenderSeatPanel();
        var ta2 = document.getElementById('sh-ed-bulk-text');
        if (ta2) { ta2.value = content; window.shEdBulkPaste(); }
      }
    };
    reader.readAsText(file); ev.target.value = '';
  };
  window.shEdHandleCsvUploadBench = function(ev) {
    var file = ev.target && ev.target.files && ev.target.files[0]; if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      var content = String(e.target.result || '').trim();
      var lines = content.split(/\\r?\\n/).map(function(l) { return l.trim(); }).filter(Boolean);
      if (!lines.length) return;
      if (!window.__SH_STATE.unassignedGuests) window.__SH_STATE.unassignedGuests = [];
      var added = 0;
      lines.forEach(function(l) {
        var grp = shParseHouseholdLine(l);
        grp.forEach(function(g) { window.__SH_STATE.unassignedGuests.push(g); added++; });
      });
      window.__SH_VIEW_BENCH = true;
      shToast('\\u2713 Added ' + added + ' guests to holding bench.');
      shRenderSeatPanel(); shRenderAll();
    };
    reader.readAsText(file); ev.target.value = '';
  };
  /* 1-click occupied table removal: auto-reseats guests into open seats on nearest tables (or distributes +1 evenly if all tables are full) */
  window.shEdRemoveTable = function(tIdx) {
    var tables = window.__SH_STATE.tables, t = tables[tIdx];
    if (!t || tables.length <= 2 || shNormalizeShape(t.shape) === 'sweetheart') return;
    window.shSnapshot();
    var orphans = (t.guests || []).slice(), tblName = shEdTableLabel(t), oldX = t.x || 560, oldY = t.y || 340;
    tables.splice(tIdx, 1);
    tables.forEach(function(tb, idx) { tb.number = idx + 1; if (idx > 0 && /^Table \\d+$/i.test(tb.name)) tb.name = 'Table ' + (idx + 1); });
    orphans.forEach(function(g) {
      var dst = null, bestDist = 1e9;
      for (var i = 1; i < tables.length; i++) {
        if (shNormalizeShape(tables[i].shape) === 'sweetheart') continue;
        if (tables[i].guests.length < (tables[i].capacity || 8)) {
          var d = Math.hypot((tables[i].x || 0) - oldX, (tables[i].y || 0) - oldY);
          if (d < bestDist) { bestDist = d; dst = tables[i]; }
        }
      }
      if (!dst) {
        var leastFull = null;
        for (var j = 1; j < tables.length; j++) {
          if (shNormalizeShape(tables[j].shape) === 'sweetheart') continue;
          if (!leastFull || tables[j].guests.length < leastFull.guests.length) leastFull = tables[j];
        }
        dst = leastFull || tables[1] || tables[0];
        dst.capacity = Math.max(dst.capacity || 8, dst.guests.length + 1);
      }
      dst.guests.push(g);
    });
    tables.forEach(function(tb) { shRecomputeGeometry(tb); });
    window.__SH_SELECTED_TABLE_IDX = Math.min(tIdx, tables.length - 1); window.__SH_OPEN_GUEST = null;
    shSyncTableSelectAndPills();
    shToast(orphans.length ? 'Removed ' + tblName + ' and re-seated ' + orphans.length + ' guest' + (orphans.length === 1 ? '' : 's') + ' into your existing tables. Tap Undo to reverse.' : 'Removed ' + tblName + '. Tap Undo to reverse.');
    shRenderAll();
  };
  window.shEdDuplicateTable = function(tIdx) {
    var tables = window.__SH_STATE && window.__SH_STATE.tables;
    var t = tables && tables[tIdx];
    if (!t) return;
    window.shSnapshot();
    var nextNum = tables.length + 1;
    var newX = Math.min(1000, Math.max(120, Math.round(((t.x || 300) + 120) / 20) * 20));
    var newY = Math.min((window.__SH_STATE.roomHeight || 680) - 100, Math.max(100, Math.round(((t.y || 250) + 40) / 20) * 20));
    var overlaps = tables.some(function(ot) { return Math.hypot((ot.x || 0) - newX, (ot.y || 0) - newY) < 90; });
    if (overlaps) {
      newY = Math.min((window.__SH_STATE.roomHeight || 680) - 100, newY + 120);
    }
    var cloned = {
      id: 'table-' + Date.now(),
      number: nextNum,
      name: 'Table ' + nextNum,
      shape: t.shape || 'round',
      capacity: t.capacity || 8,
      x: newX,
      y: newY,
      rotation: t.rotation || 0,
      locked: false,
      guests: []
    };
    shRecomputeGeometry(cloned);
    tables.push(cloned);
    window.__SH_SELECTED_TABLE_IDX = tables.length - 1;
    window.__SH_VIEW_BENCH = false;
    shSyncTableSelectAndPills();
    shToast('\u2713 Duplicated ' + shEdTableLabel(t) + ' as Table ' + nextNum + ' (' + shFriendlyShape(cloned.shape) + ', ' + cloned.capacity + ' chairs).');
    shRenderAll();
  };
  window.shEdSeats = function(tIdx, d) { window.shChangeTableCapacity(tIdx, d); };
  window.shEdRenameTable = function(tIdx, v) { if (!String(v || '').trim()) return; window.shSnapshot(); window.shRenameTable(tIdx, v); };

  /* ---- Panel minimize / reopen ---- */
  if (typeof window.__SH_PANEL_HIDDEN === 'undefined') window.__SH_PANEL_HIDDEN = false;
  window.shSyncRightPanelUi = function() {
    var grid = document.getElementById('sh-ed-grid') || document.querySelector('.sh-ed-grid');
    if (grid) grid.classList.toggle('panel-hidden', !!window.__SH_PANEL_HIDDEN);
    var panel = document.getElementById('sh-selected-table-box');
    var canvas = grid ? grid.querySelector('.sh-ed-canvas') : null;
    if (panel && canvas && !window.__SH_PANEL_HIDDEN) {
      if ((window.innerWidth || 1440) > 900) {
        canvas.style.height = '580px'; canvas.style.minHeight = '580px'; canvas.style.maxHeight = '580px';
        panel.style.height = '580px'; panel.style.minHeight = '580px'; panel.style.maxHeight = '580px';
      } else {
        canvas.style.height = '380px'; canvas.style.minHeight = '380px'; canvas.style.maxHeight = '380px';
        panel.style.height = 'auto'; panel.style.minHeight = '0'; panel.style.maxHeight = '460px';
      }
    }
    var reopenBtn = document.getElementById('sh-canvas-reopen-panel-btn');
    if (reopenBtn) {
      var tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX || 0];
      var sub = (window.shHasBoxSelection && window.shHasBoxSelection()) ? (' (' + window.shFormatBoxSelSummary(window.__SH_BOX_SEL) + ')') : (tbl ? (' (' + shEdTableLabel(tbl) + ')') : '');
      reopenBtn.innerHTML = '&#8676; Re-open right panel' + shEsc(sub);
    }
    var btn = document.getElementById('sh-toolbar-panel-btn');
    if (btn) {
      btn.innerHTML = window.__SH_PANEL_HIDDEN ? '&#8676; Reopen panel' : '&#8677; Hide panel';
      btn.style.background = window.__SH_PANEL_HIDDEN ? '#FAF3E3' : '';
      btn.style.borderColor = window.__SH_PANEL_HIDDEN ? '#C8A96E' : '';
      btn.style.color = window.__SH_PANEL_HIDDEN ? '#78350F' : '';
      btn.style.fontWeight = window.__SH_PANEL_HIDDEN ? '800' : '';
    }
  };
  window.shToggleRightPanel = function(forceHidden) {
    window.__SH_PANEL_HIDDEN = typeof forceHidden === 'boolean' ? forceHidden : !window.__SH_PANEL_HIDDEN;
    window.shSyncRightPanelUi();
    shToast(window.__SH_PANEL_HIDDEN ? 'Side panel minimized for full-width floorplan. Tap "\u21E4 Reopen panel" anytime.' : 'Side panel reopened.');
  };

  /* ---- Panel render ---- */
  window.shRenderSeatPanel = function() {
    if (window.shSyncRightPanelUi) window.shSyncRightPanelUi();
    var box = document.getElementById('sh-selected-table-box'); if (!box || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    shSyncTableSelectAndPills(); if (window.shRenderLegend) window.shRenderLegend();
    if (window.shSyncHistoryUi) window.shSyncHistoryUi();
    if (window.shHasBoxSelection && window.shHasBoxSelection() && window.shBoxPanelHtml) { box.innerHTML = window.shBoxPanelHtml(); return; }
    if (window.shElementPanelHtml && window.__SH_SELECTED_LANDMARK_IDX != null && window.__SH_STATE.landmarks && window.__SH_STATE.landmarks[window.__SH_SELECTED_LANDMARK_IDX]) { box.innerHTML = window.shElementPanelHtml(); return; }
    var tables = window.__SH_STATE.tables, tIdx = window.__SH_SELECTED_TABLE_IDX, t = tables[tIdx];
    var topBar = '<div class="sh-ed-panel-top"><span>Table &amp; Guest Inspector</span><button type="button" id="sh-panel-minimize-btn" class="sh-ed-panel-hide-btn" onclick="window.shToggleRightPanel(true)" title="Minimize right side panel to expand floorplan">Minimize &#8677;</button></div>';
    if (!t) { box.innerHTML = topBar + '<div class="sh-ed-empty">Tap any table on the floorplan to see who&rsquo;s sitting there.</div>'; return; }
    if (!t.geometry) shRecomputeGeometry(t);
    var og = window.__SH_OPEN_GUEST, isSweet = shNormalizeShape(t.shape) === 'sweetheart', free = Math.max(0, (t.capacity || 0) - t.guests.length);
    var h = [topBar];
    if (window.shEdTopConflictHtml) h.push(window.shEdTopConflictHtml());
    h.push('<div class="sh-ed-find-wrap"><div style="position:relative;display:flex;align-items:center;"><input id="sh-ed-find-guest" class="sh-ed-find-input" value="' + shEsc(window.__SH_FIND_Q || '') + '" placeholder="Find any guest across all tables (press Enter)..." autocomplete="off" oninput="window.shEdFindInput(this.value)" onkeydown="window.shEdFindKey(event)" /><button type="button" id="sh-ed-find-clear" class="sh-ed-find-clear" aria-label="Clear search" style="display:' + ((window.__SH_FIND_Q || '').trim() ? 'block' : 'none') + ';" onclick="window.shEdFindClear()">&times;</button></div><div id="sh-ed-find-results" class="sh-ed-find-results" style="display:' + ((window.__SH_FIND_Q || '').trim() ? 'block' : 'none') + ';">' + shEdFindResultsHtml(window.__SH_FIND_Q) + '</div></div>');
    h.push('<div class="sh-ed-tbl-strip" role="navigation" aria-label="Jump to table">');
    tables.forEach(function(tb, idx) {
      var tf = Math.max(0, (tb.capacity || 8) - tb.guests.length), sw = shNormalizeShape(tb.shape) === 'sweetheart';
      h.push('<button type="button" class="sh-ed-tbl-pill' + (!window.__SH_VIEW_BENCH && idx === tIdx ? ' on' : '') + (tf > 0 ? ' has-free' : '') + '" onclick="window.__SH_PAN_VIEW=null;window.__SH_VIEW_BENCH=false;window.shSelectTable(' + idx + ')">' + (sw ? 'Sweetheart' : 'Tbl ' + tb.number) + ' <small>' + (tf === 0 ? 'Full' : tf + ' open') + '</small></button>');
    });
    var benched = (window.__SH_STATE && window.__SH_STATE.unassignedGuests) || [];
    h.push('<button type="button" class="sh-ed-tbl-pill' + (window.__SH_VIEW_BENCH ? ' on' : '') + '" style="' + (benched.length > 0 ? 'background:#FEF3C7;border-color:#F59E0B;color:#92400E;font-weight:700;' : '') + '" onclick="window.shToggleBenchView()">' + (benched.length > 0 ? '⚠️ Bench (' + benched.length + ')' : 'Bench (0)') + '</button>');
    h.push('</div>');
    if (window.__SH_VIEW_BENCH) {
      h.push('<div class="sh-ed-head" style="margin-top:6px;"><div class="sh-ed-title" style="font-size:1.02rem;font-weight:800;color:#1C1C1C;">Holding Bench (' + benched.length + ' Unassigned)</div><div class="sh-ed-meta" style="font-size:0.78rem;color:#57534E;">Guests unseated or awaiting table placement.</div></div>');
      if (benched.length > 0) {
        h.push('<div style="display:flex;gap:6px;margin:8px 0;flex-wrap:wrap;"><button type="button" class="sh-ed-ka-btn" style="padding:5px 12px;font-size:0.78rem;" onclick="window.shEdAutoSeatAllBench()">⚡ Auto-Seat All Benched Guests</button><button type="button" class="sh-ed-ghost" style="padding:5px 10px;font-size:0.78rem;border-color:#1B4D3E;color:#1B4D3E;font-weight:700;" onclick="var fb=document.getElementById(\\\'sh-ed-csv-bench\\\');if(fb)fb.click();">📁 Upload .CSV to Bench</button><input type="file" id="sh-ed-csv-bench" accept=".csv,.tsv,.txt" style="display:none;" onchange="window.shEdHandleCsvUploadBench(event)" /></div>');
        h.push('<div class="sh-ed-list">');
        benched.forEach(function(bg, bIdx) {
          h.push('<div class="sh-ed-item open" style="margin-bottom:8px;padding:8px 10px;border-radius:8px;background:#FFFDF7;border:1px solid #EAE0D0;">');
          h.push('<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;"><strong style="color:#1C1C1C;font-size:0.86rem;">' + shEsc(bg.name) + '</strong><span class="sh-ed-tag" style="font-size:0.72rem;">' + shEdMealShort(bg.meal) + '</span></div>');
          if (bg.allergy) h.push('<div style="font-size:0.74rem;color:#B91C1C;font-weight:700;margin-bottom:6px;">⚠️ ' + shEsc(bg.allergy) + '</div>');
          h.push('<div class="sh-ed-label" style="font-size:0.74rem;margin-bottom:4px;">Seat at:</div><div class="sh-ed-chips">');
          tables.forEach(function(ot, oIdx) {
            var of = Math.max(0, (ot.capacity || 0) - ot.guests.length);
            h.push('<button type="button" class="sh-ed-chip" onclick="window.shEdSeatFromBench(' + bIdx + ',' + oIdx + ')">' + shEsc(shEdTableLabel(ot)) + ' <small>' + (of === 0 ? '+1 chair' : of + ' free') + '</small></button>');
          });
          h.push('</div></div>');
        });
        h.push('</div>');
      } else {
        h.push('<div class="sh-ed-empty" style="padding:24px 8px;">Holding bench is currently empty.<br/><small style="color:#78716C;">To temporarily unseat a guest, open their card and tap "Move to Holding Bench".</small></div>');
      }
      box.innerHTML = h.join('');
      if (window.shSyncRightPanelUi) window.shSyncRightPanelUi();
      return;
    }
    if (benched.length > 0) {
      if (free > 0) {
        h.push('<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;font-size:0.75rem;margin-bottom:8px;"><span style="color:#15803D;font-weight:700;">💡 Seat from bench: ' + shEsc(benched[0].name) + ' (' + free + ' open chair' + (free === 1 ? '' : 's') + ')</span><button type="button" class="sh-ed-ka-btn" style="padding:3px 9px;font-size:0.72rem;" onclick="window.shEdSeatFromBench(0,' + tIdx + ')">Seat Here &rarr;</button></div>');
      } else {
        h.push('<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 9px;background:#FFFBEB;border:1px solid #FDE68A;border-radius:7px;font-size:0.74rem;margin-bottom:6px;"><span style="color:#92400E;font-weight:700;">⚠️ ' + benched.length + ' unseated in Bench</span><button type="button" class="sh-ed-ghost" style="padding:2px 7px;font-size:0.72rem;background:#FFFFFF;border-color:#F59E0B;color:#92400E;font-weight:700;" onclick="window.shToggleBenchView(true)">View Bench &rarr;</button></div>');
      }
    }
    var mCounts = {}, aCount = 0;
    t.guests.forEach(function(g) { var ms = shEdMealShort(g.meal); mCounts[ms] = (mCounts[ms] || 0) + 1; if (g.allergy || g.accessibility) aCount++; });
    var tallyParts = Object.keys(mCounts).map(function(k) { return mCounts[k] + ' ' + k; });
    if (aCount) tallyParts.push(aCount + (aCount === 1 ? ' dietary/seat need' : ' dietary/seat needs'));
    h.push('<div class="sh-ed-head">');
    h.push('<input class="sh-ed-title" value="' + shEsc(isSweet ? 'Sweetheart Table' : t.name) + '" aria-label="Table name" onchange="window.shEdRenameTable(' + tIdx + ',this.value)" onkeydown="if(event.key===\\'Enter\\')this.blur()" />');
    h.push('<div class="sh-ed-meta"><span>' + t.guests.length + ' of ' + t.capacity + ' seats filled</span>');
    if (!isSweet) {
      h.push('<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">');
      h.push('<span class="sh-ed-stepper"><button type="button" aria-label="Remove a chair" onclick="window.shEdSeats(' + tIdx + ',-1)">&minus;</button><b>' + t.capacity + ' chairs</b><button type="button" aria-label="Add a chair" onclick="window.shEdSeats(' + tIdx + ',1)">+</button></span>');
      h.push('<span style="display:inline-flex;gap:3px;align-items:center;">');
      [6, 8, 10, 12].forEach(function(cap) {
        h.push('<button type="button" class="studio-tap-chip' + (t.capacity === cap ? ' active' : '') + '" style="padding:2px 7px;font-size:0.72rem;min-height:26px;font-weight:700;" onclick="window.shSetTableCapacity(' + tIdx + ',' + cap + ')">' + cap + '</button>');
      });
      h.push('</span></div>');
    }
    h.push('</div>');
    h.push('<div class="sh-ed-tally" style="display:flex;align-items:center;justify-content:space-between;gap:6px;"><span>' + (tallyParts.length ? tallyParts.join(' &middot; ') : 'No meals assigned yet') + '</span><button type="button" class="sh-ed-ka-btn" style="padding:2px 8px;font-size:0.74rem;" onclick="window.shSetActiveTab(\\\'beo\\\')">Caterer Meal Sheet &rarr;</button></div>');
    h.push('</div>');
    if (window.shEdTableStyleHtml) h.push(window.shEdTableStyleHtml(tIdx));
    var cl = window.shCalculateTableClearance ? window.shCalculateTableClearance(tIdx) : null;
    if (cl) {
      if (cl.passed) {
        h.push('<div style="display:flex;align-items:center;gap:6px;padding:5px 9px;border-radius:7px;background:#ECFDF5;border:1px solid #A7F3D0;font-size:0.75rem;color:#065F46;font-weight:700;margin-bottom:8px;">✓ 54"+ Aisle Clearance Verified (' + cl.inches + '" to ' + shEsc(cl.nearestName) + ')</div>');
      } else {
        h.push('<div style="display:flex;align-items:center;gap:6px;padding:5px 9px;border-radius:7px;background:#FFFBEB;border:1px solid #FDE68A;font-size:0.75rem;color:#92400E;font-weight:700;margin-bottom:8px;">⚠️ Tight Aisle Clearance (' + cl.inches + '" to ' + shEsc(cl.nearestName) + ' · Min 54" recommended)</div>');
      }
    }
    h.push('<div class="sh-ed-add"><input id="sh-ed-add" placeholder="Add guest or couple..." onkeydown="if(event.key===\\'Enter\\')window.shEdAdd(' + tIdx + ')" /><button type="button" onclick="window.shEdAdd(' + tIdx + ')">Add</button><button type="button" id="sh-ed-bulk-toggle" class="sh-ed-ghost" style="padding:0 10px;font-size:0.80rem;background:#FAF7F2;border:1.5px solid #DCD3C3;color:#44403C;font-weight:700;" title="Paste or upload multiple late RSVPs" onclick="window.shEdToggleBulk()">+ Paste / .CSV</button></div>');
    if (free >= 2 && !isSweet) {
      h.push('<div style="display:flex;align-items:center;gap:6px;margin:4px 0 8px;flex-wrap:wrap;"><span style="font-size:0.70rem;color:#78716C;font-weight:700;">Quick fill:</span><button type="button" class="sh-ed-ghost" style="padding:2px 8px;font-size:0.72rem;border-color:#D1D5DB;background:#FFF;font-weight:600;" onclick="window.shEdQuickFillPair(' + tIdx + ')">+ Couple (2)</button>' + (free >= 4 ? '<button type="button" class="sh-ed-ghost" style="padding:2px 8px;font-size:0.72rem;border-color:#D1D5DB;background:#FFF;font-weight:600;" onclick="window.shEdQuickFillFamily(' + tIdx + ')">+ Family (4)</button>' : '') + '</div>');
    }
    if (window.__SH_BULK_OPEN) {
      h.push('<div id="sh-ed-bulk-box" class="sh-ed-bulk-box"><textarea id="sh-ed-bulk-text" rows="3" class="sh-ed-input" placeholder="Paste late RSVPs or CSV (e.g.&#10;The Harrison Family + 2 kids&#10;Dr. &amp; Mrs. Lin (beef, dairy-free)&#10;Sophia Montgomery, Filet, Gluten-free)"></textarea><div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:6px;flex-wrap:wrap;"><div style="display:flex;gap:4px;"><button type="button" class="sh-ed-ghost" style="padding:3px 8px;font-size:0.75rem;border-color:#D6CFC2;" onclick="window.shEdInsertSampleBulk()">&#10024; Sample RSVPs</button><button type="button" class="sh-ed-ghost" style="padding:3px 8px;font-size:0.75rem;border-color:#1B4D3E;color:#1B4D3E;font-weight:700;" onclick="var fc=document.getElementById(\\\'sh-ed-csv-upload\\\');if(fc)fc.click();">📁 Upload .CSV</button><input type="file" id="sh-ed-csv-upload" accept=".csv,.tsv,.txt" style="display:none;" onchange="window.shEdHandleCsvUpload(event)" /></div><div style="display:flex;gap:6px;"><button type="button" class="sh-ed-ghost" onclick="window.shEdToggleBulk()">Cancel</button><button type="button" id="sh-ed-bulk-submit" class="sh-ed-ka-btn" onclick="window.shEdBulkPaste()">Seat RSVPs (keeps layout)</button></div></div></div>');
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
        h.push('<button type="button" class="sh-ed-ghost" style="width:100%;margin-top:6px;border-color:#C8A96E;color:#78350F;background:#FFFDF7;font-weight:700;padding:5px 8px;font-size:0.78rem;" onclick="window.shEdUnseatGuest(' + tIdx + ',' + sIdx + ')">&#9211; Move to Holding Bench (unseat)</button>');
        h.push('<button type="button" class="sh-ed-remove" onclick="window.shEdRemove(' + tIdx + ',' + sIdx + ')">Remove from guest list</button>');
        h.push('</div>');
      }
      h.push('</div>');
    });
    if (free > 0 && t.guests.length) h.push('<div class="sh-ed-free">' + free + ' empty seat' + (free === 1 ? '' : 's') + '</div>');
    h.push('</div>');
    h.push('<div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;">');
    h.push('<button type="button" class="sh-ed-ghost" style="flex:1;padding:7px 10px;font-size:0.78rem;font-weight:700;background:#FAF8F5;border-color:#C8A96E;color:#78350F;white-space:nowrap;" onclick="window.shEdDuplicateTable(' + tIdx + ')">⎘ Duplicate Table</button>');
    if (!isSweet && tables.length > 2) h.push('<button type="button" class="sh-ed-remove" style="flex:1;padding:7px 10px;font-size:0.78rem;margin:0;white-space:nowrap;" onclick="window.shEdRemoveTable(' + tIdx + ')">Remove table' + (t.guests.length ? ' (re-seat ' + t.guests.length + ')' : '') + '</button>');
    h.push('</div>');
    if (window.shEdKeepApartHtml) h.push(window.shEdKeepApartHtml());
    box.innerHTML = h.join('');
    if (window.shSyncRightPanelUi) window.shSyncRightPanelUi();
  };`;
}

module.exports = { renderSeatEditorClientScript };

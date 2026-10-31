/**
 * SeatHarmony - Room elements (dance floor, DJ, bar, cake table, stage...).
 * Add from a menu with a label, drag to move, drag the corner handle to resize,
 * rotate, rename, change zone, delete. Everything is undoable.
 */

function renderSeatElementsClientScript() {
  return `
  var SH_PX_PER_FT = 8.75;
  var SH_EL_KINDS = {
    dance: { label: 'DANCE FLOOR', w: 210, h: 130, zone: 'loud' },
    dj: { label: 'DJ / BAND', w: 150, h: 56, zone: 'loud' },
    bar: { label: 'BAR', w: 170, h: 46, zone: 'neutral' },
    cake: { label: 'CAKE TABLE', w: 130, h: 46, zone: 'quiet' },
    buffet: { label: 'BUFFET', w: 220, h: 52, zone: 'neutral' },
    photo: { label: 'PHOTO BOOTH', w: 120, h: 84, zone: 'loud' },
    stage: { label: 'STAGE', w: 250, h: 84, zone: 'loud' },
    gifts: { label: 'GIFT TABLE', w: 130, h: 46, zone: 'neutral' },
    custom: { label: 'ROOM ELEMENT', w: 150, h: 50, zone: 'neutral' }
  };
  function shElFt(px) { return Math.round(px / SH_PX_PER_FT); }
  function shElSel() { var i = window.__SH_SELECTED_LANDMARK_IDX, lms = window.__SH_STATE && window.__SH_STATE.landmarks; return (i != null && lms && lms[i]) ? lms[i] : null; }

  /* ---- Placement: find the roomiest free spot ---- */
  function shFreeSpot(w, h) {
    var plan = window.__SH_STATE, roomH = Math.max(680, Number(plan.roomHeight) || 680), rects = [];
    plan.tables.forEach(function(t) {
      if (!t.geometry) shRecomputeGeometry(t);
      var xs = t.geometry.seats.map(function(s) { return s.x; }), ys = t.geometry.seats.map(function(s) { return s.y; });
      var l = Math.min.apply(null, xs) - 26, r = Math.max.apply(null, xs) + 26, tp = Math.min.apply(null, ys) - 26, b = Math.max.apply(null, ys) + 26;
      rects.push({ cx: (l + r) / 2, cy: (tp + b) / 2, w: r - l, h: b - tp });
    });
    (plan.landmarks || []).forEach(function(lm) { var a = ((lm.rot || 0) * Math.PI) / 180, c = Math.abs(Math.cos(a)), sn = Math.abs(Math.sin(a)); rects.push({ cx: lm.x, cy: lm.y, w: lm.w * c + lm.h * sn + 12, h: lm.w * sn + lm.h * c + 12 }); });
    var best = null, bestScore = -1e9;
    for (var y = h / 2 + 24; y <= roomH - h / 2 - 24; y += 30) for (var x = w / 2 + 24; x <= 1120 - w / 2 - 24; x += 30) {
      var gap = 1e9;
      rects.forEach(function(o) { var g = Math.max(Math.abs(x - o.cx) - (w + o.w) / 2, Math.abs(y - o.cy) - (h + o.h) / 2); if (g < gap) gap = g; });
      var score = Math.min(gap, 50) - Math.hypot(x - 560, y - roomH / 2) * 0.002;
      if (score > bestScore) { bestScore = score; best = { x: x, y: y, gap: gap }; }
    }
    return best || { x: 560, y: roomH / 2, gap: -1 };
  }

  window.shToggleElMenu = function(ev) { if (ev) ev.stopPropagation(); var a = document.getElementById('sh-add-menu'); if (a) a.style.display = 'none'; var m = document.getElementById('sh-el-menu'); if (m) m.style.display = m.style.display === 'none' ? 'block' : 'none'; };
  document.addEventListener('click', function() { var m = document.getElementById('sh-el-menu'); if (m) m.style.display = 'none'; });
  window.shAddElement = function(kind) {
    var k = SH_EL_KINDS[kind] || SH_EL_KINDS.custom, m = document.getElementById('sh-el-menu'); if (m) m.style.display = 'none';
    var plan = window.__SH_STATE; if (!plan) return; window.shSnapshot();
    if (!Array.isArray(plan.landmarks)) plan.landmarks = [];
    var spot = shFreeSpot(k.w, k.h);
    plan.landmarks.push({ id: 'lm-' + Date.now(), label: k.label, x: spot.x, y: spot.y, w: k.w, h: k.h, zone: k.zone, rot: 0 });
    window.__SH_SELECTED_LANDMARK_IDX = plan.landmarks.length - 1; window.__SH_SWAP_SOURCE = null; window.__SH_OPEN_GUEST = null;
    shToast(k.label + ' added' + (spot.gap < 0 ? ' (the room is tight, drag it where you want it)' : '') + '. Rename it, drag to move, or drag the corner dot to resize.');
    shRenderAll(); setTimeout(function() { var i = document.getElementById('sh-el-name'); if (i) { i.focus(); i.select(); } }, 40);
  };

  /* ---- Edit selected element ---- */
  window.shElRename = function(v) { var lm = shElSel(); if (!lm) return; window.shSnapshot(); lm.label = String(v || '').trim().toUpperCase().slice(0, 40) || 'ROOM ELEMENT'; shRenderAll(); };
  window.shElSize = function(dw, dh) { var lm = shElSel(); if (!lm) return; window.shSnapshot(); lm.w = Math.max(50, Math.min(700, Math.round((lm.w + dw) / 5) * 5)); lm.h = Math.max(26, Math.min(450, Math.round((lm.h + dh) / 5) * 5)); shRenderAll(); };
  window.shElRotate = function(d) { var lm = shElSel(); if (!lm) return; window.shSnapshot(); lm.rot = (((lm.rot || 0) + d) % 360 + 360) % 360; shRenderAll(); };
  window.shElZone = function(z) { var lm = shElSel(); if (!lm) return; window.shSnapshot(); lm.zone = z; shRenderAll(); };
  window.shElDone = function() { window.__SH_SELECTED_LANDMARK_IDX = null; shRenderAll(); };
  window.shElDelete = function() {
    var i = window.__SH_SELECTED_LANDMARK_IDX, lms = window.__SH_STATE.landmarks; if (i == null || !lms || !lms[i]) return;
    window.shSnapshot(); var name = lms[i].label; lms.splice(i, 1); window.__SH_SELECTED_LANDMARK_IDX = null;
    shToast(name + ' removed. Tap Undo to bring it back.'); shRenderAll();
  };
  window.shElementPanelHtml = function() {
    var lm = shElSel(), z = (lm.zone === 'loud' || lm.zone === 'quiet') ? lm.zone : 'neutral', h = [];
    h.push('<div class="sh-ed-panel-top"><span>Room Element Inspector</span><button type="button" id="sh-panel-minimize-btn" class="sh-ed-panel-hide-btn" onclick="window.shToggleRightPanel(true)" title="Minimize right side panel to expand floorplan">Minimize &#8677;</button></div>');
    h.push('<div class="sh-ed-head"><input id="sh-el-name" class="sh-ed-title" value="' + shEsc(lm.label) + '" aria-label="Element name" onchange="window.shElRename(this.value)" onkeydown="if(event.key===\\'Enter\\')this.blur()" /><div class="sh-ed-meta"><span>Room element</span><button type="button" class="sh-ed-ka-btn" onclick="window.shElDone()">Done</button></div></div>');
    h.push('<div class="sh-ed-label">Size</div>');
    h.push('<div class="sh-el-row"><span>Width</span><span class="sh-ed-stepper"><button type="button" aria-label="Narrower" onclick="window.shElSize(-18,0)">&minus;</button><b>' + shElFt(lm.w) + ' ft</b><button type="button" aria-label="Wider" onclick="window.shElSize(18,0)">+</button></span></div>');
    h.push('<div class="sh-el-row"><span>Depth</span><span class="sh-ed-stepper"><button type="button" aria-label="Shallower" onclick="window.shElSize(0,-9)">&minus;</button><b>' + shElFt(lm.h) + ' ft</b><button type="button" aria-label="Deeper" onclick="window.shElSize(0,9)">+</button></span></div>');
    h.push('<div class="sh-ed-label">Rotate</div><div class="sh-ed-rot"><button type="button" onclick="window.shElRotate(-15)">&#8634; 15&deg;</button><button type="button" onclick="window.shElRotate(15)">15&deg; &#8635;</button><button type="button" onclick="window.shElRotate(90)">Turn 90&deg;</button></div>');
    h.push('<div class="sh-ed-label">Zone</div><div class="sh-ed-seg">');
    [['loud', 'Music'], ['neutral', 'Neutral'], ['quiet', 'Quiet']].forEach(function(x) { h.push('<button type="button" class="' + (z === x[0] ? 'on' : '') + '" onclick="window.shElZone(\\'' + x[0] + '\\')">' + x[1] + '</button>'); });
    h.push('</div><div class="sh-ed-ka-empty" style="margin-top:8px;">Drag it on the floorplan to move it, or drag the dot on its corner to resize.</div>');
    h.push('<button type="button" class="sh-ed-remove" onclick="window.shElDelete()">Delete this element</button>');
    return h.join('');
  };

  /* ---- Corner handle: drag to resize (in the element's own rotated space) ---- */
  window.shElementHandle = function(lm, idx) {
    if (window.__SH_SELECTED_LANDMARK_IDX !== idx) return '';
    return '<circle cx="' + (lm.w / 2) + '" cy="' + (lm.h / 2) + '" r="9" fill="#FFFFFF" stroke="#8C2D19" stroke-width="2.4" style="cursor:nwse-resize;" onmousedown="window.shStartElResize(' + idx + ',event)" ontouchstart="window.shStartElResize(' + idx + ',event)"><title>Drag to resize</title></circle>';
  };
  window.shStartElResize = function(idx, ev) {
    if (ev) { ev.stopPropagation(); if (ev.type === 'mousedown' && ev.preventDefault) ev.preventDefault(); }
    var lm = window.__SH_STATE.landmarks[idx]; if (!lm) return; window.shSnapshot();
    var onMove = function(mv) {
      if (mv.cancelable) mv.preventDefault();
      var p = shSvgCoord(mv), th = -((lm.rot || 0) * Math.PI) / 180, dx = p.x - lm.x, dy = p.y - lm.y;
      var lx = dx * Math.cos(th) - dy * Math.sin(th), ly = dx * Math.sin(th) + dy * Math.cos(th);
      lm.w = Math.max(50, Math.min(700, Math.round(Math.abs(lx) * 2 / 5) * 5)); lm.h = Math.max(26, Math.min(450, Math.round(Math.abs(ly) * 2 / 5) * 5));
      shRenderFloorplanSvg();
    };
    var onUp = function() {
      window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onUp); shRenderAll();
    };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false }); window.addEventListener('touchend', onUp);
  };

  /* ---- Marquee Box Selection (draw a box on the floorplan to select guests, tables & elements) ---- */
  window.__SH_BOX_RECT = null;
  window.__SH_BOX_SEL = null;
  window.shHasBoxSelection = function() {
    var b = window.__SH_BOX_SEL;
    return Boolean(b && ((b.tables && b.tables.length) || (b.guests && b.guests.length) || (b.landmarks && b.landmarks.length)));
  };
  window.shClearBoxSelection = function(silent) {
    window.__SH_BOX_RECT = null;
    window.__SH_BOX_SEL = null;
    if (!silent) shRenderAll();
  };
  window.shFormatBoxSelSummary = function(sel) {
    if (!sel) return '';
    var parts = [];
    if (sel.guests && sel.guests.length) parts.push(sel.guests.length + ' ' + (sel.guests.length === 1 ? 'person' : 'people'));
    if (sel.tables && sel.tables.length) parts.push(sel.tables.length + ' ' + (sel.tables.length === 1 ? 'table' : 'tables'));
    if (sel.landmarks && sel.landmarks.length) parts.push(sel.landmarks.length + ' ' + (sel.landmarks.length === 1 ? 'element' : 'elements'));
    return parts.join(', ');
  };
  window.shComputeHitsInRect = function(x1, y1, x2, y2) {
    var plan = window.__SH_STATE || {};
    var tables = [], guests = [], landmarks = [];
    (plan.tables || []).forEach(function(t, ti) {
      if (!t.geometry) shRecomputeGeometry(t);
      var tx = t.x || 0, ty = t.y || 0, hw = Math.round(((t.geometry && t.geometry.tableWidth) || 96) * 0.35), hh = Math.round(((t.geometry && t.geometry.tableHeight) || 96) * 0.35);
      if (tx + hw >= x1 && tx - hw <= x2 && ty + hh >= y1 && ty - hh <= y2) tables.push(ti);
      (t.geometry.seats || []).forEach(function(s, si) {
        var g = t.guests && t.guests[si];
        if (!g) return;
        if (s.x + 12 >= x1 && s.x - 12 <= x2 && s.y + 12 >= y1 && s.y - 12 <= y2) {
          guests.push({ t: ti, s: si, uid: g.uid || (ti + ':' + si), name: g.name });
        }
      });
    });
    (plan.landmarks || []).forEach(function(lm, li) {
      var lx = lm.x || 0, ly = lm.y || 0, lw = Math.round((lm.w || 140) * 0.35), lh = Math.round((lm.h || 42) * 0.35);
      if (lx + lw >= x1 && lx - lw <= x2 && ly + lh >= y1 && ly - lh <= y2) landmarks.push(li);
    });
    return { tables: tables, guests: guests, landmarks: landmarks };
  };
  window.shIsTableBoxSelected = function(tIdx) {
    return Boolean(window.__SH_BOX_SEL && window.__SH_BOX_SEL.tables && window.__SH_BOX_SEL.tables.indexOf(tIdx) !== -1);
  };
  window.shIsSeatBoxSelected = function(tIdx, sIdx) {
    if (!window.__SH_BOX_SEL || !window.__SH_BOX_SEL.guests) return false;
    for (var i = 0; i < window.__SH_BOX_SEL.guests.length; i++) {
      var g = window.__SH_BOX_SEL.guests[i];
      if (g.t === tIdx && g.s === sIdx) return true;
    }
    return false;
  };
  window.shIsLandmarkBoxSelected = function(lmIdx) {
    return Boolean(window.__SH_BOX_SEL && window.__SH_BOX_SEL.landmarks && window.__SH_BOX_SEL.landmarks.indexOf(lmIdx) !== -1);
  };
  window.shBoxMoveGuestsToTable = function(dstTIdx) {
    dstTIdx = Number(dstTIdx);
    var plan = window.__SH_STATE, sel = window.__SH_BOX_SEL;
    if (!plan || !plan.tables || !plan.tables[dstTIdx] || !sel || !sel.guests || !sel.guests.length) return;
    window.shSnapshot();
    var dst = plan.tables[dstTIdx], moved = 0;
    var byTable = {};
    sel.guests.forEach(function(h) {
      if (h.t === dstTIdx) return;
      if (!byTable[h.t]) byTable[h.t] = [];
      byTable[h.t].push(h.s);
    });
    var picked = [];
    Object.keys(byTable).forEach(function(tk) {
      var ti = Number(tk), tb = plan.tables[ti];
      if (!tb || !tb.guests) return;
      byTable[tk].sort(function(a, b) { return b - a; }).forEach(function(si) {
        if (tb.guests[si]) picked.unshift(tb.guests.splice(si, 1)[0]);
      });
      shRecomputeGeometry(tb);
    });
    picked.forEach(function(g) { dst.guests.push(g); moved++; });
    dst.capacity = Math.max(dst.capacity || 8, dst.guests.length);
    shRecomputeGeometry(dst);
    window.__SH_BOX_SEL = null;
    window.__SH_SELECTED_TABLE_IDX = dstTIdx;
    shToast('\\u2713 Moved ' + moved + ' selected ' + (moved === 1 ? 'person' : 'people') + ' to ' + shEdTableLabel(dst) + '. Tap Undo to reverse.');
    shRenderAll();
  };
  window.shBoxSetMeal = function(mealName) {
    var plan = window.__SH_STATE, sel = window.__SH_BOX_SEL;
    if (!plan || !sel || !sel.guests || !sel.guests.length) return;
    window.shSnapshot();
    var count = 0;
    sel.guests.forEach(function(h) {
      var g = plan.tables[h.t] && plan.tables[h.t].guests && plan.tables[h.t].guests[h.s];
      if (g) { g.meal = mealName; count++; }
    });
    shToast('\\u2713 Updated meal to ' + mealName + ' for ' + count + ' selected ' + (count === 1 ? 'person' : 'people') + '.');
    shRenderAll();
  };
  window.shBoxSetGroup = function(grpIdx) {
    var plan = window.__SH_STATE, sel = window.__SH_BOX_SEL;
    if (!plan || !sel || !sel.guests || !sel.guests.length) return;
    window.shSnapshot();
    var count = 0, grp = (typeof SH_GROUPS !== 'undefined' && SH_GROUPS[grpIdx]) ? SH_GROUPS[grpIdx] : { key: 'other', label: 'Other guests' };
    sel.guests.forEach(function(h) {
      var g = plan.tables[h.t] && plan.tables[h.t].guests && plan.tables[h.t].guests[h.s];
      if (g) { g.grp = grp.key; count++; }
    });
    shToast('\\u2713 Set group to ' + grp.label + ' for ' + count + ' selected ' + (count === 1 ? 'person' : 'people') + '.');
    shRenderAll();
  };
  window.shBoxDeleteSelection = function() {
    var plan = window.__SH_STATE, sel = window.__SH_BOX_SEL;
    if (!plan || !window.shHasBoxSelection()) return;
    window.shSnapshot();
    var summary = window.shFormatBoxSelSummary(sel);
    var delTblSet = {};
    (sel.tables || []).forEach(function(ti) {
      var tb = plan.tables[ti];
      if (tb && shNormalizeShape(tb.shape) !== 'sweetheart') delTblSet[ti] = true;
    });
    var guestsByTbl = {};
    (sel.guests || []).forEach(function(h) {
      if (delTblSet[h.t]) return;
      if (!guestsByTbl[h.t]) guestsByTbl[h.t] = [];
      guestsByTbl[h.t].push(h.s);
    });
    Object.keys(guestsByTbl).forEach(function(tk) {
      var ti = Number(tk), tb = plan.tables[ti];
      if (!tb || !tb.guests) return;
      guestsByTbl[tk].sort(function(a, b) { return b - a; }).forEach(function(si) {
        if (tb.guests[si]) tb.guests.splice(si, 1);
      });
      shRecomputeGeometry(tb);
    });
    var tblIndices = Object.keys(delTblSet).map(Number).sort(function(a, b) { return b - a; });
    tblIndices.forEach(function(ti) {
      if (plan.tables.length > 2) plan.tables.splice(ti, 1);
    });
    plan.tables.forEach(function(tb, idx) {
      tb.number = idx + 1;
      if (idx > 0 && /^Table \\d+$/i.test(tb.name)) tb.name = 'Table ' + (idx + 1);
      shRecomputeGeometry(tb);
    });
    if (sel.landmarks && sel.landmarks.length && Array.isArray(plan.landmarks)) {
      sel.landmarks.slice().sort(function(a, b) { return b - a; }).forEach(function(li) {
        if (plan.landmarks[li]) plan.landmarks.splice(li, 1);
      });
    }
    window.__SH_BOX_SEL = null;
    window.__SH_SELECTED_LANDMARK_IDX = null;
    window.__SH_SELECTED_TABLE_IDX = Math.min(window.__SH_SELECTED_TABLE_IDX || 0, plan.tables.length - 1);
    shSyncTableSelectAndPills();
    shToast('\\u2713 Removed selected ' + summary + '. Tap Undo to restore.');
    shRenderAll();
  };
  window.shBoxPanelHtml = function() {
    var sel = window.__SH_BOX_SEL, plan = window.__SH_STATE;
    if (!sel || !plan) return '';
    var gCount = (sel.guests || []).length, tCount = (sel.tables || []).length, lCount = (sel.landmarks || []).length;
    var summary = window.shFormatBoxSelSummary(sel);
    var h = ['<div class="sh-ed-panel-top"><span>Box Selection</span><button type="button" id="sh-panel-minimize-btn" class="sh-ed-panel-hide-btn" onclick="window.shToggleRightPanel(true)" title="Minimize right side panel to expand floorplan">Minimize &#8677;</button></div>'];
    h.push('<div class="sh-ed-head"><div class="sh-ed-title" style="padding:0;margin:0;">Selected ' + shEsc(summary) + '</div><div class="sh-ed-meta"><span>Drag any selected table to move together, or bulk-edit below</span><button type="button" class="sh-ed-ka-btn" onclick="window.shClearBoxSelection()">Clear</button></div></div>');
    if (tCount > 0) {
      h.push('<div class="sh-ed-label">Tables in box (' + tCount + ')</div><div class="sh-ed-chips" style="margin-bottom:8px;">');
      sel.tables.forEach(function(ti) {
        var tb = plan.tables[ti];
        if (tb) h.push('<button type="button" class="sh-ed-chip" onclick="window.shClearBoxSelection(true);window.shSelectTable(' + ti + ')">' + shEsc(shEdTableLabel(tb)) + ' <small>' + tb.guests.length + '/' + tb.capacity + '</small></button>');
      });
      h.push('</div>');
    }
    if (lCount > 0 && plan.landmarks) {
      h.push('<div class="sh-ed-label">Room elements in box (' + lCount + ')</div><div class="sh-ed-chips" style="margin-bottom:8px;">');
      sel.landmarks.forEach(function(li) {
        var lm = plan.landmarks[li];
        if (lm) h.push('<button type="button" class="sh-ed-chip" onclick="window.shClearBoxSelection(true);window.shSelectLandmark(' + li + ')">' + shEsc(lm.label) + '</button>');
      });
      h.push('</div>');
    }
    if (gCount > 0) {
      h.push('<div class="sh-ed-label">Move all ' + gCount + ' selected ' + (gCount === 1 ? 'person' : 'people') + ' to table</div><div class="sh-ed-chips" style="margin-bottom:8px;">');
      plan.tables.forEach(function(tb, ti) {
        var free = Math.max(0, (tb.capacity || 8) - tb.guests.length);
        h.push('<button type="button" class="sh-ed-chip" onclick="window.shBoxMoveGuestsToTable(' + ti + ')">' + shEsc(shEdTableLabel(tb)) + ' <small>' + (free > 0 ? free + ' open' : '+chairs') + '</small></button>');
      });
      h.push('</div>');
      h.push('<div class="sh-ed-label">Set meal for all ' + gCount + ' selected</div><div class="sh-ed-seg wrap" style="margin-bottom:8px;">');
      [['Filet Mignon', 'Beef'], ['Pan-Seared Halibut', 'Fish'], ['Herb Roasted Chicken', 'Chicken'], ['Vegan Risotto', 'Vegan'], ['Vegetarian Pasta', 'Veg'], ['Kids Chicken Tenders', 'Kids']].forEach(function(m) {
        h.push('<button type="button" onclick="window.shBoxSetMeal(\\'' + m[0] + '\\')">' + m[1] + '</button>');
      });
      h.push('</div>');
      h.push('<div class="sh-ed-label">People in box (' + gCount + ')</div><div class="sh-ed-list" style="max-height:220px;overflow-y:auto;margin-bottom:10px;">');
      sel.guests.forEach(function(item, idx) {
        var tb = plan.tables[item.t], g = tb && tb.guests && tb.guests[item.s];
        if (!g) return;
        h.push('<div class="sh-ed-item"><div class="sh-ed-row" onclick="window.shClearBoxSelection(true);window.shSelectTable(' + item.t + ');window.shEdOpen(' + item.t + ',' + item.s + ')"><span class="sh-ed-seat">' + (idx + 1) + '</span>' + (window.shGroupDot ? window.shGroupDot(g) : '') + '<span class="sh-ed-name">' + shEsc(g.name) + '</span><span class="sh-ed-tag">' + shEsc(shEdTableLabel(tb)) + '</span></div></div>');
      });
      h.push('</div>');
    }
    h.push('<button type="button" id="sh-box-delete-btn" class="sh-ed-remove" onclick="window.shBoxDeleteSelection()">Delete selected (' + shEsc(summary) + ')</button>');
    return h.join('');
  };
  document.addEventListener('mousedown', function(ev) {
    if (!ev || ev.button !== 0) return;
    var svg = document.getElementById('sh-floorplan-svg');
    if (!svg || !ev.target || !(ev.target === svg || svg.contains(ev.target))) return;
    if (ev.target.closest && ev.target.closest('[data-seat-target], [data-table-group], [data-lm-group], [onmousedown]')) return;
    if (ev.cancelable) ev.preventDefault();
    var fastCoord = window.shFastSvgTransform ? window.shFastSvgTransform(svg) : shSvgCoord;
    var startPt = fastCoord(ev), moved = false;
    var mGroup = document.getElementById('sh-marquee-live');
    var mRect = document.getElementById('sh-marquee-rect');
    var mBadge = document.getElementById('sh-marquee-badge');
    var mText = document.getElementById('sh-marquee-text');
    var seatRings = {}, tblBoxes = {}, lmBoxes = {};
    svg.querySelectorAll('[data-seat-ring]').forEach(function(el) { seatRings[el.getAttribute('data-seat-ring')] = el; });
    svg.querySelectorAll('[data-box-tbl]').forEach(function(el) { tblBoxes[el.getAttribute('data-box-tbl')] = el; });
    svg.querySelectorAll('[data-box-lm]').forEach(function(el) { lmBoxes[el.getAttribute('data-box-lm')] = el; });
    var onMove = function(mv) {
      var cur = fastCoord(mv);
      var x = Math.min(startPt.x, cur.x), y = Math.min(startPt.y, cur.y);
      var w = Math.abs(cur.x - startPt.x), h = Math.abs(cur.y - startPt.y);
      if (w > 4 || h > 4) moved = true;
      if (!moved) return;
      if (mv.cancelable) mv.preventDefault();
      window.__SH_BOX_RECT = { x: x, y: y, w: w, h: h };
      var hits = window.shComputeHitsInRect(x, y, x + w, y + h);
      window.__SH_BOX_SEL = hits;
      if (mGroup && mRect) {
        mGroup.style.display = 'block';
        mRect.setAttribute('x', x); mRect.setAttribute('y', y);
        mRect.setAttribute('width', w); mRect.setAttribute('height', h);
        var hitMap = {}, tMap = {}, lMap = {};
        (hits.guests || []).forEach(function(g) { hitMap[g.t + ':' + g.s] = true; });
        (hits.tables || []).forEach(function(ti) { tMap[ti] = true; });
        (hits.landmarks || []).forEach(function(li) { lMap[li] = true; });
        Object.keys(seatRings).forEach(function(k) { seatRings[k].style.display = hitMap[k] ? 'block' : 'none'; });
        Object.keys(tblBoxes).forEach(function(k) { tblBoxes[k].style.display = tMap[k] ? 'block' : 'none'; });
        Object.keys(lmBoxes).forEach(function(k) { lmBoxes[k].style.display = lMap[k] ? 'block' : 'none'; });
        var bsSum = window.shFormatBoxSelSummary(hits);
        if (mBadge && mText) {
          if (bsSum) {
            var by = Math.max(8, y - 24);
            mBadge.setAttribute('x', x); mBadge.setAttribute('y', by);
            mBadge.setAttribute('width', Math.max(120, bsSum.length * 7 + 22));
            mBadge.style.display = 'block';
            mText.setAttribute('x', x + 10); mText.setAttribute('y', by + 14);
            mText.textContent = bsSum;
          } else {
            mBadge.style.display = 'none';
            mText.textContent = '';
          }
        }
      } else {
        shRenderFloorplanSvg();
      }
    };
    var onUp = function() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (mGroup) mGroup.style.display = 'none';
      var rect = window.__SH_BOX_RECT;
      window.__SH_BOX_RECT = null;
      if (!moved || !rect || (rect.w < 6 && rect.h < 6)) {
        if (window.__SH_LAST_DRAG_END && (Date.now() - window.__SH_LAST_DRAG_END < 40)) return;
        if (window.shHasBoxSelection()) {
          window.shClearBoxSelection();
          shToast('Cleared box selection.');
        }
        return;
      }
      window.__SH_LAST_DRAG_END = Date.now();
      var hits = window.shComputeHitsInRect(rect.x, rect.y, rect.x + rect.w, rect.y + rect.h);
      if (!hits.tables.length && !hits.guests.length && !hits.landmarks.length) {
        window.__SH_BOX_SEL = null;
        shRenderAll();
        shToast('No tables or guests inside that box.');
        return;
      }
      window.__SH_BOX_SEL = hits;
      window.__SH_OPEN_GUEST = null;
      window.__SH_SWAP_SOURCE = null;
      if (hits.tables.length === 1 && !hits.landmarks.length) {
        window.__SH_SELECTED_TABLE_IDX = hits.tables[0];
      }
      var sum = window.shFormatBoxSelSummary(hits);
      shToast('\\u2B1A Selected ' + sum + ' · Drag to move together, bulk-edit in side panel, or press Delete.');
      shRenderAll();
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });`;
}

module.exports = { renderSeatElementsClientScript };

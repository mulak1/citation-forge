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
  });

  /* ---- Acoustic Decibel Falloff Zones around DJ / Band / Loud Speakers ---- */
  window.shRenderAcousticZoneSvg = function(plan) {
    if (!plan || !plan.landmarks || !plan.landmarks.length) return '';
    var out = [];
    plan.landmarks.forEach(function(lm) {
      var isLoud = lm.zone === 'loud' || /dj|band|subwoofer|speaker|stage/i.test(lm.label || '');
      if (!isLoud) return;
      var cx = lm.x || 560, cy = lm.y || 200;
      var rCore = Math.max(90, Math.round((lm.w || 120) * 0.75 + 40));
      var rTrans = rCore + 75;
      out.push('<g class="sh-acoustic-zone" pointer-events="none">');
      out.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + rTrans + '" fill="none" stroke="#F59E0B" stroke-width="1.1" stroke-dasharray="4 4" opacity="0.32"/>');
      out.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + rCore + '" fill="rgba(244,63,94,0.035)" stroke="#F43F5E" stroke-width="1.3" stroke-dasharray="3 3" opacity="0.45"/>');
      var tagY = cy - rCore + 14;
      out.push('<text x="' + cx + '" y="' + tagY + '" text-anchor="middle" font-size="9.5" font-weight="700" fill="#9F1239" opacity="0.75" letter-spacing="0.04em">85dB+ SPEAKER BUFFER (15FT)</text>');
      out.push('</g>');
    });
    return out.join('');
  };

  /* ---- Banquet Captain 120-Degree Sweetheart Sightline Corridor ---- */
  window.__SH_SIGHTLINE_CONE = false;
  window.shToggleSightlineCone = function() {
    window.__SH_SIGHTLINE_CONE = !window.__SH_SIGHTLINE_CONE;
    var btn = document.getElementById('sh-toolbar-sightline-btn');
    if (btn) {
      btn.style.background = window.__SH_SIGHTLINE_CONE ? '#ECFDF5' : '';
      btn.style.borderColor = window.__SH_SIGHTLINE_CONE ? '#10B981' : '';
      btn.style.color = window.__SH_SIGHTLINE_CONE ? '#065F46' : '';
    }
    shToast(window.__SH_SIGHTLINE_CONE ? '\\u2713 Sightline Cone: ON (120\\u00b0 visual corridor to dance floor & entrance)' : 'Sightline Cone: OFF');
    shRenderAll();
  };
  window.shRenderSightlineConeSvg = function(plan) {
    if (!window.__SH_SIGHTLINE_CONE || !plan || !plan.tables || !plan.tables.length) return '';
    var head = plan.tables.find(function(t) { return (typeof shNormalizeShape === 'function' ? shNormalizeShape(t.shape) : t.shape) === 'sweetheart' || t.number === 1; }) || plan.tables[0];
    if (!head) return '';
    var hx = head.x || 560, hy = head.y || 90;
    var roomH = Number(plan.roomHeight) || 680;
    var reach = Math.max(380, roomH - hy - 50);
    var radL = (90 + 55) * (Math.PI / 180), radR = (90 - 55) * (Math.PI / 180);
    var x1 = Math.round(hx + reach * Math.cos(radL)), y1 = Math.round(hy + reach * Math.sin(radL));
    var x2 = Math.round(hx + reach * Math.cos(radR)), y2 = Math.round(hy + reach * Math.sin(radR));
    var pathD = 'M ' + hx + ' ' + (hy + 18) + ' L ' + x1 + ' ' + y1 + ' A ' + reach + ' ' + reach + ' 0 0 0 ' + x2 + ' ' + y2 + ' Z';
    return '<g class="sh-sightline-cone" pointer-events="none">' +
      '<path d="' + pathD + '" fill="rgba(16,185,129,0.045)" stroke="#10B981" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.65"/>' +
      '<line x1="' + hx + '" y1="' + (hy + 18) + '" x2="' + hx + '" y2="' + (hy + reach) + '" stroke="#10B981" stroke-width="1" stroke-dasharray="2 4" opacity="0.45"/>' +
      '<text x="' + hx + '" y="' + (hy + Math.round(reach * 0.52)) + '" text-anchor="middle" font-size="10" font-weight="800" fill="#065F46" opacity="0.8" letter-spacing="0.05em">SWEETHEART SIGHTLINE &middot; 120&deg; CLEAR OBSERVATION</text>' +
      '</g>';
  };

  /* ---- Auto-Capitalize Names Engine ---- */
  function shTitleCaseName(str) {
    if (!str || typeof str !== 'string') return '';
    return str.trim().split(/\\s+/).map(function(word) {
      if (/^(jr|sr)\\.?$/i.test(word)) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      if (/^(ii|iii|iv|v|vi)$/i.test(word)) return word.toUpperCase();
      if (/^o'[a-z]/i.test(word)) return "O'" + word.charAt(2).toUpperCase() + word.slice(3).toLowerCase();
      if (/^mc[a-z]/i.test(word)) return "Mc" + word.charAt(2).toUpperCase() + word.slice(3).toLowerCase();
      if (word.indexOf('-') > 0) {
        return word.split('-').map(function(part) {
          return part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : '';
        }).join('-');
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }
  window.shTitleCaseName = shTitleCaseName;

  window.shAutoCapitalizeAllNames = function() {
    if (typeof shCloseMenus === 'function') shCloseMenus();
    var plan = window.__SH_STATE; if (!plan || !plan.tables) return;
    var changed = 0;
    if (typeof window.shSnapshot === 'function') window.shSnapshot('Auto-Capitalize Guest Names');
    plan.tables.forEach(function(tbl) {
      (tbl.guests || []).forEach(function(g) {
        if (!g.name) return;
        var fixed = shTitleCaseName(g.name);
        if (fixed && fixed !== g.name) {
          g.name = fixed;
          changed++;
        }
      });
    });
    (plan.unassignedGuests || []).forEach(function(g) {
      if (!g.name) return;
      var fixed = shTitleCaseName(g.name);
      if (fixed && fixed !== g.name) {
        g.name = fixed;
        changed++;
      }
    });
    plan.hasUserEdits = true;
    if (typeof shToast === 'function') {
      shToast(changed > 0 ? ('\\u2713 Capitalized ' + changed + ' guest names (fixed all-caps & lowercase)!') : '\\u2713 All guest names already properly capitalized!');
    }
    if (typeof shRenderAll === 'function') shRenderAll();
  };

  window.shPrintTablePlacard = function(tIdx) {
    var plan = window.__SH_STATE; if (!plan || !plan.tables) return;
    var t = plan.tables[tIdx]; if (!t) return;
    var tName = t.name || ('Table ' + (tIdx + 1));
    var eventTitle = plan.coupleNames || plan.title || 'Wedding Reception';
    var dateOrVenue = (plan.weddingDate || plan.date || '') + (plan.venueName ? (' · ' + plan.venueName) : '');
    var guests = t.guests || [];
    var guestsHtml = guests.map(function(g, idx) {
      var note = '';
      if (g.meal) note += ' <span style="font-size:10px;padding:1px 5px;background:#F5EFE6;border-radius:4px;color:#78350F;">' + (g.meal === 'vegetarian' ? '🌱 Veg' : (g.meal === 'vegan' ? '🌱 Vegan' : (g.meal === 'fish' ? '🐟 Fish' : (g.meal === 'beef' ? '🥩 Beef' : g.meal)))) + '</span>';
      if (g.allergy) note += ' <span style="font-size:10px;padding:1px 5px;background:#FEE2E2;border-radius:4px;color:#991B1B;">⚠️ ' + g.allergy + '</span>';
      return '<li style="padding:4px 0;border-bottom:1px dashed #E5E7EB;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#1F2937;"><span><strong>' + (idx + 1) + '.</strong> ' + g.name + '</span><span>' + note + '</span></li>';
    }).join('');

    var modalId = 'sh-placard-modal';
    var exist = document.getElementById(modalId);
    if (exist) exist.remove();

    var div = document.createElement('div');
    div.id = modalId;
    div.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto;';
    div.innerHTML = '<style>' +
      '@media print {' +
        'body * { visibility: hidden !important; }' +
        '#sh-placard-print-area, #sh-placard-print-area * { visibility: visible !important; }' +
        '#sh-placard-print-area { position: fixed !important; left: 0 !important; top: 0 !important; width: 4in !important; height: 6in !important; margin: 0 !important; padding: 24px !important; box-shadow: none !important; border: 2px solid #1B4D3E !important; }' +
        '@page { size: 4in 6in; margin: 0; }' +
      '}' +
      '</style>' +
      '<div style="background:#FFFFFF;border-radius:12px;max-width:480px;width:100%;box-shadow:0 20px 40px rgba(0,0,0,0.25);overflow:hidden;position:relative;">' +
        '<div style="background:#1B4D3E;color:#FFFFFF;padding:12px 18px;display:flex;justify-content:space-between;align-items:center;">' +
          '<div style="font-size:14px;font-weight:700;">🪧 4" × 6" Table QR Placard &amp; Menu Stand</div>' +
          '<button type="button" onclick="document.getElementById(\\'' + modalId + '\\').remove()" style="background:transparent;border:none;color:#FFFFFF;font-size:18px;cursor:pointer;line-height:1;">&times;</button>' +
        '</div>' +
        '<div style="padding:16px;background:#FAF8F5;display:flex;justify-content:center;">' +
          '<div id="sh-placard-print-area" style="width:340px;height:510px;background:#FFFFFF;border:3px double #C8A96E;box-shadow:0 4px 14px rgba(0,0,0,0.08);padding:24px 20px;display:flex;flex-direction:column;justify-content:space-between;box-sizing:border-box;font-family:Georgia,serif;text-align:center;">' +
            '<div>' +
              '<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8C2D19;font-weight:700;margin-bottom:4px;">' + (eventTitle) + '</div>' +
              (dateOrVenue ? '<div style="font-size:10px;color:#6B7280;margin-bottom:12px;">' + dateOrVenue + '</div>' : '<div style="margin-bottom:8px;"></div>') +
              '<div style="font-size:24px;font-weight:700;color:#1B4D3E;letter-spacing:0.5px;padding-bottom:8px;border-bottom:1px solid #E5E7EB;">' + (tName) + '</div>' +
              '<div style="font-size:10px;color:#78350F;font-family:sans-serif;font-weight:600;margin-top:6px;letter-spacing:0.5px;">' + guests.length + ' RESERVED SEATS · CLOCKWISE 12:00</div>' +
            '</div>' +
            '<ul style="list-style:none;padding:0;margin:12px 0;text-align:left;overflow-y:auto;max-height:220px;font-family:system-ui,-apple-system,sans-serif;">' +
              (guestsHtml || '<li style="font-size:12px;color:#9CA3AF;text-align:center;padding:12px 0;">No guests assigned yet</li>') +
            '</ul>' +
            '<div style="border-top:1px solid #E5E7EB;padding-top:10px;display:flex;align-items:center;justify-content:space-between;text-align:left;">' +
              '<div style="font-family:system-ui,sans-serif;">' +
                '<div style="font-size:10px;font-weight:700;color:#1B4D3E;">SEATHARMONY DIGITAL GUESTBOOK</div>' +
                '<div style="font-size:9px;color:#6B7280;">Scan to view table menu &amp; share photos</div>' +
              '</div>' +
              '<div style="width:42px;height:42px;border:1px solid #D1D5DB;border-radius:4px;display:flex;align-items:center;justify-content:center;background:#F9FAFB;font-size:18px;">📱</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div style="padding:12px 18px;background:#FFFFFF;border-top:1px solid #E5E7EB;display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<span style="font-size:12px;color:#6B7280;">Standard 4" × 6" Acrylic Stand / Card Frame</span>' +
          '<div style="display:flex;gap:8px;">' +
            '<button type="button" class="btn btn-outline" style="padding:6px 12px;font-size:13px;" onclick="document.getElementById(\\'' + modalId + '\\').remove()">Close</button>' +
            '<button type="button" class="btn btn-emerald" style="padding:6px 14px;font-size:13px;font-weight:700;" onclick="window.print()">🖨️ Print 4"×6" Placard</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(div);
  };

  window.shPrintMasterVendorBrief = function() {
    var plan = window.__SH_STATE; if (!plan || !plan.tables) return;
    var tablesArr = plan.tables || [];
    var eventTitle = plan.coupleNames || plan.title || 'Wedding Reception';
    var dateOrVenue = (plan.weddingDate || plan.date || '') + (plan.venueName ? (' · ' + plan.venueName) : '');

    var headTable = tablesArr.find(function(t) { return t.kind === 'sweetheart2' || t.isSweetheart || /head|sweetheart/i.test(t.name || ''); }) || tablesArr[0];
    var headGuests = (headTable && headTable.guests && headTable.guests.map(function(g) { return g.name; }).join(', ')) || 'Couple';

    var vipRowsHtml = tablesArr.slice(0, 4).map(function(t, idx) {
      var tName = t.name || ('Table ' + (idx + 1));
      var guests = (t.guests || []).map(function(g) { return g.name; }).join(', ');
      return '<tr style="border-bottom:1px solid #E5E7EB;">' +
        '<td style="padding:6px 8px;font-weight:700;color:#1B4D3E;font-size:12px;">' + shEsc(tName) + '</td>' +
        '<td style="padding:6px 8px;font-size:12px;color:#374151;">' + (shEsc(guests) || '<em>Unassigned</em>') + '</td>' +
        '<td style="padding:6px 8px;font-size:11px;color:#78350F;font-weight:600;">' + (idx === 0 ? 'Primary Photo Focus &bull; Speeches Anchor' : (idx === 1 ? 'Parents of the Bride' : (idx === 2 ? 'Parents of the Groom' : 'Bridal Party &amp; Toasts'))) + '</td>' +
      '</tr>';
    }).join('');

    var printWin = window.open('', '_blank');
    if (!printWin) { window.print(); return; }
    printWin.document.write('<!DOCTYPE html><html><head><title>Master Vendor & VIP Seating Brief - ' + shEsc(eventTitle) + '</title><style>@page { size: 8.5in 11in; margin: 0.5in; } body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; color: #1F2937; } table { width: 100%; border-collapse: collapse; } th { text-align: left; padding: 8px; background: #1B4D3E; color: #FFFFFF; font-size: 11px; text-transform: uppercase; } @media print { .sh-no-print { display: none !important; } } </style></head><body>' +
      '<div class="sh-no-print" style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;background:#FAF8F5;padding:12px 16px;border:1px solid #E2D9C8;border-radius:8px;">' +
        '<div><strong>Master Vendor &amp; VIP Seating Brief</strong> &middot; DJ, Photographer &amp; Coordinator Brief</div>' +
        '<button onclick="window.print()" style="padding:8px 18px;background:#1B4D3E;color:#FFFFFF;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">🖨️ Print Vendor Brief</button>' +
      '</div>' +
      '<div style="border:3px double #C8A96E;padding:24px;border-radius:8px;background:#FFFFFF;">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #1B4D3E;padding-bottom:12px;margin-bottom:14px;">' +
          '<div>' +
            '<div style="font-size:11px;font-weight:700;color:#8C2D19;text-transform:uppercase;letter-spacing:1.5px;">DAY-OF MASTER VENDOR &amp; VIP SIGHTLINE BRIEF</div>' +
            '<h1 style="margin:4px 0;font-size:24px;color:#1B4D3E;font-family:Georgia,serif;">' + shEsc(eventTitle) + '</h1>' +
            (dateOrVenue ? '<div style="font-size:12px;color:#6B7280;">' + shEsc(dateOrVenue) + '</div>' : '') +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:18px;font-weight:800;color:#1B4D3E;">' + tablesArr.length + ' Tables Total</div>' +
            '<div style="font-size:11px;color:#78350F;font-weight:600;">120° Camera &amp; Mic Clearance</div>' +
          '</div>' +
        '</div>' +
        '<div style="margin-bottom:16px;background:#FAF8F5;padding:12px 14px;border-radius:8px;border-left:4px solid #1B4D3E;">' +
          '<div style="font-size:12px;font-weight:700;color:#1B4D3E;margin-bottom:4px;">👑 Head Table &amp; Sweetheart Anchor</div>' +
          '<div style="font-size:13px;color:#1F2937;"><strong>' + shEsc((headTable && headTable.name) || 'Head Table') + ':</strong> ' + shEsc(headGuests) + '</div>' +
          '<div style="font-size:11px;color:#4B5563;margin-top:4px;">Center-stage sightline: keep 60″ corridor unobstructed between the DJ audio mic station, dance floor center, and head table.</div>' +
        '</div>' +
        '<div style="margin-bottom:16px;">' +
          '<div style="font-size:12px;font-weight:700;color:#1B4D3E;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">VIP Speech &amp; Family Table Coordinates</div>' +
          '<table><thead><tr><th style="width:25%;">Table / Zone</th><th style="width:45%;">Assigned VIPs</th><th style="width:30%;">Vendor Role / Action</th></tr></thead>' +
          '<tbody>' + vipRowsHtml + '</tbody></table>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">' +
          '<div style="background:#F9FAFB;padding:12px;border-radius:6px;border:1px solid #E5E7EB;">' +
            '<div style="font-size:11px;font-weight:700;color:#1B4D3E;text-transform:uppercase;">🎧 DJ &amp; MC Protocol</div>' +
            '<ul style="margin:6px 0 0 16px;padding:0;font-size:11px;color:#4B5563;line-height:1.5;">' +
              '<li>Wireless handheld mic placed at Table 1 for Best Man / MOH toasts</li>' +
              '<li>Dinner background music kept below 70dB for dining acoustic comfort</li>' +
              '<li>Announce parent dances directly after cake cutting</li>' +
            '</ul>' +
          '</div>' +
          '<div style="background:#F9FAFB;padding:12px;border-radius:6px;border:1px solid #E5E7EB;">' +
            '<div style="font-size:11px;font-weight:700;color:#1B4D3E;text-transform:uppercase;">📸 Photo &amp; Video Clearance</div>' +
            '<ul style="margin:6px 0 0 16px;padding:0;font-size:11px;color:#4B5563;line-height:1.5;">' +
              '<li>Vendor meals served concurrently with Head Table to avoid speech delays</li>' +
              '<li>Maintain 54″ clear perimeter around dance floor for steadycam moves</li>' +
              '<li>Table 1 family reaction shots prioritized during toasts</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div style="border-top:1px dashed #D1D5DB;padding-top:10px;font-size:11px;color:#6B7280;display:flex;justify-content:space-between;">' +
          '<span>SeatHarmony Studio Vendor Dispatch &bull; Auto-Generated Floorplan Roster</span>' +
          '<span>Day-of Coordinator Verified</span>' +
        '</div>' +
      '</div></body></html>');
    printWin.document.close();
    if (typeof shToast === 'function') shToast('✓ Opened Master Vendor & VIP Seating Brief Print View!');
    if (window.shTrackTelemetry) window.shTrackTelemetry('calculate', { source: 'master_vendor_brief' });
  };

  window.shPrintBarClearanceGuide = function() {
    var plan = window.__SH_STATE; if (!plan || !plan.tables) return;
    var tablesArr = plan.tables || [];
    var eventTitle = plan.coupleNames || plan.title || 'Wedding Reception';
    var dateOrVenue = (plan.weddingDate || plan.date || '') + (plan.venueName ? (' · ' + plan.venueName) : '');

    var totalGuests = 0;
    tablesArr.forEach(function(t) { totalGuests += (t.guests ? t.guests.length : 0); });
    if (!totalGuests) totalGuests = 100;

    var recommendedBartenders = Math.max(1, Math.ceil(totalGuests / 65));
    var recommendedBarPoints = totalGuests >= 120 ? 2 : 1;
    var glasswareHighball = Math.round(totalGuests * 1.5);
    var glasswareWine = Math.round(totalGuests * 1.2);
    var glasswareRocks = Math.round(totalGuests * 1.0);
    var totalGlassware = glasswareHighball + glasswareWine + glasswareRocks;

    var printWin = window.open('', '_blank');
    if (!printWin) { window.print(); return; }
    printWin.document.write('<!DOCTYPE html><html><head><title>Bar & Cocktail Station Clearance Guide - ' + shEsc(eventTitle) + '</title><style>@page { size: 8.5in 11in; margin: 0.5in; } body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; color: #1F2937; } table { width: 100%; border-collapse: collapse; } th { text-align: left; padding: 8px; background: #1B4D3E; color: #FFFFFF; font-size: 11px; text-transform: uppercase; } td { padding: 8px; border-bottom: 1px solid #E5E7EB; font-size: 12px; } @media print { .sh-no-print { display: none !important; } } </style></head><body>' +
      '<div class="sh-no-print" style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;background:#FAF8F5;padding:12px 16px;border:1px solid #E2D9C8;border-radius:8px;">' +
        '<div><strong>Bar &amp; Cocktail Station Clearance Guide</strong> &middot; Mobile Bar &amp; Catering Ops</div>' +
        '<button onclick="window.print()" style="padding:8px 18px;background:#1B4D3E;color:#FFFFFF;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">🖨️ Print Bar Guide</button>' +
      '</div>' +
      '<div style="border:3px double #C8A96E;padding:24px;border-radius:8px;background:#FFFFFF;">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #1B4D3E;padding-bottom:12px;margin-bottom:14px;">' +
          '<div>' +
            '<div style="font-size:11px;font-weight:700;color:#8C2D19;text-transform:uppercase;letter-spacing:1.5px;">BEVERAGE SERVICE &amp; QUEUE CLEARANCE STANDARDS</div>' +
            '<h1 style="margin:4px 0;font-size:24px;color:#1B4D3E;font-family:Georgia,serif;">' + shEsc(eventTitle) + '</h1>' +
            (dateOrVenue ? '<div style="font-size:12px;color:#6B7280;">' + shEsc(dateOrVenue) + '</div>' : '') +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:20px;font-weight:800;color:#1B4D3E;">' + totalGuests + ' Guests</div>' +
            '<div style="font-size:11px;color:#78350F;font-weight:600;">' + recommendedBartenders + ' Bartenders (' + recommendedBarPoints + ' Service Station' + (recommendedBarPoints > 1 ? 's' : '') + ')</div>' +
          '</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px;background:#FAF8F5;padding:12px;border-radius:6px;border:1px solid #E5E7EB;text-align:center;">' +
          '<div><div style="font-size:10px;color:#6B7280;font-weight:700;">BACKBAR LANE</div><div style="font-size:16px;font-weight:800;color:#1B4D3E;">42″–48″</div><div style="font-size:9px;color:#4B5563;">Ice &amp; replenishment</div></div>' +
          '<div><div style="font-size:10px;color:#6B7280;font-weight:700;">FRONT BAR</div><div style="font-size:16px;font-weight:800;color:#1B4D3E;">6′–8′</div><div style="font-size:9px;color:#4B5563;">Service counter width</div></div>' +
          '<div><div style="font-size:10px;color:#6B7280;font-weight:700;">QUEUE RADIUS</div><div style="font-size:16px;font-weight:800;color:#991B1B;">72″ Buffer</div><div style="font-size:9px;color:#4B5563;">Standoff from dining</div></div>' +
          '<div><div style="font-size:10px;color:#6B7280;font-weight:700;">TOTAL GLASSWARE</div><div style="font-size:16px;font-weight:800;color:#1B4D3E;">' + totalGlassware + '</div><div style="font-size:9px;color:#4B5563;">3.5 glasses / guest</div></div>' +
        '</div>' +
        '<div style="margin-bottom:16px;">' +
          '<div style="font-size:12px;font-weight:700;color:#1B4D3E;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">Architectural Clearance Requirements</div>' +
          '<table>' +
            '<thead><tr><th>Zone</th><th>Dimension</th><th>Operational Rationale</th></tr></thead>' +
            '<tbody>' +
              '<tr><td><b>Backbar Working Clearance</b></td><td>42″ to 48″ Depth</td><td>Allows 2 bartenders to cross without collision while accessing ice wells, speed racks, and beer keg taps.</td></tr>' +
              '<tr><td><b>Main Guest Queue Corridor</b></td><td>72″ (6 Feet) Standoff</td><td>Prevents drink lines during post-ceremony cocktail rush from blocking primary server transit lanes or guest egress doors.</td></tr>' +
              '<tr><td><b>Sweetheart &amp; VIP Distance</b></td><td>Minimum 25 Feet</td><td>Guarantees cocktail shaker noise and blenders do not interfere with bride &amp; groom dinner conversation or microphone audio.</td></tr>' +
              '<tr><td><b>Satellite Bar Trigger</b></td><td>' + (totalGuests >= 120 ? 'Active (Recommended)' : 'Optional') + '</td><td>Events above 120 guests require a secondary beer/wine satellite station to keep guest wait time under 90 seconds.</td></tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">' +
          '<div style="background:#F9FAFB;padding:12px;border-radius:6px;border:1px solid #E5E7EB;">' +
            '<div style="font-size:11px;font-weight:700;color:#1B4D3E;text-transform:uppercase;">🍸 Glassware Staging Breakdown</div>' +
            '<ul style="margin:6px 0 0 16px;padding:0;font-size:11px;color:#4B5563;line-height:1.5;">' +
              '<li><b>Highball / Collins:</b> ' + glasswareHighball + ' glasses (cocktails &amp; soft drinks)</li>' +
              '<li><b>Wine / Universal:</b> ' + glasswareWine + ' stems (dinner wine &amp; champagne)</li>' +
              '<li><b>Lowball / Rocks:</b> ' + glasswareRocks + ' glasses (whiskey &amp; signature spirits)</li>' +
            '</ul>' +
          '</div>' +
          '<div style="background:#F9FAFB;padding:12px;border-radius:6px;border:1px solid #E5E7EB;">' +
            '<div style="font-size:11px;font-weight:700;color:#1B4D3E;text-transform:uppercase;">⚡ Fast-Paced Reception Checklist</div>' +
            '<ul style="margin:6px 0 0 16px;padding:0;font-size:11px;color:#4B5563;line-height:1.5;">' +
              '<li>Pre-pour 40 signature cocktails before ceremony concludes</li>' +
              '<li>Position bus tubs behind decorative partition screens</li>' +
              '<li>Last call announced 45 minutes prior to grand send-off</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div style="border-top:1px dashed #D1D5DB;padding-top:10px;font-size:11px;color:#6B7280;display:flex;justify-content:space-between;">' +
          '<span>SeatHarmony Studio Beverage Clearance Spec &bull; Symmetrical 60″ Corridors</span>' +
          '<span>Catering Lead Approved</span>' +
        '</div>' +
      '</div></body></html>');
    printWin.document.close();
    if (typeof shToast === 'function') shToast('✓ Opened Bar & Cocktail Station Clearance Guide Print View!');
    if (window.shTrackTelemetry) window.shTrackTelemetry('calculate', { source: 'bar_clearance_guide' });
  };`;
}

module.exports = { renderSeatElementsClientScript };

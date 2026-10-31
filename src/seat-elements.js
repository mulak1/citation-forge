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
  };`;
}

module.exports = { renderSeatElementsClientScript };

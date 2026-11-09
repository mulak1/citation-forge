/**
 * SeatHarmony (#2) - Video Sales Letter (VSL) Interactive Player Client Script
 */

function renderVslClientScript() {
  return `
  // Story player: ~10s/slide, plays once and stops on "The Fix" with Replay; manual nav pauses autoplay.
  var SH_VSL_STEP_MS = 10000;
  function shPaintVslSteps() {
    var cur = window.__SH_ACTIVE_VSL_SCENE || 0, playing = Boolean(window.__SH_VSL_TIMER);
    var segs = document.querySelectorAll('#studio-editorial-vsl-stage .sh-vsl-step');
    for (var k = 0; k < segs.length; k++) {
      var fill = segs[k].querySelector('.sh-vsl-step-fill');
      segs[k].classList.toggle('active', k === cur); segs[k].setAttribute('aria-selected', k === cur ? 'true' : 'false');
      if (!fill) continue;
      fill.style.transition = 'none';
      if (k < cur) fill.style.width = '100%';
      else if (k > cur) fill.style.width = '0%';
      else if (playing) { fill.style.width = '0%'; void fill.offsetWidth; fill.style.transition = 'width ' + SH_VSL_STEP_MS + 'ms linear'; fill.style.width = '100%'; }
      else fill.style.width = '100%';
    }
    var prev = document.getElementById('sh-vsl-prev-btn'), next = document.getElementById('sh-vsl-next-btn');
    if (prev) prev.disabled = cur === 0; if (next) next.disabled = cur === segs.length - 1;
  }
  window.selectShVslScene = function(idx) {
    var scenes = document.querySelectorAll('#studio-editorial-vsl-stage .sh-vsl-scene');
    var total = scenes.length || 4, cleanIdx = Math.max(0, Math.min(total - 1, Number(idx) || 0));
    window.__SH_ACTIVE_VSL_SCENE = cleanIdx;
    for (var i = 0; i < scenes.length; i++) {
      var active = (i === cleanIdx);
      scenes[i].style.visibility = active ? 'visible' : 'hidden'; scenes[i].setAttribute('aria-hidden', active ? 'false' : 'true');
      scenes[i].classList.toggle('active', active);
    }
    shPaintVslSteps();
  };
  window.shStopVslPlay = function(label) {
    var iconEl = document.getElementById('sh-vsl-play-icon'), lblEl = document.getElementById('sh-vsl-play-label');
    if (window.__SH_VSL_TIMER) { clearInterval(window.__SH_VSL_TIMER); window.__SH_VSL_TIMER = null; }
    if (iconEl) iconEl.innerHTML = label ? '&#8635;' : '&#9654;'; if (lblEl) lblEl.textContent = label || 'Auto-Play Story';
    shPaintVslSteps();
  };
  window.shJumpVslStep = function(idx) { if (window.__SH_VSL_TIMER) window.shStopVslPlay(); window.selectShVslScene(idx); };
  window.shGoVslStep = function(delta) { window.shJumpVslStep((window.__SH_ACTIVE_VSL_SCENE || 0) + delta); };
  window.shNextVslScene = function() { window.shGoVslStep(1); };
  window.shToggleVslAutoPlay = function() {
    var iconEl = document.getElementById('sh-vsl-play-icon'), lblEl = document.getElementById('sh-vsl-play-label');
    if (window.__SH_VSL_TIMER) { window.shStopVslPlay(); return; }
    var last = (document.querySelectorAll('#studio-editorial-vsl-stage .sh-vsl-scene').length || 4) - 1;
    if ((window.__SH_ACTIVE_VSL_SCENE || 0) === last) window.__SH_ACTIVE_VSL_SCENE = 0;
    if (iconEl) iconEl.innerHTML = '&#10074;&#10074;'; if (lblEl) lblEl.textContent = 'Pause Story';
    window.__SH_VSL_TIMER = setInterval(function() {
      window.selectShVslScene((window.__SH_ACTIVE_VSL_SCENE || 0) + 1);
      if (window.__SH_ACTIVE_VSL_SCENE === last) window.shStopVslPlay('Replay Story');
    }, SH_VSL_STEP_MS);
    window.selectShVslScene(window.__SH_ACTIVE_VSL_SCENE || 0);
  };
  document.addEventListener('DOMContentLoaded', function() { window.selectShVslScene(0); });
  window.shSyncWizardStepStage = function() {
    var s = Math.max(1, Math.min(4, Number(window.__SH_WIZARD_STEP) || 1));
    var stepBanner = document.getElementById('sh-canvas-step-banner');
    var microToolbar = document.getElementById('sh-canvas-micro-toolbar');
    var selBox = document.getElementById('sh-selected-table-box');
    var swapBanner = document.getElementById('sh-active-swap-banner');
    var badgeEl = document.getElementById('sh-canvas-step-badge');
    var hintEl = document.getElementById('sh-canvas-step-hint');
    var nextBtn = document.getElementById('sh-canvas-step-next-btn');
    if (s < 4) {
      if (stepBanner) stepBanner.style.display = 'flex';
      if (microToolbar) microToolbar.style.display = 'none';
      if (selBox) selBox.style.display = 'none';
      if (swapBanner) swapBanner.style.display = 'none';
      if (badgeEl) badgeEl.textContent = 'Step ' + s + ' of 4';
      if (hintEl) {
        hintEl.textContent = s === 1
          ? 'Pick a venue layout or add tables on the left. Drag tables to arrange.'
          : (s === 2 ? 'Add households or import your CSV on the left. Couples sit together.' : 'Set family peace rules on the left, then click Auto-Seat to continue.');
      }
      if (nextBtn) {
        nextBtn.textContent = s === 1 ? 'Next: Add Guests \u2192' : (s === 2 ? 'Next: Family Rules \u2192' : 'Unlock Fine-Tune \u2192');
        nextBtn.onclick = function() { window.scrollToShCard(s + 1); };
      }
    } else {
      if (stepBanner) stepBanner.style.display = 'none';
      if (microToolbar) microToolbar.style.display = 'flex';
      if (selBox) selBox.style.display = 'block';
    }
  };

  window.shFindAndAddNonOverlappingTable = function(opts) {
    opts = opts || {};
    if (!window.__SH_STATE || !window.__SH_STATE.tables) return;
    var plan = window.__SH_STATE, num = plan.tables.length + 1, roomH = Math.max(680, Number(plan.roomHeight) || 680), newR = opts.shape && opts.shape !== 'round' ? 124 : 92;
    var checkClearance = function(pt) {
      var minC = 9999;
      (plan.tables || []).forEach(function(t) {
        if (!t.geometry) shRecomputeGeometry(t);
        if (shNormalizeShape(t.shape) === 'round') {
          var tr = (t.geometry.tableWidth / 2) + 42, c = Math.hypot((t.x || 0) - pt.x, (t.y || 0) - pt.y) - (tr + newR);
          if (c < minC) minC = c;
        } else {
          var hw = (t.geometry.tableWidth / 2) + 34, hh = (t.geometry.tableHeight / 2) + 44, cx = Math.max(Math.abs((t.x || 0) - pt.x) - (hw + newR), Math.abs((t.y || 0) - pt.y) - (hh + newR));
          if (cx < minC) minC = cx;
        }
      });
      (plan.landmarks || []).forEach(function(lm) {
        var lhw = ((lm.w || 150) / 2) + 14, lhh = ((lm.h || 42) / 2) + 14, cl = Math.max(Math.abs((lm.x || 0) - pt.x) - (lhw + newR), Math.abs((lm.y || 0) - pt.y) - (lhh + newR));
        if (cl < minC) minC = cl;
      });
      return minC;
    };
    var bestPt = null, bestC = -9999, xs = [190, 375, 560, 745, 930];
    for (var y = 125; y <= roomH - 110; y += 70) {
      for (var xi = 0; xi < xs.length; xi++) {
        var pt = { x: xs[xi], y: y }, c = checkClearance(pt);
        if (c > bestC) { bestC = c; bestPt = pt; }
      }
    }
    if (!bestPt || bestC < -4) {
      roomH += 210; plan.roomHeight = roomH; var newRowY = roomH - 115; bestPt = null;
      [190, 435, 685, 930].forEach(function(rx) { if (!bestPt && checkClearance({ x: rx, y: newRowY }) >= 0) bestPt = { x: rx, y: newRowY }; });
      if (!bestPt) bestPt = { x: 435, y: newRowY };
    }
    var newTbl = { id: 'table-' + num, number: num, name: 'Table ' + num, shape: opts.shape || 'round', capacity: opts.capacity || 8, x: bestPt.x, y: bestPt.y, rotation: 0, locked: false, isUserAdded: true, guests: [] };
    shRecomputeGeometry(newTbl); plan.tables.push(newTbl); window.__SH_SELECTED_TABLE_IDX = plan.tables.length - 1;
    if (window.__SH_CANVAS_ZOOM === 'table') window.shSetCanvasZoom('room');
    shSyncTableSelectAndPills(); shToast('\u2713 Added Table ' + num + ' (' + plan.tables.length + ' tables in room) \u00b7 Drag to arrange or click Step 2'); shRenderAll();
  };

  window.shStartBlankList = function() {
    if (!window.__SH_STATE || !window.__SH_STATE.tables) return;
    window.__SH_STATE.tables = window.__SH_STATE.tables.slice(0, 8); window.__SH_STATE.roomHeight = 680;
    window.__SH_STATE.tables.forEach(function(t, idx) {
      t.guests = idx === 0 ? [{ name: 'Bride / Host 1', initials: 'H1', role: 'Host', meal: 'Filet Mignon', allergy: '', accessibility: '' }, { name: 'Groom / Host 2', initials: 'H2', role: 'Host', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '' }] : [];
      shRecomputeGeometry(t);
    });
    window.__SH_STATE.householdsCoupled = 1; window.__SH_SELECTED_TABLE_IDX = 1; window.__SH_SWAP_SOURCE = null;
    const drawer = document.getElementById('sh-bulk-csv-drawer'); if (drawer) drawer.style.display = 'block';
    shSyncTableSelectAndPills(); shToast('\u2728 Started blank room (8 tables) \u00b7 Add/remove tables or continue to Step 2'); shRenderAll();
  };
  window.shToggleBulkCsvDrawer = function() { const d = document.getElementById('sh-bulk-csv-drawer'); if (d) d.style.display = d.style.display === 'none' ? 'block' : 'none'; };
  window.shHandleCsvFileUpload = function(inputEl) {
    const f = inputEl && inputEl.files && inputEl.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = function(ev) { const ta = document.getElementById('sh-bulk-csv-textarea'); if (ta) ta.value = String(ev.target.result || '').trim(); window.shProcessBulkCsv(false); };
    reader.readAsText(f);
  };
  window.shProcessBulkCsv = function(replaceAll) {
    const ta = document.getElementById('sh-bulk-csv-textarea'), rawText = ta ? ta.value.trim() : '';
    if (!rawText || !window.__SH_STATE) return;
    const lines = rawText.split(/\\r?\\n/).map(function(l) { return l.trim(); }).filter(function(l) { return l && !/^(name|guest|household|table)[,\\t]/i.test(l); });
    if (!lines.length) return;
    if (replaceAll) { window.__SH_STATE.tables.forEach(function(t, idx) { if (idx > 0) t.guests = []; }); window.__SH_STATE.householdsCoupled = 1; }
    const inp = document.getElementById('domain-input'), sel = document.getElementById('sh-target-table-select');
    if (sel) sel.value = 'auto';
    lines.forEach(function(line) {
      const openTbl = window.__SH_STATE.tables.findIndex(function(t, i) { return i > 0 && !t.locked && t.guests.length < t.capacity; });
      if (openTbl === -1) window.shAddNewTable();
      if (inp) inp.value = line.replace(/,/g, ' ');
      window.shAddMessyHousehold();
    });
    shToast('✓ Bulk Imported & Coupled ' + lines.length + ' Household Rows!'); shRenderAll();
  };
  `;
}

module.exports = { renderVslClientScript };

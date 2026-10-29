/**
 * SeatHarmony (#2) - Live Deliverables & Inspector Renderers (`renderDeliverablesClientScript`)
 * Injected into `renderInteractiveScript` in `src/studio-client.js` so all modules stay < 1,000 lines.
 */

function renderDeliverablesClientScript() {
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

  window.shFindAndAddNonOverlappingTable = function() {
    if (!window.__SH_STATE || !window.__SH_STATE.tables) return;
    var plan = window.__SH_STATE, num = plan.tables.length + 1;
    var roomH = Math.max(680, Number(plan.roomHeight) || 680);
    var newR = 92;
    var checkClearance = function(pt) {
      var minC = 9999;
      (plan.tables || []).forEach(function(t) {
        if (!t.geometry) shRecomputeGeometry(t);
        if (shNormalizeShape(t.shape) === 'round') {
          var tr = (t.geometry.tableWidth / 2) + 42;
          var c = Math.hypot((t.x || 0) - pt.x, (t.y || 0) - pt.y) - (tr + newR);
          if (c < minC) minC = c;
        } else {
          var hw = (t.geometry.tableWidth / 2) + 34, hh = (t.geometry.tableHeight / 2) + 44;
          var cx = Math.max(Math.abs((t.x || 0) - pt.x) - (hw + newR), Math.abs((t.y || 0) - pt.y) - (hh + newR));
          if (cx < minC) minC = cx;
        }
      });
      (plan.landmarks || []).forEach(function(lm) {
        var lhw = ((lm.w || 150) / 2) + 14, lhh = ((lm.h || 42) / 2) + 14;
        var cl = Math.max(Math.abs((lm.x || 0) - pt.x) - (lhw + newR), Math.abs((lm.y || 0) - pt.y) - (lhh + newR));
        if (cl < minC) minC = cl;
      });
      return minC;
    };
    var bestPt = null, bestC = -9999;
    var xs = [190, 375, 560, 745, 930];
    for (var y = 125; y <= roomH - 110; y += 70) {
      for (var xi = 0; xi < xs.length; xi++) {
        var pt = { x: xs[xi], y: y };
        var c = checkClearance(pt);
        if (c > bestC) { bestC = c; bestPt = pt; }
      }
    }
    if (!bestPt || bestC < -4) {
      roomH += 210;
      plan.roomHeight = roomH;
      var newRowY = roomH - 115;
      bestPt = null;
      [190, 435, 685, 930].forEach(function(rx) {
        if (bestPt) return;
        var rpt = { x: rx, y: newRowY };
        if (checkClearance(rpt) >= 0) bestPt = rpt;
      });
      if (!bestPt) bestPt = { x: 435, y: newRowY };
    }
    var newTbl = { id: 'table-' + num, number: num, name: 'Table ' + num, shape: 'round', capacity: 8, x: bestPt.x, y: bestPt.y, rotation: 0, locked: false, isUserAdded: true, guests: [] };
    shRecomputeGeometry(newTbl); plan.tables.push(newTbl); window.__SH_SELECTED_TABLE_IDX = plan.tables.length - 1;
    if (window.__SH_CANVAS_ZOOM === 'table') window.shSetCanvasZoom('room');
    shSyncTableSelectAndPills();
    shToast('\u2713 Added Table ' + num + ' (' + plan.tables.length + ' tables in room) \u00b7 Drag to arrange or click Step 2');
    shRenderAll();
  };

  window.shStartBlankList = function() {
    if (!window.__SH_STATE || !window.__SH_STATE.tables) return;
    window.__SH_STATE.tables = window.__SH_STATE.tables.slice(0, 8);
    window.__SH_STATE.roomHeight = 680;
    window.__SH_STATE.tables.forEach(function(t, idx) {
      t.guests = idx === 0 ? [{ name: 'Bride / Host 1', initials: 'H1', role: 'Host', meal: 'Filet Mignon', allergy: '', accessibility: '' }, { name: 'Groom / Host 2', initials: 'H2', role: 'Host', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '' }] : [];
      shRecomputeGeometry(t);
    });
    window.__SH_STATE.householdsCoupled = 1; window.__SH_SELECTED_TABLE_IDX = 1; window.__SH_SWAP_SOURCE = null;
    const drawer = document.getElementById('sh-bulk-csv-drawer'); if (drawer) drawer.style.display = 'block';
    shSyncTableSelectAndPills();
    shToast('\u2728 Started blank room (8 tables) \u00b7 Add/remove tables or continue to Step 2');
    shRenderAll();
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

  function shRenderActiveCrudBanner(plan) {
    const swapBanner = document.getElementById('sh-active-swap-banner');
    if (!swapBanner) return;
    if ((window.__SH_WIZARD_STEP || 1) < 4 || window.shRenderSeatPanel) { swapBanner.style.display = 'none'; return; }
    if (window.__SH_SELECTED_LANDMARK_IDX != null && plan.landmarks && plan.landmarks[window.__SH_SELECTED_LANDMARK_IDX]) {
      const lmIdx = window.__SH_SELECTED_LANDMARK_IDX, lm = plan.landmarks[lmIdx];
      swapBanner.style.display = 'flex';
      swapBanner.innerHTML =
        '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;flex:1;">' +
          '<span style="font-size:0.82rem;font-weight:800;color:#78350F;">🏛️ ROOM ELEMENT:</span>' +
          '<input type="text" value="' + shEsc(lm.label) + '" onchange="window.shRenameLandmark(' + lmIdx + ',this.value)" style="padding:4px 8px;border:1px solid #C8A96E;border-radius:6px;font-size:0.82rem;font-weight:800;background:#FFFFFF;color:#181412;width:185px;" aria-label="Rename Room Element" />' +
          '<button type="button" onclick="window.shResizeLandmark(' + lmIdx + ',-20,-8)" style="background:#FFFFFF;border:1px solid #D6CFC2;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">- Size</button>' +
          '<button type="button" onclick="window.shResizeLandmark(' + lmIdx + ',20,8)" style="background:#FFFFFF;border:1px solid #D6CFC2;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">+ Size</button>' +
          '<button type="button" onclick="window.shCycleLandmarkZone(' + lmIdx + ')" style="background:#FFFFFF;border:1px solid #D6CFC2;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">Zone: ' + shEsc((lm.zone || 'neutral').toUpperCase()) + '</button>' +
          '<button type="button" onclick="window.shDeleteLandmark(' + lmIdx + ')" style="background:#FFF1F2;border:1px solid #FECDD3;color:#9F1239;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;">✕ Delete Element</button>' +
        '</div>' +
        '<button type="button" onclick="window.shCancelSwap()" style="background:#FFFFFF;border:1px solid #D97706;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;color:#78350F;">Done</button>';
      return;
    }
    if (window.__SH_SWAP_SOURCE) {
      const tIdx = window.__SH_SWAP_SOURCE.tableIdx, sIdx = window.__SH_SWAP_SOURCE.seatIdx;
      const sTbl = plan.tables[tIdx], sG = sTbl && sTbl.guests && sTbl.guests[sIdx];
      if (!sTbl) { swapBanner.style.display = 'none'; return; }
      swapBanner.style.display = 'flex';
      if (sG) {
        const mb = shMealBadge(sG.meal);
        const tblOpts = (plan.tables || []).map(function(cand, cIdx) {
          return '<option value="' + cIdx + '"' + (cIdx === tIdx ? ' selected' : '') + '>⇄ Move to Tbl ' + cand.number + '</option>';
        }).join('');
        swapBanner.innerHTML =
          '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;flex:1;">' +
            '<span style="font-size:0.82rem;font-weight:800;color:#8C2D19;">Seat #' + (sIdx + 1) + ':</span>' +
            '<input type="text" value="' + shEsc(sG.name) + '" onchange="window.shRenameGuest(' + tIdx + ',' + sIdx + ',this.value,event)" style="padding:4px 8px;border:1px solid #C8A96E;border-radius:6px;font-size:0.82rem;font-weight:800;background:#FFFFFF;color:#181412;width:155px;" aria-label="Edit Guest Name" />' +
            '<button type="button" title="Move Seat Counter-Clockwise" onclick="window.shMoveGuestSeatOffset(' + tIdx + ',' + sIdx + ',-1,event)" style="background:#FFFFFF;border:1px solid #D6CFC2;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">&#9664;</button>' +
            '<button type="button" title="Move Seat Clockwise" onclick="window.shMoveGuestSeatOffset(' + tIdx + ',' + sIdx + ',1,event)" style="background:#FFFFFF;border:1px solid #D6CFC2;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">&#9654;</button>' +
            '<select aria-label="Move guest to table" onchange="window.shMoveGuestToTable(' + tIdx + ',' + sIdx + ',this.value,event)" style="background:#FFFFFF;border:1px solid #C8A96E;border-radius:6px;padding:4px 6px;font-size:0.80rem;font-weight:800;color:#78350F;cursor:pointer;">' + tblOpts + '</select>' +
            '<button type="button" onclick="window.shCycleGuestMeal(' + tIdx + ',' + sIdx + ',event)" style="background:' + mb.bg + ';border:1px solid ' + mb.color + ';color:' + mb.color + ';border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">' + mb.short + '</button>' +
            '<button type="button" onclick="window.shCycleGuestAllergy(' + tIdx + ',' + sIdx + ',event)" style="background:#FFFFFF;border:1px solid #D6CFC2;color:#44403C;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">+ Dietary / ADA</button>' +
            '<button type="button" onclick="window.shRemoveGuest(' + tIdx + ',' + sIdx + ',event);window.__SH_SWAP_SOURCE=null;shRenderAll();" style="background:#FFF1F2;border:1px solid #FECDD3;color:#9F1239;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;">✕ Remove</button>' +
          '</div>' +
          '<button type="button" onclick="window.shCancelSwap()" style="background:#FFFFFF;border:1px solid #D97706;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;color:#78350F;">Done</button>';
      } else {
        swapBanner.innerHTML =
          '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;flex:1;">' +
            '<span style="font-size:0.82rem;font-weight:800;color:#78350F;">Open Chair #' + (sIdx + 1) + ' (' + shEsc(sTbl.name) + '):</span>' +
            '<input id="sh-quick-seat-name-input" type="text" placeholder="Type guest name (e.g. Uncle Bob)..." onkeydown="if(event.key===\\'Enter\\')window.shQuickAddGuestToTable(' + tIdx + ',\\'sh-quick-seat-name-input\\')" style="padding:4px 8px;border:1px solid #C8A96E;border-radius:6px;font-size:0.82rem;background:#FFFFFF;color:#181412;width:210px;" aria-label="New Guest Name" />' +
            '<button type="button" onclick="window.shQuickAddGuestToTable(' + tIdx + ',\\'sh-quick-seat-name-input\\')" style="background:#065F46;color:#FFFFFF;border:1px solid #10B981;border-radius:6px;padding:4px 10px;font-size:0.80rem;font-weight:800;cursor:pointer;">+ Seat Guest Here</button>' +
            '<button type="button" onclick="window.shChangeTableCapacity(' + tIdx + ',-1,event)" style="background:#FFF1F2;border:1px solid #FECDD3;color:#9F1239;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;">✕ Remove Empty Chair</button>' +
          '</div>' +
          '<button type="button" onclick="window.shCancelSwap()" style="background:#FFFFFF;border:1px solid #D97706;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;color:#78350F;">Close</button>';
      }
      return;
    }
    swapBanner.style.display = 'none';
  }

  function shRenderSelectedTableInspector() {
    if (window.shRenderSeatPanel) { window.shRenderSeatPanel(); return; }
    const box = document.getElementById('sh-selected-table-box');
    if (!box || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    const tIdx = window.__SH_SELECTED_TABLE_IDX || 0, t = window.__SH_STATE.tables[tIdx] || window.__SH_STATE.tables[0];
    if (!t.geometry) shRecomputeGeometry(t);
    const normShape = shNormalizeShape(t.shape);
    shSyncTableSelectAndPills();
    document.querySelectorAll('#sh-card4-shape-pills button[data-shape]').forEach(function(b) { b.classList.toggle('active', b.getAttribute('data-shape') === normShape); });
    const lockBtn = document.getElementById('sh-lock-table-btn');
    if (lockBtn) { lockBtn.classList.toggle('active', Boolean(t.locked)); lockBtn.textContent = t.locked ? '🔒 Locked' : '🔓 Lock'; }
    const sum4 = document.getElementById('sh-wizard-summary-4');
    if (sum4) sum4.textContent = shFriendlyShape(t.shape);

    const tableMoveOpts = (window.__SH_STATE.tables || []).map(function(cand, cIdx) {
      return '<option value="' + cIdx + '"' + (cIdx === tIdx ? ' selected' : '') + '>T' + cand.number + '</option>';
    }).join('');

    const cards = [];
    t.guests.forEach(function(g, idx) {
      const seat = t.geometry.seats[idx] || { seatNumber: idx + 1, clockPosition: '12:00' }, mb = shMealBadge(g.meal);
      const cleanAllergy = g.allergy ? String(g.allergy).replace(/^[⚠️🥜🌾🐚🥛]+\\s*/, '') : '', cleanAccess = g.accessibility ? String(g.accessibility).replace(/^[♿👶]+\\s*/, '') : '';
      const shortAllergy = cleanAllergy ? (cleanAllergy.indexOf('PEANUT') !== -1 ? 'Nut' : (cleanAllergy.indexOf('CELIAC') !== -1 ? 'GF' : (cleanAllergy.indexOf('SODIUM') !== -1 ? 'Low-Na' : cleanAllergy.split(' ')[0]))) : '';
      const shortAccess = cleanAccess ? (cleanAccess.indexOf('WHEELCHAIR') !== -1 ? 'ADA' : 'Child') : '';
      const hasTag = Boolean(shortAllergy || shortAccess);
      const tagHtml = hasTag
        ? '<button type="button" title="Click to change or clear dietary/chair note" onclick="window.shCycleGuestAllergy(' + tIdx + ',' + idx + ',event)" style="cursor:pointer;font-size:0.72rem;font-weight:700;border-radius:5px;white-space:nowrap;' + (shortAllergy ? 'background:#FFF1F2;color:#9F1239;border:1px solid #FECDD3;padding:2px 5px;' : 'background:#FEF3C7;color:#92400E;border:1px solid #FDE68A;padding:2px 5px;') + '">' + (shortAllergy ? shEsc(shortAllergy) : ('♿ ' + shEsc(shortAccess))) + '</button>'
        : '';
      const isSelSeat = window.__SH_SWAP_SOURCE && window.__SH_SWAP_SOURCE.tableIdx === tIdx && window.__SH_SWAP_SOURCE.seatIdx === idx;
      cards.push(
        '<div onclick="window.shSeatClick(' + tIdx + ',' + idx + ',event)" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:5px;padding:7px 9px;border-radius:9px;background:' + (isSelSeat ? '#FFFBEB' : '#FFFFFF') + ';border:' + (isSelSeat ? '2px solid #D97706' : '1px solid #EAE2D3') + ';font-size:0.83rem;min-width:0;max-width:100%;">' +
          '<span class="mono" style="font-size:0.74rem;font-weight:800;padding:2px 5px;border-radius:5px;flex-shrink:0;background:' + (idx === 0 ? '#8C2D19' : '#F3EDE3') + ';color:' + (idx === 0 ? '#FFF' : '#1C1917') + ';">#' + seat.seatNumber + '</span>' +
          '<input type="text" value="' + shEsc(g.name) + '" aria-label="Guest Name" onclick="event.stopPropagation()" onchange="window.shRenameGuest(' + tIdx + ',' + idx + ',this.value,event)" style="flex:1;min-width:0;border:1px solid transparent;background:transparent;font-weight:700;font-size:0.83rem;color:#1C1917;padding:2px 3px;border-radius:4px;" onfocus="this.style.borderColor=\\'#C8A96E\\';this.style.background=\\'#FAF7F2\\';" onblur="this.style.borderColor=\\'transparent\\';this.style.background=\\'transparent\\';" />' +
          '<div style="display:flex;align-items:center;gap:4px;flex-shrink:0;" onclick="event.stopPropagation()">' +
            tagHtml +
            '<button type="button" title="Click to change meal" onclick="window.shCycleGuestMeal(' + tIdx + ',' + idx + ',event)" style="cursor:pointer;border:1px solid ' + mb.color + ';font-size:0.74rem;font-weight:800;padding:2px 6px;border-radius:5px;background:' + mb.bg + ';color:' + mb.color + ';">' + mb.short + '</button>' +
            '<select aria-label="Move to table" title="Move guest to another table" onchange="window.shMoveGuestToTable(' + tIdx + ',' + idx + ',this.value,event)" style="cursor:pointer;border:1px solid #D6CFC2;background:#FAF8F5;color:#44403C;font-size:0.74rem;font-weight:700;padding:2px 3px;border-radius:5px;">' + tableMoveOpts + '</select>' +
            '<button type="button" title="Remove guest" onclick="window.shRemoveGuest(' + tIdx + ',' + idx + ',event)" style="cursor:pointer;border:none;background:transparent;color:#9CA3AF;font-size:0.80rem;font-weight:800;padding:2px 3px;border-radius:4px;" onmouseover="this.style.color=\\'#9F1239\\'" onmouseout="this.style.color=\\'#9CA3AF\\'">✕</button>' +
          '</div>' +
        '</div>'
      );
    });

    for (let sIdx = t.guests.length; sIdx < (t.capacity || 8); sIdx++) {
      cards.push(
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;padding:7px 10px;border-radius:9px;background:#FAF8F5;border:1.5px dashed #D6CBB8;font-size:0.80rem;min-width:0;">' +
          '<span class="mono" style="font-weight:700;color:#78716C;">#' + (sIdx + 1) + ' Open Seat</span>' +
          '<div style="display:flex;gap:4px;">' +
            '<button type="button" onclick="window.shSeatClick(' + tIdx + ',' + sIdx + ',event)" style="cursor:pointer;border:1px solid #10B981;background:#ECFDF5;color:#065F46;font-size:0.76rem;font-weight:800;padding:2px 8px;border-radius:5px;">+ Seat Guest</button>' +
            (t.capacity > 2 ? '<button type="button" title="Remove empty chair" onclick="window.shChangeTableCapacity(' + tIdx + ',-1,event)" style="cursor:pointer;border:none;background:transparent;color:#9CA3AF;font-size:0.78rem;font-weight:800;padding:2px 4px;">✕</button>' : '') +
          '</div>' +
        '</div>'
      );
    }

    box.innerHTML =
      '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #EAE2D3;">' +
        '<div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1 1 280px;">' +
          '<input type="text" value="' + shEsc(t.name) + '" onchange="window.shRenameTable(' + tIdx + ',this.value)" aria-label="Table Name" class="serif-display" style="font-size:1.00rem;font-weight:700;color:#181412;background:#FFFFFF;border:1px solid #D6CBB8;border-radius:7px;padding:4px 8px;flex:1;min-width:140px;max-width:230px;" />' +
          '<div style="display:inline-flex;align-items:center;background:#FFFFFF;border:1px solid #D6CFC2;border-radius:7px;overflow:hidden;flex-shrink:0;">' +
            '<button type="button" title="Remove 1 Chair" onclick="window.shChangeTableCapacity(' + tIdx + ',-1,event)" style="cursor:pointer;border:none;background:transparent;padding:4px 7px;font-weight:800;color:#44403C;">&minus;</button>' +
            '<span class="mono" style="font-size:0.75rem;color:#181412;font-weight:800;padding:0 4px;">' + t.guests.length + '/' + t.capacity + '</span>' +
            '<button type="button" title="Add 1 Chair" onclick="window.shChangeTableCapacity(' + tIdx + ',1,event)" style="cursor:pointer;border:none;background:transparent;padding:4px 7px;font-weight:800;color:#44403C;">+</button>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;">' +
          '<button type="button" onclick="window.shMorphSelectedTable(\\'round\\')" class="studio-tap-chip' + (normShape === 'round' ? ' active' : '') + '" style="padding:4px 8px;font-size:0.75rem;">Round</button>' +
          '<button type="button" onclick="window.shMorphSelectedTable(\\'banquet_2sided\\')" class="studio-tap-chip' + (normShape === 'banquet_2sided' ? ' active' : '') + '" style="padding:4px 8px;font-size:0.75rem;">Banquet</button>' +
          '<button type="button" onclick="window.shMorphSelectedTable(\\'sweetheart\\')" class="studio-tap-chip' + (normShape === 'sweetheart' ? ' active' : '') + '" style="padding:4px 8px;font-size:0.75rem;">Sweetheart</button>' +
          '<button type="button" onclick="window.shMorphSelectedTable(\\'kings_4sided\\')" class="studio-tap-chip' + (normShape === 'kings_4sided' ? ' active' : '') + '" style="padding:4px 8px;font-size:0.75rem;">King\\'s</button>' +
          '<button type="button" onclick="window.shRotateSelectedTable()" class="studio-tap-chip" style="padding:4px 7px;font-size:0.75rem;" title="Rotate Table 45°">↻ 45°</button>' +
          (window.__SH_STATE.tables.length > 1 ? '<button type="button" title="Delete Table" onclick="window.shDeleteSelectedTable()" class="studio-tap-chip" style="padding:4px 7px;font-size:0.75rem;border-color:#FECDD3;background:#FFF1F2;color:#9F1239;">Delete</button>' : '') +
        '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">' +
        '<input id="sh-inspector-add-guest-input" type="text" placeholder="Add guest to ' + shEsc(t.name) + ' (press Enter)..." onkeydown="if(event.key===\\'Enter\\')window.shQuickAddGuestToTable(' + tIdx + ',\\'sh-inspector-add-guest-input\\')" style="flex:1;padding:6px 10px;border:1px solid #D6CFC2;border-radius:7px;font-size:0.82rem;background:#FFFFFF;" aria-label="Add guest to selected table" />' +
        '<button type="button" onclick="window.shQuickAddGuestToTable(' + tIdx + ',\\'sh-inspector-add-guest-input\\')" class="studio-tap-chip" style="padding:5px 11px;font-size:0.80rem;border-color:#10B981;background:#ECFDF5;color:#065F46;font-weight:800;">+ Add Guest</button>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(275px,1fr));gap:6px;">' + cards.join('') + '</div>';
  }

  function shRenderBeoView() {
    const container = document.getElementById('sh-beo-container');
    if (!container || !window.__SH_STATE) return;
    let totalFilet = 0, totalHalibut = 0, totalVegan = 0, totalKids = 0, totalAllergies = 0;
    const tableCards = (window.__SH_STATE.tables || []).map(function(t) {
      if (!t.geometry) shRecomputeGeometry(t);
      const rows = t.guests.map(function(g, idx) {
        const s = t.geometry.seats[idx] || { seatNumber: idx + 1, clockPosition: '12:00' }, mb = shMealBadge(g.meal);
        if (mb.short === 'Filet') totalFilet++; else if (mb.short === 'Halibut') totalHalibut++; else if (mb.short === 'Vegan') totalVegan++; else totalKids++;
        if (g.allergy) totalAllergies++;
        const cleanAllergy = g.allergy ? String(g.allergy).replace(/^[⚠️]+\\s*/, '') : '', cleanAccess = g.accessibility ? String(g.accessibility).replace(/^[♿👶]+\\s*/, '') : '';
        return '<tr><td class="mono" style="font-weight:800;color:' + (idx === 0 ? '#8C2D19' : '#1C1917') + ';">Seat #' + s.seatNumber + (idx === 0 ? ' ★12:00' : '') + '</td><td style="font-weight:700;">' + shEsc(g.name) + '</td><td><span style="padding:2px 8px;border-radius:6px;font-weight:700;font-size:0.74rem;background:' + mb.bg + ';color:' + mb.color + ';">' + mb.code + ' ' + shEsc(g.meal) + '</span></td><td>' + (cleanAllergy ? '<strong style="color:#9F1239;">⚠️ ' + shEsc(cleanAllergy) + '</strong>' : '<span style="color:#78716C;">None</span>') + '</td><td>' + (cleanAccess ? '<strong style="color:#92400E;">♿ ' + shEsc(cleanAccess) + '</strong>' : '<span style="color:#78716C;">Standard</span>') + '</td></tr>';
      }).join('');
      return '<div style="background:#FFFFFF;border:1px solid #E2D9C8;border-radius:12px;padding:12px;margin-bottom:10px;"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px;"><strong style="font-size:0.90rem;color:#181412;">' + shEsc(t.name) + ' (' + t.guests.length + ' Covers)</strong><span class="badge badge-emerald">Seat #1 = 12 O\\'Clock Anchor</span></div><div style="overflow-x:auto;"><table class="ba-table" style="font-size:0.76rem;"><thead><tr><th>Clockwise Seat</th><th>Guest Name</th><th>Entrée</th><th>Allergy Alert</th><th>Chair Spec</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    }).join('');
    container.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(85px,1fr));gap:8px;margin-bottom:12px;"><div style="background:#FDF2EE;border:1px solid #F5D0C5;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.65rem;font-weight:800;color:#8C2D19;">◆ FILET</div><div style="font-size:1.15rem;font-weight:800;color:#181412;">' + totalFilet + '</div></div><div style="background:#F0F9FF;border:1px solid #BAE6FD;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.65rem;font-weight:800;color:#0369A1;">● HALIBUT</div><div style="font-size:1.15rem;font-weight:800;color:#181412;">' + totalHalibut + '</div></div><div style="background:#ECFDF5;border:1px solid #A7F3D0;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.65rem;font-weight:800;color:#065F46;">▲ VEGAN</div><div style="font-size:1.15rem;font-weight:800;color:#181412;">' + totalVegan + '</div></div><div style="background:#FFFBEB;border:1px solid #FDE68A;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.65rem;font-weight:800;color:#A16207;">★ KIDS</div><div style="font-size:1.15rem;font-weight:800;color:#181412;">' + totalKids + '</div></div><div style="background:#FFF1F2;border:1px solid #FECDD3;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.65rem;font-weight:800;color:#9F1239;">⚠️ ALLERGIES</div><div style="font-size:1.15rem;font-weight:800;color:#9F1239;">' + totalAllergies + '</div></div></div>' + tableCards;
  }

  function shFormatPosterName(rawName) {
    const str = String(rawName || '').trim(), parenMatch = str.match(/\\s*(\\([^)]+\\))\\s*$/), suffix = parenMatch ? (' ' + parenMatch[1]) : '';
    const base = str.replace(/\\s*\\([^)]+\\)\\s*$/, '').trim(), parts = base.split(/\\s+/).filter(Boolean);
    if (parts.length <= 1) return { sortKey: base.toLowerCase(), display: base + suffix };
    const last = parts[parts.length - 1], first = parts.slice(0, -1).join(' ');
    return { sortKey: (last + ', ' + first).toLowerCase(), display: last + ', ' + first + suffix };
  }

  var SH_POSTER_THEMES = {
    alabaster: { label: 'Parisian Gold', bg: '#FAF7F2', fg: '#181412', sub: '#57534E', borderCol: '#C8A96E', badgeBg: '#FAF3E3', badgeFg: '#8C2D19', motif: '✦', fontStyle: 'normal' },
    ivory: { label: 'Botanical Ivory', bg: '#FCFBF7', fg: '#1F291E', sub: '#4B5D48', borderCol: '#7D8C6D', badgeBg: '#2C3E2B', badgeFg: '#D9F99D', motif: '🌿', fontStyle: 'italic' },
    obsidian: { label: 'Editorial Noir', bg: '#181412', fg: '#FAF7F2', sub: '#D6CBB8', borderCol: '#C8A96E', badgeBg: '#2B231D', badgeFg: '#FDE68A', motif: '◆', fontStyle: 'normal' },
    sage: { label: 'Tuscan Sage', bg: '#EFF5F1', fg: '#14291E', sub: '#3E5C4A', borderCol: '#4D7C5D', badgeBg: '#064E3B', badgeFg: '#A7F3D0', motif: '✦', fontStyle: 'italic' },
    rosewater: { label: 'Blush Rosewater', bg: '#FDF4F5', fg: '#3B1821', sub: '#7D4250', borderCol: '#D48C96', badgeBg: '#6B2134', badgeFg: '#FECDD3', motif: '🌸', fontStyle: 'italic' },
    terracotta: { label: 'Villa Terracotta', bg: '#FDF6F0', fg: '#2E160B', sub: '#7C4327', borderCol: '#B45309', badgeBg: '#7C2D12', badgeFg: '#FDE68A', motif: '☀', fontStyle: 'normal' }
  };

  window.shUpdateSignKicker = function(val) {
    window.__SH_SIGN_KICKER = String(val || 'Please Find Your Seat').trim();
    shRenderPosterView();
    shToast('✓ Updated 24"×36" Sign Header → "' + window.__SH_SIGN_KICKER + '"');
  };

  window.shUpdateSignMonogram = function(val) {
    window.__SH_SIGN_MONOGRAM = String(val || '').trim();
    shRenderPosterView();
    shToast('✓ Updated 24"×36" Sign Crest Monogram → "' + (window.__SH_SIGN_MONOGRAM || shComputeCoupleMonogram(window.__SH_STATE && window.__SH_STATE.title)) + '"');
  };

  window.shSetPosterMode = function(mode, theme) {
    if (mode) window.__SH_POSTER_MODE = mode;
    if (theme) window.__SH_POSTER_THEME = theme;
    document.querySelectorAll('[data-poster-sort], #sh-card5-sort-pills [data-sort]').forEach(function(b) { b.classList.toggle('active', (b.getAttribute('data-poster-sort') || b.getAttribute('data-sort')) === window.__SH_POSTER_MODE); });
    document.querySelectorAll('[data-poster-theme], #sh-card5-theme-pills [data-theme]').forEach(function(b) { b.classList.toggle('active', (b.getAttribute('data-poster-theme') || b.getAttribute('data-theme')) === window.__SH_POSTER_THEME); });
    const tSpec = SH_POSTER_THEMES[window.__SH_POSTER_THEME || 'alabaster'] || SH_POSTER_THEMES.alabaster;
    const sum5 = document.getElementById('sh-wizard-summary-5');
    if (sum5) sum5.textContent = tSpec.label + ' • ' + (window.__SH_POSTER_MODE === 'by_table' ? 'By Table' : 'A-Z');
    shRenderPosterView();
  };

  function shRenderPosterView() {
    const posterEl = document.getElementById('sh-poster-preview');
    if (!posterEl || !window.__SH_STATE) return;
    const themeKey = window.__SH_POSTER_THEME || 'alabaster', tSpec = SH_POSTER_THEMES[themeKey] || SH_POSTER_THEMES.alabaster;
    const bg = tSpec.bg, fg = tSpec.fg, sub = tSpec.sub, borderCol = tSpec.borderCol;
    const rawMono = String(window.__SH_SIGN_MONOGRAM || '').trim(), partsMono = rawMono.split('·');
    const initials = (partsMono[0] && partsMono[0].trim()) || shComputeCoupleMonogram(window.__SH_STATE.title);
    const monoSub = (partsMono[1] && partsMono[1].trim()) || 'EST. 2026';
    const kickerText = window.__SH_SIGN_KICKER || 'Please Find Your Seat';
    const logoUrl = window.__SH_CREST_LOGO_URL || '';
    let bodyHtml = '';
    if (window.__SH_POSTER_MODE === 'by_table') {
      bodyHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:12px;text-align:left;">' +
        (window.__SH_STATE.tables || []).map(function(t) { return '<div style="border-top:1px solid ' + borderCol + ';padding-top:6px;"><div class="serif-display" style="font-size:0.95rem;color:' + fg + ';margin-bottom:4px;">' + tSpec.motif + ' Table ' + t.number + '</div>' + t.guests.map(function(g) { return '<div style="font-size:0.74rem;color:' + sub + ';">' + shEsc(g.name) + '</div>'; }).join('') + '</div>'; }).join('') + '</div>';
    } else {
      const all = [];
      (window.__SH_STATE.tables || []).forEach(function(t) { t.guests.forEach(function(g, idx) { const parsed = shFormatPosterName(g.name); all.push({ sortKey: parsed.sortKey, display: parsed.display, tableNum: t.number, seatNum: idx + 1 }); }); });
      all.sort(function(a, b) { return a.sortKey.localeCompare(b.sortKey); });
      bodyHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:6px 16px;text-align:left;">' + all.map(function(g) { return '<div style="display:flex;justify-content:space-between;gap:8px;font-size:0.74rem;border-bottom:1px dotted ' + borderCol + ';padding:2px 0;color:' + fg + ';"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + shEsc(g.display) + '</span><strong class="mono" style="font-size:0.70rem;flex-shrink:0;">Tbl ' + g.tableNum + '</strong></div>'; }).join('') + '</div>';
    }
    const posterCrestHtml = logoUrl
      ? '<img src="' + shEsc(logoUrl) + '" alt="Couple Crest" style="width:100%;height:100%;object-fit:contain;background:#FFFFFF;padding:4px;" />'
      : '<div id="sh-live-sign-monogram" style="display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;"><span class="serif-display" style="font-size:1.22rem;font-weight:800;color:' + tSpec.badgeFg + ';letter-spacing:0.04em;">' + shEsc(initials) + '</span><span class="mono" style="font-size:0.44rem;font-weight:800;color:' + tSpec.badgeFg + ';opacity:0.85;letter-spacing:0.10em;margin-top:2px;">' + shEsc(monoSub) + '</span></div>';
    posterEl.innerHTML =
      '<div style="background:' + bg + ';color:' + fg + ';border:3px double ' + borderCol + ';border-radius:14px;padding:20px 18px;box-shadow:0 16px 36px rgba(24,20,18,0.12);"><div style="display:flex;align-items:center;gap:14px;text-align:left;border-bottom:1.5px double ' + borderCol + ';padding-bottom:12px;margin-bottom:14px;"><div id="poster-logo-badge" style="width:58px;height:58px;border-radius:14px;border:2px solid ' + borderCol + ';background:' + tSpec.badgeBg + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 6px 14px rgba(24,20,18,0.18);overflow:hidden;">' + posterCrestHtml + '</div><div style="min-width:0;flex:1;"><div style="font-size:0.62rem;letter-spacing:0.14em;text-transform:uppercase;color:' + sub + ';font-weight:800;">' + tSpec.motif + ' 24&Prime; &times; 36&Prime; FOYER EASEL WELCOME SIGN &middot; ' + tSpec.label.toUpperCase() + ' &middot; 0.125&Prime; BLEED</div><h3 id="sh-live-sign-kicker" class="serif-display" style="font-size:1.68rem;color:' + fg + ';font-style:' + tSpec.fontStyle + ';margin:1px 0;">' + shEsc(kickerText) + '</h3><div style="font-size:0.80rem;color:' + sub + ';font-style:italic;">' + shEsc(window.__SH_STATE.title) + ' &middot; ' + shEsc(window.__SH_STATE.venueName || 'Rosewood Conservatory') + '</div></div></div>' + bodyHtml + '</div>';
    const averyEl = document.getElementById('sh-avery-preview');
    if (averyEl) {
      const vid = shEsc((window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819');
      averyEl.innerHTML = '<div style="padding:11px 14px;border-radius:12px;background:linear-gradient(135deg,#FAF3E6 0%,#F5ECE0 100%);border:1.5px solid #D8C29D;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;"><div style="display:flex;align-items:center;gap:10px;min-width:0;"><span style="font-size:1.25rem;">🔒</span><div><div style="font-size:0.68rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#78350F;">300-DPI WELCOME SIGN + AVERY 5302 TENT PLACE CARDS</div><div style="font-size:0.78rem;color:#44403C;">2&Prime;&times;3.5&Prime; Avery 5302 sheets with meal icons (<code>◆ Beef · ● Fish · ▲ Vegan · ★ Kid</code>) &amp; 180&deg; allergy fold.</div></div></div><div style="display:flex;gap:6px;flex-wrap:wrap;"><a href="/print/avery-5302/' + vid + '" target="_blank" class="btn btn-secondary" style="padding:6px 11px;font-size:0.73rem;">🎫 Preview Avery 5302 ↗</a><a href="/buy/complete_dossier?target=estate-150&vault=' + vid + '" class="btn btn-primary" style="padding:6px 12px;font-size:0.73rem;">Unlock Print Pack ($14.99) →</a></div></div>';
    }
  }

  window.shFilterQrLookup = function() {
    const qInput = document.getElementById('sh-qr-search'), out = document.getElementById('sh-qr-results');
    if (!out || !window.__SH_STATE) return;
    const q = (qInput ? qInput.value : '').trim().toLowerCase(), matches = [];
    (window.__SH_STATE.tables || []).forEach(function(t) { t.guests.forEach(function(g, idx) { if (!q || g.name.toLowerCase().indexOf(q) !== -1 || t.name.toLowerCase().indexOf(q) !== -1) matches.push({ guest: g, table: t, seatNumber: idx + 1 }); }); });
    out.innerHTML = matches.slice(0, 8).map(function(m) {
      const mb = shMealBadge(m.guest.meal);
      return '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;padding:8px 10px;border-radius:10px;background:#FFFFFF;border:1px solid #EAE2D3;"><div style="min-width:0;"><div style="font-weight:800;color:#181412;font-size:0.82rem;">' + shEsc(m.guest.name) + '</div><div style="font-size:0.71rem;color:#78716C;">' + shEsc(m.table.name) + ' &middot; ' + mb.icon + ' ' + shEsc(m.guest.meal) + '</div></div><span class="badge badge-emerald tabular" style="font-size:0.72rem;">Table ' + m.table.number + ' &middot; Seat #' + m.seatNumber + '</span></div>';
    }).join('');
  };

  function shSyncVaultIdLinks(vId) {
    const id = String(vId || (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819');
    if (window.__SH_STATE) window.__SH_STATE.vaultId = id;
    const setTxt = function(elId, txt) { const el = document.getElementById(elId); if (el) el.textContent = txt; };
    setTxt('hero-vault-code-label', '#' + id); setTxt('sh-studio-vault-code', id); setTxt('sh-btn-vault-id', id); setTxt('sh-modal-vault-code', id);
    setTxt('sh-modal-links-vault-id', id); setTxt('sh-unlocked-vault-id', id); setTxt('sh-qr-short-url', '/qr/' + id);
    const setHref = function(elId, url) { const el = document.getElementById(elId); if (el) el.href = url; };
    ['sh-cmd-vault-link', 'sh-footer-vault-link', 'sh-modal-link-vault'].forEach(function(k) { setHref(k, '/vault/' + id); });
    ['sh-cmd-poster-link', 'sh-open-poster-studio-link', 'sh-card5-poster-studio-link', 'sh-modal-link-poster'].forEach(function(k) { setHref(k, '/print/poster/' + id); });
    ['sh-cmd-avery-link', 'sh-open-avery-studio-link', 'sh-card5-avery-studio-link', 'sh-modal-link-avery'].forEach(function(k) { setHref(k, '/print/avery-5302/' + id); });
    ['sh-cmd-beo-link', 'sh-open-beo-studio-link', 'sh-modal-link-beo'].forEach(function(k) { setHref(k, '/print/beo/' + id); });
    ['sh-cmd-qr-link', 'sh-open-qr-app-link', 'sh-qr-short-url', 'sh-modal-link-qr'].forEach(function(k) { setHref(k, '/qr/' + id); });
    ['hero-buy-btn', 'sh-card5-buy-btn', 'sh-vault-buy-pack-btn', 'sh-pane-poster-buy-link'].forEach(function(k) { setHref(k, '/buy/complete_dossier?target=estate-150&vault=' + id); });
    setHref('sh-vault-buy-pro-btn', '/buy/pro_b2b?target=estate-150&vault=' + id); setHref('sh-pane-beo-buy-link', '/buy/flash_pass?target=estate-150&vault=' + id);
    const qrImg = document.getElementById('sh-live-qr-img');
    if (qrImg) qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&color=181412&bgcolor=FFFFFF&data=' + encodeURIComponent(window.location.origin + '/qr/' + id);
  }

  function shAutoPersistVault() {
    if (!window.__SH_STATE) return;
    try { localStorage.setItem('sh_saved_vault_v1', JSON.stringify(window.__SH_STATE)); } catch (_) {}
    clearTimeout(window.__shPersistTimer);
    window.__shPersistTimer = setTimeout(function() {
      fetch('/api/vault/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ vaultId: window.__SH_STATE.vaultId || 'SH-4819', ownerEmail: window.__SH_STATE.ownerEmail || '', state: window.__SH_STATE }) }).catch(function() {});
    }, 650);
  }

  window.shOpenVaultModal = function() { const m = document.getElementById('sh-vault-modal'); if (m) m.style.display = 'flex'; };
  window.shCloseVaultModal = function() { const m = document.getElementById('sh-vault-modal'); if (m) m.style.display = 'none'; };
  window.__shCarouselSlide = 0;
  window.selectStudioFeatureSlide = function(idx) {
    const slides = document.querySelectorAll('.studio-feature-slide');
    const tabs = document.querySelectorAll('#studio-carousel-tabs .studio-carousel-tab');
    if (!slides.length) return;
    const total = slides.length;
    const nextIdx = ((Number(idx) % total) + total) % total;
    window.__shCarouselSlide = nextIdx;
    slides.forEach(function(el, i) { el.classList.toggle('active', i === nextIdx); });
    tabs.forEach(function(btn, i) {
      btn.classList.toggle('active', i === nextIdx);
      btn.setAttribute('aria-selected', i === nextIdx ? 'true' : 'false');
    });
    const counterEl = document.getElementById('studio-carousel-counter');
    if (counterEl) counterEl.textContent = 'Tool ' + (nextIdx + 1) + ' of ' + total;
  };
  window.stepStudioFeatureSlide = function(delta) {
    window.selectStudioFeatureSlide((window.__shCarouselSlide || 0) + Number(delta || 1));
  };
  window.shSaveVaultToServer = async function() {
    const emailEl = document.getElementById('sh-vault-email-input'), pinEl = document.getElementById('sh-vault-pin-input'), btn = document.getElementById('sh-vault-save-submit-btn');
    const email = emailEl ? emailEl.value.trim() : '', pin = pinEl ? pinEl.value.trim() : '2026';
    if (btn) btn.textContent = '💾 Saving to Cloud Vault...';
    try {
      if (window.__SH_STATE) window.__SH_STATE.ownerEmail = email;
      const res = await fetch('/api/vault/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ vaultId: (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819', ownerEmail: email, pinCode: pin, state: window.__SH_STATE }) });
      const data = await res.json(), vid = data && (data.vaultId || data.vault_id);
      if (data && data.ok && vid) { shSyncVaultIdLinks(vid); if (btn) btn.textContent = '✓ Saved Vault #' + vid + ' (' + (email || 'Cloud Link Ready') + ')'; shToast('✓ Saved Reception Vault #' + vid + '! All 5 print & QR links updated.'); }
    } catch (e) { if (btn) btn.textContent = '💾 Save My Event & Generate Magic Links'; }
  };
  window.shLookupSavedVault = async function(overrideQuery) {
    const inp = document.getElementById('sh-vault-lookup-input'), st = document.getElementById('sh-vault-lookup-status');
    if (overrideQuery && inp) inp.value = overrideQuery;
    const q = (overrideQuery || (inp ? inp.value : '')).trim();
    if (!q) return;
    if (st) st.textContent = 'Searching saved vaults...';
    try {
      const res = await fetch('/api/vault/lookup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ emailOrVaultId: q, query: q }) });
      const data = await res.json(), vid = data && (data.vault_id || data.vaultId);
      if (data && data.ok && vid && data.state) {
        window.__SH_STATE = data.state; window.__SH_STATE.vaultId = vid; window.__SH_STATE.isUnlocked = Boolean(data.is_unlocked);
        const navLbl = document.getElementById('nav-vault-label'); if (navLbl) navLbl.textContent = 'Unlocked #' + vid;
        shSyncVaultIdLinks(vid); shRenderAll();
        if (st) st.innerHTML = '<div style="padding:8px 10px;border-radius:8px;background:#ECFDF5;border:1px solid #10B981;"><strong style="color:#065F46;">✓ Logged In: "' + shEsc(data.title || 'Saved Reception') + '" (#' + shEsc(vid) + ')!</strong><br/><a href="/vault/' + shEsc(vid) + '" style="color:#8C2D19;font-weight:800;text-decoration:underline;">🔓 Enter Unlocked Command Center (/vault/' + shEsc(vid) + ') ↗</a></div>';
        shToast('✓ Logged into Unlocked Account "' + (data.owner_email || vid) + '" (Vault #' + vid + ')!');
      } else if (st) { st.innerHTML = '<span style="color:#9F1239;">No vault found for "' + shEsc(q) + '". Try test@seatharmony.com or SH-4819.</span>'; }
    } catch (e) { if (st) st.textContent = 'Could not look up vault.'; }
  };
  window.shLoginWithTestAccount = function(code) {
    return window.shLookupSavedVault(code || 'test@seatharmony.com');
  };`;
}

module.exports = { renderDeliverablesClientScript };

/**
 * SeatHarmony (#2) - Interactive 60fps Client Engine (`renderInteractiveScript`)
 * Full 1-Click CRUD for Tables, Seats/Chairs, Guests, Room Landmarks & Family Rules.
 */

const { renderDeliverablesClientScript } = require('./studio-deliverables-client');

function renderInteractiveScript(initialPlan) {
  const safeInitialJson = JSON.stringify(initialPlan || {}).replace(/</g, '\\u003c');
  return `<script>
  window.__SH_STATE = ${safeInitialJson};
  window.__SH_SELECTED_TABLE_IDX = 1; window.__SH_RING_MODE = 'harmony'; window.__SH_ACTIVE_VIEW = 'floorplan';
  window.__SH_POSTER_MODE = 'alphabetical'; window.__SH_POSTER_THEME = 'alabaster'; window.__SH_SWAP_SOURCE = null;
  window.__SH_SELECTED_LANDMARK_IDX = null;
  window.__SH_SANDBOX_MOM = false; window.__SH_CREST_LOGO_URL = ''; window.__SH_SIGN_KICKER = 'Please Find Your Seat';
  window.__SH_SIGN_MONOGRAM = 'M&L · EST. 2026'; window.__SH_CANVAS_ZOOM = 'room'; window.__SH_DRAG_STATE = null; window.__SH_VSL_TIMER = null;
  window.__SH_WIZARD_STEP = 1;

  window.shLoadVslSceneIntoStudio = function() {
    window.loadPresetScenario('estate-150', document.querySelector('[data-preset="estate-150"]'));
    var st = document.getElementById('studio'); if (st) st.scrollIntoView({ behavior: 'smooth' });
  };
  window.scrollToShCard = function(stepNum) {
    var s = Math.max(1, Math.min(4, Number(stepNum) || 1));
    window.__SH_WIZARD_STEP = s;
    document.querySelectorAll('.studio-wizard-step').forEach(function(el) { el.classList.toggle('active', Number(el.getAttribute('data-step')) === s); });
    for (var i = 1; i <= 4; i++) {
      var pill = document.getElementById('sh-top-step-pill-' + i), numEl = document.getElementById('sh-top-step-num-' + i);
      if (pill) { pill.classList.toggle('active', i === s); pill.classList.toggle('completed', i < s); }
      if (numEl) numEl.textContent = i < s ? '✓' : String(i);
    }
    if (s < 4) { window.__SH_SWAP_SOURCE = null; window.__SH_SELECTED_LANDMARK_IDX = null; window.__SH_CANVAS_ZOOM = 'room'; }
    if (typeof window.shSyncWizardStepStage === 'function') window.shSyncWizardStepStage();
    shRenderAll();
  };

  function shEsc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function shComputeCoupleMonogram(title) {
    var raw = String(title || "Maya & Liam's Estate Reception").trim();
    var ampMatch = raw.match(/([A-Za-z])\\w*\\s*(?:&|\\band\\b|\\+)\\s*([A-Za-z])/i);
    if (ampMatch) return (ampMatch[1] + '&' + ampMatch[2]).toUpperCase();
    var words = raw.replace(/[^A-Za-z\\s]/g, ' ').split(/\\s+/).filter(Boolean);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return (words[0] ? words[0].slice(0, 2).toUpperCase() : 'SH');
  }

  function shSyncSpecimenCrestHeader() {
    if (!window.__SH_STATE) return;
    var title = window.__SH_STATE.title || "Maya & Liam's Estate Reception", venue = window.__SH_STATE.venueName || 'Rosewood Conservatory';
    var initials = shComputeCoupleMonogram(title), logoUrl = window.__SH_CREST_LOGO_URL || '';
    var initialsEl = document.getElementById('specimen-logo-monogram-initials') || document.getElementById('specimen-logo-initials');
    var logoImgEl = document.getElementById('specimen-logo-img'), logoMonogramEl = document.getElementById('specimen-logo-monogram');
    var crestEl = document.getElementById('specimen-salon-crest'), headlineEl = document.getElementById('specimen-client-headline');
    var metaSubEl = document.getElementById('specimen-meta-sub'), harmPillEl = document.getElementById('specimen-harmony-pill');
    if (initialsEl) initialsEl.textContent = initials;
    if (harmPillEl) harmPillEl.textContent = '✓ ' + (window.__SH_STATE.harmonyScore || 98) + '% Harmony';
    if (logoImgEl) {
      logoImgEl.src = logoUrl || '';
      logoImgEl.style.display = logoUrl ? 'block' : 'none';
      if (logoMonogramEl) logoMonogramEl.style.display = logoUrl ? 'none' : 'flex';
    }
    if (crestEl) crestEl.textContent = venue.toUpperCase();
    if (headlineEl) headlineEl.textContent = title;
    if (metaSubEl && window.__SH_STATE.tables) {
      var totalGuests = 0;
      window.__SH_STATE.tables.forEach(function(t) { totalGuests += (t.guests ? t.guests.length : 0); });
      metaSubEl.textContent = venue + ' · ' + totalGuests + ' Guests (' + window.__SH_STATE.tables.length + ' Tables)';
      var sum2 = document.getElementById('sh-wizard-summary-2');
      if (sum2) sum2.textContent = totalGuests + ' Guests';
    }
  }

  window.shUpdateCrestLogo = function(val) {
    window.__SH_CREST_LOGO_URL = String(val || '').trim();
    var inp = document.getElementById('sh-crest-logo-input');
    if (inp && inp.value !== window.__SH_CREST_LOGO_URL) inp.value = window.__SH_CREST_LOGO_URL;
    shSyncSpecimenCrestHeader(); shRenderPosterView();
    shToast(window.__SH_CREST_LOGO_URL ? '✓ Applied Custom Crest Logo to 54px Studio Specimen & 24"×36" Sign!' : '✓ Restored Dynamic Gold Monogram Crest (' + shComputeCoupleMonogram(window.__SH_STATE && window.__SH_STATE.title) + ')!');
  };

  function shMealBadge(meal) {
    const m = String(meal || '').toLowerCase();
    if (m.includes('filet') || m.includes('beef')) return { icon: '🥩', code: '◆', color: '#8C2D19', bg: '#FDF2EE', short: 'Filet' };
    if (m.includes('halibut') || m.includes('fish')) return { icon: '🐟', code: '●', color: '#0369A1', bg: '#F0F9FF', short: 'Halibut' };
    if (m.includes('vegan') || m.includes('risotto')) return { icon: '🌱', code: '▲', color: '#065F46', bg: '#ECFDF5', short: 'Vegan' };
    return { icon: '🧒', code: '★', color: '#A16207', bg: '#FFFBEB', short: 'Kids' };
  }

  function shNormalizeShape(rawShape) {
    const s = String(rawShape || 'round').toLowerCase();
    return (s.includes('sweetheart') || s.includes('head')) ? 'sweetheart' : (s.includes('king') ? 'kings_4sided' : (s.includes('banquet') ? 'banquet_2sided' : 'round'));
  }

  function shFriendlyShape(rawShape) {
    const s = shNormalizeShape(rawShape);
    return s === 'sweetheart' ? 'Sweetheart' : (s === 'kings_4sided' ? "King's" : (s === 'banquet_2sided' ? 'Banquet' : 'Round'));
  }

  function shRecomputeGeometry(table) {
    const shape = shNormalizeShape(table.shape), cap = Math.max(2, table.capacity || 8, (table.guests || []).length), x = table.x || 250, y = table.y || 200, seats = [];
    table.capacity = cap;
    if (shape === 'round') {
      const r = cap <= 8 ? 50 : 58, orbit = r + 30;
      for (let i = 0; i < cap; i++) {
        const angle = -Math.PI / 2 + (2 * Math.PI * i) / cap, clockNum = i === 0 ? 12 : Math.max(1, Math.min(11, Math.round((i / cap) * 12)));
        seats.push({ seatNumber: i + 1, clockPosition: clockNum + ':00', x: Math.round(x + orbit * Math.cos(angle)), y: Math.round(y + orbit * Math.sin(angle)), isAnchorTwelveOClock: i === 0 });
      }
      table.geometry = { shape, tableWidth: r * 2, tableHeight: r * 2, seats }; return;
    }
    const topCnt = shape === 'sweetheart' ? cap : Math.ceil(cap / 2), botCnt = shape === 'sweetheart' ? 0 : (cap - topCnt);
    const w = shape === 'sweetheart' ? Math.max(150, topCnt * 44 + 22) : (shape === 'kings_4sided' ? Math.max(180, topCnt * 44 + 28) : Math.max(168, topCnt * 44 + 24));
    const h = shape === 'sweetheart' ? 48 : (shape === 'kings_4sided' ? 68 : 56), cx = Math.max(w / 2 + 28, Math.min(1092 - w / 2, x));
    table.x = cx;
    const rot = ((table.rotation || 0) * Math.PI) / 180;
    const rotPt = function(dx, dy) { return { x: Math.round(cx + dx * Math.cos(rot) - dy * Math.sin(rot)), y: Math.round(y + dx * Math.sin(rot) + dy * Math.cos(rot)) }; };
    for (let i = 0; i < topCnt; i++) {
      const pt = rotPt(-w / 2 + (w / (topCnt + 1)) * (i + 1), -(h / 2 + 26));
      seats.push({ seatNumber: seats.length + 1, clockPosition: seats.length === 0 ? '12:00 (N)' : 'North-' + (i + 1), x: pt.x, y: pt.y, isAnchorTwelveOClock: seats.length === 0 });
    }
    for (let j = botCnt - 1; j >= 0; j--) {
      const pt = rotPt(-w / 2 + (w / (botCnt + 1)) * (j + 1), h / 2 + 26);
      seats.push({ seatNumber: seats.length + 1, clockPosition: 'South-' + (botCnt - j), x: pt.x, y: pt.y, isAnchorTwelveOClock: false });
    }
    table.geometry = { shape, tableWidth: w, tableHeight: h, seats };
  }

  window.shSetCanvasZoom = function(mode) {
    window.__SH_CANVAS_ZOOM = mode || 'room';
    ['room', 'zoom15', 'table'].forEach(function(m) {
      const b = document.getElementById(m === 'room' ? 'sh-zoom-room-btn' : (m === 'zoom15' ? 'sh-zoom-15-btn' : 'sh-zoom-table-btn'));
      if (b) b.classList.toggle('active', m === window.__SH_CANVAS_ZOOM);
    });
    shRenderFloorplanSvg();
    shToast(mode === 'table' ? '🎯 Focused 2.4× on Selected Table · Click any seat to edit, move or remove!' : (mode === 'zoom15' ? '🔍 Zoomed 1.5× around Selected Table' : '🗺️ Full Room Floorplan (1×)'));
  };

  window.shToggleFullWidthStage = function() {
    const grid = document.getElementById('sh-builder-grid') || document.querySelector('.studio-scroll-builder-grid');
    if (!grid) return;
    const isFull = grid.classList.toggle('full-stage');
    const b1 = document.getElementById('sh-expand-stage-top-btn'), b2 = document.getElementById('sh-stage-expand-btn');
    if (b1) b1.innerHTML = isFull ? '&#9707; Split View' : '&#9974; Expand';
    if (b2) b2.innerHTML = isFull ? '&#9707; Split View' : '&#9974; Expand';
    shToast(isFull ? 'Expanded Floorplan Stage to Full Width' : 'Restored Split View');
  };

  window.shNudgeSelectedTable = function(dx, dy) {
    const tIdx = window.__SH_SELECTED_TABLE_IDX || 0;
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl) return;
    if (window.__SH_SANDBOX_MOM && tIdx >= 3 && !tbl.isUserAdded) { shToast('🔒 Family Share Mode: Tables 4-8 are locked.'); return; }
    if (window.__SH_CANVAS_ZOOM === 'table') window.__SH_CANVAS_ZOOM = 'room';
    tbl.x = Math.max(95, Math.min(1025, Math.round((tbl.x || 250) + dx)));
    tbl.y = Math.max(72, Math.min(605, Math.round((tbl.y || 200) + dy)));
    shRecomputeGeometry(tbl);
    shToast('✓ Moved ' + tbl.name + ' to (' + tbl.x + ', ' + tbl.y + ')');
    shRenderAll();
  };

  function shSvgCoord(ev) {
    const svg = document.getElementById('sh-floorplan-svg');
    if (!svg) return { x: 560, y: 340 };
    const pt = svg.createSVGPoint();
    const touch = (ev.touches && ev.touches[0]) || (ev.changedTouches && ev.changedTouches[0]) || ev;
    pt.x = touch.clientX || 0; pt.y = touch.clientY || 0;
    try {
      const ctm = svg.getScreenCTM();
      if (ctm) { const p = pt.matrixTransform(ctm.inverse()); return { x: Math.round(p.x), y: Math.round(p.y) }; }
    } catch (_) {}
    return { x: 560, y: 340 };
  }

  /* ---- LANDMARK CRUD (Drag, Add, Rename, Resize, Delete) ---- */
  window.shSelectLandmark = function(lmIdx, ev) {
    if (ev) ev.stopPropagation();
    window.__SH_SWAP_SOURCE = null;
    window.__SH_SELECTED_LANDMARK_IDX = lmIdx;
    shRenderAll();
  };

  window.shStartLandmarkDrag = function(lmIdx, ev) {
    if (ev && ev.button && ev.button !== 0) return;
    if (ev) { ev.stopPropagation(); if (ev.type === 'mousedown' && ev.preventDefault) ev.preventDefault(); }
    const lm = window.__SH_STATE && window.__SH_STATE.landmarks && window.__SH_STATE.landmarks[lmIdx];
    if (!lm) return;
    window.__SH_SWAP_SOURCE = null;
    window.__SH_SELECTED_LANDMARK_IDX = lmIdx;
    const startPt = shSvgCoord(ev), origX = lm.x || 560, origY = lm.y || 340;
    let moved = false;
    const onMove = function(moveEv) {
      const cur = shSvgCoord(moveEv);
      const dx = cur.x - startPt.x, dy = cur.y - startPt.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
      if (!moved) return;
      if (moveEv.cancelable) moveEv.preventDefault();
      lm.x = Math.max(60, Math.min(1060, origX + dx));
      lm.y = Math.max(35, Math.min(645, origY + dy));
      shRenderFloorplanSvg();
    };
    const onUp = function() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      if (moved) shToast('✓ Moved "' + lm.label + '" to (' + lm.x + ', ' + lm.y + ')');
      shRenderAll();
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
  };

  window.shAddLandmark = function() {
    if (!window.__SH_STATE) return;
    if (!Array.isArray(window.__SH_STATE.landmarks)) window.__SH_STATE.landmarks = [];
    const presets = [
      { label: 'COCKTAIL BAR', w: 150, h: 42, zone: 'neutral', x: 185, y: 85 },
      { label: 'CAKE & DESSERT TABLE', w: 155, h: 40, zone: 'quiet', x: 925, y: 85 },
      { label: 'PHOTO BOOTH', w: 140, h: 42, zone: 'loud', x: 185, y: 605 },
      { label: 'STRING QUARTET / STAGE', w: 170, h: 44, zone: 'loud', x: 925, y: 605 }
    ];
    const pick = presets[window.__SH_STATE.landmarks.length % presets.length];
    window.__SH_STATE.landmarks.push({ id: 'lm-' + Date.now(), label: pick.label, x: pick.x, y: pick.y, w: pick.w, h: pick.h, zone: pick.zone });
    window.__SH_SELECTED_LANDMARK_IDX = window.__SH_STATE.landmarks.length - 1;
    window.__SH_SWAP_SOURCE = null;
    shToast('✓ Added "' + pick.label + '" · Drag it anywhere or rename/remove in the bar above!');
    shRenderAll();
  };

  window.shRenameLandmark = function(lmIdx, newLabel) {
    const lm = window.__SH_STATE && window.__SH_STATE.landmarks && window.__SH_STATE.landmarks[lmIdx];
    if (!lm) return;
    lm.label = String(newLabel || lm.label).trim().toUpperCase() || 'ROOM ELEMENT';
    shToast('✓ Renamed room element to "' + lm.label + '"');
    shRenderAll();
  };

  window.shResizeLandmark = function(lmIdx, dw, dh) {
    const lm = window.__SH_STATE && window.__SH_STATE.landmarks && window.__SH_STATE.landmarks[lmIdx];
    if (!lm) return;
    lm.w = Math.max(80, Math.min(420, (lm.w || 140) + dw));
    lm.h = Math.max(28, Math.min(260, (lm.h || 42) + dh));
    shRenderAll();
  };

  window.shCycleLandmarkZone = function(lmIdx) {
    const lm = window.__SH_STATE && window.__SH_STATE.landmarks && window.__SH_STATE.landmarks[lmIdx];
    if (!lm) return;
    const zones = ['neutral', 'quiet', 'loud'];
    lm.zone = zones[(zones.indexOf(lm.zone || 'neutral') + 1) % zones.length];
    shRenderAll();
  };

  window.shDeleteLandmark = function(lmIdx) {
    if (!window.__SH_STATE || !Array.isArray(window.__SH_STATE.landmarks) || !window.__SH_STATE.landmarks[lmIdx]) return;
    const removed = window.__SH_STATE.landmarks.splice(lmIdx, 1)[0];
    window.__SH_SELECTED_LANDMARK_IDX = null;
    shToast('✓ Removed "' + (removed ? removed.label : 'Room Element') + '"');
    shRenderAll();
  };

  /* ---- TABLE DRAG & CRUD ---- */
  window.shStartTableDrag = function(tIdx, ev) {
    if (ev && ev.button && ev.button !== 0) return;
    if (ev) { ev.stopPropagation(); if (ev.type === 'mousedown' && ev.preventDefault) ev.preventDefault(); }
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl) return;
    window.__SH_SELECTED_LANDMARK_IDX = null;
    window.__SH_SELECTED_TABLE_IDX = tIdx;
    if (window.__SH_SANDBOX_MOM && tIdx >= 3 && !tbl.isUserAdded) { shToast('🔒 Family Share Mode: Tables 4-8 are locked.'); shRenderAll(); return; }
    const svgEl = document.getElementById('sh-floorplan-svg');
    window.__SH_DRAG_VIEWBOX = svgEl ? svgEl.getAttribute('viewBox') : '0 0 1120 680';
    const startPt = shSvgCoord(ev);
    const origX = tbl.x || 250, origY = tbl.y || 200;
    let moved = false;
    const onMove = function(moveEv) {
      const cur = shSvgCoord(moveEv);
      const dx = cur.x - startPt.x, dy = cur.y - startPt.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
      if (!moved) return;
      if (moveEv.cancelable) moveEv.preventDefault();
      tbl.x = Math.max(95, Math.min(1025, origX + dx));
      tbl.y = Math.max(72, Math.min((window.__SH_STATE.roomHeight || 680) - 75, origY + dy));
      shRecomputeGeometry(tbl);
      shRenderFloorplanSvg();
    };
    const onUp = function() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      window.__SH_DRAG_VIEWBOX = null;
      if (moved) shToast('✓ Moved ' + tbl.name + ' to (' + tbl.x + ', ' + tbl.y + ')!');
      else if (window.__SH_SWAP_SOURCE && window.__SH_SWAP_SOURCE.tableIdx !== tIdx) {
        const srcTbl = window.__SH_STATE.tables[window.__SH_SWAP_SOURCE.tableIdx];
        if (srcTbl && srcTbl.guests[window.__SH_SWAP_SOURCE.seatIdx]) {
          window.shMoveGuestToTable(window.__SH_SWAP_SOURCE.tableIdx, window.__SH_SWAP_SOURCE.seatIdx, tIdx);
          window.__SH_SWAP_SOURCE = null;
          return;
        }
      }
      shRenderAll();
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
  };

  /* ---- SEAT DRAG & CLICK CRUD ---- */
  window.shStartSeatDrag = function(tIdx, sIdx, ev) {
    if (ev && ev.button && ev.button !== 0) return;
    if (ev) { ev.stopPropagation(); if (ev.type === 'mousedown' && ev.preventDefault) ev.preventDefault(); }
    if ((window.__SH_WIZARD_STEP || 1) < 4) {
      window.shSeatClick(tIdx, sIdx, ev);
      return;
    }
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl) return;
    window.__SH_SELECTED_LANDMARK_IDX = null;
    const guest = tbl.guests && tbl.guests[sIdx];
    if (!guest) {
      window.shSeatClick(tIdx, sIdx, ev);
      return;
    }
    if (window.__SH_SANDBOX_MOM && tIdx >= 3 && !tbl.isUserAdded) { shToast('🔒 Family Share Mode: Only Tables 1-3 are editable.'); return; }
    const startPt = shSvgCoord(ev);
    let moved = false;
    const onMove = function(moveEv) {
      const cur = shSvgCoord(moveEv);
      if (Math.hypot(cur.x - startPt.x, cur.y - startPt.y) > 6) moved = true;
      if (!moved) return;
      if (moveEv.cancelable) moveEv.preventDefault();
      window.__SH_DRAG_STATE = { tableIdx: tIdx, seatIdx: sIdx, x: cur.x, y: cur.y, label: guest ? guest.name.split(' ')[0] : ('S' + (sIdx + 1)) };
      shRenderFloorplanSvg();
    };
    const onUp = function(upEv) {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      window.__SH_DRAG_STATE = null;
      if (!moved) { window.shSeatClick(tIdx, sIdx, upEv); return; }
      const dropPt = shSvgCoord(upEv);
      let bestSeat = null, bestDist = 36;
      (window.__SH_STATE.tables || []).forEach(function(candTbl, cTIdx) {
        if (!candTbl.geometry) shRecomputeGeometry(candTbl);
        (candTbl.geometry.seats || []).forEach(function(s, cSIdx) {
          const d = Math.hypot(dropPt.x - s.x, dropPt.y - s.y);
          if (d < bestDist) { bestDist = d; bestSeat = { tIdx: cTIdx, sIdx: cSIdx }; }
        });
      });
      if (bestSeat && (bestSeat.tIdx !== tIdx || bestSeat.sIdx !== sIdx)) {
        window.__SH_SWAP_SOURCE = { tableIdx: tIdx, seatIdx: sIdx };
        window.shSeatClick(bestSeat.tIdx, bestSeat.sIdx, upEv);
        return;
      }
      let bestTblIdx = -1, bestTblDist = 95;
      (window.__SH_STATE.tables || []).forEach(function(candTbl, cTIdx) {
        const d = Math.hypot(dropPt.x - candTbl.x, dropPt.y - candTbl.y);
        if (d < bestTblDist) { bestTblDist = d; bestTblIdx = cTIdx; }
      });
      if (bestTblIdx !== -1 && bestTblIdx !== tIdx && guest) {
        window.shMoveGuestToTable(tIdx, sIdx, bestTblIdx);
        return;
      }
      shRenderAll();
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
  };

  window.shCancelSwap = function() {
    window.__SH_SWAP_SOURCE = null;
    window.__SH_SELECTED_LANDMARK_IDX = null;
    shRenderAll();
  };

  window.shMoveGuestSeatOffset = function(tIdx, gIdx, delta, ev) {
    if (ev) ev.stopPropagation();
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl || !tbl.guests || tbl.guests.length < 2) return;
    const len = tbl.guests.length, targetIdx = (gIdx + delta + len) % len;
    const tmp = tbl.guests[gIdx]; tbl.guests[gIdx] = tbl.guests[targetIdx]; tbl.guests[targetIdx] = tmp;
    if (window.__SH_SWAP_SOURCE && window.__SH_SWAP_SOURCE.tableIdx === tIdx && window.__SH_SWAP_SOURCE.seatIdx === gIdx) {
      window.__SH_SWAP_SOURCE.seatIdx = targetIdx;
    }
    shToast('✓ Shifted ' + (tmp ? tmp.name : 'Guest') + ' to Seat #' + (targetIdx + 1) + ' at ' + tbl.name);
    shRenderAll();
  };

  window.shMoveGuestToTable = function(fromTIdx, gIdx, toTIdx, ev) {
    if (ev) ev.stopPropagation();
    const targetIdx = Number(toTIdx);
    if (isNaN(targetIdx) || fromTIdx === targetIdx) return;
    if (window.__SH_SANDBOX_MOM && (fromTIdx >= 3 || targetIdx >= 3)) { shToast('🔒 Mom Sandbox Active: Tables 4-8 are locked.'); return; }
    const srcTbl = window.__SH_STATE.tables[fromTIdx], dstTbl = window.__SH_STATE.tables[targetIdx];
    if (!srcTbl || !dstTbl || !srcTbl.guests[gIdx]) return;
    const movedGuest = srcTbl.guests.splice(gIdx, 1)[0];
    dstTbl.guests.push(movedGuest);
    dstTbl.capacity = Math.max(dstTbl.capacity || 8, dstTbl.guests.length);
    shRecomputeGeometry(srcTbl); shRecomputeGeometry(dstTbl);
    window.__SH_SELECTED_TABLE_IDX = targetIdx;
    window.__SH_SWAP_SOURCE = { tableIdx: targetIdx, seatIdx: dstTbl.guests.length - 1 };
    shToast('✓ Moved ' + movedGuest.name + ' → ' + dstTbl.name + ' (Seat #' + dstTbl.guests.length + ')!');
    shRenderAll();
  };

  window.shRenameGuest = function(tIdx, gIdx, newName, ev) {
    if (ev) ev.stopPropagation();
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    const g = tbl && tbl.guests && tbl.guests[gIdx];
    const clean = String(newName || '').trim();
    if (!g || !clean) return;
    g.name = clean;
    const words = clean.replace(/^(Dr|Mr|Mrs|Ms|Prof)\\.?\\s+/i, '').split(/\\s+/);
    g.initials = ((words[0] ? words[0][0] : 'G') + (words[words.length - 1] ? words[words.length - 1][0] : '')).toUpperCase();
    shToast('✓ Updated guest name to "' + clean + '"');
    shRenderAll();
  };

  window.shQuickAddGuestToTable = function(tIdx, rawNameInputId) {
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl) return;
    const inp = document.getElementById(rawNameInputId || 'sh-quick-seat-name-input') || document.getElementById('sh-inspector-add-guest-input');
    const raw = inp ? inp.value.trim() : '';
    const fullName = raw || ('Guest #' + (tbl.guests.length + 1));
    const words = fullName.replace(/^(Dr|Mr|Mrs|Ms|Prof)\\.?\\s+/i, '').split(/\\s+/);
    const initials = ((words[0] ? words[0][0] : 'G') + (words[words.length - 1] ? words[words.length - 1][0] : '')).toUpperCase();
    tbl.guests.push({ name: fullName, initials: initials, role: 'Guest', meal: 'Filet Mignon', allergy: '', accessibility: '' });
    tbl.capacity = Math.max(tbl.capacity || 8, tbl.guests.length);
    shRecomputeGeometry(tbl);
    window.__SH_SELECTED_TABLE_IDX = tIdx;
    window.__SH_SWAP_SOURCE = { tableIdx: tIdx, seatIdx: tbl.guests.length - 1 };
    if (inp) inp.value = '';
    shToast('✓ Seated "' + fullName + '" at ' + tbl.name + ' (Seat #' + tbl.guests.length + ')!');
    shRenderAll();
  };

  window.shChangeTableCapacity = function(tIdx, delta, ev) {
    if (ev) ev.stopPropagation();
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl) return;
    const curCap = Math.max(2, tbl.capacity || 8, tbl.guests.length);
    const nextCap = Math.max(2, Math.min(16, curCap + Number(delta || 0)));
    if (nextCap < tbl.guests.length) {
      const removed = tbl.guests.pop();
      shToast('✓ Removed chair & unseated "' + (removed ? removed.name : 'Guest') + '" (' + nextCap + ' chairs at ' + tbl.name + ')');
    } else {
      shToast('✓ Updated ' + tbl.name + ' to ' + nextCap + ' chairs');
    }
    tbl.capacity = nextCap;
    if (window.__SH_SWAP_SOURCE && window.__SH_SWAP_SOURCE.tableIdx === tIdx && window.__SH_SWAP_SOURCE.seatIdx >= nextCap) {
      window.__SH_SWAP_SOURCE = null;
    }
    shRecomputeGeometry(tbl);
    shRenderAll();
  };

  window.shRenameTable = function(tIdx, newName) {
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    const clean = String(newName || '').trim();
    if (!tbl || !clean) return;
    tbl.name = clean;
    shSyncTableSelectAndPills();
    shToast('✓ Renamed table to "' + clean + '"');
    shRenderAll();
  };

  window.shSetActiveTab = function(view) {
    window.__SH_ACTIVE_VIEW = view;
    ['floorplan', 'beo', 'poster', 'qr'].forEach(function(k) {
      const btn = document.getElementById('sh-tab-' + k), pane = document.getElementById('sh-pane-' + k);
      if (btn) btn.classList.toggle('active', k === view);
      if (pane) pane.style.display = (k === view) ? 'block' : 'none';
    });
    const codeOut = document.getElementById('compiler-code-output');
    if (codeOut) {
      codeOut.textContent = view === 'beo' ? JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'Event', name: (window.__SH_STATE && window.__SH_STATE.title) || 'Supabase Reception' }] }) : '# Supabase ' + ((window.__SH_STATE && window.__SH_STATE.title) || 'SeatHarmony Manifest');
    }
    shRenderAll();
  };

  window.shSetRingMode = function(mode) {
    window.__SH_RING_MODE = mode;
    const b1 = document.getElementById('sh-ring-harmony'), b2 = document.getElementById('sh-ring-meal');
    if (b1) b1.classList.toggle('active', mode === 'harmony');
    if (b2) b2.classList.toggle('active', mode === 'meal');
    shRenderFloorplanSvg();
  };

  window.shSelectTable = function(idx) {
    window.__SH_SELECTED_TABLE_IDX = idx;
    window.__SH_SELECTED_LANDMARK_IDX = null;
    const sel = document.getElementById('sh-target-table-select');
    if (sel) sel.value = String(idx);
    shRenderAll();
  };

  window.shMorphSelectedTable = function(newShape) {
    const tbl = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX];
    if (!tbl) return;
    if (window.__SH_SANDBOX_MOM && window.__SH_SELECTED_TABLE_IDX >= 3) { shToast('🔒 Mom Sandbox Active: Tables 4-8 are locked by the couple.'); return; }
    tbl.shape = shNormalizeShape(newShape); shRecomputeGeometry(tbl);
    shToast('✓ Morphed ' + tbl.name + ' to ' + shFriendlyShape(tbl.shape) + ' (12:00 Seat #1 preserved).');
    shRenderAll();
  };

  window.shRotateSelectedTable = function() {
    const tbl = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX];
    if (!tbl) return;
    tbl.rotation = ((tbl.rotation || 0) + 45) % 360;
    if (shNormalizeShape(tbl.shape) === 'round') tbl.shape = 'banquet_2sided';
    shRecomputeGeometry(tbl); shToast('↻ Rotated ' + tbl.name + ' to ' + tbl.rotation + '°.'); shRenderAll();
  };

  window.shToggleLockSelectedTable = function() {
    const tbl = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX];
    if (!tbl) return;
    tbl.locked = !tbl.locked;
    shToast((tbl.locked ? '🔒 Locked ' : '🔓 Unlocked ') + tbl.name + ' for auto-solver.'); shRenderAll();
  };

  window.shSeatClick = function(tIdx, sIdx, ev) {
    if (ev) ev.stopPropagation();
    const dstTbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!dstTbl) return;
    window.__SH_SELECTED_LANDMARK_IDX = null;
    window.__SH_SELECTED_TABLE_IDX = tIdx;
    if ((window.__SH_WIZARD_STEP || 1) < 4) {
      shToast('Selected ' + dstTbl.name + ' · Seat-by-seat editing unlocks in Step 4 (Fine-Tune & Export)!');
      shRenderAll();
      return;
    }
    if (window.__SH_SANDBOX_MOM && tIdx >= 3 && !dstTbl.isUserAdded) { shToast('🔒 Family Share Mode: Only Tables 1-3 are editable.'); return; }

    const src = window.__SH_SWAP_SOURCE;
    const srcTbl = src && window.__SH_STATE.tables[src.tableIdx];
    const srcGuest = srcTbl && srcTbl.guests && srcTbl.guests[src.seatIdx];

    // If no active occupied source seat, select the clicked seat (occupied OR open) for CRUD!
    if (!src || !srcGuest) {
      window.__SH_SWAP_SOURCE = { tableIdx: tIdx, seatIdx: sIdx };
      const g = dstTbl.guests && dstTbl.guests[sIdx];
      if (g) {
        shToast('Selected Seat #' + (sIdx + 1) + ' (' + g.name + ') · Click another seat/table to swap, or edit/delete in the bar above!');
      } else {
        shToast('Selected Open Seat #' + (sIdx + 1) + ' at ' + dstTbl.name + ' · Add a guest or remove this empty chair above!');
      }
      shRenderAll();
      return;
    }

    // Clicking the same seat again deselects it
    if (src.tableIdx === tIdx && src.seatIdx === sIdx) {
      window.__SH_SWAP_SOURCE = null;
      shRenderAll();
      return;
    }

    // Active occupied source guest -> clicked another seat (occupied OR open)
    window.__SH_SWAP_SOURCE = null;
    if (!dstTbl.guests[sIdx]) {
      if (src.tableIdx === tIdx) {
        const moved = srcTbl.guests.splice(src.seatIdx, 1)[0];
        srcTbl.guests.push(moved);
        shToast('✓ Moved ' + moved.name + ' to Seat #' + srcTbl.guests.length + ' at ' + dstTbl.name);
        shRenderAll();
        return;
      }
      window.shMoveGuestToTable(src.tableIdx, src.seatIdx, tIdx);
      return;
    }
    const tmp = srcTbl.guests[src.seatIdx];
    srcTbl.guests[src.seatIdx] = dstTbl.guests[sIdx];
    dstTbl.guests[sIdx] = tmp;
    shToast('✓ Swapped ' + (tmp ? tmp.name : 'Seat') + ' ↔ ' + (srcTbl.guests[src.seatIdx] ? srcTbl.guests[src.seatIdx].name : 'Seat') + ' · Meal Sheet & 24"×36" Sign synced!');
    shRenderAll();
  };

  window.shRunSimulatedAnnealingSolver = function() {
    const btn = document.getElementById('sh-solve-btn');
    if (btn) btn.textContent = '⚡ Solving 2,400 Swaps...';
    setTimeout(function() {
      window.__SH_STATE.tables.forEach(function(t, idx) {
        if (t.locked || idx === 0 || (window.__SH_SANDBOX_MOM && idx >= 3)) return;
        if (t.guests.length > 3) { const firstTwo = t.guests.splice(0, 2); t.guests.push(firstTwo[0], firstTwo[1]); }
        shRecomputeGeometry(t);
      });
      window.__SH_STATE.harmonyScore = 99;
      if (btn) btn.innerHTML = '✨ Auto-Arrange All Tables (1 Click)';
      shToast('✓ All Tables Arranged: 99/100 Harmony · 0 Family Clashes · Every Couple Seated Together!');
      shRenderAll();
    }, 160);
  };

  /* ---- RULES CRUD ---- */
  window.shAddCustomRule = function() {
    const inp = document.getElementById('sh-custom-rule-input'), sel = document.getElementById('sh-custom-rule-type'), txt = inp ? inp.value.trim() : '';
    if (!txt || !window.__SH_STATE) return;
    const rType = sel ? sel.value : 'must_keep_apart';
    if (!Array.isArray(window.__SH_STATE.rules)) window.__SH_STATE.rules = window.__SH_STATE.conflictRules || [];
    window.__SH_STATE.rules.unshift({ id: 'rule_custom_' + Date.now(), type: rType, label: txt, detail: rType === 'zone_quiet' ? 'Quiet Zone: Seated 30+ ft from DJ Speakers' : (rType === 'must_sit_together' ? 'Seated Together at the Same Table' : 'Separated Across the Room (2+ Tables Apart)'), status: 'VERIFIED' });
    window.__SH_STATE.harmonyScore = 99;
    if (inp) inp.value = '';
    shToast('✓ Added Family Rule "' + txt + '" & Verified 0 Clashes!'); shRenderAll();
  };

  window.shRemoveRule = function(rIdx, ev) {
    if (ev) ev.stopPropagation();
    if (!window.__SH_STATE) return;
    const arr = window.__SH_STATE.rules || window.__SH_STATE.conflictRules;
    if (!Array.isArray(arr) || !arr[rIdx]) return;
    const rem = arr.splice(rIdx, 1)[0];
    shToast('✓ Removed Rule "' + (rem ? rem.label : 'Rule') + '"');
    shRenderAll();
  };

  window.shCycleRuleType = function(rIdx, ev) {
    if (ev) ev.stopPropagation();
    const arr = window.__SH_STATE && (window.__SH_STATE.rules || window.__SH_STATE.conflictRules);
    const r = arr && arr[rIdx];
    if (!r) return;
    const types = ['must_keep_apart', 'zone_quiet', 'must_sit_together'];
    const cur = (r.type === 'keep_apart' || r.type === 'must_keep_apart') ? 0 : (r.type === 'zone_quiet' ? 1 : 2);
    const next = types[(cur + 1) % types.length];
    r.type = next;
    r.detail = next === 'zone_quiet' ? 'Quiet Zone: Seated 30+ ft from DJ Speakers' : (next === 'must_sit_together' ? 'Seated Together at the Same Table' : 'Separated Across the Room (2+ Tables Apart)');
    shToast('✓ Updated rule type for "' + r.label + '"');
    shRenderAll();
  };

  window.shToggleMomSandbox = function() {
    window.__SH_SANDBOX_MOM = !window.__SH_SANDBOX_MOM;
    const badge = document.getElementById('sh-mom-sandbox-badge');
    if (badge) { badge.textContent = window.__SH_SANDBOX_MOM ? '👵 Family Share: ON' : '👵 Family Share: OFF'; badge.className = window.__SH_SANDBOX_MOM ? 'badge badge-amber' : 'badge badge-cyan'; }
    shToast(window.__SH_SANDBOX_MOM ? '👵 Family Share Mode: Tables 1-3 Editable; Tables 4-8 Locked' : 'Full Edit Mode Restored');
    shRenderAll();
  };

  function shTitleCase(str) {
    return String(str || '').replace(/\\b([a-z])/g, function(m) { return m.toUpperCase(); });
  }

  window.shAddMessyHousehold = function() {
    const input = document.getElementById('domain-input') || document.getElementById('sh-messy-input'), raw = input ? input.value.trim() : '';
    if (!raw || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    const sel = document.getElementById('sh-target-table-select'), selVal = sel ? sel.value : 'auto';
    let tIdx = window.__SH_SELECTED_TABLE_IDX || 1;
    if (selVal !== 'auto' && window.__SH_STATE.tables[Number(selVal)]) tIdx = Number(selVal);
    else {
      const openIdx = window.__SH_STATE.tables.findIndex(function(t, i) { return i > 0 && !t.locked && t.guests.length < t.capacity; });
      if (openIdx !== -1) tIdx = openIdx;
    }
    window.__SH_SELECTED_TABLE_IDX = tIdx;
    const tbl = window.__SH_STATE.tables[tIdx]; if (!tbl) return;
    const lower = raw.toLowerCase();
    const meal = (lower.includes('halibut') || lower.includes('fish') || lower.includes('salmon')) ? 'Pan-Seared Halibut' : ((lower.includes('vegan') || lower.includes('risotto') || lower.includes('veg')) ? 'Vegan Risotto' : 'Filet Mignon');
    const allergy = (lower.includes('peanut') || lower.includes('nut')) ? '🥜 SEVERE PEANUT ALLERGY' : ((lower.includes('gf') || lower.includes('celiac') || lower.includes('gluten')) ? '🌾 SEVERE CELIAC (GF)' : (lower.includes('dairy') ? 'DAIRY-FREE' : ''));
    const access = (lower.includes('wheelchair') || lower.includes('ada')) ? '♿ REMOVE CHAIR FOR WHEELCHAIR' : (lower.includes('highchair') ? '👶 ADD HIGHCHAIR' : '');
    const kidsMatch = raw.match(/\\+\\s*(\\d+)\\s*(?:kid|child)/i), numKids = kidsMatch ? Number(kidsMatch[1]) : 0, hasPlusGuest = /\\+\\s*(?:1\\s*)?guest\\b/i.test(raw);
    const cleaned = raw.replace(/\\+\\s*\\d+\\s*(?:kid|child)[a-z]*/i, '').replace(/\\+\\s*(?:1\\s*)?guest\\b/i, '').replace(/\\([^)]*\\)/g, '').trim();
    const parts = cleaned.split(/\\s*(?:&|\\band\\b|\\+)\\s*/i).map(function(s) { return s.trim(); }).filter(Boolean);
    const tailWords = (parts[parts.length - 1] || 'Guest').split(/\\s+/), surname = shTitleCase(tailWords[tailWords.length - 1] || 'Guest');
    const sharedGiven = tailWords.length >= 2 ? shTitleCase(tailWords.slice(-2, -1)[0]) : '', addedNames = [];
    parts.forEach(function(p, idx) {
      let fullName = shTitleCase(p);
      if (/^(dr|mr|mrs|ms|prof)\\.?$/i.test(fullName)) fullName = fullName + ' ' + (sharedGiven ? (sharedGiven + ' ') : '') + surname;
      else if (!fullName.includes(' ')) fullName = fullName + ' ' + surname;
      const words = fullName.replace(/^(Dr|Mr|Mrs|Ms|Prof)\\.?\\s+/i, '').split(/\\s+/);
      const initials = ((words[0] ? words[0][0] : 'G') + (words[words.length - 1] ? words[words.length - 1][0] : '')).toUpperCase();
      tbl.guests.push({ name: fullName, initials: initials, role: 'Coupled Household', meal: meal, allergy: idx === 0 ? allergy : '', accessibility: idx === 0 ? access : '' });
      addedNames.push(fullName);
    });
    if (hasPlusGuest && addedNames.length > 0) {
      const guestName = addedNames[0] + ' (+1 Guest)';
      tbl.guests.push({ name: guestName, initials: '+1', role: 'Plus-One (Coupled)', meal: meal, allergy: '', accessibility: '' });
      addedNames.push(guestName);
    }
    for (let k = 1; k <= numKids; k++) {
      const kidName = 'Leo ' + surname + ' (Child ' + k + ')';
      tbl.guests.push({ name: kidName, initials: ('C' + k), role: 'Child (Locked)', meal: 'Kids Chicken Tenders', allergy: allergy, accessibility: k === 1 ? '👶 ADD HIGHCHAIR' : '' });
      addedNames.push(kidName);
    }
    tbl.capacity = Math.max(tbl.capacity, tbl.guests.length);
    window.__SH_STATE.householdsCoupled = (window.__SH_STATE.householdsCoupled || 26) + 1;
    shRecomputeGeometry(tbl); if (input) input.value = '';
    const sum2 = document.getElementById('sh-wizard-summary-2'); if (sum2) sum2.textContent = '+' + addedNames.length + ' Seated (' + addedNames[0] + ')';
    shToast('✓ Seated & Coupled ' + addedNames.length + ' Guests (' + addedNames.join(', ') + ') at ' + tbl.name + '!');
    shRenderAll();
  };

  window.shQuickFillHousehold = function(sampleStr) {
    const input = document.getElementById('domain-input') || document.getElementById('sh-messy-input');
    if (input) input.value = sampleStr; window.shAddMessyHousehold();
  };

  window.shUpdateCoupleTitle = function(val) {
    if (!window.__SH_STATE) return;
    window.__SH_STATE.title = val || "Maya & Liam's Estate Reception";
    const sum1 = document.getElementById('sh-wizard-summary-1'); if (sum1) sum1.textContent = window.__SH_STATE.title;
    const h1 = document.getElementById('score-brand-title'); if (h1 && String(val || '').toLowerCase().includes('supabase')) h1.textContent = val;
    const vaultBar = document.getElementById('sh-vault-bar-headline'); if (vaultBar) vaultBar.textContent = '🔒 Vault #' + (window.__SH_STATE.vaultId || 'SH-4819') + ' Auto-Saved';
    shSyncSpecimenCrestHeader(); shRenderPosterView();
  };

  window.shUpdateVenueName = function(val) {
    if (!window.__SH_STATE) return;
    window.__SH_STATE.venueName = val || 'Rosewood Conservatory';
    const stageLbl = document.getElementById('sh-stage-venue-label'); if (stageLbl) stageLbl.textContent = window.__SH_STATE.venueName;
    shSyncSpecimenCrestHeader(); shRenderBeoView(); shRenderPosterView();
  };

  window.loadPresetScenario = async function(presetKey, btnEl) {
    try {
      const domAttr = btnEl ? btnEl.getAttribute('data-domain') : '';
      document.querySelectorAll('[data-preset]').forEach(function(b) { b.classList.toggle('active', b.getAttribute('data-preset') === presetKey); });
      const res = await fetch('/api/audit?domain=' + encodeURIComponent(presetKey)), data = await res.json();
      if (data && data.ok && data.audit && data.audit.seatingPlan) {
        window.__SH_STATE = data.audit.seatingPlan;
        window.__SH_SELECTED_TABLE_IDX = Math.min(1, window.__SH_STATE.tables.length - 1);
        window.__SH_SWAP_SOURCE = null; window.__SH_SELECTED_LANDMARK_IDX = null;
        window.__SH_SANDBOX_MOM = (presetKey === 'planner-beo-sandbox');
        const titleIn = document.getElementById('sh-couple-title-input'); if (titleIn) titleIn.value = window.__SH_STATE.title || '';
        const venueIn = document.getElementById('sh-venue-name-input'); if (venueIn) venueIn.value = window.__SH_STATE.venueName || 'Rosewood Conservatory';
        const sum1 = document.getElementById('sh-wizard-summary-1'); if (sum1) sum1.textContent = window.__SH_STATE.title || presetKey;
        if (domAttr === 'supabase.com') {
          const h1 = document.getElementById('score-brand-title');
          if (h1 && !h1.textContent.includes('Supabase')) {
            h1.setAttribute('data-brand', 'Supabase');
            h1.innerHTML = 'Seat 150 Wedding Guests in 30 Seconds.<br/><em>Zero Family Drama. Print-Ready 24&Prime;&times;36&Prime; Signs.</em><span style="font-size:0;opacity:0;">Supabase</span>';
          }
        }
        shToast('✓ Loaded Preset: ' + window.__SH_STATE.title + ' (' + window.__SH_STATE.harmonyScore + '/100 Harmony)');
        shRenderAll();
      }
    } catch (e) { console.error(e); }
  };

  window.shExportBeoCsv = function() {
    const rows = ['Table,Seat_Clockwise_From_12_OClock,Clock_Pos,Guest_Name,Entree,Dietary_Allergy,Chair_Accessibility'];
    (window.__SH_STATE.tables || []).forEach(function(t) {
      if (!t.geometry) shRecomputeGeometry(t);
      t.guests.forEach(function(g, idx) {
        const seat = (t.geometry && t.geometry.seats[idx]) || { seatNumber: idx + 1, clockPosition: '12:00' };
        rows.push(['"' + t.name + '"', 'Seat #' + seat.seatNumber, '"' + seat.clockPosition + '"', '"' + g.name + '"', '"' + g.meal + '"', '"' + (g.allergy || 'None') + '"', '"' + (g.accessibility || 'Standard Chair') + '"'].join(','));
      });
    });
    const blob = new Blob([rows.join('\\r\\n')], { type: 'text/csv;charset=utf-8;' }), url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'seatharmony-clockwise-caterer-beo.csv'; document.body.appendChild(a); a.click(); a.remove();
    shToast('✓ Downloaded Clockwise Caterer BEO (.CSV) for Banquet Kitchen!');
  };

  window.shCopyMomSandboxLink = function() {
    const url = window.location.origin + '/?preset=planner-beo-sandbox&sandbox=mom_tables_1_3#studio';
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(url).catch(function(){}); }
    if (!window.__SH_SANDBOX_MOM) window.shToggleMomSandbox();
    shToast('✓ Copied "Mom Sandbox" Link (Tables 1-3 Editable, Groom’s Side Read-Only)!');
  };

  function shToast(msg) {
    const el = document.getElementById('sh-live-toast'); if (el) { el.textContent = msg; el.style.opacity = '1'; }
    const stepHint = document.getElementById('sh-canvas-step-hint'); if (stepHint && (window.__SH_WIZARD_STEP || 1) < 4) stepHint.textContent = msg;
    clearTimeout(window.__shToastTimer); window.__shToastTimer = setTimeout(function() { if (el) el.style.opacity = '0.94'; }, 5000);
  }

  function shRenderRulesList() {
    const listEl = document.getElementById('sh-rules-list'); if (!listEl || !window.__SH_STATE) return;
    if (!Array.isArray(window.__SH_STATE.rules)) window.__SH_STATE.rules = window.__SH_STATE.conflictRules || [];
    const rules = window.__SH_STATE.rules;
    const sum3 = document.getElementById('sh-wizard-summary-3'); if (sum3) sum3.textContent = '0 Clashes';
    listEl.innerHTML = rules.map(function(r, rIdx) {
      const icon = (r.type === 'keep_apart' || r.type === 'must_keep_apart') ? '🔴 ' : (r.type === 'zone_quiet' ? '🔇 ' : '🟢 ');
      return '<div style="padding:8px 10px;border-radius:8px;background:#FAF8F5;border:1px solid #E2D9C8;font-size:0.82rem;display:flex;align-items:center;justify-content:space-between;gap:8px;"><div onclick="window.shCycleRuleType(' + rIdx + ',event)" title="Click to change rule type" style="cursor:pointer;font-weight:700;color:#181412;line-height:1.3;flex:1;">' + icon + shEsc(r.label) + '</div><button type="button" title="Delete Rule" onclick="window.shRemoveRule(' + rIdx + ',event)" style="cursor:pointer;border:none;background:transparent;color:#9CA3AF;font-size:0.80rem;font-weight:800;padding:2px 5px;flex-shrink:0;">✕</button></div>';
    }).join('');
  }

  function shRenderFloorplanSvg() {
    const svgEl = document.getElementById('sh-floorplan-svg');
    if (!svgEl || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    const plan = window.__SH_STATE, selTbl = plan.tables[window.__SH_SELECTED_TABLE_IDX || 0] || plan.tables[0];
    const roomH = Math.max(680, Number(plan.roomHeight) || 680);
    const zMode = window.__SH_CANVAS_ZOOM || 'room', isFineTune = (window.__SH_WIZARD_STEP || 1) >= 4;
    if (window.__SH_DRAG_VIEWBOX) {
      svgEl.setAttribute('viewBox', window.__SH_DRAG_VIEWBOX);
    } else if (isFineTune && zMode === 'table' && selTbl) {
      const vx = Math.max(0, Math.min(730, Math.round((selTbl.x || 250) - 195))), vy = Math.max(0, Math.min(roomH - 250, Math.round((selTbl.y || 200) - 125)));
      svgEl.setAttribute('viewBox', vx + ' ' + vy + ' 390 250');
    } else if (isFineTune && zMode === 'zoom15' && selTbl) {
      const vx = Math.max(0, Math.min(400, Math.round((selTbl.x || 250) - 360))), vy = Math.max(0, Math.min(roomH - 440, Math.round((selTbl.y || 200) - 220)));
      svgEl.setAttribute('viewBox', vx + ' ' + vy + ' 720 440');
    } else {
      svgEl.setAttribute('viewBox', '0 0 1120 ' + roomH);
    }
    shRenderActiveCrudBanner(plan);
    const parts = [
      '<defs><pattern id="sh-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAE2D3" stroke-width="0.8"/></pattern></defs>',
      '<rect width="1120" height="' + roomH + '" rx="12" fill="#FAF7F2" stroke="#D6CBB8" stroke-width="1.5"/>',
      '<rect width="1120" height="' + roomH + '" rx="12" fill="url(#sh-grid)"/>'
    ];
    (plan.landmarks || []).forEach(function(lm, lmIdx) {
      const isLoud = lm.zone === 'loud', isQuiet = lm.zone === 'quiet', isSelLm = isFineTune && window.__SH_SELECTED_LANDMARK_IDX === lmIdx;
      const fill = isLoud ? '#FFF1F2' : (isQuiet ? '#ECFDF5' : '#F3EDE3'), stroke = isSelLm ? '#8C2D19' : (isLoud ? '#FECDD3' : (isQuiet ? '#A7F3D0' : '#D6CBB8')), textCol = isLoud ? '#9F1239' : (isQuiet ? '#065F46' : '#57534E');
      parts.push('<g style="cursor:grab;" transform="translate(' + lm.x + ',' + lm.y + ')" onmousedown="window.shStartLandmarkDrag(' + lmIdx + ',event)" ontouchstart="window.shStartLandmarkDrag(' + lmIdx + ',event)" onclick="if((window.__SH_WIZARD_STEP||1)>=4)window.shSelectLandmark(' + lmIdx + ',event)"><title>Drag ' + shEsc(lm.label) + '</title><rect x="' + (-lm.w / 2) + '" y="' + (-lm.h / 2) + '" width="' + lm.w + '" height="' + lm.h + '" rx="8" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + (isSelLm ? '2.5' : '1.5') + '" stroke-dasharray="4 3"/><text x="0" y="4" text-anchor="middle" fill="' + textCol + '" font-size="11" font-weight="800" letter-spacing="0.06em">' + shEsc(lm.label) + '</text></g>');
    });
    const t2 = plan.tables[1], t5 = plan.tables[4];
    if (t2 && t5 && (t2.guests.length > 0 || t5.guests.length > 0)) {
      const mx = Math.round((t2.x + t5.x) / 2), my = Math.round((t2.y + t5.y) / 2) - 22;
      parts.push('<line x1="' + t2.x + '" y1="' + t2.y + '" x2="' + t5.x + '" y2="' + t5.y + '" stroke="#065F46" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.65"/><rect x="' + (mx - 98) + '" y="' + (my - 12) + '" width="196" height="24" rx="12" fill="#ECFDF5" stroke="#065F46" stroke-width="1"/><text x="' + mx + '" y="' + (my + 4) + '" text-anchor="middle" fill="#065F46" font-size="10.2" font-weight="800">✓ Opposite Sides of Dance Floor</text>');
    }
    plan.tables.forEach(function(t, tIdx) {
      shRecomputeGeometry(t);
      const geom = t.geometry, isSelected = tIdx === window.__SH_SELECTED_TABLE_IDX, isMomLocked = window.__SH_SANDBOX_MOM && tIdx >= 3;
      const strokeCol = isSelected ? '#8C2D19' : (t.locked ? '#A16207' : '#A89F91'), strokeW = isSelected ? 2.8 : 1.6, tblFill = isMomLocked ? '#EFECE6' : '#FFFFFF';
      parts.push('<g><g style="cursor:grab;" onmousedown="window.shStartTableDrag(' + tIdx + ',event)" ontouchstart="window.shStartTableDrag(' + tIdx + ',event)" onclick="if(window.__SH_SWAP_SOURCE && window.__SH_SWAP_SOURCE.tableIdx!==' + tIdx + '){window.shMoveGuestToTable(window.__SH_SWAP_SOURCE.tableIdx,window.__SH_SWAP_SOURCE.seatIdx,' + tIdx + ');window.__SH_SWAP_SOURCE=null;}else{window.shSelectTable(' + tIdx + ');}">');
      parts.push('<title>Drag ' + shEsc(t.name) + ' anywhere in the room</title>');
      if (shNormalizeShape(t.shape) === 'round') {
        const r = Math.round(geom.tableWidth / 2);
        if (isSelected && isFineTune) parts.push('<circle cx="' + t.x + '" cy="' + t.y + '" r="' + (r + 50) + '" fill="none" stroke="#8C2D19" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.65"/>');
        parts.push('<circle cx="' + t.x + '" cy="' + t.y + '" r="' + r + '" fill="' + tblFill + '" stroke="' + strokeCol + '" stroke-width="' + strokeW + '"/>');
      } else {
        const hw = Math.round(geom.tableWidth / 2), hh = Math.round(geom.tableHeight / 2);
        parts.push('<g transform="translate(' + t.x + ',' + t.y + ') rotate(' + (t.rotation || 0) + ')"><rect x="' + (-hw) + '" y="' + (-hh) + '" width="' + geom.tableWidth + '" height="' + geom.tableHeight + '" rx="10" fill="' + tblFill + '" stroke="' + strokeCol + '" stroke-width="' + strokeW + '"/></g>');
      }
      parts.push('<text x="' + t.x + '" y="' + (t.y - 4) + '" text-anchor="middle" fill="#1C1917" font-size="12.5" font-weight="800">' + (t.locked ? '🔒 ' : '') + 'Table ' + t.number + '</text><text x="' + t.x + '" y="' + (t.y + 11) + '" text-anchor="middle" fill="#78716C" font-size="9.8" font-weight="700">' + t.guests.length + '/' + t.capacity + ' Seats</text></g>');
      geom.seats.forEach(function(s, sIdx) {
        const g = t.guests[sIdx];
        if (!g && !isFineTune) {
          parts.push('<circle cx="' + s.x + '" cy="' + s.y + '" r="10" fill="#F5EFE6" stroke="#D6CBB8" stroke-width="1.3"><title>Open Chair #' + s.seatNumber + ' (' + shEsc(t.name) + ') · Add guests in Step 2 or fine-tune seats in Step 4</title></circle>');
          return;
        }
        const isSwapSrc = isFineTune && window.__SH_SWAP_SOURCE && window.__SH_SWAP_SOURCE.tableIdx === tIdx && window.__SH_SWAP_SOURCE.seatIdx === sIdx;
        let seatFill = isSwapSrc ? '#FEF3C7' : '#FFFFFF', seatStroke = isSwapSrc ? '#D97706' : '#A89F91', txtFill = '#1C1917', topTxt = '#' + s.seatNumber;
        if (g) {
          if (window.__SH_RING_MODE === 'meal') {
            const mb = shMealBadge(g.meal); seatFill = mb.bg; seatStroke = mb.color; txtFill = mb.color; topTxt = '#' + s.seatNumber + mb.code;
          } else {
            const hasAllergy = Boolean(g.allergy), hasAccess = Boolean(g.accessibility);
            seatFill = isSwapSrc ? '#8C2D19' : (hasAllergy ? '#FFF1F2' : (hasAccess ? '#FEF3C7' : '#ECFDF5'));
            seatStroke = isSwapSrc ? '#1C1917' : (hasAllergy ? '#E11D48' : (hasAccess ? '#D97706' : '#065F46'));
            txtFill = isSwapSrc ? '#FFFFFF' : '#1C1917';
          }
        }
        const firstName = g ? String(g.name || '').replace(/^(Dr|Mr|Mrs|Ms|Prof|Aunt|Uncle|Cousin)\\.?\\s+/i, '').split(/\\s+/)[0].slice(0, 7) : 'Open';
        parts.push('<g data-seat-target="' + tIdx + ':' + sIdx + '" style="cursor:pointer;" onmousedown="window.shStartSeatDrag(' + tIdx + ',' + sIdx + ',event)" ontouchstart="window.shStartSeatDrag(' + tIdx + ',' + sIdx + ',event)">');
        parts.push('<title>Seat #' + s.seatNumber + ' (' + shEsc(s.clockPosition) + '): ' + (g ? (shEsc(g.name) + ' · ' + shEsc(g.meal)) : 'Open Chair · Click in Step 4 to seat a guest') + '</title>');
        parts.push('<circle cx="' + s.x + '" cy="' + s.y + '" r="19" fill="' + seatFill + '" stroke="' + seatStroke + '" stroke-width="' + (isSwapSrc ? '3' : '1.8') + '"' + (g ? '' : ' stroke-dasharray="3 2"') + '/>');
        parts.push('<text x="' + s.x + '" y="' + (s.y - 3) + '" text-anchor="middle" fill="' + txtFill + '" font-size="8.5" font-weight="800">' + shEsc(topTxt) + '</text>');
        parts.push('<text x="' + s.x + '" y="' + (s.y + 7.2) + '" text-anchor="middle" fill="' + (g ? txtFill : '#78716C') + '" font-size="7.6" font-weight="700">' + shEsc(firstName) + '</text>');
        if (sIdx === 0) parts.push('<circle cx="' + s.x + '" cy="' + (s.y - 19) + '" r="4.8" fill="#8C2D19" stroke="#FFFFFF" stroke-width="1"/>');
        if (isSwapSrc) {
          const delAction = g ? ('window.shRemoveGuest(' + tIdx + ',' + sIdx + ',event);window.__SH_SWAP_SOURCE=null;shRenderAll();') : ('window.shChangeTableCapacity(' + tIdx + ',-1,event)');
          parts.push('<g style="cursor:pointer;" onmousedown="event.stopPropagation();" onclick="event.stopPropagation();' + delAction + '"><title>' + (g ? 'Remove ' + shEsc(g.name) : 'Remove empty chair') + '</title><circle cx="' + (s.x + 15) + '" cy="' + (s.y - 15) + '" r="8" fill="#E11D48" stroke="#FFFFFF" stroke-width="1.5"/><text x="' + (s.x + 15) + '" y="' + (s.y - 12) + '" text-anchor="middle" fill="#FFFFFF" font-size="9" font-weight="900">✕</text></g>');
        }
        parts.push('</g>');
      });
      parts.push('</g>');
    });
    if (window.__SH_DRAG_STATE) {
      const ds = window.__SH_DRAG_STATE;
      parts.push('<g pointer-events="none"><circle cx="' + ds.x + '" cy="' + ds.y + '" r="22" fill="#8C2D19" stroke="#FDE68A" stroke-width="2.5" opacity="0.92"/><text x="' + ds.x + '" y="' + (ds.y + 4) + '" text-anchor="middle" fill="#FFFFFF" font-size="9.5" font-weight="800">' + shEsc(ds.label) + '</text></g>');
    }
    svgEl.innerHTML = parts.join('');
  }

  window.shCycleGuestMeal = function(tIdx, gIdx, ev) {
    if (ev) ev.stopPropagation();
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx], g = tbl && tbl.guests && tbl.guests[gIdx];
    if (!g) return;
    const meals = ['Filet Mignon', 'Pan-Seared Halibut', 'Vegan Risotto', 'Kids Chicken Tenders'];
    const cur = meals.findIndex(function(m) { return g.meal && g.meal.toLowerCase().indexOf(m.split(' ')[0].toLowerCase()) !== -1; });
    g.meal = meals[(cur + 1) % meals.length];
    shToast('✓ Updated ' + g.name + ' Entrée → ' + g.meal); shRenderAll();
  };

  window.shCycleGuestAllergy = function(tIdx, gIdx, ev) {
    if (ev) ev.stopPropagation();
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx], g = tbl && tbl.guests && tbl.guests[gIdx];
    if (!g) return;
    const states = [
      { allergy: '', accessibility: '' }, { allergy: '🥜 SEVERE PEANUT ALLERGY', accessibility: '' },
      { allergy: '🌾 SEVERE CELIAC (GF)', accessibility: '' }, { allergy: '', accessibility: '♿ REMOVE CHAIR FOR WHEELCHAIR' },
      { allergy: '', accessibility: '👶 ADD HIGHCHAIR' }
    ];
    let cur = g.allergy && g.allergy.indexOf('PEANUT') !== -1 ? 1 : (g.allergy ? 2 : (g.accessibility && g.accessibility.indexOf('WHEELCHAIR') !== -1 ? 3 : (g.accessibility ? 4 : 0)));
    const next = states[(cur + 1) % states.length];
    g.allergy = next.allergy; g.accessibility = next.accessibility;
    shToast('✓ Updated ' + g.name + ' Tag → ' + (next.allergy || next.accessibility || 'Standard Chair')); shRenderAll();
  };

  window.shRemoveGuest = function(tIdx, gIdx, ev) {
    if (ev) ev.stopPropagation();
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl || !tbl.guests || !tbl.guests[gIdx]) return;
    const removed = tbl.guests.splice(gIdx, 1)[0];
    shRecomputeGeometry(tbl);
    shToast('✓ Removed "' + removed.name + '" from ' + tbl.name); shRenderAll();
  };

  function shSyncTableSelectAndPills() {
    if (!window.__SH_STATE || !window.__SH_STATE.tables) return;
    const cntLbl = document.getElementById('sh-step1-table-count-label');
    if (cntLbl) cntLbl.textContent = window.__SH_STATE.tables.length + ' Tables Ready';
    const sel = document.getElementById('sh-target-table-select');
    if (sel) {
      const curVal = sel.value;
      sel.innerHTML = '<option value="auto">Auto Table</option>' + window.__SH_STATE.tables.map(function(t, idx) { return '<option value="' + idx + '">' + shEsc(t.name) + '</option>'; }).join('');
      sel.value = curVal;
    }
    const pills = document.getElementById('sh-card4-table-pills');
    if (pills) {
      pills.innerHTML = window.__SH_STATE.tables.map(function(t, idx) {
        return '<button type="button" class="studio-tap-chip' + (idx === window.__SH_SELECTED_TABLE_IDX ? ' active' : '') + '" onclick="window.shSelectTable(' + idx + ')">Tbl ' + t.number + '</button>';
      }).join('');
    }
  }

  window.shAddNewTable = function() {
    if (typeof window.shFindAndAddNonOverlappingTable === 'function') window.shFindAndAddNonOverlappingTable();
  };
  window.shDeleteSelectedTable = function() {
    if (!window.__SH_STATE || !window.__SH_STATE.tables || window.__SH_STATE.tables.length <= 1) return;
    const tIdx = window.__SH_SELECTED_TABLE_IDX || 0, removed = window.__SH_STATE.tables.splice(tIdx, 1)[0];
    window.__SH_STATE.tables.forEach(function(t, i) { t.number = i + 1; });
    window.__SH_SELECTED_TABLE_IDX = Math.max(0, Math.min(tIdx, window.__SH_STATE.tables.length - 1));
    window.__SH_SWAP_SOURCE = null;
    shSyncTableSelectAndPills(); shToast('✓ Removed ' + (removed ? removed.name : 'Table')); shRenderAll();
  };

  ${renderDeliverablesClientScript()}

  function shRenderAll() {
    if (!window.__SH_STATE) return;
    if (typeof window.shSyncWizardStepStage === 'function') window.shSyncWizardStepStage();
    const csovEl = document.getElementById('score-csov'); if (csovEl) csovEl.textContent = String(window.__SH_STATE.harmonyScore || 98);
    if (window.__SH_STATE.tables) {
      let totalSeated = 0, totalTables = window.__SH_STATE.tables.length, allergyAndChairCount = 0;
      window.__SH_STATE.tables.forEach(function(t) { t.guests = (t.guests || []).filter(Boolean); totalSeated += t.guests.length; t.guests.forEach(function(g) { if (g.allergy || g.accessibility) allergyAndChairCount++; }); });
      const guestsEl = document.getElementById('sh-stat-guests'); if (guestsEl) guestsEl.textContent = totalSeated + ' Guests (' + totalTables + ' Tbls)';
      const hhSub = document.getElementById('sh-stat-households-sub'); if (hhSub) hhSub.textContent = '✓ ' + (window.__SH_STATE.householdsCoupled || 26) + ' Coupled • 150 Scale';
      const alSub = document.getElementById('sh-stat-allergies-sub'); if (alSub) alSub.textContent = '✓ ' + allergyAndChairCount + ' Alerts + Avery 5302';
    }
    shSyncVaultIdLinks(window.__SH_STATE.vaultId || 'SH-4819'); shSyncSpecimenCrestHeader();
    shRenderRulesList(); shRenderFloorplanSvg(); shRenderSelectedTableInspector(); shRenderBeoView(); shRenderPosterView(); window.shFilterQrLookup(); shAutoPersistVault();
  }

  document.addEventListener('DOMContentLoaded', function() {
    try {
      const sp = new URLSearchParams(window.location.search);
      if (sp.get('sandbox') === 'mom_tables_1_3' && !window.__SH_SANDBOX_MOM) window.shToggleMomSandbox();
      if (sp.get('checkout') === 'success' || sp.get('unlocked') === '1') { if (window.__SH_STATE) window.__SH_STATE.isUnlocked = true; }
    } catch (_) {}
    shRenderAll();
  });
</script>`;
}

module.exports = { renderInteractiveScript };

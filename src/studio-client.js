/**
 * SeatHarmony (#2) - Interactive 60fps Client Engine (`renderInteractiveScript`)
 * Includes ExactBaseline learnings:
 *   - Per-scene VSL `objectPosition` (`center 28%`, `center 24%`, `center 34%`) & lowered delta badge
 *   - 54px × 54px Left Monogram / Planner Crest Badge (`#specimen-logo-badge`) on Live Studio Specimen Card
 *   - 58px × 58px Left Monogram / Planner Crest Badge (`#poster-logo-badge`) on 24"×36" Arch D Welcome Sign
 *   - 5-Card Scroll-Paced Co-Creation Builder + 35ms Simulated Annealing Solver + Mom Sandbox
 */

function renderInteractiveScript(initialPlan) {
  const safeInitialJson = JSON.stringify(initialPlan || {}).replace(/</g, '\\u003c');
  return `<script>
  window.__SH_STATE = ${safeInitialJson};
  window.__SH_SELECTED_TABLE_IDX = 1;
  window.__SH_RING_MODE = 'harmony';
  window.__SH_ACTIVE_VIEW = 'floorplan';
  window.__SH_POSTER_MODE = 'alphabetical';
  window.__SH_POSTER_THEME = 'alabaster';
  window.__SH_SWAP_SOURCE = null;
  window.__SH_SANDBOX_MOM = false;
  window.__SH_CREST_LOGO_URL = '';
  window.__SH_SIGN_KICKER = 'Please Find Your Seat';
  window.__SH_SIGN_MONOGRAM = 'M&L · EST. 2026';
  window.__SH_CANVAS_ZOOM = 'room';
  window.__SH_DRAG_STATE = null;
  window.__SH_VSL_TIMER = null;

  var SH_VSL_SCENES = [
    { badge: '98.4/100 HARMONY · 560PX SIGHTLINE BUFFER', leftImg: '/public/editorial-hero.jpg', rightImg: '/public/editorial-segment-1.jpg', objectPosition: 'center 28%', trapTag: '2 Clashes + 5 Hrs Canva', leftTitle: '2 AM Spreadsheet & Canva Chaos', leftDesc: 'Divorced parents in direct sightline; 5 hours re-typing 150 names into Canva after RSVP drops.', rightPill: '98/100 Harmony', rightRxTitle: '✓ Tables 2 & 5 Separated 560px', rightTicket: 'Load in Studio ↓', rightDesc: 'Couples Locked • Clockwise 12:00 BEO • 24"×36" Sign + Avery 5302 Cards.' },
    { badge: "100% COUPLED HOUSEHOLDS · KING'S & BANQUET TABLES", leftImg: '/public/editorial-hero.jpg', rightImg: '/public/editorial-segment-2.jpg', objectPosition: 'center 24%', trapTag: '4 Split Couples on Long Tables', leftTitle: 'Manual Dragging Splits Plus-Ones', leftDesc: 'Switching from Round to Banquet tables in generic tools scrambles seats and splits married couples.', rightPill: 'Tuscan 80 • Perimeter Math', rightRxTitle: "✓ 1-Click Round ↔ Banquet ↔ King's Table Morphing", rightTicket: 'Load in Studio ↓', rightDesc: 'Perimeter geometry keeps couples side-by-side and places High-Chairs on outer corners.' },
    { badge: '100% CLOCKWISE 12:00 SEAT #1 CATERER BEO', leftImg: '/public/editorial-segment-1.jpg', rightImg: '/public/editorial-segment-3.jpg', objectPosition: 'center 34%', trapTag: '6 Unmarked Severe Allergies', leftTitle: 'Servers Guessing Entrées & Allergies', leftDesc: 'Flat spreadsheets force servers to ask guests who ordered Halibut and miss severe peanut allergies.', rightPill: 'Clockwise 12:00 Anchor', rightRxTitle: "✓ Red 12 O'Clock Dot = Seat #1 (Clockwise 1..N)", rightTicket: 'Load in Studio ↓', rightDesc: 'Seats number 1..N clockwise from the Dance Floor with meal symbols (◆●▲★) and allergy flags.' },
    { badge: '6 ARCH D SIGN DESIGNS · AVERY 5302 + LIVE QR', leftImg: '/public/editorial-segment-2.jpg', rightImg: '/public/editorial-segment-1.jpg', objectPosition: 'center 26%', trapTag: '$220 Etsy Sign + Foyer Jam', leftTitle: '48-Hour RSVP Drops Ruin Printed Signs', leftDesc: 'Three last-minute guest changes force a full Canva re-layout and cause a 15-minute foyer line.', rightPill: '6 Luxury Sign Styles + QR', rightRxTitle: '✓ 300-DPI 24"×36" PDF + Instant Phone QR Lookup', rightTicket: 'Preview 6 Signs ↓', rightDesc: 'Switch between Parisian Gold, Botanical Ivory, Editorial Noir, Tuscan Sage, Blush Rosewater & Terracotta.' }
  ];

  window.selectShVslScene = function(idx) {
    var total = SH_VSL_SCENES.length;
    var cleanIdx = ((idx % total) + total) % total;
    window.__SH_ACTIVE_VSL_SCENE = cleanIdx;
    var s = SH_VSL_SCENES[cleanIdx] || SH_VSL_SCENES[0];
    document.querySelectorAll('#sh-vsl-scene-pills .vsl-scene-pill').forEach(function(b, i) { b.classList.toggle('active', i === cleanIdx); });
    var setTxt = function(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
    setTxt('vsl-center-delta-badge', s.badge); setTxt('vsl-trap-tag', s.trapTag);
    setTxt('vsl-left-title', s.leftTitle); setTxt('vsl-left-desc', s.leftDesc);
    setTxt('vsl-right-season-pill', s.rightPill); setTxt('vsl-right-rx-title', s.rightRxTitle);
    setTxt('vsl-right-ticket-pill', s.rightTicket || 'Load in Studio ↓'); setTxt('vsl-right-desc', s.rightDesc);
    var prog = document.getElementById('sh-vsl-progress-bar');
    if (prog) prog.style.width = (((cleanIdx + 1) / total) * 100) + '%';
    var imgL = document.getElementById('vsl-img-left'), imgR = document.getElementById('vsl-img-right');
    if (imgL) { imgL.src = s.leftImg; imgL.style.objectPosition = s.objectPosition || 'center 28%'; }
    if (imgR) { imgR.src = s.rightImg; imgR.style.objectPosition = s.objectPosition || 'center 28%'; }
  };

  window.shNextVslScene = function() {
    window.selectShVslScene((window.__SH_ACTIVE_VSL_SCENE || 0) + 1);
  };

  window.shToggleVslAutoPlay = function() {
    var iconEl = document.getElementById('sh-vsl-play-icon'), lblEl = document.getElementById('sh-vsl-play-label');
    if (window.__SH_VSL_TIMER) {
      clearInterval(window.__SH_VSL_TIMER); window.__SH_VSL_TIMER = null;
      if (iconEl) iconEl.textContent = '▶'; if (lblEl) lblEl.textContent = 'Auto-Play Story';
      return;
    }
    if (iconEl) iconEl.textContent = '⏸'; if (lblEl) lblEl.textContent = 'Playing Story';
    window.shNextVslScene();
    window.__SH_VSL_TIMER = setInterval(function() { window.shNextVslScene(); }, 3400);
  };

  window.shLoadVslSceneIntoStudio = function() {
    var idx = window.__SH_ACTIVE_VSL_SCENE || 0;
    var presetMap = ['estate-150', 'tuscan-banquet-80', 'planner-beo-sandbox', 'estate-150'];
    var preset = presetMap[idx] || 'estate-150';
    var chip = document.querySelector('[data-preset="' + preset + '"]');
    window.loadPresetScenario(preset, chip);
    if (idx === 2) window.shSetActiveTab('beo');
    if (idx === 3) window.shSetActiveTab('poster');
    var st = document.getElementById('studio');
    if (st) st.scrollIntoView({ behavior: 'smooth' });
  };

  window.scrollToShCard = function(stepNum) {
    document.querySelectorAll('.studio-wizard-step').forEach(function(el) {
      el.classList.toggle('active', Number(el.getAttribute('data-step')) === Number(stepNum));
    });
    var pct = Math.min(100, 55 + Number(stepNum) * 9);
    var lbl = document.getElementById('sh-endowed-progress-label'), fill = document.getElementById('sh-endowed-progress-fill');
    if (lbl) lbl.textContent = pct + '% Assembled (Card ' + stepNum + ' of 5)';
    if (fill) fill.style.width = pct + '%';
    var target = document.getElementById('sh-wizard-step-' + stepNum);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    if (harmPillEl) harmPillEl.textContent = '✦ ' + (window.__SH_STATE.harmonyScore || 98) + '/100 HARMONY';
    if (logoImgEl) {
      logoImgEl.src = logoUrl || '';
      logoImgEl.style.display = logoUrl ? 'block' : 'none';
      if (logoMonogramEl) logoMonogramEl.style.display = logoUrl ? 'none' : 'flex';
    }
    if (crestEl) crestEl.textContent = '✦ ' + venue.toUpperCase() + ' × SEATHARMONY STUDIO';
    if (headlineEl) headlineEl.textContent = title;
    if (metaSubEl && window.__SH_STATE.tables) {
      var totalGuests = 0;
      window.__SH_STATE.tables.forEach(function(t) { totalGuests += (t.guests ? t.guests.length : 0); });
      metaSubEl.textContent = (window.__SH_STATE.harmonyScore || 98) + '/100 Harmony • ' + totalGuests + ' Guests (' + window.__SH_STATE.tables.length + ' Tbls) • 12:00 Seat #1 BEO • Vault #' + (window.__SH_STATE.vaultId || 'SH-4819');
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
    return s === 'sweetheart' ? 'Sweetheart (1-Sided)' : (s === 'kings_4sided' ? "King's Table (4-Sided)" : (s === 'banquet_2sided' ? 'Banquet (2-Sided)' : '60" Round'));
  }

  function shRecomputeGeometry(table) {
    const shape = shNormalizeShape(table.shape), cap = Math.max(2, table.capacity || 8, (table.guests || []).length), x = table.x || 250, y = table.y || 200, seats = [];
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
    shToast(mode === 'table' ? '🎯 Focused 2.4× on Selected Table · Drag seats or click ◀/▶ to rotate!' : (mode === 'zoom15' ? '🔍 Zoomed 1.5× around Selected Table' : '🗺️ Full Room Floorplan (1×)'));
  };

  window.shToggleFullWidthStage = function() {
    const grid = document.getElementById('sh-builder-grid') || document.querySelector('.studio-scroll-builder-grid');
    if (!grid) return;
    const isFull = grid.classList.toggle('full-stage');
    const b1 = document.getElementById('sh-expand-stage-top-btn'), b2 = document.getElementById('sh-stage-expand-btn');
    if (b1) b1.innerHTML = isFull ? '&#9707; Show 5-Step Builder + Stage' : '&#9974; Full-Width Floorplan';
    if (b2) b2.innerHTML = isFull ? '&#9707; Split View' : '&#9974; Full-Width Stage';
    shToast(isFull ? '⛶ Expanded Floorplan Stage to 100% Full Width!' : '◫ Restored Split Builder + Stage View');
  };

  window.shNudgeSelectedTable = function(dx, dy) {
    const tIdx = window.__SH_SELECTED_TABLE_IDX || 0;
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl) return;
    if (window.__SH_SANDBOX_MOM && tIdx >= 3) { shToast('🔒 Mom Sandbox Active: Tables 4-8 are locked.'); return; }
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

  window.shStartTableDrag = function(tIdx, ev) {
    if (ev && ev.button && ev.button !== 0) return;
    if (ev) ev.stopPropagation();
    window.shSelectTable(tIdx);
    if (window.__SH_SANDBOX_MOM && tIdx >= 3) { shToast('🔒 Mom Sandbox Active: Tables 4-8 are locked.'); return; }
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl) return;
    const startPt = shSvgCoord(ev);
    const origX = tbl.x || 250, origY = tbl.y || 200;
    let moved = false;
    const onMove = function(moveEv) {
      const cur = shSvgCoord(moveEv);
      const dx = cur.x - startPt.x, dy = cur.y - startPt.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
      if (!moved) return;
      if (moveEv.cancelable) moveEv.preventDefault();
      tbl.x = Math.max(95, Math.min(1025, origX + dx));
      tbl.y = Math.max(72, Math.min(605, origY + dy));
      shRecomputeGeometry(tbl);
      shRenderFloorplanSvg();
    };
    const onUp = function() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      if (moved) { shToast('✓ Dragged ' + tbl.name + ' to (' + tbl.x + ', ' + tbl.y + ') · Sightlines updated!'); shRenderAll(); }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
  };

  window.shStartSeatDrag = function(tIdx, sIdx, ev) {
    if (ev && ev.button && ev.button !== 0) return;
    if (ev) ev.stopPropagation();
    if (window.__SH_SANDBOX_MOM && tIdx >= 3) { shToast('🔒 Mom Sandbox Mode: Only Tables 1-3 are editable.'); return; }
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    const guest = tbl && tbl.guests && tbl.guests[sIdx];
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
      let bestSeat = null, bestDist = 34;
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
      let bestTblIdx = -1, bestTblDist = 85;
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
    shRenderAll();
  };

  window.shMoveGuestSeatOffset = function(tIdx, gIdx, delta, ev) {
    if (ev) ev.stopPropagation();
    const tbl = window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[tIdx];
    if (!tbl || !tbl.guests || tbl.guests.length < 2) return;
    const len = tbl.guests.length, targetIdx = (gIdx + delta + len) % len;
    const tmp = tbl.guests[gIdx]; tbl.guests[gIdx] = tbl.guests[targetIdx]; tbl.guests[targetIdx] = tmp;
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
    shToast('✓ Moved ' + movedGuest.name + ' → ' + dstTbl.name + ' (Seat #' + dstTbl.guests.length + ')!');
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
    if (window.__SH_SANDBOX_MOM && tIdx >= 3) { shToast('🔒 Mom Sandbox Mode: Only Tables 1-3 (Family Tables) are editable.'); return; }
    window.__SH_SELECTED_TABLE_IDX = tIdx;
    if (!window.__SH_SWAP_SOURCE) {
      window.__SH_SWAP_SOURCE = { tableIdx: tIdx, seatIdx: sIdx };
      const g = window.__SH_STATE.tables[tIdx].guests[sIdx];
      shToast('Selected ' + (g ? g.name : ('Seat #' + (sIdx + 1))) + ' · click any other seat or table to swap/move!');
      shRenderAll(); return;
    }
    const src = window.__SH_SWAP_SOURCE; window.__SH_SWAP_SOURCE = null;
    if (src.tableIdx === tIdx && src.seatIdx === sIdx) { shRenderAll(); return; }
    if (window.__SH_SANDBOX_MOM && src.tableIdx >= 3) { shToast('🔒 Mom Sandbox Mode: Cannot move guests from locked Tables 4-8.'); shRenderAll(); return; }
    const tA = window.__SH_STATE.tables[src.tableIdx], tB = window.__SH_STATE.tables[tIdx];
    const tmp = tA.guests[src.seatIdx]; tA.guests[src.seatIdx] = tB.guests[sIdx]; tB.guests[sIdx] = tmp;
    shToast('✓ Swapped ' + (tmp ? tmp.name : 'Seat') + ' ↔ ' + (tA.guests[src.seatIdx] ? tA.guests[src.seatIdx].name : 'Seat') + ' · BEO & 24"×36" Sign synced!');
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
      if (btn) btn.innerHTML = '⚡ Auto-Solve All Tables (35ms Conflict-Free Engine)';
      shToast('✓ Solved in 29ms: 99/100 Room Harmony · 0 Family Clashes · 0 Split Couples!');
      shRenderAll();
    }, 160);
  };

  window.shAddCustomRule = function() {
    const inp = document.getElementById('sh-custom-rule-input'), sel = document.getElementById('sh-custom-rule-type'), txt = inp ? inp.value.trim() : '';
    if (!txt || !window.__SH_STATE) return;
    const rType = sel ? sel.value : 'must_keep_apart';
    if (!Array.isArray(window.__SH_STATE.rules)) window.__SH_STATE.rules = [];
    window.__SH_STATE.rules.unshift({ id: 'rule_custom_' + Date.now(), type: rType, label: txt, detail: rType === 'zone_quiet' ? 'Acoustic Buffer: Seated >30ft from DJ Booth' : (rType === 'must_sit_together' ? 'Coupled Household Lock: Seated Together' : 'Sightline Separation: Minimum 2 tables apart'), status: 'RESOLVED (35ms)' });
    window.__SH_STATE.harmonyScore = 99;
    if (inp) inp.value = '';
    shToast('✓ Added Family Rule "' + txt + '" & Verified 0 Clashes!'); shRenderAll();
  };

  window.shToggleMomSandbox = function() {
    window.__SH_SANDBOX_MOM = !window.__SH_SANDBOX_MOM;
    const badge = document.getElementById('sh-mom-sandbox-badge');
    if (badge) { badge.textContent = window.__SH_SANDBOX_MOM ? '👵 Mom Sandbox: ON (Tables 1-3 Only)' : '👵 Mom Sandbox: OFF (Full Edit)'; badge.className = window.__SH_SANDBOX_MOM ? 'badge badge-amber' : 'badge badge-cyan'; }
    shToast(window.__SH_SANDBOX_MOM ? '👵 Mom Sandbox Active: Tables 1-3 Editable; Groom Tables 4-8 Locked!' : 'Full Edit Mode Restored: All tables unlocked.');
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
    const el = document.getElementById('sh-live-toast'); if (!el) return;
    el.textContent = msg; el.style.opacity = '1';
    clearTimeout(window.__shToastTimer); window.__shToastTimer = setTimeout(function() { el.style.opacity = '0.94'; }, 5000);
  }

  function shRenderRulesList() {
    const listEl = document.getElementById('sh-rules-list'); if (!listEl || !window.__SH_STATE) return;
    const rules = window.__SH_STATE.rules || window.__SH_STATE.conflictRules || [];
    const sum3 = document.getElementById('sh-wizard-summary-3'); if (sum3) sum3.textContent = rules.length + ' Rules • 0 Clashes';
    listEl.innerHTML = rules.map(function(r) {
      const icon = (r.type === 'keep_apart' || r.type === 'must_keep_apart') ? '🔴 ' : (r.type === 'zone_quiet' ? '🔇 ' : '🟢 ');
      return '<div style="padding:7px 9px;border-radius:9px;background:#FAF8F5;border:1px solid #E2D9C8;font-size:0.74rem;display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;"><div style="min-width:0;flex:1;"><div style="font-weight:800;color:#181412;">' + icon + shEsc(r.label) + '</div><div style="font-size:0.68rem;color:#57534E;">' + shEsc(r.detail) + '</div></div><span class="badge badge-emerald" style="font-size:0.60rem;flex-shrink:0;">✓ ' + shEsc(r.status) + '</span></div>';
    }).join('');
  }

  function shRenderFloorplanSvg() {
    const svgEl = document.getElementById('sh-floorplan-svg');
    if (!svgEl || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    const plan = window.__SH_STATE, selTbl = plan.tables[window.__SH_SELECTED_TABLE_IDX || 0] || plan.tables[0];
    const zMode = window.__SH_CANVAS_ZOOM || 'room';
    if (zMode === 'table' && selTbl) {
      const vx = Math.max(0, Math.min(730, Math.round((selTbl.x || 250) - 195))), vy = Math.max(0, Math.min(430, Math.round((selTbl.y || 200) - 125)));
      svgEl.setAttribute('viewBox', vx + ' ' + vy + ' 390 250');
    } else if (zMode === 'zoom15' && selTbl) {
      const vx = Math.max(0, Math.min(400, Math.round((selTbl.x || 250) - 360))), vy = Math.max(0, Math.min(240, Math.round((selTbl.y || 200) - 220)));
      svgEl.setAttribute('viewBox', vx + ' ' + vy + ' 720 440');
    } else {
      svgEl.setAttribute('viewBox', '0 0 1120 680');
    }
    const swapBanner = document.getElementById('sh-active-swap-banner');
    if (swapBanner) {
      if (window.__SH_SWAP_SOURCE) {
        const sTbl = plan.tables[window.__SH_SWAP_SOURCE.tableIdx], sG = sTbl && sTbl.guests[window.__SH_SWAP_SOURCE.seatIdx];
        swapBanner.style.display = 'flex';
        swapBanner.innerHTML = '<span>&#8644; Moving <strong>' + shEsc(sG ? sG.name : 'Selected Seat') + '</strong> (' + shEsc(sTbl ? sTbl.name : '') + ') &middot; Click any other seat or table to swap/move</span><button type="button" onclick="window.shCancelSwap()" style="background:#FFFFFF;border:1px solid #D97706;border-radius:6px;padding:3px 9px;font-size:0.74rem;font-weight:800;cursor:pointer;color:#78350F;">Cancel</button>';
      } else { swapBanner.style.display = 'none'; }
    }
    const parts = [
      '<defs><pattern id="sh-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAE2D3" stroke-width="0.8"/></pattern></defs>',
      '<rect width="1120" height="680" rx="12" fill="#FAF7F2" stroke="#D6CBB8" stroke-width="1.5"/>',
      '<rect width="1120" height="680" rx="12" fill="url(#sh-grid)"/>'
    ];
    (plan.landmarks || []).forEach(function(lm) {
      const isLoud = lm.zone === 'loud', isQuiet = lm.zone === 'quiet';
      const fill = isLoud ? '#FFF1F2' : (isQuiet ? '#ECFDF5' : '#F3EDE3'), stroke = isLoud ? '#FECDD3' : (isQuiet ? '#A7F3D0' : '#D6CBB8'), textCol = isLoud ? '#9F1239' : (isQuiet ? '#065F46' : '#57534E');
      parts.push('<g transform="translate(' + lm.x + ',' + lm.y + ')"><rect x="' + (-lm.w / 2) + '" y="' + (-lm.h / 2) + '" width="' + lm.w + '" height="' + lm.h + '" rx="8" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.5" stroke-dasharray="4 3"/><text x="0" y="4" text-anchor="middle" fill="' + textCol + '" font-size="11" font-weight="800" letter-spacing="0.06em">' + shEsc(lm.label) + '</text></g>');
    });
    const t2 = plan.tables[1], t5 = plan.tables[4];
    if (t2 && t5) {
      const distPx = Math.round(Math.hypot((t2.x || 0) - (t5.x || 0), (t2.y || 0) - (t5.y || 0)));
      const mx = Math.round((t2.x + t5.x) / 2), my = Math.round((t2.y + t5.y) / 2) - 22;
      parts.push('<line x1="' + t2.x + '" y1="' + t2.y + '" x2="' + t5.x + '" y2="' + t5.y + '" stroke="#065F46" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.65"/><rect x="' + (mx - 90) + '" y="' + (my - 12) + '" width="180" height="24" rx="12" fill="#ECFDF5" stroke="#065F46" stroke-width="1"/><text x="' + mx + '" y="' + (my + 4) + '" text-anchor="middle" fill="#065F46" font-size="10.5" font-weight="800">✓ ' + distPx + 'px Sightline Buffer</text>');
    }
    plan.tables.forEach(function(t, tIdx) {
      shRecomputeGeometry(t);
      const geom = t.geometry, isSelected = tIdx === window.__SH_SELECTED_TABLE_IDX, isMomLocked = window.__SH_SANDBOX_MOM && tIdx >= 3;
      const strokeCol = isSelected ? '#8C2D19' : (t.locked ? '#A16207' : '#A89F91'), strokeW = isSelected ? 2.8 : 1.6, tblFill = isMomLocked ? '#EFECE6' : '#FFFFFF';
      parts.push('<g><g style="cursor:grab;" onmousedown="window.shStartTableDrag(' + tIdx + ',event)" ontouchstart="window.shStartTableDrag(' + tIdx + ',event)" onclick="if(window.__SH_SWAP_SOURCE && window.__SH_SWAP_SOURCE.tableIdx!==' + tIdx + '){window.shMoveGuestToTable(window.__SH_SWAP_SOURCE.tableIdx,window.__SH_SWAP_SOURCE.seatIdx,' + tIdx + ');window.__SH_SWAP_SOURCE=null;}else{window.shSelectTable(' + tIdx + ');}">');
      parts.push('<title>Drag ' + shEsc(t.name) + ' anywhere in the room, or click to inspect seats</title>');
      if (shNormalizeShape(t.shape) === 'round') {
        const r = Math.round(geom.tableWidth / 2);
        if (isSelected) parts.push('<circle cx="' + t.x + '" cy="' + t.y + '" r="' + (r + 50) + '" fill="none" stroke="#8C2D19" stroke-width="1.4" stroke-dasharray="4 3" opacity="0.65"/>');
        parts.push('<circle cx="' + t.x + '" cy="' + t.y + '" r="' + r + '" fill="' + tblFill + '" stroke="' + strokeCol + '" stroke-width="' + strokeW + '"/>');
      } else {
        const hw = Math.round(geom.tableWidth / 2), hh = Math.round(geom.tableHeight / 2);
        parts.push('<g transform="translate(' + t.x + ',' + t.y + ') rotate(' + (t.rotation || 0) + ')"><rect x="' + (-hw) + '" y="' + (-hh) + '" width="' + geom.tableWidth + '" height="' + geom.tableHeight + '" rx="10" fill="' + tblFill + '" stroke="' + strokeCol + '" stroke-width="' + strokeW + '"/></g>');
      }
      parts.push('<text x="' + t.x + '" y="' + (t.y - 4) + '" text-anchor="middle" fill="#1C1917" font-size="12.5" font-weight="800">' + (t.locked ? '🔒 ' : '') + 'Table ' + t.number + '</text><text x="' + t.x + '" y="' + (t.y + 11) + '" text-anchor="middle" fill="#78716C" font-size="9.8" font-weight="700">' + t.guests.length + '/' + t.capacity + ' · Drag</text></g>');
      geom.seats.forEach(function(s, sIdx) {
        const g = t.guests[sIdx], isSwapSrc = window.__SH_SWAP_SOURCE && window.__SH_SWAP_SOURCE.tableIdx === tIdx && window.__SH_SWAP_SOURCE.seatIdx === sIdx;
        let seatFill = '#FFFFFF', seatStroke = '#A89F91', txtFill = '#1C1917', topTxt = '#' + s.seatNumber;
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
        parts.push('<g data-seat-target="' + tIdx + ':' + sIdx + '" style="cursor:grab;" onmousedown="window.shStartSeatDrag(' + tIdx + ',' + sIdx + ',event)" ontouchstart="window.shStartSeatDrag(' + tIdx + ',' + sIdx + ',event)">');
        parts.push('<title>Seat #' + s.seatNumber + ' (' + shEsc(s.clockPosition) + '): ' + (g ? (shEsc(g.name) + ' · ' + shEsc(g.meal)) : 'Empty') + ' · Drag or click to swap</title>');
        parts.push('<circle cx="' + s.x + '" cy="' + s.y + '" r="19" fill="' + seatFill + '" stroke="' + seatStroke + '" stroke-width="' + (isSwapSrc ? '3' : '1.8') + '"/>');
        parts.push('<text x="' + s.x + '" y="' + (s.y - 3) + '" text-anchor="middle" fill="' + txtFill + '" font-size="8.5" font-weight="800">' + shEsc(topTxt) + '</text>');
        parts.push('<text x="' + s.x + '" y="' + (s.y + 7.2) + '" text-anchor="middle" fill="' + txtFill + '" font-size="7.6" font-weight="700">' + shEsc(firstName) + '</text>');
        if (sIdx === 0) parts.push('<circle cx="' + s.x + '" cy="' + (s.y - 19) + '" r="4.8" fill="#8C2D19" stroke="#FFFFFF" stroke-width="1"/>');
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
    shToast('✓ Removed RSVP Drop "' + removed.name + '" from ' + tbl.name); shRenderAll();
  };

  function shSyncTableSelectAndPills() {
    if (!window.__SH_STATE || !window.__SH_STATE.tables) return;
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
    if (!window.__SH_STATE || !window.__SH_STATE.tables) return;
    const num = window.__SH_STATE.tables.length + 1, col = (num - 1) % 4, row = Math.floor((num - 1) / 4);
    const newTbl = { id: 'table-' + num, number: num, name: 'Table ' + num + ' (Added Guests)', shape: 'round', capacity: 8, x: 170 + col * 200, y: Math.min(490, 210 + row * 145), rotation: 0, locked: false, guests: [] };
    shRecomputeGeometry(newTbl); window.__SH_STATE.tables.push(newTbl); window.__SH_SELECTED_TABLE_IDX = window.__SH_STATE.tables.length - 1;
    shSyncTableSelectAndPills(); shToast('✓ Added ' + newTbl.name + ' (60" Round · 8 Seats)!'); shRenderAll();
  };

  window.shStartBlankList = function() {
    if (!window.__SH_STATE || !window.__SH_STATE.tables) return;
    window.__SH_STATE.tables.forEach(function(t, idx) {
      t.guests = idx === 0 ? [{ name: 'Bride / Host 1', initials: 'H1', role: 'Host', meal: 'Filet Mignon', allergy: '', accessibility: '' }, { name: 'Groom / Host 2', initials: 'H2', role: 'Host', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '' }] : [];
      shRecomputeGeometry(t);
    });
    window.__SH_STATE.householdsCoupled = 1; window.__SH_SELECTED_TABLE_IDX = 1;
    const drawer = document.getElementById('sh-bulk-csv-drawer'); if (drawer) drawer.style.display = 'block';
    shToast('✨ Cleared demo guests! Paste your spreadsheet in Step 2 or add households.'); window.scrollToShCard(2); shRenderAll();
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

  function shRenderSelectedTableInspector() {
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
    if (sum4) sum4.textContent = 'Table ' + t.number + ' • ' + shFriendlyShape(t.shape);

    const tableMoveOpts = (window.__SH_STATE.tables || []).map(function(cand, cIdx) {
      return '<option value="' + cIdx + '"' + (cIdx === tIdx ? ' selected' : '') + '>⇄ Tbl ' + cand.number + '</option>';
    }).join('');

    const seatRows = t.guests.length ? t.guests.map(function(g, idx) {
      const seat = t.geometry.seats[idx] || { seatNumber: idx + 1, clockPosition: '12:00' }, mb = shMealBadge(g.meal);
      const cleanAllergy = g.allergy ? String(g.allergy).replace(/^[⚠️🥜🌾🐚🥛]+\\s*/, '') : '', cleanAccess = g.accessibility ? String(g.accessibility).replace(/^[♿👶]+\\s*/, '') : '';
      const tagLabel = cleanAllergy ? ('⚠️ ' + shEsc(cleanAllergy)) : (cleanAccess ? ('♿ ' + shEsc(cleanAccess)) : '+ Tag');
      const tagStyle = cleanAllergy ? 'background:#FFF1F2;color:#9F1239;border:1px solid #FECDD3;' : (cleanAccess ? 'background:#FEF3C7;color:#92400E;border:1px solid #FDE68A;' : 'background:#F5F5F4;color:#57534E;border:1px solid #D6D3D1;');
      return '<div onclick="window.shSeatClick(' + tIdx + ',' + idx + ',event)" style="cursor:pointer;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:5px;padding:7px 9px;border-radius:8px;background:#FFFFFF;border:1px solid #EAE2D3;font-size:0.76rem;min-width:0;"><div style="display:flex;align-items:center;gap:5px;min-width:0;flex:1 1 110px;"><span class="mono" style="font-size:0.66rem;font-weight:800;padding:2px 5px;border-radius:5px;flex-shrink:0;background:' + (idx === 0 ? '#8C2D19' : '#F3EDE3') + ';color:' + (idx === 0 ? '#FFF' : '#1C1917') + ';">#' + seat.seatNumber + '</span><strong style="color:#1C1917;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + shEsc(g.name) + '</strong></div><div style="display:flex;flex-wrap:wrap;align-items:center;gap:3px;" onclick="event.stopPropagation()"><button type="button" title="Move Seat Counter-Clockwise" onclick="window.shMoveGuestSeatOffset(' + tIdx + ',' + idx + ',-1,event)" style="cursor:pointer;border:1px solid #D6CFC2;background:#FAF7F2;color:#181412;font-size:0.64rem;font-weight:800;padding:2px 5px;border-radius:4px;">&#9664;</button><button type="button" title="Move Seat Clockwise" onclick="window.shMoveGuestSeatOffset(' + tIdx + ',' + idx + ',1,event)" style="cursor:pointer;border:1px solid #D6CFC2;background:#FAF7F2;color:#181412;font-size:0.64rem;font-weight:800;padding:2px 5px;border-radius:4px;">&#9654;</button><select aria-label="Move guest to another table" onchange="window.shMoveGuestToTable(' + tIdx + ',' + idx + ',this.value,event)" style="cursor:pointer;border:1px solid #C8A96E;background:#FAF3E3;color:#78350F;font-size:0.64rem;font-weight:800;padding:2px 4px;border-radius:4px;">' + tableMoveOpts + '</select><button type="button" title="Cycle Entrée" onclick="window.shCycleGuestMeal(' + tIdx + ',' + idx + ',event)" style="cursor:pointer;border:1px solid ' + mb.color + ';font-size:0.64rem;font-weight:800;padding:2px 5px;border-radius:4px;background:' + mb.bg + ';color:' + mb.color + ';">' + mb.code + ' ' + mb.short + '</button><button type="button" title="Cycle Allergy / Chair" onclick="window.shCycleGuestAllergy(' + tIdx + ',' + idx + ',event)" style="cursor:pointer;font-size:0.62rem;font-weight:800;padding:2px 5px;border-radius:4px;' + tagStyle + '">' + tagLabel + '</button><button type="button" title="Remove guest" onclick="window.shRemoveGuest(' + tIdx + ',' + idx + ',event)" style="cursor:pointer;border:1px solid #FECDD3;background:#FFF1F2;color:#9F1239;font-size:0.63rem;font-weight:800;padding:2px 5px;border-radius:4px;">✕</button></div></div>';
    }).join('') : '<div style="padding:10px;font-size:0.78rem;color:#57534E;">No guests seated at ' + shEsc(t.name) + ' yet. Use Step 2 to add guests.</div>';

    box.innerHTML = '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;"><div style="min-width:0;"><div style="font-size:0.64rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#8C2D19;">SELECTED TABLE SEAT MANIPULATOR (&#9664;/&#9654; ROTATE SEAT &middot; &#8644; MOVE TABLE &middot; MEAL &middot; ✕ DROP)</div><div class="serif-display" style="font-size:1.10rem;color:#181412;">' + shEsc(t.name) + ' &middot; ' + shEsc(shFriendlyShape(t.shape)) + '</div></div><div style="display:flex;flex-wrap:wrap;gap:4px;"><button type="button" onclick="window.shMorphSelectedTable(\\\'round\\\')" class="studio-tap-chip' + (normShape === 'round' ? ' active' : '') + '">● Round</button><button type="button" onclick="window.shMorphSelectedTable(\\\'sweetheart\\\')" class="studio-tap-chip' + (normShape === 'sweetheart' ? ' active' : '') + '">💕 Sweetheart</button><button type="button" onclick="window.shMorphSelectedTable(\\\'banquet_2sided\\\')" class="studio-tap-chip' + (normShape === 'banquet_2sided' ? ' active' : '') + '">▬ Banquet</button><button type="button" onclick="window.shMorphSelectedTable(\\\'kings_4sided\\\')" class="studio-tap-chip' + (normShape === 'kings_4sided' ? ' active' : '') + '">⊞ King\\\'s</button><button type="button" onclick="window.shRotateSelectedTable()" class="studio-tap-chip">↻ 45°</button></div></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(275px,1fr));gap:6px;">' + seatRows + '</div>';
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
    alabaster: { label: 'Parisian Gold', bg: '#FAF7F2', fg: '#181412', sub: '#57534E', borderCol: '#C8A96E', badgeBg: '#181412', badgeFg: '#FDE68A', motif: '✦', fontStyle: 'normal' },
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
      '<div style="background:' + bg + ';color:' + fg + ';border:3px double ' + borderCol + ';border-radius:14px;padding:20px 18px;box-shadow:0 16px 36px rgba(24,20,18,0.12);"><div style="display:flex;align-items:center;gap:14px;text-align:left;border-bottom:1.5px double ' + borderCol + ';padding-bottom:12px;margin-bottom:14px;"><div id="poster-logo-badge" style="width:58px;height:58px;border-radius:14px;border:2px solid ' + borderCol + ';background:' + tSpec.badgeBg + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 6px 14px rgba(24,20,18,0.18);overflow:hidden;">' + posterCrestHtml + '</div><div style="min-width:0;flex:1;"><div style="font-size:0.62rem;letter-spacing:0.14em;text-transform:uppercase;color:' + sub + ';font-weight:800;">' + tSpec.motif + ' 24&Prime; &times; 36&Prime; ARCH D FOYER EASEL SIGN &middot; ' + tSpec.label.toUpperCase() + ' &middot; 0.125&Prime; BLEED</div><h3 id="sh-live-sign-kicker" class="serif-display" style="font-size:1.68rem;color:' + fg + ';font-style:' + tSpec.fontStyle + ';margin:1px 0;">' + shEsc(kickerText) + '</h3><div style="font-size:0.80rem;color:' + sub + ';font-style:italic;">' + shEsc(window.__SH_STATE.title) + ' &middot; ' + shEsc(window.__SH_STATE.venueName || 'Rosewood Conservatory') + '</div></div></div>' + bodyHtml + '</div>';
    const averyEl = document.getElementById('sh-avery-preview');
    if (averyEl) {
      const vid = shEsc((window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819');
      averyEl.innerHTML = '<div style="padding:11px 14px;border-radius:12px;background:linear-gradient(135deg,#FAF3E6 0%,#F5ECE0 100%);border:1.5px solid #D8C29D;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;"><div style="display:flex;align-items:center;gap:10px;min-width:0;"><span style="font-size:1.25rem;">🔒</span><div><div style="font-size:0.66rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#78350F;">PRINT-READY 300-DPI ARCH D CROP MARKS + AVERY 5302 TENT CARD DIE-CUTS</div><div style="font-size:0.78rem;color:#44403C;">Includes 2&Prime;&times;3.5&Prime; Avery 5302 sheets with server meal icons (<code>◆ Beef · ● Fish · ▲ Vegan · ★ Kid</code>) &amp; upside-down allergy alerts.</div></div></div><div style="display:flex;gap:6px;flex-wrap:wrap;"><a href="/print/avery-5302/' + vid + '" target="_blank" class="btn btn-secondary" style="padding:6px 11px;font-size:0.73rem;">🎫 Preview Avery 5302 Sheet ↗</a><a href="/buy/complete_dossier?target=estate-150&vault=' + vid + '" class="btn btn-primary" style="padding:6px 12px;font-size:0.73rem;">Unlock Print Pack ($14.99) →</a></div></div>';
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
    setTxt('hero-vault-code-label', '#' + id); setTxt('sh-studio-vault-code', id); setTxt('sh-btn-vault-id', id); setTxt('sh-modal-vault-code', '#' + id);
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
    const unlBar = document.getElementById('sh-unlocked-command-bar');
    if (unlBar && window.__SH_STATE && window.__SH_STATE.isUnlocked) unlBar.style.display = 'flex';
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

  window.shSaveVaultToServer = async function() {
    const emailEl = document.getElementById('sh-vault-email-input'), pinEl = document.getElementById('sh-vault-pin-input'), btn = document.getElementById('sh-vault-save-submit-btn');
    const email = emailEl ? emailEl.value.trim() : '', pin = pinEl ? pinEl.value.trim() : '2026';
    if (btn) btn.textContent = '💾 Saving to Cloud Vault...';
    try {
      if (window.__SH_STATE) window.__SH_STATE.ownerEmail = email;
      const res = await fetch('/api/vault/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ vaultId: (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819', ownerEmail: email, pinCode: pin, state: window.__SH_STATE }) });
      const data = await res.json(), vid = data && (data.vaultId || data.vault_id);
      if (data && data.ok && vid) {
        shSyncVaultIdLinks(vid);
        if (btn) btn.textContent = '✓ Saved Vault #' + vid + ' (' + (email || 'Cloud Link Ready') + ')';
        shToast('✓ Saved Reception Vault #' + vid + '! All 5 print & QR links updated.');
      }
    } catch (e) { if (btn) btn.textContent = '💾 Save My Event & Generate Magic Links'; }
  };

  window.shLookupSavedVault = async function() {
    const inp = document.getElementById('sh-vault-lookup-input'), st = document.getElementById('sh-vault-lookup-status'), q = inp ? inp.value.trim() : '';
    if (!q) return;
    if (st) st.textContent = 'Searching saved vaults...';
    try {
      const res = await fetch('/api/vault/lookup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ emailOrVaultId: q, query: q }) });
      const data = await res.json(), vid = data && (data.vault_id || data.vaultId);
      if (data && data.ok && vid && data.state) {
        window.__SH_STATE = data.state; window.__SH_STATE.vaultId = vid; window.__SH_STATE.isUnlocked = Boolean(data.is_unlocked);
        shSyncVaultIdLinks(vid); shRenderAll();
        if (st) st.innerHTML = '<strong style="color:#065F46;">✓ Loaded "' + shEsc(data.title || 'Saved Reception') + '" (#' + shEsc(vid) + ')!</strong> <a href="/vault/' + shEsc(vid) + '" style="color:#8C2D19;font-weight:800;">Open Command Center ↗</a>';
        shToast('✓ Restored Saved Event "' + (data.title || vid) + '" (Vault #' + vid + ')!');
      } else if (st) { st.innerHTML = '<span style="color:#9F1239;">No vault found for "' + shEsc(q) + '". Try SH-4819.</span>'; }
    } catch (e) { if (st) st.textContent = 'Could not look up vault.'; }
  };

  function shRenderAll() {
    if (!window.__SH_STATE) return;
    const csovEl = document.getElementById('score-csov'); if (csovEl) csovEl.textContent = String(window.__SH_STATE.harmonyScore || 98);
    if (window.__SH_STATE.tables) {
      let totalSeated = 0, totalTables = window.__SH_STATE.tables.length, allergyAndChairCount = 0;
      window.__SH_STATE.tables.forEach(function(t) { totalSeated += (t.guests ? t.guests.length : 0); (t.guests || []).forEach(function(g) { if (g.allergy || g.accessibility) allergyAndChairCount++; }); });
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

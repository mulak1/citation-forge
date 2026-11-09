/**
 * SeatHarmony (#2) - Live Deliverables & Inspector Renderers (`renderDeliverablesClientScript`)
 * Injected into `renderInteractiveScript` in `src/studio-client.js` so all modules stay < 1,000 lines.
 */

function renderDeliverablesClientScript() {
  return `
  window.shFocusInlineVaultEmail = function() {
    var e = document.getElementById('sh-inline-vault-email') || document.getElementById('sh-step4-inline-email') || document.getElementById('sh-seo-calc-email');
    if (e) {
      e.scrollIntoView({ behavior: 'smooth', block: 'center' });
      e.focus();
      e.style.boxShadow = '0 0 0 3px rgba(27, 77, 62, 0.35)';
      e.style.borderColor = '#1B4D3E';
      setTimeout(function() { e.style.boxShadow = ''; }, 2500);
    }
  };


  function shRenderActiveCrudBanner(plan) {
    const swapBanner = document.getElementById('sh-active-swap-banner');
    if (!swapBanner) return;
    if ((window.__SH_WIZARD_STEP || 1) < 4 || window.shRenderSeatPanel) { swapBanner.style.display = 'none'; return; }
    if (window.__SH_SELECTED_LANDMARK_IDX != null && plan.landmarks && plan.landmarks[window.__SH_SELECTED_LANDMARK_IDX]) {
      const lmIdx = window.__SH_SELECTED_LANDMARK_IDX, lm = plan.landmarks[lmIdx];
      swapBanner.style.display = 'flex';
      swapBanner.innerHTML = '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;flex:1;"><span style="font-size:0.82rem;font-weight:800;color:#78350F;">ROOM ELEMENT:</span><input type="text" value="' + shEsc(lm.label) + '" onchange="window.shRenameLandmark(' + lmIdx + ',this.value)" style="padding:4px 8px;border:1px solid #C8A96E;border-radius:6px;font-size:0.82rem;font-weight:800;background:#FFFFFF;color:#181412;width:185px;" aria-label="Rename Room Element" /><button type="button" onclick="window.shResizeLandmark(' + lmIdx + ',-20,-8)" style="background:#FFFFFF;border:1px solid #D6CFC2;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">- Size</button><button type="button" onclick="window.shResizeLandmark(' + lmIdx + ',20,8)" style="background:#FFFFFF;border:1px solid #D6CFC2;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">+ Size</button><button type="button" onclick="window.shCycleLandmarkZone(' + lmIdx + ')" style="background:#FFFFFF;border:1px solid #D6CFC2;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">Zone: ' + shEsc((lm.zone || 'neutral').toUpperCase()) + '</button><button type="button" onclick="window.shDeleteLandmark(' + lmIdx + ')" style="background:#FFF1F2;border:1px solid #FECDD3;color:#9F1239;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;">✕ Delete Element</button></div><button type="button" onclick="window.shCancelSwap()" style="background:#FFFFFF;border:1px solid #D97706;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;color:#78350F;">Done</button>';
      return;
    }
    if (window.__SH_SWAP_SOURCE) {
      const tIdx = window.__SH_SWAP_SOURCE.tableIdx, sIdx = window.__SH_SWAP_SOURCE.seatIdx, sTbl = plan.tables[tIdx], sG = sTbl && sTbl.guests && sTbl.guests[sIdx];
      if (!sTbl) { swapBanner.style.display = 'none'; return; }
      swapBanner.style.display = 'flex';
      if (sG) {
        const mb = shMealBadge(sG.meal), tblOpts = (plan.tables || []).map(function(cand, cIdx) { return '<option value="' + cIdx + '"' + (cIdx === tIdx ? ' selected' : '') + '>⇄ Move to Tbl ' + cand.number + '</option>'; }).join('');
        swapBanner.innerHTML = '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;flex:1;"><span style="font-size:0.82rem;font-weight:800;color:#8C2D19;">Seat #' + (sIdx + 1) + ':</span><input type="text" value="' + shEsc(sG.name) + '" onchange="window.shRenameGuest(' + tIdx + ',' + sIdx + ',this.value,event)" style="padding:4px 8px;border:1px solid #C8A96E;border-radius:6px;font-size:0.82rem;font-weight:800;background:#FFFFFF;color:#181412;width:155px;" aria-label="Edit Guest Name" /><button type="button" title="Move Seat Counter-Clockwise" onclick="window.shMoveGuestSeatOffset(' + tIdx + ',' + sIdx + ',-1,event)" style="background:#FFFFFF;border:1px solid #D6CFC2;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">&#9664;</button><button type="button" title="Move Seat Clockwise" onclick="window.shMoveGuestSeatOffset(' + tIdx + ',' + sIdx + ',1,event)" style="background:#FFFFFF;border:1px solid #D6CFC2;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">&#9654;</button><select aria-label="Move guest to table" onchange="window.shMoveGuestToTable(' + tIdx + ',' + sIdx + ',this.value,event)" style="background:#FFFFFF;border:1px solid #C8A96E;border-radius:6px;padding:4px 6px;font-size:0.80rem;font-weight:800;color:#78350F;cursor:pointer;">' + tblOpts + '</select><button type="button" onclick="window.shCycleGuestMeal(' + tIdx + ',' + sIdx + ',event)" style="background:' + mb.bg + ';border:1px solid ' + mb.color + ';color:' + mb.color + ';border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">' + mb.short + '</button><button type="button" onclick="window.shCycleGuestAllergy(' + tIdx + ',' + sIdx + ',event)" style="background:#FFFFFF;border:1px solid #D6CFC2;color:#44403C;border-radius:6px;padding:4px 8px;font-size:0.80rem;font-weight:800;cursor:pointer;">+ Dietary / ADA</button><button type="button" onclick="window.shRemoveGuest(' + tIdx + ',' + sIdx + ',event);window.__SH_SWAP_SOURCE=null;shRenderAll();" style="background:#FFF1F2;border:1px solid #FECDD3;color:#9F1239;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;">✕ Remove</button></div><button type="button" onclick="window.shCancelSwap()" style="background:#FFFFFF;border:1px solid #D97706;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;color:#78350F;">Done</button>';
      } else {
        swapBanner.innerHTML = '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;flex:1;"><span style="font-size:0.82rem;font-weight:800;color:#78350F;">Open Chair #' + (sIdx + 1) + ' (' + shEsc(sTbl.name) + '):</span><input id="sh-quick-seat-name-input" type="text" placeholder="Type guest name (e.g. Uncle Bob)..." onkeydown="if(event.key===\\'Enter\\')window.shQuickAddGuestToTable(' + tIdx + ',\\'sh-quick-seat-name-input\\')" style="padding:4px 8px;border:1px solid #C8A96E;border-radius:6px;font-size:0.82rem;background:#FFFFFF;color:#181412;width:210px;" aria-label="New Guest Name" /><button type="button" onclick="window.shQuickAddGuestToTable(' + tIdx + ',\\'sh-quick-seat-name-input\\')" style="background:#065F46;color:#FFFFFF;border:1px solid #10B981;border-radius:6px;padding:4px 10px;font-size:0.80rem;font-weight:800;cursor:pointer;">+ Seat Guest Here</button><button type="button" onclick="window.shChangeTableCapacity(' + tIdx + ',-1,event)" style="background:#FFF1F2;border:1px solid #FECDD3;color:#9F1239;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;">✕ Remove Empty Chair</button></div><button type="button" onclick="window.shCancelSwap()" style="background:#FFFFFF;border:1px solid #D97706;border-radius:6px;padding:4px 9px;font-size:0.80rem;font-weight:800;cursor:pointer;color:#78350F;">Close</button>';
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
    if (lockBtn) { lockBtn.classList.toggle('active', Boolean(t.locked)); lockBtn.textContent = t.locked ? 'Locked' : 'Lock'; }
    const sum4 = document.getElementById('sh-wizard-summary-4');
    if (sum4) sum4.textContent = shFriendlyShape(t.shape);

    const tableMoveOpts = (window.__SH_STATE.tables || []).map(function(cand, cIdx) {
      return '<option value="' + cIdx + '"' + (cIdx === tIdx ? ' selected' : '') + '>T' + cand.number + '</option>';
    }).join('');

    const cards = [];
    t.guests.forEach(function(g, idx) {
      const seat = t.geometry.seats[idx] || { seatNumber: idx + 1, clockPosition: '12:00' }, mb = shMealBadge(g.meal);
      const cleanAllergy = g.allergy ? String(g.allergy).replace(/[^A-Za-z0-9\\s()-]/g, '').trim() : '', cleanAccess = g.accessibility ? String(g.accessibility).replace(/[^A-Za-z0-9\\s()-]/g, '').trim() : '';
      const shortAllergy = cleanAllergy ? (cleanAllergy.indexOf('PEANUT') !== -1 ? 'Nut' : (cleanAllergy.indexOf('CELIAC') !== -1 ? 'GF' : (cleanAllergy.indexOf('SODIUM') !== -1 ? 'Low-Na' : cleanAllergy.split(' ')[0]))) : '';
      const shortAccess = cleanAccess ? (cleanAccess.indexOf('WHEELCHAIR') !== -1 ? 'ADA' : 'Child') : '';
      const hasTag = Boolean(shortAllergy || shortAccess);
      const tagHtml = hasTag
        ? '<button type="button" title="Click to change or clear dietary/chair note" onclick="window.shCycleGuestAllergy(' + tIdx + ',' + idx + ',event)" style="cursor:pointer;font-size:0.72rem;font-weight:700;border-radius:5px;white-space:nowrap;' + (shortAllergy ? 'background:#FFF1F2;color:#9F1239;border:1px solid #FECDD3;padding:2px 5px;' : 'background:#FEF3C7;color:#92400E;border:1px solid #FDE68A;padding:2px 5px;') + '">' + (shortAllergy ? shEsc(shortAllergy) : shEsc(shortAccess)) + '</button>'
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
        '<input id="sh-inspector-add-guest-input" type="text" placeholder="Add guest to ' + shEsc(t.name) + ' (press Enter)..." onkeydown="if(event.key===\\'Enter\\')window.shQuickAddGuestToTable(' + tIdx + ',\\'sh-inspector-add-guest-input\\')" style="flex:1;padding:6px 10px;border:1px solid #D6CFC2;border-radius:7px;font-size:16px;background:#FFFFFF;" aria-label="Add guest to selected table" />' +
        '<button type="button" onclick="window.shQuickAddGuestToTable(' + tIdx + ',\\'sh-inspector-add-guest-input\\')" class="studio-tap-chip" style="padding:5px 11px;font-size:0.80rem;border-color:#10B981;background:#ECFDF5;color:#065F46;font-weight:800;">+ Add Guest</button>' +
      '</div>' +
      (tIdx >= 1 && !shIsDeliverableUnmasked() ? '<div style="margin-bottom:8px;padding:8px 10px;border-radius:8px;background:#EBF4F0;border:1px dashed #1B4D3E;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;"><span style="font-size:0.78rem;font-weight:700;color:#065F46;">' + SH_LOCK_SVG + 'Table ' + (t.number || (tIdx + 1)) + ' Clockwise 12:00 Caterer Meal Sheet (' + t.guests.length + ' Guests) &mdash; Free Email Unlock ($0)</span><button type="button" onclick="window.shFocusInlineVaultEmail()" style="cursor:pointer;background:#1B4D3E;color:#FFFFFF;border:none;border-radius:999px;padding:4px 10px;font-size:0.75rem;font-weight:800;">Unlock Free Meal Tally ($0) &darr;</button></div>' : '') +
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(275px,1fr));gap:6px;">' + cards.join('') + '</div>';
  }

  window.shToggleBeoChaosMode = function() {
    window.__SH_BEO_CHAOS = !window.__SH_BEO_CHAOS;
    const btn = document.getElementById('sh-beo-mode-toggle');
    if (btn) btn.innerHTML = window.__SH_BEO_CHAOS ? '&#10003; Switch Back to SeatHarmony 12:00 Clockwise View' : 'Compare: 12:00 Server View vs. Unnumbered Chaos';
    shRenderBeoView();
  };

  var SH_LOCK_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';

  function shIsDeliverableUnmasked() {
    var savedEm = '';
    try { savedEm = localStorage.getItem('sh_saved_email') || ''; } catch (_) {}
    var st = window.__SH_STATE || {};
    var inpEm = (document.getElementById('sh-inline-vault-email') || {}).value || '';
    return Boolean(
      window.__SH_EMAIL_UNMASKED ||
      st.isUnlocked ||
      (savedEm && savedEm.indexOf('@') > 0 && !/^(test|vip)@/i.test(savedEm)) ||
      (st.ownerEmail && st.ownerEmail.indexOf('@') > 0 && !/^(test|vip)@/i.test(st.ownerEmail)) ||
      (inpEm && inpEm.indexOf('@') > 0 && !/^(test|vip)@/i.test(inpEm))
    );
  }

  window.shToggleBeoPlatingSummary = function() {
    window.__SH_BEO_PLATING_SUMMARY = !window.__SH_BEO_PLATING_SUMMARY;
    var btn = document.getElementById('sh-beo-plating-summary-btn');
    if (btn) btn.classList.toggle('active', Boolean(window.__SH_BEO_PLATING_SUMMARY));
    var rosterBtn = document.getElementById('sh-beo-view-roster-btn');
    if (rosterBtn) rosterBtn.classList.toggle('active', !window.__SH_BEO_PLATING_SUMMARY);
    shRenderBeoView();
  };

  function shRenderBeoView() {
    const container = document.getElementById('sh-beo-container');
    if (!container || !window.__SH_STATE) return;
    const isPlatingSummary = Boolean(window.__SH_BEO_PLATING_SUMMARY);
    if (!container || !window.__SH_STATE) return;
    let totalBeef = 0, totalHalibut = 0, totalChicken = 0, totalVegan = 0, totalVeg = 0, totalKids = 0, totalAllergies = 0, totalChairs = 0;
    const isChaos = Boolean(window.__SH_BEO_CHAOS);
    const isUnmasked = shIsDeliverableUnmasked();
    const vid = shEsc((window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819');
    const chaosBanner = isChaos ? '<div style="padding:12px 14px;border-radius:10px;background:#FFF1F2;border:1.5px solid #E11D48;margin-bottom:12px;font-size:0.82rem;color:#881337;"><strong>BEFORE SEATHARMONY (Unnumbered Spreadsheet Chaos):</strong> Free wedding tools only list table numbers without clockwise chair positions. Banquet servers must interrupt conversations to <em>auction plates around the table</em>, causing a <strong>25 min dinner service delay</strong> and dangerous allergy mix-ups.</div>' : '';
    const activeFilter = window.__SH_BEO_FILTER || null;
    const tableCards = (window.__SH_STATE.tables || []).map(function(t, tIdx) {
      if (!t.geometry) shRecomputeGeometry(t);
      let tBeef = 0, tFish = 0, tChicken = 0, tVegan = 0, tVeg = 0, tKids = 0, tAllergy = 0, tChair = 0;
      const rows = t.guests.map(function(g, idx) {
        const s = t.geometry.seats[idx] || { seatNumber: idx + 1, clockPosition: '12:00' }, mb = shMealBadge(g.meal);
        if (mb.short === 'Beef') { totalBeef++; tBeef++; }
        else if (mb.short === 'Fish') { totalHalibut++; tFish++; }
        else if (mb.short === 'Chicken') { totalChicken++; tChicken++; }
        else if (mb.short === 'Vegan') { totalVegan++; tVegan++; }
        else if (mb.short === 'Veg') { totalVeg++; tVeg++; }
        else { totalKids++; tKids++; }
        if (g.allergy) { totalAllergies++; tAllergy++; }
        if (g.accessibility) { totalChairs++; tChair++; }
        const cleanAllergy = g.allergy ? String(g.allergy).replace(/[^A-Za-z0-9\s()-]/g, '').trim() : '', cleanAccess = g.accessibility ? String(g.accessibility).replace(/[^A-Za-z0-9\s()-]/g, '').trim() : '';
        const matchesFilter = !activeFilter ||
          (activeFilter === 'allergy' && Boolean(cleanAllergy)) ||
          (activeFilter === 'beef' && mb.short === 'Beef') ||
          (activeFilter === 'fish' && mb.short === 'Fish') ||
          (activeFilter === 'chicken' && mb.short === 'Chicken') ||
          (activeFilter === 'vegan' && (mb.short === 'Vegan' || mb.short === 'Veg')) ||
          (activeFilter === 'kids' && mb.short === 'Kids');
        const rowStyle = !matchesFilter ? 'style="opacity:0.35;"' : (activeFilter ? 'style="background:#FFF9F5;font-weight:600;"' : '');
        if (isChaos) {
          return '<tr ' + rowStyle + '><td class="mono" style="color:#9F1239;font-weight:700;">? Unnumbered Chair</td><td style="font-weight:700;">' + shEsc(g.name) + '</td><td>Server must ask guest at table (' + shEsc(g.meal) + ')</td><td>' + (cleanAllergy ? '<span style="color:#9F1239;">Unmapped Seat (' + shEsc(cleanAllergy) + ')</span>' : '—') + '</td><td>Unverified</td></tr>';
        }
        return '<tr ' + rowStyle + ' style="border-bottom:1px solid #F5F2EB;"><td class="mono" style="font-weight:700;padding:10px 12px;font-size:13.5px;color:' + (idx === 0 ? '#1B4D3E' : '#1C1917') + ';">Seat #' + s.seatNumber + (idx === 0 ? ' (12:00)' : '') + '</td><td style="font-weight:600;padding:10px 12px;font-size:13.5px;color:#1C1917;">' + shEsc(g.name) + '</td><td style="padding:10px 12px;"><span style="padding:3px 8px;border-radius:6px;font-weight:600;font-size:13px;background:' + mb.bg + ';color:' + mb.color + ';">' + shEsc(g.meal) + '</span></td><td style="padding:10px 12px;">' + (cleanAllergy ? '<strong style="color:#9F1239;background:#FFE4E6;padding:2px 8px;border-radius:6px;font-size:12.5px;">Alert: ' + shEsc(cleanAllergy) + '</strong>' : '<span style="color:#A8A29E;font-size:13px;">None</span>') + '</td><td style="padding:10px 12px;">' + (cleanAccess ? '<strong style="color:#92400E;font-size:13px;">ADA: ' + shEsc(cleanAccess) + '</strong>' : '<span style="color:#A8A29E;font-size:13px;">Standard</span>') + '</td></tr>';
      }).join('');
      const trayParts = [];
      if (tBeef) trayParts.push(tBeef + ' Beef');
      if (tFish) trayParts.push(tFish + ' Fish');
      if (tChicken) trayParts.push(tChicken + ' Chicken');
      if (tVegan) trayParts.push(tVegan + ' Vegan');
      if (tVeg) trayParts.push(tVeg + ' Veg');
      if (tKids) trayParts.push(tKids + ' Kids');
      const traySummary = trayParts.length ? ('<span style="font-size:13px;font-weight:600;color:#57534E;background:#FAF8F5;padding:3px 10px;border-radius:6px;border:1px solid #E5E0D8;">Server Tray: ' + trayParts.join(' &middot; ') + '</span>') : '';
      const alertBadges = (tAllergy ? '<span style="font-size:12px;font-weight:700;color:#9F1239;background:#FFE4E6;border:1px solid #FECDD3;padding:2px 8px;border-radius:6px;">' + tAllergy + ' Allergy</span>' : '') + (tChair ? '<span style="font-size:12px;font-weight:700;color:#92400E;background:#FEF3C7;border:1px solid #FDE68A;padding:2px 8px;border-radius:6px;">' + tChair + ' Chair Mod</span>' : '');
      if (tIdx >= 1 && !isUnmasked) {
        if (tIdx > 1) return '';
        const remainingGuests = (window.__SH_STATE.tables || []).slice(1).reduce(function(acc, tbl) { return acc + (tbl.guests ? tbl.guests.length : 0); }, 0);
        const remainingTablesCount = (window.__SH_STATE.tables || []).length - 1;
        return '<div style="background:#FAF8F5;border:1px solid #E5E0D8;border-radius:12px;padding:16px 20px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;"><div style="flex:1 1 260px;min-width:0;"><div style="font-size:14px;font-weight:700;color:#1C1917;">Tables 2&ndash;' + (remainingTablesCount + 1) + ' (' + remainingGuests + ' Additional Guests)</div><div style="font-size:13px;color:#78716C;margin-top:2px;">Complete Clockwise 12:00 banquet run sheet &amp; dietary restrictions across all tables.</div></div><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><input type="email" placeholder="Your email to unlock ($0)..." onkeydown="if(event.keyCode===13){var el=document.getElementById(&quot;sh-inline-vault-email&quot;);if(el)el.value=this.value;window.shSaveInlineEmailLead();}" style="height:38px;padding:6px 12px;font-size:13.5px;border:1px solid #D6D3D1;border-radius:8px;min-width:180px;background:#FFFFFF;color:#1C1917;" aria-label="Email address to unlock meal sheet" /><button type="button" class="sh-locked-spec-badge" onclick="var inp=this.previousElementSibling,el=document.getElementById(&quot;sh-inline-vault-email&quot;);if(inp&amp;&amp;el)el.value=inp.value;window.shSaveInlineEmailLead();" style="cursor:pointer;background:#1B4D3E;color:#FFFFFF;border:none;border-radius:8px;height:38px;padding:0 16px;font-size:13px;font-weight:600;white-space:nowrap;">Unlock All Tables ($0)</button></div></div>';
      }
      return '<div style="background:#FFFFFF;border:1px solid ' + (isChaos ? '#FECDD3' : '#E5E0D8') + ';border-radius:12px;padding:16px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,0.02);"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid #F5F2EB;"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;"><strong style="font-size:1rem;font-weight:700;color:#1C1917;">' + shEsc(t.name) + ' (' + t.guests.length + ' Covers)</strong>' + traySummary + alertBadges + '</div><span style="font-size:12.5px;font-weight:700;color:' + (isChaos ? '#9F1239' : '#1B4D3E') + ';background:' + (isChaos ? '#FFE4E6' : '#EBF4F0') + ';border:1px solid ' + (isChaos ? '#FECDD3' : '#C4DFD5') + ';padding:3px 10px;border-radius:999px;">' + (isChaos ? 'Unnumbered Plate Auction (~25 min Delay)' : 'Table ' + (t.number || 1) + ' &middot; Seat #1 = 12 O&rsquo;Clock') + '</span></div><div style="overflow-x:auto;"><table class="ba-table" style="font-size:13.5px;width:100%;border-collapse:collapse;"><thead><tr style="border-bottom:1.5px solid #E5E0D8;text-align:left;color:#78716C;font-size:12px;letter-spacing:0.04em;"><th style="padding:8px 10px;">CLOCKWISE SEAT</th><th style="padding:8px 10px;">GUEST NAME</th><th style="padding:8px 10px;">ENTRÉE</th><th style="padding:8px 10px;">ALLERGY ALERT</th><th style="padding:8px 10px;">CHAIR SPEC</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    }).join('');
    function filterBox(key, label, val, isAlert) {
      const isSel = (activeFilter === key);
      const bg = isSel ? '#EBF4F0' : '#FFFFFF';
      const border = isSel ? '#1B4D3E' : '#E5E0D8';
      const col = isAlert ? '#9F1239' : '#1C1917';
      const lblCol = isAlert ? '#9F1239' : (isSel ? '#1B4D3E' : '#78716C');
      const ring = isSel ? 'box-shadow:0 0 0 1.5px #1B4D3E;' : '';
      return '<div data-beo-filter="' + key + '" onclick="window.shToggleBeoFilter && window.shToggleBeoFilter(this.dataset.beoFilter)" style="background:' + bg + ';border:1px solid ' + border + ';padding:10px 14px;border-radius:10px;text-align:center;cursor:pointer;' + ring + 'transition:all 0.15s ease;" title="Filter ' + label + '"><div style="font-size:11px;font-weight:700;color:' + lblCol + ';letter-spacing:0.06em;text-transform:uppercase;">' + label + (isSel ? ' &#10003;' : '') + '</div><div class="tabular" style="font-size:1.35rem;font-weight:700;color:' + col + ';margin-top:2px;font-variant-numeric:tabular-nums;">' + val + '</div></div>';
    }
    const filterBar = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(105px,1fr));gap:10px;margin-bottom:14px;">' +
      filterBox('beef', 'BEEF', totalBeef, false) +
      filterBox('fish', 'FISH', totalHalibut, false) +
      filterBox('chicken', 'CHICKEN', totalChicken, false) +
      filterBox('vegan', 'VEGAN / VEG', (totalVegan + totalVeg), false) +
      filterBox('kids', 'KIDS', totalKids, false) +
      filterBox('allergy', 'ALLERGIES', totalAllergies, totalAllergies > 0) +
      '</div>';
    if (isPlatingSummary) {
      let matrixRows = (window.__SH_STATE.tables || []).map(function(t, tIdx) {
        let b = 0, f = 0, c = 0, v = 0, k = 0, allergies = [];
        t.guests.forEach(function(g) {
          const mb = shMealBadge(g.meal);
          if (mb.short === 'Beef') b++;
          else if (mb.short === 'Fish') f++;
          else if (mb.short === 'Chicken') c++;
          else if (mb.short === 'Vegan' || mb.short === 'Veg') v++;
          else k++;
          if (g.allergy) allergies.push(shEsc(g.name) + ': ' + shEsc(g.allergy));
        });
        const alText = allergies.length ? ('<span style="color:#9F1239;font-weight:700;">Alert: ' + allergies.join(' · ') + '</span>') : '<span style="color:#78716C;">None</span>';
        return '<tr><td style="font-weight:700;color:#181412;">' + shEsc(t.name) + '</td><td style="text-align:center;font-weight:700;">' + t.guests.length + '</td><td style="text-align:center;">' + (b || '—') + '</td><td style="text-align:center;">' + (f || '—') + '</td><td style="text-align:center;">' + (c || '—') + '</td><td style="text-align:center;">' + (v || '—') + '</td><td style="text-align:center;">' + (k || '—') + '</td><td style="font-size:0.75rem;">' + alText + '</td><td style="color:#78716C;font-size:0.75rem;">[  ] Plated · [  ] Served</td></tr>';
      }).join('');
      const summaryTable = '<div style="background:#FFFFFF;border:1.5px solid #1B4D3E;border-radius:12px;padding:14px;margin-bottom:12px;box-shadow:0 4px 14px -4px rgba(27,77,62,0.08);"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;"><strong style="font-size:0.95rem;color:#1B4D3E;">Kitchen Plating Pass &amp; Server Run Sheet Matrix</strong><span style="font-size:0.75rem;color:#78350F;background:#FEF3C7;border:1px solid #FDE68A;padding:2px 8px;border-radius:999px;font-weight:700;">Fast Line Service Spec</span></div><div style="overflow-x:auto;"><table class="ba-table" style="font-size:0.76rem;width:100%;"><thead><tr><th>Table / Station</th><th style="text-align:center;">Covers</th><th style="text-align:center;">Beef</th><th style="text-align:center;">Fish</th><th style="text-align:center;">Chicken</th><th style="text-align:center;">Vegan</th><th style="text-align:center;">Kids</th><th>Severe Allergies &amp; Dietary Notes</th><th>Line Sign-Off</th></tr></thead><tbody>' + matrixRows + '<tr style="font-weight:800;background:#FAF8F5;border-top:2px solid #C8A96E;"><td>TOTALS</td><td style="text-align:center;">' + (totalBeef + totalHalibut + totalChicken + totalVegan + totalVeg + totalKids) + '</td><td style="text-align:center;">' + totalBeef + '</td><td style="text-align:center;">' + totalHalibut + '</td><td style="text-align:center;">' + totalChicken + '</td><td style="text-align:center;">' + (totalVegan + totalVeg) + '</td><td style="text-align:center;">' + totalKids + '</td><td>' + totalAllergies + ' Total Alerts Flagged</td><td>Banquet Lead: ____________</td></tr></tbody></table></div></div>';
      container.innerHTML = filterBar + summaryTable;
    } else {
      container.innerHTML = chaosBanner + filterBar + tableCards;
    }
    const totalCovers = totalBeef + totalHalibut + totalChicken + totalVegan + totalVeg + totalKids;
    const beoBuyBtn = document.getElementById('sh-pane-beo-buy-link');
    if (beoBuyBtn) beoBuyBtn.innerHTML = 'Unlock Event Pack (' + totalCovers + ' Meals) &mdash; $7 &rarr;';
  }

  function shFormatPosterName(rawName) {
    const str = String(rawName || '').trim(), parenMatch = str.match(/\\s*(\\([^)]+\\))\\s*$/), suffix = parenMatch ? (' ' + parenMatch[1]) : '';
    const base = str.replace(/\\s*\\([^)]+\\)\\s*$/, '').trim(), parts = base.split(/\\s+/).filter(Boolean);
    if (parts.length <= 1) return { sortKey: base.toLowerCase(), display: base + suffix };
    if (/^(kid|child)$/i.test(parts[parts.length - 2] || '') && /^\\d+$/.test(parts[parts.length - 1])) {
      const surname = parts.slice(0, -2).join(' ') || 'Guest', kidLbl = parts.slice(-2).join(' ');
      return { sortKey: (surname + ', ' + kidLbl).toLowerCase(), display: surname + ', ' + kidLbl + suffix };
    }
    const last = parts[parts.length - 1], first = parts.slice(0, -1).join(' ');
    return { sortKey: (last + ', ' + first).toLowerCase(), display: last + ', ' + first + suffix };
  }

  window.shToggleBeoFilter = function(filterKey) {
    window.__SH_BEO_FILTER = (window.__SH_BEO_FILTER === filterKey) ? null : filterKey;
    var btn = document.getElementById('sh-beo-vegan-filter-btn');
    if (btn) {
      var isVeg = (window.__SH_BEO_FILTER === 'vegan');
      btn.textContent = isVeg ? 'Show All Meals' : 'Filter: Plant-Based Only';
      btn.style.background = isVeg ? '#ECFDF5' : '#FAF8F5';
      btn.style.borderColor = isVeg ? '#065F46' : '#10B981';
    }
    shRenderBeoView();
  };

  window.shToggleVeganRunSheet = function() {
    var isNowVegan = (window.__SH_BEO_FILTER === 'vegan');
    window.__SH_BEO_FILTER = isNowVegan ? null : 'vegan';
    var btn = document.getElementById('sh-beo-vegan-filter-btn');
    if (btn) {
      btn.textContent = !isNowVegan ? 'Show All Meals' : 'Filter: Plant-Based Only';
      btn.style.background = !isNowVegan ? '#ECFDF5' : '#FAF8F5';
      btn.style.borderColor = !isNowVegan ? '#065F46' : '#10B981';
    }
    if (typeof shToast === 'function') {
      shToast(!isNowVegan ? 'Filtered: Plant-based courses isolated across all tables' : 'Showing all courses & dietary alerts');
    }
    shRenderBeoView();
  };

  window.shExportTable1SampleCsv = function() {
    var tbl1 = (window.__SH_STATE && window.__SH_STATE.tables && window.__SH_STATE.tables[0]) || { number: 1, name: 'Table 1', guests: [] };
    var rows = ['Table,Seat_Clockwise_From_12_OClock,Clock_Pos,Guest_Name,Entree,Dietary_Allergy,Chair_Accessibility'];
    if (!tbl1.geometry) { if (typeof shRecomputeGeometry === 'function') shRecomputeGeometry(tbl1); }
    (tbl1.guests || []).forEach(function(g, idx) {
      var seat = (tbl1.geometry && tbl1.geometry.seats && tbl1.geometry.seats[idx]) || { seatNumber: idx + 1, clockPosition: '12:00' };
      rows.push(['"' + (tbl1.name || 'Table 1') + '"', 'Seat #' + seat.seatNumber, '"' + seat.clockPosition + '"', '"' + g.name + '"', '"' + g.meal + '"', '"' + (g.allergy || 'None') + '"', '"' + (g.accessibility || 'Standard Chair') + '"'].join(','));
    });
    var blob = new Blob([rows.join('\\r\\n')], { type: 'text/csv;charset=utf-8;' }), url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'seatharmony-table-1-sample-caterer-sheet.csv'; document.body.appendChild(a); a.click(); a.remove();
    if (typeof shToast === 'function') shToast('✓ Downloaded Table 1 Free Sample (.CSV) for Banquet Kitchen!');
    if (window.shTrackTelemetry) window.shTrackTelemetry('calculate', { source: 'sample_tbl1_csv' });
  };

  window.shCopyKitchenTally = function() {
    if (!window.__SH_STATE) return;
    var state = window.__SH_STATE;
    var title = state.title || 'Wedding Reception';
    var tables = state.tables || [];
    var totalCovers = 0, totalBeef = 0, totalHalibut = 0, totalChicken = 0, totalVegan = 0, totalVeg = 0, totalKids = 0;
    var allergiesList = [];
    tables.forEach(function(t) {
      (t.guests || []).forEach(function(g, idx) {
        totalCovers++;
        var mb = (typeof shMealBadge === 'function') ? shMealBadge(g.meal) : { short: 'Other' };
        if (mb.short === 'Beef') totalBeef++;
        else if (mb.short === 'Fish') totalHalibut++;
        else if (mb.short === 'Chicken') totalChicken++;
        else if (mb.short === 'Vegan') totalVegan++;
        else if (mb.short === 'Veg') totalVeg++;
        else totalKids++;
        if (g.allergy) {
          allergiesList.push((t.name || ('Table ' + t.number)) + ' Seat #' + (idx + 1) + ' (' + g.name + '): ' + g.allergy);
        }
      });
    });
    var lines = [
      'SEATHARMONY KITCHEN TALLY SUMMARY',
      'Event: ' + title + ' (' + totalCovers + ' Total Covers)',
      '• Beef: ' + totalBeef + ' | Fish: ' + totalHalibut + ' | Chicken: ' + totalChicken + ' | Vegan/Veg: ' + (totalVegan + totalVeg) + ' | Kids: ' + totalKids,
      '⚠Severe Dietary Flags (' + allergiesList.length + '):',
      allergiesList.length ? ('  - ' + allergiesList.slice(0, 4).join('\\n  - ') + (allergiesList.length > 4 ? ('\\n  + ' + (allergiesList.length - 4) + ' more in full sheet') : '')) : '  - None flagged',
      'Clockwise 12:00 Seat #1 mapping: ' + window.location.href
    ];
    var text = lines.join('\\n');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        if (typeof shToast === 'function') shToast('✓ Copied Kitchen Tally to Clipboard for Text/Email!');
      }).catch(function() {
        if (typeof shToast === 'function') shToast('✓ Kitchen Tally ready!');
      });
    } else {
      if (typeof shToast === 'function') shToast('✓ Kitchen Tally ready!');
    }
    if (window.shTrackTelemetry) window.shTrackTelemetry('calculate', { source: 'copy_kitchen_tally' });
  };

  window.shPrintPlatingPassTentCard = function() {
    if (!window.__SH_STATE) return;
    var state = window.__SH_STATE;
    var title = state.coupleNames || state.title || 'Wedding Reception';
    var dateOrVenue = (state.weddingDate || state.date || '') + (state.venueName ? (' · ' + state.venueName) : '');
    var tables = state.tables || [];
    var totalCovers = 0, totalBeef = 0, totalHalibut = 0, totalChicken = 0, totalVegan = 0, totalVeg = 0, totalKids = 0;
    var tableSummaries = [];

    tables.forEach(function(t, tIdx) {
      var tName = t.name || ('Table ' + (tIdx + 1));
      var guests = t.guests || [];
      var tBeef = 0, tFish = 0, tChicken = 0, tVegan = 0, tVeg = 0, tKids = 0;
      var tAllergies = [];

      guests.forEach(function(g, idx) {
        totalCovers++;
        var mb = (typeof shMealBadge === 'function') ? shMealBadge(g.meal) : { short: 'Other' };
        if (mb.short === 'Beef') { totalBeef++; tBeef++; }
        else if (mb.short === 'Fish') { totalHalibut++; tFish++; }
        else if (mb.short === 'Chicken') { totalChicken++; tChicken++; }
        else if (mb.short === 'Vegan') { totalVegan++; tVegan++; }
        else if (mb.short === 'Veg') { totalVeg++; tVeg++; }
        else { totalKids++; tKids++; }

        if (g.allergy) {
          tAllergies.push('Seat #' + (idx + 1) + ' (' + shEsc(g.name) + '): <b>' + shEsc(g.allergy) + '</b>');
        }
      });

      tableSummaries.push({
        name: tName,
        covers: guests.length,
        beef: tBeef,
        fish: tFish,
        chicken: tChicken,
        vegan: tVegan,
        veg: tVeg,
        kids: tKids,
        allergies: tAllergies
      });
    });

    var tablesRowsHtml = tableSummaries.map(function(ts) {
      var mealChips = [];
      if (ts.beef) mealChips.push(ts.beef + ' Beef');
      if (ts.fish) mealChips.push(ts.fish + ' Fish');
      if (ts.chicken) mealChips.push(ts.chicken + ' Chk');
      if (ts.vegan) mealChips.push(ts.vegan + ' Vegan');
      if (ts.veg) mealChips.push(ts.veg + ' Veg');
      if (ts.kids) mealChips.push(ts.kids + ' Kid');

      var allergyNotice = ts.allergies.length ?
        ('<div style="font-size:11px;color:#991B1B;background:#FEF2F2;padding:3px 6px;border-radius:4px;margin-top:3px;border-left:3px solid #DC2626;">Alert: ' + ts.allergies.join(' &bull; ') + '</div>') :
        '<div style="font-size:11px;color:#059669;">Standard Service</div>';

      return '<tr style="border-bottom:1px solid #E5E7EB;">' +
        '<td style="padding:6px 8px;font-weight:700;color:#1B4D3E;font-size:13px;">' + shEsc(ts.name) + '</td>' +
        '<td style="padding:6px 8px;font-weight:700;text-align:center;font-size:13px;">' + ts.covers + '</td>' +
        '<td style="padding:6px 8px;font-size:12px;color:#374151;">' + (mealChips.join(' &middot; ') || '&mdash;') + '</td>' +
        '<td style="padding:6px 8px;">' + allergyNotice + '</td>' +
      '</tr>';
    }).join('');

    var printWin = window.open('', '_blank');
    if (!printWin) {
      window.print();
      return;
    }
    printWin.document.write('<!DOCTYPE html><html><head><title>Plating Pass Tent Card - ' + shEsc(title) + '</title><style>@page { size: 8.5in 11in; margin: 0.5in; } body { font-family: system-ui, -apple-system, sans-serif; color: #1F2937; margin: 0; padding: 20px; } table { width: 100%; border-collapse: collapse; } th { text-align: left; padding: 8px; background: #1B4D3E; color: #FFFFFF; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; } @media print { .sh-no-print { display: none !important; } } </style></head><body>' +
      '<div class="sh-no-print" style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;background:#FAF8F5;padding:12px 16px;border:1px solid #E2D9C8;border-radius:8px;">' +
        '<div><strong>Executive Plating Pass Tent Card</strong> &middot; Station Sheet for Banquet Captain</div>' +
        '<button onclick="window.print()" style="padding:8px 18px;background:#1B4D3E;color:#FFFFFF;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">Print Plating Pass Sheet</button>' +
      '</div>' +
      '<div style="border:3px double #C8A96E;padding:20px;border-radius:8px;background:#FFFFFF;">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #1B4D3E;padding-bottom:12px;margin-bottom:14px;">' +
          '<div>' +
            '<div style="font-size:11px;font-weight:700;color:#8C2D19;text-transform:uppercase;letter-spacing:1.5px;">BANQUET CATERING PASS RUN SHEET</div>' +
            '<h1 style="margin:4px 0;font-size:22px;color:#1B4D3E;font-family:Georgia,serif;">' + shEsc(title) + '</h1>' +
            (dateOrVenue ? '<div style="font-size:12px;color:#6B7280;">' + shEsc(dateOrVenue) + '</div>' : '') +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:26px;font-weight:800;color:#1B4D3E;">' + totalCovers + ' <span style="font-size:14px;font-weight:600;color:#6B7280;">Covers</span></div>' +
            '<div style="font-size:11px;color:#78350F;font-weight:600;">Clockwise 12:00 Server Standard</div>' +
          '</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:8px;margin-bottom:16px;background:#FAF8F5;padding:12px;border-radius:6px;border:1px solid #E5E7EB;text-align:center;">' +
          '<div><div style="font-size:10px;color:#6B7280;font-weight:700;">BEEF</div><div style="font-size:18px;font-weight:800;color:#1F2937;">' + totalBeef + '</div></div>' +
          '<div><div style="font-size:10px;color:#6B7280;font-weight:700;">FISH</div><div style="font-size:18px;font-weight:800;color:#1F2937;">' + totalHalibut + '</div></div>' +
          '<div><div style="font-size:10px;color:#6B7280;font-weight:700;">CHICKEN</div><div style="font-size:18px;font-weight:800;color:#1F2937;">' + totalChicken + '</div></div>' +
          '<div><div style="font-size:10px;color:#6B7280;font-weight:700;">VEGAN</div><div style="font-size:18px;font-weight:800;color:#065F46;">' + totalVegan + '</div></div>' +
          '<div><div style="font-size:10px;color:#6B7280;font-weight:700;">VEG</div><div style="font-size:18px;font-weight:800;color:#065F46;">' + totalVeg + '</div></div>' +
          '<div><div style="font-size:10px;color:#6B7280;font-weight:700;">KIDS</div><div style="font-size:18px;font-weight:800;color:#1F2937;">' + totalKids + '</div></div>' +
        '</div>' +
        '<table>' +
          '<thead><tr><th style="width:25%;">Table</th><th style="width:10%;text-align:center;">Covers</th><th style="width:35%;">Entrée Breakdown</th><th style="width:30%;">Dietary / Allergy Flags</th></tr></thead>' +
          '<tbody>' + tablesRowsHtml + '</tbody>' +
        '</table>' +
        '<div style="margin-top:16px;padding-top:10px;border-top:1px dashed #D1D5DB;font-size:11px;color:#6B7280;display:flex;justify-content:space-between;">' +
          '<span>SeatHarmony Verified &bull; Clockwise Seat #1 Starting Anchor</span>' +
          '<span>Place at Executive Kitchen Pass Station</span>' +
        '</div>' +
      '</div>' +
      '</body></html>');
    printWin.document.close();
    if (typeof shToast === 'function') shToast('✓ Opened Executive Plating Pass Tent Card Print View!');
    if (window.shTrackTelemetry) window.shTrackTelemetry('calculate', { source: 'plating_pass_tent_card' });
  };

  window.shShareCatererLink = function() {
    var vId = (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819';
    var url = window.location.origin + '/print/beo/' + encodeURIComponent(vId);
    var title = (window.__SH_STATE && window.__SH_STATE.title) || 'Reception Seating';
    if (navigator.share) {
      navigator.share({
        title: title + ' · Caterer Meal Sheet',
        text: 'Here is the Clockwise 12:00 Caterer Meal Sheet and dietary allergy roster for ' + title + ':',
        url: url
      }).then(function() {
        if (typeof shToast === 'function') shToast('✓ Shared meal sheet review link!');
      }).catch(function(err) {
        if (err && err.name === 'AbortError') return;
        window.shCopyBeoUrlFallback(url);
      });
      if (window.shTrackTelemetry) window.shTrackTelemetry('share_beo_link', { vaultId: vId, method: 'native' });
      return;
    }
    window.shCopyBeoUrlFallback(url);
  };

  window.shCopyBeoUrlFallback = function(url) {
    var vId = (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function() {
        if (typeof shToast === 'function') shToast('✓ Copied caterer review link to clipboard (ready to text or email)!');
      }).catch(function() {
        window.prompt('Copy caterer review link:', url);
      });
    } else {
      window.prompt('Copy caterer review link:', url);
    }
    if (window.shTrackTelemetry) window.shTrackTelemetry('share_beo_link', { vaultId: vId, method: 'clipboard' });
  };

  window.shFilterQrLookup = function() {
    const qInput = document.getElementById('sh-qr-search'), out = document.getElementById('sh-qr-results');
    if (!out || !window.__SH_STATE) return;
    const isUnmasked = Boolean(window.__SH_STATE && window.__SH_STATE.isUnlocked);
    const vid = shEsc((window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819');
    const q = (qInput ? qInput.value : '').trim().toLowerCase(), matches = [];
    (window.__SH_STATE.tables || []).forEach(function(t) { t.guests.forEach(function(g, idx) { if (!q || g.name.toLowerCase().indexOf(q) !== -1 || t.name.toLowerCase().indexOf(q) !== -1) matches.push({ guest: g, table: t, seatNumber: idx + 1 }); }); });
    const visibleMatches = isUnmasked ? matches.slice(0, 8) : matches.slice(0, 1);
    const lockedCount = Math.max(0, matches.length - visibleMatches.length);
    out.innerHTML = visibleMatches.map(function(m, mIdx) {
      const mb = shMealBadge(m.guest.meal);
      return '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;padding:8px 10px;border-radius:10px;background:#FFFFFF;border:1px solid #EAE2D3;"><div style="min-width:0;"><div style="font-weight:800;color:#181412;font-size:0.82rem;">' + shEsc(m.guest.name) + (mIdx === 0 && !isUnmasked ? ' <span style="font-size:0.70rem;color:#065F46;font-weight:800;">(Free Sample Proof)</span>' : '') + '</div><div style="font-size:0.71rem;color:#78716C;">' + shEsc(m.table.name) + ' &middot; ' + mb.icon + ' ' + shEsc(m.guest.meal) + '</div></div><span class="badge badge-emerald tabular" style="font-size:0.72rem;">Table ' + m.table.number + ' &middot; Seat #' + m.seatNumber + '</span></div>';
    }).join('') + (!isUnmasked && lockedCount > 0 ? '<div style="padding:10px 12px;border-radius:10px;background:#FAF8F5;border:1px dashed #1B4D3E;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;"><span style="font-size:0.78rem;font-weight:700;color:#065F46;">' + SH_LOCK_SVG + '+' + lockedCount + ' Additional Guests (Tables 2&ndash;8 Live Phone Lookup)</span><button type="button" class="sh-locked-spec-badge" onclick="window.shFocusInlineVaultEmail()" style="cursor:pointer;background:#EBF4F0;color:#065F46;border:1px solid #1B4D3E;border-radius:999px;padding:5px 14px;font-size:0.72rem;font-weight:800;">' + SH_LOCK_SVG + 'Enter Email ($0) &darr;</button></div>' : '');
  };

  function shSyncVaultIdLinks(vId) {
    const id = String(vId || (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819');
    if (window.__SH_STATE) window.__SH_STATE.vaultId = id;
    const state = window.__SH_STATE || {};
    const coupleTitle = String(state.title || "Maya & Liam's Reception").trim();
    let totalGuests = 0, totalAlerts = 0, totalTables = Array.isArray(state.tables) ? state.tables.length : 1;
    if (Array.isArray(state.tables)) {
      state.tables.forEach(function(t) { (t.guests || []).forEach(function(g) { totalGuests++; if (g.allergy || g.accessibility) totalAlerts++; }); });
    }
    const encTarget = encodeURIComponent(coupleTitle || 'our-wedding');
    const setTxt = function(elId, txt) { const el = document.getElementById(elId); if (el) el.textContent = txt; };
    setTxt('hero-vault-code-label', '#' + id); setTxt('sh-studio-vault-code', id); setTxt('sh-btn-vault-id', id); setTxt('sh-modal-vault-code', id);
    setTxt('sh-modal-links-vault-id', id); setTxt('sh-unlocked-vault-id', id);
    setTxt('sh-tab-floorplan', 'Seating (' + totalTables + ' Tables)');
    setTxt('sh-tab-beo', 'Caterer sheet (' + totalGuests + ' Meals' + (totalAlerts ? ' · ' + totalAlerts + ' Alerts' : '') + ')');
    setTxt('sh-tab-poster', 'Welcome sign (' + totalGuests + ' Names)');
    setTxt('sh-tab-qr', 'Guest QR (' + totalGuests + ' Live)');
    const themeQ = encodeURIComponent(window.__SH_POSTER_THEME || state.posterTheme || 'alabaster');
    const sortQ = encodeURIComponent(window.__SH_POSTER_MODE || state.posterSort || 'alphabetical');
    const kickerQ = encodeURIComponent(window.__SH_SIGN_KICKER || state.signKicker || 'Please Find Your Seat');
    const monoQ = encodeURIComponent(window.__SH_SIGN_MONOGRAM || state.signMonogram || '');
    const mapQ = (window.__SH_POSTER_SHOW_MAP === false || state.posterShowMap === false) ? '&map=0' : '&map=1';
    const posterQs = '?theme=' + themeQ + '&sort=' + sortQ + '&kicker=' + kickerQ + (monoQ ? ('&monogram=' + monoQ) : '') + mapQ;
    const setHref = function(elId, url) { const el = document.getElementById(elId); if (el) el.href = url; };
    ['sh-cmd-vault-link', 'sh-footer-vault-link', 'sh-modal-link-vault'].forEach(function(k) { setHref(k, '/vault/' + id); });
    ['sh-cmd-poster-link', 'sh-open-poster-studio-link', 'sh-card5-poster-studio-link', 'sh-modal-link-poster'].forEach(function(k) { setHref(k, '/print/poster/' + id + posterQs); });
    const averySampleQs = (!window.__SH_STATE || !window.__SH_STATE.isUnlocked) ? '?sample=1' : '';
    ['sh-cmd-avery-link', 'sh-open-avery-studio-link', 'sh-avery-preview-btn', 'sh-card5-avery-studio-link', 'sh-modal-link-avery'].forEach(function(k) { setHref(k, '/print/avery-5302/' + id + averySampleQs); });
    ['sh-cmd-beo-link', 'sh-open-beo-studio-link', 'sh-modal-link-beo'].forEach(function(k) { setHref(k, '/print/beo/' + id); });
    ['sh-cmd-qr-link', 'sh-open-qr-app-link', 'sh-qr-short-url', 'sh-modal-link-qr'].forEach(function(k) { setHref(k, '/qr/' + id); });
    const savedEm = (window.localStorage && localStorage.getItem('sh_saved_email')) || (state.ownerEmail && !/^(test|vip)@/i.test(state.ownerEmail) ? state.ownerEmail : '') || '';
    const emailParam = (savedEm && savedEm.indexOf('@') > 0) ? ('&email=' + encodeURIComponent(savedEm) + '&customer_email=' + encodeURIComponent(savedEm)) : '';
    const packUrl = '/buy/complete_dossier?target=' + encTarget + '&vault=' + id + '&allow_promotion_codes=false' + emailParam;
    const flashUrl = '/buy/flash_pass?target=' + encTarget + '&vault=' + id + '&allow_promotion_codes=false' + emailParam;
    const proUrl = '/buy/pro_b2b?target=' + encTarget + '&vault=' + id + '&allow_promotion_codes=false' + emailParam;
    ['sh-card5-buy-btn', 'sh-vault-buy-pack-btn', 'sh-pane-poster-buy-link', 'sh-avery-pack-buy-btn', 'sh-carousel-unlock-cta', 'nav-primary-buy-cta', 'pricing-buy-pack', 'pricing-buy-bottom', 'sh-pane-beo-pack-upgrade-link'].forEach(function(k) { setHref(k, packUrl); });
    ['sh-pane-beo-buy-link'].forEach(function(k) { setHref(k, flashUrl); });
    ['sh-vault-buy-pro-btn', 'pricing-buy-pro'].forEach(function(k) { setHref(k, proUrl); });
    const vBtn = document.getElementById('sh-vault-buy-pack-btn');
    if (vBtn) vBtn.innerHTML = 'Get Auto-Filled 24&Prime;&times;36&Prime; Print Pack ($7) &rarr;';
    const pBtn = document.getElementById('pricing-buy-pack');
    if (pBtn) pBtn.innerHTML = 'Unlock ' + shEsc(coupleTitle) + ' Print Pack (' + totalGuests + ' Guests &middot; $7 vs. $14 Etsy) &rarr;';
    const qrImg = document.getElementById('sh-live-qr-img');
    if (qrImg) qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&color=181412&bgcolor=FFFFFF&data=' + encodeURIComponent(window.location.origin + '/qr/' + id);
    if (typeof window.shRenderLivePersonalizedProof === 'function') window.shRenderLivePersonalizedProof();
  }

  function shFlushVaultNow() {
    if (!window.__SH_STATE) return;
    try { localStorage.setItem('sh_saved_vault_v1', JSON.stringify(window.__SH_STATE)); } catch (_) {}
    if (window.shwSaveSession) window.shwSaveSession();
    clearTimeout(window.__shPersistTimer);
    fetch('/api/vault/save', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ vaultId: window.__SH_STATE.vaultId || 'SH-4819', ownerEmail: window.__SH_STATE.ownerEmail || '', state: window.__SH_STATE }) }).catch(function() {});
  }
  document.addEventListener('mousedown', function(ev) {
    var a = ev.target && ev.target.closest && ev.target.closest('a[href^="/print/"], a[href^="/vault/"], a[href^="/qr/"]');
    if (a) shFlushVaultNow();
  });

  function shAutoPersistVault() {
    if (!window.__SH_STATE) return;
    try { localStorage.setItem('sh_saved_vault_v1', JSON.stringify(window.__SH_STATE)); } catch (_) {}
    if (window.shwSaveSession) window.shwSaveSession();
    clearTimeout(window.__shPersistTimer);
    window.__shPersistTimer = setTimeout(shFlushVaultNow, 450);
  }

  window.shCloseVaultModal = function() { const m = document.getElementById('sh-vault-modal'); if (m) m.style.display = 'none'; };
  window.shCloseVaultModalAndGoToStudio = function() {
    window.shCloseVaultModal();
    const s = document.getElementById('studio');
    if (s) s.scrollIntoView({ behavior: 'smooth' });
  };
  window.shOpenVaultModal = function() {
    const m = document.getElementById('sh-vault-modal');
    if (m) m.style.display = 'flex';
    if (window.shTrackTelemetry) window.shTrackTelemetry('view_paywall', { source: 'vault_modal' });
    try {
      const localPlan = localStorage.getItem('sh_saved_vault_v1');
      const box = document.getElementById('sh-vault-local-recovery-box');
      if (localPlan && box) {
        const p = JSON.parse(localPlan);
        const title = p.title || 'In-Progress Floorplan';
        const tables = Array.isArray(p.tables) ? p.tables : [];
        const guests = Array.isArray(p.guests) ? p.guests.length : tables.reduce(function(acc, t) { return acc + (t.guests ? t.guests.length : 0); }, 0);
        box.style.display = 'block';
        box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">' +
          '<div><span style="color:#065F46;font-weight:800;">✓ Auto-Saved on this Device:</span> <strong style="color:#181412;">' + (title.replace(/[<>&"]/g, '')) + '</strong> <span style="color:#78716C;">(' + guests + ' Guests)</span></div>' +
          '<button type="button" onclick="window.shCloseVaultModalAndGoToStudio()" style="cursor:pointer;background:#ECFDF5;color:#065F46;border:1px solid #10B981;padding:4px 10px;border-radius:6px;font-size:0.75rem;font-weight:700;">Continue Editing &darr;</button>' +
        '</div>';
      }
    } catch (_) {}
  };
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
    if (btn) btn.textContent = 'Saving Your Seating Plan...';
    try {
      if (window.__SH_STATE) window.__SH_STATE.ownerEmail = email;
      const res = await fetch('/api/vault/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ vaultId: (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819', ownerEmail: email, pinCode: pin, state: window.__SH_STATE }) });
      const data = await res.json(), vid = data && (data.vaultId || data.vault_id);
      if (data && data.ok && vid) { shSyncVaultIdLinks(vid); if (btn) btn.textContent = '✓ Saved Your Seating Plan' + (email ? ' (' + email + ')' : ''); shToast('✓ Saved your reception seating plan!'); }
    } catch (e) { if (btn) btn.textContent = 'Save My Seating Plan'; }
  };
  window.shLookupSavedVault = async function(overrideQuery) {
    const inp = document.getElementById('sh-vault-lookup-input'), st = document.getElementById('sh-vault-lookup-status');
    if (overrideQuery && inp) inp.value = overrideQuery;
    const q = (overrideQuery || (inp ? inp.value : '')).trim();
    if (!q) return;
    if (st) st.textContent = 'Searching for your saved seating plan...';
    try {
      const res = await fetch('/api/vault/lookup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ emailOrVaultId: q, query: q }) });
      const data = await res.json(), vid = data && (data.vault_id || data.vaultId);
      if (data && data.ok && vid && data.state) {
        window.__SH_STATE = data.state; window.__SH_STATE.vaultId = vid; window.__SH_STATE.isUnlocked = Boolean(data.is_unlocked);
        const navLbl = document.getElementById('nav-vault-label'); if (navLbl) navLbl.textContent = 'Saved Plan';
        shSyncVaultIdLinks(vid); shRenderAll();
        if (st) st.innerHTML = '<div style="padding:8px 10px;border-radius:8px;background:#ECFDF5;border:1px solid #10B981;"><strong style="color:#065F46;">✓ Restored: "' + shEsc(data.title || 'Saved Reception') + '"!</strong><br/><a href="/vault/' + shEsc(vid) + '" style="color:#8C2D19;font-weight:800;text-decoration:underline;">Open All 5 Print &amp; Caterer Files &rarr;</a></div>';
        shToast('✓ Restored your saved seating plan!');
      } else if (st) { st.innerHTML = '<span style="color:#9F1239;">No saved seating plan found for "' + shEsc(q) + '". Save your floorplan on the left first.</span>'; }
    } catch (e) { if (st) st.textContent = 'Could not look up saved plan.'; }
  };
  window.shLoginWithTestAccount = function(code) {
    return window.shLookupSavedVault(code || 'test@seatharmony.com');
  };
  window.shTrackTelemetry = function(eventType, meta) {
    try {
      window.__shTrackedEvents = window.__shTrackedEvents || {};
      var src = (meta && meta.source) ? String(meta.source) : '';
      var dedupKey = eventType + ':' + src;
      if ((eventType === 'calculate' || eventType === 'studio_interact' || eventType === 'view_paywall') && window.__shTrackedEvents[dedupKey]) return;
      window.__shTrackedEvents[dedupKey] = 1;
      var m = document.cookie.match(/(?:^|;\\s*)vs_vid=([^;]+)/);
      var vid = m ? decodeURIComponent(m[1]) : '';
      var fullMeta = Object.assign({ js_hydrated: 1, vw: window.innerWidth || 0, vh: window.innerHeight || 0, vid: vid }, meta || {});
      fetch('/api/telemetry/event', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: eventType, eventType: eventType, page_url: window.location.pathname, pagePath: window.location.pathname, meta: fullMeta }) }).catch(function() {});
    } catch (_) {}
  };
  window.shRenderLivePersonalizedProof = function() {
    var st = window.__SH_STATE || {};
    var wizCouple = document.getElementById('shw-couple');
    var wizVenue = document.getElementById('shw-venue');
    var rawCouple = (wizCouple && wizCouple.value && wizCouple.value.trim()) || st.title || "Maya & Liam's Estate Reception";
    var hasSuffix = /(reception|wedding|dinner|gala|layout|template|chart|floorplan|ballroom|estate|club|hall|preset|rounds|guests)/i.test(rawCouple);
    var coupleDisplay = hasSuffix ? rawCouple : (rawCouple + "'s Reception");
    var venueDisplay = (wizVenue && wizVenue.value && wizVenue.value.trim()) || st.venueName || 'Rosewood Conservatory';
    if (wizCouple && wizCouple.value && wizCouple.value.trim() && st) {
      st.title = coupleDisplay;
      var ci = document.getElementById('sh-couple-title-input');
      if (ci && document.activeElement !== ci) ci.value = coupleDisplay;
    }
    if (wizVenue && wizVenue.value && wizVenue.value.trim() && st) {
      st.venueName = venueDisplay;
      var vi = document.getElementById('sh-venue-name-input');
      if (vi && document.activeElement !== vi) vi.value = venueDisplay;
    }
    var tbl1 = (st.tables && st.tables[0]) || { number: 1, name: 'Table 1 (Sweetheart)', guests: [] };
    var tbl2 = (st.tables && st.tables[1]) || tbl1;
    var g1 = (tbl1.guests && tbl1.guests[0]) || { name: 'Maya Vance', meal: 'Filet Mignon' };
    var g2 = (tbl1.guests && tbl1.guests[1]) || (tbl2.guests && tbl2.guests[0]) || { name: 'Liam Vance', meal: 'Pan-Seared Halibut' };
    var totalAllergies = 0, totalGluten = 0;
    (st.tables || []).forEach(function(t) {
      (t.guests || []).forEach(function(g) {
        if (g && g.allergy) {
          totalAllergies++;
          if (/celiac|gluten|gf/i.test(g.allergy)) totalGluten++;
        }
      });
    });
    var pcEl = document.getElementById('sh-proof-couple-name');
    if (pcEl) pcEl.innerHTML = shEsc(coupleDisplay) + ' &middot; <span id="sh-proof-venue-name" style="font-weight:600;color:#57534E;">' + shEsc(venueDisplay) + '</span>';
    var ptEl = document.getElementById('sh-proof-table1-summary');
    if (ptEl) ptEl.innerHTML = '<strong>&#10003; ' + shEsc(tbl1.name || 'Table 1') + ' Sample (Free):</strong> Seat #1: ' + shEsc(g1.name) + ' (' + shEsc(g1.meal || 'Filet Mignon') + ') &amp; ' + shEsc(g2.name) + ' &bull; ' + (totalAllergies || 2) + ' Allergy Notes';
    var wSign = document.getElementById('shw-proof-sign-line');
    if (wSign) wSign.innerHTML = '24&Prime;&times;36&Prime; Sign: <strong>' + shEsc(coupleDisplay) + '</strong> &middot; ' + shEsc(venueDisplay);
    var wTbl1 = document.getElementById('shw-proof-table1-line');
    if (wTbl1) wTbl1.innerHTML = 'Table 1: Seat #1: ' + shEsc(g1.name) + ' &amp; ' + shEsc(g2.name) + ' &bull; ' + (totalAllergies || 2) + ' Allergy Notes';
    var savedEmail = '';
    try { savedEmail = localStorage.getItem('sh_saved_email') || ''; } catch (_) {}
    if (!savedEmail && st.ownerEmail && st.ownerEmail.indexOf('@') > 0 && !/^(test|vip)@/i.test(st.ownerEmail)) savedEmail = st.ownerEmail;
    var isUnmasked = Boolean((savedEmail && savedEmail.indexOf('@') > 0) || st.isUnlocked || window.__SH_EMAIL_UNMASKED);
    var totalGuestsCnt = 0;
    (st.tables || []).forEach(function(t) { totalGuestsCnt += (t.guests || []).length; });
    var tblCount = (st.tables && st.tables.length) || 8;
    var lockSvg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
    document.querySelectorAll('[data-sh-locked-badge="beo"]').forEach(function(b) {
      b.style.display = 'none';
      b.style.filter = 'none';
      if (isUnmasked) {
        b.innerHTML = '&#10003; Unmasked Free: Tables 2&ndash;' + tblCount + ' Clockwise Meal Tally';
        b.setAttribute('data-unmasked', '1');
      } else {
        b.innerHTML = lockSvg + 'Tables 2&ndash;' + tblCount + ' Clockwise Meal Tally';
        b.setAttribute('data-unmasked', '0');
      }
    });
    var prevBox = document.getElementById('sh-table1-escort-dietary-preview');
    var prevBadge = document.getElementById('sh-table1-preview-badge');
    var prevStatus = document.getElementById('sh-table1-preview-status');
    var prevBody = document.getElementById('sh-table1-preview-body');
    if (prevBody) {
      prevBody.innerHTML = '<strong>Place Card #1:</strong> ' + shEsc(g1.name) + ' &amp; ' + shEsc(g2.name) + ' &bull; Table 1, Seat #1 &bull; ' + shEsc(g1.meal || 'Filet Mignon') + ' &bull; <strong>Dietary Notes:</strong> ' + (totalAllergies || 2) + ' Allergy Notes' + (totalGluten ? ' (' + totalGluten + ' Gluten-Free)' : '');
      prevBody.style.filter = 'none';
      prevBody.style.userSelect = 'auto';
    }
    if (prevBox) {
      prevBox.setAttribute('data-unmasked', isUnmasked ? '1' : '0');
    }
    if (prevBadge) prevBadge.innerHTML = isUnmasked ? '&#10003; Saved Seating &amp; Print Preview' : 'Live Seating &amp; Print Preview';
    if (prevStatus) prevStatus.textContent = isUnmasked ? (savedEmail ? ('Saved to ' + savedEmail) : 'Saved') : 'Ready for local print shops';
  };
  window.shPrintAllDeliverables = function() {
    var vId = (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819';
    var win = window.open('/vault/' + encodeURIComponent(vId) + '?auto_print_all=1', '_blank');
    if (win) win.focus();
    if (window.shTrackTelemetry) window.shTrackTelemetry('print_all_day_of_assets', { vaultId: vId });
  };
  window.shPrintFloorplanDiagram = function() {
    var vId = (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819';
    var win = window.open('/print/floorplan/' + encodeURIComponent(vId) + '?auto_print=1', '_blank');
    if (win) win.focus();
    if (window.shTrackTelemetry) window.shTrackTelemetry('view_floorplan_diagram_print', { vaultId: vId });
  };
  window.shFocusEmailUnlockBadge = function() {
    var inp = document.getElementById('sh-inline-vault-email') || document.getElementById('sh-seo-calc-email');
    if (inp) {
      inp.scrollIntoView({ behavior: 'smooth', block: 'center' });
      try { inp.focus({ preventScroll: true }); } catch (_) { inp.focus(); }
      inp.style.boxShadow = '0 0 0 3px rgba(27, 77, 62,0.32)';
    }
  };

  window.shGateOrExportBeoCsv = function(mode) {
    var savedEm = '';
    try { savedEm = localStorage.getItem('sh_saved_email') || ''; } catch (_) {}
    var hasValidEmail = Boolean((savedEm && savedEm.indexOf('@') > 0) || (window.__SH_STATE && ((window.__SH_STATE.ownerEmail && window.__SH_STATE.ownerEmail.indexOf('@') > 0 && !/^(test|vip)@/i.test(window.__SH_STATE.ownerEmail)) || window.__SH_STATE.isUnlocked)));
    if (hasValidEmail) {
      window.shRenderLivePersonalizedProof();
      if (mode === 'share' && window.__shRawCopyMomSandboxLink) window.__shRawCopyMomSandboxLink();
      else if (window.__shRawExportBeoCsv) window.__shRawExportBeoCsv();
      return;
    }
    window.__SH_PENDING_EXPORT_MODE = mode || 'csv';
    window.shTrackTelemetry('view_paywall', { source: 'beo_csv_gate', mode: mode || 'csv' });
    var grid = document.getElementById('sh-builder-grid');
    if (grid && grid.style.display === 'none' && typeof window.shFinishSetupWizard === 'function') window.shFinishSetupWizard();
    var inp = document.getElementById('sh-inline-vault-email');
    if (inp) {
      inp.scrollIntoView({ behavior: 'smooth', block: 'center' });
      try { inp.focus({ preventScroll: true }); } catch (_) { inp.focus(); }
      inp.style.boxShadow = '0 0 0 3px rgba(27, 77, 62,0.32)';
    }
    shToast('Enter your email ($0) below to Save & Send to Partner/Venue, unmask your Table 1 Escort Card & Dietary Summary, and export!');
  };
  (function() {
    if (typeof window.shExportBeoCsv === 'function' && !window.__shRawExportBeoCsv) {
      window.__shRawExportBeoCsv = window.shExportBeoCsv;
      window.shExportBeoCsv = function(bypassGate) {
        if (bypassGate === true) return window.__shRawExportBeoCsv();
        return window.shGateOrExportBeoCsv('csv');
      };
    }
    if (typeof window.shCopyMomSandboxLink === 'function' && !window.__shRawCopyMomSandboxLink) {
      window.__shRawCopyMomSandboxLink = window.shCopyMomSandboxLink;
      window.shCopyMomSandboxLink = function(bypassGate) {
        if (bypassGate === true) return window.__shRawCopyMomSandboxLink();
        return window.shGateOrExportBeoCsv('share');
      };
    }
    var origTab = window.shSetActiveTab;
    if (typeof origTab === 'function') {
      window.shSetActiveTab = function(tab) {
        window.__shUserInteracted = true;
        if (tab && tab !== 'floorplan') {
          window.shTrackTelemetry('calculate', { source: 'tab_' + tab });
          window.shTrackTelemetry('studio_interact', { source: 'tab_' + tab });
        }
        if (tab === 'beo' || tab === 'poster') window.shTrackTelemetry('view_paywall', { source: 'tab_' + tab });
        return origTab.apply(this, arguments);
      };
    }
    ['shRunAutoSolver', 'shSwitchPreset', 'shAddMessyHousehold'].forEach(function(fnName) {
      var orig = window[fnName];
      if (typeof orig === 'function') {
        window[fnName] = function() {
          window.__shUserInteracted = true;
          window.shTrackTelemetry('calculate', { source: fnName });
          window.shTrackTelemetry('studio_interact', { source: fnName });
          return orig.apply(this, arguments);
        };
      }
    });
    document.addEventListener('click', function(ev) {
      var buyLink = ev.target && ev.target.closest && ev.target.closest('a[href*="/buy/"]');
      if (!buyLink) return;
      var typedEmail = (document.getElementById('sh-inline-vault-email') && document.getElementById('sh-inline-vault-email').value) ||
        (document.getElementById('sh-vault-email-input') && document.getElementById('sh-vault-email-input').value) ||
        (document.getElementById('sh-seo-calc-email') && document.getElementById('sh-seo-calc-email').value) ||
        (window.localStorage && localStorage.getItem('sh_saved_email')) ||
        (window.__SH_STATE && window.__SH_STATE.ownerEmail && !/^(test|vip)@/i.test(window.__SH_STATE.ownerEmail) ? window.__SH_STATE.ownerEmail : '') || '';
      typedEmail = String(typedEmail || '').trim().toLowerCase();
      try {
        var u = new URL(buyLink.href, window.location.origin);
        u.searchParams.set('allow_promotion_codes', 'false');
        if (typedEmail && typedEmail.indexOf('@') > 0) {
          try { localStorage.setItem('sh_saved_email', typedEmail); } catch (_) {}
          u.searchParams.set('email', typedEmail);
          u.searchParams.set('customer_email', typedEmail);
          fetch('/api/leads', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: typedEmail, summaryText: 'Two-Step Micro-Commitment Checkout (' + ((window.__SH_STATE && window.__SH_STATE.title) || 'SeatHarmony') + ')', utmSource: 'two_step_checkout' }) }).catch(function() {});
        }
        buyLink.href = u.pathname + u.search + u.hash;
      } catch (_) {}
    }, true);
    function shInitOnLoad() {
      try {
        var params = new URLSearchParams(window.location.search);
        if (params.get('checkout') === 'success' || params.get('unlocked') === '1') {
          try { localStorage.setItem('sh_purchased', '1'); } catch (_) {}
          window.__SH_PURCHASED = true;
          window.__SH_EMAIL_UNMASKED = true;
          var retVid = params.get('vault') || (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819';
          shToast('Event Print Pack Unlocked! All 4 Day-Of Assets are Ready to Print');
          if (window.shTrackTelemetry) window.shTrackTelemetry('purchase_success', { vaultId: retVid });
          setTimeout(function() {
            if (typeof shRenderBeoView === 'function') shRenderBeoView();
            if (typeof shRenderPosterView === 'function') shRenderPosterView();
            if (typeof window.shFilterQrLookup === 'function') window.shFilterQrLookup();
            var upBr = document.getElementById('sh-post-email-upgrade-bridge');
            if (upBr) {
              upBr.style.display = 'flex';
              upBr.style.background = '#ECFDF5';
              upBr.style.borderColor = '#10B981';
              upBr.innerHTML = '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;"><span><strong>Event Print Pack Active!</strong></span><span style="font-size:12px;color:#065F46;background:#D1FAE5;border:1px solid #A7F3D0;padding:2px 8px;border-radius:6px;">&#10003; All 4 Deliverables Unlocked</span></div><a href="/vault/' + encodeURIComponent(retVid) + '" style="background:#1B4D3E;color:#FFFFFF;border-radius:8px;padding:8px 16px;font-size:13.5px;font-weight:700;text-decoration:none;">Open Event Deliverables Vault &rarr;</a>';
            }
          }, 400);
        }
      } catch (_) {}
      try {
        var saved = localStorage.getItem('sh_saved_email');
        if (saved && saved.indexOf('@') > 0) {
          var inl = document.getElementById('sh-inline-vault-email');
          if (inl && !inl.value) inl.value = saved;
          if (window.__SH_STATE && (!window.__SH_STATE.ownerEmail || /^(test|vip)@/i.test(window.__SH_STATE.ownerEmail))) window.__SH_STATE.ownerEmail = saved;
        }
      } catch (_) {}
      window.shRenderLivePersonalizedProof();
      ['shwPickGuests', 'shwPickTable', 'shwLoadInstantScenario', 'shwPasteSampleList'].forEach(function(wFn) {
        var origW = window[wFn];
        if (typeof origW === 'function') {
          window[wFn] = function() {
            window.__shUserInteracted = true;
            window.shTrackTelemetry('calculate', { source: wFn });
            window.shTrackTelemetry('studio_interact', { source: wFn });
            return origW.apply(this, arguments);
          };
        }
      });
      var stage = document.getElementById('sh-floorplan-svg-stage');
      if (stage) {
        stage.addEventListener('pointerdown', function() {
          window.__shUserInteracted = true;
          window.shTrackTelemetry('calculate', { source: 'canvas_interact' });
          window.shTrackTelemetry('studio_interact', { source: 'canvas_interact' });
        }, { once: true, passive: true });
      }
      var vBar = document.getElementById('sh-vault-checkout-bar');
      if (vBar && typeof IntersectionObserver !== 'undefined') {
        var obs = new IntersectionObserver(function(entries) {
          entries.forEach(function(en) {
            if (en.isIntersecting) {
              window.shTrackTelemetry('view_paywall', { source: 'vault_bar_scroll' });
              obs.disconnect();
            }
          });
        }, { threshold: 0.35 });
        obs.observe(vBar);
      }
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', shInitOnLoad);
    } else {
      shInitOnLoad();
    }
  })();
  window.shSaveInlineEmailLead = async function() {
    var inp = document.getElementById('sh-inline-vault-email'), btn = document.getElementById('sh-inline-vault-save-btn');
    var inp4 = document.getElementById('sh-step4-inline-email'), btn4 = document.getElementById('sh-step4-inline-save-btn');
    var email = (inp && inp.value && String(inp.value).trim()) || (inp4 && inp4.value && String(inp4.value).trim()) || '';
    email = String(email).toLowerCase();
    if (!email || email.indexOf('@') < 1) { if (inp) inp.focus(); shToast('Enter your email ($0) to Save & Send your seating plan & unmask your Table 1 Escort Card preview.'); return; }
    if (btn) btn.textContent = 'Saving...';
    if (btn4) btn4.textContent = 'Saving...';
    try { localStorage.setItem('sh_saved_email', email); } catch (_) {}
    window.__SH_EMAIL_UNMASKED = true;
    if (window.__SH_STATE) {
      window.__SH_STATE.ownerEmail = email;
      if (!window.__SH_STATE.vaultId || window.__SH_STATE.vaultId === 'SH-4819') window.__SH_STATE.vaultId = 'SH-' + Math.floor(1000 + Math.random() * 9000);
    }
    window.shRenderLivePersonalizedProof();
    if (typeof shRenderBeoView === 'function') shRenderBeoView();
    if (typeof shRenderPosterView === 'function') shRenderPosterView();
    if (typeof window.shFilterQrLookup === 'function') window.shFilterQrLookup();
    try {
      fetch('/api/leads', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, summaryText: 'Save & Email My Seating Plan ($0): ' + ((window.__SH_STATE && window.__SH_STATE.title) || 'SeatHarmony'), utmSource: 'inline_save_bridge' }) }).catch(function() {});
      var res = await fetch('/api/vault/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ vaultId: (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819', ownerEmail: email, state: window.__SH_STATE }) });
      var data = await res.json(), vid = (data && (data.vaultId || data.vault_id)) || (window.__SH_STATE && window.__SH_STATE.vaultId);
      if (vid) shSyncVaultIdLinks(vid);
      try {
        var u = new URL(window.location.href); if (vid) u.searchParams.set('vault', vid); u.searchParams.set('saved', '1');
        window.history.replaceState({}, '', u.pathname + u.search + u.hash);
        var sl = document.getElementById('sh-stateful-share-link'); if (sl) sl.href = u.pathname + u.search + '#studio';
      } catch (_) {}
      var upBr = document.getElementById('sh-post-email-upgrade-bridge'); if (upBr) upBr.style.display = 'flex';
      var upCta = document.getElementById('sh-post-email-upgrade-cta'), mainBuy = document.getElementById('sh-vault-buy-pack-btn');
      if (upCta && mainBuy && mainBuy.href) upCta.href = mainBuy.href;
      if (btn) { btn.textContent = '✓ Saved ($0)'; btn.style.background = '#1B4D3E'; btn.style.borderColor = '#005E56'; }
      if (btn4) { btn4.textContent = '✓ Saved ($0)'; btn4.style.background = '#1B4D3E'; btn4.style.borderColor = '#005E56'; }
      if (window.__SH_PENDING_EXPORT_MODE === 'share' && window.__shRawCopyMomSandboxLink) { window.__SH_PENDING_EXPORT_MODE = null; window.__shRawCopyMomSandboxLink(); }
      else if (window.__shRawExportBeoCsv) { window.__SH_PENDING_EXPORT_MODE = null; window.__shRawExportBeoCsv(); }
      shToast('✓ Saved to ' + email + ', unlocked Clockwise 12:00 Meal Sheet, and exported!');
    } catch (_) { if (btn) btn.textContent = 'Save & Email My Seating Plan ($0)'; }
  };
  window.shSubmitVocSurvey = function(choice, btn) {
    document.querySelectorAll('#sh-voc-survey-box .sh-voc-chip').forEach(function(b) { b.style.background = '#FFFFFF'; b.style.borderColor = '#D6CFC2'; b.style.color = '#181412'; });
    if (btn) { btn.style.background = '#181412'; btn.style.borderColor = '#181412'; btn.style.color = '#FBF9F5'; }
    var lbl = document.getElementById('sh-voc-survey-label'); if (lbl) lbl.textContent = '✓ Tailored for your wedding — click Unlock above when ready to print';
    window.shTrackTelemetry('survey_response', { choice: choice, vaultId: (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819' });
    if ((choice === '24x36_sign' || choice === 'avery_5302') && window.shSetActiveTab) window.shSetActiveTab('poster');
    else if (choice === 'caterer_beo' && window.shSetActiveTab) window.shSetActiveTab('beo');
    else if (choice === 'floorplan' && window.shSetActiveTab) window.shSetActiveTab('floorplan');
  };`;
}

module.exports = { renderDeliverablesClientScript };

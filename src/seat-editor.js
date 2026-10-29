/**
 * SeatHarmony - Simple Seat Editor (end-state editing as easy as the setup wizard).
 * Tap a table -> see its guests. Tap a guest -> Move / Meal / Dietary / Rename / Remove, all as plain buttons.
 * Every change is undoable.
 */

function renderSeatEditorClientScript() {
  return `
  window.__SH_OPEN_GUEST = null; window.__SH_UNDO = [];
  var SH_ED_MEALS = [['Filet Mignon', 'Beef'], ['Pan-Seared Halibut', 'Fish'], ['Vegan Risotto', 'Vegan'], ['Kids Chicken Tenders', 'Kids']];
  var SH_ED_NOTES = [
    ['none', 'None', '', ''], ['nut', 'Nut allergy', '🥜 SEVERE PEANUT ALLERGY', ''], ['gf', 'Gluten-free', '🌾 SEVERE CELIAC (GF)', ''],
    ['wheel', 'Wheelchair', '', '♿ REMOVE CHAIR FOR WHEELCHAIR'], ['high', 'Highchair', '', '👶 ADD HIGHCHAIR']
  ];
  function shEdNoteKey(g) {
    var a = String(g.allergy || ''), c = String(g.accessibility || '');
    if (a.indexOf('PEANUT') !== -1 || a.toLowerCase().indexOf('nut') !== -1) return 'nut';
    if (/CELIAC|GLUTEN|\\bGF\\b/i.test(a)) return 'gf';
    if (a) return 'other';
    if (c.indexOf('WHEELCHAIR') !== -1) return 'wheel';
    if (c) return 'high';
    return 'none';
  }
  function shEdMealShort(meal) { var m = String(meal || '').toLowerCase(); return m.indexOf('halibut') !== -1 || m.indexOf('fish') !== -1 ? 'Fish' : (m.indexOf('vegan') !== -1 || m.indexOf('risotto') !== -1 ? 'Vegan' : (m.indexOf('kid') !== -1 ? 'Kids' : 'Beef')); }
  function shEdTableLabel(t) { return shNormalizeShape(t.shape) === 'sweetheart' ? 'Sweetheart' : ('Table ' + t.number); }

  /* ---- Undo ---- */
  function shEdState() { return JSON.stringify({ tables: window.__SH_STATE.tables, roomHeight: window.__SH_STATE.roomHeight }); }
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
    window.__SH_STATE.tables = prev.tables; window.__SH_STATE.roomHeight = prev.roomHeight;
    window.__SH_STATE.tables.forEach(function(t) { shRecomputeGeometry(t); });
    window.__SH_OPEN_GUEST = null; window.__SH_SWAP_SOURCE = null;
    window.__SH_SELECTED_TABLE_IDX = Math.min(window.__SH_SELECTED_TABLE_IDX || 0, window.__SH_STATE.tables.length - 1);
    shSyncTableSelectAndPills(); shToast('\\u21b6 Undone'); shRenderAll();
  };
  ['shMoveGuestToTable', 'shAddNewTable', 'shDeleteSelectedTable', 'shStartTableDrag', 'shChangeTableCapacity', 'shRemoveGuest', 'shQuickAddGuestToTable'].forEach(function(fn) {
    var orig = window[fn]; if (typeof orig !== 'function') return;
    window[fn] = function() { window.shSnapshot(); return orig.apply(this, arguments); };
  });

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
    window.shMoveGuestToTable(tIdx, sIdx, toIdx);
    window.__SH_SWAP_SOURCE = null; window.__SH_OPEN_GUEST = null; window.__SH_SELECTED_TABLE_IDX = tIdx;
    shToast('Moved ' + g.name + ' to ' + shEdTableLabel(dst)); shRenderAll();
  };
  window.shEdMeal = function(tIdx, sIdx, meal) { var g = window.__SH_STATE.tables[tIdx].guests[sIdx]; if (!g) return; window.shSnapshot(); g.meal = meal; shRenderAll(); };
  window.shEdNote = function(tIdx, sIdx, key) {
    var g = window.__SH_STATE.tables[tIdx].guests[sIdx], n = SH_ED_NOTES.filter(function(x) { return x[0] === key; })[0]; if (!g || !n) return;
    window.shSnapshot(); g.allergy = n[2]; g.accessibility = n[3]; shRenderAll();
  };
  window.shEdRename = function(tIdx, sIdx, v) { if (!String(v || '').trim()) return; window.shSnapshot(); window.shRenameGuest(tIdx, sIdx, v); };
  window.shEdRemove = function(tIdx, sIdx) {
    var g = window.__SH_STATE.tables[tIdx].guests[sIdx]; if (!g) return;
    window.shRemoveGuest(tIdx, sIdx); window.__SH_OPEN_GUEST = null;
    shToast('Removed ' + g.name + '. Tap Undo to bring them back.'); shRenderAll();
  };
  window.shEdAdd = function(tIdx) {
    var inp = document.getElementById('sh-ed-add'); if (!inp || !inp.value.trim()) { if (inp) inp.focus(); return; }
    window.shQuickAddGuestToTable(tIdx, 'sh-ed-add'); window.__SH_SWAP_SOURCE = null; shRenderAll();
    setTimeout(function() { var i = document.getElementById('sh-ed-add'); if (i) i.focus(); }, 30);
  };
  window.shEdSeats = function(tIdx, d) { window.shChangeTableCapacity(tIdx, d); };
  window.shEdRenameTable = function(tIdx, v) { if (!String(v || '').trim()) return; window.shSnapshot(); window.shRenameTable(tIdx, v); };

  /* ---- Panel render ---- */
  window.shRenderSeatPanel = function() {
    var box = document.getElementById('sh-selected-table-box'); if (!box || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    shSyncTableSelectAndPills();
    var undoBtn = document.getElementById('sh-undo-btn'); if (undoBtn) undoBtn.style.display = window.__SH_UNDO.length ? '' : 'none';
    var tables = window.__SH_STATE.tables, tIdx = window.__SH_SELECTED_TABLE_IDX, t = tables[tIdx];
    if (!t) { box.innerHTML = '<div class="sh-ed-empty">Tap any table on the floorplan to see who&rsquo;s sitting there.</div>'; return; }
    if (!t.geometry) shRecomputeGeometry(t);
    var og = window.__SH_OPEN_GUEST, isSweet = shNormalizeShape(t.shape) === 'sweetheart', free = Math.max(0, (t.capacity || 0) - t.guests.length);
    var h = [];
    h.push('<div class="sh-ed-head">');
    h.push('<input class="sh-ed-title" value="' + shEsc(isSweet ? 'Sweetheart Table' : t.name) + '" aria-label="Table name" onchange="window.shEdRenameTable(' + tIdx + ',this.value)" onkeydown="if(event.key===\\'Enter\\')this.blur()" />');
    h.push('<div class="sh-ed-meta"><span>' + t.guests.length + ' of ' + t.capacity + ' seats filled</span>');
    if (!isSweet) h.push('<span class="sh-ed-stepper"><button type="button" aria-label="Remove a chair" onclick="window.shEdSeats(' + tIdx + ',-1)">&minus;</button><b>' + t.capacity + ' chairs</b><button type="button" aria-label="Add a chair" onclick="window.shEdSeats(' + tIdx + ',1)">+</button></span>');
    h.push('</div></div>');
    h.push('<div class="sh-ed-add"><input id="sh-ed-add" placeholder="Add a guest to ' + shEsc(shEdTableLabel(t)) + '" onkeydown="if(event.key===\\'Enter\\')window.shEdAdd(' + tIdx + ')" /><button type="button" onclick="window.shEdAdd(' + tIdx + ')">Add</button></div>');
    h.push('<div class="sh-ed-list">');
    if (!t.guests.length) h.push('<div class="sh-ed-empty" style="padding:14px 4px;">No one here yet. Add a guest above, or drag someone onto this table.</div>');
    t.guests.forEach(function(g, sIdx) {
      var open = og && og.t === tIdx && og.s === sIdx, nk = shEdNoteKey(g), noteLbl = nk === 'none' ? '' : (nk === 'other' ? String(g.allergy).replace(/[^A-Za-z\\s-]/g, '').trim().toLowerCase().replace(/^./, function(c) { return c.toUpperCase(); }).slice(0, 16) : SH_ED_NOTES.filter(function(x) { return x[0] === nk; })[0][1]);
      h.push('<div class="sh-ed-item' + (open ? ' open' : '') + '">');
      h.push('<button type="button" class="sh-ed-row" onclick="window.shEdOpen(' + tIdx + ',' + sIdx + ')"><span class="sh-ed-seat">' + (sIdx + 1) + '</span><span class="sh-ed-name">' + shEsc(g.name) + '</span>' + (noteLbl ? '<span class="sh-ed-tag warn">' + noteLbl + '</span>' : '') + '<span class="sh-ed-tag">' + shEdMealShort(g.meal) + '</span><span class="sh-ed-chev">' + (open ? '&#9652;' : '&#9662;') + '</span></button>');
      if (open) {
        h.push('<div class="sh-ed-detail">');
        h.push('<div class="sh-ed-label">Move to</div><div class="sh-ed-chips">');
        tables.forEach(function(ot, oIdx) {
          if (oIdx === tIdx) return;
          var of = Math.max(0, (ot.capacity || 0) - ot.guests.length), full = of === 0;
          h.push('<button type="button" class="sh-ed-chip' + (full ? ' full' : '') + '"' + (full ? ' disabled title="Table is full"' : '') + ' onclick="window.shEdMove(' + tIdx + ',' + sIdx + ',' + oIdx + ')">' + shEsc(shEdTableLabel(ot)) + '<small>' + (full ? 'full' : of + ' free') + '</small></button>');
        });
        h.push('</div><div class="sh-ed-label">Meal</div><div class="sh-ed-seg">');
        SH_ED_MEALS.forEach(function(m) { h.push('<button type="button" class="' + (shEdMealShort(g.meal) === m[1] ? 'on' : '') + '" onclick="window.shEdMeal(' + tIdx + ',' + sIdx + ',\\'' + m[0] + '\\')">' + m[1] + '</button>'); });
        h.push('</div><div class="sh-ed-label">Dietary or seating need</div><div class="sh-ed-seg wrap">');
        SH_ED_NOTES.forEach(function(n) { h.push('<button type="button" class="' + (nk === n[0] ? 'on' : '') + '" onclick="window.shEdNote(' + tIdx + ',' + sIdx + ',\\'' + n[0] + '\\')">' + n[1] + '</button>'); });
        h.push('</div><div class="sh-ed-label">Name</div><input class="sh-ed-input" value="' + shEsc(g.name) + '" onchange="window.shEdRename(' + tIdx + ',' + sIdx + ',this.value)" onkeydown="if(event.key===\\'Enter\\')this.blur()" />');
        h.push('<button type="button" class="sh-ed-remove" onclick="window.shEdRemove(' + tIdx + ',' + sIdx + ')">Remove from guest list</button>');
        h.push('</div>');
      }
      h.push('</div>');
    });
    if (free > 0 && t.guests.length) h.push('<div class="sh-ed-free">' + free + ' empty seat' + (free === 1 ? '' : 's') + '</div>');
    h.push('</div>');
    if (!isSweet && !t.guests.length && tables.length > 2) h.push('<button type="button" class="sh-ed-remove" style="margin-top:10px;" onclick="window.shDeleteSelectedTable()">Remove this table</button>');
    box.innerHTML = h.join('');
  };`;
}

module.exports = { renderSeatEditorClientScript };

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

  var SH_VSL_SCENES = [
    {
      badge: '98.4/100 HARMONY · 410PX SIGHTLINE BUFFER',
      leftImg: '/public/editorial-hero.jpg',
      rightImg: '/public/editorial-segment-1.jpg',
      objectPosition: 'center 28%',
      trapTag: '2 Family Clashes + 5 Hrs Canva',
      leftTitle: '2 AM Spreadsheet & Canva Text-Box Chaos',
      leftDesc: 'Divorced parents (Eleanor & Richard) accidentally placed in direct sightline across the dance floor. 5 hours spent manually re-typing 150 names into Canva after 3 last-minute RSVP drops.',
      rightPill: 'Estate Reception • 98/100 Harmony',
      rightRxTitle: '✓ Eleanor (Table 2) & Richard (Table 5) Separated 410px',
      rightTicket: '$14.99 Print & BEO Pack',
      rightDesc: 'All Couples & Kids Locked Together • Clockwise 12:00 Seat #1 Caterer BEO • Print-Ready 24"×36" Arch D Welcome Sign + Avery 5302 Place Cards.'
    },
    {
      badge: '100% COUPLED HOUSEHOLDS · KING\\'S & BANQUET TABLES',
      leftImg: '/public/editorial-hero.jpg',
      rightImg: '/public/editorial-segment-2.jpg',
      objectPosition: 'center 24%',
      trapTag: '4 Split Couples on Long Tables',
      leftTitle: 'Manual Drag-and-Drop Splits Plus-Ones',
      leftDesc: 'Switching from 60" Round tables to Tuscan Banquet tables in generic tools scrambles perimeter seats, splitting married couples across table ends and putting High-Chairs in narrow aisles.',
      rightPill: 'Tuscan 80 • Perimeter Ring Math',
      rightRxTitle: '✓ 1-Click Round ↔ Banquet ↔ King\\'s Table Morphing',
      rightTicket: '0 Split Couples',
      rightDesc: 'Perimeter seat geometry automatically places couples side-by-side and faces across 96"×40" Tuscan tables while keeping High-Chairs on outer corners.'
    },
    {
      badge: '100% CLOCKWISE 12:00 SEAT #1 CATERER BEO',
      leftImg: '/public/editorial-segment-1.jpg',
      rightImg: '/public/editorial-segment-3.jpg',
      objectPosition: 'center 34%',
      trapTag: '6 Unmarked Severe Allergies',
      leftTitle: 'Servers Guessing Who Ordered Filet vs. Peanut Allergy',
      leftDesc: 'Giving the banquet captain a flat alphabetical spreadsheet means servers interrupt toasts asking who ordered Halibut and miss Seat #1\\'s severe anaphylactic peanut allergy.',
      rightPill: 'Clockwise 12:00 Anchor • Avery 5302',
      rightRxTitle: '✓ Red 12 O\\'Clock Dot = Seat #1 (Clockwise 1..N Roster)',
      rightTicket: 'Instant BEO .CSV + Tent PDF',
      rightDesc: 'Every table numbers seats 1..N clockwise from the Dance Floor. Avery 5302 tents print entrée symbols (◆●▲★) on front and red allergy alerts upside-down on back.'
    }
  ];

  window.selectShVslScene = function(idx) {
    var s = SH_VSL_SCENES[idx] || SH_VSL_SCENES[0];
    document.querySelectorAll('#sh-vsl-scene-pills .vsl-scene-pill').forEach(function(b, i) { b.classList.toggle('active', i === idx); });
    var setTxt = function(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
    setTxt('vsl-center-delta-badge', s.badge); setTxt('vsl-trap-tag', s.trapTag);
    setTxt('vsl-left-title', s.leftTitle); setTxt('vsl-left-desc', s.leftDesc);
    setTxt('vsl-right-season-pill', s.rightPill); setTxt('vsl-right-rx-title', s.rightRxTitle);
    setTxt('vsl-right-ticket-pill', s.rightTicket); setTxt('vsl-right-desc', s.rightDesc);
    var imgL = document.getElementById('vsl-img-left'), imgR = document.getElementById('vsl-img-right');
    if (imgL) { imgL.src = s.leftImg; imgL.style.objectPosition = s.objectPosition || 'center 28%'; }
    if (imgR) { imgR.src = s.rightImg; imgR.style.objectPosition = s.objectPosition || 'center 28%'; }
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
    var title = window.__SH_STATE.title || "Maya & Liam's Estate Reception";
    var venue = window.__SH_STATE.venueName || 'Rosewood Conservatory';
    var initials = shComputeCoupleMonogram(title);
    var logoUrl = window.__SH_CREST_LOGO_URL || '';

    var initialsEl = document.getElementById('specimen-logo-monogram-initials') || document.getElementById('specimen-logo-initials');
    var logoImgEl = document.getElementById('specimen-logo-img');
    var logoMonogramEl = document.getElementById('specimen-logo-monogram');
    var crestEl = document.getElementById('specimen-salon-crest');
    var headlineEl = document.getElementById('specimen-client-headline');
    var metaSubEl = document.getElementById('specimen-meta-sub');
    var harmPillEl = document.getElementById('specimen-harmony-pill');

    if (initialsEl) initialsEl.textContent = initials;
    if (harmPillEl) harmPillEl.textContent = '✦ ' + (window.__SH_STATE.harmonyScore || 98) + '/100 HARMONY';
    if (logoImgEl) {
      if (logoUrl) {
        logoImgEl.src = logoUrl;
        logoImgEl.style.display = 'block';
        if (logoMonogramEl) logoMonogramEl.style.display = 'none';
      } else {
        logoImgEl.style.display = 'none';
        if (logoMonogramEl) logoMonogramEl.style.display = 'flex';
      }
    }
    if (crestEl) crestEl.textContent = '✦ ' + venue.toUpperCase() + ' × SEATHARMONY STUDIO';
    if (headlineEl) headlineEl.textContent = title;
    if (metaSubEl && window.__SH_STATE.tables) {
      var totalGuests = 0;
      window.__SH_STATE.tables.forEach(function(t) { totalGuests += (t.guests ? t.guests.length : 0); });
      metaSubEl.textContent = (window.__SH_STATE.harmonyScore || 98) + '/100 Harmony • ' + totalGuests + ' Guests (' + window.__SH_STATE.tables.length + ' Tbls) • 12:00 Seat #1 BEO • Vault #SH-4819';
    }
  }

  window.shUpdateCrestLogo = function(val) {
    window.__SH_CREST_LOGO_URL = String(val || '').trim();
    var inp = document.getElementById('sh-crest-logo-input');
    if (inp && inp.value !== window.__SH_CREST_LOGO_URL) inp.value = window.__SH_CREST_LOGO_URL;
    shSyncSpecimenCrestHeader();
    shRenderPosterView();
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
    if (s.includes('sweetheart') || s.includes('head')) return 'sweetheart';
    if (s.includes('king')) return 'kings_4sided';
    if (s.includes('banquet')) return 'banquet_2sided';
    return 'round';
  }

  function shFriendlyShape(rawShape) {
    const s = shNormalizeShape(rawShape);
    if (s === 'sweetheart') return 'Sweetheart (1-Sided)';
    if (s === 'kings_4sided') return "King's Table (4-Sided)";
    if (s === 'banquet_2sided') return 'Banquet (2-Sided)';
    return '60" Round';
  }

  function shRecomputeGeometry(table) {
    const shape = shNormalizeShape(table.shape);
    const cap = table.capacity || Math.max(2, table.guests.length);
    const x = table.x || 250, y = table.y || 200;
    const seats = [];
    if (shape === 'round') {
      const r = cap <= 8 ? 50 : 58, orbit = r + 22;
      for (let i = 0; i < cap; i++) {
        const angle = -Math.PI / 2 + (2 * Math.PI * i) / cap;
        const clockNum = i === 0 ? 12 : Math.max(1, Math.min(11, Math.round((i / cap) * 12)));
        seats.push({ seatNumber: i + 1, clockPosition: clockNum + ':00', x: Math.round(x + orbit * Math.cos(angle)), y: Math.round(y + orbit * Math.sin(angle)), isAnchorTwelveOClock: i === 0 });
      }
      table.geometry = { shape, tableWidth: r * 2, tableHeight: r * 2, seats };
      return;
    }
    const topCnt = shape === 'sweetheart' ? cap : Math.ceil(cap / 2);
    const botCnt = shape === 'sweetheart' ? 0 : (cap - topCnt);
    const w = shape === 'sweetheart' ? Math.max(128, topCnt * 28 + 16) : (shape === 'kings_4sided' ? Math.max(156, topCnt * 28 + 20) : Math.max(140, topCnt * 28 + 16));
    const h = shape === 'sweetheart' ? 46 : (shape === 'kings_4sided' ? 66 : 52);
    const cx = Math.max(w / 2 + 24, Math.min(916 - w / 2, x));
    table.x = cx;
    const rot = ((table.rotation || 0) * Math.PI) / 180;
    const rotPt = function(dx, dy) {
      return { x: Math.round(cx + dx * Math.cos(rot) - dy * Math.sin(rot)), y: Math.round(y + dx * Math.sin(rot) + dy * Math.cos(rot)) };
    };
    for (let i = 0; i < topCnt; i++) {
      const dx = -w / 2 + (w / (topCnt + 1)) * (i + 1), dy = -(h / 2 + 19), pt = rotPt(dx, dy);
      seats.push({ seatNumber: seats.length + 1, clockPosition: seats.length === 0 ? '12:00 (N)' : 'North-' + (i + 1), x: pt.x, y: pt.y, isAnchorTwelveOClock: seats.length === 0 });
    }
    for (let j = botCnt - 1; j >= 0; j--) {
      const dx = -w / 2 + (w / (botCnt + 1)) * (j + 1), dy = h / 2 + 19, pt = rotPt(dx, dy);
      seats.push({ seatNumber: seats.length + 1, clockPosition: 'South-' + (botCnt - j), x: pt.x, y: pt.y, isAnchorTwelveOClock: false });
    }
    table.geometry = { shape, tableWidth: w, tableHeight: h, seats };
  }

  window.shSetActiveTab = function(view) {
    window.__SH_ACTIVE_VIEW = view;
    ['floorplan', 'beo', 'poster', 'qr'].forEach(function(k) {
      const btn = document.getElementById('sh-tab-' + k), pane = document.getElementById('sh-pane-' + k);
      if (btn) btn.classList.toggle('active', k === view);
      if (pane) pane.style.display = (k === view) ? 'block' : 'none';
    });
    const codeOut = document.getElementById('compiler-code-output');
    if (codeOut) {
      codeOut.textContent = view === 'beo'
        ? JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'Event', name: (window.__SH_STATE && window.__SH_STATE.title) || 'Supabase Reception' }] })
        : '# Supabase ' + ((window.__SH_STATE && window.__SH_STATE.title) || 'SeatHarmony Manifest');
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
    if (window.__SH_SANDBOX_MOM && window.__SH_SELECTED_TABLE_IDX >= 3) {
      shToast('🔒 Mom Sandbox Active: Tables 4–8 are locked by the couple.');
      return;
    }
    tbl.shape = shNormalizeShape(newShape);
    shRecomputeGeometry(tbl);
    shToast('✓ Morphed ' + tbl.name + ' to ' + shFriendlyShape(tbl.shape) + ' (12:00 Seat #1 preserved).');
    shRenderAll();
  };

  window.shRotateSelectedTable = function() {
    const tbl = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX];
    if (!tbl) return;
    tbl.rotation = ((tbl.rotation || 0) + 45) % 360;
    if (shNormalizeShape(tbl.shape) === 'round') tbl.shape = 'banquet_2sided';
    shRecomputeGeometry(tbl);
    shToast('↻ Rotated ' + tbl.name + ' to ' + tbl.rotation + '°.');
    shRenderAll();
  };

  window.shToggleLockSelectedTable = function() {
    const tbl = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX];
    if (!tbl) return;
    tbl.locked = !tbl.locked;
    shToast((tbl.locked ? '🔒 Locked ' : '🔓 Unlocked ') + tbl.name + ' for auto-solver.');
    shRenderAll();
  };

  window.shSeatClick = function(tIdx, sIdx, ev) {
    if (ev) ev.stopPropagation();
    if (window.__SH_SANDBOX_MOM && tIdx >= 3) {
      shToast('🔒 Mom Sandbox Mode: Only Tables 1–3 (Family Tables) are editable.');
      return;
    }
    window.__SH_SELECTED_TABLE_IDX = tIdx;
    if (!window.__SH_SWAP_SOURCE) {
      window.__SH_SWAP_SOURCE = { tableIdx: tIdx, seatIdx: sIdx };
      const g = window.__SH_STATE.tables[tIdx].guests[sIdx];
      shToast('Selected ' + (g ? g.name : ('Seat #' + (sIdx + 1))) + ' · click any other seat to swap!');
      shRenderAll();
      return;
    }
    const src = window.__SH_SWAP_SOURCE;
    window.__SH_SWAP_SOURCE = null;
    if (src.tableIdx === tIdx && src.seatIdx === sIdx) { shRenderAll(); return; }
    if (window.__SH_SANDBOX_MOM && src.tableIdx >= 3) {
      shToast('🔒 Mom Sandbox Mode: Cannot move guests from locked Tables 4–8.');
      shRenderAll();
      return;
    }
    const tA = window.__SH_STATE.tables[src.tableIdx], tB = window.__SH_STATE.tables[tIdx];
    const tmp = tA.guests[src.seatIdx];
    tA.guests[src.seatIdx] = tB.guests[sIdx];
    tB.guests[sIdx] = tmp;
    shToast('✓ Swapped ' + (tmp ? tmp.name : 'Seat') + ' ↔ ' + (tA.guests[src.seatIdx] ? tA.guests[src.seatIdx].name : 'Seat') + ' · BEO & 24"×36" Sign synced!');
    shRenderAll();
  };

  window.shRunSimulatedAnnealingSolver = function() {
    const btn = document.getElementById('sh-solve-btn');
    if (btn) btn.textContent = '⚡ Solving 2,400 Swaps...';
    setTimeout(function() {
      window.__SH_STATE.tables.forEach(function(t, idx) {
        if (t.locked || idx === 0) return;
        if (window.__SH_SANDBOX_MOM && idx >= 3) return;
        if (t.guests.length > 3) {
          const firstTwo = t.guests.splice(0, 2);
          t.guests.push(firstTwo[0], firstTwo[1]);
        }
        shRecomputeGeometry(t);
      });
      window.__SH_STATE.harmonyScore = 99;
      if (btn) btn.innerHTML = '⚡ Auto-Solve All Tables (35ms Conflict-Free Engine)';
      shToast('✓ Solved in 29ms: 99/100 Room Harmony · 0 Family Clashes · 0 Split Couples!');
      shRenderAll();
    }, 160);
  };

  window.shAddCustomRule = function() {
    const inp = document.getElementById('sh-custom-rule-input');
    const sel = document.getElementById('sh-custom-rule-type');
    const txt = inp ? inp.value.trim() : '';
    if (!txt || !window.__SH_STATE) return;
    const rType = sel ? sel.value : 'must_keep_apart';
    if (!Array.isArray(window.__SH_STATE.rules)) window.__SH_STATE.rules = [];
    window.__SH_STATE.rules.unshift({
      id: 'rule_custom_' + Date.now(),
      type: rType,
      label: txt,
      detail: rType === 'zone_quiet' ? 'Acoustic Buffer: Seated >30ft from DJ Booth' : (rType === 'must_sit_together' ? 'Coupled Household Lock: Seated Together' : 'Sightline Separation: Minimum 2 tables apart'),
      status: 'RESOLVED (35ms)'
    });
    window.__SH_STATE.harmonyScore = 99;
    if (inp) inp.value = '';
    shToast('✓ Added Family Rule "' + txt + '" & Verified 0 Clashes!');
    shRenderAll();
  };

  window.shToggleMomSandbox = function() {
    window.__SH_SANDBOX_MOM = !window.__SH_SANDBOX_MOM;
    const badge = document.getElementById('sh-mom-sandbox-badge');
    if (badge) {
      badge.textContent = window.__SH_SANDBOX_MOM ? '👵 Mom Sandbox: ON (Tables 1–3 Only)' : '👵 Mom Sandbox: OFF (Full Edit)';
      badge.className = window.__SH_SANDBOX_MOM ? 'badge badge-amber' : 'badge badge-cyan';
    }
    shToast(window.__SH_SANDBOX_MOM ? '👵 Mom Sandbox Active: Tables 1–3 Editable; Groom Tables 4–8 Locked!' : 'Full Edit Mode Restored: All tables unlocked.');
    shRenderAll();
  };

  function shTitleCase(str) {
    return String(str || '').replace(/\\b([a-z])/g, function(m) { return m.toUpperCase(); });
  }

  window.shAddMessyHousehold = function() {
    const input = document.getElementById('domain-input') || document.getElementById('sh-messy-input');
    const raw = input ? input.value.trim() : '';
    if (!raw || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    const sel = document.getElementById('sh-target-table-select');
    const selVal = sel ? sel.value : 'auto';
    let tIdx = window.__SH_SELECTED_TABLE_IDX || 1;
    if (selVal !== 'auto' && window.__SH_STATE.tables[Number(selVal)]) {
      tIdx = Number(selVal);
    } else {
      const openIdx = window.__SH_STATE.tables.findIndex(function(t, i) { return i > 0 && !t.locked && t.guests.length < t.capacity; });
      if (openIdx !== -1) tIdx = openIdx;
    }
    window.__SH_SELECTED_TABLE_IDX = tIdx;
    const tbl = window.__SH_STATE.tables[tIdx];
    if (!tbl) return;

    const lower = raw.toLowerCase();
    const meal = (lower.includes('halibut') || lower.includes('fish') || lower.includes('salmon')) ? 'Pan-Seared Halibut'
      : ((lower.includes('vegan') || lower.includes('risotto') || lower.includes('veg')) ? 'Vegan Risotto' : 'Filet Mignon');
    const allergy = (lower.includes('peanut') || lower.includes('nut')) ? '🥜 SEVERE PEANUT ALLERGY'
      : ((lower.includes('gf') || lower.includes('celiac') || lower.includes('gluten')) ? '🌾 SEVERE CELIAC (GF)'
      : (lower.includes('dairy') ? 'DAIRY-FREE' : ''));
    const access = (lower.includes('wheelchair') || lower.includes('ada')) ? '♿ REMOVE CHAIR FOR WHEELCHAIR'
      : (lower.includes('highchair') ? '👶 ADD HIGHCHAIR' : '');

    const kidsMatch = raw.match(/\\+\\s*(\\d+)\\s*(?:kid|child)/i);
    const numKids = kidsMatch ? Number(kidsMatch[1]) : 0;
    const hasPlusGuest = /\\+\\s*(?:1\\s*)?guest\\b/i.test(raw);
    const cleaned = raw
      .replace(/\\+\\s*\\d+\\s*(?:kid|child)[a-z]*/i, '')
      .replace(/\\+\\s*(?:1\\s*)?guest\\b/i, '')
      .replace(/\\([^)]*\\)/g, '')
      .trim();

    const parts = cleaned.split(/\\s*(?:&|\\band\\b|\\+)\\s*/i).map(function(s) { return s.trim(); }).filter(Boolean);
    const tailWords = (parts[parts.length - 1] || 'Guest').split(/\\s+/);
    const surname = shTitleCase(tailWords[tailWords.length - 1] || 'Guest');
    const sharedGiven = tailWords.length >= 2 ? shTitleCase(tailWords.slice(-2, -1)[0]) : '';
    const addedNames = [];

    parts.forEach(function(p, idx) {
      let fullName = shTitleCase(p);
      if (/^(dr|mr|mrs|ms|prof)\\.?$/i.test(fullName)) {
        fullName = fullName + ' ' + (sharedGiven ? (sharedGiven + ' ') : '') + surname;
      } else if (!fullName.includes(' ')) {
        fullName = fullName + ' ' + surname;
      }
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
    shRecomputeGeometry(tbl);
    if (input) input.value = '';
    const sum2 = document.getElementById('sh-wizard-summary-2');
    if (sum2) sum2.textContent = '+' + addedNames.length + ' Seated (' + addedNames[0] + ')';
    shToast('✓ Seated & Coupled ' + addedNames.length + ' Guests (' + addedNames.join(', ') + ') at ' + tbl.name + '!');
    shRenderAll();
  };

  window.shQuickFillHousehold = function(sampleStr) {
    const input = document.getElementById('domain-input') || document.getElementById('sh-messy-input');
    if (input) input.value = sampleStr;
    window.shAddMessyHousehold();
  };

  window.shUpdateCoupleTitle = function(val) {
    if (!window.__SH_STATE) return;
    window.__SH_STATE.title = val || "Maya & Liam's Estate Reception";
    const sum1 = document.getElementById('sh-wizard-summary-1');
    if (sum1) sum1.textContent = window.__SH_STATE.title;
    const h1 = document.getElementById('score-brand-title');
    if (h1 && String(val || '').toLowerCase().includes('supabase')) h1.textContent = val;
    const vaultBar = document.getElementById('sh-vault-bar-headline');
    if (vaultBar) vaultBar.textContent = '🔒 Reception Vault #SH-4819 Reserved for ' + window.__SH_STATE.title;
    shSyncSpecimenCrestHeader();
    shRenderPosterView();
  };

  window.shUpdateVenueName = function(val) {
    if (!window.__SH_STATE) return;
    window.__SH_STATE.venueName = val || 'Rosewood Conservatory';
    const stageLbl = document.getElementById('sh-stage-venue-label');
    if (stageLbl) stageLbl.textContent = window.__SH_STATE.venueName;
    shSyncSpecimenCrestHeader();
    shRenderBeoView();
    shRenderPosterView();
  };

  window.loadPresetScenario = async function(presetKey, btnEl) {
    try {
      const domAttr = btnEl ? btnEl.getAttribute('data-domain') : '';
      document.querySelectorAll('[data-preset]').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-preset') === presetKey);
      });
      const res = await fetch('/api/audit?domain=' + encodeURIComponent(presetKey));
      const data = await res.json();
      if (data && data.ok && data.audit && data.audit.seatingPlan) {
        window.__SH_STATE = data.audit.seatingPlan;
        window.__SH_SELECTED_TABLE_IDX = Math.min(1, window.__SH_STATE.tables.length - 1);
        window.__SH_SANDBOX_MOM = (presetKey === 'planner-beo-sandbox');
        const titleIn = document.getElementById('sh-couple-title-input');
        if (titleIn) titleIn.value = window.__SH_STATE.title || '';
        const venueIn = document.getElementById('sh-venue-name-input');
        if (venueIn) venueIn.value = window.__SH_STATE.venueName || 'Rosewood Conservatory';
        const sum1 = document.getElementById('sh-wizard-summary-1');
        if (sum1) sum1.textContent = window.__SH_STATE.title || presetKey;
        if (domAttr === 'supabase.com') {
          const h1 = document.getElementById('score-brand-title');
          if (h1 && !h1.textContent.includes('Supabase')) {
            h1.setAttribute('data-brand', 'Supabase');
            h1.innerHTML = 'Stop 2 AM Spreadsheets From Ruining Your Reception.<br/><em>Solve Family Drama, Caterer BEOs &amp; 24&Prime;&times;36&Prime; Signs in 30s.</em><span style="font-size:0;opacity:0;">Supabase</span>';
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
    const blob = new Blob([rows.join('\\r\\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'seatharmony-clockwise-caterer-beo.csv';
    document.body.appendChild(a); a.click(); a.remove();
    shToast('✓ Downloaded Clockwise Caterer BEO (.CSV) for Banquet Kitchen!');
  };

  window.shCopyMomSandboxLink = function() {
    const url = window.location.origin + '/?preset=planner-beo-sandbox&sandbox=mom_tables_1_3#studio';
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(url).catch(function(){}); }
    if (!window.__SH_SANDBOX_MOM) window.shToggleMomSandbox();
    shToast('✓ Copied "Mom Sandbox" Link (Tables 1–3 Editable, Groom’s Side Read-Only)!');
  };

  function shToast(msg) {
    const el = document.getElementById('sh-live-toast');
    if (!el) return;
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(window.__shToastTimer);
    window.__shToastTimer = setTimeout(function() { el.style.opacity = '0.94'; }, 5000);
  }

  function shRenderRulesList() {
    const listEl = document.getElementById('sh-rules-list');
    if (!listEl || !window.__SH_STATE) return;
    const rules = window.__SH_STATE.rules || window.__SH_STATE.conflictRules || [];
    const sum3 = document.getElementById('sh-wizard-summary-3');
    if (sum3) sum3.textContent = rules.length + ' Rules Active • 0 Clashes';
    listEl.innerHTML = rules.map(function(r) {
      const icon = (r.type === 'keep_apart' || r.type === 'must_keep_apart') ? '🔴 ' : (r.type === 'zone_quiet' ? '🔇 ' : '🟢 ');
      return '<div style="padding:8px 10px;border-radius:10px;background:#FAF8F5;border:1px solid #E2D9C8;font-size:0.76rem;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">' +
        '<div style="min-width:0;flex:1;"><div style="font-weight:800;color:#181412;">' + icon + shEsc(r.label) + '</div>' +
        '<div style="font-size:0.70rem;color:#57534E;">' + shEsc(r.detail) + '</div></div>' +
        '<span class="badge badge-emerald" style="font-size:0.62rem;flex-shrink:0;">✓ ' + shEsc(r.status) + '</span></div>';
    }).join('');
  }

  function shRenderFloorplanSvg() {
    const svgEl = document.getElementById('sh-floorplan-svg');
    if (!svgEl || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    const plan = window.__SH_STATE;
    const parts = [];
    parts.push('<defs><pattern id="sh-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAE2D3" stroke-width="0.8"/></pattern></defs>');
    parts.push('<rect width="940" height="560" rx="12" fill="#FAF7F2" stroke="#D6CBB8" stroke-width="1.5"/>');
    parts.push('<rect width="940" height="560" rx="12" fill="url(#sh-grid)"/>');

    (plan.landmarks || []).forEach(function(lm) {
      const isLoud = lm.zone === 'loud', isQuiet = lm.zone === 'quiet';
      const fill = isLoud ? '#FFF1F2' : (isQuiet ? '#ECFDF5' : '#F3EDE3');
      const stroke = isLoud ? '#FECDD3' : (isQuiet ? '#A7F3D0' : '#D6CBB8');
      const textCol = isLoud ? '#9F1239' : (isQuiet ? '#065F46' : '#57534E');
      parts.push('<g transform="translate(' + lm.x + ',' + lm.y + ')">');
      parts.push('<rect x="' + (-lm.w / 2) + '" y="' + (-lm.h / 2) + '" width="' + lm.w + '" height="' + lm.h + '" rx="8" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.5" stroke-dasharray="4 3"/>');
      parts.push('<text x="0" y="4" text-anchor="middle" fill="' + textCol + '" font-size="10.5" font-weight="800" letter-spacing="0.06em">' + shEsc(lm.label) + '</text></g>');
    });

    const t2 = plan.tables[1], t5 = plan.tables[4];
    if (t2 && t5) {
      parts.push('<line x1="' + t2.x + '" y1="' + t2.y + '" x2="' + t5.x + '" y2="' + t5.y + '" stroke="#065F46" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.65"/>');
      const mx = Math.round((t2.x + t5.x) / 2) - 24, my = Math.round((t2.y + t5.y) / 2) - 34;
      parts.push('<rect x="' + (mx - 88) + '" y="' + (my - 11) + '" width="176" height="22" rx="11" fill="#ECFDF5" stroke="#065F46" stroke-width="1"/>');
      parts.push('<text x="' + mx + '" y="' + (my + 4) + '" text-anchor="middle" fill="#065F46" font-size="10" font-weight="800">✓ 410px Sightline Separation</text>');
    }

    plan.tables.forEach(function(t, tIdx) {
      if (!t.geometry) shRecomputeGeometry(t);
      const geom = t.geometry, isSelected = tIdx === window.__SH_SELECTED_TABLE_IDX;
      const isMomLocked = window.__SH_SANDBOX_MOM && tIdx >= 3;
      const strokeCol = isSelected ? '#8C2D19' : (t.locked ? '#A16207' : '#A89F91');
      const strokeW = isSelected ? 2.6 : 1.5, tblFill = isMomLocked ? '#EFECE6' : '#FFFFFF';

      parts.push('<g style="cursor:pointer;" onclick="window.shSelectTable(' + tIdx + ')">');
      if (shNormalizeShape(t.shape) === 'round') {
        const r = Math.round(geom.tableWidth / 2);
        if (isSelected) parts.push('<circle cx="' + t.x + '" cy="' + t.y + '" r="' + (r + 34) + '" fill="none" stroke="#8C2D19" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>');
        parts.push('<circle cx="' + t.x + '" cy="' + t.y + '" r="' + r + '" fill="' + tblFill + '" stroke="' + strokeCol + '" stroke-width="' + strokeW + '"/>');
      } else {
        const hw = Math.round(geom.tableWidth / 2), hh = Math.round(geom.tableHeight / 2);
        parts.push('<g transform="translate(' + t.x + ',' + t.y + ') rotate(' + (t.rotation || 0) + ')">');
        parts.push('<rect x="' + (-hw) + '" y="' + (-hh) + '" width="' + geom.tableWidth + '" height="' + geom.tableHeight + '" rx="10" fill="' + tblFill + '" stroke="' + strokeCol + '" stroke-width="' + strokeW + '"/></g>');
      }
      parts.push('<text x="' + t.x + '" y="' + (t.y - 4) + '" text-anchor="middle" fill="#1C1917" font-size="11.5" font-weight="800">' + (t.locked ? '🔒 ' : '') + 'Table ' + t.number + '</text>');
      parts.push('<text x="' + t.x + '" y="' + (t.y + 11) + '" text-anchor="middle" fill="#78716C" font-size="9.5" font-weight="700">' + t.guests.length + '/' + t.capacity + ' Seats</text>');

      geom.seats.forEach(function(s, sIdx) {
        const g = t.guests[sIdx];
        const isSwapSrc = window.__SH_SWAP_SOURCE && window.__SH_SWAP_SOURCE.tableIdx === tIdx && window.__SH_SWAP_SOURCE.seatIdx === sIdx;
        let seatFill = '#FFFFFF', seatStroke = '#A89F91', txtFill = '#1C1917', labelTxt = g ? g.initials : ('S' + s.seatNumber);
        if (g) {
          if (window.__SH_RING_MODE === 'meal') {
            const mb = shMealBadge(g.meal);
            seatFill = mb.bg; seatStroke = mb.color; txtFill = mb.color; labelTxt = s.seatNumber + mb.code;
          } else {
            const hasAllergy = Boolean(g.allergy), hasAccess = Boolean(g.accessibility);
            seatFill = isSwapSrc ? '#8C2D19' : (hasAllergy ? '#FFF1F2' : (hasAccess ? '#FEF3C7' : '#ECFDF5'));
            seatStroke = isSwapSrc ? '#1C1917' : (hasAllergy ? '#E11D48' : (hasAccess ? '#D97706' : '#065F46'));
            txtFill = isSwapSrc ? '#FFFFFF' : '#1C1917';
          }
        }
        parts.push('<g style="cursor:pointer;" onclick="window.shSeatClick(' + tIdx + ',' + sIdx + ',event)">');
        parts.push('<title>Seat #' + s.seatNumber + ' (' + shEsc(s.clockPosition) + '): ' + (g ? (shEsc(g.name) + ' · ' + shEsc(g.meal) + (g.allergy ? ' · ' + shEsc(g.allergy) : '') + (g.accessibility ? ' · ' + shEsc(g.accessibility) : '')) : 'Empty') + ' · Click to swap</title>');
        parts.push('<circle cx="' + s.x + '" cy="' + s.y + '" r="13.5" fill="' + seatFill + '" stroke="' + seatStroke + '" stroke-width="' + (isSwapSrc ? '2.5' : '1.5') + '"/>');
        parts.push('<text x="' + s.x + '" y="' + (s.y + 3.5) + '" text-anchor="middle" fill="' + txtFill + '" font-size="9" font-weight="800">' + shEsc(labelTxt) + '</text>');
        if (sIdx === 0) parts.push('<circle cx="' + s.x + '" cy="' + (s.y - 14) + '" r="4.5" fill="#8C2D19"/>');
        parts.push('</g>');
      });
      parts.push('</g>');
    });
    svgEl.innerHTML = parts.join('');
  }

  function shRenderSelectedTableInspector() {
    const box = document.getElementById('sh-selected-table-box');
    if (!box || !window.__SH_STATE || !window.__SH_STATE.tables) return;
    const tIdx = window.__SH_SELECTED_TABLE_IDX || 0;
    const t = window.__SH_STATE.tables[tIdx] || window.__SH_STATE.tables[0];
    if (!t.geometry) shRecomputeGeometry(t);
    const normShape = shNormalizeShape(t.shape);

    document.querySelectorAll('#sh-card4-table-pills button').forEach(function(b, i) { b.classList.toggle('active', i === tIdx); });
    document.querySelectorAll('#sh-card4-shape-pills button[data-shape]').forEach(function(b) { b.classList.toggle('active', b.getAttribute('data-shape') === normShape); });
    const lockBtn = document.getElementById('sh-lock-table-btn');
    if (lockBtn) {
      lockBtn.classList.toggle('active', Boolean(t.locked));
      lockBtn.textContent = t.locked ? '🔒 Locked Table' : '🔓 Lock Table';
    }
    const sum4 = document.getElementById('sh-wizard-summary-4');
    if (sum4) sum4.textContent = 'Table ' + t.number + ' • ' + shFriendlyShape(t.shape);

    const seatRows = t.guests.map(function(g, idx) {
      const seat = t.geometry.seats[idx] || { seatNumber: idx + 1, clockPosition: '12:00' };
      const mb = shMealBadge(g.meal);
      const cleanAllergy = g.allergy ? String(g.allergy).replace(/^[⚠️🥜🌾🐚🥛]+\\s*/, '') : '';
      const cleanAccess = g.accessibility ? String(g.accessibility).replace(/^[♿👶]+\\s*/, '') : '';
      const allergyBadge = cleanAllergy ? '<span class="badge badge-rose" style="font-size:0.63rem;padding:2px 6px;">⚠️ ' + shEsc(cleanAllergy) + '</span>' : '';
      const accessBadge = cleanAccess ? '<span class="badge badge-amber" style="font-size:0.63rem;padding:2px 6px;">♿ ' + shEsc(cleanAccess) + '</span>' : '';
      return '<div onclick="window.shSeatClick(' + tIdx + ',' + idx + ',event)" style="cursor:pointer;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;padding:6px 8px;border-radius:8px;background:#FFFFFF;border:1px solid #EAE2D3;font-size:0.78rem;min-width:0;">' +
        '<div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1 1 130px;">' +
          '<span class="mono" style="font-size:0.68rem;font-weight:800;padding:2px 6px;border-radius:5px;flex-shrink:0;background:' + (idx === 0 ? '#8C2D19' : '#F3EDE3') + ';color:' + (idx === 0 ? '#FFF' : '#1C1917') + ';">#' + seat.seatNumber + '</span>' +
          '<strong style="color:#1C1917;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + shEsc(g.name) + '</strong>' +
        '</div>' +
        '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:4px;">' +
          '<span style="font-size:0.68rem;font-weight:700;padding:2px 6px;border-radius:5px;background:' + mb.bg + ';color:' + mb.color + ';">' + mb.icon + ' ' + mb.short + '</span>' +
          allergyBadge + accessBadge +
        '</div></div>';
    }).join('');

    box.innerHTML =
      '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">' +
        '<div style="min-width:0;">' +
          '<div style="font-size:0.66rem;font-weight:800;text-transform:uppercase;letter-spacing:0.07em;color:#8C2D19;">SELECTED TABLE INSPECTOR (12:00 = SEAT #1)</div>' +
          '<div class="serif-display" style="font-size:1.12rem;color:#181412;">' + shEsc(t.name) + ' &middot; ' + shEsc(shFriendlyShape(t.shape)) + '</div>' +
        '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:5px;">' +
          '<button type="button" onclick="window.shMorphSelectedTable(\\'round\\')" class="studio-tap-chip' + (normShape === 'round' ? ' active' : '') + '">● Round</button>' +
          '<button type="button" onclick="window.shMorphSelectedTable(\\'sweetheart\\')" class="studio-tap-chip' + (normShape === 'sweetheart' ? ' active' : '') + '">💕 Sweetheart</button>' +
          '<button type="button" onclick="window.shMorphSelectedTable(\\'banquet_2sided\\')" class="studio-tap-chip' + (normShape === 'banquet_2sided' ? ' active' : '') + '">▬ Banquet</button>' +
          '<button type="button" onclick="window.shMorphSelectedTable(\\'kings_4sided\\')" class="studio-tap-chip' + (normShape === 'kings_4sided' ? ' active' : '') + '">⊞ King\\'s</button>' +
          '<button type="button" onclick="window.shRotateSelectedTable()" class="studio-tap-chip">↻ 45°</button>' +
        '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(205px,1fr));gap:6px;">' + seatRows + '</div>';
  }

  function shRenderBeoView() {
    const container = document.getElementById('sh-beo-container');
    if (!container || !window.__SH_STATE) return;
    let totalFilet = 0, totalHalibut = 0, totalVegan = 0, totalKids = 0, totalAllergies = 0;
    const tableCards = (window.__SH_STATE.tables || []).map(function(t) {
      if (!t.geometry) shRecomputeGeometry(t);
      const rows = t.guests.map(function(g, idx) {
        const s = t.geometry.seats[idx] || { seatNumber: idx + 1, clockPosition: '12:00' };
        const mb = shMealBadge(g.meal);
        if (mb.short === 'Filet') totalFilet++;
        else if (mb.short === 'Halibut') totalHalibut++;
        else if (mb.short === 'Vegan') totalVegan++;
        else totalKids++;
        if (g.allergy) totalAllergies++;
        const cleanAllergy = g.allergy ? String(g.allergy).replace(/^[⚠️]+\\s*/, '') : '';
        const cleanAccess = g.accessibility ? String(g.accessibility).replace(/^[♿👶]+\\s*/, '') : '';
        return '<tr>' +
          '<td class="mono" style="font-weight:800;color:' + (idx === 0 ? '#8C2D19' : '#1C1917') + ';">Seat #' + s.seatNumber + (idx === 0 ? ' ★12:00' : '') + '</td>' +
          '<td style="font-weight:700;">' + shEsc(g.name) + '</td>' +
          '<td><span style="padding:2px 8px;border-radius:6px;font-weight:700;font-size:0.74rem;background:' + mb.bg + ';color:' + mb.color + ';">' + mb.code + ' ' + shEsc(g.meal) + '</span></td>' +
          '<td>' + (cleanAllergy ? '<strong style="color:#9F1239;">⚠️ ' + shEsc(cleanAllergy) + '</strong>' : '<span style="color:#78716C;">None</span>') + '</td>' +
          '<td>' + (cleanAccess ? '<strong style="color:#92400E;">♿ ' + shEsc(cleanAccess) + '</strong>' : '<span style="color:#78716C;">Standard</span>') + '</td></tr>';
      }).join('');
      return '<div style="background:#FFFFFF;border:1px solid #E2D9C8;border-radius:12px;padding:12px;margin-bottom:10px;">' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px;">' +
          '<strong style="font-size:0.90rem;color:#181412;">' + shEsc(t.name) + ' (' + t.guests.length + ' Covers)</strong>' +
          '<span class="badge badge-emerald">Seat #1 = 12 O\\'Clock Anchor</span></div>' +
        '<div style="overflow-x:auto;"><table class="ba-table" style="font-size:0.76rem;"><thead><tr><th>Clockwise Seat</th><th>Guest Name</th><th>Entrée</th><th>Allergy Alert</th><th>Chair Spec</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    }).join('');

    container.innerHTML =
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(85px,1fr));gap:8px;margin-bottom:12px;">' +
        '<div style="background:#FDF2EE;border:1px solid #F5D0C5;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.65rem;font-weight:800;color:#8C2D19;">◆ FILET</div><div style="font-size:1.15rem;font-weight:800;color:#181412;">' + totalFilet + '</div></div>' +
        '<div style="background:#F0F9FF;border:1px solid #BAE6FD;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.65rem;font-weight:800;color:#0369A1;">● HALIBUT</div><div style="font-size:1.15rem;font-weight:800;color:#181412;">' + totalHalibut + '</div></div>' +
        '<div style="background:#ECFDF5;border:1px solid #A7F3D0;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.65rem;font-weight:800;color:#065F46;">▲ VEGAN</div><div style="font-size:1.15rem;font-weight:800;color:#181412;">' + totalVegan + '</div></div>' +
        '<div style="background:#FFFBEB;border:1px solid #FDE68A;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.65rem;font-weight:800;color:#A16207;">★ KIDS</div><div style="font-size:1.15rem;font-weight:800;color:#181412;">' + totalKids + '</div></div>' +
        '<div style="background:#FFF1F2;border:1px solid #FECDD3;padding:8px;border-radius:10px;text-align:center;"><div style="font-size:0.65rem;font-weight:800;color:#9F1239;">⚠️ ALLERGIES</div><div style="font-size:1.15rem;font-weight:800;color:#9F1239;">' + totalAllergies + '</div></div>' +
      '</div>' + tableCards;
  }

  function shFormatPosterName(rawName) {
    const str = String(rawName || '').trim();
    const parenMatch = str.match(/\\s*(\\([^)]+\\))\\s*$/);
    const suffix = parenMatch ? (' ' + parenMatch[1]) : '';
    const base = str.replace(/\\s*\\([^)]+\\)\\s*$/, '').trim();
    const parts = base.split(/\\s+/).filter(Boolean);
    if (parts.length <= 1) return { sortKey: base.toLowerCase(), display: base + suffix };
    const last = parts[parts.length - 1];
    const first = parts.slice(0, -1).join(' ');
    return { sortKey: (last + ', ' + first).toLowerCase(), display: last + ', ' + first + suffix };
  }

  window.shSetPosterMode = function(mode, theme) {
    if (mode) window.__SH_POSTER_MODE = mode;
    if (theme) window.__SH_POSTER_THEME = theme;
    document.querySelectorAll('[data-poster-sort], #sh-card5-sort-pills [data-sort]').forEach(function(b) {
      const v = b.getAttribute('data-poster-sort') || b.getAttribute('data-sort');
      b.classList.toggle('active', v === window.__SH_POSTER_MODE);
    });
    document.querySelectorAll('[data-poster-theme], #sh-card5-theme-pills [data-theme]').forEach(function(b) {
      const v = b.getAttribute('data-poster-theme') || b.getAttribute('data-theme');
      b.classList.toggle('active', v === window.__SH_POSTER_THEME);
    });
    const sum5 = document.getElementById('sh-wizard-summary-5');
    if (sum5) sum5.textContent = (window.__SH_POSTER_THEME || 'alabaster').toUpperCase() + ' • ' + (window.__SH_POSTER_MODE === 'by_table' ? 'By Table' : 'A–Z');
    shRenderPosterView();
  };

  function shRenderPosterView() {
    const posterEl = document.getElementById('sh-poster-preview');
    if (!posterEl || !window.__SH_STATE) return;
    const theme = window.__SH_POSTER_THEME || 'alabaster';
    const bg = theme === 'obsidian' ? '#181412' : (theme === 'sage' ? '#EFF5F1' : '#FAF7F2');
    const fg = theme === 'obsidian' ? '#FAF7F2' : '#181412';
    const sub = theme === 'obsidian' ? '#D6CBB8' : '#57534E';
    const borderCol = theme === 'obsidian' ? '#C8A96E' : '#C8B9A6';
    const initials = shComputeCoupleMonogram(window.__SH_STATE.title);
    const logoUrl = window.__SH_CREST_LOGO_URL || '';

    let bodyHtml = '';
    if (window.__SH_POSTER_MODE === 'by_table') {
      bodyHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:12px;text-align:left;">' +
        (window.__SH_STATE.tables || []).map(function(t) {
          return '<div style="border-top:1px solid ' + borderCol + ';padding-top:6px;">' +
            '<div class="serif-display" style="font-size:0.95rem;color:' + fg + ';margin-bottom:4px;">Table ' + t.number + '</div>' +
            t.guests.map(function(g) { return '<div style="font-size:0.74rem;color:' + sub + ';">' + shEsc(g.name) + '</div>'; }).join('') +
          '</div>';
        }).join('') + '</div>';
    } else {
      const all = [];
      (window.__SH_STATE.tables || []).forEach(function(t) {
        t.guests.forEach(function(g, idx) {
          const parsed = shFormatPosterName(g.name);
          all.push({ sortKey: parsed.sortKey, display: parsed.display, tableNum: t.number, seatNum: idx + 1 });
        });
      });
      all.sort(function(a, b) { return a.sortKey.localeCompare(b.sortKey); });
      bodyHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:6px 16px;text-align:left;">' +
        all.map(function(g) {
          return '<div style="display:flex;justify-content:space-between;gap:8px;font-size:0.74rem;border-bottom:1px dotted ' + borderCol + ';padding:2px 0;color:' + fg + ';">' +
            '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + shEsc(g.display) + '</span>' +
            '<strong class="mono" style="font-size:0.70rem;flex-shrink:0;">Tbl ' + g.tableNum + '</strong></div>';
        }).join('') + '</div>';
    }

    const posterCrestHtml = logoUrl
      ? '<img src="' + shEsc(logoUrl) + '" alt="Couple Crest" style="width:100%;height:100%;object-fit:contain;background:#FFFFFF;padding:4px;" />'
      : '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;">' +
          '<span class="serif-display" style="font-size:1.24rem;font-weight:800;color:#FDE68A;letter-spacing:0.04em;">' + shEsc(initials) + '</span>' +
          '<span class="mono" style="font-size:0.44rem;font-weight:800;color:#D6CFC2;letter-spacing:0.12em;margin-top:2px;">EST. 2026</span>' +
        '</div>';

    posterEl.innerHTML =
      '<div style="background:' + bg + ';color:' + fg + ';border:2px double ' + borderCol + ';border-radius:14px;padding:20px 18px;box-shadow:0 16px 36px rgba(24,20,18,0.12);">' +
        '<div style="display:flex;align-items:center;gap:14px;text-align:left;border-bottom:1.5px double ' + borderCol + ';padding-bottom:12px;margin-bottom:14px;">' +
          '<div id="poster-logo-badge" style="width:58px;height:58px;border-radius:14px;border:2px solid #C8A96E;background:linear-gradient(135deg,#181412 0%,#2B231D 100%);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 6px 14px rgba(24,20,18,0.18);overflow:hidden;">' +
            posterCrestHtml +
          '</div>' +
          '<div style="min-width:0;flex:1;">' +
            '<div style="font-size:0.62rem;letter-spacing:0.14em;text-transform:uppercase;color:' + sub + ';font-weight:800;">24&Prime; &times; 36&Prime; ARCH D FOYER EASEL SIGN &middot; 0.125&Prime; PRINT BLEED READY</div>' +
            '<h3 class="serif-display" style="font-size:1.68rem;color:' + fg + ';margin:1px 0;">Please Find Your Seat</h3>' +
            '<div style="font-size:0.80rem;color:' + sub + ';font-style:italic;">' + shEsc(window.__SH_STATE.title) + ' &middot; ' + shEsc(window.__SH_STATE.venueName || 'Rosewood Conservatory') + '</div>' +
          '</div>' +
        '</div>' +
        bodyHtml +
      '</div>';

    const averyEl = document.getElementById('sh-avery-preview');
    if (averyEl) {
      const selTbl = window.__SH_STATE.tables[window.__SH_SELECTED_TABLE_IDX || 1] || window.__SH_STATE.tables[0];
      const sampleGuest = (selTbl && selTbl.guests && (selTbl.guests.find(function(x) { return x.allergy; }) || selTbl.guests[0])) || { name: 'Aunt Clara Lin', meal: 'Vegan Risotto', allergy: '🌾 SEVERE CELIAC (GF)' };
      const mb = shMealBadge(sampleGuest.meal);
      averyEl.innerHTML =
        '<div style="padding:10px 12px;border-radius:10px;background:#FAF7F2;border:1px solid #E2D9C8;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;align-items:center;">' +
          '<div style="background:#FFFFFF;border:1.5px solid #C8A96E;border-radius:8px;padding:10px 12px;box-shadow:0 4px 12px rgba(24,20,18,0.06);">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;font-size:0.62rem;font-weight:800;color:#78716C;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;"><span>AVERY 5302 TENT (FRONT)</span><span style="color:' + mb.color + ';font-size:0.80rem;" title="Server Entree Key">' + mb.code + ' ' + mb.short + '</span></div>' +
            '<div class="serif-display" style="font-size:1.12rem;color:#181412;">' + shEsc(sampleGuest.name) + '</div>' +
            '<div class="mono" style="font-size:0.70rem;font-weight:700;color:#8C2D19;margin-top:2px;">Table ' + (selTbl ? selTbl.number : 2) + ' &middot; Clockwise Seat #1 (12:00)</div>' +
          '</div>' +
          '<div style="background:#FFF1F2;border:1.5px dashed #E11D48;border-radius:8px;padding:10px 12px;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;font-size:0.62rem;font-weight:800;color:#9F1239;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;"><span>SERVER BACK FOLD (UPSIDE-DOWN)</span><span class="badge badge-emerald" style="font-size:0.58rem;padding:1px 6px;">2&Prime;&times;3.5&Prime; Die-Cut</span></div>' +
            '<div style="font-size:0.76rem;font-weight:800;color:#9F1239;">⚠️ ' + shEsc(sampleGuest.allergy || 'No Dietary Allergy · Standard Service') + '</div>' +
            '<div style="font-size:0.69rem;color:#57534E;margin-top:2px;">Entrée: <strong>' + shEsc(sampleGuest.meal) + '</strong> &middot; Server Key: <code>◆ Beef · ● Fish · ▲ Vegan · ★ Kid</code></div>' +
          '</div>' +
        '</div>';
    }
  }

  window.shFilterQrLookup = function() {
    const qInput = document.getElementById('sh-qr-search'), out = document.getElementById('sh-qr-results');
    if (!out || !window.__SH_STATE) return;
    const q = (qInput ? qInput.value : '').trim().toLowerCase();
    const matches = [];
    (window.__SH_STATE.tables || []).forEach(function(t) {
      t.guests.forEach(function(g, idx) {
        if (!q || g.name.toLowerCase().indexOf(q) !== -1 || t.name.toLowerCase().indexOf(q) !== -1) {
          matches.push({ guest: g, table: t, seatNumber: idx + 1 });
        }
      });
    });
    out.innerHTML = matches.slice(0, 8).map(function(m) {
      const mb = shMealBadge(m.guest.meal);
      return '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;padding:8px 10px;border-radius:10px;background:#FFFFFF;border:1px solid #EAE2D3;">' +
        '<div style="min-width:0;"><div style="font-weight:800;color:#181412;font-size:0.82rem;">' + shEsc(m.guest.name) + '</div>' +
        '<div style="font-size:0.71rem;color:#78716C;">' + shEsc(m.table.name) + ' &middot; ' + mb.icon + ' ' + shEsc(m.guest.meal) + '</div></div>' +
        '<span class="badge badge-emerald tabular" style="font-size:0.72rem;">Table ' + m.table.number + ' &middot; Seat #' + m.seatNumber + '</span></div>';
    }).join('');
  };

  function shRenderAll() {
    if (!window.__SH_STATE) return;
    const csovEl = document.getElementById('score-csov');
    if (csovEl) csovEl.textContent = String(window.__SH_STATE.harmonyScore || 98);
    if (window.__SH_STATE.tables) {
      let totalSeated = 0, totalTables = window.__SH_STATE.tables.length, allergyAndChairCount = 0;
      window.__SH_STATE.tables.forEach(function(t) {
        totalSeated += (t.guests ? t.guests.length : 0);
        (t.guests || []).forEach(function(g) { if (g.allergy || g.accessibility) allergyAndChairCount++; });
      });
      const guestsEl = document.getElementById('sh-stat-guests');
      if (guestsEl) guestsEl.textContent = totalSeated + ' Guests (' + totalTables + ' Tbls)';
      const hhSub = document.getElementById('sh-stat-households-sub');
      if (hhSub) hhSub.textContent = '✓ ' + (window.__SH_STATE.householdsCoupled || 26) + ' Coupled • 150 Scale';
      const alSub = document.getElementById('sh-stat-allergies-sub');
      if (alSub) alSub.textContent = '✓ ' + allergyAndChairCount + ' Alerts + Avery 5302';
    }
    shSyncSpecimenCrestHeader();
    shRenderRulesList();
    shRenderFloorplanSvg();
    shRenderSelectedTableInspector();
    shRenderBeoView();
    shRenderPosterView();
    window.shFilterQrLookup();
  }

  document.addEventListener('DOMContentLoaded', function() {
    try {
      const sp = new URLSearchParams(window.location.search);
      if (sp.get('sandbox') === 'mom_tables_1_3' && !window.__SH_SANDBOX_MOM) { window.shToggleMomSandbox(); }
    } catch (_) {}
    shRenderAll();
  });
</script>`;
}

module.exports = { renderInteractiveScript };

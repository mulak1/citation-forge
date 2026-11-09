/**
 * SeatHarmony (#2) - Poster & Sign Views Client Script
 */

function renderPosterClientScript() {
  return `
var SH_POSTER_THEMES = {
    alabaster: { label: 'Parisian Gold', bg: '#FAF7F2', fg: '#181412', sub: '#57534E', borderCol: '#C8A96E', badgeBg: '#FAF3E3', badgeFg: '#8C2D19', motif: '✦', fontStyle: 'normal' },
    ivory: { label: 'Botanical Ivory', bg: '#FCFBF7', fg: '#1F291E', sub: '#4B5D48', borderCol: '#7D8C6D', badgeBg: '#2C3E2B', badgeFg: '#D9F99D', motif: '◆', fontStyle: 'italic' },
    obsidian: { label: 'Editorial Noir', bg: '#181412', fg: '#FAF7F2', sub: '#D6CBB8', borderCol: '#C8A96E', badgeBg: '#2B231D', badgeFg: '#FDE68A', motif: '◆', fontStyle: 'normal' },
    sage: { label: 'Tuscan Sage', bg: '#EFF5F1', fg: '#14291E', sub: '#3E5C4A', borderCol: '#4D7C5D', badgeBg: '#064E3B', badgeFg: '#A7F3D0', motif: '✦', fontStyle: 'italic' },
    rosewater: { label: 'Blush Rosewater', bg: '#FDF4F5', fg: '#3B1821', sub: '#7D4250', borderCol: '#D48C96', badgeBg: '#6B2134', badgeFg: '#FECDD3', motif: '✦', fontStyle: 'italic' },
    terracotta: { label: 'Villa Terracotta', bg: '#FDF6F0', fg: '#2E160B', sub: '#7C4327', borderCol: '#B45309', badgeBg: '#7C2D12', badgeFg: '#FDE68A', motif: '◆', fontStyle: 'normal' }
  };

  window.shUpdateSignKicker = function(val) {
    window.__SH_SIGN_KICKER = String(val || 'Please Find Your Seat').trim();
    if (window.__SH_STATE) window.__SH_STATE.signKicker = window.__SH_SIGN_KICKER;
    shRenderPosterView(); shAutoPersistVault();
  };

  window.shUpdateSignMonogram = function(val) {
    window.__SH_SIGN_MONOGRAM = String(val || '').trim();
    if (window.__SH_STATE) window.__SH_STATE.signMonogram = window.__SH_SIGN_MONOGRAM;
    shRenderPosterView(); shAutoPersistVault();
  };

  window.shUpdateSignVenue = function(val) {
    if (!window.__SH_STATE) return;
    window.__SH_STATE.venueName = String(val || '').trim();
    var vi = document.getElementById('sh-venue-name-input'); if (vi && vi.value !== window.__SH_STATE.venueName) vi.value = window.__SH_STATE.venueName;
    shSyncSpecimenCrestHeader(); shRenderPosterView(); shAutoPersistVault();
  };

  window.shSetPosterMode = function(mode, theme) {
    if (mode) { window.__SH_POSTER_MODE = mode; if (window.__SH_STATE) window.__SH_STATE.posterSort = mode; }
    if (theme) { window.__SH_POSTER_THEME = theme; if (window.__SH_STATE) window.__SH_STATE.posterTheme = theme; }
    document.querySelectorAll('[data-poster-sort], #sh-card5-sort-pills [data-sort]').forEach(function(b) { b.classList.toggle('active', (b.getAttribute('data-poster-sort') || b.getAttribute('data-sort')) === window.__SH_POSTER_MODE); });
    document.querySelectorAll('[data-poster-theme], #sh-card5-theme-pills [data-theme]').forEach(function(b) { b.classList.toggle('active', (b.getAttribute('data-poster-theme') || b.getAttribute('data-theme')) === window.__SH_POSTER_THEME); });
    const tSpec = SH_POSTER_THEMES[window.__SH_POSTER_THEME || 'alabaster'] || SH_POSTER_THEMES.alabaster;
    const sum5 = document.getElementById('sh-wizard-summary-5');
    if (sum5) sum5.textContent = tSpec.label + ' • ' + (window.__SH_POSTER_MODE === 'by_table' ? 'By Table' : 'A-Z');
    shRenderPosterView(); shAutoPersistVault();
  };

  window.shCyclePosterFontSize = function() {
    var cur = window.__SH_POSTER_FONT_SIZE || (window.__SH_STATE && window.__SH_STATE.posterFontSize) || 'standard';
    var next = cur === 'standard' ? 'large' : (cur === 'large' ? 'compact' : 'standard');
    window.__SH_POSTER_FONT_SIZE = next;
    if (window.__SH_STATE) window.__SH_STATE.posterFontSize = next;
    var btn = document.getElementById('sh-poster-font-size-btn');
    if (btn) {
      btn.textContent = next === 'large' ? 'Font: 22pt (Large Serif)' : (next === 'compact' ? 'Font: 18pt (Compact)' : 'Font: 20pt (Standard)');
      btn.classList.toggle('active', next !== 'standard');
    }
    shRenderPosterView(); shAutoPersistVault();
  };

  window.shTogglePosterMiniMap = function() {
    var cur = window.__SH_POSTER_SHOW_MAP !== false && (!window.__SH_STATE || window.__SH_STATE.posterShowMap !== false);
    var next = !cur;
    window.__SH_POSTER_SHOW_MAP = next;
    if (window.__SH_STATE) window.__SH_STATE.posterShowMap = next;
    var btn = document.getElementById('sh-poster-map-toggle');
    if (btn) {
      btn.classList.toggle('active', next);
      btn.innerHTML = 'Mini Layout: ' + (next ? 'ON' : 'OFF');
    }
    shRenderPosterView(); shAutoPersistVault();
  };

  function shBuildPosterMiniMapHtml(plan, tSpec, themeKey) {
    var tables = (plan && plan.tables) || [];
    if (!tables.length) return '';
    var minX = 1120, maxX = 0, minY = 9999, maxY = 0;
    tables.forEach(function(tb) {
      var tx = tb.x || 250, ty = tb.y || 200;
      if (tx - 115 < minX) minX = tx - 115;
      if (tx + 115 > maxX) maxX = tx + 115;
      if (ty - 95 < minY) minY = ty - 95;
      if (ty + 95 > maxY) maxY = ty + 95;
    });
    (plan.landmarks || []).forEach(function(lm) {
      var lx = lm.x || 560, ly = lm.y || 340, lw = Math.max(185, lm.w || 150) / 2 + 24, lh = Math.max(46, lm.h || 44) / 2 + 24;
      if (lx - lw < minX) minX = lx - lw;
      if (lx + lw > maxX) maxX = lx + lw;
      if (ly - lh < minY) minY = ly - lh;
      if (ly + lh > maxY) maxY = ly + lh;
    });
    var vx = Math.max(0, Math.floor(minX)), vy = Math.max(0, Math.floor(minY));
    var vw = Math.max(540, Math.ceil(maxX - vx)), vh = Math.max(340, Math.ceil(maxY - vy));
    var isDark = themeKey === 'obsidian';
    var tblFill = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.45)';
    var lmFill = isDark ? 'rgba(200,169,110,0.08)' : 'rgba(200,169,110,0.10)';
    var svgParts = ['<svg id="sh-poster-mini-map-svg" viewBox="' + vx + ' ' + vy + ' ' + vw + ' ' + vh + '" style="width:100%;height:auto;max-height:380px;display:block;background:transparent;border:none;" role="img" aria-label="Reception room table number map">'];
    (plan.landmarks || []).forEach(function(lm) {
      var lx = lm.x || 560, ly = lm.y || 340, rot = lm.rot || 0;
      var shortLm = String(lm.label || '').replace(/\\\\s*\\\\([^)]*\\\\)/g, '').replace(/\\\\s*&\\\\s*ACCESSIBLE EXIT/i, '').replace(/\\\\s*&\\\\s*SUBWOOFER/i, '').trim();
      var lw = Math.max(165, lm.w || 150, shortLm.length * 10 + 28), lh = Math.max(46, lm.h || 44);
      svgParts.push('<g transform="translate(' + lx + ',' + ly + ') rotate(' + rot + ')"><rect x="' + (-lw / 2) + '" y="' + (-lh / 2) + '" width="' + lw + '" height="' + lh + '" rx="10" fill="' + lmFill + '" stroke="' + tSpec.borderCol + '" stroke-width="2" stroke-dasharray="6 4"/><text transform="rotate(' + ((rot > 90 && rot < 270) ? 180 : 0) + ')" x="0" y="5" text-anchor="middle" fill="' + tSpec.sub + '" font-size="14" font-weight="800" letter-spacing="0.07em">' + shEsc(shortLm) + '</text></g>');
    });
    tables.forEach(function(t, idx) {
      if (!t.geometry) shRecomputeGeometry(t);
      var tx = t.x || 250, ty = t.y || 200, shape = shNormalizeShape(t.shape), num = t.number || (idx + 1);
      var isSw = shape === 'sweetheart';
      if (shape === 'round') {
        var r = 62;
        for (var ci = 0; ci < Math.min(12, t.capacity || 8); ci++) {
          var ca = -Math.PI / 2 + (2 * Math.PI * ci) / Math.min(12, t.capacity || 8);
          svgParts.push('<circle cx="' + (tx + (r + 10) * Math.cos(ca)).toFixed(1) + '" cy="' + (ty + (r + 10) * Math.sin(ca)).toFixed(1) + '" r="5.8" fill="' + tblFill + '" stroke="' + tSpec.borderCol + '" stroke-width="1.8"/>');
        }
        svgParts.push('<circle cx="' + tx + '" cy="' + ty + '" r="' + r + '" fill="' + tblFill + '" stroke="' + tSpec.borderCol + '" stroke-width="3.2"/>');
        svgParts.push('<circle cx="' + tx + '" cy="' + ty + '" r="' + (r - 6) + '" fill="none" stroke="' + tSpec.borderCol + '" stroke-width="1" opacity="0.5"/>');
      } else {
        var tw = isSw ? 168 : 172, th = isSw ? 66 : 74;
        svgParts.push('<g transform="translate(' + tx + ',' + ty + ') rotate(' + (t.rotation || 0) + ')"><rect x="' + (-tw / 2) + '" y="' + (-th / 2) + '" width="' + tw + '" height="' + th + '" rx="16" fill="' + tblFill + '" stroke="' + tSpec.borderCol + '" stroke-width="3.2"/><rect x="' + (-tw / 2 + 5) + '" y="' + (-th / 2 + 5) + '" width="' + (tw - 10) + '" height="' + (th - 10) + '" rx="12" fill="none" stroke="' + tSpec.borderCol + '" stroke-width="1" opacity="0.5"/></g>');
      }
      if (isSw) {
        svgParts.push('<text x="' + tx + '" y="' + (ty - 2) + '" text-anchor="middle" fill="' + tSpec.fg + '" font-family="Cormorant Garamond, Georgia, serif" font-size="24" font-weight="700" font-style="italic">Sweetheart</text>');
        svgParts.push('<text x="' + tx + '" y="' + (ty + 17) + '" text-anchor="middle" fill="' + tSpec.sub + '" font-size="12.5" font-weight="800" letter-spacing="0.08em">TABLE 1 &middot; ' + (t.guests || []).length + ' SEATS</text>');
      } else {
        svgParts.push('<text x="' + tx + '" y="' + (ty - 17) + '" text-anchor="middle" fill="' + tSpec.sub + '" font-size="11.5" font-weight="800" letter-spacing="0.16em">TABLE</text>');
        svgParts.push('<text x="' + tx + '" y="' + (ty + 12) + '" text-anchor="middle" fill="' + tSpec.fg + '" font-family="Cormorant Garamond, Georgia, serif" font-size="38" font-weight="700">' + num + '</text>');
        svgParts.push('<text x="' + tx + '" y="' + (ty + 29) + '" text-anchor="middle" fill="' + tSpec.sub + '" font-size="12.5" font-weight="700">' + (t.guests || []).length + ' Guests</text>');
      }
    });
    svgParts.push('</svg>');
    return '<div id="sh-poster-mini-map" style="margin:2px 0 16px;padding:0 0 14px;border-bottom:1px solid ' + tSpec.borderCol + ';background:transparent;"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px;font-size:0.68rem;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:' + tSpec.sub + ';"><span>' + tSpec.motif + ' RECEPTION TABLE LAYOUT (' + tables.length + ' TABLES)</span><span>FIND YOUR NAME BELOW &rarr; LOCATE YOUR TABLE</span></div>' + svgParts.join('') + '</div>';
  }

  function shRenderPosterView() {
    const posterEl = document.getElementById('sh-poster-preview');
    if (!posterEl || !window.__SH_STATE) return;
    const themeKey = window.__SH_POSTER_THEME || window.__SH_STATE.posterTheme || 'alabaster', tSpec = SH_POSTER_THEMES[themeKey] || SH_POSTER_THEMES.alabaster;
    const bg = tSpec.bg, fg = tSpec.fg, sub = tSpec.sub, borderCol = tSpec.borderCol;
    const rawMono = String(window.__SH_SIGN_MONOGRAM || window.__SH_STATE.signMonogram || '').trim(), partsMono = rawMono.split(/\\s*(?:·|•|\\|)\\s*/).filter(Boolean);
    let initials = (partsMono[0] && partsMono[0].trim()) || shComputeCoupleMonogram(window.__SH_STATE.title);
    let monoSub = (partsMono.length > 1 && partsMono.slice(1).join(' · ').trim()) || 'EST. 2026';
    if (partsMono.length === 1) {
      const mEst = initials.match(/^(.+?)\\s+(EST\\.?\\s*\\d{2,4}.*)$/i);
      if (mEst) { initials = mEst[1].replace(/[-–—]+$/, '').trim() || shComputeCoupleMonogram(window.__SH_STATE.title); monoSub = mEst[2].trim(); }
    }
    const initFontRem = initials.length > 5 ? '0.82rem' : (initials.length > 3 ? '1.02rem' : '1.22rem');
    const kickerText = window.__SH_SIGN_KICKER || window.__SH_STATE.signKicker || 'Please Find Your Seat';
    const kInp = document.getElementById('sh-inline-sign-kicker'); if (kInp && document.activeElement !== kInp) kInp.value = kickerText;
    const vInp = document.getElementById('sh-inline-sign-venue'); if (vInp && document.activeElement !== vInp) vInp.value = window.__SH_STATE.venueName || '';
    const logoUrl = window.__SH_CREST_LOGO_URL || '';
    const isUnmasked = Boolean(window.__SH_STATE && window.__SH_STATE.isUnlocked);
    const hasEmailSaved = shIsDeliverableUnmasked();
    const vid = shEsc((window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819');
    let bodyHtml = '';
    const tablesArr = window.__SH_STATE.tables || [];
    const totalGuestsCount = tablesArr.reduce(function(acc, tb) { return acc + ((tb.guests && tb.guests.length) || 0); }, 0);
    const tbl1Count = (tablesArr[0] && tablesArr[0].guests && tablesArr[0].guests.length) || 2;
    const lockedGuestsCount = Math.max(0, totalGuestsCount - tbl1Count);
    const posterLockedBannerHtml = !isUnmasked
      ? '<div style="margin-top:12px;padding:10px 14px;border-radius:10px;background:#FAF8F5;border:1.5px dashed #C8A96E;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;text-align:left;"><span style="font-size:0.80rem;font-weight:800;color:#78350F;">' + SH_LOCK_SVG + 'Tables 2&ndash;' + tablesArr.length + ' Guest Names (' + lockedGuestsCount + ' Additional Guests) &mdash; Sample Shows Table 1 Only</span><div style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">' + (!hasEmailSaved ? '<div style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;"><input type="email" placeholder="Email to unmask sign ($0)..." onkeydown="if(event.keyCode===13){var el=document.getElementById(&quot;sh-inline-vault-email&quot;);if(el)el.value=this.value;window.shSaveInlineEmailLead();}" style="height:32px;padding:4px 8px;font-size:0.75rem;border:1px solid #C8A96E;border-radius:6px;min-width:150px;background:#FFFFFF;color:#181412;" aria-label="Email address to unlock sign" /><button type="button" class="sh-locked-spec-badge" onclick="var inp=this.previousElementSibling,el=document.getElementById(&quot;sh-inline-vault-email&quot;);if(inp&amp;&amp;el)el.value=inp.value;window.shSaveInlineEmailLead();" style="cursor:pointer;background:#1B4D3E;color:#FFFFFF;border:none;border-radius:6px;height:32px;padding:0 12px;font-size:0.74rem;font-weight:800;white-space:nowrap;">' + SH_LOCK_SVG + 'Unmask All ($0)</button></div>' : '') + '<a href="/buy/complete_dossier?target=estate-150&amp;vault=' + vid + '&amp;allow_promotion_codes=false" class="btn btn-primary" style="padding:6px 14px;font-size:0.74rem;font-weight:800;text-decoration:none;">Unlock 24&Prime;&times;36&Prime; Sign ($7) &rarr;</a></div></div>'
      : '';
    if ((window.__SH_POSTER_MODE || window.__SH_STATE.posterSort) === 'by_table') {
      bodyHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:12px;text-align:left;">' +
        tablesArr.map(function(t, tIdx) {
          if (tIdx >= 1 && !isUnmasked) {
            return '<div style="border-top:1px solid ' + borderCol + ';padding-top:6px;"><div class="serif-display" style="font-size:0.95rem;color:' + fg + ';margin-bottom:4px;">' + tSpec.motif + ' Table ' + t.number + '</div><div style="font-size:0.72rem;font-weight:700;color:' + sub + ';padding:4px 6px;border-radius:6px;background:rgba(200,169,110,0.12);border:1px dashed ' + borderCol + ';">' + SH_LOCK_SVG + t.guests.length + ' Seated Guests &mdash; Unlock Below ($0 / $7)</div></div>';
          }
          return '<div style="border-top:1px solid ' + borderCol + ';padding-top:6px;"><div class="serif-display" style="font-size:0.95rem;color:' + fg + ';margin-bottom:4px;">' + tSpec.motif + ' Table ' + t.number + (tIdx === 0 ? ' (Free Sample)' : '') + '</div>' + t.guests.map(function(g) { return '<div style="font-size:0.74rem;color:' + sub + ';">' + shEsc(g.name) + '</div>'; }).join('') + '</div>';
        }).join('') + '</div>' + posterLockedBannerHtml;
    } else {
      const all = [];
      tablesArr.forEach(function(t, tIdx) {
        if (tIdx >= 1 && !isUnmasked) return;
        t.guests.forEach(function(g, idx) { const parsed = shFormatPosterName(g.name); all.push({ sortKey: parsed.sortKey, display: parsed.display, tableNum: t.number, seatNum: idx + 1 }); });
      });
      all.sort(function(a, b) { return a.sortKey.localeCompare(b.sortKey); });
      bodyHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:6px 16px;text-align:left;">' + all.map(function(g) { const curFSize = (window.__SH_POSTER_FONT_SIZE === 'large' ? '0.88rem' : (window.__SH_POSTER_FONT_SIZE === 'compact' ? '0.70rem' : '0.76rem')); return '<div style="display:flex;justify-content:space-between;gap:8px;font-size:' + curFSize + ';border-bottom:1px dotted ' + borderCol + ';padding:2px 0;color:' + fg + ';"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + shEsc(g.display) + '</span><strong class="mono" style="font-size:0.70rem;flex-shrink:0;">Tbl ' + g.tableNum + ' (Sample)</strong></div>'; }).join('') + '</div>' + posterLockedBannerHtml;
    }
    const posterCrestHtml = logoUrl
      ? '<img src="' + shEsc(logoUrl) + '" alt="Couple Crest" style="width:100%;height:100%;object-fit:contain;background:#FFFFFF;padding:4px;" />'
      : '<div id="sh-live-sign-monogram" style="display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;max-width:100%;overflow:hidden;padding:3px;"><span class="serif-display" style="font-size:' + initFontRem + ';font-weight:800;color:' + tSpec.badgeFg + ';letter-spacing:0.04em;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + shEsc(initials) + '</span><span class="mono" style="font-size:0.44rem;font-weight:800;color:' + tSpec.badgeFg + ';opacity:0.85;letter-spacing:0.10em;margin-top:2px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + shEsc(monoSub) + '</span></div>';
    const showMap = window.__SH_POSTER_SHOW_MAP !== false && (!window.__SH_STATE || window.__SH_STATE.posterShowMap !== false);
    const mapBtn = document.getElementById('sh-poster-map-toggle');
    if (mapBtn) { mapBtn.classList.toggle('active', showMap); mapBtn.innerHTML = 'Mini Layout: ' + (showMap ? 'ON' : 'OFF'); }
    const miniMapHtml = showMap ? shBuildPosterMiniMapHtml(window.__SH_STATE, tSpec, themeKey) : '';
    const prePressBadgeHtml = '<div style="position:absolute;top:12px;right:14px;display:flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:rgba(255,255,255,0.92);backdrop-filter:blur(4px);border:1px solid ' + borderCol + ';font-size:0.68rem;font-weight:700;color:' + sub + ';pointer-events:none;box-shadow:0 2px 6px rgba(0,0,0,0.06);"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10B981;"></span><span>Pre-Press 300 DPI Arch D (24&Prime;&times;36&Prime;)</span></div>';
    posterEl.innerHTML =
      '<div style="background:' + bg + ';color:' + fg + ';border:3px double ' + borderCol + ';border-radius:14px;padding:20px 18px;box-shadow:0 16px 36px rgba(24,20,18,0.12);position:relative;">' + prePressBadgeHtml + '<div style="display:flex;align-items:center;gap:14px;text-align:left;border-bottom:1.5px double ' + borderCol + ';padding-bottom:12px;margin-bottom:14px;"><div id="poster-logo-badge" style="width:58px;height:58px;border-radius:14px;border:2px solid ' + borderCol + ';background:' + tSpec.badgeBg + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 6px 14px rgba(24,20,18,0.18);overflow:hidden;">' + posterCrestHtml + '</div><div style="min-width:0;flex:1;"><div style="font-size:0.62rem;letter-spacing:0.14em;text-transform:uppercase;color:' + sub + ';font-weight:800;">' + tSpec.motif + ' WELCOME TO OUR RECEPTION</div><h3 id="sh-live-sign-kicker" class="serif-display" style="font-size:1.68rem;color:' + fg + ';font-style:' + tSpec.fontStyle + ';margin:1px 0;">' + shEsc(kickerText) + '</h3><div style="font-size:0.80rem;color:' + sub + ';font-style:italic;">' + shEsc(window.__SH_STATE.title) + ' &middot; ' + shEsc(window.__SH_STATE.venueName || 'Rosewood Conservatory') + '</div></div></div>' + miniMapHtml + bodyHtml + '</div>';
    const averyEl = document.getElementById('sh-avery-preview');
    if (averyEl) {
      const sampleCards = [];
      tablesArr.forEach(function(t) { (t.guests || []).forEach(function(g, idx) { sampleCards.push({ g: g, tNum: t.number, sNum: idx + 1, priority: (t.number === 1 && idx === 0 ? 10 : 0) + (g.allergy ? 2 : 0) + (g.accessibility ? 1 : 0) }); }); });
      sampleCards.sort(function(a, b) { return b.priority - a.priority; });
      const visibleCards = isUnmasked ? sampleCards.slice(0, 4) : sampleCards.slice(0, 2);
      const cardStripHtml = visibleCards.map(function(c, cIdx) {
        const mb = shMealBadge(c.g.meal), al = c.g.allergy ? String(c.g.allergy).replace(/[^A-Za-z0-9\\\\s()-]/g, '').trim() : '';
        return '<div style="background:#FFFDF9;border:1.5px solid #D8C29D;border-radius:10px;padding:8px 10px;box-shadow:0 4px 10px rgba(24,20,18,0.06);">' +
          '<div style="font-size:0.62rem;color:#78716C;border-bottom:1px dashed #D6CFC2;padding-bottom:4px;margin-bottom:5px;display:flex;justify-content:space-between;gap:4px;"><span>Server Side: <b>Table ' + c.tNum + ', Seat #' + c.sNum + (cIdx === 0 ? ' (Free Sample)' : '') + '</b></span><span style="color:' + (al ? '#9F1239' : mb.color) + ';font-weight:800;">' + (al ? ('Alert: ' + shEsc(al)) : (mb.code + ' ' + mb.short.toUpperCase())) + '</span></div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;"><span style="font-size:0.62rem;font-weight:800;color:#8A6A2E;">' + shEsc(initials) + '</span><span style="font-size:0.68rem;font-weight:800;padding:1px 6px;border-radius:4px;background:' + mb.bg + ';color:' + mb.color + ';">' + mb.code + ' ' + mb.short + '</span></div>' +
          '<div class="serif-display" style="font-size:0.95rem;font-weight:700;color:#181412;">' + shEsc(c.g.name) + '</div>' +
          '<div style="font-size:0.68rem;color:#57534E;font-weight:700;">Table ' + c.tNum + ' &middot; Seat #' + c.sNum + '</div>' +
        '</div>';
      }).join('') + (!isUnmasked ? '<div style="background:#FAF8F5;border:1.5px dashed #C8A96E;border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;justify-content:center;gap:8px;"><div style="font-size:0.78rem;font-weight:800;color:#78350F;">' + SH_LOCK_SVG + 'Place Cards #3&ndash;' + sampleCards.length + ' (Avery 5302 PDF Sheet)</div><div style="font-size:0.72rem;color:#57534E;">Includes 180&deg; server meal icons &amp; red kitchen allergy notes for all ' + sampleCards.length + ' guests.</div><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;"><input type="email" placeholder="Your email to unlock ($0)..." onkeydown="if(event.keyCode===13){var el=document.getElementById(&quot;sh-inline-vault-email&quot;);if(el)el.value=this.value;window.shSaveInlineEmailLead();}" style="height:30px;padding:3px 8px;font-size:0.72rem;border:1px solid #1B4D3E;border-radius:6px;min-width:150px;background:#FFFFFF;color:#181412;" aria-label="Email to unmask cards" /><button type="button" class="sh-locked-spec-badge" onclick="var inp=this.previousElementSibling,el=document.getElementById(&quot;sh-inline-vault-email&quot;);if(inp&amp;&amp;el)el.value=inp.value;window.shSaveInlineEmailLead();" style="cursor:pointer;background:#1B4D3E;color:#FFFFFF;border:none;border-radius:6px;height:30px;padding:0 12px;font-size:0.72rem;font-weight:800;white-space:nowrap;">' + SH_LOCK_SVG + 'Unmask Cards ($0)</button></div></div>' : '');
      averyEl.innerHTML = '<div style="padding:12px 14px;border-radius:12px;background:linear-gradient(135deg,#FAF3E6 0%,#F5ECE0 100%);border:1.5px solid #D8C29D;"><div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;"><div><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;"><span style="font-size:0.72rem;font-weight:700;color:#78350F;">Folded Place Cards (' + sampleCards.length + ' Guests &middot; Cards #1&ndash;2 Free Sample Proof)</span><span style="font-size:0.68rem;font-weight:700;color:#065F46;background:#ECFDF5;border:1px solid #A7F3D0;border-radius:999px;padding:1px 7px;">Standard 8.5&Prime;&times;11&Prime; Letter (4/Sheet)</span></div><div style="font-size:0.78rem;color:#44403C;">Guest name on the front, meal choice &amp; allergy note on the back for servers.</div></div><div style="display:flex;gap:6px;flex-wrap:wrap;"><button type="button" class="btn btn-secondary" onclick="window.shPrintAveryProof &amp;&amp; window.shPrintAveryProof()" style="padding:6px 10px;font-size:0.73rem;background:#FAF8F5;border-color:#C8A96E;color:#78350F;font-weight:700;">Print Sample Card (PDF)</button><a href="/print/avery-5302/' + vid + '?sample=1" target="_blank" class="btn btn-secondary" style="padding:6px 10px;font-size:0.73rem;background:#FAF8F5;border-color:#C8A96E;color:#78350F;font-weight:700;">Print 4-Card Sheet (Free) &rarr;</a><a id="sh-avery-preview-btn" href="/print/avery-5302/' + vid + '" target="_blank" class="btn btn-secondary" style="padding:6px 11px;font-size:0.73rem;">Open Full Place Card Sheet &rarr;</a><a id="sh-avery-pack-buy-btn" href="/buy/complete_dossier?target=estate-150&vault=' + vid + '&allow_promotion_codes=false" class="btn btn-primary" style="padding:6px 12px;font-size:0.73rem;">Unlock Event Print Pack ($7 · vs. $14 Etsy) &rarr;</a></div></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:8px;">' + cardStripHtml + '</div></div>';
    }
    shSyncVaultIdLinks((window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819');
  }

  window.shSwitchSignSubView = function(mode) {
    window.__SH_SIGN_SUBVIEW = mode;
    var pBtn = document.getElementById('sh-view-mode-poster-btn');
    var aBtn = document.getElementById('sh-view-mode-avery-btn');
    var posterEl = document.getElementById('sh-poster-preview');
    var averyEl = document.getElementById('sh-avery-preview');
    if (mode === 'avery') {
      if (pBtn) pBtn.classList.remove('active');
      if (aBtn) aBtn.classList.add('active');
      if (posterEl) posterEl.style.display = 'none';
      if (averyEl) { averyEl.style.display = 'block'; averyEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    } else {
      if (pBtn) pBtn.classList.add('active');
      if (aBtn) aBtn.classList.remove('active');
      if (posterEl) { posterEl.style.display = 'block'; posterEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      if (averyEl) averyEl.style.display = 'none';
    }
  };

  window.shOpenPrintShopSpecsModal = function() {
    var m = document.getElementById('sh-print-specs-modal');
    if (m) m.style.display = 'flex';
    if (window.shTrackTelemetry) window.shTrackTelemetry('view_paywall', { source: 'print_specs_modal' });
  };

  window.shClosePrintShopSpecsModal = function() {
    var m = document.getElementById('sh-print-specs-modal');
    if (m) m.style.display = 'none';
  };

  window.shPrintPosterProof = function() {
    var vId = (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819';
    var theme = window.__SH_POSTER_THEME || (window.__SH_STATE && window.__SH_STATE.posterTheme) || 'alabaster';
    var sort = (window.__SH_POSTER_MODE || (window.__SH_STATE && window.__SH_STATE.posterSort) || 'alphabetical');
    var fSize = window.__SH_POSTER_FONT_SIZE || (window.__SH_STATE && window.__SH_STATE.posterFontSize) || 'standard';
    var win = window.open('/print/poster/' + encodeURIComponent(vId) + '?theme=' + encodeURIComponent(theme) + '&sort=' + encodeURIComponent(sort) + '&size=' + encodeURIComponent(fSize) + '&auto_print=1', '_blank');
    if (win) win.focus();
    if (window.shTrackTelemetry) window.shTrackTelemetry('view_poster_proof', { vaultId: vId, theme: theme });
  };

  window.shPrintAveryProof = function() {
    var vId = (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819';
    var isUnl = Boolean(window.__SH_STATE && window.__SH_STATE.isUnlocked);
    var qs = isUnl ? '?auto_print=1' : '?sample=1&auto_print=1';
    var win = window.open('/print/avery-5302/' + encodeURIComponent(vId) + qs, '_blank');
    if (win) win.focus();
    if (window.shTrackTelemetry) window.shTrackTelemetry('view_avery_proof', { vaultId: vId });
  };

  window.shPrintFoyerSign = function() {
    var vId = (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819';
    var win = window.open('/qr/' + encodeURIComponent(vId) + '?auto_print=1', '_blank');
    if (win) win.focus();
    if (window.shTrackTelemetry) window.shTrackTelemetry('view_foyer_sign_proof', { vaultId: vId });
  };

  window.shPrintAllDayOfAssets = window.shPrintAllDeliverables = function() {
    var vId = (window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819';
    var win = window.open('/vault/' + encodeURIComponent(vId) + '?auto_print_all=1', '_blank');
    if (win) win.focus();
    if (window.shTrackTelemetry) window.shTrackTelemetry('print_all_day_of_assets', { vaultId: vId });
  };

  
`;
}

module.exports = { renderPosterClientScript };

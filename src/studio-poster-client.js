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
      averyEl.innerHTML = '<div style="padding:12px 14px;border-radius:12px;background:linear-gradient(135deg,#FAF3E6 0%,#F5ECE0 100%);border:1.5px solid #D8C29D;"><div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;"><div><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;"><span style="font-size:0.72rem;font-weight:700;color:#78350F;">Folded Place Cards (' + sampleCards.length + ' Guests &middot; Cards #1&ndash;2 Free Sample Proof)</span><span style="font-size:0.68rem;font-weight:700;color:#065F46;background:#ECFDF5;border:1px solid #A7F3D0;border-radius:999px;padding:1px 7px;">Standard 8.5&Prime;&times;11&Prime; Letter (4/Sheet)</span></div><div style="font-size:0.78rem;color:#44403C;">Guest name on the front, meal choice &amp; allergy note on the back for servers.</div></div><div style="display:flex;gap:6px;flex-wrap:wrap;"><button type="button" class="btn btn-secondary" onclick="window.shPrintAveryProof &amp;&amp; window.shPrintAveryProof()" style="padding:6px 10px;font-size:0.73rem;background:#FAF8F5;border-color:#C8A96E;color:#78350F;font-weight:700;">Print Sample Card (PDF)</button><a href="/print/avery-5302/' + vid + '?calibrate=1" target="_blank" class="btn btn-secondary" style="padding:6px 10px;font-size:0.73rem;background:#FAF8F5;border-color:#10B981;color:#065F46;font-weight:700;">🎯 Margin Test Sheet &rarr;</a><a href="/print/avery-5302/' + vid + '?sample=1" target="_blank" class="btn btn-secondary" style="padding:6px 10px;font-size:0.73rem;background:#FAF8F5;border-color:#C8A96E;color:#78350F;font-weight:700;">Print 4-Card Sheet (Free) &rarr;</a><a id="sh-avery-preview-btn" href="/print/avery-5302/' + vid + '" target="_blank" class="btn btn-secondary" style="padding:6px 11px;font-size:0.73rem;">Open Full Place Card Sheet &rarr;</a><a id="sh-avery-pack-buy-btn" href="/buy/complete_dossier?target=estate-150&vault=' + vid + '&allow_promotion_codes=false" class="btn btn-primary" style="padding:6px 12px;font-size:0.73rem;">Unlock Event Print Pack ($7 · vs. $14 Etsy) &rarr;</a></div></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:8px;">' + cardStripHtml + '</div></div>';
    }
    shSyncVaultIdLinks((window.__SH_STATE && window.__SH_STATE.vaultId) || 'SH-4819');
  }

  window.shRenderBadgePreview = function() {
    var badgeEl = document.getElementById('sh-badge-preview');
    if (!badgeEl || !window.__SH_STATE) return;
    var tablesArr = window.__SH_STATE.tables || [];
    var sampleBadges = [];
    tablesArr.forEach(function(t) {
      (t.guests || []).forEach(function(g, idx) {
        sampleBadges.push({ g: g, tNum: t.number, sNum: idx + 1 });
      });
    });
    var visibleBadges = sampleBadges.slice(0, 4);
    var badgeCardsHtml = visibleBadges.map(function(b) {
      var mb = shMealBadge(b.g.meal);
      var al = b.g.allergy ? String(b.g.allergy).replace(/[^A-Za-z0-9\\s()-]/g, '').trim() : '';
      return '<div style="background:#FFFFFF;border:1.5px solid #065F46;border-radius:10px;padding:12px;box-shadow:0 4px 10px rgba(6,95,70,0.06);display:flex;flex-direction:column;justify-content:space-between;min-height:115px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #E5E7EB;padding-bottom:5px;margin-bottom:6px;">' +
          '<span style="font-size:0.65rem;font-weight:800;color:#065F46;letter-spacing:0.06em;text-transform:uppercase;">NAME BADGE &middot; AVERY 5395</span>' +
          '<span style="font-size:0.65rem;font-weight:700;padding:1px 6px;border-radius:4px;background:' + mb.bg + ';color:' + mb.color + ';">' + mb.code + ' ' + mb.short + '</span>' +
        '</div>' +
        '<div>' +
          '<div class="serif-display" style="font-size:1.15rem;font-weight:700;color:#181412;line-height:1.2;">' + shEsc(b.g.name) + '</div>' +
          '<div style="font-size:0.75rem;color:#4B5563;font-weight:600;margin-top:2px;">Table ' + b.tNum + ' &middot; Seat #' + b.sNum + '</div>' +
        '</div>' +
        (al ? '<div style="font-size:0.68rem;font-weight:800;color:#9F1239;background:#FFF1F2;border:1px solid #FECDD3;padding:2px 6px;border-radius:4px;margin-top:6px;align-self:flex-start;">Dietary Alert: ' + shEsc(al) + '</div>' : '<div style="font-size:0.65rem;color:#9CA3AF;margin-top:4px;">No dietary restrictions</div>') +
      '</div>';
    }).join('');

    badgeEl.innerHTML = '<div style="padding:14px;border-radius:12px;background:linear-gradient(135deg,#ECFDF5 0%,#E6F4EA 100%);border:1.5px solid #065F46;">' +
      '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;">' +
        '<div>' +
          '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
            '<span style="font-size:0.78rem;font-weight:800;color:#065F46;">Clip-On Name Badges (Avery 5395 &middot; ' + sampleBadges.length + ' Guests)</span>' +
            '<span style="font-size:0.68rem;font-weight:700;color:#065F46;background:#FFFFFF;border:1px solid #065F46;border-radius:999px;padding:1px 8px;">8 Badges / Letter Sheet (2⅓″ &times; 3⅜″)</span>' +
          '</div>' +
          '<div style="font-size:0.78rem;color:#374151;margin-top:2px;">Clip badges with table assignments, server meal codes, and dietary alerts.</div>' +
        '</div>' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
          '<button type="button" class="btn btn-secondary" onclick="window.print()" style="padding:6px 12px;font-size:0.73rem;background:#FFFFFF;border-color:#065F46;color:#065F46;font-weight:800;">Print Sample Badges (PDF)</button>' +
        '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;">' + badgeCardsHtml + '</div>' +
    '</div>';
  };

  window.shRenderPlacardPreview = function() {
    var placardEl = document.getElementById('sh-placard-preview');
    if (!placardEl || !window.__SH_STATE) return;
    var tablesArr = window.__SH_STATE.tables || [];
    var eventTitle = window.__SH_STATE.coupleNames || window.__SH_STATE.title || 'Wedding Reception';
    var sampleTables = tablesArr.slice(0, 4);
    var tablePlacardsHtml = sampleTables.map(function(t, tIdx) {
      var tName = t.name || ('Table ' + (tIdx + 1));
      var guests = t.guests || [];
      var topGuests = guests.slice(0, 6).map(function(g) {
        var mb = shMealBadge(g.meal);
        return '<div style="font-size:0.75rem;padding:2px 0;display:flex;justify-content:space-between;color:#1F2937;"><span>' + shEsc(g.name) + '</span><span style="font-size:0.65rem;color:' + mb.color + ';">' + mb.code + '</span></div>';
      }).join('');
      return '<div style="background:#FFFFFF;border:2px solid #C8A96E;border-radius:10px;padding:12px;display:flex;flex-direction:column;justify-content:space-between;min-height:160px;box-shadow:0 4px 12px rgba(200,169,110,0.1);">' +
        '<div style="text-align:center;border-bottom:1px solid #E5E7EB;padding-bottom:6px;margin-bottom:6px;">' +
          '<div style="font-size:0.65rem;letter-spacing:1px;text-transform:uppercase;color:#8C2D19;font-weight:700;">' + shEsc(eventTitle) + '</div>' +
          '<div class="serif-display" style="font-size:1.15rem;font-weight:700;color:#1B4D3E;margin-top:2px;">' + shEsc(tName) + '</div>' +
          '<div style="font-size:0.68rem;color:#78350F;font-weight:600;">' + guests.length + ' Guests &middot; Clockwise 12:00</div>' +
        '</div>' +
        '<div style="margin-bottom:8px;">' + topGuests + (guests.length > 6 ? '<div style="font-size:0.68rem;color:#6B7280;text-align:center;margin-top:3px;">+ ' + (guests.length - 6) + ' more guests</div>' : '') + '</div>' +
        '<button type="button" class="btn btn-secondary" onclick="window.shPrintTablePlacard(' + tIdx + ')" style="width:100%;padding:4px 8px;font-size:0.72rem;background:#FAF8F5;border-color:#1B4D3E;color:#1B4D3E;font-weight:700;">Inspect &amp; Print Table #' + (tIdx + 1) + ' Placard</button>' +
      '</div>';
    }).join('');

    placardEl.innerHTML = '<div style="padding:14px;border-radius:12px;background:linear-gradient(135deg,#FFFDF7 0%,#F5ECE0 100%);border:1.5px solid #C8A96E;">' +
      '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;">' +
        '<div>' +
          '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
            '<span style="font-size:0.78rem;font-weight:800;color:#78350F;">Table QR Placards &amp; Menu Stands (' + tablesArr.length + ' Tables)</span>' +
            '<span style="font-size:0.68rem;font-weight:700;color:#1B4D3E;background:#FFFFFF;border:1px solid #1B4D3E;border-radius:999px;padding:1px 8px;">Standard 4" &times; 6" Acrylic Frame / Tent</span>' +
          '</div>' +
          '<div style="font-size:0.78rem;color:#4B5563;margin-top:2px;">Individual table cards with couple monogram, table number, clockwise guest roster, server meal codes &amp; QR link.</div>' +
        '</div>' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
          '<button type="button" class="btn btn-secondary" onclick="window.shPrintTablePlacard(0)" style="padding:6px 10px;font-size:0.73rem;background:#FAF8F5;border-color:#C8A96E;color:#78350F;font-weight:700;">Print Sample (Table 1)</button>' +
          '<button type="button" class="btn btn-primary" onclick="window.shBatchPrintAllPlacards()" style="padding:6px 12px;font-size:0.73rem;background:#1B4D3E;color:#FFFFFF;border-color:#1B4D3E;font-weight:800;">🖨️ Batch Print All ' + tablesArr.length + ' Placards (PDF)</button>' +
        '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;">' + tablePlacardsHtml + '</div>' +
    '</div>';
  };

  window.shBatchPrintAllPlacards = function() {
    var plan = window.__SH_STATE; if (!plan || !plan.tables) return;
    var tablesArr = plan.tables || [];
    var eventTitle = plan.coupleNames || plan.title || 'Wedding Reception';
    var dateOrVenue = (plan.weddingDate || plan.date || '') + (plan.venueName ? (' · ' + plan.venueName) : '');

    var printHtml = tablesArr.map(function(t, tIdx) {
      var tName = t.name || ('Table ' + (tIdx + 1));
      var guests = t.guests || [];
      var guestsHtml = guests.map(function(g, idx) {
        var note = '';
        if (g.meal) note += ' <span style="font-size:10px;padding:1px 5px;background:#F5EFE6;border-radius:4px;color:#78350F;">' + (g.meal === 'vegetarian' ? '🌱 Veg' : (g.meal === 'vegan' ? '🌱 Vegan' : (g.meal === 'fish' ? '🐟 Fish' : (g.meal === 'beef' ? '🥩 Beef' : g.meal)))) + '</span>';
        if (g.allergy) note += ' <span style="font-size:10px;padding:1px 5px;background:#FEE2E2;border-radius:4px;color:#991B1B;">⚠️ ' + g.allergy + '</span>';
        return '<li style="padding:4px 0;border-bottom:1px dashed #E5E7EB;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#1F2937;"><span><strong>' + (idx + 1) + '.</strong> ' + shEsc(g.name) + '</span><span>' + note + '</span></li>';
      }).join('');

      return '<div class="sh-placard-page" style="page-break-after:always;width:4in;height:6in;box-sizing:border-box;padding:24px 20px;border:3px double #C8A96E;display:flex;flex-direction:column;justify-content:space-between;text-align:center;font-family:Georgia,serif;background:#FFFFFF;margin:0 auto 20px;">' +
        '<div>' +
          '<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8C2D19;font-weight:700;margin-bottom:4px;">' + shEsc(eventTitle) + '</div>' +
          (dateOrVenue ? '<div style="font-size:10px;color:#6B7280;margin-bottom:12px;">' + shEsc(dateOrVenue) + '</div>' : '<div style="margin-bottom:8px;"></div>') +
          '<div style="font-size:24px;font-weight:700;color:#1B4D3E;letter-spacing:0.5px;padding-bottom:8px;border-bottom:1px solid #E5E7EB;">' + shEsc(tName) + '</div>' +
          '<div style="font-size:10px;color:#78350F;font-family:sans-serif;font-weight:600;margin-top:6px;letter-spacing:0.5px;">' + guests.length + ' RESERVED SEATS · CLOCKWISE 12:00</div>' +
        '</div>' +
        '<ul style="list-style:none;padding:0;margin:12px 0;text-align:left;font-family:system-ui,-apple-system,sans-serif;">' +
          (guestsHtml || '<li style="font-size:12px;color:#9CA3AF;text-align:center;padding:12px 0;">No guests assigned yet</li>') +
        '</ul>' +
        '<div style="border-top:1px solid #E5E7EB;padding-top:10px;display:flex;align-items:center;justify-content:space-between;text-align:left;">' +
          '<div style="font-family:system-ui,sans-serif;">' +
            '<div style="font-size:10px;font-weight:700;color:#1B4D3E;">SEATHARMONY DIGITAL GUESTBOOK</div>' +
            '<div style="font-size:9px;color:#6B7280;">Scan to view table menu &amp; share photos</div>' +
          '</div>' +
          '<div style="width:42px;height:42px;border:1px solid #D1D5DB;border-radius:4px;display:flex;align-items:center;justify-content:center;background:#F9FAFB;font-size:18px;">📱</div>' +
        '</div>' +
      '</div>';
    }).join('');

    var printWin = window.open('', '_blank');
    if (!printWin) {
      window.print();
      return;
    }
    printWin.document.write('<!DOCTYPE html><html><head><title>Batch 4x6 Table Placards - ' + shEsc(eventTitle) + '</title><style>@page { size: 4in 6in; margin: 0; } body { margin: 0; padding: 0; background: #FAF8F5; } @media print { body { background: #FFFFFF; } .sh-no-print { display: none !important; } } </style></head><body><div class="sh-no-print" style="padding:12px;background:#1B4D3E;color:#FFFFFF;display:flex;justify-content:space-between;align-items:center;font-family:sans-serif;"><span>Batch 4" &times; 6" Table Placards (' + tablesArr.length + ' Tables)</span><button onclick="window.print()" style="padding:6px 14px;background:#FFFFFF;color:#1B4D3E;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">🖨️ Print All Placards</button></div><div style="padding:20px;">' + printHtml + '</div></body></html>');
    printWin.document.close();
  };

  window.shSwitchSignSubView = function(mode) {
    window.__SH_SIGN_SUBVIEW = mode;
    var pBtn = document.getElementById('sh-view-mode-poster-btn');
    var aBtn = document.getElementById('sh-view-mode-avery-btn');
    var bBtn = document.getElementById('sh-view-mode-badge-btn');
    var plBtn = document.getElementById('sh-view-mode-placard-btn');
    var dotBtn = document.getElementById('sh-view-mode-dots-btn');
    var posterEl = document.getElementById('sh-poster-preview');
    var averyEl = document.getElementById('sh-avery-preview');
    var badgeEl = document.getElementById('sh-badge-preview');
    var placardEl = document.getElementById('sh-placard-preview');
    var dotsEl = document.getElementById('sh-dots-preview');
    if (pBtn) pBtn.classList.toggle('active', mode === 'poster');
    if (aBtn) aBtn.classList.toggle('active', mode === 'avery');
    if (bBtn) bBtn.classList.toggle('active', mode === 'badges');
    if (plBtn) plBtn.classList.toggle('active', mode === 'placards');
    if (dotBtn) dotBtn.classList.toggle('active', mode === 'dots');
    if (posterEl) posterEl.style.display = mode === 'poster' ? 'block' : 'none';
    if (averyEl) averyEl.style.display = mode === 'avery' ? 'block' : 'none';
    if (badgeEl) {
      badgeEl.style.display = mode === 'badges' ? 'block' : 'none';
      if (mode === 'badges') {
        window.shRenderBadgePreview();
        badgeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    if (placardEl) {
      placardEl.style.display = mode === 'placards' ? 'block' : 'none';
      if (mode === 'placards') {
        window.shRenderPlacardPreview();
        placardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    if (dotsEl) {
      dotsEl.style.display = mode === 'dots' ? 'block' : 'none';
      if (mode === 'dots') {
        window.shRenderDotsPreview();
        dotsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  window.shRenderDotsPreview = function() {
    var dotsEl = document.getElementById('sh-dots-preview');
    if (!dotsEl || !window.__SH_STATE) return;
    var tablesArr = window.__SH_STATE.tables || [];
    var flaggedGuests = [];

    tablesArr.forEach(function(t) {
      (t.guests || []).forEach(function(g, idx) {
        var mb = (typeof shMealBadge === 'function') ? shMealBadge(g.meal) : { short: 'Other' };
        var isSpecial = Boolean(g.allergy || mb.short === 'Vegan' || mb.short === 'Veg' || mb.short === 'Kids');
        if (isSpecial) {
          flaggedGuests.push({
            name: g.name,
            tableName: t.name || ('Table ' + t.number),
            seatNumber: idx + 1,
            allergy: g.allergy,
            meal: mb.short
          });
        }
      });
    });

    var sampleDots = flaggedGuests.slice(0, 8);
    var dotsHtml = sampleDots.map(function(d) {
      var isSevere = Boolean(d.allergy);
      var dotColor = isSevere ? '#DC2626' : (d.meal === 'Vegan' ? '#059669' : (d.meal === 'Veg' ? '#10B981' : '#2563EB'));
      var label = isSevere ? ('⚠ ' + d.allergy) : (d.meal.toUpperCase());

      return '<div style="background:#FFFFFF;border:1.5px solid ' + dotColor + ';border-radius:12px;padding:8px 10px;display:flex;align-items:center;gap:10px;box-shadow:0 2px 6px rgba(0,0,0,0.04);">' +
        '<div style="width:36px;height:36px;border-radius:50%;background:' + dotColor + ';color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;">' +
          (isSevere ? 'ALERT' : (d.meal === 'Vegan' ? 'V' : (d.meal === 'Veg' ? 'VG' : 'KID'))) +
        '</div>' +
        '<div style="min-width:0;flex:1;">' +
          '<div style="font-weight:700;font-size:13px;color:#1F2937;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + shEsc(d.name) + '</div>' +
          '<div style="font-size:11px;color:#4B5563;">' + shEsc(d.tableName) + ' &bull; Seat #' + d.seatNumber + '</div>' +
          '<div style="font-size:10px;font-weight:700;color:' + dotColor + ';margin-top:2px;">' + shEsc(label) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    dotsEl.innerHTML = '<div style="padding:14px;border-radius:12px;background:linear-gradient(135deg,#FEF2F2 0%,#FFF7ED 100%);border:1.5px solid #F87171;">' +
      '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;">' +
        '<div>' +
          '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
            '<span style="font-size:0.78rem;font-weight:800;color:#991B1B;">Dietary Allergy Place Card Alert Dots (' + flaggedGuests.length + ' Flagged Guests)</span>' +
            '<span style="font-size:0.68rem;font-weight:700;color:#991B1B;background:#FFFFFF;border:1px solid #F87171;border-radius:999px;padding:1px 8px;">Standard 0.75" / 19mm Round Labels (Avery 5460/5468)</span>' +
          '</div>' +
          '<div style="font-size:0.78rem;color:#4B5563;margin-top:2px;">Peel-and-stick color-coded indicator dots to attach directly onto place cards for effortless catering pass recognition.</div>' +
        '</div>' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
          '<button type="button" class="btn btn-secondary" onclick="window.shPrintAllergyDotsSheet()" style="padding:6px 12px;font-size:0.73rem;background:#FFFFFF;border-color:#DC2626;color:#991B1B;font-weight:800;">🖨️ Print Allergy Dots Sheet (PDF)</button>' +
        '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;">' + (dotsHtml || '<div style="grid-column:1/-1;text-align:center;padding:12px;font-size:12px;color:#6B7280;">No dietary allergies or special meals currently assigned.</div>') + '</div>' +
    '</div>';
  };

  window.shPrintAllergyDotsSheet = function() {
    var plan = window.__SH_STATE; if (!plan || !plan.tables) return;
    var tablesArr = plan.tables || [];
    var eventTitle = plan.coupleNames || plan.title || 'Wedding Reception';
    var flaggedGuests = [];

    tablesArr.forEach(function(t) {
      (t.guests || []).forEach(function(g, idx) {
        var mb = (typeof shMealBadge === 'function') ? shMealBadge(g.meal) : { short: 'Other' };
        var isSpecial = Boolean(g.allergy || mb.short === 'Vegan' || mb.short === 'Veg' || mb.short === 'Kids');
        if (isSpecial) {
          flaggedGuests.push({
            name: g.name,
            tableName: t.name || ('Table ' + t.number),
            seatNumber: idx + 1,
            allergy: g.allergy,
            meal: mb.short
          });
        }
      });
    });

    var itemsHtml = flaggedGuests.map(function(d) {
      var isSevere = Boolean(d.allergy);
      var dotColor = isSevere ? '#DC2626' : (d.meal === 'Vegan' ? '#059669' : (d.meal === 'Veg' ? '#10B981' : '#2563EB'));
      return '<div style="width:1.2in;height:1.2in;border:1px dashed #D1D5DB;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:4px;box-sizing:border-box;">' +
        '<div style="font-size:9px;font-weight:800;color:' + dotColor + ';text-transform:uppercase;">' + (isSevere ? '⚠ ALLERGY' : d.meal) + '</div>' +
        '<div style="font-size:10px;font-weight:700;color:#111827;line-height:1.1;margin:2px 0;">' + shEsc(d.name) + '</div>' +
        '<div style="font-size:8px;color:#4B5563;">' + shEsc(d.tableName) + ' &bull; #' + d.seatNumber + '</div>' +
        (d.allergy ? '<div style="font-size:8px;font-weight:700;color:#991B1B;margin-top:1px;">' + shEsc(d.allergy) + '</div>' : '') +
      '</div>';
    }).join('');

    var printWin = window.open('', '_blank');
    if (!printWin) { window.print(); return; }
    printWin.document.write('<!DOCTYPE html><html><head><title>Avery Allergy Dots - ' + shEsc(eventTitle) + '</title><style>@page { size: 8.5in 11in; margin: 0.5in; } body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; } @media print { .sh-no-print { display: none !important; } } </style></head><body><div class="sh-no-print" style="padding:12px;background:#991B1B;color:#FFFFFF;display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-radius:6px;"><span>Dietary Allergy Place Card Alert Dots (' + flaggedGuests.length + ' Labels)</span><button onclick="window.print()" style="padding:6px 14px;background:#FFFFFF;color:#991B1B;border:none;border-radius:4px;font-weight:bold;cursor:pointer;">🖨️ Print Dot Sheet</button></div><div style="display:flex;flex-wrap:wrap;gap:12px;align-content:flex-start;">' + itemsHtml + '</div></body></html>');
    printWin.document.close();
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

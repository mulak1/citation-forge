/**
 * SeatHarmony (#2) - Vault Print Views: 24"x36" Welcome Sign Poster & Avery 5302 Place Cards
 */
const { escapeHtml } = require('./templates');
const {
  renderTopPrintBar,
  buildRealQrUrl,
  buildInlineQrDataUri,
  computeMonogram,
  parseMonogramParts,
  extractAllSeatedGuests,
  mealSymbolInfo,
  VR_LOCK_SVG,
  VR_PRINT_SVG
} = require('./vault-helpers');

function renderPosterPrintPage(vault, urls, query = {}) {
      const baseUrl = urls && urls.vault ? urls.vault.split('/vault/')[0] : '';
      const theme = String(query.theme || (vault.state && vault.state.posterTheme) || 'alabaster').toLowerCase();
      const sortMode = String(query.sort || (vault.state && vault.state.posterSort) || 'alphabetical').toLowerCase();
      const showMap = query.map !== '0' && (!vault.state || vault.state.posterShowMap !== false);
      const customKicker = String(query.kicker || (vault.state && vault.state.signKicker) || 'Please Find Your Seat').trim();
      const guests = extractAllSeatedGuests(vault.state).sort((a, b) => a.lastName.localeCompare(b.lastName));
      const tables = Array.isArray(vault.state.tables) ? vault.state.tables : [], landmarks = Array.isArray(vault.state.landmarks) ? vault.state.landmarks : [];
      const monoParts = parseMonogramParts(query.monogram || (vault.state && vault.state.signMonogram), vault.title);
      const monogram = monoParts.initials, monogramSub = monoParts.sub, monogramInputVal = monoParts.raw;
      const monoFontRem = monogram.length > 5 ? '0.95rem' : (monogram.length > 3 ? '1.22rem' : '1.52rem'), qrImgUrl = buildRealQrUrl(urls.qr_lookup), fallbackQrUri = buildInlineQrDataUri(urls.qr_lookup);
      const buyPackUrl = `/buy/complete_dossier?target=${encodeURIComponent(vault.title || vault.vaultId)}&vault=${encodeURIComponent(vault.vaultId)}${vault.ownerEmail ? `&email=${encodeURIComponent(vault.ownerEmail)}` : ''}`;
      const posterColCount = guests.length > 185 ? 5 : (guests.length > 115 ? 4 : 3);
      const customSize = String(query.size || (vault.state && vault.state.posterFontSize) || '').toLowerCase();
      const baseSizeRem = customSize === 'large' ? 1.05 : (customSize === 'compact' ? 0.78 : (posterColCount === 5 ? 0.82 : (posterColCount === 4 ? 0.88 : 0.94)));
      const guestNameFontSize = baseSizeRem + 'rem';

      const POSTER_THEMES = {
        alabaster: { label: 'Parisian Gold', short: 'Gold', bg: '#FAF6EE', fg: '#181412', sub: '#57534E', accent: '#8C2D19', border: '#C8A96E' },
        ivory: { label: 'Botanical Ivory', short: 'Ivory', bg: '#FCFBF7', fg: '#1F291E', sub: '#4B5D48', accent: '#2C3E2B', border: '#7D8C6D' },
        obsidian: { label: 'Editorial Noir', short: 'Noir', bg: '#141210', fg: '#FAF8F5', sub: '#D6CFC2', accent: '#FDE68A', border: '#C8A96E' },
        sage: { label: 'Tuscan Sage', short: 'Sage', bg: '#EFF5F1', fg: '#14291E', sub: '#3E5C4A', accent: '#064E3B', border: '#4D7C5D' },
        rosewater: { label: 'Blush Rosewater', short: 'Rosewater', bg: '#FDF4F5', fg: '#3B1821', sub: '#7D4250', accent: '#6B2134', border: '#D48C96' },
        terracotta: { label: 'Villa Terracotta', short: 'Terracotta', bg: '#FDF6F0', fg: '#2E160B', sub: '#7C4327', accent: '#7C2D12', border: '#B45309' }
      };
      const tSpec = POSTER_THEMES[theme] || POSTER_THEMES.alabaster, { bg, fg, sub, accent, border } = tSpec;

      let bodyGridHtml = '';
      if (sortMode === 'by_table') {
        bodyGridHtml = tables.map((t, idx) => {
          if (idx >= 1 && !vault.isUnlocked) {
            return `<div style="border-bottom:1px solid rgba(200,169,110,0.35);padding-bottom:12px;"><div class="serif" style="font-size:1.35rem;color:${accent};margin-bottom:6px;border-bottom:1px solid ${border};padding-bottom:3px;">Table ${t.number || (idx + 1)} &middot; ${escapeHtml(t.name || '')}</div><div style="font-size:0.82rem;font-weight:700;color:${sub};padding:8px;border-radius:8px;background:rgba(200,169,110,0.12);border:1px dashed ${border};">${VR_LOCK_SVG}${(t.guests || []).length} Seated Guests &mdash; Unlock 24&Prime;&times;36&Prime; Print Pack ($7)</div></div>`;
          }
          return `<div style="border-bottom:1px solid rgba(200,169,110,0.35);padding-bottom:12px;"><div class="serif" style="font-size:1.35rem;color:${accent};margin-bottom:6px;border-bottom:1px solid ${border};padding-bottom:3px;">Table ${t.number || (idx + 1)} &middot; ${escapeHtml(t.name || '')}${!vault.isUnlocked ? ' (Free Sample)' : ''}</div>${(t.guests || []).map(g => `<div style="font-size:0.92rem;padding:2px 0;display:flex;justify-content:space-between;"><span>${escapeHtml(g.name)}</span><span style="font-size:0.75rem;color:${sub};">${escapeHtml(g.role || '')}</span></div>`).join('')}</div>`;
        }).join('');
      } else {
        const visibleGuests = vault.isUnlocked ? guests : guests.filter(g => g.tableNumber === 1), groups = {};
        visibleGuests.forEach(g => { const letter = (g.lastName[0] || 'A').toUpperCase(); if (!groups[letter]) groups[letter] = []; groups[letter].push(g); });
        bodyGridHtml = Object.keys(groups).sort().map(letter => `<div style="margin-bottom:10px;break-inside:avoid;"><div class="serif" style="font-size:1.35rem;color:${accent};border-bottom:1.5px solid ${border};margin-bottom:4px;">${escapeHtml(letter)}</div>${groups[letter].map(g => `<div style="display:flex;justify-content:space-between;gap:8px;font-size:${guestNameFontSize};padding:2px 0;border-bottom:1px dotted rgba(200,169,110,0.3);"><span><strong>${escapeHtml(g.lastName)}</strong>${g.posterRestName ? `, ${escapeHtml(g.posterRestName)}` : ''}</span><span class="mono" style="font-weight:700;color:${accent};">Table ${g.tableNumber}${!vault.isUnlocked ? ' (Sample)' : ''}</span></div>`).join('')}</div>`).join('') + (!vault.isUnlocked ? `<div style="grid-column:1 / -1;padding:14px 16px;border-radius:12px;background:rgba(200,169,110,0.12);border:1.5px dashed ${border};font-size:0.86rem;font-weight:800;color:${fg};display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;"><span>${VR_LOCK_SVG}Tables 2&ndash;${tables.length} Guest Names (${Math.max(0, guests.length - visibleGuests.length)} Additional Seated Guests) &mdash; Unlock 24&Prime;&times;36&Prime; Print-Shop Poster ($7 Pack)</span><span style="font-size:12px;color:#78350F;font-weight:700;background:#FFFBEB;border:1px solid #FDE68A;padding:2px 8px;border-radius:6px;">&#10003; 30-Day Guarantee &bull; 0.125&Prime; Bleed</span></div><a href="${buyPackUrl}" style="background:#1B4D3E;color:#FFFFFF;border:1px solid #14382D;border-radius:999px;padding:6px 14px;font-size:0.78rem;font-weight:800;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">${VR_LOCK_SVG}Unlock 24&Prime;&times;36&Prime; Print Pack ($7) &rarr;</a></div>` : '');
      }

      const extraPosterQs = `&kicker=${encodeURIComponent(customKicker)}&monogram=${encodeURIComponent(monogramInputVal)}`;
      const themePillsHtml = Object.keys(POSTER_THEMES).map(k =>
        `<a href="${urls.print_poster}?sort=${encodeURIComponent(sortMode)}&theme=${k}&map=${showMap ? '1' : '0'}${extraPosterQs}" style="padding:5px 10px;border-radius:999px;font-size:0.72rem;font-weight:800;text-decoration:none;white-space:nowrap;${theme === k ? 'background:#FAF3E3;color:#8C2D19;border:1.5px solid #8C2D19;' : 'background:#FAF6EE;color:#44403C;border:1px solid #E2D9C8;'}" title="${escapeHtml(POSTER_THEMES[k].label)}">${escapeHtml(POSTER_THEMES[k].short)}</a>`
      ).join('');
      let minX = 1120, maxX = 0, minY = 9999, maxY = 0;
      tables.forEach(tb => { const tx = tb.x || 250, ty = tb.y || 200; if (tx - 115 < minX) minX = tx - 115; if (tx + 115 > maxX) maxX = tx + 115; if (ty - 95 < minY) minY = ty - 95; if (ty + 95 > maxY) maxY = ty + 95; });
      landmarks.forEach(lm => { const lx = lm.x || 560, ly = lm.y || 340, lw = Math.max(185, lm.w || 150) / 2 + 24, lh = (lm.h || 42) / 2 + 24; if (lx - lw < minX) minX = lx - lw; if (lx + lw > maxX) maxX = lx + lw; if (ly - lh < minY) minY = ly - lh; if (ly + lh > maxY) maxY = ly + lh; });
      const vx = Math.max(0, Math.floor(minX)), vy = Math.max(0, Math.floor(minY)), vw = Math.max(540, Math.ceil(maxX - vx)), vh = Math.max(340, Math.ceil(maxY - vy));
      const isDark = theme === 'obsidian', tblFill = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.45)', lmFill = isDark ? 'rgba(200,169,110,0.08)' : 'rgba(200,169,110,0.10)';
      const lmSvg = landmarks.map(lm => { const sLm = String(lm.label || '').replace(/\s*\([^)]*\)/g, '').replace(/\s*&\s*ACCESSIBLE EXIT/i, '').replace(/\s*&\s*SUBWOOFER/i, '').trim(), lw = Math.max(165, lm.w || 150, sLm.length * 10 + 28), lh = Math.max(46, lm.h || 44); return `<g transform="translate(${lm.x || 560},${lm.y || 340}) rotate(${lm.rot || 0})"><rect x="${-lw / 2}" y="${-lh / 2}" width="${lw}" height="${lh}" rx="10" fill="${lmFill}" stroke="${border}" stroke-width="2" stroke-dasharray="6 4"/><text x="0" y="5" text-anchor="middle" fill="${sub}" font-size="14" font-weight="800" letter-spacing="0.07em">${escapeHtml(sLm)}</text></g>`; }).join('');
      const tblSvg = tables.map((t, i) => {
        const tx = t.x || 250, ty = t.y || 200, sh = String(t.shape || 'round').toLowerCase(), num = t.number || (i + 1), isSw = sh.includes('sweet');
        const chairs = sh === 'round' ? Array.from({ length: Math.min(12, t.capacity || 8) }, (_, ci) => { const ca = -Math.PI / 2 + (2 * Math.PI * ci) / Math.min(12, t.capacity || 8); return `<circle cx="${(tx + 72 * Math.cos(ca)).toFixed(1)}" cy="${(ty + 72 * Math.sin(ca)).toFixed(1)}" r="5.8" fill="${tblFill}" stroke="${border}" stroke-width="1.8"/>`; }).join('') : '';
        const shapeNode = sh === 'round' ? `${chairs}<circle cx="${tx}" cy="${ty}" r="62" fill="${tblFill}" stroke="${border}" stroke-width="3.2"/><circle cx="${tx}" cy="${ty}" r="56" fill="none" stroke="${border}" stroke-width="1" opacity="0.5"/>` : `<g transform="translate(${tx},${ty}) rotate(${t.rotation || 0})"><rect x="-86" y="-36" width="172" height="72" rx="16" fill="${tblFill}" stroke="${border}" stroke-width="3.2"/><rect x="-81" y="-31" width="162" height="62" rx="12" fill="none" stroke="${border}" stroke-width="1" opacity="0.5"/></g>`;
        const labelNode = isSw ? `<text x="${tx}" y="${ty - 2}" text-anchor="middle" fill="${fg}" class="serif" font-size="24" font-style="italic">Sweetheart</text><text x="${tx}" y="${ty + 17}" text-anchor="middle" fill="${sub}" font-size="12.5" font-weight="800">TABLE 1 &middot; ${(t.guests || []).length} SEATS</text>` : `<text x="${tx}" y="${ty - 17}" text-anchor="middle" fill="${sub}" font-size="11.5" font-weight="800" letter-spacing="0.16em">TABLE</text><text x="${tx}" y="${ty + 12}" text-anchor="middle" fill="${fg}" class="serif" font-size="38">${num}</text><text x="${tx}" y="${ty + 29}" text-anchor="middle" fill="${sub}" font-size="12.5" font-weight="700">${(t.guests || []).length} Guests</text>`;
        return `${shapeNode}${labelNode}`;
      }).join('');
      const posterMiniMapBlock = `<div id="poster-mini-map-wrap" style="display:${showMap ? 'block' : 'none'};margin:0 0 24px;padding:0 0 18px;border-bottom:1.5px solid ${border};background:transparent;"><div class="mono poster-mini-map-header" style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;font-size:0.70rem;font-weight:800;letter-spacing:0.14em;color:${sub};"><span>&#10022; RECEPTION TABLE LAYOUT (${tables.length} TABLES)</span><span>FIND YOUR NAME BELOW &rarr; LOCATE YOUR TABLE</span></div><svg viewBox="${vx} ${vy} ${vw} ${vh}" preserveAspectRatio="xMidYMid meet" style="width:100%;max-height:380px;height:auto;display:block;background:transparent;border:none;">${lmSvg}${tblSvg}</svg></div>`;

      const proofWatermarkHtml = vault.isUnlocked ? '' : `<div class="proof-wm" aria-hidden="true"><span>Preview Sample &bull; Unlock Full Print Sign at SeatHarmony.com</span></div>`;
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>24"×36" Welcome Sign | ${escapeHtml(vault.title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #F4EFE6; color: #181412; font-family: 'Plus Jakarta Sans', sans-serif; }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 700; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .poster-sheet { max-width: 960px; min-height: 1380px; margin: 20px auto 48px; background: ${bg}; color: ${fg}; border: 3px double ${border}; padding: 48px 44px; position: relative; box-shadow: 0 22px 54px rgba(24,20,18,0.10); display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
    .poster-header-row { display: flex; align-items: center; justify-content: space-between; gap: 18px; border-bottom: 2px solid ${border}; padding-bottom: 22px; margin-bottom: 26px; }
    .poster-header-left { display: flex; align-items: center; gap: 16px; min-width: 0; flex: 1; }
    .poster-guest-grid { display: grid; grid-template-columns: repeat(${posterColCount}, 1fr); gap: ${posterColCount >= 4 ? '16px' : '22px'}; }
    .proof-wm { display: none; position: absolute; inset: 0; pointer-events: none; align-items: center; justify-content: center; z-index: 50; }
    .proof-wm span { transform: rotate(-32deg); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.35rem; font-weight: 700; letter-spacing: 0.08em; color: rgba(140,45,25,0.22); border: 2px dashed rgba(140,45,25,0.28); padding: 16px 24px; border-radius: 14px; text-align: center; }
    @media screen and (max-width: 760px) {
      .poster-sheet { margin: 12px 10px 32px; padding: 24px 18px; min-height: auto; }
      .poster-header-row { flex-direction: column; align-items: stretch; gap: 14px; }
      .poster-header-left { width: 100%; align-items: flex-start; gap: 12px; }
      .poster-guest-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
      #poster-live-h1 { font-size: clamp(1.65rem, 6vw, 2.4rem) !important; }
    }
    @media print {
      @page { size: 24in 36in; margin: 0; }
      body { background: ${bg}; }
      .no-print { display: none !important; }
      .proof-wm { display: flex !important; }
      .poster-sheet { margin: 0; max-width: none; width: 100%; min-height: 100vh; box-shadow: none; }
      .poster-guest-grid { grid-template-columns: repeat(${posterColCount}, 1fr) !important; gap: ${posterColCount >= 4 ? '16px' : '22px'} !important; }
    }
  </style>
</head>
<body>
  ${renderTopPrintBar({ vault, activeRoute: 'poster', baseUrl })}
  <div class="no-print" style="max-width:960px;margin:16px auto 0;padding:12px 16px;background:#FFFFFF;border:1.5px solid #D8C29D;border-radius:14px;display:flex;flex-direction:column;gap:10px;color:#181412;box-shadow:0 8px 24px rgba(24,20,18,0.05);">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
      <div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center;">
        <span class="mono" style="font-size:0.68rem;color:#8C2D19;font-weight:800;white-space:nowrap;">SORT:</span>
        <a href="${urls.print_poster}?sort=alphabetical&theme=${encodeURIComponent(theme)}&map=${showMap ? '1' : '0'}${extraPosterQs}" style="padding:5px 10px;border-radius:999px;font-size:0.72rem;font-weight:800;text-decoration:none;white-space:nowrap;${sortMode !== 'by_table' ? 'background:#FAF3E3;color:#8C2D19;border:1.5px solid #8C2D19;' : 'background:#FAF6EE;color:#44403C;border:1px solid #E2D9C8;'}">Sort A-Z</a>
        <a href="${urls.print_poster}?sort=by_table&theme=${encodeURIComponent(theme)}&map=${showMap ? '1' : '0'}${extraPosterQs}" style="padding:5px 10px;border-radius:999px;font-size:0.72rem;font-weight:800;text-decoration:none;white-space:nowrap;${sortMode === 'by_table' ? 'background:#FAF3E3;color:#8C2D19;border:1.5px solid #8C2D19;' : 'background:#FAF6EE;color:#44403C;border:1px solid #E2D9C8;'}">By Table (1..${tables.length})</a>
        <button type="button" onclick="var m=document.getElementById('poster-mini-map-wrap');var on=m.style.display==='none';m.style.display=on?'block':'none';this.textContent='Mini Layout: '+(on?'ON':'OFF');" style="padding:5px 10px;border-radius:999px;font-size:0.72rem;font-weight:800;cursor:pointer;background:#FAF3E3;color:#8C2D19;border:1.5px solid #8C2D19;">&#8862; Mini Layout: ${showMap ? 'ON' : 'OFF'}</button>
        <span class="mono" style="font-size:0.68rem;color:#8C2D19;font-weight:800;margin-left:4px;white-space:nowrap;">THEMES:</span>
        ${themePillsHtml}
      </div>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
        ${vault.isUnlocked
          ? `<button type="button" onclick="window.print()" style="background:linear-gradient(135deg,#FDE68A,#C8A96E);color:#181412;border:1.5px solid #B89352;border-radius:10px;padding:8px 14px;font-weight:800;font-size:0.78rem;cursor:pointer;white-space:nowrap;">${VR_PRINT_SVG}Print 24&Prime;&times;36&Prime; PDF</button>`
          : `<a href="${buyPackUrl}" style="background:#1B4D3E;color:#FFFFFF;border:1px solid #14382D;border-radius:10px;padding:8px 14px;font-weight:800;font-size:0.78rem;text-decoration:none;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">${VR_LOCK_SVG}Unlock 24&Prime;&times;36&Prime; Print Pack ($7) &rarr;</a><button type="button" onclick="window.print()" style="background:#FAF6EE;color:#57534E;border:1px solid #D6CFC2;border-radius:10px;padding:8px 11px;font-weight:700;font-size:0.74rem;cursor:pointer;white-space:nowrap;">${VR_PRINT_SVG}Print Sample Proof</button>`}
      </div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;font-size:0.75rem;color:#44403C;">
      <label style="display:flex;align-items:center;gap:6px;white-space:nowrap;font-weight:700;">Headline:
        <input type="text" value="${escapeHtml(customKicker)}" oninput="document.getElementById('poster-live-h1').textContent=this.value||'Please Find Your Seat'" style="padding:4px 8px;border-radius:6px;border:1px solid #C8A96E;background:#FAF6EE;color:#181412;font-weight:700;font-size:16px;width:190px;" />
      </label>
      <label style="display:flex;align-items:center;gap:6px;white-space:nowrap;font-weight:700;">Crest:
        <input type="text" value="${escapeHtml(monogramInputVal)}" oninput="window.updatePosterCrest(this.value)" style="padding:4px 8px;border-radius:6px;border:1px solid #C8A96E;background:#FAF6EE;color:#8C2D19;font-weight:800;font-size:16px;width:145px;" />
      </label>
      <label style="display:flex;align-items:center;gap:6px;white-space:nowrap;font-weight:700;">Subtitle:
        <input type="text" value="${escapeHtml(vault.title)} · ${escapeHtml(vault.venueName)}" oninput="document.getElementById('poster-live-sub').textContent=this.value" style="padding:4px 8px;border-radius:6px;border:1px solid #C8A96E;background:#FAF6EE;color:#181412;font-weight:600;font-size:16px;width:270px;" />
      </label>
    </div>
  </div>
  <div class="no-print" style="max-width:960px;margin:8px auto 0;padding:10px 16px;background:#FAF8F5;border:1px solid #E4DCD0;border-radius:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:0.76rem;color:#57534E;">
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
      <span style="font-weight:800;color:#1B4D3E;">&#10003; FedEx &amp; Staples Spec:</span>
      <span>Arch D 24&Prime; &times; 36&Prime; &bull; 0.125&Prime; bleed included &bull; 300 DPI vector rendering &bull; Mount on &frac31;&#8326;&Prime; foam board (matte finish).</span>
      <button type="button" onclick="navigator.clipboard.writeText('Print at Arch D 24x36 inches, matte finish, mounted on 3/16 inch white foam core board. Full bleed trim.');this.textContent='✓ Copied Print Shop Note!';var b=this;setTimeout(function(){b.textContent='Copy Print Shop Note';},2000);" style="cursor:pointer;background:#FAF3E3;color:#8C2D19;border:1px solid #C8A96E;padding:3px 9px;border-radius:6px;font-size:0.72rem;font-weight:800;white-space:nowrap;">Copy Print Shop Note</button>
    </div>
    <div style="display:flex;align-items:center;gap:12px;font-weight:700;">
      <span style="color:#0369A1;">Standard Easel Ready</span>
      <span style="color:#1B4D3E;">Zero Flash Glare</span>
    </div>
  </div>
  <script>
    window.updatePosterCrest = function(rawVal) {
      var raw = String(rawVal || '').trim();
      var parts = raw.split(/\\s*(?:·|•|\\|)\\s*/).filter(Boolean);
      var initStr = 'M&L', subStr = 'EST. 2026';
      if (parts.length >= 2) {
        initStr = parts[0].trim() || 'M&L';
        subStr = parts.slice(1).join(' · ').trim() || 'EST. 2026';
      } else if (raw) {
        var m = raw.match(/^(.+?)\\s+(EST\\.?\\s*\\d{2,4}.*)$/i);
        if (m) { initStr = m[1].replace(/[-–—]+$/, '').trim() || 'M&L'; subStr = m[2].trim(); }
        else { initStr = raw; }
      }
      var mEl = document.getElementById('poster-live-mono');
      var sEl = document.getElementById('poster-live-est');
      if (mEl) {
        mEl.textContent = initStr;
        mEl.style.fontSize = initStr.length > 5 ? '0.95rem' : (initStr.length > 3 ? '1.22rem' : '1.52rem');
      }
      if (sEl) sEl.textContent = subStr;
    };
  </script>

  <div class="poster-sheet">
    ${proofWatermarkHtml}
    <div>
      <div class="poster-header-row">
        <div class="poster-header-left">
          <div style="width:74px;height:74px;padding:6px;border-radius:16px;background:${theme === 'obsidian' ? '#181412' : '#FAF3E3'};border:2px solid ${border};color:${theme === 'obsidian' ? '#FDE68A' : accent};display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;text-align:center;">
            <span id="poster-live-mono" class="serif" style="font-size:${monoFontRem};line-height:1;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(monogram)}</span>
            <span id="poster-live-est" class="mono" style="font-size:0.50rem;line-height:1.1;color:${theme === 'obsidian' ? '#C8A96E' : sub};margin-top:4px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(monogramSub)}</span>
          </div>
          <div style="min-width:0;flex:1;">
            <div class="mono" style="font-size:0.74rem;letter-spacing:0.16em;text-transform:uppercase;color:${accent};font-weight:800;">
              WELCOME TO OUR RECEPTION
            </div>
            <h1 id="poster-live-h1" class="serif" style="font-size:2.75rem;line-height:1.06;color:${fg};margin:2px 0;">${escapeHtml(customKicker)}</h1>
            <div id="poster-live-sub" style="font-size:1.02rem;color:${sub};font-weight:600;">${escapeHtml(vault.title)} &bull; ${escapeHtml(vault.venueName)}</div>
          </div>
        </div>
        <div style="text-align:center;background:rgba(200,169,110,0.12);border:1.5px solid ${border};border-radius:14px;padding:8px 12px;flex-shrink:0;">
          <img src="${qrImgUrl}" onerror="this.onerror=null;this.src='${fallbackQrUri}'" width="76" height="76" alt="Scan to Find Your Seat QR" style="display:block;margin:0 auto 4px;border-radius:6px;" />
          <div class="mono" style="font-size:0.60rem;font-weight:800;color:${accent};white-space:nowrap;">SCAN FOR SEAT MAP</div>
        </div>
      </div>
      ${posterMiniMapBlock}
      <div class="poster-guest-grid">${bodyGridHtml}</div>
    </div>
    <div style="margin-top:32px;padding-top:14px;border-top:1.5px solid ${border};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;font-size:0.78rem;color:${sub};">
      <span>${escapeHtml(vault.title)} &bull; ${escapeHtml(vault.venueName)}</span>
      <span class="serif" style="font-style:italic;font-size:0.88rem;">We are so glad you are here &bull; Dinner, Drinks &amp; Dancing</span>
    </div>
  </div>
  ${query.auto_print === '1' ? '<script>window.addEventListener("DOMContentLoaded", function() { setTimeout(function() { window.print(); }, 400); });</script>' : ''}
</body>
</html>`;
  return html;
}

function renderAveryPrintPage(vault, urls, query = {}) {
      const baseUrl = urls && urls.vault ? urls.vault.split('/vault/')[0] : '';
      const guests = extractAllSeatedGuests(vault.state);
      const sortBy = String(query.sort || 'table').toLowerCase();
      const sortedGuests = [...guests].sort((a, b) => {
        if (sortBy === 'alpha') return (a.lastName || a.name).localeCompare(b.lastName || b.name);
        return a.tableNumber - b.tableNumber || a.seatNumber - b.seatNumber;
      });
      const monogram = computeMonogram(vault.title);
      const buyPackUrl = `/buy/complete_dossier?target=${encodeURIComponent(vault.title || vault.vaultId)}&vault=${encodeURIComponent(vault.vaultId)}${vault.ownerEmail ? `&email=${encodeURIComponent(vault.ownerEmail)}` : ''}`;

      const isSampleSheet = query.sample === '1' || query.sample === 'sheet';
      const visibleAveryGuests = vault.isUnlocked ? sortedGuests : (isSampleSheet ? sortedGuests.slice(0, 4) : sortedGuests.slice(0, 1));
      const remainingCount = Math.max(0, guests.length - visibleAveryGuests.length);
      const cardsHtml = visibleAveryGuests.map((g, gIdx) => {
        const mealInfo = mealSymbolInfo(g.meal);
        const hasAllergy = g.allergy && g.allergy !== 'None';
        const cleanAccess = String(g.accessibility || '').replace(/[^A-Za-z0-9\s()-]/g, '').trim();
        const hasChairMod = cleanAccess && cleanAccess !== 'Standard Chair';
        return `
        <div class="tent-card">
          <div class="tent-back">
            <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
              <span class="mono" style="font-size:0.65rem;font-weight:800;color:#57534E;white-space:nowrap;">TBL ${g.tableNumber} &bull; SEAT #${g.seatNumber} (${escapeHtml(g.clockLabel)})${!vault.isUnlocked ? ` &bull; SAMPLE CARD #${gIdx + 1}` : ''}</span>
              <span class="mono" style="font-size:0.68rem;font-weight:800;color:${mealInfo.color};white-space:nowrap;">${mealInfo.sym} ${escapeHtml(mealInfo.code)}</span>
            </div>
            <div style="margin-top:4px;font-size:0.74rem;font-weight:800;color:${hasAllergy ? '#B91C1C' : '#065F46'};white-space:nowrap;">
              ${hasAllergy ? `KITCHEN ALERT: ${escapeHtml(g.allergy.toUpperCase())}` : '&#10003; Standard Kitchen Prep (No Allergy)'}
            </div>
            ${hasChairMod ? `<div style="font-size:0.68rem;font-weight:800;color:#78350F;margin-top:2px;white-space:nowrap;">CHAIR MOD: ${escapeHtml(cleanAccess.toUpperCase())}</div>` : ''}
          </div>
          <div class="tent-fold-line"></div>
          <div class="tent-front">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="mono" style="font-size:0.64rem;font-weight:800;color:#8C2D19;border:1px solid #C8A96E;padding:1px 6px;border-radius:4px;">${escapeHtml(monogram)}</span>
              <span title="${escapeHtml(mealInfo.label)}" style="font-size:1.15rem;color:${mealInfo.color};">${mealInfo.sym}</span>
            </div>
            <div class="serif" style="font-size:1.38rem;color:#181412;margin:6px 0 2px;line-height:1.12;">${escapeHtml(g.name)}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.74rem;font-weight:800;color:#57534E;border-top:1px solid #EAE2D3;padding-top:4px;">
              <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(String(g.tableName || '').startsWith('Table') ? g.tableName : `Table ${g.tableNumber} · ${g.tableName}`)}</span>
              <span class="mono" style="color:#8C2D19;white-space:nowrap;">Seat #${g.seatNumber}</span>
            </div>
          </div>
        </div>`;
      }).join('') + (!vault.isUnlocked ? `
      <div class="tent-card" style="padding:20px;display:flex;flex-direction:column;justify-content:space-between;background:#FAF8F5;border:2px dashed #1B4D3E;border-radius:12px;min-height:160px;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span class="mono" style="font-size:0.68rem;font-weight:800;color:#1B4D3E;background:#ECFDF5;border:1px solid #A7F3D0;padding:2px 8px;border-radius:999px;">${remainingCount} MORE CARDS READY</span>
            <span style="font-size:0.72rem;font-weight:700;color:#78350F;background:#FFFBEB;border:1px solid #FDE68A;padding:2px 7px;border-radius:6px;">&#10003; 30-Day Guarantee</span>
          </div>
          <h4 class="serif" style="font-size:1.25rem;margin-bottom:6px;color:#181412;">Unlock All ${guests.length} Avery 5302 Place Cards</h4>
          <p style="font-size:0.80rem;color:#574F49;line-height:1.45;">Pre-formatted 4-up for Avery 5302 &amp; 5011 sheets. Features guest monogram, table/seat #, meal symbols, and 180&deg; upside-down kitchen allergy alerts for servers.</p>
        </div>
        <div style="margin-top:14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <a href="${buyPackUrl}" style="background:#1B4D3E;color:#FFFFFF;border-radius:8px;padding:9px 16px;font-size:0.82rem;font-weight:800;text-decoration:none;display:inline-block;">${VR_LOCK_SVG}Unlock All ${guests.length} Place Cards ($7) &rarr;</a>
          <span style="font-size:0.74rem;color:#78350F;font-weight:700;">&#10003; 4 Cards / Sheet</span>
        </div>
      </div>` : '');

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Avery 5302 Place Cards (${guests.length} Guests) | ${escapeHtml(vault.title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #F4EFE6; color: #181412; font-family: 'Plus Jakarta Sans', sans-serif; }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 700; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .sheet-grid { max-width: 900px; margin: 20px auto 60px; padding: 24px; background: #FFFFFF; border: 1.5px solid #C8A96E; box-shadow: 0 16px 40px rgba(0,0,0,0.08); display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; position: relative; }
    .tent-card { border: 1.5px dashed #C8A96E; border-radius: 10px; background: #FAF8F5; overflow: hidden; break-inside: avoid; }
    .tent-back { padding: 10px 14px; background: #FFF5F5; transform: rotate(180deg); border-top: 1px solid #FECDD3; min-height: 68px; display: flex; flex-direction: column; justify-content: center; }
    .tent-fold-line { border-top: 1px dashed #D6CFC2; height: 1px; background: transparent; }
    .tent-front { padding: 12px 16px; background: #FFFFFF; min-height: 92px; display: flex; flex-direction: column; justify-content: space-between; }
    .proof-wm { display: none; position: fixed; inset: 0; pointer-events: none; align-items: center; justify-content: center; z-index: 50; }
    .proof-wm span { transform: rotate(-28deg); font-family: 'JetBrains Mono', monospace; font-size: 1.35rem; font-weight: 800; letter-spacing: 0.12em; color: rgba(140,45,25,0.22); border: 3px dashed rgba(140,45,25,0.28); padding: 14px 22px; border-radius: 12px; }
    @media print {
      body { background: #FFFFFF; }
      .no-print { display: none !important; }
      .proof-wm { display: flex !important; }
      .sheet-grid { margin: 0; border: none; box-shadow: none; padding: 0.25in; }
    }
  </style>
</head>
<body>
  ${renderTopPrintBar({ vault, activeRoute: 'avery', baseUrl })}
  <div class="no-print" style="max-width:900px;margin:18px auto 0;padding:0 16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
    <div>
      <div class="mono" style="font-size:0.72rem;font-weight:800;color:#8C2D19;">AVERY 5302 / 5011 SMALL TENT CARDS &bull; ${guests.length} SEATED GUESTS</div>
      <div style="font-size:0.80rem;color:#44403C;">Legend: <strong>&#9670; Beef</strong> &bull; <strong>&#9679; Fish</strong> &bull; <strong>&#9650; Vegan</strong> &bull; <strong>&#9733; Kids</strong> &bull; Back fold rotated 180&deg; for servers</div>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:6px;">
        <a href="?sort=table" style="font-size:0.70rem;font-weight:800;padding:2px 8px;border-radius:6px;text-decoration:none;${sortBy !== 'alpha' ? 'background:#1B4D3E;color:#FFFFFF;' : 'background:#FAF6EE;color:#57534E;border:1px solid #D8C29D;'}">Sort: Table &amp; Seat</a>
        <a href="?sort=alpha" style="font-size:0.70rem;font-weight:800;padding:2px 8px;border-radius:6px;text-decoration:none;${sortBy === 'alpha' ? 'background:#1B4D3E;color:#FFFFFF;' : 'background:#FAF6EE;color:#57534E;border:1px solid #D8C29D;'}">Sort: Alphabetical A&ndash;Z (Escort Table)</a>
      </div>
    </div>
    <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
      ${vault.isUnlocked
        ? `<button type="button" onclick="window.print()" style="background:#1B4D3E;color:#FFFFFF;border:1px solid #14382D;border-radius:10px;padding:9px 16px;font-weight:800;font-size:0.80rem;cursor:pointer;white-space:nowrap;">${VR_PRINT_SVG}Print All ${guests.length} Avery 5302 Cards (PDF)</button>`
        : `<a href="${buyPackUrl}" style="background:#1B4D3E;color:#FFFFFF;border:1px solid #14382D;border-radius:10px;padding:9px 16px;font-weight:800;font-size:0.80rem;text-decoration:none;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">${VR_LOCK_SVG}Unlock Avery 5302 Print Pack ($7) &rarr;</a><button type="button" onclick="window.print()" style="background:#FAF6EE;color:#57534E;border:1px solid #D6CFC2;border-radius:10px;padding:9px 12px;font-weight:700;font-size:0.74rem;cursor:pointer;white-space:nowrap;">${VR_PRINT_SVG}Print Sample Proof</button>`}
    </div>
  </div>
  <div class="no-print" style="max-width:900px;margin:12px auto 0;padding:12px 16px;background:#FAF8F5;border:1px solid #E4DCD0;border-radius:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:0.78rem;color:#57534E;">
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
      <span style="font-weight:800;color:#1B4D3E;">&#10003; Card Stock Spec:</span>
      <span>Avery 5302 / 5011 Small Tent Cards (2&Prime; &times; 3&frac12;&Prime; folded, 4 cards / sheet). 65&ndash;80 lb card stock.</span>
      <span style="background:#FFFBEB;color:#92400E;padding:2px 8px;border-radius:4px;border:1px solid #FDE68A;font-weight:700;">Test Alignment: Print Page 1 on plain paper first and hold up to light over card stock.</span>
      <button type="button" onclick="navigator.clipboard.writeText('Print on Avery 5302 or 5011 card stock. Set printer scale to 100% (Actual Size), do NOT select Fit to Page. Print Page 1 on plain paper first to verify alignment against light.');this.textContent='✓ Copied Print Guide!';var b=this;setTimeout(function(){b.textContent='Copy Print Guide';},2000);" style="cursor:pointer;background:#FAF3E3;color:#8C2D19;border:1px solid #C8A96E;padding:3px 9px;border-radius:6px;font-size:0.72rem;font-weight:800;white-space:nowrap;">Copy Print Guide</button>
    </div>
    <div style="display:flex;align-items:center;gap:8px;font-weight:700;">
      <span style="color:#8C2D19;">Scale: 100% (Actual Size)</span>
      <span style="color:#A8A29E;">&bull;</span>
      <span style="color:#065F46;">Two-Sided Server Legend</span>
    </div>
  </div>
  ${vault.isUnlocked ? '' : '<div class="proof-wm" aria-hidden="true"><span>PREVIEW PROOF &bull; UNLOCK AVERY 5302 PACK ($7) AT SEATHARMONY.COM</span></div>'}
  <div class="sheet-grid">${cardsHtml}</div>
  ${query.auto_print === '1' ? '<script>window.addEventListener("DOMContentLoaded", function() { setTimeout(function() { window.print(); }, 400); });</script>' : ''}
</body>
</html>`;
  return html;
}

module.exports = { renderPosterPrintPage, renderAveryPrintPage };

/**
 * SeatHarmony (#2): Vault Helpers & Shared Print Sub-Routines
 * Keeps vault-routes.js < 900 lines.
 */

const { queryOne, runInsert } = require('./db');
const { runGeoAudit } = require('./geo-engine');
const { escapeHtml, renderBrandLogoSvg } = require('./templates');

function normalizeVaultId(raw) {
  const clean = String(raw || '').trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  if (!clean) return 'SH-4819';
  return clean.startsWith('SH-') ? clean.slice(0, 16) : `SH-${clean.slice(0, 12)}`;
}

function computeMonogram(title) {
  const clean = String(title || "Maya & Liam's Reception").split(/\s*[·•|]\s*/)[0].replace(/\s+EST\.?\s*\d{4}.*$/i, '').replace(/['’]s.*$/i, '').trim();
  const parts = clean.split(/\s*(?:&|and|\+|x)\s*/i).filter(Boolean);
  if (parts.length >= 2) return ((parts[0][0] || 'M') + '&' + (parts[1][0] || 'L')).toUpperCase();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return ((words[0][0] || 'S') + (words[1][0] || 'H')).toUpperCase();
  return (clean.slice(0, 3) || 'SH').toUpperCase();
}

function parseMonogramParts(rawMonogram, title) {
  const fallbackInitials = computeMonogram(title), raw = String(rawMonogram || '').trim();
  if (!raw) return { initials: fallbackInitials, sub: 'EST. 2026', raw: `${fallbackInitials} · EST. 2026` };
  const parts = raw.split(/\s*(?:·|•|\|)\s*/).filter(Boolean);
  if (parts.length >= 2) return { initials: parts[0].trim() || fallbackInitials, sub: parts.slice(1).join(' · ').trim() || 'EST. 2026', raw };
  const estMatch = raw.match(/^(.+?)\s+(EST\.?\s*\d{2,4}.*)$/i);
  if (estMatch) return { initials: estMatch[1].replace(/[-–—]+$/, '').trim() || fallbackInitials, sub: estMatch[2].trim(), raw };
  return { initials: raw, sub: 'EST. 2026', raw };
}

const VR_LOCK_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
const VR_PRINT_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>';
const VR_CLIP_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>';

async function resolveVaultRecord(rawVaultId, query = {}) {
  const vaultId = normalizeVaultId(rawVaultId), isVipTestVault = vaultId === 'SH-VIP' || vaultId === 'SH-PRO';
  let row = null;
  try { row = queryOne('SELECT * FROM event_vaults WHERE vault_id = ?', [vaultId]); } catch (_) {}
  const hasQueryEmail = Boolean(query.email && String(query.email).includes('@'));
  const forcePaidUnlock = isVipTestVault || query.unlocked === '1' || query.checkout === 'success' || Boolean(query.session_id);
  if (row) {
    let state = {};
    try { state = JSON.parse(row.state_json || '{}'); } catch (_) {}
    if (forcePaidUnlock && !row.is_unlocked) {
      const tier = String(query.tier || row.plan_tier || (vaultId === 'SH-VIP' ? 'pro_b2b' : 'complete_dossier'));
      try {
        runInsert(`UPDATE event_vaults SET is_unlocked = 1, plan_tier = ?, stripe_session_id = ?, updated_at = datetime('now') WHERE vault_id = ?`, [tier, String(query.session_id || row.stripe_session_id || ''), vaultId]);
        row.is_unlocked = 1; row.plan_tier = tier;
      } catch (_) {}
    }
    const isPaid = Boolean(row.is_unlocked || forcePaidUnlock);
    const hasSavedEmail = Boolean(hasQueryEmail || (row.owner_email && row.owner_email.includes('@') && !/^(test|vip)@/i.test(row.owner_email)));
    return {
      vaultId, ownerEmail: row.owner_email || (hasQueryEmail ? String(query.email).trim() : (isVipTestVault ? 'test@seatharmony.com' : '')),
      title: row.title || state.title || "Maya & Liam's Estate Reception",
      venueName: row.venue_name || state.venueName || 'The Conservatory at Villa Bellagio',
      planTier: row.plan_tier || (isPaid ? 'complete_dossier' : (hasSavedEmail ? 'meal_sheet_free' : 'free')),
      isUnlocked: isPaid, isMealUnlocked: Boolean(isPaid || hasSavedEmail),
      updatedAt: row.updated_at || new Date().toISOString(), state
    };
  }
  const presetKey = String(query.preset || query.target || (vaultId === 'SH-VIP' ? 'tuscan-banquet-80' : 'estate-150'));
  const audit = await runGeoAudit(presetKey), state = audit.seatingPlan || audit;
  return {
    vaultId, ownerEmail: hasQueryEmail ? String(query.email).trim() : (isVipTestVault ? 'test@seatharmony.com' : ''),
    title: state.title || "Maya & Liam's Estate Reception",
    venueName: state.venueName || 'The Conservatory at Villa Bellagio',
    planTier: forcePaidUnlock ? String(query.tier || 'complete_dossier') : (hasQueryEmail ? 'meal_sheet_free' : 'free'),
    isUnlocked: forcePaidUnlock, isMealUnlocked: Boolean(forcePaidUnlock || hasQueryEmail),
    updatedAt: new Date().toISOString(), state
  };
}

function buildVaultUrls(baseUrl, vaultId) {
  const enc = encodeURIComponent(vaultId);
  return {
    studio: `${baseUrl}/?vault=${enc}#studio`, vault_dashboard: `${baseUrl}/vault/${enc}`,
    print_poster: `${baseUrl}/print/poster/${enc}`, print_avery: `${baseUrl}/print/avery-5302/${enc}`,
    print_beo: `${baseUrl}/print/beo/${enc}`, print_stations: `${baseUrl}/print/server-stations/${enc}`,
    print_turnover: `${baseUrl}/print/turnover-brief/${enc}`,
    qr_lookup: `${baseUrl}/qr/${enc}`, print_floorplan: `${baseUrl}/print/floorplan/${enc}`,
    mom_sandbox: `${baseUrl}/?vault=${enc}&sandbox=mom_tables_1_3#studio`
  };
}

function computeClockLabel(seatIdx, totalSeats) {
  if (seatIdx === 0) return '12:00 Anchor';
  const clockPoints8 = ['12:00 Anchor', '1:30 CW', '3:00 CW', '4:30 CW', '6:00 CW', '7:30 CW', '9:00 CW', '10:30 CW'];
  if (totalSeats === 8 && clockPoints8[seatIdx]) return clockPoints8[seatIdx];
  return `${Math.round((seatIdx / Math.max(1, totalSeats)) * 12) || 12}:00 CW`;
}

function extractAllSeatedGuests(state) {
  const tables = Array.isArray(state.tables) ? state.tables : [], all = [];
  tables.forEach((t, tIdx) => {
    const seats = (t.geometry && Array.isArray(t.geometry.seats)) ? t.geometry.seats : [], guests = Array.isArray(t.guests) ? t.guests : [];
    guests.forEach((g, sIdx) => {
      const seatMeta = seats[sIdx] || {}, rawName = String(g.name || 'Guest').trim(), parenMatch = rawName.match(/\(([^)]+)\)\s*$/);
      const noteSuffix = parenMatch ? ` (${parenMatch[1]})` : '', cleanBaseName = rawName.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
      const parts = cleanBaseName.split(/\s+/).filter(Boolean), lastName = parts.length > 1 ? parts[parts.length - 1] : (parts[0] || 'Guest');
      const firstAndMiddle = parts.length > 1 ? parts.slice(0, -1).join(' ') : '', posterRestName = (firstAndMiddle + noteSuffix).trim();
      all.push({
        name: rawName, lastName, posterRestName, role: g.role || 'Guest', meal: g.meal || 'Filet Mignon',
        allergy: g.allergy || 'None', accessibility: g.accessibility || 'Standard Chair',
        householdLabel: g.householdLabel || rawName || 'Household', tableNumber: t.number || (tIdx + 1),
        tableName: t.name || `Table ${tIdx + 1}`, tableShape: t.shape || 'round', tableZone: t.zone || 'center',
        seatNumber: seatMeta.seatNumber || (sIdx + 1), clockLabel: seatMeta.clockLabel || computeClockLabel(sIdx, guests.length || 8)
      });
    });
  });
  return all;
}

function mealSymbolInfo(mealStr) {
  const m = String(mealStr || '').toLowerCase();
  if (m.includes('kid') || m.includes('child') || m.includes('tender')) return { sym: '★', code: 'KIDS', color: '#B45309', label: 'Kids Meal' };
  if (m.includes('chicken') || m.includes('poultry')) return { sym: '■', code: 'CHICKEN', color: '#92400E', label: 'Roasted Chicken' };
  if (m.includes('halibut') || m.includes('fish') || m.includes('salmon')) return { sym: '●', code: 'FISH', color: '#0369A1', label: 'Pan-Seared Halibut' };
  if (m.includes('vegan') || m.includes('risotto')) return { sym: '▲', code: 'VEGAN', color: '#15803D', label: 'Vegan Risotto' };
  if (m.includes('vegetarian') || m.includes('mushroom') || m.includes('tart')) return { sym: '◇', code: 'VEG', color: '#15803D', label: 'Wild Mushroom Tart' };
  return { sym: '◆', code: 'BEEF', color: '#8C2D19', label: mealStr || 'Filet Mignon' };
}

function buildRealQrUrl(targetUrl) {
  const enc = encodeURIComponent(String(targetUrl || 'https://www.seatharmony.io/qr/SH-4819'));
  return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&color=181412&bgcolor=FFFFFF&data=${enc}`;
}

function buildInlineQrDataUri(seedStr) {
  let h = 2166136261;
  const s = String(seedStr || 'SH-4819');
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  const cells = [];
  const inFinder = (r, c) => (r < 7 && c < 7) || (r < 7 && c >= 14) || (r >= 14 && c < 7);
  for (let r = 0; r < 21; r++) {
    for (let c = 0; c < 21; c++) {
      if (inFinder(r, c)) continue;
      h = Math.imul(h ^ ((r * 31) + c), 16777619);
      if ((Math.abs(h) % 10) < 5) cells.push(`<rect x="${10 + c * 4}" y="${10 + r * 4}" width="3.6" height="3.6" rx="0.6" fill="#181412"/>`);
    }
  }
  const finder = (x, y) => `<rect x="${x}" y="${y}" width="26" height="26" rx="3" fill="none" stroke="#181412" stroke-width="3.5"/><rect x="${x + 6.5}" y="${y + 6.5}" width="13" height="13" rx="1.5" fill="#181412"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 104"><rect width="104" height="104" rx="8" fill="#FAF6EE"/>${finder(11, 11)}${finder(67, 11)}${finder(11, 67)}${cells.join('')}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function renderTopPrintBar({ vault, activeRoute, baseUrl }) {
  const urls = buildVaultUrls(baseUrl, vault.vaultId);
  const unlockBadge = vault.isUnlocked
    ? `<span style="background:#ECFDF5;color:#065F46;border:1px solid #A7F3D0;padding:3px 9px;border-radius:999px;font-size:0.68rem;font-weight:800;white-space:nowrap;">&#10003; UNLOCKED</span>`
    : `<a href="/buy/complete_dossier?target=${encodeURIComponent(vault.vaultId)}&vault=${encodeURIComponent(vault.vaultId)}&allow_promotion_codes=false" style="background:#1B4D3E;color:#FFFFFF;border:1px solid #14382D;padding:4px 10px;border-radius:999px;font-size:0.70rem;font-weight:800;text-decoration:none;white-space:nowrap;display:inline-flex;align-items:center;gap:4px;">${VR_LOCK_SVG}Unlock Event Print Pack ($7) &rarr;</a>`;
  const hideEmailBar = vault.isUnlocked || (activeRoute === 'beo' && vault.isMealUnlocked);
  const topEmailGateBar = hideEmailBar ? '' : `
  <div class="no-print" id="sh-subpage-vault-bar" style="background:#FFFFFF;border-bottom:1.5px solid #1B4D3E;padding:10px 18px;">
    <div style="max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span style="font-size:12.5px;font-weight:800;color:#065F46;background:#ECFDF5;border:1px solid #A7F3D0;padding:2px 9px;border-radius:999px;">&#10003; ${vault.isMealUnlocked ? 'Meal Sheet Unlocked ($0)' : 'Specimen #1 Proof: Seat #1 at 12:00 &bull; 2 Hosts &bull; 0 Clashes'}</span>
        <span style="font-size:12.5px;font-weight:700;color:#78350F;background:#FAF6EE;border:1px solid #C8A96E;padding:2px 9px;border-radius:999px;">${VR_LOCK_SVG}${vault.isMealUnlocked ? '24&Prime;&times;36&Prime; Print-Shop Poster, Avery 5302 Cards &amp; QR Locked ($7 Pack)' : 'Tables 2&ndash;8 Meal Sheet ($0) &amp; 24&Prime;&times;36&Prime; Sign ($7) Locked'}</span>
      </div>
      <form onsubmit="var em=(document.getElementById('sh-subpage-email')||{}).value||'';if(em.indexOf('@')>0){try{localStorage.setItem('sh_saved_email',em);fetch('/api/leads/capture',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:em,pageUrl:window.location.pathname,utmSource:'subpage_vault_bar'}),keepalive:true});}catch(_){}setTimeout(function(){window.location.href=window.location.pathname+'?email='+encodeURIComponent(em);},120);}return false;" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;flex:1 1 320px;justify-content:flex-end;">
        ${vault.isMealUnlocked ? '' : `<input id="sh-subpage-email" type="email" required placeholder="Enter email to unlock Meal Sheet free ($0)..." style="flex:1 1 200px;max-width:280px;height:36px;padding:6px 10px;border:1px solid #D1D5DB;border-radius:8px;font-size:16px;background:#FFFFFF;color:#181412;" aria-label="Email address to unlock Tables 2-8 Meal Sheet" /><button type="submit" style="cursor:pointer;background:#1B4D3E;color:#FFFFFF;border:1px solid #1B4D3E;border-radius:8px;height:36px;padding:6px 12px;font-size:13px;font-weight:700;white-space:nowrap;">Unlock Meal Sheet ($0) &rarr;</button>`}
        <a href="/buy/complete_dossier?target=${encodeURIComponent(vault.vaultId)}&vault=${encodeURIComponent(vault.vaultId)}&allow_promotion_codes=false" style="display:inline-flex;align-items:center;background:#1B4D3E;color:#FFFFFF;border:1px solid #14382D;border-radius:8px;height:36px;padding:6px 12px;font-size:13px;font-weight:800;text-decoration:none;white-space:nowrap;">$7 Print Pack (vs. $14 Etsy) &rarr;</a>
        <span style="font-size:12px;color:#78350F;font-weight:700;background:#FFFBEB;border:1px solid #FDE68A;padding:4px 8px;border-radius:8px;white-space:nowrap;">&#10003; 30-Day Guarantee</span>
      </form>
    </div>
  </div>`;
  return `
  <header class="no-print" style="position:sticky;top:0;z-index:100;background:#FAF6EE;color:#181412;border-bottom:1.5px solid #D8C29D;padding:9px 18px;box-shadow:0 4px 14px rgba(24,20,18,0.04);">
    <div style="max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <a href="${urls.studio}" style="display:inline-flex;align-items:center;gap:7px;color:#181412;text-decoration:none;font-weight:800;font-size:0.92rem;white-space:nowrap;">${renderBrandLogoSvg(22)}<span>SeatHarmony</span></a>
        <span style="color:#78350F;font-family:monospace;font-size:0.72rem;font-weight:800;background:#FAF3E3;padding:3px 8px;border-radius:6px;border:1px solid #C8A96E;white-space:nowrap;">#${escapeHtml(vault.vaultId)}</span>
        ${unlockBadge}
      </div>
      <nav style="display:flex;align-items:center;gap:5px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;max-width:100%;flex-wrap:nowrap;">
        <a href="${urls.vault_dashboard}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'dashboard' ? 'background:#EBF4F0;color:#1B4D3E;border:1.5px solid #1B4D3E;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">Command Center</a>
        <a href="${urls.print_poster}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'poster' ? 'background:#EBF4F0;color:#1B4D3E;border:1.5px solid #1B4D3E;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">24&Prime;&times;36&Prime; Sign</a>
        <a href="${urls.print_avery}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'avery' ? 'background:#EBF4F0;color:#1B4D3E;border:1.5px solid #1B4D3E;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">Avery 5302</a>
        <a href="${urls.print_beo}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'beo' ? 'background:#EBF4F0;color:#1B4D3E;border:1.5px solid #1B4D3E;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">Caterer Meal Sheet</a>
        <a href="${urls.print_stations}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'stations' ? 'background:#EBF4F0;color:#1B4D3E;border:1.5px solid #1B4D3E;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">Server Stations</a>
        <a href="${urls.print_turnover}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'turnover' ? 'background:#EBF4F0;color:#1B4D3E;border:1.5px solid #1B4D3E;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">Room Turnover</a>
        <a href="${urls.print_floorplan}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'floorplan' ? 'background:#EBF4F0;color:#1B4D3E;border:1.5px solid #1B4D3E;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">Floorplan Diagram</a>
        <a href="${urls.qr_lookup}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'qr' ? 'background:#EBF4F0;color:#1B4D3E;border:1.5px solid #1B4D3E;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">Guest QR</a>
        <a href="${urls.studio}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;background:#FFFFFF;border:1.5px solid #1B4D3E;color:#1B4D3E;white-space:nowrap;">&larr; Studio</a>
      </nav>
    </div>
  </header>${topEmailGateBar}`;
}

module.exports = {
  normalizeVaultId,
  computeMonogram,
  parseMonogramParts,
  resolveVaultRecord,
  buildVaultUrls,
  computeClockLabel,
  extractAllSeatedGuests,
  mealSymbolInfo,
  buildRealQrUrl,
  buildInlineQrDataUri,
  renderTopPrintBar,
  VR_LOCK_SVG,
  VR_PRINT_SVG,
  VR_CLIP_SVG
};

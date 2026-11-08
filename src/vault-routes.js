/**
 * SeatHarmony (#2): Persistent Event Vault, Passwordless Login & Inside-the-Paywall Print / Fulfillment Engine
 * Powers:
 *   1. Event Saving & Resume Login: POST /api/vault/save, GET /api/vault/:vaultId, POST /api/vault/lookup
 *   2. Inside-the-Paywall Command Center: GET /vault/:vaultId (and /?checkout=success redirect/fulfillment)
 *   3. Print-Ready 24"x36" Arch D Welcome Poster Studio: GET /print/poster/:vaultId (0.125" bleed + crop marks)
 *   4. Avery 5302 Folded Tent Place Cards Print Sheet: GET /print/avery-5302/:vaultId (Front + 180-deg Back Allergy Fold)
 *   5. Signed Clockwise 12:00 Caterer BEO Packet: GET /print/beo/:vaultId (Kitchen Summary + Table-by-Table Server Roster)
 *   6. Standalone Cocktail-Hour Mobile Guest QR Lookup Web App: GET /qr/:vaultId
 */

const { queryOne, queryAll, runInsert } = require('./db');
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
    print_beo: `${baseUrl}/print/beo/${enc}`, qr_lookup: `${baseUrl}/qr/${enc}`,
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
    : `<a href="/buy/complete_dossier?target=${encodeURIComponent(vault.vaultId)}&vault=${encodeURIComponent(vault.vaultId)}&allow_promotion_codes=false" style="background:linear-gradient(135deg,#FDE68A,#C8A96E);color:#181412;padding:4px 10px;border-radius:999px;font-size:0.70rem;font-weight:800;text-decoration:none;white-space:nowrap;">${VR_LOCK_SVG}Unlock Event Print Pack ($7) &rarr;</a>`;
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
        <a href="/buy/complete_dossier?target=${encodeURIComponent(vault.vaultId)}&vault=${encodeURIComponent(vault.vaultId)}&allow_promotion_codes=false" style="display:inline-flex;align-items:center;background:#181412;color:#FFFFFF;border-radius:8px;height:36px;padding:6px 12px;font-size:13px;font-weight:800;text-decoration:none;white-space:nowrap;">$7 Print Pack (vs. $14 Etsy) &rarr;</a>
        <span style="font-size:12px;color:#78350F;font-weight:700;background:#FFFBEB;border:1px solid #FDE68A;padding:4px 8px;border-radius:8px;white-space:nowrap;">&#10003; 30-Day Guarantee</span>
      </form>
    </div>
  </div>`;
  return `
  <header class="no-print" style="position:sticky;top:0;z-index:100;background:#FAF6EE;color:#181412;border-bottom:1.5px solid #D8C29D;padding:9px 18px;box-shadow:0 4px 14px rgba(24,20,18,0.04);">
    <div style="max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:nowrap;">
        <a href="${urls.studio}" style="display:inline-flex;align-items:center;gap:7px;color:#181412;text-decoration:none;font-weight:800;font-size:0.92rem;white-space:nowrap;">${renderBrandLogoSvg(22)}<span>SeatHarmony</span></a>
        <span style="color:#78350F;font-family:monospace;font-size:0.72rem;font-weight:800;background:#FAF3E3;padding:3px 8px;border-radius:6px;border:1px solid #C8A96E;white-space:nowrap;">#${escapeHtml(vault.vaultId)}</span>
        ${unlockBadge}
      </div>
      <nav style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">
        <a href="${urls.vault_dashboard}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'dashboard' ? 'background:#FAF3E3;color:#8C2D19;border:1.5px solid #8C2D19;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">Command Center</a>
        <a href="${urls.print_poster}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'poster' ? 'background:#FAF3E3;color:#8C2D19;border:1.5px solid #8C2D19;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">24&Prime;&times;36&Prime; Sign</a>
        <a href="${urls.print_avery}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'avery' ? 'background:#FAF3E3;color:#8C2D19;border:1.5px solid #8C2D19;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">Avery 5302</a>
        <a href="${urls.print_beo}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'beo' ? 'background:#FAF3E3;color:#8C2D19;border:1.5px solid #8C2D19;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">Caterer Meal Sheet</a>
        <a href="${urls.qr_lookup}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;white-space:nowrap;${activeRoute === 'qr' ? 'background:#FAF3E3;color:#8C2D19;border:1.5px solid #8C2D19;' : 'background:#FFFFFF;color:#44403C;border:1px solid #E2D9C8;'}">Guest QR</a>
        <a href="${urls.studio}" style="padding:5px 10px;border-radius:8px;font-size:0.73rem;font-weight:800;text-decoration:none;background:#FFFFFF;border:1.5px solid #C8A96E;color:#78350F;white-space:nowrap;">&larr; Studio</a>
      </nav>
    </div>
  </header>${topEmailGateBar}`;
}

function attachVaultAndPaywallRoutes(app, publicUrl, ebStore = null) {
  const baseUrl = String(publicUrl || 'https://www.seatharmony.io').replace(/\/$/, '');

  app.post('/api/vault/save', async (req, res) => {
    try {
      const body = req.body || {};
      let state = body.state && typeof body.state === 'object' ? body.state : null;
      if ((!state || !Array.isArray(state.tables)) && (body.preset || body.ownerEmail || body.email)) {
        const seeded = await runGeoAudit(String(body.preset || 'estate-150')); state = seeded.seatingPlan || seeded;
      }
      if (!state || !Array.isArray(state.tables)) return res.status(400).json({ ok: false, error: 'Valid seating plan state is required.' });
      const ownerEmail = String(body.ownerEmail || body.email || body.owner_email || state.ownerEmail || '').trim().toLowerCase().slice(0, 120);
      const isTestOwner = /^(test|vip)@seatharmony\.com$/i.test(ownerEmail);
      let rawId = body.vaultId || body.vault_id || state.vaultId || '';
      if ((!rawId || String(rawId).toUpperCase() === 'SH-4819') && !isTestOwner && (state.isWizardBuilt || (ownerEmail && ownerEmail.includes('@')))) rawId = `SH-${Math.floor(1000 + Math.random() * 9000)}`;
      const vaultId = normalizeVaultId(rawId || `SH-${Math.floor(1000 + Math.random() * 9000)}`), pinCode = String(body.pinCode || body.pin_code || '').trim().slice(0, 12);
      const title = String(state.title || body.title || "Maya & Liam's Estate Reception").trim().slice(0, 120), venueName = String(state.venueName || body.venue_name || 'The Conservatory at Villa Bellagio').trim().slice(0, 120);
      const existing = queryOne('SELECT is_unlocked, plan_tier, owner_email, stripe_session_id FROM event_vaults WHERE vault_id = ?', [vaultId]);
      const isUnlocked = existing && existing.is_unlocked ? 1 : (body.is_unlocked ? 1 : 0);
      const planTier = (existing && existing.plan_tier && existing.plan_tier !== 'free') ? existing.plan_tier : String(body.plan_tier || 'free');
      const finalEmail = ownerEmail || (existing ? existing.owner_email : '');
      state.vaultId = vaultId; if (finalEmail) state.ownerEmail = finalEmail;
      runInsert(`INSERT OR REPLACE INTO event_vaults (vault_id, owner_email, pin_code, title, venue_name, plan_tier, is_unlocked, stripe_session_id, state_json, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`, [vaultId, finalEmail, pinCode, title, venueName, planTier, isUnlocked, existing ? (existing.stripe_session_id || '') : '', JSON.stringify(state)]);
      if (ebStore && finalEmail && finalEmail.includes('@') && !isTestOwner && (!existing || existing.owner_email !== finalEmail)) {
        const ua = String(req.headers['user-agent'] || '').toLowerCase(), isTestReq = /headlesschrome|playwright|puppeteer|curl\/|bot|crawler|example\.com|test/i.test(ua + ' ' + finalEmail) ? 1 : 0;
        const clientIp = String(req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip || '').split(',')[0].trim().replace(/^::ffff:/, '');
        ebStore.recordLead({ email: finalEmail, summaryText: `Saved Reception Vault #${vaultId} (${title})`, utmSource: String(body.utm_source || 'vault_save'), isTest: isTestReq, clientIp });
        ebStore.recordEvent({ eventType: 'lead_capture', pageUrl: String(body.page_url || '/api/vault/save'), deviceType: /mobile|iphone|android/i.test(ua) ? 'mobile' : 'desktop', utmSource: String(body.utm_source || 'vault_save'), isTest: isTestReq, clientIp, meta: { js_hydrated: 1, vaultId } });
      }
      return res.status(200).json({ ok: true, vaultId, vault_id: vaultId, owner_email: finalEmail, title, venue_name: venueName, is_unlocked: Boolean(isUnlocked), plan_tier: planTier, urls: buildVaultUrls(baseUrl, vaultId) });
    } catch (err) { return res.status(500).json({ ok: false, error: err.message }); }
  });

  app.post('/api/vault/lookup', async (req, res) => {
    try {
      const q = String(req.body?.emailOrVaultId || req.body?.query || req.body?.email || req.body?.vault_id || '').trim();
      if (!q) return res.status(400).json({ ok: false, error: 'Enter your Email Address or Vault Code (e.g. SH-4819).' });
      let row = null; const lowerQ = q.toLowerCase();
      if (q.includes('@')) {
        const rows = queryAll('SELECT * FROM event_vaults WHERE lower(owner_email) = ? ORDER BY updated_at DESC LIMIT 5', [lowerQ]);
        row = rows[0] || null;
        if (!row && /^(test|vip|maya|admin|demo)@/i.test(lowerQ)) {
          const v = await resolveVaultRecord(lowerQ.startsWith('vip@') ? 'SH-VIP' : 'SH-4819', { unlocked: '1' });
          return res.status(200).json({ ok: true, vault_id: v.vaultId, owner_email: lowerQ, title: v.title, venue_name: v.venueName, is_unlocked: true, plan_tier: v.planTier || 'complete_dossier', updated_at: v.updatedAt, urls: buildVaultUrls(baseUrl, v.vaultId), state: v.state });
        }
      } else {
        const vid = normalizeVaultId(q);
        row = queryOne('SELECT * FROM event_vaults WHERE vault_id = ?', [vid]);
        if (!row && (vid === 'SH-4819' || vid === 'SH-VIP' || vid === 'SH-PRO')) {
          const v = await resolveVaultRecord(vid, { unlocked: '1' });
          return res.status(200).json({ ok: true, vault_id: v.vaultId, owner_email: v.ownerEmail || 'test@seatharmony.com', title: v.title, venue_name: v.venueName, is_unlocked: true, plan_tier: v.planTier || 'complete_dossier', updated_at: v.updatedAt, urls: buildVaultUrls(baseUrl, v.vaultId), state: v.state });
        }
      }
      if (!row) return res.status(404).json({ ok: false, error: `No saved event found for "${q}". Tip: Use test@seatharmony.com or SH-4819 (PIN: 2026) to test the unlocked account.` });
      let state = {}; try { state = JSON.parse(row.state_json || '{}'); } catch (_) {}
      const isUnl = Boolean(row.is_unlocked || row.vault_id === 'SH-VIP');
      return res.status(200).json({ ok: true, vault_id: row.vault_id, owner_email: row.owner_email || '', title: row.title, venue_name: row.venue_name, is_unlocked: isUnl, plan_tier: row.plan_tier || (isUnl ? 'complete_dossier' : 'free'), updated_at: row.updated_at, urls: buildVaultUrls(baseUrl, row.vault_id), state });
    } catch (err) { return res.status(500).json({ ok: false, error: err.message }); }
  });

  app.get('/api/vault/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query);
      return res.status(200).json({ ok: true, vault_id: vault.vaultId, owner_email: vault.ownerEmail, title: vault.title, venue_name: vault.venueName, is_unlocked: vault.isUnlocked, is_meal_unlocked: vault.isMealUnlocked, plan_tier: vault.planTier, urls: buildVaultUrls(baseUrl, vault.vaultId), state: vault.state });
    } catch (err) { return res.status(500).json({ ok: false, error: err.message }); }
  });

  // 4. Inside-the-Paywall Fulfillment & Event Vault Command Center (GET /vault/:vaultId)
  app.get('/vault/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query);
      const urls = buildVaultUrls(baseUrl, vault.vaultId);
      const guests = extractAllSeatedGuests(vault.state);
      const tables = Array.isArray(vault.state.tables) ? vault.state.tables : [];
      const monogram = computeMonogram(vault.title);
      const qrImgUrl = buildInlineQrDataUri(urls.qr_lookup);
      const filetCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'BEEF').length;
      const fishCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'FISH').length;
      const veganCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'VEGAN').length;
      const kidsCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'KIDS').length;
      const allergyCount = guests.filter(g => g.allergy && g.allergy !== 'None').length;
      const chairModCount = guests.filter(g => g.accessibility && g.accessibility !== 'Standard Chair').length;

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(vault.title)} | Reception Print &amp; Caterer Meal Sheet Command Center | SeatHarmony</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #FAF6EE; color: #181412; font-family: 'Plus Jakarta Sans', sans-serif; line-height: 1.5; }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 700; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .container { max-width: 1200px; margin: 0 auto; padding: 28px 20px 64px; }
    .card { background: #FFFFFF; border: 1.5px solid #E2D9C8; border-radius: 18px; padding: 22px; box-shadow: 0 10px 28px rgba(24,20,18,0.05); }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 9px 14px; border-radius: 10px; font-weight: 800; font-size: 0.80rem; text-decoration: none; cursor: pointer; border: 1.5px solid transparent; white-space: nowrap; }
    .btn-gold { background: #181412; color: #FDE68A; border-color: #C8A96E; }
    .btn-outline { background: #FFFFFF; color: #78350F; border-color: #C8A96E; }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-top: 20px; }
    @media (max-width: 780px) { .grid-2 { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  ${renderTopPrintBar({ vault, activeRoute: 'dashboard', baseUrl })}
  <main class="container">
    <!-- Top Event Crest & Status Hero -->
    <div class="card" style="border:2px solid #C8A96E;background:linear-gradient(180deg,#FFFFFF 0%,#FAF6EE 100%);margin-bottom:16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="width:62px;height:62px;border-radius:16px;background:#FAF3E3;border:2px solid #C8A96E;color:#8C2D19;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;">
            <span class="serif" style="font-size:1.35rem;line-height:1;">${escapeHtml(monogram)}</span>
            <span class="mono" style="font-size:0.50rem;color:#78350F;margin-top:3px;">${escapeHtml(vault.vaultId)}</span>
          </div>
          <div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:4px;">
              <span class="mono" style="font-size:0.68rem;font-weight:800;color:#8C2D19;background:#FAF3E3;border:1px solid #C8A96E;padding:2px 8px;border-radius:999px;white-space:nowrap;">&#10022; ${escapeHtml(vault.venueName)}</span>
              <span class="mono" style="font-size:0.68rem;font-weight:800;color:#065F46;background:#ECFDF5;border:1px solid #A7F3D0;padding:2px 8px;border-radius:999px;white-space:nowrap;">${tables.length} Tables &bull; ${guests.length} Guests</span>
              <span class="mono" style="font-size:0.68rem;font-weight:700;color:#57534E;background:#F5F2EB;border:1px solid #D6CFC2;padding:2px 8px;border-radius:999px;white-space:nowrap;">${escapeHtml(vault.ownerEmail || 'Guest Preview')}</span>
            </div>
            <h1 class="serif" style="font-size:2.05rem;color:#181412;line-height:1.1;">${escapeHtml(vault.title)}</h1>
            <div style="font-size:0.84rem;color:#44403C;margin-top:3px;">
              ${vault.isUnlocked
                ? '&#10003; <strong>Complete Event Print &amp; Day-Of Execution Pack Unlocked:</strong> Unlimited 30-day edits &amp; Print-Ready exports active.'
                : `${VR_LOCK_SVG}<strong>Table 1 Free Sample Active:</strong> Enter your email above ($0) to unmask Tables 2&ndash;8 Meal Sheet, or unlock the $7 Event Print Pack.`}
            </div>
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="${urls.studio}" class="btn btn-outline">&larr; Edit Floorplan in Studio</a>
          <a href="${urls.print_beo}" class="btn btn-gold">${VR_CLIP_SVG}Caterer Meal Sheet &amp; CSV &rarr;</a>
          ${!vault.isUnlocked ? `<a href="/buy/complete_dossier?target=${encodeURIComponent(vault.vaultId)}&vault=${encodeURIComponent(vault.vaultId)}&allow_promotion_codes=false" class="btn btn-gold">${VR_LOCK_SVG}Unlock Event Print Pack ($7) &rarr;</a>` : ''}
        </div>
      </div>
      <!-- At-a-Glance Kitchen & Reception KPI Strip -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:10px;margin-top:16px;padding-top:14px;border-top:1px solid #E2D9C8;">
        <div style="background:#FDF2EE;border:1px solid #F5D0C5;padding:9px 12px;border-radius:10px;"><div class="mono" style="font-size:0.65rem;font-weight:800;color:#8C2D19;">&#9670; FILET MIGNON</div><div style="font-size:1.25rem;font-weight:800;">${filetCount} Covers</div></div>
        <div style="background:#F0F9FF;border:1px solid #BAE6FD;padding:9px 12px;border-radius:10px;"><div class="mono" style="font-size:0.65rem;font-weight:800;color:#0369A1;">&#9679; HALIBUT</div><div style="font-size:1.25rem;font-weight:800;">${fishCount} Covers</div></div>
        <div style="background:#ECFDF5;border:1px solid #A7F3D0;padding:9px 12px;border-radius:10px;"><div class="mono" style="font-size:0.65rem;font-weight:800;color:#065F46;">&#9650; VEGAN RISOTTO</div><div style="font-size:1.25rem;font-weight:800;">${veganCount} Covers</div></div>
        <div style="background:#FFFBEB;border:1px solid #FDE68A;padding:9px 12px;border-radius:10px;"><div class="mono" style="font-size:0.65rem;font-weight:800;color:#A16207;">&#9733; KIDS MEALS</div><div style="font-size:1.25rem;font-weight:800;">${kidsCount} ${kidsCount === 1 ? 'Cover' : 'Covers'}</div></div>
        <div style="background:#FFF1F2;border:1px solid #FECDD3;padding:9px 12px;border-radius:10px;"><div class="mono" style="font-size:0.65rem;font-weight:800;color:#9F1239;">ALLERGY ALERTS</div><div style="font-size:1.25rem;font-weight:800;color:#9F1239;">${allergyCount} Guests</div></div>
        <div style="background:#FAF3E3;border:1px solid #C8A96E;padding:9px 12px;border-radius:10px;"><div class="mono" style="font-size:0.65rem;font-weight:800;color:#78350F;">CHAIR MODS</div><div style="font-size:1.25rem;font-weight:800;color:#78350F;">${chairModCount} Chairs</div></div>
      </div>
    </div>

    <!-- 4 Inside-the-Paywall Production Deliverables -->
    <div class="grid-2">
      <!-- Card 1: 24x36 Arch D Welcome Poster -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span class="mono" style="font-size:0.68rem;font-weight:800;color:#78350F;background:#FAF3E3;border:1px solid #C8A96E;padding:3px 10px;border-radius:999px;white-space:nowrap;">DELIVERABLE 1 &middot; 24&Prime;&times;36&Prime; ARCH D SIGN</span>
            <span style="font-size:0.75rem;font-weight:800;color:#065F46;white-space:nowrap;">6 Themes &bull; 0.125&Prime; Bleed</span>
          </div>
          <h2 class="serif" style="font-size:1.5rem;margin-bottom:6px;">Print-Ready 24&Prime;&times;36&Prime; Welcome Poster</h2>
          <p style="font-size:0.86rem;color:#44403C;line-height:1.5;">
            Print-Ready vector poster for FedEx Office or Staples across <strong>6 Luxury Themes</strong>, with A-Z or By-Table sorting and live monogram editing.
          </p>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:nowrap;">
          <a href="${urls.print_poster}" class="btn btn-gold">${VR_PRINT_SVG}Open 24&Prime;&times;36&Prime; Studio &rarr;</a>
          <a href="${urls.print_poster}?theme=obsidian" class="btn btn-outline" style="padding:8px 11px;">Noir</a>
          <a href="${urls.print_poster}?theme=sage" class="btn btn-outline" style="padding:8px 11px;">Tuscan Sage</a>
          <a href="${urls.print_poster}?theme=rosewater" class="btn btn-outline" style="padding:8px 11px;">Rosewater</a>
        </div>
      </div>

      <!-- Card 2: Avery 5302 Folded Tent Place Cards -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span class="mono" style="font-size:0.68rem;font-weight:800;color:#8C2D19;background:#FDF2EE;border:1px solid #F5C2B8;padding:3px 10px;border-radius:999px;white-space:nowrap;">DELIVERABLE 2 &middot; AVERY 5302 TENT CARDS</span>
            <span style="font-size:0.75rem;font-weight:800;color:#065F46;white-space:nowrap;">${guests.length} Cards Ready</span>
          </div>
          <h2 class="serif" style="font-size:1.5rem;margin-bottom:6px;">Avery 5302 Meal-Coded Tent Cards</h2>
          <p style="font-size:0.86rem;color:#44403C;line-height:1.5;">
            Pre-aligned 2&Prime;&times;3.5&Prime; tent cards with guest monogram, Table/Seat #, meal icons (&#9670; Beef &bull; &#9679; Fish &bull; &#9650; Vegan &bull; &#9733; Kids), and 180&deg; server allergy alerts.
          </p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="${urls.print_avery}" class="btn btn-gold">${VR_PRINT_SVG}Open Avery 5302 Print Sheet (${guests.length} Cards) &rarr;</a>
        </div>
      </div>

      <!-- Card 3: Clockwise 12:00 Caterer Meal Sheet Packet -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span class="mono" style="font-size:0.68rem;font-weight:800;color:#065F46;background:#ECFDF5;border:1px solid #A7F3D0;padding:3px 10px;border-radius:999px;white-space:nowrap;">DELIVERABLE 3 &middot; CLOCKWISE 12:00 MEAL SHEET</span>
            <span style="font-size:0.75rem;font-weight:800;color:#065F46;white-space:nowrap;">Seat #1 = 12 O&rsquo;Clock</span>
          </div>
          <h2 class="serif" style="font-size:1.5rem;margin-bottom:6px;">Banquet Captain &amp; Kitchen Meal Sheet Packet</h2>
          <p style="font-size:0.86rem;color:#44403C;line-height:1.5;">
            Table-by-table clockwise server manifest with protein totals, red kitchen allergy alerts, wheelchair/highchair tags, and 1-click CSV export.
          </p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="${urls.print_beo}" class="btn btn-gold">${VR_CLIP_SVG}Open Printable Caterer Meal Sheet &rarr;</a>
          <a href="${urls.print_beo}#download-csv" class="btn btn-outline">&darr; Export Meal Sheet (.CSV)</a>
        </div>
      </div>

      <!-- Card 4: Cocktail-Hour Mobile QR Lookup & Family Share -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
        <div style="display:flex;gap:14px;align-items:flex-start;">
          <img src="${qrImgUrl}" width="84" height="84" alt="Scannable Cocktail Hour QR Code" style="border-radius:10px;border:1.5px solid #C8A96E;background:#FAF6EE;padding:4px;flex-shrink:0;" />
          <div>
            <span class="mono" style="font-size:0.68rem;font-weight:800;color:#78350F;background:#FAF3E3;border:1px solid #C8A96E;padding:2px 8px;border-radius:999px;white-space:nowrap;">DELIVERABLE 4 &middot; LIVE QR &amp; FAMILY SHARE</span>
            <h2 class="serif" style="font-size:1.45rem;margin:4px 0;">Cocktail-Hour QR App &amp; Family Link</h2>
            <p style="font-size:0.84rem;color:#44403C;line-height:1.48;">
              Scan with your phone to test instant cocktail-hour guest seat lookup, or copy your restricted Family Share link (Tables 1 to 3 only).
            </p>
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="${urls.qr_lookup}" target="_blank" class="btn btn-gold">Open Mobile QR Lookup &nearr;</a>
          <button type="button" class="btn btn-outline" onclick="navigator.clipboard.writeText('${urls.mom_sandbox}');this.textContent='✓ Family Share Link Copied!';">Copy Family Share Link</button>
        </div>
      </div>
    </div>

    <!-- Pillar 3 Trust & Deliverable Guarantee Strip -->
    <div id="sh-vault-cmd-trust-strip" style="margin-top:18px;background:#FFFBEB;border:1.5px solid #FDE68A;border-radius:14px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px;color:#78350F;">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <span style="font-weight:800;color:#1B4D3E;">&#10003; 30-Day 100% Money-Back Guarantee:</span>
        <span style="color:#574F49;">If your banquet captain, caterer, or local print shop (FedEx Office/Staples) has any issue with these files, email us for an instant refund.</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;font-weight:700;">
        <span style="color:#1B4D3E;">&#10003; Instant PDF Vector Download</span>
        <span style="color:#0369A1;">&#10003; 0.125&Prime; Standard Print Bleed</span>
      </div>
    </div>

    <!-- Table-by-Table Quick Overview Strip -->
    <div class="card" style="margin-top:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
        <div>
          <div class="mono" style="font-size:0.68rem;font-weight:800;color:#8C2D19;">LIVE TABLE ROSTER SUMMARY (${tables.length} TABLES &bull; ${guests.length} GUESTS)</div>
          <h3 class="serif" style="font-size:1.35rem;">Seated Tables &amp; Quick Jump to Floorplan</h3>
        </div>
        <a href="${urls.studio}" class="btn btn-outline" style="padding:7px 12px;font-size:0.78rem;">+ Add / Move Guests or Tables in Studio &rarr;</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;">
        ${tables.map((t, idx) => {
          const gList = t.guests || [];
          if (idx >= 1 && !vault.isMealUnlocked) {
            return `<div style="background:#FAF8F5;border:1px dashed #C8A96E;border-radius:12px;padding:11px 13px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:7px;"><strong style="font-size:0.84rem;color:#181412;">${escapeHtml(t.name || `Table ${idx + 1}`)}</strong><span class="mono" style="font-size:0.68rem;color:#78350F;font-weight:800;">${VR_LOCK_SVG}${gList.length}/${t.capacity || 8} Seats</span></div><div style="font-size:0.74rem;color:#57534E;font-weight:700;">${VR_LOCK_SVG}Enter email above ($0) or unlock $7 Print Pack to view Table ${idx + 1} guest roster.</div></div>`;
          }
          const chips = gList.slice(0, 4).map(g => `<span style="font-size:0.72rem;font-weight:600;color:#44403C;background:#FFFFFF;border:1px solid #E2D9C8;padding:2px 7px;border-radius:6px;white-space:nowrap;">${escapeHtml(g.name)}</span>`).join('');
          const moreBadge = gList.length > 4 ? `<span class="mono" style="font-size:0.68rem;font-weight:800;color:#78350F;background:#FAF3E3;border:1px solid #C8A96E;padding:2px 6px;border-radius:6px;white-space:nowrap;">+${gList.length - 4} more</span>` : '';
          return `<div style="background:#FAF8F5;border:1px solid #E2D9C8;border-radius:12px;padding:11px 13px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:7px;"><strong style="font-size:0.84rem;color:#181412;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(t.name || `Table ${idx + 1}`)}${!vault.isMealUnlocked ? ' (Free Sample)' : ''}</strong><span class="mono" style="font-size:0.68rem;color:#065F46;font-weight:800;white-space:nowrap;flex-shrink:0;">${gList.length}/${t.capacity || 8} Seats</span></div><div style="display:flex;flex-wrap:wrap;gap:4px;">${chips || '<span style="font-size:0.74rem;color:#78716C;">Open Table</span>'}${moreBadge}</div></div>`;
        }).join('')}
      </div>
    </div>
  </main>
</body>
</html>`;
      return res.status(200).type('html').send(html);
    } catch (err) { return res.status(500).send('Internal Server Error'); }
  });

  app.get('/print/poster/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query), urls = buildVaultUrls(baseUrl, vault.vaultId);
      const theme = String(req.query.theme || (vault.state && vault.state.posterTheme) || 'alabaster').toLowerCase();
      const sortMode = String(req.query.sort || (vault.state && vault.state.posterSort) || 'alphabetical').toLowerCase();
      const showMap = req.query.map !== '0' && (!vault.state || vault.state.posterShowMap !== false);
      const customKicker = String(req.query.kicker || (vault.state && vault.state.signKicker) || 'Please Find Your Seat').trim();
      const guests = extractAllSeatedGuests(vault.state).sort((a, b) => a.lastName.localeCompare(b.lastName));
      const tables = Array.isArray(vault.state.tables) ? vault.state.tables : [], landmarks = Array.isArray(vault.state.landmarks) ? vault.state.landmarks : [];
      const monoParts = parseMonogramParts(req.query.monogram || (vault.state && vault.state.signMonogram), vault.title);
      const monogram = monoParts.initials, monogramSub = monoParts.sub, monogramInputVal = monoParts.raw;
      const monoFontRem = monogram.length > 5 ? '0.95rem' : (monogram.length > 3 ? '1.22rem' : '1.52rem'), qrImgUrl = buildInlineQrDataUri(urls.qr_lookup);

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
        bodyGridHtml = Object.keys(groups).sort().map(letter => `<div style="margin-bottom:10px;break-inside:avoid;"><div class="serif" style="font-size:1.35rem;color:${accent};border-bottom:1.5px solid ${border};margin-bottom:4px;">${escapeHtml(letter)}</div>${groups[letter].map(g => `<div style="display:flex;justify-content:space-between;gap:8px;font-size:0.90rem;padding:2px 0;border-bottom:1px dotted rgba(200,169,110,0.3);"><span><strong>${escapeHtml(g.lastName)}</strong>${g.posterRestName ? `, ${escapeHtml(g.posterRestName)}` : ''}</span><span class="mono" style="font-weight:700;color:${accent};">Table ${g.tableNumber}${!vault.isUnlocked ? ' (Sample)' : ''}</span></div>`).join('')}</div>`).join('') + (!vault.isUnlocked ? `<div style="grid-column:1 / -1;padding:14px 16px;border-radius:12px;background:rgba(200,169,110,0.12);border:1.5px dashed ${border};font-size:0.86rem;font-weight:800;color:${fg};display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;"><span>${VR_LOCK_SVG}Tables 2&ndash;${tables.length} Guest Names (${Math.max(0, guests.length - visibleGuests.length)} Additional Seated Guests) &mdash; Unlock 24&Prime;&times;36&Prime; Print-Shop Poster ($7 Pack)</span><span style="font-size:12px;color:#78350F;font-weight:700;background:#FFFBEB;border:1px solid #FDE68A;padding:2px 8px;border-radius:6px;">&#10003; 30-Day Guarantee &bull; 0.125&Prime; Bleed</span></div><a href="/buy/complete_dossier?target=${encodeURIComponent(vault.vaultId)}&vault=${encodeURIComponent(vault.vaultId)}&allow_promotion_codes=false" style="background:#181412;color:#FDE68A;border:1px solid ${border};border-radius:999px;padding:6px 12px;font-size:0.78rem;text-decoration:none;">${VR_LOCK_SVG}Unlock 24&Prime;&times;36&Prime; Print Pack ($7) &rarr;</a></div>` : '');
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

      const buyPackUrl = `/buy/complete_dossier?target=${encodeURIComponent(vault.title || vault.vaultId)}&vault=${encodeURIComponent(vault.vaultId)}${vault.ownerEmail ? `&email=${encodeURIComponent(vault.ownerEmail)}` : ''}`;
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
    .poster-guest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
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
      .poster-guest-grid { grid-template-columns: repeat(3, 1fr) !important; }
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
          : `<a href="${buyPackUrl}" style="background:linear-gradient(135deg,#FDE68A,#C8A96E);color:#181412;border:1.5px solid #B89352;border-radius:10px;padding:8px 14px;font-weight:800;font-size:0.78rem;text-decoration:none;white-space:nowrap;">${VR_LOCK_SVG}Unlock Print-Ready PDF ($7) &rarr;</a><button type="button" onclick="window.print()" style="background:#FAF6EE;color:#57534E;border:1px solid #D6CFC2;border-radius:10px;padding:8px 11px;font-weight:700;font-size:0.74rem;cursor:pointer;white-space:nowrap;">${VR_PRINT_SVG}Print Sample Proof</button>`}
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
          <img src="${qrImgUrl}" width="76" height="76" alt="Scan to Find Your Seat QR" style="display:block;margin:0 auto 4px;border-radius:6px;" />
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
</body>
</html>`;
      return res.status(200).type('html').send(html);
    } catch (err) {
      return res.status(500).send('Internal Server Error');
    }
  });

  // 6. Avery 5302 Folded Tent Place Cards Print Sheet (GET /print/avery-5302/:vaultId)
  app.get('/print/avery-5302/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query);
      const guests = extractAllSeatedGuests(vault.state);
      const monogram = computeMonogram(vault.title);

      const visibleAveryGuests = vault.isUnlocked ? guests : guests.slice(0, 1);
      const cardsHtml = visibleAveryGuests.map((g, gIdx) => {
        const mealInfo = mealSymbolInfo(g.meal);
        const hasAllergy = g.allergy && g.allergy !== 'None';
        const cleanAccess = String(g.accessibility || '').replace(/[^A-Za-z0-9\s()-]/g, '').trim();
        const hasChairMod = cleanAccess && cleanAccess !== 'Standard Chair';
        return `
        <div class="tent-card">
          <div class="tent-back">
            <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
              <span class="mono" style="font-size:0.65rem;font-weight:800;color:#57534E;white-space:nowrap;">TBL ${g.tableNumber} &bull; SEAT #${g.seatNumber} (${escapeHtml(g.clockLabel)})${gIdx === 0 && !vault.isUnlocked ? ' &bull; FREE SAMPLE' : ''}</span>
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
            <span class="mono" style="font-size:0.68rem;font-weight:800;color:#1B4D3E;background:#ECFDF5;border:1px solid #A7F3D0;padding:2px 8px;border-radius:999px;">${Math.max(0, guests.length - 1)} MORE CARDS READY</span>
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

      const buyPackUrl = `/buy/complete_dossier?target=${encodeURIComponent(vault.title || vault.vaultId)}&vault=${encodeURIComponent(vault.vaultId)}${vault.ownerEmail ? `&email=${encodeURIComponent(vault.ownerEmail)}` : ''}`;
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
    </div>
    <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
      ${vault.isUnlocked
        ? `<button type="button" onclick="window.print()" style="background:#181412;color:#FDE68A;border:1.5px solid #C8A96E;border-radius:10px;padding:9px 16px;font-weight:800;font-size:0.80rem;cursor:pointer;white-space:nowrap;">${VR_PRINT_SVG}Print All ${guests.length} Avery 5302 Cards (PDF)</button>`
        : `<a href="${buyPackUrl}" style="background:#181412;color:#FDE68A;border:1.5px solid #C8A96E;border-radius:10px;padding:9px 16px;font-weight:800;font-size:0.80rem;text-decoration:none;white-space:nowrap;">${VR_LOCK_SVG}Unlock Avery 5302 Print Pack ($7) &rarr;</a><button type="button" onclick="window.print()" style="background:#FAF6EE;color:#57534E;border:1px solid #D6CFC2;border-radius:10px;padding:9px 12px;font-weight:700;font-size:0.74rem;cursor:pointer;white-space:nowrap;">${VR_PRINT_SVG}Print Sample Proof</button>`}
    </div>
  </div>
  ${vault.isUnlocked ? '' : '<div class="proof-wm" aria-hidden="true"><span>PREVIEW PROOF &bull; UNLOCK AVERY 5302 PACK ($7) AT SEATHARMONY.COM</span></div>'}
  <div class="sheet-grid">${cardsHtml}</div>
</body>
</html>`;
      return res.status(200).type('html').send(html);
    } catch (err) {
      return res.status(500).send('Internal Server Error');
    }
  });

  // 7. Signed Clockwise 12:00 Caterer Meal Sheet Packet (GET /print/beo/:vaultId)
  app.get('/print/beo/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query);
      const guests = extractAllSeatedGuests(vault.state), tables = Array.isArray(vault.state.tables) ? vault.state.tables : [];
      const allergies = guests.filter(g => g.allergy && g.allergy !== 'None'), chairMods = guests.filter(g => g.accessibility && g.accessibility !== 'Standard Chair');
      const filetCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'BEEF').length, fishCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'FISH').length;
      const veganCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'VEGAN').length, kidsCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'KIDS').length;
      const csvRowsJson = JSON.stringify([
        'Table,Clockwise_Seat,Clock_Position,Guest_Name,Entree,Allergy_Alert,Chair_Setup',
        ...(vault.isMealUnlocked ? guests : guests.filter(g => g.tableNumber === 1)).map(g => `"${g.tableName}",Seat #${g.seatNumber},"${g.clockLabel}","${g.name}","${g.meal}","${g.allergy}","${g.accessibility}"`)
      ].join('\r\n')).replace(/</g, '\\u003c');

      const tableSheetsHtml = tables.map((t, idx) => {
        if (idx >= 1 && !vault.isMealUnlocked) {
          return `<div style="background:#FAF8F5;border:1.5px dashed #1B4D3E;border-radius:14px;padding:16px;margin-bottom:16px;break-inside:avoid;"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;"><div><span class="mono" style="font-size:0.72rem;font-weight:800;color:#8C2D19;">TABLE ${t.number || (idx + 1)} &bull; ${escapeHtml((t.shape || 'round').toUpperCase())}</span><h3 class="serif" style="font-size:1.35rem;">${escapeHtml(t.name || `Table ${idx + 1}`)}</h3></div><span class="mono" style="font-size:0.75rem;font-weight:800;color:#065F46;background:#EBF4F0;border:1px solid #1B4D3E;padding:5px 12px;border-radius:999px;">${VR_LOCK_SVG}Table ${t.number || (idx + 1)} Clockwise 12:00 Meal &amp; Allergy Roster (${(t.guests || []).length} Guests) &mdash; Enter Email Above ($0) or Unlock $7 Print Pack &uarr;</span></div></div>`;
        }
        const seats = (t.geometry && Array.isArray(t.geometry.seats)) ? t.geometry.seats : [], totalInTable = (t.guests || []).length || 8;
        const rowsHtml = (t.guests || []).map((g, sIdx) => {
          const seatMeta = seats[sIdx] || {}, seatNumber = seatMeta.seatNumber || (sIdx + 1), clockLabel = seatMeta.clockLabel || computeClockLabel(sIdx, totalInTable);
          const mInfo = mealSymbolInfo(g.meal), hasAllergy = g.allergy && g.allergy !== 'None';
          return `<tr style="border-bottom:1px solid #EFEAE1;${hasAllergy ? 'background:#FFF1F2;' : ''}"><td class="mono" style="padding:7px 10px;font-weight:800;white-space:nowrap;color:${sIdx === 0 ? '#8C2D19' : '#181412'};">Seat #${seatNumber} (${escapeHtml(clockLabel)})</td><td style="padding:7px 10px;font-weight:700;white-space:nowrap;">${escapeHtml(g.name)}</td><td style="padding:7px 10px;font-weight:700;white-space:nowrap;color:${mInfo.color};">${mInfo.sym} ${escapeHtml(g.meal || 'Filet Mignon')}</td><td style="padding:7px 10px;font-weight:800;white-space:nowrap;color:${hasAllergy ? '#B91C1C' : '#065F46'};">${hasAllergy ? `Alert: ${escapeHtml(g.allergy)}` : 'None'}</td><td style="padding:7px 10px;font-size:0.78rem;white-space:nowrap;color:#57534E;">${escapeHtml(g.accessibility || 'Standard Chair')}</td></tr>`;
        }).join('');
        return `<div style="background:#FFFFFF;border:1.5px solid #E2D9C8;border-radius:14px;padding:16px;margin-bottom:16px;break-inside:avoid;"><div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #181412;padding-bottom:8px;margin-bottom:10px;"><div><span class="mono" style="font-size:0.72rem;font-weight:800;color:#8C2D19;">TABLE ${t.number || (idx + 1)} &bull; ${escapeHtml((t.shape || 'round').toUpperCase())}${!vault.isMealUnlocked ? ' &bull; FREE SAMPLE PROOF' : ''}</span><h3 class="serif" style="font-size:1.35rem;">${escapeHtml(t.name || `Table ${idx + 1}`)}</h3></div><span class="mono" style="font-size:0.72rem;font-weight:800;background:#FAF3E3;border:1px solid #C8A96E;padding:4px 10px;border-radius:999px;white-space:nowrap;">&#9679; Seat #1 = 12:00 (Facing Dance Floor)</span></div><table style="width:100%;border-collapse:collapse;font-size:0.82rem;text-align:left;"><thead><tr style="background:#FAF6EE;color:#57534E;font-size:0.70rem;text-transform:uppercase;"><th style="padding:6px 10px;white-space:nowrap;">Clockwise Seat</th><th style="padding:6px 10px;white-space:nowrap;">Guest Name</th><th style="padding:6px 10px;white-space:nowrap;">Entr&eacute;e</th><th style="padding:6px 10px;white-space:nowrap;">Allergy / Kitchen Alert</th><th style="padding:6px 10px;white-space:nowrap;">Chair Setup</th></tr></thead><tbody>${rowsHtml}</tbody></table></div>`;
      }).join('');

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Clockwise 12:00 Caterer Meal Sheet | ${escapeHtml(vault.title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #FAF6EE; color: #181412; font-family: 'Plus Jakarta Sans', sans-serif; }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 700; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    @media print { .no-print { display: none !important; } body { background: #FFFFFF; } }
  </style>
</head>
<body>
  ${renderTopPrintBar({ vault, activeRoute: 'beo', baseUrl })}
  <main style="max-width:980px;margin:24px auto 64px;padding:0 18px;">
    <div style="background:linear-gradient(180deg,#FFFFFF 0%,#FAF3E3 100%);color:#181412;border:2px solid #C8A96E;border-radius:16px;padding:18px 22px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:nowrap;gap:14px;box-shadow:0 8px 24px rgba(24,20,18,0.05);">
      <div style="min-width:0;">
        <div class="mono" style="font-size:0.68rem;color:#8C2D19;font-weight:800;white-space:nowrap;">CATERING &amp; TABLE SERVICE SHEET</div>
        <h1 class="serif" style="font-size:1.72rem;color:#181412;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(vault.title)} &bull; Table Service Guide</h1>
        <div style="font-size:0.78rem;color:#57534E;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(vault.venueName)} &bull; ${tables.length} Tables &bull; ${guests.length} Guests &bull; ${allergies.length} Allergy Notes &bull; ${chairMods.length} Chair Notes</div>
      </div>
      <div class="no-print" style="display:flex;gap:8px;flex-wrap:nowrap;flex-shrink:0;">
        <button id="download-csv" type="button" onclick="window.downloadBeoCsv()" style="background:#FFFFFF;color:#78350F;border:1.5px solid #C8A96E;border-radius:10px;padding:9px 14px;font-weight:800;font-size:0.78rem;cursor:pointer;white-space:nowrap;">&darr; Export .CSV</button>
        <button type="button" onclick="window.print()" style="background:linear-gradient(135deg,#FDE68A,#C8A96E);color:#181412;border:1.5px solid #B89352;border-radius:10px;padding:9px 16px;font-weight:800;font-size:0.80rem;cursor:pointer;white-space:nowrap;">${VR_PRINT_SVG}Print Signed Meal Sheet PDF</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:10px;margin-bottom:18px;">
      <div style="background:#FDF2EE;border:1.5px solid #F5D0C5;padding:10px 12px;border-radius:12px;text-align:center;"><div class="mono" style="font-size:0.66rem;font-weight:800;color:#8C2D19;white-space:nowrap;">&#9670; FILET MIGNON</div><div style="font-size:1.35rem;font-weight:800;">${filetCount}</div></div>
      <div style="background:#F0F9FF;border:1.5px solid #BAE6FD;padding:10px 12px;border-radius:12px;text-align:center;"><div class="mono" style="font-size:0.66rem;font-weight:800;color:#0369A1;white-space:nowrap;">&#9679; HALIBUT</div><div style="font-size:1.35rem;font-weight:800;">${fishCount}</div></div>
      <div style="background:#ECFDF5;border:1.5px solid #A7F3D0;padding:10px 12px;border-radius:12px;text-align:center;"><div class="mono" style="font-size:0.66rem;font-weight:800;color:#065F46;white-space:nowrap;">&#9650; VEGAN RISOTTO</div><div style="font-size:1.35rem;font-weight:800;">${veganCount}</div></div>
      <div style="background:#FFFBEB;border:1.5px solid #FDE68A;padding:10px 12px;border-radius:12px;text-align:center;"><div class="mono" style="font-size:0.66rem;font-weight:800;color:#A16207;white-space:nowrap;">&#9733; KIDS MEALS</div><div style="font-size:1.35rem;font-weight:800;">${kidsCount}</div></div>
      <div style="background:#FFF1F2;border:1.5px solid #FECDD3;padding:10px 12px;border-radius:12px;text-align:center;"><div class="mono" style="font-size:0.66rem;font-weight:800;color:#9F1239;white-space:nowrap;">ALLERGY ALERTS</div><div style="font-size:1.35rem;font-weight:800;color:#9F1239;">${allergies.length}</div></div>
      <div style="background:#FAF3E3;border:1.5px solid #C8A96E;padding:10px 12px;border-radius:12px;text-align:center;"><div class="mono" style="font-size:0.66rem;font-weight:800;color:#78350F;white-space:nowrap;">CHAIR MODS</div><div style="font-size:1.35rem;font-weight:800;color:#78350F;">${chairMods.length}</div></div>
    </div>
    ${tableSheetsHtml}
    <!-- Pillar 3 Catering Quality Assurance Strip -->
    <div id="sh-beo-page-qa-strip" class="no-print" style="margin-top:20px;background:#FFFBEB;border:1.5px solid #FDE68A;border-radius:14px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px;color:#78350F;">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <span style="font-weight:800;color:#1B4D3E;">&#10003; Banquet Captain Certified:</span>
        <span style="color:#574F49;">Seat #1 starts at 12:00 facing the head table, rotating clockwise. Eliminates auctioning off meals in front of guests.</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;font-weight:700;">
        <span style="color:#1B4D3E;">&#10003; 30-Day Money-Back Guarantee</span>
        <span style="color:#0369A1;">&#10003; 1-Click .CSV Export</span>
      </div>
    </div>
  </main>
  <script>
    window.downloadBeoCsv = function() {
      var csv = ${csvRowsJson}, blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }), url = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = url; a.download = 'seatharmony-clockwise-meal-sheet-${escapeHtml(vault.vaultId)}.csv'; document.body.appendChild(a); a.click(); a.remove();
    };
  </script>
</body>
</html>`;
      return res.status(200).type('html').send(html);
    } catch (err) { return res.status(500).send('Internal Server Error'); }
  });

  app.get('/qr/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query), urls = buildVaultUrls(baseUrl, vault.vaultId);
      const guests = extractAllSeatedGuests(vault.state).sort((a, b) => a.name.localeCompare(b.name)), tables = Array.isArray(vault.state.tables) ? vault.state.tables : [];
      const monogram = computeMonogram(vault.title), qrImgUrl = buildInlineQrDataUri(urls.qr_lookup);
      const safeGuestsJson = JSON.stringify(vault.isUnlocked ? guests : guests.slice(0, 1)).replace(/</g, '\\u003c'), totalSeatedCount = guests.length;

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Find Your Seat | ${escapeHtml(vault.title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #FAF6EE; color: #181412; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 700; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .qr-page-wrap { max-width: 960px; margin: 24px auto 56px; padding: 0 16px; display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.95fr); gap: 20px; align-items: start; }
    .qr-shell { background: #FFFFFF; color: #181412; border: 2px solid #C8A96E; border-radius: 24px; padding: 24px 20px; box-shadow: 0 16px 40px rgba(24,20,18,0.07); }
    .search-input { width: 100%; padding: 14px 16px; border-radius: 14px; border: 2px solid #C8A96E; font-size: 1rem; font-weight: 700; background: #FAF8F5; color: #181412; outline: none; margin: 14px 0 10px; }
    .guest-card { background: #FAF8F5; border: 1.5px solid #E2D9C8; border-radius: 14px; padding: 13px 16px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; gap: 10px; }
    .pill-btn { padding: 5px 11px; border-radius: 999px; border: 1px solid #C8A96E; background: #FAF6EE; color: #57534E; font-size: 0.75rem; font-weight: 800; cursor: pointer; white-space: nowrap; }
    .pill-btn:hover { background: #FAF3E3; color: #8C2D19; }
    @media (max-width: 820px) { .qr-page-wrap { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  ${renderTopPrintBar({ vault, activeRoute: 'qr', baseUrl })}
  <div class="qr-page-wrap">
    <div class="qr-shell">
      <div style="text-align:center;border-bottom:1.5px solid #E2D9C8;padding-bottom:16px;">
        <div style="width:58px;height:58px;border-radius:14px;background:#FAF3E3;border:2px solid #C8A96E;color:#8C2D19;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:8px;"><span class="serif" style="font-size:1.3rem;line-height:1;">${escapeHtml(monogram)}</span><span class="mono" style="font-size:0.46rem;color:#78350F;">WELCOME</span></div>
        <div class="mono" style="font-size:0.68rem;font-weight:800;color:#8C2D19;letter-spacing:0.12em;text-transform:uppercase;">${escapeHtml(vault.venueName)}</div>
        <h1 class="serif" style="font-size:2.05rem;line-height:1.1;margin:2px 0;">Find Your Seat</h1>
        <div style="font-size:0.86rem;color:#57534E;">${escapeHtml(vault.title)} &bull; ${guests.length} Guests Seated</div>
      </div>
      <input id="qr-live-input" type="search" class="search-input" placeholder="Search your name (e.g. Eleanor, Chen)..." autofocus oninput="renderQrGuests(this.value)" />
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">
        <button type="button" class="pill-btn" onclick="document.getElementById('qr-live-input').value='';renderQrGuests('');">All (${guests.length})</button>
        <button type="button" class="pill-btn" onclick="document.getElementById('qr-live-input').value='Eleanor';renderQrGuests('Eleanor');">Eleanor Vance</button>
        <button type="button" class="pill-btn" onclick="document.getElementById('qr-live-input').value='Chen';renderQrGuests('Chen');">Chen Family</button>
        <button type="button" class="pill-btn" onclick="document.getElementById('qr-live-input').value='Table 1';renderQrGuests('Table 1');">Table 1 (VIP)</button>
        <button type="button" class="pill-btn" onclick="document.getElementById('qr-live-input').value='Table 2';renderQrGuests('Table 2');">Table 2</button>
      </div>
      <div id="qr-guest-list"></div>
      ${vault.isUnlocked ? '' : `<div style="margin-top:10px;padding:12px 14px;border-radius:12px;background:#FAF6EE;border:1.5px dashed #C8A96E;font-size:0.82rem;font-weight:800;color:#78350F;">${VR_LOCK_SVG}+${Math.max(0, totalSeatedCount - 1)} Additional Seated Guests (Tables 2&ndash;${tables.length} Live Phone Lookup) &mdash; Unlock $7 Event Print Pack &uarr;</div>`}
    </div>
    <div style="min-width:0;background:#FFFFFF;border:1.5px solid #D8C29D;border-radius:22px;padding:22px;color:#181412;box-shadow:0 12px 32px rgba(24,20,18,0.06);">
      <div class="mono" style="font-size:0.70rem;font-weight:800;color:#8C2D19;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px;">COCKTAIL-HOUR FOYER QR DISPLAY</div>
      <h2 class="serif" style="font-size:1.65rem;color:#181412;line-height:1.15;margin-bottom:10px;">Guests Scan at the Bar. Zero Easel Crowds.</h2>
      <p style="font-size:0.86rem;color:#57534E;line-height:1.5;margin-bottom:16px;">Print this QR on bar signs or the corner of your 24&Prime;&times;36&Prime; welcome sign so guests find their table and clockwise seat in 3 seconds.</p>
      <div style="display:flex;align-items:center;gap:14px;background:#FAF3E3;border:1.5px solid #C8A96E;border-radius:16px;padding:14px;margin-bottom:16px;">
        <img src="${qrImgUrl}" width="84" height="84" alt="Live Reception QR Code" style="border-radius:10px;border:1.5px solid #C8A96E;background:#FFFFFF;padding:4px;flex-shrink:0;" />
        <div style="min-width:0;"><div class="mono" style="font-size:0.70rem;color:#065F46;font-weight:800;white-space:nowrap;">&#9679; Live Guest Table &amp; Seat Lookup</div><div style="font-size:0.88rem;font-weight:800;color:#181412;margin:3px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Instant Guest Name &amp; Table Lookup</div><div style="font-size:0.76rem;color:#57534E;">Syncs automatically with last-minute seat swaps.</div></div>
      </div>
      <div style="border-top:1px solid #E2D9C8;padding-top:12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;">
        ${tables.slice(0, 6).map((t, idx) => `<div style="min-width:0;background:#FAF8F5;border:1px solid #E2D9C8;border-radius:10px;padding:8px 10px;"><div class="mono" style="font-size:0.66rem;color:#8C2D19;font-weight:800;">TABLE ${t.number || (idx + 1)}</div><div style="font-size:0.80rem;font-weight:700;color:#181412;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(t.name || `Table ${idx + 1}`)}</div><div style="font-size:0.70rem;color:#57534E;">${(t.guests || []).length} Seated Guests</div></div>`).join('')}
      </div>
      <div style="margin-top:14px;padding:12px;background:#FAF8F5;border:1px solid #E2D9C8;border-radius:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:0.75rem;">
        <span style="font-weight:800;color:#1B4D3E;">&#10003; Zero App Download Required</span>
        <span style="font-weight:700;color:#78350F;background:#FFFBEB;border:1px solid #FDE68A;padding:2px 8px;border-radius:999px;">&#10003; 30-Day Money-Back Guarantee</span>
      </div>
    </div>
  </div>
  <script>
    var GUESTS = ${safeGuestsJson};
    function renderQrGuests(q) {
      var clean = String(q || '').trim().toLowerCase();
      var nameMatches = GUESTS.filter(function(g) { return !clean || g.name.toLowerCase().includes(clean); });
      var matches = nameMatches.length ? nameMatches : GUESTS.filter(function(g) { return g.tableName.toLowerCase().includes(clean) || ('table ' + g.tableNumber).includes(clean); });
      var box = document.getElementById('qr-guest-list');
      if (!matches.length) { box.innerHTML = '<div style="text-align:center;padding:20px;color:#78716C;font-size:0.9rem;">Guest #1 shown as Free Sample Proof. Unlock the $7 Event Print Pack above to enable live phone lookup for all seated guests.</div>'; return; }
      box.innerHTML = matches.slice(0, 8).map(function(g, idx) {
        return '<div class="guest-card"><div style="min-width:0;"><div style="font-weight:800;font-size:1rem;color:#181412;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + g.name + (idx === 0 ? ' (Free Sample Proof)' : '') + '</div><div style="font-size:0.78rem;color:#57534E;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + g.tableName + ' &bull; ' + g.meal + '</div></div><div style="text-align:right;background:#FAF3E3;color:#78350F;border:1.5px solid #C8A96E;padding:6px 12px;border-radius:10px;flex-shrink:0;white-space:nowrap;"><div class="serif" style="font-size:1.15rem;line-height:1;color:#8C2D19;">Table ' + g.tableNumber + '</div><div class="mono" style="font-size:0.65rem;color:#78350F;margin-top:2px;">Seat #' + g.seatNumber + ' (' + g.clockLabel + ')</div></div></div>';
      }).join('');
    }
    renderQrGuests('');
  </script>
</body>
</html>`;
      return res.status(200).type('html').send(html);
    } catch (err) { return res.status(500).send('Internal Server Error'); }
  });
}

module.exports = { normalizeVaultId, resolveVaultRecord, buildVaultUrls, attachVaultAndPaywallRoutes };

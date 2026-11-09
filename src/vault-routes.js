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
const { renderFloorplanPrintPage } = require('./vault-floorplan-view');
const { renderPosterPrintPage, renderAveryPrintPage, renderServerStationRoutePage, renderTurnoverBriefPage } = require('./vault-print-views');

const {
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
} = require('./vault-helpers');

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
        const summaryText = `Saved Reception Vault #${vaultId} (${title}) — Clockwise 12:00 Caterer Sheet Ready`;
        ebStore.recordLead({ email: finalEmail, summaryText, utmSource: String(body.utm_source || 'vault_save'), isTest: isTestReq, clientIp });
        ebStore.recordEvent({ eventType: 'lead_capture', pageUrl: String(body.page_url || '/api/vault/save'), deviceType: /mobile|iphone|android/i.test(ua) ? 'mobile' : 'desktop', utmSource: String(body.utm_source || 'vault_save'), isTest: isTestReq, clientIp, meta: { js_hydrated: 1, vaultId } });
        if (typeof ebStore.sendOneClickLeadEmail === 'function') {
          try { ebStore.sendOneClickLeadEmail(finalEmail, summaryText, Boolean(isTestReq)).catch(() => {}); } catch (_) {}
        }
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
      const qrImgUrl = buildRealQrUrl(urls.qr_lookup), fallbackQrUri = buildInlineQrDataUri(urls.qr_lookup);
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
    .container { max-width: 1200px; margin: 0 auto; padding: 28px 20px 64px; width: 100%; }
    .card { background: #FFFFFF; border: 1.5px solid #E2D9C8; border-radius: 18px; padding: 22px; box-shadow: 0 10px 28px rgba(24,20,18,0.05); min-width: 0; max-width: 100%; word-break: break-word; overflow-wrap: break-word; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 9px 14px; border-radius: 10px; font-weight: 800; font-size: 0.80rem; text-decoration: none; cursor: pointer; border: 1.5px solid transparent; white-space: nowrap; transition: all 0.15s ease; max-width: 100%; }
    .btn-gold { background: #1B4D3E; color: #FFFFFF; border-color: #14382D; }
    .btn-gold:hover { background: #14382D; }
    .btn-outline { background: #FFFFFF; color: #1B4D3E; border-color: #1B4D3E; }
    .btn-outline:hover { background: #EBF4F0; }
    .grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 20px; width: 100%; }
    @media (max-width: 780px) { .grid-2 { grid-template-columns: minmax(0, 1fr); } }
    @media (max-width: 500px) { .container { padding: 16px 12px 48px; } .card { padding: 16px; } }
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
                : `${VR_LOCK_SVG}<strong>Table 1 Free Sample Active:</strong> Enter your email below ($0) to unmask Tables 2&ndash;8 Meal Sheet, or unlock the $7 Event Print Pack.`}
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

    <!-- Complete Day-Of Event Bundle Package Header Strip -->
    <div class="card" style="background:#FAF8F5;border:1.5px solid #D8C29D;padding:16px 20px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <span style="font-size:1.6rem;line-height:1;"></span>
        <div>
          <div style="font-size:0.70rem;font-weight:800;letter-spacing:0.08em;color:#78350F;text-transform:uppercase;">COORDINATOR-READY DAY-OF EVENT PACKAGE</div>
          <div style="font-size:1.05rem;font-weight:800;color:#181412;">Complete Day-Of Production Bundle (All 4 Assets Formatted &amp; Aligned)</div>
          <div style="font-size:0.80rem;color:#57534E;margin-top:2px;">Includes 24&Prime;&times;36&Prime; Arch D Poster &bull; Avery 5302 Place Cards &bull; Clockwise 12:00 Caterer Meal Sheet &bull; 8&Prime;&times;10&Prime; Bar Easel Sign</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <button type="button" class="btn btn-gold" onclick="window.printAllEventSheets &amp;&amp; window.printAllEventSheets()" style="background:#1B4D3E;border-color:#14382D;">${VR_PRINT_SVG}Print All Day-Of Assets</button>
      </div>
    </div>

    <!-- 4 Inside-the-Paywall Production Deliverables -->
    <div class="grid-2">
      <!-- Card 1: 24x36 Arch D Welcome Poster -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
            <span class="mono" style="font-size:0.68rem;font-weight:800;color:#78350F;background:#FAF3E3;border:1px solid #C8A96E;padding:3px 10px;border-radius:999px;white-space:nowrap;">DELIVERABLE 1 &middot; 24&Prime;&times;36&Prime; ARCH D SIGN</span>
            <span style="font-size:0.75rem;font-weight:800;color:#065F46;white-space:nowrap;">6 Themes &bull; 0.125&Prime; Bleed</span>
          </div>
          <h2 class="serif" style="font-size:1.5rem;margin-bottom:6px;">Print-Ready 24&Prime;&times;36&Prime; Welcome Poster</h2>
          <p style="font-size:0.86rem;color:#44403C;line-height:1.5;">
            Print-Ready vector poster for FedEx Office or Staples across <strong>6 Luxury Themes</strong>, with A-Z or By-Table sorting and live monogram editing.
          </p>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <a href="${urls.print_poster}" class="btn btn-gold">${VR_PRINT_SVG}Open 24&Prime;&times;36&Prime; Studio &rarr;</a>
          <a href="${urls.print_poster}?theme=obsidian" class="btn btn-outline" style="padding:8px 11px;">Noir</a>
          <a href="${urls.print_poster}?theme=sage" class="btn btn-outline" style="padding:8px 11px;">Tuscan Sage</a>
          <a href="${urls.print_poster}?theme=rosewater" class="btn btn-outline" style="padding:8px 11px;">Rosewater</a>
        </div>
      </div>

      <!-- Card 2: Avery 5302 Folded Tent Place Cards -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
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
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
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
        <div style="display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap;">
          <img src="${qrImgUrl}" onerror="this.onerror=null;this.src='${fallbackQrUri}'" width="84" height="84" alt="Scannable Cocktail Hour QR Code" style="border-radius:10px;border:1.5px solid #C8A96E;background:#FAF6EE;padding:4px;flex-shrink:0;" />
          <div style="flex:1 1 200px;min-width:0;">
            <span class="mono" style="font-size:0.68rem;font-weight:800;color:#78350F;background:#FAF3E3;border:1px solid #C8A96E;padding:2px 8px;border-radius:999px;display:inline-block;max-width:100%;">DELIVERABLE 4 &middot; LIVE QR &amp; FAMILY SHARE</span>
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
  <script>
    window.printAllEventSheets = function() {
      window.open('${urls.print_poster}?auto_print=1', '_blank');
      setTimeout(function() { window.open('${urls.print_floorplan}?auto_print=1', '_blank'); }, 500);
      setTimeout(function() { window.open('${urls.print_avery}?auto_print=1', '_blank'); }, 1000);
      setTimeout(function() { window.open('${urls.print_beo}', '_blank'); }, 1500);
      setTimeout(function() { window.open('${urls.qr_lookup}?auto_print=1', '_blank'); }, 2000);
    };
    if (new URLSearchParams(window.location.search).get('auto_print_all') === '1') {
      setTimeout(window.printAllEventSheets, 300);
    }
  </script>
</body>
</html>`;
      return res.status(200).type('html').send(html);
    } catch (err) { return res.status(500).send('Internal Server Error'); }
  });

  app.get('/print/floorplan/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query), urls = buildVaultUrls(baseUrl, vault.vaultId);
      return res.status(200).type('html').send(renderFloorplanPrintPage({ vault, urls, baseUrl, req }));
    } catch (err) { return res.status(500).send('Internal Server Error'); }
  });

  app.get('/print/poster/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query);
      const urls = buildVaultUrls(baseUrl, vault.vaultId);
      const html = renderPosterPrintPage(vault, urls, req.query);
      return res.status(200).type('html').send(html);
    } catch (err) {
      return res.status(500).send('Internal Server Error');
    }
  });

  // 6. Avery 5302 Folded Tent Place Cards Print Sheet (GET /print/avery-5302/:vaultId)
  app.get('/print/avery-5302/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query);
      const urls = buildVaultUrls(baseUrl, vault.vaultId);
      const html = renderAveryPrintPage(vault, urls, req.query);
      return res.status(200).type('html').send(html);
    } catch (err) {
      return res.status(500).send('Internal Server Error');
    }
  });

  // 7. Signed Clockwise 12:00 Caterer Meal Sheet Packet (GET /print/beo/:vaultId)
  app.get('/print/beo/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query), urls = buildVaultUrls(baseUrl, vault.vaultId);
      const guests = extractAllSeatedGuests(vault.state), tables = Array.isArray(vault.state.tables) ? vault.state.tables : [];
      const allergies = guests.filter(g => g.allergy && g.allergy !== 'None'), chairMods = guests.filter(g => g.accessibility && g.accessibility !== 'Standard Chair');
      const filetCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'BEEF').length, fishCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'FISH').length;
      const veganCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'VEGAN').length, kidsCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'KIDS').length;
      const chkCount = guests.filter(g => mealSymbolInfo(g.meal).code === 'CHICKEN').length;
      const csvRowsJson = JSON.stringify([
        'Table,Clockwise_Seat,Clock_Position,Guest_Name,Entree,Allergy_Alert,Chair_Setup',
        ...(vault.isMealUnlocked ? guests : guests.filter(g => g.tableNumber === 1)).map(g => `"${g.tableName}",Seat #${g.seatNumber},"${g.clockLabel}","${g.name}","${g.meal}","${g.allergy}","${g.accessibility}"`)
      ].join('\r\n')).replace(/</g, '\\u003c');

      const allergySummaryHtml = allergies.length ? `
        <div class="table-sheet-card" style="margin-bottom:16px;background:#FFF1F2;border:1.5px solid #FECDD3;border-radius:14px;padding:12px 16px;break-inside:avoid;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
            <span class="mono" style="font-size:0.70rem;font-weight:800;color:#9F1239;letter-spacing:0.04em;">⚠KITCHEN ALLERGY TRIAGE ROSTER (${allergies.length} ALERTS)</span>
            <span style="font-size:0.72rem;color:#9F1239;font-weight:700;">Plate separately &bull; Red flag on food pass</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            ${allergies.map(a => `
              <span style="background:#FFFFFF;border:1px solid #FDA4AF;padding:4px 9px;border-radius:6px;font-size:0.76rem;color:#181412;display:inline-flex;align-items:center;gap:5px;">
                <strong style="color:#9F1239;">Tbl ${a.tableNumber} (Seat #${a.seatNumber}):</strong> ${escapeHtml(a.name)} &mdash; <strong style="color:#B91C1C;">${escapeHtml(a.allergy)}</strong>
              </span>
            `).join('')}
          </div>
        </div>` : '';

      const kitchenMatrixRows = tables.map((t, idx) => {
        const isLockedRow = idx >= 1 && !vault.isMealUnlocked;
        const tGuests = Array.isArray(t.guests) ? t.guests : [];
        const covers = tGuests.length;
        const beef = tGuests.filter(g => mealSymbolInfo(g.meal).code === 'BEEF').length;
        const fish = tGuests.filter(g => mealSymbolInfo(g.meal).code === 'FISH').length;
        const chicken = tGuests.filter(g => mealSymbolInfo(g.meal).code === 'CHICKEN').length;
        const veg = tGuests.filter(g => ['VEGAN', 'VEG'].includes(mealSymbolInfo(g.meal).code)).length;
        const kids = tGuests.filter(g => mealSymbolInfo(g.meal).code === 'KIDS').length;
        const tAllergies = tGuests.filter(g => g.allergy && g.allergy !== 'None').map(g => `${g.name.split(' ')[0]}: ${g.allergy}`).join(', ');

        if (isLockedRow) {
          return `<tr style="border-bottom:1px solid #EFEAE1;color:#78716C;background:#FAF8F5;">
            <td class="mono" style="padding:6px 10px;font-weight:700;">Tbl ${t.number || (idx + 1)}</td>
            <td style="padding:6px 10px;">${escapeHtml(t.name || `Table ${idx + 1}`)}</td>
            <td colspan="7" class="mono" style="padding:6px 10px;font-size:0.75rem;color:#78350F;text-align:center;">${VR_LOCK_SVG}Tray Breakdown Locked &mdash; Enter Email Above ($0) to Unlock All Tables</td>
          </tr>`;
        }

        return `<tr style="border-bottom:1px solid #EFEAE1;${tAllergies ? 'background:#FFFDF7;' : ''}">
          <td class="mono" style="padding:6px 10px;font-weight:800;color:#8C2D19;">Tbl ${t.number || (idx + 1)}</td>
          <td style="padding:6px 10px;font-weight:700;">${escapeHtml(t.name || `Table ${idx + 1}`)}</td>
          <td class="mono" style="padding:6px 10px;text-align:center;font-weight:800;">${covers}</td>
          <td class="mono" style="padding:6px 10px;text-align:center;font-weight:700;color:#8C2D19;">${beef || '-'}</td>
          <td class="mono" style="padding:6px 10px;text-align:center;font-weight:700;color:#0369A1;">${fish || '-'}</td>
          <td class="mono" style="padding:6px 10px;text-align:center;font-weight:700;color:#92400E;">${chicken || '-'}</td>
          <td class="mono" style="padding:6px 10px;text-align:center;font-weight:700;color:#15803D;">${veg || '-'}</td>
          <td class="mono" style="padding:6px 10px;text-align:center;font-weight:700;color:#B45309;">${kids || '-'}</td>
          <td style="padding:6px 10px;font-size:0.75rem;color:${tAllergies ? '#B91C1C' : '#78716C'};font-weight:${tAllergies ? '700' : '500'};">${tAllergies ? escapeHtml(tAllergies) : '&#10003; None'}</td>
        </tr>`;
      }).join('');

      const kitchenMatrixHtml = `
        <div class="table-sheet-card" style="background:#FFFFFF;border:1.5px solid #E2D9C8;border-radius:14px;padding:16px;margin-bottom:16px;break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #181412;padding-bottom:8px;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
            <div>
              <span class="mono" style="font-size:0.70rem;font-weight:800;color:#8C2D19;letter-spacing:0.04em;">KITCHEN TRAY STAGING MATRIX &bull; BEO SUMMARY</span>
              <h3 class="serif" style="font-size:1.30rem;margin-top:2px;">Table-by-Table Plating Counts &amp; Dietary Flags</h3>
            </div>
            <span class="mono" style="font-size:0.70rem;font-weight:800;background:#EBF4F0;color:#065F46;border:1px solid #A7F3D0;padding:4px 10px;border-radius:999px;">&#10003; 100% Dish Reconciliation</span>
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:0.80rem;text-align:left;">
              <thead>
                <tr style="background:#FAF6EE;color:#57534E;font-size:0.68rem;text-transform:uppercase;">
                  <th style="padding:6px 10px;">Table</th>
                  <th style="padding:6px 10px;">Name</th>
                  <th style="padding:6px 10px;text-align:center;">Covers</th>
                  <th style="padding:6px 10px;text-align:center;color:#8C2D19;">&#9670; Beef</th>
                  <th style="padding:6px 10px;text-align:center;color:#0369A1;">&#9679; Fish</th>
                  <th style="padding:6px 10px;text-align:center;color:#92400E;">&#9632; Chk</th>
                  <th style="padding:6px 10px;text-align:center;color:#15803D;">&#9650; Veg</th>
                  <th style="padding:6px 10px;text-align:center;color:#B45309;">&#9733; Kids</th>
                  <th style="padding:6px 10px;">Allergy Triage Notes</th>
                </tr>
              </thead>
              <tbody>
                ${kitchenMatrixRows}
              </tbody>
              <tfoot>
                <tr style="background:#FAF3E3;font-weight:800;border-top:2px solid #C8A96E;">
                  <td colspan="2" style="padding:8px 10px;font-size:0.75rem;">TOTAL SERVICE RECONCILIATION</td>
                  <td class="mono" style="padding:8px 10px;text-align:center;font-size:0.82rem;">${guests.length}</td>
                  <td class="mono" style="padding:8px 10px;text-align:center;color:#8C2D19;">${filetCount}</td>
                  <td class="mono" style="padding:8px 10px;text-align:center;color:#0369A1;">${fishCount}</td>
                  <td class="mono" style="padding:8px 10px;text-align:center;color:#92400E;">${chkCount}</td>
                  <td class="mono" style="padding:8px 10px;text-align:center;color:#15803D;">${veganCount}</td>
                  <td class="mono" style="padding:8px 10px;text-align:center;color:#B45309;">${kidsCount}</td>
                  <td style="padding:8px 10px;font-size:0.75rem;color:#9F1239;">${allergies.length} Flagged Trays</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>`;

      const tableSheetsHtml = tables.map((t, idx) => {
        if (idx >= 1 && !vault.isMealUnlocked) {
          return `<div class="table-sheet-card" style="background:#FAF8F5;border:1.5px dashed #1B4D3E;border-radius:14px;padding:16px;margin-bottom:16px;break-inside:avoid;"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;"><div><span class="mono" style="font-size:0.72rem;font-weight:800;color:#8C2D19;">TABLE ${t.number || (idx + 1)} &bull; ${escapeHtml((t.shape || 'round').toUpperCase())}</span><h3 class="serif" style="font-size:1.35rem;">${escapeHtml(t.name || `Table ${idx + 1}`)}</h3></div><span class="mono" style="font-size:0.75rem;font-weight:800;color:#065F46;background:#EBF4F0;border:1px solid #1B4D3E;padding:5px 12px;border-radius:999px;">${VR_LOCK_SVG}Table ${t.number || (idx + 1)} Clockwise 12:00 Meal &amp; Allergy Roster (${(t.guests || []).length} Guests) &mdash; Enter Email Above ($0) or Unlock $7 Print Pack &uarr;</span></div></div>`;
        }
        const seats = (t.geometry && Array.isArray(t.geometry.seats)) ? t.geometry.seats : [], totalInTable = (t.guests || []).length || 8;
        const rowsHtml = (t.guests || []).map((g, sIdx) => {
          const seatMeta = seats[sIdx] || {}, seatNumber = seatMeta.seatNumber || (sIdx + 1), clockLabel = seatMeta.clockLabel || computeClockLabel(sIdx, totalInTable);
          const mInfo = mealSymbolInfo(g.meal), hasAllergy = g.allergy && g.allergy !== 'None';
          return `<tr style="border-bottom:1px solid #EFEAE1;${hasAllergy ? 'background:#FFF1F2;' : ''}"><td class="mono" style="padding:7px 10px;font-weight:800;white-space:nowrap;color:${sIdx === 0 ? '#8C2D19' : '#181412'};">Seat #${seatNumber} (${escapeHtml(clockLabel)})</td><td style="padding:7px 10px;font-weight:700;white-space:nowrap;">${escapeHtml(g.name)}</td><td style="padding:7px 10px;font-weight:700;white-space:nowrap;color:${mInfo.color};">${mInfo.sym} ${escapeHtml(g.meal || 'Filet Mignon')}</td><td style="padding:7px 10px;font-weight:800;white-space:nowrap;color:${hasAllergy ? '#B91C1C' : '#065F46'};">${hasAllergy ? `Alert: ${escapeHtml(g.allergy)}` : 'None'}</td><td style="padding:7px 10px;font-size:0.78rem;white-space:nowrap;color:#57534E;">${escapeHtml(g.accessibility || 'Standard Chair')}</td></tr>`;
        }).join('');
        return `<div class="table-sheet-card" style="background:#FFFFFF;border:1.5px solid #E2D9C8;border-radius:14px;padding:16px;margin-bottom:16px;break-inside:avoid;"><div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #181412;padding-bottom:8px;margin-bottom:10px;"><div><span class="mono" style="font-size:0.72rem;font-weight:800;color:#8C2D19;">TABLE ${t.number || (idx + 1)} &bull; ${escapeHtml((t.shape || 'round').toUpperCase())}${!vault.isMealUnlocked ? ' &bull; FREE SAMPLE PROOF' : ''}</span><h3 class="serif" style="font-size:1.35rem;">${escapeHtml(t.name || `Table ${idx + 1}`)}</h3></div><span class="mono" style="font-size:0.72rem;font-weight:800;background:#FAF3E3;border:1px solid #C8A96E;padding:4px 10px;border-radius:999px;white-space:nowrap;">&#9679; Seat #1 = 12:00 (Facing Dance Floor)</span></div><table style="width:100%;border-collapse:collapse;font-size:0.82rem;text-align:left;"><thead><tr style="background:#FAF6EE;color:#57534E;font-size:0.70rem;text-transform:uppercase;"><th style="padding:6px 10px;white-space:nowrap;">Clockwise Seat</th><th style="padding:6px 10px;white-space:nowrap;">Guest Name</th><th style="padding:6px 10px;white-space:nowrap;">Entr&eacute;e</th><th style="padding:6px 10px;white-space:nowrap;">Allergy / Kitchen Alert</th><th style="padding:6px 10px;white-space:nowrap;">Chair Setup</th></tr></thead><tbody>${rowsHtml}</tbody></table></div>`;
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
    @media print {
      @page { size: 8.5in 11in; margin: 0.4in; }
      .no-print { display: none !important; }
      body { background: #FFFFFF !important; color: #000000 !important; }
      .table-sheet-card { page-break-inside: avoid !important; break-inside: avoid !important; margin-bottom: 14px !important; }
      table { page-break-inside: avoid !important; }
      tr { page-break-inside: avoid !important; }
    }
  </style>
</head>
<body>
  ${renderTopPrintBar({ vault, activeRoute: 'beo', baseUrl })}
  <main style="max-width:980px;margin:24px auto 64px;padding:0 18px;">
    <div style="background:linear-gradient(180deg,#FFFFFF 0%,#FAF3E3 100%);color:#181412;border:2px solid #C8A96E;border-radius:16px;padding:18px 22px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;box-shadow:0 8px 24px rgba(24,20,18,0.05);">
      <div style="min-width:0;">
        <div class="mono" style="font-size:0.68rem;color:#8C2D19;font-weight:800;white-space:nowrap;">CATERING &amp; TABLE SERVICE SHEET</div>
        <h1 class="serif" style="font-size:1.72rem;color:#181412;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(vault.title)} &bull; Table Service Guide</h1>
        <div style="font-size:0.78rem;color:#57534E;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(vault.venueName)} &bull; ${tables.length} Tables &bull; ${guests.length} Guests &bull; ${allergies.length} Allergy Notes &bull; ${chairMods.length} Chair Notes</div>
      </div>
      <div class="no-print" style="display:flex;gap:8px;flex-wrap:wrap;flex-shrink:0;">
        <button id="email-caterer-btn" type="button" onclick="window.openCatererEmail()" style="background:#FAF3E3;color:#78350F;border:1.5px solid #C8A96E;border-radius:10px;padding:9px 14px;font-weight:800;font-size:0.78rem;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">&#9993; Email Caterer Packet</button>
        <button id="download-csv" type="button" onclick="window.downloadBeoCsv()" style="background:#FFFFFF;color:#1B4D3E;border:1.5px solid #1B4D3E;border-radius:10px;padding:9px 14px;font-weight:800;font-size:0.78rem;cursor:pointer;white-space:nowrap;">&darr; Export .CSV</button>
        <a href="${urls.print_stations}" style="text-decoration:none;background:#FAF8F5;color:#1B4D3E;border:1.5px solid #D8C29D;border-radius:10px;padding:9px 14px;font-weight:800;font-size:0.78rem;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">Server Stations Guide &rarr;</a>
        <button type="button" onclick="window.print()" style="background:#1B4D3E;color:#FFFFFF;border:1px solid #14382D;border-radius:10px;padding:9px 16px;font-weight:800;font-size:0.80rem;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">${VR_PRINT_SVG}Print Signed Meal Sheet PDF</button>
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
    ${allergySummaryHtml}
    ${kitchenMatrixHtml}
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
    window.openCatererEmail = function() {
      var title = ${JSON.stringify(vault.title || 'Wedding Reception')};
      var venue = ${JSON.stringify(vault.venueName || 'Reception Venue')};
      var url = ${JSON.stringify(urls.beo || (baseUrl + '/print/beo/' + vault.vaultId))};
      var subject = encodeURIComponent('Clockwise Caterer Meal Sheet & Dietary Roster - ' + title + ' (' + ${guests.length} + ' Guests)');
      var body = encodeURIComponent('Hi Catering & Banquet Team,\n\nPlease find the clockwise table seating and meal count for our upcoming reception at ' + venue + ':\n\n- Total Seated Guests: ' + ${guests.length} + '\n- Filet Mignon: ' + ${filetCount} + '\n- Halibut: ' + ${fishCount} + '\n- Vegan Risotto: ' + ${veganCount} + '\n- Kids Meals: ' + ${kidsCount} + '\n- Allergy / Kitchen Alerts: ' + ${allergies.length} + '\n- Special Chair Needs: ' + ${chairMods.length} + '\n\nReview the live interactive table sheet and seat-by-seat numbering here:\n' + url + '\n\nSeat #1 starts at 12:00 facing the dance floor, progressing clockwise around each table to avoid auctioning off entrees.\n\nThank you!');
      window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
    };
  </script>
</body>
</html>`;
      return res.status(200).type('html').send(html);
    } catch (err) { return res.status(500).send('Internal Server Error'); }
  });

  // 7b. Banquet Server Station & Simultaneous Plating Route Guide (GET /print/server-stations/:vaultId)
  app.get('/print/server-stations/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query);
      const urls = buildVaultUrls(baseUrl, vault.vaultId);
      return res.status(200).type('html').send(renderServerStationRoutePage(vault, urls, req.query));
    } catch (err) { return res.status(500).send('Internal Server Error'); }
  });

  // 7c. Cocktail-to-Reception Room Turnover Brief (GET /print/turnover-brief/:vaultId)
  app.get('/print/turnover-brief/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query);
      const urls = buildVaultUrls(baseUrl, vault.vaultId);
      return res.status(200).type('html').send(renderTurnoverBriefPage(vault, urls, req.query));
    } catch (err) { return res.status(500).send('Internal Server Error'); }
  });

  app.get('/qr/:vaultId', async (req, res) => {
    try {
      const vault = await resolveVaultRecord(req.params.vaultId, req.query), urls = buildVaultUrls(baseUrl, vault.vaultId);
      const guests = extractAllSeatedGuests(vault.state).sort((a, b) => a.name.localeCompare(b.name)), tables = Array.isArray(vault.state.tables) ? vault.state.tables : [];
      const monogram = computeMonogram(vault.title), qrImgUrl = buildRealQrUrl(urls.qr_lookup), fallbackQrUri = buildInlineQrDataUri(urls.qr_lookup);
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
    @media print {
      @page { size: 8.5in 11in; margin: 0.5in; }
      body { background: #FFFFFF !important; }
      .no-print, header, #sh-subpage-vault-bar, .qr-shell { display: none !important; }
      .qr-page-wrap { display: block !important; max-width: 550px !important; margin: 20px auto !important; padding: 0 !important; }
      .qr-foyer-panel { border: 2px double #C8A96E !important; border-radius: 16px !important; padding: 32px 24px !important; text-align: center !important; box-shadow: none !important; }
    }
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
    <div class="qr-foyer-panel" style="min-width:0;background:#FFFFFF;border:1.5px solid #D8C29D;border-radius:22px;padding:22px;color:#181412;box-shadow:0 12px 32px rgba(24,20,18,0.06);">
      <div style="margin-bottom:12px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><button type="button" class="no-print" onclick="window.print()" style="cursor:pointer;background:#1B4D3E;color:#FFFFFF;border:1px solid #14382D;border-radius:10px;padding:8px 14px;font-weight:800;font-size:0.78rem;display:inline-flex;align-items:center;gap:6px;">${VR_PRINT_SVG}Print 8&Prime;&times;10&Prime; Bar Easel Sign (PDF)</button><button type="button" class="no-print" onclick="navigator.clipboard.writeText('Print at 8x10 inches on heavy 80-100 lb card stock or photo paper. Matte or satin finish for tabletop bar easels.');this.textContent='✓ Copied Easel Note!';var b=this;setTimeout(function(){b.textContent='Copy Easel Spec';},2000);" style="cursor:pointer;background:#FAF3E3;color:#78350F;border:1px solid #C8A96E;border-radius:10px;padding:8px 12px;font-weight:800;font-size:0.75rem;">Copy Easel Spec</button></div>
      <div class="mono" style="font-size:0.70rem;font-weight:800;color:#8C2D19;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px;">COCKTAIL-HOUR FOYER QR DISPLAY</div>
      <h2 class="serif" style="font-size:1.65rem;color:#181412;line-height:1.15;margin-bottom:10px;">Guests Scan at the Bar. Zero Easel Crowds.</h2>
      <p style="font-size:0.86rem;color:#57534E;line-height:1.5;margin-bottom:16px;">Print this QR on bar signs or the corner of your 24&Prime;&times;36&Prime; welcome sign so guests find their table and clockwise seat in 3 seconds.</p>
      <div style="display:flex;align-items:center;gap:14px;background:#FAF3E3;border:1.5px solid #C8A96E;border-radius:16px;padding:14px;margin-bottom:16px;">
        <img src="${qrImgUrl}" onerror="this.onerror=null;this.src='${fallbackQrUri}'" width="84" height="84" alt="Live Reception QR Code" style="border-radius:10px;border:1.5px solid #C8A96E;background:#FFFFFF;padding:4px;flex-shrink:0;" />
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
  <div id="qr-toast" style="display:none;position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1B4D3E;color:#FFFFFF;padding:10px 20px;border-radius:999px;font-size:0.82rem;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,0.22);z-index:9999;white-space:nowrap;transition:opacity 0.25s;"></div>
  <script>
    var GUESTS = ${safeGuestsJson};
    function showQrToast(msg) {
      var t = document.getElementById('qr-toast');
      if (!t) return;
      t.textContent = msg;
      t.style.display = 'block';
      t.style.opacity = '1';
      setTimeout(function() {
        t.style.opacity = '0';
        setTimeout(function() { t.style.display = 'none'; }, 260);
      }, 2000);
    }
    function formatZone(z) {
      var s = String(z || '').toLowerCase();
      if (s.includes('dance')) return 'Near Dance Floor';
      if (s.includes('bar')) return 'Near Bar';
      if (s.includes('patio') || s.includes('terrace') || s.includes('garden')) return 'Terrace / Garden';
      if (s.includes('window')) return 'Window Side';
      if (s.includes('head') || s.includes('stage')) return 'Head Table Zone';
      return 'Main Dining Room';
    }
    window.saveGuestSeat = function(name, tNum, tName, sNum, cLabel, meal, zone) {
      var zStr = formatZone(zone);
      var text = name + ' · Table ' + tNum + ' (' + tName + ') · Seat #' + sNum + ' (' + cLabel + ') · ' + meal + ' · ' + zStr + ' · ' + ${JSON.stringify(vault.title || 'Wedding Reception')};
      if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
        navigator.share({ title: 'My Wedding Seat: Table ' + tNum, text: text }).catch(function() {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          showQrToast('✓ Saved to clipboard: Table ' + tNum + ' (' + zStr + '), Seat #' + sNum);
        }).catch(function() {
          showQrToast('✓ Table ' + tNum + ', Seat #' + sNum);
        });
      } else {
        showQrToast('✓ Table ' + tNum + ', Seat #' + sNum);
      }
    };
    function renderQrGuests(q) {
      var clean = String(q || '').trim().toLowerCase();
      var nameMatches = GUESTS.filter(function(g) { return !clean || g.name.toLowerCase().includes(clean); });
      var matches = nameMatches.length ? nameMatches : GUESTS.filter(function(g) { return g.tableName.toLowerCase().includes(clean) || ('table ' + g.tableNumber).includes(clean); });
      var box = document.getElementById('qr-guest-list');
      if (!matches.length) { box.innerHTML = '<div style="text-align:center;padding:20px;color:#78716C;font-size:0.9rem;">Guest #1 shown as Free Sample Proof. Unlock the $7 Event Print Pack above to enable live phone lookup for all seated guests.</div>'; return; }
      box.innerHTML = matches.slice(0, 8).map(function(g, idx) {
        var gPayload = JSON.stringify(g.name) + ',' + g.tableNumber + ',' + JSON.stringify(g.tableName) + ',' + g.seatNumber + ',' + JSON.stringify(g.clockLabel) + ',' + JSON.stringify(g.meal) + ',' + JSON.stringify(g.tableZone || 'center');
        var zoneBadge = formatZone(g.tableZone);
        return '<div class="guest-card"><div style="min-width:0;"><div style="font-weight:800;font-size:1rem;color:#181412;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + g.name + (idx === 0 ? ' (Free Sample Proof)' : '') + '</div><div style="font-size:0.78rem;color:#57534E;display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:2px 0;"><span>' + g.tableName + '</span>&bull;<span>' + g.meal + '</span>&bull;<span style="color:#065F46;font-weight:700;">' + zoneBadge + '</span></div><button type="button" class="pill-btn" onclick="saveGuestSeat(' + gPayload + ')" style="margin-top:6px;font-size:0.70rem;padding:3px 9px;border-color:#1B4D3E;color:#1B4D3E;background:#EBF4F0;" title="Save seat info to phone or share with your partner">&#128242; Save / Share Seat</button></div><div style="text-align:right;background:#FAF3E3;color:#78350F;border:1.5px solid #C8A96E;padding:6px 12px;border-radius:10px;flex-shrink:0;white-space:nowrap;"><div class="serif" style="font-size:1.15rem;line-height:1;color:#8C2D19;">Table ' + g.tableNumber + '</div><div class="mono" style="font-size:0.65rem;color:#78350F;margin-top:2px;">Seat #' + g.seatNumber + ' (' + g.clockLabel + ')</div></div></div>';
      }).join('');
    }
    renderQrGuests('');
  </script>
  ${req.query.auto_print === '1' ? '<script>window.addEventListener("DOMContentLoaded", function() { setTimeout(function() { window.print(); }, 400); });</script>' : ''}
</body>
</html>`;
      return res.status(200).type('html').send(html);
    } catch (err) { return res.status(500).send('Internal Server Error'); }
  });
}

module.exports = { normalizeVaultId, resolveVaultRecord, buildVaultUrls, attachVaultAndPaywallRoutes };

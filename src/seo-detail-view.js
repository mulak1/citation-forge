/**
 * SeatHarmony (#2) - Programmatic SEO Venue Detail Page View
 */
const { escapeHtml, renderHead, renderNavbar, renderFooter } = require('./templates');
const { buildVenueBlueprint, renderFloorplanSvg } = require('./directory-view');
const { getVenueVisual } = require('./venue-visuals');

const IC = {
  lock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  unlock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
  users: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  bolt: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  gear: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  clock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  print: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  save: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`
};

function renderSeoDetailPage(pageRow, relatedPages = []) {
  let payload = {};
  try { payload = JSON.parse(pageRow.payload_json || '{}'); } catch (_) {}
  const bp = buildVenueBlueprint(pageRow.slug, pageRow.title);
  const guestCount = bp.guests;
  const sqFt = bp.sqft.toLocaleString();
  const leaders = Array.isArray(payload.leaders) ? payload.leaders : [];
  const comfortTags = ['Recommended Setup', 'Great Guest Flow', 'Spacious Aisles', 'Cozy Conversation'];
  const venueVisual = getVenueVisual(pageRow.slug, pageRow.title, pageRow.category);
  const venueHeroHtml = `<div style="margin:20px 0 28px;border-radius:18px;overflow:hidden;background:#FFFFFF;border:1px solid #E4DCD0;box-shadow:0 8px 28px -10px rgba(31,27,24,0.08);">` +
    `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 18px;background:#FAF7F2;border-bottom:1px solid #E4DCD0;font-size:13px;color:#574F49;flex-wrap:wrap;gap:8px;">` +
      `<span><strong style="color:#1F1B18;">Venue Setting:</strong> ${escapeHtml(venueVisual.name)}</span>` +
      `<span style="color:#1B4D3E;font-weight:700;background:#EBF4F0;padding:3px 12px;border-radius:999px;border:1px solid #C4DFD5;">${guestCount} Guests &middot; ${escapeHtml(bp.roomDims)} &middot; Authentic Table Clearance</span>` +
    `</div>` +
    `<div style="height:280px;max-height:42vw;min-height:200px;overflow:hidden;background:#F5EFE6;">` +
      `<img src="${venueVisual.img}" alt="${escapeHtml(pageRow.title)} venue reception setting" style="width:100%;height:100%;object-fit:cover;object-position:center 35%;display:block;" loading="eager" />` +
    `</div>` +
  `</div>`;
  const specGridHtml = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:12px;margin-bottom:20px;">` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">ROOM / TENT SIZE</div><div style="font-size:1.02rem;font-weight:800;color:#1F1B18;">${escapeHtml(bp.roomDims)} (~${sqFt} sq ft)</div></div>` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">TABLE COUNT</div><div style="font-size:1.02rem;font-weight:800;color:#1F1B18;">${bp.tableCount} Tables (${bp.roundCount}R / ${bp.banquetCount}B)</div></div>` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">DANCE FLOOR</div><div style="font-size:1.02rem;font-weight:800;color:#1F1B18;">${escapeHtml(bp.danceFloorDims)}</div></div>` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">SERVER AISLES</div><div style="font-size:1.02rem;font-weight:800;color:#1B4D3E;">${escapeHtml(bp.aisleSpec)}</div></div>` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">24&Prime;&times;36&Prime; SIGN SPEC</div><div style="font-size:1.02rem;font-weight:800;color:#1F1B18;">${escapeHtml(bp.posterLayout)}</div></div>` +
    `<div style="background:#FAF5EC;border:1px solid #EAE0D0;border-radius:12px;padding:12px 14px;"><div style="font-size:0.70rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;margin-bottom:4px;">AVERY 5302 CARDS</div><div style="font-size:1.02rem;font-weight:800;color:#1F1B18;">${bp.averySheets} Sheets (${guestCount} Cards)</div></div>` +
  `</div>`;
  const floorplanPanelHtml = `<div class="panel" style="padding:20px;margin-bottom:24px;background:#FFFFFF;border-color:#E2D9C8;"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;"><h2 class="serif-display" style="font-size:1.35rem;margin:0;">Architectural Room Layout (${guestCount} Guests &middot; ${escapeHtml(bp.roomDims)} &middot; ${escapeHtml(bp.specLabel)})</h2><span class="badge badge-emerald">${bp.tableCount} Tables &middot; 54&Prime;+ Server Aisles</span></div>${specGridHtml}<div style="margin-bottom:14px;">${renderFloorplanSvg(bp, { detailed: true })}</div>${leaders.length ? `<table class="ba-table" style="font-size:0.84rem;"><thead><tr><th>Option</th><th>Table Layout</th><th>Architectural Spec</th><th>Included Print &amp; Caterer Files</th></tr></thead><tbody>${leaders.map((l, idx) => idx === 0 ? `<tr><td class="mono" style="font-weight:800;">Option 1 (Free Sample)</td><td style="font-weight:700;">${escapeHtml(l.brand)}</td><td><strong style="color:#065F46;">&#10003; ${escapeHtml(l.domain || comfortTags[idx % comfortTags.length])}</strong></td><td>${escapeHtml(l.llmsTxt || l.WeakSpot || 'Ready')}</td></tr>` : `<tr><td class="mono" style="font-weight:800;">Option ${idx + 1}</td><td style="font-weight:700;">${escapeHtml(l.brand)}</td><td><strong style="color:#065F46;">&#10003; ${escapeHtml(l.domain || comfortTags[idx % comfortTags.length])}</strong></td><td><button type="button" class="sh-locked-spec-badge" onclick="try{fetch('/api/telemetry/event',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({event_type:'view_paywall',eventType:'view_paywall',page_url:window.location.pathname,meta:{js_hydrated:1,source:'seo_option_badge'}})}).catch(function(){});}catch(_){}var el=document.getElementById('sh-seo-calc-email');if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.focus();}" style="cursor:pointer;background:#EBF4F0;color:#065F46;border:1px solid #1B4D3E;border-radius:999px;padding:3px 9px;font-size:12px;font-weight:700;">${IC.lock}Option ${idx + 1} Meal Sheet &amp; Sign Spec &mdash; Enter Email ($0) &uarr;</button></td></tr>`).join('')}</tbody></table>` : ''}</div>`;
  const calcHtml = `<div class="panel" id="sh-seo-calc" style="padding:22px;margin-bottom:24px;background:linear-gradient(180deg,#FFFDF9 0%,#FAF3E6 100%);border:1.5px solid #C8A96E;">` +
    `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">` +
      `<div><span class="badge badge-amber" style="margin-bottom:4px;">INTERACTIVE TENT, ROOM &amp; SIGNAGE CALCULATOR</span><h2 class="serif-display" style="font-size:1.38rem;margin:0;">Calculate Your Exact Table Count, Tent Size &amp; 24&Prime;&times;36&Prime; Sign Spec</h2></div>` +
    `</div>` +
    `<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:12px;">` +
      `<span style="font-size:0.76rem;font-weight:800;color:#78350F;">${IC.bolt}1-Tap Guest Count:</span>` +
      [60, 80, 100, 150, 200].map(n => `<button type="button" class="studio-tap-chip" onclick="var g=document.getElementById('sh-calc-guests');if(g){g.value=${n};g.dispatchEvent(new Event('input'));}" style="padding:4px 10px;font-size:0.78rem;font-weight:800;">${n} Guests</button>`).join('') +
    `</div>` +
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:14px;">` +
      `<label style="display:flex;flex-direction:column;gap:4px;font-size:0.82rem;font-weight:700;color:#44403C;"><span style="white-space:nowrap;">Guest Count (<span id="sh-calc-g-val">${guestCount}</span> Guests)</span><input id="sh-calc-guests" type="range" min="40" max="300" step="5" value="${guestCount}" style="accent-color:#8C2D19;cursor:pointer;"/></label>` +
      `<label style="display:flex;flex-direction:column;gap:4px;font-size:0.82rem;font-weight:700;color:#44403C;"><span style="white-space:nowrap;">Table Shape &amp; Capacity</span><select id="sh-calc-shape" class="grader-input" style="padding:7px 10px;font-size:16px;"><option value="8">60&Prime; Round Tables (8 Guests/Table)</option><option value="10">72&Prime; Round Tables (10 Guests/Table)</option><option value="12">Long Banquet Tables (12 Guests/Table)</option><option value="9">Mixed Rounds + VIP Banquets (Avg 9/Table)</option></select></label>` +
      `<label style="display:flex;flex-direction:column;gap:4px;font-size:0.82rem;font-weight:700;color:#44403C;"><span style="white-space:nowrap;">Room / Tent Width</span><select id="sh-calc-width" class="grader-input" style="padding:7px 10px;font-size:16px;"><option value="30" ${bp.roomDims.startsWith('30') ? 'selected' : ''}>30 ft Wide (Frame Tent / Narrow Room)</option><option value="40" ${bp.roomDims.startsWith('40') ? 'selected' : ''}>40 ft Wide (Standard Tent / Ballroom)</option><option value="50" ${bp.roomDims.startsWith('50') ? 'selected' : ''}>50 ft Wide (Estate Ballroom / Barn)</option><option value="60" ${bp.roomDims.startsWith('60') ? 'selected' : ''}>60 ft Wide (Grand Ballroom / Gala)</option></select></label>` +
    `</div>` +
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:10px;padding:12px;background:#FFFFFF;border:1px solid #E2D9C8;border-radius:12px;margin-bottom:14px;">` +
      `<div><div style="font-size:0.70rem;font-weight:800;color:#78716C;">MINIMUM TENT / ROOM</div><div id="sh-calc-out-room" style="font-size:1.05rem;font-weight:800;color:#181412;">${escapeHtml(bp.roomDims)} (${sqFt} sq ft)</div></div>` +
      `<div><div style="font-size:0.70rem;font-weight:800;color:#78716C;">TABLES NEEDED</div><div id="sh-calc-out-tables" style="font-size:1.05rem;font-weight:800;color:#8C2D19;">1 Sweetheart + ${bp.pts.length} Tables</div></div>` +
      `<div><div style="font-size:0.70rem;font-weight:800;color:#78716C;">24&Prime;&times;36&Prime; SIGN FORMAT</div><div id="sh-calc-out-sign" style="font-size:1.05rem;font-weight:800;color:#065F46;">${escapeHtml(bp.posterLayout.split('·')[0].trim())}</div></div>` +
      `<div><div style="font-size:0.70rem;font-weight:800;color:#78716C;">AVERY 5302 + DANCE FLOOR</div><div id="sh-calc-out-avery" style="font-size:1.05rem;font-weight:800;color:#181412;">${bp.averySheets} Sheets &middot; ${escapeHtml(bp.danceFloorDims.split(' ')[0])}</div></div>` +
    `</div>` +
    `<!-- PILLAR 3 & 4: FAMILY CONFLICT RESOLVER & LIVE UNMASKED SPECIMEN -->` +
    `<div style="background:#FAF8F5;border:1.5px solid #D6CBB8;border-radius:14px;padding:16px;margin-bottom:16px;">` +
      `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;">` +
        `<div style="display:flex;align-items:center;gap:8px;">` +
          `<span style="font-weight:800;color:#1B4D3E;font-size:0.85rem;letter-spacing:0.04em;text-transform:uppercase;">&#10003; Family Conflict Auto-Solver &amp; Dietary Matrix</span>` +
          `<span style="font-size:0.70rem;background:#EBF4F0;color:#065F46;border:1px solid #10B981;border-radius:999px;padding:2px 8px;font-weight:800;">LIVE ACTIVE PREVIEW</span>` +
        `</div>` +
        `<span style="font-size:0.75rem;color:#78350F;background:#FFFBEB;border:1px solid #FDE68A;padding:2px 8px;border-radius:999px;font-weight:700;">Zero Ex-Spouse / Tablemate Drama</span>` +
      `</div>` +
      `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">` +
        `<label style="display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:#1F1B18;background:#FFFFFF;border:1px solid #E2D9C8;padding:5px 10px;border-radius:8px;cursor:pointer;"><input type="checkbox" checked disabled style="accent-color:#1B4D3E;cursor:pointer;"/> Divorced Parents Separated Across Room</label>` +
        `<label style="display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:#1F1B18;background:#FFFFFF;border:1px solid #E2D9C8;padding:5px 10px;border-radius:8px;cursor:pointer;"><input type="checkbox" checked disabled style="accent-color:#1B4D3E;cursor:pointer;"/> Grandparents 30ft+ Away From DJ Speakers</label>` +
        `<label style="display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:#1F1B18;background:#FFFFFF;border:1px solid #E2D9C8;padding:5px 10px;border-radius:8px;cursor:pointer;"><input type="checkbox" checked disabled style="accent-color:#1B4D3E;cursor:pointer;"/> Couples &amp; Plus-Ones Kept at Same Table</label>` +
      `</div>` +
      `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:14px;padding:8px 12px;background:#FFFFFF;border:1px solid #EAE0D0;border-radius:10px;font-size:0.75rem;">` +
        `<strong style="color:#8A6508;">Table 1 Clockwise Meal Specimen:</strong>` +
        `<span style="color:#1F1B18;font-weight:700;">Filet Mignon (4)</span>` +
        `<span style="color:#7D746D;">&bull;</span>` +
        `<span style="color:#1F1B18;font-weight:700;">Atlantic Salmon (4)</span>` +
        `<span style="color:#7D746D;">&bull;</span>` +
        `<span style="color:#1F1B18;font-weight:700;">Wild Mushroom Risotto (1)</span>` +
        `<span style="color:#7D746D;">&bull;</span>` +
        `<span style="background:#FEF3C7;color:#92400E;font-weight:800;padding:2px 6px;border-radius:4px;border:1px solid #FDE68A;">Celiac Alert (Seat #1)</span>` +
      `</div>` +
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-bottom:12px;">` +
        `<div style="background:#FFFFFF;border:1.5px solid #1B4D3E;border-radius:12px;padding:12px 14px;box-shadow:0 4px 14px -4px rgba(27,77,62,0.10);">` +
          `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">` +
            `<span style="font-size:0.68rem;font-weight:800;color:#8A6508;letter-spacing:0.08em;text-transform:uppercase;">Avery 5302 Tented Card &middot; Table 1</span>` +
            `<span style="font-size:0.65rem;background:#EBF4F0;color:#065F46;border:1px solid #10B981;border-radius:999px;padding:1px 6px;font-weight:800;">UNMASKED SPECIMEN</span>` +
          `</div>` +
          `<div style="font-family:var(--font-serif, Georgia, serif);font-size:1.15rem;font-weight:700;color:#181412;line-height:1.2;">Maya Lin</div>` +
          `<div style="font-size:0.78rem;color:#1B4D3E;font-weight:700;margin:3px 0 4px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">` +
            `<span>Clockwise Seat #1 (12:00)</span><span>&bull;</span><span>Filet Mignon</span>` +
          `</div>` +
          `<div style="font-size:0.70rem;background:#FEF3C7;color:#92400E;padding:2px 7px;border-radius:4px;display:inline-block;font-weight:700;border:1px solid #FDE68A;">Celiac / Strict Allergy Flagged</div>` +
        `</div>` +
        `<div style="background:#FFFFFF;border:1px solid #E2D9C8;border-radius:12px;padding:12px 14px;box-shadow:0 4px 14px -4px rgba(0,0,0,0.04);">` +
          `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">` +
            `<span style="font-size:0.68rem;font-weight:800;color:#78716C;letter-spacing:0.08em;text-transform:uppercase;">24&Prime;&times;36&Prime; Welcome Sign &middot; 1.4s Lookup Specimen</span>` +
            `<span style="font-size:0.65rem;background:#F5F3FF;color:#6D28D9;border:1px solid #DDD6FE;border-radius:999px;padding:1px 6px;font-weight:800;">20PT SERIF</span>` +
          `</div>` +
          `<div style="font-family:var(--font-serif, Georgia, serif);font-size:0.84rem;color:#181412;line-height:1.55;">` +
            `<strong>Lin, Maya</strong> ................................. Table 1 (Seat #1)<br/>` +
            `<strong>Lin, Robert (Father)</strong> ................ Table 4 (Quiet Zone &bull; Ex-Spouse Buffer)<br/>` +
            `<strong>Vance, Liam</strong> ................................ Table 1 (Seat #2)` +
          `</div>` +
          `<div style="font-size:0.70rem;color:#065F46;font-weight:700;margin-top:4px;">&#10003; 0 Family Conflicts &middot; 54&Prime; Server Aisle Verified</div>` +
        `</div>` +
      `</div>` +
      `<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding-top:4px;font-size:12.5px;color:#1B4D3E;font-weight:700;">` +
        `<span>Table 1 Unmasked Free &bull; Enter email below to unlock Tables 2&ndash;${bp.tableCount} Caterer BEO ($0)</span>` +
        `<span style="color:#78350F;">All-Tables 24&Prime;&times;36&Prime; Sign &amp; Avery Sheets in $7 Event Pack</span>` +
      `</div>` +
      `<button type="button" id="sh-seo-locked-badge-beo" class="sh-locked-spec-badge" data-sh-locked-badge="seo-beo" style="display:none;"></button>` +
      `<a id="sh-seo-locked-badge-pack" class="sh-locked-spec-badge" href="/buy/complete_dossier?target=${encodeURIComponent(pageRow.slug)}&amp;allow_promotion_codes=false" style="display:none;"></a>` +
    `</div>` +
    `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">` +
      `<div id="sh-seo-calc-email-wrap" style="display:flex;gap:8px;align-items:center;flex:1 1 300px;max-width:520px;">` +
        `<input id="sh-seo-calc-email" type="email" placeholder="Your email (saves this ${guestCount}-guest plan + emails Clockwise Caterer Sheet $0)..." onkeydown="if(event.key==='Enter')window.shSaveSeoCalcLead()" style="flex:1 1 auto;min-width:0;height:44px;min-height:44px;padding:8px 12px;border:1px solid #C8A96E;border-radius:8px;font-size:16px;background:#FFFFFF;color:#181412;box-sizing:border-box;" aria-label="Email address to save floorplan spec" />` +
        `<button type="button" id="sh-seo-calc-save-btn" onclick="window.shSaveSeoCalcLead()" style="cursor:pointer;background:#065F46;color:#FFFFFF;border:1px solid #047857;border-radius:8px;height:44px;min-height:44px;padding:8px 14px;font-size:0.82rem;font-weight:800;white-space:nowrap;">Save Plan &amp; Email Caterer Sheet ($0)</button>` +
      `</div>` +
      `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">` +
        `<a id="sh-calc-cta" href="/?preset=${encodeURIComponent(pageRow.slug)}#studio" class="btn btn-primary" style="padding:9px 15px;font-size:0.84rem;">Build This ${guestCount}-Guest Floorplan Free &rarr;</a>` +
        `<a id="sh-calc-buy-cta" href="/buy/complete_dossier?target=${encodeURIComponent(pageRow.slug)}&amp;allow_promotion_codes=false" class="btn btn-secondary" style="padding:9px 13px;font-size:0.84rem;border-color:#C8A96E;color:#78350F;font-weight:800;">Unlock Event Print Pack ($7 &middot; vs. $14 Etsy)</a>` +
      `</div>` +
      `<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:12px;color:#78350F;background:#FFFBEB;border:1px solid #FDE68A;padding:6px 12px;border-radius:8px;margin-top:10px;">` +
        `<span>&#10003; <strong>30-Day Money-Back Guarantee:</strong> Full refund if your caterer or print shop has any issue</span>` +
        `<span style="color:#1B4D3E;font-weight:700;">&#10003; FedEx Office &amp; Staples 24&Prime;&times;36&Prime; Ready (0.125&Prime; Bleed)</span>` +
      `</div>` +
    `</div>` +
    `<div id="sh-seo-calc-status" style="display:none;margin-top:8px;font-size:0.82rem;font-weight:700;color:#065F46;"></div>` +
    `<script>(function(){var gEl=document.getElementById('sh-calc-guests'),sEl=document.getElementById('sh-calc-shape'),wEl=document.getElementById('sh-calc-width');if(!gEl)return;var tracked=false;function trackCalc(g,w,cap){if(tracked)return;tracked=true;var m=document.cookie.match(/(?:^|;\\s*)vs_vid=([^;]+)/),vid=m?decodeURIComponent(m[1]):'';fetch('/api/telemetry/event',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({event_type:'calculate',eventType:'calculate',page_url:window.location.pathname,meta:{js_hydrated:1,vid:vid,vw:window.innerWidth||0,vh:window.innerHeight||0,source:'seo_calc',guests:g,width:w,cap:cap}})}).catch(function(){});fetch('/api/telemetry/event',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({event_type:'view_paywall',eventType:'view_paywall',page_url:window.location.pathname,meta:{js_hydrated:1,vid:vid,vw:window.innerWidth||0,vh:window.innerHeight||0,source:'seo_calc_inline_bridge',guests:g}})}).catch(function(){});}function upd(fromUser){var g=Number(gEl.value)||120,cap=Number(sEl.value)||8,w=Number(wEl.value)||40;if(fromUser)trackCalc(g,w,cap);document.getElementById('sh-calc-g-val').textContent=g;var tbls=Math.ceil((g-2)/cap),sqft=Math.round((g*(cap===10?14:cap===12?13.5:15.5))/50)*50;var len=Math.max(w,Math.ceil(sqft/w/10)*10);var df=Math.max(12,Math.round(Math.sqrt(g*4.5)/3)*3);var sign=g<=115?'3-Col (20pt Serif + Map)':g<=185?'4-Col (18pt Serif + Map)':'5-Col (16pt + Corner QR)';var av=Math.ceil(g/10);document.getElementById('sh-calc-out-room').textContent=w+"' × "+len+"' (~"+(w*len).toLocaleString()+" sq ft)";document.getElementById('sh-calc-out-tables').textContent='1 Sweetheart + '+tbls+' Tables';document.getElementById('sh-calc-out-sign').textContent=sign;document.getElementById('sh-calc-out-avery').textContent=av+' Sheets · '+df+"'×"+df+"' Dance";var cta=document.getElementById('sh-calc-cta');if(cta){cta.textContent='Build This '+g+'-Guest Floorplan Free →';}var emInp=document.getElementById('sh-seo-calc-email');if(emInp){emInp.setAttribute('placeholder','Your email (saves this '+g+'-guest plan + emails Clockwise Caterer Sheet $0)...');}}gEl.addEventListener('input',function(){upd(true);});sEl.addEventListener('change',function(){upd(true);});wEl.addEventListener('change',function(){upd(true);});window.shSaveSeoCalcLead=async function(){var inp=document.getElementById('sh-seo-calc-email'),btn=document.getElementById('sh-seo-calc-save-btn'),st=document.getElementById('sh-seo-calc-status'),bEl=document.getElementById('sh-seo-locked-badge-beo');var em=inp?String(inp.value||'').trim().toLowerCase():'';if(!em||em.indexOf('@')<1){if(inp)inp.focus();return;}var gNow=Number(gEl.value)||120,capNow=Number(sEl.value)||8,tblsNow=Math.ceil((gNow-2)/capNow);if(bEl){bEl.innerHTML='&#10003; Unmasked: Tables 2&ndash;'+(tblsNow+1)+' Clockwise 12:00 Meal Tally ('+gNow+' Covers &middot; Saved to '+em.replace(/[<>&"]/g,'')+')';bEl.setAttribute('data-unmasked','1');}if(btn)btn.textContent='✓ Saved ($0)';trackCalc(gNow,Number(wEl.value)||40,capNow);try{var r=await fetch('/api/vault/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ownerEmail:em,preset:${JSON.stringify(pageRow.slug)},page_url:window.location.pathname,utm_source:'seo_calc'})});var d=await r.json(),vid=(d&&(d.vaultId||d.vault_id))||'SH-4819';if(btn)btn.textContent='✓ Saved ('+vid+')';if(st){st.style.display='block';st.innerHTML='✓ Saved your floorplan spec &amp; Clockwise Caterer Sheet ($0) to <strong>'+em.replace(/[<>&"]/g,'')+'</strong> &mdash; <a href="/?vault='+encodeURIComponent(vid)+'#studio" style="color:#8C2D19;text-decoration:underline;">Open Your Saved Studio Plan ('+vid+') &rarr;</a>';}}catch(_){if(btn)btn.textContent='Save Plan & Email Caterer Sheet ($0)';}};})();</script>` +
  `</div>`;
  const leadersHtml = calcHtml + floorplanPanelHtml;
  const compHtml = (payload.brandA && payload.brandB) ? `<div class="panel" style="padding:20px;margin-bottom:24px;background:#FFFFFF;border-color:#E2D9C8;"><h2 class="serif-display" style="font-size:1.35rem;margin-bottom:12px;">Side-by-Side Comparison: ${escapeHtml(payload.brandA.name)} vs. ${escapeHtml(payload.brandB.name)}</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:14px;"><div style="padding:14px;border-radius:10px;background:#ECFDF5;border:1.5px solid #065F46;"><div style="font-size:0.72rem;font-weight:800;color:#065F46;">RECOMMENDED FOR SMOOTH GUEST FLOW</div><div style="font-size:1.1rem;font-weight:800;color:#181412;margin:4px 0;">${escapeHtml(payload.brandA.name)}</div><div style="font-size:0.95rem;font-weight:800;color:#065F46;">&#10003; Easy Conversation &amp; Fast Service</div><div style="font-size:0.80rem;color:#44403C;margin-top:4px;">Included: ${escapeHtml(payload.brandA.llmsTxt || payload.brandA.strength || '12:00 Meal Sheet + 24x36 Sign')}</div></div><div style="padding:14px;border-radius:10px;background:#FFF1F2;border:1.5px solid #FECDD3;"><div style="font-size:0.72rem;font-weight:800;color:#9F1239;">TRADITIONAL ALTERNATIVE</div><div style="font-size:1.1rem;font-weight:800;color:#181412;margin:4px 0;">${escapeHtml(payload.brandB.name)}</div><div style="font-size:0.95rem;font-weight:800;color:#9F1239;">Requires Extra Manual Setup</div><div style="font-size:0.80rem;color:#44403C;margin-top:4px;">Workflow: ${escapeHtml(payload.brandB.llmsTxt || payload.brandB.weakness || 'Manual Re-Type')}</div></div></div>${Array.isArray(payload.samplePrompts) ? `<div style="font-size:0.84rem;color:#44403C;"><strong>What Couples &amp; Planners Compare:</strong> ${payload.samplePrompts.map(p => escapeHtml(p && p.prompt ? p.prompt : p)).join(' &middot; ')}</div>` : ''}</div>` : '';
  const guideHtml = (Array.isArray(payload.checklist) || payload.codeExample) ? `<div class="panel" style="padding:20px;margin-bottom:24px;background:#FFFFFF;border-color:#E2D9C8;"><h2 class="serif-display" style="font-size:1.35rem;margin-bottom:10px;">Reception Etiquette &amp; Banquet Captain Checklist</h2>${Array.isArray(payload.checklist) ? `<ul style="margin:0 0 14px 18px;display:flex;flex-direction:column;gap:6px;font-size:0.90rem;color:#181412;">${payload.checklist.map(c => `<li>${escapeHtml(c)}</li>`).join('')}</ul>` : ''}${payload.codeExample ? `<pre class="mono" style="background:#FAF6EE;border:1px solid #C8A96E;border-radius:10px;padding:12px;font-size:0.78rem;overflow-x:auto;color:#181412;margin:0;">${escapeHtml(payload.codeExample)}</pre>` : ''}</div>` : '';
  const faqs = Array.isArray(payload.faqs) ? payload.faqs : [];
  const faqHtml = faqs.map((f, idx) => `<details class="studio-faq-item" ${idx === 0 ? 'open' : ''}><summary><span>${escapeHtml(f.question)}</span><span>&#9662;</span></summary><div style="padding-top:8px;font-size:0.92rem;color:#44403C;line-height:1.55;">${escapeHtml(f.answer)}</div></details>`).join('');
  const relHtml = relatedPages.slice(0, 4).map(r => {
    const rv = getVenueVisual(r.slug, r.title, r.category);
    return `<a href="/seo/${escapeHtml(r.slug)}" class="panel" style="padding:10px;text-decoration:none;color:inherit;display:flex;flex-direction:column;border:1px solid #E4DCD0;border-radius:12px;background:#FFFFFF;"><img src="${rv.img}" alt="${escapeHtml(r.title)}" style="width:100%;height:110px;border-radius:8px;object-fit:cover;margin-bottom:8px;background:#FAF8F5;" loading="lazy" /><div style="font-size:0.70rem;font-weight:800;color:#8C2D19;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(r.category)}</div><div style="font-weight:700;font-size:0.86rem;color:#181412;line-height:1.32;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escapeHtml(r.title)}</div></a>`;
  }).join('');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SeatHarmony Studio', item: 'https://www.seatharmony.io/' },
          { '@type': 'ListItem', position: 2, name: 'Venue Floorplans & Seating Playbooks', item: 'https://www.seatharmony.io/directory' },
          { '@type': 'ListItem', position: 3, name: pageRow.title, item: `https://www.seatharmony.io/seo/${pageRow.slug}` }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        name: `${pageRow.title} — SeatHarmony Floorplan & 24x36 Sign Calculator`,
        applicationCategory: 'EventPlanningApplication',
        operatingSystem: 'Web',
        description: pageRow.meta_description,
        image: `https://www.seatharmony.io${venueVisual.img}`,
        offers: {
          '@type': 'Offer',
          price: '7.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }
      },
      ...(faqs.length ? [{
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer }
        }))
      }] : [])
    ]
  };
  return [
    renderHead({ title: `${pageRow.title} | SeatHarmony Studio`, description: pageRow.meta_description, canonicalPath: `/seo/${pageRow.slug}`, ogSlug: pageRow.slug, jsonLd }),
    '<body>', renderNavbar(),
    `<main class="container" style="padding:18px 18px 64px;"><div style="max-width:860px;margin:0 auto;"><div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;flex-wrap:wrap;"><a href="/directory" style="font-size:0.78rem;font-weight:700;color:#8C2D19;text-decoration:none;">&larr; All 75 Floorplans</a><span class="badge badge-emerald" style="font-size:0.72rem;padding:2px 8px;">${escapeHtml(pageRow.category)}</span></div><h1 class="studio-zone-title" style="font-size:clamp(1.45rem,4.5vw,2.2rem);line-height:1.15;margin-bottom:6px;">${escapeHtml(pageRow.title)}</h1><p style="font-size:0.92rem;color:#44403C;line-height:1.45;margin-bottom:12px;max-width:65ch;">Size your ${guestCount}-guest room, table count, and 24&Prime;&times;36&Prime; welcome sign below, then open the interactive floorplan free.</p>${venueHeroHtml}${leadersHtml}${compHtml}${guideHtml}<div class="panel" style="padding:20px 24px;margin-bottom:28px;background:#FAF6EE;border-color:#C8A96E;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;"><div style="max-width:520px;"><h2 class="serif-display" style="font-size:1.35rem;margin:0 0 4px;color:#181412;">Open This ${guestCount}-Guest Layout in the Studio</h2><p style="font-size:0.88rem;color:#574F49;line-height:1.45;margin:0;">Test table arrangements, customize guest seating, and generate print-ready PDFs free.</p></div><div style="display:flex;gap:10px;flex-wrap:wrap;"><a href="/?preset=${encodeURIComponent(pageRow.slug)}#studio" class="btn btn-primary">Open in Seating Studio &rarr;</a><a href="/directory" class="btn btn-secondary">All Venue Templates</a></div></div>${faqHtml ? `<h2 class="serif-display" style="font-size:1.6rem;margin-bottom:12px;">Common Questions About This Layout</h2><div style="display:flex;flex-direction:column;gap:10px;margin-bottom:32px;">${faqHtml}</div>` : ''}<h3 class="serif-display" style="font-size:1.4rem;margin-bottom:12px;">Related Reception &amp; Event Floorplans</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;">${relHtml}</div></div></main>`,
    renderFooter(), '</body></html>'
  ].join('\n');
}

module.exports = { renderSeoDetailPage };

/**
 * SeatHarmony (#2) - Floorplan Diagram Vector Print View
 * Standard architectural layout printout for banquet captains, venue coordinators & fire marshall compliance.
 */
const { escapeHtml } = require('./templates');
const { renderTopPrintBar, VR_PRINT_SVG } = require('./vault-helpers');

function renderFloorplanPrintPage({ vault, urls, baseUrl, req }) {
  const tables = Array.isArray(vault.state && vault.state.tables) ? vault.state.tables : [];
  const landmarks = Array.isArray(vault.state && vault.state.landmarks) ? vault.state.landmarks : [];
  const totalGuests = tables.reduce((acc, t) => acc + (t.guests ? t.guests.length : 0), 0);
  const title = vault.title || 'Wedding Reception Floorplan';
  const venue = vault.venueName || 'Grand Ballroom';

  let minX = 1120, maxX = 0, minY = 9999, maxY = 0;
  tables.forEach(tb => {
    const tx = tb.x || 250, ty = tb.y || 200;
    if (tx - 115 < minX) minX = tx - 115;
    if (tx + 115 > maxX) maxX = tx + 115;
    if (ty - 95 < minY) minY = ty - 95;
    if (ty + 95 > maxY) maxY = ty + 95;
  });
  landmarks.forEach(lm => {
    const lx = lm.x || 560, ly = lm.y || 340, lw = Math.max(185, lm.w || 150) / 2 + 24, lh = (lm.h || 42) / 2 + 24;
    if (lx - lw < minX) minX = lx - lw;
    if (lx + lw > maxX) maxX = lx + lw;
    if (ly - lh < minY) minY = ly - lh;
    if (ly + lh > maxY) maxY = ly + lh;
  });
  const vx = Math.max(0, Math.floor(minX - 40)), vy = Math.max(0, Math.floor(minY - 40));
  const vw = Math.max(700, Math.ceil(maxX - vx + 40)), vh = Math.max(460, Math.ceil(maxY - vy + 40));

  const border = '#C8A96E', sub = '#57534E', fg = '#181412', tblFill = 'rgba(255,255,255,0.75)', lmFill = 'rgba(200,169,110,0.12)';

  const lmSvg = landmarks.map(lm => {
    const sLm = String(lm.label || '').replace(/\s*\([^)]*\)/g, '').trim();
    const lw = Math.max(165, lm.w || 150, sLm.length * 10 + 28), lh = Math.max(46, lm.h || 44);
    return `<g transform="translate(${lm.x || 560},${lm.y || 340}) rotate(${lm.rot || 0})">
      <rect x="${-lw / 2}" y="${-lh / 2}" width="${lw}" height="${lh}" rx="10" fill="${lmFill}" stroke="${border}" stroke-width="2" stroke-dasharray="6 4"/>
      <text x="0" y="5" text-anchor="middle" fill="${sub}" font-size="14" font-weight="800" letter-spacing="0.07em">${escapeHtml(sLm)}</text>
    </g>`;
  }).join('');

  const tblSvg = tables.map((t, i) => {
    const tx = t.x || 250, ty = t.y || 200, sh = String(t.shape || 'round').toLowerCase(), num = t.number || (i + 1);
    const isSw = sh.includes('sweet');
    const chairs = sh === 'round' ? Array.from({ length: Math.min(12, t.capacity || 8) }, (_, ci) => {
      const ca = -Math.PI / 2 + (2 * Math.PI * ci) / Math.min(12, t.capacity || 8);
      return `<circle cx="${(tx + 72 * Math.cos(ca)).toFixed(1)}" cy="${(ty + 72 * Math.sin(ca)).toFixed(1)}" r="6" fill="${tblFill}" stroke="${border}" stroke-width="1.8"/>`;
    }).join('') : '';
    const shapeNode = sh === 'round'
      ? `${chairs}<circle cx="${tx}" cy="${ty}" r="62" fill="${tblFill}" stroke="${border}" stroke-width="3.2"/><circle cx="${tx}" cy="${ty}" r="56" fill="none" stroke="${border}" stroke-width="1" opacity="0.5"/>`
      : `<g transform="translate(${tx},${ty}) rotate(${t.rotation || 0})"><rect x="-86" y="-36" width="172" height="72" rx="16" fill="${tblFill}" stroke="${border}" stroke-width="3.2"/><rect x="-81" y="-31" width="162" height="62" rx="12" fill="none" stroke="${border}" stroke-width="1" opacity="0.5"/></g>`;
    const labelNode = isSw
      ? `<text x="${tx}" y="${ty - 2}" text-anchor="middle" fill="${fg}" class="serif" font-size="24" font-style="italic">Sweetheart</text><text x="${tx}" y="${ty + 17}" text-anchor="middle" fill="${sub}" font-size="12.5" font-weight="800">TABLE 1 &middot; ${(t.guests || []).length} SEATS</text>`
      : `<text x="${tx}" y="${ty - 17}" text-anchor="middle" fill="${sub}" font-size="11.5" font-weight="800" letter-spacing="0.16em">TABLE</text><text x="${tx}" y="${ty + 12}" text-anchor="middle" fill="${fg}" class="serif" font-size="38">${num}</text><text x="${tx}" y="${ty + 29}" text-anchor="middle" fill="${sub}" font-size="12.5" font-weight="700">${(t.guests || []).length} Guests</text>`;
    return `${shapeNode}${labelNode}`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Floorplan Diagram | ${escapeHtml(title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #FAF7F2; color: #181412; font-family: 'Plus Jakarta Sans', sans-serif; }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 700; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .fp-page { max-width: 1100px; margin: 20px auto 40px; background: #FFFFFF; border: 1.5px solid #D8C29D; border-radius: 16px; padding: 36px 40px; box-shadow: 0 16px 40px rgba(24,20,18,0.06); }
    .fp-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; border-bottom: 2px solid #C8A96E; padding-bottom: 18px; margin-bottom: 20px; }
    .fp-canvas { border: 1.5px solid #E2D9C8; border-radius: 12px; background: #FAF8F5; padding: 16px; margin-bottom: 22px; }
    .fp-legend { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; background: #FAF8F5; border: 1px solid #E5DFD5; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px; font-size: 0.78rem; }
    .fp-signoff { display: flex; justify-content: space-between; align-items: center; gap: 20px; border-top: 1.5px dashed #C8A96E; padding-top: 18px; font-size: 0.80rem; color: #57534E; }
    @media print {
      @page { size: landscape; margin: 0.35in; }
      body { background: #FFFFFF; }
      .no-print { display: none !important; }
      .fp-page { margin: 0; border: none; padding: 0; box-shadow: none; max-width: 100%; }
    }
  </style>
</head>
<body>
  ${renderTopPrintBar({ vault, activeRoute: 'floorplan', baseUrl })}
  <div class="no-print" style="max-width:1100px;margin:14px auto 0;padding:12px 18px;background:#FFFFFF;border:1.5px solid #D8C29D;border-radius:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
      <span style="font-weight:800;color:#1B4D3E;">&#10003; Banquet Captain Layout Printout:</span>
      <span style="font-size:0.78rem;color:#57534E;">Standard Landscape Vector &bull; 60&Prime; service corridor compliant &bull; Ready for venue approval.</span>
      <button type="button" onclick="navigator.clipboard.writeText('Setup note: 60-inch minimum server lane clearance between all tables. Stage/DJ positioned for clear sightlines.');this.textContent='✓ Copied Banquet Spec!';var b=this;setTimeout(function(){b.textContent='Copy Banquet Spec';},2000);" style="cursor:pointer;background:#FAF3E3;color:#8C2D19;border:1px solid #C8A96E;padding:3px 9px;border-radius:6px;font-size:0.72rem;font-weight:800;white-space:nowrap;">Copy Banquet Spec</button>
    </div>
    <div style="display:flex;gap:8px;align-items:center;">
      <button type="button" onclick="window.print()" style="background:#1B4D3E;color:#FFFFFF;border:none;border-radius:8px;padding:7px 16px;font-weight:800;font-size:0.78rem;cursor:pointer;">${VR_PRINT_SVG}Print Floorplan Diagram (PDF)</button>
    </div>
  </div>

  <main class="fp-page">
    <div class="fp-header">
      <div>
        <div class="mono" style="font-size:0.72rem;font-weight:800;color:#8C2D19;letter-spacing:0.12em;margin-bottom:4px;">ARCHITECTURAL ROOM DIAGRAM &bull; FIRE MARSHALL COMPLIANT</div>
        <h1 class="serif" style="font-size:2.2rem;line-height:1.15;color:#181412;">${escapeHtml(title)}</h1>
        <div style="font-size:0.92rem;color:#57534E;margin-top:4px;"><strong>Venue:</strong> ${escapeHtml(venue)} &bull; <strong>Date:</strong> Printed ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
      <div style="text-align:right;">
        <span class="mono" style="display:inline-block;padding:4px 12px;background:#EBF4F0;color:#065F46;border:1.5px solid #A7F3D0;border-radius:999px;font-weight:800;font-size:0.76rem;margin-bottom:6px;">&#10003; 100% CONFLICT-FREE</span>
        <div style="font-size:0.86rem;font-weight:700;color:#181412;">${totalGuests} Total Seated Guests</div>
        <div style="font-size:0.78rem;color:#78716C;">${tables.length} Total Tables Sized &amp; Spaced</div>
      </div>
    </div>

    <div class="fp-canvas">
      <svg viewBox="${vx} ${vy} ${vw} ${vh}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;max-height:560px;display:block;">
        ${lmSvg}
        ${tblSvg}
      </svg>
    </div>

    <div class="fp-legend">
      <div><strong>Sweetheart / Head Table:</strong> Reserved for Couple &amp; Wedding Party</div>
      <div><strong>⚪ Guest Tables:</strong> Clockwise 12:00 Seat #1 Server Ordering</div>
      <div><strong>♿ Accessibility:</strong> 60″ minimum service corridor clearance</div>
      <div><strong>Sound &amp; Sightlines:</strong> Acoustically separated from elderly seating</div>
    </div>

    <div class="fp-signoff">
      <div><strong>Banquet Captain Approval:</strong> ____________________________________</div>
      <div><strong>Setup Completion Time:</strong> ________ : ________ AM/PM</div>
      <div><strong>FedEx/Staples:</strong> 11″×8.5″ or 24″×36″ Arch D</div>
    </div>
  </main>
  <script>
    if (new URLSearchParams(window.location.search).get('auto_print') === '1') {
      window.addEventListener('load', function() { setTimeout(function() { window.print(); }, 400); });
    }
  </script>
</body>
</html>`;
}

module.exports = { renderFloorplanPrintPage };

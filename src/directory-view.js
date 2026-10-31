/**
 * SeatHarmony - Venue Floorplan Directory (/directory) & Shared Architectural Blueprint Engine
 * Generates distinct, non-overlapping room geometries (12 architectural archetypes) for all 60+ pages.
 */
const { escapeHtml, renderHead, renderNavbar, renderFooter } = require('./templates');

const SQFT_PER_GUEST = 15;
const fmt = (n) => Number(n || 0).toLocaleString('en-US');

const VENUE_TYPES = [
  [/Gala|Captain|Charity/i, 'Galas & Large Receptions'],
  [/Intimate|Micro|Rehearsal|Private Dining|Welcome Dinner|40-Guest|50-Guest|60-Guest/i, 'Intimate & Rehearsal'],
  [/Tent|Sailcloth|Rain Plan/i, 'Tent & Outdoor'],
  [/Ballroom|Estate|Country Club|Hotel/i, 'Ballroom & Estate'],
  [/Barn|Winery|Vineyard|Farm|Ranch|Tuscan/i, 'Barn & Winery'],
  [/Conservatory|Botanical|Museum|Rotunda/i, 'Garden & Museum'],
  [/Loft|Warehouse|Rooftop|Penthouse/i, 'Loft & Rooftop'],
  [/Yacht|Beach|Coastal|Villa|Destination/i, 'Waterfront & Destination'],
  [/Cultural|Multi-Generational/i, 'Cultural & Multi-Gen']
];

function venueType(title, slug = '') {
  const s = `${title} ${slug}`;
  for (const [rx, label] of VENUE_TYPES) if (rx.test(s)) return label;
  return 'Classic Reception';
}

function hashSlug(str) {
  let h = 2166136261;
  const s = String(str || '');
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return Math.abs(h);
}

function tblExtents(shape = 'round', cap = 8, rot = 0) {
  if (shape === 'round') {
    const r = (cap <= 8 ? 50 : 58) + 53;
    return { rx: r, ry: r };
  }
  const top = shape === 'sweetheart' ? cap : Math.ceil(cap / 2);
  const w = (shape === 'sweetheart' ? Math.max(150, top * 44 + 22) : Math.max(176, top * 44 + 32)) / 2 + 40;
  const h = (shape === 'sweetheart' ? 48 : 68) / 2 + 50;
  const rad = ((rot || 0) * Math.PI) / 180;
  const c = Math.abs(Math.cos(rad)), s = Math.abs(Math.sin(rad));
  return { rx: Math.round(w * c + h * s), ry: Math.round(w * s + h * c) };
}

function enforceArchitecturalClearance(headTable, pts, landmarks, minRoomHeight = 680) {
  const all = [
    { x: headTable.x, y: headTable.y, shape: headTable.shape, cap: headTable.capacity, rot: headTable.rotation || 0, fixed: true },
    ...pts.map((p) => ({ x: p.x, y: p.y, shape: p.shape || 'round', cap: p.cap || 8, rot: p.rot || 0, fixed: false, ref: p }))
  ];
  for (let iter = 0; iter < 80; iter++) {
    for (let i = 1; i < all.length; i++) {
      const A = all[i], extA = tblExtents(A.shape, A.cap, A.rot);
      for (let j = 0; j < all.length; j++) {
        if (i === j) continue;
        const B = all[j], extB = tblExtents(B.shape, B.cap, B.rot);
        const dx = A.x - B.x, dy = A.y - B.y || (i > j ? 1 : -1);
        if (A.shape === 'round' && B.shape === 'round') {
          const minD = extA.rx + extB.rx, d = Math.hypot(dx, dy) || 1;
          if (d < minD) {
            const push = (minD - d) * (B.fixed ? 1 : 0.55) + 1.5;
            const atWall = A.x <= extA.rx + 18 || A.x >= 1102 - extA.rx;
            const ux = atWall ? (dx / d) * 0.35 : (dx / d);
            const uy = atWall ? (dy >= 0 ? 0.94 : -0.94) : (dy / d);
            A.x += ux * push; A.y += uy * push;
            if (!B.fixed) { B.x -= ux * push; B.y -= uy * push; }
          }
        } else {
          const minX = extA.rx + extB.rx, minY = extA.ry + extB.ry;
          if (Math.abs(dx) < minX && Math.abs(dy) < minY) {
            const pX = (minX - Math.abs(dx)) * (B.fixed ? 1 : 0.55) + 2;
            const pY = (minY - Math.abs(dy)) * (B.fixed ? 1 : 0.55) + 2;
            const atWall = A.x <= extA.rx + 18 || A.x >= 1102 - extA.rx;
            if (pX < pY && !atWall) {
              const s = dx >= 0 ? 1 : -1;
              A.x += s * pX; if (!B.fixed) B.x -= s * pX;
            } else {
              const s = dy >= 0 ? 1 : -1;
              A.y += s * pY; if (!B.fixed) B.y -= s * pY;
            }
          }
        }
      }
      for (const lm of landmarks) {
        if (lm.id === 'lm_exit') continue;
        if (lm.id === 'lm_dance') {
          const radX = extA.rx + lm.w / 2 + 16, radY = extA.ry + lm.h / 2 + 16;
          const dx = A.x - lm.x, dy = A.y - lm.y || -1;
          const norm = Math.hypot(dx / radX, dy / radY) || 0.01;
          if (norm < 1) {
            A.x = lm.x + (dx / norm) * 1.04;
            A.y = lm.y + (dy / norm) * 1.04;
          }
          continue;
        }
        const minX = extA.rx + lm.w / 2 + 10, minY = extA.ry + lm.h / 2 + 10;
        const dx = A.x - lm.x, dy = A.y - lm.y || 1;
        if (Math.abs(dx) < minX && Math.abs(dy) < minY) {
          const pushX = minX - Math.abs(dx), pushY = minY - Math.abs(dy);
          if (pushX < pushY && A.x > extA.rx + 25 && A.x < 1095 - extA.rx) A.x += (dx >= 0 ? 1 : -1) * (pushX + 3);
          else A.y += (dy >= 0 ? 1 : -1) * (pushY + 3);
        }
      }
      A.x = Math.max(extA.rx + 12, Math.min(1108 - extA.rx, Math.round(A.x)));
      A.y = Math.max(extA.ry + 68, Math.round(A.y));
    }
  }
  let maxBottom = minRoomHeight;
  for (let i = 1; i < all.length; i++) {
    const A = all[i], extA = tblExtents(A.shape, A.cap, A.rot);
    A.ref.x = Math.round(A.x); A.ref.y = Math.round(A.y);
    maxBottom = Math.max(maxBottom, A.ref.y + extA.ry + 64);
  }
  landmarks.forEach((lm) => {
    if (lm.id === 'lm_exit') lm.y = maxBottom - 34;
  });
  return Math.max(minRoomHeight, maxBottom);
}

function buildVenueBlueprint(slug = '', title = '') {
  const key = String(slug || '').toLowerCase();
  const h = hashSlug(key || title);
  const m = key.match(/^(\d{2,3})-(?:guest|person)/i) || String(title || '').match(/(\d{2,3})-(?:Guest|Person)/i);
  const isFloorplan = Boolean(key.match(/^(\d{2,3})-(?:guest|person)/i));
  const guests = m ? Number(m[1]) : (
    /gala|300/.test(key) ? 240 : /tent|rain/.test(key) ? 160 : /8-person|10-person/.test(key) ? 140 :
    /grandparent|dj|acoustic/.test(key) ? 145 : /divorced|parents/.test(key) ? 130 :
    /round-tables-vs-long|hybrid|zola|knot|rsvpify/.test(key) ? 120 : /kings|bridal-party/.test(key) ? 110 :
    /u-shape|rehearsal|welcome-dinner|vip-dinner/.test(key) ? 65 : 90 + (h % 7) * 10
  );

  let arch = 'ballroom_chevron';
  let specLabel = '';
  if (/rotunda|museum/.test(key)) arch = 'rotunda_orbit';
  else if (/(?:^|-)40-guest/.test(key)) arch = 'private_dining_40';
  else if (/u-shape|60-guest-rehearsal/.test(key)) arch = 'u_shape';
  else if (/50-guest-micro|kings-table|bridal-party-plus-ones/.test(key)) arch = 'kings_feast';
  else if (/round-tables-vs-long|120-guest/.test(key)) arch = 'hybrid_split';
  else if (/(?:^|-)80-guest/.test(key)) arch = 'tuscan_horizontal';
  else if (/130-guest-winery|tuscan|parallel-banquet/.test(key)) arch = 'tuscan_rows';
  else if (/140-guest-barn/.test(key)) arch = 'barn_harvest';
  else if (/90-guest-garden|conservatory/.test(key)) arch = 'conservatory_atrium';
  else if (/110-guest-coastal|75-guest-destination|beach|yacht|villa/.test(key)) arch = 'coastal_arc';
  else if (/135-guest-rooftop|penthouse/.test(key)) arch = 'rooftop_skyline';
  else if (/160-guest-industrial|loft/.test(key)) arch = 'loft_asymmetric';
  else if (/250-guest-estate-tent|outdoor-tent|sailcloth/.test(key)) arch = 'tent_sailcloth';
  else if (/220-guest-cultural/.test(key)) arch = 'cultural_quadrants';
  else if (/200-guest-hotel-ballroom/.test(key)) arch = 'ballroom_center_dance';
  else if (/300-guest|charity-gala/.test(key)) arch = 'gala_300';
  else if (/175-guest-country-club|parents-same-table|divorced/.test(key)) arch = 'vip_host_wings';
  else if (/100-guest/.test(key)) arch = 'intimate_amphitheater';
  else if (/8-person-60-inch/.test(key)) arch = 'rounds_8v10';
  else if (/grandparents-away-from-dj/.test(key)) arch = 'acoustic_zones';
  else if (!isFloorplan) {
    const pool = ['intimate_amphitheater', 'tuscan_rows', 'hybrid_split', 'coastal_arc', 'conservatory_atrium', 'vip_host_wings', 'loft_asymmetric', 'u_shape', 'rooftop_skyline', 'tuscan_horizontal', 'ballroom_center_dance'];
    arch = pool[h % pool.length];
  }

  const pts = [];
  let landmarks = [];
  let headTable = { shape: 'sweetheart', capacity: 2, x: 560, y: 76, rotation: 0, name: 'Sweetheart Table' };
  let roomHeight = 680;

  if (arch === 'rotunda_orbit') {
    roomHeight = 1040;
    const totalTbls = Math.max(10, Math.min(20, Math.ceil((guests - 2) / 9)));
    const innerN = Math.min(7, Math.floor(totalTbls * 0.36));
    const outerN = totalTbls - innerN;
    for (let i = 0; i < innerN; i++) {
      const a = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / innerN;
      pts.push({ x: Math.round(560 + 235 * Math.cos(a)), y: Math.round(520 + 215 * Math.sin(a)), shape: 'round', cap: 8, rot: 0 });
    }
    for (let i = 0; i < outerN; i++) {
      const a = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / outerN;
      pts.push({ x: Math.round(560 + 425 * Math.cos(a)), y: Math.round(520 + 385 * Math.sin(a)), shape: 'round', cap: 10, rot: 0 });
    }
    landmarks = [
      { id: 'lm_dance', label: 'ROTUNDA CENTER DANCE FLOOR', x: 560, y: 520, w: 170, h: 150, zone: 'party', rx: 75 },
      { id: 'lm_bar', label: 'SCULPTURE GALLERY BAR', x: 185, y: 74, w: 185, h: 38, zone: 'party' },
      { id: 'lm_music', label: 'STRING QUARTET ALCOVE', x: 935, y: 74, w: 185, h: 38, zone: 'quiet' },
      { id: 'lm_exit', label: 'MARBLE ROTUNDA FOYER', x: 560, y: 990, w: 230, h: 34, zone: 'quiet' }
    ];
    specLabel = `${pts.length} Rounds · 360° Museum Rotunda Orbit`;
  } else if (arch === 'private_dining_40') {
    roomHeight = 680;
    headTable = { shape: 'kings_4sided', capacity: 10, x: 560, y: 120, rotation: 0, name: 'Table 1 · Host & Toast Table' };
    pts.push({ x: 300, y: 315, shape: 'banquet_2sided', cap: 10, rot: 0 });
    pts.push({ x: 820, y: 315, shape: 'banquet_2sided', cap: 10, rot: 0 });
    pts.push({ x: 300, y: 515, shape: 'round', cap: 8, rot: 0 });
    pts.push({ x: 820, y: 515, shape: 'round', cap: 8, rot: 0 });
    landmarks = [
      { id: 'lm_dance', label: 'CELLAR TOAST & LOUNGE AREA', x: 560, y: 415, w: 210, h: 135, zone: 'quiet' },
      { id: 'lm_bar', label: 'RESERVE WINE & ESPRESSO BAR', x: 185, y: 120, w: 185, h: 38, zone: 'quiet' },
      { id: 'lm_stage', label: 'WELCOME PODIUM', x: 935, y: 120, w: 165, h: 38, zone: 'quiet' }
    ];
    specLabel = `King's Head + 2 Long Banquets + 2 Intimate Rounds`;
  } else if (arch === 'u_shape') {
    roomHeight = 760;
    headTable = { shape: 'banquet_2sided', capacity: 12, x: 560, y: 120, rotation: 0, name: 'Table 1 · North Head Banquet' };
    const wingRows = guests <= 48 ? 1 : 2;
    for (let r = 0; r < wingRows; r++) {
      const y = wingRows === 1 ? 360 : (305 + r * 285);
      pts.push({ x: 220, y, shape: 'banquet_2sided', cap: 12, rot: 90 });
      pts.push({ x: 900, y, shape: 'banquet_2sided', cap: 12, rot: 90 });
    }
    if (guests > 65) pts.push({ x: 560, y: 650, shape: 'banquet_2sided', cap: 12, rot: 0 });
    landmarks = [
      { id: 'lm_dance', label: 'OPEN COURTYARD & TOAST FLOOR', x: 560, y: 385, w: 300, h: 170, zone: 'party' },
      { id: 'lm_bar', label: 'SOMMELIER WINE TABLE', x: 185, y: 118, w: 170, h: 38, zone: 'quiet' },
      { id: 'lm_stage', label: 'TOAST & SPEECHES PODIUM', x: 935, y: 118, w: 175, h: 38, zone: 'quiet' }
    ];
    specLabel = `U-Shape Horseshoe Banquets · Open Center`;
  } else if (arch === 'kings_feast') {
    roomHeight = 740;
    headTable = { shape: 'kings_4sided', capacity: 14, x: 560, y: 125, rotation: 0, name: "Table 1 · Grand King's Head Table" };
    const extra = Math.max(2, Math.ceil((guests - 14) / 14));
    if (extra <= 3) {
      pts.push({ x: 310, y: 315, shape: 'kings_4sided', cap: 14, rot: 0 });
      pts.push({ x: 810, y: 315, shape: 'kings_4sided', cap: 14, rot: 0 });
      if (extra >= 3) pts.push({ x: 560, y: 495, shape: 'kings_4sided', cap: 14, rot: 0 });
    } else {
      [285, 795].forEach((x) => {
        pts.push({ x, y: 310, shape: 'kings_4sided', cap: 14, rot: 0 });
        pts.push({ x, y: 500, shape: 'kings_4sided', cap: 14, rot: 0 });
      });
      if (extra >= 5) pts.push({ x: 560, y: 500, shape: 'round', cap: 8, rot: 0 });
    }
    landmarks = [
      { id: 'lm_dance', label: 'CANDLELIGHT DANCE FLOOR', x: 560, y: 655, w: 260, h: 75, zone: 'party' },
      { id: 'lm_bar', label: 'CHAMPAGNE TOWER & BAR', x: 175, y: 125, w: 175, h: 38, zone: 'party' },
      { id: 'lm_exit', label: 'PRIVATE DINING TERRACE', x: 945, y: 125, w: 175, h: 38, zone: 'quiet' }
    ];
    specLabel = `4-Sided King's Feast Tables · Royal Dining`;
  } else if (arch === 'tuscan_horizontal') {
    roomHeight = 760;
    [255, 435, 615].forEach((y) => {
      pts.push({ x: 275, y, shape: 'banquet_2sided', cap: 12, rot: 0 });
      pts.push({ x: 845, y, shape: 'banquet_2sided', cap: 12, rot: 0 });
    });
    pts.push({ x: 560, y: 615, shape: 'kings_4sided', cap: 12, rot: 0 });
    landmarks = [
      { id: 'lm_dance', label: 'COURTYARD OLIVE-TREE DANCE FLOOR', x: 560, y: 345, w: 215, h: 175, zone: 'party' },
      { id: 'lm_bar', label: 'PROSECCO & APEROL CART', x: 195, y: 76, w: 185, h: 38, zone: 'party' },
      { id: 'lm_stage', label: 'STRING DUO TERRACE', x: 925, y: 76, w: 180, h: 38, zone: 'quiet' }
    ];
    specLabel = `6 Horizontal Courtyard Banquets + Center King's Table`;
  } else if (arch === 'tuscan_rows') {
    roomHeight = 790;
    const count = Math.max(4, Math.min(12, Math.ceil((guests - 2) / 12)));
    const cols = count <= 4 ? [260, 860] : [175, 360, 760, 945];
    let r = 0;
    while (pts.length < count) {
      for (const x of cols) {
        if (pts.length >= count) break;
        pts.push({ x, y: 290 + r * 300, shape: 'banquet_2sided', cap: 12, rot: 90 });
      }
      r++;
    }
    landmarks = [
      { id: 'lm_dance', label: 'STRING-LIGHT DANCE FLOOR', x: 560, y: 385, w: 165, h: 240, zone: 'party' },
      { id: 'lm_bar', label: 'WINE BARREL & VINTAGE BAR', x: 195, y: 76, w: 190, h: 38, zone: 'party' },
      { id: 'lm_stage', label: 'ACOUSTIC TRIO STAGE', x: 925, y: 76, w: 180, h: 38, zone: 'loud' },
      { id: 'lm_exit', label: 'OLIVE GROVE QUIET TERRACE', x: 560, y: 730, w: 240, h: 36, zone: 'quiet' }
    ];
    specLabel = `${pts.length} Long Tuscan Banquets (12-Seat) · Vineyard Rows`;
  } else if (arch === 'hybrid_split') {
    roomHeight = 740;
    [150, 350].forEach((x) => [225, 425, 625].forEach((y) => pts.push({ x, y, shape: 'round', cap: 8, rot: 0 })));
    [245, 435, 625].forEach((y) => pts.push({ x: 845, y, shape: 'banquet_2sided', cap: 12, rot: 0 }));
    landmarks = [
      { id: 'lm_dance', label: 'CENTRAL DANCE FLOOR', x: 575, y: 335, w: 165, h: 150, zone: 'party' },
      { id: 'lm_bar', label: 'CRAFT COCKTAIL BAR', x: 190, y: 76, w: 175, h: 38, zone: 'party' },
      { id: 'lm_dj', label: 'DJ & SOUND BOOTH', x: 930, y: 76, w: 175, h: 38, zone: 'loud' }
    ];
    specLabel = `Hybrid Mix: 6 Rounds (West) + 3 Long Banquets (East)`;
  } else if (arch === 'barn_harvest') {
    roomHeight = 820;
    pts.push({ x: 300, y: 235, shape: 'banquet_2sided', cap: 12, rot: 0 });
    pts.push({ x: 820, y: 235, shape: 'banquet_2sided', cap: 12, rot: 0 });
    pts.push({ x: 300, y: 420, shape: 'banquet_2sided', cap: 12, rot: 0 });
    pts.push({ x: 820, y: 420, shape: 'banquet_2sided', cap: 12, rot: 0 });
    [135, 345, 560, 775, 985].forEach((x) => pts.push({ x, y: 615, shape: 'round', cap: 8, rot: 0 }));
    [240, 880].forEach((x) => pts.push({ x, y: 795, shape: 'round', cap: 8, rot: 0 }));
    landmarks = [
      { id: 'lm_dance', label: 'BARN TIMBER DANCE FLOOR', x: 560, y: 320, w: 175, h: 145, zone: 'party' },
      { id: 'lm_bar', label: 'BOURBON & CIDER BAR', x: 190, y: 76, w: 180, h: 38, zone: 'party' },
      { id: 'lm_dj', label: 'FOLK BAND STAGE', x: 930, y: 76, w: 175, h: 38, zone: 'loud' },
      { id: 'lm_exit', label: 'QUIET SENIOR PORCH EXIT', x: 560, y: 795, w: 235, h: 34, zone: 'quiet' }
    ];
    specLabel = `4 Harvest Banquets + 7 Perimeter Rounds · Barn Mix`;
  } else if (arch === 'conservatory_atrium') {
    roomHeight = 860;
    pts.push({ x: 560, y: 245, shape: 'kings_4sided', cap: 12, rot: 0 });
    pts.push({ x: 560, y: 585, shape: 'kings_4sided', cap: 12, rot: 0 });
    [225, 420, 615, 795].forEach((y) => {
      pts.push({ x: 175, y, shape: 'round', cap: 8, rot: 0 });
      pts.push({ x: 945, y, shape: 'round', cap: 8, rot: 0 });
    });
    landmarks = [
      { id: 'lm_dance', label: 'GLASSHOUSE FOUNTAIN & DANCE', x: 560, y: 400, w: 210, h: 115, zone: 'party' },
      { id: 'lm_bar', label: 'BOTANICAL SPRITZ BAR', x: 190, y: 76, w: 180, h: 38, zone: 'party' },
      { id: 'lm_music', label: 'HARP & STRINGS ALCOVE', x: 930, y: 76, w: 180, h: 38, zone: 'quiet' }
    ];
    specLabel = `2 Atrium King's Tables + 8 Botanical Wall Rounds`;
  } else if (arch === 'coastal_arc') {
    roomHeight = 840;
    headTable = { shape: 'sweetheart', capacity: 2, x: 560, y: 120, rotation: 0, name: 'Ocean-View Sweetheart Table' };
    const isVilla = /75-guest|villa/.test(key);
    const total = Math.max(6, Math.min(14, Math.ceil((guests - 2) / 8)));
    const row1 = Math.min(5, Math.ceil(total * 0.42));
    const row2 = total - row1;
    for (let i = 0; i < row1; i++) {
      const t = row1 === 1 ? 0.5 : i / (row1 - 1);
      const a = Math.PI * (0.10 + 0.80 * t);
      pts.push({ x: Math.round(560 - 365 * Math.cos(a)), y: Math.round(255 + 195 * Math.sin(a)), shape: isVilla && i % 2 === 0 ? 'banquet_2sided' : 'round', cap: 8, rot: isVilla ? Math.round((t - 0.5) * 32) : 0 });
    }
    for (let i = 0; i < row2; i++) {
      const t = row2 === 1 ? 0.5 : i / (row2 - 1);
      const a = Math.PI * (0.06 + 0.88 * t);
      pts.push({ x: Math.round(560 - 445 * Math.cos(a)), y: Math.round(455 + 255 * Math.sin(a)), shape: 'round', cap: 8, rot: 0 });
    }
    landmarks = [
      { id: 'lm_ocean', label: 'OCEANFRONT SUNSET VIEW & TERRACE', x: 560, y: 42, w: 460, h: 32, zone: 'quiet' },
      { id: 'lm_dance', label: 'TEAK DECK DANCE FLOOR', x: 560, y: 240, w: 195, h: 100, zone: 'party' },
      { id: 'lm_bar', label: 'RAW BAR & CHAMPAGNE', x: 175, y: 120, w: 185, h: 38, zone: 'party' },
      { id: 'lm_gelato', label: 'GELATO & ESPRESSO TERRACE', x: 945, y: 120, w: 185, h: 38, zone: 'quiet' }
    ];
    specLabel = `${pts.length} Tables in Curved Ocean-View Crescent Arc`;
  } else if (arch === 'rooftop_skyline') {
    roomHeight = 820;
    headTable = { shape: 'sweetheart', capacity: 2, x: 745, y: 105, rotation: 0, name: 'Skyline Sweetheart Table' };
    pts.push({ x: 545, y: 255, shape: 'banquet_2sided', cap: 12, rot: 0 });
    pts.push({ x: 915, y: 255, shape: 'banquet_2sided', cap: 12, rot: 0 });
    [455, 650].forEach((y) => {
      [155, 365, 575, 785, 980].forEach((x) => pts.push({ x, y, shape: 'round', cap: 8, rot: 0 }));
    });
    landmarks = [
      { id: 'lm_dance', label: 'WEST SKYLINE GLASS DANCE FLOOR', x: 245, y: 255, w: 215, h: 155, zone: 'party' },
      { id: 'lm_dj', label: 'ROOFTOP DJ BOOTH', x: 245, y: 105, w: 185, h: 38, zone: 'loud' },
      { id: 'lm_bar', label: 'PENTHOUSE MEZCAL & COCKTAIL BAR', x: 560, y: 775, w: 245, h: 36, zone: 'party' }
    ];
    specLabel = `West Skyline Dance Floor + 2 Banquets & 10 Rounds`;
  } else if (arch === 'loft_asymmetric') {
    roomHeight = 820;
    headTable = { shape: 'kings_4sided', capacity: 10, x: 375, y: 105, rotation: 0, name: "Table 1 · Skyline VIP Table" };
    [155, 375, 595].forEach((x, ci) => {
      [260, 460, 660].forEach((y, ri) => {
        pts.push({ x, y, shape: (ri === 1 && ci === 1) ? 'banquet_2sided' : 'round', cap: 10, rot: 0 });
      });
    });
    pts.push({ x: 865, y: 505, shape: 'banquet_2sided', cap: 12, rot: 0 });
    pts.push({ x: 865, y: 685, shape: 'round', cap: 8, rot: 0 });
    landmarks = [
      { id: 'lm_dance', label: 'EAST WAREHOUSE DANCE FLOOR', x: 865, y: 275, w: 205, h: 155, zone: 'party' },
      { id: 'lm_dj', label: 'VINYL DJ & SUBWOOFER LOFT', x: 865, y: 105, w: 205, h: 40, zone: 'loud' },
      { id: 'lm_bar', label: 'SKYLINE CRAFT COCKTAIL BAR', x: 245, y: 775, w: 225, h: 36, zone: 'party' },
      { id: 'lm_exit', label: 'ROOFTOP LOUNGE & FIREPIT', x: 865, y: 775, w: 225, h: 36, zone: 'quiet' }
    ];
    specLabel = `Asymmetric East Dance Floor + West Gallery Mix`;
  } else if (arch === 'tent_sailcloth') {
    roomHeight = 1040;
    const cols5 = [135, 345, 560, 775, 985];
    [135, 330, 790, 985].forEach((x) => pts.push({ x, y: 220, shape: 'round', cap: 10, rot: 0 }));
    [415, 610].forEach((y) => {
      [135, 325, 795, 985].forEach((x) => pts.push({ x, y, shape: 'round', cap: 10, rot: 0 }));
    });
    pts.push({ x: 560, y: 650, shape: 'banquet_2sided', cap: 12, rot: 0 });
    cols5.forEach((x) => pts.push({ x, y: 845, shape: 'round', cap: 10, rot: 0 }));
    landmarks = [
      { id: 'lm_dance', label: 'SAILCLOTH TENT DANCE FLOOR', x: 560, y: 455, w: 195, h: 135, zone: 'party' },
      { id: 'lm_pole1', label: 'WEST POLE', x: 435, y: 345, w: 72, h: 30, zone: 'quiet' },
      { id: 'lm_pole2', label: 'EAST POLE', x: 685, y: 345, w: 72, h: 30, zone: 'quiet' },
      { id: 'lm_bar', label: 'GARDEN SPRITZ BAR', x: 195, y: 78, w: 185, h: 38, zone: 'party' },
      { id: 'lm_stage', label: 'LIVE BAND MARQUEE', x: 925, y: 78, w: 185, h: 38, zone: 'loud' },
      { id: 'lm_exit', label: 'LAWN FIREPIT & QUIET EXIT', x: 560, y: 985, w: 245, h: 34, zone: 'quiet' }
    ];
    specLabel = `${pts.length} Tables · Sailcloth Tent Perimeter + Twin Poles`;
  } else if (arch === 'cultural_quadrants') {
    roomHeight = 1040;
    headTable = { shape: 'sweetheart', capacity: 4, x: 560, y: 85, rotation: 0, name: 'Couple & Parents Stage Table' };
    pts.push({ x: 260, y: 225, shape: 'kings_4sided', cap: 12, rot: 0 });
    pts.push({ x: 860, y: 225, shape: 'kings_4sided', cap: 12, rot: 0 });
    [420, 615, 810].forEach((y) => {
      [140, 335, 785, 980].forEach((x) => pts.push({ x, y, shape: 'round', cap: 10, rot: 0 }));
    });
    [350, 560, 770].forEach((x) => pts.push({ x, y: 985, shape: 'round', cap: 10, rot: 0 }));
    landmarks = [
      { id: 'lm_dance', label: 'CENTRAL MANDAP & DANCE FLOOR', x: 560, y: 475, w: 210, h: 150, zone: 'party' },
      { id: 'lm_bar', label: 'HALAL / KOSHER / VEGAN STATION', x: 205, y: 85, w: 220, h: 38, zone: 'quiet' },
      { id: 'lm_dj', label: 'DHOL & SOUND STAGE', x: 920, y: 85, w: 190, h: 38, zone: 'loud' }
    ];
    specLabel = `${pts.length} Tables · 4 Multi-Generational Family Quadrants`;
  } else if (arch === 'ballroom_center_dance') {
    roomHeight = 1040;
    [140, 350, 560, 770, 980].forEach((x) => pts.push({ x, y: 235, shape: 'round', cap: 10, rot: 0 }));
    [435, 635].forEach((y) => {
      [140, 330, 790, 980].forEach((x) => pts.push({ x, y, shape: 'round', cap: 10, rot: 0 }));
    });
    [140, 350, 560, 770, 980].forEach((x) => pts.push({ x, y: 845, shape: 'round', cap: 10, rot: 0 }));
    pts.push({ x: 350, y: 1015, shape: 'round', cap: 10, rot: 0 });
    pts.push({ x: 770, y: 1015, shape: 'round', cap: 10, rot: 0 });
    landmarks = [
      { id: 'lm_dance', label: 'CENTER BALLROOM DANCE FLOOR', x: 560, y: 535, w: 215, h: 165, zone: 'party' },
      { id: 'lm_bar1', label: 'WEST FOYER BAR', x: 185, y: 76, w: 175, h: 38, zone: 'party' },
      { id: 'lm_bar2', label: 'EAST ORCHESTRA STAGE', x: 935, y: 76, w: 185, h: 38, zone: 'loud' }
    ];
    specLabel = `20×10-Top Rounds Surrounding True Center Dance Floor`;
  } else if (arch === 'gala_300') {
    roomHeight = 1240;
    headTable = { shape: 'banquet_2sided', capacity: 10, x: 560, y: 145, rotation: 0, name: 'Table 1 · Gala Host & Co-Chairs' };
    const cols5 = [135, 345, 560, 775, 985];
    [295, 490, 685, 880, 1075].forEach((y, ri) => {
      cols5.forEach((x, ci) => {
        if (ri <= 1 && ci === 2) return;
        pts.push({ x, y, shape: 'round', cap: 10, rot: 0 });
      });
    });
    landmarks = [
      { id: 'lm_stage', label: 'GRAND GALA STAGE & PODIUM', x: 560, y: 62, w: 310, h: 42, zone: 'loud' },
      { id: 'lm_dance', label: 'GALA DANCE FLOOR & AUCTION ARENA', x: 560, y: 390, w: 195, h: 165, zone: 'party' },
      { id: 'lm_bar1', label: 'WEST CHAMPAGNE BAR', x: 165, y: 68, w: 175, h: 38, zone: 'party' },
      { id: 'lm_bar2', label: 'EAST MARTINI BAR', x: 955, y: 68, w: 175, h: 38, zone: 'party' }
    ];
    specLabel = `${pts.length}×10-Top Rounds · Grand Stage + VIP Host Ring`;
  } else if (arch === 'vip_host_wings' || arch === 'rounds_8v10' || arch === 'acoustic_zones') {
    roomHeight = 840;
    const is8v10 = arch === 'rounds_8v10';
    pts.push({ x: 285, y: 225, shape: is8v10 ? 'round' : 'banquet_2sided', cap: is8v10 ? 8 : 10, rot: 0 });
    pts.push({ x: 835, y: 225, shape: is8v10 ? 'round' : 'banquet_2sided', cap: 10, rot: 0 });
    [135, 330, 790, 985].forEach((x) => {
      pts.push({ x, y: 415, shape: 'round', cap: is8v10 && x < 500 ? 8 : 10, rot: 0 });
    });
    [135, 345, 560, 775, 985].forEach((x) => {
      pts.push({ x, y: 605, shape: 'round', cap: is8v10 && x < 500 ? 8 : 10, rot: 0 });
      if (guests >= 150) pts.push({ x, y: 795, shape: 'round', cap: 8, rot: 0 });
    });
    landmarks = [
      { id: 'lm_dance', label: 'CENTRAL DANCE FLOOR', x: 560, y: 270, w: 205, h: 135, zone: 'party' },
      { id: 'lm_bar', label: arch === 'acoustic_zones' ? 'QUIET GARDEN EXIT (>35ft FROM DJ)' : 'COUNTRY CLUB TERRACE BAR', x: 195, y: 76, w: 215, h: 38, zone: 'quiet' },
      { id: 'lm_dj', label: arch === 'acoustic_zones' ? 'LOUD DJ SUBWOOFER ZONE (EAST)' : 'BANDSTAND & SOUND BOOTH', x: 925, y: 76, w: 205, h: 38, zone: 'loud' }
    ];
    specLabel = is8v10 ? `60" 8-Tops (West) vs 72" 10-Tops (East)` : `Dual VIP Parent Wings + ${pts.length - 2} Perimeter Rounds`;
  } else if (arch === 'intimate_amphitheater') {
    roomHeight = 820;
    const count = Math.max(8, Math.min(13, Math.ceil((guests - 2) / 8)));
    const inner = Math.min(5, Math.ceil(count * 0.42)), outer = count - inner;
    for (let i = 0; i < inner; i++) {
      const a = Math.PI * (0.08 + (0.84 * i) / Math.max(1, inner - 1));
      pts.push({ x: Math.round(560 - 355 * Math.cos(a)), y: Math.round(240 + 195 * Math.sin(a)), shape: 'round', cap: 8, rot: 0 });
    }
    for (let i = 0; i < outer; i++) {
      const a = Math.PI * (0.06 + (0.88 * i) / Math.max(1, outer - 1));
      pts.push({ x: Math.round(560 - 445 * Math.cos(a)), y: Math.round(445 + 250 * Math.sin(a)), shape: 'round', cap: 8, rot: 0 });
    }
    landmarks = [
      { id: 'lm_dance', label: 'COURTYARD DANCE FLOOR', x: 560, y: 225, w: 195, h: 105, zone: 'party' },
      { id: 'lm_bar', label: 'CHAMPAGNE & COCKTAIL BAR', x: 185, y: 76, w: 185, h: 38, zone: 'party' },
      { id: 'lm_dj', label: 'DJ & ACOUSTIC BOOTH', x: 935, y: 76, w: 175, h: 38, zone: 'loud' }
    ];
    specLabel = `Sweetheart + ${pts.length} Rounds · Semi-Circular Amphitheater`;
  } else {
    const per = guests >= 185 ? 10 : 8;
    const count = Math.max(10, Math.min(20, Math.ceil((guests - 2) / per)));
    const wingCols = [135, 330, 790, 985];
    [220, 410].forEach((y) => wingCols.forEach((x) => { if (pts.length < count) pts.push({ x, y, shape: 'round', cap: per, rot: 0 }); }));
    const fullCols = [135, 345, 560, 775, 985];
    let y = 600;
    while (pts.length < count) {
      for (const x of fullCols) { if (pts.length < count) pts.push({ x, y, shape: 'round', cap: per, rot: 0 }); }
      y += 195;
    }
    roomHeight = Math.max(760, y - 50);
    landmarks = [
      { id: 'lm_dance', label: 'GRAND BALLROOM DANCE FLOOR', x: 560, y: 280, w: 205, h: 140, zone: 'party' },
      { id: 'lm_bar', label: 'CHAMPAGNE & COCKTAIL BAR', x: 195, y: 76, w: 190, h: 38, zone: 'party' },
      { id: 'lm_dj', label: 'STAGE & SOUND BOOTH', x: 925, y: 76, w: 185, h: 38, zone: 'loud' },
      { id: 'lm_exit', label: 'QUIET FOYER & TERRACE EXIT', x: 560, y: roomHeight - 38, w: 240, h: 34, zone: 'quiet' }
    ];
    specLabel = `Sweetheart + ${pts.length}×${per}-Top Rounds · Ballroom Wings`;
  }

  let totalCap = (headTable.capacity || 2) + pts.reduce((s, p) => s + (p.cap || 8), 0);
  if (totalCap < guests) {
    pts.forEach((p) => {
      if (totalCap >= guests) return;
      const maxC = p.shape === 'round' ? 10 : 12;
      if ((p.cap || 8) < maxC) { totalCap += (maxC - (p.cap || 8)); p.cap = maxC; }
    });
    const lastPt = pts[pts.length - 1] || { shape: 'round', cap: 10, rot: 0 };
    const extraShape = lastPt.shape === 'sweetheart' ? 'round' : (lastPt.shape || 'round');
    const extraCap = extraShape === 'round' ? 10 : 12;
    const addCols = extraShape === 'round' ? [160, 360, 560, 760, 960] : [260, 560, 860];
    let extraIdx = 0;
    let baseExtraY = pts.reduce((m, p) => Math.max(m, p.y || 240), 240) + 200;
    while (totalCap < guests) {
      const x = addCols[extraIdx % addCols.length];
      const y = baseExtraY + Math.floor(extraIdx / addCols.length) * 200;
      pts.push({ x, y, shape: extraShape, cap: extraCap, rot: 0 });
      totalCap += extraCap;
      extraIdx++;
    }
  }

  roomHeight = enforceArchitecturalClearance(headTable, pts, landmarks, roomHeight);

  return {
    slug: key,
    guests,
    sqft: Math.round((guests * SQFT_PER_GUEST) / 25) * 25,
    type: venueType(title, key),
    isFloorplan,
    arch,
    specLabel,
    roomHeight,
    headTable,
    pts,
    landmarks
  };
}

function renderFloorplanSvg(bp, { detailed = false } = {}) {
  const h = bp.roomHeight || 680;
  const shapes = [];
  (bp.landmarks || []).forEach((lm) => {
    const isDance = lm.id === 'lm_dance' || /DANCE|COURTYARD|MANDAP|ROTUNDA CENTER/i.test(lm.label);
    const fill = isDance ? '#FFE4E6' : (lm.zone === 'loud' ? '#FEF3C7' : '#D1FAE5');
    const stroke = isDance ? '#FB7185' : (lm.zone === 'loud' ? '#F59E0B' : '#34D399');
    const textCol = isDance ? '#9F1239' : (lm.zone === 'loud' ? '#92400E' : '#065F46');
    const rx = lm.rx || 12;
    shapes.push(`<rect x="${lm.x - lm.w / 2}" y="${lm.y - lm.h / 2}" width="${lm.w}" height="${lm.h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2.5" ${isDance ? 'stroke-dasharray="8 5"' : ''}/>`);
    if (detailed || isDance) {
      shapes.push(`<text x="${lm.x}" y="${lm.y + 5}" text-anchor="middle" font-size="${detailed ? 14 : 22}" font-weight="800" fill="${textCol}">${escapeHtml(detailed ? lm.label : (isDance ? 'DANCE FLOOR' : lm.label.split(' ')[0]))}</text>`);
    }
  });

  const ht = bp.headTable;
  if (ht) {
    const hw = ht.shape === 'sweetheart' ? 120 : 180, hh = ht.shape === 'kings_4sided' ? 58 : 42;
    shapes.push(`<rect x="${ht.x - hw / 2}" y="${ht.y - hh / 2}" width="${hw}" height="${hh}" rx="10" fill="#FEF3C7" stroke="#B45309" stroke-width="3.2"/>`);
    shapes.push(`<text x="${ht.x}" y="${ht.y + 5}" text-anchor="middle" font-size="${detailed ? 13 : 18}" font-weight="800" fill="#181412">Head</text>`);
  }

  bp.pts.forEach((pt, idx) => {
    const isVip = idx === 0 || idx === 3;
    const stroke = isVip ? '#8C2D19' : '#57534E';
    const fill = isVip ? '#FFFBEB' : '#FFFFFF';
    const cap = pt.cap || 8;
    if (pt.shape === 'round') {
      const r = cap >= 10 ? 50 : 44, orbit = r + 15;
      for (let s = 0; s < cap; s++) {
        const a = -Math.PI / 2 + (2 * Math.PI * s) / cap;
        shapes.push(`<circle cx="${Math.round(pt.x + orbit * Math.cos(a))}" cy="${Math.round(pt.y + orbit * Math.sin(a))}" r="6.5" fill="${s === 0 ? '#8C2D19' : '#E7DFD3'}" stroke="#A89F91" stroke-width="1"/>`);
      }
      shapes.push(`<circle cx="${pt.x}" cy="${pt.y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${isVip ? 3.4 : 2.6}"/>`);
    } else {
      const w = pt.shape === 'kings_4sided' ? 168 : 154, th = pt.shape === 'kings_4sided' ? 62 : 48;
      const rot = pt.rot ? ` transform="rotate(${pt.rot} ${pt.x} ${pt.y})"` : '';
      const topN = Math.min(6, Math.ceil(cap / 2));
      const chairs = [];
      for (let s = 0; s < topN; s++) {
        const lx = -((topN - 1) * 24) / 2 + s * 24;
        chairs.push(`<circle cx="${pt.x + lx}" cy="${pt.y - th / 2 - 11}" r="6" fill="${s === 0 ? '#8C2D19' : '#E7DFD3'}" stroke="#A89F91" stroke-width="1"/>`);
        chairs.push(`<circle cx="${pt.x + lx}" cy="${pt.y + th / 2 + 11}" r="6" fill="#E7DFD3" stroke="#A89F91" stroke-width="1"/>`);
      }
      shapes.push(`<g${rot}>${chairs.join('')}<rect x="${pt.x - w / 2}" y="${pt.y - th / 2}" width="${w}" height="${th}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="${isVip ? 3.4 : 2.6}"/></g>`);
    }
    shapes.push(`<text x="${pt.x}" y="${pt.y + 5}" text-anchor="middle" font-size="${detailed ? 14 : 18}" font-weight="800" fill="#181412">T${idx + 2}</text>`);
  });

  if (detailed && bp.pts.length >= 4) {
    const pA = bp.pts[0], pB = bp.pts[Math.min(3, bp.pts.length - 1)];
    shapes.push(`<line x1="${pA.x}" y1="${pA.y}" x2="${pB.x}" y2="${pB.y}" stroke="#065F46" stroke-width="2.5" stroke-dasharray="7 5"/>`);
  }

  const maxH = detailed ? '420px' : '170px';
  return `<svg viewBox="0 0 1120 ${h}" style="width:100%;max-height:${maxH};height:auto;display:block;border-radius:10px;background:#FAF7F2;border:1px solid #D6CBB8;" role="img" aria-label="${escapeHtml(bp.specLabel)} floorplan preview">${shapes.join('')}</svg>`;
}

function parseFloorplan(p) {
  const bp = buildVenueBlueprint(p.slug, p.title);
  return bp.isFloorplan ? bp : null;
}

function floorplanCard(p, f) {
  const title = String(p.title || '').replace(/^\d{2,3}-(?:Guest|Person)\s+/i, '');
  return `<a href="/seo/${escapeHtml(p.slug)}" class="dir-card" data-guests="${f.guests}" data-sqft="${f.sqft}" data-type="${escapeHtml(f.type)}">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
      <span class="dir-card-type">${escapeHtml(f.type)}</span>
      <span style="font-size:0.72rem;font-weight:700;color:#065F46;background:#ECFDF5;padding:2px 8px;border-radius:999px;border:1px solid #A7F3D0;">${f.pts.length + 1} Tables</span>
    </div>
    ${renderFloorplanSvg(f, { detailed: false })}
    <div style="font-size:0.76rem;font-weight:700;color:#57534E;background:#FAF6EE;padding:5px 9px;border-radius:8px;border:1px solid #EDE3D2;">${escapeHtml(f.specLabel)}</div>
    <div class="dir-stats">
      <div class="dir-stat"><span class="dir-stat-label">Guests</span><span class="dir-stat-val">${f.guests}</span></div>
      <div class="dir-stat"><span class="dir-stat-label">Room size</span><span class="dir-stat-val">${fmt(f.sqft)}<small> sq ft</small></span></div>
    </div>
    <h3 class="dir-card-title">${escapeHtml(title)}</h3>
    <div class="dir-card-cta">Inspect &amp; open layout &rarr;</div>
  </a>`;
}

function guideCard(p) {
  const bp = buildVenueBlueprint(p.slug, p.title);
  return `<a href="/seo/${escapeHtml(p.slug)}" class="dir-guide">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
      <span class="dir-guide-cat">${escapeHtml(p.category || 'Guide')}</span>
      <span style="font-size:0.72rem;font-weight:700;color:#8A6A2E;">${bp.guests}-Guest Preset &middot; ${escapeHtml(bp.specLabel.split('·')[0].trim())}</span>
    </div>
    <span class="dir-guide-title">${escapeHtml(p.title)}</span>
  </a>`;
}

const DIR_CSS = `
  .dir-filters { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; padding: 14px 16px; background: #FFFDF9; border: 1px solid #E8DCC4; border-radius: 14px; margin-bottom: 8px; }
  .dir-filter-label { font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #8A6A2E; }
  .dir-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .dir-chip { padding: 8px 14px; font-size: 0.90rem; font-weight: 700; color: #44403C; background: #FFFFFF; border: 1px solid #DCD3C3; border-radius: 999px; cursor: pointer; font-family: inherit; }
  .dir-chip:hover { border-color: #C8A96E; }
  .dir-chip.on { background: #181412; color: #FDE68A; border-color: #181412; }
  .dir-select { padding: 8px 12px; font-size: 0.90rem; font-weight: 600; color: #181412; background: #FFFFFF; border: 1px solid #DCD3C3; border-radius: 10px; font-family: inherit; }
  .dir-meta { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 0.86rem; color: #78716C; margin: 0 2px 18px; }
  .dir-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 18px; }
  .dir-card { display: flex; flex-direction: column; gap: 10px; padding: 18px 20px 16px; background: #FFFFFF; border: 1px solid #E8DCC4; border-radius: 16px; text-decoration: none; color: inherit; box-shadow: 0 1px 2px rgba(120,85,30,0.04); transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease; }
  .dir-card:hover { border-color: #C8A96E; box-shadow: 0 16px 34px -20px rgba(120,85,30,0.35); transform: translateY(-2px); }
  .dir-card[hidden] { display: none; }
  .dir-card-type { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #8A6A2E; }
  .dir-stats { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #F1E8D6; border-bottom: 1px solid #F1E8D6; }
  .dir-stat { display: flex; flex-direction: column; gap: 2px; padding: 8px 0; }
  .dir-stat + .dir-stat { padding-left: 16px; border-left: 1px solid #F1E8D6; }
  .dir-stat-label { font-size: 0.74rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #A39B8D; }
  .dir-stat-val { font-family: var(--font-serif); font-size: 1.5rem; font-weight: 600; color: #181412; line-height: 1.1; font-variant-numeric: lining-nums tabular-nums; }
  .dir-stat-val small { font-family: var(--font-sans); font-size: 0.78rem; font-weight: 600; color: #78716C; }
  .dir-card-title { font-family: var(--font-serif); font-size: 1.06rem; font-weight: 600; color: #181412; line-height: 1.28; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .dir-card-cta { margin-top: auto; font-size: 0.86rem; font-weight: 800; color: #8C2D19; }
  .dir-empty { display: none; text-align: center; padding: 40px 10px; color: #78716C; font-size: 1rem; }
  .dir-guides-head { margin: 64px 0 18px; text-align: center; }
  .dir-guide-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 10px 20px; }
  .dir-guide { display: flex; flex-direction: column; gap: 4px; padding: 12px 10px; border: 1px solid #EFE6D4; border-radius: 10px; background: #FFFDF9; text-decoration: none; }
  .dir-guide-cat { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #8A6A2E; }
  .dir-guide-title { font-size: 0.92rem; font-weight: 600; color: #181412; line-height: 1.38; }
  .dir-guide:hover { border-color: #C8A96E; }
  .dir-guide:hover .dir-guide-title { color: #8C2D19; }`;

const DIR_JS = `
(function() {
  var cards = [].slice.call(document.querySelectorAll('.dir-card')), grid = document.getElementById('dir-grid');
  var state = { size: 'all', type: 'all', sort: 'small' };
  var sizeOK = { all: function() { return true; }, s: function(g) { return g <= 75; }, m: function(g) { return g > 75 && g <= 125; }, l: function(g) { return g > 125 && g <= 175; }, xl: function(g) { return g > 175; } };
  function apply() {
    var shown = 0;
    cards.sort(function(a, b) {
      var ga = Number(a.dataset.guests), gb = Number(b.dataset.guests);
      if (state.sort === 'large') return gb - ga;
      if (state.sort === 'type') return a.dataset.type.localeCompare(b.dataset.type) || ga - gb;
      return ga - gb;
    }).forEach(function(c) {
      var ok = sizeOK[state.size](Number(c.dataset.guests)) && (state.type === 'all' || c.dataset.type === state.type);
      c.hidden = !ok; if (ok) shown++; grid.appendChild(c);
    });
    document.getElementById('dir-count').textContent = shown + ' architectural layout' + (shown === 1 ? '' : 's');
    document.getElementById('dir-empty').style.display = shown ? 'none' : 'block';
  }
  document.querySelectorAll('.dir-chip').forEach(function(b) { b.addEventListener('click', function() {
    document.querySelectorAll('.dir-chip').forEach(function(x) { x.classList.toggle('on', x === b); }); state.size = b.dataset.size; apply(); }); });
  document.getElementById('dir-type').addEventListener('change', function() { state.type = this.value; apply(); });
  document.getElementById('dir-sort').addEventListener('change', function() { state.sort = this.value; apply(); });
  window.dirReset = function() { state = { size: 'all', type: 'all', sort: 'small' }; document.getElementById('dir-type').value = 'all'; document.getElementById('dir-sort').value = 'small';
    document.querySelectorAll('.dir-chip').forEach(function(x) { x.classList.toggle('on', x.dataset.size === 'all'); }); apply(); };
  apply();
})();`;

function renderDirectoryPage(seoPages = []) {
  const plans = [], guides = [];
  seoPages.forEach((p) => { const f = parseFloorplan(p); if (f) plans.push([p, f]); else guides.push(p); });
  const types = Array.from(new Set(plans.map(([, f]) => f.type))).sort();
  const sizes = [['all', 'All sizes'], ['s', 'Up to 75'], ['m', '76 to 125'], ['l', '126 to 175'], ['xl', '176+']];
  return [
    renderHead({ title: `${plans.length} Wedding Venue Floorplans & ${guides.length} Seating Playbooks | SeatHarmony`, description: 'Browse architectural wedding venue floorplans (Rotunda Orbit, Tuscan Banquet Rows, Sailcloth Tent, U-Shape, King’s Feast, Ballroom Wings) by guest count and room size.', canonicalPath: '/directory', ogSlug: 'directory' }),
    '<body>', `<style>${DIR_CSS}</style>`, renderNavbar(),
    `<main class="container" style="padding:56px 24px 88px;">
      <div style="max-width:740px;margin:0 auto 32px;text-align:center;">
        <h1 class="studio-zone-title" style="text-align:center;margin-bottom:10px;">Find an architectural layout that fits your <em>venue.</em></h1>
        <p class="studio-zone-sub" style="text-align:center;">From 40-guest U-shape rehearsal dinners and 80-guest Tuscan vineyard banquets to 180-guest museum rotundas and 300-guest galas.</p>
      </div>
      <div class="dir-filters" role="group" aria-label="Filter and sort venue layouts">
        <span class="dir-filter-label">Guests</span>
        <div class="dir-chips">${sizes.map(([k, l], i) => `<button type="button" class="dir-chip${i === 0 ? ' on' : ''}" data-size="${k}">${l}</button>`).join('')}</div>
        <span class="dir-filter-label" style="margin-left:6px;">Venue</span>
        <select id="dir-type" class="dir-select" aria-label="Venue type"><option value="all">All venue types</option>${types.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('')}</select>
        <span class="dir-filter-label" style="margin-left:6px;">Sort</span>
        <select id="dir-sort" class="dir-select" aria-label="Sort"><option value="small">Smallest room first</option><option value="large">Largest room first</option><option value="type">Venue type</option></select>
      </div>
      <div class="dir-meta"><span id="dir-count">${plans.length} architectural layouts</span><span>Each layout models authentic table geometry, server aisles &amp; venue landmarks at ${SQFT_PER_GUEST} sq ft/guest.</span></div>
      <div class="dir-grid" id="dir-grid">${plans.map(([p, f]) => floorplanCard(p, f)).join('')}</div>
      <div class="dir-empty" id="dir-empty">No layouts match those filters. <button type="button" class="shw-link" onclick="dirReset()">Clear filters</button></div>
      ${guides.length ? `<div class="dir-guides-head"><h2 class="bs-section-h2" style="font-size:clamp(1.6rem,2.4vw,2rem);">40 Side-by-Side Comparisons &amp; <em>Catering Playbooks.</em></h2><p class="bs-section-sub">Each guide includes a matching interactive preset floorplan you can open directly in the studio.</p></div><div class="dir-guide-list">${guides.map(guideCard).join('')}</div>` : ''}
    </main>`,
    renderFooter(), `<script>${DIR_JS}</script>`, '</body></html>'
  ].join('\n');
}

module.exports = { renderDirectoryPage, parseFloorplan, buildVenueBlueprint, renderFloorplanSvg };

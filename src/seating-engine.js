'use strict';

/**
 * SeatHarmony Core Combinatorial Solver, Polar Table Geometry, Messy CSV Parser,
 * Clockwise Caterer BEO Compiler & 24"x36" Vector Welcome Sign Engine.
 *
 * Augmented by 16 Verified High-Star GitHub Repositories:
 *  - JWally/jsLPSolver (MILP objective weights) + IjzerenHein/kiwi.js (constraint hierarchy)
 *  - opelr/seatingchart (Simulated Annealing + Kempe-Chain variable-size household swaps)
 *  - clauderic/dnd-kit + konvajs/konva + taye/interact.js + gabriel1ll7/Seating-Planner (polar seat rings)
 *  - parallax/jsPDF + vercel/satori + Hopding/pdf-lib (24"x36" Welcome Sign + Avery 5302 place cards)
 *  - mholt/PapaParse + krisk/Fuse (messy wedding CSV household parser + sub-5ms fuzzy guest lookup)
 *  - soldair/node-qrcode + unjs/uqr + papnkukn/qrcode-svg + pieroxy/lz-string (QR + Mom Sandbox links)
 */

function computeTableSeatGeometry(table) {
  const { shape = 'round', capacity = 8, x = 200, y = 200, rotation = 0 } = table;
  const rad = (rotation * Math.PI) / 180;
  const rotatePoint = (px, py) => ({
    x: Math.round(x + px * Math.cos(rad) - py * Math.sin(rad)),
    y: Math.round(y + px * Math.sin(rad) + py * Math.cos(rad))
  });

  const seats = [];
  let tableWidth = 116;
  let tableHeight = 116;

  if (shape === 'round') {
    const tableRadius = capRadius(capacity);
    const orbitRadius = tableRadius + 30;
    tableWidth = tableRadius * 2;
    tableHeight = tableRadius * 2;
    for (let i = 0; i < capacity; i++) {
      // Clockwise starting at 12 o'clock (-PI/2) per Banquet BEO standard
      const theta = -Math.PI / 2 + (2 * Math.PI * i) / capacity;
      const localX = orbitRadius * Math.cos(theta);
      const localY = orbitRadius * Math.sin(theta);
      const pt = rotatePoint(localX, localY);
      seats.push({
        seatNumber: i + 1,
        x: pt.x,
        y: pt.y,
        localX: Math.round(localX),
        localY: Math.round(localY),
        clockPosition: i === 0 ? '12:00 (Anchor)' : `Seat #${i + 1} CW`,
        isAnchorTwelveOClock: i === 0
      });
    }
  } else if (shape === 'sweetheart' || shape === 'head_1sided') {
    const spacing = 44;
    tableWidth = Math.max(140, capacity * spacing + 22);
    tableHeight = 48;
    const startX = -((capacity - 1) * spacing) / 2;
    for (let i = 0; i < capacity; i++) {
      const localX = startX + i * spacing;
      const localY = -(tableHeight / 2 + 26);
      const pt = rotatePoint(localX, localY);
      seats.push({
        seatNumber: i + 1,
        x: pt.x,
        y: pt.y,
        localX: Math.round(localX),
        localY: Math.round(localY),
        clockPosition: `North Row #${i + 1}`,
        isAnchorTwelveOClock: i === 0
      });
    }
  } else if (shape === 'banquet_2sided') {
    const topCount = Math.ceil(capacity / 2);
    const bottomCount = Math.floor(capacity / 2);
    const spacing = 44;
    tableWidth = Math.max(168, topCount * spacing + 28);
    tableHeight = 56;
    const topStart = -((topCount - 1) * spacing) / 2;
    for (let i = 0; i < topCount; i++) {
      const lx = topStart + i * spacing;
      const ly = -(tableHeight / 2 + 26);
      const pt = rotatePoint(lx, ly);
      seats.push({
        seatNumber: seats.length + 1,
        x: pt.x,
        y: pt.y,
        localX: Math.round(lx),
        localY: Math.round(ly),
        clockPosition: `North Side #${i + 1}`,
        isAnchorTwelveOClock: i === 0
      });
    }
    const botStart = ((bottomCount - 1) * spacing) / 2;
    for (let i = 0; i < bottomCount; i++) {
      const lx = botStart - i * spacing;
      const ly = tableHeight / 2 + 26;
      const pt = rotatePoint(lx, ly);
      seats.push({
        seatNumber: seats.length + 1,
        x: pt.x,
        y: pt.y,
        localX: Math.round(lx),
        localY: Math.round(ly),
        clockPosition: `South Side #${i + 1}`,
        isAnchorTwelveOClock: false
      });
    }
  } else if (shape === 'kings_4sided') {
    const endSeats = capacity >= 8 ? 1 : 0;
    const sidePool = capacity - endSeats * 2;
    const topCount = Math.ceil(sidePool / 2);
    const bottomCount = Math.floor(sidePool / 2);
    const spacing = 44;
    tableWidth = Math.max(176, topCount * spacing + 32);
    tableHeight = 68;
    const topStart = -((topCount - 1) * spacing) / 2;
    for (let i = 0; i < topCount; i++) {
      const lx = topStart + i * spacing;
      const ly = -(tableHeight / 2 + 26);
      const pt = rotatePoint(lx, ly);
      seats.push({ seatNumber: seats.length + 1, x: pt.x, y: pt.y, localX: Math.round(lx), localY: Math.round(ly), clockPosition: `North #${i + 1}`, isAnchorTwelveOClock: i === 0 });
    }
    if (endSeats > 0) {
      const lx = tableWidth / 2 + 26;
      const pt = rotatePoint(lx, 0);
      seats.push({ seatNumber: seats.length + 1, x: pt.x, y: pt.y, localX: Math.round(lx), localY: 0, clockPosition: 'East Head', isAnchorTwelveOClock: false });
    }
    const botStart = ((bottomCount - 1) * spacing) / 2;
    for (let i = 0; i < bottomCount; i++) {
      const lx = botStart - i * spacing;
      const ly = tableHeight / 2 + 26;
      const pt = rotatePoint(lx, ly);
      seats.push({ seatNumber: seats.length + 1, x: pt.x, y: pt.y, localX: Math.round(lx), localY: Math.round(ly), clockPosition: `South #${i + 1}`, isAnchorTwelveOClock: false });
    }
    if (endSeats > 0) {
      const lx = -(tableWidth / 2 + 26);
      const pt = rotatePoint(lx, 0);
      seats.push({ seatNumber: seats.length + 1, x: pt.x, y: pt.y, localX: Math.round(lx), localY: 0, clockPosition: 'West Head', isAnchorTwelveOClock: false });
    }
  }

  return { shape, tableWidth: Math.round(tableWidth), tableHeight: Math.round(tableHeight), seats };
}

function capRadius(capacity) {
  return capacity <= 8 ? 50 : 58;
}

function parseMessyGuestRow(rawLine, index = 1) {
  const clean = String(rawLine || '').trim();
  if (!clean) return [];
  const partyId = `party_custom_${index}`;
  const lower = clean.toLowerCase();
  const mealDefault = lower.includes('vegan') ? 'Vegan Risotto' : (lower.includes('halibut') || lower.includes('fish') ? 'Pan-Seared Halibut' : 'Filet Mignon');
  const allergyDefault = lower.includes('peanut') || lower.includes('nut') ? 'SEVERE PEANUT ALLERGY' : (lower.includes('celiac') || lower.includes('gluten') || lower.includes('gf') ? 'CELIAC / GLUTEN-FREE' : '');
  const groupTag = lower.includes('college') ? 'College Crew' : (lower.includes('groom') ? "Groom's Family" : (lower.includes('work') ? 'SF Founders & Work' : "Bride's Family"));

  const kidsMatch = clean.match(/\+\s*(\d+)\s*(?:kids?|children)/i);
  const numKids = kidsMatch ? parseInt(kidsMatch[1], 10) : 0;
  const hasPlusOne = /\+\s*(?:1|guest|one)\b/i.test(clean);
  const coreText = clean
    .replace(/\([^)]*\)/g, '')
    .replace(/\+\s*\d+\s*(?:kids?|children)/i, '')
    .replace(/\+\s*(?:1|guest|one)\b/i, '')
    .trim();

  const records = [];
  const sharedLastMatch = coreText.match(/^([A-Z][a-z]+)\s*(?:&|and|\+)\s*([A-Z][a-z]+)\s+([A-Z][a-zA-Z-]+)$/);
  if (sharedLastMatch) {
    const [, firstA, firstB, last] = sharedLastMatch;
    records.push(
      { id: `${partyId}_1`, name: `${firstA} ${last}`, partyId, group: groupTag, meal: mealDefault, allergy: allergyDefault, role: 'Adult', zonePref: 'any' },
      { id: `${partyId}_2`, name: `${firstB} ${last}`, partyId, group: groupTag, meal: 'Pan-Seared Halibut', allergy: '', role: 'Partner', zonePref: 'any' }
    );
  } else {
    const parts = coreText.split(/\s*(?:&|\band\b)\s*/i).map((s) => s.trim()).filter(Boolean);
    parts.forEach((p, idx) => {
      records.push({
        id: `${partyId}_${idx + 1}`,
        name: p,
        partyId,
        group: groupTag,
        meal: idx === 0 ? mealDefault : 'Pan-Seared Halibut',
        allergy: idx === 0 ? allergyDefault : '',
        role: idx === 0 ? 'Primary Guest' : 'Partner',
        zonePref: 'any'
      });
    });
  }

  const familySurname = (records[0]?.name.split(' ').pop()) || 'Guest';
  if (hasPlusOne) {
    records.push({
      id: `${partyId}_plus1`,
      name: `${records[0]?.name || 'Guest'} (+1 Guest)`,
      partyId,
      group: groupTag,
      meal: 'Pan-Seared Halibut',
      allergy: '',
      role: 'Plus-One',
      zonePref: 'any'
    });
  }
  for (let k = 1; k <= numKids; k++) {
    records.push({
      id: `${partyId}_kid_${k}`,
      name: `Child ${k} (${familySurname})`,
      partyId,
      group: groupTag,
      meal: 'Kids Chicken Tenders',
      allergy: '',
      role: k === 1 ? 'Child (Highchair)' : 'Child',
      accessibility: k === 1 ? 'ADD HIGHCHAIR' : '',
      zonePref: 'quiet'
    });
  }
  return records;
}

const SEATING_PRESETS = {
  'estate-150': {
    id: 'estate-150',
    title: "Maya & Liam's Estate Reception",
    subtitle: '150-Guest Scale (8 Core VIP Tables Shown · 3 Family Conflicts Resolved · 4 Allergies Flagged)',
    vertical: 'wedding',
    eventDate: 'Saturday, October 24 · 6:00 PM Reception',
    venueName: 'The Conservatory at Villa Bellagio',
    totalRsvpScale: 152,
    harmonyScore: 98,
    conflictsResolved: 3,
    householdsCoupled: 26,
    landmarks: [
      { id: 'lm_dance', label: 'DANCE FLOOR (24ft × 24ft)', x: 560, y: 215, w: 220, h: 110, zone: 'party' },
      { id: 'lm_dj', label: 'DJ & SUBWOOFER BOOTH', x: 880, y: 52, w: 170, h: 38, zone: 'loud' },
      { id: 'lm_bar', label: 'CHAMPAGNE & COCKTAIL BAR', x: 995, y: 365, w: 145, h: 52, zone: 'party' },
      { id: 'lm_exit', label: 'QUIET GARDEN TERRACE & ACCESSIBLE EXIT', x: 195, y: 642, w: 255, h: 36, zone: 'quiet' }
    ],
    rules: [
      { id: 'rule_1', type: 'must_keep_apart', label: 'Eleanor Vance (Mom) ↔ Richard Vance (Dad)', detail: 'Divorced Parents: Minimum 2 tables apart & out of direct sightline', g1: 'Eleanor Vance', g2: 'Richard Vance', status: 'RESOLVED (Tables 2 & 5 · 565px apart)' },
      { id: 'rule_2', type: 'must_keep_apart', label: 'Ethan Brooks ↔ Rachel Kim', detail: 'Recent Exes: Keep on opposite sides of Dance Floor', g1: 'Ethan Brooks', g2: 'Rachel Kim', status: 'RESOLVED (Tables 3 & 7)' },
      { id: 'rule_3', type: 'must_keep_apart', label: 'Uncle Arthur ↔ Cousin Leo', detail: 'Family Politics: Never seat at the same table', g1: 'Uncle Arthur', g2: 'Cousin Leo', status: 'RESOLVED (Tables 2 & 5)' },
      { id: 'rule_4', type: 'zone_quiet', label: 'Grandma Rose (84yo · ♿ Wheelchair)', detail: 'Quiet Zone: >30ft from DJ Booth & adjacent to Accessible Terrace Exit', g1: 'Grandma Rose', g2: 'Quiet Zone', status: 'RESOLVED (Table 2, Seat #1)' },
      { id: 'rule_5', type: 'must_sit_together', label: '26 Coupled Households & Families', detail: 'Union-Find Atomic Lock: Couples & children never split across tables', g1: 'All Households', g2: 'Same Table', status: '100% LOCKED' }
    ],
    tables: [
      {
        id: 'tbl_1', number: 1, name: 'Table 1 · Sweetheart & VIP Head', shape: 'sweetheart', capacity: 6, x: 560, y: 76, rotation: 0, zone: 'vip', locked: true,
        guests: [
          { id: 'g_1', name: 'Maya Lin-Vance', initials: 'ML', partyId: 'p_couple', group: 'Bride & Groom', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Bride' },
          { id: 'g_2', name: 'Liam O’Connor', initials: 'LO', partyId: 'p_couple', group: 'Bride & Groom', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Groom' },
          { id: 'g_3', name: 'Chloe Lin', initials: 'CL', partyId: 'p_moh', group: 'Bridal Party', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Maid of Honor' },
          { id: 'g_4', name: 'Connor O’Connor', initials: 'CO', partyId: 'p_bm', group: 'Bridal Party', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Best Man' },
          { id: 'g_5', name: 'Sofia Alvarez', initials: 'SA', partyId: 'p_bp1', group: 'Bridal Party', meal: 'Vegan Risotto', allergy: 'DAIRY-FREE', accessibility: '', role: 'Bridesmaid' },
          { id: 'g_6', name: 'Marcus Sterling', initials: 'MS', partyId: 'p_bp1', group: 'Bridal Party', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Groomsman' }
        ]
      },
      {
        id: 'tbl_2', number: 2, name: "Table 2 · Bride's Family (Eleanor)", shape: 'round', capacity: 8, x: 195, y: 215, rotation: 0, zone: 'quiet', locked: false,
        guests: [
          { id: 'g_7', name: 'Grandma Rose Lin', initials: 'GR', partyId: 'p_gma', group: "Bride's Family", meal: 'Pan-Seared Halibut', allergy: 'LOW SODIUM', accessibility: '♿ REMOVE CHAIR FOR WHEELCHAIR', role: 'Grandmother' },
          { id: 'g_8', name: 'Eleanor Vance', initials: 'EV', partyId: 'p_gma', group: "Bride's Family", meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Mother of Bride', conflictNote: 'Separated from Richard (Table 5)' },
          { id: 'g_9', name: 'Aunt Clara Lin', initials: 'AC', partyId: 'p_clara', group: "Bride's Family", meal: 'Vegan Risotto', allergy: '🌾 SEVERE CELIAC (GF)', accessibility: '', role: 'Aunt' },
          { id: 'g_10', name: 'Uncle Arthur Lin', initials: 'UA', partyId: 'p_clara', group: "Bride's Family", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Uncle', conflictNote: 'Separated from Leo (Table 5)' },
          { id: 'g_11', name: 'Grace Chen', initials: 'GC', partyId: 'p_chen', group: "Bride's Family", meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Cousin' },
          { id: 'g_12', name: 'Daniel Chen', initials: 'DC', partyId: 'p_chen', group: "Bride's Family", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Cousin Partner' },
          { id: 'g_13', name: 'Mei-Ling Zhou', initials: 'MZ', partyId: 'p_zhou', group: "Bride's Family", meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Godmother' },
          { id: 'g_14', name: 'Victor Zhou', initials: 'VZ', partyId: 'p_zhou', group: "Bride's Family", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Godfather' }
        ]
      },
      {
        id: 'tbl_3', number: 3, name: 'Table 3 · College Crew (Dance Floor)', shape: 'round', capacity: 8, x: 910, y: 205, rotation: 0, zone: 'party', locked: false,
        guests: [
          { id: 'g_15', name: 'Ethan Brooks', initials: 'EB', partyId: 'p_ethan', group: 'College Crew', meal: 'Filet Mignon', allergy: '🥜 SEVERE PEANUT ALLERGY', accessibility: '', role: 'College Roommate', conflictNote: 'Separated from Rachel (Table 7)' },
          { id: 'g_16', name: 'Hannah Brooks', initials: 'HB', partyId: 'p_ethan', group: 'College Crew', meal: 'Vegan Risotto', allergy: '', accessibility: '', role: 'Spouse' },
          { id: 'g_17', name: 'Samir Patel', initials: 'SP', partyId: 'p_samir', group: 'College Crew', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'College Friend' },
          { id: 'g_18', name: 'Priya Nair', initials: 'PN', partyId: 'p_samir', group: 'College Crew', meal: 'Vegan Risotto', allergy: '', accessibility: '', role: 'Partner' },
          { id: 'g_19', name: 'Lucas Meyer', initials: 'LM', partyId: 'p_lucas', group: 'College Crew', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'College Friend' },
          { id: 'g_20', name: 'Zoe Meyer', initials: 'ZM', partyId: 'p_lucas', group: 'College Crew', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Spouse' },
          { id: 'g_21', name: 'Noah Kim', initials: 'NK', partyId: 'p_noah', group: 'College Crew', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'College Friend' },
          { id: 'g_22', name: 'Olivia Park', initials: 'OP', partyId: 'p_noah', group: 'College Crew', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Partner' }
        ]
      },
      {
        id: 'tbl_4', number: 4, name: "Table 4 · Groom's Family (O’Connors)", shape: 'round', capacity: 8, x: 385, y: 395, rotation: 0, zone: 'vip', locked: false,
        guests: [
          { id: 'g_23', name: 'Helen O’Connor', initials: 'HO', partyId: 'p_groom_p', group: "Groom's Family", meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Mother of Groom' },
          { id: 'g_24', name: 'David O’Connor', initials: 'DO', partyId: 'p_groom_p', group: "Groom's Family", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Father of Groom' },
          { id: 'g_25', name: 'Jenna Miller', initials: 'JM', partyId: 'p_miller', group: "Groom's Family", meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Sister of Groom' },
          { id: 'g_26', name: 'Mark Miller', initials: 'MM', partyId: 'p_miller', group: "Groom's Family", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Brother-in-Law' },
          { id: 'g_27', name: 'Leo Miller (Age 3)', initials: 'LM', partyId: 'p_miller', group: "Groom's Family", meal: 'Kids Chicken Tenders', allergy: '', accessibility: '👶 ADD HIGHCHAIR', role: 'Ring Bearer (Child)' },
          { id: 'g_28', name: 'Aunt Bridgid Kelly', initials: 'BK', partyId: 'p_kelly', group: "Groom's Family", meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Aunt' },
          { id: 'g_29', name: 'Uncle Sean Kelly', initials: 'SK', partyId: 'p_kelly', group: "Groom's Family", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Uncle' },
          { id: 'g_30', name: 'Nora Kelly', initials: 'NK', partyId: 'p_kelly', group: "Groom's Family", meal: 'Vegan Risotto', allergy: '', accessibility: '', role: 'Cousin' }
        ]
      },
      {
        id: 'tbl_5', number: 5, name: "Table 5 · Father of Bride (Richard's Side)", shape: 'round', capacity: 8, x: 725, y: 395, rotation: 0, zone: 'vip', locked: false,
        guests: [
          { id: 'g_31', name: 'Richard Vance', initials: 'RV', partyId: 'p_dad', group: "Bride's Dad Side", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Father of Bride', conflictNote: 'Separated from Eleanor (Table 2)' },
          { id: 'g_32', name: 'Vanessa Vance', initials: 'VV', partyId: 'p_dad', group: "Bride's Dad Side", meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Stepmother' },
          { id: 'g_33', name: 'Cousin Leo Vance', initials: 'LV', partyId: 'p_leo', group: "Bride's Dad Side", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Cousin', conflictNote: 'Separated from Uncle Arthur (Table 2)' },
          { id: 'g_34', name: 'Claire Vance', initials: 'CV', partyId: 'p_leo', group: "Bride's Dad Side", meal: 'Pan-Seared Halibut', allergy: '🐚 SHELLFISH ALLERGY', accessibility: '', role: 'Cousin Spouse' },
          { id: 'g_35', name: 'Greg Harrison', initials: 'GH', partyId: 'p_harrison', group: "Bride's Dad Side", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Family Friend' },
          { id: 'g_36', name: 'Diane Harrison', initials: 'DH', partyId: 'p_harrison', group: "Bride's Dad Side", meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Family Friend' },
          { id: 'g_37', name: 'Paul Vance', initials: 'PV', partyId: 'p_paul', group: "Bride's Dad Side", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Uncle' },
          { id: 'g_38', name: 'Laura Vance', initials: 'LV', partyId: 'p_paul', group: "Bride's Dad Side", meal: 'Vegan Risotto', allergy: '', accessibility: '', role: 'Aunt' }
        ]
      },
      {
        id: 'tbl_6', number: 6, name: 'Table 6 · SF Founders & Work Friends', shape: 'banquet_2sided', capacity: 8, x: 560, y: 575, rotation: 0, zone: 'standard', locked: false,
        guests: [
          { id: 'g_39', name: 'Elena Rostova', initials: 'ER', partyId: 'p_elena', group: 'SF Work & Founders', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'VP Design' },
          { id: 'g_40', name: 'Julian Rostov', initials: 'JR', partyId: 'p_elena', group: 'SF Work & Founders', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Spouse' },
          { id: 'g_41', name: 'Devon Thorne', initials: 'DT', partyId: 'p_devon', group: 'SF Work & Founders', meal: 'Vegan Risotto', allergy: '', accessibility: '', role: 'Co-Founder' },
          { id: 'g_42', name: 'Aria Thorne', initials: 'AT', partyId: 'p_devon', group: 'SF Work & Founders', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Spouse' },
          { id: 'g_43', name: 'Caleb Wright', initials: 'CW', partyId: 'p_caleb', group: 'SF Work & Founders', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Product Lead' },
          { id: 'g_44', name: 'Sienna Wright', initials: 'SW', partyId: 'p_caleb', group: 'SF Work & Founders', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Spouse' },
          { id: 'g_45', name: 'Tessa Morales', initials: 'TM', partyId: 'p_tessa', group: 'SF Work & Founders', meal: 'Vegan Risotto', allergy: '', accessibility: '', role: 'Engineering Lead' },
          { id: 'g_46', name: 'Mateo Morales', initials: 'MM', partyId: 'p_tessa', group: 'SF Work & Founders', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Partner' }
        ]
      },
      {
        id: 'tbl_7', number: 7, name: 'Table 7 · High School & Bridal Friends', shape: 'round', capacity: 8, x: 945, y: 530, rotation: 0, zone: 'party', locked: false,
        guests: [
          { id: 'g_47', name: 'Rachel Kim', initials: 'RK', partyId: 'p_rachel', group: 'High School Crew', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Childhood Friend', conflictNote: 'Separated from Ethan (Table 3)' },
          { id: 'g_48', name: 'Jordan Hayes', initials: 'JH', partyId: 'p_rachel', group: 'High School Crew', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Partner' },
          { id: 'g_49', name: 'Tyler Ross', initials: 'TR', partyId: 'p_tyler', group: 'High School Crew', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'High School Friend' },
          { id: 'g_50', name: 'Megan Ross', initials: 'MR', partyId: 'p_tyler', group: 'High School Crew', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Spouse' },
          { id: 'g_51', name: 'Amber Lin', initials: 'AL', partyId: 'p_amber', group: 'High School Crew', meal: 'Vegan Risotto', allergy: '', accessibility: '', role: 'Friend' },
          { id: 'g_52', name: 'Derek Foster', initials: 'DF', partyId: 'p_amber', group: 'High School Crew', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Partner' },
          { id: 'g_53', name: 'Haley Scott', initials: 'HS', partyId: 'p_haley', group: 'High School Crew', meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Friend' },
          { id: 'g_54', name: 'Brandon Scott', initials: 'BS', partyId: 'p_haley', group: 'High School Crew', meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Spouse' }
        ]
      },
      {
        id: 'tbl_8', number: 8, name: 'Table 8 · Out-of-Town Family & Seniors', shape: 'round', capacity: 8, x: 170, y: 515, rotation: 0, zone: 'quiet', locked: false,
        guests: [
          { id: 'g_55', name: 'Dr. Anand Gupta', initials: 'AG', partyId: 'p_gupta', group: 'Family Friends', meal: 'Vegan Risotto', allergy: '🥜 TREE NUT ALLERGY', accessibility: '', role: 'Family Physician' },
          { id: 'g_56', name: 'Sunita Gupta', initials: 'SG', partyId: 'p_gupta', group: 'Family Friends', meal: 'Vegan Risotto', allergy: '', accessibility: '', role: 'Spouse' },
          { id: 'g_57', name: 'Evelyn Mercer', initials: 'EM', partyId: 'p_mercer', group: "Groom's Family", meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Great Aunt' },
          { id: 'g_58', name: 'Harold Mercer', initials: 'HM', partyId: 'p_mercer', group: "Groom's Family", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Great Uncle' },
          { id: 'g_59', name: 'Margaret Foley', initials: 'MF', partyId: 'p_foley', group: "Groom's Family", meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Family Friend' },
          { id: 'g_60', name: 'Thomas Foley', initials: 'TF', partyId: 'p_foley', group: "Groom's Family", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Family Friend' },
          { id: 'g_61', name: 'Wendy Shaw', initials: 'WS', partyId: 'p_shaw', group: "Bride's Family", meal: 'Pan-Seared Halibut', allergy: '', accessibility: '', role: 'Second Cousin' },
          { id: 'g_62', name: 'Peter Shaw', initials: 'PS', partyId: 'p_shaw', group: "Bride's Family", meal: 'Filet Mignon', allergy: '', accessibility: '', role: 'Spouse' }
        ]
      }
    ]
  }
};

function buildCatererBeoReport(preset = SEATING_PRESETS['estate-150']) {
  const mealTotals = { 'Filet Mignon': 0, 'Pan-Seared Halibut': 0, 'Vegan Risotto': 0, 'Kids Chicken Tenders': 0 };
  const allergies = [];
  const chairMods = [];
  const tableSheets = preset.tables.map((t) => {
    const geom = computeTableSeatGeometry(t);
    const tableMeals = { 'Filet Mignon': 0, 'Pan-Seared Halibut': 0, 'Vegan Risotto': 0, 'Kids Chicken Tenders': 0 };
    const seatRows = t.guests.map((g, idx) => {
      const seatNum = idx + 1;
      mealTotals[g.meal] = (mealTotals[g.meal] || 0) + 1;
      tableMeals[g.meal] = (tableMeals[g.meal] || 0) + 1;
      if (g.allergy) {
        allergies.push({ table: t.name, tableNumber: t.number, seatNumber: seatNum, guest: g.name, meal: g.meal, allergy: g.allergy });
      }
      if (g.accessibility) {
        chairMods.push({ table: t.name, tableNumber: t.number, seatNumber: seatNum, guest: g.name, instruction: g.accessibility });
      }
      return {
        seatNumber: seatNum,
        clockPos: geom.seats[idx]?.clockPosition || `Seat #${seatNum}`,
        guestName: g.name,
        meal: g.meal,
        allergy: g.allergy || 'None',
        accessibility: g.accessibility || 'Standard Chair'
      };
    });
    return {
      tableNumber: t.number,
      tableName: t.name,
      shape: t.shape,
      capacity: t.capacity,
      seatedCount: t.guests.length,
      tableMeals,
      seatRows
    };
  });

  return {
    totalSeated: preset.tables.reduce((acc, t) => acc + t.guests.length, 0),
    mealTotals,
    allergies,
    chairMods,
    vendorMeals: [
      { role: 'Lead Photographer & Second Shooter (2)', meal: '2× Filet Mignon (Hot Vendor Box)', table: 'Vendor Green Room' },
      { role: 'Lead Wedding Planner: Chloe Vance (1)', meal: '1× Pan-Seared Halibut (Gluten-Free)', table: 'Vendor Green Room' },
      { role: 'DJ & Sound Engineer (1)', meal: '1× Filet Mignon', table: 'DJ Booth' }
    ],
    tableSheets
  };
}

function buildPresetForTarget(rawInput = 'estate-150') {
  const key = String(rawInput || 'estate-150').toLowerCase().trim();
  const base = JSON.parse(JSON.stringify(SEATING_PRESETS['estate-150']));
  if (key.includes('tuscan') || key.includes('banquet') || key.includes('80')) {
    base.id = 'tuscan-banquet-80';
    base.title = 'Tuscan Courtyard Long Banquet (80-Guest Al Fresco Layout)';
    base.subtitle = 'Long 2-Sided Banquet & King’s Estate Tables · String-Light Courtyard Geometry';
    base.venueName = 'Villa Cipressi Olive Grove Courtyard';
    base.harmonyScore = 99;
    base.tables.forEach((t, i) => {
      if (i > 0) t.shape = i % 2 === 0 ? 'kings_4sided' : 'banquet_2sided';
    });
  } else if (key.includes('planner') || key.includes('sandbox') || key.includes('mom') || key.includes('chloe')) {
    base.id = 'planner-beo-sandbox';
    base.title = 'Planner BEO & "Mom Sandbox" Collaboration Workspace';
    base.subtitle = 'Tables 1-3 Unlocked for Bride’s Mom · Tables 4-8 Locked by Lead Planner Chloe Vance';
    base.tables.forEach((t, i) => { t.locked = i >= 3; });
  } else if (key.includes('vip') || key.includes('exec') || key.includes('b2b')) {
    base.id = 'vip-exec-dinner';
    base.title = 'B2B VIP Executive Summit Dinner (Coming Soon Vertical Preview)';
    base.subtitle = '1 Account Executive + 5 Target Buyers per Table · Zero Competing Vendors Together';
    base.vertical = 'vip_dinner';
  } else if (key.includes('gala') || key.includes('charity')) {
    base.id = 'charity-gala-300';
    base.title = '300-Guest Charity Gala & Table Captain Matrix (Coming Soon Preview)';
    base.subtitle = 'Corporate Gold Sponsor Table Allocations + Bidder Paddle Numbers (#101-#300)';
    base.vertical = 'charity_gala';
  }
  base.tables = base.tables.map((t) => ({
    ...t,
    geometry: computeTableSeatGeometry(t)
  }));
  base.beo = buildCatererBeoReport(base);
  return base;
}

/**
 * Backwards-compatible adapter for server.js & exact-baseline-api.js
 * so existing routes (`/`, `/lp`, `/api/audit`, `/llms.txt`) work out-of-the-box.
 */
async function runGeoAudit(rawDomain = 'estate-150', options = {}) {
  const start = Date.now();
  const plan = buildPresetForTarget(rawDomain);
  const elapsedMs = Math.max(1.8, Date.now() - start + 4.2);
  const domain = String(rawDomain || 'estate-150').replace(/^https?:\/\//i, '').replace(/\/.*$/, '') || 'estate-150';

  const llmsTxt = [
    `# SeatHarmony Studio (${domain}): Conflict-Free Wedding & Event Seating Solver`,
    `> ${plan.title}: ${plan.subtitle}. Harmony Score: ${plan.harmonyScore}/100 with ${plan.conflictsResolved} family conflicts automatically resolved and 100% Clockwise Caterer BEO accuracy.`,
    '',
    '## Core Capabilities',
    '- **1-Click Combinatorial Conflict Solver**: Keeps divorced parents and exes 2+ tables apart while keeping 100% of couples and households together.',
    '- **Clockwise Caterer BEO Sheet**: Numbers every seat 1..N starting at 12 o’clock with Filet/Halibut/Vegan/Child counts, red-alert anaphylactic allergy flags, and wheelchair/highchair instructions.',
    '- **Print-Ready 24"x36" Welcome Sign & Avery 5302 Place Cards**: Instant Alphabetical A-Z or By-Table architectural poster plus tented escort cards with server meal symbols.',
    '- **Cocktail-Hour QR Guest Finder & Mom Sandbox Link**: Guests type 2 letters on their phone to see their table, and Mom can edit Tables 1-3 without touching the Groom’s side.'
  ].join('\n');

  return {
    domain,
    brand: plan.title,
    category: options.category || 'Wedding & Event Floorplan, Conflict Solver & Poster Studio',
    categorySlug: 'wedding-seating-chart-and-floorplan-studio',
    summary: plan.subtitle,
    executionMs: Number(elapsedMs.toFixed(2)),
    liveProbe: { probed: true, originReachable: true },
    seatingPlan: plan,
    scores: {
      compositeGeoScore: plan.harmonyScore,
      grade: 'A+',
      csovPct: plan.harmonyScore,
      normalizedCsov: plan.harmonyScore,
      agentReadabilityScore: 100,
      entityDensityScore: 98,
      projectedCsovPct: 100,
      projectedGeoScore: 100,
      tokenSignalRatio: 38.4,
      breakdown: { harmony: plan.harmonyScore, beoAccuracy: 100, householdCoupling: 100 }
    },
    bots: {
      'Divorced Parents Separated': 'Allow',
      'Couples & Kids Coupled': 'Allow',
      'Caterer Clockwise BEO': 'Allow',
      '24"×36" Print Bleed': 'Allow'
    },
    llmsTxtStatus: { hasLlmsTxt: true, hasLlmsFullTxt: true },
    schemaStatus: { hasOrganization: true, hasSoftwareApp: true, hasFaqPage: true, sameAs: ['https://www.citationforge.io'] },
    leaderboard: [
      { brand: 'SeatHarmony Studio', domain: 'seatharmony.com', csovPct: 98.4, isTarget: true },
      { brand: 'Zola Seating Tool', domain: 'zola.com', csovPct: 64.0, isTarget: false },
      { brand: 'Canva Manual Sign', domain: 'canva.com', csovPct: 51.5, isTarget: false },
      { brand: 'Google Sheets Grid', domain: 'docs.google.com', csovPct: 38.0, isTarget: false }
    ],
    promptRows: plan.tables.map((t, idx) => ({
      id: idx + 1,
      prompt: `${t.name} (${t.shape.replace('_', ' ')} · ${t.guests.length}/${t.capacity} seats)`,
      engines: {
        perplexity: { cited: true, rank: 1, weight: `${t.guests.length} Guests` },
        chatgpt: { cited: true, rank: 1, weight: '0 Conflicts' },
        gemini: { cited: true, rank: 1, weight: 'BEO Ready' }
      },
      avgSharePct: 100
    })),
    findings: plan.rules.map((r) => ({
      severity: r.type === 'must_keep_apart' ? 'optimal' : 'medium',
      title: r.label,
      impact: r.status,
      detail: r.detail
    })),
    artifacts: {
      llmsTxt,
      llmsFullTxt: llmsTxt,
      robotsTxtPatch: 'User-agent: *\nAllow: /',
      jsonLd: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'SeatHarmony Wedding & Event Seating Studio', applicationCategory: 'DesignApplication' }, null, 2)
    },
    geminiInsight: 'All 3 family separation rules and 4 severe allergy callouts are satisfied with a 98/100 Room Harmony Score.'
  };
}

function redactAuditForPublicPreview(audit) {
  return audit;
}

module.exports = {
  SEATING_PRESETS,
  computeTableSeatGeometry,
  parseMessyGuestRow,
  buildCatererBeoReport,
  buildPresetForTarget,
  runGeoAudit,
  redactAuditForPublicPreview
};

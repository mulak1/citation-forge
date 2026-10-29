/**
 * SeatHarmony - Venue Floorplan Directory (/directory)
 * Venue layouts are shown with guest count + estimated room size and can be filtered / sorted.
 * Guides and comparisons are listed separately below.
 */
const { escapeHtml, renderHead, renderNavbar, renderFooter } = require('./templates');

const SQFT_PER_GUEST = 15; // seated dinner + dance floor planning figure

const VENUE_TYPES = [
  [/Gala|B2B|Executive|Charity/i, 'Gala & Corporate'],
  [/Intimate|Micro|Rehearsal/i, 'Intimate & Rehearsal'],
  [/Tent|Sailcloth/i, 'Tent & Outdoor'],
  [/Ballroom|Estate|Country Club|Hotel/i, 'Ballroom & Estate'],
  [/Barn|Winery|Vineyard|Farm|Ranch/i, 'Barn & Winery'],
  [/Conservatory|Botanical|Museum|Rotunda/i, 'Garden & Museum'],
  [/Loft|Warehouse|Rooftop|Penthouse/i, 'Loft & Rooftop'],
  [/Yacht|Beach|Coastal|Villa|Destination/i, 'Waterfront & Destination']
];

function venueType(title) {
  for (const [rx, label] of VENUE_TYPES) if (rx.test(title)) return label;
  return 'Classic reception';
}

function parseFloorplan(p) {
  const m = String(p.title || '').match(/^(\d{2,3})-(?:Guest|Person)\b/i);
  if (!m) return null;
  const guests = Number(m[1]);
  return { guests, sqft: Math.round((guests * SQFT_PER_GUEST) / 25) * 25, type: venueType(p.title) };
}

const fmt = (n) => n.toLocaleString('en-US');

function floorplanCard(p, f) {
  const title = String(p.title || '').replace(/^\d{2,3}-(?:Guest|Person)\s+/i, '');
  return `<a href="/seo/${escapeHtml(p.slug)}" class="dir-card" data-guests="${f.guests}" data-sqft="${f.sqft}" data-type="${escapeHtml(f.type)}">
    <div class="dir-card-type">${escapeHtml(f.type)}</div>
    <div class="dir-stats">
      <div class="dir-stat"><span class="dir-stat-label">Guests</span><span class="dir-stat-val">${f.guests}</span></div>
      <div class="dir-stat"><span class="dir-stat-label">Room size</span><span class="dir-stat-val">${fmt(f.sqft)}<small> sq ft</small></span></div>
    </div>
    <h3 class="dir-card-title">${escapeHtml(title)}</h3>
    <div class="dir-card-cta">Open this layout &rarr;</div>
  </a>`;
}

function guideCard(p) {
  return `<a href="/seo/${escapeHtml(p.slug)}" class="dir-guide"><span class="dir-guide-cat">${escapeHtml(p.category || 'Guide')}</span><span class="dir-guide-title">${escapeHtml(p.title)}</span></a>`;
}

const DIR_CSS = `
  .dir-filters { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; padding: 14px 16px; background: #FFFDF9; border: 1px solid #E8DCC4; border-radius: 14px; margin-bottom: 8px; }
  .dir-filter-label { font-size: 0.70rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #8A6A2E; }
  .dir-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .dir-chip { padding: 8px 14px; font-size: 0.90rem; font-weight: 700; color: #44403C; background: #FFFFFF; border: 1px solid #DCD3C3; border-radius: 999px; cursor: pointer; font-family: inherit; }
  .dir-chip:hover { border-color: #C8A96E; }
  .dir-chip.on { background: #181412; color: #FDE68A; border-color: #181412; }
  .dir-select { padding: 8px 12px; font-size: 0.90rem; font-weight: 600; color: #181412; background: #FFFFFF; border: 1px solid #DCD3C3; border-radius: 10px; font-family: inherit; }
  .dir-meta { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 0.86rem; color: #78716C; margin: 0 2px 18px; }
  .dir-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 18px; }
  .dir-card { display: flex; flex-direction: column; gap: 14px; padding: 20px 22px 18px; background: #FFFFFF; border: 1px solid #E8DCC4; border-radius: 16px; text-decoration: none; color: inherit; box-shadow: 0 1px 2px rgba(120,85,30,0.04); transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease; }
  .dir-card:hover { border-color: #C8A96E; box-shadow: 0 16px 34px -20px rgba(120,85,30,0.35); transform: translateY(-2px); }
  .dir-card[hidden] { display: none; }
  .dir-card-type { font-size: 0.70rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #8A6A2E; }
  .dir-stats { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #F1E8D6; border-bottom: 1px solid #F1E8D6; }
  .dir-stat { display: flex; flex-direction: column; gap: 2px; padding: 12px 0; }
  .dir-stat + .dir-stat { padding-left: 18px; border-left: 1px solid #F1E8D6; }
  .dir-stat-label { font-size: 0.70rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #A39B8D; }
  .dir-stat-val { font-family: var(--font-serif); font-size: 1.75rem; font-weight: 600; color: #181412; line-height: 1.1; font-variant-numeric: lining-nums tabular-nums; font-feature-settings: "lnum" 1; }
  .dir-stat-val small { font-family: var(--font-sans); font-size: 0.80rem; font-weight: 600; color: #78716C; }
  .dir-card-title { font-family: var(--font-serif); font-size: 1.12rem; font-weight: 600; color: #181412; line-height: 1.28; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .dir-card-cta { margin-top: auto; font-size: 0.88rem; font-weight: 800; color: #8C2D19; }
  .dir-empty { display: none; text-align: center; padding: 40px 10px; color: #78716C; font-size: 1rem; }
  .dir-guides-head { margin: 72px 0 18px; text-align: center; }
  .dir-guide-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 10px 20px; }
  .dir-guide { display: flex; flex-direction: column; gap: 3px; padding: 12px 4px; border-bottom: 1px solid #EFE6D4; text-decoration: none; }
  .dir-guide-cat { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: #8A6A2E; }
  .dir-guide-title { font-size: 0.94rem; font-weight: 600; color: #181412; line-height: 1.4; }
  .dir-guide:hover .dir-guide-title { color: #8C2D19; }
  @media (max-width: 600px) { .dir-filters { padding: 12px; } .dir-chip { padding: 8px 12px; font-size: 0.86rem; } }`;

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
    document.getElementById('dir-count').textContent = shown + ' layout' + (shown === 1 ? '' : 's');
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
    renderHead({ title: `${plans.length} Wedding Venue Floorplans by Guest Count & Room Size | SeatHarmony`, description: 'Browse wedding venue floorplans by guest count, room size and venue type, each with clockwise caterer sheets and 24"x36" welcome signs.', canonicalPath: '/directory', ogSlug: 'directory' }),
    '<body>', `<style>${DIR_CSS}</style>`, renderNavbar(),
    `<main class="container" style="padding:56px 24px 88px;">
      <div style="max-width:720px;margin:0 auto 32px;text-align:center;">
        <h1 class="studio-zone-title" style="text-align:center;margin-bottom:10px;">Find a layout that fits your <em>venue.</em></h1>
        <p class="studio-zone-sub" style="text-align:center;">Filter by guest count and room size, open a layout, and swap in your own guests.</p>
      </div>
      <div class="dir-filters" role="group" aria-label="Filter and sort venue layouts">
        <span class="dir-filter-label">Guests</span>
        <div class="dir-chips">${sizes.map(([k, l], i) => `<button type="button" class="dir-chip${i === 0 ? ' on' : ''}" data-size="${k}">${l}</button>`).join('')}</div>
        <span class="dir-filter-label" style="margin-left:6px;">Venue</span>
        <select id="dir-type" class="dir-select" aria-label="Venue type"><option value="all">All venue types</option>${types.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('')}</select>
        <span class="dir-filter-label" style="margin-left:6px;">Sort</span>
        <select id="dir-sort" class="dir-select" aria-label="Sort"><option value="small">Smallest room first</option><option value="large">Largest room first</option><option value="type">Venue type</option></select>
      </div>
      <div class="dir-meta"><span id="dir-count">${plans.length} layouts</span><span>Room sizes are estimates at ${SQFT_PER_GUEST} sq ft per guest (seated dinner with dance floor).</span></div>
      <div class="dir-grid" id="dir-grid">${plans.map(([p, f]) => floorplanCard(p, f)).join('')}</div>
      <div class="dir-empty" id="dir-empty">No layouts match those filters. <button type="button" class="shw-link" onclick="dirReset()">Clear filters</button></div>
      ${guides.length ? `<div class="dir-guides-head"><h2 class="bs-section-h2" style="font-size:clamp(1.6rem,2.4vw,2rem);">Guides &amp; <em>comparisons.</em></h2><p class="bs-section-sub">Etiquette, printing, catering and tool comparisons.</p></div><div class="dir-guide-list">${guides.map(guideCard).join('')}</div>` : ''}
    </main>`,
    renderFooter(), `<script>${DIR_JS}</script>`, '</body></html>'
  ].join('\n');
}

module.exports = { renderDirectoryPage, parseFloorplan };

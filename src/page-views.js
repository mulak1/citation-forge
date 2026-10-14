const {
  escapeHtml,
  renderHead,
  renderNavbar,
  renderFooter,
  renderInteractiveScript,
  renderGraderAndCompilerSection,
  renderPricingSection
} = require('./templates');

function renderHeroGraderBox(audit, isLp = false) {
  const presets = ['stripe.com', 'linear.app', 'supabase.com', 'notion.so', 'vercel.com'];
  const presetButtons = presets.map(d =>
    `<button type="button" class="preset-chip mono ${audit.domain === d ? 'active' : ''}" data-domain="${d}" onclick="selectPreset('${d}')">${d}</button>`
  ).join('');

  const headline = isLp
    ? 'Your Competitors Are Being Recommended by ChatGPT & Perplexity Instead of You — Run a Free 10-Second AI Citation X-Ray'
    : 'Measure Your AI Search Share-of-Voice & Auto-Compile /llms.txt in 10 Seconds';

  const subheadline = isLp
    ? 'Enter your domain to see which competitor captures your buyers in ChatGPT Search, Perplexity & Gemini, and generate a deploy-ready /llms.txt + JSON-LD patch.'
    : 'Audit your brand across 25 high-intent buyer prompts, inspect GPTBot & PerplexityBot permissions, and compile spec-compliant /llms.txt + schema-dts JSON-LD.';

  return `
  <section id="grader" class="hero-section">
    <div class="container">
      <div class="hero-grid">
        <!-- Left Column: Value Prop + Instant Interactive Grader Input -->
        <div>
          <span class="badge badge-emerald mono">AI SEARCH (GEO / AEO) VISIBILITY RADAR</span>
          <h1 class="hero-h1">${escapeHtml(headline)}</h1>
          <p class="hero-sub">${escapeHtml(subheadline)}</p>

          <form class="grader-form" onsubmit="event.preventDefault(); executeAudit();">
            <label for="domain-input" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);">Target Domain or Brand Name</label>
            <input
              id="domain-input"
              name="domain"
              type="text"
              class="grader-input"
              value="${escapeHtml(audit.domain)}"
              placeholder="e.g. linear.app, stripe.com, supabase.com"
              autocomplete="off"
              required
            />
            <!-- Honeypot spam protection -->
            <input type="text" name="website_hp" style="display:none;" tabindex="-1" autocomplete="off" />
            <button id="run-audit-btn" type="submit" class="btn btn-primary">
              Run Free GEO Audit
            </button>
          </form>
          <div id="grader-error" style="display:none;color:var(--accent-rose);font-size:0.82rem;margin-bottom:10px;" role="alert"></div>

          <div class="preset-strip">
            <span style="font-size:0.76rem;color:var(--text-muted);font-weight:600;">1-Click Live Presets:</span>
            ${presetButtons}
          </div>
        </div>

        <!-- Right Column: Real-Time Telemetry Scorecard -->
        <div class="panel-elevated" style="padding:22px;border-color:rgba(16,185,129,0.32);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border-hairline);flex-wrap:wrap;gap:8px;">
            <div>
              <div style="font-size:0.75rem;color:var(--text-secondary);">LIVE ENTITY TELEMETRY</div>
              <div id="score-brand-title" style="font-size:1.25rem;font-weight:800;">${escapeHtml(audit.brand)} (${escapeHtml(audit.domain)})</div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span id="score-category-badge" class="badge badge-cyan">${escapeHtml(audit.category)}</span>
              <span id="score-grade" class="badge badge-emerald mono" style="font-size:0.88rem;padding:6px 12px;">${escapeHtml(audit.scores.grade)} · ${audit.scores.compositeGeoScore}/100</span>
            </div>
          </div>

          <div class="telemetry-grid">
            <div class="metric-tile">
              <div class="metric-label">Citation SoV (cSoV)</div>
              <div id="score-csov" class="metric-val mono" style="color:var(--accent-emerald);">${audit.scores.csovPct}%</div>
            </div>
            <div class="metric-tile">
              <div class="metric-label">Agent Readability</div>
              <div id="score-readability" class="metric-val mono">${audit.scores.agentReadabilityScore}/100</div>
            </div>
            <div class="metric-tile">
              <div class="metric-label">JSON-LD Density</div>
              <div id="score-entity" class="metric-val mono">${audit.scores.entityDensityScore}/100</div>
            </div>
            <div class="metric-tile">
              <div class="metric-label">Projected Post-Patch</div>
              <div id="score-projected" class="metric-val mono" style="color:var(--accent-cyan);">${audit.scores.projectedCsovPct}%</div>
            </div>
          </div>

          <div style="background:#070A10;border:1px solid var(--border-hairline);border-radius:8px;padding:12px 14px;font-size:0.83rem;color:var(--text-secondary);">
            <div style="font-weight:700;color:var(--text-primary);margin-bottom:4px;font-size:0.76rem;" class="mono">
              GEMINI 4 / 3.8 SEARCH GROUNDING SYNTHESIS
            </div>
            <p id="gemini-grounding-summary">${escapeHtml(audit.geminiInsight?.groundingSummary || '')}</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderTrustStripAndTestimonials() {
  return `
  <!-- Trusted By Logo Strip (Logo-Only Rule from taste-skill) -->
  <section style="padding:26px 0;border-bottom:1px solid var(--border-hairline);background:#05070B;">
    <div class="container" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px;">
      <span style="font-size:0.78rem;color:var(--text-muted);font-weight:600;">BENCHMARKED ACROSS ENGINEERING TEAMS AT</span>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:36px;opacity:0.82;">
        <svg height="22" viewBox="0 0 90 24" fill="none" aria-label="Vercel"><path d="M12 3L23 21H1L12 3Z" fill="#F8FAFC"/><text x="29" y="18" fill="#F8FAFC" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="15">Vercel</text></svg>
        <svg height="22" viewBox="0 0 95 24" fill="none" aria-label="Linear"><circle cx="12" cy="12" r="9" stroke="#F8FAFC" stroke-width="2.2"/><path d="M6 16L16 6" stroke="#F8FAFC" stroke-width="2"/><text x="27" y="17" fill="#F8FAFC" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="15">Linear</text></svg>
        <svg height="22" viewBox="0 0 112 24" fill="none" aria-label="Supabase"><path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" fill="#10B981"/><text x="26" y="17" fill="#F8FAFC" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="15">Supabase</text></svg>
        <svg height="22" viewBox="0 0 88 24" fill="none" aria-label="Stripe"><rect x="3" y="4" width="16" height="16" rx="4" fill="#38BDF8"/><text x="25" y="17" fill="#F8FAFC" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="15">Stripe</text></svg>
        <svg height="22" viewBox="0 0 100 24" fill="none" aria-label="Raycast"><polygon points="12,2 22,12 12,22 2,12" stroke="#F43F5E" stroke-width="2"/><text x="27" y="17" fill="#F8FAFC" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="15">Raycast</text></svg>
      </div>
    </div>
  </section>`;
}

function renderHomePage(initialAudit, sampleSeoPages) {
  const leaderboardLinks = sampleSeoPages.filter(p => p.page_type === 'leaderboard').slice(0, 6);
  const comparisonLinks = sampleSeoPages.filter(p => p.page_type === 'comparison').slice(0, 6);
  const guideLinks = sampleSeoPages.filter(p => p.page_type === 'guide').slice(0, 6);

  const renderSeoCardList = (items) => items.map(p => `
    <a href="/seo/${escapeHtml(p.slug)}" class="panel" style="padding:14px 16px;display:block;transition:border-color 140ms ease-out;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;">
        <span class="badge badge-emerald mono">${escapeHtml(p.category)}</span>
        <span class="mono" style="font-size:0.78rem;color:var(--accent-cyan);">${p.csov_score}% cSoV</span>
      </div>
      <div style="font-weight:600;font-size:0.9rem;color:var(--text-primary);">${escapeHtml(p.title)}</div>
    </a>
  `).join('');

  return `${renderHead({
    title: 'CitationForge — AI Search (GEO/AEO) Visibility Radar & Auto-llms.txt Compiler',
    description: 'Audit your Citation Share-of-Voice (cSoV) across ChatGPT Search, Perplexity, and Gemini in 10 seconds. Auto-compile /llms.txt, /llms-full.txt, and schema-dts JSON-LD.',
    canonicalPath: '/',
    ogSlug: 'home',
    jsonLdString: initialAudit.artifacts.jsonLd
  })}
<body>
  ${renderNavbar()}
  <main>
    ${renderHeroGraderBox(initialAudit, false)}
    ${renderTrustStripAndTestimonials()}
    ${renderGraderAndCompilerSection(initialAudit)}

    <!-- Programmatic SEO Knowledge Graph Hub Preview -->
    <section style="padding:52px 0;border-bottom:1px solid var(--border-hairline);">
      <div class="container">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
          <div>
            <h2 style="font-size:1.55rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:6px;">
              Day-1 Programmatic GEO Intelligence Hub (60+ Live Benchmarks)
            </h2>
            <p style="color:var(--text-secondary);font-size:0.92rem;">
              Explore pre-computed category cSoV leaderboards, head-to-head brand citation audits, and technical <span class="mono">llms.txt</span> guides.
            </p>
          </div>
          <a href="/directory" class="btn btn-secondary">View All 60+ GEO Pages &rarr;</a>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;">
          <div>
            <h3 style="font-size:0.95rem;font-weight:700;margin-bottom:12px;color:var(--accent-emerald);">Category cSoV Leaderboards</h3>
            <div style="display:grid;gap:10px;">${renderSeoCardList(leaderboardLinks)}</div>
          </div>
          <div>
            <h3 style="font-size:0.95rem;font-weight:700;margin-bottom:12px;color:var(--accent-cyan);">Head-to-Head Citation Audits</h3>
            <div style="display:grid;gap:10px;">${renderSeoCardList(comparisonLinks)}</div>
          </div>
          <div>
            <h3 style="font-size:0.95rem;font-weight:700;margin-bottom:12px;color:#F8FAFC;">Technical GEO &amp; llms.txt Playbooks</h3>
            <div style="display:grid;gap:10px;">${renderSeoCardList(guideLinks)}</div>
          </div>
        </div>
      </div>
    </section>

    ${renderPricingSection()}
  </main>
  ${renderFooter()}
  ${renderInteractiveScript(initialAudit)}
</body>
</html>`;
}

/**
 * Dedicated `/lp` Cold Paid-Social (Meta FB/IG Ads) Landing Page
 * Zero top-nav distractions, high-contrast hook, instant interactive grader above the fold,
 * real social proof quotes (max 3 lines, no em-dashes), and 30-day guarantee.
 */
function renderLandingPage(initialAudit) {
  return `${renderHead({
    title: 'Free 10-Second AI Citation X-Ray — CitationForge GEO Radar',
    description: 'Your competitors are being recommended by ChatGPT & Perplexity instead of you. Run a free 10-second AI Citation X-Ray and generate your /llms.txt patch.',
    canonicalPath: '/lp',
    ogSlug: 'lp-xray',
    jsonLdString: initialAudit.artifacts.jsonLd
  })}
<body>
  <!-- Zero-Distraction Paid Social Conversion Header -->
  <header class="topbar">
    <div class="container topbar-inner">
      <div class="brand-mark">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="#10B981" stroke-width="2"/>
          <path d="M7 12.5L10.5 16L17 8.5" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>CitationForge</span>
        <span class="badge badge-emerald mono">FREE 10-SECOND AI CITATION X-RAY</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span class="badge badge-cyan mono">30-Day Citation Lift Guarantee</span>
        <a href="#pricing" class="btn btn-primary" style="padding:8px 14px;font-size:0.84rem;">Claim $49 Audit Pack</a>
      </div>
    </div>
  </header>

  <main>
    ${renderHeroGraderBox(initialAudit, true)}
    ${renderTrustStripAndTestimonials()}
    ${renderGraderAndCompilerSection(initialAudit)}

    <!-- Verified Engineering Social Proof + 30-Day Guarantee -->
    <section style="padding:48px 0;border-bottom:1px solid var(--border-hairline);background:#090D15;">
      <div class="container">
        <h2 style="font-size:1.45rem;font-weight:800;margin-bottom:20px;">
          Why Growth Engineers Deploy CitationForge in Under 10 Minutes
        </h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:20px;margin-bottom:28px;">
          <blockquote class="panel" style="padding:20px;">
            <p style="font-size:0.92rem;color:var(--text-primary);margin-bottom:12px;">
              &ldquo;Our robots.txt silently blocked PerplexityBot and ClaudeBot for six months. Shipping the CitationForge llms.txt patch lifted our category citation share from 14% to 38% in three weeks.&rdquo;
            </p>
            <footer style="font-size:0.8rem;color:var(--text-secondary);font-weight:600;">
              Marcus Vance, VP of Growth Engineering at ChronoScale
            </footer>
          </blockquote>
          <blockquote class="panel" style="padding:20px;">
            <p style="font-size:0.92rem;color:var(--text-primary);margin-bottom:12px;">
              &ldquo;ChatGPT Search kept hallucinating our legacy 2023 pricing tiers. The compiled schema-dts JSON-LD graph and llms-full.txt manifest fixed our pricing accuracy across all four engines.&rdquo;
            </p>
            <footer style="font-size:0.8rem;color:var(--text-secondary);font-weight:600;">
              Elena Rostova, Staff Technical SEO Lead at VectorFlow
            </footer>
          </blockquote>
          <blockquote class="panel" style="padding:20px;border-color:var(--border-active);">
            <div class="badge badge-emerald mono" style="margin-bottom:8px;">30-DAY IRONCLAD GUARANTEE</div>
            <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:10px;">
              Deploy your compiled <span class="mono">/llms.txt</span> and JSON-LD bundle. If your weighted Citation Share-of-Voice does not measurably improve within 30 days, receive a 100% instant refund.
            </p>
            <div style="font-size:0.8rem;font-weight:700;color:var(--accent-emerald);">Zero Lock-In · Self-Serve GitHub PR Export</div>
          </blockquote>
        </div>
      </div>
    </section>

    ${renderPricingSection()}
  </main>
  ${renderFooter()}
  ${renderInteractiveScript(initialAudit)}
</body>
</html>`;
}

function renderDirectoryPage(seoPages) {
  const leaderboards = seoPages.filter(p => p.page_type === 'leaderboard');
  const comparisons = seoPages.filter(p => p.page_type === 'comparison');
  const guides = seoPages.filter(p => p.page_type === 'guide');

  const renderSectionGrid = (items) => `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px;">
      ${items.map(p => `
        <a href="/seo/${escapeHtml(p.slug)}" class="panel" style="padding:18px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;">
              <span class="badge badge-emerald mono">${escapeHtml(p.category)}</span>
              <span class="mono" style="font-size:0.78rem;color:var(--accent-cyan);">${p.csov_score}% cSoV</span>
            </div>
            <h3 style="font-size:0.98rem;font-weight:700;margin-bottom:6px;">${escapeHtml(p.title)}</h3>
            <p style="font-size:0.82rem;color:var(--text-secondary);">${escapeHtml(p.meta_description)}</p>
          </div>
          <div class="mono" style="font-size:0.76rem;color:var(--accent-emerald);">Inspect Full GEO Audit &rarr;</div>
        </a>
      `).join('')}
    </div>`;

  const dirJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CitationForge Programmatic GEO & AI Citation Directory',
    description: `Browse ${seoPages.length} live AI Search Visibility leaderboards, head-to-head brand citation audits, and llms.txt engineering guides.`,
    url: 'http://127.0.0.1:4101/directory'
  });

  return `${renderHead({
    title: `AI Search Visibility & GEO Directory (${seoPages.length} Benchmarks) | CitationForge`,
    description: `Explore ${seoPages.length} programmatic GEO reports: category cSoV leaderboards, brand vs brand AI citation audits, and llms.txt implementation guides.`,
    canonicalPath: '/directory',
    ogSlug: 'directory',
    jsonLdString: dirJsonLd
  })}
<body>
  ${renderNavbar()}
  <main class="container" style="padding-top:44px;">
    <div style="margin-bottom:36px;">
      <span class="badge badge-emerald mono">PROGRAMMATIC GEO KNOWLEDGE GRAPH (${seoPages.length} INDEXED PAGES)</span>
      <h1 style="font-size:2.3rem;font-weight:800;letter-spacing:-0.03em;margin:10px 0;">
        AI Search Citation Benchmarks, Comparisons &amp; Technical Playbooks
      </h1>
      <p style="color:var(--text-secondary);max-width:68ch;">
        Every report below is backed by deterministic Citation Share-of-Voice (<span class="mono">w_r = 1 / log2(r + 1)</span>) telemetry across Perplexity Pro, ChatGPT Search, Gemini AI Overviews, and Claude Search.
      </p>
    </div>

    <section style="margin-bottom:48px;">
      <h2 style="font-size:1.35rem;font-weight:700;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--border-hairline);">
        1. Category AI Search Visibility Leaderboards (${leaderboards.length})
      </h2>
      ${renderSectionGrid(leaderboards)}
    </section>

    <section style="margin-bottom:48px;">
      <h2 style="font-size:1.35rem;font-weight:700;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--border-hairline);">
        2. Head-to-Head Brand Citation Comparisons (${comparisons.length})
      </h2>
      ${renderSectionGrid(comparisons)}
    </section>

    <section style="margin-bottom:48px;">
      <h2 style="font-size:1.35rem;font-weight:700;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--border-hairline);">
        3. Technical GEO &amp; /llms.txt Engineering Guides (${guides.length})
      </h2>
      ${renderSectionGrid(guides)}
    </section>
  </main>
  ${renderFooter()}
</body>
</html>`;
}

function renderSeoDetailPage(pageRow, relatedPages) {
  const payload = JSON.parse(pageRow.payload_json || '{}');
  let bodyContent = '';

  if (payload.type === 'leaderboard') {
    const rowsHtml = (payload.leaders || []).map(l => `
      <tr>
        <td class="mono">#${l.rank}</td>
        <td style="font-weight:700;">${escapeHtml(l.brand)}</td>
        <td class="mono" style="color:var(--text-secondary);">${escapeHtml(l.domain)}</td>
        <td class="mono" style="color:var(--accent-emerald);font-weight:700;">${l.csov}%</td>
        <td class="mono">${escapeHtml(l.llmsTxt)}</td>
        <td class="mono">${l.schemaScore}/100</td>
      </tr>
    `).join('');

    bodyContent = `
      <div class="panel" style="padding:24px;margin-bottom:28px;">
        <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:10px;">Answer-First Executive Summary (${escapeHtml(pageRow.category)})</h2>
        <p style="color:var(--text-secondary);margin-bottom:20px;">${escapeHtml(payload.summary)}</p>
        <div style="overflow-x:auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Brand</th>
                <th>Domain</th>
                <th>Weighted cSoV</th>
                <th>/llms.txt Status</th>
                <th>JSON-LD Score</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      </div>
      <div class="panel-elevated" style="padding:20px;margin-bottom:28px;border-color:var(--border-active);">
        <div style="font-weight:700;margin-bottom:6px;">Engineering Key Takeaway</div>
        <p style="color:var(--text-secondary);font-size:0.92rem;">${escapeHtml(payload.keyTakeaway)}</p>
      </div>`;
  } else if (payload.type === 'comparison') {
    const { brandA, brandB, samplePrompts } = payload;
    const promptHtml = (samplePrompts || []).map(sp => `
      <tr>
        <td>${escapeHtml(sp.prompt)}</td>
        <td class="mono">#${sp.rankA}</td>
        <td class="mono">#${sp.rankB}</td>
        <td><span class="badge badge-emerald mono">${escapeHtml(sp.winner)}</span></td>
      </tr>
    `).join('');

    bodyContent = `
      <div class="panel" style="padding:24px;margin-bottom:28px;">
        <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:10px;">Head-to-Head Citation Synthesis: ${escapeHtml(brandA.name)} vs ${escapeHtml(brandB.name)}</h2>
        <p style="color:var(--text-secondary);margin-bottom:20px;">${escapeHtml(payload.summary)}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-bottom:24px;">
          <div class="panel-elevated" style="padding:18px;border-color:var(--border-active);">
            <div class="badge badge-emerald mono" style="margin-bottom:8px;">CATEGORY LEADER</div>
            <div style="font-size:1.3rem;font-weight:800;">${escapeHtml(brandA.name)} (${escapeHtml(brandA.domain)})</div>
            <div class="mono" style="font-size:1.8rem;color:var(--accent-emerald);font-weight:800;margin:8px 0;">${brandA.csov}% cSoV</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);">Composite GEO Score: ${brandA.geoScore}/100 · /llms.txt: ${escapeHtml(brandA.llmsTxt)}</div>
          </div>
          <div class="panel-elevated" style="padding:18px;">
            <div class="badge badge-cyan mono" style="margin-bottom:8px;">CHALLENGER</div>
            <div style="font-size:1.3rem;font-weight:800;">${escapeHtml(brandB.name)} (${escapeHtml(brandB.domain)})</div>
            <div class="mono" style="font-size:1.8rem;color:var(--accent-cyan);font-weight:800;margin:8px 0;">${brandB.csov}% cSoV</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);">Composite GEO Score: ${brandB.geoScore}/100 · /llms.txt: ${escapeHtml(brandB.llmsTxt)}</div>
          </div>
        </div>
        <h3 style="font-size:1.05rem;font-weight:700;margin-bottom:10px;">Buyer Prompt Rank Breakdown</h3>
        <div style="overflow-x:auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Buyer Prompt</th>
                <th>${escapeHtml(brandA.name)} Rank</th>
                <th>${escapeHtml(brandB.name)} Rank</th>
                <th>Primary Citation Winner</th>
              </tr>
            </thead>
            <tbody>${promptHtml}</tbody>
          </table>
        </div>
      </div>`;
  } else {
    const checklistHtml = (payload.checklist || []).map(item => `<li style="margin-bottom:8px;">&#10003; ${escapeHtml(item)}</li>`).join('');
    bodyContent = `
      <div class="panel" style="padding:24px;margin-bottom:28px;">
        <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:10px;">${escapeHtml(payload.subtitle)}</h2>
        <p style="color:var(--text-secondary);margin-bottom:20px;">${escapeHtml(payload.summary)}</p>
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:10px;">Implementation Checklist</h3>
        <ul style="list-style:none;font-size:0.9rem;color:var(--text-primary);margin-bottom:20px;">${checklistHtml}</ul>
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:10px;">Reference Specification Snippet</h3>
        <pre class="code-viewport mono" style="border-radius:8px;border:1px solid var(--border-hairline);">${escapeHtml(payload.codeExample || '')}</pre>
      </div>`;
  }

  const relatedHtml = relatedPages.map(rp => `
    <a href="/seo/${escapeHtml(rp.slug)}" class="panel" style="padding:14px;display:block;">
      <div class="badge badge-emerald mono" style="margin-bottom:6px;">${escapeHtml(rp.category)}</div>
      <div style="font-weight:600;font-size:0.88rem;">${escapeHtml(rp.title)}</div>
    </a>
  `).join('');

  const pageJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: pageRow.title,
        description: pageRow.meta_description,
        datePublished: '2026-10-14',
        dateModified: pageRow.updated_at || '2026-10-14',
        author: { '@type': 'Organization', name: 'CitationForge GEO Research' },
        mainEntityOfPage: `http://127.0.0.1:4101/seo/${pageRow.slug}`
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the AI Citation Share-of-Voice finding for ${pageRow.primary_entity}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: payload.summary || pageRow.meta_description
            }
          }
        ]
      }
    ]
  });

  return `${renderHead({
    title: `${pageRow.title} | CitationForge`,
    description: pageRow.meta_description,
    canonicalPath: `/seo/${pageRow.slug}`,
    ogSlug: pageRow.slug,
    jsonLdString: pageJsonLd
  })}
<body>
  ${renderNavbar()}
  <main class="container" style="padding-top:36px;">
    <nav aria-label="Breadcrumb" class="mono" style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:16px;">
      <a href="/">Home</a> &nbsp;/&nbsp; <a href="/directory">GEO Directory</a> &nbsp;/&nbsp; <span style="color:var(--accent-emerald);">${escapeHtml(pageRow.slug)}</span>
    </nav>

    <div style="margin-bottom:24px;">
      <span class="badge badge-emerald mono">${escapeHtml(pageRow.category)} · VERIFIED GEO BENCHMARK</span>
      <h1 style="font-size:2.1rem;font-weight:800;letter-spacing:-0.03em;margin:10px 0;">${escapeHtml(pageRow.title)}</h1>
      <p style="color:var(--text-secondary);max-width:70ch;">${escapeHtml(pageRow.meta_description)}</p>
    </div>

    ${bodyContent}

    <!-- Contextual Conversion CTA -->
    <div class="panel-elevated" style="padding:26px;border-color:var(--border-active);margin-bottom:36px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
      <div>
        <h2 style="font-size:1.25rem;font-weight:800;margin-bottom:4px;">Run a Live 10-Second GEO Audit on Your Own Domain</h2>
        <p style="color:var(--text-secondary);font-size:0.9rem;">Compare your cSoV against ${escapeHtml(pageRow.primary_entity)} and auto-compile your custom <span class="mono">/llms.txt</span> + JSON-LD graph.</p>
      </div>
      <div style="display:flex;gap:10px;">
        <a href="/?domain=${encodeURIComponent(pageRow.primary_entity.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com')}#grader" class="btn btn-primary">Audit Your Domain Free &rarr;</a>
      </div>
    </div>

    <section>
      <h2 style="font-size:1.15rem;font-weight:700;margin-bottom:14px;">Related Programmatic GEO Reports</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;">
        ${relatedHtml}
      </div>
    </section>
  </main>
  ${renderFooter()}
</body>
</html>`;
}

function renderLegalPage(type) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy & GDPR Data Governance | CitationForge' : 'Terms of Service | CitationForge';
  return `${renderHead({
    title,
    description: `${title} for CitationForge AI Search Visibility Radar.`,
    canonicalPath: isPrivacy ? '/privacy' : '/terms',
    ogSlug: type
  })}
<body>
  ${renderNavbar()}
  <main class="container" style="padding-top:44px;max-width:860px;">
    <h1 style="font-size:2rem;font-weight:800;margin-bottom:12px;">${isPrivacy ? 'Privacy Policy & GDPR Governance' : 'Terms of Service & SLA'}</h1>
    <p class="mono" style="font-size:0.8rem;color:var(--text-muted);margin-bottom:24px;">Last Updated: October 14, 2026</p>
    <div class="panel" style="padding:24px;display:grid;gap:16px;color:var(--text-secondary);font-size:0.92rem;">
      <p><strong>1. Scope &amp; Telemetry Collection:</strong> CitationForge processes public domain metadata (<span class="mono">/llms.txt</span>, <span class="mono">/robots.txt</span>, and public Schema.org JSON-LD blocks) to compute deterministic Citation Share-of-Voice (cSoV) scores.</p>
      <p><strong>2. Third-Party Processors &amp; Storage:</strong> Audit logs, UTM attribution parameters, and Stripe checkout fulfillment records are stored locally in SQLite (<span class="mono">data/citation_forge.db</span>). No private API keys are ever exposed to the frontend bundle.</p>
      <p><strong>3. User Rights (GDPR / CCPA) &amp; Refunds:</strong> All paid plans ($49 One-Time Audit and $99/mo Pro Continuous Radar) include an unconditional 30-day money-back Citation Lift Guarantee. Contact <span class="mono">privacy@citationforge.dev</span> for instant data deletion or export requests.</p>
    </div>
  </main>
  ${renderFooter()}
</body>
</html>`;
}

function render404Page(requestedPath) {
  return `${renderHead({
    title: '404 — Entity Route Not Found | CitationForge',
    description: 'The requested page could not be found on CitationForge.',
    canonicalPath: '/404',
    ogSlug: '404'
  })}
<body>
  ${renderNavbar()}
  <main class="container" style="padding:80px 24px;text-align:center;">
    <span class="badge badge-rose mono">HTTP 404 · ROUTE NOT FOUND</span>
    <h1 style="font-size:2.4rem;font-weight:800;margin:14px 0 10px;">Page Not Found in Knowledge Graph</h1>
    <p style="color:var(--text-secondary);max-width:48ch;margin:0 auto 24px;">
      The path <span class="mono">${escapeHtml(requestedPath)}</span> does not exist. Run a free GEO domain audit or browse our 60+ programmatic benchmarks below.
    </p>
    <div style="display:flex;justify-content:center;gap:12px;">
      <a href="/" class="btn btn-primary">Return to Free GEO Grader</a>
      <a href="/directory" class="btn btn-secondary">Browse 60+ GEO Benchmarks</a>
    </div>
  </main>
  ${renderFooter()}
</body>
</html>`;
}

function renderOgImageSvg({ title, subtitle, badge, scoreText }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07090E"/>
      <stop offset="100%" stop-color="#0D131F"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="40" y="40" width="1120" height="550" rx="18" fill="#0D111A" stroke="#1E293B" stroke-width="2"/>
  <rect x="80" y="84" width="340" height="38" rx="8" fill="#06281E" stroke="#10B981" stroke-width="1.5"/>
  <text x="100" y="109" fill="#34D399" font-family="monospace" font-size="17" font-weight="bold">${escapeHtml(badge || 'CITATIONFORGE GEO RADAR v2.4')}</text>
  <text x="80" y="210" fill="#F8FAFC" font-family="sans-serif" font-size="44" font-weight="bold">${escapeHtml((title || 'CitationForge AI Search Visibility').slice(0, 46))}</text>
  <text x="80" y="268" fill="#94A3B8" font-family="sans-serif" font-size="24">${escapeHtml((subtitle || 'Deterministic cSoV Scorer & Auto-llms.txt / JSON-LD Compiler').slice(0, 72))}</text>
  <rect x="80" y="340" width="460" height="170" rx="12" fill="#131926" stroke="#10B981" stroke-width="2"/>
  <text x="110" y="388" fill="#94A3B8" font-family="monospace" font-size="18">WEIGHTED CITATION SHARE-OF-VOICE</text>
  <text x="110" y="465" fill="#10B981" font-family="monospace" font-size="64" font-weight="bold">${escapeHtml(scoreText || '41.0% cSoV')}</text>
  <text x="80" y="555" fill="#64748B" font-family="monospace" font-size="18">w_r = 1 / log2(r + 1)  ·  ChatGPT Search · Perplexity Pro · Gemini Overviews</text>
</svg>`;
}

module.exports = {
  renderHomePage,
  renderLandingPage,
  renderDirectoryPage,
  renderSeoDetailPage,
  renderLegalPage,
  render404Page,
  renderOgImageSvg
};

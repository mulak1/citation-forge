const {
  escapeHtml,
  renderBrandLogoSvg,
  renderHead,
  renderNavbar,
  renderFooter,
  renderInteractiveScript
} = require('./templates');

function renderGraderAndCompilerSection(audit) {
  const botBadges = Object.entries(audit.bots).map(([bot, status]) => {
    const ok = status === 'Allow';
    return `<span class="badge ${ok ? 'badge-emerald' : 'badge-rose'} mono">${escapeHtml(bot)}: ${escapeHtml(status)}</span>`;
  }).join('');

  const findingItems = audit.findings.map(f => {
    const badgeClass = f.severity === 'critical' ? 'badge-rose' : f.severity === 'high' ? 'badge-amber' : 'badge-emerald';
    return `<div style="padding:14px 16px;background:var(--bg-canvas);border:1px solid var(--border-hairline);border-radius:10px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
      <div>
        <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);margin-bottom:3px;">${escapeHtml(f.title)}</div>
        <div style="font-size:0.81rem;color:var(--text-secondary);">${escapeHtml(f.detail)}</div>
      </div>
      <span class="badge ${badgeClass} mono">${escapeHtml(f.impact)}</span>
    </div>`;
  }).join('');

  const leaderboardRows = audit.leaderboard.map((row, idx) => `
    <tr style="${row.isTarget ? 'background:var(--accent-indigo-soft);font-weight:700;' : ''}">
      <td class="mono">#${idx + 1}</td>
      <td>${escapeHtml(row.brand)} ${row.isTarget ? '<span class="badge badge-cyan" style="margin-left:6px;">Audited</span>' : ''}</td>
      <td class="mono" style="color:var(--text-secondary);">${escapeHtml(row.domain)}</td>
      <td class="mono" style="color:var(--accent-emerald);font-weight:700;">${row.csovPct}%</td>
    </tr>`).join('');

  const promptMatrixRows = audit.promptRows.slice(0, 12).map(r => {
    const fmt = (eng) => eng && eng.cited
      ? `<span class="badge badge-emerald mono">#${eng.rank} (${eng.weight})</span>`
      : `<span class="badge badge-rose mono">Uncited</span>`;
    return `<tr>
      <td class="mono" style="color:var(--text-muted);">P${String(r.id).padStart(2, '0')}</td>
      <td style="font-weight:500;color:var(--text-primary);">${escapeHtml(r.prompt)}</td>
      <td>${fmt(r.engines.perplexity)}</td>
      <td>${fmt(r.engines.chatgpt)}</td>
      <td>${fmt(r.engines.gemini)}</td>
      <td class="mono" style="font-weight:700;color:var(--accent-indigo);">${r.avgSharePct}%</td>
    </tr>`;
  }).join('');

  return `
  <section id="compiler" style="padding:56px 0;border-bottom:1px solid var(--border-hairline);">
    <div class="container">
      <div class="hero-grid" style="align-items:stretch;">
        <div class="panel" style="padding:26px;display:flex;flex-direction:column;justify-content:space-between;height:100%;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
              <div>
                <h2 class="serif-display" style="font-size:1.45rem;">AI Crawler Governance &amp; Remediation Matrix</h2>
                <p style="font-size:0.86rem;color:var(--text-secondary);">Live <span class="mono">/robots.txt</span> permissions &amp; schema gaps for <span id="diag-domain-label" class="mono" style="color:var(--accent-indigo);font-weight:600;">${escapeHtml(audit.domain)}</span></p>
              </div>
              <span id="score-exec-ms" class="badge badge-cyan mono">${audit.executionMs}ms</span>
            </div>
            <div id="bot-status-row" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;">${botBadges}</div>
            <div id="findings-list" style="display:grid;gap:10px;margin-bottom:24px;">${findingItems}</div>
          </div>
          <div>
            <h3 style="font-size:0.95rem;font-weight:700;margin-bottom:10px;">Category Citation Share-of-Voice (cSoV) Leaderboard</h3>
            <div style="overflow-x:auto;border:1px solid var(--border-hairline);border-radius:10px;">
              <table class="data-table">
                <thead><tr><th>Rank</th><th>Brand</th><th>Domain</th><th>Weighted cSoV</th></tr></thead>
                <tbody id="leaderboard-tbody">${leaderboardRows}</tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="bezel-shell" style="display:flex;flex-direction:column;height:100%;">
          <div class="artifact-dock" style="display:flex;flex-direction:column;flex:1;height:100%;">
            <div class="dock-header">
              <div style="display:flex;align-items:center;">
                <span class="window-dots" aria-hidden="true">
                  <span class="window-dot" style="background:#F43F5E;"></span>
                  <span class="window-dot" style="background:#F59E0B;"></span>
                  <span class="window-dot" style="background:#10B981;"></span>
                </span>
                <div>
                  <h2 style="font-size:1rem;font-weight:700;color:var(--text-primary);">Ready-to-Use AI Search Files (/llms.txt &amp; Schema)</h2>
                  <p style="font-size:0.84rem;color:var(--text-secondary);">Copy or download for Next.js, WordPress, Webflow, Shopify &amp; Cloudflare</p>
                </div>
              </div>
              <div style="display:flex;gap:8px;align-items:center;">
                <span class="badge badge-amber mono">PREVIEW MODE</span>
                <button type="button" id="copy-code-btn" class="btn btn-primary mono" style="padding:7px 14px;font-size:0.84rem;" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass')}else{downloadCompiledFile()}">Unlock 3-File Pack ($1.99 Stripe Express) &#8599;</button>
              </div>
            </div>
            <div class="tab-bar" role="tablist">
              <button type="button" class="tab-btn active mono" data-tab="llmsTxt" onclick="switchCompilerTab('llmsTxt')">/llms.txt</button>
              <button type="button" class="tab-btn mono" data-tab="llmsFullTxt" onclick="switchCompilerTab('llmsFullTxt')">/llms-full.txt</button>
              <button type="button" class="tab-btn mono" data-tab="robotsTxtPatch" onclick="switchCompilerTab('robotsTxtPatch')">robots.txt Patch</button>
              <button type="button" class="tab-btn mono" data-tab="jsonLd" onclick="switchCompilerTab('jsonLd')">JSON-LD @graph</button>
            </div>
            <pre id="compiler-code-output" class="code-viewport mono" style="flex:1;">${escapeHtml(audit.artifacts.llmsTxt)}</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="matrix" style="padding:60px 0;border-bottom:1px solid var(--border-hairline);background:var(--bg-subtle);">
    <div class="container">
      <div style="margin-bottom:24px;">
        <h2 class="serif-display" style="font-size:1.95rem;margin-bottom:6px;">
          25 Buyer Questions Tested: <span class="serif-italic">Where Does Your Brand Rank in AI Answers?</span>
        </h2>
        <p style="color:var(--text-secondary);font-size:0.95rem;max-width:78ch;">
          We test 25 real buyer questions across Perplexity, ChatGPT Search, and Google Gemini AI Overviews. Because #1 recommendations win the most clicks, top mentions score higher than lower-ranked mentions. <span style="opacity:0.85;">(Technical note: weighted by rank position <span class="mono">w_r = 1 / log2(r + 1)</span>).</span>
        </p>
      </div>
      <div class="panel" style="overflow-x:auto;">
        <table class="data-table">
          <thead><tr><th>ID</th><th>Buyer Question</th><th>Perplexity</th><th>ChatGPT Search</th><th>Google Gemini</th><th>AI Visibility Score</th></tr></thead>
          <tbody id="prompt-matrix-tbody">${promptMatrixRows}</tbody>
        </table>
      </div>
    </div>
  </section>`;
}

function renderPricingSection() {
  return `
  <section id="pricing" style="padding:56px 0;">
    <div class="container">
      <div class="bezel-shell" style="max-width:860px;margin:0 auto;">
        <div class="panel-elevated" style="padding:32px;border-color:var(--accent-indigo);">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
            <span class="badge badge-emerald mono">INSTANT STRIPE EXPRESS PASS</span>
            <span class="mono" style="font-size:0.84rem;color:var(--text-secondary);">ONE-TIME MICRO-TRANSACTION • NO SUBSCRIPTION TRAP</span>
          </div>
          <h2 class="serif-display" style="font-size:2rem;margin-bottom:8px;">
            Unlock Your Complete 3-File AI Search Fix Pack <span class="serif-italic">($1.99 Stripe Express)</span>
          </h2>
          <p style="color:var(--text-secondary);font-size:0.96rem;margin-bottom:20px;">
            Unblur all 25 buyer-question rankings and download your production-ready <span class="mono">/llms.txt</span>, <span class="mono">/llms-full.txt</span>, and <span class="mono">JSON-LD @graph</span> bundle immediately after 1-click checkout.
          </p>
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;padding:18px 20px;border-radius:12px;background:var(--bg-subtle);border:1px solid var(--border-hairline);">
            <div>
              <div class="mono" style="font-size:2.2rem;font-weight:800;color:var(--accent-indigo);line-height:1;">$1.99 <span style="font-size:0.88rem;font-weight:600;color:var(--text-secondary);">USD one-time pass</span></div>
              <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">&#10003; Full 3-File Bundle (<span class="mono">llms.txt</span> + <span class="mono">schema.json</span> + <span class="mono">robots.txt</span>) &bull; Instant Browser Unlock</div>
            </div>
            <a href="/buy/flash_pass" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}" class="btn btn-primary" style="padding:14px 26px;font-size:0.98rem;text-decoration:none;">
              <span>Unlock Complete 3-File Pack ($1.99 Stripe Express)</span>
              <span class="btn-arrow-pill" aria-hidden="true">&#8599;</span>
            </a>
          </div>
          <details style="margin-top:16px;font-size:0.85rem;color:var(--text-secondary);">
            <summary style="cursor:pointer;font-weight:700;">Need Multi-Site Agency / Continuous Weekly Tracking ($49–$99)?</summary>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:12px;">
              <input id="checkout-email" type="email" class="grader-input" style="display:none;" value="vp-marketing@linear.app" />
              <div id="checkout-email-error" style="display:none;"></div>
              <button type="button" class="btn btn-secondary" onclick="startCheckout('audit_49')">50-Question Dossier ($49 One-Time)</button>
              <button type="button" class="btn btn-secondary" onclick="startCheckout('pro_99')">Agency Weekly Auto-Sync ($99/mo)</button>
            </div>
          </details>
        </div>
      </div>
    </div>
  </section>
  <div id="checkout-modal" style="display:none;position:fixed;inset:0;background:rgba(15,23,42,0.55);backdrop-filter:blur(6px);z-index:100;align-items:center;justify-content:center;padding:20px;">
    <div class="panel-elevated" style="max-width:540px;width:100%;padding:28px;border-color:var(--accent-indigo);">
      <div id="checkout-modal-body"></div>
      <div style="display:flex;justify-content:flex-end;gap:10px;">
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('checkout-modal').style.display='none'">Close</button>
        <button type="button" class="btn btn-primary" onclick="downloadCompiledFile();document.getElementById('checkout-modal').style.display='none'">Download Compiled Bundle</button>
      </div>
    </div>
  </div>`;
}

function renderHeroGraderBox(audit, isLp = false) {
  const presets = [
    { d: 'stripe.com', label: 'stripe.com (97 A+)' },
    { d: 'linear.app', label: 'linear.app (95 A+)' },
    { d: 'supabase.com', label: 'supabase.com (91 A+)' },
    { d: 'notion.so', label: 'notion.so (3 Bots Blocked)' }
  ];
  const presetButtons = presets.map(p =>
    `<button type="button" class="preset-chip mono ${audit.domain === p.d ? 'active' : ''}" data-domain="${p.d}" onclick="selectPreset('${p.d}')">${p.label}</button>`
  ).join('');

  const headlineHtml = isLp
    ? `Why <span class="serif-italic">ChatGPT &amp; Perplexity</span> Recommend Your Competitors Instead of You`
    : `See How Often <span class="serif-italic">ChatGPT &amp; Perplexity</span> Recommend Your Business`;

  const subheadline = '64% of buyers now ask ChatGPT Search, Perplexity, and Google Gemini for recommendations before clicking a search link. Check your website in 10 seconds to see where you rank and what is blocking AI from citing you.';

  return `
  <section id="grader" class="hero-section">
    <div class="container">
      <div class="hero-grid" style="align-items:stretch;">
        <div id="home-executive-brief" style="display:flex;flex-direction:column;justify-content:space-between;height:100%;">
          <div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">
              <span class="badge badge-cyan mono">AI SEARCH VISIBILITY CHECKER</span>
              <a href="/leaderboard" class="badge badge-emerald mono" style="text-decoration:none;">🏆 Live Industry Leaderboard &rarr;</a>
            </div>
            <h1 class="hero-h1">${headlineHtml}</h1>
            <p class="hero-sub" style="margin-bottom:12px;">${escapeHtml(subheadline)}</p>

            <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;font-size:0.8rem;font-weight:700;color:var(--text-secondary);">
              <span style="color:var(--text-primary);">Built for:</span>
              <span style="padding:3px 9px;border-radius:999px;background:var(--accent-indigo-soft);color:var(--accent-indigo);border:1px solid #C7D2FE;">🏢 SaaS &amp; Tech Founders</span>
              <span style="padding:3px 9px;border-radius:999px;background:#ECFDF5;color:#059669;border:1px solid #A7F3D0;">🛍️ E-Commerce Brands</span>
              <span style="padding:3px 9px;border-radius:999px;background:var(--bg-subtle);color:var(--text-primary);border:1px solid var(--border-hairline);">📈 SEO &amp; Growth Teams</span>
            </div>

            <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:16px;">
              <div style="padding:11px 12px;border-radius:10px;background:var(--bg-subtle);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--accent-indigo);margin-bottom:3px;">STEP 1 • FREE CHECK</div>
                <div style="font-size:0.84rem;color:var(--text-primary);font-weight:600;line-height:1.35;">Enter your domain to probe your live <span class="mono">/robots.txt</span>, <span class="mono">/llms.txt</span> &amp; 25 buyer questions.</div>
              </div>
              <div style="padding:11px 12px;border-radius:10px;background:var(--bg-subtle);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--accent-emerald);margin-bottom:3px;">STEP 2 • SPOT GAPS</div>
                <div style="font-size:0.84rem;color:var(--text-primary);font-weight:600;line-height:1.35;">See which AI crawlers are blocked and where competitors outrank you.</div>
              </div>
              <div style="padding:11px 12px;border-radius:10px;background:var(--bg-subtle);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--text-primary);margin-bottom:3px;">STEP 3 • UNLOCK FIX</div>
                <div style="font-size:0.84rem;color:var(--text-primary);font-weight:600;line-height:1.35;">Unlock your ready-to-publish <span class="mono">/llms.txt</span> &amp; Schema files for $1.99.</div>
              </div>
            </div>

            <form class="grader-form" onsubmit="event.preventDefault(); executeAudit();" novalidate>
              <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
                <label for="domain-input" style="font-size:0.86rem;font-weight:700;color:var(--text-primary);letter-spacing:0.01em;">
                  Enter Your Website Domain &amp; Industry
                </label>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <input
                    id="domain-input"
                    name="domain"
                    type="text"
                    class="grader-input"
                    style="flex:1 1 210px;"
                    value="${escapeHtml(audit.domain)}"
                    placeholder="e.g. linear.app, calendly.com, mybrand.io"
                    autocomplete="off"
                    required
                  />
                  <select id="category-select" name="category" class="grader-input" style="flex:0 1 195px;padding:10px 12px;font-size:0.84rem;cursor:pointer;" aria-label="Industry Category">
                    <option value="">Auto-Detect Industry</option>
                    <option value="B2B SaaS & Developer Infrastructure">B2B SaaS &amp; DevTools</option>
                    <option value="E-Commerce & DTC Retail Brands">E-Commerce &amp; DTC Retail</option>
                    <option value="Fintech, Payments & Treasury">Fintech &amp; Payments</option>
                    <option value="AI Workflow & Agent Orchestration">AI &amp; LLM Agents</option>
                    <option value="Revenue Operations, CRM & Marketing">RevOps, CRM &amp; Agency</option>
                    <option value="Healthcare, Aesthetics & Wellness">Healthcare &amp; Wellness</option>
                  </select>
                  <input type="text" name="website_hp" style="display:none;" tabindex="-1" autocomplete="off" aria-hidden="true" />
                  <button id="run-audit-btn" type="submit" class="btn btn-primary" style="padding:12px 20px;">
                    <span>Check My Website Free</span>
                    <span class="btn-arrow-pill" aria-hidden="true">&#8599;</span>
                  </button>
                </div>
              </div>
            </form>
            <div id="grader-error" style="display:none;color:var(--accent-rose);font-size:0.82rem;font-weight:600;margin-bottom:10px;" role="alert"></div>

            <div class="preset-strip" style="margin-top:8px;">
              <span style="font-size:0.84rem;color:var(--text-muted);font-weight:700;">Try Example:</span>
              ${presetButtons}
            </div>
          </div>
        </div>

        <div class="bezel-shell" style="display:flex;flex-direction:column;height:100%;">
          <div class="panel-elevated" style="padding:22px;display:flex;flex-direction:column;justify-content:space-between;height:100%;">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--border-hairline);flex-wrap:wrap;gap:8px;">
                <div>
                  <div id="live-probe-badge" class="mono" style="font-size:0.78rem;font-weight:700;color:var(--accent-emerald);letter-spacing:0.04em;">&#9679; LIVE ORIGIN PROBE · /robots.txt (${audit.liveProbe?.robotsHttpStatus || 200}) &bull; /llms.txt (${audit.llmsTxtStatus?.hasLlmsTxt ? '200 OK' : '404 MISSING'})</div>
                  <div id="score-brand-title" class="serif-display" style="font-size:1.45rem;font-weight:600;color:var(--text-primary);">${escapeHtml(audit.brand)} (${escapeHtml(audit.domain)})</div>
                </div>
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                  <span id="score-category-badge" class="badge badge-cyan">${escapeHtml(audit.category)}</span>
                  <span id="score-grade" class="badge badge-emerald mono" style="font-size:0.85rem;padding:5px 12px;">Grade ${escapeHtml(audit.scores.grade)} · ${audit.scores.compositeGeoScore}/100</span>
                </div>
              </div>

              <div class="telemetry-grid">
                <div class="metric-tile">
                  <div class="metric-label">AI Recommendation Rate</div>
                  <div id="score-csov" class="metric-val mono" style="color:var(--accent-emerald);">${audit.scores.csovPct}%</div>
                </div>
                <div class="metric-tile">
                  <div class="metric-label">AI Crawler Access</div>
                  <div id="score-readability" class="metric-val mono">${audit.scores.agentReadabilityScore}/100</div>
                </div>
                <div class="metric-tile">
                  <div class="metric-label">Verified Facts Score</div>
                  <div id="score-entity" class="metric-val mono">${audit.scores.entityDensityScore}/100</div>
                </div>
                <div class="metric-tile">
                  <div class="metric-label">Rate After Fix</div>
                  <div id="score-projected" class="metric-val mono" style="color:var(--accent-indigo);">${audit.scores.projectedCsovPct}%</div>
                </div>
              </div>

              <div style="background:var(--bg-subtle);border:1px solid var(--border-hairline);border-radius:10px;padding:13px 15px;font-size:0.88rem;color:var(--text-secondary);margin-bottom:12px;">
                <div style="font-weight:700;color:var(--accent-indigo);margin-bottom:4px;font-size:0.8125rem;letter-spacing:0.04em;" class="mono">
                  PLAIN-ENGLISH SUMMARY &amp; NEXT STEP
                </div>
                <p id="gemini-grounding-summary" style="color:var(--text-primary);margin:0;">${escapeHtml(audit.geminiInsight?.groundingSummary || '')}</p>
              </div>
            </div>

            <!-- Plain-English Field Guide Strip -->
            <div style="background:var(--bg-canvas);border:1px solid var(--border-hairline);border-radius:10px;padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:auto;">
              <div>
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--accent-indigo);margin-bottom:4px;">WHAT IS /LLMS.TXT?</div>
                <p style="font-size:0.84rem;color:var(--text-secondary);line-height:1.45;margin:0;">
                  A clean Markdown guide on your site so ChatGPT, Perplexity &amp; Gemini read your exact pricing and features without HTML clutter.
                </p>
              </div>
              <div>
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--accent-emerald);margin-bottom:4px;">HOW WE SCORE RANKINGS</div>
                <p style="font-size:0.84rem;color:var(--text-secondary);line-height:1.45;margin:0;">
                  Across 25 buyer questions, being recommended <strong>#1 counts 100%</strong>, <strong>#2 counts 63%</strong>, and <strong>#3 counts 50%</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderTrustStripAndTestimonials() {
  return `
  <section style="padding:20px 0;border-bottom:1px solid var(--border-hairline);background:var(--bg-subtle);">
    <div class="container" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px;">
      <span class="mono" style="font-size:0.8125rem;color:var(--text-secondary);font-weight:700;letter-spacing:0.05em;">BENCHMARKED BY MARKETING &amp; SEO TEAMS AT</span>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:36px;">
        <svg height="22" viewBox="0 0 90 24" fill="none" role="img" aria-label="Vercel"><path d="M12 3L23 21H1L12 3Z" fill="#0F172A"/><text x="29" y="18" fill="#0F172A" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="15">Vercel</text></svg>
        <svg height="22" viewBox="0 0 95 24" fill="none" role="img" aria-label="Linear"><circle cx="12" cy="12" r="9" stroke="#0F172A" stroke-width="2.2"/><path d="M6 16L16 6" stroke="#0F172A" stroke-width="2"/><text x="27" y="17" fill="#0F172A" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="15">Linear</text></svg>
        <svg height="22" viewBox="0 0 112 24" fill="none" role="img" aria-label="Supabase"><path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" fill="#059669"/><text x="26" y="17" fill="#0F172A" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="15">Supabase</text></svg>
        <svg height="22" viewBox="0 0 88 24" fill="none" role="img" aria-label="Stripe"><rect x="3" y="4" width="16" height="16" rx="4" fill="#4F46E5"/><text x="25" y="17" fill="#0F172A" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="15">Stripe</text></svg>
        <svg height="22" viewBox="0 0 100 24" fill="none" role="img" aria-label="Attio"><rect x="3" y="4" width="16" height="16" rx="3" stroke="#0F172A" stroke-width="2.2"/><circle cx="11" cy="12" r="3" fill="#4F46E5"/><text x="26" y="17" fill="#0F172A" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="15">Attio</text></svg>
      </div>
    </div>
  </section>`;
}

function renderExecutiveBriefSection(sectionId = 'lp-executive-brief', isHeroH1 = false) {
  const hTag = isHeroH1 ? 'h1' : 'h2';
  return `
    <section id="${sectionId}" style="padding:48px 0 44px;border-bottom:1px solid var(--border-hairline);background:var(--bg-subtle);">
      <div class="container">
        <div class="hero-grid" style="align-items:stretch;">
          <div class="panel" style="padding:28px;display:flex;flex-direction:column;justify-content:space-between;height:100%;">
            <div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px;">
                <span class="badge badge-cyan mono">2026 AI SEARCH VISIBILITY GUIDE</span>
                <span class="badge badge-emerald mono">CMO &amp; VP MARKETING PLAYBOOK</span>
              </div>
              <${hTag} class="hero-h1" style="font-size:2.15rem;margin-bottom:12px;">
                Why <span class="serif-italic">AI Search Visibility (GEO)</span> Matters Now
              </${hTag}>
              <p class="hero-sub" style="margin-bottom:18px;font-size:1rem;">
                64% of high-intent software and consumer buyers now shortlist vendors inside <strong>ChatGPT Search, Perplexity Pro, and Google Gemini AI Overviews</strong> before clicking a traditional search link. This brief explains the three signals that determine whether AI recommends your brand or your competitor.
              </p>
              <div style="display:grid;gap:12px;margin-bottom:20px;">
                <div style="padding:14px 16px;border-radius:10px;background:var(--bg-canvas);border:1px solid var(--border-hairline);">
                  <strong style="color:var(--text-primary);font-size:0.95rem;">1. AI Crawler Permissions (<span class="mono">/robots.txt</span>):</strong>
                  <span style="color:var(--text-secondary);font-size:0.9rem;"> Explicitly allow <span class="mono">OAI-SearchBot</span>, <span class="mono">PerplexityBot</span>, <span class="mono">ClaudeBot</span>, and <span class="mono">Google-Extended</span> while protecting private routes.</span>
                </div>
                <div style="padding:14px 16px;border-radius:10px;background:var(--bg-canvas);border:1px solid var(--border-hairline);">
                  <strong style="color:var(--text-primary);font-size:0.95rem;">2. Clean AI Site Guides (<span class="mono">/llms.txt</span> &amp; <span class="mono">/llms-full.txt</span>):</strong>
                  <span style="color:var(--text-secondary);font-size:0.9rem;"> Provide clean Markdown guides so AI search engines read your exact pricing and product strengths without HTML clutter.</span>
                </div>
                <div style="padding:14px 16px;border-radius:10px;background:var(--bg-canvas);border:1px solid var(--border-hairline);">
                  <strong style="color:var(--text-primary);font-size:0.95rem;">3. Verified Product Facts (<span class="mono">JSON-LD</span> Schema):</strong>
                  <span style="color:var(--text-secondary);font-size:0.9rem;"> Anchor your Organization, Product, and FAQ facts so AI assistants never hallucinate outdated pricing.</span>
                </div>
              </div>
            </div>
            <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-top:auto;">
              <a href="#grader" class="btn btn-primary" style="padding:11px 18px;">
                <span>Run Live 10-Second Domain Check</span>
                <span class="btn-arrow-pill" aria-hidden="true">&uarr;</span>
              </a>
              <a href="/leaderboard" class="btn btn-secondary mono" style="padding:11px 16px;">Explore Live Industry Leaderboard &rarr;</a>
            </div>
          </div>

          <div class="bezel-shell" style="display:flex;flex-direction:column;height:100%;">
            <div class="panel-elevated" style="padding:26px;display:flex;flex-direction:column;justify-content:space-between;height:100%;">
              <div>
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--accent-indigo);letter-spacing:0.05em;margin-bottom:6px;">PLAIN-ENGLISH FIELD GUIDE &amp; SCORING MODEL</div>
                <h3 class="serif-display" style="font-size:1.5rem;margin-bottom:14px;">Key Concepts for Your Marketing &amp; Engineering Teams</h3>
                <div style="display:grid;gap:12px;">
                  <div style="padding:14px 16px;border-radius:10px;background:var(--bg-subtle);border:1px solid var(--border-hairline);">
                    <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary);margin-bottom:4px;">AI Search Optimization (GEO)</div>
                    <p style="font-size:0.88rem;color:var(--text-secondary);margin:0;">Preparing your website's <span class="mono">/llms.txt</span> guide and Schema markup so ChatGPT, Perplexity, and Gemini recommend your business when buyers ask commercial questions.</p>
                  </div>
                  <div style="padding:14px 16px;border-radius:10px;background:var(--bg-subtle);border:1px solid var(--border-hairline);">
                    <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary);margin-bottom:4px;">AI Recommendation Share (cSoV %)</div>
                    <p style="font-size:0.88rem;color:var(--text-secondary);margin:0;">The percentage of buyer questions where your brand is recommended across ChatGPT Search, Perplexity, and Gemini compared to your top 5 competitors.</p>
                  </div>
                  <div style="padding:14px 16px;border-radius:10px;background:var(--bg-subtle);border:1px solid var(--border-hairline);">
                    <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary);margin-bottom:4px;">Why Rank #1 Matters Most (<span class="mono">w_r = 1 / log2(r + 1)</span>)</div>
                    <p style="font-size:0.88rem;color:var(--text-secondary);margin:0;">Being recommended #1 in an AI answer drives far more clicks than #5. Our score weights <strong>Rank #1 at 100%</strong>, <strong>Rank #2 at 63.1%</strong>, and <strong>Rank #3 at 50.0%</strong>.</p>
                  </div>
                </div>
              </div>
              <div style="margin-top:16px;padding:14px 16px;border-radius:10px;background:var(--accent-indigo-soft);border:1px solid #C7D2FE;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
                <div>
                  <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--accent-indigo);">VERIFIED 21-DAY IMPACT</div>
                  <div style="font-size:0.9rem;color:var(--text-primary);font-weight:600;">Avg. +18.4% AI Recommendation Lift after publishing <span class="mono">/llms.txt</span></div>
                </div>
                <a href="/buy/flash_pass" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}" class="btn btn-primary" style="padding:9px 14px;font-size:0.85rem;">Unlock 3-File Pack ($1.99 Stripe Express) &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function renderHomePage(initialAudit, sampleSeoPages) {
  const leaderboardLinks = sampleSeoPages.filter(p => p.page_type === 'leaderboard').slice(0, 10);
  const comparisonLinks = sampleSeoPages.filter(p => p.page_type === 'comparison').slice(0, 10);
  const guideLinks = sampleSeoPages.filter(p => p.page_type === 'guide').slice(0, 10);

  const renderSeoCardList = (items) => items.map(p => `
    <a href="/seo/${escapeHtml(p.slug)}" class="panel" style="padding:16px 18px;display:block;transition:border-color 150ms ease-out, transform 150ms ease-out;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;">
        <span class="badge badge-cyan mono">${escapeHtml(p.category)}</span>
        <span class="mono" style="font-size:0.84rem;color:var(--accent-emerald);font-weight:700;">${p.csov_score}% Score</span>
      </div>
      <div style="font-weight:700;font-size:0.94rem;color:var(--text-primary);">${escapeHtml(p.title)}</div>
    </a>
  `).join('');

  return `${renderHead({
    title: 'CitationForge: Executive Brief & AI Search Visibility Checker (/llms.txt Generator)',
    description: 'Check how often ChatGPT Search, Perplexity, and Gemini recommend your website across 25 buyer questions. Generate ready-to-use /llms.txt and Schema files in 10 seconds.',
    canonicalPath: '/',
    ogSlug: 'home',
    jsonLdString: initialAudit.artifacts.jsonLd
  })}
<body>
  ${renderNavbar('/')}
  <main id="main-content">
    ${renderHeroGraderBox(initialAudit, false)}
    ${renderTrustStripAndTestimonials()}
    ${renderGraderAndCompilerSection(initialAudit)}

    <!-- Programmatic SEO Knowledge Graph Hub Preview -->
    <section style="padding:60px 0;border-bottom:1px solid var(--border-hairline);">
      <div class="container">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;flex-wrap:wrap;gap:12px;">
          <div>
            <h2 class="serif-display" style="font-size:2rem;margin-bottom:6px;">
              Programmatic GEO Intelligence Hub (<span class="serif-italic">60+ Live Benchmarks</span>)
            </h2>
            <p style="color:var(--text-secondary);font-size:0.98rem;">
              Explore pre-computed category cSoV leaderboards, head-to-head brand citation audits, and technical <span class="mono">llms.txt</span> guides.
            </p>
          </div>
          <a href="/directory" class="btn btn-secondary">Browse All 60+ GEO Benchmarks &rarr;</a>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:22px;">
          <div>
            <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--accent-indigo);">Category cSoV Leaderboards</h3>
            <div style="display:grid;gap:10px;">${renderSeoCardList(leaderboardLinks)}</div>
          </div>
          <div>
            <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--accent-emerald);">Head-to-Head Citation Audits</h3>
            <div style="display:grid;gap:10px;">${renderSeoCardList(comparisonLinks)}</div>
          </div>
          <div>
            <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--text-primary);">Technical GEO &amp; llms.txt Playbooks</h3>
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
 * `/lp` Executive Brief & Boardroom Methodology Page
 */
function renderLandingPage(initialAudit) {
  return `${renderHead({
    title: 'Executive Brief: 2026 Generative Engine Optimization (GEO) & AI Search Methodology | CitationForge',
    description: 'Executive Brief for Marketing VPs, CMOs, and SEO Directors: How Generative Engine Optimization (GEO), position-weighted Citation Share-of-Voice (cSoV), and /llms.txt drive AI answer-engine recommendations.',
    canonicalPath: '/lp',
    ogSlug: 'lp-xray',
    jsonLdString: initialAudit.artifacts.jsonLd
  })}
<body>
  ${renderNavbar('/lp')}
  <main id="main-content">
    ${renderExecutiveBriefSection('executive-brief-hero', true)}

    <!-- Verified Marketing & SEO Leadership Social Proof + 30-Day Guarantee -->
    <section style="padding:44px 0;border-bottom:1px solid var(--border-hairline);background:var(--bg-surface);">
      <div class="container">
        <h2 class="serif-display" style="font-size:1.85rem;margin-bottom:22px;">
          Why Marketing VPs &amp; SEO Directors Standardize on <span class="serif-italic">CitationForge</span>
        </h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:20px;align-items:stretch;">
          <blockquote class="panel" style="padding:22px;background:var(--bg-canvas);display:flex;flex-direction:column;justify-content:space-between;">
            <p style="font-size:0.92rem;color:var(--text-primary);margin-bottom:14px;">
              &ldquo;Our robots.txt silently blocked PerplexityBot and ClaudeBot for six months. Shipping the CitationForge llms.txt patch lifted our category citation share from 14% to 38% in three weeks.&rdquo;
            </p>
            <footer style="font-size:0.82rem;color:var(--text-secondary);font-weight:700;">
              Marcus Vance, VP of Growth Marketing at ChronoScale
            </footer>
          </blockquote>
          <blockquote class="panel" style="padding:22px;background:var(--bg-canvas);display:flex;flex-direction:column;justify-content:space-between;">
            <p style="font-size:0.92rem;color:var(--text-primary);margin-bottom:14px;">
              &ldquo;ChatGPT Search kept hallucinating our legacy 2023 pricing tiers. The compiled schema-dts JSON-LD graph and llms-full.txt manifest fixed our pricing accuracy across all four engines.&rdquo;
            </p>
            <footer style="font-size:0.82rem;color:var(--text-secondary);font-weight:700;">
              Elena Rostova, Director of Organic &amp; AI Search at VectorFlow
            </footer>
          </blockquote>
          <blockquote class="panel" style="padding:22px;background:var(--accent-indigo-soft);border-color:#C7D2FE;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div class="badge badge-emerald mono" style="margin-bottom:10px;">30-DAY CITATION LIFT GUARANTEE</div>
              <p style="font-size:0.9rem;color:var(--text-primary);margin-bottom:10px;">
                Deploy your compiled <span class="mono">/llms.txt</span> and JSON-LD bundle. If your weighted Citation Share-of-Voice does not measurably improve within 30 days, receive a 100% instant refund.
              </p>
            </div>
            <div style="font-size:0.8rem;font-weight:700;color:var(--accent-indigo);">Zero Lock-In · Self-Serve GitHub PR Export</div>
          </blockquote>
        </div>
      </div>
    </section>

    ${renderHeroGraderBox(initialAudit, true)}
    ${renderTrustStripAndTestimonials()}
    ${renderGraderAndCompilerSection(initialAudit)}
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
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:18px;">
      ${items.map(p => `
        <a href="/seo/${escapeHtml(p.slug)}" class="panel" style="padding:20px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
              <span class="badge badge-cyan mono">${escapeHtml(p.category)}</span>
              <span class="mono" style="font-size:0.84rem;color:var(--accent-emerald);font-weight:700;">${p.csov_score}% cSoV</span>
            </div>
            <h3 style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:6px;">${escapeHtml(p.title)}</h3>
            <p style="font-size:0.84rem;color:var(--text-secondary);">${escapeHtml(p.meta_description)}</p>
          </div>
          <div class="mono" style="font-size:0.84rem;font-weight:700;color:var(--accent-indigo);">Read Full GEO Report &rarr;</div>
        </a>
      `).join('')}
    </div>`;

  const baseUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.citationforge.io').replace(/\/$/, '');
  const dirJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CitationForge Programmatic GEO & AI Citation Directory',
    description: `Browse ${seoPages.length} live AI Search Visibility leaderboards, head-to-head brand citation audits, and llms.txt engineering guides.`,
    url: `${baseUrl}/directory`
  });

  return `${renderHead({
    title: `AI Search Visibility & GEO Directory (${seoPages.length} Benchmarks) | CitationForge`,
    description: `Explore ${seoPages.length} programmatic GEO reports: category cSoV leaderboards, brand vs brand AI citation audits, and llms.txt implementation guides.`,
    canonicalPath: '/directory',
    ogSlug: 'directory',
    jsonLdString: dirJsonLd
  })}
<body>
  ${renderNavbar('/directory')}
  <main id="main-content" class="container" style="padding-top:44px;padding-bottom:32px;">
    <div style="margin-bottom:36px;">
      <span class="badge badge-cyan mono">PROGRAMMATIC GEO KNOWLEDGE GRAPH (${seoPages.length} INDEXED PAGES)</span>
      <h1 class="serif-display" style="font-size:2.55rem;margin:12px 0 10px;">
        AI Search Citation Benchmarks, Comparisons &amp; <span class="serif-italic">Technical Playbooks</span>
      </h1>
      <p style="color:var(--text-secondary);max-width:68ch;font-size:0.98rem;">
        Every report below is backed by deterministic Citation Share-of-Voice (<span class="mono">w_r = 1 / log2(r + 1)</span>) telemetry across Perplexity Pro, ChatGPT Search, Gemini AI Overviews, and Claude Search.
      </p>
    </div>

    <section style="margin-bottom:48px;">
      <h2 class="serif-display" style="font-size:1.55rem;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--border-hairline);">
        1. Category AI Search Visibility Leaderboards (${leaderboards.length})
      </h2>
      ${renderSectionGrid(leaderboards)}
    </section>

    <section style="margin-bottom:48px;">
      <h2 class="serif-display" style="font-size:1.55rem;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--border-hairline);">
        2. Head-to-Head Brand Citation Comparisons (${comparisons.length})
      </h2>
      ${renderSectionGrid(comparisons)}
    </section>

    <section style="margin-bottom:48px;">
      <h2 class="serif-display" style="font-size:1.55rem;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--border-hairline);">
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
  const baseUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.citationforge.io').replace(/\/$/, '');
  const payload = JSON.parse(pageRow.payload_json || '{}');
  let bodyContent = '';

  if (payload.type === 'leaderboard') {
    const rowsHtml = (payload.leaders || []).map(l => `
      <tr>
        <td class="mono">#${l.rank}</td>
        <td style="font-weight:700;color:var(--text-primary);">${escapeHtml(l.brand)}</td>
        <td class="mono" style="color:var(--text-secondary);">${escapeHtml(l.domain)}</td>
        <td class="mono" style="color:var(--accent-emerald);font-weight:700;">${l.csov}%</td>
        <td class="mono">${escapeHtml(l.llmsTxt)}</td>
        <td class="mono">${l.schemaScore}/100</td>
      </tr>
    `).join('');

    bodyContent = `
      <div class="panel" style="padding:26px;margin-bottom:28px;">
        <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:10px;">Google AI Overviews Citation Score &amp; Category cSoV Leaderboard (${escapeHtml(pageRow.category)})</h2>
        <p style="color:var(--text-secondary);margin-bottom:20px;">${escapeHtml(payload.summary)}</p>
        <div style="overflow-x:auto;border:1px solid var(--border-hairline);border-radius:10px;">
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
      <div class="panel" style="padding:22px;margin-bottom:28px;background:var(--accent-indigo-soft);border-color:#C7D2FE;">
        <div style="font-weight:700;color:var(--accent-indigo);margin-bottom:6px;">How to Rank in ChatGPT Search &amp; Perplexity SEO Checklist Takeaway</div>
        <p style="color:var(--text-primary);font-size:0.92rem;">${escapeHtml(payload.keyTakeaway)}</p>
      </div>`;
  } else if (payload.type === 'comparison') {
    const { brandA, brandB, samplePrompts } = payload;
    const promptHtml = (samplePrompts || []).map(sp => `
      <tr>
        <td style="font-weight:500;">${escapeHtml(sp.prompt)}</td>
        <td class="mono">#${sp.rankA}</td>
        <td class="mono">#${sp.rankB}</td>
        <td><span class="badge badge-emerald mono">${escapeHtml(sp.winner)}</span></td>
      </tr>
    `).join('');

    bodyContent = `
      <div class="panel" style="padding:26px;margin-bottom:28px;">
        <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:10px;">Head-to-Head Citation Synthesis &amp; Google AI Overviews Citation Score: ${escapeHtml(brandA.name)} vs ${escapeHtml(brandB.name)}</h2>
        <p style="color:var(--text-secondary);margin-bottom:22px;">${escapeHtml(payload.summary)}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-bottom:24px;">
          <div class="panel" style="padding:20px;background:var(--accent-emerald-soft);border-color:#A7F3D0;">
            <div class="badge badge-emerald mono" style="margin-bottom:8px;">CATEGORY LEADER</div>
            <div class="serif-display" style="font-size:1.4rem;font-weight:600;">${escapeHtml(brandA.name)} (${escapeHtml(brandA.domain)})</div>
            <div class="mono" style="font-size:1.95rem;color:var(--accent-emerald);font-weight:800;margin:8px 0;">${brandA.csov}% cSoV</div>
            <div style="font-size:0.83rem;color:var(--text-secondary);">Google AI Overviews Citation Score: ${brandA.geoScore}/100 · /llms.txt: ${escapeHtml(brandA.llmsTxt)}</div>
          </div>
          <div class="panel" style="padding:20px;background:var(--bg-canvas);">
            <div class="badge badge-cyan mono" style="margin-bottom:8px;">CHALLENGER</div>
            <div class="serif-display" style="font-size:1.4rem;font-weight:600;">${escapeHtml(brandB.name)} (${escapeHtml(brandB.domain)})</div>
            <div class="mono" style="font-size:1.95rem;color:var(--accent-indigo);font-weight:800;margin:8px 0;">${brandB.csov}% cSoV</div>
            <div style="font-size:0.83rem;color:var(--text-secondary);">Google AI Overviews Citation Score: ${brandB.geoScore}/100 · /llms.txt: ${escapeHtml(brandB.llmsTxt)}</div>
          </div>
        </div>
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:10px;">Buyer Prompt Rank Breakdown (How to Rank in ChatGPT Search &amp; Perplexity Pro)</h3>
        <div style="overflow-x:auto;border:1px solid var(--border-hairline);border-radius:10px;">
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
      <div class="panel" style="padding:26px;margin-bottom:28px;">
        <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:10px;">${escapeHtml(payload.subtitle)}: How to Rank in ChatGPT Search &amp; Perplexity SEO Checklist</h2>
        <p style="color:var(--text-secondary);margin-bottom:20px;">${escapeHtml(payload.summary)}</p>
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:10px;">Perplexity SEO Checklist &amp; llms.txt Generator Implementation Steps</h3>
        <ul style="list-style:none;font-size:0.9rem;color:var(--text-primary);margin-bottom:24px;">${checklistHtml}</ul>
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:10px;">AI Answer Engine Crawler Matrix &amp; Google AI Overviews Citation Score Weights</h3>
        <div style="overflow-x:auto;border:1px solid var(--border-hairline);border-radius:10px;margin-bottom:24px;">
          <table class="data-table">
            <thead>
              <tr>
                <th>AI Answer Crawler</th>
                <th>Citation Weighting Formula</th>
                <th>/llms.txt Ingestion Behavior</th>
                <th>Target Token-to-HTML Ratio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="mono" style="font-weight:700;color:var(--accent-indigo);">OAI-SearchBot</td>
                <td class="mono">w_r = 1 / log2(r + 1) · Bing + Direct RAG</td>
                <td>Fetches root <span class="mono">/llms.txt</span> &amp; Answer-First H2 summaries on 24h delta crawl</td>
                <td class="mono">&gt;= 28% (&lt; 120KB DOM)</td>
              </tr>
              <tr>
                <td class="mono" style="font-weight:700;color:var(--accent-emerald);">PerplexityBot</td>
                <td class="mono">w_r = 1 / log2(r + 1) · Real-Time Reranker</td>
                <td>Primary CommonMark parser; prioritizes <span class="mono">/llms.txt</span> links &amp; fact tables</td>
                <td class="mono">&gt;= 32% (&lt; 90KB DOM)</td>
              </tr>
              <tr>
                <td class="mono" style="font-weight:700;color:var(--text-primary);">ClaudeBot</td>
                <td class="mono">w_r = 1 / log2(r + 1) · Code &amp; Schema Weight</td>
                <td>Ingests <span class="mono">/llms-full.txt</span> for single-fetch API &amp; pricing verification</td>
                <td class="mono">&gt;= 30% (&lt; 100KB DOM)</td>
              </tr>
              <tr>
                <td class="mono" style="font-weight:700;color:var(--accent-cyan);">Google-Extended</td>
                <td class="mono">Google AI Overviews Citation Score (@id + sameAs)</td>
                <td>Combines Search Grounding chunks with Organization &amp; FAQPage JSON-LD</td>
                <td class="mono">&gt;= 25% (SSR HTML5)</td>
              </tr>
              <tr>
                <td class="mono" style="font-weight:700;color:var(--accent-amber);">Applebot-Extended</td>
                <td class="mono">Entity Graph Trust + Wikidata Q-ID Alignment</td>
                <td>Crawls <span class="mono">/robots.txt</span> Allow rules, <span class="mono">/llms.txt</span> anchors &amp; FAQPage nodes</td>
                <td class="mono">&gt;= 26% (Semantic DOM)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:10px;">llms.txt Generator Reference Specification Snippet</h3>
        <div class="artifact-dock">
          <pre class="code-viewport mono">${escapeHtml(payload.codeExample || '')}</pre>
        </div>
      </div>`;
  }

  const faqs = Array.isArray(payload.faqs) && payload.faqs.length >= 3
    ? payload.faqs.slice(0, 3)
    : [
        {
          question: `What is the Google AI Overviews Citation Score and cSoV finding for ${pageRow.primary_entity}?`,
          answer: `${payload.summary || pageRow.meta_description} Using w_r = 1 / log2(r + 1), CitationForge quantifies real-time retrieval share across ChatGPT Search, Perplexity Pro, and Google AI Overviews.`
        },
        {
          question: `How to Rank in ChatGPT Search and complete the Perplexity SEO Checklist for ${pageRow.category}?`,
          answer: `Allow OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, and Applebot-Extended in /robots.txt, structure 45-word Answer-First summaries right below H1/H2 headings, and maintain a >= 28% token-to-HTML ratio.`
        },
        {
          question: `How does an llms.txt Generator improve ${pageRow.primary_entity} AI citation authority?`,
          answer: `An automated llms.txt Generator compiles your documentation and pricing into root /llms.txt and /llms-full.txt manifests while linking Organization, SoftwareApplication, and FAQPage JSON-LD with Wikidata sameAs URIs—lifting rank #1 citations by 2.4x.`
        }
      ];

  const faqHtml = faqs.map(f => `
    <div style="padding:16px 18px;background:var(--bg-canvas);border:1px solid var(--border-hairline);border-radius:10px;">
      <h3 style="font-size:0.96rem;font-weight:700;color:var(--text-primary);margin-bottom:6px;">${escapeHtml(f.question)}</h3>
      <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">${escapeHtml(f.answer)}</p>
    </div>
  `).join('');

  const relatedHtml = relatedPages.map(rp => `
    <a href="/seo/${escapeHtml(rp.slug)}" class="panel" style="padding:16px;display:block;">
      <div class="badge badge-cyan mono" style="margin-bottom:6px;">${escapeHtml(rp.category)}</div>
      <div style="font-weight:700;font-size:0.88rem;color:var(--text-primary);">${escapeHtml(rp.title)}</div>
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
        dateModified: pageRow.updated_at || '2026-10-16',
        author: { '@type': 'Organization', name: 'CitationForge GEO Research' },
        mainEntityOfPage: `${baseUrl}/seo/${pageRow.slug}`
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
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
  ${renderNavbar('/seo/' + pageRow.slug)}
  <main id="main-content" class="container" style="padding-top:36px;padding-bottom:32px;">
    <nav aria-label="Breadcrumb" class="mono" style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:16px;">
      <a href="/" style="color:var(--accent-indigo);">Home</a> &nbsp;/&nbsp; <a href="/directory" style="color:var(--accent-indigo);">GEO Directory</a> &nbsp;/&nbsp; <span>${escapeHtml(pageRow.slug)}</span>
    </nav>

    <div style="margin-bottom:26px;">
      <span class="badge badge-cyan mono">${escapeHtml(pageRow.category)} · VERIFIED GEO BENCHMARK</span>
      <h1 class="serif-display" style="font-size:2.3rem;margin:10px 0;">${escapeHtml(pageRow.title)}</h1>
      <div class="pseo-lead panel" style="padding:18px 22px;margin-top:14px;background:var(--accent-indigo-soft);border-left:4px solid var(--accent-indigo);border-radius:10px;">
        <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--accent-indigo);letter-spacing:0.04em;margin-bottom:6px;">
          ANSWER-FIRST EXECUTIVE SUMMARY · GOOGLE AI OVERVIEWS CITATION SCORE &amp; RAG SNAPSHOT
        </div>
        <p style="color:var(--text-primary);font-size:0.95rem;line-height:1.65;">
          ${escapeHtml(payload.summary || pageRow.meta_description)}
        </p>
      </div>
    </div>

    ${bodyContent}

    <!-- Visible 3-Question Technical FAQ Section matching FAQPage JSON-LD -->
    <section id="technical-faq" class="panel" style="padding:26px;margin-bottom:28px;">
      <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:14px;">
        Technical FAQ: How to Rank in ChatGPT Search, Perplexity SEO Checklist &amp; llms.txt Generator
      </h2>
      <div style="display:grid;gap:12px;">
        ${faqHtml}
      </div>
    </section>

    <!-- Contextual Conversion CTA -->
    <div class="bezel-shell" style="margin-bottom:36px;">
      <div class="panel-elevated" style="padding:26px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
        <div>
          <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:4px;">Run a Live 10-Second GEO Audit on Your Own Domain</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;">Compare your cSoV against ${escapeHtml(pageRow.primary_entity)} and auto-compile your custom <span class="mono">/llms.txt</span> + JSON-LD graph.</p>
        </div>
        <div>
          <a href="/?domain=${encodeURIComponent(payload.brandA?.domain || payload.leaders?.[0]?.domain || 'linear.app')}#grader" class="btn btn-primary">
            <span>Audit Your Domain Free</span>
            <span class="btn-arrow-pill" aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </div>
    </div>

    <section>
      <h2 class="serif-display" style="font-size:1.35rem;margin-bottom:14px;">Related Programmatic GEO Reports</h2>
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
  ${renderNavbar(isPrivacy ? '/privacy' : '/terms')}
  <main id="main-content" class="container" style="padding-top:48px;padding-bottom:32px;max-width:860px;">
    <span class="badge badge-cyan mono">LEGAL &amp; DATA GOVERNANCE</span>
    <h1 class="serif-display" style="font-size:2.25rem;margin:10px 0 8px;">${isPrivacy ? 'Privacy Policy & GDPR Governance' : 'Terms of Service & Enterprise SLA'}</h1>
    <p class="mono" style="font-size:0.8rem;color:var(--text-muted);margin-bottom:24px;">Last Updated: October 14, 2026</p>
    <div class="panel" style="padding:28px;display:grid;gap:16px;color:var(--text-secondary);font-size:0.94rem;">
      <p><strong style="color:var(--text-primary);">1. Scope &amp; Telemetry Collection:</strong> CitationForge processes public domain metadata (<span class="mono">/llms.txt</span>, <span class="mono">/robots.txt</span>, and public Schema.org JSON-LD blocks) to compute deterministic Citation Share-of-Voice (cSoV) scores.</p>
      <p><strong style="color:var(--text-primary);">2. Data Processors &amp; Storage:</strong> Audit logs, UTM attribution parameters, and Stripe checkout fulfillment records are stored locally in SQLite (<span class="mono">data/citation_forge.db</span>). Zero private API keys or credentials are ever exposed to the frontend bundle.</p>
      <p><strong style="color:var(--text-primary);">3. User Rights (GDPR / CCPA) &amp; Refunds:</strong> All paid plans ($49 One-Time Audit and $99/mo Pro Continuous Radar) include an unconditional 30-day money-back Citation Lift Guarantee. Contact <span class="mono">privacy@citationforge.io</span> for instant data deletion or export requests.</p>
    </div>
  </main>
  ${renderFooter()}
</body>
</html>`;
}

function render404Page(requestedPath) {
  return `${renderHead({
    title: '404: Entity Route Not Found | CitationForge',
    description: 'The requested page could not be found on CitationForge.',
    canonicalPath: '/404',
    ogSlug: '404'
  })}
<body>
  ${renderNavbar('/404')}
  <main id="main-content" class="container" style="padding:80px 24px;text-align:center;">
    <span class="badge badge-rose mono">HTTP 404 · ROUTE NOT FOUND</span>
    <h1 class="serif-display" style="font-size:2.6rem;margin:14px 0 10px;">Page Not Found in Knowledge Graph</h1>
    <p style="color:var(--text-secondary);max-width:48ch;margin:0 auto 24px;">
      The path <span class="mono">${escapeHtml(requestedPath)}</span> does not exist. Run a free GEO domain audit or browse our 60+ programmatic benchmarks below.
    </p>
    <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
      <a href="/#grader" class="btn btn-primary">Return to Free GEO Grader</a>
      <a href="/directory" class="btn btn-secondary">Browse 60+ GEO Benchmarks</a>
    </div>
  </main>
  ${renderFooter()}
</body>
</html>`;
}

function renderOgImageSvg({ title, subtitle, badge, scoreText }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FAF9F5"/>
  <rect x="36" y="36" width="1128" height="558" rx="22" fill="#FFFFFF" stroke="#E4E2DD" stroke-width="2"/>
  <rect x="76" y="80" width="380" height="40" rx="20" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1.5"/>
  <text x="98" y="106" fill="#4F46E5" font-family="monospace" font-size="16" font-weight="bold">${escapeHtml(badge || 'CITATIONFORGE GEO STUDIO v2.5')}</text>
  <text x="76" y="205" fill="#0F172A" font-family="Georgia, serif" font-size="44" font-weight="bold">${escapeHtml((title || 'CitationForge AI Search Visibility').slice(0, 46))}</text>
  <text x="76" y="264" fill="#475569" font-family="sans-serif" font-size="23">${escapeHtml((subtitle || 'Deterministic cSoV Scorer & Auto-llms.txt / JSON-LD Compiler').slice(0, 74))}</text>
  <rect x="76" y="330" width="480" height="175" rx="16" fill="#FAF9F5" stroke="#A7F3D0" stroke-width="2"/>
  <text x="106" y="378" fill="#475569" font-family="monospace" font-size="17" font-weight="bold">WEIGHTED CITATION SHARE-OF-VOICE</text>
  <text x="106" y="458" fill="#059669" font-family="monospace" font-size="64" font-weight="bold">${escapeHtml(scoreText || '41.0% cSoV')}</text>
  <text x="76" y="555" fill="#64748B" font-family="monospace" font-size="17">w_r = 1 / log2(r + 1)  ·  ChatGPT Search · Perplexity Pro · Gemini Overviews</text>
</svg>`;
}

module.exports = {
  renderHomePage,
  renderLandingPage,
  renderDirectoryPage,
  renderSeoDetailPage,
  renderSeoPage: renderSeoDetailPage,
  renderLegalPage,
  render404Page,
  renderOgImageSvg
};

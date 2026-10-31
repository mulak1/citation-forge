# SeatHarmony Studio (`citation-forge`) Engineering & UX Rules

All changes to this repository must obey these rules without exception:

1. **Zero B2B / AI / SEO Middleware Leaks**:
   - `exact-baseline-ui.js` must remain bypassed (`moduleId === 'citation_forge'`) so B2B strings (`"AI Search Fix Pack"`, `"STEP 3 OF 3"`, `"Full 3-File AI Pack"`, `"Get all 3 AI search fix files"`, `"Built for Founders & Marketers"`, `"/llms.txt"`) never appear on `/`, `/directory`, `/for/:persona`, `/compare/:competitor`, or `/case-studies/:slug`.
2. **Logical Top-to-Bottom Flow & Zero Duplication**:
   - Steps must appear in strict 1 → 2 → 3 order.
   - Never stack duplicate `"Jump to Interactive Studio"` CTAs or duplicate pricing/comparison sections on the same page.
3. **Zero Cut-Off Text & Zero Internal Vault Codes (`#SH-4819`)**:
   - Never clip badges, pills, or headers with `text-overflow: ellipsis`, and never show `#SH-4819` or `TEST ACCOUNT` boxes in user-facing UI (including `#sh-vault-modal` and `#shw-pop`).
4. **Complete Human Photography & Clean SVGs**:
   - All 6 testimonial cards must display real portrait photos (`naturalWidth > 0`), never fallback initials circles.
   - SVG diagrams on `/` and `/for/:persona` must have zero label/table overlap.
5. **1-Click Interactive Verification (Playwright)**:
   - Every button/link (`Review & fine-tune floorplan →`, `Clear everything`, `Save`, studio tabs, presets) must be clicked in Playwright and verified after `>= 700ms` so hidden containers, tab IDs (`'floorplan'`), and debounce timers (`shwSaveTimer`, `__shPersistTimer`) behave as expected in 1 click.
6. **Deploy Directly to Production**:
   - After Playwright verification passes, push to `main` and deploy via `npx -y @railway/cli up --service 547381f4-9ba2-478a-af2a-0b615dcc375a --detach` without asking first.

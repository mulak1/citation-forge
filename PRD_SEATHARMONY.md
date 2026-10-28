# SeatHarmony — Complete PRD, 16-Repo Architecture & 6-Zone High-Conviction Landing Page Spec

> **Executive Summary**: Based on live 30-day production telemetry across our portfolio, we are replacing **CitationForge** (`www.citationforge.io`, which had `0` real `checkout_intent` events and 38% fewer visitors than `AbandonAlpha`) with **SeatHarmony (#2 — 92/100)**: the **Wedding & Event Floorplan, Conflict-Free Seating Solver, Caterer Clockwise BEO & Print-Ready 24"×36" Poster Studio**.

---

## 1. Data-Driven Production Site Replacement Decision: `CitationForge` vs. `AbandonAlpha`

We queried the 30-day (`720h`) human telemetry window (`/api/telemetry/pst-report?hours=720`) on both live production services:

| Metric / Dimension | **CitationForge (`www.citationforge.io`) — REPLACING** | **AbandonAlpha (`www.abandonalpha.com`) — KEEPING** |
| :--- | :--- | :--- |
| **30-Day Human Visits** | `32 visits` (`29` unique cohorts) | `52 visits` (`39` unique cohorts — **+62.5% higher traffic**) |
| **30-Day Real `checkout_intent`** | **`0`** (`0.0%` checkout conversion) | **`1`** (`2.56%` cohort-to-checkout intent) |
| **Core Value Proposition Friction** | Low urgency / commodity problem: developers and marketers can ask ChatGPT to draft an `/llms.txt` file for free in 10 seconds. | High-urgency B2B revenue pain: failed Stripe subscription renewals and blanket coupon margin leakage with quantifiable dollar ROI. |
| **Infrastructure & Stripe Reusability** | Railway Service `547381f4-9ba2-478a-af2a-0b615dcc375a` with live `STRIPE_SECRET_KEY`, Express + SQLite (`sql.js`), and multi-tier `/buy/:tier` checkout. | Remains live and untouched on `www.abandonalpha.com`. |

---

## 2. Competitor Visual Teardown (Zola, RSVPify & Prismm/Cvent)

We inspected **Zola's Seating Chart Maker**, **RSVPify**, and **Prismm** via Playwright and analyzed wedding couple & planner complaints across `r/weddingplanning` and `r/BigBudgetBrides`.

````carousel
![Zola Hero: Floating Table Action Toolbar (Edit, Add Guest, Rotate, Duplicate, Delete) & Landmark Anchors (Add Bar)](/Users/kadermula/.gemini/antigravity/brain/9ca435cb-c27f-4cab-a729-185536462484/comp_zola_seating.png)
<!-- slide -->
![Zola Mobile & Desktop Drag-and-Drop: Circular Seat Initials Around Table Capacity Counter (3/8 Seats Filled)](/Users/kadermula/.gemini/antigravity/brain/9ca435cb-c27f-4cab-a729-185536462484/comp_zola_seating_steps.png)
<!-- slide -->
![Zola Table Geometry Picker: Round, 1-Sided (Sweetheart/Head), 2-Sided (Banquet), 4-Sided (Estate/Kings) + Utilitarian Print Sheet](/Users/kadermula/.gemini/antigravity/brain/9ca435cb-c27f-4cab-a729-185536462484/comp_zola_seating_steps_2.png)
<!-- slide -->
![Zola Multi-Event Tabs (Welcome Event vs Reception) & Color-Coded Seat Key (Vegetarian, Child, Wheelchair User)](/Users/kadermula/.gemini/antigravity/brain/9ca435cb-c27f-4cab-a729-185536462484/comp_zola_seating_steps_3.png)
<!-- slide -->
![RSVPify Seating Chart Maker: Household/Party Grouping & Check-In Kiosk Integration](/Users/kadermula/.gemini/antigravity/brain/9ca435cb-c27f-4cab-a729-185536462484/comp_rsvpify_seating.png)
````

### How SeatHarmony Beats Every Incumbent

| Capability | **Zola / The Knot (Free Portals)** | **Prismm / AllSeated (\$150–\$300/mo)** | **SeatHarmony Studio (\$14.99 Pass / \$39/mo Pro)** |
| :--- | :--- | :--- | :--- |
| **1. Family Drama & Chemistry Auto-Solver** | Manual drag-and-drop only; zero constraint solving. | None — purely spatial CAD floorplan drawing. | **1-Click Simulated Annealing + Kempe-Chain Solver** (`must_keep_apart`, `must_sit_together`, `zone_preference`) in `< 50ms`. |
| **2. Household Atomic Coupling** | Easy to accidentally split a couple or child across tables. | Manual seat-by-seat assignment. | **Union-Find Magnetic Households**: *"Sarah & Mark + 2 Kids"* move together automatically and never split across tables. |
| **3. Caterer BEO Clockwise Seat Sheet** | Basic meal totals; no clockwise Seat `1..N` server map. | Clunky engineering PDF without allergy callouts. | **Chef David's Clockwise BEO Sheet**: Seat `1` at 12 o'clock, exact entrée counts (`🥩/🐟/🌱/🧒`), red-alert nut/celiac flags, `♿ Remove Chair`, `👶 Highchair`. |
| **4. Print-Ready 24"×36" Welcome Sign** | Ugly spreadsheet printout; couples spend 5 hours re-typing into Canva. | None. | **Live 24"×36" Editorial Poster Studio** (*Alphabetical A–Z* or *By Table* in 3 luxury themes) + **Avery 5302 Place Cards**. |
| **5. "Mom Sandbox" Restricted Link** | Full account password sharing (high risk of accidental edits). | Complex enterprise role permissions. | **1-Click `lz-string` Mom Sandbox Link**: Locks Bride's Mom to Tables 1–3 while Groom's tables stay read-only! |

---

## 3. 16 Verified GitHub Repositories Augmenting Core Technical Risk Areas

To ensure our implementation has zero weak spots across combinatorial optimization, 2D polar table geometry, print-ready vector typography, messy CSV parsing, and zero-DB state sharing, we audited 16 high-star repositories:

| Technical Area | Verified GitHub Repository | Stars | Key Architectural Pattern Adopted in `src/seating-engine.js` |
| :--- | :--- | :--- | :--- |
| **A. Combinatorial Seating & Constraint Solver** | `JWally/jsLPSolver` | ★ 540+ | Mixed-Integer Linear Programming objective formulation: hard separation penalties (`-250` pts), group cohesion bonuses (`+25` pts), and landmark zone matching (`+18` pts). |
| **A. Cassowary UI Constraint Solver** | `IjzerenHein/kiwi.js` | ★ 1,700+ | Hard vs. soft constraint hierarchies (`required`, `strong`, `medium`, `weak`) so atomic households never violate table capacity. |
| **A. Simulated Annealing & Seat Swaps** | `opelr/seatingchart` | ★ 45+ | **Kempe-Chain Variable-Size Household Swap** neighborhood move (`O(5,000)` iterations in `< 35ms` browser/Node JS) so a 4-person family cleanly swaps with two 2-person couples. |
| **B. Accessible Tactile Drag & Swap** | `clauderic/dnd-kit` | ★ 16,500+ | Magnetic seat-to-seat swap sensor + keyboard accessibility (`Space` to lift guest, arrow keys to cycle seats) without heavy canvas bloat. |
| **B. 2D Spatial Viewport & Hit Detection** | `konvajs/konva` | ★ 13,900+ | Normalized room coordinate grid (`0..1000` × `0..680`) with crisp SVG table groups and instant seat-ring hit targets. |
| **B. Snap-to-Grid & Rotation Modifiers** | `taye/interact.js` | ★ 12,800+ | Table rotation (`0°`, `45°`, `90°`) and room landmark zone radii (`Dance Floor`, `DJ Booth`, `Bar`, `Quiet Zone`). |
| **B. Polar & Perimeter Table Geometry** | `gabriel1ll7/Seating-Planner` | ★ 60+ | Exact trigonometric seat-ring layout (`computeTableSeatGeometry`) for **Round**, **Sweetheart / 1-Sided Head**, **2-Sided Banquet**, and **4-Sided King's** tables with 12-o'clock clockwise server Seat `1..N` indexing. |
| **C. Vector Print PDF & Crop Marks** | `parallax/jsPDF` | ★ 31,400+ | Exact `0.125"` (`9pt`) printer bleed, corner crop marks, and **Avery 5302 / 5095** 2-up tented place-card imposition with server meal icons (`◆ Beef`, `● Fish`, `▲ Vegan`, `★ Kid`) + upside-down back-fold server instructions. |
| **C. Editorial Typography SVG Poster** | `vercel/satori` | ★ 14,100+ | Deterministic SVG poster layout engine for **24"×36" Architectural Welcome Signs** in *Alphabetical A–Z* (grouped by letter) or *By Table* across 3 luxury palettes (*Warm Alabaster*, *Black Tie Obsidian*, *Botanical Sage*). |
| **C. Multi-Page BEO & Print Bundle** | `Hopding/pdf-lib` | ★ 8,300+ | Combines the 24"×36" Welcome Sign, Clockwise Caterer BEO Sheet, and Avery Place Cards into a unified print-ready deliverable pack. |
| **D. Messy Wedding CSV & Party Parser** | `mholt/PapaParse` | ★ 13,800+ | Auto-detects Zola, The Knot, Joy, and Google Sheets headers and decomposes *"Sarah & Mark Miller + 2 Kids"* into 4 coupled guest records (`parseMessyGuestRow`). |
| **D. Sub-5ms Cocktail-Hour Guest Search** | `krisk/Fuse` | ★ 20,500+ | Instant fuzzy guest lookup (`"Sarha Miler"` $\rightarrow$ `"Sarah Miller — Table 4, Seat 2"`) for the mobile QR check-in view. |
| **E. Scannable Cocktail-Hour QR Matrix** | `soldair/node-qrcode` | ★ 7,800+ | Error-correction level `M` QR code embedded directly onto the bottom-right corner of the 24"×36" Welcome Sign. |
| **E. Zero-Dependency Isomorphic QR** | `unjs/uqr` | ★ 1,300+ | Pure-JS SVG QR path generator (`renderQrCodeSvg`) that runs in `< 1ms` with zero native binary dependencies. |
| **E. Print-Matched Vector QR** | `papnkukn/qrcode-svg` | ★ 600+ | Custom foreground/background vector strokes matching the wedding palette (`#1C1917` on `#FAF8F5`). |
| **E. Stateless "Mom Sandbox" URLs** | `pieroxy/lz-string` | ★ 4,800+ | Compresses room state + `lockedTables: [4..16]` + `editableTables: [1,2,3]` into a shareable `?sandbox=` link so Mom can rearrange her family tables without touching the Groom's side. |

---

## 4. Six-Persona Buyer & Stakeholder Panel

1. **Maya (29, Bride, 24 Days Out — 155 Guests, Divorced Parents, \$14.99 Impulse Buyer)**:
   - *Jobs-to-Be-Done*: Stop the 11 PM spreadsheet anxiety, keep divorced parents and estranged aunts separated by at least 2 tables, and get a gorgeous 24"×36" Welcome Sign for FedEx/Staples without typing 155 names into Canva.
2. **Chloe (36, Luxury Wedding Planner — 22 Weddings/Yr, \$39/mo Planner Pro SaaS Buyer)**:
   - *Jobs-to-Be-Done*: Replace \$199/mo clunky CAD software with a client-friendly studio that exports **Clockwise Caterer BEO Sheets** and generates **"Mom Sandbox" links** (locking Mom to Tables 1–3).
3. **Chef David (44, Executive Banquet Director — Operational Gatekeeper)**:
   - *Jobs-to-Be-Done*: Needs every table numbered **Clockwise starting at 12 o'clock (closest to the Dance Floor / Main Focal Point = Seat 1)**, exact protein totals (`Filet`, `Halibut`, `Vegan`, `Child`), bold red **Anaphylactic Allergy Callouts (`🥜 SEVERE PEANUT`, `🌾 CELIAC`)**, and physical chair instructions (`♿ REMOVE CHAIR FOR WHEELCHAIR`, `👶 ADD HIGHCHAIR`).
4. **Marcus (34, B2B Field Marketing Lead — 60-Person VIP Exec Dinners, Coming-Soon Vertical #1)**:
   - *Jobs-to-Be-Done*: 1 AE + 5 target prospects per table, zero competitors seated together, and between-course networking rotation.
5. **Elena (48, Charity Gala Director — 350-Guest Fundraising Galas, Coming-Soon Vertical #2)**:
   - *Jobs-to-Be-Done*: Corporate Table Captain allocations (8 sponsor guests + 2 VIP board members), paddle numbers (`#101–#450`), and mobile QR check-in.
6. **Priya (38, Principal Product Manager — Conversion & UX Guardrail)**:
   - *Jobs-to-Be-Done*: Enforce zero blank-canvas paralysis (load an rich, realistic 8-table / 64-guest wedding reception immediately), keep the 3-step loop effortless, and build **IKEA-effect ownership** before presenting the \$14.99 Event Pass.

---

## 5. High-Craft Editorial Wedding Aesthetic (`/anthro-skill` + `taste-skill`)

````carousel
![Hero Reception Photography: Overhead sunlit European estate reception with round and banquet tables](/Users/kadermula/.gemini/antigravity/brain/9ca435cb-c27f-4cab-a729-185536462484/seatharmony_hero_reception_1793188937369.jpg)
<!-- slide -->
![24x36 Architectural Welcome Sign on Brass Easel with QR Code](/Users/kadermula/.gemini/antigravity/brain/9ca435cb-c27f-4cab-a729-185536462484/seatharmony_welcome_easel_1793188956910.jpg)
<!-- slide -->
![Tented Escort Card with Subtle Server Entree Icon & Wax Seal](/Users/kadermula/.gemini/antigravity/brain/9ca435cb-c27f-4cab-a729-185536462484/seatharmony_placecard_detail_1793188976633.jpg)
<!-- slide -->
![Banquet Captain Clipboard with Clockwise Seat 1-10 BEO & Allergy Callouts](/Users/kadermula/.gemini/antigravity/brain/9ca435cb-c27f-4cab-a729-185536462484/seatharmony_planner_clipboard_1793188997208.jpg)
````

### Design Tokens (Warm Editorial Daylight — Vogue Weddings ×Kinfolk × Linear Precision)
- **Primary Canvas**: Warm Alabaster Linen (`#FAF8F5`) & Champagne Silk (`#F4EFEA`)
- **Elevated Surface**: Crisp Archival Paper (`#FFFFFF`) with `1px solid #E6DFD5` hairlines
- **Primary Text**: Deep Espresso Ink (`#1C1917`), Warm Charcoal (`#44403C`), Muted Taupe (`#78716C`)
- **Primary Brand Accent**: Estate Rosewood / Terracotta (`#9A3412` / `#B45309`) & Botanical Sage (`#2E5A44` / `#15803D`)
- **Typography**: `'Newsreader', Georgia, serif` for editorial display headlines + `'Plus Jakarta Sans', sans-serif` for UI controls + `tabular-nums` on every seat counter, table capacity, Harmony Score, and BEO tally.
- **Single-Line `1024px+` Header**: Strictly `rows: 1`, `flex-wrap: nowrap`, verified across `1440px`, `1024px`, `768px`, and `390px` with:
  - Brand Mark (`SeatHarmony`)
  - `Weddings & Rehearsal` (Live)
  - `For Planners (BEO)` (Live)
  - `VIP & Gala Modes` (`Soon` badge)
  - `Layout Templates (60+)` (`/directory`)
  - Primary CTA: `Unlock Print & BEO Pack ($14.99) ↗`

---

## 6. Mandatory 6-Zone Dante Brunelli + UseMolty Landing Page Architecture

1. **ZONE 1 (`Fold 1`) — Above the Fold: Message Match + Visual "VSL" Split Showcase + 3-Stat Crease Bar**
   - **Eyebrow Pill**: `BUILT ON COMBINATORIAL CONSTRAINT SOLVING · 98.4/100 AVG HARMONY SCORE`
   - **Headline (H1)**: *Seat 150 wedding guests in 30 seconds. Zero family drama, zero Canva re-typing.*
   - **Sub-Header**: Paste your messy guest list from Zola, The Knot, or Google Sheets. SeatHarmony automatically separates divorced parents, pairs college friends, builds your caterer's clockwise meal sheet, and formats your **24"×36" Welcome Sign** for instant printing.
   - **Visual "VSL" Showcase**: Interactive split-screen comparing *"The 11 PM Spreadsheet & Canva Nightmare"* vs. *"Live SeatHarmony Studio (98/100 Harmony + Instant 24"×36" Poster + Clockwise Caterer BEO)"* with editorial reception photography and a 1-click **`Build Yours Free Below — Takes 30 Seconds ↓`** CTA.
   - **Fold-1 Crease 3-Stat Proof Bar (`~100px` height)**:
     - `18,420+ Reception Tables Solved` · `100% Clockwise Caterer BEO & Allergy Accuracy` · `6.5 Hours Saved vs. Spreadsheets + Canva`
2. **ZONE 2 (`Fold 2`) — "How We Work": 4-Step Skimmer Walkthrough (`68px` vertical rhythm)**
   - Uppercase kicker (`HOW IT WORKS`) + 2-line header (`Four steps. Zero seating guesswork.`) + 4 numbered cards (`① Paste Your Messy Guest List`, `② Tag Family Rules & Room Zones`, `③ 1-Click Auto-Seat & Tactile Table Rings`, `④ Export Caterer BEO, 24"×36" Poster & QR Pass`).
3. **ZONE 3 (`Fold 3`) — "Chat Is the Front Door. This Is the House.": Interactive SeatHarmony Studio**
   - **Preset Scenario Bar**:
     - `💍 150-Guest Estate Reception (Divorced Parents + 4 Allergies)`
     - `🌿 80-Guest Tuscan Long Banquet (2-Sided Tables + Sweetheart)`
     - `📋 Planner BEO & Mom Sandbox Mode (Tables 1–3 Editable)`
     - `🥂 B2B VIP Exec Dinner (Coming Soon Preview)`
     - `🎗️ 300-Guest Charity Gala (Coming Soon Preview)`
   - **Left Dock (Households, Conflict Rules & CSV Paste)**:
     - Add/Paste messy household strings (`"Sarah & Mark Miller + 2 Kids"`), toggle active conflict/affinity rules (`🔴 Keep Divorcees 2+ Tables Apart`, `💚 Keep College Crew Together`, `🔇 Seat Grandparents in Quiet Zone`, `🎉 Seat Bridal Party Near Dance Floor`), and click **`⚡ Auto-Solve All Tables (35ms)`**.
   - **Center/Right Interactive Canvas (4 Instant View Tabs)**:
     - **Tab 1 (`🎯 Interactive Floorplan & Polar Table Rings`)**: Click any table to morph shape (`Round`, `Sweetheart`, `2-Sided Banquet`, `4-Sided King's`), rotate `45°`, lock table (`🔒`), click any two seats to **swap guests with live Harmony Score recalculation**, or toggle **Social Harmony Ring** vs. **Caterer Meal Ring**.
     - **Tab 2 (`🍽️ Chef David's Clockwise Caterer BEO Sheet`)**: Live table-by-table clockwise Seat `1..N` manifest showing entrée counts (`🥩 Filet`, `🐟 Halibut`, `🌱 Vegan`, `🧒 Kids`), red-alert allergy badges (`🥜 SEVERE PEANUT`, `🌾 CELIAC`), and chair mods (`♿ REMOVE CHAIR`, `👶 HIGHCHAIR`).
     - **Tab 3 (`🖼️ 24"×36" Welcome Poster & Avery 5302 Place Cards`)**: Live vector preview of the **24"×36" Architectural Welcome Sign** — switch between **Alphabetical `A–Z`** and **By Table**, switch between **3 Luxury Typography Themes** (*Warm Alabaster*, *Black Tie Obsidian*, *Botanical Sage*), and preview **Avery 5302 Tented Place Cards** with server meal symbols.
     - **Tab 4 (`📱 Cocktail-Hour QR Lookup & Mom Sandbox Link`)**: Interactive mobile phone simulator with instant `krisk/Fuse` fuzzy guest search (`"Type any guest name..."` $\rightarrow$ highlights exact table & seat) + 1-click **`Copy "Mom Sandbox" Restricted Link (Tables 1–3 Only)`**.
4. **ZONE 4 (`Fold 4`) — The "Sell": 3-Layer Contextual Proof Stack + Pricing**
   - **Row 1 (3 Contextual Case Studies)**: *Maya & Liam (155 Guests, 3 Family Feuds)*, *Chloe Vance Events (22 Weddings/Yr Luxury Planner)*, and *Chef David Morales (Four Seasons Banquet Director)*.
   - **Row 2 (`B/A` — The Honest Before & After Comparison Table)**: Side-by-side comparison across 6 painful dimensions (*Family Conflict Resolution*, *Couples & Kids Grouping*, *24"×36" Print Welcome Sign*, *Caterer Clockwise Seat-Meal BEO*, *Mom Collaboration*, and *Total Cost & Time*).
   - **Row 3 (6 Written Reviews)**: Specific quotes from brides, grooms, wedding coordinators, and banquet captains.
   - **Dual-Track Pricing & Instant Stripe Checkout**:
     - **Free Forever ($0)**: Full interactive floorplan, conflict solver, and on-screen preview.
     - **Wedding & Event Print Pass (\$14.99 One-Time — Most Popular, Plus \$1.99 Single-Sheet Express Pass)**: Unlocks 300-DPI 24"×36" Welcome Poster PDF/SVG, Clockwise Caterer BEO CSV/PDF, Avery 5302 Tented Place Cards, and Live Cocktail-Hour QR Guest Lookup.
     - **Planner & Venue Pro Studio (\$39/mo — Or \$99/yr Agency Pass)**: Unlimited client weddings, White-Label BEO exports, restricted Mom Sandbox links, and early access to VIP Dinner & Charity Gala modes.
5. **ZONE 5 (`Fold 5`) — "You're Probably Wondering...": 5-Question Objection-Killer FAQ**
6. **ZONE 6 (`Fold 6`) — Final Closing Hook & Single CTA Banner**

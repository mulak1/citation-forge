const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const { buildPresetForTarget } = require('./seating-engine');
const { buildVenueBlueprint } = require('./directory-view');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'citation_forge.db');

let dbInstance = null;

const VENUE_LAYOUT_TEMPLATES = [
  ['150-guest-wedding-seating-chart-round-tables', '150-Guest Wedding Seating Chart Template: 18 Round Tables + Sweetheart Table (2026)', 'Ballroom & Estate Receptions', '150 Guests (18×8-Top Rounds)', 'Sweetheart + 18 Rounds', '15×10-Top Rounds', 'Tuscan Hybrid Mix', 98.4, 94.2, 88.5, 91.0],
  ['120-guest-wedding-seating-chart-floorplan', '120-Guest Wedding Seating Chart & Floorplan: 15 Round Tables vs Long Banquet', 'Medium Receptions (120 Guests)', '120 Guests (15×8-Top Rounds)', '12×10-Top Rounds', '6×20-Guest Banquet Rows', 'U-Shape Courtyard', 97.8, 93.4, 90.1, 86.5],
  ['100-guest-wedding-floorplan-sweetheart-table', '100-Guest Wedding Floorplan Template: Sweetheart Table + 12 Round Tables', '100-Guest Weddings', '100 Guests (Sweetheart + 12 Rounds)', 'King’s Table + 10 Rounds', '4 Long Tuscan Tables', 'Garden Tent Layout', 98.9, 95.1, 91.2, 89.4],
  ['80-guest-intimate-wedding-banquet-seating-chart', '80-Guest Intimate Wedding Seating Chart: Tuscan 2-Sided Banquet & Courtyard', 'Intimate & Micro Weddings', '80 Guests (4×20 Banquet Tables)', '10×8-Top Rounds', 'U-Shape Estate Table', 'Conservatory Glasshouse', 99.1, 94.8, 92.0, 88.7],
  ['200-guest-hotel-ballroom-seating-chart-template', '200-Guest Hotel Ballroom Wedding Seating Chart: 20×10-Top Rounds & Dance Floor', 'Grand Ballroom Receptions', '200 Guests (20×10-Top Rounds)', '24×8-Top Rounds', 'King’s Head + 18 Rounds', 'Dual-Bar Ballroom', 97.2, 93.8, 91.4, 87.9],
  ['250-guest-estate-tent-wedding-floorplan', '250-Guest Sailcloth Tent Wedding Floorplan: Sightlines, Dance Floor & Quiet Zone', 'Tented Estate Weddings', '250 Guests (25×10-Top Rounds)', 'Hybrid Banquet + Rounds', 'Central Dance Floor', 'Perimeter Round Layout', 96.8, 94.1, 90.5, 86.2],
  ['60-guest-rehearsal-dinner-seating-chart', '60-Guest Rehearsal Dinner Seating Chart: Avoid Repeating Reception Tablemates', 'Rehearsal Dinners', '60 Guests (6×10-Top Rounds)', '3×20 Banquet Tables', 'Hollow Square VIP', 'Winery Cave Long Table', 98.6, 95.4, 91.8, 89.0],
  ['50-guest-micro-wedding-long-kings-table', '50-Guest Micro-Wedding Floorplan: Single Continuous King’s Table vs 6 Rounds', 'Micro-Weddings (50 Guests)', '50 Guests (Continuous King’s)', '2×25 Tuscan Rows', '6×8-Top Rounds', 'Private Dining Room', 99.4, 96.2, 92.5, 90.1],
  ['175-guest-country-club-wedding-seating-plan', '175-Guest Country Club Reception Floorplan: Divorced Parents & VIP Sightlines', 'Country Club Receptions', '175 Guests (21×8-Top Rounds)', '18×10-Top Rounds', 'Sweetheart + 2 VIP Family', 'Terrace + Indoor Split', 98.1, 94.0, 89.6, 85.4],
  ['130-guest-winery-courtyard-seating-chart', '130-Guest Winery & Vineyard Seating Chart: 2-Sided Farm Tables Under String Lights', 'Winery & Vineyard Weddings', '130 Guests (8 Farm Tables)', 'Hybrid Farm + Rounds', '16×8-Top Rounds', 'Barrel Room Layout', 98.5, 95.0, 91.3, 88.2],
  ['90-guest-garden-conservatory-floorplan', '90-Guest Botanical Conservatory Floorplan: Narrow Atrium Banquet & Round Mix', 'Botanical & Museum Venues', '90 Guests (Atrium Hybrid)', '11×8-Top Rounds', '3×30 Banquet Rows', 'Glasshouse Sweetheart', 98.7, 94.6, 90.8, 87.5],
  ['160-guest-industrial-loft-wedding-seating', '160-Guest Industrial Warehouse & Loft Seating Chart: Pillar Sightlines & Bar Flow', 'Loft & Warehouse Venues', '160 Guests (16×10-Tops)', '8×20 Industrial Banquets', '20×8-Top Rounds', 'Asymmetric Dance Floor', 97.6, 93.9, 90.2, 86.8],
  ['140-guest-barn-wedding-floorplan-template', '140-Guest Modern Barn Wedding Floorplan: Harvest Tables + Quiet Senior Zone', 'Modern Barn & Ranch', '140 Guests (Harvest + Rounds)', '14×10-Top Farmhouse', '18×8-Top Rounds', 'Mezzanine + Main Floor', 98.2, 94.5, 90.7, 87.1],
  ['110-guest-coastal-beach-club-seating-chart', '110-Guest Coastal Yacht & Beach Club Seating Chart: Ocean-View Sweetheart Anchor', 'Coastal & Waterfront', '110 Guests (14×8-Tops)', '11×10-Top Rounds', 'Terrace Long Tables', 'Sunset View Head Table', 98.8, 95.2, 91.6, 88.9],
  ['300-guest-charity-gala-table-captain-floorplan', '300-Guest Ballroom Gala & Large Wedding Seating Chart: 30 Round Tables & VIP Ring', 'Large Galas & Weddings', '300 Guests (30×10-Tops)', 'VIP Family & Host Ring', 'Grand Stage Layout', 'Fast QR Guest Check-In', 97.9, 94.3, 90.9, 88.0],
  ['40-guest-b2b-vip-executive-dinner-seating', '40-Guest Intimate Private Dining Room Wedding & Welcome Dinner Seating Chart', 'Intimate & Welcome Dinners', '40 Guests (5×8-Top Rounds)', '2×20 Long Banquet Tables', 'Single Continuous Table', 'Courtyard U-Shape Table', 99.2, 96.0, 93.1, 89.5],
  ['75-guest-destination-wedding-villa-seating', '75-Guest Destination Villa Wedding Seating Chart: Poolside Serpentine & Banquet', 'Destination Weddings', '75 Guests (Villa Courtyard)', '9×8-Top Rounds', '3×25 Olive Grove Rows', 'U-Shape Piazza Table', 99.0, 95.6, 92.3, 89.2],
  ['180-guest-museum-rotunda-wedding-floorplan', '180-Guest Art Museum & Rotunda Seating Chart: Circular Dance Floor Orbit', 'Museum & Historic Estates', '180 Guests (Concentric Orbit)', '22×8-Top Rounds', '18×10-Top Rounds', 'Gallery Wing Banquet', 98.3, 94.7, 91.0, 87.6],
  ['135-guest-rooftop-penthouse-wedding-seating', '135-Guest Rooftop & Penthouse Wedding Floorplan: Indoor/Outdoor Weather Backup', 'Rooftop & City View', '135 Guests (17×8-Tops)', 'Skyline Banquet Mix', '14×10-Top Rounds', 'Glass Pavilion Plan B', 98.0, 94.4, 90.4, 86.9],
  ['220-guest-cultural-fusion-wedding-seating-chart', '220-Guest Cultural & Multi-Generational Wedding Seating Chart: 4-Side Family Zones', 'Multi-Generational Weddings', '220 Guests (22×10-Tops)', 'Dual Family VIP Rings', 'Halal/Vegan/Kosher Meal Sheet', 'Stage & Mandap Sightline', 98.6, 95.1, 91.7, 88.4],
  ['170-guest-black-tie-ballroom-seating-chart', '170-Guest Black-Tie Ballroom Wedding Floorplan: Sweetheart Anchor, 20 Rounds & Live Band', 'Black-Tie Ballroom Weddings', '170 Guests (20×8-Tops + VIP)', '17×10-Top Rounds', 'Sweetheart + 2 Family VIP', 'Live Band Acoustic Buffer', 98.7, 94.9, 91.5, 88.8],
  ['95-guest-restaurant-buyout-wedding-floorplan', '95-Guest Restaurant Buyout Wedding Seating Chart: Booths, Long Banquets & Patio Flow', 'Restaurant Buyout Weddings', '95 Guests (Banquet + Rounds)', '8×12 Banquet Rows', '12×8-Top Bistro Rounds', 'Main Dining + Patio Split', 98.9, 95.3, 91.9, 89.1],
  ['40x60-tent-wedding-seating-chart-120-guests', '40×60 Tent Wedding Layout for 120 Guests: 15 Round Tables, Center Dance Floor & Pole Clearance', 'Tent & Outdoor Weddings', '120 Guests (40×60 Tent · 2,400 sq ft)', '15×8-Top 60" Rounds', '12×10-Top 72" Rounds', 'Center Pole & 16×16 Dance Floor', 99.1, 95.8, 92.4, 89.7],
  ['40x80-sailcloth-tent-wedding-layout-150-guests', '40×80 Sailcloth Tent Wedding Floorplan for 150 Guests: Twin Pole Sightlines & 18 Round Tables', 'Sailcloth Tent Weddings', '150 Guests (40×80 Tent · 3,200 sq ft)', '18×8-Top Rounds + Sweetheart', '15×10-Top Rounds + Lounge', 'Twin Center Pole Buffer', 99.0, 95.5, 92.1, 89.3],
  ['30x60-tent-wedding-layout-80-100-guests', '30×60 Frame Tent Wedding Seating Chart for 80-100 Guests: Banquet vs Round Table Floorplan', 'Frame Tent Weddings', '90 Guests (30×60 Tent · 1,800 sq ft)', '11×8-Top 60" Rounds', '6×16-Foot Banquet Rows', '15×15 Dance Floor & Bar', 98.9, 95.2, 91.8, 89.0],
  ['mixed-round-and-long-banquet-tables-wedding-floorplan', 'Mixed Round & Long Banquet Tables Wedding Floorplan (120-160 Guests Architectural Layout)', '2026 Trending Reception Layouts', '140 Guests (4 Long VIP Banquets + 11 Rounds)', '2 King’s Tables + 12 Rounds', 'Alternating Tuscan & 60" Rounds', 'Center Dance Floor Sightlines', 99.3, 96.1, 92.8, 90.2],
  ['40x100-tent-wedding-seating-chart-200-guests', '40×100 Tent Wedding Floorplan for 200 Guests: 24 Round Tables, Center Dance Floor & Pole Clearance', 'Large Tent Weddings', '200 Guests (40×100 Tent · 4,000 sq ft)', '24×8-Top 60" Rounds', '20×10-Top 72" Rounds', '20×20 Center Dance Floor', 99.0, 95.6, 92.2, 89.4],
  ['20x40-tent-backyard-wedding-seating-chart-50-60-guests', '20×40 Backyard Tent Wedding Layout for 50-60 Guests: 7 Round Tables vs 2 Long Banquet Rows', 'Backyard & Micro Tent Weddings', '55 Guests (20×40 Tent · 800 sq ft)', '2×26-Guest Banquet Rows', '7×8-Top 60" Rounds', '12×12 Corner Dance Floor', 99.2, 95.9, 92.6, 89.8]
];

const HEAD_TO_HEAD_COMPARISONS = [
  ['sweetheart-table-vs-kings-table-floorplan', 'Sweetheart Table vs. King’s Head Table: Wedding Floorplan & Sightline Guide', 'Sweetheart Table (2 Guests)', 'Sweetheart Table Setup', 98.8, 97, 'King’s Table (12-18 Bridal Party)', 'Kings Table Setup', 91.4, 88, 'Head Table Layout'],
  ['round-tables-vs-long-banquet-tables-wedding', 'Round Tables (60" vs 72") vs. Long Banquet Tables: Space, Conversation & Caterer Flow', '60" Round Tables (8 Guests)', '60-Inch Round Setup', 98.2, 96, 'Long Banquet Tables (2-Sided)', 'Long Banquet Setup', 94.6, 91, 'Table Shape Comparison'],
  ['alphabetical-vs-by-table-wedding-welcome-sign', 'Alphabetical (A-Z) vs. By-Table Wedding Seating Chart Sign: Cocktail Hour Speed Guide', 'Alphabetical A-Z Welcome Sign', 'Alphabetical Sign', 99.1, 98, 'Listed By Table (Table 1..18)', 'By-Table Sign', 72.4, 74, '24"×36" Welcome Signage'],
  ['seatharmony-vs-zola-seating-chart-maker', 'SeatHarmony vs. Zola Seating Chart Maker: Auto-Solver, Caterer Meal Sheet & 24"×36" Sign', 'SeatHarmony Studio', 'SeatHarmony Studio', 98.6, 98, 'Zola Free Seating Tool', 'Zola Seating Tool', 64.0, 68, 'Seating Tool Comparison'],
  ['seatharmony-vs-canva-wedding-seating-sign', 'SeatHarmony Live 24"×36" Poster vs. Manual Canva Re-Typing: 6 Hours Saved & Zero Typos', 'SeatHarmony Auto-Poster', 'SeatHarmony Studio', 99.0, 99, 'Manual Canva Text Boxes', 'Canva Manual Sign', 58.5, 62, 'Print Poster Workflow'],
  ['seatharmony-vs-prismm-allseated-for-planners', 'SeatHarmony ($39/mo) vs. Prismm / AllSeated ($199/mo): Wedding Planner Meal Sheet Comparison', 'SeatHarmony Planner Pro', 'SeatHarmony Studio', 97.9, 96, 'Legacy CAD Floorplan Tools', 'Legacy Floorplan App', 71.2, 73, 'Wedding Planner Tools'],
  ['seatharmony-vs-google-sheets-wedding-seating', 'SeatHarmony Visual Table Rings vs. Google Sheets Spreadsheets: Family Peace Guide', 'SeatHarmony Visual Solver', 'SeatHarmony Studio', 98.4, 97, 'Google Sheets / Excel Grid', 'Spreadsheet Grid', 44.0, 52, 'Planning Workflow'],
  ['8-person-60-inch-vs-10-person-72-inch-rounds', '8-Guest (60" Round) vs. 10-Guest (72" Round) Wedding Tables: Comfort & Conversation Guide', '8 Guests on 60" Round', '8-Guest Round Table', 98.5, 97, '10 Guests on 72" Round', '10-Guest Round Table', 89.2, 85, 'Table Comfort & Spacing'],
  ['escort-cards-vs-24x36-seating-chart-poster', 'Folded Escort Cards (Avery 5302) vs. 24"×36" Welcome Sign Poster: When You Need Both', '24"×36" Sign + Place Cards', 'Sign + Place Cards', 99.2, 98, 'Sign Only (No Meal Icons)', 'Sign Only', 78.6, 79, 'Day-Of Print Stationery'],
  ['bride-and-groom-parents-same-table-vs-separate', 'Seating Bride & Groom Parents Together vs. Separate Host Tables: Etiquette & Drama Guide', 'Separate Host Tables (#2 & #4)', 'Separate Host Tables', 97.8, 96, 'Combined Parents Table', 'Combined Parents Table', 82.0, 81, 'Family Etiquette'],
  ['kids-table-vs-seating-children-with-parents', 'Dedicated Kids Table vs. Seating Children With Parents (Highchair & Server Safety)', 'Seated With Parents + Highchair', 'Seated With Parents', 98.1, 96, 'Separate Ages 7-12 Kids Table', 'Dedicated Kids Table', 88.4, 87, 'Keeping Families Together'],
  ['singles-table-vs-mixed-friend-group-seating', 'Why You Should Never Make a "Singles Table" (And How Mixing Friend Groups Works Better)', 'Mixed Friend Group Tables', 'Mixed Friend Tables', 98.9, 98, 'Isolated Singles Table', 'Singles Table', 49.0, 51, 'Guest Experience'],
  ['u-shape-floorplan-vs-parallel-banquet-columns', 'U-Shape Reception Floorplan vs. Parallel Banquet Columns: Speeches & Server Aisles', 'Parallel Banquet + Center Dance', 'Parallel Banquet Tables', 96.4, 94, 'U-Shape Estate Perimeter', 'U-Shape Layout', 91.8, 89, 'Banquet Room Layout'],
  ['qr-code-seat-finder-vs-printed-welcome-board', 'Cocktail-Hour QR "Find My Seat" Pass vs. Printed Welcome Board: The Hybrid Setup', 'Printed 24"×36" + Corner QR', 'Sign + QR Lookup', 99.3, 99, 'Printed Board Only', 'Printed Board Only', 84.5, 84, 'Guest Check-In Speed'],
  ['seatharmony-vs-rsvpify-seating-chart-builder', 'SeatHarmony vs. RSVPify Seating Chart Builder: Clockwise Caterer Meal Sheet & Print Bleed', 'SeatHarmony Studio', 'SeatHarmony Studio', 98.0, 97, 'RSVPify Seating Add-On', 'RSVPify Seating', 74.8, 76, 'Seating Tool Comparison'],
  ['seatharmony-vs-weddingwire-the-knot-seating', 'SeatHarmony vs. The Knot / WeddingWire Seating Tool: Print Sign & Family Sharing Guide', 'SeatHarmony Studio', 'SeatHarmony Studio', 98.7, 98, 'The Knot Seating Tool', 'The Knot Tool', 61.5, 64, 'Wedding Tool Comparison'],
  ['clockwise-12-oclock-seat-numbering-vs-random', 'Clockwise 12-O’Clock Seat Numbering vs. Unnumbered Tables: How Caterers Serve 30% Faster', 'Clockwise Seat 1..N Meal Sheet', 'Clockwise Meal Sheet', 99.4, 99, 'Unnumbered Table Totals', 'Unnumbered Table List', 62.0, 65, 'Catering Operations'],
  ['mom-sandbox-link-vs-shared-account-login', 'Family Table Share Link (Tables 1-3 Only) vs. Sharing Your Full Login Password', 'Family Table Share Link', 'Family Share Link', 99.1, 98, 'Full Password Sharing', 'Shared Password', 48.0, 50, 'Family Collaboration'],
  ['plated-dinner-place-cards-vs-buffet-table-signs', 'Plated Dinner Meal-Coded Place Cards vs. Buffet Table Numbers: What Your Venue Requires', 'Plated Meal-Icon Place Cards', 'Plated Place Cards', 98.6, 97, 'Table Assignment Only', 'Table Numbers Only', 83.2, 82, 'Meal Service Formats'],
  ['outdoor-tent-rain-plan-b-floorplan-comparison', 'Outdoor Courtyard Floorplan vs. Indoor Rain Plan-B Layout: 1-Click Table Re-Mapping', 'Dual Weather-Synced Floorplan', 'Rain Backup Plan', 98.3, 96, 'Single Static Layout', 'Single Layout', 69.4, 71, 'Day-Of Weather Backup'],
  ['corporate-vip-dinner-rotation-vs-fixed-seating', 'Rehearsal Dinner Seat Mixing vs. Assigned Tables for Multi-Day Wedding Weekends', 'Assigned Tables With Different Neighbors', 'Multi-Event Seating', 97.5, 95, 'Same Tablemates Both Nights', 'Repeated Seating', 81.0, 82, 'Rehearsal & Welcome Dinners'],
  ['foam-board-24x36-fedex-vs-acrylic-welcome-sign', '24"×36" Archival Foam Board (FedEx/Staples) vs. Acrylic Sign: Readability & Glare Guide', 'Matte Archival 24"×36" Board', 'Matte Foam Board', 98.4, 97, 'Clear Acrylic Sign', 'Clear Acrylic Sign', 79.0, 78, 'Print Materials'],
  ['templett-corjl-canva-vs-seatharmony-welcome-sign', 'SeatHarmony Auto-Synced 24"×36" Sign vs. Templett, Corjl & Canva Manual Templates', 'SeatHarmony Live Floorplan Sign', 'SeatHarmony Studio', 99.2, 99, 'Static Templett / Canva Template', 'Manual Sign Template', 61.0, 64, 'Editable Sign Templates'],
  ['18x24-vs-24x36-wedding-seating-chart-sign-size-comparison', '18"×24" vs. 24"×36" Wedding Seating Chart Sign Size: Guest Count & Font Readability Chart', '24"×36" Arch D (100-250 Guests)', '24x36 Arch D Sign', 99.1, 98, '18"×24" Arch C (Under 85 Guests)', '18x24 Arch C Sign', 82.5, 84, 'Welcome Sign Sizing']
];

const PLANNER_AND_BEO_GUIDES = [
  ['how-to-seat-divorced-parents-at-wedding-reception', 'How to Seat Divorced Parents & Step-Parents at a Wedding Without Drama (2026 Guide)', 'Sightline Separation, Equal VIP Proximity & Host Table Rules', 'Family Conflict Etiquette'],
  ['clockwise-caterer-beo-table-numbering-guide', 'The Banquet Captain’s Guide to Clockwise Seat 1..N Table Numbering (12 O’Clock Anchor)', 'Why Venue Chefs Need Seat #1 Anchored Toward the Focal Point', 'Caterer Meal Sheet Operations'],
  ['avery-5302-wedding-escort-card-meal-icons-guide', 'How to Print Meal-Choice Icons & Allergy Alerts on Avery 5302 Tented Place Cards', 'Geometric Protein Symbols (◆ Beef, ● Fish, ▲ Vegan) & Back-Fold Server Alerts', 'Stationery & Place Cards'],
  ['24x36-wedding-seating-chart-poster-size-and-font-guide', '24"×36" Wedding Seating Chart Poster Guide: Minimum Font Sizes, Bleed & Alphabetical Layout', 'Why 18pt Names & Alphabetical A-Z Grouping Prevent Cocktail-Hour Bottlenecks', 'Print Poster Typography'],
  ['how-to-import-messy-zola-the-knot-csv-guest-list', 'How to Clean & Import Messy Zola, The Knot, or Google Sheets Guest Lists in 10 Seconds', 'Auto-Grouping "Sarah & Mark Miller + 2 Kids" Into Linked Family Seats', 'Guest List Data Cleaning'],
  ['wheelchair-and-highchair-wedding-table-accessibility-guide', 'Wheelchair & Highchair Wedding Table Etiquette: Telling Caterers Which Chair to Remove', 'Why "Seat #1: Remove Standard Chair for Wheelchair" Must Be on Your Meal Sheet', 'Accessibility & Seniors'],
  ['severe-peanut-and-celiac-allergy-wedding-catering-protocol', 'Managing Severe Peanut, Tree Nut & Celiac Allergies on Your Wedding Seating Chart', 'Cross-Contamination Alerts & Exact Seat-Level Kitchen Callouts', 'Food Allergy Safety'],
  ['where-to-seat-grandparents-away-from-dj-speakers', 'Acoustic Zone Planning: Keeping Grandparents 30+ Feet From DJ Subwoofers', 'Mapping Loud Party Zones vs. Quiet Conversation Zones Near Accessible Exits', 'Room Acoustics & Zones'],
  ['where-to-seat-bridal-party-plus-ones-and-dates', 'Should You Seat Bridal Party Dates at the Head Table or With Friends? (3 Proven Layouts)', 'Why Seating Plus-Ones Together at King’s Tables or Standard Rounds Wins Every Time', 'Bridal Party Etiquette'],
  ['how-to-handle-last-minute-wedding-rsvp-drops-48-hours-out', 'How to Handle Last-Minute Wedding RSVP Drops 48 Hours Before the Reception', 'Locking Finalized Tables & Re-Balancing Single Empty Seats Without Re-Typing Your Sign', 'Last-Minute RSVP Triage'],
  ['vendor-meal-table-checklist-photographer-planner-dj', 'The Wedding Vendor Meal Checklist: Seating & Feeding Your Photographer, Planner & DJ', 'Why Hot Vendor Meals Should Be Tracked Right Inside Your Caterer Meal Sheet Export', 'Vendor Operations'],
  ['how-to-collaborate-with-mothers-of-bride-and-groom-sandbox', 'How to Let Both Moms Help With Family Tables Without Breaking Your Seating Chart', 'Using Family Table Share Links (Tables 1-3) to Prevent Accidental Edits', 'Family Collaboration'],
  ['rehearsal-dinner-to-reception-dont-repeat-tablemates-rule', 'The "Don’t Repeat Tablemates" Rule Between Rehearsal Dinner and Wedding Reception', 'Maximizing Guest Mingling Across Multi-Event Wedding Weekends', 'Multi-Event Weekends'],
  ['fedex-staples-canva-print-bleed-crop-marks-24x36-poster', 'How to Export a 24"×36" Wedding Welcome Sign With 0.125" Bleed for FedEx, Staples or Local Printers', 'Vector PDF/SVG Specifications for Crisp Print-Ready Foam Board Printing', 'Pre-Press Print Spec'],
  ['cocktail-hour-qr-code-find-my-seat-setup-guide', 'Adding a "Find My Seat" QR Code to Your Printed Welcome Sign for 150+ Guest Weddings', 'How a 1.5-Inch Corner QR Code Eliminates Lineups at the Ballroom Doors', 'Cocktail Hour Flow'],
  ['b2b-field-marketing-vip-dinner-seating-strategy', 'How to Seat Out-of-Town Family & Wedding Party at the Welcome Dinner', 'Balancing Extended Relatives, Plus-Ones, and Toast Speakers Before Wedding Day', 'Welcome Dinner Etiquette'],
  ['charity-gala-corporate-table-captain-seating-playbook', 'How Gala & Large Reception Coordinators Manage 30 Table Hosts & VIP Placement', 'Coordinating Table Hosts, Family VIPs, and Fast Cocktail-Hour Check-In', 'Large Reception Playbook'],
  ['table-spacing-and-server-aisle-clearance-standards', 'Banquet Room Fire Code & Server Aisle Clearance Standards (60-Inch vs 72-Inch Rounds)', 'Ensuring 54-Inch Chair-to-Chair Clearance for Smooth Plated Dinner Service', 'Venue Architecture'],
  ['24x36-welcome-sign-with-mini-floorplan-map-guide', 'How to Include a Mini Reception Table Map on Your 24"×36" Wedding Welcome Sign', 'Blending Large Serif Table Numbers Above Alphabetical A-Z Guest Lists for 5-Second Wayfinding', 'Welcome Sign Architecture'],
  ['24x36-wedding-seating-chart-poster-how-many-names-fit', 'How Many Guest Names Fit on a 24"×36" Wedding Seating Chart Sign? (100 to 250 Guests Font Size Chart)', '3-Column vs 4-Column Alphabetical Typography, Minimum 18pt Readability & Mini Table Map Spacing', '24"×36" Welcome Sign Specs'],
  ['serpentine-s-curve-wedding-table-layout-floorplan', 'Serpentine & S-Curve Wedding Reception Table Layout: Dimensions, Linens & Caterer Server Aisles', 'Curved Banquet Geometry, 60-Inch Server Pass-Throughs & Clockwise Seat 1..N Numbering', '2026 Trending Layouts'],
  ['60-inch-round-table-8-vs-9-vs-10-wedding-guests', 'How Many Guests Fit at a 60-Inch Round Wedding Table? (8 vs 9 vs 10 Charger Plate Spacing)', 'Elbow Room Per Guest, 13-Inch Charger Plate Clearance & Linen Drop Specifications', 'Table Capacity & Comfort'],
  ['l-shaped-and-t-shaped-wedding-reception-table-layout', 'L-Shaped & T-Shaped Wedding Reception Table Layouts for 60-110 Guests: Intimate Venue Blueprint', 'Connecting Head Table Banquets With Perpendicular Guest Wings & 54-Inch Server Aisles', 'Intimate Venue Architecture']
];

function saveDb() {
  if (!dbInstance) return;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const data = dbInstance.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function trimMetaDescription(text, maxLen = 158) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const sliced = clean.slice(0, maxLen - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  const base = (lastSpace > 80 ? sliced.slice(0, lastSpace) : sliced).replace(/[.,;:!\-\s]+$/, '');
  return `${base}.`;
}

function buildGuideDetails(slug, title, subtitle, category, bp) {
  if (/avery-5302|escort-card/.test(slug)) {
    return {
      checklist: [
        `Sheet Count for ${bp.guests} Guests: Print ${bp.averySheets} sheets of Avery 5302 (10 tented cards per 8.5"×11" sheet, 2"×3.5" folded).`,
        'Front Face Geometry: Display Guest Full Name in 18pt Serif, Table Number, and Geometric Meal Icon (◆ Beef, ● Fish, ▲ Vegan).',
        'Back-Fold Server Alert: Print exact clockwise Seat #1..N position and severe allergy callouts on the rear tent fold facing banquet staff.',
        'Printer Feed Calibration: Export at 100% actual scale (zero page scaling) on 80lb matte perforated cardstock.'
      ],
      codeExample: `AVERY 5302 SHEET #1 (10-UP TENTED CARD · 2.0" × 3.5" FOLDED)\n[Card 1 Front]  Claire & Julian Vance  |  TABLE 4 · SEAT #2  |  ◆ Filet Mignon\n[Card 1 Back]   SERVER MEAL SHEET: 12:00 Anchor +1 Clockwise · NO SHELLFISH AT TABLE 4\n[Card 2 Front]  Dr. Marcus Sterling    |  TABLE 7 · SEAT #5  |  ▲ Wild Mushroom Risotto`
    };
  }
  if (/24x36|poster|fedex|welcome-sign/.test(slug)) {
    return {
      checklist: [
        `Arch D Dimensions (24"×36"): Export at 24.25"×36.25" with 0.125" full bleed and trim marks for FedEx Office or Staples foam board.`,
        `Typography Scale for ${bp.guests} Guests: Use ${bp.posterLayout} so guests read their table assignment from 6 feet away in under 2 seconds.`,
        'Blended Mini Reception Map: Embed the architectural table map at the top of the sign so guests walk straight to their table zone.',
        'Alphabetical A-Z Last-Name Grouping: Eliminate cocktail-hour doorway bottlenecks caused by scanning 15-25 individual table boxes.'
      ],
      codeExample: `ARCH D (24"×36" + 0.125" BLEED) TYPOGRAPHY & COLUMN MATRIX\n• 60–115 Guests:  3 Columns · 20pt Names / 28pt Letter Headers · 1.4s Avg Lookup\n• 120–185 Guests: 4 Columns · 18pt Names / 24pt Letter Headers + Top Mini Map\n• 190–260 Guests: 5 Columns · 16pt Names + 1.5" Corner "Find My Seat" QR Code`
    };
  }
  if (/divorced|mothers|bridal-party|rehearsal|welcome-dinner/.test(slug)) {
    return {
      checklist: [
        `Equal VIP Sightlines (${bp.roomDims} Room): Seat both households at equidistant VIP tables (Table 2 & Table 4) flanking the ${bp.headTable.name}.`,
        `Acoustic & Dance-Floor Buffer: Place the ${bp.danceFloorDims} dance floor between separated family groups for a natural 28-foot sightline barrier.`,
        'Scoped Family Table Share Link: Send each parent a locked link to arrange Tables 1–3 while Tables 4+ remain read-only.',
        'Couple & Plus-One Integrity: Lock partner pairs so auto-rebalancing never splits spouses or bridal party dates across tables.'
      ],
      codeExample: `VIP SIGHTLINE & CONFLICT SEPARATION MATRIX (${bp.guests} GUESTS · ${bp.roomDims})\n• Table 1 (Center North): ${bp.headTable.name} (${bp.headTable.capacity} Seats)\n• Table 2 (West VIP Wing): Bride's Mother & Stepfather · 18ft to Head Table · Quiet Zone\n• Table 4 (East VIP Wing): Bride's Father & Partner   · 18ft to Head Table · 34ft Buffer from Table 2`
    };
  }
  if (/serpentine|spacing|aisle|grandparents|wheelchair|allergy/.test(slug)) {
    return {
      checklist: [
        `Fire-Code Aisle Standard (${bp.aisleSpec}): Maintain 54" minimum chair-back-to-chair-back clearance and 60" main catering arteries.`,
        `Acoustic Decibel Zoning: Seat senior relatives 32+ feet from DJ subwoofers while keeping young friends bordering the ${bp.danceFloorDims} dance floor.`,
        'ADA Wheelchair & Highchair Callouts: Flag Seat #1 ("Remove Standard Chair for Wheelchair") directly on the Caterer Meal Sheet.',
        'Kitchen Cross-Contamination Manifest: Highlight severe peanut, tree-nut, and celiac seats in crimson on both the floorplan and server sheet.'
      ],
      codeExample: `ARCHITECTURAL CLEARANCE & ADA MEAL SHEET SPEC (${bp.roomDims} · ${bp.sqft.toLocaleString()} SQ FT)\n• Minimum Table Center-to-Center (60" Rounds): 10.5 ft (60" Table + 18"×2 Chairs + 54" Aisle)\n• Table 2 · Seat #1 (12:00): [ADA: REMOVE STANDARD CHAIR · 36" ADA APPROACH LANE]\n• Table 6 · Seat #4 (04:30): [ALERT: SEVERE PEANUT & CELIAC · SEPARATE KITCHEN TRAY]`
    };
  }
  return {
    checklist: [
      `12 O'Clock Focal Anchor (${bp.tableCount} Tables): Orient Seat #1 on every table toward the ${bp.headTable.name} or center dance floor.`,
      `Clockwise 1..N Server Numbering: Number seats clockwise so runners drop Filet, Halibut, and Vegan plates simultaneously without auctioning food.`,
      `48-Hour RSVP Drop Triage: Swap last-minute cancellations in 2 clicks and regenerate all ${bp.averySheets} Avery 5302 sheets and the 24"×36" sign.`,
      `Vendor & Staff Meal Tracking: Include Photographer, Planner, and Band hot meal counts in the master catering CSV export.`
    ],
    codeExample: `CLOCKWISE 12:00 CATERER MEAL SHEET MANIFEST (${bp.guests} GUESTS · ${bp.tableCount} TABLES)\nTable 2 (8-Top Round · West VIP) | 3x Filet ◆, 3x Halibut ●, 2x Vegan ▲\n  Seat #1 (12:00): Evelyn Mercer   | ● Halibut | [VIP Host · Serve First]\n  Seat #2 (01:30): Arthur Mercer   | ◆ Filet   | [Medium Rare]\n  Seat #3 (03:00): Nadia Sterling  | ▲ Vegan   | [Gluten-Free / Celiac Alert]`
  };
}

function buildSeoPagesSeed() {
  const rows = [];

  // 1. Venue & Guest-Count Layout Templates
  VENUE_LAYOUT_TEMPLATES.forEach(([slug, title, category, b1, b2, b3, b4, s1, s2, s3, s4]) => {
    const bp = buildVenueBlueprint(slug, title);
    const rawMeta = `${title}: ${bp.roomDims} (${bp.sqft.toLocaleString()} sq ft) floorplan with ${bp.tableCount} tables, ${bp.danceFloorDims} dance floor, 12:00 caterer Meal Sheet & 24"×36" sign.`;
    const metaDesc = trimMetaDescription(rawMeta, 158);
    const summary = `Engineered for ${bp.guests} guests in a ${bp.roomDims} (${bp.sqft.toLocaleString()} sq ft) ${category.toLowerCase()} space: features ${bp.tableCount} tables (${bp.specLabel}), a ${bp.danceFloorDims} dance floor, ${bp.aisleSpec}, and instant export to a ${bp.posterLayout} 24"×36" welcome sign + ${bp.averySheets} Avery 5302 place card sheets.`;
    const payload = {
      type: 'leaderboard',
      category,
      summary,
      leaders: [
        { rank: 1, brand: b1, domain: `${bp.roomDims} (${bp.sqft.toLocaleString()} sq ft)`, csov: s1, llmsTxt: `${bp.tableCount} Tables · ${bp.aisleSpec}`, schemaScore: 99 },
        { rank: 2, brand: b2, domain: `Dance Floor: ${bp.danceFloorDims}`, csov: s2, llmsTxt: `24"×36" Sign: ${bp.posterLayout}`, schemaScore: 95 },
        { rank: 3, brand: b3, domain: `${bp.averySheets} Avery 5302 Card Sheets`, csov: s3, llmsTxt: 'Clockwise 12:00 Caterer Meal Sheet', schemaScore: 92 },
        { rank: 4, brand: b4, domain: 'Acoustic & Sightline Zones', csov: s4, llmsTxt: '30ft DJ Buffer + Divorced Parent Separation', schemaScore: 90 }
      ],
      keyTakeaway: `For ${bp.guests} guests in a ${bp.roomDims} (${bp.sqft.toLocaleString()} sq ft) room, anchor your ${bp.headTable.name} first, maintain ${bp.aisleSpec}, and export a ${bp.posterLayout} 24"×36" sign.`,
      faqs: [
        {
          question: `What room or tent size do I need for ${b1} (${bp.guests} guests)?`,
          answer: `A ${bp.guests}-guest reception using ${b1} requires approximately ${bp.sqft.toLocaleString()} sq ft (${bp.roomDims}) to fit ${bp.tableCount} tables (${bp.specLabel}), a ${bp.danceFloorDims} dance floor, and ${bp.aisleSpec}.`
        },
        {
          question: `How many tables and Avery 5302 place card sheets does this ${b1} layout use?`,
          answer: `The ${b1} (${category}) blueprint uses ${bp.tableCount} total tables (1 ${bp.headTable.name} plus ${bp.pts.length} guest tables: ${bp.roundCount} rounds and ${bp.banquetCount - (bp.headTable.shape !== 'round' ? 1 : 0)} banquet tables) and prints onto ${bp.averySheets} sheets of 10-up Avery 5302 tented place cards.`
        },
        {
          question: `What is the best 24"×36" welcome sign layout for ${b1}?`,
          answer: `For ${b1} (${bp.guests} guests in ${bp.roomDims}), SeatHarmony formats your 24"×36" Arch D welcome sign in a ${bp.posterLayout} layout with a blended top reception table map and 0.125" FedEx/Staples print bleed.`
        }
      ]
    };
    rows.push({
      slug,
      page_type: 'leaderboard',
      title,
      meta_description: metaDesc,
      category,
      primary_entity: b1,
      secondary_entity: b2,
      csov_score: s1,
      payload_json: JSON.stringify(payload)
    });
  });

  // 2. Head-to-Head Seating & Signage Comparisons
  HEAD_TO_HEAD_COMPARISONS.forEach(([slug, title, brandA, domainA, csovA, geoA, brandB, domainB, csovB, geoB, category]) => {
    const bp = buildVenueBlueprint(slug, title);
    const delta = Number((csovA - csovB).toFixed(1));
    const rawMeta = `${brandA} vs. ${brandB} (${category}): ${bp.guests}-guest floorplan math (${bp.roomDims}), ${bp.aisleSpec}, and 24"×36" print comparison.`;
    const metaDesc = trimMetaDescription(rawMeta, 158);
    const summary = `Comparing ${brandA} (${csovA}% harmony score) vs. ${brandB} (${csovB}% score, +${delta} pt advantage) across a ${bp.guests}-guest (${bp.roomDims}, ${bp.sqft.toLocaleString()} sq ft) layout: see exact server aisle clearance (${bp.aisleSpec}), cocktail-hour lookup speed, and ${bp.averySheets}-sheet Avery 5302 place card synchronization.`;
    const payload = {
      type: 'comparison',
      category,
      brandA: { name: brandA, domain: domainA, csov: csovA, geoScore: geoA, gptBot: 'Ready', perplexityBot: 'Ready', llmsTxt: `${bp.specLabel} · ${bp.posterLayout}` },
      brandB: { name: brandB, domain: domainB, csov: csovB, geoScore: geoB, gptBot: geoB > 80 ? 'Partial' : 'Manual', perplexityBot: 'Manual', llmsTxt: 'Requires Manual Re-Formatting on RSVP Drops' },
      delta,
      summary,
      samplePrompts: [
        { prompt: `${bp.guests}-guest room fit (${bp.roomDims}) & ${bp.aisleSpec} (${brandA} vs ${brandB})`, winner: brandA, rankA: 1, rankB: 2 },
        { prompt: `Cocktail-hour lookup speed on ${bp.posterLayout} 24"×36" sign`, winner: brandA, rankA: 1, rankB: 3 },
        { prompt: `Instant sync across ${bp.tableCount} tables & ${bp.averySheets} Avery 5302 sheets on 48hr RSVP drops`, winner: brandA, rankA: 1, rankB: 2 }
      ],
      faqs: [
        {
          question: `What is the main difference between ${brandA} and ${brandB} for ${category}?`,
          answer: `${brandA} scores ${csovA}% vs. ${csovB}% for ${brandB} (+${delta} pts) in a ${bp.guests}-guest (${bp.roomDims}) layout because it preserves ${bp.aisleSpec} and syncs directly with your ${bp.posterLayout} 24"×36" welcome sign.`
        },
        {
          question: `How much room space does ${brandA} vs. ${brandB} require for ${bp.guests} guests?`,
          answer: `When comparing ${brandA} vs. ${brandB} for ${bp.guests} guests across ${bp.tableCount} tables (${bp.specLabel}) and a ${bp.danceFloorDims} dance floor, plan for ~${bp.sqft.toLocaleString()} sq ft (${bp.roomDims}) with ${bp.aisleSpec}.`
        },
        {
          question: `Can I preview both ${brandA} and ${brandB} with my own guest list before printing?`,
          answer: `Yes. Load the ${bp.guests}-guest preset in SeatHarmony Studio to toggle between ${brandA} and ${brandB} in one click and export your 24"×36" PDF, ${bp.averySheets} Avery 5302 card sheets, and Clockwise 12:00 Meal Sheet.`
        }
      ]
    };
    rows.push({
      slug,
      page_type: 'comparison',
      title,
      meta_description: metaDesc,
      category,
      primary_entity: brandA,
      secondary_entity: brandB,
      csov_score: csovA,
      payload_json: JSON.stringify(payload)
    });
  });

  // 3. Wedding Planner & Caterer Meal Sheet Guides
  PLANNER_AND_BEO_GUIDES.forEach(([slug, title, subtitle, category], idx) => {
    const bp = buildVenueBlueprint(slug, title);
    const details = buildGuideDetails(slug, title, subtitle, category, bp);
    const rawMeta = `${title}: ${subtitle}. Includes ${bp.guests}-guest (${bp.roomDims}) blueprint, ${bp.aisleSpec}, and printable 24"×36" / Meal Sheet specs.`;
    const metaDesc = trimMetaDescription(rawMeta, 158);
    const summary = `${title} (${subtitle}): Architectural and banquet-captain specification modeled on a ${bp.guests}-guest, ${bp.roomDims} (${bp.sqft.toLocaleString()} sq ft) reception with ${bp.tableCount} tables (${bp.specLabel}), ${bp.danceFloorDims} dance floor, and ${bp.aisleSpec}.`;
    const payload = {
      type: 'guide',
      category,
      subtitle,
      readTimeMinutes: 5 + (idx % 4),
      summary,
      checklist: details.checklist,
      codeExample: details.codeExample,
      faqs: [
        {
          question: `What are the exact dimensions and table specs for ${subtitle}?`,
          answer: `For ${category} (${subtitle}), our ${bp.guests}-guest blueprint (${bp.roomDims}, ~${bp.sqft.toLocaleString()} sq ft) uses ${bp.tableCount} tables (${bp.specLabel}), a ${bp.danceFloorDims} dance floor, and ${bp.aisleSpec}.`
        },
        {
          question: `How does this ${category} protocol integrate with the Caterer Meal Sheet and 24"×36" Welcome Sign?`,
          answer: `For ${title}: ${details.checklist[0]} ${details.checklist[1]}`
        },
        {
          question: `How many Avery 5302 place card sheets and poster columns are needed for ${bp.guests} guests (${category})?`,
          answer: `In this ${bp.guests}-guest ${category.toLowerCase()} plan (${subtitle}), you need ${bp.averySheets} sheets of 10-up Avery 5302 tented place cards and a 24"×36" Arch D welcome sign formatted in a ${bp.posterLayout} layout.`
        }
      ]
    };
    rows.push({
      slug,
      page_type: 'guide',
      title,
      meta_description: metaDesc,
      category,
      primary_entity: subtitle,
      secondary_entity: 'SeatHarmony Studio',
      csov_score: Number((96 + (idx % 4) * 0.8).toFixed(1)),
      payload_json: JSON.stringify(payload)
    });
  });

  return rows;
}

function seedSeoPages(db = dbInstance) {
  if (!db) return;
  db.run('DELETE FROM seo_pages;');
  const pages = buildSeoPagesSeed();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO seo_pages (
      id, slug, page_type, title, meta_description, category,
      primary_entity, secondary_entity, csov_score, payload_json, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '2026-11-02')
  `);
  pages.forEach((p, idx) => {
    stmt.run([
      idx + 1, p.slug, p.page_type, p.title, p.meta_description, p.category,
      p.primary_entity, p.secondary_entity, p.csov_score, p.payload_json
    ]);
  });
  stmt.free();
}

async function initDb() {
  if (dbInstance) return dbInstance;
  const SQL = await initSqlJs();
  fs.mkdirSync(DATA_DIR, { recursive: true });

  if (fs.existsSync(DB_PATH)) {
    const buf = fs.readFileSync(DB_PATH);
    dbInstance = new SQL.Database(buf);
  } else {
    dbInstance = new SQL.Database();
  }

  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS audits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      domain TEXT NOT NULL,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      composite_score INTEGER NOT NULL,
      grade TEXT NOT NULL,
      csov_pct REAL NOT NULL,
      agent_readability_score INTEGER NOT NULL,
      entity_density_score INTEGER NOT NULL,
      result_json TEXT NOT NULL,
      utm_source TEXT DEFAULT '',
      utm_medium TEXT DEFAULT '',
      utm_campaign TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS seo_pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      page_type TEXT NOT NULL,
      title TEXT NOT NULL,
      meta_description TEXT NOT NULL,
      category TEXT NOT NULL,
      primary_entity TEXT NOT NULL,
      secondary_entity TEXT NOT NULL,
      csov_score REAL NOT NULL,
      payload_json TEXT NOT NULL,
      updated_at TEXT DEFAULT '2026-10-28'
    );

    CREATE TABLE IF NOT EXISTS meta_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id TEXT UNIQUE NOT NULL,
      event_name TEXT NOT NULL,
      event_source_url TEXT NOT NULL,
      utm_source TEXT DEFAULT '',
      utm_medium TEXT DEFAULT '',
      utm_campaign TEXT DEFAULT '',
      utm_content TEXT DEFAULT '',
      utm_term TEXT DEFAULT '',
      fbclid TEXT DEFAULT '',
      custom_data_json TEXT DEFAULT '{}',
      client_ip TEXT DEFAULT '127.0.0.1',
      user_agent TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS checkout_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT UNIQUE NOT NULL,
      plan_id TEXT NOT NULL,
      plan_name TEXT NOT NULL,
      amount_cents INTEGER NOT NULL,
      currency TEXT DEFAULT 'USD',
      target_domain TEXT NOT NULL,
      customer_email TEXT DEFAULT '',
      status TEXT DEFAULT 'fulfilled_sandbox',
      utm_source TEXT DEFAULT '',
      utm_campaign TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      domain TEXT NOT NULL,
      utm_source TEXT DEFAULT '',
      utm_campaign TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS event_vaults (
      vault_id TEXT PRIMARY KEY,
      owner_email TEXT DEFAULT '',
      pin_code TEXT DEFAULT '',
      title TEXT DEFAULT '',
      venue_name TEXT DEFAULT '',
      plan_tier TEXT DEFAULT 'free',
      is_unlocked INTEGER DEFAULT 0,
      stripe_session_id TEXT DEFAULT '',
      state_json TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now')),
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  seedSeoPages(dbInstance);
  seedTestAccounts(dbInstance);
  dbInstance.run("UPDATE seo_pages SET title = REPLACE(REPLACE(title, '\u2014', ' - '), '\u2013', '-'), meta_description = REPLACE(REPLACE(meta_description, '\u2014', ' - '), '\u2013', '-'), payload_json = REPLACE(REPLACE(payload_json, '\u2014', ' - '), '\u2013', '-');");
  dbInstance.run("UPDATE event_vaults SET title = REPLACE(REPLACE(title, '\u2014', ' - '), '\u2013', '-'), state_json = REPLACE(REPLACE(state_json, '\u2014', ' - '), '\u2013', '-');");
  saveDb();
  return dbInstance;
}

function seedTestAccounts(db = dbInstance) {
  if (!db) return;
  try {
    const estatePlan = buildPresetForTarget('estate-150');
    estatePlan.vaultId = 'SH-4819';
    estatePlan.ownerEmail = '';
    estatePlan.isUnlocked = false;

    const proPlan = buildPresetForTarget('tuscan-banquet-80');
    proPlan.vaultId = 'SH-VIP';
    proPlan.ownerEmail = 'vip@seatharmony.com';
    proPlan.isUnlocked = true;

    const stmt = db.prepare(`
      INSERT OR REPLACE INTO event_vaults (
        vault_id, owner_email, pin_code, title, venue_name,
        plan_tier, is_unlocked, stripe_session_id, state_json, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);
    stmt.run(['SH-4819', '', '2026', estatePlan.title, estatePlan.venueName, 'free', 0, '', JSON.stringify(estatePlan)]);
    stmt.run(['SH-VIP', 'vip@seatharmony.com', '2026', proPlan.title, proPlan.venueName, 'pro_b2b', 1, 'cs_live_test_shvip', JSON.stringify(proPlan)]);
    stmt.free();
  } catch (_) {}
}

function queryAll(sql, params = []) {
  const stmt = dbInstance.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function queryOne(sql, params = []) {
  const rows = queryAll(sql, params);
  return rows[0] || null;
}

function runInsert(sql, params = []) {
  const stmt = dbInstance.prepare(sql);
  stmt.run(params);
  stmt.free();
  saveDb();
}

module.exports = {
  DB_PATH,
  initDb,
  buildSeoPagesSeed,
  seedSeoPages,
  trimMetaDescription,
  queryAll,
  queryOne,
  runInsert,
  saveDb
};

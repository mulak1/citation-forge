/**
 * SeatHarmony (#2) - 75 Unique Programmatic SEO & Venue Directory Visuals
 */

function getVenueVisual(slug = '', title = '', category = '') {
  const s = `${slug} ${title} ${category}`.toLowerCase();
  if (/server-aisle-clearance|table-spacing/i.test(s)) {
    return {
      img: '/public/venue-server-aisle-clearance.jpg',
      tag: '60″ Server Aisle Clearance',
      name: 'Grand Ballroom 60-Inch Server Corridor & Service Clearance'
    };
  }
  if (/60-inch-round-table-8-vs-9-vs-10/i.test(s)) {
    return {
      img: '/public/venue-60-inch-9-charger-spacing.jpg',
      tag: '9-Charger 60″ Round Spacing',
      name: 'Curated 60-Inch Round Table 9-Charger Sightline Setting'
    };
  }
  if (/8-person-60-inch|60-inch-round-table/i.test(s)) {
    return {
      img: '/public/venue-charger-plate-rounds.jpg',
      tag: '60″ Round Charger Spacing',
      name: 'Impeccable 60-Inch Round Charger Plate & Centerpiece Setting'
    };
  }
  if (/bridal-party-plus-ones|bridal-party.*dates/i.test(s)) {
    return {
      img: '/public/venue-bridal-party-dates.jpg',
      tag: 'Bridal Party & Dates King’s Table',
      name: 'Vaulted Cloister Hall Royal Bridal Party & Dates Feasting Table'
    };
  }
  if (/vendor-meal-table/i.test(s)) {
    return {
      img: '/public/venue-vendor-meal-table.jpg',
      tag: 'Vendor Dining Alcove',
      name: 'Quiet Private Dining Alcove & Vendor Hospitality Table'
    };
  }
  if (/b2b-field-marketing/i.test(s)) {
    return {
      img: '/public/venue-welcome-dinner-terrace.jpg',
      tag: 'Sunset Welcome Dinner Terrace',
      name: 'Vineyard Stone Terrace Sunset Welcome Dinner Banquet'
    };
  }
  if (/how-to-seat-divorced-parents/i.test(s)) {
    return {
      img: '/public/venue-separated-family-wings.jpg',
      tag: 'Separated Family Wing Orangery',
      name: 'Sunlit European Orangery Symmetrical Family Wing Seating'
    };
  }
  if (/bride-and-groom-parents-same-table/i.test(s)) {
    return {
      img: '/public/venue-winery-sandbox.jpg',
      tag: 'Parents’ VIP Estate Table',
      name: 'Vineyard Veranda Parents’ Host Table'
    };
  }
  if (/print-bleed-crop-marks|fedex-staples.*bleed/i.test(s)) {
    return {
      img: '/public/showcase-canva-print-bleed-guide.jpg',
      tag: '0.125″ Bleed & Crop Marks',
      name: 'Professional 0.125″ Print Bleed & Crop Boundary Inspection Desk'
    };
  }
  if (/cocktail-hour-qr-code-find-my-seat|qr-code.*setup-guide/i.test(s)) {
    return {
      img: '/public/showcase-cocktail-qr-stand.jpg',
      tag: 'Cocktail Hour Bar QR Sign',
      name: 'Brushed Brass Framed QR Seat Finder at Conservatory Cocktail Bar'
    };
  }
  if (/clockwise-caterer-beo-table-numbering/i.test(s)) {
    return {
      img: '/public/showcase-caterer-beo-clipboard.jpg',
      tag: 'Caterer BEO Plating Pass',
      name: 'Banquet Kitchen Plating Pass & Clockwise Table Meal Manifest'
    };
  }
  if (/seatharmony-vs-canva/i.test(s)) {
    return {
      img: '/public/showcase-canva-vs-auto-sign.jpg',
      tag: 'Canva vs. Auto-Generated Sign',
      name: 'Manual Text Box Formatting vs. 1-Click Arch D 24″×36″ Print Generation'
    };
  }
  if (/fedex-staples-canva|templett-corjl/i.test(s)) {
    return {
      img: '/public/showcase-poster-24x36.png',
      tag: 'Arch D 24″×36″ Print Specification',
      name: '0.125″ Bleed Print Proof for Professional Print Shops'
    };
  }
  if (/how-to-handle-last-minute/i.test(s)) {
    return {
      img: '/public/venue-last-minute-rsvp-triage.jpg',
      tag: '48-Hour RSVP Command Desk',
      name: '48-Hour Wedding Planner Command Desk & Seating Rebalancer'
    };
  }
  if (/how-to-import-messy/i.test(s)) {
    return {
      img: '/public/showcase-csv-cleaning-workspace.jpg',
      tag: '10-Second CSV Auto-Mapper',
      name: 'Messy Guest List Auto-Cleaner & Column Mapping Workspace'
    };
  }
  if (/seatharmony-vs-google-sheets/i.test(s)) {
    return {
      img: '/public/showcase-sheets-vs-visual-studio.jpg',
      tag: 'Spreadsheet vs. Visual Floorplan',
      name: 'Gridlock Spreadsheet vs. Drag-and-Drop Visual Seating Studio'
    };
  }
  if (/seatharmony-vs-zola/i.test(s)) {
    return {
      img: '/public/showcase-zola-vs-visual-studio.jpg',
      tag: 'Zola vs. SeatHarmony',
      name: 'Registry Text Checklist vs. Real-Time Table Conflict Auto-Solver'
    };
  }
  if (/seatharmony-vs-weddingwire|the-knot/i.test(s)) {
    return {
      img: '/public/showcase-theknot-vs-visual-studio.jpg',
      tag: 'The Knot vs. SeatHarmony',
      name: 'Ad-Cluttered Portal vs. Clean Seating Studio & Caterer BEO Export'
    };
  }
  if (/seatharmony-vs-prismm/i.test(s)) {
    return {
      img: '/public/showcase-vault-command.png',
      tag: 'Event Command Vault',
      name: 'Interactive Visual Table Rings & Deliverables Vault'
    };
  }
  if (/round-tables-vs-long-banquet/i.test(s)) {
    return {
      img: '/public/venue-mixed-rounds-banquet.jpg',
      tag: 'Harmonic Rounds & Harvest Tables',
      name: 'Curated Mixed Round & Long Banquet Conservatory'
    };
  }
  if (/singles-table-vs-mixed-friend/i.test(s)) {
    return {
      img: '/public/venue-social-banquet-table.jpg',
      tag: 'Social Friend Banquet Table',
      name: 'Chic Mixed Friend Group Al Fresco Feasting Table'
    };
  }
  if (/u-shape|parallel-banquet/i.test(s)) {
    return {
      img: '/public/venue-u-shape-banquet.jpg',
      tag: 'Grand U-Shape Banquet',
      name: 'Grand Symmetrical U-Shape Banquet Table & Vaulted Hall'
    };
  }
  if (/wheelchair|highchair-wedding-table/i.test(s)) {
    return {
      img: '/public/venue-accessible-table.jpg',
      tag: 'Accessible Family-Inclusive Setting',
      name: 'Inclusive Estate Reception Setting & Accessible Highchair Clearance'
    };
  }
  if (/kids-table|children-with-parents|highchair/i.test(s)) {
    return {
      img: '/public/venue-childrens-table.jpg',
      tag: 'Children’s Banquet Table',
      name: 'Exquisite Children’s Table & Matching Highchair Setting'
    };
  }
  if (/250-guest-estate-tent/i.test(s)) {
    return {
      img: '/public/venue-250-guest-estate-tent.jpg',
      tag: '250-Guest Estate Sailcloth Tent',
      name: '250-Guest High-Peak Sailcloth Marquee & Country Estate Lawn'
    };
  }
  if (/where-to-seat-grandparents|acoustic.*zone|grandparents.*dj/i.test(s)) {
    return {
      img: '/public/venue-quiet-acoustic-salon.jpg',
      tag: 'Quiet Acoustic Dining Salon',
      name: 'Quiet Acoustic Dining Alcove & Grandparents’ VIP Table'
    };
  }
  if (/180-guest-museum|museum-rotunda/i.test(s)) {
    return {
      img: '/public/venue-historic-rotunda.jpg',
      tag: 'Museum Marble Rotunda',
      name: 'Art Museum Rotunda & Grand Colonnade'
    };
  }
  if (/160-guest-industrial|industrial-loft/i.test(s)) {
    return {
      img: '/public/venue-modern-loft.jpg',
      tag: 'Modern Timber Loft',
      name: 'Urban Timber & Exposed Brick Industrial Loft'
    };
  }
  if (/75-guest-destination|destination-wedding-villa/i.test(s)) {
    return {
      img: '/public/venue-coastal-cliffside.jpg',
      tag: 'Cliffside Destination Villa',
      name: 'Mediterranean Cliffside Villa & Sea View'
    };
  }
  if (/60-guest-rehearsal-dinner/i.test(s)) {
    return {
      img: '/public/venue-wine-cellar.jpg',
      tag: 'Intimate Rehearsal Cellar',
      name: 'Historic Vaulted Brick Rehearsal Dinner Cellar'
    };
  }
  if (/mom-sandbox-link/i.test(s)) {
    return {
      img: '/public/venue-family-collaboration-veranda.jpg',
      tag: 'Vineyard Veranda Family Table',
      name: 'Vineyard Stone Veranda Mother & Daughter Seating Review'
    };
  }
  if (/collaborate-with-mothers/i.test(s)) {
    return {
      img: '/public/venue-two-moms-collaboration.jpg',
      tag: 'Two-Mom Tasting Room',
      name: 'Napa Valley Tasting Room Mother Collaboration & Seating Harmonizer'
    };
  }
  if (/mom-sandbox/i.test(s)) {
    return {
      img: '/public/venue-winery-sandbox.jpg',
      tag: 'Family Table Sandbox',
      name: 'Collaborative Family Table Sandbox at Vineyard Estate'
    };
  }
  if (/qr-code|find-my-seat|cocktail-hour-qr/i.test(s)) {
    return {
      img: '/public/showcase-mobile-qr.png',
      tag: 'Mobile QR Seat Finder Pass',
      name: 'Smartphone Cocktail-Hour Instant Seat Finder Pass'
    };
  }
  if (/avery-5302|folded-place-card/i.test(s)) {
    return {
      img: '/public/showcase-avery-5302.png',
      tag: 'Avery 5302 Place Cards',
      name: 'Standard Avery 5302 4-Up Letter Place Card Sheet'
    };
  }
  if (/escort-cards-vs-24x36/i.test(s)) {
    return {
      img: '/public/ugc-escort-cards-wax.jpg',
      tag: 'Wax Seal Escort Cards',
      name: 'Artisan Wax-Sealed Escort Cards on Linen Table'
    };
  }
  if (/plated-dinner-place-cards|buffet-table/i.test(s)) {
    return {
      img: '/public/ugc-place-card-table.jpg',
      tag: 'Meal-Coded Place Setting',
      name: 'Caterer Meal-Coded Place Card on Gold Charger'
    };
  }
  if (/peanut.*celiac|allergy-wedding-catering/i.test(s)) {
    return {
      img: '/public/venue-allergy-safety-catering-pass.jpg',
      tag: 'Catering Plating & Allergy Pass',
      name: 'Banquet Catering Pass & Severe Allergy Protocol Station'
    };
  }
  if (/clockwise-12-oclock-seat-numbering-vs-random|clockwise.*vs.*random/i.test(s)) {
    return {
      img: '/public/showcase-clockwise-server-sync.jpg',
      tag: 'Synchronized Banquet Service',
      name: 'Clockwise 12:00 Ballroom Server Synchronization & Cloche Service'
    };
  }
  if (/clockwise|caterer-beo/i.test(s)) {
    return {
      img: '/public/showcase-signed-beo.png',
      tag: 'Clockwise 12:00 Caterer BEO',
      name: 'Official Banquet Event Order & 12 O’Clock Server Seat Manifest'
    };
  }
  if (/mini-floorplan-map/i.test(s)) {
    return {
      img: '/public/showcase-mini-map-welcome-sign.jpg',
      tag: '24″×36″ Map + Alphabetical Sign',
      name: 'Easel-Mounted 24″×36″ Archival Sign With Integrated Table Map'
    };
  }
  if (/18x24-vs-24x36/i.test(s)) {
    return {
      img: '/public/showcase-18x24-vs-24x36.jpg',
      tag: '18″×24″ vs. 24″×36″ Sizing',
      name: 'Side-by-Side 18″×24″ vs. 24″×36″ Reception Sign Sizing & Legibility Comparison'
    };
  }
  if (/foam-board.*acrylic|acrylic-welcome-sign/i.test(s)) {
    return {
      img: '/public/showcase-foamboard-vs-acrylic.jpg',
      tag: 'Foam Board vs. Acrylic Glare',
      name: 'Matte Archival Foam Board vs. Glossy Acrylic Sunlight Legibility'
    };
  }
  if (/how-many-names-fit|foam-board/i.test(s)) {
    return {
      img: '/public/ugc-welcome-sign-easel.jpg',
      tag: '24″×36″ Welcome Sign on Easel',
      name: 'Arch D 24″×36″ Welcome Sign on Natural Wood Easel'
    };
  }
  if (/alphabetical-vs-by-table/i.test(s)) {
    return {
      img: '/public/showcase-alphabetical-guest-flow.jpg',
      tag: 'A-Z Cocktail Hour Flow',
      name: 'Fast 1.4-Second Alphabetical Guest Check-In & Line Bypass'
    };
  }
  if (/poster-size-and-font-guide/i.test(s)) {
    return {
      img: '/public/ugc-seating-chart-easel.jpg',
      tag: '20pt Serif Alphabetical Sign',
      name: 'High-Contrast 20pt Serif Alphabetical Seating Sign'
    };
  }
  if (/prismm|allseated/i.test(s)) {
    return {
      img: '/public/showcase-vault-command.png',
      tag: 'Event Command Vault',
      name: 'SeatHarmony Cloud Event Command & Deliverables Vault'
    };
  }
  if (/sweetheart-table-vs-kings|sweetheart.*vs.*king/i.test(s)) {
    return {
      img: '/public/venue-sweetheart-vs-kings.jpg',
      tag: 'Sweetheart vs King’s Layout',
      name: 'Cathedral Arch Reception Hall & Sweetheart / King’s Duality'
    };
  }
  if (/40x100/i.test(s)) {
    return {
      img: '/public/venue-40x100-grand-tent.jpg',
      tag: '40x100 Grand Sailcloth Tent',
      name: 'Expansive 40x100 High-Peak Sailcloth Marquee & Meadow Glow'
    };
  }
  if (/40x80/i.test(s)) {
    return {
      img: '/public/venue-pole-tent-meadow.jpg',
      tag: 'Twin-Pole Sailcloth Tent',
      name: 'Grand Twin-Pole Sailcloth Tent on Meadow Lawn'
    };
  }
  if (/20x40/i.test(s)) {
    return {
      img: '/public/venue-20x40-micro-backyard-tent.jpg',
      tag: '20x40 Micro-Backyard Tent',
      name: 'Private Suburban Garden Clear-Span Frame Tent & Hydrangeas'
    };
  }
  if (/150-guest-wedding-seating-chart-round-tables|150[- ]?guest.*round.*table/i.test(s)) {
    return {
      img: '/public/venue-150-guest-grand-estate.jpg',
      tag: '150-Guest Grand Estate',
      name: 'Light-Filled Grand Estate Ballroom & Parquet Dance Floor'
    };
  }
  if (/beach-club|yacht|harbor|marina/i.test(s)) {
    return {
      img: '/public/venue-coastal-beach-club.jpg',
      tag: 'Coastal Yacht & Beach Club',
      name: 'The Oceanfront Yacht & Beach Club Terrace'
    };
  }
  if (/winery|vineyard|napa|sonoma/i.test(s)) {
    return {
      img: '/public/venue-napa-vineyard.jpg',
      tag: 'Vineyard Estate',
      name: 'Napa Valley Vineyard Estate & Olive Courtyard'
    };
  }
  if (/barn|timber frame|rustic barn/i.test(s)) {
    return {
      img: '/public/venue-modern-barn.jpg',
      tag: 'Modern Timber Barn',
      name: 'Upscale Modern Barn & Farm Hall'
    };
  }
  if (/villa|amalfi|cliffside|mediterranean|destination/i.test(s)) {
    return {
      img: '/public/venue-destination-villa.jpg',
      tag: 'Mediterranean Seaside Villa',
      name: 'Mediterranean Cliffside Villa & Poolside Terrace'
    };
  }
  if (/rooftop|penthouse|skyline/i.test(s)) {
    return {
      img: '/public/venue-rooftop-penthouse.jpg',
      tag: 'Urban Rooftop Penthouse',
      name: 'Chic Urban Rooftop Penthouse Terrace'
    };
  }
  if (/loft|warehouse|industrial|brick/i.test(s)) {
    return {
      img: '/public/venue-industrial-loft.jpg',
      tag: 'Industrial Loft',
      name: 'Historic Brick & Timber Industrial Loft'
    };
  }
  if (/conservatory|greenhouse|botanical|orangery/i.test(s)) {
    return {
      img: '/public/venue-botanical-conservatory.jpg',
      tag: 'Botanical Greenhouse',
      name: 'Glass Greenhouse & Botanical Orangery'
    };
  }
  if (/museum|rotunda|art museum|gallery/i.test(s)) {
    return {
      img: '/public/venue-museum-rotunda.jpg',
      tag: 'Classical Museum Rotunda',
      name: 'Neoclassical Art Museum Marble Rotunda'
    };
  }
  if (/country[- ]?club|golf/i.test(s)) {
    return {
      img: '/public/venue-country-club.jpg',
      tag: 'Private Country Club',
      name: 'Private Country Club Ballroom & Rolling Green Terrace'
    };
  }
  if (/serpentine|s-curve/i.test(s)) {
    return {
      img: '/public/venue-serpentine-estate.jpg',
      tag: 'Serpentine Garden Banquet',
      name: 'Winding Serpentine Banquet Table in Italianate Garden'
    };
  }
  if (/80[- ]?guest/i.test(s)) {
    return {
      img: '/public/venue-intimate-courtyard-banquet.jpg',
      tag: 'Tuscan Courtyard Feast Tables',
      name: 'Secluded Stone Villa Courtyard & Parallel Feasting Tables'
    };
  }
  if (/micro[- ]?wedding|king['’]?s[- ]?table|continuous king/i.test(s)) {
    return {
      img: '/public/venue-micro-wedding-kings.jpg',
      tag: 'Intimate King’s Feast Table',
      name: 'Long Continuous King’s Feast Table & Candelabras'
    };
  }
  if (/40[- ]?guest|b2b[- ]?vip|executive[- ]?dinner|intimate private dining/i.test(s)) {
    return {
      img: '/public/venue-intimate-private-dining.jpg',
      tag: 'Private Dining Salon',
      name: 'Historic Townhouse Private Dining Salon & Fireplace Mantle'
    };
  }
  if (/restaurant[- ]?buyout|bistro/i.test(s)) {
    return {
      img: '/public/venue-restaurant-buyout.jpg',
      tag: 'Boutique Restaurant Buyout',
      name: 'Boutique Urban Restaurant Buyout & Velvet Banquettes'
    };
  }
  if (/frame[- ]?tent|backyard|20x40-tent|30x60-tent/i.test(s)) {
    return {
      img: '/public/venue-backyard-frame-tent.jpg',
      tag: 'Private Estate Frame Tent',
      name: 'Private Estate Backyard Frame Tent & Sheer Drapes'
    };
  }
  if (/l[- ]?shaped|t[- ]?shaped/i.test(s)) {
    return {
      img: '/public/venue-l-and-t-shaped.jpg',
      tag: 'L & T-Shaped Feast',
      name: 'Modern Architectural L-Shaped & T-Shaped Feast Tables'
    };
  }
  if (/rehearsal-dinner-to-reception|dont-repeat-tablemates/i.test(s)) {
    return {
      img: '/public/venue-rehearsal-barrel-vault.jpg',
      tag: 'Candlelit Barrel Vault',
      name: 'Historic Limestone Wine Barrel Vault Rehearsal Banquet'
    };
  }
  if (/cellar|vault/i.test(s)) {
    return {
      img: '/public/venue-historic-wine-cellar.jpg',
      tag: 'Historic Wine Cellar',
      name: 'Atmospheric Arched Brick & Limestone Wine Vault'
    };
  }
  if (/40x80|40x100|twin[- ]?pole|pole[- ]?tent/i.test(s)) {
    return {
      img: '/public/venue-pole-tent-meadow.jpg',
      tag: 'Twin-Pole Sailcloth Tent',
      name: 'Grand Twin-Pole Sailcloth Tent on Meadow Lawn'
    };
  }
  if (/40x60-tent|garden[- ]?marquee|clear[- ]?top/i.test(s)) {
    return {
      img: '/public/venue-garden-marquee.jpg',
      tag: 'Walled Garden Marquee',
      name: 'Clear-Top Garden Marquee & Hanging Greenery Chandeliers'
    };
  }
  if (/tent|sailcloth|marquee|outdoor|lawn|rain|canopy/i.test(s)) {
    return {
      img: '/public/venue-sailcloth-tent.jpg',
      tag: 'Sailcloth Tent & Lawn',
      name: 'High-Peak Sailcloth Tent & Meadow Lawn'
    };
  }
  if (/cultural[- ]?fusion|multi[- ]?generational|mandap|chuppah/i.test(s)) {
    return {
      img: '/public/venue-cultural-fusion.jpg',
      tag: 'Cultural Fusion Ballroom',
      name: 'Grand Cultural Fusion Ballroom & Jewel-Tone Floral Arch'
    };
  }
  if (/black[- ]?tie/i.test(s)) {
    return {
      img: '/public/venue-black-tie-ballroom.jpg',
      tag: 'Black-Tie Gala Ballroom',
      name: 'Black-Tie Gala Ballroom & Silver Candelabras'
    };
  }
  if (/hybrid|mixed[- ]?round|mixed banquet/i.test(s)) {
    return {
      img: '/public/venue-hybrid-banquet.jpg',
      tag: 'Mixed Round & Banquet Layout',
      name: 'Architectural Mixed Rounds & Wooden Harvest Tables'
    };
  }
  if (/charity-gala-corporate-table-captain|playbook/i.test(s)) {
    return {
      img: '/public/venue-gala-table-captain.jpg',
      tag: 'Table Captain Host Station',
      name: 'Grand Ballroom Table Captain Host Station & Program Setting'
    };
  }
  if (/charity[- ]?gala|table[- ]?captain/i.test(s)) {
    return {
      img: '/public/venue-charity-gala.jpg',
      tag: 'Grand Civic Gala',
      name: 'Grand Civic Gala Hall & Symmetrical Table Captain Layout'
    };
  }
  if (/40[- ]?guest|b2b[- ]?vip|executive[- ]?dinner|private dining room/i.test(s)) {
    return {
      img: '/public/venue-intimate-private-dining.jpg',
      tag: 'Private Dining Salon',
      name: 'Historic Townhouse Private Dining Salon & Fireplace Mantle'
    };
  }
  if (/sweetheart[- ]?table|sweetheart[- ]?anchor/i.test(s)) {
    return {
      img: '/public/venue-sweetheart-anchor.jpg',
      tag: 'Sweetheart Table Anchor',
      name: 'Elevated Sweetheart Table & Curved Floral Arch Backdrop'
    };
  }
  if (/ballroom|hotel|gala|grand|formal|chandelier/i.test(s)) {
    return {
      img: '/public/venue-grand-ballroom.jpg',
      tag: 'Grand Ballroom',
      name: 'Grand Ballroom & Crystal Chandelier Banquet Hall'
    };
  }
  if (/80[- ]?guest.*courtyard|80[- ]?guest.*banquet|courtyard[- ]?banquet/i.test(s)) {
    return {
      img: '/public/venue-intimate-courtyard-banquet.jpg',
      tag: 'Tuscan Courtyard Feast Tables',
      name: 'Secluded Stone Villa Courtyard & Parallel Feasting Tables'
    };
  }
  if (/tuscan|courtyard|patio|al fresco|terrace|italian|olive/i.test(s)) {
    return {
      img: '/public/venue-tuscan-courtyard.jpg',
      tag: 'Tuscan Courtyard',
      name: 'Villa Cipressi Olive Grove Courtyard'
    };
  }
  if (/conservatory|greenhouse|botanical|orangery|garden|glass/i.test(s)) {
    return {
      img: '/public/venue-botanical-conservatory.jpg',
      tag: 'Botanical Greenhouse',
      name: 'Glass Greenhouse & Botanical Orangery'
    };
  }
  if (/cellar|intimate|micro|rehearsal|candlelit|vault|private dining/i.test(s)) {
    return {
      img: '/public/venue-historic-wine-cellar.jpg',
      tag: 'Candlelit Wine Cellar',
      name: 'Historic Brick Wine Cellar & Vault'
    };
  }
  if (/120[- ]?guest|classic[- ]?reception/i.test(s)) {
    return {
      img: '/public/venue-classic-reception-hall.jpg',
      tag: 'Classic Estate Hall',
      name: 'Light-Filled Estate Reception Hall & Coffered Ceilings'
    };
  }
  if (/60[- ]?inch[- ]?round|charger[- ]?plate/i.test(s)) {
    return {
      img: '/public/venue-charger-plate-rounds.jpg',
      tag: '60-Inch Round Charger Spacing',
      name: 'Impeccable 60-Inch Round Charger Plate & Centerpiece Setting'
    };
  }
  return {
    img: '/public/venue-rosewood-estate.jpg',
    tag: 'Private Country Estate',
    name: 'The Conservatory at Rosewood Estate'
  };
}

module.exports = { getVenueVisual };

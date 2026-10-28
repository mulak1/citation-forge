'use strict';

const seatingEngine = require('./seating-engine');

const PRESET_PROFILES = seatingEngine.SEATING_PRESETS;
const CATEGORY_TAXONOMY = ['Wedding & Rehearsal Reception', 'Planner BEO & Venue Floorplan', 'B2B VIP Executive Dinner', 'Charity Gala & Table Captains'];

function normalizeTarget(raw) {
  return String(raw || 'estate-150').trim().toLowerCase() || 'estate-150';
}

function positionWeight(rank) {
  return rank === 1 ? 1.0 : 0.7;
}

module.exports = {
  ...seatingEngine,
  PRESET_PROFILES,
  CATEGORY_TAXONOMY,
  normalizeTarget,
  positionWeight
};

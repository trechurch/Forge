// avTierGenerator.js

import { bindWhenReady } from './uiReady.js';

export function generateAvTier({
  altitude = 120000,      // central altitude of band
  thickness = 5000,        // vertical spread
  tierLevel = 1,           // classification index
  direction = 'N',         // for visual placement
  materialFn,              // optional: returns material by tierLevel
  colorOverride,           // optional: force color across tier
}) {
  const caps = [];

  const numCaps = 6; // placeholder — will link to altitude/thickness ratio
  const offsetStep = thickness / numCaps;

  for (let i = 0; i < numCaps; i++) {
    const yOffset = altitude + (i * offsetStep) - thickness / 2;

    caps.push({
      altitude: yOffset,
      direction,
      tierLevel,
      material: materialFn?.(tierLevel, i) ?? null,
      color: colorOverride ?? null,
      tag: `Tier-${tierLevel}-Cap-${i}`,
    });
  }

  return caps;
}

// forgeBands.js

import { generateAvTier } from './avTierGenerator.js';
import { createDirectionalCap } from './createDirectionalCap.js';

export function forgeAvBands({
  altitude = 120000,
  thickness = 5000,
  tierLevel = 1,
  direction = 'N',
  scene,
  materialFn,
  colorOverride,
  debug = false,
}) {
  const tierCaps = generateAvTier({
    altitude,
    thickness,
    tierLevel,
    direction,
    materialFn,
    colorOverride,
  });

  const capMeshes = [];

  tierCaps.forEach((capData, index) => {
    const mesh = createDirectionalCap({
      altitude: capData.altitude,
      direction: capData.direction,
      tierLevel: capData.tierLevel,
      material: capData.material,
      color: capData.color,
      tag: capData.tag,
    });

    scene.add(mesh);
    capMeshes.push(mesh);

    if (debug) {
      console.log(`[Forge] Placed: ${capData.tag}`);
    }
  });

  return capMeshes;
}

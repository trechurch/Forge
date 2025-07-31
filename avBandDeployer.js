// avBandDeployer.js
import { bindWhenReady } from './uiReady.js';
import * as THREE from 'three';

export function initAVDeployer(scene, materialBank) {
  const EARTH_RADIUS = 1.5;
  const TIER_COUNT = 3;
  const TIER_SPACING = 0.3;

  // 🌍 Base Earth mesh
  const earthMaterial = materialBank.get('earth') || new THREE.MeshStandardMaterial({ color: 'blue' });
  const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 32, 32);
  const earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
  scene.add(earthMesh);

  // 🧢 Tier bands (debugging visuals)
  for (let i = 1; i <= TIER_COUNT; i++) {
    const radius = EARTH_RADIUS + i * TIER_SPACING;
    const ringGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    scene.add(ringMesh);
    return { placeCap };

  }

  // 🧩 Cap placement stub
  function placeCap({ tier = 1, lat = 0, lon = 0, materialId = 'moon' }) {
    const radius = EARTH_RADIUS + tier * TIER_SPACING;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    const capGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const capMat = materialBank.get(materialId) || new THREE.MeshStandardMaterial({ color: 'white' });
    const capMesh = new THREE.Mesh(capGeo, capMat);

    capMesh.position.set(x, y, z);
    scene.add(capMesh);
    console.log(`Cap deployed @ tier ${tier}, lat ${lat}, lon ${lon}`);
  }

  // 🌟 Export for external calls
  return {
    placeCap
  };
}

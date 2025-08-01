// ./src/forgeEntry.js

import { initDOM } from './domInit.js';
import { buildTexturePanel } from './texturePanel.js';
import { materialBank } from './materialBank.js';

// initiating DOM preload for guaranteed access later
initDOM({
  'texture-ui': { classes: ['ui-panel'] },
  'preview-ui': { classes: ['ui-preview'] },
  'controls-ui': { classes: ['ui-controls'] },
  'avbds-canvas': { tag: 'canvas', classes: ['main-canvas'] },
  'tier-input': { tag: 'input' },
  'lat-input': { tag: 'input' },
  'lon-input': { tag: 'input' },
  'mat-input': { tag: 'input' },
  'deploy-btn': { tag: 'button' },
  'forge-panel': { classes: ['ui-zone'] },
  'inspector-panel': { classes: ['ui-zone'] }
});

import { initYThree } from './YThreeRenderer.js';

initYThree();

import { initForgeUI } from './capUi.js';

initForgeUI({ onDeploy: placeCap });


// 🪐 Three.js setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const canvas = document.getElementById('avbds-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Initialize deployer & texture panel
  initAVDeployer(scene, materialBank);
  buildTexturePanel(materialBank);

  import { initAVDeployer } from './avBandDeployer.js';
// ⚠️ Make sure avBandDeployer returns { placeCap } now

// After panel builds
const { placeCap } = initAVDeployer(scene, materialBank);
buildTexturePanel(materialBank);

document.getElementById('deploy-btn')?.addEventListener('click', () => {
  const tier = parseInt(document.getElementById('tier-input')?.value || '0', 10);
  const lat = parseFloat(document.getElementById('lat-input')?.value || '0');
  const lon = parseFloat(document.getElementById('lon-input')?.value || '0');
  const materialId = document.getElementById('mat-input')?.value || 'default';

  placeCap({ tier, lat, lon, materialId });
});

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();


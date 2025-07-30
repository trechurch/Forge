import { initAVDeployer } from './avBandDeployer.js';
import { buildTexturePanel } from './texturePanel.js';
import { materialBank } from './materialBank.js';

document.addEventListener('DOMContentLoaded', () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const canvas = document.getElementById('avbds-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Initialize deployer & texture panel
  initAVDeployer(scene, materialBank);
  buildTexturePanel(materialBank);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
});

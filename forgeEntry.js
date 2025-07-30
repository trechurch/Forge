import { initAVDeployer } from './avBandDeployer.js';
import { buildTexturePanel } from './texturePanel.js';
import { materialBank } from './materialBank.js';

document.addEventListener('DOMContentLoaded', () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('forge-ui').appendChild(renderer.domElement);

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

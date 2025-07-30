import * as THREE from 'three';

export function buildTexturePanel(materialBank) {
  const textureInput = document.getElementById('texture-ui');
  textureInput.addEventListener('change', e => {
    const file = e.target.files[0];
    const loader = new THREE.TextureLoader();

    loader.load(URL.createObjectURL(file), texture => {
      const selected = textureInput.dataset.target || 'earth'; // Default
      const material = new THREE.MeshBasicMaterial({ map: texture });
      materialBank.assign(selected, material);
      console.log(`${selected} texture updated.`);
    });
  });
}

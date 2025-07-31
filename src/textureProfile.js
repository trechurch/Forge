// ./src/textureProfile.js

import { bindWhenReady } from './uiReady.js';

export function setupTextureProfileUI({ materialBank, previewContainerId = 'preview-ui' }) {
  const container = document.getElementById('texture-ui');
  const preview = document.getElementById(previewContainerId);

  if (!container || !preview) {
  console.warn('Texture profile UI aborted: target container(s) not found.');
  return;
}

  // --- Profile Select ---
  const profileSelect = document.createElement('select');
  ['Earth', 'Moon', 'Starfield', 'Custom...'].forEach(opt => {
    const o = document.createElement('option');
    o.value = opt.toLowerCase();
    o.innerText = opt;
    profileSelect.appendChild(o);
  });
  container.appendChild(profileSelect);

  // --- Custom File Picker ---
  const filePicker = document.createElement('input');
  filePicker.type = 'file';
  filePicker.accept = 'image/*';
  filePicker.style.display = 'none';
  container.appendChild(filePicker);

  // --- Live Preview ---
  const previewImg = document.createElement('img');
  previewImg.style.maxWidth = '100%';
  preview.appendChild(previewImg);

const keyMap = {
  earth: 'earth',
  moon: 'moon',
  starfield: 'starfield',
  'custom...': 'custom',
};

  
  // --- Load Default Profiles ---
  const texturePaths = {
    earth: './textures/earth_view.jpg',
    moon: './textures/moon_surface_map.jpg',
    starfield: './textures/star_map.png',
  };

  function loadTexturePreview(path, key) {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      previewImg.src = path;
      const texture = new THREE.Texture(img);
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      const material = new THREE.MeshBasicMaterial({ map: texture });
      materialBank.assign(key, material);
    };
    console.log(`Texture assigned to '${key}'`);
  }

profileSelect.onchange = () => {
  const val = profileSelect.value;
  const key = keyMap[val] || 'custom';

  if (val === 'custom...') {
    filePicker.click();
  } else if (texturePaths[key]) {
    loadTexturePreview(texturePaths[key], key);
  }
};

filePicker.onchange = e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = evt => {
    const img = new Image();
    img.src = evt.target.result;
    img.onload = () => {
      previewImg.src = img.src;

      const texture = new THREE.Texture(img);
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      const rawVal = profileSelect.value;
      const key = keyMap[rawVal] || 'custom';

      materialBank.assign(key, new THREE.MeshBasicMaterial({ map: texture }));
    };
  };
  reader.readAsDataURL(file);
  console.log(`Texture assigned to '${key}'`);
};
}

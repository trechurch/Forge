// textureProfile.js
export function setupTextureProfileUI({ materialBank, previewContainerId = 'preview-ui' }) {
  const container = document.getElementById('texture-ui');
  const preview = document.getElementById(previewContainerId);

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
      const material = new THREE.MeshBasicMaterial({ map: texture });
      materialBank.assign(key, material);
    };
  }

  profileSelect.onchange = () => {
    const val = profileSelect.value;
    if (val === 'custom...') {
      filePicker.click();
    } else if (texturePaths[val]) {
      loadTexturePreview(texturePaths[val], val);
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
        const key = profileSelect.value.replace('custom...', 'custom');
        materialBank.assign(key, new THREE.MeshBasicMaterial({ map: texture }));
      };
    };
    reader.readAsDataURL(file);
  };
}

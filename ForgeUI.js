// ForgeUI.js

import { forgeAvBands } from './forgeBands.js';

export function setupForgeUI({ scene, materialFn }) {
  const uiContainer = document.createElement('div');
  uiContainer.id = 'forge-ui';
  document.body.appendChild(uiContainer);

  // --- Input: Altitude ---
  const altitudeInput = document.createElement('input');
  altitudeInput.type = 'number';
  altitudeInput.placeholder = 'Altitude (e.g. 120000)';
  uiContainer.appendChild(altitudeInput);

  // --- Input: Thickness ---
  const thicknessInput = document.createElement('input');
  thicknessInput.type = 'number';
  thicknessInput.placeholder = 'Thickness (e.g. 5000)';
  uiContainer.appendChild(thicknessInput);

  // --- Input: Tier ---
  const tierInput = document.createElement('input');
  tierInput.type = 'number';
  tierInput.placeholder = 'Tier Level';
  uiContainer.appendChild(tierInput);

  // --- Input: Direction ---
  const directionInput = document.createElement('input');
  directionInput.placeholder = 'Direction (N, S, E, W)';
  uiContainer.appendChild(directionInput);

  // --- File Picker: Texture Assignment ---
  const texturePicker = document.createElement('input');
  texturePicker.type = 'file';
  texturePicker.accept = 'image/*';
  uiContainer.appendChild(texturePicker);

  // --- Button: Generate Bands ---
  const generateButton = document.createElement('button');
  generateButton.innerText = 'Generate AV Bands';
  uiContainer.appendChild(generateButton);

  generateButton.onclick = () => {
    const altitude = parseFloat(altitudeInput.value);
    const thickness = parseFloat(thicknessInput.value);
    const tierLevel = parseInt(tierInput.value);
    const direction = directionInput.value;

    const textureFile = texturePicker.files?.[0];
    const colorOverride = textureFile ? `url(${URL.createObjectURL(textureFile)})` : null;

    forgeAvBands({
      altitude,
      thickness,
      tierLevel,
      direction,
      scene,
      materialFn,
      colorOverride,
      debug: true,
    });
  };
}

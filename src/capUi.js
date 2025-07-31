// ./src/capUi.js

export function initForgeUI({ onDeploy }) {
  const forge = document.getElementById('forge-panel');
  if (!forge) return console.warn('Missing #forge-panel');

  forge.innerHTML = `<h2>Forge Cap</h2>`;

  const inputs = [
    { label: 'Tier', id: 'tier-input', type: 'number', placeholder: '1' },
    { label: 'Latitude', id: 'lat-input', type: 'number', placeholder: '0' },
    { label: 'Longitude', id: 'lon-input', type: 'number', placeholder: '0' },
    { label: 'Material ID', id: 'mat-input', type: 'text', placeholder: 'earth' },
  ];

  inputs.forEach(({ label, id, type, placeholder }) => {
    const wrapper = document.createElement('div');
    const lbl = document.createElement('label');
    lbl.for = id;
    lbl.innerText = label;

    const input = document.createElement('input');
    input.id = id;
    input.type = type;
    input.placeholder = placeholder;

    wrapper.append(lbl, input);
    forge.appendChild(wrapper);
  });

  const btn = document.createElement('button');
  btn.id = 'deploy-btn';
  btn.innerText = 'Deploy Cap';
  btn.onclick = () => {
    const tier = parseInt(document.getElementById('tier-input')?.value || '1', 10);
    const lat = parseFloat(document.getElementById('lat-input')?.value || '0');
    const lon = parseFloat(document.getElementById('lon-input')?.value || '0');
    const materialId = document.getElementById('mat-input')?.value || 'earth';

    onDeploy({ tier, lat, lon, materialId });
  };

  forge.appendChild(btn);
}

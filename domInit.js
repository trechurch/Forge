// domInit.js

export function initDOM({ containerMap }) {
  Object.entries(containerMap).forEach(([id, options]) => {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement(options.tag || 'div');
      el.id = id;
      if (options.classes) el.className = options.classes.join(' ');
      document.body.appendChild(el);
      console.warn(`DOM container '${id}' was missing—auto-injected.`);
    }
  });

  console.log('🔧 DOM containers initialized:', Object.keys(containerMap));
}

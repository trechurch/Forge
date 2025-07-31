// materialBank.js

import { bindWhenReady } from './uiReady.js';

export const materialBank = {
  earth: null,
  moon: null,
  starfield: null,

  assign(id, material) {
    if (!this.hasOwnProperty(id)) {
      console.warn(`Unknown material ID: ${id}`);
      return;
    }
    this[id] = material;
  },

  get(id) {
    return this[id] || null;
  }
};

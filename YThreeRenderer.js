// YThreeRenderer.js
import * as THREE from 'three';

let renderer, scene, camera;

export function initYThree() {
  const canvas = document.getElementById('avbds-canvas');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.set(0, 50, 100);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 100, 100).normalize();
  scene.add(light);

  addDemoCube();
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function addDemoCube() {
  const geo = new THREE.BoxGeometry(10, 10, 10);
  const mat = new THREE.MeshStandardMaterial({ color: 0x00ff88 });
  const cube = new THREE.Mesh(geo, mat);
  scene.add(cube);
}


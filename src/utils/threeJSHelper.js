import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Load molecule from GLB file
export async function loadMoleculeModel(url) {
  const loader = new GLTFLoader();
  try {
    const gltf = await loader.loadAsync(url);
    return gltf.scene;
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
}

// Create atom sphere
export function createAtom(element, size = 1) {
  const colors = {
    'H': 0xffffff,  // White
    'C': 0x333333,  // Dark gray
    'O': 0xff0000,  // Red
    'N': 0x0000ff,  // Blue
    'Cl': 0x00ff00, // Green
    'default': 0xaaaaaa // Gray
  };

  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const material = new THREE.MeshPhongMaterial({ 
    color: colors[element] || colors.default,
    shininess: 100
  });

  return new THREE.Mesh(geometry, material);
}

// Create bond between two points
export function createBond(start, end, thickness = 0.1) {
  const distance = start.distanceTo(end);
  const geometry = new THREE.CylinderGeometry(thickness, thickness, distance, 8);
  geometry.rotateZ(Math.PI / 2); // Initial alignment
  
  const material = new THREE.MeshPhongMaterial({ 
    color: 0xcccccc,
    shininess: 30
  });
  
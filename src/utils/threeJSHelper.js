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
  
  const bond = new THREE.Mesh(geometry, material);
  
  // Position the bond between the two points
  bond.position.x = (start.x + end.x) / 2;
  bond.position.y = (start.y + end.y) / 2;
  bond.position.z = (start.z + end.z) / 2;
  
  // Rotate to point from start to end
  bond.quaternion.setFromUnitVectors(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3().subVectors(end, start).normalize()
  );
  
  return bond;
}

// Setup basic scene
export function setupScene(canvas, width, height) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;
  
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(width, height);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  return { scene, camera, renderer };
}
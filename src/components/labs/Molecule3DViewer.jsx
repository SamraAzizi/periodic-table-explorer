import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from './styles.module.css';

export default function Molecule3DViewer({ molecule }) {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sceneInfo, setSceneInfo] = useState(null);

  useEffect(() => {
    if (!canvasRef.current || !molecule) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setClearColor(0xf0f0f0);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // Set camera position
    camera.position.z = 5;

    // Handle window resize
    const handleResize = () => {
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Store scene objects for cleanup
    setSceneInfo({ scene, camera, renderer, controls });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneInfo) {
        sceneInfo.controls.dispose();
        sceneInfo.renderer.dispose();
      }
    };
  }, [molecule]);

  useEffect(() => {
    if (!sceneInfo || !molecule) return;

    setLoading(true);
    setError(null);

    try {
      // Clear previous molecule
      while (sceneInfo.scene.children.length > 2) {
        sceneInfo.scene.remove(sceneInfo.scene.children[2]);
      }

      // Mock molecule data - in a real app, this would come from props or an API
      const mockMolecules = {
        'h2o': {
          atoms: [
            { element: 'O', x: 0, y: 0, z: 0 },
            { element: 'H', x: 0.76, y: 0.58, z: 0 },
            { element: 'H', x: -0.76, y: 0.58, z: 0 }
          ],
          bonds: [
            { from: 0, to: 1 },
            { from: 0, to: 2 }
          ]
        },
        'ch4': {
          atoms: [
            { element: 'C', x: 0, y: 0, z: 0 },
            { element: 'H', x: 0.63, y: 0.63, z: 0.63 },
            { element: 'H', x: -0.63, y: -0.63, z: 0.63 },
            { element: 'H', x: -0.63, y: 0.63, z: -0.63 },
            { element: 'H', x: 0.63, y: -0.63, z: -0.63 }
          ],
          bonds: [
            { from: 0, to: 1 },
            { from: 0, to: 2 },
            { from: 0, to: 3 },
            { from: 0, to: 4 }
          ]
        }
      };

      const moleculeData = mockMolecules[molecule.toLowerCase()] || mockMolecules.h2o;

      // Element colors and sizes
      const elementProperties = {
        'H': { color: 0xffffff, size: 0.4 },
        'C': { color: 0x333333, size: 0.6 },
        'O': { color: 0xff0000, size: 0.6 },
        'N': { color: 0x0000ff, size: 0.6 },
        'Cl': { color: 0x00ff00, size: 0.7 }
      };

      // Create atoms (spheres)
      const atoms = moleculeData.atoms.map((atom, index) => {
        const props = elementProperties[atom.element] || { color: 0xaaaaaa, size: 0.5 };
        const geometry = new THREE.SphereGeometry(props.size, 32, 32);
        const material = new THREE.MeshPhongMaterial({ 
          color: props.color,
          shininess: 100
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(atom.x * 2, atom.y * 2, atom.z * 2);
        sceneInfo.scene.add(sphere);
        return sphere;
      });
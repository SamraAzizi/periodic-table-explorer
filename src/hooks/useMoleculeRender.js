import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function useMoleculeRenderer(canvasRef) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [molecule, setMolecule] = useState(null);
  const sceneRef = useRef(null);
  const controlsRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true 
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);

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

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Store references
    sceneRef.current = scene;
    controlsRef.current = controls;
    rendererRef.current = renderer;

    // Handle window resize
    const handleResize = () => {
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
      controls.dispose();
      renderer.dispose();
    };
  }, [canvasRef]);

  // Load molecule when changed
  useEffect(() => {
    if (!molecule || !sceneRef.current) return;

    const loadMolecule = async () => {
      setLoading(true);
      setError(null);

      try {
        // Clear previous molecule
        while (sceneRef.current.children.length > 2) {
          sceneRef.current.remove(sceneRef.current.children[2]);
        }

        // In a real app, this would load from your assets/models folder
        const loader = new GLTFLoader();
        
        // Mock loading - in reality you would load from molecule.glb file
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create simple molecule if no GLB file
        createMockMolecule(molecule);
        
        // Auto-rotate for better viewing
        controlsRef.current.autoRotate = true;
        controlsRef.current.autoRotateSpeed = 1.5;
      } catch (err) {
        setError('Failed to load molecule model');
        console.error('Error loading molecule:', err);
      } finally {
        setLoading(false);
      }
    };

    const createMockMolecule = (mol) => {
      // Example: Create simple water molecule
      if (mol === 'h2o') {
        // Oxygen atom
        const oxygenGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const oxygenMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const oxygen = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
        sceneRef.current.add(oxygen);

        // Hydrogen atoms
        const hydrogenGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const hydrogenMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        
        const hydrogen1 = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
        hydrogen1.position.set(0.8, 0.6, 0);
        sceneRef.current.add(hydrogen1);
        
        const hydrogen2 = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
        hydrogen2.position.set(-0.8, 0.6, 0);
        sceneRef.current.add(hydrogen2);

        // Bonds
        const bondGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
        const bondMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
        
        const bond1 = new THREE.Mesh(bondGeometry, bondMaterial);
        bond1.position.set(0.4, 0.3, 0);
        bond1.rotation.z = Math.PI / 4;
        sceneRef.current.add(bond1);
        
        const bond2 = new THREE.Mesh(bondGeometry, bondMaterial);
        bond2.position.set(-0.4, 0.3, 0);
        bond2.rotation.z = -Math.PI / 4;
        sceneRef.current.add(bond2);
      }
    };

    loadMolecule();
  }, [molecule]);

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return {
    loading,
    error,
    loadMolecule: setMolecule,
    resetView
  };
}
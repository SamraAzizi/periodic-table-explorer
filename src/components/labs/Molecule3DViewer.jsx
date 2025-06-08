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
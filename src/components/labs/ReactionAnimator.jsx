import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

export default function ReactionAnimator() {
  const [reaction, setReaction] = useState('combustion');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef(null);
  const svgRef = useRef(null);

  const reactions = {
    combustion: {
      name: 'Combustion of Methane',
      equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
      steps: [
        { description: 'Methane and Oxygen molecules approach' },
        { description: 'Bonds begin to break' },
        { description: 'New bonds form between Carbon and Oxygen' },
        { description: 'Water molecules form' },
        { description: 'Reaction complete - CO₂ and H₂O produced' }
      ]
    },
    synthesis: {
      name: 'Ammonia Synthesis',
      equation: 'N₂ + 3H₂ → 2NH₃',
      steps: [
        { description: 'Nitrogen and Hydrogen molecules approach' },
        { description: 'Triple bond in N₂ begins to weaken' },
        { description: 'H atoms bond with N atoms' },
        { description: 'Ammonia molecules form' }
      ]
    }
  };
 useEffect(() => {
    // Clean up animation frame on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const duration = 5000; // 5 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(elapsed / duration, 1);
        setProgress(newProgress);

        if (newProgress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsPlaying(false);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (progress >= 1) {
        setProgress(0); // Reset if we reached the end
      }
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
  };
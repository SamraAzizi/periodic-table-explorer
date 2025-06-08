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

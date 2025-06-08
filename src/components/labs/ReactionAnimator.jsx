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

  const renderReactionAnimation = () => {
    const currentStep = Math.floor(progress * reactions[reaction].steps.length);
    const stepProgress = (progress * reactions[reaction].steps.length) % 1;

    return (
      <svg ref={svgRef} viewBox="0 0 800 300" className={styles.animation}>
        {/* Background */}
        <rect x="0" y="0" width="800" height="300" fill="#f5f5f5" />
        
        {/* Reaction-specific animation */}
        {reaction === 'combustion' && (
          <>
            {/* Methane molecule (CH4) */}
            <circle 
              cx={200 - progress * 150} 
              cy={150} 
              r="20" 
              fill="#333" 
              className={styles.carbon}
            />
            {[0, 1, 2, 3].map(i => (
              <circle
                key={i}
                cx={200 - progress * 150 + 30 * Math.cos(i * Math.PI/2)}
                cy={150 + 30 * Math.sin(i * Math.PI/2)}
                r="15"
                fill="#fff"
                className={styles.hydrogen}
                style={{ opacity: 1 - stepProgress * (currentStep >= 1 ? 1 : 0) }}
              />
            ))}
            
            {/* Oxygen molecules (O2) */}
            {[0, 1].map(i => (
              <g key={i} style={{ opacity: 1 - stepProgress * (currentStep >= 2 ? 1 : 0) }}>
                <circle 
                  cx={400 + i * 40 - progress * 100} 
                  cy={100 + i * 100} 
                  r="20" 
                  fill="#f00" 
                  className={styles.oxygen}
                />
                <circle 
                  cx={400 + i * 40 - progress * 100 + 30} 
                  cy={100 + i * 100} 
                  r="20" 
                  fill="#f00" 
                  className={styles.oxygen}
                />
              </g>
            ))}
            
            {/* Resulting CO2 */}
            <g style={{ opacity: stepProgress * (currentStep >= 2 ? 1 : 0) }}>
              <circle 
                cx={550} 
                cy={150} 
                r="20" 
                fill="#333" 
                className={styles.carbon}
              />
              <circle 
                cx={590} 
                cy={150} 
                r="20" 
                fill="#f00" 
                className={styles.oxygen}
              />
              <circle 
                cx={510} 
                cy={150} 
                r="20" 
                fill="#f00" 
                className={styles.oxygen}
              />
            </g>
            
            {/* Resulting H2O */}
            {[0, 1].map(i => (
              <g key={i} style={{ opacity: stepProgress * (currentStep >= 3 ? 1 : 0) }}>
                <circle 
                  cx={600 + i * 20} 
                  cy={200 + i * 30} 
                  r="15" 
                  fill="#fff" 
                  className={styles.hydrogen}
                />
                <circle 
                  cx={620 - i * 20} 
                  cy={230 - i * 30} 
                  r="20" 
                  fill="#f00" 
                  className={styles.oxygen}
                />
              </g>
            ))}
          </>
        )}
        
        {reaction === 'synthesis' && (
          <>
            {/* Nitrogen molecule (N2) */}
            <circle 
              cx={200 - progress * 100} 
              cy={150} 
              r="20" 
              fill="#00f" 
              className={styles.nitrogen}
            />
            <circle 
              cx={240 - progress * 100} 
              cy={150} 
              r="20" 
              fill="#00f" 
              className={styles.nitrogen}
            />
            
            {/* Hydrogen molecules (H2) */}
            {[0, 1, 2].map(i => (
              <g key={i} style={{ opacity: 1 - stepProgress * (currentStep >= 1 ? 1 : 0) }}>
                <circle 
                  cx={400 + i * 30 - progress * 50} 
                  cy={100 + i * 50} 
                  r="15" 
                  fill="#fff" 
                  className={styles.hydrogen}
                />
                <circle 
                  cx={430 + i * 30 - progress * 50} 
                  cy={100 + i * 50} 
                  r="15" 
                  fill="#fff" 
                  className={styles.hydrogen}
                />
              </g>
            ))}
            
            {/* Resulting NH3 molecules */}
            {[0, 1].map(i => (
              <g key={i} style={{ opacity: stepProgress * (currentStep >= 2 ? 1 : 0) }}>
                <circle 
                  cx={550 + i * 100} 
                  cy={150} 
                  r="20" 
                  fill="#00f" 
                  className={styles.nitrogen}
                />
                {[0, 1, 2].map(j => (
                  <circle
                    key={j}
                    cx={550 + i * 100 + 25 * Math.cos(j * 2 * Math.PI/3)}
                    cy={150 + 25 * Math.sin(j * 2 * Math.PI/3)}
                    r="15"
                    fill="#fff"
                    className={styles.hydrogen}
                  />
                ))}
              </g>
            ))}
          </>
        )}
        
        {/* Bonds would be represented as lines between atoms */}
        {/* This is simplified for the example */}
        
        {/* Reaction equation */}
        <text x="400" y="280" textAnchor="middle" fontSize="24" fill="#333">
          {reactions[reaction].equation}
        </text>
      </svg>
    );
  };

  return (
    <div className={styles.container}>
      <h2>Chemical Reaction Animator</h2>
      
      <div className={styles.controls}>
        <select
          value={reaction}
          onChange={(e) => {
            setReaction(e.target.value);
            setProgress(0);
            setIsPlaying(false);
          }}
          className={styles.select}
        >
          <option value="combustion">Combustion of Methane</option>
          <option value="synthesis">Ammonia Synthesis</option>
        </select>
        
        <button 
          onClick={handlePlayPause}
          className={styles.button}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button 
          onClick={handleReset}
          className={styles.button}
        >
          Reset
        </button>
      </div>
      
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      
      <div className={styles.animationContainer}>
        {renderReactionAnimation()}
      </div>
      
      <div className={styles.steps}>
        <h3>Reaction Steps:</h3>
        <ul>
          {reactions[reaction].steps.map((step, index) => (
            <li 
              key={index}
              className={index <= Math.floor(progress * reactions[reaction].steps.length) ? styles.activeStep : ''}
            >
              {step.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
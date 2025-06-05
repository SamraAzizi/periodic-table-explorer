import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

// Mock solubility data
const solubilityData = {
  'NaCl': {
    '0': 35.7,
    '20': 36.0,
    '40': 36.6,
    '60': 37.3,
    '80': 38.4,
    '100': 39.8
  },
  'KNO3': {
    '0': 13.3,
    '20': 31.6,
    '40': 63.9,
    '60': 110,
    '80': 169,
    '100': 246
  },
  'Ca(OH)2': {
    '0': 0.185,
    '20': 0.173,
    '40': 0.141,
    '60': 0.121,
    '80': 0.086,
    '100': 0.077
  }
};

export default function SolubilityChart() {
  const [selectedCompound, setSelectedCompound] = useState('NaCl');
  const canvasRef = useRef(null);

  useEffect(() => {
    // In a real implementation, this would initialize a Chart.js chart
    // For now, we'll just log the data that would be used
    console.log('Rendering solubility chart for:', selectedCompound);
    console.log('Data:', solubilityData[selectedCompound]);

    // Chart initialization would go here
    // const ctx = canvasRef.current.getContext('2d');
    // new Chart(ctx, { ... });
  }, [selectedCompound]);

  return (
    <div className={styles.chartContainer}>
      <h2>Solubility Chart</h2>
      
      <div className={styles.controls}>
        <select
          value={selectedCompound}
          onChange={(e) => setSelectedCompound(e.target.value)}
          className={styles.select}
        >
          {Object.keys(solubilityData).map(compound => (
            <option key={compound} value={compound}>
              {compound}
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.chartWrapper}>
        <canvas ref={canvasRef} className={styles.chart} />
        
        {/* Fallback content for when canvas isn't available */}
        <div className={styles.chartFallback}>
          <h3>{selectedCompound} Solubility (g/100g water)</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Temperature (°C)</th>
                <th>Solubility</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(solubilityData[selectedCompound]).map(([temp, solubility]) => (
                <tr key={temp}>
                  <td>{temp}</td>
                  <td>{solubility} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className={styles.note}>
        <p>Note: Solubility values are approximate and vary with pressure.</p>
      </div>
    </div>
  );
}
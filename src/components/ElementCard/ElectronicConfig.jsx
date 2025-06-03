import React from 'react';
import styles from './styles.module.css';

export default function ElectronConfig({ atomicNumber }) {
  const config = getElectronConfig(atomicNumber);
  
  return (
    <div className={styles.config}>
      <h4>Electron Configuration</h4>
      <div className={styles.shells}>
        {config.map((shell, i) => (
          <div key={i} className={styles.shell}>
            <div className={styles.shellNumber}>{i + 1}</div>
            <div className={styles.electrons}>
              {Array.from({ length: shell }).map((_, j) => (
                <div key={j} className={styles.electron} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getElectronConfig(atomicNumber) {
  // Simplified electron configuration
  const shells = [2, 8, 8, 18, 18, 32, 32]; // Max electrons per shell
  let remaining = atomicNumber;
  return shells.map(shell => {
    const electrons = Math.min(shell, remaining);
    remaining -= electrons;
    return electrons;
  }).filter(Boolean);
}
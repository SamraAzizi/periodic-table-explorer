import React from 'react';
import styles from './styles.module.css';
import ElectronConfig from './ElectronConfig';
import { useElements } from '../../contexts/ElementsContext';

export default function ElementCard({ atomicNumber }) {
  const { elements } = useElements();
  const element = elements.find(e => e.atomic_number === atomicNumber);

  if (!element) return null;

  return (
    <div className={styles.card}>
      <div className={styles.header} style={{ backgroundColor: getCategoryColor(element.category) }}>
        <h2 className={styles.name}>{element.name}</h2>
        <span className={styles.number}>{element.atomic_number}</span>
      </div>
      
      <div className={styles.body}>
        <div className={styles.symbol}>{element.symbol}</div>
        <ElectronConfig atomicNumber={atomicNumber} />
        
        <div className={styles.details}>
          <div className={styles.row}>
            <span>Atomic Mass</span>
            <span>{element.atomic_mass}</span>
          </div>
          <div className={styles.row}>
            <span>Category</span>
            <span>{element.category}</span>
          </div>
          <div className={styles.row}>
            <span>Electronegativity</span>
            <span>{element.electronegativity || 'N/A'}</span>
          </div>
          <div className={styles.row}>
            <span>Phase</span>
            <span>{element.phase}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryColor(category) {
  const colors = {
    'Alkali Metal': '#FF9999',
    'Alkaline Earth': '#FFCC99',
    'Transition Metal': '#FFB266',
    'Lanthanide': '#FF99CC',
    'Actinide': '#CC99FF',
    'Metalloid': '#99FFCC',
    'Nonmetal': '#99FF99',
    'Halogen': '#FFFF99',
    'Noble Gas': '#FFCCFF',
    'Post-Transition': '#99CCFF'
  };
  return colors[category] || '#DDDDDD';
}
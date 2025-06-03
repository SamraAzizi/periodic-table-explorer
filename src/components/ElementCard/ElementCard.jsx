import React from 'react';
<<<<<<< HEAD
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
=======
import './ElementCard.css';
import electronConfig from '../../utils/electronConfig';

export default function ElementCard({ element }) {
  return (
    <div className="element-card">
      <div className="element-header" style={{ backgroundColor: getCategoryColor(element.category) }}>
        <h2>{element.name}</h2>
        <span className="atomic-number">{element.atomic_number}</span>
      </div>
      
      <div className="element-body">
        <div className="element-symbol">{element.symbol}</div>
        
        <div className="element-details">
          <p><strong>Atomic Mass:</strong> {element.atomic_mass}</p>
          <p><strong>Category:</strong> {element.category}</p>
          <p><strong>Electron Configuration:</strong> {electronConfig(element.atomic_number)}</p>
          <p><strong>State at STP:</strong> {element.phase}</p>
        </div>

        <div className="element-properties">
          <div className="property">
            <span>Density</span>
            <span>{element.density || 'N/A'} g/cm³</span>
          </div>
          <div className="property">
            <span>Electronegativity</span>
            <span>{element.electronegativity || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryColor(category) {
  const colors = {
    'Alkali Metal': '#FF9999',
    'Noble Gas': '#FFCC99',
    'Transition Metal': '#FFB266',
    // Add all other categories
  };
  return colors[category] || '#DDDDDD';
}
>>>>>>> d623c233160c49f47683189a942a96de6d74af42

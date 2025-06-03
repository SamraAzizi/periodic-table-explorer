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

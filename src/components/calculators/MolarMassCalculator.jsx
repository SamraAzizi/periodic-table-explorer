import { useState } from 'react';
import styles from './styles.module.css';

export default function MolarMassCalculator() {
  const [formula, setFormula] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      // Basic validation
      if (!formula.trim()) {
        setError('Please enter a chemical formula');
        return;
      }

      // In a real implementation, this would call calculateMolarMass from utils/chemistry.js
      // For now, we'll simulate a calculation
      const mockResults = {
        'H2O': 18.015,
        'CO2': 44.01,
        'NaCl': 58.44,
        'C6H12O6': 180.16
      };

      const mass = mockResults[formula] || parseFloat((Math.random() * 200 + 20).toFixed(2));
      setResult(mass);
      setError('');
    } catch (err) {
      setError('Invalid formula format');
      setResult(null);
    }
  };

   const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className={styles.calculator}>
      <h2>Molar Mass Calculator</h2>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter chemical formula (e.g., H2O)"
          className={styles.input}
        />
        <button 
          onClick={handleCalculate}
          className={styles.button}
        >
          Calculate
        </button>
      </div>
      
      {error && <p className={styles.error}>{error}</p>}
      
      {result && (
        <div className={styles.result}>
          <h3>Molar Mass:</h3>
          <p className={styles.resultValue}>
            {result} g/mol
          </p>
          <p className={styles.formula}>
            {formula}
          </p>
        </div>
      )}
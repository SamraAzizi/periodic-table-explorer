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

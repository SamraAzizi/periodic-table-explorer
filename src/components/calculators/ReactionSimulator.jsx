import { useState } from 'react';
import styles from './styles.module.css';

export default function ReactionSimulator() {
  const [reactants, setReactants] = useState('');
  const [products, setProducts] = useState('');
  const [balancedEquation, setBalancedEquation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBalance = () => {
    if (!reactants.trim() || !products.trim()) {
      setError('Please enter both reactants and products');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call/calculation delay
    setTimeout(() => {
      try {
        // In a real app, this would call a balancing function from utils/chemistry.js
        const mockBalancedEquations = {
          'H2 + O2 -> H2O': '2H₂ + O₂ → 2H₂O',
          'Fe + O2 -> Fe2O3': '4Fe + 3O₂ → 2Fe₂O₃',
          'CH4 + O2 -> CO2 + H2O': 'CH₄ + 2O₂ → CO₂ + 2H₂O'
        };
        
        const key = `${reactants} -> ${products}`;
        const result = mockBalancedEquations[key] || 
          `${reactants.replace(/ /g, '')} → ${products.replace(/ /g, '')} (Not balanced)`;
        
        setBalancedEquation(result);
      } catch (err) {
        setError('Error balancing equation');
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };
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

  const handleExample = (example) => {
    const [r, p] = example.split('->');
    setReactants(r.trim());
    setProducts(p.trim());
    setBalancedEquation('');
    setError('');
  };

  return (
    <div className={styles.calculator}>
      <h2>Chemical Reaction Balancer</h2>
      
      <div className={styles.reactionInputs}>
        <div className={styles.inputGroup}>
          <label>Reactants:</label>
          <input
            type="text"
            value={reactants}
            onChange={(e) => setReactants(e.target.value)}
            placeholder="e.g., H2 + O2"
            className={styles.input}
          />
        </div>
        
        <div className={styles.arrow}>→</div>
        
        <div className={styles.inputGroup}>
          <label>Products:</label>
          <input
            type="text"
            value={products}
            onChange={(e) => setProducts(e.target.value)}
            placeholder="e.g., H2O"
            className={styles.input}
          />
        </div>
      </div>
      
      <button 
        onClick={handleBalance}
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? 'Balancing...' : 'Balance Reaction'}
      </button>
      
      {error && <p className={styles.error}>{error}</p>}
      
      {balancedEquation && (
        <div className={styles.result}>
          <h3>Balanced Equation:</h3>
          <p className={styles.equation}>
            {balancedEquation}
          </p>
        </div>
      )}
      
      <div className={styles.examples}>
        <p>Example reactions:</p>
        <div className={styles.exampleButtons}>
          {[
            'H2 + O2 -> H2O',
            'Fe + O2 -> Fe2O3',
            'CH4 + O2 -> CO2 + H2O'
          ].map((example) => (
            <button
              key={example}
              onClick={() => handleExample(example)}
              className={styles.exampleButton}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
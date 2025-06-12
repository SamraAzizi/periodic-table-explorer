// Molar mass calculation
export function calculateMolarMass(formula) {
  if (!formula) throw new Error('Formula is required');
  
  // Simple implementation - would be expanded with actual parsing
  const commonCompounds = {
    'h2o': 18.015,
    'co2': 44.01,
    'nacl': 58.44,
    'c6h12o6': 180.16,
    'h2so4': 98.079
  };

  const lowerFormula = formula.toLowerCase();
  if (commonCompounds[lowerFormula]) {
    return commonCompounds[lowerFormula];
  }

  // Fallback for unknown formulas (mock calculation)
  return parseFloat((formula.length * 10 + Math.random() * 50).toFixed(2));
}

// Balance chemical equation
export function balanceEquation(reactants, products) {
  // Simple implementation - would use matrix method in real app
  const balancedEquations = {
    'h2 + o2 -> h2o': '2H₂ + O₂ → 2H₂O',
    'ch4 + o2 -> co2 + h2o': 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    'fe + o2 -> fe2o3': '4Fe + 3O₂ → 2Fe₂O₃',
    'n2 + h2 -> nh3': 'N₂ + 3H₂ → 2NH₃'
  };

  const key = `${reactants.toLowerCase()} -> ${products.toLowerCase()}`;
  return balancedEquations[key] || `${reactants} → ${products} (Not balanced)`;
}

// Calculate electron configuration
export function getElectronConfig(atomicNumber) {
  const configs = [
    '1s¹', '1s²', 
    '1s² 2s¹', '1s² 2s²', '1s² 2s² 2p¹', '1s² 2s² 2p²', '1s² 2s² 2p³', '1s² 2s² 2p⁴', '1s² 2s² 2p⁵', '1s² 2s² 2p⁶',
    '1s² 2s² 2p⁶ 3s¹', '1s² 2s² 2p⁶ 3s²', /* ... up to 118 */
  ];

  return configs[atomicNumber - 1] || 'Unknown';
}

// Calculate oxidation states
export function getOxidationStates(element) {
  const commonStates = {
    'H': [+1, -1],
    'O': [-2, -1, +2],
    'Na': [+1],
    'Cl': [-1, +1, +3, +5, +7],
    // ... other elements
  };

  return commonStates[element] || 'Varies';
}
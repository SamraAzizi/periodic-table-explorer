// Calculate atomic radius trend
export function calculateAtomicRadiusTrend(elements, period) {
  if (!elements || !period) return [];
  
  return elements
    .filter(el => el.period === period && el.atomic_radius)
    .sort((a, b) => a.number - b.number)
    .map(el => ({
      element: el.symbol,
      radius: el.atomic_radius
    }));
}

// Calculate ionization energy trend
export function calculateIonizationEnergyTrend(elements, group) {
  if (!elements || !group) return [];
  
  return elements
    .filter(el => el.group === group && el.ionization_energy)
    .sort((a, b) => a.period - b.period)
    .map(el => ({
      element: el.symbol,
      energy: el.ionization_energy
    }));
}

// Calculate electronegativity trend
export function calculateElectronegativityTrend(elements, periodOrGroup) {
  if (!elements || !periodOrGroup) return [];
  
  // Determine if we're looking at period or group
  const isPeriod = elements.some(el => el.period === periodOrGroup);
  
  return elements
    .filter(el => 
      (isPeriod ? el.period === periodOrGroup : el.group === periodOrGroup) && 
      el.electronegativity_pauling
    )
    .sort((a, b) => isPeriod ? a.number - b.number : a.period - b.period)
    .map(el => ({
      element: el.symbol,
      electronegativity: el.electronegativity_pauling
    }));
}

// Predict element properties based on trends
export function predictProperties(element, elements) {
  if (!element || !elements) return null;
  
  const groupElements = elements.filter(el => el.group === element.group);
  const periodElements = elements.filter(el => el.period === element.period);
  
  return {
    predictedRadius: estimateProperty(groupElements, periodElements, 'atomic_radius'),
    predictedIonizationEnergy: estimateProperty(groupElements, periodElements, 'ionization_energy'),
    predictedElectronegativity: estimateProperty(groupElements, periodElements, 'electronegativity_pauling')
  };
}

function estimateProperty(groupElements, periodElements, property) {
  const groupValues = groupElements.map(el => el[property]).filter(Boolean);
  const periodValues = periodElements.map(el => el[property]).filter(Boolean);
  
  if (groupValues.length === 0 || periodValues.length === 0) return null;
  
  const groupAvg = groupValues.reduce((a, b) => a + b, 0) / groupValues.length;
  const periodAvg = periodValues.reduce((a, b) => a + b, 0) / periodValues.length;
  
  return parseFloat(((groupAvg + periodAvg) / 2).toFixed(2));
}
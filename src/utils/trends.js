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
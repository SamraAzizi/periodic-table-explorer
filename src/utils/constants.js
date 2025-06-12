export const CHEMICAL_CONSTANTS = {
  AVOGADRO: 6.02214076e23,  // Avogadro's number (mol⁻¹)
  BOLTZMANN: 1.380649e-23,  // Boltzmann constant (J/K)
  GAS_CONSTANT: 8.314462618, // Universal gas constant (J/(mol·K))
  PLANCK: 6.62607015e-34,   // Planck constant (J·s)
  SPEED_OF_LIGHT: 299792458, // Speed of light (m/s)
  ELECTRON_CHARGE: 1.602176634e-19, // Elementary charge (C)
  FARADAY: 96485.33212,     // Faraday constant (C/mol)
};

export const ELEMENT_CATEGORIES = [
  'alkali metal',
  'alkaline earth metal',
  'transition metal',
  'post-transition metal',
  'metalloid',
  'diatomic nonmetal',
  'polyatomic nonmetal',
  'noble gas',
  'lanthanide',
  'actinide'
];

export const STATE_AT_STP = {
  'gas': ['H', 'N', 'O', 'F', 'Cl', 'He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'],
  'liquid': ['Hg', 'Br'],
  'solid': 'All other elements'
};

export const COMMON_IONS = {
  'H': ['H⁺', 'H⁻'],
  'O': ['O²⁻'],
  'Na': ['Na⁺'],
  'Cl': ['Cl⁻'],
  'Ca': ['Ca²⁺'],
  'Fe': ['Fe²⁺', 'Fe³⁺']
};
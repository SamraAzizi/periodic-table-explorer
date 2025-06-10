import { createContext, useContext, useEffect, useState } from 'react';
import elementsData from '../assets/data/elements.json';

const ElementsContext = createContext();

export function ElementsProvider({ children }) {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [filteredElements, setFilteredElements] = useState([]);

  useEffect(() => {
    try {
      // In a real app, this might be an API call
      // For now, we're using the imported JSON data
      const processedElements = elementsData.map(element => ({
        ...element,
        // Ensure numeric values are numbers
        number: parseInt(element.number),
        atomic_mass: parseFloat(element.atomic_mass),
        atomic_radius: element.atomic_radius ? parseFloat(element.atomic_radius) : null,
        ionization_energy: element.ionization_energy ? parseFloat(element.ionization_energy) : null,
        // Standardize electron configuration format
        electron_configuration: element.electron_configuration.replace(/\s+/g, ' ')
      }));
      
      setElements(processedElements);
      setFilteredElements(processedElements);
      setLoading(false);
    } catch (err) {
      setError('Failed to load element data');
      setLoading(false);
      console.error('Error loading elements:', err);
    }
  }, []);

  const filterElements = (criteria) => {
    if (!criteria || Object.keys(criteria).length === 0) {
      setFilteredElements(elements);
      return;
    }

    const filtered = elements.filter(element => {
      return Object.entries(criteria).every(([key, value]) => {
        if (value === null || value === '') return true;
        
        switch (key) {
          case 'category':
            return element.category.toLowerCase().includes(value.toLowerCase());
          case 'group':
            return element.group == value;
          case 'period':
            return element.period == value;
          case 'state':
            return element.phase.toLowerCase() === value.toLowerCase();
          case 'search':
            return (
              element.name.toLowerCase().includes(value.toLowerCase()) ||
              element.symbol.toLowerCase().includes(value.toLowerCase()) ||
              element.number.toString().includes(value)
            );
          default:
            return true;
        }
      });
    });

    setFilteredElements(filtered);
  };

  const getElementByNumber = (number) => {
    return elements.find(element => element.number === number);
  };

  const value = {
    elements,
    filteredElements,
    loading,
    error,
    selectedElement,
    setSelectedElement,
    filterElements,
    getElementByNumber
  };

  return (
    <ElementsContext.Provider value={value}>
      {children}
    </ElementsContext.Provider>
  );
}

export function useElements() {
  const context = useContext(ElementsContext);
  if (context === undefined) {
    throw new Error('useElements must be used within an ElementsProvider');
  }
  return context;
}
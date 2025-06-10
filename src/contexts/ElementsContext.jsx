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
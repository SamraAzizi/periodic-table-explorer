import { useState, useEffect } from 'react';
import { useElements } from '../contexts/ElementsContext';

export function useElementData(elementNumber) {
  const { getElementByNumber } = useElements();
  const [element, setElement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedElements, setRelatedElements] = useState([]);

  useEffect(() => {
    const fetchElementData = () => {
      try {
        setLoading(true);
        const data = getElementByNumber(elementNumber);
        
        if (!data) {
          throw new Error(`Element with number ${elementNumber} not found`);
        }

        setElement(data);
        findRelatedElements(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setElement(null);
        setRelatedElements([]);
      } finally {
        setLoading(false);
      }
    };

    const findRelatedElements = (currentElement) => {
      if (!currentElement) return;

      const related = [];
      
      // Find elements in the same group
      if (currentElement.group) {
        const groupElements = getElementsByProperty('group', currentElement.group)
          .filter(el => el.number !== currentElement.number);
        related.push(...groupElements);
      }

      // Find elements in the same period
      if (currentElement.period) {
        const periodElements = getElementsByProperty('period', currentElement.period)
          .filter(el => el.number !== currentElement.number);
        related.push(...periodElements);
      }

      // Find elements with similar categories
      if (currentElement.category) {
        const categoryElements = getElementsByProperty('category', currentElement.category)
          .filter(el => el.number !== currentElement.number);
        related.push(...categoryElements);
      }

      // Remove duplicates and limit to 5 elements
      const uniqueRelated = Array.from(new Set(related.map(el => el.number)))
        .map(num => related.find(el => el.number === num))
        .slice(0, 5);

      setRelatedElements(uniqueRelated);
    };

    const getElementsByProperty = (prop, value) => {
      const elements = [];
      // This would be replaced with actual element filtering logic
      // from your ElementsContext
      return elements.filter(el => el[prop] === value);
    };

    fetchElementData();
  }, [elementNumber, getElementByNumber]);

  return {
    element,
    loading,
    error,
    relatedElements,
    refetch: () => fetchElementData()
  };
}
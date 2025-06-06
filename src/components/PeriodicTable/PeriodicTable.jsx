import { useState, useEffect } from 'react';
import ElementTile from './ElementTile';
import ElementCard from '../ElementCard/ElementCard';
import styles from './styles.module.css';

export default function PeriodicTable({ elements }) {
  const [selectedElement, setSelectedElement] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [highlightGroup, setHighlightGroup] = useState(null);

  // Organize elements into periodic table structure
  useEffect(() => {
    if (elements && elements.length > 0) {
      const organized = [];
      
      // Create empty grid (7 periods, 18 groups)
      for (let i = 0; i < 7; i++) {
        organized.push(new Array(18).fill(null));
      }
      
      // Place elements in their positions
      elements.forEach(element => {
        if (element.ypos && element.xpos) {
          // Adjust for array indices (periods start at 1)
          const row = element.ypos - 1;
          const col = element.xpos - 1;
          
          // Handle lanthanides and actinides
          if (row >= 6 && col <= 2) {
            // Place them in the correct position (period 6/7, group 3)
            organized[row][2] = element;
          } else {
            organized[row][col] = element;
          }
        }
      });

       setTableData(organized);
    }
  }, [elements]);

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleCloseCard = () => {
    setSelectedElement(null);
  };

  const getGroupName = (group) => {
    const groupNames = {
      1: 'Alkali Metals',
      2: 'Alkaline Earth Metals',
      17: 'Halogens',
      18: 'Noble Gases',
      3: 'Transition Metals',
      4: 'Transition Metals',
      5: 'Transition Metals',
      6: 'Transition Metals',
      7: 'Transition Metals',
      8: 'Transition Metals',
      9: 'Transition Metals',
      10: 'Transition Metals',
      11: 'Transition Metals',
      12: 'Transition Metals',
      13: 'Boron Group',
      14: 'Carbon Group',
      15: 'Nitrogen Group',
      16: 'Oxygen Group'
    };
    return groupNames[group] || '';
  };

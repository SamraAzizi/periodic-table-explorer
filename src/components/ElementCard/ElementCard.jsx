import React from 'react';
import './ElementCard.css';
import electronConfig from '../../utils/electronConfig';

export default function ElementCard({ element }) {
  return (
    <div className="element-card">
      <div className="element-header" style={{ backgroundColor: getCategoryColor(element.category) }}>
        <h2>{element.name}</h2>
        <span className="atomic-number">{element.atomic_number}</span>
      </div>
      
      <div className="element-body">
        <div className="element-symbol">{element.symbol}</div>
        
        <div className="element-details">
          <p><strong>Atomic Mass:</strong> {element.atomic_mass}</p>
          <p><strong>Category:</strong> {element.category}</p>
          <p><strong>Electron Configuration:</strong> {electronConfig(element.atomic_number)}</p>
          <p><strong>State at STP:</strong> {element.phase}</p>
        </div>

        <div className="element-properties">
          <div className="property">
            <span>Density</span>
            <span>{element.density || 'N/A'} g/cm³</span>
          </div>
          <div className="property">
            <span>Electronegativity</span>
            <span>{element.electronegativity || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryColor(category) {
  const colors = {
    'Alkali Metal': '#FF9999',
    'Noble Gas': '#FFCC99',
    'Transition Metal': '#FFB266',
    // Add all other categories
  };
  return colors[category] || '#DDDDDD';
}

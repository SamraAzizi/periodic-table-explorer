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

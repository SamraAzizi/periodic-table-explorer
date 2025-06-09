import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from './styles.module.css';

export default function IonizationEnergyChart({ elements }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!elements || !chartRef.current) return;

    // Process data for ionization energy trend
    const processData = () => {
      const groups = {};
      
      elements.forEach(element => {
        if (element.ionization_energy && element.group) {
          if (!groups[element.group]) {
            groups[element.group] = [];
          }
          groups[element.group].push({
            x: element.period,
            y: element.ionization_energy,
            symbol: element.symbol
          });
        }
      });

      // Sort each group by period
      Object.keys(groups).forEach(group => {
        groups[group].sort((a, b) => a.x - b.x);
      });

      return groups;
    };

    const energyData = processData();
    const groupColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
      '#9966FF', '#FF9F40', '#8AC24A', '#FF6B6B',
      '#48D1CC', '#9370DB', '#3CB371', '#FFA07A',
      '#20B2AA', '#778899', '#FF6347', '#BA55D3',
      '#4682B4', '#9ACD32'
    ];
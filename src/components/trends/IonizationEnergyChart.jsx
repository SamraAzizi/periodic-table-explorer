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

    const datasets = Object.keys(energyData).map(group => ({
      label: `Group ${group}`,
      data: energyData[group],
      borderColor: groupColors[group - 1],
      backgroundColor: groupColors[group - 1],
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.3,
      fill: false
    }));

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Ionization Energy Trend',
            font: {
              size: 18
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const data = context.raw;
                return `${data.symbol}: ${data.y} kJ/mol`;
              }
            }
          },
          legend: {
            position: 'top',
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Period'
            },
            ticks: {
              stepSize: 1
            },
            grid: {
              display: false
            }
          },
          y: {
            title: {
              display: true,
              text: 'First Ionization Energy (kJ/mol)'
            },
            min: 0,
            suggestedMax: 2500
          }
        },
        interaction: {
          intersect: false,
          mode: 'nearest'
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [elements]);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartWrapper}>
        <canvas ref={chartRef} />
      </div>
      <div className={styles.description}>
        <h3>Ionization Energy Trend</h3>
        <p>
          Ionization energy increases across a period due to increasing nuclear charge,
          and decreases down a group due to electron shielding and increased distance from the nucleus.
        </p>
      </div>
    </div>
  );
}
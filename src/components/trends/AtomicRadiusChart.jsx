export default function AtomicRadiusChart({ elements }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!elements || !chartRef.current) return;

    // Process data for atomic radius trend
    const processData = () => {
      const periods = {};
      
      elements.forEach(element => {
        if (element.atomic_radius && element.period) {
          if (!periods[element.period]) {
            periods[element.period] = [];
          }
          periods[element.period].push({
            x: element.number,
            y: element.atomic_radius,
            symbol: element.symbol
          });
        }
      });

      // Sort each period by atomic number
      Object.keys(periods).forEach(period => {
        periods[period].sort((a, b) => a.x - b.x);
      });

      return periods;
    };

    const radiusData = processData();
    const periodColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
      '#9966FF', '#FF9F40', '#8AC24A'
    ];

    const datasets = Object.keys(radiusData).map(period => ({
      label: `Period ${period}`,
      data: radiusData[period],
      borderColor: periodColors[period - 1],
      backgroundColor: periodColors[period - 1],
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.3,
      fill: false
    }));
import { useState, useEffect } from 'react';
import { useElements } from '../contexts/ElementsContext';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PeriodicTable from '../components/PeriodicTable/PeriodicTable';
import ElementCard from '../components/ElementCard/ElementCard';
import styles from './Explorer.module.css';

export default function Explorer() {
  const { elements, loading, error, filterElements } = useElements();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  useEffect(() => {
    filterElements({
      search: searchTerm,
      category: selectedCategory === 'all' ? null : selectedCategory,
      group: selectedGroup === 'all' ? null : selectedGroup,
      state: selectedState === 'all' ? null : selectedState
    });
  }, [searchTerm, selectedCategory, selectedGroup, selectedState, filterElements]);

  if (loading) return <div className={styles.loading}>Loading elements data...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const categories = [
    'all', 'diatomic nonmetal', 'noble gas', 'alkali metal',
    'alkaline earth metal', 'metalloid', 'polyatomic nonmetal',
    'post-transition metal', 'transition metal', 'lanthanide', 'actinide'
  ];

  const states = ['all', 'solid', 'liquid', 'gas'];

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

          <div className={styles.filterGroup}>
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.select}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
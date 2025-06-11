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

          <div className={styles.filterGroup}>
            <label>Group:</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className={styles.select}
            >
              <option value="all">All Groups</option>
              {[...Array(18).keys()].map(i => (
                <option key={i+1} value={i+1}>Group {i+1}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>State:</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className={styles.select}
            >
              {states.map(state => (
                <option key={state} value={state}>
                  {state === 'all' ? 'All States' : state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.tableContainer}>
            <PeriodicTable elements={elements} />
          </div>
          <div className={styles.elementDetails}>
            <ElementCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
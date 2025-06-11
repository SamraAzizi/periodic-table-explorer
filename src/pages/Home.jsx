import { useEffect, useState } from 'react';
import { useElements } from '../contexts/ElementsContext';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PeriodicTable from '../components/PeriodicTable/PeriodicTable';
import styles from './Home.module.css';

export default function Home() {
  const { elements, loading, error } = useElements();
  const { theme } = useTheme();
  const [featuredElement, setFeaturedElement] = useState(null);

  useEffect(() => {
    // Set a random featured element on load
    if (elements.length > 0) {
      const randomIndex = Math.floor(Math.random() * elements.length);
      setFeaturedElement(elements[randomIndex]);
    }
  }, [elements]);

  if (loading) return <div className={styles.loading}>Loading elements data...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Explore the Building Blocks of Matter</h1>
            <p>
              An interactive periodic table with detailed element information,
              trends visualization, and chemistry tools.
            </p>
          </div>
          
          {featuredElement && (
            <div className={styles.featuredElement}>
              <h2>Featured Element</h2>
              <div className={styles.elementCard}>
                <span className={styles.elementNumber}>{featuredElement.number}</span>
                <span className={styles.elementSymbol}>{featuredElement.symbol}</span>
                <span className={styles.elementName}>{featuredElement.name}</span>
                <span className={styles.elementCategory}>{featuredElement.category}</span>
              </div>
            </div>
          )}
        </section>

        <section className={styles.preview}>
          <h2>Interactive Periodic Table</h2>
          <div className={styles.tablePreview}>
            <PeriodicTable elements={elements} />
          </div>
        </section>

        <section className={styles.features}>
          <h2>Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3>Detailed Element Data</h3>
              <p>
                Comprehensive information for each element including properties,
                electron configuration, and more.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>Periodic Trends</h3>
              <p>
                Visualize atomic radius, ionization energy, electronegativity,
                and other periodic trends.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>Chemistry Tools</h3>
              <p>
                Molar mass calculator, reaction balancer, and other useful
                chemistry utilities.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
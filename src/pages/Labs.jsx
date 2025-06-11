import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MolarMassCalculator from '../components/calculators/MolarMassCalculator';
import ReactionSimulator from '../components/calculators/ReactionSimulator';
import SolubilityChart from '../components/calculators/SolubilityChart';
import Molecule3DViewer from '../components/labs/Molecule3DViewer';
import ReactionAnimator from '../components/labs/ReactionAnimator';
import styles from './Labs.module.css';

export default function Labs() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('calculators');

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <Header />
      
      <main className={styles.main}>
        <h1>Chemistry Labs</h1>
        
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'calculators' ? styles.active : ''}`}
            onClick={() => setActiveTab('calculators')}
          >
            Calculators
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'visualizations' ? styles.active : ''}`}
            onClick={() => setActiveTab('visualizations')}
          >
            Visualizations
          </button>
        </div>

        {activeTab === 'calculators' && (
          <div className={styles.calculatorsGrid}>
            <div className={styles.calculatorCard}>
              <h2>Molar Mass Calculator</h2>
              <MolarMassCalculator />
            </div>
            <div className={styles.calculatorCard}>
              <h2>Reaction Simulator</h2>
              <ReactionSimulator />
            </div>
            <div className={styles.calculatorCard}>
              <h2>Solubility Chart</h2>
              <SolubilityChart />
            </div>
          </div>
        )}

        {activeTab === 'visualizations' && (
          <div className={styles.visualizationsGrid}>
            <div className={styles.visualizationCard}>
              <h2>3D Molecule Viewer</h2>
              <Molecule3DViewer molecule="h2o" />
            </div>
            <div className={styles.visualizationCard}>
              <h2>Reaction Animator</h2>
              <ReactionAnimator />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
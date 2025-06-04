import React from 'react';
import styles from './Common.module.css';
import { useTheme } from '../../contexts/ThemeContext';
import logo from '../../assets/images/logo.svg';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Periodic Table Explorer" className={styles.logo} />
        <h1>Periodic Table Explorer</h1>
      </div>
      <nav className={styles.nav}>
        <button className={styles.themeToggle} onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  );
}
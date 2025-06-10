import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
      setIsSystemTheme(false);
    } else {
      setTheme(systemPrefersDark ? 'dark' : 'light');
      setIsSystemTheme(true);
    }
  }, []);

  // Watch for system theme changes when using system preference
  useEffect(() => {
    if (!isSystemTheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [isSystemTheme]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setIsSystemTheme(false);
    localStorage.setItem('theme', newTheme);
  };

  const useSystemTheme = () => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(systemPrefersDark ? 'dark' : 'light');
    setIsSystemTheme(true);
    localStorage.removeItem('theme');
  };

  const value = {
    theme,
    isSystemTheme,
    toggleTheme,
    useSystemTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
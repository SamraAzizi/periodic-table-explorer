import { useState } from 'react';
import { ElementsProvider } from './contexts/ElementsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explorer from './pages/Explorer';
import Labs from './pages/Labs';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <ElementsProvider>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explorer" element={<Explorer />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ElementsProvider>
    </ThemeProvider>
  );
}
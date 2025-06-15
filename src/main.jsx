import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';


// Conditionally call it
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools(); // ✅ this is allowed
}

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

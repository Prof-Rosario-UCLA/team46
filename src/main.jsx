import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App.jsx';   // adjust if you moved the file

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
